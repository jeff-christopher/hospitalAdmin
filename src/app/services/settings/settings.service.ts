import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public ajustes: Ajustes = {
    temaURL: 'assets/css/colors/default.css',
    tema: 'default',
  }

  constructor() { 
    this.cargarAjustes();
  }

  guardarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes) );
  };

  cargarAjustes(){

    if (localStorage.getItem('ajustes')){
      this.ajustes =  JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }

  }

  aplicarTema(tema:string){
    const themeUrl: string = `assets/css/colors/${tema}`;
    document.getElementById('theme').setAttribute('href', themeUrl + '.css');

    this.ajustes.tema = tema;
    this.ajustes.temaURL = themeUrl;

    this.guardarAjustes();
  }
  
}

interface Ajustes {
  temaURL: string;
  tema: string;
}
