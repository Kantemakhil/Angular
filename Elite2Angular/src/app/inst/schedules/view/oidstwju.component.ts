import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidstwjuService } from '@inst/schedules/service/oidstwju.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderIndSchWaitLists } from '@instschedulebeans/OffenderIndSchWaitLists';
import { VOffenderAllSchedules } from '@instschedulebeans/VOffenderAllSchedules';
import { OffenderIndSchWaitListsCommitBean } from '@instschedulebeans/OffenderIndSchWaitListsCommitBean';
import { VOffenderAllSchedulesCommitBean } from '@instschedulebeans/VOffenderAllSchedulesCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Offenders } from '@commonbeans/Offenders';
import { ReferenceCodes } from '@common/beans/ReferenceCodes';
import { OffenderIndSchedules } from '@instschedulebeans/OffenderIndSchedules';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { StaffMembers } from '@instincidentsbeans/StaffMembers';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { SchedulerService } from '@core/ui-components/schedule/scheduler.service';
@Component({
    selector: 'app-oidstwju',
    templateUrl: './oidstwju.component.html'
})

export class OidstwjuComponent implements OnInit, OnDestroy {
    // Variable declaration
    @ViewChild('grid', {static: true}) grid: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offschData: VOffenderAllSchedules[] = [];
    offschDataTemp: VOffenderAllSchedules[] = [];
    offschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    offschModelTemp: VOffenderAllSchedules = new VOffenderAllSchedules();
    added: any[] = [];
    updated: any[] = [];
    removed: any[] = [];
    offschIndex = 0;
    offschInsertList: VOffenderAllSchedules[] = [];
    offschUpdateList: VOffenderAllSchedules[] = [];
    offschDeleteList: VOffenderAllSchedules[] = [];
    offswlData: OffenderIndSchWaitLists[] = [];
    offswlDataTemp: OffenderIndSchWaitLists[] = [];
    offswlModel: OffenderIndSchWaitLists = new OffenderIndSchWaitLists();
    vOffswlModel: OffenderIndSchWaitLists = new OffenderIndSchWaitLists();
    offswlIndex = 0;
    offswlInsertList: OffenderIndSchWaitLists[] = [];
    offswlUpdateList: OffenderIndSchWaitLists[] = [];
    offswlDeleteList: OffenderIndSchWaitLists[] = [];
    offIndScheduleModel: OffenderIndSchedules = new OffenderIndSchedules();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    crtEveColumnDef: any[];
    offSchColumnDef: any[];
    ctrlReadOnly = false;
    crtEveReadOnly = false;
    offSchReadOnly = false;
    offSwlReadOnly = false;
    titleBlockReadOnly = false;
    rgEscortRg: any[] = [];
    rgAgencyLocationRg: any[] = [];
    rgMoveReasonRg: any[] = [];
    rgStatusRg: any[] = [];
    rgPriorityRg: any[] = [];
    rgCancelReasonRg: any[] = [];
    rgApprovedByRg: any[] = [];
    translateLabel: any;
    offschColumnDefs: any[];
    image = null;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    index = 0;
    errorCode: any;
    dbmsErrorCode: any;
    dbmsErrorText: any;
    messageCode: any;
    pServerErr: any;
    offswlCommitModel: OffenderIndSchWaitListsCommitBean = new OffenderIndSchWaitListsCommitBean();
    offschCommitModel: VOffenderAllSchedulesCommitBean = new VOffenderAllSchedulesCommitBean();
    offenderObj: Offenders = new Offenders();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    addFlag = false;
    systemDate: Date;
    caseLoadId: any;
    approvedByPopupData: any;
    objRefModel: ReferenceCodes = new ReferenceCodes();
    parentCode: any;
    cancelReasonFlag: boolean;
    activeFlagStatus: any;
    agyLodIdIndex = 0;
    eventId: any;
    clearFlag: any;
    verifyCheckFlag: any;
    verifyStatusFlag: any;
    verifyPriorityFlag: any;
    verifyApprovedByFlag: any;
    verifyReasonFlag: any;
    deleteFlag: any;
    verifySaveFlag: any;
    offswlRecordVerify: boolean;
    offswlCreateOrUpdate: string;
    offswlCreateIndex = 0;
    isshowing = false;
    offswlUpdateFlag: boolean;
    channelArray: string[];
    eventIdCount = 0;
    tableIndex: any;
    agyLocId: any;
    compareDuplicate = false;
    inCountDup = 0;
    conflictFlag = false;
    checkConfict = false;
    staffMemModel: StaffMembers = new StaffMembers();
    compareUpdateVerify = false;
    approvedByLink: any;
    approvedStaffId: any;
    lastName: any;
    approvedByTitles = { lastName: 'Last Name', firstName: 'First Name', middleName: 'Middle Name' };
    backButton: boolean;
    constructor(private oidstwjuFactory: OidstwjuService, private router: Router,
        public translateService: TranslateService, private renderer: Renderer2,
        private offenderSearchService: OffenderSearchService, private sessionManager: UserSessionManager,
        public dialogService: DialogService, private schedularService: SchedulerService) {
        this.offschColumnDefs = [];
    }
    ngOnInit() {
        if (this.schedularService.backBtnFlag) {
			this.backButton = true;
		 } else {
			this.backButton = false;
		 }
        this.disabled = true;
        this.display = true;
        this.offSwlReadOnly = true;
        this.cancelReasonFlag = true;
        this.clearFlag = true;
        this.deleteFlag = true;
        this.verifySaveFlag = false;
        this.offswlUpdateFlag = false;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        let agyloc = null;
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.agyLocId) {
            agyloc = this.vHeaderBlockModel.agyLocId;
        }
        this.offschColumnDefs = this.getColumnDef(agyloc);
        if (this.vHeaderBlockModel) {
            this.oidstwjuexecuteQuery();
        }
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.approvedByLink = 'oidstwju/rgApprovedByRecordGroup?caseloadId=' +  this.caseLoadId;

