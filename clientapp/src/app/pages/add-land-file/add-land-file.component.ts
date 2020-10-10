import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LandsFileService } from '../../services/lands-file/lands-file.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-land-file',
  templateUrl: './add-land-file.component.html',
  styleUrls: ['./add-land-file.component.scss'],
})
export class AddLandFileComponent implements OnInit {
  model = {} as any;
  loading = new BehaviorSubject<boolean>(false);
  natureOfInstruments = [
    'CONVEYANCE', 'PRIVATE LEASE', 'GOVERNMENT LEASE', 'STOOL LEASE', 'JUGDEMENT', 'ASSIGNMENT', 'TRANSFER',
    'CAVEAT', 'SUB-LEASE', 'DISCHARGE', 'MORTGAGE', 'FREEHOLD', 'DECLARATION', 'VESTING ASSENT', 'CERTIFICATE', 'LICENSE', 'CONCURRENCE', 'CONSENT',
  ];
  landFileId: any;
  constructor(
    private location: Location,
    private landsFileService: LandsFileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.landFileId = this.route.snapshot.params.id;
    this.getLandFile();
  }

  getLandFile(): void {
    this.landsFileService.getById(this.landFileId).subscribe(
      (res) => {
        this.model = res.data;
      },
      (err) => {
        console.log(err);
      },
    );
  }

  onSubmit(): void {
    this.loading.next(true);
    if (Object.values(this.model).filter((c) => c !== '').length > 0) {
      if(this.landFileId){
        this.updateLandFile();
      }else {
        this.saveLandFile();
      }
    } else {
      this.loading.next(false);
    }
  }
  updateLandFile(): void {
    this.landsFileService.update(this.landFileId, this.model).subscribe(
      (_) => {
        this.goBack();
        this.loading.next(false);
      },
      (err) => {
        alert(err.error.message.message);
        this.loading.next(false);
      },
    );
  }
  saveLandFile(): void {
    this.landsFileService.save(this.model).subscribe(
      (_) => {
        this.goBack();
        this.loading.next(false);
      },
      (err) => {
        alert(err.error.message.message);
        this.loading.next(false);
      },
    );
  }

  goBack(): void {
    this.location.back();
  }
}
