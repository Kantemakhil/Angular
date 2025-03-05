import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AutomationApiQuery } from '../beans/AutomationApiQuery';
import { AutomationApiQueryCommitBean } from '../beans/AutomationApiQueryCommitBean';
import { CmdactionService } from '../service/cmdaction.service';
import { AutomationQueryParameters } from '../beans/AutomationQueryParameters';
import { AutomationQueryParametersCommitBean } from '../beans/AutomationQueryParametersCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';

@Component({
	selector: 'app-cmdaction',
	templateUrl: './cmdaction.component.html'
})

export class CmdactionComponent implements OnInit {
    @ViewChild('quickActionsGrid', {static: true}) quickActionsGrid: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];

	msglist: any[];
	message: any;
	type: any;

	quickActionsColumnDef: any[];
	quickActionsModel: AutomationApiQuery = new AutomationApiQuery();
	quickActionsData: AutomationApiQuery[] = [];
	quickActionsInsertList: AutomationApiQuery[] = [];
	quickActionsUpdateList: AutomationApiQuery[] = [];
	quickActionsDeleteList: AutomationApiQuery[] = [];
	quickActionsCommitModel: AutomationApiQueryCommitBean = new AutomationApiQueryCommitBean();
    quickActionsTableIndex: number;
    
    parametersColumnDef: any[];
	parametersModel: AutomationQueryParameters = new AutomationQueryParameters();
	parametersData: AutomationQueryParameters[] = [];
	parametersInsertList: AutomationQueryParameters[] = [];
	parametersUpdateList: AutomationQueryParameters[] = [];
	parametersDeleteList: AutomationQueryParameters[] = [];
	parametersCommitModel: AutomationQueryParametersCommitBean = new AutomationQueryParametersCommitBean();
    parametersTableIndex: number;
    quickActionDelete: boolean;
    parameterInsert: boolean;
    parametersDelete: boolean;
	
	constructor(private cmdactionService: CmdactionService, public translateService: TranslateService,
		public sessionManager: UserSessionManager, public dialogService: DialogService) {
		this.quickActionsColumnDef = [];
    }
    
	ngOnInit() {
		this.quickActionsColumnDef = [
			{
				fieldName: this.translateService.translate('cmdaction.actionkey'), field: 'queryKey', datatype: 'text',
				editable: true, width: 150, required: true, cellEditable: this.actionkeyEdit
			},
			{
				fieldName: this.translateService.translate('cmdaction.actiondescription'), field: 'queryDesc', datatype: 'text',
				editable: true, uppercase: 'false', width: 150, required: true
			},
			{
				fieldName: this.translateService.translate('common.category'), field: 'category',required: true, editable: true, width: 150,
				datatype: 'lov', domain: 'PROCESS_CATE'
			},
			{
				fieldName: this.translateService.translate('cmdaction.query'), field: 'queryText', datatype: 'text',
				editable: false, uppercase: 'false', wrapText: true, styleClass:'cell-flow-wrap', width: 150, required: true
            },
            {
				fieldName: this.translateService.translate('cmdaction.edit'), field: 'edit', displayas: 'image',
				editable: true, width: 150, datatype: 'hyperlink', modal: true, data: 'row', updateField: 'row',
                onLaunchClick: this.queryLaunchClick
            },
			{
				fieldName: this.translateService.translate('cmdaction.active'), field: 'active', datatype: 'checkbox',
				maxlength: 1, editable: false, width: 150, hide:true
            },
            {
				fieldName: this.translateService.translate('cmdaction.verifiedby'), field: 'verifiedBy', datatype: 'text',
				editable: true, uppercase: 'false', width: 150, hide:true
			}
        ];
        
        this.parametersColumnDef = [
			{
				fieldName: this.translateService.translate('cmdaction.parametercode'), field: 'parameterCode', datatype: 'text',
				editable: true, uppercase: 'false', width: 150, required: true
			},
			{
				fieldName: this.translateService.translate('cmdaction.parameterdescription'), field: 'parameterDescription', datatype: 'text',
				editable: true, uppercase: 'false', width: 150, required: true
			},
			{
				fieldName: this.translateService.translate('cmdaction.parametertype'), field: 'parameterType', datatype: 'lov',
				editable: true, uppercase: 'false', width: 150, required: true, link: 'cmdaction/rgParameterRecordGroup'
            },
        ];
        
        this.quickActionsExecuteQuery();
	}

	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
    }

    actionkeyEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    get quickActionInsert(){
        if(this.quickActionsGrid.addedMap.size > 0){
            return false;
        } else {
            return true;
        }
    }

    onRowClickQuickActions(event) {
        if (event !== undefined) {
            this.quickActionsModel = event;
        } 
        if (event.createDatetime || event.createDatetime !== undefined) {
            this.quickActionDelete = true;
 			this.parameterInsert = true;
		} else {
            this.quickActionDelete = false;
			this.parameterInsert = false;
		}
        this.parametersExecuteQuery()
    }
    
    onRowClickParameters(event) {
        if (event !== undefined) {
			this.parametersModel = event;
        }
        if (event.createDatetime || event.createDatetime !== undefined) {
            this.parametersDelete = true;
		} else {
            this.parametersDelete = false;
		}
	}
	
	validateQuickActionsGrid= (event) => {
		const rowdata = new ValidateRowReturn();
		if(event.field == 'queryKey'){
			if(event.data.queryKey) {
				this.quickActionsGrid.setColumnData('queryKey', event.rowIndex, event.data.queryKey.trim().replace(/ +/g,'_')); 
				rowdata.validated = true;
				return rowdata;
			}
		}
		rowdata.validated = true;
		return rowdata;
	}

    quickActionsExecuteQuery() {
        const serviceObj = this.cmdactionService.quickActionsExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.quickActionsData = [];
				this.quickActionsTableIndex = -1;
			} else {
				this.quickActionsTableIndex = 0;
				this.quickActionsData = data;
				this.quickActionsData.forEach((element) => {
                    element['edit'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
					if (element.activeFlag === 'Y') {
						element.active = true;
					}
				});
				this.quickActionsModel = data[0];
			}
		});
    }

    parametersExecuteQuery() {
        const serviceObj = this.cmdactionService.parametersExecuteQuery(this.quickActionsModel);
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.parametersData = [];
                this.parametersTableIndex = -1;
                this.quickActionDelete = true;
			} else {
				this.parametersTableIndex = 0;
				this.parametersData = data;
                this.parametersModel = data[0];
                this.quickActionDelete = false;
			}
		});
    }
    
    commitQuickActions(event) {
        this.quickActionsInsertList = event.added
		this.quickActionsUpdateList = event.updated
		this.quickActionsDeleteList = event.removed
		this.quickActionsCommitModel.insertList = [];
		this.quickActionsCommitModel.updateList = [];
		this.quickActionsCommitModel.deleteList = [];
		if (this.quickActionsInsertList.length > 0) {
            if (!this.quickActionsValidate(this.quickActionsInsertList)) {
                return;
            }
            this.quickActionsInsertList.forEach((element) => {
                element.createUserId=this.sessionManager.getId();
				element.createDatetime=DateFormat.getDate();
				element.modifyDatetime=DateFormat.getDate();
            });
            this.quickActionsInsertList = this.flagConvertion(this.quickActionsInsertList);
			this.quickActionsCommitModel.insertList = this.quickActionsInsertList;
		}
		if (this.quickActionsUpdateList.length > 0) {
            if (!this.quickActionsValidate(this.quickActionsUpdateList)) {
                return;
            }
            this.quickActionsUpdateList.forEach((element) => {
				element.modifyUserId=this.sessionManager.getId();
				element.modifyDatetime=DateFormat.getDate();
            });
            this.quickActionsUpdateList = this.flagConvertion(this.quickActionsUpdateList);
			this.quickActionsCommitModel.updateList = this.quickActionsUpdateList;
		}
		if (this.quickActionsDeleteList.length > 0) {
			this.quickActionsCommitModel.deleteList = this.quickActionsDeleteList;
		}
		const scheduleSaveData = this.cmdactionService.commitQuickActions(this.quickActionsCommitModel);
		scheduleSaveData.subscribe(data => {
			if (data === 1) {
				this.quickActionsExecuteQuery();
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
			} else if(data === 2){
				this.type = 'warn';
				this.message = this.translateService.translate('Record cannot be deleted, as the child record exists in the ACTION_API table.');
				this.show();
			}else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		});
    }

    commitParameters(event) {
        this.parametersInsertList = event.added
		this.parametersUpdateList = event.updated
		this.parametersDeleteList = event.removed
		this.parametersCommitModel.insertList = [];
		this.parametersCommitModel.updateList = [];
		this.parametersCommitModel.deleteList = [];
		if (this.parametersInsertList.length > 0) {
            if (!this.parametersValidate(this.parametersInsertList)) {
                return;
            }
            this.parametersInsertList.forEach((element) => {
				element.queryKey = this.quickActionsModel.queryKey;
                element.createUserId=this.sessionManager.getId();
				element.createDatetime=DateFormat.getDate();
            });
			this.parametersCommitModel.insertList = this.parametersInsertList;
		}
		if (this.parametersUpdateList.length > 0) {
            if (!this.parametersValidate(this.parametersUpdateList)) {
                return;
            }
            this.parametersUpdateList.forEach((element) => {
				element.modifyUserId=this.sessionManager.getId();
				element.modifyDatetime=DateFormat.getDate();
            });
			this.parametersCommitModel.updateList = this.parametersUpdateList;
		}
		if (this.parametersDeleteList.length > 0) {
			this.parametersCommitModel.deleteList = this.parametersDeleteList;
		}
		const scheduleSaveData = this.cmdactionService.commitParameters(this.parametersCommitModel);
		scheduleSaveData.subscribe(data => {
			if (data === 1) {
				this.parametersExecuteQuery();
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
			} else {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		});
    }

    flagConvertion(quickActionsList: any) {
		quickActionsList.forEach((element) => {
			element.active = element.activeFlag ? 'Y' : 'N';
		});
		return quickActionsList;
    }
    
    onQuickActionsGridInsert= () => {
		this.parametersData = [];
        this.quickActionsModel = new AutomationApiQuery();
		return {
            edit : 'assets/icons/eoff_icons/edit_24x24_sm.png'
        };
    }

    parametersGridInsert= () => {
		return {};
    }

    queryLaunchClick = (data) => {
        this.dialogService.openLinkDialog('/CMDQUERY', data, 80).subscribe(result => {
            if(result){
                const node = this.quickActionsGrid.gridOptions.api.getSelectedNodes().length && this.quickActionsGrid.gridOptions.api.getSelectedNodes()[0];
				if(node){
					node.setDataValue('queryText', result);
				}
            }
        });
    }

    quickActionsValidate(quickActionsList: any) {
        try {
            quickActionsList.forEach((element) => {
			if (!element.queryKey) {
                this.type = 'warn';
                this.message = this.translateService.translate('cmdaction.enteractionkey');
                this.show();
                throw new Error();
            } else if (!element.queryDesc) {
                this.type = 'warn';
                this.message = this.translateService.translate('cmdaction.enteractiondesc');
                this.show();
                throw new Error();
            } else if (!element.category) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.selectcategory');
                this.show();
                throw new Error();
            } else if (!element.queryText) {
                this.type = 'warn';
                this.message = this.translateService.translate('cmdaction.enterquery');
                this.show();
                throw new Error();
            } else if (element.queryText.toUpperCase().includes("DELETE")) {
				this.type = 'warn';
                this.message = this.translateService.translate('cmdaction.deletenotallowed');
                this.show();
                throw new Error();
			} 
			// else if (!element.queryText.toUpperCase().includes("WHERE")) {
			// 	this.type = 'warn';
            //     this.message = this.translateService.translate('cmdaction.invalidquery');
            //     this.show();
            //     throw new Error();
			// } 
		});
		for (let i = 0; i < this.quickActionsData.length; i++) {
			for (let j = i + 1; j < this.quickActionsData.length; j++) {
				if (this.quickActionsData[i].queryKey === this.quickActionsData[j].queryKey) {
					this.type = 'warn';
					this.message = this.translateService.translate('apimain.querykeyexists');
					this.show();
					throw new Error();
				}
			}
		}
    } catch (e) {
        return false;
    }
        return true;
    }

    parametersValidate(parametersList: any) {
        try {
            parametersList.forEach((element) => {
            if (!element.parameterCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('cmdaction.enterparametercode');
                this.show();
                throw new Error();
            } else if (!element.parameterDescription) {
                this.type = 'warn';
                this.message = this.translateService.translate('cmdaction.enterparameterdescription');
                this.show();
                throw new Error();
            } else if (!element.parameterType) {
                this.type = 'warn';
                this.message = this.translateService.translate('cmdaction.enterparametertype');
                this.show();
                throw new Error();
            }
        });
    } catch (e) {
        return false;
    }
        return true;
    }

}
