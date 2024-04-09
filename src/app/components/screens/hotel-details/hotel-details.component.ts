// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
// import { HotelService } from '../../../services/hotel.service';
// import { RoomType } from '../../../models/roomTypeModel'; 
// import { Discount } from '../../../models/roomTypeModel'; 


// @Component({
//   selector: 'app-hotel-details',
//   templateUrl: './hotel-details.component.html',
//   styleUrls: ['./hotel-details.component.css']
// })
// export class HotelDetailsComponent implements OnInit {

//   hotel: any = {};
//   checkInDate: any;
//   checkOutDate: any;
//   roomTypes: any[] = [];
//   hotelId: any;

//   constructor(private router: Router, private route: ActivatedRoute, private hotelService: HotelService) { }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       this.hotelId = params.get('hotelId');
//       if (this.hotelId) {
//         this.fetchHotelDetails(this.hotelId);
        
//       }
//     });

//     this.route.queryParams.subscribe(params => {
//       this.checkInDate = params['checkInDate'];
//       this.checkOutDate = params['checkOutDate'];
      
//     });

//     this.fetchRoomTypesAndPrices(this.hotelId);
    
    
//   }

//   fetchHotelDetails(hotelId: string) {
//     this.hotelService.getHotelDetails(hotelId).subscribe(
//       (response: any) => {
//         this.hotel = response;
//       },
//       (error: any) => {
//         console.error('Error fetching hotel details:', error);
//       }
//     );
//   }

//   fetchRoomTypesAndPrices(hotelId: string) {
//     this.hotelService.getRoomTypesAndPrices(hotelId, this.checkInDate, this.checkOutDate).subscribe(
//       (response: any[]) => {
//         this.roomTypes = response;
//         console.log(response)
//       },
//       (error: any) => {
//         console.error('Error fetching room types and prices:', error);
//       }
//     );
//   }

//   //navigate to booking form with roomtypeId
//   bookRoom(roomType: RoomType): void {
//     // Navigate to the booking page with room type details and other necessary parameters
//     this.router.navigate(['/booking'], { 
//         queryParams: { 
//             type: roomType.type,
//             roomTypeId: roomType.roomTypeId, 
//             roomTypePrice: roomType.price, 
//             seasonName: roomType.seasonName,
//             supplements: JSON.stringify(roomType.supplementSet),
//             discounts: JSON.stringify(roomType.discounts),
//             checkInDate: this.checkInDate,
//             checkOutDate: this.checkOutDate
//         } 
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailComponent } from '../../popup/booking-detail/booking-detail.component';
import { Discount, RoomType } from '../../../models/roomTypeModel';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  hotel: any = {};
  checkInDate: any;
  checkOutDate: any;
  noOfGuests: any;
  roomCount: any;
  roomTypes: any[] = [];
  hotelId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hotelId = params.get('hotelId');
      if (this.hotelId) {
        this.fetchHotelDetails(this.hotelId);
      }
    });

    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkInDate'];
      this.checkOutDate = params['checkOutDate'];
      this.noOfGuests = params['noOfGuests'];
      this.roomCount = params['roomCount'];
    });

    this.fetchRoomTypesAndPrices(this.hotelId);
  }

  fetchHotelDetails(hotelId: string) {
    this.hotelService.getHotelDetails(hotelId).subscribe(
      (response: any) => {
        this.hotel = response;
        console.log(this.hotel)
      },
      (error: any) => {
        console.error('Error fetching hotel details:', error);
      }
    );
  }

  fetchRoomTypesAndPrices(hotelId: string) {
    this.hotelService.getRoomTypesAndPrices(hotelId, this.checkInDate, this.checkOutDate, this.noOfGuests, this.roomCount).subscribe(
      (response: any[]) => {
        this.roomTypes = response;
        console.log(response)
      },
      (error: any) => {
        console.error('Error fetching room types and prices:', error);
      }
    );
  }

  // Open the booking detail dialog
  bookRoom(roomType: RoomType): void {
    const dialogRef = this.dialog.open(BookingDetailComponent, {
      data: {
        roomType: roomType,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        discount: Discount,
        type: roomType.type,
        roomTypeId: roomType.roomTypeId, 
        roomTypePrice: roomType.price, 
        seasonName: roomType.seasonName,
        noOfGuests: this.noOfGuests,
        roomCount: this.roomCount,
        supplements: JSON.stringify(roomType.supplementSet),
        discounts: JSON.stringify(roomType.discounts)
      }
    });

    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        // The user clicked the OK button
        console.log('Booking confirmed!');
        // Redirect to bookings component or perform other actions
        alert("Booking confirmed!")
      } else {
        // The dialog was auto-closed (not confirmed)
        console.log('Booking not confirmed.');
        // Show an alert or perform other actions
        alert("Retry - Booking not confirmed!!!")
      }
    });
  }
}
