// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AuthService } from './auth.service';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

// describe('AuthService', () => {
//   let service: AuthService;
//   let httpMock: HttpTestingController;
//   let router: Router;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, RouterTestingModule],
//       providers: [AuthService]
//     });
//     service = TestBed.inject(AuthService);
//     httpMock = TestBed.inject(HttpTestingController);
//     router = TestBed.inject(Router);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should register user', () => {
//     const userData = { username: 'testUser', password: 'testPassword' };
//     service.register(userData).subscribe(
//       response => {
//         expect(response).toBeTruthy();
//       },
//       error => {
//         fail('Expected successful registration');
//       }
//     );

//     const req = httpMock.expectOne('http://localhost:8080/register');
//     expect(req.request.method).toBe('POST');
//     req.flush({});
//   });

//   it('should handle registration error', () => {
//     const userData = { username: 'testUser', password: 'testPassword' };
//     const errorMessage = 'Registration failed';
//     service.register(userData).subscribe(
//       response => {
//         fail('Expected registration to fail');
//       },
//       error => {
//         expect(error).toBeTruthy();
//         expect(error.message).toEqual(errorMessage);
//       }
//     );

//     const req = httpMock.expectOne('http://localhost:8080/register');
//     expect(req.request.method).toBe('POST');
//     req.error(new ErrorEvent(errorMessage));
//   });

//   it('should login user', () => {
//     const userData = { username: 'testUser', password: 'testPassword' };
//     service.login(userData.username, userData.password).subscribe(
//       response => {
//         expect(response).toBeTruthy();
//       },
//       error => {
//         fail('Expected successful login');
//       }
//     );

//     const req = httpMock.expectOne('http://localhost:8080/login');
//     expect(req.request.method).toBe('POST');
//     req.flush({});
//   });

//   it('should logout user', () => {
//     spyOn(router, 'navigate');
//     service.logout();
//     expect(localStorage.getItem('currentUser')).toBeFalsy();
//     expect(router.navigate).toHaveBeenCalledWith(['/']);
//   });

//   it('should get user role from token', () => {
//     const token = 'sampleToken';
//     spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue({ role: 'USER' });
//     const role = service.getUserRole(token);
//     expect(role).toEqual('USER');
//   });
// });
