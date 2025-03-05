import { Component, OnInit, ViewChild } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
//import { Player } from "@vimeo/player";
// import * as Player from "@vimeo/player/dist/player.js";


@Component({
    selector: 'helpVideo',
    templateUrl: './helpvideo.component.html',
    styleUrls: []
})
export class HelpVideoComponent implements OnInit {
    
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('video') video: any;
    // private player : Player;
    vimeoUrl : any ;
    
    constructor(private domSanitizer: DomSanitizer,) { 
        
    }
    
    ngOnInit() {
        if(this.dialog.data!=null) {
            let url = this.dialog.data;
            //this.vimeoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/419738302');
            this.vimeoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
        }
    }
    
    ngAfterViewInit() {
        //let videoElement  = this.video.nativeElement;
    }
    
    cleanUrl() {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(this.vimeoUrl);
    }
    cancel(): void {
        this.dialog.close(null);
    }
}
