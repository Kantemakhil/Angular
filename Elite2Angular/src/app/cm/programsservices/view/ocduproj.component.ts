import {
	Component, OnInit,
	ViewChild,
	AfterViewInit,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcduprojService } from '../service/ocduproj.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderSentCondActs } from '../beans/VOffenderSentCondActs';
import { OffenderProgramProfiles } from '@instprogramswithoutschedulesbeans/OffenderProgramProfiles';
import { VOffenderCourseEvents } from '@inst/institutional-activities/beans/VOffenderCourseEvents';
import { VOffenderCourseEventsCommitBean } from '@inst/institutional-activities/beans/VOffenderCourseEventsCommitBean';
import { OffenderCourseSkills } from '../beans/OffenderCourseSkills';
import { OffenderUnpaidWorkAdj } from '../beans/OffenderUnpaidWorkAdj';
import { OffenderProgramProfilesCommitBean } from '@instprogramswithoutschedulesbeans/OffenderProgramProfilesCommitBean';
import { OffenderCourseSkillsCommitBean } from '../beans/OffenderCourseSkillsCommitBean';
import { OffenderUnpaidWorkAdjCommitBean } from '../beans/OffenderUnpaidWorkAdjCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { Router } from '@angular/router';
import { OcdclogsService } from '@iwp/service/ocdclogs.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { StaffDetails } from '@common/workspace/beans/StaffDetails';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OidononaService } from '@common/offender-records/service/oidonona.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { VOffenderProgramProfiles } from '@instinstitutionalactivitiesbeans/VOffenderProgramProfiles';
import { OnDestroy } from '@angular/core';
import { SchedulerService } from '@core/ui-components/schedule/scheduler.service';
import { EventMeasures } from '@iwp/beans/EventMeasures';
import { EventMeasureOutcomes } from '@iwp/beans/EventMeasureOutcomes';
import { EoffenderService } from '@common/iwp/service/eoffender.service';

@Component({
	selector: 'app-ocduproj',
	templateUrl: './ocduproj.component.html'
})

