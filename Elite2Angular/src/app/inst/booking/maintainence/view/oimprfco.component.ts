import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimprfcoService } from '../service/oimprfco.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ProfileTypes } from '../beans/ProfileTypes';
import { ProfileCodes } from '@instdemographicsbeans/ProfileCodes';
import { ProfileCodesCommitBean } from '../beans/ProfileCodesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
	selector: 'app-oimprfco',
	templateUrl: './oimprfco.component.html'
})

export class OimprfcoComponent implements OnInit {
	// Variable declaration
	@ViewChild('grid') grid: any;
	msgs: any[] = [];
	pfltypeData: ProfileTypes[] = [];
	pfltypeModel: ProfileTypes = new ProfileTypes();
	pfltypeInsertList: ProfileTypes[] = [];
	pfltypeUpdatetList: ProfileTypes[] = [];
	pfltypeDeleteList: ProfileTypes[] = [];
	pflcodeData: ProfileCodes[] = [];
	pflcodeModel: ProfileCodes = new ProfileCodes();
	pflcodeCommitModel: ProfileCodesCommitBean = new ProfileCodesCommitBean();
	pflcodeIndex: number = -1;
	pflcodeInsertList: ProfileCodes[] = [];
	pflcodeUpdatetList: ProfileCodes[] = [];
	pflcodeDeleteList: ProfileCodes[] = [];
	orderTypesColumnDef: any[];
	pflCodeColumnDef: any[];
	iwpTemplateObjectsColumnDef: any[];
	nextReadOnly: boolean;
	previousReadOnly: boolean;
	retrievedisabled: boolean;
	clearDisabled: boolean;
	profileCodeInsert: boolean;
	profileCodeDelete: boolean;
	checkProfileCodeRel: boolean;
	disableSearchFields: boolean;
	msglist: any[];
	message: any;
	type: any;
	index: number;
	constructor(private oimprfcoFactory: OimprfcoService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.orderTypesColumnDef = [];
		this.pflCodeColumnDef = [];
		this.iwpTemplateObjectsColumnDef = [];
	}
	ngOnInit() {
		this.previousReadOnly = true;
		this.nextReadOnly = true;
		this.retrievedisabled = false;
		this.clearDisabled = true;
		this.profileCodeInsert = false;
		this.profileCodeDelete = false;
		this.checkProfileCodeRel = false;
		this.disableSearchFields = false;
		this.pflCodeColumnDef = [
			{ fieldName: this.translateService.translate('common.code') + '*', field: 'profileCode', datatype: 'text', editable: true, cellEditable: this.canAlertEdit, width: 150, maxlength: 12 },
			{ fieldName: this.translateService.translate('common.description'), field: 'description', editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 40 },
			{ fieldName: this.translateService.translate('common.sequence') + '*', field: 'listSeq', editable: true, width: 150, maxValue: '999', strictFP: true, whole: true, datatype: 'number' },
			{ fieldName: this.translateService.translate('common.active') , field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },
			{ fieldName: this.translateService.translate('oimprfco.upd') , field: 'updateAllowedFlag', editable: true, width: 150, datatype: 'checkbox' },
			{ fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150, datatype: 'date' },
		];
	}


	canAlertEdit = (data: any, index: number, field: string): boolean => {
		if (!data.profileType) {
			return true;
		} else {
			return false;
		}
	}

