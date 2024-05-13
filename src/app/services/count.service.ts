import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  private apiUrlHotel = 'http://localhost:8080/api/hotel/hotelCount'; 
  private apiUrlContract = 'http://localhost:8080/api/contract/contractCount'; 

  constructor(private http: HttpClient) {}

  getHotelCount(): Observable<any> {
    return this.http.get<any>(this.apiUrlHotel);
  }

  getContractCount(): Observable<any> {
    return this.http.get<any>(this.apiUrlContract);
  }
}
