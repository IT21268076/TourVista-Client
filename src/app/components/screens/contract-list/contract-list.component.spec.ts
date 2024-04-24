import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractListComponent } from './contract-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { AdminDashboardComponent } from './../admin-dashboard/admin-dashboard.component';
import { UpdateContractComponent } from '../../forms/update-contract/update-contract.component';

describe('ContractListComponent', () => {
  let component: ContractListComponent;
  let fixture: ComponentFixture<ContractListComponent>;
  let contractService: jasmine.SpyObj<ContractService>;
  let router: jasmine.SpyObj<Router>;
  let toastr: jasmine.SpyObj<ToastrService>;
  let adminDashboardComponent: jasmine.SpyObj<AdminDashboardComponent>;

  beforeEach(async () => {
    const contractServiceSpy = jasmine.createSpyObj('ContractService', ['getContractByHotel', 'deleteContract']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const adminDashboardComponentSpy = jasmine.createSpyObj('AdminDashboardComponent', ['loadComponent']);
  
    await TestBed.configureTestingModule({
      declarations: [ContractListComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map().set('hotelId', '123') } } },
        { provide: ContractService, useValue: contractServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: AdminDashboardComponent, useValue: adminDashboardComponentSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(ContractListComponent);
    component = fixture.componentInstance;
  
    contractService = TestBed.inject(ContractService) as jasmine.SpyObj<ContractService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    adminDashboardComponent = TestBed.inject(AdminDashboardComponent) as jasmine.SpyObj<AdminDashboardComponent>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should load contracts successfully', () => {
    
  //   component.loadContracts(123); // Pass hotelId
  //   expect(toastr.success).toHaveBeenCalledWith('Contract loaded Successfully', 'Success');
  // });

  // it('should handle error when loading contracts', () => {
  //   spyOn(contractService, 'getContractByHotel').and.returnValue(throwError('Error fetching contracts'));
  //   component.loadContracts(123); // Pass hotelId
  //   expect(toastr.error).toHaveBeenCalledWith('Error while loading Contracts', 'Error');
  // });

  it('should navigate to edit contract', () => {
    component.editContract(456); // Pass contractId
    expect(adminDashboardComponent.loadComponent).toHaveBeenCalledWith(UpdateContractComponent, 456);
  });

  // it('should delete contract successfully', () => {
  //   spyOn(contractService, 'deleteContract').and.returnValue(of({}));
  //   component.deleteContract(789); // Pass contractId
  //   expect(toastr.success).toHaveBeenCalledWith('Contract deleted Successfully', 'Success');
  // });

  // it('should handle error when deleting contract', () => {
  //   spyOn(contractService, 'deleteContract').and.returnValue(throwError('Error deleting contract'));
  //   component.deleteContract(789); // Pass contractId
  //   expect(toastr.error).toHaveBeenCalledWith('Error while deleting Contract', 'Error');
  // });
});
