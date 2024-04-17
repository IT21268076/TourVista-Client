import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplementService {

  private backendUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSupplementBySeasonAndId(seasonId: any, supplementId: any): Observable<boolean> {
    return this.http.get<boolean>(`${this.backendUrl}/supplements/${seasonId}/${supplementId}`);
  }

  getPriceBySupplement(supplementId: any): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/supplements/${supplementId}`);
  }
}
