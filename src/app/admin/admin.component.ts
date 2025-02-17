import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ModerationService } from '../moderation.service';  // Import ModerationService

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],  // Add CommonModule here
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  comments: any[] = [];

  constructor(private moderationService: ModerationService) {}

  ngOnInit(): void {
// Fetch approved comments for display in the admin dashboard
    this.moderationService.getPendingComments().subscribe(
      (comments) => {
        this.comments = comments.filter(comment => comment.approved);  // Filter to show only approved comments
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );

  }

  approveComment(commentId: number): void {
    this.moderationService.approveComment(commentId).subscribe(
      () => {
        // Remove approved comment from the list
        this.comments = this.comments.filter(c => c.id !== commentId);
      },
      (error) => {
        console.error('Error approving comment:', error);
      }
    );
  }

  rejectComment(commentId: number): void {
    this.moderationService.rejectComment(commentId).subscribe(
      () => {
        // Remove rejected comment from the list
        this.comments = this.comments.filter(c => c.id !== commentId);
      },
      (error) => {
        console.error('Error rejecting comment:', error);
      }
    );
  }
}