        const serviceObj = this.oidstwjuFactory.getStaffId();
        serviceObj.subscribe(staffId => {
        if ( staffId !== null && staffId > 0) {
        this.approvedStaffId = staffId;
          }
        });
        // TODO all initializations here
        const rgescortServiceObj = this.oidstwjuFactory.rgEscortRecordGroup();
        rgescortServiceObj.subscribe(rgEscortList => {
            if (rgEscortList.length === 0) {
                this.rgEscortRg = [];
            } else {
                for (let i = 0; i < rgEscortList.length; i++) {
                    this.rgEscortRg.push({
                        'text': rgEscortList[i].code + ' - ' +
                        rgEscortList[i].description, 'id': rgEscortList[i].code
                    });
                }
            }
        });
        const rgmovereasonServiceObj = this.oidstwjuFactory.rgMoveReasonRecordGroup();
        rgmovereasonServiceObj.subscribe(rgMoveReasonList => {
            if (rgMoveReasonList.length === 0) {
                this.rgMoveReasonRg = [];
            } else {
                for (let i = 0; i < rgMoveReasonList.length; i++) {
                    this.rgMoveReasonRg.push({
                        'text': rgMoveReasonList[i].code + ' - ' +
                        rgMoveReasonList[i].description, 'id': rgMoveReasonList[i].code
                    });
                }
            }
        });
        const rgstatusServiceObj = this.oidstwjuFactory.rgStatusRecordGroup();
        rgstatusServiceObj.subscribe(rgStatusList => {
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
        const rgpriorityServiceObj = this.oidstwjuFactory.rgPriorityRecordGroup();
        rgpriorityServiceObj.subscribe(rgPriorityList => {
            if (rgPriorityList.length === 0) {
                this.rgPriorityRg = [];
            } else {
                for (let i = 0; i < rgPriorityList.length; i++) {
                    this.rgPriorityRg.push({
                        'text': rgPriorityList[i].code + ' - ' +
                        rgPriorityList[i].description, 'id': rgPriorityList[i].code
                    });
                }
            }
        });
        const rgcancelreasonServiceObj = this.oidstwjuFactory.rgCancelReasonRecordGroup();
        rgcancelreasonServiceObj.subscribe(rgCancelReasonList => {
            if (rgCancelReasonList.length === 0) {
                this.rgCancelReasonRg = [];
            } else {
                for (let i = 0; i < rgCancelReasonList.length; i++) {
                    this.rgCancelReasonRg.push({
                        'text': rgCancelReasonList[i].code + ' - ' +
                        rgCancelReasonList[i].description, 'id': rgCancelReasonList[i].code
                    });
                }
            }
        });
        const rgapprovedbyServiceObj = this.oidstwjuFactory.rgApprovedByRecordGroup(this.caseLoadId);
        rgapprovedbyServiceObj.subscribe(rgApprovedbyList => {
            if (rgApprovedbyList.length === 0) {
                this.rgApprovedByRg = [];
            } else {
                for (let i = 0; i < rgApprovedbyList.length; i++) {
                    this.rgApprovedByRg.push({
                        'firstName': rgApprovedbyList[i].firstName,
                        'lastName': rgApprovedbyList[i].lastName,
                        'id': rgApprovedbyList[i].staffId
                    });
                }
            }
        });
        this.offswlModel = new OffenderIndSchWaitLists();
        this.offswlModel.transferPriority = '';
       // this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));

        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
        }
    }
     /*
     *  This event is used to set the Status value in Waiting List Block.
     */
    onStatusChange() {
        this.offswlModel.waitListStatus = this.offswlModel.waitListStatus === undefined ? '' : undefined;
    }
    /*
     *   This event is used to set the Priority value in Waiting List Block.
     */
    onPriorityChange() {
       this.offswlModel.transferPriority = this.offswlModel.transferPriority === undefined ? '' : undefined;
    }
    /*
     *  This event is used to set the Cancel Reason value in Waiting List Block.
     */
    onCancelChange() {
       this.offswlModel.outcomeReasonCode = this.offswlModel.outcomeReasonCode === undefined ? '' : undefined;
    }
      /*
     *  This event is used to set the Cancel Reason value in Waiting List Block.
     */
    onApprovedChange() {
       this.offswlModel.nbtLastName = this.offswlModel.nbtLastName === undefined ? '' : undefined;
       this.lastName = this.lastName === undefined ? '' : undefined;
     }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    keyPressTimes() {
         if (!this.vHeaderBlockModel && !this.vHeaderBlockModel.offenderBookId ) {
             return;
             }
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.offschModel
            && !this.offschModel.eventDate && !this.offschModel.startTime &&
            !this.offschModel.toAgyLocId && !this.offschModel.eventSubType) {
            this.show(this.translateService.translate('oidstwju.offschreasonenter'), 'warn');
            return;
        }

        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId &&
             ( (!this.offschModel.eventDate && this.offschModel.startTime) || !this.offschModel.eventDate)) {
            this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
            return;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.startTime) {
            this.show(this.translateService.translate('oidstwju.timeentered'), 'warn');
            return;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.toAgyLocId) {
            this.show(this.translateService.translate('oidstwju.facilityentered'), 'warn');
            return;
        } else if ( this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.eventSubType) {
            this.show(this.translateService.translate('oidstwju.reasonentered'), 'warn');
            return;
        }

    }
    onLovMouseDown() {
        if (!this.vHeaderBlockModel && !this.vHeaderBlockModel.offenderBookId ) {
             return;
             }
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.offschModel
            && !this.offschModel.eventDate && !this.offschModel.startTime &&
            !this.offschModel.toAgyLocId && !this.offschModel.eventSubType) {
            this.show(this.translateService.translate('oidstwju.offschreasonenter'), 'warn');
            return;
        }

        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId &&
             ( (!this.offschModel.eventDate && this.offschModel.startTime) || !this.offschModel.eventDate)) {
            this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
            return;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.startTime) {
            this.show(this.translateService.translate('oidstwju.timeentered'), 'warn');
            return;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.toAgyLocId) {
            this.show(this.translateService.translate('oidstwju.facilityentered'), 'warn');
            return;
        } else if ( this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.eventSubType) {
            this.show(this.translateService.translate('oidstwju.reasonentered'), 'warn');
            return;
        }
    }
    canEventDateEdit = (data: any, index: number, field: string): boolean => {
        if (this.offswlModel && (this.offswlModel.requestDate || this.offswlModel.approvedFlag
             || this.offswlModel.waitListStatus || this.offswlModel.transferPriority
            || this.offswlModel.outcomeReasonCode || this.offswlModel.commentText1)) {
            if (!this.offswlModel.requestDate) {
                this.show(this.translateService.translate('oidstwju.requestdateentered'), 'warn');
                return false;
            } else if (!this.offswlModel.waitListStatus) {
                this.show(this.translateService.translate('oidstwju.statusmustbeentered'), 'warn');
                return false;
            } else if (this.offswlModel.waitListStatus === 'CAN' || this.offswlModel.waitListStatus === 'CANC') {
                if (!this.offswlModel.outcomeReasonCode) {
                this.show(this.translateService.translate('oidstwju.cancelreasonmustbeentered'), 'warn');
                return false;
                }
            } else if (!this.offswlModel.transferPriority) {
                this.show(this.translateService.translate('oidstwju.prioritymustbeentered'), 'warn');
                return false;
            }

        }

        if (data.eventDate && (!data.eventId)) {
            if (DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) < 0) {
                this.show(this.translateService.translate('oidstwju.scheduledatealert'), 'warn');
                if (field === 'eventDate') {
                    return true;
                }
                return false;
            }
            this.inCountDup = 0;
            this.compareDuplicate = false;
            if (data.eventDate) {
                for (let i = 0; i < this.offschData.length; i++) {
                    if (this.offschData[i].eventDate) {
                        if ((DateFormat.compareDate(DateFormat.getDate(this.offschData[i].eventDate),
                         DateFormat.getDate(data.eventDate)) === 0) && this.offschData[i].offenderBookId === data.offenderBookId
                            && this.offschData[i].eventStatus === 'SCH') {
                            this.inCountDup++;
                            if (this.inCountDup > 1) {
                                this.compareDuplicate = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (this.compareDuplicate && !this.conflictFlag && this.checkConfict) {
            }

            if (data.eventDate && data.startTime) {
              data.startTime = ( data.startTime instanceof Date) ? data.startTime :
              DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
                if (DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) === 0) {
                    if (DateFormat.compareTime(data.startTime, DateFormat.getDate()) < 0) {
                        this.show(this.translateService.translate('oidstwju.eventdateandtime'), 'warn');
                        if (field === 'eventDate' || field === 'startTime') {
                            return true;
                        }
                        return false;
                    }

                }
            }

        } else if (field === 'eventDate' && data.eventId) {
            if (data.eventDate) {
                if (DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) < 0) {
                    this.show(this.translateService.translate('oidstwju.scheduledatealert'), 'warn');
                    if (field === 'eventDate') {
                        return true;
                    }
                    return false;
                }
                this.inCountDup = 0;
                this.compareDuplicate = false;
                if (data.eventDate) {
                    for (let i = 0; i < this.offschData.length; i++) {
                        if (this.offschData[i].eventDate) {
                            if ((DateFormat.compareDate(DateFormat.getDate(this.offschData[i].eventDate),
                             DateFormat.getDate(data.eventDate)) === 0) && this.offschData[i].offenderBookId === data.offenderBookId
                                && this.offschData[i].eventStatus === 'SCH') {
                                this.inCountDup++;
                                if (this.inCountDup > 1) {
                                    this.compareDuplicate = true;
                                    break;
                                }
                            }
                        }
                    }
                }

            }

        } else if (field === 'startTime' && data.eventId) {
            if (data.eventDate && data.startTime) {
                data.startTime = ( data.startTime instanceof Date) ? data.startTime :
                DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
                if (DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) === 0) {
                    if (DateFormat.compareTime(data.startTime, DateFormat.getDate()) < 0) {
                        this.show(this.translateService.translate('oidstwju.eventdateandtime'), 'warn');
                        if (field === 'startTime') {
                            return true;
                        }
                        return false;
                    }
                }
            }

        }
        if (this.checkConfict && field !== 'eventDate') {
            this.offschModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.dialogService.openLinkDialog('/oiuscinq', this.offschModelTemp).subscribe(result => {
                if (result) {
                    this.checkConfict = false;
                    return false;
                } else {
                    this.checkConfict = true;
                    return true;
                }
            });
        } else {
        return true;
        }
    }

    onRowClickoffsch(event) {
        this.conflictFlag = false;
        if (event) {
            if (this.offswlUpdateFlag !== undefined && this.offswlUpdateFlag) {
                if (this.offschModel.eventId && this.offswlModel.requestDate
                    && this.offswlModel.waitListStatus && this.offswlModel.transferPriority && this.offswlModel.statusDate) {
                    const dupRecord = { invalid: false, repeat: 0 };
                    const data = {
                        label: this.translateService.translate('oidstwju.savethechanges'), yesBtn: true, noBtn: true, canBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidstwjuconfirmationpopup', data, 80).subscribe(result => {
                        if (!result) {
                            this.oidstwjuexecuteQuery();
                             return true;
                        } else {
                            this.display = true;
                            this.oidstwjuSaveoffschswlForm();
                            return false;
                        }

                    });
                } else  if (!this.offschModel.eventId && this.offswlModel.requestDate
                    && this.offswlModel.waitListStatus && this.offswlModel.transferPriority
                    && this.offswlModel.statusDate) {
                        const data = {
                            label: this.translateService.translate('oidstwju.savethechanges'), yesBtn: true, noBtn: true, canBtn: true
                        };
                        this.dialogService.openLinkDialog('/oidstwjuconfirmationpopup', data, 80).subscribe(result => {
                            if (!result) {
                                this.oidstwjuexecuteQuery();
                                return true;
                            } else {
                                this.display = true;
                                this.oidstwjuSaveoffschswlForm();
                                return false;
                            }
                        });
                } else {
                        if (this.offschModel.eventId && this.offswlModel && (this.offswlModel.requestDate ||
                             this.offswlModel.approvedFlag
                            || this.offswlModel.waitListStatus || this.offswlModel.transferPriority
                           || this.offswlModel.outcomeReasonCode || this.offswlModel.commentText1)) {
                           if (!this.offswlModel.requestDate) {
                               this.show(this.translateService.translate('oidstwju.requestdateentered'), 'warn');
                               return false;
                           } else if (!this.offswlModel.waitListStatus) {
                               this.show(this.translateService.translate('oidstwju.statusmustbeentered'), 'warn');
                               return false;
                           } else if (this.offswlModel.waitListStatus === 'CAN' || this.offswlModel.waitListStatus === 'CANC') {
                               if (!this.offswlModel.outcomeReasonCode) {
                               this.show(this.translateService.translate('oidstwju.cancelreasonmustbeentered'), 'warn');
                               return false;
                               }
                           } else if (!this.offswlModel.transferPriority) {
                               this.show(this.translateService.translate('oidstwju.prioritymustbeentered'), 'warn');
                               return false;
                           }

                    }
                }
            } else {
                this.offschModel = new VOffenderAllSchedules();
                this.verifyCheckFlag = true;
                this.verifyStatusFlag = true;
                this.verifyPriorityFlag = true;
                this.verifyReasonFlag = true;
                this.verifyApprovedByFlag = true;
                this.offschModel = event;
                //below two lines are commented for jira issue(14831)
                // if (this.offschModel.eventId) {
                    this.offschIndex = this.offschData.indexOf(event);
                    this.offswlExecuteQuery();
                // }
                 return true;
            }
        } else {
            this.verifyCheckFlag = true;
            this.verifyStatusFlag = true;
            this.verifyPriorityFlag = true;
            this.verifyReasonFlag = true;
            this.offswlRecordVerify = false;
            this.offswlUpdateFlag = false;
            this.verifyApprovedByFlag = true;
            return;
        }
    }

    onRowClickoffschForSwl(event) {
        this.verifyCheckFlag = true;
        this.verifyStatusFlag = true;
        this.verifyPriorityFlag = true;
        this.verifyApprovedByFlag = true;
        this.verifyReasonFlag = true;
        this.offswlUpdateFlag = false;
        if (event) {
            this.offschModel = event;
        }
        if (this.offschModel.eventId) {
            this.offswlData = [];
            this.offswlExecuteQuery();
        }

    }

    nbtApprovedByDescWhenValidateItemTrigger(event) {

        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.offschModel
            && !this.offschModel.eventDate && !this.offschModel.startTime &&
            !this.offschModel.toAgyLocId && !this.offschModel.eventSubType) {
            return;
        }
        if (event) {
            this.lastName = event.description;
            this.offswlModel.nbtLastName = event.description;
            this.offswlModel.nbtFirstName = event.code;
            this.offswlModel.approvedStaffId = Number(event.staffId);

        if (this.lastName !== null && this.lastName !== undefined) {
            if (this.verifySaveFlag) {
                this.display = true;
                  if ( this.verifyApprovedByFlag) {
                    this.verifyApprovedByFlag = false;
                        } else {
                        this.offswlUpdateFlag = true;
                        }
            } else {
                if (this.verifyApprovedByFlag) {
                    this.display = true;
                    this.verifyApprovedByFlag = false;
                } else {
                    this.display = false;
                    this.offswlUpdateFlag = true;
                }
            }
            if (this.offswlModel.eventId) {
                this.clearFlag = true;
            } else {
                this.clearFlag = false;
            }
        }
     } else {
            this.display = false;
            if (this.offswlModel && this.offswlModel.nbtLastName ) {
            this.offswlUpdateFlag = true;
            this.offswlModel.nbtLastName = null;
            this.offswlModel.nbtFirstName = null;
            this.offswlModel.approvedStaffId = undefined;
            this.lastName = undefined;
            }
        }
    }


    setDescription(event) {
        if (event) {
        this.lastName = event.description;
        this.offswlModel.nbtLastName = event.description;
        this.offswlModel.nbtFirstName = event.code;
        this.offswlModel.approvedStaffId = Number(event.staffId);
        if (this.verifySaveFlag) {
                            this.display = true;
                            this.verifyCheckFlag = false;
                            this.offswlUpdateFlag = true;
                        } else {
                            if (this.verifyCheckFlag) {
                                this.display = true;
                                this.verifyCheckFlag = false;
                            } else {
                                this.display = false;
                                this.offswlUpdateFlag = true;
                            }
                        }
            }
    }
    agyLocIdEdit = (data: any, index: number, field: string): boolean => {
        if (this.offswlModel && (this.offswlModel.requestDate || this.offswlModel.approvedFlag ||
            this.offswlModel.waitListStatus || this.offswlModel.transferPriority
            || this.offswlModel.outcomeReasonCode || this.offswlModel.commentText1)) {

            if (!this.offswlModel.requestDate) {
                this.show(this.translateService.translate('oidstwju.requestdateentered'), 'warn');
                return false;
            } else if (!this.offswlModel.waitListStatus) {
                this.show(this.translateService.translate('oidstwju.statusmustbeentered'), 'warn');
                return false;
            } else if (this.offswlModel.waitListStatus === 'CAN' || this.offswlModel.waitListStatus === 'CANC') {
                if (!this.offswlModel.outcomeReasonCode) {
                this.show(this.translateService.translate('oidstwju.cancelreasonmustbeentered'), 'warn');
                return false;
                }
            } else if (!this.offswlModel.transferPriority) {
                this.show(this.translateService.translate('oidstwju.prioritymustbeentered'), 'warn');
                return false;
            }

        }
        if (this.agyLodIdIndex <= index) {
            return true;
        }
        if (this.checkConfict) {
            this.offschModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.dialogService.openLinkDialog('/oiuscinq', this.offschModelTemp).subscribe(result => {
                if (result) {
                    this.checkConfict = false;
                    return false;
                } else {
                    this.checkConfict = true;
                    return true;
                }
            });
        } else {
        return false;  
        }
    }

    activeFlagEdit = (data: any, index: number, field: string): boolean => {
        if (this.offswlModel && (this.offswlModel.requestDate || this.offswlModel.approvedFlag
             || this.offswlModel.waitListStatus || this.offswlModel.transferPriority
            || this.offswlModel.outcomeReasonCode || this.offswlModel.commentText1)) {

            if (!this.offswlModel.requestDate) {
                this.show(this.translateService.translate('oidstwju.requestdateentered'), 'warn');
                return false;
            } else if (!this.offswlModel.waitListStatus) {
                this.show(this.translateService.translate('oidstwju.statusmustbeentered'), 'warn');
                return false;
            } else if (this.offswlModel.waitListStatus === 'CAN' || this.offswlModel.waitListStatus === 'CANC') {
                if (!this.offswlModel.outcomeReasonCode) {
                this.show(this.translateService.translate('oidstwju.cancelreasonmustbeentered'), 'warn');
                return false;
                }
            } else if (!this.offswlModel.transferPriority) {
                this.show(this.translateService.translate('oidstwju.prioritymustbeentered'), 'warn');
                return false;
            }
        }
        if (this.checkConfict) {
            this.offschModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.dialogService.openLinkDialog('/oiuscinq', this.offschModelTemp).subscribe(result => {
                if (result) {
                    this.checkConfict = false;
                    return false;
                } else {
                    this.checkConfict = true;
                    return true;
                }
            });
        } else if (field === 'eventSubType') {
            return true;
        } else {
        this.show(this.translateService.translate('common.fieldisprotectedagainstupdate'), 'warn');
        return true;
        }
    }

    cancel() {
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
            this.vHeaderBlockOffender = this.vHeaderBlockModel;
            if (this.vHeaderBlockModel.rootOffenderId) {
                this.display = true;
                this.offschIndex = 0;
                this.agyLodIdIndex = 0;
                this.offswlData = [];
                this.lastName = undefined;
                this.offswlModel = new OffenderIndSchWaitLists();
                this.offschModel = new VOffenderAllSchedules();
                this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                this.verifySaveFlag = false;
                this.offswlUpdateFlag = false;
                this.clearFlag = true;
                this.deleteFlag = true;
                this.offSwlReadOnly = true;
                this.offswlRecordVerify = false;
                this.offschData = [];
                this.addFlag = true;
                this.disabled = true;
                this.listToCompare = [];
                this.eventIdCount = 0;
                this.offschInsertList = [];
                this.offschUpdateList = [];
                this.offschDeleteList = [];
                this.agyLocId = this.vHeaderBlockModel.agyLocId;
                this.offschColumnDefs[2].link = 'oidstwju/rgAgencyLocationRecordGroup?agyLocId=' + this.agyLocId;
                this.grid.prepareAgColumnDef();
                this.oidstwjuexecuteQuery();
            }
        } else {
            this.offschData = [];
            this.addFlag = false;
            this.display = true;
            this.offschIndex = 0;
            this.agyLodIdIndex = 0;
            this.offswlData = [];
            this.offswlModel = new OffenderIndSchWaitLists();
            this.offschModel = new VOffenderAllSchedules();
            this.verifySaveFlag = false;
            this.offswlUpdateFlag = false;
            this.clearFlag = true;
            this.deleteFlag = true;
            this.offSwlReadOnly = true;
            this.offswlRecordVerify = false;
            this.listToCompare = [];
            this.eventIdCount = 0;
            this.disabled = true;
            this.offschInsertList = [];
            this.offschUpdateList = [];
            this.offschDeleteList = [];
            this.lastName = undefined;
            this.offswlModel.statusDate=undefined;
            this.offswlModel.transferPriority=undefined;
        }
    }

    setEventStatus() {
        if ((!this.offswlModel.waitListStatus) && this.offswlModel.approvedFlag) {
            this.offschModel.activeFlag = 'N';
            this.offschModel.eventStatus = 'PEN';
        } else if (this.offswlModel.waitListStatus === 'CON' && this.offswlModel.approvedFlag) {
            this.offschModel.activeFlag = 'Y';
            this.offschModel.eventStatus = 'SCH';
        } else if (this.offswlModel.waitListStatus === 'CAN' || this.offswlModel.waitListStatus === 'CANC'
            && this.offswlModel.approvedFlag) {
            this.offschModel.activeFlag = 'N';
            this.offschModel.eventStatus = 'CANC';
        } else if (this.offswlModel.waitListStatus === 'PEN' && this.offswlModel.approvedFlag) {
            this.offschModel.activeFlag = 'N';
            this.offschModel.eventStatus = 'PEN';
        } else if (this.offswlModel.waitListStatus === 'CAN' || this.offswlModel.waitListStatus === 'CANC' &&
            !this.offswlModel.approvedFlag) {
            this.offschModel.activeFlag = 'N';
            this.offschModel.eventStatus = 'CANC';
        } else if (this.offswlModel.waitListStatus === 'PEN' && !this.offswlModel.approvedFlag) {
            this.offschModel.activeFlag = 'N';
            this.offschModel.eventStatus = 'PEN';
        } else {
            this.offschModel.activeFlag = 'N';
            this.offschModel.eventStatus = 'PEN';
        }

        if (this.offschData.length > 0) {
            if (this.offschModel.activeFlag === 'Y') {
                this.activeFlagStatus = true;
                this.offschData[this.offschIndex].activeFlag = this.activeFlagStatus;
            } else {
                this.activeFlagStatus = false;
                this.offschData[this.offschIndex].activeFlag = this.activeFlagStatus;
            }
            this.offschData[this.offschIndex].eventStatus = this.offschModel.eventStatus;
        }

    }

    approvedFlagWhenCheckboxChangedTrigger(event) {
        if (!this.vHeaderBlockModel && !this.vHeaderBlockModel.offenderBookId ) {
             return;
             }
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.offschModel
            && !this.offschModel.eventDate && !this.offschModel.startTime &&
            !this.offschModel.toAgyLocId && !this.offschModel.eventSubType) {
            this.show(this.translateService.translate('oidstwju.offschreasonenter'), 'warn');
            return;
        }
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId &&
             ( (!this.offschModel.eventDate && this.offschModel.startTime) || !this.offschModel.eventDate)) {
            this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
            return;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.startTime) {
            this.show(this.translateService.translate('oidstwju.timeentered'), 'warn');
            return;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.toAgyLocId) {
            this.show(this.translateService.translate('oidstwju.facilityentered'), 'warn');
            return;
        } else if ( this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.eventSubType) {
            this.show(this.translateService.translate('oidstwju.reasonentered'), 'warn');
            return;
        }

        if (this.offswlModel.approvedFlag) {
            if (this.offswlModel.eventId) {
                this.clearFlag = true;
            } else {
                this.clearFlag = false;
            }
            this.offSwlReadOnly = false;
           if (!this.offswlModel.nbtLastName && !this.offswlModel.nbtFirstName) {
                this.staffMemModel = new StaffMembers();
                this.staffMemModel.staffId = this.approvedStaffId;
                const serviceObj = this.oidstwjuFactory.showApprovedDetails(this.staffMemModel);
                serviceObj.subscribe(data => {
                    if (!data.staffId) {
                        this.setEventStatus();
                        if (this.verifySaveFlag) {
                            this.display = true;
                            this.verifyCheckFlag = false;
                            this.offswlUpdateFlag = true;
                        } else {
                            if (this.verifyCheckFlag) {
                                this.display = true;
                                this.verifyCheckFlag = false;
                            } else {
                                this.display = false;
                                this.offswlUpdateFlag = true;
                            }
                        }
                    } else {
                        const staffId = data.staffId;
                        const roleMember = this.rgApprovedByRg.
                            find(staffMemberRoles => staffMemberRoles.id === staffId);
                        if (roleMember !== null && roleMember !== undefined) {
                            this.lastName = staffId;
                            this.offswlModel.nbtLastName = roleMember.lastName;
                            this.offswlModel.nbtFirstName = roleMember.firstName;
                            this.offswlModel.approvedStaffId = staffId;
                        }
                        this.setEventStatus();
                        if (this.verifySaveFlag) {
                            this.display = true;
                            this.verifyCheckFlag = false;
                            this.offswlUpdateFlag = true;
                        } else {
                            if (this.verifyCheckFlag) {
                                this.display = true;
                                this.verifyCheckFlag = false;
                            } else {
                                this.display = false;
                                this.offswlUpdateFlag = true;
                            }
                        }

                    }
                });
            }
        } else {
            if (this.verifySaveFlag) {
                this.display = true;
                this.verifyCheckFlag = false;
                this.offswlUpdateFlag = true;
            } else {
                if (this.verifyCheckFlag) {
                    this.display = true;
                    this.verifyCheckFlag = false;
                } else {
                    this.display = false;
                    this.offswlUpdateFlag = true;
                }
            }
            this.offSwlReadOnly = true;
            this.lastName = undefined;
            this.offswlModel.nbtLastName = null;
            this.offswlModel.nbtFirstName = null;
            this.offswlModel.approvedStaffId = null;
            this.setEventStatus();
        }

    }
    onGridClear = () => {
        this.checkConfict = false;
        return true;
    }

    offSchOnDeleteTrigger = () => {
        this.checkConfict = false;
        for (let i = 0; i < this.offschData.length; i++) {
            if (this.offschData[i].eventId ) {
            if (!this.offschData[i].eventDate) {
                this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
                return false;
            }
            if (!this.offschData[i].startTime) {
                this.show(this.translateService.translate('oidstwju.timeentered'), 'warn');
                return false;
            }
            if (!this.offschData[i].toAgyLocId) {
                this.show(this.translateService.translate('oidstwju.facilityentered'), 'warn');
                return false;
            }
            if (!this.offschData[i].eventSubType) {
                this.show(this.translateService.translate('oidstwju.reasonentered'), 'warn');
                return false;
            }
            }
            if (i === this.offschIndex) {
                if (!this.offswlModel.eventId) {
                    this.agyLodIdIndex = this.agyLodIdIndex - 1;
                    this.verifySaveFlag = true;
                    this.offschDeleteList.push(this.offschData[i]);
                    return true;
                } else {
                    if (this.offswlModel.eventId === this.offschData[i].eventId) {
                        this.show(this.translateService.translate('oidstwju.cannotdeleteoffender'), 'warn');
                        return false;
                    }
                }
            }
        }
        return true;
    }

    onGridReady = () => {
        this.offschInsertList = [];
        if (this.vHeaderBlockModel.statusDisplay == 'Inactive') {
            this.show(this.translateService.translate('oidstwju.thisactioncannotbeperformedforaninactiveoffender'), 'warn');
            return;
        }
        this.conflictFlag = false;
        if (this.checkConfict) {
            this.offschModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.dialogService.openLinkDialog('/oiuscinq', this.offschModelTemp).subscribe(result => {
                if (result) {
                    this.checkConfict = false;
                    return true;
                } else {
                    this.checkConfict = true;
                    return false;
                }
            });
        }
        for (let i = 0; i < this.offschData.length; i++) {
            if (!this.offschData[i].eventDate) {
                this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
                return false;
            }
            if (!this.offschData[i].startTime) {
                this.show(this.translateService.translate('oidstwju.timeentered'), 'warn');
                return false;
            }
            if (!this.offschData[i].toAgyLocId) {
                this.show(this.translateService.translate('oidstwju.facilityentered'), 'warn');
                return false;
            }
            if (!this.offschData[i].eventSubType) {
                this.show(this.translateService.translate('oidstwju.reasonentered'), 'warn');
                return false;
            }
        }
        if (this.offswlUpdateFlag) {
            if (!this.offswlModel.eventId) {
                if (this.offschModel.eventId && this.offswlModel.requestDate
                    && this.offswlModel.waitListStatus && this.offswlModel.transferPriority && this.offswlModel.statusDate) {
                    const data = {
                        label: this.translateService.translate('oidstwju.savethechanges'), yesBtn: true, noBtn: true, canBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidstwjuconfirmationpopup', data, 80).subscribe(result => {
                        if (!result) {
                            this.oidstwjuexecuteQuery();
                            this.offSwlReadOnly = true;
                            this.disabled = true;
                            this.offswlModel = new OffenderIndSchWaitLists();
                            this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                            this.deleteFlag = true;
                            return {
                                offenderBookId: this.vHeaderBlockModel.offenderBookId,
                                agyLocId: this.vHeaderBlockModel.agyLocId, offenderLastName: this.vHeaderBlockModel.lastName,
                                offenderFirstName: this.vHeaderBlockModel.firstName, offenderBookNo: this.vHeaderBlockModel.bookingNo,
                                offenderIdDisplay: this.vHeaderBlockModel.offenderIdDisplay
                            };
                        } else {
                            this.display = true;
                            this.oidstwjuSaveoffschswlForm();
                            return false;
                        }

                    });
                } else if (!this.offschModel.eventId && this.offswlModel.requestDate
                    && this.offswlModel.waitListStatus && this.offswlModel.transferPriority && this.offswlModel.statusDate) {
                    const data = {
                        label: this.translateService.translate('oidstwju.savethechanges'), yesBtn: true, noBtn: true, canBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidstwjuconfirmationpopup', data, 80).subscribe(result => {
                        if (!result) {
                            this.oidstwjuexecuteQuery();
                            this.offSwlReadOnly = true;
                            this.disabled = true;
                            this.offswlModel = new OffenderIndSchWaitLists();
                            this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                            this.deleteFlag = true;
                            return {
                                offenderBookId: this.vHeaderBlockModel.offenderBookId,
                                agyLocId: this.vHeaderBlockModel.agyLocId, offenderLastName: this.vHeaderBlockModel.lastName,
                                offenderFirstName: this.vHeaderBlockModel.firstName, offenderBookNo: this.vHeaderBlockModel.bookingNo,
                                offenderIdDisplay: this.vHeaderBlockModel.offenderIdDisplay
                            };
                        } else {
                            this.display = true;
                            this.oidstwjuSaveoffschswlForm();
                            return false;
                        }

                    });
                } else {
                            this.offSwlReadOnly = true;
                            this.disabled = true;
                            this.offswlModel = new OffenderIndSchWaitLists();
                            this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                            this.deleteFlag = true;
                            return {
                                offenderBookId: this.vHeaderBlockModel.offenderBookId,
                                agyLocId: this.vHeaderBlockModel.agyLocId, offenderLastName: this.vHeaderBlockModel.lastName,
                                offenderFirstName: this.vHeaderBlockModel.firstName, offenderBookNo: this.vHeaderBlockModel.bookingNo,
                                offenderIdDisplay: this.vHeaderBlockModel.offenderIdDisplay
                            };
                    }
            } else if (this.offswlModel.eventId) {

                const data = {
                    label: this.translateService.translate('oidstwju.savethechanges'), yesBtn: true, noBtn: true, canBtn: true
                };
                this.dialogService.openLinkDialog('/oidstwjuconfirmationpopup', data, 80).subscribe(result => {
                    if (!result) {
                        this.offSwlReadOnly = true;
                        this.offswlModel = new OffenderIndSchWaitLists();
                        this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));

                        return {
                            offenderBookId: this.vHeaderBlockModel.offenderBookId,
                            agyLocId: this.vHeaderBlockModel.agyLocId, offenderLastName: this.vHeaderBlockModel.lastName,
                            offenderFirstName: this.vHeaderBlockModel.firstName, offenderBookNo: this.vHeaderBlockModel.bookingNo,
                            offenderIdDisplay: this.vHeaderBlockModel.offenderIdDisplay
                        };
                    } else {
                         this.display = true;
                        this.oidstwjuSaveoffswlForm();
                        return false;
                    }

                });
            }
        } else {
            this.offSwlReadOnly = true;
            this.disabled = true;
            this.offswlModel = new OffenderIndSchWaitLists();
            this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
            this.deleteFlag = true;
            return {
                offenderBookId: this.vHeaderBlockModel.offenderBookId,
                agyLocId: this.vHeaderBlockModel.agyLocId, offenderLastName: this.vHeaderBlockModel.lastName,
                offenderFirstName: this.vHeaderBlockModel.firstName, offenderBookNo: this.vHeaderBlockModel.bookingNo,
                offenderIdDisplay: this.vHeaderBlockModel.offenderIdDisplay
            };

        }

    }

    statusDateKeyListvalTrigger(event) {
        if (!this.offschModel.eventSubType && !this.offschModel.eventDate && !this.offschModel.startTime
            && !this.offschModel.toAgyLocId) {
          this.show(this.translateService.translate('oidstwju.offschreasonenter'), 'warn');
            this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));

            return;
        }

        if (!event) {
            this.display = true;
        } else {
            if (this.offswlModel.statusDate) {
                if (this.verifySaveFlag) {
                    this.display = true;
                } else {
                    this.display = false;
                }
                this.offswlUpdateFlag = true;
                if (this.offswlModel.eventId) {
                    this.clearFlag = true;
                } else {
                    this.clearFlag = false;
                }
            }
        }
    }

    requestDateWhenValidateItemTrigger(event) {

        if (!this.offschModel.eventSubType || !this.offschModel.eventDate || !this.offschModel.startTime
            || !this.offschModel.toAgyLocId) {
            this.offswlModel = new OffenderIndSchWaitLists();
            this.offswlModel.statusDate = DateFormat.getDate();
          this.show(this.translateService.translate('oidstwju.offschreasonenter'), 'warn');
            return false;
        }
        if (!event) {
            this.display = true;
        } else {
            if (this.offswlModel.requestDate) {
                if (DateFormat.compareDate(DateFormat.getDate(this.offswlModel.requestDate), DateFormat.getDate()) > 0) {
                    this.show(this.translateService.translate('oidstwju.requestdatealert'), 'warn');
                }
                if (this.verifySaveFlag) {
                    this.display = true;
                } else {
                    this.display = false;
                }
                if (this.offswlModel.eventId) {
                    this.clearFlag = true;
                } else {
                    this.clearFlag = false;
                }
                this.offswlUpdateFlag = true;
            }
        }
    }

    oidstwjuSaveoffschswlForm() {
        // TODO declare commit bean and add insert list to that object
        this.offschCommitModel.insertList = [];
        this.offschCommitModel.updateList = [];
        this.offschCommitModel.deleteList = [];
        this.offswlRecordVerify = false;
        if (this.offswlModel.requestDate && this.offswlModel.transferPriority &&
            this.offswlModel.statusDate && this.offswlModel.waitListStatus) {

            if (this.offswlModel.waitListStatus === 'CAN' || this.offswlModel.waitListStatus === 'CANC') {
                if (!this.offswlModel.outcomeReasonCode) {
                    this.show(this.translateService.translate('oidstwju.cancelreasonmustbeentered'), 'warn');
                    return false;
                }
            }
            this.offswlRecordVerify = true;
        }

        if (this.offswlRecordVerify) {
            if (this.offswlModel.eventId) {
                this.offswlCreateOrUpdate = 'UPD';
            } else if (!this.offswlModel.eventId && !this.offschModel.eventId) {
                this.offswlCreateOrUpdate = 'CRT';
            } else {
                this.offswlCreateOrUpdate = 'UPD';
            }
        } else {
            this.offswlCreateOrUpdate = 'NA';
        }

        for (let i = 0; i < this.offschData.length; i++) {
            if (!this.offschData[i].eventId) {
                this.offschInsertList.push(this.offschData[i]);
            }
        }
        if (this.listToCompare.length > 0) {
            for (let i = 0; i < this.offschData.length; i++) {
                for (let j = 0; j < this.listToCompare.length; j++) {
                    if (this.offschData[i].eventId === this.listToCompare[j]) {
                        this.offschUpdateList.push(this.offschData[i]);

                    } else {
                        if (this.offschData[i].eventId === this.offschModel.eventId) {
                            this.offschUpdateList.push(this.offschModel);
                        }
                    }
                }
            }
        } else {
            if (this.offswlCreateOrUpdate === 'UPD') {
                this.offschUpdateList.push(this.offschModel);
            }
        }
        if (this.offschInsertList.length > 0) {
            if (this.offswlCreateOrUpdate === 'CRT') {
                this.offswlCreateIndex = this.offschInsertList.length;
                if (this.offswlCreateIndex > 0) {
                    this.offswlCreateIndex = this.offswlCreateIndex - 1;
                }
            }
            for (let i = 0; i < this.offschInsertList.length; i++) {
                if (!this.offschInsertList[i].eventDate) {
                    this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
                    return false;
                }
                if (!this.offschInsertList[i].startTime) {
                    this.show(this.translateService.translate('oidstwju.timeentered'), 'warn');
                    return false;
                }
                if (!this.offschInsertList[i].toAgyLocId) {
                    this.show(this.translateService.translate('oidstwju.facilityentered'), 'warn');
                    return false;
                }
                if (!this.offschInsertList[i].eventSubType) {
                    this.show(this.translateService.translate('oidstwju.reasonentered'), 'warn');
                    return false;
                }

                this.offschInsertList[i].eventDate = DateFormat.getDate(this.offschInsertList[i].eventDate);
                if (DateFormat.compareDate(this.offschInsertList[i].eventDate, DateFormat.getDate()) < 0) {
                    this.show(this.translateService.translate('oidstwju.scheduledatealert'), 'warn');
                    return;
                }
                if (DateFormat.compareDate(this.offschInsertList[i].eventDate, DateFormat.getDate()) === 0) {
                    if (DateFormat.compareTime(this.offschInsertList[i].startTime, DateFormat.getDate()) < 0) {
                        this.show(this.translateService.translate('oidstwju.scheduledatealert'), 'warn');
                        return;
                    }
                }
                this.offschInsertList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offschInsertList[i].startTime),
                    this.offschInsertList[i].eventDate);

                if (this.offschInsertList[i].activeFlag) {
                    this.offschInsertList[i].activeFlag = 'Y';
                } else {
                    this.offschInsertList[i].activeFlag = 'N';
                }
                if (!this.offschInsertList[i].eventStatus) {
                    this.offschInsertList[i].eventStatus = 'SCH';
                }
                this.offschInsertList[i].directionCode = 'OUT';

                if (this.offswlCreateOrUpdate === 'CRT') {
                    if (i === this.offswlCreateIndex) {
                        if (this.offswlModel.requestDate !== null && this.offswlModel.requestDate !== undefined) {
                            if (DateFormat.compareDate(DateFormat.getDate(this.offswlModel.requestDate), DateFormat.getDate()) > 0) {
                                this.show(this.translateService.translate('oidstwju.requestdatealert'), 'warn');
                                return;
                            }
                            this.display = false;
                        } else {
                            this.show(this.translateService.translate('oidstwju.requestdateentered'), 'warn');
                            return;
                        }


                        this.offschInsertList[i].nbtRequestDate = this.offswlModel.requestDate;
                        this.offschInsertList[i].nbtWaitListStatus = this.offswlModel.waitListStatus;
                        this.offschInsertList[i].nbtStatusDate = this.offswlModel.statusDate;
                        this.offschInsertList[i].nbtTransferPriority = this.offswlModel.transferPriority;
                        if (this.offswlModel.approvedFlag) {
                            this.offschInsertList[i].nbtApprovedFlag = 'Y';
                        } else {
                            this.offschInsertList[i].nbtApprovedFlag = 'N';
                        }
                        this.offschInsertList[i].nbtApprovedStaffId = this.offswlModel.approvedStaffId;

                        this.offschInsertList[i].nbtOutcomeReasonCode = this.offswlModel.outcomeReasonCode;
                        this.offschInsertList[i].nbtFirstName = this.offswlModel.nbtFirstName;
                        this.offschInsertList[i].nbtLastName =  this.offswlModel.nbtLastName;
                        this.offschInsertList[i].nbtCommentText1 = this.offswlModel.commentText1;

                    }
                }
            }
            this.offschCommitModel.insertList = this.offschInsertList;
        }

        if (this.offschUpdateList && this.offschUpdateList.length > 0) {
            for (let i = 0; i < this.offschUpdateList.length; i++) {
                if (!this.offschUpdateList[i].eventDate) {
                    this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
                    return false;
                }
                if (!this.offschUpdateList[i].startTime) {
                    this.show(this.translateService.translate('oidstwju.timeentered'), 'warn');
                    return false;
                }
                if (!this.offschUpdateList[i].toAgyLocId) {
                    this.show(this.translateService.translate('oidstwju.facilityentered'), 'warn');
                    return false;
                }
                if (!this.offschUpdateList[i].eventSubType) {
                    this.show(this.translateService.translate('oidstwju.reasonentered'), 'warn');
                    return false;
                }

                this.offschUpdateList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offschUpdateList[i].startTime),
                    this.offschUpdateList[i].eventDate);

                if (this.offswlCreateOrUpdate === 'UPD') {
                    if (this.offschUpdateList[i].eventId === this.offschModel.eventId) {

                        if (this.offswlModel.requestDate !== null && this.offswlModel.requestDate !== undefined) {
                            if (DateFormat.compareDate(DateFormat.getDate(this.offswlModel.requestDate), DateFormat.getDate()) > 0) {
                                this.show(this.translateService.translate('oidstwju.requestdatealert'), 'warn');
                                return;
                            }
                            this.display = false;
                        } else {
                            this.show(this.translateService.translate('oidstwju.requestdateentered'), 'warn');
                            return;
                        }

                        if (this.offswlModel.eventId) {
                            this.offschUpdateList[i].insertedFlag = false;
                            this.offschUpdateList[i].nbtCreateDatetime = this.offswlModel.createDatetime;
                        } else {
                            this.offschUpdateList[i].insertedFlag = true;
                            this.offschUpdateList[i].nbtCreateDatetime = DateFormat.getDate();
                        }

                        this.offschUpdateList[i].nbtEventId = this.offschUpdateList[i].eventId;
                        this.offschUpdateList[i].nbtRequestDate = this.offswlModel.requestDate;
                        this.offschUpdateList[i].nbtWaitListStatus = this.offswlModel.waitListStatus;
                        this.offschUpdateList[i].nbtStatusDate = this.offswlModel.statusDate;
                        this.offschUpdateList[i].nbtTransferPriority = this.offswlModel.transferPriority;
                        if (this.offswlModel.approvedFlag) {
                            this.offschUpdateList[i].nbtApprovedFlag = 'Y';
                        } else {
                            this.offschUpdateList[i].nbtApprovedFlag = 'N';
                        }
                        this.offschUpdateList[i].nbtApprovedStaffId = this.offswlModel.approvedStaffId;

                        this.offschUpdateList[i].nbtOutcomeReasonCode = this.offswlModel.outcomeReasonCode;
                        this.offschUpdateList[i].nbtFirstName = this.offswlModel.nbtFirstName;
                        this.offschUpdateList[i].nbtLastName = this.offswlModel.nbtLastName;
                        this.offschUpdateList[i].nbtCommentText1 = this.offswlModel.commentText1;
                        this.offschUpdateList[i].nbtCreateUserId = this.offswlModel.createUserId;
                    }
                }
            }
            this.offschCommitModel.updateList = this.offschUpdateList;


        }
        if (this.offschDeleteList && this.offschDeleteList.length > 0) {
            this.offschCommitModel.deleteList = this.offschDeleteList;
        }
        if (this.offschInsertList.length > 0) {
            const offschCheckConflit = this.oidstwjuFactory.checkScheduleConflict(this.offschCommitModel);
            offschCheckConflit.subscribe(checkConflict => {

                if (checkConflict > 0) {

                    this.dialogService.openLinkDialog('/oiuscinq', this.offschModel).subscribe(result => {
                        if (!result) {
                            this.addFlag = true;
                            this.oidstwjuexecuteQuery();
                            return;
                        } else {
                            this.oidstwjuSaveAllSchAndSwlOffender();

                        }
                    });
                } else {

                    this.oidstwjuSaveAllSchAndSwlOffender();
                }
            });
        } else {
            this.oidstwjuSaveAllSchAndSwlOffender();
        }
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidstwjuSaveoffschForm(event) {
        // TODO declare commit bean and add insert list to that object
        if (this.checkConfict) {
            this.offschModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.dialogService.openLinkDialog('/oiuscinq', this.offschModelTemp).subscribe(result => {
                if (result) {
                    this.checkConfict = false;
                    return false;
                } else {
                    this.checkConfict = true;
                    return true;
                }
            });
        } else {
        this.offschInsertList = [];
        this.offschUpdateList = [];
        this.offschDeleteList = [];
        this.offschInsertList = event.added;
        this.offschUpdateList = event.updated;
        this.offschDeleteList = event.removed;
        this.offschCommitModel.insertList = [];
        this.offschCommitModel.updateList = [];
        this.offschCommitModel.deleteList = [];
        this.offswlRecordVerify = false;

        if (this.offswlModel.requestDate && this.offswlModel.transferPriority &&
            this.offswlModel.statusDate && this.offswlModel.waitListStatus) {

            if (this.offswlModel.waitListStatus === 'CAN' || this.offswlModel.waitListStatus === 'CANC') {
                if (!this.offswlModel.outcomeReasonCode) {
                    this.show(this.translateService.translate('oidstwju.cancelreasonmustbeentered'), 'warn');
                    return false;
                }
            }
            this.offswlRecordVerify = true;
        }

        if (this.offswlRecordVerify) {
            if (this.offswlModel.eventId) {
                this.offswlCreateOrUpdate = 'UPD';
            } else if (!this.offswlModel.eventId && !this.offschModel.eventId) {
                this.offswlCreateOrUpdate = 'CRT';
            } else {
                this.offswlCreateOrUpdate = 'UPD';
            }
        } else {
            this.offswlCreateOrUpdate = 'NA';
        }

        if (this.offschInsertList.length > 0) {
            if (this.offswlCreateOrUpdate === 'CRT') {
                this.offswlCreateIndex = this.offschInsertList.length;
                if (this.offswlCreateIndex > 0) {
                    this.offswlCreateIndex = this.offswlCreateIndex - 1;
                }
            }
            for (let i = 0; i < this.offschInsertList.length; i++) {
                if (!this.offschInsertList[i].eventDate) {
                    this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
                    return false;
                }
                if (!this.offschInsertList[i].startTime) {
                    this.show(this.translateService.translate('oidstwju.timeentered'), 'warn');
                    return false;
                }
                if (!this.offschInsertList[i].toAgyLocId) {
                    this.show(this.translateService.translate('oidstwju.facilityentered'), 'warn');
                    return false;
                }
                if (!this.offschInsertList[i].eventSubType) {
                    this.show(this.translateService.translate('oidstwju.reasonentered'), 'warn');
                    return false;
                }


                this.offschInsertList[i].eventDate = DateFormat.getDate(this.offschInsertList[i].eventDate);
                if (DateFormat.compareDate(this.offschInsertList[i].eventDate, DateFormat.getDate()) < 0) {

                    this.show(this.translateService.translate('oidstwju.scheduledatealert'), 'warn');
                    return;
                }
                if (DateFormat.compareDate(this.offschInsertList[i].eventDate, DateFormat.getDate()) === 0) {
                    if (DateFormat.compareTime(this.offschInsertList[i].startTime, DateFormat.getDate()) < 0) {
                        this.show(this.translateService.translate('oidstwju.scheduledatealert'), 'warn');
                        return;
                    }
                }

                if (this.offschInsertList[i].startTime) {
                    let startHours = DateFormat.getDate(this.offschInsertList[i].startTime).getHours();
                    let startMinutes = DateFormat.getDate(this.offschInsertList[i].startTime).getMinutes();
                    this.offschInsertList[i].startTime = DateFormat.getDate(DateFormat.getDate(this.offschInsertList[i].eventDate).setHours(startHours, startMinutes, 0, 0));
                }


               /*  this.offschInsertList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offschInsertList[i].startTime),
                    this.offschInsertList[i].eventDate); */

                if (this.offschInsertList[i].activeFlag === undefined && this.offschInsertList[i].activeFlag) {
                    this.offschInsertList[i].activeFlag = 'Y';
                } else {
                    this.offschInsertList[i].activeFlag = 'N';
                }
                if (!this.offschInsertList[i].eventStatus) {
                    this.offschInsertList[i].eventStatus = 'SCH';
                }
                this.offschInsertList[i].directionCode = 'OUT';

                if (this.offswlCreateOrUpdate === 'CRT') {
                    if (i === this.offswlCreateIndex) {
                        if (this.offswlModel.requestDate !== null && this.offswlModel.requestDate !== undefined) {
                            if (DateFormat.compareDate(DateFormat.getDate(this.offswlModel.requestDate), DateFormat.getDate()) > 0) {
                                this.show(this.translateService.translate('oidstwju.requestdatealert'), 'warn');
                                return;
                            }
                            this.display = false;
                        } else {
                            this.show(this.translateService.translate('oidstwju.requestdateentered'), 'warn');
                            return;
                        }


                        this.offschInsertList[i].nbtRequestDate = this.offswlModel.requestDate;
                        this.offschInsertList[i].nbtWaitListStatus = this.offswlModel.waitListStatus;
                        this.offschInsertList[i].nbtStatusDate = this.offswlModel.statusDate;
                        this.offschInsertList[i].nbtTransferPriority = this.offswlModel.transferPriority;
                        if (this.offswlModel.approvedFlag) {
                            this.offschInsertList[i].nbtApprovedFlag = 'Y';
                        } else {
                            this.offschInsertList[i].nbtApprovedFlag = 'N';
                        }
                        this.offschInsertList[i].nbtApprovedStaffId = this.offswlModel.approvedStaffId;

                        this.offschInsertList[i].nbtOutcomeReasonCode = this.offswlModel.outcomeReasonCode;
                        this.offschInsertList[i].nbtFirstName = this.offswlModel.nbtFirstName;
                        this.offschInsertList[i].nbtLastName =  this.offswlModel.nbtLastName;
                        this.offschInsertList[i].nbtCommentText1 = this.offswlModel.commentText1;

                    }
                }
            }
            this.offschCommitModel.insertList = this.offschInsertList;
        }
        if (this.listToCompare.length === 0) {
            if (this.offswlCreateOrUpdate === 'UPD') {
                this.offschUpdateList.push(this.offschModel);
            }
        }  else {
             this.compareUpdateVerify  = false;
            for (let j = 0; j < this.listToCompare.length; j++) {
                if (this.listToCompare[j] === this.offschModel.eventId) {
                    this.compareUpdateVerify  = true;
                    break;
                }
            }
             if (!this.compareUpdateVerify) {
             this.offschUpdateList.push(this.offschModel);
            }
            }
        if (this.offschUpdateList.length > 0) {
            for (let i = 0; i < this.offschUpdateList.length; i++) {
                if (!this.offschUpdateList[i].eventDate) {
                    this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
                    return false;
                }
                if (!this.offschUpdateList[i].startTime) {
                    this.show(this.translateService.translate('oidstwju.timeentered'), 'warn');
                    return false;
                }
                if (!this.offschUpdateList[i].toAgyLocId) {
                    this.show(this.translateService.translate('oidstwju.facilityentered'), 'warn');
                    return false;
                }
                if (!this.offschUpdateList[i].eventSubType) {
                    this.show(this.translateService.translate('oidstwju.reasonentered'), 'warn');
                    return false;
                }

                if (this.offschUpdateList[i].startTime) {
                    let startHours = DateFormat.getDate(this.offschUpdateList[i].startTime).getHours();
                    let startMinutes = DateFormat.getDate(this.offschUpdateList[i].startTime).getMinutes();
                    this.offschUpdateList[i].startTime = DateFormat.getDate(DateFormat.getDate(this.offschUpdateList[i].eventDate).setHours(startHours, startMinutes, 0, 0));
                }
                if (this.offswlCreateOrUpdate === 'UPD') {
                    if (this.offschUpdateList[i].eventId === this.offschModel.eventId) {
                        if (this.offswlModel.requestDate !== null && this.offswlModel.requestDate !== undefined) {
                            if (DateFormat.compareDate(DateFormat.getDate(this.offswlModel.requestDate), DateFormat.getDate()) > 0) {
                                this.show(this.translateService.translate('oidstwju.requestdatealert'), 'warn');
                                return;
                            }
                             this.display = false;
                            } else {
                            this.show(this.translateService.translate('oidstwju.requestdateentered'), 'warn');
                            return;
                        }

                        if (this.offswlModel.eventId) {
                            this.offschUpdateList[i].insertedFlag = false;
                            this.offschUpdateList[i].nbtCreateDatetime = this.offswlModel.createDatetime;
                        } else {
                            this.offschUpdateList[i].insertedFlag = true;
                            this.offschUpdateList[i].nbtCreateDatetime = DateFormat.getDate();
                        }

                        this.offschUpdateList[i].nbtEventId = this.offschUpdateList[i].eventId;
                        this.offschUpdateList[i].nbtRequestDate = this.offswlModel.requestDate;
                        this.offschUpdateList[i].nbtWaitListStatus = this.offswlModel.waitListStatus;
                        this.offschUpdateList[i].nbtStatusDate = this.offswlModel.statusDate;
                        this.offschUpdateList[i].nbtTransferPriority = this.offswlModel.transferPriority;
                        if (this.offswlModel.approvedFlag) {
                            this.offschUpdateList[i].nbtApprovedFlag = 'Y';
                        } else {
                            this.offschUpdateList[i].nbtApprovedFlag = 'N';
                        }
                        this.offschUpdateList[i].nbtApprovedStaffId = this.offswlModel.approvedStaffId;

                        this.offschUpdateList[i].nbtOutcomeReasonCode = this.offswlModel.outcomeReasonCode;
                        this.offschUpdateList[i].nbtFirstName = this.offswlModel.nbtFirstName;
                        this.offschUpdateList[i].nbtLastName =  this.offswlModel.nbtLastName;
                        this.offschUpdateList[i].nbtCommentText1 = this.offswlModel.commentText1;
                        this.offschUpdateList[i].nbtCreateUserId = this.offswlModel.createUserId;
                    }
                }
            }
            this.offschCommitModel.updateList = this.offschUpdateList;
            }

        if (this.offschDeleteList.length > 0) {
            this.offschCommitModel.deleteList = this.offschDeleteList;
        }

        if (this.offschInsertList.length > 0) {
            const offschCheckConflit = this.oidstwjuFactory.checkScheduleConflict(this.offschCommitModel);
            offschCheckConflit.subscribe(checkConflict => {

                if (checkConflict > 0 && this.checkConfict) {

                    this.dialogService.openLinkDialog('/oiuscinq', this.offschModel).subscribe(result => {
                        if (!result) {
                            this.addFlag = true;
                            this.oidstwjuexecuteQuery();
                            return;
                        } else {
                            this.oidstwjuSaveAllSchAndSwlOffender();

                        }
                    });
                } else {

                    this.oidstwjuSaveAllSchAndSwlOffender();
                }
            });
        } else {
            this.oidstwjuSaveAllSchAndSwlOffender();
        }
    }
    }
