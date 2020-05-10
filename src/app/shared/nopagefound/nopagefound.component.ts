import { Component, OnInit } from '@angular/core';

declare function initPlugins();


@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css'], 
})
export class NopagefoundComponent implements OnInit {

  year:number;

  constructor() { }

  ngOnInit() {
    initPlugins();
    this.year = this.getYear();

  }


  getYear(): number{
    const date = new Date();
    
    return date.getFullYear();
  }


}
