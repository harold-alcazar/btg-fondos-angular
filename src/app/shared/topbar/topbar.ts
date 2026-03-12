import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-topbar',
  imports: [
    CurrencyPipe,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  readonly balance = input.required<number>();
}
