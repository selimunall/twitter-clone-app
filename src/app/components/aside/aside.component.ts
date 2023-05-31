import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
  image: string;
  username: string;
  name: string;
  constructor(private authservices: AuthService) {
    if (this.authservices.getmessage().photoURL.length > 1) {
      this.image = this.authservices.getmessage().photoURL;
    } else {
      this.image = '../../assets/img/6859343.png';
    }
    this.username = JSON.parse(localStorage.getItem('username')).username;
    this.name = this.authservices.getmessage().displayName;
  }

  LogOut() {
    this.authservices.SignOut();
  }
}
