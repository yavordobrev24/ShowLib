import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Show } from '../types';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
})
export class PopularComponent implements OnInit {
  @Input() type: string = '';
  shows: Show[] | undefined;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getMoviesOrTVShows(this.type).subscribe((data: Show[]) => {
      this.shows = data.slice(0, 6);
      console.log(data);
    });
  }
}
