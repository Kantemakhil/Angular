import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component( {
    selector: 's4-image',

    templateUrl: './image.component.html',
    styleUrls: [],

} )
export class ImageComponent implements OnInit {
    // takes the address of the image
    @Input() source: string = '';
    // Label of image
    @Input() label: string = '';
    
    localClass:string='image-component';

    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
    
    constructor() { };

    ngOnInit() {
    }
    
    click() {
      this.onClick.emit();
     }
    
    @Input() 
    set styleClass(_styleClass) {
        if(_styleClass && _styleClass!=="" && _styleClass!=undefined) {
            this.localClass= _styleClass;
        } else {
            this.localClass=  'image-component';
        }
        
    }
}
