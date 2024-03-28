import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDashboardComponent } from './user-profile-dashboard.component';

describe('UserProfileDashboardComponent', () => {
  let component: UserProfileDashboardComponent;
  let fixture: ComponentFixture<UserProfileDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
