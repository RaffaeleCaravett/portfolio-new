import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome';
import { ExploreRoutes } from './explore/explore.routes';

export const WelcomeRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'explore',
    loadChildren: () => Promise.resolve(ExploreRoutes),
  },
];
