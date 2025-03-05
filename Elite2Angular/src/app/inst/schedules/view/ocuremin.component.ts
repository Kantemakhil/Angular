import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { CourtEvents } from '../../schedules/beans/CourtEvents';
import { CourtEventsCommitBean } from '../beans/CourtEventsCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OcureminService } from '../service/ocuremin.service';
import { OcdclogsService } from '@iwp/service/ocdclogs.service';
import { VOffenderAllSchedulesCommitBean } from '../beans/VOffenderAllSchedulesCommitBean';
import { VOffenderAllSchedules } from '../beans/VOffenderAllSchedules';
import { OffenderCourseAttendance } from '@cm/programsservices/beans/OffenderCourseAttendance';
import { OffenderCourseAttendancesCommitBean } from '@cm/programsservices/beans/OffenderCourseAttendancesCommitBean';
import { OcdprogrService } from '@cm/programsservices/service/ocdprogr.service';
import { OffenderProgramProfiles } from '@inst/programs-without-schedules/beans/OffenderProgramProfiles';
import { OffenderProgramProfilesCommitBean } from '@inst/programs-without-schedules/beans/OffenderProgramProfilesCommitBean';
import { OcduprojService } from '@cm/programsservices/service/ocduproj.service';

@Component({
    selector: 'app-ocuremin',
    templateUrl: './ocuremin.component.html'
})
export class OcureminComponent implements OnInit {
    msgs: { message: any; type: any; }[];
    smsFlag: boolean;
    emailFlag: boolean;
    emailHoursBefore: number;
    smsHoursBefore: number;
    smsHoursFlag: boolean;
    emailHoursFlag: boolean;
    smsFlagCheck: boolean = false;
    emailFlagCheck: boolean = false;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    courtEvents: CourtEvents = new CourtEvents();
    courtEventsCommitBean: CourtEventsCommitBean = new CourtEventsCommitBean();
    smsFlagTemp: boolean;
    emailFlagTemp: boolean;
    emailHoursBeforeTemp: number;
    smsHoursBeforeTemp: number;
    offenderBookId: number;
    emailAndPhoneNumberCheck: CourtEvents = new CourtEvents();
    eventDateTime: Date;
    emailConfig: boolean;
    smsConfig: boolean;
    offschCommitModel: VOffenderAllSchedulesCommitBean = new VOffenderAllSchedulesCommitBean();
    offschUpdatetList: VOffenderAllSchedules = new VOffenderAllSchedules;
    scheduler: VOffenderAllSchedules = new VOffenderAllSchedules();
    comAccredited: OffenderCourseAttendance = new OffenderCourseAttendance();
    offcrsappCommitModel: OffenderCourseAttendancesCommitBean = new OffenderCourseAttendancesCommitBean();
    offcrsappUpdateList: OffenderCourseAttendance = new OffenderCourseAttendance;
    offenderProgramProfiles: OffenderProgramProfiles = new OffenderProgramProfiles();
    offenderProgramProfilesCommitBean: OffenderProgramProfilesCommitBean = new OffenderProgramProfilesCommitBean();
    projallocModel: OffenderProgramProfiles= new OffenderProgramProfiles();
    projallocCommitModel: OffenderProgramProfilesCommitBean = new OffenderProgramProfilesCommitBean();
    constructor(public translateService: TranslateService, public dialogService: DialogService,
        private sessionManager: UserSessionManager, public ocureminService: OcureminService,
        private ocdclogsFactory: OcdclogsService, private ocdprogrFactory: OcdprogrService , private ocduprojFactory: OcduprojService) {

    }
    ngOnInit() {
        this.smsHoursFlag = true;
        this.emailHoursFlag = true;
        if (this.dialog.data.screenId === 'OIDCRTEV') {
            this.courtEvents = this.dialog.data;
            this.offenderBookId = this.courtEvents.offenderBookId;
            this.smsFlag = (this.courtEvents.smsFlag === 'Y') ? true : false;
            this.emailFlag = (this.courtEvents.emailFlag === 'Y') ? true : false;
            this.emailHoursBefore = this.courtEvents.emailScheduleHoursBefore;
            this.smsHoursBefore = this.courtEvents.smsScheduleHoursBefore;
            this.emailHoursFlag = !this.emailFlag;
            this.smsHoursFlag = !this.smsFlag;

            this.smsFlagTemp = (this.courtEvents.smsFlag === 'Y') ? true : false;
            this.emailFlagTemp = (this.courtEvents.emailFlag === 'Y') ? true : false;
            this.emailHoursBeforeTemp = this.courtEvents.emailScheduleHoursBefore;
            this.smsHoursBeforeTemp = this.courtEvents.smsScheduleHoursBefore;
            let startHours = DateFormat.getDate(this.courtEvents.startTime).getHours();
            let startMinutes = DateFormat.getDate(this.courtEvents.startTime).getMinutes();
            this.eventDateTime = DateFormat.getDate(DateFormat.getDate(this.courtEvents.eventDate).setHours(startHours, startMinutes, 0, 0));

        }
        if (this.dialog.data.screenId === 'OCDCSCH') {
            this.emailFlag = this.dialog.data.emailFlag;
            this.smsFlag = this.dialog.data.smsFlag;
            this.smsFlagTemp = this.dialog.data.smsFlag;
            this.emailFlagTemp = this.dialog.data.emailFlag;

            this.emailHoursBefore = this.dialog.data.emailScheduleHoursBefore;
            this.smsHoursBefore = this.dialog.data.smsScheduleHoursBefore;
            this.emailHoursFlag = !this.emailFlag;
            this.smsHoursFlag = !this.smsFlag;
            let startHours = DateFormat.getDate(this.dialog.data.startTime).getHours();
            let startMinutes = DateFormat.getDate(this.dialog.data.startTime).getMinutes();
            this.eventDateTime = DateFormat.getDate(DateFormat.getDate(this.dialog.data.eventDate).setHours(startHours, startMinutes, 0, 0));
            this.emailHoursBeforeTemp = this.dialog.data.emailScheduleHoursBefore;
            this.smsHoursBeforeTemp = this.dialog.data.smsScheduleHoursBefore;
            if (this.dialog.data.eventSubType) {
                if (this.dialog.data.eventType && this.dialog.data.eventSubType) {
                    const validateNoteTypeSubType = this.ocdclogsFactory.getEmailSmsFlag(this.dialog.data);
                    validateNoteTypeSubType.subscribe(data => {
                        if (data.length > 0) {
                            data.forEach(ele => {
                                this.emailConfig = ele.emailFlag === 'Y' ? true : false;
                                this.smsConfig = ele.smsFlag === 'Y' ? true : false;
                            });
                        }

                    });

                }

            }


        }

        else if (this.dialog.data.screenId === 'OSANVIOS') {
            this.courtEvents = this.dialog.data;
            this.offenderBookId = this.courtEvents.offenderBookId;
            this.smsFlag = (this.courtEvents.smsFlag === 'Y') ? true : false;
            this.emailFlag = (this.courtEvents.emailFlag === 'Y') ? true : false;
            this.emailHoursBefore = this.courtEvents.emailScheduleHoursBefore;
            this.smsHoursBefore = this.courtEvents.smsScheduleHoursBefore;
            this.emailHoursFlag = !this.emailFlag;
            this.smsHoursFlag = !this.smsFlag;

            this.smsFlagTemp = (this.courtEvents.smsFlag === 'Y') ? true : false;
            this.emailFlagTemp = (this.courtEvents.emailFlag === 'Y') ? true : false;
            this.emailHoursBeforeTemp = this.courtEvents.emailScheduleHoursBefore;
            this.smsHoursBeforeTemp = this.courtEvents.smsScheduleHoursBefore;
            let startHours = DateFormat.getDate(this.courtEvents.startTime).getHours();
            let startMinutes = DateFormat.getDate(this.courtEvents.startTime).getMinutes();
            this.eventDateTime = DateFormat.getDate(DateFormat.getDate(this.courtEvents.eventDate).setHours(startHours, startMinutes, 0, 0));

        }
        else if (this.dialog.data.screenId === 'OCDPROGR' && this.dialog.data.subType === 'Appointment') {
            this.comAccredited = this.dialog.data;
            this.offenderBookId = this.comAccredited.offenderBookId;
            this.smsFlag = (this.comAccredited.smsFlag === 'Y') ? true : false;
            this.emailFlag = (this.comAccredited.emailFlag === 'Y') ? true : false;
            this.emailHoursBefore = this.comAccredited.emailScheduleHoursBefore;
            this.smsHoursBefore = this.comAccredited.smsScheduleHoursBefore;
            this.emailHoursFlag = !this.emailFlag;
            this.smsHoursFlag = !this.smsFlag;
            this.emailConfig = this.comAccredited.emailFlagConfig === 'Y' ? true : false;
            this.smsConfig = this.comAccredited.smsFlagConfig === 'Y' ? true : false;
            this.smsFlagTemp = (this.comAccredited.smsFlag === 'Y') ? true : false;
            this.emailFlagTemp = (this.comAccredited.emailFlag === 'Y') ? true : false;
            this.emailHoursBeforeTemp = this.comAccredited.emailScheduleHoursBefore;
            this.smsHoursBeforeTemp = this.comAccredited.smsScheduleHoursBefore;
            let startHours = DateFormat.getDate(this.comAccredited.startTime).getHours();
            let startMinutes = DateFormat.getDate(this.comAccredited.startTime).getMinutes();
            this.eventDateTime = DateFormat.getDate(DateFormat.getDate(this.comAccredited.eventDate).setHours(startHours, startMinutes, 0, 0));

        }
        else if (this.dialog.data.screenId === 'OCDPROGR' && this.dialog.data.eventSubType === 'Assignment') {
            this.offenderProgramProfiles = this.dialog.data;
            this.offenderBookId = this.offenderProgramProfiles.offenderBookId;
            this.smsFlag = (this.offenderProgramProfiles.smsFlag === 'Y') ? true : false;
            this.emailFlag = (this.offenderProgramProfiles.emailFlag === 'Y') ? true : false;
            this.emailHoursBefore = this.offenderProgramProfiles.emailScheduleHoursBefore;
            this.smsHoursBefore = this.offenderProgramProfiles.smsScheduleHoursBefore;
            this.emailHoursFlag = !this.emailFlag;
            this.smsHoursFlag = !this.smsFlag;

            this.smsFlagTemp = (this.offenderProgramProfiles.smsFlag === 'Y') ? true : false;
            this.emailFlagTemp = (this.offenderProgramProfiles.emailFlag === 'Y') ? true : false;
            this.emailHoursBeforeTemp = this.offenderProgramProfiles.emailScheduleHoursBefore;
            this.smsHoursBeforeTemp = this.offenderProgramProfiles.smsScheduleHoursBefore;
            if (this.offenderProgramProfiles.programLastEventDate) {
                let startHours = DateFormat.getDate(this.offenderProgramProfiles.programLastEventDate).getHours();
                let startMinutes = DateFormat.getDate(this.offenderProgramProfiles.programLastEventDate).getMinutes();
                this.eventDateTime = DateFormat.getDate(DateFormat.getDate(this.offenderProgramProfiles.programLastEventDate).setHours(startHours, startMinutes, 0, 0));
            }
        }
            else if (this.dialog.data.screenId === 'OCDUPROJ') { 
                this.projallocModel = this.dialog.data;
                this.offenderBookId = this.projallocModel.offenderBookId;
                this.smsFlag = (this.projallocModel.smsFlag === 'Y') ? true : false;
                this.emailFlag = (this.projallocModel.emailFlag === 'Y') ? true : false;
                this.emailHoursBefore = this.projallocModel.emailScheduleHoursBefore;
                this.smsHoursBefore = this.projallocModel.smsScheduleHoursBefore;
                this.emailHoursFlag = !this.emailFlag;
                this.smsHoursFlag = !this.smsFlag;
    
                this.smsFlagTemp = (this.projallocModel.smsFlag === 'Y') ? true : false;
                this.emailFlagTemp = (this.projallocModel.emailFlag === 'Y') ? true : false;
                this.emailHoursBeforeTemp = this.projallocModel.emailScheduleHoursBefore;
                this.smsHoursBeforeTemp = this.projallocModel.smsScheduleHoursBefore;
                if (this.projallocModel.programLastEventDate) {
                    let startHours = DateFormat.getDate(this.projallocModel.programLastEventDate).getHours();
                    let startMinutes = DateFormat.getDate(this.projallocModel.programLastEventDate).getMinutes();
                    this.eventDateTime = DateFormat.getDate(DateFormat.getDate(this.projallocModel.programLastEventDate).setHours(startHours, startMinutes, 0, 0));
                }
        }
        

        if (this.smsFlag && this.smsHoursBefore) {
            if (this.disableOrEnable(this.eventDateTime, this.smsHoursBefore)) {
                this.smsFlagCheck = true;
                this.smsHoursFlag = true;
            }
        }
        if (this.emailFlag && this.emailHoursBefore) {
            if (this.disableOrEnable(this.eventDateTime, this.emailHoursBefore)) {
                this.emailFlagCheck = true;
                this.emailHoursFlag = true;
            }
        }

        this.phoneNumberAndEmailCheck();
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    smsChangeFlag() {
        if (!this.smsFlag) {
            this.smsHoursBefore = undefined;
            this.smsHoursBeforeTemp = undefined;
        }
        this.smsHoursFlag = this.smsFlag ? false : true;
        if (this.dialog.data.screenId === 'OCDCSCH') {
            if (this.smsConfig === false) {
                setTimeout(() => {
                    this.smsFlag = false;
                }, 100);
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.smsmandatory');
                this.show();
                return;
            }
        }
        if (this.dialog.data.screenId === 'OCDPROGR' && this.dialog.data.subType === 'Appointment') {
            if (!this.smsConfig) {
                setTimeout(() => {
                    this.smsFlag = false;
                }, 100);
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.smsmandatory');
                this.show();
                return;
            }
        }
       
    }

    emailChangeFlag() {
         if (!this.emailFlag) {
            this.emailHoursBefore = undefined;
            this.emailHoursBeforeTemp=undefined;
        }
        this.emailHoursFlag = this.emailFlag ? false : true;
        if (this.dialog.data.screenId === 'OCDCSCH') {
            if (this.emailConfig === false) {
                setTimeout(() => {
                    this.emailFlag = false;
                }, 100);
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailmandatory');
                this.show();
                return;
            }
        }
        else if (this.dialog.data.screenId === 'OCDPROGR' && this.dialog.data.subType === 'Appointment') {
            if (this.emailConfig === false) {
                setTimeout(() => {
                    this.emailFlag = false;
                }, 100);
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailmandatory');
                this.show();
                return;
            }
        }
    }
    save() {
        this.courtEventsCommitBean.updateList = [];

        if (this.dialog.data.screenId === 'OIDCRTEV') {
            if (this.smsFlag && !this.emailAndPhoneNumberCheck.phoneNumberCheckFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.phonenumbermustbeenter');
                this.show();
                return;
            }

            if (this.emailFlag && !this.emailAndPhoneNumberCheck.emailCheckFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailmustbeentered');
                this.show();
                return;
            }

            if (this.smsFlag && !this.smsHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.smshoursmustbeenter');
                this.show();
                return;
            }
            if (this.emailFlag && !this.emailHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailhoursmustbeenter');
                this.show();
                return;
            }
            this.courtEvents.modifyDatetime = DateFormat.getDate();
            this.courtEvents.modifyUserId = this.sessionManager.getId();
            this.courtEvents.smsFlag = this.smsFlag ? 'Y' : 'N';
            this.courtEvents.emailFlag = this.emailFlag ? 'Y' : 'N';
            this.courtEvents.smsScheduleHoursBefore = this.smsHoursBefore;
            this.courtEvents.emailScheduleHoursBefore = this.emailHoursBefore;
            this.courtEventsCommitBean.updateList.push(this.courtEvents);

            const obj = this.ocureminService.updateCourtEvents(this.courtEventsCommitBean);
            obj.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.dialog.close(1);
                    return;
                }
                else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                }
            });
        }
        else if (this.dialog.data.screenId === 'OCDCSCH') {
            this.offschCommitModel.updateList = [];
            this.offschUpdatetList = this.dialog.data;

            if (this.smsFlag && !this.smsHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.smshoursmustbeenter');
                this.show();
                return;
            }
            if (this.emailFlag && !this.emailHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailhoursmustbeenter');
                this.show();
                return;
            }
            if (this.emailFlag && (!this.dialog.data.emailAddressCount || this.dialog.data.emailAddressCount === 0)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailmustbeentered');
                this.show();
                return;
            }

            if (this.smsFlag && (!this.dialog.data.phoneNumberCount || this.dialog.data.phoneNumberCount === 0)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.phonenumbermustbeenter');
                this.show();
                return;
            }
           
            this.offschUpdatetList.smsFlag = this.smsFlag ? 'Y' : 'N';
            this.offschUpdatetList.emailFlag = this.emailFlag ? 'Y' : 'N';
            this.offschUpdatetList.smsScheduleHoursBefore = this.smsHoursBefore;
            this.offschUpdatetList.emailScheduleHoursBefore = this.emailHoursBefore;
            this.offschUpdatetList.eventId = this.dialog.data.eventId;
            this.offschUpdatetList.unexcusedAbsenceFlag = this.dialog.data.unexcusedAbsenceFlag ? 'Y' : 'N';
            this.offschUpdatetList.emailSentFlag = this.dialog.data.emailSentFlag ? 'Y' : 'N';
            this.offschUpdatetList.smsSentFlag = this.dialog.data.smsSentFlag ? 'Y' : 'N';

            this.offschCommitModel.updateList.push(this.offschUpdatetList);
            const offschSaveData = this.ocdclogsFactory.offSchCommit(this.offschCommitModel);
            offschSaveData.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.dialog.close(1);

                    return;
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();

                    return;
                }

            });


        }
        else if (this.dialog.data.screenId === 'OSANVIOS') {
            if (this.smsFlag && !this.emailAndPhoneNumberCheck.phoneNumberCheckFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.phonenumbermustbeenter');
                this.show();
                return;
            }

            if (this.emailFlag && !this.emailAndPhoneNumberCheck.emailCheckFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailmustbeentered');
                this.show();
                return;
            }

            if (this.smsFlag && !this.smsHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.smshoursmustbeenter');
                this.show();
                return;
            }
            if (this.emailFlag && !this.emailHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailhoursmustbeenter');
                this.show();
                return;
            }
            this.courtEvents.modifyDatetime = DateFormat.getDate();
            this.courtEvents.modifyUserId = this.sessionManager.getId();
            this.courtEvents.smsFlag = this.smsFlag ? 'Y' : 'N';
            this.courtEvents.emailFlag = this.emailFlag ? 'Y' : 'N';
            this.courtEvents.smsScheduleHoursBefore = this.smsHoursBefore;
            this.courtEvents.emailScheduleHoursBefore = this.emailHoursBefore;
            this.courtEventsCommitBean.updateList.push(this.courtEvents);

            const obj = this.ocureminService.updateCourtEventsForSanctionAndViolation(this.courtEventsCommitBean);
            obj.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.dialog.close(1);
                    return;
                }
                else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                }
            });
        }

        else if (this.dialog.data.screenId === 'OCDPROGR' && this.dialog.data.subType === 'Appointment') {
            this.offcrsappCommitModel.updateList = [];
            this.offcrsappUpdateList = this.dialog.data;

            if (this.smsFlag && !this.smsHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.smshoursmustbeenter');
                this.show();
                return;
            }
            if (this.emailFlag && !this.emailHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailhoursmustbeenter');
                this.show();
                return;
            }
            if (this.emailFlag && (!this.comAccredited.emailAddressCount || this.comAccredited.emailAddressCount === 0)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailmustbeentered');
                this.show();
                return;
            }

            if (this.smsFlag && (!this.comAccredited.phoneNumberCount || this.comAccredited.phoneNumberCount === 0)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.phonenumbermustbeenter');
                this.show();
                return;
            }

        
            this.offcrsappUpdateList.smsFlag = this.smsFlag ? 'Y' : 'N';
            this.offcrsappUpdateList.emailFlag = this.emailFlag ? 'Y' : 'N';
            this.offcrsappUpdateList.smsScheduleHoursBefore = this.smsHoursBefore;
            this.offcrsappUpdateList.emailScheduleHoursBefore = this.emailHoursBefore;
            this.offcrsappUpdateList.modifyDatetime = DateFormat.getDate();
            this.offcrsappUpdateList.modifyUserId = this.sessionManager.getId();
            this.offcrsappCommitModel.updateList.push(this.offcrsappUpdateList);

            const offcrsappSaveData = this.ocdprogrFactory.offCrsAppCommit(this.offcrsappCommitModel);
            offcrsappSaveData.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.dialog.close(1);


                    return;
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();

                    return;
                }

            });

        }
        else if (this.dialog.data.screenId === 'OCDPROGR' && this.dialog.data.eventSubType === 'Assignment') {
            this.offenderProgramProfilesCommitBean.updateList = [];
            if (this.smsFlag && !this.emailAndPhoneNumberCheck.phoneNumberCheckFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.phonenumbermustbeenter');
                this.show();
                return;
            }

            if (this.emailFlag && !this.emailAndPhoneNumberCheck.emailCheckFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailmustbeentered');
                this.show();
                return;
            }

            if (this.smsFlag && !this.smsHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.smshoursmustbeenter');
                this.show();
                return;
            }
            if (this.emailFlag && !this.emailHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailhoursmustbeenter');
                this.show();
                return;
            }
            this.offenderProgramProfiles.modifyDatetime = DateFormat.getDate();
            this.offenderProgramProfiles.modifyUserId = this.sessionManager.getId();
            this.offenderProgramProfiles.smsFlag = this.smsFlag ? 'Y' : 'N';
            this.offenderProgramProfiles.emailFlag = this.emailFlag ? 'Y' : 'N';
            this.offenderProgramProfiles.smsScheduleHoursBefore = this.smsHoursBefore;
            this.offenderProgramProfiles.emailScheduleHoursBefore = this.emailHoursBefore;
            this.offenderProgramProfilesCommitBean.updateList.push(this.offenderProgramProfiles);

            const obj = this.ocureminService.updateOffenderProgramAssignment(this.offenderProgramProfilesCommitBean);
            obj.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.dialog.close(1);
                    return;
                }
                else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                }
            });
        }
        else if(this.dialog.data.screenId === 'OCDUPROJ'){
        
        this.projallocCommitModel.updateList = [];

        if (this.emailFlag && (!this.dialog.data.emailAddressCount || this.dialog.data.emailAddressCount === 0)) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuremin.emailmustbeentered');
            this.show();
            return;
        }

        if (this.smsFlag && (!this.projallocModel.phoneNumberCount || this.projallocModel.phoneNumberCount === 0)) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuremin.phonenumbermustbeenter');
            this.show();
            return;
        }
            if (this.smsFlag && !this.smsHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.smshoursmustbeenter');
                this.show();
                return;
            }
            if (this.emailFlag && !this.emailHoursBefore) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuremin.emailhoursmustbeenter');
                this.show();
                return;
            }
            this.projallocModel.modifyDatetime = DateFormat.getDate();
            this.projallocModel.modifyUserId = this.sessionManager.getId();
            this.projallocModel.smsFlag = this.smsFlag ? 'Y' : 'N';
            this.projallocModel.emailFlag = this.emailFlag ? 'Y' : 'N';
            this.projallocModel.smsScheduleHoursBefore = this.smsHoursBefore;
            this.projallocModel.emailScheduleHoursBefore = this.emailHoursBefore;
            this.projallocModel.offenderProgramStatus=this.projallocModel.offenderProgramStatus;
            this.projallocCommitModel.updateList.push(this.projallocModel);
            const projallocSaveData = this.ocduprojFactory.projAllocCommit(this.projallocCommitModel);
		projallocSaveData.subscribe(data => {
			if (data === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
				return;
			} else if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.dialog.close(1);

				return;
			} 
		});    

    }


    }
    close() {
        this.dialog.close(null);
    }

    get saveButton() {
        if(this.dialog.data.screenId=== 'OCDCSCH'){
            return (this.smsFlagTemp === this.smsFlag && this.emailFlagTemp === this.emailFlag && this.emailHoursBeforeTemp === this.emailHoursBefore && this.smsHoursBeforeTemp === this.smsHoursBefore);

        }
        return (this.smsFlagTemp === this.smsFlag && this.emailFlagTemp === this.emailFlag && this.emailHoursBeforeTemp === this.emailHoursBefore && this.smsHoursBeforeTemp === this.smsHoursBefore) ? true : false;
    }

    phoneNumberAndEmailCheck() {
        this.ocureminService.phoneNumberAndEmailCheck(this.offenderBookId).subscribe(data => {
            this.emailAndPhoneNumberCheck = data;
        });
    }

    disableOrEnable(eventDateTime, hoursBefore) {
        if (eventDateTime && hoursBefore) {
            const scheduleReminderDate1 = DateFormat.getDate(DateFormat.getDate(eventDateTime).setHours(DateFormat.getDate(eventDateTime).getHours() - hoursBefore, DateFormat.getDate(eventDateTime).getMinutes(), 0, 0));
            const scheduleReminderDate2 = DateFormat.getDate(DateFormat.getDate().setHours(DateFormat.getDate().getHours(), DateFormat.getDate().getMinutes(), 0, 0));
            if (DateFormat.compareDateTime(scheduleReminderDate1, scheduleReminderDate2) === -1) {
                return true;
            }
        }
        return false;
    }
    smsHoursChange() {
        if (this.disableOrEnable(this.eventDateTime, this.smsHoursBefore) && (this.smsHoursBefore !== this.smsHoursBeforeTemp)) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuremin.pleaseenterlesshours');
            this.show();
            this.smsHoursBefore = this.smsHoursBeforeTemp;
            return;
        }
    }
    emailHoursChange() {
        if (this.disableOrEnable(this.eventDateTime, this.emailHoursBefore) && (this.emailHoursBefore !== this.emailHoursBeforeTemp)) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuremin.pleaseenterlesshours');
            this.show();
            this.emailHoursBefore = this.emailHoursBeforeTemp;
            return;
        }
    }
}
