import { Injectable, signal } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { addDoc, collection, getFirestore } from '@angular/fire/firestore';
import { add } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getmessage = signal<any>(0);
  usernames: any = [
    {
      name: 'ali',
      usernn: '@aliveli',
    },
    {
      name: 'selim',
      usernn: '@selimunll',
    },
  ];
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  //Login with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
        this.getmessage.set(result.user);
        console.log(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
      })
      .then(() => {
        let username = prompt('Please enter your user name:', '@');
        this.usernames.push(username);
        localStorage.setItem('username', JSON.stringify(username));
      })
      .then(() => {
        for (let a of this.usernames) {
          if (a.name == 'selim') {
            console.log(a.name);
          }
        }
        this.router.navigate(['user']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Login with Email and Password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Sign-out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      this.router.navigate(['login']);
    });
  }

  //set and get users
  setuser() {
    // addDoc(collection(getFirestore(), 'users'), this.username);
  }
}
