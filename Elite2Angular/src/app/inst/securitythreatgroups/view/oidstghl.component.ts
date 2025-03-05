import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidstghlService } from '../service/oidstghl.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StgLocations } from '@instSecurityThreatGroupsbeans/StgLocations';
import { StgLocationsCommitBean } from '@instSecurityThreatGroupsbeans/StgLocationsCommitBean';
import { SecurityThreatGroups } from '../../incidents-oic/beans/SecurityThreatGroups';
import { SecurityThreatGroupsCommitBean } from '../../incidents-oic/beans/SecurityThreatGroupsCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';

@Component({
  selector: 'app-oidstghl',
  templateUrl: './oidstghl.component.html'
})

export class OidstghlComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  @ViewChild('drGrid', {static: true}) drGrid: any;
  msgs: any[] = [];
  stgData: SecurityThreatGroups[] = [];
  stgModel: SecurityThreatGroups = new SecurityThreatGroups();
  stgCommitModel: SecurityThreatGroupsCommitBean = new SecurityThreatGroupsCommitBean();
  stgInsertList: SecurityThreatGroups[] = [];
  stgUpdatetList: SecurityThreatGroups[] = [];
  stgDeleteList: SecurityThreatGroups[] = [];
  stglocationsCommitModel: StgLocationsCommitBean = new StgLocationsCommitBean();
  stglocationsData: StgLocations[] = [];
  stglocationsModel: StgLocations = new StgLocations();
  stglocationsInsertList: StgLocations[] = [];
  stglocationsUpdatetList: StgLocations[] = [];
  stglocationsDeleteList: StgLocations[] = [];
  stgLocationsColumnDef: any[];
  tableIndex = -1;
  enableDelete: boolean;
  deleteFlag: boolean;
  titles = { code: this.trMsg('common.code'), description: this.trMsg('common.description') };
  saveDisabled: boolean;
  flagOne: boolean;
  clearDisabled: boolean;
  retriveDisabled: boolean;
  retrieveId: boolean;
  secondQuery: boolean;
  alertdisable: boolean;
  stgModelOne: SecurityThreatGroups = new SecurityThreatGroups();
  historyReadOnly: boolean;
  constructor(private oidstghlFactory: OidstghlService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager,
    public dialogService: DialogService) {
    this.stgLocationsColumnDef = [];
  }
  ngOnInit() {
    this.retrieveId = false;
    this.retriveDisabled = true;
    this.flagOne = false;
    this.saveDisabled = true;
    this.clearDisabled = true;
    this.alertdisable = true;
    this.historyReadOnly = true;
    this.stgLocationsColumnDef = [
      {
        fieldName: this.trMsg('common.city') + '*', field: 'cityCode', datatype: 'lov', editable: true, width: 150, domain: 'CITY',
        titles: this.titles
      },
      {
        fieldName: this.trMsg('system-profile.prov-state'),
        field: 'provState', editable: true, width: 150, datatype: 'lov', domain: 'PROV_STATE', titles: this.titles
      },
      {
        fieldName: this.trMsg('common.country'), field: 'country', editable: true, width: 150, datatype: 'lov', domain: 'COUNTRY',
        titles: this.titles
      },
      {
        fieldName: this.trMsg('common.comment'), field: 'commentText', editable: true, width: 150, datatype: 'text', maxlength: 240,
        uppercase: 'false', titles: this.titles
      },
    ];
    const stglocationsResult = this.oidstghlFactory.cgwhenNewFormInstance();
        stglocationsResult.subscribe(data => {
          if (data.length > 0) {
            data.forEach(element => {
              if (element.sealFlag === 'Y') {
                this.historyReadOnly = false;
              }
            });
          }
    });
    this.stgExecuteQuery();
    this.stgLocationsExecuteQuery();
  }     /**
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
  historyModelChange() {
    const historyText = this.stgModel.historyText === null ? '' : this.stgModel.historyText;
    const description = this.stgModel.description === null ? '' : this.stgModel.description;
    if (historyText !== description || !this.stglocationsModel.locationSeq) {
      this.flagOne = false;
      this.saveDisabled = false;
      this.clearDisabled = false;
    } else {
      this.saveDisabled = true;
    }
  }
  clear() {
    this.stgData = [];
    this.stglocationsData = [];
    this.stgModel = new SecurityThreatGroups();
    this.stgModelOne = new SecurityThreatGroups();
    this.stglocationsModel = new StgLocations();
    this.stgModel.historyText = null;
    this.clearDisabled = true;
    this.retriveDisabled = false;
    this.retrieveId = false;
    this.alertdisable = false;
  }
  onRowClickstglocations(event) {
    if (event) {
      this.stglocationsModel = event;
      if (!this.stglocationsModel.locationSeq) {
        this.enableDelete = false;
      } else {
        this.enableDelete = true;
      }
      if (this.stglocationsModel.stgId) {
        const stglocationsResult = this.oidstghlFactory.stgOnCheckDeleteMaster(this.stglocationsModel);
        stglocationsResult.subscribe(data => {
          if (data.length > 0) {
            this.deleteFlag = true;
          } else {
            this.deleteFlag = false;
          }
        });
      }
    }
  }

  oidstghlExecuteQry() {
    if (!this.stgModelOne.historyText) {
    this.retrieveId = false;
    } else {
      this.retrieveId = true;
    }
    this.stgExecuteQuery();
      
    
    this.retriveDisabled = true;
  }
  cancel() {
    this.dialog.close(null);
  }
  stgExecuteQuery() {
    if (this.retrieveId) {
      this.stgModel = new SecurityThreatGroups();
      this.stgModel.historyText = this.stgModelOne.historyText;
      if (!this.stgModelOne.historyText)  {
        this.stgModel.stgId = this.dialog.data.stgId;
      }
    } else {
      this.stgModel.stgId = this.dialog.data.stgId;
    }
    this.secondQuery = false;
    const stglocationsResult = this.oidstghlFactory.stgExecuteQuery(this.stgModel);
    stglocationsResult.subscribe(data => {
      if (data.length === 0) {
        this.stgData = [];
        this.stgModel.description = null; 
        // this.stglocationsData = [];
        //  this.show('common.querycaused');
        //  this.alertdisable = true;
         this.secondQuery = true;
         this.clearDisabled = false;
      } else {
        data.forEach(ele => {
          if (ele.historyText) {
            this.clearDisabled = false;
          }
        });
        this.stgData = data;
        this.stgModel = this.stgData[0];
        this.stgModel.description = this.stgModel.historyText;
        this.stgModelOne = this.stgData[0];
        this.alertdisable = true;
      }     
      // this.stgLocationsExecuteQuery();  
    });
    
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oidstghlSavestgForm() {
    if (!this.saveDisabled) {
    this.stgCommitModel.insertList = [];
    this.stgCommitModel.updateList = [];
    this.stgUpdatetList.push(this.stgModel);
            this.stgCommitModel.updateList = this.stgUpdatetList;
      const stgSaveData = this.oidstghlFactory.stgCommit(this.stgCommitModel);
      stgSaveData.subscribe(data => {
        if (data === 1) {
          if (!this.flagOne) {
          this.show('common.addupdateremoverecordsuccess', 'success');
          this.oidstghlExecuteQry();
          // this.stgLocationsExecuteQuery();
          }
          this.flagOne = false;
          this.saveDisabled = true;
          return;
        } else {
          this.show('common.addupdateremoverecordfailed');
          this.saveDisabled = true;
          this.oidstghlExecuteQry();
          // this.stgLocationsExecuteQuery();
        }
      });
    }
    }
    onGridClear = () => {
      // this.stgLocationsExecuteQuery();
      this.stgModel.historyText = this.stgModel.description;
      this.saveDisabled =true; 
      return true;
    }
    onSecGridDelete= () => {
      // this.stgLocationsExecuteQuery();
      this.saveDisabled =false; 
      return true;
    }
    validateData =(event) =>{
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex; 
        if((event.field === 'cityCode' && event.newValue !== event.oldValue  && event.data.cityCode) ||
        (event.field === 'provState' && event.newValue !== event.oldValue  && event.data.provState) ||
        (event.field === 'country'  && event.newValue !== event.oldValue && event.data.country) ||
        (event.field === 'commentText' && event.newValue !== event.oldValue  && event.data.commentText )) {
            this.saveDisabled = false;
            rowdata.validated =true;
            return rowdata;
        }
        rowdata.validated =true;
        return rowdata;
    }
        
        stgLocationsExecuteQuery() {
    // if (this.secondQuery) {
    //   this.stglocationsModel.stgId = null;
    // } else {
    this.stglocationsModel.stgId = this.dialog.data.stgId;
    // }
    const stglocationsResult = this.oidstghlFactory.stgLocationsExecuteQuery(this.stglocationsModel);
    stglocationsResult.subscribe(data => {
      if (data.length === 0) {
        this.show('common.querycaused');
        this.clearDisabled = false;
        this.stglocationsData = [];
      } else {
        this.stglocationsData = data;
        this.tableIndex = 0;  
      }
    });
  }

  Save() {
    if (!this.oidstghlValidations()) {
      return false;
    }
    const csldDEvent = { added: [], updated: [], removed: [] };
    if (this.drGrid) {
      const added = [];
      this.drGrid.addedMap.forEach((value, keys) => { added.push(value); });
      const removed = [];
      this.drGrid.removedMap.forEach((value, keys) => { removed.push(value); });
      const updated = [];
      this.drGrid.updatedMap.forEach((value, keys) => { updated.push(value); });
      csldDEvent.added = JSON.parse(JSON.stringify(added));
      csldDEvent.updated = JSON.parse(JSON.stringify(updated));
      csldDEvent.removed = JSON.parse(JSON.stringify(removed));
      if (csldDEvent.added.length > 0 || csldDEvent.updated.length > 0 || csldDEvent.removed.length > 0) {
        this.oidstghlSavestglocationsForm(csldDEvent);
      }
      this.oidstghlSavestgForm();
    }
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  oidstghlSavestglocationsForm(event) {
    // if (!this.oidstghlValidations()) {
    //   return false;
    // }
    this.stglocationsInsertList = event.added;
    this.stglocationsUpdatetList= event.updated;
    this.stglocationsDeleteList = event.removed;
    this.stglocationsCommitModel.insertList = [];
    this.stglocationsCommitModel.updateList = [];
    this.stglocationsCommitModel.deleteList = [];
    if (this.stglocationsInsertList.length > 0) {
      for (let i = 0; i < this.stglocationsInsertList.length; i++) {
        this.stglocationsInsertList[i].stgId = this.dialog.data.stgId;
        this.stglocationsInsertList[i].createUserId = this.sessionManager.getId();
        this.stglocationsInsertList[i].createDatetime = DateFormat.getDate();
        this.stglocationsCommitModel.insertList = this.stglocationsInsertList;
      }
    }
    if (this.stglocationsUpdatetList.length > 0) {
      for (let i = 0; i < this.stglocationsUpdatetList.length; i++) {
        this.stglocationsCommitModel.updateList = this.stglocationsUpdatetList;
      }
    }
    if (this.stglocationsDeleteList.length > 0) {
      for (let i = 0; i < this.stglocationsDeleteList.length; i++) {
        this.stglocationsCommitModel.deleteList = this.stglocationsDeleteList;
      }
    }
    const stglocationsSaveData = this.oidstghlFactory.stgLocationsCommit(this.stglocationsCommitModel);
    stglocationsSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
          this.flagOne = true;
        this.stgLocationsExecuteQuery();
        this.oidstghlExecuteQry();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        this.stgLocationsExecuteQuery();
        this.oidstghlExecuteQry();
        return;
      }
    });
  }
  oidstghlValidations() {
    const is = { valid: true };
    this.stglocationsData.forEach(data => {
      if (is.valid) {
        if (!data.cityCode) {
          this.show('common.cityvalidation');
          is.valid = false;
          return;
        }
      }
    });
    return is.valid;
  }
  onGridInsert = () => {
    this.saveDisabled = false;
    if (!this.oidstghlValidations()) {
      return;
    }
    return {};
  }
}
