import {
    
    Directive, ElementRef, AfterViewChecked,
    Input, HostListener

} from '@angular/core';

@Directive(
    {
        selector: '[myMatchHeight]',
    }
)

export class MatchHeightDirective implements AfterViewChecked {

    // Class Name to match height
    @Input() myMatchHeight: string;

    constructor(private el: ElementRef){

    }

    ngAfterViewChecked(){
        // Call our MatchHeight

        this.matchHeight(this.el.nativeElement, this.myMatchHeight);

    }

    matchHeight(parent: HTMLElement, className: string){

        // Match height logic 

        if(!parent){
            return;
        }

        const children = parent.getElementsByClassName( className);

        if(!children){
            return;
        }

        const childrenHeights = Array.from(children).map( x => x.getBoundingClientRect().height )
        
        const maxHeight = childrenHeights.reduce((prev, curr) => curr > prev ? curr : prev, 0);

        Array.from(children)
            .forEach((x: HTMLElement) => x.style.height = `${maxHeight}px`);

    }

}

