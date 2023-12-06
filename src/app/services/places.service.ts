import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  getNearbyPlaces(lat: number, lng: number) {
    const params = new HttpParams()
      .set('location', `${lat},${lng}`)
      .set('radius', '500') // en metres
      .set('key', environment.apiKey);
  
    return this.http.get(environment.apiURL, { params }).pipe(
      map((response: any) => this.processPlaces(response['results']))
    );
  }
  
  private processPlaces(places: any[]): any[] {
    return places.sort((a, b) => b.user_ratings_total - a.user_ratings_total).slice(0, 20);
  }

}
