import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef, ViewChild
} from '@angular/core';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { TranslateService } from '@common/translate/translate.service';
import { OumtrnbkService } from '../service/oumtrnbk.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VMergeTransactionProcesses } from '@sa/admin/mergeoffenders/beans/VMergeTransactionProcesses';
import { VMergeTransactionProcessesCommitBean } from '@sa/admin/mergeoffenders/beans/VMergeTransactionProcessesCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { MergeTransactionBean } from '@sa/recordmaintenance/beans/MergeTransactionBean';
import { Router } from '@angular/router';
import { MergeTransactionProcesses } from '@sa/recordmaintenance/beans/MergeTransactionProcesses';
import { MergeTransactionProcessesCommitBean } from '@sa/recordmaintenance/beans/MergeTransactionProcessesCommitBean';
import { OummerofService } from '../service/oummerof.service';
import { InjectOffenderService } from '@core/service/inject-offender.service';

@Component({
    selector: 'app-oumtrnbk',
    templateUrl: './oumtrnbk.component.html'
})

export class OumtrnbkComponent implements OnInit {
    @ViewChild('gridone',{ static: true }) gridone: any;
    @ViewChild('gridtwo', { static: true }) gridtwo: any;
    toLabelName: string;
    fromLabelName: string;
    isshowing = false;
    name: string;
    @ViewChild('dialog') dialog: DialogComponent;
    msgs: any[] = [];
    mrgprocData: VMergeTransactionProcesses[] = [];
    mrgprocModel: VMergeTransactionProcesses = new VMergeTransactionProcesses();
    mrgprocBean: VMergeTransactionProcesses = new VMergeTransactionProcesses();
    mrgprocIndex = 0;
    mrgprocInsertList: VMergeTransactionProcesses[] = [];
    mrgprocUpdateList: VMergeTransactionProcesses[] = [];
    mrgprocDeleteList: VMergeTransactionProcesses[] = [];
    minDate: any;
    display: boolean;
    mrgProcColumnDef: any[];
    mrgProcpColumnDef: any[];
    trnBkgHeaderReadOnly = false;
    bkgDatesReadOnly = false;
    mrgProcReadOnly = false;
    prvbkgendDate: any;
    prvTime: any;
    trnStartDate: any;
    trnStartTime: any;
    trnEndDate: any;
    trnEndTime: any;
    subseqDate: any;
    subseqTime: any;
    fromName: string;
    toName: string;
    mrgTrnBean: MergeTransactionBean = new MergeTransactionBean();
    mrgprocCommitModel: VMergeTransactionProcessesCommitBean = new VMergeTransactionProcessesCommitBean();
    MrgTrnProcInsertList: MergeTransactionProcesses[] = [];
    MrgTrnProcDeleteList: MergeTransactionProcesses[] = [];
    MrgTrnProcUpdateList: MergeTransactionProcesses[] = [];
    MrgTrnProcCommitModel: MergeTransactionProcessesCommitBean = new MergeTransactionProcessesCommitBean();
    mergeTransId: any;
    constructor(private oumtrnbkFactory: OumtrnbkService,private oummerofFactory: OummerofService,
        public translateService: TranslateService, public sessionManager: UserSessionManager,
        public dialogService: DialogService, private router: Router, private injectOffenderService: InjectOffenderService,) {
        this.mrgProcColumnDef = [];
        this.mrgProcpColumnDef = [];
    }
    ngOnInit() {
        this.mrgTrnBean.pToOffBookId =  this.oummerofFactory.mrgprocModel.pToOffBookId;
        this.mrgTrnBean.pToFirstName =  this.oummerofFactory.mrgprocModel.pToFirstName;
        this.mrgTrnBean.pToLastName = this.oummerofFactory.mrgprocModel.pToLastName;
        this.mrgTrnBean.pToOffenderId = this.oummerofFactory.mrgprocModel.pToOffenderId;
        this.mrgTrnBean.pToOffIdDisplay = this.oummerofFactory.mrgprocModel.pToOffIdDisplay;
        this.mrgTrnBean.pToRootOffId = this.oummerofFactory.mrgprocModel.pToRootOffId;

        this.mrgTrnBean.pFromOffBookId = this.oummerofFactory.mrgprocModel.pFromOffBookId;
        this.mrgTrnBean.pFromFirstName = this.oummerofFactory.mrgprocModel.pFromFirstName;
        this.mrgTrnBean.pFromLastname = this.oummerofFactory.mrgprocModel.pFromLastname;
        this.mrgTrnBean.pFromOffenderId = this.oummerofFactory.mrgprocModel.pFromOffenderId;
        this.mrgTrnBean.pFromOffIdDisplay = this.oummerofFactory.mrgprocModel.pFromOffIdDisplay;
        this.mrgTrnBean.pFromRootOffId = this.oummerofFactory.mrgprocModel.pFromRootOffId;
        this.mrgTrnBean.pFromBookingNo = this.oummerofFactory.mrgprocModel.pFromBookingNo

        this.isshowing = true;
        this.fromName = this.mrgTrnBean.pFromLastname + ',' + this.mrgTrnBean.pFromFirstName;
        this.toName = this.mrgTrnBean.pToLastName + ',' + this.mrgTrnBean.pToFirstName;
        this.mrgprocExecuteQuery();
        this.name = this.translateService.translate('system-profile.name-last') + ',' + this.translateService.translate('system-profile.name-given-1');
        this.mrgProcColumnDef = [
            { fieldName: this.translateService.translate('common.module'), field: 'processName',
             editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.description'), field: 'processDescription', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.transfer'), field: 'transferFlag', cellEditable: this.canCheckboxEdit, width: 150, datatype: 'checkbox'},
        ];
        this.mrgProcpColumnDef = [
            { fieldName: this.translateService.translate('common.module'), field: 'processName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.description'), field: 'processDescription', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oumtrnbk.leftlimitdate'), field: 'beginDate', editable: true, width: 150,
             datatype: 'date',  cellEditable: this.canCellEdit },
            { fieldName: this.translateService.translate('common.time'), field: 'beginTime',
             editable: true, width: 150, datatype: 'time',  cellEditable: this.canCellEdit },
            { fieldName: this.translateService.translate('oumtrnbk.rightlimitdate'), field: 'endDate', editable: true, width: 150, datatype: 'date',
            cellEditable: this.canCellEdit },
            { fieldName: this.translateService.translate('common.time'), field: 'endTime',
             editable: true, width: 150, datatype: 'time',  cellEditable: this.canCellEdit },
             { fieldName: this.translateService.translate('common.transfer'), field: 'transferFlag', hide: true, width: 150, datatype: 'checkbox' },
        ];
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (this.mrgprocBean.transferFlag  && this.mrgprocBean.timeframeFlag === 'Y') {
          return true;
        }
        return false;
      }
    validateRowData = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'transferFlag') {
            event.data.checkFlag = true;
         if (event.data.transferFlag && event.data.timeframeFlag === 'Y') {
            this.gridtwo.setColumnData('beginDate', index, this.mrgprocModel.bookingStartdate);
            this.gridtwo.setColumnData('beginTime', index, this.mrgprocModel.bookingStartdate);
            this.gridtwo.setColumnData('endDate', index, this.mrgprocModel.bookingEndDate);
            this.gridtwo.setColumnData('endTime', index, this.mrgprocModel.bookingEndDate);
          } else {
            this.gridtwo.setColumnData('beginDate', index, undefined);
            this.gridtwo.setColumnData('beginTime', index, undefined);
            this.gridtwo.setColumnData('endDate', index, undefined);
            this.gridtwo.setColumnData('endTime', index, undefined);
          }
          if (event.data.mandatoryOnFlag === 'Y' ) {
              event.data.checkFlag = false;
            this.gridone.setColumnData('transferFlag', index, true);
            this.gridtwo.setColumnData('transferFlag', index, true);
          }
        }
        rowdata.validated = true;
        return rowdata;
    }
    /**
          * This function displays the messages
          */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickmrgProc(event) {
        if (event) {
            this.mrgprocBean = event;
        } else {
            this.mrgprocBean = new VMergeTransactionProcesses();
        }
    }
    mrgprocExecuteQuery() {
        const mrgprocResult = this.oummerofFactory.
            mrgProcExecuteQuery(this.mrgTrnBean);
        mrgprocResult.subscribe(mrgprocResultList => {
            if (mrgprocResultList.length === 0) {
                this.mrgprocData = [];
                this.mrgprocIndex = -1;
            } else {
                mrgprocResultList.forEach(elemnt => {
                    elemnt.programId = String(elemnt.programId);
                    elemnt.button = '..';
                    elemnt.transferFlag = elemnt.transferFlag === 'Y' ? true : false;
                    this.mergeTransId = elemnt.mergeTransactionId ;
                    if(elemnt.prevBkgEndDate !== null && elemnt.beginDate !== null && elemnt.endDate !== null){
                        this.mrgprocModel.prevBkgEndDate = DateFormat.getDate(elemnt.prevBkgEndDate);
                        this.mrgprocModel.bookingStartdate = DateFormat.getDate(elemnt.beginDate);
                        this.mrgprocModel.bookingEndDate = DateFormat.getDate(elemnt.endDate);
                        this.mrgprocModel.nextBkgStartDate = DateFormat.getDate(elemnt.beginDate);
                    }
                  });
                this.mrgprocData = mrgprocResultList;
                this.mrgprocIndex = 0;
            }
            this.oumtrnbkSavemrgprocForm(mrgprocResultList);
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oumtrnbkSavemrgprocForm(event) {
        this.MrgTrnProcInsertList = [];
        this.MrgTrnProcDeleteList = [];
        this.MrgTrnProcInsertList = event;
        this.MrgTrnProcUpdateList = event.updated ;
        this.MrgTrnProcCommitModel = new MergeTransactionProcessesCommitBean();
        if (this.MrgTrnProcInsertList && this.MrgTrnProcInsertList.length > 0) {
            this.MrgTrnProcCommitModel.insertList = this.MrgTrnProcInsertList;
            for (let i = 0; i < this.MrgTrnProcInsertList.length; i++) {
                this.MrgTrnProcInsertList[i].createDatetime = DateFormat.getDate();
                this.MrgTrnProcInsertList[i].createUserId = this.sessionManager['userSession'].id
            }
            this.MrgTrnProcCommitModel.insertList = this.MrgTrnProcInsertList;
            const mrgprocSaveData = this.oummerofFactory.mrgProcCommit(this.MrgTrnProcCommitModel);
            mrgprocSaveData.subscribe(data => {
            });
        }
        if (this.MrgTrnProcUpdateList && this.MrgTrnProcUpdateList.length > 0) {
            for (let i = 0; i < this.MrgTrnProcUpdateList.length; i++) {
                this.MrgTrnProcUpdateList[i].modifyDatetime = DateFormat.getDate();
                this.MrgTrnProcUpdateList[i].modifyUserId = this.sessionManager['userSession'].id
            }
            this.MrgTrnProcCommitModel.updateList = this.MrgTrnProcUpdateList;
            const mrgprocSaveData = this.oummerofFactory.mrgProcCommit(this.MrgTrnProcCommitModel);
            mrgprocSaveData.subscribe(data => {
                if (data === 1) {
                   this.mrgProcExecuteQueryRet();
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                } else {
                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                }
            }); 
        }
    }
    onButNext() {
        this.isshowing = false;
    }
    onButCancelclick() {
        this.dialog.close(null);
    }
    onButProceed() {
        const data = {
            label: 'Do you want to transfer Offender: ' + this.mrgTrnBean.pFromOffIdDisplay + ' ' +
            this.fromName + '    Booking: ' + this.mrgTrnBean.pFromBookingNo + ' into Offender: ' +
            + this.mrgTrnBean.pToOffIdDisplay + ' ' + this.toName + '?'
            , yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (result) {
                this.transferBooking();
            } else {
            }
        });
    }
    onButPrevious() {
        this.isshowing = true;
    }
    transferBooking() {
        if (!this.mrgTrnBean.pFromRootOffId || !this.mrgTrnBean.pToRootOffId) {
      this.show('oumtrnbk.pleaseselectthetwooffenderstomerge', 'warn');
      return;
        }
        this.mrgTrnBean.pMergeTransactionId = this.mrgprocModel.mergeTransactionId;
        this.mrgTrnBean.pMergeTransactionId = this.mergeTransId;
        const checkTrnData = this.oummerofFactory.chkOffendersForTransfer1(this.mrgTrnBean);
        checkTrnData.subscribe(resultValue => {
            if (resultValue) {
                this.processTransferTransaction();
            } else if (resultValue.includes('-20210')) {
                this.show(this.translateService.translate('oumtrnbk.exsameoffdrsmergerequest'), 'warn');
            } else if (resultValue.includes('-20220')) {
                this.show(this.translateService.translate('oumtrnbk.exsameoffdrsnameexists'), 'warn');
            } else if (resultValue.includes('-20250')) {
                this.show(this.translateService.translate('oumtrnbk.exinactiveafteractivebook'), 'warn');
            } else if (resultValue.includes('-20290')) {
                this.show(this.translateService.translate('oumtrnbk.exbothoffendersactive'), 'warn');
            } else if (resultValue.includes('-20260')) {
                this.show(this.translateService.translate('oumtrnbk.exnotenoughbooking'), 'warn');
            } else if (resultValue.includes('-20120')) {
                this.show(this.translateService.translate('oumtrnbk.enaliendedintimeframe'), 'warn');
            } else if (resultValue.includes('-20110')) {
                this.show(this.translateService.translate('oumtrnbk.exdedexistsouttimefram'), 'warn');
            } else if (resultValue.includes('-20100')) {
                this.show(this.translateService.translate('oumtrnbk.exaccountnotinsync'), 'warn');
            } else  {
                this.show(this.translateService.translate('oumtrnbk.transferbookingcannotproceed'), 'warn');
            }
        });
    }
    processTransferTransaction() {
        const processdata = this.oummerofFactory.processTransferTransaction(this.mrgTrnBean);
        processdata.subscribe(data => {
            if (data && data === 'success') {
                this.show(this.translateService.translate('oumtrnbk.transferbookingprocesscompleted'), 'success');
                this.dialog.close('success');
            } else if (data && data.includes('-20870')) {
                this.show(this.translateService.translate('oumtrnbk.exduplicatemergerequest'), 'warn');
            } else if (data && data.includes('-54')) {
                this.show(this.translateService.translate('oumtrnbk.resurcebussy'), 'warn');
            } else {
                this.show(this.translateService.translate('oumtrnbk.erroroccured'), 'warn');
            }
        });
    }
    canCheckboxEdit = (data: any, index: number, field: string): boolean => {
        if (data.mandatoryOnFlag === 'N') {
            return true;
        } else {
            return false;
        }
    }
    mrgProcExecuteQueryRet() {
        this.mrgTrnBean.pMergeTransactionId = this.mergeTransId;
        const mrgprocResult = this.oummerofFactory.
            mrgProcExecuteQueryRet(this.mrgTrnBean);
        mrgprocResult.subscribe(mrgprocResultList => {
            if (mrgprocResultList.length === 0) {
                this.mrgprocData = [];
                this.mrgprocIndex = -1;
            } else {
                mrgprocResultList.forEach(elemnt => {
                    elemnt.programId = String(elemnt.programId);
                    elemnt.button = '..';
                    elemnt.transferFlag = elemnt.transferFlag === 'Y' ? true : false;
                });
                this.mrgprocData = mrgprocResultList;
                this.mrgprocIndex = 0;
            }
        });
    }
}
