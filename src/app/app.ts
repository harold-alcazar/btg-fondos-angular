import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './shared/topbar/topbar';
import { PortfolioService } from './core/services/portfolio';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Topbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly portfolio = inject(PortfolioService);

  constructor() {
    void this.portfolio.loadAll();
  }
}
