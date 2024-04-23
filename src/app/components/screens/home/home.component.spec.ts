import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HotelService } from 'src/app/services/hotel.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let hotelService: HotelService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    const hotelServiceStub = {
      getAllHotels: () => of({ data: [] })
    };

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: HotelService, useValue: hotelServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    hotelService = TestBed.inject(HotelService);
    router = TestBed.inject(Router); // Injecting the Router service
    fixture.detectChanges();
  });

  

  it('should fetch all hotels on initialization', () => {
    spyOn(hotelService, 'getAllHotels').and.returnValue(of({ data: [] }));
    component.ngOnInit();
    expect(hotelService.getAllHotels).toHaveBeenCalled();
    expect(component.hotels).toEqual([]);
  });

  it('should navigate to hotel details page', () => {
    spyOn(router, 'navigate');
    const hotelId = '123';
    component.navigateToHotel(hotelId);
    expect(router.navigate).toHaveBeenCalledWith([`/hotel-details/${hotelId}`]);
  });

  it('should navigate to search page with query parameters on form submission', () => {
    spyOn(router, 'navigate');
    component.location = 'New York';
    component.checkInDate = new Date('2024-04-10');
    component.checkOutDate = new Date('2024-04-15');
    component.noOfGuests = 2;
    component.roomCount = 1;
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/search'], {
      queryParams: {
        location: 'New York',
        checkInDate: new Date('2024-04-10'),
        checkOutDate: new Date('2024-04-15'),
        noOfGuests: 2,
        roomCount: 1
      }
    });
  });
});
