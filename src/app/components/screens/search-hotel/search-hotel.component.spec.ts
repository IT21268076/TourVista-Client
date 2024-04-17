import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { SearchHotelComponent } from './search-hotel.component';
import { HotelService } from '../../../services/hotel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchHotelComponent', () => {
  let component: SearchHotelComponent;
  let fixture: ComponentFixture<SearchHotelComponent>;
  let mockHotelService: jasmine.SpyObj<HotelService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let router: Router;

  beforeEach(async () => {
    mockHotelService = jasmine.createSpyObj('HotelService', ['getHotels']);
    mockActivatedRoute = {
      queryParams: of(convertToParamMap({
        location: 'TestLocation',
        checkInDate: '2024-04-01',
        checkOutDate: '2024-04-03',
        noOfGuests: '2',
        roomCount: '1'
      }))
    };

    await TestBed.configureTestingModule({
      declarations: [SearchHotelComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: HotelService, useValue: mockHotelService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should update cards when hotels are fetched successfully', fakeAsync(() => {
    const mockResponse = [
      { hotelId: 1, name: 'Hotel A', location: 'Location A', description: 'Description A' },
      { hotelId: 2, name: 'Hotel B', location: 'Location B', description: 'Description B' }
    ];
    mockHotelService.getHotels.and.returnValue(of(mockResponse));

    component.fetchHotels('TestLocation', '2024-04-01', '2024-04-03');
    tick();

    expect(component.cards.length).toEqual(2);
    expect(component.cards[0].name).toEqual('Hotel A');
    expect(component.cards[1].name).toEqual('Hotel B');
  }));

  it('should handle error when fetching hotels fails', fakeAsync(() => {
    mockHotelService.getHotels.and.returnValue(throwError('Error fetching hotels'));

    spyOn(console, 'error');

    component.fetchHotels('TestLocation', '2024-04-01', '2024-04-03');
    tick();

    expect(console.error).toHaveBeenCalledWith('Error fetching hotels:', 'Error fetching hotels');
  }));

  it('should redirect to hotel details page with correct parameters', () => {
    const routerSpy = spyOn(router, 'navigate');
    const hotelId = '123';

    component.checkInDate = '2024-04-01';
    component.checkOutDate = '2024-04-03';
    component.noOfGuests = 2;
    component.roomCount = 1;

    component.redirectToHotelDetails(hotelId);

    expect(routerSpy).toHaveBeenCalledWith(['/hotel-details', hotelId], {
      queryParams: {
        checkInDate: '2024-04-01',
        checkOutDate: '2024-04-03',
        noOfGuests: 2,
        roomCount: 1
      }
    });
  });

  // Add more test cases as needed
});
