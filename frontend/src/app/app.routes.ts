import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'components',
    // canActivate: [authGuard],
    // data: { roles: [1, 2] },
    loadChildren: () =>
      import('./components/components.routes').then(m => m.COMPONENTS_ROUTES),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

export const appRouterProviders = [provideRouter(routes)];
