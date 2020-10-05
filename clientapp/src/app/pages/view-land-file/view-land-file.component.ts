import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LandsFileService } from '../../services/lands-file/lands-file.service';
import { LandFileModel } from '../../models/land-file.model';

@Component({
  selector: 'app-view-land-file',
  templateUrl: './view-land-file.component.html',
  styleUrls: ['./view-land-file.component.scss'],
})
export class ViewLandFileComponent implements OnInit {
  landFileId: string;
  landFile = {} as LandFileModel;

  constructor(
    private route: ActivatedRoute,
    private landFileService: LandsFileService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.landFileId = this.route.snapshot.params.id;
    this.landFileService.getById(this.landFileId).subscribe(
      (res) => {
        this.landFile = res.data;
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
