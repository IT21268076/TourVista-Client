import { Component, OnInit } from '@angular/core';
import { MyBookings } from '../../../models/myBookingsModel';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  userId: any; // Initialize with the relevant user ID
  bookings: MyBookings[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.loadUserBookings();
  }

  loadUserBookings() {
    this.bookingService.getUserBookings(this.userId)
      .subscribe(data => {
        this.bookings = data;
      });
  }

  switchToUserProfile() {
    // Implement navigation to user profile page
  }

  navigateToBookingDetails(bookingId: number) {
    // Implement navigation to full booking details page using Angular Router
  }

}
