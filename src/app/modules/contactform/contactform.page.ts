import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.page.html',
  styleUrls: ['./contactform.page.scss'],
})
export class ContactformPage implements OnInit {

  petition={
    username:"",
    userlastname:"",
    email:"",
    phone:"",
    message:""
  }
  constructor(private firestore:AngularFirestore, private toast:ToastController) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("you have send a petition");
    this.addPetition(this.petition.username,this.petition.userlastname,
          this.petition.email,this.petition.phone,this.petition.message);
  }

  async addPetition(username:string,userlastname:string,email:string,phone:string,message:string){
    this.firestore.collection('petitions').doc(email)
    .set({
        username:username,
        userlastname:userlastname,
        email:email,
        phone:phone,
        message:message
    })
    const toast = await this.toast.create({
      duration:3000,
      header:'Petition Send!',
      position:'bottom',
      message: 'Thanks :D',
    });
    toast.present();
    this.petition={
      username:"",
      userlastname:"",
      email:"",
      phone:"",
      message:""
    }

  }
}
