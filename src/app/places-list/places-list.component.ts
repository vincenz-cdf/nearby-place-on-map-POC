import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocationService } from '../services/location.service';
import { PlacesService } from '../services/places.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent {
  @ViewChild(MapComponent) mapComponent: MapComponent = new MapComponent();
  @ViewChild('mapContainer') mapElement: ElementRef = new ElementRef(null);
  places: any[] = [];

  constructor(private locationService: LocationService, private placesService: PlacesService) { }

  ngOnInit() {
    this.locationService.getCurrentLocation().then(position => {
      const { latitude, longitude } = position.coords;
      this.placesService.getNearbyPlaces(latitude, longitude).subscribe((data: any) => {
        this.places = data.filter((place: any) => !place.types.includes('political'));
      });
    });
  }

  updateMapWithNewLocation(latitude: number, longitude: number, placeName: string) {
    if (this.mapComponent) {
      this.mapComponent.updateMap(latitude, longitude, placeName);
      this.mapElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onPlaceSelected(place: any) {
    const latitude = place.geometry.location.lat;
    const longitude = place.geometry.location.lng;
    const placeName = place.name;
    this.updateMapWithNewLocation(latitude, longitude, placeName);
  }

  getStarRating(rating: number): string[] {

    if (rating === undefined) {
      return ['empty', 'empty', 'empty', 'empty', 'empty'];
    }
    
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('full');
      } else if (i - 0.5 <= rating) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }
    return stars;
  }
  
}
