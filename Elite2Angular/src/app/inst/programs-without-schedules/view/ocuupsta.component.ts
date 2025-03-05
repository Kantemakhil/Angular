import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuupstaService } from '../service/ocuupsta.service';
import { OffenderPrgObligationHty } from '@instprogramswithoutschedulesbeans/OffenderPrgObligationHty';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ReferenceDomains } from '@common/beans/ReferenceDomains';
import { ReferenceCodes } from '@common/beans/ReferenceCodes';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ocuupsta',
    templateUrl: './ocuupsta.component.html'
})

export class OcuupstaComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offprgoblhtyData: OffenderPrgObligationHty[] = [];
    offprgoblhtyDataTemp: OffenderPrgObligationHty[] = [];
    offprgoblhtyModel: OffenderPrgObligationHty = new OffenderPrgObligationHty();
    updctrlModel: OffenderPrgObligationHty = new OffenderPrgObligationHty();
    offprgoblhtyIndex: number;
    offprgoblhtyInsertList: OffenderPrgObligationHty[] = [];
    offprgoblhtyUpdatetList: OffenderPrgObligationHty[] = [];
    offprgoblhtyDeleteList: OffenderPrgObligationHty[] = [];
    refferalDate: Date;
    lDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    disableStatusReason: boolean;
    vOffAuthVisColumnDef: any[];
    offCaseNrColumnDef: any[];
    teamsColumnDef: any[];
    offPrgObligationsColumnDef: any[];
    perIdentColumnDef: any[];
    offProgramProfilesColumnDef: any[];
    profilesColumnDef: any[];
    perEmpColumnDef: any[];
    offenderCaseNotesColumnDef: any[];
    offPrgOblHtyColumnDef: any[];
    perAddrColumnDef: any[];
    offCntPerColumnDef: any[];
    contactsColumnDef: any[];
    offCntPerReadOnly: boolean;
    perAddrReadOnly: boolean;
    perIdentReadOnly: boolean;
    perInfoReadOnly: boolean;
    perEmpReadOnly: boolean;
    ctlOffCaseNotesReadOnly: boolean;
    offenderCaseNotesReadOnly: boolean;
    ctlBlockReadOnly: boolean;
    offPrgObligationsReadOnly: boolean;
    ctlOffPrgObliReadOnly: boolean;
    offProgramProfilesReadOnly: boolean;
    ctlOffPrgProReadOnly: boolean;
    vOffAuthVisReadOnly: boolean;
    contactsReadOnly: boolean;
    offCaseNoteReadOnly: boolean;
    amendNoteReadOnly: boolean;
    personsReadOnly: boolean;
    offCaseNrReadOnly: boolean;
    profilesReadOnly: boolean;
    srchCtrlReadOnly: boolean;
    teamsReadOnly: boolean;
    butCtrlReadOnly: boolean;
    updCtrlReadOnly: boolean;
    offPrgOblHtyReadOnly: boolean;
    rgpsprgstatRg: any[] = [];
    rgpsprgobstsRg: any[] = [];
    statusLink: string;
    lovDomain: string;
    parentCode: string;
    statusReasonDescLink: string;
    status: string;
    statusReasonDesc: boolean;
    caseloadType: string;
    statusReason: string;
    selected = -1;
    msglist: any[];
    message: any;
    type: any;

    clearDisabled: boolean;
    statusDsbl: boolean;
    dateDsble : boolean;
    commentDsbl :boolean;
    flag: boolean;
    accessFlag: boolean;
    code: String;
    roleCode: string;
    commonDsbl: boolean;
    popupMsg: string;
    refDomainsModel: ReferenceDomains = new ReferenceDomains();
    refCodesList: ReferenceCodes[] = [];

    constructor(private ocuupstaFactory: OcuupstaService, public dialogService: DialogService,
        private sessionManager: UserSessionManager, public translateService: TranslateService,public router: Router) {
        this.vOffAuthVisColumnDef = [];
        this.offCaseNrColumnDef = [];
        this.teamsColumnDef = [];
        this.offPrgObligationsColumnDef = [];
        this.perIdentColumnDef = [];
        this.offProgramProfilesColumnDef = [];
        this.profilesColumnDef = [];
        this.perEmpColumnDef = [];
        this.offenderCaseNotesColumnDef = [];
        this.offPrgOblHtyColumnDef = [];
        this.perAddrColumnDef = [];
        this.offCntPerColumnDef = [];
        this.contactsColumnDef = [];
    }
    ngOnInit() {
        if(this.router.url.replace("/", "") == 'OCDXPROG'){
            this.updateStatusBtn();
        }
        else{
            this.commonDsbl = false;
        }
        
        this.selected = -1;
        this.caseloadType = this.sessionManager.currentCaseLoadType;
        this.updctrlModel.statusDate = DateFormat.getDate();
        this.offprgoblhtyExecuteQuery();
        this.getReferenceCodes();
        this.statusReasonDesc = false;
        this.disableStatusReason = true;
        this.clearDisabled = true;
        this.lovDomain = 'PS_PRG_STAT';
        this.statusLink = 'ocuupsta/rgPsPrgStatRecordGroup?statusDesc=' + this.dialog.data.status + '&lovDomain=' + this.lovDomain;
        this.offPrgOblHtyColumnDef = [
            { fieldName: this.translateService.translate('ocuupsta.status'), field: 'statusDesc', editable: false, width: 120 },
            {fieldName: this.translateService.translate('ocuupsta.date'), field: 'statusChangeDate',editable: false, datatype: 'date', width: 120},
            { fieldName: this.translateService.translate('ocuupsta.reason'), field: 'statusChangeReasonDesc', editable: false, width: 350 },
            { fieldName: this.translateService.translate('ocuupsta.comment'), field: 'commentText', editable: false, width: 240},
            { fieldName: this.translateService.translate('ocuupsta.user'), field: 'createUserId', editable: false, width: 240},
        ];
        this.getMaxDate();
    }
    getRefferalDate() {
        this.offprgoblhtyModel.offenderPrgObligationId = this.dialog.data.offenderPrgObligationId;
        const refferalDateserviceObj = this.ocuupstaFactory.getRefferalDate(this.offprgoblhtyModel.offenderPrgObligationId);
        refferalDateserviceObj.subscribe(data => {
            this.refferalDate = data;
        });
    }
    statusReasonDescChange(event) {
        this.isInsertable();
        if (event) {
           this.status = event.code;
           this.statusReason=undefined;
           this.reasonForSuspendingOrEndingProgramDisable();
            /* if (this.status === 'ABA') {
                if (this.caseloadType === 'COMM') {
                    this.parentCode = 'CA';
                } else {
                    this.parentCode = 'IA';
                }
                this.statusReasonDesc = true;
            } else if (this.status === 'END') {
                this.statusReasonDesc = true;
            } else if (this.status === 'SUSP') {
                if (this.caseloadType === 'COMM') {
                    this.parentCode = 'CS';
                } else {
                    this.parentCode = 'IS';
                }
                this.statusReasonDesc = true;

            } else {
                this.parentCode = this.status;
                this.statusReasonDesc = false;
            }
            if (this.dialog.data.eventType === 'WR' && this.caseloadType === 'INST') {
                this.parentCode = 'WR';
            }
            this.statusReasonDescLink = 'ocuupsta/rgPsPrgObstsRecordGroup?parentCode=' + this.parentCode;
            this.getStatusReasonLovData();*/
        }
    }
    reasonForSuspendingOrEndingProgramDisable(){
        const offprgoblhtyResult = this.ocuupstaFactory.reasonForSuspendingOrEndingProgramDisable(this.status);
        offprgoblhtyResult.subscribe(data=>{
            if(data){
                this.statusReasonDesc = true;
                this.disableStatusReason = false;
            }else{
                this.statusReasonDesc = false;
                this.statusReason=undefined;
                this.disableStatusReason = true;
            }
        });
    }
    getStatusReasonLovData() {
        const offprgoblhtyResult = this.ocuupstaFactory.rgPsPrgObstsRecordGroup(this.parentCode);
        offprgoblhtyResult.subscribe(data => {
            if(data && data.length>0) {
                this.disableStatusReason = false;
            } else {
                this.disableStatusReason = true;
            }
        });
    }
    getstatusReason(event) {
        if (event) {
            this.statusReason = event.code;
        }
        this.isInsertable();

    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    showOne() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    clear() {
        this.updctrlModel = new OffenderPrgObligationHty();
        this.updctrlModel.statusDate = DateFormat.getDate();
        this.statusReason = undefined;
        this.clearDisabled = true;
    }

    isInsertable() {
        if (this.updctrlModel.statusDesc || this.statusReason) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }

    cancel() {
        this.dialog.close(null);
    }
    onOffenderChange(offender) {
    }
    offprgoblhtyExecuteQuery() {
        this.offprgoblhtyModel.offenderPrgObligationId = this.dialog.data.offenderPrgObligationId;
        const offprgoblhtyResult = this.ocuupstaFactory.offPrgOblHtyExecuteQuery(this.offprgoblhtyModel);
        offprgoblhtyResult.subscribe(data => {
            if (data.length === 0) {
                this.offprgoblhtyData = [];
                this.clearDisabled = true;
            } else {
                this.clearDisabled = false;
                this.offprgoblhtyData = data;
                this.offprgoblhtyModel = data[0];
                this.selected = 0;
            }
        });
    }
    getMaxDate() {
        if (this.dialog.data.offenderPrgObligationId) {
            this.offprgoblhtyModel.offenderPrgObligationId = this.dialog.data.offenderPrgObligationId;
            const refferalDateserviceObj = this.ocuupstaFactory.getMaxDate(this.offprgoblhtyModel.offenderPrgObligationId);
            refferalDateserviceObj.subscribe(data => {
                if (data && typeof data === 'string') {
                    this.lDate = DateFormat.getDate(data);
                } else {
                    this.lDate = undefined;
                }

            });
        }
    }
    ocuperprSaveprofilesForm(statusDate?) {
        if (this.statusReasonDesc && (!this.statusReason || this.statusReason.trim() === '')) {
            this.show(this.translateService.translate('ocuupsta.reasonforsuspendorendprogrammustbeenter'), 'warn');
            return;
        }

        if (String(statusDate.lastValue).indexOf('_') >= 0 && statusDate.value === null) {
            this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
            return;
        }
        if (String(statusDate.lastValue).trim() === '' && statusDate.value === null) {
            this.show(this.translateService.translate('ocuupsta.datemustbe'), 'warn');
            return;
        }
        this.offprgoblhtyModel.offenderPrgObligationId = this.dialog.data.offenderPrgObligationId;
        this.offprgoblhtyModel.status = this.status;
        this.offprgoblhtyModel.statusChangeDate = this.updctrlModel.statusDate;
        this.offprgoblhtyModel.statusChangeReason = this.statusReason;
        this.offprgoblhtyModel.commentText=this.updctrlModel.commentText;
        if (!this.updctrlModel.statusDesc) {
            this.show(this.translateService.translate('ocuupsta.statusmustbe'), 'warn');
            return;
        }
        if (this.updctrlModel.statusDesc && this.updctrlModel.statusDesc === this.dialog.data.status) {
            this.show(this.translateService.translate('ocuupsta.pleaseselectnewstatus'), 'warn');
            return;
        }
        if (this.updctrlModel.statusDate && this.lDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.updctrlModel.statusDate),
                DateFormat.getDate(this.lDate)) === -1) {
                this.show(this.translateService.translate('ocuupsta.stausdate'), 'warn');
                return;
            }
        }

        if (this.dialog.data.eventType === 'WR') {
            this.getRefferalDate();
            if (this.refferalDate) {
                if (DateFormat.compareDate(DateFormat.getDate(this.updctrlModel.statusDate),
                    DateFormat.getDate(this.refferalDate)) === 1) {
                    this.show(this.translateService.translate('ocuupsta.refferaldate'), 'warn');
                    return;
                }
            }
        }
        if(this.dialog.data.pQueryOnly === 'Y'){
            this.show(this.translateService.translate('Update not permitted as Allocated Assignment records exist.'), 'warn');
            return;
        }
        let warnFlag = false;
        this.refCodesList.forEach(ele => {
            if (ele.code === this.status && !ele.updateFlag) {
                warnFlag = true;
                return;
            }
        });
        if (warnFlag && this.dialog.data.statusDescription != this.updctrlModel.statusDesc) {
            const data = {
                label: this.translateService.translate('ocuupsta.warnflag'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                if (result) {
                    this. onSave();
                } else {
                    return;
                }
            });
        } else if (this.dialog.data.statusDescription != this.updctrlModel.statusDesc) {
            this.onSave();
        }
    }

    onSave() {
        const serviceObj = this.ocuupstaFactory.updateStatus(this.offprgoblhtyModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.show(this.translateService.translate('Status change has been saved and committed.'), 'warn');

            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.dialog.close(null);
            }

        });
    }
    onStatusBlur() {
        if (!this.updctrlModel.statusDesc) {
            this.updctrlModel.statusDesc = this.updctrlModel.statusDesc === '' ? undefined : '';
        }
    }

    onStatusReasonBlur() {
        if (!this.statusReason) {
            this.statusReason = this.statusReason === '' ? undefined : '';
        }
    }

    updateStatusBtn() {
        this.code=this.dialog.data.statusDescription;
        const obj = this.ocuupstaFactory.updateStatusBtn(this.code);
        obj.subscribe(bo => {
            if (bo) {
                this.commonDsbl=false;
            } else {
                this.flag = true;
                this.adminstratorAcsess();
            }
        });
    }

    adminstratorAcsess(){
        const obj = this.ocuupstaFactory.getAdministratorUserAccsess();
        obj.subscribe(bo => {
            if(bo){
                this.accessFlag=true;
            }else{
                this.accessFlag=false;
            }
            this.enableDisableFun();
        });
    }

    enableDisableFun() {
        if (this.flag && this.accessFlag) {
            this.commonDsbl = false;
        } else if (this.flag) {
            this.commonDsbl = true;
        } else {
            this.commonDsbl = false;
        }
    }

    getReferenceCodes() {
        this.refDomainsModel.domain = 'PS_PRG_STAT';
        this.ocuupstaFactory.refCodeExecuteQuery(this.refDomainsModel).subscribe(refCodeData => {
            if (refCodeData && refCodeData.length === 0) {
                this.refCodesList = [];
            } else {
                refCodeData.forEach(refCode => {
                    refCode.updateFlag = (refCode.updateFlag === 'Y') ? true : false;
                    refCode.activeFlag = (refCode.activeFlag === 'Y') ? true : false;
                    refCode.updateReasonFlag = (refCode.updateReasonFlag === 'Y') ? true : false;
                });
                this.refCodesList = refCodeData;
            }
        });
    }
}



