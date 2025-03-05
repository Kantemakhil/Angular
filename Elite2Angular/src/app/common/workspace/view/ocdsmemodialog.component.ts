import { StaffDetails } from '../beans/StaffDetails';
import { Teams } from '@inst/casemanagement/beans/Teams';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';
import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdsmemoService } from '@common/workspace/service/ocdsmemo.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { VNameSearch } from '@commonbeans/VNameSearch';
import { OiinamesService } from '@inst/movement-external/service/oiinames.service';
import { OcinamesService } from '@cm/searchassaign/service/ocinames.service';
import { VPimsNameSearch } from '@cm/searchassaign/beans/VPimsNameSearch';


// import required bean declarations

@Component({
	selector: 'app-ocdsmemo',
	templateUrl: './ocdsmemodialog.component.html'
})

export class OcdsmemodialogComponent implements OnInit {
	// Variable declaration
	@ViewChild('teamGrid') teamGrid: any;

	@ViewChild('staffGrid', {static: true}) staffGrid: any;
	@ViewChild('ocdsmemoDialog', {static: true}) ocdsmemoDialog: DialogComponent;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable = true;
	recipientStaffColumnDef: any[];
	recipientTeamsColumnDef: any[];
	staffMemosReadOnly = false;
	recipientTeamsReadOnly = false;
	recipientStaffReadOnly = false;
	buttonCtrlReadOnly = false;
	rgworktypeRg: any[] = [];
	rgworksubtypeRg: any[] = [];
	rgseverityRg: any[] = [];
	rgstaffRg: any[] = [];
	teamData: Teams[] = [];
	teamSelect = new Teams();
	staffSelect = new StaffDetails();
	staffData: StaffDetails[] = [];
	staffmemosModel = new StaffMembers();
	caseLoadId: string;
	caseLoadType: string;
	link: string;
	worktype: string;
	teamStaffMap: Map<string, string> = new Map<string, string>();
	staffTitles = {
		'description': this.translateService.translate('common.name'),
		'code': this.translateService.translate('ocdsmemo.id'),
	};

	vnsearchData: VPimsNameSearch[] = [];
	vnsearchDataTemp: VPimsNameSearch[] = [];
	vnsearchModel: VPimsNameSearch = new VPimsNameSearch();
	worklink: string;
	workSubTypeLink: string;
	offenderId: number;
	rgteamstaffRg: any[];
	namesrchModel: VNameSearch = new VNameSearch();
	namesrchData: VNameSearch[] = [];
	teamTableIndex: number;
	staffTableIndex: number;
	type: string;
	message: any;
	workSubType: string;
	constructor(private ocdsmemoFactory: OcdsmemoService,
		public translateService: TranslateService,
		public sessionManager: UserSessionManager,
		public dialogService: DialogService,
		private oiinamesFactory: OiinamesService,
		private ocinamesFactory: OcinamesService) {
		// TODO initilize data members here..!
		this.recipientStaffColumnDef = [];
		this.recipientTeamsColumnDef = [];
	}
	ngOnInit() {
		
		this.recipientStaffColumnDef = [
			{
				fieldName: this.translateService.translate('ocdsmemo.staff'), field: 'staffId', editable: true, width: 300, datatype: 'lov',
				link: 'ocdsmemo/rgStaffRecordGroup', titles: this.staffTitles
			},
			{ fieldName: '', field: 'staffName', hide: true },
		];
		this.recipientTeamsColumnDef = [
			{ fieldName: this.translateService.translate('ocdsmemo.teams'), field: 'description', editable: false, width: 150 },
			{
				fieldName: '', field: 'button', datatype: 'launchbutton', link: '/OCUTASAT',
				width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.teamLaunchClick,
			},
			{ fieldName: '', field: 'teamId', hide: true },
		];
		this.caseLoadId = this.sessionManager.currentCaseLoad;
		this.worklink = 'ocdsmemo/rgWorkTypeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType;
		this.caseLoadType = this.sessionManager.currentCaseLoadType;
		this.staffmemosModel.acknowledgementFlag = false;
		if (this.caseLoadType && this.caseLoadType === 'INST') {
			this.link = '/oiinamesdialog';
		} else {
			this.link = '/OCINAMESDIALOG';
		}
		
	}

