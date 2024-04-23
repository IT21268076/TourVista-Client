import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchHotelComponent } from './search-hotel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchHotelComponent', () => {
  let component: SearchHotelComponent;
  let fixture: ComponentFixture<SearchHotelComponent>;
  let router: Router;
  let hotelService: any;
  let activatedRoute: any;

  beforeEach(waitForAsync(() => {
    const hotelServiceStub = {
      getHotels: () => of({ data: [] })
    };

    TestBed.configureTestingModule({
      declarations: [SearchHotelComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: HotelService, useValue: hotelServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              location: 'New York',
              checkInDate: '2024-04-10',
              checkOutDate: '2024-04-15',
              noOfGuests: 2,
              roomCount: 1
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHotelComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    hotelService = TestBed.inject(HotelService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch hotels with parameters on initialization', () => {
    spyOn(hotelService, 'getHotels').and.returnValue(of({ data: [] }));
    component.ngOnInit();
    expect(hotelService.getHotels).toHaveBeenCalledWith('New York', '2024-04-10', '2024-04-15');
  });

  it('should handle error when fetching hotels', () => {
    spyOn(hotelService, 'getHotels').and.returnValue(throwError('Error'));
    spyOn(console, 'error');
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('Error fetching hotels:', 'Error');
  });

  it('should navigate to hotel details with query parameters', () => {
    spyOn(router, 'navigate');
    const hotelId = '123';
    component.checkInDate = '2024-04-10';
    component.checkOutDate = '2024-04-15';
    component.noOfGuests = 2;
    component.roomCount = 1;
    component.redirectToHotelDetails(hotelId);
    expect(router.navigate).toHaveBeenCalledWith(['/hotel-details', hotelId], {
      queryParams: {
        checkInDate: '2024-04-10',
        checkOutDate: '2024-04-15',
        noOfGuests: 2,
        roomCount: 1
      }
    });
  });
});
