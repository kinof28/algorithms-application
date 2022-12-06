import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    //TODO:Need to fix a bug in canvas dimensions
    this.canvas.height =
      document.body.clientHeight - 0.2 * document.body.clientHeight;
    this.canvas.width =
      document.body.clientWidth - 0.25 * document.body.clientWidth;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#1A1A40';
  }
  initialize() {
    this.initialized = true;
    // this.generationNumber = 0;
    // this.bestEver = null;
    // this.sumOfFitness = 0;
    // this.index = 0;
    // this.bestLength = Number.MAX_VALUE;
    // this.population = this.service.initializeGeneration(
    //   this.populationSize,
    //   this.numberOfCities
    // );
    // this.cities = this.service.initializeCities(
    //   this.numberOfCities,
    //   this.canvas.width,
    //   this.canvas.height
    // );
    // this.drawCities();
  }
  start(): void {}
  stop(): void {}
}
