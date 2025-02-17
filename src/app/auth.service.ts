import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Your API URL

  constructor(private http: HttpClient) {}

  // Method to log in the user
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Method to save the token in local storage
  saveToken(token: string): void {
    console.log('Saving token:', token); // Log token before saving
    localStorage.setItem('jwt_token', token);
  }

  // Method to get the token from local storage
  getToken(): string | null {
    const token = localStorage.getItem('jwt_token');
    console.log('Getting token:', token); // Log token retrieved
    return token;
  }

  // Method to check if the user is admin
  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get payload
        console.log('Decoded JWT:', decoded); // Log the decoded JWT
        return decoded.role === 'admin'; // Check if the role is admin
      } catch (e) {
        console.error('Error decoding JWT:', e);
      }
    }
    return false;
  }
}
