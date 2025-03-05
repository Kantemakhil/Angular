
import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdsupstService } from '../service/ocdsupst.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderBookingAgyLocs } from '@cmintakeclosureaddremoveoffices/OffenderBookingAgyLocs';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OffSupervisionStsHty } from '@cm/intakeclosure/beans/OffSupervisionStsHty';
import { OffSupervisionStsHtyCommitBean } from '@cm/intakeclosure/beans/OffSupervisionStsHtyCommitBean';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { VHeaderBlock2 } from '@common/beans/VHeaderBlock2';
@Component({
  selector: 'app-ocdsupst',
  templateUrl: './ocdsupst.component.html'
})
export class OcdsupstComponent implements OnInit {
  checkFlag = true;
  supHtyDataModel: OffSupervisionStsHty = new OffSupervisionStsHty();
  intakeReviewCount = 0;
  extSave = false;
  gridInsBtn = false;
  insertFlag = false;
  @ViewChild('grid', { static: true }) grid: any;
  gridUpdBtn = true;
  supStaHisColumnDef: any[];
  locSummColumnDef: any[];
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  vheaderBlockModel: VTrustHeader = new VTrustHeader();
  minDate: Date;
  display: boolean;
  tableIndex = -1;
  locSumIndex = -1;
  offagyData: OffenderBookingAgyLocs[] = [];
  offagyModel: OffenderBookingAgyLocs = new OffenderBookingAgyLocs();
  suphtydata: OffSupervisionStsHty[] = [];
  supHtyDataObj: OffSupervisionStsHty[] = [];
  supHtyModel: OffSupervisionStsHty = new OffSupervisionStsHty();
  suphtyInsertList: OffSupervisionStsHty[] = [];
  suphtyUpdateList: OffSupervisionStsHty[] = [];
  suphtyDeleteList: OffSupervisionStsHty[] = [];
  supCommitModel: OffSupervisionStsHtyCommitBean = new OffSupervisionStsHtyCommitBean();
  vHeaderBlockModelBean: VHeaderBlock2 = new VHeaderBlock2();
  activeCount = 0;
  overlapCount = 0;
  startDatetime: Date;
  constructor(private ocdsupstFactory: OcdsupstService,
    public translateService: TranslateService, public sessionManager: UserSessionManager,
    private offenderSearchService: OffenderSearchService, public dialogService: DialogService,private osiosearFactory: OsiosearService,) {
    this.supStaHisColumnDef = [];
    this.locSummColumnDef = [];
  }
  ngOnInit() {
    this.supHtyDataObj = [];
    this.supHtyDataModel = new OffSupervisionStsHty();
    this.vheaderBlockModel = this.offenderSearchService.selectedOffender;
    if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
      this.show('common.pleasesearchforvalidoffender');
      this.gridInsBtn = false;
    }
    this.supStaHisColumnDef = [
      {
        fieldName: this.translateService.translate('ocdsupst.supervisionstatus'), field: 'supStatus', cellEditable: this.canCellEdit,
        editable: true, width: 150, datatype: 'lov', domain: 'SUP_STATUS', required: true
      },
      {
        fieldName: this.translateService.translate('ocdsupst.billable'), field: 'billableFlagValue', editable: false, width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('common.startdate'), field: 'startDatetime', editable: true,
        datatype: 'date', width: 150, required: true, cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('common.time'), field: 'startTime', editable: true,
        datatype: 'time', width: 150, required: true, cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('common.enddate'), field: 'endDatetime', editable: false,
        datatype: 'date', width: 150
      },
      {
        fieldName: this.translateService.translate('common.time'), field: 'endTime', editable: false,
        datatype: 'time', width: 150
      },
      {
        fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: true, width: 150,
        cellEditable: this.canCellEdit, maxlength: 240, datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlagVal', editable: false,
        width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('ocdsupst.error'), field: 'errorFlagVal', width: 150, cellEditable: this.canCellEdit, datatype: 'checkbox'
      },
    ];
    this.locSummColumnDef = [
      {
        fieldName: this.translateService.translate('common.adddate'), field: 'additionDate', editable: false, width: 150,
        datatype: 'date'
      },
      {
        fieldName: this.translateService.translate('common.location'), field: 'agyLocDescription', editable: false,
        width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('common.removedate'), field: 'removedDate', editable: false,
        width: 150, datatype: 'date'
      },
    ];

  }
  canCellEdit = (data: any, index: number, field: string): boolean => {
    if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' ||
     this.vheaderBlockModel.inOutStatus === 'Historic'
     || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
      return false;
    }
    if (this.offagyData.length === 0 || this.intakeReviewCount > 0) {
      return false;
    }
    if (data.offenderSupId) {
      if (this.supHtyDataObj[index].errorFlag === 'Y') {
        return false;
      }
      if (field === 'supStatus' || field === 'startDatetime' || field === 'startTime') {
        return false;
      }
    }
    if (field !== 'errorFlagVal' && data.offenderSupId) {
      if (this.supHtyDataObj[index].errorFlag === 'Y') {
        return false;
      }
    }
    if (data.offenderSupId && !this.supHtyDataObj[index].activeFlagVal) {
      return false;
    }
    if (field === 'startTime' && !data.startDatetime) {
      return false;
    }
    return true;
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
  onRowClickSupStaHis(event) {
    if (event) {
      if (event.errorFlagVal) {
        this.extSave = true;
      } else {
        this.extSave = false;
      }
    } else {
      this.extSave = false;
    }
  }
  onOffenderChange(offender) {
    this.vheaderBlockModel = offender;
    if (offender) {
      if (this.vheaderBlockModel && this.vheaderBlockModel.offenderBookId) {
        this.supHistoryExecuteQuery();
        this.offagyExecuteQuery();
        this.getIntakeRevCount();
      } else {
        this.suphtydata = [];
        this.offagyData = [];

        this.supHtyDataObj = [];
        this.supHtyDataModel = new OffSupervisionStsHty();
      }
      if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' ||
       this.vheaderBlockModel.inOutStatus === 'Historic'
      || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
        this.gridInsBtn = false;
      } else {
        this.gridInsBtn = true;
      }
    } else {
      this.suphtydata = [];
      this.offagyData = [];
      this.insertFlag = false;
      this.gridInsBtn = false;
      this.supHtyDataObj = [];
      this.supHtyDataModel = new OffSupervisionStsHty();
    }
  }
  getIntakeRevCount() {
    const serviceObj = this.ocdsupstFactory.getIntakeRevCount(this.vheaderBlockModel);
    serviceObj.subscribe(data => {
      this.intakeReviewCount = data;
    });
  }

  // execute query
  supHistoryExecuteQuery() {
    this.supHtyModel = new OffSupervisionStsHty();
    this.supHtyModel.offenderBookId = this.vheaderBlockModel.offenderBookId;
    const serviceObj = this.ocdsupstFactory.supHistoryExecuteQuery(this.supHtyModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.checkFlag = true;
        this.tableIndex = -1;
        this.insertFlag = true;
        this.suphtydata = [];
        this.supHtyDataObj = [];
        this.supHtyDataModel = new OffSupervisionStsHty();
        this.overlapCount = 0;
      } else {
        this.overlapCount = 0;
        this.checkFlag = true;
        data.forEach(element => {
          element.endTime = element.endDatetime;
          element.startTime = element.startDatetime;
          if (element.errorFlag === 'Y') {
            element.activeFlagVal = false;
          } else if (element.endDatetime && DateFormat.compareDate(DateFormat.getDate(element.endDatetime), DateFormat.getDate()) === 1) {
            element.activeFlagVal = true;
          } else if (element.endDatetime && DateFormat.compareDate(DateFormat.getDate(element.endDatetime), DateFormat.getDate()) === 0) {
            const endTimeVal = DateFormat.getDate(element.endTime).setSeconds(0, 0);
            if (DateFormat.compareTime(DateFormat.getDate(endTimeVal), DateFormat.getDate()) === 1) {
              element.activeFlagVal = true;
            } else {
              element.activeFlagVal = false;
            }
          } else if (!element.endDatetime) {
            element.activeFlagVal = true;
          } else {
            element.activeFlagVal = false;
          }
          element.errorFlagVal = element.errorFlag === 'Y' ? true : false;
          element.billableFlagValue = element.billableFlagValue === 'Y' ? true : false;
        });
        if (data[0].activeFlagVal) {
          this.insertFlag = false;
        } else {
          this.insertFlag = true;
        }
        this.supHtyDataObj = JSON.parse(JSON.stringify(data));
        this.suphtydata = data;
        this.tableIndex = 0;
        this.activeCount = 0;
        this.supHtyDataModel = new OffSupervisionStsHty();
        const dataObj = this.suphtydata.filter(ele => {
          if (ele['activeFlagVal'] && !ele['errorFlagVal']) {
            this.insertFlag = false;
            this.supHtyDataModel = JSON.parse(JSON.stringify(ele));
            this.activeCount = 1;
          }
        });
      }
    });
  }
  supHytCommit(event) {

    this.suphtyInsertList = [];
    this.suphtyUpdateList = [];
    this.suphtyDeleteList = [];
    this.suphtyInsertList = event.added;
    this.suphtyUpdateList = event.updated;
    this.suphtyDeleteList = event.removed;
    this.supCommitModel = new OffSupervisionStsHtyCommitBean();
    if (this.suphtyInsertList.length > 0) {
      for (let i = 0; i < this.suphtyInsertList.length; i++) {
     
          if (this.supValidations(this.suphtyInsertList[i])) {
            return;
          }
        if (this.suphtyInsertList[i].errorFlagVal) {
          this.suphtyInsertList[i].errorFlag = 'Y';
        } else {
          this.suphtyInsertList[i].errorFlag = 'N';
        }
        if (this.suphtyInsertList[i].billableFlagValue) {
          this.suphtyInsertList[i].billableFlag = 'Y';
        } else {
          this.suphtyInsertList[i].billableFlag = 'N';
        }
        this.suphtyInsertList[i].userId = this.sessionManager.getId();
        this.suphtyInsertList[i].trustAccount = this.vheaderBlockModel.trustAccount;
        this.suphtyInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
        this.suphtyInsertList[i].offenderBookId = this.vheaderBlockModel.offenderBookId;
        this.suphtyInsertList[i].offenderId = this.vheaderBlockModel.offenderId;
        this.suphtyInsertList[i].startDatetime = TimeFormat.parse(TimeFormat.format(this.suphtyInsertList[i].startTime),
          this.suphtyInsertList[i].startDatetime);
        this.suphtyInsertList[i].startDatetime = DateFormat.getDate(DateFormat.getDate(this.suphtyInsertList[i].startDatetime).setSeconds(0, 0));
      }
      this.supCommitModel.insertList = this.suphtyInsertList;
    }
    if (this.suphtyUpdateList.length > 0) {
      for (let i = 0; i < this.suphtyUpdateList.length; i++) {

        if (this.suphtyUpdateList[i].errorFlagVal) {
          this.suphtyUpdateList[i].errorFlag = 'Y';
        } else {
          this.suphtyUpdateList[i].errorFlag = 'N';
        }
        this.suphtyUpdateList[i].caseloadId = this.sessionManager.currentCaseLoad;
        if(this.suphtyInsertList.length > 0 && this.suphtyInsertList[0].errorFlagVal && 
          this.supHtyDataObj[0].activeFlagVal) {
            this.suphtyUpdateList[i].endDatetime = undefined;
        } else if(  this.suphtyUpdateList[i].endDatetime ) {
        this.suphtyUpdateList[i].endDatetime = TimeFormat.parse(TimeFormat.format(this.suphtyUpdateList[i].endTime),
          this.suphtyUpdateList[i].endDatetime);
        this.suphtyUpdateList[i].endDatetime = DateFormat.getDate(DateFormat.getDate(this.suphtyUpdateList[i].endDatetime).setSeconds(0, 0));
      }
    }
      this.supCommitModel.updateList = this.suphtyUpdateList;
    }
    const result = this.ocdsupstFactory.suphstyCommit(this.supCommitModel);
    result.subscribe(data => {
      if (data === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        const billableFlagValue =  this.suphtydata.filter(e => e.billableFlagValue );
        if(this.vheaderBlockModel && !this.vheaderBlockModel.trustAccount && billableFlagValue && billableFlagValue.length == 1){
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
      }else{
        this.supHistoryExecuteQuery();
      }
        this.overlapCount = 0;
        return;
      } else if (data === 2) {
        this.show(this.translateService.translate('ocdsupst.supervisionstatusdaterangecannotoverlapanexistingsupervisionstatusdaterange'), 'warn');
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
        this.supHistoryExecuteQuery();
        return;
      }
    });
  }
  supValidations(event) {
    const strTime = DateFormat.getDate(event.startTime).setSeconds(0, 0);
    const endTime = DateFormat.getDate(event.endTime).setSeconds(0, 0);
    
    if (!event.supStatus) {
      this.show(this.translateService.translate('ocdsupst.supervisionstatusmustbeentered'));
      return true;
    }
    if (!event.startDatetime) {
      this.show(this.translateService.translate('ocdsupst.startdatemustbeentered'));
      return true;
    }

    if (event.startDatetime && !event.errorFlagVal) {
      if (DateFormat.compareDate(DateFormat.getDate(this.vheaderBlockModel.bookingBeginDate), DateFormat.getDate(event.startDatetime)) === 1) {
        this.show(this.translateService.translate('ocdsupst.startdatetimecannotbeearlierthantheselectedbookingsbegindate'));
        return true;
      }
      if (this.activeCount == 0 &&  DateFormat.compareDate(DateFormat.getDate(event.startDatetime), DateFormat.getDate()) === 1) {
        this.show(this.translateService.translate('Supervision Status StartDate & Time cannot be future'));
        return true;
      } else if (DateFormat.compareDate(DateFormat.getDate(event.startDatetime), DateFormat.getDate()) === 1) {
        this.show(this.translateService.translate('Active supervision record already exists Start date & Time must be current effectiveDate'));
        return true;
      }
      
      // if (this.suphtydata.length != 1 && DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(event.startDatetime)) === 1) {
      //   this.show(this.translateService.translate('Active supervision record already exists,StartDate & Time cannot earlier the current Date&Time'));
      //   return true;
      // }
    }
    if (!event.startTime) {
      this.show(this.translateService.translate('ocdsupst.timemustbeentered'));
      return true;
    }
    if (event.startTime && !event.errorFlagVal) {
      if (DateFormat.compareDate(DateFormat.getDate(event.startDatetime), DateFormat.getDate()) === 0) {
        if (DateFormat.compareTime(DateFormat.getDate(strTime), DateFormat.getDate()) === 1) {
          this.show(this.translateService.translate('supervision StartDate & Time cannot be future'));
          return true;
        }
      }
    }
    if(this.overlapCount === 1) {
      this.show(this.translateService.translate('ocdsupst.supervisionstatusdaterangecannotoverlapanexistingsupervisionstatusdaterange'), 'warn');
      return true;
    }
  }
  // execute query
  offagyExecuteQuery() {
    this.offagyModel = new OffenderBookingAgyLocs();
    this.offagyModel.caseloadId = this.sessionManager.currentCaseLoad;
    this.offagyModel.offenderBookId = this.vheaderBlockModel.offenderBookId;
    const serviceObj = this.ocdsupstFactory.offagyExecuteQuery(this.offagyModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.offagyData = [];
        this.locSumIndex = -1;
        this.gridInsBtn = false;
      } else {
        if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' 
        || this.vheaderBlockModel.inOutStatus === 'Historic'
       || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
          this.gridInsBtn = false;
        } else {
          this.gridInsBtn = true;
        }
        this.offagyData = data;
        this.locSumIndex = 0;
      }
    });
  }
  validateRowData = (event) => {
   
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    if((event.field === 'startDatetime' ||event.field === 'startTime') && event.data.startDatetime && event.data.startTime) {
      this.overlapCount = 0;
      this.startDatetime = undefined;
      this.startDatetime = TimeFormat.parse(TimeFormat.format(event.data.startTime),
      event.data.startDatetime);
      this.startDatetime = DateFormat.getDate(DateFormat.getDate(this.startDatetime).setSeconds(0, 0));
       const aDate = DateFormat.getDate(this.startDatetime);
      const dataObj = this.supHtyDataObj.filter(ele => {
        if(!ele.errorFlagVal) {
        const sDate = DateFormat.getDate(ele['startDatetime']);
        const eDate = DateFormat.getDate(ele['endDatetime']);
        if(DateFormat.compareDateTime(aDate,sDate) === 0 || DateFormat.compareDateTime(aDate,sDate) === -1) {
          this.overlapCount = 1;
        } else  if (ele['endDatetime'] && DateFormat.compareDateTime(aDate, sDate) > -1 && DateFormat.compareDateTime(aDate, eDate) < 1) { 
          this.overlapCount = 1;
        }
      }
      });
    }
    if (event.field === 'errorFlagVal' && event.data.errorFlagVal && event.data.activeFlagVal) {
      this.grid.setColumnData('activeFlagVal', index, false);
      rowdata.validated = true;
      return rowdata;
    } else if (event.field === 'errorFlagVal' && !event.data.errorFlagVal) {
      if (event.data.endDatetime && DateFormat.compareDate(DateFormat.getDate(event.data.endDatetime), DateFormat.getDate()) === 1) {
        this.grid.setColumnData('activeFlagVal', index, true);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.endDatetime) {
        this.grid.setColumnData('activeFlagVal', index, true);
        rowdata.validated = true;
        return rowdata;
      } else {
        this.grid.setColumnData('activeFlagVal', index, false);
        rowdata.validated = true;
        return rowdata;
      }
    }
    if (!event.data.offenderSupId && ((event.field === 'startDatetime' && event.data.startDatetime)
    || (event.field === 'startTime' && event.data.startTime) )) {
    if(this.supHtyDataObj.length > 0 && this.supHtyDataObj[0].activeFlagVal) {
        this.grid.setColumnData('endDatetime', 0, event.data.startDatetime);
        this.grid.setColumnData('endTime', 0, event.data.startTime);
    }
  }
    if (event.field === 'supStatus' && event.data.supStatus) {
      const billebleObj = this.ocdsupstFactory.getBillableFlag(event.data.supStatus);
      billebleObj.subscribe(data => {
        if (data !== undefined && data.parentCode && data.parentCode === 'B') {
          this.grid.setColumnData('billableFlagValue', index, true);
          this.grid.setColumnData('billableFlag', index, 'Y');
          rowdata.validated = true;
          return rowdata;
        } else {
          this.grid.setColumnData('billableFlagValue', index, false);
          this.grid.setColumnData('billableFlag', index, 'N');
          rowdata.validated = true;
          return rowdata;
        }
      });

    }
    if (event.field === 'startDatetime' && !event.data.startDatetime) {
      this.grid.setColumnData('startTime', index, undefined);
      rowdata.validated = true;
      return rowdata;
    }
   
    rowdata.validated = true;
    return rowdata;
  }
  onGridInsert = () => {
    if (this.grid.addedMap.size > 0) {
      this.show(this.translateService.translate('ocdsupst.pleasesavetheaffrecordfirst'), 'warn');
      return;
    }
  //   this.grid.updatedMap.forEach((value) => { 
  //   if(value.errorFlagVal) {
  //     this.show(this.translateService.translate('ocdsupst.pleasesavetheaffrecordfirst'), 'warn');
  //     return;
  //   }
  // });
    if(this.supHtyDataObj.length > 0 && this.supHtyDataObj[0].activeFlagVal &&
      !this.supHtyDataObj[0].errorFlagVal && this.suphtydata[0].errorFlagVal) {
        this.show(this.translateService.translate('ocdsupst.pleasesavetheaffrecordfirst'), 'warn');
        return;
    }
    // if (this.grid.updatedMap.size > 0) {
    //   this.show(this.translateService.translate('ocdsupst.pleasesavetheaffrecordfirst'), 'warn');
    //   return;
    // }
    if (this.intakeReviewCount > 0) {
      this.show(this.translateService.translate('ocdsupst.intakereviewrequiredforthisoffender'));
      return;
    }
    if (!this.insertFlag && this.checkFlag) {
      const data = {
        label: 'Do you want to expire the current active record?', yesBtn: true, noBtn: true
      };
      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
        if (result) {
         
          this.checkFlag = false;
          this.grid.addRecord();
          this.grid.setColumnData('startDatetime', this.suphtydata.length - 1, DateFormat.getDate());
          this.grid.setColumnData('startTime', this.suphtydata.length - 1, DateFormat.getDate());
          this.grid.setColumnData('activeFlagVal', this.suphtydata.length - 1, true);
          this.grid.setColumnData('errorFlagVal', this.suphtydata.length - 1, false);
         
          this.suphtydata.filter(ele => {
            const index = this.suphtydata.indexOf(ele);
            if (ele['offenderSupId'] && ele['activeFlagVal'] && !ele['errorFlagVal']) {
              this.grid.setColumnData('endDatetime', index, DateFormat.getDate());
              this.grid.setColumnData('endTime', index, DateFormat.getDate());
            }
          });
        } else {
          return;
        }
      });
    } else {
      return { startDatetime: DateFormat.getDate(), startTime: DateFormat.getDate(), activeFlagVal: true };
    }
  }
  OnGridClear = () => {
    this.supHistoryExecuteQuery();
    return true;

  }
  get gridInsertBtn() {
    const dataObj = this.suphtydata.filter(ele => {
      const index = this.suphtydata.indexOf(ele);
      if (ele['activeFlagVal']) {
        if (ele.endDatetime && DateFormat.compareDate(DateFormat.getDate(ele.endDatetime), DateFormat.getDate()) === -1) {
          this.grid.setColumnData('activeFlagVal', index, false);
          if (this.supHtyDataObj[index].endDatetime) {
            this.insertFlag = true;
          }
        } else if (ele.endDatetime && DateFormat.compareDate(DateFormat.getDate(ele.endDatetime), DateFormat.getDate()) === 0) {
          const endTimeVal = DateFormat.getDate(ele.endTime).setSeconds(0, 0);
          if (DateFormat.compareTime(DateFormat.getDate(endTimeVal), DateFormat.getDate()) !== 1) {
            this.grid.setColumnData('activeFlagVal', index, false);
            if (this.supHtyDataObj[index].endDatetime) {
              this.insertFlag = true;
            }
          }
        }
      }
    });
    return false;
  }
}
