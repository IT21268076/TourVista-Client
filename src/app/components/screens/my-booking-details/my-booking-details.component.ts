import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';

@Component({
 selector: 'app-my-booking-details',
 templateUrl: './my-booking-details.component.html',
 styleUrls: ['./my-booking-details.component.css']
})
export class MyBookingDetailsComponent implements OnInit {

 bookingId!: any;
 bookingDetails: any;
 booking: any;

 constructor(private route: ActivatedRoute, private bookingService: BookingService, private router: Router) { }

 ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.bookingId = params.get('bookingId');
    if (this.bookingId) {
      // this.fetchHotelDetails(this.hotelId);
    }
  });

  this.loadUserBookings();

 }

 loadUserBookings() {
  this.bookingService.getBookingDetails(this.bookingId)
    .subscribe((data: any) => {
      console.log(data);
      this.booking = data.data;
    });
}

calculateNights(checkIn: string, checkOut: string): number {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24)); // days
 }

//  loadBookingDetails() {
//     this.bookingService.getBookingDetails(this.bookingId)
//       .subscribe(data => {
//         this.bookingDetails = data;
//         // Now you can use bookingDetails to display the booking information
//       });
//  }

}
