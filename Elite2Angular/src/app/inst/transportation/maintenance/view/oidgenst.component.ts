import {
	Component, Input, OnInit, ViewChild
} from '@angular/core';
import { ScheduledTripParameters } from '../beans/ScheduledTripParameters';
import { ScheduledTrips } from '../beans/ScheduledTrips';
import { ScheduledTripsCommitBean } from '../beans/ScheduledTripsCommitBean';
import { ScheduledTripParametersCommitBean } from '../beans/ScheduledTripParametersCommitBean';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from "@core/ui-components/dialog/dialog.service";
import { DateFormat } from "@core/ui-components/datepicker/dateFormat";
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OidgenstService } from '../service/oidgenst.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';

@Component({
	selector: 'app-oidgenst',
	templateUrl: './oidgenst.component.html'
})
export class OidgenstComponent implements OnInit {
	@ViewChild('grid', { static: true }) grid: any;
	@ViewChild('schPlannerGrid', { static: true }) schPlannerGrid: any;
	@ViewChild('scheTripGrid', { static: true }) scheTripGrid: any;
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;

	schplannerData: ScheduledTripParameters[] = [];
	schInsertList: ScheduledTripParameters[] = [];
	schplannerDataTemp: ScheduledTripParameters[] = [];
	schplannerInsertList: ScheduledTripParameters[] = [];
	schplannerUpdateList: ScheduledTripParameters[] = [];
	schplannerDeleteList: ScheduledTripParameters[] = [];
	schPlannerModel: ScheduledTripParameters = new ScheduledTripParameters();
	schTripParamCommitModel: ScheduledTripParametersCommitBean = new ScheduledTripParametersCommitBean();

	tripSchdetData: ScheduledTrips[] = [];
	tripSchdetDataTemp: ScheduledTrips[] = [];
	tripSchInsertList: ScheduledTrips[] = [];
	tripSchUpdateList: ScheduledTrips[] = [];
	tripSchDeleteList: ScheduledTrips[] = [];
	ScheduledTripsCommitModel: ScheduledTripsCommitBean = new ScheduledTripsCommitBean();
	schParamDetColumnDef: any[];
	schOverViewDetColumnDef: any[];
	
	disablegenratebtn = true;
	tripSchColDef: any[];
	schctrlModel: ScheduledTrips = new ScheduledTrips();

