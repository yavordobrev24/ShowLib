import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import {
  Form,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  commentForm = new FormGroup({
    comment: new FormControl(''),
  });
  movie: any;
  comments: any;
  movieId: string | null = null;
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
      this.movieId = params['id'];
    });
    if (this.isLogged) {
      this.userId = this.userService.user._id;
    }
    this.apiService
      .getMovie(this.movieId)
      .subscribe((data: any) => (this.movie = data));

    this.apiService.getComments().subscribe((x) => {
      this.comments = Object.values(x).filter((y) => y.showId === this.movieId);
      if (
        this.comments?.find(
          (x: any) => x._ownerId == this.userService.user?._id
        )
      ) {
        this.commentAdded = true;
      } else {
        this.commentAdded = false;
      }
    });
    const lsLib = localStorage.getItem('library');
    const library = lsLib !== null ? JSON.parse(lsLib) : '';

    if (library.savedMovies?.find((x: any) => this.movieId == x._id)) {
      console.log('Has saved');

      this.hasSaved = true;
    } else {
      this.hasSaved = false;
    }
  }

  addComment() {
    if (this.commentForm.invalid) {
      return;
    }
    console.log(this.commentForm.value);

    const { comment }: any = this.commentForm.value;

    if (!this.commentToEdit) {
      this.apiService
        .addComment(this.movieId, comment)
        .subscribe((x) => this.comments.push(x));
      this.commentAdded = true;
    } else {
      this.commentToEdit.content = comment;
      this.comments.push(this.commentToEdit);
      this.apiService.editComment(this.commentToEdit).subscribe((x) => x);
      this.commentToEdit = false;
      this.commentAdded = true;
    }
  }

  saveMovie() {
    const lsLib = localStorage.getItem('library');
    const library = lsLib !== null ? JSON.parse(lsLib) : '';
    console.log(library);

    library.savedMovies.push(this.movie);
    localStorage.setItem('library', JSON.stringify(library));
    this.apiService.saveToUserLibrary(library).subscribe((x) => console.log(x));

    this.hasSaved = true;
  }

  editComment(id: string) {
    this.commentToEdit = this.comments.find((x: any) => x._id == id);
    this.comments = this.comments.filter((x: any) => x._id != id);
    this.commentForm.patchValue({ comment: this.commentToEdit.content });

    this.commentAdded = false;
  }

  deleteComment(id: string) {
    this.comments = this.comments.filter((x: any) => x._id != id);
    this.apiService.deleteComment(id).subscribe((x) => console.log(x));
    this.commentForm.patchValue({ comment: '' });
    this.commentAdded = false;
  }
  unsaveMovie() {
    const lsLib = localStorage.getItem('library');
    const library = lsLib !== null ? JSON.parse(lsLib) : '';
    console.log(library);

    const moviesToResave = library.savedMovies.filter(
      (x: any) => x._id !== this.movieId
    );
    console.log(this.movieId);

    console.log(moviesToResave);

    const libraryToResave = library;
    libraryToResave.savedMovies = moviesToResave;
    localStorage.setItem('library', JSON.stringify(libraryToResave));
    this.apiService
      .removeFromUserLibrary(libraryToResave)
      .subscribe((x) => console.log(x));

    this.hasSaved = false;
  }
}
