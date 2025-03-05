import {
	Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
	ElementRef,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimworkrService } from '../service/oimworkr.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { CourseActivitiesCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseActivitiesCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
	selector: 'app-oimworkr',
	templateUrl: './oimworkr.component.html'
})

export class OimworkrComponent implements OnInit {
	@ViewChild('crsactygrid') crsactygrid: any;
	@ViewChild('crsGrid', { static: true }) crsGrid: any;
	// Variable declaration
	actionName: string;
	lovModel: any[];
	// ctlblkModel = new VAddresses();
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	crsactyData: CourseActivities[] = [];
	crsactyDataTemp: CourseActivities[] = [];
	// TODO angular.copy(this.crsactyData, thiscrsactyDataTemp);
	crsactyModel: CourseActivities = new CourseActivities();
	crsactyModelTemp: CourseActivities = new CourseActivities();
	crsactyIndex: number;
	crsactyInsertList: CourseActivities[] = [];
	crsactyUpdatetList: CourseActivities[] = [];
	crsactyDeleteList: CourseActivities[] = [];
	courseActivitiesCommitBean: CourseActivitiesCommitBean = new CourseActivitiesCommitBean();
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	agyLocId: string;
	disabled: boolean;
	editable: boolean = true;
	crsActyColumnDef: any[];
	ctrlReadOnly: boolean = false;
	crsActyReadOnly: boolean = false;
	butBlkReadOnly: boolean = false;
	rgprojecttypeRg: any[] = [];
	rgproviderRg: any[] = [];
	rgprojectlocationRg: any[] = [];
	rgagencylocationRg: any[] = [];
	lovReadonly: any;
	lovReadonlySuite: any;
	provStateDesc: any;
	dspDescription: any;
	zipPostalCode: any;
	street: any;
	projectSchedule: any;
	targetOffenders: any;
	contacts: any;
	descriptionOfActivity: any;
	cityName: any;
	locationList: any;
	wrkGridDelBtn: Boolean;
	addRowVissblity: Boolean;
	wfworktypesIndex: 0;
	clrBtnFlag: Boolean;
	retBtnflag: boolean;
	launchBtnFlag: Boolean;
	teamMembersTitles = { description: 'Description', code: 'Location ID' };
	teamMembersTitlesOne = { description: 'Full Adress', code: 'Adress Id' };
	teamtitles = { description: this.translateService.translate('common.description'), programCode: this.translateService.translate('Program Code'), code: this.translateService.translate('Program Id') };
	type: string;
	message: string;
	providerPartyIdValue: any;
	billTxnCommentReadOnly: boolean;
	actyDescReadOnly: boolean;
	
	facilityDisable:Boolean;

