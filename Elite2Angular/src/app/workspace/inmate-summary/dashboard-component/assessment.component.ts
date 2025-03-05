import { Component, OnInit, Input } from '@angular/core';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { VOffassAss } from '@inst/classification/beans/VOffassAss';
import { OcdnoqueService } from '@inst/classification/service/ocdnoque.service';
// import { VOffassAss } from 'src/app/inst/classification/beans/VOffassAss';
// import { OcdnoqueService } from 'src/app/inst/classification/service/ocdnoque.service';
@Component({
  
  templateUrl: './assessment.component.html',
  providers: [],
    selector: 'assessmentComponent'
})
export class AssessmentComponent implements OnInit {

  vHeaderBlockModel: VHeaderBlock;
  offassData: VOffassAss[] = [];
  dateFormat = 'dd/MM/yyyy';
  constructor(public translateService: TranslateService, private ocdnoqueFactory: OcdnoqueService) { }
  link = '/OCDNOQUE';


  ngOnInit() {
    this.offassData = [];
  }
  @Input()
  set selectedOffender(v:any) {
      this.offassData = [];
      if (v !== undefined && v !== this.vHeaderBlockModel) {
          this.vHeaderBlockModel = v;
          this.assesmentDetailsQuery();
      }
  }

  
  assesmentDetailsQuery() {
    let offassModel = new VOffassAss();
    offassModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    
    const offassResult = this.ocdnoqueFactory.
        offAssExecuteQuery(offassModel);
    offassResult.subscribe(offassResultList => {
        if (offassResultList.length === 0) {
            //  offass1Model = new OffenderAssessments();
            // this.offass1Model.assessmentDate = DateFormat.getDate();
            this.offassData = [];
            // this.assReadonly = false;
            // this.reAssReadonly = false;
            // this.overrideResultReadonly = true;
        } else {
            // this.overrideResultReadonly = false;
            // this.assReadonly = true;
            // this.selectedRow = 0;
            this.offassData = offassResultList;
            this.offassData.forEach(obj=>{
                obj.alertDateDisplay = DateFormat.format(obj.assessmentDate);
                
            });
        }
    });
}
}