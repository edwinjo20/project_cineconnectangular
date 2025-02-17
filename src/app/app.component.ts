import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Keep RouterModule only

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],  // No need to import AdminComponent
  template: `
    <router-outlet></router-outlet> <!-- Routed views will be displayed here -->
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'moderation-project';  // Add title property

  constructor() {}
}