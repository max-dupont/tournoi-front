import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../@interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  public roomsUrl = 'http://localhost:3000/rooms'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    }),
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Room[]>(this.roomsUrl, this.httpOptions);
  }
  getAllAvailable() {
    return this.http.get<Room[]>(`${this.roomsUrl}/available`, this.httpOptions);
  }
  addOne(room: Room) {
    return this.http.post<Room[]>(this.roomsUrl, room, this.httpOptions);
  }
  updateOne(room: Room) {
    return this.http.put<Room>(this.roomsUrl, room, this.httpOptions);
  }
  deleteAll() {
    return this.http.delete(this.roomsUrl, this.httpOptions);
  }

}
