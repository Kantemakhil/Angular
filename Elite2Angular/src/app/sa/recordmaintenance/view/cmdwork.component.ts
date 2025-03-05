import { BpmnProcess } from './../beans/moduleTriggers';
import { ProsmainService } from '@sa/recordmaintenance/service/prosmain.service';
import {
	Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CmdworkService } from '../service/cmdwork.service';
import { WorkItems } from '../beans/WorkItems';
import { WorkItemsCommitBean } from '../beans/WorkItemsCommitBean';
import { BpmnModulerService } from '@core/ui-components/bpmn-moduler/bpmn-moduler.service';

@Component({
	selector: 'app-cmdwork',
	templateUrl: './cmdwork.component.html'
})

export class CmdworkComponent implements OnInit {

	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];

	msglist: any[];
	message: any;
	type: any;

	workItemColumnDef: any[];
	workItemModel: WorkItems = new WorkItems();
	workItemData: WorkItems[] = [];
	workItemInsertList: WorkItems[] = [];
	workItemUpdateList: WorkItems[] = [];
	workItemDeleteList: WorkItems[] = [];
	workItemCommitModel: WorkItemsCommitBean = new WorkItemsCommitBean();
	workItemDelete: boolean;
	workItemTableIndex: number;
	moduleTitles = {
		'description': 'Trigger',
		'moduleName': 'Module'
	}
	processLovMap: Map<string, string> = new Map<string, string>();
	triggerLovMap: Map<string, string> = new Map<string, string>();
	constructor(private cmdworkFactory: CmdworkService, public translateService: TranslateService,
		public sessionManager: UserSessionManager, private prosmainService: ProsmainService,
		private bpmnModulerService: BpmnModulerService) {
		this.workItemColumnDef = [];

	}
	ngOnInit() {

		this.workItemColumnDef = [
			{
				fieldName: this.translateService.translate('cmdwork.triggername'), field: 'triggerDesc', datatype: 'text',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('cmdwork.process'),
				field: 'processDesc', datatype: 'hyperlink', displayas: 'href', link: '/OUMCAMBPMN', onLaunchClick: this.onProcessClick
				, modal: false, data: 'row', updateField: 'row', queryparam: 'process', editable: false, width: 150
			},
			/* {
				fieldName: this.translateService.translate('cmdwork.process'), field: 'process', datatype: 'lov',
				link: "cmdwork/rgProcessRecordGroup", editable: false, width: 150
			}, */
			{
				fieldName: this.translateService.translate('cmdwork.addtrigger'), field: 'addTriggerFlag', datatype: 'checkbox',
				maxlength: 1, editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('cmdwork.updatetrigger'), field: 'updateTriggerFlag', datatype: 'checkbox',
				maxlength: 1, editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('cmdwork.deletetrigger'), field: 'deleteTriggerFlag', datatype: 'checkbox',
				maxlength: 1, editable: true, width: 150
			},
		];

		const processLovList = this.cmdworkFactory.getProcessLovDetail();
		processLovList.subscribe(list => {
			list.forEach(obj => {
				this.processLovMap.set(obj.code, obj.description);
			});
			this.cmdworkFactory.getTriggerLovDetail().subscribe(list => {
				list.forEach(obj => {
					this.triggerLovMap.set(obj.code, obj.description);
				});
				this.workItemsExecuteQuery();
			});
		});

		this.workItemDelete = false;
	}

	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}

	onRowClickWorkItem(event) {
		if (event !== undefined) {
			this.workItemModel = event;
			
		}
		if (event) {
			if (event.createDatetime || event.createDatetime !== undefined) {
				this.workItemDelete = true;
			} else {
				this.workItemDelete = false;
			}
		}

	}

	workItemsExecuteQuery() {
		const serviceObj = this.cmdworkFactory.workItemsExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.workItemData = [];
				this.workItemTableIndex = -1;
			} else {
				this.workItemTableIndex = 0;
				this.workItemData = data;
				this.workItemData.forEach((element) => {
					if (element.addTrigger === 'Y') {
						element.addTriggerFlag = true;
					}
					if (element.updateTrigger === 'Y') {
						element.updateTriggerFlag = true;
					}
					if (element.deleteTrigger === 'Y') {
						element.deleteTriggerFlag = true;
					}
					element.processDesc = this.processLovMap.get(String(element.process));
					element.triggerDesc = this.triggerLovMap.get(element.triggerId);
				});
				this.workItemModel = data[0];
			}
		});
	}

	commitWorkItems(event) {
		this.workItemInsertList = event.added
		this.workItemUpdateList = event.updated
		this.workItemDeleteList = event.removed
		this.workItemCommitModel.insertList = [];
		this.workItemCommitModel.updateList = [];
		this.workItemCommitModel.deleteList = [];
		if (this.workItemInsertList.length > 0) {
			this.workItemInsertList = this.flagConvertion(this.workItemInsertList);
			this.workItemCommitModel.insertList = this.workItemInsertList;
		}
		if (this.workItemUpdateList.length > 0) {
			this.workItemUpdateList = this.flagConvertion(this.workItemUpdateList);
			this.workItemCommitModel.updateList = this.workItemUpdateList;
		}
		if (this.workItemDeleteList.length > 0) {
			this.workItemCommitModel.deleteList = this.workItemDeleteList;
		}
		const scheduleSaveData = this.cmdworkFactory.commitWorkItems(this.workItemCommitModel);
		scheduleSaveData.subscribe(data => {
			if (data === 1) {
				this.workItemsExecuteQuery();
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

	flagConvertion(workItemsList: any) {
		workItemsList.forEach((element) => {
			element.addTrigger = element.addTriggerFlag ? 'Y' : 'N';
			element.updateTrigger = element.updateTriggerFlag ? 'Y' : 'N';
			element.deleteTrigger = element.deleteTriggerFlag ? 'Y' : 'N';
		});
		return workItemsList;
	}

	onWorkItemGridInsert = () => {
		return {};
	}

	onProcessClick = (event) => {
		if (event) {
			if (!this.bpmnModulerService.bpmnRowData) {
				this.bpmnModulerService.bpmnRowData=new BpmnProcess();
			}
			this.bpmnModulerService.bpmnRowData.processDesc = event.processDesc;
			this.bpmnModulerService.routeTo = 'CMDWORK';
			return true;
		}

	}



}
