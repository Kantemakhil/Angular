import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef, ViewChild
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OtusubacService } from '../service/otusubac.service';
import { Offenders } from '@commonbeans/Offenders';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { OffenderSubAccounts } from '@inmate/trust/trustaccounts/beans/OffenderSubAccounts';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-otusubac',
    templateUrl: './otusubac.component.html'
})

export class OtusubacComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offnameData: Offenders[] = [];
    offnameDataTemp: Offenders[] = [];
    offnameModel: Offenders = new Offenders();
    offnameIndex = -1;
    offnameInsertList: Offenders[] = [];
    offnameUpdatetList: Offenders[] = [];
    offnameDeleteList: Offenders[] = [];
    offsubaData: OffenderSubAccounts[] = [];
    offsubaDataTemp: OffenderSubAccounts[] = [];
    offsubaModel: OffenderSubAccounts = new OffenderSubAccounts();
    offsubaIndex = -1;
    offsubaInsertList: OffenderSubAccounts[] = [];
    offsubaUpdatetList: OffenderSubAccounts[] = [];
    offsubaDeleteList: OffenderSubAccounts[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = -1;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    corpColumnDef: any[];
    offSubaColumnDef: any[];
    remColumnDef: any[];
    offBncColumnDef: any[];
    readonly: boolean;
    constructor(private otusubacFactory: OtusubacService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,
        private sessionManager: UserSessionManager) {
        this.corpColumnDef = [];
        this.offSubaColumnDef = [];
        this.remColumnDef = [];
        this.offBncColumnDef = [];
    }
    ngOnInit() {
        this.readonly = true;
        this.corpColumnDef = [
            { fieldName: 'Name', field: 'corporateName', editable: false, width: 150 },
            { fieldName: 'Identifier', field: 'corporateId', editable: false, width: 150 },
            { fieldName: 'Telephone', field: 'nbtPhone', editable: false, width: 150 },
        ];
        this.offSubaColumnDef = [
            { fieldName: 'Type', field: 'code', editable: false, width: 150 },
            { fieldName: 'Description', field: 'description', editable: false, width: 150 },
            { fieldName: 'Balance', field: 'balance', editable: false, width: 150 ,datatype: 'number', format: '1.2-2'},
        ];
        this.remColumnDef = [
            { fieldName: 'ID#', field: 'remitterId', editable: false, width: 150 },
            { fieldName: 'Middle Name', field: 'middleName', editable: false, width: 150 },
            { fieldName: 'Last Name*', field: 'lastName', editable: false, width: 150 },
            { fieldName: 'First Name*', field: 'firstName', editable: false, width: 150 },
        ];
        this.offBncColumnDef = [
            { fieldName: 'Amount &#10;Owing', field: 'drvAmount', editable: false, width: 150,
            datatype: 'number', format: '1.2-2',rightAlign: true },
            { fieldName: 'Last Name', field: 'dspLastName', editable: false, width: 150 },
            { fieldName: 'First Name', field: 'dspFirstName', editable: false, width: 150 },
            { fieldName: 'Corp.', field: 'corporateId', editable: false, width: 150 },
            { fieldName: 'Docket #', field: 'dspInformationNumber', editable: false, width: 150 },
            { fieldName: 'Person', field: 'personId', editable: false, width: 150 },
            { fieldName: 'Amount Paid', field: 'overrideAmount', editable: false, width: 150,
            datatype: 'number', format: '1.2-2',rightAlign: true },
            { fieldName: 'Name', field: 'dspCorporateName', editable: false, width: 150 },
            { fieldName: '/Type', field: 'dspDeductionType', editable: false, width: 150 },
            { fieldName: 'Obligation ID', field: 'offenderDeductionId', editable: false, width: 150 },
        ];
        this.offsubaExecuteQuery();
    }
    allowNumbers(event) {
    }
    onRowClickoffsuba(event) {
    }
    onButProfileValueclick() {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    offnameExecuteQuery() {
        if (this.dialog && this.dialog.data && this.dialog.data.offenderId) {
            const data = {offenderId: this.dialog.data.offenderId};
            const offnameResult = this.otusubacFactory.offNameExecuteQuery(data);
            offnameResult.subscribe(offnameResultList => {
                if (offnameResultList.length === 0) {
                    this.offnameData = [];
                } else {
                    this.offnameData = offnameResultList;
                    this.offnameModel = offnameResultList[0];
                }
            });
        }

    }
    offsubaExecuteQuery() {
        this.offsubaModel.offenderBookId = this.offenderSearchService.selectedOffender ?
        this.offenderSearchService.selectedOffender.offenderBookId
        : null;
        this.offsubaModel.offenderId = this.offenderSearchService.selectedOffender ?
        this.offenderSearchService.selectedOffender.rootOffenderId
        : null;
        this.offsubaModel.caseloadId = this.sessionManager.currentCaseLoad;
        if (this.dialog.data) {
            this.offnameExecuteQuery();
        const data = {
            'caseloadId': this.sessionManager.currentCaseLoad,
            'offenderId': this.dialog.data.offenderId,
            'offenderBookId': this.dialog.data.offenderBookId
          };
        const offsubaResult = this.otusubacFactory.offSubaExecuteQuery(data);
        offsubaResult.subscribe(offsubaResultList => {
            if (offsubaResultList.length === 0) {
                this.offsubaData = [];
                this.show('common.querycaused');
            } else {
                if (offsubaResultList.length === 1 && offsubaResultList[0].errorMessage) {
                    this.show(offsubaResultList[0].errorMessage);
                } else {
                    offsubaResultList.forEach(ele => {
                        if (ele.balance) {
                            ele.balance = Number(ele.balance).toFixed(2);
                        }
                    });
                    offsubaResultList.forEach(ele => {
                        ele.balance = Number(ele.balance).toFixed(2);
                    });
                this.offsubaData = offsubaResultList;
                this.offsubaModel = offsubaResultList[0];
                }
            }

        });
    }
    }
    syspflExecuteQuery() {
        const syspflResult = this.otusubacFactory.sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }

    exit() {
        this.dialog.close( null );
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

}
