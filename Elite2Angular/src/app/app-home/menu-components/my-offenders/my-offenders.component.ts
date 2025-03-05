import { Component, OnInit } from '@angular/core';
import { VHeaderBlock } from "@commonbeans/VHeaderBlock";
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { UserSessionManager } from '@core/classes/userSessionManager';


@Component( {
    selector: 'my-offenders',
    templateUrl: './my-offenders.component.html',
    styleUrls: []
} )
export class MyOffendersComponent implements OnInit {

    assignedOffendersList = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    imageModel: Images = new Images();
    image: any;
    constructor(private offenderSearchService: OffenderSearchService, private osiosearFactory: OsiosearService,
        private sessionManager: UserSessionManager) { }

    ngOnInit() { }

    onOffenderclick( event ) {
        let inputVHeaderBlockModel = new VHeaderBlock();        
        inputVHeaderBlockModel.offenderIdDisplay = event.offenderIdDisplay;
        inputVHeaderBlockModel.offenderId = event.offenderId;
        inputVHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
        const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery( inputVHeaderBlockModel );
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
            } else {
                this.vHeaderBlockModel = new VHeaderBlock();
                this.offenderSearchService.selectedOffender = undefined;
            }
        } );
    }

    getAssignedOffenders() {
        this.assignedOffendersList = [];
        if (this.sessionManager.currentCaseLoadType === 'COMM') {
            this.osiosearFactory.getAssignedOffendersList(this.sessionManager.currentCaseLoadType).subscribe(data => {
                if (data.length > 0) {
                    this.assignedOffendersList = data;
                    for (var i = 0; i < this.assignedOffendersList.length; i++) {
                        if (this.assignedOffendersList[i].imageId) {
                            this.imageModel.imageId = this.assignedOffendersList[i].imageId;
                            this.osiosearFactory.imageExecuteQuery(this.imageModel).subscribe(imageData => {
                                for (let j = 0; j < this.assignedOffendersList.length; j++) {
                                    if (this.assignedOffendersList[j].offenderBookId == imageData[0].imageObjectId)
                                        this.assignedOffendersList[j].image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                                }
                            });
                        }
                    }
                }
            });
        }
    }

}


