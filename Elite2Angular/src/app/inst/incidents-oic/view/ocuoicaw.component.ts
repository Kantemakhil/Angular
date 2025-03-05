import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuoicawService } from '../service/ocuoicaw.service';
import { OffenderOicSanctions } from '@instoicbeans/OffenderOicSanctions';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { OcuoicheService } from '@inst/incidents-oic/service/ocuoiche.service';
import { OicHearingResults } from '@instincidentsbeans/OicHearingResults';
import { OffenderOicSanctionsCommitBean } from '@instincidentsbeans/OffenderOicSanctionsCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OicHearings } from '@instincidentsbeans/OicHearings';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OidoicusService } from '@inst/incidents-oic/service/oidoicus.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ocuoicaw',
    templateUrl: './ocuoicaw.component.html'

})

export class OcuoicawComponent implements OnInit {
    @ViewChild('issueGrid') issueGrid: any;
    // Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    oichearModel: OicHearings = new OicHearings();
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    oicsancData: OffenderOicSanctions[] = [];
    oicsancDataTemp: OffenderOicSanctions[] = [];
    oicsancModel: OffenderOicSanctions = new OffenderOicSanctions();
    oicsancModelTemp: OffenderOicSanctions = new OffenderOicSanctions();
    oicsancModelSan: OffenderOicSanctions = new OffenderOicSanctions();
    oicsancIndex: number;
    oicsancInsertList: OffenderOicSanctions[] = [];
    oicsancUpdatetList: OffenderOicSanctions[] = [];
    oicsancDeleteList: OffenderOicSanctions[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    editable: boolean;
    rgothersanctionsRg: any[] = [];
    rgsanctRg: any[] = [];
    rgsanctstRg: any[] = [];
    columnDefs: any[];
    updateList: any[] = [];
    translateLabel: any;
    oichearingModel: OicHearingResults = new OicHearingResults();
    oicsancCommitModel = new OffenderOicSanctionsCommitBean();
    public gridOptions: GridOptions;
    VHeaderBlockModel: VHeaderBlock;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    sanctionMonths: number;
    sanctionDays: number;
    selectedRow = -1;
    issueGridInsert: boolean;
    issueGridUpdate: boolean;
    commentsFlag: boolean;
    isDisabel: boolean;
    termExceed:string;
    constructor(private ocuoicawFactory: OcuoicawService, private ocuoicheFactory: OcuoicheService,
        private oidoicusFactory: OidoicusService,
        public translateService: TranslateService,private eoffenderService: EoffenderService,
        private router: Router) {
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.issueGridInsert = this.dialog.data.queryOnly ? false : true;
        this.issueGridUpdate = this.dialog.data.queryOnly ? false : true;
        this.commentsFlag = this.dialog.data.queryOnly ? true : false;
        this.isDisabel = this.dialog.data.queryOnly? true : false;
        this.ocuoicawFactory.offBookID = this.ocuoicheFactory.offenderBookId;
        this.oicsancModelSan.resultSeq = this.dialog.data.resultSeq;
        this.oichearingModel.oicHearingId = this.dialog.data.oicHearingId;
        this.oichearingModel.oicOffenceCode = this.dialog.data.resultOicOffenceCode;
        this.oichearingModel.chargeDescriptionResult = this.dialog.data.chargeDescriptionResult;
        this.oichearingModel.typeResult = this.dialog.data.typeResult;
        this.oicsancModelSan.offenderBookId = this.oicsancModel.offenderBookId;
        this.oicsancModelSan.oicIncidentId = this.oicsancModel.oicIncidentId;
        this.columnDefs = [
            {
                fieldName: this.translateService.translate('ocuoicaw.line'), field: 'sanctionSeq',
                editable: false, width: 100, filter: 'text', pinned: true, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.type') + '*', field: 'oicSanctionCode',
                editable: true, width: 150, datatype: 'lov', domain:'OIC_SANCT'/*link: 'ocuoicaw/rgSanctRecordGroup'*/, optionWidth: 500
            },
            {
                fieldName: this.translateService.translate('ocuoicaw.months'), field: 'sanctionMonths',
                editable: true, width: 150, datatype: 'number', minInput:'1',strictFP: true,
                maxValue: '12' , whole:true
            },
            {
                fieldName: this.translateService.translate('ocuoicaw.days'), field: 'sanctionDays',
                editable: true, width: 100, datatype: 'number',minInput:'1',strictFP: true,maxValue: '31' , whole:true
            },
            {
                fieldName: this.translateService.translate('ocuoicaw.restitution'), field: 'compensationAmount',
                editable: true, width: 150, datatype: 'number', maxValue : 999999999.99,
                strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('common.effectivedate') + '*', field: 'effectiveDate',
                editable: true, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocuoicaw.consecutivetoline'), field: 'consecutiveSanctionSeq',
                editable: false, width: 150, datatype: 'text', updateField: 'row',cellEditable: this.canconsecutiveSanctionSeq
            },
            {
                fieldName: '', field: 'button',  datatype: 'hyperlink', displayas: 'href', styleClass: 'search', link: '/ocuoicawpopup', data: 'row',
                updateField: 'row', modal: true, width: 150, dialogWidth: '80',isDisable: this.disableCell,
            },
            {
                fieldName: this.translateService.translate('common.oic'), field: 'oicIncidentId',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.status') + '*', field: 'status',
                editable: true, width: 150, datatype: 'lov', domain:'OIC_SANCT_ST'/*link: 'ocuoicaw/rgSanctStRecordGroup'*/, optionWidth: 500
            },
            {
                fieldName: this.translateService.translate('ocuoicaw.statusdate'), field: 'statusDate',
                editable: true, width: 150, datatype: 'date'
            },
            { fieldName: '', field: 'commentText', hide: true }
        ];
        this.gridOptions = <GridOptions>{
            editType: '',
            enableSorting: true,
            enableFilter: true,
            pagination: true,
            floatingFilter: false,
            paginationPageSize: 5,
            animateRows: true,
        };
        this.executeQuery();
    }

    disableCell = (data: any, index: number, field: string): boolean => {
		if (!this.isDisabel) {
			return false;
		} else {
			return true;
		}
	}
    chargesEvent = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.sanctionMonths = event.newValue;
        this.sanctionDays = event.newValue;
        if (event.field === 'sanctionMonths') {
            if (this.sanctionMonths) {
                if (event.data.sanctionMonths < 0 || event.data.sanctionMonths > 999) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoicaw.fieldmustbeform');
                    this.show();
                    return;
                }
            }

        }
        if (event.field === 'sanctionDays') {
            if (this.sanctionDays) {
                if (event.data.sanctionDays.length > 4) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoicaw.fieldmustbeform');
                    this.show();
                    return;

                }
            }
        }
        if (event.data.compensationAmount) {
            if (event.field === 'compensationAmount' && Number(event.newValue) !== Number(event.oldValue)) {
                if (event.newValue) {
                    this.issueGrid.setColumnData('compensationAmount', rowIndex,
                        Number(event.newValue).toFixed(2));
                }
            }
        }

        if (event.data.oicSanctionCode) {
            this.oicsancModel.oicHearingId = this.dialog.data.oicHearingId;
            this.oicsancModel.oicSanctionCode = event.data.oicSanctionCode
            let a = event.data.sanctionMonths === undefined ? 0 : event.data.sanctionMonths * 30
            let b = event.data.sanctionDays === undefined ? 0 : event.data.sanctionDays
            var c = Number(a) + Number(b)
            this.termExceed = 'Y';
            this.ocuoicawFactory.getHearingType(this.oicsancModel).subscribe(data => {
                if (c > (data.maxMonth * 30 + data.maxDays)) {
                    this.termExceed = 'N'
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoicaw.thistermexceeds');
                    this.show();
                    return;
                }

            });
        }
        rowdata.validated = true;
        return rowdata;
    }
     
    canconsecutiveSanctionSeq= (data: any, index: number, field: string): boolean => {
        if (data.consecutiveSanctionSeq) {
            return true;
        } else {
            return false;
        }
    }
   
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    
      

    
    onGridInsert = () => {
        if (this.oicsancData.length > 0) {
            if (!this.oicsancData[this.oicsancData.length - 1].oicSanctionCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.typemustbeentered');
                this.show();
                return;
            }
        }
        const tempStr = 'test';
        return {
            date: DateFormat.getDate(), consecutiveSanctionSeq: '', oicIncidentId: ''
        };
    }
    cancel() {
        this.dialog.close(null);
    }
    isInsertable(event) {
        const index = this.oicsancData.indexOf(this.oicsancModel);
        this.issueGrid.setColumnData('commentText', index, event);
    }

    setMask = (index, col, data) => {
        const reg = /[0-9 .]/;
        const mask = [];
        for (let i = 0; i < 13; i++) {
            mask.push(reg);
        }
        return {
            mask: mask,
            placeholderChar: ' '
        };
    }



    /**
     *  This function will be executed when commit event is
    * fired
    */
    saveoicsancForm(event) {
        if (this.ocuoicheFactory.hearingdata) {
            this.oicsancModelSan.oicHearingId = this.ocuoicheFactory.hearingdata.oicHearingId;
            this.oicsancModelSan.oicIncidentId = this.ocuoicheFactory.hearingdata.oicIncidentId;
            this.ocuoicheFactory.hearingdata = {};
        }
        this.oicsancInsertList = event.added;
        this.oicsancUpdatetList = event.updated;
        this.oicsancCommitModel.insertList = [];
        this.oicsancCommitModel.updateList = [];

        if( this.termExceed==='N'){
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoicaw.thistermexceeds');
            this.show();
            return;
        }
        if (this.oicsancInsertList.length > 0) {
            for (let i = 0; i < this.oicsancInsertList.length; i++) {
                if (!this.oicsancInsertList[i].oicSanctionCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.typemustbeentered');
                    this.show();
                    return;
                }
                if (!this.oicsancInsertList[i].effectiveDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoicaw.effectivedata');
                    this.show();
                    return;
                }
                if (!this.oicsancInsertList[i].status) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoicaw.statusocu');
                    this.show();
                    return;
                }
                if ((DateFormat.compareDate(DateFormat.getDate(this.ocuoicheFactory.hearingdate),
                    DateFormat.getDate(this.oicsancInsertList[i].effectiveDate)) === 1)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoicaw.effectivedate');
                    this.show();
                    return;
                }
                this.oicsancInsertList[i].offenderBookId = this.ocuoicheFactory.offenderBookId;
                this.oicsancInsertList[i].oicHearingId = this.oichearingModel.oicHearingId;
                this.oicsancInsertList[i].resultSeq = this.oicsancModelSan.resultSeq;
                this.oicsancInsertList[i].oicIncidentId = this.oicsancModelSan.oicIncidentId;
            }
        }
        this.oicsancCommitModel.insertList = this.oicsancInsertList;
        if (this.oicsancUpdatetList.length > 0) {
            for (let i = 0; i < this.oicsancUpdatetList.length; i++) {
                if (!this.oicsancUpdatetList[i].oicSanctionCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.typemustbeentered');
                    this.show();
                    return;
                }
                if (!this.oicsancUpdatetList[i].effectiveDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoicaw.effectivedata');
                    this.show();
                    return;
                }
                if (!this.oicsancUpdatetList[i].status) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoicaw.statusocu');
                    this.show();
                    return;
                }
                if ((DateFormat.compareDate(DateFormat.getDate(this.ocuoicheFactory.hearingdate),
                    DateFormat.getDate(this.oicsancUpdatetList[i].effectiveDate)) === 1)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoicaw.effectivedate');
                    this.show();
                    return;
                }
            }
        }
        this.oicsancCommitModel.updateList = this.oicsancUpdatetList;
        const oicsancSaveData = this.ocuoicawFactory.
            oicSancCommit(this.oicsancCommitModel);
        oicsancSaveData.subscribe(oicsancSaveResult => {
            if (oicsancSaveResult[0] === 0) {
                return;
            } else {
                for (let i = 0; i < oicsancSaveResult.length; i++) {
                    this.oicsancModel.sanctionSeq = oicsancSaveResult[i].oicsancSaveResult;
                }
                this.executeQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.executeQuery();
            }
        });
    }

    executeQuery() {
        this.oicsancModel = new OffenderOicSanctions();
        this.oicsancModel.oicHearingId = this.oichearingModel.oicHearingId;
        this.oicsancModel.resultSeq = this.oicsancModelSan.resultSeq;
        const oicsancResult = this.ocuoicawFactory.oicSancExecuteQuery(this.oicsancModel);
        oicsancResult.subscribe(oicsancResultList => {
            if (oicsancResultList.length === 0) {
                this.oicsancData = [];
            } else {
                for (let i = 0; i < oicsancResultList.length; i++) {
                    if (oicsancResultList[i].compensationAmount || oicsancResultList[i].compensationAmount === 0) {
                        oicsancResultList[i].compensationAmount = Number(oicsancResultList[i].compensationAmount).toFixed(2);
                    }
                    oicsancResultList[i].button = '';
                }
                this.oicsancData = oicsancResultList;
                this.ocuoicawFactory.oicsancDataTemp = this.oicsancData;
                this.selectedRow = 0;
            }
        });
    }
    onRowClickoicsanc(event) {
        if (event) {
            this.oicsancModel = event;
            this.oicsancModel.commentText = event.commentText;
            if (event.createDatetime) {
                this.eoffenderService.selectedRowData=event;
                this.eoffenderService.selectedRowData['oicIncidentId']=this.dialog.data.oicIncidentId;
                this.eoffenderService.selectedRowData['agencyIncidentId']=this.dialog.data.agencyIncidentId;
            } else {
                this.eoffenderService.selectedRowData=null;
            }
        } else {
            this.oicsancModel = new OffenderOicSanctions();
            this.eoffenderService.selectedRowData=null;
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    ngOnDestroy() {
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
    }

}

