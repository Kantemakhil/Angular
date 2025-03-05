import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcmphmodService } from '@cm/programsservices/service/ocmphmod.service';
import { CourseActivitiesCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseActivitiesCommitBean';
import { CourseActivities } from '@inst/programs-without-schedules/beans/CourseActivities';
import { VCoursePhaseOfferings } from '@inst/accredited-programs/beans/VCoursePhaseOfferings';
// import required bean declarations

@Component({
  selector: 'app-ocmphmod',
  templateUrl: './ocmphmod.component.html'
  // styleUrls: ['./ocmphmod.component.css']
})

export class OcmphmodComponent implements OnInit {
  PhaseLovReadonly: boolean;
  nbtDescription: string;
  // Variable declaration
  courseActivitiesModel: CourseActivities = new CourseActivities();
  courseActivitiesData: CourseActivities[] = [];
  courseactivitiesDataTemp: CourseActivities[] = [];
  vcrsphsModel: VCoursePhaseOfferings = new VCoursePhaseOfferings();
  courseactivitiesCommitModel: CourseActivitiesCommitBean = new CourseActivitiesCommitBean();
  courseactivitiesInsertList: CourseActivities[] = [];
  courseactivitiesDeleteList: CourseActivities[] = [];
  courseactivitiesUpdatetList: CourseActivities[] = [];
  @ViewChild('dialog', { static: true }) dialog: any;
  courseActivitiesColumnDef: any[];
  editable: boolean;
  msgs: any[] = [];
  selectOne = -1;
  message: any;
  constructor(private ocmphmodFactory: OcmphmodService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.courseActivitiesColumnDef = [];
  }
  ngOnInit() {
    this.PhaseLovReadonly = false;
      this.courseActivitiesColumnDef = [
      { fieldName: this.translateService.translate('ocmphmod.sequence'), field: 'listSeq', editable: false,
      width: 150, datatype: 'number' },
      { fieldName:  this.translateService.translate('common.description'), field: 'nbtDescription', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('ocmphmod.numberofsessions'), field: 'noOfSessions',
         required: 'true', editable: true, width: 150,
        datatype: 'number', minValue: '0', maxValue: '999999', whole: true
      },
      { fieldName:  this.translateService.translate('ocmphmod.startpermitted') , field: 'startFlag', editable: false, width: 150, datatype: 'checkbox' },
    ];
    this.courseActivitiesModel = this.dialog.data;
    this.nbtDescription = this.dialog.data.phDescription;
    // this.courseActivitiesModel.noOfSessions = this.dialog.data.cpNoOfSessions;
    // this.vworkassignmenthistoryModel.offenderBookId = this.dialog.data.phDesc;
    // this.vworkassignmenthistoryModel.workflowHistoryId = this.taskModel.workflowHistoryId;
    this.courseActExecuteQuery();
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
  cancel() {
    this.dialog.close(null);
  }
  /**
   *  This function will be executed EVENT fired
   */
  courseActExecuteQuery() {
    this.courseActivitiesModel.parentCrsActyId = this.dialog.data.coursePhaseId;  //   8365this.crsActyId
    const courseactivitiesResult = this.ocmphmodFactory.
      courseActivitiesExecuteQuery(this.courseActivitiesModel);
    courseactivitiesResult.subscribe(data => {
      if (data.length === 0) {
        this.courseActivitiesData = [];
      } else {
        data.forEach(element => {
          // element.startFlag = element.startFlag ? 'Y' : 'N';
          element.startFlag = element.startFlag === 'Y' ? true : false;
          element.noOfSessionsTemp = element.noOfSessions;
        });
        this.courseActivitiesData = data;
        this.courseActivitiesModel = data[0];
        this.selectOne = 0;
        this.PhaseLovReadonly = true;

      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocmphmodSavecourseActForm(event) {
    if (!this.Validations()) {
      return;
    }
    this.courseactivitiesInsertList = event.added;
    this.courseactivitiesUpdatetList = event.updated;
    this.courseactivitiesDeleteList = event.removed;
    this.courseactivitiesCommitModel.insertList = [];
    this.courseactivitiesCommitModel.updateList = [];
    this.courseactivitiesCommitModel.deleteList = [];
    if (this.courseactivitiesInsertList.length > 0 || this.courseactivitiesUpdatetList.length > 0) {
      for (let i = 0; i < this.courseactivitiesInsertList.length; i++) {

        this.courseactivitiesCommitModel.insertList = this.courseactivitiesInsertList;
      }
      for (let i = 0; i < this.courseactivitiesUpdatetList.length; i++) {
        this.courseactivitiesUpdatetList[i].noOfSessions  = Number(this.courseactivitiesUpdatetList[i].noOfSessions);

        this.courseactivitiesCommitModel.updateList = this.courseactivitiesUpdatetList;
      }
    }
    if (this.courseactivitiesDeleteList.length > 0) {
      for (let i = 0; i < this.courseactivitiesDeleteList.length; i++) {

        this.courseactivitiesCommitModel.deleteList = this.courseactivitiesDeleteList;
      }
    }
    const courseactivitiesSaveData = this.ocmphmodFactory.courseActivitiesCommit(this.courseactivitiesCommitModel);
    courseactivitiesSaveData.subscribe(data => {
      if (data && data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.courseActExecuteQuery();
        return;
      } else if (data && data.sealFlag === '2') {
        this.show('ocmphmod.cannotchange');
        this.courseActExecuteQuery();
        return;
      } else if (data && data.sealFlag && data.seqOne === 2292) {
        this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
        this.message = String(this.message).replace('%tablename%', data.sealFlag);
        this.show(this.message, 'warn');
        this.courseActExecuteQuery();
        return;
      } else if (data && data.sealFlag && data.seqOne === 2291) {
        this.message = this.translateService.translate('common.recordcannotbedeletedparent');
        this.message = String(this.message).replace('%tablename%', data.sealFlag);
        this.show(this.message, 'warn');
        this.courseActExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed', 'warn');
        this.courseActExecuteQuery();
        return;
      }
    });
  }
  Validations() {
    const is = { valid: true };
    this.courseActivitiesData.forEach(data => {
      if (is.valid) {
        if (data.noOfSessions === null ) {
          this.show('ocmphmod.numberOfsessionsmustbeentered');
          is.valid = false;
          return;
        }

        if (data.noOfSessions === 0 ) {
          this.show('ocmphmod.numberOfsessionsrangevalidation');
          is.valid = false;
          return;
        }
      }
    });
    return is.valid;
  }

}
