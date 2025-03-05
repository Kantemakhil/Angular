import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidinpliService } from '../service/oidinpli.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHousingMoves } from '@inst/movements/proposedmovements/beans/VHousingMoves';
import { OffenderProposedIntlocs } from '@inst/movements/proposedmovements/beans/OffenderProposedIntlocs';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OffenderLocChngDtls } from '@inst/movements/proposedmovements/beans/OffenderLocChngDtls';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { VHousingMovesCommitBean } from '@inst/movements/proposedmovements/beans/VHousingMovesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';


@Component({
	selector: 'app-oidinpli',
	templateUrl: './oidinpli.component.html',
})

export class OidinpliComponent implements OnInit {
	// Variable declaration
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	@ViewChild('grid1', { static: true }) grid1: any;
	msglist: any[];
	message: any;
	type: any;
	lovModel: any[];
	msgs: any[] = [];
	index: any;
	listToCompare: any[] = [];
	houseMoveData: VHousingMoves[] = [];
	houseMoveDataTemp: VHousingMoves[] = [];
	inmaDetModelFilter: VHousingMoves = new VHousingMoves();
	inmaDetModelFilterTemp: VHousingMoves = new VHousingMoves();
	offLocChngDtlsModel: OffenderLocChngDtls = new OffenderLocChngDtls();
	offLocChngDtlsModelTemp: OffenderLocChngDtls = new OffenderLocChngDtls();
	offLocChngDtlsBean: OffenderLocChngDtls = new OffenderLocChngDtls()
	statDetModel: OffenderLocChngDtls = new OffenderLocChngDtls();
	statDetData: OffenderLocChngDtls[] = [];
	appStatDetModel: OffenderLocChngDtls = new OffenderLocChngDtls();
	appStatDetModelTemp: OffenderLocChngDtls = new OffenderLocChngDtls();
	cancStatDetModel: OffenderLocChngDtls = new OffenderLocChngDtls();
	cancStatDetModelTemp: OffenderLocChngDtls = new OffenderLocChngDtls();
	// TODO angular.copy(this.houseMoveData, thishouseMoveDataTemp);
	vHousingMovModel: VHousingMoves = new VHousingMoves();
	vHousingMovModelTemp: VHousingMoves = new VHousingMoves();
	vHousingMovBean: VHousingMovesCommitBean = new VHousingMovesCommitBean();
	// TODO angular.copy(this.inmadetData, thisinmadetDataTemp);
	inmaDetModel: VHousingMoves = new VHousingMoves();
	inmaDetModelTemp: VHousingMoves = new VHousingMoves();
	inmadetData: OffenderProposedIntlocs[] = [];
	inmadetDataTemp: OffenderProposedIntlocs[] = [];
	inmadetModel: OffenderProposedIntlocs = new OffenderProposedIntlocs();
	// TODO angular.copy(this.statdetData, thisstatdetDataTemp);
	statdetData: OffenderProposedIntlocs[] = [];
	statdetDataTemp: OffenderProposedIntlocs[] = [];
	statdetModel: OffenderProposedIntlocs = new OffenderProposedIntlocs();
	statdetIndex: number = 0;
	display: boolean;
	disabled: boolean;
	editable: boolean = true;
	extrMoveColumnDef: any[];
	statRevReadOnly: boolean = false;
	extrMoveReadOnly: boolean = false;
	ctrlReadOnly: boolean = false;

