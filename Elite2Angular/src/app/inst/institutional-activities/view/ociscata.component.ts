import {
    Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OciscataService } from '@inst/institutional-activities/service/ociscata.service';
import { VCourseActivities } from '@instinstitutionalactivitiesbeans/VCourseActivities';
import { Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcdxprogService } from '@inst/programs-without-schedules/service/ocdxprog.service';
import { OffenderPrgObligations } from '@instprogramswithoutschedulesbeans/OffenderPrgObligations';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { ProgramsNonAssocTmp } from '@instinstitutionalactivitiesbeans/ProgramsNonAssocTmp';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ManageAppBarService } from "@core/service/manage-app-bar.service";
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { VOffenderPrgObligations } from '@cm/programsservices/beans/VOffenderPrgObligations';
import { OcduprojService } from '@cm/programsservices/service/ocduproj.service';
import { OffenderProgramProfilesCommitBean } from '@instprogramswithoutschedulesbeans/OffenderProgramProfilesCommitBean';
import { OffenderProgramProfiles } from '@instprogramswithoutschedulesbeans/OffenderProgramProfiles';
//import { OffenderCourseAttendance } from 'src/app/cm/programsservices/beans/OffenderCourseAttendance';
//import { OffenderCourseAttendance } from '@cm/programsservices/beans/OffenderCourseAttendance';;
//import { OffenderCourseAttendancesCommitBean } from '@cm/programsservices/beans/OffenderCourseAttendancesCommitBean';
import { OcdprogrService } from '@cm/programsservices/service/ocdprogr.service'
/* import { OidpwaitService } from '@cm/programsservices/service/oidpwait.service';
import { OcdprogrService } from '@cm/programsservices/service/ocdprogr.service'; */

@Component({
    selector: 'app-ociscata',
    templateUrl: './ociscata.component.html'
})

export class OciscataComponent implements OnInit, AfterViewInit {
    backBtn: boolean;
    @ViewChild('grid', { static: true }) grid: any;
    @Input() dialogData: any;
    @Output() assignRecord: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    vcrsactData: VCourseActivities[] = [];
    vcrsactDataTemp: VCourseActivities[] = [];
    vcrsactModel: VCourseActivities = new VCourseActivities();
    programServicesId: VCourseActivities = new VCourseActivities();
    vcrsactModelTempData: VCourseActivities[] = [];
    vcrsactStaffModel: VCourseActivities = new VCourseActivities();
    vcrsactIndex = -1;
    vcrsactInsertList: VCourseActivities[] = [];
    vcrsactUpdatetList: VCourseActivities[] = [];
    vcrsactDeleteList: VCourseActivities[] = [];
    display = true;
    vCrsActColumnDef: any[];
    tasksColumnDef: any[];
    rgareasRg: any[] = [];
    rgpsagerangeRg: any[] = [];
    rgpsavailRg: any[] = [];
    rgpscategoryRg: any[] = [];
    rgpsneedsRg: any[] = [];
    rgpsoffgrpsRg: any[] = [];
    rgpsprovtypeRg: any[] = [];
    rgpssexRg: any[] = [];
    rgethnicityRg: any[] = [];
    rgregionRg: any[] = [];
    rgservicesRg: any[] = [];
    rgcsldcodeRg: any[] = [];
    rgteamagylocsRg: any[] = [];
    rgcorplocsRg: any[] = [];
    rgagylocsRg: any[] = [];
    rgagylocclRg: any[] = [];
    rgteamunpaidwkRg: any[] = [];
    rgproviderdttoRg: any[] = [];
    rgteamacpRg: any[] = [];
    rgacpproviderinstRg: any[] = [];
    rgproviderNameRg: any[] = [];
    environmentTitles = { description: 'Description' };
    regionTitles = { description: 'Description' };
    areaTitles = { description: 'Description' };
    providerNameTitles = { description: 'Description' };
    environmentLink: any;
    categoryLink: any;
    serviceLink: any;
    regionLink: any;
    areaLink: any;
    providerNameLink: any;
    environment: string;
    environmentTemp: string;
    category: string;
    categoryTemp: string;
    service: string;
    region: string;
    area: string;
    providerTypeDesc: string;
    providerName: string;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    programId: any;
    advanceSearch: boolean;
    callingForm: string;
    caseloadId: any;
    nbtAgyLocId: any;
    nbtProviderId: any;
    nbtAreaCode: any;
    agyLocId: any;
    strNoValue: any;
    strRegionAndEnv: any;
    rgagylocsServiceObj: any;
    categoryNameBlockEntered = false;
    fromAdvBlock = false;
    pOperation: any;
    listSeq: any;
    nbtProgramCategory: any;
    caseloadDesc: any;
    pCategory: any;
    pProgramId: any;
    lvProviderType: any;
    categoryFlag: boolean;
    serviceFlag: boolean;
    offprgobligationsModel: OffenderPrgObligations = new OffenderPrgObligations();
    serviceDescription: any;
    defaultCommAgyLocDesc: any;
    defaultCommAgyLocId: any;
    globalCaseloadType: any;
    fromCategoryToSetService: any;
    exitFlag: any;
    assignFlag: any;
    ocdxprogSearch: boolean;
    pOnlyFutureDate: any;
    selectedProgramCategory: any[] = [];
    programsNonAssocTmp: ProgramsNonAssocTmp[] = [];
    cancelFlag: boolean;
    getTempCount: number;
    vConflictFlag: any;
    pOffenderBookId: number;
    lvNaConflict: any;
    lvRootOffenderId: number;
    inCount: number;
    programsNonAssocTmpModel: ProgramsNonAssocTmp = new ProgramsNonAssocTmp();
    globalDefaultCommAgyLocDesc: any;
    globalDefaultCommAgyLocId: any;
    defaultAgyLocId: any;
    constantDisabled: boolean;
    alloOffDisabled: boolean;
    providerNameDisabled: boolean;
    parentAreaCode: any;
    namesReadOnly: boolean;
    searchDisable: boolean;
    clearDisable: boolean;
    pOperationTemp: any;
    conflictData: CourseActivities = new CourseActivities();
    vOffPrgOblDataTemp: VOffenderPrgObligations[] = [];
    offenderDetailsDisplay: VOffenderPrgObligations = new VOffenderPrgObligations();
    projallocCommitModel: OffenderProgramProfilesCommitBean = new OffenderProgramProfilesCommitBean();
    projallocModel: OffenderProgramProfiles = new OffenderProgramProfiles();
    courseActivitiesBean: CourseActivities = new CourseActivities();
    offenderProgramProfilesBean: OffenderProgramProfiles = new OffenderProgramProfiles();
    offenderProgramProfilesCommitBean: OffenderProgramProfilesCommitBean = new OffenderProgramProfilesCommitBean();
    areaReadOnly: boolean;
    providerSource :string;

