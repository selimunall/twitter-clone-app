import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'twitter-clone';
  constructor(private router: Router, private authservice: AuthService) {
    let user = signal(JSON.parse(localStorage.getItem('user')));
    // let username = signal(JSON.parse(localStorage.getItem('username')));
    if (user()) {
      this.authservice.getmessage.set(JSON.parse(localStorage.getItem('user')));
      console.log('Useri aldik');
      this.router.navigate(['user']);
    } else {
      console.log('User yok');
      this.router.navigate(['login']);
    }
    this.authservice.GetUsers();
  }
}
