import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { Fund } from '../../../core/models/domain';

export interface CancelDialogData {
  fund: Fund;
}

export interface CancelDialogResult {
  confirmed: boolean;
}

@Component({
  selector: 'app-cancel-dialog',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './cancel-dialog.html',
  styleUrl: './cancel-dialog.scss',
})
export class CancelDialog {
  readonly data = inject<CancelDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef =
    inject<MatDialogRef<CancelDialog, CancelDialogResult>>(MatDialogRef);

  confirm(): void {
    this.dialogRef.close({ confirmed: true });
  }
}
