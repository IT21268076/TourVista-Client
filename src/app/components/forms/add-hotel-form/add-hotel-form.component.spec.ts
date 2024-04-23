import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHotelFormComponent } from './add-hotel-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';
import { of, throwError } from 'rxjs';

describe('AddHotelFormComponent', () => {
  let component: AddHotelFormComponent;
  let fixture: ComponentFixture<AddHotelFormComponent>;
  let formBuilder: FormBuilder;
  let hotelService: any; // Replace with the actual service if available

  beforeEach(async () => {
    const hotelServiceStub = {
      addHotel: () => of({}),
    };

    await TestBed.configureTestingModule({
      declarations: [AddHotelFormComponent],
      imports: [ReactiveFormsModule], // Import ReactiveFormsModule for FormBuilder
      providers: [{ provide: HotelService, useValue: hotelServiceStub }],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    hotelService = TestBed.inject(HotelService);
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

  it('should call hotelService.addHotel when form is submitted with valid data and images selected', () => {
    spyOn(hotelService, 'addHotel').and.returnValue(of({}));

    const formData = new FormData();
    formData.append('hotelData', JSON.stringify(component.hotelForm.value));
    const file = new File(['test'], 'test.png');
    formData.append('hotelImages', file);

    component.hotelImages = { length: 1 } as FileList;
    component.hotelForm.setValue({
      name: 'Test Hotel',
      no: '123',
      street: 'Test Street',
      city: 'Test City',
      description: 'Test Description',
      email: 'test@example.com',
      contactNo: '1234567890',
    });

    component.onSubmit();

    expect(hotelService.addHotel).toHaveBeenCalledWith(formData);
  });

  it('should handle error when hotel addition fails', () => {
    spyOn(hotelService, 'addHotel').and.returnValue(throwError('Error'));

    const consoleSpy = spyOn(console, 'error');

    component.hotelImages = { length: 1 } as FileList;
    component.hotelForm.setValue({
      name: 'Test Hotel',
      no: '123',
      street: 'Test Street',
      city: 'Test City',
      description: 'Test Description',
      email: 'test@example.com',
      contactNo: '1234567890',
    });

    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('Error adding hotel:', 'Error');
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
