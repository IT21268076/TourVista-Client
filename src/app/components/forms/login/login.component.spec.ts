import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IntendedRouteService } from 'src/app/services/intended-route.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let intendedRouteService: jasmine.SpyObj<IntendedRouteService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'getUserRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const intendedRouteServiceSpy = jasmine.createSpyObj('IntendedRouteService', ['getIntendedRoute', 'clearIntendedRoute']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule], // Add FormsModule to imports
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: IntendedRouteService, useValue: intendedRouteServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    intendedRouteService = TestBed.inject(IntendedRouteService) as jasmine.SpyObj<IntendedRouteService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to admin dashboard after successful login as admin', () => {
    const dummyData = { token: 'dummyToken' };
    authService.login.and.returnValue(of(dummyData));
    authService.getUserRole.and.returnValue('ADMIN');
  
    component.login();
  
    fixture.detectChanges(); // Trigger change detection
  
    expect(authService.login).toHaveBeenCalled();
    expect(authService.getUserRole).toHaveBeenCalledWith(dummyData.token);
    expect(router.navigate).toHaveBeenCalledWith(['/admin-dashboard']);
  });
  
  it('should navigate to user dashboard after successful login as user', () => {
    const dummyData = { token: 'dummyToken' };
    authService.login.and.returnValue(of(dummyData));
    authService.getUserRole.and.returnValue('USER');
    intendedRouteService.getIntendedRoute.and.returnValue('/intended-route');
  
    component.login();
  
    fixture.detectChanges(); // Trigger change detection
  
    expect(authService.login).toHaveBeenCalled();
    expect(authService.getUserRole).toHaveBeenCalledWith(dummyData.token);
    expect(router.navigate).toHaveBeenCalledWith(['/intended-route']);
    expect(intendedRouteService.clearIntendedRoute).toHaveBeenCalled();
  });
  
  it('should navigate to default route after successful login if no intended route', () => {
    const dummyData = { token: 'dummyToken' };
    authService.login.and.returnValue(of(dummyData));
    authService.getUserRole.and.returnValue('USER');
    intendedRouteService.getIntendedRoute.and.returnValue(null);
  
    component.login();
  
    fixture.detectChanges(); // Trigger change detection
  
    expect(authService.login).toHaveBeenCalled();
    expect(authService.getUserRole).toHaveBeenCalledWith(dummyData.token);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
  
  it('should handle login error', () => {
    const errorMessage = 'Invalid username or password';
    authService.login.and.returnValue(throwError(errorMessage));
  
    component.login();
  
    fixture.detectChanges(); // Trigger change detection
  
    expect(authService.login).toHaveBeenCalled();
    expect(component.errorMessage).toEqual(errorMessage);
  });
  
  it('should navigate to register page', () => {
    component.navigateToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });
  
});
