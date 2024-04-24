import { AdminDashboardComponent } from './../admin-dashboard/admin-dashboard.component';
import { ContractService } from 'src/app/services/contract.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateContractComponent } from '../../forms/update-contract/update-contract.component';

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

 constructor(private route: ActivatedRoute, private contractService: ContractService, private router: Router, private adminDashboardComponent
  : AdminDashboardComponent, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.hotelId;
    this.loadContracts(this.hotelId);

  }
  loadContracts(hotelId: any) {
    console.log(hotelId)
    const contractObservable = this.contractService.getContractByHotel(hotelId);
    if (contractObservable) {
      contractObservable.subscribe(
        (data: any) => {
          console.log(data);
          this.contracts = data.data;
          this.toastr.success(`Contract loaded Successfully`, 'Success');
        },
        error => {
          console.log("Error fetching contracts: ", error);
          this.toastr.error(`Error while loading Contracts`, 'Error');
        }
      );
    } else {
      console.error("Observable returned by contractService.getContractByHotel is undefined");
      this.toastr.error(`Error while loading Contracts`, 'Error');
    }
  }
  

  editContract(contractId: number) {
    console.log('Edit contract:', contractId);
    // this.router.navigate([`/update-contract/${contractId}`]);
    this.adminDashboardComponent.loadComponent(UpdateContractComponent, contractId);
  }

  deleteContract(contractId: number) {
    console.log('Delete contract:', contractId);
    this.contractService.deleteContract(contractId)
    .subscribe(response =>{
      this.toastr.success(`Contract deleted Successfully`, 'Success');
      this.loadContracts(this.hotelId);
    },
    error => {
      this.toastr.error(`Error while deleting Contract`, 'Error');
    }
  );
  }

  
}

