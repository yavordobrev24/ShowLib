import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import Favourite from 'src/types/favourite';
import User from 'src/types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  favourites!: Favourite[];
  user: User | undefined;
  USER_KEY = 'user';

  constructor(private http: HttpClient, private router: Router) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = lsUser ? JSON.parse(lsUser) : undefined;
    } catch (error) {
      this.user = undefined;
    }
  }
  login(email: string, password: string) {
    return this.http.post('/api/users/login', { email, password });

  get isLogged(): boolean {
    return !!this.user;
  }
  register(username: string, email: string, password: string) {
    return this.http.post('/api/users/register', { username, email, password });
  }
  logout() {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.LIB_KEY);
    this.router.navigate(['/login']);
    return this.http.get('/api/users/logout');
  }
}
