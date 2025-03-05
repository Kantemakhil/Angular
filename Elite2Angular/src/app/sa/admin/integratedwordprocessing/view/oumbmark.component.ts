import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumbmarkService } from '../service/oumbmark.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { IwpBookmarks } from '../beans/IwpBookmarks';
import { IwpBookmarkParameters } from '../beans/IwpBookmarkParameters';
import { IwpBookmarksCommitBean } from '../beans/IwpBookmarksCommitBean';
import { IwpCompositeOutParameter } from '../beans/IwpCompositeOutParameter';
import { IwpCompositeBookmarksCommitBean } from '../beans/IwpCompositeBookmarksCommitBean';
import { IwpBookmarkParametersCommitBean } from '../beans/IwpBookmarkParametersCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

@Component({
	selector: 'app-oumbmark',
	templateUrl: './oumbmark.component.html'
})

export class OumbmarkComponent implements OnInit {
	actionName: string;
	@ViewChild('grid') grid: any;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	aiwpbookmarksData: IwpBookmarks[] = [];
	aiwpbookmarksDataTemp: IwpBookmarks[] = [];
	aiwpbookmarksModel: IwpBookmarks = new IwpBookmarks();
	aiwpbookmarksearchModel: IwpBookmarks = new IwpBookmarks();
	aiwpbookmarksIndex: Number = 0;
	aiwpbookmarksInsertList: IwpBookmarks[] = [];
	aiwpbookmarksUpdatetList: IwpBookmarks[] = [];
	aiwpbookmarksDeleteList: IwpBookmarks[] = [];
	aiwpparametersData: IwpBookmarkParameters[] = [];
	aiwpparametersDataTemp: IwpBookmarkParameters[] = [];
	aiwpparametersModel: IwpBookmarkParameters = new IwpBookmarkParameters();
	aiwpparametersIndex: Number = 0;
	aiwpparametersInsertList: IwpBookmarkParameters[] = [];
	aiwpparametersUpdatetList: IwpBookmarkParameters[] = [];
	aiwpparametersDeleteList: IwpBookmarkParameters[] = [];
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	aIwpBookmarksColumnDef: any[];
	aIwpParametersColumnDef: any[];
	offTxnColumnDef: any[];
	offTxnReadOnly: boolean = false;
	sysPflReadOnly: boolean = false;
	statReadOnly: boolean = false;
	ofnReadOnly: boolean = false;
	alwOtReadOnly: boolean = false;
	offIndReadOnly: boolean = false;
	agyBlkReadOnly: boolean = false;
	aIwpBookmarksReadOnly: boolean = false;
	aIwpParametersReadOnly: boolean = false;
	rgbmtypeRg: any[];
	rgparamdatatypeRg: any[] = [];
	rgparamtypeRg: any[] = [];
	aiwpbookmarksCommitModel: IwpBookmarksCommitBean = new IwpBookmarksCommitBean();
	aiwpparametersCommitModel: IwpBookmarkParametersCommitBean = new IwpBookmarkParametersCommitBean();
	selectedRowIndex = -1;
	optTile: any;
	paramtypeTitles: any;
	datatypeTitles: any;
	statusOption: any[] = [];
	statusTypeOption: any[] = [];
	statusDatatypeOption: any[] = [];
	tableIndex = -1;
	parameterInsert: boolean;
	selFlag: string;
	enableInsert: boolean;
	enableUpdate: boolean;
	verifiedReadonly: boolean;
	verifiedDisabled: boolean;
	clearDisable: boolean;
	retriveDisable: boolean;
	bookmarkName: any;
	description: any;
	bookmarkType: any;
	activeFlag: any;
	expiryDate: any;
	namesReadOnly: boolean;
	verifyBtnDisabled: boolean;
	ckeckboxReadOnly: boolean;
	activeFlagLovTitles = {
		description: this.translateService.translate('common.description'),
		code: this.translateService.translate('common.code')
	};
	moduleLoveTitles = {
		description: this.translateService.translate('common.description'),
		moduleName: this.translateService.translate('common.module')
	};
	fieldLovTitles = {
		description: this.translateService.translate('common.description')
	};
	options: { code: string; description: string; }[];
	username: any;
	textReadonly: boolean;
	enableAiwpparamInsert: boolean;
	iwpOutParametersData: any;
	iwpOutParametersColumnDef = [];
	outParamIndex = 0;
	copositeOutParamUpdatetList: IwpCompositeOutParameter[] = [];
	copositeOutParamCommitModel: IwpCompositeBookmarksCommitBean = new IwpCompositeBookmarksCommitBean();
	constructor(private oumbmarkFactory: OumbmarkService, public translateService: TranslateService,
		public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService) {
		this.aIwpBookmarksColumnDef = [];
		this.aIwpParametersColumnDef = [];
		this.offTxnColumnDef = [];

	}
	ngOnInit() {
		this.parameterInsert = false;
		// this.enableUpdate = false;
		this.retriveDisable = true;
		this.clearDisable = true;
		this.namesReadOnly = false;
		this.options = [
			{ code: 'TEXT', description: 'Textual data', },
			{ code: 'BINARY', description: 'Binary data', },
		];
		this.oumbmarkexecuteQuery();
		this.verifiedReadonly = false;
		this.enableAiwpparamInsert = false;
		this.aIwpBookmarksColumnDef = [
			{
				fieldName: this.translateService.translate('oumbmark.namemandatory'), field: 'bookmarkName', editable: true, width: 150,
				maxlength: '12', datatype: 'text', uppercase: 'true', cellEditable: this.canCellEdit
			},
			{
				fieldName: this.translateService.translate('common.descriptionMandatory'), field: 'description', editable: true,
				width: 150, maxlength: '256', datatype: 'text', uppercase: 'false'

			},
			{
				fieldName: this.translateService.translate('oumbmark.type'), field: 'bookmarkType', editable: true, width: 150,
				datatype: 'lov', link: 'oumbmark/rgBmTypeRecordGroup',

			},
			{
				fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
				datatype: 'checkbox'
			},
			{
				fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150,
				datatype: 'date'
			},
			{
				fieldName: this.translateService.translate('oumbmark.username'), field: 'sealFlag', editable: false, width: 150,
				maxlength: '72'
			},
			{ fieldName: '', field: 'commentText', hide: true }
		];
		this.aIwpParametersColumnDef = [
			{
				fieldName: this.translateService.translate('common.name') +
					this.translateService.translate('common.mandatory'), field: 'parameterName', editable: false, width: 150,
				cellEditable: this.canCellEdit, datatype: 'text', uppercase: 'true', maxlength : '50'
			},
			{
				fieldName: this.translateService.translate('common.descriptionMandatory'), field: 'description',
				editable: true, width: 150, datatype: 'text', uppercase: 'false',
				maxlength: '256'
			},
			{
				fieldName: this.translateService.translate('oumbmark.type'), field: 'parameterType', editable: true, width: 150,
				datatype: 'lov', link: 'oumbmark/rgParamTypeRecordGroup'
			},
			{
				fieldName: this.translateService.translate('oumbmark.datatype'), field: 'parameterDataType',
				editable: true, width: 150,
				datatype: 'lov', link: 'oumbmark/rgParamDataTypeRecordGroup'
			},

			{
				fieldName: this.translateService.translate('oumbmark.moduleblock'), field: 'moduleBlockCode',
				editable: true, width: 150,
				datatype: 'lov', link: 'cmdwork/rgModuleTriggersRecordGroup',titles: this.moduleLoveTitles
			},
			{
				fieldName: this.translateService.translate('oumbmark.field'), field: 'field',
				editable: true, width: 150,titles: this.fieldLovTitles,
				datatype: 'lov', link: 'cmdwork/getModuleTriggerData?triggerId=', parentField: 'moduleBlockCode'
			},
		];
		this.iwpOutParametersColumnDef = [
			{
				fieldName: this.translateService.translate('oumbmark.outparamname'), field: 'parameterName', editable: false, width: 150,
				datatype: 'text', uppercase: 'true', maxlength : '50'
			},
			{
				fieldName: this.translateService.translate('oumbmark.outparamDesc'), field: 'parameterDesc', editable: true, width: 150, 
				datatype: 'text', uppercase: 'false', maxlength: '256'
			}
		]



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
	canCellEdit = (data: any, index: number, field: string) => {
		if (data.createDatetime) {
			return false;
		}
		return true;
	}
	isInsertableOne() {
		if (this.bookmarkName || this.description || this.bookmarkType || this.aiwpbookmarksearchModel.activeFlag || this.username) {
			this.clearDisable = false;
		} else {
			this.clearDisable = true;
		}
	}
	onRowClickaiwpbookmarks(event) {
		if (event) {
			this.aiwpbookmarksModel = event;
			if (this.aiwpbookmarksModel && this.aiwpbookmarksModel.bookmarkName && this.aiwpbookmarksModel.bookmarkName !== undefined) {
				this.aiwpparametersModel.bookmarkName = this.aiwpbookmarksModel.bookmarkName;
				this.aiwpparametersExecuteQuery();
			} else {
				this.aiwpparametersData = [];
				this.aiwpparametersModel = new IwpBookmarkParameters();
				this.enableAiwpparamInsert = false;

			}
		}
	}
	onCheckBoxChange(event) {
		if (event && event.checked) {
			this.verifyBtnDisabled = true;
		} else {
			this.verifyBtnDisabled = false;
		}
	}
	onButVerifyclick() {
		const aiwpbookmarksSaveData = this.oumbmarkFactory.oumbmarkIwpBookmarksSqlText(this.aiwpbookmarksModel);
		aiwpbookmarksSaveData.subscribe(data => {
			if (data.length > 0) {

			}
		});
	}


	clearQuery() {
		this.aiwpbookmarksData = [];
		this.aiwpbookmarksearchModel = new IwpBookmarks();
		this.aiwpparametersData = [];
		this.aiwpparametersModel = new IwpBookmarkParameters();
		this.bookmarkName = undefined;
		this.bookmarkType = undefined;
		this.description = undefined;
		this.activeFlag = undefined;
		this.username = undefined;
		this.aiwpbookmarksModel.sqlText = undefined;
		this.clearDisable = true;
		this.retriveDisable = false;
		this.namesReadOnly = false;
		this.ckeckboxReadOnly = false;
		this.enableAiwpparamInsert = false;
		this.textReadonly = true;

	}
	onGridInsert = () => {
		// this.textReadonly = false;
		if (!this.bookmarksValidations()) {
			return false;
		}
		
		return { activeFlag: true, sealFlag: this.selFlag };
	}

	onGridInsertOne = () => {
		if (!this.bookmarkParametersValidations()) {
			return false;
		}
		return {};
	}
	onRelationshipBlur() {
		if (!this.bookmarkType) {
			this.bookmarkType = this.bookmarkType === '' ? undefined : '';
		}
	}

	validateRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		const rowIndex = event.rowIndex;
		if (event.field === 'activeFlag') {
			if (event.data.activeFlag) {
				this.grid.setColumnData('expiryDate', rowIndex, undefined);
				rowdata.validated = true;
				return rowdata;
			} else if (!event.data.activeFlag) {
				this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
				rowdata.validated = true;
				return rowdata;
			}
		}
		rowdata.validated = true;
		return rowdata;
	}
	onGridClear = () => {
		this.oumbmarkexecuteQuery();
		return true;
	}


