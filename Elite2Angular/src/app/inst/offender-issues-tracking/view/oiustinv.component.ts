import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiustinvService } from '../service/oiustinv.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderGrievStaffs } from '../beans/OffenderGrievStaffs';
import { OffenderGrievStaffsCommitBean } from '../beans/OffenderGrievStaffsCommitBean';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { StaffMembers } from '../../incidents-oic/beans/StaffMembers';
import { OidissueService } from '../service/oidissue.service';
// import required bean declarations

@Component({
	selector: 'app-oiustinv',
	templateUrl: './oiustinv.component.html'
})

export class OiustinvComponent implements OnInit {
	// Variable declaration
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	offendergrievstaffsData: OffenderGrievStaffs[] = [];
	offendergrievstaffsDataTemp: OffenderGrievStaffs[] = [];
	// TODO angular.copy(this.offendergrievstaffsData, thisoffendergrievstaffsDataTemp);
	offendergrievstaffsModel: OffenderGrievStaffs = new OffenderGrievStaffs();
	offendergrievstaffsIndex: number = 0;
	offendergrievstaffsInsertList: OffenderGrievStaffs[] = [];
	offendergrievstaffsUpdatetList: OffenderGrievStaffs[] = [];
	offendergrievstaffsDeleteList: OffenderGrievStaffs[] = [];
	offenderGrievStaffsCommitModel: OffenderGrievStaffsCommitBean = new OffenderGrievStaffsCommitBean();
	staffMembersList: StaffMembers[] = [];
	staffMembersData: StaffMembers = new StaffMembers();
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	offenderGrievStaffsColumnDef: any[];
	offenderGrievStaffsReadOnly: boolean = false;
	rgstaffRg: any[] = [];
	@ViewChild('dialog', {static: true}) dialog: DialogComponent;
	@ViewChild('grid') grid: any;
	tableIndex = -1;
	
