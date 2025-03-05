import { StgCaseNotesCommitBean } from '@instSecurityThreatGroupsbeans/StgCaseNotesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidstgcnService } from '../service/oidstgcn.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StgCaseNotes } from '@instSecurityThreatGroupsbeans/StgCaseNotes';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';



@Component({
  selector: 'app-oidstgcn',
  templateUrl: './oidstgcn.component.html'
})

export class OidstgcnComponent implements OnInit {
  selectedRowIndex = -1;
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  @ViewChild('grid') grid: any;
  msgs: any[] = [];
  stgcasenotesData: StgCaseNotes[] = [];
  stgcasenotesModel: StgCaseNotes = new StgCaseNotes();
  stgcasenotesInsertList: StgCaseNotes[] = [];
  stgcasenotesUpdatetList: StgCaseNotes[] = [];
  stgcasenotesDeleteList: StgCaseNotes[] = [];
  stgCaseNotesColumnDef: any[];
  stgcasenotesCommitModel: StgCaseNotesCommitBean = new StgCaseNotesCommitBean;
  tableIndex = -1;
  parentCode: any[] = [];
  //enableDelete: boolean;
  constructor(private oidstgcnFactory: OidstgcnService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager,
    public dialogService: DialogService) {
    this.stgCaseNotesColumnDef = [];
    this.stgcasenotesInsertList = [];
    this.stgcasenotesUpdatetList = [];
    this.stgcasenotesDeleteList = [];
  }

