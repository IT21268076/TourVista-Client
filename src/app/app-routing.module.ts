import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/screens/home/home.component';
import { SearchHotelComponent } from './components/screens/search-hotel/search-hotel.component';
import { HotelDetailsComponent } from './components/screens/hotel-details/hotel-details.component';
// import { RoomTypeTableComponent } from './components/screens/room-type-table/room-type-table.component';
import { BookingFormComponent } from './components/forms/booking-form/booking-form.component';
import { AddHotelFormComponent } from './components/forms/add-hotel-form/add-hotel-form.component';
import { AdminDashboardComponent } from './components/screens/admin-dashboard/admin-dashboard.component';
import { ContractFormComponent } from './components/forms/contract-form/contract-form.component';
import { MyBookingsComponent } from './components/screens/my-bookings/my-bookings.component';
import { LoginComponent } from './components/forms/login/login.component';
import { AuthGuard } from './services/authGuard';
import { RegisterComponent } from './components/forms/register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchHotelComponent},
  {path: 'hotel-details/:hotelId', component: HotelDetailsComponent},
  {path: 'roomType', component: HotelDetailsComponent, canActivate: [AuthGuard], data: { roles: ['USER']}},
  {path: 'booking', component: BookingFormComponent, canActivate: [AuthGuard]},
  {path: 'add-hotel', component: AddHotelFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN']}},
  {path: 'admin-dashboard', component: AdminDashboardComponent}, //canActivate: [AuthGuard], data: { roles: ['ADMIN']}},
  {path: 'add-contract', component: ContractFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN']}},
  {path: 'my-bookings', component: MyBookingsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
