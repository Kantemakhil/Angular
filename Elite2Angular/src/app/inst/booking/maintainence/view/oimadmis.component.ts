import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OimadmisService } from '@inst/booking/maintainence/service/oimadmis.service';
import { CaseloadAdmAlertProfilesCommitBean } from '@inst/booking/maintainence/beans/CaseloadAdmAlertProfilesCommitBean';
import { CaseloadAdmOtherProfilesCommitBean } from '@inst/booking/maintainence/beans/CaseloadAdmOtherProfilesCommitBean';
import { CaseloadAdmAlertProfiles } from '@inst/booking/maintainence/beans/CaseloadAdmAlertProfiles';
import { CaseloadAdmOtherProfiles } from '@inst/movement-external/beans/CaseloadAdmOtherProfiles';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
	selector: 'app-oimadmis',
	templateUrl: './oimadmis.component.html'
})

export class OimadmisComponent implements OnInit {
	// Variable declaration
	@ViewChild('grid2', {static: true}) grid2: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	caseloadadmalertprofilesData: CaseloadAdmAlertProfiles[] = [];
	caseloadadmalertprofilesDataTemp: CaseloadAdmAlertProfiles[] = [];
	// TODO angular.copy(this.caseloadadmalertprofilesData, thiscaseloadadmalertprofilesDataTemp);
	caseloadadmalertprofilesModel: CaseloadAdmAlertProfiles = new CaseloadAdmAlertProfiles();
	caseloadadmalertprofilesIndex: number = 0;
	caseloadadmalertprofilesInsertList: CaseloadAdmAlertProfiles[] = [];
	caseloadadmalertprofilesUpdateList: CaseloadAdmAlertProfiles[] = [];
	caseloadadmalertprofilesDeleteList: CaseloadAdmAlertProfiles[] = [];
	caseloadadmalertprofilesCommitModel: CaseloadAdmAlertProfilesCommitBean = new CaseloadAdmAlertProfilesCommitBean();
	caseloadadmotherprofilesCommitModel: CaseloadAdmOtherProfilesCommitBean = new CaseloadAdmOtherProfilesCommitBean();
	caseloadadmotherprofilesData: CaseloadAdmOtherProfiles[] = [];
	caseloadadmotherprofilesDataTemp: CaseloadAdmOtherProfiles[] = [];
	// TODO angular.copy(this.caseloadadmotherprofilesData, thiscaseloadadmotherprofilesDataTemp);
	caseloadadmotherprofilesModel: CaseloadAdmOtherProfiles = new CaseloadAdmOtherProfiles();
	caseloadadmotherprofilesIndex: number = 0;
	caseloadadmotherprofilesInsertList: CaseloadAdmOtherProfiles[] = [];
	caseloadadmotherprofilesUpdatetList: CaseloadAdmOtherProfiles[] = [];
	caseloadadmotherprofilesDeleteList: CaseloadAdmOtherProfiles[] = [];
	defaultOtherProfiles: CaseloadAdmOtherProfiles = new CaseloadAdmOtherProfiles();
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	caseloadAdmAlertProfilesColumnDef: any[];
	caseloadAdmOtherProfilesColumnDef: any[];
	caseloadAdmAlertProfilesReadOnly: boolean = false;
	caseloadAdmOtherProfilesReadOnly: boolean = false;
	rgsystemmsgRg: any[] = [];
	rgothersystemmsgRg: any[] = [];
	rgagencylocationsRg: any[] = [];
	rglivingunitsRg: any[] = [];
	rgalertRg: any[] = [];
	rgalertcodeRg: any[] = [];
	tableIndex = -1;
	otherTableIndex = -1;
	readonlyFlag: boolean;
	scheduleTypeTitles = {
		description: this.translateService.translate('oiisched.description'),
	};
	messagetypeTitles = {
		description: this.translateService.translate('oimadmis.message'),
		applnCode: this.translateService.translate('common.type'),
	};
	messageTitles = {
		description: this.translateService.translate('oimadmis.message'),
	};
	agyLocIdTitles = {
		description: this.translateService.translate('oiisched.description'),
		code: 'Agy_Loc_Id',
	}
	rowIndexVal: number;
	trustAccountFlag = false;
	optionChangeValueFlag: boolean;
	deleteChildGrid: boolean;
	constructor(private oimadmisFactory: OimadmisService,
		public dialogService: DialogService,
		public translateService: TranslateService,
		public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.caseloadAdmAlertProfilesColumnDef = [];
		this.caseloadAdmOtherProfilesColumnDef = [];
	}
	ngOnInit() {
		this.optionChangeValueFlag = true;
		this.deleteChildGrid = false;
		this.caseloadAdmAlertProfilesColumnDef = [
			{
				fieldName: this.translateService.translate('oimadmis.alerttype') + '*', field: 'alertType', editable: true, width: 150,
				datatype: 'lov', domain: 'ALERT', cellEditable: this.cellEditableOimadmis,
			},
			{
				fieldName: this.translateService.translate('oimadmis.alertcode') + '*', field: 'alertCode', editable: true, width: 150,
				datatype: 'lov', source: 'OUMRCODE', sourceDomain:'ALERT_CODE', cellEditable: this.cellEditableOimadmis, parentField: 'alertType', link: 'oimadmis/rgAlertCodeRecordGroup?alerType='
			},
			{
				fieldName: this.translateService.translate('oimadmis.message') + '*', field: 'messageText', editable: true, width: 150,
				datatype: 'text',maxlength: '250', uppercase: 'false'
			},
		];
		this.caseloadAdmOtherProfilesColumnDef = [
			{
				fieldName: this.translateService.translate('oimadmis.defaulttolocation') + '*', field: 'agyLocId', editable: true, width: 150,
				datatype: 'lov', link: 'oimadmis/rgAgencyLocationsRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad, titles: this.agyLocIdTitles
			},
			{
				fieldName: this.translateService.translate('oimadmis.defaultbedlocation'), field: 'livingUnitDesc', editable: true, width: 150,
				datatype: 'text',
			},
			{
				fieldName: '', field: 'button', datatype: 'launchbutton', link: '/omuavbed', data: 'row',
				modal: true, width: 150, dialogWidth: '90', onLaunchClick: this.omuavbedBtnLaunchClick,
			},
			{ fieldName: '', field: 'youngOffenderAge', hide: true },
			{ fieldName: '', field: 'messNum', hide: true },
			{ fieldName: '', field: 'trustAccountFlag', hide: true },
			{ fieldName: '', field: 'trustAccountBool', hide: true },
			{ fieldName: '', field: 'livingUnitId', hide: true },
			{ fieldName: '', field: 'test', hide: true },
		];
		// TODO all initializations here 
		var serviceObj;
		this.caseloadadmalertprofilesExecuteQuery();
		this.caseloadadmotherprofilesExecuteQuery();
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
	onRowClickcaseloadadmalertprofiles(event) {
	}
	onRowClickcaseloadadmotherprofiles(event) {
		if (event) {
			this.readonlyFlag = false;
			this.rowIndexVal = this.caseloadadmotherprofilesData.indexOf(event);
			this.caseloadadmotherprofilesModel = event;
			if (this.caseloadadmotherprofilesModel.createDatetime){
				this.deleteChildGrid = true;
			} else {
				this.deleteChildGrid = false;
			}
		}
	}

	omuavbedBtnLaunchClick = (event) => {
		const index = this.caseloadadmotherprofilesData.indexOf(event);
		if (event.agyLocId) {
			this.dialogService.openLinkDialog('/omuavbed', event, 90).subscribe(result => {
				if (result) {
					this.grid2.setColumnData('livingUnitDesc', index, result.dspDescription);
					this.grid2.setColumnData('livingUnitId', index, result.livingUnitId);
				}
			});
		} else {
			this.show(this.translateService.translate('oimadmis.defaulttolocationsg'), 'warn');
			return;
		}

	}

	cellEditableOimadmis(data: any, index: number, field: string) {
		if (!data.createDatetime) {
			return true;
		} else {
			return false;
		}
	}
	messageChange(event) {
		if (event && event.code && this.caseloadadmotherprofilesData.length > 0
			&& (this.caseloadadmotherprofilesModel.messNumTemp !== event.code)) {
			this.grid2.setColumnData('messNum', this.rowIndexVal, event.code);
			this.grid2.setColumnData('test', this.rowIndexVal, '');
		}
	}
	youngOffenderAgeChange(age) {
		if (age) {
			this.grid2.setColumnData('youngOffenderAge', this.rowIndexVal, age);
			this.grid2.setColumnData('test', this.rowIndexVal, '');
		}
	}
	trustAccountFlagChange(trustAccount) {
		if (trustAccount === true) {
			this.grid2.setColumnData('trustAccountFlag', this.rowIndexVal, 'Y');
			this.grid2.setColumnData('trustAccountBool', this.rowIndexVal, trustAccount);
			this.grid2.setColumnData('test', this.rowIndexVal, '');
		} else if (trustAccount === false) {
			this.grid2.setColumnData('trustAccountFlag', this.rowIndexVal, 'N');
			this.grid2.setColumnData('trustAccountBool', this.rowIndexVal, trustAccount);
			this.grid2.setColumnData('test', this.rowIndexVal, '');
		}
	}
	/**
	 *  This function will be when inserting new record in fee amount grid
	* fired
	*/
	onGridInsert = () => {
		if (!this.caseloadadmAlert()) {
			return;
		}
		return {};
	}
	caseloadadmAlert = () => {
		const is = { valid: true };
		this.caseloadadmalertprofilesData.forEach(data => {
			if (is.valid) {
				if (!data.alertType || !data.alertType.trim()) {
					this.show(this.translateService.translate('oimadmis.alerttypemustmsg'), 'warn');
					is.valid = false;
					return;
				}
			}
			if (!data.alertCode || !data.alertCode.trim()) {
				this.show(this.translateService.translate('oimadmis.alertcodemustmsg'), 'warn');
				is.valid = false;
				return;
			}
			if (!data.messageText) {
				this.show(this.translateService.translate('oimadmis.messagemustmsg'), 'warn');
				is.valid = false;
				return;
			}
		});
		return is.valid;
	}
	onGridClear = () => {
		this.caseloadadmalertprofilesExecuteQuery();
		return true;
	}
	onGridDelete = () => {
		return true;
	}
	caseloadadmalertprofilesExecuteQuery() {
		this.caseloadadmalertprofilesModel.caseloadId = this.sessionManager.currentCaseLoad;
		const caseloadadmalertprofilesResult = this.oimadmisFactory.caseloadAdmAlertProfilesExecuteQuery(this.caseloadadmalertprofilesModel);
		caseloadadmalertprofilesResult.subscribe(caseloadadmalertprofilesResultList => {
			if (caseloadadmalertprofilesResultList.length === 0) {
				this.caseloadadmalertprofilesData = [];
			} else {
				this.tableIndex = 0;
				this.caseloadadmalertprofilesData = caseloadadmalertprofilesResultList;
				this.caseloadadmalertprofilesData.forEach(element => {
					if (element.messageNumber) {
						element.messNum = String(element.messageNumber);
					}
				});
				this.caseloadadmalertprofilesModel = caseloadadmalertprofilesResultList[0];
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	oimadmisSavecaseloadadmalertprofilesForm(event) {
		if (!this.caseloadadmAlert()) {
			return;
		}
		// TODO declare commit bean and add insert list to that object.
		this.caseloadadmalertprofilesInsertList = event.added;
		this.caseloadadmalertprofilesUpdateList = event.updated;
		this.caseloadadmalertprofilesDeleteList = event.removed;
		this.caseloadadmalertprofilesCommitModel.insertList = [];
		this.caseloadadmalertprofilesCommitModel.updateList = [];
		this.caseloadadmalertprofilesCommitModel.deleteList = [];
		if (this.caseloadadmalertprofilesInsertList.length > 0) {
			this.caseloadadmalertprofilesInsertList.forEach(element => {
				if (element.messNum) {
					element.messageNumber = Number(element.messNum);
				}
				element.caseloadId = this.sessionManager.currentCaseLoad;
				element.applnCode = 'ADM';
			});
			this.caseloadadmalertprofilesCommitModel.insertList = this.caseloadadmalertprofilesInsertList;
		}
		if (this.caseloadadmalertprofilesUpdateList.length > 0) {
			this.caseloadadmalertprofilesUpdateList.forEach(element => {
				if (element.messNum) {
					element.messageNumber = Number(element.messNum);
				}

			});
			this.caseloadadmalertprofilesCommitModel.updateList = this.caseloadadmalertprofilesUpdateList;
		}
		if (this.caseloadadmalertprofilesDeleteList.length > 0) {
			for (let i = 0; i < this.caseloadadmalertprofilesDeleteList.length; i++) {
			}
			this.caseloadadmalertprofilesCommitModel.deleteList = this.caseloadadmalertprofilesDeleteList;
		}
		const caseloadadmalertprofilesSaveData = this.oimadmisFactory.caseloadAdmAlertProfilesCommit(this.caseloadadmalertprofilesCommitModel);
		caseloadadmalertprofilesSaveData.subscribe(data => {
			if (data && String(data) === '1') {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.caseloadadmalertprofilesExecuteQuery();
			} else if (String(data).includes('CSLD_ADMAP_PK')) {
				this.show(this.translateService.translate('oimadmis.rowexistswithsamealerttype'), 'warn');
				return;
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
				this.caseloadadmalertprofilesExecuteQuery();
				return;
			}
		});
	}
	caseloadadmotherprofilesExecuteQuery() {
		this.caseloadadmotherprofilesModel.caseloadId = this.sessionManager.currentCaseLoad;
		const caseloadadmotherprofilesResult = this.oimadmisFactory.caseloadAdmOtherProfilesExecuteQuery(this.caseloadadmotherprofilesModel);
		caseloadadmotherprofilesResult.subscribe(caseloadadmotherprofilesResultList => {
			if (caseloadadmotherprofilesResultList.length === 0) {
				this.caseloadadmotherprofilesData = [];
				this.readonlyFlag = true;
			} else {
				this.readonlyFlag = false;
				this.otherTableIndex = 0;
				this.caseloadadmotherprofilesData = caseloadadmotherprofilesResultList;
				this.caseloadadmotherprofilesData.forEach(element => {
					if (element.messageNumber) {
						element.messNum = String(element.messageNumber);
						element.messNumTemp = String(element.messageNumber);
					}
					if (element.trustAccountFlag === 'Y') {
						element.trustAccountBool = true;
					} else {
						element.trustAccountBool = false;
					}
					element['button'] = '...';
				});
				this.caseloadadmotherprofilesModel = caseloadadmotherprofilesResultList[0];
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	oimadmisSavecaseloadadmotherprofilesForm(event) {
		// TODO declare commit bean and add insert list to that object.
		if (!this.caseloadadmOther()) {
			return;
		}
		this.caseloadadmotherprofilesInsertList = event.added;
		this.caseloadadmotherprofilesUpdatetList = event.updated;
		this.caseloadadmotherprofilesDeleteList = event.removed;
		this.caseloadadmotherprofilesCommitModel.insertList = [];
		this.caseloadadmotherprofilesCommitModel.updateList = [];
		this.caseloadadmotherprofilesCommitModel.deleteList = [];
		if (this.caseloadadmotherprofilesInsertList.length > 0) {
			this.caseloadadmotherprofilesInsertList.forEach(element => {
				if (element.messNum) {
					element.messageNumber = Number(element.messNum);
				}
				if (element.trustAccountBool === true) {
					element.trustAccountFlag = 'Y';
				} else {
					element.trustAccountFlag = 'N';
				}
				element.caseloadId = this.sessionManager.currentCaseLoad;
			});
			this.caseloadadmotherprofilesCommitModel.insertList = this.caseloadadmotherprofilesInsertList;
		}
		if (this.caseloadadmotherprofilesUpdatetList.length > 0) {
			this.caseloadadmotherprofilesUpdatetList.forEach(element => {
				if (element.messNum) {
					element.messageNumber = Number(element.messNum);
				}
				if (!element.livingUnitDesc || element.livingUnitDesc === '') {
					element.livingUnitId = undefined;
				}
				if (element.trustAccountBool === true) {
					element.trustAccountFlag = 'Y';
				} else {
					element.trustAccountFlag = 'N';
				}
			});
			this.caseloadadmotherprofilesCommitModel.updateList = this.caseloadadmotherprofilesUpdatetList;
		}
		if (this.caseloadadmotherprofilesDeleteList.length > 0) {
			this.caseloadadmotherprofilesCommitModel.deleteList = this.caseloadadmotherprofilesDeleteList;
		}
		const caseloadadmotherprofilesSaveData = this.oimadmisFactory.caseloadAdmOtherProfilesCommit(this.caseloadadmotherprofilesCommitModel);
		caseloadadmotherprofilesSaveData.subscribe(data => {
			this.optionChangeValueFlag = false;
			if (data === 1) {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.caseloadadmotherprofilesExecuteQuery();
				return;
			} else if (String(data).includes('CSLD_ADMOP_PK')) {
				this.show(this.translateService.translate('oimadmis.rowexistswithsame'), 'warn');
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
				this.caseloadadmotherprofilesExecuteQuery();
				return;
			}
		});
	}
	onGridInsert2 = () => {
		if (!this.caseloadadmOther()) {
			return;
		}
		this.readonlyFlag = false;
		return {
			button: '...'
		};

	}
	caseloadadmOther = () => {
		const is = { valid: true };
		this.caseloadadmotherprofilesData.forEach(data => {
			if (is.valid) {
				if (!data.agyLocId || !data.agyLocId.trim()) {
					this.show(this.translateService.translate('oimadmis.defaulttolocationmustmsg'), 'warn');
					is.valid = false;
					return;
				}
				if (data.livingUnitDesc && !data.livingUnitId) {
					this.show(this.translateService.translate('oimadmis.invalidbedmsg'), 'warn');
					is.valid = false;
					return;
				}
			}
		});
		return is.valid;
	}
	onGridClear2 = () => {
		this.caseloadadmotherprofilesModel = new CaseloadAdmOtherProfiles();
		this.caseloadadmotherprofilesExecuteQuery();
		return true;
	}
	onGridDelete2 = () => {
		this.readonlyFlag = true;
		this.defaultOtherProfiles = new CaseloadAdmOtherProfiles();
		this.grid2.setColumnData('messNum', this.rowIndexVal, this.defaultOtherProfiles.messNum);
		this.grid2.setColumnData('youngOffenderAge', this.rowIndexVal, this.defaultOtherProfiles.youngOffenderAge);
		this.grid2.setColumnData('trustAccountFlag', this.rowIndexVal, 'N');
		this.grid2.setColumnData('trustAccountBool', this.rowIndexVal, false);
		this.grid2.setColumnData('test', this.rowIndexVal, '');
		this.caseloadadmotherprofilesModel = new CaseloadAdmOtherProfiles();
		return true;
	}
	validateRowData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();

		rowdata.validated = true;
		return rowdata;
	}

	alertValidateRowData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		rowdata.validated = true;
		return rowdata;
	}

}