	constructor(private oimworkrFactory: OimworkrService, public translateService: TranslateService, public sessionManager: UserSessionManager, private dialogService: DialogService) {
		this.crsActyColumnDef = [];
	}
	ngOnInit() {
		this.launchBtnFlag = true;
		
		this.addRowVissblity = false;
		this.actyDescReadOnly = true;
		this.facilityDisable = false;

		this.crsActyColumnDef = [
			{ fieldName: this.translateService.translate('oimworkr.program'), required: true, field: 'programId', editable: true, width: 150, datatype: 'lov', link: 'oimworkr/rgProjectTypeRecordGroup', titles: this.teamtitles, cellEditable: this.commonCellEdit,source:'OCMSERVI' },
			{ fieldName: this.translateService.translate('oimworkr.Code'), required: true, field: 'code', editable: true, width: 150, datatype: 'text', cellEditable: this.commonCellEdit },
			{ fieldName: this.translateService.translate('oimworkr.provider'), required: true, field: 'providerPartyId', editable: true, width: 150, datatype: 'lov', link: 'oimworkr/rgProviderRecordGroup', cellEditable: this.commonCellEdit ,source:'OUMAGENC'},
			{ fieldName: this.translateService.translate('oimworkr.startDate'), required: true, field: 'scheduleStartDate', editable: true, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('oimworkr.endDate'), field: 'scheduleEndDate', editable: true, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('oimworkr.capacity'), required: true, field: 'capacity', strictFP: true, whole: true,maxValue: '999', editable: true, width: 150, datatype: 'number' },
			{ fieldName: this.translateService.translate('oimworkr.active'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },
			{ fieldName: this.translateService.translate('oimworkr.expiryDate'), field: 'expiryDate', editable: true, width: 150, datatype: 'date' },
			{ fieldName: '', field: 'description', hide: true },
			{ fieldName: '', field: 'servicesAddressId', hide: true },
		];
	}

	commonCellEdit = (data: any, index: number, field: string): boolean => {
		if (!data.createDatetime) {
			return true;
		} else {
			return false;
		}
	}

	crsactyExecuteQuery() {
		this.crsactyModel.caseloadId = this.dspDescription;
	
		const crsactyResult = this.oimworkrFactory.crsActyExecuteQuery(this.crsactyModel);
		crsactyResult.subscribe(data => {
			if (!data || data.length === 0) {
				this.crsactyData = [];
				this.type = 'warn';
				this.message = this.translateService.translate('common.querycaused');
				this.show(this.message, this.type);
				this.addRowVissblity = true;
				this.retBtnflag=false;
				this.facilityDisable = false;
				this.crsactyModel = new CourseActivities();
			} else {
				data.forEach(e => {
					e.activeFlag = e.activeFlag === 'Y' ? true : false;
					e.programId = String(e.programId);
					e.providerPartyId = String(e.providerPartyId);
				});
				this.crsactyData = data;
				this.addRowVissblity = true;
				this.facilityDisable = true;
			}
		});
		
	}
	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}

	agylocChangeEvent(event) {
		if (event) {
			this.crsactyDataTemp = event.code;
		} else {
			this.crsactyDataTemp = event.code;
		}
	}

	oimworkDialogClick = (event) => {
		const node = this.crsactygrid.gridOptions.api.getSelectedNodes().length && this.crsactygrid.gridOptions.api.getSelectedNodes()[0];
		const rowIndex = node.rowIndex;
		const data = { placementCorporateId: Number(this.crsactyModelTemp.providerPartyId) }
		this.dialogService.openLinkDialog('/OIMWORKDIALOG', data, 50).subscribe(result => {
			if (result) {
				
				this.crsactygrid.setColumnData('servicesAddressId', rowIndex, Number(result.code));
				this.crsactyModelTemp.streetInformation = result.streetInformation	;
				console.log(this.crsactyModelTemp.streetInformation);
				this.crsactyModelTemp.provStateCode = result.provStateDesc;
				this.crsactyModelTemp.cityName = result.cityName;
				this.crsactyModelTemp.postalCode = result.zipPostalCode	;
			}/*  else {
				this.crsactyModelTemp.streetInformation = undefined;
				this.crsactyModelTemp.provStateCode = undefined;
				this.crsactyModelTemp.cityName = undefined;
				this.crsactyModelTemp.postalCode = undefined;
			} */
		});
	}

	get disableLnchBtn() {
		return true;
	}

