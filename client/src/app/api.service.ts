import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from './user/user.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  searchValue: any;
  constructor(private http: HttpClient, private userService: UserService) {}
  getAllShows() {
    return this.http.get('/api/data/shows');
  }
  getMoviesOrTVShows(type: string) {
    return this.getAllShows().pipe(
      map((shows: any) => {
        return shows.filter((show: any) => show.type == type);
      })
    );
  }
  getShowById(id: string | null) {
    return this.http.get('/api/data/shows/' + id);
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
      savedShows: [],
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
      savedShows: lib.savedShows,
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
      savedShows: lib.savedShows,
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
}
