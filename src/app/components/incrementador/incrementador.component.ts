import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() progreso: number = 50;
  @Input() leyenda: string = 'legend';
  @Output() nuevoProgreso: EventEmitter<number> = new EventEmitter();
  @ViewChild('txtProgress', null) txtProgress: ElementRef;

  constructor() {
  }

  onChanges(newValue: number){
    const textProgressElement = this.txtProgress.nativeElement;

    if(newValue > 100){
      this.progreso = 100;
    } else if(newValue < 0){
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    textProgressElement.value = this.progreso;
    this.nuevoProgreso.emit(this.progreso);
    textProgressElement.focus();

  }

  cambiarValor(valor: number){

    if(this.progreso > 100 && valor > 0){
      this.progreso = 100;
      return;
    }

    if (this.progreso < 0 && valor < 0){
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;
    this.nuevoProgreso.emit(this.progreso);
 
  }


  ngOnInit() {
  }

}
