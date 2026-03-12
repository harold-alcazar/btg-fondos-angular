import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PortfolioService } from '../../core/services/portfolio';
import { DataTable } from '../../shared/data-table/data-table';

@Component({
  selector: 'app-transactions-page',
  imports: [
    CurrencyPipe,
    DatePipe,
    UpperCasePipe,
    MatTableModule,
    DataTable
  ],
  templateUrl: './transactions-page.html',
  styleUrl: './transactions-page.scss'
})
export class TransactionsPage {
  readonly portfolio = inject(PortfolioService);
  readonly displayedColumns = [
    'type',
    'fundName',
    'amount',
    'notificationMethod',
    'createdAt'
  ];
}
