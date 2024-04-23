// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { UpdateContractComponent } from './update-contract.component';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ContractService } from 'src/app/services/contract.service';
// import { RoomTypeService } from './../../../services/room-type.service';
// import { SupplementService } from 'src/app/services/supplement.service';
// import { of } from 'rxjs';

// describe('UpdateContractComponent', () => {
//   let component: UpdateContractComponent;
//   let fixture: ComponentFixture<UpdateContractComponent>;
//   let contractService: jasmine.SpyObj<ContractService>;
//   let roomTypeService: jasmine.SpyObj<RoomTypeService>;
//   let supplementService: jasmine.SpyObj<SupplementService>;
//   let router: jasmine.SpyObj<Router>;
//   let formBuilder: FormBuilder;

//   beforeEach(waitForAsync(() => {
//     const contractServiceSpy = jasmine.createSpyObj('ContractService', ['getContractById', 'updateContract']);
//     const roomTypeServiceSpy = jasmine.createSpyObj('RoomTypeService', ['getRoomTypeBySeasonAndId', 'getPriceByRoomType']);
//     const supplementServiceSpy = jasmine.createSpyObj('SupplementService', ['getSupplementBySeasonAndId', 'getPriceBySupplement']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     TestBed.configureTestingModule({
//       declarations: [ UpdateContractComponent ],
//       imports: [ ReactiveFormsModule ],
//       providers: [
//         FormBuilder,
//         { provide: ContractService, useValue: contractServiceSpy },
//         { provide: RoomTypeService, useValue: roomTypeServiceSpy },
//         { provide: SupplementService, useValue: supplementServiceSpy },
//         { provide: Router, useValue: routerSpy },
//         { provide: ActivatedRoute, useValue: { params: of({ contractId: 1 }) } }
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(UpdateContractComponent);
//     component = fixture.componentInstance;
//     contractService = TestBed.inject(ContractService) as jasmine.SpyObj<ContractService>;
//     roomTypeService = TestBed.inject(RoomTypeService) as jasmine.SpyObj<RoomTypeService>;
//     supplementService = TestBed.inject(SupplementService) as jasmine.SpyObj<SupplementService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//     formBuilder = TestBed.inject(FormBuilder);
//     fixture.detectChanges();
//   });



  
// });
