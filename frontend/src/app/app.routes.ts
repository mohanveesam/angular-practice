// app.routes.ts
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'components/login',  // Optional default route
    pathMatch: 'full'
  },
  {
    path: 'components',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent,},
      { path: 'user', component: UserComponent, canActivate: [authGuard], data: { roles: [1] } },  
    ]
  }
];

export const appRouterProviders = [provideRouter(routes)];
