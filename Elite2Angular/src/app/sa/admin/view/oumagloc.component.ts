import {
    Component, OnInit,
    ViewChild
} from '@angular/core';

import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { OumaglocService } from '@sa/admin/service/oumagloc.service';
import { AgencyLocations } from '@saadminbeans/AgencyLocations';
import { VAgencyAddresses } from '@saadminbeans/VAgencyAddresses';
import { Phones } from '@instdemographicsbeans/Phones';
import { AgyLocEstablishments } from '@saadminbeans/AgyLocEstablishments';
import { AgencyLocationsCommitBean } from '@saadminbeans/AgencyLocationsCommitBean';
import { PhonesCommitBean } from '@instdemographicsbeans/PhonesCommitBean';
import { AgyLocEstablishmentsCommitBean } from '@saadminbeans/AgyLocEstablishmentsCommitBean';
import { Addresses } from '@instdemographicsbeans/Addresses';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn, GridComponent } from '@core/ui-components/grid/grid.component';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
import { IEPLevelBean } from '@inst/visits-management/beans/ieplevelbean';
import { IEPLevelCommitBean } from '@inst/visits-management/beans/IepLevelCommitBean';
import { AppConstants } from '@core/classes/appConstants';
// import required bean declarations

@Component({
    selector: 'app-oumagloc',
    templateUrl: './oumagloc.component.html'
})

