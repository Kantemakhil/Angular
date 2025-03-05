import {
  Component, OnInit
} from '@angular/core';
import { OcdcloseService } from '@cm/intakeclosure//service/ocdclose.service';
import { OffenderBookingEvent } from '@cm/intakeclosure/beans/OffenderBookingEvent';
import { OffenderBookingEventCommitBean } from '@cm/intakeclosure/beans/OffenderBookingEventCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
//  import required bean declarations

@Component({
  selector: 'app-ocdclose',
  templateUrl: './ocdclose.component.html'
})

export class OcdcloseComponent implements OnInit {
  tagTerminationCount = 0;
  vHeaderBlockModelBean: VHeaderBlock = new VHeaderBlock();
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  obeData: OffenderBookingEvent[] = [];
  obeDataTemp: OffenderBookingEvent[] = [];
  obeModel: OffenderBookingEvent = new OffenderBookingEvent();
  obeventModel: OffenderBookingEvent = new OffenderBookingEvent();
  obeIndex = 0;
  obeInsertList: OffenderBookingEvent[] = [];
  obeUpdateList: OffenderBookingEvent[] = [];
  obeDeleteList: OffenderBookingEvent[] = [];
  obeCommitModel: OffenderBookingEventCommitBean = new OffenderBookingEventCommitBean();
  minDate: any;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable = true;
  obeReadOnly = false;
  navigationdummyRg: any[] = [];
  cgfkObedspdescriptionRg: any[] = [];
  cgfkObedspdescription2Rg: any[] = [];
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  agyLocLink: any;
  biginDate: Date;
  datemsg: any;
  agencyTitles = {'description': this.translateService.translate('system-profile.comm-agency'),
   'code': this.translateService.translate('common.code')
   };
   obeventBean: OffenderBookingEvent = new OffenderBookingEvent();
  constructor(private ocdcloseFactory: OcdcloseService, public translateService: TranslateService,
    public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService,
    public osiosearFactory: OsiosearService, public dialogService: DialogService) {
  }
  ngOnInit() {
    this.agyLocLink = undefined;
    this.obeventModel = new OffenderBookingEvent();
    this.obeModel = new OffenderBookingEvent();
    this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
      this.show('common.pleasesearchforvalidoffender');
    } else {
      this.agyLocLink = 'ocdclose/agencyLocationRecordGroup?offenderBookId=' +
        this.vHeaderBlockModel.offenderBookId + '&caseloadId=' + this.sessionManager.currentCaseLoad;
    }
    if (!this.obeModel.toAgyLocId) {
      const toAgyLocId = this.obeModel.toAgyLocId === undefined ? '' : undefined;
      this.obeModel.toAgyLocId = toAgyLocId;
      }
      if (!this.obeModel.reasonCode) {
      const reasonCode = this.obeModel.reasonCode === undefined ? '' : undefined;
      this.obeModel.reasonCode = reasonCode;
      }
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
  /**
   *  This function will be executed when we select the offender in header block
   */
  onOffenderChange(offender) {
    this.vHeaderBlockModel = offender;
    if (offender) {
      this.agyLocLink = 'ocdclose/agencyLocationRecordGroup?offenderBookId=' +
        this.vHeaderBlockModel.offenderBookId + '&caseloadId=' + this.sessionManager.currentCaseLoad;
      if (this.vHeaderBlockModel.offenderBookId) {
        this.getBookingBiginDate();
        this.tagTerminationChkTasks();
      }
      this.obeModel = new OffenderBookingEvent();
      this.obeModel.checkFlag = this.vHeaderBlockModel.activeFlag;
      if (!this.obeModel.toAgyLocId) {
        const toAgyLocId = this.obeModel.toAgyLocId === undefined ? '' : undefined;
        this.obeModel.toAgyLocId = toAgyLocId;
        }
        if (!this.obeModel.reasonCode) {
        const reasonCode = this.obeModel.reasonCode === undefined ? '' : undefined;
        this.obeModel.reasonCode = reasonCode;
        }
    } else {
      this.obeModel = new OffenderBookingEvent();
      this.obeventModel = new OffenderBookingEvent();
      if (!this.obeModel.toAgyLocId) {
        const toAgyLocId = this.obeModel.toAgyLocId === undefined ? '' : undefined;
        this.obeModel.toAgyLocId = toAgyLocId;
        }
        if (!this.obeModel.reasonCode) {
        const reasonCode = this.obeModel.reasonCode === undefined ? '' : undefined;
        this.obeModel.reasonCode = reasonCode;
        }
    }
  }
  /**
     *  This function is used to enable/disable save button
     */
  get saveFlag() {
    if (this.vHeaderBlockModel === undefined) {
      return true;
    } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.communityActiveFlag === 'N') {
      return true;
    } else {
      return false;
    }
  }
   /**
     *  This function is used to enable/disable save button
     */
    get clearFlag() {
      if (this.vHeaderBlockModel === undefined) {
        return true;
      } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.communityActiveFlag === 'N') {
        return true;
      } else if (!this.obeModel.eventDate && !this.obeModel.eventTime && !this.obeModel.toAgyLocId
        && !this.obeModel.reasonCode && !this.obeModel.commentText) {
          return true;
      } else {
        return false;
      }
    }
    clearForm() {
      this.obeModel = new OffenderBookingEvent();
    }
  /**
   *  This function will be executed when we click on Date/Time
   */
  populateDateTime(event?) {
    if (this.vHeaderBlockModel.communityActiveFlag === 'N') {
      return;
    }
    if (!this.obeModel.eventDate) {
      this.obeModel.eventDate = DateFormat.getDate();
    }
    if (!this.obeModel.eventTime) {
      this.obeModel.eventTime = DateFormat.getDate();
    }
  }
  /**
   *  This function will be executed to validate date value
   */
  getBookingBiginDate() {
    this.obeventModel = new OffenderBookingEvent();
    const getDate = this.ocdcloseFactory.getBokingBeginDate(this.vHeaderBlockModel);
    getDate.subscribe(data => {
      if (data.eventDate !== undefined) {
        this.obeventModel = data;
      } else {
        this.obeventModel = new OffenderBookingEvent();
      }
    });
  }
  tagTerminationChkTasks() {
    this.obeventBean = new OffenderBookingEvent();
    this.obeventBean.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    const getDate = this.ocdcloseFactory.tagTerminationChkTasks(this.obeventBean);
    getDate.subscribe(data => {
      if (data === 1) {
        this.tagTerminationCount = data;
      } else {
        this.tagTerminationCount = 0;
      }
    });
  }
  /**
   *  This function will be executed when we click on Fields
   */
  onKeyPressEvent() {
    if (this.vHeaderBlockModel.communityActiveFlag === 'N') {
      this.show(this.translateService.translate('ocdclose.youcannotcreaterecords'));
      this.obeModel.reasonCode = undefined;
      this.obeModel.toAgyLocId = undefined;
      this.obeModel = new OffenderBookingEvent();
      return;
    }
  }
  /**
     *  This function will be executed when we click on save button
     */
  obeSaveForm(date?) {
    if (date) {
      if (date.lastValue === '0_/__/____') {
          this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
          return;
      }
      if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
          this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
          return;
      }
  }
    this.obeModel.checkFlag = this.vHeaderBlockModel.activeFlag;
    if (!this.obeModel.eventDate) {
      this.show(this.translateService.translate('common.datemustbeentereddate'), 'warn');
    }
    if ((DateFormat.compareDate(this.obeModel.eventDate, DateFormat.getDate())) === 1) {
      this.obeModel.eventDate = DateFormat.getDate();
      this.show(this.translateService.translate('ocdclose.dateandtime'), 'warn');
      return;
    }
    if (this.obeventModel.eventDate) {
      if ((DateFormat.compareDate(this.obeModel.eventDate, DateFormat.getDate(this.obeventModel.eventDate))) === -1) {
        let msg = this.translateService.translate('ocdclose.eventdatecannotbeearlier');
        this.datemsg = DateFormat.format(this.obeventModel.eventDate);
        msg = String(msg).replace('%eventDate%', this.datemsg);
        this.show(msg);
        return;
      }
    }
    if (!this.obeModel.eventTime) {
      this.show(this.translateService.translate('common.timemustbeentered'), 'warn');
      return;
    }
    if (!this.obeModel.toAgyLocId) {
      this.show(this.translateService.translate('ocdclose.agencymustbeentered').replace('%location%', this.translateService.translate('system-profile.comm-agency')));
      return;
    }
    if (!this.obeModel.reasonCode) {
      this.show(this.translateService.translate('common.reasonmustbeentered'), 'warn');
      return;
    }
    this.obeModel.checkFlag = this.vHeaderBlockModel.activeFlag;
    this.obeModel.creationDate = DateFormat.getDate();
    this.obeModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    this.chkForDependencies();
  }
  /**
  *  This function will be check the offender dependencies on Legals and Court reports when commit event is fired
  */
  chkForDependencies() {
    this.ocdcloseFactory.isActiveOrderPresent(this.vHeaderBlockModel.offenderBookId).subscribe( data => {
      if(data){
        let dlgData = {
          heading: this.translateService.translate('ocdclose.warning'),
          label: this.translateService.translate('ocdclose.activeordersreportsarepresent'),
          yesBtn: true, noBtn: true, yesLabel: this.translateService.translate('ocdclose.proceed'), noLabel: this.translateService.translate('ocdclose.stop')
      };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50).subscribe(result => {
          if(result){
            this.ocdcloseSaveobeForm();
          }
        });
      } else {
        this.ocdcloseSaveobeForm();
      }
    });
  }
  /**
  *  This function will be executed when commit event is
  * fired
  */
  ocdcloseSaveobeForm() {
    this.obeInsertList = [];
    this.obeCommitModel.insertList = [];
    this.obeCommitModel.updateList = [];
    this.obeCommitModel.deleteList = [];
    this.obeModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    this.obeModel.caseloadId = this.sessionManager.currentCaseLoad;
    this.obeModel.creationDate = DateFormat.getDate();
    this.obeModel.bookingEventCode = 'CAC';
    this.obeModel.offenderId = this.vHeaderBlockModel.offenderId;
    this.obeModel.sealFlag = undefined;
    this.obeModel.offenderId = this.vHeaderBlockModel.offenderId;
    this.obeModel.createUserId = this.sessionManager.getId();
    if(this.vHeaderBlockModel.trustAccount) {
      this.obeModel.trustFlag = 'Y';
    } else {
      this.obeModel.trustFlag = 'N';
    }
    this.obeInsertList.push(this.obeModel);
    this.obeCommitModel.insertList = this.obeInsertList;
    const obeSaveData = this.ocdcloseFactory.obeCommit(this.obeCommitModel);
    obeSaveData.subscribe(data => {
      if (data === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.obeModel = new OffenderBookingEvent();
        this.obeventModel = new OffenderBookingEvent();
        this.vHeaderBlockModelBean = new VHeaderBlock();
        this.vHeaderBlockModelBean.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
        this.vHeaderBlockModelBean.agyLocId = this.sessionManager.currentCaseLoad;
        this.vHeaderBlockModelBean.agyLocType = this.sessionManager.currentCaseLoadType;
        const searchResult = this.osiosearFactory.
          offbkgGlobalQuery(this.vHeaderBlockModelBean);
        searchResult.subscribe(vhbList => {
          if (vhbList.length > 0) {
            this.vHeaderBlockModel = vhbList[0];
            this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
          }
        });
      } else if (data === 5) {
        const msg = this.translateService.translate('ocdclose.youcannotclosethiscommunitybooking');
        const dataObj = {
          label: msg, yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok')
        };
        // this.show(this.translateService.translate('ocdclose.thereareoutstandingtasks'), 'warn');
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dataObj, 30).subscribe(result => {
          if (result) {
            if(this.tagTerminationCount === 1) {
              const msgVal = this.translateService.translate('ocdclose.thereareoutstandingtasks');
              const dataObjVal = {
                label: msgVal, yesBtn: true, noBtn: true
              };
              this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dataObjVal, 30).subscribe(resultVal => {
                this.obeModel.eventDate = undefined;
                this.obeModel.eventTime = undefined;
                this.obeModel.toAgyLocId = undefined;
                this.obeModel.reasonCode = undefined;
                this.obeModel.commentText = undefined;
                });
            } else  {
              this.obeModel.eventDate = undefined;
              this.obeModel.eventTime = undefined;
              this.obeModel.toAgyLocId = undefined;
              this.obeModel.reasonCode = undefined;
              this.obeModel.commentText = undefined;
            }
           
          }
          });
        
                  return;
        // return;
      } else if (data === 3) {
        const msg = this.translateService.translate('ocdclose.thereareoutstandingtasks');
        const dataObj = {
          label: msg, yesBtn: true, noBtn: true
        };
        // this.show(this.translateService.translate('ocdclose.thereareoutstandingtasks'), 'warn');
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dataObj, 30).subscribe(result => {
          if (result) {
             this.obeModel.tempValue = 'Y';
            this.ocdcloseSaveobeFormData();
          }
          });
                  return;
      } else if (data === 4) {
        const message = this.translateService.translate('ocdclose.youcannotclosethiscontact');
        const dataObject = {
          label: message, yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok')
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dataObject, 30).subscribe(result => {
          if (result) {
            if(this.tagTerminationCount === 1) {
              const msgVal = this.translateService.translate('ocdclose.thereareoutstandingtasks');
              const dataObjVal = {
                label: msgVal, yesBtn: true, noBtn: true
              };
              this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dataObjVal, 30).subscribe(resultVal => {
                this.obeModel.eventDate = undefined;
                this.obeModel.eventTime = undefined;
                this.obeModel.toAgyLocId = undefined;
                this.obeModel.reasonCode = undefined;
                this.obeModel.commentText = undefined;
                });
            } else  {
              this.obeModel.eventDate = undefined;
              this.obeModel.eventTime = undefined;
              this.obeModel.toAgyLocId = undefined;
              this.obeModel.reasonCode = undefined;
              this.obeModel.commentText = undefined;
            }
           
          }

          });
        // this.show(this.translateService.translate('ocdclose.youcannotclosethiscontact'), 'warn');
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
        return;
      }
    });
  }

