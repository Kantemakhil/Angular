import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OffenderAllowances } from '../beans/OffenderAllowances';
import { OffenderAllowancesCommitBean } from '../beans/OffenderAllowancesCommitBean';
import { OidallowService } from '../service/oidallow.service';
import { DatePipe } from '@angular/common';
// import required bean declarations

@Component({
    selector: 'app-oidallow',
    templateUrl: './oidallow.component.html'
})

export class OidallowComponent implements OnInit {

    @ViewChild('offenderAllowence', { static: true }) offenderAllowence: any;
    msgs: { message: any; type: any; }[];

    type: string;
    message: string;

    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offenderAllowenceDataColumnDef: any[];
    offenderAllowenceData: OffenderAllowances[] = [];
    offenderAllowenceDataDb: OffenderAllowances[] = [];
    offenderAllowenceModel: OffenderAllowances = new OffenderAllowances();
    offenderAllowenceIndex: number;

    offenderAllowenceInsertList: OffenderAllowances[] = [];
    offenderAllowenceUpdatetList: OffenderAllowances[] = [];
    offenderAllowenceDeleteList: OffenderAllowances[] = [];
    offenderAllowenceCommitBean: OffenderAllowancesCommitBean = new OffenderAllowancesCommitBean();
    countActive: number;
    endDatecount: number;
    endDate: Date;
    startDate: Date;
    offenderBookId : number;
    offAllowanceId : number;
    paidDate: Date;
    updatedEndDate: Date;
    formattedPaidDate: any;
    constructor(private oidallowFactory: OidallowService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public router: Router, private datePipe: DatePipe) {
        this.offenderAllowenceDataColumnDef = [];
    }
    ngOnInit() {
        this.offenderAllowenceDataColumnDef = [
            {
                fieldName: this.translateService.translate('oidallow.allowencetype'), field: 'allowanceType', datatype: 'lov', link: 'oidallow/getAllowenceLovData',
                 width: 150, cellEditable: this.canAlertEdit, source: 'OIMALLOW'
            },
            {
                fieldName: this.translateService.translate('oidallow.startdate'), required: true,
                field: 'startDate', datatype: 'date', editable: true, width: 150, cellEditable: this.canAlertEdit
            },

            {
                fieldName: this.translateService.translate('oidallow.enddate'),
                field: 'endDate', datatype: 'date', editable: true, width: 150, 
                 cellEditable: this.canEndDateEdit 
            },
            {
                fieldName: this.translateService.translate('oidallow.comment'), field: 'commentText', editable: true, width: 150,
                datatype: 'text', uppercase: 'false', maxlength: 240
            },

        ];
    }

    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    canEndDateEdit = (data: any, index: number, field: string): boolean => {
        if (data.status==='E') {
            return false;
        } else {
            return true;
        }
    } 


    onOffenderChange(offender) {
        // this.clear();
        if (offender) {
            this.offenderAllowenceData = [];
            this.vHeaderBlockModel = offender;
            this.getOffenderAllowenceExecuteQuery();
        } else {
            this.offenderAllowenceData = [];
            this.vHeaderBlockModel = new VHeaderBlock();
        }
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }


    getOffenderAllowenceExecuteQuery() {
        this.offenderAllowenceModel = new OffenderAllowances();
        this.offenderAllowenceModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.oidallowFactory.getOffenderAllowenceExecuteQuery(this.offenderAllowenceModel).subscribe(data => {
            if (data && data.length > 0) {
                this.offenderAllowenceData = data;

                for (let i = 0; i < this.offenderAllowenceData.length; i++) {
                    this.offenderAllowenceData[i]['endDateDb']= this.offenderAllowenceData[i].endDate;
                    if (DateFormat.compareDate(DateFormat.getDate(this.offenderAllowenceData[i].endDate),
                        DateFormat.getDate()) < 0) {
                            this.offenderAllowenceData[i]['status']='E';
                            
                        } else{
                            this.offenderAllowenceData[i]['status']='D';
                        }
                }


               /*  for (let i = 0; i < this.offenderAllowenceData.length; i++) {
                    for (let j = 1; j < this.offenderAllowenceData.length; j++) {
                        if(this.offenderAllowenceData[i].offAllowanceId >this.offenderAllowenceData[j].offAllowanceId){
                            this.offenderAllowenceData[i]['previousrec']=true;
                        }
                    
                    }
                } */
                this.offenderAllowenceDataDb = JSON.parse(JSON.stringify(data));
                this.offenderAllowenceModel = data[0];
                this.offenderAllowenceIndex = 0;
            } else {
                this.offenderAllowenceData = [];
                this.offenderAllowenceDataDb = [];
            }

        });
    }

