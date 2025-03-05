import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmgobliService } from '@cf/deductions/maintenance/service/ocmgobli.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ObligationGroups } from '@cf/deductions/maintenance/beans/ObligationGroups';
import { GroupedObligations } from '@cf/deductions/maintenance/beans/GroupedObligations';
import { ObligationGroupsCommitBean } from '@cf/deductions/maintenance/beans/ObligationGroupsCommitBean';
import { GroupedObligationsCommitBean } from '@cf/deductions/maintenance/beans/GroupedObligationsCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';

@Component({
    selector: 'app-ocmgobli',
    templateUrl: './ocmgobli.component.html'
})

export class OcmgobliComponent implements OnInit {
    @ViewChild('obGrpGrid', {static: false}) obGrpGrid: any;
    @ViewChild('grpObGrid', {static: false}) grpObGrid: any;
    msgs: any[] = [];
    obgrpData: ObligationGroups[] = [];
    obgrpModel: ObligationGroups = new ObligationGroups();
    obgrpSearchModel: ObligationGroups = new ObligationGroups();
    obgrpIndex = -1;
    obgrpInsertList: ObligationGroups[] = [];
    obgrpUpdatetList: ObligationGroups[] = [];
    obgrpDeleteList: ObligationGroups[] = [];
    obgrpCommitModel: ObligationGroupsCommitBean = new ObligationGroupsCommitBean();
    grpobData: GroupedObligations[] = [];
    grpobModel: GroupedObligations = new GroupedObligations();
    grpobIndex = -1;
    grpobInsertList: GroupedObligations[] = [];
    grpobUpdatetList: GroupedObligations[] = [];
    grpobDeleteList: GroupedObligations[] = [];
    grpobCommitModel: GroupedObligationsCommitBean = new GroupedObligationsCommitBean();
    grpObColumnDef: any[];
    obGrpColumnDef: any[];
    cgfkGrpobdeductiontypeRg: any[] = [];
    cgfkSanctionnoticesRg: any[] = [];
    oblTypeTitles = {
        code: this.translateService.translate('ocmgobli.obligationtype'),
        description: this.translateService.translate('common.description')
    };
    sanctionTypeTitles = {
        code: this.translateService.translate('ocmgobli.sanctionnoticecode'),
        description: this.translateService.translate('common.description')
    };
    msglist: any[];
    message: any;
    type: any;
    obGrpInsert: boolean;
    obGrpDelete: boolean;
    grpObInsert: boolean;
    grpObDelete: boolean;
    retriveDisabled: boolean;
    clearDisabled: boolean;
    disableSearchFields: boolean;
    deductionFlag: boolean;
    obligationGrpFlag: boolean;
    constructor(private ocmgobliFactory: OcmgobliService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.grpObColumnDef = [];
        this.obGrpColumnDef = [];
    }
    ngOnInit() {
        this.obGrpInsert = true;
        this.obGrpDelete = false;
        this.grpObInsert = false;
        this.grpObDelete = false;
        this.retriveDisabled = true;
        this.clearDisabled = false;
        this.disableSearchFields = false;
        this.obGrpColumnDef = [
            {
                fieldName: this.translateService.translate('ocmgobli.groupid') + '*', field: 'groupId', editable: false,
                width: 100, cellEditable: this.canGroupIdEdit, maxValue: '9999999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('common.codemandatory'), field: 'groupCode', editable: true, width: 150,
                datatype: 'text', maxlength: 12
            },
            {
                fieldName: this.translateService.translate('common.description') + '*', field: 'groupDescription', editable: true,
                width: 150, datatype: 'text', maxlength: 32, uppercase: 'false'
            },
        ];

        this.grpObColumnDef = [
            //{ fieldName: '', field: 'test', editable: false, width: 150, hide: true },
            {
                fieldName: this.translateService.translate('ocmgobli.obligationtype'), field: 'deductionType', width: 150,
                editable: false, datatype: 'lov', link: 'ocmgobli/cgfkGrpObDeductionTypeRecordGroup', required: true ,
                titles: this.oblTypeTitles, cellEditable: this.canOblTypeEdit
            },
            {
                fieldName: this.translateService.translate('ocmgobli.sanctionnoticetype'), field: 'sanctionNoticeCode',
                editable: true, width: 150, datatype: 'lov', titles: this.sanctionTypeTitles,
                link: 'ocmgobli/cgfkSanctionNoticesRecordGroup'
            },
        ];

        this.obgrpExecuteQuery();
    }

