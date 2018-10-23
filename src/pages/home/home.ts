import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { Geolocation, Geoposition} from '@ionic-native/geolocation'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

   Coordinates: any;
   watch:any;

  constructor(public navCtrl: NavController,
            private geolocation: Geolocation) {

  }

  ionViewDidEnter() {
  
    /*Initializing geolocation*/
   let options = {
     frequency: 3000,
     enableHighAccuracy: true
   };
 
   this.watch = this.geolocation.watchPosition(options)
   .subscribe((position: Geoposition) => {
     console.log(position);
     this.Coordinates = position.coords;
     this.executemap()
   }); 
    }
   
 
  executemap(){
 
      /*Initializing Map*/
      mapboxgl.accessToken = 'pk.eyJ1Ijoic3lod2giLCJhIjoiY2pua3YxejE3MDBkaTNxbWt5dWg3ZWY0ZyJ9.TM_laUuddw7lrg5D94VOpQ';
     var map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v9',
        center: [this.Coordinates.longitude, this.Coordinates.latitude],
        zoom: 16,
        pitch: 80,
        minZoom: 7.5, //restrict map zoom - buildings not visible beyond 13
        maxZoom: 17,
        container: 'map'
      });
       map.on('load', function() {
    map.addLayer({
     'id': '3d-buildings',
     'source': 'composite',
     'source-layer': 'building',
     'filter': ['==', 'extrude', 'true'],
     'type': 'fill-extrusion',
     'minzoom': 15,
     'paint': {
      'fill-extrusion-color': '#aaa',
      'fill-extrusion-height': {
       'type': 'identity',
       'property': 'height'
      },
      'fill-extrusion-base': {
       'type': 'identity',
       'property': 'min_height'
      },
      'fill-extrusion-opacity': .6
     }
    });
   });
  }
 
}