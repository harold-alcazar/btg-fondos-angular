import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { Fund, Position, Transaction } from '../models/domain';
import { PortfolioService } from './portfolio';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let httpMock: HttpTestingController;

  const funds: Fund[] = [
    { id: 1, name: 'FPV_A', category: 'FPV', minimumAmount: 75000 },
    { id: 2, name: 'FIC_B', category: 'FIC', minimumAmount: 50000 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(PortfolioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads initial data', async () => {
    const loadPromise = service.loadAll();

    httpMock.expectOne('http://localhost:3001/funds').flush(funds);
    httpMock.expectOne('http://localhost:3001/positions').flush([]);
    httpMock.expectOne('http://localhost:3001/transactions').flush([]);
    httpMock.expectOne('http://localhost:3001/user/1').flush({ id: 1, amount: 500000 });

    await loadPromise;

    expect(service.funds().length).toBe(2);
    expect(service.balance()).toBe(500000);
    expect(service.pageError()).toBe('');
  });

  it('rejects subscription when balance is insufficient', async () => {
    service.balance.set(10000);

    await service.subscribeToFund(funds[0], 'email');

    expect(service.actionError()).toContain('No tiene saldo disponible');
  });

  it('subscribes successfully and refreshes state', async () => {
    service.balance.set(500000);
    service.positions.set([]);

    const subscribePromise = service.subscribeToFund(funds[0], 'sms');

    const positionRequest = httpMock.expectOne('http://localhost:3001/positions');
    expect(positionRequest.request.method).toBe('POST');
    positionRequest.flush({ id: 1, fundId: 1, amount: 75000 });
    await flushPromises();

    const transactionRequest = httpMock.expectOne(
      'http://localhost:3001/transactions'
    );
    expect(transactionRequest.request.method).toBe('POST');
    expect(transactionRequest.request.body.notificationMethod).toBe('sms');
    transactionRequest.flush({ id: 1 });
    await flushPromises();

    const patchRequest = httpMock.expectOne('http://localhost:3001/user/1');
    expect(patchRequest.request.method).toBe('PATCH');
    expect(patchRequest.request.body.amount).toBe(425000);
    patchRequest.flush({ id: 1, amount: 425000 });
    await flushPromises();

    flushLoadAllRequests(httpMock, funds, [{ id: 1, fundId: 1, amount: 75000, subscribedAt: '2026-01-01T00:00:00.000Z' }], [
      {
        id: 1,
        type: 'SUBSCRIPTION',
        fundId: 1,
        fundName: 'FPV_A',
        amount: 75000,
        notificationMethod: 'sms',
        createdAt: '2026-01-01T00:00:00.000Z'
      }
    ], 425000);

    await subscribePromise;

    expect(service.balance()).toBe(425000);
    expect(service.positions().length).toBe(1);
    expect(service.transactions()[0].type).toBe('SUBSCRIPTION');
  });

  it('cancels a fund successfully and refreshes state', async () => {
    service.balance.set(425000);
    service.positions.set([
      {
        id: 10,
        fundId: 1,
        amount: 75000,
        subscribedAt: '2026-01-01T00:00:00.000Z'
      }
    ]);

    const cancelPromise = service.cancelFund(funds[0]);

    const deleteRequest = httpMock.expectOne('http://localhost:3001/positions/10');
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush({});
    await flushPromises();

    const transactionRequest = httpMock.expectOne(
      'http://localhost:3001/transactions'
    );
    expect(transactionRequest.request.method).toBe('POST');
    expect(transactionRequest.request.body.type).toBe('CANCELLATION');
    transactionRequest.flush({ id: 2 });
    await flushPromises();

    const patchRequest = httpMock.expectOne('http://localhost:3001/user/1');
    expect(patchRequest.request.method).toBe('PATCH');
    expect(patchRequest.request.body.amount).toBe(500000);
    patchRequest.flush({ id: 1, amount: 500000 });
    await flushPromises();

    flushLoadAllRequests(httpMock, funds, [], [
      {
        id: 2,
        type: 'CANCELLATION',
        fundId: 1,
        fundName: 'FPV_A',
        amount: 75000,
        createdAt: '2026-01-02T00:00:00.000Z'
      }
    ], 500000);

    await cancelPromise;

    expect(service.balance()).toBe(500000);
    expect(service.positions().length).toBe(0);
    expect(service.transactions()[0].type).toBe('CANCELLATION');
  });
});

function flushLoadAllRequests(
  httpMock: HttpTestingController,
  funds: Fund[],
  positions: Position[],
  transactions: Transaction[],
  amount: number
): void {
  httpMock.expectOne('http://localhost:3001/funds').flush(funds);
  httpMock.expectOne('http://localhost:3001/positions').flush(positions);
  httpMock.expectOne('http://localhost:3001/transactions').flush(transactions);
  httpMock.expectOne('http://localhost:3001/user/1').flush({ id: 1, amount });
}

async function flushPromises(): Promise<void> {
  await Promise.resolve();
}
