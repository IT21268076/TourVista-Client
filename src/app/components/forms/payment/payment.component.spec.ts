import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let bookingService: any;
  let toastr: any;
  let router: any;

  beforeEach(async () => {
    const bookingServiceStub = {
      makePayment: () => of({}),
    };

    const toastrStub = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    const routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      providers: [
        { provide: BookingService, useValue: bookingServiceStub },
        { provide: ToastrService, useValue: toastrStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: { params: of({ bookingId: 123 }), queryParams: of({ prepaymentPercentage: 10, totalAmount: 100 }) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    bookingService = TestBed.inject(BookingService);
    toastr = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate prepayment amount', () => {
    const prepaymentPercentage = 10;
    const totalAmount = 100;
    const expectedPrepaymentAmount = totalAmount * (prepaymentPercentage / 100);
    component.calculatePrepaymentAmount(prepaymentPercentage);
    expect(component.prePaymentAmount).toEqual(expectedPrepaymentAmount);
  });

  it('should make payment successfully', () => {
    spyOn(bookingService, 'makePayment').and.returnValue(of({}));
    component.payAmount = 15; // Greater than prepayment amount
    component.makePayment();
    expect(bookingService.makePayment).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/my-bookings']);
    expect(toastr.success).toHaveBeenCalledWith('Payment successful !');
  });

  it('should show error message if pay amount is less than prepayment amount', () => {
    spyOn(bookingService, 'makePayment').and.returnValue(of({}));
    component.payAmount = 5; // Less than prepayment amount
    component.makePayment();
    expect(bookingService.makePayment).not.toHaveBeenCalled();
    expect(toastr.error).toHaveBeenCalledWith('please do 10% of total payment', 'Error');
  });

  // Add more test cases for other component methods as needed
});

