import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderCaseNotes } from '@instCaseManagementbeans/OffenderCaseNotes';
import { VOffenderAllSchedules } from '@instschedulebeans/VOffenderAllSchedules';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderCaseNotesCommitBean } from '@inst/casemanagement/beans/OffenderCaseNotesCommitBean';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { VOffenderAllSchedulesCommitBean } from '@inst/schedules/beans/VOffenderAllSchedulesCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';
import { Router } from '@angular/router';
import { OcdclogsService } from '../service/ocdclogs.service';
import { OcdenforService } from '../service/ocdenfor.service';
import { CourtEvents } from '@inst/legal/beans/CourtEvents';



@Component({
	selector: 'app-ocdcsch',
	templateUrl: './ocdcsch.component.html'
})

export class OcdcschComponent implements OnInit {
	querycausedValid: boolean;
	@ViewChild('grid', { static: true }) grid: any;
	@ViewChild('gridOne', { static: true }) gridOne: any;
	outcomeLink: string;
	eveOutEditable: boolean;
	onDelete: boolean;
	onDelete1: boolean;
	routerChild: any[] = [];
	routerpath: string[] = [];
	ctrlPsDis: boolean;
	buttondisabled: boolean;
	offSchbuttondisabled: boolean;
	offSchbuttonCleardisabled: boolean;
	buttondisabledClear: boolean;
	enableInsert: boolean;
	offNotesFTDisable: boolean;
	enforcementDisabled: boolean;
	butDrrDis: boolean;
	butsaDis: boolean;
	//unpaidworkDis: boolean;
	//programmersDis: boolean;
	caseNoteTextReadOnly = true;
	commentTextReadOnly = true;
	exitLaunchBtn = false;
	tip: string;
	code: string;
	threeip: string;
	offBooKID: number;
	ctrlpsFromDate: Date;
	ctrlpsToDate: Date;
	ctrlpsStartTime: Date;
	ctrlpsEndTime: Date;
	ctrlpsOutCome: string;
	stafflrModel: StaffMembers = new StaffMembers();
	schEventDate: Date;
	schStartTime: Date;
	schagyLocDesc: String;
	offnotetodate: Date;
	currentDate: Date;
	type: any;
	message: any;
	msglist: any[];
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	VHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
	offnotesData: OffenderCaseNotes[] = [];
	offnotesDataTemp: OffenderCaseNotes[] = [];
	offnotesModel: OffenderCaseNotes = new OffenderCaseNotes();
	offnotesIndex: number;
	offSchIndex: number;
	offnotesInsertList: OffenderCaseNotes[] = [];
	offnotesUpdatetList: OffenderCaseNotes[] = [];
	offnotesDeleteList: OffenderCaseNotes[] = [];
	offnotesCommitModel: OffenderCaseNotesCommitBean = new OffenderCaseNotesCommitBean();
	offschData: VOffenderAllSchedules[] = [];
	offschDataTemp: VOffenderAllSchedules = new VOffenderAllSchedules;
	offschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
	offschInsertList: VOffenderAllSchedules[] = [];
	offschUpdatetList: VOffenderAllSchedules[] = [];
	offschDeleteList: VOffenderAllSchedules[] = [];
	offschCommitModel: VOffenderAllSchedulesCommitBean = new VOffenderAllSchedulesCommitBean();
	editable: boolean = true;
	offNotesColumnDef: any[];
	offSchColumnDef: any[];
	caseloadType: string;
	staffnameLink: string;
	offnotefromdate: Date;
	offnotesModelTimeCreation: Date;
	eventOutcomelink: string;
	checkBoxDisable: boolean;
	exitFlag: boolean;
	noteSourceCode: string;
	namesReadOnly: boolean;
	namesReadOnlyOne: boolean;
	currentUserStaffId: number;
	nonAssoCount: number;
	crtevtsConflictsModel: CourtEvents = new CourtEvents();
	screenId ='OCDCSCH';
	constructor(private ocdclogsFactory: OcdclogsService, public translateService: TranslateService, private ocdenforFactory: OcdenforService,
		public sessionManager: UserSessionManager, public dialogService: DialogService, private router: Router) {
		this.caseloadType = this.sessionManager.currentCaseLoadType;
		this.offNotesColumnDef = [];
		this.offSchColumnDef = [];

	}
	ngOnInit() {
		this.outcomeLink = 'ocdclogs/rglovOutComeRecordGroup'
		this.ocdclogsFactory.exitFlag = false;
		this.offNotesColumnDef = [
			{
				fieldName: this.translateService.translate('ocdclogs.date'), field: 'contactDate', editable: true, datatype: 'date',
			},

			{
				fieldName: this.translateService.translate('ocdclogs.time'), field: 'contactTime', editable: true, datatype: 'time'
			},

			{
				fieldName: this.translateService.translate('ocdclogs.source'), field: 'noteSourceCode', editable: false, datatype: 'lov',
				link: 'ocdclogs/rgnoteSourceRecordGroup',

			},

			{
				fieldName: this.translateService.translate('ocdclogs.casenotetype'), field: 'caseNoteType', editable: true, datatype: 'lov',
				link: 'ocdclogs/rgCasenoteTypeRecordGroup?caseloadType=' + this.caseloadType, cellEditable: this.canAlertEdit, source: 'OCMWORKS'
			},
			{
				fieldName: this.translateService.translate('ocdclogs.contactsubtype'), field: 'caseNoteSubType', editable: true, datatype: 'lov',
				link: 'ocdclogs/rgCasenoteSubtypeRecordGroup?caseNoteType=', parentField: 'caseNoteType', cellEditable: this.canAlertEdit, source: 'OCMWORKS'
			},
			{
				fieldName: this.translateService.translate('ocdclogs.casenotes'), field: 'caseNoteText', editable: false, datatype: 'text',
			},
			{
				fieldName: '', field: 'butIwp', datatype: 'launchbutton', editable: true,
				width: 50, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.butIwpLaunch,
			},
			{
				fieldName: '', field: 'goButton', datatype: 'launchbutton', editable: true,
				width: 50, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.butGoLaunch,
			},
			{
				fieldName: '', field: 'rButton', datatype: 'launchbutton', editable: true,
				width: 50, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.butReferLaunch,
			},
			{
				fieldName: '', field: 'aButton', datatype: 'launchbutton', editable: true,
				width: 50, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.butAmendmentLaunch,
			},
			{
				fieldName: this.translateService.translate('ocdclogs.amendment'), field: 'amendmentFlag', editable: false, datatype: 'checkbox',
			},
			{ fieldName: '', field: 'test', hide: true },
			{ fieldName: '', field: 'caseNoteTextTemp', hide: true },

		];

		this.offSchColumnDef = [
			{
				fieldName: this.translateService.translate('ocdclogs.scheduletype'), field: 'eventType', editable: true, width: 150, datatype: 'lov',
				link: 'ocdclogs/rgScheduleTypeRecordGroup', cellEditable: this.canAlertEditSch, source: 'OCMEVENT', required: true
			},
			{
				fieldName: this.translateService.translate('ocdclogs.schedulesubtypemandatory'), field: 'eventSubType', editable: true, width: 150, datatype: 'lov',
				link: 'ocdclogs/rgScheduleSubTypeRecordGroup?eventType=', parentField: 'eventType', cellEditable: this.canAlertEditSch, required: true
			},


			{
				fieldName: this.translateService.translate('ocdclogs.eventdate'), field: 'eventDate', editable: true, width: 150, datatype: 'date',
				cellEditable: this.canEditableTabWithEventType, required: true

			},
			{
				fieldName: this.translateService.translate('ocdcsch.from'), field: 'startTime', editable: true, width: 150, datatype: 'time',
				cellEditable: this.canEditableTabWithEventType, required: true
			},
			{
				fieldName: this.translateService.translate('ocdclogs.to'), field: 'endTime', editable: true, width: 150, datatype: 'time',
				cellEditable: this.canEditableTabWithEventType
			},
			{
				fieldName: this.translateService.translate('ocdclogs.location'), field: 'toAgyLocId', editable: true, width: 150,
				link: 'ocdclogs/rgLocationRecordGroup', datatype: 'lov', cellEditable: this.canEditableTabWithEventType, source: 'OUMAGLOC', required: true
			},
			{
				fieldName: this.translateService.translate('ocdclogs.staffname'), field: 'inChargeStaffName', editable: false, width: 150,

			},
			{
				fieldName: '', field: 'button', datatype: 'launchbutton', editable: true,
				width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.staffNameLaunch,


			},

			{
				fieldName: this.translateService.translate('ocdclogs.outcomeNew'), field: 'eventOutcome', editable: true, width: 150, datatype: 'lov',
				link: 'ocdclogs/rgEventOutcomeRecordGroup?threeip=', parentField: 'threeip', source: 'OCMEVENT'
			},
			{
				fieldName: '', field: 'reminderName', datatype: 'launchbutton', editable: true,
				width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.remindersLaunch,


			},
			{
				fieldName: this.translateService.translate('common.iwpdocument')
				, field: 'butIwp', datatype: 'hyperlink',link: '/EOFFENDER',
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
			},
			{
				fieldName: '', field: 'emailFlag', width: 150, datatype: 'checkbox', hide: true

			},

			{
				fieldName: '', field: 'emailScheduleHoursBefore', datatype: 'number', hide: true
			},

			{
				fieldName: '', field: 'smsFlag', datatype: 'checkbox', hide: true

			},

			{
				fieldName: '', field: 'smsScheduleHoursBefore', hide: true

			},



			{ fieldName: '', field: 'nbtUpdOutcomeFlag', hide: true },
			{ fieldName: '', field: 'commentText', hide: true, datatype: 'text' },
			{ fieldName: '', field: 'warningPrompt', hide: true, datatype: 'text' },
			{ fieldName: '', field: 'cancelFlag', hide: true },
			{ fieldName: '', field: 'offenderBookId', hide: true },
			{ fieldName: '', field: 'emailFlagTemp', hide: true },
			{ fieldName: '', field: 'smsFlagTemp', hide: true },
			{ fieldName: '', field: 'emailAddressCount', hide: true },
			{ fieldName: '', field: 'emailFlagTempOne', hide: true },
			{ fieldName: '', field: 'smsFlagTempOne', hide: true },
			{ fieldName: '', field: 'phoneNumberCount', hide: true },
			{ fieldName: '', field: 'nonAssociationFlag', hide: true },
			{ fieldName: '', field: 'outcomeCancelFlag', hide: true }
		];
		this.onInItDisableFuncationality();

		const serviceObj = this.ocdclogsFactory.lvLoginUserStaffId();
		serviceObj.subscribe(data => {
			if (data) {
				this.currentUserStaffId = data;
			}
		});

		const routerComponets = this.router.config;
		this.routerpath = routerComponets.map(ele => ele.path);
		routerComponets.filter(ele => {
			if (ele.children && Array.isArray(ele.children)) {
				return true;
			} else {
				return false;
			}
		}).forEach(ele => ele.children.forEach(data => this.routerChild.push(data.path)));
		this.routerpath.push(...this.routerChild);
	}

