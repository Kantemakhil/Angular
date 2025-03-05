import { OffenderDeductionsCommitBean } from '@inmate/trust/deductions/beans/OffenderDeductionsCommitBean';
import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdocfeeService } from '../service/otdocfee.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderDeductions } from '@inmate/trust/trustaccounts/beans/OffenderDeductions';
import { OffenderTxnFeeDetails } from '../beans/OffenderTxnFeeDetails';
import { OffenderTierTxnFeeAmounts } from '../beans/OffenderTierTxnFeeAmounts';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderTxnFeeDetailsCommitBean } from '../beans/OffenderTxnFeeDetailsCommitBean';
import { OffenderTierTxnFeeAmountsCommitBean } from '../beans/OffenderTierTxnFeeAmountsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';


@Component({
    selector: 'app-otdocfee',
    templateUrl: './otdocfee.component.html'
})

export class OtdocfeeComponent implements OnInit {
    @ViewChild('offTfd', {static: true}) offTfd: any;
    @ViewChild('offttf', {static: true}) offttf: any;
    lvuntsTotalData: any[] = [];
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offdedData: OffenderDeductions[] = [];
    offdedDataTemp: OffenderDeductions[] = [];
    offdedCommitModel: OffenderDeductionsCommitBean = new OffenderDeductionsCommitBean();
    offdedModel: OffenderDeductions = new OffenderDeductions();
    offdedIndex = 0;
    caseloadFlag = false;
    bookingFlag = true;
    offdedInsertList: OffenderDeductions[] = [];
    offdedUpdatetList: OffenderDeductions[] = [];
    offdedDeleteList: OffenderDeductions[] = [];
    offtfdData: OffenderTxnFeeDetails[] = [];
    offtfdDataTemp: OffenderTxnFeeDetails[] = [];
    offtfdModel: OffenderTxnFeeDetails = new OffenderTxnFeeDetails();
    offtfdIndex = 0;
    offtfdInsertList: OffenderTxnFeeDetails[] = [];
    offtfdUpdatetList: OffenderTxnFeeDetails[] = [];
    offtfdDeleteList: OffenderTxnFeeDetails[] = [];
    offtfdCommitModel: OffenderTxnFeeDetailsCommitBean = new OffenderTxnFeeDetailsCommitBean();
    offttfData: OffenderTierTxnFeeAmounts[] = [];
    offttfDataTemp: OffenderTierTxnFeeAmounts[] = [];
    offttfModel: OffenderTierTxnFeeAmounts = new OffenderTierTxnFeeAmounts();
    offttfIndex = 0;
    offttfInsertList: OffenderTierTxnFeeAmounts[] = [];
    offttfUpdatetList: OffenderTierTxnFeeAmounts[] = [];
    offttfDeleteList: OffenderTierTxnFeeAmounts[] = [];
    offttfCommitModel: OffenderTierTxnFeeAmountsCommitBean = new OffenderTierTxnFeeAmountsCommitBean();
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    offTtfColumnDef: any[];
    offDedColumnDef: any[];
    offTfdColumnDef: any[];
    offDedReadOnly: Boolean = false;
    offTfdReadOnly: Boolean = false;
    offTtfReadOnly: Boolean = false;
    sysPflReadOnly: Boolean = false;
    cgfkOffdeddspdescriptionRg: any[] = [];
    cgfkOfftfdreceiptdeductionRg: any[] = [];
    cgfkOffdeddeductiontypeRg: any[] = [];
    index = 0;
    type: string;
    message: string;
    vHeaderBlockModel: VTrustHeader = new VTrustHeader();
    tableNameTitlesOffDed = { code: 'Type', description: 'Description' };
    tableNameTitlesOffTfd = { code: 'Type', description: 'Description' };
    validationFlag: Boolean = false;
    enableInsertOffdedtab: Boolean = false;
    enableInsertOfftfdtab: Boolean = false;
    enableInsertOffttftab: Boolean = false;
    tableIndex: number;
    deleteOffTdGrid: boolean;
    deleteOffTfGrid: boolean;
    tableIndexOne = -1
    validateItem: boolean;
    fieldItem: boolean;
    activeFlag: any;
    activeFlagPush: boolean;
    fromAmount: boolean;
    toAmount: boolean;
    isEmpty: boolean;

