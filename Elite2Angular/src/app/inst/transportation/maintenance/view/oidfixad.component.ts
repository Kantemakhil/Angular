import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidfixadService } from '../service/oidfixad.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { FixedAssets } from '@inst/transportation/maintenance/beans/FixedAssets';
import { Vehicles } from '@inst/transportation/maintenance/beans/Vehicles';
import { OidfixadCommitBean } from '@inst/transportation/maintenance/beans/OidfixadCommitBean';
import { FixedAssetsCommitBean } from '../beans/FixedAssetsCommitBean';
import { VehiclesCommitBean } from '../beans/VehiclesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
// import required bean declarations
@Component({
	selector: 'app-otdsubat',
	templateUrl: './oidfixad.component.html'
})

export class OidfixadComponent implements OnInit {
	// Variable declaration
	@ViewChild('fagrid', { static: true }) fagrid: any;
	gridDelBtn: boolean;
	enableInsert: boolean = true;
	msglist: any[];
	message: any;
	type: any;
	msgs: any[] = [];
	index: any;
	description: any;
	faData: FixedAssets[] = [];
	faDataTemp: FixedAssets[] = [];
	faModel: FixedAssets = new FixedAssets();
	faModelTemp: FixedAssets = new FixedAssets();
	oidfixadCommitBean: OidfixadCommitBean = new OidfixadCommitBean();
	fixedAssetsCommitBean: FixedAssetsCommitBean = new FixedAssetsCommitBean();
	vehiclesCommitBean: VehiclesCommitBean = new VehiclesCommitBean();
	vehData: Vehicles[] = [];
	vehDataTemp: Vehicles[] = [];
	vehModel: Vehicles = new Vehicles();
	vehModelTemp: Vehicles = new Vehicles();
	errorMessage: string;
	editable: boolean = true;
	faColumnDef: any[];
	vehReadOnly: boolean = false;
	vehicleIdRead: boolean;
	vehEvent = { added: [], updated: [], removed: [] };
	constructor(private oidfixadFactory: OidfixadService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.faColumnDef = [];
	}
	ngOnInit() {
		this.gridDelBtn = false;
		this.vehicleIdRead = false;
		this.faColumnDef = [
			{ fieldName: this.translateService.translate('oidfixad.class'), field: 'assetClass', editable: true, width: 150, required: true, datatype: 'lov', domain: 'FA_CLASS' },
			{ fieldName: '', field: 'serialNo', editable: false, datatype: 'text', hide: true },
			{ fieldName: this.translateService.translate('oidfixad.type'), field: 'assetType', editable: true, width: 150, required: true, datatype: 'lov', domain: 'FA_TYPE' },
			{ fieldName: '', field: 'year', editable: false, datatype: 'date', hide: true },
			{ fieldName: this.translateService.translate('oidfixad.make'), field: 'make', editable: true, width: 150, required: true, datatype: 'lov', domain: 'FA_MAKE' },
			{ fieldName: this.translateService.translate('oidfixad.id#'), field: 'assetId', editable: false, datatype: 'number', width: 150 },

			{ fieldName: this.translateService.translate('oidfixad.model#'), field: 'model', editable: true, datatype: 'text', width: 150, maxlength: 12 },
			{ fieldName: '', field: 'color', editable: false, datatype: 'lov', domain: 'PPTY_COLOR', hide: true },
			{ fieldName: this.translateService.translate('oidfixad.status'), field: 'status', editable: true, width: 150, required: true, datatype: 'lov', domain: 'FA_STATUS' },
			{ fieldName: this.translateService.translate('oidfixad.description'), field: 'description', editable: true, datatype: 'text', width: 150, maxlength: 40 },
			{ fieldName: '', field: 'updated', hide: true },
		];
		this.faexecuteQuery();
	}
	/** 
	 * This function displays the messages
	 */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	optionChange() {
		if (JSON.stringify(this.faModelTemp) != JSON.stringify(this.faModel)) {
			const node = this.fagrid.gridOptions.api.getSelectedNodes().length && this.fagrid.gridOptions.api.getSelectedNodes()[0];
			const rowIndex = node.rowIndex;
			this.fagrid.setColumnData('updated', rowIndex, true);
		}
	}

