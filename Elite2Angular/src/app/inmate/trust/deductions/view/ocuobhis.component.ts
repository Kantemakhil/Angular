import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuobhisService } from '@inmate/trust/deductions/service/ocuobhis.service';
import { OffenderObligationHty } from '@inmatetrustdeductionsbeans/OffenderObligationHty';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { UserSessionManager } from '@core/classes/userSessionManager';
// import required bean declarations

@Component({
    selector: 'app-ocuobhis',
    templateUrl: './ocuobhis.component.html'
})

export class OcuobhisComponent implements OnInit {
    // Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid', {static: true}) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offoblhtyData: OffenderObligationHty[] = [];
    offoblhtyDataTemp: OffenderObligationHty[] = [];
    offoblhtyModel: OffenderObligationHty = new OffenderObligationHty();
    offoblhtyIndex = 0;
    offoblhtyInsertList: OffenderObligationHty[] = [];
    offoblhtyUpdatetList: OffenderObligationHty[] = [];
    offoblhtyDeleteList: OffenderObligationHty[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    glTxn1ColumnDef: any[];
    offOblHtyColumnDef: any[];
    perColumnDef: any[];
    offBncColumnDef: any[];
    vCorpColumnDef: any[];
    glTxnReadOnly = false;
    glTxn1ReadOnly = false;
    sysPflReadOnly = false;
    offTxnReadOnly = false;
    offBncReadOnly = false;
    vCorpReadOnly = false;
    perReadOnly = false;
    offOblHtyReadOnly = false;
    tableIndex: number;
    offenderDeductionId: any;
    fieldInfo: string;
    syspflModel: SystemProfiles = new SystemProfiles();
    caseLoadId: any;
    constructor(private ocuobhisFactory: OcuobhisService, public translateService: TranslateService,
        private sessionManager: UserSessionManager) {
        this.glTxn1ColumnDef = [];
        this.offOblHtyColumnDef = [];
        this.perColumnDef = [];
        this.offBncColumnDef = [];
        this.vCorpColumnDef = [];
    }
    ngOnInit() {
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.fieldInfo = this.translateService.translate('ocuobhis.id');
        this.offoblhtyWhenNewInstance();
        if (this.dialog.data) {
            if (this.dialog.data.offenderDeductionId) {
                this.offoblhtyModel = new OffenderObligationHty();
                this.offoblhtyModel.offenderDeductionId = this.dialog.data.offenderDeductionId;
                this.offoblhtyExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.querycaused'));
            }
        }
        this.offOblHtyColumnDef = [
            {
                fieldName: this.translateService.translate('ocuobhis.modifieddate'), field: 'modifiedDateTime',
                editable: false, width: 150, maxlength: 10, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocuobhis.obligationid'), field: 'offenderDeductionId',
                editable: false, width: 150, maxlength: 10, datatype: 'text'
            },
            {
                fieldName: this.fieldInfo, field: 'informationNumber',
                editable: false, width: 150, maxlength: 32, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocuobhis.obligationtype'), field: 'deductionType',
                editable: false, width: 150, maxlength: 6, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocuobhis.adjustedamount'), field: 'adjustedAmount',
                editable: false, width: 150, maxlength: 18, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocuobhis.totalamount'), field: 'maxTotalAmount',
                editable: false, width: 150, maxlength: 18, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocuobhis.modifiedby'), field: 'modifiedUserId',
                editable: false, width: 150, maxlength: 32, datatype: 'text'
            },
        ];
    }
    onRowClickoffoblhty(event) {
    }
    onExitclick() {
        this.dialog.close(true);
    }
    ok() {
    }
    no() {
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    cancel() {
    }
    onGridReady(event) {
    }
    onOffenderChange(offender) {
    }
    offoblhtyWhenNewInstance() {
        this.syspflModel = new SystemProfiles();
        this.syspflModel.profileValue = this.caseLoadId;
        const systemProfResult = this.ocuobhisFactory.whenNewFormInstance(this.syspflModel);
        systemProfResult.subscribe(systemProfileResult => {
            if (systemProfileResult !== null && systemProfileResult.profileValue && systemProfileResult.profileValue2) {
                if (systemProfileResult.profileValue2 === 'COMM' && systemProfileResult.profileValue === 'Y') {
                    this.fieldInfo = this.translateService.translate('ocuobhis.client');
                    this.offOblHtyColumnDef[2].fieldName = this.fieldInfo;
                } else {
                    this.fieldInfo = this.translateService.translate('ocuobhis.id');
                    this.offOblHtyColumnDef[2].fieldName = this.fieldInfo;
                }
                this.grid.prepareAgColumnDef();
            }
        });
    }
    offoblhtyExecuteQuery() {
        const offoblhtyResult = this.ocuobhisFactory.offOblHtyExecuteQuery(this.offoblhtyModel);
        offoblhtyResult.subscribe(offoblhtyResultList => {
            if (offoblhtyResultList.length === 0) {
                this.offoblhtyData = [];
                this.show(this.translateService.translate('common.querycaused'));
            } else {
                for (let i = 0; i < offoblhtyResultList.length; i++) {
                    if (offoblhtyResultList[i].adjustedAmount && offoblhtyResultList[i].adjustedAmount > 0) {
                        offoblhtyResultList[i].adjustedAmount = '$' + offoblhtyResultList[i].adjustedAmount.toFixed(2);
                    } else if (offoblhtyResultList[i].adjustedAmount && offoblhtyResultList[i].adjustedAmount < 0) {
                        offoblhtyResultList[i].adjustedAmount = offoblhtyResultList[i].adjustedAmount.toFixed(2) + '>';
                        offoblhtyResultList[i].adjustedAmount =
                            String(offoblhtyResultList[i].adjustedAmount).replace('-', '<$');
                    } else {
                        offoblhtyResultList[i].adjustedAmount = '$0.00';
                    }
                    if (offoblhtyResultList[i].maxTotalAmount && offoblhtyResultList[i].maxTotalAmount > 0) {
                        offoblhtyResultList[i].maxTotalAmount = '$' + offoblhtyResultList[i].maxTotalAmount.toFixed(2);
                    } else if (offoblhtyResultList[i].maxTotalAmount && offoblhtyResultList[i].maxTotalAmount < 0) {
                        offoblhtyResultList[i].maxTotalAmount = offoblhtyResultList[i].maxTotalAmount.toFixed(2) + '>';
                        offoblhtyResultList[i].maxTotalAmount =
                            String(offoblhtyResultList[i].maxTotalAmount).replace('-', '<$');
                    } else {
                        offoblhtyResultList[i].maxTotalAmount = '$0.00';
                    }

                }
                this.offoblhtyData = offoblhtyResultList;
                this.offoblhtyModel = offoblhtyResultList[0];
            }
        });
    }


}


