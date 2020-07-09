import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  user:string="";
  chat={
    user:"",
    message:"",
    date:"",
  }
  chatRef:any;
  constructor(public auth:AngularFireAuth,private firestore:AngularFirestore, private storage: Storage) { 
    this.chatRef=this.firestore.collection('chat').valueChanges();
  }

  ngOnInit() {
    
    
  }
  send(){
      this.storage.get('username').then((data)=>{
        this.firestore.collection('chat').add({
          name:data,
          message:this.chat.message,
          date:new Date()
        })
        this.chat.message="";
      }).catch((error)=>{
        console.log(error);
      })
     
  }

}
