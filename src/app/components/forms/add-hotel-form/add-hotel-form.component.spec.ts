import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelFormComponent } from './add-hotel-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddHotelFormComponent', () => {
  let component: AddHotelFormComponent;
  let fixture: ComponentFixture<AddHotelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHotelFormComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHotelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
