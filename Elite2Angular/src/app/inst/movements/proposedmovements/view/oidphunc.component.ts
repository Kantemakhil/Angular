import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidphuncService } from '../service/oidphunc.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderProposedIntlocs } from '@inst/movements/proposedmovements/beans/OffenderProposedIntlocs';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { CaseloadAdmOtherProfiles } from '@inst/movement-external/beans/CaseloadAdmOtherProfiles';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OffenderLocChngDtls } from '../beans/OffenderLocChngDtls';

@Component({
	selector: 'app-oidphunc',
	templateUrl: './oidphunc.component.html',
})

export class OidphuncComponent implements OnInit {
	// Variable declaration
	@ViewChild('grid1', { static: true }) grid1: any;
	msglist: any[];
	message: any;
	type: any;
	msgs: any[] = [];
	index: any;
	propMoveData: OffenderProposedIntlocs[] = [];
	propMoveDataTemp: OffenderProposedIntlocs[] = [];
	propmoveModel: OffenderProposedIntlocs = new OffenderProposedIntlocs();
	propmoveIndex: number = 0;
	propmoveInsertList: OffenderProposedIntlocs[] = [];
	propmoveUpdateList: OffenderProposedIntlocs[] = [];
	propmoveDeleteList: OffenderProposedIntlocs[] = [];
	display: boolean;
	caseloadadmotherprofilesData: CaseloadAdmOtherProfiles[] = [];
	caseloadadmotherprofilesDataTemp: CaseloadAdmOtherProfiles[] = [];
	propMoveColumnDef: any[];
	rgmovereasonRg: any[] = [];
	rgmovetypeRg: any[] = [];
	vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
	propstatModel: OffenderLocChngDtls = new OffenderLocChngDtls();
	disable: boolean;
	propmoveInsertListTemp: OffenderProposedIntlocs[] = [];

