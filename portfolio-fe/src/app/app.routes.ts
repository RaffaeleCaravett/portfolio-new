import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome';
import { ErrorComponent } from './components/error/error';

export const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];
