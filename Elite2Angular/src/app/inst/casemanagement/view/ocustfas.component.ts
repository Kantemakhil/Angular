import {
      Component,
      OnInit,
      ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcustfasService } from '@inst/casemanagement/service/ocustfas.service';
import { CasePlans } from '@instCaseManagementbeans/CasePlans';
import { CasePlansCommitBean } from '@instCaseManagementbeans/CasePlansCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

@Component({
      selector: 'app-ocustfas',
      templateUrl: './ocustfas.component.html'
})

export class OcustfasComponent implements OnInit {
      agyLocId: any;
      agyLocIdTemp: any;
      @ViewChild('dialog', {static: true}) dialog: DialogComponent;
      actionName: string;
      lovModel: any[];
      msgs: any[] = [];
      nameOfLovPage: string;
      listToCompare: any[] = [];
      caseplansData: CasePlans[] = [];
      casePlansTemp: CasePlans[] = [];
      caseplansDataTemp: CasePlans[] = [];
      caseplansModel: CasePlans = new CasePlans();
      caseplansModelTemp: CasePlans = new CasePlans();
      caseplansCommitModel: CasePlansCommitBean = new CasePlansCommitBean();
      caseplansIndex: number;
      caseplansInsertList: CasePlans[] = [];
      caseplansUpdateList: CasePlans[] = [];
      caseplansDeleteList: CasePlans[] = [];
      minDate: Date;
      display: boolean;
      errorMessage: string;
      headerMessage: string;
      disabled: boolean;
      editable: boolean;
      casePlansReadOnly: boolean;
      rgstaffnameRg: any[] = [];
      message = ' Invalid.';
      type = 'error';
      msglist = [];
      caseLoadId: any;
      popDisabled: boolean;
      dataDisabled: boolean;
      flag: boolean;
      staffFlag: boolean;
      userIdTemp: string;
      constructor(private ocustfasFactory: OcustfasService,
            public translateService: TranslateService,
            private offenderSearchService: OffenderSearchService,
            private sessionManager: UserSessionManager) {
      }
      onGridReady(event) {
      }
      ngOnInit() {
            this.flag = false;
            this.staffFlag = false;
            if (this.dialog.data.startDate) {
                  this.caseplansModel.startDate = this.dialog.data.startDate;
            } else {
                  this.caseplansModel.startDate = DateFormat.getDate();
            }
            if (this.offenderSearchService.selectedOffender.agyLocId === 'OUT' ||
                  this.offenderSearchService.selectedOffender.agyLocId === 'TRN' ||
                  this.offenderSearchService.selectedOffender.agyLocId === 'CRT') {
                  this.type = 'warn';
                  this.message = this.translateService.translate('ocustfas.offenderisnotassvalidlocation');
                  this.show();
                  setTimeout(ele => {
                        this.dialog.close(null);
                      }, 30);
                 
            } else {
                  this.agyLocId = null;
                  this.agyLocIdTemp = this.offenderSearchService.selectedOffender.agyLocId;
                  const agyLocIdServiceObj = this.ocustfasFactory.agencyLocations(this.agyLocIdTemp);
                  agyLocIdServiceObj.subscribe(agyLocIdList => {
                        if (agyLocIdList) {
                              this.agyLocId = agyLocIdList;
                        } else {
                        }
                  });
            }
            this.caseLoadId = this.offenderSearchService.selectedOffender.agyLocId;
            this.staffAss();
      }
      allowNumbers(event) {
      }
      staffAss() {
            const staffmembersServiceObj = this.ocustfasFactory.rgStaffNameRecordGroup(this.caseLoadId);
            staffmembersServiceObj.subscribe(namesList => {
                  if (namesList.length === 0) {
                        this.popDisabled = true;
                        this.dataDisabled = true;
                        this.flag = true;
                        this.staffFlag = true;
                        this.agyLocId = null;
                  } else {
                        this.popDisabled = false;
                        this.dataDisabled = false;
                        this.flag = false;
                        this.staffFlag = false;
                  }
            });
      }
      staffAssignments() {
            if (this.flag === true) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('ocustfas.listofvalluescotainsnoentries');
                  this.show();
                  return;
            }
      }
      staffValidate() {
            if (this.staffFlag === true) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
                  this.show();
                  return;
            }
      }
      ok() {
      }
      no() {
      }
      cancel() {
            this.dialog.close(null);
      }
      onOffenderChange(offender) {
      }
      getDialogData(event) {
            if (event) {
                  this.caseplansModel.lastName = event.lastName;
                  this.caseplansModel.firstName = event.firstName;
                  this.userIdTemp = event.lastName+", "+ event.firstName;
                  this.caseplansModel.userId = event.userId;
                  this.caseplansModel.instPosition = event.instPosition;
                  this.caseplansModel.instRole = event.instRole;
                  this.caseplansModel.officer = event.officer;
            }
      }
      caseplansExecuteQuery() {
            const caseplansResult = this.ocustfasFactory.casePlansExecuteQuery(this.caseplansModel);
            caseplansResult.subscribe(data => {
                  if (data.length === 0) {
                        this.caseplansData = [];
                  } else {
                        this.caseplansData = data;
                        this.caseplansModelTemp = data[0];
                  }
            });
      }
      onButSave() {
      }
      /**
       *  This function will be executed when commit event is
      * fired
      */
      ocustfasSavecaseplansForm(date?) {
            this.caseplansInsertList = [];
            this.caseplansUpdateList = [];
            this.caseplansDeleteList = [];
            this.caseplansCommitModel.insertList = [];
            if (!this.caseplansModel.lastName) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('ocustfas.lastnamemustentered');
                  this.show();
                  return;
            }
            if(date){
                  if (date.lastValue === '0_/__/____')  {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.leapyearnotallowed');
                        this.show();
                        return;
                    }
                    if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.datemustbeentervalidformat');
                        this.show();
                        return;
                    }  
            }
            if (!this.caseplansModel.startDate) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('ocustfas.datemustentered');
                  this.show();
                  return;
            }
            this.caseplansModel.offenderBookId = this.dialog.data.offenderBookId;
            this.caseplansModel.casePlanStatus = 'ACTIVE';
            this.caseplansModel.instCalAgyLocId = this.caseplansModel.agyLocId;
            this.caseplansModel.createDateTime = DateFormat.getDate();
            this.caseplansModel.createUserId = this.sessionManager.getId();
            this.caseplansModel.creationDate = DateFormat.getDate();
            this.caseplansModel.creationUser = this.sessionManager.getId();
            this.caseplansModel.caseloadType = this.offenderSearchService.selectedOffender.agyLocType;
            this.caseplansModel.agyLocId = this.offenderSearchService.selectedOffender.agyLocId;
            this.caseplansModel.instCalAgyLocId = this.caseplansModel.agyLocId;
            this.caseplansModel.startDate = DateFormat.getDate(this.caseplansModel.startDate);
            this.caseplansModel.position = this.dialog.data.position;
            this.caseplansModel.role = this.dialog.data.role;
            this.caseplansModel.fromDate = DateFormat.getDate(this.dialog.data.fromDate);
            this.caseplansModel.sacStaffId = this.dialog.data.sacStaffId;
            this.caseplansModel.calAgyLocId = this.dialog.data.calAgyLocId;
            this.caseplansModel.supervisionLevel = this.dialog.data.supervisionLevel;
            this.caseplansInsertList.push(this.caseplansModel);
            this.caseplansUpdateList.push(this.caseplansModel);
            this.caseplansCommitModel.updateList = this.caseplansUpdateList;
            this.caseplansCommitModel.insertList = this.caseplansInsertList;
            const caseplansSaveData = this.ocustfasFactory.casePlansCommit(this.caseplansCommitModel);
            caseplansSaveData.subscribe(data => {
                  if (data === 1) {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                        this.caseplansExecuteQuery();
                        this.dialog.close(this.caseplansModel);
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
}
