import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuwarniService } from '../service/ocuwarni.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderCaseNotes } from '@inst/casemanagement/beans/OffenderCaseNotes';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
	selector: 'app-ocuwarni',
	templateUrl: './ocuwarni.component.html'
})

export class OcuwarniComponent implements OnInit {
	// Variable declaration
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	offcasenotesData: OffenderCaseNotes[] = [];
	offcasenotesDataTemp: OffenderCaseNotes[] = [];
	// TODO angular.copy(this.offcasenotesData, thisoffcasenotesDataTemp);
	offcasenotesModel: OffenderCaseNotes = new OffenderCaseNotes();
	offcasenotesIndex: number = 0;
	offcasenotesInsertList: OffenderCaseNotes[] = [];
	offcasenotesUpdatetList: OffenderCaseNotes[] = [];
	offcasenotesDeleteList: OffenderCaseNotes[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	offCaseNotesColumnDef: any[];
	offCaseNotesReadOnly: boolean = false;
	rgconsubtypeRg: any[] = [];
	rgstaffnameRg: any[] = [];
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	@ViewChild('grid', { static: true }) grid: any;
	caseLoadId: string;
	link: string;
	tableIndex = -1;
	constructor(private ocuwarniFactory: OcuwarniService, public translateService: TranslateService,
		public sessionManager: UserSessionManager, private dialogService: DialogService) {
		// TODO initilize data members here..!
		this.offCaseNotesColumnDef = [];
	}
	ngOnInit() {
		this.caseLoadId = this.sessionManager.currentCaseLoad;
		this.link = 'ocuwarni/rgStaffNameRecordGroup?offenderBookId=' + this.dialog.data.offenderBookId + '&caseloadId=' + this.sessionManager.currentCaseLoad + '&agyLocId=' + this.dialog.data.agyLocId;
		this.offCaseNotesColumnDef = [
			{ fieldName: this.translateService.translate('common.date'), field: 'contactDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('common.time'), field: 'contactTime', editable: false, width: 150, datatype: 'time' },
			{ fieldName: this.translateService.translate('ocuwarni.sotesource'), field: 'pNbtNoteSourceCodeDesc', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('ocuwarni.contactsubtype'), field: 'caseNoteSubType', editable: false, width: 150, datatype: 'lov', domain: 'TASK_SUBTYPE', },
			{ fieldName: this.translateService.translate('ocuwarni.casenotestext'), field: 'caseNoteText', editable: false, width: 150 },
			{
				fieldName: '', field: 'butIwp', datatype: 'launchbutton', link: '/OIUIWPVE', data: 'row', modal: true, editable: true,
				width: 220, dialogWidth: '80', updateField: 'row', onLaunchClick: this.butIwpLaunch,
			}
		];
		// TODO all initializations here
		var serviceObj;
		this.offcasenotesExecuteQuery();
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
	onRowClickoffcasenotes(event) {
		this.offcasenotesModel = event;
	}
	onOffenderChange(offender) {
	}
	cancel() {
		this.dialog.close(true);
	}
	butIwpLaunch = (event) => {
		this.dialogService.openLinkDialog('/OIUIWPVE', this.offcasenotesModel, 80).subscribe(res => {
		});
	}
	offcasenotesExecuteQuery() {
		this.offcasenotesModel.offenderBookId = this.dialog && this.dialog.data && this.dialog.data.offenderBookId;
		const offcasenotesResult = this.ocuwarniFactory.offCaseNotesExecuteQuery(this.offcasenotesModel);
		offcasenotesResult.subscribe(offcasenotesResultList => {
			if (offcasenotesResultList.length === 0) {
				this.offcasenotesData = [];
			} else {
				offcasenotesResultList.forEach(element => {
					element['butIwp'] = 'D';
				});
				this.offcasenotesData = offcasenotesResultList;
				this.offcasenotesModel = offcasenotesResultList[0];
				this.tableIndex = 0;
			}
		});
	}

}
