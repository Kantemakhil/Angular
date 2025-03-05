import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
// import { DOCUMENT } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import {LaunchbuttonComponent} from '../launchbutton/launchbutton.component';

enum DisplayAs {
    button = "button",
    href = "href",
    image = "image"
}

@Component({
    selector: 's4-hyperlink',
    templateUrl: './hyperlink.component.html',
    styleUrls: []
  })
export class HyperlinkComponent extends LaunchbuttonComponent implements OnInit {
    @Input() queryparam :any;
    @Input() displayas = DisplayAs.href;//'button' & 'href' will be  option to display it as button or href.*/
    @Input()  type = 'primary';
    @Input() source: string = '';
    @Input() matIconButton: boolean = false;
   // Label of image
    @Input() label: string = '';
    @Input() styleClass: string = 'image-component'; 
    
    @Input() onLaunchClick: () => any;
    constructor(public dialog: MatDialog, @Inject( DOCUMENT ) private docH: any, private routerH: Router, private routeH: ActivatedRoute) {
        super(dialog, docH, routerH, routeH);
    }
    
    reDirect() {
        let launchResult;
        if (this.onLaunchClick && typeof this.onLaunchClick === 'function') {
            launchResult = this.onLaunchClick();
            if (!launchResult) {
                return;
            }
        }
        
        if ( this.modal ) {
            if ( this.link ) {
                this.openModal();
            }
        } else {
            if ( this.link ) {
                if(this.queryparam && this.modalData) {
                    this.routerH.navigate( [this.link], { queryParams: { [this.queryparam] : this.modalData[this.queryparam] } } );
                } else {
                    this.routerH.navigate( [this.link] );
                }
                
            }
        }
    }
    
}
