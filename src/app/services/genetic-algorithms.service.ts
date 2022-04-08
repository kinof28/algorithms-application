import {Injectable} from '@angular/core';
import {City} from "../models/city";

@Injectable({
  providedIn: 'root'
})
export class GeneticAlgorithmsService {

  constructor() {
  }

  initializeCities(numberOfCities: number, width: number, height: number): City[] {
    let cities: City[] = [];
    for (let i = 0; i < numberOfCities; i++) {
      let city: City = {x: 0, y: 0};
      city.x = Math.random() * width;
      city.y = Math.random() * height;
      cities.push(city);
    }

    return cities;
  }
}
