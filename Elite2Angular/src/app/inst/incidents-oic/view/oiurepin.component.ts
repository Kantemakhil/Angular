import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ReportableIncedentDetails } from '@instincidentsbeans/ReportableIncedentDetails';
import { ReportableIncedentDetailsCommitBean } from '@instincidentsbeans/ReportableIncedentDetailsCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OiurepinService } from '../service/oiurepin.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OidincdeService } from '../service/oidincde.service';

@Component({
    selector: 'app-oiurepin',
    templateUrl: './oiurepin.component.html'
    /* ,
    styleUrls: ['./oidstfrppopup.component.css'] */
})
export class OiurepinComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    staffSearch: any;
    reportableIncedentTypeColumnDefs: any[] = [];

    reportableIncedentDeailsdata: ReportableIncedentDetails[] = [];
    reportableIncedentDeailsModel: ReportableIncedentDetails = new ReportableIncedentDetails();
    reportableIncedentDeailsSearchModel: ReportableIncedentDetails = new ReportableIncedentDetails();

    reportLink: any;
    msgs: any[] = [];
    reportableIncedentDetailInsertList: ReportableIncedentDetails[] = [];
    reportableIncedentDetailUpdatetList: ReportableIncedentDetails[] = [];
    reportableIncedentDetailDeleteList: ReportableIncedentDetails[] = [];
    reportableIncedentDetailCommitModel: ReportableIncedentDetailsCommitBean = new ReportableIncedentDetailsCommitBean();
    tableIndex: number;
    userNameLoggedIn: any;

    constructor(public translateService: TranslateService, private oiurepinFactory: OiurepinService, private sessionManager: UserSessionManager,
        private oidincdeFactory: OidincdeService) { }

    ngOnInit() {
        this.reportableIncedentDeailsSearchModel.agencyIncidentId = this.dialog.data.agencyIncidentId;
        this.reportableIncedentDeailsSearchModel.partySeq = this.dialog.data.partySeq;
        this.staffSearch = this.dialog.data;
        this.reportableIncedentTypeColumnDefs = [

            {
                fieldName: this.translateService.translate('oiurepin.incident'), field: 'reportableIncidentType',
                editable: true, width: 150, filter: 'text', datatype: 'lov', domain: 'REPINCTYP', required: true
            },
            {
                fieldName: this.translateService.translate('oiurepin.comment'), field: 'commentText', editable: true,
                datatype: 'text', uppercase: 'false', width: 150, maxlength: 240
            },

            {
                fieldName: this.translateService.translate('oiurepin.username'), field: 'userName', editable: false,
                datatype: 'text', uppercase: 'false'
            },


            {
                fieldName: this.translateService.translate('oiurepin.date'), field: 'reportableDatetime', editable: true,
                datatype: 'date'
            },
        ];
        this.getUserNameLog();
        this.getReportDetailsExecuteQuery();
    }


    clear() {
        this.dialog.close("true");
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    getReportDetailsExecuteQuery() {
        this.reportableIncedentDeailsSearchModel = new ReportableIncedentDetails();
        this.reportableIncedentDeailsSearchModel.agencyIncidentId = this.dialog.data.agencyIncidentId;
        this.reportableIncedentDeailsSearchModel.partySeq = this.dialog.data.partySeq;
        const serviceObj = this.oidincdeFactory.getReportDetailsExecuteQuery(this.reportableIncedentDeailsSearchModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.reportableIncedentDeailsdata = [];
            } else {
                this.reportableIncedentDeailsdata = data;
                this.reportableIncedentDeailsModel = data[0];
                this.tableIndex = 0;
            }
        });
    }

    getUserNameLog (){
        const serviceObj = this.oidincdeFactory.getUserNameLog();
        serviceObj.subscribe(data => {
            if (data) {
                this.userNameLoggedIn = data;
            } 
        });
    }


    reportableIncidentDetailsCommitForm(event) {
        /* if (!this.oimsreqsTermValidations()) {
            return;
        } */
        this.reportableIncedentDetailInsertList = event.added;
        this.reportableIncedentDetailUpdatetList = event.updated;
        this.reportableIncedentDetailDeleteList = event.removed;
        this.reportableIncedentDetailCommitModel.insertList = [];
        this.reportableIncedentDetailCommitModel.updateList = [];
        this.reportableIncedentDetailCommitModel.deleteList = [];
        if (this.reportableIncedentDetailInsertList.length > 0 || this.reportableIncedentDetailUpdatetList.length > 0) {
            for (let i = 0; i < this.reportableIncedentDetailInsertList.length; i++) {
                this.reportableIncedentDetailInsertList[i].agencyIncidentId = this.dialog.data.agencyIncidentId;
                this.reportableIncedentDetailInsertList[i].partySeq = this.dialog.data.partySeq;
                // this.sentermsInsertList[i].activeFlag = this.sentermsInsertList[i].activeFlag ? 'Y' : 'N';
                this.reportableIncedentDetailCommitModel.insertList = this.reportableIncedentDetailInsertList;
            }
            for (let i = 0; i < this.reportableIncedentDetailUpdatetList.length; i++) {
                this.reportableIncedentDetailCommitModel.updateList = this.reportableIncedentDetailUpdatetList;

            }
        }
        if (this.reportableIncedentDetailDeleteList.length > 0) {
            for (let i = 0; i < this.reportableIncedentDetailDeleteList.length; i++) {
                this.reportableIncedentDetailCommitModel.deleteList = this.reportableIncedentDetailDeleteList;
            }
        }
        const sentermsSaveData = this.oidincdeFactory.reportableIncedentDetailsCommit(this.reportableIncedentDetailCommitModel);
        sentermsSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('INCIDENT_REPORTABLE_DETAILS_UK1') > 0) {
                this.show(this.translateService.translate('oiurepin.rowalreadyexistswithsamereportableincidenttype'), 'warn');
                this.getReportDetailsExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.getReportDetailsExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.getReportDetailsExecuteQuery();
                return;
            }
        });
    }

    onRowClickReportIncedent(event) {
        if (event) {
            this.reportableIncedentDeailsModel = event;
        }

    }

    get deleteEnable(){
        if(this.reportableIncedentDeailsModel.createDatetime){
            return true;
        } 
        return false;
    }


    onGridInsert = () => {
        this.reportableIncedentDeailsModel =new ReportableIncedentDetails();
        return {userName: this.userNameLoggedIn, reportableDatetime : DateFormat.getDate()};
    }
}