import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { Assessments } from '../../beans/Assessments';
import { VAssOffNeeds } from '../beans/VAssOffNeeds';
import { VAssOffNeedsCommitBean } from '../beans/VAssOffNeedsCommitBean';
import { VAssTreatProts } from '../beans/VAssTreatProts';
import { VAssTreatProtsCommitBean } from '../beans/VAssTreatProtsCommitBean';
import { OimslevlService } from '../service/oimslevl.service';

// import required bean declarations

@Component({
	selector: 'app-oimcsumm',
	templateUrl: './oimcsumm.component.html'
	//styleUrls: ['./oimcsumm.component.css']
})

export class OimcsummComponent implements OnInit {
	@ViewChild('dialog', {static: true}) dialog: DialogComponent;
	@ViewChild('needsgrid', {static: true}) needsgrid: any;
    @ViewChild('treatgrid', {static: true}) treatgrid: any;
	// Variable declaration
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	assessmentsData: Assessments[] = [];
	assessmentsDataTemp: Assessments[] = [];
	// TODO angular.copy(this.assessmentsData, thisassessmentsDataTemp);
	assessmentsModel: Assessments = new Assessments();
	assessmentsIndex: number = 0;
	assessmentsInsertList: Assessments[] = [];
	assessmentsUpdatetList: Assessments[] = [];
	assessmentsDeleteList: Assessments[] = [];
	vassoffneedsData: VAssOffNeeds[] = [];
	vassoffneedsDataTemp: VAssOffNeeds[] = [];
	// TODO angular.copy(this.vassoffneedsData, thisvassoffneedsDataTemp);
	vassoffneedsModel: VAssOffNeeds = new VAssOffNeeds();
	vassoffneedsIndex: number = 0;
	vassoffneedsInsertList: VAssOffNeeds[] = [];
	vassoffneedsUpdatetList: VAssOffNeeds[] = [];
	vassoffneedsDeleteList: VAssOffNeeds[] = [];
	vasstreatprotsData: VAssTreatProts[] = [];
	vasstreatprotsDataTemp: VAssTreatProts[] = [];
	// TODO angular.copy(this.vasstreatprotsData, thisvasstreatprotsDataTemp);
	vasstreatprotsModel: VAssTreatProts = new VAssTreatProts();
	vasstreatprotsIndex: number = 0;
	vasstreatprotsInsertList: VAssTreatProts[] = [];
	vasstreatprotsUpdatetList: VAssTreatProts[] = [];
	vasstreatprotsDeleteList: VAssTreatProts[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	vAssTreatProtsColumnDef: any[];
	assessmentsColumnDef: any[];
	vAssOffNeedsColumnDef: any[];
	assessmentsReadOnly: boolean = false;
	vAssOffNeedsReadOnly: boolean = false;
	vAssTreatProtsReadOnly: boolean = false;
	cg$ctrlReadOnly: boolean = false;
	rgcaseworkRg: any[] = [];
	rgprogramidRg: any[] = [];
	rgcaseplanassRg: any[] = [];
	cgfkNextsectionRg: any[] = [];
	cgfkSectioncodeRg: any[] = [];
	cgfkScoretypeRg: any[] = [];
	rgprgcategoryRg: any[] = [];
	index: any;

	vassoffneedsCommitModel: VAssOffNeedsCommitBean = new VAssOffNeedsCommitBean();
	vasstreatprotsCommitModel: VAssTreatProtsCommitBean = new VAssTreatProtsCommitBean();
	tableIndex: number;
	tableIndexOne: number;
	tableIndexTwo: number;
	needsInert: boolean;
	neeedsDelete: boolean;
	treatmentInsert: boolean;
	treatmentDelete: boolean;

	constructor(public translateService: TranslateService, public sessionManager: UserSessionManager,private oimslevlFactory: OimslevlService) {
		// TODO initilize data members here..!
		this.vAssTreatProtsColumnDef = [];
		this.assessmentsColumnDef = [];
		this.vAssOffNeedsColumnDef = [];
	}
	ngOnInit() {
		this.needsInert = false;
		this.neeedsDelete = false;
		this.treatmentInsert = false;
		this.treatmentDelete = false;
		const link = 'oimslevl/cgfkSectionCodeRecordGroupass?assessmentId=' + this.dialog.data.parentAssessmentId;
		this.assessmentsColumnDef = [
			{ fieldName: this.translateService.translate('oimcsumm.section'), field: 'assessmentCode', editable: true, width: 150, datatype: 'lov', link: link, required: true },
			
		];

		this.vAssOffNeedsColumnDef = [
			{ fieldName: this.translateService.translate('oimcsumm.riskneed'), field: 'assessedNeedCode', editable: true, width: 150, datatype: 'lov', domain:'CASEPLAN_ASS', required: true },
			{ fieldName: this.translateService.translate('oimcsumm.objective'), field: 'objective', editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 240, required: true  },
			{
				fieldName: this.translateService.translate('common.active'), field: 'activeFlag', datatype: 'checkbox',
				 editable: true, width: 150 
			  },
			  {
				fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
				datatype: 'date', width: 150, maxlength: 11
			  },
				
		];

		this.vAssTreatProtsColumnDef = [
			{ fieldName: this.translateService.translate('oimcsumm.caseworksteps'), field: 'caseworkType', editable: true, width: 150, datatype: 'lov', domain:'CASEPLAN_STP', cellEditable: this.canAlertEdit, required: true },
			{ fieldName: this.translateService.translate('oimcsumm.category'), field: 'programCategory', editable: true, width: 150, datatype: 'lov', domain:'PLAN_ACT_PRG', cellEditable: this.canAlertEdit },
			{ fieldName: this.translateService.translate('oimcsumm.program'), field: 'programDesc', editable: true, width: 150, datatype: 'lov', link: 'oimslevl/rgProgramIdRecordGroup?programCategory=', parentField: 'programCategory', cellEditable: this.canAlertEdit},
			{ fieldName: this.translateService.translate('oimcsumm.referral'), field: 'referralFlag', editable: true, width: 150, datatype: 'checkbox' },
			{
				fieldName: this.translateService.translate('oimslevl.min') , field: 'minScore', datatype: 'number',
				maxlength: 5, editable: true, width: 150, required: true,whole: true,
				minValue: '0', maxValue: '9999', strictFP: true,
			  },
			  {
				fieldName: this.translateService.translate('oimslevl.max'), field: 'maxScore', datatype: 'number',
				maxlength: 5, editable: true, width: 150, whole: true,
				minValue: '0', maxValue: '9999', strictFP: true,
			  },
			  {
				fieldName: this.translateService.translate('common.active'), field: 'activeFlag', datatype: 'checkbox',
				 editable: true, width: 150 
			  },
			  {
				fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
				datatype: 'date', width: 150, maxlength: 11
			  },			
		];
		
		this.assessmentExecuteQuery();
		// TODO all initializations here
		var serviceObj;
	}
	canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.treatmentId) {
            return true;
        } else {
            return false;
        }
    }
	Insert = () => { // TODO implement on grid insert 
	} 	
	 validateRowNeeds = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.needsgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.needsgrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
		rowdata.validated = true;
        return rowdata;
	} 
	validateRowTreats = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		if(event.field === 'programCategory'){
			this.treatgrid.setColumnData('programDesc', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
		}
		if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.treatgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.treatgrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }

		if (event.field === 'programDesc') {
			if(event.data.programDesc){
				this.treatgrid.setColumnData('referralFlag', rowIndex,  true);
				rowdata.validated = true;
                return rowdata;
			}
		}
		rowdata.validated = true;
        return rowdata;
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

	
	onButExitclick() {
		this.dialog.close(null);
	  }
	onRowClickassessments(event) {
		if(event){
			this.assessmentsModel = event;
			if(this.assessmentsModel.assessmentId){
				this.needsInert = true;
				this.oimcsummexecuteQuery();
			} else {
				this.vassoffneedsData = [];
				this.needsInert = false;
				
			}
		}
	}
	onRowClickvassoffneeds(event) {
		if(event){
			this.vassoffneedsModel = event;
				
			if(this.vassoffneedsModel.offAssNeedId){
				this.vasstreatprotsExecuteQuery();
				this.neeedsDelete = true;
				this.treatmentInsert = true;
			} else {
				this.vasstreatprotsData=[];
				this.neeedsDelete = false;
				this.treatmentInsert = false;
			}
			
		}
	}
	onRowClickvasstreatprots(event) {
		if(event){
			this.vasstreatprotsModel = event;
			if(this.vasstreatprotsModel.treatmentId){
				this.treatmentDelete = true;
			} else {
				this.treatmentDelete = false;
			}
		}
	}
	allowNumbers(event) {
	}
	ok() {
	}
	no() {
	}
	cancel() {
	}
	onOffenderChange(offender) {
	}
	/**
	* This function loads the data into the Master Record and its child records
	*/
	oimcsummPopulateDetails() {
		this.assessmentsModel = this.assessmentsData[this.index];
		const serviceObj = this.oimslevlFactory.vAssOffNeedsExecuteQuery(this.assessmentsModel);
		serviceObj.subscribe(data => {
			if (data != undefined && data.errorMessage.length > 0) {
			} else {
				this.vassoffneedsData = data;
			}
		});
	}

	//execute query
	assessmentExecuteQuery() {
		if(this.dialog.data.parentAssessmentId){
			this.assessmentsModel.assessmentId = this.dialog.data.parentAssessmentId;
		}	
		const serviceObj = this.oimslevlFactory.assessmentsExecuteQuery(this.assessmentsModel);
		serviceObj.subscribe(data => {
			if (data.length == 0) {
				this.assessmentsData = [];
				this.vassoffneedsData = [];
				this.vasstreatprotsData = [];
			}else {
				this.assessmentsData = data;
				this.assessmentsModel = this.assessmentsData[0];
				this.tableIndex = 0;
				//this.populateDetails();
			}
		});
		// } else {
		// }
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	oimcsummSavevassoffneedsForm(event) {
		if (!this.needsValidations()) {
            return;
        }
		// TODO declare commit bean and add insert list to that object.
		this.vassoffneedsInsertList = event.added;
		this.vassoffneedsUpdatetList = event.updated;
		this.vassoffneedsDeleteList = event.removed;
		this.vassoffneedsCommitModel.insertList = [];
		this.vassoffneedsCommitModel.updateList = [];
		this.vassoffneedsCommitModel.deleteList = [];
		if (this.vassoffneedsInsertList.length > 0 || this.vassoffneedsUpdatetList.length > 0) {
			for (let i = 0; i < this.vassoffneedsInsertList.length; i++) {
				this.vassoffneedsInsertList[i].assessmentId = this.assessmentsModel.assessmentId;
                this.vassoffneedsInsertList[i].activeFlag = this.vassoffneedsInsertList[i].activeFlag ? 'Y' : 'N';
				this.vassoffneedsCommitModel.insertList = this.vassoffneedsInsertList;
			}
			for (let i = 0; i < this.vassoffneedsUpdatetList.length; i++) {
				this.vassoffneedsUpdatetList[i].activeFlag = this.vassoffneedsUpdatetList[i].activeFlag ? 'Y' : 'N';
				this.vassoffneedsCommitModel.updateList = this.vassoffneedsUpdatetList;
			}
		}
		if (this.vassoffneedsDeleteList.length > 0) {
			for (let i = 0; i < this.vassoffneedsDeleteList.length; i++) {
				this.vassoffneedsCommitModel.deleteList = this.vassoffneedsDeleteList;
			}
		}
		const vassoffneedsSaveData = this.oimslevlFactory.vAssOffNeedsCommit(this.vassoffneedsCommitModel);
		vassoffneedsSaveData.subscribe(data => {
			if (data === 1) {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
			   this.oimcsummexecuteQuery();
				return;
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
			    this.oimcsummexecuteQuery();
				return;
			}
		});
	}
	//execute query
	oimcsummexecuteQuery() {
		if(this.assessmentsModel.assessmentId){
			this.vassoffneedsModel.assessmentId = this.assessmentsModel.assessmentId;
		}
		const serviceObj = this.oimslevlFactory.vAssOffNeedsExecuteQuery(this.vassoffneedsModel);
		serviceObj.subscribe(data => {
			if (data.length == 0) {
				this.vassoffneedsData = [];
				this.vasstreatprotsData = [];
				this.treatmentInsert = false;
			}  else {
				data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
				this.vassoffneedsData = data;
				this.vassoffneedsModel = this.vassoffneedsData[0];
				this.tableIndexOne = 0;
			}
		});

	}


	needsValidations() {
        const is = { valid: true };
        if (this.vassoffneedsData && this.vassoffneedsData) {
            this.vassoffneedsData.forEach(element => {
                if (!element.assessedNeedCode) {
                    this.show(this.translateService.translate('oimcsumm.needmandatory'), 'warn');
                    is.valid = false;
					return is.valid;
                }

				if (!element.objective) {
                    this.show(this.translateService.translate('oimcsumm.objectivemandatory'), 'warn');
                    is.valid = false;
					return is.valid;
                }
            });
        }
        return is.valid;
    }

	onGridInsertNeeds = () => {
        // if (!this.needsValidations()) {
        //     return;
        // }
        return { activeFlag: true };
    }

	treatmentValidations() {
        const is = { valid: true };
        if (this.vasstreatprotsData && this.vasstreatprotsData) {
            this.vasstreatprotsData.forEach(element => {
                if (!element.caseworkType) {
                    this.show(this.translateService.translate('oimcsumm.caseworkmandatory'), 'warn');
                    is.valid = false;
					return is.valid;
                }

				if (!element.minScore) {
                    this.show(this.translateService.translate('oimcsumm.minscoremandatory'), 'warn');
                    is.valid = false;
					return is.valid;
                }

				if ((!element.programDesc && element.programCategory) || (element.programDesc && !element.programCategory)) {
                    this.show(this.translateService.translate('oimcsumm.entereitherprogramornone'), 'warn');
                    is.valid = false;
					return is.valid;
                }

				if( element.minScore && element.maxScore && (Number(element.minScore) > Number(element.maxScore))){
					this.show(this.translateService.translate('oimcsumm.minscorevalidation'), 'warn');
                    is.valid = false;
					return is.valid;
				}

            });
        }
        return is.valid;
    }
	onGridInsertTreat = () => {
        // if (!this.treatmentValidations()) {
        //     return;
        // }
        return { activeFlag: true };
    }

	/*
	* This function converts the given date from MM/dd/yyyy to
	* yyyy/MM/dd format, If input data is not as expected
	* format then it will return input value
	*/
	oimcsummdateFormat(dateValue) {
		if (dateValue != undefined && dateValue.length > 0) {
			let newdate = dateValue.split('/');
			return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
		} else {
			return dateValue;
		}
	}
	vasstreatprotsExecuteQuery() {
		this.vasstreatprotsModel.offAssNeedId = this.vassoffneedsModel.offAssNeedId;
		const vasstreatprotsResult = this.oimslevlFactory.vAssTreatProtsExecuteQuery(this.vasstreatprotsModel);
		vasstreatprotsResult.subscribe(vasstreatprotsResultList => {
			if (vasstreatprotsResultList.length === 0) {
				this.vasstreatprotsData = [];
			} else {
				vasstreatprotsResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
					element.referralFlag = element.referralFlag === 'Y' ? true : false;
                });
				this.vasstreatprotsData = vasstreatprotsResultList;
				this.vasstreatprotsModel = vasstreatprotsResultList[0];
				this.tableIndexTwo = 0;
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	oimcsummSavevasstreatprotsForm(event) {
		if (!this.treatmentValidations()) {
            return;
        }
		// TODO declare commit bean and add insert list to that object.
		this.vasstreatprotsInsertList = event.added;
		this.vasstreatprotsUpdatetList = event.updated;
		this.vasstreatprotsDeleteList = event.removed;
		this.vasstreatprotsCommitModel.insertList = [];
		this.vasstreatprotsCommitModel.updateList = [];
		this.vasstreatprotsCommitModel.deleteList = [];
		if (this.vasstreatprotsInsertList.length > 0 || this.vasstreatprotsUpdatetList.length > 0) {
			for (let i = 0; i < this.vasstreatprotsInsertList.length; i++) {
				this.vasstreatprotsInsertList[i].offAssNeedId = this.vassoffneedsModel.offAssNeedId;
                this.vasstreatprotsInsertList[i].activeFlag = this.vasstreatprotsInsertList[i].activeFlag ? 'Y' : 'N';
				this.vasstreatprotsInsertList[i].referralFlag = this.vasstreatprotsInsertList[i].referralFlag ? 'Y' : 'N';
				this.vasstreatprotsInsertList[i].programId = Number(this.vasstreatprotsInsertList[i].programDesc);
				this.vasstreatprotsCommitModel.insertList = this.vasstreatprotsInsertList;
			}
			for (let i = 0; i < this.vasstreatprotsUpdatetList.length; i++) {
				this.vasstreatprotsUpdatetList[i].activeFlag = this.vasstreatprotsUpdatetList[i].activeFlag ? 'Y' : 'N';
				this.vasstreatprotsUpdatetList[i].referralFlag = this.vasstreatprotsUpdatetList[i].referralFlag ? 'Y' : 'N';
				this.vasstreatprotsCommitModel.updateList = this.vasstreatprotsUpdatetList;
			}

		}
		if (this.vasstreatprotsDeleteList.length > 0) {
			for (let i = 0; i < this.vasstreatprotsDeleteList.length; i++) {
				this.vasstreatprotsCommitModel.deleteList = this.vasstreatprotsDeleteList;
			}
		}
		const vasstreatprotsSaveData = this.oimslevlFactory.vAssTreatProtsCommit(this.vasstreatprotsCommitModel);
		vasstreatprotsSaveData.subscribe(data => {
			if (data === 1) {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.vasstreatprotsExecuteQuery();
				return;
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.vasstreatprotsExecuteQuery();
				return;
			}
		});
	}

	onGridNeedClear = () => {
		this.oimcsummexecuteQuery();
        return true;
      }
	  onGridTreatmentClear = () => {
		this.vasstreatprotsExecuteQuery();
        return true;
      }
	
	  
	  needsDelete = () => {
        if (this.vasstreatprotsData.length > 0) {
            this.show('common.cannotdeletemaster', 'warn');
            return false;
        }
        return true;
    }
}


