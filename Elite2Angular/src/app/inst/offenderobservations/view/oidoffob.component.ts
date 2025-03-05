import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OffObsPeriodChecks } from '@instcareinplacementbeans/OffObsPeriodChecks';
import { OffObsPeriodCheckscommitBean } from '@instcareinplacementbeans/OffObsPeriodCheckscommitBean';
import { OffenderObservationInquiry } from '../beans/OffenderObservationInquiry';
import { OffenderObservationPeriods } from '../beans/OffenderObservationPeriods';
import { OffenderObservationPeriodsCommitBean } from '../beans/OffenderObservationPeriodsCommitBean';
import { OffenderObservationTypes } from '../maintenance/beans/OffenderObservationTypes';
import { OidoffobService } from '../service/oidoffob.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
// import required bean declarations

@Component({
    selector: 'app-oidoffob',
    templateUrl: './oidoffob.component.html'
})

export class OidoffobComponent implements OnInit {

    @ViewChild('offenderObservation', { static: true }) offenderObservation: any;
    @ViewChild('offenderObservationCheck', { static: true }) offenderObservationCheck: any;
    msgs: { message: any; type: any; }[];

    type: string;
    message: string;

    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offenderObservationPeriodDataColumnDef: any[];
    observationPeriodCheckDataColumnDef: any[];
    //offenderObservationPeriodData: any;


    observationTypePeriodCommitBean: OffenderObservationPeriodsCommitBean = new OffenderObservationPeriodsCommitBean();
    offenderObservationPeriodData: OffenderObservationPeriods[] = [];
    offenderObservationPeriodTempData: OffenderObservationPeriods[] = [];
    observationTypePeriodModel: OffenderObservationPeriods = new OffenderObservationPeriods();
    observationTypePeriodSearchModel: OffenderObservationPeriods = new OffenderObservationPeriods();

    observationTypePeriodInsertList: OffenderObservationPeriods[] = [];
    observationTypePeriodUpdatetList: OffenderObservationPeriods[] = [];
    observationTypePeriodDeleteList: OffenderObservationPeriods[] = [];
    offenderObservationPeriodIndex: number;

    observationPeriodCheckData: OffObsPeriodChecks[] = [];
    observationPeriodCheckIndex: number;
    observationTypePeriodCheckSearchModel: OffObsPeriodChecks = new OffObsPeriodChecks();
    observationTypePeriodCheckModel: OffObsPeriodChecks = new OffObsPeriodChecks();
    observationTypePeriodChildCheckModel: OffObsPeriodChecks = new OffObsPeriodChecks();
    observationTypeModel: OffenderObservationTypes = new OffenderObservationTypes();



    observationPeriodCheckInsertList: OffObsPeriodChecks[] = [];
    observationPeriodCheckUpdatetList: OffObsPeriodChecks[] = [];
    observationPeriodCheckDeleteList: OffenderObservationPeriods[] = [];
    offObsPeriodCheckscommitBean: OffObsPeriodCheckscommitBean = new OffObsPeriodCheckscommitBean();
    dailogData =  {};
    insertValidationCount: boolean = true;
    endDateValidationCount : number = 0;
    showBackbutton: boolean;
    observationInquiryParam: OffenderObservationInquiry = new OffenderObservationInquiry();
    cellConditionList: any[] = [];
    notInCellList: any[] = [];
    activityList: any[] = [];
    commonDetailsCatList: any[] = [];
    officerNotesList: any[] = [];
    childCommentText: any;

