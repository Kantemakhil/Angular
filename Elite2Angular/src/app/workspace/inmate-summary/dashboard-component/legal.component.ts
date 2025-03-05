import { Component, OnInit, Input } from '@angular/core';
import { OcdccaseService } from "@inst/legal/service/ocdccase.service";
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffensesOutcome } from "@inst/legal/beans/OffensesOutcome";
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
  
  templateUrl: './legal.component.html',
  providers: [],
    selector: 'legalComponent'
})
export class LegalComponent implements OnInit {

  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  offences : OffensesOutcome = new OffensesOutcome();
  link = '/OCDLEGLS';
  constructor(private ocdccaseService : OcdccaseService, public translateService: TranslateService) { }

  ngOnInit() {
  }
  
  getOffenderOffences() {
    const searchOffencesOutcomedata = this.ocdccaseService.offenderOffences(this.vHeaderBlockModel.offenderBookId);
    searchOffencesOutcomedata.subscribe(offencesOutcomelist => {
      this.offences = offencesOutcomelist[0];
    });
  }
  
  @Input()
  set selectedOffender(v:any) {
      if (v !== undefined && v !== this.vHeaderBlockModel) {
          this.vHeaderBlockModel = v;
          this.getOffenderOffences();
      }
  }

}
