import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidstgaeService } from '../service/oidstgae.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn, GridComponent } from '@ui-components/grid/grid.component';
import { StgRelationships } from '@commonbeans/StgRelationships';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { StgRelationshipsCommitBean } from '@commonbeans/StgRelationshipsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oidstgae',
    templateUrl: './oidstgae.component.html'
})

export class OidstgaeComponent implements OnInit {
    msgs: any[] = [];
    stgrltData: StgRelationships[] = [];
    stgrltModel: StgRelationships = new StgRelationships();
    stgrltSelected: StgRelationships = new StgRelationships();
    stgrltIndex = -1;
    stgrltSectedIndex = -1;
    stgrltInsertList: StgRelationships[] = [];
    stgrltCommitModel: StgRelationshipsCommitBean = new StgRelationshipsCommitBean();
    stgrltUpdatetList: StgRelationships[] = [];
    stgrelationshipsData: StgRelationships[] = [];
    stgrelationshipsModel: StgRelationships = new StgRelationships();
    stgrelationshipsSelected: StgRelationships = new StgRelationships();
    stgrelationshipsInsertList: StgRelationships[] = [];
    stgrelationshipsCommitModel: StgRelationshipsCommitBean = new StgRelationshipsCommitBean();
    stgrelationshipsUpdatetList: StgRelationships[] = [];
    stgrelationshipIndex = -1;
    stgrelationshipSelectedIndex = -1;
    stgRltColumnDef: any[] = [];
    stgRelationshipsColumnDef: any[] = [];
    groupTitles: any;
    data: any;
    stgRltCommentText: string;
    stgrelationshipsCommentText: string;
    lovURLMap: Map<string, string> = new Map();
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('aliceGrid') aliceGrid: GridComponent;
    @ViewChild('emimyGrid') emimyGrid: GridComponent;
    constructor(private oidstgaeFactory: OidstgaeService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
    }
    ngOnInit() {
        this.data = this.dialog.data;
        this.lovURLMap.set('1', `oidstgae/rgStg1RecordGroup?stgId=${this.data.stgId}`);
        this.lovURLMap.set('2', `oidstgae/rgStg2RecordGroup?stgId=${this.data.stgId}`);
        this.lovURLMap.set('3', `oidstgae/rgStg3RecordGroup?stgId=${this.data.stgId}`);
        this.groupTitles = { stgLevel: this.trMsg('common.group'), description: this.trMsg('oidstgae.groupone'),
         stgCode: this.trMsg('oidstgae.stgcode') };
         this.stgRltColumnDef = [
            {
                fieldName: this.trMsg('oidstgae.groups', '*'), field: 'relatedStgId', datatype: 'lov',source:'OIMTGNGS',
                link: 'oidstgae/rgStg2RecordGroup?stgId=' + this.dialog.data.stgId,titles: this.groupTitles, cellEditable: this.canCellEdit,
            },
            { fieldName: this.trMsg('common.reason', '*'), field: 'reason', datatype: 'lov', domain: 'STG_ALLY_RSN',
             cellEditable: this.canCellEdit, },
            { fieldName: this.trMsg('common.effectivedate', '*'), field: 'effectiveDate', datatype: 'date',
             cellEditable: this.canCellEdit, },
            { fieldName: this.trMsg('common.enteredby'), field: 'createUserId', editable: false, width: 150 },
            { fieldName: this.trMsg('common.active'), field: 'activeFlag', datatype: 'checkbox', editable: true, width: 150 },
            { fieldName: this.trMsg('common.expirydate'), field: 'expiryDate', datatype: 'date', editable: false, width: 150 },
            { fieldName: this.trMsg('common.expiredby'), field: 'expiredBy', editable: false, width: 150 },
            { fieldName: this.trMsg(''), field: 'commentText', hide: true }
        ];
        this.stgRelationshipsColumnDef = [
            {
                fieldName: this.trMsg('oidstgae.groups', '*'), field: 'relatedStgId', datatype: 'lov',source:'OIMTGNGS',
                 link: 'oidstgae/rgStg2RecordGroup?stgId=' + this.dialog.data.stgId, editable: true, width: 150,
                  titles: this.groupTitles, cellEditable: this.canCellEdit,
            },
            { fieldName: this.trMsg('common.reason', '*'), field: 'reason', datatype: 'lov', domain: 'STG_NONA_RSN',
             cellEditable: this.canCellEdit, },
            { fieldName: this.trMsg('common.effectivedate', '*'), field: 'effectiveDate',
             datatype: 'date', cellEditable: this.canCellEdit, },
            { fieldName: this.trMsg('common.enteredby'), field: 'createUserId', editable: false, width: 150 },
            { fieldName: this.trMsg('common.active'), field: 'activeFlag', datatype: 'checkbox', editable: true, width: 150 },
            { fieldName: this.trMsg('common.expirydate'), field: 'expiryDate', datatype: 'date', editable: false, width: 150 },
            { fieldName: this.trMsg('common.expiredby'), field: 'expiredBy', editable: false, width: 150 },
            { fieldName: this.trMsg(''), field: 'commentText', hide: true }
        ];
        this.groupLovRecordGroupNumber();
        this.stgrltExecuteQuery();
        this.stgrelationshipsExecuteQuery();
    }
    stgrltInsert = () => {
        if (!this.validateGridRowData(this.stgrltData, '')) {
            return null;
        }

        return this.newRecord();
    }

