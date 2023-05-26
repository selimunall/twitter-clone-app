import { Component, Signal } from '@angular/core';
import { tweet } from 'src/app/interfaces/tweet.interface';
import { CreateTweet } from 'src/services/tweet-c.service';

@Component({
  selector: 'flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css'],
})
export class FlowComponent {
  signaltweets: Signal<[]>;
  tweets?: Array<tweet> | null = [];
  tweet: tweet = {
    id: '1',
    content: '',
    likedBy: [],
    retweetBy: [],
    commentedBy: [],
    createdAt: '',
    by: {
      id: '2',
      name: '2',
      username: '2',
      profileURL: '2',
    },
  };
  constructor(private tweetService: CreateTweet) {}

  CreateTweet(form: any) {
    // this.tweetService.createTweet(this.tweet);
    // console.log(this.tweets[0]);

    console.log(form.value);
  }

  Retweet() {
    console.log('retweet');
  }
  Like() {
    console.log('like');
  }
  Commit() {
    console.log('commit');
  }
}
