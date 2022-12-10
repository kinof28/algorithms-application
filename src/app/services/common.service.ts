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
}
