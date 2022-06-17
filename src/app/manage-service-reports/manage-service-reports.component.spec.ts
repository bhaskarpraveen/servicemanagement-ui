import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServiceReportsComponent } from './manage-service-reports.component';

describe('ManageServiceReportsComponent', () => {
  let component: ManageServiceReportsComponent;
  let fixture: ComponentFixture<ManageServiceReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageServiceReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageServiceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
