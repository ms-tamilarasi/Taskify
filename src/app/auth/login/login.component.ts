import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Function to handle login logic
  onLoginClick(event: Event) {
    event.preventDefault();  // Prevent default form submission

    const apiUrl = 'http://localhost:3000/users';  // URL of the JSON Server

    // Check if the user exists by matching email and password
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
            // User found, login successful
            alert('Login successful');
            // Store user details and set login status
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', response[0].id);
            // Navigate to home page
            this.router.navigate(['/home']);
          } else {
            // No user found with the given credentials, prompt for registration
            alert('No user found with this email and password. Please register.');
            // Optionally, navigate to the registration page:
            // this.router.navigate(['/register']);
          }
        },
        (error) => {
          console.error('Error during login:', error);
          alert('Error while logging in. Please try again later.');
        }
      );
  }
}
