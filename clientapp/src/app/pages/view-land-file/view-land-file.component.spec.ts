import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLandFileComponent } from './view-land-file.component';

describe('ViewLandFileComponent', () => {
  let component: ViewLandFileComponent;
  let fixture: ComponentFixture<ViewLandFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLandFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLandFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
