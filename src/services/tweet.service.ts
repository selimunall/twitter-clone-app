import { Injectable, Signal, computed, effect, signal } from '@angular/core';
import { tweet } from 'src/app/interfaces/tweet.interface';
import {
  addDoc,
  collectionChanges,
  doc,
  getFirestore,
  CollectionReference,
  setDoc,
  orderBy,
  getDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { DocumentChange, limit } from 'firebase/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, delay } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(private db: AngularFirestore) {}
  tweets = signal<any>(0);
  schwrzeets: tweet[] = [];

  CreateNewTweet(tweet) {
    addDoc(collection(getFirestore(), 'tweets'), tweet);
  }

  GetTweets() {
    this.db
      .collection('tweets')
      .get()
      .forEach((a) => {
        this.tweets.set(a.docs);
      });
  }

  async onZeetLike(tweet: any, user) {
    if (!user) {
      return;
    }
    const likeDocRef = doc(
      getFirestore(),
      `tweets/${tweet.id}/likes/${user.uid}`
    );
    const document = await getDoc(likeDocRef);
    const docExists = document.exists();
    if (docExists) {
      tweet.likedBy = tweet.likedBy.filter((id) => id !== user.uid);
      tweet.liked = false;
      await deleteDoc(likeDocRef);
    } else {
      tweet.likedBy.push(user.uid);
      tweet.liked = true;
      await setDoc(likeDocRef, {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    }
    const docRef = doc(getFirestore(), `zeets/${tweet.id}`);
    const { liked, commented, ...updatedZeet } = tweet;
    updateDoc(docRef, {
      ...updatedZeet,
    });
  }
}
