import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ContractFormComponent } from '../../forms/contract-form/contract-form.component';
import { ModalComponent } from '../../popup/modal/modal.component';
import { ContractListComponent } from '../contract-list/contract-list.component';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Renderer2 } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Mock components
@Component({selector: 'app-add-hotel-form', template: ''})
class AddHotelFormComponent {}

@Component({selector: 'app-contract-list', template: ''})
class MockContractListComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  hotelId: number | undefined;
}

@Component({selector: 'app-modal', template: ''})
class MockModalComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  hotelIdObtained: Observable<number> = of(1);
}

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminDashboardComponent,
        AddHotelFormComponent,
        MockContractListComponent,
        MockModalComponent
      ],
      imports: [HttpClientTestingModule, CommonModule],
      providers: [
        { provide: Renderer2, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open hotel email popup and load contract form component with hotel id', () => {
    spyOn(component, 'loadComponent');
    spyOn(fixture.componentInstance.dynamicComponentContainer, 'clear');

    const popupRef = new MockModalComponent() as any;
    popupRef.hotelIdObtained.subscribe((hotelId: number) => {
      component.loadComponent(ContractFormComponent, hotelId);
    });

    component.openHotelEmailPopup();
    fixture.detectChanges();

    expect(component.loadComponent).toHaveBeenCalledWith(ContractFormComponent, 1);
  });
});
