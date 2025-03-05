import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef,Input} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '../datepicker/dateFormat';

@Component({
  selector: 's4-weekcalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'weekcalendar.component.html',
  styleUrls: ['./weekcalendar.component.scss']
})
export class WeekCalendarComponent {
  @ViewChild('modalContent' ,{static : true}) modalContent: TemplateRef<any>;
  
  innerweekSchedules :any;
  dateFormat = "dd/MM/yyyy";//DateFormat.dateFormat;
  dayWeek = DateFormat.dayFormat;
  shortTime=DateFormat.timeFormat;
  
  constructor(public translateService: TranslateService) {
  }
  
  get weekSchedules(): any {
      return this.innerweekSchedules;
  }

  @Input()
  set weekSchedules(v: any) {
      this.innerweekSchedules = v;
  }

  
}