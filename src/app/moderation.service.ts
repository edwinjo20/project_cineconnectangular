// moderation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModerationService {
  private apiUrl = 'http://127.0.0.1:8000/api/comment'; // Symfony API URL

  constructor(private http: HttpClient) {}

  // Set headers with the JWT token for Authorization
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token'); // Retrieve JWT token from localStorage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set Authorization header
  }

  // Fetch all comments, both pending and approved
  getAllComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, {
      headers: this.getHeaders(),
    });
  }

  // Fetch pending comments for moderation
  getPendingComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pending`, {
      headers: this.getHeaders(),
    });
  }

  // Approve a comment
  approveComment(commentId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/approve/${commentId}`, {}, {
      headers: this.getHeaders(),
    });
  }

  // Reject a comment
  rejectComment(commentId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reject/${commentId}`, {}, {
      headers: this.getHeaders(),
    });
  }
}
