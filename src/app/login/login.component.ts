import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router to navigate
import { AuthService } from '../auth.service';  // Import AuthService to interact with the API

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import necessary modules
  templateUrl: './login.component.html', // Path to your HTML template
  styleUrls: ['./login.component.css'],  // Path to your CSS file
})
export class LoginComponent {
  username: string = ''; // Initialize username
  password: string = ''; // Initialize password

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log('Login attempt:', this.username, this.password);  // Log username and password
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful, token:', response.token);
        this.authService.saveToken(response.token);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Login failed', error);
        // Handle Login error
      }
    );
  }
  
}
