import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimoicoiService } from '@inst/incidents-oic/maintenance/service/oimoicoi.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OicOffences } from '@inst/incidents-oic/beans/OicOffences';
import { OicOffenceIndicators } from '@inst/incidents-oic/maintenance/beans/OicOffenceIndicators';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { OicOffenceIndicatorsCommitBean } from '@inst/incidents-oic/maintenance/beans/OicOffenceIndicatorsCommitBean';
import { OicOffencesCommitBean } from '@inst/incidents-oic/maintenance/beans/OicOffencesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

// import required bean declarations

@Component({
	selector: 'app-oimoicoi',
	templateUrl: './oimoicoi.component.html'

})

export class OimoicoiComponent implements OnInit {
	@ViewChild('grid', { static: true }) grid: any;
	// Variable declaration
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	oicofnData: OicOffences[] = [];
	oicofnDataTemp: OicOffences[] = [];
	// TODO angular.copy(this.oicofnData, thisoicofnDataTemp);
	oicofnModel: OicOffences = new OicOffences();
	oicofnIndex: number = 0;
	oicofnInsertList: OicOffences[] = [];
	oicofnUpdatetList: OicOffences[] = [];
	oicofnDeleteList: OicOffences[] = [];
	oicoffenceindicatorsData =[];
	oicoffenceindicatorsDataTemp: OicOffenceIndicators[] = [];
	// TODO angular.copy(this.oicoffenceindicatorsData, thisoicoffenceindicatorsDataTemp);
	oicoffenceindicatorsModel: OicOffenceIndicators = new OicOffenceIndicators();
	oicoffenceindicatorsIndex: number = 0;
	oicoffenceindicatorsInsertList: OicOffenceIndicators[] = [];
	oicoffenceindicatorsUpdatetList: OicOffenceIndicators[] = [];
	oicoffenceindicatorsDeleteList: OicOffenceIndicators[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	oicOfnColumnDef: any[];
	oicOffenceIndicatorsColumnDef: any[];
	oicOfnReadOnly: boolean = false;
	oicOffenceIndicatorsReadOnly: boolean = false;
	rgoicoffencecategRg: any[] = [];
	rgoicoffencetypeRg: any[] = [];
	rgoicoffenceindicatorsRg: any[] = [];
	oicoffenceindicatorsCommitModel: OicOffenceIndicatorsCommitBean = new OicOffenceIndicatorsCommitBean();
	oicofnCommitModel: OicOffencesCommitBean = new OicOffencesCommitBean();
	index: any;
	tableIndex: number;
	tableIndexOne: number;
	enableindicatorsDelete: boolean;
	enbleIndicatorsInsert: boolean;
	constructor(private oimoicoiFactory: OimoicoiService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.oicOfnColumnDef = [];
		this.oicOffenceIndicatorsColumnDef = [];
	}
	ngOnInit() {
		this.enableindicatorsDelete = false;
		this.enbleIndicatorsInsert = false;
		this.oicOfnColumnDef = [
			{
				fieldName: this.translateService.translate('oimoicoi.charge'), field: 'oicOffenceCode', cellEditable: this.canAlertEdit,
				editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 12, required: true
			},
			{
				fieldName: this.translateService.translate('oimoicoi.offensedescription'), field: 'description', required: true,
				editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 240
			},
			{ fieldName: this.translateService.translate('common.startdate'), field: 'startDate', editable: true, width: 150, required: true, datatype: 'date' },
			{ fieldName: this.translateService.translate('common.enddate'), field: 'endDate', editable: true, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('common.type'), field: 'oicOffenceType', editable: true, width: 150, datatype: 'lov', domain: 'OIC_OFN_TYPE' },
			{ fieldName: this.translateService.translate('common.category'), field: 'oicOffenceCategory', editable: true, width: 150, datatype: 'lov', domain: 'OIC_OFN_CAT' },
			{
				fieldName: this.translateService.translate('oimoicoi.maxmonths'), field: 'maxPenaltyMonths', editable: true, width: 150, datatype: 'number',
				maxValue: '999', minValue: '0', whole: true
			},
			{ fieldName: this.translateService.translate('oimoicoi.maxmdays'), field: 'maxPenaltyDays', editable: true, width: 150, datatype: 'number', maxValue: '999', minValue: '0', whole: true },
			{
				fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true, width: 150, datatype: 'number',
				maxValue: '999', minValue: '0', whole: true, required: true
			},
			{ fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },

			{ fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150, datatype: 'date' },


		];
		this.oicOffenceIndicatorsColumnDef = [
			{ fieldName: this.translateService.translate('oimoicoi.indicators'), field: 'indicatorCode', editable: true, width: 150, 
			  datatype: 'lov', domain: 'OFFENCE_IND',  titles: {
				  description: this.translateService.translate('common.description'),
				  code: this.translateService.translate('oimoicoi.indicatorcode')
			}, required: true
			
		 }
		];
		this.oimoicoiexecuteQuery();
	}

	onGridClear = () => {
		this.oimoicoiexecuteQuery();
		return true;
	}
	canAlertEdit = (data: any, index: number, field: string): boolean => {
		if (!data.oicOffenceId) {
			return true;
		} else {
			return false;
		}
	}
	Insert = () => { // TODO implement on grid insert 
	}
	validateRowData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
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
		if (event.field === 'startDate') {
			if (event.data.startDate && event.data.endDate) {
				if (DateFormat.compareDateTime(DateFormat.getDate(event.data.startDate)
					, DateFormat.getDate(event.data.endDate)) === 1) {
					this.show(this.translateService.translate('oimoicoi.startdatecannotbelaterthanenddate'), 'warn');
					rowdata.validated = true;
					return rowdata;
				}
			}
			if (event.data.startDate) {
				this.oicOfnCheckoverLapping(event.data);
				rowdata.validated = true;
				return rowdata;
			}

			rowdata.validated = true;
			return rowdata;

		}

		if (event.field === 'endDate') {
			if (event.data.startDate && event.data.endDate) {
				if (DateFormat.compareDateTime(DateFormat.getDate(event.data.startDate)
					, DateFormat.getDate(event.data.endDate)) === 1) {
					this.show(this.translateService.translate('oimoicoi.startdatecannotbelaterthanenddate'), 'warn');
					rowdata.validated = true;
					return rowdata;
				}
			}
			rowdata.validated = true;
			return rowdata;

		}

		rowdata.validated = true;
		return rowdata;
	} 	 /** 
	  * This function displays the messages
	  */
	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}
	onRowClickoicofn(event) {
		if (event) {
			this.oicofnModel = event;
			if (this.oicofnModel.oicOffenceId) {
				this.oicoffenceindicatorsExecuteQuery();
				this.enbleIndicatorsInsert = true;
			} else {
				this.oicoffenceindicatorsData = [];
				this.enbleIndicatorsInsert = false;
			}
		}
	}
	onRowClickoicoffenceindicators(event) {
		if (event) {
			this.oicoffenceindicatorsModel = event;
			if (this.oicoffenceindicatorsModel.createDatetime) {
				this.enableindicatorsDelete = true;
			} else {
				this.enableindicatorsDelete = false;
			}
		}

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
	oicOfnCheckoverLapping(object) {
		const serviceObj = this.oimoicoiFactory.oicOfnCheckoverLapping(object);
		serviceObj.subscribe(data => {
			if (data) {
				if (data && data.pStartDate && data.pEndDate) {
					if (DateFormat.compareDateTime(DateFormat.getDate(this.oicofnModel.startDate)
						, DateFormat.getDate(data.pStartDate)) === 1) {
						this.show(this.translateService.translate('Error: Start date must be later than the existing period for similar offence. ' ||
							'Offence start date: ' + data.showStartDate + ' and end date: ' + data.showEndDate + ' not specified'), 'warn');
						return;

					} else {
						this.show(this.translateService.translate('Error: Period overlaps with an existing period for similar offence. Offence start date: ' + data.showStartDate +
							' and end date: ' + data.showEndDate + ' not specified.'), 'warn');
						return;

					}

				}

			}
		})
	}


	/* async oicOfnCheckoverLappingOne(object){
		return await this.oicOfnCheckoverLappingOne(object);
	}  */

	 async oicOfnCheckoverLappingOne(object) {
		const isvalid = { valid: true };
		const serviceObj = this.oimoicoiFactory.oicOfnCheckoverLapping(object);
		await serviceObj.toPromise().then(data => {
			if (data) {
				if (data && data.pStartDate && data.pEndDate) {
					if (DateFormat.compareDateTime(DateFormat.getDate(this.oicofnModel.startDate)
						, DateFormat.getDate(data.pStartDate)) === 1) {
						this.show(this.translateService.translate('Error: Start date must be later than the existing period for similar offence. ' ||
							'Offence start date: ' + data.showStartDate + ' and end date: ' + data.showEndDate + ' not specified'), 'warn');
						isvalid.valid = false;

					} else {
						this.show(this.translateService.translate('Error: Period overlaps with an existing period for similar offence. Offence start date: ' + data.showStartDate +
							' and end date: ' + data.showEndDate + ' not specified.'), 'warn');
						isvalid.valid = false;

					}

				}

			}

		});
		
		return isvalid.valid;
	}

	oimoicoiValidations = () => {
		const is = { valid: true };
		if (this.oicofnData && this.oicofnData) {
			this.oicofnData.forEach(element => {
				if (!element.oicOffenceCode) {
					this.show(this.translateService.translate('oimoicoi.chargemust'), 'warn');
					is.valid = false;
					return is.valid;
				}

				if (!element.description) {
					this.show(this.translateService.translate('oimoicoi.offensedescriptionmust'), 'warn');
					is.valid = false;
					return is.valid;
				}

				if (!element.startDate) {
					this.show(this.translateService.translate('common.startdatemustbeentered'), 'warn');
					is.valid = false;
					return is.valid;
				}

				if (!element.listSeq) {
					this.show(this.translateService.translate('oimoicoi.seqmust'), 'warn');
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
	 async oimoicoiSaveoicofnForm(event) {
		if (!this.oimoicoiValidations()) {
			return;
		}

		// TODO declare commit bean and add insert list to that object.
		this.oicofnInsertList = event.added;
		this.oicofnUpdatetList = event.updated;
		this.oicofnDeleteList = event.removed;
		this.oicofnCommitModel.insertList = [];
		this.oicofnCommitModel.updateList = [];
		this.oicofnCommitModel.deleteList = [];
		if (this.oicofnInsertList.length > 0 || this.oicofnUpdatetList.length > 0) {
			for (let i = 0; i < this.oicofnInsertList.length; i++) {

				if (this.oicofnInsertList[i].startDate && this.oicofnInsertList[i].endDate) {
					if (DateFormat.compareDateTime(DateFormat.getDate(this.oicofnInsertList[i].startDate)
						, DateFormat.getDate(this.oicofnInsertList[i].endDate)) === 1) {
						this.show(this.translateService.translate('oimoicoi.startdatecannotbelaterthanenddate'), 'warn');
						return;
					}
				}
				if (! await this.oicOfnCheckoverLappingOne(this.oicofnInsertList[i])) {
           			 return;
        		}
				
				this.oicofnInsertList[i].activeFlag = this.oicofnInsertList[i].activeFlag ? 'Y' : 'N';
				this.oicofnCommitModel.insertList = this.oicofnInsertList;
			}
			for (let i = 0; i < this.oicofnUpdatetList.length; i++) {
				if (this.oicofnUpdatetList[i].startDate && this.oicofnUpdatetList[i].endDate) {
					if (DateFormat.compareDateTime(DateFormat.getDate(this.oicofnUpdatetList[i].startDate)
						, DateFormat.getDate(this.oicofnUpdatetList[i].endDate)) === 1) {
						this.show(this.translateService.translate('oimoicoi.startdatecannotbelaterthanenddate'), 'warn');
						return;
					}
				}
				if (! await this.oicOfnCheckoverLappingOne(this.oicofnUpdatetList[i])) {
           			 return;
        		}
				this.oicofnUpdatetList[i].activeFlag = this.oicofnUpdatetList[i].activeFlag ? 'Y' : 'N';
				this.oicofnCommitModel.updateList = this.oicofnUpdatetList;
			}
		}
		if (this.oicofnDeleteList.length > 0) {
			for (let i = 0; i < this.oicofnDeleteList.length; i++) {
				this.oicofnCommitModel.deleteList = this.oicofnDeleteList;
			}
		}
		const oicofnSaveData = this.oimoicoiFactory.oicOfnCommit(this.oicofnCommitModel);
		oicofnSaveData.subscribe(data => {
			if (data[0] && data[0].listSeq === 2) {
				this.show(this.translateService.translate('oimoicoi.thisoffencecodealreadyexistswithnoenddateentered'), 'warn');
				//this.oimoicoiexecuteQuery();
				return;
			}
			if (String(data[0].errorMessage).indexOf('OIC_OFFENCES_UK1') > 0) {
				this.show(this.translateService.translate('oimoicoi.thisoffencecodealreadyexistswithsimilarstartdate'), 'warn');
				this.oimoicoiexecuteQuery();
				return;
			}

			if (data[0] && data[0].listSeq === 1) {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.oimoicoiexecuteQuery();
				return;
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.oimoicoiexecuteQuery();
				return;
			}
		});
	}
	//execute query
	oimoicoiexecuteQuery() {
		const serviceObj = this.oimoicoiFactory.oicOfnExecuteQuery(this.oicofnModel);
		serviceObj.subscribe(data => {
			if (data.length == 0) {
				this.oicofnData = [];
				this.show('common.querycaused');
			} else {
				data.forEach(element => {
					element.activeFlag = element.activeFlag === 'Y' ? true : false;
				});
				this.oicofnData = data;
				this.oicofnModel = this.oicofnData[0];
				this.tableIndex = 0;
			}
		});
	}

	/*
	* This function converts the given date from MM/dd/yyyy to
	* yyyy/MM/dd format, If input data is not as expected
	* format then it will return input value
	*/
	oimoicoidateFormat(dateValue) {
		if (dateValue != undefined && dateValue.length > 0) {
			let newdate = dateValue.split('/');
			return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
		} else {
			return dateValue;
		}
	}
	oicoffenceindicatorsExecuteQuery() {
		this.oicoffenceindicatorsModel = new OicOffenceIndicators();
		this.oicoffenceindicatorsModel.oicOffenceId = this.oicofnModel.oicOffenceId;
		const oicoffenceindicatorsResult = this.oimoicoiFactory.oicOffenceIndicatorsExecuteQuery(this.oicoffenceindicatorsModel);
		this.oicoffenceindicatorsData = [];
		oicoffenceindicatorsResult.subscribe(oicoffenceindicatorsResultList => {
			if (oicoffenceindicatorsResultList.length !== 0) {
				let oicoffenceindicatorsData = [];
				oicoffenceindicatorsResultList.forEach(element => {
					if(element.indicatorCode){
					oicoffenceindicatorsData.push(element);
				}
			});
			this.oicoffenceindicatorsData = oicoffenceindicatorsData;
			// this.oicoffenceindicatorsModel = oicoffenceindicatorsResultList[0];
			this.tableIndexOne = 0;
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	oimoicoiSaveoicoffenceindicatorsForm(event) {
		// TODO declare commit bean and add insert list to that object.
		this.oicoffenceindicatorsInsertList = event.added;
		this.oicoffenceindicatorsUpdatetList = event.updated;
		this.oicoffenceindicatorsDeleteList = event.removed;
		this.oicoffenceindicatorsCommitModel.insertList = [];
		this.oicoffenceindicatorsCommitModel.updateList = [];
		this.oicoffenceindicatorsCommitModel.deleteList = [];
		if (this.oicoffenceindicatorsInsertList.length > 0 || this.oicoffenceindicatorsUpdatetList.length > 0) {
			for (let i = 0; i < this.oicoffenceindicatorsInsertList.length; i++) {
				
				if(!this.oicoffenceindicatorsInsertList[i].indicatorCode){
					this.show(this.translateService.translate('oimoicoi.indicatorsmmust'), 'warn');
						return;
				}
				this.oicoffenceindicatorsInsertList[i].oicOffenceId = this.oicofnModel.oicOffenceId;
				this.oicoffenceindicatorsCommitModel.insertList = this.oicoffenceindicatorsInsertList;
			}
			for (let i = 0; i < this.oicoffenceindicatorsUpdatetList.length; i++) {
				if(!this.oicoffenceindicatorsUpdatetList[i].indicatorCode){
					this.show(this.translateService.translate('oimoicoi.indicatorsmmust'), 'warn');
						return;
				}
				this.oicoffenceindicatorsUpdatetList[i].oicOffenceId = this.oicofnModel.oicOffenceId;
				this.oicoffenceindicatorsCommitModel.updateList = this.oicoffenceindicatorsUpdatetList;
			}
		}
		if (this.oicoffenceindicatorsDeleteList.length > 0) {
			for (let i = 0; i < this.oicoffenceindicatorsDeleteList.length; i++) {
			}
			this.oicoffenceindicatorsCommitModel.deleteList = this.oicoffenceindicatorsDeleteList;
		}
		const oicoffenceindicatorsSaveData = this.oimoicoiFactory.oicOffenceIndicatorsCommit(this.oicoffenceindicatorsCommitModel);
		oicoffenceindicatorsSaveData.subscribe(data => {
			if (data == 1) {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.oicoffenceindicatorsExecuteQuery();
				return;
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.oicoffenceindicatorsExecuteQuery();
				return;
			}
		});

	}


	oicOffenceInsert = () => {

		return { listSeq: 1, activeFlag: true };
	}

	oicOffencDelete = () => {
		if (this.oicoffenceindicatorsData.length > 0) {
			this.show('common.cannotdeletemaster', 'warn');
			return false;
		}
		return true;
	}
}
