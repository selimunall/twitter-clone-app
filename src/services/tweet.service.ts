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
import { Observable, delay, map } from 'rxjs';
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
    // addDoc(collection(getFirestore(), 'tweets'), tweet);
    const newCityRef = doc(collection(getFirestore(), 'tweets'));
    await setDoc(newCityRef, tweet);
  }

  async GetTweets(user) {
    // collectionChanges(
    //   query(collection(getFirestore(), 'tweets'), orderBy('createdAt', 'desc'))
    // ).forEach((gelenveri) => {
    //   console.log(gelenveri);
    //   this.tweets.set(gelenveri);
    // });
    getDocs(
      query(collection(getFirestore(), 'tweets'), orderBy('createdAt', 'desc'))
    ).then((result) => {
      result.docs.map((s) => console.log(s.data()));
      this.tweets.set(result.docs);
    });
  }

  async onZeetLike(zeet) {
    this.user = JSON.parse(localStorage.getItem('user'));
    const likeDocRef = doc(
      getFirestore(),
      `tweets/${zeet.id}/likes/${this.user.uid}`
    );
    const document = await getDoc(likeDocRef);
    const docExists = document.exists();
    if (docExists) {
      zeet.likedBy = zeet.likedBy.filter((id) => id !== this.user.uid);
      zeet.liked = false;
      await deleteDoc(likeDocRef);
    } else {
      zeet.likedBy.push(this.user.uid);
      zeet.liked = true;
      await setDoc(likeDocRef, {
        id: this.user.Uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
      });
    }
    const docRef = doc(getFirestore(), `tweets/${zeet.id}`);
    const { liked, commented, ...updatedZeet } = zeet;
    updateDoc(docRef, {
      ...updatedZeet,
    });
  }

  onZeetSnapshot(change: DocumentChange<any>, user) {
    const data = change.doc.data();
    switch (change.type) {
      case 'added':
        const zeet = {
          ...data,
          id: change.doc.id,
          liked: !!user && !!data.likedBy.includes(user.uid),
        };
        this.schwrzeets.splice(change.newIndex, 0, zeet);
        break;
      case 'removed':
        this.schwrzeets.splice(change.oldIndex, 1);
        break;
      case 'modified':
        if (change.newIndex === change.oldIndex) {
          this.schwrzeets[change.oldIndex] = {
            ...data,
            id: change.doc.id,
            liked: !!user && !!data.likedBy.includes(user.uid),
          };
        } else {
          this.schwrzeets.splice(change.oldIndex, 1);
          this.schwrzeets.splice(change.newIndex, 0, {
            ...data,
            id: change.doc.id,
            liked: !!user && !!data.likedBy.includes(user.uid),
          });
        }
        break;
    }
  }
}
