import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {}

  onLoginClick(event: Event) {
    event.preventDefault();

    const apiUrl = 'http://localhost:3000/users';

    this.http
      .get<any[]>(apiUrl, {
        params: {
          email: this.email,
          password: this.password,
        },
      })
      .subscribe(
        (response) => {
          if (response.length > 0) {
            this.showSnackbar('Login successful', 'success'); 
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', response[0].id);
            this.router.navigate(['/home']);
          } else {
            this.showSnackbar(
              'No user found with this email and password. Please register.',
              'error' 
            );
          }
        },
        (error) => {
          console.error('Error during login:', error);
          this.showSnackbar('Error while logging in. Please try again later.', 'error'); 
        }
      );
  }

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
}
