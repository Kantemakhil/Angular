import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OimprfcaService } from '@inst/booking/maintainence/service/oimprfca.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ProfileTypesCommitBean } from '@inst/booking/maintainence/beans/ProfileTypesCommitBean';
import { ProfileCategoriesCommitBean } from '@inst/booking/maintainence/beans/ProfileCategoriesCommitBean';
import { ProfileCategories } from '@inst/booking/maintainence/beans/ProfileCategories';
import { ProfileTypes } from '@inst/booking/maintainence/beans/ProfileTypes';

export class ValidateRowReturn {
    validated: boolean;
    data: any;
}
@Component({
    selector: 'app-oimprfca',
    templateUrl: './oimprfca.component.html'
})
export class OimprfcaComponent implements OnInit {
    @ViewChild('grid') grid: any;
    msgs: any[] = [];
    pflcatData: ProfileCategories[] = [];
    pflcatModel: ProfileCategories = new ProfileCategories();
    pfltypeCommitModel: ProfileTypesCommitBean = new ProfileTypesCommitBean();
    pflcatCommitModel: ProfileCategoriesCommitBean = new ProfileCategoriesCommitBean();
    pflcatInsertList: ProfileCategories[] = [];
    pflcatUpdatetList: ProfileCategories[] = [];
    pflcatDeleteList: ProfileCategories[] = [];
    pfltypeData: ProfileTypes[] = [];
    pfltypeModel: ProfileTypes = new ProfileTypes();
    pfltypeInsertList: ProfileTypes[] = [];
    pfltypeUpdatetList: ProfileTypes[] = [];
    pflTypeColumnDef: any[];
    pflcatColumnDef:any[];
    msglist: any[];
    message: any;
    type: any;
    index: any;
    nextReadOnly: boolean;
    previousReadOnly: boolean;
    retrievedisabled: boolean;
    clearDisabled: boolean;
    profileTypeInsert: boolean;
    removeDisabled: boolean;
    addDisabled: boolean;
    profileCategoryReadOnly: boolean;
    resultTitles = {
        description: this.translateService.translate('common.description'),
        code: this.translateService.translate('oimprfca.formatType')
    };
    saveDisabled: boolean;
    tableIndex :number;
    updateDate: boolean;
    deleteDisalble : boolean;
    constructor(private oimprfcaFactory: OimprfcaService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.pflTypeColumnDef = [];
    }
    ngOnInit() {
        this.oimprfcaexecuteQuery();
        this.deleteDisalble = false;
        this.previousReadOnly = true;
        this.profileCategoryReadOnly = false;
        this.nextReadOnly = true;
        this.retrievedisabled = false;
        this.clearDisabled = true;
        this.profileTypeInsert = false;
        this.removeDisabled = true;
        this.saveDisabled = true;
        this.addDisabled = false;
        this.updateDate = false;
        this.pflcatModel.recheckFlag = 'Y';
        this.pflcatColumnDef = [
            {
                fieldName: this.translateService.translate('common.category') , field: 'profileCategory',required: true,
                width: 150, datatype: 'text', uppercase: 'true', maxlength: 12, cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('common.description'), field: 'description', editable: true,
                width: 150, datatype: 'text', maxlength: 40 ,required: true,
            },
            {
                fieldName: this.translateService.translate('common.sequence') + '*', field: 'listSeq', editable: true,
                width: 150, maxValue: '9999',  whole: true, datatype: 'number' , required: true
            },
            {
                fieldName: this.translateService.translate('oimprfca.recheck'), field: 'recheckFlag',
                editable: true, width: 150, datatype: 'checkbox', 
            },
        ];
        this.pflTypeColumnDef = [
            {
                fieldName: this.translateService.translate('common.type') + '*', field: 'profileType', editable: true,
                width: 150, datatype: 'text', uppercase: 'false', maxlength: 12, cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('common.description'), field: 'description', editable: true,
                width: 150, datatype: 'text', uppercase: 'false', maxlength: 40
            },
            {
                fieldName: this.translateService.translate('common.sequence') + '*', field: 'listSeq', editable: true,
                width: 150, maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('oimprfca.formatType') + '*', field: 'codeValueType',
                editable: true, width: 150, datatype: 'lov', domain: 'VALUE_TYPE', titles: this.resultTitles
            },
            {
                fieldName: this.translateService.translate('oimprfca.act'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oimprfca.upd'), field: 'updatedAllowedFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oimprfca.opt'), field: 'mandatoryFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date'
            },
        ];
    }
    /**
     * This function displays the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    onGridClear = () => {
        this.pfltypeExecuteQuery();
        return true;
    }

    onPflcatGridInsert = ()=>{
        this.pfltypeData = [];
        return {recheck:true};
    }

    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    isInsertable() {
        if (this.pflcatModel.profileCategory || this.pflcatModel.description || this.pflcatModel.listSeq
            || this.pflcatModel.recheckFlag) {
            this.clearDisabled = false;
            this.saveDisabled = false;
        } else {
            this.clearDisabled = true;
            this.saveDisabled = true;
        }
    }

    cancel() {
        this.addDisabled = false;
        this.previousReadOnly = true;
        this.nextReadOnly = true;
        this.retrievedisabled = false;
        this.profileTypeInsert = false;
        this.clearDisabled = true;
        this.removeDisabled = true;
        this.pflcatData = [];
        this.pflcatModel = new ProfileCategories();
        this.pfltypeData = [];
        this.pfltypeModel = new ProfileTypes();
        this.saveDisabled = true;
        this.profileCategoryReadOnly = false;
        this.updateDate = false;
    }

    onDeletePflcat = () => {
        if (this.pfltypeData.length > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.cannotdeletemaster');
            this.show();
            return;
        } else {
            return true;
        }
    }

    onRowClickPflcat = (event) => {
        if(event && event.createDatetime){
            this.pfltypeModel.profileCategory = event.profileCategory;
            this. pfltypeExecuteQuery();
            this.deleteDisalble = true;
        } else {
            this.deleteDisalble = false;
            this.pfltypeData = [];
        }
        
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimprfcaSavepflcatForm(event) {
        this.pflcatCommitModel = new ProfileCategoriesCommitBean(); 
        this.pflcatInsertList = [];
        this.pflcatUpdatetList = [];
        this.pflcatDeleteList = [];
        this.pflcatCommitModel.insertList = [];
        this.pflcatCommitModel.updateList = [];
        this.pflcatCommitModel.deleteList = [];
        this.pflcatInsertList = event.added;
        this.pflcatUpdatetList = event.updated;
        this.pflcatDeleteList = event.removed;
        if (this.pflcatInsertList.length > 0) {
            for (let i = 0; i < this.pflcatInsertList.length; i++) {
                if (!this.pflcatInsertList[i].profileCategory) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.categorymustbeenter');
                    this.show();
                    return;
                }
                const index=this.pflcatData.indexOf(this.pflcatInsertList[i]);
                for (let j = 0; this.pflcatData.length > j; j++) {
                    if (index !== j && this.pflcatData[j].profileCategory === this.pflcatInsertList[i].profileCategory) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimprfca.profileCategoryAlreadyExists');
                        this.show();
                        return;
                    }
                }
                if (!this.pflcatInsertList[i].description) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.descriptionmustbeentered');
                    this.show();
                    return;
                }
                if (!this.pflcatInsertList[i].listSeq && this.pflcatInsertList[i].listSeq !== 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimprfca.seqMustEnter');
                    this.show();
                    return;
                }
                this.pflcatInsertList[i].recheckFlag = this.pflcatInsertList[i].recheckFlag ? 'Y' : 'N';
            }
            this.pflcatCommitModel.insertList = this.pflcatInsertList;
        }

        if (this.pflcatUpdatetList.length > 0) {
            for (let i = 0; i < this.pflcatUpdatetList.length; i++) {
                if (!this.pflcatUpdatetList[i].profileCategory) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.categorymustbeenter');
                    this.show();
                    return;
                }
                const index=this.pflcatData.indexOf(this.pflcatUpdatetList[i]);
                for (let j = 0; this.pflcatData.length > j; j++) {
                    if (index !== j && this.pflcatData[j].profileCategory === this.pflcatUpdatetList[i].profileCategory) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimprfca.profileCategoryAlreadyExists');
                        this.show();
                        return;
                    }
                }
                if (!this.pflcatUpdatetList[i].description) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.descriptionmustbeentered');
                    this.show();
                    return;
                }
                if (!this.pflcatUpdatetList[i].listSeq && this.pflcatUpdatetList[i].listSeq !== 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimprfca.seqMustEnter');
                    this.show();
                    return;
                }
                this.pflcatUpdatetList[i].recheckFlag = this.pflcatUpdatetList[i].recheckFlag ? 'Y' : 'N';
            }
            this.pflcatCommitModel.updateList = this.pflcatUpdatetList;
        }
        if(this.pflcatDeleteList.length > 0){
            this.pflcatCommitModel.deleteList = this.pflcatDeleteList;
        }

        const pflcatSaveData = this.oimprfcaFactory.pflCatCommit(this.pflcatCommitModel);
        pflcatSaveData.subscribe(data => {
            if (data[0].sealFlag === "1") {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.oimprfcaexecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.oimprfcaexecuteQuery();
                return;
            }
        });
        
        // this.clearDisabled = false;
        // this.pflcatInsertList = [];
        // this.pflcatUpdatetList = [];
        // this.pflcatDeleteList = [];
        // this.pflcatCommitModel.insertList = [];
        // this.pflcatCommitModel.updateList = [];
        // this.pflcatCommitModel.deleteList = [];
        // if (!this.pflcatModel.profileCategory) {
        //     this.type = 'warn';
        //     this.message = this.translateService.translate('common.categorymustbeenter');
        //     this.show();
        //     return;
        // }
        // if (!this.pflcatModel.description) {
        //     this.type = 'warn';
        //     this.message = this.translateService.translate('common.descriptionmustbeentered');
        //     this.show();
        //     return;
        // }
        // if (!this.pflcatModel.listSeq && this.pflcatModel.listSeq !== 0) {
        //     this.type = 'warn';
        //     this.message = this.translateService.translate('oimprfca.seqMustEnter');
        //     this.show();
        //     return;
        // }
        // this.pflcatModel.recheckFlag = this.pflcatModel.recheckFlag ? 'Y' : 'N';
        // this.updateDate = false;
        // if (action === 'save') {
        //     if (!this.pflcatModel.createUserId) {
        //         this.pflcatInsertList.push(this.pflcatModel);
        //         this.pflcatCommitModel.insertList = this.pflcatInsertList;
        //     } else {
        //         this.updateDate = true;
        //         this.pflcatUpdatetList.push(this.pflcatModel);
        //         this.pflcatCommitModel.updateList = this.pflcatUpdatetList;
        //     }
        // } else if (action === 'delete') {
        //     if (this.pfltypeData.length > 0) {
        //         this.type = 'warn';
        //         this.message = this.translateService.translate('common.cannotdeletemaster');
        //         this.show();
        //         return false;
        //     }
        //     this.pflcatDeleteList.push(this.pflcatModel);
        //     this.pflcatCommitModel.deleteList = this.pflcatDeleteList;
        // }
        // const pflcatSaveData = this.oimprfcaFactory.pflCatCommit(this.pflcatCommitModel);
        // pflcatSaveData.subscribe(data => {
        //     if (String(data[0].errorMessage).indexOf('PROFILE_CATEGORIES') > 0) {
        //         this.type = 'warn';
        //         this.message = this.translateService.translate('oimprfca.profileCategoryAlreadyExists');
        //         this.show();
        //         this.updateDate = false;
        //     } else if (data[0] && data[0].sealFlag === 'deleted') {
        //         this.saveDisabled = true;
        //         this.profileTypeInsert = true;
        //         this.addDisabled = false;
        //         this.type = 'success';
        //         this.profileCategoryReadOnly = true;
        //         this.message = this.translateService.translate('common.recordsDeleted');
        //         this.show();
        //         if (!this.updateDate) {
        //             this.pflcatModel = new ProfileCategories();
        //             this.oimprfcaexecuteQuery();
        //         }
        //         return;
        //     } else if (data[0] && data[0].sealFlag === 'success') {
        //         this.saveDisabled = true;
        //         this.profileTypeInsert = true;
        //         this.addDisabled = false;
        //         this.type = 'success';
        //         this.profileCategoryReadOnly = true;
        //         this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        //         this.show();
        //         if (!this.updateDate) {
        //             this.pflcatModel = new ProfileCategories();
        //             this.oimprfcaexecuteQuery();
        //         }
        //         return;
        //     } else {
        //         this.type = 'warn';
        //         this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        //         this.show();
        //         return;
        //     }
        // });
    }
    oimprfcaexecuteQuery() {
        const serviceObj = this.oimprfcaFactory.
            pflCatExecuteQuery(this.pflcatModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.previousReadOnly = true;
                this.nextReadOnly = true;
                this.profileCategoryReadOnly = false;
                this.pflcatData = [];
                this.pfltypeData = [];
                this.pflcatModel = new ProfileCategories();
                this.clearDisabled = true;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycausedReEnter');
                this.show();
                return;
            } else {
                this.previousReadOnly = false;
                this.nextReadOnly = false;
                this.retrievedisabled = true;
                this.clearDisabled = false;
                this.profileTypeInsert = true;
                this.removeDisabled = false;
                this.profileCategoryReadOnly = true;
                data.forEach(element => {
                    element.recheckFlag = element.recheckFlag === 'Y' ? true : false;
                });
                this.pflcatData = data;
               // this.pflcatModel = this.pflcatData[0];
                this.index = 0;
                this.tableIndex = 0;
                // this.pfltypeModel = new ProfileTypes();
                // this.pfltypeModel.profileCategory = this.pflcatModel.profileCategory;
                // this.pfltypeExecuteQuery();
            }
        });
    }

    pfltypeExecuteQuery() {
        const pfltypeResult = this.oimprfcaFactory.pflTypeExecuteQuery(this.pfltypeModel);
        pfltypeResult.subscribe(pfltypeResultList => {
            this.saveDisabled = true;
            if (pfltypeResultList.length === 0) {
                this.pfltypeData = [];
            } else {
                pfltypeResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.updatedAllowedFlag = element.updatedAllowedFlag === 'Y' ? true : false;
                    element.mandatoryFlag = element.mandatoryFlag === 'Y' ? true : false;
                });
                this.pfltypeData = pfltypeResultList;
                this.tableIndex = 0;
                this.pfltypeModel = pfltypeResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimprfcaSavepfltypeForm(event) {
        this.pfltypeInsertList = event.added;
        this.pfltypeUpdatetList = event.updated;
        this.pfltypeCommitModel.insertList = [];
        this.pfltypeCommitModel.updateList = [];
        this.pfltypeCommitModel.deleteList = [];
        if (this.pfltypeInsertList.length > 0 || this.pfltypeUpdatetList.length > 0) {
            for (let i = 0; i < this.pfltypeInsertList.length; i++) {
                if (!this.pfltypeInsertList[i].profileType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimprfca.typemustbe');
                    this.show();
                    return;
                }
                if (!this.pfltypeInsertList[i].listSeq && this.pfltypeInsertList[i].listSeq !== 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimprfca.seqMustEnter');
                    this.show();
                    return;
                }
                 if (this.pfltypeInsertList[i].listSeq == 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimprfca.seqmustbeinbetween');
                    this.show();
                    return;
                }
                if (!this.pfltypeInsertList[i].codeValueType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimprfca.formatTypeMustEnter');
                    this.show();
                    return;
                }
                this.pfltypeInsertList[i].profileCategory = this.pfltypeModel.profileCategory;
                this.pfltypeInsertList[i].activeFlag = this.pfltypeInsertList[i].activeFlag ? 'Y' : 'N';
                this.pfltypeInsertList[i].updatedAllowedFlag = this.pfltypeInsertList[i].updatedAllowedFlag ? 'Y' : 'N';
                this.pfltypeInsertList[i].mandatoryFlag = this.pfltypeInsertList[i].mandatoryFlag ? 'Y' : 'N';
                this.pfltypeInsertList[i].modifiedDate = DateFormat.getDate();
                this.pfltypeCommitModel.insertList = this.pfltypeInsertList;
            }
            for (let i = 0; i < this.pfltypeUpdatetList.length; i++) {
                  if (!this.pfltypeUpdatetList[i].listSeq && this.pfltypeUpdatetList[i].listSeq !== 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimprfca.seqMustEnter');
                    this.show();
                    return;
                }
                 if (this.pfltypeUpdatetList[i].listSeq == 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimprfca.seqmustbeinbetween');
                    this.show();
                    return;
                }
                if (!this.pfltypeUpdatetList[i].codeValueType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimprfca.formatTypeMustEnter');
                    this.show();
                    return;
                }
                this.pfltypeUpdatetList[i].activeFlag = this.pfltypeUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.pfltypeUpdatetList[i].updatedAllowedFlag = this.pfltypeUpdatetList[i].updatedAllowedFlag ? 'Y' : 'N';
                this.pfltypeUpdatetList[i].mandatoryFlag = this.pfltypeUpdatetList[i].mandatoryFlag ? 'Y' : 'N';
                this.pfltypeUpdatetList[i].modifiedDate = DateFormat.getDate();
                this.pfltypeCommitModel.updateList = this.pfltypeUpdatetList;
            }
        }
        const pfltypeSaveData = this.oimprfcaFactory.pflTypeCommit(this.pfltypeCommitModel);
        pfltypeSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('PROFILE_TYPES_PK') > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimprfca.profileTypeAlreadyExists');
                this.show();
                return;
            } else if (data[0] && data[0].sealFlag === 'success') {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.pfltypeExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }
    previousRecord() {
        this.index--;
        if (this.index >= 0) {
            this.pfltypeModel = new ProfileTypes();
            this.pfltypeModel.profileCategory = this.pflcatData[this.index].profileCategory;
            this.pflcatModel = this.pflcatData[this.index];
            this.pfltypeExecuteQuery();
            this.nextReadOnly = false;
        } else {
            this.index = 0;
            this.previousReadOnly = true;
            this.type = 'warn';
            this.message = this.translateService.translate('common.atfirstrecord');
            this.show();
            return;
        }
    }
    nextRecord() {
        this.index++;
        if (this.index < this.pflcatData.length) {
            this.pfltypeModel = new ProfileTypes();
            this.pfltypeModel.profileCategory = this.pflcatData[this.index].profileCategory;
            this.pflcatModel = this.pflcatData[this.index];
            this.pfltypeExecuteQuery();
            this.previousReadOnly = false;
        } else {
            this.index = this.pflcatData.length - 1;
            this.nextReadOnly = true;
            this.type = 'warn';
            this.message = this.translateService.translate('common.lastrecordofquery');
            this.show();
            return;
        }
    }
    addProfileCatogory() {
        this.pfltypeData = [];
        this.pfltypeModel = new ProfileTypes();
        this.pflcatModel = new ProfileCategories();
        this.pflcatModel.recheckFlag = 'Y';
        this.retrievedisabled = true;
        this.addDisabled = true;
        this.previousReadOnly = true;
        this.nextReadOnly = true;
        this.retrievedisabled = true;
        this.profileTypeInsert = false;
        this.clearDisabled = false;
        this.removeDisabled = true;
        this.saveDisabled = true;
        this.profileCategoryReadOnly = false;
    }
    onGridInsert = () => {
       /*  for (let i = 0; i < this.pfltypeData.length; i++) {
            if (!this.pfltypeData[i].profileType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimprfca.typemustbe');
                this.show();
                return;
            }
            if (!this.pfltypeData[i].listSeq && this.pfltypeData[i].listSeq !== 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimprfca.seqMustEnter');
                this.show();
                return;
            }
            if (this.pfltypeData[i].listSeq == 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimprfca.seqmustbeinbetween');
                this.show();
                return;
            }
            if (!this.pfltypeData[i].codeValueType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimprfca.formatTypeMustEnter');
                this.show();
                return;
            }
        } */
        return {
            activeFlag: 'Y', updatedAllowedFlag: 'Y', mandatoryFlag: 'Y'
        };
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex,
                    DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
}
