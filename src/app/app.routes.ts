// import { Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { AuthGuard } from './auth.guard';

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   {
//     path: 'dashboard',
//     loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
//     canActivate: [AuthGuard] // Add the guard
//   },
//   { path: '', redirectTo: '/login', pathMatch: 'full' }
// ];

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserManagementComponent } from './user-list/user-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: UserManagementComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
