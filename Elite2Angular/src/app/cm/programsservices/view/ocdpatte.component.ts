import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdpatteService } from '../service/ocdpatte.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
//import { OffenderCourseAttendances } from '@commonbeans/OffenderCourseAttendances';
//import { CourseScheduleStaffs } from '@commonbeans/CourseScheduleStaffs';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
//import { VOffenderCourseAttendances } from '../beans/VOffenderCourseAttendances';
import { OffenderCourseAttendancesCommitBean } from '@cm/programsservices/beans/OffenderCourseAttendancesCommitBean';
import { OffenderCourseAttendance } from '@cm/programsservices/beans/OffenderCourseAttendance';
import { CourseScheduleStaff } from '@cm/programsservices/beans/CourseScheduleStaff';
import { CourseSchedules } from '@inst/institutional-activities/maintenance/beans/CourseSchedules';
import { CourseScheduleStaffsCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseScheduleStaffsCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { CourseSchedulesCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseSchedulesCommitBean';
import { OcdpatteCommitBean } from '../beans/OcdpatteCommitBean';
import { OcmpssetService } from '@inst/institutional-activities/maintenance/service/ocmpsset.service';
import { ProgramPaySettingsBean } from '@inst/institutional-activities/maintenance/beans/ProgramPaySettingsBean';
import { EventMeasures } from '@iwp/beans/EventMeasures';
// import required bean declarations

@Component({
	selector: 'app-ocdpatte',
	templateUrl: './ocdpatte.component.html'
})

export class OcdpatteComponent implements OnInit {
	// Variable declaration

	@ViewChild('attendanceGrid', { static: true }) attendanceGrid: any;
	@ViewChild('staffsGrid', { static: true }) staffsGrid: any;
	
	
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	offcourseattendancesData: OffenderCourseAttendance[] = [];
	offcourseattendancesDataTemp: OffenderCourseAttendance[] = [];
	offcourseattendance: OffenderCourseAttendance = new OffenderCourseAttendance();
	offcourseattendancesModel: OffenderCourseAttendance = new OffenderCourseAttendance();
	rowClickOffcourseattendancesModel: OffenderCourseAttendance = new OffenderCourseAttendance();
	courseschedulestaffsDataTemp: CourseScheduleStaff[] = [];
	courseScheduleModel: CourseSchedules = new CourseSchedules();
	courseschedulestaffsData: CourseScheduleStaff[] = [];
	courseschedulestaffsModel: CourseScheduleStaff = new CourseScheduleStaff();
	courseschedulestaffsModelTemp: CourseScheduleStaff = new CourseScheduleStaff();
	ocdpatteCommiteBean: OcdpatteCommitBean=new OcdpatteCommitBean();
	deliverydetailsData: CourseSchedules[] = [];
	deliverydetailsDataTemp: CourseSchedules[] = [];
	// TODO angular.copy(this.deliverydetailsData, thisdeliverydetailsDataTemp);
	deliverydetailsModel: CourseSchedules = new CourseSchedules();
	// TODO angular.copy(this.courseschedulestaffsData, thiscourseschedulestaffsDataTemp);
	courseschedulestaffsInsertList: CourseScheduleStaff[] = [];
	courseschedulestaffsUpdatetList: CourseScheduleStaff[] = [];
	courseschedulestaffsDeleteList: CourseScheduleStaff[] = [];
	offcourseattendancesUpdatetList: OffenderCourseAttendance[] = [];
	
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean;
	courseScheduleStaffsColumnDef: any[];
	offCourseAttendancesColumnDef: any[];
	deliverydetailsColumnDef: any[];
	ctrlCourseSchedulesReadOnly: boolean;
	offCourseAttendancesReadOnly: boolean;
	courseScheduleStaffsReadOnly: boolean;
	deliveryDetailsReadOnly: boolean;
	pgmLocationReadOnly: boolean;
	rgscheduletypeRg: any[] = [];
	rgserviceRg: any[] = [];
	rgengagementRg: any[] = [];
	rginstproviderRg: any[] = [];
	rgcommproviderRg: any[] = [];
	rgconfirmattendanceRg: any[] = [];
	rgunderstandingRg: any[] = [];
	rgstaffroleRg: any[] = [];
	rgstaffnameRg: any[] = [];
	offcourseattendancesCommitModel: OffenderCourseAttendancesCommitBean = new OffenderCourseAttendancesCommitBean();
	type: string;
	message: string;
	msglist: any[];
	courseschedulestaffsCommitModel: CourseScheduleStaffsCommitBean = new CourseScheduleStaffsCommitBean();

	deliverydetailsCommitModel: CourseSchedulesCommitBean = new CourseSchedulesCommitBean();
	providerLink: string;
	ServiceTitles = { code: 'Code', description: 'Service' };
	tableStaffIndex: number;
	tableattendanceIndex: number;
	caseloadtype: string;
	eventoutvomevalue: string;
	eventoutcomevalue: string;
	providerType: any;
	oldvalue: any;
	commenttext: any;
	disableClear: boolean;
	disableGoBut: boolean;
	facilitatorsInsert: boolean;
	facilitatorsDelete: boolean;
	disabledBtns: boolean;
	deliverydetailsInsertList: CourseSchedules[] = [];
	deliverydetailsUpdatetList: CourseSchedules[] = [];
	readOnlyFlag:boolean;
	videoReferenceIdTemp: string=undefined;
	readOnlyReferenceId:boolean;
	providerTypeDesc: string;
	namesReadOnly: boolean;
	caseLoadId: string;
	providerPartyId: any;
	provideDisable :boolean;
    providerSource :string;
	prgSrvSetModel: ProgramPaySettingsBean = new ProgramPaySettingsBean();
	constructor(private ocdpatteFactory: OcdpatteService, public translateService: TranslateService,
		public dialogService: DialogService,
		public sessionManager: UserSessionManager,private ocmpssetService: OcmpssetService) {
		// TODO initilize data members here..!
		this.courseScheduleStaffsColumnDef = [];
		this.offCourseAttendancesColumnDef = [];
		this.deliverydetailsColumnDef = [];
	}
	ngOnInit() {
		this.progServicesExecuteQuery();
		this.providerSource = null;
		this.readOnlyReferenceId=true;
		this.courseScheduleModel.providerDesc='';
		this.readOnlyFlag=false;
		this.disabledBtns = true;
		this.facilitatorsInsert=false;
		this.facilitatorsDelete=false;
		this.disableClear = true;
		this.disableGoBut = false;
		this.caseloadtype = this.sessionManager.currentCaseLoadType;
		this.caseLoadId = this.sessionManager.currentCaseLoad;
		this.providerTypeDesc = this.providerTypeDesc === '' ? undefined : '';
		this.provideDisable = true;


		if (this.caseloadtype === 'COMM') {
			this.providerLink = 'ocdpatte/rgCommProviderRecordGroup';
		} else {
			this.providerLink = 'ocdpatte/rgInstProviderRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
		}

		this.courseScheduleStaffsColumnDef = [
			{
				fieldName: this.translateService.translate('common.staffname'), required: true ,field: 'staffId', editable: true, width: 150,
				datatype: 'lov', link: 'ocdpatte/rgStaffNameRecordGroup?progInstId='
			},
			{
				fieldName: this.translateService.translate('common.role'), required: 'true',
				field: 'staffRole', editable: true, width: 150,domain:'PS_ROLE', 
				// link:'ocdpatte/rgStaffRoleRecordGroup',
				 datatype: 'lov'
			},
			/* { fieldName: '', field: 'staffBut', editable: false, width: 150 },
			{ fieldName: '', field: 'staffRoleLov', editable: false, width: 150 }, */

		];
		this.offCourseAttendancesColumnDef = [
			{ fieldName: this.translateService.translate('common.name'), field: 'offenderName', editable: false, width: 150 },
			{
				fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
				editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('ocdpatte.confirmattendance'), field: 'eventOutcome',cellEditable: this.canCellEdit,
				editable: true, width: 150, link: 'ocdpatte/rgConfirmAttendanceRecordGroup', datatype: 'lov',source:'OCMEVENT'
			},
			{
				fieldName: this.translateService.translate('ocdpatte.offenderstarttime'),
				field: 'inTime', editable: true, width: 150, datatype: 'time',cellEditable: this.canCellEdit
			},
			{
				fieldName: this.translateService.translate('ocdpatte.offenderendtime'), field: 'outTime',
				editable: true, width: 150, datatype: 'time',cellEditable: this.canCellEdit
			},
			{
				fieldName: 'Hours', field: 'nbtHours', editable: false, width: 150, datatype: 'time'
			},
			{
				fieldName: this.translateService.translate('ocdpatte.levelofeng'), field: 'engagementCode', editable: true, width: 150,domain:'PS_ENGAGE',
				datatype: 'lov', 
				// link: 'ocdpatte/rgEngagementRecordGroup',
				 cellEditable: this.canCellEdit, required: false
			},


			{
				fieldName: this.translateService.translate('ocdpatte.leveofuns'), field: 'understandingCode', editable: true, width: 150, datatype: 'lov',domain:'PS_UNDER',
				// link: 'ocdpatte/rgUnderstandingRecordGroup',
				 cellEditable: this.canCellEdit, required: false 
			},
			{
				fieldName: this.translateService.translate('ocdpatte.comments'), field: 'commentText',
				editable: true, width: 150,cellEditable: this.canCellEdit
			},
			{
				fieldName: this.translateService.translate('ocdpatte.PayLock'), field: 'payLockTemp', 
				editable: false, width: 150, datatype: 'checkbox'
			},
			{
				fieldName: 'Pay Flag', field: 'payFlagVal', editable: false, width: 150, datatype: 'checkbox', hide: true
			},
			{
				fieldName: 'Batch #', field: 'payBatchId', editable: false, width: 150, hide: true
			},
			/*       { fieldName: 'Pay&#10;Lock', field: 'nbtPayLock', editable: true, width: 150 },
					   { fieldName: '', field: 'eventOutcomeBut', editable: true, width: 150 },
					   { fieldName: '', field: 'engagementCodeBut', editable: true, width: 150 },
					   { fieldName: '', field: 'understandingCodeBut', editable: true, width: 150 }, */



		]; 

		this.deliverydetailsColumnDef = [
			{
				fieldName: this.translateService.translate('ocdpatte.videoref'),
				field: 'videoReferenceId', editable: true, width: 150, datatype: 'text' , maxlength:20
			},
			{
				fieldName: this.translateService.translate('ocdpatte.sessionreviewdate'), field: 'reviewDate',
				editable: false, width: 150, datatype: 'date'
			},

		];
		// TODO all initializations here
		this.getproviderType();
	}
	Insert = () => { // TODO implement on grid insert 
	}
	validateRow = (event) => {
		const rowdata = new ValidateRowReturn();
		return rowdata;
	}        /** 
        * This function displays the messages
        */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	allowNumbers(event) {
	}
	onGridDelete = () => {
		if (this.courseschedulestaffsData && this.courseschedulestaffsData.length == 1) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdpatte.onefacilitator');
			this.show();
			return false;
		}
		return true;
	}

	onRowClickcourseschedulestaffs(event) {
		if (event) {
			this.courseschedulestaffsModel = event;	
		}
		if(event && event.createDatetime){
			this.facilitatorsDelete=true;
		} else {
			this.facilitatorsDelete=false;
		}

	}
	onRowClickoffcourseattendances(event) {
		if (event && (event.eventOutcome === 'ATT' || event.eventOutcome === 'AB' ||
			event.eventOutcome === 'UB') && this.caseloadtype == 'COMM') {
			this.attendanceGrid.requiredOn('engagementCode');
			this.attendanceGrid.requiredOn('understandingCode');
		} else {
			this.attendanceGrid.requiredOff('engagementCode');
			this.attendanceGrid.requiredOff('understandingCode');
		}
		if (event) {
			this.rowClickOffcourseattendancesModel=event;
			this.courseschedulestaffsModelTemp.crsSchId = event.crsSchId;

			this.deliverydetailsModel.crsSchId = event.crsSchId;
			if (event.eventId) {
				this.facilitatorsInsert=true;
				if((this.staffsGrid && (this.staffsGrid.addedMap.size > 0 ||
					this.staffsGrid.updatedMap.size > 0 || this.staffsGrid.removedMap.size > 0)) || 
					(	this.deliverydetailsModel.videoReferenceId ||
						this.deliverydetailsModel.videoReferenceIdTemp && 
						this.deliverydetailsModel.videoReferenceIdTemp !== '' &&
						this.deliverydetailsModel.videoReferenceId !== this.deliverydetailsModel.videoReferenceIdTemp
					)) {
					return false;
				} else {
					this.courseschedulestaffsExecuteQuery();
					this.deliverydetailsExecuteQuery();
				}
			} else {
				this.facilitatorsInsert=false;
			}


		}
	}

	onButLocationclick() {
		if (!this.courseScheduleModel.programInstanceId) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdpatte.occurrence');
			this.show();
			return;
		} else {
			this.dialogService.openLinkDialog('/PROGLOCADIALOG', {crsActyId:this.courseScheduleModel.programInstanceId}, 80).subscribe(result => {

			});
		}


	}
	onButCatchclick = () => {

		if (!this.courseScheduleModel.crsSchId) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdpatte.ocuscupsvalidation');
			this.show();
			return;
		}
		this.dialogService.openLinkDialog('/OCUSCUPS', this.courseScheduleModel, 80).subscribe(result => {

		});

	}

	onButMFclick = () => {
		this.dialogService.openLinkDialog('/OCUMULTI', this.rowClickOffcourseattendancesModel, 80).subscribe(result => {

		});
	}
	onButExitclick() {
	}
	ok() {
	}
	no() {
	}
	cancel() {
	}
	onOffenderChange(offender) {
	}
	canCellEdit = (data: any, index: number, field: string): boolean => {
		if(data.payBatchId) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdpatte.attendancerecordhasalreadypaid');
			this.show();
			return false;
          }
		if (field === 'engagementCode' || field === 'understandingCode') {
			if (data.eventOutcome === 'ATT' || data.eventOutcome === 'AB'
				|| data.eventOutcome === 'UB') {
				return true;
			} else {
				return false;
			}

		} else {
			return true;
		}

	}


	validateRowDataAttendence = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		if (event.field === 'eventOutcome') {
			this.attendanceGrid.setColumnData('engagementCode', rowIndex, undefined);
			this.attendanceGrid.setColumnData('understandingCode', rowIndex, undefined);
			if (!event.data.eventOutcome) {
				event.unexcusedAbsenceFlag = undefined;
			}
			if ((event.data.eventOutcome === 'ATT' || event.data.eventOutcome === 'AB' ||
				event.data.eventOutcome === 'UB') && this.caseloadtype == 'COMM') {
					this.attendanceGrid.requiredOn('engagementCode');
					this.attendanceGrid.requiredOn('understandingCode');
			} else {
				this.attendanceGrid.requiredOff('engagementCode');
			  this.attendanceGrid.requiredOff('understandingCode');
			}


			if (this.caseloadtype == 'COMM') {


				if (event.eventOutcomeDbVal != event.data.eventOutcome) {


					this.offcourseattendance = new OffenderCourseAttendance();
					this.offcourseattendance.eventId = event.data.eventId;
					this.offcourseattendance.eventType = event.data.eventType;
					this.offcourseattendance.eventSubType = event.data.eventSubType;
					this.offcourseattendance.eventOutcome = event.data.eventOutcome;
					this.offcourseattendance.eventOutcomeDbVal = event.data.eventOutcomeDbVal;
					const offcourseattendance = this.ocdpatteFactory.
						checkUa(this.offcourseattendance);
					offcourseattendance.subscribe(data => {
						if (data === 0) {

						} else {
							if (data.lvOldUa) {

							}
							if (data.lvNewUa) {
								event.unexcusedAbsenceFlag = 'Y';
							}
							if (data.lvMultipleFailure) {
								this.dialogService.openLinkDialog('/OCUMULTI', this.rowClickOffcourseattendancesModel, 80).subscribe(result => {
								});
							} else {
								event.unexcusedAbsenceFlag = undefined;
							}
						}
					});
				}
			} else if (this.caseloadtype == 'INST') {
				if (this.providerType == 'Y') {
					if (event.data.eventOutcome) {
						this.offcourseattendance = new OffenderCourseAttendance();
						this.offcourseattendance.eventDate = event.data.eventDate;
						this.offcourseattendance.eventOutcome = event.data.eventOutcome;
						this.offcourseattendance.eventType = event.data.eventType;
						this.offcourseattendance = this.getActOutcomeFlag();
						event.data.payFlag = this.offcourseattendance.payFlag;
						event.data.authorisedAbsenceFlag = this.offcourseattendance.authorisedAbsenceFlag;
					}

				}
			}
		}
		if ((event.field === 'inTime' || event.field === 'outTime')) {
			if( event.data.inTime && event.data.outTime) {
			const durationVal = this.caluculateTime(event.data.inTime, event.data.outTime);;
			this.attendanceGrid.setColumnData('nbtHours', rowIndex, durationVal);
		  } else {
			this.attendanceGrid.setColumnData('nbtHours', rowIndex, undefined);
		  }
		}
		rowdata.validated = true;
		return rowdata;

	}
	getActOutcomeFlag() {

		const offcourseattendance = this.ocdpatteFactory.
			getActOutcomeFlag(this.offcourseattendance);
		offcourseattendance.subscribe(data => {
			if (data === 0) {

			} else {
				this.offcourseattendance.payFlag = data.payFlag;
				this.offcourseattendance.authorisedAbsenceFlag = data.authorisedAbsenceFlag;
				return this.offcourseattendance;
			}
		});
		return this.offcourseattendance;
	}
	onGridInsert = () => {
		this.courseScheduleStaffsColumnDef[0].link = 'ocdpatte/rgStaffNameRecordGroup?progInstId=' +
			this.courseScheduleModel.programInstanceId;
		this.staffsGrid.prepareAgColumnDef();
		return {};
	}

	staffsGridClear=() =>{
		this.courseschedulestaffsExecuteQuery();
		return true;
	}

	scheduleDateChange(event) {
		if (event) {
			this.disableClear = false;
			this.disableGoBut = false;
		} else {
			if(!this.courseScheduleModel.providerDesc && !this.courseScheduleModel.serviceId && !this.courseScheduleModel.catchUpSessionFlag ){
				this.disableClear = true;
				}
		}	
	}
	serviceChangeEvent(event) {
		if (event) {
			this.courseScheduleModel.programId=event.programId;
			this.disableGoBut = false;
			this.disableClear = false;
		} else {
			if(!this.courseScheduleModel.providerDesc && !this.courseScheduleModel.scheduleDate && !this.courseScheduleModel.catchUpSessionFlag ){
			this.disableClear = true;
			}
		}
		
	}

	providerChangeEvent(event) {
		if (event) {
			this.providerPartyId = event ? event.teamId : undefined;;

			this.disableClear = false;
			this.disableGoBut = false;
		} else {
			if(!this.courseScheduleModel.serviceId && !this.courseScheduleModel.scheduleDate && !this.courseScheduleModel.catchUpSessionFlag ){
				this.disableClear = true;
				}
		}
		
	}
	catchUpChangeEvent(event){
		if (event) {
			this.disableClear = false;
			this.disableGoBut = false;
		} else {
			if(!this.courseScheduleModel.serviceId && !this.courseScheduleModel.scheduleDate && !this.courseScheduleModel.providerDesc ){
				this.disableClear = true;
				}
		}
	}
	searchLaunchButtonClick(fromDate?) {
		if (String(fromDate.lastValue).indexOf('_') >= 0 && fromDate.value === null) {
			if(!this.courseScheduleModel.providerDesc && !this.courseScheduleModel.serviceId){
				this.disableClear=true;
			}
			this.type = 'warn';
			this.message = this.translateService.translate('common.datemustbeentervalidformat');
			this.show();
			this.courseScheduleModel.scheduleDate=undefined;
			return;
		}
		
		if (!this.courseScheduleModel.scheduleDate) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdpatte.scheduledateval');
			this.show();
			return;
		} else if (!this.providerTypeDesc) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocmsvacp.providertypemustbeentered');
			this.show();
			return;
	} else if (!this.courseScheduleModel.providerDesc) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdpatte.providerval');
			this.show();
			return;
		}
			else {
			this.disableClear = true;
			this.getcourseScheduleExecuteQuery();
		}

	}
	getproviderType() {
		if (this.sessionManager.currentCaseLoadType === 'COMM') {
			this.offCourseAttendancesColumnDef[9].hide = true;

		} else {
			this.offCourseAttendancesColumnDef[9].hide = false;
		}
		this.attendanceGrid.prepareAgColumnDef();
		const result = this.ocdpatteFactory.
			getproviderType(this.sessionManager.currentCaseLoad);
		result.subscribe(data => {
			if (data === 0) {

			} else {
				this.providerType = data;
			}

		});
	}
	getcourseScheduleExecuteQuery() {
		this.disableClear = true;
		this.disableGoBut = true;
		if (this.courseScheduleModel.providerDesc === 'INT') {
			if (this.caseloadtype === 'INST') {
			  this.courseScheduleModel.providerCode = this.courseScheduleModel.code;
			} else {
			  this.courseScheduleModel.providerPartyId = this.providerPartyId;
			}
	  
		  } else {
			this.courseScheduleModel.providerPartyId = Number(this.courseScheduleModel.code);
		  }
		this.courseScheduleModel.providerCode = this.sessionManager.currentCaseLoad;
		this.courseScheduleModel.phaseDesc = this.sessionManager.currentCaseLoadType

		const offcourseattendancesResult = this.ocdpatteFactory.
			getcourseScheduleExecuteQuery(this.courseScheduleModel);
		offcourseattendancesResult.subscribe(data => {
			if (data && data.crsSchId > 0) {
				this.offcourseattendancesData = [];
				this.disableClear = false;
				this.courseScheduleModel.startTime=DateFormat.getDate(data.startTime);
				this.courseScheduleModel.endTime=DateFormat.getDate(data.endTime);
				this.courseScheduleModel.occurrenceCode=data.occurrenceCode;
				this.courseScheduleModel.phaseDesc=data.phaseDesc;
				this.courseScheduleModel.crsSchId=data.crsSchId;
				this.courseScheduleModel.programInstanceId=data.programInstanceId;
				this.courseScheduleModel.moduleDesc=data.moduleDesc;
				this.courseScheduleModel.sessionNo=data.sessionNo;
				this.courseScheduleModel.phaseId=data.phaseId;
				if(data.scheduleStatus && data.scheduleStatus === 'CANC'){
						this.courseScheduleModel.sessioncancelledFlag=true;
				} else{
					this.courseScheduleModel.sessioncancelledFlag=false;
				}
				this.courseScheduleStaffsColumnDef[0].link = 'ocdpatte/rgStaffNameRecordGroup?progInstId=' +
				this.courseScheduleModel.programInstanceId;
				this.staffsGrid.prepareAgColumnDef();
				this.offcourseattendancesExecuteQuery();
				this.disableClear = false;
				this.disabledBtns=false;
			} else if(data && data.crsSchId === -1) {
				let modelData = JSON.parse(JSON.stringify(this.courseScheduleModel));
				if(this.caseloadtype === 'COMM' && this.providerTypeDesc === 'INT'){
					modelData.providerDesc = this.providerPartyId;
				}
					this.dialogService.openLinkDialog('/OCUSCHPR', modelData, 80).subscribe(result => {
						if (result !== null) {
							this.courseScheduleModel.catchUpSessionFlag=result.catchUpSessionFlag;
							this.courseScheduleModel.startTime=DateFormat.getDate(result.startTime);
							this.courseScheduleModel.endTime=DateFormat.getDate(result.endTime);
							this.courseScheduleModel.occurrenceCode=result.programInstanceCode;
							this.courseScheduleModel.phaseDesc=result.phaseInstanceDesc;
							this.courseScheduleModel.crsSchId=result.crsSchId;
							this.courseScheduleModel.programInstanceId=result.programInstanceId;
							this.courseScheduleModel.moduleDesc=result.moduleInstanceDesc;
							this.courseScheduleModel.sessionNo=result.sessionNo;

							if(result.scheduleStatus && result.scheduleStatus === 'CANC'){
								this.courseScheduleModel.sessioncancelledFlag=true;
							} else{
								this.courseScheduleModel.sessioncancelledFlag=false;
							}

							this.courseScheduleStaffsColumnDef[0].link = 'ocdpatte/rgStaffNameRecordGroup?progInstId=' +
							this.courseScheduleModel.programInstanceId;
							this.staffsGrid.prepareAgColumnDef();
							this.offcourseattendancesExecuteQuery();
							
						}
						this.disableClear = false;
						this.disabledBtns=false;
					});
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.querycaused');
				this.show();

				this.courseScheduleModel.startTime =undefined;
				this.courseScheduleModel.endTime = undefined;
				this.courseScheduleModel.occurrenceCode = undefined;
				this.courseScheduleModel.phaseDesc = undefined;
				this.courseScheduleModel.crsSchId = undefined;
				this.courseScheduleModel.moduleDesc = undefined;
				this.courseScheduleModel.sessionNo =undefined;
				this.courseScheduleModel.phaseId =undefined;
				this.courseScheduleModel.sessioncancelledFlag=undefined;

				this.courseScheduleStaffsColumnDef[0].link = 'ocdpatte/rgStaffNameRecordGroup?progInstId=' +
				this.courseScheduleModel.programInstanceId;
				this.staffsGrid.prepareAgColumnDef();
				this.disableClear = false;
			}
		});
	}


	offcourseattendancesExecuteQuery() {
		this.disableClear = true;
		this.disableGoBut = true;
		this.offcourseattendancesModel.caseloadType = this.caseloadtype;
		this.offcourseattendancesModel.eventDate = this.courseScheduleModel.scheduleDate;
		this.offcourseattendancesModel.crsSchId=this.courseScheduleModel.crsSchId;
		const offcourseattendancesResult = this.ocdpatteFactory.
			offCourseAttendancesExecuteQuery(this.offcourseattendancesModel);
		offcourseattendancesResult.subscribe(data => {
			if (data.length === 0) {
				this.readOnlyReferenceId=true;
				this.disableGoBut = false;
				this.offcourseattendancesData = [];
				this.disableClear = false;
				this.type = 'warn';
				this.message = this.translateService.translate('common.querycaused');
				this.show();
				return;
			} else {
				this.readOnlyReferenceId=false;
				this.offcourseattendancesData = data;
				this.offcourseattendancesModel = data[0];
				this.offcourseattendancesDataTemp = data;
				this.tableattendanceIndex = 0;
				this.readOnlyFlag=true;
				this.namesReadOnly = true;
				this.provideDisable = true;
				this.offcourseattendancesData.forEach((element, index) => {
					if (element) {
						element.payLockTemp=element.payLockFlag === 'Y'? true: false;
						element.startTime = new Date(element.inTime);
						element.endTime = new Date(element.outTime);
						if(element.inTime && element.outTime) {
							element.nbtHours  = this.caluculateTime(element.inTime , element.outTime);
						  }
						  element['payFlagVal']=element.payFlag === 'Y'? true: false;
						element.eventOutcomeDbVal = element.eventOutcome;
						if ((element.eventOutcome === 'ATT' || element.eventOutcome === 'AB' || element.eventOutcome === 'UB') &&
							this.caseloadtype == 'COMM') {
							this.attendanceGrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
								if ( ['engagementCode'].includes(obj.colId) ) {
									this.offCourseAttendancesColumnDef[6].required = true;
									obj.colDef.headerClass = 'header-col';
									this.attendanceGrid.gridApi.refreshHeader();
								}
								if ( ['understandingCode'].includes(obj.colId) ) {
									this.offCourseAttendancesColumnDef[7].required = true;
									obj.colDef.headerClass = 'header-col';
									this.attendanceGrid.gridApi.refreshHeader();
								}
							});
						} else {
							this.attendanceGrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
								if ( ['engagementCode'].includes(obj.colId) ) {
									this.offCourseAttendancesColumnDef[6].required = false;
									obj.colDef.headerClass = '';
									this.attendanceGrid.gridApi.refreshHeader();
								}
								if ( ['understandingCode'].includes(obj.colId) ) {
									this.offCourseAttendancesColumnDef[7].required = false;
									obj.colDef.headerClass = '';
									this.attendanceGrid.gridApi.refreshHeader();
								}
							});
						}
					}

				});
				this.courseScheduleStaffsColumnDef[0].link = 'ocdpatte/rgStaffNameRecordGroup?progInstId=' +
					this.courseScheduleModel.programInstanceId;
				this.staffsGrid.prepareAgColumnDef();
				this.disableClear = false;
			}
			if (this.offcourseattendancesData.length === 0 && !this.courseScheduleModel.programInstanceId) {
				this.type = 'warn';
				this.message = this.translateService.translate('common.querycaused');
				this.show();
			}

		});
	}
	courseschedulestaffsExecuteQuery() {
		this.disableGoBut = true;
		const courseschedulestaffsResult = this.ocdpatteFactory.
			courseScheduleStaffsExecuteQuery(this.courseschedulestaffsModelTemp);
		courseschedulestaffsResult.subscribe(data => {
			if (data.length === 0) {
				this.courseschedulestaffsData = [];
			} else {
				this.courseschedulestaffsData = data;
				this.courseschedulestaffsModel = data[0];
				this.tableStaffIndex = 0;
			}
			// if((this.staffsGrid && (this.staffsGrid.addedMap.size > 0 ||
			// 	this.staffsGrid.updatedMap.size > 0 || this.staffsGrid.removedMap.size > 0))) {
			// 	return false;
			// } else {
				
			// }
			
		});
	}

	deliverydetailsExecuteQuery() {
		this.disableGoBut = true;
		const deliverydetailsResult = this.ocdpatteFactory.
			deliveryDetailsExecuteQuery(this.deliverydetailsModel);
		deliverydetailsResult.subscribe(data => {
			if (data.length === 0) {
				this.deliverydetailsData = [];
			} else {
				data.forEach(element => {
					element.videoReferenceIdTemp=element.videoReferenceId;
				});
				this.deliverydetailsData = data;
				this.deliverydetailsModel=data[0];
			}			
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	ocdpatteSaveoffcourseattendancesForm(event) {
		this.offcourseattendancesUpdatetList = event.updated;
		this.offcourseattendancesCommitModel.insertList = [];
		this.offcourseattendancesCommitModel.updateList = [];
		this.offcourseattendancesCommitModel.deleteList = [];

		for (let i = 0; i < this.offcourseattendancesUpdatetList.length; i++) {
			if ((this.offcourseattendancesUpdatetList[i].eventOutcome === 'ATT' ||
				this.offcourseattendancesUpdatetList[i].eventOutcome === 'AB' ||
				this.offcourseattendancesUpdatetList[i].eventOutcome === 'UB') && this.caseloadtype == 'COMM') {
				if (!this.offcourseattendancesUpdatetList[i].engagementCode ||
					!this.offcourseattendancesUpdatetList[i].understandingCode) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.lvengagorunderstcode');
					this.show();
					return;
				} else {
					this.offcourseattendancesCommitModel.updateList = this.offcourseattendancesUpdatetList;
				}
			}

		} 
		if(this.offcourseattendancesUpdatetList.length >0){
			this.offcourseattendancesCommitModel.updateList = this.offcourseattendancesUpdatetList;
		}

		if (this.offcourseattendancesCommitModel.updateList && this.offcourseattendancesCommitModel.updateList.length > 0) {
			const offcourseattendances = this.ocdpatteFactory.offCourseAttendancesCommit
				(this.offcourseattendancesCommitModel);
			offcourseattendances.subscribe(data => {
				if (data === 1) {
					this.type = 'success';
					this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
					this.show();
					this.offcourseattendancesExecuteQuery();
					return;
				} else {
					this.type = 'warn';
					this.message = this.translateService.translate('common.addupdateremoverecordfailed');
					this.show();
					this.offcourseattendancesExecuteQuery();
					return;
				}
			});
		}

	}

	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	ocdpatteSavecourseschedulestaffsForm(event) {
		// TODO declare commit bean and add insert list to that object.
		this.courseschedulestaffsInsertList = event.added;
		this.courseschedulestaffsUpdatetList = event.updated;
		this.courseschedulestaffsDeleteList = event.removed;
		this.courseschedulestaffsCommitModel.insertList = [];
		this.courseschedulestaffsCommitModel.updateList = [];
		this.courseschedulestaffsCommitModel.deleteList = [];
		if (this.courseschedulestaffsInsertList.length > 0) {
			for (let i = 0; i < this.courseschedulestaffsInsertList.length; i++) {
				this.courseschedulestaffsInsertList[i].crsSchId = this.offcourseattendancesModel.crsSchId;
				if (!this.courseschedulestaffsInsertList[i].staffId &&
					!this.courseschedulestaffsInsertList[i].staffRole) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.faciltatormsg');
					this.show();
					return;
				} else if (!this.courseschedulestaffsInsertList[i].staffId) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.staffnamemsg');
					this.show();
					return;
				} else if (!this.courseschedulestaffsInsertList[i].staffRole) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.staffrolemsg');
					this.show();
					return;
				} else {
					this.courseschedulestaffsCommitModel.insertList = this.courseschedulestaffsInsertList;
				}

				for(let j=0;j<this.courseschedulestaffsData.length;j++){
					const index=this.courseschedulestaffsData.indexOf(this.courseschedulestaffsInsertList[i]);
					if(index != j && this.courseschedulestaffsData[j].crsSchId === this.courseschedulestaffsInsertList[i].crsSchId && this.courseschedulestaffsData[j].staffId === this.courseschedulestaffsInsertList[i].staffId && this.courseschedulestaffsData[j].staffRole === this.courseschedulestaffsInsertList[i].staffRole){
						this.type = 'warn';
						this.message = this.translateService.translate('ocdpatte.insertvalidation');
						this.show();
						return;
					}

				}

			}
		}
		if (this.courseschedulestaffsUpdatetList.length > 0) {
			for (let i = 0; i < this.courseschedulestaffsUpdatetList.length; i++) {

				if (!this.courseschedulestaffsUpdatetList[i].staffId &&
					!this.courseschedulestaffsUpdatetList[i].staffRole) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.faciltatormsg');
					this.show();
					return;
				} else if (!this.courseschedulestaffsUpdatetList[i].staffId) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.staffnamemsg');
					this.show();
					return;
				} else if (!this.courseschedulestaffsUpdatetList[i].staffRole) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.staffrolemsg');
					this.show();
					return;
				} else {
					this.courseschedulestaffsCommitModel.updateList = this.courseschedulestaffsUpdatetList;
				}

				for(let j=0;j<this.courseschedulestaffsData.length;j++){
					const index=this.courseschedulestaffsData.indexOf(this.courseschedulestaffsUpdatetList[i]);
					if(index != j && this.courseschedulestaffsData[j].crsSchId === this.courseschedulestaffsUpdatetList[i].crsSchId && this.courseschedulestaffsData[j].staffId === this.courseschedulestaffsUpdatetList[i].staffId && this.courseschedulestaffsData[j].staffRole === this.courseschedulestaffsUpdatetList[i].staffRole){
						this.type = 'warn';
						this.message = this.translateService.translate('ocdpatte.insertvalidation');
						this.show();
						return;
					}

				}

			}
		}

		if (this.courseschedulestaffsDeleteList.length > 0) {
			for (let i = 0; i < this.courseschedulestaffsDeleteList.length; i++) {
				this.courseschedulestaffsCommitModel.deleteList = this.courseschedulestaffsDeleteList;
			}

		}
		const courseschedulestaffsSaveData = this.ocdpatteFactory.courseScheduleStaffsCommit
			(this.courseschedulestaffsCommitModel);
		courseschedulestaffsSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.courseschedulestaffsExecuteQuery();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
				this.courseschedulestaffsExecuteQuery()
			}
		});
	}

	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	ocdpatteSavedeliverydetailsForm(event) {

		this.deliverydetailsInsertList = event.added;
		this.deliverydetailsUpdatetList = event.updated;
		this.deliverydetailsCommitModel.insertList = [];
		this.deliverydetailsCommitModel.updateList = [];
		this.deliverydetailsCommitModel.deleteList = [];
		if (this.deliverydetailsInsertList.length > 0) {
			for (let i = 0; i < this.deliverydetailsInsertList.length; i++) {
				this.deliverydetailsInsertList[i].crsSchId=this.courseschedulestaffsModel.crsSchId
			}
			this.deliverydetailsCommitModel.insertList = this.deliverydetailsInsertList;
			
		}
		if(this.deliverydetailsUpdatetList.length>0){
			this.deliverydetailsCommitModel.updateList = this.deliverydetailsUpdatetList;
		}

		const deliverydetailsSaveData = this.ocdpatteFactory.deliveryDetailsCommit(this.deliverydetailsCommitModel);
		deliverydetailsSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.deliverydetailsExecuteQuery();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
				this.deliverydetailsExecuteQuery();;
			}
		});
	}
	clear() {
		this.courseScheduleModel = new CourseSchedules();
		this.offcourseattendancesData = [];
		this.courseschedulestaffsData = [];
		this.deliverydetailsModel=new CourseSchedules();
		this.facilitatorsInsert=false;
		this.disabledBtns=true;
		this.attendanceGrid.prepareAgColumnDef();
		this.readOnlyFlag=false;
		this.disableGoBut=false;
		this.disableClear=true;
		this.providerTypeDesc='';
		this.provideDisable = true;
		this.namesReadOnly = false;


	}

	get saveDisable() {
        if ((this.attendanceGrid && (this.attendanceGrid.addedMap.size > 0 ||
             this.attendanceGrid.updatedMap.size > 0 || this.attendanceGrid.removedMap.size > 0)) ||
        (this.staffsGrid && (this.staffsGrid.addedMap.size > 0 ||
             this.staffsGrid.updatedMap.size > 0 || this.staffsGrid.removedMap.size > 0)) ||
        (this.deliverydetailsModel.videoReferenceIdTemp !== this.deliverydetailsModel.videoReferenceId)) {
            return false;
        } else {
            return true;
        }
    }

	save(){
		this.ocdpatteCommiteBean=new OcdpatteCommitBean();
		this.offcourseattendancesCommitModel = new OffenderCourseAttendancesCommitBean();
		this.courseschedulestaffsCommitModel= new CourseScheduleStaffsCommitBean();
		this.offcourseattendancesUpdatetList = [];
		this.offcourseattendancesCommitModel.insertList = [];
		this.offcourseattendancesCommitModel.updateList = [];
		this.offcourseattendancesCommitModel.deleteList = [];

		this.courseschedulestaffsInsertList = [];
		this.courseschedulestaffsUpdatetList = [];
		this.courseschedulestaffsDeleteList = [];
		this.courseschedulestaffsCommitModel.insertList = [];
		this.courseschedulestaffsCommitModel.updateList = [];
		this.courseschedulestaffsCommitModel.deleteList = [];

		this.attendanceGrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.offcourseattendancesUpdatetList.push(v);
            }
        );

		this.staffsGrid.addedMap.forEach(
            (v: any, k: number) => {
                this.courseschedulestaffsInsertList.push(v);
            }
        );

        this.staffsGrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.courseschedulestaffsUpdatetList.push(v);
            }
        );

        this.staffsGrid.removedMap.forEach(
            (v: any, k: number) => {
                this.courseschedulestaffsDeleteList.push(v);
            }
        );

		for (let i = 0; i < this.offcourseattendancesUpdatetList.length; i++) {
			if ((this.offcourseattendancesUpdatetList[i].eventOutcome === 'ATT' ||
				this.offcourseattendancesUpdatetList[i].eventOutcome === 'AB' ||
				this.offcourseattendancesUpdatetList[i].eventOutcome === 'UB') && this.caseloadtype == 'COMM') {
				if (!this.offcourseattendancesUpdatetList[i].engagementCode ||
					!this.offcourseattendancesUpdatetList[i].understandingCode) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.lvengagorunderstcode');
					this.show();
					return;
				} else {
					this.offcourseattendancesCommitModel.updateList = this.offcourseattendancesUpdatetList;
				}
			}

		} 
		if(this.offcourseattendancesUpdatetList.length >0){
			this.offcourseattendancesCommitModel.updateList = this.offcourseattendancesUpdatetList;
		}

		if (this.courseschedulestaffsInsertList.length > 0) {
			for (let i = 0; i < this.courseschedulestaffsInsertList.length; i++) {
				this.courseschedulestaffsInsertList[i].crsSchId = this.offcourseattendancesModel.crsSchId;
				if (!this.courseschedulestaffsInsertList[i].staffId) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.staffnamevalidaion');
					this.show();
					return;
				} else if (!this.courseschedulestaffsInsertList[i].staffRole) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.staffrolevalidaion');
					this.show();
					return;
				} else {
					this.courseschedulestaffsCommitModel.insertList = this.courseschedulestaffsInsertList;
				}

				for(let j=0;j<this.courseschedulestaffsData.length;j++){
					const index=this.courseschedulestaffsData.indexOf(this.courseschedulestaffsInsertList[i]);
					if(index != j && this.courseschedulestaffsData[j].crsSchId === this.courseschedulestaffsInsertList[i].crsSchId && this.courseschedulestaffsData[j].staffId === this.courseschedulestaffsInsertList[i].staffId && this.courseschedulestaffsData[j].staffRole === this.courseschedulestaffsInsertList[i].staffRole){
						this.type = 'warn';
						this.message = this.translateService.translate('ocdpatte.insertvalidation');
						this.show();
						return;
					}

				}

			}
		}
		if (this.courseschedulestaffsUpdatetList.length > 0) {
			for (let i = 0; i < this.courseschedulestaffsUpdatetList.length; i++) {

				if (!this.courseschedulestaffsUpdatetList[i].staffId) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.staffnamevalidaion');
					this.show();
					return;
				} else if (!this.courseschedulestaffsUpdatetList[i].staffRole) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdpatte.staffrolevalidaion');
					this.show();
					return;
				} else {
					this.courseschedulestaffsCommitModel.updateList = this.courseschedulestaffsUpdatetList;
				}

				for(let j=0;j<this.courseschedulestaffsData.length;j++){
					const index=this.courseschedulestaffsData.indexOf(this.courseschedulestaffsUpdatetList[i]);
					if(index != j && this.courseschedulestaffsData[j].crsSchId === this.courseschedulestaffsUpdatetList[i].crsSchId && this.courseschedulestaffsData[j].staffId === this.courseschedulestaffsUpdatetList[i].staffId && this.courseschedulestaffsData[j].staffRole === this.courseschedulestaffsUpdatetList[i].staffRole){
						this.type = 'warn';
						this.message = this.translateService.translate('ocdpatte.insertvalidation');
						this.show();
						return;
					}

				}

			}
		}

		if (this.courseschedulestaffsDeleteList.length > 0) {
			for (let i = 0; i < this.courseschedulestaffsDeleteList.length; i++) {
				this.courseschedulestaffsCommitModel.deleteList = this.courseschedulestaffsDeleteList;
			}

		}

		this.ocdpatteCommiteBean.offCrsCommitBean=this.offcourseattendancesCommitModel;
		this.ocdpatteCommiteBean.crsSchCommitBean=this.courseschedulestaffsCommitModel;
		this.ocdpatteCommiteBean.deliveryDetailsModel=this.deliverydetailsModel;
		let searchObj = new EventMeasures();
		searchObj.eventType = 'ACP';
		searchObj.eventSubType = 'PROG_SESS';
		this.ocdpatteFactory.cancelFlagOutcomeList(searchObj).subscribe(data => {
			let cancelFalgOutcomes = data ? data : [];
			for (let i = 0; i < this.offcourseattendancesUpdatetList.length; i++) {
				if (DateFormat.compareDate(DateFormat.getDate(this.offcourseattendancesUpdatetList[i].eventDate), DateFormat.getDate()) == 1) {
					if (!cancelFalgOutcomes || !cancelFalgOutcomes.filter(ele => ele.outcomeCode == this.offcourseattendancesUpdatetList[i].eventOutcome)[0]) {
						this.type = 'warn';
						this.message = this.translateService.translate('ocdpatte.futurecanbesavedwithcancflag');
						this.show();
						return;
					}
				}
			}
			const ocdpatteCommiteBeanSaveData = this.ocdpatteFactory.ocdpatteCommitBean(this.ocdpatteCommiteBean);
		ocdpatteCommiteBeanSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.offcourseattendancesExecuteQuery();
				this.courseschedulestaffsExecuteQuery();
				this.deliverydetailsExecuteQuery();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
				this.offcourseattendancesExecuteQuery();
				this.courseschedulestaffsExecuteQuery();
				this.deliverydetailsExecuteQuery();;
			}
		});
		})
	}
	onRelationshipBlurFive() {
        if (!this.providerTypeDesc) {
            this.providerTypeDesc = this.providerTypeDesc === '' ? undefined : '';
        }
    }

	providerLovChange(event) {
		if(event){
		this.provideDisable = false;

		if (this.providerTypeDesc) {
		  
		if (this.providerTypeDesc === 'INT') {
		  if (this.caseloadtype === 'INST') {
			this.providerSource = 'OUMAGLOC'
			this.providerLink = 'ocdpatte/rgAgyLocsRecordGroup?caseLoadId=' + this.caseLoadId;	
			this.courseScheduleModel.providerPartyClass = 'AGY';
					
		  } else {
			this.providerSource = 'OCMTEAMMAIN';
			this.providerLink = 'ocdpatte/rgTeamAgyLocsRecordGroup?caseLoadId=' + this.caseLoadId;
			this.courseScheduleModel.providerPartyClass = 'TEAM';				
		  }
	
	
		} else {
			this.providerSource = 'OUMAGENC'
		  this.providerLink = 'ocdpatte/rgCorpLocsRecordGroup';
		
		   this.courseScheduleModel.providerPartyClass = 'CORP';
		}
	
	  }
	}
	
	  }
	  progServicesExecuteQuery() {
        const searchResult = this.ocmpssetService.progServSettingExecuteQuery();
        searchResult.subscribe(data => {
            if (data.length === 0) {
                this.prgSrvSetModel = new ProgramPaySettingsBean();
            } else {
                this.prgSrvSetModel = data[0];
                if ( this.prgSrvSetModel.payFlag === 'Y') {
                    this.offCourseAttendancesColumnDef[this.offCourseAttendancesColumnDef.length - 1].hide = 'false';
                    this.offCourseAttendancesColumnDef[this.offCourseAttendancesColumnDef.length - 2].hide = 'false';
                    this.attendanceGrid.prepareAgColumnDef();
                }
            }
        });
      }
	caluculateTime(startTime, endTime) {
		const h = Math.abs(DateFormat.getDate(startTime).getTime() -
			DateFormat.getDate(endTime).getTime()) / 36e5;
		var n = new Date(0, 0);
		n.setSeconds(+h * 60 * 60);
		const hours = n.getHours();
		const minutes = n.getMinutes();
		const datval = DateFormat.getDate(DateFormat.getDate().setHours(hours, minutes, 0, 0));
		return datval;
	}
	
}


