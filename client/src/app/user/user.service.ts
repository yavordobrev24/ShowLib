import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Library, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  library: Library | undefined;
  user: User | undefined;
  USER_KEY = 'user';
  LIB_KEY = 'library';
  get isLogged(): boolean {
    return !!this.user;
  }
  constructor(private http: HttpClient, private router: Router) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }
  login(email: string, password: string) {
    return this.http.post('/api/users/login', { email, password });
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
