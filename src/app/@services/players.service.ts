import { Injectable } from '@angular/core';
import { Player, PlayerRanking } from '../@interfaces/player';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private playersUrl = 'http://localhost:3000/players';  // URL to web api
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
    return this.http.get<Player[]>(this.playersUrl, this.httpOptions);
  }
  addOne(player: Player) {
    return this.http.post<Player[]>(this.playersUrl, player, this.httpOptions);
  }
  updateOne(player: PlayerRanking) {
    return this.http.put<PlayerRanking>(this.playersUrl, player, this.httpOptions);
  }
  deleteAll() {}
}
