import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { OfficeHistoryService } from '../../services/officeHistory/office-history.service';
import { OfficeHistoryModel } from '../../models/land-file.model';

@Component({
  selector: 'app-add-office-history',
  templateUrl: './add-office-history.component.html',
  styleUrls: ['./add-office-history.component.scss'],
})
export class AddOfficeHistoryComponent implements OnInit {
  model = {} as OfficeHistoryModel;
  loading = new BehaviorSubject<boolean>(false);

  constructor(
    private officeHistoryService: OfficeHistoryService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    const data = { ...this.model };
    delete data.landFileId;
    if (Object.values(data).filter((c) => c !== '').length > 0) {
      this.loading.next(true);
      this.officeHistoryService.save(this.model).subscribe(
        (_) => {
          alert('Office History Added!');
          this.goBack();
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

  ngOnInit(): void {
    this.model.landFileId = this.route.snapshot.params.id;
  }
}
