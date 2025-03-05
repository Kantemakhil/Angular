import { DmnProcess } from './../beans/DmnProcess';
import { Component, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { BpmnProcess } from '../beans/BpmnProcess';
import { CmdhistService } from '../service/cmdhist.service';
import { Router } from '@angular/router';
import { TooltipComponent } from '@syncfusion/ej2-angular-popups';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { TimeFormat } from '@core/ui-components/time/timeFormat';

@Component({
    selector: 'app-cmdhist',
    templateUrl: './cmdhist.component.html',
    styleUrls: ['./cmdhist.component.css']
})

export class CmdhistComponent implements OnInit {
    @ViewChild('buildGrid', {static: true}) buildGrid: any;
    @ViewChild('tooltip') public tooltipControl: TooltipComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;

    cmdhistData: BpmnProcess [] = [];
    cmdhistModel: BpmnProcess = new BpmnProcess();


    dmnHistData : DmnProcess []=[];

    dmnhistModel : DmnProcess = new DmnProcess();
    msglist: any[];
    message: any;
    type: any;
    index: any;
     cellDate: string;
    xmlData: string = "";
    hideSave: boolean = true;
    fields:object = { text: "processDesc" };
    dmnFields:object = { text: "definitionDesc" };
    bpmnViewer = true;
      constructor(private cmdhistFactory: CmdhistService, public translateService: TranslateService,
            public sessionManager: UserSessionManager, private router: Router,) {
    }

    ngOnInit() {
        
        if(this.cmdhistFactory.bpmnViewer){
            this.bpmnViewer = true;
            this.cmdhistModel = this.cmdhistFactory.bpmnRowData;
            this.cmdhistExecuteQuery();
        }else if(this.cmdhistFactory.dmnViewer){
            this.dmnhistModel = this.cmdhistFactory.bpmnRowData;
            this.bpmnViewer = false;
            this.dmnVersionExecuteQuery();
        }
        
    }
     /**
      * This function displays the messages
      */
    show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
    }

    cmdhistExecuteQuery(){
        const serviceObj = this.cmdhistFactory.gerVersionHistory(this.cmdhistModel);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
                this.cmdhistData = [];
			} else {
                this.cmdhistData = data;
                this.cmdhistData.forEach((element) => {
                    element.processDesc = "V" + element.defVersion + " " + element.modifyDatetime + " "+element.createUserId+ " "+element.modifyUserId;
                   if(element.modifyDatetime){
                       element.dateTime=DateFormat.format(element.modifyDatetime)+" "+TimeFormat.format(element.modifyDatetime);
                   }
                });
                this.cmdhistModel=this.cmdhistData[0];
                this.xmlData = this.cmdhistData[0].bpmn;
			}
		});
    }

    
    dmnVersionExecuteQuery(){
        const serviceObj = this.cmdhistFactory.gerDmnVersionHistory(this.dmnhistModel);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
                this.dmnHistData = [];
			} else {
                this.dmnHistData = data;
                this.dmnHistData.forEach((element) => {
                    element.definitionDesc = "V" + element.defVersion + " " + element.modifyDatetime;
                    if(element.modifyDatetime){
                        element.dateTime=DateFormat.format(element.modifyDatetime)+" "+TimeFormat.format(element.modifyDatetime);
                    }
                });
                this.xmlData = this.dmnHistData[0].dmn;
                
			}
		});
    }

    onSelect(event){
        if(this.cmdhistFactory.bpmnViewer){
        this.cmdhistModel = this.cmdhistData[event.index];
        this.xmlData = this.cmdhistModel.bpmn;
        }else if(this.cmdhistFactory.dmnViewer){
            this.dmnhistModel = this.dmnHistData[event.index];
            this.xmlData = this.dmnhistModel.dmn;
        }
       
    }

    onExitBtnClick(){
        if(this.cmdhistFactory.bpmnViewer){
            if(this.cmdhistFactory.cmnBpmnViewer) {
                this.router.navigate(['/CMNPROSS']);
            } else {
                this.router.navigate(['/PROSMAIN']);
            }
            
        }else if(this.cmdhistFactory.dmnViewer){
            this.router.navigate(['/DMNMAIN']);
        }
       
    }
}
