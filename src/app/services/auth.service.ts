import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  createNewUser(username: string, email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            firebase.auth().onAuthStateChanged(function(user) {
              user.updateProfile({ 
                displayName: username,
              }).then(function() {
                console.log(user.displayName);
              }, function(error) {
                console.log(error);
              });  
          });
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  signOutUser() {
    firebase.auth().signOut();
  }
}
