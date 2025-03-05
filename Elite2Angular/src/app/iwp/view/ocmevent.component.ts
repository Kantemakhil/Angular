import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmeventService } from '../service/ocmevent.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { EventMeasures } from '../beans/EventMeasures';
import { EventMeasureOutcomes } from '../beans/EventMeasureOutcomes';
import { EventMeasuresCommitBean } from '../beans/EventMeasuresCommitBean';
import { EventMeasureOutcomesCommitBean } from '../beans/EventMeasureOutcomesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
	selector: 'app-ocmevent',
	templateUrl: './ocmevent.component.html'
})

export class OcmeventComponent implements OnInit {
	@ViewChild('outcomeGrid') outcomeGrid: any;
	@ViewChild('scheduleGrid') scheduleGrid: any;
	// Variable declaration
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	scheduleData: EventMeasures[] = [];
	scheduleDataTemp: EventMeasures[] = [];
	// TODO angular.copy(this.scheduleData, thisscheduleDataTemp);
	scheduleModel: EventMeasures = new EventMeasures();
	scheduleIndex: number = 0;
	scheduleInsertList: EventMeasures[] = [];
	scheduleUpdatetList: EventMeasures[] = [];
	scheduleDeleteList: EventMeasures[] = [];
	scheduleCommitModel: EventMeasuresCommitBean = new EventMeasuresCommitBean();
	outcomeData: EventMeasureOutcomes[] = [];
	outcomeDataTemp: EventMeasureOutcomes[] = [];
	// TODO angular.copy(this.outcomeData, thisoutcomeDataTemp);
	outcomeModel: EventMeasureOutcomes = new EventMeasureOutcomes();
	outcomeIndex: number = 0;
	outcomeInsertList: EventMeasureOutcomes[] = [];
	outcomeUpdatetList: EventMeasureOutcomes[] = [];
	outcomeDeleteList: EventMeasureOutcomes[] = [];
	outcomeCommitModel: EventMeasureOutcomesCommitBean = new EventMeasureOutcomesCommitBean();
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	scheduleColumnDef: any[];
	outcomeColumnDef: any[];
	scheduleReadOnly: boolean = false;
	outcomeReadOnly: boolean = false;
	rgtypeRg: any[] = [];
	rgsubtypeRg: any[] = [];
	rgstaticRg: any[] = [];
	rgoutcomecodeRg: any[] = [];
	msglist: any[];
	message: any;
	type: any;
	index: any;
	scheduleinsertList: any;
	scheduleupdateList: any;
	scheduledeleteList: any;

	schedulealertUpdateList: any;
	scheduleUpdateList: any;
	schedulemodel: any;
	outcomeinsertList: any;
	outcomeupdateList: any;
	outcomedeleteList: any;
	outcomealertUpdateList: any;
	outcomeUpdateList: any;

	scheduleDelete: boolean
	outcomeInsert: boolean;
	outcomeDelete: boolean;
	scheduleTableIndex: number;
	outcomeTableIndex: number;

