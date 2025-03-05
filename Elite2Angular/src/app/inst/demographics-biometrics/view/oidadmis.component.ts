import {
    Component, OnDestroy, OnInit, ViewChild
} from '@angular/core';

import { Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { TranslateService } from '@common/translate/translate.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { VHeaderBlock2 } from '@commonbeans/VHeaderBlock2';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OtdcntacService } from '@inmate/trust/financialsmaintenance/service/otdcntac.service';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { OffenderTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTransactionsCommitBean';
import { OimadmisService } from '@inst/booking/maintainence/service/oimadmis.service';
import { OidadmisService } from '@inst/demographics-biometrics/service/oidadmis.service';
import { OmuavbedService } from '@inst/demographics-biometrics/service/omuavbed.service';
import { CaseloadAdmOtherProfiles } from '@inst/movement-external/beans/CaseloadAdmOtherProfiles';
import { HousingService } from '@inst/movements/housingchanges/service/housing.service';
import { BedAssignmentHistories } from '@instdemographicsbeans/BedAssignmentHistories';
import { OffenderBookings } from '@instdemographicsbeans/OffenderBookings';
import { OffenderBookingsCommitBean } from '@instdemographicsbeans/OffenderBookingsCommitBean';
import { OffenderExternalMovements } from '@instdemographicsbeans/OffenderExternalMovements';
import { OffenderExternalMovementsCommitBean } from '@instdemographicsbeans/OffenderExternalMovementsCommitBean';
import { OmuavbedLivUnitsQuery } from '@instdemographicsbeans/OmuavbedLivUnitsQuery';
import { SystemProfiles } from '@instdemographicsbeans/SystemProfiles';
import { PortalAppService } from '@portal/service/portalapp.service';
import { AgencyLocations } from '@sa/admin/beans/AgencyLocations';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ScreenWorkFlowService } from '@ui-components/pane/screen-workflow.service';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OidchlocService } from '@inst/movements/housingchanges/service/oidchloc.service';
@Component({
    selector: 'app-oidadmis',
    templateUrl: './oidadmis.component.html',
    styleUrls: ['./oidadmis.component.scss']
})