	saveDisabled: any;
	validateTrue: any;
	vCurNum: number;
	vMdate: Date;
	validateTrueOne: any;
	type: string;
	message: string;
	msglist: any[];
	msgs: any[] = [];
	count: number;
	count2: number = 1;
	vRetAlert: number;
	vAnyRoute: any;
	vMaxWeek: any;
	vSdate: any;
	vEdate: any;
	rowIndex = -1;
	dialogData: any;
	duplicateExists: boolean;
	constructor(public translateService: TranslateService, private oidgenstservice: OidgenstService, public dialogService: DialogService) {
		// TODO initilize data members here..!
		this.schParamDetColumnDef = [];
		this.tripSchColDef = [];
	}
	ngOnInit() {
		this.dialogData = this.dialog.data;
		this.dialogData['g_commit'] = 'N';
		this.schctrlModel.tripCode = this.dialogData.tripCode;
		this.schctrlModel.description = this.dialogData.tripDesc;
		this.schctrlModel.startDate = this.dialogData.tripStartDate;
		this.schctrlModel.endDate = this.dialogData.tripEndDate;
		this.schplannerExecuteQuery();
		/* this.scheduledtripsExecuteQuery();
		this.scheduledTripsvalidate(); */
		this.schParamDetColumnDef = [
			{
				fieldName: this.translateService.translate('oidgenst.week'), field: 'weekNo', editable: true, width: 150, datatype: 'number', required: 'true', whole: true,
				maxlength: '6',
				minValue: '1', strictFP: true, maxValue: '9999'
			},
			{
				fieldName: this.translateService.translate('oidgenst.sunday'), field: 'sunday', editable: true, width: 150, datatype: 'lov', link: 'oidgenst/rgRouteRecordGroup'
			},
			{
				fieldName: this.translateService.translate('oidgenst.monday'), field: 'monday', editable: true, width: 150, datatype: 'lov', link: 'oidgenst/rgRouteRecordGroup'
			},
			{
				fieldName: this.translateService.translate('oidgenst.tuesday'), field: 'tuesday', editable: true, width: 150, datatype: 'lov', link: 'oidgenst/rgRouteRecordGroup'
			},
			{
				fieldName: this.translateService.translate('oidgenst.wednesday'), field: 'wednesday', editable: true, width: 150, datatype: 'lov', link: 'oidgenst/rgRouteRecordGroup'
			},
			{
				fieldName: this.translateService.translate('oidgenst.thursday'), field: 'thursday', editable: true, width: 150, datatype: 'lov', link: 'oidgenst/rgRouteRecordGroup'
			},
			{
				fieldName: this.translateService.translate('oidgenst.friday'), field: 'friday', editable: true, width: 150, datatype: 'lov', link: 'oidgenst/rgRouteRecordGroup'
			},
			{
				fieldName: this.translateService.translate('oidgenst.saturday'), field: 'saturday', editable: true, width: 150, datatype: 'lov', link: 'oidgenst/rgRouteRecordGroup'
			},
			{
				fieldName: this.translateService.translate('oidgenst.estimatedstarttime'), field: 'estDepartureTime', editable: true, width: 150, datatype: 'time', required: 'true'
			},
			{ fieldName: '', field: 'weekNoTemp', hide: true },

		];
		this.schOverViewDetColumnDef = [
			{
				fieldName: this.translateService.translate('oidgenst.departuredate'), field: 'departureDate', width: 150, datatype: 'date', required: true, editable: true
			},
			{
				fieldName: this.translateService.translate('oidgenst.startday'), field: 'startDay', width: 150, datatype: 'text'
			},
			{
				fieldName: this.translateService.translate('oidgenst.estimatedstarttime'), field: 'estDepartureTime', editable: true, width: 150, datatype: 'time', required: true
			},
			{
				fieldName: this.translateService.translate('oidgenst.route'), field: 'routeName', editable: true, width: 150, datatype: 'lov', link: 'oidgenst/rgRouteRecordGroup', required: true
			},
			{
				fieldName: this.translateService.translate('oidgenst.enddate'), field: 'completionDate', width: 150, datatype: 'date', editable: true,
			},
			{
				fieldName: this.translateService.translate('oidgenst.endday'), field: 'endDay', width: 150, datatype: 'text',
			},
			{
				fieldName: this.translateService.translate('oidgenst.estimatedendtime'), field: 'estCompletionTime', width: 150, datatype: 'time', editable: true,
			},
		];
		//	this.scheduledtripsExecuteQuery();

	}

