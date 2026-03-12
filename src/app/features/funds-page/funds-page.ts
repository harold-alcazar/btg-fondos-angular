import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { APP_MESSAGES } from '../../core/constants/messages';
import { Fund } from '../../core/models/domain';
import { PortfolioService } from '../../core/services/portfolio';
import { DataTable } from '../../shared/data-table/data-table';
import type { CancelDialogResult } from './cancel-dialog/cancel-dialog';
import type { SubscribeDialogResult } from './subscribe-dialog/subscribe-dialog';

@Component({
  selector: 'app-funds-page',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    DataTable
  ],
  templateUrl: './funds-page.html',
  styleUrl: './funds-page.scss'
})
export class FundsPage {
  readonly portfolio = inject(PortfolioService);
  readonly messages = APP_MESSAGES;
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  readonly displayedColumns = [
    'name',
    'category',
    'minimumAmount',
    'status',
    'actions'
  ];

  isSubscribed(fundId: number): boolean {
    return this.portfolio.subscribedFundIds().has(fundId);
  }

  async openSubscribeDialog(fund: Fund): Promise<void> {
    const { SubscribeDialog } = await import(
      './subscribe-dialog/subscribe-dialog'
    );
    const dialogRef = this.dialog.open(SubscribeDialog, {
      width: '420px',
      data: { fund }
    });

    const result = (await firstValueFrom(dialogRef.afterClosed())) as
      | SubscribeDialogResult
      | undefined;

    if (!result?.confirmed || !result.notificationMethod) {
      return;
    }

    await this.portfolio.subscribeToFund(fund, result.notificationMethod);
    if (this.portfolio.actionError()) {
      this.snackBar.open(this.portfolio.actionError(), this.messages.actions.close, {
        duration: 3500
      });
      return;
    }
    this.snackBar.open(this.messages.success.subscribe(fund.name), this.messages.actions.ok, {
      duration: 2500
    });
  }

  async openCancelDialog(fund: Fund): Promise<void> {
    const { CancelDialog } = await import('./cancel-dialog/cancel-dialog');
    const dialogRef = this.dialog.open(CancelDialog, {
      width: '420px',
      data: { fund }
    });

    const result = (await firstValueFrom(dialogRef.afterClosed())) as
      | CancelDialogResult
      | undefined;

    if (!result?.confirmed) {
      return;
    }

    await this.portfolio.cancelFund(fund);
    if (this.portfolio.actionError()) {
      this.snackBar.open(this.portfolio.actionError(), this.messages.actions.close, {
        duration: 3500
      });
      return;
    }
    this.snackBar.open(this.messages.success.cancel(fund.name), this.messages.actions.ok, {
      duration: 2500
    });
  }
}
