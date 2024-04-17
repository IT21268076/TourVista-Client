import { RoomTypeService } from './../../../services/room-type.service';
import { SupplementService } from 'src/app/services/supplement.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.css']
})
export class UpdateContractComponent implements OnInit {
  contractForm!: FormGroup;
  contractId: number = 1; // Assuming contract ID is 1 for demonstration
  contractData1: any;
  hotelId: any;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private roomTypeService: RoomTypeService,
    private supplementsService: SupplementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const contractId = params['contractId'];
      if (contractId) {
        this.fetchContractDetails(contractId);
      } else {
        console.log("Error while fetching contractId");
      }
    });
  }

  fetchContractDetails(contractId: number): void {
    this.contractService.getContractById(contractId).subscribe(
      (contractData: any) => {
        // Populate form with contract details
        this.initContractForm(contractData);
        console.log(contractData);
        
      },
      (error: any) => {
        console.error('Error fetching contract details:', error);
      }
    );
  }

  private initContractForm(contractData: any): void {
    this.contractData1 = contractData;
    // Convert the date strings to YYYY-MM-DD format
    const startDate = this.formatDate(contractData.startDate);
    const endDate = this.formatDate(contractData.endDate);

    this.contractForm = this.formBuilder.group({
      startDate: [startDate, Validators.required],
      endDate: [endDate, Validators.required],
      prepaymentPercentage: [contractData.prepaymentPercentage],
      cancellationFee: [contractData.cancellationFee],
      noOfBalancePaymentDates: [contractData.noOfBalancePaymentDates],
      noOfDatesOfCancellation: [contractData.noOfDatesOfCancellation],
      hotel: this.formBuilder.group({
        hotelId: [contractData.hotel.hotelId, Validators.required],
        name: [contractData.hotel.name],
        no: [contractData.hotel.no],
        street: [contractData.hotel.street],
        city: [contractData.hotel.city],
        description: [contractData.hotel.description],
        email: [contractData.hotel.email],
        contactNo: [contractData.hotel.contactNo],
      }),
      discounts: this.formBuilder.array([]),
      seasons: this.formBuilder.array([])
    });
  
    // Populate discounts if available
    if (contractData.discounts && contractData.discounts.length > 0) {
      contractData.discounts.forEach((discount: any) => {
        this.addDiscount(discount);
      });
    }
  
    // Populate seasons if available
    if (contractData.seasons && contractData.seasons.length > 0) {
      contractData.seasons.forEach((season: any) => {
        this.addSeason(season);
      });
    }
  }

  //helper function to convert Date type
  private formatDate(dateString: string): string {
    // Convert the date string to a Date object
    const date = new Date(dateString);

    // Format the date to YYYY-MM-DD
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
 }
  

  private createDiscountFormGroup(discount: any): FormGroup {
    // Convert the date strings to YYYY-MM-DD format
    const startDate = this.formatDate(discount.startDate);
    const endDate = this.formatDate(discount.endDate);

    return this.formBuilder.group({
      name: [discount.name, Validators.required],
      amount: [discount.amount, Validators.required],
      description: [discount.description, Validators.required],
      startDate: [startDate, Validators.required],
      endDate: [endDate, Validators.required]
    });
  }

  //get the roomtypes according to season
  //make this to return a boolean
  private createSeasonFormGroup(season: any): FormGroup {
    // Initialize an empty FormArray for room types
    const roomTypesArray = this.formBuilder.array<FormGroup>([]);
   
    // Iterate over each room type in the season
    this.contractData1.roomTypes.forEach((roomType: any) => {
       // Check if the room type is associated with the season
       this.roomTypeService.getRoomTypeBySeasonAndId(season.seasonId, roomType.roomTypeId).subscribe(
         (exists: boolean) => {
           if (exists) {
             // If the room type is associated with the season, add it to the form
             const roomTypeFormGroup = this.createRoomTypeFormGroup(roomType);
             roomTypesArray.push(roomTypeFormGroup);
           }
         },
         (error: any) => {
           console.error('Error checking room type association:', error);
         }
       );
    });

    // Initialize an empty FormArray for supplements
    const supplementsArray = this.formBuilder.array<FormGroup>([]);
   
    // Iterate over each room type in the season
    this.contractData1.supplements.forEach((supplement: any) => {
       // Check if the room type is associated with the season
       this.supplementsService.getSupplementBySeasonAndId(season.seasonId, supplement.supplementId).subscribe(
         (exists: boolean) => {
           if (exists) {
             // If the room type is associated with the season, add it to the form
             const supplementFormGroup = this.createSupplementFormGroup(supplement);
             supplementsArray.push(supplementFormGroup);
           }
         },
         (error: any) => {
           console.error('Error checking room type association:', error);
         }
       );
    });
   
    // Convert the date strings to YYYY-MM-DD format
    const startDate = this.formatDate(season.startDate);
    const endDate = this.formatDate(season.endDate);
   
    return this.formBuilder.group({
       seasonId: [season.seasonId],
       seasonName: [season.seasonName, Validators.required],
       startDate: [startDate, Validators.required],
       endDate: [endDate, Validators.required],
       markUpPercentage: [season.markUpPercentage, Validators.required],
       roomTypes: roomTypesArray, // Use the populated roomTypesArray
       supplements: supplementsArray
    });
   }  

  private createRoomTypeFormGroup(roomType: any): FormGroup {

    // Initialize an empty FormArray for prices
    const roomSeasonPriceArray = this.formBuilder.array<FormGroup>([]);

    if(roomType != null){

      this.roomTypeService.getPriceByRoomType(roomType.roomTypeId).subscribe(
        (response) => {
          const priceFormGroup = this.formBuilder.group({
            price: [response.price, Validators.required],
            roomCount: [response.initialRoomCount, Validators.required]
          });
          roomSeasonPriceArray.push(priceFormGroup);
          
        },
        (error: any) => {
          console.error('Error checking room type price association:', error);
        }
      );
    }
    
    console.log(roomSeasonPriceArray)
    return this.formBuilder.group({
      type: [roomType.type, Validators.required],
      availability: [roomType.availability, Validators.required], 
      maxNoOfGuests: [roomType.maxNoOfGuests, Validators.required],
      roomSeasonPrices: roomSeasonPriceArray
    });
  }

  private createSupplementFormGroup(supplement: any): FormGroup {

    // Initialize an empty FormArray for prices
    const supplementSeasonPriceArray = this.formBuilder.array<FormGroup>([]);

    this.supplementsService.getPriceBySupplement(supplement.supplementId).subscribe(
      (response) => {
        console.log(response)
        const priceFormGroup = this.formBuilder.group({
        price: [response.price, Validators.required]
      });
        supplementSeasonPriceArray.push(priceFormGroup);
        
      },
      (error: any) => {
        console.error('Error checking room type price association:', error);
      }
    );

    return this.formBuilder.group({
      name: [supplement.name, Validators.required],
      description: [supplement.description, Validators.required],
      supplementsSeasonPrices: supplementSeasonPriceArray
    });
  }

  onSubmit(): void {
    if (this.contractForm.valid) {
      const contractData = this.contractForm.value;
      this.hotelId = this.contractData1.hotel.hotelId;
      console.log('Updated Contract Data:', contractData);
  
      this.contractService.updateContract(this.contractId, contractData).subscribe(
        (response: any) => {
          console.log('Contract updated successfully:', response);
          alert("Contract Updated Successfully!");
          this.router.navigate([`/view-contracts/${this.hotelId}`]);
        },
        (error: any) => {
          console.error('Error updating contract:', error);
          // Handle error scenario (e.g., show error message)
        }
      );
    } else {
      console.log('Contract form is invalid. Please check the form for errors.');
    }
  }

  // Discount FormArray Methods
  get discountsFormArray(): FormArray {
    return this.contractForm.get('discounts') as FormArray;
  }

  addDiscount(discount?: any): void {
    this.discountsFormArray.push(this.createDiscountFormGroup(discount || {}));
  }

  removeDiscount(index: number): void {
    this.discountsFormArray.removeAt(index);
  }

  // Season FormArray Methods
  get seasonsFormArray(): FormArray {
    return this.contractForm.get('seasons') as FormArray;
  }

  addSeason(season?: any): void {
    this.seasonsFormArray.push(this.createSeasonFormGroup(season || {}));
  }

  removeSeason(index: number): void {
    this.seasonsFormArray.removeAt(index);
  }

  // Room Type FormArray Methods
  getRoomTypesFormArray(index: number): FormArray {
    const seasonGroup = this.seasonsFormArray.at(index) as FormGroup;
    return seasonGroup.get('roomTypes') as FormArray;
  }

  addRoomType(index: number, roomType?: any): void {
    const seasonGroup = this.seasonsFormArray.at(index) as FormGroup;
    this.getRoomTypesFormArray(index).push(this.createRoomTypeFormGroup(roomType || {}));
  }

  removeRoomType(index: number, roomTypeIndex: number): void {
    this.getRoomTypesFormArray(index).removeAt(roomTypeIndex);
  }

  // Supplement FormArray Methods
  getSupplementsFormArray(index: number): FormArray {
    const seasonGroup = this.seasonsFormArray.at(index) as FormGroup;
    return seasonGroup.get('supplements') as FormArray;
  }

  addSupplement(index: number, supplement?: any): void {
    this.getSupplementsFormArray(index).push(this.createSupplementFormGroup(supplement || {}));
  }

  removeSupplement(index: number, supplementIndex: number): void {
    this.getSupplementsFormArray(index).removeAt(supplementIndex);
  }


}
