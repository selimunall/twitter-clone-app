import { Component, OnInit, Signal, effect, signal } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { TweetService } from 'src/services/tweet.service';
import { formatISO } from 'date-fns';
import * as dayjs from 'dayjs';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

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
  content = '';
  showEmojiWindow = false;
  constructor(
    private authservice: AuthService,
    private tweetservice: TweetService
  ) {
    if (this.authservice.getmessage().photoURL) {
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
      let liked;
      if (snapshot) {
        snapshot?.forEach((doc) => {
          const { likedBy, createdAt, ...rest } = doc.data();
          const diff = dayjs(now).valueOf() - dayjs(createdAt).valueOf();
          const date = this.msToTime(diff);
          likedBy.includes(this.user.uid) ? (liked = true) : (liked = false);
          array.push({ liked, createdAt: date, likedBy, ...rest });
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

  Retweet(twe) {
    this.tweetservice.onRetweet(twe);
  }
  Like(twe) {
    this.tweetservice.onlike(twe);
  }
  handleClick($event) {
    console.log($event.emoji.native);
    this.content = this.content + $event.emoji.native;
  }
  showEmoji() {
    this.showEmojiWindow = !this.showEmojiWindow;
  }

  Commit(twe) {
    let comment = prompt('Please input your comment..');
    this.tweetservice.onComment(twe);
  }
}
