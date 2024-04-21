import { ContractService } from 'src/app/services/contract.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
 selector: 'app-contract-list',
 templateUrl: './contract-list.component.html',
 styleUrls: ['./contract-list.component.css'],
 animations: [
  trigger('fadeIn', [
    state('void', style({ opacity: 0 })),
    transition(':enter', [
      animate('0.5s', style({ opacity: 1 }))
    ])
  ])
]
})
export class ContractListComponent implements OnInit{
  contracts: any[] = [];
  seasons: any[] = [];
  hotelId: any;

 constructor(private route: ActivatedRoute, private contractService: ContractService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.hotelId;
    this.loadContracts(this.hotelId);

  }

  loadContracts(hotelId: any) {
    console.log(hotelId)
    this.contractService.getContractByHotel(hotelId)
      .subscribe((data: any) => {
        console.log(data);
        this.contracts = data.data;
        this.toastr.success(`Contract loaded Successfully`, 'Success');
      },
      error => {
        console.log("Eoor fetching contracts: ", error);
        this.toastr.error(`Error while loadeding Contracts`, 'Error');
      }
    );
  }

  editContract(contractId: number) {
    console.log('Edit contract:', contractId);
    this.router.navigate([`/update-contract/${contractId}`]);
  }

  deleteContract(contractId: number) {
    console.log('Delete contract:', contractId);
    this.contractService.deleteContract(contractId)
    .subscribe(response =>{
      this.toastr.success(`Contract deleted Successfully`, 'Success');
      this.loadContracts(this.hotelId);
    },
    error => {
      this.toastr.error(`Error ehile deleting Contract`, 'Error');
    }
  );
  }

  
}

