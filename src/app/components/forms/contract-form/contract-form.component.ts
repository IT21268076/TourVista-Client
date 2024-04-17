import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {
  contractForm!: FormGroup;
  hotelId: any; 

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initContractForm();
  }

  private initContractForm(): void {
    this.contractForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      prepaymentPercentage: [''],
      cancellationFee: [''],
      noOfBalancePaymentDates: [''],
      noOfDatesOfCancellation: [''],
      hotel: this.formBuilder.group({
        hotelId: [this.hotelId, Validators.required] // Set hotelId based on the value obtained from the popup
      }),
      discounts: this.formBuilder.array([
        this.createDiscountFormGroup(),
        this.createDiscountFormGroup()
      ]),
      seasons: this.formBuilder.array([
        this.createSeasonFormGroup(),
        this.createSeasonFormGroup()
      ])
    });
  }

  private createDiscountFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  private createSeasonFormGroup(): FormGroup {
    return this.formBuilder.group({
      seasonName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      markUpPercentage: ['', Validators.required],
      roomTypes: this.formBuilder.array([
        this.createRoomTypeFormGroup()
      ]),
      supplements: this.formBuilder.array([
        this.createSupplementFormGroup(),
        this.createSupplementFormGroup()
      ])
    });
  }

  private createRoomTypeFormGroup(): FormGroup {
    return this.formBuilder.group({
      type: ['', Validators.required],
      availability: ['UNAVAILABLE', Validators.required], 
      maxNoOfGuests: ['', Validators.required],
      roomSeasonPrices: this.formBuilder.array([
        this.createRoomSeasonPriceFormGroup()
      ])
    });
  }

  private createRoomSeasonPriceFormGroup(): FormGroup {
    return this.formBuilder.group({
      price: ['', Validators.required],
      roomCount: ['', Validators.required]
    });
  }

  private createSupplementFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      supplementsSeasonPrices: this.formBuilder.array([
        this.createSupplementSeasonPriceFormGroup()
      ])
    });
  }

  private createSupplementSeasonPriceFormGroup(): FormGroup {
    return this.formBuilder.group({
      price: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contractForm.valid) {
      const contractData = this.contractForm.value;
      console.log(contractData);

      this.contractService.addContract(contractData).subscribe(
        response => {
          console.log('Contract added successfully:', response);
          alert("Contract added successfully:");
          this.router.navigate([`/admin-dashboard`]);
        },
        error => {
          console.error('Error adding contract:', error);
          // Handle error scenario (e.g., show error message)
        }
      );
    } else {
        console.log("Contract not added properly please try again...")
    }
  }

  get discountsFormArray(): FormArray {
    return this.contractForm.get('discounts') as FormArray;
  }

  addDiscount(): void {
    this.discountsFormArray.push(this.createDiscountFormGroup());
  }

  removeDiscount(index: number): void {
    this.discountsFormArray.removeAt(index);
  }

  get seasonsFormArray(): FormArray {
    return this.contractForm.get('seasons') as FormArray;
  }

  addSeason(): void {
    this.seasonsFormArray.push(this.createSeasonFormGroup());
  }

  removeSeason(index: number): void {
    this.seasonsFormArray.removeAt(index);
  }

  getRoomTypesFormArray(index: number): FormArray {
    return this.seasonsFormArray.at(index).get('roomTypes') as FormArray;
  }

  addRoomType(seasonIndex: number): void {
    this.getRoomTypesFormArray(seasonIndex).push(this.createRoomTypeFormGroup());
  }

  removeRoomType(seasonIndex: number, roomTypeIndex: number): void {
    this.getRoomTypesFormArray(seasonIndex).removeAt(roomTypeIndex);
  }

  getSupplementsFormArray(index: number): FormArray {
    return this.seasonsFormArray.at(index).get('supplements') as FormArray;
  }

  addSupplement(seasonIndex: number): void {
    this.getSupplementsFormArray(seasonIndex).push(this.createSupplementFormGroup());
  }

  removeSupplement(seasonIndex: number, supplementIndex: number): void {
    this.getSupplementsFormArray(seasonIndex).removeAt(supplementIndex);
  }
}
