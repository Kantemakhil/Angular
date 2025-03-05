import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { OffenderSentenceAdjustmentCommitBean } from '@inst/legal-screens/maintenance/beans/OffenderSentenceAdjustmentCommitBean';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OidcustadService } from '../service/oidcustad.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderSentenceAdjustment } from '@inst/legal/beans/OffenderSentenceAdjustment';
import { Router } from '@angular/router';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { LoginService } from '@common/login/service/login.service';
import { OcdlegloService } from '@inst/legal/service/ocdleglo.service';
import { DatePipe } from '@angular/common';
import { AppConstants } from '@core/classes/appConstants';

@Component({
    selector: 'app-oidcustad',
    templateUrl: './oidcustad.component.html',

})
export class OidcustadComponent implements OnInit {
    @ViewChild('bookings', { static: true }) bookingsGrid: any;
    @ViewChild('sentence', { static: true }) sentenceGrid: any;
    @ViewChild('ocdleglogrid', { static: true }) ocdleglogrid: any;
    vHeaderBlockModel: VTrustHeader = new VTrustHeader();
    bookingsData: OffenderSentenceAdjustment[] = [];
    bookingsColumnDef: any[] = [];
    bookingsInsertList: OffenderSentenceAdjustment[] = [];
    bookingsUpdateList: OffenderSentenceAdjustment[] = [];
    msgs: any[] = [];
    code: any;
    bookingsModel: OffenderSentenceAdjustment = new OffenderSentenceAdjustment();
    bookingsCommitModel: OffenderSentenceAdjustmentCommitBean = new OffenderSentenceAdjustmentCommitBean();
    routerChild: any[] = [];
    routerpath: string[] = [];
    duration: number;
    insertFlag: boolean;
    bookingsDeleteList: OffenderSentenceAdjustment[] = [];
    resultData: number;
    bookingsReadOnly: boolean;
    amount: number;
    commentReadOnly: boolean;
    bookingsUpdateTempList: OffenderSentenceAdjustment[] = [];
    commentText: string;
    sentenceIndex = -1;
    usagecode: string;
    chargesColdef: any[];
    myJsonRowData: any[];
    dataId: any;
    sentenceColumnDef: any[] = [];
    sentenceData: OffenderSentenceAdjustment[] = [];
    sentenceInsertList: OffenderSentenceAdjustment[] = [];
    sentenceDeleteList: OffenderSentenceAdjustment[] = [];
    sentenceUpdateList: OffenderSentenceAdjustment[] = [];
    sentenceInsertFlag: boolean;
    sentencecommentText: string;
    sentenceReadOnly: boolean;
    remissiondays: number;
    debitcreditcode: any;
    sentenceModel: OffenderSentenceAdjustment = new OffenderSentenceAdjustment();
    index: number;
    debitValue: any;
    selectedRow: any;
    sentenceCommitModel: OffenderSentenceAdjustmentCommitBean = new OffenderSentenceAdjustmentCommitBean();
    sentenceFlag: boolean;
    calucateFlag:boolean;
    calucateSentenceFlag:boolean;
    adjustDaysTemp: number;
    popupFlag:boolean;
    manualFlag:boolean;
    saveFlag: boolean;
    initialAdjustmentData = [];
    rdDays: Number;
    remissionEligiblity:string;
    checked: boolean;
    remissionFlag: boolean;
    sentenceEligibityFlag: boolean;
    orderGridIndex : any;
    sentRemisIndex: any;
    bookingRemisIndex: any;
    popupSentenceFlag: boolean;
    selectedTabIndex: any;
    deleteBookingReadOnly:boolean;
    deleteSentencesReadOnly:boolean;
    bookingsDurationFlag:boolean;
    sentenceDurationFlag:boolean;
    tempTabIndex: any;
    toDate: any;
    initalJsonRowData : any [] = [];
    deleteRemissionList : any [] = [];
    isDurationPopupUsed : boolean = false;      
    sentTypeList: any[] = [];
        constructor(private oidcustadFactory: OidcustadService, private offenderSearchService: OffenderSearchService, public translateService: TranslateService, private router: Router, private dialogService: DialogService, private loginService: LoginService, private OcdlegloFactory: OcdlegloService,public datepipe: DatePipe) { 
        this.sentenceFlag=true;
    }

    ngOnInit() {
        this.chargesColdef = [];
        this.myJsonRowData = [];
        this.bookingsData = [];
        this.sentenceData = [];
        this.insertFlag = false;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.bookingsReadOnly = true;
        this.commentReadOnly = true;
        this.sentenceReadOnly = true;
        this.resultData=undefined;
        this.sentenceFlag=true;
        this.calucateFlag=false;
        this.calucateSentenceFlag=false;
        this.bookingsDurationFlag=false;
        this.sentenceDurationFlag=false;
        this.manualFlag=false;
        this.selectedTabIndex = 0;
        this.loadChargesColDefData();
        this.bookingsColumnDef = [
            { fieldName: '', field: '', editable: false, width: 150, hide: true },
            {
                fieldName: this.translateService.translate('oidcustad.adjustmentType'), field: 'adjustCode',
                editable: true, width: 100, datatype: 'lov', required: true, link: 'oidcustad/getBookingCodes', cellEditable: this.canDomainCellEdit, source: 'OIMSATYP'
            },
            {
                fieldName: this.translateService.translate('oidcustad.transctionType'), field: 'adjustCodeType', editable: false, width: 80,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidcustad.PostedDate'), field: 'adjustDate', editable: true, datatype: 'date', required: true
            },
            {
                fieldName: this.translateService.translate('oidcustad.fromDate'), field: 'adjustFromDate',
                editable: true, width: 190, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oidcustad.toDate'), field: 'adjustToDate', editable: true, width: 40, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oidcustad.duration'), field: 'adjustDays', datatype: 'number', editable: true, required: true, whole: true,cellEditable: this.canDurationEdit
            },
            {
                fieldName: this.translateService.translate(''), field: 'button', datatype: 'hyperlink', link: '/RemissionDuration', displayas: 'href',
                editable: true, width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: '70%',
                styleClass: 'launch', type: '', onLaunchClick: this.asnLaunchClick
            },
            { fieldName: '', field: 'commentText', editable: false, width: 150, hide: true },
            { fieldName: '', field: 'usageCode', editable: false, width: 150, hide: true },
            { fieldName: '', field: 'rdYears', editable: false, width: 150, hide: true,datatype: 'number' },
            { fieldName: '', field: 'rdMonths', editable: false, width: 150, hide: true,datatype: 'number' },
            { fieldName: '', field: 'rdWeeks', editable: false, width: 150, hide: true,datatype: 'number' },
            { fieldName: '', field: 'rdDays', editable: false, width: 150, hide: true,datatype: 'number' },

            {
                field: 'rdYears',  editable: true, width: 190, datatype: 'number', maxValue: 9999.9, format: '1.1-1', strictFP: true, whole: true, hide: true
            },
            {
                field: 'rdMonths',editable: true, width: 190, datatype: 'number', maxValue: 9999.9, format: '1.1-1', strictFP: true, whole: true, hide: true
            },
            {
                field: 'rdWeeks',  editable: true, width: 150,  maxValue: 9999, format: '1.1-1',minValue: 0, strictFP: true, whole: true, datatype: 'number',hide: true
            },
            {
                field: 'rdDays',editable: true, width: 190, datatype: 'number', maxValue: 9999, format: '1.1-1', minValue: 0, strictFP: true, whole: true,hide: true
            }
        ];

