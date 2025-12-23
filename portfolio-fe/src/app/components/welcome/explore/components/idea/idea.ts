import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-idea',
  imports: [],
  templateUrl: './idea.html',
  styleUrl: './idea.scss',
})
export class IdeaComponent implements OnInit {
  protected slides: {
    id: number;
    title: string;
    description: string;
    image: string;
    route: string;
  }[] = [];
  protected sharedService: SharedService = inject(SharedService);
  ngOnInit(): void {
    this.slides = this.sharedService.getSlides();
  }
}
