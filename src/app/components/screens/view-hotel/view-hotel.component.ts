import { ToastrService } from 'ngx-toastr';


import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-view-hotel',
  templateUrl: './view-hotel.component.html',
  styleUrls: ['./view-hotel.component.css']
})
export class ViewHotelComponent implements OnInit{
  hotel: any;
  hotelId: any;
  hotelData: any = {};

 constructor(private route: ActivatedRoute, private hotelService: HotelService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.hotelId;
    this.loadHotel(this.hotelId);

  }

  loadHotel(hotelId: any) {
    console.log(hotelId)
    this.hotelService.getHotelDetails(hotelId)
      .subscribe((data: any) => {
        console.log(data);
        this.hotel = data.data;
      },
      error => {
        console.log("Error fetching hotel: ", error);
        this.toastr.error('Error fetching hotel', 'Error');
      }
    );
  }

  editHotel(hotelId: number) {
    // Assign updated values to hotelData object
    this.hotelData = {
      name: this.hotel.name,
      no: this.hotel.no,
      street: this.hotel.street,
      city: this.hotel.city,
      description: this.hotel.description,
      email: this.hotel.email,
      contactNo: this.hotel.contactNo
    };

    console.log('Edit Hotel:', hotelId);
    this.hotelService.editHotel(hotelId, this.hotelData)
    .subscribe((response: any) => {
      this.toastr.success(`Hotel ${this.hotel.name} is updated successfully!`, 'Success');
    },
    (error: any) => {
      this.toastr.error(`Hotel ${this.hotel.name} updation failed Error updating hotel`, 'Error');
    })
  }

  deleteHotel(hotelId: number) {
    console.log('Delete hotel:', this.hotelId);
    this.hotelService.deleteHotel(hotelId)
    .subscribe(response =>{
      this.toastr.success(`Hotel is deleted successfully!`, 'Success');
      this.router.navigate(['/admin-dashboard']);
    },
    error => {
      this.toastr.error(`Hotel deletion failed Error deleting hotel`, 'Error');
    }
  );
  }

  
}

