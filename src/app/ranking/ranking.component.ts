import { Component, OnInit } from '@angular/core';
import { Player } from '../@interfaces/player';
import { PlayersService } from '../@services/players.service';
import { Router } from '@angular/router';
import { GamesService } from '../@services/games.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit{
  public players: Player[] = []

  constructor(
    private playersService: PlayersService,
    private gamesService: GamesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playersService.getAll().subscribe({
      next: success => this.players = success,
      error: error => console.log(error)
    })
  }

  resetTournament() {
    this.gamesService.deleteAll().subscribe({
      next: success => {
        this.playersService.deleteAll().subscribe({
          next: success => console.log(success),
          error: error => console.log(error),
          complete: () => this.router.navigate(['/'])
        })
      },
      error: error => console.log(error)
    })
  }

}
