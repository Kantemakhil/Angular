import { Component, OnInit, Input } from '@angular/core';
import { OimvlimtService } from '@inst/visits-management/maintenance/service/oimvlimt.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { Router } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';

@Component({

    templateUrl: './iep.component.html',
    providers: [],
    selector: 'iepComponent'
})
export class iepComponent implements OnInit {
    iepData = [];
    date: Date;
    description: string;
    code:string;
    link='/OIDIEPLV'
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();


    constructor(private oimvlimtService: OimvlimtService, private router: Router,public translateService: TranslateService) {
        this.date = DateFormat.getDate();
    }

    ngOnInit() {
        this.oimvlimtService.getiepDetails( this.vHeaderBlockModel.offenderBookId).subscribe(data => {
            if (data) {
                this.iepData = data;
                data.forEach(values => {
                    this.date = values.reviewDays;
                    this.description = values.iepLeveldescription;
                    this.code=values.iepLevelCode;
                });
            }
        })
    }

    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
    }

    @Input()
  set selectedOffender(v:any) {
      if (v !== undefined && v !== this.vHeaderBlockModel) {
          this.vHeaderBlockModel = v;
          this.oimvlimtService.getiepDetails( this.vHeaderBlockModel.offenderBookId).subscribe(data => {
            if (data) {
                this.iepData = data;
                data.forEach(values => {
                    this.date = values.reviewDays;
                    this.description = values.iepLeveldescription;
                    this.code=values.iepLevelCode;
                });
            }
        })
      }
  }

    onClick() {
       
    }



}  