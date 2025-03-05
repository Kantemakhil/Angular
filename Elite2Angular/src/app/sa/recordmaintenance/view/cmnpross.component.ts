import { DateFormat } from './../../../core/ui-components/datepicker/dateFormat';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { BpmnProcessCommitBean } from '../beans/BpmnProcessCommitBean';
import { BpmnProcess } from '../beans/BpmnProcess';
import { BpmnModulerService } from '@core/ui-components/bpmn-moduler/bpmn-moduler.service';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import { CmdhistService } from '../service/cmdhist.service';
import { CmnprossService } from '../service/cmnpross.service';

@Component({
   selector: 'app-cmnpross',
   templateUrl: './cmnpross.component.html'
})

export class CmnprossComponent implements OnInit {
	private bpmnJS: BpmnJS;
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   msglist: any[];
	message: any;
	type: any;
   processData: BpmnProcess[] = [];
   processDataTemp: BpmnProcess[] = [];
   processModel: BpmnProcess = new BpmnProcess();
   processInsertList: BpmnProcess[] = [];
	processUpdateList: BpmnProcess[] = [];
	processDeleteList: BpmnProcess[] = [];
	processCommitModel: BpmnProcessCommitBean = new BpmnProcessCommitBean();
   processColumnDef: any[];
   tableIndex: number;
   processDelete: boolean;
   xmlTemp:string;
   @ViewChild('cmnProcessGrid', {static: false}) cmnProcessGrid;
	selectedRecord: any;

   constructor(private cmnprossFactory: CmnprossService, public translateService: TranslateService,
	  public sessionManager: UserSessionManager, private dialogService: DialogService,private bpmnModulerService:BpmnModulerService,
	  private cmdhistService: CmdhistService) {
         this.processColumnDef = [];
   }
   ngOnInit() {
      this.processColumnDef = [
         {
            fieldName: this.translateService.translate('prosmain.prcessdescription'), field: 'processDesc', editable: true, width: 150,
            datatype: 'text',uppercase: 'false', required: true, cellEditable: this.processDescEdit
         },
		 {
			fieldName: this.translateService.translate('common.category'), field: 'category', required: true,editable: true, width: 150,
			datatype: 'lov', domain: 'PROCESS_CATE'
		},
         {
            fieldName: this.translateService.translate('prosmain.bpmnfile'), field: 'button', editable: true, width: 150,displayas: 'image',
            datatype: 'hyperlink', link: '/OUMCAMBPMN', modal: false,data: 'row', updateField: 'row',
         onLaunchClick: this.bpmnLaunchClick
		 },
		 
		 {
            fieldName: this.translateService.translate('prosmain.deploy'), field: 'deploye', editable: true, width: 150,displayas: 'image',
            datatype: 'hyperlink', modal: false, data: 'row', updateField: 'row',
         	onLaunchClick: this.validateDeploy
		 },
		 
		 {
            fieldName: this.translateService.translate('prosmain.versionhistory'), field: 'history', editable: true, width: 150,displayas: 'image',
            datatype: 'hyperlink', link: '/CMDHIST', modal: false, data: 'row', updateField: 'row',
         	onLaunchClick: this.historyLaunchClick
		 },
		 
		 {
            fieldName: this.translateService.translate('prosmain.recentdeployment'), field: 'deployDatetime', editable: false, width: 150,
            datatype: 'dateTime'
		 },
		 
		 {
            fieldName: this.translateService.translate('prosmain.lastsaved'), field: 'modifyDatetime', editable: false, width: 150,
            datatype: 'dateTime'
		 },
		 {
            fieldName: this.translateService.translate('prosmain.createduser'), field: 'createUserId', editable: false, width: 150,
            datatype: 'text',uppercase: 'false'
		 },
		 {
            fieldName: this.translateService.translate('prosmain.modifieduser'), field: 'modifyUserId', editable: false, width: 150,
            datatype: 'text',uppercase: 'false'
         },
      ];

      this.processExecuteQuery();
   }

   processDescEdit = (data: any, index: number, field: string): boolean => {
	if (!data.createDatetime) {
		return true;
	} else {
		return false;
	}
   }

   bpmnLaunchClick = (data) => {
	if (data) {
		this.bpmnModulerService.bpmnRowData = data;
		this.bpmnModulerService.routeTo='CMNPROSS';
	}
	return true;
   }

   setEncoded(data, name) {
	const encodedData = encodeURIComponent(data);
	if (data) {
	}
  }

  getxml(){
	this.bpmnJS.saveXML({ format: true }, (err, xml) => {
		if (err) {
		} else {
		  this.setEncoded(xml, 'bpmn.xml');
		  this.xmlTemp = xml;
		}
	  });
	}

   deployeLaunchClick = (data) => {
	//this.getxml();
	if (data) {
		this.processUpdateList[0] = data;
		this.processCommitModel.updateList = [];
		if (this.processUpdateList.length > 0) {
			this.processUpdateList.forEach(obj=>{
				obj.bpmn = this.xmlTemp;
				obj.deployUserId=this.sessionManager.getId();
				obj.deployDatetime=DateFormat.getDate();
			})
			this.processCommitModel.updateList = this.processUpdateList;
		}
		const processSaveData = this.cmnprossFactory.deployeBpmn(this.processCommitModel);
	   processSaveData.subscribe(data => {
			if (data === 1) {
				this.processExecuteQuery();
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		});
	}
	return true;
   }

   historyLaunchClick = (data) => {
	if (data) {
		this.cmdhistService.bpmnViewer=true;
		this.cmdhistService.dmnViewer=false;
		this.cmdhistService.cmnBpmnViewer=true;
		this.bpmnModulerService.routeTo='CMNPROSS';
		this.cmdhistService.bpmnRowData = data;
	}
	return true;
   }

   CellEdit = (data: any, index: number, field: string): boolean => {
	if (data.processId) {
		return false;
	}
	
	return true;
}

   show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}

