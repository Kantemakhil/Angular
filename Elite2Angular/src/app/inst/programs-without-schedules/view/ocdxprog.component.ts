import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdxprogService } from '../service/ocdxprog.service';
import { OffenderPrgObligations } from '@instprogramswithoutschedulesbeans/OffenderPrgObligations';
import { OffenderProgramProfiles } from '@instprogramswithoutschedulesbeans/OffenderProgramProfiles';
import { OffenderPrgObligationsCommitBean } from '@instprogramswithoutschedulesbeans/OffenderPrgObligationsCommitBean';
import { OffenderProgramProfilesCommitBean } from '@instprogramswithoutschedulesbeans/OffenderProgramProfilesCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OcdmworkService } from '@common/workspace/service/ocdmwork.service';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Router } from '@angular/router';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { AppConstants } from '@core/classes/appConstants';

@Component({
    selector: 'app-ocdxprog',
    templateUrl: './ocdxprog.component.html'
})

export class OcdxprogComponent implements OnInit, OnDestroy {
    commentTextDbValue: any;
    @ViewChild('grid') grid: any;
    @ViewChild('offspprgrid') offspprgrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offprgobligationsCommitModel: OffenderPrgObligationsCommitBean = new OffenderPrgObligationsCommitBean();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offprgobligationsData: OffenderPrgObligations[] = [];
    offprgobligationsDataTemp: OffenderPrgObligations[] = [];
    offprgobligationsModel: OffenderPrgObligations = new OffenderPrgObligations();
    offprgobligationsIndex: number;
    offprgobligationsInsertList: OffenderPrgObligations[] = [];
    offprgobligationsUpdateList: OffenderPrgObligations[] = [];
    offprgobligationsDeleteList: OffenderPrgObligations[] = [];
    offprogramprofilesData: OffenderProgramProfiles[] = [];
    offprogramprofilesDataTemp: OffenderProgramProfiles[] = [];
    offprogramprofilesCommitModel: OffenderProgramProfilesCommitBean = new OffenderProgramProfilesCommitBean();
    offprogramprofilesModel: OffenderProgramProfiles = new OffenderProgramProfiles();
    offprogramprofilesModelTemp: OffenderProgramProfiles = new OffenderProgramProfiles();
    offprogramprofilesIndex: number;
    offprogramprofilesInsertList: OffenderProgramProfiles[] = [];
    offprogramprofilesUpdateList: OffenderProgramProfiles[] = [];
    offprogramprofilesDeleteList: OffenderProgramProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    teamQueueColumnDef: any[];
    offPrgObligationsColumnDef: any[];
    workColumnDef: any[];
    offProgramProfilesColumnDef: any[];
    memoColumnDef: any[];
    teamMembersColumnDef: any[];
    teamCtrlReadOnly: boolean;
    teamQueueReadOnly: boolean;
    assignCtrlReadOnly: boolean;
    teamMembersReadOnly: boolean;
    completeReadOnly: boolean;
    workReadOnly: boolean;
    memoReadOnly: boolean;
    butCtrlReadOnly: boolean;
    offPrgObligationsReadOnly: boolean;
    ctlOffPrgObliReadOnly: boolean;
    offProgramProfilesReadOnly: boolean;
    ctlOffPrgProReadOnly: boolean;
    rgavailabilitycodeRg: any[] = [];
    rgprogramRg: any[] = [];
    rgendreasonRg: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    tableIndex = -1;
    tableprogProfIndex = -1;
    prgObligationInsert: boolean;
    progProfileInsert: boolean;
    caseLoadId: any;
    sourceData: any;
    sourceDataDesc: any;
    prgObligationDelete: boolean;
    prgProfileDelete: boolean;
    allocDisable: boolean;
    updatePrmStatusDisabled: boolean;
    progLocationDisable: boolean;
    flag: boolean;
    commentDisabled: boolean;
    savedisabled: boolean;
    clearDisable: boolean;
    commentText: any;
    exitLaunchBtn = false;
    selectFlag: boolean;
    updateFlag: boolean;
    crsActyIdVal: any;
    statusChangePriviliges: boolean;
    constructor(private ocdxprogFactory: OcdxprogService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private ocdmworkFactory: OcdmworkService,
        private offenderSearchService: OffenderSearchService,
        private oidcnoteFactory: OidcnoteService,
        private router: Router, private dialogService: DialogService) {
        this.teamQueueColumnDef = [];
        this.offPrgObligationsColumnDef = [];
        this.workColumnDef = [];
        this.offProgramProfilesColumnDef = [];
        this.memoColumnDef = [];
        this.teamMembersColumnDef = [];
    }
    onGridReady(event) {
    }
    ngOnInit() {
        if (this.oidcnoteFactory.launchFlag || this.ocdmworkFactory.exitFlag) {
            this.exitLaunchBtn = true;
        }
        this.allocDisable = true;
        this.progLocationDisable = true;
        this.prgObligationInsert = false;
        this.progProfileInsert = false;
        this.updatePrmStatusDisabled = true;
        this.commentDisabled = true;
        this.flag = true;
        this.savedisabled = true;
        this.clearDisable = true;
        this.prgObligationDelete = true;
        this.prgProfileDelete = true;
        this.updateFlag = false;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.offPrgObligationsColumnDef = [
            {
                fieldName: this.trMsg('ocdxprog.programmandatory'), field: 'description', datatype: 'lov',
                link: 'ocdxprog/rgProgramRecordGroup', editable: true, width: 150, cellEditable: this.canProgramEdit,source:'OCMSERVI'
            },
            {
                fieldName: this.translateService.translate('ocdxprog.sentence'), field: 'sentenceDesc', width: 150,datatype : 'text'
               
            },
            {
                fieldName: '', field: 'button', datatype: 'hyperlink', displayas: 'href', dialogWidth: '80%',
                styleClass: 'launch', link: '/OCDPROGRDIALOG', editable: true, width: 100, data: 'row', updateField: 'row',
                modal: true, height: 90, onLaunchClick: this.onDialogCick
            },
            { fieldName:  this.translateService.translate('ocdxprog.unlinksentence'), field: 'flag', datatype: 'checkbox',  width: 150 , cellEditable: this.disableFlag},

            { fieldName: this.trMsg('ocdxprog.referraldate'), field: 'referralDate', editable: true, datatype: 'date', width: 150 },
            { fieldName: this.trMsg('ocdxprog.specificneeds'), field: 'specialNeedFlagTemp', datatype: 'checkbox', editable: true, width: 150 },
            { fieldName: this.trMsg('common.source'), field: 'obligationSource', editable: false, width: 150 },
            {
                fieldName: this.trMsg('ocdxprog.availability'), field: 'availabilityCode', datatype: 'lov',
               domain:'PS_PRG_AVAIL'/* link: 'ocdxprog/rgAvailabilityCodeRecordGroup'*/, editable: true, width: 150
            },
            { fieldName: this.trMsg('common.comment'), field: 'commentText', editable: true, width: 150, maxlength: 240,
             datatype: 'text', uppercase: 'false' },
             { fieldName: this.trMsg('ocdxprog.expectedcompletiondate'), field: 'endDate', editable: true, datatype: 'date', width: 150, },
            { fieldName: this.trMsg('common.status'), field: 'statusDescription', editable: false, width: 150 },
            { fieldName: '', field: 'sentenceSeq', hide: true, width: 150 },
            { fieldName:  '',field: 'courtName', editable: false,hide: true ,width: 150 },
            { fieldName: '', field: 'sentenceDesc', editable: false,hide: true ,width: 150 },
            { fieldName: '', field: 'sentenceEndDate', editable: false, width: 150,hide: true, datatype: 'date' },
            { fieldName: '', field: 'sentenceStartDate', editable: false, width: 150,hide: true, datatype: 'date' },
            { fieldName: '', field: 'orderType', hide: true },
            { fieldName: '', field: 'programId', hide: true },
        ];
        this.offProgramProfilesColumnDef = [
            { fieldName: this.trMsg('ocdxprog.providername'), field: 'providerName', editable: false, width: 150 },
            { fieldName: this.trMsg('ocdxprog.programdescription'), field: 'programDescription', editable: false, width: 150 },
            {
                fieldName: '', field: 'relocateButton', datatype: 'launchbutton', modal: true,updateField: 'row',
                editable: true, dialogWidth: 70, data: 'row', onLaunchClick: this.relocateProgram, isDisable: this.relocateButDis,
            },
            {
                fieldName: this.trMsg('ocdxprog.offenderstartdate'), field: 'offenderStartDate',
                editable: true, datatype: 'date', width: 150, cellEditable: this.canStartDateEdit
            },
            {
                fieldName: this.trMsg('ocdxprog.endallocationreason'), field: 'earlyEndReason', datatype: 'lov',
                domain:'PS_END_RSN'/*link: 'ocdxprog/rgEndReasonRecordGroup'*/, editable: true, width: 150, cellEditable: this.canProgramProfileEdit
            },
            {
                fieldName: this.trMsg('ocdxprog.enddate'), field: 'offenderEndDate', editable: true, datatype: 'date', width: 150,
                cellEditable: this.canProgramProfileEdit
            },
            {
                fieldName: '', field: 'goButton', datatype: 'launchbutton', modal: true,
                editable: true, dialogWidth: 70, link: '/OCDPNOTE', data: 'row', cellEditable: this.canProgramProfileEdit,
                isDisable: this.isDialogDisable
            },
            {
				fieldName: '', field: 'crsActyId', hide: true, width: 150
			},
            {
                fieldName:'', field: 'commentText', hide: true, width: 150, maxlength: 240,
                datatype: 'text', uppercase: 'false'
            },
        ];
        const serviceObj = this.ocdxprogFactory.currentCaseloadType(this.caseLoadId);
        serviceObj.subscribe(caseLoadId => {
            this.sourceData = caseLoadId;
            if (this.sourceData === 'INST') {
                this.sourceDataDesc = 'Institution';
            } else if (this.sourceData === 'COMM') {
                this.sourceDataDesc = 'Community';
            }
        });
        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.trMsg('common.pleasesearchforvalidoffender');
            this.show();
        }
        this.checkPrivilegeExists();
    }

    relocateProgram = (event) => {
        const data = {
            eventType: 'PWS',
            offenderBookId: this.vHeaderBlockModel.offenderBookId,
            agyLocId: this.vHeaderBlockModel.agyLocId,
            pOperation: 'ALLOCATE',
            moduleName: 'OCDXPROG',
            programId: Number(this.offprgobligationsModel.programId),
        };
        this.dialogService.openLinkDialog('ociscatadialog', data).subscribe(resData => {
            if(resData.length>0){
                resData.forEach(e=>{
                    const index=this.offprogramprofilesData.indexOf(event);
                    this.grid.setColumnData('providerName', index, e.providerName);
                    this.grid.setColumnData('programDescription', index, e.courseActivityDesc);
                    this.grid.setColumnData('crsActyId', index,e.crsActyId);
                    //this.crsActyIdVal = resData.crsActyId;
                });
            }
           
        });

    }
    onOffenderChange(offender) {
        this.offprgobligationsData = [];
        this.offprogramprofilesData = [];
        if (offender) {
            this.vHeaderBlockModel = offender;
            this.prgObligationInsert = true;
            this.progProfileInsert = false;
            if (this.vHeaderBlockModel.offenderBookId) {
                this.ocdxprogexecuteQuery();
            }
        } else {
            this.offprgobligationsData = [];
            this.offprogramprofilesData = [];
            this.offprgobligationsModel = new OffenderPrgObligations();
            this.offprogramprofilesModel = new OffenderProgramProfiles();
            this.prgObligationInsert = false;
            this.progProfileInsert = false;
            this.prgObligationDelete = true;
            this.prgProfileDelete = true;
            this.commentDisabled = true;
            this.savedisabled = true;
            this.clearDisable = true;
            this.commentText = '';
            this.updatePrmStatusDisabled = true;
            this.allocDisable = true;
            this.progLocationDisable = true;
        }
    }
    
    onRowClickoffprgobligations(event) {
        if (event && event.createUserId) {
            // this.grid.requiredOff('earlyEndReason');
            // this.grid.requiredOff('offenderEndDate');
            
            this.offprgobligationsModel = event;
            if(this.offprgobligationsModel.commentText){
            this.commentTextDbValue = JSON.parse(JSON.stringify(this.offprgobligationsModel.commentText));
            }
            this.commentText = '';
            this.commentText = this.offprgobligationsModel.commentText;
            if (this.offprgobligationsModel.commentText) {
                this.clearDisable = false;
            } else {
                this.clearDisable = true;
            }

            this.offprgobligationsModel.pCategory = 'PWS';
            this.offprgobligationsModel.pOperation = 'ALLOCATE';
            if (this.offprgobligationsModel.offenderPrgObligationId) {
                this.progProfileInsert = true;
                this.prgObligationDelete = true;
                if (!this.updateFlag) {
                    this.updatePrmStatusData();
                }
                this.offprogramprofilesModel = new OffenderProgramProfiles();
                this.offprogramprofilesModel.offenderPrgObligationId = this.offprgobligationsModel.offenderPrgObligationId;
                this.offprogramprofilesExecuteQuery();
            } else {
                this.prgObligationDelete = false;
                this.offprogramprofilesModel=new OffenderProgramProfiles();
                this.offprogramprofilesExecuteQuery();
            }
           /*  if (this.offprgobligationsModel.status === 'COMP') {
                this.updatePrmStatusDisabled = true;
            } else {
                this.updatePrmStatusDisabled = false;
            } */
            this.updatePrmStatusDisabled = false;
            
            if ((this.offprgobligationsModel.status === 'ALLOC' || this.offprgobligationsModel.status === 'REF' ||
                this.offprgobligationsModel.status === 'SUSP' || this.offprgobligationsModel.status === '121') &&
                !this.offprogramprofilesModel.offPrgrefId) {
                this.allocDisable = false;
            } else {
                this.allocDisable = true;
            }
        } else {
            this.progProfileInsert = false;
            this.updatePrmStatusDisabled = true;
            this.offprogramprofilesData = [];
           

            // this.offprogramprofilesExecuteQuery();
        }
    }
    /*  updatePrmStatus() {
         if (this.updateFlag) {
             this.type = 'warn';
             this.message = this.trMsg('ocdxprog.pleasesavechanges');
             this.show();
             return;
         }
         if (this.flag) {
             this.type = 'warn';
             this.message = this.trMsg('ocdxprog.pleaseendopenplacement');
             this.show();
             return;
         }
     } */

    updatePrmStatus = () => {
        if (!this.offprgobligationsModel.offenderPrgObligationId || this.updateFlag) {
            this.type = 'warn';
            this.message = this.trMsg('ocdxprog.pleasesavechanges');
            this.show();
            return;
        }
        /* if ((this.offprgobligationsModel.status === 'ABA' || this.offprgobligationsModel.status === 'COMP'
            || this.offprgobligationsModel.status === 'REM') && !this.statusChangePriviliges) {
            this.type = 'warn';
            this.message = this.trMsg('ocuupsta.cannotupdatestatus');
            this.show();
            return;
        } */
        if (this.flag) {
            this.type = 'warn';
            this.message = this.trMsg('ocdxprog.pleaseendopenplacement');
            this.show();
            return;
        }
        this.dialogService.openLinkDialog('/OCUUPSTA', this.offprgobligationsModel, 80).subscribe(result => {
            this.ocdxprogexecuteQuery();
        });
    }
    updatePrmStatusData() {
        const offprgobligationsSaveData =
            this.ocdxprogFactory.offProgramPrflesUpdatePrgStatus(this.offprgobligationsModel.offenderPrgObligationId,
                this.offprgobligationsModel.offenderBookId);
        offprgobligationsSaveData.subscribe(data => {
            if (data > 0) {
               // this.updatePrmStatusDisabled = true;
                this.flag = true;
            } else {
               this.updatePrmStatusDisabled = false;
                this.flag = false;
            }
        });
    }
    onButUpdPrgStclick() {
    }
    get clearBtnDisable () {
        if (this.commentText !== '' && this.commentText !== null) {
            return false;
        }
        return true;
    }
    onRowClickoffprogramprofiles(event) {
        this.offprogramprofilesModel = new OffenderProgramProfiles();
        if (event) {
            this.offprogramprofilesModel = event;
            if (event.offenderEndDate) {
                this.grid.requiredOn('earlyEndReason');
            } else {
                 this.grid.requiredOff('earlyEndReason');
            } 

            if (event.earlyEndReason) {
                this.grid.requiredOn('offenderEndDate');
            } else {
                 this.grid.requiredOff('offenderEndDate');
            } 
            if(this.offprogramprofilesModel.commentText){
                this.commentTextDbValue = JSON.parse(JSON.stringify(this.offprogramprofilesModel.commentText));
            }
            this.commentText = '';
            this.commentText = this.offprogramprofilesModel.commentText;
            this.offprogramprofilesModelTemp=event;
            if (this.offprogramprofilesModel.commentText) {
                this.clearDisable = false;
            } else {
                this.clearDisable = true;
            }
            this.savedisabled = true;
            if (!this.offprogramprofilesModel.offPrgrefId) {
                // this.progLocationDisable = true;
                this.allocDisable = false;
                this.prgProfileDelete = false;
            } else {
                this.prgProfileDelete = true;
                // this.progLocationDisable = false;
                this.allocDisable = true;
            }
            this.progLocationDisable = this.offprogramprofilesModel.placementRecord === 'Y' ? false : true;
        }
    }
    allowNumbers(event) {
    }

    onButProLocclick() {
    }
    ok() {
    }
    no() {
    }
    cancel() {
        this.commentText = '';
        if (this.offprogramprofilesModel.commentText) {
            this.savedisabled = false;
        } else {
            this.savedisabled = true;
        }
        this.clearDisable = true;
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdxprogSaveoffprgobligationsForm(event) {
        this.offprgobligationsInsertList = event.added;
        this.offprgobligationsUpdateList = event.updated;
        this.offprgobligationsDeleteList = event.removed;
        this.offprgobligationsCommitModel.insertList = [];
        this.offprgobligationsCommitModel.updateList = [];
        this.offprgobligationsCommitModel.deleteList = [];
        let warnFlag = false;
        if (this.offprgobligationsInsertList.length > 0 || this.offprgobligationsUpdateList.length > 0) {
            for (let i = 0; i < this.offprgobligationsInsertList.length; i++) {
                if (!this.offprgobligationsInsertList[i].description) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.programmustbeentered');
                    this.show();
                    return;
                }
                if (!this.offprgobligationsInsertList[i].referralDate) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.referraldatemustbeentered');
                    this.show();
                    return;
                }
                if (this.offprgobligationsInsertList[i].referralDate) {
                    if (this.vHeaderBlockModel.bookingBeginDate) {
                        const bookingDate = DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate);
                        if (DateFormat.compareDate(bookingDate,
                            DateFormat.getDate(this.offprgobligationsInsertList[i].referralDate)) === 1) {
                            this.type = 'warn';
                            this.message = this.trMsg('ocdxprog.referraldatecannotlessthanbkgdate');
                            this.show();
                            return;
                        }
                    }
                    if (DateFormat.compareDate(DateFormat.getDate(this.offprgobligationsInsertList[i].referralDate), DateFormat.getDate()) === 1) {
                        this.type = 'warn';
                        this.message = this.trMsg('ocdxprog.referraldatecannotbefuturedate');
                        this.show();
                        return;
                    }
                    
                }
                if (this.offprgobligationsInsertList[i].endDate) {
                    let expectedCompDate = DateFormat.getDate(this.offprgobligationsInsertList[i].endDate);
                    let sentEndDate = (this.offprgobligationsModel.sentenceEndDate && this.offprgobligationsModel.sentenceEndDate !== null) ? DateFormat.getDate(this.offprgobligationsModel.sentenceEndDate) : undefined;
                    let sentStartDate = (this.offprgobligationsModel.sentenceStartDate && this.offprgobligationsModel.sentenceStartDate !== null) ? DateFormat.getDate(this.offprgobligationsModel.sentenceStartDate) : undefined;
                    sentStartDate = sentStartDate ? JSON.parse(JSON.stringify(sentStartDate)) : undefined;
                    let maxDate = null;
                    if (!sentEndDate) {
                        if (sentStartDate && sentStartDate !== null) {
                            maxDate = DateFormat.getDate(sentStartDate);
                            maxDate.setFullYear(maxDate.getFullYear() + 2);
                        } else {
                            maxDate = DateFormat.getDate(this.offprgobligationsInsertList[i].referralDate);
                            maxDate.setFullYear(maxDate.getFullYear() + 2);
                        }
                    }
                    if (sentEndDate && sentEndDate !== null && (DateFormat.compareDate(DateFormat.getDate(sentEndDate), expectedCompDate) === -1)) {
                        warnFlag = true;
                        this.type = 'warn';
                        this.message = this.trMsg('ocdxprog.expectedcompletiondategreaterthanorderexpirydate');
                        this.show();
                    }
                    if (!sentEndDate) {
                        if (sentStartDate && sentStartDate != null && maxDate != null && DateFormat.compareDate(maxDate, expectedCompDate) === -1) {
                            warnFlag = true;
                            this.type = 'warn';
                            this.message = this.trMsg('ocdxprog.expectedcompletiondateismorethan2years');
                            this.show();
                        }
                    }
                    if (sentStartDate && sentStartDate != null && DateFormat.compareDate(DateFormat.getDate(sentStartDate), expectedCompDate) === 1) {
                        this.type = 'warn';
                        this.message = this.trMsg('ocdxprog.expectedcompletiondateisbeforeorderstartdate');
                        this.show();
                        return;
                    }
                    if (!sentStartDate || sentStartDate === null) {
                        if (DateFormat.compareDate(DateFormat.getDate(this.offprgobligationsInsertList[i].referralDate), expectedCompDate) === 1) {
                            this.type = 'warn';
                            this.message = this.trMsg('ocdxprog.expectedcompletiondateisbeforereferraldate');
                            this.show();
                            return;
                        }
                        if (DateFormat.compareDate(maxDate, expectedCompDate) === -1) {
                            warnFlag = true;
                            this.type = 'warn';
                            this.message = this.trMsg('ocdxprog.expectedcompletiondateismorethan2years');
                            this.show();
                        }
                    }
                }
                this.offprgobligationsInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offprgobligationsInsertList[i].specialNeedFlag = this.offprgobligationsInsertList[i].specialNeedFlagTemp ? 'Y' : undefined;
                this.offprgobligationsInsertList[i].status = 'REF';
                this.offprgobligationsInsertList[i].eventType = 'PWS';
                this.offprgobligationsInsertList[i].obligationSource = this.sourceData;
                this.offprgobligationsInsertList[i].createUserId = this.sessionManager.getId();
                this.offprgobligationsInsertList[i].createDatetime = DateFormat.getDate();
            }
            for (let i = 0; i < this.offprgobligationsUpdateList.length; i++) {
                if (!this.offprgobligationsUpdateList[i].description) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.programmustbeentered');
                    this.show();
                    return;
                }
                if (!this.offprgobligationsUpdateList[i].referralDate) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.referraldatemustbeentered');
                    this.show();
                    return;
                }
                if (this.offprgobligationsUpdateList[i].referralDate) {
                    const referralDate = DateFormat.getDate(this.offprgobligationsUpdateList[i].referralDate);
                    if (this.vHeaderBlockModel.bookingBeginDate) {
                        const bookingDate = DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate);
                        if (DateFormat.compareDate(bookingDate, referralDate) === 1) {
                            this.type = 'warn';
                            this.message = this.trMsg('ocdxprog.referraldatecannotlessthanbkgdate');
                            this.show();
                            return;
                        }
                    }
                    if (DateFormat.compareDate(referralDate, DateFormat.getDate()) === 1) {
                        this.type = 'warn';
                        this.message = this.trMsg('ocdxprog.referraldatecannotbefuturedate');
                        this.show();
                        return;
                    }
                }
                if (this.offprgobligationsUpdateList[i].endDate) {
                    let expectedCompDate = DateFormat.getDate(this.offprgobligationsUpdateList[i].endDate);
                    let sentEndDate = (this.offprgobligationsModel.sentenceEndDate && this.offprgobligationsModel.sentenceEndDate !== null) ? DateFormat.getDate(this.offprgobligationsModel.sentenceEndDate) : undefined;
                    let sentStartDate = (this.offprgobligationsModel.sentenceStartDate && this.offprgobligationsModel.sentenceStartDate !== null) ? DateFormat.getDate(this.offprgobligationsModel.sentenceStartDate) : undefined;
                    sentStartDate = sentStartDate ? JSON.parse(JSON.stringify(sentStartDate)) : undefined;
                    let maxDate = null;
                    if (!sentEndDate) {
                        if (sentStartDate && sentStartDate !== null) {
                            maxDate = DateFormat.getDate(sentStartDate);
                            maxDate.setFullYear(maxDate.getFullYear() + 2);
                        } else {
                            maxDate = DateFormat.getDate(this.offprgobligationsUpdateList[i].referralDate);
                            maxDate.setFullYear(maxDate.getFullYear() + 2);
                        }
                    }
                    if (sentEndDate && sentEndDate !== null && (DateFormat.compareDate(DateFormat.getDate(sentEndDate), expectedCompDate) === -1)) {
                        warnFlag = true;
                        this.type = 'warn';
                        this.message = this.trMsg('ocdxprog.expectedcompletiondategreaterthanorderexpirydate');
                        this.show();
                    }
                    if (!sentEndDate) {
                        if (sentStartDate && sentStartDate != null && maxDate != null && DateFormat.compareDate(maxDate, expectedCompDate) === -1) {
                            warnFlag = true;
                            this.type = 'warn';
                            this.message = this.trMsg('ocdxprog.expectedcompletiondateismorethan2years');
                            this.show();
                        }
                    }
                    if (sentStartDate && sentStartDate != null && DateFormat.compareDate(DateFormat.getDate(sentStartDate), expectedCompDate) === 1) {
                        this.type = 'warn';
                        this.message = this.trMsg('ocdxprog.expectedcompletiondateisbeforeorderstartdate');
                        this.show();
                        return;
                    }
                    if (!sentStartDate || sentStartDate === null) {
                        if (DateFormat.compareDate(DateFormat.getDate(this.offprgobligationsUpdateList[i].referralDate), expectedCompDate) === 1) {
                            this.type = 'warn';
                            this.message = this.trMsg('ocdxprog.expectedcompletiondateisbeforereferraldate');
                            this.show();
                            return;
                        }
                        if (DateFormat.compareDate(maxDate, expectedCompDate) === -1) {
                            warnFlag = true;
                            this.type = 'warn';
                            this.message = this.trMsg('ocdxprog.expectedcompletiondateismorethan2years');
                            this.show();
                        }
                    }
                }
                this.offprgobligationsUpdateList[i].modifyUserId = this.sessionManager.getId();
                this.offprgobligationsUpdateList[i].statusChangeDate = DateFormat.getDate();
                this.offprgobligationsUpdateList[i].specialNeedFlag = this.offprgobligationsUpdateList[i].specialNeedFlagTemp ? 'Y' : undefined;
            }
            this.offprgobligationsCommitModel.insertList = this.offprgobligationsInsertList;
            this.offprgobligationsCommitModel.updateList = this.offprgobligationsUpdateList;
        }
        if (this.offprgobligationsDeleteList.length > 0) {
            for (let i = 0; i < this.offprgobligationsDeleteList.length; i++) {
            }
            this.offprgobligationsCommitModel.deleteList = this.offprgobligationsDeleteList;
        }
        if (warnFlag) {
            const data = {
                label: this.translateService.translate('ocdxprog.proceedwithsaving'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                if (result) {
                    this.onSaveProgramRefrral();
                } else {
                    return;
                }
            });
        } else {
            this.onSaveProgramRefrral();
        }
    }

    onSaveProgramRefrral() {
        const offprgobligationsSaveData = this.ocdxprogFactory.offPrgObligationsCommit(this.offprgobligationsCommitModel);
        offprgobligationsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.trMsg('common.addupdateremoverecordsuccess');
                this.show();
                this.ocdxprogexecuteQuery();
                this.updateFlag = false;
                return;
            } else if (data === 2) {
                this.type = 'warn';
                this.message = this.trMsg('common.cannotdeletemasterchildrecord');
                this.show();
                this.ocdxprogexecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.trMsg('common.addupdateremoverecordfailed');
                this.show();
                this.ocdxprogexecuteQuery();
                return;
            }
        });
    }
    // execute query
    ocdxprogexecuteQuery() {
        this.offprgobligationsModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdxprogFactory.offPrgObligationsExecuteQuery(this.offprgobligationsModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offprgobligationsData = [];
                 this.updatePrmStatusDisabled=true;
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (this.sessionManager.currentCaseLoadType === AppConstants.COMMUNITY_CASELOAD) {
                        data[i].button = '..';
                    }

                    data[i].specialNeedFlagTemp = data[i].specialNeedFlag === 'Y' ? true : false;
                }

                this.offprgobligationsData = data;
                this.offprgobligationsDataTemp = JSON.parse(JSON.stringify(data));
                this.offprgobligationsModel = this.offprgobligationsData[0];
                this.tableIndex = 0;
                if (this.offprgobligationsModel.offenderPrgObligationId) {
                    this.offprogramprofilesModel = new OffenderProgramProfiles();
                    this.offprogramprofilesModel.offenderPrgObligationId = this.offprgobligationsModel.offenderPrgObligationId;
                    this.offprogramprofilesExecuteQuery();
                }
            }
        });
    }
    offprogramprofilesExecuteQuery() {
        const offprogramprofilesResult = this.ocdxprogFactory.offProgramProfilesExecuteQuery(this.offprgobligationsModel);
        offprogramprofilesResult.subscribe(offprogramprofilesResultList => {
            if (offprogramprofilesResultList.length === 0) {
                this.offprogramprofilesData = [];
                this.commentDisabled = true;
                this.commentText = '';
                this.allocDisable = true;
                this.progLocationDisable = true;
            } else {
                offprogramprofilesResultList.forEach(element => {
                    element['goButton'] = 'Go';
                    element['relocateButton'] = this.trMsg('ocdxprog.allocateprogram');
                });
                this.offprogramprofilesData = offprogramprofilesResultList;
                this.offprogramprofilesModel = offprogramprofilesResultList[0];
                this.tableprogProfIndex = 0;
                this.commentDisabled = false;
                if (this.selectFlag) {
                    this.selectFlag = false;
                    this.updatePrmStatusData();
                }
            }
        });
    }
    ocdxprogSaveoffprogramprofilesForm(event) {
        this.offprogramprofilesInsertList = event.added;
        this.offprogramprofilesUpdateList = event.updated;
        this.offprogramprofilesDeleteList = event.removed;
        this.offprogramprofilesCommitModel.insertList = [];
        this.offprogramprofilesCommitModel.updateList = [];
        this.offprogramprofilesCommitModel.deleteList = [];
        let warnFlag = false;
        if (this.offprogramprofilesInsertList.length > 0 || this.offprogramprofilesUpdateList.length > 0) {
            for (let i = 0; i < this.offprogramprofilesInsertList.length; i++) {
                if (!this.offprogramprofilesInsertList[i].programDescription) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.mustenterproectdesc');
                    this.show();
                    return;
                }
                if (!this.offprogramprofilesInsertList[i].offenderStartDate) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.offenderstartdatemustbeentered');
                    this.show();
                    return;
                }
                if (this.offprogramprofilesInsertList[i].offenderStartDate) {
                    const referralDate = DateFormat.getDate(this.offprgobligationsModel.referralDate);
                    if (DateFormat.compareDate(referralDate,
                        this.offprogramprofilesInsertList[i].offenderStartDate) === 1) {
                        this.type = 'warn';
                        this.message = this.trMsg('ocdxprog.offenderstartdatemustequalreferraldate');
                        this.show();
                        return;
                    }
                }
                this.offprogramprofilesInsertList[i].offenderPrgObligationId = this.offprgobligationsModel.offenderPrgObligationId;
                this.offprogramprofilesInsertList[i].offenderBookId = this.offprgobligationsModel.offenderBookId;
                this.offprogramprofilesInsertList[i].programId = this.offprgobligationsModel.programId;
                if (this.commentText) {
                    this.offprogramprofilesInsertList[i].commentText = this.commentText;
                }
                //this.offprogramprofilesInsertList[i].crsActyId = this.crsActyIdVal;
                //this.crsActyIdVal = '';
                this.offprogramprofilesInsertList[i].createUserId = this.sessionManager.getId();
                this.offprogramprofilesInsertList[i].createDatetime = DateFormat.getDate();
                if (this.offprogramprofilesInsertList[i].offenderEndDate) {
                    this.offprogramprofilesInsertList[i].offenderProgramStatus = 'END';
                } else {
                    this.offprogramprofilesInsertList[i].offenderProgramStatus = 'ALLOC';
                }
                this.offprogramprofilesInsertList[i].suspendedFlag = 'N';
                this.offprogramprofilesInsertList[i].holidayFlag = 'Y';
                this.offprogramprofilesInsertList[i].profileClass = 'PRG';
                this.offprogramprofilesInsertList[i].neededFlag = 'Y';
                this.offprogramprofilesCommitModel.insertList = this.offprogramprofilesInsertList;
            }
            for (let i = 0; i < this.offprogramprofilesUpdateList.length; i++) {
                const referralDate = DateFormat.getDate(this.offprgobligationsModel.referralDate);
                const referralStartDateDate = DateFormat.getDate(this.offprogramprofilesModel.offenderStartDate);
                const referralEndDate = DateFormat.getDate(this.offprogramprofilesUpdateList[i].offenderEndDate);
                if (this.offprogramprofilesUpdateList[i].offenderEndDate && !this.offprogramprofilesUpdateList[i].earlyEndReason) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.pleaseenterendallocationreason');
                    this.show();
                    return;
                }
                if (this.offprogramprofilesUpdateList[i].earlyEndReason && !this.offprogramprofilesUpdateList[i].offenderEndDate) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.pleaseenterenddate');
                    this.show();
                    return;
                }
                if (this.offprogramprofilesUpdateList[i].offenderEndDate) {
                    if (DateFormat.compareDate(referralDate, referralEndDate) === 1) {
                        this.type = 'warn';
                        this.message = this.trMsg('ocdxprog.enddatemustbegreaterthanreferreddate');
                        this.show();
                        return;
                    }
                    if (DateFormat.compareDate(referralStartDateDate, referralEndDate) === 1) {
                        this.type = 'warn';
                        this.message = this.trMsg('ocdxprog.enddateisgreaterthanoffenderstartdate');
                        this.show();
                        return;
                    }
                    if (this.offprogramprofilesUpdateList[i].earlyEndReason) {
                        this.offprogramprofilesUpdateList[i].offenderProgramStatus = 'END';
                    }
                }
                this.offprogramprofilesCommitModel.updateList = this.offprogramprofilesUpdateList;
            }
        }
        if (this.offprogramprofilesDeleteList.length > 0) {
            for (let i = 0; i < this.offprogramprofilesDeleteList.length; i++) {
            }
            this.offprogramprofilesCommitModel.deleteList = this.offprogramprofilesDeleteList;
        }
        if (warnFlag) {
            const data = {
                label: this.translateService.translate('ocdxprog.proceedwithsaving'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                if (result) {
                    this.onSave();
                } else {
                    return;
                }
            });
        } else {
            this.onSave();
        }
    }

    onSave() {
        const offprogramprofilesSaveData = this.ocdxprogFactory.offProgramProfilesCommit(this.offprogramprofilesCommitModel);
        offprogramprofilesSaveData.subscribe(data => {
            if (data === 1) {
                this.selectFlag = true;
                this.type = 'success';
                this.message = this.trMsg('common.addupdateremoverecordsuccess');
                this.show();
                this.ocdxprogexecuteQuery();
                this.offprogramprofilesExecuteQuery();
                return;
            } else if (data === 2) {
                this.type = 'warn';
                this.message = this.trMsg('ocdxprog.sameprojectcodealreadyallocated');
                this.show();
                return;
            } else if (data === 3) {
                this.type = 'warn';
                this.message = this.trMsg('ocdxprog.sameprojectcodealreadyallocateddot');
                this.show();
                return;
            } else {
                this.type = 'warn';
                this.message = this.trMsg('common.addupdateremoverecordfailed');
                this.show();
                this.offprogramprofilesExecuteQuery();
                return;
            }
        });
    }
    onButSave() {
        this.offprogramprofilesUpdateList = [];
        this.offprogramprofilesCommitModel.insertList = [];
        this.offprogramprofilesCommitModel.updateList = [];
        this.offprogramprofilesModel.commentText = this.commentText;
        this.offprogramprofilesUpdateList.push(this.offprogramprofilesModel);
        this.offprogramprofilesCommitModel.updateList = this.offprogramprofilesUpdateList;
        if (!this.savedisabled) {
            const offprogramprofilesSaveData = this.ocdxprogFactory.offProgramProfilesCommit(this.offprogramprofilesCommitModel);
            offprogramprofilesSaveData.subscribe(data => {
                if (data > 0) {
                    this.savedisabled = true;
                    this.selectFlag = true;
                    this.type = 'success';
                    this.message = this.trMsg('common.addupdateremoverecordsuccess');
                    this.show();
                    this.offprogramprofilesExecuteQuery();
                    return;
                }
            });
        }
    }
    onGridDelete = () => {
        if (this.offprogramprofilesModel.offPrgrefId) {
            this.type = 'warn';
            this.message = this.trMsg('common.cannotdeletemaster');
            this.show();
            return;
        }
        return true;
    }
    programProfileDelete = () => {
        this.type = 'warn';
        this.message = this.trMsg('common.youcannotdeletethisrecord');
        this.show();
        return;
    } 
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onGridInsert = () => {
        this.offprogramprofilesData=[];
        this.progProfileInsert = false;
        this.updatePrmStatusDisabled = true;
    
        /*for (let i = 0; i < this.offprgobligationsData.length; i++) {
           if (!this.offprgobligationsData[i].description) {
                this.type = 'warn';
                this.message = this.trMsg('ocdxprog.programmustbeentered');
                this.show();
                return;
            }
            if (!this.offprgobligationsData[i].referralDate) {
                this.type = 'warn';
                this.message = this.trMsg('ocdxprog.referraldatemustbeentered');
                this.show();
                return;
            }
        }*/
        if (this.sessionManager.currentCaseLoadType === AppConstants.COMMUNITY_CASELOAD) {
            return { obligationSource: this.sourceDataDesc, referralDate: DateFormat.getDate(), statusDescription: 'Referred', button: '...' };
        }
        return { obligationSource: this.sourceDataDesc, referralDate: DateFormat.getDate(), statusDescription: 'Referred' };
    }
    offProgramProfilesInsert = () => {
        for (let i = 0; i < this.offprogramprofilesData.length; i++) {
            if (!this.offprogramprofilesData[i].programDescription) {
                this.type =  'warn';
                this.message = this.trMsg('ocdxprog.mustenterproectdesc');
                this.show();
                return;
            }
            if (!this.offprogramprofilesData[i].offenderStartDate) {
                this.type = 'warn';
                this.message = this.trMsg('ocdxprog.offenderstartdatemustbeentered');
                this.show();
                return;
            }
        }
       
        this.progLocationDisable = true;
        
       this.offprogramprofilesModel=new OffenderProgramProfiles();
       this.offprogramprofilesModel.commentText=undefined;
       
       
        return { goButton: 'Go',providerName: undefined, programDescription: undefined , relocateButton:this.trMsg('ocdxprog.allocateprogram') };
    }
    onAssigndialogClosed(event) {
        if (event) {
            this.grid.setColumnData('providerName', this.offprogramprofilesData.length - 1, event.providerName);
            this.grid.setColumnData('programDescription', this.offprogramprofilesData.length - 1, event.programDescription);
            this.crsActyIdVal = event.crsActyId;
        }

    }
    setDescription(event) {
        this.ocdxprogexecuteQuery();
    }
    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.data.referralDate) {
            const referralDate = DateFormat.getDate(event.data.referralDate);
            if (this.vHeaderBlockModel.bookingBeginDate) {
                const bookingDate = DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate);
                if (DateFormat.compareDate(bookingDate, referralDate) === 1) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.referraldatecannotlessthanbkgdate');
                    this.show();
                    return rowdata;
                }
            }
            if (DateFormat.compareDate(referralDate, DateFormat.getDate()) === 1) {
                this.type = 'warn';
                this.message = this.trMsg('ocdxprog.referraldatecannotbefuturedate');
                this.show();
                return rowdata;
            }
        }
        this.updateFlag = true;
        return rowdata;
    }
    validateProgramProfilesRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        /* if (event.data.offenderStartDate) {
            const referralDate = DateFormat.getDate(this.offprgobligationsModel.referralDate);
            const offenderStartDate = DateFormat.getDate(event.data.offenderStartDate);
            if (DateFormat.compareDate(referralDate, offenderStartDate) === 1) {
                this.type = 'warn';
                this.message = this.trMsg('ocdxprog.offenderstartdatemustequalreferraldate');
                this.show();
                return rowdata;
            }
        } 
         if(event){
            if(event.field =='offenderEndDate')
            {
                if(event.data.offenderEndDate){

                    this.grid.requiredOn('earlyEndReason')
                }
              else {
           } 
        }*/
        // if (event.data.offenderEndDate) {
        // }
        // else{

        // }
        if (event.field === 'offenderEndDate' && !event.data.offenderEndDate && event.data.earlyEndReason) {
            this.grid.setColumnData('earlyEndReason', rowIndex, undefined);
            rowdata.validated = true;
			return rowdata;

        }
        if (event.field === 'earlyEndReason') {
            if (event.data.earlyEndReason) {
               this.grid.requiredOn('offenderEndDate');
               rowdata.validated = true;
               return rowdata;
           } else {
               this.grid.requiredOff('offenderEndDate');
               rowdata.validated = true;
               return rowdata;
           } 
       }

       if (event.field === 'offenderEndDate') {
        if (event.data.offenderEndDate) {
           this.grid.requiredOn('earlyEndReason');
           rowdata.validated = true;
           return rowdata;
       } else {
           this.grid.requiredOff('earlyEndReason');
           rowdata.validated = true;
           return rowdata;
       } 
   }
        if (event.data.offenderEndDate) {
            const referralDate = DateFormat.getDate(this.offprgobligationsModel.referralDate);
            const offenderStartDate = DateFormat.getDate(event.data.offenderStartDate);
            const referralEndDate = DateFormat.getDate(event.data.offenderEndDate);
            if (DateFormat.compareDate(offenderStartDate, referralEndDate) === 1) {
                this.type = 'warn';
                this.message = this.trMsg('ocdxprog.enddatemustbegreaterthanstartdate');
                this.show();
                return rowdata;
            }
            if (DateFormat.compareDate(referralDate, referralEndDate) === 1) {
                this.type = 'warn';
                this.message = this.trMsg('ocdxprog.enddatemustbegreaterthanreferreddate');
                this.show();
                return rowdata;
            }
        }

        

        if(event){
            if(event.field =='commentText'){

                if(event.data.commentText){
                    this.grid.setColumnData('commentText', rowIndex, event.data.commentText);
                    rowdata.validated = true;
			        return rowdata;
                }
            }
        }
        return rowdata;
    }
    canProgramProfileEdit = (data: any, index: number, field: string): boolean => {
        if (data.offPrgrefId) {
            return true;
        } else {
            return false;
        }
    }
    canStartDateEdit = (data: any, index: number, field: string): boolean => {
        if (!data.offPrgrefId) {
            return true;
        } else {
            return false;
        }
    }

    canProgramEdit = (data: any, index: number, field: string): boolean => {
        if (!(data.statusDescription && (data.statusDescription === 'Allocated' || data.statusDescription === 'Completed'))) {
            return true;
        } else {
            return false;
        }
    }
    relocateButDis = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    isInsertable() {
        if (this.offprogramprofilesModel.commentText) {

            this.savedisabled = false;
            this.clearDisable = false;
        } else {
            this.savedisabled = false;
            this.clearDisable = false;

        }
    }
    onExitBtnClick = () => {
        if (this.ocdmworkFactory.exitFlag) {
            this.ocdmworkFactory.exitFlag = false;
            this.router.navigate(['/OCDMWORK']);
        } else if (this.oidcnoteFactory.launchFlag) {
            this.oidcnoteFactory.launchFlag = false;
            this.router.navigate(['/OIDCNOTE']);
        }
        return true;
    }
    ngOnDestroy(): void {
        this.ocdmworkFactory.exitFlag = false;
        this.oidcnoteFactory.launchFlag = false;
    }
    onGridClear = () => {
        this.updateFlag = false;
        return true;
    }

    onPrgrmProfileGridClear = () => {
        if (this.offprogramprofilesData.length <= 1) {
            this.allocDisable = true;
        }
        this.grid.requiredOff('earlyEndReason');
        this.grid.requiredOff('offenderEndDate');

        

        this.offprogramprofilesExecuteQuery()
        return true;
    }

    isDialogDisable(data) {
        return !data.offPrgrefId;
    }

    onPrgrmLocationClick = () => {
        if (!this.offprogramprofilesModel.crsActyId) {
            return;
        }
        this.dialogService.openLinkDialog('/OIUVLCTE', this.offprogramprofilesModel, 80).subscribe(result => {
        });
    }

    checkPrivilegeExists() {
        const offprgobligationsSaveData = this.ocdxprogFactory.checkPrivilegeExists();
        offprgobligationsSaveData.subscribe(data => {
            if (data > 0) {
                this.statusChangePriviliges = true;
            } else {
                this.statusChangePriviliges = false;
                this.updatePrmStatusDisabled = true;
            }
        });
    }
    onDialogCick = (event) => {
        const index = this.offprgobligationsData.indexOf(event);
        const dialogData = { offenderBookId : this.vHeaderBlockModel.offenderBookId};
        if (event.obligationSource === 'Community') {
            this.dialogService.openLinkDialog('/OCDPROGRDIALOG', dialogData, 50).subscribe(result => {
                if (result) {
                    this.offspprgrid.setColumnData('sentenceDesc', index, result.sentenceDesc);
                    this.offspprgrid.setColumnData('referralDate', index, DateFormat.getDate(result.referralDate));
                    this.offspprgrid.setColumnData('sentenceSeq', index, result.sentenceSeq);
                    this.offspprgrid.setColumnData('courtName', index, result.courtName);
                    if (result.sentenceEndDate && result.sentenceEndDate !== null) {
                        this.offspprgrid.setColumnData('sentenceEndDate', index, DateFormat.getDate(result.sentenceEndDate));
                    }
                    this.offspprgrid.setColumnData('sentenceStartDate', index, result.referralDate);
                    this.offspprgrid.setColumnData('orderType', index, result.orderType);
                    // this.progGrid.setColumnData('sentenceSeq', index, resudlt.sentenceSeq);
                    // event.sentenceSeq = result.sentenceSeq;
                } else {

                }
            });
       }
    }

    validateRowD = (event) => {
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        const rowIndex = event.rowIndex;
        if (event.field === 'flag') {
            if (event && event.data.flag) {
                this.offspprgrid.setColumnData('sentenceDesc', rowIndex,undefined);
            
                this.offspprgrid.setColumnData('sentenceSeq', rowIndex,undefined);


                rowdata.validated = true;
                return rowdata;
            } else {
                this.offspprgrid.setColumnData('sentenceDesc', rowIndex, this.offprgobligationsDataTemp[rowIndex].sentenceDesc)
                this.offspprgrid.setColumnData('sentenceSeq', rowIndex, this.offprgobligationsDataTemp[rowIndex].sentenceSeq);
            }

        }
        if (event.field === 'endDate') {
            if (this.offprgobligationsModel.endDate) {
                let expectedCompDate = DateFormat.getDate(this.offprgobligationsModel.endDate);
                let sentEndDate = (this.offprgobligationsModel.sentenceEndDate && this.offprgobligationsModel.sentenceEndDate !== null) ? DateFormat.getDate(this.offprgobligationsModel.sentenceEndDate) : undefined;
                let sentStartDate = (this.offprgobligationsModel.sentenceStartDate && this.offprgobligationsModel.sentenceStartDate !== null) ? DateFormat.getDate(this.offprgobligationsModel.sentenceStartDate) : undefined;
                sentStartDate = sentStartDate ? JSON.parse(JSON.stringify(sentStartDate)) : undefined;
                let maxDate = null;
                if (!sentEndDate) {
                    if (sentStartDate && sentStartDate !== null) {
                        maxDate = DateFormat.getDate(sentStartDate);
                        maxDate.setFullYear(maxDate.getFullYear() + 2);
                    } else {
                        maxDate = DateFormat.getDate(this.offprgobligationsModel.referralDate);
                        maxDate.setFullYear(maxDate.getFullYear() + 2);
                    }
                }
                if (sentEndDate && sentEndDate !== null && (DateFormat.compareDate(DateFormat.getDate(sentEndDate), expectedCompDate) === -1)) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.expectedcompletiondategreaterthanorderexpirydate');
                    this.show();
                    return rowdata;
                }
                if (!sentEndDate && sentStartDate && sentStartDate != null && maxDate != null && DateFormat.compareDate(maxDate, expectedCompDate) === -1) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.expectedcompletiondateismorethan2years');
                    this.show();
                    return rowdata;
                }
                if (sentStartDate && sentStartDate != null && DateFormat.compareDate(DateFormat.getDate(sentStartDate), expectedCompDate) === 1) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdxprog.expectedcompletiondateisbeforeorderstartdate');
                    this.show();
                    return rowdata;
                }
              //  if (!sentStartDate || sentStartDate === null) {
                    // if (DateFormat.compareDate(DateFormat.getDate(this.offprgobligationsModel.referralDate), expectedCompDate) === 1) {
                    //     this.type = 'warn';
                    //     this.message = this.trMsg('ocdxprog.expectedcompletiondateisbeforereferraldate');
                    //     this.show();
                    //     return rowdata;
                    // }
                    // if (DateFormat.compareDate(maxDate, expectedCompDate) === -1) {
                    //     this.type = 'warn';
                    //     this.message = this.trMsg('ocdxprog.expectedcompletiondateismorethan2years');
                    //     this.show();
                    //     return rowdata;
                    // }
                //}
            }
        }
        return rowdata;
    }
   
      disableFlag = (data: any, index: number, field: string): boolean => {
        if (data.sentenceDesc && data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    insertable(event) {
		const index = this.offprogramprofilesData.indexOf(this.offprogramprofilesModelTemp);
		this.offprogramprofilesModelTemp.commentText = event;
		this.grid.setColumnData('commentText', index, event.commentText);
	}
}
