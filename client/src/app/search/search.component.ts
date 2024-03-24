import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchValue: string | undefined;
  shows: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.searchValue = params['searchValue'];
      if (this.searchValue == '') {
        this.apiService.getAllShows().subscribe((shows) => {
          this.shows = shows;
        });
      } else {
        this.apiService.getAllShows().subscribe((shows) => {
          this.shows = Object.values(shows).filter((show) =>
            show.title
              .toLocaleLowerCase()
              .includes(this.searchValue?.toLocaleLowerCase())
          );
        });
      }
    });
    console.log('init');
  }
}
