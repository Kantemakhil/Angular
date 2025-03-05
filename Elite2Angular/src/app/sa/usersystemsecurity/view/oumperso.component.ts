import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumpersoService } from '@sa/usersystemsecurity/service/oumperso.service';
import { StaffMembers } from '@instincidentsbeans/StaffMembers';
import { VStaffAddresses } from '@sausersystemsecuritybeans/VStaffAddresses';
import { Phones } from '@instdemographicsbeans/Phones';
import { InternetAddresses } from '@instdemographicsbeans/InternetAddresses';
import { StaffMembersCommitBean } from '@sausersystemsecuritybeans/StaffMembersCommitBean';
import { Images } from '@commonbeans/Images';
import { PhonesCommitBean } from '@instdemographicsbeans/PhonesCommitBean';
import { InternetAddressesCommitBean } from '@instdemographicsbeans/InternetAddressesCommitBean';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcdaddreService } from '@inst/demographics-biometrics/service/ocdaddre.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OumpersdService } from '../service/oumpersd.service';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { GridComponent } from '@core/ui-components/grid/grid.component';
import { IWPPaneService } from '@core/ui-components/pane/iwppane.service';
@Component({
    selector: 'app-oumperso',
    templateUrl: './oumperso.component.html'
})

export class OumpersoComponent implements OnInit {
    actionName: string;
    @ViewChild('addSpecGrid', {static: true}) addSpecGrid: any;
    @ViewChild('globSpecGrid', {static: true}) globSpecGrid: any;
    @ViewChild('grid', { static: true }) grid: any;
    gridOptions: GridOptions;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    staffData: StaffMembers[] = [];
    staffDataTemp: StaffMembers[] = [];
    staffModel: StaffMembers = new StaffMembers();
    staffModelTemp: StaffMembers = new StaffMembers();
    staffIndex = 0;
    staffTableIndex = -1;
    lstOfStaffMem: StaffMembers[];
    staffInsertList: StaffMembers[] = [];
    staffUpdateList: StaffMembers[] = [];
    staffDeleteList: StaffMembers[] = [];
    imageData: Images[] = [];
    imageDataTemp: Images[] = [];
    imageModel: Images = new Images();
    imageIndex = 0;
    imageInsertList: Images[] = [];
    imageUpdateList: Images[] = [];
    imageDeleteList: Images[] = [];
    vStfAddrData: VStaffAddresses[] = [];
    vStfData: StaffMembers[] = [];
    vStfAddrDataTemp: VStaffAddresses[] = [];
    vStfAddrModel: VStaffAddresses = new VStaffAddresses();
    vstfaddrIndex = 0;
    vstfaddrInsertList: VStaffAddresses[] = [];
    vstfaddrUpdateList: VStaffAddresses[] = [];
    vstfaddrDeleteList: VStaffAddresses[] = [];
    addrPhonesData: Phones[] = [];
    addrPhonesDataTemp: Phones[] = [];
    addrPhonesModel: Phones = new Phones();
    addrPhonesIndex = 0;
    addrPhonesInsertList: Phones[] = [];
    addrPhonesUpdateList: Phones[] = [];
    addrPhonesDeleteList: Phones[] = [];
    stfPhonesData: Phones[] = [];
    stfPhonesDataTemp: Phones[] = [];
    stfPhonesModel: Phones = new Phones();
    stfPhonesIndex = 0;
    stfPhonesInsertList: Phones[] = [];
    stfPhonesUpdateList: Phones[] = [];
    stfPhonesDeleteList: Phones[] = [];
    emailAddrData: InternetAddresses[] = [];
    emailAddrDataTemp: InternetAddresses[] = [];
    emailAddrModel: InternetAddresses = new InternetAddresses();
    emailAddrIndex = 0;
    emailAddrInsertList: InternetAddresses[] = [];
    emailAddrUpdateList: InternetAddresses[] = [];
    emailAddrDeleteList: InternetAddresses[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    emailAddrColumnDef: any[];
    stfPhonesColumnDef: any[];
    addrPhonesColumnDef: any[];
    vStfAddrColumnDef: any[];
    staffReadOnly = false;
    imageReadOnly = false;
    vStfAddrReadOnly = false;
    addrPhonesReadOnly = false;
    stfPhonesReadOnly = false;
    emailAddrReadOnly = false;
    ctrlReadOnly = false;
    rgPhoneTypeRg: any[] = [];
    rgSuffixRg: any[] = [];
    rgSexCodeRg: any[] = [];
    rgStatusRg: any[] = [];
    rgPersonnelTypeRg: any[] = [];
    rgPositionRg: any[] = [];
    index = 0;
    staffCommitModel: StaffMembersCommitBean = new StaffMembersCommitBean();
    addrPhonesCommitModel: PhonesCommitBean = new PhonesCommitBean();
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    translateLabel: any;
    stfPhonesCommitModel: PhonesCommitBean = new PhonesCommitBean();
    emailAddrCommitModel: InternetAddressesCommitBean = new InternetAddressesCommitBean();
    searchForm: any;
    vaddPopupData: any;
    addrGobalUpdateBtn: boolean;
    checkPhone: boolean;
    saveFlag: boolean;
    nextFlag: boolean;
    prevFlag: boolean;
    image: any;
    positionFlag: boolean;
    genderFlag: boolean;
    suffixFlag: boolean;
    typeFlag: boolean;
    statusFlag: boolean;
    stateOption: any[] = [];
    countryOption: any[] = [];
    cityOption: any[] = [];
    cameraButton: boolean;
    personnelTypeLink: any;
    vStfColumnDef: any[];
    isvalid: boolean;
    gnoGridDelBtn = true;
    intAdrGridDelBtn = true;
    addGridDelBtn = true;
  userId : string;
    selectedFormat: any;
    showDocIcon =false;
    constructor(private oumpersoFactory: OumpersoService, private router: Router, private ocdaddreFactory: OcdaddreService,
        public translateService: TranslateService, private renderer: Renderer2, private sessionManager: UserSessionManager,
        private osiosearchService: OsiosearService, private dialogService: DialogService, private oumpersdFactory: OumpersdService,
        private activatedRoute: ActivatedRoute,private iwpPaneService :IWPPaneService) {
        this.emailAddrColumnDef = [];
        this.stfPhonesColumnDef = [];
        this.addrPhonesColumnDef = [];
        this.vStfAddrColumnDef = [];
        this.lstOfStaffMem = [];

    }
    ngOnInit() {
        this.cameraButton = true;
        this.disabled = true;
        this.display = true;
        this.saveFlag = true;
        this.staffReadOnly = false;
        this.addrGobalUpdateBtn = true;
        this.nextFlag = true;
        this.prevFlag = true;
        this.positionFlag = false;
        this.genderFlag = false;
        this.suffixFlag = false;
        this.typeFlag = false;
        this.statusFlag = false;
        this.personnelTypeLink = 'oumperso/rgPersonnelTypeRecordGroup';
        this.emailAddrColumnDef = [
            {
                fieldName: this.translateService.translate('oumperso.mail'), field: 'internetAddress', editable: true, width: 500,
                datatype: 'email'
            },
            { fieldName: ' ', field: '', editable: true, width: 10, datatype: '' }

        ];

        this.stfPhonesColumnDef = [
            {
                fieldName: this.translateService.translate('oumperso.phoneFormat'), field: 'format', editable: true, width: 200,
                datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true
            },
            {
                fieldName: this.translateService.translate('oumperso.phonetype'), field: 'phoneType', editable: true, width: 230,
                datatype: 'lov',
                domain: 'PHONE_USAGE', optionWidth: 300
            },
            {
                fieldName: this.translateService.translate('oumperso.phonenumber'), field: 'phoneNo', editable: true, width: 250,
                datatype: 'phone', formatType: this.selectedFormat
            },
            {
                fieldName: this.translateService.translate('oumperso.extension'), field: 'extNo', whole: true, editable: true, width: 150,
                datatype: 'number', maxlength: 7
            },
        ];
        this.vStfColumnDef = [
            {
                fieldName: this.translateService.translate('oumperso.lastname') + '*', field: 'lastName',
                editable: true, width: 150, maxlength: 35, uppercase: 'true', datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oumperso.firstname') + '*', field: 'firstName',
                editable: true, width: 150, maxlength: 35, uppercase: 'true', datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oumperso.middlename'), field: 'middleName',
                editable: true, width: 150, maxlength: 35, uppercase: 'true', datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oumperso.suffix'), field: 'suffix',
                editable: true, width: 150, domain: 'SUFFIX', datatype: 'lov', optionWidth: 300
            },
            {
                fieldName: this.translateService.translate('oumperso.sex'), field: 'sexCode',
                datatype: 'lov', domain: 'SEX', editable: true, width: 160
            },
            {
                fieldName: this.translateService.translate('oumperso.dob'), field: 'birthdate',
                id: 'cfegrddob', datatype: 'date', editable: true, width: 160
            },
            {
                fieldName: this.translateService.translate('oumperso.type') + '*', field: 'personnelType',
                datatype: 'lov',domain:'PERSONNEL_TP'/* link: 'oumperso/rgPersonnelTypeRecordGroup'*/, editable: true, width: 160, optionWidth: '350'
            },
            {
                fieldName: this.translateService.translate('oumperso.position'), field: 'position',
                datatype: 'lov', domain: 'PERSONNEL_PO', editable: true, width: 160, optionWidth: '350'
            },
            {
                fieldName: this.translateService.translate('oumperso.status') + '*', field: 'status',
                datatype: 'lov', domain: 'STAFF_STATUS', editable: true, width: 160, optionWidth: '370'
            },
            {
                fieldName: this.translateService.translate('oumperso.asofdate'), field: 'asOfDate',
                datatype: 'date', editable: false, width: 160
            },
            {
                fieldName: this.translateService.translate('common.staffid'), field: 'staffId',
                datatype: 'number', editable: false, width: 160, maxlength: 7
            },
            {
                fieldName: this.translateService.translate('common.userid'), field: 'userId', datatype: 'text',
                editable: true, width: 160, maxlength: 32, uppercase: 'true', cellEditable: this.canUserCellEdit
            },
            {
                fieldName: this.translateService.translate('oumperso.mailid'), field: 'mailId',
                editable: true, width: 150,datatype: 'text', uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('oumperso.aduser'), field: 'adUser',
                editable: false, width: 150
            }
        ];
        this.addrPhonesColumnDef = [
            {
                fieldName: this.translateService.translate('oumperso.phoneFormat'), field: 'format', editable: true, width: 200,
                datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true
            },
            {
                fieldName: this.translateService.translate('oumperso.phonetype'), field: 'phoneType', editable: true, width: 200,
                datatype: 'lov', domain: 'PHONE_USAGE', optionWidth: 300
            },
            {
                fieldName: this.translateService.translate('oumperso.phonenumber'), field: 'phoneNo',
                editable: true, width: 250, datatype: 'phone', formatType: this.selectedFormat
            },
            {
                fieldName: this.translateService.translate('oumperso.extension'), field: 'extNo',
                datatype: 'number', editable: true, whole: true, width: 150, maxlength: 7,
            },

        ];
        this.vStfAddrColumnDef = [
            {
                fieldName: this.translateService.translate('common.unitnumber'), field: 'suiteNumber',
                editable: false, width: 100, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.streetaddress'), field: 'streetAddress',
                editable: false, width: 175, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.city'), field: 'cityName',
                width: 125, editable: false, options: this.cityOption,
            },
            {
                fieldName: this.translateService.translate('common.state'), field: 'provStateDesc',
                editable: false, width: 150,options: this.stateOption,
            },
            { 
                fieldName: this.translateService.translate('common.postalcode'), field: 'zipPostalCode', 
                editable: false, width: 150 
            },
            {
                fieldName: this.translateService.translate('common.country'), field: 'country',
                editable: false, width: 150, options: this.countryOption,
            },
            {
                fieldName: this.translateService.translate('common.type'),
                field: 'addressTypeDesc', editable: false, width: 150, maxlength: 40
            },
            {
                fieldName: this.translateService.translate('comp.address.primary'), field: 'primaryFlag',
                width: 120, editable: false, datatype: 'checkbox',
            },
            {
                fieldName: this.translateService.translate('comp.address.mail'), field: 'mailFlag',
                width: 120, editable: false, datatype: 'checkbox',
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                width: 120, editable: false, datatype: 'checkbox',
            },
            {
                fieldName: this.translateService.translate('common.isvalidated'),
                field: 'isAddressValid', datatype: 'checkbox', editable: false, width: 150
            }
        ];
        this.activatedRoute.queryParams.subscribe(params => {
            let userName = params['userName']; 
                 if(userName) {
                     this.userId=userName;
                 }
        })
        const rgPhoneTypeServiceObj = this.oumpersoFactory.rgPhoneTypeRecordGroup();
        rgPhoneTypeServiceObj.subscribe(phoneTypeList => {
            if (phoneTypeList.length === 0) {
                this.rgPhoneTypeRg = [];
            } else {
                for (let i = 0; i < phoneTypeList.length; i++) {
                    this.rgPhoneTypeRg.push({
                        'text': phoneTypeList[i].code + ' - ' +
                            phoneTypeList[i].description, 'id': phoneTypeList[i].code
                    });
                }
            }
        });
        const rgSuffixServiceObj = this.oumpersoFactory.rgSuffixRecordGroup();
        rgSuffixServiceObj.subscribe(rgSuffixList => {
            if (rgSuffixList.length === 0) {
                this.rgSuffixRg = [];
            } else {
                for (let i = 0; i < rgSuffixList.length; i++) {
                    this.rgSuffixRg.push({
                        'text': rgSuffixList[i].code + ' - ' +
                            rgSuffixList[i].description, 'id': rgSuffixList[i].code
                    });
                }
            }
        });
        const rgSexCodeServiceObj = this.oumpersoFactory.rgSexCodeRecordGroup();
        rgSexCodeServiceObj.subscribe(rgSexCodeList => {
            if (rgSexCodeList.length === 0) {
                this.rgSexCodeRg = [];
            } else {
                for (let i = 0; i < rgSexCodeList.length; i++) {
                    this.rgSexCodeRg.push({
                        'text': rgSexCodeList[i].code + ' - ' +
                            rgSexCodeList[i].description, 'id': rgSexCodeList[i].code
                    });
                }
            }
        });
        const rgStatusServiceObj = this.oumpersoFactory.rgStatusRecordGroup();
        rgStatusServiceObj.subscribe(rgStatusList => {
            if (rgStatusList.length === 0) {
                this.rgStatusRg = [];
            } else {
                for (let i = 0; i < rgStatusList.length; i++) {
                    this.rgStatusRg.push({
                        'text': rgStatusList[i].code + ' - ' +
                            rgStatusList[i].description, 'id': rgStatusList[i].code
                    });
                }
            }
        });
        const rgPersonnelTypeServiceObj = this.oumpersoFactory.rgPersonnelTypeRecordGroup();
        rgPersonnelTypeServiceObj.subscribe(rgPersonnelTypeList => {
            if (rgPersonnelTypeList.length === 0) {
                this.rgPersonnelTypeRg = [];
            } else {
                for (let i = 0; i < rgPersonnelTypeList.length; i++) {
                    this.rgPersonnelTypeRg.push({
                        'text': rgPersonnelTypeList[i].code + ' - ' +
                            rgPersonnelTypeList[i].description, 'id': rgPersonnelTypeList[i].code
                    });
                }
            }
        });
        const rgPositionServiceObj = this.oumpersoFactory.rgPositionRecordGroup();
        rgPositionServiceObj.subscribe(rgPositionList => {
            if (rgPositionList.length === 0) {
                this.rgPositionRg = [];
            } else {
                for (let i = 0; i < rgPositionList.length; i++) {
                    this.rgPositionRg.push({
                        'text': rgPositionList[i].code + ' - ' +
                            rgPositionList[i].description, 'id': rgPositionList[i].code
                    });
                }
            }
        });
        const serviceObjTown = this.oumpersoFactory.rgTownRecordGroup();
        serviceObjTown.subscribe(cityList => {
            cityList.forEach(listval => {
                this.cityOption.push({ 'id': listval.description, 'text': listval.description });
            });
        });
        const serviceObjCountry = this.oumpersoFactory.rgCountryRecordGroup1();
        serviceObjCountry.subscribe(countrylist => {
            countrylist.forEach(listval => {
                this.countryOption.push({ 'id': listval.description, 'text': listval.description });
            });
        });
        const serviceObjState = this.oumpersoFactory.rgStateRecordGroup();
        serviceObjState.subscribe(stateList => {
            stateList.forEach(listval => {
                this.stateOption.push({ 'id': listval.description, 'text': listval.description });
            });
        });
        this.staffExecuteQuery();
    }
    canUserCellEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'userId' && data.userIdVal) {
            return false;
        }
        return true;
      }
    canFlagsEdit = (data: any, index: number, field: string): boolean => {
        return true;
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    setStatus() {
        if (!this.staffModelTemp.staffId) {
            this.saveFlag = false;
        }
        if (!this.statusFlag) {
            this.statusFlag = true;
            return;
        }
        this.saveFlag = false;

    }

    setType() {

        if (!this.staffModelTemp.staffId) {
            this.saveFlag = false;
        }
        if (!this.typeFlag) {
            this.typeFlag = true;
            return;
        }
        this.saveFlag = false;
    }

    setPosition() {
        if (!this.staffModelTemp.staffId) {
            this.saveFlag = false;
        }
        if (this.staffModel.position || this.staffModel.position === undefined) {
            if (this.positionFlag) {
                this.saveFlag = false;
            } else {
                this.positionFlag = true;
            }
        }
    }

    setSuffix() {
        if (!this.staffModelTemp.staffId) {
            this.saveFlag = false;
        }
        if (this.staffModel.suffix || this.staffModel.suffix === undefined) {
            if (this.suffixFlag) {
                this.saveFlag = false;
            } else {
                this.suffixFlag = true;
            }
        }
    }
    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        rowdata.validated = true;
        if (event && event.field === 'mailId') {
            this.grid.setColumnData('mailId', index, event.data.mailId);
        }
        return rowdata;
    }
    setGender() {

        if (!this.staffModelTemp.staffId) {
            this.saveFlag = false;
        }
        if (this.staffModel.sexCode || this.staffModel.sexCode === undefined) {
            if (this.genderFlag) {
                this.saveFlag = false;
            } else {
                this.genderFlag = true;
            }
        }

    }

    isInsertable() {

        if (!this.staffModelTemp.staffId) {
            this.saveFlag = false;
        }
        this.saveFlag = false;
    }

    isValidBirthDate(event) {

        if (!this.staffModelTemp.staffId) {
            this.saveFlag = false;
        }

        this.saveFlag = false;
    }

    /**
        * This function loads the data into the Master Record and its child records
        */
    emailAddrPopulateDetails() {
        this.staffModel = this.staffData[this.index];
        const serviceObj = this.oumpersoFactory.emailAddrExecuteQuery(this.staffModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.type = 'info';
                // this.message = this.translateService.translate('common.querycaused');
                this.show();
            } else {
                this.emailAddrData = data;
            }
        });
    }

    /**
         *  This function will be executed when commit event is
        * fired
        */
    saveStaffForm(event) {
        this.staffInsertList = event.added;
        this.staffUpdateList = event.updated;
        this.staffDeleteList = event.removed;
        this.staffCommitModel.insertList = [];
        this.staffCommitModel.updateList = [];
        this.staffCommitModel.deleteList = [];
        if (this.staffInsertList.length > 0 || this.staffUpdateList.length > 0) {
            for (let i = 0; i < this.staffInsertList.length; i++) {
                if (this.staffModel.lastName === undefined ||
                    this.staffModel.lastName === null) {
                    return;
                }
                if (this.staffModel.firstName === undefined ||
                    this.staffModel.firstName === null) {
                    return;
                }
                if (this.staffModel.personnelType === undefined ||
                    this.staffModel.personnelType === null) {
                    return;
                }
                if (this.staffModel.status === undefined ||
                    this.staffModel.status === null) {
                    return;
                }
            }
            for (let i = 0; i < this.staffUpdateList.length; i++) {
            }
            this.staffCommitModel.insertList = this.staffInsertList;
            this.staffCommitModel.updateList = this.staffUpdateList;
        }
        if (this.staffDeleteList.length > 0) {
            for (let i = 0; i < this.staffDeleteList.length; i++) {
            }
            this.staffCommitModel.deleteList = this.staffDeleteList;
        }
        const staffSaveData = this.oumpersoFactory.staffCommit(this.staffCommitModel);
        staffSaveData.subscribe(data => {
            if(data == 'DUP_EMAIL'){
                this.type = 'warn';
                this.message = this.translateService.translate('oumperso.emailmustbeunique');
                this.show();
            }else if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    onRowClickstaff(event) {
        if (event) {
            this.staffModel = event;
            this.disabled = false;
            // this.vaddPopupData = this.staffModel;
            if(this.staffModel.staffId){
                this.showDocIcon=true;
                this.iwpPaneService.objectId=this.staffModel.staffId.toString();
            }
            this.onRowClickVStaffAddresses(this.staffModel);
            this.imageExecuteQuery();
            // this.vStfAddrExecuteQuery();
            this.emailaddrExecuteQuery();
            this.stfphonesExecuteQuery();
        }else{
            this.showDocIcon=false;
        }
    }
    staffExecuteQuery() {
        // this.staffModel = new StaffMembers();
        this.staffIndex = 0;
        this.index = 0;
        if(this.userId){
            this.staffModel.userId=this.userId;
        }
        const serviceObj = this.oumpersoFactory.staffExecuteQuery(this.staffModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.type = 'info';
                this.addrGobalUpdateBtn = true;
                this.staffReadOnly = false;
                this.display = true;
                this.positionFlag = false;
                this.genderFlag = false;
                this.suffixFlag = false;
                this.typeFlag = false;
                this.statusFlag = false;
                this.image = null;
                this.staffTableIndex = -1;
                this.message = this.translateService.translate('common.querycaused');
                this.show();
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].birthdate !== null) {
                        data[i].birthdate = DateFormat.getDate(data[i].birthdate);
                    }
                    if (data[i].asOfDate !== null) {
                        data[i].asOfDate = DateFormat.getDate(data[i].asOfDate);
                    }
                }
                this.staffTableIndex = 0;
                this.staffData = data;
                this.lstOfStaffMem = data;
                this.staffModel = this.staffData[0];
                this.staffModelTemp = this.staffModel;
                this.statusFlag = false;
                this.positionFlag = false;
                this.genderFlag = false;
                this.suffixFlag = false;
                this.typeFlag = false;
                this.statusFlag = false;
                this.cameraButton = false;
                this.disabled = false;
                if (this.staffModel.position === null) {
                    this.positionFlag = true;
                }
                if (this.staffModel.suffix === null) {
                    this.suffixFlag = true;
                }
                if (this.staffModel.sexCode === null) {
                    this.genderFlag = true;
                }

                this.display = false;
                this.staffReadOnly = true;
                this.addrGobalUpdateBtn = false;
                this.saveFlag = true;
                this.nextFlag = false;
                this.imageExecuteQuery();
                this.stfphonesExecuteQuery();
                this.emailaddrExecuteQuery();
                this.onRowClickVStaffAddresses(this.staffModel);
            }
        });

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
    imageExecuteQuery() {
        this.imageModel = new Images();
        this.imageModel.imageObjectId = this.staffModel.staffId;
        const imageResult = this.oumpersoFactory.imageExecuteQuery(this.imageModel);
        imageResult.subscribe(imageResultList => {
            if (imageResultList.length === 0) {
                this.image = null;
            } else {
                if (imageResultList[0] !== null && imageResultList[0].imageThumbnail !== undefined &&
                    imageResultList[0].imageThumbnail.length > 0) {
                    this.image = 'data:image/JPEG;base64,' + imageResultList[0].imageThumbnail;
                    this.cameraButton = false;
                } else {
                    this.image = null;
                }
            }
        });
    }
    /**
        * This function loads the data into the Master Record and its child records
        */
    populateDetails() {
        this.stfPhonesModel = new Phones();
        this.stfPhonesModel.ownerId = this.vStfAddrModel.addressId;
        const serviceObj = this.oumpersoFactory.addrPhonesExecuteQuery(this.stfPhonesModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.addrPhonesData = [];
                this.addrPhonesModel = new Phones();
            } else {
                this.addrPhonesData = data;
                this.addrPhonesModel = this.addrPhonesData[0];
                this.cameraButton = false;
            }
        });
    }

    vStfAddrExecuteQuery() {
        this.vStfAddrModel = new VStaffAddresses();
        this.vStfAddrModel.staffId = this.staffModel.staffId;
        const serviceObj = this.oumpersoFactory.vStfAddrExecuteQuery(this.vStfAddrModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.vaddPopupData.address = [];
                this.vStfAddrModel = new VStaffAddresses();
                this.vStfAddrData = [];
                this.addrPhonesData = [];
                this.addrPhonesModel = new Phones();
            } else {
                for (let i = 0; i < data.length; i++) {
                    data[i].primaryFlag = data[i].primaryFlag === 'Y' ? true : false;
                    data[i].mailFlag = data[i].mailFlag === 'Y' ? true : false;
                    data[i].activeFlag = data[i].activeFlag === 'Y' ? true : false;
                    data[i].isAddressValid = data[i].isAddressValid === 'Y' ? true : false;
                }
                this.vStfAddrData = data;
                this.vStfAddrModel = this.vStfAddrData[0];
                this.cameraButton = false;
                this.addrPhonesModel = new Phones();
                this.populateDetails();
            }
        });

    }

    addrphonesExecuteQuery() {
        const addrphonesResult = this.oumpersoFactory.addrPhonesExecuteQuery(this.addrPhonesModel);
        addrphonesResult.subscribe(addrPhonesResultList => {
            if (addrPhonesResultList.length === 0) {
                this.addrPhonesData = [];
            } else {
                this.addrPhonesData = addrPhonesResultList;
                this.addrPhonesModel = addrPhonesResultList[0];
            }
        });
    }

    checkValidPhonePattern(phoneNo,formatType) {
        const formattedNumber=PhoneNumberUtils.getFormattedNumber(formatType,phoneNo).replace(/[- )(]/g,'');
        const selectedFormat = PhoneNumberUtils.contactType.find(x => formatType === x.maskingCode);
        if (!(String(phoneNo).length === formattedNumber.length) && formatType!= 'UNF') {
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
    saveAddrPhonesForm(event) {
        this.addrPhonesInsertList = event.added;
        this.addrPhonesUpdateList = event.updated;
        this.addrPhonesDeleteList = event.removed;
        this.addrPhonesCommitModel.insertList = [];
        this.addrPhonesCommitModel.updateList = [];
        this.addrPhonesCommitModel.deleteList = [];
        if (this.addrPhonesInsertList.length > 0) {


            for (let i = 0; i < this.addrPhonesInsertList.length; i++) {
                
                if (this.addrPhonesInsertList[i].format === undefined ||
                    this.addrPhonesInsertList[i].format === '' ||
                    this.addrPhonesInsertList[i].format === null) {
                    this.message = this.translateService.translate('oumperso.enterphoneformat');
                    this.show();
                    return;
                }
                if (this.addrPhonesInsertList[i].phoneType === undefined ||
                    this.addrPhonesInsertList[i].phoneType === '' ||
                    this.addrPhonesInsertList[i].phoneType === null) {
                    this.message = this.translateService.translate('oumperso.enterphonetype');
                    this.show();
                    return;
                }

                if (this.addrPhonesInsertList[i].phoneNo === undefined ||
                    this.addrPhonesInsertList[i].phoneNo === null ||
                    this.addrPhonesInsertList[i].phoneNo === '') {
                    this.message = this.translateService.translate('oumperso.enterphonenumber');
                    this.show();
                    return;
                }
                this.checkPhone = this.checkValidPhonePattern(this.addrPhonesInsertList[i].phoneNo,this.addrPhonesInsertList[i].format);
                if (!this.checkPhone) {
                    return;
                }

                this.addrPhonesInsertList[i].ownerClass = 'ADDR';
            }

            this.addrPhonesCommitModel.insertList = this.addrPhonesInsertList;

        }

        if (this.addrPhonesUpdateList.length > 0) {
            for (let i = 0; i < this.addrPhonesUpdateList.length; i++) {

                if (this.addrPhonesUpdateList[i].format === undefined ||
                    this.addrPhonesUpdateList[i].format === '' ||
                    this.addrPhonesUpdateList[i].format === null) {
                    this.message = this.translateService.translate('oumperso.enterphoneformat');
                    this.show();
                    return;
                }

                if (this.addrPhonesUpdateList[i].phoneType === undefined ||
                    this.addrPhonesUpdateList[i].phoneType === '' ||
                    this.addrPhonesUpdateList[i].phoneType === null) {
                    this.message = this.translateService.translate('oumperso.enterphonetype');
                    this.show();
                    return;
                }

                if (this.addrPhonesUpdateList[i].phoneNo === undefined ||
                    this.addrPhonesUpdateList[i].phoneNo === null ||
                    this.addrPhonesUpdateList[i].phoneNo === '') {
                    this.message = this.translateService.translate('oumperso.enterphonenumber');
                    this.show();
                    return;
                }

                this.checkPhone = this.checkValidPhonePattern(this.addrPhonesUpdateList[i].phoneNo,this.addrPhonesUpdateList[i].format);
                if (!this.checkPhone) {
                    return;
                }

            }
            this.addrPhonesCommitModel.updateList = this.addrPhonesUpdateList;
        }

        if (this.addrPhonesDeleteList.length > 0) {
            for (let i = 0; i < this.addrPhonesDeleteList.length; i++) {
            }
            this.addrPhonesCommitModel.deleteList = this.addrPhonesDeleteList;
        }
        const addrphonesSaveData = this.oumpersoFactory.addrPhonesCommit(this.addrPhonesCommitModel);
        addrphonesSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.populateDetails();
                this.addrPhonesData = data;
                this.show();
            } else {
                this.type = 'wrror';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }


    stfphonesExecuteQuery() {
        this.stfPhonesModel = new Phones();
        this.stfPhonesModel.ownerId = this.staffModel.staffId;
        const stfphonesResult = this.oumpersoFactory.stfPhonesExecuteQuery(this.stfPhonesModel);
        stfphonesResult.subscribe(stfPhonesResultList => {
            if (stfPhonesResultList.length === 0) {
                this.stfPhonesData = [];
                this.stfPhonesModel = new Phones();
            } else {
                this.stfPhonesData = stfPhonesResultList;
                this.stfPhonesModel = stfPhonesResultList[0];
                this.cameraButton = false;
            }
        });
    }
    /**
         *  This function will be executed when commit event is
        * fired
        */
    saveStfPhonesForm(event) {
        this.stfPhonesInsertList = event.added;
        this.stfPhonesUpdateList = event.updated;
        this.stfPhonesDeleteList = event.removed;
        this.stfPhonesCommitModel.insertList = [];
        this.stfPhonesCommitModel.updateList = [];
        this.stfPhonesCommitModel.deleteList = [];
        if (this.stfPhonesInsertList.length > 0) {

            for (let i = 0; i < this.stfPhonesInsertList.length; i++) {


                if (!this.stfPhonesInsertList[i].phoneType) {
                    this.message = this.translateService.translate('oumperso.enterphonetype');
                    this.show();
                    return;
                }

                if (!this.stfPhonesInsertList[i].phoneNo) {
                    this.message = this.translateService.translate('oumperso.enterphonenumber');
                    this.show();
                    return;
                }
                this.checkPhone = this.checkValidPhonePattern(this.stfPhonesInsertList[i].phoneNo,this.stfPhonesInsertList[i].format);
                if (!this.checkPhone) {
                    return;
                }
                this.stfPhonesInsertList[i].ownerId = this.staffModel.staffId;
                this.stfPhonesInsertList[i].ownerClass = 'STF';
            }
            this.stfPhonesCommitModel.insertList = this.stfPhonesInsertList;

        }

        if (this.stfPhonesUpdateList.length > 0) {

            for (let i = 0; i < this.stfPhonesUpdateList.length; i++) {

                if (this.stfPhonesUpdateList[i].phoneType === undefined ||
                    this.stfPhonesUpdateList[i].phoneType === '' ||
                    this.stfPhonesUpdateList[i].phoneType === null) {
                    this.message = this.translateService.translate('oumperso.enterphonetype');
                    this.show();
                    return;
                }

                if (this.stfPhonesUpdateList[i].phoneNo === undefined ||
                    this.stfPhonesUpdateList[i].phoneNo === null ||
                    this.stfPhonesUpdateList[i].phoneNo === '') {
                    this.message = this.translateService.translate('oumperso.enterphonenumber');
                    this.show();
                    return;
                }
                this.checkPhone = this.checkValidPhonePattern(this.stfPhonesUpdateList[i].phoneNo,this.stfPhonesUpdateList[i].format);
                if (!this.checkPhone) {
                    return;
                }

                this.stfPhonesCommitModel.updateList = this.stfPhonesUpdateList;
            }
        }
        if (this.stfPhonesDeleteList.length > 0) {
            this.stfPhonesCommitModel.deleteList = this.stfPhonesDeleteList;
        }
        const stfphonesSaveData = this.oumpersoFactory.stfPhonesCommit(this.stfPhonesCommitModel);
        stfphonesSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.stfphonesExecuteQuery();
                this.stfPhonesData = data;
                this.show();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }

        });

    }
    emailaddrExecuteQuery() {
        this.emailAddrModel = new InternetAddresses();
        this.emailAddrModel.ownerId = this.staffModel.staffId;
        const emailaddrResult = this.oumpersoFactory.emailAddrExecuteQuery(this.emailAddrModel);
        emailaddrResult.subscribe(emailAddrResultList => {
            if (emailAddrResultList.length === 0) {
                this.emailAddrData = [];
                this.emailAddrModel = new InternetAddresses();
            } else {
                this.emailAddrData = emailAddrResultList;
                this.emailAddrModel = emailAddrResultList[0];
                this.cameraButton = false;
            }
        });
    }
    /**
         *  This function will be executed when commit event is
        * fired
        */
    saveEmailAddrForm(event) {
        this.emailAddrInsertList = event.added;
        this.emailAddrUpdateList = event.updated;
        this.emailAddrDeleteList = event.removed;
        this.emailAddrCommitModel.insertList = [];
        this.emailAddrCommitModel.updateList = [];
        this.emailAddrCommitModel.deleteList = [];
        if (this.emailAddrInsertList.length > 0) {
            for (let i = 0; i < this.emailAddrInsertList.length; i++) {

                if (!this.emailAddrInsertList[i].internetAddress) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumperso.enteremailaddress');
                    this.show();
                    return;
                }
                if (this.emailAddrInsertList[i].internetAddress &&
                    this.emailAddrInsertList[i].internetAddress.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') === null) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.invaidinternetaddress');
                    this.show();
                    return;
                 }
                this.emailAddrInsertList[i].ownerClass = 'STF';
                this.emailAddrInsertList[i].internetAddressClass = 'EMAIL';
                this.emailAddrInsertList[i].ownerId = this.staffModel.staffId;
            }
        }

        if (this.emailAddrUpdateList.length > 0) {

            for (let i = 0; i < this.emailAddrUpdateList.length; i++) {
                if (!this.emailAddrUpdateList[i].internetAddress) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumperso.invaidinternetaddress');
                    this.show();
                    return;
                }
                if (this.emailAddrUpdateList[i].internetAddress &&
                    this.emailAddrUpdateList[i].internetAddress.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') === null) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumperso.invalidemailAddress');
                    this.show();
                    return;
                 }
            }
        }
        this.emailAddrCommitModel.insertList = this.emailAddrInsertList;
        this.emailAddrCommitModel.updateList = this.emailAddrUpdateList;

        if (this.emailAddrDeleteList.length > 0) {
            this.emailAddrCommitModel.deleteList = this.emailAddrDeleteList;
        }
        const emailaddrSaveData = this.oumpersoFactory.emailAddrCommit(this.emailAddrCommitModel);
        emailaddrSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.emailaddrExecuteQuery();
                this.emailAddrData = data;
                this.show();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

    butOffendersKeyNextItemTrigger() {
        if (this.lstOfStaffMem.length === 0) {
            return;
        }
        if ((this.staffIndex) < this.lstOfStaffMem.length - 1) {
            this.positionFlag = false;
            this.suffixFlag = false;
            this.genderFlag = false;
            this.statusFlag = false;
            this.typeFlag = false;
            this.staffIndex = this.index + 1;
            this.staffModel = this.lstOfStaffMem[this.staffIndex];
            this.staffModelTemp = this.staffModel;
            this.prevFlag = false;
            this.index = this.index + 1;
            this.imageExecuteQuery();
            this.vStfAddrExecuteQuery();
            this.emailaddrExecuteQuery();
            this.stfphonesExecuteQuery();
            this.staffReadOnly = true;
            this.addrGobalUpdateBtn = false;
            this.saveFlag = true;
            if (this.staffModel.position === null) {
                this.positionFlag = true;
            }
            if (this.staffModel.suffix === null) {
                this.suffixFlag = true;
            }
            if (this.staffModel.sexCode === null) {
                this.genderFlag = true;
            }
        } else {
            this.type = 'warning';
            this.message = this.translateService.translate('common.nosetofrecordsexist');
            this.show();
            this.nextFlag = true;
            this.prevFlag = false;
        }

    }

    butOffendersKeyPrevItemTrigger() {
        if (this.lstOfStaffMem.length === 0) {
            return;
        }
        if (this.staffIndex >= 1) {
            this.staffIndex = this.staffIndex - 1;
            this.index = this.staffIndex;
            this.nextFlag = false;
            this.positionFlag = false;
            this.suffixFlag = false;
            this.genderFlag = false;
            this.statusFlag = false;
            this.typeFlag = false;
            this.staffModel = this.lstOfStaffMem[this.staffIndex];
            this.staffModelTemp = this.staffModel;
            this.staffReadOnly = true;
            this.imageExecuteQuery();
            this.vStfAddrExecuteQuery();
            this.emailaddrExecuteQuery();
            this.stfphonesExecuteQuery();
            this.addrGobalUpdateBtn = false;
            this.saveFlag = true;
            if (this.staffModel.position === null) {
                this.positionFlag = true;
            }
            if (this.staffModel.suffix === null) {
                this.suffixFlag = true;
            }
            if (this.staffModel.sexCode === null) {
                this.genderFlag = true;
            }
        } else {
            this.nextFlag = false;
            this.prevFlag = true;
        }
    }

    /**
 * This function will be fired when add button is clicked to added address specific numbers
 */
    onGridInsertPhoneAddr = () => {

        if (!this.vStfAddrModel.addressId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumperso.youcannotcreatearecordwithoutaparentrecord');
            this.show();
            return;
        }

        for (let i = 0; i < this.addrPhonesData.length; i++) {
            
            if (!this.addrPhonesData[i].format) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumperso.enterphoneformat');
                this.show();
                return false;
            }
            if (!this.addrPhonesData[i].phoneType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumperso.enterphonetype');
                this.show();
                return false;
            }

            if (!this.addrPhonesData[i].phoneNo) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumperso.enterphonenumber');
                this.show();
                return false;
            }

        }

        return { ownerId: this.vStfAddrModel.addressId };
    }

    onGridInsertGlobalPhones = () => {
        if (!this.staffModelTemp.staffId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumperso.youcannotcreatearecordwithoutaparentrecord');
            this.show();
            return;
        }
        for (let i = 0; i < this.stfPhonesData.length; i++) {
            if (!this.stfPhonesData[i].phoneId) {
                if (!this.stfPhonesData[i].format) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumperso.enterphoneformat');
                    this.show();
                    return null;
                }
                if (!this.stfPhonesData[i].phoneType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumperso.enterphonetype');
                    this.show();
                    return null;
                }
                if (!this.stfPhonesData[i].phoneNo) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumperso.enterphonenumber');
                    this.show();
                    return null;
                }
            }
        }
        return { ownerId: this.staffModelTemp.staffId };
    }


    onGridInsertGlobalEmails = () => {
        if (!this.staffModelTemp.staffId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumperso.youcannotcreatearecordwithoutaparentrecord');
            this.show();
            return;
        }
        for (let i = 0; i < this.emailAddrData.length; i++) {
            if (!this.emailAddrData[i].internetAddressId) {
                if (!this.emailAddrData[i].internetAddress) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumperso.enteremailaddress');
                    this.show();
                    return null;
                }
            }
        }
        return { ownerId: this.staffModelTemp.staffId };
    }

    cancel() {
        this.lstOfStaffMem = [];
        this.display = true;
        this.staffModel = new StaffMembers();
        this.vStfAddrModel = new VStaffAddresses();
        this.staffData = [];
        this.vStfAddrData = [];
        this.staffReadOnly = false;
        this.addrGobalUpdateBtn = true;
        this.staffModelTemp = new StaffMembers();
        this.saveFlag = true;
        this.nextFlag = true;
        this.prevFlag = true;
        this.positionFlag = false;
        this.genderFlag = false;
        this.suffixFlag = false;
        this.staffIndex = 0;
        this.index = 0;
        this.emailAddrData = [];
        this.emailAddrModel = new InternetAddresses();
        this.stfPhonesData = [];
        this.stfPhonesModel = new Phones();
        this.addrPhonesData = [];
        this.addrPhonesModel = new Phones();
        this.image = null;
        this.cameraButton = true;
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    staffMembersCommitValidation(arrData: any[]) {
        this.isvalid = false;
        if (arrData && arrData.length > 0) {
            arrData.forEach(rowData => {
                if (!rowData.lastName) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oumperso.enterlname');
                    this.show();
                    this.isvalid = true;
                    return true;
                }
                if (!rowData.firstName) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oumperso.enterfname');
                    this.show();
                    this.isvalid = true;
                    return true;
                }
                if (!rowData.personnelType) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oumperso.enterpersonnel');
                    this.show();
                    this.isvalid = true;
                    return true;
                }
                if (!rowData.status) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oumperso.enterstatus');
                    this.show();
                    this.isvalid = true;
                    return true;
                }
            });
        }
        return this.isvalid;
    }
    onGridInsert = () => {
        if (this.staffData.length > 0) {
            const rowData = this.staffData[this.staffData.length - 1];
            if (!rowData.lastName) {
                this.type = 'info';
                this.message = this.translateService.translate('oumperso.enterlname');
                this.show();
                return null;
            }
            if (!rowData.firstName) {
                this.type = 'info';
                this.message = this.translateService.translate('oumperso.enterfname');
                this.show();
                return null;
            }
            if (!rowData.personnelType) {
                this.type = 'info';
                this.message = this.translateService.translate('oumperso.enterpersonnel');
                this.show();
                return null;
            }
            if (!rowData.status) {
                this.type = 'info';
                this.message = this.translateService.translate('oumperso.enterstatus');
                this.show();
                return null;
            }
        }
        return {};
    }
    saveStaffMembersForm(event) {
        this.staffInsertList = event.added;
        if (this.staffMembersCommitValidation(this.staffInsertList)) {
            return;
        }
        this.staffUpdateList = event.updated;
        if (this.staffMembersCommitValidation(this.staffUpdateList)) {
            return;
        }
        this.staffCommitModel.insertList = [];
        this.staffCommitModel.updateList = [];
        this.staffCommitModel.deleteList = [];
        if (this.staffInsertList.length > 0) {
            this.staffInsertList.forEach(element => {
                element.updateAllowedFlag = 'N';
            });
            this.staffCommitModel.insertList = this.staffInsertList;
        }
        if (this.staffUpdateList.length > 0) {
            this.staffUpdateList.forEach(element => {
                element.updateAllowedFlag = 'N';
            });
            this.staffCommitModel.updateList = this.staffUpdateList;
        }
        const staffSaveData = this.oumpersoFactory.staffCommit(this.staffCommitModel);
        staffSaveData.subscribe(staffMemResult => {
            if(staffMemResult == 'DUP_EMAIL'){
                this.type = 'warn';
                this.message = this.translateService.translate('oumperso.emailmustbeunique');
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else if (staffMemResult == 'AD_USER') {
                this.type = 'warn';
                this.message = this.translateService.translate('oumperso.adusercannotbechanged');
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else if (staffMemResult == 'INSIGHT_USER') {
                this.type = 'warn';
                this.message = this.translateService.translate('oumperso.insightsuser');
                this.show();
            } else if (staffMemResult !== undefined && staffMemResult === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.pleaseprovideadifferentuseridasthisidalreadyexists');
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else if (staffMemResult !== undefined && staffMemResult === 3) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.pleaseprovideadifferentuseridasthisisnotanapplicationuserid');
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else if (staffMemResult !== undefined && staffMemResult === 4) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.fieldmustbeginwithanalphabeticcharacter');
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else if (staffMemResult !== undefined && staffMemResult.length > 1) {
                staffMemResult = staffMemResult.replace('5', '');
                this.type = 'warn';
                this.message = this.translateService.translate('common.fieldcontainstheillegalcharacters') + staffMemResult;
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else if (staffMemResult !== undefined && staffMemResult === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.cancel();
                this.show();
            }
        });
    }

    onRowClickphoneaddr(event) {
        if (event) {
            if (event.phoneId) {
                this.addGridDelBtn = true;
            } else {
                this.addGridDelBtn = false;
            }
        } else {
            this.addGridDelBtn = false;
        }

    }
    validateRowClickphoneaddr = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event && event.newValue !== event.oldValue && event.newValue){
            if (event.field === 'format') {
                this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
                PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
                this.addSpecGrid.setColumnData('phoneNo', rowIndex, null);
            }
        }

        rowdata.validated = true;
        return rowdata;
    }
    // updatedMapsClickphoneaddr(event){
    //     console.log(event);
    //     this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.updated.format === x.maskingCode);
    //     PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
    // }
    validateRowClickphoneglobal = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event && event.newValue !== event.oldValue && event.newValue){
            if (event.field === 'format') {
                this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
                PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
                this.globSpecGrid.setColumnData('phoneNo', rowIndex, null);
            }
        }
        
        rowdata.validated = true;
        return rowdata;
    }
    onRowClickphoneglobal(event) {
        if (event) {
            if (event.phoneId) {
                this.gnoGridDelBtn = true;
            } else {
                this.gnoGridDelBtn = false;
            }
        } else {
            this.gnoGridDelBtn = false;
        }
    }

    onSkillsButclick() {
        this.dialogService.openLinkDialog('/OUMSTAFC', this.staffModel, 80).subscribe(result => {
        });
    }
    licensedetailsBtn() {
        this.oumpersdFactory.backBtn = true;
        this.router.navigate(['/OUMPERSD'],{ queryParams: { staffId: this.staffModel.staffId } });
    }
    onRowClickemail(event) {
        if (event) {
            if (event.internetAddressId) {
                this.intAdrGridDelBtn = true;
            } else {
                this.intAdrGridDelBtn = false;
            }
        } else {
            this.intAdrGridDelBtn = false;
        }
    }

    onRowClickVStaffAddresses(event) {
        this.staffModel = new StaffMembers();
        if (event) {
            this.staffModel = event;
        }
        this.vaddPopupData = { class: 'STF', staff: event, address: [] };
        if (this.staffModel.staffId) {
            this.vStfAddrData = [];
            this.vStfAddrExecuteQuery();
        }

    }

    onRowClickVStfAddr(event) {
        // this.vaddPopupData = this.staffModel;
        this.vaddPopupData.address = event;
        this.stfPhonesModel = new Phones();
        this.vStfAddrModel = new VStaffAddresses();
        this.vStfAddrModel = event;
        this.populateDetails();
    }

    afterAddressDialogClose() {
        this.onRowClickVStaffAddresses(this.staffModel);
    }
    onCameraClick() {
        this.cameraButton = true;
        if (this.staffModelTemp.staffId) {
            const captureImageData = this.osiosearchService.captureImageProcedure();
            captureImageData.subscribe(captureImage => {
                if (captureImage === 'OIUIMAGE') {
                    this.oumpersoFactory.imagesDataTemp.imageObjectId = this.staffModel.staffId;
                    this.oumpersoFactory.imagesDataTemp.imageObjectType = 'STAFF';
                    this.oumpersoFactory.imagesDataTemp.imageViewType = 'FACE';
                    this.oumpersoFactory.imagesDataTemp.staffId = this.staffModel.staffId;
                    this.oumpersoFactory.imagesDataTemp.lastName = this.staffModel.lastName;
                    this.oumpersoFactory.imagesDataTemp.firstName = this.staffModel.firstName;
                    this.oumpersoFactory.imagesDataTemp.userId = this.staffModel.userId;
                    this.oumpersoFactory.imagesDataTemp.birthDate = this.staffModel.birthdate;
                    this.dialogService.openLinkDialog('/oiuimagedialog', this.oumpersoFactory.imagesDataTemp, 80).subscribe(result => {
                        this.staffModel = new StaffMembers();
                        this.staffExecuteQuery();
                        this.cameraButton = false;
                    });
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumperso.pleasecreate');
                    this.show();
                    this.cameraButton = false;
                    return;
                }
            });

        }
    }

    suffixBlur() {
        if (!this.staffModel.suffix) {
            this.staffModel.suffix = this.staffModel.suffix === undefined ? '' : undefined;

        }
    }

    sexCodeBlur() {
        if (!this.staffModel.sexCode) {
            this.staffModel.sexCode = this.staffModel.sexCode === undefined ? '' : undefined;

        }
    }

    personnelTypeBlur() {
        if (!this.staffModel.personnelType) {
            this.staffModel.personnelType = this.staffModel.personnelType === undefined ? '' : undefined;

        }
    }
    positionBlur() {
        if (!this.staffModel.position) {
            this.staffModel.position = this.staffModel.position === undefined ? '' : undefined;

        }
    }
    statusBlur() {
        if (!this.staffModel.status) {
            this.staffModel.status = this.staffModel.status === undefined ? '' : undefined;
        }
    }

}