    constructor(private ociscataFactory: OciscataService, private appbarService: ManageAppBarService,
        public translateService: TranslateService, private router: Router, private sessionManager: UserSessionManager,
        private ocdxprogFactory: OcdxprogService, public dialogService: DialogService, private ocduprojFactory: OcduprojService, private ocdprogrFactory: OcdprogrService) {
        this.vCrsActColumnDef = [];
        this.tasksColumnDef = [];
    }
    ngOnInit() {
        // if (this.oidpwaitFactory.exitFlag) {
        //     this.dialogData= this.oidpwaitFactory.vOffPrgOblModelService;
        //     this.backBtn = true;
        //     this.pOffenderBookId =this.oidpwaitFactory.vOffPrgOblModelService.offenderBookId;
        //     this.pCategory ='ACP';
        //     this.pOperation ='ALLOCATE';
        //     this.pOnlyFutureDate ='Y';
        //     this.pProgramId =this.oidpwaitFactory.vOffPrgOblModelService.programId;
        //     this.vcrsactModel.agyLocId =this.oidpwaitFactory.vOffPrgOblModelService.nbtAgyLocId;
        // }
        this.providerSource = null;
        this.cancelFlag = true;
        this.strNoValue = 'NONE';
        this.categoryFlag = false;
        this.serviceFlag = false;
        this.assignFlag = true;
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.globalCaseloadType = this.sessionManager.currentCaseLoadType;
        this.environmentLink = 'ociscata/rgCsldCodeRecordGroup';
        this.categoryLink = 'ociscata/rgPsCategoryRecordGroup';
        this.regionLink = 'ociscata/rgRegionRecordGroup';
        //this.serviceLink = 'ociscata/rgServicesRecordGroup?category=' + this.strNoValue;
        this.ociscataFactory.vCourseActivities = undefined;
        this.ocdxprogSearch = false;
        this.constantDisabled = true;
        this.alloOffDisabled = true;
        this.exitFlag = true;
        this.namesReadOnly = false;
        this.searchDisable = false;
        this.clearDisable = true;
        this.areaReadOnly = true;
        this.environment = this.sessionManager.currentCaseLoadType;
        this.vCrsActColumnDef = [
            {
                fieldName: this.translateService.translate('common.select'), field: 'nbtSelect', datatype: 'checkbox',
                editable: true, width: 150, cellEditable: this.canServicesEdit
            },
            {
                fieldName: this.translateService.translate('ociscata.service'), field: 'programServicesDesc',
                editable: false, width: 150, cellEditable: this.canServicesEdit
            },
            {
                fieldName: this.translateService.translate('ociscata.courseactivity'),
                field: 'courseActivityDesc', editable: false, width: 150, cellEditable: this.canServicesEdit
            },
            {
                fieldName: this.translateService.translate('ociscata.phase'), field: 'phaseDesc', editable: false,
                width: 150, cellEditable: this.canServicesEdit
            },
            {
                fieldName: this.translateService.translate('ociscata.provider'), field: 'providerName',
                editable: false, width: 150, cellEditable: this.canServicesEdit
            },
            {
                fieldName: this.translateService.translate('common.startdate'), field: 'scheduleStartDate', datatype: 'date',
                editable: false, width: 150, cellEditable: this.canServicesEdit
            },
            {
                fieldName: this.translateService.translate('common.enddate'), field: 'scheduleEndDate', datatype: 'date',
                editable: false, width: 150, cellEditable: this.canServicesEdit
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', datatype: 'checkbox',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ociscata.vacancy'), field: 'vacancy', editable: false, width: 150,
                cellEditable: this.canServicesEdit
            },
        ];
        if (this.router.url === '/OCISCATA' || this.router.url === '/OCDXPROG' || this.router.url === '/OCDPROGR' || this.router.url === '/OCDUPROJ' || this.router.url === '/OIDOWREL') {
            this.listSeq = 1;
            const defaultVal = this.ociscataFactory.setupDefaults(this.listSeq);
            defaultVal.subscribe(val => {
                this.providerTypeDesc = val;

            });
        }
        const serviceObjAgy = this.ociscataFactory.getDefaultAgency(this.caseloadId);
        serviceObjAgy.subscribe(data => {
            if (data != null && data !== 'NONE') {
                this.defaultAgyLocId = data;
            }
        });
        const serviceObjDefCommAgy = this.ociscataFactory.getCommDefaults(this.caseloadId);
        serviceObjDefCommAgy.subscribe(data => {
            if (data != null) {
                this.globalDefaultCommAgyLocDesc = data.description;
                this.globalDefaultCommAgyLocId = data.code;
            }
        });
        const rgpsagerangeServiceObj = this.ociscataFactory.
            rgPsAgeRangeRecordGroup();
        rgpsagerangeServiceObj.subscribe(rgpsagerangeList => {
            if (rgpsagerangeList.length === 0) {
                this.rgpsagerangeRg = [];
            } else {
                for (let i = 0; i < rgpsagerangeList.length; i++) {
                    this.rgpsagerangeRg.push({
                        'text': rgpsagerangeList[i].code + ' - ' +
                            rgpsagerangeList[i].description, 'id': rgpsagerangeList[i].code
                    });
                }
            }
        });
        const rgpsavailServiceObj = this.ociscataFactory.
            rgPsAvailRecordGroup();
        rgpsavailServiceObj.subscribe(rgpsavailList => {
            if (rgpsavailList.length === 0) {
                this.rgpsavailRg = [];
            } else {
                for (let i = 0; i < rgpsavailList.length; i++) {
                    this.rgpsavailRg.push({
                        'text': rgpsavailList[i].code + ' - ' +
                            rgpsavailList[i].description, 'id': rgpsavailList[i].code
                    });
                }
            }
        });
        const rgpscategoryServiceObj = this.ociscataFactory.
            rgPsCategoryRecordGroup();
        rgpscategoryServiceObj.subscribe(rgpscategoryList => {
            if (rgpscategoryList.length === 0) {
                this.rgpscategoryRg = [];
            } else {
                for (let i = 0; i < rgpscategoryList.length; i++) {
                    this.rgpscategoryRg.push({
                        'text': rgpscategoryList[i].code + ' - ' +
                            rgpscategoryList[i].description, 'id': rgpscategoryList[i].code
                    });
                }
            }
        });
        const rgpsneedsServiceObj = this.ociscataFactory.
            rgPsNeedsRecordGroup();
        rgpsneedsServiceObj.subscribe(rgpsneedsList => {
            if (rgpsneedsList.length === 0) {
                this.rgpsneedsRg = [];
            } else {
                for (let i = 0; i < rgpsneedsList.length; i++) {
                    this.rgpsneedsRg.push({
                        'text': rgpsneedsList[i].code + ' - ' +
                            rgpsneedsList[i].description, 'id': rgpsneedsList[i].code
                    });
                }
            }
        });
        const rgpsoffgrpsServiceObj = this.ociscataFactory.
            rgPsOffGrpsRecordGroup();
        rgpsoffgrpsServiceObj.subscribe(rgpsoffgrpsList => {
            if (rgpsoffgrpsList.length === 0) {
                this.rgpsoffgrpsRg = [];
            } else {
                for (let i = 0; i < rgpsoffgrpsList.length; i++) {
                    this.rgpsoffgrpsRg.push({
                        'text': rgpsoffgrpsList[i].code + ' - ' +
                            rgpsoffgrpsList[i].description, 'id': rgpsoffgrpsList[i].code
                    });
                }
            }
        });
        const rgpsprovtypeServiceObj = this.ociscataFactory.
            rgPsProvTypeRecordGroup();
        rgpsprovtypeServiceObj.subscribe(rgpsprovtypeList => {
            if (rgpsprovtypeList.length === 0) {
                this.rgpsprovtypeRg = [];
            } else {
                for (let i = 0; i < rgpsprovtypeList.length; i++) {
                    this.rgpsprovtypeRg.push({
                        'text': rgpsprovtypeList[i].code + ' - ' +
                            rgpsprovtypeList[i].description, 'id': rgpsprovtypeList[i].code
                    });
                }
            }
        });
        const rgpssexServiceObj = this.ociscataFactory.
            rgPsSexRecordGroup();
        rgpssexServiceObj.subscribe(rgpssexList => {
            if (rgpssexList.length === 0) {
                this.rgpssexRg = [];
            } else {
                for (let i = 0; i < rgpssexList.length; i++) {
                    this.rgpssexRg.push({
                        'text': rgpssexList[i].code + ' - ' +
                            rgpssexList[i].description, 'id': rgpssexList[i].code
                    });
                }
            }
        });
        const rgethnicityServiceObj = this.ociscataFactory.
            rgEthnicityRecordGroup();
        rgethnicityServiceObj.subscribe(rgethnicityList => {
            if (rgethnicityList.length === 0) {
                this.rgethnicityRg = [];
            } else {
                for (let i = 0; i < rgethnicityList.length; i++) {
                    this.rgethnicityRg.push({
                        'text': rgethnicityList[i].code + ' - ' +
                            rgethnicityList[i].description, 'id': rgethnicityList[i].code
                    });
                }
            }
        });
        const rgregionServiceObj = this.ociscataFactory.
            rgRegionRecordGroup();
        rgregionServiceObj.subscribe(rgregionList => {
            if (rgregionList.length === 0) {
                this.rgregionRg = [];
            } else {
                for (let i = 0; i < rgregionList.length; i++) {
                    this.rgregionRg.push({
                        'text': rgregionList[i].code + ' - ' +
                            rgregionList[i].description, 'id': rgregionList[i].code
                    });
                }
            }
        });
        /* const rgservicesServiceObj = this.ociscataFactory.rgServicesRecordGroup('NONE');
         rgservicesServiceObj.subscribe(rgservicesList => {
             if (rgservicesList.length === 0) {
                 this.rgservicesRg = [];
             } else {
                 for (let i = 0; i < rgservicesList.length; i++) {
                     this.rgservicesRg.push({
                         'text': rgservicesList[i].code + ' - ' +
                             rgservicesList[i].description, 'id': rgservicesList[i].code
                     });
                 }
             }
         });*/
        /* const rgcsldcodeServiceObj = this.ociscataFactory.
             rgCsldCodeRecordGroup();
         rgcsldcodeServiceObj.subscribe(rgcsldcodeList => {
             if (rgcsldcodeList.length === 0) {
                 this.rgcsldcodeRg = [];
             } else {
                 for (let i = 0; i < rgcsldcodeList.length; i++) {
                     this.rgcsldcodeRg.push({
                         'text': rgcsldcodeList[i].code + ' - ' +
                             rgcsldcodeList[i].description, 'id': rgcsldcodeList[i].code
                     });
                 }
             }
         });*/
        const rgteamagylocsServiceObj = this.ociscataFactory.
            rgTeamAgyLocsRecordGroup();
        rgteamagylocsServiceObj.subscribe(rgteamagylocsList => {
            if (rgteamagylocsList.length === 0) {
                this.rgteamagylocsRg = [];
            } else {
                for (let i = 0; i < rgteamagylocsList.length; i++) {
                    this.rgteamagylocsRg.push({
                        'text': rgteamagylocsList[i].code + ' - ' +
                            rgteamagylocsList[i].description, 'id': rgteamagylocsList[i].code
                    });
                }
            }
        });
        const rgcorplocsServiceObj = this.ociscataFactory.
            rgCorpLocsRecordGroup(this.strNoValue);
        rgcorplocsServiceObj.subscribe(rgcorplocsList => {
            if (rgcorplocsList.length === 0) {
                this.rgcorplocsRg = [];
            } else {
                for (let i = 0; i < rgcorplocsList.length; i++) {
                    this.rgcorplocsRg.push({
                        'text': rgcorplocsList[i].code + ' - ' +
                            rgcorplocsList[i].description, 'id': rgcorplocsList[i].code
                    });
                }
            }
        });
        const rgagylocsServiceObj = this.ociscataFactory.
            rgAgyLocsRecordGroup();
        rgagylocsServiceObj.subscribe(rgagylocsList => {
            if (rgagylocsList.length === 0) {
                this.rgagylocsRg = [];
            } else {
                for (let i = 0; i < rgagylocsList.length; i++) {
                    this.rgagylocsRg.push({
                        'text': rgagylocsList[i].code + ' - ' +
                            rgagylocsList[i].description, 'id': rgagylocsList[i].code
                    });
                }
            }
        });
        const rgteamunpaidwkServiceObj = this.ociscataFactory.
            rgTeamUnpaidWkRecordGroup();
        rgteamunpaidwkServiceObj.subscribe(rgteamunpaidwkList => {
            if (rgteamunpaidwkList.length === 0) {
                this.rgteamunpaidwkRg = [];
            } else {
                for (let i = 0; i < rgteamunpaidwkList.length; i++) {
                    this.rgteamunpaidwkRg.push({
                        'text': rgteamunpaidwkList[i].code + ' - ' +
                            rgteamunpaidwkList[i].description, 'id': rgteamunpaidwkList[i].code
                    });
                }
            }
        });
        const rgproviderdttoServiceObj = this.ociscataFactory.
            rgProviderDttoRecordGroup();
        rgproviderdttoServiceObj.subscribe(rgproviderdttoList => {
            if (rgproviderdttoList.length === 0) {
                this.rgproviderdttoRg = [];
            } else {
                for (let i = 0; i < rgproviderdttoList.length; i++) {
                    this.rgproviderdttoRg.push({
                        'text': rgproviderdttoList[i].code + ' - ' +
                            rgproviderdttoList[i].description, 'id': rgproviderdttoList[i].code
                    });
                }
            }
        });
        const rgteamacpServiceObj = this.ociscataFactory.
            rgTeamAcpRecordGroup();
        rgteamacpServiceObj.subscribe(rgteamacpList => {
            if (rgteamacpList.length === 0) {
                this.rgteamacpRg = [];
            } else {
                for (let i = 0; i < rgteamacpList.length; i++) {
                    this.rgteamacpRg.push({
                        'text': rgteamacpList[i].code + ' - ' +
                            rgteamacpList[i].description, 'id': rgteamacpList[i].code
                    });
                }
            }
        });
        const rgacpproviderinstServiceObj = this.ociscataFactory.
            rgAcpProviderInstRecordGroup(this.caseloadId);
        rgacpproviderinstServiceObj.subscribe(rgacpproviderinstList => {
            if (rgacpproviderinstList.length === 0) {
                this.rgacpproviderinstRg = [];
            } else {
                for (let i = 0; i < rgacpproviderinstList.length; i++) {
                    this.rgacpproviderinstRg.push({
                        'text': rgacpproviderinstList[i].code + ' - ' +
                            rgacpproviderinstList[i].description, 'id': rgacpproviderinstList[i].code
                    });
                }
            }
        });

