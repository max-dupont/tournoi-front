import { Component, OnInit } from '@angular/core';
import { Game } from '../@interfaces/game';
import { GamesService } from '../@services/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  public games: Game[] = []

  constructor(private gamesService: GamesService) {}
  
  ngOnInit(): void {
    this.gamesService.getAll().subscribe({
      next: success => this.games = success,
      error: error => console.log(error)
    })
  }

  selectWinner(game: Game, playerId: number | undefined) {
    if (playerId) {
      this.gamesService.updateOne({...game, winner: playerId}).subscribe({
        next: success => {
          let gameIndex = this.games.indexOf(game)
          this.games[gameIndex] = success
        },
        error: error => console.log(error)
      })
    } else {
      console.error('ERROR : No playerId')
    }
  }
}
