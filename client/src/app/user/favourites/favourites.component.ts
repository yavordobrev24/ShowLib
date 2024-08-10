import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Show from 'src/types/show';
import { UserService } from '../user.service';
import Favourite from 'src/types/favourite';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favouritesForm: FormGroup;
  selectedType: 'movies' | 'tv-shows' = 'movies';
  favourites: Favourite[] = [];
  baseImageUrl: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.favouritesForm = new FormGroup({
      selectedType: new FormControl(this.selectedType),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const type = params['selectedType'] as 'movies' | 'tv-shows';
      if (type === 'movies' || type === 'tv-shows') {
        this.selectedType = type;
        this.favouritesForm.patchValue({ selectedType: type });
      } else {
        this.router.navigate(['/favourites'], {
          queryParams: { selectedType: 'movies' },
        });
      }
    });
    this.favouritesForm.get('selectedType')?.valueChanges.subscribe((type) => {
      this.selectedType = type;
      this.router.navigate(['/favourites'], {
        queryParams: { selectedType: type },
      });
      this.loadFavourites(type);
    });

    this.loadFavourites(this.selectedType);
  }
}
