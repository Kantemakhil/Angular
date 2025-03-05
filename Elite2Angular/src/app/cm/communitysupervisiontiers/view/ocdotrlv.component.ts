
import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OffenderTierLevel } from '@cm/communitysupervisiontiers/beans/OffenderTierLevel';
import { OffenderTierLevelCommitBean } from '@cm/communitysupervisiontiers/beans/OffenderTierLevelCommitBean';
import { OcdotrlvService } from '../service/ocdotrlv.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { LovService } from '@core/ui-components/lov/lov.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-ocdotrlv',
    templateUrl: './ocdotrlv.component.html'
})
export class OcdotrlvComponent implements OnInit {
    @ViewChild('grid', { static: true }) grid: any;
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offenderLevelRowData: OffenderTierLevel[] = [];
    offenderLevelRowDataTemp: OffenderTierLevel[] = [];
    offenderModel: OffenderTierLevel = new OffenderTierLevel();
    offenderModelNew: OffenderTierLevel = new OffenderTierLevel();
    offenderCommitModel: OffenderTierLevelCommitBean = new OffenderTierLevelCommitBean();
    offenderIndex: number;
    offenderInsertList: OffenderTierLevel[] = [];
    offenderUpdateList: OffenderTierLevel[] = [];
    offenderDeleteList: OffenderTierLevel[] = [];
    offenderColumnDef: any[];
    message: string;
    type: string;
    msgs: any[] = [];
    msglist = [];
    enableInsert = false;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    tieritles = { description: this.translateService.translate('common.description'), code: this.translateService.translate('common.code') };
    userId: string;
    staffId: number;

    constructor(private ocdotrlvservice: OcdotrlvService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        public lovService: LovService) {

    }
    ngOnInit(): void {
        this.getStaffId();
        this.staffId = this.sessionManager.userSessionDetails().staff.staffId;
        this.offenderColumnDef = [
            { fieldName: this.translateService.translate('ocdotrlv.tierlevel'), field: 'tierLevel', datatype: 'lov', editable: true, required: true, link :'ocdotrlv/offenderTierLevesRecordGroup?caseLoadId='+this.sessionManager.currentCaseLoad , titles: this.tieritles,cellEditable: this.codeCellEditComm ,source:'OCMTIRLV'},
            { fieldName: this.translateService.translate('ocdotrlv.dateassigned'), field: 'dateAssigned', datatype: 'date', editable: true, required: true ,cellEditable: this.codeCellEditComm},
            { fieldName: this.translateService.translate('ocdotrlv.assignmentreason'), field: 'assignmentReason', datatype: 'lov', editable: true, required: true ,domain : 'TIER_REA',cellEditable: this.codeCellEditComm},
            { fieldName: this.translateService.translate('ocdotrlv.assignedby'), field: 'assignedBy', datatype: 'text', editable: false ,cellEditable: this.codeCellEditComm},
            { fieldName: this.translateService.translate('ocdotrlv.approve'), field: 'approveFlag', datatype: 'checkbox', editable: false, cellEditable: this.codeCellEdit },
            { fieldName: this.translateService.translate('ocdotrlv.approveby'), field: 'approvedBy', datatype: 'text', editable: false },
            { fieldName: this.translateService.translate('ocdotrlv.active'), field: 'activeFlag', datatype: 'checkbox', editable: false },
            { fieldName: this.translateService.translate('ocdotrlv.deactivateddate'), field: 'deactivatedDate', datatype: 'date', editable: false,},
            { fieldName: this.translateService.translate('ocdotrlv.nextreviewdate'), field: 'nextReviewDate', datatype: 'date', editable: false },
            { fieldName: this.translateService.translate('ocdotrlv.comment'), field: 'comment', datatype: 'text', width: 150, maxlength: 240, uppercase: 'false', editable: true ,cellEditable: this.codeCellEdit},
            { fieldName:'', field: 'assignedByStaffId', datatype: 'number', editable: false ,hide : true},
            { fieldName:'', field: 'approvedByStaffId', datatype: 'number', editable: false , hide : true},
        ];
    }

    codeCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.assignedBy === 'SYSTEM, SYSTEM') {
            return false;
        } else {
            return true;
        }
    }
    offenderTierLevelExecuteQuery() {
        this.offenderModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offenderModel.caseLoadId = this.sessionManager.currentCaseLoad;
        const serviceObj = this.ocdotrlvservice.offendertierLevelExecuteQuery(this.offenderModel);
        serviceObj.subscribe(data => {
            if (data.length >0) {
                this.offenderLevelRowData = data;
                this.offenderLevelRowData.forEach(e => {
                    e.approveFlag = e.approveFlag === 'Y' ? true : false;
                    e.activeFlag = e.activeFlag === 'Y' ? true : false;
                });
            } else {
                this.offenderLevelRowData = [];
            }
        });
    }
    offenderTierLevelSavesForm(event) {
        this.offenderInsertList = event.added;
        this.offenderUpdateList = event.updated;
        this.offenderDeleteList = event.removed;

        this.offenderCommitModel.insertList = [];
        this.offenderCommitModel.updateList = [];
        this.offenderCommitModel.deleteList = [];

        if (this.offenderInsertList.length > 0 || this.offenderUpdateList.length > 0 || this.offenderDeleteList.length > 0) {
            for (let i = 0; i < this.offenderInsertList.length; i++) {
                // if (this.offenderInsertList[i].approveFlag === true || this.offenderInsertList[i].approveFlag === 'Y') {
                //     this.offenderInsertList[i].approveFlag = 'Y';
                // } else {
                //     this.offenderInsertList[i].approveFlag = 'N';
                // }
                // this.offenderInsertList[i].activeFlag = 'Y';

                if (this.offenderInsertList[i].dateAssigned) {
                    if (this.offenderInsertList[i].dateAssigned && DateFormat.compareDate(DateFormat.getDate(this.offenderInsertList[i].dateAssigned), DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmtirlv.assingedtierlvldateshouldbegreaterthanorequaltooffbkngdate');
                        this.show();
                        return; 
                    }
                }
                
                if (this.offenderInsertList[i].dateAssigned) {
                    if (this.offenderInsertList[i].dateAssigned && DateFormat.compareDate(DateFormat.getDate(this.offenderInsertList[i].dateAssigned), DateFormat.getDate()) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdotrlv.dateassignedcannotbefuturedate');
                        this.show();
                        return; 
                    }
                }
                if (this.offenderInsertList[i].activeFlag === true || this.offenderInsertList[i].activeFlag === 'Y') {
                    this.offenderInsertList[i].activeFlag = 'Y';
                } else {
                    this.offenderInsertList[i].activeFlag = 'N';
                }
             this.offenderInsertList[i].activeFlag = 'Y';
                if (this.offenderInsertList[i].approveFlag === true || this.offenderInsertList[i].approveFlag === 'Y') {
                    this.offenderInsertList[i].approveFlag = 'Y';
                } else {
                    this.offenderInsertList[i].approveFlag = 'N';
                }
                this.offenderInsertList[i].offenderBookId =this.vHeaderBlockModel.offenderBookId;
                this.offenderInsertList[i].nextReviewDate = DateFormat.getDate(this.offenderInsertList[i].nextReviewDate );
                this.offenderInsertList[i].caseLoadId = this.sessionManager.currentCaseLoad;
                this.offenderInsertList[i].dateAssigned = DateFormat.getDate(this.offenderInsertList[i].dateAssigned);
                this.offenderCommitModel.insertList = this.offenderInsertList;
            }
            for (let i = 0; i < this.offenderUpdateList.length; i++) {
                for (let i = 0; i < this.offenderUpdateList.length; i++) {
                    if (this.offenderUpdateList[i].approveFlag === true  || this.offenderUpdateList[i].approveFlag === 'Y') {
                        this.offenderUpdateList[i].approveFlag = 'Y';
                    } else {
                        this.offenderUpdateList[i].approveFlag = 'N';
                    }
                    if (this.offenderUpdateList[i].dateAssigned) {
                        if (this.offenderUpdateList[i].dateAssigned && DateFormat.compareDate(DateFormat.getDate(this.offenderUpdateList[i].dateAssigned), DateFormat.getDate()) === 1) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocdotrlv.dateassignedcannotbefuturedate');
                            this.show();
                            return;
                        }
                    }
                    if (this.offenderUpdateList[i].activeFlag === true || this.offenderUpdateList[i].activeFlag === 'Y') {
                        this.offenderUpdateList[i].activeFlag = 'Y';
                    } else {
                        this.offenderUpdateList[i].activeFlag = 'N';
                    }
                    this.offenderUpdateList[i].nextReviewDate = DateFormat.getDate(this.offenderUpdateList[i].nextReviewDate );
                    this.offenderUpdateList[i].dateAssigned = DateFormat.getDate(this.offenderUpdateList[i].dateAssigned);
                    this.offenderUpdateList[i].deactivatedDate=DateFormat.getDate(this.offenderUpdateList[i].deactivatedDate)
                    this.offenderUpdateList[i].offenderBookId =this.vHeaderBlockModel.offenderBookId;
                    this.offenderUpdateList[i].caseLoadId = this.sessionManager.currentCaseLoad;
                    this.offenderCommitModel.updateList = this.offenderUpdateList;
                }
                this.offenderCommitModel.updateList = this.offenderUpdateList;
            }
            for (let i = 0; i < this.offenderDeleteList.length; i++) {
                this.offenderDeleteList[i].nextReviewDate = DateFormat.getDate(this.offenderDeleteList[i].nextReviewDate );
                this.offenderDeleteList[i].dateAssigned = DateFormat.getDate(this.offenderDeleteList[i].dateAssigned);
                this.offenderCommitModel.deleteList = this.offenderDeleteList;
            }
        }
        const assAnsSaveData = this.ocdotrlvservice.offendertierLevelCommit(this.offenderCommitModel);
        assAnsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offenderTierLevelExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });

    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];

    }
    offenderLevelInsert = () => {
        return { approveFlag: false ,assignedBy :this.userId,assignedByStaffId : this.staffId}

    }
    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'approveFlag') {
            if (event.data.approveFlag) {
                this.grid.setColumnData('approvedBy', rowIndex, this.userId);
                this.grid.setColumnData('approvedByStaffId', rowIndex, this.staffId);
                rowdata.validated = true;
                return rowdata;
            } else {
                this.grid.setColumnData('approvedBy', rowIndex, undefined);
                this.grid.setColumnData('approvedByStaffId', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
       /*  if (event.field === 'dateAssigned') {
                if (event.data.dateAssigned && DateFormat.compareDate(DateFormat.getDate(event.data.dateAssigned), DateFormat.getDate()) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('DateAssigned can not be future date');
                    this.show();
                    this.grid.setColumnData('dateAssigned', rowIndex, undefined);
                    rowdata.validated = true;
                    return rowdata;
                } 
        } */
        rowdata.validated = true;
        return rowdata;
    }

    codeCellEditComm = (data: any, index: number, field: string): boolean => {
        if(!data.createDataTime) {
            return true;
        } else {
            return false;
        }
    }


    onOffenderChange(offender) {
        this.vHeaderBlockModel = new VHeaderBlock();
        if (offender) {
          this.vHeaderBlockModel = offender;
            if (this.vHeaderBlockModel.offenderBookId) {
                this.enableInsert = true;
                this.offenderTierLevelExecuteQuery();
            }
        }
        else {
          this.offenderLevelRowData = [];
          this.enableInsert = false;

        }
      }



      getStaffId(){
        const data = this.ocdotrlvservice.offTierLevesUserIdRecordGroup(this.sessionManager.getId());
        data.subscribe(data=>{
            this.userId = data;
        });
      }
}