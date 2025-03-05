import {
  Component, OnInit, ViewChild, AfterViewInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { OffenderBeneficiaries } from '@inmate/trust/trustaccounts/beans/OffenderBeneficiaries';
import { OcuovrobService } from '@inmate/trust/trustaccounts/service/ocuovrob.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OffenderBeneficiariesCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderBeneficiariesCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn, GridComponent } from '@ui-components/grid/grid.component';

@Component({
  selector: 'app-ocuovrob',
  templateUrl: './ocuovrob.component.html'
})

export class OcuovrobComponent implements OnInit,  AfterViewInit {
  caseLoadType: string;
  selected = -1;
  amtPaid: number;
  amtOwing: number;
  offbncCommitModel: OffenderBeneficiariesCommitBean = new OffenderBeneficiariesCommitBean();
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  @ViewChild('grid', {static: true}) grid: GridComponent;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  nameOfLovPage: string;
  listToCompare: any[] = [];
  offbncData: OffenderBeneficiaries[] = [];
  offbncDataTemp: OffenderBeneficiaries[] = [];
  offbncModel: OffenderBeneficiaries = new OffenderBeneficiaries();
  offbncIndex = -1;
  offbncUpdatetList: OffenderBeneficiaries[] = [];
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
  offBncColumnDef: any[];
  constructor(private ocuovrobFactory: OcuovrobService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.offBncColumnDef = [];
  }
  ngOnInit() {
    this.offBncColumnDef = [
      { fieldName: this.translateService.translate('common.person'), field: 'personId', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.firstname'), field: 'firstName', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocuovrob.corp'), field: 'corporateId', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.name'), field: 'corporateName', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.obligationid'), field: 'offenderDeductionId', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.type'), field: 'deductionType', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocuovrob.docket'), field: 'informationNumber', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocuovrob.amountowing'), field: 'drvAmount', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocuovrob.amountpaidthisreceipt'), field: 'overrideAmount', editable: true, width: 150,
      datatype: 'number', format : '1.2-2', maxValue : 999999999.99,
      strictFP: true, whole: true },
    ];

  }
  ngAfterViewInit() {
    this.offbncExecuteQuery();
  }
  onRowClickoffbnc(event) {
    if (event) {
      this.offbncModel = event;
    }
  }
  exit() {
    this.dialog.close( null );
  }
  offbncExecuteQuery() {
    this.offbncModel = new OffenderBeneficiaries();
    this.offbncModel.offenderId = this.dialog.data.offenderId;
    this.offbncModel.caseloadId = this.dialog.data.caseloadId;
    if (this.dialog.data.moduleName === 'OCDCPPAY') {
      this.offbncModel.txnType = 'CFPP';
    } else {
    this.offbncModel.txnType = this.dialog.data.txnType;
    }
    this.offbncModel.moduleName = this.dialog.data.moduleName;
    const offbncResult = this.ocuovrobFactory.offBncExecuteQuery(this.offbncModel);
    offbncResult.subscribe(offbncResultList => {
      if (offbncResultList.length === 0) {
        this.offbncData = [];
        this.show('common.querycausednorecords');
      } else {
        offbncResultList.forEach(element => {
          if (element.drvAmount || element.drvAmount === 0) {
          element.drvAmount = Number(element.drvAmount).toFixed(2);
          }
        });
        this.selected = 0;
        this.offbncData = offbncResultList;
        this.offbncModel = offbncResultList[0];
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocuovrobSaveoffbncForm(event) {
    this.offbncUpdatetList = [];
    if (!this.gridValidation()) {
      return;
    }
    event.updated.forEach(
      (v: any, k: number) => {
        if (v.overrideAmount) {
    this.offbncUpdatetList.push(v);
        }
      }
    );
    // this.offbncUpdatetList = event.updated;
    this.offbncCommitModel.updateList = [];
    this.amtOwing = 0;
    this.amtPaid = 0;
    if (this.offbncUpdatetList.length > 0) {
      for (const ele of this.offbncUpdatetList) {
        ele.moduleName = this.dialog.data.moduleName;
        if (this.dialog.data.moduleName === 'OCDCPPAY') {
        ele.location = this.dialog.data.location;
        ele.caseloadId = this.sessionManager.currentCaseLoad;
        ele.commentText = this.dialog.data.commentText;
        }
      }
      this.offbncCommitModel.updateList = this.offbncUpdatetList;
    }
    const offbncSaveData = this.ocuovrobFactory.offBncCommit(this.offbncCommitModel);
    offbncSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.offbncExecuteQuery();
      } else if (data === 1773) {
        this.type = 'warn';
        // this.message = this.trMsg('ocuovrob.cppisnotoneofreciept');
        this.show('ocuovrob.cppisnotoneofreciept');
      } else if (data === 5) {
        this.show('ocuovrob.thisaccountisclosedpleaseopenitfirst');
      } else {
        this.show('common.addupdateremoverecordfailed', 'error');
      }
    });
  }

  gridValidation() {
    const is = {valid: true};
    this.offbncData.forEach(ele => {
      if (is.valid) {
      if (!ele.offenderDeductionId) {
        is.valid = false;
        return;
      }
      if (ele.overrideAmount && ele.drvAmount &&  Number(ele.overrideAmount) > Number(ele.drvAmount)) {
        this.show('ocuovrob.amountpaidmustbelessorequaltoamountowning');
        is.valid = false;
        return;
      }
    }});
    if (is.valid) {
      if (this.dialog.data.receiptAmount) {
        const totAmt =  this.offbncData.map(ele => {
          if (ele.overrideAmount) {
            return ele.overrideAmount;
          }
        }).reduce((per, post) => {
          per = per ? per : 0;
          post = post ? post : 0;
        return Number(per) + Number(post);
        });
        if (this.sessionManager.currentCaseLoadType === 'INST') {
      if (totAmt && Number(totAmt) > Number(this.dialog.data.receiptAmount)) {
        const message = this.trMsg('ocuovrob.totalamountpaidmustbeequaltoreceiptamount', ` ${Number(this.dialog.data.receiptAmount)}`);
        this.show(message);
        return false;
      }
    } else {
      if (totAmt && Number(totAmt) !== Number(this.dialog.data.receiptAmount)) {
        const message = this.trMsg('ocuovrob.totalamountpaidmustbeequaltoreceiptamount', ` ${Number(this.dialog.data.receiptAmount)}`);
        this.show(message);
        return false;
      }
    }
    }
    }
    return is.valid;
  }

  syspflExecuteQuery() {
    const syspflResult = this.ocuovrobFactory.sysPflExecuteQuery(this.syspflModel);
    syspflResult.subscribe(syspflResultList => {
      if (syspflResultList.length === 0) {
        this.syspflData = [];
      } else {
        this.syspflData = syspflResultList;
        this.syspflModel = syspflResultList[0];
      }
    });
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

  gridValidate = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    if (event.field === 'overrideAmount' && !this.isNull(event.newValue)) {
      if (Number(event.newValue) === 0) {
        this.grid.setColumnData('overrideAmount', index, null);
      }
      if (Number(event.newValue) > Number(event.data.drvAmount)) {
        this.show('ocuovrob.amountpaidmustbelessorequaltoamountowning');
        this.grid.setColumnData('overrideAmount', index, null);
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  isNull(value) {
    return value === null || value === undefined || value === '';
}

}
