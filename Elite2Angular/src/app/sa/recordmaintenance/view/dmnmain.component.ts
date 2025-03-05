import { DmnProcess } from './../beans/DmnProcess';
import { DmnmainService } from './../service/dmnmain.service';
import { DateFormat } from './../../../core/ui-components/datepicker/dateFormat';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import * as DmnJS from 'dmn-js/dist/dmn-modeler.production.min.js';
import { CmdhistService } from '../service/cmdhist.service';
import { DmnModulerService } from '@core/ui-components/dmn-moduler/dmn-moduler.service';
import { DmnProcessCommitBean } from '../beans/DmnProcessCommitBean';

@Component({
	selector: 'app-dmnmain',
	templateUrl: './dmnmain.component.html'
})

export class DmnmainComponent implements OnInit {
	private dmnJS: DmnJS;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	msglist: any[];
	message: any;
	type: any;
	dmnsData: DmnProcess[] = [];
	processModel: DmnProcess = new DmnProcess();
	dmnInsertList: DmnProcess[] = [];
	dmnUpdateList: DmnProcess[] = [];
	dmnDeleteList: DmnProcess[] = [];
	dmnCommitModel: DmnProcessCommitBean = new DmnProcessCommitBean();
	dmnColumnDef: any[];
	tableIndex: number;
	processDelete: boolean;
	xmlTemp: string;
	domParser = new DOMParser();
	constructor(private processFactory: DmnmainService, public translateService: TranslateService,
		public sessionManager: UserSessionManager, private dialogService: DialogService, private bpmnModulerService: DmnModulerService,
		private cmdhistService: CmdhistService) {
		this.dmnColumnDef = [];
	}
	ngOnInit() {
		this.dmnColumnDef = [

			{
				fieldName: this.translateService.translate('dmnmain.decisiondesc'), field: 'definitionDesc', width: 150,
				datatype: 'text', uppercase: 'false',cellEditable: this.canCellEdit
			},
			{
				fieldName: this.translateService.translate('common.category'), field: 'category',required: true, editable: true, width: 150,
				datatype: 'lov', domain: 'PROCESS_CATE'
			},
			{
				fieldName: this.translateService.translate('dmnmain.dmnfile'), field: 'button', editable: true, width: 150, displayas: 'image',
				datatype: 'hyperlink', link: '/CMDDMN', modal: false, data: 'row', updateField: 'row',
				onLaunchClick: this.dmnLaunchClick
			},

			{
				fieldName: this.translateService.translate('dmnmain.deploy'), field: 'deploye', editable: true, width: 150, displayas: 'image',
				datatype: 'hyperlink', modal: false, data: 'row', updateField: 'row',
				onLaunchClick: this.deployeLaunchClick
			},

			{
				fieldName: this.translateService.translate('dmnmain.verhistory'), field: 'history', editable: true, width: 150, displayas: 'image',
				datatype: 'hyperlink', link: '/CMDHIST', modal: false, data: 'row', updateField: 'row',
				onLaunchClick: this.historyLaunchClick
			},

			{
				fieldName:this.translateService.translate('dmnmain.recentdeployment'), field: 'deployDatetime', editable: false, width: 150,
				datatype: 'dateTime'
			},

			{
				fieldName: this.translateService.translate('dmnmain.lastsaved'), field: 'modifyDatetime', editable: false, width: 150,
				datatype: 'dateTime'
			},
			{
				fieldName: this.translateService.translate('dmnmain.createduser'), field: 'createUserId', editable: false, width: 150,
				datatype: 'text', uppercase: 'false'
			},
			{
				fieldName: this.translateService.translate('dmnmain.modifieduser'), field: 'modifyUserId', editable: false, width: 150,
				datatype: 'text', uppercase: 'false'
			},
		];

		this.dmnsExecuteQuery();
	}

	dmnLaunchClick = (data) => {
		if (data) {
			this.bpmnModulerService.dmnRowData = data;
		}
		return true;
	}

