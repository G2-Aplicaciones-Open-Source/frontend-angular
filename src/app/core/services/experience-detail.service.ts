import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {Experience} from '../model/experience.entity';

import { ExperienceResponse } from './experience.response';
import { ExperienceAssembler } from './experience.assembler';

@Injectable({
  providedIn: 'root'
})
export class ExperienceDetailService {
  private baseUrl = `${environment.serverBasePath}`
  private experiencesEndpoint = `${this.baseUrl}/experiences`

  constructor(private http: HttpClient) {}

  getExperienceById(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.baseUrl}/experiences?id=${id}`);
  }
}
