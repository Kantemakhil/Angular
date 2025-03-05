import { Component, Input, OnInit } from '@angular/core';
import { OcdbreciService } from '@cf/offendertransactions/service/ocdbreci.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OffSupervisionStsHty } from '@cm/intakeclosure/beans/OffSupervisionStsHty';
import { OcdsupstService } from '@cm/intakeclosure/service/ocdsupst.service';
import { OsihrsumService } from '@inst/systemsearch/service/osihrsum.service';
import { VHistoricalBookings } from '@inst/systemsearch/beans/VHistoricalBookings';

@Component({

    templateUrl: './supervision.component.html',
    providers: [],
    selector: 'supervisionComponent'
})
export class SupervisionComponent implements OnInit {
    vHeaderBlockModel: VHeaderBlock;
    offenderbookid: number;
    longestSupervisiondate: String;
    supHtyModel: OffSupervisionStsHty = new OffSupervisionStsHty();
    tableIndex: number;
    checkFlag: boolean;
    insertFlag: boolean;
    suphtydata: OffSupervisionStsHty[];
    supHtyDataObj: any[];
    supHtyDataModel: any;
    supervisionStatus: String;
    outcountStatus: String;
    rootOffenderid: number;
    vhisbooData: VHistoricalBookings[] = [];
    vHisModel: VHistoricalBookings = new VHistoricalBookings();
    constructor(private ocdbreciService: OcdbreciService, private ocdsupstFactory: OcdsupstService, private osihrsumFactory: OsihrsumService) { }
    ngOnInit(): void {
    }

    @Input()
    set selectedOffender(v: any) {
        if (v !== undefined && v !== this.vHeaderBlockModel) {
            this.vHeaderBlockModel = v;
            this.supervisionStatus = undefined;
            this.longestSupervisiondate = undefined;
            this.outcountStatus = undefined;
            this.supervisionExpiryDate();
            this.supHistoryExecuteQuery();
            this.vhisbooExecuteQuery();
        } else {
          this.supervisionStatus = undefined;
          this.longestSupervisiondate = undefined;
          this.outcountStatus = undefined;
        }
    }

    supervisionExpiryDate() {
        this.offenderbookid = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdbreciService.supervisionExpiryDate(this.vHeaderBlockModel.offenderBookId);
        serviceObj.subscribe(data => {
            this.longestSupervisiondate = DateFormat.format(data);;
        });
    }

    supHistoryExecuteQuery() {
        this.supHtyModel = new OffSupervisionStsHty();
        this.supHtyModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdsupstFactory.supHistoryExecuteQuery(this.supHtyModel);
        serviceObj.subscribe(data => {
          if (data.length === 0) {
            this.checkFlag = true;
            this.tableIndex = -1;
            this.insertFlag = true;
            this.suphtydata = [];
            this.supHtyDataObj = [];
            this.supHtyDataModel = new OffSupervisionStsHty();
            this.supervisionStatus = undefined;
          } else {
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
              const billebleObj = this.ocdsupstFactory.getBillableFlag(data[0].supStatus);
              billebleObj.subscribe(obj => {
                      this.supervisionStatus = obj.description;
              })
            } else {
              this.insertFlag = true;
            }
            this.supHtyDataObj = JSON.parse(JSON.stringify(data));
            this.suphtydata = data;
            this.tableIndex = 0;
            this.supHtyDataModel = new OffSupervisionStsHty();
            const dataObj = this.suphtydata.filter(ele => {
              if (ele['activeFlagVal'] && !ele['errorFlagVal']) {
                this.insertFlag = false;
                this.supHtyDataModel = JSON.parse(JSON.stringify(ele));
              }
            });
          }
        });
      }
  

    vhisbooExecuteQuery() {
        this.rootOffenderid = this.vHeaderBlockModel.rootOffenderId;
        const saveObj = this.osihrsumFactory.vHisBooExecuteQuery(this.rootOffenderid);
        saveObj.subscribe(data => {
            if (data.length == 0) {
                this.vhisbooData = [];
            } else {
              this.vhisbooData = data;
              this.vHisModel = data[0];
              if (this.vHisModel && this.vHisModel.outMovementReasonCode != null) {
                this.osihrsumFactory.getOutCountDescription(this.vHisModel.outMovementReasonCode).subscribe(data => {
                  if (data) {
                    this.outcountStatus = data;
                  }
                });
              }
              else {
                this.outcountStatus = undefined;
              }
            }
        });
    }


}