    constructor(private otdocfeeFactory: OtdocfeeService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService) {
        this.offTtfColumnDef = [];
        this.offDedColumnDef = [];
        this.offTfdColumnDef = [];
    }
    ngOnInit() {
        this.isEmpty = false;
        this.enableInsertOffdedtab = false;
        this.deleteOffTdGrid = false;
        this.deleteOffTfGrid = false;
        this.enableInsertOfftfdtab = false;
        this.enableInsertOffttftab = false;
        this.activeFlagPush = false;
        this.fromAmount = false;
        this.toAmount = false;
        this.vHeaderBlockModel = new VTrustHeader();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
        }

        this.offTtfColumnDef = [
            {
                fieldName: this.translateService.translate('otdocfee.fromMandatory'), field: 'fromAmount', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('otdocfee.toMandatory'), field: 'toAmount', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('otdocfee.percentage'), field: 'percentage', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('otdocfee.feeAmount'), field: 'feeAmount', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, cellEditable: this.canCellEdit
            },
            { fieldName: '', field: 'frmOverlapFlag', hide: true },
            { fieldName: '', field: 'toOverlapFlag', hide: true },
        ];
        this.offDedColumnDef = [
            {
                fieldName: this.translateService.translate('otdocfee.type'), field: 'deductionType', editable: true, datatype: 'lov', width: 150,
                link: 'otdocfee/cgfkOffDedDeductionTypeRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad
                    + '&caseloadType=' + this.sessionManager.currentCaseLoadType, titles: this.tableNameTitlesOffDed
            },
            {
                fieldName: this.translateService.translate('common.statusmandatory'), field: 'deductionStatus', editable: true,
                datatype: 'lov', width: 150, domain: 'DED_STATUS'
            },
        ];
        this.offTfdColumnDef = [
            {
                fieldName: this.translateService.translate('otdocfee.type'), field: 'receiptDeductionType', editable: true, width: 150, datatype: 'lov',
                link: 'otdocfee/cgfkOffTfdReceiptDeductionRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType,
                titles: this.tableNameTitlesOffTfd, cellEditable: this.canAlertEdit
            },
        ];
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (this.activeFlagPush) {
            return false;
        }
        if (data.frmOverlapFlag && field !== 'fromAmount') {
            this.show(this.translateService.translate('otmcfees.overlapvalidation'), 'warn');
            return false;
        }
        if (data.toOverlapFlag && field !== 'toAmount') {
            this.show(this.translateService.translate('otmcfees.overlapvalidation'), 'warn');
            return false;
        }
        if (data.feeAmount && field === 'percentage') {
            return false;
        }
        if (data.percentage && field === 'feeAmount') {
            return false;
        }
        return true;
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (this.activeFlagPush) {
            return false;
        } else {
            return true;
        }
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    offDedFeeInsert = () => {
        if (!this.otdoccOffDedFeeValidations()) {
            return;
        }
        return { activeFlag: true };
    }
    offdedAmountInsert = () => {
        if (!this.otdocfeeAmountUpdateValidations()) {
            return false;
        }
        return { activeFlag: true };
    }

    otdoccOffDedFeeValidations() {
        const is = { valid: true };
        if (this.offtfdData && this.offtfdData) {
            this.offtfdData.forEach(element => {
                if (!element.receiptDeductionType) {
                    this.show(this.translateService.translate('otdocfee.typeValidation'), 'warn');
                    is.valid = false;
                }
            });
        }
        return is.valid;
    }

