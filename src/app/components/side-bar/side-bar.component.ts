import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input()label:string="";
  @Input() problems:string[]=[];
  activeProblem:string="";
  @Output() problemChanged:EventEmitter<string>=new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.activeProblem=this.problems[0];
  }

  problemClicked(problem: string) {
    if(problem!=this.activeProblem){
      this.problemChanged.emit(problem);
      this.activeProblem=problem;
    }
  }
}
