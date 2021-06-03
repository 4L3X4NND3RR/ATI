import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../model/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private url = 'http://localhost:3000/api/rooms';

  constructor(private _httpClient: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this._httpClient.get<Room[]>(this.url);
  }
}
