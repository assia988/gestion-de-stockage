import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
  private router: Router) { }

ngOnInit() {
this.initForm();
}

initForm() {
  var user = firebase.auth().currentUser;
  var username, email;
if (user != null) {
  username = user.displayName;
  email = user.email;  
}
  this.signupForm = this.formBuilder.group({
  username: [username, [Validators.required]],
  email: [email, [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
});
}
onSubmit() {
  const username = this.signupForm.get('username').value; 
  const email = this.signupForm.get('email').value;
  const password = this.signupForm.get('password').value;

  const user = firebase.auth().currentUser;
  user.updateProfile({
  displayName: username,
  }).then(function() {
  // Update successful.
  // console.log('User Profile Updated Successfully');
  }).catch(function(error) {
  // An error happened.
  });

  user.updateEmail(email).then(function() {
    // console.log('email Profile Updated Successfully');
    // Update successful.
    user.updatePassword(password).then(function() {
      // console.log('password Profile Updated Successfully');
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    }); 
  }).catch(function(error) {
    // An error happened.
  });

  
 }
}
