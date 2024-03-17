import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: any;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getMovies().subscribe((data: any) => {
      this.movies = data;
    });
  }
  details(e: any) {
    console.log(e.currentTarget);
  }
}
