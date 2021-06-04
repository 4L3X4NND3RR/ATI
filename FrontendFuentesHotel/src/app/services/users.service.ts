import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = 'http://localhost:3000/api/user';
  constructor(private _httclient:HttpClient) { }

  public CreateUser(user: User): Observable<{ status: number; message: string }> {
    return this._httclient.post<{ status: number; message: string }>(
      this.url,
      user
    );
  }
}
