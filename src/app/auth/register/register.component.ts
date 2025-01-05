import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  showOtp: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  moveFocus(event: any, nextInputIndex: number) {
    if (event.target.value.length == 1 && nextInputIndex <= 4) {
      const nextInput = document.getElementById(`otp${nextInputIndex}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  registerNewUser() {
    if (!this.firstName || !this.lastName || !this.email || !this.phone || !this.password || !this.confirmPassword) {
      alert('Please fill in all the fields!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password
    };


    const apiUrl = 'http://localhost:3000/users'; 

    this.http.post<any>(apiUrl, newUser).subscribe(
      (response) => {
        alert('Registration successful!');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', response.id);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error while registering:', error);
        alert('Error while registering. Please try again.');
      }
    );
  }
}
