import {
	Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcipowloService } from '../service/ocipowlo.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { VStaffLocation } from '../beans/VStaffLocation';
import { VAssignedOffenders } from '../beans/VAssignedOffenders';


// import required bean declarations

@Component({
	selector: 'app-ocipowlo',
	templateUrl: './ocipowlo.component.html'
	//styleUrls: ['./ocipowlo.component.css']
})

export class OcipowloComponent implements OnInit {
	// Variable declaration

	msgs: any[] = [];
	voffdetData: VStaffLocation[] = [];
	// TODO angular.copy(this.voffdetData, thisvoffdetDataTemp);
	voffdetModel: VStaffLocation = new VStaffLocation();
	voffdetIndex = -1;
	//agencyLocationModel : AgencyLocations = new AgencyLocations();
	vassoffData: VAssignedOffenders[] = [];
	vassoffDataTemp: VAssignedOffenders[] = [];
	// TODO angular.copy(this.vassoffData, thisvassoffDataTemp);
	vassoffModel: VAssignedOffenders = new VAssignedOffenders();
	vassoffIndex = -1;
	dspdescription: string;
	clearDisabled: boolean;
	editable: boolean = true;
	vOffDetColumnDef: any[];
	vAssOffColumnDef: any[];
	staffLr1ReadOnly: boolean;
	fromLocation: string;
	image = null;
	locationCode: string;
	retrieveDisabled: boolean;
	calAgyLocId = {
		'description': this.translateService.translate('common.description'),
		'code': this.translateService.translate('Cal Agy Loc Id')
	};
	constructor(private ocipowloFactory: OcipowloService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.vOffDetColumnDef = [];
		this.vAssOffColumnDef = [];
	}
	ngOnInit() {
		this.clearDisabled = true;
		this.staffLr1ReadOnly = false;
		this.retrieveDisabled = false;
		this.dspdescription = 'ocipowlo/cgfkStaffLr1DspDescriptionRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
		this.vOffDetColumnDef = [
			{
				fieldName: this.translateService.translate('common.name'), field: 'name', editable: false, width: 150, datatype: 'string'
			},
			{
				fieldName: this.translateService.translate('common.position'), field: 'position', editable: false, width: 150, datatype: 'lov', domain: 'STAFF_POS'
			},
			{
				fieldName: this.translateService.translate('ocipowlo.role'), field: 'role', editable: false, width: 150, datatype: 'lov', domain: 'STAFF_ROLE'
			},
			{
				fieldName: this.translateService.translate('common.scheduletype'), field: 'scheduleType', editable: false, width: 150, datatype: 'lov', domain: 'SCHEDULE_TYP'
			},
			{
				fieldName: this.translateService.translate('ocipowlo.hoursperweek'), field: 'hoursPerWeek', editable: false, width: 150, datatype: 'number'
			},
			{
				fieldName: this.translateService.translate('ocipowlo.noOffender'), field: 'noOffender', editable: false, width: 150, datatype: 'number'
			},
		];
		this.vAssOffColumnDef = [
			{
				fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150, datatype: 'string'
			},
			{
				fieldName: this.translateService.translate('ocipowlo.givenname1'), field: 'firstName', editable: false, width: 150, datatype: 'string'
			},
			{
				fieldName: this.translateService.translate('ocipowlo.givenname2'), field: 'middleName', editable: false, width: 150, datatype: 'string'
			},
			{
				fieldName: this.translateService.translate('common.aos'), field: 'offenderIdDisplay', editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('common.gender'), field: 'sexCode', editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('ocipowlo.supervision'), field: 'supervisionLevel', editable: false, width: 150
			},
			// {
			// 	fieldName: this.translateService.translate('ocipowlo.casetype'), field: 'caseType', editable: false, width: 150
			// },
			{
				fieldName: this.translateService.translate('common.status'), field: 'offenderStatus', editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('ocipowlo.assigndate'), field: 'startDate', editable: false, width: 150, datatype: 'date'
			},
		];
	}
	validateRow = (event) => {
		const rowdata = new ValidateRowReturn();
		return rowdata;
	}
	//Fetching the records from database And Display on Screen 
	voffdetExecuteQuery() {
		if (!this.locationCode) {
			this.show('common.locationmustbeentered')
		}
		this.voffdetModel.calAgyLocId = this.locationCode;
		const voffdetResult = this.ocipowloFactory.
			vOffDetExecuteQuery(this.voffdetModel);
		voffdetResult.subscribe(data => {
			if (data.length === 0) {
				this.voffdetData = [];
			} else {
				this.voffdetData = data;
				this.voffdetIndex = 0;
				this.clearDisabled = false;
				this.staffLr1ReadOnly = true;
				this.retrieveDisabled = true;

			}
		});
	}
	//By clicking  on lov  we get First Grid Data 
	dspDescriptionLocEvent(event) {
		if (event) {
			this.locationCode = event.code;
			this.clearDisabled = false;
		} else {
			this.locationCode = undefined;
			this.clearDisabled = true;
		}
	}
	//Fetching the records from database And Display on Screen 
	vAssOffExecuteQuery() {
		const vassoffResult = this.ocipowloFactory.
			vAssOffExecuteQuery(this.vassoffModel);
		vassoffResult.subscribe(data => {
			if (data.length === 0) {
				this.vassoffData = [];
			} else {
				this.vassoffData = data;
				this.vassoffIndex = 0;
				this.clearDisabled = false;
			}
		});
	}
	onRowClickvoffdet(event) {
		if (event) {
			this.vassoffModel.calAgyLocId = event.calAgyLocId;
			this.vassoffModel.sacStaffId = event.staffId;
			this.vassoffModel.position = event.position;
			this.vassoffModel.role = event.role;
			this.vAssOffExecuteQuery();
		}

	}
	onClear = () => {
		this.voffdetData = [];
		this.vassoffData = [];
		this.dspdescription = undefined;
		this.staffLr1ReadOnly = false;
		this.clearDisabled = true;
		this.fromLocation = undefined;
		this.retrieveDisabled = false;
	}

	onLocationBlur() {
		if (!this.fromLocation) {
			this.fromLocation = this.fromLocation === '' ? undefined : '';
		}
	}


	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}

	//By clicking  on second Block rows data  we get Image  
	onRowClickvAssOff(event) {
		if (event) {
			this.vassoffModel = event;
			this.image = event.imageData ? 'data:image/JPEG;base64,' + event.imageData : null;
		} else {
			this.image = null;
		}
	}
}
