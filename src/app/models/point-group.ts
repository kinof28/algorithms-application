import { Point } from './point';

export interface PointGroup {
  points: Point[];
  color: string;
}
export type PointMap = Map<Point, PointGroup>;
