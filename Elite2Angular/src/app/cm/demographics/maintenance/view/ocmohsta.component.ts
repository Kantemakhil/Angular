import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmohstaService } from '@cmdemographics/maintenance/service/ocmohsta.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CommunityHeaderStatuses } from '@cmdemographicsmaintenancebeans/CommunityHeaderStatuses';
import { CommunityHeaderStatusesCommitBean } from '@cmdemographicsmaintenancebeans/CommunityHeaderStatusesCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
    selector: 'app-ocmohsta',
    templateUrl: './ocmohsta.component.html'
})

export class OcmohstaComponent implements OnInit {
    editFlag = false;
    @ViewChild('grid', {static: true}) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    comHdrStData: CommunityHeaderStatuses[] = [];
    comHdrStInsertData: CommunityHeaderStatuses[] = [];
    comHdrStModel: CommunityHeaderStatuses = new CommunityHeaderStatuses();
    comHdrStModelBean: CommunityHeaderStatuses = new CommunityHeaderStatuses();
    comHdrStIndex = -1;
    comHdrStInsertList: CommunityHeaderStatuses[] = [];
    comHdrStUpdateList: CommunityHeaderStatuses[] = [];
    comHdrStDeleteList: CommunityHeaderStatuses[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    comHdrStColumnDef: any[];
    comHdrStReadOnly = false;
    comHdrStCommitModel: CommunityHeaderStatusesCommitBean = new CommunityHeaderStatusesCommitBean();
    retriveFlag = false;
    constructor(private ocmohstaFactory: OcmohstaService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.comHdrStColumnDef = [];
    }
    ngOnInit() {
        this.comHdrStIndex = -1;
        this.retriveFlag = false;
        this.comHdrStModel = new CommunityHeaderStatuses();
        this.comHdrStExecuteQuery();
        this.comHdrStColumnDef = [
            {
                fieldName: this.translateService.translate('ocmohsta.statuscode') + '*', field: 'statusCode', editable: true, width: 150,
                cellEditable: this.canCellEdit, datatype: 'text', maxlength: 12, uppercase: 'true'
            },
            { fieldName: this.translateService.translate('common.description') + '*', field: 'description', editable: true, width: 150 ,
              cellEditable: this.canCellEdit,  datatype: 'text', maxlength: 80, uppercase: 'false'},
            {
                fieldName: this.translateService.translate('ocmohsta.hierarchysequence'), field: 'hierarchySequence', editable: true,
                width: 150,  cellEditable: this.canCellEdit, datatype: 'number', maxValue: 999999, whole: true
            },
            {
                fieldName: this.translateService.translate('common.updatedallowed'), field: 'updateAllowedFlag', editable: true,
                width: 150, datatype: 'checkbox', cellEditable: this.canCellEdit
            },
            { fieldName: this.translateService.translate('common.seq'), field: 'listSeq', editable: true, width: 150,
             cellEditable: this.canCellEdit, datatype: 'number', maxValue: 999999, whole: true },
            { fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox',
            cellEditable: this.canCellEdit },
            { fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150, datatype: 'date' },
        ];
        this.editFlag = false;
        // TODO all initializations here
    }
    /*
  *  This event is used to do the validations in the Grid in Schedules Block.
  */
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (this.comHdrStModelBean.createDatetime && field === 'statusCode') {
            return false;
        } else  if (this.comHdrStModelBean.createDatetime && field === 'updateAllowedFlag' && !data.updateAllowedFlag) {
            this.show('This record cannot be updated.');
            return false;
        } else  if (data.createDatetime && field === 'activeFlag' && !data.updateAllowedFlag) {
            this.show('This record cannot be updated.');
            return false;
        } else  if (this.comHdrStModelBean.createDatetime && !data.updateAllowedFlag) {
            return false;
        }
        return true;
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
    onRowClickcomhdrst(event) {
        if (event) {
            this.comHdrStModelBean = event;
        }
    }
    comHdrStExecuteQuery(date?) {
        this.comHdrStModel = new CommunityHeaderStatuses();
        const comHdrStResult = this.ocmohstaFactory.
            comHdrStExecuteQuery(this.comHdrStModel);
        comHdrStResult.subscribe(comHdrStResultList => {
            if (comHdrStResultList.length === 0) {
                this.comHdrStModel = new CommunityHeaderStatuses();
                this.retriveFlag = true;
                this.comHdrStData = [];
                this.comHdrStModelBean = new CommunityHeaderStatuses();
                this.show(this.translateService.translate('common.querycaused'));
                this.comHdrStIndex = -1;
            } else {
                this.retriveFlag = true;
                comHdrStResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.updateAllowedFlag = element.updateAllowedFlag === 'Y' ? true : false;
                });
                this.comHdrStData = comHdrStResultList;
                this.comHdrStIndex = 0;
            }
        });
    }
    get gridInsBtn() {
        if (this.comHdrStModel.statusCode || this.comHdrStModel.description || !this.retriveFlag ||
            this.comHdrStModel.hierarchySequence ||
            this.comHdrStModel.hierarchySequence === 0 || this.comHdrStModel.updateAllowedFlag || this.comHdrStModel.listSeq ||
            this.comHdrStModel.listSeq === 0 || this.comHdrStModel.activeFlag || this.comHdrStModel.expiryDate || this.editFlag) {
            return false;
        }
        return true;
    }
    get gridDelBtn() {
        if (!this.comHdrStModelBean.createDatetime) {
            return false;
        }
        return true;
    }
    onGridInsert = (event) => {
        this.comHdrStInsertData = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.comHdrStInsertData.push(v);
            }
        );
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.comHdrStInsertData.push(v);
            }
        );
        if (this.comHdrStInsertData.length > 0) {
            for (let i = 0; i < this.comHdrStInsertData.length; i++) {
                if (this.validationsEvent( this.comHdrStInsertData[i])) {
                    return;
               }
            }
        }
        return { listSeq: 99, updateAllowedFlag : true, activeFlag: true };
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocmohstaSavecomHdrStForm(event) {
        this.comHdrStInsertList = [];
        this.comHdrStUpdateList = [];
        this.comHdrStDeleteList = [];
        this.comHdrStInsertList = event.added;
        this.comHdrStUpdateList = event.updated;
        this.comHdrStDeleteList = event.removed;
        this.comHdrStCommitModel.insertList = [];
        this.comHdrStCommitModel.updateList = [];
        this.comHdrStCommitModel.deleteList = [];
        if (this.comHdrStInsertList.length > 0 || this.comHdrStUpdateList.length > 0) {
            for (let i = 0; i < this.comHdrStInsertList.length; i++) {
                if (this.validationsEvent( this.comHdrStInsertList[i])) {
                     return;
                }
                this.comHdrStInsertList[i].activeFlag = this.comHdrStInsertList[i].activeFlag ? 'Y' : 'N';
                this.comHdrStInsertList[i].updateAllowedFlag = this.comHdrStInsertList[i].updateAllowedFlag ? 'Y' : 'N';
            }
            for (let i = 0; i < this.comHdrStUpdateList.length; i++) {
                if (this.validationsEvent( this.comHdrStUpdateList[i])) {
                    return;
               }
               this.comHdrStUpdateList[i].activeFlag = this.comHdrStUpdateList[i].activeFlag ? 'Y' : 'N';
               this.comHdrStUpdateList[i].updateAllowedFlag = this.comHdrStUpdateList[i].updateAllowedFlag ? 'Y' : 'N';
            }
            this.comHdrStCommitModel.insertList = this.comHdrStInsertList;
            this.comHdrStCommitModel.updateList = this.comHdrStUpdateList;
        }
        if (this.comHdrStDeleteList.length > 0) {
            for (let i = 0; i < this.comHdrStDeleteList.length; i++) {
                if (this.validationsEvent( this.comHdrStDeleteList[i])) {
                    return;
               }
            }
            this.comHdrStCommitModel.deleteList = this.comHdrStDeleteList;
        }
        const comHdrStSaveData = this.ocmohstaFactory.comHdrStCommit(this.comHdrStCommitModel);
        comHdrStSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.comHdrStExecuteQuery();
            } else if (data === 2) {
                this.show(this.translateService.translate('ocmohsta.thisstatuscodealreadyexistspleaseprovidedifferentstatuscode'));
            } else if (data === 3) {
                this.show(this.translateService.translate('ocmohsta.thishierarchysequencealreadyexistspleaseprovidedifferenthierarchysequence'));
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });


    }
    validationsEvent(event) {
        if (!event.statusCode || !event.statusCode.trim()) {
            this.show(this.translateService.translate('ocmohsta.statuscodemstbeentered'), 'warn');
            return true;
        }
        if (!event.description || !event.description.trim()) {
            this.show(this.translateService.translate('common.descriptionmustbeentered'), 'warn');
            return true;
        }
        // if (!event.createDatetime && !event.activeFlag) {
        //     this.show(this.translateService.translate('common.activemustbeentered'), 'warn');
        //     return true;
        // }
        // if (!event.createDatetime && !event.updateAllowedFlag) {
        //     this.show(this.translateService.translate('common.updatedallowedmustbeentered'), 'warn');
        //     return true;
        // }

    }
    /**
      *  This function will be executed when we edit grid row data under Housing Locations Block
      */
    validateRowEvent = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
		if (event.field === 'statusCode' && event.data.statusCode) {
            for (let i = 0; i < this.comHdrStData.length; i++) {
              for (let j = 0; j < this.comHdrStData.length; j++) {
                if (i !== j && this.comHdrStData[i].statusCode === this.comHdrStData[j].statusCode) {
                  this.show(this.translateService.translate('ocmohsta.thisstatuscodealreadyexistspleaseprovidedifferentstatuscode'));
                  this.grid.setColumnData('statusCode', index, undefined);
                  rowdata.validated = true;
                  return rowdata;
                }
              }
            }
        }
        if (event.field === 'activeFlag' && event.data.updateAllowedFlag) {
            if (event.data.activeFlag && event.data.updateAllowedFlag) {
                this.grid.setColumnData('activeFlag', index, true);
                this.grid.setColumnData('expiryDate', index, undefined);
                rowdata.validated = true;
                return rowdata;
            } else {
                this.grid.setColumnData('activeFlag', index, false);
                this.grid.setColumnData('expiryDate', index, DateFormat.getDate());
                rowdata.validated = true;
                return rowdata;
            }
        } else  if (event.field === 'activeFlag' && !event.data.updateAllowedFlag) {
            if (event.data.createDatetime) {
                if (!event.data.expiryDate) {
                    this.grid.setColumnData('activeFlag', index, true);
                    } else {
                        this.grid.setColumnData('activeFlag', index, false);
                    }
                    if (event.data.createDatetime) {
                        this.show('This record cannot be updated.');
                    }
            } else {
                if (event.data.activeFlag) {
                    this.grid.setColumnData('activeFlag', index, true);
                    this.grid.setColumnData('expiryDate', index, undefined);
                } else {
                    this.grid.setColumnData('activeFlag', index, false);
                    this.grid.setColumnData('expiryDate', index, DateFormat.getDate());
                }
            }
                rowdata.validated = true;
                return rowdata;
        } else  if (event.data.createDatetime && event.field === 'updateAllowedFlag' && event.oldValue === false) {
            this.grid.setColumnData('updateAllowedFlag', index, false);
                this.show('This record cannot be updated.');
                rowdata.validated = true;
                return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridClear = () => {
        this.comHdrStExecuteQuery();
        return true;
      }
}
