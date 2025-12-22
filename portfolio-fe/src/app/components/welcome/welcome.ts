import { Component, OnInit } from '@angular/core';
import { MeasuresService } from '../../services/measures.service';
import { TooltipModule } from 'primeng/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [
    TooltipModule,
    MatTooltipModule,
    RouterLink,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class WelcomeComponent implements OnInit {
  protected height: string = '0px';
  constructor(private measuresService: MeasuresService) {
    this.measuresService.measure.subscribe({
      next: (data: string) => {
        if (data && data.length > 0) {
          this.height = data;
        }
      },
    });
  }
  ngOnInit(): void {}
}
