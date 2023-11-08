import { Component, OnInit } from '@angular/core';
import { Game } from '../@interfaces/game';
import { GamesService } from '../@services/games.service';
import { forkJoin } from 'rxjs';
import { TowersService } from '../@services/towers.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  public games: Game[] = []

  constructor(
    private gamesService: GamesService,
    private towersService: TowersService
  ) {}
  
  ngOnInit(): void {
    this.initGames()
  }
  
  initGames() {
    this.gamesService.getAll().subscribe({
      next: success => this.games = success,
      error: error => console.log(error)
    })
  }

  selectWinner(game: Game, playerId: number | undefined) {
    if (playerId) {
      this.towersService.updateWinner({...game, winner: playerId}).subscribe({
        next: success => {
          let gameIndex = this.games.indexOf(game)
          this.games[gameIndex] = success
          if (game.tower === 1) {
            this.updateTowerOneGames(success, playerId)
          }
          if (game.tower === 2) {
            this.updateTowerTwoGames(success, playerId)
          }
        },
        error: error => console.log(error)
      })
    }
  }

  updateTowerOneGames(game: Game, winner: number | undefined) {
    this.towersService.updateTowerOne(game, winner).subscribe({
      next: success => this.initGames(),
      error: error => console.log(error)
    })
  }

  updateTowerTwoGames(game: Game, winner: number | undefined) {
    this.towersService.updateTowerTwo(game, winner).subscribe({
      next: success => this.initGames(),
      error: error => console.log(error)
    })
  }

}
