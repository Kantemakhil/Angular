import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmssvctService } from '../service/ocmssvct.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourseActivityParties } from '../beans/CourseActivityParties';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { CourseActivityPartiesCommitBean } from '../beans/CourseActivityPartiesCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

// import required bean declarations

@Component({
    selector: 'app-ocmssvct',
    templateUrl: './ocmssvct.component.html'
})

export class OcmssvctComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('internalStaff', {static: true}) internalStaff: any;
    @ViewChild('externalStaff', {static: true}) externalStaff: any;
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    crsactptyData: CourseActivityParties[] = [];
    crsactptyDataTemp: CourseActivityParties[] = [];
    crsactptyModel: CourseActivityParties = new CourseActivityParties();
    crsactptyIndex: Number = 0;
    crsactptyInsertList: CourseActivityParties[] = [];
    crsactptyUpdatetList: CourseActivityParties[] = [];
    crsactptyDeleteList: CourseActivityParties[] = [];
    extconData: CourseActivityParties[] = [];
    extconDataTemp: CourseActivityParties[] = [];
    extconModel: CourseActivityParties = new CourseActivityParties();
    extconIndex: Number = 0;
    extconInsertList: CourseActivityParties[] = [];
    extconUpdatetList: CourseActivityParties[] = [];
    extconDeleteList: CourseActivityParties[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    crsActPtyColumnDef: any[];
    extConColumnDef: any[];
    crsActPtyReadOnly: Boolean = false;
    extConReadOnly: Boolean = false;
    rgstaffnameinstRg: any[] = [];
    rgstaffnamecommRg: any[] = [];
    rgteammembersRg: any[] = [];
    rgstaffnameinstprogRg: any[] = [];
    rgstaffnamecommprogRg: any[] = [];
    crsactptyCommitModel: CourseActivityPartiesCommitBean = new CourseActivityPartiesCommitBean();
    extconCommitModel: CourseActivityPartiesCommitBean = new CourseActivityPartiesCommitBean();
    crsactptyAllInsertList: CourseActivityParties[] = [];
    crsactptyAllUpdatetList: CourseActivityParties[] = [];
    crsactptyAllDeleteList: CourseActivityParties[] = [];
    crsactptyAllCommitModel: CourseActivityPartiesCommitBean = new CourseActivityPartiesCommitBean();
    tableIndex: number;
    lastNameLink: string;
    exconGrid: number;
    agyLocIdMap: Map<string, string> = new Map<string, string>();
    disableLov: boolean;
    deleteInternalGrid: boolean;
    delteExternalGrid: boolean;
    enableInserInternal: boolean;
    updateInternal: boolean;
    enableInsertExternal: boolean;
    updateExternal: boolean;
    message = ' Invalid.';
    categoryTitles: { code: string; description: string; firstName: string };
    saveButtonGo: boolean;
    crsactptySearchModel: CourseActivityParties = new CourseActivityParties();retriveDisabled: boolean;
    clearDisabled: boolean;
    namesReadOnly: boolean;
    partyCode: any;
    providerId: any;
    lastNameTitles: { description: string; firstName: string; };
    staffIdTitle = {
        'description': this.translateService.translate('ocmssvct.firstname'),
        'firstName': this.translateService.translate('ocmssvct.lovlastname')
    };

    constructor(private ocmssvctFactory: OcmssvctService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.crsActPtyColumnDef = [];
        this.extConColumnDef = [];
    }
    ngOnInit() {
        this.lastNameTitles = {  description: this.translateService.translate('ocmssvct.lovlastname'),
        firstName: this.translateService.translate('ocmssvct.firstname') };
        this.disableLov = false;
        this.deleteInternalGrid = false;
        this.delteExternalGrid = false;
        this.enableInsertExternal = false;
        this.enableInserInternal = false;
        this.updateExternal = false;
        this.updateInternal = false;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        if (this.sessionManager.currentCaseLoadType === 'COMM') {
            if (this.dialog.data.providerCode === 'ACP' || this.dialog.data.providerPartyCode === 'ACP') {
                if (this.dialog.data.providerCode === 'ACP') {
                    this.providerId = this.dialog.data.providerId;
                } else {
                    this.providerId = this.dialog.data.providerPartyId;
                }

                this.lastNameLink = '/ocmssvct/rgStaffNameCommProgRecordGroup?providerPartyId=' +  this.providerId
                    + '&programId=' + this.dialog.data.programId;
                const cgfkAgylocidServiceObj = this.ocmssvctFactory.rgStaffNameCommProgRecordGroup( this.providerId,
                    this.dialog.data.programId);
                cgfkAgylocidServiceObj.subscribe(cgfkAgylocidList => {
                    if (cgfkAgylocidList.length === 0) {
                        this.rgstaffnamecommRg = [];
                        this.disableLov = true;
                    } else {
                        for (let i = 0; i < cgfkAgylocidList.length; i++) {
                            this.rgstaffnamecommRg.push({
                                'code': cgfkAgylocidList[i].code + ' - ' +
                                    cgfkAgylocidList[i].description, 'id': cgfkAgylocidList[i].code
                            });
                            this.agyLocIdMap.set(cgfkAgylocidList[i].code, cgfkAgylocidList[i].firstName);
                        }
                    }
                });
            } else {
                if (this.dialog.data.providerId) {
                    this.providerId = this.dialog.data.providerId;
                } else {
                    this.providerId = this.dialog.data.providerPartyId;
                }
                this.lastNameLink = '/ocmssvct/rgStaffNameCommRecordGroup?providerId=' +  this.providerId;
                const cgfkAgylocidServiceObj = this.ocmssvctFactory.rgStaffNameCommRecordGroup( this.providerId);
                cgfkAgylocidServiceObj.subscribe(cgfkAgylocidList => {
                    if (cgfkAgylocidList.length === 0) {
                        this.rgstaffnamecommRg = [];
                        this.disableLov = true;
                    } else {
                        for (let i = 0; i < cgfkAgylocidList.length; i++) {
                            this.rgstaffnamecommRg.push({
                                'code': cgfkAgylocidList[i].code + ' - ' +
                                    cgfkAgylocidList[i].description, 'id': cgfkAgylocidList[i].code
                            });
                            this.agyLocIdMap.set(cgfkAgylocidList[i].code, cgfkAgylocidList[i].firstName);
                        }
                    }
                });
            }
        }
        if (this.sessionManager.currentCaseLoadType === 'INST') {
            if (this.dialog.data.providerCode === 'ACP' || this.dialog.data.providerPartyCode === 'ACP') {
                if (this.dialog.data.providerCode === 'ACP') {
                    this.partyCode = this.dialog.data.providerCode;
                } else {
                    this.partyCode = this.dialog.data.providerPartyCode;
                }
                this.lastNameLink = '/ocmssvct/rgStaffNameInstProgRecordGroup?providerPartyCode=' + this.partyCode
                    + '&programId=' + this.dialog.data.programId;
                const cgfkAgylocidServiceObj = this.ocmssvctFactory.rgStaffNameInstProgRecordGroup
                    (this.partyCode, this.dialog.data.programId);
                cgfkAgylocidServiceObj.subscribe(cgfkAgylocidList => {
                    if (cgfkAgylocidList.length === 0) {
                        this.rgstaffnamecommRg = [];
                        this.disableLov = true;
                    } else {
                        for (let i = 0; i < cgfkAgylocidList.length; i++) {
                            this.rgstaffnamecommRg.push({
                                'code': cgfkAgylocidList[i].code + ' - ' +
                                    cgfkAgylocidList[i].description, 'id': cgfkAgylocidList[i].code
                            });
                            this.agyLocIdMap.set(cgfkAgylocidList[i].code, cgfkAgylocidList[i].firstName);
                        }
                    }
                });
            } else {
                if (this.dialog.data.providerCode) {
                    this.partyCode = this.dialog.data.providerCode;
                } else {
                    this.partyCode = this.dialog.data.providerPartyCode;
                }
                this.lastNameLink = '/ocmssvct/rgStaffNameInstRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType
                    + '&providerPartyCode=' + this.partyCode;
                const cgfkAgylocidServiceObj = this.ocmssvctFactory.rgStaffNameInstRecordGroup
                    (this.sessionManager.currentCaseLoadType, this.partyCode);
                cgfkAgylocidServiceObj.subscribe(cgfkAgylocidList => {
                    if (cgfkAgylocidList.length === 0) {
                        this.rgstaffnamecommRg = [];
                        this.disableLov = true;
                    } else {
                        for (let i = 0; i < cgfkAgylocidList.length; i++) {
                            this.rgstaffnamecommRg.push({
                                'code': cgfkAgylocidList[i].code + ' - ' +
                                    cgfkAgylocidList[i].description, 'id': cgfkAgylocidList[i].code
                            });
                            this.agyLocIdMap.set(cgfkAgylocidList[i].code, cgfkAgylocidList[i].firstName);
                        }
                    }
                });
            }
        }
        this.crsActPtyColumnDef = [
           
            {
                fieldName: this.translateService.translate('ocmssvct.lastname'), field: 'staffId', editable: true, width: 150,
                datatype: 'lov', link: this.lastNameLink, cellEditable: this.canAlertEdit, titles: this.staffIdTitle,source:'OUMPERSO'
            },
            { fieldName: '', field: 'test', hide: true },
            {
                fieldName: this.translateService.translate('ocmssvct.firstname'), field: 'nbtFirstName', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('ocmssvct.contactinformation'), field: 'contactText', editable: true,
                width: 150, cellEditable: this.canAlertEditGrid, datatype: 'text', uppercase: 'false', maxlength: 80
            },
        ];
        this.extConColumnDef = [
            {
                fieldName: this.translateService.translate('ocmssvct.lastname'), field: 'lastName', editable: true,
                width: 150, cellEditable: this.canAlertEditGrid, datatype: 'text', uppercase: 'false', maxlength: 35
            },
            {
                fieldName: this.translateService.translate('ocmssvct.firstname'), field: 'firstName', editable: true,
                width: 150, cellEditable: this.canAlertEditGrid, datatype: 'text', uppercase: 'false', maxlength: 35
            },
            {
                fieldName: this.translateService.translate('ocmssvct.role'), field: 'partyRoleText', editable: true,
                width: 150, cellEditable: this.canAlertEditGrid, datatype: 'text', uppercase: 'false', maxlength: 40
            },
            {
                fieldName: this.translateService.translate('ocmssvct.contactinformation'), field: 'contactText',
                editable: true, width: 150, cellEditable: this.canAlertEditGrid, datatype: 'text', uppercase: 'false', maxlength: 80
            },
        ];
        this.crsactptyExecuteQuery();
        this.extconExecuteQuery();


        if (this.dialog.data.pQueryOnly === 'N') {
            this.enableInserInternal = true;
            this.updateInternal = true;
            this.deleteInternalGrid = true;

            this.enableInsertExternal = true;
            this.updateExternal = true;
            this.delteExternalGrid = true;
        } else {

            this.enableInserInternal = false;
            this.updateInternal = false;
            this.deleteInternalGrid = false;
            this.enableInsertExternal = false;
            this.updateExternal = false;
            this.delteExternalGrid = false;
        }

        // TODO all initializations here
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        
        if ((!data.crsActyPartyId || this.disableLov) && field === 'staffId' && this.dialog.data.pQueryOnly === 'N') {
            return true;
        }
        return false;
    }
    excludeGroupGridValidations() {
        const is = { valid: true };
        if (this.extconData && this.extconData) {
            this.extconData.forEach(element => {
                if (!element.lastName) {
                    this.show(this.translateService.translate('ocmssvct.lastnamemandatory'), 'warn');
                    is.valid = false;
                }
            });
        }
        return is.valid;
    }

    onExcludeGroupInsert = () => {
        if (!this.excludeGroupGridValidations()) {
            return;
        }
        return {};
    }

    
    canAlertEditGrid = (data: any, index: number, field: string): boolean => {
        if (this.dialog.data.pQueryOnly && this.dialog.data.pQueryOnly === 'Y') {
            return false;
        } else {
            return true;
        }
    }
    includeGroupGridValidations() {
        const is = { valid: true };
        if (this.crsactptyData && this.crsactptyData) {
            this.crsactptyData.forEach(element => {
                if (!element.staffId) {
                    this.show(this.translateService.translate('ocmssvct.lastnamemandatory'), 'warn');
                    is.valid = false;
                }
            });
        }
        return is.valid;
    }

    onIncludeGroupInsert = () => {
        // if (!this.includeGroupGridValidations()) {
        //     return;
        // }
        return {};
    }

    onButExitclick() {
        this.dialog.close(null);
    }
    validateRow = (event) => {
        const rowdata = new ValidateRowReturn();

        return rowdata;
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'staffId') {
            if (event.data.staffId) {
                const data = this.agyLocIdMap.get(event.data.staffId);
                this.internalStaff.setColumnData('nbtFirstName', rowIndex, data);
                rowdata.validated = true;
                return rowdata;
            } else {
                this.internalStaff.setColumnData('staffId', rowIndex, undefined);
            }
        }
        rowdata.validated = true;
        return rowdata;
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
    onRowClickcrsactpty(event) {
        if (event) {
            this.crsactptyModel = event;
            if (this.crsactptyModel.createDatetime && (  this.dialog.data.pQueryOnly === 'N')) {
                this.deleteInternalGrid = true;
            } else {
                this.deleteInternalGrid = false;
            }
        }
    }
    onRowClickextcon(event) {
        if (event) {
            this.extconModel = event;
            if (this.extconModel.createDatetime && (this.dialog.data.pQueryOnly === 'N')) {
                this.delteExternalGrid = true;
            } else {
                this.delteExternalGrid = false;
            }
        }
    }
    isInsertable() {
        if (this.crsactptySearchModel.staffId) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }
    clear() {
        this.crsactptyData = [];
        this.crsactptySearchModel = new CourseActivityParties();
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;

    }

    crsActPtyGridClear=()=>{
        this.crsactptyExecuteQuery();
    }

    crsactptyExecuteQuery() {
        this.crsactptySearchModel.crsActyId = this.dialog.data.crsActyId;
        const crsactptyResult = this.ocmssvctFactory.crsActPtyExecuteQuery(this.crsactptySearchModel);
        crsactptyResult.subscribe(crsactptyResultList => {
            if (crsactptyResultList.length === 0) {
                this.crsactptyData = [];
                this.retriveDisabled = false;
                this.namesReadOnly = false;
            } else {
                crsactptyResultList.forEach(element => {
                    element.staffId = element.staffId.toString();
                });
                this.crsactptyData = crsactptyResultList;
                this.crsactptyModel = crsactptyResultList[0];
                this.tableIndex = 0;
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
            }

        });
    }
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
    ocmssvctSavecrsactptyForm(event) {
        if (!this.includeGroupGridValidations()) {
            return;
        }
        // TODO declare commit bean and add insert list to that object.
        this.crsactptyInsertList = event.added;
        this.crsactptyUpdatetList = event.updated;
        this.crsactptyDeleteList = event.removed;
        this.crsactptyCommitModel.insertList = [];
        this.crsactptyCommitModel.updateList = [];
        this.crsactptyCommitModel.deleteList = [];
        if (this.crsactptyInsertList.length > 0 || this.crsactptyUpdatetList.length > 0) {
            for (let i = 0; i < this.crsactptyInsertList.length; i++) {
                this.crsactptyInsertList[i].crsActyId = this.dialog.data.crsActyId;
                this.crsactptyCommitModel.insertList = this.crsactptyInsertList;
            }
            for (let i = 0; i < this.crsactptyUpdatetList.length; i++) {
                this.crsactptyCommitModel.updateList = this.crsactptyUpdatetList;
            }

        }
        if (this.crsactptyDeleteList.length > 0) {
            for (let i = 0; i < this.crsactptyDeleteList.length; i++) {
                this.crsactptyCommitModel.deleteList = this.crsactptyDeleteList;
            }
        }
        const crsactptySaveData = this.ocmssvctFactory.crsActPtyCommit(this.crsactptyCommitModel);
        crsactptySaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('COUSRE_ACTIVITY_PARTIES_PK') > 0) {
                this.show(this.translateService.translate('ocmssvct.primarykeyviolation'), 'warn');
                this.crsactptyExecuteQuery();
                return;
            }
            if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
                this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
                this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
                this.show(this.message, 'warn');
                this.crsactptyExecuteQuery();
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.crsactptyExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.crsactptyExecuteQuery();
                return;
            }
        });
    }
    extconExecuteQuery() {
        this.extconModel = new CourseActivityParties();
        this.extconModel.crsActyId = this.dialog.data.crsActyId;
        const extconResult = this.ocmssvctFactory.extConExecuteQuery(this.extconModel);
        extconResult.subscribe(extconResultList => {
            if (extconResultList.length === 0) {
                this.extconData = [];
            } else {
                this.extconData = extconResultList;
                this.extconModel = extconResultList[0];
                this.exconGrid = 0;
            }
        });
    }
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
    ocmssvctSaveextconForm(event) {
        if (!this.excludeGroupGridValidations()) {
            return ;
        }
        // TODO declare commit bean and add insert list to that object.
        this.extconInsertList = event.added;
        this.extconUpdatetList = event.updated;
        this.extconDeleteList = event.removed;
        this.extconCommitModel.insertList = [];
        this.extconCommitModel.updateList = [];
        this.extconCommitModel.deleteList = [];
        if (this.extconInsertList.length > 0 || this.extconUpdatetList.length > 0) {
            for (let i = 0; i < this.extconInsertList.length; i++) {
                this.extconInsertList[i].crsActyId = this.dialog.data.crsActyId;
                this.extconCommitModel.insertList = this.extconInsertList;
            }
            for (let i = 0; i < this.extconUpdatetList.length; i++) {
                this.extconCommitModel.updateList = this.extconUpdatetList;
            }

        }
        if (this.extconDeleteList.length > 0) {
            for (let i = 0; i < this.extconDeleteList.length; i++) {
                this.extconCommitModel.deleteList = this.extconDeleteList;
            }
        }
        const extconSaveData = this.ocmssvctFactory.crsActPtyCommit(this.extconCommitModel);
        extconSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('COUSRE_ACTIVITY_PARTIES_PK') > 0) {
                this.show(this.translateService.translate('ocmssvct.primarykeyviolation'), 'warn');
                this.extconExecuteQuery();
                return;
            }
            if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
                this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
                this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
                this.show(this.message, 'warn');
                this.extconExecuteQuery();
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.extconExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.extconExecuteQuery();
                return;
            }
        });
    }
    executeQueryCall() {
        this.crsactptyExecuteQuery();
        this.extconExecuteQuery();
    }
    save() {
        this.saveButtonGo = true;
        this.crsactptyAllCommitModel = new CourseActivityPartiesCommitBean();
        this.crsactptyAllInsertList = [];
        this.crsactptyAllUpdatetList = [];
        this.crsactptyAllDeleteList = [];
        this.internalStaff.addedMap.forEach(
            (v: any, k: number) => {
                this.crsactptyAllInsertList.push(v);
                if (!this.includeGroupGridValidations()) {
                    this.saveButtonGo = false;
                    return false;
                }
                for (let i = 0; i < this.crsactptyAllInsertList.length; i++) {
                    this.crsactptyAllInsertList[i].crsActyId = this.dialog.data.crsActyId;
                    this.crsactptyAllCommitModel.insertList = this.crsactptyAllInsertList;
                }
            }
        );
        if (!this.saveButtonGo) {
            return;
       }
        this.internalStaff.updatedMap.forEach(
            (v: any, k: number) => {
                this.crsactptyAllUpdatetList.push(v);
                for (let i = 0; i < this.crsactptyAllUpdatetList.length; i++) {
                    this.crsactptyAllUpdatetList[i].crsActyId = this.dialog.data.crsActyId;
                }
                this.crsactptyAllCommitModel.updateList = this.crsactptyAllUpdatetList;
            }
        );
        this.internalStaff.removedMap.forEach(
            (v: any, k: number) => {
                this.crsactptyAllDeleteList.push(v);
                this.crsactptyAllCommitModel.deleteList = this.crsactptyAllDeleteList;
            }
        );

        this.externalStaff.addedMap.forEach(
            (v: any, k: number) => {
                this.crsactptyAllInsertList.push(v);
                if (!this.excludeGroupGridValidations()) {
                    this.saveButtonGo = false;
                    return false;
                }
                for (let i = 0; i < this.crsactptyAllInsertList.length; i++) {
                    this.crsactptyAllInsertList[i].crsActyId = this.dialog.data.crsActyId;
                    this.crsactptyAllCommitModel.insertList = this.crsactptyAllInsertList;
                }
            }
        );
        if (!this.saveButtonGo) {
            return;
       }
        this.externalStaff.updatedMap.forEach(
            (v: any, k: number) => {
                this.crsactptyAllUpdatetList.push(v);
                for (let i = 0; i < this.crsactptyAllUpdatetList.length; i++) {
                    this.crsactptyAllUpdatetList[i].crsActyId = this.dialog.data.crsActyId;
                }
                this.crsactptyAllCommitModel.updateList = this.crsactptyAllUpdatetList;
            }
        );
        this.externalStaff.removedMap.forEach(
            (v: any, k: number) => {
                this.crsactptyAllDeleteList.push(v);
                this.crsactptyAllCommitModel.deleteList = this.crsactptyAllDeleteList;
            }
        );

        const crsactptySaveData = this.ocmssvctFactory.crsActPtyCommit(this.crsactptyAllCommitModel);
        crsactptySaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('COUSRE_ACTIVITY_PARTIES_PK') > 0) {
                this.show(this.translateService.translate('ocmssvct.primarykeyviolation'), 'warn');
                this.executeQueryCall();
                return;
            }
            if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
                this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
                this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
                this.show(this.message, 'warn');
                this.executeQueryCall();
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.executeQueryCall();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.executeQueryCall();
                return;
            }
        });
    }
    get affDisableFlag() {
        // tslint:disable-next-line:max-line-length
        if ((this.dialog.data.pQueryOnly && this.dialog.data.pQueryOnly === 'Y') && (this.externalStaff.addedMap.size > 0 || this.externalStaff.updatedMap.size > 0
            || this.externalStaff.removedMap.size > 0 || this.internalStaff.addedMap.size > 0 || this.internalStaff.updatedMap.size > 0
            || this.internalStaff.removedMap.size > 0)) {
            return false;
        }
        return true;
    }
    onLastNameBlur() {
        if (!this.crsactptySearchModel.staffId) {
            this.crsactptySearchModel.staffId = undefined;
        }
    }
}
