import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmfoproService } from '../service/otmfopro.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadDeductionProfiles } from '@inmate/trust/checks/beans/CaseloadDeductionProfiles';
import { CaseloadDedBeneficiaries } from '@inmate/trust/deductions/deductionsmaintenance/beans/CaseloadDedBeneficiaries';
import { CaseloadDeductionDetails } from '@inmate/trust/checks/beans/CaseloadDeductionDetails';
import {
    CaseloadDedBeneficiariesCommitBean
} from '@inmate/trust/deductions/deductionsmaintenance/beans/CaseloadDedBeneficiariesCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { CaseloadDeductionDetailsCommitBean } from '@inmate/trust/checks/beans/CaseloadDeductionDetailsCommitBean';
import { CaseloadDeductionProfilesCommitBean } from '@inmate/trust/checks/beans/CaseloadDeductionProfilesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { TextboxComponent } from '@ui-components/textbox/textbox.component';


@Component({
    selector: 'app-otmfopro',
    templateUrl: './otmfopro.component.html'
})

export class OtmfoproComponent implements OnInit {
	retreveButton: boolean;
    retreveButtonFlag: boolean;
    addRecordCount: number;
    innerMonthlyMax: string;
    innerTotalMax: string;
    innerMinTrustBal: string;
    csldDbenAmountFlag: boolean;
    isDynamicAccCode: boolean;
    @ViewChild('csldDbenGrid', {static: true}) csldDbenGrid: any;
    @ViewChild('csldDdGrid', {static: true}) csldDdGrid: any;
    @ViewChild('maxTotalRef', {static: true}) maxTotalRef: TextboxComponent;
    @ViewChild('caseloadDedProfGrid', { static: true }) caseloadDedProfGrid: any;
    caseloadId: string;
    caseloadtype: string;
    msgs: any[] = [];
    deductionTypeLov: string;
    deductionTypeTitles: any;
    accountCodeLov: string;
    accountCodeTitles: any;
    condiTitles: any;
    commConditionCode: string;
    description: string;
    categoryType: string;
    accountCode: string;
    mode: string;
    cslddpData: CaseloadDeductionProfiles[] = [];
    cslddpModelDup: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    cslddpModel: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    cslddpIndex = 0;
    cslddpInsertList: CaseloadDeductionProfiles[] = [];
    cslddpUpdatetList: CaseloadDeductionProfiles[] = [];
    cslddpDeleteList: CaseloadDeductionProfiles[] = [];
    cslddpCommitModel: CaseloadDeductionProfilesCommitBean = new CaseloadDeductionProfilesCommitBean();
    cslddbenData: CaseloadDedBeneficiaries[] = [];
    cslddbenModel: CaseloadDedBeneficiaries = new CaseloadDedBeneficiaries();
    cslddbenSelect = -1;
    cslddbenModelSelected: CaseloadDedBeneficiaries = new CaseloadDedBeneficiaries();
    cslddbenInsertList: CaseloadDedBeneficiaries[] = [];
    cslddbenUpdatetList: CaseloadDedBeneficiaries[] = [];
    cslddbenDeleteList: CaseloadDedBeneficiaries[] = [];
    csldddData: CaseloadDeductionDetails[] = [];
    cslddbenCommitModel: CaseloadDedBeneficiariesCommitBean = new CaseloadDedBeneficiariesCommitBean();
    csldddModel: CaseloadDeductionDetails = new CaseloadDeductionDetails();
    csldddModelSelected: CaseloadDeductionDetails = new CaseloadDeductionDetails();
    csldddSelect = -1;
    csldddInsertList: CaseloadDeductionDetails[] = [];
    csldddUpdatetList: CaseloadDeductionDetails[] = [];
    csldddDeleteList: CaseloadDeductionDetails[] = [];
    csldddCommitModel: CaseloadDeductionDetailsCommitBean = new CaseloadDeductionDetailsCommitBean();
    csldDbenColumnDef: any[];
    csldDdColumnDef: any[];
    offnotefromdate: Date;
    type: string;
    message: string;
    caseloadDedProfColumnDefs:any[];
    cslDctprfData:CaseloadDeductionProfiles[] = [];
    caseloadDedProfIndex = -1;
    constructor(private otmfoproFactory: OtmfoproService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private amountFormat: AmountFormatUtil,
        private dialogService: DialogService) {
    }
    ngOnInit() {
		this.retreveButton = false;
        this.retreveButtonFlag = false;
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.caseloadtype = this.sessionManager.currentCaseLoadType;
        this.deductionTypeTitles = { 'description': this.trMsg('otmfopro.deductiondesc'), 'code': this.trMsg('otmfopro.deductiontype') };
        this.deductionTypeLov = `otmfopro/cgfkCsldDpDeductionTypeRecordGroup?caseloadType=${this.caseloadtype}`;
        this.accountCodeTitles = { 'description': this.trMsg('otmfopro.accountname'), 'code': this.trMsg('common.code') };
        this.accountCodeLov = `otmfopro/cgfkCsldDpAccountCodeRecordGroup?caseloadType=${this.caseloadtype}`;
        this.condiTitles = {
            code: this.trMsg('otmfopro.ordertype'), categoryType: this.trMsg('otmfopro.categorytype'),
            descriptionType: this.trMsg('common.description'),  commConditionCode: this.trMsg('common.code')
        };
        this.csldDbenColumnDef = [
            { fieldName: this.trMsg('common.personid'), field: 'personId', editable: true, datatype: 'number', maxValue: 99999999999, },
            {
                fieldName: '', field: 'personId2', datatype: 'launchbutton', modal: true, data: 'row', link: 'osipserdialog',
                onLaunchClick: this.onPersonClick
            },
            { fieldName: this.trMsg('common.lastname'), field: 'dspLastName', editable: false, width: 150 },
            { fieldName: this.trMsg('common.firstname'), field: 'dspFirstName', editable: false, width: 150 },
            {
                fieldName: this.trMsg('otmfopro.corporateid'), field: 'corporateId', editable: true, datatype: 'number',
                maxValue: 99999999999,
            },
            {
                fieldName: '', field: 'corporateId2', datatype: 'launchbutton', modal: true, data: 'row', link: 'OTUCPAYE',
                onLaunchClick: this.onCorporateClick
            },
            { fieldName: this.trMsg('otmfopro.corporatename'), field: 'dspCorporateName', editable: false, width: 150 },
            { fieldName: this.trMsg('otmfopro.priority', '*'), field: 'priority', editable: true, width: 150,datatype: 'number', maxValue: 999, format: '1.1-1', minValue: 0, strictFP: true, whole: true },
            { fieldName: this.trMsg('otmfopro.percentage', '*'), field: 'dspPercent', editable: true, width: 150 },
            {
                fieldName: this.trMsg('common.amount', '*'), field: 'amount', editable: true, width: 150, datatype: 'number',
                format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true, cellEditable: this.canCslddbenEditable
            },
        ];
        const receiptTxnType = `otmfopro/cgfkCsldDdReceiptTxnTypeRecordGroup?caseloadType=${this.caseloadtype}`;
        this.csldDdColumnDef = [
            {
                fieldName: this.trMsg('otmfopro.receipttype', '*'), field: 'receiptTxnType', datatype: 'lov', link: receiptTxnType,
                editable: true, width: 150, cellEditable: this.canCsldDdEditable ,source : "OCMTRANS"
            },
            {
                fieldName: this.trMsg('otmfopro.percentage'), field: 'percentage', editable: true, datatype: 'number',
                format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,
            },
            {
                fieldName: this.trMsg('otmfopro.flatrate'), field: 'flatRate', editable: true, datatype: 'number',
                format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,
            },
            {
                fieldName: this.trMsg('otmfopro.mintrustbalance'), field: 'minimumTrustBalanceFlag', datatype: 'checkbox',
                editable: true, width: 150
            },
        ];
        this.caseloadDedProfColumnDefs = [
            {
                fieldName: this.translateService.translate('otmfopro.fixedobligationtype'), required: true, field: 'deductionType',
                editable: true, width: 150, datatype: 'lov', link:  `otmfopro/cgfkCsldDpDeductionTypeRecordGroup?caseloadType=${this.caseloadtype}`, source: "OCMDEDUT",
                titles: this.deductionTypeTitles
            },
            {
                fieldName: this.translateService.translate('otmfopro.creditdeductionto'), required: true, field: 'accountCode',
                editable: true, width: 150, datatype: 'lov', link:  `otmfopro/cgfkCsldDpAccountCodeRecordGroup?caseloadType=${this.caseloadtype}`, source: "OCMCOACT",
                titles: this.accountCodeTitles
            },
            {
                fieldName: this.translateService.translate('otmfopro.monthlymax'), required: false, field: 'monthlyMax',
                editable: true, width: 150, datatype: 'number', formate: '1.2-2', maxValue: '999999999.99', minValue: '1',
            },

            {
                fieldName: this.translateService.translate('otmfopro.totalmax'), required: false, field: 'totalMax',
                editable: true, width: 150, datatype: 'number', formate: '1.2-2', maxValue: '999999999.99', strictFP: true, minValue: '1',
            },

            {
                fieldName: this.translateService.translate('otmfopro.delayrecapture'), required: false, field: 'delayRecapture',
                editable: true, width: 150, datatype: 'number', maxValue: '999', minValue: '1',
            },
            {
                fieldName: '' ,field: 'nbtText' ,datatype: 'text',editable: false,
            },
            {
                fieldName: this.translateService.translate('otmfopro.mintrustbalance'), required: false, field: 'minTrustBal',
                editable: true, width: 150, datatype: 'number', formate: '1.2-2', maxValue:'999999999.99', strictFP: true, minValue: '1',
            },
            {
                fieldName: this.translateService.translate('otmfopro.effectivedate'), required: true,
                field: 'effectiveDate', editable: true, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('otmfopro.expirydate'), required: false,
                field: 'expiryDate', editable: false, width: 150, datatype: 'date'
            },

            {
                fieldName: this.translateService.translate('otmfopro.sequence'), required: false, field: 'listSeq',
                strictFP: true, whole: true, maxValue: '999', editable: true, width: 150, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('otmfopro.calculateon'), field: 'nbtModifyUserId',
                editable: true, width: 150, datatype: 'lov',domain: "BALANCE_TYPE"
            },

            {
                fieldName: this.translateService.translate('otmfopro.unlimiteddeduction'), field: 'coCreditWhenIndigentFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('otmfopro.foralloffenders'), field: 'foAlAllOffenderFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('otmfopro.conditiontype'), field: 'commConditionType',
                editable: true, width: 150, datatype: 'lov', link:'otmfopro/rgConditionRecordGroup',source : "OCMCONDI",
                titles:this.condiTitles
            },
            {
                fieldName: '' ,field: 'commConditionCode' ,datatype: 'text',editable: false,
            },
            {
                fieldName: '' ,field: 'categoryType' ,datatype: 'text',editable: false,
            },
            {
                fieldName: '' ,field: 'description' ,datatype: 'text',editable: false,
            },
        ];
		this.addRecordCount = 1;	
        this.otmfoproexecuteQuery();
    }
    /**
     * This function displays the messages
     */
    /**
      * This function displays the messages
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
    allowNumbers(event) {
    }
    onRowClickcslddben(event) {
        if (event) {
        this.cslddbenModelSelected = event;
        } else {
            this.cslddbenModelSelected = new CaseloadDedBeneficiaries();
        }
    }
    onRowClickcslddd(event) {
        if (event) {
            this.csldddModelSelected = event;
            } else {
                this.csldddModelSelected = new CaseloadDeductionDetails();
            }
    }
    ok() {
        this.cslddpIndex = 0;
        this.otmfoproexecuteQuery();
    }

    otmfoproSavecslDctionPrf(fromDate?) {
        if (fromDate) {
		
			if (String(fromDate.lastValue).indexOf('_') >= 0 && fromDate.value === null) {
				this.type = 'warn';
				this.show('ocdclogs.dateformate');
				this.offnotefromdate = undefined;
				return;
			}
		}
        if (String(this.offnotefromdate).indexOf('_') >= 0 && this.offnotefromdate === null) {
			this.type = 'warn';
			this.show('common.datemustbeentervalidformat');
			return false;
		}
        if (this.csldDbenGrid) {
            const added = [];
            this.csldDbenGrid.addedMap.forEach((value) => { added.push(value); });
            const removed = [];
            this.csldDbenGrid.removedMap.forEach((value) => { removed.push(value); });
            const updated = [];
            this.csldDbenGrid.updatedMap.forEach((value) => { updated.push(value); });
            this.cslddpModel.caseloadDedBeneficiariesCommitBean = new CaseloadDedBeneficiariesCommitBean();
            if (!this.otmfoproSavecslddbenForm({ added: added, updated: updated, removed: removed })) {
                return false;
            }
        }
        const csldDEvent = { added: [], updated: [], removed: [] };
        if (this.csldDdGrid) {
            const added = [];
            this.csldDdGrid.addedMap.forEach((value) => { added.push(value); });
            const removed = [];
            this.csldDdGrid.removedMap.forEach((value) => { removed.push(value); });
            const updated = [];
            this.csldDdGrid.updatedMap.forEach((value) => { updated.push(value); });
            csldDEvent.added = added;
            csldDEvent.removed = removed;
            csldDEvent.updated = updated;
            if (csldDEvent.added.length > 0 || csldDEvent.removed.length > 0 || csldDEvent.removed.length > 0) {
                this.preCommit(csldDEvent);
                return;
            }

        }
        this.preCommit(csldDEvent);

    }

    preCommit(event) {
        this.otmfoproFactory.preCommit(this.caseloadId, this.cslddpModel.deductionType)
            .subscribe(data => {
                if (data) {
                    if (this.cslddpModel.deductionType && this.cslddpModel.foAlAllOffenderFlag && this.cslddpModel.nbtModifyUserId === 'OB'
                        && data.per !== null && data.extPrioNo !== 0) {
                        const dlgData = {
                            label: this.trMsg('otmfopro.pleaseaccessthemaintaindeduction'),
                            yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50).subscribe(result => {
                            if (result) {
                                this.afterPreCommit(event);
                            } else {
                                this.oncsldDdClear();
                            }
                        });
                    } else {
                        this.afterPreCommit(event);
                    }
                }
				this.retreveButtonFlag = false;
            });
    }

    afterPreCommit(csldddevent) {
        if (!this.otmfoproSavecsldddForm(csldddevent)) {
            return false;
        }
        const event = { added: [], removed: [], updated: [] };
        if (this.cslddpModel['createDateTime']) {
            event.updated.push(JSON.parse(JSON.stringify(this.cslddpModel)));
        } else {
            event.added.push(JSON.parse(JSON.stringify(this.cslddpModel)));
        }

        this.otmfoproSavecslddpForm(event);
    }

    cancel() {
    }
    next() {
        this.cslddpIndex++;
        this.cslddpModel = this.cslddpData[this.cslddpIndex];
        this.cslddpModelDup = JSON.parse(JSON.stringify(this.cslddpModel));
        this.isDynamicAccCode = true;
        this.accountCode = String(this.cslddpModel.accountCode);
        this.cslddbenExecuteQuery();
        this.csldddExecuteQuery();
    }
    previous() {
        this.cslddpIndex--;
        this.cslddpModel = this.cslddpData[this.cslddpIndex];
        this.cslddpModelDup = JSON.parse(JSON.stringify(this.cslddpModel));
        this.isDynamicAccCode = true;
        this.accountCode = String(this.cslddpModel.accountCode);
        this.cslddbenExecuteQuery();
        this.csldddExecuteQuery();
    }
    onOffenderChange(offender) {
    }

    onConditionTypeChange(event) {
        if (event) {

            this.commConditionCode = event.commConditionCode;
            this.categoryType = event.categoryType;
            this.description = event.descriptionType;
        } else {
            this.commConditionCode = null;
            this.categoryType = null;
            this.description = null;
        }
    }
    onPersonClick = (data) => {
        const index = this.cslddbenData.indexOf(data);

        this.perionDialog(data, index);
        return false;
    }

    perionDialog(data, index) {
        const reqData = data.personId || data.personId === 0 ?
            { forwardToDialog: true, person: { pPersonId: data.personId, pSearchType: 'I' } } :
            { forwardToDialog: true, person: { pPersonId: null, pSearchType: 'N' } };

        this.dialogService.openLinkDialog('osipserdialog', reqData).subscribe(resData => {
            if (resData) {
                this.addPersonValue(resData, index);
            }
        });

    }

    addPersonValue(data, index) {
        if (data) {
            this.csldDbenGrid.setColumnData('personId', index, data.personId);
            this.csldDbenGrid.setColumnData('dspLastName', index, data.lastName);
            this.csldDbenGrid.setColumnData('dspFirstName', index, data.firstName);
            this.csldDbenGrid.setColumnData('corporateId', index, null);
            this.csldDbenGrid.setColumnData('dspCorporateName', index, null);
        }
    }

    validatePersonId(personId, index) {
        this.otmfoproFactory.cgfkchkCsldDbenCsldDben(personId).subscribe(data => {
            if (data && !data.errorMessage) {
                this.addPersonValue(data, index);
            } else {
                this.show(`Person ID: ${personId} does not exist.`);
                this.csldDbenGrid.setColumnData('personId', index, null);
                this.csldDbenGrid.setColumnData('dspLastName', index, null);
                this.csldDbenGrid.setColumnData('dspFirstName', index, null);
            }
        });
    }

    onCorporateClick = (data) => {
        const index = this.cslddbenData.indexOf(data);

        this.corporatDialog(data, index);
        return false;
    }

    corporatDialog(data, index) {
        const reqData = { corporateId: data.corporateId };
        this.dialogService.openLinkDialog('OTUCPAYE', reqData).subscribe(resData => {
            if (resData) {
                this.addcorporatValue(resData, index);
            }
        });
    }

    addcorporatValue(data, index) {
        if (data) {
            if (data.corporateId) {
                this.csldDbenGrid.setColumnData('corporateId', index, data.corporateId);
                this.csldDbenGrid.setColumnData('personId', index, null);
                this.csldDbenGrid.setColumnData('dspLastName', index, null);
                this.csldDbenGrid.setColumnData('dspFirstName', index, null);
            }
            if (data.corporateName) {
                this.csldDbenGrid.setColumnData('dspCorporateName', index, data.corporateName);
            }
            if (data.corpName) {
                this.csldDbenGrid.setColumnData('dspCorporateName', index, data.corpName);
            }
        }
    }

    validateCorporateId(corporateId, index) {
        this.otmfoproFactory.cgfkchkCsldDbenCsldDbenC(corporateId).subscribe(data => {
            if (data && !data.errorMessage) {
                this.addcorporatValue(data, index);
            } else {
                this.show('otmfopro.invalidvalueforfieldcorporateid');
                this.csldDbenGrid.setColumnData('corporateId', index, null);
                this.csldDbenGrid.setColumnData('dspCorporateName', index, null);
            }
        });
    }

    csldDbenValidate = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        rowdata.validated = true;
        if (String(event.newValue) !== String(event.oldValue)) {
            if (event.field === 'personId') {
                if (event.newValue) {
                    this.validatePersonId(Number(event.newValue), index);
                } else {
                    this.csldDbenGrid.setColumnData('dspLastName', index, null);
                    this.csldDbenGrid.setColumnData('dspFirstName', index, null);
                }
            } if (event.field === 'corporateId') {
                if (event.newValue) {
                    this.validateCorporateId(Number(event.newValue), index);
                } else {
                    this.csldDbenGrid.setColumnData('dspCorporateName', index, null);
                }
            } if (event.field === 'priority') {
                if (event.newValue) {
                    if (!(Number(event.newValue) >= 1 && Number(event.newValue) <= 999)) {
                        this.show('otmfopro.prioritymustbeinrange');
                        this.csldDbenGrid.setColumnData('priority', index, null);
                    }
                }
            }
        }
        return rowdata;
    }

    csldDdValidate = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (String(event.newValue) !== String(event.oldValue)) {
            if (event.field === 'minimumTrustBalanceFlag') {
                if (this.isNull(this.cslddpModel.minTrustBal) && event.newValue) {
                    this.csldDdGrid.setColumnData('minimumTrustBalanceFlag', index, null);
                    this.show('common.youcannotcheckthisflagsince');
                }
            }
            if (event.field === 'percentage') {
                if (event.newValue) {
                    const percentage = Number(event.newValue);
                    if (!(percentage >= 1 && percentage <= 100)) {
                        this.show('otmfopro.percentagemustbeinrange');
                        this.csldDdGrid.setColumnData('percentage', index, null);
                    }
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    onDeductionTypeChng(event) {
        if (event) {
			if (!this.retreveButtonFlag) {
                this.retreveButton = false;
            }
            this.otmfoproFactory.calculateOn(event.code).subscribe(data => {
                if (data && typeof data === 'string') {
                    this.cslddpModel.nbtModifyUserId = data;
                } else {
                    this.cslddpModel.nbtModifyUserId = this.cslddpModel.nbtModifyUserId === '' ? undefined : '';
                }
            });
        } else {
            this.cslddpModel.nbtModifyUserId = this.cslddpModel.nbtModifyUserId === '' ? undefined : '';
        }

    }

    onTotalMaxChange(event, maxTotalRef) {
        this.amountFormat.precisionFlot(maxTotalRef);
        if (!this.isNull(event)) {
            this.cslddpModel.monthlyMax = null;
            this.cslddpModel.maxRecursiveAmount = null;
            this.cslddpModel.coCreditWhenIndigentFlag = null;
            this.csldDbenAmountFlag = true;
        } else {
            if (!this.cslddpModel.monthlyMax
                && !this.cslddpModel.maxRecursiveAmount && this.cslddpModel.maxRecursiveAmount !== 0) {
                this.cslddpModel.coCreditWhenIndigentFlag = 'Y';
                this.csldDbenAmountFlag = false;
            }
        }
    }

    onMaxTotalKeyDown(event) {
        if (!this.amountFormat.avoidKeys(event, this.cslddpModel.totalMax
        )) {
            event.stopPropagation();
            return false;
        }
    }

    onRecursiveMaxChange(event) {
        if (event || event === 0) {
            this.cslddpModel.monthlyMax = null;
            this.cslddpModel.totalMax = null;
            this.cslddpModel.coCreditWhenIndigentFlag = null;
            this.csldDbenAmountFlag = true;
        } else {
            if (!this.cslddpModel.monthlyMax && !this.cslddpModel.totalMax) {
                this.cslddpModel.coCreditWhenIndigentFlag = 'Y';
                this.csldDbenAmountFlag = false;
            }
        }
    }

    minTrustBalChange(minTrustRef) {
        this.amountFormat.precisionFlot(minTrustRef);
        if (this.caseloadId && this.cslddpModel.deductionType) {
            this.otmfoproFactory.countMinBalLogic(this.caseloadId, this.cslddpModel.deductionType).subscribe(vCouonter => {
                if (vCouonter > 0) {
                    this.show(`otmfopro.pleaseuncheckminimumtrustbalance`);
                    this.cslddpModel.minTrustBal = null;
                }
            });
        }

    }

    minTrustKeyDown(eventf) {
        if (!this.amountFormat.avoidKeys(event, this.cslddpModel.minTrustBal)) {
            event.stopPropagation();
            return false;
        }
    }

    /**
    * This function loads the data into the Master Record and its child records
    */
    otmfoproPopulateDetails() {

    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmfoproSavecslddpForm(event) {

        this.cslddpInsertList = event.added;
        this.cslddpUpdatetList = event.updated;
        this.cslddpDeleteList = event.removed;
        this.cslddpCommitModel.insertList = [];
        this.cslddpCommitModel.updateList = [];
        this.cslddpCommitModel.deleteList = [];
        for (let i = 0; i < this.cslddpInsertList.length; i++) {
            if (this.cslddpInsertList[i].effectiveDate) {
                if (DateFormat.compareDate(DateFormat.getDate(this.cslddpInsertList[i].effectiveDate), DateFormat.getDate()) === -1) {
                    this.show(this.translateService.translate('otmfopro.effectiveearliertodaydate'));
                    return;
                }
            }
            if (this.cslddpInsertList[i].expiryDate) {
                if (this.cslddpInsertList[i].effectiveDate && this.cslddpInsertList[i].expiryDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.cslddpInsertList[i].effectiveDate),
                        DateFormat.getDate(this.cslddpInsertList[i].expiryDate)) === -1) {
                        this.show(this.translateService.translate('common.effectieexpirydatevalidation'), 'warn');
                        return;
                    }
                }
            }
        }
        this.cslddpInsertList.forEach(ele => {
            ele.caseloadId = this.caseloadId;
            ele.caseloadType = this.caseloadtype;
            ele.coCreditWhenIndigentFlag = ele.coCreditWhenIndigentFlag ? 'Y' : 'N';
            ele.foAlAllOffenderFlag = ele.foAlAllOffenderFlag ? 'Y' : 'N';
            ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
            ele.maxMonthlyAmount = !this.isNull(ele.monthlyMax) ? Number(ele.monthlyMax) : null;
            ele.maxTotalAmount = !this.isNull(ele.totalMax) ? Number(ele.totalMax) : null;
            ele.minimumTrustBalance = !this.isNull(ele.minTrustBal) ? Number(ele.minTrustBal) : null;
        });

        for (let i = 0; i < this.cslddpUpdatetList.length; i++) {
           if (this.cslddpUpdatetList[i].effectiveDate) {
                if (DateFormat.compareDate(DateFormat.getDate(this.cslddpUpdatetList[i].effectiveDate), DateFormat.getDate()) === -1) {
                    this.show(this.translateService.translate('otmfopro.effectiveearliertodaydate'));
                    return;
                }
            }
            if (this.cslddpUpdatetList[i].expiryDate) {
                if (this.cslddpUpdatetList[i].effectiveDate && this.cslddpUpdatetList[i].expiryDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.cslddpUpdatetList[i].effectiveDate),
                        DateFormat.getDate(this.cslddpUpdatetList[i].expiryDate)) === 0) {
                        this.show(this.translateService.translate('common.effectieexpirydatevalidation'), 'warn');
                        return;
                    }
                }
            }
        }
        this.cslddpUpdatetList.forEach(ele => {
            ele.coCreditWhenIndigentFlag = ele.coCreditWhenIndigentFlag ? 'Y' : 'N';
            ele.foAlAllOffenderFlag = ele.foAlAllOffenderFlag ? 'Y' : 'N';
            ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
            ele.maxMonthlyAmount = !this.isNull(ele.monthlyMax) ? Number(ele.monthlyMax) : null;
            ele.maxTotalAmount = !this.isNull(ele.totalMax) ? Number(ele.totalMax) : null;
            ele.minimumTrustBalance = !this.isNull(ele.minTrustBal) ? Number(ele.minTrustBal) : null;
        });

        this.cslddpCommitModel.insertList = this.cslddpInsertList;
        this.cslddpCommitModel.updateList = this.cslddpUpdatetList;
        this.cslddpCommitModel.deleteList = this.cslddpDeleteList;
        const cslddpSaveData = this.otmfoproFactory.singleCommit(this.cslddpCommitModel);
        cslddpSaveData.subscribe(data => {
            if (String(data) === '1') {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.csldDbenGrid.addedMap.clear();
                this.csldDbenGrid.updatedMap.clear();
                this.csldDbenGrid.removedMap.clear();
                this.csldDdGrid.addedMap.clear();
                this.csldDdGrid.updatedMap.clear();
                this.csldDdGrid.removedMap.clear();
            } else if (String(data).includes('deduction_profiles_pk')) {
                this.show('otmfopro.rowexistsalreadywithsamecaseloadid');
                return;
            } else if (String(data).includes('caseload_deduction_profiles_u1')) {
                this.show('otmfopro.rowexistsalreadywithsamecaseloadidexternalpriorityno');
                return;
            } else if (String(data).includes('csld_dben_pk')) {
                this.show('otmfopro.rowexistsalreadywithsamecaseloadded');
                return;
            } else if (String(data).includes('csld_dben_uk1')) {
                this.show('otmfopro.rowexistsalreadywithsamecaseloadiddeductiontype');
                return;
            } else if (String(data).includes('csld_dd_pk')) {
                this.show('otmfopro.rowexistsalreadywithsamecaseloadidreceipttxntype');
                return;
            } else if (String(data).includes('dedprof_dedtype_f2')) {
                this.show('otmfopro.thisdeductiontypedoesnotexist');
                return;
            } else if (String(data).includes('tran_fd_csld_dp_fk1')) {
                this.show('otmfopro.cannotdeletecaseloaddedwhile');
                return;
            } else if (String(data).includes('tier_fa_csld_dd_f1')) {
                this.show('otmfopro.cannotdeletecaselwhiledependent');
                return;
            } else if (String(data).includes('off_ded_csld_dd_f1')) {
                this.show('otmfopro.cannotdeletecaseloaddeductiwhile');
                return;
            } else if (String(data).includes('csld_dben_csld_dp_fk1')) {
                this.show('otmfopro.cannotdeletecaseloadwhile');
                return;
            } else if (String(data).includes('?')) {
                this.show('common.addupdateremoverecordfailed', 'error');
            }else if (data===18) {
                this.show('otmfopro.rowexistsalreadywithsamecaseloadidreceipttxntype','error');
            } else {
                this.show(data);
                return;
            }
            this.otmfoproexecuteQuery(true);
        });
    }
    otmfoproexecuteQuery(afterSaved?) {
        const saved = { deductionType: null };
        if (afterSaved) {
            saved.deductionType = this.cslddpModel.deductionType;
            this.cslddpModel = new CaseloadDeductionProfiles();
        } else {
            this.cslddpIndex = 0;
        }
        this.cslddpModel.caseloadId = this.caseloadId;
        this.cslddpModel.caseloadType = this.caseloadtype;
       // this.cslddpModel.listSeq = 99;
        const serviceObj = this.otmfoproFactory.
            csldDpExecuteQuery(this.cslddpModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.show('common.querycaused');
                this.cslddpData=[];
            } else if (data !== undefined && data.length > 0 && data[0].errorMessage) {
                this.show('common.querycaused');
            } else {
                data.forEach(ele => {

                    ele.coCreditWhenIndigentFlag = ele.coCreditWhenIndigentFlag === 'Y' ? true : null;
                    ele.foAlAllOffenderFlag = ele.foAlAllOffenderFlag === 'Y' ? true : null;
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : null;
                    ele.monthlyMax = !this.isNull(ele.maxMonthlyAmount) ? Number(ele.maxMonthlyAmount).toFixed(2) : null;
                    ele.totalMax = !this.isNull(ele.maxTotalAmount) ? Number(ele.maxTotalAmount).toFixed(2) : null;
                    ele.minTrustBal = !this.isNull(ele.minimumTrustBalance) ? Number(ele.minimumTrustBalance).toFixed(2) : null;
                    ele.accountCode = String(ele.accountCode);
                    if (ele.delayRecapture) {
                        ele.nbtText = 'Days from Date of First Txn';
                    }
                });
                this.cslddpData = data;
                this.caseloadDedProfIndex = 0;
            }
        });
    }
    
    caseloadDedProfOnRowClick(event) {
        if (event) {
            this.cslddpModel = event;
            this.cslddbenExecuteQuery();
            this.csldddExecuteQuery();
        }
    }

    cslddbenExecuteQuery() {
        this.cslddbenSelect = -1;
        this.cslddbenModel.caseloadId = this.cslddpModel.caseloadId;
        this.cslddbenModel.deductionType = this.cslddpModel.deductionType;
        const cslddbenResult = this.otmfoproFactory.
            csldDbenExecuteQuery(this.cslddbenModel);
        cslddbenResult.subscribe(cslddbenResultList => {
            if (cslddbenResultList.length === 0) {
                this.cslddbenData = [];
            } else {
                cslddbenResultList.forEach(ele => {
                    ele.personId2 = '...';
                    ele.corporateId2 = '...';
                    if (ele.percent) {
                        ele.dspPercent = Number(ele.percent).toFixed(2);
                    } else {
                        ele.dspPercent = '0.00';
                    }
                });
                this.cslddbenData = cslddbenResultList;
                this.cslddbenSelect = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmfoproSavecslddbenForm(event) {
        if (!this.otmfoproValidation(this.cslddbenData)) {
            return false;
        }
        this.cslddbenInsertList = event.added;
        this.cslddbenUpdatetList = event.updated;
        this.cslddbenDeleteList = event.removed;
        this.cslddbenCommitModel.insertList = [];
        this.cslddbenCommitModel.updateList = [];
        this.cslddbenCommitModel.deleteList = [];

        for (let i = 0; i < this.cslddbenInsertList.length; i++) {
            if (this.cslddbenInsertList[i].personId === null && this.cslddbenInsertList[i].corporateId === null) {
                this.show(this.translateService.translate('otmfopro.eitherpersonidorcorporateidshouldbeselected'));
                return;
            }
        }

        this.cslddbenInsertList.forEach(ele => {
            ele.caseloadId = this.cslddpModel.caseloadId;
            ele.deductionType = this.cslddpModel.deductionType;
            ele.percent = Number(ele['dspPercent']);
        });

        for (let i = 0; i < this.cslddbenUpdatetList.length; i++) {
            if (this.cslddbenUpdatetList[i].personId === null && this.cslddbenUpdatetList[i].corporateId === null) {
                this.show(this.translateService.translate('otmfopro.eitherpersonidorcorporateidshouldbeselected'));
                return;
            }
        }
        this.cslddbenCommitModel.insertList = this.cslddbenInsertList;
        this.cslddbenCommitModel.updateList = this.cslddbenUpdatetList;
        this.cslddbenCommitModel.deleteList = this.cslddbenDeleteList;
        // this.cslddpModel.caseloadDedBeneficiariesCommitBean = this.cslddbenCommitModel;
        const cslddpSaveData = this.otmfoproFactory.csldDbenCommit(this.cslddbenCommitModel);
        cslddpSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.cslddbenExecuteQuery();
            }else{
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });
    }

    otmfoproValidation(list: any[]) {
        const isvalid = { valid: true };
        if (list && Array.isArray(list)) {
            list.forEach(ele => {
                if (this.isNull(ele.priority)) {
                    this.show('otmfopro.prioritymustbeenter');
                    isvalid.valid = false;
                    return;
                }
                if (!(Number(ele.priority) >= 1 && Number(ele.priority) <= 999)) {
                    this.show('otmfopro.prioritymustbeinrange');
                    isvalid.valid = false;
                    return;
                }
                if (!ele.dspPercent) {
                    this.show('otmfopro.prioritymustbeenter');
                    isvalid.valid = false;
                    return;
                }
                if (this.isNull(ele.amount)) {
                    this.show('otmfopro.amountmustbeenter');
                    isvalid.valid = false;
                    return;
                }
                if (!this.isNull(ele.personId) && !this.isNull(ele.corporateId)) {
                    this.show('otmfopro.onlypersonidorcorporateid');
                    isvalid.valid = false;
                    return;
                }
            });

        }
        return isvalid.valid;
    }
    isNull(value) {
        return value === null || value === undefined || value === '';
    }
    csldddExecuteQuery() {
        this.csldddSelect = -1;
        this.csldddModel.caseloadId = this.cslddpModel.caseloadId;
        this.csldddModel.deductionType = this.cslddpModel.deductionType;
        const csldddResult = this.otmfoproFactory.
            csldDdExecuteQuery(this.csldddModel);
        csldddResult.subscribe(csldddResultList => {
            if (csldddResultList.length === 0) {
                this.csldddData = [];
            } else {
                csldddResultList.forEach(ele => {
                    ele.minimumTrustBalanceFlag = ele.minimumTrustBalanceFlag === 'Y' ? true : false;
                });
                this.csldddData = csldddResultList;
                this.csldddSelect = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmfoproSavecsldddForm(event) {
        if (!this.csldddValidation(this.csldddData)) {
            return false;
        }
        this.csldddInsertList = event.added;
        this.csldddUpdatetList = event.updated;
        this.csldddDeleteList = event.removed;
        this.csldddCommitModel.insertList = [];
        this.csldddCommitModel.updateList = [];
        this.csldddCommitModel.deleteList = [];

        this.csldddInsertList.forEach(ele => {
            ele.minimumTrustBalanceFlag = ele.minimumTrustBalanceFlag ? 'Y' : 'N';
            ele.caseloadId = this.caseloadId;
            ele.deductionType = this.cslddpModel.deductionType;
        });
        this.csldddUpdatetList.forEach(ele => {
            ele.minimumTrustBalanceFlag = ele.minimumTrustBalanceFlag ? 'Y' : 'N';
        });

        this.csldddCommitModel.insertList = this.csldddInsertList;
        this.csldddCommitModel.updateList = this.csldddUpdatetList;
        this.csldddCommitModel.deleteList = this.csldddDeleteList;
        // this.cslddpModel.caseloadDeductionDetailsCommitBean = this.csldddCommitModel;
        const cslddpSaveData = this.otmfoproFactory.csldDdCommit(this.csldddCommitModel);
        cslddpSaveData.subscribe(data => {
            if (String(data) === '1') {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.csldddExecuteQuery();
            }else if (String(data).includes('3')) {
                this.show('otmfopro.rowexistsalreadywithsamecaseloadidreceipttxntype');
                return;
            }else{
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        }); 
    }
    csldddValidation(list: any[]) {
        const isValid = { valid: true };
        if (list && Array.isArray(list)) {
            list.forEach(ele => {
                if (!ele.receiptTxnType) {
                    this.show('otmfopro.receipttypemustbeentered');
                    isValid.valid = false;
                    return;
                }
                if (!this.isNull(ele.percentage) && !this.isNull(ele.flatRate)) {
                    this.show('otmfopro.onlypercentageorflat');
                    isValid.valid = false;
                    return;
                }
                if (!this.isNull(ele.percent)) {
                    if (!(Number(ele.percentage) >= 1 && Number(ele.percentage) <= 100)) {
                        this.show('otmfopro.percentagemustbeinrange');
                        isValid.valid = false;
                        return;
                    }
                }
                if (!this.cslddpModel.minTrustBal && ele.minimumTrustBalanceFlag) {
                    this.show('otmfopro.pleaseuncheckminimumtrustbalance');
                    isValid.valid = false;
                    return;
                }
            });
        }
        return isValid.valid;
    }

    onUnlimitedChange(event) {
        if (event.checked) {
            this.cslddpModel.maxRecursiveAmount = null;
            this.cslddpModel.monthlyMax = null;
            this.cslddpModel.totalMax = null;
            this.unlimitedAmount();
            this.csldDbenAmountFlag = false;
        } else {
            if (this.maxTotalRef) {
                this.maxTotalRef.value = '0.00';
            }
            this.limitedAmount();
            this.csldDbenAmountFlag = true;
        }
    }

    unlimitedAmount() {
        this.cslddbenData.forEach(ele => {
            const index = this.cslddbenData.indexOf(ele);
            this.csldDbenGrid.setColumnData('amount', index, '999999999.99');
        });
        const dlgData = {
            label: this.trMsg('otmfopro.doyouwishtocommit'),
            yesBtn: true, noBtn: true
        };
    }

    limitedAmount() {
        this.cslddbenData.forEach(ele => {
            const index = this.cslddbenData.indexOf(ele);
            this.csldDbenGrid.setColumnData('amount', index, '0.00');
        });
    }

    oncsldDbenInsert = () => {
        if (!this.cslddpModel || !this.cslddpModel['createDateTime']) {
            this.show('otmfopro.insertofcaseloaddedmust');
            return null;
        } else if (!this.otmfoproValidation(this.cslddbenData)) {
            return false;
        } else {
            if (!this.otmfoproValidation(this.cslddbenData)) {
                return null;
            }
            const data = {
                personId: null, personId2: '...', dspLastName: null, dspFirstName: null, corporateId: null, corporateId2: '...',
                dspCorporateName: null, priority: null, dspPercent: '100.00',
                 amount: this.cslddpModel.coCreditWhenIndigentFlag ? 999999999.99 : 0.00
            };
            return data;
        }
    }

    oncsldDdInsert = () => {
        if (!this.cslddpModel || !this.cslddpModel['createDateTime']) {
            this.show('otmfopro.insertofcaseloaddedumust');
            return null;
        } else {
            if (!this.csldddValidation(this.csldddData)) {
                return null;
            }
            const data = new CaseloadDeductionDetails();
            return data;
        }
    }

    canCsldDdEditable = (data: any, index: number, field: string): boolean => {
        if (field === 'receiptTxnType') {
            if (data.createDatetime) {
                return false;
            }
        }
        return true;
    }
    canCslddbenEditable = (data: any, index: number, field: string) => {
        if (field === 'amount') {
            if (this.cslddpModel.coCreditWhenIndigentFlag) {
                return false;
            }
        }
        return true;
    }

    oncsldDbenGInsert() {
        this.csldDbenGrid.addRecord(this.csldDbenGrid.gridOptions);
    }

    oncsldDbenDelete() {
        this.csldDbenGrid.removeRecord(this.csldDbenGrid.gridOptions);
    }

    oncsldDbenClear() {
        this.csldDbenGrid.clearRecords(this.csldDbenGrid.gridOptions);
    }

    oncsldDdGInsert() {
        this.csldDdGrid.addRecord(this.csldDdGrid.gridOptions);
    }

    oncsldDdDelete() {
        this.csldDdGrid.removeRecord(this.csldDdGrid.gridOptions);
    }

    oncsldDdClear() {
        this.csldDdGrid.clearRecords(this.csldDdGrid.gridOptions);
    }

    onSeqBlur() {
        if (!this.isNull(this.cslddpModel.listSeq)) {
            if (!(this.cslddpModel.listSeq >= -999999 && this.cslddpModel.listSeq <= 999999)) {
                this.show('otmfopro.seqmstnrnge');
                this.cslddpModel.listSeq = null;
            }
        }
    }

    onDelayBlur() {
        if (!this.isNull(this.cslddpModel.delayRecapture)) {
            if (!(this.cslddpModel.delayRecapture >= 1 && this.cslddpModel.delayRecapture <= 999)) {
                this.show('otmfopro.delayrecapturemustbe');
                this.cslddpModel.deductionType = null;
            }
        }
    }
	    onEffectiveChange(event) {
        if (event) {
            if (!this.retreveButtonFlag) {
                this.retreveButton = false;
            }
           
        }
    }
    onRowClickcslDctionPrf(event){

    }
    /* otmfoproSavecslDctionPrf(event){

    } */
   
    caseloadDedProfValidate = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;

        if (event.field === 'coCreditWhenIndigentFlag' && (event.newValue !== event.oldValue)) {
            if (event.data.coCreditWhenIndigentFlag === false) {
                this.caseloadDedProfGrid.setColumnData('totalMax', rowIndex, '0.00');
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.caseloadDedProfGrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.caseloadDedProfGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }

        if (event.field === 'monthlyMax') {
            if (event.data.monthlyMax) {
                this.caseloadDedProfGrid.setColumnData('monthlyMax', rowIndex, Number(event.data.monthlyMax).toFixed(2));
                this.caseloadDedProfGrid.setColumnData('totalMax', rowIndex, undefined);
            }
        }
        if (event.field === 'totalMax') {
            if (event.data.totalMax) {
                this.caseloadDedProfGrid.setColumnData('totalMax', rowIndex, Number(event.data.totalMax).toFixed(2));
                this.caseloadDedProfGrid.setColumnData('monthlyMax', rowIndex, undefined);
            }
        }
        if (event.field === 'minTrustBal') {
            if (event.data.minTrustBal) {
                this.caseloadDedProfGrid.setColumnData('minTrustBal', rowIndex, Number(event.data.minTrustBal).toFixed(2));
            }
        }
        if (event.field === 'deductionType' && (event.newValue !== event.oldValue)) {
            if (event.data.deductionType) {
                this.otmfoproFactory.calculateOn(event.data.deductionType).subscribe(data => {
                    if (data && typeof data === 'string') {
                        this.caseloadDedProfGrid.setColumnData('nbtModifyUserId', rowIndex, data);
                    } else {
                        this.caseloadDedProfGrid.setColumnData('nbtModifyUserId', rowIndex, undefined);
                    }
                });
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'delayRecapture') {
            if (event && event.data.delayRecapture) {
                this.caseloadDedProfGrid.setColumnData('nbtText', rowIndex, 'Days from Date of First Txn');
            } else {
                this.caseloadDedProfGrid.setColumnData('nbtText', rowIndex, '');
            }
            rowdata.validated = true;
            return rowdata;
        }
        if (event.field === 'effectiveDate' && event.data.effectiveDate) {
            if (DateFormat.compareDate(DateFormat.getDate(event.data.effectiveDate),DateFormat.getDate())=== -1) {
                this.show(this.translateService.translate('otmfopro.effectiveearliertodaydate'));
            }
        }
        if (event.field === 'expiryDate' && event.data.expiryDate) {
            if (event.data.effectiveDate && event.data.expiryDate) {
                if (DateFormat.compareDate(DateFormat.getDate(event.data.effectiveDate),
                    DateFormat.getDate(event.data.expiryDate)) === 0) {
                    this.show(this.translateService.translate('common.effectieexpirydatevalidation'), 'warn');
                    rowdata.validated = true;
                    return rowdata;
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    oncslDtionPrfInsert = () =>{
        return{
            coCreditWhenIndigentFlag : true, activeFlag: true,listSeq: 99
        }
    }

    onClear = () => {
        this.csldddExecuteQuery();
        return true;
    }
}

