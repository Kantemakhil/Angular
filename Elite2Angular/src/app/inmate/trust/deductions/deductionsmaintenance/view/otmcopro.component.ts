import {
      Component,
      OnInit,
      ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmcoproService } from '../service/otmcopro.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadDeductionProfiles } from '@inmate/trust/checks/beans/CaseloadDeductionProfiles';
import { CaseloadDeductionDetails } from '@inmate/trust/checks/beans/CaseloadDeductionDetails';
import { CaseloadDeductionProfilesCommitBean } from '@inmate/trust/checks/beans/CaseloadDeductionProfilesCommitBean';
import { CaseloadDeductionDetailsCommitBean } from '@inmate/trust/checks/beans/CaseloadDeductionDetailsCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';

@Component({
      selector: 'app-otmcopro',
      templateUrl: './otmcopro.component.html'
})

export class OtmcoproComponent implements OnInit {
      @ViewChild('grid', { static: true }) grid: any;
      @ViewChild('firstGrid', { static: true }) firstGrid: any;
      retButton: boolean;
      retButtonFlag: boolean;
      caseloadId: string;
      caseloadType: string;
      accountCode: string;
      actionName: string;
      lovModel: any[];
      msgs: any[] = [];
      nameOfLovPage: string;
      listToCompare: any[] = [];
      cslddpData: CaseloadDeductionProfiles[] = [];
      cslddpDataTemp: CaseloadDeductionProfiles[] = [];
      cslddpModel: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
      cslddpModelDup: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
      cslddpInsertList: CaseloadDeductionProfiles[] = [];
      cslddpUpdatetList: CaseloadDeductionProfiles[] = [];
      cslddpDeleteList: CaseloadDeductionProfiles[] = [];
      csldddData: CaseloadDeductionDetails[] = [];
      csldddDataTemp: CaseloadDeductionDetails[] = [];
      csldddModel: CaseloadDeductionDetails = new CaseloadDeductionDetails();
      csldddInsertList: CaseloadDeductionDetails[] = [];
      csldddUpdatetList: CaseloadDeductionDetails[] = [];
      csldddDeleteList: CaseloadDeductionDetails[] = [];
      cslddpCommitModel: CaseloadDeductionProfilesCommitBean = new CaseloadDeductionProfilesCommitBean();
      csldddCommitModel: CaseloadDeductionDetailsCommitBean = new CaseloadDeductionDetailsCommitBean();
      minDate: Date;
      display: boolean;
      errorMessage: string;
      headerMessage: string;
      disabled: boolean;
      csldDdColumnDef: any[];
      creditObligationProColumnDef: any[];
      cgfkCslddppayeecorporateiRg: any[] = [];
      cgfkCsldddreceipttxntypeRg: any[] = [];
      cgfkCslddpdeductiontypeRg: any[] = [];
      cgfkCslddpaccountcodeRg: any[] = [];
      cgfkCslddppayeepersonidRg: any[] = [];
      deductionIndex = -1;;
      creditOblLink: any;
      creditObTolLink: any;
      creditobligationTitle: any;
      creditobligationToTitle: any;
      buttonRetrieve: boolean;
      buttonClear: boolean;
      cslddpIndex = 0;
      mode: string;
      deleteFlag: boolean;
      flg: boolean;
      fieldFlag: boolean;
      percentageFlag: boolean;
      flgCO: boolean;
      addRecordFlag: number;
      creditObligIndex: number;
      enableCreditInsert: boolean;
      constructor(private otmcoproFactory: OtmcoproService, public translateService: TranslateService,
            public sessionManager: UserSessionManager,
            private dialogService: DialogService,
            private amountFormat: AmountFormatUtil) {
            this.csldDdColumnDef = [];
            this.creditObligationProColumnDef = [];
      }
      ngOnInit() {
            this.retButtonFlag = false;
            this.retButton = false;
            this.caseloadType = this.sessionManager.currentCaseLoadType;
            this.caseloadId = this.sessionManager.currentCaseLoad;
            this.buttonRetrieve = false;
            this.buttonClear = true;
            this.deleteFlag = false;
            this.creditOblLink = 'otmcopro/cgfkCsldDpDeductionTypeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType;
            this.creditObTolLink = 'otmcopro/cgfkCsldDpAccountCodeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType;
            const recieptLink = `otmcopro/cgfkCsldDdReceiptTxnTypeRecordGroup?caseloadType=${this.caseloadType}`;
            const reciptTitle = { code: this.trMsg('otmcopro.deductonreceipttypes'), description: this.trMsg('common.description') };
            this.creditobligationTitle = {
                  'code': this.trMsg('otmcopro.creditobligationtypeslash'),
                  'description': this.trMsg('otmcopro.deductiondesc')
            };
            this.creditobligationToTitle = {
                  'code': this.trMsg('otmcopro.creditdeductionstoslash'),
                  'description': this.trMsg('otmcopro.accountname')
            };
            this.creditObligationProColumnDef = [
                  {
                        fieldName: this.trMsg('otmcopro.creditobligationtype', '*'), field: 'deductionType', editable: true,
                        datatype: 'lov', link: this.creditOblLink, titles: this.creditobligationTitle, cellEditable: this.cellEditable, source: 'OCMDEDUT'
                  },
                  {
                        fieldName: this.trMsg('otmcopro.creditdeductionsto', '*'), field: 'accountCode', editable: true,
                        datatype: 'lov', link: this.creditObTolLink, titles: this.creditobligationToTitle, source: 'OCMCOACT'
                  },
                  {
                        fieldName: this.trMsg('otmcopro.limit'), field: 'coLimitAmount', editable: false
                  },
                  {
                        fieldName: this.trMsg('otmcopro.unlimitedcredit'), field: 'nbtAccountCode', editable: false,
                        datatype: 'text'
                  },
                  {
                        fieldName: this.trMsg('otmcopro.calculateon'), field: 'nbtModifyUserId', editable: false,
                        datatype: 'lov', domain: "BALANCE_TYPE",
                  },
                  {
                        fieldName: this.trMsg('otmcopro.active'), field: 'activeFlag', editable: true,
                        datatype: 'checkbox',
                  },
                  {
                        fieldName: this.trMsg('otmcopro.sequence'), field: 'listSeq', editable: true,
                        datatype: 'number', maxValue: 999
                  },
                  {
                        fieldName: this.trMsg('otmcopro.effective', '*'), field: 'effectiveDate', editable: true,
                        datatype: 'date'
                  },
                  {
                        fieldName: this.trMsg('otmcopro.expiry'), field: 'expiryDate', editable: false,
                        datatype: 'date'
                  },
                  {
                        fieldName: this.trMsg('otmcopro.delayrecapture'), field: 'delayRecapture', editable: true,
                        datatype: 'number', maxValue: 999, whole: true
                  },
                  {
                        fieldName: '', field: 'nbtText', editable: false,
                        datatype: 'text',
                  },
                  {
                        fieldName: this.trMsg('otmcopro.mintrustbalance'), field: 'minTrustBal', editable: true,
                        datatype: 'number', format: '1.2-2', minValue: 0.00, maxValue: 9999.99, strictFP: true, whole: true
                  },
                  {
                        fieldName: this.trMsg('otmcopro.creditwhenindigent'), field: 'coCreditWhenIndigentFlag', editable: true,
                        datatype: 'checkbox',
                  },
                  {
                        fieldName: this.trMsg('otmcopro.corporateid'), field: 'payeeCorporateId', editable: true,
                        datatype: 'number', maxValue: 99999999999,required: true
                  },
                  {
                        fieldName: '', field: 'idbutton', editable: true, data: 'row', updateField: 'row', modal: true,
                        datatype: 'launchbutton', onLaunchClick: this.onConflictLaunchEdit
                  },
                  {
                        fieldName: '', field: 'corporateName', editable: false, datatype: 'text',
                  },

            ];
            this.csldDdColumnDef = [
                  {
                        fieldName: this.trMsg('otmcopro.deductonreceipttype', '*'), field: 'receiptTxnType', editable: true,
                        datatype: 'lov', link: recieptLink, titles: reciptTitle, cellEditable: this.canGridEditable, source: 'OCMTRANS'
                  },
                  {
                        fieldName: this.trMsg('otmcopro.percentage'), field: 'percentage', editable: true, width: 150,
                        datatype: 'number', format: '1.2-2', maxValue: 9999.99,
                        strictFP: true, whole: true, cellEditable: this.canCellEdit
                  },
                  {
                        fieldName: this.trMsg('otmcopro.flatrate'), field: 'flatRate', editable: true, width: 150,
                        datatype: 'number', format: '1.2-2', maxValue: 999999990.00,
                        strictFP: true, whole: true, cellEditable: this.canCellEdit
                  },
                  {
                        fieldName: this.trMsg('otmcopro.mintrustbalance'), field: 'minimumTrustBalanceFlag', width: 150,
                        datatype: 'checkbox', editable: true
                  },
            ];
            this.otmcoproexecuteQuery();
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
      canCellEdit = () => {
            if (this.caseloadType === 'COMM') {
                  return false;
            }
            return true;
      }

      cancel() {
      }
      onRowClickcslddp(event) {
           
            if (event) {
                  this.csldddModel = event;
            } else {
                  this.csldddModel = new CaseloadDeductionDetails();
            }
      }
      validateRowData = (event) => {
            const rowdata = new ValidateRowReturn();
            rowdata.validated = true;
            const index = event.rowIndex;
            if (String(event.newValue) !== String(event.oldValue)) {
                  if (event.field === 'receiptTxnType') {
                        if (event.newValue && !this.isCsldddDuplicate(event.newValue)) {
                              this.grid.setColumnData('receiptTxnType', index, null);
                              const msgg = this.trMsg('otmcopro.receipttypenewvaluealreadyexistfor')
                                    .replace('%receiptTxnType%', event.newValue)
                                    .replace('%deductionType%', this.cslddpModel.deductionType)
                                    .replace('%caseloadId%', this.caseloadId);
                              this.show(msgg);

                        } else {
                              if (this.caseloadType === 'COMM') {
                                    this.grid.setColumnData('percentage', index, 100);
                              }
                        }
                  }
                  if (event.field === 'percentage') {
                        if (event.newValue) {
                              const percentage = Number(event.newValue);
                              if (percentage >= 1000) {
                                    this.grid.setColumnData('percentage', index, null);
                                    this.show('otmcopro.percentagemustbeofform');
                                    return rowdata;
                              }
                              if (!(percentage >= 0 && percentage <= 100)) {
                                    this.grid.setColumnData('percentage', index, null);
                                    this.show('otmcopro.percentagemustbeinrange');
                                    return rowdata;
                              }
                        }
                  }
                  if (event.field === 'minimumTrustBalanceFlag') {
                        if (event.data.minimumTrustBalanceFlag && !this.cslddpModel.minTrustBal) {
                              this.show(`common.youcannotcheckthisflagsince`);
                              this.grid.setColumnData('minimumTrustBalanceFlag', this.csldddData.indexOf(event.data), null);
                              return rowdata;
                        }
                  }

            }
            return rowdata;
      }

      isCsldddDuplicate(receiptTxnType): boolean {
            const isDupliate = { dup: true };
            const hits = this.csldddData.filter(ele => ele.receiptTxnType === receiptTxnType);
            if (hits && hits.length > 1) {
                  isDupliate.dup = false;
            }
            return isDupliate.dup;
      }
      /**
      * This function loads the data into the Master Record and its child records
      */
      otmcoproPopulateDetails() {
            const serviceObj = this.otmcoproFactory.csldDdExecuteQuery(this.cslddpModel);
            serviceObj.subscribe(data => {
                  if (data.errorMessage.length > 0) {
                  } else {
                        this.csldddData = data;
                  }
            });
      }


      /**
       *  This function will be executed when commit event is
      * fired
      */
      otmcoproSavecslddpForm(event) {
            this.cslddpInsertList = event.added;
            this.cslddpUpdatetList = event.updated;
            this.cslddpDeleteList = event.removed;
            this.cslddpCommitModel.insertList = [];
            this.cslddpCommitModel.updateList = [];
            this.cslddpCommitModel.deleteList = [];
            for (let i = 0; i < this.cslddpData.length; i++) {
                  for (let j = 0; j < this.cslddpData.length; j++) {
                        if (i !== j && (this.cslddpData[i].deductionType === this.cslddpData[j].deductionType && this.cslddpData[i].accountCode === this.cslddpData[j].accountCode)) {
                              this.show('oimvlimt.rowalredyexist');
                              return;
                        }
                  }
            }
            if (this.cslddpInsertList.length > 0 || this.cslddpUpdatetList.length > 0) {
                  for (let i = 0; i < this.cslddpInsertList.length; i++) {
                        if (this.cslddpInsertList[i].effectiveDate && DateFormat.compareDate(DateFormat.getDate(this.cslddpInsertList[i].effectiveDate), DateFormat.getDate()) === -1) {
                              this.show(`otmcopro.theeffectivedatecannotbeearlierthantodaysdate`);
                              return;
                        }

                        if (this.cslddpInsertList[i].expiryDate && this.cslddpInsertList[i].effectiveDate && DateFormat.compareDate(DateFormat.getDate(this.cslddpInsertList[i].effectiveDate), DateFormat.getDate(this.cslddpInsertList[i].expiryDate)) === 1) {
                              this.show(`common.effectieexpirydatevalidation`);
                              return;
                        }
                        /*  if (this.cslddpInsertList[i].expiryDate) {
                               const effDate = DateFormat.getDate(this.cslddpInsertList[i].effectiveDate);
                               const expDate = DateFormat.getDate(this.cslddpInsertList[i].expiryDate);
                               if (DateFormat.compareDate(effDate, expDate) > 0) {
                                     this.show('common.effectieexpirydatevalidation');
                                     return false;
                               }
                         } */
                        if (this.cslddpInsertList[i].activeFlag) {
                              this.cslddpInsertList[i].activeFlag = 'Y';
                        } else {
                              this.cslddpInsertList[i].activeFlag = 'N';
                        }
                  }
                  this.cslddpInsertList.forEach(ele => {
                        ele.caseloadId = this.caseloadId;
                        ele.caseloadType = this.caseloadType;
                        ele.expiryDate = ele.activeFlag ? null : DateFormat.getDate();
                        //ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
                        ele.coCreditWhenIndigentFlag = ele.coCreditWhenIndigentFlag ? 'Y' : 'N';
                        ele.minimumTrustBalance = !this.isNull(ele.minTrustBal) ? Number(ele.minTrustBal) : null;
                  });
                  this.cslddpCommitModel.insertList = this.cslddpInsertList;
            }
            if (this.cslddpUpdatetList.length > 0) {
                  for (let i = 0; i < this.cslddpUpdatetList.length; i++) {
                        if (this.cslddpUpdatetList[i].effectiveDate && DateFormat.compareDate(DateFormat.getDate(this.cslddpUpdatetList[i].effectiveDate), DateFormat.getDate()) === -1) {
                              this.show(`otmcopro.theeffectivedatecannotbeearlierthantodaysdate`);
                              return;
                        }

                        if (this.cslddpUpdatetList[i].expiryDate && this.cslddpUpdatetList[i].effectiveDate && DateFormat.compareDate(DateFormat.getDate(this.cslddpUpdatetList[i].effectiveDate), DateFormat.getDate(this.cslddpUpdatetList[i].expiryDate)) === 1) {
                              this.show(`common.effectieexpirydatevalidation`);
                              return;
                        }
                        this.cslddpUpdatetList[i].expiryDate = !this.cslddpUpdatetList[i].activeFlag ? DateFormat.getDate() : null;
                        this.cslddpUpdatetList[i].activeFlag = this.cslddpUpdatetList[i].activeFlag ? 'Y' : 'N';
                        this.cslddpUpdatetList[i].coCreditWhenIndigentFlag = this.cslddpUpdatetList[i].coCreditWhenIndigentFlag ? 'Y' : 'N';
                        this.cslddpUpdatetList[i].minimumTrustBalance = !this.isNull(this.cslddpUpdatetList[i].minTrustBal) ? Number(this.cslddpUpdatetList[i].minTrustBal) : null;
                        if (DateFormat.compareDate(DateFormat.getDate(this.cslddpUpdatetList[i].effectiveDate), DateFormat.getDate()) === -1) {
                              this.show(`otmcopro.theeffectivedatecannotbeearlierthantodaysdate`);
                              return;
                        }
                  };
                  this.cslddpCommitModel.updateList = this.cslddpUpdatetList;
            }
            if (this.cslddpDeleteList.length > 0) {
                  if (this.csldddData.length > 0) {
                        this.show('otmcopro.cannotdeletecaseloaddeductiwhiledependentoffenderdeductionsexist');
                        return;
                  }
                  this.cslddpCommitModel.deleteList = this.cslddpDeleteList;
            }
            const cslddpSaveData = this.otmcoproFactory.csldDpCommit(this.cslddpCommitModel);
            cslddpSaveData.subscribe(data => {
                  if (String(data) === '1') {
                        this.show('common.addupdateremoverecordsuccess', 'success');
                        this.otmcoproexecuteQuery();
                  } else if (String(data).includes('DEDUCTION_PROFILES_PK')) {
                        this.show('otmcopro.rowexistsalreadywithsamecaseloadid');
                  } else if (String(data).includes('CASELOAD_DEDUCTION_PROFILES_U1')) {
                        this.show('otmcopro.rowexistsalreadywithsamecaseloadidexpinp');
                  } else if (String(data).includes('CSLD_DD_PK')) {
                        this.show('otmcopro.rowexistsalreadywithsamecaseloadiddeductiontype');
                  } else if (String(data).includes('DEDPROF_DEDTYPE_F2')) {
                        this.show('otmcopro.thiscreditobligationtypedoesnotexist');
                  } else if (String(data).includes('OFF_DED_DED_DTLS_F1')) {
                        this.show('otmcopro.cannotdeletecaseloaddeductiwhiledependentoffenderdeductionsexist');
                  } else if (String(data).includes('OFF_DED_CSLD_DD_F1')) {
                        this.show('otmcopro.cannotdeletecaseloaddeductiwhiledependentoffenderdeductionsexist');
                  } else if (String(data).includes('?')) {
                        this.show('common.addupdateremoverecordfailed', 'error');
                  } else {
                        this.show(data);
                        return;
                  }
            });

      }
      otmcoproexecuteQuery() {
            this.cslddpModelDup = new CaseloadDeductionProfiles();
            this.cslddpModelDup.caseloadId = this.caseloadId;
            this.cslddpModelDup.caseloadType = this.caseloadType;
            const serviceObj = this.otmcoproFactory.csldDpExecuteQuery(this.cslddpModelDup);
            serviceObj.subscribe(data => {
                  if (data.length > 0) {
                        this.cslddpData = data;
                        if (this.cslddpData.length >= 1) {
                              this.enableCreditInsert = true;
                        } else {
                              this.enableCreditInsert = false;
                        }
                        data.forEach(ele => {
                              ele.coCreditWhenIndigentFlag = ele.coCreditWhenIndigentFlag === 'Y' ? 'Y' : null;
                              ele.activeFlag = ele.activeFlag === 'Y' ? 'Y' : null;
                              ele.minTrustBal = !this.isNull(ele.minimumTrustBalance) ? Number(ele.minimumTrustBalance).toFixed(2) : null;
                              ele.idbutton = '...';
                              ele.accountCode = String(ele.accountCode);
                              if (ele.coLimitAmount) {
                                    ele.coLimitAmount = Number(ele.coLimitAmount).toFixed(2);
                              }
                              if (ele.delayRecapture) {
                                    ele.nbtText = 'Days from Date of First Txn';
                              }
                        });
                        this.creditObligIndex = 0;
                  } else if (data.length === 0) {
                        this.cslddpData = [];
                        this.enableCreditInsert = false;
                        this.show('common.querycaused');
                  }
            });


      }
      onRowClickfirstGrid(event) {
            this.cslddpModel = new CaseloadDeductionProfiles();
            this.csldddModel = new CaseloadDeductionDetails();
            if (event && event.caseloadId && event.deductionType) {
                  this.csldddModel = event;
                  this.cslddpModel = event;
                  this.enableCreditInsert = true;
                  this.csldddExecuteQuery();
            } else {
                  this.csldddData = [];
            }
            if(event.createDateTime){
                  this.enableCreditInsert=true;
                  
            }else{
                  this.enableCreditInsert=false;
                  this.csldddData=[];
            }
      }

      csldddExecuteQuery() {
            const csldddResult = this.otmcoproFactory.csldDdExecuteQuery(this.csldddModel);
            csldddResult.subscribe(data => {
                  if (data.length === 0) {
                        this.csldddData = [];
                  } else {
                        data.forEach(element => {
                              element.minimumTrustBalanceFlag = element.minimumTrustBalanceFlag === 'Y' ? true : null;
                        });
                        this.csldddData = data;
                        this.deductionIndex = 0;
                        this.enableCreditInsert = true;
                  }
            });
      }
      validateGrid(list: any[]): boolean {
            const is = { valid: true };
            if (list && Array.isArray(list)) {
                  list.forEach(ele => {
                        if (!ele.receiptTxnType) {
                              this.show('otmcopro.deductonreceipttypemustbeenter');
                              is.valid = false;
                              return;
                        }
                        if (this.isNull(ele.percentage) && this.isNull(ele.flatRate)) {
                              this.show('otmcopro.percentageorflagrateorbothmustbeentered');
                              is.valid = false;
                              return;
                        }
                        if (!this.isNull(ele.percentage) && !this.isNull(ele.flatRate)) {
                              this.show('common.eitherperorreatenotbotha');
                              is.valid = false;
                              return;
                        }
                  });
            }
            return is.valid;
      }
      csldddPreQuery(event) {
            if (!this.validateGrid(this.csldddData)) {
                  return false;
            }
            this.otmcoproFactory.preCommit(this.caseloadId, this.cslddpModel.deductionType)
                  .subscribe(data => {
                        if (data) {
                              if (this.cslddpModel.deductionType && this.cslddpModel.foAlAllOffenderFlag === 'Y' &&
                                    this.cslddpModel.nbtModifyUserId === 'OB'
                                    && data.per !== null && data.extPrioNo !== 0) {
                                    const dlgData = {
                                          label: this.trMsg('otmcopro.pleaseaccessthemaintaindeductionpriorityscreen'),
                                          yesBtn: true, noBtn: true
                                    };
                                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50).subscribe(result => {
                                          if (result) {
                                                this.otmcoproSavecsldddForm(event);
                                          } else {
                                                this.oncsldDdClear();
                                          }
                                    });
                              } else {
                                    this.otmcoproSavecsldddForm(event);
                              }
                        }
                  });
      }
      /**
       *  This function will be executed when commit event is
      * fired
      */
      otmcoproSavecsldddForm(event) {
            this.csldddInsertList = event.added;
            this.csldddUpdatetList = event.updated;
            this.csldddDeleteList = event.removed;
            this.csldddCommitModel.insertList = [];
            this.csldddCommitModel.updateList = [];
            this.csldddCommitModel.deleteList = [];
            if (this.csldddInsertList.length > 0) {
                  this.csldddInsertList.forEach(ele => {
                        ele.caseloadId = this.caseloadId;
                        ele.deductionType = this.cslddpModel.deductionType;
                        ele.minimumTrustBalanceFlag = ele.minimumTrustBalanceFlag ? 'Y' : 'N';
                        if (!ele.receiptTxnType) {
                              this.fieldFlag = true;
                              this.percentageFlag = false;
                        }
                        if ((!ele.percentage && ele.percentage !== 0) && (!ele.flatRate && ele.flatRate !== 0)) {
                              this.fieldFlag = false;
                              this.percentageFlag = true;
                        }
                        ele.modifyDate = DateFormat.getDate();
                        ele.modifyDatetime = DateFormat.getDate();
                        ele.createDatetime = DateFormat.getDate();
                        ele.createUserId = this.sessionManager.getId();
                        ele.modifyUserId = this.sessionManager.getId();
                  });
                  this.csldddCommitModel.insertList = this.csldddInsertList;
            }
            if (this.fieldFlag) {
                  this.fieldFlag = false;
                  return;
            }
            if (this.percentageFlag) {
                  this.percentageFlag = false;
                  this.show('otmcopro.percentageorflagrateorbothmustbeentered', 'warn');
                  return;
            }
            if (this.csldddUpdatetList.length > 0) {
                  this.csldddUpdatetList.forEach(ele => {
                        ele.caseloadId = this.caseloadId;
                        ele.deductionType = this.cslddpModel.deductionType;
                        ele.minimumTrustBalanceFlag = ele.minimumTrustBalanceFlag ? 'Y' : 'N';
                  });
                  this.csldddCommitModel.updateList = this.csldddUpdatetList;
            }
            if (this.csldddDeleteList.length > 0) {
                  this.csldddCommitModel.deleteList = this.csldddDeleteList;
            }
            const csldddSaveData = this.otmcoproFactory.csldDdCommit(this.csldddCommitModel);
            csldddSaveData.subscribe(data => {
                  if (String(data) === '1') {
                        this.show('common.addupdateremoverecordsuccess', 'success');
                  } else if (String(data).includes('?')) {
                        this.show('common.addupdateremoverecordfailed', 'error');
                  } else if (String(data).includes('DEDUCTION_PROFILES_PK')) {
                        this.show('tmcopro.rowexistsalreadywithsamecaseloadid');
                  } else if (String(data).includes('CASELOAD_DEDUCTION_PROFILES_U1')) {
                        this.show('otmcopro.rowexistsalreadywithsamecaseloadidexpinp');
                  } else if (String(data).includes('CSLD_DD_PK')) {
                        this.show('otmcopro.rowexistsalreadywithsamecaseloadiddeductiontype');
                  } else if (String(data).includes('DEDPROF_DEDTYPE_F2')) {
                        this.show('otmcopro.thiscreditobligationtypedoesnotexist');
                  } else if (String(data).includes('OFF_DED_DED_DTLS_F1')) {
                        this.show('otmcopro.cannotdeletecaseloaddeductiwhiledependentoffenderdeductionsexist');
                  } else {
                        this.show(data);
                        return;
                  }
                  this.csldddExecuteQuery();
            });

      }

