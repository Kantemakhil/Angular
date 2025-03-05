import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ContactPersonTypesCommitBean } from './../beans/ContactPersonTypesCommitBean';
import { Component, OnInit, ViewChild, } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimctactService } from '../service/oimctact.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ContactPersonTypes } from '../beans/ContactPersonTypes';

@Component({
  selector: 'app-oimctact',
  templateUrl: './oimctact.component.html'
})

export class OimctactComponent implements OnInit {
  @ViewChild('grid') grid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  contactpersontypesData: ContactPersonTypes[] = [];
  contactpersontypesDetails: ContactPersonTypes[] = [];
  contactpersontypesDataTemp: ContactPersonTypes[] = [];
  contactpersontypesModel: ContactPersonTypes = new ContactPersonTypes();
  contactpersontypesModelData: ContactPersonTypes = new ContactPersonTypes();
  contactpersontypesIndex: number;
  contactpersontypesCommitModel: ContactPersonTypesCommitBean = new ContactPersonTypesCommitBean();
  contactpersontypesInsertList: ContactPersonTypes[] = [];
  contactpersontypesUpdateList: ContactPersonTypes[] = [];
  contactpersontypesDeleteList: ContactPersonTypes[] = [];
  contactPersonTypesColumnDef: any[];
  rgrelationshiptypeRg: any[] = [];
  rgcontacttypeRg: any[] = [];
  contactTypeLink: any;
  relationshipTypeLink: any;
  namesReadOnly: boolean;
  retriveDisable: boolean;
  clearDisable: boolean;
  contactType: string;
  relationshipType: string;
  contactTypeTitle = {
    'listDescription': this.translateService.translate('common.description'),
    'code': this.translateService.translate('common.type')
  };
  relationshipTypeTitle = {
    'listDescription': this.translateService.translate('common.description'),
    'code': this.translateService.translate('common.relationshiptype')
  };
  startingCode: boolean;
  active: boolean;
  expiryDate: Date;
  listSeq: number;
  tableIndex = -1;
  contactpersontypesInsert: boolean;
  message = ' Invalid.';
  constructor(private oimctactFactory: OimctactService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.contactPersonTypesColumnDef = [];
  }
  ngOnInit() {
    this.clearDisable = true;
    this.namesReadOnly = false;
    this.retriveDisable = false;
    this.contactpersontypesInsert = false;
    this.contactTypeLink = 'oimctact/rgContactTypeRecordGroup';
    this.relationshipTypeLink = 'oimctact/rgRelationshipTypeRecordGroup';
    this.contactPersonTypesColumnDef = [
      {
        fieldName: this.translateService.translate('oimctact.contacttype') + '*', cellEditable: this.canCellEdit,
        field: 'contactType', editable: true, datatype: 'lov', width: 150, domain:'CONTACTS'/*link: 'oimctact/rgContactTypeRecordGroup'*/,
        titles: {
          description: this.translateService.translate('common.description'),
          code: this.translateService.translate('common.type')
        }
      },
      {
        fieldName: this.translateService.translate('common.relationship') + '*', cellEditable: this.canCellEdit,
        field: 'relationshipType', editable: true, datatype: 'lov', width: 150, domain:'RELATIONSHIP'/*link: 'oimctact/rgRelationshipTypeRecordGroup'*/
        , titles: {
          description: this.translateService.translate('common.description'),
          code: this.translateService.translate('common.relationshiptype')
        }
      },
      {
        fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq',
        editable: true, width: 150, minValue: '0', maxValue: '99', strictFP: true, whole: true, datatype: 'number'
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
        editable: true, datatype: 'checkbox', width: 150
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
        datatype: 'date', editable: false, width: 150
      },
    ];
    this.contactpersontypesExecuteQuery();
  }
  clearQuery() {
    this.contactpersontypesData = [];
    this.contactpersontypesModel = new ContactPersonTypes();
    this.contactpersontypesModelData = new ContactPersonTypes();
    this.contactType = undefined;
    this.relationshipType = undefined;
    this.startingCode = false;
    this.retriveDisable = false;
    this.namesReadOnly = false;
    this.active = undefined;
    this.expiryDate = undefined;
    this.listSeq = undefined;
    this.clearDisable = true;
    this.contactpersontypesInsert = false;
  }
  onRowClicksencalc(event) {
    if (event) {
      this.contactpersontypesModelData = new ContactPersonTypes();
      this.contactpersontypesModelData = event;
    }
  }
  onStatusBlur() {
    if (!this.contactpersontypesModel.contactType) {
      this.contactpersontypesModel.contactType = this.contactpersontypesModel.contactType === '' ? undefined : '';
    }
  }
  onRelationshipBlur() {
    if (!this.contactpersontypesModel.relationshipType) {
      this.contactpersontypesModel.relationshipType = this.contactpersontypesModel.relationshipType === '' ? undefined : '';
    }
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
  canCellEdit = (data: any, index: number, field: string) => {
    if (data.createDatetime) {
      return false;
    }
    return true;
  }
  contactpersontypesExecuteQuery() {
    // if (date) {
    //   if (date.lastValue === '0_/__/____') {
    //     this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
    //     this.clearDisable = false;
    //     return;
    //   }
    //   if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
    //     this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
    //     this.clearDisable = false;
    //     return;
    //   }
    // }
    const contactpersontypesResult = this.oimctactFactory.contactPersonTypesExecuteQuery(this.contactpersontypesModel);
    contactpersontypesResult.subscribe(data => {
      if (data.length === 0) {
        this.contactpersontypesData = [];
        this.contactpersontypesInsert = true;
        this.contactpersontypesModel = new ContactPersonTypes();
        this.show('common.querycaused');
        return;
      } else {
        this.contactpersontypesData = data;
        data.forEach(element => {
          element.activeFlag = element.activeFlag !== 'Y' ? false : true;
        });
        this.clearDisable = false;
        this.namesReadOnly = true;
        this.retriveDisable = true;
        this.contactpersontypesInsert = true;
        this.tableIndex = 0;
      }
    });
  }
  /**
  *  This function will be executed when commit event is fired
  */
  oimctactSavecontactpersontypesForm(event) {
    if (!this.oimctactValidations()) {
      return;
    }
    this.contactpersontypesInsertList = event.added;
    this.contactpersontypesUpdateList = event.updated;
    this.contactpersontypesDeleteList = event.removed;
    this.contactpersontypesCommitModel.insertList = [];
    this.contactpersontypesCommitModel.updateList = [];
    this.contactpersontypesCommitModel.deleteList = [];
    if (this.contactpersontypesInsertList.length > 0) {
      for (let i = 0; i < this.contactpersontypesInsertList.length; i++) {
        this.contactpersontypesInsertList[i].activeFlag = this.contactpersontypesInsertList[i].activeFlag ? 'Y' : 'N';
        this.contactpersontypesInsertList[i].updateAllowedFlag = 'Y';
        this.contactpersontypesCommitModel.insertList = this.contactpersontypesInsertList;
      }
    } else if (this.contactpersontypesUpdateList.length > 0) {
      for (let i = 0; i < this.contactpersontypesUpdateList.length; i++) {
        this.contactpersontypesUpdateList[i].activeFlag = this.contactpersontypesUpdateList[i].activeFlag ? 'Y' : 'N';
        this.contactpersontypesCommitModel.updateList = this.contactpersontypesUpdateList;
      }
    }
    if (this.contactpersontypesDeleteList.length > 0) {
      for (let i = 0; i < this.contactpersontypesDeleteList.length; i++) {
        this.contactpersontypesDeleteList[i].activeFlag = this.contactpersontypesDeleteList[i].activeFlag ? 'Y' : 'N';
        this.contactpersontypesCommitModel.deleteList = this.contactpersontypesDeleteList;
      }
    }
    const contactpersontypesSaveData = this.oimctactFactory.contactPersonTypesCommit(this.contactpersontypesCommitModel);

    contactpersontypesSaveData.subscribe(data => {
      if (String(data.errorMessage).indexOf('CONTACT_PERSON_TYPES_PK') > 0) {
        this.message = this.translateService.translate('oimctact.rowalreadyexists');
        this.message = String(this.message).replace('%contactType%', this.contactpersontypesModelData.contactType);
        this.message = String(this.message).replace('%relationshipType%', this.contactpersontypesModelData.relationshipType);
        this.show(this.message, 'warn');
        return;
      }
      if (data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.contactpersontypesExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        this.contactpersontypesExecuteQuery();
        return;
      }
    });
  }
  onGridInsert = () => {
    if (!this.oimctactValidations()) {
      return false;
    }
    return {
      activeFlag: true
    };
  }
  onGridClear = () => {
    this.contactpersontypesExecuteQuery();
    return true;
  }
  isInsertable(date?) {
    if (this.contactpersontypesModel.contactType || this.contactpersontypesModel.relationshipType
      || this.contactpersontypesModel.listSeq || this.contactpersontypesModel.activeFlag
      || this.contactpersontypesModel.expiryDate || this.namesReadOnly) {
      this.clearDisable = false;
    } else {
      this.clearDisable = true;
    }
    if (date) {
      this.clearDisable = false;
    }
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
        this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  oimctactValidations() {
    const is = { valid: true };
    this.contactpersontypesData.forEach(data => {
      if (is.valid) {
        if (!data.contactType) {
          this.show('oimctact.contacttypemustbeentered');
          is.valid = false;
          return;
        }
      }
      if (!data.relationshipType) {
        this.show('oimctact.relationship');
        is.valid = false;
        return;
      }
      for (let x = 0; x < this.contactpersontypesData.length; x++) {
        for (let y = 0; y < this.contactpersontypesData.length; y++) {
          if (x !== y) {
            if ((this.contactpersontypesData[x].contactType ===
              this.contactpersontypesData[y].contactType) &&
              (this.contactpersontypesData[x].relationshipType ===
                this.contactpersontypesData[y].relationshipType)) {
              this.message = this.translateService.translate('oimctact.rowalreadyexists');
              this.message = String(this.message).replace('%contactType%', this.contactpersontypesData[x].contactType);
              this.message = String(this.message).replace('%relationshipType%', this.contactpersontypesData[x].relationshipType);
              this.show(this.message, 'warn');
              is.valid = false;
              return;
            }
          }
        }
      }
    });
    return is.valid;
  }
}
