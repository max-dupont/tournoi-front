import { Injectable } from '@angular/core';
import { Game } from '../@interfaces/game';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayersService } from './players.service';
import { Player } from '../@interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private gamesUrl = 'http://localhost:3000/games';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    }),
  };

  constructor(
    private http: HttpClient,
    private playersService: PlayersService
  ) { }

  getAll() {
    return this.http.get<Game[]>(this.gamesUrl, this.httpOptions);
  }
  addAll(nbPlayers: number) {
    this.playersService.getAll().subscribe({
      next: players => {
        for (let i = 0; i < nbPlayers/2; i++) {
          const game: Game = {
            tower: 1,
            number: i+1,
            first_player: players[i].id,
            second_player: players[nbPlayers-i-1].id
          }
          this.addOne(game).subscribe({
            next: success => console.log(success),
            error: error => console.log(error)
          })
        }
      },
      error: error => console.log(error)
    })
  }
  addOne(game: Game) {
    return this.http.post<Game[]>(this.gamesUrl, game, this.httpOptions);
  }
  updateOne(game: Game) {
    return this.http.put<Game>(`${this.gamesUrl}/${game.id}`, game, this.httpOptions);
  }
  deleteAll() {}
}
