import {
  Component,
  OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtiglbalService } from '../service/otiglbal.service';
import { CaseloadCurrentAccounts } from '@inmatetrustgeneralledgerbeans/CaseloadCurrentAccounts';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
  selector: 'app-otiglbal',
  templateUrl: './otiglbal.component.html'
})

export class OtiglbalComponent implements OnInit {
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  csldcaData: CaseloadCurrentAccounts[] = [];
  csldcaDataTemp: CaseloadCurrentAccounts[] = [];
  csldcaModel: CaseloadCurrentAccounts = new CaseloadCurrentAccounts();
  csldcaIndex = 0;
  csldcaInsertList: CaseloadCurrentAccounts[] = [];
  csldcaUpdateList: CaseloadCurrentAccounts[] = [];
  csldcaDeleteList: CaseloadCurrentAccounts[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable = true;
  cmAcCodeColumnDef: any[];
  vOffBkgColumnDef: any[];
  accountCode: any;
  accountType: any;
  postingCode: any;
  caseloadType: any;
  caseLoadId: any;
  accountname: any;
  balance: any;
  namesReadOnly: boolean;
  retriveDisable: boolean;
  clearDisable: boolean;
  tableIndex = -1;
  constructor(private otiglbalFactory: OtiglbalService,
    public translateService: TranslateService,
    private sessionManager: UserSessionManager) {
    this.cmAcCodeColumnDef = [];
  }
  ngOnInit() {
    this.namesReadOnly = false;
    this.retriveDisable = false;
    this.clearDisable = true;
    this.caseloadType = this.sessionManager.currentCaseLoadType;
    this.caseLoadId = this.sessionManager.currentCaseLoad;
    this.csldcaExecuteQuery();
    this.cmAcCodeColumnDef = [
      {
        fieldName: this.translateService.translate('otiglbal.accountcode'),
        field: 'accountCode', editable: false, width: 120, maxlength: 6, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('otiglbal.accountname'),
        field: 'bankAccountNumber', editable: false, width: 150, maxlength: 40, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('otiglbal.accounttype'),
        field: 'accountPartyType', editable: false, width: 120, maxlength: 12, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('otiglbal.postingtype'),
        field: 'dspTxnPostingType', editable: false, width: 120, maxlength: 12, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('otiglbal.balance'),
        field: 'currentBalance', editable: false, width: 120, maxlength: 15, datatype: 'text'
      },
    ];
  }

  onGridReady(event) {
  }
  onRowClickcsldca(event) {
  }
  ok() {
  }
  no() {
  }
  cancel() {
    this.csldcaData = [];
    this.csldcaModel = new CaseloadCurrentAccounts();
    this.accountCode = undefined;
    this.accountType = undefined;
    this.postingCode = undefined;
    this.namesReadOnly = false;
    this.retriveDisable = false;
    this.clearDisable = true;
  }
  onOffenderChange(offender) {
  }
  csldcaExecuteQuery() {
    this.csldcaModel = new CaseloadCurrentAccounts();
//    if (this.accountCode) {
//      this.csldcaModel.accountCode = this.accountCode;
//    }
//    if (this.accountType) {
//      this.csldcaModel.accountPartyType = this.accountType;
//    }
//    if (this.postingCode) {
//      this.csldcaModel.dspTxnPostingType = this.postingCode;
//    }
//    if (this.accountname) {
//      this.csldcaModel.bankAccountNumber = this.accountname;
//    }
//    if (this.balance) {
//      this.csldcaModel.currentBalance = this.balance;
//    }
    this.csldcaModel.globalCaseloadType = this.caseloadType;
    this.csldcaModel.caseloadId = this.caseLoadId;
    const csldcaResult = this.otiglbalFactory.csldCaExecuteQuery(this.csldcaModel);
    csldcaResult.subscribe(csldcaResultList => {
      if (csldcaResultList.length === 0) {
        this.csldcaData = [];
        this.show(this.translateService.translate('common.querycaused'));
      } else {
        for (let i = 0; i < csldcaResultList.length; i++) {
          if (csldcaResultList[i].currentBalance && csldcaResultList[i].currentBalance > 0) {
            csldcaResultList[i].currentBalance = csldcaResultList[i].currentBalance.toFixed(2);
          } else if (csldcaResultList[i].currentBalance && csldcaResultList[i].currentBalance < 0) {
            csldcaResultList[i].currentBalance = csldcaResultList[i].currentBalance.toFixed(2) + '>';
            csldcaResultList[i].currentBalance =
              String(csldcaResultList[i].currentBalance).replace('-', '<');
          } else {
            csldcaResultList[i].currentBalance = '.00';
          }
        }
        this.csldcaData = csldcaResultList;
        this.csldcaModel = csldcaResultList[0];
        this.namesReadOnly = true;
        this.retriveDisable = true;
        this.clearDisable = false;
        this.tableIndex = 0;
      }
    });
  }
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  isInsertable() {
    if (this.accountCode || this.accountType || this.postingCode) {
      this.clearDisable = false;
    } else {
      this.clearDisable = true;
    }
  }
}
