import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
  image: string;
  constructor(private authservices: AuthService) {
    console.log(this.authservices.getmessage().photoURL.length);
    if (this.authservices.getmessage().photoURL.length > 1) {
      this.image = this.authservices.getmessage().photoURL;
    } else {
      this.image = '../../assets/img/6859343.png';
    }
  }

  LogOut() {
    this.authservices.SignOut();
  }
}
