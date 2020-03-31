import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    
    this.countThree().then((message) => {
      console.log('termino', message);
    })
    .catch(error => {
      console.error('error', error);
    });
      
  }

  ngOnInit() {
  }

  countThree():Promise<boolean> {
     const promesa: Promise<boolean> = new Promise((resolve, reject) => {
      let count = 0;
      const interval =  setInterval(() => {
        count++;
        console.log(count);
        if(count === 3){
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });


    return promesa;
  }

}
