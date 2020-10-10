import { MinutesService } from './../../services/minutes/minutes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LandsFileService } from '../../services/lands-file/lands-file.service';
import { LandFileModel } from '../../models/land-file.model';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { OfficeHistoryService } from '../../services/officeHistory/office-history.service';

@Component({
  selector: 'app-view-land-file',
  templateUrl: './view-land-file.component.html',
  styleUrls: ['./view-land-file.component.scss'],
})
export class ViewLandFileComponent implements OnInit {
  landFileId: string;
  landFile = {} as LandFileModel;
  baseUrl = environment.baseUrl;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private landFileService: LandsFileService,
    private location: Location,
    private minutesService: MinutesService,
    private officeHistoryService: OfficeHistoryService,
   
  ) {}

  safeUrl(url: string): any {
    window.open('//' + url, '_blank');
  }

  ngOnInit(): void {
    this.landFileId = this.route.snapshot.params.id;
    this.getLandFile();
  }

  getLandFile(): void {
    this.landFileService.getById(this.landFileId).subscribe(
      (res) => {
        this.landFile = res.data;
        console.log(this.landFile);
      },
      (err) => {
        console.log(err);
      },
    );
    console.log(this.landFileId);
  }

  goBack(): void {
    this.location.back();
  }

  deleteMinute(element): void {
    const pass = prompt('Enter password to delete?');
    if (pass === '54321') {
      this.loading$.next(true);
      this.minutesService.delete(element.id).subscribe(
        () => {
          this.getLandFile();
        },
        () => {
          this.loading$.next(false);
        },
      );
    } else {
      alert('Please contact admin to help you delete thanks.');
    }
  }

  deleteLandFile(history): void {
    const pass = prompt('Enter password to delete?');
    if (pass === '54321') {
      this.loading$.next(true);
      this.officeHistoryService.delete(history.id).subscribe(
        () => {
          this.getLandFile();
        },
        () => {
          this.loading$.next(false);
        },
      );
    } else {
      alert('Please contact admin to help you delete thanks.');
    }
  }
  
  deliverLandFile(history): void {
    const pass = prompt('Enter password to delete?');
    if (pass === '54321') {
      this.loading$.next(true);
      this.officeHistoryService.deliver(history.id).subscribe(
        () => {
          this.getLandFile();
        },
        () => {
          this.loading$.next(false);
        },
      );
    } else {
      alert('Please contact admin to help you delete thanks.');
    }
  }
}