	constructor(private ocmeventFactory: OcmeventService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		this.scheduleColumnDef = [];
		this.outcomeColumnDef = [];
	}
	ngOnInit() {
		this.scheduleExecuteQuery();

		this.scheduleColumnDef = [
			{
				fieldName: this.translateService.translate('common.scheduletype') + '*', field: 'eventType', datatype: 'lov',
				domain:'EVENTS'/*link: 'ocmevent/rgTypeRecordGroup'*/, editable: true, cellEditable: this.scheduleEditable, width: 150
			},
			{
				fieldName: this.translateService.translate('ocmevent.scheduleSubType') + '*', field: 'eventSubType', datatype: 'lov',
				domain:'EVENTS',
				// link: "ocmevent/rgSubTypeRecordGroup?eventType=",
				 parentField: 'eventType', editable: true, cellEditable: this.scheduleEditable, width: 150
			},
			{
				fieldName: this.translateService.translate('ocmevent.standards') + '*', field: 'measuresStandardFlag', datatype: 'lov',
				domain:'FLAG'/*link: "ocmevent/rgStaticRecordGroup"*/, editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', datatype: 'number',
				editable: true, minValue: 0.00, maxValue: 999999.99, whole: true, width: 150
			},
			{
				fieldName: this.translateService.translate('common.active') + '*', field: 'activeFlag', datatype: 'lov',
				domain:'FLAG'/*link: "ocmevent/rgStaticRecordGroup"*/, editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('ocmevent.update') + '*', field: 'updateAllowedFlag', datatype: 'lov',
				domain:'FLAG'/*link: "ocmevent/rgStaticRecordGroup"*/, editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', datatype: 'date',
				editable: false, width: 150
			},
			{
                fieldName: this.translateService.translate('Email Flag'), field: 'emailFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
			{
                fieldName: this.translateService.translate('Sms Flag'), field: 'smsFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
			{
                fieldName: this.translateService.translate('Non-association Flag'), field: 'nonAssociationFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
			
			{
                fieldName: this.translateService.translate('Sanctions Flag'), field: 'sanctionsFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },

			{ fieldName: '', field: 'eventType', hide: true },
		];

		this.outcomeColumnDef = [
			{
				fieldName: this.translateService.translate('ocmevent.outcomeCode') + '*', field: 'outcomeCode', datatype: 'lov',
				// link: 'ocmevent/rgOutcomeCodeRecordGroup',
				domain:'OUTCOMES',
				 editable: true, cellEditable: this.outcomeEditable, width: 150
			},
			{
				fieldName: this.translateService.translate('ocmevent.setCounter') + '*', field: 'setCounterFlag', datatype: 'lov',
				domain:'FLAG'/*link: "ocmevent/rgStaticRecordGroup"*/, editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('ocmevent.prompt') + '*', field: 'promptUserFlag', datatype: 'lov',
				domain:'FLAG'/*link: "ocmevent/rgStaticRecordGroup"*/, editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('ocmevent.updateOnContactLog') + '*', field: 'updateOnContactLog', datatype: 'lov',
				domain:'FLAG'/*link: "ocmevent/rgStaticRecordGroup"*/, editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', datatype: 'number',
				editable: true, minValue: 0.00, maxValue: 9999999.99, whole: true, width: 150
			},
			{
				fieldName: this.translateService.translate('common.active') + '*', field: 'activeFlag', datatype: 'lov',
				domain:'FLAG'/*link: "ocmevent/rgStaticRecordGroup"*/, editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('ocmevent.update') + '*', field: 'updateAllowedFlag', datatype: 'lov',
				domain:'FLAG'/*link: "ocmevent/rgStaticRecordGroup"*/, editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', datatype: 'date',
				editable: false, width: 150
			},
			{
                fieldName: this.translateService.translate('Cancel Flag'), field: 'cancelFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
		];
		var serviceObj;
	}

	/** 
	 * This function displays the messages
	 */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	onRowClickSchedule(event) {
		if(event !== undefined){
			this.scheduleModel = event;
		}
		if (event.createDatetime || event.createDatetime !== undefined) {
			this.outcomeInsert = true;
			this.scheduleDelete = true;
		} else {
			this.outcomeInsert = false;
			this.scheduleDelete = false;
		}
		this.outcomeExecuteQuery();
	}
	onRowClickOutcome(event) {
		if(event !== undefined){
			this.outcomeModel = event;
		}
		if (event.createDatetime || event.createDatetime !== undefined) {
			this.outcomeDelete = true;
		} else {
			this.outcomeDelete = false;
		}
	
	}

	onScheduleGridDelete = () => {
		if (this.outcomeData.length !== 0 || this.outcomeGrid.removedMap.size > 0) {
			this.type = 'warn';
			this.message = this.translateService.translate('common.cannotdeletemaster');
			this.show();
			return;
		}
		return true;
	}

	scheduleEditable = (data: any, index: number, field: string): boolean => {
		if (!this.scheduleModel.createDatetime) {
			return true;
		} else {
			return false;
		}
	}

	outcomeEditable = (data: any, index: number, field: string): boolean => {
		if (!this.outcomeModel.createDatetime) {
			return true;
		} else {
			return false;
		}
	}

	validateScheduleRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		const rowIndex = this.scheduleData.indexOf(event.data);
		if(event.field === 'activeFlag' && event.data.activeFlag === 'N' && event.newValue !== event.oldValue) {
			this.scheduleGrid.setColumnData('expiryDate', rowIndex,
					DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
			rowdata.validated = true;
			return rowdata;
		} else if (event.field === 'activeFlag' && event.data.activeFlag === 'Y' && event.newValue !== event.oldValue){
			this.scheduleGrid.setColumnData('expiryDate', rowIndex, undefined);
			rowdata.validated = true;
			return rowdata;
		} else if (event.field === 'eventType'){
			this.scheduleGrid.setColumnData('eventSubType', rowIndex, undefined);
			rowdata.validated = true;
			return rowdata;
		} else {
			rowdata.validated = true;
			return rowdata;
		}

	}

	validateOutcomeRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		const rowIndex = this.outcomeData.indexOf(event.data);
		if(event.field === 'activeFlag' && event.data.activeFlag === 'N' && event.newValue !== event.oldValue) {
			this.outcomeGrid.setColumnData('expiryDate', rowIndex,
					DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
			rowdata.validated = true;
			return rowdata;
		} else if(event.field === 'activeFlag' && event.data.activeFlag === 'Y' && event.newValue !== event.oldValue){
			this.outcomeGrid.setColumnData('expiryDate', rowIndex, undefined);
			rowdata.validated = true;
			return rowdata;
		} else {
			rowdata.validated = true;
			return rowdata;
		}
	}

	scheduleExecuteQuery() {
		const serviceObj = this.ocmeventFactory.scheduleExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.scheduleData = [];
				this.scheduleTableIndex = -1;
			} else {
				this.scheduleTableIndex = 0;				
				data.forEach(element => {
				element.emailFlag = element.emailFlag === 'Y' ? true : false;
				element.smsFlag = element.smsFlag === 'Y' ? true : false;
				element.nonAssociationFlag = element.nonAssociationFlag === 'Y' ? true : false;
				element.sanctionsFlag = element.sanctionsFlag === 'Y' ? true : false;
				
				});
				this.scheduleData = data;
				this.scheduleModel = data[0];
				this.outcomeExecuteQuery();
			}
		});
	}

	populateScheduleDetails() {
		const serviceObj = this.ocmeventFactory.scheduleExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.scheduleData = [];
				this.scheduleTableIndex = -1;
			} else {
				data.forEach(element => {
					element.emailFlag = element.emailFlag === 'Y' ? true : false;
					element.smsFlag = element.smsFlag === 'Y' ? true : false;
					element.nonAssociationFlag = element.nonAssociationFlag === 'Y' ? true : false;
					element.sanctionsFlag = element.sanctionsFlag === 'Y' ? true : false;
					});
				this.scheduleData = data;
				this.scheduleModel = data[0];
				this.scheduleTableIndex = 0;
			}
		});
	}

	savescheduleForm(event) {
		this.scheduleInsertList = event.added
		this.scheduleUpdateList = event.updated
		this.scheduleDeleteList = event.removed
		this.scheduleCommitModel.insertList = [];
		this.scheduleCommitModel.updateList = [];
		this.scheduleCommitModel.deleteList = [];
		if (this.scheduleInsertList.length > 0) {
			if (!this.scheduleValidate(this.scheduleData)) {
				return;
			}
			for (let i = 0; i < this.scheduleInsertList.length; i++) {
				this.scheduleInsertList[i].createDate = new Date();
				this.scheduleInsertList[i].emailFlag =this.scheduleInsertList[i].emailFlag ? 'Y' : 'N';
				this.scheduleInsertList[i].smsFlag =this.scheduleInsertList[i].smsFlag ? 'Y' : 'N';
				this.scheduleInsertList[i].nonAssociationFlag =this.scheduleInsertList[i].nonAssociationFlag ? 'Y' : 'N';
				this.scheduleInsertList[i].sanctionsFlag =this.scheduleInsertList[i].sanctionsFlag ? 'Y' : 'N';
			}
			this.scheduleCommitModel.insertList = this.scheduleInsertList;
		}
		if (this.scheduleUpdateList.length > 0) {
			if (!this.scheduleValidate(this.scheduleData)) {
				return;
			}
			for (let i = 0; i < this.scheduleUpdateList.length; i++) {
				this.scheduleUpdateList[i].emailFlag =this.scheduleUpdateList[i].emailFlag ? 'Y' : 'N';
				this.scheduleUpdateList[i].smsFlag =this.scheduleUpdateList[i].smsFlag ? 'Y' : 'N';
				this.scheduleUpdateList[i].nonAssociationFlag =this.scheduleUpdateList[i].nonAssociationFlag ? 'Y' : 'N';
				this.scheduleUpdateList[i].sanctionsFlag =this.scheduleUpdateList[i].sanctionsFlag ? 'Y' : 'N';
			}
			this.scheduleCommitModel.updateList = this.scheduleUpdateList;
		}
		if (this.scheduleDeleteList.length > 0) {
			this.scheduleCommitModel.deleteList = this.scheduleDeleteList;
		}
		const scheduleSaveData = this.ocmeventFactory.scheduleCommit(this.scheduleCommitModel);
		scheduleSaveData.subscribe(data => {
			if (data === 1) {
				this.populateScheduleDetails();
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

	outcomeExecuteQuery() {
		this.outcomeModel.eventMeasureId = this.scheduleModel.eventMeasureId
		const outcomeResult = this.ocmeventFactory.outcomeExecuteQuery(this.outcomeModel);
		outcomeResult.subscribe(data => {
			if (data.length === 0) {
				this.outcomeData = [];
				this.outcomeTableIndex = -1;
			} else {
				this.outcomeTableIndex = 0;
				data.forEach(element => {
					element.cancelFlag = element.cancelFlag === 'Y' ? true : false;
					});
				this.outcomeData = data;
				
				this.outcomeModel = data[0];
			}
		});
	}

	/**
	* This function will be executed when commit event is
	* fired
	*/
	saveoutcomeForm(event) {
		this.outcomeInsertList = event.added
		this.outcomeUpdateList = event.updated
		this.outcomeDeleteList = event.removed
		this.outcomeCommitModel.insertList = [];
		this.outcomeCommitModel.updateList = [];
		this.outcomeCommitModel.deleteList = [];
		if (this.outcomeInsertList.length > 0) {
			if (!this.outcomeValidate(this.outcomeData)) {
				return;
			}
			for (let i = 0; i < this.outcomeInsertList.length; i++) {
				this.outcomeInsertList[i].eventMeasureId = this.scheduleModel.eventMeasureId;
				this.outcomeInsertList[i].createDate = new Date();
				this.outcomeInsertList[i].cancelFlag =this.outcomeInsertList[i].cancelFlag ? 'Y' : 'N';
			}
			this.outcomeCommitModel.insertList = this.outcomeInsertList;
		}
		if (this.outcomeUpdateList.length > 0) {
			if (!this.outcomeValidate(this.outcomeData)) {
				return;
			}
			for (let i = 0; i < this.outcomeUpdateList.length; i++) {
				this.outcomeUpdateList[i].cancelFlag =this.outcomeUpdateList[i].cancelFlag ? 'Y' : 'N';
			}			
			this.outcomeCommitModel.updateList = this.outcomeUpdateList;
		}
		if (this.outcomeDeleteList.length > 0) {
			this.outcomeCommitModel.deleteList = this.outcomeDeleteList;
		}
		const outcomeSaveData = this.ocmeventFactory.outcomeCommit(this.outcomeCommitModel);
		outcomeSaveData.subscribe(data => {
			if (data === 1) {
				this.outcomeExecuteQuery();
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

	onScheduleGridInsert = () => {
		if (this.scheduleValidate(this.scheduleData)) {
			this.scheduleModel= new EventMeasures();
			return {
				measuresStandardFlag: 'Y',
				activeFlag: 'Y',
				updateAllowedFlag: 'Y'
			};
		}
	}

	scheduleValidate(scheduleData: any) {
		try {
			scheduleData.forEach((element) => {
				if (!element.eventType || element.eventType == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterEventType');
					this.show();
					throw new Error();
				} else if (!element.eventSubType || element.eventSubType == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterEventSubType');
					this.show();
					throw new Error();
				} else if (!element.measuresStandardFlag || element.measuresStandardFlag == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterStandards');
					this.show();
					throw new Error();
				} else if (!element.activeFlag || element.activeFlag == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterActive');
					this.show();
					throw new Error();
				} else if (!element.updateAllowedFlag || element.updateAllowedFlag == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterUpdate');
					this.show();
					throw new Error();
				}
			});
			for (let i = 0; i < scheduleData.length; i++) {
				for (let j = i + 1; j < scheduleData.length; j++) {
					if (scheduleData[i].eventType === scheduleData[j].eventType && scheduleData[i].eventSubType === scheduleData[j].eventSubType) {
						this.type = 'warn';
						this.message = this.translateService.translate('ocmevent.eventCombinationExists');
						this.show();
						throw new Error();
					}
				}
			}
		} catch (e) {
			return false;
		}
		return true;
	}

	onOutcomeGridInsert = () => {
		if (this.outcomeValidate(this.outcomeData)) {
			this.outcomeModel = new EventMeasureOutcomes();
			return {
				setCounterFlag: 'Y',
				promptUserFlag: 'Y',
				updateOnContactLog: 'Y',
				activeFlag: 'Y',
				updateAllowedFlag: 'Y'
			};
		}
	}

	outcomeValidate(outcomeData: any) {
		try {
			if (!this.scheduleModel.eventType || this.scheduleModel.eventType == undefined) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocmevent.enterEventType');
				this.show();
				throw new Error();
			} else if (!this.scheduleModel.eventSubType || this.scheduleModel.eventSubType == undefined) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocmevent.enterEventSubType');
				this.show();
				throw new Error();
			} else if (!this.scheduleModel.measuresStandardFlag || this.scheduleModel.measuresStandardFlag == undefined) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocmevent.enterStandards');
				this.show();
				throw new Error();
			} else if (!this.scheduleModel.activeFlag || this.scheduleModel.activeFlag == undefined) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocmevent.enterActive');
				this.show();
				throw new Error();
			} else if (!this.scheduleModel.updateAllowedFlag || this.scheduleModel.updateAllowedFlag == undefined) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocmevent.enterUpdate');
				this.show();
				throw new Error();
			}
			outcomeData.forEach((element) => {
				if (!element.outcomeCode || element.outcomeCode == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterOutcome');
					this.show();
					throw new Error();
				} else if (!element.setCounterFlag || element.setCounterFlag == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterSetCounter');
					this.show();
					throw new Error();
				} else if (!element.promptUserFlag || element.promptUserFlag == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterPrompt');
					this.show();
					throw new Error();
				} else if (!element.updateOnContactLog || element.updateOnContactLog == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterContactLog');
					this.show();
					throw new Error();
				} else if (!element.activeFlag || element.activeFlag == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterActive');
					this.show();
					throw new Error();
				} else if (!element.updateAllowedFlag || element.updateAllowedFlag == undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocmevent.enterUpdate');
					this.show();
					throw new Error();
				}
			});
			for (let i = 0; i < outcomeData.length; i++) {
				for (let j = i + 1; j < outcomeData.length; j++) {
					if (outcomeData[i].outcomeCode === outcomeData[j].outcomeCode) {
						this.type = 'warn';
						this.message = this.translateService.translate('ocmevent.outcomeCodeExists');
						this.show();
						throw new Error();
					}
				}
			}
		} catch (e) {
			return false;
		}
		return true;
	}
}
