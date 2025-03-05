import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderOicAppeals } from '../maintenance/beans/OffenderOicAppeals';
import { OidoicapService } from '../service/oidoicap.service';
import { OffenderOicAppealIncidents } from '../maintenance/beans/OffenderOicAppealIncidents';
import { OffenderOicAppealPenalties } from '../maintenance/beans/OffenderOicAppealPenalties';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { OffenderOicAppealsCommitBean } from '../maintenance/beans/OffenderOicAppealsCommitBean';
import { OffenderOicAppealIncidentsCommitBean } from '../maintenance/beans/OffenderOicAppealIncidentsCommitBean';
import { OffenderOicAppealPenaltiesCommitBean } from '../maintenance/beans/OffenderOicAppealPenaltiesCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OicOffences } from '../beans/OicOffences';

@Component({
	selector: 'app-oidoicap',
	templateUrl: './oidoicap.component.html'
})

export class OidoicapComponent implements OnInit {

	@ViewChild('offOicaiGrid', { static: true }) offOicaiGrid: any;
	@ViewChild('offOicapGrid', { static: true }) offOicapGrid: any;
	@ViewChild('offOicaGrid', { static: true }) offOicaGrid: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
	offoiCaData: OffenderOicAppeals[] = [];
	offoiCaiData: OffenderOicAppealIncidents[] = [];
	offoiCapData: OffenderOicAppealPenalties[] = [];
	offoicaModel: OffenderOicAppeals = new OffenderOicAppeals();
	offoicaiModel: OffenderOicAppealIncidents = new OffenderOicAppealIncidents();
	offoicaiTempModel: OffenderOicAppealIncidents = new OffenderOicAppealIncidents();
	offOicapModel: OffenderOicAppealPenalties = new OffenderOicAppealPenalties();
	offOicaInsertList: OffenderOicAppeals[] = [];
	offOicaUpdateList: OffenderOicAppeals[] = [];
	offOicaDeleteList: OffenderOicAppeals[] = [];
	offOicaCommitModel: OffenderOicAppealsCommitBean = new OffenderOicAppealsCommitBean();
	offOicaiInsertList: OffenderOicAppealIncidents[] = [];
	offOicaiUpdateList: OffenderOicAppealIncidents[] = [];
	offOicaiDeleteList: OffenderOicAppealIncidents[] = [];
	offOicaiCommitModel: OffenderOicAppealIncidentsCommitBean = new OffenderOicAppealIncidentsCommitBean();
	offOicapInsertList: OffenderOicAppealPenalties[] = [];
	offOicapUpdateList: OffenderOicAppealPenalties[] = [];
	offOicapDeleteList: OffenderOicAppealPenalties[] = [];
	offOicapCommitModel: OffenderOicAppealPenaltiesCommitBean = new OffenderOicAppealPenaltiesCommitBean();
	offOicaColumnDef: any[];
	offOicaiColumnDef: any[];
	offOicapColumnDef: any[];
	offOicaGridDelete: boolean;
	offOicaGridInsert: boolean;
	OffOicaGridIndex: number;
	offOicaiGridIndex: number;
	offOicaiGridInsert: boolean;
	offOicaiGridelete: boolean;
	OffOicapGridIndex: number;
	OffOicapGridInsert: boolean;
	offOicapGridDelete: boolean;
	summary: any;
	oicComment: any;
	lvOicChargeId: any;
	lvType: any;
	originalPenaltyButton: boolean;
	confirmFlag: boolean = false;
	oicOffenceModel: OicOffences = new OicOffences();
	constructor(public translateService: TranslateService, public sessionManager: UserSessionManager,
		public oidoicapFactory: OidoicapService, public dialogService: DialogService,) {
		// TODO initilize data members here..!
		this.offOicaColumnDef = [];
		this.offOicaiColumnDef = [];
		this.offOicapColumnDef = [];
	}
	ngOnInit() {
		this.offOicaGridDelete = false;
		this.offOicaGridInsert = false;
		this.offOicaiGridInsert = false;
		this.offOicaiGridelete = false;
		this.OffOicapGridInsert = false;
		this.offOicapGridDelete = false;
		this.originalPenaltyButton = true;
		this.offOicaColumnDef = [
			{
				fieldName: this.translateService.translate('oidoicap.appealfield'), field: 'apprealDate', editable: true, width: 150,
				datatype: 'date', required: true
			},
			{
				fieldName: this.translateService.translate('oidoicap.appealreason'), field: 'aprrealReasonCode', datatype: 'lov', editable: true, width: 150,
				domain: 'OIC_APP_RSN', required: true
			},
			{
				fieldName: this.translateService.translate('oidoicap.hearingdate'), field: 'hearingDate', editable: true, width: 150,
				datatype: 'date'
			},
			{
				fieldName: this.translateService.translate('common.time'), field: 'hearingTime', editable: true, width: 150,
				datatype: 'time'
			},
			{
				fieldName: this.translateService.translate('oidoicap.heardby'), field: 'heardBy', datatype: 'lov', editable: true, width: 150,
				link: 'oidoicap/rgHeardByRecordGroup', titles: {
					code: this.translateService.translate('oidoicap.heardbylov'),
					description: this.translateService.translate('common.description')
				}
			},
			{
				fieldName: this.translateService.translate('oidoicap.otherrepresentative'), field: 'otherRepresentative',datatype: 'text', editable: true, width: 150, 
				maxlength: 60,uppercase: 'false'
			},
			{
				fieldName: this.translateService.translate('oidoicap.result'), field: 'hearingResultCode', datatype: 'lov', editable: true, width: 150,
				domain: 'OIC_APP_RSLT'
			},
			{
				fieldName: this.translateService.translate('oidoicap.summary'), field: 'summary', datatype: 'text', editable: true, width: 150,
				maxlength: 240,uppercase: 'false'
			},
		];
		this.offOicaiColumnDef = [
			{
				fieldName: this.translateService.translate('oidoicap.hearingid'), field: 'oicHearingId',datatype: 'number', editable: false, width: 150, required: true
			},
			{
				fieldName: '', field: 'launchButton', editable: true, width: 150,
				datatype: 'launchbutton', onLaunchClick: this.onOidoicapPopUpClick, isDisable: this.disableCell, modal: true, dialogWidth: 80, data: 'row'
			},
			{
				fieldName: this.translateService.translate('oidoicap.charge'), field: 'chargedOffenceCode', editable: false, width: 150,
				datatype: 'text',uppercase: 'false'
			},
			{
				fieldName: this.translateService.translate('common.description'), field: 'offenceDescription', editable: false, width: 150,
				datatype: 'text',uppercase: 'false'
			},
			{
				fieldName: '', field: 'resultSeq', hide: true
			},
			{
				fieldName: '', field: 'oicIncidentId', hide: true
			},
			{
				fieldName: '', field: 'chargeSeq', hide: true
			},
			{
				fieldName: '', field: 'oicOffenceId', hide: true
			},
			{
				fieldName: '', field: 'hearingDate', hide: true
			},
		];
		this.offOicapColumnDef = [
			{
				fieldName: this.translateService.translate('oidoicap.line'), field: 'seq', editable: false, width: 150, datatype: 'number'
			},
			{
				fieldName: this.translateService.translate('common.type'), field: 'oicPenaltyType', editable: true, width: 150,
				datatype: 'lov', domain: 'OIC_SANCT', required: true
			},
			{
				fieldName: this.translateService.translate('oidoicap.mths'), field: 'month', editable: true, width: 150, datatype: 'number',
				maxValue: 999, whole: true
			},
			{
				fieldName: this.translateService.translate('oidoicap.days'), field: 'days', editable: true, width: 150, datatype: 'number',
				maxValue: 999, whole: true
			},
			{
				fieldName: this.translateService.translate('oidoicap.restitution'), field: 'compensation', editable: true, width: 150, datatype: 'number',
				format: '1.2-2', maxValue: 99999,whole: true,strictFP: true
			},
			{
				fieldName: this.translateService.translate('oidoicap.effdate'), field: 'effectDate', required: true, editable: true, width: 150,
				datatype: 'date'
			},
			{
				fieldName: this.translateService.translate('oidoicap.consln'), field: 'oicSeqLog', editable: false, width: 150,
				/* link: 'oidoicap/rgOicSeqLogRecordGroup?OicSeqLogParentField=', parentField: 'oicSeqLogParentField' */
			},
			{
				fieldName: '', field: 'launchButton', editable: true, width: 150,
				datatype: 'launchbutton', onLaunchClick: this.onOffenderPenaltiesPopUpClick, modal: true, dialogWidth: 80, data: 'row'
			},
			{
				fieldName: this.translateService.translate('oidoicap.tohearingid'), field: 'oicHearingIdLog', editable: false, width: 150,
				datatype: 'text',uppercase: 'false'
			},
			{
				fieldName: this.translateService.translate('common.status'), field: 'status', editable: true, width: 150, datatype: 'lov',
				domain: 'OIC_SANCT_ST'
			},
			{
				fieldName: this.translateService.translate('common.comments'), field: 'oicComment', editable: true, width: 150, datatype: 'text',
				maxlength: 50,uppercase: 'false'
			},
		];

	}

