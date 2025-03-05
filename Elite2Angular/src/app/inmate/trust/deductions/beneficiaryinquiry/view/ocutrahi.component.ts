import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcutrahiService } from '../service/ocutrahi.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { BeneficiaryTransactions } from '@inmate/beans/BeneficiaryTransactions';
import { VBankChequeBeneficiaries } from '@inmate/beans/VBankChequeBeneficiaries';

@Component({
  selector: 'app-ocutrahi',
  templateUrl: './ocutrahi.component.html'
})

export class OcutrahiComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  bentxnData: BeneficiaryTransactions[] = [];
  bentxnDataTemp: BeneficiaryTransactions[] = [];
  bentxnModel: BeneficiaryTransactions = new BeneficiaryTransactions();
  bentxnIndex = -1;
  bentxnInsertList: BeneficiaryTransactions[] = [];
  bentxnUpdatetList: BeneficiaryTransactions[] = [];
  bentxnDeleteList: BeneficiaryTransactions[] = [];
  vbcbenData: VBankChequeBeneficiaries[] = [];
  vbcbenDataTemp: VBankChequeBeneficiaries[] = [];
  vbcbenModel: VBankChequeBeneficiaries = new VBankChequeBeneficiaries();
  vbcbenIndex = -1;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  glTxn1ColumnDef: any[];
  benTxnColumnDef: any[];
  offOblHtyColumnDef: any[];
  perColumnDef: any[];
  offBncColumnDef: any[];
  vCorpColumnDef: any[];
  vBcBenColumnDef: any[];
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  constructor(private ocutrahiFactory: OcutrahiService,
    public translateService: TranslateService,
    public dialogService: DialogService,
    private sessionManager: UserSessionManager) {
  }
  ngOnInit() {
    this.benTxnColumnDef = [
      { fieldName: this.translateService.translate('ocutrahi.txnid'), field: 'txnId', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocutrahi.entryseq'), field: 'txnEntrySeq', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocutrahi.glseq'), field: 'glEntrySeq', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.date'), field: 'txnEntryDate', editable: false, width: 150, datatype: 'date' },
      { fieldName: this.translateService.translate('common.time'), field: 'txnEntryTime', editable: false, width: 150, datatype: 'time' },
      { fieldName: this.translateService.translate('common.type'), field: 'txnType', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.description'), field: 'txnEntryDesc', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.amount'), field: 'txnEntryAmount', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocutrahi.modifyuser'), field: 'modifyUserId', editable: false, width: 150 },
    ];
    this.vBcBenColumnDef = [
      { fieldName: this.translateService.translate('ocutrahi.bankcleardate'), field: 'chequePaidDate', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocutrahi.checkslash'), field: 'chequeNumber', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocutrahi.txnidupdate'), field: 'chequeTxnId', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('ocutrahi.checkprocessdate'), field: 'createDate', editable: false,
        width: 150, datatype: 'date'
      },
      { fieldName: this.translateService.translate('ocutrahi.checkstatus'), field: 'chequeStatus', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.time'), field: 'txnEntryTime', editable: false, width: 150, datatype: 'time' },
      { fieldName: this.translateService.translate('common.description'), field: 'txnEntryDesc', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocutrahi.checkamount'), field: 'chequeAmount', editable: false, width: 150 },
    ];

    this.bentxnExecuteQuery();
    this.vbcbenExecuteQuery();
  }
  onRowClickbentxn(event) {
  }
  onRowClickvbcben(event) {
  }
  onButProfileValueclick() {
  }
  ok() {
  }
  no() {
  }
  cancel() {
  }
  onOffenderChange(offender) {
  }
  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }
  bentxnExecuteQuery() {
    this.bentxnModel = new BeneficiaryTransactions();
    this.bentxnModel.offenderDeductionId = this.dialog.data.offenderDeductionId;
    this.bentxnModel.corporateId = this.dialog.data.corporateId;
    this.bentxnModel.personId = this.dialog.data.personId;
    if (this.bentxnModel.offenderDeductionId ||
      this.bentxnModel.corporateId ||
      this.bentxnModel.personId) {
      const bentxnResult = this.ocutrahiFactory.benTxnExecuteQuery(this.bentxnModel);
      bentxnResult.subscribe(bentxnResultList => {
        if (bentxnResultList.length === 0) {
          this.bentxnData = [];
          this.bentxnIndex = -1;
          this.type = 'warn';
          this.message = this.translateService.translate('common.querycaused');
          this.show();
          return;
        } else {
          bentxnResultList.forEach(element => {
            element.txnEntryAmount = Number(element.txnEntryAmount).toFixed(2);
            if (String(element.txnEntryAmount).startsWith('-')) {
              element.txnEntryAmount = '<' + Math.abs(element.txnEntryAmount).toFixed(2) + '>';
            }
          });
          this.bentxnData = bentxnResultList;
          this.bentxnModel = bentxnResultList[0];
          this.bentxnIndex = 0;
        }
      });
    } else {
      this.bentxnData = [];
      this.bentxnIndex = -1;
    }
  }

  vbcbenExecuteQuery() {
    this.vbcbenModel.corporateId = this.dialog.data.corporateId;
    this.vbcbenModel.personId = this.dialog.data.personId;
    if (this.vbcbenModel.corporateId || this.vbcbenModel.personId) {
      const vbcbenResult = this.ocutrahiFactory.vBcBenExecuteQuery(this.vbcbenModel);
      vbcbenResult.subscribe(vbcbenResultList => {
        if (vbcbenResultList.length === 0) {
          this.vbcbenData = [];
          this.vbcbenIndex = -1;
        } else {
          vbcbenResultList.forEach(element => {
            element.chequeAmount = Number(element.chequeAmount).toFixed(2);
            if (String(element.chequeAmount).startsWith('-')) {
              element.chequeAmount = '<' + Math.abs(element.chequeAmount).toFixed(2) + '>';
            }
          });
          this.vbcbenData = vbcbenResultList;
          this.vbcbenModel = vbcbenResultList[0];
          this.vbcbenIndex = 0;
        }
      });
    } else {
      this.vbcbenData = [];
      this.vbcbenIndex = -1;
    }
  }

  exit() {
    this.dialog.close(null);
  }
}

