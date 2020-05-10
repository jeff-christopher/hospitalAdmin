import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  constructor( private searchService: SearchService ) { }

  ngOnInit() {
  }

  searchValue(search: string) {
    if (!search) {
        this.searchService.emptyBar = true;
        this.searchService.notification.emit();    
        return;
    }

    this.searchService.searchTerm(search).subscribe
      ((res: any) => {
        this.searchService.emptyBar = false;
        this.searchService.notification.emit(res);
      });

  }

}
