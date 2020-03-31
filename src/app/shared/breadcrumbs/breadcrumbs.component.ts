import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  public pageTitle:String;

  constructor(private _router:Router, private title: Title, private meta: Meta) { 
      this.getDataRoute().subscribe(data =>{

        const metaTag: MetaDefinition = {
          name: 'description',
          content: data.title,
        }

        this.pageTitle = data.title
        this.title.setTitle(data.title);
        this.meta.updateTag(metaTag); 
      });
  }

  getDataRoute(): Observable<any>{
    return this._router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event:ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd )=>
            event.snapshot.data
          )
      )
  }

  ngOnInit() {
  }


}
