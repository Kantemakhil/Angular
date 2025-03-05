import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmoncoaService } from '../service/otmoncoa.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadAccountPeriods } from '@inmate/trust/financialsmaintenance/transaction/beans/CaseloadAccountPeriods';
import { CaseloadAccountPeriodsCommitBean } from '@inmate/trust/financialsmaintenance/transaction/beans/CaseloadAccountPeriodsCommitBean';

@Component({
   selector: 'app-otmoncoa',
   templateUrl: './otmoncoa.component.html'
})

export class OtmoncoaComponent implements OnInit {
   msgs: any[] = [];
   totalCount = 0;
   link: string;
   caseloadType: string;
   titles: any;
   index: number;
   toRowNum: number;
   fromRowNum: number;
   mode: string;
   isParamQuery: boolean;
   csldapData:  CaseloadAccountPeriods [] = [];
   csldapModel: CaseloadAccountPeriods = new CaseloadAccountPeriods();
   csldapInsertList: CaseloadAccountPeriods[] = [];
   csldapUpdatetList: CaseloadAccountPeriods[] = [];
   csldapDeleteList: CaseloadAccountPeriods[] = [];
   csldapCommitModel: CaseloadAccountPeriodsCommitBean = new CaseloadAccountPeriodsCommitBean();
   openCharAcctColumnDef: any[];
   csldcaIndex = -1;
   constructor(private otmoncoaFactory: OtmoncoaService , public translateService: TranslateService,
      public sessionManager: UserSessionManager) {
         this.openCharAcctColumnDef = [];
   }
   ngOnInit() {
      this.caseloadType = this.sessionManager.currentCaseLoadType;
      // this.link = `otmoncoa/cgfkCsldApCaseloadIdRecordGroup?caseloadType=${this.caseloadType}`;
      // this.titles = {code: this.trMsg('common.caseload'), description: this.trMsg('common.description')};
      // this.mode = this.ADDEDMODE;
      this.openCharAcctColumnDef = [
         {
            fieldName: this.translateService.translate('common.caseload') + '*', field: 'caseloadId', datatype: 'lov', editable: true, width: 150,
            link: 'otmoncoa/cgfkCsldApCaseloadIdRecordGroup?caseloadType=' + this.caseloadType, source: "OUMACASE", cellEditable: this.canCellEdit
         },
      ];

      this.ok();
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
   trMsg(msg, astr?) {
         return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
   }
    ok() {
      if (this.csldapModel.caseloadId) {
         this.isParamQuery = true;
      } else {
         this.isParamQuery = false;
      }
      this.index = 0;
       this.csldapModel.fromRowNum = 1;
       this.csldapModel.toRowNum = 100;
      this.csldapExecuteQuery();
   }
   next() {
      if ((this.index + 1) % 100 === 0) {
         const fromRowNum = this.csldapModel.rowNum + 1;
         const toRowNum = this.csldapModel.rowNum + 100;
         this.csldapModel = new CaseloadAccountPeriods();
         this.csldapModel.fromRowNum = fromRowNum;
         this.csldapModel.toRowNum = toRowNum;
         this.index = 0;
       this.csldapExecuteQuery();
      } else {
         this.index++;
      this.csldapModel = this.csldapData[this.index];
      }
}

previous() {
      if (((this.csldapModel.rowNum - 1) % 50) === 0) {
         const fromRowNum = this.csldapModel.rowNum - 1;
         const toRowNum = this.csldapModel.rowNum - 100;
         this.csldapModel = new CaseloadAccountPeriods();
         this.csldapModel.fromRowNum = fromRowNum;
         this.csldapModel.toRowNum = toRowNum;
         this.index = 99;
       this.csldapExecuteQuery();
      } else {
         this.index--;
      this.csldapModel = this.csldapData[this.index];
      }
}
    no() {
   }
    cancel() {
      this.mode = this.QUERYMODE;
      this.index = 0;
      this.totalCount = 0;
      this.csldapData = [];
      this.csldapModel = new CaseloadAccountPeriods();
   }
    add() {
       this.cancel();
       this.mode = this.ADDEDMODE;
    }
   onOffenderChange(offender) {
   }
   csldapExecuteQuery() {
            const reqData = JSON.parse(JSON.stringify(this.csldapModel));
            if (!this.isParamQuery) {
               reqData.caseloadId = null;
            }
             const csldapResult = this.otmoncoaFactory.
             csldApExecuteQuery(reqData);
                csldapResult.subscribe(csldapResultList => {
               if (csldapResultList.length === 0) {
                  this.csldapData = [];
               } else {
                  this.csldapData = csldapResultList;
                  // this.csldapModel = this.csldapData[this.index];
                  this.csldcaIndex = 0;
                  this.getTotalCount();
                  this.mode = this.FETCHMODE;
               }
            });
         }
   getTotalCount() {
      const caseloadId = this.isParamQuery ? this.csldapModel.caseloadId : '';
      this.otmoncoaFactory.getTotalCount(caseloadId).subscribe(totCount => {
         this.totalCount = totCount;
      });
   }

   get nextFlag(): boolean {
      if (this.mode !== this.FETCHMODE) {
         return true;
      }
      if (this.csldapModel.rowNum === this.totalCount) {
         return true;
      } else {
         return false;
      }
   }

   get previousFlag(): boolean {
      if (this.mode !== this.FETCHMODE) {
         return true;
      }
      if (this.csldapModel.rowNum === 1) {
         return true;
      } else {
         return false;
      }
   }

   get isFetchMode(): boolean {
      return this.mode === this.FETCHMODE;
   }

   get isQueryMode(): boolean {
      return this.mode === this.QUERYMODE;
   }

   get isaddedMode(): boolean {
      return this.mode === this.ADDEDMODE;
   }

   caseloadBlur() {
      if (!this.csldapModel.caseloadId) {
         this.csldapModel.caseloadId = this.csldapModel.caseloadId === '' ? undefined : '';
      }
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   otmoncoaSavecsldapForm(event) {

      this.csldapInsertList = event.added;
      this.csldapDeleteList = event.removed;
      this.csldapCommitModel.insertList = [];
      this.csldapCommitModel.deleteList = [];

      this.csldapCommitModel.insertList = this.csldapInsertList;
      this.csldapCommitModel.deleteList = this.csldapDeleteList;
      const csldapSaveData = this.otmoncoaFactory.csldApCommit( this.csldapCommitModel );
      csldapSaveData.subscribe( data => {
       if ( String(data) === '1' ) {
         this.show('common.addupdateremoverecordsuccess', 'success');
      } else if (String(data).includes('CSLD_AP_CSLD_F2') && String(data).includes('2291')) {
         this.show('This Caseload    : does not exist');
      } else if (String(data).includes('CSLD_AP_AC_PRD_F1') && String(data).includes('2291')) {
         this.show('This Fiscal Year : does not exist');
      } else if (String(data).includes('CSLD_AH_CSLD_AP_F1')  && String(data).includes('2292')) {
         this.show('Cannot delete Caseload Accounts while dependent GL Account History exists');
      } else if (String(data).includes('CSLD_AH_CSLD_AP_F1') && String(data).includes('2292')) {
         this.show('Cannot delete Caseload Accounts while   dependent GL Account History exists');
      }   else {
         this.show('common.addupdateremoverecordfailed', 'error');
      }
      this.csldapModel = new CaseloadAccountPeriods();
      this.ok();
         });
   }

   save() {
      if (!this.csldapModel.caseloadId) {
         this.show('otmoncoa.caseloadmustbeenter');
         return;
      } else {
         const event = {added: [], removed: []};
         event.added.push(this.csldapModel);
         this.otmoncoaSavecsldapForm(event);
      }
   }
   delete() {
      const event = {added: [], removed: []};
      event.removed.push(this.csldapModel);
      this.otmoncoaSavecsldapForm(event);
   }

   canCellEdit = (data: any, index: number, field: string): boolean => {
      if (data.createDatetime) {
         return false;
      }
      return true;
   }

   get ADDEDMODE() {
      return 'A';
   }
   get QUERYMODE() {
      return 'Q';
   }
   get FETCHMODE() {
      return 'F';
   }


}
