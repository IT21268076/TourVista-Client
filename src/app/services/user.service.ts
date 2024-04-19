import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUserById(userId: any): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/user/${userId}`);
  }

}
