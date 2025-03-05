import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcduatteService } from '../service/ocduatte.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderCourseEventsCommitBean } from '@inst/institutional-activities/beans/VOffenderCourseEventsCommitBean';
import { OffenderCourseSkillsCommitBean } from '../beans/OffenderCourseSkillsCommitBean';
import { VOffenderCourseEvents } from '@inst/institutional-activities/beans/VOffenderCourseEvents';
import { OffenderCourseSkills } from '../beans/OffenderCourseSkills';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { Router } from '@angular/router';
import { OcduprojService } from '../service/ocduproj.service';
import { TimeFormat } from '@core/ui-components/time/timeFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { EventMeasures } from '@iwp/beans/EventMeasures';
import { EventMeasureOutcomes } from '@iwp/beans/EventMeasureOutcomes';
// import required bean declarations

@Component({
	selector: 'app-ocduatte',
	templateUrl: './ocduatte.component.html'
})

export class OcduatteComponent implements OnInit {
	// Variable declaration
	@ViewChild('gridOne', { static: true }) gridOne: any;
	@ViewChild('gridTwo', { static: true }) gridTwo: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	offcourseattendData: VOffenderCourseEvents[] = [];
	offcourseattendDataTemp: VOffenderCourseEvents[] = [];
	// TODO angular.copy(this.offcourseattendData, thisoffcourseattendDataTemp);
	offcourseattendModel: VOffenderCourseEvents = new VOffenderCourseEvents();
	offcourseattendIndex: number = 0;
	offcourseattendInsertList: VOffenderCourseEvents[] = [];
	offcourseattendUpdatetList: VOffenderCourseEvents[] = [];
	offcourseattendDeleteList: VOffenderCourseEvents[] = [];
	offcourseattendCommitModel: VOffenderCourseEventsCommitBean = new VOffenderCourseEventsCommitBean();
	offcourseskillsData: OffenderCourseSkills[] = [];
	offcourseskillsDataTemp: OffenderCourseSkills[] = [];
	// TODO angular.copy(this.offcourseskillsData, thisoffcourseskillsDataTemp);
	offcourseskillsModel: OffenderCourseSkills = new OffenderCourseSkills();
	offcourseskillsIndex: number = 0;
	offcourseskillsInsertList: OffenderCourseSkills[] = [];
	offcourseskillsUpdatetList: OffenderCourseSkills[] = [];
	offcourseskillsDeleteList: OffenderCourseSkills[] = [];
	offcourseskillsCommitModel: OffenderCourseSkillsCommitBean = new OffenderCourseSkillsCommitBean();
	tempVOffenderCourseEvents: VOffenderCourseEvents = new VOffenderCourseEvents();
	staffIdObj: OffenderCourseSkills = new OffenderCourseSkills();
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	offCourseSkillsColumnDef: any[];
	offCourseAttendColumnDef: any[];
	ctrlReadOnly: boolean = false;
	offCourseAttendReadOnly: boolean = false;
	offCourseSkillsReadOnly: boolean = false;
	rgattendanceRg: any[] = [];
	rgsupervisorRg: any[] = [];
	rgbehaviourRg: any[] = [];
	rgworkqualityRg: any[] = [];
	rgprojectsRg: any[] = [];
	rgprojects2Rg: any[] = [];
	rgskillsRg: any[] = [];
	rgstaffcheckRg: any[] = [];
	rgteamsRg: any[] = [];
	tableIndex = -1;
	teamLov: string;
	rgTeamTitle = { description: this.translateService.translate('common.team'), code: this.translateService.translate('common.code') };
	rgPCodeTitle = { code: this.translateService.translate('common.code'), description: this.translateService.translate('common.description') };
	rgSkillsTitle = { description: this.translateService.translate('ocduatte.skill'), code: this.translateService.translate('common.code') };
	rgSuperTitle = { description: this.translateService.translate('Supervisor'), code: this.translateService.translate('common.code') };
	rgProjectLov: string;
	nbtTeamId: any;
	nbtDate: Date;
	nbtTeam: any;
	nbtProject: any;
	pShowOutcome = "";
	nbtCodLov: any;
	nbtNoOfHours: Date;
	sysDate: Date;
	offenderBookId: number;
	hoursToDat: any;
	p_penalty_hours: any;
	vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
	nbtPenaltyVald: boolean;
	nbtCrsActyId: any;
	alertDelete: boolean;
	alterInsert: boolean;
	tableIndexTwo = -1;
	clearBtnDisable: boolean;
	retrieveBtnDisable: boolean;
	projectaDisable: boolean;
	dateReadOnly: boolean;
	teamReadOnly: boolean;
	projectReadOnly: boolean;
	attendanceforReadOnly: boolean;
	nbtTeamAreaCode: string;
	nbtTeamAgyLocId: string;
	courseCodeTemp: any;
	sharingData: VOffenderCourseEvents = new VOffenderCourseEvents();
	retTemp: boolean;
	cancelFlagOutcomesList : EventMeasureOutcomes [] =[];
	constructor(private ocduatteFactory: OcduatteService, public translateService: TranslateService, public sessionManager: UserSessionManager,
		private router: Router, private ocduprojFactory: OcduprojService, public dialogService: DialogService, private offenderSearchService: OffenderSearchService, public osiosearFactory: OsiosearService) {
		// TODO initilize data members here..!
		this.offCourseSkillsColumnDef = [];
		this.offCourseAttendColumnDef = [];
	}
	ngOnInit() {
		this.getCancelFlagOutcomes();
		this.alertDelete = true;
		this.alterInsert = false;
		this.clearBtnDisable = true;
		this.retrieveBtnDisable = false;
		this.projectaDisable = true;
		this.dateReadOnly = false;
		this.teamReadOnly = false;
		this.projectReadOnly = false;

		if (this.ocduprojFactory.ocduprojBackBtnFlag) {
			this.ocduprojFactory.ocduprojBackBtnFlag = false;
		 }

		this.offCourseSkillsColumnDef = [
			{
				fieldName: this.translateService.translate('ocduatte.skills'), field: 'skillCode', editable: true, width: 150, required: true,
				// link: 'ocduatte/rgSkillsRecordGroup'
				domain:'PS_UPW_SKILL', datatype: 'lov', titles: this.rgSkillsTitle,
			},
			{ fieldName: this.translateService.translate('ocduatte.hours'), field: 'nbtNoOfHours', editable: true, width: 150, required: true, datatype: 'time' },
			{ fieldName: this.translateService.translate('ocduatte.tutororstaff'), field: 'staffDesc', editable: false, width: 150, required: true, },
			{
				fieldName: '', field: 'butTutor',
				datatype: 'launchbutton', updateField: 'row',data: 'row',
				editable: true, width: 150, dialogWidth: '60', modal: true, onLaunchClick: this.goBtnLaunchClick
			},
			{ fieldName: this.translateService.translate('ocduatte.commentorotesattendance'), field: 'commentText', editable: true, width: 150 },
			{ fieldName: '', field: 'staffId', hide: true },
		];
		this.offCourseAttendColumnDef = [
			{ fieldName: this.translateService.translate('common.aos'), field: 'pOffenderIdDisplay', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('common.name'), field: 'pName', editable: false, width: 150 },
			{
				fieldName: this.translateService.translate('ocduatte.attendance'), field: 'eventOutcome', editable: true, width: 150, required: true,
				link: 'ocduatte/rgAttendanceRecordGroup?pShowOutcome=' + this.pShowOutcome, datatype: 'lov',source:'OCMEVENT'
			},
			{ fieldName: this.translateService.translate('common.startTime'), field: 'startTime', editable: true, width: 150, required: true, datatype: 'time' },
			{ fieldName: this.translateService.translate('common.endTime'), field: 'endTime', editable: true, width: 150, required: true, datatype: 'time' },
			{ fieldName: this.translateService.translate('ocduatte.hours'), field: 'nbtHours', false: true, width: 150, datatype: 'time' },
			{ fieldName: this.translateService.translate('ocduatte.travel'), field: 'nbtTravel', false: true, width: 150, datatype: 'time' },
			{ fieldName: this.translateService.translate('ocduatte.penalty'), field: 'nbtPenalty', editable: true, width: 150, datatype: 'time', cellEditable: this.canCellEdit },
			{ fieldName: this.translateService.translate('ocduatte.credit'), field: 'nbtCreditedHours', editable: false, width: 150, datatype: 'time' },
			{
				fieldName: this.translateService.translate('ocduatte.supervisor'), field: 'supervisorStaffId', editable: true, width: 150, required: false,
				link: 'ocduatte/rgSupervisorRecordGroup?crsActyId=', parentField: 'nbtRecordCrsActyId', datatype: 'lov',titles: this.rgSuperTitle
			},
			{
				fieldName: this.translateService.translate('ocduatte.behavior'), field: 'behaviourCode', editable: true, width: 150,
				domain:'PS_BEHAVIOUR',
				// link: 'ocduatte/rgBehaviourRecordGroup',
				 datatype: 'lov', titles: { description: this.translateService.translate('ocduatte.behavior'), code: this.translateService.translate('common.code') }
			},
			{
				fieldName: this.translateService.translate('ocduatte.workquality'), field: 'performanceCode', editable: true, width: 150,
				domain:'PS_UPW_QUAL'
				// link: 'ocduatte/rgWorkQualityRecordGroup'
				, datatype: 'lov', titles: { description: this.translateService.translate('ocduatte.quality'), code: this.translateService.translate('common.code') }
			},
			{ fieldName: this.translateService.translate('ocduatte.comment'), datatype: 'text',field: 'commentText', editable: true, width: 150 },
			{
				fieldName: this.translateService.translate('ocduatte.attendanceforproject'), field: 'courseCode', editable: true, width: 150, required: true,source:'OCMSUWPJ',
				link: 'ocduatte/rgProjects2RecordGroup?offenderBookId=' ,parentField: 'offenderBookId', datatype: 'lov', titles: this.rgPCodeTitle,
			},
			{ fieldName: '', field: 'offPrgrefId', hide: true },
			{ fieldName: '', field: 'creditedHours', hide: true },
			{ fieldName: '', field: 'nbtRecordOffPrgrefId', hide: true },
			{ fieldName: '', field: 'nbtRecordCrsActyId', hide: true },
			{ fieldName: '', field: 'unexcusedAbsenceFlag', hide: true },
			{ fieldName: '', field: 'parentField', hide: true, width: 150 },
			{ fieldName: '', field: 'offenderBookId', hide: true, width: 150 },


		];
		// TODO all initializations here
		var serviceObj;
		this.teamLov = 'ocduatte/rgTeamsRecordGroup';
			if(this.ocduprojFactory.ocduatteBackBtnFlag && !this.ocduprojFactory.ocduprojBackBtnFlag){
					this.sharingData = this.ocduprojFactory.ocduprojScreenObj;
					this.nbtDate =   this.sharingData.eventDate 
					this.nbtTeam = this.sharingData.agyLocId;
					this.nbtTeamId = this.sharingData.teamId
					this.nbtProject =	this.sharingData.crsActyId
					this.retTemp = true;
					setTimeout(() => {
						this.ocduatteexecuteQuery(this.nbtDate);
					},1000
					);
				this.ocduprojFactory.ocduatteBackBtnFlag = false;
			}
	}
	canCellEdit = (data: any, index: number, field: string): boolean => {
		if (this.offcourseattendModel.eventOutcome !== 'ATT' &&
			this.offcourseattendModel.eventOutcome !== 'ATTSH' && this.offcourseattendModel.eventOutcome !== 'UB' && field === 'nbtPenalty') {
			return false;
		} else {
			return true;
		}

	}
	goBtnLaunchClick = (event) => {
		const rowIndex = this.offcourseskillsData.indexOf(this.offcourseskillsModel);
		var data = {
			'areaCode': this.nbtTeamAreaCode,
			'agyLocType': 'COMM',
			'agencyLocationType': this.nbtTeamAgyLocId,
		}
		this.dialogService.openLinkDialog('/OCUCSTAF', data, 70).subscribe(result => {
			if (result && result.staffId) {
				this.gridTwo.setColumnData('staffId', rowIndex, result.staffId);
				this.staffIdObj.staffId = result.staffId;
				const serviceObj = this.ocduatteFactory.getStaffName(this.staffIdObj);
				serviceObj.subscribe(data => {
					if (data) {
						this.gridTwo.setColumnData('staffDesc', rowIndex, data);
					}
				});
			}
		});
		return false;
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
	onRowClickoffcourseattend(event) {
		if (event) {
			this.alterInsert = true;
			this.offcourseattendModel = event;
			this.courseCodeTemp = event.courseCode;
			this.offCourseAttendColumnDef[2].link = 'ocduatte/rgAttendanceRecordGroup?pShowOutcome=' + this.pShowOutcome;
			this.offCourseAttendColumnDef[9].link = 'ocduatte/rgSupervisorRecordGroup?crsActyId=' + event.crsActyId;
			this.offCourseAttendColumnDef[13].link = 'ocduatte/rgProjects2RecordGroup?offenderBookId=' + event.offenderBookId;
			this.nbtCodLov = 'ocduatte/rgProjects2RecordGroup?offenderBookId=' + event.offenderBookId;
			this.offcourseskillsModel.eventId = this.offcourseattendModel.eventId;
			this.offenderBookId = event.offenderBookId;
		//	this.gridOne.prepareAgColumnDef();
			this.offbkgGlobalQuery();
			this.offcourseskillsExecuteQuery();
		}
	}
	offbkgGlobalQuery() {
		this.vHeaderBlockModel = new VHeaderBlock();
		this.vHeaderBlockModel.offenderIdDisplay = this.offcourseattendModel.pOffenderIdDisplay;
		this.vHeaderBlockModel.offenderBookId = this.offcourseattendModel.offenderBookId;
		this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
		const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
		offbkGlobal.subscribe(list => {
			if (list.length > 0) {
				this.vHeaderBlockModel = list[0];
				this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
			}
		});
	}
	onButProjectAllocationsclick() {
		if (this.gridOne.addedMap.size === 0 && this.gridOne.updatedMap.size === 0 &&
			this.gridOne.removedMap.size === 0
			&& this.gridTwo.addedMap.size === 0 && this.gridTwo.updatedMap.size === 0 && this.gridTwo.removedMap.size === 0) {
			this.ocduprojFactory.backBtnEnable = true;
			this.sharingData.eventDate = this.nbtDate;
			this.sharingData.teamId = this.nbtTeamId;
			this.sharingData.crsActyId = this.nbtProject;
			//this.ocduprojFactory.saveData(this.sharingData);
			this.ocduprojFactory.ocduatteScreenObj = this.sharingData;
			this.ocduprojFactory.ocduprojBackBtnFlag = true;
			this.router.navigate(['/OCDUPROJ']);
		} else {
			this.show(this.translateService.translate('ocduatte.savethechangesmsg'), 'warn');
			return;
		}
	}
	onRowClickoffcourseskills(event) {
		if (event) {
			this.offcourseskillsModel = event;
		}
		if (event && event.createDatetime && event.createDatetime) {
			this.alertDelete = true;
		} else {
			this.alertDelete = false;
		}
	}
	cancel() {
	}
	hoursToDate(p_hours) {
		let l_hours = 0;
		let l_min = 0;
		p_hours = p_hours ? p_hours : 0;
		l_hours = Math.floor(p_hours);
		l_min = (p_hours - l_hours) * 60;
		return DateFormat.getDate(DateFormat.getDate().setHours(l_hours, Math.round(l_min), 0, 0));
	}
	dateToHours(date) {
		let l_hours = 0;
		let l_min = 0;
		if (date) {
			l_hours = DateFormat.getDate(date).getHours();
			l_min = DateFormat.getDate(date).getMinutes() / 60;
			return l_hours + l_min;
		}
		return 0;
	}
	calcCredit(p_hours, p_travel, p_penalty) {
		let p_hours_hours = 0;
		let p_penalty_hours = 0;
		p_penalty = p_penalty ? p_penalty : 0;
		p_hours_hours = this.dateToHours(p_hours);
		p_penalty_hours = this.dateToHours(p_travel);
		return (p_hours_hours + p_penalty_hours) - p_penalty;
	}
	handleHours(event, rowIndex) {
		if (event && (event.eventOutcome === 'ATT' || event.eventOutcome === 'ATTSH' || event.eventOutcome === 'UB')) {
			let credited_hours_result = 0;
			let endTime = 0
			let startTime = 0;
			let agreed_travel_hour = 0;
			let nbt_hours_date_to_hours = 0;
			this.p_penalty_hours = null;
			if (event && event.startTime) {
				startTime = this.dateToHours(event.startTime);
			}
			if (event && event.endTime) {
				endTime = this.dateToHours(event.endTime);
			}
			if (event && event.agreedTravelHour) {
				agreed_travel_hour = event.agreedTravelHour;
			}
			const nbtHoursDate = this.hoursToDate(endTime - startTime);
			event.nbtHours = DateFormat.getDate(nbtHoursDate);
			event.nbtTravel = this.hoursToDate(agreed_travel_hour);
			if (event && event.creditedHours) {
				nbt_hours_date_to_hours = this.dateToHours(event.nbtHours);
				credited_hours_result = event && event.creditedHours ? event.creditedHours : 0;
				this.p_penalty_hours = (nbt_hours_date_to_hours + agreed_travel_hour) - credited_hours_result;
				event.nbtPenalty = this.hoursToDate(this.p_penalty_hours);
			} else {
				event.creditedHours = this.calcCredit(event.nbtTravel, event.nbtTravel, this.p_penalty_hours)
			}
			event.nbtCreditedHours = this.hoursToDate(event.creditedHours);
		} else {
			event.nbtTravel = null;
			event.nbtPenalty = null;
			event.nbtCreditedHours = null;
		}
	}
	getHours(p_start_time, p_end_time) {
		let lv_hours = 0;
		let lv_start_hrs = 0;
		let lv_end_hrs = 0;

		if (p_start_time && p_end_time) {
			if (DateFormat.compareDateTime(DateFormat.getDate(p_start_time), DateFormat.getDate(p_end_time)) === 1) {
				this.show(this.translateService.translate('ocduatte.endtimelessthanmsg'), 'warn');
				return;
			} else {
				lv_start_hrs = this.dateToHours(p_start_time);
				lv_end_hrs = this.dateToHours(p_end_time);
				lv_hours = lv_end_hrs - lv_start_hrs;
				return lv_hours;
			}
		}

	}
	calculatePenalty(p_hours, p_travel, p_credited) {
		let lv_hours = 0;
		let lv_travel = 0;
		let lv_penalty;
		p_credited = p_credited ? p_credited : 0;
		lv_hours = this.dateToHours(p_hours);
		lv_travel = this.dateToHours(p_travel);
		lv_penalty = (lv_hours + lv_travel) - Math.round(p_credited);
		return lv_penalty;

	}
	calculateCreditedHours(p_hours, p_travel, p_penalty) {
		let lv_hours = 0;
		let lv_travel = 0;
		let lv_credited = 0;
		p_penalty = p_penalty ? p_penalty : 0;
		p_hours = p_hours ? DateFormat.getDate(p_hours) : DateFormat.getDate().setHours(0, 0, 0, 0);
		p_travel = p_travel ? DateFormat.getDate(p_travel) : p_travel;
		lv_hours = this.dateToHours(p_hours);
		lv_travel = this.dateToHours(p_travel);
		lv_credited = (lv_hours + lv_travel) - p_penalty;
		return Math.round(lv_credited);
	}
	computeHours(event, rowIndex) {
		let l_out_time = new Date();
		let l_in_time = new Date();
		let l_credited_hours;
		let dToHours = 0;
		l_in_time = DateFormat.getDate(DateFormat.getDate(DateFormat.getDate(event.eventDate).setHours(DateFormat.getDate(event.startTime).getHours())).setMinutes(DateFormat.getDate(event.startTime).getMinutes()));
		l_out_time = DateFormat.getDate(DateFormat.getDate(DateFormat.getDate(event.eventDate).setHours(DateFormat.getDate(event.endTime).getHours())).setMinutes(DateFormat.getDate(event.endTime).getMinutes()));
		let hours = this.getHours(l_in_time, l_out_time)
		dToHours = hours ? hours : 0;
		this.gridOne.setColumnData('nbtHours', rowIndex, this.hoursToDate(dToHours));
		if (event && event.agreedTravelHour) {
			this.gridOne.setColumnData('nbtTravel', rowIndex, this.hoursToDate(event.agreedTravelHour));
		}
		if (event && event.creditedHours && event.creditedHours > 0) {
			this.gridOne.setColumnData('nbtPenalty', rowIndex, this.hoursToDate(this.calculatePenalty(DateFormat.getDate(event.nbtHours), DateFormat.getDate(event.nbtTravel), event.creditedHours)));
			this.gridOne.setColumnData('nbtCreditedHours', rowIndex, this.hoursToDate(this.calculatePenalty(DateFormat.getDate(event.nbtHours), DateFormat.getDate(event.nbtTravel), event.creditedHours)));
		} else {
			if (event && event.eventOutcome && (event.eventOutcome === 'ATT' ||
				event.eventOutcome === 'ATTSH' || event.eventOutcome === 'UB')) {
				l_credited_hours = this.calculateCreditedHours(event.nbtHours, event.nbtTravel, event.nbtPenalty);
				this.gridOne.setColumnData('nbtCreditedHours', rowIndex, this.hoursToDate(l_credited_hours));
				event.creditedHours = l_credited_hours;
			}
		}
	}
	validateRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		const rowIndex = event.rowIndex;
		if (event.field === 'eventOutcome') {
			if (event.newValue) {
				if (!event.data.eventOutcome) {
					this.gridOne.setColumnData('eventOutcome', rowIndex, new VOffenderCourseEvents().eventOutcome);
					this.gridOne.setColumnData('unexcusedAbsenceFlag', rowIndex, null);
					rowdata.validated = true;
					return rowdata;
				} else {
					if (event && event.data && (event.data.eventOutcome !== 'ATT' &&
						event.data.eventOutcome !== 'ATTSH' && event.data.eventOutcome !== 'UB')) {
						this.gridOne.setColumnData('nbtHours', rowIndex, null);
						this.gridOne.setColumnData('nbtTravel', rowIndex, null);
						this.gridOne.setColumnData('nbtPenalty', rowIndex, null);
						this.gridOne.setColumnData('nbtCreditedHours', rowIndex, null);
						this.gridOne.setColumnData('creditedHours', rowIndex, null);
					} else {
						this.computeHours(event.data, rowIndex);
					}

				}
				if (event && event.data && event.data.eventOutcome != event.data.eventOutcomeDbVal) {
					const serviceObj = this.ocduatteFactory.checkUa(event.data);
					serviceObj.subscribe(data => {
						if (data && data.pNewUa) {
							this.gridOne.setColumnData('unexcusedAbsenceFlag', rowIndex, 'Y');
							if (data && data.pMultipleFailure) {
								this.show(this.translateService.translate('This functionality is not yet implemented  as it is currently  out of scope'), 'info');
								var plId = {
									'offenderBookId': event.offenderBookId,
									'eventOutcome': event.eventOutcome,
									'eventDate': event.eventDate,
									'eventId': event.eventId,
								}
								if (false) {
									this.dialogService.openLinkDialog('/OCUMULTI', plId, 70).subscribe(result => {
										if (result) {
										}
									});
								}
							} else {
								this.gridOne.setColumnData('unexcusedAbsenceFlag', rowIndex, null);
							}
						}
					});
				}
				rowdata.validated = true;
				return rowdata;
			}
		}
		if (event.field === 'startTime') {
			if (event.newValue) {
				if (DateFormat.compareDateTime(DateFormat.getDate(event.data.startTime), DateFormat.getDate(event.data.endTime)) === 1) {
					this.show(this.translateService.translate('ocduatte.starttimelatermsg'), 'warn');
					rowdata.validated = true;
					return rowdata;
				}
				if (event && event.data && (event.data.eventOutcome === 'ATT' || event.data.eventOutcome === 'ATTSH'
					|| event.data.eventOutcome === 'UB')) {
					this.gridOne.setColumnData('nbtPenalty', rowIndex, null);
					this.gridOne.setColumnData('creditedHours', rowIndex, 0);
					this.computeHours(event.data, rowIndex);
					rowdata.validated = true;
					return rowdata;
				}
			}
		}
		if (event.field === 'endTime') {
			if (event.newValue) {
				if (DateFormat.compareDateTime(DateFormat.getDate(event.data.startTime), DateFormat.getDate(event.data.endTime)) === 1) {
					this.show(this.translateService.translate('ocduatte.endtimeearlierthanmsg'), 'warn');
					rowdata.validated = true;
					return rowdata;
				}

				if (event && event.data && (event.data.eventOutcome === 'ATT' || event.data.eventOutcome === 'ATTSH'
					|| event.data.eventOutcome === 'UB')) {
					this.gridOne.setColumnData('nbtPenalty', rowIndex, null);
					this.gridOne.setColumnData('creditedHours', rowIndex, 0);
					this.computeHours(event.data, rowIndex);
					rowdata.validated = true;
					return rowdata;
				}
			}
		}
		if (event.field === 'nbtPenalty' &&
			DateFormat.compareDateTime(DateFormat.getDate(event.oldValue), DateFormat.getDate(event.newValue)) === -1) {
			this.nbtPenaltyVald = false;
			if (event.newValue) {
				let hours = 0;
				let minuts = 0;
				this.p_penalty_hours = 0;
				if (event && event.data && event.data.nbtPenalty) {
					hours = DateFormat.getDate(event.data.nbtPenalty).getHours();
					minuts = DateFormat.getDate(event.data.nbtPenalty).getMinutes() / 60;
					this.p_penalty_hours = hours + minuts;
				}
				if (event && event.data && event.data.startTime && event.data.endTime) {
					let lv_hours = 0
					if (DateFormat.compareDateTime(DateFormat.getDate(event.data.startTime), DateFormat.getDate(event.data.endTime)) === 1) {
						this.show(this.translateService.translate('ocduatte.endtimelessthanmsg'), 'warn');
						rowdata.validated = true;
						return rowdata;
					} else {
						lv_hours = DateFormat.getDate(event.data.endTime).getHours() - DateFormat.getDate(event.data.startTime).getHours();
						let agreed_travel_hour = 0;
						let lv_hoursResult = 0;
						if (event && event.data && event.data.agreedTravelHour) {
							agreed_travel_hour = event.data.agreedTravelHour;
						}
						lv_hoursResult = lv_hours + agreed_travel_hour;
						if (this.p_penalty_hours > lv_hoursResult) {
							this.nbtPenaltyVald = true;
							this.show(this.translateService.translate('ocduatte.penaltyhourstravelmsg'), 'warn');
							rowdata.validated = true;
							return rowdata;
						}
					}
				}

				if (event && event.data && event.data.nbtHours) {
					let fsdf = this.calcCredit(event.data.nbtHours, event.data.nbtTravel, this.p_penalty_hours);
					this.gridOne.setColumnData('creditedHours', rowIndex, Number(this.calcCredit(event.data.nbtHours, event.data.nbtTravel, this.p_penalty_hours)));
					let nbtCreditedHoursTemp = this.calcCredit(event.data.nbtHours, event.data.nbtTravel, this.p_penalty_hours);
					this.gridOne.setColumnData('nbtCreditedHours', rowIndex, this.hoursToDate(nbtCreditedHoursTemp));
					this.gridOne.setColumnData('nbtPenalty', rowIndex, this.hoursToDate(this.p_penalty_hours));
					rowdata.validated = true;
					return rowdata;
				}

			}
		}
		if (event.field === 'agreedTravelHour') {
			this.gridOne.setColumnData('creditedHours', rowIndex, this.calcCredit(DateFormat.getDate(event.data.nbtHours), DateFormat.getDate(event.data.nbtTravel), this.p_penalty_hours));
			this.gridOne.setColumnData('nbtCreditedHours', rowIndex, this.hoursToDate(event.data.creditedHours));
			rowdata.validated = true;
			return rowdata;
		}
		if (event.field === 'courseCode') {
			this.gridOne.setColumnData('nbtRecordCrsActyId', rowIndex, event.data.crsActyId);
			this.gridOne.setColumnData('offPrgrefId', rowIndex, event.data.offPrgrefId);
			this.gridOne.setColumnData('nbtRecordOffPrgrefId', rowIndex, event.data.offPrgrefId);
			rowdata.validated = true;
			return rowdata;
		}
		rowdata.validated = true;
		return rowdata;
	}
	changeTeam(event) {
		if (event && event.teamId) {
			this.retrieveBtnDisable = false;
			this.alterInsert = false;
			this.clearBtnDisable = false;
			this.offcourseattendData = [];
			this.offcourseskillsData = [];
			this.projectaDisable = true;
			this.offcourseattendModel = new VOffenderCourseEvents();
			this.offcourseskillsModel = new OffenderCourseSkills();
			this.sharingData.agyLocId = event.code;
			this.nbtTeamId = event.teamId;
			this.nbtTeamAreaCode = event.areaCode;
			this.nbtTeamAgyLocId = event.agyLocId;
			this.rgProjectLov = 'ocduatte/rgProjectsRecordGroup?teamId=' + event.teamId;
		}
		if (!this.nbtTeam) {
			this.clear();
			this.nbtProject = '';
			this.nbtCrsActyId = '';
			this.nbtTeamAreaCode = '';
			this.nbtTeamAgyLocId = '';
		}
	}
	changenbtProject(event) {
		if (!this.nbtProject) {
			this.clearBtnDisable = false;
			this.nbtCrsActyId = '';
			this.clear();
		} else {
			this.retrieveBtnDisable = false;
			this.alterInsert = false;
			this.clearBtnDisable = false;
			this.offcourseattendData = [];
			this.offcourseskillsData = [];
			this.projectaDisable = true;
			this.offcourseattendModel = new VOffenderCourseEvents();
			this.offcourseskillsModel = new OffenderCourseSkills();
			this.nbtCrsActyId = event.code;
		}
	}
	eventDateChange(date?) {
		this.pShowOutcome = "";
		const sysdate = DateFormat.getDate();
		if (date) {
			this.retrieveBtnDisable = false;
			this.alterInsert = false;
			this.clearBtnDisable = false;
			this.offcourseattendData = [];
			this.offcourseskillsData = [];
			this.projectaDisable = true;
			this.offcourseattendModel = new VOffenderCourseEvents();
			this.offcourseskillsModel = new OffenderCourseSkills();
			const eventDate = DateFormat.getDate(date);
			if (DateFormat.compareDate(eventDate, sysdate) > 0) {
				this.pShowOutcome = 'CANC';
			}
		} else {
			this.clear();
		}
	}
	validateRowDataTwo = (event) => {
		const rowdata = new ValidateRowReturn();
		const rowIndex = event.rowIndex;
		rowdata.validated = true;
		return rowdata;
	}

