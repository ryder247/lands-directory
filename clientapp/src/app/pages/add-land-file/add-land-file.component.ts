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
  constructor(
    private location: Location,
    private landsFileService: LandsFileService,
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.loading.next(true);
    if (Object.values(this.model).filter((c) => c !== '').length > 0) {
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
    } else {
      this.loading.next(false);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
