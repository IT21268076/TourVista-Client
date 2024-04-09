import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent {
 username!: string;
 password!: string;
 errorMessage: string | null = null;

 constructor(private authService: AuthService, private router: Router) {}

 login() {
  this.authService.login(this.username, this.password).subscribe(
    data => {
      const token = data.token; // Assuming the response includes the token
      const role = this.authService.getUserRole(token);
      if (role === 'ADMIN') {
        // Redirect to admin dashboard
        this.router.navigate(['/admin-dashboard']);
      } else if (role === 'USER') {
        // Redirect to user dashboard
        this.router.navigate(['/']);
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
