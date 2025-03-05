import {
  Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmcslimService } from '../service/otmcslim.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadLimits } from '@inmate/beans/CaseloadLimits';
import { CaseloadLimitsCommitBean } from '@inmate/beans/CaseloadLimitsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
  selector: 'app-otmcslim',
  templateUrl: './otmcslim.component.html'
})

export class OtmcslimComponent implements OnInit {
  // Variable declaration
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  csldlimData: CaseloadLimits[] = [];
  csldlimDataTemp: CaseloadLimits[] = [];
  csldlimModel: CaseloadLimits = new CaseloadLimits();
  csldlimInsertList: CaseloadLimits[] = [];
  csldlimUpdatetList: CaseloadLimits[] = [];
  csldlimDeleteList: CaseloadLimits[] = [];
  csldlimCommitModel: CaseloadLimitsCommitBean = new CaseloadLimitsCommitBean();
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  acPrdColumnDef: any[];
  csldDdColumnDef: any[];
  bankCbColumnDef: any[];
  bankCrColumnDef: any[];
  csldLimColumnDef: any[];
  caseloadLink: string;
  isRetrieveDis: boolean;
  isClearDis: boolean;
  caseloadId: string;
  limitType: string;
  periodType: string;
  tableIndex = -1;
  iscaseloadId:boolean=true;
  caseloadTitles =  { code: this.translateService.translate('otmcslim.caseloadid')  , description: 'Description'};
  limittypeTitles =  { code: this.translateService.translate('otmcslim.limittype')  , description: 'Description'};
  periodtypeTitles =  { code: this.translateService.translate('otmcslim.periodtype')  , description: 'Description'};
  constructor(private otmcslimFactory: OtmcslimService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    // TODO initilize data members here..!
    this.csldLimColumnDef = [];
  }
  ngOnInit() {
    this.isRetrieveDis = false;
    this.isClearDis = true;
    this.caseloadLink = 'otmcslim/cgfkCsldLimCaseloadIdRecordGroup';
    this.csldLimColumnDef = [
      {
        fieldName: this.translateService.translate('otmcslim.caseloadid') + '*', field: 'caseloadId', editable: true,
         width: 150, datatype: 'lov',
        link: 'otmcslim/cgfkCsldLimCaseloadIdRecordGroup', cellEditable: this.canCellEdit, titles: this.caseloadTitles
      },
      // { fieldName: 'Description', field: 'description', editable: false, width: 150, datatype: 'text' },
      {
        fieldName: this.translateService.translate('otmcslim.limittype') + '*', field: 'limitType', editable: true,
         width: 150, domain: 'LIMIT_TYPE', datatype: 'lov',
        cellEditable: this.canCellEdit, titles: this.limittypeTitles
      },
      {
        fieldName: this.translateService.translate('otmcslim.periodtype') + '*', field: 'periodType', editable: true,
         width: 150, domain: 'PERIOD_TYPE', datatype: 'lov',
        cellEditable: this.canCellEdit, titles: this.periodtypeTitles
      },
      {
        fieldName: this.translateService.translate('otmcslim.limitamount'), field: 'limitAmount', editable: true,
         width: 150, datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
        strictFP: true, whole: true
      },
    ];
    // TODO all initializations here
  }
  /**
   * This function displays the messages
   */
  valueChnange(event) {
    if (event) {
      if (this.caseloadId || this.limitType || this.periodType) {
        this.isRetrieveDis = false;
        this.isClearDis=false;
      }
    }

  }
  cellValueChangeData(event){
    if (event) {
      if (this.caseloadId || this.limitType || this.periodType) {
        this.isRetrieveDis = false;
        this.isClearDis=false;
      }
    }
  }
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  onRowClickcsldlim(event) {
    if (event) {
      this.csldlimModel = event;
    } else {
      this.csldlimModel = new CaseloadLimits();
    }
  }
  ok() {
    this.csldlimExecuteQuery();
  }
  no() {
  }
  canCellEdit = (data: any, index: number, field: string) => {
    if (this.csldlimModel.createDatetime) {
      return false;
    }
    return true;

  }

