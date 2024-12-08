import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router // Inject Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);

          // Store token or user info in localStorage if needed
          localStorage.setItem('authToken', response.token);

          // Navigate to a new route after successful login
          this.router.navigate(['/dashboard']); // or whatever route you want
        },
        error: (error) => {
          console.error('Login error', error);

          // Customize error message
          if (error.status === 400) {
            this.errorMessage = 'Your email or password is incorrect';
          } else {
            this.errorMessage = error.error?.message || 'Login failed';
          }
        }
      });
    }
  }
}
