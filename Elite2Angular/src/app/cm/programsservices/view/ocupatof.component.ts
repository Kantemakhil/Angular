
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OffenderCourseAttendancesCommitBean } from '../beans/OffenderCourseAttendancesCommitBean';
import { OffenderCourseAttendance } from '../beans/OffenderCourseAttendance';
import { OcupatofService } from '../service/ocupatof.service';
import { OcmpssetService } from '@inst/institutional-activities/maintenance/service/ocmpsset.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';

import { ProgramPaySettingsBean } from '@inst/institutional-activities/maintenance/beans/ProgramPaySettingsBean';
import { EventMeasures } from '@iwp/beans/EventMeasures';
import { EventMeasureOutcomes } from '@iwp/beans/EventMeasureOutcomes';
@Component({
	selector: 'app-ocupatof',
	templateUrl: './ocupatof.component.html',
})

export class OcupatofComponent implements OnInit {
	@ViewChild('offcrsattGrid', { static: true }) offcrsattGrid: any;
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;

	// Variable declaration
	nbtService: string;
	nbtProgrammeDesc: string;
	nbtListseq: number;
	nbtViewDescLink: string;

	msgs: any[] = [];
	message: any;
	type: any;
	offcrsattColumnDefs: any[];
	offcrsattData: OffenderCourseAttendance[] = [];
	offcrsattModel: OffenderCourseAttendance = new OffenderCourseAttendance();
	intsrInsertList: OffenderCourseAttendance[] = [];
	intsrUpdateList: OffenderCourseAttendance[] = [];

	commitModel: OffenderCourseAttendancesCommitBean = new OffenderCourseAttendancesCommitBean();
	titles = { description: this.translateService.translate('common.description'), code: this.translateService.translate('common.code') };
	code: string;
	description: string;
	nbtViewDesc: string;
	nbtPhase: string;
	commenttext: string;
	clearDisable: boolean;
	retriveDisable: boolean;
	caseLoadType: string;
	commentBoxReadOnly: boolean;
	selectedIndex: number;

	teamtitles = { description: this.translateService.translate('common.description'), code: this.translateService.translate('ocupatof.outcome') };
	prgSrvSetModel: ProgramPaySettingsBean = new ProgramPaySettingsBean();
	cancelFlagOutcomesList : EventMeasureOutcomes [] =[];

	constructor(private ocupatofFactory: OcupatofService, public translateService: TranslateService, public sessionManager: UserSessionManager,
		private ocmpssetService: OcmpssetService) {
		this.offcrsattColumnDefs = [];
	}
	ngOnInit() {
		this.getCancelFlagOutcomes();
		this.progServicesExecuteQuery();
		this.retriveDisable = false;
		this.clearDisable = true;
		this.nbtViewDescLink = 'ocupatof/rgAttendancyViewRecordGroup';
		this.offcrsattColumnDefs = [
			{ fieldName: this.translateService.translate('ocupatof.module'), field: 'module', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('ocupatof.session'), field: 'sessionNo', editable: false, width: 150, datatype: 'number' },
			{ fieldName: this.translateService.translate('ocupatof.catchup'), field: 'cFlag', editable: false, width: 150, datatype: 'checkbox' },
			{ fieldName: this.translateService.translate('ocupatof.eventdate'), field: 'eventDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('ocupatof.cnfattendence'), field: 'eventOutcome', required: true, editable: true, width: 150,
			 datatype: 'lov', link: 'ocupatof/rgAttendancesRecordGroup', titles: this.teamtitles,source:'OCMEVENT',cellEditable: this.canCellEdit },
			{ fieldName: this.translateService.translate('ocupatof.offstarttime'), field: 'inTime', editable: true, width: 150, datatype: 'time',cellEditable: this.canCellEdit },
			{ fieldName: this.translateService.translate('ocupatof.offendtime'), field: 'outTime', editable: true, width: 150, datatype: 'time',cellEditable: this.canCellEdit },
			{
				fieldName: 'Hours', field: 'nbtHours', editable: false, width: 150, datatype: 'time'
			},
			{ fieldName: this.translateService.translate('ocupatof.levelofengment'), field: 'engagementCode', editable: true, width: 150, datatype: 'lov', domain:'PS_ENGAGE',cellEditable: this.canCellEdit
			// link: 'ocupatof/rgEngagementRecordGroup' 
		},
			{ fieldName: this.translateService.translate('ocupatof.levelofunderstanding'), field: 'understandingCode', editable: true, width: 150, datatype: 'lov', domain:'PS_UNDER',cellEditable: this.canCellEdit
			// link: 'ocupatof/rgUnderstandingRecordGroup'
		},
			{ fieldName: '', field: 'commentText', editable: false, width: 150, hide: true },
			{
				fieldName: 'Pay Flag', field: 'payFlag', editable: false, width: 150, datatype: 'checkbox', hide: true
			},
			{
				fieldName: 'Batch #', field: 'payBatchId', editable: false, width: 150, hide: true
			},
		];
 		this.nbtProgrammeDesc = this.dialog.data.occuranceCode;
		this.nbtPhase = this.dialog.data.phaseDesc;
		this.nbtListseq = this.dialog.data.startSessionNo;
		this.nbtService = this.dialog.data.activityDescription;
		this.nbtViewDesc = 'PAST_PRESENT';
		this.commentBoxReadOnly = true;
		this.clearDisable = true;
		this.executeQuery();
	}

