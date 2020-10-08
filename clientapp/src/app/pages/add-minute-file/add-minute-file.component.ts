import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MinuteModel } from '../../models/land-file.model';
import { ActivatedRoute } from '@angular/router';
import { MinutesService } from '../../services/minutes/minutes.service';
import { BehaviorSubject, of } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { switchMap, tap, map, catchError } from 'rxjs/operators';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-add-minute-file',
  templateUrl: './add-minute-file.component.html',
  styleUrls: ['./add-minute-file.component.scss'],
})
export class AddMinuteFileComponent implements OnInit {
  model = {} as MinuteModel;
  loading = new BehaviorSubject<boolean>(false);
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private minutesService: MinutesService,
  ) {}

  ngOnInit(): void {
    this.model.landFileId = this.route.snapshot.params.landFileId;
  }

  onSubmit(): void {
    const data = { ...this.model };
    delete data.landFileId;

    if (Object.values(this.model).filter((c) => c !== '').length > 0) {
      this.loading.next(true);
      this.minutesService.save(this.model).subscribe(
        () => {
          alert('Minute Added!');
          this.goBack();
        },
        (err) => {
          alert(err.error.message.message);
          this.loading.next(false);
        },
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

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

  getFileInfo(res: any): void {
    this.model.uploadFileUrl = res ? res.body.data : '';
  }
}
