import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public auth:AngularFireAuth,private firestore: AngularFirestore,
              private navCtrl:NavController, private router:Router,private storage: Storage
              ) { }

  token: any[] = [];
  user = {
    email:'',
    password:''
  }
  EP:boolean=null;
  authenticationState = new BehaviorSubject(false);

  ngOnInit() {
    
  }

  loginMetod(bandera){
    this.EP=bandera;
  }

  onSubmit(){
    console.log('Form-Submit');
    this.loginEmailPassword(this.user.email,this.user.password);
  }

  loginGoogle() {
    this.loginMetod(false);
    this.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then((result) => {
        console.log(result.user.displayName);
        this.storage.set('username',result.user.displayName);
        this.storage.set('email',result.user.email);
        this.storage.set('phone',result.user.phoneNumber);
        this.router.navigate(['/folder/galery']);
        this.firestore.collection('users').doc(result.user.uid)
        .set({
          name:result.user.displayName,
          email:result.user.email,
          phoneNumber:result.user.phoneNumber
        })
        console.log(result);
        console.log("Document successfully written!");
    }).catch(function(error) {
      console.error("Error writing document: ", error);
    });  
  }
  
  loginEmailPassword(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log(user);
    })
    .catch((error)=>{
      console.log(error);
    })
    this.router.navigate(['/folder/galery']);
  }

  logout() {
    this.auth.signOut();
  //  this.storageService.logout();
  }

  Landing(){
    this.router.navigate(['']);
  }
  Menu(){
    this.router.navigate(['/folder/galery']);
  }

}
