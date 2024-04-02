import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/screens/home/home.component';
import { SearchHotelComponent } from './components/screens/search-hotel/search-hotel.component';
import { HotelDetailsComponent } from './components/screens/hotel-details/hotel-details.component';
import { RoomTypeTableComponent } from './components/screens/room-type-table/room-type-table.component';
import { BookingFormComponent } from './components/forms/booking-form/booking-form.component';
import { AddHotelFormComponent } from './components/forms/add-hotel-form/add-hotel-form.component';
import { AdminDashboardComponent } from './components/screens/admin-dashboard/admin-dashboard.component';
import { ContractFormComponent } from './components/forms/contract-form/contract-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchHotelComponent},
  {path: 'hotel-details/:hotelId', component: HotelDetailsComponent},
  {path: 'roomType', component: HotelDetailsComponent},
  {path: 'booking', component: BookingFormComponent},
  {path: 'add-hotel', component: AddHotelFormComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: 'add-contract', component: ContractFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
