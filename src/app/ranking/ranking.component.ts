import { Component, OnInit } from '@angular/core';
import { Player } from '../@interfaces/player';
import { PlayersService } from '../@services/players.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit{
  public players: Player[] = []

  constructor(private playersService: PlayersService) {}

  ngOnInit(): void {
    this.playersService.getAll().subscribe({
      next: success => this.players = success,
      error: error => console.log(error)
    })
  }

}
