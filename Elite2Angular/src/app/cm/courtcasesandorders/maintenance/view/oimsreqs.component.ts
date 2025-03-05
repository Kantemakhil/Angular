import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimsreqsService } from '../service/oimsreqs.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SentenceCalcTypes } from '../beans/SentenceCalcTypes';
import { SentenceTerms } from '../beans/SentenceTerms';
import { SentenceUpdateReasons } from '../beans/SentenceUpdateReasons';
import { SentenceTermsCommitBean } from '../beans/SentenceTermscommitBean';
import { SentenceUpdateReasonscommitBean } from '../beans/SentenceUpdateReasonscommitBean';
import { SentenceCalcTypesCommitBean } from '../beans/SentenceCalcTypesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { SentenceCustodyStatus } from '../beans/SentenceCustodyStatus';
import { SentenceCustodyStatusCommitBean } from '../beans/SentenceCustodyStatusCommitBean';
import { AppConstants } from '@core/classes/appConstants';


@Component({
    selector: 'app-oimsreqs',
    templateUrl: './oimsreqs.component.html'
})

export class OimsreqsComponent implements OnInit {
    @ViewChild('sencalcgrid', {static: true}) sencalcgrid: any;
    @ViewChild('sentermgrid', {static: true}) sentermgrid: any;
    @ViewChild('senupdategrid', {static: true}) senupdategrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    sencalcData: SentenceCalcTypes[] = [];
    sencalcDatabaseData: SentenceCalcTypes[] = [];
    sencalcDataTemp: SentenceCalcTypes[] = [];
    sencalcModel: SentenceCalcTypes = new SentenceCalcTypes();
    sencalcSearchModel: SentenceCalcTypes = new SentenceCalcTypes();
    sencalcIndex: Number = 0;
    sencalcInsertList: SentenceCalcTypes[] = [];
    sencalcUpdatetList: SentenceCalcTypes[] = [];
    sencalcDeleteList: SentenceCalcTypes[] = [];
    sentermsData: SentenceTerms[] = [];
    sentermsDataTemp: SentenceTerms[] = [];
    sentermsModel: SentenceTerms = new SentenceTerms();
    sentermsIndex: Number = 0;
    sentermsInsertList: SentenceTerms[] = [];
    sentermsUpdatetList: SentenceTerms[] = [];
    sentermsDeleteList: SentenceTerms[] = [];
    senupdData: SentenceUpdateReasons[] = [];
    senupdDataTemp: SentenceUpdateReasons[] = [];
    senupdModel: SentenceUpdateReasons = new SentenceUpdateReasons();
    senupdModelTemp: SentenceUpdateReasons = new SentenceUpdateReasons();
    senupdIndex: Number = 0;
    senupdInsertList: SentenceUpdateReasons[] = [];
    senupdUpdatetList: SentenceUpdateReasons[] = [];
    senupdDeleteList: SentenceUpdateReasons[] = [];
    minDate: Date;
    display: Boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: Boolean;
    editable: Boolean = true;
    senUpdColumnDef: any[];
    senCalcColumnDef: any[];
    senTermsColumnDef: any[];
    senCalcReadOnly: Boolean = false;
    senTermsReadOnly: Boolean = false;
    senUpdReadOnly: Boolean = false;
    rgcatRg: any[] = [];
    rgsentRg: any[] = [];
    rgsvcoblRg: any[] = [];
    rgtermcodeRg: any[] = [];
    rgreasonRg: any[] = [];
    rgfunctiontypeRg: any[] = [];
    index: any;
    message = ' Invalid.';
    isFormChanged: any;
    tableIndex = -1;
    sencalcCommitModel: SentenceCalcTypesCommitBean = new SentenceCalcTypesCommitBean();
    sentermsCommitModel: SentenceTermsCommitBean = new SentenceTermsCommitBean();
    senupdCommitModel: SentenceUpdateReasonscommitBean = new SentenceUpdateReasonscommitBean();
    statusCode: any;
    grid: any;
    retriveDisabled: boolean;
    clearDisabled: boolean;
    namesReadOnly: boolean;
    delRecVar: boolean;
    sencalcDeleteEnable: boolean;
    sentermsDeleteEnable: boolean;
    senUpdDeleteEnable: boolean;
    enableIfRowDatExist: boolean;
    expiryDate: any;
    @ViewChild('custodygrid', { static: true }) custodygrid: any;
    custodyData: SentenceCustodyStatus[] = [];
    custodyColumnDef: any[];
    custodyInsertList: SentenceCustodyStatus[] = [];
    custodyUpdatetList: SentenceCustodyStatus[] = [];
    custodyDeleteList: SentenceCustodyStatus[] = [];
    custodyCommitModel: SentenceCustodyStatusCommitBean = new SentenceCustodyStatusCommitBean();
    custodyModel: SentenceCustodyStatus = new SentenceCustodyStatus();
    constructor(private oimsreqsFactory: OimsreqsService,
        public translateService: TranslateService, public sessionManager: UserSessionManager) {
        this.senUpdColumnDef = [];
        this.senCalcColumnDef = [];
        this.senTermsColumnDef = [];
    }
    ngOnInit() {
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.delRecVar = false;
        this.sencalcDeleteEnable = false;
        this.sentermsDeleteEnable = false;
        this.senUpdDeleteEnable = false;
        this.enableIfRowDatExist = false;
        this.senCalcColumnDef = [
            {
                fieldName: this.translateService.translate('common.category') + '*', field: 'sentenceCategory',
                editable: true, width: 150, datatype: 'lov', domain: 'CATEGORY',
                cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('common.code') + '*',
                field: 'sentenceCalcType', editable: true, width: 150, datatype: 'text', uppercase: true,
                maxlength: 12,  cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('common.description') + '*', field: 'description',
                editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 240
            },
            {
                fieldName: this.translateService.translate('common.type') + '*', field: 'sentenceType',
                editable: true, width: 150, datatype: 'lov', domain: 'SENT_TYPE'
            },
            {
                fieldName: this.translateService.translate('oimsreqs.populateheader'), field: 'headerSeq',
                editable: true, width: 150,  minValue: '0',
                 strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('oimsreqs.headerdisplay'),
                field: 'headerLabel', editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 6
            },
            {
                fieldName: this.translateService.translate('oimsreqs.programserviceobligation'),
                field: 'programMethod', editable: true, width: 150, datatype: 'lov', domain: 'PS_CATEGORY'
            },
            {
                fieldName: this.translateService.translate('oimsreqs.teamfunction'), field: 'functionType',
                editable: true, width: 150, datatype: 'lov', domain: 'FUNCTION',
                titles: {  code: this.translateService.translate('ocmcondi.lovCode'),
                description: this.translateService.translate('ocmcondi.lovTeamFunction')}
            },
            {
                fieldName: this.translateService.translate('common.sequence'),
                field: 'listSeq', editable: true, width: 150, minValue: '0',
                maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'),
                field: 'expiryDate', datatype: 'date', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oimsreqs.sanctionsflag'), field: 'sanctionsFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oimsreqs.chargesflag'), field: 'chargesFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
        ];
        this.senTermsColumnDef = [
            {
                fieldName: this.translateService.translate('common.type') + '*', field: 'termCode',
                editable: true, width: 150, datatype: 'lov', domain: 'SENT_TERM', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('common.active'),
                field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                datatype: 'date', editable: false, width: 150
            },
        ];
        /*this.senUpdColumnDef = [
            {
                fieldName: this.translateService.translate('common.code') + '*', field: 'updateReasonCode',
                editable: true, width: 300, datatype: 'lov', link: 'oimsreqs/rgReasonRecordGroup',
                cellEditable: this.canAlertEdit,source:'OIMLEGSU'
            },
            {
                fieldName: this.translateService.translate('oimsreqs.fulldescriptionforthissentence') + '*',
                field: 'description', editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 80
            },
            {
                fieldName: this.translateService.translate('oimsreqs.resultantstatus'), field: 'nbtStatusDesc',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                datatype: 'date', editable: false, width: 150
            },
        ];*/
        this.custodyColumnDef = [
            {
                fieldName: this.translateService.translate('oimsreqs.order'), field: 'sentenceOrderStatus', 
                editable: true, width: 150, datatype: 'lov', link: 'oimsreqs/getOrderStatus', required: true, source: 'OCMSTATS'
            },
            {
                fieldName: this.translateService.translate('oimsreqs.custody'), field: 'custodyStatus',
                editable: true, width: 150, datatype: 'lov', link: 'oimsreqs/getCustodyStatus', required: true, source: 'OIMCUSTS'

            },
        ];
        this.oimsreqsexecuteQuery();
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    onGridClear = () => {
        this.oimsreqsexecuteQuery();
        return true;
      }
      onGridTermClear = () => {
        this.sentermsExecuteQuery();
        return true;
      }
      /*onGridUpdClear = () => {
        this.senupdExecuteQuery();
        return true;
      }*/
      
      custodyClear = () => {
        this.fetchCustodyStatus(this.custodyModel);
        return true;
    }
      
    isInsertable(date?) {
        if (this.sencalcSearchModel.sentenceCategory || this.sencalcSearchModel.sentenceCalcType || this.sencalcSearchModel.description
            || this.sencalcSearchModel.sentenceType || this.sencalcSearchModel.headerSeq ||
            this.sencalcSearchModel.listSeq || this.sencalcSearchModel.headerLabel
            || this.sencalcSearchModel.nbtProgMethod || this.sencalcSearchModel.nbtFunctionType || this.sencalcSearchModel.activeFlag
            || this.expiryDate || this.namesReadOnly) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
        if (date) {
            this.clearDisabled = false;
        }
    }
    clear() {
        this.sencalcData = [];
        this.sencalcSearchModel = new SentenceCalcTypes();
        this.sentermsData = [];
        this.sentermsModel = new SentenceTerms();
        this.senupdData = [];
        this.senupdModel = new SentenceUpdateReasons();
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.delRecVar = false;
        this.expiryDate = undefined;
        this.enableIfRowDatExist = false;
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClicksencalc(event) {
        if (event) {
            this.sencalcModel = event;
            if (this.sencalcModel.sentenceCategory && this.sencalcModel.sentenceCalcType) {
                this.sentermsModel = new SentenceTerms();
                this.senupdModel = new SentenceUpdateReasons();
                this.sentermsModel.sentenceCategory = this.sencalcModel.sentenceCategory;
                this.sentermsModel.sentenceCalcType = this.sencalcModel.sentenceCalcType;
                this.senupdModel.sentenceCategory = this.sencalcModel.sentenceCategory;
                this.senupdModel.sentenceCalcType = this.sencalcModel.sentenceCalcType;
                this.senCalsValidateDelRec();
            }
            if (this.sencalcModel.createDatetime) {
                this.sencalcDeleteEnable = true;
                this.enableIfRowDatExist = true;
            } else {
                this.sencalcDeleteEnable = false;
                this.enableIfRowDatExist = false;
                this.sentermsData = [];
                this.sentermsModel = new SentenceTerms();
                this.senupdData = [];
                this.senupdModel = new SentenceUpdateReasons();
            }
            this.custodyModel = event;
            this.fetchCustodyStatus(this.custodyModel);
        }
    }
    senCalsValidateDelRec() {
        const serviceObj = this.oimsreqsFactory.senCalcKeyDelrec(this.sencalcModel);
        serviceObj.subscribe(data => {
            if (data > 0) {
                this.delRecVar = true;
            } else {
                this.delRecVar = false;
            }
        });
        this.sentermsExecuteQuery();
    }
    onRowClicksenterms(event) {
        if (event && event.sentenceCalcType) {
            this.sentermsModel = event;
            if (this.sentermsModel.createDatetime) {
                this.sentermsDeleteEnable = true;
            } else {
                this.sentermsDeleteEnable = false;
            }
        }
    }
   /* onRowClicksenupd(event) {
        if (event && event.sentenceCalcType) {
            this.senupdModel = event;
            if (this.senupdModel.createDatetime) {
                this.senUpdDeleteEnable = true;
            } else {
                this.senUpdDeleteEnable = false;
            }
        }
    }*/
    /**
    * This function loads the data into the Master Record and its child records
    */
    oimsreqsPopulateDetails() {
        this.sencalcModel = this.sencalcData[this.index];
        const serviceObj = this.oimsreqsFactory.
            senTermsExecuteQuery(this.sencalcModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                this.sencalcData = data;
            }
        });
    }

    /**
     *  This function will be executed when commit event is fired
    */
    oimsreqsSavesencalcForm(event) {
        if (!this.oimsreqsCalcValidations()) {
            return;
        }
        this.sencalcInsertList = event.added;
        this.sencalcUpdatetList = event.updated;
        this.sencalcDeleteList = event.removed;
        this.sencalcCommitModel.insertList = [];
        this.sencalcCommitModel.updateList = [];
        this.sencalcCommitModel.deleteList = [];
        if (this.sencalcInsertList.length > 0 || this.sencalcUpdatetList.length > 0) {
            for (let i = 0; i < this.sencalcInsertList.length; i++) {
                this.sencalcInsertList[i].activeFlag = this.sencalcInsertList[i].activeFlag ? 'Y' : 'N';
                this.sencalcInsertList[i].sanctionsFlag = this.sencalcInsertList[i].sanctionsFlag ? 'Y' : 'N';
                this.sencalcInsertList[i].chargesFlag = this.sencalcInsertList[i].chargesFlag ? 'Y' : 'N';
                this.sencalcCommitModel.insertList = this.sencalcInsertList;
            }
            for (let i = 0; i < this.sencalcUpdatetList.length; i++) {
                this.sencalcUpdatetList[i].activeFlag = this.sencalcUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.sencalcUpdatetList[i].sanctionsFlag = this.sencalcUpdatetList[i].sanctionsFlag ? 'Y' : 'N';
                this.sencalcUpdatetList[i].chargesFlag = this.sencalcUpdatetList[i].chargesFlag ? 'Y' : 'N';
                this.sencalcCommitModel.updateList = this.sencalcUpdatetList;
            }
        }
        if (this.sencalcDeleteList.length > 0) {
            for (let i = 0; i < this.sencalcDeleteList.length; i++) {
                this.sencalcDeleteList[i].activeFlag = this.sencalcDeleteList[i].activeFlag ? 'Y' : 'N';
                this.sencalcCommitModel.deleteList = this.sencalcDeleteList;
            }
        }
        const sencalcSaveData = this.oimsreqsFactory.senCalcCommit(this.sencalcCommitModel);
        sencalcSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('SENTENCE_CALC_TYPES_PK') > 0) {
                this.show(this.translateService.translate('oimsreqs.primaryKeyViolation'), 'warn');
                this.oimsreqsexecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('SENTENCE_CALC_TYPE_UK') > 0) {
                this.show(this.translateService.translate('oimsreqs.uniqueKeyViolation'), 'warn');
                this.oimsreqsexecuteQuery();
                return;
            }
            if (data[0] && data[0].listSeq === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.oimsreqsexecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.oimsreqsexecuteQuery();
                return;
            }
        });
    }
    oimsreqsCalcValidations = () => {
        const is = { valid: true };
        if (this.sencalcData && this.sencalcData) {
            this.sencalcData.forEach(element => {
                if (!element.sentenceCategory) {
                    this.show(this.translateService.translate('oimsreqs.sentenecCategoryMandetory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (element.sentenceCalcType === undefined  || !element.sentenceCalcType.trim()) {
                    this.show(this.translateService.translate('oimsreqs.codeMandetory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (element.description === undefined || !element.description.trim()) {
                    this.show(this.translateService.translate('oimsreqs.discriptionMandetory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (!element.sentenceType) {
                    this.show(this.translateService.translate('oimsreqs.sentenceTypeMandetory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
               /*  if(element.headerSeq) {
                   const  numbers= /^[0-9]+$/;
                   if (!numbers.test(element.headerSeq+'')){
                   this.show(this.translateService.translate('oimsreqs.validateNumber') , 'warn');
                   is.valid = false;
                   return is.valid;
                }
            } */
         });
        }
        return is.valid;
    }
    oimsreqsexecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                this.expiryDate = null;
                this.clearDisabled = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.expiryDate = null;
                this.clearDisabled = false;
                return;
            }
        }
        if (this.expiryDate) {
            this.sencalcSearchModel.expiryDate = this.expiryDate;
        } else {
            this.sencalcSearchModel.expiryDate = null;
        }
        if(this.sencalcSearchModel.headerSeq){
            const data = String(this.sencalcSearchModel.headerSeq).trim();
            if (data) {
                const  numbers= /^[0-9/-]+$/;
                if (!numbers.test(this.sencalcSearchModel.headerSeq + '')){
                this.show(this.translateService.translate('oimsreqs.validateNumber'),'warn');
                return;
            } else {
                this.sencalcSearchModel.headerSeq = Number(data);
            }
        }
    }
    if (this.sencalcSearchModel.nbtProgMethod) {
        this.sencalcSearchModel.programMethod = this.sencalcSearchModel.nbtProgMethod;
    }
    if (this.sencalcSearchModel.nbtFunctionType) {
        this.sencalcSearchModel.functionType = this.sencalcSearchModel.nbtFunctionType;
    }
        const serviceObj = this.oimsreqsFactory.senCalcExecuteQuery(this.sencalcSearchModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.sencalcData = [];
                this.retriveDisabled = false;
                this.namesReadOnly = false;
                this.show('common.querycaused');
                this.clear();
                return;
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.sanctionsFlag = element.sanctionsFlag === 'Y' ? true : false;                   
                    element.chargesFlag = element.chargesFlag === 'Y' ? true : false;                   
                });
                this.sencalcData = data;
                this.sencalcDatabaseData = data;
                this.sencalcModel = this.sencalcData[0];
                this.tableIndex = 0;
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
            }
        });
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.sencalcgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.sencalcgrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
       /*  if (event.field === 'headerSeq') {
            if (event.data.headerSeq) {
                const numbers = /^[0-9]+$/;
                const code = event.data.headerSeq;
                if (!numbers.test(code)) {
                    this.show(this.translateService.translate('oimsreqs.validateNumber'),'warn');
                    this.sencalcgrid.setColumnData('headerSeq', rowIndex, undefined);
                }
            }
        } */
        rowdata.validated = true;
        return rowdata;
    }
    validateSentermRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.sentermgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.sentermgrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if(event.field == 'termCode'){
            var validTerms = [AppConstants.LIFE_TERM, AppConstants.IMP_TERM, AppConstants.NPP_TERM, AppConstants.SUSP_TERM];// S4-25146
            var sentences = [AppConstants.IMPS_SENTENCE_TYPE,AppConstants.CNCO_SENTENCE_TYPE];//CNCO and IMPS
            if(sentences.includes(this.sencalcModel.sentenceType) && !validTerms.includes(event.data.termCode)){
                this.sentermgrid.setColumnData('termCode', rowIndex,'');
                this.show(this.translateService.translate('oimsreqs.thistermtypecannotbeconfiguredforthisordertype'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    validateUpdateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.senupdModelTemp = event.data;
        if (event.field === 'updateReasonCode' && (event.newValue !== event.oldValue)) {
            const serviceObj = this.oimsreqsFactory.getNbtStatusValue(this.senupdModelTemp);
            serviceObj.subscribe(data => {
                this.senupdategrid.setColumnData('nbtStatusDesc', rowIndex, data.nbtStatusDesc);
            });
        }
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.senupdategrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.senupdategrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    validateCustodyData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.senupdModelTemp = event.data;
        if (event.field === 'updateReasonCode' && (event.newValue !== event.oldValue)) {

        }
        if (event.field === 'activeFlag') {

        }
        rowdata.validated = true;
        return rowdata;
    }
    sentermsExecuteQuery() {
        const sentermsResult = this.oimsreqsFactory.senTermsExecuteQuery(this.sentermsModel);
        sentermsResult.subscribe(sentermsResultList => {
            if (sentermsResultList.length === 0) {
                this.sentermsData = [];
            } else {
                sentermsResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.sentermsData = sentermsResultList;
                this.sentermsModel = sentermsResultList[0];
            }
        });
        //this.senupdExecuteQuery();
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimsreqsSavesentermsForm(event) {
        if (!this.oimsreqsTermValidations()) {
            return;
        }
        this.sentermsInsertList = event.added;
        this.sentermsUpdatetList = event.updated;
        this.sentermsDeleteList = event.removed;
        this.sentermsCommitModel.insertList = [];
        this.sentermsCommitModel.updateList = [];
        this.sentermsCommitModel.deleteList = [];
        if (this.sentermsInsertList.length > 0 || this.sentermsUpdatetList.length > 0) {
            for (let i = 0; i < this.sentermsInsertList.length; i++) {
                this.sentermsInsertList[i].sentenceCategory = this.sencalcModel.sentenceCategory;
                this.sentermsInsertList[i].sentenceCalcType = this.sencalcModel.sentenceCalcType;
                this.sentermsInsertList[i].activeFlag = this.sentermsInsertList[i].activeFlag ? 'Y' : 'N';
                this.sentermsCommitModel.insertList = this.sentermsInsertList;
            }
            for (let i = 0; i < this.sentermsUpdatetList.length; i++) {
                this.sentermsUpdatetList[i].activeFlag = this.sentermsUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.sentermsCommitModel.updateList = this.sentermsUpdatetList;

            }
        }
        if (this.sentermsDeleteList.length > 0) {
            for (let i = 0; i < this.sentermsDeleteList.length; i++) {
                this.sentermsDeleteList[i].activeFlag = this.sentermsDeleteList[i].activeFlag ? 'Y' : 'N';
                this.sentermsCommitModel.deleteList = this.sentermsDeleteList;
            }
        }
        const sentermsSaveData = this.oimsreqsFactory.senTermsCommit(this.sentermsCommitModel);
        sentermsSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('SENTENCE_TERMS_PK') > 0) {
                this.show(this.translateService.translate('oimsreqs.sentenceTermPrimaryKey'), 'warn');
                this.sentermsExecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('SENT_TERM_ADJ_PK') > 0) {
                this.show(this.translateService.translate('oimsreqs.sentenceTermAdjustPrimaryKey'), 'warn');
                this.sentermsExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.sentermsExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.sentermsExecuteQuery();
                return;
            }
        });
    }
    oimsreqsTermValidations() {
        const is = { valid: true };
        if (this.sentermsData && this.sentermsData) {
            this.sentermsData.forEach(element => {
                if (!element.termCode) {
                    this.show(this.translateService.translate('oimsreqs.termCodeMandetory'), 'warn');
                    is.valid = false;
                }
            });
        }
        return is.valid;
    }
    getNbtStatusValue() {
        const serviceObj = this.oimsreqsFactory.getNbtStatusValue(this.statusCode);
        serviceObj.subscribe(data => {
        });
    }
    /*senupdExecuteQuery() {
        const senupdResult = this.oimsreqsFactory.senUpdExecuteQuery(this.senupdModel);
        senupdResult.subscribe(senupdResultList => {
            if (senupdResultList.length === 0) {
                this.senupdData = [];
            } else {
                senupdResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.senupdData = senupdResultList;
                this.senupdModel = senupdResultList[0];
            }
        });
    }*/
    /**
     *  This function will be executed when commit event is fired
    */
   /* oimsreqsSavesenupdForm(event) {
        if (!this.oimsreqsUpdateValidations()) {
            return;
        }
        this.senupdInsertList = event.added;
        this.senupdUpdatetList = event.updated;
        this.senupdDeleteList = event.removed;

        this.senupdCommitModel.insertList = [];
        this.senupdCommitModel.updateList = [];
        this.senupdCommitModel.deleteList = [];
        if (this.senupdInsertList.length > 0 || this.senupdUpdatetList.length > 0) {
            for (let i = 0; i < this.senupdInsertList.length; i++) {
                this.senupdInsertList[i].sentenceCategory = this.sencalcModel.sentenceCategory;
                this.senupdInsertList[i].sentenceCalcType = this.sencalcModel.sentenceCalcType;
                this.senupdInsertList[i].activeFlag = this.senupdInsertList[i].activeFlag ? 'Y' : 'N';
                this.senupdCommitModel.insertList = this.senupdInsertList;
            }
            for (let i = 0; i < this.senupdUpdatetList.length; i++) {
                this.senupdUpdatetList[i].activeFlag = this.senupdUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.senupdCommitModel.updateList = this.senupdUpdatetList;
            }
        }
        if (this.senupdDeleteList.length > 0) {
            for (let i = 0; i < this.senupdDeleteList.length; i++) {
                this.senupdDeleteList[i].activeFlag = this.senupdDeleteList[i].activeFlag ? 'Y' : 'N';
                this.senupdCommitModel.deleteList = this.senupdDeleteList;
            }
        }
        const senupdSaveData = this.oimsreqsFactory.senUpdCommit(this.senupdCommitModel);
        senupdSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('SENTENCE_UPDATE_REASONS_PK') > 0) {
                this.show(this.translateService.translate('oimsreqs.updateReasonPrimaryKey'), 'warn');
                this.senupdExecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('UPDATE_REASON_CODE') > 0) {
                this.show(this.translateService.translate('oimsreqs.updatereasonnull'), 'warn');
                this.senupdExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
               	this.senupdExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.senupdExecuteQuery();
                return;
            }
        });
    }*/
    oimsreqsUpdateValidations() {
        const is = { valid: true };
        if (this.senupdData && this.senupdData) {
            this.senupdData.forEach(element => {
                 if (element.updateReasonCode === undefined || !element.updateReasonCode.trim()) {
                    this.show(this.translateService.translate('common.codemustbeentered'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (element.description === undefined || !element.description.trim()) {
                    this.show(this.translateService.translate('oimsreqs.fullDescriptionMandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            });
        }
        return is.valid;
    }
    sencalcInsert = () => {
        if (!this.oimsreqsCalcValidations()) {
            return;
        }
        return { activeFlag: true, chargesFlagTemp: true};
    }
    sencalcDelete = () => {
        if (this.delRecVar || this.sentermsData.length > 0 || this.senupdData.length > 0) {
            this.show('common.cannotdeletemaster', 'warn');
            return false;
        }
        return true;
    }
    sentermInsert = () => {
        if (!this.oimsreqsTermValidations()) {
            return;
        }
        return { activeFlag: true };
    }
    senupdInsert = () => {
        if (!this.oimsreqsUpdateValidations()) {
            return;
        }
        return { activeFlag: true };
    }
    onStatusBlur() {
        if (!this.sencalcSearchModel.sentenceCategory) {
            this.sencalcSearchModel.sentenceCategory = this.sencalcSearchModel.sentenceCategory === '' ? undefined : '';
        }
    }
    onStatusBlurOne() {
        if (!this.sencalcSearchModel.sentenceType) {
            this.sencalcSearchModel.sentenceType = this.sencalcSearchModel.sentenceType === '' ? undefined : '';
        }
    }
    onStatusBlurTwo() {
        if (!this.sencalcSearchModel.nbtProgMethod) {
            this.sencalcSearchModel.nbtProgMethod = this.sencalcSearchModel.nbtProgMethod === '' ? undefined : '';
        }
    }
    onStatusBlurThree() {
        if (!this.sencalcSearchModel.nbtFunctionType) {
            this.sencalcSearchModel.nbtFunctionType = this.sencalcSearchModel.nbtFunctionType === '' ? undefined : '';
        }
    }

    custodySave(event) {
        this.custodyInsertList = event.added;
        this.custodyUpdatetList = event.updated;
        this.custodyDeleteList = event.removed;
        this.custodyCommitModel.insertList = [];
        this.custodyCommitModel.updateList = [];
        this.custodyCommitModel.deleteList = [];
        for (let i = 0; i < this.custodyData.length; i++) {
            for (let j = 0; j < this.custodyData.length; j++) {
                if (i !== j && this.custodyData[i].sentenceOrderStatus === this.custodyData[j].sentenceOrderStatus) {
                    this.show(this.translateService.translate('oimsreqs.statusalreadylinked'),'warn');
                    return;
                }
            }
        }
        if (this.custodyInsertList.length > 0) {
            for (let i = 0; i < this.custodyInsertList.length; i++) {
                if (!this.custodyInsertList[i]['custodyStatus']) {
                    this.show(this.translateService.translate('oimsreqs.custodystatusmustbeentered'), 'warn');
                    return;
                }

                if (!this.custodyInsertList[i]['sentenceOrderStatus']) {
                    this.show(this.translateService.translate('oimsreqs.ordermustbeentered'), 'warn');
                    return;
                }
                this.custodyInsertList[i].sentenceCategory = this.custodyModel['sentenceCategory'];
                this.custodyInsertList[i].sentenceCalcType = this.custodyModel['sentenceCalcType'];
                this.custodyInsertList[i].legalClass='CUST';
            }
            for (let i = 0; i < this.custodyUpdatetList.length; i++) {
                this.custodyUpdatetList[i].sentenceCategory = this.custodyModel['sentenceCategory'];
                this.custodyUpdatetList[i].sentenceCalcType = this.custodyModel['sentenceCalcType'];
                this.custodyUpdatetList[i].legalClass='CUST';
            }
        }
        if (this.custodyDeleteList.length > 0) {
            for (let i = 0; i < this.custodyDeleteList.length; i++) {
                this.custodyDeleteList[i].sentenceCategory = this.custodyModel['sentenceCategory'];
                this.custodyDeleteList[i].sentenceCalcType = this.custodyModel['sentenceCalcType'];
                this.custodyDeleteList[i].legalClass='CUST';
            }
        }
        this.custodyCommitModel.insertList = this.custodyInsertList;
        this.custodyCommitModel.updateList = this.custodyUpdatetList;
        this.custodyCommitModel.deleteList = this.custodyDeleteList;
        const sentermsSaveData = this.oimsreqsFactory.custodyCommit(this.custodyCommitModel);
        sentermsSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.fetchCustodyStatus(this.custodyModel);
                return;
            } else if (data === 18) {
                this.show(this.translateService.translate('oimsreqs.combinationexists'),'warn');
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.fetchCustodyStatus(this.custodyModel);
                return;
            }
        });
    }

    fetchCustodyStatus(custodyModel) {
        const custodyResult = this.oimsreqsFactory.fetchCustodyStatus(custodyModel);
        custodyResult.subscribe(custodyList => {
            if (custodyList.length === 0) {
                this.custodyData = [];
            } else {
                this.custodyData = custodyList;
                this.custodyData.forEach(status=>{
                    status['sentenceCustodyStatusTemp']=status['custodyStatus'];
                    status['sentenceOrderStatusTemp']=status['sentenceOrderStatus'];
                });
            }
        });
    }


    custodyGridInsert = () => {
        if (this.sencalcModel['sentenceCategory']!=='CUST') {
            this.show(this.translateService.translate('oimsreqs.allowedonlyforcust'), 'warn');
            return;
        }
        return {};
    }

}