checkNonAssociation() {
    const serviceObj = this.oidstwjuFactory.chkNonAssociation(this.offschCommitModel);
    serviceObj.subscribe(count => {
        if (count > 0) {
            const data = {
                label: this.translateService.translate('oidstwju.nonassociation'), yesBtn: true, cancelBtn: true,
                yesLabel: 'CONTINUE'
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 80).subscribe(result => {
                if (result) {
                    this.save();
                } else {
                    this.oidstwjuexecuteQuery();
                    return;
                }
            });
        } else {
            this.save();
        }
    });
}
checkNonAssociationDate(){
    this.oidstwjuFactory.chkNonAssociationDate(this.offschCommitModel).subscribe(data => {
        if(data && data != 'EMPTYDATA'){
            const msgOne  = this.translateService.translate('oidstwju.nonassociationconflictmsg');
            const msgTwo = this.translateService.translate('oidstwju.doyouwanttocontinue');
            const msgThree  = this.translateService.translate('oidstwju.indinonassocconflict');
            const msgFour = this.translateService.translate('oidstwju.gangnonassocconflict');
            data = data.replaceAll('oidstwju.nonassociationconflictmsg',msgOne);
            data = data.replaceAll('oidstwju.doyouwanttocontinue',msgTwo);
             data = data.replaceAll('oidstwju.indinonassocconflict',msgThree);
            data = data.replaceAll('oidstwju.gangnonassocconflict',msgFour);
            const labelMsg = {
                label: this.translateService.translate(data), yesBtn: true, proceedWithNoConflictsBtn: false,cancelBtn:true,
                    proceedBtnDisabled: true
                };
            this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                if(result){
                    this.save();
                }
            });
        }else{
            this.save();
        }
      }); 
}
    oidstwjuSaveAllSchAndSwlOffender() {
      //  this.checkNonAssociation();
        this.checkNonAssociationDate();
    }
    save() {
        const offschSaveData = this.oidstwjuFactory.offSchCommit(this.offschCommitModel);
        offschSaveData.subscribe(data => {
            if (data === 1) {
                this.addFlag = true;

                if (this.offschDeleteList.length > 0) {
                    const dataDelete = {
                        label: this.translateService.translate('oidstwju.notificationfordeletion'), yesBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidstwjudelnotifipopup', dataDelete, 80).subscribe(result => {
                        if (result) {
                            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                            this.oidstwjuexecuteQuery();
                            return;
                        }
                    });
                } else {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.oidstwjuexecuteQuery();
                    return;
                }
            } else if (data === 5) {
                this.show(this.translateService.translate('oidstwju.notoficationmustbecompleted'), 'info');
                this.oidstwjuexecuteQuery();
                return;
            } else if (data === 6) {
                this.show(this.translateService.translate('oidstwju.nonassociation'), 'warn');
                this.oidstwjuexecuteQuery();
                return;
            } else if (data === 8) {
                this.show(this.translateService.translate('oidstwju.classificationconflict'), 'warn');
                this.oidstwjuexecuteQuery();
                return;
            } else if (data === 7) {
                this.show(this.translateService.translate('oidstwju.errordeletingoffender'), 'warn');
                this.oidstwjuexecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                this.oidstwjuexecuteQuery();
                return;
            }

        });
    }

    // execute query
    oidstwjuexecuteQuery() {

        this.verifySaveFlag = false;
        this.offswlUpdateFlag = false;
        this.listToCompare = [];
        this.eventIdCount = 0;
        this.display = true;
        this.offschIndex = 0;
        this.agyLodIdIndex = 0;
        this.offswlData = [];
        this.clearFlag = true;
        this.deleteFlag = true;
        this.offSwlReadOnly = true;
        this.offswlRecordVerify = false;
        this.offschInsertList = [];
        this.offschUpdateList = [];
        this.offschDeleteList = [];
        this.disabled = true;
        this.offschModel = new VOffenderAllSchedules();
        this.offschModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.oidstwjuFactory.offSchExecuteQuery(this.offschModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offschData = [];
                this.disabled = true;
                this.offschModel = new VOffenderAllSchedules();
                this.vOffswlModel = new OffenderIndSchWaitLists();
                this.offswlModel = new OffenderIndSchWaitLists();
                this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                this.agyLodIdIndex = 0;
            } else {
                for (let i = 0; i < data.length; i++) {
                    data[i].activeFlag = data[i].activeFlag === 'Y' ? true : false;
                }

                this.offschData = data;
                this.offschModel = this.offschData[0];
                this.display = true;
                this.tableIndex = 0;
                this.agyLodIdIndex = this.offschData.length;
            }
        });

    }
    isInsertable() {
        if (!this.vHeaderBlockModel && !this.vHeaderBlockModel.offenderBookId ) {
             return;
             }
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.offschModel
            && !this.offschModel.eventDate && !this.offschModel.startTime &&
            !this.offschModel.toAgyLocId && !this.offschModel.eventSubType) {
            this.show(this.translateService.translate('oidstwju.offschreasonenter'), 'warn');
            this.offswlModel.nbtFirstName = null;
            this.offswlModel.nbtLastName = null;
            this.offswlModel.commentText1 = null;
            this.lastName = undefined;
            return;
        }

        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId &&
             ( (!this.offschModel.eventDate && this.offschModel.startTime) || !this.offschModel.eventDate)) {
            this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
            return;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.startTime) {
            this.show(this.translateService.translate('oidstwju.timeentered'), 'warn');
            return;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.toAgyLocId) {
            this.show(this.translateService.translate('oidstwju.facilityentered'), 'warn');
            return;
        } else if ( this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !this.offschModel.eventSubType) {
            this.show(this.translateService.translate('oidstwju.reasonentered'), 'warn');
            return;
        }


        if (this.verifySaveFlag) {
            this.display = true;
        } else {
            this.display = false;
        }
        if (this.offswlModel.eventId) {
            this.clearFlag = true;
        } else {
            this.clearFlag = false;
        }
        this.offswlUpdateFlag = true;
    }

    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    oidstwjudateFormat(dateValue) {
        if (dateValue !== undefined && dateValue.length > 0) {
            const newdate = dateValue.split('/');
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }
    offswlExecuteQuery() {
        this.offswlModel = new OffenderIndSchWaitLists();
        this.lastName = undefined;
        this.offswlModel.eventId = this.offschModel.eventId;
        this.offswlUpdateFlag = false;
        const offswlResult = this.oidstwjuFactory.offSwlExecuteQuery(this.offswlModel);
        offswlResult.subscribe(offswlResultList => {
            if (offswlResultList.length === 0) {
                this.offswlModel = new OffenderIndSchWaitLists();
                this.lastName = undefined;
                this.vOffswlModel = new OffenderIndSchWaitLists();
                this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                this.display = true;
                this.deleteFlag = true;
                //this.clearFlag = false;
                this.verifyStatusFlag = false;
                this.verifyPriorityFlag = false;
                this.verifyApprovedByFlag = false;
                this.verifyCheckFlag = false;
                this.verifyReasonFlag = false;
                this.disabled = false;
            } else {
                for (let i = 0; i < offswlResultList.length; i++) {
                    offswlResultList[i].approvedFlag = offswlResultList[i].approvedFlag === 'Y' ? true : false;
                    if (offswlResultList[i].statusDate !== null) {
                        offswlResultList[i].statusDate = DateFormat.parse(DateFormat.format(offswlResultList[i].statusDate));
                    } else {
                        this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                    }

                    if (offswlResultList[i].requestDate !== null) {
                        offswlResultList[i].requestDate = DateFormat.parse(DateFormat.format(offswlResultList[i].requestDate));
                    }

                }
                this.disabled = false;
                this.display = true;
                this.clearFlag = true;
                this.deleteFlag = false;
                this.offSwlReadOnly = true;
                this.offswlModel = offswlResultList[0];
                if ( this.offswlModel.approvedStaffId) {
                this.lastName = this.offswlModel.approvedStaffId;
                } else {
                this.verifyApprovedByFlag = false;
                }
                this.vOffswlModel = offswlResultList[0];
                 if (this.offswlModel.approvedFlag) {
                    this.offSwlReadOnly = false;
                    this.verifyCheckFlag = false;
                } else {
                      this.verifyCheckFlag = false;
                     if (!this.offswlModel.outcomeReasonCode) {
                            this.verifyReasonFlag = false;
                        }
                     }
                }
        });
    }

    oidstwjuDeleteoffswlForm() {

        this.offswlUpdateList = [];
        this.offswlInsertList = [];
        this.offswlDeleteList = [];
        this.offswlCommitModel.insertList = [];
        this.offswlCommitModel.updateList = [];
        this.offswlCommitModel.deleteList = [];

        if (!this.offswlModel.eventId) {
            return;
        } else {
            this.offswlDeleteList.push(this.offswlModel);
        }
        if (this.offswlDeleteList.length > 0) {
            this.offswlCommitModel.deleteList = this.offswlDeleteList;
        }
        const offswlSaveData = this.oidstwjuFactory.offSwlCommit(this.offswlCommitModel);
        offswlSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.oidstwjuexecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                this.oidstwjuexecuteQuery();
                return;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidstwjuSaveoffswlForm() {
        // TODO declare commit bean and add insert list to that object.
        this.offswlInsertList = [];
        this.offswlUpdateList = [];
        this.offswlCommitModel.insertList = [];
        this.offswlCommitModel.updateList = [];
        this.offswlCommitModel.deleteList = [];
        this.offschUpdateList = [];
        this.offschInsertList = [];
        this.offschCommitModel.updateList = [];
        this.offschCommitModel.deleteList = [];
        this.offschCommitModel.insertList = [];

        if (this.offswlModel.requestDate !== null && this.offswlModel.requestDate !== undefined) {
            if (DateFormat.compareDate(DateFormat.getDate(this.offswlModel.requestDate), DateFormat.getDate()) > 0) {
                this.show(this.translateService.translate('oidstwju.requestdatealert'), 'warn');
                return;
            }
            this.display = false;
        } else {
            this.show(this.translateService.translate('oidstwju.requestdateentered'), 'warn');
            return;
        }

        if (!this.offswlModel.waitListStatus) {
            this.show(this.translateService.translate('oidstwju.statusmustbeentered'), 'warn');
            return;
        } else {
            if (this.offswlModel.waitListStatus === 'CAN' || this.offswlModel.waitListStatus === 'CANC') {
                if (!this.offswlModel.outcomeReasonCode) {
                    this.show(this.translateService.translate('oidstwju.cancelreasonmustbeentered'), 'warn');
                    return false;
                }
            }
        }
        if (!this.offswlModel.statusDate) {
            this.show(this.translateService.translate('oidstwju.eventdateentered'), 'warn');
            return;
        }
        if (!this.offswlModel.transferPriority) {
            this.show(this.translateService.translate('oidstwju.prioritymustbeentered'), 'warn');
            return;
        }
        if (this.offswlModel.approvedFlag) {
            this.offswlModel.approvedFlag = 'Y';
        } else {
            this.offswlModel.approvedFlag = 'N';
        }
        if (!this.offswlModel.createDatetime) {
            this.offswlModel.createDatetime = DateFormat.getDate();
        }
        this.offswlModel.modifyDatetime = DateFormat.getDate();

        if (this.offswlModel.eventId) {
            this.offswlUpdateList.push(this.offswlModel);
            this.offswlCommitModel.updateList = this.offswlUpdateList;
        } else {
            if (this.offschModel.eventId) {
                this.offswlModel.eventId = this.offschModel.eventId;
                this.offswlInsertList.push(this.offswlModel);
                this.offswlCommitModel.insertList = this.offswlInsertList;
            }

        }

        if (this.listToCompare.length === 0) {
            this.offschUpdateList.push(this.offschModel);
        }

        for (let i = 0; i < this.offschData.length; i++) {
            for (let j = 0; j < this.listToCompare.length; j++) {
                if (this.offschData[i].eventId === this.listToCompare[j]) {

                    this.offschUpdateList.push(this.offschData[i]);
                }
            }
        }
        this.offschCommitModel.updateList = this.offschUpdateList;
        this.offschCommitModel.deleteList = this.offschDeleteList;
        const offswlSaveData = this.oidstwjuFactory.offSwlCommit(this.offswlCommitModel);
        offswlSaveData.subscribe(data => {
            if (data === 1) {
                this.save();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                this.oidstwjuexecuteQuery();
                return;
            }
        });
    }


    oidstwjuOnClearDetailsTrigger() {
        this.offswlModel = new OffenderIndSchWaitLists();
        this.offswlModel.statusDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
        this.display = true;
        this.deleteFlag = true;
        this.clearFlag = true;
        this.lastName = undefined;
        this.setEventStatus();
    }


    updateOffenderSchValidator = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'eventDate' && event.data.eventId) {
            this.compareDuplicate = false;
            this.inCountDup = 0;
            if (event.data.eventDate) {
                for (let i = 0; i < this.offschData.length; i++) {
                    if (this.offschData[i].eventDate) {
                        if ((DateFormat.compareDate(DateFormat.getDate(this.offschData[i].eventDate),
                        DateFormat.getDate(event.data.eventDate)) === 0) &&
                            this.offschData[i].offenderBookId === event.data.offenderBookId
                            && this.offschData[i].eventStatus === 'SCH') {
                            this.inCountDup++;
                            if (this.inCountDup > 1) {
                                this.compareDuplicate = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (this.compareDuplicate && !this.conflictFlag && this.checkConfict) {
                this.dialogService.openLinkDialog('/oiuscinq', this.offschModel).subscribe(result => {
                    if (!result) {
                        this.conflictFlag = false;
                        this.checkConfict = false;
                    } else {
                        this.conflictFlag = true;
                        this.checkConfict = true;
                    }
                });
            }
        }
        if (event.oldValue !== event.newValue) {
            this.verifySaveFlag = true;
            this.display = true;
            this.listToCompare = [];
            if (event.field === 'eventDate') {
            this.offschModelTemp = new VOffenderAllSchedules();
            this.offschModelTemp.eventDate = event.data.eventDate;
            this.offschModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const offschCheckConflit = this.oidstwjuFactory.checkScheduleConflictmsg(this.offschModelTemp);
            offschCheckConflit.subscribe(checkConflict => {
                if (checkConflict > 0) {
                    this.dialogService.openLinkDialog('/oiuscinq', this.offschModelTemp).subscribe(result => {
                        if (result) {
                            this.checkConfict = false;
                        } else {
                            this.checkConfict = true;
                        }
                    });
                } else {
                    this.checkConfict = false;
                }
            });
        }
            if (this.offschModel.eventId) {
                const eventIds = this.listToCompare.
                    find(eventId => eventId === this.offschModel.eventId);
                if (!eventIds) {
                    if(this.offschModel.eventId){
                        this.listToCompare.push(this.offschModel.eventId);
                    }
                }
            }
        } else {
            this.verifySaveFlag = false;
        }
        if ( event.data.eventDate &&  event.data.startTime && event.data.toAgyLocId && event.data.eventSubType ) {
            this.disabled = false;
            } else {
            this.disabled = true;
            }
        rowdata.data = {
            eventDate: event.data.eventDate,
            startTime: event.data.startTime, toAgyLocId: event.data.toAgyLocId, eventSubType: event.data.eventSubType,
            escordCode: event.data.escortCode, activeFlag: event.data.activeFlag,
            commentText: event.data.commentText, hiddenCommentText: event.data.hiddenCommentText
        };
        rowdata.validated = true;
        return rowdata;
    }

    nbtStatusDescWhenValidateItemTrigger() {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.offschModel
            && !this.offschModel.eventDate && !this.offschModel.startTime &&
            !this.offschModel.toAgyLocId && !this.offschModel.eventSubType) {
            return;
        }

        if (this.offswlModel.waitListStatus !== null && this.offswlModel.waitListStatus !== undefined) {
            this.objRefModel = new ReferenceCodes();
            this.objRefModel.code = this.offswlModel.waitListStatus;
            const lvParentCode = this.oidstwjuFactory.getParentCode(this.objRefModel);
            lvParentCode.subscribe(data => {
                this.parentCode = data.parentCode;
                if (this.offswlModel.waitListStatus === 'CAN'  || this.offswlModel.waitListStatus === 'CANC') {
                    this.cancelReasonFlag = false;
                } else if (this.offswlModel.waitListStatus === 'CON') {
                    if (!this.offschModel.eventDate ||
                        !this.offschModel.startTime || !this.offschModel.toAgyLocId) {
                        this.offswlModel.waitListStatus = 'PEN';
                        this.show(this.translateService.translate('oidstwju.confirmwaitingalert'), 'warn');
                    } else {
                        this.cancelReasonFlag = true;
                        this.offswlModel.outcomeReasonCode = null;
                    }
                } else if (this.offswlModel.waitListStatus === 'PEN' || this.offswlModel.waitListStatus === undefined) {
                    this.cancelReasonFlag = true;
                    this.offswlModel.outcomeReasonCode = null;
                }
                if (this.verifySaveFlag) {
                    this.display = true;
                    if (this.verifyStatusFlag) {
                    this.verifyStatusFlag = false;
                        } else {
                        this.offswlUpdateFlag = true;
                        }
                } else {
                    if (this.verifyStatusFlag) {
                        this.display = true;
                        this.verifyStatusFlag = false;
                    } else {
                        this.display = false;
                        this.offswlUpdateFlag = true;
                    }
                }
                if (this.offswlModel.eventId) {
                    this.clearFlag = true;
                } else {
                    this.clearFlag = false;
                }
                this.setEventStatus();
            });
        } else {
            this.display = true;
            this.offswlModel.waitListStatus = undefined;
            this.setEventStatus();
        }

    }

    nbtPriorityDescWhenValidateItemTrigger() {

        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.offschModel
            && !this.offschModel.eventDate && !this.offschModel.startTime &&
            !this.offschModel.toAgyLocId && !this.offschModel.eventSubType) {
            return;
        }
        if (this.offswlModel.transferPriority !== null && this.offswlModel.transferPriority !== undefined) {
            if (this.verifySaveFlag) {
                this.display = true;
                  if (this.verifyPriorityFlag) {
                    this.verifyPriorityFlag = false;
                        } else {
                        this.offswlUpdateFlag = true;
                        }
            } else {
                if (this.verifyPriorityFlag) {
                    this.display = true;
                    this.verifyPriorityFlag = false;
                } else {
                    this.display = false;
                    this.offswlUpdateFlag = true;
                }
            }
            if (this.offswlModel.eventId) {
                this.clearFlag = true;
            } else {
                this.clearFlag = false;
            }
        } else {
            this.display = true;
            this.offswlModel.transferPriority = undefined;
        }
    }

    nbtReasonDescWhenValidateItemTrigger() {
         if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.offschModel
            && !this.offschModel.eventDate && !this.offschModel.startTime &&
            !this.offschModel.toAgyLocId && !this.offschModel.eventSubType) {
            return;
        }
        if (this.offswlModel.outcomeReasonCode) {
            if (this.verifySaveFlag) {
                this.display = true;
                 if (this.verifyReasonFlag) {
                    this.verifyReasonFlag = false;
                        } else {
                        this.offswlUpdateFlag = true;
                        }
            } else {
                if (this.verifyReasonFlag) {
                    this.display = false;
                    this.verifyReasonFlag = false;
                } else {
                    this.display = false;
                    this.offswlUpdateFlag = true;
                }

            }

        } else {
            this.display = false;
        }
        if (this.offswlModel.eventId) {
            this.clearFlag = true;
        } else {
            this.clearFlag = false;
        }

    }


    getColumnDef(agyLocId: string) {
        return [
            {
                fieldName: this.translateService.translate('oidstwju.datemandatory'), field: 'eventDate', editable: true, width: 150,
                datatype: 'date', cellEditable: this.canEventDateEdit
            },
            {
                fieldName: this.translateService.translate('oidstwju.time'), field: 'startTime',
                editable: true, width: 150, datatype: 'time', required: true, cellEditable: this.canEventDateEdit
            },
            {
                fieldName: this.translateService.translate('oidstwju.facilitytitle'), field: 'toAgyLocId', width: 300, editable: true,
                datatype: 'lov', link: 'oidstwju/rgAgencyLocationRecordGroup?agyLocId=' + agyLocId,
                required: true, optionWidth: 350,
                descTitle: this.translateService.translate('oidstwju.facility'), cellEditable: this.canEventDateEdit,source:'OUMAGLOG'
            },
            {
                fieldName: this.translateService.translate('oidstwju.reason'), field: 'eventSubType', editable: true, width: 300,
                datatype: 'lov', link: 'oidstwju/rgMoveReasonRecordGroup', optionWidth: 350, cellEditable: this.activeFlagEdit,source:'OUMEMOVE'
            },
            {
                fieldName: this.translateService.translate('oidstwju.escort'), field: 'escortCode', editable: true, width: 300,
                datatype: 'lov', domain:'ESCORT'/* link: 'oidstwju/rgEscortRecordGroup'*/, optionWidth: 350, cellEditable: this.canEventDateEdit
            },
            {
                fieldName: this.translateService.translate('oidstwju.active'), field: 'activeFlag', width: 120, editable: false,
                datatype: 'checkbox' //, cellEditable: this.activeFlagEdit
            },
            {
                fieldName: this.translateService.translate('oidstwju.comment1'), field: 'commentText', width: 150,
                editable: true, datatype: 'text', uppercase: 'false', maxlength: 240, cellEditable: this.canEventDateEdit
            },
            {
                fieldName: this.translateService.translate('oidstwju.comment2'), field: 'hiddenCommentText', width: 150,
                editable: true, datatype: 'text', uppercase: 'false', maxlength: 240, cellEditable: this.canEventDateEdit
            },
        ];
    }

    ngOnDestroy() {
		this.schedularService.backBtnFlag = false;
	  }

      onBack() {
		if(this.schedularService.backBtnFlag){
			this.schedularService.backBtnFlag = false;
			this.router.navigate(['/CALSCH']);
		} 
	}
}
