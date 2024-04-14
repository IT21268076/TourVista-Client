import { ContractService } from 'src/app/services/contract.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

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

 constructor(private route: ActivatedRoute, private contractService: ContractService, private router: Router) { }

  ngOnInit(): void {
    this.hotelId;
    console.log("hotel Id in ch", this.hotelId)
    this.loadContracts(this.hotelId);

  }

  loadContracts(hotelId: any) {
    console.log(hotelId)
    this.contractService.getContractByHotel(hotelId)
      .subscribe(data => {
        console.log(data);
        this.contracts = data;
      },
      error => {
        console.log("Eoor fetching contracts: ", error)
      }
    );
  }

  editContract(contractId: number) {
    console.log('Edit contract:', contractId);
    // Implement your edit logic here
  }

  deleteContract(contractId: number) {
    console.log('Delete contract:', contractId);
    // Implement your delete logic here
  }

  
}

