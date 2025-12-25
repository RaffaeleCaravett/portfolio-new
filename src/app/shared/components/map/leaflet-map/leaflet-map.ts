import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  imports: [],
  templateUrl: './leaflet-map.html',
  styleUrl: './leaflet-map.scss',
})
export class LeafletMapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  markers: L.Marker[] = [
    L.marker([23.7771, 90.3994]), // Dhaka, Bangladesh
  ];
  circle = L.circle([23.803, 90.422], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 1000,
  });
  polygon = L.polygon([
    [23.793, 90.34005],
    [23.823, 90.402],
    [23.843, 90.292],
  ]);
  popup = L.popup().setLatLng([23.8020, 90.4040]).setContent('I am a standalone popup.');
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map');
    L.tileLayer(baseMapURl, {
      maxZoom: 12,
    }).addTo(this.map);
    this.markers[0].addTo(this.map);
    this.circle.addTo(this.map);
    this.polygon.addTo(this.map);
    this.markers[0].bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
    this.circle.bindPopup('I am a circle.');
    this.polygon.bindPopup('I am a polygon.');
    this.popup.addTo(this.map);
  }

  private centerMap() {
    // Create a boundary based on the markers
    const bounds = L.latLngBounds(this.markers.map((marker) => marker.getLatLng()));

    // Fit the map into the boundary
    this.map.fitBounds(bounds);
  }
}
