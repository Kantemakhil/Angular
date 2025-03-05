import {
    Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdcgpayService } from '@inst/institutional-activities/service/ocdcgpay.service';
import { VOffenderCourseAttendances } from '@instinstitutionalactivitiesbeans/VOffenderCourseAttendances';
import { Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OffenderCourseAttendance } from '@cm/programsservices/beans/OffenderCourseAttendance';
import { OiinamesService } from '@inst/movement-external/service/oiinames.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
@Component({
    selector: 'app-ocdcgpay',
    templateUrl: './ocdcgpay.component.html'
})

export class OcdcgpayComponent implements OnInit {
    msgs: any[] = [];
    display = true;
    vCrsAttColumnDef: any[];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    vOffCoursedata: VOffenderCourseAttendances[] = [];
    commitModel: VOffenderCourseAttendances = new VOffenderCourseAttendances();
    updateList: VOffenderCourseAttendances[] = [];
    offCoursAttmodel: OffenderCourseAttendance = new OffenderCourseAttendance();
    offCoursAttmodelTemp: OffenderCourseAttendance = new OffenderCourseAttendance();
    selectedRow: any;
    payBatchId: any;
    totalAmount: any;
    startDate: Date;
    vOffCourseCommitdata: OffenderCourseAttendance[] = [];
    constructor(private ocdcgpayFactory: OcdcgpayService, private oiinamesFactory: OiinamesService,
        public translateService: TranslateService, private router: Router, private sessionManager: UserSessionManager,
        public dialogService: DialogService , private amountFormat: AmountFormatUtil) {
        this.vCrsAttColumnDef = [];
    }
    ngOnInit() {
        this.payBatchId = undefined;
        this.totalAmount = undefined;
        this.vCrsAttColumnDef = [
            {
                fieldName: this.translateService.translate('ocdcgpay.pid'), field: 'offenderIdDisplay',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdcgpay.lastname'), field: 'lastName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdcgpay.firstname'),
                field: 'firstName', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdcgpay.type'), field: 'programDescription', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('ocdcgpay.code'), field: 'activityDescription',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdcgpay.rate'), field: 'paySystemRate', paySystemRate: 'number',
                editable: false, width: 150, datatype: 'number', format: '1.2-2',rightAlign: true
            },
            {
                fieldName: this.translateService.translate('ocdcgpay.amount'), field: 'paySystemAmount', datatype: 'number',
                editable: false, width: 150, format: '1.2-2',rightAlign: true
            },
            {
                fieldName: this.translateService.translate('Details'), field: 'button', datatype: 'launchbutton', editable: true,
                width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.onGoBtnClick

            },

        ];

