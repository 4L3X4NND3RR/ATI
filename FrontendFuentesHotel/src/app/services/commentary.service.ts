import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentary } from '../model/commentary';
import { CommentaryView } from '../model/commentary-view';

@Injectable({
  providedIn: 'root',
})
export class CommentaryService {
  private url = 'http://localhost:3000/api/commentary';
  constructor(private httpClient: HttpClient) {}

  createCommentary(
    commentary: Commentary
  ): Promise<{ success: boolean; message: string }> {
    return this.httpClient
      .post<{ success: boolean; message: string }>(this.url, commentary)
      .toPromise();
  }

  getCommentaries(): Observable<CommentaryView[]> {
    return this.httpClient.get<CommentaryView[]>(this.url);
  }
}
