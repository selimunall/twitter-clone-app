import {
  Component,
  HostListener,
  OnInit,
  Signal,
  effect,
  signal,
} from '@angular/core';
import { tweet } from 'src/app/interfaces/tweet.interface';
import { AuthService } from 'src/services/auth.service';
import { TweetService } from 'src/services/tweet.service';
import { formatDistance, formatISO, parseISO } from 'date-fns';
import * as dayjs from 'dayjs';
import { Subject, fromEvent, takeUntil } from 'rxjs';

@Component({
  selector: 'flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css'],
})
export class FlowComponent implements OnInit {
  prfimage: string;
  user: any;
  username: any;
  tweets = [];
  content: any;

  constructor(
    private authservice: AuthService,
    private tweetservice: TweetService
  ) {
    if (this.authservice.getmessage().photoURL.length > 1) {
      this.prfimage = this.authservice.getmessage().photoURL;
    } else {
      this.prfimage = '../../assets/img/6859343.png';
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    this.username = JSON.parse(localStorage.getItem('username'));
    this.fun();
  }
  ngOnInit(): void {}

  async fun() {
    let now = new Date();
    this.tweetservice.GetTweets();
    effect(() => {
      //we use to signal
      const snapshot = this.tweetservice.tweets();
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

  CreateTweet() {
    let tweet = {
      content: this.content,
      likedBy: [],
      retweetBy: [],
      commentedBy: [],
      createdAt: formatISO(new Date()),
      by: {
        id: this.user.uid,
        name: this.user.displayName || this.user.email || '',
        username: this.username.username,
        profileURL: this.user.photoURL || '',
      },
    };
    this.tweetservice.CreateNewTweet(tweet);
    this.content = '';
    this.fun();
  }

  Retweet() {
    console.log('retweet');
  }
  Like(twe) {
    this.tweetservice.onlike(twe);
  }

  Commit() {
    console.log('commit');
  }
}
