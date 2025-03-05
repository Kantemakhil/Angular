import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuadjcrService } from '../service/ocuadjcr.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSentencesHtyCommitBean } from '@inst/legal-screens/sentenceadministration/beans/OffenderSentencesHtyCommitBean';
import { OffenderSentencesHty } from '@inst/legal-screens/sentenceadministration/beans/OffenderSentencesHty';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OcdlegloSanctionHty } from '@inst/legal/beans/OcdlegloSanctionHty';

// import required bean declarations

@Component({
	selector: 'app-ocuadjcr',
	templateUrl: './ocuadjcr.component.html'
})
export class OcuadjcrComponent implements OnInit {
	// Variable declaration
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	ctlBlkData: OffenderSentencesHty[] = [];
	ctlBlkDataTemp: OffenderSentencesHty[] = [];
	// TODO angular.copy(this.ctlblkData, thisctlblkDataTemp);
	ctlBlkModel: OffenderSentencesHty = new OffenderSentencesHty();
	offSentHistModel: OffenderSentencesHty = new OffenderSentencesHty();
	ctlBlkIndex: number = 0;
	ctlBlkInsertList: OffenderSentencesHty[] = [];
	ctlBlkUpdateList: OffenderSentencesHty[] = [];
	ctlBlkDeleteList: OffenderSentencesHty[] = [];
	offsenhtyData: OffenderSentencesHty[] = [];
	offsenhtyDataTemp: OffenderSentencesHty[] = [];
	// TODO angular.copy(this.offsenhtyData, thisoffsenhtyDataTemp);
	offsenhtyModel: OffenderSentencesHty = new OffenderSentencesHty();
	offsenhtyIndex: number = 0;
	offsenhtyInsertList: OffenderSentencesHty[] = [];
	offsenhtyUpdatetList: OffenderSentencesHty[] = [];
	offsenhtyDeleteList: OffenderSentencesHty[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	offSenHtyColumnDef: any[];
	ctlBlkReadOnly: boolean = false;
	ctlBlkButReadOnly: boolean = false;
	offSenHtyReadOnly: boolean = false;
	rgreasonRg: any[] = [];
	tableIndex = -1;
	ctlBlkCommitModel: OffenderSentencesHtyCommitBean = new OffenderSentencesHtyCommitBean();
	reasonlov: string;
	clearDisabled: boolean;
	ocdlegloSanHtyModel: OcdlegloSanctionHty = new OcdlegloSanctionHty();
	ocdlegloSanHtyModelTemp: OcdlegloSanctionHty = new OcdlegloSanctionHty();
	recordsSaved: boolean = false;
	myResetVar = true;
	constructor(private ocuadjcrFactory: OcuadjcrService, public translateService: TranslateService,
		public sessionManager: UserSessionManager) {
		this.offSenHtyColumnDef = [];
	}
	ngOnInit() {
		this.clearDisabled = true;
		this.ctlBlkModel  = new OffenderSentencesHty();
		this.ctlBlkModel.adjustDate = DateFormat.getDate();
		this.ctlBlkModel.adjustTime = DateFormat.getDate();
		this.ocuadjcrFactory.getStaffName().subscribe(data => {
			this.ctlBlkModel.staffName = data;
		});
		if (this.dialog.data && this.dialog.data.offenderBookId && this.dialog.data.screenName === 'OSANVIOS') {
			this.offsenhtyModel.offenderBookId = this.dialog.data.offenderBookId;
			this.ocdlegloSenHtyExecuteQuery();
		}else{
			this.offsenhtyModel.offenderBookId = this.dialog.data.offenderBookId;
			this.offsenhtyExecuteQuery();
		}
		this.offSenHtyColumnDef = [
			{ fieldName: 'Date', field: 'adjustDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: 'Time', field: 'adjustTime', editable: false, width: 150, datatype: 'time' },
			{
				fieldName: 'Reason', field: 'adjustReason', editable: false, width: 150, datatype: 'lov',
				domain : 'COUNTER_RSN',
			},
			{ fieldName: 'Modified By', field: 'staffName', editable: false, width: 150, datatype: 'text' },
			{ fieldName: 'Counter', field: 'noOfUnexcusedAbsence', editable: false, width: 150, datatype: 'number' },
			{ fieldName: this.translateService.translate('ocuupsta.comment'), field: 'commentText', editable: false, width: 240},
		];


	}

	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}
	allowNumbers(event) {
	}

	onButClear (){
		this.ctlBlkModel.adjustReason = null;
		this.ctlBlkModel.noOfUnexcusedAbsence = null;
		this.clearDisabled = true;
		this.ctlBlkModel.staffName = '';
		this.ctlBlkModel.commentText = '';
	}
	onButSaveclick() {
		this.ctlBlkModel.offenderBookId = this.dialog.data.offenderBookId;
		this.ctlBlkModel.sentenceSeq = this.dialog.data.sentenceSeq;
		if (!this.ctlBlkModel.adjustDate) {
			this.show(this.translateService.translate('Date must be entered'), 'warn');
			return;
		}
		if (!this.ctlBlkModel.adjustTime) {
			this.show(this.translateService.translate('Time must be entered'), 'warn');
			return;
		}
		if (!this.ctlBlkModel.adjustReason) {
			this.show(this.translateService.translate('Reason must be entered'), 'warn');
			return;
		}
		if (!this.ctlBlkModel.noOfUnexcusedAbsence) {
			this.show(this.translateService.translate('New Counter must be entered'), 'warn');
			return;
		}
		if(this.dialog.data.screenName == 'OSANVIOS'){
			if (DateFormat.compareDate(DateFormat.getDate(this.ocdlegloSanHtyModel.adjustDate),
			DateFormat.getDate()) === -1) {
			this.show(this.translateService.translate('Adjust Date must be gretaer than equal to current date'), 'warn');
			return;

		}
			this.ocdlegloSanHtyModel.offenderBookId = this.dialog.data.offenderBookId;;
			this.ocdlegloSanHtyModel.sentenceSeq = this.dialog.data.sentenceSeq;
			this.ocdlegloSanHtyModel.orderType = this.dialog.data.orderType;
			this.ocdlegloSanHtyModel.adjustReason = this.ctlBlkModel.adjustReason;
			this.ocdlegloSanHtyModel.newCounter = this.ctlBlkModel.noOfUnexcusedAbsence;
			this.ocdlegloSanHtyModel.adjustDate = this.ctlBlkModel.adjustDate;
			this.ocdlegloSanHtyModel.adjustTime = this.ctlBlkModel.adjustTime;
			this.ocdlegloSanHtyModel.commentText = this.ctlBlkModel.commentText;
			this.ocdlegloSanHtyModel.orderType = this.dialog.data.orderType;
			const ctlblkSaveData = this.ocuadjcrFactory.ocdlegloSentCommit(this.ocdlegloSanHtyModel);
			ctlblkSaveData.subscribe(data => {
			if (data === 1) {
				this.recordsSaved = true;
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.myResetVar = false;
				this.ctlBlkModel.adjustReason = null;
				this.ctlBlkModel.noOfUnexcusedAbsence = null;
				this.ctlBlkModel.commentText = undefined;
				setTimeout(() => {
					this.myResetVar = true;
				}, 0);
				this.ocdlegloSenHtyExecuteQuery();
				return;
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.ctlBlkModel.adjustReason = null;
				this.ctlBlkModel.noOfUnexcusedAbsence = null;
				this.ctlBlkModel.commentText = undefined;
				this.ocdlegloSenHtyExecuteQuery();
				return;
			}
		});
		}else{
			const ctlblkSaveData = this.ocuadjcrFactory.ctlBlkCommit(this.ctlBlkModel);
			ctlblkSaveData.subscribe(data => {
			if (data === 1) {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.ctlBlkModel.adjustReason = null;
				this.ctlBlkModel.noOfUnexcusedAbsence = null;
				this.ctlBlkModel.commentText = undefined;
				this.offsenhtyExecuteQuery();
				return;
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.ctlBlkModel.adjustReason = null;
				this.ctlBlkModel.noOfUnexcusedAbsence = null;
				this.ctlBlkModel.commentText = undefined;
				this.offsenhtyExecuteQuery();
				return;
			}
		});
		}
		
	}



	onRowClickoffsenhty(event) {
		if(event){
			this.offSentHistModel = event;
		}
	}
	ok() {
	}
	no() {
	}
	onButExitclick() {
		if(this.dialog.data.screenName === 'OSANVIOS' && this.recordsSaved){
			this.dialog.close(this.ocdlegloSanHtyModelTemp);
		}else{
			this.dialog.close(null);
		}
	}
	onOffenderChange(offender) {
	}
	ocuadjcrSavectlblkForm(event) {
		// TODO declare commit bean and add insert list to that object.
		this.ctlBlkInsertList = event.added;
		this.ctlBlkInsertList = event.updated;
		this.ctlBlkInsertList = event.removed;
		this.ctlBlkCommitModel.insertList = [];
		this.ctlBlkCommitModel.updateList = [];
		this.ctlBlkCommitModel.deleteList = [];
		if (this.ctlBlkInsertList.length > 0) {
			for (let i = 0; i < this.ctlBlkInsertList.length; i++) {
				if (this.ctlBlkModel.adjustDate != undefined ||
					this.ctlBlkModel.adjustDate != null) {
					return;
				}
				if (this.ctlBlkModel.adjustTime != undefined ||
					this.ctlBlkModel.adjustTime != null) {
					return;
				}
				if (this.ctlBlkModel.adjustReason != undefined ||
					this.ctlBlkModel.adjustReason != null) {
					return;
				}
				if (this.ctlBlkModel.noOfUnexcusedAbsence != undefined ||
					this.ctlBlkModel.noOfUnexcusedAbsence != null) {
					return;
				}
			}
			this.ctlBlkCommitModel.insertList = this.ctlBlkInsertList;
			this.ctlBlkCommitModel.updateList = this.ctlBlkUpdateList;
		}
		if (this.ctlBlkDeleteList.length > 0) {
			for (let i = 0; i < this.ctlBlkDeleteList.length; i++) {
				this.ctlBlkCommitModel.deleteList = this.ctlBlkDeleteList;
			}
		}
	}
	offsenhtyExecuteQuery() {
		const offsenhtyResult = this.ocuadjcrFactory.offSenHtyExecuteQuery(this.offsenhtyModel);
		offsenhtyResult.subscribe(data => {
			if (data.length === 0) {
				this.offsenhtyData = [];
			} else {
				this.offsenhtyData = data;
				this.tableIndex = 0;
			}
		});
	}

	onAdjustReason() {
        if (!this.ctlBlkModel.adjustReason) {
            this.ctlBlkModel.adjustReason= this.ctlBlkModel.adjustReason === '' ? undefined : '';
        }
    }


	isInsertable() {
        if (this.ctlBlkModel.adjustReason || this.ctlBlkModel.noOfUnexcusedAbsence) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }

	ocdlegloSenHtyExecuteQuery(){
		const offsenhtyResult = this.ocuadjcrFactory.ocdlegloSenHtyExecuteQuery(this.offsenhtyModel);
		offsenhtyResult.subscribe(data => {
			if (data.length === 0) {
				this.offsenhtyData = [];
				this.ocdlegloSanHtyModelTemp = new OcdlegloSanctionHty();
			} else {
				this.offsenhtyData = data;
				this.ocdlegloSanHtyModelTemp = JSON.parse(JSON.stringify(data[0]));
				this.tableIndex = 0;
			}
		});
	}
}
