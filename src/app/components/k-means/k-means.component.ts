import { KMeansService } from './../../services/k-means.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Point } from 'src/app/models/point';
import { PointGroup, PointMap } from 'src/app/models/point-group';
import { GeneticAlgorithmsService } from 'src/app/services/genetic-algorithms.service';

@Component({
  selector: 'app-k-means',
  templateUrl: './k-means.component.html',
  styleUrls: ['./k-means.component.css'],
})
export class KMeansComponent implements OnInit {
  numberOfEntries: number = 10;
  NumberOfClasses: number = 2;
  started: boolean = false;
  initialized: boolean = false;
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  private points: Point[] = [];
  private centers: Point[] = [];
  private groups: PointMap = new Map();
  // private colors: string[] = [];
  constructor(
    private geneticAlgorithmService: GeneticAlgorithmsService,
    private service: KMeansService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    //TODO:Need to fix a bug in canvas dimensions
    this.canvas.height =
      document.body.clientHeight - 0.4 * document.body.clientHeight;
    this.canvas.width =
      document.body.clientWidth - 0.25 * document.body.clientWidth;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#1A1A40';
  }
  drawPoints() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#111111';
    for (const point of this.points) {
      let circle = new Path2D();
      circle.arc(point.x, point.y, 10, 0, 2 * Math.PI);
      this.context.fill(circle);
    }
  }
  drawGroups() {
    this.drawPoints();
    this.drawCenters();
    for (const group of this.groups) {
      this.context.fillStyle = group[1].color;
      for (const point of group[1].points) {
        let circle = new Path2D();
        circle.arc(point.x, point.y, 11, 0, 2 * Math.PI);
        this.context.fill(circle);
      }
    }
  }
  drawCenters() {
    this.context.fillStyle = '#000000';
    for (const point of this.centers) {
      let rectangle = new Path2D();
      rectangle.rect(point.x, point.y, 10, 10);
      this.context.fill(rectangle);
    }
  }
  initialize(): void {
    this.initialized = true;
    this.points = this.geneticAlgorithmService.initializePoints(
      this.numberOfEntries,
      this.canvas.width,
      this.canvas.height
    );
    this.drawPoints();
  }
  initializeCenters(): void {
    this.centers = this.geneticAlgorithmService.initializePoints(
      this.NumberOfClasses,
      this.canvas.width,
      this.canvas.height
    );
    this.drawCenters();
  }
  randomizeCenters(): void {
    this.initializeCenters();
    this.groups = this.service.groupPoints(this.points, this.centers);
    this.drawGroups();
  }
  start(): void {}
  stop(): void {}
  numberOfClassesChanges(): void {
    this.NumberOfClasses =
      this.NumberOfClasses > this.numberOfEntries
        ? this.numberOfEntries
        : this.NumberOfClasses;
  }
}
