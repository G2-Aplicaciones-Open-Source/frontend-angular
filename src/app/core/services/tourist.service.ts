import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { environment } from '../../../environments/environment.development';
import {Tourist} from '../model/tourist.entity';

@Injectable({
  providedIn: 'root'
})
export class TouristService {
  private baseUrl = `${environment.serverBasePath}/tourists`
  constructor(private http: HttpClient) {}
  getTourists(): Observable<Tourist[]> {
    return this.http.get<Tourist[]>(`${this.baseUrl}`);
  }
}
