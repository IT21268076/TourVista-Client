import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})

export class HotelService {
  
  private backendUrl = environment.baseUrl; 

  constructor(private http: HttpClient) { }

  // getHotels(location: string, checkInDate: string, checkOutDate: string): Observable<any> {
  //   // Assuming your backend API endpoint to fetch hotels is /hotels and accepts parameters
  //   return this.http.get<any>(`${this.backendUrl}/hotel/search`, {
  //     params: {
  //       location: location,
  //       checkInDate: checkInDate,
  //       checkOutDate: checkOutDate,
  //        // Convert guests to string
  //     }
  //   });
  // }

  getHotels(location: string, checkInDate: string, checkOutDate: string): Observable<any> {
    // Define query parameters
    let params = new HttpParams();
    params = params.append('location', location);
    params = params.append('checkInDate', checkInDate);
    params = params.append('checkOutDate', checkOutDate);

    // Make HTTP GET request to fetch hotels
    return this.http.get<any>(`${this.backendUrl}/hotel/search`, { params });
  }

  getHotelDetails(hotelId: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/hotel/${hotelId}`);
  }

  getRoomTypesAndPrices(hotelId: string, checkInDate: string, checkOutDate: string, noOfGuests: number, roomCount: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/roomType`, {
      params: {
        hotelId: hotelId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        noOfGuests: noOfGuests,
        roomCount: roomCount
      }
    });
  }

  getAllRoomTypesAndPrices(hotelId: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/roomType`, {
      params: {
        hotelId: hotelId
      }
    });
  }

  addHotel(hotelData: any): Observable<any> {
    console.log(hotelData);
    return this.http.post<any>(`${this.backendUrl}/hotel/create`, hotelData);
  }

  getAllHotels(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/hotel`);
  }

  editHotel(hotelId: any, hotelData: any): Observable<any> {
      return this.http.put<any>(`${this.backendUrl}/hotel/${hotelId}`, hotelData);
  }

  deleteHotel(hotelId: any) {
    return this.http.delete<any>(`${this.backendUrl}/hotel/${hotelId}`)
  }
}
