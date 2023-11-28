import { Component, OnInit } from '@angular/core';
import { Game } from '../@interfaces/game';
import { GamesService } from '../@services/games.service';
import { forkJoin } from 'rxjs';
import { TowersService } from '../@services/towers.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  public games: Game[] = []
  public showRanking = false

  constructor(
    private gamesService: GamesService,
    private towersService: TowersService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  
  ngOnInit(): void {
    this.initGames()
    this.checkNbWinners()
    // console.log('Rooms : ', this.cookieService.get('Rooms'))
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
          if (game.tower === 3) {
            this.updateLastTowerGames(success, playerId)
          }
        },
        error: error => console.log(error),
        complete: () => this.checkNbWinners()
      })
    }
  }

  checkNbWinners() {
    let nbWinners = 0
    this.games.forEach(game => nbWinners += game.winner ? 1 : 0);
    this.showRanking = nbWinners > 0 && nbWinners === this.games.length
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

  updateLastTowerGames(game: Game, winner: number | undefined) {
    this.towersService.updateLastTower(game, winner).subscribe({
      next: success => this.initGames(),
      error: error => console.log(error)
    })
  }

  getFinalRanking() {
    this.router.navigate(['/ranking'])
  }

}
