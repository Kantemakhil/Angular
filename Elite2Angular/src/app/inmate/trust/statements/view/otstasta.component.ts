import {
  Component,
  OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtstastaService } from '../service/otstasta.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderBookings } from '@inst/demographics-biometrics/beans/OffenderBookings';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { TransStatementBean } from '@inmate/trust/statements/beans/TransStatementBean';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
  selector: 'app-otstasta',
  templateUrl: './otstasta.component.html'
})

export class OtstastaComponent implements OnInit {
  reqCopies: boolean;
  numberOfCopy: number;
  displayFlag: boolean;
  disclosureFlag: string;
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  transStmntModel: TransStatementBean = new TransStatementBean();
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  nameOfLovPage: string;
  listToCompare: any[] = [];
  subAccountType: string;
  accodeIndex = -1;
  offbkg1Data: OffenderBookings[] = [];
  offbkg1DataTemp: OffenderBookings[] = [];
  offbkg1Model: OffenderBookings = new OffenderBookings();
  offbkg1Index = -1;
  offbkg1InsertList: OffenderBookings[] = [];
  offbkg1UpdatetList: OffenderBookings[] = [];
  offbkg1DeleteList: OffenderBookings[] = [];
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
  moduleName: string;
  startDate: Date;
  endDate: Date;
  isSaveDis: boolean;
  isClearDis: boolean;
  indTrans: boolean;
  flag: boolean;

  constructor(private otstastaFactory: OtstastaService,
    public translateService: TranslateService,
    private offenderSearchService: OffenderSearchService,
    private sessionManager: UserSessionManager
  ) {

  }
  ngOnInit() {
    this.flag = true;
    //this.transStmntModel.disclosureFlag = 'Y';
    this.vHeaderBlockModel = new VHeaderBlock();
    this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    // this.numberOfCopy = 1;
    // this.moduleName = 'OTRTASTA';
    this.displayFlag = true;
    this.isSaveDis = true;
    this.isClearDis = true;
    this.disabled = true;
    if (!this.vHeaderBlockModel) {
      this.show('common.pleasesearchforvalidoffender');
    }
  }
  isInsertable() {
    if (this.transStmntModel.subAccountType || this.transStmntModel.beginDate || this.transStmntModel.endDate) {
      this.isClearDis = false;
    } else {
      this.isClearDis = true;
    }
  }
  isInsertableOne() {
    if (this.transStmntModel.disclosureFlag) {
      this.isClearDis = false;
    }
  }
  allowNumbers(event) {
  }
  ok() {
  }
  no() {
  }
  cancel() {
    this.transStmntModel.subAccountType = null;
    this.transStmntModel.disclosureFlag = 'Y';
    this.transStmntModel.beginDate = null;
    this.transStmntModel.endDate = null;
    // if (this.flag) {
    //   this.flag = false;
    //   this.isSaveDis = true;
    // } else {
    //   this.isSaveDis = false;
    // }
    this.isSaveDis = false;
    this.isClearDis = true;
  }
  textBlurEvent(event) {
    this.indTrans = false;
    if (!['Y', 'N'].includes(event)) {
      this.transStmntModel.disclosureFlag = 'Y';
      this.show('otstasta.youmustenteryorn');
      this.indTrans = false;
      return;
    } else if (!event) {
      this.indTrans = true;
    }
}
  onOffenderChange(offender) {
    if (offender) {
      if(offender.trustAccount ) {
      this.vHeaderBlockModel = offender;
      this.transStmntModel.disclosureFlag = 'Y';
      this.numberOfCopy = 1;
      this.moduleName = 'OTRTASTA';
      this.disabled = false;
      this.isSaveDis = false;
      this.isClearDis = true;
    }else{
      this.transStmntModel.disclosureFlag = null;
      this.numberOfCopy = null;
      this.moduleName = null;
      this.disabled = true;
      this.isSaveDis = true;
      this.isClearDis = true;

    } }else {
      this.vHeaderBlockModel = new VHeaderBlock();
      this.disabled = true;
      this.moduleName = null;
      this.isSaveDis = true;
      this.isClearDis = true;
      this.transStmntModel.disclosureFlag = null;
    }
  }

  onSave() {
    const beginDate = DateFormat.getDate(this.transStmntModel.beginDate);
    const endDate = DateFormat.getDate(this.transStmntModel.endDate);
    if (beginDate) {
      if (DateFormat.compareDate(beginDate, DateFormat.getDate()) === 1) {
        this.show('otstasta.startdateemustbecurrent');
        return;
      }
    } if (DateFormat.compareDate(beginDate, endDate) === 1) {
      this.show(this.translateService.translate('otstasta.enddategreater'));
      return;
    } if (this.endDate) {
      if (DateFormat.compareDate(endDate, DateFormat.getDate()) === 1) {
        this.show(this.translateService.translate('otstasta.enddatemustbecurrent'));
        return;
      }
    }
    if (this.indTrans) {
        this.show('otstasta.transdescriptionmustentered');
        return;
    }
    this.transStmntModel.caseloadId = this.vHeaderBlockModel.caseLoadId;
    this.transStmntModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
    this.transStmntModel.fUserOne = this.sessionManager.getId();
    this.transStmntModel.fDateOne = DateFormat.getDate();
    this.otstastaFactory.mainProcess(this.transStmntModel).subscribe(data => {
      if (data && data.report) {
        const base64pdf = 'data:application/pdf;base64,';
        const pdf = base64pdf + data.report;
        const win = window.open(pdf);
        win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
        this.transStmntModel = new TransStatementBean();
        this.transStmntModel.disclosureFlag = 'Y';
      } else if (data.errorMessage) {
        this.show(data.errorMessage);
      } else {
        this.show('otstasta.unabletoreport', 'warn');
        return;
      }
    });
  }
  syspflExecuteQuery() {
    const syspflResult = this.otstastaFactory.sysPflExecuteQuery(this.syspflModel);
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
 * This function calls when default printer checkbox changed.
 */
  confirmDefaultprinter(event) {
    if (event.checked) {
      this.reqCopies = true;
    } else {
      this.reqCopies = false;
      this.numberOfCopy = 1;
    }
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

}

