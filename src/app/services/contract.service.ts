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
}
