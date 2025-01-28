import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false,
})
export class RegisterComponent {
  showOtp: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {}

  private showSnackbar(message: string, type: string) {
    let snackBarClass = '';
    if (type === 'success') {
      snackBarClass = 'success-snackbar';
    } else if (type === 'error') {
      snackBarClass = 'error-snackbar';
    }

    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      panelClass: [snackBarClass], 
    });
  }

  registerNewUser() {
    if (!this.firstName || !this.lastName || !this.email || !this.phone || !this.password || !this.confirmPassword) {
      this.showSnackbar('Please fill in all the fields!', 'error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showSnackbar('Passwords do not match!', 'error');
      return;
    }

    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password,
    };

    const apiUrl = 'http://localhost:3000/users';

    this.http.post<any>(apiUrl, newUser).subscribe(
      (response) => {
        this.showSnackbar('Registration successful!', 'success');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', response.id);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error while registering:', error);
        this.showSnackbar('Error while registering. Please try again.', 'error');
      }
    );
  }
}
