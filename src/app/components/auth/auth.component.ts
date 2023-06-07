import { Component, effect } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PopUpSignComponent } from '../pop-up-sign/pop-up-sign.component';
import { PopUpCreateComponent } from '../pop-up-create/pop-up-create.component';
import { TweetService } from 'src/services/tweet.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  tweets = [];
  constructor(
    private authservice: AuthService,
    private dialog: MatDialog,
    private tweetServices: TweetService
  ) {
    this.fun();
  }

  async fun() {
    let now = new Date();
    this.tweetServices.GetTweets();
    effect(() => {
      //we use to signal
      const snapshot = this.tweetServices.tweets();
      let array = [];
      if (snapshot) {
        snapshot?.forEach((doc) => {
          const { createdAt, ...rest } = doc.data();
          const diff = dayjs(now).valueOf() - dayjs(createdAt).valueOf();
          const date = this.msToTime(diff);
          array.push({ createdAt: date, ...rest });
        });
      }
      this.tweets = array;
    });
  }

  msToTime(ms) {
    let seconds = Math.round(ms / 1000);
    let minutes = Math.round(ms / (1000 * 60));
    let hours = Math.round(ms / (1000 * 60 * 60));
    let days = Math.round(ms / (1000 * 60 * 60 * 24));
    if (seconds < 60) return seconds + 's';
    else if (minutes < 60) return minutes + 'm';
    else if (hours < 24) return hours + 'h';
    else return days + 'd';
  }
  loginIn() {
    this.dialog.open(PopUpSignComponent);
  }

  LoginWithGoogle() {
    this.authservice.GoogleAuth();
  }

  signUp() {
    this.dialog.open(PopUpCreateComponent);
  }
}
