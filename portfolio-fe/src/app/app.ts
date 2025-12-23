import { Component, HostListener, inject, signal } from '@angular/core';
import { MeasuresService } from './services/measures.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portfolio-fe');
  protected welcomeHeight: number = 0;
  protected measuresService: MeasuresService = inject(MeasuresService);
  ngOnInit(): void {
    this.resizeWelcomeHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeWelcomeHeight();
  }

  resizeWelcomeHeight() {
    this.welcomeHeight = window.innerHeight;
    this.measuresService.measureNext(this.welcomeHeight + 'px', window.innerWidth + 'px');
  }
}
