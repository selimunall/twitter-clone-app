import { Injectable, effect, signal } from '@angular/core';
import { tweet } from 'src/app/interfaces/tweet.interface';
import {
  doc,
  getFirestore,
  setDoc,
  orderBy,
  updateDoc,
  onSnapshot,
  arrayUnion,
} from '@angular/fire/firestore';
import { DocumentChange, arrayRemove, limit } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(private db: AngularFirestore) {}
  tweets = signal<any>(0);
  user: any;
  tweets2 = [];
  schwrzeets: tweet[] = [];
  tt: any = [];

  async CreateNewTweet(tweet) {
    const newCityRef = doc(collection(getFirestore(), 'tweets'));
    const ref = { id: newCityRef.id };
    Object.assign(tweet, ref);
    await setDoc(newCityRef, tweet);
  }

  async GetTweets() {
    let array: Array<any> = [];
    effect(() => {
      const unsubscribe = onSnapshot(
        query(
          collection(getFirestore(), 'tweets'),
          orderBy('createdAt', 'desc'),
          limit(8)
        ),
        (a) => {
          this.tweets.set(a);
          a.forEach((doc) => {
            array.push(doc.data());
          });
        }
      );
      return () => {
        unsubscribe();
      };
    });
    return array;
  }

  async onlike(tweet) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    const likeDocRef = doc(getFirestore(), 'tweets', tweet.id);
    const isLiked = tweet.likedBy.includes(this.user.uid);

    updateDoc(likeDocRef, {
      likedBy: isLiked ? arrayRemove(this.user.uid) : arrayUnion(this.user.uid),
    });
  }

  async onRetweet(tweet) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    const retweetDocRef = doc(getFirestore(), 'tweets', tweet.id);
    const isRetweet = tweet.retweetBy.includes(this.user.uid);

    updateDoc(retweetDocRef, {
      retweetBy: isRetweet
        ? arrayRemove(this.user.uid)
        : arrayUnion(this.user.uid),
    });
  }
  async onComment(tweet) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    const commentDocRef = doc(getFirestore(), 'tweets', tweet.id);
    const isComment = tweet.commentedBy.includes(this.user.uid);

    updateDoc(commentDocRef, {
      commentedBy: arrayUnion(Math.random()),
    });
  }
}
