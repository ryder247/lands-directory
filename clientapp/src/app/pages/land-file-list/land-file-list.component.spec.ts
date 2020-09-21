import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandFileListComponent } from './land-file-list.component';

describe('LandFileListComponent', () => {
  let component: LandFileListComponent;
  let fixture: ComponentFixture<LandFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
