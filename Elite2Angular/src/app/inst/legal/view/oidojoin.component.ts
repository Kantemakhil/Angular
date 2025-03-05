import {
    Component,
    OnInit
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { PriorHistory } from "../beans/PriorHistory";
import { OidojoinService } from "../service/oidojoin.service";
import { ActivatedRoute } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { OcdclistService } from '@instlegalscreens/service/ocdclist.service';
import { PriorHistoryCommitBean } from "../beans/PriorHistoryCommitBean";
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component( {
    selector: 'app-oidojoin',
    templateUrl: './oidojoin.component.html',
    styleUrls: ['./oidojoin.component.scss']
} )
export class OidojoinComponent implements OnInit {
    message = ' Invalid.';
    type = 'error';
    disabled: boolean;
    msglist = [];
    msgs: any[] = [];
    sysDate: any;
    sysDateFormat: any;
    booking: any;
    priorHistoryDate: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    joinColumndef: any[];
    priorHistoryDataModel: PriorHistory = new PriorHistory();
    priorHistoryData: PriorHistory[] = [];
    priorHistoryCommitModel: PriorHistoryCommitBean = new PriorHistoryCommitBean();
    public selected = -1;
    imageModel: Images = new Images();
    priorHistoryInsertList: PriorHistory[] = [];
    priorHistoryUpdateList: PriorHistory[] = [];
    priorHistoryDeleteList: PriorHistory[] = [];
    selectedPriorHistory:PriorHistory = new PriorHistory();
    selectedPriorHistoryData : PriorHistory = new PriorHistory();
    alertDisable:boolean;
    public gridIndex =0;
    constructor( private offenderSearchService: OffenderSearchService, public translateService: TranslateService,
        public oidojoinService: OidojoinService, private sessionManager: UserSessionManager, public ocdclistService: OcdclistService, private activatedRoute: ActivatedRoute, private osiosearchService: OsiosearService )
    { }
    ngOnInit() {
        if ( this.ocdclistService.selectedRow ) {
            this.ocdclistService.selectedRow = false;

        }
        this.alertDisable=true;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
        }
        this.joinColumndef = [
            {
                fieldName: this.translateService.translate( 'oidjoin.date' ), field: 'priorHistoryDate', editable: true, width: 100, datatype: 'date'

            },
            {
                fieldName: this.translateService.translate( 'oidjoin.type' ),
                field: 'type', editable: true, width: 160, datatype: 'lov',domain:'OFFENCE_TYPE'/* link: '/oidojoin/orderType'*/

            },


            {
                fieldName: this.translateService.translate( 'oidjoin.offense.description' ),
                field: 'offenseDescription', editable: true, width: 180
            },
            {
                fieldName: this.translateService.translate( 'oidjoin.status' ),
                field: 'status', editable: true, width: 150, datatype: 'lov', domain:'OFFENCE_STS'/*link: '/oidojoin/status'*/

            },

            {
                fieldName: this.translateService.translate( 'oidjoin.source' ),
                field: 'source', editable: true, width: 160, datatype: 'lov', domain:'INFO_SOURCE'//link: '/oidojoin/source'

            },

            {
                fieldName: this.translateService.translate( 'oidjoin.country' ),
                field: 'country', editable: true, width: 160, maxlength: 130, datatype: 'lov',domain:'COUNTRY'// link: '/oidojoin/county'

            },


            {
                fieldName: this.translateService.translate( 'oidjoin.state' ),
                field: 'state', editable: true, width: 150, datatype: 'lov',domain:'PROV_STATE'// link: '/oidojoin/state'
            },

            {
                fieldName: this.translateService.translate( 'oidjoin.verified' ),
                field: 'verified', editable: true, width: 140, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate( 'oidjoin.comment' ),
                field: 'comment', editable: true, width: 140
            },

        ];

    }
      
    /*
     * Calling function to populate data in grid when offender changes
     */
    onOffenderChange(offender) {
       
        this.vHeaderBlockModel = offender;
        if ( offender ) {
            this.joinColumndef = [];
            this.oidojoinExecuteQuery();

        } else {
            
            this.joinColumndef = [];
            this.priorHistoryData=[];
            this.alertDisable=true;
            
        }
    }

    /*
     * TO show messages on the screen*/
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }
    /*
     * To populate data in Oidojoin grid 
     * */
    oidojoinExecuteQuery() {
        this.priorHistoryData=[];
        if ( this.vHeaderBlockModel.offenderBookId != null ) {
            let queryParams = {
                offenderBookId: this.vHeaderBlockModel.offenderBookId
            }
            const priorHistoryData = this.oidojoinService.populateGridData( queryParams );
            priorHistoryData.subscribe( list => {
                this.priorHistoryData = list;
                this.selected = 0;
                if(this.priorHistoryData.length>0) {
                    this.alertDisable=false;
                }else {
                    this.alertDisable=true;
                }
                for(let i=0;i<list.length;i++) {
                list[i].verified = list[i].verified === 'Y' ? true : false;       
                    }
            });
           

        }else {
         
            this.priorHistoryData=[];
        }
    }
    priorHistoryInsert = () => {
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }
        this.alertDisable = true;
        return {
            'type': ''
        }
    }
                
   onRowClickPriorHistory(event) {
       
       if(event!=null && event.offenseSeq!=null) {
           this.alertDisable=false;
       }
   }             
    saveGridData(event){
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }
        this.priorHistoryInsertList = event.added;
        this.priorHistoryUpdateList = event.updated;
        this.priorHistoryDeleteList = event.removed;
        this.priorHistoryCommitModel.insertList = [];
        this.priorHistoryCommitModel.updateList = [];
        this.priorHistoryCommitModel.deleteList = [];
        this.sysDate = DateFormat.getDate();
        
        if(this.priorHistoryInsertList.length > 0 ) {
            for(let i=0;i<this.priorHistoryInsertList.length;i++) {
            if ( this.priorHistoryInsertList[i].priorHistoryDate === null || this.priorHistoryInsertList[i].priorHistoryDate === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'oidojoin.offensedatemustbeenter' );
            this.show();
            return;
        }
        if ( this.priorHistoryInsertList[i].offenseDescription === null || this.priorHistoryInsertList[i].offenseDescription === undefined ||this.priorHistoryInsertList[i].offenseDescription==='') {
            this.type = 'warn';
            this.message = this.translateService.translate( 'oidojoin.offensedescriptionmustbeenter' );
            this.show();
            return;
        }
            this.priorHistoryInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const datePipe = new DatePipe( 'en-US' );
            this.priorHistoryDate = datePipe.transform( this.priorHistoryInsertList[i].priorHistoryDate, 'yyyy/MM/dd' );
            this.priorHistoryInsertList[i].priorHistoryDate = new Date( this.priorHistoryDate );
            this.sysDateFormat = datePipe.transform(this.sysDate, 'yyyy/MM/dd' );
            
            if (this.priorHistoryDate > this.sysDateFormat || this.priorHistoryDate == this.sysDateFormat) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oidojoin.offensedatecannotbepostdated' );
                this.show();
                return;
            }
            this.priorHistoryInsertList[i].createDateTime = DateFormat.getDate();
            this.priorHistoryInsertList[i].modifyDateTime = DateFormat.getDate();
            this.priorHistoryInsertList[i].createUserId = this.sessionManager.getId();
            this.priorHistoryInsertList[i].modifyUserId = this.sessionManager.getId();
            }
            }
    if( this.priorHistoryUpdateList.length>0 ) {
        for ( let i = 0; i < this.priorHistoryUpdateList.length; i++ ) {
            this.priorHistoryUpdateList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
            if ( this.priorHistoryUpdateList[i].priorHistoryDate === null || this.priorHistoryUpdateList[i].priorHistoryDate === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oidojoin.offensedatemustbeenter' );
                this.show();
                return;
            }
            if ( this.priorHistoryUpdateList[i].offenseDescription === null || this.priorHistoryUpdateList[i].offenseDescription === undefined ||this.priorHistoryUpdateList[i].offenseDescription==='') {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oidojoin.offensedescriptionmustbeenter' );
                this.show();
                return;
            }
            const datePipe = new DatePipe( 'en-US' );
            this.priorHistoryDate = datePipe.transform( this.priorHistoryUpdateList[i].priorHistoryDate, 'yyyy/MM/dd' );
            this.priorHistoryUpdateList[i].priorHistoryDate = new Date( this.priorHistoryDate );
            this.sysDateFormat = datePipe.transform(this.sysDate, 'yyyy/MM/dd' );
            if (this.priorHistoryDate > this.sysDateFormat || this.priorHistoryDate == this.sysDateFormat) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oidojoin.offensedatecannotbepostdated' );
                this.show();
                return;
            }   
            this.priorHistoryUpdateList[i].createDateTime = DateFormat.getDate();
            this.priorHistoryUpdateList[i].modifyDateTime = DateFormat.getDate();
            this.priorHistoryUpdateList[i].createUserId = this.sessionManager.getId();
            this.priorHistoryUpdateList[i].modifyUserId = this.sessionManager.getId();
           
        }
    }    
    this.priorHistoryCommitModel.insertList = this.priorHistoryInsertList;
    this.priorHistoryCommitModel.updateList = this.priorHistoryUpdateList;
        this.priorHistoryCommitModel.deleteList = this.priorHistoryDeleteList;
        const priorHistorySaveData = this.oidojoinService.newGridRecord( this.priorHistoryCommitModel );
        priorHistorySaveData.subscribe( priorHistorySaveResult => {
            if ( priorHistorySaveResult === 1 ) {
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.oidojoinExecuteQuery();
                this.show();
                return;
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                return;
            }
        } );
    
    
}
}