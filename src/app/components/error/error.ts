import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class ErrorComponent {
  protected router: Router = inject(Router);
  goHome() {
    this.router.navigate(['welcome/explore']);
  }
}
