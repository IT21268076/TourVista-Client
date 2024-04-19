import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';
import { IntendedRouteService } from 'src/app/services/intended-route.service';
import { ToastrService } from 'ngx-toastr';

@Component({
 selector: 'app-booking',
 templateUrl: './my-bookings.component.html',
 styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

 userId: any; // Initialize with the relevant user ID
 activeTab = 'bookingHistory';
 bookings: any[] = [];

 constructor(
   private bookingService: BookingService, 
   private router: Router, 
   private intendedRouteService: IntendedRouteService,
   private toastr: ToastrService,
   private userService: UserService
) { }

 ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.loadUserBookings(this.userId);
    this.loadUser(this.userId)
    
 }

 loadUser(userId: any) {
   this.userService.getUserById(userId)
   .subscribe((data: any) => {
      console.log(data)
      this.toastr.info(`Hi ${data.firstName}, Click on bookings to see more details`);
   })

 }
 loadUserBookings(userId: any) {
    this.bookingService.getUserBookings(userId)
      .subscribe((data:any) => {
        console.log(data);
        this.bookings = data.data;
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

 goToLogin() {
   this.intendedRouteService.setIntendedRoute('/my-bookings'); // Set the intended route
   this.router.navigate(['/login']); // Redirect to login
}

}
