import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  movies: any;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getMovies().subscribe((data: any) => {
      this.movies = data;
    });
  }
}
