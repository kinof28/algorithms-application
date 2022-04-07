import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genitic-algorithms',
  templateUrl: './genetic-algorithms.component.html',
  styleUrls: ['./genetic-algorithms.component.css']
})
export class GeneticAlgorithmsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changeProblem(event: string) {
    console.log(event);
  }
}
