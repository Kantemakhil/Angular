import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { VHeaderBlock } from "@commonbeans/VHeaderBlock";
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router } from '@angular/router';

@Component({
    selector: 'intakedialog',
    templateUrl: './intakedialog.html'
})

export class IntakedialogComponent implements OnInit {
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    imageModel: Images = new Images();
    offender:any;
    link:any;
    modalData:any;
    queryParam:any;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  
    constructor(private osiosearService: OsiosearService, private router: Router, private translateService: TranslateService, private sessionManager: UserSessionManager) { }
    ngOnInit() {
       if(this.dialog.data !=null ) {
           if(this.dialog.data.isIntakeQueue) {
               this.link = "nowhere";
               this.vHeaderBlockModel.offenderId = this.dialog.data.offenderId;
               this.vHeaderBlockModel.offenderBookId = this.dialog.data.offenderBookId;
               const offbkGlobal = this.osiosearService.offbkgGlobalQueryIntakeQueue( this.vHeaderBlockModel );
               offbkGlobal.subscribe( list => {
                   if ( list.length > 0 ) {
                       this.offender = list[0];
                       if (this.offender.birthDate && !(this.offender.birthDate instanceof Date)) {
                           this.offender.birthDate = new Date(this.offender.birthDate);
                       }
                       if ( list[0].imageId != null ) {
                           this.imageModel.imageId = list[0].imageId;
                           this.osiosearService.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                               this.offender.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                       });     
                       }
                   }
               } );
           } else {
               this.vHeaderBlockModel.offenderId = this.dialog.data.offenderId;
               this.vHeaderBlockModel.offenderBookId = this.dialog.data.offenderBookId;
               this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
               const offbkGlobal = this.osiosearService.offbkgGlobalQuery( this.vHeaderBlockModel );
               offbkGlobal.subscribe( list => {
                   if ( list.length > 0 ) {
                       
                       this.offender = list[0];
                       this.link = "/INSDSBVW";
                       this.modalData = {'offenderIdDisplay':this.offender.offenderIdDisplay};
                       this.queryParam = 'offenderIdDisplay';
                       if (this.offender.birthDate && !(this.offender.birthDate instanceof Date)) {
                           this.offender.birthDate = new Date(this.offender.birthDate);
                       }
                       if ( list[0].imageId != null ) {
                           this.imageModel.imageId = list[0].imageId;
                           this.osiosearService.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                               this.offender.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                       });
                       }
                   }
               });
           }
       }
    }
    cancel(): void {
        this.dialog.close(null);
    }
    imageLink(e){
        if (this.queryParam) {
            if(e == 'IMG'){
                this.router.navigate([this.link], {queryParams: this.modalData});
                this.dialog.close(null);
            }
       }
    }
}
