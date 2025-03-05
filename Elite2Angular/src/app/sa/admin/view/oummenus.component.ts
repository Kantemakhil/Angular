import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OummenusService } from '@sa/admin/service/oummenus.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VMenuSecs } from '@sa/admin/beans/VMenuSecs';
import { MenuSecuritiesCommitBean } from '@sa/admin/beans/MenuSecuritiesCommitBean';
import { MenuSecurities } from '@sa/admin/beans/MenuSecurities';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
@Component({
    selector: 'app-oummenus',
    templateUrl: './oummenus.component.html'
})

export class OummenusComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    msgs: any[] = [];
    vMenuSecsData: VMenuSecs[] = [];
    vMenuSecsRowData: VMenuSecs[] = [];
    vMenuSecsDataObj: VMenuSecs[] = [];
    vMenuSecsModel: VMenuSecs = new VMenuSecs();
    vMenuSecsBean: VMenuSecs = new VMenuSecs();
    vMenuSecsIndex = 0;
    menuSecsInsertList: MenuSecurities[] = [];
    menuSecsUpdateList: MenuSecurities[] = [];
    menuSecsDeleteList: MenuSecurities[] = [];
    vMenuSecsColumnDef: any[];
    mymenuReadOnly = false;
    vMenuSecsReadOnly = false;
    rgMenuSecDescRg: any[] = [];
    tableIndex = -1;
    menuSecsCommitModel: MenuSecuritiesCommitBean = new MenuSecuritiesCommitBean();
    lovTitles = { 'description': this.translateService.translate('common.modulename'), 'code': this.translateService.translate('common.description') };
    modulesMap: Map<string, string> = new Map<string, string>();
    titles = { 'code': this.translateService.translate('common.modulename'),
        'moduleName': this.translateService.translate('common.description') };
    valid: boolean;
    validation: boolean;
    validationOne: boolean;
    constructor(private oummenusFactory: OummenusService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.vMenuSecsColumnDef = [];
    }
    ngOnInit() {
        this.vMenuSecsExecuteQuery();
        this.tableIndex = -1;
        this.valid = false;
        this.validation = false;
        this.validationOne = false;
        this.vMenuSecsColumnDef = [
            {
                fieldName: this.translateService.translate('oummenus.menuid'), field: 'menuId', editable: false, width: 150,
                datatype: 'number', maxValue: 9999999999, strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('oummenus.parentmenuid') + '*',
                field: 'parentMenuId', editable: true, width: 150,
                datatype: 'number', maxValue: 99999999999, strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('oummenus.menuitem') + '*', field: 'menuItem',
                editable: true, width: 150, maxlength: 60, datatype: 'text', uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('common.modulename'), field: 'moduleName',
                editable: true, width: 150, datatype: 'lov', link: 'oummenus/rgMenuSecDescRecordGroup', titles: this.titles
            },
            {
                fieldName: this.translateService.translate('common.moduledescription'), field: 'moduleDescription',
                editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 100
            },
            {
                fieldName: this.translateService.translate('oummenus.sortorder') + '*', field: 'sortOrder', editable: true, width: 150,
                datatype: 'number', maxValue: 999, strictFP: true, whole: true
            },
            {
                fieldName: '', field: 'sealFlag', hide: true, editable: true
            },
        ];
        const result = this.oummenusFactory.
            rgMenuSecDescRecordGroup();
        result.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(ele => {
                    this.modulesMap.set(ele.code, ele.description);
                });
            }
        });
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
    get gridInsBtn() {
        if (this.vMenuSecsModel.menuId ||
            this.vMenuSecsModel.parentMenuId || this.vMenuSecsModel.menuItem ||
            this.vMenuSecsModel.description || this.vMenuSecsModel.moduleDescription ||
            this.vMenuSecsModel.moduleName || this.vMenuSecsModel.sortOrder) {
            return false;
        } else {
            return true;
        }
    }
    /**
   *  This function is used to enable/disable grid Delete button
   */
    get gridDelBtn() {
        if (!this.vMenuSecsBean.menuId || this.vMenuSecsData.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    onRowClickvmenusecs(event) {
        if (event) {
            if (event.description) {
                this.grid.requiredOn('moduleDescription');
            } else {
                this.grid.requiredOff('moduleDescription');
            }
            this.vMenuSecsBean = event;
        }
    }
    vMenuSecsExecuteQuery() {
        const vMenuSecsResult = this.oummenusFactory.
            vMenuSecsExecuteQuery(this.vMenuSecsModel);
        vMenuSecsResult.subscribe(vMenuSecsResultList => {
            if (vMenuSecsResultList.length === 0) {
                this.vMenuSecsData = [];
                this.tableIndex = 0;
                this.show(this.translateService.translate('common.querycaused'));
            } else {
                vMenuSecsResultList.forEach(element => {
                    element.parentMenuIdDup = element.parentMenuId;
                    element.sortOrderDup = element.sortOrder;
                });
                this.vMenuSecsData = vMenuSecsResultList;
                this.vMenuSecsDataObj = JSON.parse(JSON.stringify(vMenuSecsResultList));
                this.tableIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oummenusSavevMenuSecsForm(event) {
        this.menuSecsInsertList = event.added;
        this.menuSecsUpdateList = event.updated;
        this.menuSecsDeleteList = event.removed;
        this.menuSecsCommitModel.insertList = [];
        this.menuSecsCommitModel.updateList = [];
        this.menuSecsCommitModel.deleteList = [];
        if (this.menuSecsInsertList.length > 0 || this.menuSecsUpdateList.length > 0) {
            for (let i = 0; i < this.menuSecsInsertList.length; i++) {
                if (!this.mandatoryValidations(this.menuSecsInsertList[i])) {
                    return;
                }
            }
            for (let i = 0; i < this.menuSecsUpdateList.length; i++) {
                if (!this.mandatoryValidations(this.menuSecsUpdateList[i])) {
                    return;
                }
                this.menuSecsUpdateList[i].parentMenuId = Number(this.menuSecsUpdateList[i].parentMenuId);
                this.menuSecsUpdateList[i].sortOrder = Number(this.menuSecsUpdateList[i].sortOrder);
                if ((this.menuSecsUpdateList[i].parentMenuId !== this.menuSecsUpdateList[i].parentMenuIdDup) ||
                (this.menuSecsUpdateList[i].sortOrder !== this.menuSecsUpdateList[i].sortOrderDup)) {
                    this.menuSecsUpdateList[i].sealFlag = 'YES';
                } else {
                    this.menuSecsUpdateList[i].sealFlag = undefined;
                }
            }
            this.menuSecsCommitModel.insertList = this.menuSecsInsertList;
            this.menuSecsCommitModel.updateList = this.menuSecsUpdateList;
        }
        if (this.menuSecsDeleteList.length > 0) {
            for (let i = 0; i < this.menuSecsDeleteList.length; i++) {
                if (!this.mandatoryValidations(this.menuSecsDeleteList[i])) {
                    return;
                }
            }
            this.menuSecsCommitModel.deleteList = this.menuSecsDeleteList;
        }
        const vMenuSecsSaveData = this.oummenusFactory.vMenuSecsCommit(this.menuSecsCommitModel);
        vMenuSecsSaveData.subscribe(data => {
            this.validation = false;
            this.validationOne = false;
            if (data === 3) {
                this.show(this.translateService.translate('oummenus.duplicatesorordernotallowed'));
                return;
            }
            if (data === 2) {
                this.show(this.translateService.translate('oummenus.pleasedeletethechildrecordsforthismenuitembeforedeletingthisrecord'));
                return;
            }
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.vMenuSecsModel = new VMenuSecs();
                this.grid.prepareAgColumnDef();
                this.vMenuSecsExecuteQuery();
                this.valid = false;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });
    }
    /*
        *  This event is used to insert the data in HousingLocations Block.
        */
    onGridInsert = () => {
        this.vMenuSecsRowData = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.vMenuSecsRowData.push(v);
            }
        );
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.vMenuSecsRowData.push(v);
            }
        );
        for (let i = 0; i < this.vMenuSecsRowData.length; i++) {
            if (!this.mandatoryValidations(this.vMenuSecsRowData[i])) {
                return;
            }
        }
        return { parentMenuId: '' };
    }
    onGridClear = () => {
        this.grid.prepareAgColumnDef();
        this.vMenuSecsExecuteQuery();
        return true;
    }
    mandatoryValidations(event) {
        if (event.moduleDescription) {
            event.moduleDescription = event.moduleDescription.trim();
        }
        if (!event.parentMenuId && event.parentMenuId !== 0) {
            this.show(this.translateService.translate('oummenus.parentmenuidmustbeentered'));
            return false;
        }
        if (!event.menuItem || !event.menuItem.trim()) {
            this.show(this.translateService.translate('oummenus.menuitemmustbeentered'));
            return false;
        }
        if (event.description && !event.moduleDescription) {
            this.show(this.translateService.translate('oummenus.moduledescriptionmustbeentered'));
            return false;
        }
        if (!event.sortOrder && event.sortOrder !== 0) {
            this.show(this.translateService.translate('oummenus.sortordermustbentered'));
            return false;
        }
        if (event.sealFlag === 'Y') {
            this.show(this.translateService.translate('oummenus.duplicatesorordernotallowed'));
            return false;
        }
      
        return true;
    }
    validateRowData = (event) => {
        this.valid = false;
        const index = this.vMenuSecsData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        if (event.field === 'moduleName' && event.data.moduleName && (event.newValue !== event.oldValue) && event.newValue) {
            this.valid = true;
            const result = this.oummenusFactory.rgMenuSecDescRecordGroup();
            result.subscribe(data => {
                if (data.length === 0) {
                } else {
                    data.forEach(ele => {
                        if (ele.code === event.data.moduleName) {
                            this.grid.setColumnData('moduleDescription', index, ele.moduleName);
                        }
                    });
                }
            });
            rowdata.validated = true;
            return rowdata;
        }
        if (event.field === 'moduleDescription' && (event.newValue !== event.oldValue) && event.newValue) {
            this.valid = true;
        }
        if (event.field === 'menuItem' && (event.newValue !== event.oldValue) && event.newValue) {
            this.valid = true;
        }
        if (event.field === 'parentMenuId') {
            this.validation = false;
            if ((event.newValue !== event.oldValue) && event.newValue) {
                this.validation = true;
            }
        }
        if (event.field === 'sortOrder') {
            this.validationOne = false;
            if ((event.newValue !== event.oldValue) && event.newValue) {
                this.validationOne = true;
            }
            if(event.data.sortorder != event.data.sortOrderDup && event.data.menuId) {
                const count = { numofSort: 0};
                const data = this.vMenuSecsData.filter(ele => {
                    if (event.data.sortOrder === String(ele.sortOrder) && event.data.parentMenuId === ele.parentMenuId) {
                        count.numofSort++;
                        if(count.numofSort > 1) {
                        this.grid.setColumnData('sealFlag',index,'Y');
                        event.data.sealFlag = 'Y';
                        }
                    }
                });
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    get deleteMenuRec(){
        if(this.vMenuSecsBean.menuId){
            return true;
        } else {
            return false;
        }
    }

    onGridDelete = () => {
        if (this.vMenuSecsBean.menuExistCount && this.vMenuSecsBean.menuExistCount >0) {
            this.show(this.translateService.translate('oummenus.pleasedeletethechildrecordsforthismenuitembeforedeletingthisrecord'));
            return false;
        }
        return true;
     }
}