    isInsertable() {
        if ((this.obgrpSearchModel.groupId || this.obgrpSearchModel.groupCode
            || this.obgrpSearchModel.groupDescription) || this.disableSearchFields) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }

    canGroupIdEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    canOblTypeEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    /**
      * This function displays the messages
      */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onRowClickobgrp(event) {
        if (event) {
            this.obgrpModel = event;
            if (this.obgrpModel.createDatetime) {
                this.grpObInsert = true;
                this.obGrpDelete = true;
                this.grpobModel = new GroupedObligations();
                this.grpobModel.groupId = this.obgrpModel.groupId;
                this.grpObExecuteQuery();
            } else {
                this.grpObInsert = false;
                this.obGrpDelete = false;
                this.grpobModel = new GroupedObligations();
                this.grpobData = [];
            }
        } else {
            this.grpobModel = new GroupedObligations();
            this.grpobData = [];
            this.grpObInsert = false;
        }
    }
    onRowClickgrpob(event) {
        if (event) {
            this.grpobModel = event;
            if (this.grpobModel.createDatetime) {
                this.grpObDelete = true;
            } else {
                this.grpObDelete = false;
            }
        }
    }
    clear() {
        this.obGrpInsert = true;
        this.obGrpDelete = false;
        this.grpObInsert = false;
        this.grpObDelete = false;
        this.retriveDisabled = false;
        this.disableSearchFields = false;
        this.clearDisabled = true;
        this.obgrpData = [];
        this.obgrpModel = new ObligationGroups();
        this.obgrpSearchModel = new ObligationGroups();
        this.grpobData = [];
        this.grpobModel = new GroupedObligations();
    }

