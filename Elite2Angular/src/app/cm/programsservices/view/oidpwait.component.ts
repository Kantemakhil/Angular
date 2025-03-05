import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidpwaitService } from '../service/oidpwait.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderPrgObligations } from '@cm/programsservices/beans/VOffenderPrgObligations';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { Router } from '@angular/router';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { VOffenderPrgObligationsCommitBean } from '@cm/programsservices/beans/VOffenderPrgObligationsCommitBean';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { InjectOffenderService } from '@core/service/inject-offender.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OciscataService } from '@inst/institutional-activities/service/ociscata.service';
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { Offenders } from '@common/beans/Offenders';

@Component({
	selector: 'app-oidpwait',
	templateUrl: './oidpwait.component.html'
})

export class OidpwaitComponent implements OnInit {
	regionFlag: boolean;
	@ViewChild('grid') grid: any;
	teamId: number;
	availabilityCodeTemp: any;
	nbtTeam: any;
	nbtAgyLocId: any;
	availChangeFlag: boolean;
	saveChangeFlag: boolean;
	vOffPrgObId: number;
	programId: any;
	updateButtonFlag: boolean;
	availabilityROnly: boolean;
	serviceReadOnly: boolean;
	teamROnly: boolean;
	agyLocIdROnly: boolean;
	exitFlag: boolean;
	nbtActivityCode: string;
	searchDisabled: boolean;
	clearDis: boolean;
	btnOffProDis: boolean;
	btnAssDis: boolean;
	btnUpdateDis: boolean;
	offBookId: number;
	teamInputs: string;
	areaCodeOld: string;
	regionCodeOld: string;
	areaCode: string;
	facilityInputs: string;
	regionCode: any;
	areaInputs: string;
	tableIndex: number;
	nbtActivityDescLink: string;
	nbtRegionLink: string;
	nbtAreaLink: string;
	nbtAgyLocDescLink: string;
	nbtTeamLink: string;
	availabilityCodeLink: string;
	type: any;
	message: any;
	msglist: any[];
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	vOffPrgOblModelTemp: VOffenderPrgObligations[] = [];
	vOffPrgOblData: VOffenderPrgObligations[] = [];
	vOffPrgOblDataTemp: VOffenderPrgObligations[] = [];
	vOffPrgOblDataTempTemp : VOffenderPrgObligations []=[];
	vOffPrgOblModel: VOffenderPrgObligations = new VOffenderPrgObligations();
	vOffPrgOblIndex: number = 0;
	vOffPrgOblUpdatetList: VOffenderPrgObligations[] = [];
	vOffPrgOblCommitModel: VOffenderPrgObligationsCommitBean = new VOffenderPrgObligationsCommitBean();
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	vOffPrgOblColumnDef: any[];
	srchCtrlReadOnly: boolean = false;
	vOffPrgOblReadOnly: boolean = false;
	butCtrlReadOnly: boolean = false;
	rgprogramservicesRg: any[] = [];
	rgpsprgavailRg: any[] = [];
	rgareasRg: any[] = [];
	rgregionRg: any[] = [];
	rgagylocsRg: any[] = [];
	rgrestrictteamsRg: any[] = [];
	rgallteamsRg: any[] = [];
	vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
	sharingData: VOffenderPrgObligations = new VOffenderPrgObligations();
	nonAssOffenderList: CourseActivities = new CourseActivities();
	 strData :String ="";
	areaReadOnly: boolean;
	detailsDataTempUpdatedList: VOffenderPrgObligations[] = [];
	count : any =0;
	offendersList :Offenders[]=[];