	disableCell = (data: any, index: number, field: string): boolean => {
		if (!data.createDatetime) {
			return false;
		} else {
			return true;
		}
	}

	onButOriginalPenaltyclick = () => {

		if (this.offOicaiGrid.addedMap.size >= 1 || this.offOicaiGrid.removedMap.size >= 1) {
			this.show('oidoicap.youmustsaveyourchanges', 'warn');
			return false;
		}
		const serviceObj = this.oidoicapFactory.butOriginalPenalty(this.offoicaiModel);
		serviceObj.subscribe(data => {
			if (data) {
				this.lvOicChargeId = data;
			}
		});
		const serviceObj2 = this.oidoicapFactory.getoffencedetails(this.offoicaiModel);
		serviceObj2.subscribe(result => {
			if (result) {
				this.lvType = result;
			}
			const data = {
				chargeDescriptionResult: this.offoicaiModel.offenceDescription,
				typeResult: this.lvType, resultOicOffenceCode: this.offoicaiModel.chargedOffenceCode,
				pChargeId: this.lvOicChargeId, pHearingDate: this.offoicaiModel.hearingDate,
				pOicIncidentId: this.offoicaiModel.oicIncidentId, oicHearingId: this.offoicaiModel.oicHearingId,
				resultSeq: this.offoicaiModel.resultSeq, queryOnly: true
			};

			this.dialogService.openLinkDialog('ocuoicaw', data, 80).subscribe(result => {

			});
		});

	}

