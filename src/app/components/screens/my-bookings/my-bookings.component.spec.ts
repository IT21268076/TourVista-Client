import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MyBookingsComponent } from './my-bookings.component';
import { BookingService } from '../../../services/booking.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MyBookings } from 'src/app/models/myBookingsModel';
import { Router } from '@angular/router';

describe('MyBookingsComponent', () => {
  let component: MyBookingsComponent;
  let fixture: ComponentFixture<MyBookingsComponent>;
  let bookingService: jasmine.SpyObj<BookingService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['getUserBookings']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [MyBookingsComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: BookingService, useValue: bookingServiceSpy },
        { provide: Router, useValue: routerSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    bookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user bookings on init', () => {
    const bookings: MyBookings[] = [
      {
        bookingId: 1,
        totalAmount: 100,
        checkInDate: new Date('2024-04-01'),
        checkOutDate: new Date('2024-04-03'),
        dateOfBooking: '',
        saveRoomType: '',
        saveDiscounts: [],
        saveSupplements: []
      },
      // Add more booking objects as needed...
  ];

    bookingService.getUserBookings.and.returnValue(of(bookings));

    component.ngOnInit();

    expect(component.bookings).toEqual(bookings);
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
