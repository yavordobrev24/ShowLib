import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Show } from '../types';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  movies: Show[] | undefined;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getMoviesOrTVShows('movie').subscribe((data: Show[]) => {
      this.movies = data.slice(0, 5);
      console.log(data);
    });
  }
}
