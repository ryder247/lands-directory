import { LandFileModel } from './../../models/land-file.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandsFileService {
  private landFilesApi = environment.baseUrl + '/land_files';
  constructor(private http: HttpClient) {}

  getAll(model = {} as any, pageNumber = 0, pageSize = 15): Observable<any> {
    model.searchTerm = model.searchTerm || '';
    return this.http.get(this.landFilesApi, {
      params: new HttpParams()
        .set('searchTerm', model.searchTerm)
        .set('termYears', model.termYears)
        .set('natureOfInstrument', model.natureOfInstrument)
        .set('purpose', model.purpose)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.landFilesApi + '/' + id);
  }

  save(landFile: LandFileModel): Observable<any> {
    return this.http.post(this.landFilesApi, landFile);
  }

  update(id: string, landFile: LandFileModel): Observable<any> {
    return this.http.put(this.landFilesApi + '/' + id, landFile);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.landFilesApi + '/' + id);
  }
}
