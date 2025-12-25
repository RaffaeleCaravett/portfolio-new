import { Routes } from '@angular/router';
import { ExploreComponent } from './explore';
import { IdeaComponent } from './components/idea/idea';
import { ErrorComponent } from '../../error/error';

export const ExploreRoutes: Routes = [
  {
    path: '',
    component: ExploreComponent,
    children: [
      {
        path: 'idea',
        component: IdeaComponent,
      },
    ],
  },
  { path: '**', component: ErrorComponent },
];
