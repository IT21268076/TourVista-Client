import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem('currentUser');

        // Initialize currentUserSubject with null or the decoded user information
        // If you need to store user information, you might need to adjust this logic
        // For now, we're assuming you only need the token for authentication
        this.currentUserSubject = new BehaviorSubject<any>(null);
        this.currentUser = this.currentUserSubject.asObservable();

        // If a token is present, you can decode it to get user information if needed
        if (token) {
            const decodedToken = this.getUserRole(token);
            // Assuming getUserRole returns the user role, you might want to adjust this
            // to return user information or handle the token as needed
            console.log('Decoded token:', decodedToken);
        }
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:8080/login`, { username, password })
            .pipe(map(user => {
                // Store only the JWT token in local storage
                localStorage.setItem('currentUser', user.token);
                // Optionally, update the currentUserSubject with user information
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // Remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getUserRole(token: string): string {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        return decodedToken.role;
    }
}