/**
  *  This function will be executed when commit event is
  * fired
  */
 ocdcloseSaveobeFormData() {
  this.obeInsertList = [];
  this.obeCommitModel.insertList = [];
  this.obeCommitModel.updateList = [];
  this.obeCommitModel.deleteList = [];
  this.obeModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
  this.obeModel.caseloadId = this.sessionManager.currentCaseLoad;
  this.obeModel.creationDate = DateFormat.getDate();
  this.obeModel.bookingEventCode = 'CAC';
  this.obeModel.offenderId = this.vHeaderBlockModel.offenderId;
  this.obeModel.createUserId = this.sessionManager.getId();
  if(this.vHeaderBlockModel.trustAccount) {
    this.obeModel.trustFlag = 'Y';
  } else {
    this.obeModel.trustFlag = 'N';
  }
  this.obeInsertList.push(this.obeModel);
  this.obeCommitModel.insertList = this.obeInsertList;
  const obeSaveData = this.ocdcloseFactory.obeCommit(this.obeCommitModel);
  obeSaveData.subscribe(data => {
    if (data === 1) {
      this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
      this.obeModel = new OffenderBookingEvent();
      this.obeventModel = new OffenderBookingEvent();
      this.vHeaderBlockModelBean = new VHeaderBlock();
      this.vHeaderBlockModelBean.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
      this.vHeaderBlockModelBean.agyLocId = this.sessionManager.currentCaseLoad;
      this.vHeaderBlockModelBean.agyLocType = this.sessionManager.currentCaseLoadType;
      const searchResult = this.osiosearFactory.
        offbkgGlobalQuery(this.vHeaderBlockModelBean);
      searchResult.subscribe(vhbList => {
        if (vhbList.length > 0) {
          this.vHeaderBlockModel = vhbList[0];
          this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
        }
      });
    }
  });
  }


  /**
    *  This function is used to enable/disable text button
    */
  get readonlyflag() {
    if (this.vHeaderBlockModel === undefined) {
      return true;
    } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.communityActiveFlag === 'N') {
      return true;
    } else {
      return false;
    }
  }
  agencyBlur() {
    if (!this.obeModel.toAgyLocId) {
      this.obeModel.toAgyLocId = this.obeModel.toAgyLocId === '' ? undefined : '';
    }
  }
  reasonBlur() {
    if (!this.obeModel.reasonCode) {
      this.obeModel.reasonCode = this.obeModel.reasonCode === '' ? undefined : '';
    }
  }
}