	rowIndex: number;
	constructor(private oidissueFactory: OidissueService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.offenderGrievStaffsColumnDef = [];
	}
	ngOnInit() {
		this.offenderGrievStaffsColumnDef = [
			{
				fieldName: this.translateService.translate('oidcount.staffid') + '*', link: 'oidissue/rgStaffRecordGroupone', field: 'tempStaffId',
				editable: true, width: 150, datatype: 'lov',  source:'OUMPERSO'
			},
			{ fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('common.firstname'), field: 'firstName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('common.middlename'), field: 'middleName', editable: false, width: 150 },
		];
		// TODO all initializations here
		var serviceObj;
		this.offendergrievstaffsExecuteQuery();
	}
	/** 
	 * This function displays the messages
	 */
	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}
	onRowClickoffendergrievstaffs(event) {
		if (event) {
			this.offendergrievstaffsModel = event;
		}
	}
	validateRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		const index = event.rowIndex;
		this.rowIndex = index;
		if (event.field === 'tempStaffId' && event.newValue) {
			if (event && event.data && event.data.tempStaffId)
				this.offenderGrievStaffsPostQuery(event.data.tempStaffId, index);
		}
		rowdata.validated = true;
		return rowdata;
	}
	offenderGrievStaffsPostQuery(tempStaffId, index) {
		this.staffMembersData.staffId = Number(tempStaffId);
		const offendergrievstaffsResult = this.oidissueFactory.offenderGrievStaffsPostQuery(this.staffMembersData);
		offendergrievstaffsResult.subscribe(staffMembersList => {
			if (staffMembersList.length === 0) {
				this.staffMembersList = [];
			} else {
				this.staffMembersList = staffMembersList;
				this.staffMembersData = staffMembersList[0];
				this.grid.setColumnData('lastName', index, this.staffMembersData.lastName);
				this.grid.setColumnData('firstName', index, this.staffMembersData.firstName);
				this.grid.setColumnData('middleName', index, this.staffMembersData.middleName);
			}
		});
	}
	onGridInsert = () => {
		if (!this.oiustinvValidation()) {
			return;
		}
		return {
			modifyUserId: this.sessionManager.getId(),
			modifyDatetime: DateFormat.getDate(),
			grievanceId: this.dialog.data.grievanceId
		};
	}
	onGridClear = () => {
		this.offendergrievstaffsExecuteQuery();
		return true;
	}
	oiustinvValidation = () => {
		const is = { valid: true };
		if (this.offendergrievstaffsData && this.offendergrievstaffsData) {
			this.offendergrievstaffsData.forEach(element => {
				if (!element.tempStaffId) {
					this.show('oiustinv.staffidmsg', 'warn');
					is.valid = false;
					return is.valid;
				}
			});
		}
		return is.valid;
	}
	cancel() {
		this.dialog.close(true);
	}
	offendergrievstaffsExecuteQuery() {
		this.offendergrievstaffsModel.grievanceId = this.dialog.data.grievanceId;
		const offendergrievstaffsResult = this.oidissueFactory.offenderGrievStaffsExecuteQuery(this.offendergrievstaffsModel);
		offendergrievstaffsResult.subscribe(offendergrievstaffsResultList => {
			if (offendergrievstaffsResultList.length === 0) {
				this.offendergrievstaffsData = [];
			} else {
				this.offendergrievstaffsData = offendergrievstaffsResultList;
				for(let i=0;i<this.offendergrievstaffsData.length;i++){
					this.offendergrievstaffsData[i].tempStaffId=this.offendergrievstaffsData[i].staffId.toString()
				}
				this.offendergrievstaffsModel = offendergrievstaffsResultList[0];
				this.tableIndex = 0;
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	oiustinvSaveoffendergrievstaffsForm(event) {
		// TODO declare commit bean and add insert list to that object.
		if (!this.oiustinvValidation()) {
			return;
		}
		for(let i=0;i<this.offendergrievstaffsData.length;i++){
			for(let j=0;j<this.offendergrievstaffsData.length;j++){
				if(i!==j && this.offendergrievstaffsData[i].tempStaffId===this.offendergrievstaffsData[j].tempStaffId){
					this.show(this.translateService.translate('oiustinv.duplicatestaff'),'warn');
					return;
				}
			}
		}
		this.offendergrievstaffsInsertList = event.added;
		this.offendergrievstaffsUpdatetList = event.updated;
		this.offendergrievstaffsDeleteList = event.removed;
		this.offenderGrievStaffsCommitModel.insertList = [];
		this.offenderGrievStaffsCommitModel.updateList = [];
		this.offenderGrievStaffsCommitModel.deleteList = [];
		if (this.offendergrievstaffsInsertList.length > 0) {
			this.offendergrievstaffsInsertList.forEach(element => {
				element.createDatetime = DateFormat.getDate();
				element.staffId=Number(element.tempStaffId);
			});
			this.offenderGrievStaffsCommitModel.insertList = this.offendergrievstaffsInsertList;
		}
		if (this.offendergrievstaffsUpdatetList.length > 0) {

			this.offendergrievstaffsUpdatetList.forEach(element => {
				element.createDatetime = DateFormat.getDate();
				element.staffId=Number(element.tempStaffId);
			});
			this.offenderGrievStaffsCommitModel.updateList = this.offendergrievstaffsUpdatetList;
		}
		if (this.offendergrievstaffsDeleteList.length > 0) {
			this.offenderGrievStaffsCommitModel.deleteList = this.offendergrievstaffsDeleteList;
		}
		const offendergrievstaffsSaveData = this.oidissueFactory.offenderGrievStaffsCommit(this.offenderGrievStaffsCommitModel);
		offendergrievstaffsSaveData.subscribe(data => {
			if (String(data[0].errorMessage).indexOf('OFFENDER_GRIEV_STF_PK') > 0) {
				this.show('oumhocodau.primarykeyval', 'warn');
				this.offendergrievstaffsExecuteQuery();
				return;
			}
			if (data && data[0] && data[0].returnValue === 1) {
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.offendergrievstaffsExecuteQuery();
			} else {
				this.show('common.addupdateremoverecordfailed', 'warn');
			}
		});
	}


}
