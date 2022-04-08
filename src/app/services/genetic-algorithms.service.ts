import {Injectable} from '@angular/core';
import {City} from "../models/city";
import {Solution} from "../models/solution";

@Injectable({
  providedIn: 'root'
})
export class GeneticAlgorithmsService {

  constructor() {
  }
  //this function initialize number of cities in random coordination
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
  //this function initialize the first generation
  initializeGeneration(populationSize:number,numberOfCities:number):Solution[]{
    let solutions:Solution[]=[];
    let solution:Solution;
    for (let i = 0; i < populationSize; i++) {
      solution=this.randomizeSolution(numberOfCities);
      // solution.fitness=this.
      solutions.push(solution);
    }
    return solutions;
  }
  // get a random solution
  // this function is so costy we need to optimise it later
  private randomizeSolution(numberOfCities:number):Solution{
    let solution:Solution={order:new Set<number>()};
    while (solution.order.size<numberOfCities){
      solution.order.add(Math.floor(Math.random()*numberOfCities));
    }
    return solution;
  }
  //this function calculate distance between two cities and return the distance square
  //to avoid calculation of square root since we are interested only in relativity between distances
  calculateDistance(firstCity:City,secondCity:City):number{
    let x,y:number;
    x=Math.abs(firstCity.x-secondCity.x);
    y=Math.abs(firstCity.y-secondCity.y);
    return (x*x)+(y*y);
  }

  calculatePathLength(cities:City[],solution:Solution):number{
    let length:number=0;
    let order:number[]=[...solution.order];
    for (let i = 0; i < order.length-1; i++) {
      length+=this.calculateDistance(cities[order[i]],cities[order[i+1]]);
    }
    return length;
  }
}
