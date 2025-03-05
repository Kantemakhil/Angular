import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmshierService } from '../service/ocmshier.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffLocationRoles } from '@sa/usersystemsecurity/beans/StaffLocationRoles';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';



@Component({
	selector: 'app-ocmshier',
	templateUrl: './ocmshier.component.html'
	// styleUrls: ['./ocmshier.component.css']
})

export class OcmshierComponent implements OnInit {
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	// Variable declaration
	msgs: any[] = [];
	stafflrData: StaffLocationRoles[] = [];
	// TODO angular.copy(this.stafflrData, thisstafflrDataTemp);
	stafflrModel: StaffLocationRoles = new StaffLocationRoles();
	stafflrIndex = -1;
	stafflr1Data: StaffLocationRoles[] = [];
	stafflr1Model: StaffLocationRoles = new StaffLocationRoles();
	stafflr1delete: StaffLocationRoles = new StaffLocationRoles();
	stafflr1Index = -1;
	editable: boolean;
	staffLrColumnDef: any[];
	staffLr1ColumnDef: any[];
	fromDspDescriptionLov: string;
	retrieveDisabled: boolean;
	clearDisabled: boolean;
	dspDescriptionReadOnly: boolean;
	okMsg: string;
	locationCode: string;
	removeDisabled: boolean;
	fromLocation: string;
	addDisabled: boolean;
	locationtitles = {
		'description': this.translateService.translate('Location'),
		'code': this.translateService.translate('Location')
	};
	positionLovTitles = {
		description: this.translateService.translate('Description'),
		code: this.translateService.translate('Code')
	};
	roleLovTitles = {
		'description': this.translateService.translate('Description'),
		'code': this.translateService.translate('Code')
	};
	scheduleTypeTitles = {
		'description': this.translateService.translate('Description'),
		'code': this.translateService.translate('Code')
	};
	
