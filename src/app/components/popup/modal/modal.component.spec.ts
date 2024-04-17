import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Renderer2, ElementRef } from '@angular/core';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let rendererSpy: jasmine.SpyObj<Renderer2>;
  let elementRefSpy: jasmine.SpyObj<ElementRef>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    rendererSpy = jasmine.createSpyObj('Renderer2', ['removeChild']);
    elementRefSpy = jasmine.createSpyObj('ElementRef', ['nativeElement']);

    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Renderer2, useValue: rendererSpy },
        { provide: ElementRef, useValue: elementRefSpy },
        { provide: HttpClient, useValue: httpClientSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit hotelId when addHotelEmail is called', () => {
    const hotelId = 123;
    httpClientSpy.get.and.returnValue(of(hotelId));

    spyOn(component.hotelIdObtained, 'emit');

    component.email = 'test@example.com';
    component.addHotelEmail();

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(`http://localhost:8080/api/hotel/getIdByEmail/${component.email}`);
    expect(component.hotelIdObtained.emit).toHaveBeenCalledWith(hotelId);
    expect(component.errorOccurred).toBeFalse();
    expect(component.errorMessage).toEqual('');
  });

  it('should handle error when addHotelEmail fails', () => {
    const errorMessage = 'An error occurred';
    httpClientSpy.get.and.returnValue(throwError(errorMessage));

    component.email = 'test@example.com';
    component.addHotelEmail();

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(`http://localhost:8080/api/hotel/getIdByEmail/${component.email}`);
    expect(component.hotelIdObtained.emit).not.toHaveBeenCalled();
    expect(component.errorOccurred).toBeTrue();
    expect(component.errorMessage).toEqual('An error occurred while adding the hotel email.');
  });

  it('should close modal when closeModal is called', () => {
    component.closeModal();
    expect(rendererSpy.removeChild).toHaveBeenCalledOnceWith(document.body, elementRefSpy.nativeElement);
    expect(component.errorOccurred).toBeFalse();
  });
});