	onButTargetOffendersclick = () => {
		this.dialogService.openLinkDialog('/OCMCTOFF', this.crsactyModelTemp, 80).subscribe(result => {
		});
	}
	onSchBtnClick = () => {
		this.dialogService.openLinkDialog('/OCMSOSCH', this.crsactyModelTemp, 80).subscribe(result => {
		});
	}
	onViewChange(event) {
		
	}
	validateWorkTypeData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		if (event.field === 'activeFlag') {
			if (event.data.activeFlag) {
				this.crsactygrid.setColumnData('expiryDate', rowIndex, undefined);
				rowdata.validated = true;
				return rowdata;
			} else if (!event.data.activeFlag) {
				this.crsactygrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
				rowdata.validated = true;
				return rowdata;
			}
		}
		rowdata.validated = true;
		return rowdata;
	}

	isDataSaved(event) {
		const index = this.crsactyData.indexOf(this.crsactyModelTemp);
		this.crsactygrid.setColumnData('description', index, event)
	}

	isDataSavedValue(event) {
		const index = this.crsactyData.indexOf(this.crsactyModelTemp);
		this.crsactygrid.setColumnData('suiteNumber', index, event);
	}



	onGridWorkTypeInsert = (event) => {
		this.actyDescReadOnly = false;
		return {
			'scheduleStartDate': DateFormat.getDate(),
			'activeFlag': true
		}
	}

	onRowClickwfworktypes(event) {
		if (event) {
			this.crsactyModelTemp = event;
			this.launchBtnFlag = false;
			this.retBtnflag=true;
			this.facilityDisable=true;
			
		} else {
			this.crsactyModelTemp = new CourseActivities();
			this.launchBtnFlag = true;	
			this.retBtnflag=true;
			this.facilityDisable=false;
		}
		
		if (event.createDatetime) {
			this.actyDescReadOnly = true;
		} else {
			this.actyDescReadOnly = false;
		}
	}
	onGridWorkClear = () => {

	}

	onRetriveBtn() {
		if ((this.crsactyModel.caseloadId = this.dspDescription) != "" && (this.crsactyModel.caseloadId = this.dspDescription) != undefined ) {
			this.crsactyExecuteQuery();
		} else {
		this.message = this.translateService.translate('Facility Must be Entered');
		this.show(this.message, 'warn');
		this.addRowVissblity = false;
		return;
		}
		this.addRowVissblity = true;
		
	}
	onButClear() {
		this.dspDescription = undefined;
		this.crsactyData = undefined;
		this.addRowVissblity=false;
		this.crsactyModelTemp = new CourseActivities();
		this.launchBtnFlag = true;
		
		this.retBtnflag=false;
		this.facilityDisable=false;
	}
	onClearingGrid = () => {
        this.crsactyExecuteQuery();
    }


	clearDisableFun() {
		if (this.dspDescription || (this.crsactyData && this.crsactyData.length > 0)) {
			return false;
		} else {
			return true;
		}
	}
	onLocationBlur() {
		if (!this.dspDescription) {
			this.dspDescription = this.dspDescription === '' ? undefined : '';
		}
	}


	onRowClickcrsacty(event) {
	}

	allowNumbers(event) {
	}

	ok() {
	}

	no() {
	}

	cancel() {
	}

	onOffenderChange(offender) {
	}


	ocmWorkeSave(event) {
		this.crsactyInsertList = event.added
		this.crsactyUpdatetList = event.updated
		this.crsactyDeleteList = event.removed
		this.courseActivitiesCommitBean.insertList = [];
		this.courseActivitiesCommitBean.updateList = [];
		this.courseActivitiesCommitBean.deleteList = [];
		if (this.crsactyInsertList.length > 0) {
			if (!this.couseActivityValidate(this.crsactyInsertList)) {
				return;
			}
		}
		if (this.crsactyUpdatetList.length > 0) {
			if (!this.couseActivityValidate(this.crsactyUpdatetList)) {
				return;
			}
		}
		if (this.crsactyInsertList.length > 0 || this.crsactyUpdatetList.length > 0 || this.crsactyDeleteList.length > 0) {
			for (let i = 0; i < this.crsactyInsertList.length; i++) {
				this.crsactyInsertList[i].courseActivityType = 'WR';
				this.crsactyInsertList[i].caseloadId = this.dspDescription;
				this.crsactyInsertList[i].agyLocId = this.sessionManager.currentCaseLoad;
				this.crsactyInsertList[i].providerPartyClass = 'CORP';
				if (this.crsactyInsertList[i].activeFlag) {
					this.crsactyInsertList[i].activeFlag = 'Y';
				} else {
					this.crsactyInsertList[i].activeFlag = 'N';
				}
				this.crsactyInsertList[i].caseloadType = this.sessionManager.currentCaseLoadType;
				this.courseActivitiesCommitBean.insertList = this.crsactyInsertList;
			}
			for (let i = 0; i < this.crsactyUpdatetList.length; i++) {
				this.crsactyUpdatetList[i].courseActivityType = 'WR';
				this.crsactyUpdatetList[i].caseloadId = this.dspDescription;
				this.crsactyUpdatetList[i].providerPartyClass = 'CORP';
				this.crsactyUpdatetList[i].caseloadType = this.sessionManager.currentCaseLoadType;
				this.crsactyUpdatetList[i].agyLocId = this.sessionManager.currentCaseLoad;
				if (this.crsactyUpdatetList[i].activeFlag) {
					this.crsactyUpdatetList[i].activeFlag = 'Y';
				} else {
					this.crsactyUpdatetList[i].activeFlag = 'N';
				}
				this.courseActivitiesCommitBean.updateList = this.crsactyUpdatetList;
			}
			for (let i = 0; i < this.crsactyDeleteList.length; i++) {
				this.courseActivitiesCommitBean.deleteList = this.crsactyDeleteList;
			}
		}
		this.oimworkrFactory.crsActyCommit(this.courseActivitiesCommitBean).subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show(this.message, this.type);
				this.crsactyExecuteQuery();
			} else if (data === 3) {
				this.type = 'warn';
				this.message = this.translateService.translate('oimworkr.deletenotpermittedaschildrecordsexist');
				this.show(this.message, this.type);
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show(this.message, this.type);
			}
		});
	}



	couseActivityValidate(validateList: any) {
		const is = { valid: true }
		if (this.crsactyData.length > 0 && validateList.length > 0) {
			for (let i = 0; i < this.crsactyData.length - 1; i++) {
				for (let j = i + 1; j < this.crsactyData.length; j++) {
					if (this.crsactyData[i].code.trim() === this.crsactyData[j].code.trim()) {
						this.type = 'warn';
						this.message = this.translateService.translate('oimworkr.codeisalreadyinusepleaseenteruniquecode');
						this.show(this.message, this.type);
						is.valid = false;
						return is.valid;
					}
				}
			}
		}

		for (let i = 0; i < validateList.length; i++) {
			if (validateList[i] && validateList[i].scheduleStartDate && validateList[i].scheduleEndDate) {
				if (DateFormat.compareDate(DateFormat.getDate(validateList[i].scheduleStartDate), DateFormat.getDate(validateList[i].scheduleEndDate)) === 1) {
					this.message = this.translateService.translate('oimworkr.enddateshouldbeequalorgreaterthanstartdate');
					this.show(this.message, 'warn');
					is.valid = false;
					return is.valid;
				}
			}

			if (!validateList[i].programId) {
				this.message = this.translateService.translate('oimworkr.programmustbeentered');
				this.show(this.message, 'warn');
				is.valid = false;
				return is.valid;
			}

			if (!validateList[i].code) {
				this.message = this.translateService.translate('oimworkr.codemustbeentered');
				this.show(this.message, 'warn');
				is.valid = false;
				return is.valid;
			}

			if (!validateList[i].scheduleStartDate) {
				this.message = this.translateService.translate('oimworkr.startdatemustbeentered');
				this.show(this.message, 'warn');
				is.valid = false;
				return is.valid;
			}

			if (!validateList[i].capacity) {
				this.message = this.translateService.translate('oimworkr.capacitymustbeentered');
				this.show(this.message, 'warn');
				is.valid = false;
				return is.valid;
			}

			if (!validateList[i].providerPartyId) {
				this.message = this.translateService.translate('oimworkr.providermust beentered');
				this.show(this.message, 'warn');
				is.valid = false;
				return is.valid;
			}
			if (!validateList[i].description) {
				this.message = this.translateService.translate('oimworkr.descriptionmustbeentered');
				this.show(this.message, 'warn');
				is.valid = false;
				return is.valid;
			}
		}
		return is.valid;
	}
	getSchedule = () => {
		this.dialogService.openLinkDialog('/OCUMPVAV', this.crsactyModelTemp, 80).subscribe(result => {
			if (result) {
			}
		});
	}

	getContacts = () => {
		this.crsactyModelTemp.pQueryOnly = 'N';
		this.dialogService.openLinkDialog('/OCMSSVCT', this.crsactyModelTemp, 80).subscribe(result => {
			if (result) {
			}
		});
	}

}