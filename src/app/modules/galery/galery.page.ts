import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.page.html',
  styleUrls: ['./galery.page.scss'],
})
export class GaleryPage implements OnInit {

  images:any[]=[];
  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection('images').valueChanges()
    .subscribe((images)=>{
      this.images=<any[]>images;
      console.log(this.images);
    })
  }

}
