import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-status',
  standalone: false,
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string | undefined;


  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      (result) => {
        this.isAuthenticated = result;
        console.log('user logged in')
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {
    if (this.authService.user$) {
      this.authService.user$.subscribe(
        (result) => {
          this.userFullName = result?.given_name;
          console.log
        }
      )
    }
  }

}