export class OcduprojComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	@ViewChild('projalloctab', { static: true }) projalloctab: any;
	@ViewChild('creditadjtab', { static: true }) creditadjtab: any;
	@ViewChild('attendanceGrid') attendanceGrid: any;//
	@ViewChild('skills') skills: any;
	@ViewChild('grid', { static: true }) grid: any;
	viewLink: string;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	unpaidwkData: VOffenderSentCondActs[] = [];
	unpaidwkDataTemp: VOffenderSentCondActs[] = [];
	unpaidwkModel: VOffenderSentCondActs = new VOffenderSentCondActs();
	unpaidwkBean: VOffenderSentCondActs = new VOffenderSentCondActs();
	unpaidwkIndex: number;
	unpaidwkInsertList: VOffenderSentCondActs[] = [];
	unpaidwkUpdatetList: VOffenderSentCondActs[] = [];
	unpaidwkDeleteList: VOffenderSentCondActs[] = [];
	projallocData: OffenderProgramProfiles[] = [];
	projallocDataTempOne: OffenderProgramProfiles[] = [];
	projallocDataTemp: OffenderProgramProfiles[] = [];
	projallocModel: OffenderProgramProfiles = new OffenderProgramProfiles();
	projallocTempModel: VOffenderProgramProfiles = new VOffenderProgramProfiles();
	projallocModelData: OffenderProgramProfiles = new OffenderProgramProfiles();
	projallocModelDataTemp1: OffenderProgramProfiles = new OffenderProgramProfiles();
	projallocIndex: number;
	projallocInsertList: OffenderProgramProfiles[] = [];
	projallocUpdateList: OffenderProgramProfiles[] = [];
	projallocDeleteList: OffenderProgramProfiles[] = [];
	attendanceData: VOffenderCourseEvents[] = [];
	attendanceDataTemp: VOffenderCourseEvents[] = [];
	attendanceModel: VOffenderCourseEvents = new VOffenderCourseEvents();
	attendanceModelTemp: VOffenderCourseEvents = new VOffenderCourseEvents();
	attendanceIndex: number;
	attendanceInsertList: VOffenderCourseEvents[] = [];
	attendanceUpdatetList: VOffenderCourseEvents[] = [];
	attendanceDeleteList: VOffenderCourseEvents[] = [];
	skillsData: OffenderCourseSkills[] = [];
	skillsDataTemp: OffenderCourseSkills[] = [];
	skillsModelTemp: OffenderCourseSkills = new OffenderCourseSkills();
	skillsIndex: number;
	skillsInsertList: OffenderCourseSkills[] = [];
	skillsUpdatetList: OffenderCourseSkills[] = [];
	skillsDeleteList: OffenderCourseSkills[] = [];
	skillsCommitModel: OffenderCourseSkillsCommitBean = new OffenderCourseSkillsCommitBean;
	skillsModel: OffenderCourseSkills = new OffenderCourseSkills();
	creditadjData: OffenderUnpaidWorkAdj[] = [];
	creditadjDataTemp: OffenderUnpaidWorkAdj[] = [];
	creditadjModel: OffenderUnpaidWorkAdj = new OffenderUnpaidWorkAdj();
	creditadjModelTemp: OffenderUnpaidWorkAdj = new OffenderUnpaidWorkAdj();
	creditadjIndex: number;
	creditadjInsertList: OffenderUnpaidWorkAdj[] = [];
	creditadjUpdatetList: OffenderUnpaidWorkAdj[] = [];
	creditadjDeleteList: OffenderUnpaidWorkAdj[] = [];
	block: VHeaderBlock[] = [];
	creditadjCommitModel: OffenderUnpaidWorkAdjCommitBean = new OffenderUnpaidWorkAdjCommitBean;
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	//disabled: boolean;
	editable: boolean;
	projAllocInsert: boolean;
	projAllocDelete: boolean;
	skillsInsert: boolean;
	scheduleDisable: boolean;
	skillsColumnDef: any[];
	unpaidWkColumnDef: any[];
	projAllocColumnDef: any[];
	creditAdjColumnDef: any[];
	attendanceColumnDef: any[];
	unpaidWkReadOnly: boolean;
	projAllocReadOnly: boolean = false;
	alertInsert: boolean = false;
	alertDelete: boolean = false;
	onGridDelete: boolean = false;
	//onGridClear: boolean = false;
	tableIndex: number;
	tableIndexOne: number;
	ctlBlkReadOnly: boolean = false;
	ctrlBlkReadOnly: boolean = false;
	attendanceReadOnly: boolean = false;
	skillsReadOnly: boolean;
	creditAdjReadOnly: boolean = false;
	skillsDisabled: boolean;
	skillsUpdate: boolean;
	tableIndexatten: number;
	rgviewRg: any[] = [];
	rgattendanceRg: any[] = [];
	rgsupervisorRg: any[] = [];
	rgbehaviourRg: any[] = [];
	rgworkqualityRg: any[] = [];
	rgprojectcheckRg: any[] = [];
	rgprojectRg: any[] = [];
	rgskillsRg: any[] = [];
	rgstaffcheckRg: any[] = [];
	rgdebitcreditRg: any[] = [];
	rgadjreasonRg: any[] = [];
	staffdetailsSearchModel: StaffDetails = new StaffDetails();
	projallocCommitModel: OffenderProgramProfilesCommitBean = new OffenderProgramProfilesCommitBean();
	attendanceCommitModel: VOffenderCourseEventsCommitBean = new VOffenderCourseEventsCommitBean;
	vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
	headerModel: VHeaderBlock = new VHeaderBlock();
	backBtn: boolean;
	viewtitle: {};
	project: string;
	projectViewDisable: boolean;
	superviserLink: string;
	courseCodeDisabled: boolean;
	commentTextDisabled: boolean;
	offenderBookidTemp: any;
	sentenceSeqTemp: any;
	description: string;
	attendencedeScriptionDisabled: true;
	viewTemp: string;
	averageWeekHours: any;
	courseCodeDisabled1: boolean;
	viewRedOnly: boolean;
	scheduleButton: boolean;
	enableSkillInsert: boolean;
	backButton: boolean;
	activeFlagCount: number;
	title = { description: this.translateService.translate('common.description') };
	teamtitles = { description: this.translateService.translate('ocduproj.attendance'), code: 'Code' };

	supervisorTitle = { 'description': this.translateService.translate('Supervisor'), 'codes': this.translateService.translate('ocduproj.userid') };
	beahavior = { 'description': this.translateService.translate('ocduproj.behaviour'), 'code': this.translateService.translate('Code') };
	workQuality = { 'description': this.translateService.translate('ocduproj.workquality'), 'code': this.translateService.translate('Code') }
	recordProjTitle = {
		code: this.translateService.translate('common.code'),
		description: this.translateService.translate('common.description')
	};
	courseCode: any;
	delete: number;
	inTimeAtte: number;
	outTimeAtte: number;
	remaingTemp: any;
	outdata: Date;
	nbtDate: Date;
	nbtTeam: string
	nbtProject: string;
	nbtTeamId: string;
	offcourseattendModel: VOffenderCourseEvents = new VOffenderCourseEvents();
	offenderinnonassociation: any;
	pgrServiceList: any[];
	projectOptions: { code: string; description: string; listSeq: number; }[];
	orderStatusData: any = [];
	screenId='OCDUPROJ';
	cancelFlagOutcomesList : EventMeasureOutcomes [] =[];

	constructor(private ocduprojFactory: OcduprojService, public translateService: TranslateService,
		public sessionManager: UserSessionManager, public dialogService: DialogService,
		private router: Router, private ocdclogsFactory: OcdclogsService, private component: OidononaService, 
		private schedularService: SchedulerService, private eoffenderService: EoffenderService) {
		this.skillsColumnDef = [];
		this.unpaidWkColumnDef = [];
		this.projAllocColumnDef = [];
		this.creditAdjColumnDef = [];
		this.attendanceColumnDef = [];
	}
	ngOnInit() {
		this.getCancelFlagOutcomes();
		if (this.ocduprojFactory.ocduprojBackBtnFlag || this.schedularService.backBtnFlag) {
			this.offcourseattendModel = this.ocduprojFactory.ocduatteScreenObj;
			this.backButton = true;
		} else {
			this.backButton = false;
		}

		
		if (this.ocduprojFactory.backBtnEnable) {
			this.backBtn = true;
		}

		if (this.ocdclogsFactory.exitFlag) {
			this.backBtn = true;
		}
		this.getOrderStatus();
		this.unpaidWkColumnDef = [// Grid1
			{ fieldName: this.translateService.translate('common.court'), field: 'courtName', editable: false, width: 150, datatype: 'string' },//this.translateService.translate('common.court')
			{ fieldName: this.translateService.translate('ocduproj.caseno'), field: 'caseInfoNumber', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('ocduproj.line'), field: 'sentenceSeqNo', editable: false, width: 150, datatype: 'text' },
			{ fieldName: this.translateService.translate('ocduproj.category'), field: 'sentenceCategory', editable: false, width: 150, datatype: 'string' },
			{ fieldName: this.translateService.translate('ocduproj.legalorder'), field: 'sentenceDesc', editable: false, width: 150, datatype: 'string' },
			{ fieldName: this.translateService.translate('common.startdate'), field: 'conditionStartDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('common.enddate'), field: 'conditionEndDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('common.length'), field: 'conditionLength', editable: false, width: 150, datatype: 'text' },
			{
				fieldName: this.translateService.translate('ocduproj.credited'), field: 'creditedUnits', editable: false, width: 150, datatype: 'number',
				minValue: 0.00, strictFP: true, whole: true, format: '2.2-2'
			},
			{
				fieldName: this.translateService.translate('ocduproj.remaining'), field: 'remaining', editable: false, width: 150, datatype: 'number',
				minValue: 0.00, strictFP: true, whole: true, format: '2.2-2'
			},
			{ fieldName: this.translateService.translate('common.status'), field: 'sentenceStatusDesc', editable: false, width: 150, datatype: 'lov', link: 'ocmpconf/rgOrderStatus?orderType=COND' },
			{
				fieldName: this.translateService.translate('common.iwpdocument')
				, field: 'butIwp', datatype: 'hyperlink',onLaunchClick: this.onEoffenderClick,
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
			},
			{ fieldName: '', field: 'sentenceSeq', hide: true },
			{ fieldName: '', field: 'offenderSentConditionId', hide: true },
			{ field: 'conActiveType', hide: true }

		];
		this.projAllocColumnDef = [ //Grid2
			{ fieldName: this.translateService.translate('ocduproj.projectcode'), field: 'projectCode', editable: false, width: 150, required: true, datatype: 'text' }, //datatype: 'lov', link:'ocduproj/rgProjectCheckRecordGroup',
			{ fieldName: '', field: 'btn', width: 150, datatype: 'hyperlink', editable: true,
			displayas: 'href', dialogWidth: '80%', styleClass: 'search', onLaunchClick: this.viewLaunchClick,
			modal: true, data: 'row', updateField: 'row' },
			{ fieldName: this.translateService.translate('common.description'), field: 'projectDescription', editable: false, width: 150, datatype: 'text' },
			{ fieldName: this.translateService.translate('common.team'), field: 'teamDescription', editable: false, width: 150, datatype: 'text' },
			{ fieldName: this.translateService.translate('ocduproj.maxcapacity'), field: 'maxCapacity', editable: false, width: 150, datatype: 'number' },
			{
				fieldName: this.translateService.translate('ocduproj.offstartdate'), field: 'offenderStartDate', editable: true, required: true, width: 150, datatype: 'date', 
			},
			{ fieldName: this.translateService.translate('ocduproj.travelfare'), field: 'agreedTravelFare1', editable: true, width: 150, datatype: 'number', whole: true, format: '1.2-2', cellEditable: this.statusCellEdit },
			{ fieldName: this.translateService.translate('ocduproj.traveltime'), field: 'agreedTravelHour', editable: true, width: 150, datatype: 'time', cellEditable: this.statusCellEdit },
			{ fieldName: this.translateService.translate('ocduproj.offenderenddate'), field: 'offenderEndDate', editable: true, width: 150, datatype: 'date', cellEditable: this.statusCellEdit },
			{ fieldName: this.translateService.translate('Status'), field: 'offenderProgramStatus', editable: true, width: 150, datatype: 'lov', domain: 'OFF_PRG_STS', cellEditable: this.statusCellEdit },
			{ fieldName: '', field: 'programId', hide: true },
			{ fieldName: '', field: 'crsActyId', hide: true },
			{ fieldName: '', field: 'rejDate', hide: true },
			{ fieldName: '', field: 'offEndDate', hide: true },
			{
				fieldName: ' ', field: 'reminder', datatype: 'launchbutton', editable: true, width: 100,
				data: 'row', updateField: 'row', modal: true, onLaunchClick: this.viewLaunchRemender
			}

		];
		this.attendanceColumnDef = [//Grid 3
			{ fieldName: this.translateService.translate('common.date'), field: 'eventDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('ocduproj.attendancemandit'), field: 'eventOutcome', editable: true, width: 300, required: true, datatype: 'lov', link: 'ocduproj/rgAttendanceRecordGroup', titles: this.teamtitles, source: 'OCMEVENT' },
			{ fieldName: this.translateService.translate('ocduproj.starttime'), field: 'inTime', editable: true, width: 150, datatype: 'time', required: true },
			{ fieldName: this.translateService.translate('ocduproj.endtime'), field: 'outTime', editable: true, width: 150, datatype: 'time' },
			{ fieldName: this.translateService.translate('ocduproj.hours'), field: 'nbtHours', editable: false, width: 150, datatype: 'time' },
			{ fieldName: this.translateService.translate('ocduproj.travel'), field: 'agreedTravelFare', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('ocduproj.penalty'), field: 'penalty', editable: false, width: 150, datatype: 'time', cellEditable: this.penaltyEdit },
			{ fieldName: this.translateService.translate('ocduproj.credit'), field: 'nbtCreditedHours', editable: false, width: 150, datatype: 'time' },
			{
				fieldName: this.translateService.translate('ocduproj.supervisor'), field: 'supervisorStaffId', editable: true, width: 150, datatype: 'lov', link: 'ocduproj/rgSupervisorRecordGroup?crsActyId=', source: 'OCMTEAMMAIN',
				titles: this.supervisorTitle, cellEditable: this.attandanceEditSuper,parentField: 'crsActyId'
			},
			{ fieldName: this.translateService.translate('ocduproj.behavior'), field: 'behaviourCode', editable: true, width: 150, datatype: 'lov', domain: 'PS_BEHAVIOUR', titles: this.beahavior },
			{ fieldName: this.translateService.translate('ocduproj.workquality'), field: 'performanceCode', editable: true, width: 150, datatype: 'lov', domain: 'PS_UPW_QUAL', titles: this.workQuality },
			{ fieldName: '', field: 'commentText', editable: false, width: 150, hide: true },
			{ fieldName: '', field: 'description', editable: false, width: 150, hide: true },
			{ fieldName: '', field: 'courseCode', editable: false, width: 150, hide: true },
			{ fieldName: '', field: 'pCode', editable: false, width: 150, hide: true },
			{ fieldName: '', field: 'crsActyId', hide: true }
		];
		this.skillsColumnDef = [//Grid 4
			{ fieldName: this.translateService.translate('ocduproj.skills'), field: 'skillCode', editable: true, width: 150, datatype: 'lov', link: 'ocduproj/rgSkillsRecordGroup', domain: 'PS_UPW_SKILL' },
			{ fieldName: this.translateService.translate('ocduproj.hoursmanditory'), field: 'noOfHours', editable: true, width: 150, datatype: 'time', },
			{ fieldName: this.translateService.translate('ocduproj.tutorstaff'), field: 'firstName', editable: false, width: 150, }, //datatype: 'lov', link: '',
			{ fieldName: '', field: 'btn', editable: true, width: 150, datatype: 'hyperlink', displayas: 'href',
				dialogWidth: '80%', styleClass: 'search', onLaunchClick: this.viewStaffClick,
				modal: true, data: 'row', updateField: 'row' },
			{ fieldName: this.translateService.translate('ocduproj.commentnotes'), field: 'commentText', editable: true, width: 150, datatype: 'text', maxlength: 240, uppercase: 'false' },
			{ fieldName: '', field: 'staffRole', editable: false, width: 150, hide: true },
			{ fieldName: '', field: 'staffId', editable: false, width: 150, hide: true },
		];
		this.creditAdjColumnDef = [//Grid 5
			{ fieldName: this.translateService.translate('common.datemandatory'), field: 'adjustmentDate', editable: false, cellEditable: this.creditAdjEdit, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('ocduproj.adjustment'), field: 'adjustmentMinutes', editable: true, cellEditable: this.creditAdjEdit, width: 150, datatype: 'time' },
			{
				fieldName: this.translateService.translate('ocduproj.debitcredit'), field: 'adjustmentType', editable: true, cellEditable: this.creditAdjEdit, width: 150, uppercase: 'true',
				datatype: 'lov', link: 'ocduproj/reaonsReferenceCodes', titles: this.title
			},
			{ fieldName: this.translateService.translate('ocduproj.reason'), field: 'reasonCode', editable: true, width: 300, cellEditable: this.creditAdjEdit, datatype: 'lov', domain: 'PS_ADJ_REA', },
			{ fieldName: this.translateService.translate('common.comments'), field: 'commentText', editable: true, cellEditable: this.creditAdjEdit, width: 150, datatype: 'text', maxlength: 240, uppercase: 'false' },
 			{ fieldName: this.translateService.translate('ocduproj.createdby'), field: 'createUserId', editable: false, width: 150 },
		];

		this.viewLink = 'ocduproj/viewLink';
		this.averageWeekHours = '00:00';
		this.projAllocDelete = false;
		this.skillsInsert = false;
		this.scheduleDisable = true;
		this.projAllocInsert = false;
		this.onGridDelete = false;
		this.enableSkillInsert = false;
		this.viewtitle = { description: 'View' };
		this.scheduleButton = true;
		this.sentenceSeqTemp = undefined;

	}

	ngAfterViewInit(): void {
		this.attendanceModel.view = '2';
	}

	onBack() {
		if(this.schedularService.backBtnFlag){
			this.schedularService.backBtnFlag = false;
			this.router.navigate(['/CALSCH']);
		} else{
			this.ocduprojFactory.ocduprojScreenObj = this.offcourseattendModel;
			this.ocduprojFactory.ocduprojBackBtnFlag = false;
			this.ocduprojFactory.ocduatteBackBtnFlag = true;
			this.router.navigate(['/OCDUATTE']);
		}
	}

	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}
	onOffenderChange(offender) {
		if (offender) {
			this.vHeaderBlockModel = offender;
			this.getActiveFlagCount(this.vHeaderBlockModel.offenderId);
			if (this.vHeaderBlockModel.offenderBookId) {
				this.attendanceGrid.prepareAgColumnDef();
				this.averageWeekHours = '00:00';
			}
			this.scheduleDisable = true;
			this.ocduprojexecuteQuery();
		} else {
			this.unpaidwkData = [];
			this.projallocData = [];
			this.attendanceData = [];
			this.skillsData = [];
			this.creditadjData = [];
			this.averageWeekHours = '';
			this.courseCode = undefined;
			this.attendanceModelTemp.commentText = "";
			this.attendanceModelTemp.courseCode = "";
			this.projAllocInsert = false;
			this.scheduleDisable = false;
			this.skillsInsert = false;
			this.courseCodeDisabled1 = true;
			this.commentTextDisabled = true;
			this.viewRedOnly = true;
			this.attendanceModel.view = "2";
			this.enableSkillInsert = false;
			this.scheduleButton = true;
			this.unpaidwkModel = new VOffenderSentCondActs();

		}
	}

	getActiveFlagCount(offenderId) {
		const count = this.ocduprojFactory.getActiveFlagCount(offenderId);
		count.subscribe(data => this.activeFlagCount = data);
	}

	getLastAndFirstName(offenderId) {
		this.ocduprojFactory.getLastAndFirstName(offenderId).subscribe(data => {
			this.block.push(data);
		});
	}
	onRecordForProjectChange(event) {
		if (event && this.attendanceModelTemp && event !== this.attendanceModelTemp.courseCodeTemp) {
			const index = this.attendanceData.indexOf(this.attendanceModelTemp);
			this.attendanceGrid.setColumnData('courseCode', index, event.code);
		}
	}

	onCommentTextInsert(event) {
		if (event) {
			const index = this.attendanceData.indexOf(this.attendanceModelTemp);
			this.attendanceGrid.setColumnData('commentText', index, event);
			this.attendanceGrid.setColumnData('pCode', index, event);
		}
	}


	ocduprojexecuteQuery() { // Grid1
		this.unpaidwkModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
		const serviceObj = this.ocduprojFactory.unpaidWkExecuteQuery(this.unpaidwkModel);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.unpaidwkData = [];
				this.projallocData = [];
				this.attendanceData = [];
				this.skillsData = [];
				this.projAllocInsert = false;
				this.scheduleDisable = false;
				this.unpaidwkModel = new VOffenderSentCondActs();
			} else if (data !== undefined && data.length > 0) {
				data.forEach(element => {
					if (element.creditedUnits && element.creditedUnits !== null && element.creditedUnits.toString().includes('.')) {
						var val = element.creditedUnits + '';
						var phour = element.creditedUnits;
						var lvalue;
						var det = val.split('.');
						var lhour = Number(det[0]);
						if (lhour < 10) {
							lvalue = '0' + lhour + '.'
						} else {
							lvalue = lhour + '.'
						}
						var minutes = (phour - lhour) * 60;
						if (minutes < 10) {
							lvalue = lvalue + '0' + Math.round(minutes);
						} else {
							lvalue = lvalue + Math.round(minutes);
						}
						element.creditedUnits = Number(lvalue);
					}

					if (element.remaining && element.remaining !== null && element.remaining.toString().includes('.')) {
						var val = element.remaining + '';
						var phour = element.remaining;
						var lvalue;
						var det = val.split('.');
						var lhour = Number(det[0]);
						if (lhour < 10) {
							lvalue = '0' + lhour + '.'
						} else {
							lvalue = lhour + '.'
						}
						var minutes = (phour - lhour) * 60;
						if (minutes < 10) {
							lvalue = lvalue + '0' + Math.round(minutes);
						} else {
							lvalue = lvalue + Math.round(minutes);
						}
						element.remaining = Number(lvalue);
					}
					const conditonResultStatus = this.orderStatusData.filter(i => i.updateReasonCode == element.sentenceStatusDesc);
					if (conditonResultStatus.length > 0) {
						element['conActiveType'] = conditonResultStatus[0].activeType
					}
					element['butIwp'] = '';
                    element['SCREEN'] = this.screenId + "~" + "true" + "~" + element['offenderSentConditionId'];
				})
				this.unpaidwkData = data;
				this.unpaidwkModel = this.unpaidwkData[0];
				this.tableIndexOne = 0;
				this.projAllocInsert = true;
				this.scheduleDisable = true;
			}
		});
	}

	communityServiceClick(event) {
		if (event) {
			this.eoffenderService.selectedRowData = event;
			this.creditadjModelTemp.adjustmentDate = event.conditionStartDate;
			this.offenderBookidTemp = event.offenderBookId;
			this.unpaidwkModel = event;
			this.sentenceSeqTemp = event.sentenceSeq;
			this.creditadjExecuteQuery();
			if (event.conActiveType !== 'A') {
				this.projAllocInsert = false;
			}
			this.ocduprojPopulateDetails(event);

		} else {
			this.eoffenderService.selectedRowData = null;
		}
	}

	projAllocRowClick(event) {
		this.scheduleButton = true;
		if (event) {
			this.averageWeekHours = '00:00';
			this.projallocModel = event;
			this.staffdetailsSearchModel.agyLocId = 'COMM';
			this.staffdetailsSearchModel.areaCode = this.projallocModel.nbtteamAreaCode;
			this.staffdetailsSearchModel.agencyLocationType = this.projallocModel.nbtAgyLocId;
			this.projallocModelData = event;
			this.projallocModelDataTemp1.offPrgrefId = event.offPrgrefId;
			this.projallocModelDataTemp1.crsActyId = event.crsActyId;
			this.valProjDelete();
			if (this.projallocModel.offenderBookId) {
				this.projAllocDelete = true;
				this.scheduleButton = false;
			} else {
				this.projAllocDelete = false;
				this.scheduleButton = true;
			}
			let attandanceView = this.attendanceModel.view;
			this.projallocModel.view = attandanceView;
			this.ocduprojPopulateAttendanceDetails(this.projallocModel);
		} else {
			this.projallocModelData = new OffenderProgramProfiles();
			this.projallocModel = new OffenderProgramProfiles();
		}
		if (event.createDatetime && event.offenderProgramStatus === 'CANC') {
			this.scheduleButton = true;
		}

	}

	onRowClickattendance(event) {
		if (event) {
			this.attendanceModelTemp = event;
			this.attendanceModelTemp.courseCode = event.courseCode;
			if (event.eventId) {
				this.skillsModelTemp.eventId = event.eventId;
				this.executeQuerySkills();
			} else {
				this.skillsData = [];
			}
		} else {
			this.courseCode = undefined;
		}
	}

	executeQuerySkills() {
		const saveObj = this.ocduprojFactory.skillsExecuteQuery(this.skillsModelTemp);
		saveObj.subscribe(data => {
			if (data.length == 0) {
				this.skillsData = [];
			} else {
				data.forEach(element => {
					element.btn = ''
					element.firstName = element.lastName + ',' + element.firstName;
					if (element.noOfHours !== 0 && element.noOfHours !== null) {
						if (element.noOfHours.toString().includes('.')) {
							var time = element.noOfHours + '';
							var val = time.split('.');
							var val1 = Number(val[0]);
							if (val[1].toString().length === 1) {
								val[1] = val[1] + 0;
								var val2 = Number(val[1]);
							} else {
								var val2 = Number(val[1]);
							}
							var minutes = Math.round((val2 / 100) * 60);
							element.noOfHours = DateFormat.getDate(DateFormat.getDate().setHours(val1, minutes, 0, 0));
						} else {
							element.noOfHours = DateFormat.getDate(DateFormat.getDate().setHours(element.noOfHours, 0, 0, 0));
						}
					} else {
						element.noOfHours = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
					}
				});
				this.skillsData = data;

			}
		});
	}

	onRowClickSkills(event) {
		if (event && event.skillCode && event.eventId) {
			this.onGridDelete = true;
		} else {
			this.onGridDelete = false;
		}
	}

	projAllocRowDelete = () => {
		if (this.delete === 1) {
			this.show('ocduprojyoycannot', 'warn');
			return false;
		}
		return true;
	}

	valProjDelete() {
		const saveObj = this.ocduprojFactory.projAllocOnDeleteQuery(this.projallocModelDataTemp1);
		saveObj.subscribe(data => {
			if (data === 1) {
				this.delete = data;
			} else {
				this.delete = 0;
			}
		});

	}

	onGridClear = () => {
		return true;
	}

	onGridClearCred = () => {
		return true;
	}
	/**
	* This function loads the data into the Master Record and its child records
	*/
	ocduprojPopulateDetails(event) { 
		this.projallocData = [];
		this.projallocDataTempOne = [];
		const serviceObj = this.ocduprojFactory.projAllocExecuteQuery(event);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.skillsDisabled = true;
				this.courseCodeDisabled = true;
				this.scheduleButton = true;
				this.attendanceData = [];
				this.attendanceModelTemp.courseCode = "";
			} else {
				data.forEach(element => {
					element.createDatetime = DateFormat.getDate(element.createDatetime);
					element.modifyDatetime = DateFormat.getDate(element.modifyDatetime);
					if (element.offenderEndDate == null) {
						element.offenderEndDate = null;
					} else {
						element.offenderEndDate = DateFormat.getDate(element.offenderEndDate);
					}
					element.offenderStartDate = DateFormat.getDate(element.offenderStartDate);
					element.scheduleStartDate = DateFormat.getDate(element.scheduleStartDate);
					if (element.agreedTravelHour !== 0 && element.agreedTravelHour !== null) {
						if (element.agreedTravelHour.toString().includes('.')) {
							var time = element.agreedTravelHour + '';
							var val = time.split('.');
							var val1 = Number(val[0]);

							if (val[1].toString().length === 1) {
								val[1] = val[1] + 0;
								var val2 = Number(val[1]);
							} else {
								var val2 = Number(val[1]);
							}
							var val3 = Number(val[2]);
							var minutes = Math.abs((val2 / 100) * 60);
							element.agreedTravelHour = DateFormat.getDate(DateFormat.getDate().setHours(val1, minutes, 0, 0));
						} else {
							element.agreedTravelHour = DateFormat.getDate(DateFormat.getDate().setHours(element.agreedTravelHour, 0, 0, 0));
						}
					} else {
						if (element.agreedTravelHour == 0) {
							element.agreedTravelHour = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
						}
					}
				});
				this.projallocData = data;
				data .forEach(el=>{
					el['reminder'] = (this.sessionManager.currentCaseLoadType === 'COMM') ? (this.translateService.translate('ocduproj.reminder')) : '';

				})
				
				this.projallocDataTempOne = JSON.parse(JSON.stringify(this.projallocData));
				this.skillsDisabled = false;
				this.courseCodeDisabled = false;
				this.projallocModel = this.projallocData[0];
				this.projallocModel.view = '2';
				this.tableIndex = 0;
				this.viewRedOnly = false;
				this.scheduleButton = false;
				const projectOptions = this.ocduprojFactory.rgProjectRecordGroup(this.vHeaderBlockModel.offenderBookId);
				projectOptions.subscribe(obj => {
					if (obj && obj.length > 0) {
						this.projectOptions = obj;
					} else {
						this.projectOptions = [];
					}
				});
			}
		});
	}
	convertHoursToDateFormat(pHours: number) {
		var lHours = 0;
		var lMin = 0;
		var lValue: String;
		if (pHours > 0) {
			lHours = Math.floor(pHours);
			lValue = lHours < 10 ? '0' + lHours + ':' : lHours + ':';
			lMin = (pHours - lHours) * 60;
			lValue = lMin < 10 ? lValue + '0' + Math.round(lMin) : lValue + '' + Math.round(lMin);
		} else {
			lValue = '00:00';
		}
		return lValue;
	}
	ocduprojPopulateAttendanceDetails(event,index?) {
		var lvTotCredited = 0;
		this.attendanceModelTemp.offenderBookId = event.offenderBookId;
		this.attendanceModelTemp.offPrgrefId = event.offPrgrefId;
		this.attendanceModelTemp.view = event.view;
		this.attendanceModelTemp.eventOutcomeDbVal = event.view;
		const serviceObj = this.ocduprojFactory.attendanceExecuteQuery(this.attendanceModelTemp);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.skillsData = [];
				this.attendanceData = [];
				this.skillsReadOnly = true;
				this.skillsInsert = false;
				this.commentTextDisabled = true;
				this.projectViewDisable = false;
				this.courseCodeDisabled1 = true;
				this.attendanceModelTemp.commentText = "";
				this.attendanceModelTemp.courseCode = "";
				this.enableSkillInsert = false;
			} else {
				data.forEach((element, index) => {
					if (element.supervisorStaffId) {
						element.supervisorStaffId = String(element.supervisorStaffId);
					}
					if (element.eventOutcome === 'ATT') {
						var inTimeHrs = DateFormat.getDate(element.inTime).getHours();
						var inTimeMin = DateFormat.getDate(element.inTime).getMinutes();
						var outTimeHrs = DateFormat.getDate(element.outTime).getHours();
						var outTimeMin = DateFormat.getDate(element.outTime).getMinutes();
						var inTimeSec = DateFormat.getDate(element.inTime).getSeconds();
						var outTimeSec = DateFormat.getDate(element.outTime).getSeconds();
						let dateTemp = DateFormat.getDate();
						dateTemp.setHours(outTimeHrs - inTimeHrs, outTimeMin - inTimeMin);
						element.nbtHours = dateTemp;
					}
					if (element.creditedHours) {
						var credTemp = DateFormat.getDate();
						if (String(element.creditedHours).includes('.')) {
							var credHrs = String(element.creditedHours).split('.');
							var credMin = Number('0.' + credHrs[1]) * 60;
							if (String(credMin).includes('.')) {
								var getMin = String(credMin).split('.');
								credTemp.setHours(Number(credHrs[0]), Number(getMin[0]));
							} else {
								credTemp.setHours(Number(credHrs[0]), Number(credMin));
							}
							element.nbtCreditedHours = credTemp;
						} else {
							credTemp.setHours(Number(element.creditedHours), 0);
							element.nbtCreditedHours = credTemp;
						}
					}
					if (element.eventOutcome === 'ATT') {
						var inTimeHrs = DateFormat.getDate(element.nbtCreditedHours).getHours();
						var inTimeMin = DateFormat.getDate(element.nbtCreditedHours).getMinutes();
						var outTimeHrs = DateFormat.getDate(element.nbtHours).getHours();
						var outTimeMin = DateFormat.getDate(element.nbtHours).getMinutes();
						var inTimeSec = DateFormat.getDate(element.nbtCreditedHours).getSeconds();
						var outTimeSec = DateFormat.getDate(element.nbtHours).getSeconds();
						let penaltyTemp = DateFormat.getDate();
						penaltyTemp.setHours(outTimeHrs - inTimeHrs, outTimeMin - inTimeMin);
						element.penalty = element.nbtCreditedHours === null ? element.nbtHours : penaltyTemp;
					}
					if (element.eventOutcome === 'ATT' || element.eventOutcome === 'ATTSH' || element.eventOutcome === 'UB') {
						lvTotCredited = lvTotCredited + (element.creditedHours === null ? 0 : element.creditedHours);
					}
					element.courseCodeTemp = element.courseCode;
				});
				this.averageWeekHours = this.convertHoursToDateFormat(lvTotCredited);
				this.skillsInsert = true;
				this.skillsUpdate = true;
				this.attendanceData = data;
				this.attendanceModel = this.attendanceData[0];
				this.attendanceModel.view = this.projallocModel.view;
				this.ocduprojPopulateSkillsDetails();
				this.skillsReadOnly = false;
				this.tableIndexatten = index ? index : 0;
				this.commentTextDisabled = false;
				this.projectViewDisable = false;
				this.courseCodeDisabled1 = false;
				this.enableSkillInsert = true;
			}
		});
	}
	ocduprojPopulateSkillsDetails() {
		const serviceObj = this.ocduprojFactory.
			skillsExecuteQuery(this.attendanceModel);
		serviceObj.subscribe(data => {
			if (data !== undefined && data.length > 0) {
				data.forEach(ele => {
					ele.btn = '';
					ele.adadjustmentMinutes = (ele.adadjustmentMinutes / 60);
				});
				this.skillsData = data;
				this.skillsModel = this.skillsData[0];
			}
		});
	}
	creditadjExecuteQuery() {
		const creditadjResult = this.ocduprojFactory.creditAdjExecuteQuery(this.unpaidwkModel);
		creditadjResult.subscribe(data => {
			if (data.length === 0) {
				this.creditadjData = [];
			} else {
				data.forEach(element => {
					if (element.adjustmentMinutes !== 0 && element.adjustmentMinutes !== null) {
						element.adjustmentMinutes = Math.abs(element.adjustmentMinutes / 60).toFixed(2);
						if (element.adjustmentMinutes.toString().includes('.')) {
							var time = element.adjustmentMinutes + '';
							var val = time.split('.');
							var val1 = Number(val[0]);
							var val2 = Number(val[1]);
							var minutes = Math.round((val2 / 100) * 60);
							element.adjustmentMinutes = DateFormat.getDate(DateFormat.getDate().setHours(val1, minutes, 0, 0));
						} else {
							element.adjustmentMinutes = DateFormat.getDate(DateFormat.getDate().setHours(element.adjustmentMinutes, 0, 0, 0));
						}
					} else {
						element.adjustmentMinutes = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
					}
				});
				this.creditadjData = data;
				this.creditadjModel = data[0];
			}
		});


	}
	viewLaunchClick = (event) => {
		const data = {
			eventType: 'UW',
			offenderBookId: this.vHeaderBlockModel.offenderBookId,
			offenderName:this.vHeaderBlockModel.lastName +' '+this.vHeaderBlockModel.firstName+', '+this.vHeaderBlockModel.offenderIdDisplay,
			agyLocId: this.vHeaderBlockModel.agyLocId,
			pOperation: 'ALLOCATE',
			moduleName: 'OCDUPROJ'
		};
		this.dialogService.openLinkDialog('ociscatadialog', data).subscribe(result => {
			if (result.length > 0) {
				this.pgrServiceList = result;
				result.forEach(e => {
					const index = this.projallocData.indexOf(event);
					this.projalloctab.setColumnData('projectCode', index, e.courseActivityCode);
					this.projalloctab.setColumnData('projectDescription', index, e.courseActivityDesc);
					this.projalloctab.setColumnData('teamDescription', index, e.providerName);
					this.projalloctab.setColumnData('maxCapacity', index, e.capacity);
					this.projalloctab.setColumnData('programId', index, e.programId);
					this.projalloctab.setColumnData('crsActyId', index, e.crsActyId);
					this.projalloctab.setColumnData('rejDate', index, e.scheduleStartDate);
					this.projalloctab.setColumnData('offEndDate', index, e.scheduleEndDate);
					this.projalloctab.setColumnData('offenderStartDate', index, undefined);
					this.projalloctab.setColumnData('agreedTravelHour', index, undefined);
				});

			}
		});

	}
	viewStaffClick = (event) => {
		this.staffdetailsSearchModel.agyLocType = this.staffdetailsSearchModel.agyLocId;
		this.dialogService.openLinkDialog('/OCUCSTAF', this.staffdetailsSearchModel, 80).subscribe(resData => {
			const index = this.skillsData.indexOf(event);
			this.skills.setColumnData('staffRole', index, resData.role);
			this.skills.setColumnData('staffId', index, resData.staffId);
			this.skills.setColumnData('firstName', index, resData.firstName + ',' + resData.lastName);
		});
	}

	ocduprojdateFormat(dateValue) {
		if (dateValue !== undefined && dateValue.length > 0) {
			const newdate = dateValue.split('/');
			return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
		} else {
			return dateValue;
		}
	}

	/**
	* This function will be executed when commit event is
	* fired
	*/
	ocduprojSaveprojallocForm(event) {
		this.projallocInsertList = event.added;
		this.projallocUpdateList = event.updated;
		this.projallocDeleteList = event.removed;

		if (!this.ocduprojRowValidation(this.projallocInsertList)) {
			return;
		}
		if (!this.ocduprojRowValidationUpdate(this.projallocUpdateList)) {
			return;
		}
		if (!this.statusRowValidation(this.projallocUpdateList)) {
			return;
		}

		this.projallocCommitModel.insertList = [];
		this.projallocCommitModel.updateList = [];
		this.projallocCommitModel.deleteList = [];
		if (this.projallocInsertList.length > 0 || this.projallocUpdateList.length > 0) {
		}

		if (this.projallocInsertList.length > 0) {
			for (let i = 0; i < this.projallocInsertList.length; i++) {
				if (this.projallocInsertList[i].agreedTravelFare1) {
					this.projallocInsertList[i].agreedTravelFare1 = Number(this.projallocInsertList[i].agreedTravelFare1);
				}
				if (this.projallocInsertList[i].agreedTravelHour) {
					this.projallocInsertList[i].agreedTravelHour = DateFormat.getDate(this.projallocInsertList[i].agreedTravelHour)
						.getHours() + (DateFormat.getDate(this.projallocInsertList[i].agreedTravelHour).getMinutes() / 60);
				}
				this.projallocInsertList[i].offenderBookId = this.unpaidwkModel.offenderBookId;
				this.projallocInsertList[i].sentenceSeq = this.unpaidwkModel.sentenceSeq;
				this.projallocInsertList[i].agyLocId = this.sessionManager.currentCaseLoad;
				this.projallocInsertList[i].offenderSentConditionId = this.unpaidwkModel.offenderSentConditionId;
				this.projallocInsertList[i].suspendedFlag = 'N';
				this.projallocInsertList[i].holidayFlag = 'Y';
				this.projallocInsertList[i].profileClass = 'PRG';
				this.projallocInsertList[i].neededFlag = 'Y';
			}
			this.projallocCommitModel.insertList = this.projallocInsertList;
		}
		if (this.projallocUpdateList.length > 0) {
			for (let i = 0; i < this.projallocUpdateList.length; i++) {
				if (this.projallocUpdateList[i].offenderProgramStatus != 'ALLOC') {
					this.projallocUpdateList[i].emailFlag = 'N';
					this.projallocUpdateList[i].smsFlag = 'N';
					this.projallocUpdateList[i].emailScheduleHoursBefore = null;
					this.projallocUpdateList[i].smsScheduleHoursBefore = null;


				} 
				if (this.projallocUpdateList[i].agreedTravelFare1) {
					this.projallocUpdateList[i].agreedTravelFare1 = Number(this.projallocUpdateList[i].agreedTravelFare1);
				}
				if (this.projallocUpdateList[i].agreedTravelHour) {
					this.projallocUpdateList[i].agreedTravelHour = DateFormat.getDate(this.projallocUpdateList[i].agreedTravelHour)
						.getHours() + (DateFormat.getDate(this.projallocUpdateList[i].agreedTravelHour).getMinutes() / 60);
				}

				if (this.projallocUpdateList[i].offenderEndDate) {
					this.projallocUpdateList[i].offenderEndDate = DateFormat.getDate(this.projallocUpdateList[i].offenderEndDate);
				}
			}
			this.projallocCommitModel.updateList = this.projallocUpdateList;
		}

		if (this.projallocDeleteList.length > 0) {
			for (let i = 0; i < this.projallocDeleteList.length; i++) {
				if (this.projallocDeleteList[i].agreedTravelFare1) {
					this.projallocDeleteList[i].agreedTravelFare1 = Number(this.projallocDeleteList[i].agreedTravelFare1);
				}
				this.projallocDeleteList[i].offenderStartDate = DateFormat.getDate(this.projallocDeleteList[i].offenderStartDate);
				if (this.projallocDeleteList[i].offenderEndDate) {
					this.projallocDeleteList[i].offenderEndDate = DateFormat.getDate(this.projallocDeleteList[i].offenderEndDate);
				}
				if (this.projallocDeleteList[i].scheduleStartDate) {
					this.projallocDeleteList[i].scheduleStartDate = DateFormat.getDate(this.projallocDeleteList[i].scheduleStartDate);
				}
				if (this.projallocDeleteList[i].scheduleEndDate) {
					this.projallocDeleteList[i].scheduleEndDate = DateFormat.getDate(this.projallocDeleteList[i].scheduleEndDate);
				}
				if (this.projallocDeleteList[i].createDatetime) {
					this.projallocDeleteList[i].createDatetime = DateFormat.getDate(this.projallocDeleteList[i].createDatetime);
				}
				if (this.projallocDeleteList[i].modifyDatetime) {
					this.projallocDeleteList[i].modifyDatetime = DateFormat.getDate(this.projallocDeleteList[i].modifyDatetime);
				}
				if (this.projallocDeleteList[i].agreedTravelHour) {
					this.projallocDeleteList[i].agreedTravelHour = DateFormat.getDate(this.projallocDeleteList[i].agreedTravelHour)
						.getHours() + (DateFormat.getDate(this.projallocDeleteList[i].agreedTravelHour).getMinutes() / 60);
				}
			}
			this.projallocCommitModel.deleteList = this.projallocDeleteList;
		}
		this.finalSave();
	}

	finalSave() {
		const projallocSaveData = this.ocduprojFactory.projAllocCommit(this.projallocCommitModel);
		projallocSaveData.subscribe(data => {
			if (data === 0) {
				this.show('common.addupdateremoverecordfailed', 'warn');
				this.ocduprojPopulateDetails(this.unpaidwkModel);
				return;
			} else if (data === 1) {
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.ocduprojPopulateDetails(this.unpaidwkModel);
				return;
			} else if (data === 3) {
				this.show('ocduproj.recordcantdltedmod', 'warn');
				this.ocduprojPopulateDetails(this.unpaidwkModel);
			}
		});
		this.projalloctab.prepareAgColumnDef();

	}

	ocduprojRowValidation(rowdata: any) {
		const is = { valid: true };
		for (let i = 0; i < rowdata.length; i++) {
			const index = this.projallocData.indexOf(rowdata[i]);
			if (!rowdata[i].projectCode) {
				this.show('ocduproj.projectmust', 'warn');
				is.valid = false;
				return is.valid;
			}
			if (!rowdata[i].offenderStartDate) {
				this.show('ocduproj.offenderstartdate', 'warn');
				is.valid = false;
				return is.valid;
			}
			for (let x = 0; this.projallocData.length > x; x++) {
				if (index !== x && (this.projallocData[x].projectCode == rowdata[i].projectCode && this.projallocData[x].offenderProgramStatus == rowdata[i].offenderProgramStatus)) {
					this.show('ocduproj.rowexist');
					is.valid = false;
					return;
				}
			}

			if (rowdata[i].offenderStartDate) {
				if (rowdata[i].rejDate && DateFormat.compareDate(DateFormat.getDate(rowdata[i].offenderStartDate), DateFormat.getDate(rowdata[i].rejDate)) === -1) {
					const bookingDate = DateFormat.format(rowdata[i].rejDate);
					const  str =this.translateService.translate('ocduproj.offenderstartdatecant');
                    const str2 = str + ' '+ bookingDate;
					this.show(str2, 'warn');
					const index = this.projallocData.indexOf(this.projallocModel);
					this.projalloctab.setColumnData('offenderStartDate', index, undefined);
					is.valid = false;
					return is.valid;
				}
				if (rowdata[i].offEndDate && DateFormat.compareDate(DateFormat.getDate(rowdata[i].offenderStartDate), DateFormat.getDate(rowdata[i].offEndDate)) === 1) {
					const endDate = DateFormat.format(rowdata[i].offEndDate);

					const  str =this.translateService.translate('ocduproj.offenderenddatecant');
                    const str2 = str + ' '+ endDate;
					this.show(str2, 'warn');

					is.valid = false;
					return is.valid;
				}
				if (this.unpaidwkModel.sentenceStartDate && DateFormat.compareDate(DateFormat.getDate(rowdata[i].offenderStartDate),
					DateFormat.getDate(this.unpaidwkModel.sentenceStartDate)) === -1) {
					const sentenceStartDate = DateFormat.format(this.unpaidwkModel.sentenceStartDate);

					const  str =this.translateService.translate('ocduproj.offendersentencestartdate');
                    const str2 = str + ' '+ sentenceStartDate;
					this.show(str2, 'warn');

					is.valid = false;
					return is.valid;
				}

			}

			if (rowdata[i].offenderEndDate) {
				if (rowdata[i].offEndDate && DateFormat.compareDate(DateFormat.getDate(rowdata[i].offenderEndDate), DateFormat.getDate(rowdata[i].offEndDate)) === 1) {
					this.show('ocduproj.offenderenddatelater', 'warn');
					is.valid = false;
					return is.valid;
				}
				if (rowdata[i].offenderStartDate && DateFormat.compareDate(DateFormat.getDate(rowdata[i].offenderEndDate), DateFormat.getDate(rowdata[i].offenderStartDate)) === -1) {
					this.show('ocduproj.offenderenddateprjassign', 'warn');
					is.valid = false;
					return is.valid;
				}
				if (DateFormat.compareDate(DateFormat.getDate(rowdata[i].offenderEndDate),
					DateFormat.getDate()) === -1) {
					const sentenceStartDate = DateFormat.format(this.unpaidwkModel.sentenceStartDate);
					this.show('ocduproj.offenderenddatecurrent', 'warn');
					is.valid = false;
					return is.valid;
				}

			}

		}
		return is.valid;
	}
	ocduprojRowValidationUpdate(rowdata: any) {
		const is = { valid: true };
		for (let i = 0; i < rowdata.length; i++) {
			const index = this.projallocData.indexOf(rowdata[i]);
		}
		return is.valid;
	}

	validateRowDataAttandence = (event) => {
		const rowdata = new ValidateRowReturn();
		const index = event.rowIndex;
		if (event.field == "inTime") {
			var indate = DateFormat.getDate(event.data.inTime).getHours() + ':' + DateFormat.getDate(event.data.inTime).getMinutes();
			var outdate = DateFormat.getDate(event.data.outTime).getHours() + ':' + DateFormat.getDate(event.data.outTime).getMinutes();
			if (indate.includes(':')) {
				var time = indate + '';
				var val = time.split(':');
				var val1 = val[0];
				var val2 = val[1];
				val1 = val1.length === 1 ? 0 + val1 : val1
				val2 = val2.length === 1 ? 0 + val2 : val2
				indate = val1 + ':' + val2;
			}
			if (outdate.includes(':')) {
				var time = outdate + '';
				var val = time.split(':');
				var val1 = val[0];
				var val2 = val[1];
				val1 = val1.length === 1 ? 0 + val1 : val1
				val2 = val2.length === 1 ? 0 + val2 : val2
				outdate = val1 + ':' + val2;
			}
			if (indate > outdate) {
				this.show('ocduproj.endtimecannot', 'warn');
				this.attendanceGrid.setColumnData('inTime', index, undefined);
				rowdata.validated = true;
				return rowdata;
			} else if (event.data.eventOutcome == 'ATT') {
				if (event.data.inTime && event.data.outTime) {
					var inTimeHrs = DateFormat.getDate(event.data.inTime).getHours();
					var inTimeMin = DateFormat.getDate(event.data.inTime).getMinutes();
					var outTimeHrs = DateFormat.getDate(event.data.outTime).getHours();
					var outTimeMin = DateFormat.getDate(event.data.outTime).getMinutes();
					var penaltyHrs = DateFormat.getDate(event.data.penalty).getHours();
					var penaltyMin = DateFormat.getDate(event.data.penalty).getMinutes();
					let creditTime = DateFormat.getDate();
					let nbtHoursTime = DateFormat.getDate();
					nbtHoursTime.setHours(outTimeHrs - inTimeHrs, outTimeMin - inTimeMin);
					creditTime.setHours((outTimeHrs - inTimeHrs) - penaltyHrs, (outTimeMin - inTimeMin) - penaltyMin);
					this.attendanceGrid.setColumnData('nbtHours', index, nbtHoursTime);
					if (!event.data.penalty) {
						this.attendanceGrid.setColumnData('nbtCreditedHours', index, nbtHoursTime);
						rowdata.validated = true;
						return rowdata;
					} else {
						this.attendanceGrid.setColumnData('nbtCreditedHours', index, creditTime);
						rowdata.validated = true;
						return rowdata;
					}
				}
			}
		}
		if (event.field == 'outTime') {
			var indate = DateFormat.getDate(event.data.inTime).getHours() + ':' + DateFormat.getDate(event.data.inTime).getMinutes();
			var outdate = DateFormat.getDate(event.data.outTime).getHours() + ':' + DateFormat.getDate(event.data.outTime).getMinutes();;
			if (indate.includes(':')) {
				var time = indate + '';
				var val = time.split(':');
				var val1 = val[0];
				var val2 = val[1];
				val1 = val1.length === 1 ? 0 + val1 : val1
				val2 = val2.length === 1 ? 0 + val2 : val2
				indate = val1 + ':' + val2;
			}
			if (outdate.includes(':')) {
				var time = outdate + '';
				var val = time.split(':');
				var val1 = val[0];
				var val2 = val[1];
				val1 = val1.length === 1 ? 0 + val1 : val1
				val2 = val2.length === 1 ? 0 + val2 : val2
				outdate = val1 + ':' + val2;
			}
			if (indate > outdate) {
				this.show('ocduproj.endtimecannot', 'warn');
				this.attendanceGrid.setColumnData('outTime', index, undefined);
				rowdata.validated = true;
				return rowdata;

			} else if (event.data.eventOutcome == 'ATT') {
				if (event.data.inTime && event.data.outTime) {
					var inTimeHrs = DateFormat.getDate(event.data.inTime).getHours();
					var inTimeMin = DateFormat.getDate(event.data.inTime).getMinutes();
					var outTimeHrs = DateFormat.getDate(event.data.outTime).getHours();
					var outTimeMin = DateFormat.getDate(event.data.outTime).getMinutes();
					var penaltyHrs = DateFormat.getDate(event.data.penalty).getHours();
					var penaltyMin = DateFormat.getDate(event.data.penalty).getMinutes();
					let creditTime = DateFormat.getDate();
					let nbtHoursTime = DateFormat.getDate();
					nbtHoursTime.setHours(outTimeHrs - inTimeHrs, outTimeMin - inTimeMin);
					creditTime.setHours((outTimeHrs - inTimeHrs) - penaltyHrs, (outTimeMin - inTimeMin) - penaltyMin);
					this.attendanceGrid.setColumnData('nbtHours', index, nbtHoursTime);
					if (!event.data.penalty) {
						this.attendanceGrid.setColumnData('nbtCreditedHours', index, event.data.nbtHoursTime);
						rowdata.validated = true;
						return rowdata;
					} else {
						this.attendanceGrid.setColumnData('nbtCreditedHours', index, creditTime);
						rowdata.validated = true;
						return rowdata;
					}
				}
			}

		}

		if (event.field == 'eventOutcome' && event.data.eventOutcome == 'ATT') {
			if (event.data.inTime && event.data.outTime) {
				var inTimeHrs = DateFormat.getDate(event.data.inTime).getHours();
				var inTimeMin = DateFormat.getDate(event.data.inTime).getMinutes();
				var outTimeHrs = DateFormat.getDate(event.data.outTime).getHours();
				var outTimeMin = DateFormat.getDate(event.data.outTime).getMinutes();
				var inTimeSec = DateFormat.getDate(event.data.inTime).getSeconds();
				var outTimeSec = DateFormat.getDate(event.data.outTime).getSeconds();
				let dateTemp = DateFormat.getDate();
				dateTemp.setHours(outTimeHrs - inTimeHrs, outTimeMin - inTimeMin);
				this.attendanceGrid.setColumnData('nbtHours', index, dateTemp);
				this.attendanceGrid.setColumnData('nbtCreditedHours', index, dateTemp);
				rowdata.validated = true;
				return rowdata;
			}
		}
		if (event.data.eventOutcome !== 'ATT') {
			this.attendanceGrid.setColumnData('nbtHours', index, undefined);
			this.attendanceGrid.setColumnData('nbtCreditedHours', index, undefined);
			this.attendanceGrid.setColumnData('penalty', index, undefined);
			rowdata.validated = true;
			return rowdata;
		}
		if (event.field == 'penalty' && event.data.penalty) {
			if (DateFormat.compareTime(event.data.penalty, event.data.nbtHours) === 1) {
				this.show(this.translateService.translate('ocduproj.penaltylessthenhour'), 'warn');
				rowdata.validated = true;
				return rowdata;
			}
			var inTimeHrs = DateFormat.getDate(event.data.penalty).getHours();
			var inTimeMin = DateFormat.getDate(event.data.penalty).getMinutes();
			var outTimeHrs = DateFormat.getDate(event.data.nbtHours).getHours();
			var outTimeMin = DateFormat.getDate(event.data.nbtHours).getMinutes();
			var inTimeSec = DateFormat.getDate(event.data.penalty).getSeconds();
			var outTimeSec = DateFormat.getDate(event.data.nbtHours).getSeconds();
			let dateTemp = DateFormat.getDate();
			dateTemp.setHours(outTimeHrs - inTimeHrs, outTimeMin - inTimeMin);
			this.attendanceGrid.setColumnData('nbtCreditedHours', index, dateTemp);
			rowdata.validated = true;
			return rowdata;
		} else if (event.field == 'penalty' && !event.data.penalty) {
			this.attendanceGrid.setColumnData('nbtCreditedHours', index, event.data.nbtHours);
			rowdata.validated = true;
			return rowdata;
		}

		rowdata.validated = true;
		return rowdata;
	}


	/**
	Attendence Commit
	*/
	ocduprojSaveattendanceForm(event) {
		this.attendanceUpdatetList = event.updated;
		this.attendanceCommitModel.updateList = [];
		if (!this.validationAttendence(this.attendanceUpdatetList)) {
			return;
		}
		if (this.attendanceUpdatetList.length > 0) {
			for (let i = 0; i < this.attendanceUpdatetList.length; i++) {
				this.attendanceUpdatetList[i].line = this.unpaidwkModel.sentenceSeqNo;
				this.attendanceUpdatetList[i].nbtProjectRefStrId = this.projallocModelData.offPrgrefId;
				this.attendanceUpdatetList[i].nbtRefCrsActyId = this.projallocModelData.crsActyId;
				this.attendanceUpdatetList[i].agyLocId = this.sessionManager.currentCaseLoad;
				this.attendanceUpdatetList[i].supervisorStaffId = Number(this.attendanceUpdatetList[i].supervisorStaffId);
				if (this.attendanceUpdatetList[i].eventOutcome === 'ATT') {
					if (this.attendanceUpdatetList[i].penalty && DateFormat.compareTime(this.attendanceUpdatetList[i].penalty, this.attendanceUpdatetList[i].nbtHours) === 1) {
						this.show(this.translateService.translate('Penalty Should be less than hours + travel.'), 'warn');
						return;
					}
					let creditHrs = DateFormat.getDate(this.attendanceUpdatetList[i].nbtCreditedHours).getHours() * 60;
					let creditMin = (creditHrs + DateFormat.getDate(this.attendanceUpdatetList[i].nbtCreditedHours).getMinutes()) / 60;
					this.attendanceUpdatetList[i].creditedHours = Number((Math.round(creditMin * 100) / 100).toFixed(2));
				} else {
					this.attendanceUpdatetList[i].creditedHours = 0;
				}
				this.attendanceCommitModel.updateList = this.attendanceUpdatetList;
			}
		}

		const attendanceSaveData = this.ocduprojFactory.attendanceCommit(this.attendanceCommitModel);
		attendanceSaveData.subscribe(data => {
			if (data === 0) {
				this.show('common.addupdateremoverecordfailed', 'warn');
				this.ocduprojPopulateAttendanceDetails(this.attendanceModel);
			} else {
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.ocduprojPopulateAttendanceDetails(this.attendanceModel);
				this.commexecuteQuery();
			}
		});
	}

	validationAttendence(attendanceData: any) {
		const is = { valid: true };
		for (let i = 0; i < attendanceData.length; i++) {
			if (!attendanceData[i].eventOutcome) {
				this.show('ocduproj.attandancemust', 'warn');
				is.valid = false;
				return is.valid;
			}

			if (!attendanceData[i].inTime) {
				this.show('ocduproj.starttoimemust', 'warn');
				is.valid = false;

				return is.valid;
			}

			if (!attendanceData[i].outTime) {
				this.show('ocduproj.endtimemustbe', 'warn');
				is.valid = false;
				return is.valid;
			}
			if ((JSON.stringify(attendanceData[i].outTime) === '"Invalid date"') || (JSON.stringify(attendanceData[i].inTime) === '"Invalid date"')) {
				this.show('ocduproj.invalidtime', 'warn');
				is.valid = false;
				return is.valid;
			}

			if (!attendanceData[i].courseCode) {
				this.show('ocduproj.trecorsmust', 'warn');
				is.valid = false;
				return is.valid;//
			}

			if (DateFormat.getDate(attendanceData[i].inTime).getHours() * 60 + DateFormat.getDate(attendanceData[i].inTime).getMinutes()
				> DateFormat.getDate(attendanceData[i].outTime).getHours() * 60 + DateFormat.getDate(attendanceData[i].outTime).getMinutes()) {
				this.show('ocduproj.endtimecannot', 'warn');
				is.valid = false;
				return is.valid;
			}
			if(DateFormat.compareDate(DateFormat.getDate(attendanceData[i].eventDate), DateFormat.getDate()) == 1 && !this.cancelFlagOutcomesList.filter(ele => ele.outcomeCode == attendanceData[i].eventOutcome)[0]){
				this.show('ocduproj.futureappointmentcanbesavewithcancel', 'warn');
				is.valid = false;
				return is.valid;
			}
		}
		return is.valid;
	}

	/**
	* This function will be executed when commit event is
	* fired
	*/
	ocduprojSaveskillsForm(event) {


		this.skillsInsertList = event.added;
		this.skillsUpdatetList = event.updated;
		this.skillsDeleteList = event.removed;
		this.skillsCommitModel.insertList = [];
		this.skillsCommitModel.updateList = [];
		this.skillsCommitModel.deleteList = [];
		this.skillsCommitModel.eventUpdateList = [];

		

		if (!this.validationSkills(this.skillsInsertList)) {
			return;
		}
		if (!this.validationSkills(this.skillsUpdatetList)) {
			return;
		}

		if(!this.attendanceModelTemp.eventId){
			this.attendanceCommitModel.updateList = [];
			this.attendanceCommitModel.updateList.push(this.attendanceModelTemp);
			if (this.attendanceCommitModel.updateList.length > 0) {
				for (let i = 0; i < this.attendanceCommitModel.updateList.length; i++) {
					this.attendanceCommitModel.updateList[i].nbtProjectRefStrId = this.projallocModelData.offPrgrefId;
					this.attendanceCommitModel.updateList[i].nbtRefCrsActyId = this.projallocModelData.crsActyId;
					this.attendanceCommitModel.updateList[i].agyLocId = this.sessionManager.currentCaseLoad;
					this.attendanceCommitModel.updateList[i].supervisorStaffId = Number(this.attendanceCommitModel.updateList[i].supervisorStaffId);
					this.attendanceCommitModel.updateList[i].creditedHours = 0;
					this.skillsCommitModel.eventUpdateList = this.attendanceCommitModel.updateList;
				}
			}
		}

		if (this.skillsInsertList.length > 0 || this.skillsUpdatetList.length > 0) {
			for (let i = 0; i < this.skillsInsertList.length; i++) {
				this.skillsInsertList[i].eventId = this.attendanceModelTemp.eventId;
				this.skillsInsertList[i].noOfHours = (DateFormat.getDate(this.skillsInsertList[i].noOfHours).getHours()) +
					(DateFormat.getDate(this.skillsInsertList[i].noOfHours).getMinutes()) / 60;
			}
			this.skillsCommitModel.insertList = this.skillsInsertList;


			for (let i = 0; i < this.skillsUpdatetList.length; i++) {
				this.skillsUpdatetList[i].noOfHours = (DateFormat.getDate(this.skillsUpdatetList[i].noOfHours).getHours()) +
					(DateFormat.getDate(this.skillsUpdatetList[i].noOfHours).getMinutes()) / 60;
			}
			this.skillsCommitModel.updateList = this.skillsUpdatetList;
		}
		if (this.skillsDeleteList.length > 0) {
			for (let i = 0; i < this.skillsDeleteList.length; i++) {
				this.skillsDeleteList[i].noOfHours = (DateFormat.getDate(this.skillsDeleteList[i].noOfHours).getHours()) +
					(DateFormat.getDate(this.skillsDeleteList[i].noOfHours).getMinutes()) / 60;
			}
			this.skillsCommitModel.deleteList = this.skillsDeleteList;
		}
		const skillsSaveData = this.ocduprojFactory.skillsCommit(this.skillsCommitModel);
		skillsSaveData.subscribe(data => {
			if (data === 1) {
				this.show('common.addupdateremoverecordsuccess', 'success');
				if(!this.attendanceModelTemp.eventId){
					this.ocduprojPopulateAttendanceDetails(this.attendanceModel,this.tableIndexatten);
				}else{
					this.executeQuerySkills();
				}
			} else if (data == 0) {
				this.show('common.addupdateremoverecordfailed', 'warn');
				this.executeQuerySkills();
			} else if (data == 2) {
				this.show('ocduproj.rowalready', 'warn');
				this.executeQuerySkills();
			} else if (data == 3) {
				this.show('ocduproj.rowalready', 'warn');
				this.executeQuerySkills();
			}
		});
	}

	validationSkills(skillsRowData: any) {
		const is = { valid: true };
		for (let i = 0; i < skillsRowData.length; i++) {
			if (!skillsRowData[i].skillCode) {
				this.show('ocduproj.skillmust', 'warn');
				is.valid = false;
				return is.valid;
			}
			if (!skillsRowData[i].noOfHours) {
				this.show('ocduproj.hoursmust', 'warn');
				is.valid = false;
				return is.valid;
			}

			if (!skillsRowData[i].firstName) {
				this.show('ocduproj.tutormust', 'warn');
				is.valid = false;
				return is.valid;
			}
			if (JSON.stringify(skillsRowData[i].noOfHours) === '"Invalid date"') {
				this.show('ocduproj.invalidtime', 'warn');
				is.valid = false;
				return is.valid;
			}
		}
		return is.valid;
	}
	/**
	* This function will be executed when commit event is
	* fired
	*/
	ocduprojSavecreditadjForm(event) {
		this.creditadjInsertList = event.added;
		this.creditadjUpdatetList = event.updated;
		this.creditadjDeleteList = event.removed;
		this.creditadjCommitModel.insertList = [];
		this.creditadjCommitModel.updateList = [];
		this.creditadjCommitModel.deleteList = [];

		if (!this.creditAdjValidation(this.creditadjInsertList)) {
			return;
		}

		if (this.creditadjInsertList.length > 0 || this.creditadjUpdatetList.length > 0) {
			for (let i = 0; i < this.creditadjInsertList.length; i++) {
				this.creditadjInsertList[i].adjustmentMinutes =
					(DateFormat.getDate(this.creditadjInsertList[i].adjustmentMinutes).getMinutes())
					+ DateFormat.getDate(this.creditadjInsertList[i].adjustmentMinutes).getHours() * 60;
				this.creditadjInsertList[i].offenderBookId = this.offenderBookidTemp;
				this.creditadjInsertList[i].sentenceSeq = this.sentenceSeqTemp;
				this.creditadjInsertList[i].orderType = this.unpaidwkModel.orderType;
				this.creditadjInsertList[i].offenderSentConditionId = this.unpaidwkModel.offenderSentConditionId;
			}
			for (let i = 0; i < this.creditadjUpdatetList.length; i++) {
			}
			this.creditadjCommitModel.insertList = this.creditadjInsertList;
			this.creditadjCommitModel.updateList = this.creditadjUpdatetList;
		}
		if (this.creditadjDeleteList.length > 0) {
			for (let i = 0; i < this.creditadjDeleteList.length; i++) {
			}
			this.creditadjCommitModel.deleteList = this.creditadjDeleteList;
		}
		const creditadjSaveData = this.ocduprojFactory.creditAdjCommit(this.creditadjCommitModel);
		creditadjSaveData.subscribe(data => {
			if (data === 1) {
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.ocduprojexecuteQuery();
			} else {
				this.show('common.addupdateremoverecordfailed', 'warn');
				this.creditadjExecuteQuery();
			}
		});
	}


	creditAdjValidation(creditadjData: any) {
		const is = { valid: true };

		for (let i = 0; i < creditadjData.length; i++) {
			if (!creditadjData[i].adjustmentDate) {
				this.show('ocduproj.datemustbe', 'warn');
				is.valid = false;
				return is.valid;
			}

			if (!creditadjData[i].adjustmentMinutes) {
				this.show('ocduproj.adjustmentmust', 'warn');
				is.valid = false;
				return is.valid;
			}

			if (!creditadjData[i].adjustmentType) {
				this.show('ocduproj.debitmustbe', 'warn');
				is.valid = false;
				return is.valid;
			}

			if (!creditadjData[i].reasonCode) {
				this.show('ocduproj.reasonmust', 'warn');
				is.valid = false;
				return is.valid;
			}
			if (DateFormat.getDate(creditadjData[i].adjustmentMinutes).getMinutes() === 0 &&
				DateFormat.getDate(creditadjData[i].adjustmentMinutes).getHours() === 0) {
				this.show('ocduproj.adjustmentcannot', 'warn');
				is.valid = false;
				return is.valid;
			}

			if (DateFormat.compareDate(DateFormat.getDate(this.creditadjModelTemp.adjustmentDate), DateFormat.getDate(creditadjData[i].adjustmentDate)) === 1) {
				this.show(this.translateService.translate('ocduproj.adjustmentvalidate') + this.creditadjModelTemp.adjustmentDate + '].', 'warn');
				is.valid = false;
				return is.valid;
			}

			if (DateFormat.compareDate(DateFormat.getDate(creditadjData[i].adjustmentDate), DateFormat.getDate()) === 1) {
				this.show('ocduproj.adjustmentdatelatervalidate', 'warn');
				is.valid = false;
				return is.valid;
			}

		}

		return is.valid;
	}

	onGridInsert = () => {
		return {
			'btn': '...', 'offenderProgramStatus': 'REF','reminder':''
		};
	}

	onGridInsertCredAdju = () => {
		return {
			adjustmentMinutes: DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)),
			adjustmentDate: DateFormat.getDate(),
		}
	}

	onbackBtnClick = () => {
		if (this.ocduprojFactory.backBtnEnable) {
			this.ocduprojFactory.backBtnEnable = false;
			this.backBtn = false;
			this.router.navigate(['/OCDUATTE']);
		}

		if (this.backBtn) {
			this.ocdclogsFactory.exitFlag = false;
			this.backBtn = false;
			this.router.navigate(['/OCDCLOGS']);
		}
	}
	onGridSkillInsert = () => {
		return {
			btn: '',
		};

	}

	validateRowSkills = (event) => {
		const index = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		if (event && event.eventId && event.skillCode) {
			for (let i = 0; i < this.skillsData.length; i++) {
				if (event.eventId === this.skillsData[i].eventId && event.skillCode === this.skillsData[i].skillCode) {
					this.show('ocduproj.errorrowexistsinoffendercourseskills', 'warn');
					return rowdata.validated = false;
				}
				return rowdata.validated = true;
			}
		}
		rowdata.validated = true;
		return rowdata;
	}



	onViewChange(event) {
		if (event && event.code) {
			this.averageWeekHours = '00:00';
			this.viewTemp = event.code;
			this.projallocModel.view = event.code;
			if(this.vHeaderBlockModel && this.vHeaderBlockModel.offenderId){
				this.ocduprojPopulateAttendanceDetails(this.projallocModel);
			}	
		} else {
			this.attendanceData = [];
			this.skillsData = [];
		}
	}

	onViewBlur() {

	}

	creditAdjEdit = (data: any, index: number, field: string): boolean => {
		if (!data.createDatetime) {
			return true;
		} else {
			return false;
		}
	}
	creditAdjEditGridTwo = (data: any, index: number, field: string): boolean => {
		if (!data.offPrgrefId) {
			return true;
		} else {
			return false;
		}
	}


	attandanceEditSuper = (data: any, index: number, field: string): boolean => {
		if (data && data.supervisorStaffId) {
			return false;
		} else {
			return true;
		}
	}
	penaltyEdit = (data: any, index: number, field: string): boolean => {
		if (data && data.eventOutcome == 'ATT') {
			return true;
		} else {
			return false;
		}
	}
	whenTabChangedTrigger(event) { }

	scheduleBtnClose(event) {
		if (this.projallocModel) {
			this.ocduprojPopulateAttendanceDetails(this.projallocModel);
		}
	}

	get creditAdjInsert() {
		if (this.unpaidwkModel.sentenceSeq) {
			return true;
		}
		return false;
	}

	onScheduleClick = () => {
		this.projallocTempModel = new VOffenderProgramProfiles();
		this.projallocTempModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
		this.projallocTempModel.offenderIdDisplay=this.vHeaderBlockModel.offenderIdDisplay;
		this.projallocTempModel.offenderName = this.vHeaderBlockModel.lastName + ' ' + this.vHeaderBlockModel.firstName;
		let projServiceData = [];
		projServiceData.push(this.projallocModelData);
		this.projallocTempModel.prgServiceList = projServiceData;
		this.projallocCommitModel = new OffenderProgramProfilesCommitBean();
		this.projallocCommitModel.insertList = [];
		this.projallocCommitModel.insertList.push(this.projallocModel);
		this.ocduprojFactory.checkingNonAssociation(this.projallocCommitModel).subscribe(data => {
			if (data && data != 'EMPTYDATA') {
				data = data.replaceAll('ocduproj.programnonassciationmessage',this.translateService.translate('ocduproj.programnonassciationmessage'));
				data = data.replaceAll('ocuoscpv.weeklydefinition',this.translateService.translate('ocuoscpv.weeklydefinition'));
				data = data.replaceAll('ocuoscpv.offenderschedules',this.translateService.translate('ocuoscpv.offenderschedules'));
				data = data.replaceAll('ocduproj.schedulesnotfound',this.translateService.translate('ocduproj.schedulesnotfound'));
				data = data.replaceAll('ocduproj.doyouwanttocontinue','');
				data=data.replaceAll('The following offender(s)',this.projallocTempModel.offenderName+', '+	this.projallocTempModel.offenderIdDisplay);
				const data1 = {
					label: this.translateService.translate(data),  yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok')
				};
				this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data1, 50).subscribe(result => {
					if (result) {
						this.dialogService.openLinkDialog('/OCUOSCPV', this.projallocModelData, 50).subscribe(result => {
							this.communityServiceClick(this.unpaidwkModel);
						});
					} else {
						return;
					}
				});
			} else {
				this.dialogService.openLinkDialog('/OCUOSCPV', this.projallocModelData, 50).subscribe(result => {
					this.communityServiceClick(this.unpaidwkModel);
				});
			}
		});
	}


	validateRowDataProjalloc = (event) => {
		const rowdata = new ValidateRowReturn();
		const index = event.rowIndex;
		if (event.field === 'offenderStartDate') {
			if (event.data.offenderStartDate && DateFormat.compareDate(DateFormat.getDate(event.data.offenderStartDate), DateFormat.getDate()) === -1) {
				this.projalloctab.setColumnData('offenderStartDate', index, undefined);
				this.show('ocduproj.offenderstartdatemustbefuturedate', 'warn');
			}
		}
		if (event.field === 'offenderProgramStatus') {
			for (let i = 0; i < this.projallocDataTempOne.length; i++) {
				if (event.data.offPrgrefId && (this.projallocDataTempOne[i].offPrgrefId === event.data.offPrgrefId) &&
					(this.projallocDataTempOne[i].offenderProgramStatus === 'CANC' && event.data.offenderProgramStatus === 'REF')) {
					this.projalloctab.setColumnData('offenderEndDate', index, undefined);
					this.projalloctab.setColumnData('offenderStartDate', index, undefined);
					rowdata.validated = true;
					return rowdata;
				}
			}
		}
		if (event.field === 'offenderProgramStatus') {
			if(event.data.offenderProgramStatus==="ALLOC"){
			}
		}
		rowdata.validated = true;
		return rowdata;
	}

	statusCellEdit = (data: any, index: number, field: string): boolean => {
		if (!data.createDatetime && field === 'offenderProgramStatus') {
			return false;
		}
		return true;
	}


	statusRowValidation(projallocData: any) {
		const is = { valid: true };
		for (let i = 0; i < projallocData.length; i++) {

			const index = this.projallocData.indexOf(projallocData[i]);

			for (let j = 0; j < this.projallocDataTempOne.length; j++) {
				if (projallocData[i].offPrgrefId === this.projallocDataTempOne[j].offPrgrefId && ((this.projallocDataTempOne[j].offenderProgramStatus === 'CANC'))) {
					if (projallocData[i].offenderProgramStatus !== 'REF') {
						this.show('ocduproj.youcannotupdatecanctoanother', 'warn');
						is.valid = false;
						return is.valid;
					}
				}
				if (projallocData[i].offPrgrefId === this.projallocDataTempOne[j].offPrgrefId && (((this.projallocDataTempOne[j].offenderProgramStatus === 'ALLOC') || (this.projallocDataTempOne[j].offenderProgramStatus === 'COMP')) && (projallocData[i].offenderProgramStatus === 'REF' || projallocData[i].offenderProgramStatus === 'CANC'))) {
					this.show('ocduproj.youcannotupdatedstatusfromallocatedtoreferrandcanc', 'warn');
					is.valid = false;
					return is.valid;
				}
			}

			for (let x = 0; this.projallocData.length > x; x++) {
				if (index !== x && (this.projallocData[x].projectCode == projallocData[i].projectCode && this.projallocData[x].offenderProgramStatus == projallocData[i].offenderProgramStatus)) {
					this.show('ocduproj.rowexist');
					is.valid = false;
					return;
				}
			}
		}
		
		
		return is.valid;
	}

	validateRowCredit = (event) => {
		const rowdata = new ValidateRowReturn();
		const index = event.rowIndex;
		if (event.field === 'adjustmentMinutes' || event.field === 'adjustmentType') {
			if (event.data.adjustmentMinutes && event.data.adjustmentType) {
				let crhrs = DateFormat.getDate(event.data.adjustmentMinutes).getHours() * 60;
				let crMins = (crhrs + DateFormat.getDate(event.data.adjustmentMinutes).getMinutes()) / 60;
				let crUnits = Number((Math.round(crMins * 100) / 100).toFixed(2));
				if (event.data.adjustmentType === 'D' && this.unpaidwkModel.creditedUnits < crUnits) {
					this.show('ocduproj.debitislargefornegativebal', 'warn');
					this.creditadjtab.setColumnData('adjustmentMinutes', index, undefined);
				}
			}
		}
		rowdata.validated = true;
		return rowdata;
	}
	getOrderStatus() {
		this.ocduprojFactory.rgOrderStatus().subscribe(data => {
			if (data) {
				this.orderStatusData = data;
			}
		});
	}

	ngOnDestroy() {
		this.ocduprojFactory.ocduprojBackBtnFlag = false;
		this.schedularService.backBtnFlag = false;
		if(!this.router.url.includes('/EOFFENDER')){
			this.eoffenderService.selectedRowData=null;
		}
	  }
	  viewLaunchRemender= (event) =>{
		event.screenId = 'OCDUPROJ';
        if (event.offenderProgramStatus !== 'ALLOC') {
            this.show(this.translateService.translate('ocduproj.cancelevents'), 'warn');
            return;
        }
		this.dialogService.openLinkDialog('/OCUREMIN', event,25).subscribe(result => {
		});
	  }

	commexecuteQuery() {
		this.unpaidwkBean.offenderBookId = this.vHeaderBlockModel.offenderBookId;
		const serviceObj = this.ocduprojFactory.unpaidWkExecuteQuery(this.unpaidwkBean);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
			} else if (data !== undefined && data.length > 0) {
				data.forEach(element => {
					if (element.creditedUnits && element.creditedUnits !== null && element.creditedUnits.toString().includes('.')) {
						var val = element.creditedUnits + '';
						var phour = element.creditedUnits;
						var lvalue;
						var det = val.split('.');
						var lhour = Number(det[0]);
						if (lhour < 10) {
							lvalue = '0' + lhour + '.'
						} else {
							lvalue = lhour + '.'
						}
						var minutes = (phour - lhour) * 60;
						if (minutes < 10) {
							lvalue = lvalue + '0' + Math.round(minutes);
						} else {
							lvalue = lvalue + Math.round(minutes);
						}
						element.creditedUnits = Number(lvalue);
					}

					if (element.remaining && element.remaining !== null && element.remaining.toString().includes('.')) {
						var val = element.remaining + '';
						var phour = element.remaining;
						var lvalue;
						var det = val.split('.');
						var lhour = Number(det[0]);
						if (lhour < 10) {
							lvalue = '0' + lhour + '.'
						} else {
							lvalue = lhour + '.'
						}
						var minutes = (phour - lhour) * 60;
						if (minutes < 10) {
							lvalue = lvalue + '0' + Math.round(minutes);
						} else {
							lvalue = lvalue + Math.round(minutes);
						}
						element.remaining = Number(lvalue);
					}
					if (this.unpaidwkModel.offenderBookId === element.offenderBookId && this.unpaidwkModel.sentenceSeq === element.sentenceSeq) {
						const index = this.unpaidwkData.indexOf(this.unpaidwkModel);
						this.grid.setColumnData('remaining',index,element.remaining);
						this.grid.setColumnData('creditedUnits',index,element.creditedUnits);
					}
				})
			}
		});
	}

	getCancelFlagOutcomes() {
		let searchObj = new EventMeasures();
		searchObj.eventType = 'UW';
		this.ocduprojFactory.cancelFlagOutcomeList(searchObj).subscribe(outcomeList => {
			this.cancelFlagOutcomesList = outcomeList ? outcomeList : [];
		})
	}

	onEoffenderClick = (data) => {
       this.eoffenderService.selectedRowData=data;
	   this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : data['SCREEN'] } } );
	}
}

