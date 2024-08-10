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

  get isLogged(): boolean {
    return !!this.user;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/auth/login', { email, password }).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http
      .post<User>('/api/auth/register', { username, email, password })
      .pipe(
        tap((user) => {
          this.user = user;
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          this.router.navigate(['/home']);
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  logout(): Observable<void> {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
    return this.http.post<void>('/api/auth/logout', {}).pipe(
      tap(() => console.log('Logout request sent')),
      catchError((error: HttpErrorResponse) => {
        return EMPTY;
      })
    );
  }
}
