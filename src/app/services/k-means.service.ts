import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { Point } from '../models/point';
import { PointGroup, PointMap } from '../models/point-group';

@Injectable({
  providedIn: 'root',
})
export class KMeansService {
  constructor(private commonService: CommonService) {}
  randomizeColor(): string {
    let random1 = Math.round(Math.random() * 256),
      random2 = Math.round(Math.random() * 256),
      random3 = Math.round(Math.random() * 256);
    let color: string =
      '#' +
      (random1.toString(16).length < 2 ? '0' : '') +
      random1.toString(16) +
      (random2.toString(16).length < 2 ? '0' : '') +
      random2.toString(16) +
      (random3.toString(16).length < 2 ? '0' : '') +
      random3.toString(16);
    return color;
  }
  groupPoints(points: Point[], centers: Point[]): PointMap {
    let pointMap: Map<Point, PointGroup> = new Map();
    for (let i = 0; i < centers.length; i++) {
      pointMap.set(centers[i], {
        points: [],
        color: this.randomizeColor(),
      });
    }
    let closestCenter: Point = centers[1];
    let minimumDistance: number, distance: number;
    for (let i = 0; i < points.length; i++) {
      minimumDistance = Number.MAX_VALUE;
      centers.forEach((center) => {
        distance = this.commonService.calculateDistance(center, points[i]);
        if (distance < minimumDistance) {
          minimumDistance = distance;
          closestCenter = center;
        }
      });
      pointMap.get(closestCenter)?.points.push(points[i]);
    }
    return pointMap;
  }
}