	readonly: boolean;
	rgagyidRg: any[] = [];
	rglocRg: any[] = [];
	rgmovereasonRg: any[] = [];
	rgmovetypeRg: any[] = [];
	getReasonLink: string;
	creqMove: string;
	schedYn: number;
	propmoveModel: any;
	startitm: string;
	recstat: string;
	vNewToLiv: number;
	vLivToDs: string;
	vPosfound: number;
	statDet: string;
	scheYnAll: boolean;
	agyId: string;
	movementType: string;
	movementReason: string;
	repeationFlag: number;
	vAvailable: number;
	frmAgyLocUrl: string;
	toAgyLocUrl: string;
	readOnlyMode: boolean;
	transactDisabledbtn: boolean;
	selFlag: number;
	retrieveDisablBtn: boolean = false;
	agyIdtemp: any;
	commentTextReadOnly: boolean;
	mvntTypeLink: string;
	constructor(private oidinpliFactory: OidinpliService, public translateService: TranslateService, public dialogService: DialogService, public sessionManager: UserSessionManager) {
		this.extrMoveColumnDef = [];
	}
	onGridReady(event) {
	}
	ngOnInit() {
		this.transactDisabledbtn = true;
		this.commentTextReadOnly = true;
		this.mvntTypeLink = "oidinpli/rgMoveTypeRecordGroup";
		this.extrMoveColumnDef = [
			{ fieldName: this.translateService.translate('oidinpli.sel'), datatype: 'checkbox', field: 'schedYn', editable: true, width: 150, cellEditable: this.cancelCellEdit },
			{ fieldName: this.translateService.translate('oidinpli.sid'), datatype: 'number', field: 'offenderIdDisplay', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oidinpli.name'), datatype: 'text', field: 'offName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oidinpli.currentlocation'), datatype: 'text', field: 'currAgyDesc', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oidinpli.from'), datatype: 'text', field: 'fromAgyDesc', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oidinpli.to'), datatype: 'text', field: 'toAgyDesc', editable: false, width: 150 },
			{
				fieldName: this.translateService.translate('oidinpli.define'), field: 'defineButton', datatype: 'launchbutton',
				editable: true, width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.onDefineBtnClick
			},
			{ fieldName: this.translateService.translate('oidinpli.type'), field: 'movementType', datatype: 'text', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oidinpli.reason'), field: 'movementReason', datatype: 'text', editable: false, width: 150 },
			{ fieldName: '', field: 'updated', hide: true },
			{ fieldName: '', field: 'agyId', hide: true },
		];
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
		if (JSON.stringify(this.vHousingMovModel) != JSON.stringify(this.vHousingMovModel)) {
			const node = this.grid1.gridOptions.api.getSelectedNodes().length && this.grid1.gridOptions.api.getSelectedNodes()[0];
			const rowIndex = node.rowIndex;
			this.grid1.setColumnData('updated', rowIndex, true);
		}
	}

	change() {
		if (JSON.stringify(this.vHousingMovModel) != JSON.stringify(this.vHousingMovModel)) {
			const node = this.grid1.gridOptions.api.getSelectedNodes().length && this.grid1.gridOptions.api.getSelectedNodes()[0];
			const rowIndex = node.rowIndex;
			this.grid1.setColumnData('updated', rowIndex, true);
		}
	}
	fieldChange() {
		if (JSON.stringify(this.cancStatDetModel) != JSON.stringify(this.cancStatDetModelTemp)) {
			const node = this.grid1.gridOptions.api.getSelectedNodes().length && this.grid1.gridOptions.api.getSelectedNodes()[0];
			const rowIndex = node.rowIndex;
			this.grid1.setColumnData('updated', rowIndex, true);
		}
	}
	onButRetvclick() {
		if (!this.inmaDetModelFilter.currAgyId) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidinpli.locationmustbeentered');
			this.show();
			return;
		}
		this.agyId = this.inmaDetModelFilter.currAgyId;
		this.vHousMoveExecuteQuery();
		this.retrieveDisablBtn = true;
	}
	locFacilityChange() {
		this.frmAgyLocUrl = 'oidinpli/rgLocFromRecordGroup?agyLocId=' + this.inmaDetModelFilter.currAgyId;
	}
	fromAgyLocChng() {
		this.toAgyLocUrl = 'oidinpli/rgLocToRecordGroup?fromAgyLocId=' + this.inmaDetModelFilter.currAgyId;
	}
	onButPrintclick() {
	}
	cancelCellEdit(event) {
		if (event) {
			this.grid1.setColumnData('schedYn', event.checked);
			this.transactDisabledbtn = false;
		} else {
			return false;
		}
	}
	/**
		 *  This function will be executed when commit event is
		* fired
		*/
	onButTransactclick() {
		const transactEvent = { updated: [] };

		if (this.grid1) {
			this.grid1.updatedMap.forEach((value, keys) => { transactEvent.updated.push(value); });
		}

		if (transactEvent.updated.length > 0) {
			for (let i = 0; i < transactEvent.updated.length; i++) {
				if ((transactEvent.updated[i].vCapacity - transactEvent.updated[i].vOccupied) < 1) {
					this.type = 'warn';
					this.message = this.translateService.translate('oidinpli.location') + ' ' + transactEvent.updated[i].toAgyDesc + ' ' + this.translateService.translate('oidinpli.locationfull');
					this.show();
					return;
				}
				transactEvent.updated[i].schedYn = transactEvent.updated[i].schedYn === true ? 'Y' : 'N';
			}
			this.vHousingMovBean.updateList = transactEvent.updated;
		}

		const extrmoveSaveData = this.oidinpliFactory.transactCommitQuery(this.vHousingMovBean);
		extrmoveSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('oidinpli.transactcomplete.');
				this.show();
				this.agyIdtemp = this.inmaDetModelFilter.currAgyId;
				this.vHousMoveExecuteQuery();
				this.transactDisabledbtn = true;
			}
		});
	}

	onRowClickEvent(event) {
		if (event) {
			this.vHousingMovModel = event;
			if (this.vHousingMovModel.offenderBookId && this.vHousingMovModel.detailSeq) {
				this.inmadetPopulateDetails(this.vHousingMovModel);
				this.statdetExecuteQuery(event);
			}
		} else {
			this.inmaDetModel = new VHousingMoves();
			this.vHousingMovBean = new VHousingMovesCommitBean();
		}
	}
	validateRowData = (event) => {
		this.selFlag = 0;
		const rowdata = new ValidateRowReturn();
		if (event.data) {
			this.houseMoveData.forEach(ele => {
				if (ele.schedYn) {
					this.selFlag++;
					return;
				} else {
					this.transactDisabledbtn = true;
					this.scheYnAll = false;
				}
			});
			if (this.selFlag > 0) {
				this.transactDisabledbtn = false;
			}
			if (this.houseMoveData.length === this.selFlag) {
				this.scheYnAll = true;
			}
			rowdata.validated = true;
			return rowdata;
		}
		rowdata.validated = true;
		return rowdata;
	}

	clear() {
		this.vHousingMovModel = new VHousingMoves();
		this.propmoveModel = new VHousingMoves();
		this.houseMoveData = [];
		this.houseMoveDataTemp = [];
		this.statDetData = [];
		this.offLocChngDtlsModel = new OffenderLocChngDtls();
		this.statDetModel = new OffenderLocChngDtls();
		this.appStatDetModel = new OffenderLocChngDtls();
		this.cancStatDetModel = new OffenderLocChngDtls();
		this.movementType = null;
		this.movementReason = null;
		this.agyId = null;
		this.readOnlyMode = false;
		this.scheYnAll = null;
		this.transactDisabledbtn = true;
		this.inmaDetModel = new VHousingMoves();
		this.retrieveDisablBtn = false;
		this.inmaDetModelFilter = new VHousingMoves();
		this.commentTextReadOnly = true;
	}

	get disabledRetBtn() {
		if (this.houseMoveData.length > 0) {
			return true;
		}
		return false;
	}
	get disableLanchBtn() {
		if (this.houseMoveData.length > 0 && this.inmaDetModel && this.inmaDetModel.offenderBookId) {
			return false;
		}
		return true;
	}
	get inmSaveDisable() {
		if (this.houseMoveData.length > 0 && this.inmaDetModelTemp.commentText !== this.inmaDetModel.commentText) {
			return false;
		}
		return true;
	}
	get statDetSaveBtn() {
		if (this.houseMoveData.length > 0 && this.cancStatDetModel !== null && (this.cancStatDetModel.checkFlag && this.cancStatDetModel.txnStatus !== 'CREQ')) {
			return false;
		}
		return true;
	}
	get disableSchedYnBtn() {
		if (this.houseMoveData.length > 0) {
			return false;
		}
		return true;
	}
	get disableChngEvnt() {
		if (this.cancStatDetModel.txnStatus || this.houseMoveData.length === 0) {
			return true;
		}
		return false;
	}
	get changeReqFlagDsbl() {
		if (this.houseMoveData.length > 0 && this.appStatDetModel.recordedBy) {
			return false;
		}
		return true;
	}
	get cancCheckDisble() {
		if (this.cancStatDetModel.txnStatus || !this.cancStatDetModel.checkFlag) {
			return true;
		}
		return false;
	}
	get alertDsblBtn() {
		if (this.houseMoveData.length > 0 && this.inmaDetModel) {
			return false;
		}
		return true;
	}
	changeEvent(event) {
		if (event) {
			if (event === 'CHANGED') {
				if (this.cancStatDetModel.checkFlag) {
					this.cancStatDetModel.recordedDate = DateFormat.getDate();
					this.cancStatDetModel.recordedBy = this.sessionManager.getId();
					this.statDet = 'CHANGED';
				} else {
					this.cancStatDetModel.recordedDate = null;
					this.cancStatDetModel.recordedBy = null;
					this.cancStatDetModel.txnRsn = null;
					this.statDet = 'NEW';
				}
			}
		}
	}
	schedYnFlagEvent(event) {
		this.repeationFlag = 0;
		const rowData = this.houseMoveData;
		if (event) {
			for (let i = 0; i < rowData.length; i++) {
				this.grid1.setColumnData('schedYn', i, event.checked);
				if (event.checked) {
					this.repeationFlag++;
				}
			}
		}
		this.houseMoveData = rowData;
		if (event.checked) {
			this.scheYnAll = true;
			this.transactDisabledbtn = false;
		} else {
			this.transactDisabledbtn = true;
		}
	}
	SaveStatDet() {
		const serviceObj = this.oidinpliFactory.
			statdetCommit(this.offLocChngDtlsModel);
		serviceObj.subscribe(data => {
		});
	}
	sanctionDisplayFlagEvent() {
		if (this.creqMove === 'Y') {

		}
	}
	typeChange() {
		this.getReasonLink = 'oidinpli/rgMoveReasonRecordGroup?movementType=' + this.inmaDetModelFilter.movementType;
	}
	onAlertclick = () => {
		this.dialogService.openLinkDialog('/ocualert', this.vHousingMovModel, 80).subscribe(result => {

		});
	}
	statRevReadonly() {

	}
	onDefineBtnClick = (data) => {
		data['livingUnitId'] = null;
		data['offenderBookId'] = this.vHousingMovModel.offenderBookId;
		data['agyLocId'] = this.vHousingMovModel.currAgyId;
		this.repeationFlag = 0;
		const rowData = this.houseMoveData;
		const node = this.grid1.gridOptions.api.getSelectedNodes().length && this.grid1.gridOptions.api.getSelectedNodes()[0];
		const rowIndex = node.rowIndex;
		this.vPosfound = 0;
		this.dialogService.openLinkDialog('/omuavbed', data, 80).subscribe(result => {
			if (result) {
				this.grid1.setColumnData('schedYn', rowIndex, true);
				this.grid1.setColumnData('toAgyDesc', rowIndex, result.dspDescription);
				this.grid1.setColumnData('toLivingUnitId', rowIndex, result.livingUnitId);
			}
			else {
				this.type = 'warn';
				this.message = this.translateService.translate('oidinpli.location') +  this.vLivToDs + this.translateService.translate('oidinpli.isnotchildforprophouschng');
				this.show();
				return;
			}
		});
	}
	/**
	* This function loads the data into the Master Record and its child records
	*/
	inmadetPopulateDetails(event) {

		this.inmaDetModel = new VHousingMoves();
		this.inmaDetModel = event;
		this.inmaDetModelTemp = JSON.parse(JSON.stringify(event));
	}



	//execute query
	vHousMoveExecuteQuery() {
		if (this.agyId == null) {
			this.inmaDetModelFilter.currAgyId = this.agyIdtemp;
		} else {
			this.inmaDetModelFilter.currAgyId = this.agyId;
		}
		this.inmaDetModelFilter.createUserId = this.sessionManager.getId();
		const serviceObj = this.oidinpliFactory.
			extrmoveExecuteQuery(this.inmaDetModelFilter);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.houseMoveData = [];
				this.vHousingMovModel = new VHousingMoves();
				this.inmaDetModel = new VHousingMoves();
				this.type = 'warn';
				this.message = this.translateService.translate('common.querycaused');
				this.show();
				this.retrieveDisablBtn = false;
			} else {
				data.forEach(ele => {
					ele.sancCode = ele.sancCode === 'Y' ? true : false;
					ele.nonAssoFlag = ele.nonAssoFlag === 'Y' ? true : false;
					ele.potSchFlag = ele.potSchFlag === 'Y' ? true : false;
					ele.modifyDatetime = DateFormat.getDate();
					ele.modifyUserId = this.sessionManager.getId();
					ele.defineButton = 'Define';
					ele.schedYn = false;
				});
				this.houseMoveData = data;
				this.readOnlyMode = true;
				this.commentTextReadOnly = false;
			}
		});
		this.agyIdtemp = this.agyId;
	}

	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	saveInmadetForm() {
		// TODO declare commit bean and add insert list to that object.
		const inmadetSaveData = this.oidinpliFactory.inmadetCommit(this.vHousingMovModel);
		inmadetSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.inmadetPopulateDetails(this.vHousingMovModel);
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		});
	}
	/**
		 *  This function will be executed when commit event is
		* fired
		*/
	statdetExecuteQuery(event) {
		this.statDetModel.offenderBookId = this.vHousingMovModel.offenderBookId;
		this.statDetModel.locationSeq = this.vHousingMovModel.locationSeq;
		this.statDetModel = new OffenderLocChngDtls();
		this.appStatDetModel = new OffenderLocChngDtls();
		this.cancStatDetModel = new OffenderLocChngDtls();
		const statdetResult = this.oidinpliFactory.
			statdetExecuteQuery(event);
		statdetResult.subscribe(data => {
			if (data.length === 0) {
				this.statDetData = [];
				this.statDetModel = new OffenderLocChngDtls();
				this.appStatDetModel = new OffenderLocChngDtls();
				this.cancStatDetModel = new OffenderLocChngDtls();
			} else {
				for (let i = 0; i < data.length; i++) {
					data[i].offenderBookId = this.vHousingMovModel.offenderBookId;
					data[i].movementSeq = this.vHousingMovModel.movementSeq;
					data[i].createDatetime = DateFormat.getDate();
					data[i].createUserId = this.sessionManager.getId();
					data[i].modifyDatetime = undefined;
					data[i].modifyUserId = undefined;
					if (data[i].appRsn === '.') {
						data[i].appRsn = null;
					}
					if (data[i].txnRsn === '.') {
						data[i].txnRsn = null;
					}
					if (data[i].choice === 'CREQ' ) {
						this.cancStatDetModel = data[i];
						this.cancStatDetModel.checkFlag = 'Y';
						this.cancStatDetModelTemp = JSON.parse(JSON.stringify(data[i]));
					} else if (data[i].choice === 'APP') {
						this.appStatDetModel = data[i];
						this.appStatDetModelTemp = JSON.parse(JSON.stringify(data[i]));
					} else if (data[i].choice === 'NEW') {
						this.statDetModel = data[i];
					}
				}
				this.statDetData = data;
			}
		});
	}

	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	SavestatdetForm() {
		this.vHousingMovModel.offenderBookId = this.vHousingMovModel.offenderBookId;
		this.vHousingMovModel.locationSeq = this.vHousingMovModel.locationSeq;
		this.vHousingMovModel.statusCode = 'APP';
		this.vHousingMovModel.txnStatus = 'CREQ';
		this.vHousingMovModel.recordedBy = this.sessionManager.getId();
		this.vHousingMovModel.recordedDate = DateFormat.getDate();
		this.vHousingMovModel.txnRsn = this.cancStatDetModel.txnRsn === undefined ? '.' : this.cancStatDetModel.txnRsn;

		if (this.statDet === 'CHANGED') {
			const message = {
				label: this.translateService.translate('oidinpli.doyouwantsavechange'), yesBtn: true, noBtn: true
			};
			this.dialogService.openLinkDialog('/ocucoffeconfirmbox', message, 55).subscribe(result => {
				if (result) {
					this.statDetCommitEvent(this.vHousingMovModel);
				} else {
					return;
				}
			});
		}

	}
	// TODO declare commit bean and add insert list to that object.	
	statDetCommitEvent(event) {
		const statdetSaveData = this.oidinpliFactory.statdetCommit(event);
		statdetSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.statdetExecuteQuery(event);
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		});
	}
}
