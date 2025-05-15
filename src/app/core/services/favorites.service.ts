import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Favorite} from '../model/favorite.entity';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private baseUrl = `${environment.serverBasePath}/favorites`
  constructor(private http: HttpClient) {}

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.baseUrl);
  }

  getByTouristAndExperience(touristId: number, experienceId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.baseUrl}?tourist_id=${touristId}&experience_id=${experienceId}`);
  }

  addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.post<Favorite>(this.baseUrl, favorite);
  }

  removeFavorite(favoriteId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${favoriteId}`);
  }

  getFavoritesByTourist(touristId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.baseUrl}?tourist_id=${touristId}`);
  }
}
