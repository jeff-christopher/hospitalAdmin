import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UploadDocService {

  constructor(private http: HttpClient) {
    
   }

  uploadFile(file: File, type: string, id: string): Promise<any> {
    
    return new Promise((resolve, reject) => {
    
      const URL = `${URL_SERVICES}upload/${type}/${id}`;
      const xhr = new XMLHttpRequest();
  
      const formData: FormData = new FormData();
      formData.append('image', file, file.name);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4){

          if (xhr.status === 200){
            resolve( JSON.parse(xhr.response));
          } else{
            reject( JSON.parse(xhr.response));
          }
  
        }

      };

      xhr.open('PUT', URL, true);
      xhr.send( formData);

    });
  }
}
