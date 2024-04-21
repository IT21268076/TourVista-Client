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
import { ToastrService } from 'ngx-toastr';

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
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hotelId = params.get('hotelId');
      if (this.hotelId) {
        this.fetchHotelDetails(this.hotelId);
        this.fetchRoomTypesAndPrices(this.hotelId);
        if (this.checkInDate){
          this.fetchAllRoomTypes(this.hotelId);
        }
      }
    });

    
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkInDate'];
      this.checkOutDate = params['checkOutDate'];
      this.noOfGuests = params['noOfGuests'];
      this.roomCount = params['roomCount'];
    });

    
    
  }
  fetchAllRoomTypes(hotelId: any) {
    this.hotelService.getAllRoomTypesAndPrices(hotelId).subscribe(
      (response: any[]) => {
        this.roomTypes = response;
        console.log(response)
      },
      (error: any) => {
        console.error('Error fetching room types and prices:', error);
        this.toastr.error(`Error while fetching rooms`, 'Error');
      }
    );
  }

  fetchHotelDetails(hotelId: string) {
    this.hotelService.getHotelDetails(hotelId).subscribe(
      (response: any) => {
        this.hotel = response.data;
        this.toastr.info(`Welcome to the Hotel ${this.hotel.name} !`);
        console.log(this.hotel)
      },
      (error: any) => {
        console.error('Error fetching hotel details:', error);
        this.toastr.error(`Error while fetching ${this.hotel.name} details`, 'Error');
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
        this.toastr.error(`Error while fetching rooms`, 'Error');
      }
    );
  }

  // Open the booking detail dialog
  bookRoom(roomType: RoomType): void {
    this.toastr.warning('Please read the details carefully before confirm');

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
        noOfAvailableRooms: roomType.noOfAvailableRooms,
        markUpPercentage: roomType.markUpPercentage,
        roomCount: this.roomCount,
        supplements: JSON.stringify(roomType.supplementSet),
        discounts: JSON.stringify(roomType.discounts)
      }
    });
    
    
    
    dialogRef.afterClosed().subscribe(result => {
      if (Number.isInteger(result)) {
        // The user clicked the OK button
        console.log('Booking confirmed!');
        
        
      } else if (result === undefined) {
        // The dialog was closed without explicit confirmation
        console.log('Booking not confirmed. Dialog closed without confirmation.');
        // Show a message or perform other actions to indicate no confirmation
        this.toastr.error('Booking was not confirmed. Dialog closed without confirmation.', 'Error');
        // Optionally, you can reopen the dialog or perform other actions here
      } else {
        // The dialog was closed with a different result (not 'confirmed')
        console.log('Booking not confirmed. Dialog closed with unexpected result:', result);
        // Show a message or perform other actions to handle unexpected results
        this.toastr.error('Booking was not confirmed. Unexpected result received from dialog.', 'Error');
        // Optionally, you can reopen the dialog or perform other actions here
      }
    });
  }
}
