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
    const contractData =  
      {
        "startDate": "2023-04-01",
        "endDate": "2025-04-10",
        "prepaymentPercentage": 20.0,
        "cancellationFee": 50.0,
        "noOfBalancePaymentDates": 2,
        "noOfDatesOfCancellation": 3,
        "hotel": {
          "hotelId": 2
        },
        "discounts": [
          {
            "name": "Discount A",
            "amount": 10,
            "description": "Description for Discount A",
            "startDate": "2024-01-05",
            "endDate": "2024-02-01"
          },
          {
            "name": "Discount B",
            "amount": 20,
            "description": "Description for Discount B",
            "startDate": "2024-02-05",
            "endDate": "2024-02-15"
          }
        ],
        "seasons": [
          {
            "seasonName": "Summer",
            "startDate": "2024-08-31",
            "endDate": "2024-12-31",
            "markUpPercentage": 5,
            "roomTypes": [
              {
                "type": "Deluxe",
                "availability": "UNAVAILABLE",
                "maxNoOfGuests": 4,
                "roomSeasonPrices": [
                  {
                    "price": 150
                  },
                  {
                    "price": 180
                  }
                ]
              }
            ],
            "supplements": [
              {
                "name": "Supplement C",
                "description": "Description for Supplement A",
                "supplementsSeasonPrices": [
                  {
                    "price": 10000
                  }
                ]
              },
              {
                "name": "Supplement D",
                "description": "Description for Supplement B",
                "supplementsSeasonPrices": [
                  {
                    "price": 10000
                  }
                ]
              }
            ]
          },
          {
            "seasonName": "Spring",
            "startDate": "2024-01-31",
            "endDate": "2024-07-31",
            "markUpPercentage": 5,
            "roomTypes": [
              {
                "type": "Standard",
                "availability": "UNAVAILABLE",
                "maxNoOfGuests": 4,
                "roomSeasonPrices": [
                  {
                    "price": 150
                  }
                ]
              }
            ],
            "supplements": [
              {
                "name": "Supplement E",
                "description": "Description for Supplement E",
                "supplementsSeasonPrices": [
                  {
                    "price": 1000
                  }
                ]
              },
              {
                "name": "Supplement F",
                "description": "Description for Supplement F",
                "supplementsSeasonPrices": [
                  {
                    "price": 100
                  }
                ]
              }
            ]
          }
        ]
      
      };

    const mockResponse = {};

    service.addContract(contractData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/contract`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get contract by hotel', () => {
    const hotelId = 'hotel123';
    const mockResponse = {};

    service.getContractByHotel(hotelId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/contract/${hotelId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
