import { Component, OnInit } from '@angular/core';
import { ViewChild,ElementRef } from '@angular/core';

declare var google:any;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map:any;
  @ViewChild('map',{read:ElementRef,static:false})mapRef:ElementRef;
  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.showmap();
  }
  infoWindows:any=[];
  marker:any=[
    {
      title:"hola",
      latitude:"4.571136",
      longitude:"-74.21952"
    }
  ]

  addMarkersToMap(markers){
    for(let marker of markers){
      let position= new google.maps.LatLng(marker.latitude,marker.longitude);
      let mapMarker = new google.maps.Marker({
        position:position,
        title:marker.title,
        latitude:marker.latitude,
        longitude:marker.longitude
      });
      
      marker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker){
    let infoWindowContent= '<div id="content">'+
                              '<h2 id="firstHeading" class="firstHeading">'+marker.title+'</h2>'+
                              '<p>Latitude:'+marker.latitude+'</p>'+
                              '<p>Longitud:'+marker.longitude+'</p>'+
                              '</div>';
    let infoWindow = new google.maps.infoWindow({
      content:infoWindowContent
    });
    marker.addListener('click',()=>{
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }


  showmap(){
    const location = new google.maps.LatLng(4.571136,-74.21952)
    const options = {
      center:location,
      zoom:15,
      disableDefaultUI:true
    }
    this.map=new google.maps.Map(this.mapRef.nativeElement,options);
  }

}
