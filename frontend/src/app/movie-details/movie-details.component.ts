import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Form, NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  comments: any;
  movieId: string | null = null;
  commentAdded: boolean | undefined;
  userId: string | undefined | null;
  commentToEdit: any;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
    });
    this.apiService
      .getMovie(this.movieId)
      .subscribe((data: any) => (this.movie = data));
    this.apiService.getComments().subscribe((x) => {
      this.comments = Object.values(x).filter((y) => y.showId === this.movieId);
      console.log('Comments', this.comments);
      this.userId = this.userService.user._id;
      if (
        this.comments.find((x: any) => x._ownerId == this.userService.user._id)
      ) {
        this.commentAdded = true;
      } else {
        this.commentAdded = false;
      }
    });
  }
  addComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { comment } = form.value;
    console.log('hasComment', this.commentToEdit);

    if (!this.commentToEdit) {
      this.apiService
        .addComment(this.movieId, comment)
        .subscribe((x) => this.comments.push(x));
      this.commentAdded = true;
    } else {
      console.log('Here', this.commentToEdit);
      this.commentToEdit.content = comment;
      this.comments.push(this.commentToEdit);
      this.apiService.editComment(this.commentToEdit).subscribe((x) => x);
      this.commentToEdit = false;
      this.commentAdded = true;
    }
  }
  save() {
    console.log('to save');
  }

  editComment(id: string) {
    this.commentToEdit = this.comments.find((x: any) => x._id == id);
    this.comments = this.comments.filter((x: any) => x._id != id);
    this.commentAdded = false;
    console.log(this.commentToEdit);

    // this.apiService
    //   .editComment(id, this.comment)
    //   .subscribe((x) => console.log(x));
    console.log(this.comments);
  }
  deleteComment(id: string) {
    this.comments = this.comments.filter((x: any) => x._id != id);
    this.apiService.deleteComment(id).subscribe((x) => console.log(x));
    this.commentAdded = false;
  }
}
