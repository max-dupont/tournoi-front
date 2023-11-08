import { Injectable } from '@angular/core';
import { Game } from '../@interfaces/game';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayersService } from './players.service';
import { Player } from '../@interfaces/player';
import { Router } from '@angular/router';

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
    private playersService: PlayersService,
    private router: Router
  ) { }

  getAll() {
    return this.http.get<Game[]>(this.gamesUrl, this.httpOptions);
  }
  addAll(nbPlayers: number) {
    this.playersService.getAll().subscribe({
      next: players => {
        for (let j = 0; j < Math.log2(nbPlayers); j++) {
          for (let i = 0; i < nbPlayers/2; i++) {
            const game: Game = {
              tower: j+1,
              number: i+1,
              first_player: j=== 0 ? players[i].id : undefined,
              second_player: j===0 ? players[nbPlayers-i-1].id : undefined
            }
            this.addOne(game).subscribe({
              next: success => console.log(success),
              error: error => console.log(error)
            })
          }          
        }
      },
      error: error => console.log(error),
      complete: () => this.router.navigate(['/games-list'])
    })
  }
  addOne(game: Game) {
    return this.http.post<Game[]>(this.gamesUrl, game, this.httpOptions);
  }
  updateOne(game: Game) {
    return this.http.put<Game>(this.gamesUrl, game, this.httpOptions);
  }
  deleteAll() {
    return this.http.delete(this.gamesUrl, this.httpOptions);
  }
}
