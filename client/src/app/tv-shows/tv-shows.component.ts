import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css'],
})
export class TvShowsComponent implements OnInit {
  tvShows: any;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getTVShows().subscribe((data) => (this.tvShows = data));
  }
  details(e: any) {
    console.log(e.currentTarget);
  }
}
