import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MyBookingsComponent } from './my-bookings.component';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { IntendedRouteService } from '../../../services/intended-route.service';
import { ToastrService } from 'ngx-toastr';
import { MyBookings } from 'src/app/models/myBookingsModel';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MyBookingsComponent', () => {
  let component: MyBookingsComponent;
  let fixture: ComponentFixture<MyBookingsComponent>;
  let bookingService: jasmine.SpyObj<BookingService>;
  let router: jasmine.SpyObj<Router>;
  let userService: jasmine.SpyObj<UserService>;
  let intendedRouteService: jasmine.SpyObj<IntendedRouteService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['getUserBookings']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById']);
    const intendedRouteServiceSpy = jasmine.createSpyObj('IntendedRouteService', ['setIntendedRoute']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['info']);

    await TestBed.configureTestingModule({
      declarations: [MyBookingsComponent],
      providers: [
        { provide: BookingService, useValue: bookingServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: IntendedRouteService, useValue: intendedRouteServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    bookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    intendedRouteService = TestBed.inject(IntendedRouteService) as jasmine.SpyObj<IntendedRouteService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('should calculate nights correctly', () => {
    const checkIn = '2024-04-01';
    const checkOut = '2024-04-03';
    const expectedNights = 2;

    const nights = component.calculateNights(checkIn, checkOut);

    expect(nights).toEqual(expectedNights);
  });

  it('should switch tab', () => {
    const tab = 'upcomingBookings';

    component.switchTab(tab);

    expect(component.activeTab).toEqual(tab);
  });

  it('should navigate to booking details', () => {
    const bookingId = 1;

    component.navigateToBookingDetails(bookingId);

    expect(router.navigate).toHaveBeenCalledWith(['/my-booking-details/', bookingId]);
  });

  
});
