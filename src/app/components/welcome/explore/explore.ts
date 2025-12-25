import { Component,  HostListener, inject, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav';
import { FootComponent } from '../../foot/foot';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-explore',
  imports: [NavComponent, FootComponent, RouterOutlet, RouterLinkWithHref, NgClass],
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
  public navUpdate: boolean = false;
  ngOnInit(): void {
    this.items = this.sharedService.getSlides();
    this.router.navigate(['/welcome/explore/task']);
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  openMenu() {
    this.showMenu = !this.showMenu;
  }
  onReceiveNavUpdate(event: any) {
    this.navUpdate = event;
  }
}
