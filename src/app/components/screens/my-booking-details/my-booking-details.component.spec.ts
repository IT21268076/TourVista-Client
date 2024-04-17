import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { MyBookingDetailsComponent } from './my-booking-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MyBookingDetailsComponent', () => {
 let component: MyBookingDetailsComponent;
 let fixture: ComponentFixture<MyBookingDetailsComponent>;
 let mockBookingService: any;
 let mockRouter: any;
 let mockActivatedRoute: any;

 beforeEach(async () => {
    mockBookingService = jasmine.createSpyObj(['getBookingDetails']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      paramMap: of({ get: () => '1' })
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MyBookingDetailsComponent],
      providers: [
        { provide: BookingService, useValue: mockBookingService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MyBookingDetailsComponent);
    component = fixture.componentInstance;
 });

 it('should create', () => {
    expect(component).toBeTruthy();
 });

 it('should fetch booking details on init', () => {
  const bookingDetails = { id: '1', checkIn: '2023-04-01', checkOut: '2023-04-05' };
  mockBookingService.getBookingDetails.and.returnValue(of(bookingDetails));
 
  component.ngOnInit();
 
  expect(mockBookingService.getBookingDetails).toHaveBeenCalledWith('1');
  expect(component.booking).toEqual(bookingDetails);
 });
 
 it('should calculate nights correctly', () => {
  const checkIn = '2023-04-01';
  const checkOut = '2023-04-05';
  const expectedNights = 4;
 
  const result = component.calculateNights(checkIn, checkOut);
 
  expect(result).toEqual(expectedNights);
 });
 
});
