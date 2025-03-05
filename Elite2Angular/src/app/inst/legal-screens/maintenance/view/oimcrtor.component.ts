import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimcrtorService } from '@instlegalscreens/maintenance/service/oimcrtor.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OrderTypesCommitBean } from '@instlegalscreens/maintenance/beans/OrderTypesCommitBean';
import { IwpTemplateObjectsCommitBean } from '@instlegalscreens/maintenance/beans/IwpTemplateObjectsCommitBean';
import { OrderTypes } from '@instlegalscreens/maintenance/beans/OrderTypes';
import { IwpTemplateObjects } from '@inst/casemanagement/beans/IwpTemplateObjects';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
    selector: 'app-oimcrtor',
    templateUrl: './oimcrtor.component.html'
})

export class OimcrtorComponent implements OnInit {
    // Variable declaration
    @ViewChild('grid') grid: any;
    @ViewChild('orderTypesGrid') orderTypesGrid: any;
    msgs: any[] = [];
    ordertypesData: OrderTypes[] = [];
    ordertypesModel: OrderTypes = new OrderTypes();
    ordertypesIndex = -1;
    ordertypesCommitModel: OrderTypesCommitBean = new OrderTypesCommitBean();
    ordertypesInsertList: OrderTypes[] = [];
    ordertypesUpdatetList: OrderTypes[] = [];
    ordertypesDeleteList: OrderTypes[] = [];
    iwptemplateobjectsData: IwpTemplateObjects[] = [];
    iwptemplateobjectsModel: IwpTemplateObjects = new IwpTemplateObjects();
    iwptemplateobjectsIndex = -1;
    iwptemplateobjectsInsertList: IwpTemplateObjects[] = [];
    iwptemplateobjectsUpdatetList: IwpTemplateObjects[] = [];
    iwptemplateobjectsDeleteList: IwpTemplateObjects[] = [];
    iwptemplateobjectsCommitModel: IwpTemplateObjectsCommitBean = new IwpTemplateObjectsCommitBean();
    orderTypesColumnDef: any[];
    iwpTemplateObjectsColumnDef: any[];
    retrievedisabled: boolean;
    clearDisabled: boolean;
    orderTypesInsert: boolean;
    iwpObjGridInsert: boolean;
    iwpObjGridDelete: boolean;
    iwpTempObjDeleteFlag: boolean;
    disableSearchFields: boolean;
    activeFlag: boolean;
    msglist: any[];
    message: any;
    type: any;
    index: any;
    attachedTempLink: string;
    orderCategoryTitles = { description: 'Description', code: 'Category' };
    templateTitles = { code: 'Template Name', description: 'Description' };
    attachTemplate: any[] = [];
    constructor(private oimcrtorFactory: OimcrtorService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        // TODO initilize data members here..!
        this.orderTypesColumnDef = [];
        this.iwpTemplateObjectsColumnDef = [];
    }
    ngOnInit() {
        this.retrievedisabled = true;
        this.clearDisabled = true;
        this.orderTypesInsert = false;
        this.iwpObjGridInsert = false;
        this.iwpObjGridDelete = false;
        this.disableSearchFields = false;
        this.orderTypesColumnDef = [
            {
                fieldName: this.translateService.translate('oimcrtor.orderType') + '*', field: 'orderType', editable: true,
                datatype: 'text', maxlength: 12, cellEditable: this.canAlertEdit, width: 150
            },
            {
                fieldName: this.translateService.translate('common.description') + '*', field: 'description', editable: true,
                datatype: 'text', maxlength: 40, uppercase: 'false', width: 150
            },
            {
                fieldName: this.translateService.translate('common.category') + '*', field: 'orderCategory', editable: true, width: 150,
                datatype: 'lov', domain: 'ORD_CATEGORY', titles: this.orderCategoryTitles
            },
            {
                fieldName: this.translateService.translate('oimcrtor.custodyDays'), field: 'custodyDays', editable: true, width: 150
                , maxValue: '9999', strictFP: true, whole: true, datatype: 'number', cellEditable: this.canACustodyDaysEdit
            },
            {
                fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true,
                width: 150, maxValue: '999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            },
        ];
        this.iwpTemplateObjectsColumnDef = [
            {
                fieldName: this.translateService.translate('oimcrtor.attachedTemplate') + '*', field: 'templateName',source:'OUMDTEMP',
                editable: true, width: 150,
                datatype: 'lov', link: 'oimcrtor/rgTemplateRecordGroup', titles: this.templateTitles, cellEditable: this.canAlertEditOne
            },
            {
                fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true,
                width: 90, maxValue: '999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 100,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 100,
                datatype: 'date'
            },
        ];
        this.oimcrtorexecuteQuery();
        this.getAttachTemple();
    }
    /**
* This function displays the messages
*/
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onRowClickordertypes(event) {
        this.iwptemplateobjectsModel = new IwpTemplateObjects();
        this.iwptemplateobjectsModel.objectCode = event.orderType;
        this.iwptemplateobjectsExecuteQuery();
    }
    onRowClickiwptemplateobjects(event) {
        this.iwpTempObjDeleteFlag = false;
        if (event && event.templateId) {
            const serviceObj = this.oimcrtorFactory.checkIwpTempObjDelete(event.templateId);
            serviceObj.subscribe(data => {
                if (data && data > 0) {
                    this.iwpTempObjDeleteFlag = true;
                }
            });
        }
    }

    cancel() {
        this.ordertypesModel = new OrderTypes();
        this.ordertypesData = [];
        this.iwptemplateobjectsModel = new IwpTemplateObjects();
        this.iwptemplateobjectsData = [];
        this.retrievedisabled = false;
        this.clearDisabled = true;
        this.orderTypesInsert = true;
        this.disableSearchFields = false;
        this.activeFlag = undefined;
        this.iwpObjGridInsert = false;
    }

    onOrderTypesGridInsert = () => {
        for (let i = 0; i < this.ordertypesData.length; i++) {
            if (!this.ordertypesData[i].orderType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcrtor.ordertypemsg');
                this.show();
                return;
            }
            if (!this.ordertypesData[i].description) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.descriptionmustbeentered');
                this.show();
                return;
            }
            if (!this.ordertypesData[i].orderCategory) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.categorymustbeenter');
                this.show();
                return;
            }
        }
		this.iwpObjGridInsert = false;
        return { activeFlag: 'Y' };
    }

    onGridInsert = () => {
        this.iwpObjGridDelete = false;
        for (let i = 0; i < this.iwptemplateobjectsData.length; i++) {
            if (!this.iwptemplateobjectsData[i].templateName) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcrtor.enterAttachedTemplate');
                this.show();
                return;
            }
        }
        return { activeFlag: 'Y' };
    }
    isInsertable(date?) {
        if ((this.ordertypesModel.orderType || this.ordertypesModel.description
            || this.ordertypesModel.orderCategory || this.ordertypesModel.custodyDays
            || this.ordertypesModel.listSeq || this.activeFlag || this.ordertypesModel.expiryDate) || this.disableSearchFields) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
        if (date) {
            this.clearDisabled = false;
        }
    }

    getAttachTemple() {
        this.oimcrtorFactory.rgTemplateRecordGroup().subscribe(data => this.attachTemplate = data && Array.isArray(data) ? data : []);
      }

    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    canACustodyDaysEdit = (data: any, index: number, field: string): boolean => {
        if (!data.orderCategory || data.orderCategory === 'HOLD_ORDER') {
            return true;
        } else {
            return false;
        }
    }

    canAlertEditOne = (data: any, index: number, field: string): boolean => {
         if (!data.createDatetime && field === 'templateName') {
            if (data.templateName && data.createDatetime) {
                return false;
              } else {
                return true;
              }
        } else if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    oimcrtorSaveordertypesForm(event) {
        this.ordertypesInsertList = event.added;
        this.ordertypesUpdatetList = event.updated;
        this.ordertypesDeleteList = event.removed;
        this.ordertypesCommitModel.insertList = [];
        this.ordertypesCommitModel.updateList = [];
        this.ordertypesCommitModel.deleteList = [];
        if (this.ordertypesInsertList.length > 0 || this.ordertypesUpdatetList.length > 0) {
            for (let i = 0; i < this.ordertypesInsertList.length; i++) {
                if (!this.ordertypesInsertList[i].orderType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimcrtor.ordertypemsg');
                    this.show();
                    return;
                }
                if (!this.ordertypesInsertList[i].description) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.descriptionmustbeentered');
                    this.show();
                    return;
                }
                if (!this.ordertypesInsertList[i].orderCategory) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.categorymustbeenter');
                    this.show();
                    return;
                }
                this.ordertypesInsertList[i].activeFlag = this.ordertypesInsertList[i].activeFlag ? 'Y' : 'N';
                this.ordertypesInsertList[i].youthOrderFlag = 'Y';
                this.ordertypesInsertList[i].custodyFlag = 'Y';
                this.ordertypesInsertList[i].timeSensitiveFlag = 'Y';
                this.ordertypesInsertList[i].updateAllowedFlag = 'Y';
                this.ordertypesInsertList[i].scheduleFlag = 'Y';
                this.ordertypesInsertList[i].chargesFlag = 'Y';
                this.ordertypesCommitModel.insertList = this.ordertypesInsertList;
            }
            for (let i = 0; i < this.ordertypesUpdatetList.length; i++) {
                if (!this.ordertypesUpdatetList[i].orderType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimcrtor.ordertypemsg');
                    this.show();
                    return;
                }
                if (!this.ordertypesUpdatetList[i].description) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.descriptionmustbeentered');
                    this.show();
                    return;
                }
                if (!this.ordertypesUpdatetList[i].orderCategory) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.categorymustbeenter');
                    this.show();
                    return;
                }
                this.ordertypesUpdatetList[i].activeFlag = this.ordertypesUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.ordertypesCommitModel.updateList = this.ordertypesUpdatetList;
            }
        }
        if (this.ordertypesDeleteList.length > 0) {
            for (let i = 0; i < this.ordertypesDeleteList.length; i++) {
                this.ordertypesCommitModel.deleteList = this.ordertypesDeleteList;
            }
        }
        const ordertypesSaveData = this.oimcrtorFactory.orderTypesCommit(this.ordertypesCommitModel);
        ordertypesSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.ordertypesData = [];
                this.iwptemplateobjectsData = [];
                this.oimcrtorexecuteQuery();
                return;
            } else if(data === 2){
                this.type = 'warn';
                this.message = this.translateService.translate('oimcrtor.rowexistsalreadyintheordertypestable');
                this.show();
                this.oimcrtorexecuteQuery();
                return;
			}	
              else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }
    oimcrtorexecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                this.clearDisabled = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                this.clearDisabled = false;
                return;
            }
        }
        if (this.activeFlag === true) {
            this.ordertypesModel.activeFlag = 'Y';
        } else {
            this.ordertypesModel.activeFlag = undefined;
        }
        const serviceObj = this.oimcrtorFactory.
            orderTypesExecuteQuery(this.ordertypesModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.ordertypesData = [];
                this.iwptemplateobjectsData = [];
                this.ordertypesModel = new OrderTypes();
                this.clearDisabled = true;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycausedReEnter');
                this.show();
                return;
            } else {
                this.disableSearchFields = true;
                this.clearDisabled = false;
                this.orderTypesInsert = true;
                this.iwpObjGridInsert = true;
                this.ordertypesIndex = 0;
                this.iwptemplateobjectsModel = new IwpTemplateObjects();
                this.ordertypesData = data;
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.iwptemplateobjectsModel.objectCode = data[0].orderType;
            }
        });
    }
    iwptemplateobjectsExecuteQuery() {
        const iwptemplateobjectsResult = this.oimcrtorFactory.
            iwpTemplateObjectsExecuteQuery(this.iwptemplateobjectsModel);
        iwptemplateobjectsResult.subscribe(data => {
            if (data.length === 0) {
                this.iwptemplateobjectsData = [];
            } else {
                this.iwpObjGridDelete = true;
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.iwptemplateobjectsData = data;
                this.iwptemplateobjectsIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oimcrtorSaveiwptemplateobjectsForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.iwptemplateobjectsInsertList = event.added;
        this.iwptemplateobjectsUpdatetList = event.updated;
        this.iwptemplateobjectsDeleteList = event.removed;
        this.iwptemplateobjectsCommitModel.insertList = [];
        this.iwptemplateobjectsCommitModel.updateList = [];
        this.iwptemplateobjectsCommitModel.deleteList = [];
        if (this.iwptemplateobjectsInsertList.length > 0 || this.iwptemplateobjectsUpdatetList.length > 0) {
            for (let i = 0; i < this.iwptemplateobjectsInsertList.length; i++) {
                if (!this.iwptemplateobjectsInsertList[i].templateName) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimcrtor.enterAttachedTemplate');
                    this.show();
                    return;
                }
                this.iwptemplateobjectsInsertList[i].activeFlag = this.iwptemplateobjectsInsertList[i].activeFlag ? 'Y' : 'N';
                this.iwptemplateobjectsInsertList[i].objectCode = this.iwptemplateobjectsModel.objectCode;
                this.iwptemplateobjectsInsertList[i].objectType = 'ORDER';
                this.iwptemplateobjectsCommitModel.insertList = this.iwptemplateobjectsInsertList;
            }
            for (let i = 0; i < this.iwptemplateobjectsUpdatetList.length; i++) {
                this.iwptemplateobjectsUpdatetList[i].activeFlag = this.iwptemplateobjectsUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.iwptemplateobjectsCommitModel.updateList = this.iwptemplateobjectsUpdatetList;
            }
        }
        if (this.iwptemplateobjectsDeleteList.length > 0) {
            for (let i = 0; i < this.iwptemplateobjectsDeleteList.length; i++) {
                this.iwptemplateobjectsCommitModel.deleteList = this.iwptemplateobjectsDeleteList;
            }
        }
        const iwptemplateobjectsSaveData = this.oimcrtorFactory.iwpTemplateObjectsCommit(this.iwptemplateobjectsCommitModel);
        iwptemplateobjectsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.iwptemplateobjectsExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }

    validateOrderTypesRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.orderTypesGrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.orderTypesGrid.setColumnData('expiryDate', rowIndex,
                    DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'orderCategory') {
            if (!event.data.orderCategory || event.data.orderCategory != 'HOLD_ORDER') {
                this.orderTypesGrid.setColumnData('custodyDays', rowIndex, undefined);
            }
        }
        rowdata.validated = true;
        return rowdata;
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

    onGridDelete = () => {
        if (this.iwpTempObjDeleteFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('oimcrtor.canNotDeleteIwp');
            this.show();
            return false;
        }
        return true;
    }
    onGridClear = () => {
        this.iwptemplateobjectsExecuteQuery();
        return true;
    }

    onOrderTypesGridClear = () => {
        this.oimcrtorexecuteQuery();
        return true;
    }

    onCategoryBlur() {
        if (!this.ordertypesModel.orderCategory) {
          this.ordertypesModel.orderCategory = this.ordertypesModel.orderCategory === '' ? undefined : '';
        }
      }
}
