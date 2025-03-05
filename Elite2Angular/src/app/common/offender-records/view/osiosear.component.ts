import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OsiosearService } from '../service/osiosear.service';
import { TagSearchGetOffenderRecords } from '@commonbeans/TagSearchGetOffenderRecords';
import { TagSearchGetPartialRecords } from '@commonbeans/TagSearchGetPartialRecords';
import { TagSearchGetOffenderIdentifiers } from '@commonbeans/TagSearchGetOffenderIdentifiers';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderProfileDetails } from '@commonbeans/OffenderProfileDetails';
import { Images } from '@commonbeans/Images';
import { OcucoffeService } from '../service/ocucoffe.service';
import { OffenderSearchService } from '../service/offender-search.service';
import { VHeaderBlock2 } from '@commonbeans/VHeaderBlock2';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcdclistService } from '@instlegalscreens/service/ocdclist.service';
import { Router } from '@angular/router';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OumsypflService } from '@sa/admin/service/oumsypfl.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { LoaderService } from '@core/loader/loader.service';
// import required bean declarations

@Component({
    selector: 'app-osiosear',
    templateUrl: './osiosear.component.html',
    styleUrls: ['./osiosear.component.scss']
})

export class OsiosearComponent implements OnInit, OnDestroy {
    // Variable declaration
    @ViewChild('lastName', {static: true}) lastNameElement: ElementRef;
    @ViewChild('grid', { static: false }) grid: any;
    disabled: boolean;
    resultColumnDefs: any[];
    IdentityColumnDefs: any[];
    physicColumnDefs: any[];
    msgs: any[] = [];
    searchresultsData: TagSearchGetOffenderRecords[] = [];
    searchresultsModel: TagSearchGetOffenderRecords = new TagSearchGetOffenderRecords();
    searchresultsModelObj: TagSearchGetOffenderRecords = new TagSearchGetOffenderRecords();
    tagsearchresultsModel: TagSearchGetOffenderRecords = new TagSearchGetOffenderRecords();
    offidData: TagSearchGetOffenderIdentifiers[] = [];
    offidModel: TagSearchGetOffenderIdentifiers = new TagSearchGetOffenderIdentifiers();
    offprofdtlsData: OffenderProfileDetails[] = [];
    offprofdtlsModel: OffenderProfileDetails = new OffenderProfileDetails();
    psoffnameData: TagSearchGetPartialRecords[] = [];
    psoffnameDataTemp: TagSearchGetPartialRecords[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockModelTemp: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockData: VHeaderBlock[] = [];
    imageModel: Images = new Images();
    display: boolean;
    errorMessage: string;
    editable = true;
    index: number;
    offDetailsModel: any;
    nameVariation: boolean;
    nameSwitch: boolean;
    searchType: string;
    height: number;
    weight: number;
    ethn: string;
    isName: boolean;
    isIdentifiers: boolean;
    isRedirectable: boolean;
    offenderBookid: number;
    isYear: boolean;
    isBDate: boolean;
    islaunch: boolean;
    isPartial: boolean;
    dialogData: any;
    image: any;
    lastName: string;
    firstName: string;
    middleName: string;
    disabledBdate: boolean;
    disabledByear: boolean;
    disabledId: boolean;
    isType: boolean;
    isocucoffe = true;
    link: string;
    modal: boolean;
    modalData: any[] = [];
    selectedValue: VHeaderBlock[] = [];
    vHeaderBlock2Model: VHeaderBlock2 = new VHeaderBlock2();
    isOffenderExists: boolean;
    recentOffenders: any = [];
    exitLaunchBtn = false;
    caseenabled = true;
    adrsenabled = true;
    selected = -1;
    imageId: any;
    cameraButtonDisabled: boolean;
    offnFirstName: string;
    offnLastName: string;
    offNameToggle:boolean;
    offIdToggle:boolean;
    lastNameCheck: any;
    secondMiddleName: any;
    sysPflModelTemp: SystemProfiles = new SystemProfiles();
    searchresultsDataTemp: TagSearchGetOffenderRecords[] = [];
    pinValue: boolean = false;
    searchresultsModelTemp: TagSearchGetOffenderRecords = new TagSearchGetOffenderRecords();
    pNameVariation: string;
    pSwitchNames: string;
    dob:any;
    offDobToggle: boolean;

    constructor(private osiosearFactory: OsiosearService,
        private offenderSearchService: OffenderSearchService,
        private ocucoffeFactory: OcucoffeService,
        public translateService: TranslateService, private sessionManager: UserSessionManager,
        private userSessionManager: UserSessionManager, public ocdclistService: OcdclistService, private router: Router,
        private dialogService: DialogService,private oumsypflFactory: OumsypflService,private loaderService: LoaderService) {
        this.resultColumnDefs = [];
        this.IdentityColumnDefs = [];
        this.physicColumnDefs = [];
        this.offDetailsModel = {};

    }
    ngOnInit() {
        this.cancel();
        this.systemProfileForPin();
        // this.lastNameElement["text"].nativeElement.focus();
        this.osiosearFactory.addressEnabled = false;
        this.osiosearFactory.courtcaseEnabled = false;
        this.osiosearFactory.courtcaseExit = false;
        this.osiosearFactory.addressExit = false;
        //this.osiosearFactory.navigationFlag = true;
        this.disabled = true;
        this.isIdentifiers = true;
        this.isRedirectable = true;
        this.index = 0;
        this.islaunch = false;
        this.link = undefined;
        this.modal = false;
        this.lastName = null;
        this.firstName = null;
        this.middleName = null;
        this.isType = true;
        this.imageId = null;
        this.secondMiddleName = null;
        this.searchresultsModel.pLastName = undefined;
        this.ocucoffeFactory.data.pSexCode=undefined;
        this.ocucoffeFactory.data.pGenderCode=undefined;
        if (this.ocdclistService.selectedRow) {
            this.ocdclistService.selectedRow = false;
            this.exitLaunchBtn = true;
            this.ocdclistService.checkFlag = true;
        }

        this.resultColumnDefs = [
            {
                fieldName: this.translateService.translate('system-profile.name-last'),
                field: 'pLastName', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'),
                field: 'pFirstName', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-2'),
                field: 'pMiddleName', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('osiosear.secondmiddlename'),
                field: 'secondMiddleName', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('osiosear.selectsex'),
                field: 'pSexCode',
                datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('osiosear.selectgender'),
                field: 'pGenderCode',
                datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'),
                field: 'offenderIdDisplay', datatype: 'hyperlink', link: '/INSDSBVW', displayas: 'href',
                queryparam: 'offenderIdDisplay', data: 'row', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('osiosear.pin'), field: 'pin',
                datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.birth-date'), field: 'pBirthDate',
                datatype: 'date', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('osiosear.age'), field: 'pAgeRange',
                datatype: 'number', editable: false, width: 100
            },

            {
                fieldName: this.translateService.translate('osiosear.nametype'), field: 'nameType',
                editable: false, width: 150
            },

            {
                fieldName: this.translateService.translate('osiosear.workingname'),
                field: 'workingNameFlag', datatype: 'checkbox', editable: false, width: 150
            },
        ];
        this.IdentityColumnDefs = [

            { fieldName: this.translateService.translate('osiosear.identifiertype'), field: 'identifierType', editable: false, width: 271 },
            { fieldName: this.translateService.translate('osiosear.number'), field: 'identifier', editable: false, width: 271 }

        ];

        this.physicColumnDefs = [

            { fieldName: this.translateService.translate('osiosear.physical'), field: 'profileType', editable: false, width: 271 },
            { fieldName: this.translateService.translate('osiosear.detail'), field: 'profileCode', editable: false, width: 271 }

        ];
        this.selected = -1;
        if (this.osiosearFactory.offenderCourtCasesModel && this.osiosearFactory.offenderCourtCasesModel.pSearchType) {
            this.searchType = this.osiosearFactory.offenderCourtCasesModel.pSearchType;
        } else {
            this.osiosearFactory.searchTypeCodeRtv().subscribe(result => {
                this.searchType = result;
            });
        }

        if (this.searchresultsData.length === 0) {
            this.vHeaderBlockModel = new VHeaderBlock();
            this.offenderSearchService.selectedOffender = (this.router.url === '/home') ?
                this.offenderSearchService.selectedOffender : undefined;
        }
        if (this.ocucoffeFactory.data.pLastName) {
            this.searchresultsModel = this.ocucoffeFactory.data;
            this.osiosearexecuteQuery();
        }
        // if (this.osiosearFactory.offenderCourtCasesModel.pLastName ) {
        //     this.searchresultsModel = this.osiosearFactory.offenderCourtCasesModel;
        //     this.searchresultsModel.pLastName = this.osiosearFactory.offenderCourtCasesModel.pLastName;
        //     this.searchType = this.searchresultsModel.pSearchType;
        //     if (this.searchresultsModel.pNameVariation === 'Y') {
        //     this.nameVariation = true;
        //     } else {
        //         this.nameVariation = false;
        //     }
        //     if (this.searchresultsModel.pSwitchNames === 'Y') {
        //         this.nameSwitch = true;
        //         } else {
        //             this.nameSwitch = false;
        //         }
        //     this.osiosearFactory.offenderCourtCasesModel = new TagSearchGetOffenderRecords();
        //     this.osiosearexecuteQuery();

        // }
    }
    /**
     *  This function will be executed when we click on offenderCourtCases button
     *
     */
    onCourtLaunchClick = () => {
        if (!this.offenderSearchService.selectedOffender) {
                this.show(this.translateService.translate('osiosear.legalcase'), 'warn');
                return false;
        }
       this.osiosearFactory.courtcaseEnabled = true;
       if (!this.exitLaunchBtn) {
        this.osiosearFactory.courtcaseExit = true;
       }
       this.searchresultsModel.pSearchType = this.searchType;
       this.osiosearFactory.offenderCourtCasesModel = this.searchresultsModel;
        return true;
    }
 /**
     *  This function will be executed when we click on address button
     *
     */
    onaddresLaunchClick = () => {
        if (!this.offenderSearchService.selectedOffender) {
                this.show(this.translateService.translate('No Address information exists for this offender'), 'warn');
                return false;
        }
       this.osiosearFactory.addressEnabled = true;
       if (!this.exitLaunchBtn) {
        this.osiosearFactory.addressExit = true;
       }
       this.searchresultsModel.pSearchType = this.searchType;
       this.osiosearFactory.offenderCourtCasesModel = this.searchresultsModel;
        return true;
    }
    onGridReady(event) {
    }
    onButSearchTypeclick() {
        this.searchresultsModel = this.ocucoffeFactory.data;
        this.ocucoffeFactory.data = new TagSearchGetOffenderRecords();
        
        if (this.searchType === 'I') {
            this.isName = true;
            this.isPartial = true;
            this.disabledByear = true;
            this.disabledBdate = true;
            this.disabled = true;
            this.isIdentifiers = false;
            this.isType = true;
            this.offNameToggle=false;
            this.offIdToggle=true;
            this.offDobToggle=false;

        } else {
            this.isIdentifiers = true;
            this.isName = false;
            this.isPartial = false;
            this.disabledByear = false;
            this.disabledBdate = false;
            this.offNameToggle=true;
            this.offIdToggle=false;

        }
        if (this.searchType === 'B') {
            this.offDobToggle=true;
            this.isName = true;
            this.isPartial = true;
            this.disabled = true;
            this.isIdentifiers = true;
            this.isType = true;
             this.offNameToggle=false;
             this.offIdToggle=false;

        } else{
            this.offDobToggle=false;
        }
        if (this.searchType === 'P' || this.searchType === 'S') {
            this.islaunch = true;
            this.link = '/osioseardialog';
            this.modal = true;
            this.disabled = true;
            this.isPartial = true;
            this.offNameToggle=true;
            this.offIdToggle=false;
            this.offDobToggle=false;

        } else {
            this.islaunch = false;
            this.link = undefined;
            this.modal = false;
        }
        this.searchresultsModel.pSearchType = this.searchType;
        if (this.lastName !== null) {
            this.searchresultsModel.pLastName = this.lastName;
            this.lastName = null;
        }
        if (this.firstName) {
            const data =this.firstName;
            this.searchresultsModel.pFirstName =data.replace('%','');
            this.firstName = null;
        }
        if (this.middleName) {
            const data =this.middleName;
            this.searchresultsModel.pMiddleName =data.replace('%','');
            this.middleName = null;
        }
        
    
       
        if (this.secondMiddleName !== null) {
            this.searchresultsModel.secondMiddleName = this.secondMiddleName;
            this.secondMiddleName = null;
        }
        if(this.searchType === 'N'){
        if (this.pNameVariation !== null) {
            this.searchresultsModel.pNameVariation = this.pNameVariation;
            this.pNameVariation = null;
        }

        if (this.pSwitchNames !== null) {
            this.searchresultsModel.pSwitchNames = this.pSwitchNames;
            this.pSwitchNames = null;
        }
    }
        
        /*
        it executes when navigate from OffenderCourt cases
        */
        if (this.osiosearFactory.offenderCourtCasesModel.pSearchType ) {
            this.searchresultsModel = this.osiosearFactory.offenderCourtCasesModel;
            this.searchType = this.searchresultsModel.pSearchType;
            if (this.searchresultsModel.pNameVariation === 'Y') {
            this.nameVariation = true;
            } else {
                this.nameVariation = false;
            }
            if (this.searchresultsModel.pSwitchNames === 'Y') {
                this.nameSwitch = true;
                } else {
                    this.nameSwitch = false;
                }
            this.osiosearFactory.offenderCourtCasesModel = new TagSearchGetOffenderRecords();
            this.osiosearexecuteQuery();

        }

    }
    cancel(event?) {
        this.searchresultsModel = new TagSearchGetOffenderRecords();
        this.searchresultsData = [];
        this.searchresultsDataTemp = [];
        this.offidModel = new TagSearchGetOffenderIdentifiers();
        this.offidData = [];
        this.offprofdtlsModel = new OffenderProfileDetails();
        this.offprofdtlsData = [];
        this.height = null;
        this.weight = null;
        this.offenderBookid = null;
        this.ethn = null;
        this.offDetailsModel = {};
        this.isIdentifiers = true;
        this.nameVariation = false;
        this.nameSwitch = false;
        this.isName = false;
        this.index = 0;
        this.disabled = true;
        this.disabledBdate = false;
        this.disabledByear = false;
        this.image = null;
        this.isocucoffe = true;
        this.caseenabled = true;
        this.adrsenabled = true;
        this.osiosearFactory.navigationFlag = true;
        this.onButSearchTypeclick();
    }
    PopulateDetails(rootOffenderId, offenderId) {
        this.offenderBookid = null;
        this.ethn = null;
        this.offDetailsModel = {};
        this.image = null;
        this.height = null;
        this.weight = null;
        this.offprofdtlsData = [];
        const serviceObj = this.osiosearFactory.populateOffDetails(rootOffenderId, offenderId);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                this.offenderBookid = data[0].tspo.poffenderBookId;
                this.osiosearOffprofdtlsExecuteQuery();
                if (data[0].opa) {
                    this.height = data[0].opa.heightCm;
                    this.weight = data[0].opa.weightKg;
                }
                this.ethn = data[0].offs[0].raceCode;
                this.offDetailsModel.pprisonStatus = data[0].tspo.pprisonStatus;
                this.offDetailsModel.communityStatus = data[0].tspo.pCommunityStatus;
                this.offDetailsModel.communityOfficer = data[0].tspo.pcommunityOfficer;
                this.offDetailsModel.prisonLocation = data[0].tspo.pprisonLocation;
                if (data[0].imgs !== null && data[0].imgs.imageThumbnail !== undefined && data[0].imgs.imageThumbnail !== null) {
                    this.imageId = data[0].imgs.imageId;
                    this.image = 'data:image/JPEG;base64,' + data[0].imgs.imageThumbnail;
                } else {
                    this.image = null;
                    this.imageId = null;
                }
            } else {
                this.offenderBookid = null;
                this.ethn = null;
                this.offDetailsModel = {};
                this.image = null;
            }

        });

    }

    createNewRecord = () => {
        if(this.pinValue && this.searchresultsModelTemp.pLastName && !this.searchresultsModelTemp.offenderIdDisplay){
            this.searchresultsModel = this.searchresultsModelTemp;
            this.searchresultsModel['pinFlag'] = true;
        }
        this.osiosearFactory.data = this.searchresultsModel;
        this.router.navigate(['/OCUCOFFE']);
    }

    /**
    *  This function will be executed when commit event is
    * fired
    */
    // execute query
    osiosearexecuteQuery(event?) {
        this.offenderSearchService.selectedOffender = null;
        try {
            if (event) {
                if (String(event.lastValue).indexOf('_') >= 0 && event.value === null) {
                    this.show(this.translateService.translate('osiosear.datemustbeentervalidformat'), 'warn');
                    return;
                }
            }
            if (event.lastValue && event.value === null) {
                this.show(this.translateService.translate('osiosear.leapyearnotallowed'), 'warn');
                return;
            }
        } catch (e) { }
        if (this.searchType === 'B') {
            if (!this.searchresultsModel.pBirthDate && !this.searchresultsModel.pBirthYear) {
                this.show(this.translateService.translate('osiosear.selectdoboryear'), 'warn');
                return;
            }
        }

        this.isocucoffe = false;
        this.osiosearFactory.data = this.searchresultsModel;
        this.osiosearSearchResultsexecuteQuery();

    }
    // execute query
    osiosearSearchResultsexecuteQuery() {
        if (this.searchresultsModel.pBirthYear) {
            if (this.searchresultsModel.pBirthYear.toString().length > 4) {
                this.show(this.translateService.translate('osiosear.pleaseentervalidyear'), 'warn');
                return;
            }
        }
        if ((this.searchType && this.searchresultsModel.pLastName) &&
            (this.searchresultsModel.pBirthYear && !this.searchresultsModel.pBirthRange && this.searchresultsModel.pBirthRange !== 0)) {
            this.searchresultsData = [];
            this.show(this.translateService.translate('osiosear.pleaseenterrangevalue'), 'warn');
            return;
        }
        if (this.nameVariation && this.nameSwitch) {
            this.show(this.translateService.translate('osiosear.pleaseenteronlyonecheckbx'), 'warn');
            return;
        }
        if (this.searchType === 'I' && !this.searchresultsModel.offenderIdDisplay && !this.searchresultsModel.pBookNo
            && !this.searchresultsModel.pIdentifierType && !this.searchresultsModel.pIdentifierValue) {
            this.show(this.translateService.translate('osiosear.selectidentifier'), 'warn');
            return;
        }
        if (this.searchType === 'I' && !this.searchresultsModel.pIdentifierType && this.searchresultsModel.pIdentifierValue) {
            this.show(this.translateService.translate('osiosear.selectidentifier'), 'warn');
            return;
        }

        this.searchresultsData = [];
        this.offidData = [];
        this.offprofdtlsData = [];
        this.offDetailsModel = [];
        this.height = null;
        this.weight = null;
        this.ethn = null;
        this.image = null;
        this.isRedirectable = true;
        this.searchresultsModel.pSearchType = this.searchType;
        this.searchresultsModel.pNameVariation = (this.nameVariation === true) ? 'Y' : 'N';
        this.searchresultsModel.pSwitchNames = (this.nameSwitch === true) ? 'Y' : 'N';
        this.searchresultsDataTemp = [];
        this.searchresultsModel.moduleName = 'OSIOSEAR';
        this.searchresultsModel.parentForm = this.router.url;
        if(this.searchresultsModel.pIdentifierValue === ''){
            this.searchresultsModel.pIdentifierValue =undefined;
        }
        const correlIdResult = this.osiosearFactory.getCorrelationId();
        if (this.firstName !== null || this.middleName  !== null) {
            this.searchresultsModelObj = JSON.parse(JSON.stringify(this.searchresultsModel));
            this.searchresultsModelObj.pFirstName = this.firstName;
            this.searchresultsModelObj.pMiddleName = this.middleName;
        } else {
            this.searchresultsModelObj = JSON.parse(JSON.stringify(this.searchresultsModel));
        }
        correlIdResult.subscribe(data => {
            this.searchresultsModel.intCorrelationId = data;
            const serviceObj = this.osiosearFactory.searchResultsExecuteQuery(this.searchresultsModelObj);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.caseenabled = true;
                    this.adrsenabled = true;
                    this.searchresultsDataTemp = [];
                    this.searchresultsData = [];
                    //If elite data not found, then it will search into the JIS Common.
                    if (this.pinValue && this.osiosearFactory.navigationFlag) {
                        const serachDetails = { searchType: this.searchType, pinSequence: this.searchresultsModel.intCorrelationId, moduleName: this.searchresultsModel.moduleName };
                        this.searchresultsModel.intCorrelationId = serachDetails.pinSequence;
                        this.dialogService.openLinkDialog('/JISCOMMONCONFIRMBOX', serachDetails, 40).subscribe(result => {
                            if (result) {
                                this.searchresultsData = [];
                                result.forEach(e => {
                                    if (this.searchType === 'I') {
                                        e.pin = this.searchresultsModel.pIdentifierValue;
                                    }
                                    this.searchresultsDataTemp.push(e);
                                });
                                this.searchresultsData = this.searchresultsDataTemp;
                                this.selected = 0;
                                this.loaderService.hideLoader();
                                this.osiosearFactory.navigationFlag = false;
                            }
                        });
                    }
                    if (!this.pinValue) {
                        this.show(this.translateService.translate('common.querycaused'), 'warn');
                    }
                } else {
                    this.disabledBdate = false;
                    this.disabledByear = false;
                    const datePipe = new DatePipe('en-US');
                    for (let i = 0; i < data.length; i++) {
                        data[i].workingNameFlag = (data[i].workingNameFlag === 'N') ? false : true;
                    }
                    this.searchresultsData = data;
                    this.searchresultsDataTemp = JSON.parse(JSON.stringify(this.searchresultsData));
                    this.cameraButtonDisabled = false;
                    this.caseenabled = false;
                    this.adrsenabled = false;
                    this.isRedirectable = false;
                    this.index = 0;
                    this.selected = 0;
                    this.offnFirstName = this.searchresultsData[0].pFirstName;
                    this.offnLastName = this.searchresultsData[0].pLastName;
                }
            });
        });
    }

    osiosearRowSelectedExecuteQuery(event) {
        if (event) {
            if(this.pinValue){
                if(!event.offenderIdDisplay){
                    this.show(this.translateService.translate('osiosear.pleaseCreateaneliteoffenderrecordtoadmitthisoffender'), 'warn');
                    this.isocucoffe = false;
                }else{
                    this.isocucoffe = true;
                }
            }
            this.searchresultsModelTemp = event;
            this.selectedValue = [];
            this.selectedValue.push(event);
            if (event.offenderId) {
                this.offidModel.offenderId = event.offenderId;
            }
            if(event.pFirstName){
                this.offnFirstName = event.pFirstName;
               }
               if(event.pLastName){
                this.offnLastName = event.pLastName;
               }
            //this.index = this.searchresultsData.indexOf(event);
            this.offprofdtlsModel.offenderBookId = Number(event.offenderId);
            if (event.offenderIdDisplay) {
                this.PopulateDetails(event.rootOffenderId, event.offenderId);
                this.osiosearOffIdExecuteQuery();
                this.osiosearoffbkgGlobalQueryExecuteQuery(event);
            }
        }else{
            this.searchresultsModelTemp = new TagSearchGetOffenderRecords();
        }  
    }




    osiosearoffbkgGlobalQueryExecuteQuery(event) {
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel.offenderIdDisplay = (event.offenderIdDisplay);
        this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
        this.vHeaderBlockModel.lastName = event.pLastName;
        //        this.vHeaderBlockModel.offenderId = this.offidModel.offenderId;
        const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
        offbkGlobal.subscribe(list => {
            if (list.length > 0) {
                this.vHeaderBlockData = [];
                this.vHeaderBlockModel = list[0];
                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                if (list[0].imageId != null) {
                    this.imageModel.imageId = list[0].imageId;
                    this.osiosearFactory.imageExecuteQuery(this.imageModel).subscribe(imageData => {
                        this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                    });
                }
            } else {
                this.vHeaderBlockModel = new VHeaderBlock();
                this.offenderSearchService.selectedOffender = undefined;
            }
            // added this service for to retrieve oidadmis screen header block data.
            this.vHeaderBlock2Model = new VHeaderBlock2();
            this.vHeaderBlock2Model.offenderIdDisplay = event.offenderIdDisplay;
            const offbkgVheader = this.osiosearFactory.offbkgExecuteQuery(this.vHeaderBlock2Model);
            offbkgVheader.subscribe(listObj => {
                if (listObj.length > 0) {
                    this.vHeaderBlock2Model = new VHeaderBlock2();
                    this.vHeaderBlockData = [];
                    if (this.vHeaderBlockModel.offenderBookId) {
                        for (let i = 0; i < listObj.length; i++) {
                            if (listObj[i].offenderBookId === this.vHeaderBlockModel.offenderBookId) {
                                this.vHeaderBlock2Model = listObj[i];
                            }
                        }
                    } else if (!this.vHeaderBlock2Model.offenderIdDisplay) {
                        for (let i = 0; i < listObj.length; i++) {
                            if (!listObj[i].aliasOffenderId) {
                                this.vHeaderBlock2Model = listObj[i];
                            }
                        }
                    }
                    this.osiosearFactory.selectOffender = this.vHeaderBlock2Model;
                } else {
                    this.vHeaderBlockModel = new VHeaderBlock();
                    this.osiosearFactory.selectOffender = undefined;
                }
            });
        });
        
        
    }
    /*
     * updated list of recent offender
     *
     */
    updateRecentOffenderList(VHeaderBlock: VHeaderBlock) {
        VHeaderBlock.caseLoadId = this.userSessionManager.currentCaseLoad;
        const updateRecentOffender = this.osiosearFactory.updateRecOffendersList(VHeaderBlock);
        updateRecentOffender.subscribe(result => {

        });
    }
    osiosearOffIdExecuteQuery() {
        const offidResult = this.osiosearFactory.offIdExecuteQuery(this.offidModel);
        offidResult.subscribe(offidResultList => {
            if (offidResultList.length === 0) {
                this.offidData = [];
            } else {
                this.offidData = offidResultList;
                this.offidModel = offidResultList[0];
            }
        });
    }
    /**
    *  This function will be executed when commit event is
    * fired
    */
    osiosearOffprofdtlsExecuteQuery() {
        this.offprofdtlsData = [];
        this.offprofdtlsModel.offenderBookId = this.offenderBookid;
        const offprofdtlsResult = this.osiosearFactory.offProfDtlsExecuteQuery(this.offprofdtlsModel);
        offprofdtlsResult.subscribe(offprofdtlsResultList => {
            if (offprofdtlsResultList.length > 0) {
                this.offprofdtlsData = offprofdtlsResultList;
                this.offprofdtlsModel = offprofdtlsResultList[0];
            } else {
                this.offprofdtlsData = [];
            }
        });
    }
    /**
     *
     * @param vldmsg
     * @param type
     */
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    setLastName(event) {
        if (event) {
            const names = { first: null, middle: null };
            if (this.searchresultsModel.pFirstName) {
                names.first = this.searchresultsModel.pFirstName;
            }
            if (this.searchresultsModel.pMiddleName) {
                names.middle = this.searchresultsModel.pMiddleName;
            }
            this.searchresultsModel.pLastName = event.lastName;
            this.searchresultsModel.secondMiddleName= event.secondMiddleName;
            if (names.first) {
                this.firstName = names.first + '%';
            }
            if (names.middle) {
                this.middleName = names.middle + '%';
            }
            this.searchType = 'N';
            this.islaunch = false;
            this.lastName = event.lastName;
            this.secondMiddleName= event.secondMiddleName;
            this.pNameVariation = (this.nameVariation === true) ? 'Y' : 'N';
            this.pSwitchNames = (this.nameSwitch === true) ? 'Y' : 'N';
            this.osiosearexecuteQuery();
        }
    }
    populateOffDetailsBlock() {
        const serviceObj = this.osiosearFactory.populateOffDetailsBlockattrCur(this.offenderBookid);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                this.height = data[0].heightCm;
                this.weight = data[0].weightKg;
            }
        });

    }
    isValidLogin(event) {
        if (event) {
            if (this.searchresultsModel.pLastName && this.searchresultsModel.pLastName.replace(/\s/g, '').length === 0) {
                this.searchresultsModel.pLastName = null;
            }
        }
        if (this.searchresultsModel.pLastName && this.searchresultsModel.pLastName) {
            this.disabled = false;
        } else {
            this.disabled = true;
        }
        if (this.searchType === 'P' || this.searchType === 'S') {
            this.osiosearPsOffNameExecuteQuery();
        }
    }
    isValidId(event) { 
        if (this.searchresultsModel.offenderIdDisplay || this.searchresultsModel.pIdentifierValue) {
            this.disabled = false;
        } else {
            this.disabled = true;
        }
    }
    isValidBookingNo(event) {
        if (this.searchresultsModel.pBookNo) {
            this.disabled = false;
            this.isType = false;
        } else {
            this.disabled = true;
            this.isType = true;
        }
    }
    isValid(event) {
        if (this.searchresultsModel.pIdentifierValue) {
            this.disabled = false;
        } else {
            this.disabled = true;
        }
    }
    isValidBirthDate(event) {
        if (this.searchresultsModel.pBirthDate) {
            this.disabledBdate = true;
            this.searchresultsModel.pBirthYear = undefined;
            this.searchresultsModel.pBirthRange = undefined;
        } else {
            this.disabledBdate = false;
        }
    }
    onClickEvent(event) {
        if (this.searchresultsModel.pBirthYear || this.searchresultsModel.pBirthRange) {
            this.disabledByear = true;
            this.searchresultsModel.pBirthDate = undefined;
        } else {
            this.disabledByear = false;
        }

    }
    setType() {
        if (this.searchresultsModel.pIdentifierType !== undefined && this.searchresultsModel.pIdentifierType !== null) {
            this.isType = false;
        }

    }
    osiosearPsOffNameExecuteQuery() {
        this.modal = true;
        this.link = '/osioseardialog';
        this.islaunch = true;
        /*const psoffnameResult = this.osiosearFactory.
            psOffNameExecuteQuery(this.searchresultsModel);
        psoffnameResult.subscribe(psoffnameResultList => {
            if (psoffnameResultList.length === 0) {
                this.psoffnameData = [];
            } else {
                this.psoffnameData = psoffnameResultList;
                this.modalData = this.psoffnameData;
                this.modal = true;
                this.link = '/osioseardialog';
                this.islaunch = true;
            }
        });*/
    }
    ngOnDestroy(): void {
        this.ocucoffeFactory.data = new TagSearchGetOffenderRecords();
    }
    onExitBtnClick = () => {
        this.ocdclistService.checkFlag = false;
        return true;
    }
    CallFormImage() {
        this.cameraButtonDisabled = true;
            const captureImageData = this.osiosearFactory.captureImageProcedure();
            captureImageData.subscribe(captureImage => {
            if (captureImage === 'OIUIMAGE') {

                if (this.offenderBookid && this.imageId) {
                    this.osiosearFactory.imagesDataTemp.imageObjectId = this.offenderBookid;
                    this.osiosearFactory.imagesDataTemp.imageObjectType = 'OFF_BKG';
                    this.osiosearFactory.imagesDataTemp.imageViewType = 'FACE';
                    this.osiosearFactory.imagesDataTemp.imageObjectSeq = null;
                    this.osiosearFactory.imagesDataTemp.orientationType = null;
                this.dialogService.openLinkDialog('/oiuimagedialog', this.osiosearFactory.imagesDataTemp, 80).subscribe(result => {
                    this.cameraButtonDisabled = false;

                });
            } else {
                this.show(this.translateService.translate('osiosear.noimage'), 'warn');
                this.cameraButtonDisabled = false;
                return;
            }
            } else {
            }
        });
    }
    
    oninputFocus(){
        if(this.lastNameCheck){
            this.lastNameCheck.focused = true;
        } 
    }

    onlyAlphabetallowed(event:any){
        let charcode = event.keyCode;
        if (charcode == 39  || charcode == 32 || charcode == 45 || (charcode >= 65 && charcode <= 90) || (charcode >= 97 && charcode <= 122)){
            return true; //validation for " ' , a-z , A-Z "
        }  
        return false;
    }

    onPaste(event){
        let str = event.clipboardData.getData('text');
        for (let i = 0; i < str.length; i++) {
            let kC = str.charAt(i).charCodeAt(0);
            let ev = { keyCode : kC}
            if(!this.onlyAlphabetallowed(ev)){
               return false;
            }
        }
        return true;
    }

    systemProfileForPin() {
        this.sysPflModelTemp.profileCode = 'PIN';
        this.sysPflModelTemp.profileType = 'CLIENT';
        const syspflResult = this.oumsypflFactory.getSystemProfileRecords(this.sysPflModelTemp);
        syspflResult.subscribe(data => {
           if (data.length > 0) {
              if (data[0].profileValue === "Y" || data[0].profileValue === "y") {
                 this.pinValue = true;
                 this.resultColumnDefs[7].hide = 'false';
              } else {
                 this.resultColumnDefs[7].hide = 'true';
                 this.pinValue = false;
              }
           }
        });
     }

    getSoundexPartialData = () => {
        const psoffnameResult = this.osiosearFactory.psOffNameExecuteQuery(this.searchresultsModel);
        psoffnameResult.subscribe(psoffnameResultList => {
            if (psoffnameResultList && psoffnameResultList.length === 0) {
                this.psoffnameData = [];
                this.osiosearSearchResultsexecuteQuery();
            }
            else {
                this.psoffnameData = psoffnameResultList;
                this.modalData = this.psoffnameData;
                this.dialogService.openLinkDialog('/osioseardialog', this.searchresultsModel, 40).subscribe(data => {
                    if (data) {
                        this.setLastName(data);
                    }
                });
            }
        });
    }

}
