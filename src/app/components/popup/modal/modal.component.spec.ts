import { HttpClient } from '@angular/common/http';
import { ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ModalComponent } from './modal.component';
import { environment } from 'src/environment';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let http: jasmine.SpyObj<HttpClient>;
  let elementRef: jasmine.SpyObj<ElementRef>;
  let renderer: jasmine.SpyObj<Renderer2>;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const elementRefSpy = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const rendererSpy = jasmine.createSpyObj('Renderer2', ['removeChild']);

    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: ElementRef, useValue: elementRefSpy },
        { provide: Renderer2, useValue: rendererSpy }
      ]
    });

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    elementRef = TestBed.inject(ElementRef) as jasmine.SpyObj<ElementRef>;
    renderer = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit hotelId when email is found', () => {
    const email = 'test@example.com';
    const hotelId = 123;
    http.get.and.returnValue(of({ data: hotelId }));
    spyOn(component.hotelIdObtained, 'emit');
    
    component.email = email;
    component.addHotelEmail();
    
    expect(http.get).toHaveBeenCalledWith(`${baseUrl}/hotel/getIdByEmail/${email}`);
    expect(component.hotelIdObtained.emit).toHaveBeenCalledWith(hotelId);
  });

  it('should handle error when adding hotel email', () => {
    const email = 'test@example.com';
    const errorMessage = 'An error occurred while adding the hotel email.';
    http.get.and.returnValue(throwError('Server error'));
    
    component.email = email;
    component.addHotelEmail();
    
    expect(http.get).toHaveBeenCalledWith(`${baseUrl}/hotel/getIdByEmail/${email}`);
    expect(component.errorOccurred).toBeTrue();
    expect(component.errorMessage).toBe(errorMessage);
  });

  
});

