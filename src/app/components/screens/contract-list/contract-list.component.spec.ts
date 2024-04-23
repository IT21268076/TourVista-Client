import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractListComponent } from './contract-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { trigger, state, style, transition, animate } from '@angular/animations';

describe('ContractListComponent', () => {
  let component: ContractListComponent;
  let fixture: ComponentFixture<ContractListComponent>;
  let contractService: any;
  let router: any;
  let toastr: any;

  beforeEach(async () => {
    const contractServiceStub = {
      getContractByHotel: () => of({ data: [] }),
      deleteContract: () => of({}),
    };

    const routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    const toastrStub = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      declarations: [ContractListComponent],
      imports: [BrowserAnimationsModule], // Add BrowserAnimationsModule to imports
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map().set('hotelId', '123') } } },
        { provide: ContractService, useValue: contractServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ToastrService, useValue: toastrStub }
      ]
    }).compileComponents();

    contractService = TestBed.inject(ContractService);
    router = TestBed.inject(Router);
    toastr = TestBed.inject(ToastrService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contracts successfully', () => {
    spyOn(contractService, 'getContractByHotel').and.returnValue(of({ data: [] }));
    component.loadContracts(123); // Pass hotelId
    expect(contractService.getContractByHotel).toHaveBeenCalledWith(123);
    expect(toastr.success).toHaveBeenCalledWith('Contract loaded Successfully', 'Success');
  });

  it('should handle error when loading contracts', () => {
    spyOn(contractService, 'getContractByHotel').and.returnValue(throwError('Error fetching contracts'));
    component.loadContracts(123); // Pass hotelId
    expect(contractService.getContractByHotel).toHaveBeenCalledWith(123);
    expect(toastr.error).toHaveBeenCalledWith('Error while loading Contracts', 'Error');
  });

  it('should navigate to edit contract', () => {
    component.editContract(456); // Pass contractId
    expect(router.navigate).toHaveBeenCalledWith(['/update-contract/456']);
  });

  it('should delete contract successfully', () => {
    spyOn(contractService, 'deleteContract').and.returnValue(of({}));
    spyOn(component, 'loadContracts');
    component.deleteContract(789); // Pass contractId
    expect(contractService.deleteContract).toHaveBeenCalledWith(789);
    expect(toastr.success).toHaveBeenCalledWith('Contract deleted Successfully', 'Success');
    expect(component.loadContracts).toHaveBeenCalled(); // Ensure loadContracts is called to refresh the list
  });

  it('should handle error when deleting contract', () => {
    spyOn(contractService, 'deleteContract').and.returnValue(throwError('Error deleting contract'));
    component.deleteContract(789); // Pass contractId
    expect(contractService.deleteContract).toHaveBeenCalledWith(789);
    expect(toastr.error).toHaveBeenCalledWith('Error while deleting Contract', 'Error');
  });
});
