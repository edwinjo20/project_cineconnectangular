import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component'; // Ensure LoginComponent is imported
import { AdminComponent } from './app/admin/admin.component';
import { AdminGuard } from './app/auth/admin.guard'; // Import AdminGuard

const routes: Routes = [
  { path: '', component: LoginComponent },  // Default route for Login
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provide routing configuration
    importProvidersFrom(HttpClientModule, FormsModule), // Import HttpClientModule and FormsModule
  ],
});
