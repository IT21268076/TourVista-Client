import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingFormComponent } from './booking-form.component';
import { FormsModule } from '@angular/forms'; // Add this import
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BookingFormComponent', () => {
  let component: BookingFormComponent;
  let fixture: ComponentFixture<BookingFormComponent>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      queryParams: of({
        roomTypeId: 1,
        type: 'Single',
        roomTypePrice: 100,
        seasonName: 'Summer',
        supplements: JSON.stringify([{ name: 'Breakfast', price: 10 }, { name: 'Parking', price: 20 }]),
        discounts: JSON.stringify([])
      })
    };

    await TestBed.configureTestingModule({
      declarations: [BookingFormComponent],
      imports: [FormsModule], // Add FormsModule here
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total amount correctly', () => {
    component.selectedSupplements = [true, true]; // Selecting two supplements
    component.calculateTotalAmount();
    // Room price: 100, Supplement prices: 10 + 20 = 30
    expect(component.totalAmount).toEqual(130);
  });
});
