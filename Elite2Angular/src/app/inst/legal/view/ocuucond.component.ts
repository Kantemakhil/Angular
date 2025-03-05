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
import { OffenderSentConditionsCommitBean } from '@inst/legal/beans/OffenderSentConditionsCommitBean';
import { OffenderSentConditions } from '@inst/legal/beans/OffenderSentConditions';
import { UserSessionManager } from '@core/classes/userSessionManager';
@Component({
    selector: 'app-ocuucond',
    templateUrl: './ocuucond.component.html',
    styleUrls: ['./ocuucond.component.scss']
})

export class OcuucondComponent implements OnInit {
    @ViewChild('grid', { static: false }) grid: any;
    conditionColumndef: any[];
    conditionText = '';
    categoryCondiSelected: any = { code: null , description: null};
    categoryCondiComplete = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    conditionGridData = [];
    offcondCommitModel: OffenderSentConditionsCommitBean = new OffenderSentConditionsCommitBean();
    offenderSentConditionId: number = 0;
    orderNo: number = 0;
    orderType: string = '';
    offSentupdatedRecord: OffenderSentConditions[] = [];
    selectedRowOfUpdtGrid: any;
    programMethodEditable: boolean = false;
    startOrderDate: any;
    programIdMap: Map<string, number> = new Map<string, number>();
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    condCategory: any;
    parentOrderType = '';
    orderActiveType: string = null;
    orderStatusData: any = [];
    orderStartDate: any;
    orderEndDate: any;
    constructor(
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private dialogService: DialogService,
        private redirectUtil: RedirectUtil,
        private router: Router,
        private service: OcucondiService,
    ){}
    ngOnInit() {
        if(this.dialog.data && this.dialog.data.data && this.dialog.data.data.length > 0){
            this.conditionGridData = this.dialog.data.data;
            this.orderNo = this.dialog.data.orderNo.no;
            this.orderType = this.dialog.data.orderNo.type;
            this.offenderSentConditionId = this.dialog.data.offenderSentConditionId;
            this.startOrderDate = this.dialog.data.orderNo.orderedDate;
            this.orderActiveType = this.dialog.data.orderNo['activeType'];
            this.orderStatusData = this.dialog.data.orderStatus;
            this.orderStartDate = DateFormat.getDate(this.dialog.data.orderNo.commenceDate);
            this.orderEndDate = this.dialog.data.orderEndDate;
        }  
        if( this.dialog.data && this.dialog.data.orderType){
            this.parentOrderType = this.dialog.data.orderType;
        }
        this.conditionGridColumnDef();
        this.insertSelectColumn();
        this.getProgramId();
        this.getCondCategory();
    }
    conditionGridColumnDef() {
        this.conditionColumndef = [
            {
                fieldName: this.translateService.translate( 'ocuucond.conditionCategory' ), required : false,
                field: 'categoryType', editable: false, width: 150, datatype: 'lov', domain: 'COM_CON_CAT'
            },
            {
                fieldName: this.translateService.translate( 'ocuucond.description' ), required : false,
                field: 'requirement', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate( 'ocuucond.length' ), required : false,
                field: 'length', editable: true, width: 150, datatype: 'number', minValue: 1, strictFP: true, whole: true,
            },
            {
                fieldName: this.translateService.translate('ocuucond.unit'),
                field: 'lengthUnit', editable: true, width: 150, datatype: 'lov', domain: 'COND_UNIT'
                , titles: { code: this.translateService.translate('ocuucond.lovUnitType'),
                description: this.translateService.translate('ocuucond.lovDescription')}
             },
            {
                fieldName: this.translateService.translate( 'ocuucond.startDate' ), required : true,
                field: 'startDate', editable: true, width: 150, datatype: 'date',
            },
            {
                fieldName: this.translateService.translate( 'ocuucond.endDate' ), required : false,
                field: 'expiryDate', editable: true, width: 150, datatype: 'date'
            },
            {
                fieldName: '',
                field: 'programMethod', editable: false, width: 150, datatype: 'text', hide: true
             },
             {
                fieldName: this.translateService.translate('ocuucond.programreferral'),
                field: 'program', editable: false,
                width: 150, datatype: 'text', hide: false, 
             },
             {
                fieldName: '', field: 'programId', editable: false,
                width: 150, datatype: 'text', hide: true
             },
             {
                fieldName: '', field: 'goButton', datatype: 'hyperlink',
                 link: '/progrefdialog',displayas:'image',
                 onLaunchClick: this.onLaunchClick,
                 editable: false ,width: 100, modal: true,
                 data: 'row',updateField: 'row',imageTitleField:'finalBtnTitle'
            },
            {
                fieldName: this.translateService.translate( 'ocuucond.status' ), required : true,
                field: 'conditionStatus', editable: true, width: 150, datatype: 'lov', link: 'ocmpconf/rgOrderStatus?orderType=COND', source:'OCMSTATS'
            },
            {
                fieldName: this.translateService.translate('ocuucond.legalTextofCondition'),
                field: 'longCommentText', editable: false, width: 150, datatype: 'text',
                hide: true, externalColumn:true
             },
        ];
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
    update() {
        if (!this.validation()) {
            return false;
        }
        this.offSentupdatedRecord = [];
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.offSentupdatedRecord.push(v);
            }
        );
        for(let i =0; i<this.offSentupdatedRecord.length; i++){
            /* if ((this.offSentupdatedRecord[i].programMethod === 'ACP')
                && this.offSentupdatedRecord[i].program) {
                    this.offSentupdatedRecord[i].programId = this.programIdMap.get(this.offSentupdatedRecord[i].program);
            } */
            this.offSentupdatedRecord[i]['programMethod'] = null;
            this.offSentupdatedRecord[i]['commConditionType'] = this.parentOrderType;
        }
        this.offcondCommitModel.updateList = this.offSentupdatedRecord;
        if(this.offSentupdatedRecord && this.offSentupdatedRecord.length == 0){
            return false;
        }
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
                this.message = this.translateService.translate('ocucondi.thisprogramalreadyexists');
                this.show();
            } else if (data && data === 'exception') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucondi.whencreatingcommunityconditiondeductions');
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
                const msg = this.translateService.translate('ocucondi.recordcannotdeleted');
                this.message = String(msg).replace('%tablename%', data);
                this.type = 'warn';
                this.show();
            }
        });
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
        const index = this.conditionGridData.indexOf(this.selectedRowOfUpdtGrid);
        this.grid.setColumnData('longCommentText', index, event);
    }
    clear(){
        this.categoryCondiSelected = { code: null, description: null};
        this.conditionGridData = [];
    }
    close(){
        this.dialog.close(null);
    }
    onRowClickCondition(event){
        if(event){
            this.selectedRowOfUpdtGrid = event;
        }
        if(event && event.longCommentText){
          this.conditionText = event.longCommentText;
        }
        else{
            this.conditionText = '';
        }
    }
    validation(){
        for(let i=0; i<this.conditionGridData.length; i++){
            if (this.conditionGridData[i].length < 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuucond.negativeLengthNotAllowed');
                this.show();
                return false;
            } else if (this.conditionGridData[i].length && !this.conditionGridData[i].lengthUnit) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuucond.pleaseSelectUnit');
                this.show();
                return false;
            } else if (this.conditionGridData[i].length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuucond.LengthMustBeGreaterThan0');
                this.show();
                return false;
            } else if (!this.conditionGridData[i].length && this.conditionGridData[i].lengthUnit) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuucond.pleaseSelectLength');
                this.show();
                return false;
            } else if (this.conditionGridData[i].startDate == '' || this.conditionGridData[i].startDate == undefined || !this.conditionGridData[i].startDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuucond.startDateMustBeEnter');
                this.show();
                return false;
            } else if (this.conditionGridData[i].expiryDate && DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i].expiryDate),
                DateFormat.getDate(this.conditionGridData[i].startDate)) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuucond.endDateShoulNotLessThanStartDate');
                this.show();
                return false;
            } else if (this.conditionGridData[i].expiryDate && DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i].expiryDate),
            DateFormat.getDate(this.conditionGridData[i].startDate)) === 0 ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuucond.endDateShoulNotLessThanStartDate');
                this.show();
                return false;
            } else if (this.conditionGridData[i].programMethod !== 'ACP' && this.conditionGridData[i].programId !== null) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuucond.programReferralMustBeEnter');
                this.show();
                return false;
            } else if(this.conditionGridData[i].longCommentText && this.conditionGridData[i].longCommentText.length > 4000){
                this.type = 'warn';
                this.message = this.translateService.translate('ocuucond.legalTextExceedsAllowedLimitOf4000Characters')
                this.show();
                return false;
            } else if (this.conditionGridData[i].startDate && this.orderStartDate && DateFormat.compareDate(DateFormat.getDate(this.conditionGridData[i].startDate),
            DateFormat.getDate(this.orderStartDate)) === -1 ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuacond.startshouldnotbeearlierthansentenceorderdate');
                this.show();
                return false;
            } else if (this.orderActiveType == 'E' || this.orderActiveType == 'I') {
                const updStatus = this.orderStatusData?.filter(ele => ele.updateReasonCode === this.conditionGridData[i].conditionStatus);
                if (updStatus.length > 0 && updStatus[0].activeType == 'A') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuucond.linkedorderisinactive')
                    this.show();
                    return false;
                }
            }
        }
        return true
    }
    canCellEditProgramMethod = (data: any, index: number, field: string) => {
        if (field == 'programMethod' && data.programMethod == 'ACP' && data.programId !== null) {
            return true;
        }
        if(data.programMethod && data.programMethod == 'ACP' && data.programId !== null){
            data["goButton"] = 'assets/icons/launch.svg';
        } else {
            data["goButton"] = '';
        }
        return false
    }
    insertSelectColumn(){
        this.selectedRowOfUpdtGrid = 0;
        for(let i=0; i < this.conditionGridData.length;i++){
            if(this.condCategory){
                if(this.conditionGridData[i]["programMethod"] != 'ACP'){
                    const fiteredCat = this.condCategory.filter(obj=>obj.code == this.conditionGridData[i]["programMethod"]);
                    if(fiteredCat && fiteredCat.length > 0){
                        this.conditionGridData[i]['program'] = fiteredCat[0].description;
                    }
                }
            }
            this.conditionGridData[i]["programMethodOriginal"] = this.conditionGridData[i].programMethod; 
            if(this.conditionGridData[i].programMethod && this.conditionGridData[i].programMethod == 'ACP'){
                this.conditionGridData[i]["goButton"] = 'assets/icons/launch.svg';
            } else {
                this.conditionGridData[i]["goButton"] = '';
            }
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onLaunchClick = (event) => {
        const index = this.conditionGridData.indexOf(event);
        this.dialogService.openLinkDialog('/progrefdialog', event, 50).subscribe(result => {
            if (result) {
                const node = this.grid.gridOptions.api.getDisplayedRowAtIndex(index);
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
