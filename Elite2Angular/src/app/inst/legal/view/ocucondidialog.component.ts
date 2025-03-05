import { OffenderSentConditionsCommitBean } from './../beans/OffenderSentConditionsCommitBean';
import {
    Component,
    OnInit
} from '@angular/core';
import { ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OcucondiService } from '../service/ocucondi.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { Router } from '@angular/router';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcmcondiService } from '../../legal-screens/maintenance/service/ocmcondi.service';
import { OffenderSentConditions } from '../beans/OffenderSentConditions';
@Component({
    selector: 'app-ocucondi-dialog',
    templateUrl: './ocucondidialog.component.html',
    styleUrls: ['./ocuucond.component.scss']
})

export class OcucondiDialogComponent implements OnInit {
    
    @ViewChild('grid', { static: false }) grid: any;
    conditionColumndef: any[];
    condiLegalText = '';
    conditionUnitType = '';
    categoryCondiSelected:any = { code: null , description: null};
    selectedCode: any;
    categoryCondiComplete: any = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    conditionGridData = [];
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    offcondCommitModel: OffenderSentConditionsCommitBean = new OffenderSentConditionsCommitBean();
    offSentinsertRecord: OffenderSentConditions[] = [];
    offSentupdatedRecord: OffenderSentConditions[] = [];
    offSentdeleteRecord: OffenderSentConditions[] = [];
    offTypedeleteRecord: OffenderSentConditions[] = [];
    offcondModel: OffenderSentConditions = new OffenderSentConditions();
    offcondData: OffenderSentConditions[] = [];
    conditionGridDataTemp: OffenderSentConditions[] = [];
    
    offcondIndex: number;
    updatedData = [];
    orderNo: number = 0;
    orderType: string = '';
    selected = -1;
    selectedRowOfAddGrid: any;
    orderStartDate: any;
    programIdMap: Map<string, number> = new Map<string, number>();
    condCategory = [];
    disabledSaveBtn: boolean = true;
    disabledRetrieveBtn: boolean = false;
    parentOrderType = '';
    ConditionCategoryLovLink: String;
    orderActiveType: string = null;
    orderStatusData: any = [];
    orderEndDate: any;

    constructor(public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private service: OcucondiService,
        private dialogService: DialogService,
        private redirectUtil: RedirectUtil,
        private router: Router,
        private ocmcondiFactory: OcmcondiService) { }