  cancel() {
    this.csldlimData = [];
    this.isRetrieveDis = false;
    this.iscaseloadId=true;
    this.isClearDis = true;
    this.caseloadId = null;
    this.limitType = null;
    this.periodType = null;
  }
  onOffenderChange(offender) {
  }
  csldlimExecuteQuery() {
    this.csldlimModel = new CaseloadLimits();
    if (this.caseloadId) {
      this.csldlimModel.caseloadId = this.caseloadId;
    }
    if (this.limitType) {
      this.csldlimModel.limitType = this.limitType;
    }
    if (this.periodType) {
      this.csldlimModel.periodType = this.periodType;
    }

    const csldlimResult = this.otmcslimFactory.csldLimExecuteQuery(this.csldlimModel);
    csldlimResult.subscribe(data => {
      if (data.length === 0) {
        this.csldlimData = [];
        this.isRetrieveDis = false;
        this.isClearDis = false;
        this.iscaseloadId=true;
        this.show(this.translateService.translate('common.querycaused'), 'warn');

      } else {
        this.csldlimData = data;
        this.tableIndex = 0;
        this.isRetrieveDis = true;
        this.isClearDis = false;
        this.iscaseloadId=false;

      }
    });
  }
  onGridInsert = () => {
    if (this.csldlimData.length > 0) {
      if (!this.csldlimData[this.csldlimData.length - 1].caseloadId) {
        this.show(this.translateService.translate('otmcslim.caseloadidmustbe'));
        return;
      }
      if (!this.csldlimData[this.csldlimData.length - 1].limitType) {
        this.show(this.translateService.translate('otmcslim.limittypemustbe'));
        return;
      }
      if (!this.csldlimData[this.csldlimData.length - 1].periodType) {
        this.show(this.translateService.translate('otmcslim.periodtypemustbe'));
        return;
      }
    }


    return { caseloadId: '', limitType: '', periodType: '' };

  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  otmcslimSavecsldlimForm(event) {
    // TODO declare commit bean and add insert list to that object.
    this.csldlimInsertList = event.added;
    this.csldlimUpdatetList = event.updated;
    this.csldlimDeleteList = event.removed;
    this.csldlimCommitModel.insertList = [];
    this.csldlimCommitModel.updateList = [];
    this.csldlimCommitModel.deleteList = [];
    if (this.csldlimInsertList.length > 0) {
      for (let i = 0; i < this.csldlimInsertList.length; i++) {
        if (!this.csldlimInsertList[i].caseloadId) {
          this.show(this.translateService.translate('otmcslim.caseloadidmustbe'));
          return;
        }
        if (!this.csldlimInsertList[i].limitType) {
           this.show(this.translateService.translate('otmcslim.limittypemustbe'));
          return;
        }
        if (!this.csldlimInsertList[i].periodType) {
          this.show(this.translateService.translate('otmcslim.periodtypemustbe'));
          return;
        }
        this.csldlimInsertList[i].modifyDate = DateFormat.getDate();
        this.csldlimInsertList[i].createDatetime = DateFormat.getDate();
        this.csldlimInsertList[i].listSeq = 99;
        this.csldlimInsertList[i].createUserId = this.sessionManager.getId();
        this.csldlimInsertList[i].modifyUserId = this.sessionManager.getId();
      }
      this.csldlimCommitModel.insertList = this.csldlimInsertList;
    }
    if (this.csldlimUpdatetList.length > 0) {

      for (let i = 0; i < this.csldlimUpdatetList.length; i++) {
        if (!this.csldlimUpdatetList[i].caseloadId) {
          this.show(this.translateService.translate('otmcslim.caseloadidmustbe'));
          return;

        }
        if (!this.csldlimUpdatetList[i].caseloadId) {
           this.show(this.translateService.translate('otmcslim.limittypemustbe'));
          return;

        }
        if (!this.csldlimUpdatetList[i].caseloadId) {
          this.show(this.translateService.translate('otmcslim.periodtypemustbe'));
          return;

        }
      }
      this.csldlimCommitModel.updateList = this.csldlimUpdatetList;
    }

    if (this.csldlimDeleteList.length > 0) {
      for (let i = 0; i < this.csldlimDeleteList.length; i++) {
      }
      this.csldlimCommitModel.deleteList = this.csldlimDeleteList;
    }
    const csldlimSaveData = this.otmcslimFactory.csldLimCommit(this.csldlimCommitModel);
    csldlimSaveData.subscribe(data => {
      if (String(data) === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.csldlimExecuteQuery();
      } else if (String(data).includes('CASELOAD_LIMITS_PK')) {
        this.show(this.translateService.translate('otmcslim.errorcombination'));
      }  else if (String(data).includes('?')) {
        this.show('common.addupdateremoverecordfailed', 'warn');
      }
    });

  }
}
