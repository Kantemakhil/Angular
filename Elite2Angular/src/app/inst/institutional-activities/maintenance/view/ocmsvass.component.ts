import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmsvassService } from '../service/ocmsvass.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ProgramAssessments } from '../beans/ProgramAssessments';
import { ProgramAssessmentsCommitBean } from '../beans/ProgramAssessmentsCommitBean';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
	selector: 'app-ocmsvass',
	templateUrl: './ocmsvass.component.html'
})

export class OcmsvassComponent implements OnInit {
	@ViewChild('dialog', {static: true}) dialog: DialogComponent;
	@ViewChild('grid') grid: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	prgqstData: ProgramAssessments[] = [];
	prgqstModel: ProgramAssessments = new ProgramAssessments();
	prgqstIndex: Number = 0;
	assessmentCodeTitles = {  'code': this.translateService.translate('common.code'),
	'description': this.translateService.translate('common.description')};
	prgqstInsertList: ProgramAssessments[] = [];
	prgqstUpdatetList: ProgramAssessments[] = [];
	prgqstDeleteList: ProgramAssessments[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: Boolean = true;
	prgQstColumnDef: any[];
	prgQstReadOnly: boolean = false;
	type: string;
	prgqstCommitModel: ProgramAssessmentsCommitBean = new ProgramAssessmentsCommitBean();
	tableIndex: number;
	retrivedisabled: boolean;
	clearDisabled: boolean;
	assessmentCode: any;
	disableField: boolean;
	modulesMap: any;

	constructor(private ocmsvassFactory: OcmsvassService, public translateService: TranslateService,
		public sessionManager: UserSessionManager) {
		this.prgQstColumnDef = [];
	}
	ngOnInit() {
		this.clearDisabled = false;
		this.retrivedisabled = true;
		this.disableField = true;
		this.prgQstColumnDef = [
			{
				fieldName: this.translateService.translate('common.name'), field: 'assessmentCode', editable: true, width: 150,
				datatype: 'lov', link: 'ocmsvass/rgAssessmentsRecordGroup?assesmentCode=' + this.dialog.data.assesmentCode,
				titles: this.assessmentCodeTitles, required: true, cellEditable: this.canCellEdit, source:'OCMNOQUE'
			},
			{
				fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
				datatype: 'checkbox', width: 150
			},
			{
				fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150,
				datatype: 'date'
			},
		];
		const result = this.ocmsvassFactory.rgAssessmentsRecordGroup();
        result.subscribe(data => {
            if (data.length === 0) {
            } else {
              data.forEach(ele => {
                this.modulesMap.set(ele.code, ele.description);
              });
            }
    });
		this.prgqstExecuteQuery();
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
	onLovChange() {
        if (!this.assessmentCode) {
            this.prgqstModel.assessmentCode = this.prgqstModel.assessmentCode === '' ? undefined : '';
        }
    }
	cancel() {
		this.prgqstData = [];
		this.prgqstModel = new ProgramAssessments();
		this.assessmentCode = undefined;
		this.clearDisabled = true;
		this.retrivedisabled = false;
		this.disableField = false;

	}

	validateRowData = (event) => {
		const rowdata = new ValidateRowReturn();
		const rowIndex = event.rowIndex;
		if (event.field === 'activeFlag') {
			if (event.data.activeFlag) {
				this.grid.setColumnData('expiryDate', rowIndex, undefined);
				rowdata.validated = true;
				return rowdata;
			} else if (!event.data.activeFlag) {
				this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
				rowdata.validated = true;
				return rowdata;
			}
		}
		rowdata.validated = true;
		return rowdata;
	}
	prgqstExecuteQuery() {
		if (this.assessmentCode) {
            this.prgqstModel.assessmentCode = this.assessmentCode;
        }
		this.prgqstModel.programId = this.dialog.data.programId;
		const prgqstResult = this.ocmsvassFactory.prgQstExecuteQuery(this.prgqstModel);
		prgqstResult.subscribe(prgqstResultList => {
			if (prgqstResultList.length === 0) {
				this.prgqstData = [];
			} else {
				prgqstResultList.forEach(element => {
					element.activeFlag = element.activeFlag === 'Y' ? true : false;
					element.assesmentCode = this.dialog.data.assesmentCode;
				});
				this.prgqstData = prgqstResultList;
				this.prgqstModel = prgqstResultList[0];
				this.tableIndex = 0;
				this.disableField = true;
				this.retrivedisabled = true;
				this.clearDisabled = false;

			}
		});
	}


	onGridInsert = () => {
		if (!this.prgqstValidations()) {
			return false;
		}
		return {
			activeFlag: true
		};
	}

	prgqstValidations() {
		const is = { valid: true };
		this.prgqstData.forEach(data => {
			if (is.valid) {
				if (!data.assessmentCode) {
					this.show('common.namemustbeentered');
					is.valid = false;
					return;
				}
				for (let i = 0; i < this.prgqstData.length; i++) {
					for (let j = 0; j < this.prgqstData.length; j++) {
						if (i !== j && (this.prgqstData[i].assessmentCode === this.prgqstData[j].assessmentCode)) {
							this.show('ocmsvass.rowalreadyexistswithsameassessmenttype');
							is.valid = false;
							return;
						}
					}
				}
			}
		});
		return is.valid;
	}
	/**
	*  This function will be executed when commit event is
	* fired
	*/
	ocmsvassSaveprgqstForm(event) {
		if (!this.prgqstValidations()) {
			return;
		}
		this.prgqstInsertList = event.added;
		this.prgqstUpdatetList = event.updated;
		this.prgqstDeleteList = event.removed;
		this.prgqstCommitModel.insertList = [];
		this.prgqstCommitModel.updateList = [];
		this.prgqstCommitModel.deleteList = [];
		if (this.prgqstInsertList.length > 0) {
			for (let i = 0; i < this.prgqstInsertList.length; i++) {
				this.prgqstInsertList[i].programId = this.dialog.data.programId;
				this.prgqstInsertList[i].assessmentId = this.prgqstModel.assessmentId;
				this.prgqstInsertList[i].activeFlag = this.prgqstInsertList[i].activeFlag ? 'Y' : 'N';
				this.prgqstCommitModel.insertList = this.prgqstInsertList;
			}
		}
		if (this.prgqstUpdatetList.length > 0) {
			for (let i = 0; i < this.prgqstUpdatetList.length; i++) {
				this.prgqstUpdatetList[i].activeFlag = this.prgqstUpdatetList[i].activeFlag ? 'Y' : 'N';
				this.prgqstCommitModel.updateList = this.prgqstUpdatetList;
			}
		}
		if (this.prgqstDeleteList.length > 0) {
			for (let i = 0; i < this.prgqstDeleteList.length; i++) {
				this.prgqstDeleteList[i].activeFlag = this.prgqstDeleteList[i].activeFlag ? 'Y' : 'N';
				this.prgqstCommitModel.deleteList = this.prgqstDeleteList;
			}

		}
		const prgqstSaveData = this.ocmsvassFactory.prgQstCommit(this.prgqstCommitModel);
		prgqstSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'info';
				this.show('common.addupdateremoverecordsuccess', 'success');
				this.prgqstExecuteQuery();
				return;
			} else {
				this.type = 'warn';
				this.show('common.addupdateremoverecordfailed');
				this.prgqstExecuteQuery();
				return;
			}
		});
	}

	canCellEdit = (data: any, index: number, field: string): boolean => {
		if (field === 'assessmentCode' && data.createDatetime) {
			return false;
		} else {
			return true;
		}

	}
}
