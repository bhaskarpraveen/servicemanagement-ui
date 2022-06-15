import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainServiceScreenComponent } from './main-service-screen.component';

describe('MainServiceScreenComponent', () => {
  let component: MainServiceScreenComponent;
  let fixture: ComponentFixture<MainServiceScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainServiceScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainServiceScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