export class OumaglocComponent implements OnInit {
    // Variable declaration
    @ViewChild('grid', { static: true }) grid: any;
    @ViewChild('phoneGrid', {static: true}) phoneGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    agyLocData: AgencyLocations[] = [];
    agyLocDataTemp: AgencyLocations[] = [];
    agyLocModel: AgencyLocations = new AgencyLocations();
    agyLocModelTemp: AgencyLocations = new AgencyLocations();
    agyLocIndex = 0;
    vAgyLocModel: AgencyLocations = new AgencyLocations();
    vAgyLocModelTemp: AgencyLocations = new AgencyLocations();
    agyLocInsertList: AgencyLocations[] = [];
    agyLocUpdateList: AgencyLocations[] = [];
    agyLocDeleteList: AgencyLocations[] = [];
    vAgyAddrData: VAgencyAddresses[] = [];
    vAgyAddrDataTemp: VAgencyAddresses[] = [];
    vAgyAddrModel: VAgencyAddresses = new VAgencyAddresses();
    vAgyAddTemp: VAgencyAddresses = new VAgencyAddresses();
    vAgyAddrIndex = 0;
    vAgyAddrInsertList: VAgencyAddresses[] = [];
    vAgyAddrUpdatetList: VAgencyAddresses[] = [];
    vAgyAddrDeleteList: VAgencyAddresses[] = [];
    phonesData: Phones[] = [];
    phonesDataTemp: Phones[] = [];
    phonesModel: Phones = new Phones();
    addrModel: Addresses = new Addresses();
    phonesIndex = 0;
    phonesInsertList: Phones[] = [];
    phonesUpdateList: Phones[] = [];
    phonesDeleteList: Phones[] = [];
    agyLocEstData: AgyLocEstablishments[] = [];
    agyLocEstDataTemp: AgyLocEstablishments[] = [];
    lstToCompareOtherAttr: any[] = [];
    agyLocEstModel: AgyLocEstablishments = new AgyLocEstablishments();
    agyLocEstIndex = 0;
    agyLocEstInsertList: AgyLocEstablishments[] = [];
    agyLocEstUpdateList: AgyLocEstablishments[] = [];
    agyLocEstDeleteList: AgyLocEstablishments[] = [];
    minDate: any;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    csldReadOnly = false;
    csldAlReadOnly = false;
    rgPhoneTypeRg: any[] = [];
    rgYnFlagRg: any[] = [];
    rgAgencyLocationTypeRg: any[] = [];
    rgJurisdictionRg: any[] = [];
    rgDisabilityAccessCodeRg: any[] = [];
    rgHousingLevelCodesRg: any[] = [];
    rgEstablishmentTypeRg: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    index: number;
    dateValue: any;
    exeQuery: string;
    vaddIndex = 0;
    channelArray: string[];
    position = { top: '05%', bottom: '30%', right: '30%', left: '35%' };
    phonesCommitModel: PhonesCommitBean = new PhonesCommitBean();
    agyLocCommitModel: AgencyLocationsCommitBean = new AgencyLocationsCommitBean();
    agyLocEstCommitModel: AgyLocEstablishmentsCommitBean = new AgyLocEstablishmentsCommitBean();
    columnDefsVAgyAddress: any[];
    columnDefsPhones: any[];
    lstOfAgyLoc: AgencyLocations[];
    otherAttributesColumnDef: any[];
    addrGobalUpdateBtn: boolean;
    deactivationFlag: boolean;
    vaddPopupData: any;
    saveFlag: boolean;
    updateAgyLocFlag: boolean;
    accessCodeFlag: boolean;
    inFlag: boolean;
    courtFlag: boolean;
    activeFlag: boolean;
    nextFlag: boolean;
    prevFlag: boolean;
    saveHousingFlag: boolean;
    newHousingCheck1 = false;
    newHousingCheck2 = false;
    newHousingCheck3 = false;
    newHousingCheck4 = false;
    display: boolean;
    verifyHousingFlag = false;
    checkPhone: boolean;
    tableIndex = -1;
    addressIndex = -1;
    agyLocEstColumnDef: any[];
    agyLocTableIndex = -1;
    isvalid: boolean;
    gridInsBtn = false;
    gridDelBtn = false;
    otherAttriDelBtn = false;
    ieplevelColumnDef: any[];
    ieplevelData: IEPLevelBean[] = [];
    iepLevelInsertList: IEPLevelBean[] = [];
    iepLevelUpdateList: IEPLevelBean[] = [];
    iepLevelDeleteList: IEPLevelBean[] = [];
    iepLevelCommitModel: IEPLevelCommitBean = new IEPLevelCommitBean();
    selectedFormat: any;
    constructor(private oumaglocFactory: OumaglocService, private router: Router,
        public translateService: TranslateService, private renderer: Renderer2, private sessionManager: UserSessionManager) {
        this.columnDefsVAgyAddress = [];
        this.columnDefsPhones = [];
        this.lstOfAgyLoc = [];
        this.otherAttributesColumnDef = [];
    }
    ngOnInit() {
        this.agyLocIndex = 0;
        this.index = 0;
        this.addrGobalUpdateBtn = true;
        this.disabled = true;
        this.saveFlag = true;
        this.updateAgyLocFlag = false;
        this.accessCodeFlag = false;
        this.inFlag = false;
        this.courtFlag = false;
        this.activeFlag = false;
        this.nextFlag = true;
        this.prevFlag = true;
        this.saveHousingFlag = true;
        this.display = true;
        this.agyLocEstColumnDef = [];
        this.agyLocEstColumnDef = [
            {
                fieldName: this.translateService.translate('oumagloc.code') + '*', field: 'agyLocId',
                editable: true, width: 150, cellEditable: this.canCellEdit, datatype: 'text', uppercase: true, maxlength: 6,
            },
            {
                fieldName: this.translateService.translate('oumagloc.agencydescription') + '*', field: 'description',
                editable: true, width: 150, maxlength: 40, datatype: 'text',  uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('oumagloc.agencytype') + '*', field: 'agencyLocationType',
                editable: true, width: 150, domain: 'AGY_LOC_TYPE', datatype: 'lov', optionWidth: 450, cellEditable: this.canCellEdit,
            },
            {
                fieldName: this.translateService.translate('oumagloc.active') + '*', field: 'activeFlag',
                editable: true, width: 150, domain: 'FLAG'/*link: 'oumagloc/rgYnFlagRecordGroup'*/, datatype: 'lov', optionWidth: 150
            },
            {
                fieldName: this.translateService.translate('common.deactivationdate'), field: 'deactivationDate',
                id: 'cfegrddob', datatype: 'date', editable: false, width: 160
            },
            {
                fieldName: this.translateService.translate('oumagloc.contactname'), field: 'contactName',
                editable: true, width: 150, maxlength: 240, uppercase: true
            },
            {
                fieldName: this.translateService.translate('oumagloc.disabilityaccess'), field: 'disabilityAccessCode',
                editable: true, width: 150, domain: 'DISABILITY', datatype: 'lov', optionWidth: 300
            },
            {
                fieldName: this.translateService.translate('oumagloc.courttype'), field: 'jurisdictionCode',
                editable: true, width: 150, domain: 'JURISDICTION', datatype: 'lov', optionWidth: 360
            },
            {
                fieldName: this.translateService.translate('oumagloc.intake'), field: 'intakeFlag',
                editable: true, width: 150, domain: 'FLAG'/*link: 'oumagloc/rgYnFlagRecordGroup'*/, datatype: 'lov', optionWidth: 150
            },
            {
                fieldName: this.translateService.translate('oumacase.casesequence'), field: 'listSeq',
                editable: true, width: 150, datatype: 'number', minValue: '1', maxValue: '999999', whole: true,
            },
            {
                fieldName: this.translateService.translate('oumagloc.printqueue'), field: 'printQueue',
                editable: true, width: 150, datatype: 'number', maxlength: 240
            },
        ];
        this.columnDefsVAgyAddress = [
            {
                fieldName: this.translateService.translate('common.unitnumber'), field: 'suiteNumber',
                editable: true, width: 100
            },
            {
                fieldName: this.translateService.translate('common.streetaddress'), field: 'streetAddress',
                editable: true, width: 170
            },
            {
                fieldName: this.translateService.translate('common.city'), field: 'cityName', width: 125,
                editable: true
            },
            {
                fieldName: this.translateService.translate('common.state'), field: 'provStateDesc',
                editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('common.postalcode'), field: 'zipPostalCode',
                editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('common.country'), field: 'country',
                editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('common.type'), field: 'addressType',
                editable: true, width: 100
            },
            {
                fieldName: this.translateService.translate('comp.address.primary'), field: 'primaryFlag',
                width: 120, editable: false, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('comp.address.mail'), field: 'mailFlag', width: 120,
                editable: false, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', width: 120,
                editable: false, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.isvalidated'),
                field: 'isAddressValid', datatype: 'checkbox', editable: false, width: 150
            }
        ];

        this.columnDefsPhones = [
            {
                fieldName: this.translateService.translate('oumagloc.phoneFormat'), field: 'format', editable: true, width: 200,
                datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true
            },
            {
                fieldName: this.translateService.translate('oumagloc.phonetype'), field: 'phoneType',
                editable: true, width: 200, datatype: 'lov', domain: 'PHONE_USAGE', optionWidth: 300
            },
            {
                fieldName: this.translateService.translate('oumagloc.phonenumber'), field: 'phoneNo',
                editable: true, width: 250, datatype: 'phone', formatType: this.selectedFormat
            },
            {
                fieldName: this.translateService.translate('oumagloc.extension'), field: 'extNo', mask: this.getMask,
                datatype: 'text', editable: true, width: 150, maxlength: 8
            },
        ];
        this.otherAttributesColumnDef = [

            {
                fieldName: this.translateService.translate('oumagloc.otherattributes'), field: 'establishmentType', editable: true,
                width: 300, datatype: 'lov', domain: 'ESTAB_TYPE', required: true, optionWidth: 350
            },
        ];

        this.ieplevelColumnDef = [
            {
                fieldName: this.translateService.translate('oimmholo.ieplevel'), field: 'iepLevelCode',
                editable: true, width: 150, datatype: 'lov', link: '/oidieplv/getIEPLOvs',source:'OIMIEPLV'
            },
        ];

        const rgPhoneTypeServiceObj = this.oumaglocFactory.rgPhoneTypeRecordGroup();
        rgPhoneTypeServiceObj.subscribe(rgPhoneTypeList => {
            if (rgPhoneTypeList.length === 0) {
                this.rgPhoneTypeRg = [];
            } else {
                for (let i = 0; i < rgPhoneTypeList.length; i++) {
                    if (!rgPhoneTypeList[i].description) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumagloc.errordescription');
                        this.show();
                        return;
                    }
                    this.rgPhoneTypeRg.push({
                        'text': rgPhoneTypeList[i].code + ' - ' +
                            rgPhoneTypeList[i].description, 'id': rgPhoneTypeList[i].code
                    });
                }
            }
        });
        const rgYnflagServiceObj = this.oumaglocFactory.rgYnFlagRecordGroup();
        rgYnflagServiceObj.subscribe(rgYnFlagList => {
            if (rgYnFlagList.length === 0) {
                this.rgYnFlagRg = [];
            } else {
                for (let i = 0; i < rgYnFlagList.length; i++) {
                    this.rgYnFlagRg.push({
                        'text': rgYnFlagList[i].code + ' - ' +
                            rgYnFlagList[i].description, 'id': rgYnFlagList[i].code
                    });
                }
            }
        });
        const rgagencylocationtypeServiceObj = this.oumaglocFactory.rgAgencyLocationTypeRecordGroup();
        rgagencylocationtypeServiceObj.subscribe(rgAgencylocTypeList => {
            if (rgAgencylocTypeList.length === 0) {
                this.rgAgencyLocationTypeRg = [];
            } else {
                for (let i = 0; i < rgAgencylocTypeList.length; i++) {
                    this.rgAgencyLocationTypeRg.push({
                        'text': rgAgencylocTypeList[i].code + ' - ' +
                            rgAgencylocTypeList[i].description, 'id': rgAgencylocTypeList[i].code
                    });
                }
            }
        });
        const rgJurisdictionServiceObj = this.oumaglocFactory.rgJurisdictionRecordGroup();
        rgJurisdictionServiceObj.subscribe(rgJurisdictionList => {
            if (rgJurisdictionList.length === 0) {
                this.rgJurisdictionRg = [];
            } else {
                for (let i = 0; i < rgJurisdictionList.length; i++) {
                    if (!rgJurisdictionList[i].description) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumagloc.errordescription');
                        this.show();
                        return;
                    }
                    this.rgJurisdictionRg.push({
                        'text': rgJurisdictionList[i].code + ' - ' +
                            rgJurisdictionList[i].description, 'id': rgJurisdictionList[i].code
                    });
                }
            }
        });
        const rgDisabilityAccessCodeServiceObj = this.oumaglocFactory.rgDisabilityAccessCodeRecordGroup();
        rgDisabilityAccessCodeServiceObj.subscribe(rgDisabilityAccessCodeList => {
            if (rgDisabilityAccessCodeList.length === 0) {
                this.rgDisabilityAccessCodeRg = [];
            } else {
                for (let i = 0; i < rgDisabilityAccessCodeList.length; i++) {
                    this.rgDisabilityAccessCodeRg.push({
                        'text': rgDisabilityAccessCodeList[i].code + ' - ' +
                            rgDisabilityAccessCodeList[i].description, 'id': rgDisabilityAccessCodeList[i].code
                    });
                }
            }
        });
        const rgHousingLevelCodesServiceObj = this.oumaglocFactory.rgHousingLevelCodesRecordGroup();
        rgHousingLevelCodesServiceObj.subscribe(rgHousingLevelCodesList => {
            if (rgHousingLevelCodesList.length === 0) {
                this.rgHousingLevelCodesRg = [];
            } else {
                for (let i = 0; i < rgHousingLevelCodesList.length; i++) {
                    this.rgHousingLevelCodesRg.push({
                        'text': rgHousingLevelCodesList[i].code + ' - ' +
                            rgHousingLevelCodesList[i].description, 'id': rgHousingLevelCodesList[i].code
                    });
                }
            }
        });
        const rgEstablishmentTypeServiceObj = this.oumaglocFactory.rgEstablishmentTypeRecordGroup();
        rgEstablishmentTypeServiceObj.subscribe(rgEstablishmentTypeList => {
            if (rgEstablishmentTypeList.length === 0) {
                this.rgEstablishmentTypeRg = [];
            } else {
                for (let i = 0; i < rgEstablishmentTypeList.length; i++) {
                    if (!rgEstablishmentTypeList[i].description) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumagloc.errordescription');
                        this.show();
                        return;
                    }
                    this.rgEstablishmentTypeRg.push({
                        'text': rgEstablishmentTypeList[i].code + ' - ' +
                            rgEstablishmentTypeList[i].description, 'id': rgEstablishmentTypeList[i].code
                    });
                }
            }
        });
        this.agyLocExecuteQuery();
        this.iepLevelExecuteQuery();
    }
    /**
     * This will clear all the details
     */
    cancel() {
        const agencyLocationType = this.agyLocModel.agencyLocationType === undefined ? '' : undefined;
        const activeFlag = this.agyLocModel.activeFlag === undefined ? '' : undefined;
        const disabilityAccessCode = this.agyLocModel.disabilityAccessCode === undefined ? '' : undefined;
        const jurisdictionCode = this.agyLocModel.jurisdictionCode === undefined ? '' : undefined;
        const intakeFlag = this.agyLocModel.intakeFlag === undefined ? '' : undefined;
        this.agyLocModel = new AgencyLocations();
        this.agyLocModel.agencyLocationType = agencyLocationType;
        this.agyLocModel.activeFlag = activeFlag;
        this.agyLocModel.disabilityAccessCode = disabilityAccessCode;
        this.agyLocModel.jurisdictionCode = jurisdictionCode;
        this.agyLocModel.intakeFlag = intakeFlag;
        this.vAgyLocModelTemp = new AgencyLocations();
        this.vAgyAddrModel = new VAgencyAddresses();
        this.phonesModel = new Phones();
        this.agyLocEstModel = new AgyLocEstablishments();
        this.agyLocData = [];
        this.phonesData = [];
        this.agyLocEstData = [];
        this.vAgyAddrData = [];
        this.lstOfAgyLoc = [];
        this.index = 0;
        this.agyLocIndex = 0;
        this.vAgyLocModel = new AgencyLocations();
        this.addrGobalUpdateBtn = true;
        this.disabled = true;
        this.deactivationFlag = false;
        this.csldAlReadOnly = false;
        this.lstToCompareOtherAttr = [];
        this.saveFlag = true;
        this.updateAgyLocFlag = false;
        this.accessCodeFlag = false;
        this.inFlag = false;
        this.courtFlag = false;
        this.activeFlag = false;
        this.nextFlag = true;
        this.prevFlag = true;
        this.newHousingCheck1 = false;
        this.newHousingCheck2 = false;
        this.newHousingCheck3 = false;
        this.newHousingCheck4 = false;
        this.saveHousingFlag = true;
        this.display = true;
    }

    clearHousingLocations() {
        if (this.agyLocModel.agyLocId === null || this.agyLocModel.agyLocId === undefined) {
            this.agyLocModel = new AgencyLocations();
            return;
        }
        if (!this.newHousingCheck1) {
            this.agyLocModel.housingLev1Code = null;
        }
        if (!this.newHousingCheck2) {
            this.agyLocModel.housingLev2Code = null;
        }
        if (!this.newHousingCheck3) {
            this.agyLocModel.housingLev3Code = null;
        }
        if (!this.newHousingCheck4) {
            this.agyLocModel.housingLev4Code = null;
        }
        if (this.newHousingCheck1 && this.newHousingCheck2 && this.newHousingCheck3 && this.newHousingCheck4) {
            this.saveHousingFlag = true;
        }
    }


    addressesAdded(ev) {
        this.onRowClickagyLocEst(ev);
    }

    activeFlagChangedTrigger(event) {
        if (this.agyLocModel.activeFlag !== undefined && this.agyLocModel.activeFlag !== null) {
            if (this.agyLocModel.activeFlag === 'N') {
                this.agyLocModel.deactivationDate = DateFormat.getDate(this.agyLocModelTemp.deactivationDate);
            } else {
                this.agyLocModel.deactivationDate = null;
            }
        }

        if (!this.agyLocModel.agyLocId) {
            this.saveFlag = false;
        }
        if (!this.activeFlag) {
            this.activeFlag = true;
            return;
        }
        this.saveFlag = false;

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
    populateDetails() {
        this.agyLocModel = this.agyLocData[this.index];
        const serviceObj = this.oumaglocFactory.agyLocExecuteQuery(this.agyLocModel);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                this.agyLocEstData = data;
            }
        });
    }


    nbtHousingLevCodeWhenValidateItemTrigger() {

        if ((this.agyLocModel.housingLev4Code) &&
            (!this.agyLocModel.housingLev3Code || !this.agyLocModel.housingLev2Code || !this.agyLocModel.housingLev1Code)) {
            this.verifyHousingFlag = true;
        } else if ((this.agyLocModel.housingLev3Code) &&
            (!this.agyLocModel.housingLev2Code || !this.agyLocModel.housingLev1Code)) {
            this.verifyHousingFlag = true;
        } else if ((this.agyLocModel.housingLev2Code) && (!this.agyLocModel.housingLev1Code)) {
            this.verifyHousingFlag = true;
        }
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'agyLocId') {
            if (event.data.agyLocId) {
                this.vAgyLocModelTemp.agyLocId = event.data.agyLocId;
                const serviceObj = this.oumaglocFactory.agyLocExecuteQuery(this.vAgyLocModelTemp);
                serviceObj.subscribe(data => {
                    if (data.length >= 1) {
                        this.grid.setColumnData('agyLocId', rowIndex, null);
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumagloc.agencylocationexists');
                        this.show();
                        return rowdata;
                    }

                });
            }
        }
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                if (event.data.activeFlag === 'N') {
                    this.grid.setColumnData('deactivationDate', rowIndex, DateFormat.getDate(this.agyLocModelTemp.deactivationDate));
                } else {
                    this.grid.setColumnData('deactivationDate', rowIndex, null);
                }
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    validateRowClickPhoneAddr = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'format') {
            this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
            PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
            this.phoneGrid.setColumnData('phoneNo', rowIndex, null);
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridClear = () => {
        this.agyLocModel = new AgencyLocations();
        this.agyLocExecuteQuery();
        return true;
    }
    onRowClickagyLocEst(event) {
        if (event) {
            this.agyLocModel = event;
            this.agyLocIndex = this.index + 1;
            this.accessCodeFlag = false;
            this.inFlag = false;
            this.courtFlag = false;
            this.activeFlag = false;
            this.prevFlag = false;
            this.checkHousingLocations();
            this.vAgyLocModel = event;
            this.deactivationFlag = true;
            this.csldAlReadOnly = true;
            this.saveFlag = true;
            this.updateAgyLocFlag = true;
            this.display = false;
            this.onRowClickVAgyAddresses(this.agyLocModel);
            this.estExecuteQuery();
            this.executeQuery();
            if (this.agyLocModel.disabilityAccessCode === null) {
                this.accessCodeFlag = true;
            }
            if (this.agyLocModel.jurisdictionCode === null) {
                this.courtFlag = true;
            }
            if (this.agyLocModel.intakeFlag === null) {
                this.inFlag = true;
            }
            this.index = this.index + 1;
            this.iepLevelExecuteQuery();
        }
    }
    agLocSaveAgyLocCommitValidation(arrData: any[]) {
        this.isvalid = false;
        if (arrData && arrData.length > 0) {
            arrData.forEach(rowData => {
                if (!rowData.agyLocId) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.codemustbeentereddot');
                    this.show();
                    this.isvalid = true;
                    return true;
                }
                if (!rowData.description || rowData.description === undefined || rowData.description === null || (rowData.description && rowData.description.trim() === "")) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumagloc.enteragydes');
                    this.show();
                    this.isvalid = true;
                    return true;
                }
                if (rowData.agencyLocationType === null || rowData.agencyLocationType === undefined) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumagloc.selectagytype');
                    this.show();
                    this.isvalid = true;
                    return true;
                }
                if (rowData.activeFlag === null || rowData.activeFlag === undefined) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumagloc.selectactiveflag');
                    this.show();
                    this.isvalid = true;
                    return true;
                }

            });
        }
        return this.isvalid;
    }
    onGridInsert = () => {
        if (this.agyLocData.length > 0) {
            const rowData = this.agyLocData[this.agyLocData.length - 1];
            if (rowData.agyLocId === undefined || rowData.agyLocId === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.codemustbeentereddot');
                this.show();
                return null;
            }
            if (rowData.description === undefined || rowData.description === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.enteragydes');
                this.show();
                return null;
            }
            if (rowData.agencyLocationType === null || rowData.agencyLocationType === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.selectagytype');
                this.show();
                return null;
            }
            if (rowData.activeFlag === null || rowData.activeFlag === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.selectactiveflag');
                this.show();
                return null;
            }
        }
        this.updateAgyLocFlag = false;
        this.checkHousingLocations();
        return {};
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    agLocSaveAgyLocGrid(event) {
        this.agyLocCommitModel.insertList = [];
        this.agyLocCommitModel.updateList = [];
        this.agyLocInsertList = event.added;
        if (this.agLocSaveAgyLocCommitValidation(this.agyLocInsertList)) {
            return;
        }
        this.agyLocUpdateList = event.updated;
        if (this.agLocSaveAgyLocCommitValidation(this.agyLocUpdateList)) {
            return;
        }
        if (this.agyLocInsertList.length > 0) {
            this.agyLocInsertList.forEach(element => {
                if (element.bailOfficeFlag) {
                    element.bailOfficeFlag = 'Y';
                } else {
                    element.bailOfficeFlag = 'N';
                }
                if (element.agyLocId === this.agyLocModel.agyLocId) {
                    element.housingLev1Code = this.agyLocModel.housingLev1Code;
                    element.housingLev2Code = this.agyLocModel.housingLev2Code;
                    element.housingLev3Code = this.agyLocModel.housingLev3Code;
                    element.housingLev4Code = this.agyLocModel.housingLev4Code;
                }
            });
        }
        if (this.agyLocUpdateList.length > 0) {
            this.agyLocUpdateList.forEach(element => {
                if (element.bailOfficeFlag) {
                    element.bailOfficeFlag = 'Y';
                } else {
                    element.bailOfficeFlag = 'N';
                }
                if (element.agyLocId === this.agyLocModel.agyLocId) {
                    element.housingLev1Code = this.agyLocModel.housingLev1Code;
                    element.housingLev2Code = this.agyLocModel.housingLev2Code;
                    element.housingLev3Code = this.agyLocModel.housingLev3Code;
                    element.housingLev4Code = this.agyLocModel.housingLev4Code;
                }
            });
        }
        if (this.agyLocModel !== null) {
            this.verifyHousingFlag = false;
            this.nbtHousingLevCodeWhenValidateItemTrigger();

            if (this.verifyHousingFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.parenthousinglevel');
                this.show();
                return;
            }

        }
        if (this.agyLocInsertList.length > 0) {
            this.agyLocCommitModel.insertList = this.agyLocInsertList;
        }
        if (this.agyLocUpdateList.length > 0) {
            this.agyLocCommitModel.updateList = this.agyLocUpdateList;
        }
        const agylocSaveData = this.oumaglocFactory.agyLocCommit(this.agyLocCommitModel);
        agylocSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.agyLocModel = new AgencyLocations();
                this.agyLocExecuteQuery();
                this.display = true;
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });

    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    agLocSaveAgyLocForm() {
        this.agyLocInsertList = [];
        this.agyLocUpdateList = [];
        this.agyLocCommitModel.insertList = [];
        this.agyLocCommitModel.updateList = [];
        if (this.agyLocModel.agyLocId === undefined || this.agyLocModel.agyLocId === null) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.codemustbeentereddot');
            this.show();
            this.isvalid = true;
            return true;
        }
        if (this.agyLocModel.description === undefined || this.agyLocModel.description === null) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumagloc.enteragydes');
            this.show();
            this.isvalid = true;
            return true;
        }
        if (this.agyLocModel.agencyLocationType === null || this.agyLocModel.agencyLocationType === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumagloc.selectagytype');
            this.show();
            this.isvalid = true;
            return true;
        }
        if (this.agyLocModel.activeFlag === null || this.agyLocModel.activeFlag === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumagloc.selectactiveflag');
            this.show();
            this.isvalid = true;
            return true;
        }

        if (this.agyLocModel !== null) {
            if (this.agyLocModel.bailOfficeFlag) {
                this.agyLocModel.bailOfficeFlag = 'Y';
            } else {
                this.agyLocModel.bailOfficeFlag = 'N';
            }
            this.verifyHousingFlag = false;
            this.nbtHousingLevCodeWhenValidateItemTrigger();

            if (this.verifyHousingFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.parenthousinglevel');
                this.show();
                return;
            }

            if (!this.updateAgyLocFlag) {
                this.vAgyLocModelTemp.agyLocId = this.agyLocModel.agyLocId;

                const serviceObj = this.oumaglocFactory.agyLocExecuteQuery(this.vAgyLocModelTemp);
                serviceObj.subscribe(data => {
                    if (data.length >= 1) {
                        this.agyLocModel = new AgencyLocations();
                        this.agyLocModel.agyLocId = this.vAgyLocModelTemp.agyLocId;
                        this.display = true;
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumagloc.agencylocationexists');
                        this.agyLocExecuteQuery();
                        this.show();
                        return;
                    }

                });
                this.agyLocInsertList.push(this.agyLocModel);
            } else {
                this.agyLocUpdateList.push(this.agyLocModel);
            }
        }
        if (this.agyLocInsertList.length > 0) {
            this.agyLocCommitModel.insertList = this.agyLocInsertList;
        }
        if (this.agyLocUpdateList.length > 0) {
            this.agyLocCommitModel.updateList = this.agyLocUpdateList;
        }
        const agylocSaveData = this.oumaglocFactory.agyLocCommit(this.agyLocCommitModel);
        agylocSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.agyLocModel = new AgencyLocations();
                this.agyLocExecuteQuery();
                this.display = true;
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    agyLocExecuteQuery() {
        this.csldAlReadOnly = false;
        this.accessCodeFlag = false;
        this.inFlag = false;
        this.courtFlag = false;
        this.activeFlag = false;
        this.newHousingCheck1 = false;
        this.newHousingCheck2 = false;
        this.newHousingCheck3 = false;
        this.newHousingCheck4 = false;
        if (this.agyLocModel !== undefined && this.agyLocModel !== null) {
            if (this.agyLocModel.activeFlag !== undefined && this.agyLocModel.activeFlag !== null) {
                if (this.agyLocModel.activeFlag) {
                    this.agyLocModel.activeFlag = 'Y';
                } else {
                    this.agyLocModel.activeFlag = 'N';
                }
            }
        }
        const serviceObj = this.oumaglocFactory.agyLocExecuteQuery(this.agyLocModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.agyLocModel = new AgencyLocations();
                this.addrGobalUpdateBtn = true;
                this.updateAgyLocFlag = false;
                this.lstToCompareOtherAttr = [];
                this.saveFlag = true;
                this.nextFlag = true;
                this.prevFlag = true;
                this.csldAlReadOnly = false;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.display = true;
                this.show();
                return;
            } else {
                this.index = 0;
                this.agyLocIndex = 0;
                this.agyLocTableIndex = 0;
                for (let i = 0; i < data.length; i++) {

                    if (data[i].activeFlag === 'Y') {
                        if (data[i].deactivationDate !== null) {
                            data[i].deactivationDate = DateFormat.getDate(data[i].deactivationDate);
                        }
                    } else {
                        data[i].deactivationDate = DateFormat.getDate(data[i].deactivationDate);
                    }

                }
                this.deactivationFlag = true;
                this.agyLocData = data;
                this.lstToCompareOtherAttr = [];
                this.lstOfAgyLoc = data;
                this.agyLocModel = this.agyLocData[0];
                this.vAgyLocModel = this.agyLocData[0];
                this.csldAlReadOnly = true;
                this.updateAgyLocFlag = true;
                this.nextFlag = false;
                this.checkHousingLocations();
                this.addrGobalUpdateBtn = false;
                this.saveFlag = true;
                this.nextFlag = false;
                this.display = false;
                if (this.agyLocModel.disabilityAccessCode === null) {
                    this.accessCodeFlag = true;
                }
                if (this.agyLocModel.jurisdictionCode === null) {
                    this.courtFlag = true;
                }
                if (this.agyLocModel.intakeFlag === null) {
                    this.inFlag = true;
                }
                this.estExecuteQuery();
                this.onRowClickVAgyAddresses(this.agyLocModel);
            }
        });
    }

    checkHousingLocations() {
        this.newHousingCheck1 = false;
        this.newHousingCheck2 = false;
        this.newHousingCheck3 = false;
        this.newHousingCheck4 = false;

        if (this.agyLocModel.housingLev1Code !== null) {
            this.newHousingCheck1 = true;
        }
        if (this.agyLocModel.housingLev2Code !== null) {
            this.newHousingCheck2 = true;
        }
        if (this.agyLocModel.housingLev3Code !== null) {
            this.newHousingCheck3 = true;
        }
        if (this.agyLocModel.housingLev4Code !== null) {
            this.newHousingCheck4 = true;
        }

        if (this.newHousingCheck1 && this.newHousingCheck2 && this.newHousingCheck3 && this.newHousingCheck4) {
            this.saveHousingFlag = true;
        } else {
            this.saveHousingFlag = false;
        }
    }

    isInsertable() {
        if (!this.agyLocModel.agyLocId || !this.agyLocModel.description || !this.agyLocModel.agencyLocationType
            || !this.agyLocModel.activeFlag || !this.agyLocModel.deactivationDate || !this.agyLocModel.contactName
            || !this.agyLocModel.disabilityAccessCode || !this.agyLocModel.jurisdictionCode || !this.agyLocModel.intakeFlag
            || !this.agyLocModel.listSeq || !this.agyLocModel.printQueue) {
            this.saveFlag = true;
            this.display = true;
        }
        this.saveFlag = false;
        this.display = false;
    }

    setDisAccessCode() {
        if (!this.vAgyLocModel.agyLocId) {
            this.saveFlag = false;
        }
        if (this.agyLocModel.disabilityAccessCode || this.agyLocModel.disabilityAccessCode === undefined) {
            if (this.accessCodeFlag) {
                this.saveFlag = false;
            } else {
                this.accessCodeFlag = true;
            }
        }
    }

    setCourtType() {

        if (!this.vAgyLocModel.agyLocId) {
            this.saveFlag = false;
        }
        if (this.agyLocModel.jurisdictionCode || this.agyLocModel.jurisdictionCode === undefined) {
            if (this.courtFlag) {
                this.saveFlag = false;
            } else {
                this.courtFlag = true;
            }
        }
    }

    setIntake() {

        if (!this.vAgyLocModel.agyLocId) {
            this.saveFlag = false;
        }
        if (this.agyLocModel.intakeFlag || this.agyLocModel.intakeFlag === undefined) {
            if (this.inFlag) {
                this.saveFlag = false;
            } else {
                this.inFlag = true;
            }
        }
    }

    /**
     * This function is triggered when next button is fired
     */
    agyLocKeyNxtblkTrigger() {
        if (this.lstOfAgyLoc.length === 0) {
            return;
        }
        if ((this.agyLocIndex) < this.lstOfAgyLoc.length - 1) {
            this.agyLocIndex = this.index + 1;
            this.accessCodeFlag = false;
            this.inFlag = false;
            this.courtFlag = false;
            this.activeFlag = false;
            this.prevFlag = false;
            this.agyLocModel = this.lstOfAgyLoc[this.agyLocIndex];
            this.checkHousingLocations();
            this.vAgyLocModel = this.lstOfAgyLoc[this.agyLocIndex];
            this.deactivationFlag = true;
            this.csldAlReadOnly = true;
            this.saveFlag = true;
            this.updateAgyLocFlag = true;
            this.display = false;
            this.onRowClickVAgyAddresses(this.agyLocModel);
            this.estExecuteQuery();
            this.executeQuery();
            if (this.agyLocModel.disabilityAccessCode === null) {
                this.accessCodeFlag = true;
            }
            if (this.agyLocModel.jurisdictionCode === null) {
                this.courtFlag = true;
            }
            if (this.agyLocModel.intakeFlag === null) {
                this.inFlag = true;
            }
            this.index = this.index + 1;
        } else {
            this.type = 'warning';
            this.message = this.translateService.translate('common.nosetofrecordsexist');
            this.show();
            this.nextFlag = true;
            this.prevFlag = false;
        }
    }

    /**
   * This function is triggered when previous button is fired
   */
    agyLocKeyPrvblkTrigger() {
        if (this.lstOfAgyLoc.length === 0) {
            return;
        }
        if (this.agyLocIndex >= 1) {
            this.accessCodeFlag = false;
            this.inFlag = false;
            this.courtFlag = false;
            this.activeFlag = false;
            this.agyLocIndex = this.agyLocIndex - 1;
            this.index = this.agyLocIndex;
            this.nextFlag = false;
            this.agyLocModel = this.lstOfAgyLoc[this.agyLocIndex];
            this.checkHousingLocations();
            this.csldAlReadOnly = true;
            this.vAgyLocModel = this.lstOfAgyLoc[this.agyLocIndex];
            this.deactivationFlag = true;
            this.saveFlag = true;
            this.updateAgyLocFlag = true;
            this.display = false;
            this.onRowClickVAgyAddresses(this.agyLocModel);
            this.estExecuteQuery();
            this.executeQuery();
            if (this.agyLocModel.disabilityAccessCode === null) {
                this.accessCodeFlag = true;
            }
            if (this.agyLocModel.jurisdictionCode === null) {
                this.courtFlag = true;
            }
            if (this.agyLocModel.intakeFlag === null) {
                this.inFlag = true;
            }
        } else {
            this.nextFlag = false;
            this.prevFlag = true;
        }
    }
    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    dateFormat(dateValue) {
        if (dateValue !== undefined && dateValue.length > 0) {
            const newdate = dateValue.split('/');
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }

    /**
    * This function loads the data into the Master Record and its child records
    */
    agLocPopulateDetails() {

        this.phonesModel = new Phones();
        if (this.vAgyAddrModel) {
            this.phonesModel.ownerId = this.vAgyAddrModel.addressId;
            this.phonesModel.ownerClass='ADDR';
            const serviceObj = this.oumaglocFactory.phonesExecuteQuery(this.phonesModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.phonesData = [];
                } else {
                    this.phonesData = data;
                    this.addressIndex = 0;
                }
            });
        }
    }

    /**
    * This function will be fired when add button is clicked to added address specific numbers
    */
    onGridInsertPhoneAddr = () => {

        if (!this.vAgyAddrModel.addressId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumagloc.youcannotcreatearecordwithoutaparentrecord');
            this.show();
            return;
        }

        for (let i = 0; i < this.phonesData.length; i++) {
            if (this.phonesData[i].format === null || this.phonesData[i].format === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.enterphoneformat');
                this.show();
                return false;
            }
            if (this.phonesData[i].phoneType === null || this.phonesData[i].phoneType === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.enterphonetype');
                this.show();
                return false;
            }

            if (this.phonesData[i].phoneNo === null || this.phonesData[i].phoneNo === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.enterphonenumber');
                this.show();
                return false;
            }

        }

        return { ownerId: this.vAgyAddrModel.addressId };
    }

    onRowClickVAgyAddresses(event) {
        this.vAgyLocModel = new AgencyLocations();
        if (event) {
            this.vAgyLocModel = event;
        }
        this.vaddPopupData = { class: 'AGY', agency: event, address: [] };
        if (this.vAgyLocModel.agyLocId) {
            this.vAgyAddrData = [];
            this.executeQuery();
        }

    }

    afterAddressDialogClose() {
        this.onRowClickVAgyAddresses(this.agyLocModel);
    }


    onRowClickVaddr(event) {

        this.vaddPopupData.address = event;
        this.phonesModel = new Phones();
        this.vAgyAddrModel = new VAgencyAddresses();
        this.vAgyAddrModel = event;
        this.agLocPopulateDetails();
        if (event) {
            this.gridInsBtn = true;
        } else {
            this.gridInsBtn = false;
        }
    }

    onRowClickOfAddrSpecNum(event) {
        if (event.createDatetime) {
            this.gridDelBtn = true;
        } else {
            this.gridDelBtn = false;
        }
    }

    /**
     * This function will retrieve the address records based on agency id
     */
    executeQuery() {
        this.vAgyAddrModel = new VAgencyAddresses();
        this.vAgyAddrModel.agyLocId = this.agyLocModel.agyLocId;
        const serviceObj = this.oumaglocFactory.vAgyAddrExecuteQuery(this.vAgyAddrModel);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    data[i].primaryFlag = data[i].primaryFlag === 'Y' ? true : false;
                    data[i].mailFlag = data[i].mailFlag === 'Y' ? true : false;
                    data[i].activeFlag = data[i].activeFlag === 'Y' ? true : false;
                    data[i].isAddressValid = data[i].isAddressValid === 'Y' ? true : false;
                }
                this.vAgyAddrData = data;
                this.vAgyAddrModel = this.vAgyAddrData[0];
                this.vAgyAddTemp = this.vAgyAddrModel;
                this.tableIndex = 0;
                this.agLocPopulateDetails();
            } else {
                this.vAgyAddrData = [];
                this.phonesData = [];
            }
        });

    }
    /**
     * This function will retrieve the address specific numbers records based on address id
     */
    phonesExecuteQuery() {
        const phonesResult = this.oumaglocFactory.phonesExecuteQuery(this.phonesModel);
        phonesResult.subscribe(phonesResultList => {
            if (phonesResultList.length === 0) {
                this.phonesData = [];
                this.phonesModel = new Phones();
            } else {
                this.phonesData = phonesResultList;
                this.phonesModel = phonesResultList[0];
            }
            this.addressIndex = 0;
        });
    }
    checkValidPhonePattern(phoneNo,formatType) {
        const formattedNumber=PhoneNumberUtils.getFormattedNumber(formatType,phoneNo).replace(/[- )(]/g,'');
        const selectedFormat = PhoneNumberUtils.contactType.find(x => formatType === x.maskingCode);
        if (!(String(phoneNo).length === formattedNumber.length) && formatType != 'UNF') {
            if(String(phoneNo).length >= 1 && formattedNumber.length) {
                this.type = 'warn';
                this.message = this.translateService.translate
                    ('common.fieldmustbeform').replace('%format%', selectedFormat.maskFormat);
                this.show();
                return;
            } else if(String(phoneNo).length < 1 && !(formattedNumber)) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.fieldmustbeform');
                this.show();
                return;
            } else if (((String(phoneNo).length > 0 && !formattedNumber))){
                return true;
            }
        } else {
            return true;
        }
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    savePhonesForm(event) {
        this.phonesInsertList = event.added;
        this.phonesUpdateList = event.updated;
        this.phonesDeleteList = event.removed;
        this.phonesCommitModel.insertList = [];
        this.phonesCommitModel.updateList = [];
        this.phonesCommitModel.deleteList = [];
        if (this.phonesInsertList.length > 0) {
            for (let i = 0; i < this.phonesInsertList.length; i++) {

                this.phonesInsertList[i].ownerClass = 'ADDR';

                if (this.phonesInsertList[i].phoneType === undefined ||
                    this.phonesInsertList[i].phoneType === '' ||
                    this.phonesInsertList[i].phoneType === null) {
                    this.message = this.translateService.translate('oumagloc.enterphonetype');
                    this.show();
                    return;
                }

                if (this.phonesInsertList[i].phoneNo === undefined ||
                    this.phonesInsertList[i].phoneNo === null ||
                    this.phonesInsertList[i].phoneNo === '') {
                    this.message = this.translateService.translate('oumagloc.enterphonenumber');
                    this.show();
                    return;
                }
                this.checkPhone = this.checkValidPhonePattern(this.phonesInsertList[i].phoneNo,this.phonesInsertList[i].format);
                if (!this.checkPhone) {
                    return;
                }
            }
        }

        if (this.phonesUpdateList.length > 0) {
            for (let i = 0; i < this.phonesUpdateList.length; i++) {

                this.phonesUpdateList[i].ownerClass = 'ADDR';

                if (this.phonesUpdateList[i].phoneType === undefined ||
                    this.phonesUpdateList[i].phoneType === '' ||
                    this.phonesUpdateList[i].phoneType === null) {
                    this.message = this.translateService.translate('oumagloc.enterphonetype');
                    this.show();
                    return;
                }

                if (this.phonesUpdateList[i].phoneNo === undefined ||
                    this.phonesUpdateList[i].phoneNo === null ||
                    this.phonesUpdateList[i].phoneNo === '') {
                    this.message = this.translateService.translate('oumagloc.enterphonenumber');
                    this.show();
                    return;
                }
                this.checkPhone = this.checkValidPhonePattern(this.phonesUpdateList[i].phoneNo,this.phonesUpdateList[i].format);
                if (!this.checkPhone) {
                    return;
                }
            }
        }

        this.phonesCommitModel.insertList = this.phonesInsertList;
        this.phonesCommitModel.updateList = this.phonesUpdateList;

        if (this.phonesDeleteList.length > 0) {
            for (let i = 0; i < this.phonesDeleteList.length; i++) {
                if (this.phonesDeleteList[i].phoneId === undefined ||
                    this.phonesDeleteList[i].phoneId === null) {
                }
            }
            this.phonesCommitModel.deleteList = this.phonesDeleteList;
        }

        if (this.phonesCommitModel.insertList.length === 0 && this.phonesCommitModel.updateList.length === 0
            && this.phonesCommitModel.deleteList.length === 0) {
            return;
        }
        const phonesSaveData = this.oumaglocFactory.phonesCommit(this.phonesCommitModel);
        phonesSaveData.subscribe(data => {
            if (data === 1) {
                this.phonesData = data;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.agLocPopulateDetails();
                this.show();
            } else {
                this.phonesData = data;
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

    /**
     * This function will be fired when delete button is clicked
     */
    onGridSpecificNumbersDelete = () => {
        for (let i = 0; i < this.phonesData.length; i++) {
            if (!this.phonesData[i].format) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.enterphoneformat');
                this.show();
                return false;
            }
            if (!this.phonesData[i].phoneType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.enterphonetype');
                this.show();
                return false;
            }

            if (!this.phonesData[i].phoneNo) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.enterphonenumber');
                this.show();
                return false;
            }
        }
        return true;
    }

    oumaglocFindRowIndex(): number {
        this.vaddIndex = this.vAgyAddrData.indexOf(this.vAgyAddrModel);
        this.vAgyAddTemp = this.vAgyAddrModel;
        return this.vaddIndex;
    }

    /**
     * This function is fired when add button is clicked
     */
    onGridInsertOtherAttr = () => {
        if (!this.agyLocModel.agyLocId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumagloc.youcannotcreatearecordwithoutaparentrecord');
            this.show();
            return;
        }
        for (let i = 0; i < this.agyLocEstData.length; i++) {
            if (this.agyLocEstData[i].establishmentType === null || this.agyLocEstData[i].establishmentType === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.selectotherattribute');
                this.show();
                return false;
            }

        }
        return { agyLocId: this.agyLocModel.agyLocId };
    }

    onGridOtherAttrDelete = () => {
        for (let l = 0; l < this.agyLocEstData.length; l++) {
            if (!this.agyLocEstData[l].establishmentType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumagloc.selectotherattribute');
                this.show();
                return false;
            }
            if (this.agyLocEstData.length === 1 && this.agyLocEstData[l].agyLocId) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemasterrecord');
                this.show();
                return false;
            }
        }
        return true;
    }

    /**
     * This function is used to retrieve agency location establishments records based on agency id
     */

    estExecuteQuery() {

        this.lstToCompareOtherAttr = [];
        this.agyLocEstModel = new AgyLocEstablishments();
        this.agyLocEstModel.agyLocId = this.agyLocModel.agyLocId;
        const agylocestResult = this.oumaglocFactory.agyLocEstExecuteQuery(this.agyLocEstModel);
        agylocestResult.subscribe(agyLocEstResultList => {
            if (agyLocEstResultList.length === 0) {
                this.agyLocEstData = [];
            } else {
                for (let i = 0; i < agyLocEstResultList.length; i++) {
                    this.lstToCompareOtherAttr.push(agyLocEstResultList[i].establishmentType);
                    agyLocEstResultList[i].newEstablishmentType = agyLocEstResultList[i].establishmentType;
                }
                this.agyLocEstData = agyLocEstResultList;
                this.agyLocEstModel = agyLocEstResultList[0];

            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    saveAgyLocEstForm(event) {
        this.agyLocEstInsertList = event.added;
        this.agyLocEstUpdateList = event.updated;
        this.agyLocEstDeleteList = event.removed;
        this.agyLocEstCommitModel.insertList = [];
        this.agyLocEstCommitModel.updateList = [];
        this.agyLocEstCommitModel.deleteList = [];
        if (this.agyLocEstInsertList.length > 0) {

            for (let i = 0; i < this.agyLocEstInsertList.length; i++) {
                this.agyLocEstInsertList[i].agyLocId = this.agyLocModel.agyLocId;
                if (this.agyLocEstInsertList[i].establishmentType === undefined ||
                    this.agyLocEstInsertList[i].establishmentType === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumagloc.selectotherattribute');
                    this.show();
                    return;
                }
            }


            this.channelArray = [];
            for (let i = 0; i < this.lstToCompareOtherAttr.length; i++) {
                this.channelArray.push(this.lstToCompareOtherAttr[i]);
            }
            for (let i = 0; i < this.agyLocEstInsertList.length; i++) {
                if (this.channelArray.includes(this.agyLocEstInsertList[i].establishmentType)) {
                    this.type = 'warn';
                    this.estExecuteQuery();
                    this.message = this.translateService.translate('oumagloc.otherattrexists');
                    this.show();
                    return;
                } else {
                    this.channelArray.push(this.agyLocEstInsertList[i].establishmentType);
                }
            }
            this.agyLocEstCommitModel.insertList = this.agyLocEstInsertList;
        }

        if (this.agyLocEstUpdateList.length > 0) {

            for (let i = 0; i < this.agyLocEstUpdateList.length; i++) {
                if (this.agyLocEstUpdateList[i].establishmentType === undefined ||
                    this.agyLocEstUpdateList[i].establishmentType === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumagloc.selectotherattribute');
                    this.show();
                    return;
                }

                this.channelArray = [];
                for (let k = 0; k < this.lstToCompareOtherAttr.length; k++) {
                    this.channelArray.push(this.lstToCompareOtherAttr[k]);
                }
                for (let j = 0; j < this.agyLocEstUpdateList.length; j++) {
                    if (this.channelArray.includes(this.agyLocEstUpdateList[j].establishmentType)) {
                        this.type = 'warn';
                        this.estExecuteQuery();
                        this.message = this.translateService.translate('oumagloc.otherattrexists');
                        this.show();
                        return;
                    } else {
                        this.channelArray.push(this.agyLocEstInsertList.length !== 0 ? this.agyLocEstInsertList[j].establishmentType : undefined);
                    }
                }
                this.agyLocEstCommitModel.updateList = this.agyLocEstUpdateList;
            }
        }
        if (this.agyLocEstDeleteList.length > 0) {
            this.agyLocEstCommitModel.deleteList = this.agyLocEstDeleteList;
        }
        const agylocestSaveData = this.oumaglocFactory.agyLocEstCommit(this.agyLocEstCommitModel);
        agylocestSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.estExecuteQuery();
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.cancel();
                this.show();
            }
        });
    }
    getMask = (index, col, data) => {
        return {
            mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
            placeholderChar: ' '
        };
    }

    onRowClickOfOtherAttributes(event) {
        if (event.createDatetime) {
            this.otherAttriDelBtn = true;
        } else {
            this.otherAttriDelBtn = false;
        }
    }


    iepLevelCommit(event) {
        this.iepLevelInsertList = event.added;
        this.iepLevelUpdateList = event.updated;
        this.iepLevelDeleteList = event.removed;
        this.iepLevelCommitModel.insertList = [];
        this.iepLevelCommitModel.updateList = [];
        this.iepLevelCommitModel.deleteList = [];
        if (this.iepLevelInsertList.length > 0 || this.iepLevelUpdateList.length > 0) {
            for (let i = 0; i < this.iepLevelInsertList.length; i++) {
                if (this.iepLevelInsertList[i].iepLevelCode === undefined || this.iepLevelInsertList[i].iepLevelCode === null || this.iepLevelInsertList[i].iepLevelCode === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumagloc.ieplevelmustbeentered');
                    this.show();
                    return;
                }
                this.iepLevelInsertList[i].agyLocId = this.agyLocModel.agyLocId;
                this.iepLevelCommitModel.insertList = this.iepLevelInsertList;
            }
            for (let i = 0; i < this.iepLevelUpdateList.length; i++) {
                if (this.iepLevelUpdateList[i].iepLevelCode === undefined || this.iepLevelUpdateList[i].iepLevelCode === null || this.iepLevelUpdateList[i].iepLevelCode === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumagloc.ieplevelmustbeentered');
                    this.show();
                    return;
                }
                this.iepLevelUpdateList[i].agyLocId = this.agyLocModel.agyLocId;
                this.iepLevelCommitModel.updateList = this.iepLevelUpdateList;
            }
        }
        if (this.iepLevelDeleteList.length > 0) {
            for (let i = 0; i < this.iepLevelDeleteList.length; i++) {
                this.iepLevelCommitModel.deleteList = this.iepLevelDeleteList;
            }
        }
        const usedforSaveData = this.oumaglocFactory.ieplevelCommit(this.iepLevelCommitModel);
        usedforSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.iepLevelExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.cancel();
                this.show();
                this.iepLevelExecuteQuery();
                return;
            }
        });
    }

    iepLevelExecuteQuery() {
        const unitattrResult = this.oumaglocFactory.iepLevelExecuteQuery(this.agyLocModel.agyLocId);
        unitattrResult.subscribe(data => {
            if (data.iepLevelCode !== AppConstants.EMPTYDATA) {
                this.ieplevelData = [];
                this.ieplevelData.push(data);
            } else {
                this.ieplevelData = [];
            }
        });
    }
    onIEPGridInsert = () => {
        if (this.ieplevelData.length === 1) {
            this.message = this.translateService.translate('oumagloc.ieplevelInsert');
            this.type = 'warn';
            this.show();
            return;
        }
        return { iepLevelCode: null };
    }

}
