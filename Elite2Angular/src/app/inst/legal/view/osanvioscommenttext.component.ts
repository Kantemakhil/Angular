import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OsanviosService } from '../service/osanvios.service';
import { CourtEventsCommitBean } from '../../schedules/beans/CourtEventsCommitBean';
import { CourtEvents } from '../../schedules/beans/CourtEvents';
import { CourtEvnetAppointmentOutcome } from '../beans/CourtEvnetAppointmentOutcome';
import { CourtEvnetAppointmentOutcomeCommitBean } from '../beans/CourtEvnetAppointmentOutcomeCommitBean';
import { OweacplnService } from '@cm/weeklyactivityplans/service/oweacpln.service';
import { WeeklyActivityPlansHtyCommitBean } from '@cm/weeklyactivityplans/beans/WeeklyActivityPlansHtyCommitBean';
import { WeeklyActivityPlansHty } from '@cm/weeklyactivityplans/beans/WeeklyActivityPlansHty';
import { OffObsPeriodChecks } from '../../care-in-placement/beans/OffObsPeriodChecks';
import { OffObsPeriodCheckscommitBean } from '../../care-in-placement/beans/OffObsPeriodCheckscommitBean';
import { OidoffobService } from '../../offenderobservations/service/oidoffob.service';
//  import required bean declarations

@Component({
    selector: 'app-osanvicomment',
    templateUrl: './osanvioscommenttext.component.html'
})

export class OsanviosCommentText implements OnInit {
    //  Variable declaration
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    actionName: string;
    msglist = [];
    msgs: any[] = [];
    message = ' Invalid.';
    type = 'error';
    screenTitle: any;
    existingCommentTextDetails: any;
    placeHolderName: any;
    existingCommentText: any;
    ammendCommentText: any;
    newComment: any;
    crtEveCommitModel: CourtEventsCommitBean = new CourtEventsCommitBean();
    crtEveUpdateList: CourtEvents[] = [];

    crtEventAppointOutUpdateList: CourtEvnetAppointmentOutcome[] = [];
    crtEventAppointOutInsertList: CourtEvnetAppointmentOutcome[] = [];
    courtEventModel: CourtEvents = new CourtEvents();
    courtEvnetAppointmentOutcome: CourtEvnetAppointmentOutcome = new CourtEvnetAppointmentOutcome();
    crtEventAppointOutCommitModel: CourtEvnetAppointmentOutcomeCommitBean = new CourtEvnetAppointmentOutcomeCommitBean();
    weeklyActivityPlansHtyCommentCommitBean: WeeklyActivityPlansHtyCommitBean = new WeeklyActivityPlansHtyCommitBean();
    weeklyActivityPlanHtyInsertModel :WeeklyActivityPlansHty = new WeeklyActivityPlansHty();
    weeklyActivityPlanHtyInsertList: WeeklyActivityPlansHty[] = [];

    observationPeriodCheckUpdatetList: OffObsPeriodChecks[] = [];
    observationPeriodCheckModel:OffObsPeriodChecks=new OffObsPeriodChecks();
    checkId: any;
    offObsPeriodCheckscommitBean: OffObsPeriodCheckscommitBean = new OffObsPeriodCheckscommitBean();
    finalDate: Date;
    maxAdditionalCountsCommentLength:number;
    AddCountsCommentDisabled:boolean;
    AddCountsCommentRequired:boolean;
    saveDisabled : boolean;
    populatedstaffName: any;
    
