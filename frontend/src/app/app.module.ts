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

import { MoviesComponent } from './movies/movies.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { UserModule } from './user/user.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { appInterceptorProvider } from './app.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './safe.pipe';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    MoviesListComponent,
    TvShowsListComponent,
    MoviesComponent,
    TvShowsComponent,
    MovieDetailsComponent,
    TvShowDetailsComponent,
    SafePipe,
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    UserModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
