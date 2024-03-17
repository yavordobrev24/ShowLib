import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css'],
})
export class TvShowDetailsComponent implements OnInit {
  tvShow: any;
  tvShowId: any;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tvShowId = params['id'];
    });
    this.apiService
      .getTVShow(this.tvShowId)
      .subscribe((data) => (this.tvShow = data));
  }
}
