import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  tweets = [];

  constructor(private authservice: AuthService) {}
  LoginIn() {}
  
  LoginWithGoogle() {
    this.authservice.GoogleAuth();
  }
}
