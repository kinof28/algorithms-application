import { Injectable } from '@angular/core';
import { Point } from '../models/point';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  //this function calculate distance between two points and return the distance
  calculateDistance(firstPoint: Point, secondPoint: Point): number {
    let x, y: number;
    x = firstPoint.x - secondPoint.x;
    y = firstPoint.y - secondPoint.y;
    return Math.sqrt(x * x + y * y);
  }
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
}
