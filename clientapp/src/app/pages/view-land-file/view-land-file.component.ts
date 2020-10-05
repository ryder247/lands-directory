import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandsFileService } from '../../services/lands-file/lands-file.service';

@Component({
  selector: 'app-view-land-file',
  templateUrl: './view-land-file.component.html',
  styleUrls: ['./view-land-file.component.scss'],
})
export class ViewLandFileComponent implements OnInit {
  landFileId: string;
  landFile = {} as any;

  constructor(
    private route: ActivatedRoute,
    private landFileService: LandsFileService,
  ) {}

  ngOnInit(): void {
    this.landFileId = this.route.snapshot.params.id;
    this.landFileService.getById(this.landFileId).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
    );
    console.log(this.landFileId);
  }
}
