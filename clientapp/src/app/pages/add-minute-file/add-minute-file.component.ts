import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MinuteModel } from '../../models/land-file.model';

@Component({
  selector: 'app-add-minute-file',
  templateUrl: './add-minute-file.component.html',
  styleUrls: ['./add-minute-file.component.scss'],
})
export class AddMinuteFileComponent implements OnInit {
  model = {} as MinuteModel;

  constructor(private location: Location) {}

  ngOnInit(): void {}

  onSubmit(): void {}

  goBack(): void {
    this.location.back();
  }
}