    obsTypeTitles = {
        observationType: this.translateService.translate('code'),
        description: this.translateService.translate('common.description')
    };
    insertValidationCountActive: boolean;
    systemProfModel: SystemProfiles = new SystemProfiles();
    constructor(private oidoffobFactory: OidoffobService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private dialogService: DialogService,
         private activatedRoute: ActivatedRoute,  public router: Router,private eoffenderService: EoffenderService) {
        this.offenderObservationPeriodDataColumnDef = [];
    }
    ngOnInit() {
        this.showBackbutton=false;

        if(this.oidoffobFactory.backButton){
                this.showBackbutton=true;
                this.oidoffobFactory.backButton = false;
                this.observationInquiryParam =this.oidoffobFactory.searchParam;
                this.oidoffobFactory.searchParam =undefined;
            } else {
                this.showBackbutton=false;
            }
        
        this.offenderObservationPeriodDataColumnDef = [
            {
                fieldName: this.translateService.translate('oidoffob.observaionid'), field: 'obsPeriodId', datatype: 'number',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oimoffob.observationtype'), field: 'obsTypeVersionIdTemp', editable: true, width: 150,
                datatype: 'lov', link: 'oidoffob/getObservationTypeRecordGroup', required: true, source:'OIMOFFOB', titles: this.obsTypeTitles,cellEditable: this.obsTypeEdit
            },

            {
                fieldName: this.translateService.translate('oidoffob.freq'), field: 'frequency', editable: false, width: 150,
                datatype: 'number'
            },


            {
                fieldName: this.translateService.translate('oimoffob.notify'), field: 'notificationFlag', datatype: 'checkbox',
                editable: false, width: 150
            },

            { fieldName: this.translateService.translate('oimoffob.notificationbuffer'), field: 'notificationTiming', editable: false, width: 150, 
            datatype: 'number', minValue: '0', maxValue: '99', strictFP: true, whole: true},

            {
                fieldName: this.translateService.translate('oidoffob.startdate'), required: true,
                field: 'startDatetime', datatype: 'date', editable: true, width: 150, cellEditable: this.canAlertStartEdit
            },

            {
                fieldName: this.translateService.translate('oidoffob.starttime'), required: true,
                field: 'startTime', editable: true, width: 150, datatype: 'time', cellEditable: this.canAlertStartEdit
            },

            {
                fieldName: this.translateService.translate('oidoffob.endreason'), field: 'endReasonCode', editable: true, width: 150,
                datatype: 'lov', domain: 'END_RSN_CODE',  cellEditable: this.canEndReasonDisable
            },

            {
                fieldName: this.translateService.translate('oidoffob.enddate'),
                field: 'endDatetime', datatype: 'date', editable: false, width: 150
            },

            {
                fieldName: this.translateService.translate('oidoffob.endtime'),
                field: 'endTime', editable: false, width: 150, datatype: 'time'
            },
            {
                fieldName: this.translateService.translate('oidoffob.status'), field: 'statusCode', editable: false, width: 150,
                datatype: 'text'
            },
            
        ];

        this.observationPeriodCheckDataColumnDef = [
            {
                fieldName: this.translateService.translate('oidoffob.checkid'), field: 'checkId', datatype: 'number',
                editable: false, width: 150 
            },
            {
                fieldName: this.translateService.translate('oidoffob.scheduledate'), required: true,
                field: 'scheduleDatetime', datatype: 'date', editable: false, width: 150 
            },
            {
                fieldName: this.translateService.translate('oidoffob.scheduletime'), required: true,
                field: 'scheduleTime', editable: false, width: 150, datatype: 'time'
            },
            {
                fieldName: this.translateService.translate('oidoffob.freq'), field: 'frequency', editable: false, width: 150,
                datatype: 'number' , 
            },
            {
                fieldName: this.translateService.translate('oidoffob.checkdate'), required: true,
                field: 'checkDatetime', datatype: 'date', editable: true, width: 150, cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oidoffob.checktime'), required: true,
                field: 'checkTime', editable: true, width: 150, datatype: 'time', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oidoffob.variance'), field: 'variance', editable: false, width: 150,
                datatype: 'number', format: '1.2-2'
            },
            {
                fieldName: this.translateService.translate('oidoffob.userid'), field: 'userId', editable: false, width: 150,
                datatype: 'text', uppercase: false, 
            },
            {
                fieldName: this.translateService.translate('oidoffob.details'), field: 'idbutton', datatype: 'launchbutton', editable: true, width: 100,
                 data: 'row', updateField: 'row', modal: true, onLaunchClick: this.onAdditionalDetailsClick
            },


        ];
        this.sysPflExecuteQuery();
    }

    canEndReasonDisable = (data: any, index: number, field: string): boolean => {
        if (data.statusCode === 'EXPIRED' && data.statusCodeTemp === 'EXPIRED') {
            return false;
        } else {         
                return true;          
        }
    }

