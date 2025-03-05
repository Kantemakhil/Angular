import { DateFormat } from '../../../core/ui-components/datepicker/dateFormat';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ProsmainService } from '../service/prosmain.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { BpmnProcessCommitBean } from '../beans/BpmnProcessCommitBean';
import { BpmnProcess } from '../beans/BpmnProcess';
import { BpmnModulerService } from '@core/ui-components/bpmn-moduler/bpmn-moduler.service';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import { CmdhistService } from '../service/cmdhist.service';
import { ProsdeacService } from '../service/prosdeac.service';

@Component({
	selector: 'app-prosdeac',
	templateUrl: './prosdeac.component.html'
})

export class ProsdeacComponent implements OnInit {
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
	processColumnDef: any[];
	processTableIndex: number;
	processDeacData: BpmnProcess[] = [];
	processDeacDataTemp: BpmnProcess[] = [];
	processDeacModel: BpmnProcess = new BpmnProcess();
	processDeacColumnDef: any[];
	tableIndex: number;
	xmlTemp: string;
	@ViewChild('processDeacGrid', { static: false }) processDeacGrid;
	selectedRecord: any;

	constructor(private processFactory: ProsdeacService, public translateService: TranslateService,
		public sessionManager: UserSessionManager, private dialogService: DialogService, private bpmnModulerService: BpmnModulerService,
		private cmdhistService: CmdhistService) {
		this.processColumnDef = [];
		this.processDeacColumnDef = [];
	}
	ngOnInit() {
		this.processColumnDef = [
			{
				fieldName: this.translateService.translate('prosdeac.process'), field: 'processDesc', editable: false, width: 150,
				datatype: 'text', uppercase: 'false'
			}
		];

		this.processDeacColumnDef = [
			{
				fieldName: this.translateService.translate('cmdhist.version'), field: 'defVersion', editable: false, width: 150,
				datatype: 'text', uppercase: 'false'
			},
			{
				fieldName: this.translateService.translate('prosmain.bpmnfile'), field: 'button', editable: true, width: 150, displayas: 'image',
				datatype: 'hyperlink', link: '/OUMCAMBPMN', modal: false, data: 'row', updateField: 'row',
				onLaunchClick: this.bpmnLaunchClick
			},
			{
				fieldName: this.translateService.translate('prosdeac.suspend'), field: 'suspendButton', editable: true, width: 220, datatype: 'hyperlink', onLaunchClick: this.suspendProcess,
				displayas: 'image', modal: false, updateField: 'row', data: 'row', dialogWidth: '80%', height: '80%',
			},
			{
				fieldName: this.translateService.translate('prosdeac.activate'), field: 'activateButton', editable: true, width: 220, datatype: 'hyperlink', onLaunchClick: this.activateProcess,
				displayas: 'image', modal: false, updateField: 'row', data: 'row', dialogWidth: '80%', height: '80%',
			},
			{
				fieldName: this.translateService.translate('prosdeac.delete'), field: 'deleteButton', editable: true, width: 220, datatype: 'hyperlink', onLaunchClick: this.deleteProcess,
				displayas: 'image', modal: false, updateField: 'row', data: 'row', dialogWidth: '80%', height: '80%',
			},
		];

		this.processDeacExecuteQuery();
	}

	bpmnLaunchClick = (data) => {
		if (data) {
			this.bpmnModulerService.bpmnRowData = data;
			this.bpmnModulerService.routeTo = 'PROSDEAC';
		}
		return true;
	}

	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}

	onProcessRowClick(event) {
		if (event !== undefined) {
			const bpmnProcessList = [];
			this.processModel = event;
			this.processDeacDataTemp.forEach(obj => {
				if (this.processModel.processDesc === obj.processDesc) {
					bpmnProcessList.push(obj);
				}
			});
			this.processDeacData = bpmnProcessList;
			this.processDeacModel = this.processDeacData[0];
		} else {
			this.processDeacData = [];
			this.processDeacModel = new BpmnProcess();
		}
	}

	onRowClick(event) {
		if (event !== undefined) {
			this.processDeacModel = event;
		}
	}

	processDeacExecuteQuery() {
		const serviceObj = this.processFactory.processDeacExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.processData = [];
				this.processDataTemp = [];
				this.processTableIndex = -1;
			} else {
				this.processTableIndex = 0;
				this.processDataTemp = data;
				let tempData = [];
				this.processDataTemp.forEach(obj => {
					if (obj.status === 'ACTIVE') {
						obj['suspendButton'] = 'assets/icons/eoff_icons/pause_FILL0_wght400_GRAD0_opsz24.png';
						obj['activateButton'] = ''
					} else {
						obj['activateButton'] = 'assets/icons/eoff_icons/resume_FILL0_wght400_GRAD0_opsz24.png';
						obj['suspendButton'] = '';
					}
					obj['button'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
					obj['deleteButton'] = 'assets/icons/eoff_icons/delete_FILL0_wght400_GRAD0_opsz24.png';
					tempData.push(obj);
				})
				this.processDeacDataTemp = tempData;
				const bpmnProcessList = [];
				tempData.forEach(obj => {
					var count = 0
					if (bpmnProcessList.length > 0) {
						bpmnProcessList.forEach(obj1 => {
							if (obj.processDesc === obj1.processDesc) {
								count++
							}
						});
						if (count === 0) {
							bpmnProcessList.push(obj);
						}
					} else {
						bpmnProcessList.push(obj);
					}
				});

				this.processData = bpmnProcessList;
				this.processModel = this.processData[0];
			}
		});
	}

	suspendProcess = (event) => {
		const bpmnProcess = new BpmnProcess();
		bpmnProcess.procDefId = event.procDefId;
		const serviceObj = this.processFactory.suspendProcess(event);
		serviceObj.subscribe(data => {
			if (data === 1) {
				this.processDeacExecuteQuery();
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		})
	}

	activateProcess = (event) => {
		const bpmnProcess = new BpmnProcess();
		bpmnProcess.procDefId = event.procDefId;
		const serviceObj = this.processFactory.activateProcess(event);
		serviceObj.subscribe(data => {
			if (data === 1) {
				this.processDeacExecuteQuery();
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		})
	}

	deleteProcess = (event) => {
		const bpmnProcess = new BpmnProcess();
		bpmnProcess.procDefId = event.procDefId;
		const serviceObj = this.processFactory.deleteProcess(event);
		serviceObj.subscribe(data => {
			if (data === 1) {
				this.processDeacExecuteQuery();
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('procdeac.cannotdeleteprocesswithusertask');
				this.show();
			}
		})
	}
}