    constructor(public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        public dialogService: DialogService, private osanviosFactory: OsanviosService, 
        private oweacplnFactory: OweacplnService, private oidoffobFactory: OidoffobService) {
    }
    ngOnInit() {
        this.populateLoggedStaffName();
        this.screenTitle = this.dialog.data.screenTitle;
        this.placeHolderName = this.dialog.data.placeHolderName;
        this.existingCommentTextDetails = this.dialog.data.existingCommentTextDetails
        this.ammendCommentText = this.dialog.data.ammendCommentText;
        this.maxAdditionalCountsCommentLength = 240;
        this.AddCountsCommentDisabled=false;
        this.AddCountsCommentRequired=true;
        this.saveDisabled=false;
        if (this.dialog.data.gridName == 'COURT_EVENT_GRID') {
            this.courtEventModel = this.dialog.data.modelData;
            this.existingCommentText = this.courtEventModel.additionalCountsComment;
            if ( this.existingCommentText === null) {
                this.maxAdditionalCountsCommentLength = 3750;
            } else {
                this.maxAdditionalCountsCommentLength = (4000 -this.existingCommentText.length - 250) < 0 ? 0 : (4000 - this.existingCommentText.length - 250);
            }
            if(this.maxAdditionalCountsCommentLength <= 0){
               this.AddCountsCommentDisabled=true;
               this.AddCountsCommentRequired=false;
               this.saveDisabled=true;
               this.message = this.translateService.translate('osanvios.textExceedsAllowedLimitOfCharacters');
               this.type = 'warn';
               this.show();
            }
        } else if (this.dialog.data.gridName == 'WAP') {
            this.existingCommentText = this.dialog.data.comment
            if ( this.existingCommentText === null) {
                this.maxAdditionalCountsCommentLength = 3750;
            } else {
                this.maxAdditionalCountsCommentLength = (4000 -this.existingCommentText.length - 250) < 0 ? 0 : (4000 - this.existingCommentText.length - 250);
            }
            if(this.maxAdditionalCountsCommentLength <= 0){
                this.AddCountsCommentDisabled=true;
               this.AddCountsCommentRequired=false;
               this.saveDisabled=true;
                this.message = this.translateService.translate('oweacpln.textExceedsAllowedLimitOfCharacters');
                this.type = 'warn';
                this.show();
             }
        }  else if (this.dialog.data.gridName == 'DOOB') {
            this.checkId=this.dialog.data.checkId;
            this.existingCommentText = this.dialog.data.comment
            if ( this.existingCommentText === null) {
                this.maxAdditionalCountsCommentLength = 3750;
            } else {
                this.maxAdditionalCountsCommentLength = (4000 -this.existingCommentText.length - 250) < 0 ? 0 : (4000 - this.existingCommentText.length - 250);
            }
            if(this.maxAdditionalCountsCommentLength <= 0){
                this.AddCountsCommentDisabled=true;
               this.AddCountsCommentRequired=false;
               this.saveDisabled=true;
                this.message = this.translateService.translate('oidoffob.textExceedsAllowedLimitOfCharacters');
                this.type = 'warn';
                this.show();
             }
        }
        else {
            this.courtEvnetAppointmentOutcome = this.dialog.data.modelData;
            this.existingCommentText = this.courtEvnetAppointmentOutcome.commentText;
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
    butSaveWhenButtonPressedTrigger() {
        
        if (this.dialog.data.gridName == 'COURT_EVENT_GRID') {
            if (!this.newComment || String(this.newComment).trim() === '') {
                this.message = 'Amend Additional Counts Comment must be entered';
                this.type = 'warn';
                this.show();
                return;
            }
            let ammendCommentText = '';
            ammendCommentText = ' [' + this.sessionManager.getId() +' '+ DateFormat.updateServerDate() + ' ]' + this.newComment;
            this.crtEveUpdateList = [];
            if (!this.courtEventModel.additionalCountsComment) {
                this.courtEventModel.additionalCountsComment = ammendCommentText;
            } else {
                this.courtEventModel.additionalCountsComment = this.courtEventModel.additionalCountsComment + ' ' + ammendCommentText;
            }
            this.crtEveUpdateList.push(this.courtEventModel);
            this.crtEveCommitModel.updateList = this.crtEveUpdateList;

            const crtEveSaveData = this.osanviosFactory.crtEveCommit(this.crtEveCommitModel);
            crtEveSaveData.subscribe(data => {
                if (data === 1) {
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.type = 'success';
                    this.show();
                    this.dialog.close(true);
                }
                else {
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.type = 'warn';
                    this.show();
                }
            });
        }else if (this.dialog.data.gridName == 'WAP') {
            this.weeklyActivityPlanHtyInsertList = [];
            this.weeklyActivityPlanHtyInsertModel.wapStartDate = this.dialog.data.fromdate;
            this.weeklyActivityPlanHtyInsertModel.wapEndDate = this.dialog.data.todate;

            if (!this.newComment || String(this.newComment).trim() === '') {
                this.message = 'WAP Comment must be entered';
                this.type = 'warn';
                this.show();
                return;
            }
            let ammendCommentText = '';
            ammendCommentText =  ' [' + this.populatedstaffName + '  ' + DateFormat.updateServerDate() + ' ]' + this.newComment;
            if(this.dialog.data.comment){
                this.weeklyActivityPlanHtyInsertModel.comment = this.dialog.data.comment + ammendCommentText;
            }else{
                this.weeklyActivityPlanHtyInsertModel.comment = ammendCommentText;
            }

            this.weeklyActivityPlanHtyInsertModel.offenderBookId = this.dialog.data.offenderBookId;
            this.weeklyActivityPlanHtyInsertList.push(this.weeklyActivityPlanHtyInsertModel);

            this.weeklyActivityPlansHtyCommentCommitBean.updateList= this.weeklyActivityPlanHtyInsertList;
            const data = this.oweacplnFactory.weeklyActivityCommentCommit(this.weeklyActivityPlansHtyCommentCommitBean);
            data.subscribe(data => {
                if (data === 1) {
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.type = 'success';
                    this.show();
                    this.dialog.close(true);
                }
                else {
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.type = 'warn';
                    this.show();
                }
            });
        }  else if(this.dialog.data.gridName == 'DOOB'){
            this.observationPeriodCheckUpdatetList =[];
            this.offObsPeriodCheckscommitBean.updateList=[];
            if (!this.newComment || String(this.newComment).trim() === '') {
                this.message = 'Amend Additional Offender Observation Check Comment must be entered';
                this.type = 'warn';
                this.show();
                return;
            }
            let ammendCommentText = '';         
            if(this.dialog.data.comment){
                var date = DateFormat.getDate();
                var dateStr =
                ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
                ("00" + date.getDate()).slice(-2) + "/" +
                date.getFullYear() + " " +
                ("00" + date.getHours()).slice(-2) + ":" +
                ("00" + date.getMinutes()).slice(-2);
                console.log(dateStr);
                ammendCommentText =  this.dialog.data.comment+',' + ' '+this.newComment+' .... Appended by '+' '+ this.sessionManager.getId() + '  '+dateStr;              
                this.observationPeriodCheckModel.commentText = ammendCommentText;
            }else{
                this.observationPeriodCheckModel.commentText = ammendCommentText;
            }
            this.observationPeriodCheckModel.checkId=this.checkId;
            this.observationPeriodCheckUpdatetList.push(this.observationPeriodCheckModel);
            this.offObsPeriodCheckscommitBean.updateList = this.observationPeriodCheckUpdatetList;

            const crtEveSaveData = this.oidoffobFactory.saveOffenderObservationCheckComment(this.offObsPeriodCheckscommitBean);
            crtEveSaveData.subscribe(data => {
                if (data === 1) {
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.type = 'success';
                    this.show();
                    this.dialog.close(true);
                }
                else {
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.type = 'warn';
                    this.show();
                }
            });



        } else {
            this.crtEventAppointOutInsertList = [];
            this.crtEventAppointOutUpdateList = [];
            if (!this.newComment || String(this.newComment).trim() === '') {
                this.message = 'Appointment Comment must be entered';
                this.type = 'warn';
                this.show();
                return;
            }
            let ammendCommentText = '';
            ammendCommentText = ' [' + this.sessionManager.getId() + DateFormat.updateServerDate() + ' ]' + this.newComment;
            if (!this.courtEvnetAppointmentOutcome.commentText) {
                this.courtEvnetAppointmentOutcome.commentText = ammendCommentText;
            } else {
                this.courtEvnetAppointmentOutcome.commentText = this.courtEvnetAppointmentOutcome.commentText + ' ' + ammendCommentText;
            }
            this.courtEvnetAppointmentOutcome.linkFlag = this.courtEvnetAppointmentOutcome.linkFlag ? 'Y' : 'N';
            this.courtEvnetAppointmentOutcome.adjournedFlag = this.courtEvnetAppointmentOutcome.adjournedFlag ? 'Y' : 'N';
            this.courtEvnetAppointmentOutcome.courtEventId = this.dialog.data.courtEventId;
            this.courtEvnetAppointmentOutcome.sessionEventId = this.courtEvnetAppointmentOutcome.eventId;
            this.crtEventAppointOutUpdateList.push(this.courtEvnetAppointmentOutcome);
            
            if(this.courtEvnetAppointmentOutcome.courtEvntSanctDtlId) {
                this.crtEventAppointOutUpdateList.push(this.courtEvnetAppointmentOutcome);
            } else {
                this.crtEventAppointOutInsertList.push(this.courtEvnetAppointmentOutcome);
            }
            this.crtEventAppointOutCommitModel.insertList = this.crtEventAppointOutInsertList;
            this.crtEventAppointOutCommitModel.updateList = this.crtEventAppointOutUpdateList;

            const crtEveSaveData = this.osanviosFactory.crtEventAppointmentCommit(this.crtEventAppointOutCommitModel);
            crtEveSaveData.subscribe(data => {
                if (data === 1) {
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.type = 'success';
                    this.show();
                    this.dialog.close(true);
                }
                else {
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.type = 'warn';
                    this.show();
                }
            });
        }
    }

    butExitWhenButtonPressedTrigger() {
        this.dialog.close(false);
    }

    populateLoggedStaffName() {
        const staffName = this.osanviosFactory.populateLoggedStaffName();
        staffName.subscribe(staffName => {
            if(staffName && staffName.indexOf(',') > -1 ){
                this.populatedstaffName = staffName.split(',').join(', ');
            }
            else{
                this.populatedstaffName = staffName;
            }
        });
    }


}
