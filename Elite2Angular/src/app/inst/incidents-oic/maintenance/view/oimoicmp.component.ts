import {
	Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimoicmpService } from '@inst/incidents-oic/maintenance/service/oimoicmp.service';
import { UserSessionManager } from '@core/classes/userSessionManager';

import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OicSanctionLimits } from '@inst/incidents-oic/maintenance/beans/OicSanctionLimits';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { OicSanctionLimitsCommitBean } from '@inst/incidents-oic/maintenance/beans/OicSanctionLimitsCommitBean';
// import required bean declarations

@Component({
	selector: 'app-oimoicmp',
	templateUrl: './oimoicmp.component.html'
})

export class OimoicmpComponent implements OnInit {
	// Variable declaration
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	oicslData: OicSanctionLimits[] = [];
	oicslDataTemp: OicSanctionLimits[] = [];
	// TODO angular.copy(this.oicslData, thisoicslDataTemp);
	oicslModel: OicSanctionLimits = new OicSanctionLimits();
	oicslIndex: number = 0;
	oicslInsertList: OicSanctionLimits[] = [];
	oicslUpdatetList: OicSanctionLimits[] = [];
	oicslDeleteList: OicSanctionLimits[] = [];
	syspflData: SystemProfiles[] = [];
	syspflDataTemp: SystemProfiles[] = [];
	// TODO angular.copy(this.syspflData, thissyspflDataTemp);
	syspflModel: SystemProfiles = new SystemProfiles();
	syspflIndex: number = 0;
	syspflInsertList: SystemProfiles[] = [];
	syspflUpdatetList: SystemProfiles[] = [];
	syspflDeleteList: SystemProfiles[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	oicSlColumnDef: any[];
	oicSlReadOnly: boolean = false;
	cgfkOicsloicsanctioncodeRg: any[] = [];
	cgfkOicsloichearingtypeRg: any[] = [];
	oicslCommitModel: OicSanctionLimitsCommitBean = new OicSanctionLimitsCommitBean();
	tableIndex: number;
	enableSanctionDelete: boolean;
	constructor(private oimoicmpFactory: OimoicmpService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.oicSlColumnDef = [];
	}
	ngOnInit() {
		this.enableSanctionDelete = false;
		this.oicSlColumnDef = [
			{
				fieldName: this.translateService.translate('oimoicmp.hearingtype'), field: 'oicHearingType',
				editable: true, width: 150, datatype: 'lov', domain: 'OIC_HEAR', required: true, titles: {
                    description: this.translateService.translate('Description'),
                    code: this.translateService.translate('Hearing')
                } 
			},
			{
				fieldName: this.translateService.translate('oimoicmp.penaltytype'), field: 'oicSanctionCode',
				editable: true, width: 150, datatype: 'lov', domain: 'OIC_SANCT', required: true,titles: {
                    description: this.translateService.translate('Description'),
                    code: this.translateService.translate('Award')
                } 
			},
			{
				fieldName: this.translateService.translate('oimoicmp.months'), field: 'maxMonth', editable: true, width: 150, datatype: 'number',
				maxValue: '999', minValue: '0', whole: true
			},
			{
				fieldName: this.translateService.translate('oimoicmp.days'), field: 'maxDays', editable: true, width: 150, datatype: 'number',
				maxValue: '999', minValue: '0', whole: true
			},
			{ fieldName: this.translateService.translate('oimoicmp.restitution'), field: 'compensationAmount', editable: true, datatype: 'number', format: '1.2-2',maxValue: 9999999.99, width: 150, whole: true },
			
		];
		// TODO all initializations here
		this.oicslExecuteQuery();
	}
	Insert = () => { // TODO implement on grid insert 
	}
	validateRowData = (event) => {
		const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
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
	onRowClickoicsl(event) {
		if (event) {
			this.oicslModel = event;
			if(this.oicslModel.createDatetime){
				this.enableSanctionDelete = true;
			} else {
				this.enableSanctionDelete = false;
			}
		}
	}

	oicslExecuteQuery() {
		const oicslResult = this.oimoicmpFactory.oicSlExecuteQuery(this.oicslModel);
		oicslResult.subscribe(oicslResultList => {
			if (oicslResultList.length === 0) {
				this.oicslData = [];
			} else {
				this.oicslData = oicslResultList;
				this.oicslModel = oicslResultList[0];
				this.tableIndex = 0;
			}
		});
	}

	oimoicmpValidations = () => {
        const is = { valid: true };
        if (this.oicslData && this.oicslData) {
            this.oicslData.forEach(element => {
                if (!element.oicHearingType) {
                    this.show(this.translateService.translate('oimoicmp.hearingmandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                
                if (!element.oicSanctionCode) {
                    this.show(this.translateService.translate('oimoicmp.penaltymandatory'), 'warn');
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
	oimoicmpSaveoicslForm(event) {
		if (!this.oimoicmpValidations()) {
            return;
        }
		// TODO declare commit bean and add insert list to that object.
		this.oicslInsertList = event.added
		this.oicslUpdatetList = event.updated
		this.oicslDeleteList = event.removed
		this.oicslCommitModel.insertList = [];
		this.oicslCommitModel.updateList = [];
		this.oicslCommitModel.deleteList = [];
		if (this.oicslInsertList.length > 0 || this.oicslUpdatetList.length > 0) {
			for (let i = 0; i < this.oicslInsertList.length; i++) {
				this.oicslCommitModel.insertList = this.oicslInsertList;
			}
			for (let i = 0; i < this.oicslUpdatetList.length; i++) {
				this.oicslCommitModel.updateList = this.oicslUpdatetList;
			}
		}
		if (this.oicslDeleteList.length > 0) {
			for (let i = 0; i < this.oicslDeleteList.length; i++) {
				this.oicslCommitModel.deleteList = this.oicslDeleteList;
			}
		}
		const oicslSaveData = this.oimoicmpFactory.oicSlCommit(this.oicslCommitModel);
		oicslSaveData.subscribe(data => {
			if (String(data[0].errorMessage).indexOf('OIC_SANCTION_LIMITS_PK') > 0) {
                this.show(this.translateService.translate('oimoicmp.primarykeyviolation'), 'warn');
                this.oicslExecuteQuery();
                return;
            }
			if (data[0] && data[0].listSeq === 1) {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.oicslExecuteQuery();
				return;
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.oicslExecuteQuery();
				return;
			}
		});
	}

}
