
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { BpmnProcess } from '../beans/BpmnProcess';
import { ProsmainService } from '../service/prosmain.service';
@Component({
    selector: 'app-prosinit',
    templateUrl: './prosinit.component.html'
})

export class ProsinitComponent implements OnInit {
    msgs: any[] = [];
    msglist: any[];
    message: any;
    type: any;
    processData: BpmnProcess[] = [];
    processModel: BpmnProcess = new BpmnProcess();
    processinitColumnDef: any[];
    tableIndex: number;
    selectedRecord: any;
    btnEvent = false;
    constructor(private processFactory: ProsmainService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private dialogService: DialogService) {
        this.processinitColumnDef = [];
    }
    ngOnInit() {
        this.processinitColumnDef = [
            {
                fieldName: this.translateService.translate('prosinit.processname'), field: 'processDesc', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: '', field: 'button', datatype: 'launchbutton', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, onLaunchClick: this.onButClick
                        },
        ];
        this.processExecuteQuery();
    }
        show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    processExecuteQuery() {
		const serviceObj = this.processFactory.processExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.processData = [];
				this.tableIndex = -1;
			} else {
				this.tableIndex = 0;
                data.forEach(obj=>{
					obj.button = '..';
					});
                this.processData = data;
				this.processModel = data[0];
                this.btnEvent = false;
			}
		});
   }
    onButClick = (event) => {
        this.btnEvent = true;
        const data = {
            label: 'Do you want to start the process?', yesBtn: true, noBtn: true
          };
          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (result) {
               const serviceObj = this.processFactory.getProcessInstance(event.processId);
                serviceObj.subscribe(data => {
                    this.type = 'success';
                    this.message = this.translateService.translate('Process Started');
                    this.show();
                    this.processExecuteQuery();
                });
            }
         });
       
    }
    }