	validateDate() {
		if (this.schctrlModel.startDate == null) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidgenst.startdatemustbeentered');
			this.show();
		}
		else if (this.schctrlModel.endDate == null) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidgenst.enddatemustbeentered');
			this.show();
		}
	}

	schlplnrGridOnInsert = (event) => {
		this.disablegenratebtn = true;
		// return {};
		return { 'weekNoTemp': undefined };
	}


	schplannerExecuteQuery() {
		this.schPlannerModel.tripCode = this.schctrlModel.tripCode;
		const schplannerResult = this.oidgenstservice.
			schplannerExecuteQuery(this.schPlannerModel);
		schplannerResult.subscribe(data => {
			if (data.length > 0) {
				this.disablegenratebtn = false;
				this.disablegenratebtn = false;
				data.forEach(e => {
					e['weekNoTemp'] = e.weekNo;

				});
				this.schplannerData = data;
			} else {
				this.schplannerData = [];
				/* this.type = 'warn';
				this.message = this.translateService.translate('common.querycaused');
				this.show(); */
			}
		});
	}
	getDay(event) {
		let dayName;
		if (event) {
			let day = DateFormat.getDate(event).getDay();
			if (day === 1) {
				dayName = 'MON'
			} else if (day === 2) {
				dayName = 'TUE'
			} else if (day === 3) {
				dayName = 'WED'
			} else if (day === 4) {
				dayName = 'THU'
			} else if (day === 5) {
				dayName = 'FRI'
			} else if (day === 6) {
				dayName = 'SAT'
			} else if (day === 0) {
				dayName = 'SUN'
			}
		}
		return dayName;
	}
	scheduledtripsExecuteQuery() {
		const scheduledtripsResult = this.oidgenstservice.
			scheduledtripsExecuteQuery(this.schctrlModel);
		scheduledtripsResult.subscribe(data => {

			if (data.length > 0) {
				data.forEach(e => {
					e['startDay'] = this.getDay(e.departureDate);
					e['endDay'] = this.getDay(e.completionDate);
					e['departureDateTemp'] = e.departureDate;
				});
				this.tripSchdetData = data;
			} else {
				this.tripSchdetData = [];
				if (this.tripSchdetData.length === 0 && this.schplannerData.length === 0) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.querycaused');
					this.show();
				}
			}
		});
	}

	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	onRowClick(event) {
		if (event) {
			this.schPlannerModel = event;
			this.scheduledtripsExecuteQuery();
			this.disablegenratebtn = false;


		}
	}
	chkWeekDeptTime(): boolean {
		let isValid = true;
		for (let i = 0; i < this.schplannerData.length; i++) {
			if (((this.schplannerData[i].sunday || this.schplannerData[i].monday ||
				this.schplannerData[i].tuesday || this.schplannerData[i].wednesday ||
				this.schplannerData[i].thursday || this.schplannerData[i].friday || this.schplannerData[i].saturday) &&
				(this.schplannerData[i].estDepartureTime == null || this.schplannerData[i].weekNo == null)) ||
				((!this.schplannerData[i].sunday || !this.schplannerData[i].monday ||
					!this.schplannerData[i].tuesday || !this.schplannerData[i].wednesday ||
					!this.schplannerData[i].thursday || !this.schplannerData[i].friday || !this.schplannerData[i].saturday) &&
					(this.schplannerData[i].estDepartureTime || this.schplannerData[i].weekNo))) {
				this.type = 'warn';
				this.message = this.translateService.translate('oidgenst.pleaseprovideweekandestimatedstarttimeandaroutetogenerateschedule');
				this.show();
				isValid = false;

			}
		}
		return isValid;

	}
	checkCondition(schplannerInsertList) {
		for (let i = 0; i < schplannerInsertList.length; i++) {
			if (schplannerInsertList[i].sunday != null) {
				return 0;
			}
			else if (schplannerInsertList[i].monday != null) {
				return 0;
			}
			else if (schplannerInsertList[i].tuesday != null) {
				return 0;
			}
			else if (this.schplannerInsertList[i].wednesday != null) {
				return 0;
			}
			else if (this.schplannerInsertList[i].thursday != null) {
				return 0;
			}
			else if (this.schplannerInsertList[i].friday != null) {
				return 0;
			}
			else if (this.schplannerInsertList[i].saturday != null) {
				return 0;
			}
			else {
				return 1;
			}
		}
	}


	onSave() {
		if (this.schctrlModel.startDate == null) {
			this.message = this.translateService.translate('start date must be entered');
			this.type = 'warn';
			this.show();
			return;
		}
		if (this.schctrlModel.endDate == null) {
			this.message = this.translateService.translate('end date must be entered');
			this.type = 'warn';
			this.show();
			return;
		}
		const date = DateFormat.getDate(DateFormat.getDate(this.schctrlModel.startDate).setMonth(DateFormat.getDate().getMonth() + 1));
		if (this.schctrlModel.endDate && DateFormat.compareDate(this.schctrlModel.endDate, date) === -1) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidgenst.schedulestartandenddateshouldbemorethan1monthapart');
			this.show();
			return;
		}
		if (this.tripSchInsertList.length > 0) {
			for (let i = 0; i < this.tripSchInsertList.length; i++) {
				if (!this.tripSchInsertList[i].estDepartureTime) {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.estimatedstarttime');
					this.show();
					return;
				}
				if (!this.tripSchInsertList[i].routeName) {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.routenamemustbeentered');
					this.show();
					return;
				}
			}
		}





		if (this.ScheduledTripsCommitModel.updateList) {
			const data = {
				label: this.translateService.translate('oidgenst.doyouwanttosavetheschedule'), yesBtn: true, noBtn: true
			};
			this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
				if (result) {
					const scheTripGridEvent = { added: [], updated: [], removed: [], offNadAdded: [], offNadUpdated: [] };
					this.scheTripGrid.addedMap.forEach((value, keys) => { scheTripGridEvent.added.push(value); });
					this.scheTripGrid.removedMap.forEach((value, keys) => { scheTripGridEvent.removed.push(value); });
					this.scheTripGrid.updatedMap.forEach((value, keys) => { scheTripGridEvent.updated.push(value); });
					this.oidgenstSavescheduledtripsForm(scheTripGridEvent);

				} else {
					this.dialogData['g_commit'] = 'N';
					return;
				}

			});
		}
		else {
			const scheTripGridEvent = { added: [], updated: [], removed: [], offNadAdded: [], offNadUpdated: [] };
			this.scheTripGrid.addedMap.forEach((value, keys) => { scheTripGridEvent.added.push(value); });
			this.scheTripGrid.removedMap.forEach((value, keys) => { scheTripGridEvent.removed.push(value); });
			this.scheTripGrid.updatedMap.forEach((value, keys) => { scheTripGridEvent.updated.push(value); });
			this.oidgenstSavescheduledtripsForm(scheTripGridEvent);
		}
	}

	onGenerate() {
		if (this.schctrlModel.startDate == null) {
			this.message = this.translateService.translate('start date must be entered');
			this.type = 'warn';
			this.show();
			return;
		}
		if (this.schctrlModel.endDate == null) {
			this.message = this.translateService.translate('end date must be entered');
			this.type = 'warn';
			this.show();
			return;
		}
		const date = DateFormat.getDate(DateFormat.getDate(this.schctrlModel.startDate).setMonth(DateFormat.getDate().getMonth() + 1));
		if (this.schctrlModel.endDate && DateFormat.compareDate(this.schctrlModel.endDate, date) === -1) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidgenst.schedulestartandenddateshouldbemorethan1monthapart');
			this.show();
			return;
		}
		if (this.schPlannerGrid.addedMap.size > 0 || this.schPlannerGrid.removedMap.size > 0 || this.schPlannerGrid.updatedMap.size > 0) {
			this.message = this.translateService.translate('oidgenst.pleasesavechangesonscheduleplannerbeforegeneratingtheschedules');
			this.type = 'warn';
			this.show();
			return;
		}
		if (this.vCurNum > 0) {
			if (this.dialogData.tripStartDate && this.dialogData.tripEndDate && this.schctrlModel.startDate && this.schctrlModel.endDate && DateFormat.compareDate(this.dialogData.tripStartDate, this.schctrlModel.startDate) === 0 &&
				DateFormat.compareDate(this.dialogData.tripEndDate, this.schctrlModel.endDate) === 0) {
				this.message = this.translateService.translate('oidgenst.schedulealreadyexistforthedatesspecified');
				this.type = 'warn';
				this.show();
				return;
			}
		} else {
			if (this.dialogData.tripStartDate && this.dialogData.tripEndDate && this.schctrlModel.startDate && this.schctrlModel.endDate && DateFormat.compareDate(this.dialogData.tripStartDate, this.schctrlModel.startDate) === 0 &&
				DateFormat.compareDate(this.dialogData.tripEndDate, this.schctrlModel.endDate) === 0 && this.dialogData.g_Commit && this.dialogData.g_Commit === 'Y') {
				this.message = this.translateService.translate('oidgenst.schedulealreadygeneratedforthespecifieddatestosaveclickonthesavebutton');
				this.type = 'warn';
				this.show();
				return;
			}
		}
		this.vSdate = this.schctrlModel.startDate;
		this.vEdate = DateFormat.getDate(DateFormat.getDate(this.vSdate).setMonth(DateFormat.getDate().getMonth() + 1));
		if (this.schctrlModel.startDate && this.schctrlModel.endDate && DateFormat.compareDate(this.schctrlModel.startDate, this.schctrlModel.endDate) === 1) {
			this.message = this.translateService.translate('oidgenst.tripstartdatecannotbegreaterthentripenddate');
			this.type = 'warn';
			this.show();
			return;
		}
		else if (this.schctrlModel.startDate && DateFormat.compareDate(this.schctrlModel.startDate, DateFormat.getDate()) === -1) {
			this.message = this.translateService.translate('oidgenst.tripstartdatecannotbesmallerthencurrentdate');
			this.type = 'warn';
			this.show();
			return;
		}
		else if (this.schctrlModel.endDate && DateFormat.compareDate(this.schctrlModel.endDate, DateFormat.getDate()) === -1) {
			this.message = this.translateService.translate('oidgenst.tripenddatecannotbesmallerthencurrentdate');
			this.type = 'warn';
			this.show();
			return;
		}
		else if (this.schctrlModel.startDate && this.dialogData.tripStartDate && this.schctrlModel.startDate && this.dialogData.tripEndDate && DateFormat.compareDate(this.schctrlModel.startDate, this.dialogData.tripStartDate) === 0 &&
			DateFormat.compareDate(this.schctrlModel.startDate, this.dialogData.tripStartDate) === 1 && DateFormat.compareDate(this.schctrlModel.startDate, this.dialogData.tripEndDate) === 0 &&
			DateFormat.compareDate(this.schctrlModel.startDate, this.dialogData.tripEndDate) === -1 && this.vCurNum > 0) {
			this.message = this.translateService.translate('oidgenst.tripstartdateshouldbegreaterthen ' + this.dialogData.tripEndDate);
			this.type = 'warn';
			this.show();
			return;
		}
		else if (this.schPlannerModel.vMdate && this.schctrlModel.endDate && DateFormat.compareDate(this.schctrlModel.startDate, this.schPlannerModel.vMdate) < 0) {
			this.message = this.translateService.translate('oidgenst.schedulestartdateshouldbegreaterthen ' + DateFormat.formatMDY(this.schctrlModel.departureDate));
			this.type = 'warn';
			this.show();
			return;
		}
		else if (this.schPlannerModel.vMdate && this.schctrlModel.endDate && DateFormat.compareDate(this.schctrlModel.endDate, this.schPlannerModel.vMdate) === -1) {
			this.message = this.translateService.translate('oidgenst.schedulestartandenddateshouldbemorethan1monthapart');
			this.type = 'warn';
			this.show();
			return;
		}
		this.schInsertList = [];
		this.schInsertList.push(this.schPlannerModel);
		for (let i = 0; i < this.schInsertList.length; i++) {
			this.schInsertList[i].startDate = this.schctrlModel.startDate;
			this.schInsertList[i].endDate = this.schctrlModel.endDate;
			this.schInsertList[i].tripCode = this.schctrlModel.tripCode;
			if (this.schInsertList[i].sunday) {
				this.vAnyRoute = this.schInsertList[i].sunday;
			}
			if (this.schInsertList[i].monday) {
				this.vAnyRoute = this.schInsertList[i].monday;
			}
			if (this.schInsertList[i].tuesday) {
				this.vAnyRoute = this.schInsertList[i].tuesday;
			}
			if (this.schInsertList[i].wednesday) {
				this.vAnyRoute = this.schInsertList[i].wednesday;
			}
			if (this.schInsertList[i].thursday) {
				this.vAnyRoute = this.schInsertList[i].thursday;
			}
			if (this.schInsertList[i].friday) {
				this.vAnyRoute = this.schInsertList[i].friday;
			}
			if (this.schInsertList[i].saturday) {
				this.vAnyRoute = this.schInsertList[i].saturday;
			}

			if (this.schInsertList[i].weekNo) {
				this.vAnyRoute = this.schInsertList[i].weekNo;

			}
		}
		if (!this.vAnyRoute) {
			this.type = 'warn';
			this.show();
			this.message = this.translateService.translate('oidgenst.selectatleastoneroutetogenerateschedule');
			return;
		}

		const obj = this.oidgenstservice.scheduledGenerateCommit(this.schInsertList);
		obj.subscribe(data => {
			if (data.sealFlag === 'sucess') {
				this.schctrlModel.startDate = this.schctrlModel.endDate;
				this.schctrlModel.endDate = DateFormat.getDate(DateFormat.getDate(this.schctrlModel.endDate).setMonth(DateFormat.getDate(this.schctrlModel.endDate).getMonth() + 1));
				this.dialogData['g_commit'] = 'Y';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.type = 'success';
				this.show();
				this.scheduledtripsExecuteQuery();
				this.disablegenratebtn = false;

			} else {
				this.dialogData['g_commit'] = 'N';
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();

			}

		});

	}
	cancel() {
		this.dialog.close(null);
	}
	onRowSchOver(event) {
		if (event) {

		}
	}
	oidgenstSaveschplannerForm(event) {//first grid
		// TODO declare commit bean and add insert list to that object.
		this.schplannerInsertList = event.added
		this.schplannerUpdateList = event.updated
		this.schplannerDeleteList = event.removed

		this.schTripParamCommitModel.insertList = [];
		this.schTripParamCommitModel.updateList = [];
		this.schTripParamCommitModel.deleteList = [];

		if (this.schplannerInsertList.length > 0 || this.schplannerUpdateList.length > 0 || this.schplannerDeleteList.length > 0) {
			for (let i = 0; i < this.schplannerInsertList.length; i++) {
				let weekCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerInsertList[i].weekNo))).length;
				let sundayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerInsertList[i].weekNo) && e.sunday)).length;
				let mondayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerInsertList[i].weekNo) && e.monday)).length;
				let tuesdayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerInsertList[i].weekNo) && e.tuesday)).length;
				let wednesdayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerInsertList[i].weekNo) && e.wednesday)).length;
				let thursdayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerInsertList[i].weekNo) && e.thursday)).length;
				let fridayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerInsertList[i].weekNo) && e.friday)).length;
				let saturdayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerInsertList[i].weekNo) && e.saturday)).length;
				if (weekCount > 1 || sundayCount > 1 || mondayCount > 1 || tuesdayCount > 1 || wednesdayCount > 1 || thursdayCount > 1 || fridayCount > 1 || saturdayCount > 1) {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.weekanddayshouldbeunique');
					this.show();
					this.schplannerInsertList = [];
					return;
				}
				if (this.checkCondition(this.schplannerInsertList)) {
					this.type = 'warn';
					this.message = this.translateService.translate('please provide atleast one route to save');
					this.show();
					this.schplannerInsertList = [];
					return;
				}
				this.schplannerInsertList[i].tripCode = this.schctrlModel.tripCode;
				this.schTripParamCommitModel.insertList = this.schplannerInsertList;
			}
			for (let i = 0; i < this.schplannerUpdateList.length; i++) {
				let sundayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerUpdateList[i].weekNo) && e.sunday)).length;
				let mondayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerUpdateList[i].weekNo) && e.monday)).length;
				let tuesdayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerUpdateList[i].weekNo) && e.tuesday)).length;
				let wednesdayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerUpdateList[i].weekNo) && e.wednesday)).length;
				let thursdayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerUpdateList[i].weekNo) && e.thursday)).length;
				let fridayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerUpdateList[i].weekNo) && e.friday)).length;
				let saturdayCount = this.schplannerData.filter(e => (Number(e.weekNo) === Number(this.schplannerUpdateList[i].weekNo) && e.saturday)).length;
				if (sundayCount > 1 || mondayCount > 1 || tuesdayCount > 1 || wednesdayCount > 1 || thursdayCount > 1 || fridayCount > 1 || saturdayCount > 1) {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.weekanddayshouldbeunique');
					this.show();
					this.schplannerInsertList = [];
					return;
				}
				this.schTripParamCommitModel.updateList = this.schplannerUpdateList;
			}
			for (let i = 0; i < this.schplannerDeleteList.length; i++) {
				this.schTripParamCommitModel.deleteList = this.schplannerDeleteList;
			}
			const scheduledtripsSaveData = this.oidgenstservice.schplannerCommit(this.schTripParamCommitModel);
			scheduledtripsSaveData.subscribe(data => {
				if (data === 1) {
					this.type = 'success';
					this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
					this.show();

					this.schplannerExecuteQuery();
					this.disablegenratebtn = false;
				} else {
					this.type = 'warn';
					this.message = this.translateService.translate('common.addupdateremoverecordfailed');
					this.show();
					return;
				}
			});

		}
	}
	validateRowData1 = (event) => {
		const rowdata = new ValidateRowReturn();
		rowdata.validated = true;
		return rowdata;
	}

	validateRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		const rowIndex = event.rowIndex;
		if (event.field === 'departureDate') {
			if (event.data.departureDate) {
				let day = this.getDay(event.data.departureDate);
				this.scheTripGrid.setColumnData('startDay', rowIndex, day);
				rowdata.validated = true;
				return rowdata;
			}
		}
		if (event.field === 'completionDate') {
			if (event.data.completionDate) {
				let day = this.getDay(event.data.completionDate);
				this.scheTripGrid.setColumnData('endDay', rowIndex, day);
				rowdata.validated = true;
				return rowdata;
			}
		}
		rowdata.validated = true;
		return rowdata;
	}
	oidgenstSavescheduledtripsForm(event) {//second Grid 
		// TODO declare commit bean and add insert list to that object.
		this.tripSchInsertList = event.added
		this.tripSchUpdateList = event.updated
		this.tripSchDeleteList = event.removed

		this.ScheduledTripsCommitModel.insertList = [];
		this.ScheduledTripsCommitModel.updateList = [];
		this.ScheduledTripsCommitModel.deleteList = [];
		if (this.tripSchInsertList.length > 0 || this.tripSchUpdateList.length > 0 || this.tripSchDeleteList.length > 0) {
			for (let i = 0; i < this.tripSchInsertList.length; i++) {
				this.tripSchInsertList[i].tripCode = this.dialogData.tripCode;
				this.tripSchInsertList[i].tripType = this.dialogData.tripType;
				this.tripSchInsertList[i].tripStartDate = this.schctrlModel.startDate;
				this.tripSchInsertList[i].tripEndDate = this.schctrlModel.endDate;
				if (this.tripSchInsertList[i].completionDate == null) {
					if (this.tripSchInsertList[i].departureDate && DateFormat.compareDate(DateFormat.getDate(this.tripSchInsertList[i].departureDate), DateFormat.getDate()) == -1
						&& this.tripSchInsertList[i].departureDateTemp && this.tripSchInsertList[i].departureDateTemp.toJSON() != this.tripSchInsertList[i].departureDate.toJSON()) {
						this.type = 'warn';
						this.message = this.translateService.translate('oidgenst.tripdeparturedatecannotbelessthentodaysdate');
						this.show();
						return;
					}
					if (this.tripSchInsertList[i].departureDate && this.tripSchInsertList[i].endDate && DateFormat.compareDate(DateFormat.getDate(this.tripSchInsertList[i].departureDate), DateFormat.getDate(this.tripSchInsertList[i].endDate)) == 1) {
						this.type = 'warn';
						this.message = this.translateService.translate('oidgenst.tripdeparturedatecannotbegreaterthatscheduleenddate');
						this.show();
						return;
					}
				}
				if (this.tripSchInsertList[i].departureDate != null) {
					if (DateFormat.compareDate(DateFormat.getDate(this.tripSchInsertList[i].departureDate), DateFormat.getDate(DateFormat.getDate())) === -1) {
						this.type = 'warn';
						this.message = this.translateService.translate('oidgenst.departuredatemustbegreaterthantoday');
						this.show();
						return;
					}
				}
				else {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.departuredatemustbeentered');
					this.show();
					return;
				}



				this.tripSchInsertList[i].tripCode = this.schctrlModel.tripCode;
				this.ScheduledTripsCommitModel.insertList = this.tripSchInsertList;
			}

			for (let i = 0; i < this.tripSchUpdateList.length; i++) {
				this.tripSchUpdateList[i].tripType = this.dialogData.tripType;
				this.tripSchUpdateList[i].tripStartDate = this.schctrlModel.startDate;
				this.tripSchUpdateList[i].tripEndDate = this.schctrlModel.endDate;


				if (this.tripSchUpdateList[i].departureDate && DateFormat.compareDate(DateFormat.getDate(this.tripSchUpdateList[i].departureDate), DateFormat.getDate()) == -1
					&& this.tripSchUpdateList[i].departureDateTemp && DateFormat.getDate(this.tripSchUpdateList[i].departureDateTemp).toJSON() != DateFormat.getDate(this.tripSchUpdateList[i].departureDate).toJSON()) {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.tripdeparturedatecannotbelessthentodaysdate');
					this.show();
					return;
				}
				if (this.tripSchUpdateList[i].departureDate && this.tripSchUpdateList[i].tripEndDate && DateFormat.compareDate(DateFormat.getDate(this.tripSchUpdateList[i].departureDate), DateFormat.getDate(this.tripSchUpdateList[i].tripEndDate)) == 1) {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.tripdeparturedatecannotbegreaterthatscheduleenddate');
					this.show();
					return;
				}
				if (this.tripSchUpdateList[i].vCnt > 0 && DateFormat.getDate(this.tripSchUpdateList[i].departureDateTemp).toJSON() != DateFormat.getDate(this.tripSchUpdateList[i].departureDate).toJSON()) {
					this.type = 'warn';
					this.message = this.translateService.translate('Trip already exist for ' + DateFormat.parse(DateFormat.format(this.tripSchUpdateList[i].departureDate)));
					this.show();
					return;
				}

				if (this.tripSchUpdateList[i].ifOffOnTripCur > 0 && this.tripSchUpdateList[i].lNonOffCount > 0) {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.thistripcannotbeupdatedasitalreadyhasoffendersassignedtoit');
					this.show();
					return;
				}

				if (this.tripSchUpdateList[i].departureDate != null) {
					if (DateFormat.compareDate(DateFormat.getDate(this.tripSchUpdateList[i].departureDate), DateFormat.getDate(DateFormat.getDate())) === -1) {
						this.type = 'warn';
						this.message = this.translateService.translate('oidgenst.departuredatemustbegreaterthantoday');
						this.show();
						return;
					}
				}
				else {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.departuredatemustbeentered');
					this.show();
					return;
				}
				if (this.tripSchUpdateList[i].estDepartureTime === null) {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.estimatedendtimemustbeentered');
					this.show();
					return;
				}
				if (this.tripSchUpdateList[i].routeName === null) {
					this.type = 'warn';
					this.message = this.translateService.translate('oidgenst.routenamemustbeentered');
					this.show();
					return;
				}

				this.tripSchUpdateList[i].tripCode = this.schctrlModel.tripCode;
				this.ScheduledTripsCommitModel.updateList = this.tripSchUpdateList;
			}
			for (let i = 0; i < this.tripSchDeleteList.length; i++) {
				if (this.tripSchDeleteList[i].ifOffOnTripCur > 0 || this.tripSchDeleteList[i].lNonOffCount > 0 ||
					this.tripSchDeleteList[i].lStaffCount > 0 || this.tripSchDeleteList[i].lVehicleCount > 0) {
					this.type = 'warn';
					this.message = this.translateService.translate('You cannot delete this Scheduled Trip as either Offenders, Vehicles,' + 'or Staff Members have been assigned to it.');
					this.show();
					return;
				}
				this.ScheduledTripsCommitModel.deleteList = this.tripSchDeleteList;
			}
			const scheduledtripsSaveData = this.oidgenstservice.scheduledtripsCommit(this.ScheduledTripsCommitModel);
			scheduledtripsSaveData.subscribe(data => {
				this.dialogData['g_commit'] = 'N';
				if (data.sealFlag === '2') {
					this.type = 'warn';
					this.message = this.translateService.translate('Trip already exist for ' + DateFormat.parse(DateFormat.format(this.tripSchInsertList[0].departureDate)));
					this.show();
					return;
				}
				if (data.sealFlag === '1') {
					this.type = 'success';
					this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
					this.show();
					this.dialogData['g_commit'] = 'Y';
					this.scheduledtripsExecuteQuery();
				} else {
					this.type = 'warn';
					this.message = this.translateService.translate('Failed');
					this.show();
				}


			});
		}
	}
	scheduledTripsvalidate() {
		const obj = this.oidgenstservice.scheduledTripsvalidate(this.schctrlModel);
		obj.subscribe(data => {
			if (data) {
				this.vCurNum = data.vCurNum;
				this.vMdate = data.vMdate;

			} else {
				this.vCurNum = 0;
				this.vMdate = null;
			}
			this.validateRecord();
		});
	}
	get commonSaveDisable() {
		if (this.schPlannerGrid.addedMap.size > 0 || this.schPlannerGrid.updatedMap.size > 0) {
			return true;
		}
		if (this.scheTripGrid.addedMap.size > 0 || this.scheTripGrid.updatedMap.size > 0 ||
			this.scheTripGrid.removedMap.size > 0) {
			return false;
		}
		if (this.schctrlModel.endDate == null || this.schctrlModel.startDate == null) {
			return false;
		}
		return true;
	}
	startDateValidateModel(event) {
		if (event) {
			this.validateTrue = true;
			this.scheduledTripsvalidate();
		} else {
			this.validateTrue = false;
		}
		if (this.validateTrue && this.validateTrueOne) {
		}
	}
	endDateValidateModel(event) {
		if (event) {
			this.scheduledTripsvalidate();
			this.validateTrueOne = true;
		} else {
			this.validateTrueOne = false;
		}
		if (this.validateTrue && this.validateTrueOne) {
		}
	}

	validateRecord() {
		//this.vCurNum = this.count;
		const date = DateFormat.getDate(DateFormat.getDate(this.schctrlModel.startDate).setMonth(DateFormat.getDate().getMonth() + 1));
		if (this.schctrlModel.endDate && DateFormat.compareDate(this.schctrlModel.endDate, date) === -1) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidgenst.schedulestartandenddateshouldbemorethan1monthapart');
			this.show();
			return;
		}
		else if (this.schctrlModel.startDate && this.schctrlModel.endDate && DateFormat.compareDate(this.schctrlModel.startDate, this.schctrlModel.endDate) === 1) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidgenst.tripstartdatecannotbegreaterthentripenddate');
			this.show();
			return;
		}
		else if (this.schctrlModel.startDate && DateFormat.compareDate(this.schctrlModel.startDate, DateFormat.getDate()) === -1) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidgenst.tripstartdatecannotbesmallerthencurrentdate');
			this.show();
			return;

		}
		else if (this.schctrlModel.endDate && DateFormat.compareDate(this.schctrlModel.endDate, DateFormat.getDate()) === -1) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidgenst.tripenddatecannotbesmallerthencurrentdate');
			this.show();
			return;
		}
		else if (this.schctrlModel.startDate && this.dialogData.tripStartDate && this.dialogData.tripEndDate && DateFormat.compareDate(this.schctrlModel.startDate, this.dialogData.tripStartDate) === 0 &&
			DateFormat.compareDate(this.schctrlModel.startDate, this.dialogData.tripStartDate) === 1 && DateFormat.compareDate(this.schctrlModel.startDate, this.dialogData.tripEndDate) === 0 &&
			DateFormat.compareDate(this.schctrlModel.startDate, this.dialogData.tripEndDate) === -1 && this.vCurNum > 0) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidgenst.tripstartdateshouldbegreaterthen ' + this.dialogData.tripEndDate);
			this.show();
			return;
		}
	}
}