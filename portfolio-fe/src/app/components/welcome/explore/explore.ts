import { Component, HostListener, inject, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav';
import { FootComponent } from '../../foot/foot';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-explore',
  imports: [NavComponent, FootComponent, RouterOutlet, RouterLinkWithHref],
  templateUrl: './explore.html',
  styleUrl: './explore.scss',
})
export class ExploreComponent implements OnInit {
  protected items: {
    id: number;
    title: string;
    description: string;
    image: string;
    route: string;
  }[] = [];
  protected router: Router = inject(Router);
  protected sharedService: SharedService = inject(SharedService);
  protected innerWidth: number = 0;
  protected showMenu: boolean = false;
  ngOnInit(): void {
    this.items = this.sharedService.getSlides();
    this.router.navigate(['/welcome/explore/idea']);
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  openMenu() {
    this.showMenu = !this.showMenu;
  }
}
