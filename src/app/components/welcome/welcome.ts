import { Component, OnInit } from '@angular/core';
import { MeasuresService } from '../../services/measures.service';
import { TooltipModule } from 'primeng/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [TooltipModule, MatTooltipModule, RouterLink, CommonModule, RouterModule, NgStyle],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class WelcomeComponent implements OnInit {
  protected height: string = '0px';
  protected width: string = '0px';
  constructor(private measuresService: MeasuresService) {
    this.measuresService.measure.subscribe({
      next: (data: string[]) => {
        if (data && data.length > 0) {
          this.height = data[0];
          this.width = data[1];
        }
      },
    });
  }
  ngOnInit(): void {}

  toNumber(value: string): number {
    if (value.length > 0) {
      return Number(value.substring(0, value.length - 2));
    }
    return 0;
  }
}
