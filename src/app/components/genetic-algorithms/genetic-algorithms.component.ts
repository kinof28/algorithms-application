import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {City} from "../../models/city";
import {GeneticAlgorithmsService} from "../../services/genetic-algorithms.service";
import {Solution} from "../../models/solution";

@Component({
  selector: 'app-genetic-algorithms',
  templateUrl: './genetic-algorithms.component.html',
  styleUrls: ['./genetic-algorithms.component.css']
})
export class GeneticAlgorithmsComponent implements OnInit , AfterViewInit{
  problem:string="Traveling salesMan";
  @ViewChild("canvas", {static: false}) canvasRef!:ElementRef;
  canvas!:HTMLCanvasElement;
  context!:CanvasRenderingContext2D;
  numberOfCities:number=10;
  private cities: City[] = [];
  private population:Solution[]=[];
  populationSize:number=10;
  mutationRate:number=0.001;

  constructor(private service:GeneticAlgorithmsService) { }

  ngOnInit(): void {

  }

  changeProblem(problem: string) {
    this.problem=problem;
  }

  ngAfterViewInit(): void {
    this.canvas=this.canvasRef.nativeElement;
    this.canvas.height=document.body.clientHeight-0.2*document.body.clientHeight;
    this.canvas.width=document.body.clientWidth-0.25*document.body.clientWidth;
    this.context=<CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.context.fillStyle="#FFFFFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle="#1A1A40";

  }

  draw() {
    this.population=this.service.initializeGeneration(10,this.numberOfCities);
    this.cities=this.service.initializeCities(this.numberOfCities,this.canvas.width,this.canvas.height);
    for (const city of this.cities) {
      let circle = new Path2D();
      circle.arc(city.x, city.y, 20, 0, 2 * Math.PI);
      this.context.fill(circle);
    }
    for (let solution of this.population) {
      // console.log(this.service.calculatePathLength(this.cities,solution));
      this.drawSolution(solution);
    }
  }
  drawSolution(solution:Solution){
    this.context.strokeStyle = 'red';
    this.context.lineWidth = 5;
    this.context.beginPath();
    let iterator:Iterator<number>=solution.order.values();
    let city:City=this.cities[iterator.next().value];
    this.context.moveTo(city.x,city.y);
    for (let i = 1; i < this.cities.length; i++) {
      let city:City=this.cities[iterator.next().value];
      this.context.lineTo(city.x,city.y);
    }
    this.context.stroke();
  }
}
