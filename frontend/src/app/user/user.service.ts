import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: object | undefined;
  LS_KEY = 'user';
  get isLogged(): boolean {
    return !!this.user;
  }
  constructor(private http: HttpClient, private router: Router) {
    try {
      const lsUser = localStorage.getItem(this.LS_KEY) || '';
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
    localStorage.removeItem(this.LS_KEY);
    this.router.navigate(['/home']);
    return this.http.get('/api/users/logout');
  }
}
