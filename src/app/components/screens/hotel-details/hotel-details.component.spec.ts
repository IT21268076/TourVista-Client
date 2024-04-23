import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelDetailsComponent } from './hotel-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { HotelService } from 'src/app/services/hotel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HotelDetailsComponent', () => {
  let component: HotelDetailsComponent;
  let fixture: ComponentFixture<HotelDetailsComponent>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;
  let hotelService: HotelService; // Replace with the actual service if available
  let dialog: any; // Replace with the actual dialog if available
  let toastr: any; // Replace with the actual toastr service if available

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      paramMap: of({ get: () => 'hotelId' }),
      queryParams: of({
        checkInDate: '2024-04-20',
        checkOutDate: '2024-04-25',
        noOfGuests: 2,
        roomCount: 1
      })
    };
    const hotelServiceStub = {
      getHotelDetails: () => of({ data: {} }),
      getRoomTypesAndPrices: () => of([])
    };
    const dialogStub = {
      open: () => ({ afterClosed: () => of('confirmed') })
    };
    const toastrStub = {
      info: () => {},
      error: () => {},
      warning: () => {}
    };

    await TestBed.configureTestingModule({
      declarations: [HotelDetailsComponent],
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule here
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MatDialog, useValue: dialogStub },
        { provide: ToastrService, useValue: toastrStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
    hotelService = TestBed.inject(HotelService);
    dialog = TestBed.inject(MatDialog);
    toastr = TestBed.inject(ToastrService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch hotel details on initialization', () => {
    spyOn(hotelService, 'getHotelDetails').and.returnValue(of({ data: {} }));
    component.ngOnInit();
    expect(hotelService.getHotelDetails).toHaveBeenCalledWith('hotelId');
  });

  it('should fetch room types and prices on initialization', () => {
    spyOn(hotelService, 'getRoomTypesAndPrices').and.returnValue(of([]));
    component.ngOnInit();
    expect(hotelService.getRoomTypesAndPrices).toHaveBeenCalledWith('hotelId', '2024-04-20', '2024-04-25', 2, 1);
  });
});
