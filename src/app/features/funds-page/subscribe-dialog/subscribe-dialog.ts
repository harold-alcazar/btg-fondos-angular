import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Fund, NotificationMethod } from '../../../core/models/domain';

export interface SubscribeDialogData {
  fund: Fund;
}

export interface SubscribeDialogResult {
  confirmed: boolean;
  notificationMethod?: NotificationMethod;
}

@Component({
  selector: 'app-subscribe-dialog',
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './subscribe-dialog.html',
  styleUrl: './subscribe-dialog.scss',
})
export class SubscribeDialog {
  readonly data = inject<SubscribeDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef =
    inject<MatDialogRef<SubscribeDialog, SubscribeDialogResult>>(MatDialogRef);

  readonly notificationMethodControl = new FormControl<NotificationMethod | null>(
    null,
    {
      nonNullable: false,
      validators: [Validators.required]
    }
  );

  confirm(): void {
    if (this.notificationMethodControl.invalid) {
      this.notificationMethodControl.markAsTouched();
      return;
    }

    this.dialogRef.close({
      confirmed: true,
      notificationMethod: this.notificationMethodControl.value ?? undefined
    });
  }
}
