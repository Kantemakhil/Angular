import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { AssessSectionNotifications } from '@inst/classification/assessmentmaintenance/beans/AssessSectionNotifications';
import { AssessSectionNotificationsCommitBean } from '@inst/classification/assessmentmaintenance/beans/AssessSectionNotificationsCommitBean';
import { OimslevlService } from '../service/oimslevl.service';
import { Assessments } from './../../beans/Assessments';

// import required bean declarations

@Component({
  selector: 'app-oimsenot',
  templateUrl: './oimsenot.component.html'
})

export class OimsenotComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  @ViewChild('grid') grid: any;
  @ViewChild('oimsenotForm') form: any;
  autoPoplate: boolean;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  assessmentsData: Assessments[] = [];
  assessmentsDataTemp: Assessments[] = [];

  assessmentsModel: Assessments = new Assessments();
  assessmentsSearchModel: Assessments = new Assessments();
  assessmentsIndex: number;
  assessmentsInsertList: Assessments[] = [];
  assessmentsUpdatetList: Assessments[] = [];
  assessmentsDeleteList: Assessments[] = [];
  assesssectionnotificationsData: AssessSectionNotifications[] = [];
  assesssectionnotificationsDataTemp: AssessSectionNotifications[] = [];

  assesssectionnotificationsModel: AssessSectionNotifications = new AssessSectionNotifications();
  assesssectionnotificationsIndex: number;
  assesssectionnotificationsInsertList: AssessSectionNotifications[] = [];
  assesssectionnotificationsUpdatetList: AssessSectionNotifications[] = [];
  assesssectionnotificationsDeleteList: AssessSectionNotifications[] = [];
  assesssectionnotificationsCommitModel: AssessSectionNotificationsCommitBean = new AssessSectionNotificationsCommitBean();
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  assessSectionNotificationsColumnDef: any[];
  assessmentsColumnDef: any[];
  assessmentsReadOnly: boolean;
  assessSectionNotificationsReadOnly: boolean;
  cgfkNextsectionRg: any[] = [];
  cgfkSectioncodeRg: any[] = [];
  cgfkScoretypeRg: any[] = [];
  cgfkNextsectionflagRg: any[] = [];
  index: any;
  type: string;
  message: string;
  assessSectionNotificationsColumnDefs: any[];
  assessmentsColumnDefs: any[];
  tableIndex: number;
  sectionLink: string;
  notifctnMaps: Map<string, string> = new Map<string, string>();
  nextSectionFlag: string;
  msgdisabled: boolean;
  globalId: string;
  deleData: boolean;
  assSecnId: number;
  flagLink: string;
  flagList: any[];
  disableLov = true;
  assmtId: string;
  value: string;
  savedisabled: boolean;
  clearDisable: boolean;
  valId: string;
  hideLov: boolean;
  codes: string;
  enableData: boolean;
  secObject: string;

  secTitles = { description: this.translateService.translate('common.description'),
  code: this.translateService.translate('oimsenot.code') };

  gotoTitles = { description: this.translateService.translate('common.description'),
  code: this.translateService.translate('oimsenot.nextFlag') };

  nextTitles = { description: this.translateService.translate('common.description'),
  code: this.translateService.translate('oimsenot.code') };
  clearDisabled: boolean;
  retriveDisabled: boolean;
  namesReadOnly: boolean;
  disLov: boolean;
  secLink: string;
  disabledFlag: boolean;
  enabledFlag: boolean;


  constructor(private oimslevlFactory: OimslevlService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.assessSectionNotificationsColumnDefs = [];
    this.assessmentsColumnDefs = [];
  }
  ngOnInit() {
    this.autoPoplate = true;
    this.disabledFlag = false;
    this.enabledFlag = false;
    this.namesReadOnly = false;
    this.retriveDisabled = false;
    this.disLov = true;
    this.savedisabled = true;
    this.clearDisabled = true;
    this.disableLov = true;
    this.msgdisabled = true;
    this.deleData = true;
   this.msgdisabled = true;
    this.flagLink = undefined;
    this.secLink = 'oimslevl/cgfkSectioncodeRecordGroupOimslevl?assessmentId=' + this.dialog.data.parentAssessmentId;
    const link = 'oimslevl/cgfkSectioncodeRecordGroupOimsenot?assessmentId=' + this.dialog.data.parentAssessmentId;
    this.sectionLink = undefined;
    const sectionLinks = 'oimslevl/cgfkScoreTypeRecordGroupOimsenot';
    this.assessmentsColumnDefs = [
      {
        fieldName: this.translateService.translate('oimsenot.lovSection') + '*', field: 'assessmentCode',
        editable: true, width: 150, datatype: 'lov', link: link, maxlength: 500
      }

    ];

    this.assessSectionNotificationsColumnDefs = [
      {
        fieldName: this.translateService.translate('oimsenot.lovDescription') + '*', field: 'scoreType', editable: true,
        width: 150,  datatype: 'lov', link: sectionLinks, maxlength: 100 , cellEditable: this.canAlertEdit
      },


      {
        fieldName: this.translateService.translate('oimslevl.min') + '*', field: 'minScore', datatype: 'number',
        maxlength: 5, editable: true, width: 150, cellEditable: this.canAlertEdit ,
        minValue: '1', maxValue: '9999', strictFP: true,
      },
      {
        fieldName: this.translateService.translate('oimslevl.max') + '*', field: 'maxScore', datatype: 'number',
        maxlength: 5, editable: true, width: 150, cellEditable: this.canAlertEdit,
        minValue: '1', maxValue: '9999', strictFP: true,
      },
      {
        fieldName: this.translateService.translate('oimsenot.lovGoto') + '*', field: 'nextSectionFlag', editable: true,
        width: 150, maxlength: 3, datatype: 'lov', titles: this.gotoTitles, cellEditable: this.canAlertEdit ,
        link: 'oimslevl/cgfkNextSectionFlagRecordGroupOimsenot'
      },

      {
        fieldName: this.translateService.translate('oimsenot.lovNext'), field: 'nextAssCode', editable: true,
        width: 150, maxlength: 300, datatype: 'lov', titles: this.nextTitles, cellEditable: this.canAlertEdit ,
        link: 'oimslevl/cgfkNextSectionRecordGroupOimsenot?parentField1=', parentField: 'parentField1'

      },

      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', datatype: 'checkbox',
        maxlength: 1, editable: true, width: 150 , cellEditable: this.canAlertEdit
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
        datatype: 'date', width: 150, maxlength: 11
      },
       { fieldName: '', field: 'parentField1', hide: true },
      {
        fieldName: this.translateService.translate('oimsenot.msg'), field: 'messageText', editable: true,
        width: 150, hide: true , cellEditable: this.canAlertEdit
      },
    ];
    this.sectionslovs();

    this.secObject = undefined;


    this.value = this.dialog.data.parentAssessmentId + '-' + this.dialog.data.assessmentId;
    const serviceObj = this.oimslevlFactory.
      cgfkNextSectionRecordGroupOimsenot(this.value);
    serviceObj.subscribe(data => {
      if (data.length > 0) {
        this.disableLov = true;
      } else {
        this.disableLov = false;
      }
    });

    this.assessmentsExecuteQuery();

  }
  sectionslovs() {

    const serviceObj = this.oimslevlFactory.
      cgfkSectioncodeRecordGroupOimsenot(this.dialog.data.parentAssessmentId);
    serviceObj.subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.notifctnMaps.set(data[i].code, data[i].assessmentId);
      }
      this.assessmentsColumnDefs = data;


    });

  }




  OnGridClear = () => {
    this.assessSectionNotificationsExecuteQuery();
    return true;
  }

  isSecInsertable() {

 if ( this.assessmentsModel.assessmentCode ) {

            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }

  }



  isInsertable() {
    if (this.assesssectionnotificationsModel.messageText) {
      this.savedisabled = false;
    } else {
      this.savedisabled = false;
    }
  }

  cancel() {
    this.secObject = undefined;
    this.clearDisabled = true;
  this.retriveDisabled = false;
  this.namesReadOnly = false;
    this.enableData = false;
    this.savedisabled = true;
     this.assessmentsData = [];
     this.assessmentsModel = new Assessments();
     this.assesssectionnotificationsData = [];
     this.msgdisabled = true;
   this.assesssectionnotificationsModel = new AssessSectionNotifications();
   this.disabledFlag = false;
   this.enabledFlag = false;
  }

  canAlertEdit = (data: any, index: number, field: string): boolean => {

     if (field === 'nextAssCode' && !this.disableLov) {
      return false;
     }
    if ((!data.activeFlag && !this.disabledFlag) || (data.activeFlag && this.enabledFlag)) {
      return false;
    }


    return true;

  }

  onGridInsertMessages = () => {

    if (!this.oimsenotValidations()) {
      return false;
    }

    this.hideLov = true;
    this.deleData = false;
    this.value = this.assessmentsModel.parentAssessmentId + '-' + this.assessmentsModel.assessmentId;
    const serviceObj = this.oimslevlFactory.
      cgfkNextSectionRecordGroupOimsenot(this.value);
    serviceObj.subscribe(data => {
      if (data.length > 0) {

        this.disableLov = true;
      } else {

        this.disableLov = false;
      }
    });

    if (this.assesssectionnotificationsData.length > 0) {
     this.assesssectionnotificationsData.forEach(data => {
       if (!data.minScore) {
       if (data.nextSectionFlag === 'Y' || data.nextSectionFlag === 'N') {
        data.nextSectionFlag = 'Y';
       }
       }

     });

    }

    return {
      nextSectionFlag: 'Y',
      activeFlag: true,
     parentField1: this.assessmentsModel.parentAssessmentId + '-' + this.assessmentsModel.assessmentId,

    };

  }




  validateSectionRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'activeFlag') {

      if (event.data.activeFlag) {
        this.disabledFlag = false;
        this.enabledFlag = true;
        this.grid.setColumnData('expiryDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.enabledFlag = false;
        this.disabledFlag = true;
        this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }


    if (event.field === 'maxScore' ||   event.field === 'minScore'  ) {
      if (event.data.minScore && event.data.maxScore) {
        if (Number(event.data.minScore) > Number(event.data.maxScore)) {
          this.type = 'warn';
          this.show('oimsenot.maxs');
          rowdata.validated = true;
          return rowdata;
        }
      }
    }
    rowdata.validated = true;
    return rowdata;


  }



  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }


  onRowClickassessments(event) {
    if (event) {
      this.assessmentsModel = event;
      this.assSecnId = this.assessmentsModel.assessmentId;
      this.assesssectionnotificationsModel = new AssessSectionNotifications();

      if (this.assessmentsModel.assessmentCode) {
        const assesId = this.notifctnMaps.get(this.assessmentsModel.assessmentCode);
        this.assesssectionnotificationsModel.assessmentId = Number(assesId);
        this.assessSectionNotificationsExecuteQuery();
      }

    }


  }


  onRowClickassesssectionnotifications(event) {
    if (event) {

       this.assesssectionnotificationsModel = event;

      if (this.assesssectionnotificationsModel.activeFlag === 'Y' || event.activeFlag === true) {
       this.msgdisabled = false;


      } else {
        this.msgdisabled = true;


      }
      if (this.assesssectionnotificationsModel.assessmentId) {
        this.deleData = true;
      }
      if (this.assesssectionnotificationsModel.nextAssessmentId) {
        this.savedisabled = true;

      } else {
        this.savedisabled = true;

      }
      this.assesssectionnotificationsModel = new AssessSectionNotifications();
      this.assesssectionnotificationsModel = event;
    }
  }

  onButExitclick() {
    this.dialog.close(null);
  }




  assessmentsExecuteQuery() {
    this.assessmentsModel  = new Assessments();
    if (this.secObject ) {
      this.assessmentsModel.assessmentCode = this.secObject;
    }
    this.assessmentsModel.assessmentId = this.dialog.data.parentAssessmentId;
    const serviceObj = this.oimslevlFactory.
      assessmentsExecuteQueryOimsenot(this.assessmentsModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.assessmentsData = [];
      } else {

        data.forEach(element => {
          element.activeFlag = element.activeFlag === 'Y' ? true : false;

        });
      }
      this.enableData = true;
      this.namesReadOnly = true;
      this.retriveDisabled = true;
      this.clearDisabled = false;
      this.assessmentsData = data;
      this.assessmentsModel = this.assessmentsData[0];
      this.tableIndex = 0;
    });

  }


  oimsenotValidations() {

    const is = { valid: true };
    if (this.assesssectionnotificationsData.length > 0) {
      this.assesssectionnotificationsData.forEach(data => {

        if (!data.scoreType) {
          this.type = 'warn';
          this.show('oimsenot.score');
          is.valid = false;
          return;
        }

        if (data.minScore === undefined || data.minScore === null ) {
          this.type = 'warn';
          this.show('oimslevl.minscore');
          is.valid = false;
          return;
        }
        if (data.maxScore === undefined || data.maxScore === null ) {
          this.type = 'warn';
          this.show('oimslevl.maxscore');
          is.valid = false;
          return;
        }
        if (data.nextSectionFlag === undefined || data.nextSectionFlag === null ) {
          this.type = 'warn';
          this.show('oimsenot.goTo');
          is.valid = false;
          return;
        }
        if (data.minScore && data.maxScore) {
          if (Number(data.minScore) > Number(data.maxScore)) {
            this.type = 'warn';
            this.show('oimslevl.maxmin');
            is.valid = false;
            return;
          }
        }

        if ((data.nextSectionFlag === 'Y' && data.nextAssCode === undefined) ||
         (data.nextSectionFlag === 'Y' && data.nextAssCode === null)) {
                this.type = 'warn';
                   this.show('oimsenot.nextValid');
                   is.valid = false;
                  return;
            }


      });

    }
    return is.valid;
  }





  assessSectionNotificationsExecuteQuery() {

    this.assessmentsData.forEach(item => {

      this.assesssectionnotificationsData.forEach(element => {
        if (element.nextAssessmentId != null) {

          this.assesssectionnotificationsModel.assessmentId = item.assessmentId;
         }

      });

    });


    this.assesssectionnotificationsModel.assessmentId = this.assessmentsModel.assessmentId;
    const assesssectionnotificationsResult = this.oimslevlFactory.
      assessSectionNotificationsExecuteQueryOimsenot(this.assesssectionnotificationsModel);
    assesssectionnotificationsResult.subscribe(data => {
      this.disabledFlag = false;
      this.enabledFlag = false;
      if (data.length === 0) {
        this.assesssectionnotificationsData = [];
        this.msgdisabled = true;

      } else {
        data.forEach(element =>  {

          element.parentField1  = this.assessmentsModel.parentAssessmentId + '-' +
          this.assessmentsModel.assessmentId;

         element.activeFlag = element.activeFlag === 'Y' ? true : false;

        });

        this.assesssectionnotificationsData = data;

      }
    });

  }


  onButSave() {

    this.assesssectionnotificationsUpdatetList = [];

    this.assesssectionnotificationsCommitModel.insertList = [];
    this.assesssectionnotificationsCommitModel.updateList = [];
    this.assesssectionnotificationsUpdatetList.push(this.assesssectionnotificationsModel);
    for (let i = 0; i < this.assesssectionnotificationsUpdatetList.length; i++) {
    /*   this.assesssectionnotificationsUpdatetList[i].activeFlag = this.assesssectionnotificationsUpdatetList[i].activeFlag
        ? 'Y' : 'N'; */
      //  this.assesssectionnotificationsUpdatetList[i].nextSectionFlag = this.assesssectionnotificationsUpdatetList[i].nextSectionFlag
      //   ? 'Y' : 'N';
    }
    this.assesssectionnotificationsCommitModel.updateList = this.assesssectionnotificationsUpdatetList;
    const assesssectionnotificationsSaveData = this.oimslevlFactory.
      assessSectionNotificationsCommitOimsenot(this.assesssectionnotificationsCommitModel);
    if (!this.assesssectionnotificationsData[this.assesssectionnotificationsData.length - 1].nextAssessmentId  &&
       this.assesssectionnotificationsData[this.assesssectionnotificationsData.length - 1].nextSectionFlag === 'Y') {
      this.type = 'warn';
      this.show('oimsenot.saveMesg');
      this.savedisabled = true;
      return;
    }
    if(this.assesssectionnotificationsModel.assessmentId && this.grid.updatedMap.size > 0){
      this.type = 'warn';
      this.show('oimsenot.saveMesg');
      this.savedisabled = true;
      return;

    }

    if (!this.savedisabled) {
      assesssectionnotificationsSaveData.subscribe(data => {
        if (data === 1) {
          this.savedisabled = true;
          this.show('common.addupdateremoverecordsuccess', 'success');
          this.assessSectionNotificationsExecuteQuery();
          return;
        } else {
          this.show('common.addupdateremoverecordfailed', 'warn');
          this.assessSectionNotificationsExecuteQuery();
          return;
        }
      });
    }


  }


  onGridDelete = () => {

    this.assesssectionnotificationsModel = new AssessSectionNotifications();

    return true;
  }


  savealertForm(event) {
    if (!this.oimsenotValidations()) {
      return;
    }



    this.assesssectionnotificationsInsertList = event.added;
    this.assesssectionnotificationsUpdatetList = event.updated;
    this.assesssectionnotificationsDeleteList = event.removed;
    this.assesssectionnotificationsCommitModel.insertList = [];
    this.assesssectionnotificationsCommitModel.updateList = [];
    this.assesssectionnotificationsCommitModel.deleteList = [];
    if (this.assesssectionnotificationsInsertList.length > 0 || this.assesssectionnotificationsUpdatetList.length > 0
      || this.assesssectionnotificationsDeleteList.length > 0) {
      for (let i = 0; i < this.assesssectionnotificationsInsertList.length; i++) {
        this.assesssectionnotificationsInsertList[i].assessmentId = this.assSecnId;
        this.assesssectionnotificationsInsertList[i].activeFlag = this.assesssectionnotificationsInsertList[i].activeFlag
          ? 'Y' : 'N';
          // this.assesssectionnotificationsUpdatetList[i].nextSectionFlag = this.assesssectionnotificationsUpdatetList[i].nextSectionFlag
          // ? 'Y' : 'N';

        this.assesssectionnotificationsInsertList[i].messageText = this.assesssectionnotificationsModel.messageText;

        this.assesssectionnotificationsCommitModel.insertList = this.assesssectionnotificationsInsertList;

      }
      for (let i = 0; i < this.assesssectionnotificationsUpdatetList.length; i++) {
        this.assesssectionnotificationsUpdatetList[i].activeFlag = this.assesssectionnotificationsUpdatetList[i].activeFlag
          ? 'Y' : 'N';
          // this.assesssectionnotificationsUpdatetList[i].nextSectionFlag = this.assesssectionnotificationsUpdatetList[i].nextSectionFlag
          // ? 'Y' : 'N';

        this.assesssectionnotificationsUpdatetList[i].messageText = this.assesssectionnotificationsModel.messageText;
        this.assesssectionnotificationsCommitModel.updateList = this.assesssectionnotificationsUpdatetList;

      }




      for (let i = 0; i < this.assesssectionnotificationsDeleteList.length; i++) {
        this.assesssectionnotificationsDeleteList[i].activeFlag = this.assesssectionnotificationsDeleteList[i].activeFlag
          ? 'Y' : 'N';
        this.assesssectionnotificationsCommitModel.deleteList = this.assesssectionnotificationsDeleteList;
      }

      for (let i = 0; i < this.assessmentsData.length; i++) {
        for (let j = 0; j < this.assesssectionnotificationsCommitModel.insertList.length; j++) {
          if (this.assessmentsData[i].assessmentCode === this.assesssectionnotificationsCommitModel.insertList[j].nextAssCode) {

            this.assesssectionnotificationsCommitModel.insertList[j].nextAssessmentId = this.assessmentsData[i].assessmentId;

          }


        }

      }
      for (let i = 0; i < this.assessmentsData.length; i++) {
        for (let j = 0; j < this.assesssectionnotificationsCommitModel.updateList.length; j++) {
          if (this.assessmentsData[i].assessmentCode === this.assesssectionnotificationsCommitModel.updateList[j].nextAssCode) {

            this.assesssectionnotificationsCommitModel.updateList[j].nextAssessmentId = this.assessmentsData[i].assessmentId;

          }


        }

      }





      const assesssectionnotificationsSaveData = this.oimslevlFactory.
        assessSectionNotificationsCommitOimsenot(this.assesssectionnotificationsCommitModel);
      assesssectionnotificationsSaveData.subscribe(data => {
        if (data === 1) {
          this.savedisabled = true;
          this.show('common.addupdateremoverecordsuccess', 'success');
          this.assessSectionNotificationsExecuteQuery();
          return;
        } else {
          this.savedisabled = true;
          this.show('common.addupdateremoverecordfailed', 'warn');
          this.assessSectionNotificationsExecuteQuery();
          return;
        }
      });

    }
  }
}
