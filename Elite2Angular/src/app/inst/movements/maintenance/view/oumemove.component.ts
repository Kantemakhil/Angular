import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { MovementReasons } from '@inst/movements/maintenance/beans/MovementReasons';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { MovementReasonsCommitBean } from '@inst/movements/maintenance/beans/MovementReasonsCommitBean';
import { OumemoveService } from '@inst/movements/maintenance/service/oumemove.service';

@Component({
  selector: 'app-oumemove',
  templateUrl: './oumemove.component.html'
})

export class OumemoveComponent implements OnInit {
  @ViewChild('movresgrid') movresgrid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  moversnData: MovementReasons[] = [];
  moversnModel: MovementReasons = new MovementReasons();
  moversnSearchModel: MovementReasons = new MovementReasons();
  moversnInsertList: MovementReasons[] = [];
  moversnUpdatetList: MovementReasons[] = [];
  moversnDeleteList: MovementReasons[] = [];
  moversnCommitModel: MovementReasonsCommitBean = new MovementReasonsCommitBean();
  moversnColumnDefs: any[];
  tableIndex: number;
  offenderCountData: any;
  externMovCountData: any;
  clearDisabled: boolean;
  namesReadOnly: boolean;
  retriveDisabled: boolean;
  moversnDelete: boolean;
  expiryDate: any;
  genNotification: boolean;
  notificNotSuppotred: boolean;
  constructor(private oumemoveFactory: OumemoveService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.moversnColumnDefs = [];
  }
  ngOnInit() {
    this.clearDisabled = true;
    this.retriveDisabled = false;
    this.namesReadOnly = false;
    this.moversnDelete = false;
    this.moversnColumnDefs = [
      {
        fieldName: this.translateService.translate('common.type') + '*', field: 'movementType',
        editable: true, width: 150, datatype: 'lov', domain: 'MOVE_TYPE', cellEditable: this.canAlertEdit,
        titles: {
          code: this.translateService.translate('oumemove.movetype')
          , description: this.translateService.translate('common.description')
        }
      },
      {
        fieldName: this.translateService.translate('common.reason') + '*', field: 'movementReasonCode',
        editable: true, width: 150, datatype: 'lov', domain: 'MOVE_RSN', cellEditable: this.canAlertEdit,
        titles: {
          code: this.translateService.translate('common.reason')
          , description: this.translateService.translate('common.description')
        }
      },
      {
        fieldName: this.translateService.translate('common.description') + '*', field: 'description',
        datatype: 'text', uppercase: 'false', maxlength: 40, editable: true, width: 150
      },
      {
        fieldName: this.translateService.translate('oumemove.headerStatus'),
        field: 'headerStatusFlag', editable: true, width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('oumemove.Notificationrequired'),
        field: 'notificationFlag', editable: true, width: 25, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('oumemove.Notificationone'),
        field: 'notificationType', editable: true, width: 75, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('oumemove.billingservice'),
        field: 'billingServiceFlag', editable: true, width: 75, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('oumemove.closebooking'), field: 'closeContactFlag',
        editable: true, width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('oumemove.transport'), field: 'transportationFlag',
        editable: true, width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
        editable: true, width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('common.seq'), field: 'listSeq', editable: true, width: 150,
        minValue: '1', maxValue: '9999', strictFP: true, whole: true, datatype: 'number'
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
        editable: false, width: 150, datatype: 'date'
      },
    ];
  }
  canAlertEdit = (data: any, index: number, field: string): boolean => {
    if (!data.createDateTime) {
      return true;
    } else {
      return false;
    }
  }
  isInsertable() {
    if (this.moversnSearchModel.movementType || this.moversnSearchModel.movementReasonCode
      || this.moversnSearchModel.description || this.moversnSearchModel.headerStatusFlag || this.moversnSearchModel.notificationFlag ||
      this.moversnSearchModel.notificationType || this.moversnSearchModel.billingServiceFlag
      || this.moversnSearchModel.closeContactFlag || this.moversnSearchModel.transportationFlag ||
      this.moversnSearchModel.activeFlag || this.moversnSearchModel.listSeq || this.expiryDate || this.namesReadOnly) {
      this.clearDisabled = false;
    } else {
      this.clearDisabled = true;
    }
  }
  clear() {
    this.moversnData = [];
    this.moversnSearchModel = new MovementReasons();
    this.moversnModel = new MovementReasons();
    this.clearDisabled = true;
    this.retriveDisabled = false;
    this.namesReadOnly = false;
    this.moversnDelete = false;
    this.expiryDate = undefined;
    this.notificNotSuppotred = false;
    this.genNotification = false;
  }
  keyDeleteRecordValidation() {
    const serviceObj = this.oumemoveFactory.cgrichkMovementReasonsDeleteCheck(this.moversnModel);
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
  onRowClickupdatereasons(event) {
    if (event) {
      this.moversnModel = event;
    }
    if (this.moversnModel.createDateTime) {
      this.moversnDelete = true;
    } else {
      this.moversnDelete = false;
    }
    if (this.moversnModel.movementType && this.moversnModel.movementReasonCode) {
      this.keyDeleteRecordValidation();
    }
  }
  onGridDelete = () => {
    if (this.externMovCountData > 0) {
      this.show('oumemove.externalMovementDelete', 'warn');
      return false;
    }
    if (this.offenderCountData > 0) {
      this.show('oumemove.offenderDeleteSchedule', 'warn');
      return false;
    }

    return true;
  }
  moversnexecuteQuery() {
    const serviceObj = this.oumemoveFactory.moversnexecuteQuery(this.moversnSearchModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.moversnData = [];
        this.namesReadOnly = false;
        this.retriveDisabled = false;
        this.clear();
        this.show('common.querycaused');
        return;
      } else {
        data.forEach(element => {
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
          element.headerStatusFlag = element.headerStatusFlag === 'Y' ? true : false;
          element.notificationFlag = element.notificationFlag === 'Y' ? true : false;
          element.notificationType = element.notificationType === 'Y' ? true : false;
          element.billingServiceFlag = element.billingServiceFlag === 'Y' ? true : false;
          element.closeContactFlag = element.closeContactFlag === 'Y' ? true : false;
          element.transportationFlag = element.transportationFlag === 'Y' ? true : false;
        });
        this.moversnData = data;
        this.moversnModel = this.moversnData[0];
        this.tableIndex = 0;
        this.clearDisabled = false;
        this.namesReadOnly = true;
        this.retriveDisabled = true;
      }
    });
  }
  onGridClear = () => {
    this.moversnexecuteQuery();
    return true;
  }
  validateRowData = (event) => {
    this.notificNotSuppotred = false;
    this.genNotification = false;
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'activeFlag') {
      if (event.data.activeFlag) {
        this.movresgrid.setColumnData('expiryDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.movresgrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }
    if (event.field === 'notificationType') {
      if (event.data.notificationType && !event.data.notificationFlag) {
        this.show('oumemove.generalNotificationFirst', 'warn');
        this.movresgrid.setColumnData('notificationType', rowIndex, false);
        rowdata.validated = true;
        this.genNotification = true;
        return rowdata;
      }
    }
    if (event.field === 'notificationFlag') {

      if (event.data.notificationFlag && event.data.movementType === 'CRT') {
        this.show('oumemove.notificationForMovmentType', 'warn');
        this.movresgrid.setColumnData('notificationFlag', rowIndex, false);
        rowdata.validated = true;
        this.notificNotSuppotred = true;
        return rowdata;
      }
    }


    rowdata.validated = true;
    return rowdata;
  }
  onMovResInsert = () => {
    if (!this.moversnValidations()) {
      return false;
    }
    return {
      activeFlag: true,
      headerStatusFlag: true,
      notificationFlag: true,
      notificationType: true,
      billingServiceFlag: true,
      closeContactFlag: true,
      listSeq: 99,
    };
  }
  moversnSaveForm(event) {
    if (!this.moversnValidations()) {
      return;
    }
    this.moversnInsertList = event.added;
    this.moversnUpdatetList = event.updated;
    this.moversnDeleteList = event.removed;
    this.moversnCommitModel.insertList = [];
    this.moversnCommitModel.updateList = [];
    this.moversnCommitModel.deleteList = [];
    if (this.moversnInsertList.length > 0 || this.moversnUpdatetList.length > 0) {
      for (let i = 0; i < this.moversnInsertList.length; i++) {
        this.moversnInsertList[i].activeFlag = this.moversnInsertList[i].activeFlag ? 'Y' : 'N';
        this.moversnInsertList[i].headerStatusFlag = this.moversnInsertList[i].headerStatusFlag ? 'Y' : 'N';
        this.moversnInsertList[i].notificationFlag = this.moversnInsertList[i].notificationFlag ? 'Y' : 'N';
        this.moversnInsertList[i].notificationType = this.moversnInsertList[i].notificationType ? 'Y' : 'N';
        this.moversnInsertList[i].billingServiceFlag = this.moversnInsertList[i].billingServiceFlag ? 'Y' : 'N';
        this.moversnInsertList[i].openContactFlag = 'Y';
        this.moversnInsertList[i].updateAllowedFlag = 'Y';
        this.moversnInsertList[i].closeContactFlag = this.moversnInsertList[i].closeContactFlag ? 'Y' : 'N';
        this.moversnInsertList[i].transportationFlag = this.moversnInsertList[i].transportationFlag ? 'Y' : 'N';
        this.moversnCommitModel.insertList = this.moversnInsertList;
      }
      for (let i = 0; i < this.moversnUpdatetList.length; i++) {
        this.moversnUpdatetList[i].activeFlag = this.moversnUpdatetList[i].activeFlag ? 'Y' : 'N';
        this.moversnUpdatetList[i].headerStatusFlag = this.moversnUpdatetList[i].headerStatusFlag ? 'Y' : 'N';
        this.moversnUpdatetList[i].notificationFlag = this.moversnUpdatetList[i].notificationFlag ? 'Y' : 'N';
        this.moversnUpdatetList[i].notificationType = this.moversnUpdatetList[i].notificationType ? 'Y' : 'N';
        this.moversnUpdatetList[i].billingServiceFlag = this.moversnUpdatetList[i].billingServiceFlag ? 'Y' : 'N';
        this.moversnUpdatetList[i].closeContactFlag = this.moversnUpdatetList[i].closeContactFlag ? 'Y' : 'N';
        this.moversnUpdatetList[i].transportationFlag = this.moversnUpdatetList[i].transportationFlag ? 'Y' : 'N';
        this.moversnCommitModel.updateList = this.moversnUpdatetList;
      }
    }
    if (this.moversnDeleteList.length > 0) {
      for (let i = 0; i < this.moversnDeleteList.length; i++) {
        this.moversnDeleteList[i].activeFlag = this.moversnDeleteList[i].activeFlag ? 'Y' : 'N';
        this.moversnDeleteList[i].headerStatusFlag = this.moversnDeleteList[i].headerStatusFlag ? 'Y' : 'N';
        this.moversnDeleteList[i].notificationFlag = this.moversnDeleteList[i].notificationFlag ? 'Y' : 'N';
        this.moversnDeleteList[i].notificationType = this.moversnDeleteList[i].notificationType ? 'Y' : 'N';
        this.moversnDeleteList[i].billingServiceFlag = this.moversnDeleteList[i].billingServiceFlag ? 'Y' : 'N';
        this.moversnDeleteList[i].closeContactFlag = this.moversnDeleteList[i].closeContactFlag ? 'Y' : 'N';
        this.moversnDeleteList[i].transportationFlag = this.moversnDeleteList[i].transportationFlag ? 'Y' : 'N';
        this.moversnCommitModel.deleteList = this.moversnDeleteList;
      }
    }
    const sentermsSaveData = this.oumemoveFactory.moversnCommit(this.moversnCommitModel);
    sentermsSaveData.subscribe(data => {

      if (String(data[0].errorMessage).indexOf('MOVEMENT_REASONS_PK') > 0) {
        this.show(this.translateService.translate('oumemove.primaryKeyViolation'));
        this.moversnexecuteQuery();
        return;
      }
      if (String(data[0].errorMessage).indexOf('OFF_SCH_MOV_RSN_F1') > 0) {
        this.show(this.translateService.translate('oumemove.offenderSchedMovReasonFk'));
        this.moversnexecuteQuery();
        return;
      }
      if (String(data[0].errorMessage).indexOf('OFF_EM_MOVE_RSN_F1') > 0) {
        this.show(this.translateService.translate('oumemove.offenderExterMovReasonFk'));
        this.moversnexecuteQuery();
        return;
      }
      if (String(data[0].errorMessage).indexOf('MODIFY_TAB_MOVE_RSN_F1') > 0) {
        this.show(this.translateService.translate('oumemove.offenderModifTabMovReasonFk'));
        this.moversnexecuteQuery();
        return;
      }
      if (data[0] && data[0].returnValue === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.moversnexecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed', 'warn');
        this.moversnexecuteQuery();
        return;
      }
    });
  }
  moversnValidations() {
    const is = { valid: true };
    if (this.moversnData && this.moversnData) {
      this.moversnData.forEach(element => {
        if (!element.movementType) {
          this.show(this.translateService.translate('oumemove.mandetoryMovmentType'), 'warn');
          is.valid = false;
          return is.valid;
        }
        if (!element.movementReasonCode) {
          this.show(this.translateService.translate('oumemove.mandetoryMovmentReason'), 'warn');
          is.valid = false;
          return is.valid;
        }
        if (element.description === undefined || !element.description.trim()) {
          this.show(this.translateService.translate('oumemove.mandetoryDescription'), 'warn');
          is.valid = false;
          return is.valid;
        }
        if (element.notificationFlag && element.movementType === 'CRT') {
          this.show('oumemove.notificationForMovmentType', 'warn');
          is.valid = false;
          return is.valid;
        }
        if (element.notificationType && !element.notificationFlag) {
          this.show('oumemove.generalNotificationFirst', 'warn');
          is.valid = false;
          return is.valid;
        }
        // if (element.notificationType && element.movementType === 'CRT') {
        //   this.show('oumemove.notificationForMovmentOne', 'warn');
        //   is.valid = false;
        //   return is.valid;
        // }
      });
    }
    return is.valid;
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
  onStatusBlur() {
    if (!this.moversnSearchModel.movementType) {
      this.moversnSearchModel.movementType = this.moversnSearchModel.movementType === '' ? undefined : '';
    }
  }
  onRelationshipBlur() {
    if (!this.moversnSearchModel.movementReasonCode) {
      this.moversnSearchModel.movementReasonCode = this.moversnSearchModel.movementReasonCode === '' ? undefined : '';
    }
  }
}
