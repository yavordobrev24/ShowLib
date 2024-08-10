import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from './user/user.service';
import {
  Observable,
  catchError,
  forkJoin,
  map,
  merge,
  tap,
  throwError,
  zip,
} from 'rxjs';
import Show from 'src/types/show';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  searchValue: string | undefined;
  constructor(private http: HttpClient, private userService: UserService) {}
  }
      })
    );
  }
  }
  }
  }
  }
  saveToUserLibrary(lib: Library) {
    const data = {
      savedShows: lib.savedShows,
      _ownerId: this.userService.user!._id,
    };
    return this.http.put(`/api/data/libraries/${lib._id}`, data, {
      headers: {
        'X-Authorization': this.userService.user!.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  removeFromUserLibrary(lib: Library) {
    const data = {
      savedShows: lib.savedShows,
      _ownerId: this.userService.user!._id,
    };

    return this.http.put(`/api/data/libraries/${lib._id}`, data, {
      headers: {
        'X-Authorization': this.userService.user!.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  addComment(id: string | null, comment: string) {
    console.log('API COMMENT ', comment);

    const data = {
      showId: id,
      content: comment,
      username: this.userService.user!.username,
    };

    return this.http.post('/api/data/comments', data, {
      headers: {
        'X-Authorization': this.userService.user!.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  deleteComment(id: string) {
    return this.http.delete(`/api/data/comments/${id}`, {
      headers: {
        'X-Authorization': this.userService.user!.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  editComment(data: any) {
    return this.http.put(`/api/data/comments/${data._id}`, data, {
      headers: {
        'X-Authorization': this.userService.user!.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
}
