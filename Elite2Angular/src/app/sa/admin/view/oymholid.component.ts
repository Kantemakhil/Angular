import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OymholidService } from '../service/oymholid.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SystemEvents } from '@inmate/payroll/maintenance/beans/SystemEvents';
import { CaseloadGrpHolCompens } from '../beans/CaseloadGrpHolCompens';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { CaseloadGrpHolCompensCommitBean } from '../beans/CaseloadGrpHolCompensCommitBean';
import { SystemEventsCommitBean } from '@inmate/payroll/maintenance/beans/SystemEventsCommitBean';

@Component({
	selector: 'app-oymholid',
	templateUrl: './oymholid.component.html'
})

export class OymholidComponent implements OnInit {
	@ViewChild('sysEventGrid', {static: true}) sysEventGrid: any;
	@ViewChild('csldghcGrid', {static: true}) csldghcGrid: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	syseventData: SystemEvents[] = [];
	syseventDataTemp: SystemEvents[] = [];
	syseventModel: SystemEvents = new SystemEvents();
	syseventCommitModel: SystemEventsCommitBean = new SystemEventsCommitBean();
	syseventIndex: number = 0;
	syseventInsertList: SystemEvents[] = [];
	syseventUpdatetList: SystemEvents[] = [];
	syseventDeleteList: SystemEvents[] = [];
	genSyseventInsertList: SystemEvents[] = [];
	genSyseventupdateList: SystemEvents[] = [];
	genSyseventDeleteList: SystemEvents[] = [];
	csldghcDataTemp: CaseloadGrpHolCompens[] = [];
	csldghcData: CaseloadGrpHolCompens[] = [];
	csldghcModel: CaseloadGrpHolCompens = new CaseloadGrpHolCompens();
	csldghcTemp: CaseloadGrpHolCompens = new CaseloadGrpHolCompens();
	csldghcCommitModel: CaseloadGrpHolCompensCommitBean = new CaseloadGrpHolCompensCommitBean();
	csldghcIndex: number = 0;
	csldghcInsertList: CaseloadGrpHolCompens[] = [];
	csldghcUpdatetList: CaseloadGrpHolCompens[] = [];
	csldghcDeleteList: CaseloadGrpHolCompens[] = [];
	genCsldghcInsertList: CaseloadGrpHolCompens[] = [];
	genCsldghupdateList: CaseloadGrpHolCompens[] = [];
	genCsldghDeleteList: CaseloadGrpHolCompens[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	sysEventColumnDef: any[];
	csldGhcColumnDef: any[];
	sysEventReadOnly: boolean = false;
	csldGhcReadOnly: boolean = false;
	cgfkCsldghccompensationcodRg: any[] = [];
	cgfkCsldghcworkgroupidRg: any[] = [];
	msglist: any[];
	message: any;
	type: any;
	index: any;
	syseventinsertList: any;
	syseventupdateList: any;
	syseventdeleteList: any;
	syseventalertUpdateList: any;
	syseventUpdateList: any;
	syseventmodel: any;
	csldghcinsertList: any;
	csldghcupdateList: any;
	csldghcdeleteList: any;
	csldghcalertUpdateList: any;
	csldghcUpdateList: any;
	syseventReadonly: boolean;
	sysEventDisabled: boolean;
	csldghcEnableInsert: boolean;
	csldghcEnableDelete: boolean;
	syseventEnableDelete: boolean;
	sysEventTableIndex: number;
	csldghcTableIndex: number;
	constructor(private oymholidFactory: OymholidService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		this.sysEventColumnDef = [];
		this.csldGhcColumnDef = [];
	}
	ngOnInit() {
		this.sysEventExecuteQuery();
		this.sysEventColumnDef = [
			{
				fieldName: this.translateService.translate('oymholid.id'), field: 'systemEventId', datatype: 'number',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('common.description'), field: 'description', datatype: 'text',
				editable: true, width: 150,uppercase:'false'
			},
			{
				fieldName: this.translateService.translate('oymholid.eventDate') + '*', field: 'eventDate', datatype: 'date',
				editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('oymholid.endDate'), field: 'eventEndDate', datatype: 'date',
				editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('oymholid.no') , field: 'eventSeq', datatype: 'number',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('oymholid.modifyDate'), field: 'modifyDate', datatype: 'date',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('oymholid.modifyBy'), field: 'modifyUserId', datatype: 'text',
				editable: false, width: 150
			},
		];
		this.csldGhcColumnDef = [
			{
				fieldName: this.translateService.translate('oymholid.workGroupId') + '*', field: 'workGroupId', datatype: 'lov',
				link: 'oymholid/cgfkCsldGhcWorkGroupIdRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoad, editable: true, width: 150,source:'OYMWGROU'
			},
			{
				fieldName: this.translateService.translate('oymholid.compensationCode') + '*', field: 'compensationCode', datatype: 'lov',
				domain:'COMPENSATION'// link: 'oymholid/cgfkCsldGhcCompensationCodRecordGroup'
				, editable: true, width: 150
			},
		];
	}

	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	onRowClicksysevent(event) {
		if(event != undefined){
			this.syseventModel = event;
		}
		if (event.createDatetime || event.createDatetime !== undefined) {
			this.csldghcEnableInsert = true;
			this.syseventEnableDelete = true;
		} else {
			this.csldghcEnableInsert = false;
			this.syseventEnableDelete = false;
		}
		this.csldghcExecuteQuery();
	}

	onRowClickcsldghc(event) {
		if (event.createDatetime || event.createDatetime !== undefined) {
			this.csldghcEnableDelete = true;
		} else {
			this.csldghcEnableDelete = false;
		}
	}

	onSyseventGridDelete = () => {
		if (this.csldghcData.length !== 0 || this.csldghcGrid.removedMap.size > 0) {
			this.type = 'warn';
			this.message = this.translateService.translate('common.cannotdeletemaster');
			this.show();
			return;
		}
		return true;
	}

	sysEventExecuteQuery() {
		const serviceObj = this.oymholidFactory.sysEventExecuteQuery(this.syseventModel);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.syseventData = [];
				this.sysEventTableIndex = -1;
			} else {
				this.sysEventTableIndex = 0;
				this.syseventData = data;
				this.syseventModel = this.syseventData[0];
				this.csldghcExecuteQuery();
			}
		});
	}

	savesyseventForm(event) {
		this.syseventInsertList = event.added
		this.syseventUpdateList = event.updated
		this.syseventDeleteList = event.removed
		this.syseventCommitModel.insertList = [];
		this.syseventCommitModel.updateList = [];
		this.syseventCommitModel.deleteList = [];
		if (this.syseventInsertList.length > 0) {
			if (!this.sysEventValidate(this.syseventInsertList)) {
				return;
			}
			for (let i = 0; i < this.syseventInsertList.length; i++) {
				this.syseventInsertList[i].eventType = 'HOL';
			}
			this.syseventCommitModel.insertList = this.syseventInsertList;
		}
		if (this.syseventUpdateList.length > 0) {
			if (!this.sysEventValidate(this.syseventUpdateList)) {
				return;
			}
			for (let i = 0; i < this.syseventUpdateList.length; i++) {
				this.syseventUpdateList[i].modifyDate = DateFormat.getDate();
			}
			this.syseventCommitModel.updateList = this.syseventUpdateList;
		}
		if (this.syseventDeleteList.length > 0) {
			this.syseventCommitModel.deleteList = this.syseventDeleteList;
		}
		const syseventSaveData = this.oymholidFactory.sysEventCommit(this.syseventCommitModel);
		syseventSaveData.subscribe(data => {
			if (data === 1) {
				this.sysEventExecuteQuery();
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

	csldghcExecuteQuery() {
		this.csldghcModel.caseloadId = this.sessionManager.currentCaseLoad;
		this.csldghcModel.holidayEventId = this.syseventModel.systemEventId;
		const csldghcResult = this.oymholidFactory.csldGhcExecuteQuery(this.csldghcModel);
		csldghcResult.subscribe(data => {
			if (data.length === 0) {
				this.csldghcData = [];
				this.csldghcTableIndex = -1;
			} else {
				this.csldghcTableIndex = 0;
				this.csldghcData = data;
				this.csldghcModel = data[0];
			}
		});
	}

	savecsldghcForm(event) {
		this.csldghcInsertList = event.added;
		this.csldghcUpdateList = event.updated;
		this.csldghcDeleteList = event.removed;
		this.csldghcCommitModel.insertList = [];
		this.csldghcCommitModel.updateList = [];
		this.csldghcCommitModel.deleteList = [];

		if (this.csldghcInsertList.length > 0) {
			if (!this.csldghcValidate(this.csldghcInsertList)) {
				return;
			}
			for (let i = 0; i < this.csldghcInsertList.length; i++) {
				this.csldghcInsertList[i].holidayEventId = this.syseventModel.systemEventId;
				this.csldghcInsertList[i].caseloadId = this.sessionManager.currentCaseLoad
			}
			this.csldghcCommitModel.insertList = this.csldghcInsertList;
		}
		if (this.csldghcUpdateList.length > 0) {
			if (!this.csldghcValidate(this.csldghcUpdateList)) {
				return;
			}
			this.csldghcCommitModel.updateList = this.csldghcUpdateList;
		}
		if (this.csldghcDeleteList.length > 0) {
			this.csldghcCommitModel.deleteList = this.csldghcDeleteList;
		}
		const csldghcSaveData = this.oymholidFactory.csldGhcCommit(this.csldghcCommitModel);
		csldghcSaveData.subscribe(data => {
			if (data === 1) {
				this.csldghcExecuteQuery();
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
			} else {
				this.type = 'error';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		});
	}

	onSysGridInsert = () => {
		// if (this.sysEventgridValidate(this.syseventData)) {
		// 	return {
		// 		modifyDate: DateFormat.getDate(),
		// 		modifyUserId: this.sessionManager.userSessionDetails().id,
		// 	};
		// }
		return {
			modifyDate: DateFormat.getDate(),
			modifyUserId: this.sessionManager.userSessionDetails().id,
		};
	}

	sysEventgridValidate(sysEventData: any) {
		try {
			this.csldghcData.forEach((element) => {
				if (!element.createDatetime || element.createDatetime === undefined) {
					throw new Error();
				}
			});
			sysEventData.forEach((element) => {
				if (!element.eventDate || element.eventDate === undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('oymholid.enterEventDate');
					this.show();
					throw new Error();
				} else if(element.eventEndDate || element.eventEndDate !== undefined){
					if (DateFormat.compareDate(DateFormat.getDate(element.eventDate),
           				 DateFormat.getDate(element.eventEndDate)) > 0) {
						this.type = 'warn';
						this.message = this.translateService.translate('oymholid.endDateMustBeGreater');
						this.show();
						throw new Error();
					}
				}
			});
		} catch (e) {
			return false;
		}
		return true;
	}

	onCsldghcGridInsert = () => {
		if (this.csldghcgridValidate(this.csldghcData)) {
			return {};
		}
	}

	csldghcgridValidate(csldghcData: any) {
		try {
			if (!this.syseventModel.eventDate || !this.syseventModel.eventSeq || !this.syseventModel.modifyDate || !this.syseventModel.modifyUserId) {
				this.type = 'warn';
				this.message = this.translateService.translate('oymholid.createParentRecord');
				this.show();
				throw new Error();
			} else if (this.syseventModel.eventEndDate || this.syseventModel.eventEndDate !== undefined) {
				if (this.syseventModel.eventDate > this.syseventModel.eventEndDate) {
					this.type = 'warn';
					this.message = this.translateService.translate('oymholid.endDateMustBeGreater');
					this.show();
					throw new Error();
				}
			}
			csldghcData.forEach((element) => {
				if (!element.workGroupId || element.workGroupId === undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('oymholid.enterWorkId');
					this.show();
					throw new Error();
				} else if (!element.compensationCode || element.compensationCode === undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('oymholid.enterCompCode');
					this.show();
					throw new Error();
				}
			});
		} catch (e) {
			return false;
		}
		return true;
	}

	sysEventValidate(sysEventData: any) {
		try {
			sysEventData.forEach((element) => {
				if (!element.eventDate || element.eventDate === undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('oymholid.enterEventDate');
					this.show();
					throw new Error();
				} else if(element.eventEndDate && element.eventEndDate != null) {
					if (DateFormat.compareDate(DateFormat.getDate(element.eventDate),
           				 DateFormat.getDate(element.eventEndDate)) > 0) {
						this.type = 'warn';
						this.message = this.translateService.translate('oymholid.endDateMustBeGreater');
						this.show();
						throw new Error();
					}
				}
			});
		} catch (e) {
			return false;
		}
		return true;
	}

	csldghcValidate(csldghcList: any) {
		try {
			for (let i = 0; i < csldghcList.length; i++) {
				if (!csldghcList[i].workGroupId || csldghcList[i].workGroupId === undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('oymholid.enterWorkId');
					this.show();
					throw new Error();
				} else if (!csldghcList[i].compensationCode || csldghcList[i].compensationCode === undefined) {
					this.type = 'warn';
					this.message = this.translateService.translate('oymholid.enterCompCode');
					this.show();
					throw new Error();
				}
			}
			for (let i = 0; i < this.csldghcData.length; i++) {
				for (let j = i + 1; j < this.csldghcData.length; j++) {
					if (i != j && this.csldghcData[i].workGroupId === this.csldghcData[j].workGroupId) {
						this.type = 'warn';
						this.message = this.translateService.translate('oymholid.rowExists');
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