   onRowClick(event) {
      if(event !== undefined){
			this.processModel = event;
		}
		/* if (event.createDatetime || event.createDatetime !== undefined) {
			this.processDelete = true;
		} else {
			this.processDelete = false;
		} */
   }

   processExecuteQuery() {
		const serviceObj = this.cmnprossFactory.processExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
                this.processData = [];
                this.processDataTemp = [];
				this.tableIndex = -1;
			} else {
				this.tableIndex = 0;
                this.processDataTemp = data;
                let tempData = [];
				this.processDataTemp.forEach(obj=>{
					obj['button'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
					if(obj.deployFlag=='Y') {
						obj['deploye'] = 'assets/icons/eoff_icons/deploy.png';
					}
					if(obj.historyFlag=='Y') {
						obj['history'] = 'assets/icons/eoff_icons/version.png';
                    }
                    if(obj.commonProcess === 'Y') {
                        tempData.push(obj);
                    }
                })
                this.processData = tempData;
				this.processModel = this.processData[0];
			}
		});
   }
   
   processCommit(event) {
		this.processInsertList = event.added
		this.processUpdateList = event.updated
		this.processDeleteList = event.removed
		this.processCommitModel.insertList = [];
		this.processCommitModel.updateList = [];
		this.processCommitModel.deleteList = [];
		if (this.processInsertList.length > 0) {
			if (!this.processValidate(this.processInsertList)) {
                return;
            }
			this.processInsertList.forEach(obj => {
				obj.processDesc = obj.processDesc.trim();
			});
			this.processInsertList.forEach(obj=>{
				obj.createUserId=this.sessionManager.getId();
				obj.createDatetime=DateFormat.getDate();
				obj.modifyUserId=this.sessionManager.getId();
                obj.modifyDatetime=DateFormat.getDate();
                obj.commonProcess='Y';
			})
			this.processCommitModel.insertList = this.processInsertList;
		}
		if (this.processUpdateList.length > 0) {
			if (!this.processValidate(this.processUpdateList)) {
                return;
            }
			this.processUpdateList.forEach(obj=>{
				obj.modifyUserId=this.sessionManager.getId();
                obj.modifyDatetime=DateFormat.getDate();
                obj.commonProcess='Y';
			})
			this.processCommitModel.updateList = this.processUpdateList;
		}
		if (this.processDeleteList.length > 0) {
			this.processCommitModel.deleteList = this.processDeleteList;
		}
		this.processCommitModel.sourceModule='CMNPROSS';
		const processSaveData = this.cmnprossFactory.processCommit(this.processCommitModel);
	   processSaveData.subscribe(data => {
			if (data === 1) {
				this.processExecuteQuery();
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		});
	}

   onGridInsert = () => {
		return {};
	}

	processValidate(processList: any) {
		try {
			processList.forEach((element) => {
				if (!element.processDesc) {
					this.type = 'warn';
					this.message = this.translateService.translate('cmdaction.enterprocessdesc');
					this.show();
					throw new Error();
				} 
				if (element.processDesc) {
					var regex = new RegExp("^[a-zA-Z0-9_ ]+$");
					if (!regex.test(element.processDesc)) {
						this.type = 'warn';
						this.message = this.translateService.translate('prosmain.splchars');
						this.show();
						throw new Error();
					} 
				} 
			});
			const addedValues = Array.from(this.cmnProcessGrid.addedMap.values()).map((obj:any) => {return obj.processDesc});
			const existingValues =  this.processDataTemp.filter(obj=> !!obj.createDatetime && addedValues.includes(obj.processDesc));
			if(existingValues.length > 0) {
				this.type = 'warn';
				this.message = this.translateService.translate('Process Description already exists. Please change the Process Description');
				this.show();
				throw new Error();
			} 
    	} catch (e) {
        	return false;
    	}
        return true;
    }

	showPopUp(data) {
        const popupData = {

            label: this.translateService.translate('The process, %processDesc%, is already associated with this trigger. Do you want to override it.').replace('%processDesc%', data.processDesc),
            yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', popupData, 50).subscribe(result => {
            if (result) {

                this.cmnprossFactory.deleteTrigger(data.triggerId).subscribe(returnData=>{
					if(returnData >0 ) {
						this.deployeLaunchClick(this.selectedRecord);
					}
				});
            }
        });

    }
	validateDeploy = (data) =>{
		this.selectedRecord = data;
		this.cmnprossFactory.validateDeploy(data).subscribe(returnData=>{
			if(returnData.length >0 ) {
				this.showPopUp(returnData[0]);
			} else {
				this.deployeLaunchClick(data);
			}
		}, err => {
			this.type = 'error';
			this.message = this.translateService.translate('common.addupdateremoverecordfailed');
			this.show();
		});

	}
}

