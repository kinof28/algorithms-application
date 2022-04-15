import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {City} from "../../models/city";
import {GeneticAlgorithmsService} from "../../services/genetic-algorithms.service";
import {Solution} from "../../models/solution";

@Component({
  selector: 'app-genetic-algorithms',
  templateUrl: './genetic-algorithms.component.html',
  styleUrls: ['./genetic-algorithms.component.css']
})
export class GeneticAlgorithmsComponent implements OnInit, AfterViewInit {
  problem: string = "Traveling SalesMan";
  @ViewChild("canvas", {static: false}) canvasRef!: ElementRef;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  numberOfCities: number = 10;
  private cities: City[] = [];
  private population: Solution[] = [];
  populationSize: number = 100;
  mutationRate: number = 0.1;
  started: boolean = false;
  initialized: boolean = false;
  bestEver: Solution | null = null;
  bestLength: number = Number.MAX_VALUE;
  private index: number = 0;
  sumOfFitness: number = 0;
  generationNumber: number = 0;

  constructor(private service: GeneticAlgorithmsService) {
  }

  ngOnInit(): void {

  }

  changeProblem(problem: string) {
    this.problem = problem;
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    //TODO:Need to fix a bug in canvas dimensions
    this.canvas.height = (document.body.clientHeight - 0.2 * document.body.clientHeight);
    this.canvas.width = (document.body.clientWidth - 0.25 * document.body.clientWidth);
    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#1A1A40";

  }

  Start() {
    this.started = true;

    window.requestAnimationFrame(() => {
      this.draw();
    });
  }

  draw() {
    if (!this.started) return;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawCities();
    if (this.bestEver !== null) this.drawSolution(this.bestEver, true);
    this.drawSolution(this.population[this.index], false);
    let length = this.service.calculatePathLength(this.cities, this.population[this.index]);
    this.population[this.index].fitness = 1 / (length + 1);//we add one in cas of length =0 to avoid runtime exception
    this.sumOfFitness += 1 / (length + 1);
    if (this.bestLength > length) {
      this.bestEver = this.population[this.index];
      this.bestLength = length;
    }
    this.index++;
    if (this.index < this.population.length) {
      window.requestAnimationFrame(() => {
        this.draw();
      });
    } else {
      this.service.normalizeFitness(this.population, this.sumOfFitness);
      this.population = this.service.getNewGeneration(this.population, this.mutationRate);
      this.sumOfFitness = 0;
      this.index = 0;
      this.generationNumber++;
      if (this.generationNumber < 1000)
        window.requestAnimationFrame(() => {
          this.draw();
        })
    }
  }

  stop() {
    this.started = false;
    this.initialized=false;
    this.index = 0;
  }

  drawCities() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#1A1A40";
    for (const city of this.cities) {
      let circle = new Path2D();
      circle.arc(city.x, city.y, 20, 0, 2 * Math.PI);
      this.context.fill(circle);
    }
  }

  initialise() {
    this.initialized=true;
    this.generationNumber = 0;
    this.bestEver = null;
    this.sumOfFitness = 0;
    this.index = 0;
    this.bestLength = Number.MAX_VALUE;
    this.population = this.service.initializeGeneration(this.populationSize, this.numberOfCities);
    this.cities = this.service.initializeCities(this.numberOfCities, this.canvas.width, this.canvas.height);
    this.drawCities()
  }

  drawSolution(solution: Solution, best: boolean) {
    this.context.strokeStyle = best ? 'green' : 'black';
    this.context.lineWidth = best ? 5 : 2;
    this.context.beginPath();
    let iterator: Iterator<number> = solution.order.values();
    let city: City = this.cities[iterator.next().value];
    this.context.moveTo(city.x, city.y);
    for (let i = 1; i < this.cities.length; i++) {
      let city: City = this.cities[iterator.next().value];
      this.context.lineTo(city.x, city.y);
    }
    this.context.stroke();
  }
}