	bookmarksValidations() {
		const is = { valid: true };
		this.aiwpbookmarksData.forEach(data => {
			if (is.valid) {
				if (!data.bookmarkName) {
					this.show('common.namemustbeentered');
					is.valid = false;
					return;
				}
				if (!data.description) {
					this.show('common.descriptionmustbeentered');
					is.valid = false;
					return;
				}
				if (!data.bookmarkType) {
					this.show('common.typemustbeentered');
					is.valid = false;
					return;
				}
				if (this.aiwpbookmarksData.length > 0) {
					this.aiwpbookmarksData.forEach(element => {
						const bookmark = element && element.bookmarkName ? element.bookmarkName : ""
						if (!/^[a-zA-Z]*$/.test(bookmark.charAt(0))) {
							this.show('oumbmark.Bookmarkmuststartwithlettercharacter');
							is.valid = false;
							return;
						}
					});
				}
				for (let i = 0; i < this.aiwpbookmarksData.length; i++) {
					for (let j = 0; j < this.aiwpbookmarksData.length; j++) {
						if (i !== j && (this.aiwpbookmarksData[i].bookmarkName === this.aiwpbookmarksData[j].bookmarkName)) {
							this.show('Bookmark Name ' + this.aiwpbookmarksData[i].bookmarkName + ' already exists.');
							is.valid = false;
							return;
						}
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
	oumbmarkSaveaiwpbookmarksForm(event) {
		if (!this.bookmarksValidations()) {
			return;
		}

		if (!this.aiwpbookmarksModel.sqlText) {
			this.show('oumbmark.bookmarksqltextmustbeentered');
			return;

		}
		this.aiwpbookmarksInsertList = event.added;
		this.aiwpbookmarksUpdatetList = event.updated;
		this.aiwpbookmarksDeleteList = event.removed;
		this.aiwpbookmarksCommitModel.insertList = [];
		this.aiwpbookmarksCommitModel.updateList = [];
		this.aiwpbookmarksCommitModel.deleteList = [];
		if (this.aiwpbookmarksInsertList.length > 0) {
			for (let i = 0; i < this.aiwpbookmarksInsertList.length; i++) {
				this.aiwpbookmarksInsertList[i].userCreated = this.sessionManager.getId();
				this.aiwpbookmarksInsertList[i].activeFlag = this.aiwpbookmarksInsertList[i].activeFlag ? 'Y' : 'N';
				this.aiwpbookmarksInsertList[i].sqlVerifiedFlag = this.aiwpbookmarksInsertList[i].sqlVerifiedFlag ? 'Y' : 'N';
				this.aiwpbookmarksInsertList[i].createDatetime = DateFormat.getDate();
				this.aiwpbookmarksInsertList[i].dateCreated = DateFormat.getDate();
				this.aiwpbookmarksInsertList[i].sqlText = this.aiwpbookmarksModel.sqlText;
				this.aiwpbookmarksCommitModel.insertList = this.aiwpbookmarksInsertList;
			}
		}
		if (this.aiwpbookmarksUpdatetList.length > 0) {
			for (let i = 0; i < this.aiwpbookmarksUpdatetList.length; i++) {
				this.aiwpbookmarksUpdatetList[i].activeFlag = this.aiwpbookmarksUpdatetList[i].activeFlag ? 'Y' : 'N';
				this.aiwpbookmarksUpdatetList[i].sqlVerifiedFlag = this.aiwpbookmarksUpdatetList[i].sqlVerifiedFlag ? 'Y' : 'N';
				this.aiwpbookmarksCommitModel.updateList = this.aiwpbookmarksUpdatetList;
			}
		}
		if (this.aiwpbookmarksDeleteList.length > 0) {
			for (let i = 0; i < this.aiwpbookmarksDeleteList.length; i++) {
			}
			this.aiwpbookmarksCommitModel.deleteList = this.aiwpbookmarksDeleteList;
		}
		const aiwpbookmarksSaveData = this.oumbmarkFactory.aIwpBookmarksCommit(this.aiwpbookmarksCommitModel);
		aiwpbookmarksSaveData.subscribe(data => {
			if (data === 3) {
				this.show('Bookmark Name ' + this.aiwpbookmarksModel.bookmarkName + ' already exists.');
				this.oumbmarkexecuteQuery();
				return;
			}
			if (data === 1) {
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.oumbmarkexecuteQuery();
				return;
			} else {
				this.show('common.addupdateremoverecordfailed');
				this.oumbmarkexecuteQuery();
				return;
			}
		});
	}
	oumbmarkexecuteQuery() {
		if (this.bookmarkName) {
			this.aiwpbookmarksearchModel.bookmarkName = this.bookmarkName;
		}
		if (this.description) {
			this.aiwpbookmarksearchModel.description = this.description;
		}
		if (this.bookmarkType) {
			this.aiwpbookmarksearchModel.bookmarkType = this.bookmarkType;
		}
		if (this.username) {
			this.aiwpbookmarksModel.sealFlag = this.username;
		}
		const serviceObj = this.oumbmarkFactory.aIwpBookmarksExecuteQuery(this.aiwpbookmarksearchModel);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.aiwpbookmarksData = [];
				this.show('common.querycaused');
				return;
			} else {
				data.forEach(element => {
					element.activeFlag = element.activeFlag === 'Y' ? true : false;
					element.sqlVerifiedFlag = element.sqlVerifiedFlag === 'Y' ? true : false;
				});
				this.aiwpbookmarksData = data;
				this.aiwpbookmarksData.sort(this.offenderSearchService.compare);
				this.aiwpbookmarksModel = this.aiwpbookmarksData[0];
				this.tableIndex = 0;
				this.selFlag = this.aiwpbookmarksData[0].sealFlag;
				this.retriveDisable = true;
				this.clearDisable = false;
				this.namesReadOnly = true;
				this.ckeckboxReadOnly = true;
				this.enableAiwpparamInsert = true;

			}
		});
	}

	aiwpparametersExecuteQuery() {
		const aiwpparametersResult = this.oumbmarkFactory.aIwpParametersExecuteQuery(this.aiwpparametersModel);
		aiwpparametersResult.subscribe(aiwpparametersResultList => {
			if (aiwpparametersResultList.length === 0) {
				this.aiwpparametersData = [];
				this.iwpOutParametersData = [];
			} else {
				this.aiwpparametersData = aiwpparametersResultList;
				this.aiwpparametersData.sort(this.offenderSearchService.compare);
				this.aiwpparametersModel = aiwpparametersResultList[0];
				this.tableIndex = 0;
				if (this.aiwpbookmarksModel && this.aiwpbookmarksModel.bookmarkType == 'COMP') {
					this.oumbmarkFactory.getOutParamLov(this.aiwpbookmarksModel).subscribe(data => {
						if (data && data.length && !data[0].error) {
							this.iwpOutParametersData = data;
							//this.iwpOutParametersData.sort(this.offenderSearchService.compare);
							this.outParamIndex = 0;
						} else if(data && data.length && data[0].error) {
							this.iwpOutParametersData = [];
							this.show(data[0].error,'warn');
						} else if(!data || !data?.length) {
							this.show('No OutPut Params found','warn');
						}
					});
				} else {
					this.iwpOutParametersData = [];
				}
			}
		});
	}

	bookmarkParametersValidations() {
		const is = { valid: true };
		this.aiwpparametersData.forEach(data => {
			if (is.valid) {
				if (!data.parameterName) {
					this.show('common.namemustbeentered');
					is.valid = false;
					return;
				}
				if (!data.description) {
					this.show('common.descriptionmustbeentered');
					is.valid = false;
					return;
				}
				if (!data.parameterType) {
					this.show('common.typemustbeentered');
					is.valid = false;
					return;
				}
				if (!data.parameterDataType) {
					this.show('oumbmark.datatypemustbeentered');
					is.valid = false;
					return;
				}
				for (let i = 0; i < this.aiwpparametersData.length; i++) {
					for (let j = 0; j < this.aiwpparametersData.length; j++) {
						if (i !== j && (this.aiwpparametersData[i].parameterName === this.aiwpparametersData[j].parameterName)) {
							this.show('Parameter Name ' + this.aiwpparametersData[i].parameterName + ' already exists.');
							is.valid = false;
							return;
						}
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

	oumbmarkSaveaiwpparametersForm(event) {
		if (!this.bookmarkParametersValidations()) {
			return;
		}
		this.aiwpparametersInsertList = event.added;
		this.aiwpparametersUpdatetList = event.updated;
		this.aiwpparametersDeleteList = event.removed;
		this.aiwpparametersCommitModel.insertList = [];
		this.aiwpparametersCommitModel.updateList = [];
		this.aiwpparametersCommitModel.deleteList = [];
		if (this.aiwpparametersInsertList.length > 0 || this.aiwpparametersUpdatetList.length > 0) {
			for (let i = 0; i < this.aiwpparametersInsertList.length; i++) {
				this.aiwpparametersInsertList[i].bookmarkName = this.aiwpbookmarksModel.bookmarkName;
				this.aiwpparametersInsertList[i].createUserId = this.sessionManager.getId();
				this.aiwpparametersCommitModel.insertList = this.aiwpparametersInsertList;
			}
			for (let i = 0; i < this.aiwpparametersUpdatetList.length; i++) {
				this.aiwpparametersUpdatetList[i].createUserId = this.sessionManager.getId();
			}
			this.aiwpparametersCommitModel.updateList = this.aiwpparametersUpdatetList;
		}
		if (this.aiwpparametersDeleteList.length > 0) {
			for (let i = 0; i < this.aiwpparametersDeleteList.length; i++) {
			}
			this.aiwpparametersCommitModel.deleteList = this.aiwpparametersDeleteList;
		}
		const aiwpparametersSaveData = this.oumbmarkFactory.aIwpParametersCommit(this.aiwpparametersCommitModel);
		aiwpparametersSaveData.subscribe(data => {
			if (data === 3) {
				this.show('Parameter Name ' + this.aiwpparametersModel.parameterName + ' already exists.');
				this.aiwpparametersExecuteQuery();
				return;
			}
			if (data === 1) {
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.aiwpparametersExecuteQuery();
				return;
			} else {
				this.show('common.addupdateremoverecordfailed');
				this.aiwpparametersExecuteQuery();
				return;
			}
		});
	}

	isInsertable(event) {
		let rowIndex = -1;
		this.grid.gridApi.forEachNodeAfterFilterAndSort((rowNode, index) => {
			if (this.aiwpbookmarksModel.bookmarkName == rowNode.data['bookmarkName']) {
				rowIndex = index;
			}
		});
		if (rowIndex !== -1) {
			this.grid.setColumnData('commentText', rowIndex, event);
		}
	}
	
	
	oumbmarkOutParamSave(event){
		this.copositeOutParamCommitModel.updateList =[];
		if (event.updated.length > 0) {
			for (let i = 0; i < event.updated.length; i++) {
				let outparameters: IwpCompositeOutParameter = new IwpCompositeOutParameter();
				outparameters.bookmarkName= this.aiwpbookmarksModel.bookmarkName;
				outparameters.parameterName = event.updated[i].parameterName;
				outparameters.parameterDesc = event.updated[i].parameterDesc;
				this.copositeOutParamUpdatetList.push(outparameters);
			}
			this.copositeOutParamCommitModel.updateList = this.copositeOutParamUpdatetList;
			const outparametersSaveData = this.oumbmarkFactory.iwpOutparametersUpdate(this.copositeOutParamCommitModel);
			outparametersSaveData.subscribe(data => {
				if (data === 1) {
					this.show('common.addupdateremoverecordsuccess', 'success');
					this.aiwpparametersExecuteQuery();
					return;
				}	
			});			
		}	
	}

}