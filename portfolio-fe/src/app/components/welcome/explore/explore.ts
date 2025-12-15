import { Component } from '@angular/core';
import { NavComponent } from '../../nav/nav';
import { FootComponent } from '../../foot/foot';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-explore',
  imports: [NavComponent, FootComponent, RouterOutlet],
  templateUrl: './explore.html',
  styleUrl: './explore.scss',
})
export class ExploreComponent {}