	canCellEdit = (data: any, index: number, field: string): boolean => {
		if(data.payBatchId) {
			this.type = 'warn';
				this.message = this.translateService.translate('ocupatof.attendancerecordhasalreadypaid');
				this.show(this.message, this.type);
			return false;
          }
		  return true;
		}
	executeQuery() {
		const queryParams = {
/* 			offPrgrefId: this.dialog.data.offPrgrefId,
			service: this.dialog.data.service,
			programme: this.dialog.data.programme,
			txnEntrySeq: this.dialog.data.listSeq,
			moduleFlag: this.dialog.data.moduleFlag,*/
			viewCode: this.nbtViewDesc, 
			offPrgrefId:this.dialog.data.offPrgrefId,
			moduleFlag: this.dialog.data.moduleFlag === 'Y' ? true : false
		};
		const savObj = this.ocupatofFactory.offCrsAttExecuteQuery(queryParams);
		savObj.subscribe(data => {
			if (data.length === 0) {
				this.offcrsattData = [];
				this.commentBoxReadOnly = true;
				this.retriveDisable = false;
				this.type = 'warn';
				this.message = this.translateService.translate('common.querycaused');
				this.show(this.message, this.type);
			} else {
				data.forEach(element => {
					if (element.catchUpFlag === 'Y') {
						element.cFlag = true;
					} else {
						element.cFlag = false;
					}
					if(element.inTime && element.outTime) {
						element.nbtHours  = this.caluculateTime(element.inTime , element.outTime);
					  }
					  element.payFlag = element.payBatchId > 0 ? true : false;
				});
				this.offcrsattData = data;
				this.commentBoxReadOnly = false;
				this.selectedIndex = 0;
				this.retriveDisable = true;
			}
		});
	}

	get saveDisable() {
		if (this.offcrsattGrid.updatedMap.size > 0) {
			return false;
		} else {
			return true;
		}
	}


