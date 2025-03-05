import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumrareaService } from '@sa/admin/service/oumrarea.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Areas } from '@sa/admin/beans/Areas';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { AreasCommitBean } from '@sa/admin/beans/AreasCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
  selector: 'app-oumrarea',
  templateUrl: './oumrarea.component.html'

})

export class OumrareaComponent implements OnInit {
  @ViewChild('areaRegion', {static: true}) areaRegion: any;
  @ViewChild('areaArea', {static: true}) areaArea: any;
  @ViewChild('areaSubArea', {static: true}) areaSubArea: any;
  // Variable declaration
  msgs: any[] = [];
  maintregData: Areas[] = [];
  maintregModel: Areas = new Areas();
  maintregSearchModel: Areas = new Areas();
  maintregInsertList: Areas[] = [];
  maintregUpdatetList: Areas[] = [];
  maintregDeleteList: Areas[] = [];
  maintareaData: Areas[] = [];
  maintareaModel: Areas = new Areas();
  maintareaInsertList: Areas[] = [];
  maintareaUpdatetList: Areas[] = [];
  maintareaDeleteList: Areas[] = [];
  maintsubareaData: Areas[] = [];
  maintsubareaModel: Areas = new Areas();
  maintsubareaInsertList: Areas[] = [];
  maintsubareaUpdatetList: Areas[] = [];
  maintsubareaDeleteList: Areas[] = [];
  errorMessage: string;
  disabled: boolean;
  editable: Boolean = true;
  maintAreaColumnDef: any[];
  maintRegColumnDef: any[];
  maintSubAreaColumnDef: any[];
  rgareatypeRg: any[] = [];
  index: any;
  maintregCommitModel: AreasCommitBean = new AreasCommitBean();
  maintareaCommitModel: AreasCommitBean = new AreasCommitBean();
  maintsubareaCommitModel: AreasCommitBean = new AreasCommitBean();
  tableIndexArea: number;
  tableIndex: number;
  tableIndexSub: number;
  hideDeleteAlways: boolean;
  regInsertArea: boolean;
  areaInsertArea: boolean;
  subAreaInsertArea: boolean;
  expiryDate: any;
  retriveDisabled: boolean;
  clearDisabled: boolean;
  namesReadOnly: boolean;
  message: string;
  constructor(private oumrareaFactory: OumrareaService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.maintAreaColumnDef = [];
    this.maintRegColumnDef = [];
    this.maintSubAreaColumnDef = [];
  }
  ngOnInit() {
    this.hideDeleteAlways = false;
    this.regInsertArea = false;
    this.areaInsertArea = false;
    this.subAreaInsertArea = false;
    this.retriveDisabled = false;
    this.clearDisabled = true;
    this.namesReadOnly = false;
    this.maintRegColumnDef = [
      {
        fieldName: this.translateService.translate('oumrarea.regioncode') + '*', field: 'areaCode',
        editable: true, width: 150, datatype: 'text', uppercase: true, maxlength: 12
      },
      {
        fieldName: this.translateService.translate('oumrarea.description') + '*', field: 'description',
        editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 40,
      },
      {
        fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true,
        width: 150, minValue: '0', maxValue: '999', strictFP: true, whole: true, datatype: 'number'
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
        width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
        width: 150, datatype: 'date'
      },
    ];
    this.maintAreaColumnDef = [
      {
        fieldName: this.translateService.translate('oumrarea.areacode') + '*', field: 'areaCode',
        editable: true, width: 150, datatype: 'text', uppercase: true, maxlength: 12,
      },
      {
        fieldName: this.translateService.translate('oumrarea.areadescription') + '*', field: 'description',
        editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 40
      },
      {
        fieldName: this.translateService.translate('oumrarea.type') + '*', field: 'areaType',
        editable: true, width: 150, datatype: 'lov', domain: 'AREA_TYPE', titles: {
          code: this.translateService.translate('common.code')
          , description: this.translateService.translate('common.description')
        }
      },
      {
        fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true,
        width: 150, minValue: '0', maxValue: '999', strictFP: true, whole: true, datatype: 'number'
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
        width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
        width: 150, datatype: 'date'
      },
    ];


    this.maintSubAreaColumnDef = [
      {
        fieldName: this.translateService.translate('oumrarea.subareacode') + '*', field: 'areaCode',
        editable: true, width: 150, datatype: 'text', uppercase: true, maxlength: 12,
      },
      {
        fieldName: this.translateService.translate('oumrarea.subareadescription') + '*', field: 'description',
        editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 40
      },
      {
        fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true,
        width: 150, minValue: '0', maxValue: '999', strictFP: true, whole: true, datatype: 'number'
      },
      { fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
        width: 150, datatype: 'checkbox' },
      { fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
        editable: false, width: 150, datatype: 'date' },
    ];
    this.oumrRegexecuteQuery();
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
  /**
    * This function is called when on grid clear event fired in region grid
    */
  onGridRegionClear = () => {
    this.oumrRegexecuteQuery();
    return true;
  }
  /**
    * This function is called when on grid clear event fired in area grid
    */
  onGridAreaClear = () => {
    this.oumrareaexecuteQuery();
    return true;
  }
  /**
    * This function is called when on grid clear event fired in sub area grid
    */
  onGridClear = () => {
    this.maintsubareaExecuteQuery();
    return true;
  }
  /**
    * This function is called when clicked on region grid row
    */
  onRowClickmaintreg(event) {
    if (event) {
      this.maintregModel = event;
      this.maintareaModel = new Areas();
      this.maintareaData = [];
      this.maintsubareaModel = new Areas();
      this.maintsubareaData = [];
      if (this.maintregModel.areaCode) {
        this.maintareaModel.parentAreaCode = this.maintregModel.areaCode;
      }
      if (this.maintregModel.createDateTime) {
        this.areaInsertArea = true;
      } else {
        this.areaInsertArea = false;
      }
      this.oumrareaexecuteQuery();
      this.regInsertArea = true;

    } else {
      this.areaInsertArea = false;
    }
  }
  /**
    * This function is called when clicked on area grid row
    */
  onRowClickmaintarea(event) {
    if (event) {
      this.maintareaModel = event;
      this.maintsubareaModel = new Areas();
      this.maintsubareaData = [];
      if (this.maintareaModel.areaCode) {
        this.maintsubareaModel.parentAreaCode = this.maintareaModel.areaCode;
      }
      if (this.maintareaModel.createDateTime) {
        this.subAreaInsertArea = true;
      } else {
        this.subAreaInsertArea = false;
      }
      this.maintsubareaExecuteQuery();
    } else {
      this.subAreaInsertArea = false;
    }
  }
  /**
    * This function is called when clicked on sub area grid row
    */
  onRowClickmaintsubarea(event) {
    if (event) {
      this.maintsubareaModel = event;
      if (this.maintareaModel.areaCode) {
        this.maintsubareaModel.parentAreaCode = this.maintareaModel.areaCode;
      }
    }

  }
  /**
    * This function is used to validate the Region grid rows
    */
  validateRowData = (event) => {
    const rowIndex = this.maintregData.indexOf(event.data);
    const rowdata = new ValidateRowReturn();
    if (event.field === 'activeFlag') {
      if (event.data.activeFlag) {
        this.areaRegion.setColumnData('expiryDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.areaRegion.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  /**
    * This function is used to validate the areas grid rows
    */
  validateRowDataArea = (event) => {
    const rowIndex = this.maintareaData.indexOf(event.data);
    const rowdata = new ValidateRowReturn();
    if (event.field === 'activeFlag') {
      if (event.data.activeFlag) {
        this.areaArea.setColumnData('expiryDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.areaArea.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  /**
    * This function is used to validate the sub area grid rows
    */

  validateRowDataSub = (event) => {
    const rowIndex = this.maintsubareaData.indexOf(event.data);
    const rowdata = new ValidateRowReturn();
    if (event.field === 'activeFlag') {
      if (event.data.activeFlag) {
        this.areaSubArea.setColumnData('expiryDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.areaSubArea.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }
    rowdata.validated = true;
    return rowdata;
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  oumrareaSavemaintregForm(event) {
    if (!this.oumrarearegionValidations()) {
      return;
    }

    // TODO declare commit bean and add insert list to that object.
    this.maintregInsertList = event.added;
    this.maintregUpdatetList = event.updated;
    this.maintregDeleteList = event.removed;
    this.maintregCommitModel.insertList = [];
    this.maintregCommitModel.updateList = [];
    this.maintregCommitModel.deleteList = [];
    if (this.maintregInsertList.length > 0 || this.maintregUpdatetList.length > 0) {
      for (let i = 0; i < this.maintregInsertList.length; i++) {
        this.maintregInsertList[i].areaClass = 'REGION';
        this.maintregInsertList[i].activeFlag = this.maintregInsertList[i].activeFlag ? 'Y' : 'N';
        this.maintregCommitModel.insertList = this.maintregInsertList;
      }
      for (let i = 0; i < this.maintregUpdatetList.length; i++) {
        this.maintregUpdatetList[i].activeFlag = this.maintregUpdatetList[i].activeFlag ? 'Y' : 'N';
        this.maintregCommitModel.updateList = this.maintregUpdatetList;
      }

    }
    if (this.maintregDeleteList.length > 0) {
      for (let i = 0; i < this.maintregDeleteList.length; i++) {
        this.maintregDeleteList[i].activeFlag = this.maintregDeleteList[i].activeFlag ? 'Y' : 'N';
        this.maintregCommitModel.deleteList = this.maintregDeleteList;
      }
    }
    const maintregSaveData = this.oumrareaFactory.maintRegCommit(this.maintregCommitModel);
    maintregSaveData.subscribe(data => {
      if (String(data[0].errorMessage).indexOf('AREAS_PK') > 0) {
        this.show(this.translateService.translate('oumrarea.primarykeyviolation'), 'warn');
        this.oumrRegexecuteQuery();
        return;
      }
      if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
        this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
        this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
        this.show(this.message, 'warn');
        this.oumrRegexecuteQuery();
        return;
     }
      if (data[0] && data[0].returnValue === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.oumrRegexecuteQuery();
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
        this.oumrRegexecuteQuery();
        return;
      }
    });
  }

  /**
    * This function is called when clicked on clear button to clear the data
    */
  clear() {
    this.maintregSearchModel = new Areas();
    this.maintregData = [];
    this.maintareaData = [];
    this.maintsubareaData = [];
    this.retriveDisabled = false;
    this.clearDisabled = true;
    this.namesReadOnly = false;
    this.areaInsertArea = false;
    this.subAreaInsertArea = false;
    this.expiryDate = undefined;
  }
  /**
    * This function will be used to disable the fields when entering in search fields
    * fired
    */
  isInsertable(date?) {
    if (this.maintregSearchModel.areaCode || this.maintregSearchModel.description
      || this.expiryDate || this.maintregSearchModel.activeFlag || this.maintregSearchModel.areaType || this.maintregSearchModel.listSeq) {
      this.clearDisabled = false;
    } else {
      this.clearDisabled = true;
    }
    if (date) {
      this.clearDisabled = false;
    }
  }
  /**
      * This function is used to retrive the information of Region grid
      */
  oumrRegexecuteQuery(date?) {
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
      this.maintregSearchModel.expiryDate = this.expiryDate;
    } else {
      this.maintregSearchModel.expiryDate = null;
    }
    const serviceObj = this.oumrareaFactory.maintRegExecuteQuery(this.maintregSearchModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.maintregData = [];
        this.retriveDisabled = false;
        this.namesReadOnly = false;
        this.regInsertArea=true;
        this.show('common.querycaused');
        this.clear();
      } else {
        data.forEach(element => {
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
        });
        this.maintregData = data;
        this.maintregModel = this.maintregData[0];
        this.tableIndex = 0;
        this.retriveDisabled = true;
        this.clearDisabled = false;
        this.namesReadOnly = true;
        this.regInsertArea=true;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oumrareaSavemaintareaForm(event) {
    if (!this.oumrareaAreaValidations()) {
      return;
    }

    // TODO declare commit bean and add insert list to that object.
    this.maintareaInsertList = event.added;
    this.maintareaUpdatetList = event.updated;
    this.maintareaDeleteList = event.removed;
    this.maintareaCommitModel.insertList = [];
    this.maintareaCommitModel.updateList = [];
    this.maintareaCommitModel.deleteList = [];
    if (this.maintareaInsertList.length > 0 || this.maintareaUpdatetList.length > 0) {
      for (let i = 0; i < this.maintareaInsertList.length; i++) {
        this.maintareaInsertList[i].areaClass = 'AREA';
        this.maintareaInsertList[i].activeFlag = this.maintareaInsertList[i].activeFlag ? 'Y' : 'N';
        this.maintareaInsertList[i].parentAreaCode = this.maintregModel.areaCode;
        this.maintareaCommitModel.insertList = this.maintareaInsertList;
      }
      for (let i = 0; i < this.maintareaUpdatetList.length; i++) {
        this.maintareaUpdatetList[i].activeFlag = this.maintareaUpdatetList[i].activeFlag ? 'Y' : 'N';
        this.maintareaCommitModel.updateList = this.maintareaUpdatetList;
      }

    }
    if (this.maintareaDeleteList.length > 0) {
      for (let i = 0; i < this.maintareaDeleteList.length; i++) {
        this.maintareaDeleteList[i].activeFlag = this.maintareaDeleteList[i].activeFlag ? 'Y' : 'N';
        this.maintareaCommitModel.deleteList = this.maintareaDeleteList;
      }
    }
    const maintareaSaveData = this.oumrareaFactory.maintAreaCommit(this.maintareaCommitModel);
    maintareaSaveData.subscribe(data => {
      if (String(data[0].errorMessage).indexOf('AREAS_PK') > 0) {
        this.show(this.translateService.translate('oumrarea.primarykeyviolation'), 'warn');
        return;
      }
      if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
        this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
        this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
        this.show(this.message, 'warn');
        this.oumrareaexecuteQuery();
        return;
     }
      if (data[0] && data[0].returnValue === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.oumrareaexecuteQuery();
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
        this.oumrareaexecuteQuery();
        return;
      }
    });
  }
  /**
      * This function is used to retrive the information of area grid
      */
  oumrareaexecuteQuery() {
    const serviceObj = this.oumrareaFactory.maintAreaExecuteQuery(this.maintareaModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
      } else {
        data.forEach(element => {
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
        });
        this.maintareaData = data;
        this.maintareaModel = this.maintareaData[0];
        this.tableIndexArea = 0;
      }
    });
  }
  /**
      * This function is used to retrive the information of sub area grid
      */
  maintsubareaExecuteQuery() {
    const maintsubareaResult = this.oumrareaFactory.maintSubAreaExecuteQuery(this.maintsubareaModel);
    maintsubareaResult.subscribe(maintsubareaResultList => {
      if (maintsubareaResultList.length === 0) {
        this.maintsubareaData = [];
      } else {
        maintsubareaResultList.forEach(element => {
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
        });
        this.maintsubareaData = maintsubareaResultList;
        this.maintsubareaModel = maintsubareaResultList[0];
        this.tableIndexSub = 0;
      }
    });
  }
  /**
   *  This function will be executed to when inserting a new record or oninsert event in region grid
  * fired
  */
  regInsert = () => {
    if (!this.oumrarearegionValidations()) {
      return;
    }
    return { activeFlag: true };

  }

  /**
   *  This function will be executed to validate the mandetory fields in Regions grid
  * fired
  */
  oumrarearegionValidations() {
    const is = { valid: true };
    if (this.maintregData) {
      this.maintregData.forEach(element => {
        if (element.areaCode === undefined || !element.areaCode.trim()) {
          this.show(this.translateService.translate('oumrarea.regioncodemandetory'), 'warn');
          is.valid = false;
          return is.valid;
        }
        if (element.description === undefined || !element.description.trim()) {
          this.show(this.translateService.translate('oumrarea.descriptionmandetory'), 'warn');
          is.valid = false;
          return is.valid;
        }

      });
    }

    return is.valid;
  }
  /**
   *  This function will be executed to when inserting a new record or oninsert event in area grid
  * fired
  */
  areaInsert = () => {
    if (!this.oumrareaAreaValidations()) {
      return;
    }
    return { activeFlag: true };

  }

  /**
   *  This function will be executed to validate the mandetory fields in area grid
  * fired
  */
  oumrareaAreaValidations() {
    const is = { valid: true };
    if (this.maintareaData && this.maintareaData) {
      this.maintareaData.forEach(element => {
        if (element.areaCode === undefined || !element.areaCode.trim()) {
          this.show(this.translateService.translate('oumrarea.areacodemandetory'), 'warn');
          is.valid = false;
          return is.valid;
        }
        if (element.description === undefined || !element.description.trim()) {
          this.show(this.translateService.translate('oumrarea.areadescriptionmandetory'), 'warn');
          is.valid = false;
          return is.valid;
        }
        if (!element.areaType) {
          this.show(this.translateService.translate('oumrarea.typemandetory'), 'warn');
          is.valid = false;
          return is.valid;
        }

      });
    }

    return is.valid;
  }
  /**
   *  This function will be executed to when inserting a new record or oninsert event in sub area grid
  * fired
  */
  subAreaInsert = () => {
    if (!this.oumrareasubAreaValidations()) {
      return;
    }
    return { activeFlag: true };

  }


  /**
   *  This function will be executed to validate the mandetory fields in sub area grid
  * fired
  */
  oumrareasubAreaValidations() {
    const is = { valid: true };
    if (this.maintsubareaData) {
      this.maintsubareaData.forEach(element => {
        if (element.areaCode === undefined || !element.areaCode.trim()) {
          this.show(this.translateService.translate('oumrarea.subareamandetory'), 'warn');
          is.valid = false;
          return is.valid;
        }
        if (element.description === undefined || !element.description.trim()) {
          this.show(this.translateService.translate('oumrarea.subareadescriptionmandetory'), 'warn');
          is.valid = false;
          return is.valid;
        }

      });
    }

    return is.valid;
  }


  /**
   *  This function will be executed when commit event is
  * fired
  */
  oumrareaSavemaintsubareaForm(event) {
    if (!this.oumrareasubAreaValidations()) {
      return;
    }
    // TODO declare commit bean and add insert list to that object.
    this.maintsubareaInsertList = event.added;
    this.maintsubareaUpdatetList = event.updated;
    this.maintsubareaDeleteList = event.removed;
    this.maintsubareaCommitModel.insertList = [];
    this.maintsubareaCommitModel.updateList = [];
    this.maintsubareaCommitModel.deleteList = [];
    if (this.maintsubareaInsertList.length > 0 || this.maintsubareaUpdatetList.length > 0) {
      for (let i = 0; i < this.maintsubareaInsertList.length; i++) {
        this.maintsubareaInsertList[i].areaClass = 'SUB_AREA';
        this.maintsubareaInsertList[i].activeFlag = this.maintsubareaInsertList[i].activeFlag ? 'Y' : 'N';
        this.maintsubareaInsertList[i].parentAreaCode = this.maintareaModel.areaCode; 
        this.maintsubareaInsertList[i].areaType = this.maintareaModel.areaType;
        this.maintsubareaCommitModel.insertList = this.maintsubareaInsertList;
      }
      for (let i = 0; i < this.maintsubareaUpdatetList.length; i++) {
        this.maintsubareaUpdatetList[i].activeFlag = this.maintsubareaUpdatetList[i].activeFlag ? 'Y' : 'N';
        this.maintsubareaCommitModel.updateList = this.maintsubareaUpdatetList;
      }

    }
    if (this.maintsubareaDeleteList.length > 0) {
      for (let i = 0; i < this.maintsubareaDeleteList.length; i++) {
        this.maintsubareaInsertList[i].activeFlag = this.maintsubareaInsertList[i].activeFlag ? 'Y' : 'N';
        this.maintsubareaCommitModel.deleteList = this.maintsubareaDeleteList;
      }
    }
    const maintsubareaSaveData = this.oumrareaFactory.maintSubAreaCommit(this.maintsubareaCommitModel);
    maintsubareaSaveData.subscribe(data => {
      if (String(data[0].errorMessage).indexOf('AREAS_PK') > 0) {
        this.show(this.translateService.translate('oumrarea.primarykeyviolation'), 'warn');
        return;
      }
      if (data[0] && data[0].returnValue === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.maintsubareaExecuteQuery();
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
        this.maintsubareaExecuteQuery();
        return;
      }
    });
  }
}
