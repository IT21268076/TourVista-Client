// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { BookingDetailComponent } from './booking-detail.component';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { BookingService } from 'src/app/services/booking.service';
// import { ToastrService } from 'ngx-toastr';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';

// describe('BookingDetailComponent', () => {
//   let component: BookingDetailComponent;
//   let fixture: ComponentFixture<BookingDetailComponent>;
//   let bookingService: jasmine.SpyObj<BookingService>;
//   let toastrService: ToastrService;
//   let dialogRef: MatDialogRef<BookingDetailComponent>;

//   beforeEach(waitForAsync(() => {
//     const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['confirmBooking']);
//     const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error', 'info']);
//     const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

//     TestBed.configureTestingModule({
//       declarations: [ BookingDetailComponent ],
//       imports: [ RouterTestingModule ],
//       providers: [
//         { provide: BookingService, useValue: bookingServiceSpy },
//         { provide: ToastrService, useValue: toastrServiceSpy },
//         { provide: MatDialogRef, useValue: dialogRefSpy },
//         { provide: MAT_DIALOG_DATA, useValue: {} }
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BookingDetailComponent);
//     component = fixture.componentInstance;
//     bookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
//     toastrService = TestBed.inject(ToastrService);
//     dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<BookingDetailComponent>>;
//     fixture.detectChanges();
//   });

  

  
  
// });
