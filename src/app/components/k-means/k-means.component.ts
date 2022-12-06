import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Point } from 'src/app/models/point';
import { GeneticAlgorithmsService } from 'src/app/services/genetic-algorithms.service';

@Component({
  selector: 'app-k-means',
  templateUrl: './k-means.component.html',
  styleUrls: ['./k-means.component.css'],
})
export class KMeansComponent implements OnInit {
  numberOfEntries: number = 10;
  NumberOfClasses: number = 1;
  started: boolean = false;
  initialized: boolean = false;
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  private points: Point[] = [];
  private centers: Point[] = [];
  constructor(private geneticAlgorithmService: GeneticAlgorithmsService) {}

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
    this.context.fillStyle = '#00ff00';
    for (const point of this.points) {
      let circle = new Path2D();
      circle.arc(point.x, point.y, 10, 0, 2 * Math.PI);
      this.context.fill(circle);
    }
  }
  drawCenters() {
    // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.context.fillStyle = '#FFFFFF';
    // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#000000';
    for (const point of this.centers) {
      let rectangle = new Path2D();
      rectangle.rect(point.x, point.y, 10, 10);
      // this.context.fill(circle);
      this.context.fill(rectangle);
    }
  }
  initialize() {
    this.initialized = true;
    this.points = this.geneticAlgorithmService.initializePoints(
      this.numberOfEntries,
      this.canvas.width,
      this.canvas.height
    );
    this.drawPoints();
    this.initializeCenters();
  }
  initializeCenters() {
    this.centers = this.geneticAlgorithmService.initializePoints(
      this.NumberOfClasses,
      this.canvas.width,
      this.canvas.height
    );
    this.drawCenters();
  }
  start(): void {}
  stop(): void {}
}