	constructor(private oidpwaitFactory: OidpwaitService, public translateService: TranslateService,
		public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService, private router: Router, public dialogService: DialogService,
		private injectOffenderService: InjectOffenderService, private osiosearService: OsiosearService, private ociscataFactory: OciscataService) {
		this.vOffPrgOblColumnDef = [];
		this.oidpwaitFactory.vOffPrgOblModelService = undefined;
	}
	ngOnInit() {
		this.vOffPrgOblColumnDef = [
			{ fieldName: this.translateService.translate('oidpwait.bulkassign'), field: 'nbtBulkAssign', editable: true, datatype: 'checkbox', },

			{ fieldName: this.translateService.translate('common.name'), field: 'offenderName', editable: false, },

			{ fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, },

			{ fieldName: this.translateService.translate('oidpwait.specificneeds'), field: 'specialNeedFlag', editable: true, datatype: 'checkbox', },

			{ fieldName: this.translateService.translate('common.age'), field: 'age', editable: false, },

			{ fieldName: this.translateService.translate('common.gender'), field: 'sexDesc', editable: false, },

			{ fieldName: this.translateService.translate('oidpwait.risk'), field: 'riskCode', editable: false, },

			{ fieldName: this.translateService.translate('oidpwait.ethnicity'), field: 'raceDesc', editable: false, },

			{ fieldName: this.translateService.translate('oidpwait.referraldate'), field: 'referralDate', editable: false, datatype: 'date', },

			{ fieldName: this.translateService.translate('oidpwait.waitdays'), field: 'waitDays', editable: false, },

			{ fieldName: this.translateService.translate('common.status'), field: 'status', editable: false, },

			{ fieldName: this.translateService.translate('oidpwait.releaseorlegalend'), field: 'legalEndDateTemp', editable: false, datatype: 'custom',rendererSelector: (rowIndex, field, data)=> {return data=data.legalEndDateTemp && data.legalEndDateTemp == 'Indefinite' ?'text':'date' } },
			{ fieldName: '', field: 'availabilityCode', hide: true },
			{ fieldName: '', field: 'test', hide: true },
		];
		this.oidpwaitFactory.exitFlag = false;
		var serviceObj;
		this.availChangeFlag = false;
		this.saveChangeFlag = false;
		this.availabilityROnly = true;
		this.serviceReadOnly = false;
		this.btnOffProDis = true;
		this.btnAssDis = true;
		this.btnUpdateDis = true;
		this.searchDisabled = false;
		this.clearDis = true;
		this.areaReadOnly = true;
		this.whenNewFormInstance();

		this.vOffPrgOblModel.caseLoadType = this.sessionManager.currentCaseLoadType;
		this.areaInputs = this.sessionManager.currentCaseLoadType + ',' + '';
		this.facilityInputs = this.sessionManager.currentCaseLoadType + ',' + '' + '';

		this.nbtActivityDescLink = 'oidpwait/rgProgramServicesRecordGroup';
		this.nbtRegionLink = 'oidpwait/rgRegionRecordGroup';
		this.nbtAreaLink = 'oidpwait/rgAreasRecordGroup?areaInputs=' + this.areaInputs;
		this.availabilityCodeLink = 'oidpwait/rgPsPrgAvailRecordGroup';

		if (this.sessionManager.currentCaseLoadType === 'INST') {
			this.agyLocIdROnly = false;
			this.teamROnly = true;
			this.nbtAgyLocDescLink = 'oidpwait/rgAgyLocsRecordGroup?facilityInputs=' + this.facilityInputs;
		} else {
			this.agyLocIdROnly = true;
			this.teamROnly = false;
			this.nbtTeamLink = 'oidpwait/rgAllTeamsRecordGroup';
		}

		setTimeout(() => {
			if (this.oidpwaitFactory.fromOcdprog) {
				this.oidpwaitFactory.fromOcdprog = false;
				this.sharingData = this.oidpwaitFactory.oidpwaitScreenObj;
				this.nbtActivityCode = this.sharingData.activityCode;
				this.vOffPrgOblModel.nbtRegion = this.sharingData.nbtRegion;
				setTimeout(() => {
					this.vOffPrgOblModel.nbtArea = this.sharingData.nbtArea;
					this.vOffPrgOblModel.nbtAgyLocId = this.sharingData.nbtAgyLocId;
					this.nbtTeam = this.sharingData.nbtTeam;
					this.programId = this.sharingData.programId;
				}, 500
				);
				setTimeout(() => {
					this.search();
				}, 1000
				);
			}
		}, 1500
		);
	}

	custom = (rowIndex, field, data) => {
		if (field == 'value') {
			if (DateFormat.getDate(data?.value) + '' != 'Invalid Date') {
				return 'date';
			} else {
				return;
			}
		}
	}

	nbtRegionTitles = {
		'description': this.translateService.translate('common.description'),
	};

	nbtAreaTitles = {
		'description': this.translateService.translate('common.description'),
	};

	nbtFacilityTitles = {
		'description': this.translateService.translate('oidpwait.facility'),
		'code': this.translateService.translate('common.code')
	};

	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	whenNewFormInstance() {
		if (this.sessionManager.currentCaseLoadType === 'INST') {
			const result = this.oidpwaitFactory.whenNewFormInstance(this.sessionManager.currentCaseLoad);
			result.subscribe(data => {
				if (data) {
					this.vOffPrgOblModel.nbtAgyLocId = data.code;
				}
			});
		}
		else {
			const result1 = this.oidpwaitFactory.getcommareadefault(this.sessionManager.currentCaseLoad);
			result1.subscribe(data => {
				this.vOffPrgOblModel.nbtArea = data.code;
				this.vOffPrgOblModel.nbtRegion = data.description;
			});
		}
	}

	serviceChange(event) {
		if (event) {
			this.programId = event.programId;
			this.vOffPrgOblModel.nbtActivityCode = event.code;
			this.nbtActivityCode = event.code;
		} else {
			this.vOffPrgOblModel.programId = null;
			if (this.regionFlag === false) {
			}
		}
	}

	regionChange(event) {
		if (event) {
			this.regionFlag = true;
			this.regionCode = event.code;
			this.vOffPrgOblModel.nbtRegion = event.code;
            this.areaReadOnly = false;
			if (this.regionCodeOld != event.code) {
				this.vOffPrgOblModel.nbtArea = undefined;
				this.vOffPrgOblModel.nbtAgyLocId = undefined;
				this.nbtTeam = undefined;
			}
			if (this.regionCode) {
				this.areaInputs = this.sessionManager.currentCaseLoadType + ',' + this.regionCode;
				this.nbtAreaLink = 'oidpwait/rgAreasRecordGroup?areaInputs=' + this.areaInputs;
			}

			this.facilityInputs = this.sessionManager.currentCaseLoadType + ',' + this.vOffPrgOblModel.nbtRegion + '';
			this.nbtAgyLocDescLink = 'oidpwait/rgAgyLocsRecordGroup?facilityInputs=' + this.facilityInputs;

			this.regionCodeOld = event.code;
	
		} else {
			this.regionCode = undefined;
			this.vOffPrgOblModel.nbtRegion = null;
			this.areaInputs = this.sessionManager.currentCaseLoadType + ',' + '';
			this.nbtAreaLink = 'oidpwait/rgAreasRecordGroup?areaInputs=' + this.areaInputs;
            this.areaReadOnly = true;
			this.areaCode = null;
			if (this.areaCode) {
				this.facilityInputs = this.sessionManager.currentCaseLoadType + ',' + '' + ',' + this.areaCode;
				this.nbtAgyLocDescLink = 'oidpwait/rgAgyLocsRecordGroup?facilityInputs=' + this.facilityInputs;
			} else {
				this.facilityInputs = this.sessionManager.currentCaseLoadType + '' + '';
				this.nbtAgyLocDescLink = 'oidpwait/rgAgyLocsRecordGroup?facilityInputs=' + this.facilityInputs;
			}
		}
	}

