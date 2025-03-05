import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmspracService } from '../service/ocmsprac.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { CourseActivitiesCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseActivitiesCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
  selector: 'app-ocmsprac',
  templateUrl: './ocmsprac.component.html'
})

export class OcmspracComponent implements OnInit {
  @ViewChild('grid') grid: any;
  msgs: any[] = [];
  courseactivitiesData: CourseActivities[] = [];
  courseactivitiesGridData: CourseActivities[] = [];
  courseactivitiesDataTemp: CourseActivities[] = [];
  courseactivitiesModel: CourseActivities = new CourseActivities();
  courseactivitiesBean: CourseActivities = new CourseActivities();
  courseactivitiesIndex = -1;
  courseactivitiesInsertList: CourseActivities[] = [];
  courseactivitiesUpdateList: CourseActivities[] = [];
  courseactivitiesDeleteList: CourseActivities[] = [];
  display: boolean;
  courseActivitiesColumnDef: any[];
  ctrlReadOnly = false;
  courseActivitiesReadOnly = false;
  ctrlButReadOnly = false;
  courseactivitiesCommitModel: CourseActivitiesCommitBean = new CourseActivitiesCommitBean();
  agyLocId: string;
  commentText: string;
  duplicateFlag:boolean;
  currentRowIndex:number;
  currentIndexFlag:boolean=false;
  serviceTitles = {
    description: this.translateService.translate('common.description'),
    programCode: this.translateService.translate('common.code')
  };
  checkFlag = true;
  constructor(private ocmspracFactory: OcmspracService, public translateService: TranslateService,
    public sessionManager: UserSessionManager, private dialogService: DialogService) {
    this.courseActivitiesColumnDef = [];
  }
  ngOnInit() {
    this.checkFlag = true;
    this.courseActivitiesColumnDef = [
      {
        fieldName: this.translateService.translate('common.service') + this.translateService.translate('common.mandatory'), field: 'programIdVal', editable: true, width: 150,
        link: 'ocmsprac/rgPrisonActivityRecordGroup', datatype: 'lov', cellEditable: this.canCellEdit, titles: this.serviceTitles,source:'OCMSERVI'
      },
      {
        fieldName: this.translateService.translate('ocmsprac.activitycode') + this.translateService.translate('common.mandatory'), field: 'code', editable: true, width: 150, datatype: 'text',
        cellEditable: this.canCellEdit, uppercase: 'true', maxlength: 12
      },
      {
        fieldName: this.translateService.translate('ocmsprac.activitydescription') + this.translateService.translate('common.mandatory')
        , field: 'description', editable: true, width: 150, datatype: 'text', maxlength: 40, uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('common.internallocation') + this.translateService.translate('common.mandatory'), field: 'internalLocationIdVal', editable: true, width: 150,
        datatype: 'lov', link: 'ocmsprac/rgInternalLocationRecordGroup?agyLocId=', parentField: 'agyLocId',source:'OIMULOCA',
        titles: {
          description: this.translateService.translate('common.description'),
          locCode: this.translateService.translate('common.code')
        }
      },
      { fieldName: this.translateService.translate('common.capacity'), field: 'capacity', editable: true, width: 150, datatype: 'number',
       maxValue: 999, whole: true },
      {
        fieldName: this.translateService.translate('common.startdatemandatory'), field: 'scheduleStartDate', editable: true, width: 150,
        datatype: 'date'
      },
      {
        fieldName: this.translateService.translate('common.enddate'), field: 'scheduleEndDate', editable: true, width: 150,
        datatype: 'date'
      },
      { fieldName: '', field: 'commentText', hide: true },
      { fieldName: '', field: 'postUpdate', hide: true },
      { fieldName: '', field: 'test', hide: true },
    ];
  }
  canCellEdit = (data: any, index: number, field: string): boolean => {
    if (data.crsActyId && (field === 'programIdVal' || field === 'code')) {
      return false;
    }
    return true;
  }
  get clrFlag() {
    if (!this.agyLocId || this.agyLocId === '' || this.courseactivitiesData.length === 0) {
      return true;
    }
    return false;
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
  onCommentChange() {
    if (this.courseactivitiesBean.commentText) {
      const index = this.courseactivitiesData.indexOf(this.courseactivitiesBean);
      this.courseactivitiesData[index].commentText = this.courseactivitiesBean.commentText;
      this.grid.setColumnData('commentText', index, this.courseactivitiesBean.commentText);
      this.grid.setColumnData('test', index, this.courseactivitiesBean.commentText);
    } else {
      const index = this.courseactivitiesData.indexOf(this.courseactivitiesBean);
      this.courseactivitiesData[index].commentText = this.courseactivitiesBean.commentText;
      this.grid.setColumnData('commentText', index, undefined);
      this.grid.setColumnData('test', index, undefined);
    }
  }

  onRowClickcourseactivities(event) {
    if (event) {
      this.courseactivitiesBean = event;
      this.courseactivitiesBean.pQueryOnly = 'Y';
    }
    this.currentRowIndex=0;
    for(let i=0;i<this.courseactivitiesData.length;i++){
      this.currentRowIndex++;
      if(this.courseactivitiesData[i].crsActyId===event.crsActyId){
        break;
      }
    }
  }
  get disableLnchBtn() {
    if (this.courseactivitiesBean.agyLocId && this.agyLocId && this.agyLocId !== '') {
      return false;
    }
    return true;
  }
  get gridDelBtn() {
    if (!this.agyLocId || this.agyLocId === '' || !this.courseactivitiesBean.crsActyId) {
      return false;
    }
    return true;
  }
  get gridInsBtn() {
    if (!this.agyLocId || this.agyLocId === '') {
      return false;
    }
    return true;
  }
  onButTargetOffendersclick = () => {
    this.dialogService.openLinkDialog('/OCMCTOFF', this.courseactivitiesBean, 80).subscribe(result => {
    });
  }
  onButClear() {
    this.agyLocId = undefined;
    this.courseactivitiesData = [];
    this.courseactivitiesBean = new CourseActivities();
    this.courseactivitiesModel = new CourseActivities();
    this.checkFlag = true;
  }
  agyLocChangeEvent(event) {
    if (event) {
      this.agyLocId = event.code;
      if (this.agyLocId && this.agyLocId !== '') {
        this.courseactivitiesExecuteQuery();
      }
    }
  }
  onAgyLocChange() {
    if (!this.agyLocId) {
      this.agyLocId = this.agyLocId === '' ? undefined : '';
    }
  }
  courseactivitiesExecuteQuery() {
    this.courseactivitiesModel = new CourseActivities();
    this.courseactivitiesModel.agyLocId = this.agyLocId;
    this.courseactivitiesModel.caseloadType = this.sessionManager.currentCaseLoadType;
    const courseactivitiesResult = this.ocmspracFactory.
      courseActivitiesExecuteQuery(this.courseactivitiesModel);
    courseactivitiesResult.subscribe(courseactivitiesResultList => {
      if (courseactivitiesResultList.length === 0) {
        this.courseactivitiesData = [];
        this.courseactivitiesIndex = -1;
        this.courseactivitiesBean = new CourseActivities();
        this.show(this.translateService.translate('common.querycaused'));
      } else {
        courseactivitiesResultList.forEach(element => {
          element.agyLocId = this.agyLocId;
          element.programIdVal = String(element.programId);
          element.internalLocationIdVal = String(element.internalLocationId);
        });
        this.courseactivitiesData = courseactivitiesResultList;
        this.courseactivitiesModel = this.courseactivitiesData[0];
        this.courseactivitiesIndex = (this.currentIndexFlag)?this.currentRowIndex-1:0;
        this.currentIndexFlag=false;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocmspracSavecourseactivitiesForm(event) {
    if (!this.agyLocId) {
      this.show('ocmsprac.youmustchooseanestablishment', 'warn');
    }
    //Checking for Duplicate code  
    this.duplicateFlag = true;
    this.courseactivitiesData.forEach((element, index) => {
      this.courseactivitiesData.forEach((element2, index2) => {
        if (element.code.trim() === element2.code.trim() && index !== index2) {
          this.show(this.translateService.translate('ocmsprac.duplicateCode'), 'warn');
          this.duplicateFlag = false;
          return;
        }
      });
    });

    if (this.duplicateFlag) {
      this.courseactivitiesInsertList = [];
      this.courseactivitiesUpdateList = [];
      this.courseactivitiesDeleteList = [];
      this.courseactivitiesInsertList = event.added;
      this.courseactivitiesUpdateList = event.updated;
      this.courseactivitiesDeleteList = event.removed;
      this.courseactivitiesCommitModel.insertList = [];
      this.courseactivitiesCommitModel.updateList = [];
      this.courseactivitiesCommitModel.deleteList = [];
      this.checkFlag = true;
      if (this.courseactivitiesInsertList.length > 0 || this.courseactivitiesUpdateList.length > 0) {
        for (let i = 0; i < this.courseactivitiesInsertList.length; i++) {
          if (this.validationEvent(this.courseactivitiesInsertList[i])) {
            return;
          }
          this.courseactivitiesInsertList[i].agyLocId = this.agyLocId;
          this.courseactivitiesInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
          this.courseactivitiesInsertList[i].providerPartyCode = this.agyLocId;
          this.courseactivitiesInsertList[i].caseloadType = this.sessionManager.currentCaseLoadType;
          this.courseactivitiesInsertList[i].providerPartyClass = 'AGY';
          this.courseactivitiesInsertList[i].holidayFlag = 'N';
          this.courseactivitiesInsertList[i].courseClass = 'COURSE';
          this.courseactivitiesInsertList[i].courseActivityType = 'IA';
          this.courseactivitiesInsertList[i].programId = Number(this.courseactivitiesInsertList[i].programIdVal);
          this.courseactivitiesInsertList[i].internalLocationId = Number(this.courseactivitiesInsertList[i].internalLocationIdVal);
        }
        for (let i = 0; i < this.courseactivitiesUpdateList.length; i++) {
          if (this.validationEvent(this.courseactivitiesUpdateList[i])) {
            return;
          }
          this.courseactivitiesUpdateList[i].programId = Number(this.courseactivitiesUpdateList[i].programIdVal);
          this.courseactivitiesUpdateList[i].internalLocationId = Number(this.courseactivitiesUpdateList[i].internalLocationIdVal);
        }
        this.courseactivitiesCommitModel.insertList = this.courseactivitiesInsertList;
        this.courseactivitiesCommitModel.updateList = this.courseactivitiesUpdateList;
      }
      if (this.courseactivitiesDeleteList.length > 0) {
        for (let i = 0; i < this.courseactivitiesDeleteList.length; i++) {
          if (this.validationEvent(this.courseactivitiesDeleteList[i])) {
            return;
          }
        }
        this.courseactivitiesCommitModel.deleteList = this.courseactivitiesDeleteList;
      }
      if (!this.checkFlag) {
        const data = {
          label: this.translateService.translate('ocmsprac.thereareoffenderassignmentsbeyondthescheduledenddate'), yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
          if (result) {
            this.save(this.courseactivitiesCommitModel);
          } else {
            return;
          }
        });
      } else {
        this.save(this.courseactivitiesCommitModel);
      }
    }
  }
  save(event) {
    const courseactivitiesSaveData = this.ocmspracFactory.courseActivitiesCommit(event);
    courseactivitiesSaveData.subscribe(data => {
      if (data !== undefined && data.sealFlag === 'success') {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.courseactivitiesExecuteQuery();
      } else if (data !== undefined && data.sealFlag === '2') {
        this.show(this.translateService.translate('ocmsprac.codealreadyexistsfortheestablishment'), 'warn');
      } else if (data !== undefined && data.sealFlag === 'childFound') {
        this.show(this.translateService.translate('ocmsprac.deletenotpermittedaschildrecordsexist'), 'warn');
        this.courseactivitiesExecuteQuery();
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
      }
    });
  }
  validationEvent(event) {
    if (!event.programIdVal) {
      this.show(this.translateService.translate('ocmsprac.servicemustbeentered'), 'warn');
      return true;
    }
    if (!event.code || !event.code.trim()) {
      this.show(this.translateService.translate('ocmsprac.activitycodemustbe'), 'warn');
      return true;
    }
    if (!event.description || !event.description.trim()) {
      this.show(this.translateService.translate('ocmsprac.activitydescmustbe'), 'warn');
      return true;
    }
    if (!event.internalLocationIdVal) {
      this.show(this.translateService.translate('ocmsprac.internallocationmustbeentered'), 'warn');
      return true;
    }
    if (!event.scheduleStartDate) {
      this.show(this.translateService.translate('ocmsprac.startdatemustbeentered'), 'warn');
      return true;
    }
    if (event.scheduleStartDate && event.scheduleEndDate) {
      if (DateFormat.compareDate(DateFormat.getDate(event.scheduleStartDate),
        DateFormat.getDate(event.scheduleEndDate)) === 1) {
        this.show(this.translateService.translate('ocmsprac.enddateconnotbebeforethestartdate'), 'warn');
        return true;
      }
      if (event.crsActyId && DateFormat.compareDate(DateFormat.getDate(event.scheduleEndDate),
        DateFormat.getDate(event.schEndDate)) === 1) {
        this.show(this.translateService.translate('ocmsprac.courseschedulesmayneedtoberebuiltandoffenderassignmentsmade'), 'warn');
      }
      if (event.crsActyId && event.postUpdate === 'Y') {
        this.checkFlag = false;
      }
    }
  }
  validateRowData = (event) => {
    const rowdata = new ValidateRowReturn();
    const rowIndex = event.rowIndex;
    if (event.field === 'scheduleEndDate' && event.data.scheduleStartDate && event.data.scheduleEndDate) {
      if (DateFormat.compareDate(DateFormat.getDate(event.data.scheduleStartDate),
        DateFormat.getDate(event.data.scheduleEndDate)) === 1) {
        this.show(this.translateService.translate('ocmsprac.enddateconnotbebeforethestartdate'), 'warn');
        rowdata.validated = true;
        return rowdata;
      }
      if (event.data.crsActyId) {
        const validateData = this.ocmspracFactory.chkActyEndDate(event.data);
        validateData.subscribe(data => {
          if (data === 'null' || data === undefined || data === null) {
            this.grid.setColumnData('postUpdate', rowIndex, 'N');
          } else {
            this.grid.setColumnData('postUpdate', rowIndex, 'Y');
          }
        });
        rowdata.validated = true;
        return rowdata;
      } else {
        this.grid.setColumnData('postUpdate', rowIndex, 'N');
      }
    }
    this.grid.setColumnData('postUpdate', rowIndex, 'N');
    rowdata.validated = true;
    return rowdata;
  }
  onGridInsert = () => {
    this.courseactivitiesGridData = [];
    this.grid.addedMap.forEach(
      (v: any, k: number) => {
        this.courseactivitiesGridData.push(v);
      }
    );
    this.grid.updatedMap.forEach(
      (v: any, k: number) => {
        this.courseactivitiesGridData.push(v);
      }
    );
    for (let i = 0; i < this.courseactivitiesGridData.length; i++) {
      if (this.validationEvent(this.courseactivitiesGridData[i])) {
        return;
      }
    }
    return { agyLocId: this.agyLocId };
  }
  onGridClear = () => {
    this.courseactivitiesBean.commentText = undefined;
    this.courseactivitiesExecuteQuery();
    return true;
  }
  get facilityFlag() {
    if (this.courseactivitiesData.length > 0) {
      return true;
    }
    return false;
  }

  onSchBtnClick = () => {
    if (this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0 ||
      this.grid.removedMap.size > 0) {
      this.show(this.translateService.translate('ocmsprac.warningtherearechangesthatrequiresavingbeforecontinuing'), 'warn');
      return;
    }
    this.dialogService.openLinkDialog('/OCMSOSCH',  this.courseactivitiesBean, 80).subscribe(result => {
    });
    this.currentIndexFlag=true;
    // this.courseactivitiesExecuteQuery();
  //  this.courseactivitiesIndex =this.currentRowIndex;
}
getContacts = () => {
  this.courseactivitiesBean.pQueryOnly = 'N';
  this.dialogService.openLinkDialog('/OCMSSVCT', this.courseactivitiesBean, 80).subscribe(result => {
    if (result) {
    }
  });
}
}
