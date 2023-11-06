import { Component, OnInit } from '@angular/core';
import { Player } from '../@interfaces/player';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayersService } from '../@services/players.service';
import { GamesService } from '../@services/games.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public mockPlayers : Player[] = [
    { lastname:"DUPONT", firstname:"Maxime", license:"4929704" },
    { lastname:"DIXNEUF", firstname:"Quentin", license:"4929706" },
    { lastname:"POIRIER", firstname:"Charlie", license:"4935759" },
    { lastname:"THUILLIER", firstname:"Clément", license:"4935892" },
    { lastname:"TESSON", firstname:"Jérémy", license:"4934689" },
    { lastname:"BECCAVIN", firstname:"Fabrice", license:"4925678" },
    { lastname:"LANGLAIS", firstname:"Eric", license:"7245869" },
    { lastname:"DIXNEUF", firstname:"Ludovic", license:"4912306" }
  ];

  public registrationForm: FormGroup;
  public nbPlayers = 8 // TO DO : add table selection

  get players(): FormArray {
    return <FormArray>this.registrationForm.get('players')
  }

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private playersService: PlayersService,
      private gamesService: GamesService
    ) {
    this.registrationForm = this.fb.group({
      players: this.fb.array([this.buildPlayer()]),
    })
  }

  ngOnInit(): void {
    for (let i = 0; i < this.nbPlayers-1; i++) {
      this.addPlayer()
      this.players.patchValue(this.mockPlayers)
    }
  }

  buildPlayer(): FormGroup {
    return this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      license: [null, Validators.required]
    })
  }

  addPlayer(): void {
    this.players.push(this.buildPlayer())
  }

  registrationPlayers() {
    console.log(this.registrationForm.value.players)
    this.registrationForm.value.players.forEach((player: Player) => {
      this.playersService.addOne(player).subscribe({
          next: (success) => console.log(success),
          error: (error) => console.log(error)
        }
      )
    });
    this.gamesService.addOne()
    this.router.navigate(['/games-list'])
  }

}