    otdocfeeAmountUpdateValidations() {
        const is = { valid: true };
        if (this.offttfData && this.offttfData) {
            this.offttfData.forEach(element => {

                if (element.fromAmount === undefined) {
                    this.show(this.translateService.translate('otdocfee.fromAmountValidation'), 'warn');
                    this.validationFlag = true;
                    is.valid = false;
                    return;
                } else if (!element.toAmount) {
                    this.show(this.translateService.translate('otdocfee.toAmountValidation'), 'warn');
                    this.validationFlag = true;
                    is.valid = false;
                    return;
                } else if (!element.percentage && !element.feeAmount) {
                    this.show(this.translateService.translate('otdocfee.percentorFeeValidation'), 'warn');
                    this.validationFlag = true;
                    is.valid = false;
                    return;
                }

            });
        }
        return is.valid;
    }

    onRowClickoffded(event) {
        if (event && event.offenderDeductionId) {
            this.offdedModel = event;
            this.enableInsertOfftfdtab = true;
            this.enableInsertOffttftab = true;
            this.lvuntsTotalData = [];
            this.offtfdModel.offenderDeductionId = event.offenderDeductionId;
            this.offtfdExecuteQuery();
            this.offttfModel.offenderDeductionId = event.offenderDeductionId;
            this.offttfExecuteQuery();
        } else {
            this.enableInsertOfftfdtab = false;
            this.enableInsertOffttftab = false;
            this.offttfModel = new OffenderTierTxnFeeAmounts();
            this.offtfdModel = new OffenderTxnFeeDetails();
            this.offttfData = [];
            this.offtfdData = [];
            this.lvuntsTotalData = [];
            this.fromAmount = false;
            this.toAmount = false;
        }
    }
    onRowClickoffColecFee(event) {
        if (event) {
            this.deleteOffTdGrid = false;
            if (this.isEmpty) {
                this.getDefaultDeductions();
                return;
            }
            this.offtfdModel = event;
            if (this.offtfdModel.createDatetime) {
                this.deleteOffTdGrid = true;
            } else {
                this.deleteOffTdGrid = false;
            }
        }
    }

