import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MinuteModel } from '../../models/land-file.model';

@Injectable({
  providedIn: 'root',
})
export class MinutesService {
  private minutesApi = environment.baseUrl + '/minute_files';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.minutesApi);
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.minutesApi + '/' + id);
  }

  save(model: MinuteModel): Observable<any> {
    model.uploadFileUrl = JSON.stringify(model.uploadFileUrl);
    return this.http.post(this.minutesApi, model);
  }

  update(id: string, model: MinuteModel): Observable<any> {
    return this.http.put(this.minutesApi + '/' + id, model);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.minutesApi + '/' + id);
  }

  upload(formData: FormData): Observable<any> {
    return this.http.post<FormData>(environment.baseUrl + '/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