      oncsldDdClear() {
            this.grid.clearRecords(this.grid.gridOptions);
      }

      onGridInsert = () => {
            if (this.cslddpModel && this.cslddpModel.createUserId) {
                  if (!this.validateGrid(this.csldddData)) {
                        return null;
                  }
                  return new CaseloadDeductionDetails();
            } else {
                  this.show('otmcopro.insertofcaseloaddedumustbeincontext');
                  return null;
            }
      }

      isNull(value) {
            return value === null || value === undefined;
      }

      canGridEditable = (data: any, index: number, field: string): boolean => {
            if (field === 'receiptTxnType') {
                  if (data.createUserId) {
                        return false;
                  }
            }
            return true;
      }

      minTrustBalChange(minTrustRef) {
            this.amountFormat.precisionFlot(minTrustRef);
      }
      minTrustKeyDown(event) {
            if (!this.amountFormat.avoidKeys(event, this.cslddpModel.minTrustBal)) {
                  event.stopPropagation();
                  return false;
            }
      }

      onConflictLaunchEdit = (event) => {
            if (event) {
                  this.dialogService.openLinkDialog('/OTUCPAYE', 80).subscribe(result => {
                        const index = this.cslddpData.indexOf(event);
                        this.firstGrid.setColumnData('payeeCorporateId', index, result.corporateId);
                        this.firstGrid.setColumnData('corporateName', index, result.corpName);
                  });
            }
      }

