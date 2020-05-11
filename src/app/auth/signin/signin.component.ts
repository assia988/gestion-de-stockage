import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

ngOnInit() {
this.initForm();
}

initForm() {
this.signInForm = this.formBuilder.group({
email: ['', [Validators.required, Validators.email]],
password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
});
}

onSubmit() {
const email = this.signInForm.get('email').value;
const password = this.signInForm.get('password').value;

this.authService.signInUser(email, password).then(
() => {
this.router.navigate(['/books']);
},
(error) => {
this.errorMessage = error;
}
);
}
signInWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token.
    const credential = result.credential as firebase.auth.OAuthCredential;
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
   });
}
}
