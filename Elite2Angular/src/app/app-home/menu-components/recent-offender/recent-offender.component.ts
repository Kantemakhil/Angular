import { Component, OnInit } from '@angular/core';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Images } from '@commonbeans/Images';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';




@Component({
    selector: 'recent-offender',
    templateUrl: './recent-offender.component.html',
    styleUrls: []
})
export class RecentOffenderComponent implements OnInit {
    private unsubscribe: Subject<void> = new Subject<void>();
    constructor(private offenderSearchService: OffenderSearchService,
        private osiosearFactory: OsiosearService, private sessionManager: UserSessionManager, ) {

    }
    recentOffenders: any = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    imageModel: Images = new Images();

    ngOnInit() {
      this.offenderSearchService.recentOffenderUpdateObservable
       .pipe(takeUntil(this.unsubscribe))
       .subscribe(data => {
           this.getRecentOffendersList();
       });
    }

    onOffenderclick(recentOffenderData: any) {
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel.offenderIdDisplay = recentOffenderData.offenderIdDisplay;
        // this.vHeaderBlockModel.offenderId = recentOffenderData.offenderId;
        // this.vHeaderBlockModel.offenderBookId = recentOffenderData.offenderBookId;
        this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
        const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery( this.vHeaderBlockModel );
        offbkGlobal.subscribe( list => {
            if ( list.length > 0 ) {
                this.vHeaderBlockModel = list[0];
                if ( list[0].imageId != null ) {
                    this.imageModel.imageId = list[0].imageId;
                    this.osiosearFactory.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                        this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                });
                }
                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                this.offenderSearchService.setOffenderStatus('recentOffender'); 
            } else {
                this.vHeaderBlockModel = new VHeaderBlock();
                this.offenderSearchService.selectedOffender = undefined;
                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                this.offenderSearchService.setOffenderStatus('recentOffender'); 
            }
        } );
    }

    getRecentOffendersList() {
        this.recentOffenders = [];
        this.osiosearFactory.getRecOffendersList(this.sessionManager.currentCaseLoad).subscribe(data => {
            if ( data.length > 0 ) {
                this.recentOffenders = data;
                for ( let i = 0; i < this.recentOffenders.length; i++ ) {
                    if (this.recentOffenders[i].imageId) {
                        this.imageModel.imageId = this.recentOffenders[i].imageId;
                        this.osiosearFactory.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                            for ( let j = 0; j < this.recentOffenders.length; j++ ) {
                                if ( this.recentOffenders[j].offenderBookId == imageData[0].imageObjectId ) {
                                    this.recentOffenders[j].image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                                }
                            }
                        });
                    }
                }
            } else {
                this.recentOffenders = [];
            }
         });
    }

}
