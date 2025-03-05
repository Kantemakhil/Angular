import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderGrievanceTxns } from '@instoffenderissuestrackingbeans/OffenderGrievanceTxns';
import { OffenderGrievanceTxnsCommitBean } from '@instoffenderissuestrackingbeans/OffenderGrievanceTxnsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OidissueService } from '../service/oidissue.service';

@Component({
    selector: 'app-oiuprres',
    templateUrl: './oiuprres.component.html'
})

export class OiuprresComponent implements OnInit {
    // Variable declaration
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    prresData: OffenderGrievanceTxns[] = [];
    prresDataTemp: OffenderGrievanceTxns[] = [];
    prresModel: OffenderGrievanceTxns = new OffenderGrievanceTxns();
    prresModelTemp: OffenderGrievanceTxns = new OffenderGrievanceTxns();
    prresCommitModel: OffenderGrievanceTxnsCommitBean = new OffenderGrievanceTxnsCommitBean();
    prresIndex: number;
    prresInsertList: OffenderGrievanceTxns[] = [];
    prresUpdatetList: OffenderGrievanceTxns[] = [];
    prresDeleteList: OffenderGrievanceTxns[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    proposedResponsevalue: string;
    proposedResponselength: number;
    proposedResponse: any;
    constructor(private oidissueFactory: OidissueService, public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        public dialogService: DialogService) {
    }
    ngOnInit() {
        this.prresExecuteQuery();
    }
    cancel() {
        if (!this.proposedResponse) {
            this.dialog.close(null);
        } else {
            const data = {
                label: this.translateService.translate('ocucname.exitbtnvalidation'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                if (result) {
                    this.oiuprresSaveprresForm();
                } else {
                    this.dialog.close(null);
                }
            });
        }
    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    prresExecuteQuery() {
        this.prresModel.grievanceId = this.dialog.data.grievanceId;
        this.prresModel.txnSeq = this.dialog.data.txnSeq;
        const prresResult = this.oidissueFactory.prresExecuteQuery(this.prresModel);
        prresResult.subscribe(data => {
            if (data.length === 0) {
                this.prresData = [];
            } else {
                this.prresData = data;
                for (let i = 0; i < this.prresData.length; i++) {
                    if (this.prresData[i].proposedResponse) {
                        this.prresModel.appendResponsecommentText = this.prresData[i].proposedResponse;
                    }
                }
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    get saveDisabled(){
        if(!this.proposedResponse)
            return true;
        else if(this.proposedResponse && this.proposedResponse.trim() === ''){
            return true;
        }
            return false;
    }

    oiuprresSaveprresForm() {
        this.prresCommitModel.insertList = [];
        this.prresCommitModel.updateList = [];
        this.prresCommitModel.deleteList = [];
        this.prresUpdatetList = [];
        this.prresModel.grievanceId = this.dialog.data.grievanceId;
        this.prresModel.txnSeq = this.dialog.data.txnSeq;
        if (this.prresModel.grievanceId && this.prresModel.txnSeq) {
            if (this.proposedResponse) {
                this.proposedResponselength = this.proposedResponse.length;
                if (this.prresModel.appendResponsecommentText) {
                    this.proposedResponselength = this.proposedResponselength +
                        this.prresModel.appendResponsecommentText.length;
                }
                if (this.proposedResponselength > 2000) {
                    this.show(this.translateService.translate('oiuprres.youcannotadd'), 'warn');
                    return;
                }
                const responsecommitText = this.prresModel.appendResponsecommentText ? this.prresModel.appendResponsecommentText : '';

                this.prresModelTemp.proposedResponse = responsecommitText + '...[' + this.sessionManager.getId() + ' updated the Proposed Response/Comment on '
                    + DateFormat.updateServerDate() + '] ' + this.proposedResponse;
            }

        }
        this.prresModel.proposedResponse = this.prresModelTemp.proposedResponse;
        this.prresModel.createDatetime = DateFormat.getDate();
        this.prresUpdatetList.push(this.prresModel);
        this.prresCommitModel.updateList = this.prresUpdatetList;
        const prresSaveData = this.oidissueFactory.prresCommit(this.prresCommitModel);
        prresSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.dialog.close({ createDatetime: undefined, inserted: true });
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }
}
