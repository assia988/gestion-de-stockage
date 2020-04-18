import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyAZjgkK8vmCyWlIirZghOSyhm7hKWxtsAo",
      authDomain: "fir-proj-9d7c8.firebaseapp.com",
      databaseURL: "https://fir-proj-9d7c8.firebaseio.com",
      projectId: "fir-proj-9d7c8",
      storageBucket: "fir-proj-9d7c8.appspot.com",
      messagingSenderId: "694482879221",
      appId: "1:694482879221:web:9acfe7cd4205fdf6cebbbc",
      measurementId: "G-2R5K2KYVE2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
