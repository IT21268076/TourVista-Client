import { AdminDashboardComponent } from './../admin-dashboard/admin-dashboard.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HotelListComponent } from './hotel-list.component';
import { HotelService } from 'src/app/services/hotel.service';


describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;
  let hotelService: jasmine.SpyObj<HotelService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  // Declare adminDashboardComponent variable
  let adminDashboardComponent: jasmine.SpyObj<AdminDashboardComponent>;

  beforeEach(() => {
    const hotelServiceSpy = jasmine.createSpyObj('HotelService', ['getAllHotels', 'deleteHotel']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    // Create a mock for AdminDashboardComponent
    const adminDashboardComponentSpy = jasmine.createSpyObj('AdminDashboardComponent', ['loadComponent']);

    TestBed.configureTestingModule({
      declarations: [HotelListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: HotelService, useValue: hotelServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        // Provide the mock for AdminDashboardComponent
        { provide: AdminDashboardComponent, useValue: adminDashboardComponentSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    hotelService = TestBed.inject(HotelService) as jasmine.SpyObj<HotelService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    // Inject the mock for AdminDashboardComponent
    adminDashboardComponent = TestBed.inject(AdminDashboardComponent) as jasmine.SpyObj<AdminDashboardComponent>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load hotels successfully', () => {
    const testData = { data: [{ id: 1, name: 'Hotel 1' }, { id: 2, name: 'Hotel 2' }] };
    hotelService.getAllHotels.and.returnValue(of(testData));

    component.ngOnInit(); // Call ngOnInit instead of loadHotels directly

    expect(hotelService.getAllHotels).toHaveBeenCalled();
    expect(component.hotels).toEqual(testData.data);
  });

  it('should handle error when loading hotels', () => {
    const errorMessage = 'Error fetching hotels';
    hotelService.getAllHotels.and.returnValue(throwError({ message: errorMessage }));

    component.ngOnInit(); // Call ngOnInit instead of loadHotels directly

    expect(hotelService.getAllHotels).toHaveBeenCalled();
    expect(component.hotels).toBeUndefined();
    expect(toastrService.error).toHaveBeenCalledWith(`${errorMessage}`, 'Error');
  });

  it('should toggle description', () => {
    const hotel = { id: 1, name: 'Hotel', showFullDescription: false };
    component.toggleDescription(hotel);
    expect(hotel.showFullDescription).toBeTrue();
  });

  it('should return description chunks', () => {
    const description = 'Lorem ipsum dolor sit amet';
    const chunkSize = 3;
    const expectedChunks = [['Lorem', 'ipsum', 'dolor'], ['sit', 'amet']];
    expect(component.getDescriptionChunks(description, chunkSize)).toEqual(expectedChunks);
  });

  // Add more test cases as needed
});
