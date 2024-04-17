import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HotelService } from './hotel.service';
import { environment } from 'src/environment';

describe('HotelService', () => {
  let service: HotelService;
  let httpTestingController: HttpTestingController;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelService]
    });
    service = TestBed.inject(HotelService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get hotels', () => {
    const location = 'testLocation';
    const checkInDate = '2022-01-01';
    const checkOutDate = '2022-01-02';
    const mockResponse: any[] = [
      {
        hotelId: 1,
        name: 'Hotel Galadari',
        no: '2',
        street: 'boc street',
        city: 'Colombo',
        description: 'Founded in 1984, Galadari Hotel has transformed itself into the finest luxury hotel in Colombo. Keeping customer satisfaction a priority, we have been offering exceptional services to our prestigious guests by redefining standards of quality in hospitality. For decades, Galadari Hotel has been the preferred choice for elite personalities across the globe. From heads of state to royalty, celebrities, and esteemed guests, we have had the pleasure of welcoming and serving the world’s most discerning individuals. Indulge in the opulence of over 400 well-furnished rooms, exquisite dining experiences, and elegant event venues that are sure to exceed your expectations. Our world-class restaurants and cafes offer an array of culinary delights that cater to every palate. Whether it’s a business meeting or a special occasion, our personalized services and attention to detail ensure that your stay with us is nothing short of extraordinary. Join us, and experience the epitome of elegance and luxury that has made Galadari',
        email: 'galadari@gmail.com',
        contactNo: '0111234567',
        contracts: [],
        hotelImages: [
          {
            imageId: 1,
            image: 'iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4CAYAAADo08FDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPHRFWHRDb21tZW50AHhyOmQ6REFGX1R2SlUyNjg6MjAsajozNzc0NDQwMjA3MDMwNzQ1MDA3LHQ6MjQwNDAzMTSbfsGjAAAE6mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc',
            hotel: 1
          }
        ]
      }
    ];
    

    service.getHotels(location, checkInDate, checkOutDate).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/hotel/search?location=${location}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get hotel details', () => {
    const hotelId = 'hotel123';
    const mockResponse = { /* mocked response */ };

    service.getHotelDetails(hotelId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/hotel/${hotelId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get room types and prices', () => {
    const hotelId = 'hotel123';
    const checkInDate = '2022-01-01';
    const checkOutDate = '2022-01-02';
    const noOfGuests = 2;
    const roomCount = 1;
    const mockResponse: any[] = [[
      {
        "roomTypeId": 3,
        "seasonId": 2,
        "seasonName": "Off-Peak",
        "type": "Standard",
        "maxNooOfGuests": 15,
        "price": 60.0,
        "supplementSet": [
          {
            "supplementId": 4,
            "name": "Breakfast Buffet",
            "price": 5.0,
            "description": "breakfast",
            "supplementsSeasonPrices": [
              {
                "id": {
                  "seasonId": 2,
                  "supplementsId": 4
                },
                "supplements": 4,
                "price": 5.0
              }
            ]
          },
          {
            "supplementId": 3,
            "name": "Airport Transfers",
            "price": 5.0,
            "description": "airport",
            "supplementsSeasonPrices": [
              {
                "id": {
                  "seasonId": 2,
                  "supplementsId": 3
                },
                "supplements": 3,
                "price": 5.0
              }
            ]
          }
        ],
        "discounts": [
          {
            "discountId": 1,
            "name": "Early bird discount",
            "amount": 20.0,
            "description": "Early bird discount for bookings made 180 days prior",
            "startDate": "2024-04-01T00:00:00.000+00:00",
            "endDate": "2024-04-30T00:00:00.000+00:00"
          }
        ],
        "prepaymentPercentage": 25.0,
        "cancellationFee": 50.0,
        "noOfBalancePaymentDates": 3,
        "noOfDatesOfCancellation": 15,
        "markUpPercentage": 10.0
      }
    ]];

    service.getRoomTypesAndPrices(hotelId, checkInDate, checkOutDate, noOfGuests, roomCount).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/roomType?hotelId=${hotelId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&noOfGuests=${noOfGuests}&roomCount=${roomCount}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add hotel', () => {
    const hotelData = { 
      name: 'test hotel' ,
      no: 1,
      street: 'test street',
      city: 'test',
      description: 'test',
      email: 'test@gmail.com',
      contactNo: '1354' 
    };
    const mockResponse = { /* mocked response */ };

    service.addHotel(hotelData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/hotel/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(hotelData);
    req.flush(mockResponse);
  });
});
