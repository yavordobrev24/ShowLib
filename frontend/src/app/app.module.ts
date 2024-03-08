import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';
import { DiscoverComponent } from './discover/discover.component';
import { MoviesComponent } from './movies/movies.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { UserRoutingModule } from './user/user-routing.module';
import { UserModule } from './user/user.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    MoviesListComponent,
    TvShowsListComponent,
    DiscoverComponent,
    MoviesComponent,
    TvShowsComponent,
    MovieDetailsComponent,
    TvShowDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