	searchLaunchButtonClick() {
		if (!this.description) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocupatof.viwmustbeentrd');
			this.show(this.message, this.type);
			this.clearDisable = true;
		} else {
			this.executeQuery();
			this.clearDisable = false;
		}
	}

	onCommentTextInsert(event) {
		const index = this.offcrsattData.indexOf(this.offcrsattModel);
		this.offcrsattGrid.setColumnData('commentText', index, event);
	}

	clear() {
		this.code = '';
		this.nbtViewDesc = '';
		this.offcrsattData = [];
		this.commenttext = '';
		this.clearDisable = true;
		this.description = '';
		this.retriveDisable = false;
	}


	optionChange(event) {
		this.description = event.description;
		this.code = event.code;
		this.nbtViewDesc = event;
		this.nbtViewDesc = this.code;
		this.caseLoadType = this.sessionManager.currentCaseLoadType;
		this.clearDisable = false;
	}

	onLocationBlur() {
		if (!this.nbtViewDesc) {
			this.nbtViewDesc = this.nbtViewDesc === '' ? undefined : '';
			this.clearDisable = true;
			this.description = "";
		} else {
			this.clearDisable = false;

		}
	}

	onRowClickoffcrsatt(event) {
		this.commenttext = event.commentText;
		this.offcrsattModel = event;
	}

	onButCancelclick() {
		this.dialog.close(null);
	}


	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}


	onButSaveclick() {
		this.genoffbkgData();
		this.intsrUpdateList = this.intsrUpdateList;
		if (!this.validationFunction(this.intsrUpdateList)) {
			return;
		}

		this.commitModel.insertList = [];
		this.commitModel.updateList = [];

		if (this.intsrUpdateList.length > 0) {
			for (let i = 0; i < this.intsrUpdateList.length; i++) {
				if(this.intsrUpdateList[i].viewCode == 'FUTURE'){
					this.intsrUpdateList[i].eventStatus = 'CANC';
				}
			}
			this.commitModel.updateList = this.intsrUpdateList;
		}

		const savObj = this.ocupatofFactory.offCrsAttCommit(this.commitModel);
		savObj.subscribe(data => {
			if (data.length === 0) {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show(this.message, this.type);
				this.executeQuery();
			} else {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show(this.message, this.type);
				this.executeQuery();
			}
		});

	}


	genoffbkgData() {
		this.intsrUpdateList = [];
		this.offcrsattGrid.updatedMap.forEach(
			(v: any, k: number) => {
				v.viewCode = this.nbtViewDesc;
				this.intsrUpdateList.push(v);
			}
		);
	}

	validationFunction(offcrsattData: any) {
		const is = { valid: true }
		for (let i = 0; i < offcrsattData.length; i++) {
			if (!offcrsattData[i].inTime) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocupatof.sttimemustentered');
				this.show(this.message, this.type);
				is.valid = false;
				return is.valid;
			}
			if ((offcrsattData[i].eventOutcome === 'ATT' || offcrsattData[i].eventOutcome === 'AB' || offcrsattData[i].eventOutcome === 'UB') && this.caseLoadType === 'COMM') {
				if (!offcrsattData[i].engagementCode) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocupatof.levelofenggmustent');
					this.show(this.message, this.type);
					is.valid = false;
					return is.valid;
				}
				if (!offcrsattData[i].understandingCode) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocupatof.levelofucodemustbe');
					this.show(this.message, this.type);
					is.valid = false;
					return is.valid;
				}
			}
			 if (offcrsattData[i].viewCode === 'FUTURE') {
				if (!this.cancelFlagOutcomesList.filter(ele => ele.outcomeCode == offcrsattData[i].eventOutcome)[0]) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocupatof.mustselectcanc');
					this.show(this.message, this.type);
					is.valid = false;
					return is.valid;
				}
			}
			if (offcrsattData[i].viewCode === 'PAST_PRESENT') {
				if (offcrsattData[i].eventOutcome === undefined || offcrsattData[i].eventOutcome === null || offcrsattData[i].eventOutcome === "") {
					this.type = 'warn';
					this.message = this.translateService.translate('ocupatof.conformattendence');
					this.show(this.message, this.type);
					is.valid = false;
					return is.valid;
				}
			}

			if (offcrsattData[i].viewCode === 'FUTURE') {
				if (offcrsattData[i].eventOutcome !== 'CANC' && this.commenttext) {
					this.type = 'warn';
					this.message = this.translateService.translate('');
					this.show(this.message, this.type);
					is.valid = false;
					return is.valid;
				}
			}
			if (offcrsattData[i].viewCode === 'PAST_PRESENT') {
				if (offcrsattData[i].eventOutcome === undefined || offcrsattData[i].eventOutcome === null || offcrsattData[i].eventOutcome === "" && this.commenttext) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocupatof.nocmtallowd');
					this.show(this.message, this.type);
					is.valid = false;
					return is.valid;
				}
			}


		}
		return is.valid;
	}
	validateRowDataAttendence = (event) => {
		const index = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		if ((event.field === 'inTime' || event.field === 'outTime')) {
			if (event.data.inTime && event.data.outTime) {
				const durationVal = this.caluculateTime(event.data.inTime, event.data.outTime);
				this.offcrsattGrid.setColumnData('nbtHours', index, durationVal);
			} else {
				this.offcrsattGrid.setColumnData('nbtHours', index, undefined);
			}
		}
		if ((event.data.eventOutcome === 'ATT' || event.data.eventOutcome === 'AB' ||
		  event.data.eventOutcome === 'UB') && this.sessionManager.currentCaseLoadType == 'COMM') {
			  this.offcrsattGrid.requiredOn('engagementCode');
			  this.offcrsattGrid.requiredOn('inTime');
			  this.offcrsattGrid.requiredOn('understandingCode');
		  } else {
			this.offcrsattGrid.requiredOff('engagementCode');
			this.offcrsattGrid.requiredOff('inTime');
			this.offcrsattGrid.requiredOff('understandingCode');
		  }
		rowdata.validated = true;
		  return rowdata;
	}
	progServicesExecuteQuery() {
		const searchResult = this.ocmpssetService.progServSettingExecuteQuery();
		searchResult.subscribe(data => {
			if (data.length === 0) {
				this.prgSrvSetModel = new ProgramPaySettingsBean();
			} else {
				this.prgSrvSetModel = data[0];
				if ( this.prgSrvSetModel.payFlag === 'Y') {
				  this.offcrsattColumnDefs[this.offcrsattColumnDefs.length - 1].hide = 'false';
				  this.offcrsattColumnDefs[this.offcrsattColumnDefs.length - 2].hide = 'false';
				  this.offcrsattGrid.prepareAgColumnDef();
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


	getCancelFlagOutcomes() {
		let searchObj = new EventMeasures();
		searchObj.eventType = 'ACP';
		searchObj.eventSubType = 'PROG_SESS';
		this.ocupatofFactory.cancelFlagOutcomeList(searchObj).subscribe(outcomeList => {
			this.cancelFlagOutcomesList = outcomeList ? outcomeList : [];
		})
	}
	
}