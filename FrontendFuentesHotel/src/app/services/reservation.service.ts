import { Observable } from 'rxjs';
import { Reservation } from './../model/reservation';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private url = 'http://localhost:3000/api/reservations';
  constructor(private _httpClient: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this._httpClient.get<Reservation[]>(this.url);
  }
}
