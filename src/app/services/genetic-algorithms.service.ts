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
  initializeGeneration(populationSize: number, numberOfCities: number): Solution[] {
    let solutions: Solution[] = [];
    for (let i = 0; i < populationSize; i++) {
      solutions.push(this.randomizeSolution(numberOfCities));
    }
    return solutions;
  }

  normalizeFitness(population: Solution[], sumOfFitness: number) {
    for (let i = 0; i < population.length; i++) {
      population[i].fitness = population[i].fitness! / sumOfFitness;
    }
  }


  // get a random solution
  // this function is so costy we need to optimise it later
  private randomizeSolution(numberOfCities: number): Solution {
    let solution: Solution = {order: new Set<number>()};
    while (solution.order.size < numberOfCities) {
      solution.order.add(Math.floor(Math.random() * numberOfCities));
    }
    return solution;
  }

  //this function calculate distance between two cities and return the distance square
  //to avoid calculation of square root since we are interested only in relativity between distances
  calculateDistance(firstCity: City, secondCity: City): number {
    let x, y: number;
    x = Math.abs(firstCity.x - secondCity.x);
    y = Math.abs(firstCity.y - secondCity.y);
    return (x * x) + (y * y);
  }

  calculatePathLength(cities: City[], solution: Solution): number {
    let length: number = 0;
    let order: number[] = [...solution.order];
    for (let i = 0; i < order.length - 1; i++) {
      length += this.calculateDistance(cities[order[i]], cities[order[i + 1]]);
    }
    return length;
  }

  getNewGeneration(population: Solution[], mutationRate: number): Solution[] {
    let newPopulation: Solution[] = [];
    let parent1: Solution;
    let parent2: Solution;
    let child: Solution;
    for (let i = 0; i < population.length; i++) {
      // console.log(population[i].fitness);
      parent1 = this.pickOne(population);
      parent2 = this.pickOne(population);
      child = this.crossOver(parent1, parent2);
      newPopulation.push(this.mutate(child, mutationRate));
    }
    return newPopulation;
    // return population;
  }

  // this mechanism is better than creating a large pool of redundant solutions
  // or creating a loop of randomisation (accept and reject mechanism)
  pickOne(population: Solution[]): Solution {
    let index = 0;
    let randomNumber=Math.random();
    while(randomNumber>0){
      randomNumber-=population[index].fitness!;
      index++;
    }
    return population[index-1];
  }

  crossOver(parent1: Solution, parent2: Solution): Solution {
    let child:Solution={order:new Set<number>()};
    let random=Math.floor(Math.random()*parent1.order.size);
    let iterator1=parent1.order.values();
    let iterator2=parent2.order.values();
    for (let i = 0; i < random; i++) {
      child.order.add(iterator1.next().value);
    }
    for (let i = 0; i < parent2.order.size; i++) {
      child.order.add(iterator2.next().value);
    }
    return child;
  }
  // mutation between two elements in a set is quite tricky but since it's a rare operation and not a quit corty one
  // we are doing it inefficiently
  mutate(solution: Solution, mutationRate: number): Solution {
    let randomNumber=Math.random();
    if(randomNumber<mutationRate){
      let newSolution:Solution={order:new Set<number>()};
      let index1=Math.floor(Math.random()*solution.order.size);
      let index2=Math.floor(Math.random()*solution.order.size);
      let temp1:number=0;
      let temp2:number=0;
      solution.order.forEach((value,index)=>{
        if(index==index1)temp1 = value;
        else if (index==index2)temp2=value;
      })
      solution.order.forEach((value,index)=>{
        if(index==index1)newSolution.order.add(temp2);
        else if(index==index2)newSolution.order.add(temp1);
        newSolution.order.add(value);
      })
      return newSolution;
    }else return solution;
  }

}