	change() {
		if (JSON.stringify(this.faModelTemp) != JSON.stringify(this.faModel)) {
			const node = this.fagrid.gridOptions.api.getSelectedNodes().length && this.fagrid.gridOptions.api.getSelectedNodes()[0];
			const rowIndex = node.rowIndex;
			this.fagrid.setColumnData('updated', rowIndex, true);
		}
	}
	fieldChange() {
		if (JSON.stringify(this.vehModel) != JSON.stringify(this.vehModelTemp)) {
			const node = this.fagrid.gridOptions.api.getSelectedNodes().length && this.fagrid.gridOptions.api.getSelectedNodes()[0];
			const rowIndex = node.rowIndex;
			this.fagrid.setColumnData('updated', rowIndex, true);
		}
	}
	onRowClickfa(event) {
		//this.onFaGridInsert(event);
		if (event) {
			if (event.createDatetime) {
				this.vehicleIdRead = true;
			}
			this.faModel = event;
			this.gridDelBtn = true;
			this.faModelTemp = JSON.parse(JSON.stringify(this.faModel));
			this.vehPopulateDetails();
		} else {
			this.gridDelBtn = false;
			this.vehData = []
			this.faModel = new FixedAssets();
			this.faModelTemp = new FixedAssets();
			this.vehModel = new Vehicles();
		}
	}

	onFaGridDelete = () => {
		if (this.faModel) {
			if (this.faModel.assignCount > 0) {
				this.type = 'warn';
				this.message = this.translateService.translate('oidfixad.vehiclealreadyassignedtoascheduledtrip');
				this.show();
			} else {
				return true;
			}
		}
	}

