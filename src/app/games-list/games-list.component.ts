import { Component, OnInit } from '@angular/core';
import { Game } from '../@interfaces/game';
import { GamesService } from '../@services/games.service';
import { forkJoin } from 'rxjs';
import { TowersService } from '../@services/towers.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Room } from '../@interfaces/room';
import { RoomsService } from '../@services/rooms.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  public games: Game[] = []
  public rooms: Room[] = []
  public showRanking = false
  public roomsAvailables: number = 0

  constructor(
    private gamesService: GamesService,
    private towersService: TowersService,
    private roomsService: RoomsService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  
  ngOnInit(): void {
    this.initGames()
    this.initRooms()
    this.checkNbWinners()
    // console.log('Rooms : ', this.cookieService.get('Rooms'))
  }
  
  initRooms() {
    this.roomsService.getAll().subscribe({
      next: success => {
        this.rooms = success
        this.rooms.forEach(room => {
          this.roomsAvailables += room.available ? 1 : 0
        });
      },
      error: error => console.log(error)
    })
  }

  selectRoom(game: Game, room_id: string) {
    this.gamesService.updateOne({...game, room: +room_id}).subscribe({
      next: success => {
        this.roomsService.updateOne({id: +room_id, available: false}).subscribe({
          next: success => console.log(success),
          error: error => console.log(error)
        })
      },
      error: error => console.log(error)
    })
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
          this.games[gameIndex] = success[0]
          if (game.tower === 1) {
            this.updateTowerOneGames(success[0], playerId)
          }
          if (game.tower === 2) {
            this.updateTowerTwoGames(success[0], playerId)
          } 
          if (game.tower === 3) {
            this.updateLastTowerGames(success[0], playerId)
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