	/** 
	 * This function displays the messages
	 */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}

	isInsertable() {
		if (this.pfltypeModel.profileType || this.pfltypeModel.description) {
			this.clearDisabled = false;
		} else {
			this.clearDisabled = true;
		}
	}
	cancel() {
		this.previousReadOnly = true;
		this.nextReadOnly = true;
		this.retrievedisabled = false;
		this.profileCodeInsert = false;
		this.profileCodeDelete = false;
		this.disableSearchFields = false;
		this.clearDisabled = true;
		this.pfltypeData = [];
		this.pfltypeModel = new ProfileTypes();
		this.pflcodeData = []
		this.pflcodeModel = new ProfileCodes();
	}

	//execute query
	pflTypeExecuteQuery() {
		const serviceObj = this.oimprfcoFactory.pflTypeExecuteQuery(this.pfltypeModel);
		serviceObj.subscribe(data => {
			if (data.length == 0) {
				this.previousReadOnly = true;
				this.nextReadOnly = true;
				this.pfltypeData = [];
				this.pfltypeModel = new ProfileTypes();
				this.clearDisabled = true;
				this.type = 'warn';
				this.message = this.translateService.translate('common.querycausedReEnter');
				this.show();
				return;
			} else {
				if (!(this.pfltypeModel.profileType || this.pfltypeModel.description)) {
					this.previousReadOnly = false;
					this.nextReadOnly = false;
				}
				this.disableSearchFields = true;
				this.retrievedisabled = true;
				this.clearDisabled = false;
				this.profileCodeInsert = true;
				this.profileCodeDelete = true;
				data.forEach(element => {
					element.activeFlag = element.activeFlag === 'Y' ? true : false;
					element.updateAllowedFlag = element.updateAllowedFlag === 'Y' ? true : false;
				});
				this.pfltypeData = data;
				this.pfltypeModel = this.pfltypeData[0];
				this.index = 0;
				this.pflcodeModel = new ProfileCodes();
				this.pflcodeModel.profileType = this.pfltypeModel.profileType;
				this.pflcodeExecuteQuery();
			}
		});
	}

	pflcodeExecuteQuery() {
		const pflcodeResult = this.oimprfcoFactory.pflCodeExecuteQuery(this.pflcodeModel);
		pflcodeResult.subscribe(pflcodeResultList => {
			if (pflcodeResultList.length === 0) {
				this.pflcodeData = [];
			} else {
				pflcodeResultList.forEach(element => {
					element.activeFlag = element.activeFlag === 'Y' ? true : false;
					element.updateAllowedFlag = element.updateAllowedFlag === 'Y' ? true : false;
				});
				this.pflcodeData = pflcodeResultList;
				this.pflcodeModel = pflcodeResultList[0];
				this.pflcodeIndex = 0;
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	oimprfcoSavepflcodeForm(event) {
		// TODO declare commit bean and add insert list to that object.
		this.pflcodeInsertList = event.added;
		this.pflcodeUpdatetList = event.updated;
		this.pflcodeDeleteList = event.removed;
		this.pflcodeCommitModel.insertList = [];
		this.pflcodeCommitModel.updateList = [];
		this.pflcodeCommitModel.deleteList = [];
		if (this.pflcodeInsertList.length > 0 || this.pflcodeUpdatetList.length > 0) {
			for (let i = 0; i < this.pflcodeInsertList.length; i++) {
				if (!this.pflcodeInsertList[i].profileCode || !this.pflcodeInsertList[i].profileCode.trim()) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.codemustbeentered');
					this.show();
					return;
				}
				if (!this.pflcodeInsertList[i].listSeq && this.pflcodeInsertList[i].listSeq!=0) {
					this.type = 'warn';
					this.message = this.translateService.translate('oimprfco.seqMustEnter');
					this.show();
					return;
				}
				this.pflcodeInsertList[i].profileType = this.pfltypeModel.profileType;
				this.pflcodeInsertList[i].activeFlag = this.pflcodeInsertList[i].activeFlag ? 'Y' : 'N';
				this.pflcodeInsertList[i].updateAllowedFlag = this.pflcodeInsertList[i].updateAllowedFlag ? 'Y' : 'N';
				this.pflcodeInsertList[i].modifiedDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
				this.pflcodeCommitModel.insertList = this.pflcodeInsertList;
			}
			for (let i = 0; i < this.pflcodeUpdatetList.length; i++) {
				if (!this.pflcodeUpdatetList[i].profileCode || !this.pflcodeUpdatetList[i].profileCode.trim()) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.codemustbeentered');
					this.show();
					return;
				}
				if (!this.pflcodeUpdatetList[i].listSeq && this.pflcodeUpdatetList[i].listSeq!=0) {
					this.type = 'warn';
					this.message = this.translateService.translate('oimprfco.seqMustEnter');
					this.show();
					return;
				}
				this.pflcodeUpdatetList[i].activeFlag = this.pflcodeUpdatetList[i].activeFlag ? 'Y' : 'N';
				this.pflcodeUpdatetList[i].updateAllowedFlag = this.pflcodeUpdatetList[i].updateAllowedFlag ? 'Y' : 'N';
				this.pflcodeUpdatetList[i].modifiedDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
				this.pflcodeCommitModel.updateList = this.pflcodeUpdatetList;
			}
		}
		if (this.pflcodeDeleteList.length > 0) {
			for (let i = 0; i < this.pflcodeDeleteList.length; i++) {
				this.pflcodeDeleteList[i].activeFlag = this.pflcodeDeleteList[i].activeFlag ? 'Y' : 'N';
				this.pflcodeDeleteList[i].updateAllowedFlag = this.pflcodeDeleteList[i].updateAllowedFlag ? 'Y' : 'N';
				this.pflcodeCommitModel.deleteList = this.pflcodeDeleteList;
			}
		}
		const pflcodeSaveData = this.oimprfcoFactory.pflCodeCommit(this.pflcodeCommitModel);
		pflcodeSaveData.subscribe(data => {
			if (String(data[0].errorMessage).indexOf('PROFILE_CODES_PK') > 0) {
				this.type = 'warn';
				this.message = this.translateService.translate('oimprfco.duplicateProfieCode');
				this.show();
				return;
			} else if (data[0] && data[0].sealFlag === 'success') {
				this.profileCodeInsert = true;
				this.profileCodeDelete = true;
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.pflcodeExecuteQuery();
				return;
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
				return;
			}
		});
	}

	previousRecord() {
		this.index--;
		if (this.index >= 0) {
			this.pflcodeModel = new ProfileCodes();
			this.pflcodeModel.profileType = this.pfltypeData[this.index].profileType;
			this.pfltypeModel = this.pfltypeData[this.index];
			this.pflcodeExecuteQuery();
			this.nextReadOnly = false;
		} else {
			this.index = 0;
			this.previousReadOnly = true;
			this.type = 'warn';
			this.message = this.translateService.translate('common.atfirstrecord');
			this.show();
			return;
		}
	}
	nextRecord() {
		this.index++;
		if (this.index < this.pfltypeData.length) {
			this.pflcodeModel = new ProfileCodes();
			this.pflcodeModel.profileType = this.pfltypeData[this.index].profileType;
			this.pfltypeModel = this.pfltypeData[this.index];
			this.pflcodeExecuteQuery();
			this.previousReadOnly = false;
		} else {
			this.index = this.pfltypeData.length - 1;
			this.nextReadOnly = true;
			this.type = 'warn';
			this.message = this.translateService.translate('common.lastrecordofquery');
			this.show();
			return;
		}
	}

	onGridInsert = () => {
		for (let i = 0; i < this.pflcodeData.length; i++) {
			if (!this.pflcodeData[i].profileCode || !this.pflcodeData[i].profileCode.trim()) {
				this.type = 'warn';
				this.message = this.translateService.translate('common.codemustbeentered');
				this.show();
				return;
			}
			if (!this.pflcodeData[i].listSeq && this.pflcodeData[i].listSeq!=0) {
				this.type = 'warn';
				this.message = this.translateService.translate('oimprfco.seqMustEnter');
				this.show();
				return;
			}
		}
		return { activeFlag: 'Y', updateAllowedFlag: 'Y' };
	}

	validateRowData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		if (event.field === 'activeFlag') {
			if (event.data.activeFlag) {
				this.grid.setColumnData('expiryDate', rowIndex, undefined);
				rowdata.validated = true;
				return rowdata;
			} else if (!event.data.activeFlag) {
				this.grid.setColumnData('expiryDate', rowIndex,
					DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
				rowdata.validated = true;
				return rowdata;
			}
		}
		if (event.field === 'profileCode') {
			for (let i = 0; i < this.pflcodeData.length; i++) {
				for (let j = 0; j < this.pflcodeData.length; j++) {
					if (i !== j && this.pflcodeData[i].profileCode === this.pflcodeData[j].profileCode) {
						this.type = 'warn';
						this.message = this.translateService.translate('oimprfco.duplicateProfieCode');
						this.show();
						return;
					}
				}
			}
		}
		rowdata.validated = true;
		return rowdata;
	}

	onRowClickProfileCodes(event) {
		this.checkProfileCodeRel = false;
		if (event && event.profileCode) {
			const pflcodeSaveData = this.oimprfcoFactory.checkProfileCodes(event.profileCode);
			pflcodeSaveData.subscribe(data => {
				if (data && data > 0) {
					this.checkProfileCodeRel = true;
				}
			});
		}
	}

	onProfileCodeGridDelete = () => {
		if (this.checkProfileCodeRel) {
			this.type = 'warn';
			this.message = this.translateService.translate('oimprfco.canNotDelete');
			this.show();
			return false;
		}
		return true;
	}
	onGridClear = () => {
		this.pflcodeExecuteQuery();
		return true;
	}

}
