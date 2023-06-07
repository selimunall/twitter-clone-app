import { Injectable, signal } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { addDoc, collection, getFirestore } from '@angular/fire/firestore';
import { add } from 'date-fns';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getmessage = signal<any>(0);
  gecicikullanici: any;
  usernames = [];
  username = signal<any>(0);
  uid: any;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}

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
        this.gecicikullanici = result.user;
        this.uid = result.user.uid;
        localStorage.setItem('user', JSON.stringify(result.user));
      })
      .then(() => {
        let control = false;
        let aa = '';
        for (let s of this.usernames) {
          if (s.userUid == this.gecicikullanici.uid) {
            control = true;
            aa = s;
          }
        }

        if (control == true) {
          this.username.set(aa);
          localStorage.setItem('username', JSON.stringify(aa));
          this.router.navigate(['user']);
        } else {
          let cc = prompt('Please enter your user name:', '@');
          if (cc == '' || cc == '@') {
            alert('Please input your user name!');
            return;
          }
          console.log('b');
          // this.fonksiyon(cc)
          this.username.set({
            userUid: this.uid,
            username: cc,
          });
          addDoc(collection(getFirestore(), 'users'), {
            userUid: this.uid,
            username: cc,
          });
          localStorage.setItem(
            'username',
            JSON.stringify({
              userUid: this.uid,
              username: cc,
            })
          );
        }
        this.router.navigate(['user']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Login with Email and Password
  SignIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {});
  }

  // Register user with email/password
  RegisterUser(email, password, username) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.getmessage.set(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem(
          'username',
          JSON.stringify({
            userUid: result.user.uid,
            username: username,
          })
        );
        this.router.navigate(['user']);
      });
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
  SetUser() {
    addDoc(collection(getFirestore(), 'users'), this.username);
  }

  GetUsers() {
    this.db
      .collection('users')
      .get()
      .forEach((a) => {
        a.docs.map((s) => {
          this.usernames.push(s.data());
        });
      });
  }
}
