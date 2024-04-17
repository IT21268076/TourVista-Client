import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';
import { HotelDetailsComponent } from './hotel-details.component';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailComponent } from '../../popup/booking-detail/booking-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HotelDetailsComponent', () => {
 let component: HotelDetailsComponent;
 let fixture: ComponentFixture<HotelDetailsComponent>;
 let mockHotelService: any;
 let mockRoute: any;
 let mockRouter: any;
 let mockDialog: any; 

 beforeEach(async () => {
    mockHotelService = jasmine.createSpyObj(['getHotelDetails']);
    mockRoute = {
      paramMap: of({ get: () => '1' }),
      queryParams: of({ checkInDate: '2023-04-01', checkOutDate: '2023-04-05' })
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of({ value: 'confirmed' }) // Mock the afterClosed method to return an observable
      })
    }; 

    await TestBed.configureTestingModule({
      declarations: [HotelDetailsComponent],
      providers: [
        { provide: HotelService, useValue: mockHotelService },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HotelDetailsComponent);
    component = fixture.componentInstance;
 });

 it('should fetch hotel details', () => {
    const hotelDetails = { name: 'Test Hotel', address: '123 Test St' };
    mockHotelService.getHotelDetails.and.returnValue(of(hotelDetails));

    component.fetchHotelDetails('1');

    expect(component.hotel).toEqual(hotelDetails);
    expect(mockHotelService.getHotelDetails).toHaveBeenCalledWith('1');
 });

//  it('should fetch room types and prices', () => {
//   const roomTypesAndPrices = [{ type: 'Deluxe', price: 100 }];
//   mockHotelService.getRoomTypesAndPrices.and.returnValue(of(roomTypesAndPrices));
 
//   component.fetchRoomTypesAndPrices('1');
 
//   expect(component.roomTypes).toEqual(roomTypesAndPrices);
//   expect(mockHotelService.getRoomTypesAndPrices).toHaveBeenCalledWith('1', '2023-04-01', '2023-04-05', 2, 3);
//  });

 it('should open booking detail dialog and handle result', () => {
  const mockDialogRef = {
     afterClosed: () => of({ value: 'confirmed' })
  };
  mockDialog.open.and.returnValue(mockDialogRef);
 
  component.bookRoom({
    type: 'Deluxe', price: 100,
    roomTypeId: 0,
    seasonId: 0,
    seasonName: '',
    maxNooOfGuests: 0,
    markUpPercentage: undefined,
    supplementSet: [],
    discounts: []
  });
 
  expect(mockDialog.open).toHaveBeenCalled();
  // Additional assertions to check the dialog was opened with the correct parameters
 });
});
