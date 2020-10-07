import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MinuteModel } from '../../models/land-file.model';
import { ActivatedRoute } from '@angular/router';
import { MinutesService } from '../../services/minutes/minutes.service';

@Component({
  selector: 'app-add-minute-file',
  templateUrl: './add-minute-file.component.html',
  styleUrls: ['./add-minute-file.component.scss'],
})
export class AddMinuteFileComponent implements OnInit {
  model = {} as MinuteModel;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private minutesService: MinutesService,
  ) {}

  ngOnInit(): void {
    this.model.landFileId = this.route.snapshot.params.landFileId;
  }

  onSubmit(): void {
    console.log(this.model);
    this.minutesService.save(this.model).subscribe(console.log);
  }

  goBack(): void {
    this.location.back();
  }
}
