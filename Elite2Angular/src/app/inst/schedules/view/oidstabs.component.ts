import {
    Component, OnInit, ViewChild
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OidstabsService } from '@instschedules/service/oidstabs.service';
import { VAgencyAddresses } from '@instschedulebeans/VAgencyAddresses';
import { VCorporateAddresses } from '@instschedulebeans/VCorporateAddresses';
import { VAddressUsages } from '@instschedulebeans/VAddressUsages';
import { VPhones } from '@instschedulebeans/VPhones';
import { VOffenderAllSchedules } from '@instschedulebeans/VOffenderAllSchedules';
import { VAgencyAddressesCommitBean } from '@instschedulebeans/VAgencyAddressesCommitBean';
import { VCorporateAddressesCommitBean } from '@instschedulebeans/VCorporateAddressesCommitBean';
import { VOffenderAllSchedulesCommitBean } from '@instschedulebeans/VOffenderAllSchedulesCommitBean';
import { VAddressUsagesCommitBean } from '@instschedulebeans/VAddressUsagesCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OffenderIndSchedules } from '@instschedulebeans/OffenderIndSchedules';
import { OffenderIndSchedulesCommitBean } from '@instschedulebeans/OffenderIndSchedulesCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { json } from '@angular-devkit/core';
import { Router } from '@angular/router';
import { SchedulerService } from '@core/ui-components/schedule/scheduler.service';
import { OnDestroy } from '@angular/core';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { AppConstants } from '@core/classes/appConstants';
import { OidsmsetService } from '../maintenance/service/oidsmset.service';
import { ScheduleMovementSetting } from '../maintenance/beans/ScheduleMovementSetting';
//  import required bean declarations

@Component({
    selector: 'app-oidstabs',
    templateUrl: './oidstabs.component.html'
})

