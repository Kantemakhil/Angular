import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumeemovService } from '../service/oumeemov.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderExternalMovements } from '@commonbeans/OffenderExternalMovements';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
//import { OffenderExternalMovementsCommitBean } from '@inst/demographics-biometrics/beans/OffenderExternalMovementsCommitBean';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OffenderExternalMovementsCommitBean } from '@common/beans/OffenderExternalMovementsCommitBean';
// import required bean declarations

@Component({
	selector: 'app-oumeemov',
	templateUrl: './oumeemov.component.html'

})

export class OumeemovComponent implements OnInit {

	@ViewChild('offemGrid',{ static: true}) offemGrid: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	offemData: OffenderExternalMovements[] = [];
	offemDataTemp: OffenderExternalMovements[] = [];
	offemModel: OffenderExternalMovements = new OffenderExternalMovements();
	offemIndex: number = 0;
	offemInsertList: OffenderExternalMovements[] = [];
	offemUpdatetList: OffenderExternalMovements[] = [];
	offemDeleteList: OffenderExternalMovements[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	offEmColumnDef: any[];
	offEmReadOnly: boolean = false;
	cgfkOffemfromcityRg: any[] = [];
	cgfkOffemfromagylocidRg: any[] = [];
	cgfkOffemtoagylocidRg: any[] = [];
	cgfkOffemmovementtypeRg: any[] = [];
	cgfkOffemdirectioncodeRg: any[] = [];
	cgfkOffemmovementreasoncoRg: any[] = [];
	cgfkOffemtocityRg: any[] = [];
	offemCommitModel: OffenderExternalMovementsCommitBean = new OffenderExternalMovementsCommitBean();
	vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
	offemGridIndex: number;
	offemGridInsert: boolean;
	offemGridDelete: boolean;

	constructor(private oumeemovFactory: OumeemovService, public translateService: TranslateService,
		public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.offEmColumnDef = [];
	}
	ngOnInit() {
		this.offemGridInsert = false;
		this.offemGridDelete = false;
		this.offEmColumnDef = [
			{
				fieldName: this.translateService.translate('common.date'), field: 'movementDate', editable: true, width: 150,
				required: true, datatype: 'date', 
			},
			{
				fieldName: this.translateService.translate('common.time'), field: 'movementTime', editable: true, width: 150,
				required: true, datatype: 'time',
			},
			{
				fieldName: this.translateService.translate('common.type'), field: 'movementType', editable: true, width: 150,
				datatype: 'lov', domain: 'MOVE_TYPE', titles: {
					code: this.translateService.translate('Type'),
					description: this.translateService.translate('common.description')
				},required: true
			},
			{
				fieldName: this.translateService.translate('common.reason'), field: 'movementReasonCode', editable: true,
				width: 150, datatype: 'lov', link: 'oumeemov/cgfkOffEmMovementReasonCoRecordGroup?movementType=', parentField: 'movementType',
				 titles: {
					code: this.translateService.translate('Reason'),
					description: this.translateService.translate('common.description')
				},required: true
			},
			{
				fieldName: this.translateService.translate('common.description'), field: 'directionCode', editable: true, width: 150,
				datatype: 'lov', domain: 'MOVE_DIRECT', titles: {
					code: this.translateService.translate('Dir'),
					description: this.translateService.translate('common.description')
				}
			},
			{
				fieldName: this.translateService.translate('oumeemov.fromlocation'), field: 'fromAgyLocId', editable: true, width: 150, required: true,
				datatype: 'lov', link: 'oumeemov/cgfkOffEmFromAgyLocIdRecordGroup',  cellEditable: this.fromAgyLocIdEdit,
				titles: { code: this.translateService.translate('From'), description: this.translateService.translate('common.description') }
			},
			{
				fieldName: this.translateService.translate('oumeemov.fromTA'), field: 'fromCity', editable: true, width: 150,
				datatype: 'lov', domain: 'CITY', cellEditable: this.fromAgyLocIdEdit,
				titles: { code: this.translateService.translate('From TA'), description: this.translateService.translate('common.description') }
			},
			{
				fieldName: this.translateService.translate('common.tolocation'), field: 'toAgyLocId', editable: true, width: 150,
				datatype: 'lov', link: 'oumeemov/cgfkOffEmToAgyLocIdRecordGroup', required: true, cellEditable: this.fromAgyLocIdEdit,
				titles: { code: this.translateService.translate('To'), description: this.translateService.translate('common.description') }
			},
			{
				fieldName: this.translateService.translate('oumeemov.toTA'), field: 'toCity', editable: true, width: 150, datatype: 'lov',
				domain: 'CITY', cellEditable: this.fromAgyLocIdEdit,
				titles: { code: this.translateService.translate('To TA'), description: this.translateService.translate('common.description') }
			},
			{
				fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
				datatype: 'checkbox'
			},
			{
				fieldName: this.translateService.translate('common.sequence'), field: 'movementSeq', editable: true, width: 150,
				datatype: 'number', required: true,maxValue:'9999999'
			},
			{
				fieldName: this.translateService.translate('common.comment'),datatype:'text', field: 'commentText', editable: true, width: 150,
				maxlength: '240',
			},
		];
	}

	FromTAEdit = (data: any, index: number, field: string): boolean => {
		if (!data.createDatetime) {
			return true;
		} else {
			return false;
		}
	}

	fromAgyLocIdEdit = (data: any, index: number, field: string): boolean => {
		if(data.createDatetime){
		if (data.movementType === 'TAP') {
			if (data.directionCode === 'OUT') {
				if(field === 'fromAgyLocId' || field === 'toCity'){
					return true;
				}else if(field === 'fromCity' || field === 'toAgyLocId'){
					return false;
				}
			}
			else {
				if(field === 'fromAgyLocId' || field === 'toCity'){
					return false;
				}else if(field === 'fromCity' || field === 'toAgyLocId'){
					return true;
				}
			}
		} else {
			if(field === 'fromAgyLocId' || field === 'toAgyLocId'){
				return true;
			}else if(field === 'fromCity' || field === 'toCity'){
				return false;
			}
		}
	}
	return true;
	}

	onOffemGridInsert = () => {

		return {};
	}
	validateOffemRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		if (event.field === 'movementType' && event.oldValue !== event.newValue ) { 
			this.offemGrid.setColumnData('movementReasonCode', event.rowIndex, undefined);
			rowdata.validated = true;
			return rowdata;
		}
		if (event.field === 'movementDate') {
			if (DateFormat.compareDateTime(DateFormat.getDate(event.data.movementDate),
				DateFormat.getDate(DateFormat.getDate())) === 1) {
				this.show(this.translateService.translate('oumeemov.Datemustbelessthanorequaltocurrentdate'));
				rowdata.validated = true;
				return rowdata;
			}
		}
		rowdata.validated = true;
		return rowdata;
	}

