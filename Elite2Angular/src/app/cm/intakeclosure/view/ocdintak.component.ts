
import {
  Component, OnInit, OnDestroy,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdintakService } from '../service/ocdintak.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock2 } from '@commonbeans/VHeaderBlock2';
import { OffenderBookings } from '@instdemographicsbeans/OffenderBookings';
import { OffenderBookingEvent } from '@cm/intakeclosure/beans/OffenderBookingEvent';
import { OffenderResidence } from '@cm/intakeclosure/beans/OffenderResidence';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OffenderBookingEventCommitBean } from '../beans/OffenderBookingEventCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderResidenceCommitBean } from '../beans/OffenderResidenceCommitBean';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
  selector: 'app-ocdintak',
  templateUrl: './ocdintak.component.html'
})
export class OcdintakComponent implements OnInit, OnDestroy {
  myResetVar = true;
  caseloadFlag = false;
  bookingFlag = true;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  offbkgData: VHeaderBlock2[] = [];
  vheaderBlockModel: VHeaderBlock2 = new VHeaderBlock2();
  vHeaderBlockModelOne: VHeaderBlock2 = new VHeaderBlock2();
  offbkgIndex: Number = 0;
  offbkgInsertList: VHeaderBlock2[] = [];
  offbkgUpdatetList: VHeaderBlock2[] = [];
  offbkgDeleteList: VHeaderBlock2[] = [];
  offbkgsData: OffenderBookings[] = [];
  offbkgsDataTemp: OffenderBookings[] = [];
  offbkgsModel: OffenderBookings = new OffenderBookings();
  offbkgsIndex: Number = 0;
  offbkgsInsertList: OffenderBookings[] = [];
  offbkgsUpdatetList: OffenderBookings[] = [];
  offbkgsDeleteList: OffenderBookings[] = [];
  offbkgeData: OffenderBookingEvent[] = [];
  offbkgeDataTemp: OffenderBookingEvent[] = [];
  offbkgeModel: OffenderBookingEvent = new OffenderBookingEvent();
  offbkgeCommitModel: OffenderBookingEventCommitBean = new OffenderBookingEventCommitBean();
  offbkgeIndex: Number = 0;
  offbkgeInsertList: OffenderBookingEvent[] = [];
  offbkgeUpdatetList: OffenderBookingEvent[] = [];
  offbkgeDeleteList: OffenderBookingEvent[] = [];
  reportinData: OffenderResidence[] = [];
  reportinDataTemp: OffenderResidence[] = [];
  reportinModel: OffenderResidence = new OffenderResidence();
  reportinIndex: Number = 0;
  reportinInsertList: OffenderResidence[] = [];
  reportinUpdatetList: OffenderResidence[] = [];
  reportinDeleteList: OffenderResidence[] = [];
  syspflData: SystemProfiles[] = [];
  syspflDataTemp: SystemProfiles[] = [];
  syspflModel: SystemProfiles = new SystemProfiles();
  syspflIndex: Number = 0;
  syspflInsertList: SystemProfiles[] = [];
  syspflUpdatetList: SystemProfiles[] = [];
  syspflDeleteList: SystemProfiles[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: Boolean = true;
  intakefromLink: any;
  intaketoLink: any;
  intakeReasonLink: any;
  offBkgsColumnDef: any[];
  offBkgReadOnly: Boolean = false;
  offBkgsReadOnly: Boolean = false;
  offBkgeReadOnly: Boolean = false;
  reportInReadOnly: Boolean = false;
  sysPflReadOnly: Boolean = false;
  rgtoagylocRg: any[] = [];
  rgintaketypeRg: any[] = [];
  rgintakersnRg: any[] = [];
  rgfromagylocRg: any[] = [];
  type: string;
  reportinCommitModel: OffenderResidenceCommitBean = new OffenderResidenceCommitBean();
  intakeCase: string;
  bkgExistsFlag: string;
  nbtOffenderBookFlag: boolean;
  saveflagone: boolean;
  checkBoxData: string;
  trustCheckBoxData: string;
  checkBoxShows = false;
  checkoneshows = false;
  tableIndex = -1;
  validFlag: any;
  createBookingFlag: boolean;
  trustFlag: boolean;
  vHeaderBlockModelBean: VHeaderBlock2 = new VHeaderBlock2();
  autoPoplate: any;
  addFlag: boolean;
  flag: boolean;
  caseloadIdFlag: any;
  clearDisabled: boolean;
  clearFlagone: boolean;
  backDated: any;
  systemDate:any;
  tempbackDate:any;
  constructor(private ocdintakFactory: OcdintakService,
    public translateService: TranslateService, public sessionManager: UserSessionManager,
    private offenderSearchService: OffenderSearchService,
    private osiosearFactory: OsiosearService,public dialogService: DialogService) {
    this.offBkgsColumnDef = [];
  }
  onGridReady(event) {
  }
  trMsg(msg, astr?) {
    return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
  }
  ngOnInit() {
    this.getBackdatedAdmissionDate();
    this.addFlag = true;
    this.validFlag = false;
    this.reportinData = [];
    this.intakeCase = undefined;
    this.offbkgeModel.checkFlag = undefined;
    this.bkgExistsFlag = undefined;
    this.vheaderBlockModel = undefined;
    this.nbtOffenderBookFlag = true;
    this.saveflagone = true;
    this.clearFlagone = true;
    this.offBkgsColumnDef = [

      { fieldName: this.trMsg('ocdintak.booking'), field: 'bookingNo', editable: false, width: 150 },
      { fieldName: this.trMsg('common.date'), field: 'bookingBeginDate', editable: false, datatype: 'date', width: 150 },
      { fieldName: this.trMsg('system-profile.comm-agency'), field: 'intakeAgyLocId', editable: false, width: 150 },
      { fieldName: this.trMsg('ocdintak.bookstatus'), field: 'intakeStatus', editable: false, width: 150 },
      { fieldName: this.trMsg('common.staffname'), field: 'dspLastName', editable: false, width: 150 },
      { fieldName: this.trMsg('system-profile.inst-agency'), field: 'agyLocId', editable: false, width: 150 },
      { fieldName: this.trMsg('ocdintak.activestatus'), field: 'instStatus', editable: false, width: 150 },
      {
        fieldName: this.trMsg('ocdintak.bookingstatus'), field: 'bookingStatus', editable: false, width: 150,
        datatype: 'lov', domain: 'BOOK_STS'
      },
    ];
    if (this.offenderSearchService.selectedOffender && this.offenderSearchService.selectedOffender.offenderIdDisplay) {
      this.vheaderBlockModel = this.offenderSearchService.selectedOffender;
      this.osiosearFactory.selectOffender = undefined;
  } else if (this.osiosearFactory.selectOffender && this.osiosearFactory.selectOffender.offenderIdDisplay) {
      if (this.osiosearFactory.selectOffender.offenderId && this.osiosearFactory.selectOffender.offenderBookId
          && this.osiosearFactory.selectOffender.offenderBookId !== 0) {
        //     // this.caseloadIdValue();
        // // if (this.caseloadIdFlag) {
        //     this.vheaderBlockModel = this.osiosearFactory.selectOffender;
        //     this.offenderSearchService.selectedOffender = this.vheaderBlockModel;
        //     // this.caseloadIdFlag = false;
        // // }
        this.vheaderBlockModel = this.osiosearFactory.selectOffender;
        this.offenderSearchService.selectedOffender = this.vheaderBlockModel;
        this.osiosearFactory.selectOffender = undefined;
      } else {
          this.vheaderBlockModel = this.osiosearFactory.selectOffender;
          this.offenderSearchService.selectedOffender = this.vheaderBlockModel;
      }
  } else {
      this.show('common.pleasesearchforvalidoffender');
  }
    const checkResult = this.ocdintakFactory.wNewBlockInstanceintakeCase();
    checkResult.subscribe(result => {
      this.intakeCase = result;
    });
    const checkResultOne = this.ocdintakFactory.getProfileValueDisabled();
    checkResultOne.subscribe(resultOne => {
      if (resultOne && resultOne !== 1) {
        this.checkBoxShows = true;
        this.checkBoxData = resultOne;
      } else {
        this.checkBoxShows = false;
        this.checkBoxData = null;
      }

    });
    const checkResultTwo = this.ocdintakFactory.getProfileTrustValueDisabled();
    checkResultTwo.subscribe(resultTwo => {
      if (resultTwo && resultTwo !== 1) {
        this.checkoneshows = true;
        this.trustCheckBoxData = resultTwo;
      } else {
        this.checkoneshows = false;
        this.trustCheckBoxData = null;
      }

    });
  }
  /**
      * To display the messages
      */
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  onRowClickoffbkgs(event) {
    if (event) {
      this.reportinData = [];
      this.offbkgsModel = event;
      this.offbkgeModel = new OffenderBookingEvent();
      this.offbkgeModel.checkFlag = 'N';
      this.validFlag = false;
      if (this.offbkgsModel.bookingStatus === 'O') {
        this.nbtOffenderBookFlag = true;
        this.createBookingFlag = false;
      } else {
        this.nbtOffenderBookFlag = false;
      }
    } else {
      this.nbtOffenderBookFlag = true;
    }
  }
  onCheckBoxChange(event) {
    if (this.offbkgsData.length === 0) {
      this.offbkgeModel.dspOffenderBookId = null;
    } else if (this.offbkgsData.length > 0) {
      this.nbtOffenderBookFlag = false;
      this.createBookingFlag = false;
    }
    if (event && event.checked) {
      this.offbkgeModel.dspOffenderBookId = null;
    } else {
      this.offbkgeModel.dspOffenderBookId = this.offbkgsModel.bookingNo;
    }

  }

  onOffenderChange(offender) {
    this.vheaderBlockModel = offender;
    if (offender) {
      this.offbkgeModel.checkFlag = 'N'
      if (offender.rootOffenderId) {
        this.reportinData = [];
        this.offbkgsModel = new OffenderBookings();
        this.reportinModel = new OffenderResidence();
        this.offbkgeModel = new OffenderBookingEvent();
        this.intaketoLink = 'ocdintak/rgToAgyLocRecordGroup?caseloadId=' +
          this.sessionManager.currentCaseLoad + '&offenderId=' + this.vheaderBlockModel.rootOffenderId;
        this.intakefromLink = 'ocdintak/rgFromAgyLocRecordGroup';
        this.intakeReasonLink = 'ocdintak/rgIntakeRsnRecordGroup';
        this.offbkgsExecuteQuery();
        this.nbtOffenderBookFlag = false;
        this.bkgExistsFlag = undefined;
        this.bkgExistFlag();
        this.validFlag = false;
      }
      this.flag = true;
    } else {
      this.offenderRemoved();
    }
  }
  bkgExistFlag() {
    const offbkgResult = this.ocdintakFactory.intakeCaseactBkgExistFlag(this.vheaderBlockModel);
    offbkgResult.subscribe(data => {
      if (data !== '2') {
        this.bkgExistsFlag = data;
      } else {
        this.bkgExistsFlag = undefined;
      }
    });
  }

  offbkgsExecuteQuery() {
    this.offbkgsModel = new OffenderBookings();
    this.offbkgsModel.rootOffenderId = this.vheaderBlockModel.rootOffenderId;
    this.offbkgsModel.offenderId = this.vheaderBlockModel.offenderId;
    this.offbkgeModel.checkFlag = 'N';
    const offbkgsResult = this.ocdintakFactory.offBkgsExecuteQuery(this.offbkgsModel);
    offbkgsResult.subscribe(offbkgsResultList => {
      if (offbkgsResultList.length === 0) {
        this.offbkgsData = [];
        this.createBookingFlag = true;
        this.nbtOffenderBookFlag = true;
      }
      else {
        if (this.vheaderBlockModel) {
          this.offbkgsData = offbkgsResultList;
          this.offbkgsModel = offbkgsResultList[0];
          this.offbkgeModel.checkFlag = 'N';
          this.tableIndex = 0;
          this.validFlag = false;
          this.clearDisabled = false;
        }
        else {
          this.offenderRemoved();
        }
      }
    });
  }

  offbkgeExecuteQuery() {
    this.offbkgsModel.caseloadId = this.vheaderBlockModel.caseLoadId;
    const offbkgeResult = this.ocdintakFactory.offBkgeExecuteQuery(this.offbkgeModel);
    offbkgeResult.subscribe(offbkgeResultList => {
      if (offbkgeResultList.length === 0) {
        this.offbkgeData = [];
      } else {
      }
    });
  }
  populateDetails() {
    if (!this.vheaderBlockModel) {
      return;
    }
    if (this.offbkgeModel.eventDate && this.offbkgeModel.eventTime) {
      return;
    }

    if (this.intakeCase === 'SINGLE') {
      if (this.bkgExistsFlag === 'Y') {
        this.show(this.translateService.translate('ocdintak.anewcontactmaynotbecreated'));
        this.nbtOffenderBookFlag = true;
        this.validFlag = true;
        this.offbkgeModel = new OffenderBookingEvent();
        return;
      } else {
        if (!this.sessionManager.currentCaseLoadType) {
          this.show(this.translateService.translate('ocdintak.anewcontactmaynotbecreatedcaseloadtype'));
          this.validFlag = true;
          this.offbkgeModel = new OffenderBookingEvent();
          return;
        } else if (this.sessionManager.currentCaseLoadType === 'INST') {
          this.show(this.translateService.translate('ocdintak.anewcontactmaynotbecreatedcaseloadtypeinst'));
          this.validFlag = true;
          this.offbkgeModel = new OffenderBookingEvent();
          return;
        } else {
          const resultValue = this.ocdintakFactory.checkForActiveBooking(this.vheaderBlockModel);
          resultValue.subscribe(data => {
            if (data === 1) {
              if (this.offbkgsModel.activeFlag === 'N') {
                this.show(this.translateService.translate('ocdintak.offenderhasanotheropenbooking'));
                this.validFlag = true;
                this.offbkgeModel = new OffenderBookingEvent();
                return;
              }
            }
          });
          if (this.offbkgeModel.checkFlag === 'N') {
            this.setNewContactFlag();
          }
          this.getDefaultIntakeValues();
        }
      }
    } else if (this.intakeCase === 'MULTIPLE') {
      const resultValue = this.ocdintakFactory.intakeCaseMultiple(this.vheaderBlockModel);
      resultValue.subscribe(data => {
        if (data === 1) {
          this.show(this.translateService.translate('ocdintak.anewcontactmaynotbecreatedcaseload'));
          this.validFlag = true;
          this.offbkgeModel = new OffenderBookingEvent();
          return;
        } else if (data === 2) {
          this.show(this.translateService.translate('ocdintak.anewcontactmaynotbecreatedoffender'));
          this.validFlag = true;
          this.offbkgeModel = new OffenderBookingEvent();
          return;
        } else {
          if (this.offbkgeModel.checkFlag === 'N') {
            this.setNewContactFlag();
          }
          this.offbkgeModel.eventDate = DateFormat.getDate();
          this.offbkgeModel.eventTime = DateFormat.getDate();
          this.offbkgeModel.bookingEventCode = 'INTAKE';
          this.offbkgeModel.reasonCode = 'INTAKE';
          const results = this.ocdintakFactory.getDspDescription();
          results.subscribe(dataVal => {
            if (dataVal === undefined) {
            } else {
              this.offbkgeModel.intakefrom = dataVal.intakefrom;
            }
          });
        }
      });
    }
  }
  reportPopulateDetails() {
    if (this.reportinModel.movedOutDate && this.reportinModel.movedOutTime) {
      this.addFlag = false;
    } else {
      this.addFlag = true;
    }
    if (!this.vheaderBlockModel) {
      return;
    }
    if (!this.offbkgeModel.toAgyLocId) {
      this.show(this.translateService.translate('ocdintak.newintakeinformation'));
      return;
    }
    if (this.reportinModel.movedOutDate && (this.reportinModel.movedOutDate < DateFormat.getDate())) {
      const Date = DateFormat.getDate().setMonth(DateFormat.getDate().getMonth() - 3);
      if (this.reportinModel.movedOutDate < DateFormat.getDate(Date)) {
        this.show('ocdintak.datecannotbebackdatedmorethanmonthsfromcurrentdate', 'warn');
        return;
      }
    }
  }
  getDefaultIntakeValues() {
    const results = this.ocdintakFactory.getDefaultIntakeValues('INTAKE_TYPE', 'INTAKE_RSN');
    results.subscribe(dataVal => {
      if (dataVal === undefined) {

      } else {
        this.offbkgeModel.reasonCode = dataVal.reasonCode;
        this.offbkgeModel.intakefrom = dataVal.intakefrom;
      }
    });
  }
  getTrustValues() {
    const results = this.ocdintakFactory.getTrustValues('CLIENT', 'INTAKE_TRUST');
    results.subscribe(trustval => {
      if (trustval === undefined) {
      } else {
        this.offbkgeModel.createTrustAccountFlag = trustval.createTrustAccountFlag;
      }
    })
  }
  setNewContactFlag() {
    const results = this.ocdintakFactory.setNewcontactFlag(this.offbkgsModel);
    results.subscribe(data => {
      if (data === undefined) {

      } else {
        this.offbkgeModel = data;
        if (this.offbkgeModel.nbtOffenderBookId === 'Y') {
          this.createBookingFlag = true;
        } else {
          this.createBookingFlag = false;
        }
        for (let i = 0; i < this.offbkgsData.length; i++) {
          if (this.offbkgsData[0].bookingStatus === 'C') {
            this.createBookingFlag = true;
          }
        }
        this.offbkgeModel.eventDate = DateFormat.getDate();
        this.offbkgeModel.eventTime = DateFormat.getDate();
        this.offbkgeModel.bookingEventCode = 'INTAKE';
        this.getDefaultIntakeValues();
      }
    });
  }
  intakeToChangeEvent(event) {
    if (!this.vheaderBlockModel) {
      return;
    }
    if (event) {
      this.offbkgeModel.toAgyLocId = event;
    }
  }
  /**
     *  This function is used to enable/disable next button
     */
  get reportFlag() {
    if (this.vheaderBlockModel === undefined || !(this.offbkgeModel.toAgyLocId || this.offbkgeModel.eventDate
      || this.offbkgeModel.eventTime || this.offbkgeModel.intaketo || this.offbkgeModel.intakefrom
      || this.offbkgeModel.createBookingFlag || this.offbkgeModel.commentText || this.offbkgeModel.reasonCode ||
      this.offbkgeModel.dspOffenderBookId)) {

      return false;
    } else if (this.reportinModel.movedOutDate) {
      if (this.reportinModel.movedOutDate && (this.reportinModel.movedOutDate < DateFormat.getDate())) {
        const Date = DateFormat.getDate().setMonth(DateFormat.getDate().getMonth() - 3);
        if (this.reportinModel.movedOutDate < DateFormat.getDate(Date)) {
          this.show('ocdintak.datecannotbebackdatedmorethanmonthsfromcurrentdate', 'warn');
          return false;
        }
      }
    } else {
      return true;
    }
  }
  /**
     *  This function is used to enable/disable next button
     */
  get saveFlag() {
    if (this.vheaderBlockModel && this.offbkgeModel.eventDate
      && this.offbkgeModel.eventTime && this.offbkgeModel.intaketo && this.offbkgeModel.intakefrom
      && this.offbkgeModel.reasonCode && this.offbkgeModel.intakeReason) {
      return false;
    } else {
      return true;
    }
  }
  get clearFlag() {
    if (this.vheaderBlockModel  && this.offbkgeModel.eventDate
      || this.offbkgeModel.eventTime || this.offbkgeModel.intaketo || this.offbkgeModel.intakefrom
      || this.offbkgeModel.reasonCode || this.offbkgeModel.intakeReason) {
      return false;
    } else {
      return true;
    }
  }
  onStatusBlur() {
    if (!this.offbkgeModel.reasonCode) {
    this.offbkgeModel.reasonCode = this.offbkgeModel.reasonCode === '' ? undefined : '';
    }
    }
    onStatusBlurOne() {
      if (!this.offbkgeModel.intakefrom) {
      this.offbkgeModel.intakefrom = this.offbkgeModel.intakefrom === '' ? undefined : '';
      }
      }
      onStatusBlurTwo() {
        if (!this.offbkgeModel.intaketo) {
        this.offbkgeModel.intaketo = this.offbkgeModel.intaketo === '' ? undefined : '';
        }
        }
        onStatusBlurThree() {
          if (!this.offbkgeModel.intakeReason) {
          this.offbkgeModel.intakeReason = this.offbkgeModel.intakeReason === '' ? undefined : '';
          }
          }
    isInsertable(date?) {
      if (this.offbkgeModel.eventTime || this.offbkgeModel.reasonCode || this.offbkgeModel.intakefrom
          || this.offbkgeModel.intakeReason) {
          this.clearDisabled = false;
      } else {
          this.clearDisabled = true;
      }
      if (date) {
          this.clearDisabled = false;
      }
  }
  /**
     *  This function is used to enable/disable next button
     */
  get intakeFlag() {
    if (this.vheaderBlockModel === undefined) {
      return true;
    } else if (this.validFlag) {
      return true;
    } else {
      return false;
    }
  }
  reasonChangeEvent(event) {
    if (event && event.code) {
      if (this.autoPoplate) {
        this.autoPoplate = false;
        setTimeout(ele => {
          this.offbkgeModel.reasonCode = null;
        }, 5);
        return;
      }
    }
  }
  Clear() {
    this.offbkgeModel = new OffenderBookingEvent();
    this.reportinModel = new OffenderResidence();
  }
 /* ocdintakAddNewRecored() {
    if (!this.reportinModel.movedOutDate) {
      this.show('ocdintak.reportindatemustbeentered', 'warn');
      return;
    }
    if (!this.reportinModel.movedOutTime) {
      this.show('common.timemustbeentered', 'warn');
      return;
    }
    if (DateFormat.compareDate(this.offbkgeModel.eventDate, DateFormat.getDate()) === 1) {
      this.show('common.datemustbelessthanorequaltocurrentdate', 'warn');
      return;
    }
    this.reportinData.push(this.reportinModel);
    this.reportinModel = new OffenderResidence();
  }*/

  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocdintakSaveoffbkgeForm() {
    this.offbkgeModel.offenderId = this.offbkgsModel.offenderId;
    this.offbkgeModel.rootOffenderId = this.offbkgsModel.rootOffenderId;
    this.offbkgeModel.offenderBookId = this.offbkgsModel.offenderBookId;
    this.offbkgeModel.caseloadId = this.sessionManager.currentCaseLoad;
    this.offbkgeModel.nbtOffenderBookId = this.createBookingFlag ? 'Y' : 'N';
    this.offbkgeModel.createBookingFlag = this.trustFlag ? 'Y' : 'N';
     this.offbkgeModel.createDatetime = DateFormat.getDate();
      this.offbkgeModel.createUserId = this.sessionManager.getId();
    this.offbkgeInsertList = [];
    if (this.offbkgeModel.eventDate) {
      const checkprvDate = this.ocdintakFactory.checkPrevBooking(this.offbkgsModel);
      checkprvDate.subscribe(data => {
        if (data.eventDate) {
          this.show('ocdintak.youcannotenterdatethatearlierthanthedateofthelatestbooking', 'warn');
        } else {

        }
      });
    }
    this.offbkgeInsertList.push(this.offbkgeModel);
    this.offbkgeCommitModel.insertList = [];
    if (this.offbkgeInsertList.length > 0) {
      for (let i = 0; i < this.offbkgeInsertList.length; i++) {
        this.offbkgeCommitModel.insertList = this.offbkgeInsertList;
        if (!this.offbkgeInsertList[i].eventDate) {
          this.show('common.datemustbeentereddate');
          return;
        }
        if (DateFormat.compareDate(this.offbkgeModel.eventDate, DateFormat.getDate()) === 1) {
          this.show('common.datemustbelessthanorequaltocurrentdate', 'warn');
          return;
        }
        if (!this.offbkgeInsertList[i].eventTime) {
          this.show('common.timemustbeentered');
          return;
        }
        if (!this.offbkgeInsertList[i].reasonCode) {
          this.show('ocdintak.typemustbeentered');
          return;
        }
        if (!this.offbkgeInsertList[i].intakefrom) {
          this.show('ocdintak.intakefrommustbeentered');
          return;
        }
        if (!this.offbkgeInsertList[i].intaketo) {
          this.show('ocdintak.intaketomustbeentered');
          return;
        }

        if (!this.offbkgeInsertList[i].intakeReason) {
          this.show('common.reasonmustbeentered');
          return;
        }

      }
    }
    if (this.reportinModel.movedOutDate || this.reportinModel.movedOutTime) {
      if (this.reportinModel.movedOutDate && this.reportinModel.movedOutTime) {
      this.reportinModel.movedOutTime = TimeFormat.parse(TimeFormat.format(this.reportinModel.movedOutTime),
      this.reportinModel.movedOutDate);
      }
      this.reportinData.push(this.reportinModel);
    }
    if (this.reportinData.length > 0) {
      for (let i = 0; i < this.reportinData.length; i++) {
        if (!this.reportinData[i].movedOutDate) {
          this.show('ocdintak.reportindatemustbeentered');
          return;
        }
        if (!this.reportinData[i].movedOutTime) {
          this.show('common.timemustbeentered');
          return;
        }
        this.reportinData[i].offenderBookId = this.offbkgeModel.offenderBookId;
        this.reportinData[i].createAgyLocId = this.offbkgeModel.toAgyLocId;
        this.reportinData[i].rootOffenderId = this.offbkgeModel.rootOffenderId;
      }
      this.offbkgeCommitModel.reportInsertList = [];
      this.offbkgeCommitModel.reportInsertList = this.reportinData;
    }

    if (this.backDated) {
      this.tempbackDate=new Date(this.backDated)
      this.systemDate=new Date();
      let datediff=Math.floor(this.systemDate-this.tempbackDate);
      let totaldays=Math.round(((datediff)/1000/60/60/24));
      
      if (DateFormat.compareDateTime(DateFormat.getDate(this.offbkgeModel.eventDate),
        DateFormat.getDate(this.backDated)) === -1) {
        const data = {
          label: this.translateService.translate('ocdintak.intakecanonlybebackdated')+' '+totaldays+' '+this.translateService.translate('ocdintak.earlierthansystemdate'), yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', data, 50).subscribe(result => {
          if (result) {
            this.offBkgeFinalCommit();
          } else {
            return;
          }
        });
      } else {
        this.offBkgeFinalCommit();
      }
    } else {
      this.offBkgeFinalCommit();
    }
  }
  offBkgeFinalCommit(){
    const offbkgeSaveData = this.ocdintakFactory.offBkgeCommit(this.offbkgeCommitModel);
    offbkgeSaveData.subscribe(data => {
      if (data === 1) {
        const checkResult = this.ocdintakFactory.wNewBlockInstanceintakeCase();
        checkResult.subscribe(result => {
          this.intakeCase = result;
        });
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.myResetVar = false;
        this.offbkgeModel = new OffenderBookingEvent();
        this.reportinModel = new OffenderResidence();
        setTimeout(() => {
          this.myResetVar = true;
        },0);
        this.offbkgsExecuteQuery();
        this.vHeaderBlockModelBean = new VHeaderBlock2();
        this.vHeaderBlockModelBean.offenderIdDisplay = this.vheaderBlockModel.offenderIdDisplay;
        this.vHeaderBlockModelBean.agyLocId = this.sessionManager.currentCaseLoad;
        this.vHeaderBlockModelBean.agyLocType = this.sessionManager.currentCaseLoadType;
        const searchResult = this.osiosearFactory.
          offbkgGlobalQuery(this.vHeaderBlockModelBean);
        searchResult.subscribe(vhbList => {
          if (vhbList.length > 0) {
            this.vheaderBlockModel = vhbList[0];
            this.offenderSearchService.selectedOffender = this.vheaderBlockModel;
          }
        });
        return;
      } else if (data === 2) {
        this.show('ocdintak.nosetupfoundintransactionoperationtableforthismodule');
        return;

      } else {
        this.show('common.addupdateremoverecordfailed');
        return;
      }
    });
  }
  reportinExecuteQuery() {
    const reportinResult = this.ocdintakFactory.reportInExecuteQuery(this.reportinModel);
    reportinResult.subscribe(reportinResultList => {
      if (reportinResultList.length === 0) {
        this.reportinData = [];
      } else {
        this.reportinData = reportinResultList;
        this.reportinModel = reportinResultList[0];
      }
      this.saveflagone = true;
    });
  }

