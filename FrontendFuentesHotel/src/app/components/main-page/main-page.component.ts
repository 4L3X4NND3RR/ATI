import { Room } from 'src/app/model/room';
import { ReservationService } from './../../services/reservation.service';
import { Reservation } from './../../model/reservation';
import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {

  botones:boolean=false;
  aux?:number;
  rooms: Room[] = [];
  reservation: Reservation[]= [];
  constructor(private _roomService: RoomService, private _reservationService: ReservationService) {}

  ngOnInit(): void {
    this._roomService.getRooms().subscribe((res) => (this.rooms = res));
    this._reservationService.getReservations().subscribe((res)=>(this.reservation=res))
  }

  //Filtro para obtener todos los tipos de habitaciones
  filterNothing(): void {
    this._roomService.getRooms().subscribe((res) => (this.rooms = res));
    this.botones=false;
  }

  //Filto para obtener la habitaciones dobles

  filterDoubleRoom(): void {
    this._roomService
      .getRooms()
      .subscribe(
        (res) => (this.rooms = res.filter((r) => r.room_type_id === 1))
      );

      this.botones=true;
      this.aux=1;

  }

  // FILTRO POR OCUPADO DE CUALQUIER TIPO DE HABITACION
  filteroccupied():void{
   this._roomService
    .getRooms()
    .subscribe(
      (res) => (this.rooms = res.filter((r) => r.room_type_id === this.aux && r.room_status_id===1))
    );
  }

  // FILTRO DE RESERVADO DE CUALQUIER TIPO DE HABITACION

  filterReserved():void{
    this._roomService
    .getRooms()
    .subscribe(
      (res) => (this.rooms = res.filter((r) => r.room_type_id === this.aux && r.room_status_id===2))
    );

  }

  // FILTRO DE LIBRE DE CUALQUIER TIPO DE HABITACION
  filterFree():void{
    this._roomService
    .getRooms()
    .subscribe(
      (res) => (this.rooms = res.filter((r) => r.room_type_id === this.aux && r.room_status_id===3))
    );
  }


//Filtro para obtener las suit

  filterSuitRoom(): void {
    this._roomService
      .getRooms()
      .subscribe(
        (res) => (this.rooms = res.filter((r) => r.room_type_id === 2))
      );
      this.botones=true;
      this.aux=2;
  }

//Filtro para obtener los bungalos familiares
  filterBungalowsRoom(): void {
    this._roomService
      .getRooms()
      .subscribe(
        (res) => (this.rooms = res.filter((r) => r.room_type_id === 3))
      );
      this.botones=true;
      this.aux=3;
  }


  stateRoom(envio:Room, idstatus:number): void{
    this._roomService
    .getRooms()
    .subscribe(
      (res) => (this.rooms = res.filter((r) => r.room_type_id === envio.id_room && r.room_status_id===idstatus))
    );
  }
}
