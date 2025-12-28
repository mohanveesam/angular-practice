import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../services/common.service';
import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from '../components/user/user-form/user-form.component';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private cs: CommonService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.cs.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          // 1️⃣ Save login data
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('fullname', res.fullname);
          localStorage.setItem('username', res.username);
          localStorage.setItem('id', res.id);
          // 2️⃣ Fetch employee profile immediately
          this.cs.getById('employee', res.id).subscribe((emp: any) => {
            if (emp?.imageUrl) {
              localStorage.setItem('imageUrl', emp.imageUrl);
            } else {
              localStorage.removeItem('imageUrl');
            }
            // 3️⃣ Notify app & navigate
            window.dispatchEvent(new Event('storage'));
            this.router.navigate(['/components/dashboard']);
          });
        },
        error: (err) => {
          this.error = err.error?.error || 'Login failed';
        },
      });
    }
  }

  openSignup(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: {
        mode: 'A',
        user: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Optional: Show success snackbar or auto-login or message
        console.log('User signed up successfully');
      }
    });
  }
}