  ngOnInit() {
    this.getParentCodes();
    this.stgCaseNotesColumnDef = [

      {
        fieldName: this.trMsg('oidstgcn.notedate'), field: 'noteDate', editable: true, width: 150, datatype: 'date',
        cellEditable: this.canGrievanceDateEdit
      },
      {
        fieldName: this.trMsg('oidstgcn.notetime'), field: 'noteTime', editable: true, width: 120, datatype: 'time',
        cellEditable: this.canGrievanceDateEdit
      },
      {
        fieldName: this.trMsg('common.type1'), field: 'noteType', editable: true, domain: 'STG_NOTE_TYP', width: 150, datatype: 'lov',
        cellEditable: this.canGrievanceDateEdit
      },
      {
        fieldName: this.trMsg('oidstgcn.subtype'), field: 'noteSubtype', editable: true, width: 150, domain: 'STG_NOTE_RSN',
        datatype: 'lov', parentField: 'noteType', cellEditable: this.canGrievanceDateEdit
      },
      { fieldName: this.trMsg('oidstgcn.createdby'), field: 'createUserId', editable: false, width: 150 },
      {
        fieldName: '', field: 'butAppend', datatype: 'launchbutton', editable: false, width: 150,
        data: 'row', updateField: 'row', modal: true, isDisable: this.isAppendDisable, onLaunchClick: this.openGo, dialogWidth: '80'
      },
    ];
    this.stgcasenotesExecuteQuery();
  }
  getParentCodes() {
    this.oidstgcnFactory.getParentCodes().subscribe(data => this.parentCode = data && Array.isArray(data) ? data : []);
  }
  canGrievanceDateEdit = (data: any, index: number, field: string): boolean => {
    if (data.noteSeq) {
      return false;
    } 
    // else if (field === 'noteSubtype') {
    //   if (!this.parentCode.includes(data.noteType)) {
    //     this.show('common.listofvalues');
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
     else {
      return true;
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
  get textReadonly(): boolean {
    if (this.selectedRowIndex !== -1 && this.stgcasenotesData[this.selectedRowIndex]) {
      const selectedData = this.stgcasenotesData[this.selectedRowIndex];
      if (!selectedData.createDatetime && selectedData.noteDate && selectedData.noteTime
        && selectedData.noteType && selectedData.noteSubtype) {
        return false;
      }
    }
    return true;  
  }
  /**
   * This function navigate to another screen
   */
  openGo = (event) => {
    if (this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0 || this.grid.removedMap.size > 0) {
      this.show('oidstgcn.committherecordfirst', 'warn');
      return;
    }
    const index = this.stgcasenotesData.indexOf(event);
    this.dialogService.openLinkDialog('/OIDAPPND', event, 80).subscribe(result => {
      this.stgcasenotesExecuteQuery(index);
    });
    return {
      createUserId: this.sessionManager.getId()
    };
  }
  /**
* This function displays the Go text
*/
  onGridInsert = () => {
    if (!this.oidstgcnValidations()) {
      return;
    }
    return {
      butAppend: 'Append', noteDate: DateFormat.getDate(), createUserId: this.sessionManager.getId(),
      noteTime: DateFormat.getDate()
    };
  }
  onGridDelete = () => {
    if (this.stgcasenotesData.length <= 1) {
      this.show('common.youcannotdeletethisrecord', 'warn');
      return false;
    } else {
      return true;
    }
  }
  /**
* This function displays the onRowClickstgcasenotes
*
*/
  onRowClickstgcasenotes(event) {
    if (event) {
      this.stgcasenotesModel = event;
      this.selectedRowIndex = this.stgcasenotesData.indexOf(event);
      if (this.stgcasenotesModel.noteSeq) {
      } else {
      }
      if (this.dialog.data.stgId) {
        this.stgcasenotesModel.stgId = this.dialog.data.stgId;
      }
      if (this.stgcasenotesModel.createDatetime) {
       // this.enableDelete = true;
      } else {
       // this.enableDelete = false;
      }
    } else {
      this.selectedRowIndex = -1;
    }
  }
  cancel() {
    this.dialog.close(null);
  }
  isAppendDisable = (data) => {
    if (data.createDatetime) {
      return false;
    } else {
      return true;
    }
  }
  stgcasenotesExecuteQuery(index?) {
    this.stgcasenotesModel.stgId = this.dialog.data.stgId;
    const stgcasenotesResult = this.oidstgcnFactory.stgCaseNotesExecuteQuery(this.stgcasenotesModel);
    stgcasenotesResult.subscribe(data => {
      if (data.length === 0) {
        this.stgcasenotesData = [];
      } else {
        data.forEach(element => {
          if (element.noteTime) {
            const date = DateFormat.getDate(element.noteTime);
            element.noteTime = DateFormat.getDate(date);
          }
          element['butAppend'] = 'Append';
          element.moduleName = 'OIDSTGCN';
        });
        this.stgcasenotesData = data;
        this.tableIndex = index && index > -1 ? index : 0;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oidstgcnValidations() {
    const is = { valid: true };
    this.stgcasenotesData.forEach(data => {
      if (is.valid) {
        if (!data.noteDate) {
          this.show('oidstgcn.notedatemustbeentered');
          is.valid = false;
          return;
        }
        if (!data.noteTime) {
          this.show('oidstgcn.notetimeemustbeentered');
          is.valid = false;
          return;
        }
        if (!data.noteType) {
          this.show('oidstgcn.notetypemustbeentered');
          is.valid = false;
          return;
        }
        if (!data.noteSubtype) {
          this.show('oidstgcn.notesubtypemustbeentered');
          is.valid = false;
          return;
        }
      }
    });
    return is.valid;
  }
  oidstgcnSavestgcasenotesForm(event) {
    if (!this.oidstgcnValidations()) {
      return;
    }
    this.stgcasenotesInsertList = event.added;
    this.stgcasenotesUpdatetList = event.updated;
    this.stgcasenotesDeleteList = event.removed;
    this.stgcasenotesCommitModel.insertList = [];
    this.stgcasenotesCommitModel.updateList = [];
    this.stgcasenotesCommitModel.deleteList = [];

    if (this.stgcasenotesInsertList.length > 0) {
      for (let i = 0; i < this.stgcasenotesInsertList.length; i++) {
        this.stgcasenotesInsertList[i].stgId = this.dialog.data.stgId;
        this.stgcasenotesInsertList[i].noteSeq = this.stgcasenotesModel.noteSeq;
        this.stgcasenotesInsertList[i].noteType = this.stgcasenotesInsertList[i].noteType;
        this.stgcasenotesInsertList[i].noteSubtype = this.stgcasenotesInsertList[i].noteSubtype;
        this.stgcasenotesInsertList[i].createUserId = this.sessionManager.getId();
        this.stgcasenotesInsertList[i].createDatetime = DateFormat.getDate();
        this.stgcasenotesCommitModel.insertList = this.stgcasenotesInsertList;
      }
    }
    if (this.stgcasenotesDeleteList.length > 0) {
      for (let i = 0; i < this.stgcasenotesDeleteList.length; i++) {
        this.stgcasenotesCommitModel.deleteList = this.stgcasenotesDeleteList;
      }
    }
    const stgcasenotesSaveData = this.oidstgcnFactory.stgCaseNotesCommit(this.stgcasenotesCommitModel);
    stgcasenotesSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.stgcasenotesExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        this.stgcasenotesExecuteQuery();
        return;
      }
    });
  }

  get enableDelete(){
    if(this.stgcasenotesModel.createDatetime && this.stgcasenotesData && this.stgcasenotesData.length > 1){
      return true;
    }
    return false;
  }

  validateRowDataStgcasenotes = (event) => {
    const rowdata = new ValidateRowReturn();


    if (event.field === 'noteType') {
      this.grid.setColumnData('noteSubtype', event.rowIndex, undefined);
      rowdata.validated = true;
      return rowdata;
    }
    rowdata.validated = true;
    return rowdata;
  }
}