        const searchResult = this.ocdcgpayFactory.getFromToDates();
        searchResult.subscribe(data => {
            if (data.length > 0) {
                this.offCoursAttmodelTemp = data[0];
                this.offCoursAttmodel.startTime = DateFormat.getDate(data[0].startTime);
                this.offCoursAttmodel.endTime = DateFormat.getDate(data[0].endTime);
            }
        });
    }
    onGoBtnClick = (data) => {
        if (this.payBatchId) {
            return;
        }
        data['startDate'] = this.offCoursAttmodel.startTime;
        data['endDate'] = this.offCoursAttmodel.endTime;
        if(this.offCoursAttmodel.offAllowanceId){
            data['offAllowanceId'] = this.offCoursAttmodel.offAllowanceId;
        }
        this.dialogService.openLinkDialog('/OCUPDETA', data, 85).subscribe(result => {
            this.unpaidAttendanceExecuteQuery();
            if (result) {
                this.totalAmount = result.totalPay;
            }
        });
    }
    /*
  * This method is used to show popup messages.
  */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    unpaidAttendanceExecuteQuery() {
        this.payBatchId = undefined;
        const voffResult = this.ocdcgpayFactory.unpaidAttendanceExecuteQuery(this.offCoursAttmodel);
        voffResult.subscribe(data => {
            if (data.length === 0) {
                this.vOffCoursedata = [];
                this.totalAmount = undefined;
                this.show('common.querycaused', 'warn');
                return;
            } else {
                data.forEach(element => {
                    element.button = 'GO';
                    element.paySystemRate = element.paySystemRate;
                    element.paySystemAmount = element.payActualAmount;
                    element.createDatetime = DateFormat.getDate();
                    element.createUserId = this.sessionManager.getId();
                    if (this.offCoursAttmodel.startTime) {
                        element.fromDate = DateFormat.getDate(this.offCoursAttmodel.startTime);
                    }
                    element.toDate = DateFormat.getDate(this.offCoursAttmodel.endTime);
                });
                this.totalAmount = JSON.parse(JSON.stringify(this.amountFormat.amountFormat(data[0].totalAmount)));
                // this.totalAmount = data[0].totalAmount.toFixed(2);
                this.vOffCoursedata = data;
            }
        });
    }
    onRowClickEvent(event) {

    }
    onRetrive() {
        if (!this.offCoursAttmodel.endTime) {
            this.show('ocdcgpay.todatemustbeentered', 'warn');
            return;
        }
        if (DateFormat.compareDate(DateFormat.getDate(this.offCoursAttmodel.endTime),
        DateFormat.getDate()) === 1) {
        this.show(this.translateService.translate('ocdcgpay.todateenteredcannotbegreaterthanthecurrentdate'), 'warn');
        return;
        }
        this.unpaidAttendanceExecuteQuery();

    }
    onClear() {
        this.payBatchId = undefined;
        this.vOffCoursedata = [];
        this.offCoursAttmodel = new OffenderCourseAttendance();
        this.totalAmount = undefined;
        this.offCoursAttmodel.startTime = DateFormat.getDate(this.offCoursAttmodelTemp.startTime);
        this.offCoursAttmodel.endTime = DateFormat.getDate(this.offCoursAttmodelTemp.endTime);
    }

    validateRowData = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        return rowdata;
    }
    confirmGeneratePay() {
        const fieldsData = {};
        this.vOffCourseCommitdata = [];
        this.offCoursAttmodel.createUserId = this.sessionManager.getId();
        this.vOffCourseCommitdata.push(this.offCoursAttmodel);
        this.commitModel = new VOffenderCourseAttendances();
        const voffResult = this.ocdcgpayFactory.generatePay(this.vOffCourseCommitdata);
        voffResult.subscribe(data => {
            if (data > 0) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.payBatchId = data;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.payBatchId = undefined;
            }
        });
    }
    get fieldsReadonly() {
        if (this.payBatchId || this.vOffCoursedata.length > 0) {
            return true;
        }
        return false;
    }

    get clearDisable() {
        if (this.payBatchId || this.offCoursAttmodel.startTime || this.offCoursAttmodel.endTime || this.offCoursAttmodel.offenderIdDisplay) {
            return false;
        }
        return true;
    }
    get retriveDisable() {
        if (!this.payBatchId && this.vOffCoursedata.length === 0 && (this.offCoursAttmodel.endTime || this.offCoursAttmodel.startTime || this.offCoursAttmodel.offenderIdDisplay)) {
            return false;
        }
        return true;
    }
    get btnDisable() {
        if (this.payBatchId || this.vOffCoursedata.length === 0) {
            return true;
        }
        return false;
    }
    seOffenderIdDisplay(event) {
        if (event) {
            this.offCoursAttmodel.offenderIdDisplay = event.offenderIdDisplay;
        } else {
            this.offCoursAttmodel.offenderIdDisplay = undefined;
            this.offCoursAttmodel.offenderBookId = undefined;
        }
    }
    textBoxBlurEvent(event) {
        if (event) {
            this.namesrchExecuteQuery();
        }
    }
    namesrchExecuteQuery() {
        const namesrchModel = {};
        namesrchModel['offenderIdDisplay'] = this.offCoursAttmodel.offenderIdDisplay;
        const nameSearch = this.oiinamesFactory.
            namesrchExecuteQuery(namesrchModel);
        nameSearch.subscribe(searchData => {
            if (searchData.length > 0 || searchData[0].activeFlag === 'Y') {
                this.offCoursAttmodel.offenderIdDisplay = searchData.offenderIdDisplay[0].offenderIdDisplay;
            } else {
                this.show('ocdcgpay.thisoffenderdoesnotexist', 'warn');
                this.offCoursAttmodel.offenderIdDisplay = undefined;
            }
        });
    }
}
