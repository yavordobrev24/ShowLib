import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

import Show from 'src/types/show';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginatorIntl } from '../paginatorIntl.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorIntl,
    },
  ],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  selectedType!: 'movies' | 'tv-shows';
  shows: Show[] = [];
  baseImageUrl: string = 'https://image.tmdb.org/t/p/w500/';
  searchValue: string = '';
  pages!: number;
  currentPage!: number;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.searchForm = new FormGroup({
      selectedType: new FormControl(this.selectedType),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.searchValue = params['searchValue'];
      if (this.searchValue == '') {
        this.apiService.getAllShows().subscribe((shows: any) => {
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
