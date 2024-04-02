import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Discount } from '../../../models/roomTypeModel'; // Import the Supplement model
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  roomTypeId: number | undefined;
  type!: string;
  roomTypePrice!: number;
  seasonName!: string;
  discounts: Discount[] = [];
  supplements: { name: string, price: number }[] = []; // Sample data, replace with actual supplement data
  selectedSupplements: boolean[] = [];
  totalAmount!: number;
  checkInDate!: string;
  checkOutDate!: string;

  constructor(private route: ActivatedRoute, private router: Router ) { 
    this.calculateTotalAmount();
  }

  ngOnInit(): void {
    // Retrieve query parameters from the route
    this.route.queryParams.subscribe(params => {
      this.roomTypeId = params['roomTypeId'];
      this.type = params['type'];
      this.roomTypePrice = params['roomTypePrice'];
      this.seasonName = params['seasonName'];
      this.supplements = JSON.parse(params['supplements']); // Parse supplements from JSON string
      this.discounts = JSON.parse(params['discounts']);
      this.checkInDate = params['checkInDate'];
      this.checkOutDate = params['checkOutDate'];
    });

    console.log(this.type)
    
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    let supplementsPrice = 0;
    for (let i = 0; i < this.selectedSupplements.length; i++) {
      if (this.selectedSupplements[i]) {
        supplementsPrice += this.supplements[i].price;
      }
    }
   
    //console.log(this.roomTypePrice)
    const roomPrice = Number(this.roomTypePrice); // Parse roomPrice to a number
    this.totalAmount = roomPrice + supplementsPrice;
  }

  submitBookingForm(): void {
    // Implement booking submission logic here
    console.log('Booking form submitted!');
    // Redirect to a confirmation page or perform further actions
    this.router.navigate(['/confirmation']);
  }
}
