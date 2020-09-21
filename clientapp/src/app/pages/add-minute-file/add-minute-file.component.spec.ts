import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinuteFileComponent } from './add-minute-file.component';

describe('AddMinuteFileComponent', () => {
  let component: AddMinuteFileComponent;
  let fixture: ComponentFixture<AddMinuteFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMinuteFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMinuteFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
