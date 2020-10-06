import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OfficeHistoryModel } from '../../models/land-file.model';

@Injectable({
  providedIn: 'root',
})
export class OfficeHistoryService {
  private minutesApi = environment.baseUrl + '/minute_files';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.minutesApi);
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.minutesApi + '/' + id);
  }

  save(model: OfficeHistoryModel): Observable<any> {
    return this.http.post(this.minutesApi, model);
  }

  update(id: string, model: OfficeHistoryModel): Observable<any> {
    return this.http.put(this.minutesApi + '/' + id, model);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.minutesApi + '/' + id);
  }
}