export class OidadmisComponent implements OnInit, OnDestroy {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    txnId: any;
    receiptNumber: any;
    defaultDedFlag: boolean;
    txnEntryAmount: any;
    trustFlagData: any;
    bedDescFlag = false;
    caseloadAgyCount = 0;
    caseloadFlag = false;
    bookingFlag = true;
    offenderBookID: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offbkgData: VHeaderBlock2[] = [];
    offbkgDataTemp: VHeaderBlock2[] = [];
    offbkgModel: VHeaderBlock2 = new VHeaderBlock2();
    offbkgBean: VHeaderBlock2 = new VHeaderBlock2();
    offbkgModelTemp: VHeaderBlock2 = new VHeaderBlock2();
    bookingNo: any;
    offbkgsData: OffenderBookings[] = [];
    offbkgModelData: VHeaderBlock2 = new VHeaderBlock2();
    offbkgsDataTemp: OffenderBookings[] = [];
    offbkgsModel: OffenderBookings = new OffenderBookings();
    offbkgsModelTemp: OffenderBookings = new OffenderBookings();
    offbkgsIndex: number;
    offbkgsCommitModel: OffenderBookingsCommitBean;
    offbkgsInsertList: OffenderBookings[] = [];
    offbkgsUpdateList: OffenderBookings[] = [];
    offbkgsDeleteList: OffenderBookings[] = [];
    offemData: OffenderExternalMovements[] = [];
    offemDataTemp: OffenderExternalMovements[] = [];
    offemModel: OffenderExternalMovements = new OffenderExternalMovements();
    offemModelTemp: OffenderExternalMovements = new OffenderExternalMovements();
    offemModelTempData: OffenderExternalMovements = new OffenderExternalMovements();
    offemTemp: OffenderExternalMovements = new OffenderExternalMovements();
    offemBean: OffenderExternalMovements = new OffenderExternalMovements();
    offemIndex: number;
    offemInsertList: OffenderExternalMovements[] = [];
    offemUpdateList: OffenderExternalMovements[] = [];
    offemDeleteList: OffenderExternalMovements[] = [];
    offemCommitModel: OffenderExternalMovementsCommitBean;
    bedahData: BedAssignmentHistories[] = [];
    bedahDataTemp: BedAssignmentHistories[] = [];
    bedahModel: BedAssignmentHistories = new BedAssignmentHistories();
    bedahIndex: number;
    bedahInsertList: BedAssignmentHistories[] = [];
    bedahUpdatetList: BedAssignmentHistories[] = [];
    bedahDeleteList: BedAssignmentHistories[] = [];
    livingunitsData: OmuavbedLivUnitsQuery[] = [];
    livingunitsDataTemp: OmuavbedLivUnitsQuery[] = [];
    livingunitsModel: OmuavbedLivUnitsQuery = new OmuavbedLivUnitsQuery();
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: number;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    phonesColumnDef: any[];
    offBkgsColumnDef: any[];
    translateLabel: any;
    phonesReadOnly: boolean;
    bkgReadOnly: boolean;
    offTxnReadOnly: boolean;
    sysPflReadOnly: boolean;
    offBkgReadOnly: boolean;
    offBkgsReadOnly: boolean;
    offEmReadOnly: boolean;
    bedAhReadOnly: boolean;
    cgfkOffemdspdescriptionRg: any[] = [];
    cgfkBedahdspdescriptionRg: any[] = [];
    cgfkOffemdspdescription6Rg: any[] = [];
    cgfkOffemdspdescription4Rg: any[] = [];
    cgfkOffemdspdescription5Rg: any[] = [];
    cgfkOffemdspdescription3Rg: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    systemModel: any = [];
    caseLoadId: any;
    caseloadId: any;
    time: Date;
    saveDisabled: boolean;
    newbooking: boolean;
    movementTime: any;
    min: any;
    hrs: any;
    toAgyLocId: any;
    toAgyLocIdLov: any;
    checkNum: any[] = [];
    maxValue: any;
    modalData: any;
    offenderData: any;
    reasonLink: any;
    reasonCode: any;
    caseloadOption: any[] = [];
    bkgStatusOption: any[] = [];
    namesOption: any[] = [];
    statusOption: any[] = [];
    tableIndex = -1;
    flag = false;
    reasonReadOnly = false;
    saveReadOnly: boolean;
    cancelReadOnly: boolean;
    lastMovementDate: any;
    lastMovementTime: any;
    movementDate: any;
    caseloadIdFlag = false;
    movementDateFlag: boolean;
    facility: any;
    disableHousingUnit: boolean = true;
    housingdialogTooltip: string;
    defaultLocation: string;
    externalsystemId: any;
    populateDefaultValues: boolean = false;
    toAgyLocIdData: string;
    housingData: string;
    housingTempData: string;
    caseloadadmotherprofilesData: CaseloadAdmOtherProfiles[] = [];
    validData: CaseloadAdmOtherProfiles[] = [];
    age: number;
    ageVal: number;
    offtxnInsertList: OffenderTransactions[] = [];
    offtxnUpdateList: OffenderTransactions[] = [];
    offtxnDeleteList: OffenderTransactions[] = [];
    offtxnCommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    fromLocationList:AgencyLocations[]=[];
    fromLocationFlag:boolean;
    value: number;
    admissionType: any;
    constructor(private oidadmisFactory: OidadmisService,
        private omuavbedFactory: OmuavbedService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,
        private osiosearFactory: OsiosearService,
        public dialogService: DialogService,
        private sessionManager: UserSessionManager,
        public housingService: HousingService, public screenWorkflowService: ScreenWorkFlowService, private portalAppService: PortalAppService,
        private router: Router, private oimadmisFactory: OimadmisService, private amountFormat: AmountFormatUtil,
        private otdcntacFactory: OtdcntacService, private oidchlocFactory: OidchlocService) {
        this.offemCommitModel = new OffenderExternalMovementsCommitBean();
        this.phonesColumnDef = [];
        this.offBkgsColumnDef = [];
        this.systemModel.triggerBlock = [];
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.getFromLocationList()
        this.maxValue = 0;
        this.caseloadIdFlag = false;
        this.movementDateFlag = false;
        this.toAgyLocIdLov = 'oidadmis/cgfkOffEmDspDescriptionCaseloadIdRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.offbkgModel = new VHeaderBlock2();
        this.offbkgModel.statusDisplay = '';
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.bedAhReadOnly = true;
        this.disableHousingUnit = true;
        this.housingdialogTooltip = "";
        this.saveReadOnly = true;
        this.offEmReadOnly = true;
        this.bkgReadOnly = true;
        this.reasonReadOnly = false;
        this.cancelReadOnly = true;
        this.toAgyLocId = undefined;
        this.offBkgsColumnDef = [
            { fieldName: this.translateService.translate('system-profile.book-id'), field: 'bookingNo', editable: false, width: 180 },
            {
                fieldName: this.translateService.translate('common.date'), field: 'bookingBeginDate', editable: false,
                datatype: 'date', width: 180
            },
            {
                fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'agyLocId', editable: false, width: 180,
                datatype: 'text', link: 'oidadmis/cgfkOffEmDspDescriptionAgyLocIdRecordGroup'
            },
            {
                fieldName: this.translateService.translate('oidadmis.activestatus'), field: 'cgnbtActiveFlag', editable: false, width: 180,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('system-profile.comm-agency'), field: 'intakeAgyLocId',
                editable: false, width: 180
            },
            { fieldName: this.translateService.translate('oidadmis.bookstatus'), field: 'cgnbtCommunityActiveFlag', editable: false, width: 180 },
            {
                fieldName: this.translateService.translate('oidadmis.staffmember'), field: 'dspFirstName', editable: false, width: 180,
                datatype: 'lov', link: 'oidadmis/getSaffmembersDescription'
            },
            {
                fieldName: this.translateService.translate('oidadmis.bookingstatus'), field: 'cgnbtBookingStatus',
                editable: false, width: 180, datatype: 'lov', domain: 'BOOK_STS'
            },
        ];
        const agyCountObj = this.oidadmisFactory.offEmWhenNewBlockInstancecasAgyCur(this.sessionManager.currentCaseLoad);
        agyCountObj.subscribe(agyCount => {
            this.caseloadAgyCount = agyCount;
            if (this.caseloadAgyCount === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidadmis.therearenoactiveagencylocations');
                this.show();
                this.offEmReadOnly = true;
                this.bkgReadOnly = true;
                return;
            }
        });
        const queryParams = { caseloadId: this.sessionManager.currentCaseLoad };
        const caseloadadmotherprofilesResult = this.oimadmisFactory.caseloadAdmOtherProfilesExecuteQuery(queryParams);
        caseloadadmotherprofilesResult.subscribe(caseloadResultList => {
            caseloadResultList.forEach(element => {
                if (this.sessionManager.currentCaseLoad === element.agyLocId) {
                    if (element.livingUnitDesc) {
                        this.housingData = element.livingUnitDesc;
                        this.housingTempData = element.livingUnitDesc;
                    }
                }
            });
        });
        if (this.osiosearFactory.externalsystemId && this.osiosearFactory.externalsystemId != null) {
            this.externalsystemId = this.osiosearFactory.externalsystemId;
            this.osiosearFactory.externalsystemId = null;
        }
        if (this.offenderSearchService.selectedOffender && this.offenderSearchService.selectedOffender.offenderIdDisplay) {
            this.offbkgModel = this.offenderSearchService.selectedOffender;
            this.osiosearFactory.selectOffender = undefined;
        } else if (this.osiosearFactory.selectOffender && this.osiosearFactory.selectOffender.offenderIdDisplay) {
            if (this.osiosearFactory.selectOffender.offenderId && this.osiosearFactory.selectOffender.offenderBookId
                && this.osiosearFactory.selectOffender.offenderBookId !== 0) {
                    if(this.osiosearFactory.selectOffender.bookingType === 'INST'){
                        this.caseloadIdValue();
                        if (this.caseloadIdFlag) {
                            this.offbkgModel = this.osiosearFactory.selectOffender;
                            this.offenderSearchService.selectedOffender = this.offbkgModel;
                            this.caseloadIdFlag = false;
                        }

                    }
                    else{
                        this.offbkgModel = this.osiosearFactory.selectOffender;
                        this.offenderSearchService.selectedOffender = this.offbkgModel;
                    }
            } else {
                this.offbkgModel = this.osiosearFactory.selectOffender;
                this.offenderSearchService.selectedOffender = this.offbkgModel;
            }
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
        const data = { caseloadId: this.sessionManager.currentCaseLoad };
        const caseloadadmResult = this.oimadmisFactory.caseloadAdmOtherProfilesExecuteQuery(data);
        caseloadadmResult.subscribe(caseloadadmotherprofilesResultList => {
            if (caseloadadmotherprofilesResultList.length > 0) {
                this.caseloadadmotherprofilesData = caseloadadmotherprofilesResultList;
            } else {
                this.caseloadadmotherprofilesData = [];
            }
        });
        const trustFlag = this.oidadmisFactory.chkTrustFlag(this.sessionManager.currentCaseLoad);
        trustFlag.subscribe(flag => {
            if (flag === 'Y') {
                this.trustFlagData = true;
            } else {
                this.trustFlagData = false;
            }
        });
    }
    onOffenderChange(offender) {
        this.offbkgModel = offender;
        this.offbkgModelTemp = offender;
        if (offender) {
            this.ageVal = offender.age;
            this.getToLocations();
            if (offender.rootOffenderId) {
                const queryParams = { caseloadId: this.sessionManager.currentCaseLoad };
                const caseloadadmotherprofilesResult = this.oimadmisFactory.caseloadAdmOtherProfilesExecuteQuery(queryParams);
                caseloadadmotherprofilesResult.subscribe(caseloadResultList => {
                    caseloadResultList.forEach(element => {
                        if (element.livingUnitDesc) {
                            this.bedDescFlag = false;
                            if (this.toAgyLocId) {
                                this.housingData = element.livingUnitDesc;
                                this.housingTempData = element.livingUnitDesc;
                                this.bedahModel.dspDescription = element.livingUnitDesc;
                            } else {
                                this.housingData = undefined;
                                this.housingTempData = undefined;
                                this.bedahModel.dspDescription = undefined;
                            }
                            this.bedahModel.livingUnitId = element.livingUnitId;
                        }
                    });
                });
                if (!this.offbkgModel.statusReason) {
                    this.getAdmissionType();
                } else {
                    this.getAdmissionType();
                    this.reasonCode = this.offbkgModel.statusReason;
                }
                this.offbkgsExecuteQuery();
            }
            if (!this.offbkgModel.statusReason && this.caseloadAgyCount > 0) {
                this.offEmReadOnly = false;
                this.bkgReadOnly = true;
            }
             this.movementDate = undefined;
        } else {
            this.offbkgsData = [];
            this.offemModel = new OffenderExternalMovements();
            this.offemModelTemp = new OffenderExternalMovements();
            this.offbkgsModelTemp = new OffenderBookings();
            this.offbkgsModel = new OffenderBookings();
            this.offbkgModelTemp = new VHeaderBlock2();
            this.offEmReadOnly = true;
            this.bedAhReadOnly = true;
            this.disableHousingUnit = true;
            this.housingdialogTooltip = "";
            this.saveReadOnly = true;
            this.newbooking = false;
            this.movementTime = '';
            this.offbkgsModel.bookingNo = '';
            this.bedahModel.dspDescription = '';
            this.bkgReadOnly = true;
            this.cancelReadOnly = true;
            this.movementDate = null;
            this.toAgyLocId = null;
            this.txnEntryAmount = undefined;
            this.defaultDedFlag = false;
            this.receiptNumber = undefined;
            this.txnId = undefined;
        }
        // Retrieve default values on next mouse click
        this.populateDefaultValues = false;
    }

    checkAllConficts() {
        this.bedahModel.offenderId = this.offbkgModelTemp.offenderId;
        const checkWarningService = this.oidadmisFactory.checkAllConficts(this.bedahModel);
        checkWarningService.subscribe(warningDetails => {
            if (warningDetails.warningMsg !== 'null' && warningDetails.sealFlag !== 'EMPTYDATA') {
                warningDetails.sealFlag = warningDetails.sealFlag.replaceAll('omuavbed.nonassocationmsg', this.translateService.translate('omuavbed.nonassocationmsg'));
                warningDetails.sealFlag = warningDetails.sealFlag.replaceAll('omuavbed.nonassocationhouse', this.translateService.translate('omuavbed.nonassocationhouse'));
                const data = {
                    warningMsg: warningDetails.sealFlag + '\n' + warningDetails.warningMsg, warningPrompt: warningDetails.warningPrompt,
                    yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/OCUWARNG', data, 50).subscribe(result => {
                    if (typeof result === 'boolean' && result) {
                        this.dialog.close({
                            dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                            noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId,
                            isNonAssocOverriddenWarn: 'Y', warningMsg: warningDetails.warningMsg
                        });
                    } else {
                        this.bedahModel.dspDescription = undefined;
                    }
                });
            } else if (warningDetails.sealFlag !== 'EMPTYDATA') {
                warningDetails.sealFlag = warningDetails.sealFlag.replaceAll('omuavbed.nonassocationmsg', this.translateService.translate('omuavbed.nonassocationmsg'));
                warningDetails.sealFlag = warningDetails.sealFlag.replaceAll('omuavbed.nonassocationhouse', this.translateService.translate('omuavbed.nonassocationhouse'));
                const data = {
                    warningMsg: warningDetails.sealFlag, warningPrompt: '',
                    yesBtn: warningDetails, noBtn: true
                };
                this.dialogService.openLinkDialog('/OCUWARNG', data, 50).subscribe(result => {
                    if (typeof result === 'boolean' && result) {
                        this.dialog.close({
                            dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                            noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId,
                            isNonAssocOverriddenWarn: 'Y', warningMsg: warningDetails.warningMsg
                        });
                    } else {
                        this.bedahModel.dspDescription = undefined;
                    }
                });
            }
            else if (warningDetails.warningMsg !== 'null') {
                warningDetails.warningMsg = warningDetails.warningMsg.replaceAll('omuavbed.selectedOffender', this.translateService.translate('omuavbed.selectedOffender'));
                warningDetails.warningMsg = warningDetails.warningMsg.replaceAll('omuavbed.housedinsameunit', this.translateService.translate('omuavbed.housedinsameunit'));
                const data = {
                    warningMsg: warningDetails.warningMsg, warningPrompt: warningDetails.warningPrompt,
                    yesBtn: warningDetails.inserted, noBtn: true
                };
                this.dialogService.openLinkDialog('/OCUWARNG', data, 50).subscribe(result => {
                    if (typeof result === 'boolean' && result) {
                        this.dialog.close({
                            dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                            noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId,
                            isNonAssocOverriddenWarn: 'Y', warningMsg: warningDetails.warningMsg
                        });
                    } else {
                        this.bedahModel.dspDescription = undefined;
                    }
                });
            }
            else {
                this.dialog.close({
                    dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                    noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId,
                    isNonAssocOverriddenWarn: 'N', warningMsg: null
                });
            }
        });
    }

