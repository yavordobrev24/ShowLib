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
  }
  }
  addComment(comment: any) {
    return this.http.post('/api/comments', comment);
  }
  deleteComment(id: string) {
    return this.http.delete(`/api/data/comments/${id}`, {
      headers: {
        'X-Authorization': this.userService.user!.accessToken,
        'Content-Type': 'application/json',
      },
    });
  }
  editComment(comment: any) {
    return this.http.put(`/api/comments/${comment.id}`, {
      ...comment,
      media_id: Number(comment.media_id),
    });
  }
}