    onRowClickOffenderAllowenceData(event) {
        if (event) {
            this.offenderAllowenceModel = event;
            this.offenderBookId =  event.offenderBookId;
            this.offAllowanceId = event.offAllowanceId;
            this.updatedEndDate = event.endDate;
            const formattedUpdDate = this.datePipe.transform(this.updatedEndDate, 'yyyy-MM-dd');
            if(this.offenderBookId && this.offAllowanceId){
                const serviceObj = this.oidallowFactory.getLastPaidDate(this.offenderBookId, this.offAllowanceId);
                 serviceObj.subscribe(data => {
                    if(data.length !== 0){
                        this.paidDate =  data;
                        this.formattedPaidDate = this.datePipe.transform(this.paidDate, 'yyyy-MM-dd');
                    }else{
                        this.formattedPaidDate = null;
                    }
                 });
            }
        }
    }
    validateRowDataAllowence = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'allowanceType') {
            if (event.data.allowanceType) {
                const serviceObj = this.oidallowFactory.getRateVersionData(event.data.allowanceType);
                serviceObj.subscribe(data => {
                    if (data.length === 0) {
                        this.offenderAllowence.setColumnData('unit', index, undefined);
                        this.offenderAllowence.setColumnData('rate', index, undefined);
                        rowdata.validated = true;
                        return rowdata;
                    } else {
                        this.offenderAllowence.setColumnData('unit', index, data[0].unit);
                        this.offenderAllowence.setColumnData('rate', index, data[0].rate);
                        rowdata.validated = true;
                        return rowdata;
                    }
                });
            }
        }

        rowdata.validated = true;
        return rowdata;

    }
    offenderAllowenceDataCommit(event) {
        this.offenderAllowenceInsertList = event.added;
        this.offenderAllowenceUpdatetList = event.updated;
        this.offenderAllowenceDeleteList = event.removed;
        this.offenderAllowenceCommitBean.insertList = [];
        this.offenderAllowenceCommitBean.updateList = [];
        this.offenderAllowenceCommitBean.deleteList = [];

        if (this.offenderAllowenceInsertList.length > 0 || this.offenderAllowenceUpdatetList.length > 0) {
            for (let i = 0; i < this.offenderAllowenceInsertList.length; i++) {
                this.offenderAllowenceInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                if (this.offenderAllowenceInsertList[i].startDate && this.vHeaderBlockModel.bookingBeginDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offenderAllowenceInsertList[i].startDate),
                        DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                        this.show(this.translateService.translate('oidallow.offenderallowancestartdatecannotbebeforetheadmissiondate'), 'warn');
                        return false;
                    }
                }

                if (this.offenderAllowenceInsertList[i].startDate && this.offenderAllowenceInsertList[i].endDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offenderAllowenceInsertList[i].endDate),
                        DateFormat.getDate(this.offenderAllowenceInsertList[i].startDate)) === -1) {
                        this.show(this.translateService.translate('oidallow.offenderallowanceenddatecannotbebeforethestartdate'), 'warn');
                        return false;
                    }
                }

                if (this.checkOverlappingStartDate(this.offenderAllowenceInsertList[i].startDate)) {
                    this.show(this.translateService.translate('oidallow.startdateoverlapsapreviousallowance'), 'warn');
                    return false;
                }

                this.offenderAllowenceCommitBean.insertList = this.offenderAllowenceInsertList;
            }
            for (let i = 0; i < this.offenderAllowenceUpdatetList.length; i++) {
                this.updatedEndDate = this.offenderAllowenceUpdatetList[i].endDate;
                const formattedUpdDate = this.datePipe.transform(this.updatedEndDate, 'yyyy-MM-dd');
                    if(this.formattedPaidDate!= null && 
                        (DateFormat.compareDate(DateFormat.getDate(formattedUpdDate), DateFormat.getDate(this.formattedPaidDate)) < 0)){
                            this.show(this.translateService.translate('oidallow.allowancehasalreadybeenpaidforthedateentered'), 'warn');
                            return false;
                    }
                if (this.offenderAllowenceUpdatetList[i].startDate && this.vHeaderBlockModel.bookingBeginDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offenderAllowenceUpdatetList[i].startDate),
                        DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                        this.show(this.translateService.translate('oidallow.oidallow.offenderallowancestartdatecannotbebeforetheadmissiondate'), 'warn');
                        return false;
                    }
                }

                if (this.offenderAllowenceUpdatetList[i].startDate && this.offenderAllowenceUpdatetList[i].endDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offenderAllowenceUpdatetList[i].endDate),
                        DateFormat.getDate(this.offenderAllowenceUpdatetList[i].startDate)) === -1) {
                        this.show(this.translateService.translate('oidallow.offenderallowanceenddatecannotbebeforethestartdate'), 'warn');
                        return false;
                    }

                }

                if(this.offenderAllowenceUpdatetList[i]['endDateDb'] && !this.offenderAllowenceUpdatetList[i].endDate){
                    this.show(this.translateService.translate('oidallow.enddateCannotberemovedonceitissaved'), 'warn');
                        return false;
                }

                if (this.checkOverlappingStartDate(this.offenderAllowenceUpdatetList[i].endDate)) {
                    this.show(this.translateService.translate('oidallow.startdateoverlapsapreviousallowance'), 'warn');
                    return false;
                }

                if (this.offenderAllowenceUpdatetList[i].startDate) {
                    this.offenderAllowenceUpdatetList[i].startDate = DateFormat.getDate(this.offenderAllowenceUpdatetList[i].startDate);
                }
                if (this.offenderAllowenceUpdatetList[i].endDate) {
                    this.offenderAllowenceUpdatetList[i].endDate = DateFormat.getDate(this.offenderAllowenceUpdatetList[i].endDate);
                }

                

                this.offenderAllowenceCommitBean.updateList = this.offenderAllowenceUpdatetList;
            }
        }
        if (this.offenderAllowenceDeleteList.length > 0) {
            for (let i = 0; i < this.offenderAllowenceDeleteList.length; i++) {
                if(this.offenderAllowenceDeleteList[i].paidFlag > 0){
                    this.show(this.translateService.translate('oidallow.deletenotallowedasoffenderhasbeenpaidforthisallowance'), 'warn');
                    return false;
                }

                if (this.offenderAllowenceDeleteList[i].startDate) {
                    this.offenderAllowenceDeleteList[i].startDate = DateFormat.getDate(this.offenderAllowenceDeleteList[i].startDate);
                }
                if (this.offenderAllowenceDeleteList[i].endDate) {
                    this.offenderAllowenceDeleteList[i].endDate = DateFormat.getDate(this.offenderAllowenceDeleteList[i].endDate);
                }
                this.offenderAllowenceCommitBean.deleteList = this.offenderAllowenceDeleteList;
            }
        }


        const omsroleSaveData = this.oidallowFactory.offenderAllowenceDataCommit(this.offenderAllowenceCommitBean);
        omsroleSaveData.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.getOffenderAllowenceExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.getOffenderAllowenceExecuteQuery();
                return;
            }
        });
    }
    onGridInsert = () => {
        if (this.offenderAllowenceData && this.offenderAllowenceData.length > 0) {
            this.endDatecount = 0;
            this.startDate = this.offenderAllowenceData[this.offenderAllowenceData.length-1].startDate;
            this.endDate = this.offenderAllowenceData[this.offenderAllowenceData.length-1].endDate;
        }else{
            this.startDate = undefined;
            this.endDate = undefined;
        }
        if((this.startDate && !this.endDate) || (this.endDate && DateFormat.compareDate(DateFormat.getDate(this.endDate), DateFormat.getDate()) >= 0)){
            this.show(this.translateService.translate('oidallow.anallowanceisstillactivefortheoffender'), 'warn');
            return;
        }
        if(((this.startDate && this.endDate) &&((DateFormat.compareDate(DateFormat.getDate(this.startDate), DateFormat.getDate()) <= 0) && 
            (DateFormat.compareDate(DateFormat.getDate(this.endDate), DateFormat.getDate()) >= 0)))
            || (DateFormat.compareDate(DateFormat.getDate(this.startDate), DateFormat.getDate(this.endDate)) > 0)){
            this.show(this.translateService.translate('oidallow.anallowanceisstillactivefortheoffender'), 'warn');
            return;
        }
        this.offenderAllowenceModel = new OffenderAllowances();
        return {status:'D'};
    }

    checkOverlappingStartDate(startDate: any) {
        if (startDate != undefined) {
            for (let i = 0; i < this.offenderAllowenceData.length; i++) {
                for (let j = 1; j < this.offenderAllowenceData.length; j++) {
                    if((i !== j) && (DateFormat.compareDate(DateFormat.getDate(this.offenderAllowenceData[j].startDate), DateFormat.getDate(this.offenderAllowenceData[i].startDate)) >= 0)
                        && (DateFormat.compareDate(DateFormat.getDate(this.offenderAllowenceData[j].startDate), DateFormat.getDate(this.offenderAllowenceData[i].endDate)) <= 0)
                    ||((DateFormat.compareDate(DateFormat.getDate(this.offenderAllowenceData[j].startDate), DateFormat.getDate(this.offenderAllowenceData[i].startDate)) < 0) &&
                    (DateFormat.compareDate(DateFormat.getDate(this.offenderAllowenceData[j].endDate), DateFormat.getDate(this.offenderAllowenceData[i].startDate)) >= 0))){
                        return true;
                    }
                }
            }
        }
    }

    get enableDeleteGrid(){
        if(this.offenderAllowenceModel.offAllowanceId){
            return true;
        } else {
            return false;
        }
    }

    get enableInsertGrid(){
        if(this.vHeaderBlockModel.offenderBookId){
            return true;
        } else {
            return false;
        }
    }

    onGridClear = () => {
        this.offenderAllowenceData = [];
        this.getOffenderAllowenceExecuteQuery();
    }
}