	secheduleDelete = () => {
		if (this.offschModel.eventOutcome) {
			this.type = 'warn';
			this.message = this.translateService.translate('common.youcannotdeletethisrecord');
			this.show();
			return false;
		}
		return true;
	}

	cellEditableForScheduleHrsBefore = (data: any, index: number, field: string): boolean => {

		if (field === 'emailScheduleHoursBefore' && (data.emailSentFlag || !data.emailFlag)) {
			return false;
		} else if (field === 'smsScheduleHoursBefore' && (data.smsSentFlag || !data.smsFlag)) {
			return false;
		} else if (field === 'emailFlag') {
			if (data.emailFlagTemp && !data.emailSentFlag) {
				return true;
			} else if (!data.emailFlagTemp) {
				return false;
			} else {
				return false;
			}
		} else if (field === 'smsFlag') {
			if (data.smsFlagTemp && !data.smsSentFlag) {
				return true;
			} else if (!data.smsFlagTemp) {
				return false;
			} else {
				return false;
			}
		}

		return true;
	}

	cellEditableForeventOutcome = (data: any, index: number, field: string): boolean => {
		if (data.nbtFirstName) {
			if ((data.eventType === 'DRR' || data.eventType === 'UW' || data.eventType === 'ACP'
				|| data.eventType === 'SA')) {
				if (data.eventOutcome) {
					if (data.nbtUpdOutcomeFlag === 'Y') {
						return false;
					} else {
						return true;
					}
				}

				if (data.nbtUpdOutcomeFlag === 'N') {
					return false;
				} else {
					return true;
				}
			}
			if ((data.eventType === 'DRR' || data.eventType === 'UW' || data.eventType === 'ACP'
				|| data.eventType === 'SA')) {
				if (data.eventOutcome) {
					if (data.nbtUpdOutcomeFlag === 'Y') {
						return false;
					} else {
						return true;
					}
				}
			}
			return true;
		}

		return false;
	}

	isInsertableOnChange() {
		if (this.ctrlpsFromDate || this.ctrlpsStartTime || this.ctrlpsToDate
			|| this.ctrlpsEndTime || this.ctrlpsOutCome) {
			this.offSchbuttonCleardisabled = false;
		} else {
			this.offSchbuttonCleardisabled = true;
		}
	}

	canEditableTabWithEventType = (data: any, index: number, field: string): boolean => {
		if (data.eventOutcome) {
			if ((field != 'button' && (data.eventType === "CRT" || data.eventType === "INTAKE" || data.eventType === "CCASE" || data.eventType === "PACT"))) {
				return true;
			} else {
				return false;
			}

		} else {
			if ((field != 'button' && (data.eventType === "CRT" || data.eventType === "INTAKE" || data.eventType === "CCASE" || data.eventType === "PACT"
				|| data.eventType === "ACP" || data.eventType === "UW" || data.eventType === "DRR" || data.eventType === "SA"))) {
				return false;
			} else {
				return true;
			}

		}
		return true;
	}

	/*Before offender change disable funcationality  */
	onInItDisableFuncationality() {
		this.offschModel.commentText = undefined;
		this.checkBoxDisable = true;
		this.enableInsert = false;
		this.enforcementDisabled = true;
		this.butDrrDis = true;
		this.butsaDis = true;
		this.caseNoteTextReadOnly = true;
		this.offNotesFTDisable = true;
		this.buttondisabled = true;
		this.offSchbuttondisabled = true;
		this.offSchbuttonCleardisabled = true;
		this.buttondisabledClear = true;
		this.ctrlPsDis = true;
		this.offschData = [];
		this.namesReadOnly = false;
		this.namesReadOnlyOne = false;
	}


	validateOpenOrNotScreen = (event) => {
		if (event.eventOutcome) {
			if ((event.eventType === "CRT" || event.eventType === "INTAKE" || event.eventType === "CCASE" || event.eventType === "PACT")) {
				return true;
			} else {
				return false;
			}

		} else {
			if ((event.eventType === "CRT" || event.eventType === "INTAKE" || event.eventType === "CCASE" || event.eventType === "PACT"
				|| event.eventType === "ACP" || event.eventType === "UW" || event.eventType === "DRR" || event.eventType === "SA")) {
				return false;
			} else {
				return true;
			}

		}
		return true;
	}

	staffNameLaunch = (data) => {
		data.agyLocId = data.toAgyLocId;
		data.staffId = data.inChargeStaffId;
		if (!this.validateOpenOrNotScreen(data)) {
			return;
		} else {
			this.dialogService.openLinkDialog('/OCUAOFFI', data, 80).subscribe(res => {
				if (res && Object.keys(res).length > 0) {
					const staffName = res.lastName + ', ' + res.firstName;
					this.gridOne.setColumnData('inChargeStaffName', this.offschData.indexOf(data), staffName);
				} else {
					this.gridOne.setColumnData('inChargeStaffName', this.offschData.indexOf(data), undefined);
				}
			});
		}
	}


