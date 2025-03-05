import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { ActivatedRoute } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { OcdclistService } from '@instlegalscreens/service/ocdclist.service';
import { OidsenhyService } from '../service/oidsenhy.service';
import { SentenceHistory } from "../beans/SentenceHistory";
import { KeyDates } from "../beans/KeyDates";
import { KeyDatesService } from "../service/keyDates.service";
@Component( {
    selector: 'app-oidsenhy',
    templateUrl: './oidsenhy.component.html',
    styleUrls: ['./oidsenhy.component.scss']
} )
export class OidsenhyComponent implements OnInit {
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    msgs: any[] = [];
    sysDate: any;
    sysDateFormat: any;
    booking: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    historyColumndef: any[];
    public selected = -1;
    sentenceHistoryData: SentenceHistory[] = [];
    imageModel: Images = new Images();
    selectedSentCalculationId:number;
    keydatesDef: any[];
    keyDatesData: KeyDates[]=[];
    parentScreenId:string="";
    constructor( private offenderSearchService: OffenderSearchService, public translateService: TranslateService,
                 private keyDatesService: KeyDatesService,
        public oidsenhyService: OidsenhyService, private sessionManager: UserSessionManager, public ocdclistService: OcdclistService, private activatedRoute: ActivatedRoute, private osiosearchService: OsiosearService )
    { }
    ngOnInit() {
        this.parentScreenId="oidsenhy";
        if ( this.ocdclistService.selectedRow ) {
            this.ocdclistService.selectedRow = false;

        }
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
        }
        this.historyColumndef = [
            {
                fieldName: this.translateService.translate( 'oidsenhy.date' ), field: 'date', editable: false, width: 100,
                datatype:'date'
            },
            {
                fieldName: this.translateService.translate( 'oidsenhy.time' ),
                field: 'time', editable: false, width: 160

            },


            {
                fieldName: this.translateService.translate( 'oidsenhy.calculation.reason' ),
                field: 'calculationReason', editable: false, width: 180
            },
            {
                fieldName: this.translateService.translate( 'oidsenhy.staffname' ),
                field: 'staffName', editable: false, width: 150

            },

            {
                fieldName: this.translateService.translate( 'oidsenhy.comment' ),
                field: 'comment', editable: false, width: 160

            }

        ];
        
        this.keydatesDef=[
                          {
                              fieldName: this.translateService.translate('keydates.Keydate'),
                              field: 'keyDates', editable: false, width: 200,
                          },
                          {
                              fieldName: this.translateService.translate('keydates.calcdate'),
                              field: 'calculatedDate', editable: false, width: 200,datatype:'date' 
                          },
                          {
                              fieldName: this.translateService.translate('keydates.overridedate'),
                              field: 'overrideDate', editable: false, width: 200,datatype:'date'
                          },
                          ];

    }
    
    /*
     * Calling function to populate data in grid when offender changes
     */
    onOffenderChange(offender) {
       
        this.vHeaderBlockModel = offender;
        if ( offender ) {
            this.historyColumndef = [];
            this.oidsenhyExecuteQuery();

        } else {
            
            this.historyColumndef = [];
            this.sentenceHistoryData=[];
            this.keyDatesData=[];
        }
    }
    onRowClickHistoryEvent(event) {
    this.selectedSentCalculationId=event.offenderSentCalculationId;
    this.populateKeyDates(this.selectedSentCalculationId);
    }
    
    populateKeyDates(sentCalculationId){
        const keydatesLabels = this.keyDatesService.fetchKeyDates(this.parentScreenId);
        keydatesLabels.subscribe(list=>{
            this.keyDatesData = list;
            for(let i=0;i<list.length;i++) {
                this.keyDatesData[i].sentCalculationId = sentCalculationId;
            }
            const keyDates =  this.oidsenhyService.populateKeyDatesValues(list);
            keyDates.subscribe(valueObj => {
                this.keyDatesData=valueObj;
                for(let i=0;i<this.keyDatesData.length;i++) {
                if(this.keyDatesData[i].profileType2=="N") {
                    this.keyDatesData[i].calculatedDate=this.keyDatesData[i].overrideDate;
                    this.keyDatesData[i].overrideDate=null;
                }
             }
            });
        });
    }
    /*
     * TO show messages on the screen*/
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }
    /*
     * To populate data in Oidsenhy grid 
     * */
    oidsenhyExecuteQuery() {
       
        this.sentenceHistoryData=[];
        if ( this.vHeaderBlockModel.offenderBookId != null ) {
            let queryParams = {
                offenderBookId: this.vHeaderBlockModel.offenderBookId
            }
            const sentenceHistoryData = this.oidsenhyService.populateSentenceHistoryData(queryParams);
            sentenceHistoryData.subscribe( list => {
                this.sentenceHistoryData = list;
                this.selected = 0;
        });
    }else {
        
        this.sentenceHistoryData=[];
    }
}
    
   
}