import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'; 
import { Router } from '@angular/router'; // To navigate after logout

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: false
})
export class Header {

  constructor(private authService: AuthService, private router: Router) { }

  onLogout(): void {
    this.authService.logout();
    // Redirect to login page after logout
    this.router.navigate(['/login']); // Assuming you'll have a /login route
  }
}