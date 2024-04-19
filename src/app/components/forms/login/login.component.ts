import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IntendedRouteService } from 'src/app/services/intended-route.service';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent {
 username!: string;
 password!: string;
 errorMessage: string | null = null;

 constructor(private authService: AuthService, private router: Router, private intendedRouteService: IntendedRouteService) {}

//  login() {
//   this.authService.login(this.username, this.password).subscribe(
//     data => {
//       const token = data.token; // Assuming the response includes the token
//       const role = this.authService.getUserRole(token);
//       if (role === 'ADMIN') {
//         // Redirect to admin dashboard
//         this.router.navigate(['/admin-dashboard']);
//       } else if (role === 'USER') {
//         // Redirect to user dashboard
//         this.router.navigate(['/']);
//       } else {
//         // Handle unexpected role
//         this.errorMessage = 'Unexpected user role';
//       }
//     },
//     error => {
//       // Handle login error
//       this.errorMessage = 'Invalid username or password';
//     }
//   );
// }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        const token = data.token; // Assuming the response includes the token
        const role = this.authService.getUserRole(token);

        if (role === 'ADMIN') {
          // Redirect to admin dashboard
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'USER') {
          // Redirect to user dashboard or intended route
          const intendedRoute = this.intendedRouteService.getIntendedRoute();
          console.log(intendedRoute);
          if (intendedRoute) {
            this.router.navigate([intendedRoute]);
            this.intendedRouteService.clearIntendedRoute(); // Clear the intended route after login
            console.log("intended" + intendedRoute)
          } else {
            this.router.navigate(['/']);
          }
        } else {
          // Handle unexpected role
          this.errorMessage = 'Unexpected user role';
        }
      },
      error => {
        // Handle login error
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

}
