import { LandFileModel } from './../../models/land-file.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this.http.get(this.landFilesApi + '/' + id).pipe(
      map((landfile: any) => {
        landfile.data.minuteFiles.map((minute) => {
          const uploadData = JSON.parse(minute.uploadFileUrl);
          minute.uploadFileUrl = uploadData
            ? 'localhost:3000/' + uploadData.filepath
            : '';
          return minute;
        });
        return landfile;
      }),
    );
  }

  save(model: LandFileModel): Observable<any> {
    return this.http.post(this.landFilesApi, model);
  }

  update(id: string, model: LandFileModel): Observable<any> {
    delete model.minuteFiles;
    delete model.officeHistories;
    return this.http.put(this.landFilesApi + '/' + id, model);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.landFilesApi + '/' + id);
  }
}