    getAdmissionType() {
        const admServiceObj = this.oidadmisFactory.getAdmissionType(this.offbkgModel);
        admServiceObj.subscribe(admType => {
            if (admType != undefined) {
                this.reasonLink = 'oidadmis/cgfkOffEmDspDescriptionMrRecordGroup?movementReasonCode=' + admType;
                this.admissionType=admType;
                this.getMovementReasonCode(admType);
            }
        });
    }
    getMovementReasonCode(event) {
        const cgfkOffemdspdescriptionServiceObj = this.oidadmisFactory.cgfkOffEmDspDescriptionMrRecordGroup(event);
        cgfkOffemdspdescriptionServiceObj.subscribe(cgfkOffemdspdescriptionlist => {
            if (cgfkOffemdspdescriptionlist.length === 0) {
                this.cgfkOffemdspdescriptionRg = [];
            } else {
                this.cgfkOffemdspdescriptionRg = [];
                for (let i = 0; i < cgfkOffemdspdescriptionlist.length; i++) {
                    this.cgfkOffemdspdescriptionRg.push({
                        'text':
                            cgfkOffemdspdescriptionlist[i].description, 'id': cgfkOffemdspdescriptionlist[i].code
                    });
                }
            }
        });
    }
    caseloadIdValue() {
        const caseloadIdValueData = this.oidadmisFactory.caseloadIdValue(this.osiosearFactory.selectOffender.offenderId);
        caseloadIdValueData.subscribe(caseloadIdValueList => {
            if (caseloadIdValueList.length === 0) {
                this.caseloadIdFlag = false;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                this.caseloadIdFlag = true;
            }
        });
    }
    allowNumbers(event) {
    }
    onButDeductionFlagclick() {
    }
    onRowClickoffbkgs(event) {
        if (event) {
            this.modalData = { bookingId: event.offenderBookId };
            const index = this.offbkgsData.indexOf(event);
            this.offenderData = event;
            if (index === 0 && this.caseloadAgyCount > 0) {
                this.offEmReadOnly = false;
                this.newbooking = null;
                this.movementTime = '';
                this.movementDate = null;
                this.offemModel.fromAgyLocId = '';
                this.offemModel.movementReasonCode = '';
                /* if(this.toAgyLocIdData) {
                    this.toAgyLocId = this.toAgyLocIdData;
                    this.housingData = this.housingTempData;
                }
                else {
                    this.toAgyLocId = undefined;
                    this.housingData = undefined;
                } */

                if(this.toAgyLocId){
                    this.housingData = this.housingTempData; 
                }else{
                    this.housingData = undefined; 
                }
                this.offemModel.arrestAgencyLocId = '';
                this.offemModel.escortCode = '';
                this.offemModel.commentText = '';
                this.offbkgsModel.bookingNo = '';
                this.bedahModel.dspDescription = this.housingData;
                this.reasonReadOnly = false;
                this.saveReadOnly = false;
            } else {
                this.offEmReadOnly = true;
                this.bedAhReadOnly = true;
                this.disableHousingUnit = true;
                this.housingdialogTooltip = "";
                this.saveReadOnly = true;
                this.newbooking = null;
                this.bkgReadOnly = true;
                this.movementTime = '';
                this.movementDate = null;
                this.offemModel.fromAgyLocId = '';
                this.offemModel.movementReasonCode = '';
                /* if(this.toAgyLocIdData) {
                    this.toAgyLocId = this.toAgyLocIdData;
                    this.housingData = this.housingTempData;
                }
                else {
                    this.toAgyLocId = undefined;
                    this.housingData = undefined;
                } */
                if(this.toAgyLocId){
                    this.housingData = this.housingTempData; 
                }else{
                    this.housingData = undefined; 
                }
                this.offemModel.arrestAgencyLocId = '';
                this.offemModel.escortCode = '';
                this.offemModel.commentText = '';
                this.offbkgsModel.bookingNo = '';
                this.bedahModel.dspDescription = this.housingData;
            }
            this.offemModel.bookingStatus = event.bookingStatus;
            this.offemModelTemp.bookingStatus = event.bookingStatus;
            this.offemModelTemp.offenderBookId = event.offenderBookId;
            for (let i = 0; i < this.offbkgsData.length; i++) {
                if (this.offbkgsData[i].activeFlag === 'Y') {
                    this.offEmReadOnly = true;
                    this.bedAhReadOnly = true;
                    this.disableHousingUnit = true;
                    this.housingdialogTooltip = "";
                    this.saveReadOnly = true;
                    return;
                }
            }
        }
    }
    ok() {
    }
    no() {
    }
    cancel() {
        if (this.offbkgModelTemp.offenderBookId) {
            this.offemModel = new OffenderExternalMovements();
            this.offbkgsModel = new OffenderBookings();
            this.bedAhReadOnly = true;
            this.disableHousingUnit = true;
            this.housingdialogTooltip = "";
            this.newbooking = false;
            this.movementTime = '';
            this.offbkgsModel.bookingNo = '';
            this.bedahModel.dspDescription = '';
            this.bkgReadOnly = true;
            this.movementDate = null;
            this.toAgyLocId = '';
            this.offbkgModelData = new VHeaderBlock2();
        } else {
            this.offemModel = new OffenderExternalMovements();
            this.offbkgsModel = new OffenderBookings();
            this.bedAhReadOnly = true;
            this.disableHousingUnit = true;
            this.housingdialogTooltip = "";
            this.newbooking = false;
            this.movementTime = '';
            this.offbkgsModel.bookingNo = '';
            this.bedahModel.dspDescription = '';
            this.bkgReadOnly = true;
            this.movementDate = null;
            this.toAgyLocId = '';
            this.offbkgModelData = new VHeaderBlock2();
        }
        this.txnEntryAmount = undefined;
        this.defaultDedFlag = false;
        this.receiptNumber = undefined;
        this.txnId = undefined;
    }
    setDescription(event) {
        this.bedDescFlag = true;
        this.bedahModel.dspDescription = event.dspDescription;
    }

