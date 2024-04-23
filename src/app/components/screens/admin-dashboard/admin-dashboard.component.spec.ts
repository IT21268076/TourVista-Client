import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ComponentFactoryResolver, NO_ERRORS_SCHEMA, ViewContainerRef } from '@angular/core';
import { of } from 'rxjs';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { HotelService } from 'src/app/services/hotel.service';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let componentFactoryResolver: ComponentFactoryResolver;
  let viewContainerRef: ViewContainerRef;
  let hotelService: jasmine.SpyObj<HotelService>;

  beforeEach(() => {
    const hotelServiceSpy = jasmine.createSpyObj('HotelService', ['']);
    TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent],
      providers: [
        { provide: ComponentFactoryResolver, useClass: MockComponentFactoryResolver },
        { provide: ViewContainerRef, useValue: { clear: jasmine.createSpy('clear'), createComponent: jasmine.createSpy('createComponent') } },
        { provide: HotelService, useValue: hotelServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    componentFactoryResolver = TestBed.inject(ComponentFactoryResolver);
    viewContainerRef = TestBed.inject(ViewContainerRef);
    hotelService = TestBed.inject(HotelService) as jasmine.SpyObj<HotelService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  
});

class MockComponentFactoryResolver {
  resolveComponentFactory(component: any) {
    return {
      create: () => new MockComponentRef()
    };
  }
}

class MockComponentRef {
  instance: any;
}

@Component({ selector: 'app-mock', template: '' })
class MockComponent { }
