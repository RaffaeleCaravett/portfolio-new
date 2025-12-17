import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome';

export const routes: Routes = [{ path: '', component: WelcomeComponent,pathMatch:'full' },
    {'**',
        component:ErrorComponent
    }];
