import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdttaccService } from '../service/otdttacc.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadTransactionTypes } from '@inmate/beans/CaseloadTransactionTypes';
import { AccountPeriods } from '@inmate/beans/AccountPeriods';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OtinamesService } from '@inmate/service/otinames.service';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OffenderTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTransactionsCommitBean';

@Component({
  selector: 'app-otdttacc',
  templateUrl: './otdttacc.component.html'
})

export class OtdttaccComponent implements OnInit {
  @ViewChild('grid', {static: true}) grid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  csldttData: CaseloadTransactionTypes[] = [];
  csldttDataTemp: CaseloadTransactionTypes[] = [];
  csldttModel: CaseloadTransactionTypes = new CaseloadTransactionTypes();
  csldttIndex = -1;
  csldttInsertList: CaseloadTransactionTypes[] = [];
  csldttUpdatetList: CaseloadTransactionTypes[] = [];
  csldttDeleteList: CaseloadTransactionTypes[] = [];
  acprdData: AccountPeriods[] = [];
  acprdDataTemp: AccountPeriods[] = [];
  acprdModel: AccountPeriods = new AccountPeriods();
  acprdIndex = -1;
  acprdInsertList: AccountPeriods[] = [];
  acprdUpdatetList: AccountPeriods[] = [];
  acprdDeleteList: AccountPeriods[] = [];
  offtxnData: OffenderTransactions[] = [];
  offtxnDataTemp: OffenderTransactions[] = [];
  offtxnModel: OffenderTransactions = new OffenderTransactions();
  offtxnModelTemp: OffenderTransactions = new OffenderTransactions();
  offtxnCommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
  offtxnIndex = -1;
  offtxnInsertList: OffenderTransactions[] = [];
  offtxnUpdatetList: OffenderTransactions[] = [];
  offtxnDeleteList: OffenderTransactions[] = [];
  syspflData: SystemProfiles[] = [];
  syspflDataTemp: SystemProfiles[] = [];
  syspflModel: SystemProfiles = new SystemProfiles();
  syspflIndex = -1;
  syspflInsertList: SystemProfiles[] = [];
  syspflUpdatetList: SystemProfiles[] = [];
  syspflDeleteList: SystemProfiles[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  cmAcCodeColumnDef: any[];
  reconTxnColumnDef: any[];
  benTxnColumnDef: any[];
  offDedColumnDef: any[];
  reconsBlockColumnDef: any[];
  csldAlColumnDef: any[];
  bcrTmpColumnDef: any[];
  offOblHtyColumnDef: any[];
  securityThreatGroupsColumnDef: any[];
  bankRcColumnDef: any[];
  offTracColumnDef: any[];
  livUnitColumnDef: any[];
  offTxnColumnDef: any[];
  glTxn1ColumnDef: any[];
  offDrColumnDef: any[];
  perColumnDef: any[];
  offBncColumnDef: any[];
  vCorpColumnDef: any[];
  vBcBenColumnDef: any[];
  vOffBkgColumnDef: any[];
  cgfkCsldtttxntypeRg: any[] = [];
  cgfkOfftxnoffenderidRg: any[] = [];
  cgfkCsldttcaseloadidRg: any[] = [];
  offenderIdDisplay: any;
  vthaData: VTrustHeader[] = [];
  toCaseload: any;
  corporateId: any;
  corporateName: any;
  txnType: any;
  caseloadId: string;
  offenderId: any;
  offenderBookId: any;
  retrieveButton: boolean;
  clearButton: boolean;
  rootOffenderId: any;
  startDate: Date;
  endDate: Date;
  clFlag: string;
  txnEntryAmount: string;
  selected = -1;
  nbtProfileValue3: string;
  prevAmnt: any;
  insertFlag: boolean;
  cgnbtProfileValue: string;
  cgnbtProfileValue2: string;
  updateFlag: boolean;
  blockReadonly: boolean;
  constructor(private otdttaccFactory: OtdttaccService,
    public translateService: TranslateService, public dialogService: DialogService,
    public sessionManager: UserSessionManager, private otinamesFactory: OtinamesService) {
    this.cmAcCodeColumnDef = [];
    this.reconTxnColumnDef = [];
    this.benTxnColumnDef = [];
    this.offDedColumnDef = [];
    this.reconsBlockColumnDef = [];
    this.csldAlColumnDef = [];
    this.bcrTmpColumnDef = [];
    this.offOblHtyColumnDef = [];
    this.securityThreatGroupsColumnDef = [];
    this.bankRcColumnDef = [];
    this.offTracColumnDef = [];
    this.livUnitColumnDef = [];
    this.offTxnColumnDef = [];
    this.glTxn1ColumnDef = [];
    this.offDrColumnDef = [];
    this.perColumnDef = [];
    this.offBncColumnDef = [];
    this.vCorpColumnDef = [];
    this.vBcBenColumnDef = [];
    this.vOffBkgColumnDef = [];
  }
  ngOnInit() {
    this.blockReadonly = false;
    this.insertFlag = true;
    this.nbtProfileValue3 = '0.00';
    this.retrieveButton = false;
    this.clearButton = false;
    this.acprdModel.startDate = DateFormat.getDate();
    this.acprdModel.endDate = DateFormat.getDate();
    this.offTxnColumnDef = [
      {
        fieldName: this.translateService.translate('common.Orca2') + '*', field: 'offenderIdDisplay',
        editable: true, width: 150
      },
      {
        fieldName: '', field: 'button', datatype: 'launchbutton',
        editable: true, width: 100, data: 'row',
        onLaunchClick: this.goBtnLaunchClick
      },
      {
        fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
        editable: false, width: 150
      },
      { fieldName: this.translateService.translate('otdttacc.caseload'), field: 'caseloadId', editable: false, width: 150,
       datatype: 'text', maxlength: 6 },
      { fieldName: this.translateService.translate('otdttacc.s'), field: 'holdClearFlag', editable: false, width: 150,
       datatype: 'checkbox' },
      {
        fieldName: this.translateService.translate('otdttacc.totbal'), field: 'txnEntryAmount', editable: false, width: 150,
        datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
        strictFP: true, whole: true
      },
      {
        fieldName: this.translateService.translate('otdttacc.holdbal'), field: 'txnHoldEntryAmount', editable: false, width: 150,
        datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
        strictFP: true, whole: true
      },
      {
        fieldName: '', field: 'butHoldClearFlag', datatype: 'launchbutton',
        editable: true, width: 100, data: 'row',
        onLaunchClick: this.subBtnLaunchClick
      },
    ];
  }

  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  valueChangeEvent() {
    if (this.acprdModel.startDate && this.acprdModel.endDate &&  this.csldttModel.caseloadId && this.csldttModel.txnType &&
      this.txnType && this.csldttModel.txnEntryDesc && this.toCaseload) {
      if (this.offtxnData.length > 0) {
      this.grid.btnSavebtnDisable =  false;
      }
    }
    if (DateFormat.compareDate(DateFormat.getDate(this.acprdModel.startDate), DateFormat.getDate()) === 1) {
      this.show(this.translateService.translate('otdttacc.startdatenotgreater'), 'warn');
      return;

    }
    if (DateFormat.compareDate(DateFormat.getDate(this.acprdModel.startDate), DateFormat.getDate(this.acprdModel.endDate)) === 1) {
      this.show(this.translateService.translate('otdttacc.startdatenotgreaterendate'), 'warn');
      return;

    }
    if (DateFormat.compareDate(DateFormat.getDate(this.acprdModel.endDate), DateFormat.getDate()) === 1) {
      this.show(this.translateService.translate('otdttacc.enddatenotgreater'), 'warn');
      return;

    }

  }

  onButRetrieveclick(date?, dateone?) {
    if (!this.csldttModel.caseloadId) {
      this.show(this.translateService.translate('To Caseload must be entered.'), 'warn');
      return;
    }
    if (!this.csldttModel.txnType) {
      this.show(this.translateService.translate('Transaction Type must be entered.'), 'warn');
      return;
    }
    if (!this.csldttModel.txnEntryDesc) {
      this.show(this.translateService.translate('Description must be entered.'), 'warn');
      return;
    }
    if (!this.acprdModel.startDate) {
      this.show(this.translateService.translate('From Date must be entered.'), 'warn');
      return;
    }
    if (date) {
      if (date.lastValue === '0_/__/____') {
        this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
        this.clearButton = false;
        return;
      }
      if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
        this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
        this.clearButton = false;
        return;
      }
    }
    if (!this.acprdModel.endDate) {
      this.show(this.translateService.translate('To Date must be entered.'), 'warn');
      return;
    }
    if (dateone) {
      if (dateone.lastValue === '0_/__/____') {
        this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
        this.clearButton = false;
        return;
      }
      if (String(dateone.lastValue).indexOf('_') >= 0 && dateone.value === null) {
        this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
        this.clearButton = false;
        return;
      }
    }
    this.startDate = DateFormat.getDate(this.acprdModel.startDate.setHours(0, 0, 0, 0));
    this.endDate = DateFormat.getDate(this.acprdModel.endDate.setHours(0, 0, 0, 0));
    this.offtxnModel.caseloadId = this.sessionManager.currentCaseLoad;
    this.offtxnModel.txnType = this.txnType;


    const retrievedata = this.otdttaccFactory.whenNewBlockInstanceRetrive(this.startDate.getTime(), this.endDate.getTime(),
      this.sessionManager.currentCaseLoad, this.toCaseload, this.txnType, this.sessionManager.currentCaseLoadType);
    retrievedata.subscribe(data => {
      if (data.length === 0) {
        this.show(this.translateService.translate('common.querycaused'));
        this.clearButton = false;
        this.retrieveButton = true;
        this.blockReadonly = false;
      }
      if (data.length > 0) {
        this.offtxnData = data;
        for (let i = 0; i < this.offtxnData.length; i++) {
          this.offtxnData[i].button = '..';
          this.offtxnData[i].butHoldClearFlag = 'Sub';

        }
        this.selected = 0;
        //this.retrieveButton = true;
        this.clearButton = false;
        this.blockReadonly = true;
      }

    });
  }
  onClearClick() {
    this.csldttModel = new CaseloadTransactionTypes();
    this.clearButton = true;
    this.retrieveButton = false;
    this.blockReadonly = false;
    this.offtxnData = [];
    this.offtxnModel.txnId = undefined;
    this.acprdModel.endDate = undefined;
    this.acprdModel.startDate = undefined;
    this.cgnbtProfileValue = undefined;
    this.cgnbtProfileValue2 = undefined;
    this.nbtProfileValue3 = undefined;
  }
  onRowClickofftxn(event) {
  }
  toCaseloadChange(event) {
    if (event) {
      this.toCaseload = event.code;
      const corporateIdNames = this.otdttaccFactory.getCorporateidNames(this.toCaseload);
      corporateIdNames.subscribe(corporates => {
        if (corporates.length > 0) {
          this.corporateId = corporates[0].corporateId;
          this.corporateName = corporates[0].corporateName;

        }

      });

    }

  }
  onOffTxnInsert = () => {
    if (this.offtxnData.length > 0) {
      if (!this.offtxnData[this.offtxnData.length - 1].offenderIdDisplay) {
            this.show(this.translateService.translate('otdttacc.idmustbe'), 'warn');
            return false;
      }
}
    return {
      offenderIdDisplay: '', button: '..', caseloadId: '', holdClearFlag: '', txnEntryAmount: '',
      txnHoldEntryAmount: '', butHoldClearFlag: 'Sub'
    };
  }
  txnTypeChange(event) {
    if (event) {
      this.csldttModel.txnEntryDesc = event.description;
      this.txnType = event.code;
      if (this.txnType === 'TOS') {
        const checkTxnType = this.otdttaccFactory.checkTxnType(this.toCaseload, this.txnType, this.sessionManager.currentCaseLoad);
        checkTxnType.subscribe(data => {
          if (!data || data === '') {
            this.show(this.translateService.translate('otdttacc.offendersub'), 'warn');
          }

        });


      }
    }

  }
  subBtnLaunchClick = (event) => {

    if (event.offenderIdDisplay) {
      this.offtxnModel.offenderId = event.offenderId;
      this.offtxnModel.caseloadId = this.sessionManager.currentCaseLoad;
      this.dialogService.openLinkDialog('/OTUSUBAD', event, 70).subscribe(result => {

      });

    } else {
      return;
    }

  }
  onGridClear = () => {
    if (this.offenderId) {
    const deleteoffscshads = this.otdttaccFactory.deleteOffacShads(this.sessionManager.currentCaseLoad, this.offenderId);
    deleteoffscshads.subscribe(data => {
      if (data === 2) {
        return;

      }

    });
  }
    this.nbtProfileValue3 = '0.00';
    return true;
  }

