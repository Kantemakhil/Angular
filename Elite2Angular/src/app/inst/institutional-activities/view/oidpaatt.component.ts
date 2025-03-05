import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidpaattService } from '../service/oidpaatt.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderCourseAttendancesCommitBean } from '../beans/VOffenderCourseAttendancesCommitBean';
import { VOffenderCourseAttendances } from '../beans/VOffenderCourseAttendances';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OimcountService } from '../../automated-counts/maintenance/service/oimcount.service';
import { VSchdPrisonActivities } from '../beans/VSchdPrisonActivities';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OcmpssetService } from '@inst/institutional-activities/maintenance/service/ocmpsset.service';
import { ProgramPaySettingsBean } from '@inst/institutional-activities/maintenance/beans/ProgramPaySettingsBean';
import { TimeFormat } from '@core/ui-components/time/timeFormat';
@Component({
    selector: 'app-oidpaatt',
    templateUrl: './oidpaatt.component.html'
})

export class OidpaattComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    vactattData: VOffenderCourseAttendances[] = [];
    vactattDataTemp: VOffenderCourseAttendances[] = [];
    vactattModel: VOffenderCourseAttendances = new VOffenderCourseAttendances();
    vPrisonActivities: VSchdPrisonActivities = new VSchdPrisonActivities();
    vPrisonActivitiesModel: VOffenderCourseAttendances = new VOffenderCourseAttendances();
    vPrisonData: VSchdPrisonActivities[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    docsColumnDef: any[];
    vOffPrgProfilesColumnDef: any[];
    vActAttColumnDef: any[];
    offTxnColumnDef: any[];
    tasksColumnDef: any[];
    block2ReadOnly: boolean;
    rgpsactperfRg: any[] = [];
    rgoutcomesRg: any[] = [];
    rgservicesRg: any[] = [];
    rgagylocRg: any[] = [];
    vactattCommitModel: VOffenderCourseAttendancesCommitBean = new VOffenderCourseAttendancesCommitBean();
    vactattInsertList: VOffenderCourseAttendances[] = [];
    vactattUpdatetList: VOffenderCourseAttendances[] = [];
    vactattDeleteList: VOffenderCourseAttendances[] = [];
    tableIndex: number;
    retriveDisabled: boolean;
    clearDisabled: boolean;
    eventDate: Date;
    servicelink: any;
    establishmentLov: string;
    livingUnitId: any;
    level1Code: any;
    serviceLovData: boolean;
    agyLocId: any;
    inTime: Date;
    outTime: Date;
    mandatoyFlag: boolean;
    serviceReadonly: boolean;
    facilityDisable: boolean;
    serviceDisable: boolean;
    dateReadonly: boolean;
    maxHours: any;
  prgSrvSetModel: ProgramPaySettingsBean = new ProgramPaySettingsBean();
    maxHoursDate: any;
    constructor(private oidpaattFactory: OidpaattService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public oimcountFactory: OimcountService,private ocmpssetService: OcmpssetService,
        public dialogService: DialogService) {
        this.docsColumnDef = [];
        this.vOffPrgProfilesColumnDef = [];
        this.vActAttColumnDef = [];
        this.offTxnColumnDef = [];
        this.tasksColumnDef = [];

    }
    ngOnInit() {
        this.maxHoursDate =undefined;
        this.progServicesExecuteQuery()
        this.clearDisabled = true;
        this.retriveDisabled = false;
        this.vPrisonActivities.scheduleDate = DateFormat.getDate();
        this.mandatoyFlag = false;
        this.serviceReadonly = true;
        this.dateReadonly = false;
        this.vActAttColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('common.name'), field: 'offenderName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oidpaatt.confirmattendance') + '*', field: 'eventOutcome', editable: true,
                width: 150, datatype: 'lov', domain: 'PS_PA_OC',cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('oidpaatt.offenderstarttime'), field: 'startTime', editable: true,
                width: 150, datatype: 'time',
                cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('oidpaatt.offenderendtime'), field: 'endTime', editable: true,
                width: 150, datatype: 'time', cellEditable: this.canAlertEdit
            },
            {
                fieldName: 'Hours', field: 'hours', editable: false, width: 150, datatype: 'time'
            },
            {
                fieldName: this.translateService.translate('oidpaatt.performance'), field: 'performanceCode', editable: true,
                width: 150, datatype: 'lov', domain: 'PERFORMANCE',cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('common.comments'), field: 'commentText', editable: true, width: 150,
                maxlength: 240, datatype: 'text', uppercase: 'false',cellEditable: this.canAlertEdit
            },
            { fieldName: '', field: 'actionCode', hide: true },
            {
                fieldName: 'Pay Flag', field: 'payFlag', editable: false, width: 150, datatype: 'checkbox', hide: true
              },
              {
                fieldName: 'Batch #', field: 'payBatchId', editable: false, width: 150,  hide: true
              },
        ];
        this.defData();
    }
    defData() {
        const serviceList = this.oidpaattFactory.getdefaultAttendanceData();
        serviceList.subscribe(data => {
            if (data !== null) {
                this.vPrisonActivitiesModel = data;
            } else {
                this.vPrisonActivitiesModel = new VOffenderCourseAttendances();
            }
        });
    }
    dateChange() {
        if (this.vPrisonActivities.scheduleDate) {
            this.clearDisabled = false;
        }
    }
    isInsertable() {
        if (this.vPrisonActivities.activity || this.vPrisonActivities.code || this.vPrisonActivities.agyLocId) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if(data.payBatchId) {
            this.show('oidpaatt.attendancerecordhasalreadypaid','warn');
            return false;
          }
        return true;
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

    changeCellBlock(event) {
        if (event) {
            this.level1Code = event.description;
            this.agyLocId = event.code;
            this.serviceReadonly = false;
            this.servicelink = 'oidpaatt/rgServicesRecordGroup?agyLocId=' + this.vPrisonActivities.agyLocId;
			this.changeCellBlockOption();
			this.vactattData = [];
            this.vactattModel = new VOffenderCourseAttendances();
            this.vPrisonActivities.code = null;
            this.vPrisonActivities.activity = null;
            this.vPrisonActivities.startTime = null;
            this.vPrisonActivities.endTime = null;
            this.vPrisonActivities.internalLocationDesc = null;
            this.inTime = null;
            this.outTime = null;
            this.mandatoyFlag = false;
            this.retriveDisabled = false;
            this.vactattDataTemp = [];
        } else {
            this.vactattData = [];
            this.vactattDataTemp = [];
            this.vactattModel = new VOffenderCourseAttendances();
            this.vPrisonActivities.code = null;
            this.vPrisonActivities.activity = null;
            this.vPrisonActivities.startTime = null;
            this.vPrisonActivities.endTime = null;
            this.vPrisonActivities.internalLocationDesc = null;
            this.inTime = null;
            this.outTime = null;
            this.mandatoyFlag = false;
            this.serviceReadonly = true;
            this.retriveDisabled = false;
            if (DateFormat.compareDate(DateFormat.getDate(), this.vPrisonActivities.scheduleDate) === 0) {
                this.clearDisabled = true;
            } else {
                this.clearDisabled = false;
            }
        }
    }
    changeServiceBlock(event) {
        if (!event) {
            this.vactattData = [];
            this.vactattDataTemp = [];
            this.vactattModel = new VOffenderCourseAttendances();
            this.vPrisonActivities.activity = null;
            this.vPrisonActivities.startTime = null;
            this.vPrisonActivities.endTime = null;
            this.vPrisonActivities.internalLocationDesc = null;
            this.inTime = null;
            this.outTime = null;
            this.mandatoyFlag = false;
            this.retriveDisabled = false;
            this.clearDisabled = false;
        } else {
			this.vactattData = [];
            this.vactattDataTemp = [];
            this.vactattModel = new VOffenderCourseAttendances();
            this.vPrisonActivities.activity = null;
            this.vPrisonActivities.startTime = null;
            this.vPrisonActivities.endTime = null;
            this.vPrisonActivities.internalLocationDesc = null;
            this.inTime = null;
            this.outTime = null;
            this.mandatoyFlag = false;
			this.retriveDisabled = false;
			this.clearDisabled = false;
		}
    }
    defAttendance() {
        if (this.vactattData.length === 0) {
            this.show('oidpaatt.pleaseretrievedatatocontinue');
            return;
        }
        for (let i = 0; i < this.vactattData.length; i++) {
            if (!this.vactattData[i].eventOutcome) {
                this.grid.setColumnData('eventOutcome', i, this.vPrisonActivitiesModel.eventOutcome);
            }
            if (!this.vactattData[i].performanceCode) {
                this.grid.setColumnData('performanceCode', i, this.vPrisonActivitiesModel.performanceCode);
            }
        }
    }
    activityIdDisplay(event) {
        if (event) {
            this.vPrisonActivities.activity = event.activity;
            this.vPrisonActivities.startTime = event.startTime;
            this.vPrisonActivities.endTime = event.endTime;
			this.vPrisonActivities.internalLocationDesc = event.internalLocationDesc;
			this.vPrisonActivities.crsActyId = event.crsActyId;
			this.vactattData = [];
            this.vactattDataTemp = [];
            this.vactattModel = new VOffenderCourseAttendances();
            this.inTime = null;
            this.outTime = null;
            this.mandatoyFlag = false;
			this.retriveDisabled = false;
			this.clearDisabled = false;
        }
    }
    changeCellBlockOption() {
        const serviceList = this.oidpaattFactory.rgServicesRecordGroup(this.agyLocId);
        serviceList.subscribe(data => {
            if (data.length === 0) {
                this.serviceLovData = false;
            } else {
                this.serviceLovData = true;
            }
        });
    }
    onStatusBlur() {
        if (!this.vPrisonActivities.agyLocId) {
            this.vPrisonActivities.agyLocId = this.vPrisonActivities.agyLocId === '' ? undefined : '';
        }
    }
    onRelationshipBlur() {
        if (!this.vPrisonActivities.code) {
            this.vPrisonActivities.code = this.vPrisonActivities.code === '' ? undefined : '';
        }
    }
    onRowClickalert(event) {
        if (event) {
            this.vactattModel = event;
            if (this.vactattModel.eventOutcome === 'ATT') {
                //this.grid.requiredOn('performanceCode');
                this.mandatoyFlag = true;
                if (this.vactattModel.startTime) {
                    this.inTime = this.vactattModel.startTime;
                } else {
                    this.inTime = null;
                }
                if (this.vactattModel.endTime) {
                    this.outTime = this.vactattModel.endTime;
                } else {
                    this.outTime = null;
                }
            } else {
                //this.grid.requiredOff('performanceCode');
                this.inTime = this.vactattModel.startTime;
                this.outTime = this.vactattModel.endTime;
                this.mandatoyFlag = false;
            }
            if(this.vactattData[0].actionCode === 'false'){
                this.grid.setColumnData('actionCode',0,'true')
              }
        } else {
            this.vactattModel = new VOffenderCourseAttendances();
            this.mandatoyFlag = false;
        }
    }
    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        rowdata.validated = true;
        if (event.field === 'startTime' && (event.newValue !== event.oldValue)) {
            if (!event.data.startTime && this.vactattModel.eventOutcome === 'ATT') {
                this.show('oidpaatt.pleaseentertheoffenderstarttimeiftheoffenderattended');
                return;
            }
            if (event.data.startTime && event.data.endTime) {
                const date = DateFormat.getDate(event.data.startTime);
                const dateOne = DateFormat.getDate(event.data.endTime);
                if (DateFormat.compareTime(date, dateOne) === 1) {
                    this.show('oidpaatt.starttimecannotbegreaterthanendtime');
                    return;
                }
                const durationVal = this.caluculateTime(event.data.startTime, event.data.endTime);;
                this.grid.setColumnData('hours', rowIndex, durationVal);
            } else {
                this.grid.setColumnData('hours', rowIndex, undefined);
            }
        }
        if (event.field === 'endTime' && (event.newValue !== event.oldValue)) {
            if (!event.data.endTime && this.vactattModel.eventOutcome === 'ATT') {
                this.show('oidpaatt.pleaseentertheoffenderendtimeiftheoffenderattended');
                return;
            }
            if (event.data.startTime && event.data.endTime) {
                const date = DateFormat.getDate(event.data.startTime);
                const dateOne = DateFormat.getDate(event.data.endTime);
                if (DateFormat.compareTime(date, dateOne) === 1) {
                    this.show('oidpaatt.starttimecannotbegreaterthanendtime');
                    return;
                }
                const durationVal = this.caluculateTime(event.data.startTime, event.data.endTime);
                this.grid.setColumnData('hours', rowIndex, durationVal);
            }
        }
        if (event.field === 'eventOutcome' && (event.newValue !== event.oldValue)) {

            if(event.data.eventId && !event.data.startTime && !event.data.startTime){
                this.grid.setColumnData('startTime', rowIndex, this.vPrisonActivities.startTime);
                this.grid.setColumnData('endTime', rowIndex, this.vPrisonActivities.endTime);
                // this.grid.requiredOn('performanceCode');
            } 
            this.grid.setColumnData('performanceCode', rowIndex, undefined);
            if (event.data.eventOutcome === 'ATT') {
               // this.grid.requiredOn('performanceCode');
            } else {
                //this.grid.requiredOff('performanceCode');
            }
        }
        if (event.data.startTime && event.data.endTime) {
            const durationVal = this.caluculateTime(event.data.startTime, event.data.endTime);;
            this.grid.setColumnData('hours', rowIndex, durationVal);
        } else {
            this.grid.setColumnData('hours', rowIndex, undefined);
        }
        return rowdata;
    }
    serviceChange(event) {
        if (event) {
        this.vPrisonActivities.programId = event.programId;
        this.vPrisonActivities.description = event.description;
        }

    }
    onGenerateOverRideClick = () => {
        if (!this.vPrisonActivities.scheduleDate) {
            this.show('common.datemustbeentereddate');
            return;
        }
        this.dialogService.openLinkDialog('/OIDSCHAC', this.vPrisonActivities, 80).subscribe(result => {
        });
	}
	onGridClear = () => {
		this.vactattExecuteQuery();
		return true;
	}
    cancel() {
        this.clearDisabled = true;
        this.retriveDisabled = false;
        this.vactattData = [];
        this.vactattDataTemp = [];
        this.vactattModel = new VOffenderCourseAttendances();
        this.vPrisonActivities = new VSchdPrisonActivities();
        this.vPrisonActivities.scheduleDate = DateFormat.getDate();
        this.inTime = null;
        this.outTime = null;
        this.mandatoyFlag = false;
        this.facilityDisable = false;
        this.serviceDisable = false;
        this.dateReadonly = false;
        this.maxHours =  undefined;
        this.maxHoursDate =undefined;
    }
    vactattExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                this.clearDisabled = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.clearDisabled = false;
                return;
            }
		}
		if (!this.vPrisonActivities.scheduleDate) {
			this.show('common.datemustbeentereddate');
			return;
		}
        if (DateFormat.compareDate(this.vPrisonActivities.scheduleDate, DateFormat.getDate()) === 1) {
            this.show('oidpaatt.datecannotbeinthefuture');
            return;
        }
        
        if (!this.vPrisonActivities.scheduleDate || !this.vPrisonActivities.agyLocId || !this.vPrisonActivities.code
            || !this.vPrisonActivities.activity) {
            this.show('oidpaatt.pleaseenterallmandatoryfieldstoquerydata');
            return;
        }
        this.vactattModel.programId = this.vPrisonActivities.programId;
        this.vactattModel.eventDate = this.vPrisonActivities.scheduleDate;
		this.vactattModel.toInternalLocationDesc = this.vPrisonActivities.internalLocationDesc;
		this.vactattModel.crsActyId = this.vPrisonActivities.crsActyId;
        const strTimeValue =this.vPrisonActivities.startTime.getHours() + ':' + this.vPrisonActivities.startTime.getMinutes();
        const startTime = TimeFormat.parse(strTimeValue, this.vactattModel.eventDate);
        const endTimeValue =this.vPrisonActivities.endTime.getHours() + ':' + this.vPrisonActivities.endTime.getMinutes();
        const endTime = TimeFormat.parse(endTimeValue, this.vactattModel.eventDate);
        this.vactattModel.inTime = DateFormat.getDate(startTime);
        this.vactattModel.outTime = DateFormat.getDate(endTime);
        const vactattResult = this.oidpaattFactory.vActAttExecuteQuery(this.vactattModel);
        vactattResult.subscribe(data => {
            if (data.length === 0) {
                this.maxHours =  undefined;
                this.vactattData = [];
                this.vactattDataTemp = [];
                this.maxHoursDate =undefined;
                this.show('common.querycaused');
                return;
            } else {
                this.maxHours =  this.prgSrvSetModel.instActMaxScheduledHours ;
                data.forEach(element => {
                    if(element.startTime && element.endTime) {
                        element.hours  = this.caluculateTime(element.startTime , element.endTime);
                      } else {
                        element.hours  = undefined;
                      }
                    element.payFlag = element.payBatchId > 0 ? true : false;
                });
                data[0].actionCode = true;
                this.vactattData = data;
                this.vactattDataTemp = JSON.parse(JSON.stringify(data));
                this.vactattModel = data[0];
                this.tableIndex = 0;
                this.clearDisabled = false;
                this.retriveDisabled = true;
                this.serviceReadonly = true;
             this.facilityDisable = true;
             this.serviceDisable = true;
             this.dateReadonly = true;
            }
        });
    }
    vistypValidations(event) {
        const is = { valid: true };
       event.forEach(data => {
            if (!data.eventOutcome) {
                this.show('oidpaatt.confirmattendancemustbeentered');
                is.valid = false;
                return;
            }
            if (data.eventOutcome) {
                if (!data.startTime && data.eventOutcome === 'ATT') {
                    this.show('oidpaatt.pleaseentertheoffenderstarttimeiftheoffenderattended');
                    is.valid = false;
                    return;
                }
                if (!data.endTime && data.eventOutcome === 'ATT') {
                    this.show('oidpaatt.pleaseentertheoffenderendtimeiftheoffenderattended');
                    is.valid = false;
                    return;
                }
                if (!data.performanceCode && data.eventOutcome === 'ATT') {
                    this.show('oidpaatt.pleaseentertheoffenderperformanceiftheoffenderattended');
                    is.valid = false;
                    return;
                }
                if (data.startTime && data.endTime) {
                    if (DateFormat.compareTime(DateFormat.getDate(data.hours),
                        DateFormat.getDate(this.maxHoursDate)) === 1) {
                        this.show('oidpaatt.durationexceedsmaxhors', 'warn');
                        const rowIndex = this.vactattData.indexOf(data);
                        this.grid.setColumnData('endTime', rowIndex, this.vactattDataTemp[rowIndex].endTime);
                        this.grid.setColumnData('startTime', rowIndex, this.vactattDataTemp[rowIndex].startTime);
                        is.valid = false;
                        return;
                    }
                }
               
            }
        });
        return is.valid;
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidpaattSavevactattForm(event) {
        if (!this.vistypValidations(event.added)) {
            return;
        }
        this.vactattInsertList = event.added;
        this.vactattUpdatetList = event.updated;
        this.vactattDeleteList = event.removed;
        this.vactattCommitModel.insertList = [];
        this.vactattCommitModel.updateList = [];
        this.vactattCommitModel.deleteList = [];
        if (this.vactattUpdatetList.length > 0) {
            if (!this.vistypValidations(this.vactattUpdatetList)) {
                return;
            }
            for (let i = 0; i < this.vactattUpdatetList.length; i++) {
                this.vactattCommitModel.updateList = this.vactattUpdatetList;
            }
        }
        const vactattSaveData = this.oidpaattFactory.vActAttCommit(this.vactattCommitModel);
        vactattSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.vactattExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.vactattExecuteQuery();
                return;
            }
        });

    }
      progServicesExecuteQuery() {
        const searchResult = this.ocmpssetService.progServSettingExecuteQuery();
        searchResult.subscribe(data => {
            if (data.length === 0) {
                this.prgSrvSetModel = new ProgramPaySettingsBean();
            } else {
                this.prgSrvSetModel = data[0];
                if ( this.prgSrvSetModel.payFlag === 'Y') {
                    this.vActAttColumnDef[this.vActAttColumnDef.length - 1].hide = 'false';
                    this.vActAttColumnDef[this.vActAttColumnDef.length - 2].hide = 'false';
                    this.grid.prepareAgColumnDef();
                }
                if ( this.prgSrvSetModel.instActMaxScheduledHours) {
                    this.maxHoursDate = DateFormat.getDate(DateFormat.getDate().setHours( this.prgSrvSetModel.instActMaxScheduledHours, 0, 0, 0));
                  } else {
                    this.maxHoursDate = undefined
                  }
            }
        });
      }
      caluculateTime(startTime, endTime) {
        const h = Math.abs(DateFormat.getDate(startTime).getTime() -
          DateFormat.getDate(endTime).getTime()) / 36e5;
        var n = new Date(0, 0);
        n.setSeconds(+h * 60 * 60);
        const hours = n.getHours();
        const minutes = n.getMinutes();
        const  datval = DateFormat.getDate(DateFormat.getDate().setHours(hours, minutes, 0, 0));
        return datval;
      }
}