	/**
	* This function loads the data into the Master Record and its child records
	*/
	ocduattePopulateDetails() {
		const serviceObj = this.ocduatteFactory.offCourseSkillsExecuteQuery(this.offcourseattendModel);
		serviceObj.subscribe(data => {
			if (data != undefined && data.errorMessage.length > 0) {
			} else {
				this.offcourseskillsData = data;
			}
		});
	}

	ocduatteSaveOffcourseAttendVali(updatedList, date?) {
		const is = { valid: true };
		if (!this.nbtDate) {
			this.show(this.translateService.translate('common.datemustbeentereddate'), 'warn');
			return;
		}
		if (date) {
			if (date.lastValue === '0_/__/____') {
				this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
				is.valid = false;
				return is.valid;
			}
			if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
				this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
				is.valid = false;
				return is.valid;
			}
		}
		if (this.nbtPenaltyVald) {
			this.show(this.translateService.translate('ocduatte.penaltyhourstravelmsg'), 'warn');
			is.valid = false;
			return is.valid;
		}
		if (!this.nbtTeam) {
			this.show('', 'warn');
			this.show(this.translateService.translate('ocduatte.teammustmsg'), 'warn');
			is.valid = false;
			return is.valid;
		}
		if (!this.nbtTeamId) {
			this.show(this.translateService.translate('ocduatte.validteammsg'), 'warn');
			is.valid = false;
			return is.valid;
		}