	constructor(private ocmshierFactory: OcmshierService, public translateService: TranslateService, public sessionManager: UserSessionManager, public dialogService: DialogService) {
		// TODO initilize data members here..!
		this.staffLrColumnDef = [];
		this.staffLr1ColumnDef = [];

	}
	ngOnInit() {
		this.fromDspDescriptionLov = 'ocmshier/calAgyLocIdRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
		this.dspDescriptionReadOnly = false;
		this.retrieveDisabled = false;
		this.dspDescriptionReadOnly = false;
		this.removeDisabled = true;
		this.clearDisabled = true;
		this.addDisabled = true;
		this.staffLrColumnDef = [
			{
				fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150, datatype: 'text',

			},
			{
				fieldName: this.translateService.translate('common.firstname'), field: 'firstName', width: 150, editable: false, datatype: 'text'
			},
			{
				fieldName: this.translateService.translate('ocmshier.birthdate'), field: 'birthdate', width: 150, editable: false, datatype: 'date'
			},
			{
				fieldName: this.translateService.translate('common.position'), field: 'position', width: 150, editable: false, datatype: 'lov', domain: 'STAFF_POS', title: 'positionLovTitles'
			},
			{
				fieldName: this.translateService.translate('common.role'), field: 'role', width: 150, editable: false, datatype: 'lov', domain: 'STAFF_ROLE', title: 'roleLovTitles'
			},
			{
				fieldName: this.translateService.translate('common.scheduletype'), field: 'scheduleType', width: 150, editable: false, datatype: 'lov', domain: 'SCHEDULE_TYP', title: 'scheduleTypeTitles'
			},
			{
				fieldName: this.translateService.translate('ocmshier.hoursperweek'), field: 'hoursPerWeek', width: 150, editable: false, datatype: 'number'
			},
		];
		this.staffLr1ColumnDef = [
			{
				fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150, datatype: 'text',

			},
			{
				fieldName: this.translateService.translate('common.firstname'), field: 'firstName', editable: false, width: 150, datatype: 'text'
			},
			{
				fieldName: this.translateService.translate('ocmshier.birthdate'), field: 'birthdate', editable: false, width: 150, datatype: 'date'
			},
			{
				fieldName: this.translateService.translate('common.position'), field: 'position', editable: false, width: 150, datatype: 'lov', domain: 'STAFF_POS', title: 'positionLovTitles'
			},
			{
				fieldName: this.translateService.translate('common.role'), field: 'role', editable: false, width: 150, datatype: 'lov', domain: 'STAFF_ROLE', title: 'roleLovTitles'
			},
			{
				fieldName: this.translateService.translate('common.scheduletype'), field: 'scheduleType', editable: false, width: 150, datatype: 'lov', domain: 'SCHEDULE_TYP', title: 'scheduleTypeTitles'
			},
			{
				fieldName: this.translateService.translate('ocmshier.hoursperweek'), field: 'hoursPerWeek', editable: false, width: 150, datatype: 'number'
			},
		];
	}
	// 		Insert =  () => { // TODO implement on grid insert 
	//  } 	
	// validateRow = (event) => {
	// 	const rowdata = new ValidateRowReturn();
	// 	const rowIndex = this.stafflrData.indexOf(event.data);
	// 	rowdata.validated = true;
	// 	return rowdata;
	// } 	
	stafflrExecuteQuery() {
		if(!this.locationCode){
			this.show('common.locationmustbeentered');
			return;
		}
		this.stafflrModel.calAgyLocId = this.locationCode;
		const stafflrResult = this.ocmshierFactory.staffLrExecuteQuery(this.stafflrModel);
		stafflrResult.subscribe(data => {
			if (data.length === 0) {
				this.stafflrData = [];
				this.stafflrIndex = -1;
				this.show('common.querycausednorecords', 'warn');
			} else {
				this.stafflrData = data;
				this.stafflrIndex = 0;
				this.retrieveDisabled = true;
				this.dspDescriptionReadOnly = true;
				this.clearDisabled = false;
				this.addDisabled = false;
			}
		});
	}
	stafflr1ExecuteQuery() {
		const stafflr1Result = this.ocmshierFactory.staffLr1ExecuteQuery(this.stafflr1Model);
		stafflr1Result.subscribe(data => {
			if (data.length === 0) {
				this.stafflr1Data = [];
				this.stafflr1Index = -1;
				this.removeDisabled = true;
			} else {
				this.stafflr1Data = data;
				this.stafflr1Index = 0;
				this.addDisabled = false;
				this.removeDisabled = false;
			}
		});
	}
	onRowClickStaffLr(event) {
		if (event) {
			this.stafflr1Model.sacStaffId = event.sacStaffId;
			this.stafflr1Model.position = event.position;
			this.stafflr1Model.role = event.role;
			this.stafflr1Model.calAgyLocId = event.calAgyLocId;
			this.stafflr1Model.fromDate = event.fromDate;
			this.stafflrModel = event;
			this.stafflr1ExecuteQuery();
		}


	}
	descriptionLovEvent(event) {
		if (event) {
			this.locationCode = event.code;
			this.clearDisabled = false;
		}
		else {
			this.locationCode = undefined;
			this.clearDisabled = true;
		}
	}
	onRowClickStaffLr1(event) {
		if (event != null) {
			this.stafflr1delete = event;
		}
	}
	/**
	* This function displays the messages
	*/
	show(validmsg, type?) {
		type = type ? type : 'warn';
		validmsg = this.translateService.translate(validmsg);
		const msgval = [{ message: validmsg, type: type }];
		this.msgs = [...msgval];
	}

	remove() {
		 
			this.okMsg = this.translateService.translate('ocmshier.removeconfirm');
			const okData = {
				label: this.okMsg,
				yesBtn: true, noBtn: true
			};
			this.dialogService.openLinkDialog('/ocucoffeconfirmbox', okData, 30).subscribe(result => {
				if (result) {
					const removeData = this.ocmshierFactory.removeData(this.stafflr1delete);
					removeData.subscribe(data => {
						if (data === 1) {
							this.show('common.addupdateremoverecordsuccess', 'success');
							this.stafflr1ExecuteQuery();
							this.dialog.close(null);

						} else {
							this.show('common.addupdateremoverecordfailed', 'warn');
							this.stafflr1ExecuteQuery();
						}
					});
				}
				else {
					this.dialog.close(null);
				}
			});
		}
	

	

	onLocationBlur() {
		if (!this.fromLocation) {
			this.fromLocation = this.fromLocation === '' ? undefined : '';
		}
	}

	onClear = () => {
		this.stafflrData = [];
		this.stafflr1Data = [];
		this.fromDspDescriptionLov = undefined;
		this.dspDescriptionReadOnly = false;
		this.clearDisabled = true;
		this.retrieveDisabled = false;
		this.fromLocation = undefined;
		this.addDisabled = true;
		this.removeDisabled = true;
	}

	addOfficers = () => {
		this.dialogService.openLinkDialog('/OCUMAOFF', this.stafflrModel, 80).subscribe(result => {
			this.stafflr1ExecuteQuery();
		});
	}
}
