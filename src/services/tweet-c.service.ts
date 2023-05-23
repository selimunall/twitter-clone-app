import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { tweet } from 'src/app/interfaces/tweet.interface';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyD_lWMrh8Idv14cgtkXEv9PeZzMeEr77eY',
  authDomain: 'twitter-clone-1dac8.firebaseapp.com',
  projectId: 'twitter-clone-1dac8',
  storageBucket: 'twitter-clone-1dac8.appspot.com',
  messagingSenderId: '524118653858',
  appId: '1:524118653858:web:e848b666590daf69f990fb',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class CreateTweet {
  async createTweet(tweet: tweet) {
    await setDoc(doc(db, 'tweets', 'one'), tweet);
  }
}