	get teamGridInsert() {
		if (this.staffmemosModel.workType && this.staffmemosModel.workSubType && this.staffmemosModel.workMessage) {
			if (this.staffmemosModel.acknowledgementFlag) {
				if (this.staffmemosModel.acknowledgementSubject) {
					return true;
				} else {
					return false;
				}
			}
			return true;
		} else {
		}
	}

	get clrBtnFlag() {
        if (this.teamData.length === 0 && !this.staffmemosModel.workType &&
            !this.staffmemosModel.workSubType  && !this.staffmemosModel.severity && 
            !this.staffmemosModel.workMessage && this.staffData.length === 0) {
            return true;
        } else {
            return false;
        }
    }
	onWorkTypeBlur() {

		if (!this.staffmemosModel.workType) {
			this.staffmemosModel.workType = this.staffmemosModel.workType === '' ? undefined : '';
			this.staffmemosModel.workSubType ='';
		}
	  }
	  onSubTypeBlur() {

		if (!this.staffmemosModel.workSubType) {
			this.staffmemosModel.workSubType = this.staffmemosModel.workSubType === '' ? undefined : '';
		}
	  }

onSeverityBlur() {

		if (!this.staffmemosModel.severity) {
			this.staffmemosModel.severity = this.staffmemosModel.severity === '' ? undefined : '';
		}
	  }
	  
	get CheckBoxEnable() {
		if (this.staffmemosModel.workType && this.staffmemosModel.workSubType) {
			return false;
		} else {
			return true;
		}

	}
	changeWorkType(event) {
		if (event && this.staffmemosModel.workType) {
			this.staffmemosModel.workSubType = '';
			this.worktype = event.description;
			this.staffmemosModel.workId = 0;
			this.workSubTypeLink = 'ocdsmemo/rgWorkSubTypeRecordGroup?workType=' + this.staffmemosModel.workType
				+ '&caseloadType=' + this.sessionManager.currentCaseLoadType;

			const rgteamstaffServiceObj = this.ocdsmemoFactory.
				rgWorkSubTypeRecordGroup(this.staffmemosModel.workType, this.sessionManager.currentCaseLoadType);
			rgteamstaffServiceObj.subscribe(rgteamstaffList => {
				if (rgteamstaffList.length === 0) {
					this.rgteamstaffRg = [];
				} else {
					for (let i = 0; i < rgteamstaffList.length; i++) {
						this.teamStaffMap.set(rgteamstaffList[i].code, rgteamstaffList[i].workId);
					}
				}
			});

		}
	}

