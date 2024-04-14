import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingDetailsComponent } from './my-booking-details.component';

describe('MyBookingDetailsComponent', () => {
  let component: MyBookingDetailsComponent;
  let fixture: ComponentFixture<MyBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBookingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
