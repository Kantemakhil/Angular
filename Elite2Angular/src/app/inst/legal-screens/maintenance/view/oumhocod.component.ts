import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumhocodService } from '../service/oumhocod.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { HoCodes } from '../beans/HoCodes';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { HoCodesCommitBean } from '../beans/HoCodesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oumhocod',
    templateUrl: './oumhocod.component.html'
})

export class OumhocodComponent implements OnInit {
    @ViewChild('hcodesGridgrid') hcodesGridgrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    hocodesData: HoCodes[] = [];
    hocodesDataTemp: HoCodes[] = [];
    hocodesModel: HoCodes = new HoCodes();
    hocodesSearchModel: HoCodes = new HoCodes();
    hocodesInsertList: HoCodes[] = [];
    hocodesUpdatetList: HoCodes[] = [];
    hocodesDeleteList: HoCodes[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    hoCodesColumnDef: any[];
    tableIndex: number;
    hocodesCommitModel: HoCodesCommitBean = new HoCodesCommitBean();
    countData: number;
    enableIfRowDatExist: boolean;
    hoCodeDeleteEnable: boolean;
    clearDisabled: boolean;
    retriveDisabled: boolean;
    namesReadOnly: boolean;
    expiryDate: any;
    constructor(private oumhocodFactory: OumhocodService,
        public translateService: TranslateService, public sessionManager: UserSessionManager) {
        this.hoCodesColumnDef = [];
    }
    ngOnInit() {
        this.hoCodeDeleteEnable = false;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.hoCodesColumnDef = [
            {
                fieldName: this.translateService.translate('oumhocod.offenceCategory') + '*',
                field: 'hoCode', editable: true, width: 150, datatype: 'text', uppercase: true,
                maxlength: 12, cellEditable: this.canAlertEdit,
            },
            {
                fieldName: this.translateService.translate('common.description') + '*',
                field: 'description', editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 240,
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date'
            },
        ];
        this.hocodesExecuteQuery();
    }
    validateRow = (event) => {
        const rowdata = new ValidateRowReturn();
        return rowdata;
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    onRowClickhocodes(event) {
        if (event) {
            this.hocodesModel = event;
            if (this.hocodesModel.hoCode) {
                this.keyDeleteRecordValidation();
            }
            if (this.hocodesModel.createDatetime) {
                this.hoCodeDeleteEnable = true;
            } else {
                this.hoCodeDeleteEnable = false;
            }
        }
    }
    isInsertable(date?) {
        if (this.hocodesSearchModel.hoCode || this.hocodesSearchModel.description
            || this.expiryDate || this.hocodesSearchModel.activeFlag) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
        if (date) {
            this.clearDisabled = false;
        }
    }
    clear() {
        this.hocodesData = [];
        this.hocodesSearchModel = new HoCodes();
        this.expiryDate = undefined;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;

    }
    /**
      *  This function will be used to display the not delete message when child record exists fired
     */
    onGridCodesDelete = () => {
        if (this.countData > 0) {
            this.show('oumhocod.cannotDelete', 'warn');
            return false;
        }
        return true;
    }
    /**
    *  This function will be used to get the child record cout when clicked on a record fired
   */
    keyDeleteRecordValidation() {
        const serviceObj = this.oumhocodFactory.hoCodesCheckDeleteMaster(this.hocodesModel);
        serviceObj.subscribe(data => {
            if (data > 0) {
                this.countData = data;
            } else {
                this.countData = data;
            }
        });
    }
    /**
        *  This function will be used to get the data in the grid. or retrive the data fired
       */
    hocodesExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                this.expiryDate = null;
                this.clearDisabled = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.expiryDate = null;
                this.clearDisabled = false;
                return;
            }
        }
        if (this.expiryDate) {
            this.hocodesSearchModel.expiryDate = this.expiryDate;
        } else {
            this.hocodesSearchModel.expiryDate = null;
        }
        const hocodesResult = this.oumhocodFactory.hoCodesExecuteQuery(this.hocodesSearchModel);
        hocodesResult.subscribe(hocodesResultList => {
            if (hocodesResultList.length === 0) {
                this.hocodesData = [];
                this.retriveDisabled = false;
                this.namesReadOnly = false;
                this.show('common.querycaused');
                this.clear();
            } else {
                hocodesResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.hocodesData = hocodesResultList;
                this.hocodesModel = hocodesResultList[0];
                this.tableIndex = 0;
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
            }
        });
    }
    /**
        *  This function will be used to validate the mandetory fields when saving the data fired
       */
    oumhocodUpdateValidations = () => {
        const is = { valid: true };
        if (this.hocodesData && this.hocodesData) {
            this.hocodesData.forEach(element => {
                if (element.hoCode === undefined || !element.hoCode.trim()) {
                    this.show('oumhocod.validateHocodes', 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (element.description === undefined || !element.description.trim()) {
                    this.show('oumhocod.validationDescription', 'warn');
                    is.valid = false;
                    return is.valid;
                }
            });
        }
        return is.valid;
    }
    /**
     *  This function will be for when adding the new record in grid fired
    */
    hoCodesInsert = () => {
        if (!this.oumhocodUpdateValidations()) {
            return;
        }
        return { activeFlag: true };
    }
    /**
         *  This function will be for validate the row data fired
        */
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.hcodesGridgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.hcodesGridgrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridClear = () => {
        this.hocodesExecuteQuery();
        return true;
      }

    /**
     *  This function will be executed when commit event is fired
    */
    oumhocodSavehocodesForm(event) {
        if (!this.oumhocodUpdateValidations()) {
            return;
        }
        this.hocodesInsertList = event.added;
        this.hocodesUpdatetList = event.updated;
        this.hocodesDeleteList = event.removed;
        this.hocodesCommitModel.insertList = [];
        this.hocodesCommitModel.updateList = [];
        this.hocodesCommitModel.deleteList = [];
        if (this.hocodesInsertList.length > 0 || this.hocodesUpdatetList.length > 0) {
            for (let i = 0; i < this.hocodesInsertList.length; i++) {
                this.hocodesInsertList[i].createDate = DateFormat.getDate();
                this.hocodesInsertList[i].activeFlag = this.hocodesInsertList[i].activeFlag ? 'Y' : 'N';
                this.hocodesCommitModel.insertList = this.hocodesInsertList;
            }
        }
        for (let i = 0; i < this.hocodesUpdatetList.length; i++) {
            this.hocodesUpdatetList[i].createDate = DateFormat.getDate();
            this.hocodesUpdatetList[i].activeFlag = this.hocodesUpdatetList[i].activeFlag ? 'Y' : 'N';
            this.hocodesCommitModel.updateList = this.hocodesUpdatetList;
        }

        if (this.hocodesDeleteList.length > 0) {
            for (let i = 0; i < this.hocodesDeleteList.length; i++) {
                this.hocodesCommitModel.deleteList = this.hocodesDeleteList;
            }
        }
        const hocodesSaveData = this.oumhocodFactory.hoCodesCommit(this.hocodesCommitModel);
        hocodesSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('HO_CODES_PK') > 0) {
                this.show('oumhocod.primaryKeyValidation','warn');
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.hocodesExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.hocodesExecuteQuery();
                return;
            }
        });
    }
}
