import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OcupdetaService } from '@inst/institutional-activities/service/ocupdeta.service';
import { VOffenderCourseAttendances } from '@instinstitutionalactivitiesbeans/VOffenderCourseAttendances';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OffenderCourseAttendance } from '@cm/programsservices/beans/OffenderCourseAttendance';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { DialogService } from '@ui-components/dialog/dialog.service';

// import required bean declarations


@Component({
    selector: 'app-ocupdeta',
    templateUrl: './ocupdeta.component.html'
})
export class OcupdetaComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('grid', { static: true }) grid: any;
    msgs: any[] = [];
    display = true;
    vCrsAttColumnDef: any[];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    vOffAttCoursedata: VOffenderCourseAttendances[] = [];
    updateList: VOffenderCourseAttendances[] = [];
    updatedData: VOffenderCourseAttendances[] = [];
    selectedRow: any;
    totalAmount: any;
    updatedList: VOffenderCourseAttendances[] = [];
    vOffAttCourseModel: OffenderCourseAttendance = new OffenderCourseAttendance();
    constructor(private ocupdetaFactory: OcupdetaService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private amountFormat: AmountFormatUtil, public dialogService: DialogService) {
        // TODO initilize data members here..!
        this.vCrsAttColumnDef = [];

    }
    ngOnInit() {
        this.vOffAttCourseModel = new OffenderCourseAttendance();
        this.vOffAttCourseModel.offenderIdDisplay = this.dialog.data.offenderIdDisplay;
        this.vOffAttCourseModel.programId = this.dialog.data.programId;
        this.vOffAttCourseModel.crsActyId = this.dialog.data.crsActyId;
        if (this.dialog.data.startDate) {
            const startDate = this.dialog.data.startDate;
            this.vOffAttCourseModel.startTime = DateFormat.getDate(startDate);
        }
        if(this.dialog.data.offAllowanceId){
            this.vOffAttCourseModel.offAllowanceId = this.dialog.data.offAllowanceId;
        }
        const endDate = this.dialog.data.endDate;
        this.vOffAttCourseModel.endTime = DateFormat.getDate(endDate);
        this.unpaidAttendanceExecuteQuery();
        this.vCrsAttColumnDef = [
            {
                fieldName: this.translateService.translate('ocupdeta.date'), field: 'eventDate',
                editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocupdeta.pid'), field: 'offenderIdDisplay',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocupdeta.lastname'), field: 'lastName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('First Name'),
                field: 'firstName', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocupdeta.code'), field: 'activityDescription',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocupdeta.noofunits'), field: 'payHours',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocupdeta.rate'), field: 'paySystemRate', whole: true,
                editable: true, width: 150, datatype: 'number', format: '1.2-2', maxValue: 999999999.99, rightAlign: true
            },
            {
                fieldName: this.translateService.translate('ocupdeta.amount'), field: 'paySystemAmount', datatype: 'number',
                editable: false, width: 150, format: '1.2-2', strictFP: true, maxValue: 999999999.99, rightAlign: true
            },
            {
                fieldName: this.translateService.translate('ocupdeta.comment'), field: 'hiddenCommentText', required: true,
                editable: true, width: 150, maxlength: 240,datatype: 'text', uppercase: 'false'
            }
        ];
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
        const voffResult = this.ocupdetaFactory.unpaidAttendanceExecuteQuery(this.vOffAttCourseModel);
        voffResult.subscribe(data => {
            if (data.length === 0) {
                this.vOffAttCoursedata = [];
                this.show('common.querycaused', 'warn');
                this.totalAmount = undefined;
                return;
            } else {
                data.forEach(element => {
                    element.paySystemRate = element.payActualRate;
                    element.paySystemAmount = element.payActualAmount;
                });
                this.totalAmount = JSON.parse(JSON.stringify(this.amountFormat.amountFormat(data[0].totalAmount)));
                this.vOffAttCoursedata = data;
            }
        });
    }
    onRowClickEvent(event) {
    }
    dailogCloseEvent(event) {
        if (this.grid.updatedMap.size > 0) {
            const message = {
                label: this.translateService.translate('ocupdeta.savediscardchanges'), yesBtn: true, noBtn: true, cancelBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', message, 55).subscribe(result => {
                if (result === null) {
                    return;
                } else if (!result) {
                    this.dialog.close({
                        totalPay: this.totalAmount
                    });
                    return;

                } else {
                    const event = { updated: [] };
                    if (this.grid) {

                        const updated = [];
                        this.grid.updatedMap.forEach((value) => {
                            updated.push(value);
                        });
                        event.updated = updated;
                        this.onCommitSave(event);
                    }
                }
            });
        } else {
            this.dialog.close({
                totalPay: this.totalAmount
            });
        }
    }
    validateRowData = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'paySystemRate') {
            if (event.data.paySystemRate) {
                this.grid.setColumnData('paySystemAmount', index, Number(event.data.paySystemRate)*Number(event.data.payHours));
                const rateVal = Number(event.data.paySystemRate).toFixed(2);
                this.grid.setColumnData('paySystemRate', index, rateVal);
            } else  if (event.data.paySystemRate === 0) {
                this.grid.setColumnData('paySystemAmount', index, 0);
                this.grid.setColumnData('paySystemRate', index, 0);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    onCommitSave(event) {
        const fieldsData = {};
        this.updatedList = [];
        this.updateList = [];
        this.updatedList = event.updated;
        event.updated.forEach(ele => {
            fieldsData['eventId'] = ele.eventId;
            fieldsData['payActualRate'] = Number(ele.paySystemRate);
            fieldsData['payActualAmount'] = (ele.paySystemAmount);
            fieldsData['payFlag'] = 'N';
            fieldsData['hiddenCommentText'] = ele.hiddenCommentText;
            fieldsData['detailId'] = ele.detailId;
            fieldsData['type'] = ele.type;
            const field = JSON.parse(JSON.stringify(fieldsData));
            this.updateList.push(field);
        });
        const voffResult = this.ocupdetaFactory.generatePay(this.updateList);
        voffResult.subscribe(data => {
            if (data > 0) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.unpaidAttendanceExecuteQuery();
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
            }
        });
    }
}