        this.callingForm = undefined;
        if (this.router.url === '/OCDUPROJ') {
            this.callingForm = 'OCDUPROJ';
            this.categoryFlag = true;

        }
        this.appbarService.manageIcon(true);
    }
    ngAfterViewInit() {
        if (this.dialogData) {
            const rgservicesServiceObj = this.ociscataFactory.rgServicesRecordGroup(this.dialogData.eventType);
            rgservicesServiceObj.subscribe(rgservicesList => {
                if (rgservicesList.length === 0) {
                    this.rgservicesRg = [];
                } else {
                    for (let i = 0; i < rgservicesList.length; i++) {
                        this.rgservicesRg.push({
                            'id': rgservicesList[i].seqValue, 'text': rgservicesList[i].code
                        });
                    }
                    if (this.rgservicesRg.length > 0) {
                        for (let j = 0; j < this.rgservicesRg.length; j++) {
                            if (this.rgservicesRg[j].id === this.dialogData.programId) {
                                {
                                    this.service = this.rgservicesRg[j].text;
                                }
                            }
                        }
                    }
                }
            });
            this.category = this.dialogData.eventType;
            this.environment = this.sessionManager.currentCaseLoadType;
            this.pProgramId = this.dialogData.programId;
            this.pCategory = this.dialogData.eventType;
            this.pOperation = this.dialogData.statusDesc;
            this.serviceDescription = this.dialogData.description;
            this.pOperationTemp = this.dialogData.pOperation;
            this.setUpDefaults();
            this.exitFlag = false;
        }
        this.appbarService.manageIcon(true);
    }
    canServicesEdit = (data: any, index: number, field: string): boolean => {
        if (field !== 'nbtSelect') {
            this.show(this.translateService.translate('common.fieldisprotectedagainstupdated'), 'warn');
            return false;
        }
        return true;
    }
    onButSearchclick() {
    }
    onButAssignPrograms() {
        var count = 0;
        this.vcrsactModelTempData = [];
        this.vcrsactData.forEach(e => {
            if (e.nbtSelect) {
                this.vcrsactModel = e;
                this.vcrsactModelTempData[count] = e;
                count = count + 1;
            }
        });
        if (this.pCategory && (this.pCategory === 'UW' || this.pCategory === 'DRR' || this.pCategory === 'PWS' || this.pCategory === 'WR')) {
            this.populateSelectedService();
        } else if (this.pCategory && (this.pCategory === 'ACP' || this.pCategory === 'WR')) {
            this.populateAcpSelectedServices();
            if (this.pCategory === 'ACP' && (this.sessionManager.currentCaseLoadType === 'COMM' || this.sessionManager.currentCaseLoad === 'CC') && (this.dialogData.moduleName === 'OCDPROGR' || this.dialogData.moduleName === 'OIDPWAIT')) {
                this.conflictData.prgServiceList = this.vcrsactData.filter(e => e.nbtSelect);
                if (this.conflictData.prgServiceList && this.conflictData.prgServiceList.length == 0) {
                    return;
                }
                if (this.pCategory === 'ACP' && this.sessionManager.currentCaseLoadType === 'COMM' && this.dialogData.moduleName === 'OIDPWAIT') {
                    if (this.conflictData.prgServiceList.length > 1) {
                        this.show(this.translateService.translate('ociscata.youcanallocateonly'), 'warn');
                        return;
                    }
                }
                this.conflictData.offenderList = this.dialogData.bulkAssignData;
                this.vOffPrgOblDataTemp = this.dialogData.bulkAssignData;
                const conflictObj = this.ociscataFactory.checkNonAssociationConflictWithAllocatedOffenders(this.conflictData);
                conflictObj.subscribe(data => {
                    if (data && data.length > 0) {
                        this.conflictPopUp(data, 0, 0);
                    } else {
                        this.ocussessPopUp();
                    }
                });
            }
            else if (this.pCategory === 'ACP' && this.sessionManager.currentCaseLoadType === 'INST' && this.dialogData.moduleName === 'OIDPWAIT') {
                this.conflictData.prgServiceList = this.vcrsactData.filter(e => e.nbtSelect);
                if (this.conflictData.prgServiceList && this.conflictData.prgServiceList.length == 0) {
                    return;
                }
                if (this.conflictData.prgServiceList.length > 1) {
                    this.show(this.translateService.translate('ociscata.youcanallocateonly'), 'warn');
                    return;
                }
                this.conflictData.offenderList = this.dialogData.bulkAssignData;
                this.vOffPrgOblDataTemp = this.dialogData.bulkAssignData;
                const conflictObj = this.ociscataFactory.checkNonAssociationConflictWithAllocatedOffendersByIndAndGang(this.conflictData);
                conflictObj.subscribe(data => {
                    if (data) {
                        this.externalNonAssocationByIngAndGangNew(data.offenderList, 0, 0)
                    } else {
                        this.ocussessPopUp();
                    }
                });
            }
            else if (this.pCategory === 'ACP' && this.sessionManager.currentCaseLoadType === 'INST' && this.dialogData.moduleName === 'OCDPROGR') {
                this.conflictData.prgServiceList = this.vcrsactData.filter(e => e.nbtSelect);
                if (this.conflictData.prgServiceList && this.conflictData.prgServiceList.length == 0) {
                    return;
                }
                this.conflictData.offenderList = this.dialogData.bulkAssignData;
                this.vOffPrgOblDataTemp = this.dialogData.bulkAssignData;
                const conflictObj = this.ociscataFactory.checkNonAssociationConflictWithAllocatedOffendersByIndAndGang(this.conflictData);
                conflictObj.subscribe(data => {
                    if (data) {
                        this.externalNonAssocationByIngAndGangAssign(data);
                    } else {
                        this.ocussessPopUp();
                    }
                });
            }
        } else {
            this.assignRecord.emit(this.vcrsactModelTempData);
        }
        this.appbarService.manageIcon(true);

    }

    externalNonAssocationByIngAndGangNew(event, x, y) {
        let i = x;
        let j = y;
        if (i == event.length && this.vOffPrgOblDataTemp && this.vOffPrgOblDataTemp.length != 0) {
            this.ocussessPopUp();
        }
        if (i == j && i < event.length) {
            if (!event[i].nonAssocationByIngAndGang || event[i].nonAssocationByIngAndGang === 'EMPTYDATA') {
                j++;
                i++;
                this.externalNonAssocationByIngAndGangNew(event, i, j);
            } else {
                let msgOne = this.translateService.translate('ociscata.program');
                let msgTwo = this.translateService.translate('ociscata.indinonassocconflict');
                let msgThree = this.translateService.translate('ociscata.gangnonassocconflict');
               // event[i].nonAssocationByIngAndGang = event[i].nonAssocationByIngAndGang.replaceAll('ociscata.program', msgOne);
                event[i].nonAssocationByIngAndGang = 'Offender ' + event[i].offenderName + ' (PID: ' + event[i].offenderIdDisplay + ') ' + msgOne + '\n\n' + event[i].nonAssocationByIngAndGang;
                event[i].nonAssocationByIngAndGang = event[i].nonAssocationByIngAndGang.replaceAll('ociscata.indinonassocconflict', msgTwo);
                event[i].nonAssocationByIngAndGang = event[i].nonAssocationByIngAndGang.replaceAll('ociscata.gangnonassocconflict', msgThree);
                const data = {
                    label: this.translateService.translate(event[i].nonAssocationByIngAndGang) +'\n\n'+'Do you want to proceed?', yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
                    proceedBtnDisabled: true
                };
                j++;
               this.firstPopup(event,data,i,j);
               
            }
        }
    }
    firstPopup(event, data, i, j) {
        this.dialogService.openLinkDialog('/OCUNAWRN', data, 30).subscribe(result => {
            if (result) {
                i++;
                if (i < event.length) {
                    this.externalNonAssocationByIngAndGangNew(event, i, j);
                } else {
                    this.externalNonAssocationByIngAndGangNew(event, i, j);
                }
            } else {
                this.secondPopup(event, data, i, j);

            }
        });
    }
    secondPopup(event, data, i, j) {
        const offDetails = {
            label: 'This action will un-select ' + event[i].lastName + ',' + event[i].firstName + ' ' + '(ID: ' + event[i].offenderIdDisplay + '), ' + this.translateService.translate('ociscata.removeFromList')+'\n\n'+'Do you want to proceed?'
            , yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', offDetails, 50).subscribe(results => {
            if (results) {
                this.vOffPrgOblDataTemp = this.vOffPrgOblDataTemp.filter((element) => (element.offenderBookId != event[i].offenderBookId));
                i++;
                this.externalNonAssocationByIngAndGangNew(event, i, j);
            }
            else {
                this.firstPopup(event, data, i, j);
            }
        });

    }
    populateAcpSelectedServices() {
        this.selectedProgramCategory = [];
        if (this.vcrsactData && this.vcrsactData.length > 0) {
            let inCount = 0;
            for (let i = 0; i < this.vcrsactData.length; i++) {
                if (this.vcrsactData[i].nbtSelect) {
                    if (!this.vcrsactData[i].activeFlag) {
                        this.show(this.translateService.translate('ociscata.pleaseselecttheactiveflag'), 'warn');
                        return false;
                    }
                    inCount = inCount + 1;
                }
            }
            if (inCount === 0) {
                this.show(this.translateService.translate('ociscata.pleaseselectoneservice'), 'warn');
                return false;
            }
            for (let i = 0; i < this.vcrsactData.length; i++) {
                if (this.vcrsactData[i].nbtSelect) {
                    if (this.pCategory !== 'ACP') {
                        if (inCount > 1) {
                            if (this.vcrsactData[i].scheduleStartDate) {
                                if (this.vcrsactData[i].scheduleStartDate) {
                                    if (DateFormat.compareDate(DateFormat.getDate(this.vcrsactData[i].scheduleStartDate),
                                        DateFormat.getDate()) < 0) {
                                        this.show(this.translateService.translate('ociscata.pleaseselectstartdate'), 'warn');
                                        return false;
                                    }
                                }
                            }
                        } else if (inCount === 1 && this.pOnlyFutureDate && this.pOnlyFutureDate === 'Y') {
                            if (this.vcrsactData[i].scheduleStartDate) {
                                if (DateFormat.compareDate(DateFormat.getDate(this.vcrsactData[i].scheduleStartDate),
                                    DateFormat.getDate()) < 0) {
                                    this.show(this.translateService.translate('ociscata.pleaseselectstartdate'), 'warn');
                                    return false;
                                }
                            }
                        }
                    }
                    this.selectedProgramCategory.push(this.vcrsactData[i]);
                }
            }
            if (this.router.url === '/OCDPROGR') {
                this.router.navigate(['/OCDPROGR']);
                return;
            }
            if (this.router.url === '/OIDPWAIT') {
                this.router.navigate(['/OIDPWAIT']);
                return;
            }
            this.ocdxprogFactory.vcrsactData = this.selectedProgramCategory;
            this.router.navigate(['/OCDXPROG']);
            this.router.navigate(['/OIDOWREL']);
        }
    }
    populateSelectedService() {
        this.selectedProgramCategory = [];
        if (this.vcrsactData && this.vcrsactData.length > 0) {
            let inCount = 0;
            for (let i = 0; i < this.vcrsactData.length; i++) {
                if (this.vcrsactData[i].nbtSelect) {
                    if (!this.vcrsactData[i].activeFlag) {
                        this.show(this.translateService.translate('ociscata.pleaseselecttheactiveflag'), 'warn');
                        return false;
                    }
                    inCount = inCount + 1;
                    this.selectedProgramCategory.push(this.vcrsactData[i]);
                }
            }
            if (inCount > 1) {
                this.show(this.translateService.translate('ociscata.youcanallocateonly'), 'warn');
                return false;
            } else if (inCount === 0) {
                this.show(this.translateService.translate('ociscata.pleaseselectoneservice'), 'warn');
                return false;
            }
            if (this.pCategory === 'UW' && this.dialogData.moduleName === 'OCDUPROJ' && this.sessionManager.currentCaseLoadType === 'COMM') {
                this.projallocCommitModel.insertList = [];
                this.vcrsactModelTempData.forEach(e => {
                    this.projallocModel = new OffenderProgramProfiles();
                    this.projallocModel.offenderBookId = this.dialogData.offenderBookId;
                    this.projallocModel.crsActyId = e.crsActyId;
                    this.projallocCommitModel.insertList.push(this.projallocModel);
                });
                this.ocduprojFactory.checkingNonAssociation(this.projallocCommitModel).subscribe(data => {
                    if (data && data != 'EMPTYDATA') {
                        data = data.replaceAll('ocduproj.programnonassciationmessage', this.translateService.translate('ocduproj.programnonassciationmessage')+' '+this.dialogData.offenderName+".");
                        data = data.replaceAll('ocduproj.doyouwanttocontinue', this.translateService.translate('ocduproj.doyouwanttocontinue'));
                        data = data.replaceAll('ocuoscpv.weeklydefinition', this.translateService.translate('ocuoscpv.weeklydefinition'));
                        data = data.replaceAll('ocuoscpv.offenderschedules', this.translateService.translate('ocuoscpv.offenderschedules'));
                        data = data.replaceAll('ocduproj.schedulesnotfound', this.translateService.translate('ocduproj.schedulesnotfound'));

                        const data1 = {
                            label: this.translateService.translate(data), yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data1, 50).subscribe(result => {
                            if (result) {
                                this.emitServiceRecords();
                            } else {
                                return;
                            }
                        });
                    } else {
                        this.emitServiceRecords();
                    }
                });
            } else if (this.pCategory === 'PWS' && this.dialogData.moduleName === 'OCDXPROG') {
                this.projallocCommitModel.insertList = [];
                this.vcrsactModelTempData.forEach(e => {
                    this.projallocModel = new OffenderProgramProfiles();
                    this.projallocModel.offenderBookId = this.dialogData.offenderBookId;
                    this.projallocModel.crsActyId = e.crsActyId;
                    this.projallocCommitModel.insertList.push(this.projallocModel);
                });
                this.ociscataFactory.checkNonAssociationsOcdxprog(this.projallocCommitModel).subscribe(data => {
                    if (data && data !== 'EMPTYDATA') {
                        const msgOne = this.translateService.translate('ociscata.offender');
                        const msgTwo = this.translateService.translate('ociscata.hasNonAssociation');
                        let msgThree = this.translateService.translate('ociscata.doyouwanttoproceed');
                        const msgFour = this.translateService.translate('ociscata.indinonassocconflict');
                        const msgFive = this.translateService.translate('ociscata.gangnonassocconflict');
                        data = data.replaceAll('ociscata.offender', msgOne);
                        data = data.replaceAll('ociscata.hasNonAssociation', msgTwo);
                        data = data.replaceAll('ociscata.doyouwanttoproceed', msgThree);
                        data = data.replaceAll('ociscata.indinonassocconflict', msgFour);
                        data = data.replaceAll('ociscata.gangnonassocconflict', msgFive);
                        const labelMsg = {
                            label: this.translateService.translate(data), yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', labelMsg, 50).subscribe(result => {
                            if (result) {
                                this.emitServiceRecords();
                            } else {
                                return;
                            }
                        });
                    } else {
                        this.emitServiceRecords();
                    }
                });
            } else if (this.pCategory === 'WR' && this.dialogData.moduleName === 'OIDOWREL') {
                this.projallocCommitModel.insertList = [];
                this.vcrsactModelTempData.forEach(e => {
                    this.projallocModel = new OffenderProgramProfiles();
                    this.projallocModel.offenderBookId = this.dialogData.offenderBookId;
                    this.projallocModel.crsActyId = e.crsActyId;
                    this.projallocCommitModel.insertList.push(this.projallocModel);
                });
                this.ociscataFactory.checkNonAssociationsWorkRl(this.projallocCommitModel).subscribe(data => {
                    if (data && data !== 'EMPTYDATA') {
                        const msgOne = this.translateService.translate('ociscata.offender');
                        const msgTwo = this.translateService.translate('ociscata.hasNonAssociation');
                        let msgThree = this.translateService.translate('ociscata.doyouwanttoproceed');
                        data = data.replaceAll('ociscata.offender', msgOne);
                        data = data.replaceAll('ociscata.hasNonAssociation', msgTwo);
                        data = data.replaceAll('ociscata.doyouwanttoproceed', msgThree);
                        const labelMsg = {
                            label: this.translateService.translate(data), yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', labelMsg, 50).subscribe(result => {
                            if (result) {
                                this.emitServiceRecords();
                            } else {
                                return;
                            }
                        });
                    } else {
                        this.emitServiceRecords();
                    }
                });
            }
            else {
                this.emitServiceRecords();
            }

        }
    }

    emitServiceRecords() {
        if (this.router.url === '/OIDOWREL') {
            this.assignRecord.emit(this.vcrsactModelTempData);
        } else {
            if (this.router.url !== '/OCDPROGR') {
                this.assignRecord.emit(this.vcrsactModelTempData);
            }
            if (this.router.url !== '/OIDPWAIT') {
                this.assignRecord.emit(this.vcrsactModelTempData);
            }
            if (this.router.url !== '/OCDUPROJ') {
                this.ocdxprogFactory.vcrsactData = this.selectedProgramCategory;
                this.router.navigate(['/OCDXPROG']);
                this.assignRecord.emit(this.vcrsactModelTempData);
            } else {
                this.assignRecord.emit(this.vcrsactModelTempData);
            }
        }
    }

    setUpDefaults() {
        this.listSeq = 1;
        const defaultVal = this.ociscataFactory.setupDefaults(this.listSeq);
        defaultVal.subscribe(val => {
            this.lvProviderType = val;
            if (this.pOperation === 'ALLOCATE') {
                const caseloadType = this.ociscataFactory.getDescCode('CSLD_CODE', this.globalCaseloadType);
                caseloadType.subscribe(val3 => {
                    this.caseloadDesc = val3;
                    this.nbtProgramCategory = this.pCategory;
                    this.category = this.pCategory;
                    this.fromCategoryToSetService = true;
                    if (this.pCategory === 'DRR' || this.pCategory === 'WR'
                        || this.pCategory === 'WRDP' || this.pCategory === 'UW') {
                        this.providerTypeDesc = 'EXT';
                    } else if (this.pCategory === 'INST_ACT') {
                        this.providerTypeDesc = 'INT';
                    } else {
                        this.providerTypeDesc = this.lvProviderType;
                    }
                    this.categoryFlag = true;
                    this.serviceFlag = true;
                });
            } else {
                // this.categoryFlag = true;
                this.categoryFlag = false;
                this.serviceFlag = false;
            }
        });
        this.environment = this.globalCaseloadType;
        if (this.pCategory === 'UW') {
            if (this.rgproviderNameRg && this.rgproviderNameRg.length > 0) {
                if (this.rgproviderNameRg.length === 1) {
                    this.defaultCommAgyLocDesc = this.rgproviderNameRg[0].description;
                    this.defaultCommAgyLocId = this.rgproviderNameRg[0].code;
                }
            }
        } else if (this.pCategory === 'DRR') {
            if (this.rgproviderNameRg && this.rgproviderNameRg.length > 0) {
                if (this.rgproviderNameRg.length === 1) {
                    this.defaultCommAgyLocDesc = this.rgproviderNameRg[0].description;
                    this.defaultCommAgyLocId = this.rgproviderNameRg[0].code;
                }
            }
        } else if (this.pCategory === 'ACP') {
            if (this.rgproviderNameRg && this.rgproviderNameRg.length > 0) {
                if (this.rgproviderNameRg.length === 1) {
                    this.defaultCommAgyLocDesc = this.rgproviderNameRg[0].description;
                    this.defaultCommAgyLocId = this.rgproviderNameRg[0].code;
                }
            }
        } else {
            this.defaultCommAgyLocDesc = this.globalDefaultCommAgyLocDesc;
            this.defaultCommAgyLocId = this.globalDefaultCommAgyLocId;
        }
        if (this.globalCaseloadType === 'INST') {
            if (this.pCategory === 'ACP') {
                this.providerNameLink = 'ociscata/rgAcpProviderInstRecordGroup?caseloadId=' + this.caseloadId;
                this.providerNameLinkURL();
            } else {
                this.nbtProviderId = this.defaultAgyLocId;
                this.nbtProgramCategory = this.pCategory;
                this.nbtAgyLocId = this.defaultAgyLocId;
                this.providerNameLink = 'ociscata/rgAgyLocsRecordGroup';
                this.providerNameLinkURL();
            }
        } else {
            if (this.pCategory === 'UW') {
                this.providerNameLink = 'ociscata/rgTeamUnpaidWkRecordGroup';
                this.providerNameLinkURL();
            } else if (this.pCategory === 'DRR') {
                this.providerNameLink = 'ociscata/rgProviderDttoRecordGroup';
                this.providerNameLinkURL();
            } else if (this.pCategory === 'ACP') {
                this.providerNameLink = 'ociscata/rgTeamAcpRecordGroup';
                this.providerNameLinkURL();
            } else {
                this.providerNameLink = 'ociscata/rgAgyLocsRecordGroup';
                this.providerNameLinkURL();
            }
            this.nbtProviderId = this.globalDefaultCommAgyLocId;
            this.nbtAgyLocId = this.defaultAgyLocId;
        }
    }

    onButAdvSearchclick = () => {
        if (!this.environment) {
            this.show(this.translateService.translate('ociscata.environmentmustbeentered'), 'warn');
            return false;
        }
        if (!this.category) {
            this.show(this.translateService.translate('ociscata.categorymustbeentered'), 'warn');
            return false;
        }
        return true;
    }

    setAdvanceSearchFlag(event) {
        this.vcrsactData = [];
        if (event) {
            if (event.advanceSearch) {
                this.advanceSearch = event.advanceSearch;
            } else if (event.advanceSearch !== undefined && !event.advanceSearch) {
                this.advanceSearch = event.advanceSearch;
            } else {
                this.advanceSearch = event;
            }
            if (this.ociscataFactory.vCourseActivities) {
                if (this.ociscataFactory.vCourseActivities.nbtGender ||
                    this.ociscataFactory.vCourseActivities.nbtRace ||
                    this.ociscataFactory.vCourseActivities.nbtAge ||
                    this.ociscataFactory.vCourseActivities.nbtFacility ||
                    this.ociscataFactory.vCourseActivities.nbtInclude ||
                    this.ociscataFactory.vCourseActivities.nbtExclude ||
                    this.ociscataFactory.vCourseActivities.nbtStatus) {
                    this.vcrsactModel = new VCourseActivities();

                    if (this.ociscataFactory.vCourseActivities.nbtGender) {
                        this.vcrsactModel.nbtGender = this.ociscataFactory.vCourseActivities.nbtGender;
                    }
                    if (this.ociscataFactory.vCourseActivities.nbtRace) {
                        this.vcrsactModel.nbtRace = this.ociscataFactory.vCourseActivities.nbtRace;
                    }
                    if (this.ociscataFactory.vCourseActivities.nbtAge) {
                        this.vcrsactModel.nbtAge = this.ociscataFactory.vCourseActivities.nbtAge;
                    }
                    if (this.ociscataFactory.vCourseActivities.nbtFacility) {
                        this.vcrsactModel.nbtFacility = this.ociscataFactory.vCourseActivities.nbtFacility;
                    }
                    if (this.ociscataFactory.vCourseActivities.nbtInclude) {
                        this.vcrsactModel.nbtInclude = this.ociscataFactory.vCourseActivities.nbtInclude;
                    }
                    if (this.ociscataFactory.vCourseActivities.nbtExclude) {
                        this.vcrsactModel.nbtExclude = this.ociscataFactory.vCourseActivities.nbtExclude;
                    }
                    if (this.ociscataFactory.vCourseActivities.nbtStatus) {
                        this.vcrsactModel.nbtStatus = this.ociscataFactory.vCourseActivities.nbtStatus;
                    }
                    this.vcrsactModel.nbtAdvSearch = 'Y';

                    if (this.callingForm) {
                        this.vcrsactModel.nbtCallingForm = this.callingForm;
                    }
                    this.fromAdvBlock = true;

                }
            }
        }
    }

    onRowClickvcrsact(event) {
    }
    allowNumbers(event) {
    }
    onButOcmschprClick() {
        if (!this.environment) {
            this.show(this.translateService.translate('ociscata.environmentmustbeentered'), 'warn');
            return false;
        }
        if (!this.category) {
            this.show(this.translateService.translate('ociscata.categorymustbeentered'), 'warn');
            return false;
        }
        if (!this.vcrsactModel.programServicesDesc) {
            return false;
        }
        this.dialogService.openLinkDialog('/OCMSCHPR', this.vcrsactModel, 100).subscribe(resData => {

        });
    }
    onButOcmssvctclick() {
    }
    onButOcupaoffclick() {
        if (!this.environment) {
            this.show(this.translateService.translate('ociscata.environmentmustbeentered'), 'warn');
            return false;
        }
        if (!this.category) {
            this.show(this.translateService.translate('ociscata.categorymustbeentered'), 'warn');
            return false;
        }
    }
    clearServices() {
        //this.serviceLink = 'ociscata/rgServicesRecordGroup?category=' + this.strNoValue;
        /*const rgservicesServiceObj = this.ociscataFactory.rgServicesRecordGroup(this.strNoValue);
        rgservicesServiceObj.subscribe(rgservicesList => {
            if (rgservicesList.length === 0) {
                this.rgservicesRg = [];
            } else {
                for (let i = 0; i < rgservicesList.length; i++) {
                    this.rgservicesRg.push({
                        'text': rgservicesList[i].code + ' - ' +
                            rgservicesList[i].description, 'id': rgservicesList[i].code
                    });
                }
            }
        });*/
        this.environment = undefined;
        if (!this.dialogData && this.pOperationTemp != 'ALLOCATE') {
            this.category = undefined;
            this.service = undefined;
        }
        this.region = undefined;
        this.area = undefined;
        this.providerName = undefined;
        this.assignFlag = true;
        this.constantDisabled = true;
        this.alloOffDisabled = true;
        this.namesReadOnly = false;
        this.searchDisable = false;
        this.clearDisable = true;
        this.areaReadOnly = true;
        this.vcrsactModel = new VCourseActivities();
        if (this.advanceSearch) {
            this.ociscataFactory.vCourseActivities.nbtAdvSearch = 'N';
        }
        this.advanceSearch = false;
        this.listSeq = 1;
        const defaultVal = this.ociscataFactory.setupDefaults(this.listSeq);
        defaultVal.subscribe(val => {
            this.providerTypeDesc = val;

        });
        this.fromAdvBlock = false;
        this.vcrsactData = [];
        if (this.dialogData) {
            this.serviceFlag = true;
            this.categoryFlag = true;
        } else {
            this.serviceFlag = false;
            this.categoryFlag = false;
            this.programId = undefined;
            this.pOperation = undefined;
            this.pCategory = undefined;
        }

    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    /**
     * event is fired when change the value of Provider Type value in LOV.
     * @param event
     */
    changeTheValueOfProviderType(event) {
        if (event) {
            this.providerName = undefined;
            this.nbtProviderId = undefined;
            this.agyLocId = undefined;
            if (this.providerTypeDesc === 'INT') {
                this.providerNameDisabled = false;
                if (this.globalCaseloadType === 'INST') {
                    this.providerSource = 'OUMAGLOC';
                    this.providerNameLink = 'ociscata/rgAgyLocsRecordGroup';
                    this.providerNameLinkURL();
                } else {
                    if (this.categoryTemp === 'UW') {
                        this.providerNameLink = 'ociscata/rgTeamUnpaidWkRecordGroup';
                        this.providerNameLinkURL();
                    } else if (this.categoryTemp === 'DRR') {
                        this.providerNameLink = 'ociscata/rgProviderDttoRecordGroup';
                        this.providerNameLinkURL();
                    } else {
                        if (this.categoryTemp) {
                            this.providerSource = 'OCMTEAMMAIN';
                            this.providerNameLink = 'ociscata/rgTeamAgyLocsRecordGroup';
                            this.providerNameLinkURL();
                        }
                    }
                }
            } else {
                this.providerSource = 'OUMAGENC';
                this.providerNameLink = 'ociscata/rgCorpLocsRecordGroup?category=' + this.categoryTemp;
                const rgagylocsServiceObj = this.ociscataFactory.rgCorpLocsRecordGroup(this.categoryTemp);
                rgagylocsServiceObj.subscribe(rgagylocsList => {
                    if (rgagylocsList.length === 0) {
                        this.rgproviderNameRg = [];
                        this.providerNameDisabled = true;
                    } else {
                        this.providerNameDisabled = false;
                        for (let i = 0; i < rgagylocsList.length; i++) {
                            this.rgproviderNameRg.push({
                                'text': rgagylocsList[i].code + ' - ' +
                                    rgagylocsList[i].description, 'id': rgagylocsList[i].code
                            });
                        }
                    }
                });
            }
        }

    }
    /**
     * event is fired when change the value of Environment value in LOV.
     * @param event
     */
    changeTheValueOfEnvironment(event) {
        if (this.region) {
            this.strRegionAndEnv = this.region;
        } else {
            this.strRegionAndEnv = this.strNoValue;
        }
        if (event) {
            this.environmentTemp = event.code;
            this.areaLink = 'ociscata/rgAreasRecordGroup?environment=' + this.environmentTemp + '&region=' + this.strRegionAndEnv;
            /* const rgareasServiceObj = this.ociscataFactory.rgAreasRecordGroup(this.environmentTemp, this.strRegionAndEnv);
             rgareasServiceObj.subscribe(rgareasList => {
                 if (rgareasList.length === 0) {
                     this.rgareasRg = [];
                 } else {
                     for (let i = 0; i < rgareasList.length; i++) {
                         this.rgareasRg.push({
                             'text': rgareasList[i].code + ' - ' +
                                 rgareasList[i].description, 'id': rgareasList[i].code
                         });
                     }
                 }
             });*/
            this.providerName = undefined;
            this.nbtProviderId = undefined;
            this.agyLocId = undefined;
            this.area = undefined;
            this.nbtAreaCode = undefined;
            if (event.code === 'INST') {
                if (!this.providerName) {
                    this.nbtProviderId = this.defaultAgyLocId;
                    this.nbtAgyLocId = this.defaultAgyLocId;
                }
            } else if (event.code === 'COMM') {
                this.nbtProviderId = this.globalDefaultCommAgyLocId;
            }
            this.providerNameLink = undefined;
            if (this.providerTypeDesc === 'INT') {
                this.providerNameDisabled = false;
                if (event.code === 'INST') {
                    this.providerSource = 'OUMAGLOC';
                    this.providerNameLink = 'ociscata/rgAgyLocsRecordGroup';
                    this.providerNameLinkURL();
                } else {
                    if (this.categoryTemp === 'UW') {
                        this.providerNameLink = 'ociscata/rgTeamUnpaidWkRecordGroup';
                        this.providerNameLinkURL();
                    } else if (this.categoryTemp === 'DRR') {
                        this.providerNameLink = 'ociscata/rgProviderDttoRecordGroup';
                        this.providerNameLinkURL();
                    } else {
                        this.providerSource = 'OCMTEAMMAIN';
                        this.providerNameLink = 'ociscata/rgTeamAgyLocsRecordGroup';
                        this.providerNameLinkURL();
                    }
                }
            } else {
                this.providerNameLink = 'ociscata/rgCorpLocsRecordGroup?category=' + this.categoryTemp;
                const rgagylocsServiceObj = this.ociscataFactory.rgCorpLocsRecordGroup(this.categoryTemp);
                rgagylocsServiceObj.subscribe(rgagylocsList => {
                    if (rgagylocsList.length === 0) {
                        this.rgproviderNameRg = [];
                        this.providerNameDisabled = true;
                    } else {
                        this.providerNameDisabled = false;
                        for (let i = 0; i < rgagylocsList.length; i++) {
                            this.rgproviderNameRg.push({
                                'text': rgagylocsList[i].code + ' - ' +
                                    rgagylocsList[i].description, 'id': rgagylocsList[i].code
                            });
                        }
                    }
                });
            }
        } else {
            this.providerNameLink = undefined;
            this.areaLink = 'ociscata/rgAreasRecordGroup?environment=' + this.strNoValue + '&region=' + this.strRegionAndEnv;
            /* const rgareasServiceObj = this.ociscataFactory.rgAreasRecordGroup(this.strNoValue, this.strRegionAndEnv);
             rgareasServiceObj.subscribe(rgareasList => {
                 if (rgareasList.length === 0) {
                     this.rgareasRg = [];
                 } else {
                     for (let i = 0; i < rgareasList.length; i++) {
                         this.rgareasRg.push({
                             'text': rgareasList[i].code + ' - ' +
                                 rgareasList[i].description, 'id': rgareasList[i].code
                         });
                     }
                 }
             });*/
        }
    }
    /**
     * event is fired when change the value of Provider Name value in LOV.
     * @param event
     */
    changeTheValueOfProviderName(event) {
        if (event) {
            this.categoryNameBlockEntered = false;
            this.providerName = event.code;
            this.agyLocId = undefined;
            this.agyLocId = 'N';
        } else {
            this.nbtProviderId = undefined;
            this.nbtAgyLocId = undefined;
        }
    }

    onLocMouseDown() {
        if (this.rgservicesRg.length === 0) {
            this.show(this.translateService.translate('ociscata.listofvaluescontains'), 'warn');
            return false;
        }

    }
    onAreaLocMouseDown(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                this.show(this.translateService.translate('ociscata.listofvaluescontains'), 'warn');
                return false;
            }
        }
        /* if (this.rgareasRg.length === 0) {
             this.show(this.translateService.translate('ociscata.listofvaluescontains'), 'warn');
             return false;
         }*/
    }

    onExitOciscata() {
        this.assignRecord.emit(null);
        this.appbarService.manageIcon(true);
    }

    /**
     * event is fired when change the value of category value in LOV.
     * @param event
     */
    changeTheValueOfCategory(event) {
        if (event) {
            this.categoryTemp = event.code;
            this.serviceLink = 'ociscata/rgServicesRecordGroup?category=' + event.code;
            /*const rgservicesServiceObj = this.ociscataFactory.rgServicesRecordGroup(event.code);
            rgservicesServiceObj.subscribe(rgservicesList => {
                if (rgservicesList.length === 0) {
                    this.rgservicesRg = [];
                } else {
                    for (let i = 0; i < rgservicesList.length; i++) {
                        this.rgservicesRg.push({
                            'id': rgservicesList[i].seqValue, 'text': rgservicesList[i].code
                        });
                    }
                    if (this.fromCategoryToSetService) {
                        if (this.pProgramId && this.pProgramId > 0) {
                            if (this.rgservicesRg.length > 0) {
                                for (let j = 0; j < this.rgservicesRg.length; j++) {
                                    if (this.rgservicesRg[j].id === this.pProgramId) {
                                        {
                                            this.service = this.rgservicesRg[j].text;
                                        }
                                    }
                                }
                                this.fromCategoryToSetService = false;
                            }
                        }
                    }
                }
            });*/
            this.providerNameLink = undefined;
            if (this.providerTypeDesc === 'INT') {
                this.providerNameDisabled = false;
                if (this.environmentTemp === 'INST') {
                    this.providerNameLink = 'ociscata/rgAgyLocsRecordGroup';
                    this.providerNameLinkURL();
                } else {
                    if (this.categoryTemp === 'UW') {
                        this.providerNameLink = 'ociscata/rgTeamUnpaidWkRecordGroup';
                        this.providerNameLinkURL();
                    } else if (this.categoryTemp === 'DRR') {
                        this.providerNameLink = 'ociscata/rgProviderDttoRecordGroup';
                        this.providerNameLinkURL();
                    } else {
                        this.providerNameLink = 'ociscata/rgTeamAgyLocsRecordGroup';
                        this.providerNameLinkURL();
                    }
                }
            } else {
                this.providerNameLink = 'ociscata/rgCorpLocsRecordGroup?category=' + this.categoryTemp;
                const rgagylocsServiceObj = this.ociscataFactory.rgCorpLocsRecordGroup(this.categoryTemp);
                rgagylocsServiceObj.subscribe(rgagylocsList => {
                    if (rgagylocsList.length === 0) {
                        this.rgproviderNameRg = [];
                        this.providerNameDisabled = true;
                    } else {
                        this.providerNameDisabled = false;
                        for (let i = 0; i < rgagylocsList.length; i++) {
                            this.rgproviderNameRg.push({
                                'text': rgagylocsList[i].code + ' - ' +
                                    rgagylocsList[i].description, 'id': rgagylocsList[i].code
                            });
                        }
                    }
                });
            }
        }
    }

    providerNameLinkURL() {
        if (this.providerNameLink) {
            if (this.providerNameLink === 'ociscata/rgAgyLocsRecordGroup') {
                this.rgagylocsServiceObj = this.ociscataFactory.rgAgyLocsRecordGroup();
            } else if (this.providerNameLink === 'ociscata/rgTeamUnpaidWkRecordGroup') {
                this.rgagylocsServiceObj = this.ociscataFactory.rgTeamUnpaidWkRecordGroup();
            } else if (this.providerNameLink === 'ociscata/rgProviderDttoRecordGroup') {
                this.rgagylocsServiceObj = this.ociscataFactory.rgProviderDttoRecordGroup();
            } else if (this.providerNameLink === 'ociscata/rgTeamAgyLocsRecordGroup') {
                this.rgagylocsServiceObj = this.ociscataFactory.rgTeamAgyLocsRecordGroup();
            }
            this.rgagylocsServiceObj.subscribe(rgagylocsList => {
                if (rgagylocsList.length === 0) {
                    this.rgproviderNameRg = [];
                } else {
                    for (let i = 0; i < rgagylocsList.length; i++) {
                        this.rgproviderNameRg.push({
                            'text': rgagylocsList[i].code + ' - ' +
                                rgagylocsList[i].description, 'id': rgagylocsList[i].code
                        });
                    }
                }
            });
        }
    }

    /**
     * event is fired when change the value of region value in LOV.
     * @param event
     */
    changeTheValueOfRegion(event) {
        this.areaReadOnly = false;
        if (this.environmentTemp) {
            this.strRegionAndEnv = this.environmentTemp;
        } else {
            this.strRegionAndEnv = this.strNoValue;
        }
        if (event) {
            this.areaLink = 'ociscata/rgAreasRecordGroup?environment=' + this.strRegionAndEnv + '&region=' + event.code;
            /*const rgareasServiceObj = this.ociscataFactory.rgAreasRecordGroup(this.strRegionAndEnv, event.code);
            rgareasServiceObj.subscribe(rgareasList => {
                if (rgareasList.length === 0) {
                    this.rgareasRg = [];
                } else {
                    for (let i = 0; i < rgareasList.length; i++) {
                        this.rgareasRg.push({
                            'text': rgareasList[i].code + ' - ' +
                                rgareasList[i].description, 'id': rgareasList[i].code
                        });
                    }
                }
            });*/
        } else {
            this.area = null;
            this.areaReadOnly = true;
            //this.areaLink = 'ociscata/rgAreasRecordGroup?environment=' + this.strRegionAndEnv + '&region=' + this.strNoValue;
            /* const rgareasServiceObj = this.ociscataFactory.rgAreasRecordGroup(this.strRegionAndEnv, this.strNoValue);
             rgareasServiceObj.subscribe(rgareasList => {
                 if (rgareasList.length === 0) {
                     this.rgareasRg = [];
                 } else {
                     for (let i = 0; i < rgareasList.length; i++) {
                         this.rgareasRg.push({
                             'text': rgareasList[i].code + ' - ' +
                                 rgareasList[i].description, 'id': rgareasList[i].code
                         });
                     }
                 }
             });*/
        }
    }
    /**
     * event is fired when change the value of service value in LOV.
     * @param event
     */
    changeTheValueOfService(event) {
        if (event) {
            this.programId = event.seqValue;
        }
    }
    /**
     * event is fired when change the value of service value in LOV.
     * @param event
     */
    changeTheValueOfArea(event) {
        if (event) {
            this.area = event.code;
            this.parentAreaCode = event.parentAreaCode;
        }
    }

    servicesAndAdvanceSearchExecuteQuery() {
        this.vcrsactModel.agyLocId = this.sessionManager.currentCaseLoad;
        const vcrsactResult = this.ociscataFactory.
            vCrsActExecuteQuery(this.vcrsactModel);
        vcrsactResult.subscribe(vcrsactResultList => {
            if (vcrsactResultList.length === 0) {
                this.vcrsactData = [];
                this.assignFlag = true;
                this.cancelFlag = true;
                this.vcrsactModel = new VCourseActivities();
                this.namesReadOnly = false;
                this.searchDisable = false;
                this.clearDisable = false;
                this.show(this.translateService.translate('common.querycaused'), 'warn');
                return;
            } else {
                for (let i = 0; i < vcrsactResultList.length; i++) {
                    vcrsactResultList[i].activeFlag = vcrsactResultList[i].activeFlag === 'Y' ? true : false;
                }
                this.vcrsactData = vcrsactResultList;
                this.vcrsactModel = this.vcrsactData[0];
                this.vcrsactIndex = 0;
                this.fromAdvBlock = false;
                if (this.router.url === '/OCDXPROG' || this.router.url === '/OIDOWREL') {
                    this.assignFlag = false;
                    this.cancelFlag = false;
                }

                if (this.router.url === '/OCDUPROJ' || this.router.url === '/OCDPROGR'
                    || this.router.url === '/OIDPWAIT') {
                    this.assignFlag = false;
                    this.cancelFlag = false;
                }

                // if (this.oidpwaitFactory.vOffPrgOblModelService && this.oidpwaitFactory.vOffPrgOblModelService.statusDesc === 'ALLOCATE') {
                //     this.assignFlag = false;
                // }
                //this.assignFlag = false;
                this.namesReadOnly = true;
                this.categoryFlag = true;
                this.serviceFlag = true;
                this.searchDisable = true;
                this.clearDisable = false;
                this.areaReadOnly = true;
                this.providerNameDisabled = true;
            }
        });
    }

    setVCourseActivitiesModel() {
        if (!this.environment) {
            this.show(this.translateService.translate('ociscata.environmentmustbeentered'), 'warn');
            return false;
        } else {
            this.vcrsactModel.environment = this.environment;
        }
        if (!this.category) {
            this.show(this.translateService.translate('ociscata.categorymustbeentered'), 'warn');
            return false;
        } else {
            this.vcrsactModel.programCategory = this.category;
        }
        if (this.providerTypeDesc) {
            this.vcrsactModel.programCategoryDesc = this.providerTypeDesc;
            if (this.providerTypeDesc === 'EXT' || (this.environment === 'COMM' && this.providerTypeDesc === 'INT')) {
                if (this.providerName) {
                    this.vcrsactModel.providerId = Number(this.providerName);
                }
            }
        }
        if (this.programId) {
            this.vcrsactModel.programId = this.programId;
        }
        if (this.area) {
            this.vcrsactModel.areaCode = this.area;
            this.vcrsactModel.parentAreaCode = this.parentAreaCode;
        }
        if (this.region) {
            this.vcrsactModel.nbtRegion = this.region;
        }
        if (this.providerName) {
            this.vcrsactModel.providerName = this.providerName;
        }
        if (this.nbtAgyLocId) {
            this.vcrsactModel.nbtAgyLocId = this.nbtAgyLocId;
        }
        if (this.service) {
            this.vcrsactModel.providerClass = this.service;
        }
        this.programServicesId = this.vcrsactModel;
        this.servicesAndAdvanceSearchExecuteQuery();
    }

    servicesExecuteQuery() {
        if (this.advanceSearch) {
            this.setAdvanceSearchFlag(true);
            this.setVCourseActivitiesModel();
        } else {
            this.vcrsactModel = new VCourseActivities();
            this.fromAdvBlock = false;
            this.setVCourseActivitiesModel();
        }
    }

    onCancelClick() {
        this.assignRecord.emit(null);
        this.appbarService.manageIcon(true);
    }

    /**
     * event is fired when click on row in the grid in the block of Services.
     * @param event
     */
    rowClickInServicesBlock(event) {
        if (event) {
            this.vcrsactModel = new VCourseActivities();
            this.vcrsactModel = event;
            this.vcrsactModel.pQueryOnly = 'N';
            if (this.vcrsactModel.crsActyId) {
                this.constantsButton(this.vcrsactModel.crsActyId);
                this.alloOffDisabled = false;
            }
            if (!this.vcrsactModel.servicesAddressId) {
                this.vcrsactModel.agyLocDesc = undefined;
            }
        } else {
            this.constantDisabled = true;
            this.alloOffDisabled = true;
        }

    }
    constantsButton(crsActyId) {
        const constantData = this.ociscataFactory.vCrsActWhenNewRecordInstance(crsActyId);
        constantData.subscribe(data => {
            if (data > 0) {
                this.constantDisabled = false;
            } else {
                this.constantDisabled = true;
            }
        });
    }
    onRelationshipBlur() {
        if (!this.environment) {
            this.environment = this.environment === '' ? undefined : '';
        }
    }
    onRelationshipBlurOne() {
        if (!this.category) {
            this.category = this.category === '' ? undefined : '';
        }
    }
    onRelationshipBlurTwo() {
        if (!this.service) {
            this.service = this.service === '' ? undefined : '';
        }
    }
    onRelationshipBlurThree() {
        if (!this.region) {
            this.region = this.region === '' ? undefined : '';
        }
    }
    onRelationshipBlurFour() {
        if (!this.area) {
            this.area = this.area === '' ? undefined : '';
        }
    }
    onRelationshipBlurFive() {
        if (!this.providerTypeDesc) {
            this.providerTypeDesc = this.providerTypeDesc === '' ? undefined : '';
        }
    }
    /*
   * This method is used to show popup messages.
   */
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    updateSelectFlagValidation = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event.field === 'nbtSelect') {
            if (event.data.nbtSelect && this.category !== 'PWS') {
                if (!event.scheduleStartDate) {
                    this.show(this.translateService.translate('ociscata.pleaseselectphase'), 'warn');
                    event.data.nbtSelect = false;
                    return false;
                }
                if (this.environment !== 'COMM') {
                    this.programsNonAssocTmpModel = new ProgramsNonAssocTmp();
                    this.programsNonAssocTmpModel.warningMsg = this.category;
                    if (event.data.coursePhaseId) {
                        this.programsNonAssocTmpModel.coursePhaseId = event.data.coursePhaseId;
                    }
                    if (event.data.crtyActId) {
                        this.programsNonAssocTmpModel.crsActyId = event.data.crsActyId;
                    }
                    const chkNaPrgConflict = this.ociscataFactory.getProgramsNonAssTmp(this.programsNonAssocTmpModel);
                    chkNaPrgConflict.subscribe(warningDetails => {
                        if (warningDetails.warningMsg !== 'null') {
                            const data = {
                                warningMsg: warningDetails.warningMsg, warningPrompt: warningDetails.warningPrompt,
                                yesBtn: true, noBtn: true
                            };

                            this.dialogService.openLinkDialog('/OCUWARNG', data, 80).subscribe(result => {
                                if (typeof result === 'boolean' && result) {
                                    event.data.nbtSelect = false;
                                    rowdata.validated = true;
                                    return rowdata;
                                }
                            });
                        } else {
                            rowdata.validated = true;
                            return rowdata;
                        }
                    });
                }
            }
            if (event.data.programCategory === 'UW' || event.data.programCategory === 'DRR' ||
                event.data.programCategory === 'PWS') {
                this.inCount = 0;
                for (let k = 0; k < this.vcrsactData.length; k++) {
                    if (this.vcrsactData[k].nbtSelect && (this.vcrsactData[k].programCategory === 'UW' ||
                        this.vcrsactData[k].programCategory === 'DRR' || this.vcrsactData[k].programCategory === 'PWS')) {

                        if (this.inCount === 0) {
                            this.inCount = this.inCount + 1;
                        } else {
                            event.data.nbtSelect = false;
                            this.show(this.translateService.translate('ociscata.youcanallocateonly'), 'warn');
                            return false;
                        }
                    }
                }

            } else {
                rowdata.validated = true;
            }
        }
    }
    isInsertable() {
        if (this.environment || this.category || this.service || this.region
            || this.area || this.providerName || this.advanceSearch || this.namesReadOnly) {
            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }
    validateRowData = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        let count = 0;
        if (event.data.programCategory === 'UW' || event.data.programCategory === 'DRR' ||
            event.data.programCategory === 'PWS') {
            this.inCount = 0;
            for (let k = 0; k < this.vcrsactData.length; k++) {
                if (this.vcrsactData[k].nbtSelect && (this.vcrsactData[k].programCategory === 'UW' ||
                    this.vcrsactData[k].programCategory === 'DRR' || this.vcrsactData[k].programCategory === 'PWS')) {

                    if (this.inCount === 0) {
                        this.inCount = this.inCount + 1;
                    } else {
                        event.data.nbtSelect = false;
                        this.show(this.translateService.translate('ociscata.youcanallocateonly'), 'warn');
                        return false;
                    }
                }
            }

        }
        rowdata.validated = true;
        return rowdata;
    }

    onbackBtnClick = () => {
        // if (this.oidpwaitFactory.exitFlag) {
        //     this.oidpwaitFactory.vOffPrgOblModelService = undefined;
        //     this.backBtn = false;
        //     this.router.navigate(['/OIDPWAIT']);
        // }
    }

    get scheduleInfoBtnFlag() {
        if (this.vcrsactModel && this.vcrsactModel.crsActyId) {
            return false;
        } else if (this.pOperationTemp != 'ALLOCATE') {
            return true;
        } else {
            return true;
        }
    }

    onButScheduleInfoclick = () => {
        var pCrsActyId: any;
        var pQueryOnly = 'Y';
        var lForm: any;
        if (this.vcrsactModel.programCategory === 'ACP') {
            pCrsActyId = this.vcrsactModel.coursePhaseId;

        } else {
            pCrsActyId = this.vcrsactModel.crsActyId;
        }
        /* if (this.vcrsactModel.programCategory != 'UW' && this.vcrsactModel.programCategory != 'DRR' ) {
            pQueryOnly = 'Y';
        } */
        if (this.vcrsactModel.programCategory === 'ACP') {
            lForm = '/OCMSCHPR';
        } else if (this.vcrsactModel.programCategory === 'UW' || this.vcrsactModel.programCategory === 'DRR') {
            lForm = '/OCUMPVAV';
        } else {
            lForm = '/OCMSOSCH';
        }
        const modelData = { crsActyId: pCrsActyId, pQueryOnly: pQueryOnly };
        this.dialogService.openLinkDialog(lForm, modelData, 80).subscribe(result => {

        });
        return true;
    }

    onButListOfOffclick = () => {
        var pCrsActyId: any;
        if (this.vcrsactModel.programCategory === 'ACP') {
            pCrsActyId = this.vcrsactModel.coursePhaseId;

        } else {
            pCrsActyId = this.vcrsactModel.crsActyId;
        }
        const modelData = { crsActyId: pCrsActyId };
        this.dialogService.openLinkDialog('/OCUPAOFF', modelData, 80).subscribe(result => {

        });
        return true;
    }

    conflictPopUp(event, x, y) {
        let i = x;
        let j = y;
        if (i == event.length && this.vOffPrgOblDataTemp && this.vOffPrgOblDataTemp.length != 0) {
            this.ocussessPopUp();
        }
        if (i == j && i < event.length) {
            if (!event[i].conflictMsg) {
                j++;
                i++;
                this.conflictPopUp(event, i, j);
            } else {
                let msgOne = this.translateService.translate('ociscata.offender');
                let msgtwo = this.translateService.translate('ociscata.hasNonAssociation');
                let msgThree = this.translateService.translate('ociscata.doyouwanttoproceed');
                event[i].conflictMsg = event[i].conflictMsg.replaceAll('ociscata.offender', msgOne);
                event[i].conflictMsg = event[i].conflictMsg.replaceAll('ociscata.hasNonAssociation', msgtwo);
                event[i].conflictMsg = event[i].conflictMsg.replaceAll('ociscata.doyouwanttoproceed', msgThree);
                const data = {
                    label: this.translateService.translate(event[i].conflictMsg), yesBtn: true, noBtn: true
                };
                j++;
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                    if (result) {
                        i++;
                        if (i < event.length) {
                            this.conflictPopUp(event, i, j);
                        } else {
                            this.conflictPopUp(event, i, j);
                        }
                    } else {
                        this.vOffPrgOblDataTemp = this.vOffPrgOblDataTemp.filter((element) => (element.offenderBookId != event[i].offenderBookId));
                        i++;
                        this.conflictPopUp(event, i, j);
                    }
                });
            }
        }
    }

    ocussessPopUp() {
        this.vcrsactStaffModel = new VCourseActivities();
        this.vcrsactStaffModel.crsActyId = this.vcrsactModel.coursePhaseId;
        this.vcrsactStaffModel.phaseDesc = this.vcrsactModel.phaseDesc;
        this.dialogService.openLinkDialog('/OCUSSESS', this.vcrsactStaffModel, 50).subscribe(result => {
            if (result) {
                this.vcrsactModelTempData.forEach(e => {
                    e.scheduleStartDate = result.scheduleDate;
                    e.sessionNo = result.sessionNo;
                    if (this.vOffPrgOblDataTemp && this.vOffPrgOblDataTemp.length > 0) {
                        e.bulkAssignData = this.vOffPrgOblDataTemp;
                }
                });
                this.assignRecord.emit(this.vcrsactModelTempData);
            } else {
                if (this.vOffPrgOblDataTemp && this.vOffPrgOblDataTemp.length > 0) {
                    this.vcrsactModelTempData.forEach(e => {
                        e.bulkAssignData = this.vOffPrgOblDataTemp;
                    });
                }
                // this.assignRecord.emit(this.vcrsactModelTempData);
                return;
            }
        });
    }

    get categoryReadOnlyFlag() {
        if (this.dialogData && this.dialogData.pOperation === 'ALLOCATE') {
            return true;
        } else if (this.searchDisable) {
            return true;
        }
        return false;
    }

    externalNonAssocationByIngAndGangAssign(event) {
        if (event.length == 0 && this.vOffPrgOblDataTemp && this.vOffPrgOblDataTemp.length != 0) {
            this.ocussessPopUp();
        }
        else {
            this.offenderDetailsDisplay = event.offenderList;
            if (this.offenderDetailsDisplay.length > 0) {
                for (let i = 0; i < this.offenderDetailsDisplay.length; i++) {
                    if (this.offenderDetailsDisplay[i].nonAssocationByIngAndGang === "EMPTYDATA") {
                        this.ocussessPopUp();
                    }
                    else {
                        this.offenderDetailsDisplay[i].nonAssocationByIngAndGang = this.offenderDetailsDisplay[i].offenderName + "  " + "000" + this.offenderDetailsDisplay[i].offenderId + " " + this.offenderDetailsDisplay[i].nonAssocationByIngAndGang;
                        const msgOne = this.translateService.translate('ocdprogr.nonassociationconflictmsg');
                        const msgTwo = this.translateService.translate('ocdprogr.indinonassocconflict');
                        const msgThree = this.translateService.translate('ocdprogr.gangnonassocconflict');
                        this.offenderDetailsDisplay[i].nonAssocationByIngAndGang = this.offenderDetailsDisplay[i].nonAssocationByIngAndGang.replaceAll('ociscata.program', msgOne);
                        this.offenderDetailsDisplay[i].nonAssocationByIngAndGang = this.offenderDetailsDisplay[i].nonAssocationByIngAndGang.replaceAll('ociscata.indinonassocconflict', msgTwo);
                        this.offenderDetailsDisplay[i].nonAssocationByIngAndGang = this.offenderDetailsDisplay[i].nonAssocationByIngAndGang.replaceAll('ociscata.gangnonassocconflict', msgThree);
                        const labelMsg = {
                            label: this.translateService.translate(this.offenderDetailsDisplay[i].nonAssocationByIngAndGang), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
                            proceedBtnDisabled: true
                        };
                        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                            if (result) {
                                this.ocussessPopUp();
                            } else {
                                return;
                            }
                        });
                    }
                }
            }
        }
    }
}
