import { Injectable } from '@angular/core';
import { Game } from '../@interfaces/game';
import { GamesService } from './games.service';
import { forkJoin } from 'rxjs';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root'
})
export class TowersService {

  constructor(
    private gamesService:GamesService,
    private playersService: PlayersService
  ) { }

  getLoser(game: Game, winner: number | undefined) {
    return winner === game.first_player ? game.second_player : game.first_player
  }

  updateTowerOne(game: Game, winner: number | undefined) {
    const winnerGame = [
      {tower: 2, number: 1, first_player: winner},
      {tower: 2, number: 2, first_player: winner},
      {tower: 2, number: 2, second_player: winner},
      {tower: 2, number: 1, second_player: winner}
    ]
    const loserGame = [
      {tower: 2, number: 3, second_player: this.getLoser(game, winner)},
      {tower: 2, number: 4, second_player: this.getLoser(game, winner)},
      {tower: 2, number: 4, first_player: this.getLoser(game, winner)},
      {tower: 2, number: 3, first_player: this.getLoser(game, winner)}
    ]
    return forkJoin([this.gamesService.updateOne(winnerGame[game.number-1]), this.gamesService.updateOne(loserGame[game.number-1])])
  }
  updateTowerTwo(game: Game, winner: number | undefined) {
    const winnerGame = [
      {tower: 3, number: 1, first_player: winner},
      {tower: 3, number: 1, second_player: winner},
      {tower: 3, number: 3, first_player: winner},
      {tower: 3, number: 3, second_player: winner}
    ]
    const loserGame = [
      {tower: 3, number: 2, second_player: this.getLoser(game, winner)},
      {tower: 3, number: 2, first_player: this.getLoser(game, winner)},
      {tower: 3, number: 4, second_player: this.getLoser(game, winner)},
      {tower: 3, number: 4, first_player: this.getLoser(game, winner)}
    ]
    return forkJoin([this.gamesService.updateOne(winnerGame[game.number-1]), this.gamesService.updateOne(loserGame[game.number-1])])
  }
  updateLastTower(game: Game, winner: number | undefined) {
    const winnerPlayer = [
      {id: winner, final_place: 1},
      {id: winner, final_place: 3},
      {id: winner, final_place: 5},
      {id: winner, final_place: 7}
    ]
    const loserPlayer = [
      {id: this.getLoser(game, winner), final_place: 2},
      {id: this.getLoser(game, winner), final_place: 4},
      {id: this.getLoser(game, winner), final_place: 6},
      {id: this.getLoser(game, winner), final_place: 8}
    ]
    return forkJoin([this.playersService.updateOne(winnerPlayer[game.number-1]), this.playersService.updateOne(loserPlayer[game.number-1])])
  }

  updateWinner(game: Game) {
    return this.gamesService.updateOne(game)
  }

}
