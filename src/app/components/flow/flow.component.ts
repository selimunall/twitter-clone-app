import { Component, Signal, effect, signal } from '@angular/core';
import { tweet } from 'src/app/interfaces/tweet.interface';
import { AuthService } from 'src/services/auth.service';
import { TweetService } from 'src/services/tweet.service';
import { formatDistance, formatISO, parseISO } from 'date-fns';

@Component({
  selector: 'flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css'],
})
export class FlowComponent {
  prfimage: string;
  signaltweets: Signal<[]>;
  user: any;
  username: any;
  tweets = [];

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
    this.tweetservice.GetTweets();
    effect(() => {
      if (this.tweetservice.tweets().length > 1) {
        this.tweetservice.tweets().map((a) => {
          this.tweets.push(a.data());
          // console.log(a.data());
        });
      }
    });
  }

  CreateTweet(form: any) {
    // console.log(this.tweets[0]);
    let tweet = {
      content: form.value.content,
      likedBy: [],
      retweetBy: [],
      commentedBy: [],
      createdAt: formatISO(new Date()),
      by: {
        id: this.user.uid,
        name: this.user.displayName || this.user.email || '',
        username: this.username,
        profileURL: this.user.photoURL || '',
      },
    };
    this.tweetservice.CreateNewTweet(tweet);
    form.content = '';
    this.tweets.unshift(tweet);
  }

  Retweet() {
    console.log('retweet');
  }
  Like(twe: any) {
    // this.tweetservice.onZeetLike()
    console.log(twe);
  }
  Commit() {
    console.log('commit');
  }
  // get zeetCreatedAt(): string {
  //   return formatDistance(parseISO(this.tweets[0].createdAt), new Date());
  // }
}
