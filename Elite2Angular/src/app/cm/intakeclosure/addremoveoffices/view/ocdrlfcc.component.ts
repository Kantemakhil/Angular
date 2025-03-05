import {
  Component,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdrlfccService } from '../service/ocdrlfcc.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderBookingAgyLocs } from '@cmintakeclosureaddremoveoffices/OffenderBookingAgyLocs';
import { OffenderBookingAgyLocsCommitBean } from '@cmintakeclosureaddremoveoffices/OffenderBookingAgyLocsCommitBean';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { InjectOffenderService } from '@core/service/inject-offender.service';

@Component({
  selector: 'app-ocdrlfcc',
  templateUrl: './ocdrlfcc.component.html'
})

export class OcdrlfccComponent implements OnInit {
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  offagyData: OffenderBookingAgyLocs[] = [];
  offagyDataTemp: OffenderBookingAgyLocs[] = [];
  vHeaderBlock: VHeaderBlock = new VHeaderBlock();
  offagyModel: OffenderBookingAgyLocs = new OffenderBookingAgyLocs();
  offagyCommitModel: OffenderBookingAgyLocsCommitBean = new OffenderBookingAgyLocsCommitBean();
  offagyIndex: number;
  offagyInsertList: OffenderBookingAgyLocs[] = [];
  offagyUpdateList: OffenderBookingAgyLocs[] = [];
  offagyDeleteList: OffenderBookingAgyLocs[] = [];
  offagy1Data: OffenderBookingAgyLocs[] = [];
  offagy1DataTemp: OffenderBookingAgyLocs[] = [];
  offagy1Model: OffenderBookingAgyLocs = new OffenderBookingAgyLocs();
  offagy1Index: number;
  offagy1InsertList: OffenderBookingAgyLocs[] = [];
  offagy1UpdatetList: OffenderBookingAgyLocs[] = [];
  offagy1DeleteList: OffenderBookingAgyLocs[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  offagyColumnDef: any[];
  offagyReadOnly: boolean;
  offagy1ReadOnly: boolean;
  navigationdummyRg: any[] = [];
  cgfkOffagy1dspdescriptionRg: any[] = [];
  tableIndex = -1;
  removedDate: Date;
  reason: string;
  additionComment: string;
  reasonLink: string;
  autoPoplate: boolean;
  blockDisabled: boolean;
  saveDisabled: boolean;
  flag: boolean;
  clearDisabled: boolean;
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  disableCount: any;
  constructor(private ocdrlfccFactory: OcdrlfccService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService,
    private injectOffenderService: InjectOffenderService) {
    this.offagyColumnDef = [];
  }
  ngOnInit() {
    this.blockDisabled = true;
    this.saveDisabled = true;
    this.clearDisabled = true;
    this.autoPoplate = true;
    this.disableCount = 1;
    this.reasonLink = 'ocdrlfcc/cgfkOffagy1DspDescriptionRecordGroup';
    this.offagyColumnDef = [
      { fieldName: this.trMsg('ocdrlfcc.adddate'), field: 'make', editable: false, width: 150 },
      { fieldName: this.trMsg('common.location'), field: 'sealFlag', editable: false, width: 150 },
      { fieldName: this.trMsg('ocdrlfcc.removeddate'), field: 'removedDate', editable: false, width: 150, datatype: 'date' },
    ];
    this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
      this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
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
  trMsg(msg, astr?) {
    return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
  }
  onRowClickoffagy(event) {
    if (event) {
      this.offagyModel = event;
      if (this.offagyModel.removedDateTemp) {
        this.removedDate = this.offagyModel.removedDate;
        this.reason = this.offagyModel.removedReasonCode;
        this.additionComment = this.offagyModel.removalComment;
        this.blockDisabled = true;
        //this.clearDisabled = true;
        this.saveDisabled = true;
      } else {
        this.removedDate = DateFormat.getDate();
        this.reason = null;
        this.additionComment = null;
        this.blockDisabled = false;
        //this.clearDisabled = false;
        this.saveDisabled = false;
      }
    } else {
      this.offagyModel = new OffenderBookingAgyLocs();
      this.removedDate = null;
      this.reason = null;
      this.additionComment = null;
      this.blockDisabled = true;
      this.saveDisabled = true;
      //this.clearDisabled = true;
    }
  }
  onButClear() {
     this.removedDate = DateFormat.getDate();
    this.reason = null;
    this.additionComment = null;
    this.saveDisabled = false;
    this.clearDisabled = true;
  }
  reasonChangeEvent(event) {
    if (event && event.code) {
      if (this.autoPoplate) {
        this.autoPoplate = false;
        setTimeout(ele => {
          this.reason = null;
        }, 5);
        return;
      }
    }
  }
  dateBlurValid() {
    if (DateFormat.compareDate(DateFormat.getDate(this.removedDate), DateFormat.getDate()) === 1) {
      this.show('ocdrlfcc.removeddatecannotbegreaterthansysdate');
      this.flag = true;
    } else {
      this.flag = false;
    }
  }
  allowNumbers(event) {
  }
  ok() {
  }
  no() {
  }
  cancel() {
  }
  onOffenderChange(offender) {
    if (offender) {
      this.vHeaderBlock = offender;
      this.ocdrlfccexecuteQuery();
    } else {
      this.offagyData = [];
      this.offagyModel = new OffenderBookingAgyLocs();
      this.removedDate = null;
      this.reason = null;
      this.additionComment = null;
      this.blockDisabled = true;
      this.saveDisabled = true;
      this.clearDisabled = true;
    }
  }
  /**
  * This function loads the data into the Master Record and its child records
  */
  ocdrlfccPopulateDetails() {
    const serviceObj = this.ocdrlfccFactory.
      offagy1ExecuteQuery(this.offagyModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.offagy1Data = [];
      } else {
        this.offagy1Data = data;
      }
    });
  }
  onStatusBlur() {
    if (!this.reason) {
      this.reason = this.reason === '' ? undefined : '';
    }
  }