  setLength(value, length) {
    while (String(value) < length) {
      value = '0' + value;
    }
    return value;
  }

  isDublicateOffender(offenderIdDisplay): string {
    const gridData = JSON.parse(JSON.stringify(this.offtxnData));
    const count = gridData.filter(ele => {
      return this.setLength(ele.offenderIdDisplay, 10) === this.setLength(offenderIdDisplay, 10);
    });
    return count.length <= 1 ? 'N' : 'Y';
  }
  goBtnLaunchClick = (event) => {
    const index = this.offtxnData.indexOf(event);
    this.dialogService.openLinkDialog('/OTINAMESDIALOG', null, 70).subscribe(result => {
      this.grid.setColumnData('offenderIdDisplay', index, result.offenderIdDisplay);
      this.grid.setColumnData('lastName', index, result.lastName);
      this.grid.setColumnData('firstName', index, result.firstName);
      this.grid.setColumnData('caseloadId', index, result.caseloadId);
      if (result.offenderId) {
        this.offenderIdDisplay = result.offenderIdDisplay;

        const description = this.otdttaccFactory.getHoldClearFlag(this.sessionManager.currentCaseLoad,
          result.rootOffenderId, this.sessionManager.currentCaseLoadType);
        description.subscribe(clFlag => {
          if (clFlag === 'A') {
            this.clFlag = 'Y';
            this.grid.setColumnData('holdClearFlag', index, this.clFlag);
          } else {
            this.clFlag = 'N';
            this.grid.setColumnData('holdClearFlag', index, null);
          }

        });
        const bal = this.otdttaccFactory.getHoldBal(this.sessionManager.currentCaseLoad,
          result.rootOffenderId, this.txnType);
        bal.subscribe(data => {
          if (data.length > 0) {
            this.grid.setColumnData('txnHoldEntryAmount', index, data[0].holdBalance);
          } else {
            this.grid.setColumnData('txnHoldEntryAmount', index, 0);
          }

        });

      }
      this.grid.setColumnData('txnEntryAmount', index, result.currentBalance);
    });
    return false;
  }
  offTransferAccounts = (event) => {
    const index = event.rowIndex;
    const rowData = new ValidateRowReturn();
    if (event.field === 'offenderIdDisplay' && event.newValue && event.data.offenderIdDisplay) {
      this.offtxnModel.offenderIdDisplay = event.data.offenderIdDisplay;
      /* for (let i = Number(String(this.offtxnModel.offenderIdDisplay).length); i < 10; i++) {
        this.offtxnModel.offenderIdDisplay = '0' + this.offtxnModel.offenderIdDisplay;
      } */
      const namesrchResult = this.otdttaccFactory.getRootOffenderId(this.sessionManager.currentCaseLoadType,
         this.offtxnModel.offenderIdDisplay);
      namesrchResult.subscribe(data => {
        if (data.rootOffenderId === undefined || data.rootOffenderId === null) {
          this.vthaData = [];
          this.grid.setColumnData('offenderIdDisplay', this.offtxnData.indexOf(event.data), this.offtxnModel.offenderIdDisplay);
          this.grid.setColumnData('offenderIdDisplay', this.offtxnData.indexOf(event.data), null);
          this.show(this.translateService.translate('otdttacc.offenderiddoes'), 'warn');
          return;
        } else {
          this.vthaData = data;
          this.caseloadId = this.sessionManager.currentCaseLoad;
          this.grid.setColumnData('offenderIdDisplay', this.offtxnData.indexOf(event.data), this.offtxnModel.offenderIdDisplay);
          this.grid.setColumnData('lastName', this.offtxnData.indexOf(event.data), data.lastName);
          this.grid.setColumnData('firstName', this.offtxnData.indexOf(event.data), data.firstName);
          this.grid.setColumnData('caseloadId', this.offtxnData.indexOf(event.data), this.caseloadId);
          this.offenderIdDisplay = this.offtxnModel.offenderIdDisplay;
          this.offenderId = data.rootOffenderId;
           this.offtxnData[index].offenderBookId = data.offenderBookId;
          if (data.rootOffenderId) {

            if (this.isDublicateOffender(this.offenderIdDisplay) === 'Y') {
              this.show(this.translateService.translate('otdttacc.offender') + this.offenderIdDisplay +
                this.translateService.translate('otdttacc.isalready'), 'warn');
              this.grid.setColumnData('offenderIdDisplay', this.offtxnData.indexOf(event.data), null);
              this.grid.setColumnData('lastName', this.offtxnData.indexOf(event.data), null);
              this.grid.setColumnData('firstName', this.offtxnData.indexOf(event.data), null);
              this.grid.setColumnData('caseloadId', this.offtxnData.indexOf(event.data), null);
              this.grid.setColumnData('holdClearFlag', this.offtxnData.indexOf(event.data), null);
              this.grid.setColumnData('txnEntryAmount', this.offtxnData.indexOf(event.data), null);
              this.grid.setColumnData('txnHoldEntryAmount', this.offtxnData.indexOf(event.data), null);
              this.offtxnData[index].offenderBookId = null;
              return rowData;
            }
            const description = this.otdttaccFactory.getHoldClearFlag(this.sessionManager.currentCaseLoad,
              data.rootOffenderId, this.sessionManager.currentCaseLoadType);
            description.subscribe(clFlag => {
              if (clFlag === 'A') {
                clFlag = 'Y';
                this.grid.setColumnData('holdClearFlag', this.offtxnData.indexOf(event.data), clFlag);
              } else {
                clFlag = 'N';
                this.grid.setColumnData('holdClearFlag', this.offtxnData.indexOf(event.data), null);
              }

            });
            const bal = this.otdttaccFactory.getHoldBal(this.sessionManager.currentCaseLoad,
              data.rootOffenderId, this.txnType);
            bal.subscribe(dataBal => {
              if (dataBal.length > 0) {
                const balance = dataBal[0].balance + dataBal[1].balance;
                const holdBalance = dataBal[0].holdBalance + dataBal[1].holdBalance;
                this.grid.setColumnData('txnEntryAmount', this.offtxnData.indexOf(event.data), balance);

                this.grid.setColumnData('txnHoldEntryAmount', this.offtxnData.indexOf(event.data), holdBalance);
                if (dataBal[0].balance) {
                 this.prevAmnt = 0.0;
                } else {
                  this.prevAmnt = 0.0;
                }
              } else {
                this.grid.setColumnData('txnEntryAmount', this.offtxnData.indexOf(event.data), 0);
                this.grid.setColumnData('txnHoldEntryAmount', this.offtxnData.indexOf(event.data), 0);
                this.nbtProfileValue3 = '0.0';
              }

            });

          }
        }
      });
    }
    if (event.field === 'txnEntryAmount') {
      const total = { tot: 0 };
      this.offtxnData.forEach(ele => {
        if (ele.txnEntryAmount) {
          total.tot += Number(ele.txnEntryAmount);

        }

      });
      this.nbtProfileValue3 = Number(total.tot).toFixed(2);

    }
    rowData.validated = true;
    return rowData;

  }

