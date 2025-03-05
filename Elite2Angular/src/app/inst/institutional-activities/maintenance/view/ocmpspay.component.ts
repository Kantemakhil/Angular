import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ReferenceDomainService } from '@core/ui-components/lov/reference-domain.service';
import { OcmpspayService } from '@inst/institutional-activities/maintenance/service/ocmpspay.service';
import { programsPayBean } from '@inst/institutional-activities/maintenance/beans/programsPayBean';
import { programsPayCommitBean } from '@inst/institutional-activities/maintenance/beans/programsPayCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { programsPayCompensationBean } from '@inst/institutional-activities/maintenance/beans/programsPayCompensationBean';
import { programsPayCompensationCommitBean } from '@inst/institutional-activities/maintenance/beans/programsPayCompensationCommitBean';
// import required bean declarations

@Component({
    selector: 'app-ocmpspay',
    templateUrl: './ocmpspay.component.html'
})

export class OcmpspayComponent implements OnInit {
    // Variable declaration
    @ViewChild('grid', { static: true }) grid: any;
    @ViewChild('compgrid', { static: true }) compgrid: any;
    msgs: any[] = [];
    msglist: any[];
    message: any;
    type: any;
    categoryColumnDef: any[];
    compRatesColumnDef: any[];
    offCompensationData: any[];
    offCategoryData: any[];
    categoryModel: programsPayBean = new programsPayBean();
    typeLink: string;
    tableIndex: -1;
    selectedIndex = -1;
    categoryData: programsPayBean[] = [];
    categoryCommitBean: programsPayCommitBean = new programsPayCommitBean;
    categoryInsertList: programsPayBean[] = [];
    categoryUpdateList: programsPayBean[] = [];
    compensationData: programsPayCompensationBean[] = [];
    compensationCommitBean: programsPayCompensationCommitBean = new programsPayCompensationCommitBean;
    compensationInsertList: programsPayCompensationBean[] = [];
    compensationUpdateList: programsPayCompensationBean[] = [];
    compensationDeleteList: programsPayCompensationBean[] = [];
    lovTitles = {
        description: this.translateService.translate('ocmpspay.description'),
        codes: this.translateService.translate('ocmpspay.code')
    };
    progServicesData: any;
    constructor(private refCodeService: ReferenceDomainService, public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private ocmpspayservice: OcmpspayService) {
        this.categoryColumnDef = [];
        this.compRatesColumnDef = [];
    }
    ngOnInit() {
        this.categoryColumnDef = [
            {
                fieldName: this.translateService.translate('ocmpspay.code'), field: 'programCategory', editable: true, width: 150, datatype: 'lov',
                domain: 'PS_CATEGORY', required: true, cellEditable: this.canCatCellEdit
            },
            {
                fieldName: this.translateService.translate('ocmpspay.active'), field: 'activeFlag', editable: true, datatype: 'checkbox', width: 150
            },
            {
                fieldName: this.translateService.translate('ocmpspay.expirydate'), field: 'expiryDate', editable: false, width: 150, datatype: 'date'
            },
        ];
        this.compRatesColumnDef = [

            {
                fieldName: this.translateService.translate('ocmpspay.type'), field: 'programId', editable: true, width: 150, datatype: 'lov'
                , link: this.typeLink, required: true, cellEditable: this.canCellEdit,
                titles: {
                    description: this.translateService.translate('common.description'),
                    codes: this.translateService.translate('common.code')
                },source:'OCMSERVI'
            },
            {
                fieldName: this.translateService.translate('ocmpspay.code'), field: 'crsActyId', editable: true, width: 150, datatype: 'lov'
                , parentField: 'programId', link: 'ocmpspay/rgCompensationCodeRecordGroup?programId=', cellEditable: this.canCellEdit,
                titles: {
                    codes: this.translateService.translate('common.code')
                    , description: this.translateService.translate('common.description')
                },source:'OCMSPRAC'
            },
            {
                fieldName: this.translateService.translate('ocmpspay.unit'), field: 'unit', editable: true, width: 150, datatype: 'lov', required: true
                , cellEditable: this.canCellEdit, link: 'ocmpspay/rgUnitRecordGroup',domain:'UNIT'
            },
            {
                fieldName: this.translateService.translate('ocmpspay.rate'), field: 'rate',  format: '1.2-2',
                editable: true, width: 150, datatype: 'number', required: true,maxValue: 999999999.99,whole: true,rightAlign: true
            },
            {
                fieldName: '', field: 'hideValue', hide: true
            },

        ];
        this.categoryExecuteQuery();
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
    canCatCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    onRowClickEvent(event) {
        this.compensationData = [];
        if (event) {
            this.compensationData = [];
            this.categoryModel = event;
            if (event.createDatetime) {
                this.compRatesColumnDef[0].link = 'ocmpspay/rgCompensationTypeRecordGroup?programCategory=' + event.programCategory;
              
                if(this.categoryModel.programCategory === 'ACP'){
                    this.compRatesColumnDef[1].source = 'OCMSVACP';
                } else {
                    this.compRatesColumnDef[1].source = 'OCMSPRAC';
                }
                
                this.compgrid.prepareAgColumnDef();
                this.compensationExecuteQuery();
            }
        } else {
            this.typeLink = undefined;
            this.compensationData = [];
        }
    }
    onCategorySave(event) {
        this.categoryCommitBean = new programsPayCommitBean();
        this.categoryInsertList = event.added;
        this.categoryUpdateList = event.updated;
        this.categoryCommitBean.insertList = [];
        this.categoryCommitBean.updateList = [];
        if (this.categoryInsertList.length > 0) {
            this.categoryInsertList.forEach(element => {
                element.activeFlag = element.activeFlag ? 'Y' : 'N';
                element.createDatetime = DateFormat.getDate();
                element.createUserId = this.sessionManager.getId();
            });
            this.categoryCommitBean.insertList = this.categoryInsertList;
        }
        if (this.categoryUpdateList.length > 0) {
            this.categoryUpdateList.forEach(element => {
                element.activeFlag = element.activeFlag ? 'Y' : 'N';
            });
            this.categoryCommitBean.updateList = this.categoryUpdateList;
        }
        const vactattSaveData = this.ocmpspayservice.prgCategoryCommit(this.categoryCommitBean);
        vactattSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.categoryExecuteQuery();
                return;
            } else if (data === 2) {
                this.show('ocmpspay.codealreadyexists', 'warn');
                this.compensationExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.categoryExecuteQuery();
                return;
            }
        });
    }
    categoryExecuteQuery() {
        const searchResult = this.ocmpspayservice.prgCategoryExecuteQuery();
        searchResult.subscribe(data => {
            if (data.length === 0) {
                this.categoryData = [];
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.categoryData = data;
            }
        });
    }
    onGridInsert = () => {
        return { activeFlag: true };
    }
    get enableInsertBtn() {
        if (!this.categoryModel.createDatetime || !this.categoryModel.activeFlag) {
            return false
        }
        return true;
    }
    validateRowData = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (!event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', index, DateFormat.getDate());
            } else {
                this.grid.setColumnData('expiryDate', index, undefined);
            }
        }

        rowdata.validated = true;
        return rowdata;

    }
    validateCompRowData = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'programId'&& !event.data.createDatetime) {
            this.compgrid.setColumnData('crsActyId', index, undefined);
        }
        rowdata.validated = true;
        return rowdata;

    }
    compensationExecuteQuery() {
        const searchResult = this.ocmpspayservice.prgCampensationExecuteQuery(this.categoryModel);
        searchResult.subscribe(data => {
            if (data.length === 0) {
                this.compensationData = [];
                this.selectedIndex = -1;
            } else {
                data.forEach(element => {
                    element.programCategory = this.categoryModel.programCategory;
                    if (element.crsActyId) {
                        element.crsActyId = String(element.crsActyId);
                    }
                    if (element.programId) {
                        element.programId = String(element.programId);
                    }
                });
                this.compensationData = data;
                this.selectedIndex = 0;
            }
        });
    }
    onRowClickCompensation(event) {

    }
    onCompensationSave(event) {
        this.compensationCommitBean = new programsPayCompensationCommitBean();
        this.compensationInsertList = event.added;
        this.compensationUpdateList = event.updated;
        this.compensationDeleteList = event.removed;
        this.compensationCommitBean.insertList = [];
        this.compensationCommitBean.updateList = [];
        this.compensationCommitBean.deleteList = [];
        if (this.compensationInsertList.length > 0) {
            this.compensationInsertList.forEach(element => {
                element.createDatetime = DateFormat.getDate();
                element.createUserId = this.sessionManager.getId();
                element.programCategory = this.categoryModel.programCategory;

                if (element.crsActyId) {
                    element.crsActyId = Number(element.crsActyId);
                } else {
                    element.crsActyId = 0;
                }

                if (element.programId) {
                    element.programId = Number(element.programId);
                }
            });
            this.compensationCommitBean.insertList = this.compensationInsertList;
        }
        if (this.compensationUpdateList.length > 0) {
            this.compensationUpdateList.forEach(element => {
                if (!element.crsActyId) {
                    element.crsActyId = 0;
                } 
            });
            this.compensationCommitBean.updateList = this.compensationUpdateList;
        }
        if (this.compensationDeleteList.length > 0) {
            this.compensationDeleteList.forEach(element => {
                if (!element.crsActyId) {
                    element.crsActyId = 0;
                } 
            });
            this.compensationCommitBean.deleteList = this.compensationDeleteList;
        }
        const vactattSaveData = this.ocmpspayservice.prgCampensationCommit(this.compensationCommitBean);
        vactattSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.compensationExecuteQuery();
                return;
            } else if (data === 2) {
                this.show('ocmpspay.recordalreadyexistswithtypeandcode', 'warn');
                this.compensationExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.compensationExecuteQuery();
                return;
            }
        });
    }
}
