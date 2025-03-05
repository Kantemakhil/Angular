import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiusanctService } from '../service/oiusanct.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderOicSanctions } from '@inst/incidents-oic/beans/OffenderOicSanctions';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
	selector: 'app-oiusanct',
	templateUrl: './oiusanct.component.html',
})

export class OiusanctComponent implements OnInit {
	// Variable declaration
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;

	msglist: any[];
	message: any;
	type: any;
	actionName: string;
	msgs: any[] = [];
	offenderoicsanctionsData: OffenderOicSanctions[] = [];
	offenderoicsanctionsDataTemp: OffenderOicSanctions[] = [];
	// TODO angular.copy(this.offenderoicsanctionsData, thisoffenderoicsanctionsDataTemp);
	offenderoicsanctionsModel: OffenderOicSanctions = new OffenderOicSanctions();
	display: boolean;
	offenderoicsanctionsColumnDefs: any[];
	offenderOicSanctionsReadOnly: boolean = false;
	dialogData: any;
	constructor(private oiusanctFactory: OiusanctService, public translateService: TranslateService, public sessionManager: UserSessionManager, public dialogService: DialogService) {
		// TODO initilize data members here..!
		this.offenderoicsanctionsColumnDefs = [];
	}
	ngOnInit() {
		this.offenderoicsanctionsColumnDefs = [
			{ fieldName: this.translateService.translate('oiusanct.type'), field: 'oicSanctionCode', datatype: 'text', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oiusanct.description'), field: 'description', datatype: 'text', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oiusanct.effectiveDate'), field: 'effectiveDate', datatype: 'date', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oiusanct.months'), field: 'sanctionMonths', datatype: 'number', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oiusanct.days'), field: 'sanctionDays', datatype: 'number', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oiusanct.restitution'), field: 'compensationAmount', datatype: 'number', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oiusanct.status'), field: 'status', datatype: 'text', editable: false, width: 150 },
		];
	
		this.offenderoicsanctionsExecuteQuery();
	}
	/** 
	 * This function displays the messages
	 */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	onButProfileExitclick() {
		this.dialog.close(null);
	}
	offenderoicsanctionsExecuteQuery() {
		this.offenderoicsanctionsModel.offenderBookId=this.dialog.data.offenderBookId;
		const offenderoicsanctionsResult = this.oiusanctFactory.
			offenderOicSanctionsExecuteQuery(this.offenderoicsanctionsModel);
		offenderoicsanctionsResult.subscribe(data => {
			if (data.length > 0) {
				this.offenderoicsanctionsData = data;
				this.offenderoicsanctionsModel = this.offenderoicsanctionsData[0];
			} 
			else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.querycaused');
				this.show();
			}
		});
	}
}
