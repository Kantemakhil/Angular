import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidciponService } from '../service/oidcipon.service';
import { OffenderCipDetails } from '@instcareinplacementbeans/OffenderCipDetails';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Offenders } from '@commonbeans/Offenders';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderExternalMovements } from '@common/beans/OffenderExternalMovements';
import { PlacementDurations } from '../beans/PlacementDurations';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { OffenderCipDetailsCommitBean } from '@instcareinplacementbeans/OffenderCipDetailsCommitBean';
import { OidoicusService } from '@inst/incidents-oic/service/oidoicus.service';
import { OidchlocService } from '@inst/movements/housingchanges/service/oidchloc.service';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
// import required bean declarations

@Component({
    selector: 'app-oidcipon',
    templateUrl: './oidcipon.component.html'
})

export class OidciponComponent implements OnInit {

    // Variable declaration
    @ViewChild('grid', { static: true }) grid: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offenderObj: Offenders = new Offenders();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    offcipdetailsCommitModel: OffenderCipDetailsCommitBean = new OffenderCipDetailsCommitBean();
    type: string;
    message: string;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offcipdetailsBean: OffenderCipDetails = new OffenderCipDetails();
    offcipdetailsData: OffenderCipDetails[] = [];
    offcipdetailsDataTemp: OffenderCipDetails[] = [];
    offcipdetailsModel: OffenderCipDetails = new OffenderCipDetails();
    voffcipdetailsModel: OffenderCipDetails = new OffenderCipDetails();
    offcipdetailsIndex = 0;
    offcipdetailsInsertList: OffenderCipDetails[] = [];
    offcipdetailsUpdateList: OffenderCipDetails[] = [];
    offcipdetailsDeleteList: OffenderCipDetails[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    warnMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offCipDetailsColumnDef: any[];
    bedAhColumnDef: any[];
    bedAhReadOnly = false;
    sysPflReadOnly = false;
    crtMvTmpReadOnly = false;
    offCipDetailsReadOnly = false;
    rgplacementreasonRg: any[] = [];
    rgplacementtypeRg: any[] = [];
    rgagylocsRg: any[] = [];
    rgrequestedbyRg: any[] = [];
    rgauthorizedbyRg: any[] = [];
    rgdurationtypeRg: any[] = [];
    rgreleasedbyRg: any[] = [];
    caseloadId: any;
    placementType = 'NONE';
    tableIndex: any;
    placceUrl: any;
    durationFlag: boolean;
    addFlag = false;
    index: any;
    durationTitle = { description: 'TYPE', minimumDuration: 'MINIMUM', maximumDuration: 'MAXIMUM' };
    lstOfOffCip: OffenderCipDetails[];
    offExternalMovModel: OffenderExternalMovements = new OffenderExternalMovements();
    durationFactor: any;
    lvEffectiveDate: Date;
    lvEffectiveTime: Date;
    placeDurationModel: PlacementDurations = new PlacementDurations();
    placeDurationData: PlacementDurations[];
    minimumDuration: any;
    maximumDuration: any;
    lvExpiryDate: Date;
    lvExpiryTime: Date;
    verifySaveFlag: boolean;
    lvReleaseTime: any;
    isshowing: boolean;
    lvDaysForDates: Date;
    lvTimeForDates: Date;
    placementLink = 'NONE';
    authorizeFlag = false;
    durationTypeFlag = false;
    relByFlag = false;
    saveFlag: boolean;
    insertOrNotFlag = true;
    effectiveDateMessage: any;
    efffectiveMsgFlag = false;
    effectiveTimeMsgFlag = false;
    releaseDateMsgFlag = false;
    releaseTimeMsgFlag = false;
    clearFlag: boolean;
    detailsFieldNames: string;
    authorizeReadOnlyFlag: boolean;
    relByPerCodeReadOnlyFlag: boolean;
    durationTypeReadOnlyFlag: boolean;
    textBoxReadOnlyFlag: boolean;
    effectiveDateReadOnly: boolean;
    effectiveTimeReadOnly: boolean;
    reviewDateReadOnly: boolean;
    releaseDateReadOnly: boolean;
    reviewTimeReadOnly: boolean;
    strDurationMessage: string;
    fromReviewDateFlag: boolean;
    changedDate: Date;
    changedTime: Date;
    addDatesUpdate: Date;
    disabledFlag: boolean;
    rowIndex: number;
    backDisable: boolean = false;
    screenId ='OIDCIPON';

    constructor(private oidciponFactory: OidciponService, public translateService: TranslateService,
        private sessionManager: UserSessionManager, private renderer: Renderer2, private router: Router,
        private offenderSearchService: OffenderSearchService, private oidoicusFactory: OidoicusService,
        private oidchlocFactory: OidchlocService, private eoffenderService: EoffenderService) {
        // TODO initilize data members here..!
        this.offCipDetailsColumnDef = [];
        this.bedAhColumnDef = [];
        this.lstOfOffCip = [];
    }
    ngOnInit() {
        if(this.oidciponFactory && this.oidciponFactory.exitFlag){
            this.backDisable = true;
        }
        this.disabledFlag = true;
        this.addFlag = false;
        this.display = true;
        this.disabled = true;
        this.durationFlag = false;
        this.verifySaveFlag = false;
        this.isshowing = true;
        this.saveFlag = true;
        this.clearFlag = true;
        this.authorizeReadOnlyFlag = true;
        this.relByPerCodeReadOnlyFlag = true;
        this.durationTypeReadOnlyFlag = true;
        this.textBoxReadOnlyFlag = true;
        this.effectiveDateReadOnly = true;
        this.effectiveTimeReadOnly = true;
        this.reviewDateReadOnly = true;
        this.releaseDateReadOnly = true;
        this.reviewTimeReadOnly = true;
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.offCipDetailsColumnDef = [
            {
                fieldName: this.translateService.translate('oidcipon.type'), field: 'placementType', width: 250, editable: true,
                datatype: 'lov', domain: 'PLACE_TYPE', cellEditable: this.canEventDateEdit,
                required: true, optionWidth: 600
            },
            {
                fieldName: this.translateService.translate('oidcipon.reason'), field: 'placementReasonCode', width: 250, editable: true,
                datatype: 'lov', domain: 'PLACE_RSN', cellEditable: this.canEventDateEdit,
                required: true, parentField: 'placementType', optionWidth: 450
            },
            {
                fieldName: this.translateService.translate('oidcipon.facility'), field: 'agyLocId', width: 300, editable: true,
                datatype: 'lov', link: 'oidcipon/rgAgyLocsRecordGroup?caseloadId=' + this.caseloadId, source: 'OUMAGLOC',
                required: true, codeTitle: this.translateService.translate('oidcipon.agylocid'), optionWidth: 450
            },
            {
                fieldName: this.translateService.translate('oidcipon.requestedby'), field: 'reqByPerCode', width: 200, editable: true,
                datatype: 'lov', domain: 'CIP_REQ_BY',
                //  link: 'oidcipon/rgRequestedByRecordGroup',
                required: true, optionWidth: 450
            },
            {
				fieldName: this.translateService.translate('common.iwpdocument')
				, field: 'butIwp', datatype: 'hyperlink',onLaunchClick: this.onEoffenderClick,
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
			},
            { fieldName: '', field: 'sealFlag', hide: true },
            { fieldName: '', field: 'authByPerCode', hide: true },
            { fieldName: '', field: 'authByPerName', hide: true },
            { fieldName: '', field: 'nbtDaysServed', hide: true },
            { fieldName: '', field: 'nbtHoursServed', hide: true },
            { fieldName: '', field: 'effectiveDate', hide: true },
            { fieldName: '', field: 'effectiveTime', hide: true },
            { fieldName: '', field: 'durationType', hide: true },
            { fieldName: '', field: 'duration', hide: true },
            { fieldName: '', field: 'reviewDate', hide: true },
            { fieldName: '', field: 'expiryDate', hide: true },
            { fieldName: '', field: 'expiryTime', hide: true },
            { fieldName: '', field: 'commentText', hide: true },
            { fieldName: '', field: 'relByPerCode', hide: true },
            { fieldName: '', field: 'relByPerName', hide: true },
            { fieldName: '', field: 'releaseDate', hide: true },
            { fieldName: '', field: 'releaseTime', hide: true },


        ];
        const rgplacementtypeServiceObj = this.oidciponFactory.rgPlacementTypeRecordGroup();
        rgplacementtypeServiceObj.subscribe(rgPlacementTypeList => {
            if (rgPlacementTypeList.length === 0) {
                this.rgplacementtypeRg = [];
            } else {
                for (let i = 0; i < rgPlacementTypeList.length; i++) {
                    this.rgplacementtypeRg.push({
                        'text': rgPlacementTypeList[i].code + ' - ' +
                            rgPlacementTypeList[i].description, 'id': rgPlacementTypeList[i].code
                    });
                }
            }
        });
        const rgagylocsServiceObj = this.oidciponFactory.rgAgyLocsRecordGroup(this.caseloadId);
        rgagylocsServiceObj.subscribe(rgAgyLocslist => {
            if (rgAgyLocslist.length === 0) {
                this.rgagylocsRg = [];
            } else {
                for (let i = 0; i < rgAgyLocslist.length; i++) {
                    this.rgagylocsRg.push({
                        'text': rgAgyLocslist[i].code + ' - ' +
                            rgAgyLocslist[i].description, 'id': rgAgyLocslist[i].code
                    });
                }
            }
        });
        const rgrequestedbyServiceObj = this.oidciponFactory.rgRequestedByRecordGroup();
        rgrequestedbyServiceObj.subscribe(rgRequestedByList => {
            if (rgRequestedByList.length === 0) {
                this.rgrequestedbyRg = [];
            } else {
                for (let i = 0; i < rgRequestedByList.length; i++) {
                    this.rgrequestedbyRg.push({
                        'text': rgRequestedByList[i].code + ' - ' +
                            rgRequestedByList[i].description, 'id': rgRequestedByList[i].code
                    });
                }
            }
        });
        const rgauthorizedbyServiceObj = this.oidciponFactory.rgAuthorizedByRecordGroup();
        rgauthorizedbyServiceObj.subscribe(rgAuthorizedByList => {
            if (rgAuthorizedByList.length === 0) {
                this.rgauthorizedbyRg = [];
            } else {
                for (let i = 0; i < rgAuthorizedByList.length; i++) {
                    this.rgauthorizedbyRg.push({
                        'text': rgAuthorizedByList[i].code + ' - ' +
                            rgAuthorizedByList[i].description, 'id': rgAuthorizedByList[i].code
                    });
                }
            }
        });
        const rgreleasedbyServiceObj = this.oidciponFactory.rgReleasedByRecordGroup();
        rgreleasedbyServiceObj.subscribe(rgReleasedByList => {
            if (rgReleasedByList.length === 0) {
                this.rgreleasedbyRg = [];
            } else {
                for (let i = 0; i < rgReleasedByList.length; i++) {
                    this.rgreleasedbyRg.push({
                        'text': rgReleasedByList[i].code + ' - ' +
                            rgReleasedByList[i].description, 'id': rgReleasedByList[i].code
                    });
                }
            }
        });
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
        }
    }

    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    isInsertableAuthBy() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return;
        }
        this.clearFlag = false;
        if (this.verifySaveFlag) {
            this.saveFlag = true;
        } else {
            this.saveFlag = false;
        }
        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
    }

    onCodeBlur(value, name) {
        if(name === 'effectiveTime' && this.offcipdetailsModel.effectiveDate){
            value = TimeFormat.parse(TimeFormat.format(value),DateFormat.getDate(this.offcipdetailsModel.effectiveDate));
            this.offcipdetailsModel.effectiveTime = value;
        }
        this.grid.setColumnData(name, this.rowIndex, value);
        if(this.offcipdetailsModel.effectiveTime && this.offcipdetailsModel.duration){
            let expTime = this.offcipdetailsModel.effectiveTime.getHours() + ':' + this.offcipdetailsModel.effectiveTime.getMinutes();
            //this.offcipdetailsModel.expiryTime = TimeFormat.parse(expTime, this.offcipdetailsModel.expiryDate);
        }

    }

    isInsertableRelBy() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return;
        }
        this.clearFlag = false;
        if (this.verifySaveFlag) {
            this.saveFlag = true;
        } else {
            this.saveFlag = false;
        }
        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.oidciponCommonAlerts();
    }

    isInsertable() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return;
        }
        this.clearFlag = false;
        if (this.verifySaveFlag) {
            this.saveFlag = true;
        } else {
            this.saveFlag = false;
        }
        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.oidciponCommonAlerts();

    }
    commentInsertable() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return;
        }
        if (this.verifySaveFlag) {
            this.saveFlag = true;
        } else {
            this.saveFlag = false;
        }

        this.clearFlag = false;

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.oidciponCommonAlerts();
    }

    durationTypeInsertable() {

        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.oidciponCommonAlerts();

        if (!this.offcipdetailsModel.placementType) {
            this.show(this.translateService.translate('oidcipon.listofvaluescontains'), 'warn');
            return;
        }

        if (this.verifySaveFlag) {
            this.saveFlag = true;
        } else {
            this.saveFlag = false;
        }

        this.clearFlag = false;



    }

    onAuthorizeLovMouseDown() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.oidciponCommonAlerts();
    }
    onDurationTypeLovMouseDown() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return;
        }

        this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(
            this.offcipdetailsModel.effectiveTime),
            DateFormat.getDate(this.offcipdetailsModel.effectiveDate));

        if (this.effectiveDateMessage) {
            this.offcipdetailsModel.durationType = this.offcipdetailsModel.durationType === undefined ? '' : undefined;
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.oidciponCommonAlerts();

        if (!this.offcipdetailsModel.placementType) {
            this.offcipdetailsModel.durationType = this.offcipdetailsModel.durationType === undefined ? '' : undefined;
            this.show(this.translateService.translate('oidcipon.listofvaluescontains'), 'warn');
            return;
        }


    }

    onLovMouseDown() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.oidciponCommonAlerts();

    }
    keyPressTimes() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
    }
    reviewDateKeyPressTimes() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }
        this.reviewDateReadOnly = true;
        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.fromReviewDateFlag = true;
        this.oidciponCommonAlerts();
    }
    clickEffectiveDate() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }
        if (this.effectiveDateMessage && !this.efffectiveMsgFlag) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }

        if (!this.offcipdetailsModel.placementSeq || this.offcipdetailsModel.placementSeq === 0) {
            if (this.verifySaveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            if (!this.offcipdetailsModel.effectiveDate && !this.offcipdetailsModel.effectiveTime) {
                this.offcipdetailsModel.effectiveDate = DateFormat.getDate();
                this.offcipdetailsModel.effectiveTime = DateFormat.getDate();
            } else if (this.offcipdetailsModel.effectiveDate && !this.offcipdetailsModel.effectiveTime) {
                this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(
                    DateFormat.getDate()),
                    DateFormat.getDate(this.offcipdetailsModel.effectiveDate));

            } else if (!this.offcipdetailsModel.effectiveDate && this.offcipdetailsModel.effectiveTime) {
                this.offcipdetailsModel.effectiveDate = DateFormat.getDate(this.offcipdetailsModel.effectiveTime);


            } else if (this.offcipdetailsModel.effectiveDate && this.offcipdetailsModel.effectiveTime) {
                this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(
                    this.offcipdetailsModel.effectiveTime),
                    DateFormat.getDate(this.offcipdetailsModel.effectiveDate));
            }

        }
        if (this.offcipdetailsModel.effectiveDate) {
            this.effectiveDateWhenValidateItemTrigger(this.offcipdetailsModel.effectiveDate);
        }

        this.clearFlag = false;
    }

    clickEffectiveTime() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }
        if (this.effectiveDateMessage && !this.effectiveTimeMsgFlag) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }

        if (!this.offcipdetailsModel.placementSeq || this.offcipdetailsModel.placementSeq === 0) {
            if (this.verifySaveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            if (!this.offcipdetailsModel.effectiveDate && !this.offcipdetailsModel.effectiveTime) {
                this.offcipdetailsModel.effectiveDate = DateFormat.getDate();
                this.offcipdetailsModel.effectiveTime = DateFormat.getDate();
            } else if (this.offcipdetailsModel.effectiveDate && !this.offcipdetailsModel.effectiveTime) {
                this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(DateFormat.getDate()),
                    DateFormat.getDate(this.offcipdetailsModel.effectiveDate));
            } else if (!this.offcipdetailsModel.effectiveDate && this.offcipdetailsModel.effectiveTime) {
                this.offcipdetailsModel.effectiveDate = DateFormat.getDate(this.offcipdetailsModel.effectiveTime);
            } else if (this.offcipdetailsModel.effectiveDate && this.offcipdetailsModel.effectiveTime) {
                this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(
                    this.offcipdetailsModel.effectiveTime),
                    DateFormat.getDate(this.offcipdetailsModel.effectiveDate));
            }

        }
        if (this.offcipdetailsModel.effectiveTime) {
            this.effectiveTimeWhenValidateItemTrigger();
        }

        this.clearFlag = false;
    }



    clickReleaseDate() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }

        if (this.effectiveDateMessage && !this.releaseDateMsgFlag) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        if (!this.offcipdetailsModel.placementSeq || this.offcipdetailsModel.placementSeq === 0) {

            if (this.verifySaveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            if (!this.offcipdetailsModel.releaseDate && !this.offcipdetailsModel.releaseTime) {
                this.offcipdetailsModel.releaseDate = DateFormat.getDate();
                this.offcipdetailsModel.releaseTime = DateFormat.getDate();
            } else if (this.offcipdetailsModel.releaseDate && !this.offcipdetailsModel.releaseTime) {
                this.offcipdetailsModel.releaseTime = TimeFormat.parse(TimeFormat.format(
                    DateFormat.getDate()),
                    DateFormat.getDate(this.offcipdetailsModel.releaseDate));
            } else if (!this.offcipdetailsModel.releaseDate && this.offcipdetailsModel.releaseTime) {
                this.offcipdetailsModel.releaseDate = DateFormat.getDate(this.offcipdetailsModel.releaseTime);
            }
        }

        if (this.offcipdetailsModel.releaseDate) {
            this.releaseDateWhenValidateItemTrigger(this.offcipdetailsModel.releaseDate);
        }

        this.clearFlag = false;
    }

    clickReleaseTime() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }

        if (this.effectiveDateMessage && !this.releaseTimeMsgFlag) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        if (!this.offcipdetailsModel.placementSeq || this.offcipdetailsModel.placementSeq === 0) {

            if (this.verifySaveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            if (!this.offcipdetailsModel.releaseDate && !this.offcipdetailsModel.releaseTime) {
                this.offcipdetailsModel.releaseDate = DateFormat.getDate();
                this.offcipdetailsModel.releaseTime = DateFormat.getDate();
            } else if (this.offcipdetailsModel.releaseDate && !this.offcipdetailsModel.releaseTime) {
                this.offcipdetailsModel.releaseTime = TimeFormat.parse(TimeFormat.format(
                    DateFormat.getDate()),
                    DateFormat.getDate(this.offcipdetailsModel.releaseDate));
            } else if (!this.offcipdetailsModel.releaseDate && this.offcipdetailsModel.releaseTime) {
                this.offcipdetailsModel.releaseDate = DateFormat.getDate(this.offcipdetailsModel.releaseTime);
            }
        }

        if (this.offcipdetailsModel.releaseTime) {
            this.releaseTimeWhenValidateItemTrigger();
        }

        this.clearFlag = false;
    }
   
    
    canEventDateEdit = (data: any, index: number, field: string): boolean => {
        this.clearFlag = false;
        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }

        if (field === 'placementType') {
            if (data.placementSeq && data.placementSeq > 0) {
                // this.show(this.translateService.translate('oidcipon.fieldisprotectedagainstupdate'), 'warn');
                return false;
            }
        }
        if (field === 'placementReasonCode') {
            if (!data.placementType) {
                this.show(this.translateService.translate('oidcipon.listofvaluescontains'), 'warn');
                return false;
            }
        }
        return true;
    }
    onGridReady = () => {

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return null;
        }


        for (let i = 0; i < this.offcipdetailsData.length; i++) {
            if (!this.offcipdetailsData[i].placementType) {
                this.show(this.translateService.translate('Type must be entered'), 'warn');
                return;
            }
            if (!this.offcipdetailsData[i].placementReasonCode) {
                this.show(this.translateService.translate('Reason must be entered'), 'warn');
                return;
            }

            if (!this.offcipdetailsData[i].agyLocId) {
                this.show(this.translateService.translate('Facility must be entered'), 'warn');
                return;
            }

            if (!this.offcipdetailsData[i].reqByPerCode) {
                this.show(this.translateService.translate('Requested By must be entered'), 'warn');
                return;
            }

            if (!this.offcipdetailsData[i].authByPerCode) {
                this.show(this.translateService.translate('Authorized By must be entered'), 'warn');
                return;
            }
            if (!this.offcipdetailsData[i].authByPerName) {
                this.show(this.translateService.translate('Name must be entered'), 'warn');
                return;
            }

            if (!this.offcipdetailsData[i].effectiveDate) {
                this.show(this.translateService.translate('Effective Date must be entered'), 'warn');
                return;
            }

            if (!this.offcipdetailsData[i].effectiveTime) {
                this.show(this.translateService.translate('Time must be entered'), 'warn');
                return;
            }

            if (!this.offcipdetailsData[i].durationType) {
                this.show(this.translateService.translate('Duration Type must be entered'), 'warn');
                return;
            }


            if (this.offcipdetailsData[i].durationType) {
                if (this.offcipdetailsData[i].durationType !== 'INDEFINITE') {
                    if (!this.offcipdetailsData[i].duration) {
                        this.show(this.translateService.translate('Duration must be entered'), 'warn');
                        return;
                    }
                    if (!this.offcipdetailsData[i].reviewDate) {
                        this.show(this.translateService.translate('Review Date must be entered'), 'warn');
                        return;
                    }

                }
            }

            if (this.vHeaderBlockModel.activeFlag && this.vHeaderBlockModel.activeFlag === 'N') {
                if (!this.offcipdetailsData[i].releaseDate) {
                    this.show(this.translateService.translate('Date must be entered'), 'warn');
                    return false;
                }
                if (!this.offcipdetailsData[i].releaseTime) {
                    this.show(this.translateService.translate('Time must be entered'), 'warn');
                    return false;
                }
            }

        }
        if (this.insertOrNotFlag) {
            this.durationFlag = false;
            this.isshowing = false;
            this.verifySaveFlag = true;
            this.saveFlag = true;
            this.clearFlag = false;
            this.offcipdetailsModel = new OffenderCipDetails();
            this.placementLink = 'oidcipon/rgDurationTypeRecordGroup?placementType=' + 'NONE';
            return {
                offenderBookId: this.vHeaderBlockModel.offenderBookId,
                authByPerCode: this.offcipdetailsModel.authByPerCode,
                authByPerName: this.offcipdetailsModel.authByPerName,
                effectiveDate: this.offcipdetailsModel.effectiveDate,
                effectiveTime: this.offcipdetailsModel.effectiveTime,
                durationType: this.offcipdetailsModel.durationType,
                duration: this.offcipdetailsModel.duration,
                reviewDate: this.offcipdetailsModel.reviewDate,
                expiryDate: this.offcipdetailsModel.expiryDate,
                expiryTime: this.offcipdetailsModel.expiryTime,
                commentText: this.offcipdetailsModel.commentText,
                relByPerCode: this.offcipdetailsModel.relByPerCode,
                relByPerName: this.offcipdetailsModel.relByPerName,
                releaseDate: this.offcipdetailsModel.releaseDate,
                releaseTime: this.offcipdetailsModel.releaseTime,
                agyLocId: this.offcipdetailsModel.agyLocId,
                placementReasonCode: this.offcipdetailsModel.placementReasonCode,
                placementType: this.offcipdetailsModel.placementType,
                reqByPerCode: this.offcipdetailsModel.reqByPerCode
            };
        } else {
            this.show(this.translateService.translate('oidcipon.youcannotcreaterecords'), 'warn');
            return null;
        }

    }
    computeTimeServed() {
        if (!this.offcipdetailsModel.releaseTime) {
            this.lvReleaseTime = DateFormat.getDate();
        } else if (DateFormat.getDate(this.offcipdetailsModel.releaseTime) > DateFormat.getDate()) {
            this.lvReleaseTime = DateFormat.getDate();
        } else {
            this.lvReleaseTime = DateFormat.getDate();
        }
    }

    onRowClickoffcipdetails = (event) => {
        this.rowIndex = this.grid.innerRowData.indexOf(event);
        if (event) {
            this.eoffenderService.selectedRowData = event;
            this.disabledFlag = false;
            if (event.placementType) {
                this.placementLink = 'oidcipon/rgDurationTypeRecordGroup?placementType=' + event.placementType;
            }
            this.offcipdetailsBean = JSON.parse(JSON.stringify(event));
            if (this.effectiveDateMessage) {
                this.show(this.effectiveDateMessage, 'warn');
                return false;
            }
            this.offcipdetailsModel = event;
            this.authorizeFlag = false;
            this.durationTypeFlag = false;
            this.relByFlag = false;
            if (!event.authByPerCode) {
                3
                this.authorizeFlag = true;
            }
            if (!event.durationType) {
                this.durationTypeFlag = true;
            }
            if (!event.relByPerCode) {
                this.relByFlag = true;
            }
            if (event.placementSeq) {
                this.cipDetailsExecuteQuery(this.offcipdetailsBean);
            }
            if (event.placementType) {
                //  this.placementLink = 'oidcipon/rgDurationTypeRecordGroup?placementType=' + event.placementType;
                if (event.durationType === 'HOURS' || event.durationType === 'DAYS') {
                    this.durationFlag = true;
                } else {
                    this.durationFlag = false;
                }

                this.disabled = false;
                this.authorizeReadOnlyFlag = false;
                this.relByPerCodeReadOnlyFlag = false;
                this.durationTypeReadOnlyFlag = false;
                this.textBoxReadOnlyFlag = false;
                this.releaseDateReadOnly = false;
                return true;
            }

        } else {
            this.disabledFlag = true;
        }

    }

    cipDetailsExecuteQuery(event) {
        const offcipdetailsResult = this.oidciponFactory.
            offCipDetailsExecuteQuery(event);
        offcipdetailsResult.subscribe(datalist => {
            if (datalist.length > 0) {
                datalist.forEach(element => {
                    if (element.effectiveTime) {
                        element.effectiveTime = DateFormat.getDate(element.effectiveTime);
                    }
                    if (element.expiryTime) {
                        element.expiryTime = DateFormat.getDate(element.expiryTime);
                    }
                    if (element.releaseTime) {
                        element.releaseTime = DateFormat.getDate(element.releaseTime);
                    }

                    if (element.effectiveDate) {
                        element.effectiveDate = DateFormat.getDate(element.effectiveDate);
                    }

                    if (element.expiryDate) {
                        element.expiryDate = DateFormat.getDate(element.expiryDate);
                    }

                    if (element.releaseDate) {
                        element.releaseDate = DateFormat.getDate(element.releaseDate);
                    }

                    if (element.reviewDate) {
                        element.reviewDate = DateFormat.getDate(element.reviewDate);
                    }

                });

                this.offcipdetailsModel = datalist[0];
                this.offcipdetailsData.forEach(element => {
                    if (element.placementSeq === this.offcipdetailsModel.placementSeq) {
                        const durationType = this.offcipdetailsModel.durationType;
                        element.durationType = durationType;
                    }
                });
            }
        });
    }
    authByPerCodeWhenValidateItemTrigger() {
        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }

        if (this.offcipdetailsModel.authByPerCode || this.offcipdetailsModel.authByPerCode === undefined) {
            if (this.authorizeFlag) {
                if (this.verifySaveFlag) {
                    this.saveFlag = true;
                } else {
                    this.saveFlag = false;
                }
                this.clearFlag = false;

            } else {
                this.authorizeFlag = true;
                return;
            }

        }
    }

    get saveDisable() {
        if ((this.grid && (this.grid.addedMap.size > 0 ||
            this.grid.updatedMap.size > 0) || this.grid.removedMap.size > 0)) {
            return false;
        } else {
            return true;
        }
    }

    relByPerCodeWhenValidateItemTrigger() {

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return;
        }
        if (this.offcipdetailsModel.relByPerCode || this.offcipdetailsModel.relByPerCode === undefined) {
            if (this.relByFlag) {
                if (this.verifySaveFlag) {
                    this.saveFlag = true;
                } else {
                    this.saveFlag = false;
                }
                return;
            } else {
                this.relByFlag = true;
            }
            this.clearFlag = false;
        }
    }


    effectiveDateWhenValidateItemTrigger(event) {
        if (!this.offcipdetailsModel.releaseDate) {
            this.offcipdetailsModel.releaseDate = DateFormat.getDate();
        }
        this.offcipdetailsModel.releaseTime = TimeFormat.parse(TimeFormat.format(
            DateFormat.getDate()), DateFormat.getDate(this.offcipdetailsModel.releaseDate));
        if (this.offcipdetailsModel.effectiveTime) {
            this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(
                this.offcipdetailsModel.effectiveTime),
                DateFormat.getDate(event));
        } else {
            this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(
                DateFormat.getDate()),
                DateFormat.getDate(event));
        }
        if (this.offcipdetailsModel.duration) {
            this.durationWhenValidateItemTrigger(this.offcipdetailsModel.duration);
        }
        if (this.effectiveDateMessage && !this.efffectiveMsgFlag) {
            this.show(this.effectiveDateMessage, 'warn');
            this.authorizeReadOnlyFlag = true;
            this.relByPerCodeReadOnlyFlag = true;
            this.durationTypeReadOnlyFlag = true;
            this.textBoxReadOnlyFlag = true;
            this.releaseDateReadOnly = true;
            return false;
        } else {
            this.effectiveDateMessage = null;
        }
        if (event) {
            this.authorizeReadOnlyFlag = true;
            this.relByPerCodeReadOnlyFlag = true;
            this.durationTypeReadOnlyFlag = true;
            this.textBoxReadOnlyFlag = true;
            this.releaseDateReadOnly = true;
            if (this.verifySaveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            this.clearFlag = false;

            if (this.offcipdetailsModel.effectiveTime) {
                this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(
                    this.offcipdetailsModel.effectiveTime),
                    DateFormat.getDate(event));
            } else {
                this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(
                    DateFormat.getDate()),
                    DateFormat.getDate(event));
            }
            if (DateFormat.getDate(event) > DateFormat.getDate()) {
                this.show(this.translateService.translate('oidcipon.effectivedtnotgreater'), 'warn');
                return;
            }
            if (this.offcipdetailsModel.releaseDate && DateFormat.getDate(event) >
                DateFormat.getDate(this.offcipdetailsModel.releaseDate)) {
                this.show(this.translateService.translate('oidcipon.releasedategreaterthaneffectivedate'), 'warn');
                return;
            }
            if (this.vHeaderBlockModel.activeFlag === 'N') {
                this.offExternalMovModel = new OffenderExternalMovements();
                this.offExternalMovModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offExternalMovModel.dspDescription = 'effectiveDate';
                this.offExternalMovModel.movementDate = event;
                const dtValidationForInactiveResult = this.oidciponFactory.
                    dtValidationForInactiveOff(this.offExternalMovModel);
                dtValidationForInactiveResult.subscribe(dtValidationForInactiveResultList => {
                    if (dtValidationForInactiveResultList !== 'NONE') {
                        this.effectiveDateMessage = this.translateService.translate('oidcipon.dateandtimeearlierthanlastexternal')
                            + dtValidationForInactiveResultList
                            + this.translateService.translate('oidcipon.plschkdateandtime');
                        this.efffectiveMsgFlag = true;
                        this.authorizeReadOnlyFlag = true;
                        this.relByPerCodeReadOnlyFlag = true;
                        this.durationTypeReadOnlyFlag = true;
                        this.textBoxReadOnlyFlag = true;
                        this.releaseDateReadOnly = true;
                        this.show(this.effectiveDateMessage, 'warn');
                        return;
                    } else {
                        this.effectiveDateMessage = null;
                        this.efffectiveMsgFlag = false;
                        this.authorizeReadOnlyFlag = false;
                        this.relByPerCodeReadOnlyFlag = false;
                        this.durationTypeReadOnlyFlag = false;
                        this.textBoxReadOnlyFlag = false;
                        this.releaseDateReadOnly = false;
                    }

                });
            } else {
                this.authorizeReadOnlyFlag = false;
                this.relByPerCodeReadOnlyFlag = false;
                this.durationTypeReadOnlyFlag = false;
                this.textBoxReadOnlyFlag = false;
                this.releaseDateReadOnly = false;
            }

            this.lvEffectiveDate = DateFormat.getDate(event);
            if (this.offcipdetailsModel.duration) {
                if (event && this.offcipdetailsModel.effectiveTime) {
                    this.lvEffectiveTime = this.offcipdetailsModel.effectiveTime;
                    if (this.offcipdetailsModel.durationType && this.offcipdetailsModel.durationType === 'DAYS') {
                        this.lvEffectiveDate = this.addDays(this.lvEffectiveDate, this.offcipdetailsModel.duration);
                        this.lvEffectiveTime = this.addDays(this.lvEffectiveTime, this.offcipdetailsModel.duration);
                    } if (this.offcipdetailsModel.durationType && this.offcipdetailsModel.durationType === 'HOURS') {
                        this.lvEffectiveDate = this.addHours(this.lvEffectiveDate, this.offcipdetailsModel.duration);
                        this.lvEffectiveTime = this.addHours(this.lvEffectiveTime, this.offcipdetailsModel.duration);
                    }

                }

                if (this.offcipdetailsModel.releaseDate) {
                    if (DateFormat.getDate(event) >
                        DateFormat.getDate(this.offcipdetailsModel.releaseDate)) {
                        this.show(this.translateService.translate('oidcipon.durationtimecannotbelessthanreleasedate'), 'warn');
                        this.authorizeReadOnlyFlag = true;
                        this.relByPerCodeReadOnlyFlag = true;
                        this.durationTypeReadOnlyFlag = true;
                        this.textBoxReadOnlyFlag = true;
                    }
                }

                this.offcipdetailsModel.expiryDate = this.lvEffectiveDate;
                this.offcipdetailsModel.expiryTime = this.lvEffectiveTime;

            }
        }
    }
    effectiveTimeWhenValidateItemTrigger() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }


        if (this.effectiveDateMessage && !this.effectiveTimeMsgFlag) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.clearFlag = false;

        if (this.offcipdetailsModel.placementSeq && this.offcipdetailsModel.placementSeq > 0) {
            if (this.offcipdetailsModel.effectiveDate) {
                this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(
                    this.offcipdetailsModel.effectiveTime),
                    DateFormat.getDate(this.offcipdetailsModel.effectiveDate));
            }
        }

        if (this.offcipdetailsModel.effectiveTime) {
            this.authorizeReadOnlyFlag = true;
            this.relByPerCodeReadOnlyFlag = true;
            this.durationTypeReadOnlyFlag = true;
            this.textBoxReadOnlyFlag = true;
            if (this.verifySaveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }

            if (this.offcipdetailsModel.effectiveDate) {
                this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(this.offcipdetailsModel.effectiveTime),
                    DateFormat.getDate(this.offcipdetailsModel.effectiveDate));
            }
            if (DateFormat.compareDateTime(DateFormat.getDate(this.offcipdetailsModel.effectiveTime), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oidcipon.effectivetimelessthancurrentdate'), 'error');
                return;
            }

            if (this.offcipdetailsModel.releaseTime) {
                if ((DateFormat.compareDateTime(DateFormat.getDate(this.offcipdetailsModel.effectiveTime),
                    DateFormat.getDate(this.offcipdetailsModel.releaseTime))) === 1) {
                    this.show(this.translateService.translate('oidcipon.reldtgreaterthaneffectivedt'), 'warn');
                    return;
                }

                if (this.vHeaderBlockModel.activeFlag === 'N') {
                    this.offExternalMovModel = new OffenderExternalMovements();
                    this.offExternalMovModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                    this.offExternalMovModel.dspDescription = 'effectiveTime';
                    this.offExternalMovModel.movementDate = this.offcipdetailsModel.effectiveTime;
                    const dtValidationForInactiveResult = this.oidciponFactory.
                        dtValidationForInactiveOff(this.offExternalMovModel);
                    dtValidationForInactiveResult.subscribe(dtValidationForInactiveResultList => {
                        if (dtValidationForInactiveResultList !== 'NONE') {
                            this.effectiveDateMessage = this.translateService.translate('oidcipon.dateandtimeearlierthanlastexternal')
                                + dtValidationForInactiveResultList
                                + this.translateService.translate('oidcipon.plschkdateandtime');
                            this.effectiveTimeMsgFlag = true;
                            this.show(this.effectiveDateMessage, 'warn');
                            return;
                        } else {
                            this.effectiveDateMessage = null;
                            this.effectiveTimeMsgFlag = false;
                        }

                    });
                }

                if (this.offcipdetailsModel.duration) {
                    if (this.offcipdetailsModel.effectiveDate && this.offcipdetailsModel.effectiveTime) {
                        this.lvEffectiveDate = this.offcipdetailsModel.effectiveDate;
                        this.lvEffectiveTime = this.offcipdetailsModel.effectiveTime;

                    }
                    if (this.offcipdetailsModel.durationType && this.offcipdetailsModel.durationType === 'DAYS') {
                        this.lvEffectiveDate = this.addDays(this.lvEffectiveDate, this.offcipdetailsModel.duration);
                        this.lvEffectiveTime = this.addDays(this.lvEffectiveTime, this.offcipdetailsModel.duration);
                    } if (this.offcipdetailsModel.durationType && this.offcipdetailsModel.durationType === 'HOURS') {
                        this.lvEffectiveDate = this.addHours(this.lvEffectiveDate, this.offcipdetailsModel.duration);
                        this.lvEffectiveTime = this.addHours(this.lvEffectiveTime, this.offcipdetailsModel.duration);
                    }

                    if (this.offcipdetailsModel.releaseTime) {
                        if (DateFormat.getDate(this.lvEffectiveTime) <
                            DateFormat.getDate(this.offcipdetailsModel.releaseTime)) {
                            this.show(this.translateService.translate('oidcipon.durationtimecannotbelessthanreleasedate'), 'warn');
                            return;
                        }
                    }
                    this.offcipdetailsModel.expiryDate = this.lvEffectiveDate;
                    this.offcipdetailsModel.expiryTime = this.lvEffectiveTime;
                    if (DateFormat.getDate(this.lvEffectiveTime) <= DateFormat.getDate()) {
                        if (!this.offcipdetailsModel.releaseDate) {
                            this.offcipdetailsModel.releaseDate = this.lvEffectiveDate;
                            this.offcipdetailsModel.releaseTime = this.lvEffectiveTime;
                        }
                    }
                }
                this.authorizeReadOnlyFlag = false;
                this.relByPerCodeReadOnlyFlag = false;
                this.durationTypeReadOnlyFlag = false;
                this.textBoxReadOnlyFlag = false;
            }
        }
    }

    durationTypeWhenValidateItemTrigger(event) {
        if (this.offcipdetailsModel.durationType && this.offcipdetailsModel.durationType === 'INDEFINITE') {
            this.offcipdetailsModel.duration = undefined;
            this.durationFlag = false;
            if (!this.offcipdetailsModel.releaseDate) {
                this.offcipdetailsModel.expiryDate = null;
                this.offcipdetailsModel.expiryTime = null;
            } else {
                this.offcipdetailsModel.expiryDate = this.offcipdetailsModel.releaseDate;
                this.offcipdetailsModel.expiryTime = this.offcipdetailsModel.releaseTime;
            }
        } else {
            this.durationFlag = true;
        }
        if(event && this.offcipdetailsDataTemp && this.rowIndex >= 0 && this.offcipdetailsDataTemp[this.rowIndex].durationType != event.code){
        this.offcipdetailsModel.duration = undefined;
        this.grid.setColumnData('duration',this.rowIndex,undefined);
        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            // this.offcipdetailsModel.durationType = undefined;
            return false;
        }
        if (this.offcipdetailsModel.durationType || this.offcipdetailsModel.durationType === undefined) {
            if (this.durationTypeFlag) {
                if (this.verifySaveFlag) {
                    this.saveFlag = true;
                } else {
                    this.saveFlag = false;
                }
                this.clearFlag = false;
            } 

        }
        if (this.offcipdetailsModel.durationType) {
            this.placeDurationModel = new PlacementDurations();
            this.placeDurationModel.placementType = this.offcipdetailsModel.placementType;
            const durationTpeResult = this.oidciponFactory.defaultDurationType(this.placeDurationModel);
            durationTpeResult.subscribe(durationTypeList => {
                if (durationTypeList.length === 0) {
                    this.rgdurationtypeRg = [];
                } else {
                    this.placeDurationData = [];
                    this.placeDurationData = durationTypeList;
                }
            });
        }
    }
    }

    updateOffenderCipValidator = (event) => {
        const rowdata = new ValidateRowReturn();

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            rowdata.validated = false;
            return rowdata;
        }
        this.offcipdetailsIndex = this.offcipdetailsData.indexOf(event.data);
        if (event.field === 'placementType') {
            if (event.newValue) {
                this.grid.setColumnData('placementReasonCode', event.rowIndex, undefined);
                this.placementLink = 'oidcipon/rgDurationTypeRecordGroup?placementType=' + event.newValue;
            }
        }

        if (event.oldValue !== event.newValue) {
            this.verifySaveFlag = true;
            this.saveFlag = true;
            this.clearFlag = false;
            rowdata.validated = true;
            rowdata.data = {
                placementType: event.data.placementType, placementReasonCode: event.data.placementReasonCode,
                agyLocId: event.data.agyLocId, reqByPerCode: event.data.reqByPerCode
            };
        }
        rowdata.validated = true;
        return rowdata;
    }
    allowNumbers(event) {
    }
    onButOicHearingclick() {
    }
    onButChangeHousingclick() {
    }
    ok() {
    }
    no() {
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.placementLink = 'oidcipon/rgDurationTypeRecordGroup?placementType=' + 'NONE';
            this.efffectiveMsgFlag = false;
            this.effectiveTimeMsgFlag = false;
            this.releaseDateMsgFlag = false;
            this.releaseTimeMsgFlag = false;
            this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
            this.vHeaderBlockOffender = this.vHeaderBlockModel;
            this.saveFlag = true;
            this.verifySaveFlag = false;
            this.effectiveDateMessage = null;
            this.durationFlag = false;
            this.clearFlag = true;
            this.authorizeReadOnlyFlag = true;
            this.relByPerCodeReadOnlyFlag = true;
            this.durationTypeReadOnlyFlag = true;
            this.textBoxReadOnlyFlag = true;
            this.effectiveDateReadOnly = true;
            this.effectiveTimeReadOnly = true;
            this.reviewDateReadOnly = true;
            this.releaseDateReadOnly = true;
            this.reviewTimeReadOnly = true;
            this.strDurationMessage = undefined;
            this.effectiveDateMessage = undefined;
            this.fromReviewDateFlag = false;
            this.offcipdetailsExecuteQuery();

        } else {
            this.offcipdetailsData = [];
            this.offcipdetailsModel = new OffenderCipDetails();
            this.placementType = null;
            this.durationFlag = false;
            this.voffcipdetailsModel = new OffenderCipDetails();
            this.addFlag = false;
            this.lstOfOffCip = [];
            this.verifySaveFlag = false;
            this.isshowing = true;
            this.authorizeFlag = false;
            this.durationTypeFlag = false;
            this.relByFlag = false;
            this.insertOrNotFlag = true;
            this.saveFlag = true;
            this.effectiveDateMessage = null;
            this.efffectiveMsgFlag = false;
            this.effectiveTimeMsgFlag = false;
            this.releaseDateMsgFlag = false;
            this.releaseTimeMsgFlag = false;
            this.durationFlag = false;
            this.placementLink = 'oidcipon/rgDurationTypeRecordGroup?placementType=' + 'NONE';
            this.clearFlag = true;
            this.authorizeReadOnlyFlag = true;
            this.relByPerCodeReadOnlyFlag = true;
            this.durationTypeReadOnlyFlag = true;
            this.textBoxReadOnlyFlag = true;
            this.effectiveDateReadOnly = true;
            this.effectiveTimeReadOnly = true;
            this.reviewDateReadOnly = true;
            this.releaseDateReadOnly = true;
            this.reviewTimeReadOnly = true;
            this.fromReviewDateFlag = false;
            this.strDurationMessage = undefined;
            this.effectiveDateMessage = undefined;
        }
    }
    cancel() {
        this.offcipdetailsData = [];
        this.offcipdetailsModel = new OffenderCipDetails();
        this.placementType = null;
        this.durationFlag = false;
        this.voffcipdetailsModel = new OffenderCipDetails();

        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            this.addFlag = false;
        } else {
            this.addFlag = true;
        }

        this.lstOfOffCip = [];
        this.verifySaveFlag = false;
        this.isshowing = true;
        this.authorizeFlag = false;
        this.durationTypeFlag = false;
        this.relByFlag = false;
        this.insertOrNotFlag = true;
        this.saveFlag = true;
        this.effectiveDateMessage = null;
        this.efffectiveMsgFlag = false;
        this.effectiveTimeMsgFlag = false;
        this.releaseDateMsgFlag = false;
        this.releaseTimeMsgFlag = false;
        this.durationFlag = false;
        this.placementLink = 'oidcipon/rgDurationTypeRecordGroup?placementType=' + 'NONE';
        this.clearFlag = true;
        this.authorizeReadOnlyFlag = true;
        this.relByPerCodeReadOnlyFlag = true;
        this.durationTypeReadOnlyFlag = true;
        this.textBoxReadOnlyFlag = true;
        this.effectiveDateReadOnly = true;
        this.effectiveTimeReadOnly = true;
        this.reviewDateReadOnly = true;
        this.releaseDateReadOnly = true;
        this.reviewTimeReadOnly = true;
        this.strDurationMessage = undefined;
        this.fromReviewDateFlag = false;
        this.effectiveDateMessage = undefined;

    }
    oidciponCommonAlerts() {
        this.authorizeReadOnlyFlag = true;
        this.relByPerCodeReadOnlyFlag = true;
        this.durationTypeReadOnlyFlag = true;
        this.textBoxReadOnlyFlag = true;
        this.reviewDateReadOnly = true;
        if (this.offcipdetailsModel) {
            if (this.offcipdetailsModel.effectiveDate && DateFormat.getDate(this.offcipdetailsModel.effectiveDate) > DateFormat.getDate()) {
                this.show(this.translateService.translate('oidcipon.effectivedtnotgreater'), 'warn');
                return false;
            }
            if (this.offcipdetailsModel.releaseDate && DateFormat.getDate(this.offcipdetailsModel.effectiveDate) >
                DateFormat.getDate(this.offcipdetailsModel.releaseDate)) {
                this.show(this.translateService.translate('oidcipon.releasedategreaterthaneffectivedate'), 'warn');
                return false;
            }

            if (this.offcipdetailsModel.effectiveTime &&
                DateFormat.compareDateTime(DateFormat.getDate(this.offcipdetailsModel.effectiveTime), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oidcipon.effectivetimelessthancurrentdate'), 'warn');
                return false;
            }

            if (!this.fromReviewDateFlag && this.offcipdetailsModel.effectiveDate && this.offcipdetailsModel.reviewDate &&
                DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsModel.reviewDate),
                    DateFormat.getDate(this.offcipdetailsModel.effectiveDate)) === -1) {
                this.show(this.translateService.translate('oidcipon.reviewdtlessthaneffective'), 'warn');
                return false;
            }
            this.fromReviewDateFlag = false;
            if (this.offcipdetailsModel.releaseDate && DateFormat.getDate(this.offcipdetailsModel.releaseDate) >
                DateFormat.getDate()) {
                this.show(this.translateService.translate('oidcipon.releasedate'), 'warn');
                return false;
            }

            if (this.offcipdetailsModel.effectiveDate && this.offcipdetailsModel.releaseDate &&
                DateFormat.getDate(this.offcipdetailsModel.effectiveDate) >
                DateFormat.getDate(this.offcipdetailsModel.releaseDate)) {
                this.show(this.translateService.translate('oidcipon.releasedtnotlesseffdt'), 'warn');
                return false;
            }

            if (this.offcipdetailsModel.releaseDate && this.offcipdetailsModel.expiryDate
                && DateFormat.getDate(this.offcipdetailsModel.releaseDate) >
                DateFormat.getDate(this.offcipdetailsModel.expiryDate)) {
                this.show(this.translateService.translate('oidcipon.releasecannotgreaterexpiry'), 'warn');
                return false;
            }
            if (this.offcipdetailsModel.releaseTime) {
                if (this.offcipdetailsModel.expiryTime && this.offcipdetailsModel.effectiveTime &&
                    DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsModel.effectiveTime), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidcipon.releasetimeequalorlessthansysdate'), 'warn');
                    return false;
                }
                if (this.offcipdetailsModel.effectiveTime && this.offcipdetailsModel.releaseTime &&
                    DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsModel.releaseTime), DateFormat.getDate(this.offcipdetailsModel.effectiveTime)) === -1) {
                    this.show(this.translateService.translate('oidcipon.releasetimecannotbelesseffectivetime'), 'warn');
                    return false;
                }
                if (this.offcipdetailsModel.expiryTime && this.offcipdetailsModel.releaseTime &&
                    DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsModel.releaseTime), DateFormat.getDate(this.offcipdetailsModel.expiryTime)) === 1) {
                    this.show(this.translateService.translate('oidcipon.releasetimenotgreaterexpirytime'), 'warn');
                    return false;
                }
            }

            if (!this.offcipdetailsModel.releaseDate) {
                if (this.offcipdetailsModel.expiryTime &&
                    (DateFormat.getDate(this.offcipdetailsModel.expiryTime) <= DateFormat.getDate()) &&
                    this.offcipdetailsModel.durationType && this.offcipdetailsModel.durationType !== 'INDEFINITE') {
                    this.show(this.translateService.translate('oidcipon.youcannotreactive'), 'warn');
                    return false;
                }
            }
            if (this.offcipdetailsModel.duration &&
                (this.offcipdetailsModel.duration < 0 || this.offcipdetailsModel.duration > 999999)) {
                this.show(this.translateService.translate('oidcipon.durationformat'), 'warn');
                return false;
            }

            if (this.strDurationMessage) {
                this.show(this.strDurationMessage, 'warn');
                return false;
            }
        }
        this.authorizeReadOnlyFlag = false;
        this.relByPerCodeReadOnlyFlag = false;
        this.durationTypeReadOnlyFlag = false;
        this.textBoxReadOnlyFlag = false;
        this.effectiveDateReadOnly = false;
        this.effectiveTimeReadOnly = false;
        this.reviewDateReadOnly = false;
        this.releaseDateReadOnly = false;
        this.reviewTimeReadOnly = false;
        this.strDurationMessage = undefined;
        this.reviewDateReadOnly = false;
    }

    oidciponOnClearDetailsTrigger = () => {
        this.saveFlag = true;
        this.verifySaveFlag = true;
        this.clearFlag = true;
        this.authorizeReadOnlyFlag = false;
        this.relByPerCodeReadOnlyFlag = false;
        this.durationTypeReadOnlyFlag = false;
        this.textBoxReadOnlyFlag = false;
        this.effectiveDateReadOnly = false;
        this.effectiveTimeReadOnly = false;
        this.reviewDateReadOnly = false;
        this.releaseDateReadOnly = false;
        this.reviewTimeReadOnly = false;
        this.strDurationMessage = undefined;
        this.fromReviewDateFlag = false;
        this.effectiveDateMessage = undefined;
        // this.placementLink = 'oidcipon/rgDurationTypeRecordGroup?placementType=' + 'NONE';
        if (this.offcipdetailsData.length === 1) {
            if (this.offcipdetailsModel && (!this.offcipdetailsModel.placementSeq || this.offcipdetailsModel.placementSeq === 0)) {
                this.offcipdetailsModel = new OffenderCipDetails();
            }
        }
        this.offcipdetailsExecuteQuery();
        return true;
    }

    onRowSelect(event) {
        for (let i = 0; i < this.offcipdetailsData.length; i++) {
            if (this.offcipdetailsData[i].durationType === event.innerValue) {
                this.index = i;
                return;
            }
        }
    }

    offcipdetailsExecuteQuery() {
        this.disabled = false;
        this.authorizeReadOnlyFlag = false;
        this.relByPerCodeReadOnlyFlag = false;
        this.durationTypeReadOnlyFlag = false;
        this.textBoxReadOnlyFlag = false;
        this.effectiveDateReadOnly = false;
        this.effectiveTimeReadOnly = false;
        this.reviewDateReadOnly = false;
        this.releaseDateReadOnly = false;
        this.reviewTimeReadOnly = false;
        this.offcipdetailsModel = new OffenderCipDetails();
        this.offcipdetailsModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const offcipdetailsResult = this.oidciponFactory.
            offCipDetailsExecuteQuery(this.offcipdetailsModel);
        offcipdetailsResult.subscribe(offCipDetailsResultList => {
            if (offCipDetailsResultList.length === 0) {
                this.offcipdetailsData = [];
                this.offcipdetailsDataTemp = [];
                this.clearFlag = true;
            } else {
                for (let i = 0; i < offCipDetailsResultList.length; i++) {
                    if (offCipDetailsResultList[i].effectiveTime) {
                        offCipDetailsResultList[i].effectiveTime = DateFormat.getDate(offCipDetailsResultList[i].effectiveTime);
                    }
                    if (offCipDetailsResultList[i].expiryTime) {
                        offCipDetailsResultList[i].expiryTime = DateFormat.getDate(offCipDetailsResultList[i].expiryTime);
                    }
                    if (offCipDetailsResultList[i].releaseTime) {
                        offCipDetailsResultList[i].releaseTime = DateFormat.getDate(offCipDetailsResultList[i].releaseTime);
                    }

                    if (offCipDetailsResultList[i].effectiveDate) {
                        offCipDetailsResultList[i].effectiveDate = DateFormat.getDate(offCipDetailsResultList[i].effectiveDate);
                    }

                    if (offCipDetailsResultList[i].expiryDate) {
                        offCipDetailsResultList[i].expiryDate = DateFormat.getDate(offCipDetailsResultList[i].expiryDate);
                    }

                    if (offCipDetailsResultList[i].releaseDate) {
                        offCipDetailsResultList[i].releaseDate = DateFormat.getDate(offCipDetailsResultList[i].releaseDate);
                    }

                    if (offCipDetailsResultList[i].reviewDate) {
                        offCipDetailsResultList[i].reviewDate = DateFormat.getDate(offCipDetailsResultList[i].reviewDate);
                    }
                    offCipDetailsResultList[i]['butIwp']='';
                    offCipDetailsResultList[i]['SCREEN'] = this.screenId + "~" + "true" + "~" + offCipDetailsResultList[i]['placementSeq'];
			

                }
                this.offcipdetailsData = offCipDetailsResultList;
                this.offcipdetailsDataTemp = JSON.parse(JSON.stringify(offCipDetailsResultList));
                this.lstOfOffCip = offCipDetailsResultList;
                this.offcipdetailsModel = offCipDetailsResultList[0];
                if (this.offcipdetailsModel.durationType === 'HOURS' || this.offcipdetailsModel.durationType === 'DAYS') {
                    this.durationFlag = true;
                } else {
                    this.durationFlag = false;
                }

                if (!this.offcipdetailsModel.authByPerCode) {
                    this.authorizeFlag = true;
                }
                if (!this.offcipdetailsModel.durationType) {
                    this.durationTypeFlag = true;
                }
                if (!this.offcipdetailsModel.relByPerCode) {
                    this.relByFlag = true;
                }
                this.isshowing = true;
                this.tableIndex = 0;
                this.clearFlag = false;
            }
        });

        this.addFlag = true;
        this.saveFlag = true;
        this.verifySaveFlag = true;
        const offcipChkDateResult = this.oidciponFactory.checkDate(this.vHeaderBlockModel);
        offcipChkDateResult.subscribe(offCipAddRecordResultList => {
            if (offCipAddRecordResultList === 0) {
                this.insertOrNotFlag = false;
            } else {
                this.insertOrNotFlag = true;
            }
        });
    }

    durationWhenValidateItemTrigger(event) {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.clearFlag = false;
        if (this.offcipdetailsModel.durationType) {
            if (this.verifySaveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            this.placeDurationModel = new PlacementDurations();
            this.placeDurationModel.placementType = this.offcipdetailsModel.placementType;
            const durationTpeResult = this.oidciponFactory.defaultDurationType(this.placeDurationModel);
            durationTpeResult.subscribe(durationTypeList => {
                if (durationTypeList.length === 0) {
                    this.rgdurationtypeRg = [];
                } else {
                    this.placeDurationData = [];
                    this.placeDurationData = durationTypeList;
                    this.maximumDuration = 0;
                    this.minimumDuration = 0;
                    if (this.offcipdetailsModel.durationType && this.offcipdetailsModel.durationType !== 'INDEFINITE') {
                        if (this.placeDurationData !== null && this.placeDurationData.length > 0) {
                            for (let i = 0; i < this.placeDurationData.length; i++) {
                                if (this.placeDurationData[i].durationType === this.offcipdetailsModel.durationType) {
                                    this.minimumDuration = this.placeDurationData[i].minimumDuration;
                                    if (this.minimumDuration === null || this.minimumDuration === 'undefined') {
                                        this.minimumDuration = 0;
                                    }
                                    this.maximumDuration = this.placeDurationData[i].maximumDuration;
                                    break;
                                }
                            }
                        }
                        if (this.offcipdetailsModel.duration >= 0 && this.offcipdetailsModel.duration <= 999999) {
                            // if (this.minimumDuration !== 0 || this.maximumDuration !== 0) {
                            //     if (this.maximumDuration < this.offcipdetailsModel.duration ||
                            //         this.minimumDuration > this.offcipdetailsModel.duration) {
                            //         this.strDurationMessage = this.translateService.translate('oidcipon.durationlength') + ' ' +
                            //             this.minimumDuration + ' ' + this.translateService.translate('oidcipon.durationand') + ' ' +
                            //             this.maximumDuration;
                            //         this.show(this.strDurationMessage, 'warn');
                            //         return false;
                            //     }
                            // }
                            this.strDurationMessage = undefined;
                            this.lvEffectiveTime = null;
                            this.lvEffectiveTime = this.offcipdetailsModel.effectiveTime;
                            if (this.offcipdetailsModel.durationType && this.offcipdetailsModel.durationType === 'DAYS') {
                                this.changedDate = this.addDays(this.lvEffectiveTime, this.offcipdetailsModel.duration);
                            } if (this.offcipdetailsModel.durationType && this.offcipdetailsModel.durationType === 'HOURS') {
                                this.changedDate = this.addHours(this.lvEffectiveTime, this.offcipdetailsModel.duration);
                            }
                            this.offcipdetailsModel.expiryDate = DateFormat.getDate(this.changedDate);
                            this.offcipdetailsModel.expiryTime = this.changedDate;
                            if (this.offcipdetailsModel.duration) {
                                this.grid.setColumnData('expiryDate', this.rowIndex,
                                    this.offcipdetailsModel.expiryDate);
                            }
                            if (this.offcipdetailsModel.releaseTime) {
                                if (DateFormat.getDate(this.changedDate) < DateFormat.getDate(this.offcipdetailsModel.releaseTime)) {
                                    this.show(this.translateService.translate('oidcipon.durationtimecannotbelessthanreleasedate'), 'warn');
                                    return false;
                                }

                            }
                            if (DateFormat.getDate(this.offcipdetailsModel.expiryTime) <= DateFormat.getDate()) {
                                if (!this.offcipdetailsModel.releaseDate || this.offcipdetailsModel.placementSeq === 0) {
                                    this.offcipdetailsModel.releaseDate = this.offcipdetailsModel.expiryDate;
                                    this.offcipdetailsModel.releaseTime = this.offcipdetailsModel.expiryTime;
                                }
                            }
                        } else {
                            this.strDurationMessage = undefined;
                            //this.show(this.translateService.translate('oidcipon.durationformat'), 'warn');
                            return false;
                        }
                    }
                }
            });
        }
    }

    addDays(date: Date, days: number): Date {
        this.addDatesUpdate = DateFormat.getDate(date);
        this.addDatesUpdate.setDate(this.addDatesUpdate.getDate() + days);
        return this.addDatesUpdate;
    }

    addHours(date: Date, hours: number): Date {
        this.addDatesUpdate = date;
        this.addDatesUpdate = TimeFormat.parse(TimeFormat.format(
            date),
            DateFormat.getDate(date));
        this.addDatesUpdate.setHours(date.getHours() + hours);
        return this.addDatesUpdate;
    }

    reviewDateWhenValidateItemTrigger(event) {

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            this.offcipdetailsModel.reviewDate = undefined;
            return false;
        }
        this.fromReviewDateFlag = true;
        this.oidciponCommonAlerts();
        if (event) {
            this.grid.setColumnData('sealFlag', this.rowIndex, '');
            this.authorizeReadOnlyFlag = true;
            this.relByPerCodeReadOnlyFlag = true;
            this.durationTypeReadOnlyFlag = true;
            this.textBoxReadOnlyFlag = true;
            this.clearFlag = false;
            if (this.verifySaveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            if (this.offcipdetailsModel.effectiveDate &&
                DateFormat.compareDate(DateFormat.getDate(event),
                    DateFormat.getDate(this.offcipdetailsModel.effectiveDate)) === -1) {
                this.show(this.translateService.translate('oidcipon.reviewdtlessthaneffective'), 'warn');
                return;
            }
            this.authorizeReadOnlyFlag = false;
            this.relByPerCodeReadOnlyFlag = false;
            this.durationTypeReadOnlyFlag = false;
            this.textBoxReadOnlyFlag = false;
        }
    }
    releaseDateWhenValidateItemTrigger(event) {

        if (event) {
            this.authorizeReadOnlyFlag = true;
            this.relByPerCodeReadOnlyFlag = true;
            this.durationTypeReadOnlyFlag = true;
            this.textBoxReadOnlyFlag = true;
            this.clearFlag = false;
            if (this.verifySaveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            this.offcipdetailsModel.releaseTime = TimeFormat.parse(TimeFormat.format(
                DateFormat.getDate()), DateFormat.getDate(this.offcipdetailsModel.releaseDate));

            if (DateFormat.getDate(event) > DateFormat.getDate()) {
                this.show(this.translateService.translate('oidcipon.releasedate'), 'warn');
                return;
            }

            if (this.offcipdetailsModel.effectiveDate && (DateFormat.getDate(this.offcipdetailsModel.effectiveDate) >
                DateFormat.getDate(event))) {
                this.show(this.translateService.translate('oidcipon.releasedtnotlesseffdt'), 'warn');
                return;
            }

            if (this.offcipdetailsModel.expiryDate && (DateFormat.getDate(event) >
                DateFormat.getDate(this.offcipdetailsModel.expiryDate))) {
                this.show(this.translateService.translate('oidcipon.releasecannotgreaterexpiry'), 'warn');
                return;
            }

            // if (this.offcipdetailsModel.releaseTime) {
            //     this.offcipdetailsModel.releaseTime = TimeFormat.parse(TimeFormat.format(this.offcipdetailsModel.releaseTime),
            //         DateFormat.getDate(event));
            // } else {
            //     this.offcipdetailsModel.releaseTime = TimeFormat.parse(TimeFormat.format(DateFormat.getDate()),
            //         DateFormat.getDate(event));
            // }

            if (this.vHeaderBlockModel.activeFlag === 'N') {
                this.offExternalMovModel = new OffenderExternalMovements();
                this.offExternalMovModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offExternalMovModel.dspDescription = 'releaseDate';
                this.offExternalMovModel.movementDate = event;
                const dtValidationForInactiveResult = this.oidciponFactory.
                    dtValidationForInactiveOff(this.offExternalMovModel);
                dtValidationForInactiveResult.subscribe(dtValidationForInactiveResultList => {
                    if (dtValidationForInactiveResultList !== 'NONE') {
                        this.effectiveDateMessage = this.translateService.translate('oidcipon.dateandtimeearlierthanlastexternal')
                            + dtValidationForInactiveResultList
                            + this.translateService.translate('oidcipon.plschkdateandtime');
                        this.releaseDateMsgFlag = true;
                        this.show(this.effectiveDateMessage, 'warn');
                        return;
                    } else {
                        this.effectiveDateMessage = null;
                        this.releaseDateMsgFlag = false;
                    }
                });
            }

        } else {

            if (this.offcipdetailsModel.expiryTime &&
                (DateFormat.getDate(this.offcipdetailsModel.expiryTime) <= DateFormat.getDate()) &&
                this.offcipdetailsModel.durationType && this.offcipdetailsModel.durationType !== 'INDEFINITE') {
                this.show(this.translateService.translate('oidcipon.youcannotreactive'), 'warn');
                return;
            }

        }
        if (this.effectiveDateMessage && !this.releaseDateMsgFlag) {
            this.show(this.effectiveDateMessage, 'warn');
            return false;
        }
        this.authorizeReadOnlyFlag = false;
        this.relByPerCodeReadOnlyFlag = false;
        this.durationTypeReadOnlyFlag = false;
        this.textBoxReadOnlyFlag = false;
        // this.offcipdetailsModel.releaseTime = undefined;
    }

    releaseTimeWhenValidateItemTrigger() {
        this.clearFlag = false;
        this.authorizeReadOnlyFlag = true;
        this.relByPerCodeReadOnlyFlag = true;
        this.durationTypeReadOnlyFlag = true;
        this.textBoxReadOnlyFlag = true;
        if (this.effectiveDateMessage && !this.releaseTimeMsgFlag) {
            this.show(this.effectiveDateMessage, 'warn');
            this.offcipdetailsModel.releaseTime = undefined;
            return false;
        }

        if (this.verifySaveFlag) {
            this.saveFlag = true;
        } else {
            this.saveFlag = false;
        }
        this.offcipdetailsModel.effectiveTime = TimeFormat.parse(TimeFormat.format(this.offcipdetailsModel.effectiveTime),
        DateFormat.getDate(this.offcipdetailsModel.effectiveDate));

        if (this.offcipdetailsModel.releaseTime) {
            if (this.offcipdetailsModel.releaseDate) {
                this.offcipdetailsModel.releaseTime = TimeFormat.parse(TimeFormat.format(this.offcipdetailsModel.releaseTime),
                    DateFormat.getDate(this.offcipdetailsModel.releaseDate));
            }

            if (this.offcipdetailsModel.releaseTime && this.offcipdetailsModel.expiryTime &&
                (DateFormat.getDate(this.offcipdetailsModel.releaseTime) > DateFormat.getDate())) {
                this.show(this.translateService.translate('oidcipon.releasetimeequalorlessthansysdate'), 'warn');
                return;
            }
            if (this.offcipdetailsModel.effectiveTime &&
                DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsModel.effectiveTime),
                    DateFormat.getDate(this.offcipdetailsModel.releaseTime)) === 1) {
                this.show(this.translateService.translate('oidcipon.releasetimecannotbelesseffectivetime'), 'warn');
                return;
            }
            if (this.offcipdetailsModel.expiryTime &&
                DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsModel.releaseTime), DateFormat.getDate(this.offcipdetailsModel.expiryTime)) === 1) {
                this.show(this.translateService.translate('oidcipon.releasetimenotgreaterexpirytime'), 'warn');
                return;
            }
            if (this.vHeaderBlockModel.activeFlag === 'N') {
                this.offExternalMovModel = new OffenderExternalMovements();
                this.offExternalMovModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offExternalMovModel.dspDescription = 'releaseTime';
                this.offExternalMovModel.movementDate = this.offcipdetailsModel.effectiveDate;
                const dtValidationForInactiveResult = this.oidciponFactory.
                    dtValidationForInactiveOff(this.offExternalMovModel);
                dtValidationForInactiveResult.subscribe(dtValidationForInactiveResultList => {
                    if (dtValidationForInactiveResultList !== 'NONE') {
                        this.effectiveDateMessage = this.translateService.translate('oidcipon.dateandtimeearlierthanlastexternal')
                            + dtValidationForInactiveResultList
                            + this.translateService.translate('oidcipon.plschkdateandtime');
                        this.releaseTimeMsgFlag = true;
                        this.show(this.effectiveDateMessage, 'warn');
                        return;
                    } else {
                        this.effectiveDateMessage = null;
                        this.releaseTimeMsgFlag = false;
                    }
                });
            }

        }
        this.authorizeReadOnlyFlag = false;
        this.relByPerCodeReadOnlyFlag = false;
        this.durationTypeReadOnlyFlag = false;
        this.textBoxReadOnlyFlag = false;
    }

    offCipDetailsOnDeleteTrigger = () => {
        if (this.offcipdetailsModel.placementSeq && this.offcipdetailsModel.placementSeq > 0) {
            this.verifySaveFlag = true;
            this.saveFlag = false;
            if (this.effectiveDateMessage) {
                this.show(this.effectiveDateMessage, 'warn');
                return false;
            }
        }
        if (this.offcipdetailsData.length === 1) {
            if (this.offcipdetailsModel) {
                this.offcipdetailsModel = new OffenderCipDetails();
            }
        }
        return true;
    }

    butOicHearingWhenButtonPressedTrigger() {

        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            this.show(this.translateService.translate('oidcipon.savethechanges'), 'warn');
            return;
        }

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return;
        }
        if (!this.verifySaveFlag || !this.saveFlag) {
            this.show(this.translateService.translate('oidcipon.savethechanges'), 'warn');
            return;
        } else {
            this.oidoicusFactory.exitFlag = true;

            this.router.navigate(['/OIDOICUS']);
        }
    }
    butChangeHousingWhenButtonPressedTrigger() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            this.show(this.translateService.translate('oidcipon.savethechanges'), 'warn');
            return;
        }
        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return;
        }

        if (!this.verifySaveFlag || !this.saveFlag) {
            this.show(this.translateService.translate('oidcipon.savethechanges'), 'warn');
            return;
        } else {
            this.oidchlocFactory.exitFlag = true;
            this.router.navigate(['/OIDCHLOC']);
        }
    }

    offcipsubdetailsExecuteQuery() {
        const offcipdetailsResult = this.oidciponFactory.
            offCipDetailsExecuteQuery(this.voffcipdetailsModel);
        offcipdetailsResult.subscribe(offCipSubDetailsResultList => {
            if (offCipSubDetailsResultList.length === 0) {
            } else {
                for (let i = 0; i < offCipSubDetailsResultList.length; i++) {
                    if (offCipSubDetailsResultList[i].effectiveTime) {
                        offCipSubDetailsResultList[i].effectiveTime = DateFormat.getDate(offCipSubDetailsResultList[i].effectiveTime);
                    }
                    if (offCipSubDetailsResultList[i].expiryTime) {
                        offCipSubDetailsResultList[i].expiryTime = DateFormat.getDate(offCipSubDetailsResultList[i].expiryTime);
                    }
                    if (offCipSubDetailsResultList[i].releaseTime) {
                        offCipSubDetailsResultList[i].releaseTime = DateFormat.getDate(offCipSubDetailsResultList[i].releaseTime);
                    }
                    this.voffcipdetailsModel = offCipSubDetailsResultList[0];
                    this.offcipdetailsModel = this.voffcipdetailsModel;
                    this.durationFlag = true;
                }
            }
        });
    }

    oidciponSaveoffcipdetailsBlock() {

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return;
        }
        this.offcipdetailsInsertList = [];
        this.offcipdetailsUpdateList = [];
        this.offcipdetailsDeleteList = [];
        this.offcipdetailsCommitModel.insertList = [];
        this.offcipdetailsCommitModel.updateList = [];
        this.offcipdetailsCommitModel.deleteList = [];
        this.grid.addedMap.forEach((v: any, k: number) => {
            this.offcipdetailsInsertList.push(v);
        });
        this.grid.updatedMap.forEach((v: any, k: number) => {
            this.offcipdetailsUpdateList.push(v);
        });
        this.grid.removedMap.forEach((v: any, k: number) => {
            this.offcipdetailsDeleteList.push(v);
        });

        this.offCipDetailsSaveRecord();

        // if (this.offcipdetailsModel) {
        //     if (this.offcipdetailsModel.placementSeq && this.offcipdetailsModel.placementSeq > 0) {
        //         this.offcipdetailsUpdateList.push(this.offcipdetailsModel);
        //     } else {
        //         this.offcipdetailsInsertList.push(this.offcipdetailsModel);
        //     }

        //     this.offCipDetailsSaveRecord();
        // }

    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidciponSaveoffcipdetailsForm(event) {

        if (this.effectiveDateMessage) {
            this.show(this.effectiveDateMessage, 'warn');
            return;
        }
        this.offcipdetailsInsertList = event.added;
        this.offcipdetailsUpdateList = event.updated;
        this.offcipdetailsDeleteList = event.removed;
        this.offcipdetailsCommitModel.insertList = [];
        this.offcipdetailsCommitModel.updateList = [];
        this.offcipdetailsCommitModel.deleteList = [];
        this.offCipDetailsSaveRecord();

    }



    offCipDetailsSaveRecord() {

        if (this.offcipdetailsInsertList.length > 0) {
            for (let i = 0; i < this.offcipdetailsInsertList.length; i++) {
                if (!this.offcipdetailsInsertList[i].placementType) {
                    this.show(this.translateService.translate('Type must be entered'), 'warn');
                    return;
                }
                if (!this.offcipdetailsInsertList[i].placementReasonCode) {
                    this.show(this.translateService.translate('Reason must be entered'), 'warn');
                    return;
                }

                if (!this.offcipdetailsInsertList[i].agyLocId) {
                    this.show(this.translateService.translate('Facility must be entered'), 'warn');
                    return;
                }

                if (!this.offcipdetailsInsertList[i].reqByPerCode) {
                    this.show(this.translateService.translate('Requested By must be entered'), 'warn');
                    return;
                }
                if (!this.offcipdetailsInsertList[i].authByPerCode) {
                    this.show(this.translateService.translate('Authorized By must be entered'), 'warn');
                    return;
                }
                if (!this.offcipdetailsInsertList[i].authByPerName) {
                    this.show(this.translateService.translate('Name must be entered'), 'warn');
                    return;
                }

                if (!this.offcipdetailsInsertList[i].effectiveDate || !this.offcipdetailsInsertList[i].effectiveTime) {
                    if (!this.offcipdetailsInsertList[i].effectiveDate) {
                        this.show(this.translateService.translate('Effective Date must be entered'), 'warn');
                        return;
                    }

                    if (!this.offcipdetailsInsertList[i].effectiveTime) {
                        this.show(this.translateService.translate('Time must be entered'), 'warn');
                        return;
                    }

                    this.offcipdetailsInsertList[i].effectiveDate = DateFormat.getDate();
                    this.offcipdetailsInsertList[i].effectiveTime = DateFormat.getDate();
                    if (this.vHeaderBlockModel.activeFlag === 'N') {
                        this.offExternalMovModel = new OffenderExternalMovements();
                        this.offExternalMovModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                        this.offExternalMovModel.dspDescription = 'effectiveDate';
                        this.offExternalMovModel.movementDate = this.offcipdetailsInsertList[i].effectiveDate;
                        const dtValidationForInactiveResult = this.oidciponFactory.
                            dtValidationForInactiveOff(this.offExternalMovModel);
                        dtValidationForInactiveResult.subscribe(dtValidationForInactiveResultList => {
                            if (dtValidationForInactiveResultList !== 'NONE') {
                                this.effectiveDateMessage = this.translateService.translate('oidcipon.dateandtimeearlierthanlastexternal')
                                    + dtValidationForInactiveResultList
                                    + this.translateService.translate('oidcipon.plschkdateandtime');
                                this.efffectiveMsgFlag = true;
                                this.authorizeReadOnlyFlag = true;
                                this.relByPerCodeReadOnlyFlag = true;
                                this.durationTypeReadOnlyFlag = true;
                                this.textBoxReadOnlyFlag = true;
                                this.show(this.effectiveDateMessage, 'warn');
                                return;
                            } else {
                                this.effectiveDateMessage = null;
                                this.efffectiveMsgFlag = false;
                                this.authorizeReadOnlyFlag = false;
                                this.relByPerCodeReadOnlyFlag = false;
                                this.durationTypeReadOnlyFlag = false;
                                this.textBoxReadOnlyFlag = false;
                                return;
                            }

                        });
                    }
                    return;
                }
                if (!this.offcipdetailsInsertList[i].durationType) {
                    this.show(this.translateService.translate('Duration Type must be entered'), 'warn');
                    return;
                }
                if (this.offcipdetailsInsertList[i].durationType !== 'INDEFINITE') {
                    if (!this.offcipdetailsInsertList[i].duration) {
                        this.show(this.translateService.translate('Duration must be entered'), 'warn');
                        return;
                    }
                    if (this.offcipdetailsInsertList[i].duration <= 0) {
                        this.show(this.translateService.translate('oidcipon.pleaseprovidevalidduration'), 'warn');
                        return;
                    }
                    if (this.offcipdetailsInsertList[i].duration >= 0 && this.offcipdetailsInsertList[i].duration <= 999999) {
                        if (this.minimumDuration !== null && this.maximumDuration !== null) {
                            if (this.maximumDuration < this.offcipdetailsModel.duration ||
                                this.minimumDuration > this.offcipdetailsModel.duration) {
                                this.strDurationMessage = this.translateService.translate('oidcipon.durationlength') + ' ' +
                                    this.minimumDuration + ' ' + this.translateService.translate('oidcipon.durationand') + ' ' +
                                    this.maximumDuration;
                                this.show(this.strDurationMessage, 'warn');
                                return false;
                            }
                        }
                    }

                    if (this.offcipdetailsInsertList[i].duration < 0 || this.offcipdetailsInsertList[i].duration > 999999) {
                        this.show(this.translateService.translate('oidcipon.durationformat'), 'warn');
                        return false;
                    }
                }else{
                    this.offcipdetailsInsertList[i].duration = undefined;
                }
                if (this.strDurationMessage) {
                    this.show(this.strDurationMessage, 'warn');
                    return false;
                }
                if (!this.offcipdetailsInsertList[i].expiryDate) {
                    if (this.offcipdetailsInsertList[i].durationType === 'HOURS') {
                        this.lvEffectiveTime = this.addHours(this.offcipdetailsInsertList[i].effectiveTime,
                            this.offcipdetailsInsertList[i].duration);

                        this.offcipdetailsInsertList[i].expiryDate = DateFormat.getDate(this.lvEffectiveTime);
                        this.offcipdetailsInsertList[i].expiryTime = this.lvEffectiveTime;

                    } else if (this.offcipdetailsInsertList[i].durationType === 'DAYS') {
                        this.lvEffectiveTime = this.addDays(this.offcipdetailsInsertList[i].effectiveTime,
                            this.offcipdetailsInsertList[i].duration);

                        this.offcipdetailsInsertList[i].expiryDate = DateFormat.getDate(this.lvEffectiveTime);
                        this.offcipdetailsInsertList[i].expiryTime = this.lvEffectiveTime;
                    }

                }

                if (this.offcipdetailsInsertList[i].durationType) {
                    if (this.offcipdetailsInsertList[i].durationType !== 'INDEFINITE') {
                        if (!this.offcipdetailsInsertList[i].reviewDate) {
                            this.show(this.translateService.translate('Review Date must be entered'), 'warn');
                            return;
                        }
                    }
                }

                if (this.vHeaderBlockModel.activeFlag && this.vHeaderBlockModel.activeFlag === 'N') {
                    if (!this.offcipdetailsInsertList[i].releaseDate || !this.offcipdetailsInsertList[i].releaseTime) {
                        if (!this.offcipdetailsInsertList[i].releaseDate) {
                            this.show(this.translateService.translate('Date must be entered'), 'warn');
                            return;
                        }
                        if (!this.offcipdetailsInsertList[i].releaseTime) {
                            this.show(this.translateService.translate('Time must be entered'), 'warn');
                            return;
                        }

                        if (!this.offcipdetailsInsertList[i].releaseDate) {
                            this.offcipdetailsInsertList[i].releaseDate = this.offcipdetailsInsertList[i].expiryDate;
                            this.offcipdetailsInsertList[i].releaseTime = this.offcipdetailsInsertList[i].expiryTime;
                        }
                        return false;
                    }
                }

                this.offcipdetailsInsertList[i].effectiveTime = TimeFormat.parse(TimeFormat.format(
                    this.offcipdetailsInsertList[i].effectiveTime),
                    this.offcipdetailsInsertList[i].effectiveDate);
                this.offcipdetailsInsertList[i].releaseTime = TimeFormat.parse(TimeFormat.format(
                    this.offcipdetailsInsertList[i].releaseTime),
                    this.offcipdetailsInsertList[i].releaseDate);

                if (DateFormat.getDate(this.offcipdetailsInsertList[i].effectiveDate) > DateFormat.getDate()) {
                    this.show(this.translateService.translate('oidcipon.effectivedtnotgreater'), 'warn');
                          return;
                }
                if (this.offcipdetailsInsertList[i].releaseDate && DateFormat.getDate(this.offcipdetailsInsertList[i].effectiveDate) >
                    DateFormat.getDate(this.offcipdetailsInsertList[i].releaseTime)) {
                    this.show(this.translateService.translate('oidcipon.releasedategreaterthaneffectivedate'), 'warn');
                    return;
                }

                if (DateFormat.compareDateTime(DateFormat.getDate(this.offcipdetailsInsertList[i].effectiveTime), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidcipon.effectivetimelessthancurrentdate'), 'warn');
                    return;
                }

                if (DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsInsertList[i].reviewDate),
                    DateFormat.getDate(this.offcipdetailsInsertList[i].effectiveDate)) === -1) {
                    this.show(this.translateService.translate('oidcipon.reviewdtlessthaneffective'), 'warn');
                    return;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsInsertList[i].reviewDate),
                    DateFormat.getDate(this.offcipdetailsInsertList[i].expiryDate)) === 1) {
                    this.show(this.translateService.translate('Review Date cannot be greater than Expiry Date.'), 'warn');
                    return;
                }
                if (DateFormat.getDate(this.offcipdetailsInsertList[i].releaseDate) > DateFormat.getDate()) {
                    this.show(this.translateService.translate('oidcipon.releasedate'), 'warn');
                    return;
                }

                if (DateFormat.getDate(this.offcipdetailsInsertList[i].effectiveDate) >
                    DateFormat.getDate(this.offcipdetailsInsertList[i].releaseDate)) {
                    this.show(this.translateService.translate('oidcipon.releasedtnotlesseffdt'), 'warn');
                    return;

                }

                if (DateFormat.getDate(this.offcipdetailsInsertList[i].releaseDate) >
                    DateFormat.getDate(this.offcipdetailsInsertList[i].expiryDate)) {
                    this.show(this.translateService.translate('oidcipon.releasecannotgreaterexpiry'), 'warn');
                    return;
                }
                if (this.offcipdetailsInsertList[i].releaseTime) {
                    if (this.offcipdetailsInsertList[i].expiryTime &&
                        (DateFormat.getDate(this.offcipdetailsInsertList[i].effectiveTime) > DateFormat.getDate())) {
                        this.show(this.translateService.translate('oidcipon.releasetimeequalorlessthansysdate'), 'warn');
                        return;
                    }
                    if (DateFormat.getDate(this.offcipdetailsInsertList[i].effectiveTime) >
                        DateFormat.getDate(this.offcipdetailsInsertList[i].releaseTime)) {
                        this.show(this.translateService.translate('oidcipon.releasetimecannotbelesseffectivetime'), 'warn');
                        return;
                    }
                    if (this.offcipdetailsInsertList[i].expiryTime &&
                        DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsInsertList[i].releaseTime), DateFormat.getDate(this.offcipdetailsInsertList[i].expiryTime)) === 1) {
                        this.show(this.translateService.translate('oidcipon.releasetimenotgreaterexpirytime'), 'warn');
                        return;
                    }
                }

                if (!this.offcipdetailsInsertList[i].releaseDate) {
                    if (this.offcipdetailsInsertList[i].expiryTime &&
                        (DateFormat.getDate(this.offcipdetailsInsertList[i].expiryTime) <= DateFormat.getDate()) &&
                        this.offcipdetailsInsertList[i].durationType && this.offcipdetailsInsertList[i].durationType !== 'INDEFINITE') {
                        this.show(this.translateService.translate('oidcipon.youcannotreactive'), 'warn');
                        return;
                    }
                }


            }

            this.offcipdetailsCommitModel.insertList = this.offcipdetailsInsertList;
        }


        if (this.offcipdetailsUpdateList.length > 0) {
            for (let i = 0; i < this.offcipdetailsUpdateList.length; i++) {

                this.offcipdetailsUpdateList[i].effectiveDate = this.offcipdetailsModel.effectiveDate;
                this.offcipdetailsUpdateList[i].effectiveTime = this.offcipdetailsModel.effectiveTime;
                this.offcipdetailsUpdateList[i].expiryDate = this.offcipdetailsModel.expiryDate;
                this.offcipdetailsUpdateList[i].reviewDate = this.offcipdetailsModel.reviewDate;
                this.offcipdetailsUpdateList[i].releaseDate = this.offcipdetailsModel.releaseDate;

                if (!this.offcipdetailsUpdateList[i].placementType) {
                    this.show(this.translateService.translate('Type must be entered'), 'warn');
                    return;
                } if (!this.offcipdetailsUpdateList[i].placementReasonCode) {
                    this.show(this.translateService.translate('Reason must be entered'), 'warn');
                    return;
                }

                if (!this.offcipdetailsUpdateList[i].agyLocId) {
                    this.show(this.translateService.translate('Facility must be entered'), 'warn');
                    return;
                }

                if (!this.offcipdetailsUpdateList[i].reqByPerCode) {
                    this.show(this.translateService.translate('Requested By must be entered'), 'warn');
                    return;
                }

                if (!this.offcipdetailsUpdateList[i].authByPerCode) {
                    this.show(this.translateService.translate('Authorized By must be entered'), 'warn');
                    return;
                }

                if (!this.offcipdetailsUpdateList[i].authByPerName) {
                    this.show(this.translateService.translate('Name must be entered'), 'warn');
                    return;
                }

                if (!this.offcipdetailsUpdateList[i].effectiveDate || !this.offcipdetailsUpdateList[i].effectiveTime) {
                    if (!this.offcipdetailsUpdateList[i].effectiveDate) {
                        this.show(this.translateService.translate('Effective Date must be entered'), 'warn');
                        return;
                    }

                    if (!this.offcipdetailsUpdateList[i].effectiveTime) {
                        this.show(this.translateService.translate('Time must be entered'), 'warn');
                        return;
                    }
                    this.offcipdetailsUpdateList[i].effectiveDate = DateFormat.getDate();
                    this.offcipdetailsUpdateList[i].effectiveTime = DateFormat.getDate();
                    return;
                }
                if (!this.offcipdetailsUpdateList[i].durationType) {
                    this.show(this.translateService.translate('Duration Type must be entered'), 'warn');
                    return;
                }
                if (this.offcipdetailsUpdateList[i].durationType !== 'INDEFINITE') {
                    if (!this.offcipdetailsUpdateList[i].duration) {
                        this.show(this.translateService.translate('Duration must be entered'), 'warn');
                        return;
                    }
                    if (this.offcipdetailsUpdateList[i].duration <= 0) {
                        this.show(this.translateService.translate('oidcipon.pleaseprovidevalidduration'), 'warn');
                        return;
                    }
                    if (this.offcipdetailsUpdateList[i].duration >= 0 && this.offcipdetailsUpdateList[i].duration <= 999999) {
                        if ((this.minimumDuration !== null && this.minimumDuration !== 0) && (this.maximumDuration !== null
                            && this.maximumDuration !== 0)) {
                            if (this.maximumDuration < this.offcipdetailsModel.duration ||
                                this.minimumDuration > this.offcipdetailsModel.duration) {
                                this.strDurationMessage = this.translateService.translate('oidcipon.durationlength') + ' ' +
                                    this.minimumDuration + ' ' + this.translateService.translate('oidcipon.durationand') +
                                    this.maximumDuration;
                                this.show(this.strDurationMessage, 'warn');
                                return false;
                            }
                        }
                    }

                    if (this.offcipdetailsUpdateList[i].duration < 0 || this.offcipdetailsUpdateList[i].duration > 999999) {
                        this.show(this.translateService.translate('oidcipon.durationformat'), 'warn');
                        return false;
                    }
                }else{
                    this.offcipdetailsUpdateList[i].duration = undefined;
                }
                if (this.strDurationMessage) {
                    this.show(this.strDurationMessage, 'warn');
                    return false;
                }
                // if (!this.offcipdetailsUpdateList[i].expiryDate) {
                if (this.offcipdetailsUpdateList[i].durationType === 'HOURS') {
                    this.lvEffectiveTime = this.addHours(this.offcipdetailsUpdateList[i].effectiveTime,
                        this.offcipdetailsUpdateList[i].duration);

                    this.offcipdetailsUpdateList[i].expiryDate = DateFormat.getDate(this.lvEffectiveTime);
                    this.offcipdetailsUpdateList[i].expiryTime = this.lvEffectiveTime;

                } else if (this.offcipdetailsUpdateList[i].durationType === 'DAYS') {
                    this.lvEffectiveTime = this.addDays(this.offcipdetailsUpdateList[i].effectiveTime,
                        this.offcipdetailsUpdateList[i].duration);

                    this.offcipdetailsUpdateList[i].expiryDate = DateFormat.getDate(this.lvEffectiveTime);
                    this.offcipdetailsUpdateList[i].expiryTime = this.lvEffectiveTime;
                }

                // }

                if (this.offcipdetailsUpdateList[i].durationType) {
                    if (this.offcipdetailsUpdateList[i].durationType !== 'INDEFINITE') {
                        if (!this.offcipdetailsUpdateList[i].reviewDate) {
                            this.show(this.translateService.translate('Review Date must be entered'), 'warn');
                            return;
                        }
                    }
                }

                if (this.vHeaderBlockModel.activeFlag && this.vHeaderBlockModel.activeFlag === 'N') {
                    if (!this.offcipdetailsUpdateList[i].releaseDate || !this.offcipdetailsUpdateList[i].releaseTime) {
                        if (!this.offcipdetailsUpdateList[i].releaseDate) {
                            this.show(this.translateService.translate('Date must be entered'), 'warn');
                            return;
                        }
                        if (!this.offcipdetailsUpdateList[i].releaseTime) {
                            this.show(this.translateService.translate('Time must be entered'), 'warn');
                            return;
                        }
                    }
                }

                this.offcipdetailsUpdateList[i].effectiveTime = TimeFormat.parse(TimeFormat.format(
                    this.offcipdetailsUpdateList[i].effectiveTime),
                    this.offcipdetailsUpdateList[i].effectiveDate);
                this.offcipdetailsUpdateList[i].releaseTime = TimeFormat.parse(TimeFormat.format(
                    this.offcipdetailsUpdateList[i].releaseTime),
                    this.offcipdetailsUpdateList[i].releaseDate);

                if (DateFormat.getDate(this.offcipdetailsUpdateList[i].effectiveDate) > DateFormat.getDate()) {
                    this.show(this.translateService.translate('oidcipon.effectivedtnotgreater'), 'warn');
                    return;
                }
                if (this.offcipdetailsUpdateList[i].releaseDate && DateFormat.getDate(this.offcipdetailsUpdateList[i].effectiveDate) >
                    DateFormat.getDate(this.offcipdetailsUpdateList[i].releaseDate)) {
                    this.show(this.translateService.translate('oidcipon.releasedategreaterthaneffectivedate'), 'warn');
                    return;
                }

                if (DateFormat.compareDateTime(DateFormat.getDate(this.offcipdetailsUpdateList[i].effectiveTime), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidcipon.effectivetimelessthancurrentdate'), 'warn');
                    return;
                }

                if (DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsUpdateList[i].reviewDate),
                    DateFormat.getDate(this.offcipdetailsUpdateList[i].effectiveDate)) === -1) {
                    this.show(this.translateService.translate('oidcipon.reviewdtlessthaneffective'), 'warn');
                    return;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.offcipdetailsUpdateList[i].reviewDate),
                    DateFormat.getDate(this.offcipdetailsUpdateList[i].expiryDate)) === 1) {
                    this.show(this.translateService.translate('Review Date cannot be greater than Expiry Date.'), 'warn');
                    return;
                }
                if (DateFormat.getDate(this.offcipdetailsUpdateList[i].releaseDate) > DateFormat.getDate()) {
                    this.show(this.translateService.translate('oidcipon.releasedate'), 'warn');
                    return;
                }

                if (DateFormat.getDate(this.offcipdetailsUpdateList[i].effectiveDate) >
                    DateFormat.getDate(this.offcipdetailsUpdateList[i].releaseDate)) {
                    this.show(this.translateService.translate('oidcipon.releasedtnotlesseffdt'), 'warn');
                    return;
                }

                if (DateFormat.getDate(this.offcipdetailsUpdateList[i].releaseDate) >
                    DateFormat.getDate(this.offcipdetailsUpdateList[i].expiryDate)) {
                    this.show(this.translateService.translate('oidcipon.releasecannotgreaterexpiry'), 'warn');
                    return;
                }
                if (this.offcipdetailsUpdateList[i].releaseTime) {
                    if (this.offcipdetailsUpdateList[i].expiryTime &&
                        (DateFormat.getDate(this.offcipdetailsUpdateList[i].effectiveTime) > DateFormat.getDate())) {
                        this.show(this.translateService.translate('oidcipon.releasetimeequalorlessthansysdate'), 'warn');
                        return;
                    }
                    if (DateFormat.getDate(this.offcipdetailsUpdateList[i].effectiveTime) >
                        DateFormat.getDate(this.offcipdetailsUpdateList[i].releaseTime)) {
                        this.show(this.translateService.translate('oidcipon.releasetimecannotbelesseffectivetime'), 'warn');
                        return;
                    }
                    if (this.offcipdetailsUpdateList[i].expiryTime &&
                        (DateFormat.getDate(this.offcipdetailsUpdateList[i].releaseTime) >
                            DateFormat.getDate(this.offcipdetailsUpdateList[i].expiryTime))) {
                        this.show(this.translateService.translate('oidcipon.releasetimenotgreaterexpirytime'), 'warn');
                        return;
                    }
                }

                if (!this.offcipdetailsUpdateList[i].releaseDate) {
                    if (this.offcipdetailsUpdateList[i].expiryTime &&
                        (DateFormat.getDate(this.offcipdetailsUpdateList[i].expiryTime) <= DateFormat.getDate()) &&
                        this.offcipdetailsUpdateList[i].durationType && this.offcipdetailsUpdateList[i].durationType !== 'INDEFINITE') {
                        this.show(this.translateService.translate('oidcipon.youcannotreactive'), 'warn');
                        return;
                    }
                }


            }
            this.offcipdetailsCommitModel.updateList = this.offcipdetailsUpdateList;
        }
        if (this.offcipdetailsDeleteList.length > 0) {
            for (let i = 0; i < this.offcipdetailsDeleteList.length; i++) {
            }
            this.offcipdetailsCommitModel.deleteList = this.offcipdetailsDeleteList;
        }
        const offcipdetailsSaveData = this.oidciponFactory.offCipDetailsCommit(this.offcipdetailsCommitModel);
        offcipdetailsSaveData.subscribe(data => {
            if (data === 1) {
                this.offcipdetailsExecuteQuery();
                this.verifySaveFlag = true;
                this.saveFlag = true;
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            } else {
                this.offcipdetailsExecuteQuery();
                this.verifySaveFlag = false;
                this.saveFlag = true;
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }

    syspflExecuteQuery() {
        const syspflResult = this.oidciponFactory.sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(sysPflResultList => {
            if (sysPflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = sysPflResultList;
                this.syspflModel = sysPflResultList[0];
            }
        });
    }

    onBackButtonClick(){
        this.oidciponFactory.exitFlag = false;
        return this.router.navigate(['/OIICIPON']);
    }

    ngOnDestroy() {
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
    }
    onEoffenderClick = (data) => {
        this.eoffenderService.selectedRowData=data;
        this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : data['SCREEN'] } } );
     }
    
}
