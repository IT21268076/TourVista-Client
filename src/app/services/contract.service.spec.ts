import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContractService } from './contract.service';
import { environment } from 'src/environment';

describe('ContractService', () => {
  let service: ContractService;
  let httpTestingController: HttpTestingController;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContractService]
    });
    service = TestBed.inject(ContractService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add contract', () => {
    const contractData = { /* your contract data */ };
    const mockResponse = { /* mocked response */ };

    service.addContract(contractData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/contract`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get contract by hotel', () => {
    const hotelId = 'hotel123';
    const mockResponse = { /* mocked response */ };

    service.getContractByHotel(hotelId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/contract/${hotelId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