  otdttaccSaveofftxnForm(event) {
    this.offtxnInsertList = event.added;
    this.offtxnUpdatetList = event.updated;
    this.offtxnDeleteList = event.removed;
    this.offtxnCommitModel.insertList = [];
    this.offtxnCommitModel.updateList = [];
    this.offtxnCommitModel.deleteList = [];
    if (this.offtxnInsertList.length > 0) {
      for (let i = 0; i < this.offtxnInsertList.length; i++) {
        if (!this.csldttModel.caseloadId) {
          this.show(this.translateService.translate('otdttacc.tocaseloadmust'), 'warn');
          return;
        }
        if (!this.csldttModel.txnType) {
          this.show(this.translateService.translate('otdttacc.transactiontypmust'), 'warn');
          return;
        }
        if (!this.csldttModel.txnEntryDesc) {
          this.show(this.translateService.translate('otdttacc.descriptionmust'), 'warn');
          return;
        }
        if (!this.acprdModel.startDate) {
          this.show(this.translateService.translate('otdttacc.startdatemust'), 'warn');
          return;
        }
        if (!this.acprdModel.endDate) {
          this.show(this.translateService.translate('otdttacc.enddatemust'), 'warn');
          return;
        }
        if (this.sessionManager.currentCaseLoad === this.toCaseload) {
          this.show(this.translateService.translate('otdttacc.cannottransferoffender'), 'warn');
          return;
        }
        if (!this.corporateId) {
          this.show(this.translateService.translate('otdttacc.corporateid').replace('@TOCASELOAD@', this.csldttModel.caseloadId), 'warn');
          return;

        }
        if (!this.offtxnInsertList[i].offenderIdDisplay) {
          this.show(this.translateService.translate('otdttacc.idmustbe'), 'warn');
          return;

        }
        if (DateFormat.compareDate(DateFormat.getDate(this.acprdModel.startDate), DateFormat.getDate()) === 1) {
          this.show(this.translateService.translate('otdttacc.startdatenotgreater'), 'warn');
          return;

        }
        if (DateFormat.compareDate(DateFormat.getDate(this.acprdModel.startDate), DateFormat.getDate(this.acprdModel.endDate)) === 1) {
          this.show(this.translateService.translate('otdttacc.startdatenotgreaterendate'), 'warn');
          return;

        }
        if (DateFormat.compareDate(DateFormat.getDate(this.acprdModel.endDate), DateFormat.getDate()) === 1) {
          this.show(this.translateService.translate('otdttacc.enddatenotgreater'), 'warn');
          return;

        }
        if ( this.isDublicateOffender(this.offenderIdDisplay) === 'Y') {
          this.show(this.translateService.translate('otdttacc.offender')  + this.offenderIdDisplay +
              this.translateService.translate('otdttacc.isalready'), 'warn');
              return;
        }
        this.offtxnInsertList[i].payeeCorporateId = this.corporateId;
        this.offtxnInsertList[i].payeeNameText = this.corporateName;
        this.offtxnInsertList[i].txnType = this.txnType;
        this.offtxnInsertList[i].transferCaseloadId = this.toCaseload;
        this.offtxnInsertList[i].txnEntryDesc = this.csldttModel.txnEntryDesc;
        this.offtxnInsertList[i].txnPostingType = 'DR';
        this.offtxnInsertList[i].txnEntryDate = DateFormat.getDate();
        this.offtxnInsertList[i].deductionFlag = 'N';
        this.offtxnInsertList[i].slipPrintedFlag = 'N';
        this.offtxnInsertList[i].payeeCode = 'C';

      }
      for (let i = 0; i < this.offtxnUpdatetList.length; i++) {
      }
      this.offtxnCommitModel.insertList = this.offtxnInsertList;
      this.offtxnCommitModel.updateList = this.offtxnUpdatetList;
    }
    if (this.offtxnDeleteList.length > 0) {
      for (let i = 0; i < this.offtxnDeleteList.length; i++) {
      }
      this.offtxnCommitModel.deleteList = this.offtxnDeleteList;
    }
    const offtxnSaveData = this.otdttaccFactory.offTxnCommit(this.offtxnCommitModel);
    offtxnSaveData.subscribe(data => {
      if (data && data.length > 0 && !data[0].errorMessage) {
        this.cgnbtProfileValue = `${data.length}`;
        this.offtxnData = data;
        this.offtxnModel.txnId = data[0].txnId;
        this.nbtProfileValue3 = '0.00';
        this.csldttModel = new CaseloadTransactionTypes();
        this.retrieveButton = true;
        setTimeout(ele => {
          this.clear();
        }, 1500);
         this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');

      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });
  }
  clear() {
    this.offtxnData = [];
    this.offtxnModel = new OffenderTransactions();
    this.cgnbtProfileValue = undefined;
    this.cgnbtProfileValue2 = undefined;
    this.nbtProfileValue3 = undefined;
  }
  isInsertable() {
    if (this.csldttModel.caseloadId || this.csldttModel.txnType || this.csldttModel.txnEntryDesc || this.acprdModel.startDate
      || this.acprdModel.endDate || this.offtxnModel.txnId || this.blockReadonly) {
      this.clearButton = false;
    } else {
      this.clearButton = true;
    }
  }
}