		if (updatedList && updatedList.length > 0) {
			updatedList.forEach(element => {
				if (!element.eventOutcome) {
					this.show(this.translateService.translate('ocduatte.attendancemsg'), 'warn');
					is.valid = false;
					return is.valid;
				}
				if (!element.startTime) {
					this.show(this.translateService.translate('ocduatte.starttimemsg'), 'warn');
					is.valid = false;
					return is.valid;
				}
				if (!element.endTime) {
					this.show(this.translateService.translate('ocduatte.endtimemsg'), 'warn');
					is.valid = false;
					return is.valid;
				}
				if (element.startTime) {
					if (DateFormat.compareDateTime(DateFormat.getDate(element.startTime), DateFormat.getDate(element.endTime)) === 1) {
						this.show(this.translateService.translate('ocduatte.starttimelatermsg'), 'warn');
						is.valid = false;
						return is.valid;
					}
				}

				/* if (!element.supervisorStaffId) {
					this.show(this.translateService.translate('ocduatte.supervisormsg'), 'warn');
					is.valid = false;
					return is.valid;
				} */
				if (!element.courseCode) {
					this.show(this.translateService.translate('ocduatte.attenmustentermsg'), 'warn');
					is.valid = false;
					return is.valid;
				}
				if (DateFormat.compareDate(DateFormat.getDate(this.nbtDate), DateFormat.getDate()) == 1 && !this.cancelFlagOutcomesList.filter(ele => ele.outcomeCode == element.eventOutcome)[0]) {
					this.show('ocduatte.futureappointmentcanbesavewithcancel', 'warn');
					is.valid = false;
					return is.valid;
				}


			});
		}
		return is.valid;
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	ocduatteSaveoffcourseattendForm(event, date?) {
		// TODO declare commit bean and add insert list to that object.
		this.offcourseattendInsertList = event.added;
		this.offcourseattendUpdatetList = event.updated;
		this.offcourseattendDeleteList = event.removed;
		if (!this.ocduatteSaveOffcourseAttendVali(this.offcourseattendUpdatetList, date)) {
			return;
		}
		this.offcourseattendCommitModel.insertList = [];
		this.offcourseattendCommitModel.updateList = [];
		this.offcourseattendCommitModel.deleteList = [];
		if (this.offcourseattendInsertList.length > 0) {

			this.offcourseattendCommitModel.insertList = this.offcourseattendInsertList;
		}
		if (this.offcourseattendUpdatetList.length > 0) {
			this.offcourseattendUpdatetList.forEach(element => {
				if (element) {
					element.nbtCrsActyId = element.crsActyId;
					element.eventDate = DateFormat.getDate(this.nbtDate)
					if (element.eventOutcome) {
						element.eventStatus = 'COMP';
					} else {
						element.eventStatus = 'SCH';
					}
				}
			});

			this.offcourseattendCommitModel.updateList = this.offcourseattendUpdatetList;
		}
		if (this.offcourseattendDeleteList.length > 0) {
			for (let i = 0; i < this.offcourseattendDeleteList.length; i++) {
			}
			this.offcourseattendCommitModel.deleteList = this.offcourseattendDeleteList;
		}
		const offcourseattendSaveData = this.ocduatteFactory.offCourseAttendCommit(this.offcourseattendCommitModel);
		offcourseattendSaveData.subscribe(data => {
			if (data === 1) {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.ocduatteexecuteQuery();
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.ocduatteexecuteQuery();
			}
		});
	}
	//execute query
	ocduatteexecuteQuery(date?) {

		if (!this.nbtDate) {
			this.show(this.translateService.translate('common.datemustbeentereddate'), 'warn');
			return;
		}
		if (date) {
			if (date.lastValue === '0_/__/____') {
				this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
				return;
			}
			if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
				this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
				return;
			}
		}
		if (!this.nbtTeam) {
			this.show(this.translateService.translate('ocduatte.teammustmsg'), 'warn');
			return;
		}
		if (!this.nbtTeamId) {
			this.show(this.translateService.translate('ocduatte.validteammsg'), 'warn');
			return;
		}
		this.offcourseattendModel.eventDate = this.nbtDate;
		this.offcourseattendModel.teamId = this.nbtTeamId;
		this.offcourseattendModel.crsActyId = this.nbtProject;
		const serviceObj = this.ocduatteFactory.offCourseAttendExecuteQuery(this.offcourseattendModel);
		serviceObj.subscribe(data => {
			if (data.length == 0) {
				this.alterInsert = false;
				this.offcourseattendData = [];
				this.offcourseskillsData = [];
				this.show(this.translateService.translate('common.querycaused'));
			} else {
				this.alterInsert = true;
				this.clearBtnDisable = false;
				this.retrieveBtnDisable = true;
				this.projectaDisable = false;
				this.attendanceforReadOnly = false;
				this.dateReadOnly = true;
				this.teamReadOnly = true;
				this.projectReadOnly = true;
				this.tableIndex = 0;;
				data.forEach( e =>{
					if (e.supervisorStaffId) {
						e.supervisorStaffId =String(e.supervisorStaffId);
					}
				})
				this.offcourseattendData = data;
				this.offcourseattendData.forEach((element, index) => {
					if (element) {
						element.startTime = new Date(element.inTime);
						element.endTime = new Date(element.outTime);
						element.eventOutcomeDbVal = element.eventOutcome;
						this.handleHours(element, index);
					}

				});
				this.offcourseattendModel = this.offcourseattendData[0];
				this.offCourseAttendColumnDef[9].link = 'ocduatte/rgSupervisorRecordGroup?crsActyId=' + this.offcourseattendModel.crsActyId;
			//	this.gridOne.prepareAgColumnDef();
			}
		});
	}
	isFormChanged() {
		return true;
	}
	/*
	* This function converts the given date from MM/dd/yyyy to
	* yyyy/MM/dd format, If input data is not as expected
	* format then it will return input value
	*/
	ocduattedateFormat(dateValue) {
		if (dateValue != undefined && dateValue.length > 0) {
			let newdate = dateValue.split('/');
			return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
		} else {
			return dateValue;
		}
	}
	offcourseskillsExecuteQuery() {
		const offcourseskillsResult = this.ocduatteFactory.offCourseSkillsExecuteQuery(this.offcourseskillsModel);
		offcourseskillsResult.subscribe(offcourseskillsResultList => {
			if (offcourseskillsResultList.length === 0) {
				this.offcourseskillsData = [];
			} else {
				this.tableIndexTwo = 0;
				this.offcourseskillsData = offcourseskillsResultList;
				this.offcourseskillsData.forEach(element => {
					if (element) {
						element.offenderBookId = this.offenderBookId;
						element.butTutor = '...';
						var date = DateFormat.getDate();
						if (element.noOfHours) {
							const noOfHoursstr = String(element.noOfHours.toFixed(2));
							if (noOfHoursstr) {
								const dfdf = noOfHoursstr.replace('.', ':');
								element.nbtNoOfHours = DateFormat.getDate(TimeFormat.parse(dfdf, DateFormat.getDate()));
							}
						}
					}
				});
				this.offcourseskillsModel = offcourseskillsResultList[0];
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	ocduatteSaveoffcourseskillsForm(event) {
		// TODO declare commit bean and add insert list to that object.
		if (!this.tranFiAmountMand()) {
			return;
		}
		this.offcourseskillsInsertList = event.added;
		this.offcourseskillsUpdatetList = event.updated;
		this.offcourseskillsDeleteList = event.removed;
		this.offcourseskillsCommitModel.insertList = [];
		this.offcourseskillsCommitModel.updateList = [];
		this.offcourseskillsCommitModel.deleteList = [];
		if (this.offcourseskillsInsertList.length > 0) {
			this.offcourseskillsInsertList.forEach(element => {
				element.eventId = this.offcourseattendModel.eventId;
				element.staffRole = 'TUTOR';
				if (element.nbtNoOfHours) {
					let l_hours = DateFormat.getDate(element.nbtNoOfHours).getHours();
					let l_min = DateFormat.getDate(element.nbtNoOfHours).getMinutes();
					let noOfHours = String(l_hours) + '.' + String(l_min);
					element.noOfHours = Number(noOfHours);
				}

			});

			this.offcourseskillsCommitModel.insertList = this.offcourseskillsInsertList;

		}
		if (this.offcourseskillsUpdatetList.length > 0) {
			this.offcourseskillsUpdatetList.forEach(element => {
				if (element.nbtNoOfHours) {
					let l_hours = DateFormat.getDate(element.nbtNoOfHours).getHours();
					let l_min = DateFormat.getDate(element.nbtNoOfHours).getMinutes();
					let noOfHours = String(l_hours) + '.' + String(l_min);
					element.noOfHours = Number(noOfHours);
				}
			});
			this.offcourseskillsCommitModel.updateList = this.offcourseskillsUpdatetList;
		}
		if (this.offcourseskillsDeleteList.length > 0) {
			this.offcourseskillsCommitModel.deleteList = this.offcourseskillsDeleteList;
		}
		const offcourseskillsSaveData = this.ocduatteFactory.offCourseSkillsCommit(this.offcourseskillsCommitModel);
		offcourseskillsSaveData.subscribe(data => {
			if (String(data[0].errorMessage).indexOf('OFFENDER_COURSE_SKILLS_PK') > 0) {
				this.show(this.translateService.translate('ocduatte.rowaexits'), 'warn');
				this.offcourseskillsExecuteQuery();
				return;
			}
			if (data && data[0] && data[0].returnValue && data[0].returnValue === 1) {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.offcourseskillsExecuteQuery();
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.offcourseskillsExecuteQuery();
			}
		});
	}

	dateBlur() {
		if (!this.nbtDate) {
			this.nbtDate = this.nbtDate === null ? undefined : null;
		}
	}
	teamBlur() {
		if (!this.nbtTeam) {
			this.nbtTeam = this.nbtTeam === '' ? undefined : '';
		}
	}
	projectBlur() {
		if (!this.nbtProject) {
			this.nbtProject = this.nbtProject === '' ? undefined : '';
		}
	}
	onGridInsert = () => {
		if (!this.tranFiAmountMand()) {
			return;
		}
		return { butTutor: '...' };
	}
	onGridClear = () => {

		this.ocduatteexecuteQuery(this.nbtDate);
		return true;
	}
	tranFiAmountMand = () => {
		const is = { valid: true };
		if (this.offcourseskillsData && this.offcourseskillsData.length > 0) {
			this.offcourseskillsData.forEach(element => {
				if (!element.skillCode) {
					this.show(this.translateService.translate('ocduatte.skillmustmsg'), 'warn');
					is.valid = false;
					return is.valid;
				}
				if (!element.nbtNoOfHours) {
					this.show(this.translateService.translate('ocduatte.hoursmustmsg'), 'warn');
					is.valid = false;
					return is.valid;
				}
				if (!element.staffDesc) {
					this.show(this.translateService.translate('ocduatte.tutormustmsg'), 'warn');
					is.valid = false;
					return is.valid;
				}
			});
		}
		return is.valid;
	}

	onGridDelete = () => {
		return true;
	}

	ocduatteClear() {
		this.retrieveBtnDisable = false;
		this.projectaDisable = true;
		this.alterInsert = false;
		this.clearBtnDisable = true;
		this.offcourseattendData = [];
		this.offcourseskillsData = [];
		this.offcourseattendModel = new VOffenderCourseEvents();
		this.offcourseskillsModel = new OffenderCourseSkills();
		this.nbtDate = null;
		this.nbtTeam = '';
		this.nbtProject = '';
		this.dateReadOnly = false;
		this.teamReadOnly = false;
		this.projectReadOnly = false;
		this.attendanceforReadOnly = true;
	}

	clear() {
		this.retrieveBtnDisable = false;
		this.projectaDisable = true;
		this.attendanceforReadOnly = true;
		this.alterInsert = false;
		this.clearBtnDisable = true;
		this.offcourseattendData = [];
		this.offcourseskillsData = [];
		this.offcourseattendModel = new VOffenderCourseEvents();
		this.offcourseskillsModel = new OffenderCourseSkills();
	}

	getCancelFlagOutcomes() {
		let searchObj = new EventMeasures();
		searchObj.eventType = 'UW';
		this.ocduatteFactory.cancelFlagOutcomeList(searchObj).subscribe(outcomeList => {
			this.cancelFlagOutcomesList = outcomeList ? outcomeList : [];
		})
	}
	
}
