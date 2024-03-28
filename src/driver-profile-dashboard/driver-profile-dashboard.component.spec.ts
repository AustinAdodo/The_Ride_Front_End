import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProfileDashboardComponent } from './driver-profile-dashboard.component';

describe('DriverProfileDashboardComponent', () => {
  let component: DriverProfileDashboardComponent;
  let fixture: ComponentFixture<DriverProfileDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverProfileDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
