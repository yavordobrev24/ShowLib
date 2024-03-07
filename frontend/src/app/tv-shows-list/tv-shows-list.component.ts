import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tv-shows-list',
  templateUrl: './tv-shows-list.component.html',
  styleUrls: ['./tv-shows-list.component.css'],
})
export class TvShowsListComponent implements OnInit {
  tvShows: any = [];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.tvShows = this.apiService.getTVShows();
  }
  details(e: any) {
    console.log(e.currentTarget);
  }
}
