import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { TranslateService } from '@common/translate/translate.service';
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';
import { OiioscedService } from '@inst/casemanagement/service/oiiosced.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';

@Component({
  
  templateUrl: './movements.component.html',
  providers: [],
    selector: 'movementsComponent'
})
export class MovementsComponent implements OnInit {

    voffenderallmovmentsModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    vHeaderBlockModel: VHeaderBlock;
    voffenderallMovementsData: VOffenderAllSchedules [] = [];
    voffenderallMovementsDataTemp: VOffenderAllSchedules[] = [];
    dateFormat = 'dd/MM/yyyy';

      constructor(private oiioscedFactory: OiioscedService,  public translateService: TranslateService,
              private offenderSearchService: OffenderSearchService) { }

  ngOnInit() {
      }
      
      initParams() {
          const datePipe = new DatePipe('en-US');
          let todayDate = DateFormat.getDate();
          this.voffenderallmovmentsModel.offenderBookId=this.vHeaderBlockModel.offenderBookId;
          let currentYEar = todayDate.getFullYear();
          todayDate.setFullYear(currentYEar-4, 1, 1);
          this.voffenderallmovmentsModel.fromDate = todayDate;
          this.voffenderallmovmentsModel.toDate =  DateFormat.getDate();
          this.voffenderallmovmentsModel.eventClass = 'EXT_MOV';//this.cntrlblkModel.toDate;
      }
      
      @Input()
      set selectedOffender(v:any) {
          if (v !== undefined && v !== this.vHeaderBlockModel) {
              this.vHeaderBlockModel = v;
              this.voffenderallschedulesExecuteQuery();
          }
      }
      
      voffenderallschedulesExecuteQuery() {
          this.initParams();
          const voffenderallschedulesResult = this.oiioscedFactory.vOffenderAllSchedulesExecuteQuery(this.voffenderallmovmentsModel);
              voffenderallschedulesResult.subscribe(data => {
                  if (data.length === 0) {
                      this.voffenderallMovementsData = [];
                  } else {
                      this.voffenderallMovementsDataTemp = data;
                      for ( let i = 0; i < data.length; i++) {
                          if ( data[i].toAgyLocDesc ) {
                              this.voffenderallMovementsDataTemp[i].toAgyLocDesc = data[i].toAgyLocDesc;
                          } else if ( data[i].toCityName) {
                              this.voffenderallMovementsDataTemp[i].toAgyLocDesc = data[i].toCityName;
                          } else if ( data[i].toInternalLocationDesc) {
                              this.voffenderallMovementsDataTemp[i].toAgyLocDesc = data[i].toInternalLocationDesc;
                          } else if ( data[i].toAddressOwnerClass) {
                              this.voffenderallMovementsDataTemp[i].toAgyLocDesc = data[i].toAddressOwnerClass;
                          }
                          this.voffenderallMovementsDataTemp[i].alertDateDisplay = DateFormat.format(data[i].eventDate);
                      }
                      this.voffenderallMovementsData = this.voffenderallMovementsDataTemp;
                 }
        });
  }

}