  ocdrlfccexecuteQuery() {
    this.offagyModel.offenderBookId = this.vHeaderBlock.offenderBookId;
    const serviceObj = this.ocdrlfccFactory.
      offagyExecuteQuery(this.offagyModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.offagyData = [];
        this.removedDate = null;
      } else {
        this.offagyData = data;
        this.offagyData.forEach(e =>{
          e.removedDateTemp = e.removedDate;
        });
        this.tableIndex = 0;
        this.removedDate = DateFormat.getDate();
        this.saveDisabled = false;
      }
    });
  }

  isInsertable(date?) {
    if (!(this.offagyModel && this.offagyModel.removedDateTemp)) {
      if (this.reason && this.removedDate) {
        this.clearDisabled = false;
        this.saveDisabled = false;
        if (DateFormat.compareDate(this.removedDate, DateFormat.getDate()) === 1) {
          this.clearDisabled = false;
          this.saveDisabled = true;
        } else {
          this.clearDisabled = false;
          this.saveDisabled = false;
        }
        if((this.offagyModel.removalComment !== this.additionComment) || (this.offagyModel.removedReasonCode !== this.reason)){
          this.clearDisabled = false;
        }

      } else if (!this.reason  && this.removedDate && !this.additionComment) {
        this.clearDisabled = true;
        this.saveDisabled = false;
        if((this.offagyModel.removalComment !== this.additionComment) || (this.offagyModel.removedReasonCode !== this.reason)){
          this.clearDisabled = false;
        }
      } else {
        if (this.disableCount > 1) {
          this.clearDisabled = false;
          this.saveDisabled = false;
          this.disableCount = this.disableCount++;
        }
        if((this.offagyModel.removalComment !== this.additionComment) || (this.offagyModel.removedReasonCode !== this.reason)){
          this.clearDisabled = false;
        }
      }
     

      if (date) {
        this.clearDisabled = false;
      }
    }
  }

  isInsertableCom() {
    if (this.additionComment) {
      this.clearDisabled = false;
    } else {
      this.clearDisabled = true;
    }
  }

  offagy1ExecuteQuery() {
    const offagyResult = this.ocdrlfccFactory.
      offagy1ExecuteQuery(this.offagyModel);
    offagyResult.subscribe(offagyResultList => {
      if (offagyResultList.length === 0) {
        this.offagy1Data = [];
      } else {
        this.offagy1Data = offagyResultList;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  onButSave(date?) {
    if (date) {
      if (date.lastValue === '0_/__/____') {
          this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
          return;
      }
      if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
          this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
          return;
      }
    this.offagyInsertList = [];
    this.offagyCommitModel.insertList = [];
    this.offagyCommitModel.updateList = [];
    this.offagyCommitModel.deleteList = [];
    if (!this.removedDate) {
      this.show('ocdrlfcc.removedatemustbeentered');
      return;
    }
    if (this.removedDate) {
      if (DateFormat.compareDate(DateFormat.getDate(this.removedDate), DateFormat.getDate()) === 1) {
        this.show('ocdrlfcc.removeddatecannotbegreaterthansysdate');
        return;
      }
    }
    if (!this.reason) {
      this.show('ocdrlfcc.reasonmustbeentered');
      return;
    }
    this.offagyModel.removedDate = this.removedDate;
    this.offagyModel.reasonCode = this.reason;
    this.offagyModel.removalComment = this.additionComment;
    this.offagyInsertList.push(this.offagyModel);
    this.offagyCommitModel.insertList = this.offagyInsertList;
    const offagy1SaveData = this.ocdrlfccFactory.offagyCommit(this.offagyCommitModel);
    offagy1SaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.injectOffenderService.updateOffenderInContext(this.vHeaderBlock.offenderId);
       // this.ocdrlfccexecuteQuery();
        return;
      }
      if (data === 4) {
        this.show('ocdrlfcc.datecannotbeearilerthancreationdate');
        return;
      }
      if (data === 5) {
        this.show('ocdrlfcc.reasonmustbeentered');
        return;
      }
      if (data === 2) {
        this.show('ocdrlfcc.closingofthislocationisnotallowed');
        return;
      }
      if (data === 3) {
        this.show('ocdrlfcc.closingofthislocationisnotallowedprimaryintakelocation');
        return;
      }
      if (data === 6) {
        this.show('ocdrlfcc.errorcheckinglocationrecord');
        return;
      }
      if (data === 7) {
        this.show('ocdrlfcc.thelocationcannotberemovedasitisattachedtoanactivecaseplan');
        return;
      }
      if (data === 8) {
        this.show('ocdrlfcc.closingofthislocationisnotallowedasthisisthelastactivelocation');
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        return;
      }
    });
  }
}
}
