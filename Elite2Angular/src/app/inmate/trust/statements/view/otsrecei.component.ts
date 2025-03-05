import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtsreceiService } from '../service/otsrecei.service';
import { OmsRequests } from '@inmatetrustaccountsbeans/OmsRequests';
import { OmsRequestsCommitBean } from '@inmatetrustaccountsbeans/OmsRequestsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadDeductionProfiles } from '@inmate/trust/checks/beans/CaseloadDeductionProfiles';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
    selector: 'app-otsrecei',
    templateUrl: './otsrecei.component.html'
})

export class OtsreceiComponent implements OnInit {
    isLoading: boolean;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    omsreqData: OmsRequests[] = [];
    omsreqDataTemp: OmsRequests[] = [];
    omsreqModel: OmsRequests = new OmsRequests();
    omsreqIndex = 0;
    omsreqInsertList: OmsRequests[] = [];
    omsreqUpdateList: OmsRequests[] = [];
    omsreqDeleteList: OmsRequests[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    glTxnReadOnly = false;
    glTxn1ReadOnly = false;
    sysPflReadOnly = false;
    offTxnReadOnly = false;
    offBncReadOnly = false;
    offOblHtyReadOnly = false;
    benTxnReadOnly = false;
    vBcBenReadOnly = false;
    cg$ctrlReadOnly = false;
    csldAlReadOnly = false;
    vOffBkgReadOnly = false;
    livUnitReadOnly = false;
    securityThreatGroupsReadOnly = false;
    cmAcCodeReadOnly = false;
    ctrlBlockReadOnly = false;
    reconsBlockReadOnly = false;
    statusBlockReadOnly = false;
    reconTxnReadOnly = false;
    bcrTmpReadOnly = false;
    glTxn2ReadOnly = false;
    glTxn3ReadOnly = false;
    bankRcReadOnly = false;
    offTracReadOnly = false;
    offDedReadOnly = false;
    offDrReadOnly = false;
    offTaReadOnly = false;
    csldTtReadOnly = false;
    acPrdReadOnly = false;
    csldCaReadOnly = false;
    remReadOnly = false;
    rem1ReadOnly = false;
    omsReqReadOnly = false;
    csldDpReadOnly = false;
    cgfkOmsreqprinteridRg: any[] = [];
    cgfkOmsreqmodulenameRg: any[] = [];
    cgfkCslddpagylocRg: any[] = [];
    cgfkRecptscreatedusersRg: any[] = [];
    omsreqCommitModel: OmsRequestsCommitBean = new OmsRequestsCommitBean();
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    agyLocTitles = {'code': this.trMsg('common.agencylocations') , 'description': this.trMsg('common.description') };
    reportTitles = {'code': this.trMsg('otsrecei.module') , 'description': this.trMsg('common.description') };
    userTitles = { description: this.trMsg('common.userid'), firstName: this.trMsg('common.firstname'),
     lastName: this.trMsg('common.lastname') };
    cslddpModel: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    user: string;
    nbtPersonIdOne: string;
    nbtPersonIdTwo: string;
    constructor(private otsreceiFactory: OtsreceiService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        public dialogService: DialogService) {

    }
    ngOnInit() {
        this.no();
    }
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
        this.omsreqModel = new OmsRequests();
        this.omsreqModel.moduleName = 'OTRRECEI';
        this.cslddpModel = new CaseloadDeductionProfiles();
        this.getDefaultCopies();
        this.cslddpModel.activeFlag = 'Y';
        this.cslddpModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.user = '1';
        this.nbtPersonIdOne = null;
        this.nbtPersonIdTwo = null;

    }
    cancel() {
        this.omsreqModel = new OmsRequests();
        this.cslddpModel = new CaseloadDeductionProfiles();
        this.user = '1';
        this.cslddpModel.activeFlag = 'Y';
        this.nbtPersonIdOne = null;
        this.nbtPersonIdTwo = null;
        this.getDefaultCopies();
    }
    onOffenderChange(offender) {
    }
    /**
    * To display the messages
    */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    getDefaultCopies() {
        this.otsreceiFactory.getDefaultCopies().subscribe(num => {
            if (typeof num === 'object' || num === null) {
                this.omsreqModel.numberOfCopy = 2;
            } else {
                this.omsreqModel.numberOfCopy = num;
            }
        });
    }
    omsreqExecuteQuery() {
        const omsreqResult = this.otsreceiFactory.
            omsReqExecuteQuery(this.omsreqModel);
        omsreqResult.subscribe(omsreqResultList => {
            if (omsreqResultList.length === 0) {
                this.omsreqData = [];
            } else {
                this.omsreqData = omsreqResultList;
                this.omsreqModel = omsreqResultList[0];
            }
        });
    }
    isNull(value) {
        return value === null || value === undefined;
  }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otsreceiSaveomsreqForm(event) {
        if (!this.omsreqModel.moduleName) {
            this.show('otsrecei.rptmstbentr');
            return;
        }
        if (this.isNull(this.omsreqModel.numberOfCopy)) {
            this.show('otsrecei.cpymstbentr');
            return;
        }
        if (this.omsreqModel.numberOfCopy <= 0) {
            this.show('otsrecei.nmbrcpymstbgrtr');
            return;
        }
        if (!this.cslddpModel.activeFlag && this.isNull(this.cslddpModel.nbtPersonIdOne) && this.isNull(this.cslddpModel.nbtPersonIdTwo)) {
            this.show('otsrecei.frmtobthmstbentr.');
            return;
        }
            this.isLoading = true;
            if (this.omsreqModel.moduleName === 'OTRDRECE') {
                this.cslddpModel.txnUsage = 'D';
            } else if (this.omsreqModel.moduleName === 'OTRRECEI') {
                this.cslddpModel.txnUsage = 'R';
            } else {
                this.show('otsrecei.thrsnovalidrecipt');
                return;
            }
            this.cslddpModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.cslddpModel.caseloadType = this.sessionManager.currentCaseLoadType;
            const reqData = JSON.parse(JSON.stringify(this.cslddpModel));
            reqData.activeFlag = reqData.activeFlag ? 'Y' : 'N';
            reqData.copies = this.omsreqModel.numberOfCopy;
            this.otsreceiFactory.getReport(reqData).subscribe(resData => {
                this.isLoading = false;
               if (resData && !resData.errorMessage && resData.report) {
                const base64pdf = 'data:application/pdf;base64,';
                const pdf = base64pdf + resData.report;
                const win = window.open(pdf);
                win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
               } else {
                   if (resData.errorMessage) {
                       this.show(resData.errorMessage);
                   } else {
                    this.show('otsrecei.unbltorun', 'error');
                   }
               }
               this.no();
            });
    }

