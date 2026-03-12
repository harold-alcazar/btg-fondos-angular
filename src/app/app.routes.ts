import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'fondos' },
  {
    path: 'fondos',
    loadComponent: () =>
      import('./features/funds-page/funds-page').then((m) => m.FundsPage)
  },
  {
    path: 'transacciones',
    loadComponent: () =>
      import('./features/transactions-page/transactions-page').then(
        (m) => m.TransactionsPage
      )
  },
  { path: '**', redirectTo: 'fondos' }
];
