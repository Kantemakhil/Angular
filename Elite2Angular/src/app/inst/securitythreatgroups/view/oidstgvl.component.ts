
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StgValidations } from '@instSecurityThreatGroupsbeans/StgValidations';
import { StgValidationsCommitBean } from '@instSecurityThreatGroupsbeans/StgValidationsCommitBean';
import { OidstgvlService } from '@inst/securitythreatgroups/service/oidstgvl.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn, GridComponent } from '@core/ui-components/grid/grid.component';
@Component({
  selector: 'app-oidstgvl',
  templateUrl: './oidstgvl.component.html'
})

export class OidstgvlComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  @ViewChild('grid') grid: GridComponent;
  msgs: any[] = [];
  stgvalidationsData: StgValidations[] = [];
  stgvalidationsCommitModel: StgValidationsCommitBean = new StgValidationsCommitBean();
  stgvalidationsDataTemp: StgValidations[] = [];
  stgvalidationsModel: StgValidations = new StgValidations();
  stgvalidationsInsertList: StgValidations[] = [];
  stgvalidationsUpdatetList: StgValidations[] = [];
  stgvalidationsDeleteList: StgValidations[] = [];
  stgValidationsColumnDef: any[];
  selectIndex = -1;
  commentReadOnly: boolean;
  titles = { 'description': this.trMsg('common.description') };
  constructor(private oidstgvlFactory: OidstgvlService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.stgValidationsColumnDef = [];
  }
  ngOnInit() {
    this.commentReadOnly = true;
    this.stgValidationsColumnDef = [
      {
        fieldName: this.trMsg('common.datemandatory'), field: 'validationDate', editable: true, width: 150, datatype: 'date',
        cellEditable: this.canGrievanceDateEdit
      },
      {
        fieldName: this.trMsg('common.action') + '*', field: 'action', editable: true, width: 150, datatype: 'lov', domain: 'STG_VAL_ACT',
        titles: this.titles, cellEditable: this.canGrievanceDateEdit
      },
      {
        fieldName: this.trMsg('oidstgvl.designation') + '*',
        field: 'designation', editable: true, width: 150, datatype: 'lov', domain: 'STG_VAL_DES',
        titles: this.titles, cellEditable: this.canGrievanceDateEdit
      },
      {
        fieldName: this.trMsg('oidstgvl.reason') + '*', field: 'reason', editable: true, width: 150, datatype: 'lov', domain: 'STG_VAL_RSN',
        titles: this.titles, cellEditable: this.canGrievanceDateEdit
      },
      {
        fieldName: this.trMsg('oidstgvl.reviewdate'), field: 'reviewDate', editable: false, width: 150, datatype: 'date'
      },
      { fieldName: this.trMsg('oidstgvl.user'), field: 'createUserId', editable: false, width: 150 },
    ];
    this.stgvalidationsExecuteQuery();
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
  onRowClickstgvalidations(event) {
    if (event) {
      this.stgvalidationsModel.commentText = event.commentText;
      if (event.reviewDate) {
        this.commentReadOnly = true;
      } else {
        this.commentReadOnly = false;
      }
    }
  }
  allowNumbers(event) {
  }
  ok() {
  }
  no() {
  }
  cancel() {
    this.dialog.close(null);
  }
  onOffenderChange(offender) {
  }
  oidstgvlValidations() {
    const is = { valid: true };
    this.stgvalidationsData.forEach(data => {
      if (is.valid) {
        if (!data.validationDate) {
          this.show('common.datemustbeentereddate');
          is.valid = false;
          return;
        }
        if (DateFormat.compareDate(DateFormat.getDate(data.validationDate),
          DateFormat.getDate()) === 1) {
          this.show('oidstgvl.validationdatembelesstosysdate');
          return;
        }
        if (!data.action) {
          this.show('oidstgvl.actiondatemustbeentered');
          is.valid = false;
          return;
        }
        if (!data.designation) {
          this.show('oidstgvl.designationmustbeentered');
          is.valid = false;
          return;
        }
        if (!data.reason) {
          this.show('oidstgvl.reasonmustbeentered');
          is.valid = false;
          return;
        }
      }
    });
    return is.valid;
  }
  stgvalidationsExecuteQuery() {
    this.stgvalidationsModel.stgId = this.dialog.data;
    const stgvalidationsResult = this.oidstgvlFactory.stgValidationsExecuteQuery(this.stgvalidationsModel);
    stgvalidationsResult.subscribe(data => {
      if (data.length === 0) {
        this.stgvalidationsData = [];
      } else {
        this.stgvalidationsData = data;
        this.selectIndex = 0;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oidstgvlSavestgvalidationsForm(event) {
    if (!this.oidstgvlValidations()) {
      return;
    }
    this.stgvalidationsInsertList = event.added;
    this.stgvalidationsUpdatetList = event.updated;
    this.stgvalidationsDeleteList = event.removed;
    this.stgvalidationsCommitModel.insertList = [];
    this.stgvalidationsCommitModel.updateList = [];
    this.stgvalidationsCommitModel.deleteList = [];
    if (this.stgvalidationsInsertList.length > 0) {
      for (let i = 0; i < this.stgvalidationsInsertList.length; i++) {
        this.stgvalidationsInsertList[i].stgId = this.dialog.data;
        this.stgvalidationsInsertList[i].createUserId = this.sessionManager.getId();
        this.stgvalidationsInsertList[i].createDatetime = DateFormat.getDate();
        this.stgvalidationsInsertList[i].commentText = this.stgvalidationsModel.commentText;
        this.stgvalidationsCommitModel.insertList = this.stgvalidationsInsertList;
      }
    }
    const stgvalidationsSaveData = this.oidstgvlFactory.stgValidationsCommit(this.stgvalidationsCommitModel);
    stgvalidationsSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.stgvalidationsExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        this.stgvalidationsExecuteQuery();
        return;
      }
    });
  }
  onGridInsert = () => {
    for (let i = 0; i < this.stgvalidationsData.length; i++) {
      if (!this.stgvalidationsData[i].validationDate) {
        this.show('common.datemustbeentereddate');
        return;
      }
      if (!this.stgvalidationsData[i].action) {
        this.show('oidstgvl.actiondatemustbeentered');
        return;
      }
      if (!this.stgvalidationsData[i].designation) {
        this.show('oidstgvl.designationmustbeentered');
        return;
      }
      if (!this.stgvalidationsData[i].reason) {
        this.show('oidstgvl.reasonmustbeentered');
        return;
      }
    }
    return {
      validationDate: DateFormat.getDate(), createUserId: this.sessionManager.getId()
    };
  }
  canGrievanceDateEdit = (data: any, index: number, field: string): boolean => {
    if (data.modifyDatetime && data.createUserId) {
      return false;
    } else {
      return true;
    }
  }
  validateRowData = (event) => {
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    const index = event.rowIndex;
    if (event.field === 'validationDate' && event.newValue !== event.oldValue) {
      const txntypeSaveData = this.oidstgvlFactory.reviewDateData(this.dialog.data);
      txntypeSaveData.subscribe(data => {
        if (data) {
          const date = DateFormat.getDate(data);
          if (DateFormat.compareDate(event.data.validationDate, date) === -1) {
            this.show('oidstgvl.validationdatembegreaterorequal');
            this.grid.setColumnData('validationDate', index, null);
            return rowdata;
          }
        }
      });
      if (DateFormat.compareDate(event.data.validationDate, DateFormat.getDate()) === 1) {
        this.show('oidstgvl.validationdatembelesstosysdate');
        this.grid.setColumnData('validationDate', index, null);
        return rowdata;
      }
    }
    return rowdata;
  }
}
