import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  userForm!: FormGroup;
  isEditing = false;
  submitted = false;
  errorMessage = '';
  isModalOpen = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', !this.isEditing ? [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,50}$/)
      ] : []]
    });
  }

  openAddUserModal(): void {
    this.isEditing = false;
    this.submitted = false;
    this.errorMessage = '';
    this.initForm();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load users: ' + (err.error?.error || err.message);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.userForm.invalid) {
      return;
    }

    const userData: User = this.userForm.value;

    if (this.isEditing) {
      this.updateUser(userData);
    } else {
      this.createUser(userData);
    }
  }

  createUser(userData: User): void {
    this.userService.createUser(userData).subscribe({
      next: () => {
        this.loadUsers();
        this.closeModal();
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to create user';
      }
    });
  }

  updateUser(userData: User): void {
    this.userService.updateUser(userData).subscribe({
      next: () => {
        this.loadUsers();
        this.closeModal();
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to update user';
      }
    });
  }

  editUser(user: User): void {
    this.isEditing = true;
    this.submitted = false;
    this.errorMessage = '';
    this.initForm();
    this.userForm.patchValue(user);
    this.isModalOpen = true;
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete user: ' + (err.error?.error || err.message);
        }
      });
    }
  }

  resetForm(): void {
    this.submitted = false;
    this.isEditing = false;
    this.errorMessage = '';
    this.initForm();
  }
}
