import { FormAccessibleFormsCommitBean } from './../beans/FormAccessibleFormsCommitBean';
import {
  Component, OnInit, ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumformsService } from '../service/oumforms.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OmsModules } from '../../usersystemsecurity/beans/OmsModules';
import { FormAccessibleForms } from '@instSecurityThreatGroupsbeans/FormAccessibleForms';
import { AccessibleFormTables } from '../beans/AccessibleFormTables';
import { AccessibleFormTablesCommitBean } from '../beans/AccessibleFormTablesCommitBean';


@Component({
  selector: 'app-oumforms',
  templateUrl: './oumforms.component.html'
})

export class OumformsComponent implements OnInit {
  actionName: string;
  @ViewChild('grid', {static: true}) grid: any;
  @ViewChild('gridOne', {static: true}) gridOne: any;
  @ViewChild('gridTwo', {static: true}) gridTwo: any;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  omsmodData: OmsModules[] = [];
  omsmodDataTemp: OmsModules[] = [];
  omsmodModel: OmsModules = new OmsModules();
  omsmodIndex = 0;
  omsmodInsertList: OmsModules[] = [];
  omsmodUpdatetList: OmsModules[] = [];
  omsmodDeleteList: OmsModules[] = [];
  fafData: FormAccessibleForms[] = [];
  fafModel: FormAccessibleForms = new FormAccessibleForms();
  fafIndex = 0;
  fafInsertList: FormAccessibleForms[] = [];
  fafUpdatetList: FormAccessibleForms[] = [];
  fafDeleteList: FormAccessibleForms[] = [];
  fafCommitModel: FormAccessibleFormsCommitBean = new FormAccessibleFormsCommitBean();
  accesstabData: AccessibleFormTables[] = [];
  accesstabModel: AccessibleFormTables = new AccessibleFormTables();
  accesstabIndex = 0;
  accesstabInsertList: AccessibleFormTables[] = [];
  accesstabUpdatetList: AccessibleFormTables[] = [];
  accesstabDeleteList: AccessibleFormTables[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable = true;
  fafColumnDef: any[];
  accessTabColumnDef: any[];
  omsModReadOnly = false;
  fafReadOnly = false;
  accessTabReadOnly = false;
  rgmodulenameRg: any[] = [];
  rgtablenameRg: any[] = [];
  rgdestinationformRg: any[] = [];
  accesstabCommitModel: AccessibleFormTablesCommitBean = new AccessibleFormTablesCommitBean();
  tableIndex = -1;
  index: number;
  retrievedisabled: boolean;
  clearDisabled: boolean;
  nextReadOnly: boolean;
  previousReadOnly: boolean;
  type: string;
  message: string;
  msglist: any[];
  enableInsertFaf: boolean;
  accessEnableDelete: boolean;
  fafEnableDelete: boolean;
  lovTitles = {
    code: this.translateService.translate('common.modulename'),
    description: this.translateService.translate('common.description')
  };
  tableNameTitles = {
    code: this.translateService.translate('oumforms.tablename'),
  };
  moduleLovTitles = {
    code: this.translateService.translate('common.modulename'),
    description: this.translateService.translate('common.description')
  };
  tableGridInsert: boolean;
  omsmodColumnDef: {};
  enableInsertOmsmod: boolean;
  typeFlag: boolean;
  constructor(private oumformsFactory: OumformsService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.fafColumnDef = [];
    this.accessTabColumnDef = [];
  }
  ngOnInit() {
    this.omsmodColumnDef = [
      {
        fieldName: this.translateService.translate('common.modulename'), field: 'description', titles: this.moduleLovTitles,
        editable: true, width: 150, datatype: 'text'
      },
    ];
    this.fafColumnDef = [
      {
        fieldName: this.translateService.translate('oumforms.modulenamereq'), field: 'destinationForm', editable: false, width: 150,
        datatype: 'lov', link: 'oumforms/rgDestinationFormRecordGroup', titles: this.moduleLovTitles, cellEditable: this.canEffective
      },
      {
        fieldName: this.translateService.translate('oumforms.seqreq'), field: 'listSeq', datatype: 'number', editable: true, width: 150,
        minValue: '0', maxValue: '9999999', strictFP: true, whole: true
      },
    ];
    this.accessTabColumnDef = [
      {
        fieldName: this.translateService.translate('oumforms.tablenamereq'), field: 'tableName', editable: false, width: 80,
        datatype: 'lov', link: 'oumforms/rgTableNameRecordGroup', titles: this.tableNameTitles, cellEditable: this.canEffective
      },
    ];
    this.retrievedisabled = false;
    this.clearDisabled = true;
    this.nextReadOnly = true;
    this.previousReadOnly = true;
    this.enableInsertFaf = false;
    this.tableGridInsert = false;
    this.enableInsertOmsmod = false;
    this.omsModExecuteQuery();
  }


  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  onRowClickOmsmod(event) {
    if (event) {
      this.omsmodModel = event;
      this.fafModel.destinationForm = this.omsmodModel.moduleName;
    }
    if (this.fafModel.destinationForm) {
      this.oumformsexecuteQuery();
      this.enableInsertFaf = true;
      this.tableGridInsert = false;
    } else {
      this.fafData = [];
      this.fafModel = new FormAccessibleForms();
      this.accesstabData = [];
      this.accesstabModel = new AccessibleFormTables();
      this.enableInsertFaf = false;
      this.tableGridInsert = false;
    }
  }
  onRowClickfaf(event) {
    if (event.createDatetime || event.createDatetime !== undefined) {
			this.fafEnableDelete = true;
		} else {
			this.fafEnableDelete = false;
		}
    if (event) {
      this.fafModel = event;
      this.accesstabModel.destinationForm = this.fafModel.destinationForm;
      this.accesstabExecuteQuery();
    }
     else {
      this.accesstabData = [];
      this.accesstabModel = new AccessibleFormTables();
    }
    if (!event.createDatetime || event.createDatetime === undefined) {
      this.tableGridInsert = false;
    } else {
      this.tableGridInsert = true;
    }
  }

  onRowClickAccess(event) {
    if (event.createDatetime || event.createDatetime !== undefined) {
			this.accessEnableDelete = true;
		} else {
			this.accessEnableDelete = false;
    }
  }

  canEffective = (data: any, index: number, field: string): boolean => {
    if (!data.createDatetime) {
      return true;
    } else {
      return false;
    }
  }

  onGridInsert = () => {
    if (!this.oumformsValidationsFaf()) {
      return false;
    }
    return { listSeq: '99' };
  }
  onGridInsertOne = () => {
    if (!this.oumformsValidationsAccess()) {
      return false;

    }
    return {};
  }
  onGridClear = () => {
    this.omsModExecuteQuery();
    return true;
  }
  onGridClearOne = () => {
    this.oumformsexecuteQuery();
    return true;
  }

  onGridClearTwo = () => {
    this.accesstabExecuteQuery();
    return true;
  }

  omsModExecuteQuery() {
    const serviceObj = this.oumformsFactory.omsModExecuteQuery(this.omsmodModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.omsmodData = [];
      } else {
        this.omsmodData = data;
        this.omsmodModel = this.omsmodData[0];
        this.tableIndex = 0;
        this.enableInsertFaf = true;
      }
    });
  }
  oumformsSavefafForm(event) {
    if (!this.oumformsValidationsFaf()) {
      return;
    }
    this.fafInsertList = event.added;
    this.fafUpdatetList = event.updated;
    this.fafDeleteList = event.removed;
    this.fafCommitModel.insertList = [];
    this.fafCommitModel.updateList = [];
    this.fafCommitModel.deleteList = [];
    if (this.fafInsertList.length > 0) {
      for (let i = 0; i < this.fafInsertList.length; i++) {
        this.fafInsertList[i].originatingForm = this.omsmodModel.moduleName;
        this.fafInsertList[i].createUserId = this.omsmodModel.createUserId;
        this.fafInsertList[i].createDatetime = this.omsmodModel.createDatetime;
        this.fafCommitModel.insertList = this.fafInsertList;
      }
    }
    if (this.fafUpdatetList.length > 0) {
      for (let i = 0; i < this.fafUpdatetList.length; i++) {
        this.fafUpdatetList[i].createUserId = this.sessionManager.getId();
      }
      this.fafCommitModel.updateList = this.fafUpdatetList;
    }
    if (this.fafDeleteList.length > 0) {
      this.fafCommitModel.deleteList = this.fafDeleteList;
    }
    const fafSaveData = this.oumformsFactory.fafCommit(this.fafCommitModel);
    fafSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.oumformsexecuteQuery();
        this.accesstabExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        this.oumformsexecuteQuery();
        return;
      }
    });
  }


  oumformsexecuteQuery() {
    this.fafModel.originatingForm = this.omsmodModel.moduleName;
    const serviceObj = this.oumformsFactory.
      fafExecuteQuery(this.fafModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.fafData = [];
        this.tableGridInsert = false;
      } else {
        this.fafData = data;
        this.fafModel = this.fafData[0];
        this.tableIndex = 0;
        this.enableInsertFaf = true;
        this.tableGridInsert = true;
      }
    });

  }

  oumformsValidationsFaf() {
    const is = { valid: true };
    if (this.fafData.length > 0) {
      this.fafData.forEach(data => {
        if (!data.destinationForm) {
          this.type = 'warn';
          this.show('oumforms.modulename');
          is.valid = false;
          return;
        } else if (!data.listSeq && data.listSeq !== 0) {
          this.type = 'warn';
          this.show('oumforms.seqmustbeenter');
          is.valid = false;
          return;
        }
        else if (data.destinationForm === this.omsmodModel.moduleName) {
          this.show('oumforms.thisformnotthesamecallingform');
          is.valid = false;
          return;
        }
      });
    }
    for (let i = 0; i < this.fafData.length; i++) {
      for (let j = 0; j < this.fafData.length; j++) {
        if (i !== j && this.fafData[i].destinationForm === this.fafData[j].destinationForm) {
          this.show('oumforms.thisformalreadyexistssamecallingform');
          is.valid = false;
          return is.valid;
        }
      }
    }
    return is.valid;
  }

  oumformsValidationsAccess() {
    const is = { valid: true };
    if (this.accesstabData.length > 0) {
      this.accesstabData.forEach(data => {
        if (!data.tableName) {
          this.type = 'warn';
          this.show('oumforms.tablenamemustbe');
          is.valid = false;
          return;
        }
      });
    }
    for (let i = 0; i < this.accesstabData.length; i++) {
      for (let j = 0; j < this.accesstabData.length; j++) {
        if (i !== j && this.accesstabData[i].tableName === this.accesstabData[j].tableName) {
          this.show('oumforms.rowexistsalreadyinaccessformtables');
          is.valid = false;
          return is.valid;
        }
      }
    }
    return is.valid;
  }

  accesstabExecuteQuery() {
    this.accesstabModel.originatingForm = this.fafModel.originatingForm;
    this.accesstabModel.destinationForm = this.fafModel.destinationForm;
    const accesstabResult = this.oumformsFactory.accessTabExecuteQuery(this.accesstabModel);
    accesstabResult.subscribe(data => {
      if (data.length === 0) {
        this.accesstabData = [];
        this.accesstabModel = new AccessibleFormTables();
      } else {
        this.accesstabData = data;
        this.accesstabModel = this.accesstabData[0];
        this.tableIndex = 0;
      }
    });
  }

  oumformsSaveaccesstabForm(event) {
    if (!this.oumformsValidationsAccess()) {
      return;
    }
    this.accesstabInsertList = event.added;
    this.accesstabUpdatetList = event.updated;
    this.accesstabDeleteList = event.removed;
    this.accesstabCommitModel.insertList = [];
    this.accesstabCommitModel.updateList = [];
    this.accesstabCommitModel.deleteList = [];
    for (let i = 0; i < this.accesstabInsertList.length; i++) {
      this.accesstabInsertList[i].originatingForm = this.fafModel.originatingForm;
      this.accesstabInsertList[i].destinationForm = this.fafModel.destinationForm;
      this.accesstabInsertList[i].createUserId = this.fafModel.createUserId;
    }

    this.accesstabCommitModel.insertList = this.accesstabInsertList;
    this.accesstabCommitModel.updateList = this.accesstabUpdatetList;
    for (let i = 0; i < this.accesstabDeleteList.length; i++) {
      this.accesstabDeleteList[i].tableName = this.accesstabDeleteList[i].tableName;
      this.accesstabCommitModel.deleteList = this.accesstabDeleteList;
    }
    const accesstabSaveData = this.oumformsFactory.accessTabCommit(this.accesstabCommitModel);
    accesstabSaveData.subscribe(data => {
      if (data && data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.accesstabExecuteQuery();
        return;
      } else if (data && data.sealFlag === '0') {
        this.show('common.addupdateremoverecordfailed');
        this.accesstabExecuteQuery();
        return;
      } else if (data && data.sealFlag && data.listSeq === 2292) {
        this.message = this.translateService.translate('common.recordcannotbedeleted');
        this.message = String(this.message).replace('%tablename%', data.sealFlag);
        this.show(this.message, 'warn');
        this.accesstabExecuteQuery();
        return;
      } else if (data && data.sealFlag && data.listSeq === 2291) {
        this.message = this.translateService.translate('common.recordcannotbedeletedparent');
        this.message = String(this.message).replace('%tablename%', data.sealFlag);
        this.show(this.message, 'warn');
        this.accesstabExecuteQuery();
        return;
      }
    });
  }
}
