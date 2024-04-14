import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-booking',
 templateUrl: './my-bookings.component.html',
 styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

 userId: any; // Initialize with the relevant user ID
 activeTab = 'bookingHistory';
 bookings: any[] = [];

 constructor(private bookingService: BookingService, private router: Router) { }

 ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.loadUserBookings();
 }

 loadUserBookings() {
    this.bookingService.getUserBookings(this.userId)
      .subscribe(data => {
        console.log(data);
        this.bookings = data;
      });
 }

 calculateNights(checkIn: string, checkOut: string): number {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // days
 }

 switchTab(tab: string): void {
    this.activeTab = tab;
 }

 switchToUserProfile() {
    // Implement navigation to user profile page
 }

 navigateToBookingDetails(bookingId: any) {
    this.router.navigate(['/my-booking-details/', bookingId]);
 }

}
