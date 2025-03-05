import {
      Component,
      OnInit,
      ViewChild,
      Input,
      Output,
      EventEmitter
} from '@angular/core';

import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { TranslateService } from '@common/translate/translate.service';
import { OtinamesService } from '@inmate/service/otinames.service';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Router } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
@Component({
      selector: 'app-otinames',
      templateUrl: './otinames.component.html'
})

export class OtinamesComponent implements OnInit {
      @ViewChild('otinamesForm', {static: true}) form: any;
      @ViewChild('grid', {static: true}) grid: any;
      @Input() namesearch: any;
      @Input() isDialog = false;
      @Output() afterDialogClosed: EventEmitter<any> = new EventEmitter<any>();
      actionName: string;
      lovModel: any[];
      msgs: any[] = [];
      nameOfLovPage: string;
      listToCompare: any[] = [];
      vthaData: VTrustHeader[] = [];
      vthaDataTemp: VTrustHeader[] = [];
      vthaModel: VTrustHeader = new VTrustHeader();
      vthaModelTemp: VTrustHeader = new VTrustHeader();
      vthaIndex: number;
      vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
      vthaInsertList: VTrustHeader[] = [];
      vthaUpdatetList: VTrustHeader[] = [];
      vthaDeleteList: VTrustHeader[] = [];
      syspflData: SystemProfiles[] = [];
      syspflDataTemp: SystemProfiles[] = [];
      syspflModel: SystemProfiles = new SystemProfiles();
      syspflIndex: number;
      syspflInsertList: SystemProfiles[] = [];
      syspflUpdatetList: SystemProfiles[] = [];
      syspflDeleteList: SystemProfiles[] = [];
      minDate: Date;
      display: boolean;
      errorMessage: string;
      headerMessage: string;
      disabled: boolean;
      editable: boolean;
      vThaColumnDef: any[];
      vThaReadOnly: boolean;
      sysPflReadOnly: boolean;
      clearDisable: boolean;
      selectDisable: boolean;
      cancelDisable: boolean;
      retriveDisable: boolean;
      namesReadOnly: boolean;
      ckeckboxReadOnly: boolean;
      type = 'error';
      msglist = [];
      message = ' Invalid.';
      tableIndex = -1;
      routUrl: string;
      onaddfalg = true;
      fieldRowData: any;
      paneTitle1: any;
      constructor(private otinamesFactory: OtinamesService,
            private osiosearFactory: OsiosearService,
            public translateService: TranslateService,
            private offenderSearchService: OffenderSearchService,
            public dialogService: DialogService,
            private router: Router,
            private sessionManager: UserSessionManager) {
            this.vThaColumnDef = [];
      }
      onGridReady(event) {
      }
      ngOnInit() {
            this.paneTitle1 = this.translateService.translate('otinames.namesearch');
            if (this.otinamesFactory.dialogFlag === true) {
                  this.paneTitle1 = '';
                  this.otinamesFactory.dialogFlag = false;
            }
            this.selectDisable = true;
            this.cancelDisable = false;
            this.retriveDisable = false;
            this.namesReadOnly = false;
            this.ckeckboxReadOnly = false;
            this.vThaColumnDef = [
                  {
                        fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
                        editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
                        editable: false, width: 150
                  },
                  { fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay', editable: false, width: 150 },
                  {
                        fieldName: this.translateService.translate('system-profile.book-id'), field: 'bookingNo',
                        editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'agyLocId',
                        editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('otinames.actbalance'), field: 'currentBalance',
                        editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('common.closed'), field: 'accountClosedFlag', datatype: 'checkbox',
                        editable: false, width: 150
                  },
                  { fieldName: this.translateService.translate('common.s'), field: 'activeFlag', editable: false, width: 150 },
            ];
            if (this.namesearch) {
                  this.vthaModel = this.namesearch;
                  if (this.vthaModel.offenderId || this.vthaModel.offenderBookId) {
                        this.vthaExecuteQuery();
                  }
            }
            // this.clearDisable = false;
            // this.form.valueChanges.subscribe(data => {
            //       const keys = Object.keys(data);
            //       const count = { i: 0 };
            //       if (this.vthaData.length === 0) {
            //             do {
            //                   if (!data[keys[count.i]]) {
            //                         this.clearDisable = true;
            //                   } else {
            //                         this.clearDisable = false;
            //                   }
            //                   count.i++;
            //             } while (this.clearDisable && count.i < keys.length);
            //       }
            // });
            this.vthaExecuteQuery();
      }
      onRowClickvtha(event) {
            if (event) {
                  this.vthaModelTemp = event;
                  this.otinamesFactory.offenderRowData.push(this.vthaModelTemp);
            }
      }
      allowNumbers(event) {
      }
      no() {
      }
      canNameSearchEdit = (data: any, index: number, field: string): boolean => {
            return this.onaddfalg;
      }
      clearQuery() {
            this.vthaData = [];
            this.vthaModelTemp = new VTrustHeader();
            this.vthaModel = new VTrustHeader();
            this.onaddfalg = true;
            this.clearDisable = true;
            this.selectDisable = true;
            this.retriveDisable = false;
            this.cancelDisable = false;
            this.namesReadOnly = false;
            this.ckeckboxReadOnly = false;
      }
      cancel() {
            if (this.isDialog) {
                  this.afterDialogClosed.emit(null);
                  return null;
            }
            if (this.routUrl) {
                  this.router.navigate([this.routUrl]);
                  return;
            }

            if (!this.otinamesFactory.oiiflag) {
                  this.otinamesFactory.oiinamesflag = false;
                  this.router.navigate(['/home']);
            }
      }
      onOffenderChange() {
            if (this.osiosearFactory.selectOffender) {
                  this.osiosearFactory.selectOffender.offenderId = null;
            }

            if (this.offenderSearchService.selectedOffender) {
                  this.offenderSearchService.selectedOffender = null;
            }
            this.otinamesFactory.oiinamesflag = true;
            this.vHeaderBlockModel.middleName = this.vthaModelTemp.middleName;
            this.vHeaderBlockModel.lastName = this.vthaModelTemp.lastName;
            this.vHeaderBlockModel.firstName = this.vthaModelTemp.firstName;
            this.vHeaderBlockModel.offenderIdDisplay = this.vthaModelTemp.offenderIdDisplay;
            this.vHeaderBlockModel.bookingNo = this.vthaModelTemp.bookingNo;
            this.vHeaderBlockModel.movementReason = this.vthaModelTemp.agyLocId;
            this.vHeaderBlockModel.prisonLocation = this.vthaModelTemp.livingUnitDescription;
            this.vHeaderBlockModel.birthDate = this.vthaModelTemp.birthDate;
            this.vHeaderBlockModel.status1 = this.vthaModelTemp.inOutStatus;
            this.vHeaderBlockModel.age = this.vthaModelTemp.age;
            this.vHeaderBlockModel.gender = this.vthaModelTemp.gender;
            this.vHeaderBlockModel.offAlerts = this.vthaModelTemp.offAlerts;
            this.vHeaderBlockModel.offSupLevel = this.vthaModelTemp.offSupLevel;
            this.vHeaderBlockModel.offenderBookId = this.vthaModelTemp.offenderBookId;
            this.vHeaderBlockModel.offenderId = this.vthaModelTemp.offenderId;
            this.vHeaderBlockModel.rootOffenderId = this.vthaModelTemp.rootOffenderId;
            this.vHeaderBlockModel.trustAccount = true;
            this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
            if (this.vthaModelTemp) {
                  if (this.vthaModelTemp.activeFlag.localeCompare('A') === 0) {
                        this.vHeaderBlockModel.statusDisplay = 'Active';
                  } else {
                        this.vHeaderBlockModel.statusDisplay = 'Inactive';
                  }
            }
            this.otinamesFactory.offsearch = {
                  'offenderIdDisplay': this.vthaModelTemp.offenderIdDisplay, 'lname': this.vthaModelTemp.lastName,
                  'fname': this.vthaModelTemp.firstName,
                  'offenderBookId': this.vthaModelTemp.offenderBookId, 'nbtInst': this.vthaModelTemp.agyLocId,
                  'offenderId': this.vthaModelTemp.offenderId
            };

            if (this.isDialog) {
                  const dialogData = JSON.parse(JSON.stringify(this.vthaModelTemp));
                  dialogData['preWithholdAmount'] = dialogData.currentBalance;
                  this.afterDialogClosed.emit(dialogData);
                  return;
            }

            if (this.routUrl) {
                  this.router.navigate([this.routUrl]);
                  return;
            }
            if (!this.otinamesFactory.oiiflag) {
                  this.otinamesFactory.oiinamesflag = false;
                  this.router.navigate(['/home']);
                  return;
            }
      }
      vthaExecuteQuery() {
            if (this.vthaModel.activeFlag || this.vthaModel.communityActiveFlag) {
                  this.vthaModel.activeFlag = undefined;
                  this.vthaModel.communityActiveFlag = undefined;
            }
            if (this.vthaModel.offenderIdDisplay) {
                  for (let i = Number(String(this.vthaModel.offenderIdDisplay).length); i < 10; i++) {
                        this.vthaModel.offenderIdDisplay = '0' + this.vthaModel.offenderIdDisplay;
                  }
            }
            this.vthaModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.vthaModel.moduleName = 'OTINAMES';
            // this.router.navigate([this.routUrl]);
            const vthaResult = this.otinamesFactory.vThaExecuteQuery(this.vthaModel);
            vthaResult.subscribe(vthaResultList => {
                  if (vthaResultList.length === 0) {
                        this.vthaData = [];
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.querycaused');
                        this.show();
                        return;
                  } else {
                        // const lengthData = [];
                        // for (let i = 0; i < vthaResultList.length; i++) {
                        //       if (vthaResultList[i].dialogData === 1) {
                        //             lengthData.push({});
                        //       }
                        // }
                        vthaResultList.forEach(element => {
                              element.activeFlag = element.activeFlag === 'Y' ? 'A' : 'I';
                              element.communityActiveFlag = element.communityActiveFlag === 'Y' ? 'A' : 'I';
                              if (element.accountClosedFlag === 'N') {
                                    element.accountClosedFlag = false;
                              } else {
                                    element.accountClosedFlag = true;
                              }
                              if (element.currentBalance !== null) {
                                    element.currentBalance = Number(element.currentBalance).toFixed(2);
                              }
                        });
                        this.vthaData = vthaResultList;
                        // this.openDialog(vthaResultList, vthaResultList, 0);
                        this.clearDisable = false;
                        this.onaddfalg = false;
                        this.namesReadOnly = true;
                        this.ckeckboxReadOnly = true;
                        this.selectDisable = false;
                        this.retriveDisable = true;
                        this.cancelDisable = true;
                        this.tableIndex = 0;
                  }
            });
      }
      openDialog(data, gridRowData, indx) {
            if (data.length > 0) {
                  const rowData = this.vthaData;
                  const fielddata = data[0];
                  fielddata.activeFlag = fielddata.activeFlag === 'Y' ? 'A' : 'I';
                  fielddata.communityActiveFlag = fielddata.communityActiveFlag === 'Y' ? 'A' : 'I';
                  if (fielddata.accountClosedFlag === 'N') {
                        fielddata.accountClosedFlag = false;
                  } else {
                        fielddata.accountClosedFlag = true;
                  }
                  if (fielddata.currentBalance !== null) {
                        fielddata.currentBalance = Number(fielddata.currentBalance).toFixed(2);
                  }
                  // if (fielddata.dialogData === 1) {
                  //       // const dlgData = {
                  //       //       label: this.translateService.translate('Error: Invalid Caseload and Offender Id pair.'),
                  //       //       yesBtn: true, noBtn: false
                  //       // };
                  //       // this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 30).subscribe(result => {
                  //             this.vthaData = rowData;
                  //             this.vthaData.push(fielddata);
                  //             this.grid.gridOptions.api.redrawRows();
                  //             this.fieldRowData = fielddata;
                  //             this.grid.setRowData(indx, fielddata);
                  //             data.splice(0, 1);
                  //             this.openDialog(data, gridRowData, indx + 1);
                  //             this.onRowClickvtha(fielddata);
                  //       // });
                  // } else {
                  this.vthaData = rowData;
                  this.vthaData.push(fielddata);
                  // this.grid.gridOptions.api.redrawRows();
                  // this.fieldRowData = fielddata;
                  // this.grid.setRowData(indx, fielddata);
                  // data.splice(0, 1);
                  // this.openDialog(data, gridRowData, indx + 1);
                  // this.onRowClickvtha(fielddata);
                  // }
            }
      }
      insertData = () => {
            return this.fieldRowData ? this.fieldRowData : true;
      }
      show() {
            this.msglist = [];
            this.msglist.push({ message: this.message, type: this.type });
            this.msgs = [...this.msglist];
      }
      ok(event?) {
            this.vthaExecuteQuery();
      }
}
