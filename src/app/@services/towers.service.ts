import { Injectable } from '@angular/core';
import { Game } from '../@interfaces/game';
import { GamesService } from './games.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TowersService {

  constructor(private gamesService:GamesService) { }

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

  getLoser(game: Game, winner: number | undefined) {
    return winner === game.first_player ? game.second_player : game.first_player
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
  updateTowerThree(game: Game, winner: number) {}

  updateWinner(game: Game) {
    return this.gamesService.updateOne(game)
  }

}
