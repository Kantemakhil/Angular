import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmdedutService } from '../service/ocmdedut.service';
import { DeductionTypes } from '@inmate/trust/deductions/deductionsmaintenance/beans/DeductionTypes';
import { DeductionTypesCommitBean } from '@inmate/trust/deductions/deductionsmaintenance/beans/DeductionTypesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';

@Component({
  selector: 'app-ocmdedut',
  templateUrl: './ocmdedut.component.html'
})

export class OcmdedutComponent implements OnInit {
  @ViewChild('grid', {static: true}) grid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  dedtypeData: DeductionTypes[] = [];
  dedtypeDataTemp: DeductionTypes[] = [];
  dedtypeModel: DeductionTypes = new DeductionTypes();
  dedtypeModelData: DeductionTypes = new DeductionTypes();
  dedtypeIndex: number;
  dedtypeInsertList: DeductionTypes[] = [];
  dedtypeUpdateList: DeductionTypes[] = [];
  dedtypeDeleteList: DeductionTypes[] = [];
  dedtypeCommitModel: DeductionTypesCommitBean = new DeductionTypesCommitBean();
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  dedTypeColumnDef: any[];
  dedTypeReadOnly: boolean;
  cgfkDedtypecaseloadcodeRg: any[] = [];
  cgfkDedtypedeductioncategoRg: any[] = [];
  cgfkDedtypefrombalancetypRg: any[] = [];
  rgparentdeductiontypeRg: any[] = [];
  namesReadOnly: boolean;
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  clearDisable: boolean;
  ckeckboxReadOnly: boolean;
  dedCodeValid: boolean;
  retriveDisable: boolean;
  deleteOne: boolean;
  deleteTwo: boolean;
  deleteThree: boolean;
  deleteFour: boolean;
  deleteFive: boolean;
  deleteSix: boolean;
  onDelete: boolean;
  tableIndex = -1;
  dedCodeTitle = {
    'code': this.translateService.translate('ocmdedut.dedcat'),
    'description': this.translateService.translate('common.description')
  };
  calOnTitle = {
    'code': this.translateService.translate('ocmdedut.calon'),
    'description': this.translateService.translate('common.description')
  };
  csldCodeTitle = {
    'code': this.translateService.translate('ocmdedut.caseload'),
    'description': this.translateService.translate('common.description')
  };
  constructor(private ocmdedutFactory: OcmdedutService,
    public translateService: TranslateService,
    private sessionManager: UserSessionManager) {
    this.dedTypeColumnDef = [];
  }
  onGridReady(event) {
  }
  ngOnInit() {
    this.namesReadOnly = false;
    this.clearDisable = true;
    this.ckeckboxReadOnly = false;
    this.dedCodeValid = false;
    this.dedtypeExecuteQuery();
    this.dedTypeColumnDef = [
      {
        fieldName: this.translateService.translate('ocmdedut.dedcatmandatory'), field: 'deductionCategory', required:true,
        datatype: 'lov', domain: 'DEDUCT_CAT', editable: true, width: 150, maxlength: 12, cellEditable: this.canAlertEdit,
        titles: this.dedCodeTitle
      },
      {
        fieldName: this.translateService.translate('ocmdedut.calonmandatory'), field: 'fromBalanceType',
        datatype: 'lov', domain: 'BALANCE_TYPE', editable: true, width: 150, maxlength: 12, required:true,
        titles: this.calOnTitle
      },
      {
        fieldName: this.translateService.translate('ocmdedut.dedcodemandatory'), field: 'deductionType',
        datatype: 'text', editable: true, width: 150, maxlength: 6, cellEditable: this.canAlertEdit, required:true
      },
      {
        fieldName: this.translateService.translate('ocmdedut.description'), field: 'deductionDesc',
        editable: true, width: 150, maxlength: 40, datatype: 'text', uppercase: 'false', required:true,
      },
      {
        fieldName: this.translateService.translate('common.caseloadmandatory'), field: 'caseloadCode',
        datatype: 'lov', domain: 'CSLD_CODE', editable: true, width: 150, maxlength: 12, required:true,
        titles: this.csldCodeTitle
      },
      {
        fieldName: this.translateService.translate('ocmdedut.csldrest'), field: 'caseloadRestrictedFlag',
        datatype: 'checkbox', editable: true, width: 150
      },
      {
        fieldName: this.translateService.translate('ocmdedut.act'), field: 'activeFlag',
        datatype: 'checkbox', editable: true, width: 150
      },
      { fieldName: this.translateService.translate('common.sequence'), field: 'listSeq', editable: true, width: 150, maxlength: 4 },
      {
        fieldName: this.translateService.translate('ocmdedut.upd'), field: 'updateAllowedFlag',
        datatype: 'checkbox', editable: true, width: 150
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150,
        datatype: 'date'
      },
      {
        fieldName: this.translateService.translate('ocmdedut.parentdedcode'), field: 'parentDeductionType', datatype: 'lov',
        link: 'ocmdedut/rgParentDeductionTypeRecordGroup?deductionType=', parentField: 'deductionType', editable: true,
        titles: {
          description: this.translateService.translate('ocmdedut.parentdeductiontype'),
          deductionDesc: 'Description'
        }, width: 150, maxlength: 6, cellEditable: this.parentFieldEditable
      },
      {
        fieldName: this.translateService.translate('ocmdedut.percntgeofparent'), field: 'percentageOfParent',
        editable: true, width: 150, maxlength: 6
      },
    ];
  }
  parentFieldEditable = (data: any, index: number, field: string): boolean => {
    if (data.deductionType) {
      return true;
    } else {
      return false;
    }
  }
  onRowClickdedtype(event) {
    if (event) {
      this.dedtypeModelData = event;
      if (this.dedtypeModelData.deductionType) {
        const deleteTxnType = this.ocmdedutFactory.deleteDedTypeValidation(this.dedtypeModelData.deductionType);
        deleteTxnType.subscribe(deleteData => {
          if (deleteData === 1) {
            this.deleteOne = true;
          } else {
            this.deleteOne = false;
          }
          if (deleteData === 2) {
            this.deleteTwo = true;
          } else {
            this.deleteTwo = false;
          }
          if (deleteData === 3) {
            this.deleteThree = true;
          } else {
            this.deleteThree = false;
          }
          if (deleteData === 4) {
            this.deleteFour = true;
          } else {
            this.deleteFour = false;
          }
          if (deleteData === 5) {
            this.deleteFive = true;
          } else {
            this.deleteFive = false;
          }
          if (deleteData === 6) {
            this.deleteSix = true;
          } else {
            this.deleteSix = false;
          }
        });
      }
      if (event.modifyDate) {
        this.onDelete = true;
      } else {
        this.onDelete = false;
      }
    }
  }
  ok(event?) {
    this.dedtypeExecuteQuery();
  }
  no() {
  }
  clearQuery() {
    this.dedtypeData = [];
    this.dedtypeModel = new DeductionTypes();
    this.namesReadOnly = false;
    this.clearDisable = true;
    this.ckeckboxReadOnly = false;
    this.dedCodeValid = false;
  }
  onOffenderChange(offender) {
  }
  dedtypeExecuteQuery() {
    const dedtypeResult = this.ocmdedutFactory.dedTypeExecuteQuery(this.dedtypeModel);
    dedtypeResult.subscribe(dedtypeResultList => {
      if (dedtypeResultList.length === 0) {
        this.dedtypeData = [];
        this.clearDisable = false;
        this.message = this.translateService.translate('common.querycaused');
        this.show();
        return;
      } else {
        dedtypeResultList.forEach(element => {
          element.caseloadRestrictedFlag = element.caseloadRestrictedFlag === 'Y' ? true : false;
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
          element.updateAllowedFlag = element.updateAllowedFlag === 'Y' ? true : false;
        });
        this.dedtypeData = dedtypeResultList;
        this.namesReadOnly = true;
        this.clearDisable = false;
        this.ckeckboxReadOnly = true;
        this.dedCodeValid = false;
        this.tableIndex = 0;
      }
    });
  }
  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocmdedutSavededtypeForm(event) {
    this.dedtypeInsertList = event.added;
    this.dedtypeUpdateList = event.updated;
    this.dedtypeDeleteList = event.removed;
    this.dedtypeCommitModel.insertList = [];
    this.dedtypeCommitModel.updateList = [];
    this.dedtypeCommitModel.deleteList = [];
    if (this.dedtypeInsertList.length > 0 || this.dedtypeUpdateList.length > 0) {
      for (let i = 0; i < this.dedtypeInsertList.length; i++) {
        if (!this.dedtypeInsertList[i].deductionCategory) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmdedut.dedcatmustbeentered');
          this.show();
          return;
        }
        if (!this.dedtypeInsertList[i].fromBalanceType) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmdedut.calonmustbeentered');
          this.show();
          return;
        }
        if (!this.dedtypeInsertList[i].deductionType) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmdedut.dedcodemustbeentered');
          this.show();
          return;
        }
        if (!this.dedtypeInsertList[i].deductionDesc) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmdedut.descriptionmustbeentered');
          this.show();
          return;
        }
        if (!this.dedtypeInsertList[i].caseloadCode) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmdedut.caseloadmustbeentered');
          this.show();
          return;
        }
        for (let i = 0; i < this.dedtypeData.length; i++) {
          for (let j = 0; j < this.dedtypeData.length; j++) {
              if (i !== j && (this.dedtypeData[i].deductionType === this.dedtypeData[j].deductionType)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmdedut.rowexistalreadywithsamededcode');
                this.show();
                return;
              }
          }
      }
        this.dedtypeInsertList[i].incrementPayablesFlag = 'Y';
        this.dedtypeInsertList[i].modifyDate = DateFormat.getDate();
        this.dedtypeInsertList[i].createDatetime = DateFormat.getDate();
        this.dedtypeInsertList[i].modifyDatetime = DateFormat.getDate();
        this.dedtypeInsertList[i].createUserId = this.sessionManager.getId();
        this.dedtypeInsertList[i].modifyUserId = this.sessionManager.getId();
        this.dedtypeInsertList[i].activeFlag = !this.dedtypeInsertList[i].activeFlag ? 'N' : 'Y';
        this.dedtypeInsertList[i].caseloadRestrictedFlag = !this.dedtypeInsertList[i].caseloadRestrictedFlag ? 'N' : 'Y';
        this.dedtypeInsertList[i].updateAllowedFlag = !this.dedtypeInsertList[i].updateAllowedFlag ? 'N' : 'Y';
        this.dedtypeCommitModel.insertList = this.dedtypeInsertList;
      }
      for (let i = 0; i < this.dedtypeUpdateList.length; i++) {
        this.dedtypeUpdateList[i].modifyDate = DateFormat.getDate();
        this.dedtypeUpdateList[i].modifyUserId = this.sessionManager.getId();
        this.dedtypeCommitModel.updateList = this.dedtypeUpdateList;
      }
    }
    if (this.dedtypeDeleteList.length > 0) {
      for (let i = 0; i < this.dedtypeDeleteList.length; i++) {
        this.dedtypeCommitModel.deleteList = this.dedtypeDeleteList;
      }
    }
    const dedtypeSaveData = this.ocmdedutFactory.dedTypeCommit(this.dedtypeCommitModel);
    dedtypeSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'success';
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.show();
        this.dedtypeExecuteQuery();
        return;
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
        this.dedtypeExecuteQuery();
        return;
      }
    });
  }
  onGridInsert = () => {
    for (let i = 0; i < this.dedtypeData.length; i++) {
      if (!this.dedtypeData[i].deductionCategory) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocmdedut.dedcatmustbeentered');
        this.show();
        return;
      }
      if (!this.dedtypeData[i].fromBalanceType) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocmdedut.calonmustbeentered');
        this.show();
        return;
      }
      if (!this.dedtypeData[i].deductionType) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocmdedut.dedcodemustbeentered');
        this.show();
        return;
      }
      if (!this.dedtypeData[i].deductionDesc) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocmdedut.descriptionmustbeentered');
        this.show();
        return;
      }
      if (!this.dedtypeData[i].caseloadCode) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocmdedut.caseloadmustbeentered');
        this.show();
        return;
      }
      for (let i = 0; i < this.dedtypeData.length; i++) {
        for (let j = 0; j < this.dedtypeData.length; j++) {
            if (i !== j && (this.dedtypeData[i].deductionType === this.dedtypeData[j].deductionType)) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocmdedut.rowexistalreadywithsamededcode');
              this.show();
              return;
            }
        }
    }
    }
    return {
      fromBalanceType: 'OB', caseloadCode: 'INST', activeFlag: true, caseloadRestrictedFlag: true,
      updateAllowedFlag: true, listSeq: 99
    };
  }
  canAlertEdit = (data: any, index: number, field: string): boolean => {
    if (!data.modifyDate) {
      return true;
    } else {
      return false;
    }
  }
  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    if (event.field === 'deductionType' && event.data.deductionType) {
      const dedCodeValidData = this.ocmdedutFactory.dedCodeValidation(event.data.deductionType);
      dedCodeValidData.subscribe(data => {
        if (data && data === 'Y') {
          this.dedCodeValid = true;
        } else {
          this.dedCodeValid = false;
        }
      });
    }
    if (event.field === 'activeFlag') {
      if (event.field === 'activeFlag' && event.data.activeFlag === false && event.newValue !== event.oldValue) {
        event.data.expiryDate = DateFormat.getDate();
        this.grid.setColumnData('activeFlag', rowIndex,
          event.data.activeFlag);
      } else {
        event.data.expiryDate = null;
        this.grid.setColumnData('activeFlag', rowIndex,
          event.data.activeFlag);
      }
    }
    return rowdata;
  }
  activeFlagChange(event) {
    if (!event) {
    }
  }
  onGridDelete = () => {
    if (this.deleteOne) {
      this.type = 'warn';
      this.message = this.translateService.translate('ocmdedut.cannotdeletedeductiontypes');
      this.show();
      return;
    } else if (this.deleteTwo) {
      this.type = 'warn';
      this.message = this.translateService.translate('ocmdedut.cannotdeletedeductiontypes');
      this.show();
      return;
    } else if (this.deleteThree) {
      this.type = 'warn';
      this.message = this.translateService.translate('ocmdedut.cannotdeletedeductiontypeslimit');
      this.show();
      return;
    } else if (this.deleteFour) {
      this.type = 'warn';
      this.message = this.translateService.translate('ocmdedut.cannotdeletedeductiontypesoffender');
      this.show();
      return;
    } else if (this.deleteFive) {
      this.type = 'warn';
      this.message = this.translateService.translate('ocmdedut.cannotdeletedeductiontypesoffenderded');
      this.show();
      return;
    } else if (this.deleteSix) {
      this.type = 'warn';
      this.message = this.translateService.translate('ocmdedut.cannotdeletedeductiontypescaseload');
      this.show();
      return;
    }
    return true;
  }
  onGridClear = () => {
    this.dedCodeValid = false;
    return true;
  }
}
