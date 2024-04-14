import {Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  
})
export class NavBarComponent implements OnInit{

   constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn!: boolean;

 ngOnInit(): void {
    this.checkLoginStatus();
 }

 checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('currentUser');
 }
 
  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
 }

 
 onPathSelected(path: string): void {
   // Handle the path selection here
   switch (path) {
     case 'myBookings':
       this.router.navigate(['/my-bookings']);
       break;
     case 'myProfile':
       this.router.navigate(['/profile']);
       break;
     default:
       break;
   }
 }
 
}
