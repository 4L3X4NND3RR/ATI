import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/api/login';
  logged = new BehaviorSubject<boolean>(false);
  constructor(private _httpClient: HttpClient) {}

  public login(user: User): Observable<{ status: number; message: string }> {
    return this._httpClient.post<{ status: number; message: string }>(
      this.url,
      user
    );
  }

  public checkLoged(): boolean {
    const value = localStorage.getItem('user');
    return !(value === null);
  }
}
