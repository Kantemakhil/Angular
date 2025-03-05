import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmcprevService } from '../service/ocmcprev.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseReviewPeriodsCommitBean } from '../beans/CaseReviewPeriodsCommitBean';
import { CaseReviewPeriods } from '../beans/CaseReviewPeriods';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
	selector: 'app-ocmcprev',
	templateUrl: './ocmcprev.component.html'
})

export class OcmcprevComponent implements OnInit {
	// Variable declaration
	@ViewChild('gridOne', { static: true }) gridOne: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	casereviewperiodsData: CaseReviewPeriods[] = [];
	casereviewperiodsDataTemp: CaseReviewPeriods[] = [];
	// TODO angular.copy(this.casereviewperiodsData, thiscasereviewperiodsDataTemp);
	casereviewperiodsModel: CaseReviewPeriods = new CaseReviewPeriods();
	casereviewperiodsIndex: number = 0;
	casereviewperiodsInsertList: CaseReviewPeriods[] = [];
	casereviewperiodsUpdatetList: CaseReviewPeriods[] = [];
	casereviewperiodsDeleteList: CaseReviewPeriods[] = [];
	casereviewperiodsCommitModel: CaseReviewPeriodsCommitBean = new CaseReviewPeriodsCommitBean();
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	caseReviewPeriodsColumnDef: any[];
	caseReviewPeriodsReadOnly: boolean = false;
	rgsuplevelRg: any[] = [];
	tableIndex = -1;
	alertDelete: boolean;
	supervisionlevelTitle = { description: this.translateService.translate('common.description'), code: this.translateService.translate('ocmcprev.supervisionlevel') };
	constructor(private ocmcprevFactory: OcmcprevService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.caseReviewPeriodsColumnDef = [];
	}
	ngOnInit() {
		this.caseReviewPeriodsColumnDef = [
			{ fieldName: this.translateService.translate('ocmcprev.supervisionlevel') + '*', field: 'supervisionLevel', editable: true, width: 150, domain: 'SUP_LVL_TYPE', datatype: 'lov', maxlength: 40, titles: this.supervisionlevelTitle },
			{ fieldName: this.translateService.translate('ocmcprev.numdaysbeforenextreview') + '*', field: 'reviewPeriod', editable: true, width: 150, datatype: 'number', maxlength: 4, maxValue: '999', minValue: "0", whole: true },
		];
		// TODO all initializations here
		var serviceObj;
		this.alertDelete = true;
		this.casereviewperiodsExecuteQuery();
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
	onRowClickcasereviewperiods(event) {
		this.casereviewperiodsModel = event;
		if (event && event.createDatetime && event.createDatetime) {
			this.alertDelete = true;
		} else {
			this.alertDelete = false;
		}
	}
	casereviewperiodsExecuteQuery() {
		this.casereviewperiodsModel = new CaseReviewPeriods();
		const casereviewperiodsResult = this.ocmcprevFactory.caseReviewPeriodsExecuteQuery(this.casereviewperiodsModel);
		casereviewperiodsResult.subscribe(casereviewperiodsResultList => {
			if (casereviewperiodsResultList.length === 0) {
				this.casereviewperiodsData = [];
				this.show(this.translateService.translate('common.querycaused'), 'warn');
				return false;
			} else {
				this.casereviewperiodsData = casereviewperiodsResultList;
				this.casereviewperiodsModel = casereviewperiodsResultList[0];
				this.tableIndex = 0;
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	ocmcprevSavecasereviewperiodsForm(event) {
		// TODO declare commit bean and add insert list to that object.
		if (!this.onSaveValid()) {
			return;
		}
		this.casereviewperiodsInsertList = event.added;
		this.casereviewperiodsUpdatetList = event.updated;
		this.casereviewperiodsDeleteList = event.removed;
		this.casereviewperiodsCommitModel.insertList = [];
		this.casereviewperiodsCommitModel.updateList = [];
		this.casereviewperiodsCommitModel.deleteList = [];
		if (this.casereviewperiodsInsertList.length > 0) {
			this.casereviewperiodsCommitModel.insertList = this.casereviewperiodsInsertList;
		}
		if (this.casereviewperiodsUpdatetList.length > 0) {
			this.casereviewperiodsUpdatetList.forEach(element => {
				if (element) {
					element.modifyUserId = this.sessionManager.getId();
					element.modifyDatetime = DateFormat.getDate();
				}
			});
			this.casereviewperiodsCommitModel.updateList = this.casereviewperiodsUpdatetList;
		}
		if (this.casereviewperiodsDeleteList.length > 0) {
			this.casereviewperiodsCommitModel.deleteList = this.casereviewperiodsDeleteList;
		}
		const casereviewperiodsSaveData = this.ocmcprevFactory.caseReviewPeriodsCommit(this.casereviewperiodsCommitModel);
		casereviewperiodsSaveData.subscribe(data => {
			if (data && data[0].errorMessage) {
				this.show(this.translateService.translate('oumhocodau.primarykeyval'), 'warn');
				this.casereviewperiodsExecuteQuery();
				return;
			}
			if (data && data[0] && data[0].returnValue === 1) {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.casereviewperiodsExecuteQuery();
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.casereviewperiodsExecuteQuery();
			}
		});
	}

	onSaveValid() {
		const isValidate = { valid: true };
		if (this.casereviewperiodsData.length > 0) {
			this.casereviewperiodsData.forEach(element => {
				if (element && !element.supervisionLevel || !element.reviewPeriod) {
					if (!element.supervisionLevel) {
						this.show(this.translateService.translate('ocmcprev.supervisionlevelvalmsg'), 'warn');
						isValidate.valid = false;
						return;
					} else if (!element.reviewPeriod && element.reviewPeriod !== 0) {
						this.show(this.translateService.translate('ocmcprev.numdaysbeforenextreviewmsg'), 'warn');
						isValidate.valid = false;
						return;
					}
				}
			});
		}
		return isValidate.valid;
	}
	onGridInsert = () => {
		if (this.onSaveValid()) {
			return {
				modifyUserId: this.sessionManager.getId(),
				modifyDatetime: DateFormat.getDate(),
			};
		} else {
			return null;
		}

	}
	onGridClear = () => {
		this.casereviewperiodsExecuteQuery();
		return true;
	}
}
