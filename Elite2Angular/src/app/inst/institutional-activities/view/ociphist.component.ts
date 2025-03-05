import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OciphistService } from '@inst/institutional-activities/service/ociphist.service';
import { VOffenderCourseAttendances } from '@instinstitutionalactivitiesbeans/VOffenderCourseAttendances';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { prgPayBatchesBean } from '@instinstitutionalactivitiesbeans/prgPayBatchesBean';
// import required bean declarations


@Component({
    selector: 'app-ociphist',
    templateUrl: './ociphist.component.html'
})
export class OciphistComponent implements OnInit {
    @ViewChild('grid', { static: true }) grid: any;
    msgs: any[] = [];
    display = true;
    paySummaryColumnDef: any[];
    payDetailsColumnDef: any[];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    payDetailsdata: VOffenderCourseAttendances[] = [];
    index: any;
    totalAmount: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    tableIndex: any;
    batchId: any;
    prgPayBatchModel: prgPayBatchesBean = new prgPayBatchesBean;
    payDetailsModel: prgPayBatchesBean = new prgPayBatchesBean;
    prgPayBatchdata: prgPayBatchesBean[] = [];
    constructor(private ociphistFactory: OciphistService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService) {
        // TODO initilize data members here..!
        this.paySummaryColumnDef = [];
        this.payDetailsColumnDef = [];
    }
    ngOnInit() {
        if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
            this.show('common.pleasesearchforvalidoffender', 'warn');
        }

        this.paySummaryColumnDef = [
            {
                fieldName: this.translateService.translate('ociphist.batchId'), field: 'batchId',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ociphist.fromdate'), field: 'fromDate',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ociphist.todate'), field: 'toDate',
                editable: false, width: 150
            },

            {
                fieldName: this.translateService.translate('ociphist.totalamount'), field: 'batchPayAmount',
                editable: false, width: 150, datatype: 'number', format: '1.2-2',rightAlign: true
            }

        ];
        this.payDetailsColumnDef = [
            {
                fieldName: this.translateService.translate('ociphist.date'), field: 'eventDate',
                editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ociphist.type'),
                field: 'programDescription', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ociphist.code'), field: 'activityDescription',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ociphist.hours'), field: 'payHours', paySystemRate: 'number',
                editable: false, width: 150,
            },

            {
                fieldName: this.translateService.translate('ociphist.rate'), field: 'payActualRate', paySystemRate: 'number',
                editable: false, width: 150, datatype: 'number', format: '1.2-2',rightAlign: true
            },
            {
                fieldName: this.translateService.translate('ociphist.amount'), field: 'payActualAmount',
                editable: false, width: 150, datatype: 'number', format: '1.2-2',rightAlign: true
            },
            {
                fieldName: this.translateService.translate('ociphist.comment'), field: 'hiddenCommentText', 
                editable: false, width: 150, datatype: 'text',maxlength: 240
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

    onOffenderChange(offender) {
        this.vHeaderBlockModel = undefined;
        this.prgPayBatchdata = [];
        this.payDetailsdata = [];
        this.prgPayBatchModel = new prgPayBatchesBean();
        this.payDetailsModel = new prgPayBatchesBean();
        if (offender) {
            this.vHeaderBlockModel = offender;
            this.prgPayBatchesExecuteQuery();
        }

    }
    // onRetrive() {
    //     this.prgPayBatchesExecuteQuery();
    //     // this.payDetailsExecuteQuery();
    // }
    prgPayBatchesExecuteQuery() {
        this.prgPayBatchModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const voffResult = this.ociphistFactory.prgPayBatchesExecuteQuery(this.prgPayBatchModel);
        voffResult.subscribe(data => {
            if (data.length === 0) {
                this.prgPayBatchdata = [];
                this.show('common.querycaused', 'warn');
                return;
            } else {
                data.forEach(element => {
                    element.batchPayAmount = element.batchPayAmount.toFixed(2);
                    element.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                });
                this.prgPayBatchdata = data;
            }
        });
    }
    onRowClickEvent(event) {
        this.payDetailsModel = new prgPayBatchesBean();
        if (event) {
            this.payDetailsModel.offenderBookId = event.offenderBookId;
            this.payDetailsModel.batchId = event.batchId;
            this.payDetailsExecuteQuery();
        } 

    }
    payDetailsExecuteQuery() {
        const voffResult = this.ociphistFactory.payDetailsExecuteQuery(this.payDetailsModel);
        voffResult.subscribe(data => {
            if (data.length === 0) {
                this.payDetailsdata = [];
                this.show('common.querycaused', 'warn');
                return;
            } else {
                data.forEach(element => {
                    element.payActualAmount = element.payActualAmount.toFixed(2);
                    element.payActualRate = element.payActualRate.toFixed(2);
                    element.eventDate = DateFormat.getDate(element.eventDate);
                });
                this.payDetailsdata = data;
            }
        });
    }

    // get fieldsReadonly() {
    //     if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.prgPayBatchdata.length === 0) {
    //         return false;
    //     }
    //     return true;
    // }
    // get clearDisable() {
    //     if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId
    //         && (this.prgPayBatchModel.batchId || this.prgPayBatchdata.length > 0)) {
    //         return false;
    //     }
    //     return true;
    // }
    // get retriveDisable() {
    //     if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId
    //         && this.prgPayBatchModel.batchId && this.prgPayBatchdata.length === 0) {
    //         return false;
    //     }
    //     return true;
    // }
    // onClear() {
    //     this.prgPayBatchModel = new prgPayBatchesBean();
    //     this.payDetailsdata = [];
    //     this.prgPayBatchdata = [];
    // }
}
