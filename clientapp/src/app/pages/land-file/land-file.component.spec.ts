import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandFileComponent } from './land-file.component';

describe('LandFileComponent', () => {
  let component: LandFileComponent;
  let fixture: ComponentFixture<LandFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
