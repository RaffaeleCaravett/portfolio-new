import { Routes } from '@angular/router';
import { ExploreComponent } from './explore';
import { IdeaComponent } from './components/idea/idea';
import { ErrorComponent } from '../../error/error';
import { TaskComponent } from './components/task/task';
import { FruitComponent } from './components/fruit/fruit';
import { RestaurantComponent } from './components/restaurant/restaurant';
import { EcommerceComponent } from './components/ecommerce/ecommerce';
import { ShowroomComponent } from './components/showroom/showroom';
import { BankComponent } from './components/bank/bank';
import { CryptoComponent } from './components/crypto/crypto';
import { SnakeComponent } from './components/snake/snake';
import { ThreeComponent } from './components/three/three';
import { ToolsComponent } from './components/tools/tools';
import { InfoComponent } from './components/info/info';
import { AboutComponent } from './components/about/about';

export const ExploreRoutes: Routes = [
  {
    path: '',
    redirectTo: 'idea',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ExploreComponent,
    children: [
      {
        path: 'idea',
        component: IdeaComponent,
      },
      {
        path: 'restaurant',
        component: RestaurantComponent,
      },
      {
        path: 'task',
        component: TaskComponent,
      },
      {
        path: 'fruit',
        component: FruitComponent,
      },
      {
        path: 'ecommerce',
        component: EcommerceComponent,
      },
      {
        path: 'showroom',
        component: ShowroomComponent,
      },
      {
        path: 'bank',
        component: BankComponent,
      },
      {
        path: 'crypto',
        component: CryptoComponent,
      },
      {
        path: 'snake',
        component: SnakeComponent,
      },
      {
        path: 'three',
        component: ThreeComponent,
      },
      {
        path: 'tools',
        component: ToolsComponent,
      },
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
    ],
  },
  { path: '**', component: ErrorComponent },
];