	onOidoicapPopUpClick = (event) => {
		const data = {
			offenderBookId: this.vHeaderBlockModel.offenderBookId
		};
		this.dialogService.openLinkDialog('OIDOICAPPOPUP', data, 80).subscribe(result => {
			const index = this.offoiCaiData.indexOf(event);
			if (result) {
				this.offOicaiGrid.setColumnData('oicHearingId', index, result.code);
				this.offOicaiGrid.setColumnData('chargedOffenceCode', index, result.oicOffenceCode);
				this.offOicaiGrid.setColumnData('offenceDescription', index, result.description);
				this.offOicaiGrid.setColumnData('resultSeq', index, result.resultSeq);
				this.offOicaiGrid.setColumnData('oicIncidentId', index, result.oicIncidentId);
				this.offOicaiGrid.setColumnData('chargeSeq', index, result.chargeSeq);
				this.offOicaiGrid.setColumnData('oicOffenceId', index, result.oicOffenceId);
				this.offOicaiGrid.setColumnData('hearingDate', index, result.hearingDate);
			} /* else {
				this.offOicaiGrid.setColumnData('oicHearingId', index, undefined);
				this.offOicaiGrid.setColumnData('chargedOffenceCode', index, undefined);
				this.offOicaiGrid.setColumnData('offenceDescription', index, undefined);
				this.offOicaiGrid.setColumnData('resultSeq', index, undefined);
				this.offOicaiGrid.setColumnData('oicIncidentId', index, undefined);
				this.offOicaiGrid.setColumnData('chargeSeq', index, undefined);
				this.offOicaiGrid.setColumnData('oicOffenceId', index, undefined);
				this.offOicaiGrid.setColumnData('hearingDate', index, undefined);
			} */
		});

	}

