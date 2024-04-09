// import {Component, OnInit} from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HotelService } from '../../../services/hotel.service';

// @Component({
//   selector: 'app-room-type-table',
//   templateUrl: './room-type-table.component.html',
//   styleUrls: ['./room-type-table.component.css']
// })
// export class RoomTypeTableComponent implements OnInit {
//   hotelId: string | undefined;
//   checkInDate: any;
//   checkOutDate: any;

//   hotel: any = {};
//   roomTypes: any[] = [];

//   constructor(private route: ActivatedRoute, private hotelService: HotelService) { }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       const hotelId = params.get('hotelId');
//       if (hotelId) {
//         // this.fetchHotelDetails(hotelId);
//         this.fetchRoomTypesAndPrices(hotelId);
//       }
//     });

//     this.route.queryParams.subscribe(params => {
//       this.checkInDate = params['checkInDate'];
//       this.checkOutDate = params['checkOutDate'];
//     });
//   }

//   fetchRoomTypesAndPrices(hotelId: string) {
//     this.hotelService.getRoomTypesAndPrices(hotelId,  this.checkInDate!, this.checkOutDate!).subscribe(
//       (response: any[]) => {
//         this.roomTypes = response;
//       },
//       (error: any) => {
//         console.error('Error fetching room types and prices:', error);
//       }
//     );
//   }
// }
