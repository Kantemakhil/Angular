import { BpmnModulerService } from '@core/ui-components/bpmn-moduler/bpmn-moduler.service';
import {
    Component
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumcamtaskService } from '../service/oumcamtask.service';
import { ActivatedRoute } from '@angular/router';
import { ProsmainService } from '@sa/recordmaintenance/service/prosmain.service';


@Component({
  selector: 'app-camundabpmn',
  templateUrl: './camundabpmn.component.html',
  styleUrls: ['./camundabpmn.component.css']
})

export class CamundaBpmnComponent  {
    bpmnName='';
    constructor(public translateService: TranslateService,private oumcamtaskService: OumcamtaskService,
      private bpmnModulerService :BpmnModulerService,private activatedRoute: ActivatedRoute,private processFactory: ProsmainService,){
    
      if(this.bpmnModulerService.bpmnRowData && this.bpmnModulerService.bpmnRowData.processDesc){
        this.bpmnName=this.bpmnModulerService.bpmnRowData.processDesc;
      }
    }
    toggleBpmnScreen() {
      var elem = document.getElementById("s4MainBody");
      if (!document.fullscreenElement) {
        elem.requestFullscreen();
        elem.classList.add('fullScreenBPMN');
      } else {
        document.exitFullscreen();
        elem.classList.remove('fullScreenBPMN');
      }
    }
  }

