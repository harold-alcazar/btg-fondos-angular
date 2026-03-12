import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Fund } from '../../core/models/domain';
import { PortfolioService } from '../../core/services/portfolio';
import { FundsPage } from './funds-page';
import { CancelDialog } from './cancel-dialog/cancel-dialog';

describe('FundsPage', () => {
  let component: FundsPage;
  let fixture: ComponentFixture<FundsPage>;

  const funds: Fund[] = [
    { id: 1, name: 'FPV_TEST', category: 'FPV', minimumAmount: 75000 }
  ];

  const portfolioMock = {
    funds: signal(funds),
    subscribedFundIds: signal(new Set<number>()),
    loading: signal(false),
    actionLoading: signal(false),
    pageError: signal(''),
    actionError: signal(''),
    subscribeToFund: vi.fn().mockResolvedValue(undefined),
    cancelFund: vi.fn().mockResolvedValue(undefined)
  };

  const dialogMock = {
    open: vi.fn()
  };

  const snackBarMock = {
    open: vi.fn()
  };

  beforeEach(async () => {
    portfolioMock.subscribeToFund.mockClear();
    portfolioMock.cancelFund.mockClear();
    dialogMock.open.mockClear();
    snackBarMock.open.mockClear();
    portfolioMock.pageError.set('');
    portfolioMock.actionError.set('');
    portfolioMock.subscribedFundIds.set(new Set<number>());

    await TestBed.configureTestingModule({
      imports: [FundsPage],
      providers: [
        { provide: PortfolioService, useValue: portfolioMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FundsPage);
    component = fixture.componentInstance;
    (component as any).dialog = dialogMock;
    (component as any).snackBar = snackBarMock;
    fixture.detectChanges();
  });

  it('opens subscribe dialog when calling openSubscribeDialog', async () => {
    dialogMock.open.mockReturnValue({ afterClosed: () => of(undefined) });

    await component.openSubscribeDialog(portfolioMock.funds()[0]);

    expect(dialogMock.open).toHaveBeenCalledTimes(1);
    expect(dialogMock.open.mock.calls[0][0]).toBeTypeOf('function');
    expect(dialogMock.open.mock.calls[0][1]).toEqual({
      width: '420px',
      data: { fund: portfolioMock.funds()[0] }
    });
  });

  it('does not subscribe when subscribe dialog is dismissed', async () => {
    dialogMock.open.mockReturnValue({ afterClosed: () => of(undefined) });

    await component.openSubscribeDialog(portfolioMock.funds()[0]);

    expect(portfolioMock.subscribeToFund).not.toHaveBeenCalled();
  });

  it('subscribes with selected notification method', async () => {
    dialogMock.open.mockReturnValue({
      afterClosed: () => of({ confirmed: true, notificationMethod: 'email' })
    });

    await component.openSubscribeDialog(portfolioMock.funds()[0]);

    expect(portfolioMock.subscribeToFund).toHaveBeenCalledWith(
      portfolioMock.funds()[0],
      'email'
    );
    expect(snackBarMock.open).toHaveBeenCalledWith(
      'Suscripcion exitosa a FPV_TEST',
      'OK',
      { duration: 2500 }
    );
  });

  it('opens cancel dialog and executes cancellation on confirm', async () => {
    portfolioMock.subscribedFundIds.set(new Set<number>([1]));
    fixture.detectChanges();

    dialogMock.open.mockReturnValue({ afterClosed: () => of({ confirmed: true }) });

    await component.openCancelDialog(portfolioMock.funds()[0]);

    expect(dialogMock.open).toHaveBeenCalledWith(CancelDialog, {
      width: '420px',
      data: { fund: portfolioMock.funds()[0] }
    });
    expect(portfolioMock.cancelFund).toHaveBeenCalledWith(portfolioMock.funds()[0]);
  });
});
