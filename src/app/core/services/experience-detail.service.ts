import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {Experience} from '../model/experience.entity';

@Injectable({
  providedIn: 'root'
})
export class ExperienceDetailService {
  private baseUrl = `${environment.serverBasePath}`

  constructor(private http: HttpClient) {}

  getExperienceById(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.baseUrl}/experiences?id=${id}`);
  }
}
