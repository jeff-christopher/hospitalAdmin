import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  type: string;
  id: string;
  hided: string = 'hided';

  notification = new EventEmitter<any>();

  constructor() { 
  }

  hideModal() {

    this.hided = 'hided';
    this.id = null;
    this.type = null;

  }

  showModal(type: string, id: string) {

    this.hided = '';
    this.id = id;
    this.type = type;
  

  }
}