	onOffenderPenaltiesPopUpClick = (event) => {
		const data = {
			offenderBookId: this.vHeaderBlockModel.offenderBookId,
			seq: this.offOicapModel.seq,
			oicApprealId: this.offOicapModel.oicApprealId,
			oicHearingId: this.offOicapModel.oicHearingId,
			resultSeq: this.offOicapModel.resultSeq
		};
		this.dialogService.openLinkDialog('OIDOICAPPENALTYPOPUP', data, 80).subscribe(result => {
			const index = this.offoiCapData.indexOf(event);
			if (result) {
				this.offOicapGrid.setColumnData('oicSeqLog', index, result.oicSeqLog);
				this.offOicapGrid.setColumnData('oicHearingIdLog', index, result.oicHearingIdLog);
			} /* else {
				this.offOicapGrid.setColumnData('oicSeqLog', index, undefined);
				this.offOicapGrid.setColumnData('oicHearingIdLog', index, undefined);
			} */
		});

	}

	onOffenderChange(offender) {
		this.vHeaderBlockModel = new VHeaderBlock();
		if (offender) {
			this.vHeaderBlockModel = offender;
			this.oicComment = undefined;
			this.summary = undefined;
			if (this.vHeaderBlockModel.offenderBookId) {
				this.offOicaGridInsert = true;
				this.originalPenaltyButton = true;
				this.oidoicaexecuteQuery();
			}
		} else {
			this.offOicaGridDelete = false;
			this.offOicaGridInsert = false;
			this.offOicaiGridInsert = false;;
			this.offOicaiGridelete = false;
			this.OffOicapGridInsert = false;
			this.offOicapGridDelete = false;
			this.originalPenaltyButton = true;
			this.oicComment = undefined;
			this.summary = undefined;
			this.offoiCaData = [];
			this.offoiCaiData = [];
			this.offoiCapData = [];
		}
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

	onSummaryChange(event) {
		const index = this.offoiCaData.indexOf(this.offoicaModel);
		if (event) {
			this.offOicaGrid.setColumnData('summary', index, event);
		} else if (!event) {
			this.offOicaGrid.setColumnData('summary', index, undefined);
		}
	}

	onoicCommentChange(event) {
		const index = this.offoiCapData.indexOf(this.offOicapModel);
		if (event) {
			this.offOicapGrid.setColumnData('oicComment', index, event);
		} else {
			this.offOicapGrid.setColumnData('oicComment', index, undefined);
		}
	}

	get summaryFlag(): boolean {
		if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId || this.offoiCaData.length === 0) {
			return true;
		}
		return false;
	}

