import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav';
import { FootComponent } from './components/foot/foot';
import { NgStyle } from '@angular/common';
import { MeasuresService } from './services/measures.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FootComponent, NgStyle],
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
    this.measuresService.measureNext((this.welcomeHeight - 50) + 'px');
  }
}
