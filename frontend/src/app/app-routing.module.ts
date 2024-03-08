import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MoviesComponent } from './movies/movies.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { UserRoutingModule } from './user/user-routing.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'tv-shows',
    component: TvShowsComponent,
  },
  {
    path: 'movies/:name',
    component: MovieDetailsComponent,
  },
  {
    path: 'tv-shows/:name',
    component: TvShowDetailsComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
