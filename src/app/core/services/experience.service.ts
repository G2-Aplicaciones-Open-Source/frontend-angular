import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability } from '../model/availability.entity';
// import { environment } from '../../../environments/environment';
import { environment } from '../../../environments/environment.development';
import { Experience } from '../model/experience.entity';
import { Category } from '../model/category.entity';
import {Favorite} from '../model/favorite.entity';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private baseUrl = `${environment.serverBasePath}`
  constructor(private http: HttpClient) { }
  getExperiencesByCategory(categoryId: number): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.baseUrl}/experiences?category_id=${categoryId}`);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
  getAvailabilities(): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.baseUrl}/availability`); // o la URL real
  }
  getExperienceById(experienceId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.baseUrl}?experience_id=${experienceId}`);
  }
}
