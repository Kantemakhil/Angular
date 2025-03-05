import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourseScheduleRulesCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseScheduleRulesCommitBean';
import { CourseScheduleRules } from '@inst/institutional-activities/maintenance/beans/CourseScheduleRules';
import { CourseActivities } from '@inst/programs-without-schedules/beans/CourseActivities';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OcumpvavService } from '../service/ocumpvav.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
	selector: 'app-ocumpvav',
	templateUrl: './ocumpvav.component.html'
})

export class OcumpvavComponent implements OnInit {
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	@ViewChild('scheduleGrid') scheduleGrid: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	crsactData: CourseActivities[] = [];
	crsactDataTemp: CourseActivities[] = [];
	crsactModel: CourseActivities = new CourseActivities();
	crsactIndex: number = 0;
	crsactInsertList: CourseActivities[] = [];
	crsactUpdatetList: CourseActivities[] = [];
	crsactDeleteList: CourseActivities[] = [];
	crsschedulerulData: CourseScheduleRules[] = [];
	crsschedulerulDataTemp: CourseScheduleRules[] = [];
	crsschedulerulModelTemp: CourseScheduleRules = new CourseScheduleRules();
	// TODO angular.copy(this.crsschedulerulData, thiscrsschedulerulDataTemp);
	crsschedulerulModel: CourseScheduleRules = new CourseScheduleRules();
	crsschedulerulIndex: number = 0;
	crsschedulerulInsertList: CourseScheduleRules[] = [];
	crsschedulerulUpdatetList: CourseScheduleRules[] = [];
	crsschedulerulDeleteList: CourseScheduleRules[] = [];
	crsschedulerulCommitModel: CourseScheduleRulesCommitBean = new CourseScheduleRulesCommitBean();
	genCrsschedulerulInsertList: CourseScheduleRules[] = [];
	genCrsschedulerulUpdatetList: CourseScheduleRules[] = [];
	genCrsschedulerulDeleteList: CourseScheduleRules[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	crsScheduleRulColumnDef: any[];
	crsActReadOnly: boolean = false;
	crsScheduleRulReadOnly: boolean = false;
	msglist: any[];
	message: any;
	type: any;
	index: any;
	crsactmodel: any;

	onGridDelete: boolean;
	tableIndex: number;
	alertDelete: boolean;
	alertInsert: boolean;
	excludeHolidays: boolean;
	holiday: string;
	enableDelete: boolean;
	providerAvailabilityGrid: boolean;
	holidayFlagChangeFlag: boolean;
	providerAvailabilityGridInsert: boolean;
	constructor(private ocumpvavFactory: OcumpvavService, public translateService: TranslateService, public sessionManager: UserSessionManager,
		public dialogService: DialogService) {
		this.crsScheduleRulColumnDef = [];
	}
	ngOnInit() {
		this.enableDelete = true;
		this.crsactModel = this.dialog.data;
		if(this.crsactModel && this.crsactModel.pQueryOnly === 'Y'){
			this.providerAvailabilityGrid = true;
			this.holidayFlagChangeFlag = true;
		}else{
			this.providerAvailabilityGrid = false;
			this.holidayFlagChangeFlag = false;
		}
		this.crsActExecuteQuery();
		this.crsScheduleRulColumnDef = [
			{
				fieldName: this.translateService.translate('ocumpvav.monday'), field: 'monday', datatype: 'checkbox',
				cellEditable: this.canFlagEdit, width: 150
			},
			{
				fieldName: this.translateService.translate('ocumpvav.tuesday'), field: 'tuesday', datatype: 'checkbox',
				cellEditable: this.canFlagEdit, width: 150
			},
			{
				fieldName: this.translateService.translate('ocumpvav.wednesday'), field: 'wednesday', datatype: 'checkbox',
				cellEditable: this.canFlagEdit, width: 150
			},
			{
				fieldName: this.translateService.translate('ocumpvav.thursday'), field: 'thursday', datatype: 'checkbox',
				cellEditable: this.canFlagEdit, width: 150
			},
			{
				fieldName: this.translateService.translate('ocumpvav.friday'), field: 'friday', datatype: 'checkbox',
				cellEditable: this.canFlagEdit, width: 150
			},
			{
				fieldName: this.translateService.translate('ocumpvav.saturday'), field: 'saturday', datatype: 'checkbox',
				cellEditable: this.canFlagEdit, width: 150
			},
			{
				fieldName: this.translateService.translate('ocumpvav.sunday'), field: 'sunday', datatype: 'checkbox',
				cellEditable: this.canFlagEdit, width: 150
			},
			{
				fieldName: this.translateService.translate('common.startTime'), field: 'startTime', datatype: 'time',
				editable: true,cellEditable: this.canFlagEdit, required: true, width: 150
			},
			{
				fieldName: this.translateService.translate('common.endTime'), field: 'endTime', datatype: 'time',
				editable: true,cellEditable: this.canFlagEdit, required: true, width: 150
			},
			{ fieldName: '', field: 'holiday', hide: true },
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

	holidayFlagChange(event){
		const rowIndex = this.crsschedulerulData.indexOf(this.crsschedulerulModelTemp);
		if(event){
			this.scheduleGrid.setColumnData('holiday', rowIndex, event.checked);
		}
	}

	onGridClear = () => {
        this.crsActExecuteQuery();
        return true;
    }

	onRowClickcrsschedulerul(event) {
		this.crsschedulerulModelTemp = event;
		if (event.createDatetime || event.createDatetime !== undefined) {
			this.enableDelete = true;
		} else {
			this.enableDelete = false;
		}
	}

	validateRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		const rowIndex = this.crsschedulerulData.indexOf(event.data);
		rowdata.validated = true;
		return rowdata;
	}

	crsActExecuteQuery() {
		const serviceObj = this.ocumpvavFactory.crsActExecuteQuery(this.crsactModel);
		serviceObj.subscribe(data => {
			if (data.length == 0) {
				this.crsactData = [];
			} else {
				this.crsactData = data;
				this.crsactModel = this.crsactData[0];
				this.excludeHolidays = this.crsactModel.holidayFlag === 'Y' ? true : false;
				this.crsschedulerulExecuteQuery();
			}
		});
	}

	crsschedulerulExecuteQuery() {
		this.crsschedulerulModel.crsActyId = this.crsactModel.crsActyId;
		const crsschedulerulResult = this.ocumpvavFactory.crsScheduleRulExecuteQuery(this.crsschedulerulModel);
		crsschedulerulResult.subscribe(data => {
			if (data.length === 0) {
				this.crsschedulerulData = [];
				this.tableIndex = -1;
			} else {
				this.tableIndex = 0;
				this.crsschedulerulData = data;
				this.crsschedulerulData.forEach((element) => {
					if (element.sundayFlag === 'Y') {
						element.sunday = true;
					}
					if (element.mondayFlag === 'Y') {
						element.monday = true;
					}
					if (element.tuesdayFlag === 'Y') {
						element.tuesday = true;
					}
					if (element.wednesdayFlag === 'Y') {
						element.wednesday = true;
					}
					if (element.thursdayFlag === 'Y') {
						element.thursday = true;
					}
					if (element.fridayFlag === 'Y') {
						element.friday = true;
					}
					if (element.saturdayFlag === 'Y') {
						element.saturday = true;
					}
				});
				this.crsschedulerulModel = data[0];
			}
		});
	}

	saveCrsschedulerulForm(event) {
		this.crsschedulerulInsertList = event.added
		this.crsschedulerulUpdatetList = event.updated
		this.crsschedulerulDeleteList = event.removed
		this.crsactUpdatetList = event.updated
		this.crsschedulerulCommitModel.insertList = [];
		this.crsschedulerulCommitModel.updateList = [];
		this.crsschedulerulCommitModel.deleteList = [];
		this.crsschedulerulCommitModel.actUpdate = [];
		if (this.crsschedulerulInsertList.length > 0) {
			if (!this.schduleValidate(this.crsschedulerulInsertList)) {
				return;
			}
			for (let i = 0; i < this.crsschedulerulInsertList.length; i++) {
				this.crsschedulerulInsertList[i].crsActyId = this.crsactModel.crsActyId;
				this.crsschedulerulInsertList[i].capacity = this.crsactModel.capacity;
				this.crsschedulerulInsertList[i].sealFlag = this.crsactModel.sealFlag;
				this.crsschedulerulInsertList[i].weekNo = 1;
			}
			this.crsschedulerulInsertList = this.flagConvertion(this.crsschedulerulInsertList);
			this.crsschedulerulCommitModel.insertList = this.crsschedulerulInsertList;
		}

		if (this.crsschedulerulUpdatetList.length > 0) {
			if (!this.schduleValidate(this.crsschedulerulUpdatetList)) {
				return;
			}
			this.crsschedulerulUpdatetList = this.flagConvertion(this.crsschedulerulUpdatetList);
			this.crsschedulerulCommitModel.updateList = this.crsschedulerulUpdatetList;
		}
		if (this.crsactUpdatetList.length > 0) {
			for (let i = 0; i < this.crsactUpdatetList.length; i++) {
				this.crsactUpdatetList[i].holidayFlag = this.crsschedulerulUpdatetList[i].holiday ? 'Y':'N';
			}
			this.crsschedulerulCommitModel.actUpdate = this.crsactUpdatetList;
		}

		if (this.crsschedulerulDeleteList.length > 0) {
			this.crsschedulerulCommitModel.deleteList = this.crsschedulerulDeleteList;
		}
		const crsschedulerulSaveData = this.ocumpvavFactory.crsScheduleRulCommit(this.crsschedulerulCommitModel);
		crsschedulerulSaveData.subscribe(data => {
			if (data === 1) {
				this.crsActExecuteQuery();
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
		if (this.schduleValidate(this.crsschedulerulData)) {
			return {};
		}
	}

	schduleValidate(crsSchList: any) {
		try {
			crsSchList = this.flagConvertionBool(crsSchList);
			crsSchList.forEach((element) => {
				if (!element.startTime) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocumpvav.enterStartTime');
					this.show();
					throw new Error();
				}
				if (!element.endTime) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocumpvav.enterEndTime');
					this.show();
					throw new Error();
				}
				if ((element.sunday === false && element.monday === false && element.tuesday === false &&
					element.wednesday === false && element.thursday === false && element.friday === false &&
					element.saturday === false)) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocumpvav.checkAtleastADay');
					this.show();
					throw new Error();
				}
				if (DateFormat.compareTime(DateFormat.getDate(element.startTime), DateFormat.getDate(element.endTime)) === 1) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocumpvav.timeMsg');
					this.show();
					throw new Error();
				}
			});
		} catch (e) {
			return false;
		}
		return true;
	}

	flagConvertionBool(crsSchList: any) {
		crsSchList.forEach((element) => {
			element.sunday = !!element.sunday;
			element.monday = !!element.monday;
			element.tuesday = !!element.tuesday;
			element.wednesday = !!element.wednesday;
			element.thursday = !!element.thursday;
			element.friday = !!element.friday;
			element.saturday = !!element.saturday;
		});
		return crsSchList;
	}

	flagConvertion(crsSchList: any) {
		crsSchList.forEach((element) => {
			element.sundayFlag = element.sunday ? 'Y' : 'N';
			element.mondayFlag = element.monday ? 'Y' : 'N';
			element.tuesdayFlag = element.tuesday ? 'Y' : 'N';
			element.wednesdayFlag = element.wednesday ? 'Y' : 'N';
			element.thursdayFlag = element.thursday ? 'Y' : 'N';
			element.fridayFlag = element.friday ? 'Y' : 'N';
			element.saturdayFlag = element.saturday ? 'Y' : 'N';
			element.holidayFlag = element.holiday ? 'Y' : 'N';
		});
		return crsSchList;
	}

	onButExitclick() {
			this.dialog.close(null);
	}

	canFlagEdit = (data: any, index: number, field: string): boolean => {
        if(this.providerAvailabilityGrid){
            return false;
        }
        return true;
	}
}
