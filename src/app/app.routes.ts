import { Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error';
import { WelcomeRoutes } from './components/welcome/welcome.routes';

export const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => Promise.resolve(WelcomeRoutes),
  },
  { path: '**', component: ErrorComponent },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  }
];
