import { AdminDashboardComponent } from './../admin-dashboard/admin-dashboard.component';

import { ContractService } from 'src/app/services/contract.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { ViewHotelComponent } from '../view-hotel/view-hotel.component';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit{
  hotel: any;
  hotelId: any;
  hotels: any;
  image: any;
  hotelImage: any;

 constructor(private route: ActivatedRoute, private hotelService: HotelService, private adminDashboardComponent: AdminDashboardComponent, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadHotels();

  }

  loadHotels() {
    this.hotelService.getAllHotels()
      .subscribe((data: any) => {
        console.log(data);
        this.hotels = data.data;
        this.toastr.success(`${data.message}`, 'Success');
      },
      error => {
        console.log("Error fetching hotels: ", error);
        this.toastr.error(`${error.message}`, 'Error');
      }
    );
  }

  toggleDescription(hotel: any) {
    hotel.showFullDescription = !hotel.showFullDescription;
  }
  
  getDescriptionChunks(description: string | undefined, chunkSize: number): string[][] {
    if (typeof description === 'string') {
      const words = description.split(' ');
      const chunks = [];
      for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i + chunkSize));
      }
      return chunks;
    } else {
      return [];
    }
  }

  getFirstTwoSentences(description: string): string[] {
    if (!description) {
      return [];
    }
    // Split the description into sentences using punctuation marks
    const sentences = description.match(/[^,.!?]+[,.!?]+/g);
    // Return the first two sentences
    return sentences?.slice(0, 2) || [];
  }

  editHotel(hotelId: number) {
    console.log('Edit Hotel:', hotelId);
    this.adminDashboardComponent.loadComponent(ViewHotelComponent, hotelId);
    //this.router.navigate([`/view-hotel/${hotelId}`]);
  }

  deleteHotel(contractId: number) {
    console.log('Delete hotel:', this.hotelId);
    this.hotelService.deleteHotel(this.hotelId)
    .subscribe(response =>{
      alert("hotel deleted");
      this.loadHotels();
    },
    error => {
      alert("Error occured while deleting" );
    }
  );
  }

  
}

