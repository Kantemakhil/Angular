
import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmoflimService } from '../service/otmoflim.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OffenderLimits } from '@inmate/beans/OffenderLimits';
import { OffenderLimitsCommitBean } from '@inmate/beans/OffenderLimitsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

@Component({
    selector: 'app-otmoflim',
    templateUrl: './otmoflim.component.html'
})

export class OtmoflimComponent implements OnInit {
    msgs: any[] = [];
    offlimData: OffenderLimits[] = [];
    offlimDataTemp: OffenderLimits[] = [];
    offlimModel: OffenderLimits = new OffenderLimits();
    vHeaderBlockModel: VTrustHeader = new VTrustHeader();
    offlimIndex = 0;
    offlimCommitModel: OffenderLimitsCommitBean = new OffenderLimitsCommitBean();
    offlimInsertList: OffenderLimits[] = [];
    offlimUpdatetList: OffenderLimits[] = [];
    offlimDeleteList: OffenderLimits[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offLimColumnDef: any[];
    cgfkOfflimlimittypeRg: any[] = [];
    limitTypeTitles = {
        'code': this.translateService.translate('otmoflim.limittype'),
        'description': this.translateService.translate('common.description')
    };
    enableInsert: boolean;
    tableIndex = -1;
    enableDelete: boolean;
    constructor(private otmoflimFactory: OtmoflimService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService, public sessionManager: UserSessionManager) {
        this.offLimColumnDef = [];
    }
    ngOnInit() {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.enableInsert = false;
        this.enableDelete = false;
        this.offLimColumnDef = [
            {
                fieldName: this.translateService.translate('otmoflim.limittype') + '*', field: 'limitType', editable: true, width: 150,
                domain: 'LIMIT_TYPE', datatype: 'lov',
                titles: this.limitTypeTitles, cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('otmoflim.limitamount') + '*', field: 'limitAmount', editable: true, width: 150,
                datatype: 'number',
                format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true
            },
        ];
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show('common.pleasesearchforvalidoffender');
            return;

        }
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
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
    onGridInsert = () => {
        if (this.offlimData.length > 0) {
            if (!this.offlimData[this.offlimData.length - 1].limitType) {
                this.show(this.translateService.translate('otmoflim.limittypemustbe'));
                return null;

            }
            if (!this.offlimData[this.offlimData.length - 1].limitAmount) {
                this.show(this.translateService.translate('otmoflim.limitamountmustbeentered'));
                return null;

            }
        }
        return { limitType: '', limitAmount: '' };

    }
    onRowClickofflim(event) {
        if (event) {
            this.offlimModel = event;
            this.enableInsert = true;
            if (!this.offlimModel.modifyDate) {
                this.enableDelete = false;
            } else {
                this.enableDelete = true;
            }
        }
    }
    onOffenderChange(offender) {
        this.offlimData = [];
        this.vHeaderBlockModel = new VTrustHeader();
        if (offender) {
            this.vHeaderBlockModel = offender;
            if (this.vHeaderBlockModel.rootOffenderId) {
                this.offlimModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
                this.offlimModel.caseloadId = this.sessionManager.currentCaseLoad;
                this.offlimExecuteQuery();
            }
        } else {
            this.enableInsert = false;
            this.enableDelete = false;
        }
    }
    offlimExecuteQuery() {
        const offlimResult = this.otmoflimFactory.offLimExecuteQuery(this.offlimModel);
        offlimResult.subscribe(data => {
            if (data.length === 0) {
                this.offlimData = [];
                this.enableInsert = true;
            } else {
                data.forEach(ele => {
                    ele.limitAmount = Number(ele.limitAmount).toFixed(2);
                  });
                this.offlimData = data;
                this.tableIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmoflimSaveofflimForm(event) {
        this.offlimInsertList = event.added;
        this.offlimUpdatetList = event.updated;
        this.offlimDeleteList = event.removed;
        this.offlimCommitModel.insertList = [];
        this.offlimCommitModel.updateList = [];
        this.offlimCommitModel.deleteList = [];
        if (this.offlimInsertList.length > 0) {
            for (let i = 0; i < this.offlimInsertList.length; i++) {
                if (!this.offlimInsertList[i].limitType) {
                    this.show(this.translateService.translate('otmoflim.limittypemustbe'));
                    return;
                }
                if (!this.offlimInsertList[i].limitAmount && this.offlimInsertList[i].limitAmount !== Number('0.00')) {
                    this.show(this.translateService.translate('otmoflim.limitamountmustbeentered'));
                    return;
                }
                this.offlimInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
                this.offlimInsertList[i].offenderId = this.vHeaderBlockModel.rootOffenderId;
                this.offlimInsertList[i].modifyDate = DateFormat.getDate();
                // this.offlimInsertList[i].createDatetime = DateFormat.getDate();
                this.offlimInsertList[i].createUserId = this.sessionManager.getId();
                this.offlimInsertList[i].modifyUserId = this.sessionManager.getId();
                this.offlimInsertList[i].listSeq = 99;
            }
            this.offlimCommitModel.insertList = this.offlimInsertList;
        }
        if (this.offlimUpdatetList.length > 0) {

            for (let i = 0; i < this.offlimUpdatetList.length; i++) {
                if (!this.offlimUpdatetList[i].limitAmount && this.offlimUpdatetList[i].limitAmount !== Number('0.00')) {
                    this.show(this.translateService.translate('otmoflim.limitamountmustbeentered'));
                    return;
                }
                this.offlimUpdatetList[i].caseloadId = this.sessionManager.currentCaseLoad;
                this.offlimUpdatetList[i].createDatetime = DateFormat.getDate();
            }
            this.offlimCommitModel.updateList = this.offlimUpdatetList;
        }
        if (this.offlimDeleteList.length > 0) {
            for (let i = 0; i < this.offlimDeleteList.length; i++) {
                this.offlimDeleteList[i].caseloadId = this.sessionManager.currentCaseLoad;
                this.offlimDeleteList[i].createDatetime = DateFormat.getDate();
            }
            this.offlimCommitModel.deleteList = this.offlimDeleteList;
        }
        const offlimSaveData = this.otmoflimFactory.offLimCommit(this.offlimCommitModel);
        offlimSaveData.subscribe(data => {
            if (String(data) === '1') {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.offlimExecuteQuery();
                return;
            } else if (String(data).includes('OMS_OWNER.OFFENDER_LIMITS_PK')) {
                this.show('otmoflim.error');
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.offlimExecuteQuery();
                return;
            }
        });
    }
    syspflExecuteQuery() {
        const syspflResult = this.otmoflimFactory.sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(data => {
            if (data.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = data;
            }
        });
    }
}



