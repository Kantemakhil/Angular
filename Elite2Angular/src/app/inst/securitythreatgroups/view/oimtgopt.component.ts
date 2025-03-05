import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimtgoptService } from '../service/oimtgopt.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SecurityThreatGroupsHtyCommitBean } from '@inst/securitythreatgroups/beans/SecurityThreatGroupsHtyCommitBean';
import { SecurityThreatGroupsHty } from '@inst/securitythreatgroups/beans/SecurityThreatGroupsHty';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { LovService } from '@core/ui-components/lov/lov.service';

@Component({
   selector: 'app-oimtgopt',
   templateUrl: './oimtgopt.component.html'

})

export class OimtgoptComponent implements OnInit {
   actionName: string;
   radioModel: string;
   @ViewChild('dialog', {static: true}) dialog: DialogComponent;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   stghtyData: SecurityThreatGroupsHty[] = [];
   stghtyDataTemp: SecurityThreatGroupsHty[] = [];
   stghtyModel: SecurityThreatGroupsHty = new SecurityThreatGroupsHty();
   stghtyCommitModel: SecurityThreatGroupsHtyCommitBean = new SecurityThreatGroupsHtyCommitBean();
   stghtyIndex = 0;
   stghtyInsertList: SecurityThreatGroupsHty[] = [];
   stghtyUpdatetList: SecurityThreatGroupsHty[] = [];
   stghtyDeleteList: SecurityThreatGroupsHty[] = [];
   stghty1Data: any[] = [];

