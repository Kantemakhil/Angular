import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { SentenceAggregates } from "../beans/SentenceAggregates";
import { OidsenkdService } from "../service/oidsenkd.service";
import { OidrplanService } from '@inst/movement-external/service/oidrplan.service';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-oidsenkd',
    templateUrl: './oidsenkd.component.html',
    styleUrls: ['./oidsenkd.component.scss']
} )
export class OidsenkdComponent implements OnInit {
    message = ' Invalid.';
    type = 'error';
    disabled: boolean;
    msglist = [];
    msgs: any[] = [];
    public selectedAggregates= -1;
    sentenceAggColDef: any[];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    sentenceAggrData: SentenceAggregates [] =[];
    exitLaunchBtn = false;
    screenId="";
    constructor(public translateService: TranslateService,
            private offenderSearchService: OffenderSearchService,
            private oidsenkdService : OidsenkdService,
            private oidrplanFactory: OidrplanService,
            private router: Router
            ) {}
    ngOnInit(){
        this.screenId="oidsenkd";
        if (this.oidrplanFactory.launchFlag) {
            this.exitLaunchBtn = true;
        }
        this.sentenceAggColDef=[
                                {
                                    fieldName: this.translateService.translate('oidsenkd.sentCalcType'),
                                    field: 'sentenceCalcType', editable: false, width: 160 
                                },
                                {
                                    fieldName: this.translateService.translate('oidsenkd.startDate'),
                                    field: 'startDate', editable: false, width: 160,datatype:'date' 
                                },
                                {
                                    fieldName: this.translateService.translate('oidsenkd.terms'),
                                    field: 'sentenceTerm', editable: false, width: 160,
                                },
                                {
                                    fieldName: this.translateService.translate('oidsenkd.remmision'),
                                    field: 'remissionElg', editable: false, width: 160,
                                },
                                {
                                    fieldName: this.translateService.translate('oidsenkd.adjustment'),
                                    field: 'aggregateAdjustDays', editable: false, width: 160,
                                },
                                {
                                    fieldName: this.translateService.translate('oidsenkd.red'),
                                    field: 'ardCalculatedDate', editable: false, width: 160,datatype:'date' 
                                },
                                {
                                    fieldName: this.translateService.translate('oidsenkd.ped'),
                                    field: 'pedCalculatedDate', editable: false, width: 160,datatype:'date' 
                                },
                                {
                                    fieldName: this.translateService.translate('oidsenkd.lrd'),
                                    field: 'crdCalculatedDate', editable: false, width: 160,datatype:'date'  
                                },
                                {
                                    fieldName: this.translateService.translate('oidsenkd.supd'),
                                    field: 'sedCalculatedDate', editable: false, width: 160,datatype:'date' 
                                },
                                ];
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
       
    }
    
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.sentenceAggrData=[];
            this.oidsentAggreExecuteQuery();
            } else {
                this.sentenceAggrData=[];
                }
        }
    
    oidsentAggreExecuteQuery() {
        const sentAggr = this.oidsenkdService.populateSentenceAggregateData(this.vHeaderBlockModel.offenderBookId);
        sentAggr.subscribe(list => {           
            this.sentenceAggrData = list;
            this.selectedAggregates=0;
        });
    }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
        }
    onExitBtnClick = () => {
        if (this.oidrplanFactory.launchFlag) {
            this.oidrplanFactory.launchFlag = false;
            this.router.navigate(['/OIDRPLAN']);
        }
        return true;
    }
   
}
