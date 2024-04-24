import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AddHotelFormComponent } from './add-hotel-form.component';
import { HotelService } from 'src/app/services/hotel.service';

describe('AddHotelFormComponent', () => {
  let component: AddHotelFormComponent;
  let fixture: ComponentFixture<AddHotelFormComponent>;
  let hotelService: jasmine.SpyObj<HotelService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const hotelServiceSpy = jasmine.createSpyObj('HotelService', ['addHotel']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [AddHotelFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: HotelService, useValue: hotelServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ],
    }).compileComponents();

    hotelService = TestBed.inject(HotelService) as jasmine.SpyObj<HotelService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHotelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.hotelForm).toBeDefined();
    expect(component.hotelForm.get('name')).toBeDefined();
    expect(component.hotelForm.get('no')).toBeDefined();
    expect(component.hotelForm.get('street')).toBeDefined();
    expect(component.hotelForm.get('city')).toBeDefined();
    expect(component.hotelForm.get('description')).toBeDefined();
    expect(component.hotelForm.get('email')).toBeDefined();
    expect(component.hotelForm.get('contactNo')).toBeDefined();
  });


  
  it('should set hotelImages correctly when file is selected', () => {
    const event = {
      target: {
        files: [new File(['test'], 'test.png')],
      },
    };
    component.onFileSelected(event);
    expect(component.hotelImages).toBeDefined();
    expect(component.hotelImages.length).toEqual(1);
  });
});