	changeWorkSubType(event){
       if(event) {
		this.workSubType = event.description;
	   }

	}
	ociNamesExecuteQuery() {
		if (this.staffmemosModel.offenderId) {
			this.vnsearchModel.offenderIdDisplay = String(this.staffmemosModel.offenderId);
			for (let i = Number(String(this.vnsearchModel.offenderIdDisplay).length); i < 10; i++) {
				this.vnsearchModel.offenderIdDisplay = '0' + this.vnsearchModel.offenderIdDisplay;
			}
			const vnsearchResult = this.ocinamesFactory.
				vNSearchExecuteQuery(this.vnsearchModel);
			vnsearchResult.subscribe(vnsearchResultList => {
				if (vnsearchResultList.length === 0) {
					this.vnsearchData = [];
					this.staffmemosModel.lastName = '';
					this.staffmemosModel.offenderId = 0;
					this.staffmemosModel.firstName = '';
					this.staffmemosModel.prisonLocation = '';
					this.staffmemosModel.offenderBookId = 0;
				} else {
					this.vnsearchData = vnsearchResultList;
					this.staffmemosModel.lastName = vnsearchResultList[0].lastName;
					this.staffmemosModel.offenderId = Number(vnsearchResultList[0].offenderIdDisplay);
					this.staffmemosModel.firstName = vnsearchResultList[0].firstName;
					this.staffmemosModel.prisonLocation = vnsearchResultList[0].prisonLocation;
					this.staffmemosModel.offenderBookId = vnsearchResultList[0].offenderBookId;

				}
			});
		}
	}
	offenderDetails() {
		if (this.staffmemosModel.offenderId) {
			if (this.caseLoadType && this.caseLoadType === 'INST') {
				this.oiiNamesExecuteQuery();
			} else {
				this.ociNamesExecuteQuery();
			}

		}


	}
	oiiNamesExecuteQuery() {
		if (this.staffmemosModel.offenderId) {
			this.namesrchModel.offenderIdDisplay = String(this.staffmemosModel.offenderId);
			for (let i = Number(String(this.namesrchModel.offenderIdDisplay).length); i < 10; i++) {
				this.namesrchModel.offenderIdDisplay = '0' + this.namesrchModel.offenderIdDisplay;
			}
			const namesrchResult = this.oiinamesFactory.
				namesrchExecuteQuery(this.namesrchModel);
			namesrchResult.subscribe(data => {
				if (data.length === 0) {
					this.namesrchData = [];
					this.staffmemosModel.lastName = '';
					this.staffmemosModel.offenderId = 0;
					this.staffmemosModel.firstName = '';
					this.staffmemosModel.prisonLocation = '';
					this.staffmemosModel.offenderBookId = 0;
				} else {
					this.namesrchData = data;
					this.staffmemosModel.lastName = data[0].lastName;
					this.staffmemosModel.offenderId = Number(data[0].offenderIdDisplay);
					this.staffmemosModel.firstName = data[0].firstName;
					this.staffmemosModel.prisonLocation = data[0].livingUnitDescription;
					this.staffmemosModel.offenderBookId = data[0].offenderBookId;
				}
			});
			this.oiinamesFactory.oiiflag = true;

		}
	}
	setOffenderDetails(event) {
		if (event !== undefined && event !== null) {
			this.staffmemosModel.lastName = event.lastName;
			this.staffmemosModel.offenderId = event.offenderIdDisplay;
			this.staffmemosModel.firstName = event.firstName;
			this.staffmemosModel.prisonLocation = event.livingUnitDescription;
			this.staffmemosModel.offenderBookId = event.offenderBookId;


		}
	}
	validateRow = (event) => {
		const rowdata = new ValidateRowReturn();
		return rowdata;
	} 	 /**
	  * This function displays the messages
	  */
	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}

	onRowClickrecipientteams(event) {
		if (event) {
			this.teamSelect = event;
		}
	}
	onRowClickrecipientstaff(event) {
		if (event) {
			this.staffSelect = event;
		}
	}
	onButExitclick() {
		this.ocdsmemoDialog.close(null);
	}
	onAocLaunchClick = () => {
		if (!this.workTypeValidations()) {
			return;
		}
		return true;
	}

	onGridInsert = () => {
		if (!this.gridInsertValidation()) {
			return false;
		}
		if (!this.teamGridValidation()) {
			return false;
		}
		return {
			button: '..', description: '', teamId: '',
		};

	}

	teamGridValidation() {
		const is = { valid: true };
		this.teamData.forEach(data => {
			if (is.valid) {
				if (!data.description || !data.description.trim()) {
					this.show('ocdsmemo.teammustentered', 'warn');
					is.valid = false;
					return;
				}
			}
		});
		return is.valid;

	}
	staffGridValidation() {
		const is = { valid: true };
		this.staffData.forEach(data => {
			if (is.valid) {
				if (!data.staffId) {
					this.show('ocdsmemo.staffmustentered', 'warn');
					is.valid = false;
					return;
				}
			}
		});

		return is.valid;
	}
	onGridClear = () => {
		const index = this.teamData.indexOf(this.teamSelect);
		this.teamData.splice(index, 1);
		if (this.teamData.length === 0) {
			return true;
		}
		if (this.teamData[index]) {
			this.teamTableIndex = index;
		} else {
			this.teamTableIndex = index - 1;
		}
		return false;


	}

	onStaffGridClear = () => {
		const index = this.staffData.indexOf(this.staffSelect);
		this.staffData.splice(index, 1);
		if (this.staffData.length === 0) {
			return true;
		}
		if (this.staffData[index]) {
			this.staffTableIndex = index;
		} else {
			this.staffTableIndex = index - 1;
		}
		return false;


	}

	onStaffGridInsert = () => {
		if (!this.gridInsertValidation()) {
			return false;
		}
		if (!this.staffGridValidation()) {
			return false;
		}
		return {
			staffName: '', staffId: 0,
		};
	}
	acknowledgeChange(event) {
		this.staffmemosModel.acknowledgementSubject = '';
		if (event.checked) {
			if (!this.workTypeValidations()) {
				this.staffmemosModel.acknowledgementFlag = !event.checked;
				return false;
			}
			this.staffmemosModel.acknowledgementFlag = event.checked;
		} else {
			this.staffmemosModel.acknowledgementFlag = event.checked;
		}

		return true;
	}
	workTypeValidations() {
		if (!this.staffmemosModel.workType) {
			this.show('ocdsmemo.memotypemust');
			return false;
		}
		if (!this.staffmemosModel.workSubType) {
			this.show('ocdsmemo.subtypemust');
			return false;
		}
		return true;
	}

	memoValidations() {
		if (!this.gridInsertValidation()) {
			return false;
		}

		return true;

	}
	gridInsertValidation() {
		if (!this.workTypeValidations()) {
			return false;
		}
		if (this.staffmemosModel.acknowledgementFlag && !this.staffmemosModel.acknowledgementSubject) {
			this.show('ocdsmemo.acknowledgemust');
			return false;
		}
		if (!this.staffmemosModel.workMessage) {
			this.show('ocdsmemo.memodetailmust');
			return false;
		}
        return true;
	}



	sendMessageValidation() {
		if (!this.memoValidations()) {
			return false;
		}
		if (this.teamData.length === 0 && this.staffData.length === 0) {
			this.show('ocdsmemo.teamstaffmandatory');
			return false;

		}
		if(!this.teamGridValidation ()){
			return false;
		}
		if (!this.staffGridValidation()) {
			return false;
		}
		
		return true;
	}

	staffMemosExecuteQuery() {
		const addphResult = this.ocdsmemoFactory.staffMemosExecuteQuery(this.staffmemosModel);
		addphResult.subscribe(data => {
			if (data.length === 0) {
				this.teamData = [];
			} else {
				this.teamData = data[0];
			}
		});
	}
	teamLaunchClick = (data) => {
		this.dialogService.openLinkDialog('/OCUTASAT', data, 70).subscribe(res => {
			if (res) {

				this.teamGrid.setColumnData('teamId', this.teamData.indexOf(data), res.teamId);
				this.teamGrid.setColumnData('description', this.teamData.indexOf(data), res.teamIdDesc);

			}
		});
	}
	showPopUp() {
		const data = {
			label: this.translateService.translate('ocdsmemo.popup').replace('%workType%',  '"' + this.worktype + '"').
				replace('%workSubType%',  '"'+ this.workSubType + '"'),
			yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
			if (result) {
				this.saveMemoData();
			} else {
			}
		});

	}
	saveMemoData() {
		const saveMemoData = this.ocdsmemoFactory.getStaffMessage(this.staffmemosModel);
		saveMemoData.subscribe(data => {
			if (data && data === 1) {
				this.type = 'success';
			this.message = this.translateService.translate('ocdsmemo.successpopup').replace('%workType%', '"' + this.worktype + '"').
			replace('%workSubType%','"'+ this.workSubType + '"');
            this.show(this.message,this.type);
            this.clearFields();
			} else if (data === 2) {

			}

		});
	}
	clearFields() {
	this.staffmemosModel = new StaffMembers ();
	this.teamData = [];
	this.staffData = [];


	}
	sendMessage() {
		if (!this.sendMessageValidation()) {
			return;
		}
		this.staffmemosModel.workId = Number(this.teamStaffMap.get(this.staffmemosModel.workSubType));
		this.staffmemosModel.teamList = this.teamData;
		this.staffmemosModel.staffList = this.staffData;
		this.staffData.forEach(obj => {
			obj.staffId = Number(obj.staffId);
		});
		const memoSaveData = this.ocdsmemoFactory.staffMemoComitt(this.staffmemosModel);
		memoSaveData.subscribe(data => {
			if (data && data === 1) {
				this.showPopUp();
			} else if (data === 2) {

			}

		});
	}

}
