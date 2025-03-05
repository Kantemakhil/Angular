import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumauditService } from '@sa/audit/maintenance/service/oumaudit.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AllAuditPolicies } from '@sa/audit/maintenance/beans/AllAuditPolicies';
import { LovService } from '@core/ui-components/lov/lov.service';
// import required bean declarations

@Component({
	selector: 'app-oumaudit',
	templateUrl: './oumaudit.component.html'
})

export class OumauditComponent implements OnInit {
	// Variable declaration
	msgs: any[] = [];
	allauditpoliciesData: AllAuditPolicies[] = [];
	auditPoliciesModel: AllAuditPolicies = new AllAuditPolicies();
	allauditpoliciesModel: AllAuditPolicies = new AllAuditPolicies();
	createPolicyModel: AllAuditPolicies = new AllAuditPolicies();
	allAuditPoliciesIndex = -1;
	allauditpoliciesInsertList: AllAuditPolicies[] = [];
	allauditpoliciesUpdatetList: AllAuditPolicies[] = [];
	allauditpoliciesDeleteList: AllAuditPolicies[] = [];
	allAuditPoliciesColumnDef: any[];
	msglist: any[];
	message: any;
	type: any;
	disableEnablePolicy: boolean;
	disableDisablePolicy: boolean;
	disableCreatePolicy: boolean;
	disableDropPolicy: boolean;
	retrievedisabled: boolean;
	disableDisableAllPolicy: boolean;
	disableEnableAllPolicy: boolean;
	disableDropAllPolicy: boolean;
	disableCreateAllPolicy: boolean;
	clearDisabled: boolean;
	tableNameLink: string;
	select: boolean;
	insert: boolean;
	update: boolean;
	delete: boolean;
	disableSearchFields: boolean;

