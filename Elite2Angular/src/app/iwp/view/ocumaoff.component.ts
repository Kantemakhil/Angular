import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { StaffLocationRoles } from '@sa/usersystemsecurity/beans/StaffLocationRoles';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { StaffLocationRolesCommitBean } from '@sa/usersystemsecurity/beans/StaffLocationRolesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OcumaoffService } from '../service/ocumaoff.service';
// import required bean declarations

@Component({
	selector: 'app-ocumaoff',
	templateUrl: './ocumaoff.component.html'
})

export class OcumaoffComponent implements OnInit {
	@ViewChild('addstaffGrid') addstaffGrid: any;
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	addStaffColumnDef: any[];
	addStaffReadOnly: boolean = false;
	cgfkAddstaffroleRg: any[] = [];
	cgfkAddstaffdsplastnameRg: any[] = [];
	cgfkAddstaffpositionRg: any[] = [];
	cgfkAddstaffscheduletypeRg: any[] = [];
	msglist: any[];
	message: any;
	type: any;

	tableIndex: number;
	okMsg: string;
	enableUpdate: boolean;
	count: number;
	addStaffModel: StaffLocationRoles = new StaffLocationRoles()
	addStaffData: StaffLocationRoles[] = [];
	addStaffUpdateList: StaffLocationRoles[] = [];
	genAddStaffUpdateList: StaffLocationRoles[] = [];
	addStaffCommitModel: StaffLocationRolesCommitBean = new StaffLocationRolesCommitBean()
	officerModel: StaffLocationRoles = new StaffLocationRoles()

	constructor(private ocumaoffFactory: OcumaoffService, public translateService: TranslateService, public sessionManager: UserSessionManager,
		public dialogService: DialogService) {
		this.addStaffColumnDef = [];
	}
	ngOnInit() {
		this.enableUpdate = true;
		this.officerModel = this.dialog.data;
		this.addOfficerExecuteQuery();
		this.addStaffColumnDef = [
			{
				fieldName: this.translateService.translate('common.lastname'), field: 'lastName', datatype: 'text',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('common.firstname'), field: 'firstName', datatype: 'text',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('ocumaoff.bithDate'), field: 'birthDate', datatype: 'date',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('common.position'), field: 'position', datatype: 'text',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('common.role'), field: 'role', datatype: 'text',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('common.scheduletype'), field: 'scheduleType', datatype: 'text',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('ocumaoff.hrsPerWk'), field: 'hoursPerWeek', datatype: 'number',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('ocumaoff.selectOfficer'), field: 'chkSelectOff', datatype: 'checkbox',
				editable: true, width: 150
			},

			{ fieldName: '', field: 'savaValid', hide: true },
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
	onRowClickaddstaff(event) {
		if (event) {
			this.addStaffModel = event;
		}
	}
	ok() {
	}
	no() {
	}
	cancel() {
	}
	onOffenderChange(offender) {
	}

	validateRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		const rowIndex = this.addStaffData.indexOf(event.data);
		rowdata.validated = true;
		return rowdata;
	}

	addOfficerExecuteQuery() {
		const serviceObj = this.ocumaoffFactory.addOfficerExecuteQuery(this.officerModel);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.addStaffData = [];
				this.tableIndex = -1;
			} else {
				this.tableIndex = 0;
				this.addStaffData = data;
				this.addStaffModel = data[0];
			}
		});
	}

	save(event) {
		this.addStaffUpdateList = event.updated;
		this.addStaffCommitModel.updateList = [];
		this.count = 0;
		this.addStaffUpdateList = this.addStaffData.filter(element => {
			if (element.chkSelectOff) {
				this.count++;
				element.supervisorStaffId = this.officerModel.sacStaffId;
				element.supervisorPosition = this.officerModel.position;
				element.supervisorRole = this.officerModel.role;
				element.supervisorAgyLocId = this.officerModel.calAgyLocId;
				element.supervisorFromDate = this.officerModel.fromDate;
				return true;
			}
		});
		if (this.count === 0) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocumaoff.checkRecord');
			this.show();
			return;
		}
		
		this.addStaffCommitModel.updateList = this.addStaffUpdateList;
		this.okMsg = this.translateService.translate('ocumaoff.confirm').
			replace('%officers%', this.addStaffUpdateList.length.toString()).replace('%firstName%', this.officerModel.firstName).replace('%lastName%', this.officerModel.lastName);
		const okData = {
			label: this.okMsg,
			yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/ocucoffeconfirmbox', okData, 50).subscribe(result => {
			if (result) {
				const scheduleSaveData = this.ocumaoffFactory.updateSupervosor(this.addStaffCommitModel);
				scheduleSaveData.subscribe(data => {
					if (data === 1) {
						this.addOfficerExecuteQuery();
						this.type = 'success';
						this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
						this.show();
					} else {
						this.type = 'warn';
						this.message = this.translateService.translate('common.addupdateremoverecordfailed');
						this.show();
					}
				});
			} else {
				const index = this.addStaffData.indexOf(this.addStaffModel);
				this.addstaffGrid.setColumnData('savaValid', index, 'TEXT');
			}
		});

	}

	onButExitclick() {
		this.count = 0;
		this.genAddStaffUpdateList = this.addStaffData.filter(element => {
			if (element.chkSelectOff) {
				this.count++;
				element.supervisorStaffId = this.officerModel.sacStaffId;
				element.supervisorPosition = this.officerModel.position;
				element.supervisorRole = this.officerModel.role;
				element.supervisorAgyLocId = this.officerModel.calAgyLocId;
				element.supervisorFromDate = this.officerModel.fromDate;
				return true;
			}
		});
		if (this.count === 0) {
			this.dialog.close(null);
			return;
		}

		this.addStaffCommitModel.updateList = this.genAddStaffUpdateList;

		this.okMsg = this.translateService.translate('ocumaoff.confirm').
			replace('%officers%', this.genAddStaffUpdateList.length.toString()).replace('%firstName%', this.officerModel.firstName).replace('%lastName%', this.officerModel.lastName);
		const okData = {
			label: this.okMsg,
			yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/ocucoffeconfirmbox', okData, 50).subscribe(result => {
			if (result) {
				const scheduleSaveData = this.ocumaoffFactory.updateSupervosor(this.addStaffCommitModel);
				scheduleSaveData.subscribe(data => {
					if (data === 1) {
						this.addOfficerExecuteQuery();
						this.dialog.close(null);
					} else {
						this.type = 'warn';
						this.message = this.translateService.translate('common.addupdateremoverecordfailed');
						this.show();
					}
				});
			} else {
				this.dialog.close(null);
			}
		});
	}

	onGridClear = () => {
        this.addOfficerExecuteQuery();
        return true ;
    }
}
