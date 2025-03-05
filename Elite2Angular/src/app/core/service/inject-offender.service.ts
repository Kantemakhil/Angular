import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { ActivatedRoute } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { Images } from "@commonbeans/Images";

@Injectable({providedIn: 'root'})
export class InjectOffenderService {
    constructor(private http: HttpService, private sessionManager: UserSessionManager, private osiosearchService: OsiosearService, private offenderSearchService: OffenderSearchService,private osiosearService: OsiosearService) { }
    imageModel: Images = new Images();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    
    injectOffender(activatedRoute: ActivatedRoute ) {
        activatedRoute.queryParams.subscribe(params => {
        let offenderidDisplay = params['offenderIdDisplay']; 
             if(offenderidDisplay) {
                 this.offenderSearchService.selectedOffender = undefined;
                 let vHead = new VHeaderBlock();
                 vHead.offenderIdDisplay = offenderidDisplay+"";
                 vHead.agyLocId = this.sessionManager.currentCaseLoad;
                 const offbkGlobal =this.osiosearchService.offbkgGlobalQuery(vHead);
                 offbkGlobal.subscribe(list => {
                     if (list.length > 0) {
                         this.vHeaderBlockModel = list[0];
                         if ( list[0].imageId != null ) {
                             this.imageModel.imageId = list[0].imageId;
                             this.osiosearService.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                                 this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                         });     
                         }
                         this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                     } else {
                         this.offenderSearchService.selectedOffender = undefined;
                     }
                 });
                            
             } 
         });
    }
    
    injectOffenderInService(activatedRoute: ActivatedRoute ) {
        activatedRoute.queryParams.subscribe(params => {
        let offenderid = params['offenderId']; 
             if(offenderid) {
                 this.offenderSearchService.selectedOffender = undefined;
                 let vHead = new VHeaderBlock();
                 //vHead.offenderId = offenderid;
                 vHead.offenderId = offenderid;
                 vHead.agyLocId = this.sessionManager.currentCaseLoad;
                 const offbkGlobal =this.osiosearchService.offbkgGlobalQuery(vHead);
                 offbkGlobal.subscribe(list => {
                     if (list.length > 0) {
                             this.vHeaderBlockModel = list[0];
                             if ( list[0].imageId != null ) {
                                 this.imageModel.imageId = list[0].imageId;
                                 this.osiosearService.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                                     this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                             });     
                         }
                         this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                     } else {
                         this.offenderSearchService.selectedOffender = undefined;
                     }
                 });
                            
             } 
         });
    }
    
    
    
    updateOffenderInContext(offenderid) {
        if(offenderid) {
            let vHead = new VHeaderBlock();
            vHead.offenderId = offenderid;
            vHead.agyLocId = this.sessionManager.currentCaseLoad;
            const offbkGlobal =this.osiosearchService.offbkgGlobalQuery(vHead);
            offbkGlobal.subscribe(list => {
                if (list.length > 0) {
                        this.vHeaderBlockModel = list[0];
                        if ( list[0].imageId != null ) {
                            this.imageModel.imageId = list[0].imageId;
                            this.osiosearService.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                                this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                        });     
                    }
                    this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                    //emit event to update header
                } else {
                    this.offenderSearchService.selectedOffender = undefined;
                }
            });
                       
        } 
    }
    
    
}