	constructor(private oidphuncFactory: OidphuncService, public translateService: TranslateService, public sessionManager: UserSessionManager, public dialogService: DialogService) {
		this.propMoveColumnDef = [];
	}
	ngOnInit() {
		this.propMoveColumnDef = [
			{
				fieldName: this.translateService.translate('oidphunc.from'), field: 'fromLivUnitidDesc', datatype: 'text',
				editable: false, width: 150, maxlength: 15
			},
			{
				fieldName: this.translateService.translate('oidphunc.tolevelone'), field: 'levelOneId', datatype: 'lov', source: 'OIMMHOLE',
				link: 'oidphunc/rgLevelOneRecordGroup?agyLocId=', parentField: 'agyLocId', editable: true, required: true,
				width: 150, maxlength: 15, titles: {
					livingUnitCode: 'Code'
					, description: 'Description'
				}, cellEditable: this.canCellEdit
			},
			{
				fieldName: this.translateService.translate('oidphunc.leveltwo'), field: 'levelTwoId', datatype: 'lov',
				link: 'oidphunc/rgLevelTwoRecordGroup?livingUnitId=', parentField: 'levelOneId', editable: true, width: 150, maxlength: 15, cellEditable: this.canCellEdit
			},
			{
				fieldName: this.translateService.translate('oidphunc.levelthree'), field: 'levelThreeId', datatype: 'lov',
				link: 'oidphunc/rgLevelThreeRecordGroup?livingUnitId=', parentField: 'levelTwoId', editable: true, width: 150, maxlength: 15, cellEditable: this.canCellEdit
			},
			{
				fieldName: this.translateService.translate('oidphunc.levelfour'), field: 'levelFourId', datatype: 'lov',
				link: 'oidphunc/rgLevelFourRecordGroup?livingUnitId=', parentField: 'levelThreeId', editable: true, width: 150, maxlength: 15, cellEditable: this.canCellEdit
			},
			{
				fieldName: this.translateService.translate('oidphunc.type'), field: 'movementType', datatype: 'lov', source: 'OUMEMOVE',
				link: 'oidphunc/rgTypeRecordGroup', editable: true, required: true, width: 150, cellEditable: this.canCellEdit
			},
			{
				fieldName: this.translateService.translate('oidphunc.reason'), field: 'movementReason', datatype: 'lov', source: 'OUMEMOVE',
				link: 'oidphunc/rgReasonRecordGroup?internalScheduleType=', parentField: 'movementType', editable: true, required: true, width: 150, cellEditable: this.canCellEdit
			},
			{
				fieldName: this.translateService.translate('oidphunc.dateinitiated'), field: 'createDatetime', datatype: 'date',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('oidphunc.dateapproved'), field: 'approvalDate', datatype: 'date',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('oidphunc.comment'), field: 'commentText', datatype: 'text', cellEditable: this.canCellEdit,
				width: 150, uppercase: 'false', maxlength: 120,
			},


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
	canCellEdit = (data: any, index: number, field: string): boolean => {
		if (data.offenderBookId && data.locationSeq) {
			if (field === 'commentText') {
				return true;
			}
			return false;
		}
		return true;
	}
	onOffenderChange(offender) {
		this.vHeaderBlockModel = new VHeaderBlock();
		if (offender) {
			this.propmoveModel = new OffenderProposedIntlocs();
			this.propstatModel = new OffenderLocChngDtls()
			this.vHeaderBlockModel = offender;
			this.propmoveModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
			this.propmoveExecuteQuery();
		} else {
			this.propstatModel = new OffenderLocChngDtls()
			this.propMoveData = [];
			this.propMoveDataTemp = [];
			this.propmoveModel = new OffenderProposedIntlocs();

		}
	}
	onButBedVacclick = (event) => {
		const index = this.caseloadadmotherprofilesData.indexOf(event);
		if (this.vHeaderBlockModel) {
			this.dialogService.openLinkDialog('/omuavbed', this.vHeaderBlockModel, 90).subscribe(result => {
			});
		}
	}


	get viewBtndisable() {
		if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
			return false;
		} else {
			return true;
		}

	}
	get insertEnable() {
		if ((this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.vHeaderBlockModel.livingUnitId)) {
			return true;
		} else {
			return false;
		}
	}

	propmoveExecuteQuery() {
		this.propmoveModel = new OffenderProposedIntlocs();
		this.propmoveModel.createUserId = this.sessionManager.getId();
		this.propmoveModel.createUserId = this.sessionManager.getId();
		this.propmoveModel.offenderId = this.vHeaderBlockModel.offenderId;
		this.propmoveModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
		this.vHeaderBlockModel.livingUnitId

		const propmoveResult = this.oidphuncFactory.propMoveExecuteQuery(this.propmoveModel);
		propmoveResult.subscribe(data => {
			if (data.length === 0) {
				this.propMoveData = [];
				this.propMoveDataTemp = [];
			} else {
				data.forEach(element => {
					element.levelOneId = String(element.levelOneId);
					element.levelTwoId = String(element.levelTwoId);
					element.levelThreeId = String(element.levelThreeId);
					element.levelFourId = String(element.levelFourId);
					element.agyLocId = this.vHeaderBlockModel.agyLocId;
				});
				this.propMoveData = data;
				this.propMoveDataTemp = JSON.parse(JSON.stringify(data));
				this.propmoveModel = this.propMoveData[0];

			}
		});
	}
	onGridInsert = () => {
		this.propstatModel = new OffenderLocChngDtls();
		this.propstatModel.statusCode = 'APP';
		this.propstatModel.txnStatus = 'PEN';
		return {
			'initiatedDate': DateFormat.getDate(),
			'fromLivUnitidDesc': this.vHeaderBlockModel.livingUnitDescription,
			'offenderBookId': this.vHeaderBlockModel.offenderBookId,
			'fromLivingUnitId': this.vHeaderBlockModel.livingUnitId,
			'agyLocId': this.vHeaderBlockModel.agyLocId,
			'offenderId': this.vHeaderBlockModel.offenderId,
		};
	}

	onRowClickpropmove(event) {
		if (event) {
			if (event.offenderBookId && event.locationSeq && event.initiatedDate) {
				this.offexmPopulateDetails(event);
			} else {
				this.propstatModel = new OffenderLocChngDtls();
				this.propstatModel.statusCode = 'APP';
				this.propstatModel.txnStatus = 'PEN';
			}
		} else {
			this.propstatModel = new OffenderLocChngDtls();

		}
	}

	offexmPopulateDetails(event) {
		this.propstatModel = new OffenderLocChngDtls();
		const propmoveResult = this.oidphuncFactory.offenderLocChngDtlsExecuteQuery(event);
		propmoveResult.subscribe(data => {
			if (data === undefined) {
				this.propstatModel = new OffenderLocChngDtls();
			} else {
				this.propstatModel = data;
				if (this.propstatModel.recoredTime) {
					this.propstatModel.recoredTime = DateFormat.getDate(this.propstatModel.recoredTime);
				}
			}
		});
	}
	oidphuncSavepropmoveFormcall(event) {
		if (event.added.length > 0) {
			this.checkNonAssosiaction(event);
		} else if (event.updated.length > 0) {
			this.oidphuncSavepropmoveForm(event);
		}
	}
	checkNonAssosiaction(event) {
		const data = {
			label: this.translateService.translate("oidphunc.anonassociationlinkage"), yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
			if (result === null) {
				return;
			} else if (result) {
				if (this.propmoveModel.lvReturnCheckSecurity === 'N') {
					this.checkNonAssoSecurity(event);
				} else if (this.propmoveModel.vCount > 0) {
					this.openPopUp(event);
				} else {
					this.oidphuncSavepropmoveForm(event);
				}
			}
		});
	}
	checkNonAssoSecurity(event) {
		const data = {
			label: this.translateService.translate('oidphunc.securityrating'), yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
			if (result === null) {
				return;
			} else if (result) {
				if (this.propmoveModel.vCount > 0) {
					this.openPopUp(event);
				} else {
					this.oidphuncSavepropmoveForm(event);
				}
			}
		});
	}
	openPopUp(event) {
		this.dialogService.openLinkDialog('/OIUSCHCO', this.propmoveModel, 80).subscribe(result => {
			if (result === null) {
				return;
			} else if (result) {
				this.oidphuncSavepropmoveForm(event);
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	oidphuncSavepropmoveForm(event) {
		this.propmoveInsertList = event.added
		this.propmoveUpdateList = event.updated
		this.propmoveDeleteList = event.removed
		const propmoveCommitModel = { insertList: [], updateList: [], deleteList: [] };
		if (this.propmoveInsertList.length > 0 || this.propmoveUpdateList.length > 0) {
			for (let i = 0; i < this.propmoveInsertList.length; i++) {
				if (this.propmoveInsertList[i].levelFourId) {
					this.propmoveInsertList[i].toLivingUnitId = Number(this.propmoveInsertList[i].levelFourId);
				} else if (this.propmoveInsertList[i].levelThreeId) {
					this.propmoveInsertList[i].toLivingUnitId = Number(this.propmoveInsertList[i].levelThreeId);
				} else if (this.propmoveInsertList[i].levelTwoId) {
					this.propmoveInsertList[i].toLivingUnitId = Number(this.propmoveInsertList[i].levelTwoId);
				} else if (this.propmoveInsertList[i].levelOneId) {
					this.propmoveInsertList[i].toLivingUnitId = Number(this.propmoveInsertList[i].levelOneId);
				}
				this.propmoveInsertList[i].createDatetime = DateFormat.getDate();
				this.propmoveInsertList[i].createUserId = this.sessionManager.getId();

			}
			for (let i = 0; i < this.propmoveUpdateList.length; i++) {
				this.propmoveUpdateList[i].modifiedDatetime = DateFormat.getDate();
				this.propmoveUpdateList[i].modifiyUserId = this.sessionManager.getId();
			}
			propmoveCommitModel.insertList = this.propmoveInsertList;
			propmoveCommitModel.updateList = this.propmoveUpdateList;
		}
		const propmoveSaveData = this.oidphuncFactory.propmoveCommit(propmoveCommitModel);
		propmoveSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.propmoveExecuteQuery();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();

			}
		});
	}

}