	get oicCommentFlag(): boolean {
		if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId || this.offoiCapData.length === 0) {
			return true;
		}
		return false;
	}

	//First Grid execute query
	oidoicaexecuteQuery() {
		this.offoicaModel = new OffenderOicAppeals();
		this.offoicaModel.offenderBookingId = this.vHeaderBlockModel.offenderBookId;
		const serviceObj = this.oidoicapFactory.offOicaExecuteQuery(this.offoicaModel);
		serviceObj.subscribe(data => {
			if (data.length == 0) {
				this.offoiCaData = [];
				this.offoiCaiData = [];
				this.offoiCapData = [];
				this.oicComment = undefined;
				this.summary = undefined;
				this.offOicaGridDelete = false;
				this.OffOicapGridInsert = false;
				this.offOicaiGridInsert = false;
			} else {
				this.offoiCaData = data;
				this.offOicaGridDelete = true;
				this.offOicaiGridInsert = true;
				this.OffOicaGridIndex = 0;
			}
		});
	}

	//second Grid Execute Query	
	offOicaiExecuteQuery() {
		this.offoicaiModel = new OffenderOicAppealIncidents();
		this.offoicaiModel.offenderBookingId = this.vHeaderBlockModel.offenderBookId;
		this.offoicaiModel.oicApprealId = this.offoicaModel.oicApprealId;
		const serviceObj = this.oidoicapFactory.offOicaiExecuteQuery(this.offoicaiModel);
		serviceObj.subscribe(data => {
			if (data && data.length === 0) {
				this.offoiCaiData = [];
				this.offoiCapData = [];
				this.oicComment = undefined;
				this.offOicaiGridelete = false;
				this.originalPenaltyButton = true;
				this.OffOicapGridInsert = false;
				this.offOicaiGridInsert = true;
			} else {
				this.offoiCaiData = data;
				this.offoiCaiData.forEach(e => {
					e.launchButton = '...'
				});
				this.offOicaiGridIndex = 0;
				this.offOicaiGridelete = true;
				this.originalPenaltyButton = false;
				this.offOicaiGridInsert = true;
				
			}
		});
	}

	//Third Grid Execute Query
	offOicapExecuteQuery() {
		this.offOicapModel = new OffenderOicAppealPenalties();
		this.offOicapModel.oicApprealId = this.offoicaiModel.oicApprealId;
		this.offOicapModel.oicHearingId = this.offoicaiModel.oicHearingId;
		this.offOicapModel.resultSeq = this.offoicaiModel.resultSeq;
		const offoicapResult = this.oidoicapFactory.offOicapExecuteQuery(this.offOicapModel);
		offoicapResult.subscribe(data => {
			if (data.length === 0) {
				this.offoiCapData = [];
				this.oicComment = undefined;
				this.offOicapGridDelete = false;
				this.OffOicapGridInsert = true;
			} else {
				this.offoiCapData = data;
				this.offoiCapData.forEach(e => {
					e.launchButton = '...';
				});
				this.OffOicapGridIndex = 0;
				this.offOicapGridDelete = true;
				this.OffOicapGridInsert = true;
			}
		});
	}

	validateOffOicaGridRowData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		/* if(event.field === 'apprealDate'){
			if (event.data.apprealDate && DateFormat.compareDateTime(DateFormat.getDate(event.data.apprealDate),
				DateFormat.getDate()) === 1) {
				this.show('Appreal Date must be equal to or less than the current date.');
				rowdata.validated = true;
				return rowdata;
			}
		}
		if (event.field === 'hearingDate') {
			if (event.data.hearingDate && DateFormat.compareDateTime(DateFormat.getDate(event.data.hearingDate),
				DateFormat.getDate(event.data.apprealDate)) === -1) {
				this.show('Hearing Date must be equal to or greater than the Appeal date.');
				rowdata.validated = true;
				return rowdata;
			}
		} */
		rowdata.validated = true;
		return rowdata;
	}
	onOffOicaGridRowClick(event) {
		this.offoicaModel = new OffenderOicAppeals();
		if (event) {
			this.offoicaModel = event;
			this.summary = this.offoicaModel.summary;
			if(this.vHeaderBlockModel.offenderBookId &&	this.offoicaModel.oicApprealId){
				this.offOicaiExecuteQuery();
			}else{
				this.offoiCaiData = [];
				this.offoiCapData = [];
				this.offoicaiModel = new OffenderOicAppealIncidents();
				this.offOicapModel = new OffenderOicAppealPenalties();
				this.summary = undefined;
				this.offOicaiGridInsert = false;
				this.OffOicapGridInsert = false;
			}
			if (event.createDatetime) {
				this.offOicaGridDelete = true;
			} else {
				this.offOicaGridDelete = false;
			}
		} else {
		}
	}

	onOffOicaGridClear = () => {
		return true;
	}

	onOffOicaGridInsert = () => {
		return {};
	}

	validateoffOicaiGridRowData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		rowdata.validated = true;
		return rowdata;
	}
	onoffOicaiGridRowClick(event) {
		this.offoicaiModel = new OffenderOicAppealIncidents();
		if (event) {
			this.offoicaiModel = event;
			const serviceObj = this.oidoicapFactory.getOicOffenceCodeCur(this.offoicaiModel.oicOffenceId);
				serviceObj.subscribe(data =>{
					if(data){
						this.oicOffenceModel = data;
					}
				});
			if(this.offoicaiModel.oicApprealId && this.offoicaiModel.oicHearingId && this.offoicaiModel.resultSeq){
				this.offOicapExecuteQuery();
			}else{
				this.offoiCapData = [];
				this.offOicapModel = new OffenderOicAppealPenalties();
				this.oicComment = undefined;
				this.OffOicapGridInsert = false;
			}
			if (event.createDatetime) {
				this.offOicaiGridelete = true;
			} else {
				this.offOicaiGridelete = false;
			}
		} 
	}

	onOffOicaiGridClear = () => {
		return true;
	}

	onOffOicaiGridInsert = () => {
		return { launchButton: '...' };
	}


	validateOffOicapGridRowData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		rowdata.validated = true;
		return rowdata;
	}
	onOffOicapGridRowClick(event) {
		this.offOicapModel = new OffenderOicAppealPenalties();
		if (event) {
			this.offOicapModel = event;
			this.oicComment = this.offOicapModel.oicComment;
			if (event.createDatetime) {
				this.offOicapGridDelete = true;
			} else {
				this.offOicapGridDelete = false;
			}
		} else {
		}
	}

	onOffOicapGridClear = () => {
		this.offOicapExecuteQuery();
		return true;
	}

	onOffOicapGridInsert = () => {
		return { launchButton: '...' };
	}

	/**
	 *  This function will be executed when First Grid commit event is
	* fired
	*/
	offOicaGridSaveForm(event) {
		this.offOicaInsertList = event.added;
		this.offOicaUpdateList = event.updated;
		this.offOicaDeleteList = event.removed;
		this.offOicaCommitModel.insertList = [];
		this.offOicaCommitModel.updateList = [];
		this.offOicaCommitModel.deleteList = [];
		if (this.offOicaInsertList.length > 0) {
			for (let i = 0; i < this.offOicaInsertList.length; i++) {
				if (!this.offOicaInsertList[i].apprealDate) {
					this.show('oidoicap.appealfieldmust');
					return;
				}
				if (!this.offOicaInsertList[i].aprrealReasonCode) {
					this.show('oidoicap.appealreasonmust');
					return;
				}
				if (this.offOicaInsertList[i].apprealDate && DateFormat.compareDateTime(DateFormat.getDate(this.offOicaInsertList[i].apprealDate),
				DateFormat.getDate()) === 1) {
				this.show('oidoicap.appealdatevalidation');
				return;
				}
				if (this.offOicaInsertList[i].hearingDate && DateFormat.compareDateTime(DateFormat.getDate(this.offOicaInsertList[i].hearingDate),
					DateFormat.getDate(this.offOicaInsertList[i].apprealDate)) === -1) {
					this.show('oidoicap.hearingdatevalid');
					return;
				}
				this.offOicaInsertList[i].offenderBookingId = this.vHeaderBlockModel.offenderBookId;
				this.offOicaInsertList[i].createUserId = this.sessionManager.getId()
			}
			this.offOicaCommitModel.insertList = this.offOicaInsertList;
		}
		if (this.offOicaUpdateList.length > 0) {

			for (let i = 0; i < this.offOicaUpdateList.length; i++) {
				if (!this.offOicaUpdateList[i].apprealDate) {
					this.show('oidoicap.appealfieldmust');
					return;
				}
				if (!this.offOicaUpdateList[i].aprrealReasonCode) {
					this.show('oidoicap.appealreasonmust');
					return;
				}
				if (this.offOicaUpdateList[i].apprealDate && DateFormat.compareDateTime(DateFormat.getDate(this.offOicaUpdateList[i].apprealDate),
				DateFormat.getDate()) === 1) {
				this.show('oidoicap.appealdatevalidation');
				return;
				}
				if (this.offOicaUpdateList[i].hearingDate && DateFormat.compareDateTime(DateFormat.getDate(this.offOicaUpdateList[i].hearingDate),
					DateFormat.getDate(this.offOicaUpdateList[i].apprealDate)) === -1) {
					this.show('oidoicap.hearingdatevalid');
					return;
				}
				this.offOicaUpdateList[i].modifyUserId = this.sessionManager.getId();
			}

			this.offOicaCommitModel.updateList = this.offOicaUpdateList;
		}
		if (this.offOicaDeleteList.length > 0) {

			this.offOicaCommitModel.deleteList = this.offOicaDeleteList;
		}
		const offoicaSaveData = this.oidoicapFactory.offOicaCommit(this.offOicaCommitModel);
		offoicaSaveData.subscribe(data => {
			if (data === 1) {
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.oidoicaexecuteQuery();
			} else if (data === 2) {
				this.show('oidoicap.cannotdeletemasterrecord');
				this.oidoicaexecuteQuery();
			} else {
				this.show('common.addupdateremoverecordfailed');
				this.oidoicaexecuteQuery();
			}
		});
	}
	
	/**
	 *  This function will be executed when Second Grid commit event is
	* fired
	*/
	offoicaiSaveForm(event) {
		this.offOicaiInsertList = event.added;
		this.offOicaiDeleteList = event.removed;
		this.offOicaiCommitModel.insertList = [];
		this.offOicaiCommitModel.updateList = [];
		this.offOicaiCommitModel.deleteList = [];
		if (this.offOicaiInsertList.length > 0) {
			for (let i = 0; i < this.offOicaiInsertList.length; i++) {
				if (!this.offOicaiInsertList[i].oicHearingId) {
					this.show('oidoicap.hearingidmust');
					return;
				}
				this.offOicaiInsertList[i].oicApprealId = this.offoicaModel.oicApprealId;
				this.offOicaiInsertList[i].createUserId = this.sessionManager.getId();
			}

			this.offOicaiCommitModel.insertList = this.offOicaiInsertList;
		}
		if (this.offOicaiDeleteList.length > 0) {
			this.offOicaiCommitModel.deleteList = this.offOicaiDeleteList;
		}
		const offoicaiSaveData = this.oidoicapFactory.offOicaiCommit(this.offOicaiCommitModel);
		offoicaiSaveData.subscribe(data => {
			if (data === 1) {
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.offOicaiExecuteQuery();
			} else if (data === 2) {
				this.show('oidoicap.cannotdeletemasterrecord');
				this.offOicaiExecuteQuery();
			} else if(data === 3){
				this.show('oidoicap.rowexistswithsamehearingid');
				this.offOicaiExecuteQuery();
			} else {
				this.show('common.addupdateremoverecordfailed');
				this.offOicaiExecuteQuery();
			}
		});
	}
	/*
	* This function converts the given date from MM/dd/yyyy to
	* yyyy/MM/dd format, If input data is not as expected
	* format then it will return input value
	*/
	oidoicapdateFormat(dateValue) {
		if (dateValue != undefined && dateValue.length > 0) {
			let newdate = dateValue.split('/');
			return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
		} else {
			return dateValue;
		}
	}

	/**
	 *  This function will be executed when Third Grid commit event is
	* fired
	*/
	offoicapSaveForm(event) {
		this.offOicapInsertList = event.added;
		this.offOicapUpdateList = event.updated;
		this.offOicapDeleteList = event.removed;
		this.offOicapCommitModel.insertList = [];
		this.offOicapCommitModel.updateList = [];
		this.offOicapCommitModel.deleteList = [];
		if (this.offOicapInsertList.length > 0) {
			for (let i = 0; i < this.offOicapInsertList.length; i++) {
				if (!this.offOicapInsertList[i].oicPenaltyType) {
					this.show('oidoicap.typemust');
					return;
				}
				if (!this.offOicapInsertList[i].effectDate) {
					this.show('oidoicap.effdatemust');
					return;
				}
				if(this.oicOffenceModel.maxPenaltyMonths && this.offOicapInsertList[i].month){
					if(Number(this.offOicapInsertList[i].month) > Number(this.oicOffenceModel.maxPenaltyMonths)){
						this.confirmFlag = true;
					}
				}
				if(this.oicOffenceModel.maxPenaltyDays && this.offOicapInsertList[i].days){
					if(Number(this.offOicapInsertList[i].days) > Number(this.oicOffenceModel.maxPenaltyDays)){
						this.confirmFlag = true;
					}
				}
				this.offOicapInsertList[i].offenderBookingId = this.vHeaderBlockModel.offenderBookId;
				this.offOicapInsertList[i].oicApprealId = this.offoicaiModel.oicApprealId;
				this.offOicapInsertList[i].oicHearingId = this.offoicaiModel.oicHearingId;
				this.offOicapInsertList[i].resultSeq = this.offoicaiModel.resultSeq;
				this.offOicapInsertList[i].createUserId = this.sessionManager.getId();
			}
			this.offOicapCommitModel.insertList = this.offOicapInsertList;
		}
		if (this.offOicapUpdateList.length > 0) {
			for (let i = 0; i < this.offOicapUpdateList.length; i++) {
				if (!this.offOicapUpdateList[i].oicPenaltyType) {
					this.show('oidoicap.typemust');
					return;
				}
				if (!this.offOicapUpdateList[i].effectDate) {
					this.show('oidoicap.effdatemust');
					return;
				}
				if(this.oicOffenceModel.maxPenaltyMonths && this.offOicapUpdateList[i].month){
					if(Number(this.offOicapUpdateList[i].month) > Number(this.oicOffenceModel.maxPenaltyMonths)){
						this.confirmFlag = true;
					}
				}
				if(this.oicOffenceModel.maxPenaltyDays && this.offOicapUpdateList[i].days){
					if(Number(this.offOicapUpdateList[i].days) > Number(this.oicOffenceModel.maxPenaltyDays)){
						this.confirmFlag = true;
					}
				}
				this.offOicapUpdateList[i].modifyUserId = this.sessionManager.getId();
			}

			this.offOicapCommitModel.updateList = this.offOicapUpdateList;
		}
		if (this.offOicapDeleteList.length > 0) {
			for (let i = 0; i < this.offOicapDeleteList.length; i++) {
			}
			this.offOicapCommitModel.deleteList = this.offOicapDeleteList;
		}

		if(this.confirmFlag){
			const termFlagMessage = {
				label: this.translateService.translate('oidoicap.thistermexceeds'), yesBtn: true, noBtn: true
			};
			this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', termFlagMessage, 50).subscribe(result => {
				if(result){
					this.confirmFlag = false;
					this.offOicapGridFinalSave();
				}else{
					this.confirmFlag = false;
					return;
				}
			});
		}else{
			this.confirmFlag = false;
			this.offOicapGridFinalSave();
		}
	}

	offOicapGridFinalSave(){
		const offoicapSaveData = this.oidoicapFactory.offOicapCommit(this.offOicapCommitModel);
		offoicapSaveData.subscribe(data => {
			if (data === 1) {
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.offOicapExecuteQuery();
			} else if (data === 2) {
				this.show('oidoicap.cannotdeletemasterrecordpenalty');
				this.offOicapExecuteQuery();
			} else {
				this.show('common.addupdateremoverecordfailed');
				this.offOicapExecuteQuery();
			}
		});
	}
}
