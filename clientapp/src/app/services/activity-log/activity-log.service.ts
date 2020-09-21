import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityLogService {
  private activityLogsApi = environment.baseUrl + '/activity_logs';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.activityLogsApi);
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.activityLogsApi + '/' + id);
  }
}
