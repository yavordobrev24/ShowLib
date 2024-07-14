import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Show } from 'src/types/show';
import { Comment } from 'src/types/comment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  commentForm = new FormGroup({
    comment: new FormControl(''),
  });
  show: Show | undefined;
  comments: Comment[] = [];
  showId: string | null = null;
  commentAdded: boolean | undefined;
  userId: string | undefined;
  hasSaved: boolean = false;
  commentToEdit: Comment | undefined;
  isLogged: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('new init');
    this.isLogged = this.userService.isLogged;

    this.route.params.subscribe((params) => {
      this.showId = params['id'];
    });
    if (this.isLogged) {
      this.userId = this.userService.user?._id;
    }
    this.apiService
      .getShowById(this.showId)
      .subscribe((data: any) => (this.show = data));

    this.apiService.getComments().subscribe((x) => {
      this.comments = Object.values(x).filter((y) => y.showId === this.showId);
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

    if (library.savedShows?.find((x: any) => this.showId == x._id)) {
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
