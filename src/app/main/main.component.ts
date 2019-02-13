import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public show: boolean = false;
  public show2: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }
  toggleCollapse() {
    this.show = !this.show
  }
  toggleCollapse2() {
    this.show2 = !this.show2
  }
}
