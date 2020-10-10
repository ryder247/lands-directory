import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OfficeHistoryModel } from '../../models/land-file.model';

@Injectable({
  providedIn: 'root',
})
export class OfficeHistoryService {
  private officeHistoryApi = environment.baseUrl + '/office_histories';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.officeHistoryApi);
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.officeHistoryApi + '/' + id);
  }

  save(model: OfficeHistoryModel): Observable<any> {
    return this.http.post(this.officeHistoryApi, model);
  }

  update(id: string, model: OfficeHistoryModel): Observable<any> {
    return this.http.put(this.officeHistoryApi + '/' + id, model);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.officeHistoryApi + '/' + id);
  }

  deliver(id: string): Observable<any> {
    return this.http.put(this.officeHistoryApi + '/deliver/' + id, null);
  }
}
