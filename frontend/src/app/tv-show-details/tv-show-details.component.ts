import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css'],
})
export class TvShowDetailsComponent implements OnInit {
  tvShow: any;
  comments: any;
  tvShowId: string | null = null;
  commentAdded: boolean | undefined;
  userId: any;
  hasSaved: any;
  commentToEdit: any;
  isLogged: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('new init');
    this.isLogged = this.userService.isLogged;

    this.route.params.subscribe((params) => {
      this.tvShowId = params['id'];
    });
    if (this.isLogged) {
      this.userId = this.userService.user._id;
    }
    this.apiService
      .getTVShow(this.tvShowId)
      .subscribe((data: any) => (this.tvShow = data));

    this.apiService.getComments().subscribe((x) => {
      console.log('TV SHOW COMMENTS: ', x);

      this.comments = Object.values(x).filter(
        (y) => y.showId === this.tvShowId
      );
      console.log(this.comments);

      if (
        this.comments?.find(
          (x: any) => x._ownerId == this.userService.user?._id
        )
      ) {
        console.log('Comment Added');

        this.commentAdded = true;
      } else {
        console.log('Comment NOT Added');
        this.commentAdded = false;
      }
    });
    const lsLib = localStorage.getItem('library');
    const library = lsLib !== null ? JSON.parse(lsLib) : '';

    if (library.savedTVShows?.find((x: any) => this.tvShowId == x._id)) {
      console.log('Has saved');

      this.hasSaved = true;
    } else {
      this.hasSaved = false;
    }
  }

  addComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { comment } = form.value;

    if (!this.commentToEdit) {
      this.apiService
        .addComment(this.tvShowId, comment)
        .subscribe((x) => this.comments.push(x));
      console.log('TV SHOW COMMENT: ', comment);

      this.commentAdded = true;
    } else {
      this.commentToEdit.content = comment;
      this.comments.push(this.commentToEdit);
      this.apiService.editComment(this.commentToEdit).subscribe((x) => x);
      this.commentToEdit = false;
      this.commentAdded = true;
    }
  }

  saveTVShow() {
    const lsLib = localStorage.getItem('library');
    const library = lsLib !== null ? JSON.parse(lsLib) : '';
    console.log(library);

    library.savedTVShows.push(this.tvShow);
    localStorage.setItem('library', JSON.stringify(library));
    this.apiService.saveToUserLibrary(library).subscribe((x) => console.log(x));

    this.hasSaved = true;
  }

  editComment(id: string) {
    this.commentToEdit = this.comments.find((x: any) => x._id == id);
    this.comments = this.comments.filter((x: any) => x._id != id);
    this.commentAdded = false;
  }

  deleteComment(id: string) {
    this.comments = this.comments.filter((x: any) => x._id != id);
    this.apiService.deleteComment(id).subscribe((x) => console.log(x));
    this.commentAdded = false;
  }
  unsaveTVShow() {
    const lsLib = localStorage.getItem('library');
    const library = lsLib !== null ? JSON.parse(lsLib) : '';
    console.log(library);

    const tvShowsToResave = library.savedTVShows.filter(
      (x: any) => x._id !== this.tvShowId
    );
    console.log(this.tvShowId);

    console.log(tvShowsToResave);

    const libraryToResave = library;
    libraryToResave.savedTVShows = tvShowsToResave;
    localStorage.setItem('library', JSON.stringify(libraryToResave));
    this.apiService
      .removeFromUserLibrary(libraryToResave)
      .subscribe((x) => console.log(x));

    this.hasSaved = false;
  }
}
