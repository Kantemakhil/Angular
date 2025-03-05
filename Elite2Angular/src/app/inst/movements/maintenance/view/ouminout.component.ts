import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OuminoutService } from '../service/ouminout.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { MovementReasons } from '@inst/movements/maintenance/beans/MovementReasons';
import { MovementReasonsCommitBean } from '@inst/movements/maintenance/beans/MovementReasonsCommitBean';

@Component({
    selector: 'app-ouminout',
    templateUrl: './ouminout.component.html'
})

export class OuminoutComponent implements OnInit {
    @ViewChild('mvmtRsnGrid') mvmtRsnGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    moversnData: MovementReasons[] = [];
    moversnSearchModel = new MovementReasons();
    moversnCommitModel: MovementReasonsCommitBean = new MovementReasonsCommitBean();
    moversnModel: MovementReasons = new MovementReasons();
    moversnIndex: number;
    moversnResultList: MovementReasons[] = [];
    moversnInsertList: MovementReasons[] = [];
    moversnUpdatetList: MovementReasons[] = [];
    moversnDeleteList: MovementReasons[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    moveRsnColumnDef: any[];
    moveRsnReadOnly: boolean;
    cgfkMoversninmovementreasRg: any[] = [];
    type = 'error';
    message: string;
    tableIndex: number;
    reasonLink: string;
    clearDisabled: boolean;
    retriveDisabled: boolean;
    namesReadOnly: boolean;
    checkDisabled: boolean;
    tempReasn: any;
    offenderCountData: number;
    externMovCountData: number;
    reasonTitles = { code: 'Reason Code',  description: 'Description'};
    constructor(private ouminoutFactory: OuminoutService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.moveRsnColumnDef = [];
    }
    ngOnInit() {
        this.checkDisabled = false;
        this.editable = true;
        this.retriveDisabled = false;
        this.namesReadOnly = false;
        this.clearDisabled = true;
        this.reasonLink = undefined;

        this.reasonLink = 'ouminout/cgfkMoveRsnInMovementReasRecordGroup';
        this.moveRsnColumnDef = [
            {  fieldName: this.translateService.translate('common.type') , field: 'movementType', maxlength : 12 ,
             editable: false, width: 150 },
           { fieldName: this.translateService.translate('common.reason'), field: 'description', maxlength : 100 ,
            editable: false, width: 150 },

            {  fieldName: this.translateService.translate('common.type'), field : 'inMovementType' , editable: false,
             width: 150,  maxlength : 12 },
            {
                fieldName: this.translateService.translate('common.reason') + '*', field: 'inMovementReasonCode',
                 editable: true, datatype: 'lov',  titles: this.reasonTitles, width: 150, maxlength : 12 ,
                  link: 'ouminout/cgfkMoveRsnInMovementReasRecordGroup'
            },
            { fieldName: this.translateService.translate('ouminout.escape'), field: 'escRecapFlag', datatype: 'checkbox',
               maxlength : 1, editable: true, width: 150 },
              { fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true, width: 150,
               minValue: '0', maxValue: '99999', strictFP: true, whole: true, datatype: 'number'},
               {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox',  maxlength : 1
              },
              {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date',  maxlength : 1
              },
        ];

        this.moversnExecuteQuery();
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    onGridClear = () => {
        this.moversnExecuteQuery();
        return true;
      }

    onRowClickMovmtReason(event) {
        if (event) {
            this.moversnModel = event;
          }

          if (this.moversnModel.movementType && this.moversnModel.movementReasonCode) {
            this.keyDeleteRecordValidation();
          }
        }
    keyDeleteRecordValidation() {
        const serviceObj = this.ouminoutFactory.cgrichkMovementReasonsDeleteCheck(this.moversnModel);
        serviceObj.subscribe(data => {
          if (data > 0) {
            this.offenderCountData = data.offenderDeleteCount;
            this.externMovCountData = data.externalMovmentCount;
          } else {
            this.offenderCountData = data.offenderDeleteCount;
            this.externMovCountData = data.externalMovmentCount;
          }
        });
    }


    onReasonBlur() {
        if (!this.moversnSearchModel.inMovementReasonCode) {
            this.moversnSearchModel.inMovementReasonCode = this.moversnSearchModel.inMovementReasonCode === '' ? undefined : '';
        }
    }

    moversnExecuteQuery() {
        const moversnResult = this.ouminoutFactory.
            moveRsnExecuteQuery(this.moversnSearchModel);
        moversnResult.subscribe(data => {
            if (data.length === 0) {
                this.moversnData = [];
                this.show('oimslevl.noRecord');
                this.type = 'warn';
                this.moversnSearchModel = new MovementReasons();

                return;
            } else {
                data.forEach(element => {
                    element.escRecapFlag = element.escRecapFlag === 'Y' ? true : false;
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.moversnData = data;
                this.tableIndex = 0;
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
                this.checkDisabled = true;
            }
        });
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.mvmtRsnGrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.mvmtRsnGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate());
                rowdata.validated = true;
                DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
                return rowdata;
            }
        }

        rowdata.validated = true;
        return rowdata;
    }

    onGridDelete = () => {
        if (this.externMovCountData > 0) {
            this.show('ouminout.movmt', 'warn');
            return false;
          }
          if (this.offenderCountData > 0) {
            this.show('ouminout.booking', 'warn');
            return false;
          }
          return true;
    }

      savealertForm(event) {
        this.moversnInsertList = event.added;
        this.moversnUpdatetList = event.updated;
        this.moversnDeleteList = event.removed;
        this.moversnCommitModel.updateList = [];
        this.moversnCommitModel.deleteList = [];
        if (this.moversnUpdatetList.length > 0 || this.moversnDeleteList.length > 0) {
            for (let i = 0; i < this.moversnUpdatetList.length; i++) {
                this.moversnUpdatetList[i].activeFlag = this.moversnUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.moversnUpdatetList[i].updateAllowedFlag = 'Y';

                if (this.moversnUpdatetList[i].escRecapFlag  && !this.moversnUpdatetList[i].inMovementReasonCode) {
                    this.show('ouminout.rsnLov', 'warn');
                    return true;

                  }
                  if (!this.moversnUpdatetList[i].inMovementReasonCode) {
                    this.show('common.reasonmustbeentered', 'warn');
                    return true;

                  }
                  this.moversnUpdatetList[i].escRecapFlag = this.moversnUpdatetList[i].escRecapFlag ? 'Y' : 'N';
                this.moversnCommitModel.updateList = this.moversnUpdatetList;
            }
            for (let i = 0; i < this.moversnDeleteList.length; i++) {
                this.moversnCommitModel.deleteList = this.moversnDeleteList;
            }
        }
        const moversnSaveData = this.ouminoutFactory.moveRsnCommit(this.moversnCommitModel);
        moversnSaveData.subscribe(data => {

            if (data[0] && data[0].returnValue === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
               this.moversnExecuteQuery();
                return;
              } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.moversnExecuteQuery();
                return;
              }
        });
    }
    isInsertable() {
        if (this.moversnSearchModel.escRecapFlag || this.moversnSearchModel.inMovementReasonCode ||
             this.moversnSearchModel.listSeq || this.moversnSearchModel.activeFlag) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }
    clear() {
        this.clearDisabled = true;
        this.moversnData = [];
        this.moversnModel = new MovementReasons();
        this.moversnSearchModel = new MovementReasons();
        this.retriveDisabled = false;
        this.namesReadOnly = false;
        this.checkDisabled = false;

    }

    getToOffenderMargin(){
        let toOffenderMargin = 0;
        if ( this.mvmtRsnGrid && this.mvmtRsnGrid.gridColumnApi ) {
            this.mvmtRsnGrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
                if ([ 'description', 'inMovementType'].includes(obj.colId) ) {
                    toOffenderMargin += obj.actualWidth;
                }
            });
        }
        if ( toOffenderMargin ) {
            toOffenderMargin -= 129;
        }
        return toOffenderMargin ;

    }

    getFromOffenderMargin() {
        let fromOffenderMargin = 0;
        if ( this.mvmtRsnGrid && this.mvmtRsnGrid.gridColumnApi ) {
            this.mvmtRsnGrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
                if ( ['movementType'].includes(obj.colId) ) {
                    fromOffenderMargin += obj.actualWidth;
                }
            });
        }
        return fromOffenderMargin -39;

    }
}
