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
    this.route.queryParams.subscribe((params) => {
      const type = params['selectedType'] as 'movies' | 'tv-shows';
      const query = params['query'];
      const page = params['page'];
      if ((type === 'movies' || type === 'tv-shows') && page > 0) {
        this.selectedType = type;
        this.searchValue = query;
        this.currentPage = page;
        this.searchForm.patchValue({ selectedType: type });
      } else {
        this.router.navigate(['/search'], {
          queryParams: {
            selectedType: 'movies',
            query: this.searchValue,
            page: 1,
          },
        });
      }
    });
    this.searchForm.get('selectedType')?.valueChanges.subscribe((type) => {
      this.selectedType = type;
      this.router.navigate(['/search'], {
        queryParams: {
          selectedType: type,
          query: this.searchValue,
          page: this.currentPage,
        },
      });
      this.loadShows(type, this.currentPage);
    });
    this.loadShows(this.selectedType, this.currentPage);
  }
  }
}