    canEndDateDisable = (data: any, index: number, field: string): boolean => {
        if (data.statusCode === 'EXPIRED') {
            return false;
        } else {         
                return true;          
        }
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.checkTime && data.checkDatetime && data.modifyUserId) {
            return false;
        } else {
            if(this.observationTypePeriodModel.statusCode === 'ACTIVE')
            {
                return true;
            } else {
                return false;
            }
        }
    }

    canAlertStartEdit = (data: any, index: number, field: string): boolean => {
        if(data.createDatetime && this.systemProfModel && this.systemProfModel.profileValue === 'Y'){
            if(data.checkRecordCount === 1){
                return true;
            } else {
                return false;
            }
         } else if(!data.createDatetime){
            return true;
         }
         else {
            return false;
         }
    }
    get checkDataCount (){
        this.observationPeriodCheckData.forEach(element => {
            if(element.checkDatetime && element.checkTime && element.userId){
                return false;
            }          
        });
       return true;     
    }
    obsTypeEdit= (data: any, index: number, field: string): boolean => {
        if (data.createDatetime) {
            return false;
        } else {         
                return true;
        }
    }
    disableCell = (data: any, index: number): boolean => {
        if (this.observationTypePeriodModel.endDatetime) {
          return true;
        } else {
          return false;
        }
      }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.endDatetime) {
            return false;
        } else {
            return true;
        }
    }
    onGridInsert = () => {
        if(this.insertValidationCount){
            this.show(this.translateService.translate('oidoffob.offendernotinobservationhousinglocation'), 'warn');
            return;
        }

        if(this.insertValidationCountActive){
            this.show(this.translateService.translate('oidoffob.offendermustbehousedinactiveobservationzone'), 'warn');
            return;
        }

        if(this.offenderObservationPeriodData && this.offenderObservationPeriodData.length > 0){
            let count = 0;
            this.offenderObservationPeriodData.forEach(e => {
                if(e.statusCode === 'ACTIVE'){
                    count++;
                }
            });

            if(count > 0 ){
                this.show(this.translateService.translate('oidoffob.offenderobservationperiodactiveonlyoneatatime'), 'warn');
                return;
            }
        }
        this.observationPeriodCheckData = [];
        this.observationTypePeriodCheckModel =new OffObsPeriodChecks();
        return { statusCode: 'ACTIVE', startDatetime: DateFormat.getDate(), startTime: DateFormat.getDate()};
    }

    onOffenderChange(offender) {
        // this.clear();
        if (offender) {
            this.offenderObservationPeriodData = [];
            this.observationPeriodCheckData = [];
            this.vHeaderBlockModel = offender;
            this.getOffenderPeriodExecuteQuery();
            this.getOffenderLivningUnitIdCount(this.vHeaderBlockModel.offenderBookId);
            this.getOffenderLivningUnitIdCountNotInLocation(this.vHeaderBlockModel.offenderBookId, this.sessionManager.currentCaseLoad);
            // this.retrieveEmDetails();         
        } else {
            this.offenderObservationPeriodData = [];
            this.observationPeriodCheckData = [];
            this.insertValidationCount = true;
            this.insertValidationCountActive = true;
            this.vHeaderBlockModel = new VHeaderBlock();
        }
    }

    /* clear() {
        this.vHeaderBlockModel = new VHeaderBlock();
    } */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }


    getOffenderPeriodExecuteQuery() {
        this.endDateValidationCount = 0;
        this.observationTypePeriodSearchModel = new OffenderObservationPeriods();
        this.observationTypePeriodSearchModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.oidoffobFactory.getOffenderPeriodExecuteQuery(this.observationTypePeriodSearchModel).subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(element => {
                    element.startTime = DateFormat.getDate(element.startDatetime);
                    element['startDateTemp'] = element.startDatetime;
                    element['statusCodeTemp'] = JSON.parse(JSON.stringify(element.statusCode));
                    if (element.endDatetime) {
                        this.endDateValidationCount++;
                        element.endTime = DateFormat.getDate(element.endDatetime);
                        let hours = DateFormat.getDate(element.endTime).getHours();
                        let min = DateFormat.getDate(element.endTime).getMinutes();
                        if (hours == 0 && min == 0) {
                            element.endTime = undefined;
                        }
                    }
                });
                this.offenderObservationPeriodData = data;
                this.offenderObservationPeriodTempData = JSON.parse(JSON.stringify(data));
                this.observationTypePeriodModel = data[0];
                this.offenderObservationPeriodIndex = 0;
            } else {
                this.offenderObservationPeriodData = [];
            }

        });
    }

    onRowClickweeklyoffenderObservationPeriod(event) {
        if (event) {
            this.observationTypePeriodModel = event;
            this.eoffenderService.selectedRowData = event;
            if (this.observationTypePeriodModel.endReasonCode) {
                this.offenderObservation.requiredOn('endTime');
                this.offenderObservation.requiredOn('endDatetime');
                this.offenderObservation.requiredOn('endReasonCode');              
            } else {
               
                this.offenderObservation.requiredOff('endTime');
                this.offenderObservation.requiredOff('endReasonCode'); 
                this.offenderObservation.requiredOff('endDatetime');  
            }
            this.getObservationPeriodsChecksExecuteQuery();
            this.getObservationTypeDetails();
        }else{
            this.eoffenderService.selectedRowData = null;
        }
    }
    onRowClickObservationPeriodCheck(event){
    if(event){
    this.observationTypePeriodCheckModel=event;
    }
    }
    getObservationPeriodsChecksExecuteQuery() {
        this.observationTypePeriodCheckSearchModel.offenderBookId = this.observationTypePeriodModel.offenderBookId;
        this.observationTypePeriodCheckSearchModel.obsPeriodId = this.observationTypePeriodModel.obsPeriodId;
        this.observationTypePeriodCheckSearchModel.obsTypeVersionId = this.observationTypePeriodModel.obsTypeVersionId;
        const serviceObj = this.oidoffobFactory.getOffenderPeriodCheckExecuteQuery(this.observationTypePeriodCheckSearchModel).subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(element => {
                    element.scheduleTime = DateFormat.getDate(element.scheduleDatetime);
                    if(element.checkDatetime){
                        let a = DateFormat.getDate(element.scheduleTime);
                        //var b = DateFormat.getDate(event.data.checkTime);
                        element.checkTime = DateFormat.getDate(element.checkDatetime);
                        element.checkTime = DateFormat.getDate(element.checkTime.setSeconds(0,0))
                        let varianceTemp = ((element.checkTime.valueOf() - a.valueOf())-element.frequency)/60000;

                        // let scheMin = TimeFormat.getTimeInMinutes(element.scheduleTime);
                        // let checkMin = TimeFormat.getTimeInMinutes(element.checkTime);
                        // const finalMinutes = Number(Number(checkMin) - Number(scheMin));
                        // const fiM = (finalMinutes < 0) ? finalMinutes * -1 : finalMinutes;
                        if(varianceTemp < 0){
                            element.variance = 0;
                        } else {
                            element.variance = varianceTemp; 
                        }
                    } else {
                        element.userId=undefined;
                    }
                    element.idbutton = '...';
                })
                this.observationPeriodCheckData = data;
                this.observationTypePeriodCheckModel =data[0];
                this.observationPeriodCheckIndex = 0;
            } else {
                this.observationPeriodCheckData = [];
            }

        });
    }
    validateRowDataPeriod = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event && event.field === 'activityDate') {
            this.offenderObservation.setColumnData('activityDate', index, undefined);
            rowdata.validated = true;
            return rowdata;
        }
        if (event && event.field === 'obsTypeVersionIdTemp') {
            this.observationTypeModel = new OffenderObservationTypes();
            this.observationTypeModel.obsTypeVersionId = Number(event.data.obsTypeVersionIdTemp);
            const serviceObj = this.oidoffobFactory.getObservatioTypeData(this.observationTypeModel);
            serviceObj.subscribe(data => {
                if (data.length > 0) {
                    this.offenderObservation.setColumnData('frequency', index, data[0].frequency);
                    this.offenderObservation.setColumnData('notificationFlag', index, data[0].notificationFlag === 'Y' ? true : false);
                    this.offenderObservation.setColumnData('notificationTiming', index, data[0].notificationTiming );
                    rowdata.validated = true;
                    return rowdata;
                }
            });
            rowdata.validated = true;
            return rowdata;
        }
        if(event && (event.field === 'startDatetime' || event.field === 'startTime') ){
         if(event.data.createDatetime && event.data.startTime){
          if(this.systemProfModel.profileValue === 'Y' && this.systemProfModel.profileValue2!=null){
            let date = DateFormat.getDate(event.data.startDatetime).getDate();
            let month = DateFormat.getDate(event.data.startDatetime).getMonth();
            let year = DateFormat.getDate(event.data.startDatetime).getFullYear();
            let finalStartDate =  DateFormat.getDate(DateFormat.getDate(event.data.startTime).setFullYear(year,month,date)); 
            let compareDataDate = DateFormat.getDate(DateFormat.getDate(event.data.startDateTemp).setSeconds(0,0));
            finalStartDate =DateFormat.getDate(DateFormat.getDate(finalStartDate).setSeconds(0,0));
            let varianceTemp = ((compareDataDate.valueOf() - finalStartDate.valueOf())-Number(this.systemProfModel.profileValue2))/60000;
            if(varianceTemp>Number(this.systemProfModel.profileValue2)){
                this.show(this.translateService.translate('Back dated time cannot exceed the configured value in system profile'), 'warn');
                }
            rowdata.validated = true;
            return rowdata;
         }
         } else {
            if(!event.data.createDatetime && event.data.startTime){
                if(this.systemProfModel.profileValue === 'Y' && this.systemProfModel.profileValue2!=null){
                    let date = DateFormat.getDate(event.data.startDatetime).getDate();
                    let month = DateFormat.getDate(event.data.startDatetime).getMonth();
                    let year = DateFormat.getDate(event.data.startDatetime).getFullYear();
                    let finalStartDate =  DateFormat.getDate(DateFormat.getDate(event.data.startTime).setFullYear(year,month,date)); 
                    finalStartDate =DateFormat.getDate(DateFormat.getDate(finalStartDate).setSeconds(0,0));
                    let varianceTemp = ((DateFormat.getDate().valueOf()-finalStartDate.valueOf())-Number(this.systemProfModel.profileValue2))/60000;
                    if(varianceTemp>Number(this.systemProfModel.profileValue2)){
                        this.show(this.translateService.translate('Back dated time cannot exceed the configured value in system profile'), 'warn');
                    }
                    rowdata.validated = true;
                    return rowdata;
            }
        }
    }
}
        if (event && event.field === 'endReasonCode') {
            if(event.data.endReasonCode){
                this.offenderObservation.requiredOn('endTime');
                this.offenderObservation.requiredOn('endDatetime');
                this.offenderObservation.requiredOn('endReasonCode');
                this.offenderObservation.setColumnData('endDatetime', index, DateFormat.getDate());
                this.offenderObservation.setColumnData('endTime', index, DateFormat.getDate());
                this.offenderObservation.setColumnData('statusCode', index, 'EXPIRED');
                rowdata.validated = true;
                return rowdata;
            } else {
                this.offenderObservation.requiredOff('endTime');
                this.offenderObservation.requiredOff('endDatetime');
                this.offenderObservation.requiredOff('endReasonCode');
                this.offenderObservation.setColumnData('statusCode', index, 'ACTIVE');
                this.offenderObservation.setColumnData('endTime', index, undefined);
                this.offenderObservation.setColumnData('endDatetime', index, undefined);
                rowdata.validated = true;
                return rowdata;
            }
            
        }
        rowdata.validated = true;
        return rowdata;

    }

    validateRowDataPeriodCheck = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event && event.field === 'checkTime' || event.field === 'checkDatetime') {
            if(event.data.scheduleTime && event.data.checkDatetime && event.data.checkTime){
                if(event.newValue != event.oldValue){                  
                    let a = DateFormat.getDate(event.data.scheduleTime);
                    let date = DateFormat.getDate(event.data.checkDatetime).getDate();
                    let month = DateFormat.getDate(event.data.checkDatetime).getMonth();
                    let year = DateFormat.getDate(event.data.checkDatetime).getFullYear();
                    let finalCheckTime =  DateFormat.getDate(DateFormat.getDate(event.data.checkTime).setFullYear(year,month,date));
                    finalCheckTime =DateFormat.getDate(DateFormat.getDate(finalCheckTime).setSeconds(0,0));
                    let varianceTemp = ((finalCheckTime.valueOf() - a.valueOf())-event.data.frequency)/60000;
                    if(varianceTemp < 0){
                        this.offenderObservationCheck.setColumnData('variance', index, 0);
                    } else {
                        this.offenderObservationCheck.setColumnData('variance', index, varianceTemp);
                    }
                    rowdata.validated = true;
                    return rowdata;
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    offenderObservationPeriodDataCommit(event) {
        this.observationTypePeriodInsertList = event.added;
        this.observationTypePeriodUpdatetList = event.updated;
        this.observationTypePeriodDeleteList = event.removed;
        this.observationTypePeriodCommitBean.insertList = [];
        this.observationTypePeriodCommitBean.updateList = [];
        this.observationTypePeriodCommitBean.deleteList = [];
        if (this.observationTypePeriodInsertList.length > 0 || this.observationTypePeriodUpdatetList.length > 0) {
            
            for (let i = 0; i < this.observationTypePeriodInsertList.length; i++) {
                if(this.observationTypePeriodInsertList[i].endDatetime){
                    if(!this.observationTypePeriodInsertList[i].endTime){
                        this.show(this.translateService.translate('oidoffob.endtimemustbeenterd'), 'warn');
                        return false;
                    }

                    if(!this.observationTypePeriodInsertList[i].endReasonCode){
                        this.show(this.translateService.translate('oidoffob.endreasoncodemustbeentered'), 'warn');
                        return false;
                    }
                }

                this.observationTypePeriodInsertList[i].obsTypeVersionId = (Number(this.observationTypePeriodInsertList[i].obsTypeVersionIdTemp));
                this.observationTypePeriodInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                if (this.observationTypePeriodInsertList[i].startTime) {
                    let hours = DateFormat.getDate(this.observationTypePeriodInsertList[i].startTime).getHours();
                    let min = DateFormat.getDate(this.observationTypePeriodInsertList[i].startTime).getMinutes();
                    let tempMin = Number(this.observationTypePeriodInsertList[i].frequency);
                    let data = Number(min) + Number(tempMin);
                    this.observationTypePeriodInsertList[i].scheduleDate = DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodInsertList[i].startDatetime).setHours(hours, data, 0));

                    let startHours = DateFormat.getDate(this.observationTypePeriodInsertList[i].startTime).getHours();
                    let startMinutes = DateFormat.getDate(this.observationTypePeriodInsertList[i].startTime).getMinutes();
                    let startSeconds = DateFormat.getDate(this.observationTypePeriodInsertList[i].startTime).getSeconds();
                    this.observationTypePeriodInsertList[i].startDatetime = DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodInsertList[i].startDatetime).setHours(startHours, startMinutes, 0, 0));
                }
                if (this.observationTypePeriodInsertList[i].endTime) {
                    let endHours = DateFormat.getDate(this.observationTypePeriodInsertList[i].endTime).getHours();
                    let endMinutes = DateFormat.getDate(this.observationTypePeriodInsertList[i].endTime).getMinutes();
                    let endSeconds = DateFormat.getDate(this.observationTypePeriodInsertList[i].endTime).getSeconds();
                    this.observationTypePeriodInsertList[i].endDatetime = DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodInsertList[i].endDatetime).setHours(endHours, endMinutes, 0, 0));
                }
                if (this.observationTypePeriodInsertList[i].startDatetime && this.vHeaderBlockModel.bookingBeginDate) {
                    if (DateFormat.compareDateTime(DateFormat.getDate(this.observationTypePeriodInsertList[i].startDatetime),
                        DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                        this.show(this.translateService.translate('oidoffob.offobsperiodstartdatecannot'), 'warn');
                        return false;

                    }
                }
                this.observationTypePeriodInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                if (this.observationTypePeriodInsertList[i].startDatetime && this.observationTypePeriodInsertList[i].endDatetime) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.observationTypePeriodInsertList[i].endDatetime),
                        DateFormat.getDate(this.observationTypePeriodInsertList[i].startDatetime)) === -1) {
                        this.show(this.translateService.translate('oidoffob.offobsperiodstartdatemustbebeforetheenddate'), 'warn');
                        return false;
                    }
                }

                if (this.observationTypePeriodInsertList[i].startDatetime) {
                    if (DateFormat.compareDateTime(DateFormat.getDate(),
                    DateFormat.getDate(this.observationTypePeriodInsertList[i].startDatetime)) === -1) {
                        this.show(this.translateService.translate('oidoffob.usercannotenterfuturedate'), 'warn');
                        return false;
                    }
                }

                if (this.offenderObservationPeriodTempData.length > 0) {
                    for (let j = 0; j < this.offenderObservationPeriodTempData.length; j++) {
                        if (this.observationTypePeriodInsertList[i] && this.observationTypePeriodInsertList[i].startDatetime && this.offenderObservationPeriodTempData[j].endDatetime) {
                            if (DateFormat.compareDateTime(DateFormat.getDate(this.observationTypePeriodInsertList[i].startDatetime),
                                    DateFormat.getDate(this.offenderObservationPeriodTempData[j].endDatetime)) === -1) {
                                this.show(this.translateService.translate('oidoffob.offobsperiodstartdatemustbeaftertheenddateofalreadyexistingperiod'), 'warn');
                                return false;
                            }
                        }
                    }
                }
                
                if(this.observationTypePeriodInsertList[i].startDatetime && this.observationTypePeriodInsertList[i].startTime){
                    if(this.systemProfModel.profileValue === 'Y' && this.systemProfModel.profileValue2!=null){
                      let date = DateFormat.getDate(this.observationTypePeriodInsertList[i].startDatetime).getDate();
                      let month = DateFormat.getDate(this.observationTypePeriodInsertList[i].startDatetime).getMonth();
                      let year = DateFormat.getDate(this.observationTypePeriodInsertList[i].startDatetime).getFullYear();
                      let finalStartDate =  DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodInsertList[i].startTime).setFullYear(year,month,date)); 
                      finalStartDate =DateFormat.getDate(DateFormat.getDate(finalStartDate).setSeconds(0,0));
                      let varianceTemp = ((DateFormat.getDate().valueOf() - finalStartDate.valueOf())-Number(this.systemProfModel.profileValue2))/60000;
                      if(varianceTemp>Number(this.systemProfModel.profileValue2)){
                          this.show(this.translateService.translate('Back dated time cannot exceed the configured value in system profile'), 'warn');
                          return false; 
                        }
                   }
                   }

                this.observationTypePeriodCommitBean.insertList = this.observationTypePeriodInsertList;
            }
            for (let i = 0; i < this.observationTypePeriodUpdatetList.length; i++) {
                if(this.observationTypePeriodUpdatetList[i].endDatetime){
                    if(!this.observationTypePeriodUpdatetList[i].endTime){
                        this.show(this.translateService.translate('oidoffob.endtimemustbeenterd'), 'warn');
                        return false;
                    }

                    if(!this.observationTypePeriodUpdatetList[i].endReasonCode){
                        this.show(this.translateService.translate('oidoffob.endreasoncodemustbeentered'), 'warn');
                        return false;
                    }
                }
                this.observationTypePeriodUpdatetList[i].obsTypeVersionId = (Number(this.observationTypePeriodUpdatetList[i].obsTypeVersionId));
                if (this.observationTypePeriodUpdatetList[i].startTime) {
                    let startHours = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startTime).getHours();
                    let startMinutes = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startTime).getMinutes();
                    let startSeconds = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startTime).getSeconds();
                    this.observationTypePeriodUpdatetList[i].startDatetime = DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime).setHours(startHours, startMinutes, 0, 0));
                }
                if (this.observationTypePeriodUpdatetList[i].endTime) {
                    let endHours = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].endTime).getHours();
                    let endMinutes = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].endTime).getMinutes();
                    let endSeconds = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].endTime).getSeconds();
                    this.observationTypePeriodUpdatetList[i].endDatetime = DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodUpdatetList[i].endDatetime).setHours(endHours, endMinutes, 0, 0));
                }

                if (this.observationTypePeriodUpdatetList[i].startDatetime && this.vHeaderBlockModel.bookingBeginDate) {
                    if (DateFormat.compareDateTime(DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime),
                        DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                        this.show(this.translateService.translate('oidoffob.offobsperiodstartdatecannot'), 'warn');
                        return false;

                    }
                }

                if (!this.observationTypePeriodUpdatetList[i].endDatetime && this.observationTypePeriodUpdatetList[i].startDatetime && this.observationTypePeriodUpdatetList[i]['startDateTemp'] && this.observationTypePeriodUpdatetList[i].startDatetime.toString() !=  DateFormat.getDate(this.observationTypePeriodUpdatetList[i]['startDateTemp']).toString() && this.systemProfModel.profileValue !== 'Y') {
                    if (DateFormat.compareDateTime(DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime),DateFormat.getDate(DateFormat.getDate().setSeconds(0,0))) === -1) {
                        this.show(this.translateService.translate('oidoffob.offobsperiodstartdatecannotbeforcurentdate'), 'warn');
                        return false;

                    }
                }
                if (this.observationTypePeriodUpdatetList[i].startDatetime && this.observationTypePeriodUpdatetList[i].endDatetime) {
                    if (DateFormat.compareDateTime(DateFormat.getDate(this.observationTypePeriodUpdatetList[i].endDatetime),
                        DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime)) === -1) {
                        this.show(this.translateService.translate('oidoffob.offobsperiodstartdatemustbebeforetheenddate'), 'warn');
                        return false;
                    }
                }

                if (this.offenderObservationPeriodTempData.length > 0) {
                    for (let j = 0; j < this.offenderObservationPeriodTempData.length; j++) {
                        if(this.observationTypePeriodUpdatetList[i] && this.observationTypePeriodUpdatetList[i].startDatetime && this.offenderObservationPeriodTempData[j].endDatetime){
                        if (DateFormat.compareDateTime(DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime),
                                DateFormat.getDate(this.offenderObservationPeriodTempData[j].endDatetime)) === -1) {
                            this.show(this.translateService.translate('oidoffob.offobsperiodstartdatemustbeaftertheenddateofalreadyexistingperiod'), 'warn');
                            return false;
                        }
                    }
                    }
                }

                

                if (this.observationTypePeriodUpdatetList[i].startTime) {
                    let startHours = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startTime).getHours();
                    let startMinutes = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startTime).getMinutes();
                    let startSeconds = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startTime).getSeconds();
                    this.observationTypePeriodUpdatetList[i].startDatetime = DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime).setHours(startHours, startMinutes, startSeconds, 0));
                }
                if (this.observationTypePeriodUpdatetList[i].endTime) {
                    let endHours = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].endTime).getHours();
                    let endMinutes = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].endTime).getMinutes();
                    let endSeconds = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].endTime).getSeconds();
                    this.observationTypePeriodUpdatetList[i].endDatetime = DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodUpdatetList[i].endDatetime).setHours(endHours, endMinutes, endSeconds, 0));
                }

                /* if (!this.observationTypePeriodUpdatetList[i].endDatetime && this.observationTypePeriodUpdatetList[i].startDatetime  
                    && (DateFormat.compareDateTime(DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime), 
                    DateFormat.getDate()) === -1)) {
                    this.show(this.translateService.translate('oidoffob.starttimemustbegretaerthancurenttime'), 'warn');
                    return false;
                } */
                
                if (this.observationTypePeriodUpdatetList[i].startDatetime) {
                    if (DateFormat.compareDateTime(DateFormat.getDate(),
                    DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime)) === -1) {
                        this.show(this.translateService.translate('oidoffob.usercannotenterfuturedate'), 'warn');
                        return false;
                    }
                }

                if(this.observationTypePeriodUpdatetList[i].startDatetime && this.observationTypePeriodUpdatetList[i].startTime){
                    if(this.systemProfModel.profileValue === 'Y' && this.systemProfModel.profileValue2!=null){
                      let date = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime).getDate();
                      let month = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime).getMonth();
                      let year = DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startDatetime).getFullYear();
                      let finalStartDate =  DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodUpdatetList[i].startTime).setFullYear(year,month,date)); 
                      let compareDataDate = DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodUpdatetList[i]['startDateTemp']).setSeconds(0,0));
                      finalStartDate =DateFormat.getDate(DateFormat.getDate(finalStartDate).setSeconds(0,0));
                      let varianceTemp = ((compareDataDate.valueOf() - finalStartDate.valueOf())-Number(this.systemProfModel.profileValue2))/60000;
                      if(varianceTemp>Number(this.systemProfModel.profileValue2)){
                          this.show(this.translateService.translate('Back dated time cannot exceed the configured value in system profile'), 'warn');
                          return false; 
                        }
                   }
                   }
                this.observationTypePeriodCommitBean.updateList = this.observationTypePeriodUpdatetList;

            }
        }
        if (this.observationTypePeriodDeleteList.length > 0) {
            for (let i = 0; i < this.observationTypePeriodDeleteList.length; i++) {
                this.observationTypePeriodCommitBean.deleteList = this.observationTypePeriodDeleteList;
            }
        }

        const omsroleSaveData = this.oidoffobFactory.offenderObservationPeriodDataCommit(this.observationTypePeriodCommitBean);
        omsroleSaveData.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.show(this.translateService.translate('oimoffob.rowalreadyexistswithsamedata'), 'warn');
                this.getOffenderPeriodExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.getOffenderPeriodExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.getOffenderPeriodExecuteQuery();
                return;
            }
        });
    }
    /* onGridClear = () => {
        this.getOffenderPeriodExecuteQuery();
        this.getOffenderLivningUnitIdCount(this.vHeaderBlockModel.offenderBookId);
    } */


    offenderObservationCheckDataCommit(event) {
        // this.observationTypePeriodInsertList = event.added;
        this.observationPeriodCheckUpdatetList = event.updated;
        this.observationPeriodCheckDeleteList = event.removed;

        this.offObsPeriodCheckscommitBean.insertList = [];
        this.offObsPeriodCheckscommitBean.updateList = [];
        this.offObsPeriodCheckscommitBean.deleteList = [];
        if (this.observationPeriodCheckUpdatetList.length > 0) {
            for (let i = 0; i < this.observationPeriodCheckUpdatetList.length; i++) {
                if (!this.observationPeriodCheckUpdatetList[i].checkDatetime) {
                    this.show(this.translateService.translate('oidoffob.checkdatemustbeentered'), 'warn');
                    return false;
                }
                if (!this.observationPeriodCheckUpdatetList[i].checkTime) {
                    this.show(this.translateService.translate('oidoffob.checktimemustbeentered'), 'warn');
                    return false;
                }
                if (this.observationPeriodCheckUpdatetList[i].checkTime) {
                    let hours = DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkTime).getHours();
                    let min = DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkTime).getMinutes();
                    let tempMin = Number(this.observationPeriodCheckUpdatetList[i].frequency);
                    let data = Number(min) + Number(tempMin);
                    this.observationPeriodCheckUpdatetList[i].nextScheduleDate = DateFormat.getDate(DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkDatetime).setHours(hours, data, 0));

                    let startHours = DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkTime).getHours();
                    let startMinutes = DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkTime).getMinutes();
                    let startSeconds = DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkTime).getSeconds();
                    this.observationPeriodCheckUpdatetList[i].checkDatetime = DateFormat.getDate(DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkDatetime).setHours(startHours, startMinutes, 0, 0));
                }
                if (this.observationTypePeriodModel.endDatetime && this.observationTypePeriodModel.endTime) {

                    let endHoursPeriod = DateFormat.getDate(this.observationTypePeriodModel.endTime).getHours();
                    let endMinutesPeriod = DateFormat.getDate(this.observationTypePeriodModel.endTime).getMinutes();
                    let endSecondsPeriod = DateFormat.getDate(this.observationTypePeriodModel.endTime).getSeconds();
                    let observationPeriodEndDate = DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodModel.endDatetime).setHours(endHoursPeriod, endMinutesPeriod, 0, 0));

                    let endHours = DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkTime).getHours();
                    let endMinutes = DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkTime).getMinutes();
                    let endSeconds = DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkTime).getSeconds();
                    let periodEndDate = DateFormat.getDate(DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkDatetime).setHours(endHours, endMinutes, 0, 0));
                    if (DateFormat.compareDateTime(DateFormat.getDate(observationPeriodEndDate),
                        DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkDatetime)) === -1) {
                        this.show(this.translateService.translate('oidoffob.offobscheckdatemustbebeforetheobservationperiodenddatetime'), 'warn');
                        return false;
                    }
                    if (DateFormat.compareDateTime(DateFormat.getDate(observationPeriodEndDate),
                        DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].nextScheduleDate)) === -1) {
                        this.show(this.translateService.translate('oidoffob.nextcheckscheduledatevalidation'), 'warn');
                        return false;
                    }


                }
               
                let startHours = DateFormat.getDate( this.observationTypePeriodModel.startTime).getHours();
                let startMinutes = DateFormat.getDate(this.observationTypePeriodModel.startTime).getMinutes();
                let startSeconds = DateFormat.getDate(this.observationTypePeriodModel.startTime).getSeconds();

                let periodStartDateTime=DateFormat.getDate(DateFormat.getDate(this.observationTypePeriodModel.startDatetime).setHours(startHours, startMinutes, 0, 0));
                if (periodStartDateTime && this.observationPeriodCheckUpdatetList[i].checkDatetime  
                    && (DateFormat.compareDateTime(DateFormat.getDate(this.observationPeriodCheckUpdatetList[i].checkDatetime), 
                    DateFormat.getDate(periodStartDateTime)) === -1)) {
                    this.show(this.translateService.translate('oidoffob.checkdatetimemustbegreaterthantheoffenderobservationperiodstartdatetime'), 'warn');
                    return false;
                } 

                this.offObsPeriodCheckscommitBean.updateList = this.observationPeriodCheckUpdatetList;
            }
        }
        const omsroleSaveData = this.oidoffobFactory.offenderObservationCheckDataCommit(this.offObsPeriodCheckscommitBean);
        omsroleSaveData.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.show(this.translateService.translate('oimoffob.rowalreadyexistswithsamedata'), 'warn');
                this.getObservationPeriodsChecksExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.getOffenderPeriodExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.getObservationPeriodsChecksExecuteQuery();
                return;
            }
        });



    }

    onAdditionalDetailsClick = (event) => {
        this.observationTypePeriodChildCheckModel =new OffObsPeriodChecks();
        this.observationTypePeriodChildCheckModel=event;
        this.additionalCheckCharxecuteQuery();
    }

    getObservationTypeDetails(){
        this.dailogData = {};
            const serviceObj = this.oidoffobFactory.getObservatioTypeData(this.observationTypePeriodModel);
                serviceObj.subscribe(data => {
                    if (data.length > 0) {
                        data.forEach(element => {
                            element.activeFlag = element.activeFlag === 'Y' ? true : false;
                            element.cellConditionFlag = element.cellConditionFlag === 'Y' ? true : false;
                            element.activityFlag = element.activityFlag === 'Y' ? true : false;
                            element.demeanorFlag = element.demeanorFlag === 'Y' ? true : false;
                            element.notInCellFlag = element.notInCellFlag === 'Y' ? true : false;
                            element.officerNotesFlag = element.officerNotesFlag === 'Y' ? true : false;
                        });  
                        this.dailogData = data[0];
                    }
                });
    }

    get insertPeriodGrid(){
        if(this.vHeaderBlockModel.offenderBookId){
            return true;
        } else {
            return false;
        }
    }

    getOffenderLivningUnitIdCount(event){
        const serviceObj = this.oidoffobFactory.getOffenderLivningUnitIdCount(event);
        serviceObj.subscribe(data  => {
            if(data && data > 0){
                this.insertValidationCount = false;
            }else{
                this.insertValidationCount = true;
            }
        });
    }

    getOffenderLivningUnitIdCountNotInLocation(event,caseloadId){
        const serviceObj = this.oidoffobFactory.getOffenderLivningUnitIdCountNotInLocation(event, caseloadId);
        serviceObj.subscribe(data  => {
            if(data && data > 0){
                this.insertValidationCountActive = false;
            }else{
                this.insertValidationCountActive = true;
            }
        });
    }

    backClick (){
        this.oidoffobFactory.backButton = true;
        this.oidoffobFactory.searchParam = this.observationInquiryParam;
        this.router.navigate(['/OIIOFFOB']);
    }

    additionalCheckCharxecuteQuery() {
        const payLoad = {};
        payLoad['obsTypeVersionId'] = this.observationTypePeriodChildCheckModel.obsTypeVersionId;
        payLoad['checkId'] = this.observationTypePeriodChildCheckModel.checkId;
            const serviceObj = this.oidoffobFactory.additionalCheckCharxecuteQuery(payLoad);
            serviceObj.subscribe(data => {
                if (data.length > 0) {
                    this.cellConditionList = data[0].cellConditionList;
                    this.activityList = data[0].activityList;
                    this.commonDetailsCatList = data[0].commonDetailsCatList;
                    this.notInCellList = data[0].notInCellList;
                }else{
                    this.cellConditionList = [];
                    this.activityList = [];
                    this.commonDetailsCatList = [];
                    this.notInCellList = [];
                }
                if(this.offenderObservationCheck.updatedMap.size > 0 || this.offenderObservationCheck.addedMap.size > 0){
                    this.show('oidoffob.pleasesavetheentereddetailsinchecksgrid', 'warn');
                    return;
                } else {
                    this.popUpOpen();
                }
            });
    }

    popUpOpen(){
        const PayLoad = {};
        PayLoad['obsTypeVersionId'] = this.observationTypePeriodModel.obsTypeVersionId;
        PayLoad['checkId'] = this.observationTypePeriodChildCheckModel.checkId;
        PayLoad['maintainanceData'] = this.dailogData;
        PayLoad['offenderBookId'] = this.vHeaderBlockModel.offenderBookId;
        PayLoad['obsPeriodId'] = this.observationTypePeriodChildCheckModel.obsPeriodId;
        PayLoad['commentText'] = this.observationTypePeriodChildCheckModel.commentText;
        PayLoad['cellConditionList'] = this.cellConditionList;
        PayLoad['activityList'] = this.activityList;
        PayLoad['commonDetailsCatList'] = this.commonDetailsCatList;
        PayLoad['notInCellList'] = this.notInCellList;
        PayLoad['status'] =this.observationTypePeriodModel.statusCode;
        PayLoad['performingStaffId']= this.observationTypePeriodChildCheckModel.performingStaffId;
        this.dialogService.openLinkDialog('/OIDOOBAD', PayLoad, 80).subscribe(res => {
            this.getObservationPeriodsChecksExecuteQuery();
        });
    }

    onGridClear = () => {
        this.getOffenderPeriodExecuteQuery();
    }

    sysPflExecuteQuery() {
        this.oidoffobFactory.sysPflExecuteQuery().subscribe(data => {
            if (data.length > 0) {
                this.systemProfModel = data[0];   
                console.log('System Profile Back Dated Data'+this.systemProfModel);      
            } else {
                this.systemProfModel = new SystemProfiles();
            }
        });
    }
    ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }
}
