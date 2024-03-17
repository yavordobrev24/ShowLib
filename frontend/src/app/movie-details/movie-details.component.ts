import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieId: string | null = null;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
    });
    this.apiService
      .getMovie(this.movieId)
      .subscribe((data: any) => (this.movie = data));
  }
}
