import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLandFileComponent } from './add-land-file.component';

describe('AddLandFileComponent', () => {
  let component: AddLandFileComponent;
  let fixture: ComponentFixture<AddLandFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLandFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLandFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
