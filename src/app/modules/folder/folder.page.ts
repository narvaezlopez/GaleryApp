import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginPage } from '../login/login.page';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  rootPage=LoginPage;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Galery',
      url: '/folder/galery',
      icon: 'images'
    },
    {
      title: 'List of Tasks',
      url: '/folder/works',
      icon: 'list-circle'
    },
    {
      title: 'Contact',
      url: '/folder/contactform',
      icon: 'help'
    },
    {
      title: 'Map',
      url: '/folder/map',
      icon: 'map'
    },
    {
      title: 'Chat',
      url: '/folder/chat',
      icon: 'chatbubble-ellipses'
    }
  ];
  user:string;
  constructor(private activatedRoute: ActivatedRoute, private storage: Storage) { }

  ngOnInit() {

    this.storage.get('username').then((data)=>{
     this.user=data;
    }).catch((error)=>{
      console.log(error);
    })
  }

}
