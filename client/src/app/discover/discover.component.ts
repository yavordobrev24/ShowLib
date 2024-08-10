import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import Show from 'src/types/show';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginatorIntl } from '../paginatorIntl.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class DiscoverComponent implements OnInit {
  discoverForm: FormGroup;
  selectedType!: 'movies' | 'tv-shows';
  shows: Show[] = [];
  baseImageUrl: string = 'https://image.tmdb.org/t/p/w500/';
  pages!: number;
  currentPage!: number;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.discoverForm = new FormGroup({
      selectedType: new FormControl(this.selectedType),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const type = params['selectedType'] as 'movies' | 'tv-shows';
      const page = params['page'];
      if ((type === 'movies' || type === 'tv-shows') && page > 0) {
        this.selectedType = type;
        this.currentPage = page;
        this.discoverForm.patchValue({ selectedType: type });
      } else {
        this.router.navigate(['/discover'], {
          queryParams: {
            selectedType: 'movies',
            page: 1,
          },
        });
      }
    });
    this.discoverForm.get('selectedType')?.valueChanges.subscribe((type) => {
      this.selectedType = type;
      this.router.navigate(['/discover'], {
        queryParams: {
          selectedType: type,
          page: this.currentPage,
        },
      });
      this.loadShows(type, this.currentPage);
    });
    this.loadShows(this.selectedType, this.currentPage);
  }

  private loadShows(type: 'movies' | 'tv-shows', page: number): void {
    this.apiService.getShows(type, page).subscribe(
      (response: any) => {
        this.pages = response.total_pages;
        this.shows = response.results;
      },
      (error) => {
        console.error(`Error fetching ${type}:`, error);
      }
    );
  }
  handlePageEvent(pageEvent: PageEvent) {
    window.scrollTo(0, 0);
    this.currentPage = pageEvent.pageIndex + 1;
    this.router.navigate(['/discover'], {
      queryParams: {
        selectedType: this.selectedType,
        page: this.currentPage,
      },
    });
  }
}
