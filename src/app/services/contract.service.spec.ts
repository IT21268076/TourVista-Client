import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContractService } from './contract.service';
import { environment } from 'src/environment';

describe('ContractService', () => {
  let service: ContractService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContractService]
    });
    service = TestBed.inject(ContractService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add contract', () => {
    const contractData = { /* Your contract data here */ };
    const dummyResponse = { /* Your response data here */ };

    service.addContract(contractData).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/contract`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(contractData);
    req.flush(dummyResponse);
  });

  it('should get contract by hotel ID', () => {
    const hotelId = '123';
    const dummyResponse = { /* Your response data here */ };

    service.getContractByHotel(hotelId).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/contract/hotel/${hotelId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should get contract by ID', () => {
    const contractId = '456';
    const dummyResponse = { /* Your response data here */ };

    service.getContractById(contractId).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/contract/${contractId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should update contract', () => {
    const contractId = 123;
    const contractData = { /* Your updated contract data here */ };
    const dummyResponse = { /* Your response data here */ };

    service.updateContract(contractId, contractData).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/contract/${contractId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(contractData);
    req.flush(dummyResponse);
  });

  it('should delete contract', () => {
    const contractId = 123;
    const dummyResponse = { /* Your response data here */ };

    service.deleteContract(contractId).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/contract/${contractId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
});
