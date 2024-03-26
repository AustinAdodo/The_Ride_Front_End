import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverLoginComponentComponent } from './driver-login.component';

describe('DriverLoginComponentComponent', () => {
  let component: DriverLoginComponentComponent;
  let fixture: ComponentFixture<DriverLoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverLoginComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverLoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
