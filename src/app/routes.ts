import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { RankingComponent } from './ranking/ranking.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesTableComponent } from './games-table/games-table.component';

export const appRoutes : Routes = [
    {path: '', redirectTo: 'registration', pathMatch: 'full' },
    {path: 'registration', component: RegistrationComponent },
    {path: 'games-list', component: GamesListComponent },
    {path: 'games-table', component: GamesTableComponent },
    {path: 'ranking', component: RankingComponent },
    // {path: '**', redirectTo: 'registration', pathMatch: 'full'}
]