// // my-bookings.component.ts
// import { Component, OnInit } from '@angular/core';
// import { Booking } from '../models/booking';
// import { BookingService } from '../services/booking.service';

// @Component({
//   selector: 'app-my-bookings',
//   templateUrl: './my-bookings.component.html',
//   styleUrls: ['./my-bookings.component.css']
// })
// export class MyBookingsComponent implements OnInit {
//   bookings: Booking[] = [];

//   constructor(private bookingService: BookingService) { }

//   ngOnInit(): void {
//     // Assuming userId is obtained from authentication
//     const userId = 'user123';

//     this.bookingService.getBookingsForUser(userId)
//       .subscribe(bookings => {
//         this.bookings = bookings;
//       });
//   }
// }
