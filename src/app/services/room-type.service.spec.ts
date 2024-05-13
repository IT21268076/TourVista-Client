import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomTypeService } from './room-type.service';
import { environment } from 'src/environment';

describe('RoomTypeService', () => {
  let service: RoomTypeService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomTypeService]
    });
    service = TestBed.inject(RoomTypeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch room type by season ID and room type ID', () => {
    const seasonId = '123';
    const roomTypeId = '456';
    const dummyResponse = true;

    service.getRoomTypeBySeasonAndId(seasonId, roomTypeId).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/roomType/${seasonId}/${roomTypeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  // it('should fetch price by room type ID', () => {
  //   const roomTypeId = '456';
  //   const dummyResponse = { price: 10 };

  //   service.getPriceByRoomType(roomTypeId).subscribe(response => {
  //     expect(response).toEqual(dummyResponse);
  //   });

  //   const req = httpMock.expectOne(`${baseUrl}/roomType/${roomTypeId}`);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(dummyResponse);
  // });
});
