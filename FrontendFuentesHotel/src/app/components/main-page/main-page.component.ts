import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  rooms: Room[] = [];
  constructor(private _roomService: RoomService) {}

  ngOnInit(): void {
    this._roomService.getRooms().subscribe((res) => (this.rooms = res));
  }

  filterNothing(): void {
    this._roomService.getRooms().subscribe((res) => (this.rooms = res));
  }

  filterDoubleRoom(): void {
    this._roomService
      .getRooms()
      .subscribe(
        (res) => (this.rooms = res.filter((r) => r.room_type_id === 2))
      );
  }
}
