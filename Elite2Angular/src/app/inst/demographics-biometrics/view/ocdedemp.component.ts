import {
    Component, OnInit,ViewChild
} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdedempService } from '../service/ocdedemp.service';
import { OffenderEducations } from '@instdemographicsbeans/OffenderEducations';
import { OffenderEducationsCommitBean } from '@instdemographicsbeans/OffenderEducationsCommitBean';
import { VOffenderEducationAddresses } from '@instdemographicsbeans/VOffenderEducationAddresses';
import { OffenderEmployments } from '@instdemographicsbeans/OffenderEmployments';
import { VOffenderEmployAddresses } from '@instdemographicsbeans/VOffenderEmployAddresses';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderEmploymentsCommitBean } from '@instdemographicsbeans/OffenderEmploymentsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';

@Component({
    selector: 'app-ocdedemp',
    templateUrl: './ocdedemp.component.html'
})

export class OcdedempComponent implements OnInit {
    msgs: any[] = [];
    @ViewChild('eduGrid', {static: true}) eduGrid: any;
    @ViewChild('empGrid', {static: true}) empGrid: any;
    VHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offeducationsData: OffenderEducations[] = [];
    offeducationsDataTemp: OffenderEducations[] = [];
    offeducationsModel: OffenderEducations = new OffenderEducations();
    offeducationsIndex: number;
    offeducationsInsertList: OffenderEducations[] = [];
    offeducationsUpdatetList: OffenderEducations[] = [];
    offeducationsDeleteList: OffenderEducations[] = [];
    offeducationsCommitModel: OffenderEducationsCommitBean = new OffenderEducationsCommitBean();
    voffeduaddrData: VOffenderEducationAddresses[] = [];
    voffeduaddrDataTemp: VOffenderEducationAddresses[] = [];
    voffeduaddrModel: VOffenderEducationAddresses = new VOffenderEducationAddresses();
    voffeduaddrIndex: number;
    voffeduaddrInsertList: VOffenderEducationAddresses[] = [];
    voffeduaddrUpdatetList: VOffenderEducationAddresses[] = [];
    voffeduaddrDeleteList: VOffenderEducationAddresses[] = [];
    offemploymentsData: OffenderEmployments[] = [];
    offemploymentsDataTemp: OffenderEmployments[] = [];
    offemploymentsModel: OffenderEmployments = new OffenderEmployments();
    offemploymentsIndex: number;
    offemploymentsInsertList: OffenderEmployments[] = [];
    offemploymentsUpdateList: OffenderEmployments[] = [];
    offemploymentsDeleteList: OffenderEmployments[] = [];
    offemploymentsCommitModel: OffenderEmploymentsCommitBean = new OffenderEmploymentsCommitBean();
    voffempaddrData: VOffenderEmployAddresses[] = [];
    voffempaddrDataTemp: VOffenderEmployAddresses[] = [];
    voffempaddrModel: VOffenderEmployAddresses = new VOffenderEmployAddresses();
    voffempaddrIndex: number;
    voffempaddrInsertList: VOffenderEmployAddresses[] = [];
    voffempaddrUpdatetList: VOffenderEmployAddresses[] = [];
    voffempaddrDeleteList: VOffenderEmployAddresses[] = [];
    display: boolean;
    errorMessage: string;
    editable: boolean;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    offEducationsColumnDefs: any[];
    offEmploymentsColumnDefs: any[];
    vOffEmpAddrColumnDefs: any[];
    vOffEduAddrColumnDefs: any[];
    offEducationsReadOnly: boolean;
    vOffEduAddrReadOnly: boolean;
    eduAddrCtrlReadOnly: boolean;
    offEmploymentsReadOnly: boolean;
    vOffEmpAddrReadOnly: boolean;
    empAddrCtrlReadOnly: boolean;
    eduschedrgRg: any[] = [];
    payperiodrgRg: any[] = [];
    occupationrgRg: any[] = [];
    scheduletypergRg: any[] = [];
    employstsrgRg: any[] = [];
    studyareargRg: any[] = [];
    edulevelrgRg: any[] = [];
    translateLabel: any;
    specialEducationFlag: string;
    employerAwareFlag: string;
    contactEmployerFlag: string;
    eduAddrUpdateBut: boolean;
    eduAddrSpecificButEmp: boolean;
    eduAddrUpdateButEmp: boolean;
    eduAddrSpecificBut: boolean;
    eduPopupData: any;
    empPopupData: any;
    wageValue: any;
    employerawareFlag: boolean;
    contactemployerFlag: boolean;
    disable: boolean;
    savebtn: boolean;
    readonly: boolean;
    readonlyemp: boolean;
    // savebtnemp: boolean;
    employmentdetails: boolean;
    stateOption: any[] = [];
    countryOption: any[] = [];
    cityOption: any[] = [];
    selectededu = -1;
    selectededuAdd = -1;
    selectedemp = -1;
    selectedempAdd = -1;
    wage: any;
    wagePeriodCode: any;
    scheduleType: any;
    hoursWeek: any;
    terminationReasonText: any;
    dsSaveBtn: boolean;
    contactFlag: string;
    awareFlag: string;
    saveBtFlag: boolean;

