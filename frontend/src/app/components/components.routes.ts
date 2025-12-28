import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { authGuard } from '../guards/auth.guard';

export const COMPONENTS_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent,  canActivate: [authGuard], data: { roles: [1, 2] } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
