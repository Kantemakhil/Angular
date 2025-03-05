import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidrecorService } from '../service/oidrecor.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { AgencyCounts } from '@inst/automated-counts/beans/AgencyCounts';
import { AgencyCountsCommitBean } from '@inst/automated-counts/beans/AgencyCountsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oidrecor',
    templateUrl: './oidrecor.component.html'
})

export class OidrecorComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    agencycountsModel: AgencyCounts = new AgencyCounts();
    agencycountsinsertList: AgencyCounts[] = [];
    agencycountsUpdatetList: AgencyCounts[] = [];
    agencycountsDeleteList: AgencyCounts[] = [];
    agencycountsCommitModel: AgencyCountsCommitBean = new AgencyCountsCommitBean();
    msglist: any[];
    message: any;
    type: any;
    savedisabled: boolean;
    constructor(private oidrecorFactory: OidrecorService,
        private sessionManager: UserSessionManager,
        private translateService: TranslateService) {

    }
    ngOnInit() {
        const dialogData = this.dialog.data;
        this.agencycountsModel.rsnCodeUserid = this.sessionManager.getId();
        this.agencycountsModel.rsnCodeDatetime = DateFormat.getDate();

    }
    allowNumbers(event) {
    }
    onButSaveclick() {
    }
    onButCancelclick() {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    agencycountsExecuteQuery() {
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidrecorSaveagencycountsForm(event) {
        if (!this.agencycountsModel.recountRsnCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrecor.recountreasonerror');
            this.show();
            return;
        }
        const data = this.dialog.data;
        let reCountSessionId = Math.floor((Math.random()/10000000)*10000000*10000000);
        this.agencycountsModel.reportingLocId = data.inserted;
        this.agencycountsModel.countTypeId = data.countTypeId;
        this.agencycountsModel.sessionId = data.sessionId;
        this.agencycountsModel.reCountSessionId = reCountSessionId;
        this.agencycountsModel.totalActual = data.totalActual;
        this.agencycountsModel.totalMale = data.totalMale;
        this.agencycountsModel.totalFemale = data.totalFemale;
        this.agencycountsModel.totalOther = data.totalOther;
        this.agencycountsModel.totalReported = data.totalReported;
        this.agencycountsModel.outTotal = data.outTotal;
        this.agencycountsModel.totalMaleOut = data.totalMaleOut;
        this.agencycountsModel.totalFemaleOut = data.totalFemaleOut;
        this.agencycountsModel.totalOtherOut = data.totalOtherOut;
        this.agencycountsModel.agylocId = data.agyLocId;
        this.agencycountsModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.agencycountsCommitModel.insertList = [];
        this.agencycountsCommitModel.updateList = [];
        this.agencycountsCommitModel.deleteList = [];
        this.savedisabled = true;
        this.agencycountsCommitModel.updateList.push(this.agencycountsModel);
        const agencycountsSaveData = this.oidrecorFactory.agencyCountsCommit(this.agencycountsCommitModel);
        agencycountsSaveData.subscribe(resData => {
            if (resData > 0) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.savedisabled = true;
                let returnResult = {'reportingLocId':resData, 'sessionId':reCountSessionId};
                this.dialog.close(returnResult);
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.savedisabled = false;
                this.show();
            }
        });
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

    recountRsnCodeChange(event) {
        
    }


}
