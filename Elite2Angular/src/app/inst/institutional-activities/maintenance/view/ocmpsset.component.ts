import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ReferenceDomainService } from '@core/ui-components/lov/reference-domain.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OcmpssetService } from '@inst/institutional-activities/maintenance/service/ocmpsset.service';
import { ProgramPaySettingsBean } from '@inst/institutional-activities/maintenance/beans/ProgramPaySettingsBean';
import { ProgramPaySettingsCommitBean } from '@inst/institutional-activities/maintenance/beans/ProgramPaySettingsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

// import required bean declarations

@Component({
    selector: 'app-ocmpsset',
    templateUrl: './ocmpsset.component.html'
})

export class OcmpssetComponent implements OnInit {
    msgs: any[] = [];
    msglist: any[];
    message: any;
    type: any;
    prgSrvSetModel: ProgramPaySettingsBean = new ProgramPaySettingsBean();
    tempModel: ProgramPaySettingsBean = new ProgramPaySettingsBean();
    prgSrvData: ProgramPaySettingsBean[] = [];
    commitData: ProgramPaySettingsCommitBean = new ProgramPaySettingsCommitBean;
    public fields: Object = { text: 'description', value: 'code' };
    public mode: string;
    constructor(private refCodeService: ReferenceDomainService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService,
        private ocmpssetFactory: OcmpssetService) {

    }
    ngOnInit() {
        this.mode = 'CheckBox';
        this.progServicesExecuteQuery();
    }
    /**
* This function displays the messages
*/
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    progServicesExecuteQuery() {
        const searchResult = this.ocmpssetFactory.progServSettingExecuteQuery();
        searchResult.subscribe(data => {
            if (data.length === 0) {
                this.prgSrvSetModel = new ProgramPaySettingsBean();
            } else {
                const acpCodes = data[0].acpAttCode.split(',');
                const instActCodes = data[0].instActAttCode.split(',');
                data[0].acpAttCodeValue = acpCodes;
                data[0].instActAttCodeValue = instActCodes;
                this.prgSrvSetModel = data[0];
                this.tempModel = JSON.parse(JSON.stringify(data[0]));
            }
        });
    }
    save() {
        this.commitData = new ProgramPaySettingsCommitBean();
        this.commitData.insertList = [];
        this.commitData.updateList = [];
        this.prgSrvData = [];
        this.prgSrvSetModel.acpAttCode = this.prgSrvSetModel.acpAttCodeValue.toString();
        this.prgSrvSetModel.instActAttCode = this.prgSrvSetModel.instActAttCodeValue.toString();
        if (this.prgSrvSetModel && this.prgSrvSetModel.createDatetime) {
            if(!this.prgSrvSetModel.payFlag) {
                this.show('Programs and Services Generate Pay value must be entered.', 'warn');
                return false;
            }
            this.prgSrvData.push(this.prgSrvSetModel);
            this.commitData.updateList = this.prgSrvData;
        }
        if (this.prgSrvSetModel && !this.prgSrvSetModel.createDatetime) {
            this.prgSrvSetModel.createDatetime = DateFormat.getDate();
            this.prgSrvSetModel.createUserId = this.sessionManager.getId();
            if(!this.prgSrvSetModel.payFlag) {
                this.show('Programs and Services Generate Pay value must be entered.', 'warn');
                return false;
            }
            this.prgSrvData.push(this.prgSrvSetModel);
            this.commitData.insertList = this.prgSrvData;
        }
        const vactattSaveData = this.ocmpssetFactory.prgSrvSettingCommit(this.commitData);
        vactattSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.progServicesExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.progServicesExecuteQuery();
                return;
            }
        });

    }
    get fieldsReadOnly() {
        return false;
    }
    get btnDisable() {
        if (!this.prgSrvSetModel.createDatetime) {
            return false;
        } else if (this.tempModel.payFlag !== this.prgSrvSetModel.payFlag || this.tempModel.paySystemCode !== this.prgSrvSetModel.paySystemCode || this.tempModel.payCycleStartDay !== this.prgSrvSetModel.payCycleStartDay
            || this.tempModel.instActDefaultAttCode !== this.prgSrvSetModel.instActDefaultAttCode || this.tempModel.instActMaxScheduledHours !== this.prgSrvSetModel.instActMaxScheduledHours
            || this.tempModel.acpAttCodeValue.toString() !== this.prgSrvSetModel.acpAttCodeValue.toString() || this.tempModel.instActAttCodeValue.toString() !== this.prgSrvSetModel.instActAttCodeValue.toString() ||
            this.tempModel.iepLevelCode !== this.prgSrvSetModel.iepLevelCode ||this.tempModel.instActDelFlag !== this.prgSrvSetModel.instActDelFlag) {
            return false;
        }
        return true;
    }
    optionChangeEvent(event) {
        if (event) {

        }
    }
    clear() {
        this.progServicesExecuteQuery();
    }

}
