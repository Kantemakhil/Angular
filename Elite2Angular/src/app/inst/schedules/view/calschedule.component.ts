import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { OiioscedService } from '@inst/casemanagement/service/oiiosced.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { ScheduleDateUtil } from '@common/utility/scheduleDateUtil';
import { CalScheduleBean } from '../beans/CalScheduleBean';
import { SchedulerComponent } from '@core/ui-components/schedule/scheduler.component';
import { UserSessionManager } from '@core/classes/userSessionManager';


@Component({
  
  templateUrl: './calschedule.component.html',
  providers: [],
  selector: 'calschedulecomponent'
})
export class CalScheduleComponent implements OnInit {
    options: { text: string; id: number; }[];
    vHeaderBlockModel: any;
    calScheduleObj : CalScheduleBean = new CalScheduleBean ();
    @ViewChild('scheduler',{static:true}) scheduler: SchedulerComponent;
    msgs: any[] = [];
    showHideCancelled: boolean = true;
    hideCancelled : boolean = false;
    
  
    constructor(private oiioscedFactory: OiioscedService,  public translateService: TranslateService,
            private offenderSearchService: OffenderSearchService,
            private activatedRoute: ActivatedRoute, private injectOffenderService: InjectOffenderService,
            private scheduleDateUtil: ScheduleDateUtil,
            private sessionManager: UserSessionManager) {
    }
    link = 'calsch/getEventData';

    ngOnInit() {
        this.options = this.scheduleDateUtil.options();
        this.injectOffenderService.injectOffender(this.activatedRoute);
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    }

    onOffenderChange(offender) {
      this.vHeaderBlockModel = offender;
      this.calScheduleObj = new CalScheduleBean ();
      if (offender) {
         this.calScheduleObj.offenderBookId = this.vHeaderBlockModel.offenderBookId;
         this.calScheduleObj.caseLoadId = this.sessionManager.currentCaseLoad;
         this.calScheduleObj.agyLocId=this.vHeaderBlockModel.agyLocId;
         this.calScheduleObj.bookingDate=this.vHeaderBlockModel.bookingBeginDate;

      }
      this.scheduler.updateData(this.calScheduleObj);
    }

  viewingCancellingSch() {
    this.calScheduleObj = new CalScheduleBean();
    this.calScheduleObj.caseLoadId = this.sessionManager.currentCaseLoad;
    this.calScheduleObj.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    this.calScheduleObj.eventStatus = 'CANC'
    this.scheduler.updateData(this.calScheduleObj);
    this.showHideCancelled = false;
    this.hideCancelled = true;
  }

  hideCancellingSch() {
    this.hideCancelled = false;
    this.showHideCancelled = true;
    this.calScheduleObj = new CalScheduleBean();
    this.calScheduleObj.caseLoadId = this.sessionManager.currentCaseLoad;
    this.calScheduleObj.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    this.scheduler.updateData(this.calScheduleObj);

  }
}
