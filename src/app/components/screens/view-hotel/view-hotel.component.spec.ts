import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewHotelComponent } from './view-hotel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ViewHotelComponent', () => {
  let component: ViewHotelComponent;
  let fixture: ComponentFixture<ViewHotelComponent>;
  let hotelService: any;
  let router: any;
  let toastr: any;

  beforeEach(async () => {
    const hotelServiceStub = {
      getHotelDetails: () => of({ data: { name: 'Test Hotel' } }),
      editHotel: () => of({}),
      deleteHotel: () => of({})
    };

    const routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    const toastrStub = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      declarations: [ViewHotelComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map().set('hotelId', '123') } } },
        { provide: HotelService, useValue: hotelServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ToastrService, useValue: toastrStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    hotelService = TestBed.inject(HotelService);
    router = TestBed.inject(Router);
    toastr = TestBed.inject(ToastrService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load hotel details successfully', () => {
    spyOn(hotelService, 'getHotelDetails').and.returnValue(of({ data: { name: 'Test Hotel' } }));
    component.ngOnInit();
    expect(component.hotel.name).toEqual('Test Hotel');
  });

  it('should handle error when loading hotel details', () => {
    spyOn(hotelService, 'getHotelDetails').and.returnValue(throwError('Error fetching hotel'));
    component.ngOnInit();
    expect(toastr.error).toHaveBeenCalledWith('Error fetching hotel', 'Error');
  });

  it('should edit hotel successfully', () => {
    spyOn(hotelService, 'editHotel').and.returnValue(of({}));
    component.hotel = { name: 'Test Hotel', no: '123', 'street': undefined, 'city': undefined, 'description': undefined, 'email': undefined, 'contactNo': undefined }; // Set hotel object
    component.editHotel(123);
    expect(hotelService.editHotel).toHaveBeenCalledWith(123, component.hotel);
    expect(toastr.success).toHaveBeenCalledWith('Hotel Test Hotel is updated successfully!', 'Success');
  });

  it('should handle error when editing hotel', () => {
    spyOn(hotelService, 'editHotel').and.returnValue(throwError('Error updating hotel'));
    component.hotel = { name: 'Test Hotel', no: '123', 'street': undefined, 'city': undefined, 'description': undefined, 'email': undefined, 'contactNo': undefined }; // Set hotel object
    component.editHotel(123);
    expect(toastr.error).toHaveBeenCalledWith('Hotel Test Hotel updation failed Error updating hotel', 'Error');
  });

  it('should navigate to admin dashboard after successful hotel deletion', () => {
    spyOn(hotelService, 'deleteHotel').and.returnValue(of({}));
    component.deleteHotel(789); // Pass hotelId
    expect(hotelService.deleteHotel).toHaveBeenCalledWith(789);
    expect(toastr.success).toHaveBeenCalledWith('Hotel is deleted successfully!', 'Success');
    expect(router.navigate).toHaveBeenCalledWith(['/admin-dashboard']);
  });

  it('should show error message if hotel deletion fails', () => {
    spyOn(hotelService, 'deleteHotel').and.returnValue(throwError('Error deleting hotel'));
    component.deleteHotel(789); // Pass hotelId
    expect(hotelService.deleteHotel).toHaveBeenCalledWith(789);
    expect(toastr.error).toHaveBeenCalledWith('Hotel deletion failed Error deleting hotel', 'Error');
  });
});
