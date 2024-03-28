import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverLoginComponent } from './driver-login.component';

describe('DriverLoginComponentComponent', () => {
  let component: DriverLoginComponent;
  let fixture: ComponentFixture<DriverLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
