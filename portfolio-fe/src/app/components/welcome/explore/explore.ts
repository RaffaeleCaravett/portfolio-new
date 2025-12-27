import { ChangeDetectorRef, Component, HostListener, inject, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav';
import { FootComponent } from '../../foot/foot';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-explore',
  imports: [
    NavComponent,
    FootComponent,
    RouterOutlet,
    RouterLinkWithHref,
    NgClass,
    MatProgressSpinnerModule,
  ],
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
  protected showSpinner: boolean = false;
  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.items = this.sharedService.getSlides();
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      // this.router.navigate(['/welcome/explore/idea']);
      this.cdr.markForCheck();
    }, 1000);
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

  goToRoute(route: string) {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.router.navigate(['/welcome/explore/' + route]);
      this.cdr.markForCheck();
    }, 1000);
  }
}