   stghty1DataTemp: SecurityThreatGroupsHty[] = [];
   stghty1Model: SecurityThreatGroupsHty = new SecurityThreatGroupsHty();
   stghty1Index: number = 0;
   stghty1InsertList: SecurityThreatGroupsHty[] = [];
   stghty1UpdatetList: SecurityThreatGroupsHty[] = [];
   stghty1DeleteList: SecurityThreatGroupsHty[] = [];
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable: boolean;
   corporateTypesColumnDef: any[];
   stgHtyColumnDef: any[] = [];
   options: any[] = [];
   titles: any;
   parentStgId: any;
   rgNewparent: any[] = [];
   rgNewParentLink: string;
   action: string;
   parentFlag: boolean;
   tableIndex = -1;
   parentTitles: { 'description': string; 'stgCode': string; };
   dateVal: boolean;
   isSaved: boolean;
   isAffilicationChanged: boolean = false;
   constructor(private oimtgoptFactory: OimtgoptService,
      public translateService: TranslateService,
      public sessionManager: UserSessionManager, private lovService: LovService) {
   }
   ngOnInit() {
      this.parentStgId = this.dialog.data.stgId;
      this.lovService.clear(this.LNATION);
      this.lovService.clear(this.LGANG);
      this.rgNewparent = [];
      this.parentTitles = { 'description': this.trMsg('common.description'), 'stgCode': this.trMsg('oimtgopt.stgcd') }
      const optns = [
         { id: 'Realign', text: this.trMsg('oimtgopt.realn') },
         { id: 'Demote', text: this.trMsg('oimtgopt.dmot') },
         { id: 'Promote', text: this.trMsg('oimtgopt.prmt') },
      ];
      this.radioModel = 'Realign';
      if (this.dialog.data.stgLevel === 'GANG') {
         optns[2]['disabled'] = true;
         this.stghtyModel.fromStgLevel = 'GANG';
         this.stghtyModel.toStgLevel = 'GANG';
         this.rgNewParentLink = this.LNATION;
      } else {
         optns[1]['disabled'] = true;
         this.stghtyModel.fromStgLevel = 'SET';
         this.stghtyModel.toStgLevel = 'SET';
         this.rgNewParentLink = this.LGANG;
      }
      this.options = optns;
      this.stgHtyColumnDef = [
         { fieldName: this.trMsg('oimtgopt.evntseq'), field: 'htySeq', editable: false, width: 150 },
         { fieldName: this.trMsg('oimtgopt.effdate'), field: 'effectiveDate', editable: false, width: 150, datatype: 'date' },
         { fieldName: this.trMsg('oimtgopt.actn'), field: 'action', editable: false, width: 150 },
         { fieldName: this.trMsg('common.from'), field: 'fromStgLevel', editable: false, width: 150 },
         { fieldName: this.trMsg('common.to'), field: 'toStgLevel', editable: false, width: 150 },
         { fieldName: this.trMsg('oimtgopt.nwpaflton'), field: 'description' },
         { fieldName: this.trMsg('oimtgopt.usr'), field: 'createUserId', editable: false, width: 150 },
      ];
      this.stghtyModel.effectiveDate = DateFormat.getDate();
      this.stghtyExecuteQuery();
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
   changeEvent(event) {
      if (event) {
         this.parentFlag = false;
         if (event.value === 'Realign') {
            this.stghtyModel.toStgLevel = this.stghtyModel.fromStgLevel;
            if (this.stghtyModel.fromStgLevel === 'GANG') {
               this.rgNewParentLink = this.LNATION;
            }
         } else if (event.value === 'Demote') {
            this.cgtewhenRadioChanged();
         } else {
            this.stghtyModel.toStgLevel = 'GANG';
            this.parentFlag = true;
         }
         this.action = null;
      }

   }

   stghtyExecuteQuery() {
      const stghtyResult = this.oimtgoptFactory.stgHtyExecuteQuery(this.dialog.data);
      stghtyResult.subscribe(data => {
         if (data.length === 0) {
            this.stghtyData = [];
         } else {
            data.forEach(element => {
               element.stgId = String(element.stgId);
               if (element.sealFlag === 'DES') {
                  this.show('oimtgopt.stgdsnt');
                  return;
               }
            });
            this.stghtyData = data;
            this.tableIndex = 0;
         }
      });
   }
     /**
      *  This function will be executed when commit event is
     * fired
     */
   oimtgoptSavestghtyForm(event) {
      this.stghtyInsertList = event.added;
      this.stghtyUpdatetList = event.updated;
      this.stghtyDeleteList = event.removed;
      this.stghtyCommitModel.insertList = [];
      this.stghtyCommitModel.updateList = [];
      this.stghtyCommitModel.deleteList = [];
      if (this.stghtyInsertList.length > 0) {
         for (let i = 0; i < this.stghtyInsertList.length; i++) {

         }
         for (let i = 0; i < this.stghtyUpdatetList.length; i++) {
         }
         this.stghtyCommitModel.insertList = this.stghtyInsertList;
         this.stghtyCommitModel.updateList = this.stghtyUpdatetList;
      }
      if (this.stghtyDeleteList.length > 0) {
         for (let i = 0; i < this.stghtyDeleteList.length; i++) {
         }
         this.stghtyCommitModel.deleteList = this.stghtyDeleteList;
      }
      const stghtySaveData = this.oimtgoptFactory.stgHtyCommit(this.stghtyCommitModel);
      stghtySaveData.subscribe(data => {
         if (data === 1) {
            this.isSaved = true;
            this.show('common.addupdateremoverecordsuccess', 'success');
         } else {
            this.show('common.addupdateremoverecordfailed', 'error');
         }

      });
   }
   onButSave() {
      if (!this.stghtyModel.effectiveDate) {
         this.show('Effective Date must be enter.');
         return;
      }
      if (DateFormat.compareDate(DateFormat.getDate(this.stghtyModel.effectiveDate), DateFormat.getDate()) > 0) {
         this.show('oimtgopt.effdatentgrt');
         return;
      }
      if (this.radioModel !== 'Promote' && !this.action) {
         this.show('oimtgopt.nwpafltonmustbeentered');
         return;
      }
      this.stghtyInsertList = [];
      this.stghtyUpdatetList = [];
      this.stghtyCommitModel.updateList = [];
      this.stghtyCommitModel.insertList = [];
      this.stghtyModel.toPStgId = Number(this.action);
      this.stghtyModel.createUserId = this.sessionManager.getId();
      this.stghtyModel.stgId = this.dialog.data.stgId;
      this.stghtyModel.action = this.radioModel;
      this.stghtyInsertList.push(this.stghtyModel);
      this.stghtyCommitModel.insertList = this.stghtyInsertList;
      const stghtySaveData = this.oimtgoptFactory.stgHtyCommit(this.stghtyCommitModel);
      stghtySaveData.subscribe(stghtySaveResult => {
         if (stghtySaveResult === 1) {
            this.isSaved = true;
            this.show('common.addupdateremoverecordsuccess', 'success');
            this.isAffilicationChanged = false;
            this.stghtyExecuteQuery();
            return;
         } else {
            this.show('common.addupdateremoverecordfailed');
            return;
         }
      });
   }
   stghty1ExecuteQuery() {
      const stghty1Result = this.oimtgoptFactory.
         stgHty1ExecuteQuery(this.stghty1Model);
      stghty1Result.subscribe(data => {
         if (data.length === 0) {
            this.stghty1Data = [];
         } else {
            this.stghty1Data = data;
            this.stghty1Model = data[0];
         }
      });
   }
   dateValidation(event) {
      if (event) {
         if (DateFormat.compareDate(DateFormat.getDate(event), DateFormat.getDate()) === 1) {
            this.show('oimtgopt.effdatentgrt');
            this.dateVal = true;
            return;
         } else {
            this.dateVal = false;
         }
      }
   }
   cgtewhenRadioChanged() {
      this.oimtgoptFactory.cgtewhenRadioChanged(this.dialog.data.stgId)
      .subscribe(lvCount => {
         if (lvCount > 0) {
            this.show('oimtgopt.cntdmtactve');
            this.radioModel = 'Realign';
            this.rgNewParentLink = this.LNATION;
         } else {
            this.stghtyModel.toStgLevel = 'SET';
            this.rgNewParentLink = this.LGANG;
         }
      });
   }

   get LGANG(): string {
      return `oimtgopt/lGangRecordGroup?parentStgId=${this.parentStgId}`;
   }

   get LNATION(): string {
      return `oimtgopt/lNationRecordGroup?parentStgId=${this.parentStgId}`;
   }

   affiliationChange(event){
      this.isAffilicationChanged = true;
   }

   get saveBtn () {
      if (this.isSaved) {
         return true;
      }
      if(this.isAffilicationChanged){
         return false;
      }
      return (this.action || this.radioModel === 'Promote')  ? false : true;
   }
}

