import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavBarComponent } from './nav-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    
    TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      imports: [ RouterTestingModule, MatMenuModule ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn to true if user is logged in', () => {
    localStorage.setItem('currentUser', 'some token');
    component.ngOnInit();
    expect(component.isLoggedIn).toBe(true);
  });

  it('should set isLoggedIn to false if user is not logged in', () => {
    localStorage.removeItem('currentUser');
    component.ngOnInit();
    expect(component.isLoggedIn).toBe(false);
  });

  it('should call AuthService.logout() and set isLoggedIn to false on logout', () => {
    component.isLoggedIn = true;
    component.onLogout();
    expect(authService.logout).toHaveBeenCalled();
    expect(component.isLoggedIn).toBe(false);
  });

  it('should navigate to my-bookings when myBookings path is selected', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onPathSelected('myBookings');
    expect(navigateSpy).toHaveBeenCalledWith(['/my-bookings']);
  });

  it('should navigate to profile when myProfile path is selected', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onPathSelected('myProfile');
    expect(navigateSpy).toHaveBeenCalledWith(['/profile']);
  });
});