	areaChange(event) {
		if (event) {

			this.areaCode = event.code;
			this.vOffPrgOblModel.nbtArea = event.code;

			if (this.areaCodeOld != event.code) {
				this.vOffPrgOblModel.nbtAgyLocId = undefined;
				this.nbtTeam = undefined;
			}
			this.areaCodeOld = event.code;
			if (this.regionCode) {
				this.facilityInputs = this.sessionManager.currentCaseLoadType + ',' + this.regionCode + ',' + this.areaCode;
				this.nbtAgyLocDescLink = 'oidpwait/rgAgyLocsRecordGroup?facilityInputs=' + this.facilityInputs;
			} else {
				this.facilityInputs = this.sessionManager.currentCaseLoadType + ',' + '' + ',' + this.areaCode;
				this.nbtAgyLocDescLink = 'oidpwait/rgAgyLocsRecordGroup?facilityInputs=' + this.facilityInputs;
			}
			
		} else {
			this.areaCode = null;
			this.vOffPrgOblModel.nbtArea = null;

			if (this.regionCode) {
				this.facilityInputs = this.sessionManager.currentCaseLoadType + ',' + this.regionCode + '';
				this.nbtAgyLocDescLink = 'oidpwait/rgAgyLocsRecordGroup?facilityInputs=' + this.facilityInputs;
			} else {
				this.facilityInputs = this.sessionManager.currentCaseLoadType + '' + '';
				this.nbtAgyLocDescLink = 'oidpwait/rgAgyLocsRecordGroup?facilityInputs=' + this.facilityInputs;
			}
		}
	}

	nbtAgyLocIdChange(event) {
		if (event) {
			this.nbtAgyLocId = event.code;
			this.vOffPrgOblModel.nbtAgyLocId = event.code;

		} else {
			this.vOffPrgOblModel.nbtAgyLocId = null;
			this.nbtAgyLocId = null;
		}
	}

	nbtTeamChange(event) {
		if (event) {
			this.teamId = event.serverCode;
			this.nbtTeam = event.code;
			this.vOffPrgOblModel.nbtTeam = event.code
		} else {
			this.teamId = undefined;
		}
	}

