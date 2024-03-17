import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment.development';
const { apiUrl } = environment;
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
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
}
