import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from './user/user.service';

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
  getAllLibraries() {
    return this.http.get('/api/data/libraries', {
      headers: {
        'X-Authorization': this.userService.user.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  createLibrary() {
    const data = {
      savedTVShows: [],
      savedMovies: [],
    };
    return this.http.post('/api/data/libraries', data, {
      headers: {
        'X-Authorization': this.userService.user.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  saveToUserLibrary(lib: any) {
    const data = {
      savedMovies: lib.savedMovies,
      savedTVShows: lib.savedTVShows,
      _ownerId: this.userService.user._id,
    };
    return this.http.put(`/api/data/libraries/${lib._id}`, data, {
      headers: {
        'X-Authorization': this.userService.user.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  removeFromUserLibrary(lib: any) {
    const data = {
      savedMovies: lib.savedMovies,
      savedTVShows: lib.savedTVShows,
      _ownerId: this.userService.user._id,
    };

    return this.http.put(`/api/data/libraries/${lib._id}`, data, {
      headers: {
        'X-Authorization': this.userService.user.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  addComment(id: string | null, comment: string) {
    console.log('API COMMENT ', comment);

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
  // getAllShows() {
  //   return this.http.get('/api/data/shows');
  // }
  // performSearch(searchValue: string) {
  //   this.getAllShows().subscribe((x: any) => {
  //     return x.find((y: any) => y.title === searchValue);
  //   });
  // }
}
