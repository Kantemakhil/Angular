    import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdofrezService } from '../service/otdofrez.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderFreezeDisbursements } from '@inmatetrustaccountsbeans/OffenderFreezeDisbursements';
import { OffenderFreezeDisbursementsCommtBean } from '@inmatetrustaccountsbeans/OffenderFreezeDisbursementsCommtBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
    selector: 'app-otdofrez',
    templateUrl: './otdofrez.component.html',
    styleUrls: []
})

export class OtdofrezComponent implements OnInit {
    msgs: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offfdData: any[] = []; // OffenderFreezeDisbursements [] = [];
    offfdDataTemp: OffenderFreezeDisbursements[] = [];
    offfdModel: OffenderFreezeDisbursements = new OffenderFreezeDisbursements();
    offfdInsertList: OffenderFreezeDisbursements[] = [];
    offfdUpdateList: OffenderFreezeDisbursements[] = [];
    offfdDeleteList: OffenderFreezeDisbursements[] = [];
    offfdCommitModel: OffenderFreezeDisbursementsCommtBean = new OffenderFreezeDisbursementsCommtBean();
    offFdColumnDef: any[];
    selected = -1;
    insertFlag: boolean;
    removeFreezbutton: boolean;
    constructor(private otdofrezFactory: OtdofrezService, private sessionManager: UserSessionManager,
        public translateService: TranslateService, private offenderSearchService: OffenderSearchService,
         public dialogService: DialogService) {
        this.offFdColumnDef = [];
    }
    ngOnInit() {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.removeFreezbutton = true;
        const titles = { code: 'Reason', description: 'Description' };
        this.offFdColumnDef = [
            { fieldName: this.translateService.translate('otdofrez.fromdate') + '*', field: 'fromDate', datatype: 'date',
             editable: true, cellEditable: this.canOffInvEdit,  width: 150 },
            { fieldName: this.translateService.translate('otdofrez.todate') + '*' , field: 'toDate', datatype: 'date',
             editable: true, cellEditable: this.canOffInvEdit , width: 150 },
            {
                fieldName: this.translateService.translate('otdofrez.reason') + '*' , field: 'freezeReasonCode',
                 datatype: 'lov', domain:'FREEZE_RSN'/*link: 'otdofrez/cgfkOffFdFreezeReasonCodeRecordGroup'*/,
                editable: true, cellEditable: this.canOffInvEdit, width: 150
            },
            { fieldName: this.translateService.translate('otdofrez.comment'), field: 'commentText',
             datatype: 'text', editable: true, cellEditable: this.canOffInvEdit, width: 150,
            uppercase: 'false', maxlength: 240 },
            { fieldName:  this.translateService.translate('otdofrez.status'), field: 'nbtStatus',
             datatype: 'text', editable: false, width: 150 },
        ];
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'));
            return;
        }
    }
    onRowClickofffd(event) {
        if (event  && event.createUserId) {
            this.offfdModel = event;
            if (this.offfdModel.nbtStatus === 'REMOVED') {
                this.removeFreezbutton = true;
            } else {
                this.removeFreezbutton = false;
            }
        }
        else{
            this.removeFreezbutton = true;

        }
    }
    canOffInvEdit = ( data: any, index: number, field: string ): boolean => {
        if ( !data.offenderFreezeId ) {
            return true;
        }
        return false;
    }
    ok() {
    }

    no() {
    }
    cancel() {
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onOffenderChange(offender) {
        if (offender) {
            this.insertFlag = true;
            this.vHeaderBlockModel = offender;
            this.removeFreezbutton = true;
            this.offfdExecuteQuery();
        } else {
            this.insertFlag = false;
            this.offfdData = [];
            this.removeFreezbutton = true;
        }
        if (!this.offenderSearchService.selectedOffender.trustAccount) { 
            this.insertFlag = false;
        }

    }
    offfdExecuteQuery() {
        if (this.sessionManager.currentCaseLoad && this.vHeaderBlockModel.offenderId) {
            this.offfdModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.offfdModel.offenderId = this.vHeaderBlockModel.offenderId;
        }
        const offfdResult = this.otdofrezFactory.offfdExecuteQuery(this.offfdModel);
        offfdResult.subscribe(data => {
            if (data.length === 0) {
                this.offfdData = [];
                this.removeFreezbutton = true;
            } else {
                data.forEach(element => {
                    if (element.removedFlag === 'Y') {
                        element.nbtStatus = 'REMOVED';
                        this.removeFreezbutton = true;
                    } else if (element.toDate && DateFormat.compareDate(DateFormat.getDate(element.toDate), DateFormat.getDate()) < 0) {
                        element.nbtStatus = 'EXPIRED';
                    } else {
                        element.nbtStatus = 'ACTIVE';
                    }
                });
                this.offfdData = data;
                this.offfdModel = data[0];
                this.removeFreezbutton = false;
                this.selected = 0;
            }
        });
    }
    onGridInsert = () => {
        if (!this.offenderSearchService.selectedOffender.trustAccount) { 
            this.show(this.translateService.translate('common.offendernotintrustaccount'));
            return;
        }
        if (this.offfdData.length > 0) {
            if (!this.offfdData[this.offfdData.length - 1].fromDate) {
                this.show(this.translateService.translate('otdofrez.fromdatemust'));
                return;
            }
            if (!this.offfdData[this.offfdData.length - 1].toDate) {
                this.show(this.translateService.translate('otdofrez.todatemust'));
                return;
            }
            if (!this.offfdData[this.offfdData.length - 1].freezeReasonCode) {
                this.show(this.translateService.translate('otdofrez.reasonmust'));
                return;
            }
        }
        return { fromDate: '', toDate: '', freezeReasonCode: '', commentText: '', nbtStatus: '' };

    }
    freezeOffDisburse = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'fromDate' && event.oldValue !== event.newValue) {
            if (event.data.fromDate) {
                const fromDate = event.data.fromDate;
                const date = DateFormat.getDate();
                if ((DateFormat.compareDate(DateFormat.getDate(fromDate), date) === -1)) {
                    this.show(this.translateService.translate('otdofrez.fromdatemustbegreater') + DateFormat.format(date));
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            if (event.data.fromDate && event.data.toDate) {
                const fromDate = event.data.fromDate;
                const toDate = event.data.toDate;
                if ((DateFormat.compareDate(DateFormat.getDate(fromDate), toDate) === 1)) {
                    this.show(this.translateService.translate('otdofrez.fromdatemustbeless'));
                    rowdata.validated = true;
                    return rowdata;
                }
                if ((DateFormat.compareDate(DateFormat.getDate(toDate),
                        DateFormat.getDate(fromDate)) === 1)) {
                        this.show(this.translateService.translate('otdofrez.todatemustbegreater'));
                        rowdata.validated = true;
                         return rowdata;
                    }
            }
        }
        if (event.field === 'toDate') {
            const date = DateFormat.getDate();
            const toDate = event.data.toDate;
            const fromDate = event.data.fromDate;
            if ((DateFormat.compareDate(DateFormat.getDate(toDate), date) === -1)) {
                this.show(this.translateService.translate('otdofrez.todatemustbegreaterequal') + DateFormat.format(date));
                rowdata.validated = true;
                return rowdata;
            }
            if ((DateFormat.compareDate(DateFormat.getDate(fromDate),
                        DateFormat.getDate(toDate)) === 1)) {
                        this.show(this.translateService.translate('otdofrez.todatemustbegreaterthanfromdate'));
                        rowdata.validated = true;
                         return rowdata;
                    }
        }


        rowdata.validated = true;
        return rowdata;
    }

    onRemoveFreezeButclick() {
        this.offfdCommitModel.insertList = [];
        this.offfdCommitModel.updateList = [];
        this.offfdUpdateList = [];
        if (this.offfdModel.offenderFreezeId) {
        const data = {
            label: this.translateService.translate('otdofrez.doyou'), yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
            if (result) {
                    this.offfdModel.removedFlag = 'Y';
                    this.offfdModel.modifyDatetime = DateFormat.getDate();
                    this.offfdUpdateList.push(this.offfdModel);
                this.offfdCommitModel.updateList = this.offfdUpdateList;
                const offemploymentsSaveData = this.otdofrezFactory.offfdCommit(this.offfdCommitModel);
                offemploymentsSaveData.subscribe(dataResult => {
                    if (dataResult === 1) {
                        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                        this.offfdExecuteQuery();
                    } else {
                        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                        this.offfdExecuteQuery();
                    }
                });
            } else {
            }
        });
    }


    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdofrezSaveofffdForm(event) {
        this.offfdInsertList = event.added;
        this.offfdUpdateList = event.updated;
        this.offfdDeleteList = event.removed;
        this.offfdCommitModel.insertList = [];
        this.offfdCommitModel.updateList = [];
        this.offfdCommitModel.deleteList = [];
        if (this.offfdInsertList.length > 0) {
            for (let i = 0; i < this.offfdInsertList.length; i++) {
                if (!this.offfdInsertList[i].fromDate) {
                    this.show(this.translateService.translate('otdofrez.fromdatemust'));
                    return;
                }
                if (!this.offfdInsertList[i].toDate) {
                    this.show(this.translateService.translate('otdofrez.todatemust'));
                    return;
                }
                if (!this.offfdInsertList[i].freezeReasonCode) {
                    this.show(this.translateService.translate('otdofrez.reasonmust'));
                    return;
                }
                if (this.offfdInsertList[i].fromDate) {
                    if ((DateFormat.compareDate(DateFormat.getDate(DateFormat.getDate()),
                    this.offfdInsertList[i].fromDate) === 1)) {
                        this.show(this.translateService.translate('otdofrez.fromdatemustbegreater') +
                         DateFormat.format(DateFormat.getDate()));
                        return;
                    }
                }
                if (this.offfdInsertList[i].fromDate && this.offfdInsertList[i].toDate) {
                    if ((DateFormat.compareDate(DateFormat.getDate(this.offfdInsertList[i].fromDate),
                        DateFormat.getDate(this.offfdInsertList[i].toDate)) === 1)) {
                        this.show(this.translateService.translate('otdofrez.fromdatemustbeless'));
                        return;
                    }
                    if ((DateFormat.compareDate(DateFormat.getDate(this.offfdInsertList[i].fromDate),
                        DateFormat.getDate(this.offfdInsertList[i].toDate)) === 1)) {
                        this.show(this.translateService.translate('otdofrez.todatemustbegreater'));
                        return;
                    }
                }
                // if (this.offfdInsertList[i].toDate) {
                //     if ((DateFormat.compareDate(DateFormat.getDate(this.offfdInsertList[i].toDate),
                //         DateFormat.getDate()) === 0)) {
                //         this.show(this.translateService.translate('otdofrez.todatemustbegreaterequal') +
                //          DateFormat.format(DateFormat.getDate()));
                //         return;
                //     }
                // }
                
                this.offfdInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
                this.offfdInsertList[i].offenderId = this.vHeaderBlockModel.offenderId;
                this.offfdInsertList[i].removedFlag = 'N';
                this.offfdInsertList[i].createDatetime = DateFormat.getDate();
                this.offfdInsertList[i].modifyDatetime = DateFormat.getDate();
               
                // for (let i = 0; i < this.offfdData.length; i++) {
                //     for (let j = 0; j <this.offfdData.length; j++) {
                //         if(i!=j && this.offfdData[i].nbtStatus !== 'REMOVED' && this.offfdData[j].nbtStatus !== 'REMOVED' 
                //                 && this.offfdData[i].nbtStatus != "" && this.offfdData[j].nbtStatus != "" &&
                //                    this.offfdData[i].freezeReasonCode == this.offfdData[j].freezeReasonCode
                //                    && this.offfdData[i].fromDate === this.offfdData[j].fromDate
                //                    && this.offfdData[i].toDate === this.offfdData[j].toDate
                //                    ){
                //             this.show(this.translateService.translate('otdofrez.rowexistalready'), 'warn');
                //              return;
                //         } 
                //     }
                // }
            }



            this.offfdCommitModel.insertList = this.offfdInsertList;
        }
        if (this.offfdUpdateList.length > 0) {
            for (let i = 0; i < this.offfdUpdateList.length; i++) {
            }
            this.offfdCommitModel.updateList = this.offfdUpdateList;
        }
        if (this.offfdDeleteList.length > 0) {
            for (let i = 0; i < this.offfdDeleteList.length; i++) {
            }
            this.offfdCommitModel.deleteList = this.offfdDeleteList;
        }
        const offfdSaveData = this.otdofrezFactory.offfdCommit(this.offfdCommitModel);
        offfdSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.offfdExecuteQuery();
            } else  if (data === 2) {
                this.show(this.translateService.translate('otdofrez.rowexistalready'), 'warn');
                this.offfdExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                this.offfdExecuteQuery();
            }
        });
    }


}