        this.sentenceColumnDef = [
            { fieldName: '', field: '', editable: false, width: 150, hide: true },
            {
                fieldName: this.translateService.translate('oidcustad.adjustmentType'), field: 'adjustCode',
                editable: true, width: 100, datatype: 'lov', required: true, link: 'oidcustad/getSentnceCodes', cellEditable: this.sentenceCellEditat, source: 'OIMSATYP'
            },
            {
                fieldName: this.translateService.translate('oidcustad.transctionType'), field: 'adjustCodeType', editable: false, width: 80,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidcustad.PostedDate'), field: 'adjustDate', editable: true, width: 120,
                datatype: 'date', required: true
            },
            {
                fieldName: this.translateService.translate('oidcustad.fromDate'), field: 'adjustFromDate',
                editable: true, width: 190, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oidcustad.toDate'), field: 'adjustToDate', editable: true, width: 40, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oidcustad.duration'), field: 'adjustDays', datatype: 'number', editable: true, required: true, whole: true,cellEditable: this.sentenceDurationEdit
            },
            {
                fieldName: this.translateService.translate(''), field: 'button', datatype: 'hyperlink', link: '/RemissionDuration', displayas: 'href',
                editable: true, width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: '70%',
                styleClass: 'launch', type: '', onLaunchClick: this.sentenceLaunchClick
            },
            { fieldName: '', field: 'commentText', editable: false, width: 150, hide: true },
            { fieldName: '', field: 'objectId', editable: false, width: 150, hide: true },
            { fieldName: '', field: 'usageCode', editable: false, width: 150, hide: true },
            { fieldName: '', field: 'rdYears', editable: false, width: 150, hide: true,datatype: 'number' },
            { fieldName: '', field: 'rdMonths', editable: false, width: 150, hide: true,datatype: 'number' },
            { fieldName: '', field: 'rdWeeks', editable: false, width: 150, hide: true,datatype: 'number' },
            { fieldName: '', field: 'rdDays', editable: false, width: 150, hide: true,datatype: 'number' },
            { fieldName: '', field: 'offenderBookId', editable: false, width: 150, hide: true,datatype: 'number' },
            { fieldName: '', field: 'objectType', editable: false, width: 150, hide: true,datatype: 'text' },

        ];

        const SentTypeData = this.OcdlegloFactory.populateSentType('CUST');
        SentTypeData.subscribe(data => {
            if (data && data.length > 0) {
                this.sentTypeList = data;
            } 
        });
       
    }

    asnLaunchClick = (event) => {
        let rdDays, rdYears, rdMonths, rdWeeks, totaldays;
        const index = this.bookingsData.indexOf(event);
        let selAdj = JSON.parse(JSON.stringify(this.bookingsData[index]));
        selAdj.rdDays=(!selAdj.rdDays || isNaN(selAdj.rdDays))?0:selAdj.rdDays;
        selAdj.rdWeeks=(!selAdj.rdWeeks || isNaN(selAdj.rdWeeks))?0:selAdj.rdWeeks;
        selAdj.rdMonths=(!selAdj.rdMonths || isNaN(selAdj.rdMonths))?0:selAdj.rdMonths;
        selAdj.rdYears=(!selAdj.rdYears || isNaN(selAdj.rdYears))?0:selAdj.rdYears;
        if(selAdj.rdDays ==0 &&selAdj.rdWeeks ==0 && selAdj.rdMonths == 0 &&  selAdj.rdYears == 0){
            selAdj['overallDuration'] = event.adjustDays;
        }
        this.dialogService.openLinkDialog('RemissionDuration',selAdj).subscribe(resData => {
            if (resData) {
                this.popupFlag=true;
                this.resultData = resData['duration'];
                if(resData.terms[0] && (resData.terms[0]['rdYears'] || resData.terms[0]['rdMonths'] || resData.terms[0]['rdWeeks'] || resData.terms[0]['rdDays']) ){
                    resData.terms[0]['rdYears']=  Number(resData.terms[0]['rdYears']);
                    resData.terms[0]['rdMonths']=  Number(resData.terms[0]['rdMonths']);
                    resData.terms[0]['rdWeeks']=  Number(resData.terms[0]['rdWeeks']);
                    resData.terms[0]['rdDays']=  Number(resData.terms[0]['rdDays']);
                    this.bookingsGrid.setColumnData('rdYears',index,resData.terms[0]['rdYears']);
                    this.bookingsGrid.setColumnData('rdMonths', index,resData.terms[0]['rdMonths']);
                    this.bookingsGrid.setColumnData('rdWeeks', index, resData.terms[0]['rdWeeks']);
                    this.bookingsGrid.setColumnData('rdDays',index, resData.terms[0]['rdDays']);
                    this.bookingsDurationFlag=true;
                }
                this.isDurationPopupUsed = true;
                this.bookingsGrid.setColumnData('adjustDays', index,Math.round( this.resultData));
                if (event.adjustFromDate && this.leapYear(DateFormat.getDate(event.adjustFromDate).getFullYear())) {
                    if (resData.terms[0]['rdMonths']) {
                        rdMonths =  this.getdays(DateFormat.getDate(event.adjustFromDate).getMonth(), DateFormat.getDate(event.adjustFromDate).getFullYear())*(resData.terms[0]['rdMonths']);
                    }
                    if (resData.terms[0]['rdYears']) {
                        rdYears = resData['duration']+1;
                    }
                    if (rdDays || rdYears || rdMonths || rdWeeks) {
                        if (rdDays && rdYears && rdMonths && rdWeeks)
                            totaldays = rdDays + rdYears + rdMonths + rdWeeks;
                        else if (rdYears && rdMonths && rdWeeks)
                            totaldays = rdYears + rdMonths + rdWeeks;
                        else if (rdMonths && rdWeeks)
                            totaldays = rdMonths + rdWeeks;
                        else if (rdDays)
                            totaldays = rdDays;
                        else if (rdYears)
                            totaldays = rdYears;
                        else if (rdMonths)
                            totaldays = rdMonths;
                        else if (rdWeeks)
                            totaldays = rdWeeks;
                        if (event.adjustFromDate && event.adjustToDate) {
                            this.bookingsGrid.setColumnData('adjustDays', index, undefined);
                        }
                        this.bookingsGrid.setColumnData('adjustDays', index, Math.round(totaldays));
                    }
                    this.adjustDaysTemp=Math.round(totaldays);
                  
                } else {
                    this.bookingsGrid.setColumnData('adjustDays', index, Math.round(this.resultData));
                }

            }else{
                this.popupFlag=false;
                this.bookingsDurationFlag=false;
                this.bookingsGrid.setColumnData('rdYears', event.rowIndex, undefined);
                this.bookingsGrid.setColumnData('rdMonths', event.rowIndex, undefined);
                this.bookingsGrid.setColumnData('rdWeeks', event.rowIndex, undefined);
                this.bookingsGrid.setColumnData('rdDays', event.rowIndex, undefined);
            }
        });
    }

    sentenceLaunchClick = (event) => {
        let rdDays, rdYears, rdMonths, rdWeeks, totaldays;
        const index = this.sentenceData.indexOf(event);
        let selAdj = JSON.parse(JSON.stringify(this.sentenceData[index]));
        selAdj.rdDays=(!selAdj.rdDays || isNaN(selAdj.rdDays))?0:selAdj.rdDays;
        selAdj.rdWeeks=(!selAdj.rdWeeks || isNaN(selAdj.rdWeeks))?0:selAdj.rdWeeks;
        selAdj.rdMonths=(!selAdj.rdMonths || isNaN(selAdj.rdMonths))?0:selAdj.rdMonths;
        selAdj.rdYears=(!selAdj.rdYears || isNaN(selAdj.rdYears))?0:selAdj.rdYears;
        if(selAdj.rdDays ==0 &&selAdj.rdWeeks ==0 && selAdj.rdMonths == 0 &&  selAdj.rdYears == 0){
            selAdj['overallDuration'] = event.adjustDays;
        }
        this.dialogService.openLinkDialog('RemissionDuration', selAdj).subscribe(resData => {
            if (resData) {
                this.popupSentenceFlag=true;
                this.resultData = resData['duration'];
                if(resData.terms[0] && (resData.terms[0]['rdYears'] || resData.terms[0]['rdMonths'] || resData.terms[0]['rdWeeks'] || resData.terms[0]['rdDays']) ){
                    resData.terms[0]['rdYears']=  Number(resData.terms[0]['rdYears']);
                    resData.terms[0]['rdMonths']=  Number(resData.terms[0]['rdMonths']);
                    resData.terms[0]['rdWeeks']=  Number(resData.terms[0]['rdWeeks'])
                    resData.terms[0]['rdDays']=  Number(resData.terms[0]['rdDays'])
                    this.sentenceGrid.setColumnData('rdYears', index, resData.terms[0]['rdYears']);
                    this.sentenceGrid.setColumnData('rdMonths', index, resData.terms[0]['rdMonths']);
                    this.sentenceGrid.setColumnData('rdWeeks', index, resData.terms[0]['rdWeeks']);
                    this.sentenceGrid.setColumnData('rdDays', index, resData.terms[0]['rdDays']);
                    this.sentenceDurationFlag=true;
                }
                this.isDurationPopupUsed = true;
                this.sentenceGrid.setColumnData('adjustDays', index, Math.round(this.resultData));
                if (event.adjustFromDate && this.leapYear(DateFormat.getDate(event.adjustFromDate).getFullYear())) {

                    if (resData.terms[0]['rdMonths']) {
                       rdMonths =  this.getdays(DateFormat.getDate(event.adjustFromDate).getMonth(), DateFormat.getDate(event.adjustFromDate).getFullYear())*(resData.terms[0]['rdMonths']);
                    }
                    if (resData.terms[0]['rdYears']) {
                        rdYears = resData['duration']+1;
                    }
                    if (rdDays || rdYears || rdMonths || rdWeeks) {
                        if (rdDays && rdYears && rdMonths && rdWeeks)
                            totaldays = rdDays + rdYears + rdMonths + rdWeeks;
                        else if (rdYears && rdMonths && rdWeeks)
                            totaldays = rdYears + rdMonths + rdWeeks;
                        else if (rdMonths && rdWeeks)
                            totaldays = rdMonths + rdWeeks;
                        else if (rdDays)
                            totaldays = rdDays;
                        else if (rdYears)
                            totaldays = rdYears;
                        else if (rdMonths)
                            totaldays = rdMonths;
                        else if (rdWeeks)
                            totaldays = rdWeeks;
                        if (event.adjustFromDate && event.adjustToDate) {
                            this.sentenceGrid.setColumnData('adjustDays', index, undefined);
                        }
                        this.sentenceGrid.setColumnData('adjustDays', index, Math.round(totaldays));
                    }
                    this.adjustDaysTemp=Math.round(totaldays);
                  
                } else {
                    this.sentenceGrid.setColumnData('adjustDays', index, Math.round(this.resultData));
                }

            }else{
                this.popupSentenceFlag=false;
                this.sentenceGrid.setColumnData('rdYears', event.rowIndex, undefined);
                this.sentenceGrid.setColumnData('rdMonths', event.rowIndex, undefined);
                this.sentenceGrid.setColumnData('rdWeeks', event.rowIndex, undefined);
                this.sentenceGrid.setColumnData('rdDays', event.rowIndex, undefined);
                this.sentenceDurationFlag = false;
            }
        });
    }

    onOffenderChange(offender) {
        this.bookingsData = [];
        this.sentenceData = [];
        this.sentenceInsertFlag = false;
        this.oidcustadFactory.getRemissionEligibility().subscribe(val=>{
         const emreData = val.find(item => item.code === 'EMRE');
        const derdData = val.find(item => item.code === 'DERD');
        if(emreData){
            if(emreData.value ==='YES'){
                this.remissionEligiblity = emreData.value;
                this.bookingsReadOnly=false;
            this.sentenceEligibityFlag=false;
            }else if(emreData.value==='NO'){
                this.remissionEligiblity =undefined;
                this.bookingsReadOnly=true;
                this.sentenceEligibityFlag=true;
                this.ocdleglogrid.gridOptions.columnApi.setColumnVisible('remission', false);
            }
        }             
        if(derdData && derdData.value==='NO'){               
                this.ocdleglogrid.gridOptions.columnApi.setColumnVisible('erd', false);
            }               

        });
        if (offender) {
            this.insertFlag = true;
            this.vHeaderBlockModel = offender;
            this.bookingsExecuteQuery(this.vHeaderBlockModel.offenderBookId);
        } else {
            this.vHeaderBlockModel = null;
            this.insertFlag = false;
            this.bookingsData = [];
            this.commentText = null;
            this.sentencecommentText = null;
            this.sentenceData = [];
            this.myJsonRowData=[];
            this.bookingsReadOnly = true;
            this.bookingsModel = new OffenderSentenceAdjustment();
        }
    }


    onRowClickoffnotes(event) {
        let remissionTemp:boolean;
        if (event) {
            this.manualFlag = event['adjustCode'] === 'ESCP' && this.vHeaderBlockModel['movementReason'] === 'ESCP' && event['sealFlag'] === 'Y' ? false : true;
            remissionTemp = this.bookingsModel.remissionFlag;
            this.bookingsModel = new OffenderSentenceAdjustment();
            this.bookingsModel = event;
                this.bookingsModel.remissionFlag = remissionTemp;
            this.commentText = this.bookingsModel['commentText'];
            this.bookingsModel['duration'] = Math.abs(this.amount);
            if(event.usageCode){
                if (event.usageCode && event.usageCode === 'BKG') {
                    this.bookingsGrid.requiredOn('adjustFromDate');
                } else if (event.usageCode && event.usageCode === 'BKG_REMISS') {
                    this.bookingsGrid.requiredOff('adjustFromDate');
                }
            }else{
                this.bookingsGrid.requiredOff('adjustFromDate'); 
            }
           
            this.commentReadOnly=false;
            if(this.bookingsModel.adjustCode==='BKG_INI_RM'){
                this.deleteBookingReadOnly=false;
            }else if(this.bookingsModel.createDatetime){
                this.deleteBookingReadOnly=true;
            }else{
                this.deleteBookingReadOnly=false;
            }
        } else {
            this.bookingsModel = new OffenderSentenceAdjustment();
            this.commentReadOnly = true;
        }
    }

    onSentenceRowClickoffnotes(event) {
        if (event) {
            this.sentenceModel = new OffenderSentenceAdjustment();
            this.sentenceModel = event;
            this.sentencecommentText = this.sentenceModel['commentText'];
            if(event.usageCode){
                if (event.usageCode && event.usageCode ==='SENT') {
                    this.sentenceGrid.requiredOn('adjustFromDate');
                }else if(event.usageCode && event.usageCode ==='SENT_REMISS'){
                    this.sentenceGrid.requiredOff('adjustFromDate');
                }
            }else{
                this.sentenceGrid.requiredOff('adjustFromDate');
            }
               
            this.sentenceReadOnly=false;
            if(this.sentenceModel.adjustCode==='SENT_INI_REM'){
                this.deleteSentencesReadOnly=false;
            }else if(this.sentenceModel.createDatetime){
                this.deleteSentencesReadOnly=true;
            }else{
                this.deleteSentencesReadOnly=false;
            }
        } else {
            this.sentenceModel = new OffenderSentenceAdjustment();
            this.sentenceReadOnly=true;
        }
    }


    onGridInsert = () => {
        if(!this.validation(this.bookingsData,"BOOKINGS")){
            return false;
        }
        this.bookingRemisIndex = this.bookingsData.length;
        let intialData=this.bookingsData.filter(data=>data['adjustCode']==='BKG_INI_RM');
        if (intialData && intialData.length>0) {
            return { adjustDate: DateFormat.getDate(), button: '' };
        } else if(this.bookingsModel['remissionFlag'] && intialData.length==0){
            return { adjustCode: 'BKG_INI_RM', adjustCodeType: 'Credit', adjustDate: DateFormat.getDate(), button: '',usageCode: 'BKG_REMISS' };
        }else{
           return { button: ''};
        }
    }

    onSentenceGridInsert = () => {
        this.sentenceReadOnly = false;
        let intialData=this.sentenceData.filter(data=>data['adjustCode']==='SENT_INI_REM');
        this.sentRemisIndex = this.sentenceData.length;
        if (intialData && intialData.length>0) {
            return {  adjustDate: DateFormat.getDate(), button: '', objectId: this.selectedRow.orderNo, offenderBookId : this.vHeaderBlockModel.offenderBookId, objectType: 'CUST'} ;
        } else if(this.selectedRow['remission'] && intialData.length==0){
            return {adjustCode: 'SENT_INI_REM', adjustCodeType: 'Credit', adjustDate: DateFormat.getDate(), button: '', objectId: this.selectedRow.orderNo, offenderBookId : this.vHeaderBlockModel.offenderBookId,objectType: 'CUST', usageCode : 'SENT_REMISS'} ;
        }else{
           return { button: '' , offenderBookId : this.vHeaderBlockModel.offenderBookId,objectType: 'CUST', objectId: this.selectedRow.orderNo};
        }
    }
    

    validation(data: any,gridName):boolean  {
        for (let i =0; i<data.length; i++){
            if (gridName==='BOOKINGS' && !data[i].adjustFromDate && data[i]['usageCode'] == 'BKG') {
                this.show(this.translateService.translate('oidcustad.fromDatemustbe'), 'warn');
                return false;
            }
        }
        return true;
    }


    save() {
        this.bookingsCommitModel = new OffenderSentenceAdjustmentCommitBean();
        const bookingsEvent = { added: [], updated: [], removed: [] };
        const sentenceEvent = { added: [], updated: [], removed: [] };
        if (this.bookingsGrid) {
            const added = [];
            this.bookingsGrid.addedMap.forEach(key => {
                added.push(key);
            });
            const updated = [];
            this.bookingsGrid.updatedMap.forEach(value => {
                updated.push(value);
            });
            const removed = [];
            this.bookingsGrid.removedMap.forEach((value, keys) => {
                removed.push(value);
            });
            bookingsEvent.added = JSON.parse(JSON.stringify(added));
            bookingsEvent.updated = JSON.parse(JSON.stringify(updated));
            bookingsEvent.removed = JSON.parse(JSON.stringify(removed));
        }

        if (this.sentenceGrid && this.selectedTabIndex == 1) {
            let tempAdjustment = this.setGridOperations();
            let oldInd = this.myJsonRowData.indexOf(this.selectedRow);
            if(oldInd != -1) {
                this.myJsonRowData[oldInd]['adjustmentData'] = JSON.parse(JSON.stringify(tempAdjustment));
            }
            this.sentenceCommit(sentenceEvent);
        }

        if (this.selectedTabIndex == 0 && (bookingsEvent.added.length > 0 || bookingsEvent.updated.length > 0 || bookingsEvent.removed.length > 0)) {
            this.bookingsCommit(bookingsEvent);
        }
    }

    bookingsCommit(event) {
        this.bookingsInsertList = event.added;
        this.bookingsUpdateList = event.updated;
        this.bookingsDeleteList = event.removed;
        this.bookingsCommitModel.insertList = [];
        this.bookingsCommitModel.updateList = [];
        this.bookingsCommitModel.deleteList = [];
        if (!this.bookingsDurationFlag) {
            this.bookingsGrid.setColumnData('rdYears', event.rowIndex, undefined);
            this.bookingsGrid.setColumnData('rdMonths', event.rowIndex, undefined);
            this.bookingsGrid.setColumnData('rdWeeks', event.rowIndex, undefined);
            this.bookingsGrid.setColumnData('rdDays', event.rowIndex, undefined);
        }
        let creditList = this.bookingsData.filter(data => data['adjustCodeType'] === 'Credit');
        let debitList = this.bookingsData.filter(data => data['adjustCodeType'] === 'Debit');
        let totalCredit = 0;
        let totalDebit = 0;
        let totalEscape=0;let totalreturnescape=0; let duration:number=0;
        if(creditList && debitList && creditList.length>0 || debitList.length>0){
            creditList.forEach(credit=>{
                if(credit['adjustCode']!=='BKG_INI_RM' && credit['usageCode']==="BKG_REMISS"){
                    totalCredit=totalCredit+Number(credit['adjustDays']);
                }
            });
            debitList.forEach(debit=>{
                if(debit['usageCode']==="BKG_REMISS"){
                    totalDebit=totalDebit+Number(debit['adjustDays']);
                }
            })

            if(totalDebit!=0 && totalCredit !=0 && totalDebit<totalCredit){
                this.show(this.translateService.translate('oidcustad.remissionmore'), 'warn');
                return;
            }
            if(totalDebit!=0 && totalCredit !=0 && totalCredit>totalDebit){
                this.show(this.translateService.translate('oidcustad.remissionmore'), 'warn');
                return;
            }
        }


        let escList = this.bookingsData.filter(data => data['adjustCode'] === 'ESCP');
        let returnEscapeList = this.bookingsData.filter(data => data['adjustCode'] === 'R_ESCP');
        if(escList && returnEscapeList && escList.length>0 || returnEscapeList.length>0){
            escList.forEach(esc=>{
                if(esc['adjustCode']!=='BKG_INI_RM'){
                    totalEscape=totalEscape+Number(esc['adjustDays']);
                }
            });

            returnEscapeList.forEach(reescp=>{
                if(reescp['adjustCode']!=='BKG_INI_RM'){
                    totalreturnescape=totalreturnescape+Number(reescp['adjustDays']);
                }
            })


            if(totalEscape!=0 && totalreturnescape!=0 && totalreturnescape>totalEscape){
                this.show(this.translateService.translate('oidcustad.escapemore'), 'warn');
                return;
            }
        }

        if (this.getBookingRemissionDuration() < 0) {
            this.show(this.translateService.translate('oidcustad.lossofremission'), 'warn');
            return;
        }

        if (this.bookingsInsertList.length > 0) {
            for (let i = 0; i < this.bookingsInsertList.length; i++) {
                if (!this.bookingsInsertList[i].adjustCode) {
                    this.show(this.translateService.translate('oidcustad.adjustmentypemust'), 'warn');
                    return;
                }

                if (!this.bookingsInsertList[i].adjustDate) {
                    this.show(this.translateService.translate('oidcustad.postdatemust'), 'warn');
                    return;
                }
                if (!this.bookingsInsertList[i].adjustFromDate && this.bookingsInsertList[i]['usageCode'] == 'BKG') {
                    this.show(this.translateService.translate('oidcustad.fromDatemustbe'), 'warn');
                    return;
                }
                if (this.bookingsInsertList[i].adjustFromDate && this.bookingsInsertList[i].adjustToDate && DateFormat.compareDate(DateFormat.getDate(this.bookingsInsertList[i].adjustFromDate), DateFormat.getDate(this.bookingsInsertList[i].adjustToDate)) === 1) {
                    this.show(this.translateService.translate('oidcustad.fromdatecannotbelater'), 'warn');
                    return;
                }
                if (this.bookingsInsertList[i].adjustFromDate && DateFormat.compareDate(DateFormat.getDate(this.bookingsInsertList[i].adjustFromDate), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidcustad.fromdatecannotbefuturedate'), 'warn');
                    return;
                }


                if (this.bookingsInsertList[i].adjustDate && DateFormat.compareDate(DateFormat.getDate(this.bookingsInsertList[i].adjustDate), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidcustad.posteddatecannotbefuturedate'), 'warn');
                    return;
                }

                if (this.bookingsInsertList[i].adjustToDate && DateFormat.compareDate(DateFormat.getDate(this.bookingsInsertList[i].adjustToDate), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidcustad.todatecannotbefuturedate'), 'warn');
                    return;
                }
                if (this.bookingsInsertList[i].adjustDays===undefined  || this.bookingsInsertList[i].adjustDays===null) {
                    this.show(this.translateService.translate('oidcustad.durationmust'), 'warn');
                    return;
                }
                this.bookingsInsertList[i]['objectType'] = 'BOOKING';
                this.bookingsInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;

            }
        }

        if (this.bookingsUpdateList.length > 0) {
            for (let i = 0; i < this.bookingsUpdateList.length; i++) {
                if (!this.bookingsUpdateList[i].adjustCode) {
                    this.show(this.translateService.translate('oidcustad.adjustmentypemust'), 'warn');
                    return;
                }
                if (!this.bookingsUpdateList[i].adjustDate) {
                    this.show(this.translateService.translate('oidcustad.postdatemust'), 'warn');
                    return;
                }
                if (this.bookingsUpdateList[i].adjustDays===undefined || this.bookingsUpdateList[i].adjustDays===null) {
                    this.show(this.translateService.translate('oidcustad.durationmust'), 'warn');
                    return;
                }
                if (!this.bookingsUpdateList[i].adjustFromDate && this.bookingsUpdateList[i]['usageCode'] == 'BKG') {
                    this.show(this.translateService.translate('oidcustad.fromDatemustbe'), 'warn');
                    return;
                }
                if (this.bookingsUpdateList[i].adjustFromDate && this.bookingsUpdateList[i].adjustToDate && DateFormat.compareDate(DateFormat.getDate(this.bookingsUpdateList[i].adjustFromDate), DateFormat.getDate(this.bookingsUpdateList[i].adjustToDate)) === 1) {
                    this.show(this.translateService.translate('oidcustad.fromdatecannotbelater'), 'warn');
                    return;
                }
                if (this.bookingsUpdateList[i].adjustFromDate && DateFormat.compareDate(DateFormat.getDate(this.bookingsUpdateList[i].adjustFromDate), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidcustad.fromdatecannotbefuturedate'), 'warn');
                    return;
                }
                if (this.bookingsUpdateList[i].adjustDate && DateFormat.compareDate(DateFormat.getDate(this.bookingsUpdateList[i].adjustDate), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidcustad.posteddatecannotbefuturedate'), 'warn');
                    return;
                }

                if (this.bookingsUpdateList[i].adjustToDate && DateFormat.compareDate(DateFormat.getDate(this.bookingsUpdateList[i].adjustToDate), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidcustad.todatecannotbefuturedate'), 'warn');
                    return;
                }

                if (this.bookingsUpdateList[i]['adjustCode'] !== 'BKG_INI_RM') {
                    if (this.bookingsUpdateList[i].usageCode === "BKG_REMISS" && this.bookingsUpdateList[i]['adjustCodeType'] && this.bookingsModel['duration'] && (this.bookingsUpdateList[i]['adjustCodeType'] === 'Debit' && this.bookingsModel['duration']<0)) {
                        this.show(this.translateService.translate('oidcustad.lossofremission'), 'warn');
                        return;
                    }

                    if (this.bookingsUpdateList[i].usageCode === "BKG_REMISS" && this.bookingsUpdateList[i].adjustDays && totalDebit != 0 && this.bookingsUpdateList[i].adjustCodeType === 'Credit' && this.bookingsUpdateList[i].adjustDays > totalDebit) {
                        this.show(this.translateService.translate('oidcustad.lossofremission'), 'warn');
                        return;
                    }

                }
            }
                }

        for (let i = 0; i < this.bookingsDeleteList.length; i++) {
            if(totalCredit!=0 && totalCredit!=0 && totalCredit>totalDebit){
                this.show(this.translateService.translate('oidcustad.remissionmore'), 'warn');
                return;
            }

            if(totalreturnescape!=0 && totalreturnescape!=0 && totalreturnescape>totalEscape){
                this.show(this.translateService.translate('oidcustad.escapemore'), 'warn');
                return;
            }

            if(escList.length==0 && totalreturnescape!=0 && this.bookingsDeleteList[i]['adjustCode']==="ESCP" && (this.bookingsDeleteList[i]['adjustDays']>=totalreturnescape)){
                this.show(this.translateService.translate('oidcustad.escapemore'), 'warn');
                return;
             }

            if(this.bookingsModel['remissionFlag'] && this.bookingsDeleteList[i]['adjustCode']==='BKG_INI_RM'){
                this.show(this.translateService.translate('oidcustad.intialcannotdelete'), 'warn');
                return;
             }
        }
        this.bookingsCommitModel.insertList = this.bookingsInsertList;
        this.bookingsCommitModel.updateList = this.bookingsUpdateList;
        this.bookingsCommitModel.deleteList = this.bookingsDeleteList;
       if(this.calucateFlag){
           this.calculateReason("BOOKINGS");
       }else{
        this.bookingSave();
       }

    }

    bookingSave(calculationResult?) {
        if(calculationResult){
            this.bookingsCommitModel.calcReason = JSON.stringify(calculationResult);
            this.bookingsCommitModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        }
        this.oidcustadFactory.bookingsCommit(this.bookingsCommitModel).subscribe(data => {
            if(data == 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'),'success');
            } else if(data != 0){
                let dlgData = {};
                if (data == 2) {
                    dlgData = {
                        heading: 'Warning',
                        label: this.translateService.translate('ocucalcr.userhaspendingcalcevents'),
                        yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('ocucalcr.warnok')
                    };
                } else if (data == 3) {
                    dlgData = {
                        heading: 'Warning',
                        label: this.translateService.translate('ocucalcr.applicationstatusdown'),
                        yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('ocucalcr.warnok')
                    };
                }
                if (Object.keys(dlgData).length>0) {
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50).subscribe(result => {
                    });
                }
                this.show(this.translateService.translate('ocdleglo.savedaspendingevent'));
            }  else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
            this.bookingsExecuteQuery(this.vHeaderBlockModel.offenderBookId);
            this.calucateFlag = false;
        })
    }

    calculateReason(gridName) {
        this.dialogService.openLinkDialog('/OCUCALCR', this.vHeaderBlockModel, 80).subscribe(result => {
            if (result && gridName === 'BOOKINGS') {
                this.bookingSave(result);
            }  else if (result && gridName === 'SENTENCE') {
                this.sentenceSave(result);
            } else if (!result && gridName === 'BOOKINGS') {
                let initialList=  this.bookingsData.filter(data=>data['adjustCode']==='BKG_INI_RM');
                  if(initialList && initialList.length>0){
                    this.bookingsModel['remissionFlag'] = true;
                  }else{
                    this.bookingsModel['remissionFlag'] = false;
                  }
            } else if (!result && gridName === 'SENTENCE') {
                if(this.selectedRow['remission']){
                    this.ocdleglogrid.setColumnData('remission',this.index,true);
                }

                let initialList=  this.sentenceData.filter(data=>data['adjustCode']==='SENT_INI_REM');
                if(initialList && initialList.length>0){
                    this.ocdleglogrid.setColumnData('remission',this.index,true);
                }else{
                    this.ocdleglogrid.setColumnData('remission',this.index,false);
                }
            }
        });
    }

    bookingsExecuteQuery(offenderBookId) {
        this.calucateFlag = false;
        let bookinngsData = [];
        let creditTotalDays:number= 0;
        let debitTotalDays:number= 0;
        this.initialAdjustmentData = [];
        this.sentenceData = [];
        this.bookingsData = [];
        this.deleteRemissionList = [];
        this.calucateSentenceFlag = false;
        this.oidcustadFactory.getbookingsdata(offenderBookId).subscribe(data => {
            if (data.length > 0) {
                this.bookingRemisIndex =0;
                data.forEach(ele => {
                    ele['button'] = '';
                });
                this.initialAdjustmentData = JSON.parse(JSON.stringify(data));
                bookinngsData = data.filter(val => val['objectType'] === 'BOOKING');
                if(bookinngsData.length>0){
                    bookinngsData.forEach(val => {
                        if(val['sealFlag']==='Y' && val['adjustDays']===0){
                            val['remissionFlag'] = false;
                            this.bookingsModel['remissionFlag'] = false;
                            this.duration=val['adjustDays'];
                            this.toDate=val['adjustToDate'];
                            this.checked=false;
                        }
                        if(val['debitCreditCode']==='CR'){
                            val['adjustCodeType']='Credit';
                        }else if(val['debitCreditCode']==='DR'){
                            val['adjustCodeType']='Debit';
                        }
                        if ( val['usageCode']==='BKG_REMISS' && val['adjustCodeType']==='Credit') {
                            creditTotalDays=creditTotalDays+Number(val['adjustDays']);
                        } else if(val['usageCode']==='BKG_REMISS' && val['adjustCodeType']==='Debit') {
                            debitTotalDays=debitTotalDays+Number(val['adjustDays']);
                        }
                        val['adjustDays']=Math.abs(val['adjustDays']);
                    });
    
                    this.bookingsData = bookinngsData;
                  let initialList=  this.bookingsData.filter(data=>data['adjustCode']==='BKG_INI_RM');
                  if(initialList && initialList.length>0){
                    this.bookingsModel['remissionFlag'] = true;
                  }else{
                    this.bookingsModel['remissionFlag'] = false;
                  }
                    this.amount=creditTotalDays-debitTotalDays;
                    this.bookingsModel['duration'] = Math.abs(this.amount);
                    this.insertFlag = true;
                    if(this.bookingsData.length==0){
                        this.commentText = undefined;
                        this.bookingsModel['remissionFlag'] = false;
                    }
                    if(bookinngsData.length>=1){
                        this.saveFlag=true;
                    }
                } else {
                   this.bookingsEmpty();
                }
        }else{
            this.bookingsEmpty(); 
        }
        setTimeout(() => {
            this.loadJsonData();
          },1000); 
        })
      
    }

bookingsEmpty(){
    this.bookingsData = [];
    this.insertFlag = true;
    this.commentText = undefined;
    this.commentReadOnly = true;
    this.bookingsModel['duration']=undefined;
    this.amount=0;
    this.bookingsGrid.requiredOff('adjustFromDate');
    this.bookingsModel = new OffenderSentenceAdjustment();
    this.saveFlag=false; 
}

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    bookingClear = () => {
        const updatedData = this.bookingsData.filter(ele => ele['updated'] === 'Y', []);
        if (updatedData && updatedData.length > 0) {
            this.bookingsGrid.clearRecords(this.bookingsGrid.gridOptions);
        }
        this.commentText = undefined;
        this.checked=false;
        this.bookingsGrid.requiredOff('adjustFromDate');
        this.bookingsExecuteQuery(this.vHeaderBlockModel.offenderBookId);
        return true;
    }


    sentenceClear = () => {
        this.bookingsExecuteQuery(this.vHeaderBlockModel.offenderBookId)
        /* const updatedData = this.sentenceData.filter(ele => ele['updated'] === 'Y', []);
        if (updatedData && updatedData.length > 0) {
            this.sentenceGrid.clearRecords(this.sentenceGrid.gridOptions);
        }
        this.sentencecommentText = undefined;
        this.sentenceGrid.requiredOff('adjustFromDate');
        let ind = this.myJsonRowData.indexOf(this.selectedRow);
        if(this.myJsonRowData[ind].remission &&  this.sentenceData.filter( i => i['adjustCode'] === "SENT_INI_REM"  && i['operation'] == 'I').length > 0){
           this.ocdleglogrid.setColumnData(ind, 'remission', false);
        }
        this.sentenceData */
        return true; 
    }


    bookingsvalidateRow = (event) => {
        let usageCode;
        const rowdata = new ValidateRowReturn();
        if ((( event.data.adjustCode == 'ESCP'&& this.manualFlag) || event.data.adjustCode !== 'ESCP') && (event.field === 'adjustFromDate' || event.field === 'adjustToDate' || event.field === 'adjustDays') ) {
                this.calucateFlag = true;
        }
        

        if (event.field === 'adjustCode' && event.data.adjustCode) {
            if(event.data.adjustCode==='BKG_LR'){
                let data=this.bookingsData.filter(data=>data['adjustCode']==='BKG_INI_RM');
                if(data && data.length===0){
                  this.show(this.translateService.translate('oidcustad.actionnotallowed'), 'warn');
                    this.bookingsGrid.setColumnData('adjustCode', event.rowIndex, undefined);
                    this.bookingsGrid.clearRecords();
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            
            if(event.data.adjustCode==='R_ESCP'){
                let data=this.bookingsData.filter(data=>data['adjustCode']==='ESCP');
                if(data && data.length===0){
                    this.show(this.translateService.translate('oidcustad.actionnotallowed'), 'warn');
                    this.bookingsGrid.setColumnData('adjustCode', event.rowIndex, undefined);
                    this.bookingsGrid.clearRecords();
                    rowdata.validated = true;
                    return rowdata;
                }
            }

            if(event.data.adjustCode==='BKG_RLR'){
                let data=this.bookingsData.filter(data=>data['adjustCode']==='BKG_LR');
                if(data && data.length===0){
                  this.show(this.translateService.translate('oidcustad.actionnotallowed'), 'warn');
                    this.bookingsGrid.setColumnData('adjustCode', event.rowIndex, undefined);
                    this.bookingsGrid.clearRecords();
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            this.oidcustadFactory.getDebitorCreditCode(event.data.adjustCode).subscribe(data => {
                if (data) {
                    let values = data.split(",");
                    let adjustCodeType = values[0];
                    usageCode =values[1];
                    if (usageCode === 'BKG_REMISS' && this.bookingsModel && this.bookingsModel['remissionFlag']===undefined) {
                        this.show(this.translateService.translate('oidcustad.actionnotallowed'), 'warn');
                        this.bookingsGrid.setColumnData('adjustCode', event.rowIndex, undefined);
                        rowdata.validated = true;
                        return rowdata;
                    }
                    this.bookingsGrid.setColumnData('adjustCodeType', event.rowIndex, adjustCodeType);
                    this.bookingsGrid.setColumnData('usageCode', event.rowIndex, usageCode);
                    if (usageCode && usageCode === 'BKG') {
                        this.bookingsGrid.requiredOn('adjustFromDate');
                    } else if (usageCode && usageCode === 'BKG_REMISS') {
                        this.bookingsGrid.requiredOff('adjustFromDate');
                    }
                }
            });
           
        }


        if (event.field==='adjustFromDate' || event.field==='adjustToDate' ) {

            if (event.data.adjustFromDate && DateFormat.compareDate(DateFormat.getDate(event.data.adjustFromDate), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oidcustad.fromdatecannotbefuturedate'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
            if (event.data.adjustFromDate && event.data.adjustToDate && DateFormat.compareDate(DateFormat.getDate(event.data.adjustFromDate), DateFormat.getDate(event.data.adjustToDate)) === 1) {
                this.show(this.translateService.translate('oidcustad.fromdatecannotbelater'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }

            if (event.data.adjustToDate && DateFormat.compareDate(DateFormat.getDate(event.data.adjustToDate), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oidcustad.todatecannotbefuturedate'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
            if(event.data.adjustFromDate && event.data.adjustToDate){
            let obj=new OffenderSentenceAdjustment();
            obj['adjustFromDate']=DateFormat.getDate(event.data.adjustFromDate);
            obj['adjustToDate']=DateFormat.getDate(event.data.adjustToDate);
            obj['adjustCodeType']=event.data.adjustCodeType;
            this.oidcustadFactory.caluculatedays(obj).subscribe(rdDays=>{
                if(rdDays || rdDays==0){
                    this.bookingsGrid.setColumnData('adjustDays',event.rowIndex,rdDays);
                }
            })
        }
            rowdata.validated = true;
            return rowdata;
        }

        if(event.field === 'adjustDays' && event.data.adjustDays){
            // this.bookingsGrid.setColumnData('adjustDays', event.rowIndex, event.data.adjustDays);
            if(event && !event.data.createDatetime && !this.isDurationPopupUsed){
                this.bookingsGrid.setColumnData('rdYears', event.rowIndex, undefined);
                this.bookingsGrid.setColumnData('rdMonths', event.rowIndex,undefined);
                this.bookingsGrid.setColumnData('rdWeeks', event.rowIndex, undefined);
                this.bookingsGrid.setColumnData('rdDays', event.rowIndex, undefined);
            }
            this.isDurationPopupUsed = false;
            rowdata.validated = true;
            return rowdata;
        }

        rowdata.validated = true;
        return rowdata;
    }


    sentencevalidateRow = (event) => {
        let usageCode;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'adjustFromDate' || event.field === 'adjustToDate' || event.field === 'adjustDays') {
            this.calucateSentenceFlag = true;
        }
        if (event.field === 'adjustCode' && event.data.adjustCode) {
            if(event.data.adjustCode==='SENT_LR'){
                let data=this.sentenceData.filter(data=>data['adjustCode']==='SENT_INI_REM');
                if(data && data.length===0){
                   this.show(this.translateService.translate('oidcustad.actionNotallowed'), 'warn');
                    this.sentenceGrid.setColumnData('adjustCode', event.rowIndex, undefined);
                    rowdata.validated = false;
                    return rowdata;
                }
            }

            if(event.data.adjustCode==='RAPP'){
                let data=this.sentenceData.filter(data=>data['adjustCode']==='APP');
                if(data && data.length===0){
                  this.show(this.translateService.translate('oidcustad.actionNotallowed'), 'warn');
                    this.sentenceGrid.setColumnData('adjustCode', event.rowIndex, undefined);
                    rowdata.validated = false;
                    return rowdata;
                }
            }

            if(event.data.adjustCode==='SENT_RLR'){
                let data=this.sentenceData.filter(data=>data['adjustCode']==='SENT_LR');
                if(data && data.length===0){
                    this.show(this.translateService.translate('oidcustad.actionNotallowed'), 'warn');
                    this.sentenceGrid.setColumnData('adjustCode', event.rowIndex, undefined);
                    rowdata.validated = false;
                    return rowdata;
                }
            }
            this.oidcustadFactory.getDebitorCreditCode(event.data.adjustCode).subscribe(data => {
                if (data) {
                    let values = data.split(",");
                    let adjustCodeType = values[0];
                    usageCode =values[1];
                    this.sentenceGrid.setColumnData('adjustCodeType', event.rowIndex, adjustCodeType);
                    this.sentenceGrid.setColumnData('usageCode', event.rowIndex, usageCode);
                    if (usageCode && usageCode === 'SENT') {
                        this.sentenceGrid.requiredOn('adjustFromDate');
                    } else if (usageCode && usageCode === 'SENT_REMISS') {
                        this.sentenceGrid.requiredOff('adjustFromDate');
                    }
                }
            })
        }
        if (event.field==='adjustFromDate' || event.field==='adjustToDate' ) {
            if (event.data.adjustFromDate && DateFormat.compareDate(DateFormat.getDate(event.data.adjustFromDate), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oidcustad.fromdatecannotbefuturedate'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
            if (event.data.adjustFromDate && event.data.adjustToDate && DateFormat.compareDate(DateFormat.getDate(event.data.adjustFromDate), DateFormat.getDate(event.data.adjustToDate)) === 1) {
                this.show(this.translateService.translate('oidcustad.fromdatecannotbelater'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }

            if (event.data.adjustToDate && DateFormat.compareDate(DateFormat.getDate(event.data.adjustToDate), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oidcustad.todatecannotbefuturedate'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
            if (event.data.adjustFromDate && event.data.adjustToDate) {
                let obj = new OffenderSentenceAdjustment();
                obj['adjustFromDate'] = DateFormat.getDate(event.data.adjustFromDate);
                obj['adjustToDate'] = DateFormat.getDate(event.data.adjustToDate);
                obj['adjustCodeType'] = event.data.adjustCodeType;
                this.oidcustadFactory.caluculatedays(obj).subscribe(rdDays => {
                    if (rdDays) {
                        this.sentenceGrid.setColumnData('adjustDays', event.rowIndex, rdDays);
                    }
                })
            }
            rowdata.validated = true;
            return rowdata;
        }
        if(event.field === 'adjustDays' && event.data.adjustDays){
            // this.sentenceGrid.setColumnData('adjustDays', event.rowIndex, event.data.adjustDays);
             if(event && !event.data.createDatetime && !this.isDurationPopupUsed){
                this.sentenceGrid.setColumnData('rdYears', event.rowIndex, undefined);
                this.sentenceGrid.setColumnData('rdMonths', event.rowIndex,undefined);
                this.sentenceGrid.setColumnData('rdWeeks', event.rowIndex, undefined);
                this.sentenceGrid.setColumnData('rdDays', event.rowIndex, undefined);
            }
            this.isDurationPopupUsed = false;
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }


    get affDisableFlag() {
        if (this.bookingsGrid.addedMap.size > 0 || this.bookingsGrid.updatedMap.size > 0 ||
            this.bookingsGrid.removedMap.size > 0) {
            return false;
        }
        if (JSON.stringify(this.myJsonRowData) != JSON.stringify(this.initalJsonRowData)) {
            return false;
        }
        if (this.sentenceGrid.addedMap.size > 0 || this.sentenceGrid.updatedMap.size > 0 ||
            this.sentenceGrid.removedMap.size > 0) {
            return false;
        }
        return true;
    }




    canDomainCellEdit = (data: any, index: number, field: string) => {
        if (data.createDatetime ||  data.adjustCode==='BKG_INI_RM') {
            return false;
        }
        return true;
    }
    sentenceCellEditat = (data: any, index: number, field: string) => {
        if (data.createDatetime || data.adjustCode==='SENT_INI_REM') {
            return false;
        }
        return true;
    }

    canDurationEdit = (data: any, index: number, field: string) => {
        if (data['adjustDays'] && data.createDatetime &&  (data.rdYears || data.rdMonths || data.rdWeeks || data.rdDays)) {
            this.show(this.translateService.translate('oidcustad.detaildedremission'),'warn');
            return false;
        }
        return true;
    }

    sentenceDurationEdit = (data: any, index: number, field: string) => {
        if (data['adjustDays'] && data.createDatetime &&  (data.rdYears || data.rdMonths || data.rdWeeks || data.rdDays)) {
            this.show(this.translateService.translate('oidcustad.detaildedremission'),'warn');
            return false;
        }
        return true;
    }

    clickOnConfirmAll(flag) {
        let initalBkgRemisList =  this.initialAdjustmentData.filter(data=> data['usageCode']==="BKG_REMISS");
        let bookingRemisRowData =  this.bookingsData.filter(data=> data['usageCode']==="BKG_REMISS" && !data['createDatetime']);
        let bkgRemisList = [];
        bkgRemisList.push(...initalBkgRemisList,...bookingRemisRowData);
        let initialRemis = this.bookingsData.filter(data=>data['adjustCode']==="BKG_INI_RM");
        if (flag) {
            this.checked=true;
            this.bookingsGrid.addRecord({ adjustCode: 'BKG_INI_RM', adjustCodeType: 'Credit', adjustDate: DateFormat.getDate(), button: '', usageCode: 'BKG_REMISS', offenderBookId : this.vHeaderBlockModel.offenderBookId });
        }else if(!flag && initialRemis && initialRemis.length===1 && bkgRemisList && bkgRemisList.length == 1 && initialRemis[0]['createDatetime']){
            this.checked=false;
            const bookingsEvent = { added: [], updated: [], removed: [] };
            const removed=[];
            removed.push(initialRemis[0]);
            bookingsEvent.removed=removed;
            this.calucateFlag = true;
            this.bookingsCommit(bookingsEvent);
        }
        else if(flag===false && initialRemis && initialRemis.length===1 && bkgRemisList && bkgRemisList.length == 1 && !initialRemis[0]['createDatetime']){
             let intialList = this.bookingsData.filter(i => i['usageCode'] !== 'BKG_REMISS');
                 this.bookingsData = intialList;
                 this.bookingsModel['remissionFlag']=false;
                 this.checked=false;
         }
        if (this.bookingsData.length > 1 && flag === false && bkgRemisList && bkgRemisList.length > 1) {
            this.show(this.translateService.translate('oidcustad.actionnotallowed'), 'warn');
            this.bookingsExecuteQuery(this.vHeaderBlockModel.offenderBookId);
            return;
        }
    }
    leapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    bookingChange(event) {
        if (event != this.bookingsModel.commentText) {
            const index = this.bookingsGrid.gridOptions.api.getSelectedNodes()[0].rowIndex;
            this.bookingsGrid.setColumnData('commentText', index, event);
        }
    }

    sentenceChange(event) {
        if (event != this.sentenceModel.commentText) {
            const index = this.sentenceGrid.gridOptions.api.getSelectedNodes()[0].rowIndex;
            this.sentenceGrid.setColumnData('commentText', index, event);
        }
    }

    getdays (month, year) {
        return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
      }
    prepareColDef(coldefJson) {
        let colDefs = [];
        coldefJson.forEach(type => {
            if (type.dataType === 'lov' && type.source === 'link') {
                let lovRendered = 'description';
                if (type.field == 'court') {
                    lovRendered = 'code'
                }
                if (type.field == 'type' || type.field == 'status') {
                    type.url = type.url + 'CUST';
                }
                colDefs.push({ datatype: type.dataType, lovRender: lovRendered, source: type.sourceType, suppressMenu: true, link: type.url, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, parentFields: type.parentFields })
            } else if (type.dataType === 'lov' && type.source === 'domain') {
                if (type.field == 'commenceType') {
                    colDefs.push({ datatype: type.dataType, domain: type.url, suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
                }
                else {
                    colDefs.push({ datatype: type.dataType, domain: type.url, suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
                }
            }
            else if (type.dataType === 'lov' && type.source === 'domain') {
                colDefs.push({ datatype: type.dataType, domain: type.url, suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'text') {
                if (type.field == 'matter') {
                    colDefs.push({ datatype: type.dataType, wrapText: true, width: 80, suppressMenu: true, hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, maxWidth: 500 })
                } else {
                    colDefs.push({ datatype: type.dataType, wrapText: true, width: 80, suppressMenu: true, hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, maxWidth: 500 })
                }
            }
            else if (type.dataType === 'number') {
                colDefs.push({ datatype: type.dataType, width: 40, suppressMenu: true, hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'launchbutton') {
                colDefs.push({ datatype: type.dataType, width: 100, parentField: type.parentField, suppressMenu: true, field: type.field, fieldName: '', required: type.required, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' })
            }
            else if (type.dataType === 'hyperlink') {

                colDefs.push({ datatype: 'hyperlink', width: 50, displayas: 'image', suppressMenu: true, parentField: type.parentField, required: type.required, fieldName: type.fieldName ? this.translateService.translate(type.fieldName) : '', field: type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' })
            }
            else if (type.dataType === 'date' && type.field === 'orderedDate') {
                colDefs.push({ datatype: type.dataType, field: type.field, fieldName: this.translateService.translate(type.fieldName), width: 100, suppressMenu: true, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'date' && type.field === 'holdExpiryDate') {
                colDefs.push({ datatype: 'custom', suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, editorSelector: (rowIndex, field, data) => { return 'date' } })
            }
            else if (type.dataType === 'date' && type.field === 'commenceDate') {
                colDefs.push({ datatype: 'custom', suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, hide: type.hide, editorSelector: (rowIndex, field, data) => { return 'date' } })
            }
            else if (type.dataType === 'date') {
                colDefs.push({ datatype: type.dataType, suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, hide: type.hide })
            }
            else if (type.dataType === 'checkbox') {
                colDefs.push({ datatype: type.dataType, width: 40, field: type.field, fieldName: this.translateService.translate(type.fieldName), suppressMenu: true, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
        });
        return colDefs;
    }

    loadChargesColDefData() {
        const data = this.loginService.mainColDefData;
        let datatypeData = [];
        data.forEach(gridDef => {
            if (gridDef.grid_name == 'custOrd' && gridDef.module_name == 'OIDCUSTAD') {
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
        this.chargesColdef = [];
        this.prepareColDef(datatypeData).forEach(key => this.chargesColdef.push(key));
    }

    loadJsonData() {
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        form_identifiers['orderType'] = 'CUST';
        const retData = {
            formName: 'OCDLEGLO',
            id: this.dataId ? this.dataId : 0,
            searchString: JSON.stringify(form_identifiers)
        }
        this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
            if (data && data.formInfoJson) {
                let custGridData = JSON.parse(data.formInfoJson).myJsonRowData;
                custGridData = custGridData.filter(ele => this.checkSentenceType(ele.sentenceCalcType));
                this.orderGridIndex = 0;
                let sentenceDates = [];
                let form_identifiers = '"offenderBookId":"' + this.vHeaderBlockModel.offenderBookId + '"';
                const retData = {
                    formName: 'OCDLEGLS',
                    id: this.dataId ? this.dataId : 0,
                    searchString: form_identifiers
                }
                this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
                    custGridData.forEach(ord => {
                        let orderAdjustments = this.initialAdjustmentData.filter(i=>i.objectType=='CUST' && i.objectId == ord.orderNo);
                        if(orderAdjustments.length>0){
                            let totalRemis = 0;
                            let totalCredit = 0;
                            let totalDebit = 0;
                            orderAdjustments.forEach(ele => {
                                if(ele.objectId == ord.orderNo && ele['usageCode'] == 'SENT_REMISS'){
                                    if ( ele['usageCode']==='SENT_REMISS' && ele['debitCreditCode']==='CR') {
                                        totalCredit += Number(ele['adjustDays']);
                                     } else if (ele['usageCode']==='SENT_REMISS' && ele['debitCreditCode']==='DR') {
                                        totalDebit += Number(ele['adjustDays']);
                                     }
                                    ord['remission'] = true;
                                }
                                if(ele['debitCreditCode']==='CR'){
                                    ele['adjustCodeType']='Credit';
                                }else if(ele['debitCreditCode']==='DR'){
                                    ele['adjustCodeType']='Debit';
                                }
                            });
                            totalRemis = Math.abs(totalCredit - totalDebit);
                            ord['remissionDays'] = totalRemis>0?totalRemis:undefined;
                            ord['adjustmentData'] = orderAdjustments;
                        }else{
                            ord['remission'] = false;
                        }
                        if (ord.commenceDate && DateFormat.getDate(ord.commenceDate) + '' != 'Invalid Date') {
                            ord.commenceDate = DateFormat.format(DateFormat.getDate(ord?.commenceDate));
                        }
                        if (data && data.formInfoJson) {
                            if (JSON.parse(data.formInfoJson).hasOwnProperty('sentenceDates')) {
                                sentenceDates = JSON.parse(data.formInfoJson).sentenceDates;
                            }
                            const keyDate = sentenceDates.filter(obj => obj.displayNo == ord.displayNo);
                            if (keyDate && keyDate.length) {
                                if (keyDate[0]['sentenceOrderDates'] && keyDate[0]['sentenceOrderDates'].length) {
                                    keyDate[0]['sentenceOrderDates'].forEach(sentKey => {
                                        if (sentKey['dateType'] && !sentKey.indefinite) {
                                            if (sentKey['dateValue']) {
                                                ord[sentKey['dateType']] = DateFormat.format(DateFormat.getDate(sentKey['dateValue']));
                                            }
                                        } else {
                                            ord[sentKey['dateType']] = 'Indefinte';
                                        }
                                    });
                                }
                            }
                        }
                    });
                    this.myJsonRowData = JSON.parse(JSON.stringify(custGridData));
                    this.initalJsonRowData = JSON.parse(JSON.stringify(custGridData));
                });
            } else {
                this.myJsonRowData = [];
                this.initalJsonRowData = [];
            }
        })
    }

    sentenceCommit(event) {
        this.sentenceInsertList = event.added;
        this.sentenceUpdateList = event.updated;
        this.sentenceDeleteList = event.removed;
        this.bookingsCommitModel.insertList = [];
        this.bookingsCommitModel.updateList = [];
        this.bookingsCommitModel.deleteList = [];
        let adjustmentsUpd = [];
        for( let i = 0 ; i < this.myJsonRowData.length ; i++){
            if (this.myJsonRowData[i]['adjustmentData']) {
                if(!this.isSentenceAdjustmentValid(this.myJsonRowData[i]['adjustmentData'])){
                    return;
                }
                adjustmentsUpd.push(...this.myJsonRowData[i]['adjustmentData']);
            }
        }
        this.sentenceCommitModel.insertList = adjustmentsUpd.filter(i => i.operation == 'I');
        this.sentenceCommitModel.updateList = adjustmentsUpd.filter(i => i.operation == 'U');
        this.sentenceCommitModel.deleteList = adjustmentsUpd.filter(i => i.operation == 'D' && i.offenderOrderAdjustId);
        if(this.sentenceCommitModel.deleteList.length==0 && this.sentenceCommitModel.updateList.length==0 &&this.sentenceCommitModel.insertList.length==0){
            this.show(this.translateService.translate('ocdleglo.nodatamodified'),'warn');
            // this.bookingsExecuteQuery(this.vHeaderBlockModel.offenderBookId);  
            return false;
        }
        if(this.calucateSentenceFlag){
            this.calculateReason("SENTENCE");
        }else{
         this.sentenceSave();
        }
    }

    sentenceSave(calculationResult?) {
        if(calculationResult){
            this.sentenceCommitModel.calcReason = JSON.stringify(calculationResult);
            this.sentenceCommitModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        }
        this.oidcustadFactory.bookingsCommit(this.sentenceCommitModel).subscribe(data => {
            if(data == 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'),'success');
            } else if(data != 0){
                let dlgData = {};
                if (data == 2) {
                    dlgData = {
                        heading: 'Warning',
                        label: this.translateService.translate('ocucalcr.userhaspendingcalcevents'),
                        yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('ocucalcr.warnok')
                    };
                } else if (data == 3) {
                    dlgData = {
                        heading: 'Warning',
                        label: this.translateService.translate('ocucalcr.applicationstatusdown'),
                        yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('ocucalcr.warnok')
                    };
                }
                if (Object.keys(dlgData).length>0) {
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50).subscribe(result => {
                    });
                }
                this.show(this.translateService.translate('ocdleglo.savedaspendingevent'));
            }  else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
            this.bookingsExecuteQuery(this.vHeaderBlockModel.offenderBookId);
        })
    }

    onRowClicked(event) {
        this.sentenceReadOnly = true;
        this.sentenceModel = new OffenderSentenceAdjustment();
        this.sentencecommentText = undefined;
        if (event) {
            this.sentenceInsertFlag = true;
            if(JSON.stringify(this.selectedRow) == JSON.stringify(event)) {
                return;
            }
            if(this.isSentenceGridChanged()){
                let tempAdjustment = this.setGridOperations();
                let oldInd = this.myJsonRowData.indexOf(this.selectedRow);
                // if (!this.isSentenceAdjustmentValid(tempAdjustment)) {
                //     this.orderGridIndex = -1;
                //     this.orderGridIndex = oldInd;
                //     /*  let node = this.sentenceGrid.api.getDisplayedRowAtIndex(toldInd);
                //      if (node) {
                //          node.setSelected(true);
                //      } */
                //     return false;
                // }
                this.deleteRemissionList = [];
                if(oldInd != -1) {
                    this.myJsonRowData[oldInd]['adjustmentData'] = JSON.parse(JSON.stringify(tempAdjustment));
                }
            }
            this.selectedRow = event;
            this.index = this.myJsonRowData.indexOf(event);
            this.sentenceData = this.selectedRow['adjustmentData'] ? this.selectedRow['adjustmentData'].filter(i => i.operation !== 'D') : [];
        }else{
            this.selectedRow  ={};
        }

    }

    isSentenceGridChanged() {
        if (this.sentenceGrid && (this.sentenceGrid.addedMap.size > 0 || this.sentenceGrid.updatedMap.size > 0 || this.sentenceGrid.removedMap.size > 0)) {
            return true;
        }
    }


    validateBookingRowData = (event) => {
        let sentRemisListRowData = this.sentenceData ? this.sentenceData.filter(data => data['adjustCode'] === "SENT_INI_REM" && data['objectId'] == event.data.orderNo) : [];
        const rowdata = new ValidateRowReturn();
        if (event.field === 'remission' && event.data.remission === false) {
            let sentRemisRecord = this.sentenceData ? this.sentenceData.filter(data => data['usageCode'] === "SENT_REMISS" && data['objectId'] == event.data.orderNo) : [];
            if( sentRemisRecord && sentRemisRecord.length === 1){
                this.calucateFlag = true;
                this.removeInitialRemis();
                rowdata.validated = true;
                return rowdata;
            } else {
                this.ocdleglogrid.setColumnData('remission', event.rowIndex, true);
                this.show(this.translateService.translate('oidcustad.actionnotallowed'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
        } 

        if (event.field === 'remission' && event.data.remission) {
            if (event.data.remission &&  ( !sentRemisListRowData || sentRemisListRowData.length == 0)) {
                this.sentenceGrid.addRecord({adjustCode: 'SENT_INI_REM', adjustCodeType: 'Credit', adjustDate: DateFormat.getDate(), button: '', objectId: this.selectedRow.orderNo, offenderBookId : this.vHeaderBlockModel.offenderBookId, objectType: 'CUST',  usageCode: 'SENT_REMISS'});
            }
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }


    onGridBookingsDelete = (row) => {
        if(row[0].adjustCode && ((row[0].adjustCode === 'ESCP' && this.manualFlag) || (row[0].adjustCode !== 'ESCP'))){
            this.calucateFlag = true;
        }
        for (let i = 0; i < row.length; i++) {
            if (row[i].adjustCode==='BKG_INI_RM') {
                this.show(this.translateService.translate('oidcustad.intialcannotdelete'),'warn');
                return false;
            }
        }
        return true;
    }

    onGridSentencesDelete = (row) => {
        for (let i = 0; i < row.length; i++) {
            if (row[i].adjustCode==='SENT_INI_REM') {
                this.show(this.translateService.translate('oidcustad.intialcannotdelete'),'warn');
                return false;
            }
        }
        this.calucateSentenceFlag = true;
        return true;
    }

    getBookingRemissionDuration = () => {
        var availableRemission = 0;
        var totalCredit = 0;
        var totalDebit = 0;
        if (this.bookingsData && this.bookingsData.length > 0) {
            this.bookingsData.forEach(ele => {
                if (ele['usageCode'] === 'BKG_REMISS' && ele['adjustCodeType'] === 'Credit') {
                    totalCredit = totalCredit + Number(ele['adjustDays']);
                } else if (ele['usageCode'] === 'BKG_REMISS' && ele['adjustCodeType'] === 'Debit') {
                    totalDebit = totalDebit + Number(ele['adjustDays']);
                }
            })
        }
        availableRemission = totalCredit - totalDebit;
        return availableRemission;
    }

    getSentenceRemissionDuration = (sentRemissionList) => {
        var availableRemission = 0;
        var totalCredit = 0;
        var totalDebit = 0;
        if (sentRemissionList && sentRemissionList.length > 0) {
            sentRemissionList.forEach(ele => {
                if (ele['usageCode'] === 'SENT_REMISS' && ele['adjustCodeType'] === 'Credit' && ele['operation'] != 'D') {
                    totalCredit = totalCredit + Number(ele['adjustDays']);
                } else if (ele['usageCode'] === 'SENT_REMISS' && ele['adjustCodeType'] === 'Debit' && ele['operation'] != 'D') {
                    totalDebit = totalDebit + Number(ele['adjustDays']);
                }
            })
        }
        availableRemission = totalCredit - totalDebit;
        return availableRemission;
    }


    whenTabChangedTrigger(event) {
         if(!this.affDisableFlag && this.selectedTabIndex != event.index){
             let dlgData = {
                 heading: 'Warning',label:   this.translateService.translate('oidcustad.doyouwanttosavemodifiedchanges'),
                 yesBtn: true, noBtn: true
             }
             this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50).subscribe(result => {
                 if(result){
                     setTimeout(() => { this.selectedTabIndex = this.tempTabIndex; }, 0);
                     return;
                 } else {
                    this.myJsonRowData = JSON.parse(JSON.stringify(this.initalJsonRowData));
                    this.tempTabIndex =  event.index;
                    this.selectedRow  ={};
                    this.bookingsExecuteQuery(this.vHeaderBlockModel?.offenderBookId);
                 }
                 
             });
         } else {
             this.tempTabIndex =  event.index;
         }
     }

    setGridOperations() {
        const adjustments = [];
        if (this.sentenceGrid) {
            this.sentenceData.forEach( ele => {
                ele['operation'] = ele.offenderOrderAdjustId ? 'U' : 'I';
                adjustments.push(ele)
            })
            this.sentenceGrid.removedMap.forEach(ele => {
                ele.operation = 'D';
                adjustments.push(ele);
            });
            if(this.deleteRemissionList.length>0){
                adjustments.push(...this.deleteRemissionList);
            }
            this.selectedRow?.adjustmentsList?.forEach(ele => {
                if(ele.offenderOrderAdjustId &&  ele['operation'] ==='D'){
                    adjustments.push(ele);
                }
            })
        }
        return adjustments;
    }

    isSentenceAdjustmentValid(adjustmentsList) {
        if (adjustmentsList.length > 0) {
            for (let i = 0; i < adjustmentsList.length; i++) {
                if(adjustmentsList[i].operation != 'D'){
                    if (!adjustmentsList[i].adjustCode) {
                        this.show(this.translateService.translate('oidcustad.adjustmentypemust'), 'warn');
                        return;
                    }
                    if (!adjustmentsList[i].adjustDate) {
                        this.show(this.translateService.translate('oidcustad.postdatemust'), 'warn');
                        return;
                    }
                    if (!adjustmentsList[i].adjustFromDate && adjustmentsList[i]['usageCode'] == 'SENT') {
                        this.show(this.translateService.translate('oidcustad.fromDatemustbe'), 'warn');
                        return;
                    }
                    if (adjustmentsList[i].adjustDays === undefined || adjustmentsList[i].adjustDays === null) {
                        this.show(this.translateService.translate('oidcustad.durationmust'), 'warn');
                        return;
                    }
                    if (adjustmentsList[i].adjustFromDate && DateFormat.compareDate(DateFormat.getDate(adjustmentsList[i].adjustFromDate), DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidcustad.fromdatecannotbefuturedate'), 'warn');
                        return;
                    }
                    if (adjustmentsList[i].adjustFromDate && adjustmentsList[i].adjustToDate && DateFormat.compareDate(DateFormat.getDate(adjustmentsList[i].adjustFromDate), DateFormat.getDate(adjustmentsList[i].adjustToDate)) === 1) {
                        this.show(this.translateService.translate('oidcustad.fromdatecannotbelater'), 'warn');
                        return;
                    }
                    if (adjustmentsList[i].adjustDate && DateFormat.compareDate(DateFormat.getDate(adjustmentsList[i].adjustDate), DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidcustad.posteddatecannotbefuturedate'), 'warn');
                        return;
                    }
                    if (adjustmentsList[i].adjustToDate && DateFormat.compareDate(DateFormat.getDate(adjustmentsList[i].adjustToDate), DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidcustad.todatecannotbefuturedate'), 'warn');
                        return;
                    }
                }
                if(this.getSentenceAppealDuration(adjustmentsList) < 0){
                    this.show(this.translateService.translate('oidcustad.moreapplealtime'), 'warn');
                    return;
                }
                if(this.getSentenceRemissionDuration(adjustmentsList) < 0){
                    this.show(this.translateService.translate('oidcustad.lossofremission'), 'warn');
                    return;
                }
                //Checking for Loss Of remiss w/o Initial remiss
                if (adjustmentsList[i].adjustCode == 'SENT_INI_REM' && adjustmentsList[i].operation == 'D') {
                    if (adjustmentsList.filter(i => i.adjustCode == 'SENT_INI_REM' && i.operation != 'D').length == 0
                        && adjustmentsList.filter(i => i.usageCode == 'SENT_REMISS' && i.operation != 'D').length > 0) {
                        this.show(this.translateService.translate('oidcustad.actionNotallowed'), 'warn');
                        return;
                    }
                }
            }
        }
        return true;
    }

    getSentenceAppealDuration = (sentRemissionList) => {
        var availableRemission = 0;
        var totalCredit = 0;
        var totalDebit = 0;
        if (sentRemissionList && sentRemissionList.length > 0) {
            sentRemissionList.forEach(ele => {
                if (ele['usageCode'] === 'APP' && ele['adjustCodeType'] === 'Debit' && ele['operation'] != 'D') {
                    totalCredit = totalCredit + Number(ele['adjustDays']);
                } else if (ele['usageCode'] === 'RAPP' && ele['adjustCodeType'] === 'Credit' && ele['operation'] != 'D') {
                    totalDebit = totalDebit + Number(ele['adjustDays']);
                }
            })
        }
        availableRemission = totalCredit - totalDebit;
        return availableRemission;
    }

    deleteValidations = (adjustmentsList) => {
        for (let i = 0; i < adjustmentsList.length; i++) {
            if (adjustmentsList[i].adjustCode == 'SENT_INI_REM' && adjustmentsList[i].operation == 'D') {
                if (adjustmentsList.filter(i => i.usageCode == 'SENT_REMISS' && i.operation != 'D').length > 0) {
                    this.show(this.translateService.translate('oidcustad.actionNotallowed'), 'warn');
                    return;
                }
            }
        }
        return true;
    }

    removeInitialRemis = () =>  {
        let initialRemis =  this.sentenceData.filter( i=> i['adjustCode'] === "SENT_INI_REM");
        if(this.sentenceGrid.removedMap ){
            this.sentenceGrid.removedMap.forEach(ele => {
                if(ele.createDatetime){
                    this.selectedRow.adjustmentData.forEach( obj => {
                        if(obj.offenderOrderAdjustId == ele.offenderOrderAdjustId){
                            obj['operation'] = 'D';
                        }
                    })
                }
                this.deleteRemissionList.push(ele);
            });
        }
        this.sentenceGrid.gridOptions.api.applyTransaction({ remove: initialRemis });
        const index = this.sentenceData.indexOf(initialRemis[0]);
        this.sentenceData[index]['operation'] = 'D';
        if(initialRemis[0].offenderOrderAdjustId){
            this.sentenceData = this.sentenceData.filter(i => i['operation'] != 'D');
            this.deleteRemissionList.push(initialRemis[0]);
            this.calucateSentenceFlag = true;
        } else {
            this.sentenceData.splice(index,1);
        }
    } 
    checkSentenceType(sentenceCalcType: any) { 
       return  (this.sentTypeList?.filter(ele => ele.code == sentenceCalcType)[0].sentType == AppConstants.IMPS_SENTENCE_TYPE) ? true : false;
    }
}