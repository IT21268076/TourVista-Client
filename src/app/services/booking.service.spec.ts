import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookingService } from './booking.service';
import { environment } from 'src/environment';
import { MyBookings } from '../models/myBookingsModel';
import { of } from 'rxjs';

describe('BookingService', () => {
  let service: BookingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService]
    });
    service = TestBed.inject(BookingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no outstanding requests are pending after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request with correct parameters when confirmBooking method is called', () => {
    const roomTypeId = 1;
    const seasonId = 2;
    const bookingData = { /* populate with test booking data */ };

    service.confirmBooking(roomTypeId, seasonId, bookingData).subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}/booking?roomTypeId=${roomTypeId}&seasonId=${seasonId}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(bookingData);
    req.flush([]); // Mock empty response
  });

  it('should fetch user bookings when getUserBookings method is called', () => {
    const userId = '123';
    const mockBookings: MyBookings[] = [/* populate with mock bookings */];

    service.getUserBookings(userId).subscribe(bookings => {
      expect(bookings).toEqual(mockBookings);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/booking/user/${userId}/bookings`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBookings);
  });

  it('should fetch booking details when getBookingDetails method is called', () => {
    const bookingId = '456';
    const mockBooking: MyBookings = {
      bookingId: 0,
      totalAmount: 0,
      checkInDate: new Date('2024-04-01'),
      checkOutDate: new Date('2024-04-03'),
      dateOfBooking: '2024-03-02',
      saveRoomType: 'Standard',
      saveDiscounts: [],
      saveSupplements: []
    };

    service.getBookingDetails(bookingId).subscribe(booking => {
      expect(booking).toEqual(mockBooking);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/booking/${bookingId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBooking);
  });
});
