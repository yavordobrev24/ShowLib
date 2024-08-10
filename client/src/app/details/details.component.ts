import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user/user.service';
import Comment from 'src/types/comment';
import Show from 'src/types/show';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  commentForm = new FormGroup({
    content: new FormControl(''),
  });
  baseImageUrl: string = 'https://image.tmdb.org/t/p/original/';
  show: Show | undefined;
  comments: Comment[] = [];
  showId!: number;
  commentAdded: boolean | undefined;
  userId: number | undefined;
  isFavourite: boolean = false;
  commentToEdit: Comment | undefined;
  isLogged: boolean = false;
  type!: 'movies' | 'tv-shows';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.url[0].path as 'movies' | 'tv-shows';
    this.isLogged = this.userService.isLogged;
    this.route.params.subscribe((params) => {
      this.showId = params['id'];
    });
    if (this.isLogged) {
      this.userId = this.userService.user?.id;
    }

    this.apiService.getShow(this.type, this.showId).subscribe((data: any) => {
      this.show = data;
    });
    const favourite = {
      user_id: this.userId,
      media_type: this.type,
      media_id: this.showId,
    };
    this.apiService.getFavourite(favourite).subscribe((data: any) => {
      if (!data) {
        this.isFavourite = false;
      } else {
        this.isFavourite = true;
      }
    });
    this.apiService
      .getShowComments(this.type, this.showId)
      .subscribe((x: any) => {
        this.comments = x;
        if (this.comments?.find((x: any) => x.user_id == this.userId)) {
          this.commentAdded = true;
        } else {
          this.commentAdded = false;
        }
      });
  }
  addFavourite() {
    const favourite = {
      user_id: this.userId,
      media_type: this.type,
      media_id: this.showId,
      media_poster: this.show?.poster_path || this.show?.backdrop_path,
      media_title: this.show?.title || this.show?.name,
    };
    this.apiService.addFavourite(favourite).subscribe((x: any) => {
      console.log(x);
    });

    this.isFavourite = true;
  }
  addComment() {
    if (this.commentForm.invalid) {
      return;
    }
    console.log(this.commentForm.value);

    const { comment }: any = this.commentForm.value;

    if (!this.commentToEdit) {
      this.apiService
        .addComment(this.showId, comment)
        .subscribe((x: any) => this.comments.push(x));
      this.commentAdded = true;
    } else {
      this.commentToEdit.content = comment;
      this.comments.push(this.commentToEdit);
      this.apiService.editComment(this.commentToEdit).subscribe((x) => x);
      this.commentAdded = true;
    }
  }

  saveShow() {
    const lsLib = localStorage.getItem('library');
    const library = lsLib !== null ? JSON.parse(lsLib) : '';
    console.log(library);

    library.savedShows.push(this.show);
    localStorage.setItem('library', JSON.stringify(library));
    this.apiService.saveToUserLibrary(library).subscribe((x) => console.log(x));

    this.hasSaved = true;
  }

  editComment(id: string) {
    this.commentToEdit = this.comments.find((x: Comment) => x._id == id);
    this.comments = this.comments.filter((x: Comment) => x._id != id);
    this.commentForm.patchValue({ comment: this.commentToEdit?.content });

    this.commentAdded = false;
  }

  deleteComment(id: string) {
    this.comments = this.comments.filter((x: Comment) => x._id != id);
    this.apiService.deleteComment(id).subscribe((x) => console.log(x));
    this.commentForm.patchValue({ comment: '' });
    this.commentAdded = false;
  }
  unsaveShow() {
    const lsLib = localStorage.getItem('library');
    const library = lsLib !== null ? JSON.parse(lsLib) : '';
    console.log(library);

    const showsToResave = library.savedShows.filter(
      (x: any) => x._id !== this.showId
    );
    console.log(this.showId);

    console.log(showsToResave);

    const libraryToResave = library;
    libraryToResave.savedShows = showsToResave;
    localStorage.setItem('library', JSON.stringify(libraryToResave));
    this.apiService
      .removeFromUserLibrary(libraryToResave)
      .subscribe((x) => console.log(x));

    this.hasSaved = false;
  }
}
