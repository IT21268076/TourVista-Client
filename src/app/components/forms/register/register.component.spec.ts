import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [FormsModule], // Add this line to import the FormsModule
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register successfully', () => {
    const userData = {
      username: 'testUser',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      mobileNo: '1234567890',
      role: 'USER'
    };

    authService.register.and.returnValue(of({}));

    component.username = userData.username;
    component.firstName = userData.firstName;
    component.lastName = userData.lastName;
    component.email = userData.email;
    component.password = userData.password;
    component.mobileNo = userData.mobileNo;
    component.role = userData.role;

    component.register();

    expect(authService.register).toHaveBeenCalledWith(userData);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle registration error', () => {
    const error = { message: 'Registration failed' };
    authService.register.and.returnValue(throwError(error));

    component.register();

    expect(authService.register).toHaveBeenCalled();
    expect(component.errorMessage).toEqual(error.message);
  });
});
