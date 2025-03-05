import { BpmnModulerService } from '@core/ui-components/bpmn-moduler/bpmn-moduler.service';
import {
    Component
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumcamtaskService } from '../service/oumcamtask.service';
import { DmnModulerService } from '@core/ui-components/dmn-moduler/dmn-moduler.service';


@Component({
  selector: 'app-cmddmn',
  templateUrl: './cmddmn.component.html',
  styleUrls: ['./cmddmn.component.css']
})

export class CmdDmnComponent  {
    dmnName='Camunda DMN';
    constructor(public translateService: TranslateService,private oumcamtaskService: OumcamtaskService,
      private bpmnModulerService :BpmnModulerService,private dmnModulerService: DmnModulerService){
     if(this.dmnModulerService.dmnRowData && this.dmnModulerService.dmnRowData.definitionDesc){
       this.dmnName=this.dmnModulerService.dmnRowData.definitionDesc;
     }
    }

  }

