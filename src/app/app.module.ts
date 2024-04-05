import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/screens/home/home.component';
import { BookingComponent } from './components/screens/booking/booking.component';
import { SearchHotelComponent } from './components/screens/search-hotel/search-hotel.component';
import { AddHotelFormComponent } from './components/forms/add-hotel-form/add-hotel-form.component';
import { HotelDetailsComponent } from './components/screens/hotel-details/hotel-details.component';
import { BookingFormComponent } from './components/forms/booking-form/booking-form.component';
import { ViewBookingComponent } from './components/screens/view-booking/view-booking.component';
import { RoomTypeTableComponent } from './components/screens/room-type-table/room-type-table.component';
import { BookingDetailComponent } from './components/popup/booking-detail/booking-detail.component';
import { AdminDashboardComponent } from './components/screens/admin-dashboard/admin-dashboard.component';
import { ContractFormComponent } from './components/forms/contract-form/contract-form.component';
import { ModalComponent } from './components/popup/modal/modal.component';
import { MyBookingsComponent } from './components/screens/my-bookings/my-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    BookingComponent,
    SearchHotelComponent,
    AddHotelFormComponent,
    HotelDetailsComponent,
    BookingFormComponent,
    ViewBookingComponent,
    RoomTypeTableComponent,
    BookingDetailComponent,
    AdminDashboardComponent,
    ContractFormComponent,
    ModalComponent,
    MyBookingsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule, 
    MatButtonModule,
    MatChipsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule, 
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
