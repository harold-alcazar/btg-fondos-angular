import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-data-table',
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss'
})
export class DataTable {
  readonly loading = input<boolean>(false);
  readonly error = input<string>('');
  readonly empty = input<boolean>(false);
  readonly emptyMessage = input<string>('No hay datos para mostrar.');
}
