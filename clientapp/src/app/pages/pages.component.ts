import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MinutesService } from '../services/minutes/minutes.service';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  constructor(private minutesService: MinutesService) {}
  model = {} as any;
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  onUploadFile(): void {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0,
      };
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    };
  }

  getFileInfo(res: any): void {
    this.model.uploadFileUrl = res ? res.body.data : '';
  }

  uploadFile(): void {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;
    this.minutesService
      .upload(formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(
                (event.loaded * 100) / event.total,
              );
              break;
            case HttpEventType.Response:
              this.getFileInfo(event);
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.file.inProgress = false;
          return of('Upload failed');
        }),
      )
      .subscribe();
  }
}
