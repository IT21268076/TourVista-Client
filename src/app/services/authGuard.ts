import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        const currentUser = this.authService.currentUserValue;
        const token = localStorage.getItem('currentUser');

        if (currentUser && token) {
            const userRole = this.authService.getUserRole(token);
            // Extract the roles from the route's data
            const allowedRoles = route.data['roles'];
            // Check if the user's role is included in the allowed roles
            if (allowedRoles && allowedRoles.includes(userRole)) {
                // authorised so return true
                return true;
            }
        }

        // not logged in or not authorized so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
