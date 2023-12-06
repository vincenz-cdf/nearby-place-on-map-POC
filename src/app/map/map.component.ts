import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private currentLocationMarker: any;
  private marker: any;

  greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    this.showCurrentLocation();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 0, 0 ], // Temporary center
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    });

    tiles.addTo(this.map);
  }

  public updateMap(latitude: number, longitude: number, placeName: string): void {
    this.map.setView([latitude, longitude], 13);
    
    if (this.marker) {
      this.marker.setLatLng([latitude, longitude]);
    } else {
      this.marker = L.marker([latitude, longitude], {icon: this.greenIcon}).addTo(this.map);
    }
    this.marker.bindPopup(placeName).openPopup();
  }

  showCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        if (this.currentLocationMarker) {
          this.map.removeLayer(this.currentLocationMarker);
        }

        this.currentLocationMarker = L.marker([lat, lng], {icon: this.redIcon}).addTo(this.map);
        this.map.setView([lat, lng], this.map.getZoom());
      }, () => {
        console.error("Error in retrieving position");
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
}
