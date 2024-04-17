import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockToken: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const userData = { username: 'testuser', password: 'password123' };
    const mockResponse = { message: 'User registered successfully' };

    service.register(userData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should login a user', () => {
    const mockUser = { token: 'mockToken', userId: 'mockUserId' };
    const username = 'testuser';
    const password = 'password123';

    spyOn(localStorage, 'setItem');

    service.login(username, password).subscribe((response) => {
      expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', mockUser.token);
      expect(localStorage.setItem).toHaveBeenCalledWith('userId', mockUser.userId);
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should logout a user', () => {
    spyOn(localStorage, 'removeItem');
    // spyOn(service.currentUserSubject, 'next');

    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
    // expect(service.currentUserSubject.next).toHaveBeenCalledWith(null);
  });

  it('should decode user role from token', () => {
    const helper = new JwtHelperService();
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ._esNF5f1YVY-F0ZIXR-1_Dn1D6O4L3gHnbdFaVQn0d8';
    const mockUserRole = 'admin';
    spyOn(helper, 'decodeToken').and.returnValue({ role: mockUserRole } as any);
  
    const decodedRole = service.getUserRole(mockToken);
  
    expect(decodedRole).toEqual(mockUserRole);
    // expect(helper.decodeToken).toHaveBeenCalledWith('');
  });
  
  
  
  
});
