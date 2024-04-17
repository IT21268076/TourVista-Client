import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  private backendUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getRoomTypeBySeasonAndId(seasonId: any, roomTypeId: any): Observable<boolean> {
    return this.http.get<boolean>(`${this.backendUrl}/roomType/${seasonId}/${roomTypeId}`);
   }

  getPriceByRoomType(roomTypeId: any): Observable<any>{
    return this.http.get<any>(`${this.backendUrl}/roomType/${roomTypeId}`);
  }
   
}