    ngOnInit() {
        this.ConditionCategoryLovLink = '/ocmpconf/rgConditionCategory?orderType=' + this.dialog.data.orderType;
        this.updatedData = this.dialog.data.data;
        this.orderNo = this.dialog.data.selectedOrder.orderNo;
        this.orderType = this.dialog.data.selectedOrder.type;
        this.orderStartDate = DateFormat.getDate(this.dialog.data.selectedOrder.commenceDate)+''!= 'Invalid Date'? DateFormat.getDate(this.dialog.data.selectedOrder.commenceDate):undefined;
        
        if( this.dialog.data && this.dialog.data.orderType){
            this.parentOrderType = this.dialog.data.orderType;
        }
        this.populateCategoryLovs();
        this.conditionGridColumnDef();
        this.getProgramId();
        this.getCondCategory();
        this.orderActiveType = this.dialog.data.selectedOrder['activeType'];
        this.orderStatusData = this.dialog.data.orderStatus;
        if(this.orderActiveType == null){
           let activeTypeStatus = this.orderStatusData.filter(i => i.updateReasonCode ==this.dialog.data.selectedOrder['status']);
           this.orderActiveType = activeTypeStatus[0].activeType
        }
        this.orderEndDate = this.dialog.data.orderEndDate && this.dialog.data.orderEndDate!='Indefinite'? DateFormat.getDate(this.dialog.data.orderEndDate):undefined;
    }
    getCondCategory() {
        this.service.getCondCategory(this.sessionManager.getId(),'OCUCONDI').subscribe(data=>{
            if(data) {
                this.condCategory = data
                this.conditionGridData.forEach(obj=>{
                    if(obj["programMethod"] != 'ACP'){
                        const fiteredCat = this.condCategory.filter(obj=>obj.code == obj["programMethod"]);
                        if(fiteredCat && fiteredCat.length > 0){
                            obj['program'] = fiteredCat[0].description;
                        }
                    }
                });
            }
        });
    }
    conditionGridColumnDef() {
        this.conditionColumndef = [
            {
                fieldName: this.translateService.translate('common.select'), field: 'select',
                width: 150, datatype: 'checkbox', editable: true
            },
            {
                fieldName: this.translateService.translate('ocuacond.description') + '*',
                field: 'description', editable: false, width: 150, datatype : 'text',
                uppercase: 'false',  maxlength: 50, 
             },
             {
                fieldName: this.translateService.translate('ocuacond.length'),
                field: 'length', editable: true, width: 150, datatype: 'number', minValue: 1, strictFP: true, whole: true,
             },
             {
                fieldName: this.translateService.translate('ocuacond.unit'),
                field: 'conditionUnitType', editable: true, width: 150, datatype: 'lov', domain: 'COND_UNIT'
                , titles: { code: this.translateService.translate('ocuacond.lovUnitType'),
                description: this.translateService.translate('ocuacond.lovDescription')}
             },
             {
                fieldName: this.translateService.translate('ocuacond.startdate'),
                field: 'startDate', editable: true, width: 300, datatype: 'date', required: true,
            },

            {
                fieldName: this.translateService.translate('ocuacond.enddate'),
                field: 'expiryDate', editable: true, width: 300, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocuacond.referral'),
                field: 'programMethod', editable: false, width: 150, datatype: 'text',
                hide: true
             },
             {
                fieldName: this.translateService.translate('ocuacond.referral'),
                field: 'program', editable: false,
                width: 150, datatype: 'text', hide: false
             },
             {
                fieldName: '', field: 'programId', editable: false,
                width: 150, datatype: 'text', hide: true, 
             },
             {
                fieldName: '', field: 'goButton', datatype: 'hyperlink',
                 link: '/progrefdialog',displayas:'image',
                 onLaunchClick: this.onLaunchClick,
                 editable: false ,width: 100, modal: true,
                 data: 'row',updateField: 'row',imageTitleField:'finalBtnTitle'
            },

            {
                fieldName: this.translateService.translate('ocuacond.status'), required: true,
                field: 'conditionStatus', editable: true, width: 150, datatype: 'lov', link: 'ocmpconf/rgOrderStatus?orderType=COND',source:'OCMSTATS'
             },
             {
                fieldName: this.translateService.translate('ocuacond.legalTextofCondition'),
                field: 'conditionText', editable: false, width: 150, datatype: 'text',
                hide: true, externalColumn:true
             },
        ];
    }
    clear(){
        this.categoryCondiSelected = { code: '', description: ''};
        this.conditionGridData = [];
        this.disabledSaveBtn = true;
        this.disabledRetrieveBtn = true;
    }
    close(){
        this.dialog.close(null);
    }
    lovOptionChange(ev){
        this.categoryCondiSelected = {code: ev.code, description: ev.description};
        this.conditionGridData = [];
        this.disabledRetrieveBtn = false;
        this.condiLegalText = '';
    }
    retrieve() {
        if(!this.categoryCondiSelected.code) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuacond.selectcondcategory');
            this.show();
            return;
        }
        let myObj = { 
            categoryType: this.categoryCondiSelected.code,
            offenderBookId: this.dialog.data.selectedOffender.offenderBookId,
            sentenceSeq: this.orderNo,
            commConditionType: this.parentOrderType
         }
        const comcondResult = this.service.comCondFilteredData(myObj);
        comcondResult.subscribe(comcondResultList => {
            if (comcondResultList.length > 0) {
                this.conditionGridData = comcondResultList;
                this.insertSelectColumn();
                this.disabledSaveBtn = false;
            } else if (comcondResultList.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.NoConditionsFound');
                this.show();
            } 
        })
    }
    retrieveSelectedData(){
        let selectedArr = [];
        for(let i=0; i < this.conditionGridData.length;i++){
            if (this.conditionGridData[i]["select"] == true) {
                if((DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i]["startDate"]), DateFormat.getDate(this.orderStartDate)) != 0) || (this.orderEndDate && DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i]["expiryDate"]), DateFormat.getDate(this.orderEndDate)) != 0)) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i]["startDate"]), DateFormat.getDate()) === 1) {
                        this.conditionGridData[i]["conditionStatus"] = 'PEND';
                    } else if (this.conditionGridData[i]["expiryDate"] && DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i]["startDate"]), DateFormat.getDate()) < 1 && DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i]["expiryDate"]), DateFormat.getDate()) < 1) {
                        this.conditionGridData[i]["conditionStatus"] = 'EXP';
                    } else if (DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i]["startDate"]), DateFormat.getDate()) < 1) {
                        this.conditionGridData[i]["conditionStatus"] = 'ACT';
                    }
                }
                selectedArr.push(this.conditionGridData[i]);
            }
        }
        return selectedArr;
    }

    getFormatedDate(day) {
        var dd = String(day.getDate()).padStart(2, '0');
        var mm = String(day.getMonth() + 1).padStart(2, '0'); 
        var yyyy = day.getFullYear();
        return mm+ '-'+ dd + '-'+ yyyy;
    }

    checkValidData(){
        let checkUnselectedRow = 0;
        for(let i=0; i<this.conditionGridData.length; i++){
            if(!this.conditionGridData[i].select) {
                checkUnselectedRow++;
                if(checkUnselectedRow == this.conditionGridData.length){
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuacond.pleaseSelectACondition');
                    this.show();
                    return false
                }
                continue;
            } else if (this.conditionGridData[i].length < 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.negativeLengthNotAllowed');
                this.show();
                return false;
            } else if (this.conditionGridData[i].length && !this.conditionGridData[i].conditionUnitType) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.pleaseSelectUnit');
                this.show();
                return false;
            } else if (this.conditionGridData[i].length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.LengthMustBeGreaterThan0');
                this.show();
                return false;
            } else if (!this.conditionGridData[i].length && this.conditionGridData[i].conditionUnitType) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.pleaseSelectLength');
                this.show();
                return false;
            } else if (this.conditionGridData[i].startDate == '' || this.conditionGridData[i].startDate == undefined || !this.conditionGridData[i].startDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.startDateMustBeEnter');
                this.show();
                return false;
            } else if (this.conditionGridData[i].expiryDate && DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i].expiryDate),
                DateFormat.getDate(this.conditionGridData[i].startDate)) === -1 ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.endDateShoulNotLessThanStartDate');
                this.show();
                return false;
            }  else if (this.conditionGridData[i].expiryDate && DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i].expiryDate),
            DateFormat.getDate(this.conditionGridData[i].startDate)) === 0 ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.endDateShouldNotLessThanStartDate');
                this.show();
                return false;
            } else if (this.conditionGridData[i].programMethod == 'ACP' && this.conditionGridData[i].programId == null) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.programReferralMustBeEnter');
                this.show();
                return false;
            } else if(this.conditionGridData[i].longCommentText && this.conditionGridData[i].longCommentText.length > 4000){
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.legalTextExceedsAllowedLimitOf4000Characters')
                this.show();
                return false;
            } else if (this.conditionGridData[i].startDate && this.orderStartDate && DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i].startDate),
            DateFormat.getDate(this.orderStartDate)) === -1 ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.startshouldnotbeearlierthansentenceorderdate');
                this.show();
                return false;
            } else if (this.orderActiveType == 'E' || this.orderActiveType == 'I') {
                const updStatus = this.orderStatusData.filter(ele => ele.updateReasonCode === this.conditionGridData[i].conditionStatus);
                if (updStatus.length > 0 && updStatus[0].activeType == 'A') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuacond.linkedorderisinactive')
                    this.show();
                    return false;
                }
            } 
        }
        return true
    }
    save(){
        if(!this.checkValidData()){
            return false;
        }
        let cs = this.categoryCondiSelected;
        let sd = this.retrieveSelectedData();
        let orderNo = this.orderNo;
        let ordersMappings = [{
            'displayNo': this.dialog.data.selectedOrder.displayNo,
            'operation': 'U'
        }];
        for(let i =0; i<sd.length; i++){
            sd[i]['sentenceSeq'] = orderNo;
            sd[i]['offenderBookId'] = this.dialog.data.selectedOffender.offenderBookId;
            sd[i].caseLoadId = this.dialog.data.selectedOffender.caseLoadId
            sd[i].categoryTypeCode = cs.code;
            sd[i].conditionAppliedFlag = 'N';
            sd[i]["lengthUnit"] = sd[i].conditionUnitType;
            sd[i]["longCommentText"] =  sd[i].conditionText;
            sd[i]['objectType'] = this.orderType;
            sd[i]['commConditionType'] = this.parentOrderType;
            if(this.parentOrderType ==='NCUS'){
                sd[i]['orderCategory'] = 'NONCUST';
            }else{
                sd[i]['orderCategory'] = this.parentOrderType;
            }
            sd[i]['agyLocId'] = this.dialog.data.selectedOffender.intakeAgyLocId;
            i == 0 && ordersMappings? sd[i]['orderOperations'] = JSON.stringify(ordersMappings) : sd[i]['orderOperations'] = '';
        }
        this.offcondCommitModel.insertList = sd;
        const affetedRows = this.service.offSentConCommit(this.offcondCommitModel);
        affetedRows.subscribe(data => {
            if (data && data === 'success') {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.type = 'success';
                this.show();
                this.dialog.close(null);
            } else if (data && data === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.thisprogramalreadyexists');
                this.show();
            } else if (data && data === 'exception') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.whencreatingcommunityconditiondeductions');
                this.show();
                setTimeout(() => {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                }, 10);
            } else if (data && data === 'fail') {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            } else {
                const msg = this.translateService.translate('ocuacond.recordcannotdeleted');
                this.message = String(msg).replace('%tablename%', data);
                this.type = 'warn';
                this.show();
            }
          });
    }
    selectChange = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'select') {
        }
        if(event.field === 'programMethod'){
            event.data.program = event.data.programMethod;
        }
        rowdata.validated = true;
        return rowdata;
    }
    referralLovEdit = (data: any, index: number, field: string) => {
        if (field == 'programMethod' && data.programMethod == 'ACP' && data.programId !== null) {
            return true;
        }
        if(data.programMethod && data.programMethod == 'ACP' && data.programId !== null){
            data["goButton"] = 'assets/icons/launch.svg';
        } else {
            data["goButton"] = '';
        }
    }
    onRowClickCondition(event){
        if(event){
            this.selectedRowOfAddGrid = event;
        }
        if(event && event.conditionText){
          this.condiLegalText = event.conditionText;
        } else{
            this.condiLegalText = '';
        }
    }
    insertSelectColumn(){
        for(let i=0; i < this.conditionGridData.length;i++){
            if(this.condCategory){
                if(this.conditionGridData[i]["programMethod"] != 'ACP'){
                    const fiteredCat = this.condCategory.filter(obj=>obj.code == this.conditionGridData[i]["programMethod"]);
                    if(fiteredCat && fiteredCat.length > 0){
                        this.conditionGridData[i]['program'] = fiteredCat[0].description;
                    }
                }
            }
            if(this.conditionGridData[i]["programMethod"] !== 'ACP' && this.conditionGridData[i]["programMethod"] !== 'UW'){
                this.conditionGridData[i].program = '';
            }
            this.conditionGridData[i]["select"] = false;
            this.conditionGridData[i]["startDate"] = this.orderStartDate;
            this.conditionGridData[i]["expiryDate"] = this.orderEndDate?DateFormat.getDate(this.orderEndDate):undefined;
            this.conditionGridData[i]["longCommentText"] = this.condiLegalText;
            if(this.orderActiveType != 'A'){
                this.conditionGridData[i]["conditionStatus"] = 'EXP';
            } else {
                if(this.dialog.data.selectedOrder['status'] && this.dialog.data.selectedOrder['status']== 'PEND'){
                    this.conditionGridData[i]["conditionStatus"] = 'PEND';
                } else {
                    this.conditionGridData[i]["conditionStatus"] = 'ACT';
                }
            }
            if(this.conditionGridData[i].programMethod && this.conditionGridData[i].programMethod == 'ACP'){
                this.conditionGridData[i]["goButton"] = 'assets/icons/launch.svg';
            } else {
                this.conditionGridData[i]["goButton"] = '';
            }
            if(this.conditionGridData[i].length == undefined){
                this.conditionGridData[i]["length"] = '';
            }
            if(this.conditionGridData[i].expiryDate == undefined){
                this.conditionGridData[i]["expiryDate"] = '';
            }
        }
    }
    getProgramId() {
        const serviceObj = this.service.
            getProgram();
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(ele => {
                    this.programIdMap.set(ele.code, ele.id);
                });
            }
        });
    }
    isInsertable(event) {
        const index = this.conditionGridData.indexOf(this.selectedRowOfAddGrid);
        this.grid.setColumnData('conditionText', index, event);
    }
    populateCategoryLovs() {
        const obj = {
            commConditionType: this.parentOrderType,
            offenderBookId: this.dialog.data.selectedOffender.offenderBookId,
            sentenceSeq: this.orderNo
        }
        this.service.getConditionTypeGrid(obj).subscribe(data => {
            if(data.length > 0){
                this.categoryCondiComplete = data;
                // this.categoryCondiSelected = data.categoryType;  
            } 
        });
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onLaunchClick = (event) => {
        this.dialogService.openLinkDialog('/progrefdialog', event, 50).subscribe(result => {
            if (result) {
            // const index = this.conditionGridData.indexOf(event);
            const selectedNode = this.grid.gridOptions.api.getSelectedNodes(event);
            // const selectedRows = this.grid.gridOptions.api.getSelectedRows(event);
              const node = this.grid.gridOptions.api.getDisplayedRowAtIndex(selectedNode[0].rowIndex);
                if (node) {
                    node.setDataValue('program', result['description']);
                    node.setDataValue('programId', result['programId']);
                    this.grid.onGridSizeChanged();
                }
            } else {
            }
        });
    }
}    