    constructor(private ocdedempFactory: OcdedempService,
        private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService,private amountFormat: AmountFormatUtil, private renderer: Renderer2, private sessionManager: UserSessionManager) {
    }
    ngOnInit() {
        this.selectededu = -1;
        this.selectededuAdd = -1;
        this.selectedemp = -1;
        this.selectedempAdd = -1;
        this.employmentdetails = true;
        this.readonly = true;
        this.readonlyemp = true;
        this.savebtn = true;
        // this.savebtnemp = true;
        this.eduAddrUpdateBut = true;
        this.eduAddrSpecificBut = true;
        this.eduAddrUpdateButEmp = true;
        this.eduAddrSpecificButEmp = true;
        this.VHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.translateLabel = JSON.parse(sessionStorage.getItem('i18data'));
        this.saveBtFlag = true;
        this.offEducationsColumnDefs = [
            {
                fieldName: this.translateService.translate('ocdedemp.school'), field: 'schoolName',
                editable: true, width: 210, datatype: 'text', uppercase: 'false', maxlength: 240
            },
            {
                fieldName: this.translateService.translate('ocdedemp.schedule'), field: 'educationSchedule',
                datatype: 'lov', domain: 'EDU_SCHED', editable: true, width: 210, optionWidth: 400, maxlength: 40
            },
            {
                fieldName: this.translateService.translate('ocdedemp.areaofstudy'), field: 'studyAreaCode', datatype:
                    'lov', domain: 'STUDY_AREA', editable: true, width: 210, optionWidth: 400, maxlength: 40
            },
            {
                fieldName: this.translateService.translate('ocdedemp.startdate'), field: 'startDate', datatype:
                    'monthYear', editable: true, width: 210
            },
            {
                fieldName: this.translateService.translate('ocdedemp.enddate'), field: 'endDate', datatype: 'monthYear',
                editable: true, width: 210
            },
            {
                fieldName: this.translateService.translate('ocdedemp.levelattained'), field: 'educationLevelCode',
                datatype: 'lov', domain: 'EDU_LEVEL', editable: true, width: 210, optionWidth: 400, maxlength: 40
            },
            {fieldName:"" , field:'commentText',hide:true}

        ];
        this.offEmploymentsColumnDefs = [
            {
                fieldName: this.translateService.translate('ocdedemp.employer'), field: 'employerName',
                editable: true, width: 210, datatype: 'text', uppercase: 'false', maxlength: 240 ,required: true
            },
            {
                fieldName: this.translateService.translate('ocdedemp.status'), field: 'employmentPostCode',
                datatype: 'lov', domain: 'EMPLOY_STS', editable: true, width: 210, optionWidth: 400, maxlength: 40, required: true
            },
            {
                fieldName: this.translateService.translate('ocdedemp.occupation'), field: 'occupationsCode',
                datatype: 'lov', domain: 'OCCUPATION', editable: true, width: 210, optionWidth: 400, maxlength: 40, required: true
            },
            {
                fieldName: this.translateService.translate('ocdedemp.supervisor'), field: 'supervisorName',
                editable: true, width: 210, datatype: 'text', uppercase: 'false', maxlength: 240
            },
            {
                fieldName: this.translateService.translate('ocdedemp.startdate'), field: 'employmentDate',
                datatype: 'monthYear', editable: true, width: 210
            },
            {
                fieldName: this.translateService.translate('ocdedemp.enddate'), field: 'terminationDate',
                datatype: 'monthYear', editable: true, width: 210
            },
            {fieldName:"" , field:'commentText',hide:true}
        ];
        this.vOffEmpAddrColumnDefs = [
            {
                fieldName: this.translateService.translate('common.unitnumber'), field: 'suiteNumber',
                editable: false, width: 150, datatype: 'text', uppercase: 'false', maxlength: 30
            },
            {
                fieldName: this.translateService.translate('common.streetaddress'), field: 'streetAddress',
                editable: false, width: 150, datatype: 'text', uppercase: 'false', maxlength: 254
            },
            { fieldName: this.translateService.translate('ocdedemp.city'), field: 'cityName', editable: false, width: 150,
            datatype: 'text'},
            {
                fieldName: this.translateService.translate('system-profile.prov-state'), field: 'provStateDesc', editable:
                    false, width: 150 , datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('system-profile.zip-post'), field: 'zipPostalCode',
                editable: false, width: 150, maxlength: 12
            },
            {
                fieldName: this.translateService.translate('ocdedemp.country'), field: 'countryCode', editable: false,
                width: 150, maxlength: 40 , datatype: 'lov', domain: 'COUNTRY'
            },
            {
                fieldName: this.translateService.translate('ocdedemp.type'), field: 'addressTypeDesc', editable: false,
                width: 150, maxlength: 40
            },
            {
                fieldName: this.translateService.translate('ocdedemp.primary'), field: 'primaryFlag', datatype: 'checkbox',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdedemp.mail'), field: 'mailFlag', datatype: 'checkbox',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdedemp.active'), field: 'activeFlag', datatype: 'checkbox',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.isvalidated'),
                field: 'isAddressValid', datatype: 'checkbox', editable: false, width: 150
            }
            
        ];
        this.vOffEduAddrColumnDefs = [
            {
                fieldName: this.translateService.translate('common.unitnumber'), field: 'suiteNumber',
                editable: false, width: 150, maxlength: 30 , datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.streetaddress'),
                field: 'streetAddress', editable: false, width: 150, maxlength: 254, datatype: 'text'
            },
            { 
                fieldName: this.translateService.translate('ocdedemp.city'), field: 'cityName',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('system-profile.prov-state'),
                field: 'provStateDesc', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('system-profile.zip-post'),
                field: 'zipPostalCode', editable: false, width: 150, maxlength: 12, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocdedemp.country'),
                field: 'countryCode', editable: false, width: 150, datatype: 'lov', domain: 'COUNTRY'
            },
            {
                fieldName: this.translateService.translate('ocdedemp.type'),
                field: 'addressTypeDesc', editable: false, width: 150, maxlength: 40
            },
            {
                fieldName: this.translateService.translate('ocdedemp.primary'),
                field: 'primaryFlag', datatype: 'checkbox', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdedemp.mail'),
                field: 'mailFlag', datatype: 'checkbox', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdedemp.active'),
                field: 'activeFlag', datatype: 'checkbox', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.isvalidated'),
                field: 'isAddressValid', datatype: 'checkbox', editable: false, width: 150
            }
        ];

