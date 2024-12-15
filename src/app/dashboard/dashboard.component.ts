// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="dashboard-container">
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
//       <h1>Welcome to User Management</h1>
//       <p>Click the link below to access the User Management Application</p>
//       <a href="https://github.com/alanahmad558192/AppUserManagement.git" target="_blank" class="btn btn-primary">
//         Go to AppUserManagement
//       </a>
//     </div>
//   `,
//   styles: [`
//     .dashboard-container {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       height: 100vh;
//       text-align: center;
//     }
//     .btn {
//       margin-top: 20px;
//       padding: 10px 20px;
//       background-color: #007bff;
//       color: white;
//       text-decoration: none;
//       border-radius: 5px;
//     }
//   `]
// })
// export class DashboardComponent {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UserManagementComponent],
  template: `
    <div class="dashboard-container">
      <app-user-management></app-user-management>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      background-color: #f4f7f6;
      min-height: calc(100vh - 56px); /* Accounts for header height */
      margin-top: 56px; /* Header height */
    }
  `]
})
export class DashboardComponent {}
