import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficeHistoryComponent } from './add-office-history.component';

describe('AddOfficeHistoryComponent', () => {
  let component: AddOfficeHistoryComponent;
  let fixture: ComponentFixture<AddOfficeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfficeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfficeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