    onButSave() {
        this.saveReadOnly = true;      
        if (this.caseloadAgyCount === 0) {
            this.offEmReadOnly = true;
            this.bkgReadOnly = true;
            return;
        }
       if(this.offbkgModel.inOutStatus === 'OUT' && (this.offbkgModel.activeFlag === 'N' || this.offbkgModel.communityActiveFlag === 'N'))
        {
            this.alertPopUp();        
        }else{
            this.finalSave();
        }
        
    }

    finalSave(){
        if(this.offemModel.fromAgyLocId===undefined || this.offemModel.fromAgyLocId===null || !this.offemModel.fromAgyLocId){
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.fromAgyLocId');
            this.show();
            return;
        }
        this.offemCommitModel.insertList = [];
        this.offemCommitModel.updateList = [];
        this.offemInsertList = [];
        this.offemModel.movementDate = this.movementDate;
        this.offemModel.toAgyLocId = this.toAgyLocId;
        this.offemModelTempData = this.offemModel;
        if (this.movementTime) {
            let hours = DateFormat.getDate(this.movementTime).getHours();
            let min = DateFormat.getDate(this.movementTime).getMinutes();
            this.offemModel.movementDate = DateFormat.getDate(DateFormat.getDate(this.offemModel.movementDate).setHours(hours, min, 0));
            const lMovementTime = this.movementTime.getHours() + ':' + this.movementTime.getMinutes();
            this.offemModelTempData.movementTime = TimeFormat.parse(lMovementTime, this.offemModelTempData.movementDate);
        } else {
            this.offemModelTempData.movementTime = undefined;
        }
        if (!this.offemModelTempData.movementDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.datemustbeentered');
            this.show();
            this.saveReadOnly = false;
            return;
        }
        if (DateFormat.compareDate(DateFormat.getDate(this.offemModelTempData.movementDate), DateFormat.getDate()) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbemequaltocurrentdate');
            this.show();
            this.saveReadOnly = false;
            return;
        }
        if (!this.offemModelTempData.movementTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.timemustbeentered');
            this.show();
            this.saveReadOnly = false;
            return;
        }
        if (DateFormat.compareDateTime(this.offemModelTempData.movementTime, DateFormat.getDate()) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.currentTimevalidation');
            this.show();
            this.saveReadOnly = false;
            return;
        }
        if (this.lastMovementDate !== undefined) {
            this.lastMovementDate = DateFormat.getDate(this.lastMovementDate);
            if (DateFormat.compareDate(this.lastMovementDate, DateFormat.getDate(this.offemModelTempData.movementDate)) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidadmis.lastmovementdatevalidation');
                this.show();
                this.saveReadOnly = false;
                return;
            }
        }
        if (this.lastMovementTime !== undefined) {
            this.lastMovementTime = DateFormat.getDate(this.lastMovementTime);
            if (DateFormat.compareDateTime(this.lastMovementTime, this.offemModelTempData.movementTime) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidadmis.lastmovementdatetimevalidation');
                this.show();
                this.saveReadOnly = false;
                return;
            }
        }
        if (!this.offemModelTempData.fromAgyLocId || this.offemModelTempData.fromAgyLocId === '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.placeholderselectfromlocation');
            this.show();
            this.saveReadOnly = false;
            return;
        }
        if (!this.offemModelTempData.movementReasonCode || this.offemModelTempData.movementReasonCode === '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.movementreasoncode');
            this.show();
            this.saveReadOnly = false;
            return;
        }
        if (!this.offemModelTempData.toAgyLocId || this.offemModelTempData.toAgyLocId === '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.tolocationmust');
            this.show();
            this.saveReadOnly = false;
            return;
        }

        this.offemModelTempData.livUnitDesc = this.bedahModel.dspDescription;
        if (!this.offemModelTempData.livUnitDesc || this.offemModelTempData.livUnitDesc === '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.housinglocationmustentered');
            this.show();
            this.saveReadOnly = false;
            return;
        }
        if (this.trustFlagData && !this.txnEntryAmount) {
            this.type = 'warn';
            this.message = this.translateService.translate('Cash on Arrival must be entered.');
            this.show();
            this.saveReadOnly = false;
            return;
        }
        this.age = undefined;
        if (this.caseloadadmotherprofilesData.length > 0) {
            this.caseloadadmotherprofilesData.forEach(val => {
                if (this.toAgyLocId === val.agyLocId) {
                    if (val.youngOffenderAge) {
                        this.age = val.youngOffenderAge;
                    }
                }
            });
        }
        if (Number(this.age) > Number(this.ageVal)) {
            this.age = undefined;
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.agevalidation');
            this.show();
            this.saveReadOnly = false;
            return;
        }
        this.offemModelTempData.bookingStatus = this.offemModelTemp.bookingStatus;
        this.offemModelTempData.offenderId = this.offbkgModelTemp.offenderId;
        this.offemModelTempData.rootOffenderId = this.offbkgModelTemp.rootOffenderId;
        this.offemModelTempData.offenderBookId = this.offbkgModelTemp.offenderBookId;
        this.offemModelTempData.assignedStaffId = this.offbkgModelTemp.assignedStaffId;
        this.offemModelTempData.modifyDatetime = DateFormat.getDate();
        this.offemModelTempData.createUserId = this.sessionManager.getId();
        this.offemModelTempData.modifyUserId = this.sessionManager.getId();
        this.offemModelTempData.movementDate = this.offemModel.movementDate;
        this.offemModelTempData.newBookingFlag = this.newbooking;
        this.offemModelTempData.notification = this.bedahModel.notification;
        this.offemModelTempData.caseloadId = this.sessionManager.currentCaseLoad;
        this.offemModelTempData.birthDate = this.offbkgModelTemp.birthDate;
        this.offemModelTempData.admissionType= this.admissionType;
        this.offemInsertList.push(this.offemModelTempData);
        this.offemCommitModel.insertList = this.offemInsertList;
        this.offemCommitModel.updateList = this.offemUpdateList;
            this.checkConflictSave()
    }
     alertPopUp() {
        const offAlertMsgResult = this.oidadmisFactory.getOffenderAlertMsg(this.offbkgModel);
        offAlertMsgResult.subscribe(result => {
            if (result.length > 0) {
                const data = {
                    label: result.join('<br>'), yesBtn: true, noBtn: false,
                    yesLabel: this.translateService.translate('common.ok')
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                    this.finalSave();
                });
            }
            else{
                this.finalSave();
            }
        });
    }

    checkConflictSave() {
        this.offemBean = new OffenderExternalMovements();
        this.offemBean.offenderBookId = this.offbkgModel.offenderBookId;
        this.offemBean.offenderId = this.offbkgModel.offenderId;
        this.offemBean.livingUnitId = this.bedahModel.livingUnitId;
        this.offemBean.livUnitDesc = this.offemModelTempData.livUnitDesc;
        if (this.bedDescFlag) {
            this.offEmCommitEvent();
        } else {
            this.getConflictEvent();
        }
    }
    getConflictEvent(){
        const conflictData = this.oidadmisFactory.getConflictEvent(this.offemBean);
        conflictData.subscribe(conBean => {
            if (conBean &&  conBean.warningMsg!=='EMPTYDATA') {
                const notification=conBean.warningPrompt+'  ' +this.translateService.translate('oidadmis.nonAssWarningMsg') +'\n\n' + conBean.warningMsg;
                const dataObj = {
                    warningMsg: this.translateService.translate('omuavbed.selectedOffender')+' '+conBean.warningPrompt+' '+this.translateService.translate('omuavbed.housedinsameunit')+'\n' + conBean.warningMsg +'\n\n\n'+this.translateService.translate('oidadmis.doYouWant') , 
                    yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/OCUWARNG', dataObj, 50).subscribe(result => {
                    if (result) {
                        if(this.offemCommitModel && this.offemCommitModel.insertList.length>0){
                            this.offemCommitModel.insertList[0].notification=notification;
                        }
                        this.offEmCommitEvent();
                    } else {
                        this.saveReadOnly = false;
                        return;
                    }
                });
            } else {
                this.offEmCommitEvent();
            }

        });
    }
    offEmCommitEvent() {
        this.bedDescFlag=true;
        const offemSaveData = this.oidadmisFactory.offEmCommit(this.offemCommitModel);
        offemSaveData.subscribe(data => {
            if (data && data.sealFlag && Number(data.sealFlag) === 101 ) {
                this.type = 'error';
                this.message = this.translateService.translate('otdcntac.errortransactionoperationtable');
                this.show();
                this.saveReadOnly = false;
                return;
            }
            if (data && data.sealFlag && Number(data.sealFlag) === 18 ) {
               this.value=Number(data.sealFlag);
            }
            if (!data.livingUnitId) {
                this.type = 'error';
                this.message = this.translateService.translate('oidadmis.livingunitid');
                this.show();
                this.saveReadOnly = false;
                return;
            }
            if (!data.statusReason) {
                this.type = 'error';
                this.message = this.translateService.translate('oidadmis.notvalidforadmission');
                this.show();
                this.saveReadOnly = false;
                return;
            }
            if (data !== 0) {
                this.offbkgsModel = data;
                this.offbkgModel.statusDisplay = 'ACTIVE';
                this.offbkgModel.activeFlag = this.offbkgsModel.activeFlag;
                this.offbkgModel.prisonLocation = this.offbkgsModel.livUnitDesc;
                this.offbkgModel.statusReason = 'ADM' + '-' + this.offbkgsModel.statusReason;
                this.offbkgModel.bookingStatus = this.offbkgsModel.bookingStatus;
                this.offbkgModel.offenderBookId = this.offbkgsModel.offenderBookId;

                this.offbkgModel.livingUnitId = this.offbkgsModel.livingUnitId;
                this.offbkgModel.bookingType = this.offbkgsModel.bookingType;
                this.offbkgModel.createAgyLocId = this.offbkgsModel.createAgyLocId;
                this.offbkgModel.livUnitDesc = this.offbkgsModel.livUnitDesc;
                const offData = this.oidadmisFactory.offBookingCommit(this.offbkgModel);
                offData.subscribe(offResult => {
                    if(this.value==18){
                        this.type = 'success';
                        this.message = this.translateService.translate('oidadmis.iepconfigurationismissed');
                        this.show();
                        this.saveReadOnly = false;
                        this.movementDateFlag = true;
                        this.disableHousingUnit = true;
                        this.offbkgsExecuteQuery();  
                    }else if (offResult[0] === 0) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                        this.saveReadOnly = false;
                        this.offbkgsExecuteQuery();
                    } else {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                        this.saveReadOnly = false;
                        this.movementDateFlag = true;
                        this.disableHousingUnit = true;
                        this.offbkgsExecuteQuery();
                    }
                    if (this.offbkgModel.agyLocId) {
                        this.offbkgModel.agyLocId = this.caseLoadId;
                    }
                    this.offbkgModel.agyLocId = this.sessionManager.currentCaseLoad;
                    this.offbkgBean = new VHeaderBlock2();
                    this.offbkgBean.offenderIdDisplay = this.offbkgModel.offenderIdDisplay;
                    this.offbkgBean.agyLocId = this.offbkgModel.agyLocId;
                    if (this.trustFlagData) {
                        this.offtxnInsertList = [];
                        this.offtxnUpdateList = [];
                        this.offtxnDeleteList = [];
                        this.offtxnCommitModel.updateList = [];
                        this.offtxnCommitModel.insertList = [];
                        this.offtxnModel.caseloadId = this.sessionManager.currentCaseLoad;
                        this.offtxnModel.offenderId = this.offbkgModel.rootOffenderId;
                        this.offtxnModel.txnPostingType = 'CR';
                        this.offtxnModel.slipPrintedFlag = 'N';
                        this.offtxnModel.receiptPrintedFlag = 'Y';
                        this.offtxnModel.deductionFlag = this.defaultDedFlag ? 'Y' : 'N';
                        this.offtxnModel.txnEntryAmount = this.txnEntryAmount;
                        this.offtxnModel.txnAdjustedFlag = 'Y';
                        this.offtxnModel.holdClearFlag = 'Y';
                        this.offtxnModel.adjustTxnEntryId = 99;
                        this.offtxnModel.txnEntryDate = DateFormat.getDate();
                        this.offtxnModel.modifyDate = DateFormat.getDate();
                        this.offtxnModel.createDateTime = DateFormat.getDate();
                        this.offtxnModel.createUserId = this.sessionManager.getId();
                        this.offtxnModel.modifyUserId = this.sessionManager.getId();
                        this.offtxnInsertList.push(this.offtxnModel);
                        this.offtxnCommitModel.insertList = this.offtxnInsertList;
                        const offtxnSaveData = this.otdcntacFactory.offTxnCommit(this.offtxnCommitModel);
                        offtxnSaveData.subscribe(offtxnSaveResult => {
                            this.receiptNumber =   offtxnSaveResult.receiptNumber;
                            this.txnId = offtxnSaveResult.txnId;
                        });
                    }
                    const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.offbkgBean);
                    offbkGlobal.subscribe(list => {
                        if (list.length > 0) {
                            this.offenderSearchService.selectedOffender = list[0];
                            this.offbkgModel = list[0];
                            this.offbkgModelData = list[0];
                            this.flag = true;
                            //Update External system Table
                            if (this.externalsystemId) {
                                let offenderInfo = {
                                    'offenderBookId': this.offenderSearchService.selectedOffender.offenderBookId,
                                    'offenderId': this.offenderSearchService.selectedOffender.offenderId,
                                    'bookingNumber': this.offenderSearchService.selectedOffender.bookingNo,
                                    'requestId': this.externalsystemId
                                };
                                this.portalAppService.updatePersonStatus(offenderInfo).subscribe(result => {
                                });
                            }
                        } else {
                            this.offbkgModelData = new VHeaderBlock2();
                        }
                    });
                    return;
                });
            }
        });
        this.offemModel = new OffenderExternalMovements();
        this.movementTime = '';
        this.newbooking = null;
        this.offbkgsModel = new OffenderBookings();
        this.bedahModel.dspDescription = '';
        this.cancelReadOnly = true;
        this.defaultDedFlag = false;
        this.receiptNumber = undefined;
        this.txnId = undefined;
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    offbkgsExecuteQuery() {
        if (!this.offbkgModel.offenderBookId) {
            if(this.toAgyLocId === undefined || this.toAgyLocId === '' || this.caseloadAgyCount > 1){
                this.bedAhReadOnly = true;
                this.disableHousingUnit = true;
            } else {
                this.bedAhReadOnly = false;
                this.disableHousingUnit = false;
            }
            this.housingdialogTooltip = "";
            this.saveReadOnly = true;
            this.offEmReadOnly = true;
        }
        this.offbkgsModel.rootOffenderId = this.offbkgModel.rootOffenderId;
        const offbkgsResult = this.oidadmisFactory.offBkgsExecuteQuery(this.offbkgsModel);
        offbkgsResult.subscribe(offbkgsResultList => {
            if (offbkgsResultList.length === 0) {
                this.offbkgsData = [];
                this.housingdialogTooltip = "";
                this.saveReadOnly = false;
                this.offEmReadOnly = false;
            } else {
                this.offbkgsData = offbkgsResultList;
                this.offbkgsModelTemp = this.offbkgsData[0];
                this.offEmReadOnly = true;
                this.disableHousingUnit = true;
                this.housingdialogTooltip = "";
                this.saveReadOnly = true;
                if (this.movementDateFlag) {
                    this.movementDate = null;
                    this.movementDateFlag = false;
                }
                this.oidadmisPostQueryTrigger();
            }
            this.tableIndex = 0;
        });
        this.offemModel = new OffenderExternalMovements();
        this.bedahModel.dspDescription = '';
        this.movementTime = '';
        this.newbooking = false;
        this.offbkgsModel.bookingNo = '';
    }
    changeCenterType(event) {
        if(event.agyLocId){
            this.toAgyLocId = event.agyLocId;
        }else{
            this.toAgyLocId = undefined
        }
        this.bedahModel.dspDescription = undefined;
        if(this.toAgyLocId === undefined || this.toAgyLocId === '' || this.caseloadAgyCount > 1){
            this.bedAhReadOnly = true;
            this.disableHousingUnit = true;
        } else {
            this.bedAhReadOnly = false;
            this.disableHousingUnit = false;
        }
        if (event == undefined) {
            this.bedahModel.dspDescription = '';
        }
        if (event) {
            if (event.code && !this.offEmReadOnly) {
                this.housingdialogTooltip = "";
                this.bedAhReadOnly = false;
                this.disableHousingUnit = false;
                this.modalData = { agyLocId: event.code };
                const imageId = this.housingService.searchBaseImageForLocation(event.code).subscribe(imageId => {
                    if (imageId != 0) {
                        this.disableHousingUnit = false;
                        this.housingdialogTooltip = "";
                    } else {
                        this.housingdialogTooltip = this.translateService.translate('housing.facilitydoesnotcontainanyimage');
                    }
                });
            } else {
                if(this.toAgyLocId === undefined || this.toAgyLocId === '' || this.caseloadAgyCount > 1 ){
                    this.bedAhReadOnly = true;
                    this.disableHousingUnit = true;
                } else {
                    this.bedAhReadOnly = false;
                    this.disableHousingUnit = false;
                }
                this.saveReadOnly = true;
            }
            if (this.offbkgModel.agyLocId === 'TRN' || this.offbkgModel.statusReason === 'REL-ESCP' ||
                !this.offbkgModel.statusDisplay || this.offbkgModel.statusDisplay) {
            } else {
                this.livingunitsModel.pAgyLocId = event.code;
                this.livingunitsExecuteQuery();
            }
            const queryParams = { caseloadId: this.sessionManager.currentCaseLoad };
            const caseloadadmotherprofilesResult = this.oimadmisFactory.caseloadAdmOtherProfilesExecuteQuery(queryParams);
            caseloadadmotherprofilesResult.subscribe(caseloadResultList => {
                caseloadResultList.forEach(element => {
                    if (event.code === element.agyLocId) {
                        if (element.livingUnitDesc) {
                            this.bedDescFlag = false;
                            if (element.avalibleBedsInLocation <= 0) {
                            this.type = 'warn';
                           this.message = this.translateService.translate('oidadmis.defaultloccapacityfull');
                            this.show();
                            this.bedahModel.livingUnitId = undefined;
                             this.bedahModel.dspDescription = undefined;
                            }
                            else { 
                                this.bedahModel.livingUnitId = element.livingUnitId;
                                if (this.toAgyLocId) {
                                    this.bedahModel.dspDescription = element.livingUnitDesc;
                                    this.checkAllConficts();
                                } else {
                                    this.bedahModel.dspDescription = undefined;
                                }
                            }
                        }
                    }
                });
            });
        } else {
            this.validData = [];
        }
    }
    reasonCodeChange(event) {
        if (event) {
            if (event.code === 'INT') {
                this.bkgReadOnly = true;
            }
        }
    }
    livingunitsExecuteQuery() {
        const livingunitsResult = this.omuavbedFactory.livingUnitsExecuteQuery(this.livingunitsModel);
        livingunitsResult.subscribe(livingunitsResultList => {
            if (livingunitsResultList.length === 0) {
                this.livingunitsData = [];
            } else {
                livingunitsResultList.forEach(living => {
                    living.unitAtCapacity = (living.unitAtCapacity === 'Y') ? true : false;
                    living.prisonerConflict = (living.prisonerConflict === 'Y') ? true : false;
                    living.securityConflict = (living.securityConflict === 'Y') ? true : false;
                    living.cellSharingConflict = (living.cellSharingConflict === 'Y') ? true : false;
                });
                this.livingunitsData = livingunitsResultList;
                this.bedahModel.livingUnitId = this.livingunitsData[0].livingUnitId;
                if (this.toAgyLocId) {
                    this.bedahModel.dspDescription = this.livingunitsData[0].description;
                } else {
                    this.bedahModel.dspDescription = undefined;
                }
            }
        });
    }
    offemExecuteQuery() {
        if (this.caseloadAgyCount === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.therearenoactiveagencylocations');
            this.show();
            this.offEmReadOnly = true;
            this.bkgReadOnly = true;
            return;
        }
         if (this.populateDefaultValues) {
            this.cgfkChkOffBkgsOffBkgRef(true);
            return;
         }

        if (this.offbkgModel.lastName) {
            if (this.reasonReadOnly === false) {
                if (this.offbkgModel.rootOffenderId) {
                    if (!this.offbkgModel.statusReason || this.offbkgModel.statusReason === 'REL-ESCP') {
                        this.getAdmissionType();
                    } else {
                        this.reasonCode = this.offbkgModel.statusReason;
                        this.getAdmissionType();
                    }
                }
            }
            for (let i = 0; i < this.offbkgsData.length; i++) {

                if (this.offbkgsData[i].activeFlag === 'Y') {
                    this.type = 'info';
                    this.message = this.translateService.translate('oidadmis.activebookingrecordexist');
                    this.show();
                    return;
                }
                this.offbkgsModel.livUnitDesc = this.offbkgsData[i].livUnitDesc;
            }
            if (this.offEmReadOnly === true) {
                if (this.offbkgModel.activeFlag === 'N') {
                    const data = {
                        label: this.translateService.translate('oidadmis.openanolderbooking'), yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidadmisconfirmbox', data, 50).subscribe(result => {
                        if (result) {
                            if (this.offbkgModel.inOutStatus === 'In Tran') {
                                this.type = 'info';
                                this.message = this.translateService.translate('oidadmis.offenderhasatransfer');
                                this.show();
                                return;
                            } else {
                                this.offEmReadOnly = false;
                                this.reasonLink = 'oidadmis/cgfkOffEmDspDescriptionRGroup';
                                this.reasonReadOnly = true;
                                return;
                            }
                        } else {
                            return;
                        }
                    });
                }
            }
            this.lastMovementDate = undefined;
            this.lastMovementTime = undefined;
            if (this.offbkgModel.offenderBookId === 0) {
                this.offbkgModel.offenderBookId = null;
                this.lastMovementDate = undefined;
                this.lastMovementTime = undefined;
            } else {
                const offemMovResult = this.oidadmisFactory.validateMovementDatemaxDate(this.offbkgModel.offenderBookId);
                offemMovResult.subscribe(result => {
                    if (result.movementDate) {
                        this.lastMovementDate = result.movementDate;
                        this.lastMovementTime = result.movementTime;
                    }
                });
            }
            this.offemModel.livUnitDesc = this.offbkgModel.prisonLocation;
            //New Offender for which booking has not been created yet.
            if (!this.offbkgModel.offenderBookId) {
                this.offemModel.offenderBookId = undefined;
                this.offemModel.fromAgyLocId = ( this.fromLocationFlag)?'OUT':null;
                this.offemModel.movementReasonCode = 'NEW';
                this.offemModel.directionCode = 'IN';
                this.offemModel.activeFlag = 'Y';
                this.movementTime = DateFormat.getDate();
                this.movementDate = DateFormat.getDate();
                const cDate = DateFormat.getDate(this.movementDate);
                cDate.setHours(0, 0, 0, 0);
                this.movementDate = cDate;
                this.cgfkChkOffBkgsOffBkgRef();
            } else {
                //Fetch record on the base of booking id.
                const offemResult = this.oidadmisFactory.offEmExecuteQuery(this.offbkgModel);
                offemResult.subscribe(offemResultList => {
                    if (!this.offEmReadOnly) {
                        this.offemModel = new OffenderExternalMovements();
                        for (let i = 0; i < offemResultList.length; i++) {
                            this.movementTime = DateFormat.getDate();
                            this.offemModel.offenderBookId = undefined;
                            this.offemModel = offemResultList[i];
                            this.movementDate = DateFormat.getDate();
                            const cDate = DateFormat.getDate(this.movementDate);
                            cDate.setHours(0, 0, 0, 0);
                            this.movementDate = cDate;
                            if (this.offbkgModel.agyLocId === 'TRN') {
                                this.offemModel.fromAgyLocId = offemResultList[i].fromAgyLocId;
                                this.offemModel.toAgyLocId = '';
                                this.toAgyLocId = '';
                                this.offemModel.movementReasonCode = 'INT';
                                this.bedahModel.dspDescription = '';
                            } else {
                                this.offemModel.fromAgyLocId = ( this.fromLocationFlag)?'OUT':null;
                                this.offemModel.movementReasonCode = 'NEW';
                            }
                            this.cgfkChkOffBkgsOffBkgRef();
                        }
                        this.offemModel.arrestAgencyLocId = undefined;
                        this.offemModel.escortCode = undefined;
                        this.offemModel.commentText=undefined;
                    }
                });
            }
            if (this.trustFlagData) {
                this.txnEntryAmount = '0.00';
                this.defaultDedFlag = true;
            }
            if (this.sessionManager.currentCaseLoad === this.toAgyLocIdData) {
                this.toAgyLocId = this.toAgyLocIdData;
            }

            // Only retrieve the data once per inmate
            this.populateDefaultValues = true;
        }
    }
    cgfkChkOffBkgsOffBkgRef(eve?) {
        if (!this.offbkgModel.bookingNo || this.offbkgModel.activeFlag === 'N') {
            if (this.offbkgModel.statusReason === 'REL-ESCP') {
                if(!eve){
                    this.offemModel.movementReasonCode = 'RECA';
                }
                this.offemModel.toAgyLocId = this.toAgyLocId;
            }
        }
        for (let i = 0; i < this.offbkgsData.length; i++) {
            if (this.offbkgModel.bookingNo === this.offbkgsData[i].bookingNo) {
                if ((this.offbkgsData[i].activeFlag === 'N' && this.offbkgsData[i].bookingStatus === 'C')) {
                    this.newbooking = true;
                    this.offbkgsModel.bookingNo = '';
                    this.bkgReadOnly = false;
                }
                if (this.offbkgsData[i].activeFlag === 'N' && this.offbkgsData[i].bookingStatus === 'O') {
                    this.offbkgsModel.bookingNo = this.offbkgsData[i].bookingNo;
                    this.newbooking = false;
                    this.bkgReadOnly = true;
                }
            }
        }
        if (this.reasonReadOnly === true) {
            this.saveReadOnly = true;
        } else {
            this.saveReadOnly = false;
            this.reasonReadOnly = false;
        }
        if (!this.offbkgModel.activeFlag || this.offbkgModel.activeFlag === null) {
            if(this.offbkgModel.offenderBookId){
                this.newbooking = false;
            } else {
                this.newbooking = true;
            }
            this.bkgReadOnly = true;
        }
        this.cancelReadOnly = false;
    }
    oidadmisPostQueryTrigger() {
        this.systemModel.triggerBlock = 'offBkgs';
        if (this.systemModel.triggerBlock === 'offBkgs') {
            for (let i = 0; i < this.offbkgsData.length; i++) {
                if (this.offbkgsData[i].activeFlag === 'Y') {
                    this.offbkgsData[i].cgnbtActiveFlag = 'ACTIVE';
                }
                if (this.offbkgsData[i].activeFlag === 'N') {
                    this.offbkgsData[i].cgnbtActiveFlag = 'INACTIVE';
                }
                if (this.offbkgsData[i].activeFlag == null) {
                    this.offbkgsData[i].cgnbtActiveFlag = 'NO BOOKING';
                }
                if (this.offbkgsData[i].communityActiveFlag === 'Y') {
                    this.offbkgsData[i].cgnbtCommunityActiveFlag = 'ACTIVE';
                }
                if (this.offbkgsData[i].communityActiveFlag === 'N') {
                    this.offbkgsData[i].cgnbtCommunityActiveFlag = 'INACTIVE';
                }
                if (this.offbkgsData[i].communityActiveFlag == null) {
                    this.offbkgsData[i].cgnbtCommunityActiveFlag = 'NO BOOKING';
                }
            }
        }
    }
    clickReason(event) {
        if (this.reasonReadOnly === true) {
            this.type = 'info';
            this.message = this.translateService.translate('oidadmis.listofvaluescontains');
            this.show();
            this.saveReadOnly = false;
            this.offemModel.movementReasonCode = null;
            return;
        }
    }
    ngOnDestroy() {
        if (this.offbkgModelTemp) {
            if (this.offbkgModelTemp.offenderBookId === 0) {
                this.offbkgModelTemp.offenderBookId = null;
            }
            if (!this.offbkgModelTemp.offenderBookId) {
                this.offenderSearchService.selectedOffender = undefined;
            }
            if (!this.flag && this.router.url !== '/OMUAVBED' && this.offbkgModelTemp.offenderBookId) {
                this.offenderSearchService.selectedOffender = this.offbkgModelTemp;
            }
            if (this.sessionManager.currentCaseLoad === 'COMM') {
                this.offenderSearchService.selectedOffender = undefined;
            }
        }
    }


    openDialog() {
        if (this.toAgyLocId == undefined || this.toAgyLocId == null || this.toAgyLocId == '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.tolocationmust');
            this.show();
            return false;
        }
        this.offbkgModel.agyLocId = this.toAgyLocId;
        this.dialogService.openLinkDialog('/HOUSING', this.offbkgModel, 100, 100, undefined, "cdk-overlay-pane-housing").subscribe(result => {
            if (result) {
                this.bedahModel.dspDescription = result.allocated;
            }
        });
    }
    housingSelectionClick = () =>{
        if (this.toAgyLocId == undefined || this.toAgyLocId == null || this.toAgyLocId == '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidadmis.tolocationmust');
            this.show();
            return false;
        }
        this.bedahModel.notification='';
        if(!this.modalData){
            this.modalData={agyLocId:this.toAgyLocId,offenderId:this.offbkgModelTemp.offenderId};
        }else{
            this.modalData={agyLocId:this.toAgyLocId,offenderId:this.offbkgModelTemp.offenderId};
        }
        this.dialogService.openLinkDialog('/omuavbed', this.modalData, 90).subscribe(result => {
            if (result) {
                this.bedDescFlag = true;
                this.bedahModel.dspDescription = result.dspDescription;
                this.bedahModel.livingUnitId=result.livingUnitId;
                this.bedahModel.notification = result.warningMsg;
                this.bedahModel.isNonAssocOverriddenWarn=result.isNonAssocOverriddenWarn?result.isNonAssocOverriddenWarn:'N';
            }
        });
    }
    newBookingChange(event) {
        if (event.checked) {
            this.offbkgsModel.bookingNo = '';
        } else {
            this.offbkgsModel.bookingNo = this.offbkgModelTemp.bookingNo;


        }
    }
    get disableBtns() {
        if (this.movementDate || this.toAgyLocId || this.offemModel.fromAgyLocId || this.offemModel.movementReasonCode ||
            this.offemModel.arrestAgencyLocId || this.movementTime || this.newbooking || this.offemModel.escortCode ||
            this.offemModel.commentText) {
            return false;
        }
        return true;
    }

    onAmountBlur(amount) {
        this.amountFormat.precisionFlot(amount);
    }
    amountKeyDown(event, comp) {
        if (!this.amountFormat.avoidKeys(event, this.txnEntryAmount)) {
            event.stopPropagation();
            return false;
        }
    }
    onGeneratePayplnClick = () => {
        const data = { caseloadId: this.offbkgModel.caseLoadId, rootOffenderId: this.offbkgModel.rootOffenderId };
        const offtxnSaveData = this.oidadmisFactory.chkOffenderDeductions(data);
        offtxnSaveData.subscribe(defFlag => {
            if (defFlag === 'Y') {
                this.dialogService.openLinkDialog('/OCUOVROB', this.offbkgModel, 80).subscribe(result => {
                });
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('This offender has no pending obligations.');
                this.show();
            }
        });
    }

    get saveFlag(){
        if(this.populateDefaultValues && (this.movementDate || this.offemModel.fromAgyLocId ||
             this.offemModel.movementReasonCode || this.movementTime || this.toAgyLocId || 
             this.bedahModel.dspDescription || this.offemModel.arrestAgencyLocId || this.newbooking || this.offemModel.escortCode
             || this.offemModel.commentText || this.txnEntryAmount || this.defaultDedFlag || this.receiptNumber    )){
                 return false;
             }else{
                 return true;
             }
    }

    get clearFlag(){
        if(this.populateDefaultValues && (this.movementDate || this.offemModel.fromAgyLocId ||
            this.offemModel.movementReasonCode || this.movementTime || this.toAgyLocId || 
            this.bedahModel.dspDescription || this.offemModel.arrestAgencyLocId || this.newbooking || this.offemModel.escortCode
            || this.offemModel.commentText || this.txnEntryAmount || this.defaultDedFlag || this.receiptNumber    )){
                return false;
            }else{
                return true;
            } 
    }
    onLocationChange(event){
        console.log(event);
    }

    getToLocations() {
        this.oidadmisFactory.cgfkOffEmDspDescriptionCaseloadIdRecordGroup(this.sessionManager.currentCaseLoad).subscribe(data => {
            if (data.length > 0) {
                data.forEach(e => {
                    if (e.agyLocId === this.sessionManager.currentCaseLoad) {
                        this.toAgyLocId = e.agyLocId;
                    }
                });
            } else {
                this.toAgyLocId = undefined;
            }
        });
    }
    fromLocationChange(event){
        this.offemModel.fromAgyLocId=event.agyLocId;
    }
    getFromLocationList() {
        this.oidadmisFactory.getFromLocationList().subscribe(data => {
            if (data) {
                data.forEach(e => {
                    if(e.agyLocId==='OUT'){
                        this.fromLocationFlag=true;
                    }
                });

            }
        });
    }
    
}
