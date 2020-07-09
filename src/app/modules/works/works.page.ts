import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-works',
  templateUrl: './works.page.html',
  styleUrls: ['./works.page.scss'],
})
export class WorksPage implements OnInit {

  tasks:any[]=[];
  x:boolean=false;
  task = {
    name:'',
    desc:'',
    latitude:'',
    longitude:'',
    accuracy:'',
    state:false
  }
  latitude:string;
  longitude:string;
  accuracy:string;

  constructor(private firestore:AngularFirestore, private alert: AlertController, private toast:ToastController,
              private geolocation: Geolocation, private instancia:ActionSheetController) { }

  ngOnInit() {
      this.firestore.collection('tasks').valueChanges()
      .subscribe((tasks)=>{
        this.tasks=<any[]>tasks;
        console.log(tasks);
      })
    }

  async mostrarUbi(lat, long, accuracy){
    const alerta = await this.alert.create({
      header:'Seguro desea elminar este elemento?',
      message:'Latitud: '+lat+' Longitud:'+long+" Presición: "+accuracy,
      buttons:[
        {
          text:'cerrar',
          handler:()=>{
            console.log('OK!');
          }
        }
      ]
    });
    alerta.present();
  }

  onSubmit(){
    this.confirmarAgregar(this.task.name,this.task.desc);
    console.log('Form-Submit');
  }

  async confirmarBorrado(name:string) {
    const alerta = await this.alert.create({
      header: 'Are you sure you want to delete this task?',
      message: 'This action can not be undone.',
      buttons: [
        {
          text: 'yes',
          handler: () => {
            this.firestore.collection('tasks').doc(name).delete();
            console.log(name);
          }
        },
        {
          text: 'cancel',
          handler: () => {
            console.log('The action was canceled');
          }
        }
      ]
    });
    alerta.present();
  }

  async confirmarAgregar(name:string,desc:string) {
    const alerta = await this.alert.create({
      header: 'Are you sure you want to add this task?',
      message: ':D',
      buttons: [
        {
          text: 'yes',
          handler: () => {
            console.log("entra")
            this.geolocation.getCurrentPosition().then((resp) => {
                this.firestore.collection('tasks').doc(name)
                .set({
                    name:name,
                    desc:desc,
                    latitude:resp.coords.latitude.toString(),
                    longitude:resp.coords.longitude.toString(),
                    accuracy:resp.coords.accuracy.toString(),
                    state:false
                });
             }).catch((error) => {
               console.log('Error getting location', error);
             });
            
            this.x=false;
          }
        },
        {
          text: 'cancel',
          handler: () => {
            this.x=false;
            console.log('The action was canceled');
          }
        }
      ]
    });
    alerta.present();
  }

  async checkTask(name:string, desc:string, latitude:string, longitude:string, accuracy:string){
    console.log("checked");
    if(name){
      this.firestore.collection('tasks').doc(name)
            .set({
              name:name,
              desc:desc,
              latitude:latitude,
              longitude:longitude,
              accuracy:accuracy,
              state:true
            });
      const toast = await this.toast.create({
        duration:3000,
        header:'Task checked!',
        position:'bottom',
        message: 'Done :D',
      });
      toast.present();
    }
  }

  async uncheckTask(name:string, desc:string, latitude:string, longitude:string, accuracy:string){
    console.log("unchecked");
    if(name){
      this.firestore.collection('tasks').doc(name)
            .set({
              name:name,
              desc:desc,
              latitude:latitude,
              longitude:longitude,
              accuracy:accuracy,
              state:false
            });
      const toast = await this.toast.create({
        duration:3000,
        header:'Task unchecked!',
        position:'bottom',
        message: 'Pending :C',
      });
      toast.present();
    }
  }

  addNewTask(){
    this.x=true;
  }

}
