import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private subscription:Subscription;

  constructor() {

    this.subscription = this.returnObservable().pipe(
      retry(1)
    )
    .subscribe(
      data => console.log(data),
      error => console.error(error),
      () => console.log('This observables jobe is Done !')  
    );

   }

   
   returnObservable():Observable<any> {
     let count = 0;
     
     return  new Observable( (observer: Subscriber<any>)  => {
       const interval = setInterval(() => {
         count++;
         const result = {
           value : count,
          }
          observer.next(result);
          
          // if(count === 3){
            //     clearInterval(interval);
            //     observer.complete();
            // }
            
            // if(count === 2){
              //    clearInterval(interval);
              //   observer.error('An error ocurred');
              // }
              
            }, 1000);
          })
          .pipe(
            map( (data) => data.value ),
            filter((data ,index) => {
              if((data % 2) === 1){
                
                //Even
                return true;
                
              } else {
                
                return false;
                
              }
            })
            )
            
          }
  
  /**
   * components life cycles
   */
  
  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
