import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeTableComponent } from './room-type-table.component';

describe('RoomTypeTableComponent', () => {
  let component: RoomTypeTableComponent;
  let fixture: ComponentFixture<RoomTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomTypeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
