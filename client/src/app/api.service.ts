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

  getShows(
    type: 'movies' | 'tv-shows',
    page: number = 1,
    query?: string
  ): Observable<Show[]> {
    const queryParams = query ? `query=${query}&page=${page}` : `page=${page}`;
    return this.http.get<Show[]>(`/api/${type}?${queryParams}`).pipe(
      catchError((error) => {
        return throwError(() => new Error('Error fetching data'));
      })
    );
  }
      })
    );
  }
  }
  }
  }
  }
  }
  }
  addComment(comment: any) {
    return this.http.post('/api/comments', comment);
  }
  deleteComment(id: number) {
    return this.http.delete(`/api/comments/${id}`);
  }
  editComment(comment: any) {
    return this.http.put(`/api/comments/${comment.id}`, {
      ...comment,
      media_id: Number(comment.media_id),
    });
  }
}