	setEncoded(data, name) {
		const encodedData = encodeURIComponent(data);
		if (data) {
		}
	}
	canCellEdit = (data: any, index: number, field: string): boolean => {
		if (!data.decisionId) {
		  return true;
		} else {
		  return false;
		}
	
	
	  }
	getxml() {
		this.dmnJS.saveXML({ format: true }, (err, xml) => {
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
					var parsedXml = this.domParser.parseFromString(data.dmn, 'text/xml');
					var elements = parsedXml.getElementsByTagName('decision');
					if (elements.length > 0) {
						for (var i = 0; i < elements.length; i++) {
							if (elements[i].getAttribute('name')!=null && elements[i].getAttribute('name') != data.definitionDesc) {
								data.definitionDesc=elements[i].getAttribute('name');
							}
						}
					}
					this.dmnUpdateList[0] = data;
					this.dmnCommitModel.updateList = [];
			if (this.dmnUpdateList.length > 0) {
				this.dmnUpdateList.forEach(obj => {
					obj.dmn = this.xmlTemp;
					obj.deployUserId = this.sessionManager.getId();
					obj.deployDatetime = DateFormat.getDate();
				})
				this.dmnCommitModel.updateList = this.dmnUpdateList;
			}
			const processSaveData = this.processFactory.deployeDmn(this.dmnCommitModel);
			processSaveData.subscribe(data => {
				if (data === 1) {
					this.dmnsExecuteQuery();
					this.type = 'success';
					this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
					this.show();
				} else {
					this.type = 'success';
					this.message = this.translateService.translate('common.addupdateremoverecordfailed');
					this.show();
				}
			});
		}
		return true;
	}

	historyLaunchClick = (data) => {
		if (data) {
			this.cmdhistService.bpmnViewer = false;
			this.cmdhistService.dmnViewer = true;
			this.cmdhistService.cmnBpmnViewer=false;
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
		if (event !== undefined) {
			this.processModel = event;
		}
		
	}

	dmnsExecuteQuery() {
		const serviceObj = this.processFactory.dmnsExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.dmnsData = [];
				this.tableIndex = -1;
			} else {
				this.tableIndex = 0;
				this.dmnsData = data;
				this.dmnsData.forEach(obj => {
					obj['button'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
					if (obj.deployFlag == 'Y') {
						obj['deploye'] = 'assets/icons/eoff_icons/deploy.png';
					}
					if (obj.historyFlag == 'Y') {
						obj['history'] = 'assets/icons/eoff_icons/version.png';
					}
				})
				this.processModel = data[0];
			}
		});
	}

	dmnCommit(event) {
		this.dmnInsertList = event.added
		this.dmnUpdateList = event.updated
		this.dmnDeleteList = event.removed
		this.dmnCommitModel.insertList = [];
		this.dmnCommitModel.updateList = [];
		this.dmnCommitModel.deleteList = [];
		if(this.dmnsValidation()){
			this.type = 'warn';
			this.message = this.translateService.translate('dmnmain.duplicatedmndesc');
			this.show();
			return;

		}
		if(!this.validateInsertList()){
			return;
		}
		
		if (this.dmnInsertList.length > 0) {
			this.dmnInsertList.forEach(obj => {
				obj.createUserId = this.sessionManager.getId();
				obj.createDatetime = DateFormat.getDate();
				obj.definitionDesc = obj.definitionDesc.trim();
			})
			this.dmnCommitModel.insertList = this.dmnInsertList;
		}
		if (this.dmnUpdateList.length > 0) {
			this.dmnUpdateList.forEach(obj => {
				obj.modifyUserId = this.sessionManager.getId();
				obj.modifyDatetime = DateFormat.getDate();
			})
			this.dmnCommitModel.updateList = this.dmnUpdateList;
		}
		if (this.dmnDeleteList.length > 0) {
			this.dmnCommitModel.deleteList = this.dmnDeleteList;
		}
		this.dmnCommitModel.sourceModule='DMNMAIN';
		const dmnSaveData = this.processFactory.dmnCommit(this.dmnCommitModel);
		dmnSaveData.subscribe(data => {
			if (data === 1) {
				this.dmnsExecuteQuery();
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


	validateInsertList(){ 
		const is = { valid: true };
		if (this.dmnInsertList.length > 0) {
			this.dmnInsertList.forEach(element => {
				if (!element.category) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.selectcategory');
					this.show();
					is.valid = false;
                   return;
				}
			})
		}
		return is.valid;
	}
	onGridInsert = () => {
		if(this.dmnsValidation()){
			this.type = 'warn';
			this.message = this.translateService.translate('dmnmain.duplicatedmndesc');
			this.show();
			return false;
		}
		return {};
	}

	dmnsValidation(){
		if (this.dmnsData.length > 0) {
			for (let i = 0; i < this.dmnsData.length; i++) {
				for(let j = i+1; j < this.dmnsData.length; j++) {
					if(this.dmnsData[i].definitionDesc.trim() === this.dmnsData[j].definitionDesc.trim()){
						return true;
					}
				}
				}
			
		}
      return false;

	}
}