	lovTitles = {
		code: this.translateService.translate('oumaudit.objectunderscorename'),
	};
	disableTableNameLov: boolean;
	allTableNamesLink: string;
	constructor(private oumauditFactory: OumauditService, public translateService: TranslateService,
		public sessionManager: UserSessionManager, private lovService: LovService) {
		// TODO initilize data members here..!
		this.allAuditPoliciesColumnDef = [];
	}
	ngOnInit() {
		this.select = true;
		this.insert = true;
		this.update = true;
		this.delete = true;
		this.disableEnablePolicy = false;
		this.disableDisablePolicy = false;
		this.disableDropPolicy = false;
		this.disableCreatePolicy = false;
		this.disableCreateAllPolicy = false;
		this.clearDisabled = false;
		this.retrievedisabled = true;
		this.disableSearchFields = true;
		this.disableTableNameLov = false;
		this.allTableNamesLink = 'oumaudit/getAllTableNames';
		this.allauditpoliciesExecuteQuery('');
		this.allAuditPoliciesColumnDef = [
			{ fieldName: this.translateService.translate('oumaudit.tablename'), field: 'objectName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oumaudit.enabled'), field: 'enabled', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('common.select'), field: 'sel', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oumaudit.insert'), field: 'ins', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oumaudit.update'), field: 'upd', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('common.delete'), field: 'del', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oumaudit.policycondition'), field: 'policyText', editable: false, width: 150 },
		];
	}
	/** 
 * This function displays the messages
 */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}

	isInsertable() {
		if ((this.allauditpoliciesModel.objectName || this.allauditpoliciesModel.enabled
			|| this.allauditpoliciesModel.sel || this.allauditpoliciesModel.ins || this.allauditpoliciesModel.policyText
			|| this.allauditpoliciesModel.upd || this.allauditpoliciesModel.del) || this.disableSearchFields) {
			this.clearDisabled = false;
			this.retrievedisabled = false;
		} else {
			this.clearDisabled = true;
			this.retrievedisabled = true;
		}
	}

	allauditpoliciesExecuteQuery(action) {
		this.lovService.clear(this.tableNameLink);
		this.tableNameLink = 'oumaudit/rgDbObjectsRecordGroup';
		this.getTableNameLovData();
		const allauditpoliciesResult = this.oumauditFactory.
			allAuditPoliciesExecuteQuery(this.allauditpoliciesModel);
		allauditpoliciesResult.subscribe(data => {
			if (data.length === 0) {
				if (action === 'search') {
					this.type = 'warn';
					this.message = this.translateService.translate('common.querycausedReEnter');
					this.show();
				}
				this.allauditpoliciesModel = new AllAuditPolicies();
				this.allauditpoliciesData = [];
				this.disableSearchFields = false;
				this.retrievedisabled = false;
				this.clearDisabled = true;
				this.disableDropAllPolicy = true;
				this.disableEnableAllPolicy = true;
				this.disableDisableAllPolicy = true;
				this.disableDisablePolicy = true;
				this.disableEnablePolicy = true;
				this.disableDropPolicy = true;
			} else {
				this.disableDropAllPolicy = false;
				this.disableEnableAllPolicy = false;
				this.disableDisableAllPolicy = false;
				this.disableSearchFields = true;
				this.clearDisabled = false;
				this.retrievedisabled = true;
				this.allAuditPoliciesIndex = 0;
				this.allauditpoliciesData = data;
			}
		});
	}

	getTableNameLovData() {
		const allauditpoliciesResult = this.oumauditFactory.getTableNameLovData();
		allauditpoliciesResult.subscribe(data => {
			if (data && data.length > 0) {
				this.disableTableNameLov = false;
				this.disableCreateAllPolicy = false;
			} else {
				this.disableDropAllPolicy = false;
				this.disableCreateAllPolicy = true;
				this.disableTableNameLov = true;
			}
		});
	}

	clear() {
		this.allauditpoliciesModel = new AllAuditPolicies();
		this.allauditpoliciesData = [];
		this.clearDisabled = true;
		this.retrievedisabled = false;
		this.disableSearchFields = false;
		this.disableDisableAllPolicy = true;
		this.disableEnableAllPolicy = true;
		this.disableDropAllPolicy = true;
		this.createPolicyModel = new AllAuditPolicies();
		this.lovService.clear(this.tableNameLink);
		this.tableNameLink = 'oumaudit/rgDbObjectsRecordGroup';
		this.getTableNameLovData();
	}

	enablePolicy() {
		this.auditPoliciesModel.enableOrDisable = 1;
		const allauditpoliciesResult = this.oumauditFactory.enableOrDisablePolicy(this.auditPoliciesModel);
		allauditpoliciesResult.subscribe(data => {
			if (data && data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.allauditpoliciesExecuteQuery('');
				return;
			}
		});
	}

	disablePolicy() {
		this.auditPoliciesModel.enableOrDisable = 0;
		const allauditpoliciesResult = this.oumauditFactory.enableOrDisablePolicy(this.auditPoliciesModel);
		allauditpoliciesResult.subscribe(data => {
			if (data && data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.allauditpoliciesExecuteQuery('');
				return;
			}
		});
	}

	dropPolicy() {
		const allauditpoliciesResult = this.oumauditFactory.dropPolicy(this.auditPoliciesModel);
		allauditpoliciesResult.subscribe(data => {
			if (data && data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.allauditpoliciesExecuteQuery('');
				return;
			}
		});
	}

	createPolicy() {
		if (!this.createPolicyModel.objectName) {
			this.type = 'warn';
			this.message = this.translateService.translate('oumaudit.tableNamemustbeenter');
			this.show();
			return;
		}
		this.createPolicyModel.sel = this.select ? 'Y' : 'N';
		this.createPolicyModel.ins = this.insert ? 'Y' : 'N';
		this.createPolicyModel.upd = this.update ? 'Y' : 'N';
		this.createPolicyModel.del = this.delete ? 'Y' : 'N';
		const allauditpoliciesResult = this.oumauditFactory.createPolicy(this.createPolicyModel);
		allauditpoliciesResult.subscribe(data => {
			if (data && data.sealFlag === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('oumaudit.policyalreadyexists');
				this.show();
				return;
			} else if (data && data.sealFlag === 'Success') {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.createPolicyModel = new AllAuditPolicies();
				this.allauditpoliciesExecuteQuery('');
				return;
			}
		});
	}

	disableAll() {
		const allauditpoliciesResult = this.oumauditFactory.disableAll();
		allauditpoliciesResult.subscribe(data => {
			if (data && data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.allauditpoliciesExecuteQuery('');
				return;
			}
		});
	}

	enableAll() {
		const allauditpoliciesResult = this.oumauditFactory.enableAll();
		allauditpoliciesResult.subscribe(data => {
			if (data && data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.allauditpoliciesExecuteQuery('');
				return;
			}
		});
	}

	dropAll() {
		const allauditpoliciesResult = this.oumauditFactory.dropAll();
		allauditpoliciesResult.subscribe(data => {
			if (data && data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.allauditpoliciesExecuteQuery('');
				return;
			}
		});
	}

	createAll() {
		const allauditpoliciesResult = this.oumauditFactory.createAll();
		allauditpoliciesResult.subscribe(data => {
			if (data && data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.allauditpoliciesExecuteQuery('');
				return;
			}
		});
	}

	onGridRowClick(event) {
		if (event) {
			this.auditPoliciesModel = new AllAuditPolicies();
			this.auditPoliciesModel = event;
			this.disableDisablePolicy = false;
			this.disableEnablePolicy = false;
			this.disableDropPolicy = false;
		} else {
			this.disableDisablePolicy = true;
			this.disableEnablePolicy = true;
			this.disableDropPolicy = true;
		}
	}

}

