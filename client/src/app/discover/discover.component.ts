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
    this.discoverForm
      .get('selectedType')
      ?.valueChanges.subscribe((selectedType) => {
        this.selectedType = selectedType;
        console.log('Changed value:', this.selectedType);

        if (this.selectedType == 'movie' || this.selectedType == 'tvShow') {
          this.apiService
            .getMoviesOrTVShows(this.selectedType)
            .subscribe((shows: Show[]) => {
              this.shows = shows;
            });
        } else {
          this.apiService.getAllShows().subscribe((shows: any) => {
            this.shows = shows;
          });
        }
      });
    if (this.selectedType == 'movie' || this.selectedType == 'tvShow') {
      this.apiService
        .getMoviesOrTVShows(this.selectedType)
        .subscribe((shows: any) => {
          this.shows = shows;
        });
    } else {
      this.apiService.getAllShows().subscribe((shows: any) => {
        this.shows = shows;
      });
    }
  }
}