      validateRowDataFirstGrid = (event) => {
            const rowdata = new ValidateRowReturn();
            rowdata.validated = true;
            const index = event.rowIndex;
            if (event.field === 'activeFlag') {
                  if (event.data.activeFlag) {
                        this.firstGrid.setColumnData('expiryDate', index, undefined);
                        rowdata.validated = true;
                        return rowdata;
                  } else if (!event.data.activeFlag) {
                        this.firstGrid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                        rowdata.validated = true;
                        return rowdata;
                  }
            }

            if (event.field === 'deductionType') {
                  this.otmcoproFactory.chkDuplicate(this.caseloadId, event.data.deductionType).subscribe(dup => {
                        if (dup === 'X') {
                              this.show('otmcopro.creditobligationtypealreadyexists');
                              this.firstGrid.setColumnData('deductionType', index, undefined);
                        } else {
                              // this.cslddpModel.listSeq = 99;
                              this.cslddpModel.effectiveDate = DateFormat.getDate();
                              this.otmcoproFactory.getCalculateOnVal(event.data.deductionType).subscribe(calc => {
                                    if (calc && typeof calc === 'string') {
                                          this.firstGrid.setColumnData('nbtModifyUserId', index, calc);
                                    }
                              });
                        }
                  });
            }


            if (event.field === 'effectiveDate') {
                  if (DateFormat.compareDate(DateFormat.getDate(event.data.effectiveDate), DateFormat.getDate()) === -1) {
                        this.show(`otmcopro.theeffectivedatecannotbeearlierthantodaysdate`);
                        //  this.firstGrid.setColumnData('effectiveDate', index, undefined);
                  }
                  rowdata.validated = true;
                  return rowdata;
            }
            if (event.field === 'payeeCorporateId') {
                  if (event.newValue) {
                        this.otmcoproFactory.cgfkchkCsldDbenCsldDbenC(event.newValue).subscribe(data => {
                              if (data && !data.errorMessage) {
                                    this.firstGrid.setColumnData('payeeCorporateId', index, data.corporateId);
                                    this.firstGrid.setColumnData('corporateName', index, data.corporateName);
                              } else {
                                    this.show('otmcopro.invalidvalueforfieldcorporateid');
                                    this.firstGrid.setColumnData('payeeCorporateId', index, undefined);
                                    this.firstGrid.setColumnData('corporateName', index, undefined);
                              }
                        });
                  }
            }
            if (event.field === 'delayRecapture') {
                  if (event && event.data.delayRecapture) {
                        this.firstGrid.setColumnData('nbtText', index, 'Days from Date of First Txn');
                  } else {
                        this.firstGrid.setColumnData('nbtText', index, '');
                  }
                  rowdata.validated = true;
                  return rowdata;
            }
            return rowdata;
      }

      onGridReady = () => {
            
            return {
                  idbutton: '...', listSeq: 99, activeFlag: true
            };
      }
      onGridClear = () => {
            this.otmcoproexecuteQuery();
            return true;
      }

      cellEditable = (data: any, index: number, field: string): boolean => {
            if (field === 'deductionType') {
                  if (data && data.createUserId) {
                        return false;
                  }
            }
            return true;
      }

}