    obgrpExecuteQuery() {
        const serviceObj = this.ocmgobliFactory.obGrpExecuteQuery(this.obgrpSearchModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.obgrpSearchModel = new ObligationGroups();
                this.obgrpData = [];
                this.grpobData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycausedReEnter');
                this.show();
            } else {
                this.obgrpData = data;
                this.obgrpIndex = 0;
                this.clearDisabled = false;
                this.disableSearchFields = true;
                this.retriveDisabled = true;
                this.obGrpDelete = true;
                this.grpObInsert = true;
            }
        });
    }

    /**
     *  This function will be executed when commit event is fired
    */
    obGrpCommit(event) {
        if (!this.obGrpValidations()) {
            return;
        }
        this.obligationGrpFlag = true;
        this.obgrpData.forEach((element, index) => {
            this.obgrpData.forEach((element2, index2) => {
                if (element.groupId === Number(element2.groupId) && index !== index2) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmgobli.duplicategrpid');
                    this.show();
                    this.obligationGrpFlag = false;
                    return;
                }
            });
        });

        if (this.obligationGrpFlag) {
            this.obgrpInsertList = event.added;
            this.obgrpUpdatetList = event.updated;
            this.obgrpDeleteList = event.removed;
            this.obgrpCommitModel.insertList = [];
            this.obgrpCommitModel.updateList = [];
            this.obgrpCommitModel.deleteList = [];
            if (this.obgrpInsertList.length > 0 || this.obgrpUpdatetList.length > 0) {
                for (let i = 0; i < this.obgrpInsertList.length; i++) {
                    this.obgrpCommitModel.insertList = this.obgrpInsertList;
                }
                for (let i = 0; i < this.obgrpUpdatetList.length; i++) {
                    this.obgrpCommitModel.updateList = this.obgrpUpdatetList;
                }
            }
            if (this.obgrpDeleteList.length > 0) {
                for (let i = 0; i < this.obgrpDeleteList.length; i++) {
                    this.obgrpCommitModel.deleteList = this.obgrpDeleteList;
                }
            }
            const obgrpSaveData = this.ocmgobliFactory.obGrpCommit(this.obgrpCommitModel);
            obgrpSaveData.subscribe(data => {
                if (data && data.sealFlag === '1') {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.obgrpExecuteQuery();
                    return;
                } else if (data && data.sealFlag === '0') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    this.obgrpExecuteQuery();
                    return;
                } else if (String(data.errorMessage).indexOf('GROUP_OBLIGATIONS_PK') > 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmgobli.duplicategrpid');
                    this.show();
                }
            });
        }
    }

    /**
    * This function loads the data into the Master Record and its child records
    */
    grpObExecuteQuery() {
        const serviceObj = this.ocmgobliFactory.grpObExecuteQuery(this.grpobModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.grpobData = [];
            } else {
                if (this.obgrpData.length > 0) {
                    this.grpobData = data;
                    this.grpObDelete = true;
                    this.grpobIndex = 0;
                } else {
                    this.grpobData = [];
                }
            }
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    grpObCommit(event) {
        if (!this.grpObValidations()) {
            return;
        }
        this.deductionFlag = true;
        this.grpobData.forEach((element, index) => {
            this.grpobData.forEach((element2, index2) => {
                if (element.deductionType === element2.deductionType && index !== index2) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmgobli.duplicatededctiontype');
                    this.show();
                    this.deductionFlag = false;
                    return;
                }
            });
        });
        if (this.deductionFlag) {
            this.grpobInsertList = event.added;
            this.grpobUpdatetList = event.updated;
            this.grpobDeleteList = event.removed;
            this.grpobCommitModel.insertList = [];
            this.grpobCommitModel.updateList = [];
            this.grpobCommitModel.deleteList = [];
            if (this.grpobInsertList.length > 0 || this.grpobUpdatetList.length > 0) {
                for (let i = 0; i < this.grpobInsertList.length; i++) {
                    this.grpobInsertList[i].groupId = this.obgrpModel.groupId;
                    this.grpobCommitModel.insertList = this.grpobInsertList;
                }
                for (let i = 0; i < this.grpobUpdatetList.length; i++) {
                    this.grpobCommitModel.updateList = this.grpobUpdatetList;
                }
            }
            if (this.grpobDeleteList.length > 0) {
                for (let i = 0; i < this.grpobDeleteList.length; i++) {
                    this.grpobCommitModel.deleteList = this.grpobDeleteList;
                }
            }
            const grpobSaveData = this.ocmgobliFactory.grpObCommit(this.grpobCommitModel);
            grpobSaveData.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.grpObExecuteQuery();
                    return;
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    this.grpObExecuteQuery();
                    return;
                }
            });
        }
    }
    onObGrpGridInsert = () => {
        if (!this.obGrpValidations()) {
            return;
        }
        return {};
    }

    onGrpObGridInsert = () => {
        if (!this.grpObValidations()) {
            return;
        }
        return {};
    }

    onObGrpGridDelete = () => {
        if (this.grpobData.length > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.cannotdeletemasterrecord');
            this.show();
            return false;
        }
        return true;
    }

    validateObGrpRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'groupId') {
            for (let i = 0; i < this.obgrpData.length; i++) {
                for (let j = 0; j < this.obgrpData.length; j++) {
                    if (i !== j && this.obgrpData[i].groupId === Number(this.obgrpData[j].groupId)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmgobli.duplicategrpid');
                        this.show();
                        this.obGrpGrid.setColumnData('groupId', rowIndex, undefined);
                        rowdata.validated = true;
                        return rowdata;
                    }
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'deductionType') {
            for (let i = 0; i < this.grpobData.length; i++) {
                for (let j = 0; j < this.grpobData.length; j++) {
                    if (i !== j && this.grpobData[i].deductionType === this.grpobData[j].deductionType) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmgobli.duplicatededctiontype');
                        this.show();
                        this.grpObGrid.setColumnData('deductionType', rowIndex, undefined);
                        rowdata.validated = true;
                        return rowdata;
                    }
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    obGrpValidations() {
        const is = { valid: true };
        this.obgrpData.forEach(data => {
            if (is.valid) {
                if (!data.groupId && data.groupId !== 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmgobli.mustentergrpid');
                    this.show();
                    is.valid = false;
                    return;
                }
                if (!data.groupCode || !data.groupCode.trim()) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.codemustbeentered');
                    this.show();
                    is.valid = false;
                    return;
                }
                if (!data.groupDescription || !data.groupDescription.trim()) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.descriptionmustbeentered');
                    this.show();
                    is.valid = false;
                    return;
                }
            }
        });
        return is.valid;
    }

    grpObValidations() {
        const is = { valid: true };
        this.grpobData.forEach(data => {
            if (is.valid) {
                if (!data.deductionType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmgobli.mustenterobligationtype');
                    this.show();
                    is.valid = false;
                    return;
                }
            }
        });
        return is.valid;
    }
}