    onRowClickoffColecAmount(event) {
        if (event) {
            this.deleteOffTfGrid = false;
            if (this.isEmpty) {
                this.getDefaultDeductions();
                return;
            }
            this.offttfModel = event;
            if (this.offttfModel.createDatetime) {
                this.deleteOffTfGrid = true;
            } else {
                this.deleteOffTfGrid = false;
            }
        }
    }
    getDefaultDeductions() {

        if (this.offttfModel.createDatetime) {
            this.offdedModel.sealFlag = 'Y';
        } else {
            this.offdedModel.sealFlag = 'N';
        }
        if (this.offtfdModel.createDatetime) {
            this.offdedModel.commentText = 'Y';
        } else {
            this.offdedModel.commentText = 'N';
        }
        this.offdedModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
        this.offdedModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.offdedModel.caseloadType = this.vHeaderBlockModel.bookingType;
        const offdedSaveData = this.otdocfeeFactory.otdocfeePopulateDetails(this.offdedModel);
        offdedSaveData.subscribe(data => {
            if (data.length > 0) {
                this.offtfdModel.offenderDeductionId = this.offdedModel.offenderDeductionId;
                this.offtfdExecuteQuery();
                this.offttfModel.offenderDeductionId = this.offdedModel.offenderDeductionId;
                this.offttfExecuteQuery();
            } else if (data == -1) {
                this.show(this.translateService.translate('otdocfee.recipttypegriddefault'), 'warn');
                return;
            } else if (data == -2) {
                this.show(this.translateService.translate('otdocfee.recipttypegriddefault'), 'warn');
                return;
            }
        })
    }
    onOffenderChange(offender) {
        this.offdedData = [];
        this.offttfData = [];
        this.offtfdData = [];
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offdedModel = new OffenderDeductions();
            this.offttfModel = new OffenderTierTxnFeeAmounts();
            this.offtfdModel = new OffenderTxnFeeDetails();
            this.offdedModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offdedModel.caseloadId = this.vHeaderBlockModel.caseloadId;
            this.offdedModel.caseloadType = this.vHeaderBlockModel.bookingType;
            this.fromAmount = false;
            this.toAmount = false;
            this.otdocfeeexecuteQuery();
        } else {
            this.offdedData = [];
            this.offdedModel = new OffenderDeductions();
            this.offttfData = [];
            this.offttfModel = new OffenderTierTxnFeeAmounts();
            this.enableInsertOffdedtab = false;
            this.fromAmount = false;
            this.toAmount = false;
        }
    }

    otdocfeeSaveoffdedForm(event) {
        this.offdedInsertList = event.added;
        this.offdedUpdatetList = event.updated;
        this.offdedDeleteList = event.removed;
        this.offdedCommitModel.insertList = [];
        this.offdedCommitModel.updateList = [];
        this.offdedCommitModel.deleteList = [];
        if (this.offdedInsertList.length > 0) {
            this.offdedInsertList.forEach(obj => {
                if (!obj.deductionType) {
                    this.show(this.translateService.translate('otdocfee.typeValidation'), 'warn');
                    this.validationFlag = true;
                    return;
                } else if (!obj.deductionStatus) {
                    this.show(this.translateService.translate('otdocfee.deductionStatusValidation'), 'warn');
                    this.validationFlag = true;
                    return;

                } else {
                    obj.createUserId = this.sessionManager.getId();
                    obj.caseloadId = this.sessionManager.currentCaseLoad;
                    obj.caseloadType = this.sessionManager.currentCaseLoadType;
                    obj.offenderId = this.vHeaderBlockModel.rootOffenderId;
                    obj.createDateTime = DateFormat.getDate();
                    obj.modifyDate = DateFormat.getDate();
                    obj.effectiveDate = DateFormat.getDate();
                    obj.deductionPriority = 1;
                }
            });
        }
        for (let i = 0; i < this.offdedInsertList.length; i++) {
            for (let j = 0; j < this.offdedInsertList.length; j++) {
                if (i !== j && (this.offdedInsertList[i].deductionType === this.offdedInsertList[j].deductionType)
                    && (this.offdedInsertList[i].caseloadId === this.offdedInsertList[j].caseloadId)
                    && (this.offdedInsertList[i].offenderId === this.offdedInsertList[j].offenderId)) {
                    if (this.offdedInsertList[i].informationNumber === this.offdedInsertList[j].informationNumber) {
                        this.show(this.translateService.translate('otdocfee.rowexistsalreadywithsamedeductiontype'), 'warn');
                         this.validationFlag = true;
                        
                    } else if (this.offdedInsertList[i].deductionPriority === this.offdedInsertList[j].deductionPriority) {
                        this.show(this.translateService.translate('otdocfee.sameDeductionPriorityValidation'), 'warn');
                        this.validationFlag = true;
                        return;
                    }
                }
            }
        }
        for (let i = 0; i < this.offdedUpdatetList.length; i++) {
            for (let j = 0; j < this.offdedUpdatetList.length; j++) {
                if (i !== j && (this.offdedUpdatetList[i].deductionType === this.offdedUpdatetList[j].deductionType)
                    && (this.offdedUpdatetList[i].caseloadId === this.offdedUpdatetList[j].caseloadId)
                    && (this.offdedUpdatetList[i].offenderId === this.offdedUpdatetList[j].offenderId)) {
                    if (this.offdedUpdatetList[i].informationNumber === this.offdedUpdatetList[j].informationNumber) {
                        this.show(this.translateService.translate('otdocfee.sameInformationNumValidation'), 'warn');
                        this.validationFlag = true;
                        return;
                    } else if (this.offdedUpdatetList[i].deductionPriority === this.offdedUpdatetList[j].deductionPriority) {
                        this.show(this.translateService.translate('otdocfee.sameDeductionPriorityValidation'), 'warn');
                        this.validationFlag = true;
                        return;
                    }
                }
            }
        }

        if (this.validationFlag) {
            this.validationFlag = false;
            return;
        }
        for (let i = 0; i < this.offdedData.length; i++) {
            for (let j = 0; j < this.offdedData.length; j++) {
                if (i !== j && this.offdedData[i].deductionType === this.offdedData[j].deductionType &&
                    this.offdedData[i].deductionStatus === this.offdedData[j].deductionStatus) {
                    this.show(this.translateService.translate('otdocfee.rowexistsalreadywithsamedeductiontype'), 'warn');
                    // is.valid = false;
                    return;
                }
            }
        }
        this.offdedCommitModel.insertList = this.offdedInsertList;
        this.offdedCommitModel.updateList = this.offdedUpdatetList;
        if (this.offdedDeleteList.length > 0) {
            this.offdedCommitModel.deleteList = this.offdedDeleteList;
        }
        const offdedSaveData = this.otdocfeeFactory.offDedCommit(this.offdedCommitModel);
        offdedSaveData.subscribe(data => {
            if (data === 1) {
                this.message = 'common.addupdateremoverecordsuccess';
                this.show(this.translateService.translate(this.message), 'success');
                this.otdocfeeexecuteQuery();
                return;
            } else if (data === 4) {
                this.message = 'otdocfee.rowexistsalreadywithsamedeductiontype';
                this.show(this.message);
                this.otdocfeeexecuteQuery();
                return;
            } else {
                this.message = 'common.addupdateremoverecordfailed';
                this.show(this.translateService.translate(this.message));
                this.otdocfeeexecuteQuery();
                return;
            }
        });
    }

    otdocfeeexecuteQuery() {
        this.offdedModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
        this.offdedModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.offdedModel.caseloadType = this.sessionManager.currentCaseLoadType;
        const serviceObj = this.otdocfeeFactory.
            offDedExecuteQuery(this.offdedModel);
        serviceObj.subscribe(data => {
            this.enableInsertOffdedtab = true;
            if (data.length === 0) {
                this.offdedData = [];
                this.offdedDataTemp = [];
                this.offdedModel = new OffenderDeductions();
            } else {
                this.offdedData = data;
                this.offdedDataTemp = data;
                this.offdedModel = this.offdedData[0];
                this.offtfdModel.offenderDeductionId = this.offdedModel.offenderDeductionId;

            }
        });
    }

    offtfdExecuteQuery() {
            this.offtfdModel.offenderDeductionId = this.offdedModel.offenderDeductionId;
            const offtfdResult = this.otdocfeeFactory.
                offTfdExecuteQuery(this.offtfdModel);
            offtfdResult.subscribe(data => {
                if (data.length === 0) {
                    this.offtfdData = [];
                    this.tableIndex = -1;
                    if (this.offttfData.length === 0) {
                    setTimeout(ele => {
                        /* const emptyDataSet = [];
                        emptyDataSet.push({ isEmpty: true });
                        this.offtfdData = emptyDataSet; */
                        this.isEmpty = true;
                        this.activeFlagPush = true;
                    }, 100);
                }
                    this.offtfdModel = new OffenderTxnFeeDetails();
                } else {
                    this.isEmpty = false;
                    this.offtfdData = data;
                    this.offtfdModel = data[0];
                    this.tableIndex = 0;
                    this.activeFlagPush = false;
                }
            });
    }

    otdocfeeSaveofftfdForm(event) {
        this.offtfdInsertList = event.added;
        this.offtfdUpdatetList = event.updated;
        this.offtfdDeleteList = event.removed;
        this.offtfdCommitModel.insertList = [];
        this.offtfdCommitModel.updateList = [];
        this.offtfdCommitModel.deleteList = [];
        if (this.offtfdInsertList.length > 0 || this.offtfdUpdatetList.length > 0) {
            this.offtfdInsertList.forEach(obj => {
                if (!obj.receiptDeductionType) {
                    this.show(this.translateService.translate('otdocfee.typeValidation'), 'warn');
                    this.validationFlag = true;
                    return;
                } else {
                    obj.createUserId = this.sessionManager.getId();
                    obj.createDatetime = DateFormat.getDate();
                    obj.modifyDatetime = DateFormat.getDate();
                    obj.offenderDeductionId = this.offdedModel.offenderDeductionId;
                }
            });
         
            for (let i = 0; i < this.offtfdData.length; i++) {
                for (let j = 0; j < this.offtfdData.length; j++) {
                    if (i !== j && (this.offtfdData[i].offenderDeductionId === this.offtfdData[j].offenderDeductionId)
                        && (this.offtfdData[i].receiptDeductionType === this.offtfdData[j].receiptDeductionType)) {
                        this.show(this.translateService.translate('otdocfee.sameRecieptDeductionValidation'), 'warn');
                        this.validationFlag = true;
                       
                    }
                }
            }

            if (this.validationFlag) {
                this.validationFlag = false;
                return;
            }

            this.offtfdCommitModel.insertList = this.offtfdInsertList;
            this.offtfdCommitModel.updateList = this.offtfdUpdatetList;
        }
        if (this.offtfdDeleteList.length > 0) {
            this.offtfdCommitModel.deleteList = this.offtfdDeleteList;
        }
        const offtfdSaveData = this.otdocfeeFactory.offTfdCommit(this.offtfdCommitModel);
        offtfdSaveData.subscribe(data => {
            if (data === 1) {
                this.message = 'common.addupdateremoverecordsuccess';
                this.show(this.message, 'success');
                this.offtfdExecuteQuery();
                return;
            } else {
                this.message = 'common.addupdateremoverecordfailed';
                this.show(this.message);
                this.offtfdExecuteQuery();
                return;
            }
        });
    }

    offttfExecuteQuery() {
        this.offttfModel.offenderDeductionId = this.offdedModel.offenderDeductionId;
        const offttfResult = this.otdocfeeFactory.
            offTtfExecuteQuery(this.offttfModel);
        offttfResult.subscribe(data => {
            if (data.length === 0) {
                this.offttfData = [];
                this.tableIndexOne = -1;
                // if (this.offtfdData.length === 0) {
                setTimeout(ele => {
                    /* const emptyDataSet = [];
                    emptyDataSet.push({ isEmpty: true });
                    this.offttfData = emptyDataSet; */
                    this.isEmpty = true;
                    this.activeFlagPush = true;
                }, 100);
                // }
                this.offttfModel = new OffenderTierTxnFeeAmounts();
            } else {
                this.isEmpty = false;
                this.offttfData = data;
                this.offttfModel = data[0];
                this.tableIndexOne = 0;
                this.activeFlagPush = false;
            }
        });
    }

    amountChange() {
        const is = { valid: true };
        this.offdedData.forEach(element1 => {
            for (let i = 0; i < this.offttfData.length; i++) {
                const dedType = 'COL';
                const dedTypeOne = 'DECOL';
                if (element1.deductionType === dedType &&
                    ((i !== this.offttfData.length - 1) && this.offttfData[i].toAmount >= this.offttfData[i + 1].fromAmount)) {
                    this.message = 'otdocfee.amountValidation';
                    this.show(this.translateService.translate(this.message));
                    is.valid = false;
                    return;
                }
                if (element1.deductionType === dedTypeOne &&
                    ((i !== 0) && this.offttfData[i].fromAmount <= this.offttfData[i - 1].toAmount)) {
                    this.message = 'otdocfee.amountValidation';
                    this.show(this.translateService.translate(this.message));
                    is.valid = false;
                    return;
                }
            }
        });
        for (let i = 0; i < this.offttfData.length; i++) {
            if (Number(this.offttfData[i].fromAmount) >= Number(this.offttfData[i].toAmount)) {
                this.message = 'otdocfee.fromAmount';
                this.show(this.message);
                is.valid = false;
                return;
            }
        }
        for (let i = this.offttfData.length; i < 0; i--) {
            if (Number(this.offttfData[i].toAmount) <= Number(this.offttfData[i].fromAmount)) {
                this.message = 'otdocfee.toAmount';
                this.show(this.translateService.translate(this.message));
                is.valid = false;
                return;
            }

        }
        for (let i = 0; i < this.offdedData.length; i++) {
            for (let j = 0; j < this.offdedData.length; j++) {
                if (i !== j && (this.offdedData[i].deductionType === this.offdedData[j].deductionType)) {
                    this.show(this.translateService.translate('otdocfee.rowexistsalreadywithsamedeductiontype'));
                    is.valid = false;
                    return;
                }
            }
        }
        return is.valid;
    }
    syspflExecuteQuery() {
        const syspflResult = this.otdocfeeFactory.
            sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(data => {
            if (data.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = data;
                this.syspflModel = data[0];
            }
        });
    }
    validateRowDataFeeAmount = (event) => {
        this.fromAmount = false;
        this.toAmount = false;
        this.offttfModel.pFlag = undefined;
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.data.frmOverlapFlag !== undefined && event.data.frmOverlapFlag && event.field !== 'fromAmount' &&
            event.field !== 'frmOverlapFlag' && event.field !== 'toOverlapFlag') {
            this.offttf.setColumnData(event.field, rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }
        if (event.field === 'fromAmount') {
            if (event.newValue && String(event.newValue).startsWith('-')) {
                this.show(this.translateService.translate('ocdpayob.mustbeinrange'), 'warn');
                this.validateItem = true;
            } else if (event.data.fromAmount && isNaN(Number(event.data.fromAmount))) {
                this.show(this.translateService.translate('common.fieldmustbeofform'), 'warn');
                this.fieldItem = true;
            } else {
                if (event.data.fromAmount || event.data.fromAmount === 0) {
                    if (Number(event.data.fromAmount) >= 1000000000) {
                        this.show(this.translateService.translate('common.fieldmustbeofform'), 'warn');
                        this.offttf.setColumnData('fromAmount', rowIndex, undefined);
                    } else {
                        this.offttf.setColumnData('fromAmount', rowIndex,
                            Number(event.data.fromAmount).toFixed(2));
                    }
                }
            }
            this.offttfModel.pFlag = 'F';
            if (event.data.toAmount && event.data.fromAmount) {
                if (Number(event.data.toAmount) <= Number(event.data.fromAmount)) {
                    this.show(this.translateService.translate('otmcfees.fromamountvalidation'), 'warn');
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            this.fromAmount = true;
            this.toAmount = false;
            this.getOverLapCount(event);
        }
        if (event.field === 'toAmount') {
            if (event.newValue && String(event.newValue).startsWith('-')) {
                this.show(this.translateService.translate('ocdpayob.mustbeinrange'), 'warn');
                this.validateItem = true;
            } else if (event.data.toAmount && isNaN(Number(event.data.toAmount))) {
                this.show(this.translateService.translate('common.fieldmustbeofform'), 'warn');
                this.fieldItem = true;
            } else {
                if (event.data.toAmount || event.data.toAmount === 0) {
                    if (Number(event.data.toAmount) >= 1000000000) {
                        this.show(this.translateService.translate('common.fieldmustbeofform'), 'warn');
                        this.offttf.setColumnData('toAmount', rowIndex, undefined);
                    } else {
                        this.offttf.setColumnData('toAmount', rowIndex,
                            Number(event.data.toAmount).toFixed(2));
                    }
                    this.validateItem = false;
                    this.fieldItem = false;
                }
            }
            this.offttfModel.pFlag = 'T';
            if (event.data.fromAmount && event.data.toAmount) {
                if (Number(event.data.toAmount) <= Number(event.data.fromAmount)) {
                    this.show(this.translateService.translate('otmcfees.toamountvalidation'), 'warn');
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            this.fromAmount = false;
            this.toAmount = true;
            this.getOverLapCount(event);
        }
        rowdata.validated = true;
        return rowdata;
    }
    getOverLapCount(event) {
        // this.overLapCount = false;
        this.offttfModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.offttfModel.deductionType = this.offdedModel.deductionType;
        const serviceObj = this.otdocfeeFactory.getOverLapCount(this.offttfModel);
        serviceObj.subscribe(data => {
            if (data > 0) {
                if (this.fromAmount) {
                    this.offttf.setColumnData('frmOverlapFlag', this.offttfData.indexOf(event.data), true);
                    this.fromAmount = false;
                } else if (this.toAmount) {
                    this.offttf.setColumnData('toOverlapFlag', this.offttfData.indexOf(event.data), true);
                    this.toAmount = false;
                }
                this.show(this.translateService.translate('otmcfees.overlapvalidation'), 'warn');
                return;
            } else {
                if (this.fromAmount) {
                    this.offttf.setColumnData('frmOverlapFlag', this.offttfData.indexOf(event.data), false);
                    this.fromAmount = false;
                } else if (this.toAmount) {
                    this.offttf.setColumnData('toOverlapFlag', this.offttfData.indexOf(event.data), false);
                    this.toAmount = false;
                }
                return;
            }
        });
    }
    tiredGridValidations(event) {
        if (this.validateItem) {
            this.show(this.translateService.translate('ocdpayob.mustbeinrange'), 'warn');
            return true;
        }
        if (this.fieldItem) {
            this.show(this.translateService.translate('common.fieldmustbeofform'), 'warn');
            return true;
        }
        if (event.overLapCount) {
            this.show(this.translateService.translate('otmcfees.overlapvalidation'), 'warn');
            return true;
        }
        if (Number(event.toAmount) === Number(event.fromAmount)) {
            this.show(this.translateService.translate('otdocfee.samefromandToValidation'), 'warn');
            return true;
        }
        if (Number(event.toAmount) <= Number(event.fromAmount)) {
            this.show(this.translateService.translate('otmcfees.fromamountvalidation'), 'warn');
            return true;
        }
        if (!(event.percentage >= 0) && !(event.feeAmount >= 0)) {
            this.show(this.translateService.translate('otmcfees.eitherpercentageorfeeamount'), 'warn');
            return true;
        }
        return false;
    }

    otdocfeeSaveoffttfForm(event) {
        if (!this.otdocfeeAmountUpdateValidations()) {
            return;
        }
        this.offttfInsertList = event.added;
        this.offttfUpdatetList = event.updated;
        this.offttfDeleteList = event.removed;
        this.offttfCommitModel.insertList = [];
        this.offttfCommitModel.updateList = [];
        this.offttfCommitModel.deleteList = [];
        if (this.offttfInsertList.length > 0 || this.offttfUpdatetList.length > 0) {
            for (let i = 0; i < this.offttfInsertList.length; i++) {
                if (this.offttfInsertList[i].toAmount && this.offttfInsertList[i].fromAmount) {
                    if (this.tiredGridValidations(this.offttfInsertList[i])) {
                        return;
                    }
                }
                this.offttfInsertList[i].createUserId = this.sessionManager.getId();
                this.offttfInsertList[i].offenderDeductionId = this.offdedModel.offenderDeductionId;;
                this.offttfCommitModel.insertList = this.offttfInsertList;
            }
            for (let i = 0; i < this.offttfUpdatetList.length; i++) {
                if (this.offttfUpdatetList[i].toAmount && this.offttfUpdatetList[i].fromAmount) {
                    if (this.tiredGridValidations(this.offttfUpdatetList[i])) {
                        return;
                    }
                }
                this.offttfCommitModel.updateList = this.offttfUpdatetList;
            }
        }
        if (this.offttfDeleteList.length > 0) {
            for (let i = 0; i < this.offttfDeleteList.length; i++) {
                if (this.tiredGridValidations(this.offttfDeleteList[i])) {
                    return;
                }
                this.offttfCommitModel.deleteList = this.offttfDeleteList;
            }

        }
        const offttfSaveData = this.otdocfeeFactory.offTtfCommit(this.offttfCommitModel);
        offttfSaveData.subscribe(data => {
            if (data === 3) {
                this.message = 'otdocfee.amountgridparentdeleteviolate';
                this.show(this.translateService.translate(this.message), 'warn');
                this.offttfExecuteQuery();
                return;
            } else if (data === 2) {
                this.message = 'otdocfee.amountgriddeleteviolate';
                this.show(this.translateService.translate(this.message), 'warn');
                this.offttfExecuteQuery();
                return;

            } else if (data === 1) {
                this.message = 'common.addupdateremoverecordsuccess';
                this.show(this.message, 'success');
                this.offttfExecuteQuery();
                return;
            } else if (data === 0) {
                this.message = 'common.addupdateremoverecordfailed';
                this.show(this.message);
                this.offttfExecuteQuery();
                return;
            }
        });
    }
}
