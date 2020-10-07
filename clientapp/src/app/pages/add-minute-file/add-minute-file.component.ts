import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MinuteModel } from '../../models/land-file.model';
import { ActivatedRoute } from '@angular/router';
import { MinutesService } from '../../services/minutes/minutes.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-minute-file',
  templateUrl: './add-minute-file.component.html',
  styleUrls: ['./add-minute-file.component.scss'],
})
export class AddMinuteFileComponent implements OnInit {
  model = {} as MinuteModel;
  fileSrc: string;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private minutesService: MinutesService,
  ) {}

  ngOnInit(): void {
    this.model.landFileId = this.route.snapshot.params.landFileId;
  }

  onChange(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileSrc = reader.result as string;

        this.minutesService.uploadMinute(this.fileSrc).subscribe(
          (res) => {
            console.log('success');
            console.log(res);
          },
          (err) => {
            console.log(err);
          },
        );
      };
    }
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
}
