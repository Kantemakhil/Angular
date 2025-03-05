import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiddisreService } from '@inst/automated-counts/service/oiddisre.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AgencyCounts } from '@inst/automated-counts/beans/AgencyCounts';
import { AgencyCountsCommitBean } from '@inst/automated-counts/beans/AgencyCountsCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oiddisre',
    templateUrl: './oiddisre.component.html'
})

export class OiddisreComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    agencyCountsData: AgencyCounts[] = [];
    agencyCountsDataTemp: AgencyCounts[] = [];
    agencyCountsModel: AgencyCounts = new AgencyCounts();
    agencyCountsBean: AgencyCounts = new AgencyCounts();
    agencyCountsIndex = 0;
    agencyCountsInsertList: AgencyCounts[] = [];
    agencyCountsUpdateList: AgencyCounts[] = [];
    agencyCountsDeleteList: AgencyCounts[] = [];
    agencyCountsCommitModel: AgencyCountsCommitBean = new AgencyCountsCommitBean();
    agency_countsReadOnly = false;
    cgfkDiscrepRsnRg: any[] = [];
    lovTitles = {
        'code': this.translateService.translate('oiddisre.discrepancycode'),
        'description': this.translateService.translate('common.description')
    };
    msglist: any;
    message: any;
    type: any;
    constructor(private oiddisreFactory: OiddisreService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
    }
    ngOnInit() {
        this.agencyCountsModel = new AgencyCounts();
        this.agencyCountsModel.rsnCodeUserid = this.sessionManager.getId();
        this.agencyCountsModel.rsnCodeDatetime = DateFormat.getDate();
    }
    /**
* This function displays the messages
*/
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    /* get saveBtnFlg() {
        if (this.agencyCountsModel.discrepRsnCode || this.agencyCountsModel.discrepRsnCode !== '') {
            return false;
        }
        return true;
    } */
    onCodeChange() {
        if (!this.agencyCountsModel.discrepRsnCode) {
            this.agencyCountsModel.discrepRsnCode = this.agencyCountsModel.discrepRsnCode === '' ? undefined : '';
        }
    }
    agencyCountsExecuteQuery() {
        const agencyCountsResult = this.oiddisreFactory.
            agencyCountsExecuteQuery(this.agencyCountsModel);
        agencyCountsResult.subscribe(agencyCountsResultList => {
            if (agencyCountsResultList.length === 0) {
                this.agencyCountsData = [];
            } else {
                this.agencyCountsData = agencyCountsResultList;
                this.agencyCountsModel = agencyCountsResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    saveagencycountsForm(event) {
        if (!this.agencyCountsModel.discrepRsnCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiddisre.discrepancyreasoncannotbeempty');
            this.show();
            return;
        }
        this.agencyCountsBean = JSON.parse(JSON.stringify(this.dialog.data));
        this.agencyCountsBean.discrepRsnCode = this.agencyCountsModel.discrepRsnCode;
        this.agencyCountsBean.commentText = this.agencyCountsModel.commentText;
        const agencyCountsSaveData = this.oiddisreFactory.agencyCountsCommit(this.agencyCountsBean);
        agencyCountsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.dialog.close('success');
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    recountRsnCodeChange(event) {
       
    }
}
