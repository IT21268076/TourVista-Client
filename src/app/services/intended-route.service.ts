// intended-route.service.ts
import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class IntendedRouteService {
 private intendedRoute: string | null = null;

 setIntendedRoute(route: string): void {
    this.intendedRoute = route;
    console.log("full url" + this.intendedRoute)
 }

 getIntendedRoute(): string | null {
    return this.intendedRoute;
 }

 clearIntendedRoute(): void {
    this.intendedRoute = null;
    console.log("clear intended"+this.intendedRoute)
 }
}