	onOffemGridDelete = () => {
		if (this.offemModel.activeFlag) {
			this.show(this.translateService.translate('oumeemov.youcannotdeletethisrecord'));
			return;
		}
		return true;
	}

	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}
	onRowClickoffem(event) {
		if (event) {
			this.offemModel = new OffenderExternalMovements();
			this.offemModel = event;
			if(event.createDatetime){
				this.offemGridDelete =true;
			}else{
				this.offemGridDelete = false;
			}
		} else {
			this.offemModel = new OffenderExternalMovements();
		}
	}
	onOffemGridClear = () => {
		this.offemExecuteQuery();
		return true;
	}
	onOffenderChange(offender) {
		if (offender) {
			this.vHeaderBlockModel = offender;
			this.offemExecuteQuery();
		} else {
			this.offemData = [];
			this.offemModel = new OffenderExternalMovements();
			this.offemGridInsert = false;
		}

	}
	offemExecuteQuery() {
		this.offemModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
		const offemResult = this.oumeemovFactory.offEmExecuteQuery(this.offemModel);
		offemResult.subscribe(offemResultList => {
			if (offemResultList.length === 0) {
				this.offemData = [];
				this.offemGridInsert = true;
				this.offemGridDelete = false;
			} else {
				offemResultList.forEach(ele => {
					ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
				});
				this.offemData = offemResultList;
				this.offemModel = offemResultList[0]
				this.offemGridInsert = true;
				this.offemGridDelete = true;
				this.offemGridIndex = 0;
			}
		});
	}

	OffemGridValid() {
		const is = { valid: true }
		this.offemData.forEach(data => {

			if (!data.movementDate) {
				this.show(this.translateService.translate('common.datemustbeentereddate'));
				is.valid = false;
				return is.valid;
			}

			if (!data.movementTime) {
				this.show(this.translateService.translate('common.timemustbeentered'));
				is.valid = false;
				return is.valid;
			}

			if (!data.movementType) {
				this.show(this.translateService.translate('common.typemustbeentereddot'));
				is.valid = false;
				return is.valid;
			}

			if (!data.movementReasonCode) {
				this.show(this.translateService.translate('common.reasonmustbeentered'));
				is.valid = false;
				return is.valid;
			}

			if (!data.fromAgyLocId) {
				this.show(this.translateService.translate('oumeemov.fromlocationmustbeentere'));
				is.valid = false;
				return is.valid;
			}

			if (!data.toAgyLocId) {
				this.show(this.translateService.translate('oumeemov.tolocationmustbeentere'));
				is.valid = false;
				return is.valid;
			}

			if (!data.movementSeq) {
				this.show(this.translateService.translate('oumeemov.seqmustbeentere'));
				is.valid = false;
				return is.valid;
			}

			if (data.movementDate && DateFormat.compareDateTime(DateFormat.getDate(data.movementDate),
				DateFormat.getDate(DateFormat.getDate())) === 1) {
				this.show(this.translateService.translate('oumeemov.datevalidation'));
				is.valid = false;
				return is.valid;
			}


			for (let i = 0; i < this.offemData.length - 1; i++) {
				for (let j = i + 1; j < this.offemData.length; j++) {
					if (this.offemData[i].movementSeq === this.offemData[j].movementSeq) {
						this.show(this.translateService.translate('oumeemov.seqalreadyexists'));
						is.valid = false;
						return is.valid;
					}
				}
			}
		});
		return is.valid;
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	oumeemovSaveoffemForm(event) {
		// TODO declare commit bean and add insert list to that object.
		this.offemInsertList = event.added;
		this.offemUpdatetList = event.updated;
		this.offemDeleteList = event.removed;
		this.offemCommitModel.insertList = [];
		this.offemCommitModel.updateList = [];
		this.offemCommitModel.deleteList = [];
		if (!this.OffemGridValid()) {
			return;
		}
		if (this.offemInsertList.length > 0) {
			for (let i = 0; i < this.offemInsertList.length; i++) {
				this.offemInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
				this.offemInsertList[i].activeFlag = this.offemInsertList[i].activeFlag ? 'Y' : 'N';
				this.offemInsertList[i].createDatetime = DateFormat.getDate();
				this.offemInsertList[i].createUserId = this.sessionManager.getId();
			}
			this.offemCommitModel.insertList = this.offemInsertList;
		}

		if (this.offemUpdatetList.length > 0) {
			for (let i = 0; i < this.offemUpdatetList.length; i++) {
				this.offemUpdatetList[i].activeFlag = this.offemUpdatetList[i].activeFlag ? 'Y' : 'N';
				this.offemUpdatetList[i].modifyDatetime = DateFormat.getDate();
				this.offemUpdatetList[i].modifyUserId = this.sessionManager.getId();
			}
			this.offemCommitModel.updateList = this.offemUpdatetList;
		}
		if (this.offemDeleteList.length > 0) {
			this.offemCommitModel.deleteList = this.offemDeleteList;
		}
		const offemSaveData = this.oumeemovFactory.offEmCommit(this.offemCommitModel);
		offemSaveData.subscribe(data => {
			if (data === 1) {
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.offemExecuteQuery();
			} else {
				this.show('common.addupdateremoverecordfailed');
				this.offemExecuteQuery();
			}
		});
	}
}
