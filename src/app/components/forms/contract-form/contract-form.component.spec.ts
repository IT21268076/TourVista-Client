import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractFormComponent } from './contract-form.component';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

describe('ContractFormComponent', () => {
  let component: ContractFormComponent;
  let fixture: ComponentFixture<ContractFormComponent>;
  let contractService: any;
  let router: any;
  let toastr: any;

  beforeEach(async () => {
    const contractServiceStub = {
      addContract: () => of({}),
    };

    const routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    const toastrStub = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      declarations: [ContractFormComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
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
    fixture = TestBed.createComponent(ContractFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  it('should add discount', () => {
    const initialDiscountsLength = component.discountsFormArray.length;
    component.addDiscount();
    expect(component.discountsFormArray.length).toBe(initialDiscountsLength + 1);
  });

  // Add more test cases for other component methods as needed
});
