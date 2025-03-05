import {
  Component, OnInit, AfterViewInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcucorptService } from '../service/ocucorpt.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { CorporateTypes } from '@inmate/trust/financialsmaintenance/payees/beans/CorporateTypes';
import { CorporateTypesCommitBean } from '@inmate/trust/financialsmaintenance/payees/beans/CorporateTypesCommitBean';


@Component({
  selector: 'app-ocucorpt',
  templateUrl: './ocucorpt.component.html'
})

export class OcucorptComponent implements OnInit, AfterViewInit {
  domain: string;

  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  @ViewChild('grid', {static: true}) grid: any;
  actionName: string;

  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  corporatetypesData: CorporateTypes[] = [];
  corporatetypesDataTemp: CorporateTypes[] = [];
  corporatetypesModel: CorporateTypes = new CorporateTypes();
  selectedRow: CorporateTypes = new CorporateTypes();
  corporatetypesCommitModel: CorporateTypesCommitBean = new CorporateTypesCommitBean();
  corporatetypesIndex = 0;
  corporatetypesInsertList: CorporateTypes[] = [];
  corporatetypesUpdatetList: CorporateTypes[] = [];
  corporatetypesDeleteList: CorporateTypes[] = [];
  corporateType: string;
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable = true;
  corporateTypesColumnDef: any[];
  corporateTypesReadOnly = false;
  rgcorptypeRg: any[] = [];
  tableIndex = -1;
  disabledFlag = true;
  titles: any;
  constructor(private ocucorptFactory: OcucorptService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.corporateTypesColumnDef = [];
  }
  ngOnInit() {
    this.titles = { code: this.trMsg('common.code'), description: this.trMsg('common.description') };
    this.corporateTypesColumnDef = [
      {
        fieldName: this.trMsg('ocucorpt.crpttype', '*'), field: 'corporateType', datatype: 'lov', domain: 'CORP_TYPE',
        editable: true, width: 150, titles: this.titles
      },
    ];

    this.corporateTypesExecuteQuery();
  }
  ngAfterViewInit(): void {
    setTimeout(ele => {
      this.disabledFlag = false;
      this.domain = 'CORP_TYPE';
    }, 1000);
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
  onRowClickcorporatetypes(event) {
    if (event) {
      this.selectedRow = event;
    } else {
      this.selectedRow = new CorporateTypes();
    }
  }
  onButSaveclick() {
  }
  onButExitclick() {
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
  corporateTypesExecuteQuery() {
    this.corporatetypesModel.corporateId = this.dialog.data.corporateId;
    this.corporatetypesModel.corporateType = this.corporateType;
    const corporatetypesResult = this.ocucorptFactory.corporateTypesExecuteQuery(this.corporatetypesModel);
    corporatetypesResult.subscribe(data => {
      if (data.length === 0) {
        this.corporatetypesData = [];
        this.show('common.querycaused');
      } else {
        this.corporatetypesData = data;
        this.tableIndex = 0;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocucorptSavecorporatetypesForm(event) {
    if (!this.validateGridData(this.corporatetypesData)) {
      return null;
    }
    this.corporatetypesInsertList = event.added;
    this.corporatetypesUpdatetList = event.updated;
    this.corporatetypesDeleteList = event.removed;
    this.corporatetypesCommitModel.insertList = [];
    this.corporatetypesCommitModel.updateList = [];
    this.corporatetypesCommitModel.deleteList = [];

    if (this.corporatetypesInsertList.length > 0) {
      for (let i = 0; i < this.corporatetypesInsertList.length; i++) {
        this.corporatetypesInsertList[i].corporateId = this.corporatetypesModel.corporateId;
        this.corporatetypesInsertList[i].createDatetime = DateFormat.getDate();
        this.corporatetypesInsertList[i].modifyDatetime = DateFormat.getDate();
        this.corporatetypesInsertList[i].createUserId = this.sessionManager.getId();
        this.corporatetypesInsertList[i].modifyUserId = this.sessionManager.getId();
        this.corporatetypesCommitModel.insertList = this.corporatetypesInsertList;
      }

    }
    if (this.corporatetypesUpdatetList.length > 0) {
      for (let i = 0; i < this.corporatetypesUpdatetList.length; i++) { }
      this.corporatetypesCommitModel.updateList = this.corporatetypesUpdatetList;
    }
    if (this.corporatetypesDeleteList.length > 0) {
      for (let i = 0; i < this.corporatetypesDeleteList.length; i++) { }
      this.corporatetypesCommitModel.deleteList = this.corporatetypesDeleteList;
    }
    const corporatetypesSaveData = this.ocucorptFactory.corporateTypesCommit(this.corporatetypesCommitModel);
    corporatetypesSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
      } else {
        this.show('common.addupdateremoverecordfailed', 'error');
      }
      this.corporateTypesExecuteQuery();
    });
  }
  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    if (event.field === 'corporateType' && event.newValue !== event.oldValue && !event.oldValue) {
      if (event.data.corporateType === 'TRUST') {
        const obj = { caseloadId: this.dialog.data.caseloadId, corporateType: event.newValue };
        this.ocucorptFactory.prevCaseloadCorpExists(obj).subscribe(count => {
          if (count >= 1) {
            const msgs = this.trMsg('ocucorpt.antrccoshecasetypealrdy').replace('%corporateType%', event.data.corporateType);
            this.show(msgs);
            this.grid.setColumnData('corporateType', rowIndex, null);
          }
        });
        return rowdata;
      }
    }
    return rowdata;
  }
  validateGridData(list: any[]) {
    const is = { valid: true };
    if (list && Array.isArray(list)) {
      list.forEach(ele => {
        if (!ele.corporateType) {
          this.show('ocucorpt.croptypemstentr');
          is.valid = false;
          return;
        }
        const counts = list.filter(dup => {
          return dup.corporateType === ele.corporateType;
        });
        if (counts && counts.length > 1) {
          this.show('ocucorpt.croptyperowest');
          is.valid = false;
          return;
        }
      });
    }
    return is.valid;
  }
  onGridInsert = () => {
    if (!this.validateGridData(this.corporatetypesData)) {
      return null;
    } else {
      return new CorporateTypes();
    }
  }
  trMsg(msg, astr?) {
    return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
  }
  onClear() {
    this.corporateType = null;
    this.corporatetypesData = [];
  }
  get clrFlg(): boolean {
    if (this.corporateType || this.corporatetypesData.length > 0) {
      return false;
    } else {
      return true;
    }
  }
  get rtvFlg(): boolean {
    if (this.corporatetypesData.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  lovBlur() {
    if (!this.corporateType) {
      this.corporateType = this.corporateType === '' ? undefined : '';
    }
  }
}
