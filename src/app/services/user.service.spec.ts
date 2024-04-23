import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from 'src/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user by ID', () => {
    const userId = '123';
    const dummyUser = { id: userId, name: 'John Doe' };

    service.getUserById(userId).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${baseUrl}/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should handle error when fetching user by ID', () => {
    const userId = '123';
    const errorMessage = '404 Not Found';

    service.getUserById(userId).subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err.status).toEqual(404);
        expect(err.error).toEqual(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${baseUrl}/user/${userId}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
