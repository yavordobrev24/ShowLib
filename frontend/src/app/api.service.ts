import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment.development';
import { UserService } from './user/user.service';

const { apiUrl } = environment;
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private userService: UserService) {}
  getMovies() {
    return this.http.get('/api/data/movies');
  }
  getTVShows() {
    return this.http.get('/api/data/tvShows');
  }
  getMovie(id: string | null) {
    return this.http.get('/api/data/movies/' + id);
  }
  getTVShow(id: string | null) {
    return this.http.get('/api/data/tvShows/' + id);
  }
  getComments() {
    return this.http.get('/api/data/comments');
  }
  getUserLibrary() {
    return this.http.get('/api/data/libraries/');
  }
  saveToUserLibrary() {
    return this.http.put('/api/data/libraries', {});
  }
  addComment(id: string | null, comment: string) {
    console.log(typeof comment);

    const data = {
      showId: id,
      content: comment,
      username: this.userService.user.username,
    };

    return this.http.post('/api/data/comments', data, {
      headers: {
        'X-Authorization': this.userService.user.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  deleteComment(id: string) {
    return this.http.delete(`/api/data/comments/${id}`, {
      headers: {
        'X-Authorization': this.userService.user.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  editComment(data: any) {
    return this.http.put(`/api/data/comments/${data._id}`, data, {
      headers: {
        'X-Authorization': this.userService.user.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
}