	//execute query
	faexecuteQuery() {
		const serviceObj = this.oidfixadFactory.faExecuteQuery(this.faModel);
		serviceObj.subscribe(data => {
			if (data.length == 0) {
				this.faData = [];
				this.faDataTemp = [];
			} else {

				this.faData = data;
				this.faDataTemp = JSON.parse(JSON.stringify(data));
				this.faModel = this.faData[0];

			}
		});
	}

	
	/**
	* This function loads the data into the Master Record and its child records
	*/
	vehPopulateDetails() {
		const vehResult = this.oidfixadFactory.
			vehExecuteQuery(this.faModel);
		vehResult.subscribe(data => {
			if (data.length === 0) {
				this.vehicleIdRead = false;
				this.vehData = [];
				this.vehModel = new Vehicles();
				this.vehModelTemp = new Vehicles();
			} else {
				this.vehData = data;
				this.vehModel = data[0];
				this.vehModelTemp = JSON.parse(JSON.stringify(data[0]));
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/


	onFaGridInsert = (event) => {
		if (event) {
			this.vehicleIdRead = false;
		}
		return {};
	}
	validateRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		if (event.data.assetClass === 'VEHICLE') {
			this.enableInsert = false;
			rowdata.validated = true;
			return rowdata;
		} else {
			this.enableInsert = true;
		}
		rowdata.validated = true;
		return rowdata;
	}

	get isSingleSaveBtnDisable() {
		if ((this.fagrid && (this.fagrid.addedMap.size > 0 ||
			this.fagrid.updatedMap.size > 0 || this.fagrid.removedMap.size > 0))) {
			return false;
		} else {
			return true;
		}
	}

	canStatusEdit = (data: any, index: number, field: string): boolean => {
		if (!data.status) {
		   return true;
		} else {
		   return false;
		}
	 }
	OnGridClearPlan = (event) => {

		if (this.faModel.assetClass === 'VEHICLE') {
			this.enableInsert = true;
		}
		this.description = undefined;
		return true;

	}
	/**
	 *  This function will be executed when commit event is
	* fired.S
	* This is External Save Button for entire Screen.
	*/
	onSave() {

		this.oidfixadCommitBean = new OidfixadCommitBean();
		const faEvent = { added: [], updated: [], removed: [] };
		 const vehicleEvent = { added: [], updated: [], removed: [] };

		if (this.fagrid) {
			this.fagrid.addedMap.forEach((value, keys) => { faEvent.added.push(value); });
			this.fagrid.updatedMap.forEach((value, keys) => { faEvent.updated.push(value); });
			this.fagrid.removedMap.forEach((value, keys) => { faEvent.removed.push(value); });
		}


		if (faEvent.added.length > 0) {
			for (let i = 0; i < faEvent.added.length; i++) {
				if (!faEvent.added[i].assetClass) {
					this.message = this.translateService.translate('oidfixad.assetclassmustbeentered');
					this.type = 'warn';
					this.show();
					return;
				}
				if (!faEvent.added[i].assetType) {
					this.message = this.translateService.translate('oidfixad.assettypemustbeentered');
					this.type = 'warn';
					this.show();
					return;
				}
				if (!faEvent.added[i].make) {
					this.message = this.translateService.translate('oidfixad.assetmakemustbeentered');
					this.type = 'warn';
					this.show();
					return;
				}
				if (!faEvent.added[i].status) {
					this.message = this.translateService.translate('oidfixad.assetstatusmustbeentered');
					this.type = 'warn';
					this.show();
					return;
				}
				if (this.faModel.assetClass === 'VEHICLE' && !this.vehModel.vehicleId) {
					this.message = this.translateService.translate('oidfixad.vehicleidmustbeentered');
					this.type = 'warn';
					this.show();
					return;
				}
			}
			this.oidfixadCommitBean.fixedAssetsCommitBean.insertList = faEvent.added
		}

		if (faEvent.updated.length > 0) {
			for (let i = 0; i < faEvent.updated.length; i++) {
				if (!faEvent.updated[i].assetClass) {
					this.message = this.translateService.translate('oidfixad.assetclassmustbeentered');
					this.type = 'warn';
					this.show();
					return;
				}
				if (!faEvent.updated[i].assetType) {
					this.message = this.translateService.translate('oidfixad.assettypemustbeentered');
					this.type = 'warn';
					this.show();
					return;
				}
				if (!faEvent.updated[i].make) {
					this.message = this.translateService.translate('oidfixad.assetmakemustbeentered');
					this.type = 'warn';
					this.show();
					return;
				}
				if (!faEvent.updated[i].status) {
					this.message = this.translateService.translate('oidfixad.assetstatusmustbeentered');
					this.type = 'warn';
					this.show();
					return;
				}

			}
			this.oidfixadCommitBean.fixedAssetsCommitBean.updateList = faEvent.updated
		}

		if (faEvent.removed.length > 0) {
			this.onFaGridDelete();
			this.oidfixadCommitBean.fixedAssetsCommitBean.deleteList = faEvent.removed;
		}

		if (this.vehData.length > 0) {
			if (JSON.stringify(this.vehModel) != JSON.stringify(this.vehModelTemp)) {
				vehicleEvent.updated.push(this.vehModel);
			}
		} else {
			if (JSON.stringify(this.vehModel) != JSON.stringify(this.vehModelTemp)) {
				vehicleEvent.added.push(this.vehModel);
			}
		}

		if (this.faModel !== null) {
			if (vehicleEvent.added.length > 0 && this.faModel.assetClass != null) {
				for (let i = 0; i < vehicleEvent.added.length; i++) {
					if(!vehicleEvent.added[i].vehicleId){
						this.message = this.translateService.translate('oidfixad.vehicleidmustbeentered');
						this.type = 'warn';
						this.show();
						return;
					}
					if (!vehicleEvent.added[i].optimalCapacity) {
						this.message = this.translateService.translate('oidfixad.optimalcapacitymustbeentered');
						this.type = 'warn';
						this.show();
						return;
					}
					if (!vehicleEvent.added[i].capacity) {
						this.message = this.translateService.translate('oidfixad.physicalcapacitymustbeentered');
						this.type = 'warn';
						this.show();
						return;
					} else if (this.vehModel.optimalCapacity > this.vehModel.capacity) {
						this.message = this.translateService.translate('oidfixad.optcapacitycannotbegreaterthenphycapacity');
						this.type = 'warn';
						this.show();
						return;
					}
				}
				this.oidfixadCommitBean.vehiclesCommitBean.insertList = vehicleEvent.added;
			}
		}
		if (vehicleEvent.updated.length > 0 && faEvent != null) {
			for (let i = 0; i < vehicleEvent.updated.length; i++) {
				if (!vehicleEvent.updated[i].optimalCapacity) {
					this.message = this.translateService.translate('oidfixad.optimalcapacitymustbeentered');
					this.type = 'warn';
					this.show();
					return;
				}
				if (!vehicleEvent.updated[i].capacity) {
					this.message = this.translateService.translate('oidfixad.physicalcapacitymustbeentered');
					this.type = 'warn';
					this.show();
					return;
				} else if (this.vehModel.optimalCapacity > this.vehModel.capacity) {
					this.message = this.translateService.translate('oidfixad.optcapacitycannotbegreaterthenphycapacity');
					this.type = 'warn';
					this.show();
					return;
				}
			}
			this.oidfixadCommitBean.vehiclesCommitBean.updateList = vehicleEvent.updated;
		}
		if (vehicleEvent.removed.length > 0) {
			this.oidfixadCommitBean.vehiclesCommitBean.deleteList = vehicleEvent.removed;
		}

		const faVehCommonSave = this.oidfixadFactory.oidfixadCommonSave(this.oidfixadCommitBean);
		faVehCommonSave.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.faexecuteQuery();

			} else if (data === 2) {
				this.message = this.translateService.translate('oidfixad.thisvehicleidalreadyexistspleaseenteruniqueid');
				this.type = 'warn';
				this.show();
				return;
			}
			else if (data === 3) {
				this.message = this.translateService.translate('oidfixad.thisdispositionpersoniddoesnotexist');
				this.type = 'warn';
				this.show();
				return;
			} else if (data === 4) {
				this.message = this.translateService.translate('oidfixad.thisacquisitionpersoniddoesnotexist');
				this.type = 'warn';
				this.show();
				return;
			} else if (data === 5) {
				this.message = this.translateService.translate('oidfixad.thisdispositioncorporateiddoesnotexist');
				this.type = 'warn';
				this.show();
				return;
			} else if (data === 6) {
				this.message = this.translateService.translate('oidfixad.thisacquisitioncorporationiddoesnotexist');
				this.type = 'warn';
				this.show();
				return;
			} else if (data === 7) {
				this.message = this.translateService.translate('oidfixad.cannotdeletefixedassetswhiledependentvehiclemileagesexists');
				this.type = 'warn';
				this.show();
				return;
			} else if (data === 8) {
				this.message = this.translateService.translate('oidfixad.cannotdeletefixedassetswhiledependentvehiclesexists');
				this.type = 'warn';
				this.show();
				return;
			} else if (data === 9) {
				this.message = this.translateService.translate('oidfixad.cannotdeletefixedassetswhiledependentfixedassetstaffsexists');
				this.type = 'warn';
				this.show();
				return;
			} else if (data === 10) {
				this.message = this.translateService.translate('oidfixad.cannotdeletefixedassetswhiledependentfixedasseteventsexists');
				this.type = 'warn';
				this.show();
				return;
			} else if (data === 11) {
				this.message = this.translateService.translate('oidfixad.cannotdeletefixedasswhiledependentassetlocationassignmentsexists');
				this.type = 'warn';
				this.show();
				return;
			} else if (data === 12) {
				this.message = this.translateService.translate('oidfixad.cannotdeletevehicleswhiledependentvehiclemileagesexists');
				this.type = 'warn';
				this.show();
				return;
			} else if (data === 13) {
				this.message = this.translateService.translate('oidfixad.cannotdeletevehicleswhiledependenttripsexists');
				this.type = 'warn';
				this.show();
				return;
			}
			else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
				this.faexecuteQuery();
			}
		});
		this.enableInsert = true;

	}

}
