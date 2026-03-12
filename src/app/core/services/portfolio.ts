import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import {
  Fund,
  NotificationMethod,
  Position,
  Transaction,
  UserBalance
} from '../models/domain';

const API_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly http = inject(HttpClient);

  readonly funds = signal<Fund[]>([]);
  readonly positions = signal<Position[]>([]);
  readonly transactions = signal<Transaction[]>([]);
  readonly balance = signal<number>(0);
  readonly loading = signal<boolean>(false);
  readonly actionLoading = signal<boolean>(false);
  readonly pageError = signal<string>('');
  readonly actionError = signal<string>('');

  readonly subscribedFundIds = computed(() => {
    return new Set(this.positions().map((position) => position.fundId));
  });

  async loadAll(): Promise<void> {
    this.loading.set(true);
    this.pageError.set('');
    try {
      const result = await firstValueFrom(
        forkJoin({
          funds: this.http.get<Fund[]>(`${API_URL}/funds`),
          positions: this.http.get<Position[]>(`${API_URL}/positions`),
          transactions: this.http.get<Transaction[]>(`${API_URL}/transactions`),
          user: this.http.get<UserBalance>(`${API_URL}/user/1`)
        })
      );

      this.funds.set(result.funds);
      this.positions.set(result.positions);
      this.transactions.set(
        [...result.transactions].sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        )
      );
      this.balance.set(result.user.amount);
    } catch {
      this.pageError.set('No fue posible cargar la informacion inicial.');
    } finally {
      this.loading.set(false);
    }
  }

  async subscribeToFund(
    fund: Fund,
    notificationMethod: NotificationMethod
  ): Promise<void> {
    this.actionError.set('');

    if (this.subscribedFundIds().has(fund.id)) {
      this.actionError.set('Ya te encuentras suscrito a este fondo.');
      return;
    }
    if (this.balance() < fund.minimumAmount) {
      this.actionError.set(
        'No tiene saldo disponible para vincularse al fondo.'
      );
      return;
    }

    const newBalance = this.balance() - fund.minimumAmount;
    this.actionLoading.set(true);

    try {
      const positionBody = {
        fundId: fund.id,
        amount: fund.minimumAmount,
        subscribedAt: new Date().toISOString()
      };
      const transactionBody: Transaction = {
        type: 'SUBSCRIPTION',
        fundId: fund.id,
        fundName: fund.name,
        amount: fund.minimumAmount,
        notificationMethod,
        createdAt: new Date().toISOString()
      };

      await firstValueFrom(this.http.post(`${API_URL}/positions`, positionBody));
      await firstValueFrom(
        this.http.post(`${API_URL}/transactions`, transactionBody)
      );
      await firstValueFrom(
        this.http.patch(`${API_URL}/user/1`, { amount: newBalance })
      );

      await this.loadAll();
    } catch {
      this.actionError.set('No fue posible completar la suscripcion.');
    } finally {
      this.actionLoading.set(false);
    }
  }

  async cancelFund(fund: Fund): Promise<void> {
    this.actionError.set('');

    const position = this.positions().find((entry) => entry.fundId === fund.id);
    if (!position) {
      this.actionError.set('No existe una suscripcion activa para este fondo.');
      return;
    }

    const newBalance = this.balance() + position.amount;
    this.actionLoading.set(true);

    try {
      const transactionBody: Transaction = {
        type: 'CANCELLATION',
        fundId: fund.id,
        fundName: fund.name,
        amount: position.amount,
        createdAt: new Date().toISOString()
      };

      await firstValueFrom(this.http.delete(`${API_URL}/positions/${position.id}`));
      await firstValueFrom(
        this.http.post(`${API_URL}/transactions`, transactionBody)
      );
      await firstValueFrom(
        this.http.patch(`${API_URL}/user/1`, { amount: newBalance })
      );

      await this.loadAll();
    } catch {
      this.actionError.set('No fue posible cancelar el fondo.');
    } finally {
      this.actionLoading.set(false);
    }
  }
}
