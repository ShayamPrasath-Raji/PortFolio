import { Component } from '@angular/core';
import { PortfolioHomeComponent } from './portfolio-home/portfolio-home.component';

@Component({
  selector: 'app-root',
  imports: [PortfolioHomeComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
}
