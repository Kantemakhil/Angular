import {
	Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OuiaflatService } from '@sa/audit/service/ouiaflat.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TagLoginAlerts } from '@sa/audit/beans/TagLoginAlerts';
// import required bean declarations

@Component({
	selector: 'app-ouiaflat',
	templateUrl: './ouiaflat.component.html'
})

export class OuiaflatComponent implements OnInit {
	// Variable declaration
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	loginalertsblkData: TagLoginAlerts[] = [];
	loginalertsblkDataTemp: TagLoginAlerts[] = [];
	// TODO angular.copy(this.loginalertsblkData, thisloginalertsblkDataTemp);
	loginalertsblkModel: TagLoginAlerts = new TagLoginAlerts();
	loginalertModel: TagLoginAlerts = new TagLoginAlerts();
	loginalertSearchModel: TagLoginAlerts = new TagLoginAlerts();
	loginalertsblkIndex = 0;
	loginalertsblkInsertList: TagLoginAlerts[] = [];
	loginalertsblkUpdatetList: TagLoginAlerts[] = [];
	loginalertsblkDeleteList: TagLoginAlerts[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable = true;
	loginAlertsBlkColumnDef: any[];
	loginAlertsBlkReadOnly = false;
	msglist: any[];
	message: any;
	type: any;
	tableIndex = 0;
	retriveDisable: boolean;
	constructor(private ouiaflatFactory: OuiaflatService,
		public translateService: TranslateService,
		public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.loginAlertsBlkColumnDef = [];

	}
	ngOnInit() {
		this.retriveDisable = false;
		this.loginAlertsBlkColumnDef = [
			{ fieldName: this.translateService.translate('common.date'), field: 'logDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('common.time'), field: 'logTime', editable: false, width: 150, datatype: 'time' },
			{ fieldName: this.translateService.translate('ouiaflat.ipaddress'), field: 'ipAddress', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('ouiaflat.host'), field: 'host', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('ouiaflat.osuser'), field: 'osUser', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('ouiaflat.dbuser'), field: 'dbUser', editable: false, width: 150 },

			{ fieldName: this.translateService.translate('ouiaflat.tool'), field: 'tool', editable: false, width: 150 },
		];
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
	onRowClickloginalertsblk(event) {
	}
	ok() {
	}
	no() {
	}
	cancel() {
	}
	onRefresh (){
		this.loginalertSearchModel = new TagLoginAlerts();
         this.loginalertsblkExecuteQuery ();
	}
	onClear (){
		this.loginalertsblkData = [];
		this.loginalertSearchModel = new TagLoginAlerts();
		this.retriveDisable = false;
	}
	onFromDateBlur() {
		if (!this.loginalertSearchModel.logDate) {
			this.loginalertSearchModel.logDate = this.loginalertSearchModel.logDate === null ? undefined : null;
		}

	}
	loginalertsblkExecuteQuery() {
		const loginalertsblkResult = this.ouiaflatFactory.loginAlertsBlkExecuteQuery(this.loginalertSearchModel);
		loginalertsblkResult.subscribe(data => {
			if (data.length === 0) {
				this.loginalertsblkData = [];
				this.show(this.translateService.translate('common.querycaused'));
			} else {
				this.loginalertsblkData = data;
				this.loginalertsblkModel = data[0];
				this.tableIndex = 0;
				this.retriveDisable = true;
			}
		});
	}
	get readeOnlyFields() {
        if (this.loginalertsblkData.length === 0) {
            return false;
        } else {
            return true;
        }
	}
	get clrBtnFlag() {
        if (this.loginalertsblkData.length === 0 && !this.loginalertSearchModel.logDate &&
            !this.loginalertSearchModel.ipAddress  && !this.loginalertSearchModel.host && 
            !this.loginalertSearchModel.osUser && !this.loginalertSearchModel.dbUser && !this.loginalertSearchModel.tool  ) {
            return true;
        } else {
            return false;
        }
    }

}
