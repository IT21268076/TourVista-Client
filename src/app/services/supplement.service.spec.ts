import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SupplementService } from './supplement.service';
import { environment } from 'src/environment';

describe('SupplementService', () => {
  let service: SupplementService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplementService]
    });
    service = TestBed.inject(SupplementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch supplement by season ID and supplement ID', () => {
    const seasonId = '123';
    const supplementId = '456';
    const dummyResponse = true;

    service.getSupplementBySeasonAndId(seasonId, supplementId).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/supplements/${seasonId}/${supplementId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should fetch price by supplement ID', () => {
    const supplementId = '456';
    const dummyResponse = { price: 10 };

    service.getPriceBySupplement(supplementId).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/supplements/${supplementId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should handle error when fetching supplement by season ID and supplement ID', () => {
    const seasonId = '123';
    const supplementId = '456';
    const errorMessage = '404 Not Found';

    service.getSupplementBySeasonAndId(seasonId, supplementId).subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err.status).toEqual(404);
        expect(err.error).toEqual(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${baseUrl}/supplements/${seasonId}/${supplementId}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should handle error when fetching price by supplement ID', () => {
    const supplementId = '456';
    const errorMessage = '404 Not Found';

    service.getPriceBySupplement(supplementId).subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err.status).toEqual(404);
        expect(err.error).toEqual(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${baseUrl}/supplements/${supplementId}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
