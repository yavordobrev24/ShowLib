import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LoggedActivate } from '../guards/logged.guard';
import { NotLoggedActivate } from '../guards/notlogged.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedActivate],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedActivate],
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [LoggedActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
