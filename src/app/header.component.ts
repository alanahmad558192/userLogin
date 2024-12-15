import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <span class="navbar-brand">User's Dashboard</span>
        <button *ngIf="authService.isLoggedIn()"
                class="btn btn-outline-danger"
                (click)="logout()">
          Logout
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      top: 0;
      width: 100%;
      z-index: 1000;
      padding: 1rem;
      margin-bottom: 0rem;
      background-color: #fff !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