        if (!this.VHeaderBlockModel || this.VHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    /**
     * This function loads the data into the header
     */
    onOffenderChange(offender) {

        this.VHeaderBlockModel = offender;
        this.readonly =true;
        this.readonlyemp = true;
        if (offender) {
            this.ocdedempedexecuteQuery();
            this.ocdedempemexecuteQuery();
            this.offeducationsData = [];
            this.offemploymentsData = [];
            this.voffeduaddrData = [];
            this.voffempaddrData = [];
            this.offeducationsModel = new OffenderEducations();
            this.offemploymentsModel = new OffenderEmployments();
            this.savebtn = false;
//            this.savebtnemp = false;
            this.employmentdetails = false;

        } else {
            this.eduAddrUpdateBut = true;
            this.eduAddrSpecificBut = true;
            this.eduAddrUpdateButEmp = true;
            this.eduAddrSpecificButEmp = true;
            this.offeducationsData = [];
            this.offemploymentsData = [];
            this.voffeduaddrData = [];
            this.voffempaddrData = [];
            this.offeducationsModel = new OffenderEducations();
            this.offemploymentsModel = new OffenderEmployments();
            this.employmentdetails = true;
            this.savebtn = true;
            // this.savebtnemp = true;
        }
    }

    /**
    * This function loads the data into the Master Record and its child records
    **/
    ocdedempedexecuteQuery() {
        this.readonly = true;
        this.offeducationsModel.offenderBookId = this.VHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdedempFactory.offEducationsExecuteQuery(this.offeducationsModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.eduAddrUpdateBut = true;
                this.offeducationsData = [];
                this.eduAddrSpecificBut = true;
            } else {

                this.offeducationsData = [];
                this.offeducationsData = data;
                this.selectededu = 0;
                this.eduAddrUpdateBut = false;
                this.offeducationsModel = this.offeducationsData[0];
                //this.onRowClickoffeducations(this.offeducationsModel);

            }
        });
    }
    ocdedempemexecuteQuery() {
        this.readonlyemp = true;
        this.offemploymentsModel.offenderBookId = this.VHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdedempFactory.offEmploymentsExecuteQuery(this.offemploymentsModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.eduAddrUpdateButEmp = true;
                this.eduAddrSpecificButEmp = true;
                this.offemploymentsData = [];
                this.wage = undefined;
                this.hoursWeek = undefined;
                this.terminationReasonText = undefined;
                this.scheduleType = undefined;
                this.wagePeriodCode = undefined;
                this.employerawareFlag = false;
                this.contactemployerFlag = false;
                this.saveBtFlag = true;
                // this.savebtnemp=true;
            } else {
                this.eduAddrUpdateButEmp = false;
                // this.savebtnemp=false;
                this.saveBtFlag = false;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].wage) {
                        if (data[i].wage && String(data[i].wage).indexOf('.') < 0) {
                            data[i].wage = data[i].wage + '.00';
                        }
                    }
                    // data[i].employerAwareFlag = data[i].employerAwareFlag === 'Y' ? true : false;
                    // data[i].contactEmployerFlag = data[i].contactEmployerFlag === 'Y' ? true : false;
                }
                this.offemploymentsData = data;
                this.selectedemp = 0;
                this.offemploymentsModel = this.offemploymentsData[0];
                this.onRowClickoffemployments(this.offemploymentsModel);
            }
        });
    }
    ocdedempedPopulateDetails() {

        this.voffeduaddrModel = new VOffenderEducationAddresses();
        if(this.offeducationsModel.offenderBookId && this.offeducationsModel.educationSeq ){
            this.voffeduaddrModel.offenderBookId = this.offeducationsModel.offenderBookId;
            this.voffeduaddrModel.educationSeq = this.offeducationsModel.educationSeq;
        }
      
        const serviceObj = this.ocdedempFactory.vOffEduAddrExecuteQuery(this.voffeduaddrModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.eduAddrSpecificBut = true;
                this.voffeduaddrData = [];
            } else {
                this.eduAddrSpecificBut = false;
                this.voffeduaddrData = [];
                for (let i = 0; i < data.length; i++) {
                    data[i].primaryFlag = data[i].primaryFlag === 'Y' ? true : false;
                    data[i].mailFlag = data[i].mailFlag === 'Y' ? true : false;
                    data[i].activeFlag = data[i].activeFlag === 'Y' ? true : false;
                    data[i].isAddressValid = data[i].isAddressValid === 'Y' ? true : false;
                }
                this.voffeduaddrData = data;
                this.selectededuAdd = 0;
                this.voffeduaddrModel = this.voffeduaddrData[0];
                this.eduPopupData.address = this.voffeduaddrModel;

            }
        });
    }
    ocdedempemPopulateDetails() {
        this.voffempaddrModel.offenderBookId = this.offemploymentsModel.offenderBookId;
        this.voffempaddrModel.employmentSeq = this.offemploymentsModel.employSeq;
        const serviceObj = this.ocdedempFactory.vOffEmpAddrExecuteQuery(this.voffempaddrModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.eduAddrSpecificButEmp = true;
                this.voffempaddrData = [];
            } else {
                this.voffempaddrData = [];
                for (let i = 0; i < data.length; i++) {
                    data[i].primaryFlag = data[i].primaryFlag === 'Y' ? true : false;
                    data[i].mailFlag = data[i].mailFlag === 'Y' ? true : false;
                    data[i].activeFlag = data[i].activeFlag === 'Y' ? true : false;
                    data[i].isAddressValid = data[i].isAddressValid === 'Y' ? true : false;
                }
                this.eduAddrSpecificButEmp = false;
                this.voffempaddrData = data;
                this.selectedempAdd = 0;
                this.empPopupData.address = data[0];
            }
        });
    }
    onRowClickoffeducations(event) {
        this.offeducationsModel = new OffenderEducations();
        if (event) {
            this.offeducationsModel = event;
            this.readonly=false;
        }
        this.eduPopupData = { class: 'OFF_EDU', education: event, address: [] };
        if (this.offeducationsModel.offenderBookId && this.offeducationsModel.educationSeq) {
            this.voffeduaddrData = [];
        }
        this.ocdedempedPopulateDetails();
    }
    onRowClickoffemployments(event) {
        this.offemploymentsModel = new OffenderEmployments();
        this.readonlyemp =false;
        if (event) {
            this.offemploymentsModel = event;
            this.contactemployerFlag = event.contactEmployerFlag == 'Y'?true:false;
            this.employerawareFlag = event.employerAwareFlag == 'Y'?true:false;
            this.wage = event.wage;
            this.hoursWeek = event.hoursWeek;
            this.terminationReasonText = event.terminationReasonText;
            this.scheduleType = event.scheduleType;
            this.wagePeriodCode = event.wagePeriodCode;
        }
        this.empPopupData = { class: 'OFF_EMP', employment: event, address: [] };
        if (this.offemploymentsModel.offenderBookId && this.offemploymentsModel.employSeq) {
            this.voffempaddrData = [];
        }
        this.ocdedempemPopulateDetails();
    }
    onRowClickvoffeduaddr(event) {
        this.eduPopupData.address = event;
    }
    onRowClickvoffempaddr(event) {
        this.empPopupData.address = event;
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    ocdedempSaveoffeducationsForm(event) {
        this.offeducationsInsertList = event.added;
        this.offeducationsUpdatetList = event.updated;
        this.offeducationsDeleteList = event.removed;
        this.offeducationsCommitModel.insertList = [];
        this.offeducationsCommitModel.updateList = [];
        this.offeducationsCommitModel.deleteList = [];
        if (this.offeducationsInsertList.length > 0) {
            for (let i = 0; i < this.offeducationsInsertList.length; i++) {
                
              
                if (this.offeducationsInsertList[i].endDate) {
                    if (this.offeducationsInsertList[i].startDate > this.offeducationsInsertList[i].endDate) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdedemp.enddatecantbeforestartdate');
                        this.show();
                        return;
                    }
                }
                if (!this.offeducationsInsertList[i].schoolName || this.offeducationsInsertList[i].schoolName === '' ||
                    this.offeducationsInsertList[i].schoolName.replace(/\s/g, '').length === 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.pleaseenterschoolname');
                    this.show();
                    return;
                }
                this.offeducationsInsertList[i].offenderBookId = this.VHeaderBlockModel.offenderBookId;
                if (this.offeducationsInsertList[i].specialEducationFlag) {
                    this.offeducationsInsertList[i].specialEducationFlag = 'Y';
                } else {
                    this.offeducationsInsertList[i].specialEducationFlag = 'N';
                }
                this.offeducationsCommitModel.insertList = this.offeducationsInsertList;
            }
        }
        if (this.offeducationsUpdatetList.length > 0) {
            for (let i = 0; i < this.offeducationsUpdatetList.length; i++) {
                if (!this.offeducationsUpdatetList[i].startDate && this.offeducationsUpdatetList[i].endDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.enddatecantbeforestartdate');
                    this.show();
                    return;
                }
                if (this.offeducationsUpdatetList[i].endDate) {
                    if ((DateFormat.compareDate(DateFormat.getDate(this.offeducationsUpdatetList[i].startDate),
                         DateFormat.getDate(this.offeducationsUpdatetList[i].endDate)) === 1)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdedemp.enddatecantbeforestartdate');
                        this.show();
                        return;
                    }
                }
                if (!this.offeducationsUpdatetList[i].schoolName || this.offeducationsUpdatetList[i].schoolName === '' ||
                    this.offeducationsUpdatetList[i].schoolName.replace(/\s/g, '').length === 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.pleaseenterschoolname');
                    this.show();
                    return;
                }
                this.offeducationsUpdatetList[i].createDatetime = DateFormat.getDate();
                this.offeducationsCommitModel.updateList = this.offeducationsUpdatetList;
            }
        }
        if (this.offeducationsDeleteList.length > 0) {
            for (let i = 0; i < this.offeducationsDeleteList.length; i++) {
                this.offeducationsCommitModel.deleteList = this.offeducationsDeleteList;
            }
        }

        const offeducationsSaveData = this.ocdedempFactory.offEducationsCommit(this.offeducationsCommitModel);
        offeducationsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.offeducationsData = data;
                this.show();
                this.ocdedempedexecuteQuery();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.offeducationsData = data;
                this.show();
                this.ocdedempedexecuteQuery();
            }
        });
    }
    /*
    * This event is fired when click on Save Button in the grid of Employments Block
    * Used to do insert,update and delete operations
    */
    ocdedempSaveoffemploymentsForm(event) {
        this.saveBtFlag = false;
        this.offemploymentsInsertList = event.added;
        this.offemploymentsUpdateList = event.updated;
        this.offemploymentsDeleteList = event.removed;

        this.offemploymentsCommitModel.insertList = [];
        this.offemploymentsCommitModel.updateList = [];
        this.offemploymentsCommitModel.deleteList = [];
        if (this.offemploymentsInsertList.length > 0) {
            for (let i = 0; i < this.offemploymentsInsertList.length; i++) {
                if (!this.offemploymentsInsertList[i].employerName) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.employerRecordMust');
                    this.show();
                    return;
            }
                if(!this.offemploymentsInsertList[i].employerName &&!this.offemploymentsInsertList[i].employmentPostCode && !this.offemploymentsInsertList[i].occupationsCode && !this.offemploymentsInsertList[i].supervisorName && !this.offemploymentsInsertList[i].employmentDate && !this.offemploymentsInsertList[i].terminationDate ){
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.atleastonerecord');
                    this.show();
                    return;  
                }
                if(this.offemploymentsInsertList[i].terminationDate){
                    this.offemploymentsInsertList[i].terminationDate = DateFormat.getDate(this.offemploymentsInsertList[i].terminationDate);
                }
                if(this.offemploymentsInsertList[i].employmentDate){
                    this.offemploymentsInsertList[i].employmentDate = DateFormat.getDate(this.offemploymentsInsertList[i].employmentDate);
                }
                if (!this.offemploymentsInsertList[i].employmentDate && this.offemploymentsInsertList[i].terminationDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.enddatecantbeforestartdate');
                    this.show();
                    return;
                }
               
                if (this.offemploymentsInsertList[i].terminationDate) {
                    if (this.offemploymentsInsertList[i].employmentDate > this.offemploymentsInsertList[i].terminationDate) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdedemp.enddatecantbeforestartdate');
                        this.show();
                        return;
                    }
                }
                
                this.offemploymentsInsertList[i].offenderBookId = this.VHeaderBlockModel.offenderBookId;
                if (this.employerawareFlag) {
                    this.offemploymentsInsertList[i].employerAwareFlag = 'Y';
                } else {
                    this.offemploymentsInsertList[i].employerAwareFlag = 'N';
                }
                if (this.contactemployerFlag) {
                    this.offemploymentsInsertList[i].contactEmployerFlag = 'Y';
                } else {
                    this.offemploymentsInsertList[i].contactEmployerFlag = 'N';
                }
                this.offemploymentsCommitModel.insertList = this.offemploymentsInsertList;
            }
        }
        if (this.offemploymentsUpdateList.length > 0) {
            for (let i = 0; i < this.offemploymentsUpdateList.length; i++) {
                if (!this.offemploymentsUpdateList[i].employerName) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.employerRecordMust');
                    this.show();
                    return;
            }
                if (!this.offemploymentsUpdateList[i].employmentDate && this.offemploymentsUpdateList[i].terminationDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.enddatecantbeforestartdate');
                    this.show();
                    return;
                }

                if ((DateFormat.compareDate(DateFormat.getDate(this.offemploymentsUpdateList[i].employmentDate),
                    DateFormat.getDate(this.offemploymentsUpdateList[i].terminationDate)) === 1))  {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.enddatecantbeforestartdate');
                    this.show();
                    return;
                }
                if (this.employerawareFlag) {
                    this.offemploymentsUpdateList[i].employerAwareFlag = 'Y';
                } else {
                    this.offemploymentsUpdateList[i].employerAwareFlag = 'N';
                }
                if (this.contactemployerFlag) {
                    this.offemploymentsUpdateList[i].contactEmployerFlag = 'Y';
                } else {
                    this.offemploymentsUpdateList[i].contactEmployerFlag = 'N';
                }
                this.offemploymentsUpdateList[i].createDatetime = DateFormat.getDate();
                this.offemploymentsCommitModel.updateList = this.offemploymentsUpdateList;
            }
        }
        if (this.offemploymentsDeleteList.length > 0) {
            this.offemploymentsCommitModel.deleteList = this.offemploymentsDeleteList;
        }

        const offemploymentsSaveData = this.ocdedempFactory.offEmploymentsCommit(this.offemploymentsCommitModel);
        offemploymentsSaveData.subscribe(data => {
            if (data === 1) {
                this.offemploymentsData = data;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.ocdedempemexecuteQuery();
            } else {
                this.offemploymentsData = data;
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.ocdedempemexecuteQuery();
            }
        });
    }
    /*
    * This event is fired when click on Remove button in Employments Block
    * click on remove button in Employment block ,it gives validation message
    * like can not delete master record when address block contains any data.
    */
    onEmploymentDelete = () => {
        this.offemploymentsModel = new OffenderEmployments();
        this.readonlyemp =true;
        if (this.voffempaddrData.length > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.cannotdeletemasterrecord');
            this.show();
            return false;
        } else {
            return true;
        }

    }
   

    onEducationInsert = () => {
        this.disable = true;
        this.eduAddrUpdateBut=true;
        if (!this.VHeaderBlockModel || this.VHeaderBlockModel.offenderBookId === undefined) {
            this.offeducationsData = [];
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
        }

        if (this.offeducationsData.length > 0) {
            if (!this.offeducationsData[this.offeducationsData.length - 1].schoolName ||
                this.offeducationsData[this.offeducationsData.length - 1].schoolName === '') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdedemp.pleaseenterschoolname');
                this.show();
                return;

            } 
        }
        this.readonly = false;
        return {
            date: DateFormat.getDate()
        };

    }
    /*
    * This event is fired when click on Remove button in Education block
    * click on remove button ,it gives validation message like can not delete master record when address block contains any data.
    */
    onEducationDelete = () => {
        this.offeducationsModel = new OffenderEducations();
        this.readonly =true;
        if (this.offeducationsData.length > 0) {
            this.eduAddrUpdateBut = false;
        }
        if (this.voffeduaddrData.length > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.cannotdeletemasterrecord');
            this.show();
            return false;
        } else {
            return true;
        }
    }
    onButSaveEdCmt() {

        this.offeducationsCommitModel.insertList = [];
        this.offeducationsCommitModel.updateList = [];
        this.offeducationsUpdatetList = [];
        this.offeducationsInsertList = [];
        if (this.offeducationsModel.offenderBookId && this.offeducationsModel.educationSeq) {
            this.offeducationsModel.createDatetime = DateFormat.getDate();
            this.offeducationsUpdatetList.push(this.offeducationsModel);
        } else {
            if (!this.offeducationsModel.schoolName || this.offeducationsModel.schoolName === '' ||
                this.offeducationsModel.schoolName.replace(/\s/g, '').length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdedemp.pleaseenterschoolname');
                this.show();
                return;
            }
            this.offeducationsModel.offenderBookId = this.VHeaderBlockModel.offenderBookId;
            if (this.offeducationsModel.specialEducationFlag) {
                this.offeducationsModel.specialEducationFlag = 'Y';
            } else {
                this.offeducationsModel.specialEducationFlag = 'N';
            }
            this.offeducationsInsertList.push(this.offeducationsModel);
        }
        this.offeducationsCommitModel.insertList = this.offeducationsInsertList;
        this.offeducationsCommitModel.updateList = this.offeducationsUpdatetList;

        const offeducationsSaveData = this.ocdedempFactory.offEducationsCommit(this.offeducationsCommitModel);
        offeducationsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.offeducationsData = data;
                this.show();
                this.eduAddrUpdateBut=true;
                this.ocdedempedexecuteQuery();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.offeducationsData = data;
                this.eduAddrUpdateBut=false;
                this.show();
                this.ocdedempedexecuteQuery();
            }
        });
    }
    onButDeleteEdCmt() {

        this.offeducationsCommitModel.deleteList = [];
        this.offeducationsDeleteList = [];

        if (this.voffeduaddrData.length > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.cannotdeletemasterrecord');
            this.show();
            return;
        }
        if (this.offeducationsModel.offenderBookId && this.offeducationsModel.educationSeq) {
            this.offeducationsModel.createDatetime = DateFormat.getDate();
            this.offeducationsDeleteList.push(this.offeducationsModel);
        }
        this.offeducationsCommitModel.deleteList = this.offeducationsDeleteList;
        const offemploymentsSaveData = this.ocdedempFactory.offEducationsCommit(this.offeducationsCommitModel);
        offemploymentsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.ocdedempedexecuteQuery();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.ocdedempedexecuteQuery();
            }
        });

    }
    onButSave() {
        {

            this.offemploymentsCommitModel.insertList = [];
            this.offemploymentsCommitModel.updateList = [];
            this.offemploymentsInsertList = [];
            this.offemploymentsUpdateList = [];
            if (this.offemploymentsModel.offenderBookId && this.offemploymentsModel.employSeq) {
                if (String(this.offemploymentsModel.wage).length  > 14) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.wagevalidation');
                    this.show();
                    return;
                }
                this.offemploymentsModel.createDatetime = DateFormat.getDate();
               
                this.offemploymentsUpdateList.push(this.offemploymentsModel);
            } else {
                if (String(this.offemploymentsModel.wage).length  > 14) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.wagevalidation');
                    this.show();
                    return;
                }
                this.offemploymentsModel.offenderBookId = this.VHeaderBlockModel.offenderBookId;
                this.offemploymentsInsertList.push(this.offemploymentsModel);
            }
            if (this.employerawareFlag) {
                this.offemploymentsModel.employerAwareFlag = 'Y';
            } else {
                this.offemploymentsModel.employerAwareFlag = 'N';
            }
            if (this.contactemployerFlag) {
                this.offemploymentsModel.contactEmployerFlag = 'Y';
            } else {
                this.offemploymentsModel.contactEmployerFlag = 'N';
            }
            this.offemploymentsModel.wage=this.wage;
            this.offemploymentsModel.scheduleType=this.scheduleType;
            this.offemploymentsModel.hoursWeek=this.hoursWeek;
            this.offemploymentsModel.terminationReasonText=this.terminationReasonText;
            this.offemploymentsModel.wagePeriodCode=this.wagePeriodCode;
            this.offemploymentsCommitModel.insertList = this.offemploymentsInsertList;
            this.offemploymentsCommitModel.updateList = this.offemploymentsUpdateList;

            const offemploymentsSaveData = this.ocdedempFactory.offEmploymentsCommit(this.offemploymentsCommitModel);
            offemploymentsSaveData.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.ocdedempemexecuteQuery();
                } else {
                    this.type = 'error';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                }
            });

        }
    }
    onButDelete() {
        if (this.voffempaddrData.length > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.cannotdeletemasterrecord');
            this.show();
            return;
        }

    }
    onEmploymentInsert = () => {
        if (!this.VHeaderBlockModel || this.VHeaderBlockModel.offenderBookId === undefined) {
            this.offemploymentsData = [];
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
        }
        this.eduAddrUpdateButEmp=true;
        // this.savebtnemp=true;
        if (this.offemploymentsData.length > 0) {
            if (!this.offemploymentsData[this.offemploymentsData.length - 1].employerName ||
                this.offemploymentsData[this.offemploymentsData.length - 1].employerName === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdedemp.employerRecordMustearliar');
                    this.show();
                    return;
            }
        }
        this.readonlyemp = false;
        this.wage = undefined;
        this.hoursWeek = undefined;
        this.terminationReasonText = undefined;
        this.scheduleType = undefined;
        this.wagePeriodCode = undefined;
        this.employerawareFlag = false;
        this.contactemployerFlag = false;
        this.saveBtFlag=true;
        return {
            date: DateFormat.getDate()
        };

    }
    clear() {
        // const wageclear = this.offemploymentsModel.wagePeriodCode === undefined ? '' : undefined;
        // const schtypeclear = this.offemploymentsModel.scheduleType === undefined ? '' : undefined;
        // this.offemploymentsModel.terminationReasonText='';
        // this.offemploymentsModel.wagePeriodCode = wageclear;
        // this.offemploymentsModel.scheduleType = schtypeclear;
        this.wage = undefined;
        this.hoursWeek = undefined;
        this.terminationReasonText = undefined;
        this.scheduleType = undefined;
        this.wagePeriodCode = undefined;
        this.employerawareFlag = false;
        this.contactemployerFlag = false;
    }
    amountKeyDown(event) {
        if (!this.amountFormat.avoidKeys(event, this.offemploymentsModel.wage)) {
            event.stopPropagation();
            return false;
           }
    }
    onAmountBlur(amount) {
        this.amountFormat.precisionFlot(amount);
    }

    onBlurWageEvent(event) {
        if (event) {
            if (event === this.offemploymentsModel.wage) {
                this.wageValue = '';
                if (String(event).indexOf('.') < 0) {
                    this.wageValue = event + '.00';
                } else {
                    this.wageValue = event;
                }
                this.offemploymentsModel.wage = this.wageValue;
                return this.offemploymentsModel.wage;
            }
            if (String(this.offemploymentsModel.wage).length  > 14) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdedemp.wagevalidation');
                this.show();
                return this.offemploymentsModel.wage;
            }
        }

    }
    clearedEmp(event){
        this.saveBtFlag = false;
        this.offemploymentsModel = new OffenderEmployments();
        if(this.offemploymentsData.length>0){
            // this.savebtnemp=false;
            this.eduAddrUpdateButEmp=false;
        } else{
            // this.savebtnemp=true;
            this.eduAddrUpdateButEmp=true;
        }
		this.ocdedempemexecuteQuery();
    }
    clearedEdu($event){
        this.offeducationsModel = new OffenderEducations();
        if(this.offeducationsData.length>0){
            this.eduAddrUpdateBut=false;
        }else{
            this.eduAddrUpdateBut=true;
        }
		this.ocdedempedexecuteQuery();
    }
    isEduInsertable(event){
            const index=this.offeducationsData.indexOf(this.offeducationsModel);
            this.eduGrid.setColumnData('commentText', index, event);
            if(this.offeducationsData.length>0){
                var text=this.offeducationsData[index].schoolName;
                this.eduGrid.setColumnData('schoolName', index, text.slice(0,-1));
                this.eduGrid.setColumnData('schoolName', index, text);
            }
            
    }

    isEmpInsertable(event){
            const index=this.offemploymentsData.indexOf(this.offemploymentsModel);
            this.empGrid.setColumnData('commentText', event, event);
            if(this.offemploymentsData.length>0){
                var text=this.offemploymentsData[index].employerName;
                this.empGrid.setColumnData('employerName', index, text.slice(0,-1));
                this.empGrid.setColumnData('employerName', index, text);
            }
    }
    get savebtnemp():boolean{
        if(this.saveBtFlag){
            return true;
        }
        this.awareFlag = this.employerawareFlag==true?'Y':'N';
        this.contactFlag = this.contactemployerFlag==true?'Y':'N';
        if(this.wage != this.offemploymentsModel.wage ||this.hoursWeek != this.offemploymentsModel.hoursWeek||
            this.terminationReasonText != this.offemploymentsModel.terminationReasonText || this.scheduleType!=this.offemploymentsModel.scheduleType||
            this.wagePeriodCode != this.offemploymentsModel.wagePeriodCode || this.awareFlag != this.offemploymentsModel.employerAwareFlag||
            this.contactFlag != this.offemploymentsModel.contactEmployerFlag){
            return false;
        }
        return true;
    }
}