	butIwpLaunch = (event) => {
		if (!event.caseNoteId) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.pleasesavethechanges');
			this.show();
			return;
		}
		this.dialogService.openLinkDialog('/OIUIWPVE', this.offnotesModel, 80).subscribe(res => {
		});
	}

	butGoLaunch = (event) => {
		if (event) {
			if (!event.caseNoteId) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.pleasesavethecasenote');
				this.show();
				return;
			}
			this.offnotesModel = event;
			let moduleName;
			const serviceObj = this.ocdclogsFactory.getModuleName(this.offnotesModel);
			serviceObj.subscribe(data => {
				if (data) {
					moduleName = data;
					if (moduleName !== 'nodata') {
						const childScreen = this.routerChild.includes(moduleName) ? true : false;
						const parentScreen = this.routerpath.includes(moduleName) ? true : false;
						const suffix = this.routerChild.includes(moduleName) ? 'DIALOG' : '';
						if (!childScreen && !parentScreen) {
							this.type = 'warn';
							this.message = this.translateService.translate('ocdclogs.cannotreadform');
							this.message = String(this.message).replace('@MODNAME@', moduleName);
							this.show();
							return;
						} else if (suffix !== 'DIALOG') {
							this.dialogService.openLinkDialog(moduleName, event, 80).subscribe(result => {
							});
						} else {
							this.router.navigate(['/' + moduleName]);
						}
					} else {
						this.type = 'warn';
						this.message = this.translateService.translate('ocdclogs.noscreenassociated');
						this.show();
						return false;
					}
				}
			});

		} else {
			return true;
		}
	}
	butReferLaunch = (event) => {
		if (!event.caseNoteId) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.pleasesavethecasenote');
			this.show();
			return;
		}
		this.dialogService.openLinkDialog('/OCUNOTCM', this.offnotesModel, 80).subscribe(res => {
			if (res) {
			}
		});
	}

	butDrr = () => {
		let offBookId = this.VHeaderBlockModel.offenderBookId;
		if (offBookId) {
			this.dialogService.openLinkDialog('/OCDDTPRO', this.offnotesModel, 80).subscribe(res => {
				if (res) {
				}
			});
		} else {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.pleasesavethedrug');
			this.show();
			return;
		}
	}

	butSa = () => {
		let offBookId = this.VHeaderBlockModel.offenderBookId;
		if (offBookId) {
			this.dialogService.openLinkDialog('/OCDSACTI', this.offnotesModel, 80).subscribe(res => {
				if (res) {
				}
			});
		} else {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.pleasespecified');
			this.show();
			return;
		}
	}

	butAmendmentLaunch = (event) => {
		if (!event.caseNoteId) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.pleasesavethecasenotebeforeenteringanaddendum');
			this.show();
			return;
		}

		let cnoteAmend = 'Y';
		let loginStaffId = 0;

		const loginUserStaffId = this.ocdclogsFactory.lvLoginUserStaffId();
		loginUserStaffId.subscribe(data => {
			if (data) {
				loginStaffId = data;
			}
			if (event.staffId === loginStaffId && cnoteAmend === 'Y') {
				this.dialogService.openLinkDialog('/ocucname', this.offnotesModel, 80).subscribe(res => {

					this.grid.setColumnData('caseNoteText', this.offnotesData.indexOf(data), res);
					this.grid.setColumnData('caseNoteTextTemp', this.offnotesData.indexOf(data), res);
					this.grid.setColumnData('amendmentFlag', this.offnotesData.indexOf(data), true);
					this.offnotesExecuteQuery();
				});
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.youdonothavepermissionstoamendthiscasenote');
				this.show();
				return;
			}
		});

	}

	isInsertable(event) {
		const index = this.offnotesData.indexOf(this.offnotesModel);
		this.offnotesModel.caseNoteTextTemp = event;
		this.grid.setColumnData('test', index, event);
		//this.grid.setColumnData('caseNoteText', index, event);
	}

	onCommentTextInsert(event) {
		const index = this.offschData.indexOf(this.offschModel);
		this.gridOne.setColumnData('commentText', index, event);
		if (event) {
			this.gridOne.setColumnData('warningPrompt', index, event);
		}
	}

	canAlertEdit = (data: any, index: number, field: string): boolean => {
		if (data.createDatetime) {
			return false;
		}
		return true;
	}


	canMailEditSch = (data: any, index: number, field: string): boolean => {
		if (field === 'emailFlag') {
			if (data && data.emailFlag && data.eventDate && data.startTime && data.emailScheduleHoursBefore) {
				let date = DateFormat.getDate(DateFormat.getDate(data.eventDate).setHours(DateFormat.getDate(data.startTime).getHours(), DateFormat.getDate(data.startTime).getMinutes(), 0, 0));
				let finalDate = (DateFormat.getDate(DateFormat.getDate(DateFormat.getDate(date).setHours(DateFormat.getDate(date).getHours() - data.emailScheduleHoursBefore))));
				let finalDate2 = DateFormat.getDate();
				if (DateFormat.compareDateTime(DateFormat.getDate(finalDate2),
					DateFormat.getDate(finalDate)) === 1) {
					return false;
				} else {
					return true;
				}
			}
			else {
				return true;
			}
		} else if (field === 'smsFlag') {
			if (data && data.emailFlag && data.eventDate && data.startTime && data.smsScheduleHoursBefore) {
				let date = DateFormat.getDate(DateFormat.getDate(data.eventDate).setHours(DateFormat.getDate(data.startTime).getHours(), DateFormat.getDate(data.startTime).getMinutes(), 0, 0));
				let finalDate = (DateFormat.getDate(DateFormat.getDate(DateFormat.getDate(date).setHours(DateFormat.getDate(date).getHours() - data.smsScheduleHoursBefore))));
				let finalDate2 = DateFormat.getDate();
				if (DateFormat.compareDateTime(DateFormat.getDate(finalDate2),
					DateFormat.getDate(finalDate)) === 1) {
					return false;
				} else {
					return true;
				}
			}
			else {
				return true;
			}
		}
		return false;
	}

	canAlertEditSch = (data: any, index: number, field: string): boolean => {
		if (data.nbtFirstName) {
			return false;
		}
		return true;
	}
	/** 
	 * This function displays the messages
	 */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	/* 
	  onOffenderChange function
	*/
	onOffenderChange(offender) {
		this.offSchSearchClear(); 
		if (offender) {
			this.VHeaderBlockModel = offender;
			this.querycausedValid = true;

			this.currentDate = DateFormat.getDate();
			this.offnotetodate = DateFormat.getDate();
			this.offnotefromdate = DateFormat.getDate(DateFormat.getDate().setMonth(this.currentDate.getMonth() - 3));

			this.ctrlpsFromDate = DateFormat.getDate();
			this.ctrlpsToDate = DateFormat.getDate(DateFormat.getDate().setMonth(this.currentDate.getMonth() + 2));

			//this.offnotesExecuteQuery();
			this.checkBoxDisable = true;
			this.enableInsert = true;
			this.enforcementDisabled = false;
			this.butDrrDis = true;
			this.butsaDis = true;
			//this.unpaidworkDis = true;
			//this.programmersDis = true;
			this.offNotesFTDisable = false;
			this.buttondisabled = false;
			this.offSchbuttondisabled = false;
			this.offSchbuttonCleardisabled = false
			this.buttondisabledClear = false;
			this.ctrlPsDis = false;
			//this.unpaidworkDis = true;
			//this.programmersDis = true;
		} else {
			this.offnotesData = [];
			this.offschData = [];
			this.schEventDate = undefined;
			this.schStartTime = undefined;
			this.schagyLocDesc = undefined;
			this.offnotesModel.fromDate = undefined;
			this.offnotesModel.toDate = undefined;
			this.offnotesModel.staffId = undefined;
			this.offnotesModel.caseNoteText = undefined;
			this.offnotesModel.caseNoteTextTemp = undefined;
			this.ctrlpsFromDate = undefined;
			this.ctrlpsStartTime = undefined;
			this.ctrlpsToDate = undefined;
			this.ctrlpsEndTime = undefined;
			this.ctrlpsOutCome = undefined;
			this.offnotetodate = undefined;
			this.offnotefromdate = undefined;
			this.checkBoxDisable = true;
			this.enableInsert = false;
			this.caseNoteTextReadOnly = true;
			this.commentTextReadOnly = true;
			this.offNotesFTDisable = true;
			this.buttondisabled = true;
			this.offSchbuttondisabled = true;
			this.offSchbuttonCleardisabled = true;
			this.buttondisabledClear = true;
			this.ctrlPsDis = true;
			//this.unpaidworkDis = true;
			//this.programmersDis = true;
			this.butDrrDis = true;
			this.butsaDis = true;
			this.enforcementDisabled = true;
			this.VHeaderBlockModel = new VHeaderBlock();
		}
	}

	clear() {
		this.offnotesData = [];
		this.offnotetodate = undefined;
		this.offnotefromdate = undefined;
		this.offnotesModel = new OffenderCaseNotes();
		this.buttondisabledClear = true;
		this.buttondisabled = false;
		this.namesReadOnly = false;
	}

	offSchSearchClear() {
		this.offschData = [];
		this.ctrlpsFromDate = undefined;
		this.ctrlpsStartTime = undefined;
		this.ctrlpsToDate = undefined;
		this.ctrlpsEndTime = undefined;
		this.ctrlpsOutCome = undefined;
		this.offschModel = new VOffenderAllSchedules();
		this.noteSourceCode = undefined;
		this.offSchbuttonCleardisabled = true;
		this.offSchbuttondisabled = false;
		//this.unpaidworkDis = true;
		//this.programmersDis = true;
		this.butDrrDis = true;
		this.butsaDis = true;
		this.namesReadOnlyOne = false;
	}


	offnotesExecuteQueryForSearch(fromDate?, tdate?) {
		if (fromDate) {
			if (fromDate.lastValue === '0_/__/____') {
				this.type = 'warn';
				this.message = this.translateService.translate('common.leapyearnotallowed');
				this.show();
				this.offnotefromdate = undefined;
				this.buttondisabledClear = true;
				return;
			}
			if (String(fromDate.lastValue).indexOf('_') >= 0 && fromDate.value === null) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.dateformate');
				this.show();
				this.offnotefromdate = undefined;
				this.buttondisabledClear = true;
				return;
			}
		}
		if (tdate) {
			if (tdate.lastValue === '0_/__/____') {
				this.type = 'warn';
				this.message = this.translateService.translate('common.leapyearnotallowed');
				this.show();
				this.offnotetodate = undefined;
				return;
			}
			if (String(tdate.lastValue).indexOf('_') >= 0 && tdate.value === null) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.dateformate');
				this.show();
				this.offnotetodate = undefined;
				return;
			}
			if (this.offnotetodate) {
				if (DateFormat.compareDate(DateFormat.getDate(this.offnotefromdate), DateFormat.getDate(this.offnotetodate)) === 1) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.fromdatecannotbelaterthantodate');
					this.show();
					return;
				}
			}
		}

		if (this.offnotefromdate) {
			this.offnotesExecuteQuery();
		} else {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.notefromdatemustbeentered');
			this.show();
			return;
		}
	}

	offSchSearch(cfd?, ctd?) {

		if (cfd) {
			if (cfd.lastValue === '0_/__/____') {
				this.type = 'warn';
				this.message = this.translateService.translate('common.leapyearnotallowed');
				this.show();
				this.ctrlpsFromDate = undefined;
				return;
			}
			if (String(cfd.lastValue).indexOf('_') >= 0 && cfd.value === null) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.dateformate');
				this.show();
				this.ctrlpsFromDate = undefined;
				return;
			}
		}
		if (!this.ctrlpsFromDate || this.ctrlpsFromDate === undefined) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.eventdatetimemustbeentered');
			this.show();
			return;
		}
		if (ctd) {
			if (cfd.lastValue === '0_/__/____') {
				this.type = 'warn';
				this.message = this.translateService.translate('common.leapyearnotallowed');
				this.show();
				this.ctrlpsToDate = undefined;
				return;
			}
			if (String(ctd.lastValue).indexOf('_') >= 0 && ctd.value === null) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.dateformate');
				this.show();
				this.ctrlpsToDate = undefined;
				return;
			}
			if (this.ctrlpsToDate) {
				if (DateFormat.compareDate(DateFormat.getDate(this.ctrlpsFromDate), DateFormat.getDate(this.ctrlpsToDate)) === 1) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.fromdatecannotbelaterthantodate');
					this.show();
					return;
				}
			}
		}
		if (this.ctrlpsFromDate) {
			this.offschExecuteQuery();
		} else {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.eventdatetimemustbeentered');
			this.show();
			return;
		}
	}

	/* schExecuteQuery */
	schExecuteQuery() {
		this.offBooKID = this.VHeaderBlockModel.offenderBookId;
		const schResult = this.ocdclogsFactory.schExecuteQuery(this.offBooKID);
		schResult.subscribe(data => {
			if (data.length > 0) {
				// this.offschData = data;
				this.offschDataTemp = data[0];
				this.schEventDate = this.offschDataTemp.eventDate;
				this.schStartTime = DateFormat.getDate(this.offschDataTemp.startTime);
				this.schagyLocDesc = this.offschDataTemp.agyLocDesc;
			}
		});
	}

	/* offNoteFromDateModelChange */
	offNoteFromDateModelChange(event) {
		if (this.offnotetodate) {
			// if (DateFormat.compareDate(DateFormat.getDate(this.offnotefromdate), DateFormat.getDate(this.offnotetodate)) == 1) {
			// this.type = 'warn';
			// this.message = this.translateService.translate('ocdclogs.fromdatecannotbelaterthantodate');
			// this.show();
			// return;
			// }
		}
		this.buttondisabledClear = false;
		if (String(this.offnotefromdate).indexOf('_') >= 0 && this.offnotefromdate === null) {
			this.type = 'warn';
			this.message = this.translateService.translate('common.datemustbeentervalidformat');
			this.show();
			return;
		}
		this.offnotefromdate = event;
	}

	/* ctrlpsFromDateChange */
	ctrlpsFromDateChange(event) {
		// if (this.ctrlpsToDate) {
		// if (DateFormat.compareDate(DateFormat.getDate(this.ctrlpsFromDate), DateFormat.getDate(this.ctrlpsToDate)) == 1) {
		// this.type = 'warn';
		// this.message = this.translateService.translate('ocdclogs.fromdatecannotbelaterthantodate');
		// this.show();
		// return;
		// }
		// }
		this.ctrlpsFromDate = event;
	}

	ctrlpsToDateChange(event) {
		this.ctrlpsToDate = event;
		this.isInsertableOnChange();
	}
	ctrlpsStartTimeChange(event) {
		this.ctrlpsStartTime = DateFormat.getDate(event);
	}

	ctrlpsEndTimeChange(event) {
		this.ctrlpsEndTime = DateFormat.getDate(event);
	}

	/* offNoteToDateModelChange */
	offNoteToDateModelChange(event) {
		this.offnotetodate = event;
		this.offnotesModel.toDate = event;
		this.isInsertableNoteChange();
	}

	isInsertableNoteChange() {
		if (this.offnotefromdate || this.offnotetodate) {
			this.buttondisabledClear = false;
		} else {
			this.buttondisabledClear = true;
		}
	}

	/* Off_notes Row Click */
	onRowClickffnotes(event) {
		const rowIndex = this.offnotesData.indexOf(event.data);
		if (event) {
			this.offnotesModel = event
			this.offnotesModel.dateCreation = this.offnotesModel.dateCreation;
			this.offnotesModel.timeCreation = DateFormat.getDate(this.offnotesModel.timeCreation);

			this.tip = this.sessionManager.currentCaseLoad + ',' + this.VHeaderBlockModel.agyLocId + ',' + this.VHeaderBlockModel.offenderBookId;

			this.staffnameLink = 'ocdclogs/rgCasenotestaffNameRecordGroup?tip=' + this.tip;

			const offnotesResult = this.ocdclogsFactory.getStaffId(event.caseNoteId);
			offnotesResult.subscribe(data => {
				if (data) {
					this.offnotesModel.staffId = Number(data);
				}
			});

			if (event.createDatetime) {
				this.onDelete = true;
				this.caseNoteTextReadOnly = true;
				this.checkBoxDisable = true;
			} else {
				this.onDelete = false;
				this.caseNoteTextReadOnly = false;
				this.checkBoxDisable = false;
			}

		} else {
			this.offnotesModel.dateCreation = undefined;
			this.offnotesModel.timeCreation = undefined;
			this.offnotesModel.staffId = undefined;
		}
	}

	onRowClickoffsch(event) {
		if (event) {
			event.emailFlag = ((event.emailFlag && event.emailFlag != 'N') || event.emailFlag === 'Y') ? true : false;
			event.smsFlag = ((event.smsFlag && event.smsFlag != 'N') || event.smsFlag === 'Y') ? true : false;
			event.nonAssociationFlag = ((event.nonAssociationFlag && event.nonAssociationFlag != 'N') || event.nonAssociationFlag === 'Y') ? true : false;
			event.unexcusedAbsenceFlag = ((event.unexcusedAbsenceFlag && event.unexcusedAbsenceFlag != 'N') || event.unexcusedAbsenceFlag === 'Y') ? true : false;
			this.offschModel = event;
			//this.offschModel = event;
			if (event.emailFlag) {
				this.gridOne.requiredOn('emailScheduleHoursBefore');
			} else {
				this.gridOne.requiredOff('emailScheduleHoursBefore');
			}
			if (event.smsFlag) {
				this.gridOne.requiredOn('smsScheduleHoursBefore');
			} else {
				this.gridOne.requiredOff('smsScheduleHoursBefore');
			}


			if (event.nbtFirstName) {
				this.onDelete1 = true;
			} else {
				this.onDelete1 = false;
			}
			if (this.offschModel.eventType) {
				if (this.offschModel.eventType === 'DRR') {
					this.butDrrDis = false;
				} else {
					this.butDrrDis = true;
				}
				//if (this.offschModel.eventType === 'UW') {
				//	this.unpaidworkDis = false;
				//} else {
				//	this.unpaidworkDis = true;
				//}
				//if (this.offschModel.eventType === 'ACP') {
				//	this.programmersDis = false;
				//} else {
				//	this.programmersDis = true;
				//}
				if (this.offschModel.eventType === 'SA') {
					this.butsaDis = false;
				} else {
					this.butsaDis = true;
				}
			}
		}
	}
	/* 
	 offnotes Execute Query
	 */
	offnotesExecuteQuery() {
		this.offnotesModel = new OffenderCaseNotes();
		this.offnotesModel.offenderBookId = this.VHeaderBlockModel.offenderBookId;
		if (this.offnotesModel.offenderBookId) {

			if (this.offnotefromdate !== null && this.offnotetodate !== null) {
				this.offnotesModel.fromDate = this.offnotefromdate;
				this.offnotesModel.toDate = this.offnotetodate;
			}

			const offnotesResult = this.ocdclogsFactory.offNotesExecuteQuery(this.offnotesModel);
			offnotesResult.subscribe(data => {
				if (data.length === 0) {
					this.offnotesData = [];
					this.type = 'warn';
					this.message = this.translateService.translate('common.querycaused');
					this.namesReadOnly = false;
					this.show();
					//this.clear();
					return;
				} else {
					data.forEach(element => {
						element.amendmentFlag = element.amendmentFlag === 'Y' ? true : false;
						element.caseNoteTextTemp = element.caseNoteText;
						element.checkBox1 = element.checkBox1 === 'Y' ? true : false;
						element.checkBox2 = element.checkBox2 === 'Y' ? true : false;
						element.checkBox3 = element.checkBox3 === 'Y' ? true : false;
						element.checkBox4 = element.checkBox4 === 'Y' ? true : false;
						element.checkBox5 = element.checkBox5 === 'Y' ? true : false;
						element['butIwp'] = 'D';
						element['rButton'] = 'R';
						element['aButton'] = 'A';
						element['goButton'] = 'GO';
						if (element.caseNoteId === null) {
							return;
						}
					});
					this.offnotesData = data;
					this.offnotesIndex = 0;
					this.buttondisabled = true;
					this.buttondisabledClear = false;
					this.namesReadOnly = true;
				}
			});
		}
	}
	/*
	 offNotesValidateRowData
	*/
	offNotesValidateRowData = (event) => {
		const rowIndex = this.offnotesData.indexOf(event.data);
		const rowdata = new ValidateRowReturn();
		if (event.field == 'caseNoteType' && event.data.caseNoteType) {
			this.grid.setColumnData('caseNoteSubType', rowIndex, undefined);
			this.grid.setColumnData('caseNoteText', rowIndex, undefined);
			this.offnotesModel.caseNoteTextTemp = undefined;
			rowdata.validated = true;
			return rowdata;
		}
		if (event.field == 'caseNoteType' && !event.data.caseNoteType) {
			this.grid.setColumnData('caseNoteSubType', rowIndex, undefined);
			this.grid.setColumnData('caseNoteText', rowIndex, undefined);
			this.offnotesModel.caseNoteTextTemp = undefined;
			rowdata.validated = true;
			return rowdata;
		}

		if (event.field == 'caseNoteSubType') {
			this.grid.setColumnData('caseNoteText', rowIndex, undefined);
			this.offnotesModel.caseNoteTextTemp = undefined;
			const serviceObj = this.ocdclogsFactory.caseNoteTextData(event.data);
			serviceObj.subscribe(data => {
				if (data) {
					this.grid.setColumnData('caseNoteText', rowIndex, data);
					this.offnotesModel.caseNoteTextTemp = data;
					rowdata.validated = true;
					return rowdata;
				} else {
					this.grid.setColumnData('caseNoteText', rowIndex, undefined);
					this.offnotesModel.caseNoteTextTemp = undefined;
					rowdata.validated = true;
					return rowdata;
				}
			})
			rowdata.validated = true;
			return rowdata;

		}

		rowdata.validated = true;
		return rowdata;
	}
	/*validateNoteTypeSubType 
	 */
	validateNoteTypeSubType() {
		const validateNoteTypeSubType = this.ocdclogsFactory.validateNoteTypeSubType(this.offnotesModel);
		validateNoteTypeSubType.subscribe(data => {
			if (data.length === 0) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.combinationofcontacttypeandsubtype');
				this.show();
				return;
			}
		});
	}

	/* offschExecuteQuery */
	offschExecuteQuery() {
		this.offschModel = new VOffenderAllSchedules();
		this.offschModel.offenderBookId = this.VHeaderBlockModel.offenderBookId;
		if (this.offschModel.offenderBookId) {
			this.offschModel.ctrlpsFromDate = this.ctrlpsFromDate;
			this.offschModel.ctrlpsToDate = this.ctrlpsToDate;
			this.offschModel.ctrlpsStartTime = this.ctrlpsStartTime;
			this.offschModel.ctrlpsEndTime = this.ctrlpsEndTime;
			this.offschModel.ctrlpsOutCome = this.ctrlpsOutCome;

			const offschResult = this.ocdclogsFactory.offSchExecuteQuery(this.offschModel);
			offschResult.subscribe(data => {
				this.schExecuteQuery();
				if (data.length === 0) {
					this.offschData = [];
					//if (!this.querycausedValid) {
						this.type = 'warn';
						this.message = this.translateService.translate('common.querycaused');
						this.show();
					//}
					this.namesReadOnlyOne = false;
					this.offschData = [];
					this.ctrlpsStartTime = undefined;
					this.ctrlpsEndTime = undefined;
					this.ctrlpsOutCome = undefined;
					this.offschModel = new VOffenderAllSchedules();
					this.noteSourceCode = undefined;
					this.offSchbuttonCleardisabled = true;
					this.offSchbuttondisabled = false;
					//this.unpaidworkDis = true;
					//this.programmersDis = true;
					this.butDrrDis = true;
					this.butsaDis = true;
					// this.querycausedValid = false;
					return;
				} else {
					data.forEach(element => {
						element.unexcusedAbsenceFlag = element.unexcusedAbsenceFlag === 'Y' ? true : false;
						element.eventDateCount = element.eventDate;
						element.eventOutcomeCount = element.eventOutcome;
						element.emailFlag = element.emailFlag === 'Y' ? true : false;
						element.smsFlag = element.smsFlag === 'Y' ? true : false;
						element.emailSentFlag = element.emailSentFlag === 'Y' ? true : false;
						element.smsSentFlag = element.smsSentFlag === 'Y' ? true : false;
						element.emailFlagTemp = element.emailFlagTemp === 'Y' ? true : false;
						element.smsFlagTemp = element.smsFlagTemp === 'Y' ? true : false;
						element.nonAssociationFlag = element.nonAssociationFlag === 'Y' ? true : false;
						element['button'] = '..';
						element.threeip = element.eventType + ',' + element.eventSubType + ',' + element.unexcusedAbsenceFlag;
						element['emailFlagTempOne'] = element.emailFlag;
						element['smsFlagTempOne'] = element.smsFlag;
						element['reminderName'] = 'Reminders';
						element['outComeFlag']=element.outComeFlag;


						if (element['eventType'] === 'UW') {

							element.toAgyLocId = element.location
						}
						element.cancelFlag = (element.eventStatus === 'CANC') ? true : false;

						element['butIwp'] = '';
						element['SCREEN'] = this.screenId + "~" + "true" + "~" + element['eventId'];
				

					});
					this.offschData = data;
					this.offschModel = this.offschData[0];
					this.offSchIndex = 0;
					this.offSchbuttondisabled = true;
					this.offSchbuttonCleardisabled = false;
					this.namesReadOnlyOne = true;
					this.commentTextReadOnly = false;
				}
			});
		}
	}

	tabChange(event) {
		if (event) {
			this.querycausedValid = true;
			if (event.index === 1) {
				if (this.VHeaderBlockModel.offenderBookId && this.offschData.length === 0 && this.ctrlpsFromDate) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.querycaused');
					this.show();
				}
				this.querycausedValid = false;
				return;
			}
			if (event.index === 0) {
				if (this.VHeaderBlockModel.offenderBookId && this.offnotesData.length === 0 && this.offnotefromdate) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.querycaused');
					this.show();
					return;
				}
			}
		}
	}

	offschValidateRowData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		this.offschModel = event.data;
		if (event.field === 'eventDate' && event.data.eventDate && (event.oldValue !== event.newValue)) {
			this.crtevtsConflictsModel = new CourtEvents();
			this.crtevtsConflictsModel.offenderBookId = this.VHeaderBlockModel.offenderBookId;
			this.crtevtsConflictsModel.eventDate = event.data.eventDate;
			this.ocdenforFactory.getcrtEvtsScheduleConflict(this.crtevtsConflictsModel).subscribe(data => {
				if (data > 0) {
					const data1 = { 'eventDate': event.data.eventDate, 'offenderBookId': this.VHeaderBlockModel.offenderBookId };
					this.dialogService.openLinkDialog('/oiuscinq', data1).subscribe(result => {
						if (result) {
							rowdata.validated = true;
							return rowdata;
						} else {
							//
							//event.data.eventDate = undefined;
							this.gridOne.gridApi.setFocusedCell(rowIndex, 'startTime');
							this.gridOne.setColumnData('eventDate', rowIndex, undefined);
							rowdata.validated = true;
							return rowdata;
						}
					});
					rowdata.validated = true;
					return rowdata;
				}
			});
		}

		if (event.field == 'eventType') {
			if (event.data.eventType && event.data.eventSubType) {
				this.gridOne.setColumnData('reminderName', rowIndex, false);
				rowdata.validated = true;
				return rowdata;

			}

		}

		if (event.field == 'eventSubType') {
			if (event.data.eventType && event.data.eventSubType) {
				const validateNoteTypeSubType = this.ocdclogsFactory.getEmailSmsFlag(event.data);
				validateNoteTypeSubType.subscribe(data => {
					if (data.length > 0) {
						data.forEach(ele => {
							ele.emailFlag = ele.emailFlag === 'Y' ? true : false;
							ele.smsFlag = ele.smsFlag === 'Y' ? true : false;
							ele.nonAssociationFlag = ele.nonAssociationFlag === 'Y' ? true : false;
						});
						// this.gridOne.setColumnData('emailFlag', rowIndex, false);
						// this.gridOne.setColumnData('emailFlagTemp', rowIndex, data[0].emailFlag);
						this.gridOne.setColumnData('emailAddressCount', rowIndex, data[0].emailAddressCount);
						this.gridOne.setColumnData('phoneNumberCount', rowIndex, data[0].phoneNumberCount);
						this.gridOne.setColumnData('nonAssociationFlag', rowIndex, data[0].nonAssociationFlag);

						// this.gridOne.setColumnData('smsFlag', rowIndex, false);
						// this.gridOne.setColumnData('smsFlagTemp', rowIndex, data[0].smsFlag);
					} else {
						this.gridOne.setColumnData('emailFlag', rowIndex, undefined);
						this.gridOne.setColumnData('smsFlag', rowIndex, undefined);
						this.gridOne.setColumnData('emailFlagTemp', rowIndex, undefined);
						this.gridOne.setColumnData('smsFlagTemp', rowIndex, undefined);
						this.gridOne.setColumnData('emailAddressCount', rowIndex, undefined);
						this.gridOne.requiredOff('emailScheduleHoursBefore');
						this.gridOne.requiredOff('smsScheduleHoursBefore');
						this.gridOne.setColumnData('phoneNumberCount', rowIndex, undefined);
						this.gridOne.setColumnData('nonAssociationFlag', rowIndex, undefined);
					}
				});
				event.data.unexcusedAbsenceFlag = event.data.unexcusedAbsenceFlag === 'Y' ? true : false;
				event.data.threeip = event.data.eventType + ',' + event.data.eventSubType + ',' + event.data.unexcusedAbsenceFlag;
			}
		}



		 if (event.field === 'eventOutcome' && event.data.eventOutcome) {
			const validateNoteTypeSubType = this.ocdclogsFactory.getCancelFlag(event.data);
				validateNoteTypeSubType.subscribe(data => {					
					if(data === 'Y') {
						this.gridOne.setColumnData('emailFlag', rowIndex,false );
				this.gridOne.setColumnData('smsFlag', rowIndex,false );
				this.gridOne.setColumnData('emailScheduleHoursBefore', rowIndex,undefined );
				this.gridOne.setColumnData('smsScheduleHoursBefore', rowIndex,undefined );
					}

					if (DateFormat.compareDateTime(DateFormat.getDate(),
                    DateFormat.getDate(event.data.eventDate)) === -1 && data === 'N')
					{
						this.gridOne.setColumnData('eventOutcome', rowIndex,undefined);
						this.type = 'warn';
						this.message = this.translateService.translate('ocdcsch.thisoutcomecannotbeselectedforfutureevents');
						this.show();
					}
				});
			
			rowdata.validated = true;
			return rowdata;

		}

		if (!this.offschModel.startTime && !this.offschModel.endTime) {
			this.offschModel.startTime = TimeFormat.parse(TimeFormat.format(this.offschModel.startTime), this.offschModel.eventDate);
			this.offschModel.endTime = TimeFormat.parse(TimeFormat.format(this.offschModel.endTime), this.offschModel.eventDate);
			if (this.offschModel.endTime < this.offschModel.startTime) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.endtimecannotbeearlierthanstarttime');
				this.show();
				return;
			}
			rowdata.validated = true;
			return rowdata;
		}

		if (this.offschModel.eventType != 'DRR' && this.offschModel.eventType != 'UW' && this.offschModel.eventType != 'ACP'
			&& this.offschModel.eventType != 'SA' && this.offschModel.nbtUpdOutcomeFlag == 'N') {
			this.eveOutEditable = false;
			rowdata.validated = true;
			return rowdata;
		}
		if (this.offschModel.eventType != 'DRR' && this.offschModel.eventType != 'UW' && this.offschModel.eventType != 'ACP'
			&& this.offschModel.eventType != 'SA' && this.offschModel.nbtUpdOutcomeFlag == 'Y' && this.offschModel.eventOutcome != null) {
			this.eveOutEditable = true;
			rowdata.validated = true;
			return rowdata;
		}

		if (this.offschModel.eventType) {
			if (this.offschModel.eventType === 'DRR') {
				this.butDrrDis = false;
			}

			if (this.offschModel.eventType === 'SA') {
				this.butsaDis = false;
			}

			rowdata.validated = true;
			return rowdata;
		}


		rowdata.validated = true;
		return rowdata;
	}

	offNotesValidations() {
		const is = { valid: true };
		this.offnotesData.forEach(data => {
			if (is.valid) {
				if (!data.contactDate) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseentercontactdate');
					this.show();
					is.valid = false;
					return;
				}
				if (!data.contactTime) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseentercontacttime');
					this.show();
					is.valid = false;
					return;
				}

				if (!data.caseNoteTextTemp) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseentercasenotetext');
					this.show();
					is.valid = false;
					return;
				}
			}
		});
		return is.valid;
	}

	/* on INSERT */
	onGridInsert = () => {
		this.checkBoxDisable = false;
		this.caseNoteTextReadOnly = false;
		if (!this.offNotesValidations()) {
			return false;
		}
		this.noteSourceCode = undefined;
		const sourceCode = undefined;;
		if (this.sessionManager.currentCaseLoadType === 'INST') {
			this.noteSourceCode = 'INST';
		} else {
			this.noteSourceCode = 'COMM';
		}
		return {
			offenderBookId: this.VHeaderBlockModel.offenderBookId, dateCreation: DateFormat.getDate(),
			timeCreation: DateFormat.getDate().getTime(), staffId: this.currentUserStaffId,
			contactDate: DateFormat.getDate(),
			contactTime: DateFormat.getDate(),
			noteSourceCode: this.noteSourceCode,
			amendmentFlag: false,
			pObjectType: 'CNOTE',
			pModuleName: 'OIDCNOTE',
			butIwp: 'D',
			rButton: 'R',
			aButton: 'A',
			goButton: 'GO',
		};
	}



	/* on INSERT */
	onGridInsertOne = () => {
		this.commentTextReadOnly = false;
		return {
			button: '..', offenderBookId: this.VHeaderBlockModel.offenderBookId, reminderName: ' '
		};
	}



	offSchClear = () => {
		this.offschModel.commentText = undefined;
		return true;
	}

	offNotesClear = () => {
		this.checkBoxDisable = true;
		this.offnotesModel.dateCreation = undefined;
		this.offnotesModel.timeCreation = undefined;
		this.offnotesModel.staffId = undefined;
		return true;
	}

	offNotesCommit(event) {
		this.offnotesInsertList = event.added
		this.offnotesUpdatetList = event.updated
		this.offnotesDeleteList = event.removed
		this.offnotesCommitModel.insertList = [];
		this.offnotesCommitModel.updateList = [];
		this.offnotesCommitModel.deleteList = [];

		if (this.offnotesInsertList.length > 0) {
			for (let i = 0; i < this.offnotesInsertList.length; i++) {

				if (this.offnotesInsertList[i].contactTime) {
					this.offnotesInsertList[i].contactTime = TimeFormat.parse(TimeFormat.format(this.offnotesInsertList[i].contactTime),
						this.offnotesInsertList[i].contactDate);
				}
				if (this.offnotesInsertList[i].contactDate) {
					this.offnotesInsertList[i].contactDate = DateFormat.getDate(this.offnotesInsertList[i].contactDate.setHours(0, 0, 0));
				}
				if (!this.offnotefromdate) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.notefromdatemustbeentered');
					this.show();
					return;
				}
				if (!this.offnotesInsertList[i].contactDate) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.datemustbeentereddate');
					this.show();
					return;
				}
				if (DateFormat.compareDate(DateFormat.getDate(this.offnotesInsertList[i].contactDate), DateFormat.getDate()) === 1) {
					const rowIndex = this.offnotesData.indexOf(this.offnotesInsertList[i]);
					this.grid.setColumnData('contactDate', rowIndex, null);
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.datecannotbefuturedate');
					this.show();
					return;
				}
				if (DateFormat.compareDate(DateFormat.getDate(this.offnotesInsertList[i].contactDate), DateFormat.getDate(this.offnotefromdate)) === -1) {
					const rowIndex = this.offnotesData.indexOf(this.offnotesInsertList[i]);
					this.grid.setColumnData('contactDate', rowIndex, null);
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.datecannotbebackdatedmorethan3monthsfromcurrentdate');
					this.show();
					return;
				}
				if (!this.offnotesInsertList[i].contactTime) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.timemustbeentered');
					this.show();
					return;
				}
				if (!this.offnotesInsertList[i].caseNoteType) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseentercasenotetype');
					this.show();
					return;
				}
				if (!this.offnotesInsertList[i].caseNoteSubType) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseentercasenotesubtype');
					this.show();
					return;
				}
				if (!this.offnotesInsertList[i].caseNoteTextTemp) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseentercasenotetext');
					this.show();
					return;
				}
				this.offnotesInsertList[i].caseNoteText = this.offnotesInsertList[i].caseNoteTextTemp;
				this.offnotesInsertList[i].amendmentFlag = this.offnotesInsertList[i].amendmentFlag ? 'Y' : 'N';
				this.offnotesInsertList[i].iwpFlag = this.offnotesInsertList[i].iwpFlag ? 'Y' : 'N';
				this.offnotesInsertList[i].checkBox1 = this.offnotesInsertList[i].checkBox1 ? 'Y' : 'N';
				this.offnotesInsertList[i].checkBox2 = this.offnotesInsertList[i].checkBox2 ? 'Y' : 'N';
				this.offnotesInsertList[i].checkBox3 = this.offnotesInsertList[i].checkBox3 ? 'Y' : 'N';
				this.offnotesInsertList[i].checkBox4 = this.offnotesInsertList[i].checkBox4 ? 'Y' : 'N';
				this.offnotesInsertList[i].checkBox5 = this.offnotesInsertList[i].checkBox5 ? 'Y' : 'N';

				this.offnotesInsertList[i].offenderBookId = this.VHeaderBlockModel.offenderBookId;
			}
			this.offnotesCommitModel.insertList = this.offnotesInsertList;
		}

		if (this.offnotesUpdatetList.length > 0) {
			for (let i = 0; i < this.offnotesUpdatetList.length; i++) {
				if (!this.offnotesUpdatetList[i].contactDate) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.datemustbeentereddate');
					this.show();
					return;
				}
				if (!this.offnotefromdate) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.datemustbeentereddate');
					this.show();
					return;
				}
				if (!this.offnotesUpdatetList[i].contactTime) {
					this.type = 'warn';
					this.message = this.translateService.translate('common.timemustbeentered');
					this.show();
					return;
				}
				if (DateFormat.compareDate(DateFormat.getDate(this.offnotesUpdatetList[i].contactDate), DateFormat.getDate()) === 1) {
					const rowIndex = this.offnotesData.indexOf(this.offnotesUpdatetList[i]);
					this.grid.setColumnData('contactDate', rowIndex, null);
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.datecannotbefuturedate');
					this.show();
					return;
				}
				if (DateFormat.compareDate(DateFormat.getDate(this.offnotesUpdatetList[i].contactDate), DateFormat.getDate(this.offnotefromdate)) === -1) {
					const rowIndex = this.offnotesData.indexOf(this.offnotesUpdatetList[i]);
					this.grid.setColumnData('contactDate', rowIndex, null);
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.datecannotbebackdatedmorethan3monthsfromcurrentdate');
					this.show();
					return;
				}
				if (this.offnotesUpdatetList[i].amendmentFlag) {
					this.offnotesUpdatetList[i].amendmentFlag = 'Y';
				} else {
					this.offnotesUpdatetList[i].amendmentFlag = 'N';
				}
				this.offnotesUpdatetList[i].caseNoteText = this.offnotesUpdatetList[i].caseNoteTextTemp;
				this.offnotesUpdatetList[i].iwpFlag = this.offnotesUpdatetList[i].iwpFlag ? 'Y' : 'N';
				this.offnotesUpdatetList[i].checkBox1 = this.offnotesUpdatetList[i].checkBox1 ? 'Y' : 'N';
				this.offnotesUpdatetList[i].checkBox2 = this.offnotesUpdatetList[i].checkBox2 ? 'Y' : 'N';
				this.offnotesUpdatetList[i].checkBox3 = this.offnotesUpdatetList[i].checkBox3 ? 'Y' : 'N';
				this.offnotesUpdatetList[i].checkBox4 = this.offnotesUpdatetList[i].checkBox4 ? 'Y' : 'N';
				this.offnotesUpdatetList[i].checkBox5 = this.offnotesUpdatetList[i].checkBox5 ? 'Y' : 'N';

				if (this.offnotesUpdatetList[i].contactTime) {
					this.offnotesUpdatetList[i].contactTime = TimeFormat.parse(TimeFormat.format(this.offnotesUpdatetList[i].contactTime),
						this.offnotesUpdatetList[i].contactDate);
				}

			}
			this.offnotesCommitModel.updateList = this.offnotesUpdatetList;
		}

		if (this.offnotesDeleteList.length > 0) {
			for (let i = 0; i < this.offnotesDeleteList.length; i++) {

				if (this.sessionManager.currentCaseLoadType === 'INST') {
					this.offnotesDeleteList[i].lvRoleCode = 'CNOTE_DELETE';
				}
				if (this.sessionManager.currentCaseLoadType === 'COMM') {
					this.offnotesDeleteList[i].lvRoleCode = 'CLOGS_DELETE';
				}

				this.offnotesCommitModel.deleteList = this.offnotesDeleteList;
			}
		}

		const offnotesSaveData = this.ocdclogsFactory.offNotesCommit(this.offnotesCommitModel);
		offnotesSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('ocdclogs.recordsappliedandsaved');
				this.show();
				this.offnotesExecuteQuery();
				return;
			} if (data === 11) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.insufficientprivilegesexisttodeletethisrecord');
				this.show();
				this.offnotesExecuteQuery();
				return;
			}
		});
	}

	onContactLogsClick = () => {
		this.ocdclogsFactory.exitFlag = true;
		let offBookId = this.VHeaderBlockModel.offenderBookId;
		if (offBookId) {

			return this.router.navigate(['/OCDENFOR']);
		} else {
			this.ocdclogsFactory.exitFlag = false;
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.pleasesavethechangesbeforenavigatingtoenforcement');
			this.show();
			return;
		}
	}

	onContactLogsClickOne = () => {
		let offBookId = this.VHeaderBlockModel.offenderBookId;
		if (offBookId) {
			this.ocdclogsFactory.exitFlag = true;
			return this.router.navigate(['/OCDUPROJ']);
		} else {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.unpaidworkprojectsscreen');
			this.show();
			return;
		}
	}

	onContactLogsClickTwo = () => {
		let offBookId = this.VHeaderBlockModel.offenderBookId;
		if (offBookId) {
			return this.router.navigate(['/OCDPROGR']);
		} else {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.programprojcreen');
			this.show();
			return;
		}
	}

	offSchCommit(event) {
		this.nonAssoCount = 0;
		this.offschInsertList = event.added
		this.offschUpdatetList = event.updated
		this.offschDeleteList = event.removed
		this.offschCommitModel.insertList = [];
		this.offschCommitModel.updateList = [];
		this.offschCommitModel.deleteList = [];

		if (this.offschInsertList.length > 0) {
			for (let i = 0; i < this.offschInsertList.length; i++) {
				if (this.offschInsertList[i].eventDate) {
					this.offschInsertList[i].eventDate = DateFormat.getDate(this.offschInsertList[i].eventDate.setHours(0, 0, 0));
				}

				if (!this.offschInsertList[i].eventType && this.offschInsertList[i].eventType == null) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseenterscheduletype');
					this.show();
					return;
				}
				if (!this.offschInsertList[i].eventSubType && this.offschInsertList[i].eventSubType == null) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseenterschedulesubtype');
					this.show();
					return;
				}
				if (!this.offschInsertList[i].eventDate) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseeentereventdated');
					this.show();
					return;
				}
				if (DateFormat.compareDate(DateFormat.getDate(this.offschInsertList[i].eventDate),
					DateFormat.getDate(this.VHeaderBlockModel.bookingBeginDate)) === -1) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdcsch.eventdatecannotbepriortostartdateofthebooking');
					this.show();
					return;
				}
				if (!this.offschInsertList[i].startTime) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseenterfrom');
					this.show();
					return;
				}
				if (!this.offschInsertList[i].toAgyLocId) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseenterclocation');
					this.show();
					return;
				}
				if (this.offschInsertList[i].smsFlag && (!this.offschInsertList[i].phoneNumberCount || this.offschInsertList[i].phoneNumberCount === 0)) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.offendderdoesnthavephonenumberconfiguration');
					this.show();
					return;
				}
				if (this.offschInsertList[i].emailFlag && (!this.offschInsertList[i].emailAddressCount || this.offschInsertList[i].emailAddressCount === 0)) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.offendderdoesnthaveemailconfiguration');
					this.show();
					return;
				}
				if (this.offschInsertList[i].emailFlag && !this.offschInsertList[i].emailScheduleHoursBefore) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.emailScheduleHrsBeforemust');
					this.show();
					return;
				}
				if (this.offschInsertList[i].smsFlag && !this.offschInsertList[i].smsScheduleHoursBefore) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.smsScheduleHrsBeforemust');
					this.show();
					return;
				}
				if (this.offschInsertList[i].nonAssociationFlag) {
					this.nonAssoCount++;
				}


				this.offschInsertList[i].eventClass = 'COMM';
				this.offschInsertList[i].eventStatus = 'SCH';
				this.offschInsertList[i].offenderBookId = this.VHeaderBlockModel.offenderBookId;
				this.offschInsertList[i].unexcusedAbsenceFlag = this.offschInsertList[i].unexcusedAbsenceFlag ? 'Y' : 'N';
				this.offschInsertList[i].emailFlag = this.offschInsertList[i].emailFlag ? 'Y' : 'N';
				this.offschInsertList[i].smsFlag = this.offschInsertList[i].smsFlag ? 'Y' : 'N';
				this.offschInsertList[i].nonAssociationFlag = this.offschInsertList[i].nonAssociationFlag ? 'Y' : 'N';
				this.offschInsertList[i].emailSentFlag = 'N';
				this.offschInsertList[i].smsSentFlag = 'N';
				if (this.offschInsertList[i].startTime) {
					this.offschInsertList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offschInsertList[i].startTime),
						this.offschInsertList[i].eventDate);
				}
				if (this.offschInsertList[i].endTime) {
					this.offschInsertList[i].endTime = TimeFormat.parse(TimeFormat.format(this.offschInsertList[i].endTime),
						this.offschInsertList[i].eventDate);
				}

			}
			this.offschCommitModel.insertList = this.offschInsertList;
		}

		if (this.offschUpdatetList.length > 0) {
			for (let i = 0; i < this.offschUpdatetList.length; i++) {
				if (!this.offschUpdatetList[i].eventDate) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseeentereventdate');
					this.show();
					return;
				}
				if (DateFormat.compareDate(DateFormat.getDate(this.offschUpdatetList[i].eventDate),
					DateFormat.getDate(this.VHeaderBlockModel.bookingBeginDate)) === -1) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdcsch.eventdatecannotbepriortostartdateofthebooking');
					this.show();
					return;
				}
				if (!this.offschUpdatetList[i].startTime) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseenterfrom');
					this.show();
					return;
				}
				if (!this.offschUpdatetList[i].toAgyLocId) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.pleaseenterclocation');
					this.show();
					return;
				}
				if (this.offschUpdatetList[i].emailFlag && (!this.offschUpdatetList[i].emailAddressCount || this.offschUpdatetList[i].emailAddressCount === 0)) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.offendderdoesnthaveemailconfiguration');
					this.show();
					return;
				}
				if (this.offschUpdatetList[i].smsFlag && (!this.offschUpdatetList[i].phoneNumberCount || this.offschUpdatetList[i].phoneNumberCount === 0)) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.offendderdoesnthavephonenumberconfiguration');
					this.show();
					return;
				}
				if (this.offschUpdatetList[i].emailFlag && !this.offschUpdatetList[i].emailScheduleHoursBefore) {
					this.type = 'warn';
					this.message = this.translateService.translate('Email Schedule Hours Before must be entered');
					this.show();
					return;
				}
				if (this.offschUpdatetList[i].smsFlag && !this.offschUpdatetList[i].smsScheduleHoursBefore) {
					this.type = 'warn';
					this.message = this.translateService.translate('Sms Schedule Hours Before must be entered');
					this.show();
					return;
				}
				const date = DateFormat.getDate().setMonth(DateFormat.getDate().getMonth() - 3);
				if (DateFormat.compareDate(DateFormat.getDate(this.offschUpdatetList[i].eventDate), DateFormat.getDate(date)) === -1) {
					const rowIndex = this.offschData.indexOf(this.offschUpdatetList[i]);
					this.gridOne.setColumnData('eventDate', rowIndex, null);
					this.type = 'warn';
					this.message = this.translateService.translate('ocdclogs.datecannotbebackdatedmorethan3monthsfromcurrentdate');
					this.show();
					return;
				}
				this.offschUpdatetList[i].unexcusedAbsenceFlag = this.offschUpdatetList[i].unexcusedAbsenceFlag ? 'Y' : 'N';

				if (this.offschUpdatetList[i].startTime) {
					this.offschUpdatetList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offschUpdatetList[i].startTime),
						this.offschUpdatetList[i].eventDate);
				}
				if (this.offschUpdatetList[i].endTime) {
					this.offschUpdatetList[i].endTime = TimeFormat.parse(TimeFormat.format(this.offschUpdatetList[i].endTime),
						this.offschUpdatetList[i].eventDate);
				}
				if (this.offschUpdatetList[i].eventDate != this.offschUpdatetList[i].eventDateCount) {

				}
				if (this.offschUpdatetList[i].eventOutcome != this.offschUpdatetList[i].eventOutcomeCount) {

				}
				if (this.offschUpdatetList[i].nonAssociationFlag) {
					this.nonAssoCount++;
				}
				this.offschUpdatetList[i].emailFlag = this.offschUpdatetList[i].emailFlag ? 'Y' : 'N';
				this.offschUpdatetList[i].smsFlag = this.offschUpdatetList[i].smsFlag ? 'Y' : 'N';
				this.offschUpdatetList[i].emailSentFlag = this.offschUpdatetList[i].emailSentFlag ? 'Y' : 'N';
				this.offschUpdatetList[i].smsSentFlag = this.offschUpdatetList[i].smsSentFlag ? 'Y' : 'N';
				this.offschUpdatetList[i].nonAssociationFlag = this.offschUpdatetList[i].nonAssociationFlag ? 'Y' : 'N';
			}

			this.offschCommitModel.updateList = this.offschUpdatetList;
		}


		let isSeriesCount = 0;
		if (this.offschDeleteList.length > 0) {
			for (let i = 0; i < this.offschDeleteList.length; i++) {
				this.offschDeleteList[i].isSeriesDelete = false;
				if (this.offschDeleteList[i].seriesId) {
					isSeriesCount++;
				}
			}
		}
		if (isSeriesCount > 0) {
			const modelData = {
				label: this.translateService.translate('ocdclogs.doyouwantdeleteentireseries')
				, yesBtn: true, noBtn: true, cancelBtn: true, yesLabel: this.translateService.translate('ocdclogs.deleteonlythisschedule'), noLabel: this.translateService.translate('ocdclogs.deleteentireseries')
			};
			this.dialogService.openLinkDialog('/ocucoffeconfirmbox', modelData, 50).subscribe(result => {
				if (result) {
					for (let i = 0; i < this.offschDeleteList.length; i++) {
						if (this.offschDeleteList[i].seriesId) {
							this.offschDeleteList[i].isSeriesDelete = false;
						}
					}
				} else if (result == null) {
					return;
				} else {
					for (let i = 0; i < this.offschDeleteList.length; i++) {
						if (this.offschDeleteList[i].seriesId) {
							this.offschDeleteList[i].isSeriesDelete = true;
						}
					}
				}
				this.offschCommitModel.deleteList = this.offschDeleteList;
				this.beforeFinalSave();
			});

		} else {
			this.offschCommitModel.deleteList = this.offschDeleteList;
			this.beforeFinalSave();
		}

	}

	beforeFinalSave() {
		if (this.nonAssoCount > 0) {
			const offschConflictData = this.ocdclogsFactory.checkNonAssociations(this.offschCommitModel);
			offschConflictData.subscribe(data => {
				if (data && data != 'EMPTYDATA') {
					const msgOne = this.translateService.translate('ocdclogs.nonassociationconflictmsg');
					const msgTwo = this.translateService.translate('ocdclogs.doyouwanttocontinue');
					data = data.replace('ocdclogs.nonassociationconflictmsg', msgOne);
					data = data.replace('ocdclogs.doyouwanttocontinue', msgTwo);
					const labelMsg = {
						label: this.translateService.translate(data), yesBtn: true, noBtn: true
					};
					this.dialogService.openLinkDialog('/ocucoffeconfirmbox', labelMsg, 50).subscribe(result => {
						if (result) {
							this.finalSave();
						} else {
							return;
						}
					});
				} else {
					this.finalSave();
				}
			});
		} else {
			this.finalSave();
		}
	}

	finalSave() {
		const offschSaveData = this.ocdclogsFactory.offSchCommit(this.offschCommitModel);
		offschSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.nonAssoCount = undefined;
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.offschExecuteQuery();
				return;
			} else if (data === 3) {
				this.type = 'warn';
				this.message = this.translateService.translate('common.youcannotdeletethisrecord');
				this.show();
				this.offschExecuteQuery();
				return;
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
				this.offschExecuteQuery();
				return;
			}

		});
	}

	remindersLaunch = (data) => {

		const index = this.offschData.indexOf(data);
		data['screenId'] = 'OCDCSCH';
            let startHours = DateFormat.getDate(data.startTime).getHours();
            let startMinutes = DateFormat.getDate(data.startTime).getMinutes();
            const eventDate1 = DateFormat.getDate(DateFormat.getDate(data.eventDate).setHours(startHours, startMinutes, 0, 0));
            const eventDate2 = DateFormat.getDate(DateFormat.getDate().setHours(DateFormat.getDate().getHours(), DateFormat.getDate().getMinutes(), 0, 0));
            if (DateFormat.compareDateTime(eventDate1, eventDate2) === -1) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.pastevent');
              this.show();
              return;
            }
			else if( data.outComeFlag === 'Y'){
				this.type = 'warn';
				this.message = this.translateService.translate('ocdclogs.canceloutcomeevent');
                this.show();

			}

		else if (!data.createDatetime && !data.eventId) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocdclogs.pleasesaverecordsbeforecontinuing ');
			this.show();

			return;
		} else {
			this.dialogService.openLinkDialog('/OCUREMIN', data, 25).subscribe(res => {
				if (res && Object.keys(res).length > 0) {
					this.offschExecuteQuery();
				} else {
					this.offschExecuteQuery();

				}
			});
		}
	}
	

}
