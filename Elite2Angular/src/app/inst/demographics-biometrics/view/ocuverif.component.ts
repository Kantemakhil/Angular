import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuverifService } from '../service/ocuverif.service';
import { WorkFlowLogs } from '@instdemographicsbeans/WorkFlowLogs';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { WorkFlowLogsCommitBean } from '../beans/WorkFlowLogsCommitBean';
import { CasePlans } from '@inst/casemanagement/beans/CasePlans';


@Component({
    selector: 'app-ocuverif',
    templateUrl: './ocuverif.component.html'
})

export class OcuverifComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid', {static: true}) grid: any;
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    workflData: WorkFlowLogs[] = [];
    workflDataTemp: WorkFlowLogs[] = [];
    workflModel: WorkFlowLogs = new WorkFlowLogs();
    workflModelTemp: WorkFlowLogs = new WorkFlowLogs();
    workflIndex = 0;
    workflInsertList: WorkFlowLogs[] = [];
    workflUpdatetList: WorkFlowLogs[] = [];
    workflDeleteList: WorkFlowLogs[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    workFlColumnDef: any[];
    workFlReadOnly = false;
    navigationdummyRg: any[] = [];
    okBtnDisabled: boolean;
    userName: any;
    createUserId: any;
    workFlowId:any;
    commitModel: WorkFlowLogsCommitBean = new WorkFlowLogsCommitBean();
    msgs: { message: any; type: any; }[];
    queryMode: boolean = false;
    caseplanBean : CasePlans =new CasePlans();
    caseplanBeanTemp:CasePlans =new CasePlans();
    userFullName:String;
    hideButtons: boolean;
    constructor(private ocuverifFactory: OcuverifService, public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private activatedRoute: ActivatedRoute, private router: Router,
        public dialogService: DialogService) {
        this.workFlColumnDef = [];

    }
    ngOnInit() {
        this.okBtnDisabled = true;
        this.workflModelTemp = new WorkFlowLogs();
        this.workflModelTemp.workActionCode = 'VER';
        this.workflModelTemp.createDate = DateFormat.getDate();
        this.workflModelTemp.createUserId = this.userName;
        this.workFlowId = this.dialog.data.workFlowId;
        this.queryMode=this.dialog.data.queryMode;

        this.caseplanBeanTemp.casePlanId = this.dialog.data.casePlanId;
        this.caseplanBeanTemp.offenderBookId = this.dialog.data.offenderBookId;
        this.caseplanBeanTemp.modifyUserId = this.sessionManager.getId();
        this.caseplanBeanTemp.modifyDateTime = DateFormat.getDate();
        this.caseplanBeanTemp.createUserId = this.sessionManager.getId();
        this.caseplanBeanTemp.verifiedFlag = this.dialog.data.verifyCheckFlag?'Y':'N';
        this.userFullName=this.dialog.data.userName;

        if (this.dialog.data.length > 0) {
            this.workflModelTemp.workFlowId = this.dialog.data[0].workFlowId;
        } else {
            this.workflModelTemp.workFlowId = this.dialog.data.workFlowId;
        }
        this.hideButtons = (this.dialog.data.screenId === 'OCDIPLAN') ? false : true;
        this.workflData = [];
        if(!this.queryMode){
        if (this.dialog.data.moduleName !== 'RELEASE' ){
            if (!(this.dialog.data[0].workActionCode === 'VER')) {
                this.okBtnDisabled = false;
                this.workflData.push(this.workflModelTemp); 
            }
        } else {
            if (this.dialog.data.workActionCode === 'VER' ) {
                this.okBtnDisabled = true;
            } else {
                this.okBtnDisabled = false;
                this.workflData.push(this.workflModelTemp);
            }
        }
    }

    let workData = [];
        for (let i = 0; i < this.dialog.data.length; i++) {
            workData.push(this.dialog.data[i]);
        }
        this.workflData = workData;
        this.workFlColumnDef = [
            {
                fieldName: this.translateService.translate('ocuverif.action'), domain: 'WRK_FLW_ACT',
                field: 'workActionCode', editable: true, width: 150, datatype: 'lov', maxlength: 40,cellEditable: this.canRowCellEdit,
                required:this.queryMode
            },
            {
                fieldName: this.translateService.translate('ocuverif.date'), field: 'createDate',
                editable: false, width: 150, datatype: 'date', maxlength: 10,
            },
            {
                fieldName: this.translateService.translate('ocuverif.time'), maxlength: 5,
                field: 'createDate', editable: false, width: 150, datatype: 'time',
            },
            {
                fieldName: this.translateService.translate('ocuverif.userid'),
                field: 'createUserId', editable: false, width: 150, datatype: 'text', maxlength: 32,
            },
            {
                fieldName: this.translateService.translate('ocuverif.status'),hide:!this.queryMode,
                field: 'status', domain: 'WRK_FLW_ST',editable: true, width: 150, datatype: 'lov', maxlength: 40,cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('ocuverif.commnt'), hide:!this.queryMode, uppercase: 'false',
                field: 'comment', editable: true, width: 150, datatype: 'text', maxlength: 240,cellEditable: this.canRowCellEdit
            },
            {
                fieldName : '', field: 'rowId', hide: true
            }
        ];
        if (this.dialog.data.moduleName === 'RELEASE'){
            this.workflModel.workFlowId = this.dialog.data.workFlowId;
            this.workflExecuteQuery();
        }
    }

    canRowCellEdit = (data: any, index: number, field: string): boolean => {
        let gridData = [];
        if(this.grid.addedMap && this.grid.addedMap.size > 0){
            this.grid.addedMap.forEach((value, keys) => { gridData.push(value); });
        }else if(this.grid.updatedMap && this.grid.updatedMap.size > 0){
            this.grid.updatedMap.forEach((value, keys) => { gridData.push(value); });
        }
        if(gridData.length > 0){
            if(gridData[0].rowId === data.rowId){
                return true;
            }else{
                return false;
            }
        }else if(field === 'workActionCode' && data.workActionCode === 'ENT'){
            return false;
        }
        else {
            return true;
        }

    }

    onButOkclick() {
        this.workflModelTemp.workFlowStatus = 'COMP';
        this.workflModelTemp.workActionCode = 'VER';
        this.dialog.close({
            'workflModelTemp': this.workflModelTemp
        });
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    
    onButCancelclick() {
        this.dialog.close(null);
    }
    workflExecuteQuery() {
        this.workflModel.workFlowId = this.workflModelTemp.workFlowId;
        const workflResult = this.ocuverifFactory.workFlExecuteQuery(this.workflModel);
        workflResult.subscribe(workFlResultList => {
            if (workFlResultList.length === 0) {
                this.workflData = [];
            } else {
                workFlResultList.forEach((elemnt,i) => { 
                    elemnt.status = elemnt.workFlowStatus
                    elemnt['rowId'] = i;
                }); 
                this.workflData = workFlResultList;
                this.workflModel = workFlResultList[0];
            }
        });
    }

    get enableInsertBtn(){
        if(this.queryMode){
            if((this.grid.addedMap && this.grid.addedMap.size > 0) || (this.grid.updatedMap && this.grid.updatedMap.size > 0)){
                return false;
            }else{
                return true;
            }
        }else{
            return this.queryMode;
        }
    }

    onGridInsert= (event) => {
        return { rowId: this.workflData.length + 1, createDate: DateFormat.getDate() ,createUserId: this.userFullName};
    }

    verificationCommit(event) {
        this.workflInsertList = [];
        this.workflUpdatetList = [];
        this.workflDeleteList = [];
        this.workflInsertList = event.added;
        this.workflUpdatetList = event.updated;
        this.workflDeleteList = event.removed;
        if (this.workflInsertList.length > 0) {
            for (let i = 0; i < this.workflInsertList.length; i++) {
                this.workflInsertList[i].workFlowId = this.workflModelTemp.workFlowId;
                this.workflInsertList[i].createUserId=this.sessionManager.getId();
                this.workflInsertList[i].agyLocId= this.dialog.data.agyLocId;
                this.workflInsertList[i].nbtOffenderBookId=this.caseplanBeanTemp.offenderBookId;
                if (!this.workflInsertList[i].workActionCode   ) {
                    this.show(this.translateService.translate('ocuverif.actionmustbeentered'), 'error');
                    return false;
                }
                if (this.workflInsertList[i].workActionCode === 'ENT' && this.workflInsertList[i].status == 'COMP') {
                    this.caseplanBean = this.caseplanBeanTemp;
                    this.caseplanBean.verifiedFlag = 'N';
                    this.caseplanBean.nextReviewDate = DateFormat.getDate();
                }
                else if (this.workflInsertList[i].workActionCode === 'VER' && this.workflInsertList[i].status == 'COMP') {
                    this.caseplanBean = this.caseplanBeanTemp;
                    this.caseplanBean.nextReviewDate = null;
                    this.caseplanBean.verifiedFlag = 'Y'
                }
            }
        }
        if (this.workflUpdatetList.length > 0) {
            for (let i = 0; i < this.workflUpdatetList.length; i++) {
                if (!this.workflUpdatetList[i].workActionCode   ) {
                    this.show(this.translateService.translate('ocuverif.actionmustbeentered'), 'error');
                    return false;
                }
                if (this.workflUpdatetList[i].workActionCode === 'ENT' && this.workflUpdatetList[i].status == 'COMP') {
                    this.caseplanBean = this.caseplanBeanTemp;
                    this.caseplanBean.verifiedFlag = 'N';
                    this.caseplanBean.nextReviewDate = DateFormat.getDate();
                }
                else if (this.workflUpdatetList[i].workActionCode === 'VER' && this.workflUpdatetList[i].status == 'COMP') {
                    this.caseplanBean = this.caseplanBeanTemp;
                    this.caseplanBean.verifiedFlag = 'Y'
                    this.caseplanBean.nextReviewDate = null;
                }
                this.workflUpdatetList[i].nbtOffenderBookId=this.caseplanBeanTemp.offenderBookId;
                this.workflUpdatetList[i].agyLocId= this.dialog.data.agyLocId;
            }
        }

        this.commitModel.insertList = this.workflInsertList;
        this.commitModel.updateList = this.workflUpdatetList;
        this.commitModel.updateNextReviewDate = this.caseplanBean;
        const ServiceObj = this.ocuverifFactory.workFlVerificationCommit(this.commitModel);
        ServiceObj.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.workflExecuteQuery();

            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                return;
            }
        });
    }


    }

