import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  
  private backendUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addContract(contractData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/contract`, contractData);
  }

  getContractByHotel(hotelId: any) : Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/contract/hotel/${hotelId}`);
  }

  getContractById(contractId : any) : Observable<any>{
    return this.http.get<any>(`${this.backendUrl}/contract/${contractId}`);
  }

  updateContract(contractId: number, contractData: any): Observable<any> {
    return this.http.put<any>(`${this.backendUrl}/contract/${contractId}`, contractData);
  }

  deleteContract(contractId: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/contract/${contractId}`);
  }

}
