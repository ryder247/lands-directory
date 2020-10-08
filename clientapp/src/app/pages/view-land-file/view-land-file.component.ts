import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LandsFileService } from '../../services/lands-file/lands-file.service';
import { LandFileModel } from '../../models/land-file.model';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-land-file',
  templateUrl: './view-land-file.component.html',
  styleUrls: ['./view-land-file.component.scss'],
})
export class ViewLandFileComponent implements OnInit {
  landFileId: string;
  landFile = {} as LandFileModel;
  baseUrl = environment.baseUrl;

  constructor(
    private route: ActivatedRoute,
    private landFileService: LandsFileService,
    private location: Location,
    private domSanitizer: DomSanitizer,
  ) {}

  safeUrl(url: string): any {
    console.log(url);
    const safeUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit(): void {
    this.landFileId = this.route.snapshot.params.id;
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
}