  get reportinFlag() {
    if (this.vheaderBlockModel === undefined) {
      return true;
    } else if (!this.offbkgeModel.toAgyLocId) {
      return true;
    } else {
      return false;
    }
  }


  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocdintakSavereportinForm() {
    if (!this.reportinModel.movedOutDate && !this.reportinModel.movedOutTime) {
      this.reportinData.push(this.reportinModel);
    }
    this.reportinInsertList = [];
    this.reportinInsertList = this.reportinData;
    this.reportinCommitModel.insertList = [];
    if (this.reportinInsertList.length > 0) {
      for (let i = 0; i < this.reportinInsertList.length; i++) {
        if (!this.reportinInsertList[i].movedOutDate) {
          this.show('ocdintak.reportindatemustbeentered');
          return;
        }
        if (!this.reportinInsertList[i].movedOutTime) {
          this.show('common.timemustbeentered');
          return;
        }
        this.reportinInsertList[i].offenderBookId = this.offbkgeModel.offenderBookId;
        this.reportinInsertList[i].createAgyLocId = this.offbkgeModel.toAgyLocId;
      }
    }
    this.reportinCommitModel.insertList = this.reportinInsertList;
    const reportinSaveData = this.ocdintakFactory.reportInCommit(this.reportinCommitModel);
    reportinSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'info';
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.reportinData = [];
        this.reportinModel = new OffenderResidence();
      } else {
        this.type = 'warn';
        this.show('common.addupdateremoverecordfailed', 'warn');
      }
    });
  }
  getBackdatedAdmissionDate() {
    const serviceObj = this.ocdintakFactory.getBackdatedAdmissionDate();
    serviceObj.subscribe(resultOne => {
      if (resultOne) {
        this.backDated = resultOne;
      } else {
        this.backDated =  undefined;
      }

    });
  }
  ngOnDestroy() {
      if (this.vheaderBlockModel && !this.vheaderBlockModel.bookingNo) {
        this.offenderSearchService.selectedOffender = undefined;
      }
  }

  offenderRemoved() {
    this.offbkgsData = [];
    this.nbtOffenderBookFlag = true;
    this.offbkgsModel = new OffenderBookings();
    this.offbkgeModel = new OffenderBookingEvent();
    this.reportinModel = new OffenderResidence();
    this.reportinData = [];
    this.createBookingFlag = false;
    this.addFlag = true;
    this.flag = false;
  }

}
