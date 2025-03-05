import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtucobwoService } from '../service/otucobwo.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderAdjustmentTxns } from '../beans/OffenderAdjustmentTxns';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
// import required bean declarations

@Component({
  selector: 'app-otucobwo',
  templateUrl: './otucobwo.component.html'
})

export class OtucobwoComponent implements OnInit {
  // Variable declaration
  @ViewChild('dialog', {static: true}) dialog: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  cobwoReadOnly: boolean;
  cgfkCobwoadjustmentreasoRg: any[] = [];
  link: string;
  dspDescription: string;
  lvResidualAmnt: number;
  lvWriteOffAmount: number;
  cobwoModel: OffenderAdjustmentTxns = new OffenderAdjustmentTxns();
  adjustmentAmount: string;
	dspAdjustAmount: string;
	saveEnabled: boolean;
	txnId: number;
  adjustFlg: boolean;
  adjustTempAmount: number;
  reasonTitles = { code: 'Reason:', description: 'Description' };

  constructor(private otucobwoFactory: OtucobwoService, public translateService: TranslateService,
    public sessionManager: UserSessionManager, public dialogService: DialogService, private amountFormat: AmountFormatUtil) {
    // TODO initilize data members here..!
  }
  ngOnInit() {
		this.saveEnabled = false;
    this.cobwoModel.adjustmentUserId = this.sessionManager.getId();
    this.whenNewRecordInstance();
    this.link = 'otucobwo/cgfkCobwoAdjustmentReasoRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
  }
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }

  whenNewRecordInstance() {
    const deductiondata = this.otucobwoFactory.offenderDeductionCur(this.dialog.data.offenderDeductionId);
    deductiondata.subscribe(data => {
      if (data.length > 0) {
        if (data[0].maxTotalAmount == null) {
          data[0].maxTotalAmount = 0;
        }
        if (data[0].deductionAmount == null) {
          data[0].deductionAmount = 0;
        }
        if (data[0].adjustmentAmount == null) {
          data[0].adjustmentAmount = 0;
        }
        this.lvResidualAmnt = data[0].maxTotalAmount - data[0].deductionAmount - data[0].adjustmentAmount;
        this.adjustmentAmount = Number(this.lvResidualAmnt).toFixed(2);
        this.dspAdjustAmount = Number(data[0].adjustmentAmount).toFixed(2);
        if (this.lvResidualAmnt <= 0) {
          this.lvResidualAmnt = 0;
        }
        this.lvWriteOffAmount = data[0].adjustmentAmount;
        this.cobwoModel.lvWriteOffAmount = this.lvWriteOffAmount;
      }

    });
  }
  whenValidateItem() {

    const deductiondata = this.otucobwoFactory.offenderDeductionCur(this.dialog.data.offenderDeductionId);
    deductiondata.subscribe(data => {
      if (data.length > 0) {
        if (data[0].maxTotalAmount == null) {
          data[0].maxTotalAmount = 0;
        }
        if (data[0].deductionAmount == null) {
          data[0].deductionAmount = 0;
        }
        if (data[0].adjustmentAmount == null) {
          data[0].adjustmentAmount = 0;
        }
        this.lvResidualAmnt = data[0].maxTotalAmount - data[0].deductionAmount - data[0].adjustmentAmount;

        if (this.lvResidualAmnt <= 0) {
          this.lvResidualAmnt = 0;
        }
        this.lvWriteOffAmount = data[0].adjustmentAmount;
        this.cobwoModel.lvWriteOffAmount = this.lvWriteOffAmount;
      }
    });
    if (this.adjustmentAmount && (Number(this.adjustmentAmount) > 0)) {
      if (Number(this.adjustmentAmount) > this.lvResidualAmnt) {
        this.show(this.translateService.translate('otucobwo.adjustmentamount') +
          this.adjustmentAmount +  ' ' + this.translateService.translate('otucobwo.owingagainst'));
        return true;


      }
    } else {
      this.adjustFlg = true;
      this.show(this.translateService.translate('otucobwo.adjustmentamountcannot'));
      return true;
    }


  }
  onButSave() {
    if (this.whenValidateItem()) {
      return;
    }
    if (this.adjustFlg) {
      return;
    }
    if (!this.cobwoModel.adjustmentReasonCode) {
      this.show(this.translateService.translate('otucobwo.allmandatorycolumns'));
      return;
    }
    if (!this.adjustmentAmount) {
      this.show(this.translateService.translate('otucobwo.allmandatorycolumns'));
      return;
    }
    if (!this.cobwoModel.adjustmentText) {
      this.show(this.translateService.translate('otucobwo.allmandatorycolumns'));
      return;
    }
    this.cobwoModel.adjustmentAmount = Number(this.adjustmentAmount);
    this.cobwoModel.caseloadId = this.dialog.data.caseloadId;
    this.cobwoModel.deductionType = this.dialog.data.deductionType;
    this.cobwoModel.offenderDeductionId = this.dialog.data.offenderDeductionId;
    this.cobwoModel.caseloadType = this.sessionManager.currentCaseLoadType;
    this.cobwoModel.offenderId = this.dialog.data.offenderId;
    this.cobwoModel.offenderBookId = this.dialog.data.offenderBookId;
    const doWriteOff = this.otucobwoFactory.save(this.cobwoModel);
    doWriteOff.subscribe(data => {
      if (data && data.length > 0) {
				this.txnId = data[0].txnId;
				this.saveEnabled = true;
        this.show('common.addupdateremoverecordsuccess', 'success');
        return;
      } else {
        this.show('common.addupdateremoverecordfailed', 'warn');
        return;
      }

    });

  }
  onButExitclick() {
    this.dialog.close(null);

  }
  onValueChange(event) {
    if (event) {
      this.adjustTempAmount = Number(this.adjustmentAmount);
      this.adjustmentAmount = this.adjustTempAmount.toFixed(2);
    }

  }
  amountKeyDown(event, comp) {
    if (!this.amountFormat.avoidKeys(event, this.adjustmentAmount)) {
     event.stopPropagation();
     return false;
    }
 }
 onAmountBlur(amount) {
  this.amountFormat.precisionFlot(amount);
 }
}