    get smbtBtnFlg(): boolean {
        if (this.isLoading) {
            return true;
        } else {
            if (!this.cslddpModel.activeFlag) {
                if (!this.cslddpModel.nbtPersonIdOne && !this.cslddpModel.nbtPersonIdTwo) {
                    return true;
                }
            } else {
                return false;
            }
        }
    }

    onFromNumBlur(event) {
        this.cslddpModel.nbtPersonIdOne = null;
        const data = JSON.parse(JSON.stringify(this.cslddpModel));
        if (data && event) {
            this.isLoading = true;
            data.receiptNumber = event;
            data.caseloadId = this.sessionManager.currentCaseLoad;
            data.nbtPersonIdOne = event;
            this.otsreceiFactory.receiptNumExist(data).subscribe(resData => {
                this.isLoading = false;
                if (resData === 0) {
                    this.show('otsrecei.recptnuminvld');
                    this.cslddpModel.nbtPersonIdOne = null;
                    this.nbtPersonIdOne = null;
                } else {
                    if (this.cslddpModel.nbtPersonIdTwo) {
                        if (this.cslddpModel.nbtPersonIdTwo < event) {
                            this.show('otsrecei.toreptmstbegret');
                            this.cslddpModel.nbtPersonIdOne = null;
                            this.nbtPersonIdOne = null;
                            return;
                        }
                    }
                    this.cslddpModel.nbtPersonIdOne = event;
                    this.nbtPersonIdOne = event;
                }
            });
        }
    }

    onToNumBlur(event) {
        this.cslddpModel.nbtPersonIdTwo = null;
        const data = JSON.parse(JSON.stringify(this.cslddpModel));
        if (data && event) {
            this.isLoading = true;
            data.receiptNumber = event;
            data.caseloadId = this.sessionManager.currentCaseLoad;
            data.nbtPersonIdTwo = event;
            this.otsreceiFactory.receiptNumExist(data).subscribe(resData => {
                this.isLoading = false;
                if (resData === 0) {
                    this.show('otsrecei.recptnuminvld');
                    this.nbtPersonIdTwo = null;
                    this.cslddpModel.nbtPersonIdTwo = null;
                    } else {
                        if (this.cslddpModel.nbtPersonIdOne) {
                            if (this.cslddpModel.nbtPersonIdOne > event) {
                                this.show('otsrecei.toreptmstbegret');
                                this.cslddpModel.nbtPersonIdTwo = null;
                                this.nbtPersonIdTwo = null;
                                return;
                            }
                        }
                        this.cslddpModel.nbtPersonIdTwo = event;
                        this.nbtPersonIdTwo = event;
                    }
            });
        }
    }

    onUserChange(event) {
        if (event) {
            this.cslddpModel.createUserId =  event.description;
            this.cslddpModel.txnUsage = event.code === 'OTRDRECE' ? 'D' : 'R';
        } else {
            this.cslddpModel.createUserId =  null;
            this.cslddpModel.txnUsage = null;
        }

    }

    openDialog(event) {
        this.isLoading = true;
        this.dialogService.openLinkDialog('/OTURNUMB', this.cslddpModel, 80).subscribe(data => {
            if (data) {
                this.isLoading = false;
                if (event === 1) {
                    this.onFromNumBlur(data.receiptNumber);
                }
                if (event === 2) {
                    this.onToNumBlur(data.receiptNumber);
                }
            }
        });
    }

    onModuleBlur() {
        if (!this.omsreqModel.moduleName) {
            this.omsreqModel.moduleName = this.omsreqModel.moduleName === '' ? undefined : '';
        }
    }
    onagyLocBlur() {
        if (!this.cslddpModel.agyLocId) {
            this.cslddpModel.agyLocId = this.cslddpModel.agyLocId === '' ? undefined : '';
        }
    }
    onUserBlur() {
        if (!this.user) {
            this.user = this.user === '' ? undefined : '';
        }
    }


                }
