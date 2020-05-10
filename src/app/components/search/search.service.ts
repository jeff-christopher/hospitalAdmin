import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  collection: string;
  emptyBar: boolean;
  notification = new EventEmitter<any>();

  constructor(private http: HttpClient) { 

  }

  searchTerm(searchTerm: string): Observable<any> {
      
    const URL = URL_SERVICES + `search/collection/${this.collection}/${searchTerm}`;

    return this.http.get(URL);

  }

}