    stgrelationshipsInsert = () => {
        if (!this.validateGridRowData(this.stgrelationshipsData, 'e')) {
            return null;
        }
        return this.newRecord();
    }
    stgrltValidateRow = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.newValue !== event.oldValue) {
            if (event.field === 'relatedStgId') {
                if (event.newValue && (event.data.relationshipSeq === undefined || event.data.relationshipSeq === null)) {
                    this.aliceGrid.setColumnData('effectiveDate', index, DateFormat.getDate());
                    this.aliceGrid.setColumnData('createUserId', index, this.sessionManager.getId());
                }
                if (event.newValue) {
                    this.oidstgaeFactory.stgRltGroupPostChange(event.data.stgId, event.newValue).subscribe(count => {
                        if (count > 0) {
                            this.show('oidstgae.selectedgroupalredayanenemy');
                            this.aliceGrid.setColumnData('relatedStgId', index, null);
                        }
                    });
                }
            }
            if (event.field === 'activeFlag') {
                if (event.newValue) {
                    if (event.data.relatedStgId) {
                        const count = this.stgrelationshipsData.filter(dup => {
                            if (dup.relatedStgId && Number(dup.relatedStgId) === Number(event.newValue)) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        if (count.length > 0) {
                            this.show('oidstgae.cannotreactivetherecordenemy');
                            this.aliceGrid.setColumnData('activeFlag', index, null);
                        } else {
                            this.oidstgaeFactory.stgRltGroupPostChange(event.data.stgId, event.data.relatedStgId).subscribe(lvCount => {
                                if (lvCount > 0) {
                                    this.show('oidstgae.cannotreactivetherecordenemy');
                                    this.aliceGrid.setColumnData('activeFlag', index, null);
                                } else {
                                    this.aliceGrid.setColumnData('expiryDate', index, null);
                                    this.aliceGrid.setColumnData('expiredBy', index, null);
                                }
                            });
                        }
                    }
                } else {
                    setTimeout(ele => {
                        this.aliceGrid.setColumnData('expiryDate', index, !event.newValue ? DateFormat.getDate() : null);
                        this.aliceGrid.setColumnData('expiredBy', index, !event.newValue ? this.sessionManager.getId() : null);
                    }, 50);
                }


            }
            if (event.field === 'commentText') {
                this.stgrltSelected.commentText = event.newValue;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    stgrelationshipsValidateRow = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.newValue !== event.oldValue) {
            if (event.field === 'relatedStgId') {
                if (event.newValue && (event.data.relationshipSeq === undefined || event.data.relationshipSeq === null)) {
                    this.emimyGrid.setColumnData('effectiveDate', index, DateFormat.getDate());
                    this.emimyGrid.setColumnData('createUserId', index, this.sessionManager.getId());
                }
                this.oidstgaeFactory.stgRelationshipsCheckBoxChange(event.data.stgId, event.newValue).subscribe(count => {
                    if (count > 0) {
                        this.show('oidstgae.slelectedgroupalredaliance');
                        this.emimyGrid.setColumnData('relatedStgId', index, null);
                    }
                });
            }
            if (event.field === 'activeFlag') {
                if (event.newValue) {
                    if (event.data.relatedStgId) {
                        const count = this.stgrltData.filter(dup => {
                            if (dup.relatedStgId && Number(dup.relatedStgId) === Number(event.newValue)) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        if (count.length > 0) {
                            this.show('oidstgae.cannotreactedaliance');
                            this.emimyGrid.setColumnData('activeFlag', index, null);
                        } else {
                            this.oidstgaeFactory.stgRelationshipsCheckBoxChange(event.data.stgId, event.data.relatedStgId)
                                .subscribe(lvCount => {
                                    if (lvCount > 0) {
                                        this.show('oidstgae.cannotreactedaliance');
                                        this.emimyGrid.setColumnData('activeFlag', index, null);
                                    } else {
                                        this.emimyGrid.setColumnData('expiryDate', index, null);
                                        this.emimyGrid.setColumnData('expiredBy', index, null);
                                    }
                                });
                        }
                    }
                } else {
                    setTimeout(ele => {
                        this.emimyGrid.setColumnData('expiryDate', index, !event.newValue ? DateFormat.getDate() : null);
                        this.emimyGrid.setColumnData('expiredBy', index, !event.newValue ? this.sessionManager.getId() : null);
                    }, 50);
                }

                if (event.field === 'commentText') {
                    this.stgrelationshipsSelected.commentText = event.newValue;
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    newRecord = () => {
        const newRecord = new StgRelationships();
        newRecord.activeFlag = 'Y';
        newRecord.stgId = this.data.stgId;
        return newRecord;
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
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    onRowClickstgrlt(event) {
        if (event) {
            this.stgrltSectedIndex = this.stgrltData.indexOf(event);
            this.stgrltSelected = JSON.parse(JSON.stringify(event));
        } else {
            this.stgrltSelected = new StgRelationships();
            this.stgrltSectedIndex = -1;
        }
        this.stgRltCommentText = this.stgrltSelected.commentText;
    }
    allowNumbers(event) {
    }
    onRowClickstgrelationships(event) {
        if (event) {
            this.stgrelationshipSelectedIndex = this.stgrelationshipsData.indexOf(event);
            this.stgrelationshipsSelected = JSON.parse(JSON.stringify(event));
            } else {
            this.stgrelationshipsSelected = new StgRelationships();
            this.stgrelationshipSelectedIndex = -1;
        }
        this.stgrelationshipsCommentText = this.stgrelationshipsSelected.commentText;
    }
    stgrltExecuteQuery() {
        this.stgrltIndex = -1;
        this.stgrltSectedIndex = -1;
        this.stgrltModel.stgId = this.data.stgId;
        const stgrltResult = this.oidstgaeFactory.
            stgRltExecuteQuery(this.stgrltModel);
        stgrltResult.subscribe(stgrltResultList => {
            if (stgrltResultList.length === 0) {
                this.stgrltData = [];
            } else {
                stgrltResultList.forEach(ele => {
                    ele.relatedStgId = String(ele.relatedStgId);
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
                });
                this.stgrltData = stgrltResultList;
                this.stgrltModel = stgrltResultList[0];
                this.stgrltIndex = 0;
            }
        });
    }
    stgrelationshipsCommentChange(event) {
        this.emimyGrid.setColumnData('commentText', this.stgrelationshipSelectedIndex, event);
    }
    stgrltCommentChange(event) {
        this.aliceGrid.setColumnData('commentText', this.stgrltSectedIndex, event);
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidstgaeSavestgrltForm(event) {
        if (!this.validateGridRowData(this.stgrltData, '')) {
            return;
        }
        this.stgrltInsertList = event.added;
        this.stgrltInsertList.forEach(ele => {
            ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
        });
        this.stgrltUpdatetList = event.updated;
        this.stgrltUpdatetList.forEach(ele => {
            ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
        });
        this.stgrltCommitModel.insertList = [];
        this.stgrltCommitModel.updateList = [];
        this.stgrltCommitModel.insertList = this.stgrltInsertList;
        this.stgrltCommitModel.updateList = this.stgrltUpdatetList;
        const stgrltSaveData = this.oidstgaeFactory.stgRltCommit(this.stgrltCommitModel);
        stgrltSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else if (String(data).startsWith('oidstgae')) {
                this.show(data);
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
            this.stgrltExecuteQuery();
        });
    }
    stgrelationshipsExecuteQuery() {
        this.stgrelationshipIndex = -1;
        this.stgrelationshipSelectedIndex = -1;
        this.stgrelationshipsModel.stgId = this.data.stgId;
        const stgrelationshipsResult = this.oidstgaeFactory.
            stgRelationshipsExecuteQuery(this.stgrelationshipsModel);
        stgrelationshipsResult.subscribe(stgrelationshipsResultList => {
            if (stgrelationshipsResultList.length === 0) {
                this.stgrelationshipsData = [];
            } else {
                stgrelationshipsResultList.forEach(ele => {
                    ele.relatedStgId = String(ele.relatedStgId);
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
                });
                this.stgrelationshipsData = stgrelationshipsResultList;
                this.stgrelationshipsModel = stgrelationshipsResultList[0];
                this.stgrelationshipIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidstgaeSavestgrelationshipsForm(event) {
        if (!this.validateGridRowData(this.stgrelationshipsData, 'e')) {
            return;
        }
        this.stgrelationshipsInsertList = event.added;
        this.stgrelationshipsInsertList.forEach(ele => {
            ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
        });
        this.stgrelationshipsUpdatetList = event.updated;
        this.stgrelationshipsUpdatetList.forEach(ele => {
            ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
        });
        this.stgrelationshipsCommitModel.insertList = [];
        this.stgrelationshipsCommitModel.updateList = [];

        this.stgrelationshipsCommitModel.insertList = this.stgrelationshipsInsertList;
        this.stgrelationshipsCommitModel.updateList = this.stgrelationshipsUpdatetList;
        const stgrelationshipsSaveData = this.oidstgaeFactory.stgRelationshipsCommit(this.stgrelationshipsCommitModel);
        stgrelationshipsSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else if (String(data).startsWith('oidstgae')) {
                this.show(data);
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
            this.stgrelationshipsExecuteQuery();
        });
    }

    groupLovRecordGroupNumber() {
        this.oidstgaeFactory.groupLovRecordGroupNumber()
            .subscribe(data => {
                if (!data || typeof data === 'object') {
                    this.show(' oidstgae.lovnotexist ');
                }
                // this.stgRltColumnDef = [
                //     {
                //         fieldName: this.trMsg('oidstgae.groups', '*'), field: 'relatedStgId', datatype: 'lov',
                //         link: this.lovURLMap.get(String(data)), titles: this.groupTitles, cellEditable: this.canCellEdit,
                //     },
                //     { fieldName: this.trMsg('common.reason', '*'), field: 'reason', datatype: 'lov', domain: 'STG_ALLY_RSN',
                //      cellEditable: this.canCellEdit, },
                //     { fieldName: this.trMsg('common.effectivedate', '*'), field: 'effectiveDate', datatype: 'date',
                //      cellEditable: this.canCellEdit, },
                //     { fieldName: this.trMsg('common.enteredby'), field: 'createUserId', editable: false, width: 150 },
                //     { fieldName: this.trMsg('common.active'), field: 'activeFlag', datatype: 'checkbox', editable: true, width: 150 },
                //     { fieldName: this.trMsg('common.expirydate'), field: 'expiryDate', datatype: 'date', editable: false, width: 150 },
                //     { fieldName: this.trMsg('common.expiredby'), field: 'expiredBy', editable: false, width: 150 },
                //     { fieldName: this.trMsg(''), field: 'commentText', hide: true }
                // ];
                // this.stgRelationshipsColumnDef = [
                //     {
                //         fieldName: this.trMsg('oidstgae.groups', '*'), field: 'relatedStgId', datatype: 'lov',
                //          link: this.lovURLMap.get(String(data)), editable: true, width: 150,
                //           titles: this.groupTitles, cellEditable: this.canCellEdit,
                //     },
                //     { fieldName: this.trMsg('common.reason', '*'), field: 'reason', datatype: 'lov', domain: 'STG_NONA_RSN',
                //      cellEditable: this.canCellEdit, },
                //     { fieldName: this.trMsg('common.effectivedate', '*'), field: 'effectiveDate',
                //      datatype: 'date', cellEditable: this.canCellEdit, },
                //     { fieldName: this.trMsg('common.enteredby'), field: 'createUserId', editable: false, width: 150 },
                //     { fieldName: this.trMsg('common.active'), field: 'activeFlag', datatype: 'checkbox', editable: true, width: 150 },
                //     { fieldName: this.trMsg('common.expirydate'), field: 'expiryDate', datatype: 'date', editable: false, width: 150 },
                //     { fieldName: this.trMsg('common.expiredby'), field: 'expiredBy', editable: false, width: 150 },
                //     { fieldName: this.trMsg(''), field: 'commentText', hide: true }
                // ];
                // this.aliceGrid.columnDefs = this.stgRltColumnDef;
                // // this.emimyGrid.columnDefs = this.stgRelationshipsColumnDef;
                // this.aliceGrid.prepareAgColumnDef();
                // this.emimyGrid.prepareAgColumnDef();
            });
    }

    canCellEdit = (data: any, index: number, field: string) => {
        if (field === 'relatedStgId' || field === 'reason' || field === 'effectiveDate') {
            if (data.createDatetime) {
                return false;
            }
        }
        return true;
    }

    validateGridRowData(list: any[], block) {
        const is = { valid: true };
        if (list && Array.isArray(list)) {
            list.forEach(data => {
                if (is.valid) {
                    if (!data.relatedStgId) {
                        this.show(`oidstgae.${block}groupmustbeentr`);
                        is.valid = false;
                        return;
                    }
                    if (!data.reason) {
                        this.show(`oidstgae.${block}reasonmustbeenter`);
                        is.valid = false;
                        return;
                    }
                    if (!data.effectiveDate) {
                        this.show(`oidstgae.${block}effectivedatemustbeentered`);
                        is.valid = false;
                        return;
                    }
                }

                const count = list.filter(dup => {
                    if (Number(dup.relatedStgId) === Number(data.relatedStgId) && dup.reason === data.reason) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (count.length > 1) {
                    this.show('oidstgae.rowalreadyexistwithsamecode');
                    is.valid = false;
                    return;
                }
            });
        }
        return is.valid;
    }


}
