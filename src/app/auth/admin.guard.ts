import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    console.log('AdminGuard activated');
    const token = this.authService.getToken();
    console.log('Checking token in AdminGuard:', token);
  
    if (token) {
      return true;  // Token exists, allow access to the admin route
    } else {
      console.log('No token found, redirecting to login...');
      this.router.navigate(['/']); // Redirect to login if no token is found
      return false;
    }
  }
  
}
