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
    let winnerGame: Game = {tower : 2, number: 0}
    let loserGame: Game = {tower : 2, number: 0}
    if (game.number === 1) {
      winnerGame = {
        ...winnerGame,
        number: 1,
        first_player: winner
      }
      loserGame = {
        ...loserGame,
        number: 3,
        second_player: winner === game.first_player ? game.second_player : game.first_player
      }
    } else if (game.number === 2) {
      winnerGame = {
        ...winnerGame,
        number: 2,
        first_player: winner
      }
      loserGame = {
        ...loserGame,
        number: 4,
        second_player: winner === game.first_player ? game.second_player : game.first_player
      }
    } else if (game.number === 3) {
      winnerGame = {
        ...winnerGame,
        number: 2,
        second_player: winner
      }
      loserGame = {
        ...loserGame,
        number: 4,
        first_player: winner === game.first_player ? game.second_player : game.first_player
      }
    } else if (game.number === 4) {
      winnerGame = {
        ...winnerGame,
        number: 1,
        second_player: winner
      }
      loserGame = {
        ...loserGame,
        number: 3,
        first_player: winner === game.first_player ? game.second_player : game.first_player
      }
    }
    return forkJoin([this.gamesService.updateOne(winnerGame), this.gamesService.updateOne(loserGame)])
  }
  updateTowerTwo(game: Game, winner: number) {}
  updateTowerThree(game: Game, winner: number) {}

  updateWinner(game: Game) {
    return this.gamesService.updateOne(game)
  }

}
