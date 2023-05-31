import { Component, OnInit, Signal, effect, signal } from '@angular/core';
import { tweet } from 'src/app/interfaces/tweet.interface';
import { AuthService } from 'src/services/auth.service';
import { TweetService } from 'src/services/tweet.service';
import { formatDistance, formatISO, parseISO } from 'date-fns';

@Component({
  selector: 'flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css'],
})
export class FlowComponent implements OnInit {
  prfimage: string;
  signaltweets: Signal<[]>;
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
    this.tweetservice.GetTweets(this.user);
  }
  ngOnInit(): void {}

  fun() {
    this.tweetservice.GetTweets(this.user);
    effect(() => {
      this.tweets = [];
      this.tweetservice.tweets().map((w) => {
        this.tweets.push(w.data());
        console.log(w.id);
      });
    });
  }

  CreateTweet(form: any) {
    // console.log(this.tweets[0]);
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
    this.tweets.unshift(tweet);
    this.fun();
  }

  Retweet() {
    console.log('retweet');
  }
  Like(twe: any) {
    console.log(twe);
  }
  Commit() {
    console.log('commit');
  }
  // get zeetCreatedAt(): string {
  //   return formatDistance(parseISO(this.tweets[0].createdAt), new Date());
  // }
}
