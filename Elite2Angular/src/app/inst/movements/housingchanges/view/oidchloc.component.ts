import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidchlocService } from '@inst/movements/housingchanges/service/oidchloc.service';
import { BedAssignmentHistories } from '@instdemographicsbeans/BedAssignmentHistories';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { BedAssignmentHistoriesCommitBean } from '@instdemographicsbeans/BedAssignmentHistoriesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { LivingUnits } from '@instdemographicsbeans/LivingUnits';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { HousingService } from '@inst/movements/housingchanges/service/housing.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { InjectOffenderService } from '@core/service/inject-offender.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-oidchloc',
    templateUrl: './oidchloc.component.html'
})

export class OidchlocComponent implements OnInit {
    msgs: any[] = [];
    nameOfLovPage: string;
    bedahData: BedAssignmentHistories[] = [];
    bedahDataTemp: BedAssignmentHistories = new BedAssignmentHistories();
    bedahModel: BedAssignmentHistories = new BedAssignmentHistories();
    bedahModelTemp: BedAssignmentHistories = new BedAssignmentHistories();
    bedahIndex: number;
    bedahInsertList: BedAssignmentHistories[] = [];
    bedahUpdatetList: BedAssignmentHistories[] = [];
    bedahDeleteList: BedAssignmentHistories[] = [];
    bedAhCommitModel: BedAssignmentHistoriesCommitBean = new BedAssignmentHistoriesCommitBean();
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: number;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    disabled: boolean;
    editable: boolean;
    bedAhReadOnly: boolean;
    sysPflReadOnly: boolean;
    rgAssignmentReasonRg: any[] = [];
    reasonTitles = { code: 'Reason', description: 'Description' };
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    reasonCodeFlag: boolean;
    dateFlag: boolean;
    timeFlag: boolean;
    saveFlag: boolean;
    clearFlag: boolean;
    livUnitFlag: boolean;
    launchBtnFlag: boolean;
    descriptionFlag: boolean;
    modalData: any;
    livingunitsModel: LivingUnits = new LivingUnits();
    checkDateValid: boolean;
    checkInvalidId: boolean;
    checkLaunchFlag: boolean;
    assignmentDateTemp: any;
    assignmentTimeTemp: any;
    checkDefaultValuesExists: any;
    reasonReadOnly: any;
    locationReadOnly: any;
    timeReadOnly: any;
    dateReadOnly: any;
    changeHousingFlag: boolean;
    housingdialogTooltip: string;
    vHeaderBlockModelTemp: VHeaderBlock = new VHeaderBlock();
    backBtn: boolean;
    constructor(private oidchlocFactory: OidchlocService,
        private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService,
        public dialogService: DialogService,
        public osiosearFactory: OsiosearService,
        public housingService: HousingService,
        private sessionManager: UserSessionManager, private injectOffenderService: InjectOffenderService, private router: Router) {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    }
    ngOnInit() {
        this.reasonCodeFlag = true;
        this.dateFlag = true;
        this.timeFlag = true;
        this.saveFlag = true;
        this.livUnitFlag = true;
        this.launchBtnFlag = true;
        this.clearFlag = true;
        this.descriptionFlag = true;
        this.checkInvalidId = false;
        this.checkLaunchFlag = false;
        this.checkDefaultValuesExists = false;
        this.reasonReadOnly = true;
        this.locationReadOnly = true;
        this.timeReadOnly = true;
        this.dateReadOnly = true;
        this.changeHousingFlag = true;
        this.housingdialogTooltip = '';
        if (this.oidchlocFactory.exitFlag) {
            this.backBtn = true;
        }
        /*
        * getting Reason record group values from DB.
        */
        const reasonServiceObj = this.oidchlocFactory.
            rgAssignmentReasonRecordGroup();
        reasonServiceObj.subscribe(reasonList => {
            if (reasonList.length === 0) {
                this.rgAssignmentReasonRg = [];
            } else {
                for (let i = 0; i < reasonList.length; i++) {
                    this.rgAssignmentReasonRg.push({ 'id': reasonList[i].code, 'text': reasonList[i].description });
                }
            }
        });
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    /**
    * below event is called when click on row in search block
    */
    onOffenderChange(offender) {
        if (offender) {
            this.locationReadOnly = true;
            this.checkDefaultValuesExists = false;
            this.bedahModel = new BedAssignmentHistories();
            this.vHeaderBlockModel = offender;
            this.bedahDataTemp = new BedAssignmentHistories();
            this.bedahDataTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const getDateTime = this.oidchlocFactory.getMovementDateAndTime(this.bedahDataTemp);
            getDateTime.subscribe(dateTimeValues => {
                this.assignmentDateTemp = dateTimeValues.assignmentDate;
                this.assignmentTimeTemp = dateTimeValues.assignmentTime;
            });
            this.modalData = { bookingId: this.vHeaderBlockModel.offenderBookId, agyLocId: this.vHeaderBlockModel.agyLocId };
            if (this.vHeaderBlockModel.statusDisplay === 'Inactive' || !this.vHeaderBlockModel.statusDisplay ||
                this.vHeaderBlockModel.statusDisplay === 'Historic') {
                this.reasonCodeFlag = true;
                this.dateFlag = true;
                this.timeFlag = true;
                this.saveFlag = true;
                this.livUnitFlag = true;
                this.launchBtnFlag = true;
                this.clearFlag = true;
                this.descriptionFlag = true;
                this.changeHousingFlag = true;
                this.housingdialogTooltip = '';
            } else {
                this.reasonCodeFlag = false;
                this.dateFlag = false;
                this.timeFlag = false;
                this.livUnitFlag = false;
                this.launchBtnFlag = false;
                this.descriptionFlag = false;
                this.changeHousingFlag = true;
                this.housingdialogTooltip = '';
            }
        } else {
            this.reasonCodeFlag = true;
            this.dateFlag = true;
            this.timeFlag = true;
            this.saveFlag = true;
            this.livUnitFlag = true;
            this.launchBtnFlag = true;
            this.clearFlag = true;
            this.descriptionFlag = true;
            this.bedahModel = new BedAssignmentHistories();
            this.vHeaderBlockModel = offender;
            this.checkDefaultValuesExists = false;
            this.locationReadOnly = true;
            this.changeHousingFlag = true;
            this.housingdialogTooltip = '';
        }
    }
    /*
    * below method is used to do Date and Time field validations
    */
    doDateTimeValidations() {
        if (this.bedahModel.assignmentDate) {
            if ((DateFormat.compareDate(this.bedahModel.assignmentDate,
                DateFormat.getDate(this.assignmentDateTemp))) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidchloc.assignmentdatecannotbeearlierthenlastmovementdate');
                this.show();
                this.reasonReadOnly = true;
                this.locationReadOnly = true;
                this.timeReadOnly = true;
                this.dateReadOnly = false;
                return false;
            } else if ((DateFormat.compareDate(this.bedahModel.assignmentDate, DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidchloc.assignmentdatecannotbelaterthancurrentdate');
                this.show();
                this.reasonReadOnly = true;
                this.locationReadOnly = true;
                this.timeReadOnly = true;
                this.dateReadOnly = false;
                return false;
            } else if (this.bedahModel.assignmentTime) {
                const assTime = this.bedahModel.assignmentTime.getHours() + ':' + this.bedahModel.assignmentTime.getMinutes();
                this.bedahModel.assignmentTime = TimeFormat.parse(assTime,
                    this.bedahModel.assignmentDate);
                const dateTime = this.bedahModel.assignmentTime;
                //    const dateTimeTemp = dateTime.setSeconds(0);
                const currDate = DateFormat.getDate(this.assignmentTimeTemp);
                this.minDate = DateFormat.getDate();
                //    const dbDate = this.minDate.setSeconds(0);
                //    const currDateTemp = currDate.setSeconds(0);
                const currDateTemp = currDate;
                const dateTimeTemp = dateTime;
                const dbDate = this.minDate;
                if ((DateFormat.compareDateTime(DateFormat.getDate(dateTimeTemp), DateFormat.getDate(currDateTemp))) === -1 ||
                    (DateFormat.compareDateTime(DateFormat.getDate(dateTimeTemp), DateFormat.getDate(currDateTemp))) === 0) {
                    this.type = 'warn';
                    this.message = this.translateService.
                        translate('oidchloc.assignmentdateandtimecannotbeearlierthenlastmovementdateandtime');
                    this.show();
                    this.reasonReadOnly = true;
                    this.locationReadOnly = true;
                    this.dateReadOnly = true;
                    return false;
                } else if ((DateFormat.compareDate(this.bedahModel.assignmentDate, DateFormat.getDate())) === 0) {
                    if ((DateFormat.compareDateTime(DateFormat.getDate(dateTimeTemp), DateFormat.getDate(dbDate))) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.
                            translate('oidchloc.assignmenttimecannotbelaterthanthecurrenttime');
                        this.show();
                        this.reasonReadOnly = true;
                        this.locationReadOnly = true;
                        this.dateReadOnly = true;
                        return false;
                    } else {
                        this.launchBtnFlag = false;
                        this.locationReadOnly = false;
                        this.dateReadOnly = false;
                        this.reasonReadOnly = false;
                        this.timeReadOnly = false;
                        this.checkBaseImageExist(this.vHeaderBlockModel.agyLocId);
                        return true;
                    }
                }
            } else {
                this.launchBtnFlag = false;
                this.locationReadOnly = false;
                this.dateReadOnly = false;
                this.reasonReadOnly = false;
                this.timeReadOnly = false;
                return true;
            }
        }
    }
    /*
    * when click on any field under Bed Assignments by default Current Date and time,Reason will be bind.
    * it will through some validation also when date and time conditions does not satisfy
    */
    setDefaultValues() {
        if (this.vHeaderBlockModel.offenderBookId) {
            if (this.vHeaderBlockModel.statusDisplay === 'Active') {
                this.saveFlag = false;
                this.clearFlag = false;
                if (!this.checkDefaultValuesExists) {
                    this.checkDefaultValuesExists = true;
                    if (!this.bedahModel.assignmentReason) {
                        this.bedahModel.assignmentReason = this.rgAssignmentReasonRg[0].id;
                    }
                    if (!this.bedahModel.livingUnitId) {
                        this.bedahModel.dspDescription = undefined;
                    }
                    if (!this.bedahModel.assignmentDate) {
                        this.bedahModel.assignmentDate = DateFormat.getDate();
                    }
                    if (!this.bedahModel.assignmentTime) {
                        this.bedahModel.assignmentTime = DateFormat.getDate();
                    }
                }
                this.doDateTimeValidations();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('oidchloc.youcannotchangeinactiveoffendersdetails');
                this.show();
            }
        }
    }

    /*
    * below event is called when close the OMUABED screen
    * dspDescription and livingUnitId values will be bind to this.bedahModel of BedAssignmentHistorie()
    */
    setDescription(event) {
        if (event) {
            this.checkDateValid = false;
            this.bedahModel.dspDescription = event.dspDescription;
            this.bedahModel.livingUnitId = event.livingUnitId;
            this.bedahModel.isNonAssocOverriddenWarn=event.isNonAssocOverriddenWarn?event.isNonAssocOverriddenWarn:'N';
            this.bedahModel.notification=event.warningMsg;
            this.setDefaultValues();
        } else {
            this.checkDateValid = false;
            this.onBlur();
        }
    }

    /*
    * Below event is fired when click on clear button
    * this.bedahModel and if give non validate value in Reason field values will be cleared when click on clear
    */
    clear() {
        const reasonCode = this.bedahModel.assignmentReason === undefined ? '' : undefined;
        this.bedahModel = new BedAssignmentHistories();
        this.bedahModel.assignmentReason = reasonCode;
        this.clearFlag = true;
        this.checkDefaultValuesExists = false;
        this.launchBtnFlag = false;
        this.changeHousingFlag = true;
        this.housingdialogTooltip = '';
    }
    /*
    * Below event is fired when click on Save Button
    * Record will be save in BedAssignmentHistories table and livingunitid will be update in OffenderBookings table
    */
    bedAssignHistoriesCommit() {
        this.checkInvalidId = true;
        if (!this.bedahModel.assignmentDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbeentered');
            this.show();
            return;
        }
        if (!this.bedahModel.assignmentTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.timemustbeentered');
            this.show();
            return;
        }
        if (!this.bedahModel.assignmentReason) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.reasonmustbeentered');
            this.show();
            return;
        }
        if (!this.bedahModel.livingUnitId) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.locationmust');
            this.show();
            return;
        }
        if ((DateFormat.compareDate(this.bedahModel.assignmentDate,
            DateFormat.getDate(this.assignmentDateTemp))) === -1) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidchloc.assignmentdatecannotbeearlierthenlastmovementdate');
            this.show();
            return;
        }
        if ((DateFormat.compareDate(this.bedahModel.assignmentDate, DateFormat.getDate())) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidchloc.assignmentdatecannotbelaterthancurrentdate');
            this.show();
            return;
        }
        const assTime = this.bedahModel.assignmentTime.getHours() + ':' + this.bedahModel.assignmentTime.getMinutes();
        this.bedahModel.assignmentTime = TimeFormat.parse(assTime,
            this.bedahModel.assignmentDate);
        const dateTime = this.bedahModel.assignmentTime;
        // const dateTimeTemp = dateTime.setSeconds(0);
        const currDate = DateFormat.getDate(this.assignmentTimeTemp);
        this.minDate = undefined;
        this.minDate = DateFormat.getDate();
        // const dbDate = this.minDate.setSeconds(0);
        // const currDateTemp = currDate.setSeconds(0);
        const currDateTemp = currDate;
        const dateTimeTemp = dateTime;
        const dbDate = this.minDate;
        if ((DateFormat.compareDateTime(DateFormat.getDate(dateTimeTemp), DateFormat.getDate(currDateTemp))) === -1 ||
            (DateFormat.compareDateTime(DateFormat.getDate(dateTimeTemp), DateFormat.getDate(currDateTemp))) === 0) {
            this.type = 'warn';
            this.message = this.translateService.
                translate('oidchloc.assignmentdateandtimecannotbeearlierthenlastmovementdateandtime');
            this.show();
            return;
        }
        if ((DateFormat.compareDate(this.bedahModel.assignmentDate, DateFormat.getDate())) === 0) {
            if ((DateFormat.compareDateTime(DateFormat.getDate(dateTimeTemp), DateFormat.getDate(dbDate))) === 1) {
                this.launchBtnFlag = true;
                this.changeHousingFlag = true;
                this.housingdialogTooltip = '';
                this.type = 'warn';
                this.message = this.translateService.translate('oidchloc.assignmenttimecannotbelaterthanthecurrenttime');
                this.show();
                return;
            }
        }

        this.bedahModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.bedahInsertList = [];
        this.bedAhCommitModel.insertList = [];
        this.bedahInsertList.push(this.bedahModel);
        this.bedAhCommitModel.insertList = this.bedahInsertList;
        if (!this.bedahModel.dspDescription) {
            const serviceObjDes = this.oidchlocFactory.getDescriptionOfLivingUnitId(this.livingunitsModel);
            serviceObjDes.subscribe(descValue => {
                if (!descValue.description) {
                    const data = {
                        label: this.translateService.translate('oidchloc.thisbedlocationdoesnotexist'), yesBtn: true, noBtn: false
                    };
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                        if (result) {
                            this.bedahModel.dspDescription = undefined;
                            this.bedahModel.livingUnitId = undefined;
                        } else {
                            this.bedahModel.dspDescription = undefined;
                            this.bedahModel.livingUnitId = undefined;
                        }
                    });
                } else if (descValue !== undefined) {
                    this.bedahModelTemp.livingUnitId = this.bedahModel.livingUnitId;
                    this.bedahModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                    const checkConfictService = this.oidchlocFactory.checkAllConficts(this.bedahModelTemp);
                    checkConfictService.subscribe(confictDetails => {
                        if (confictDetails.warningMsg !== 'null') {
                            const data = {
                                warningMsg: confictDetails.warningMsg, warningPrompt: confictDetails.warningPrompt,
                                yesBtn: true, noBtn: true
                            };
                            this.dialogService.openLinkDialog('/OCUWARNG', data, 80).subscribe(result => {
                                if (result) {
                                    this.bedahModel.dspDescription = descValue.description;
                                    this.bedahInsertList = [];
                                    this.bedAhCommitModel.insertList = [];
                                    this.bedahInsertList.push(this.bedahModel);
                                    this.bedAhCommitModel.insertList = this.bedahInsertList;
                                    this.commitQuery();
                                } else {
                                    this.checkInvalidId = false;
                                    this.bedahModel.livingUnitId = undefined;
                                    this.bedahModel.dspDescription = undefined;
                                }
                            });
                        } else {
                            this.commitQuery();
                        }
                    });
                }

            });
        } else {
            this.commitQuery();
        }
    }
    /**
    *  This function will be executed when we click on launch button in bed assignmnets block
    *
    */
    onLaunchBtnClick = () => {
        this.checkDateValid = true;
        this.checkLaunchFlag = true;
        const checkDTvalidations = this.doDateTimeValidations();
        if (!checkDTvalidations && checkDTvalidations !== undefined) {
            return false;
        } else {
            return true;
        }
    }
    /*
    * Below event is fired when click on Save Button
    * Record will be save in BedAssignmentHistories table and livingunitid will be update in OffenderBookings table
    */
    commitQuery() {
        this.bedAhCommitModel.insertList[0].createUserId = this.sessionManager.getId();
        this.bedAhCommitModel.insertList[0].agyLocId=this.vHeaderBlockModel.agyLocId; 
        const bedAhData1 = this.oidchlocFactory.bedAhCommit(this.bedAhCommitModel);
        bedAhData1.subscribe(bedAhSaveResult => {
            if (bedAhSaveResult[0] === 0) {
            } else {
                this.vHeaderBlockModel.livingUnitId = this.bedahModel.livingUnitId;
                const offData = this.oidchlocFactory.offBkgCommit(this.vHeaderBlockModel);
                offData.subscribe(offResult => {
                    if (offResult[0] === 0) {
                    } else {
                        this.clearFlag = true;
                        this.checkInvalidId = false;
                        this.vHeaderBlockModelTemp = new VHeaderBlock();
                        this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                        this.vHeaderBlockModelTemp.agyLocId = this.sessionManager.currentCaseLoad;
                        //const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                        this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                        /*offbkGlobal.subscribe(list => {
                            if (list.length > 0) {
                                this.vHeaderBlockModel = list[0];
                            }
                        });*/
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                        this.changeHousingFlag = true;
                        this.bedahModel = new BedAssignmentHistories();
                    }
                });
            }
        });
    }
    /*
    * This event is fired when any field lost focus
    */
    onBlur() {
        this.livingunitsModel = new LivingUnits();
        if (this.bedahModel.livingUnitId) {
            if (String(this.bedahModel.livingUnitId).length > 7) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidchloc.locationlengthshouldbelessthan');
                this.show();
                return;

            }
            this.livingunitsModel.livingUnitId = this.bedahModel.livingUnitId;
            this.livingunitsModel.agyLocId = this.vHeaderBlockModel.agyLocId;
            const serviceObjDes = this.oidchlocFactory.getDescriptionOfLivingUnitId(this.livingunitsModel);
            serviceObjDes.subscribe(descValue => {
                this.bedahModelTemp = new BedAssignmentHistories();
                this.bedahModelTemp.livingUnitId = this.bedahModel.livingUnitId;
                this.bedahModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.bedahModelTemp.agyLocId =this.vHeaderBlockModel.agyLocId;
                
                const checkConfictService = this.oidchlocFactory.checkAllConficts(this.bedahModelTemp);
                checkConfictService.subscribe(confictDetails => {
                    if (!this.checkLaunchFlag) {
                        this.checkDateValid = false;
                    }
                    if (!descValue.description) {
                        if (!this.checkInvalidId && this.checkDateValid !== undefined && !this.checkDateValid) {
                            const data = {
                                label: this.translateService.translate('oidchloc.thisbedlocationdoesnotexist'), yesBtn: true, noBtn: false
                            };
                            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                                if (typeof result === 'boolean' && result) {
                                    this.bedahModel.dspDescription = undefined;
                                    this.bedahModel.livingUnitId = undefined;
                                } else {
                                    this.bedahModel.dspDescription = undefined;
                                    this.bedahModel.livingUnitId = undefined;
                                }
                            });
                        }
                    } else if (confictDetails.warningMsg !== 'null') {
                        this.bedahModelTemp.warningMsg = confictDetails.warningMsg;
                        this.bedahModelTemp.warningPrompt = confictDetails.warningPrompt;
                        this.bedahModelTemp.dspDescription = descValue.description;
                        if (!this.checkInvalidId && !this.bedahModel.dspDescription && !this.checkDateValid &&
                            this.checkDateValid !== undefined) {
                            const data = {
                                warningMsg: confictDetails.warningMsg,
                                warningPrompt: confictDetails.warningPrompt, yesBtn: true, noBtn: true
                            };
                            this.dialogService.openLinkDialog('/OCUWARNG', data, 80).subscribe(result => {
                                if (typeof result === 'boolean' && result) {
                                    this.bedahModel.dspDescription = descValue.description;
                                } else {
                                    this.bedahModel.livingUnitId = undefined;
                                    this.bedahModel.dspDescription = undefined;
                                }
                            });
                        }
                    } else if (descValue.description) {
                        if (!this.checkInvalidId) {
                            this.bedahModel.dspDescription = descValue.description;
                        }
                    } else {
                    }

                });
            });
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    checkBaseImageExist(agyLocation) {
        const imageId = this.housingService.searchBaseImageForLocation(agyLocation).subscribe(imageIdVar => {
            if (imageIdVar !== 0) {
                this.changeHousingFlag = false;
                this.housingdialogTooltip = '';
            } else {
                this.changeHousingFlag = true;
                this.housingdialogTooltip = this.translateService.translate('housing.selectedOffenderfacilitydoesnotcontainanyimage');
            }
        });
    }

    openHousingDialog() {
        this.dialogService.openLinkDialog('/HOUSING', this.vHeaderBlockModel, 100, 100, undefined,
            'cdk-overlay-pane-housing').subscribe(result => {
                if (result) {
                    this.bedahModel.dspDescription = result.allocated;
                    this.bedahModel.livingUnitId = result.internalLocationId;
                    this.bedahModel.notification = result.warningMsg;
                }
            });
    }
    onbackBtnClick = () => {
        if (this.oidchlocFactory.exitFlag) {
            this.backBtn = false;
            this.oidchlocFactory.exitFlag = false;
            this.router.navigate(['/OIDCIPON']);
        }
    }
}