	availabilityChange(event) {
		const index = this.vOffPrgOblData.indexOf(this.vOffPrgOblModel);
		if (event && this.vOffPrgOblModel && event.code !== this.vOffPrgOblModel.availabilityCodeTemp) {
			this.grid.setColumnData('availabilityCode', index, event.code);
			this.grid.setColumnData('test', index, this.vOffPrgOblModel.programId);
		} else if (!event && this.vOffPrgOblModel.availabilityCodeTemp) {
			this.grid.setColumnData('availabilityCode', index, '');
		}
	}
	onGridClear = () => {
		this.search();
		return true;
	}
	search() {
		this.clearTempListOperation();
		this.queryDetail();
	}
	queryDetail() {
		this.vOffPrgOblExecuteQuery();
		this.clearTempListOperation();
	}
	clearTempListOperation() {
		const clearTempListResult = this.oidpwaitFactory.clearTempList();
		clearTempListResult.subscribe(data => {
		});
	}
	vOffPrgOblExecuteQuery() {
		if (!this.nbtActivityCode) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidpwait.pleaseenterservice');
			this.show();
			return;
		}
		this.vOffPrgOblModel.nbtActivityCode = this.nbtActivityCode;
		this.vOffPrgOblModel.programId = this.programId;
		this.vOffPrgOblModel.caseLoadType = this.sessionManager.currentCaseLoadType;
		this.vOffPrgOblModel.teamId = this.teamId;
		const voffprgoblResult = this.oidpwaitFactory.vOffPrgOblExecuteQuery(this.vOffPrgOblModel);
		voffprgoblResult.subscribe(data => {
			if (data.length === 0) {
				this.vOffPrgOblData = [];
				this.offBookId = null;;

				this.type = 'warn';
				this.message = this.translateService.translate('common.querycaused');
				this.show();
				return;
			} else {
				data.forEach(element => {
					element.specialNeedFlag = element.specialNeedFlag === 'N' ? false : true;
					element.specialNeedFlagTemp = element.specialNeedFlag;

					element.nbtBulkAssign = element.nbtBulkAssign === 'Y' ? true : false;
					element.nbtRegion = this.regionCode;
					element.nbtArea = this.areaCode;
					element.nbtAgyLocId = this.nbtAgyLocId;
					this.offBookId = element.offenderBookId;
					this.vOffPrgObId = element.offenderPrgObligationId;
					element.availabilityCodeTemp = element.availabilityCode;
				});
				this.vOffPrgOblData = data;
				this.tableIndex = 0;
				this.vOffPrgOblModelTemp = JSON.parse(JSON.stringify(data));
				this.searchDisabled = true;
				this.clearDis = false;
				this.availabilityROnly = false;
				this.serviceReadOnly = true;
				this.agyLocIdROnly = true;
				this.teamROnly = true;
				this.updateButtonFlag = true;
				this.btnOffProDis = false;
				this.btnUpdateDis = false;
				this.saveChangeFlag = false;
				this.availChangeFlag = false;
				this.areaReadOnly = true;
			}
		});
	}
	onRowClickVOff(event) {
		if (event) {
			this.vOffPrgOblModel = event;
		}
	}
	detailsValidateRowData = (event) => {
		const rowIndex = event.rowIndex;
		this.vOffPrgOblModel = event.data;
		const rowdata = new ValidateRowReturn();
		if (event.field === 'nbtBulkAssign' && event.newValue === true) {
			this.vOffPrgOblModel.firstFlag = "true";
			const addToProgramList = this.oidpwaitFactory.nonAssociation(this.vOffPrgOblModel);
			addToProgramList.subscribe(data => {
			});
			this.btnUpdateDis = true;
		} if (event.field === 'nbtBulkAssign' && event.newValue === false) {
			this.vOffPrgOblModel.firstFlag = "false";
			const addToProgramList = this.oidpwaitFactory.nonAssociation(this.vOffPrgOblModel);
			addToProgramList.subscribe(data => {
			});
			this.btnUpdateDis = false;
		}
		let count = 0;
		this.vOffPrgOblData.forEach(ele => {
			if (ele.nbtBulkAssign === true) {
				count++
			}
		});
		if (count > 0) {
			this.btnAssDis = false;
		} else {
			this.btnAssDis = true;
		}
		if (event.field === 'specialNeedFlag' && event.data.specialNeedFlagTemp != event.data.specialNeedFlag) {
			this.saveChangeFlag = true;
		}
		rowdata.validated = true;
		return rowdata;
	}

	/* Commit funcation */
	vOffPrgOblCommit(event) {
		this.getDetailsData();
		if (this.detailsDataTempUpdatedList.length && this.count === 0) {
			this.message = this.translateService.translate('oidpwait.nodataismodifiedtosave');
			this.type = 'warn';
			this.show();
			return;
		}
		this.count = 0;
		if (event === 'assign') {
			this.vOffPrgOblUpdatetList = this.vOffPrgOblDataTemp;
		} else {
			this.vOffPrgOblUpdatetList = event.updated;
		}
		this.vOffPrgOblCommitModel.updateList = [];
		for (let i = 0; i < this.vOffPrgOblUpdatetList.length; i++) {
			this.vOffPrgOblUpdatetList[i].statusChangeDate = DateFormat.getDate();
			this.vOffPrgOblUpdatetList[i].nbtBulkAssign = this.vOffPrgOblUpdatetList[i].nbtBulkAssign ? true : false;
			this.vOffPrgOblUpdatetList[i].specialNeedFlag = this.vOffPrgOblUpdatetList[i].specialNeedFlag ? 'Y' : 'N';
		}
		this.vOffPrgOblCommitModel.updateList = this.vOffPrgOblUpdatetList;
		const result = this.oidpwaitFactory.vOffPrgOblCommit(this.vOffPrgOblCommitModel);
		result.subscribe(data => {
			if (String(data[0].errorMessage).indexOf('V_OFFENDER_PRG_OBLIGATIONS_PK') > 0) {
				this.type = 'warn';
				this.message = this.translateService.translate('oidpwait.primarykeyviolation');
				this.show();
				this.vOffPrgOblExecuteQuery();
				return;
			} if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
				this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
				this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
				this.type = 'warn';
				this.show();
				this.vOffPrgOblExecuteQuery();
				return;
			}
			if (data[0] && data[0].returnValue === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.vOffPrgOblExecuteQuery();
				return;
			}
		});
	}

	offenderProgramsClick = () => {
		const rowIndex = this.vOffPrgOblData.indexOf(this.vOffPrgOblModel);
		if (this.vOffPrgOblModelTemp[rowIndex].availabilityCode != this.vOffPrgOblModel.availabilityCode || this.saveChangeFlag) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidpwait.savechanges');
			this.show();
			return;
		}
		if (this.vOffPrgObId != null) {
			this.oidpwaitFactory.exitFlag = true;
			this.vHeaderBlockModel = new VHeaderBlock();
			this.vHeaderBlockModel.offenderIdDisplay = this.vOffPrgOblModel.offenderIdDisplay;
			this.vHeaderBlockModel.offenderBookId = this.vOffPrgOblModel.offenderBookId;
			this.vHeaderBlockModel.offenderId = this.vOffPrgOblModel.offenderId;
			this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
			const offbkGlobal = this.osiosearService.offbkgGlobalQuery(this.vHeaderBlockModel);
			offbkGlobal.subscribe(list => {
				if (list.length > 0) {
					this.vHeaderBlockModel = list[0];
					if (list[0].imageId != null) {
						const imageModel = { imageId: list[0].imageId };
						this.osiosearService.imageExecuteQuery(imageModel).subscribe(imageData => {
							this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
						});
					}
					this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
				} else {
					this.offenderSearchService.selectedOffender = undefined;
				}
				this.vOffPrgOblModel.nbtActivityCode = this.nbtActivityCode;
				this.vOffPrgOblModel.nbtArea = this.areaCode;
				this.vOffPrgOblModel.programId = this.programId;
				this.vOffPrgOblModel.nbtTeam = this.nbtTeam;
				this.oidpwaitFactory.ocdprogrScreenObj = this.vOffPrgOblModel;
				return this.router.navigate(['/OCDPROGR'], {queryParams: { O: 1}});
			});
		} else {
			this.oidpwaitFactory.exitFlag = false;
		}
	}
	assignFromClick = () => {
		const rowIndex = this.vOffPrgOblData.indexOf(this.vOffPrgOblModel);
		if (this.vOffPrgOblModelTemp[rowIndex].availabilityCode != this.vOffPrgOblModel.availabilityCode || this.saveChangeFlag) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidpwait.savechanges');
			this.show();
			return;
		}
		
		this.nonAssOffenderList = new CourseActivities();
		this.vOffPrgOblDataTemp = this.vOffPrgOblData.filter(e => e.nbtBulkAssign);
			if(this.sessionManager.currentCaseLoadType === 'COMM'){
		const conflictObj = this.ociscataFactory.checkNonAssociationConflict(this.vOffPrgOblDataTemp);
		conflictObj.subscribe(data => {
			if (data && data.length > 0) {
				this.conflictPopNew(this.vOffPrgOblDataTemp, data, 0, 0);
			}

		});

		}
		else {
			const conflictObj = this.ociscataFactory.checkNonAssociationConflictByIndAndGang(this.vOffPrgOblDataTemp);
			conflictObj.subscribe(data => {
				if (data && data.length > 0) {
					this.internalNonAssocationPopupByIndAndGangUpdate(this.vOffPrgOblDataTemp, data, 0)
				}
			});
		}
	}
	internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i) {
		var msg = null;
		var msgGang = null;

		if (i == nonAssList.length && this.vOffPrgOblDataTemp && this.vOffPrgOblDataTemp.length != 0) {
			this.oidpwaitFactory.exitFlag = true;
			this.vOffPrgOblModel.statusDesc = 'ALLOCATE';
			this.vOffPrgOblModel.programId = this.programId;
			this.oidpwaitFactory.vOffPrgOblModelService = this.vOffPrgOblModel;
			const modelData = {
				statusDesc: 'ALLOCATE', programId: this.programId,
				eventType: 'ACP',
				bulkAssignData: this.vOffPrgOblDataTemp,
				moduleName: 'OIDPWAIT',
				pOperation: 'ALLOCATE'
			};
			this.dialogService.openLinkDialog('/ociscatadialog', modelData, 80).subscribe(result => {
				if (result.length > 0) {
					this.vOffPrgOblDataTemp = [];
					this.vOffPrgOblDataTemp = result[0].bulkAssignData;
					let selectedPhases = '';
					result.forEach(phases => {
						if (phases.coursePhaseId) {
							selectedPhases = selectedPhases + ' , ' + phases.courseActivityCode;
						}
					});
					if (selectedPhases != '') {
						const data = {
							label: 'Do you want to allocate the selected offenders to the phases you choose for occurrence ' +
								selectedPhases +
								' and save your changes?'
							, yesBtn: true, noBtn: true
						};
						this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(results => {
							if (results) {
								result.forEach(e => {
									this.vOffPrgOblDataTemp.forEach(obj => {
										if (obj.nbtBulkAssign) {
											obj.assignFlag = 'Y';
											obj.coursePhaseId = e.coursePhaseId;
											obj.programId = this.programId;
										}
									});

								});
								this.vOffPrgOblCommit('assign');
							} else {
								return;
							}
						});
					}
				}
			});
		}
		var name;
		var id;
		var one = this.translateService.translate('oidpwait.bulkAsignForAccreditedProgram');
		//Both individual And gang Details data 
		if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByInd && nonAssList[i].offenderNonAssociationsByInd.length > 0 &&
			nonAssList[i].offenderNonAssociationsByGang && nonAssList[i].offenderNonAssociationsByGang.length > 0) {
			// individual details
			nonAssList[i].offenderNonAssociationsByInd.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msg) {
							name = nonAssList[i].offenderName;
							id = nonAssList[i].offenderIdDisplay;
							msg = "Individual Non-Association Conflics " + '\n';
						}
						msg = msg + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// gang details 
			nonAssList[i].offenderNonAssociationsByGang.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msgGang) {
							msgGang = "Gang Non-Association Conflics" + '\n';
						}
						msgGang = msgGang + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// both ind and Gang
			if (msg != null && msgGang != null) {
				msg = 'Offender ' + name + ' (ID: ' + id + ') ' + one + '\n\n' + msg + "\n" + msgGang;
				msg = msg + '  \n\n ' + this.translateService.translate('ociscata.doyouwanttoproceed');
				const data = {
					label: this.translateService.translate(msg), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
					proceedBtnDisabled: true
				};

				this.firstPopup(bulkAssignList, nonAssList, data, i);

			}

		}

		// individual details
		else if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByInd && nonAssList[i].offenderNonAssociationsByInd.length > 0) {

			nonAssList[i].offenderNonAssociationsByInd.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msg) {
							name = nonAssList[i].offenderName;
							id = nonAssList[i].offenderIdDisplay;
							msg = "Individual Non-Association Conflics " + '\n';
						}
						msg = msg + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// for ind only 
			if (msg != null) {
				msg = 'Offender ' + name + ' (ID: ' + id + ') ' + one + '\n\n' + msg + '\n\n' + this.translateService.translate('ociscata.doyouwanttoproceed');
				const data = {
					label: this.translateService.translate(msg), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
					proceedBtnDisabled: true
				};

				this.firstPopup(bulkAssignList, nonAssList, data, i);

			}
		}
		// Gang details 
		else if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByGang && nonAssList[i].offenderNonAssociationsByGang.length > 0) {
			nonAssList[i].offenderNonAssociationsByGang.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msgGang) {
							name = nonAssList[i].offenderName;
							id = nonAssList[i].offenderIdDisplay;
							msgGang = "Gang Non-Association Conflics \n";
						}
						msgGang = msgGang + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// for gang details 
			if (msgGang != null) {
				msgGang = 'Offender ' + name + ' (ID: ' + id + ') ' + one + '\n' + msgGang + '  \n\n ' + this.translateService.translate('ociscata.doyouwanttoproceed');
				const data = {
					label: this.translateService.translate(msgGang), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
					proceedBtnDisabled: true
				};
				this.firstPopup(bulkAssignList, nonAssList, data, i);

			}
		}

		else {
			i++;
			this.internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i);
		}
	}


	conflictPopNew(bulkAssignList, nonAssList, x, y) {
		let i = x;
		let j = y;
		var msg = null;
		if (i == nonAssList.length && this.vOffPrgOblDataTemp && this.vOffPrgOblDataTemp.length != 0) {
			this.oidpwaitFactory.exitFlag = true;
			this.vOffPrgOblModel.statusDesc = 'ALLOCATE';
			this.vOffPrgOblModel.programId = this.programId;
			this.oidpwaitFactory.vOffPrgOblModelService = this.vOffPrgOblModel;
			const modelData = {
				statusDesc: 'ALLOCATE', programId: this.programId,
				eventType: 'ACP',
				bulkAssignData: this.vOffPrgOblDataTemp,
				moduleName: 'OIDPWAIT',
				pOperation:'ALLOCATE'
			};
			this.dialogService.openLinkDialog('/ociscatadialog', modelData, 80).subscribe(result => {
				if (result.length > 0) {
					this.vOffPrgOblDataTemp = [];
					this.vOffPrgOblDataTemp = result[0].bulkAssignData;
					let selectedPhases = '';
					result.forEach(phases => {
						if (phases.coursePhaseId) {
							selectedPhases = selectedPhases + ' , '+ phases.courseActivityCode;
						}
					});
					if(selectedPhases != ''){
						const data = {
							label: 'Do you want to allocate the selected offenders to the phases you choose for occurrence ' +
							selectedPhases +
								' and save your changes?'
							, yesBtn: true, noBtn: true
						};
						this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(results => {
							if (results) {
								result.forEach(e => {
									this.vOffPrgOblDataTemp.forEach(obj => {
										if (obj.nbtBulkAssign) {
											obj.assignFlag = 'Y';
											obj.coursePhaseId = e.coursePhaseId;
											obj.programId = this.programId;
										}
									});

								});
								this.vOffPrgOblCommit('assign');
							} else {
								return;
							}
						});
					}
				}
			});
		}
		if (i == j && i < nonAssList.length) {
			if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociations && nonAssList[i].offenderNonAssociations.length > 0) {
				var offenderCount = 1;
				nonAssList[i].offenderNonAssociations.forEach(element => {
					bulkAssignList.forEach(obj => {
						if (obj.offenderBookId == element.nsOffenderBookId) {
							if (!msg) {
								msg = this.translateService.translate('oidpwait.offender') + ' ' + nonAssList[i].offenderName + ', ' + nonAssList[i].offenderIdDisplay + '  ' + this.translateService.translate('oidpwait.hasNonAssociation') + '  \n';
							}
							msg = msg + (offenderCount <= 9 ? ' 0' + offenderCount : ' '+offenderCount) + ') ' + element.offenderName + " , " + element.offenderIdDisplay + " \n";
							offenderCount ++;
						}
					});
				});
				if (msg) {
					msg = msg + '  \n\n ' + this.translateService.translate('ociscata.doyouwanttoproceed');
					const data = {
						label: this.translateService.translate(msg), yesBtn: true, noBtn: true
					};
					j++;
					this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
						if (result) {
							i++;
							if (i < nonAssList.length) {
								this.conflictPopNew(bulkAssignList, nonAssList, i, j);
							} else {
								this.conflictPopNew(bulkAssignList, nonAssList, i, j);
							}
						} else {
							this.vOffPrgOblDataTemp = bulkAssignList.filter((element) => (element.offenderBookId != nonAssList[i].offenderBookId));
							i++;
							this.conflictPopNew(this.vOffPrgOblDataTemp, nonAssList, i, j);
						}
					});
				} else {
					j++;
					i++;
					this.conflictPopNew(bulkAssignList, nonAssList, i, j);
				}


			} else {
				j++;
				i++;
				this.conflictPopNew(bulkAssignList, nonAssList, i, j);
			}
		}
	}

	conflictPopUp(event, x, y) {
		let i = x;
		let j = y;
		if (i == event.length && this.vOffPrgOblDataTemp && this.vOffPrgOblDataTemp.length != 0) {
			this.oidpwaitFactory.exitFlag = true;
			this.vOffPrgOblModel.statusDesc = 'ALLOCATE';
			this.vOffPrgOblModel.programId = this.programId;
			this.oidpwaitFactory.vOffPrgOblModelService = this.vOffPrgOblModel;
			const modelData = {
				statusDesc: 'ALLOCATE', programId: this.programId,
				eventType: 'ACP',
				bulkAssignData: this.vOffPrgOblDataTemp,
				moduleName: 'OIDPWAIT'
			};
			this.dialogService.openLinkDialog('/ociscatadialog', modelData, 80).subscribe(result => {
				if (result.length > 0) {
					this.vOffPrgOblDataTemp = [];
					this.vOffPrgOblDataTemp = result[0].bulkAssignData;
					let selectedPhases = '';
					result.forEach(phases => {
						if (phases.coursePhaseId) {
							selectedPhases = selectedPhases + ' , '+ phases.courseActivityCode;
						}
					});
					if(selectedPhases != ''){
						const data = {
							label: 'Do you want to allocate the selected offenders to the phases you choose for occurrence ' +
							selectedPhases +
								' and save your changes?'
							, yesBtn: true, noBtn: true
						};
						this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(results => {
							if (results) {
								result.forEach(e => {
									this.vOffPrgOblDataTemp.forEach(obj => {
										if (obj.nbtBulkAssign) {
											obj.assignFlag = 'Y';
											obj.coursePhaseId = e.coursePhaseId;
											obj.programId = this.programId;
										}
									});

								});
								this.vOffPrgOblCommit('assign');
							} else {
								return;
							}
						});
					}
				}
			});
		}
		if (i == j && i < event.length) {
			if (!event[i].conflictMsg) {
				j++;
				i++;
				this.conflictPopUp(event, i, j);
			} else {
				let msgOne = this.translateService.translate('oidpwait.offender');
				let msgTwo = this.translateService.translate('oidpwait.hasNonAssociation');
				let msgThree = this.translateService.translate('ociscata.doyouwanttoproceed');
				event[i].conflictMsg = event[i].conflictMsg.replace('oidpwait.offender', msgOne);
				event[i].conflictMsg = event[i].conflictMsg.replace('oidpwait.hasNonAssociation', msgTwo);
				event[i].conflictMsg = event[i].conflictMsg.replace('ociscata.doyouwanttoproceed', msgThree);
				const data = {
					label: this.translateService.translate(event[i].conflictMsg), yesBtn: true, noBtn: true
				};
				j++;
				this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
					if (result) {
						i++;
						if (i < event.length) {
							this.conflictPopUp(event, i, j);
						} else {
							this.conflictPopUp(event, i, j);
						}
					} else {
						this.vOffPrgOblDataTemp = this.vOffPrgOblDataTemp.filter((element) => (element.offenderBookId != event[i].offenderBookId));
						i++;
						this.conflictPopUp(event, i, j);
					}
				});
			}
		}
		

	}

	updateClick = () => {
		const rowIndex = this.vOffPrgOblData.indexOf(this.vOffPrgOblModel);
		if (this.vOffPrgOblModelTemp[rowIndex].availabilityCode != this.vOffPrgOblModel.availabilityCode || this.saveChangeFlag) {
			this.type = 'warn';
			this.message = this.translateService.translate('oidpwait.savechanges');
			this.show();
			return;
		}
		if (this.vOffPrgObId != null) {
			this.dialogService.openLinkDialog('/OCUUPSTA', this.vOffPrgOblModel, 80).subscribe(res => {
				this.vOffPrgOblExecuteQuery();
			});
		}
		if (this.nbtActivityCode) {
			this.vOffPrgOblExecuteQuery();
		}
	}

	onClear = () => {
		this.clearDis = true;
		this.nbtActivityCode = undefined;
		this.vOffPrgOblModel.nbtRegion = undefined;
		this.vOffPrgOblModel.nbtArea = undefined;
		this.vOffPrgOblModel.nbtAgyLocId = undefined;
		this.nbtTeam = undefined;
		this.vOffPrgOblModel.availabilityCode = undefined;
		this.vOffPrgOblData = [];
		this.vOffPrgOblModelTemp = [];
		this.searchDisabled = false;
		this.serviceReadOnly = false;
		this.availabilityROnly = true;
		this.updateButtonFlag = false;
		this.btnOffProDis = true;
		this.btnAssDis = true;
		this.btnUpdateDis = true;
		this.vOffPrgObId = null;
		this.areaReadOnly = true;
		if (this.sessionManager.currentCaseLoadType === 'INST') {
			this.agyLocIdROnly = false;
		} else {
			this.teamROnly = false;
		}
	}

	nbtActCodeBlur() {
		if (!this.nbtActivityCode) {
			this.nbtActivityCode = this.nbtActivityCode === '' ? undefined : '';
		}
	}
	nbtRegionBlur() {
		if (!this.vOffPrgOblModel.nbtRegion) {
			this.vOffPrgOblModel.nbtRegion = this.vOffPrgOblModel.nbtRegion === '' ? undefined : '';
		}
	}
	nbtAreaBlur() {
		if (!this.vOffPrgOblModel.nbtArea) {
			this.vOffPrgOblModel.nbtArea = this.vOffPrgOblModel.nbtArea === '' ? undefined : '';
		}
	}
	nbtFaciBlur() {
		if (!this.vOffPrgOblModel.nbtAgyLocId) {
			this.vOffPrgOblModel.nbtAgyLocId = this.vOffPrgOblModel.nbtAgyLocId === '' ? undefined : '';
		}
	}
	nbtTeamBlur() {
		if (!this.nbtTeam) {
			this.nbtTeam = this.nbtTeam === '' ? undefined : '';
		}
	}

	nbtAvilaBlur() {
		if (!this.vOffPrgOblModel.availabilityCode) {
			this.vOffPrgOblModel.availabilityCode = this.vOffPrgOblModel.availabilityCode === '' ? undefined : '';
		}
	}
	isInsertable() {
		if (this.nbtActivityCode || this.vOffPrgOblModel.nbtRegion || this.vOffPrgOblModel.nbtArea || this.vOffPrgOblModel.nbtAgyLocId || this.nbtTeam) {
			this.clearDis = false;
		} else {
			this.clearDis = true;
		}
	}

	getDetailsData() {
		this.detailsDataTempUpdatedList = [];
		this.grid.updatedMap.forEach(
			(v: any, k: number) => {
				this.detailsDataTempUpdatedList.push(v);
				if (this.detailsDataTempUpdatedList.length > 0) {
					for (let i = 0; i < this.vOffPrgOblModelTemp.length; i++) {
						for (let  j= 0; j < this.detailsDataTempUpdatedList.length; j++) {
							if (this.vOffPrgOblModelTemp[i].offenderBookId === this.detailsDataTempUpdatedList[j].offenderBookId) {
								if ((this.vOffPrgOblModelTemp[i].nbtBulkAssign !== this.detailsDataTempUpdatedList[j].nbtBulkAssign) || 
								(this.vOffPrgOblModelTemp[i].specialNeedFlag !== this.detailsDataTempUpdatedList[j].specialNeedFlag) ||
								(this.vOffPrgOblModelTemp[i].availabilityCode !== this.detailsDataTempUpdatedList[j].availabilityCode)) {
									this.count = 1;
								}
							}
						}
					}
				}
			}
		);
	}


	firstPopup(bulkAssignList, nonAssList, data, i) {
		this.dialogService.openLinkDialog('/OCUNAWRN', data, 30).subscribe(result => {
			if (result) {
				i++;
				this.internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i);

			} else {
				this.secondPopup(bulkAssignList, nonAssList, data, i);

			}
		});
	}
	secondPopup(bulkAssignList, nonAssList, data, i) {
		const offDetails = {
			label: 'This action will un-select ' + bulkAssignList[i].lastName + ',' + bulkAssignList[i].firstName + '(ID: ' + bulkAssignList[i].offenderIdDisplay + '),' + this.translateService.translate('oidpwait.removeFromList')+'\n\n'+this.translateService.translate('ociscata.doyouwanttoproceed')
			, yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/ocucoffeconfirmbox', offDetails, 50).subscribe(results => {
			if (results) {
				for (let k = 0; k < nonAssList.length; k++) {
					if (k !== i && ((nonAssList[k].offenderNonAssociationsByInd && nonAssList[k].offenderNonAssociationsByInd.length > 0)
						|| (nonAssList[k].offenderNonAssociationsByInd && nonAssList[k].offenderNonAssociationsByInd.length > 0))) {

						if (nonAssList[k].offenderNonAssociationsByInd && nonAssList[k].offenderNonAssociationsByInd.length > 0) {
							this.offendersList = [];
							for (let m = 0; m < nonAssList[k].offenderNonAssociationsByInd.length; m++) {
								if (nonAssList[k].offenderNonAssociationsByInd[m].offenderBookId !== nonAssList[i].offenderBookId) {
									this.offendersList.push(nonAssList[k].offenderNonAssociationsByInd[m]);
								}
							}
							nonAssList[k].offenderNonAssociationsByInd = this.offendersList;
						}

						if (nonAssList[k].offenderNonAssociationsByGang && nonAssList[k].offenderNonAssociationsByGang.length > 0) {
							this.offendersList = [];
							for (let m = 0; m < nonAssList[k].offenderNonAssociationsByGang.length; m++) {
								if (nonAssList[k].offenderNonAssociationsByGang[m].offenderBookId !== nonAssList[i].offenderBookId) {
									this.offendersList.push(nonAssList[k].offenderNonAssociationsByGang[m]);
								}
							}
							nonAssList[k].offenderNonAssociationsByGang = this.offendersList;
						}
					}
				}

				this.vOffPrgOblDataTemp = this.vOffPrgOblDataTemp.filter((element) => (element.offenderBookId != nonAssList[i].offenderBookId));
				i++;
				this.internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i);
			}
			else {
				this.firstPopup(bulkAssignList, nonAssList, data, i);
			}
		});

	}

}
