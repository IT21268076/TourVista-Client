import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { ContractListComponent } from './contract-list.component';

describe('ContractListComponent', () => {
 let component: ContractListComponent;
 let fixture: ComponentFixture<ContractListComponent>;
 let mockContractService: any;
 let mockRouter: any;
 let mockActivatedRoute: any;

 beforeEach(async () => {
    mockContractService = jasmine.createSpyObj(['getContractByHotel']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      paramMap: of({ get: () => '1' })
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ContractListComponent],
      providers: [
        { provide: ContractService, useValue: mockContractService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractListComponent);
    component = fixture.componentInstance;
 });

 it('should create', () => {
    expect(component).toBeTruthy();
 });

 it('should fetch contracts on init', () => {
  const contracts = [{ id: 1, hotelId: '1', name: 'Test Contract' }];
  mockContractService.getContractByHotel.and.returnValue(of(contracts));
 
  component.ngOnInit();
 
  expect(mockContractService.getContractByHotel).toHaveBeenCalledWith('1');
  expect(component.contracts).toEqual(contracts);
 });
 
 it('should log contractId when editContract is called', () => {
  spyOn(console, 'log');
  const contractId = 1;
 
  component.editContract(contractId);
 
  expect(console.log).toHaveBeenCalledWith('Edit contract:', contractId);
 });
 
 it('should log contractId when deleteContract is called', () => {
  spyOn(console, 'log');
  const contractId = 1;
 
  component.deleteContract(contractId);
 
  expect(console.log).toHaveBeenCalledWith('Delete contract:', contractId);
 });
 
});
