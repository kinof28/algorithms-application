import { Injectable } from '@angular/core';
import { Point } from '../models/point';
import { Solution } from '../models/solution';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class GeneticAlgorithmsService {
  constructor(private commonService: CommonService) {}

  //this function initialize number of cities in random coordination
  initializePoints(
    numberOfPoints: number,
    width: number,
    height: number
  ): Point[] {
    let points: Point[] = [];
    for (let i = 0; i < numberOfPoints; i++) {
      let point: Point = { x: 0, y: 0 };
      point.x = Math.random() * width;
      point.y = Math.random() * height;
      points.push(point);
    }
    return points;
  }

  //this function initialize the first generation
  initializeGeneration(
    populationSize: number,
    numberOfCities: number
  ): Solution[] {
    let solutions: Solution[] = [];
    for (let i = 0; i < populationSize; i++) {
      solutions.push(this.randomizeSolution(numberOfCities));
    }
    return solutions;
  }

  //make the fitness a percentage
  normalizeFitness(population: Solution[], sumOfFitness: number) {
    for (let i = 0; i < population.length; i++) {
      population[i].fitness = population[i].fitness! / sumOfFitness;
    }
  }

  // get a random solution
  // this function is so costy we need to optimize it later
  private randomizeSolution(numberOfCities: number): Solution {
    let solution: Solution = { order: new Set<number>() };
    while (solution.order.size < numberOfCities) {
      solution.order.add(Math.floor(Math.random() * numberOfCities));
    }
    return solution;
  }

  calculatePathLength(points: Point[], solution: Solution): number {
    let length: number = 0;
    let order: number[] = [...solution.order];
    for (let i = 0; i < order.length - 1; i++) {
      length += this.commonService.calculateDistance(
        points[order[i]],
        points[order[i + 1]]
      );
    }
    return length;
  }

  getNewGeneration(population: Solution[], mutationRate: number): Solution[] {
    let newPopulation: Solution[] = [];
    let parent1: Solution;
    let parent2: Solution;
    let child: Solution;
    for (let i = 0; i < population.length; i++) {
      parent1 = this.pickOne(population);
      parent2 = this.pickOne(population);
      child = this.crossOver(parent1, parent2);
      newPopulation.push(this.mutate(child, mutationRate));
    }
    return newPopulation;
  }

  // this mechanism is better than creating a large pool of redundant solutions
  // or creating a loop of randomization (accept and reject mechanism)
  pickOne(population: Solution[]): Solution {
    let index = 0;
    let randomNumber = Math.random();
    while (randomNumber > 0) {
      randomNumber -= population[index].fitness!;
      index++;
    }
    return population[index - 1];
  }

  crossOver(parent1: Solution, parent2: Solution): Solution {
    let child: Solution = { order: new Set<number>() };
    let random = Math.floor(Math.random() * parent1.order.size);
    let iterator1 = parent1.order.values();
    let iterator2 = parent2.order.values();
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
    let randomNumber = Math.random();
    if (randomNumber < mutationRate) {
      let newSolution: Solution = { order: new Set<number>() };
      let index1 = Math.floor(Math.random() * solution.order.size);
      let index2 = Math.floor(Math.random() * solution.order.size);
      let temp1: number = 0;
      let temp2: number = 0;
      solution.order.forEach((value, index) => {
        if (index == index1) temp1 = value;
        else if (index == index2) temp2 = value;
      });
      solution.order.forEach((value, index) => {
        if (index == index1) newSolution.order.add(temp2);
        else if (index == index2) newSolution.order.add(temp1);
        newSolution.order.add(value);
      });
      return newSolution;
    } else return solution;
  }
}
