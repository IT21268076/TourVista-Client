import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

// Define an interface for search results (replace with your actual data structure)
interface SearchResult {
  // ... relevant properties for search results (e.g., hotel name, price, etc.)
}

@Injectable({
  providedIn: 'root' // Consider providing the service in a more appropriate scope if needed
})
export class SearchService {
  private backendUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  search(location: string, checkInDate: Date, checkOutDate: Date): Observable<SearchResult[]> {
    const queryParams = {
      location,
      checkInDate: checkInDate.toISOString(), // Convert Date to ISO string for API compatibility
      checkOutDate: checkOutDate.toISOString()
    };

    return this.http.get<SearchResult[]>(this.backendUrl, { params: queryParams });
  }
}
