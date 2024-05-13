import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/screens/home/home.component';
import { BookingComponent } from './components/screens/booking/booking.component';
import { SearchHotelComponent } from './components/screens/search-hotel/search-hotel.component';
import { AddHotelFormComponent } from './components/forms/add-hotel-form/add-hotel-form.component';
import { HotelDetailsComponent } from './components/screens/hotel-details/hotel-details.component';
import { BookingFormComponent } from './components/forms/booking-form/booking-form.component';
import { ViewBookingComponent } from './components/screens/view-booking/view-booking.component';
// import { RoomTypeTableComponent } from './components/screens/room-type-table/room-type-table.component';
import { BookingDetailComponent } from './components/popup/booking-detail/booking-detail.component';
import { AdminDashboardComponent } from './components/screens/admin-dashboard/admin-dashboard.component';
import { ContractFormComponent } from './components/forms/contract-form/contract-form.component';
import { ModalComponent } from './components/popup/modal/modal.component';
import { MyBookingsComponent } from './components/screens/my-bookings/my-bookings.component';
import { LoginComponent } from './components/forms/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { LogInterceptor } from './log.interceptor';
import { RegisterComponent } from './components/forms/register/register.component';
import { MyBookingDetailsComponent } from './components/screens/my-booking-details/my-booking-details.component';
import { ContractListComponent } from './components/screens/contract-list/contract-list.component';
import { UpdateContractComponent } from './components/forms/update-contract/update-contract.component';
import { UniquePipe } from './components/popup/unique.pipe';
import { PaymentComponent } from './components/forms/payment/payment.component';
import { FooterComponent } from './components/footer/footer.component';
import { HotelListComponent } from './components/screens/hotel-list/hotel-list.component';
import { ViewHotelComponent } from './components/screens/view-hotel/view-hotel.component';
import { InitialAdminDashComponent } from './components/screens/initial-admin-dash/initial-admin-dash.component';


register();

@NgModule({
  declarations: [
    AppComponent,
    UniquePipe,
    NavBarComponent,
    HomeComponent,
    BookingComponent,
    SearchHotelComponent,
    AddHotelFormComponent,
    HotelDetailsComponent,
    BookingFormComponent,
    ViewBookingComponent,
    // RoomTypeTableComponent,
    BookingDetailComponent,
    AdminDashboardComponent,
    ContractFormComponent,
    ModalComponent,
    MyBookingsComponent,
    LoginComponent,
    RegisterComponent,
    MyBookingDetailsComponent,
    ContractListComponent,
    UpdateContractComponent,
    PaymentComponent,
    FooterComponent,
    HotelListComponent,
    ViewHotelComponent,
    InitialAdminDashComponent
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
    ReactiveFormsModule,
    MatSidenavModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
