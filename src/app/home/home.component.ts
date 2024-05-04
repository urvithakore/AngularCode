import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLocationComponent } from '../home-location/home-location.component';
import { HousingLocation } from '../housing-location'
import { HousingService} from '../housing.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeLocationComponent],
  template: `
  <section>
  <form>
    <input type="text" name="search" placeholder="Search by city or state" #filter/>
    <button type="button" class="primary" (click)="filterResults(filter.value)">Search</button>
  </form>
  </section>
  <section class="results">
    <app-home-location  *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-home-location>
  </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  /*housingLocation: HousingLocation = {
    id: 9999,
    name: 'Test Home',
    city: 'Test city',
    state: 'ST',
    photo: `${this.baseUrl}/example-house.jpg`,
    availableUnits: 99,
    wifi: true,
    laundry: false,
  };*/

  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  /*constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }*/

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase()) || housingLocation?.state.toLowerCase().includes(text.toLowerCase())
    );
  }
}
