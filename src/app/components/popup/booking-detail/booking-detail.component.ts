import { Supplement } from './../../../models/roomTypeModel';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Discount, RoomType } from '../../../models/roomTypeModel';
import { HotelDetailsComponent } from '../../screens/hotel-details/hotel-details.component';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {
  roomType!: RoomType;
  roomTypeId!: number;
  seasonId!: number;
  type!: string;
  roomTypePrice!: number;
  seasonName!: string;
  discounts: Discount[] = [];
  supplements: Supplement[] = [];
  selectedSupplements: { name: string, price: number, selected: boolean }[] = []; // Array to hold selected supplements' names and prices
  totalAmount!: number;
  checkInDate!: string;
  checkOutDate!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HotelDetailsComponent>,
    private bookingService: BookingService
  ) {
    this.calculateTotalAmount();
  }

  ngOnInit(): void {
    this.roomType = this.data.roomType;
    this.roomTypeId = this.data.roomType.roomTypeId; 
    this.seasonId = this.data.roomType.seasonId;
    this.checkInDate = this.data.checkInDate;
    this.checkOutDate = this.data.checkOutDate;
    this.roomTypePrice = this.data.roomTypePrice;
    this.supplements = this.data.supplements;
    this.discounts = this.data.discounts;

    console.log(this.data.roomType);
  
    // Initialize selectedSupplements with empty objects
    // this.selectedSupplements = this.supplements.map(supplement => ({ name: supplement.name, price: supplement.price, selected: false }));
    // Check if supplements is an array before mapping over it
    // Parse supplements data as JSON if it's a string
    if (typeof this.data.supplements === 'string') {
      this.supplements = JSON.parse(this.data.supplements);
    } else {
      this.supplements = this.data.supplements;
    }

    if (typeof this.data.discounts === 'string') {
      this.discounts = JSON.parse(this.data.discounts);
    } else {
      this.discounts = this.data.discounts;
    }

    // Check if supplements is an array before mapping over it
    if (Array.isArray(this.supplements)) {
      // Initialize selectedSupplements with empty objects
      this.selectedSupplements = this.supplements.map(supplement => ({ name: supplement.name, price: supplement.price, selected: false }));
    }


      this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    let supplementsPrice = 0;

    // Calculate total supplements price based on selected supplements
    this.selectedSupplements.forEach((supplement, index) => {
      if (supplement.selected) {
        supplementsPrice += supplement.price;
      }
    });

    const roomPrice = Number(this.roomTypePrice);
    this.totalAmount = roomPrice + supplementsPrice;
  }

  onConfirm(): void {
    // Close the dialog with 'confirmed' result
    this.dialogRef.close('confirmed');

    // Prepare the JSON data
    const jsonData = {
      //roomType: this.roomType,
      type: this.roomType.type,
      roomTypeId: this.roomTypeId, 
      seasonId: this.seasonId,
      roomTypePrice: this.roomTypePrice,
      seasonName: this.seasonName,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      selectedSupplements: this.selectedSupplements,
      totalAmount: this.totalAmount,
      saveDiscounts: this.discounts
    };

    console.log(jsonData);

    // Make the HTTP POST request using the service
    this.bookingService.confirmBooking(this.roomTypeId, this.seasonId, jsonData)
      .subscribe(
        response => {
          console.log('Backend response:', response);
          // Handle the response if needed
        },
        error => {
          console.error('Error:', error);
          // Handle the error if needed
        }
      );
  }
}
