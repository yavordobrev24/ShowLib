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
  deleteFavourite() {
    const favourite = {
      user_id: this.userId,
      media_type: this.type,
      media_id: this.showId,
    };

    this.apiService.deleteFavourite(favourite).subscribe((x: any) => {
      console.log(x);
    });
    this.isFavourite = false;
  }
  addComment() {
    if (this.commentForm.invalid) {
      return;
    }
    const commentForm = this.commentForm.value;
    let comment = {
      content: commentForm.content,
      user_id: this.userId,
      user_name: this.userService.user?.username,
      media_type: this.type,
      media_id: this.showId,
    };

    if (!this.commentToEdit) {
      this.apiService
        .addComment(comment)
        .subscribe((x: any) => this.comments.push(x));
      this.commentAdded = true;
    } else {
      this.commentToEdit.content = commentForm.content as string;
      this.comments.push(this.commentToEdit);

      this.apiService
        .editComment({
          ...comment,
          content: this.commentToEdit.content,
          id: this.commentToEdit.id,
        })
        .subscribe((x) => x);
      this.commentAdded = true;
    }
  }
  editComment(id: number) {
    this.commentToEdit = this.comments.find((x: Comment) => x.id == id);
    this.comments = this.comments.filter((x: Comment) => x.id != id);
    this.commentForm.patchValue({ content: this.commentToEdit?.content });
    this.commentAdded = false;
  }

  deleteComment(id: number) {
    this.comments = this.comments.filter((x: Comment) => x.id != id);
    this.apiService.deleteComment(id).subscribe((x) => console.log(x));
    this.commentForm.patchValue({ content: '' });
    this.commentAdded = false;
  }
}