export class OidstabsComponent implements OnInit, OnDestroy {
    checkverifyFlag: boolean;
    isEditableData: { index: any; field: any; error: boolean; };
    @ViewChild('grid', {static: true}) grid: any;
    index: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offschedulesData: VOffenderAllSchedules[] = [];
    offschedulesDataList: VOffenderAllSchedules[] = [];
    offschedulesDataTemp: VOffenderAllSchedules[] = [];
    offschedulesModel: OffenderIndSchedules = new OffenderIndSchedules();
    offschedulesModelTemp: OffenderIndSchedules = new OffenderIndSchedules();
    offschedulesIndex = 0;
    offschedulesCommitModel: VOffenderAllSchedulesCommitBean = new VOffenderAllSchedulesCommitBean();
    offschedulesInsertList: VOffenderAllSchedules[] = [];
    offschedulesUpdateList: VOffenderAllSchedules[] = [];
    offschedulesDeleteList: VOffenderAllSchedules[] = [];
    agyadrData: VAgencyAddresses[] = [];
    agyadrDataTemp: VAgencyAddresses[] = [];
    agyadrModel: VAgencyAddresses = new VAgencyAddresses();
    agyadrModelTemp: VAgencyAddresses = new VAgencyAddresses();
    agyadrInsertList: VAgencyAddresses[] = [];
    agyadrUpdateList: VAgencyAddresses[] = [];
    agyadrDeleteList: VAgencyAddresses[] = [];
    busadrData: VCorporateAddresses[] = [];
    busadrDataTemp: VCorporateAddresses[] = [];
    busadrModel: VCorporateAddresses = new VCorporateAddresses();
    busadrModelTemp: VCorporateAddresses = new VCorporateAddresses();
    busadrCommitModel: VCorporateAddressesCommitBean = new VCorporateAddressesCommitBean();
    busadrInsertList: VCorporateAddresses[] = [];
    busadrUpdateList: VCorporateAddresses[] = [];
    busadrDeleteList: VCorporateAddresses[] = [];
    othadrData: VAddressUsages[] = [];
    othadrDataTemp: VAddressUsages[] = [];
    othadrModel: VAddressUsages = new VAddressUsages();
    othadrModelTemp: VAddressUsages = new VAddressUsages();
    othadrCommitModel: VAddressUsagesCommitBean = new VAddressUsagesCommitBean();
    othadrInsertList: VAddressUsages[] = [];
    othadrUpdateList: VAddressUsages[] = [];
    othadrDeleteList: VAddressUsages[] = [];
    agyphonesData: VPhones[] = [];
    agyphonesDataTemp: VPhones[] = [];
    agyphonesModel: VPhones = new VPhones();
    agyphonesIndex = 0;
    agyphonesInsertList: VPhones[] = [];
    agyphonesUpdateList: VPhones[] = [];
    agyphonesDeleteList: VPhones[] = [];
    busphonesData: VPhones[] = [];
    busphonesDataTemp: VPhones[] = [];
    busphonesModel: VPhones = new VPhones();
    busphonesIndex = 0;
    busphonesInsertList: VPhones[] = [];
    busphonesUpdateList: VPhones[] = [];
    busphonesDeleteList: VPhones[] = [];
    othphonesData: VPhones[] = [];
    othphonesDataTemp: VPhones[] = [];
    othphonesModel: VPhones = new VPhones();
    othphonesIndex = 0;
    othphonesInsertList: VPhones[] = [];
    othphonesUpdateList: VPhones[] = [];
    othphonesDeleteList: VPhones[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    vhbColumnDef: any[];
    agyPhonesColumnDef: any[];
    crtEveColumnDef: any[];
    othPhonesColumnDef: any[];
    ctlLstColumnDef: any[];
    offAllSchColumnDef: any[];
    offSchedulesColumnDef: any[];
    busPhonesColumnDef: any[];
    ctlUnColumnDef: any[];
    offSchColumnDef: any[];
    ctlBlkReadOnly = false;
    ctlLstReadOnly = false;
    ctlUnReadOnly = false;
    titleBlockReadOnly = false;
    offRelDetailsReadOnly = false;
    queryCtrlReadOnly = false;
    batchAddReadOnly = false;
    offAllSchReadOnly = false;
    cancelReadOnly = false;
    qryBlkReadOnly = false;
    vhbReadOnly = false;
    commonBlkReadOnly = false;
    dummyBlkReadOnly = false;
    offEscReadOnly = false;
    sysPflReadOnly = false;
    movementReadOnly = false;
    offSchReadOnly = false;
    ctrlReadOnly = false;
    crtEveReadOnly = false;
    offSchedulesReadOnly = false;
    agyAdrReadOnly = false;
    agyPhonesReadOnly = false;
    busAdrReadOnly = false;
    busPhonesReadOnly = false;
    othAdrReadOnly = false;
    othPhonesReadOnly = false;
    rgsubtypeRg: any[] = [];
    rgescortRg: any[] = [];
    rgtransportRg: any[] = [];
    rgstatusRg: any[] = [];
    rgcorplocRg: any[] = [];
    rgagylocRg: any[] = [];
    rgothlocRg: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    agyadrCommitModel: VAgencyAddressesCommitBean = new VAgencyAddressesCommitBean();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    addressId: any;
    toagyLocId: any;
    offSchfieldName: any;
    eventDateValue: any;
    returnDateValue: any;
    startTimeValue: any;
    returnTimevalue: any;
    daysOutValue: any;
    hoursOutValue: any;
    offIndSchData: OffenderIndSchedules[] = [];
    offIndSchInsertList: OffenderIndSchedules[] = [];
    offIndSchUpdateList: OffenderIndSchedules[] = [];
    offIndSchDeleteList: OffenderIndSchedules[] = [];
    offenderIndSchedulesModel: OffenderIndSchedules = new OffenderIndSchedules();
    offIndSchCommitBeanModel: OffenderIndSchedulesCommitBean = new OffenderIndSchedulesCommitBean();
    disable: boolean;
    agybtndisable: boolean;
    busBtndisable: boolean;
    othBtndisable: boolean;
    agyLovdisable: boolean;
    busLovdisable: boolean;
    othLovdisable: boolean;
    selectedTabIndex: number;
    scheduleFlagdisable: boolean;
    statusFlag: boolean;
    appTime: Date;
    othLaunchBtn: boolean;
    othBtn: boolean;
    agyDeletebtndisable = true;
    agySavebtndisable = true;
    busSaveBtndisable = true;
    busDeleteBtndisable = true;
    othSaveBtndisable = true;
    othDeleteBtndisable = true;
    checkAgyClearFlag = false;
    checkBusClearFlag = false;
    checkOthClearFlag = false;
    disabledFlag = true;
    disabledAgyFlag = true;
    selectedRowIndex = 0;
    saveBtndisabled = true;
    reasonValue: any;
    escortValue: any;
    transportValue: any;
    statusValue: any;
    addFlag = false;
    agcySavebtndisable: boolean;
    agyadrModelTempOne: VAgencyAddresses = new VAgencyAddresses();
    busadrModelTempOne: VCorporateAddresses = new VCorporateAddresses();
    othadrModelTempOne: VAddressUsages = new VAddressUsages();
    purposeLov: string;
    reasonReadonly: boolean;
     screenId='OIDSTABS';
    backButton: boolean;
    typeReadOnly: boolean;
    disabledReason = true;
    // typeValue:any;
    reasonLov: string;
    purpose:string;
    selectedStatusValues: ScheduleMovementSetting ;
    tempAbsenceflag: boolean;
    tapStatusData: any;
    statuscodeValue: any;
    tapConflict = false;
    constructor(private oidstabsFactory: OidstabsService, private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService, public dialogService: DialogService, private router: Router, private schedularService: SchedulerService,
        private eoffenderService: EoffenderService) {
        this.vhbColumnDef = [];
        this.agyPhonesColumnDef = [];
        this.crtEveColumnDef = [];
        this.othPhonesColumnDef = [];
        this.ctlLstColumnDef = [];
        this.offAllSchColumnDef = [];
        this.offSchedulesColumnDef = [];
        this.busPhonesColumnDef = [];
        this.ctlUnColumnDef = [];
        this.offSchColumnDef = [];
    }
    ngOnInit() {
        this.reasonLov = 'oidstabs/rgSubTypeRecordGroup?type='+ 'TAP';
        if (this.schedularService.backBtnFlag) {
			this.backButton = true;
		 } else {
			this.backButton = false;
		 }
        this.reasonValue = undefined;
        // this.typeValue = undefined;
        this.escortValue = undefined;
        this.transportValue = undefined;
        this.statusValue = undefined;
        this.saveBtndisabled = true;
        this.selectedRowIndex = 0;
        this.disabledFlag = true;
        this.disabledReason = true;
        this.disabledAgyFlag = true;
        this.othLaunchBtn = false;
        this.othBtn = true;
        this.scheduleFlagdisable = false;
        this.statusFlag = false;
        this.disable = true;
        this.agybtndisable = true;
        this.busBtndisable = true;
        this.othBtndisable = true;
        this.agyLovdisable = true;
        this.busLovdisable = true;
        this.othLovdisable = true;
        this.agyDeletebtndisable = true;
        this.agySavebtndisable = true;
        this.busSaveBtndisable = true;
        this.busDeleteBtndisable = true;
        this.othSaveBtndisable = true;
        this.othDeleteBtndisable = true;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        // this.typeReadOnly = false;
        this.reasonReadonly = true;
        this.purpose = undefined;
        this.tempSelectedStatusValues();
        this.agyPhonesColumnDef = [
            {
                fieldName: this.translateService.translate('oumagenc.phoneFormat'), field: 'format', editable: true, width: 200,
                datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true
            },
            { fieldName: this.translateService.translate('common.phonetype'), field: 'phoneType', editable: false, width: 190 },
            {
                fieldName: this.translateService.translate('common.phonenumber'), field: 'phoneNo', editable: false,
                width: 190, datatype: 'phone'
            },
            { fieldName: this.translateService.translate('common.extension'), field: 'extNo', editable: false, width: 190 }


        ];
        this.othPhonesColumnDef = [
            {
                fieldName: this.translateService.translate('oumagenc.phoneFormat'), field: 'format', editable: true, width: 200,
                datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true
            },
            { fieldName: this.translateService.translate('common.phonetype'), field: 'phoneType', editable: false, width: 190 },
            {
                fieldName: this.translateService.translate('common.phonenumber'), field: 'phoneNo',
                editable: false, width: 190, datatype: 'phone'
            },
            { fieldName: this.translateService.translate('common.extension'), field: 'extNo', editable: false, width: 190 }
        ];
        this.offSchedulesColumnDef = [
            {
                fieldName: this.translateService.translate('oidstabs.applicationdatefield'),
                field: 'applicationDate', editable: true, width: 200, datatype: 'date', cellEditable: this.canScheduleEdit
            },
            {
                fieldName: this.translateService.translate('oidstabs.applicationtimefield'), field: 'applicationTime',
                editable: true, width: 200, datatype: 'time', cellEditable: this.canScheduleEdit
            },
            {
                fieldName: this.translateService.translate('oidstabs.releasedatefield'), field: 'eventDate',
                editable: true, width: 180, datatype: 'date', cellEditable: this.canScheduleEdit
            },
            {
                fieldName: this.translateService.translate('oidstabs.releasetimefield'), field: 'startTime',
                editable: true, width: 180, datatype: 'time', cellEditable: this.canScheduleEdit
            },
            {
                fieldName: this.translateService.translate('oidstabs.returndatefield'), field: 'returnDate',
                editable: true, width: 180, datatype: 'date', cellEditable: this.canScheduleEdit
            },
            {
                fieldName: this.translateService.translate('oidstabs.returntimefield'), field: 'returnTime',
                editable: true, width: 180, datatype: 'time', cellEditable: this.canScheduleEdit
            },
            { fieldName: this.translateService.translate('oidstabs.daysoutfield'), field: 'daysOut', editable: false, width: 180 },
            { fieldName: this.translateService.translate('oidstabs.hoursoutfield'), field: 'hoursOut', editable: false, width: 180 },
            {
				fieldName: this.translateService.translate('common.iwpdocument')
				, field: 'butIwp', datatype: 'hyperlink',onLaunchClick: this.onEoffenderClick,
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
			},
          
            { fieldName: '', field: 'hideValue', hide: true },

        ];
        this.busPhonesColumnDef = [
            {
                fieldName: this.translateService.translate('oumagenc.phoneFormat'), field: 'format', editable: true, width: 200,
                datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true
            },
            { fieldName: this.translateService.translate('common.phonetype'), field: 'phoneType', editable: false, width: 190 },
            {
                fieldName: this.translateService.translate('common.phonenumber'), field: 'phoneNo',
                editable: false, width: 190, datatype: 'phone'
            },
            { fieldName: this.translateService.translate('common.extension'), field: 'extNo', editable: false, width: 190 }
        ];
        const rgcorplocServiceObj = this.oidstabsFactory.rgCorpLocRecordGroup();
        rgcorplocServiceObj.subscribe(rgcorploclist => {
            if (rgcorploclist.length === 0) {
                this.rgcorplocRg = [];
            } else {
                for (let i = 0; i < rgcorploclist.length; i++) {
                    this.rgcorplocRg.push({ 'id': rgcorploclist[i].addressId, 'description': rgcorploclist[i].description });
                }
            }
        });
        const rgagylocServiceObj = this.oidstabsFactory.rgAgyLocRecordGroup();
        rgagylocServiceObj.subscribe(rgagylocList => {
            if (rgagylocList.length === 0) {
                this.rgagylocRg = [];
            } else {
                for (let i = 0; i < rgagylocList.length; i++) {
                    this.rgagylocRg.push({ 'id': rgagylocList[i].agyLocId, 'description': rgagylocList[i].agyLocIdDesc });
                }
            }
        });
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId) {
            const rgothlocServiceObj = this.oidstabsFactory.rgOthLocRecordGroup(this.vHeaderBlockModel.rootOffenderId);
            rgothlocServiceObj.subscribe(rgothlocList => {
                if (rgothlocList.length === 0) {
                    this.rgothlocRg = [];
                } else {
                    for (let i = 0; i < rgothlocList.length; i++) {
                        this.rgothlocRg.push({ 'id': rgothlocList[i].addressId, 'description': rgothlocList[i].description });
                    }
                }
            });
        }

        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        } else {
            this.disabledFlag = false;
            this.disabledReason = false;
            this.vHeaderBlockModel = this.vHeaderBlockModel;
        }
    }
    /*
     *  This event is used to do the validations in the Grid in Schedules Block.
     */
    canScheduleEdit = (data: any, index: number, field: string): boolean => {
        if (this.isEditableData && this.isEditableData.error) {
            if ((this.isEditableData.field && this.isEditableData.field !== field) ||
                (this.isEditableData.index && this.isEditableData.index !== index)) {
                return false;
            }
        }

        const datePipe = new DatePipe('en-US');
        if (this.offschedulesModel.eventStatus === 'SCH' && this.offschedulesModel.eventId) {
            return false;
        }
        if ((!this.offschedulesModel.applicationDate) && (!this.offschedulesModel.eventDate) && (!this.offschedulesModel.startTime)
            && (!this.offschedulesModel.returnTime) && (!this.offschedulesModel.returnDate)) {
            return true;
        }
        if (!data.eventId) {
            if ((DateFormat.compareDate(DateFormat.getDate(data.applicationDate), DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.appdatevalidation');
                this.show();
                if (field === 'applicationDate') {
                    return true;
                }
                return false;
            }
            if (data.applicationTime) {
                const applicationTime = data.applicationTime.getHours() + ':' + data.applicationTime.getMinutes();
                data.applicationTime = TimeFormat.parse(applicationTime, data.applicationDate);
            }
            if ((data.eventDate) && ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(data.eventDate)) === 1))) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.releasedatevalidation');
                this.show();
                if (field === 'eventDate') {
                    return true;
                }
                return false;
            }
            if (data.startTime && data.eventDate) {
                const startTime = data.startTime.getHours() + ':' + data.startTime.getMinutes();
                data.startTime = TimeFormat.parse(startTime, data.eventDate);
                if (DateFormat.compareDateTime(data.startTime, DateFormat.getDate()) !== 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.releasedatetimevalidation');
                    this.show();
                    if (field === 'startTime') {
                        return true;
                    }
                    return false;
                }
            }
            if ((data.returnDate) &&
                (DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate(data.returnDate)) === 1)) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.returndatevalidation');
                this.show();
                if (field === 'returnDate') {
                    return true;
                }
                return false;
            }
            if (data.startTime && data.returnTime && data.eventDate && data.returnDate) {
                const returnTime = data.returnTime.getHours() + ':' + data.returnTime.getMinutes();
                data.returnTime = TimeFormat.parse(returnTime, data.returnDate);
                if (DateFormat.compareDateTime(data.startTime, data.returnTime) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.returndatetime');
                    this.show();
                    if (field === 'returnTime') {
                        return true;
                    }
                    return false;
                }
            }
        }
        return true;
    }
    /*
     *  This event is used to do the validations when we click on tabs in Destination Block.
     */
    oidstabsWhenTabPageChangedTrigger(event) {
        this.offschedulesModel.contactPersonName = undefined;
        if (this.selectedTabIndex !== event.index) {
            if ((this.agyadrModel.agyLocIdDesc) && event.index === 1) {
                setTimeout(() => { this.selectedTabIndex = 0; }, 0);
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.onlyoneaddresstypeallowed');
                this.show();
                return;
            }
            if ((this.agyadrModel.agyLocIdDesc) && event.index === 2) {
                setTimeout(() => { this.selectedTabIndex = 0; }, 0);
                this.type = 'warn';
                this.message = this.translateService.translate('oiodstabs.agyothlocation');
                this.show();
                return;
            }
            if ((this.busadrModel.description) && event.index === 0) {
                setTimeout(() => { this.selectedTabIndex = 1; }, 0);
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.busagylocation');
                this.show();
                return;
            }
            if ((this.busadrModel.description) && event.index === 2) {
                setTimeout(() => { this.selectedTabIndex = 1; }, 0);
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.busothlocation');
                this.show();
                return;
            }
            if ((this.othadrModel.description) && event.index === 0) {
                setTimeout(() => { this.selectedTabIndex = 2; }, 0);
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.othagylocation');
                this.show();
                return;
            }
            if ((this.othadrModel.description) && event.index === 1) {
                setTimeout(() => { this.selectedTabIndex = 2; }, 0);
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.othbuslocation');
                this.show();
                return;
            }
        }

    }
    /*
     *  This event is used to clear the Agency locations details in Destination block.
     */
    agyLocClearForm() {
        this.checkAgyClearFlag = true;
        this.agyadrModel = new VAgencyAddresses();
        this.agyphonesData = [];
        this.agybtndisable = true;
        this.agySavebtndisable = false;
        this.agyDeletebtndisable = true;
        this.busLovdisable = false;
        this.othLovdisable = false;
    }
    /*
     *  This event is used to clear the Business locations details in Destination block.
     */
    busLocClearForm() {
        this.checkBusClearFlag = true;
        this.busadrModel = new VCorporateAddresses();
        this.busphonesData = [];
        this.busBtndisable = true;
        this.busDeleteBtndisable = true;
        this.busSaveBtndisable = false;
        this.agyLovdisable = false;
        this.othLovdisable = false;
    }
    /*
     *  This event is used to clear the Other locations details in Destination block.
     */
    othLocClearForm() {
        this.checkOthClearFlag = true;
        this.othadrModel = new VAddressUsages();
        this.othphonesData = [];
        this.othBtndisable = true;
        this.othSaveBtndisable = false;
        this.othDeleteBtndisable = true;
        this.agyLovdisable = false;
        this.busLovdisable = false;
    }
    /**
     *  This function will be executed when we click on questionnaire button
     *
     */
    onTabLaunchClick = () => {
        if (this.vHeaderBlockModel && this.offschedulesData.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstabs.pleasecoomittherecord');
            this.show();
            return false;
        }
        if (this.offschedulesModel.eventStatus === 'SCH' && this.offschedulesModel.eventId) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
            this.show();
            return false;
        }
        return true;
    }
    /*
     *  This event is used to set the reason value to selected grid row data in Additional Information Block.
     */
    onReasonChange(event) {
        if (event) {
            this.reasonValue = event.code;
            this.purposeLov = 'oidstabs/rgPurposeRecordGroup?reason='+ this.reasonValue;
            const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
            this.index = node.rowIndex;
            if (this.offschedulesData[this.index].eventSubType !== this.reasonValue && this.offschedulesData[this.index].eventId) {
                this.grid.setColumnData('hideValue', this.index, this.reasonValue);
                this.offschedulesModel.eventPurpose = '';
            }
            if (!this.offschedulesModel.eventId && this.reasonValue) {
                this.grid.setColumnData('hideValue', this.index, this.reasonValue);
                this.offschedulesModel.eventPurpose = '';
            }
            this.offschedulesModel.eventSubType = event.code;
            this.disabledReason = false;
        } else {
            this.offschedulesModel.eventSubType = undefined;
            this.offschedulesModel.eventPurpose = undefined;
            this.disabledReason = true;
            this.reasonReadonly = false;
        }
    }
    /*
     *  This event is used to set the Escort value to selected grid row data in Additional Information Block.
     */
    onEscortChange(event) {
        if (event) {
            this.escortValue = event.code;
            const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
            this.index = node.rowIndex;
            if (this.offschedulesData[this.index].escortCode !== this.escortValue && this.offschedulesData[this.index].eventId) {
                this.grid.setColumnData('hideValue', this.index, this.escortValue);
            } else  if (!this.offschedulesModel.eventId && this.escortValue) {
                this.grid.setColumnData('hideValue', this.index, this.escortValue);
            }
            this.offschedulesModel.escortCode = event.code;
        } else {
            this.offschedulesModel.escortCode = undefined;
        }
    }
    /*
     *  This event is used to set the Transport value to selected grid row data in Additional Information Block.
     */
    onTransportChange(event) {
        if (event) {
            const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
            this.index = node.rowIndex;
            if (this.offschedulesData[this.index].transportCode !== this.transportValue && this.offschedulesData[this.index].eventId) {
                this.grid.setColumnData('hideValue', this.index, this.transportValue);
            } else  if (!this.offschedulesModel.eventId && this.transportValue) {
                this.grid.setColumnData('hideValue', this.index, this.transportValue);
            }
            this.offschedulesModel.transportCode = event.code;
        } else {
            this.offschedulesModel.transportCode = undefined;
        }
        // this.checkverifyFlag = false;
    }
    /*
     *  This event is used to set the Status value to selected grid row data in Additional Information Block.
     */
    onstatusCodeChange() {
        const statusValue = this.offschedulesModel.eventStatus === undefined ? '' : undefined;
        this.offschedulesModel.eventStatus = statusValue;
        if (!this.checkverifyFlag && this.offschedulesData[this.index].eventId) {
            this.grid.setColumnData('hideValue', this.index, statusValue);
        }
    }
    onPurposeChange(event){
        if(event){
            this.purpose = event.code;
            const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
            this.index = node.rowIndex;
            if (this.offschedulesData[this.index].eventPurpose!== this.purpose && this.offschedulesData[this.index].eventId) {
                this.grid.setColumnData('hideValue', this.index, this.purpose);
            } else  if (!this.offschedulesModel.eventId && this.purpose) {
                this.grid.setColumnData('hideValue', this.index, this.purpose);
            }
            this.offschedulesModel.eventPurpose = event.code;
        } 
      
    }
    /*
     *  This event is used to set the Status value to selected grid row data in Additional Information Block.
     */
    onStatusChange(event) {
        if (event) {
            this.statusFlag = true;
            this.scheduleFlagdisable = false;
            // this.typeReadOnly = false;
            this.reasonReadonly = true;
            this.statusValue = event.code;
            const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
             this.index = node.rowIndex;
            if (this.offschedulesData[this.index].eventStatus !== this.statusValue && this.offschedulesData[this.index].eventId) {
                this.grid.setColumnData('hideValue', this.index,  this.statusValue);
            } else  if (!this.offschedulesModel.eventId && this.statusValue) {
                this.grid.setColumnData('hideValue', this.index, this.statusValue);
            }
            this.offschedulesModel.eventStatus = event.code;
            if (this.offschedulesModel.eventStatus === 'SCH' && (!this.offschedulesModel.toAddressId)) {
                this.offschedulesModel.eventStatus = 'PEN';
                this.offschedulesData[this.index].eventStatus = this.offschedulesModel.eventStatus;
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.statusvalidation');
                this.show();
                return;
            }
            if (this.offschedulesModel.eventStatus === 'SCH' && this.offschedulesModel.eventId) {
                this.scheduleFlagdisable = true;
                // this.typeReadOnly = true;
            }
            if(this.offschedulesModel.eventStatus === 'PEN'){
                this.reasonReadonly = false;
            }
            if (this.offschedulesModel.eventStatus) {
                this.offschedulesData[this.index].eventStatus = this.offschedulesModel.eventStatus;
            }
        } else {
            this.offschedulesModel.eventStatus = undefined;
        }
    }
    /*
     *  This event is used to set the Comment value to selected grid row data in Additional Information Block.
     */
    onCommentChange() {
        if (this.offschedulesModel.commentText) {
            this.offschedulesData[this.index].commentText = this.offschedulesModel.commentText;
        }
        this.grid.setColumnData('hideValue', this.index, this.offschedulesModel.commentText);
    }
    setAgencyLocation(event) {
        if (event) {
            if (event.addressId) {
                this.agyadrModelTemp = new VAgencyAddresses();
                this.agyadrModelTemp.addressId = event.addressId;
                this.agyDeletebtndisable = true;
                this.agyadrExecuteQuery();
                const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
                this.index = node.rowIndex;
                this.offschedulesData[this.index].toAddressId = event.addressId;
                this.agybtndisable = false;
            }
        }
    }
    onContactPersonChange() {
        if (this.agyadrModel.contactperson) {
            this.agySavebtndisable = false;
            this.offschedulesData[this.index].contactPersonName = this.agyadrModel.contactperson;
        }
    }
    setBusinessLocation(event) {
        if (event) {
            this.busSaveBtndisable = false;
            if (event.addressId) {
                this.busadrModelTemp = new VCorporateAddresses();
                this.busadrModelTemp.addressId = event.addressId;
                this.busDeleteBtndisable = true;
                this.busadrExecuteQuery();
                this.offschedulesData[this.index].toAddressId = event.addressId;
                this.busBtndisable = false;
            }
        }
    }
    onBusContactPersonChange() {
        if (this.busadrModel.contactperson) {
            this.busSaveBtndisable = false;
            this.offschedulesData[this.index].contactPersonName = this.busadrModel.contactperson;
        }
    }
    onOthContactPersonChange() {
        if (this.othadrModel.contactperson) {
            this.othSaveBtndisable = false;
            this.offschedulesData[this.index].contactPersonName = this.othadrModel.contactperson;
        }
    }
    setOtherLocation(event) {
        if (event) {
            if (event.addressId) {
                this.othadrModelTemp = new VAddressUsages();
                this.othadrModelTemp.addressId = event.addressId;
                this.othDeleteBtndisable = true;
                this.othadrExecuteQuery();
                this.offschedulesData[this.index].toAddressId = event.addressId;
                this.othBtndisable = false;
            }
        }
    }
    /*
     * This event is fired when click on row in Schedules block
     */
    onRowClickoffschedules(event) {
        this.checkAgyClearFlag = false;
        this.checkBusClearFlag = false;
        this.checkOthClearFlag = false;
        if (event) {
            this.disable = true;
            this.offschedulesModel = new OffenderIndSchedules();
            this.offschedulesModel = event;
            this.offschedulesModelTemp = JSON.parse(JSON.stringify(event));
            this.eoffenderService.selectedRowData = event;
            // this.typeValue = undefined;
            this.reasonValue = undefined;
            this.escortValue = undefined;
            this.transportValue = undefined;
            this.statusValue = undefined;
            this.purpose = undefined;
            // this.typeValue = this.offschedulesModelTemp.eventType
            // setTimeout(() => {
            this.reasonValue = this.offschedulesModelTemp.eventSubType;
            // }, 10);
            this.escortValue = this.offschedulesModelTemp.escortCode;
            this.transportValue = this.offschedulesModelTemp.transportCode;
            this.statusValue = this.offschedulesModelTemp.eventStatus;
            setTimeout(() => {
            this.purpose = this.offschedulesModelTemp.eventPurpose;
             }, 10);
            this.index = this.offschedulesData.indexOf(event);
            this.scheduleFlagdisable = false;
            // this.typeReadOnly = false;
            this.reasonReadonly = true;
            if (this.offschedulesModel.eventStatus === 'SCH' && this.offschedulesModel.eventId) {
                this.scheduleFlagdisable = true;
                // this.typeReadOnly = true;
            }
            if(this.offschedulesModel.eventStatus === 'PEN'){
                this.reasonReadonly = false;
            }
            if (event.eventId) {
                this.saveBtndisabled = false;
                this.disable = false;
            }
            if (!event.eventId) {
                this.agyLovdisable = true;
                this.busLovdisable = true;
                this.othLovdisable = true;
                this.agybtndisable = true;
                this.busBtndisable = true;
                this.othBtndisable = true;
            }
            if (event.eventId && (!event.toAddressId)) {
                this.agyLovdisable = false;
                this.busLovdisable = false;
                this.othLovdisable = false;
                this.selectedTabIndex = 0;
            }
            if (this.offschedulesModel.eventId) {
                this.agyadrExecuteQuery();
                this.busadrExecuteQuery();
                this.othadrExecuteQuery();
                this.agyphonesExecuteQuery();
                this.busphonesExecuteQuery();
                this.othphonesExecuteQuery();
            }
        } else {
            this.offschedulesModel = new OffenderIndSchedules();
            this.eoffenderService.selectedRowData = null;
        }
    }
    allowNumbers(event) {
    }
    onRowClickagyphones(event) {
    }
    onRowClickbusphones(event) {
    }
    onRowClickothphones(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    /**
     *  This function will be executed when we select a row in the SearchBlock.
     */
    onOffenderChange(offender) {
        if (offender) {
            if (offender.offenderBookId) {
                this.addFlag = true;
                this.disabledFlag = false;
                this.disabledReason = false;
                this.vHeaderBlockModel = offender;
                this.offschedulesData = [];
                this.oidstabsexecuteQuery();
                if (this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId) {
                    const rgothlocServiceObj = this.oidstabsFactory.rgOthLocRecordGroup(this.vHeaderBlockModel.rootOffenderId);
                    rgothlocServiceObj.subscribe(rgothlocList => {
                        if (rgothlocList.length === 0) {
                            this.rgothlocRg = [];
                            this.othBtn = true;
                            this.othLaunchBtn = false;
                        } else {
                            this.othBtn = false;
                            this.othLaunchBtn = true;
                            for (let i = 0; i < rgothlocList.length; i++) {
                                this.rgothlocRg.push({ 'id': rgothlocList[i].addressId, 'description': rgothlocList[i].description });
                            }
                        }
                    });
                }
            }
        } else {
            this.addFlag = false;
            this.disabledFlag = true;
            this.disabledReason = true;
            this.disable = true;
            this.agybtndisable = true;
            this.agySavebtndisable = true;
            this.agyDeletebtndisable = true;
            this.busBtndisable = true;
            this.busSaveBtndisable = true;
            this.busDeleteBtndisable = true;
            this.othBtndisable = true;
            this.othSaveBtndisable = true;
            this.othDeleteBtndisable = true;
            this.agyLovdisable = true;
            this.busLovdisable = true;
            this.othLovdisable = true;
            this.vHeaderBlockModel = new VHeaderBlock();
            this.offschedulesData = [];
            this.agyadrModel = new VAgencyAddresses();
            this.busadrModel = new VCorporateAddresses();
            this.othadrModel = new VAddressUsages();
            this.agyphonesData = [];
            this.busphonesData = [];
            this.othphonesData = [];
            this.offschedulesModel = new OffenderIndSchedules();
            this.rgothlocRg = [];
        }
    }
    /**
     * To display the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];

    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    oidstabsPopulateDetails() {
        const serviceObj = this.oidstabsFactory.busAdrExecuteQuery(this.offschedulesModel);
        serviceObj.subscribe(data => {
            if (data !== undefined && data.errorMessage.length > 0) {
            } else {
                this.busadrData = data;
            }
        });
    }

    /**
     * This function is used to do save,update and delete the data in OffenderIndSchedules
     *  This function will be executed when commit event is
     * fired
    */
    oidstabsSaveoffschedulesForm(event) {
        /* this.offIndSchInsertList = event.added;
        this.offIndSchUpdateList = event.updated;
        this.offIndSchDeleteList = event.removed; */
        this.schedulesInsertData();
        this.schedulesUpdateData();
        this.schedulesDeleteData();
        this.offIndSchCommitBeanModel.insertList = [];
        this.offIndSchCommitBeanModel.updateList = [];
        this.offIndSchCommitBeanModel.deleteList = [];

        if (this.offIndSchInsertList.length > 0 || this.offIndSchUpdateList.length > 0) {
            for (let i = 0; i < this.offIndSchInsertList.length; i++) {
                let statusValue = this.offIndSchInsertList[i].eventStatus; 
                if (this.statuscodeValue.includes(statusValue)) {
                    this.tempAbsenceflag = true;
                } else{
                    this.tempAbsenceflag = false;

                }
               
                if (!this.offIndSchInsertList[i].applicationDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.applicationdate');
                    this.show();
                    return;
                }
                this.offIndSchInsertList[i].applicationDate =
                DateFormat.getDate(this.offIndSchInsertList[i].applicationDate.setHours(0, 0, 0));
                if ((DateFormat.compareDate(DateFormat.getDate(this.offIndSchInsertList[i].applicationDate),
                    DateFormat.getDate())) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.appdatevalidation');
                    this.show();
                    return false;
                }
                if (!this.offIndSchInsertList[i].eventDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.releasedate');
                    this.show();
                    return;
                }
                if ((this.offIndSchInsertList[i].eventDate) &&
                    (DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(this.offIndSchInsertList[i].eventDate)) === 1)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.releasedatevalidation');
                    this.show();
                    return false;
                }
                if (!this.offIndSchInsertList[i].startTime) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.releasetime');
                    this.show();
                    return;
                }
                if ((this.offIndSchInsertList[i].startTime && this.offIndSchInsertList[i].eventDate) &&
                    DateFormat.compareDate(DateFormat.getDate(this.offIndSchInsertList[i].eventDate), DateFormat.getDate()) === 0) {
                    if (DateFormat.compareDateTime(this.offIndSchInsertList[i].startTime, DateFormat.getDate()) !== 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidstabs.releasedatetimevalidation');
                        this.show();
                        return false;
                    }
                }
                if (!this.offIndSchInsertList[i].returnDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.returndate');
                    this.show();
                    return;
                }

                if ((this.offIndSchInsertList[i].returnDate) &&
                    (DateFormat.compareDate(DateFormat.getDate(this.offIndSchInsertList[i].eventDate),
                        DateFormat.getDate(this.offIndSchInsertList[i].returnDate)) === 1)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.returndatevalidation');
                    this.show();
                    return false;
                }
                if ((this.offIndSchInsertList[i].eventDate && this.offIndSchInsertList[i].returnDate) &&
                    (DateFormat.compareDate(DateFormat.getDate(this.offIndSchInsertList[i].eventDate),
                        DateFormat.getDate(this.offIndSchInsertList[i].returnDate)) === 0)
                    && this.offIndSchInsertList[i].startTime && this.offIndSchInsertList[i].returnTime
                    && this.offIndSchInsertList[i].eventDate && this.offIndSchInsertList[i].returnDate) {
                    if (DateFormat.compareDateTime(this.offIndSchInsertList[i].startTime,
                        this.offIndSchInsertList[i].returnTime) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidstabs.returndatetime');
                        this.show();
                        return false;
                    }
                }

                // if (!this.offIndSchInsertList[i].eventType) {
                //     this.type = 'warn';
                //     this.message = this.translateService.translate('oidstabs.type');
                //     this.show();
                //     return;
                // }

                if (!this.offIndSchInsertList[i].eventSubType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.reason');
                    this.show();
                    return;
                }

                if (!this.offIndSchInsertList[i].escortCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.escort');
                    this.show();
                    return;
                }
                if (!this.offIndSchInsertList[i].transportCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.transport');
                    this.show();
                    return;
                }
                if (!this.offIndSchInsertList[i].eventStatus) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.status');
                    this.show();
                    return;
                }
                if (this.offIndSchInsertList[i].eventStatus === 'SCH' && (!this.offIndSchInsertList[i].toAddressId)) {
                    this.offIndSchUpdateList[i].eventStatus = 'PEN';
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.statusvalidation');
                    this.show();
                    return;
                }
                this.offIndSchInsertList[i].eventClass = 'EXT_MOV';
                 this.offIndSchInsertList[i].eventType = 'TAP';
                this.offIndSchInsertList[i].directionCode = 'OUT';
                this.offIndSchInsertList[i].agyLocId = this.vHeaderBlockModel.agyLocId;
                this.offIndSchInsertList[i].toAgyLocId = this.toagyLocId;
                this.offIndSchInsertList[i].toAddressId = this.addressId;
                this.offIndSchInsertList[i].toAddressOwnerClass = this.toagyLocId;
                this.offIndSchInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offIndSchInsertList[i].outcomeReasonCode = this.reasonValue;

                if(this.offIndSchInsertList[i].startTime && !this.offIndSchInsertList[i].returnTime){
                    this.offIndSchInsertList[i].returnTime = DateFormat.getDate(DateFormat.getDate(this.offIndSchInsertList[i].returnDate).setHours(23,59,0,0));
                }
            }
            for (let i = 0; i < this.offIndSchUpdateList.length; i++) {
                let statusValue = this.offIndSchUpdateList[i].eventStatus; 
                if (this.statuscodeValue.includes(statusValue)) {
                    this.tempAbsenceflag = true;
                } else{
                    this.tempAbsenceflag = false;

                }
                if (this.statusFlag) {
                    this.offIndSchUpdateList[i].conflictFlag = false;
                } else {
                    this.offIndSchUpdateList[i].conflictFlag = true;
                }
                if (!this.offIndSchUpdateList[i].applicationDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.applicationdate');
                    this.show();
                    return;
                }
                if ((DateFormat.compareDate(DateFormat.getDate(this.offIndSchUpdateList[i].applicationDate),
                    DateFormat.getDate())) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.appdatevalidation');
                    this.show();
                    return false;
                }
                if (!this.offIndSchUpdateList[i].eventDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.releasedate');
                    this.show();
                    return;
                }
                if (!this.offIndSchUpdateList[i].startTime) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.releasetime');
                    this.show();
                    return;
                }
                if ((this.offIndSchUpdateList[i].eventDate) &&
                    (DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(this.offIndSchUpdateList[i].eventDate)) === 1)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.releasedatevalidation');
                    this.show();
                    return false;
                }

                if ((this.offIndSchUpdateList[i].startTime && this.offIndSchUpdateList[i].eventDate) &&
                    DateFormat.compareDate(DateFormat.getDate(this.offIndSchUpdateList[i].eventDate), DateFormat.getDate()) === 0) {
                    if (DateFormat.compareDateTime(this.offIndSchUpdateList[i].startTime, DateFormat.getDate()) !== 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidstabs.releasedatetimevalidation');
                        this.show();
                        return false;
                    }
                }

                if (!this.offIndSchUpdateList[i].returnDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.returndate');
                    this.show();
                    return;
                }

                if ((this.offIndSchUpdateList[i].returnDate) &&
                    (DateFormat.compareDate(DateFormat.getDate(this.offIndSchUpdateList[i].eventDate),
                        DateFormat.getDate(this.offIndSchUpdateList[i].returnDate)) === 1)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.returndatevalidation');
                    this.show();
                    return false;
                }
                if ((this.offIndSchUpdateList[i].eventDate && this.offIndSchUpdateList[i].returnDate) &&
                    (DateFormat.compareDate(DateFormat.getDate(this.offIndSchUpdateList[i].eventDate),
                        DateFormat.getDate(this.offIndSchUpdateList[i].returnDate)) === 0)
                    && this.offIndSchUpdateList[i].startTime && this.offIndSchUpdateList[i].returnTime
                    && this.offIndSchUpdateList[i].eventDate && this.offIndSchUpdateList[i].returnDate) {
                    if (DateFormat.compareDateTime(DateFormat.getDate(this.offIndSchUpdateList[i].startTime),
                        DateFormat.getDate(this.offIndSchUpdateList[i].returnTime)) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidstabs.returndatetime');
                        this.show();
                        return false;
                    }
                }


                this.offIndSchUpdateList[i].applicationDate = new Date(this.offIndSchUpdateList[i].applicationDate);
                this.offIndSchUpdateList[i].eventDate = DateFormat.getDate(this.offIndSchUpdateList[i].eventDate);
                this.offIndSchUpdateList[i].startTime = DateFormat.getDate(this.offIndSchUpdateList[i].startTime);
                this.offIndSchUpdateList[i].returnTime = !this.offIndSchUpdateList[i].returnTime ? undefined : DateFormat.getDate(this.offIndSchUpdateList[i].returnTime);
                this.offIndSchUpdateList[i].returnDate = DateFormat.getDate(this.offIndSchUpdateList[i].returnDate);
                if (this.offIndSchUpdateList[i].eventStatus === 'SCH' && (!this.offIndSchUpdateList[i].toAddressId)) {
                    this.offIndSchUpdateList[i].eventStatus = 'PEN';
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.statusvalidation');
                    this.show();
                    return;
                }
                // if (!this.offIndSchUpdateList[i].eventType) {
                //     this.type = 'warn';
                //     this.message = this.translateService.translate('oidstabs.type');
                //     this.show();
                //     return;
                // }
                if (!this.offIndSchUpdateList[i].eventSubType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.reason');
                    this.show();
                    return;
                }
                if (!this.offIndSchUpdateList[i].escortCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.escort');
                    this.show();
                    return;
                }
                if (!this.offIndSchUpdateList[i].transportCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.transport');
                    this.show();
                    return;
                }
                if (!this.offIndSchUpdateList[i].eventStatus) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.status');
                    this.show();
                    return;
                }
            }

            this.offIndSchCommitBeanModel.insertList = this.offIndSchInsertList;
            this.offIndSchCommitBeanModel.updateList = this.offIndSchUpdateList;
        }

        if (this.offIndSchDeleteList.length > 0) {
            for (let i = 0; i < this.offIndSchDeleteList.length; i++) {
                if (this.offIndSchDeleteList[i].eventStatus === 'SCH') {
                    this.oidstabsexecuteQuery();
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.approveschedulescanntdelete');
                    this.show();
                    return;
                }
                if (this.offIndSchDeleteList[i].toAddressId) {
                    this.oidstabsexecuteQuery();
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstabs.cannotdeleterecord');
                    this.show();
                    return;
                }
            }
            this.offIndSchCommitBeanModel.deleteList = this.offIndSchDeleteList;
        }
        if(this.offIndSchCommitBeanModel.insertList.length>0){
            const offschCheckConflit = this.oidstabsFactory.offSchCheckScheduleConflict(this.offschedulesModel);
                offschCheckConflit.subscribe(checkConflict => {
    
                    if (checkConflict > 0 && this.tapConflict ) {
    
                        this.dialogService.openLinkDialog('/oiuscinq', this.offschedulesModel).subscribe(result => {
                            if (!result) {
                                return;
                            } else {
                                this.checkNonAssociation();
    
                            }
                        });
                    } else {
    
                        this.checkNonAssociation();
                    }
                });
            }
             
            if(this.offIndSchCommitBeanModel.deleteList.length>0){
            this.offSchCommitQuery();
        }
        if(this.offIndSchCommitBeanModel.updateList.length>0){
        this.checkConflicts();
          
        }
        
        if(this.offIndSchCommitBeanModel.deleteList.length === 0 && this.offIndSchCommitBeanModel.insertList.length === 0 && this.offIndSchCommitBeanModel.updateList.length === 0){
            this.offSchCommitQuery();
        }
    }
    /**
     * This function is used to do save,update and delete the data in OffenderIndSchedules
     *  This function will be executed when commit event is
     * fired
    */
    offSchCommitQuery() {
        const offschedulesSaveData = this.oidstabsFactory.offSchedulesCommit(this.offIndSchCommitBeanModel);
        offschedulesSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.oidstabsexecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

   

    checkConflicts(){
        const offschedulesSaveData = this.oidstabsFactory.offSchedulesCommit(this.offIndSchCommitBeanModel);
        offschedulesSaveData.subscribe(data => {
            if (data > 1 && this.tempAbsenceflag) {
                this.dialogService.openLinkDialog('/oiuscinq', this.offschedulesModel).subscribe(result => {
                    if (result.eventId) {
                        for (let i = 0; i < this.offIndSchCommitBeanModel.updateList.length; i++) {
                            if (this.offIndSchCommitBeanModel.updateList[i].eventId === result.eventId) {
                                this.offIndSchCommitBeanModel.updateList[i].conflictFlag = true;
                            }
                        }
                        this.checkNonAssociation();
                    } else {
                        for (let i = 0; i < this.offIndSchCommitBeanModel.updateList.length; i++) {
                            if (this.offIndSchCommitBeanModel.updateList[i].eventId === result.eventId) {
                                this.offIndSchCommitBeanModel.updateList[i].conflictFlag = true;
                                this.offIndSchCommitBeanModel.updateList[i].eventStatus = 'PEN';
                            }
                        }
                        this.checkNonAssociation();
                    }
                });
            } else {
                if (data === 0) {
                    for (let i = 0; i < this.offIndSchCommitBeanModel.updateList.length; i++) {
                      this.offIndSchCommitBeanModel.updateList[i].conflictFlag = true;
                        
                    }
                    this.checkNonAssociation();
                }
                if(data === 1){
                    for (let i = 0; i < this.offIndSchCommitBeanModel.updateList.length; i++) {
                        this.offIndSchCommitBeanModel.updateList[i].conflictFlag = true;
                          
                      }
                      this.checkNonAssociation();
                }
            }
        });

    }

    checkNonAssociation(){
        this.oidstabsFactory.checkNonAssociations(this.offIndSchCommitBeanModel).subscribe(data => {
            if(data && data != 'EMPTYDATA'){
                const msgOne  = this.translateService.translate('oidstabs.nonassociationconflictmsg');
                const msgTwo = this.translateService.translate('ocdclogs.doyouwanttocontinue');
                const msgThree  = this.translateService.translate('oidstabs.indinonassocconflict');
                const msgFour = this.translateService.translate('oidstabs.gangnonassocconflict');
                data = data.replaceAll('oidstabs.nonassociationconflictmsg',msgOne);
                data = data.replaceAll('oidstabs.doyouwanttocontinue',msgTwo);
                data = data.replaceAll('oidstabs.indinonassocconflict',msgThree);
                data = data.replaceAll('oidstabs.gangnonassocconflict',msgFour);
                const labelMsg = {
                label: this.translateService.translate(data), yesBtn: true, proceedWithNoConflictsBtn: false,cancelBtn:true,
                    proceedBtnDisabled: true
                };
                 this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                    if(result){
                        this.offSchCommitQuery();
                    }else{
                        return;
                    }
                });
            }else{
                this.offSchCommitQuery();
            }
          }); 
    }
   
    oidstabsexecuteQuery() {
        this.offschedulesModel = new OffenderIndSchedules();
        this.offschedulesModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.oidstabsFactory.offSchedulesExecuteQuery(this.offschedulesModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.disabledFlag = true;
                this.disabledReason = true;
                this.disabledAgyFlag = true;
                this.offschedulesData = [];
                this.offschedulesDataTemp=[];
                this.agyadrModel = new VAgencyAddresses();
                this.agyphonesData = [];
                this.busadrModel = new VCorporateAddresses();
                this.busphonesData = [];
                this.othadrModel = new VAddressUsages();
                this.agyphonesData = [];
                this.agybtndisable = true;
                this.agySavebtndisable = true;
                this.agyDeletebtndisable = true;
                this.busBtndisable = true;
                this.busSaveBtndisable = true;
                this.busDeleteBtndisable = true;
                this.othBtndisable = true;
                this.othSaveBtndisable = true;
                this.othDeleteBtndisable = true;
                this.agyLovdisable = true;
                this.busLovdisable = true;
                this.othLovdisable = true;
                this.selectedTabIndex = 0;
                this.reasonValue = '';
                // this.typeValue = '';
                this.escortValue = '';
                this.transportValue = '';
                this.statusValue = '';
                this.agyadrModel.agyLocIdDesc=''
                this.offschedulesModel.commentText = '';
                this.purpose='';
            } else {
                this.disabledFlag = false;
                this.disabledReason = false;
                this.disabledAgyFlag = false;
                data.forEach(element => {
                    element['dbExist'] = true;
                    element['butIwp'] = '';
                    element['SCREEN'] = this.screenId + "~" + "true" + "~" + element['eventId'];
                });
                this.isEditableData = undefined;
                this.offschedulesData = data;
                this.offschedulesDataTemp=JSON.parse(JSON.stringify(data));
                this.offschedulesModel = data[0];
                this.addressId = this.offschedulesModel.toAddressId;
                this.toagyLocId = this.offschedulesModel.toAgyLocId;
                this.selectedRowIndex = 0;
            }
        });
    }

    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    oidstabsdateFormat(dateValue) {
        if (dateValue !== undefined && dateValue.length > 0) {
            const newdate = dateValue.split('/');
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }
    agyadrExecuteQuery() {
        let data = 0;
        this.agyadrModel = new VAgencyAddresses();
        this.agyadrModel.addressId = this.offschedulesModel.toAddressId;
        if (this.agyadrModelTemp.addressId) {
            data = 1;
            this.agyadrModel.addressId = this.agyadrModelTemp.addressId;
            this.agyadrModelTemp = new VAgencyAddresses();
        }
        const agyadrResult = this.oidstabsFactory.
            agyAdrExecuteQuery(this.agyadrModel);
        agyadrResult.subscribe(agyadrResultList => {
            if (agyadrResultList.length === 0) {
                this.agyadrData = [];
                this.agybtndisable = true;
                this.agyDeletebtndisable = true;
                this.agySavebtndisable = true;
            } else {
                if (data === 0) {
                    this.agyDeletebtndisable = false;
                }
                this.agySavebtndisable = false;
                this.selectedTabIndex = 0;
                this.agybtndisable = false;
                this.agyLovdisable = false;
                this.busBtndisable = true;
                this.busLovdisable = true;
                this.othLovdisable = true;
                this.othBtndisable = true;
                if (this.offschedulesModel.eventStatus === 'SCH' && this.offschedulesModel.eventId) {
                    this.agySavebtndisable = true;
                    this.agybtndisable = true;
                    this.agyDeletebtndisable = true;
                }
                this.agyadrData = agyadrResultList;
                this.agyadrModel = agyadrResultList[0];
                this.agyadrModel.contactperson = this.offschedulesModel.contactPersonName;
                for (let i = 0; i < this.rgagylocRg.length; i++) {
                    if (this.agyadrModel.agyLocId === this.rgagylocRg[i].id) {
                        this.agyadrModel.agyLocIdDesc = this.rgagylocRg[i].description;
                    }
                }
                this.agyadrModelTempOne =  JSON.parse(JSON.stringify(this.agyadrModel));
                this.agyphonesExecuteQuery();
            }

        });
    }
    /**
     * This function is used to do update Locations in OffenderIndSchedules
     *  This function will be executed when commit event is
     * fired
    */
    oidstabsSaveagyadrForm(data: string) {//one
        if(data === 'tabOne'){
        //  TODO declare commit bean and add insert list to that object.
        this.offIndSchUpdateList = [];
        for (let i = 0; i < this.offschedulesData.length; i++) {
            this.offenderIndSchedulesModel = new OffenderIndSchedules();
            if ((!this.offschedulesData[this.index].toAddressId) && this.offschedulesData[this.index].toAddressId === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.pleasecoomittherecord');
                this.show();
            }
            if (this.checkAgyClearFlag) {
                this.offschedulesData[this.index].toAddressId = undefined;
                this.offschedulesData[this.index].contactPersonName = undefined;
            } else {
                this.offenderIndSchedulesModel.toAddressId = this.offschedulesData[this.index].toAddressId;
                this.offenderIndSchedulesModel.contactPersonName = this.offschedulesData[this.index].contactPersonName;
            }

            this.offenderIndSchedulesModel.eventId = this.offschedulesData[this.index].eventId;
            this.offenderIndSchedulesModel.toAgyLocId = this.agyadrModel.agyLocId;
            this.offenderIndSchedulesModel.toAddressOwnerClass = this.agyadrModel.agyLocId;
            this.offenderIndSchedulesModel.locType = AppConstants.AGENCY;
            this.offIndSchUpdateList.push(this.offenderIndSchedulesModel);
        }
        this.checkBusClearFlag = false;
        this.checkAgyClearFlag = false;
        this.checkOthClearFlag = false;
        this.offIndSchCommitBeanModel.updateList = [];
        //this.offIndSchCommitBeanModel.updateList = this.offIndSchUpdateList;
        this.offIndSchCommitBeanModel.agyUpdateList = this.offIndSchUpdateList
        this.oidstabsSaveoffschedulesForm(event);
        /* const agyadrSaveData = this.oidstabsFactory.adrLocationCommit(this.offIndSchCommitBeanModel);
        agyadrSaveData.subscribe(data => {
            if (data === 1) {
                this.agyDeletebtndisable = false;
                this.agySavebtndisable = true;
                this.oidstabsexecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.disable = true;
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        }); */
    }
    }
    /**
     * This function is used to do delete the Locations in OffenderIndSchedules
     *  This function will be executed when commit event is
     * fired
    */
    oidstabsDeleteagyadrForm() {
        this.agyadrModel = new VAgencyAddresses();
        this.agyphonesData = [];
        if (this.offschedulesData[this.index].eventType === 'SCH') {
            this.type = 'info';
            this.message = this.translateService.translate('oidstabs.schvalidation');
            this.show();
            this.disable = true;
        }
        this.offIndSchUpdateList = [];
        for (let i = 0; i < this.offschedulesData.length; i++) {
            this.offenderIndSchedulesModel = new OffenderIndSchedules();
            this.offenderIndSchedulesModel.toAddressId = undefined;
            this.offenderIndSchedulesModel.contactPersonName = this.offschedulesData[this.index].contactPersonName;
            this.offenderIndSchedulesModel.eventId = this.offschedulesData[this.index].eventId;
            this.offenderIndSchedulesModel.toAgyLocId = this.agyadrModel.agyLocId;
            this.offenderIndSchedulesModel.toAddressOwnerClass = this.agyadrModel.agyLocId;
            this.offIndSchUpdateList.push(this.offenderIndSchedulesModel);
        }

        this.offIndSchCommitBeanModel.updateList = [];
        this.offIndSchCommitBeanModel.updateList = this.offIndSchUpdateList;
        const agyadrSaveData = this.oidstabsFactory.adrLocationCommit(this.offIndSchCommitBeanModel);
        agyadrSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.disable = true;
                this.oidstabsexecuteQuery();
                this.othLovdisable = false;
                this.busLovdisable = false;
                this.agybtndisable = true;

            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    busadrExecuteQuery() {
        let busIndex = 0;
        this.busadrModel = new VCorporateAddresses();
        this.busadrModel.addressId = this.offschedulesModel.toAddressId;
        if (this.busadrModelTemp.addressId) {
            busIndex = 1;
            this.busadrModel.addressId = this.busadrModelTemp.addressId;
            this.busadrModelTemp = new VCorporateAddresses();
        }
        const busadrResult = this.oidstabsFactory.
            busAdrExecuteQuery(this.busadrModel);
        busadrResult.subscribe(busadrResultList => {
            if (busadrResultList.length === 0) {
                this.busadrData = [];
                this.busadrModel=new VCorporateAddresses();
                this.busadrModelTempOne=new VCorporateAddresses();
                this.busBtndisable = true;
                this.busSaveBtndisable = true;
                this.busDeleteBtndisable = true;
            } else {
                if (busIndex === 0) {
                    this.busDeleteBtndisable = false;
                }
                //this.busSaveBtndisable = false;
                this.selectedTabIndex = 1;
                this.busLovdisable = false;
                this.busBtndisable = false;
                this.othLovdisable = true;
                this.othBtndisable = true;
                this.agybtndisable = true;
                this.agyLovdisable = true;
                if (this.offschedulesModel.eventStatus === 'SCH' && this.offschedulesModel.eventId) {
                    this.busSaveBtndisable = true;
                    this.busBtndisable = true;
                    this.busDeleteBtndisable = true;
                }
                this.busadrData = busadrResultList;
                this.busadrModel = busadrResultList[0];
                this.busadrModel.contactperson = this.offschedulesModel.contactPersonName;
                for (let i = 0; i < this.rgcorplocRg.length; i++) {
                    if (this.busadrModel.addressId === this.rgcorplocRg[i].id) {
                        this.busadrModel.description = this.rgcorplocRg[i].description;
                    }
                }
                this.busadrModelTempOne =  JSON.parse(JSON.stringify(this.busadrModel));
                this.busphonesExecuteQuery();
            }
        });
    }
    concatDateTime(date, time?) {
        if (!date) {
            return undefined;
        }
        if (!time) {
            return DateFormat.getDate(DateFormat.getDate(date).setHours(0, 0, 0, 0));
        }

        time = DateFormat.getDate(time);
        date = DateFormat.getDate(date);
        const returnDate = date.setHours(time.getHours(), time.getMinutes(), 0, 0);
        return DateFormat.getDate(returnDate);

    }

    /**
     * This function is used to do update the Locations in OffenderIndSchedules
     *  This function will be executed when commit event is
     * fired
    */
    oidstabsSaveBusadrForm(data : string) {//two
        //  TODO declare commit bean and add insert list to that object.
        if(data === 'tabTwo'){
        this.offIndSchUpdateList = [];
        for (let i = 0; i < this.offschedulesData.length; i++) {
            this.offenderIndSchedulesModel = new OffenderIndSchedules();
            if ((!this.offschedulesData[this.index].toAddressId) && this.offschedulesData[this.index].toAddressId === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.pleasecoomittherecord');
                this.show();
            }
            if (this.checkBusClearFlag) {
                this.offschedulesData[this.index].toAddressId = undefined;
                this.offschedulesData[this.index].contactPersonName = undefined;
            } else {
                this.offenderIndSchedulesModel.toAddressId = this.offschedulesData[this.index].toAddressId;
                this.offenderIndSchedulesModel.contactPersonName = this.offschedulesData[this.index].contactPersonName;
            }

            this.offenderIndSchedulesModel.eventId = this.offschedulesData[this.index].eventId;
            this.offenderIndSchedulesModel.toAgyLocId = undefined;
            this.offenderIndSchedulesModel.toAddressOwnerClass = undefined;
            this.offenderIndSchedulesModel.locType = AppConstants.BUSINESS;
            this.offIndSchUpdateList.push(this.offenderIndSchedulesModel);
        }
        this.checkBusClearFlag = false;
        this.checkAgyClearFlag = false;
        this.checkOthClearFlag = false;
        this.offIndSchCommitBeanModel.updateList = [];
        this.offIndSchCommitBeanModel.agyUpdateList = this.offIndSchUpdateList;
        this.oidstabsSaveoffschedulesForm(event);
        /* this.offIndSchCommitBeanModel.updateList = this.offIndSchUpdateList;
        const busadrSaveData = this.oidstabsFactory.adrLocationCommit(this.offIndSchCommitBeanModel);
        busadrSaveData.subscribe(data => {
            if (data === 1) {
                this.busDeleteBtndisable = false;
                this.oidstabsexecuteQuery();
                this.busSaveBtndisable = true;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.busSaveBtndisable = false;
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        }); */
    }
    }
    /**
     * This function is used to do delete the Locations in OffenderIndSchedules
     *  This function will be executed when commit event is
     * fired
    */
    oidstabsDeleteBusadrForm() {
        this.busphonesData = [];
        this.busadrModel = new VCorporateAddresses();
        if (this.offschedulesData[this.index].eventType === 'SCH') {
            this.type = 'info';
            this.message = this.translateService.translate('oidstabs.schvalidation');
            this.show();
            this.disable = true;
        }
        this.offIndSchUpdateList = [];
        for (let i = 0; i < this.offschedulesData.length; i++) {
            this.offenderIndSchedulesModel = new OffenderIndSchedules();
            this.offenderIndSchedulesModel.toAddressId = undefined;
            this.offenderIndSchedulesModel.contactPersonName = this.offschedulesData[this.index].contactPersonName;
            this.offenderIndSchedulesModel.eventId = this.offschedulesData[this.index].eventId;
            this.offenderIndSchedulesModel.toAgyLocId = undefined;
            this.offenderIndSchedulesModel.toAddressOwnerClass = undefined;
            this.offIndSchUpdateList.push(this.offenderIndSchedulesModel);
        }

        this.offIndSchCommitBeanModel.updateList = [];
        this.offIndSchCommitBeanModel.updateList = this.offIndSchUpdateList;
        const agyadrSaveData = this.oidstabsFactory.adrLocationCommit(this.offIndSchCommitBeanModel);
        agyadrSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.disable = true;
                this.busBtndisable = true;
                this.othLovdisable = false;
                this.agyLovdisable = false;
                this.oidstabsexecuteQuery();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    othadrExecuteQuery() {
        let othIndex = 0;
        this.othadrModel = new VAddressUsages();
        this.othadrModel.addressId = this.offschedulesModel.toAddressId;
        if (this.othadrModelTemp.addressId) {
            othIndex = 1;
            this.othadrModel.addressId = this.othadrModelTemp.addressId;
            this.othadrModelTemp = new VAddressUsages();
        }
        const othadrResult = this.oidstabsFactory.
            othAdrExecuteQuery(this.othadrModel);
        othadrResult.subscribe(othadrResultList => {
            if (othadrResultList.length === 0) {
                this.othadrData = [];
                this.othadrModelTempOne=new VAddressUsages();
                this.othadrModel=new VAddressUsages();
                this.othBtndisable = true;
                this.othSaveBtndisable = true;
                this.othDeleteBtndisable = true;
            } else {
                if (othIndex === 0) {
                    this.othDeleteBtndisable = false;
                }
                this.selectedTabIndex = 2;
                this.othSaveBtndisable = false;
                this.othLovdisable = false;
                this.othBtndisable = false;
                this.agybtndisable = true;
                this.agyLovdisable = true;
                if (this.offschedulesModel.eventStatus === 'SCH' && this.offschedulesModel.eventId) {
                    this.othSaveBtndisable = true;
                    this.othBtndisable = true;
                    this.othDeleteBtndisable = true;
                }
                this.othadrData = othadrResultList;
                this.othadrModel = othadrResultList[0];
                this.othadrModel.contactperson = this.offschedulesModel.contactPersonName;
                for (let i = 0; i < this.rgothlocRg.length; i++) {
                    if (this.othadrModel.addressId === this.rgothlocRg[i].id) {
                        this.othadrModel.description = this.rgothlocRg[i].description;
                    }
                }
                this.othadrModelTempOne =  JSON.parse(JSON.stringify(this.othadrModel));
                this.othphonesExecuteQuery();
            }
        });
    }
    /**
     * This function is used to do update the Locations in OffenderIndSchedules
     *  This function will be executed when commit event is
     * fired
    */
    oidstabsSaveothadrForm(data : string) {
        if(data === 'tabThree'){
        this.offIndSchUpdateList = [];
        for (let i = 0; i < this.offschedulesData.length; i++) {
            this.offenderIndSchedulesModel = new OffenderIndSchedules();
            if ((!this.offschedulesData[this.index].toAddressId) && this.offschedulesData[this.index].toAddressId === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.pleasecoomittherecord');
                this.show();
            }
            if (this.checkOthClearFlag) {
                this.offschedulesData[this.index].toAddressId = undefined;
                this.offschedulesData[this.index].contactPersonName = undefined;
            } else {
                this.offenderIndSchedulesModel.toAddressId = this.offschedulesData[this.index].toAddressId;
                this.offenderIndSchedulesModel.contactPersonName = this.offschedulesData[this.index].contactPersonName;
            }

            this.offenderIndSchedulesModel.eventId = this.offschedulesData[this.index].eventId;
            this.offenderIndSchedulesModel.toAgyLocId = undefined;
            this.offenderIndSchedulesModel.toAddressOwnerClass = undefined;
            this.offenderIndSchedulesModel.locType = AppConstants.OTHER;
            this.offIndSchUpdateList.push(this.offenderIndSchedulesModel);
        }
        this.checkBusClearFlag = false;
        this.checkAgyClearFlag = false;
        this.checkOthClearFlag = false;
        this.offIndSchCommitBeanModel.updateList = [];
        this.offIndSchCommitBeanModel.agyUpdateList = this.offIndSchUpdateList;
        this.oidstabsSaveoffschedulesForm(event);
       /*  this.offIndSchCommitBeanModel.updateList = this.offIndSchUpdateList;
        const othadrSaveData = this.oidstabsFactory.adrLocationCommit(this.offIndSchCommitBeanModel);
        othadrSaveData.subscribe(data => {
            if (data === 1) {
                this.othDeleteBtndisable = false;
                this.oidstabsexecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        }); */

    }
    }
    /**
     * This function is used to do delete the Locations in OffenderIndSchedules
     *  This function will be executed when commit event is
     * fired
    */
    oidstabsDeleteOthadrForm() {
        this.othphonesData = [];
        this.othadrModel = new VAddressUsages();
        if (this.offschedulesData[this.index].eventType === 'SCH') {
            this.type = 'info';
            this.message = this.translateService.translate('oidstabs.schvalidation');
            this.show();
            this.disable = true;
        }
        this.offIndSchUpdateList = [];
        for (let i = 0; i < this.offschedulesData.length; i++) {
            this.offenderIndSchedulesModel = new OffenderIndSchedules();
            this.offenderIndSchedulesModel.toAddressId = undefined;
            this.offenderIndSchedulesModel.contactPersonName = this.offschedulesData[this.index].contactPersonName;
            this.offenderIndSchedulesModel.eventId = this.offschedulesData[this.index].eventId;
            this.offenderIndSchedulesModel.toAgyLocId = undefined;
            this.offenderIndSchedulesModel.toAddressOwnerClass = undefined;
            this.offIndSchUpdateList.push(this.offenderIndSchedulesModel);
        }

        this.offIndSchCommitBeanModel.updateList = [];
        this.offIndSchCommitBeanModel.updateList = this.offIndSchUpdateList;
        const agyadrSaveData = this.oidstabsFactory.adrLocationCommit(this.offIndSchCommitBeanModel);
        agyadrSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.disable = true;
                this.othBtndisable = true;
                this.othLovdisable = false;
                this.busLovdisable = false;
                this.oidstabsexecuteQuery();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    agyphonesExecuteQuery() {
        this.agyphonesModel = new VPhones();
        this.agyphonesModel.ownerId = this.agyadrModel.addressId;
        const agyphonesResult = this.oidstabsFactory.
            agyPhonesExecuteQuery(this.agyphonesModel);
        agyphonesResult.subscribe(agyphonesResultList => {
            if (agyphonesResultList.length === 0) {
                this.agyphonesData = [];
            } else {
                this.agyphonesData = agyphonesResultList;
                this.agyphonesModel = agyphonesResultList[0];
            }
        });
    }
    busphonesExecuteQuery() {
        this.busphonesModel = new VPhones();
        this.busphonesModel.ownerId = this.busadrModel.addressId;
        const busphonesResult = this.oidstabsFactory.
            busPhonesExecuteQuery(this.busphonesModel);
        busphonesResult.subscribe(busphonesResultList => {
            if (busphonesResultList.length === 0) {
                this.busphonesData = [];
            } else {
                this.busphonesData = busphonesResultList;
                this.busphonesModel = busphonesResultList[0];
            }
        });
    }
    othphonesExecuteQuery() {
        this.othphonesModel = new VPhones();
        this.othphonesModel.ownerId = this.othadrModel.addressId;
        const othphonesResult = this.oidstabsFactory.
            othPhonesExecuteQuery(this.othphonesModel);
        othphonesResult.subscribe(othphonesResultList => {
            if (othphonesResultList.length === 0) {
                this.othphonesData = [];
            } else {
                this.othphonesData = othphonesResultList;
                this.othphonesModel = othphonesResultList[0];
            }
        });
    }
    /*
     *  This event is used to do the validations when click Add button in Schedules Block.
     */
    onGridInsert = () => {
        if (!this.vHeaderBlockModel.offenderBookId) {
            return;
        }
        this.disabledFlag = false;
        this.disabledReason = true;
        this.reasonReadonly = false;
        if (this.vHeaderBlockModel.statusDisplay == 'Inactive') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstabs.inactiveoffenderscannotbeassignedtotemporaryabsence');
            this.show();
            return;
        }
        if (this.offschedulesData.length === 0 && this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
            return {
                applicationDate: DateFormat.getDate(), applicationTime: undefined, eventDate: undefined, startTime: undefined,
                returnDate: undefined, returnTime: undefined,
                daysOut: undefined, hoursOut: undefined, toAgyLocid: this.toagyLocId, toAddressId: this.addressId, eventStatus: 'PEN'
            };
        }
        this.agyadrModel = new VAgencyAddresses();
        this.busadrModel =new VCorporateAddresses();
        this.othadrModel =new VAddressUsages();
        this.agyphonesData = [];
        this.busphonesData =[];
        this.othphonesData=[];
        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
        }
        for (let i = 0; i < this.offschedulesData.length; i++) {
            if (!this.offschedulesData[i].applicationDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.applicationdate');
                this.show();
                return;
            }
            if (!this.offschedulesData[i].eventDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.releasedate');
                this.show();
                return;
            }
            if (!this.offschedulesData[i].startTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.releasetime');
                this.show();
                return;
            }

            if (!this.offschedulesData[i].returnDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.returndate');
                this.show();
                return;
            }
            // if (!this.offschedulesData[i].eventType) {
            //     this.type = 'warn';
            //     this.message = this.translateService.translate('oidstabs.type');
            //     this.show();
            //     return;
            // }
            if (!this.offschedulesData[i].eventSubType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.reason');
                this.show();
                return;
            }
            if (!this.offschedulesData[i].escortCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.escort');
                this.show();
                return;
            }
            if (!this.offschedulesData[i].transportCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.transport');
                this.show();
                return;
            }
            if (!this.offschedulesData[i].eventStatus) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstabs.status');
                this.show();
                return;
            }
        }
        return {
            applicationDate: DateFormat.getDate(), applicationTime: '', eventDate: '', startTime: '', returnDate: '', returnTime: '',
            daysOut: '', hoursOut: '', toAgyLocid: this.toagyLocId, eventStatus: 'PEN'
        };
    }
    /*
     *  This event is used to do the validations when we click on column values in grid in Schedules Block.
     */
    scheduleEvent = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        const notField = ['daysOut', 'hoursOut'];
        // this. agcySavebtndisable=true;
        // if (this.offschedulesData.length > 0 && JSON.stringify(this.offschedulesData) === JSON.stringify(this.offschedulesDataTemp)) {
        //    this. agcySavebtndisable=true;
        // } else if(this.offschedulesData.length === 0){
           
        //     this. agcySavebtndisable=true;
        // }else{
        //     this. agcySavebtndisable=false;
        // }
        /* if(this.offschedulesData.length>0 && this.offschedulesData.length!==this.offschedulesDataTemp.length){
           this. agcySavebtndisable=true;
        } */
        if (!notField.includes(event.field)) {
            const index = rowIndex;

            const eventData = { index: index, field: event.field, data: event.data };
            const eventResult = this.schedulesValidation(eventData);
            if (!eventResult.error) {
                this.isEditableData = undefined;
                if (event.data.eventDate && event.data.returnDate) {
                    const h = Math.abs(DateFormat.getDate(event.data.returnDate).getTime() -
                        DateFormat.getDate(event.data.eventDate).getTime()) / 36e5;
                    const daysOut = Math.round(h / 24);
                    this.grid.setColumnData('daysOut', index, daysOut);
                }
                if (event.data.startTime && event.data.returnTime) {
                    const startTime = event.data.eventDate ? this.concatDateTime(event.data.eventDate, event.data.startTime) :
                        event.data.startTime;
                    const returnTime = event.data.returnDate ? this.concatDateTime(event.data.returnDate, event.data.returnTime) :
                        event.data.returnTime;
                        const timeDifferenceInMilliseconds =returnTime- startTime;        
                        const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
                        const minutes = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
                        const time = `${hours}.${minutes}`;
                    const h = Math.abs(DateFormat.getDate(startTime).getTime() -
                        DateFormat.getDate(returnTime).getTime()) / 36e5;
                    this.grid.setColumnData('hoursOut', index, time);
                }
            } else {
                this.isEditableData = eventResult;
            }
            if (event.data.eventDate && event.data.returnDate) {
                const h = Math.abs(DateFormat.getDate(event.data.returnDate).getTime() -
                    DateFormat.getDate(event.data.eventDate).getTime()) / 36e5;
                const daysOut = Math.round(h / 24);
                this.grid.setColumnData('daysOut', index, daysOut);
            }
            if (event.data.startTime && event.data.eventDate) {
                event.data.startTime = DateFormat.getDate(event.data.startTime);
                const strTimeValue = event.data.startTime.getHours() + ':' + event.data.startTime.getMinutes();
                event.data.startTime = TimeFormat.parse(strTimeValue, event.data.eventDate);
            }
            if (event.data.returnTime && event.data.returnDate) {
                event.data.returnTime = DateFormat.getDate(event.data.returnTime);
                const returnTimeValue = event.data.returnTime.getHours() + ':' + event.data.returnTime.getMinutes();
                event.data.returnTime = TimeFormat.parse(returnTimeValue, event.data.returnDate);
            }
            if (event.data.startTime && event.data.returnTime) {
                const timeDifferenceInMilliseconds = event.data.returnTime- event.data.startTime;        
            const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
            const time = `${hours}.${minutes}`;              
                this.grid.setColumnData('hoursOut', index, time);
            }

            if(!event.data.startTime || !event.data.returnTime){
                this.grid.setColumnData('hoursOut', index, 0);
            }
        }
       
        rowdata.validated = true;
        return rowdata;


    }

    schedulesValidation(event) {
        const returnData = { index: undefined, field: undefined, error: false };
        // aplicationDaate should be greater than current date and less than eventDate
        if (event.field === 'applicationDate') {
            if (event.applicationDate && DateFormat.compareDate(DateFormat.getDate(event.data.applicationDate), DateFormat.getDate()) > 0) {
                this.showMsg('oidstabs.appdatevalidation');
                returnData.index = event.index;
                returnData.field = event.field;
                returnData.error = true;
                return returnData;
            }
            // if (!event.eventDate || DateFormat.compareDate(DateFormat.getDate(event.data.applicationDate),
            //     DateFormat.getDate(event.data.eventDate)) > 0 ) {
            //         this.showMsg('oidstabs.releasedatevalidation');
            //         returnData.index = event.index;
            //         returnData.field = 'eventDate';
            //         returnData.error = true;
            //         return returnData;
            // }
        }
        if (event.field === 'applicationTime') {
            if (!event.data.applicationDate) {
                returnData.index = event.index;
                returnData.field = 'applicationDate';
                returnData.error = true;
                return returnData;
            }
        }
        if (event.field === 'eventDate') {
            if(!event.data.eventId)  {
                this.conflictEvent(event.data);
            }            
            if (event.eventDate && DateFormat.compareDate(DateFormat.getDate(),
                DateFormat.getDate(event.data.eventDate)) > 0) {
                if (event.data.startTime) {
                    this.showMsg('oidstabs.releasedatetimevalidation');
                } else {
                    this.showMsg('oidstabs.releasedatevalidation');
                }
                returnData.index = event.index;
                returnData.field = event.field;
                returnData.error = true;
                return returnData;
            }
        }
        if ((event.data.eventDate && event.data.returnDate) && DateFormat.compareDate(DateFormat.getDate(event.data.returnDate),
            DateFormat.getDate(event.data.eventDate)) < 0) {
            this.showMsg('oidstabs.releasedatemustbe');
            returnData.index = event.index;
            returnData.field = event.field;
            returnData.error = true;
            return returnData;
        }
        if (event.field === 'startTime') {
            if (!event.data.eventDate) {
                this.showMsg('oidstabs.releasedate');
                returnData.index = event.index;
                returnData.field = 'eventDate';
                returnData.error = true;
                return returnData;
            } else {
                if ((event.data.eventDate && DateFormat.compareDate(DateFormat.getDate(),
                    DateFormat.getDate(event.data.eventDate)) > 0) &&
                    DateFormat.compareTime(DateFormat.getDate(), DateFormat.getDate(event.data.startTime)) > 0) {
                    this.showMsg('oidstabs.releasedatetimevalidation');
                    returnData.index = event.index;
                    returnData.field = event.field;
                    returnData.error = true;
                    return returnData;
                }
                if (((event.data.eventDate && DateFormat.compareDate(DateFormat.getDate(),
                    DateFormat.getDate(event.data.eventDate)) === 0)) &&
                    event.data.returnTime && DateFormat.compareTime(DateFormat.getDate(event.data.returnTime),
                        DateFormat.getDate(event.data.startTime)) < 0) {
                    this.showMsg('oidstabs.returndatetime');
                    returnData.index = event.index;
                    returnData.field = event.field;
                    returnData.error = true;
                    return returnData;
                }
            }
        }
        if (event.field === 'returnDate') {
            if(!event.data.eventId)  {
                this.conflictEvent(event.data);
            } 
            if (event.data.eventDate && event.data.returnDate &&
                DateFormat.compareDate(DateFormat.getDate(event.data.eventDate), DateFormat.getDate(event.data.returnDate)) > 0) {
                if (event.data.returnTime) {
                    this.showMsg('oidstabs.returndatetime');
                } else {
                    this.showMsg('oidstabs.returndatevalidation');
                }
                returnData.index = event.index;
                returnData.field = event.field;
                returnData.error = true;
                return returnData;
            }
        }
          if (event.field === 'returnTime') {
            if (!event.data.returnDate) {
                this.showMsg('oidstabs.returndate');
            } else {
                if ((event.data.eventDate && event.data.returnDate && DateFormat.compareDate(DateFormat.getDate(event.data.eventDate),
                    DateFormat.getDate(event.data.returnDate)) === 0)
                    && event.data.returnTime && event.data.startTime &&
                    DateFormat.compareTime(DateFormat.getDate(event.data.returnTime), DateFormat.getDate(event.data.startTime)) < 0) {
                    this.showMsg('oidstabs.returndatetime');
                }
            }
        }
        return returnData;
    }

    othLaunchBtnClickEvent() {
        if (this.vHeaderBlockModel && this.offschedulesData.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstabs.pleasecoomittherecord');
            this.show();
            this.othLaunchBtn = false;
            return;
        }
        if (this.rgothlocRg.length > 0) {
            this.othLaunchBtn = true;
            this.othBtn = false;
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstabs.notapaddress');
            this.show();
            this.othLaunchBtn = false;
            this.othBtn = true;
        }
    }
    onGridClear = () => {
        if (this.offschedulesData.length === 0) {
            this.offschedulesModel = new OffenderIndSchedules();
        }
        this.isEditableData = undefined;
        this.selectedRowIndex = 0;
        this.oidstabsexecuteQuery();
        return true;
    }
    showMsg(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    onStatusBlur() {
        if (!this.statusValue) {
            this.statusValue = this.statusValue === '' ? undefined : '';
        }
    }

    schedulesInsertData() {
        this.offIndSchInsertList = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.offIndSchInsertList.push(v);
            }
        );
    }

    schedulesUpdateData() {
        this.offIndSchUpdateList = [];
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.offIndSchUpdateList.push(v);
            }
        );
    }

    get dsableBtn() {
        if ((this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0 || this.grid.removedMap.size > 0)) {
            return false;
        } else if (JSON.stringify(this.offschedulesDataTemp) !== JSON.stringify(this.offschedulesData)) {
            return false;
        } 

        return true;
        
       
    }
    schedulesDeleteData() {
        this.offIndSchDeleteList = [];
        this.grid.removedMap.forEach(
            (v: any, k: number) => {
                this.offIndSchDeleteList.push(v);
            }
        );
    }

    onBack() {
		if(this.schedularService.backBtnFlag){
			this.schedularService.backBtnFlag = false;
			this.router.navigate(['/CALSCH']);
		} 
	}

    ngOnDestroy() {
        this.schedularService.backBtnFlag = false;
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
    }
    
    // onTypeChange(event) {
    //     if(event && event.code){
    //         this.reasonLov = 'oidstabs/rgSubTypeRecordGroup?type='+ event.code;
    //         this.disabledReason = false;
    //         this.offschedulesModel.eventType = event.code;
    //     } else {
    //         this.disabledReason = true;
    //         this.offschedulesModel.eventType = undefined;
    //         this.reasonValue = undefined;
    //     }
        
    // }

    // onTypeBlur() {
    //     if (!this.typeValue) {
    //       this.typeValue = this.typeValue === '' ? undefined : '';
    //     }
    // }
    onEoffenderClick = (data) => {
        this.eoffenderService.selectedRowData=data;
        this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : data['SCREEN'] } } );
     }

     tempSelectedStatusValues(){
        const searchResult = this.oidstabsFactory.tapScheduleSettingExecuteQuery();
        searchResult.subscribe(data => {
            if (data.length === 0) {
                this.selectedStatusValues = new ScheduleMovementSetting();
            } else {
                this.tapStatusData = data.find(value => value.settingCode === 'TAP_SCH_CONFLICT');
                this.statuscodeValue = this.tapStatusData.settingValue.split(',')
            }

            
        });
     }

     conflictEvent(event){
        this.tapConflict = false;
        this.offschedulesModel.offenderBookId =this.vHeaderBlockModel.offenderBookId;
        this.offschedulesModel.returnDate =event.returnDate;
        this.offschedulesModel.eventDate =event.eventDate;
        const offschCheckConflit = this.oidstabsFactory.offSchCheckScheduleConflict(this.offschedulesModel);
            offschCheckConflit.subscribe(checkConflict => {
                if (checkConflict > 0 ) {
                    this.dialogService.openLinkDialog('/oiuscinq', this.offschedulesModel).subscribe(result => {
                        if (result !== null) {
                            this.tapConflict = false;
                        } else {
                            this.tapConflict = true;

                        }
                    });
                } 
            });
     } 
     

}
