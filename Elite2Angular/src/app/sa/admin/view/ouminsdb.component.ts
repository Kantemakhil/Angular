import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OuminsdbService } from '../service/ouminsdb.service';
import { ModuleInsDashboardBean } from '../beans/ModuleInsDashboardBean';
import { ModuleInsDashboardCommitBean } from '../beans/ModuleInsDashboardCommitBean';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { DashboardBiService } from './../../../dashboard-bi/dashboard-bi.service';
import { OumsysetBean } from '../beans/OumsysetBean';
import { OumsysetService } from '../service/oumsyset.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';

@Component({
	selector: 'app-ouninsdb',
	templateUrl: './ouminsdb.component.html'
})

export class OuminsdbComponent implements OnInit {
    @ViewChild('moduledbAssGrid', {static: true}) moduledbAssGrid: any;
    actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];

	msglist: any[];
	message: any;
	type: any;

    moduledbAssData: ModuleInsDashboardBean[] = [];
    moduledbAssModel: ModuleInsDashboardBean = new ModuleInsDashboardBean();
    moduledbAssInsertList: ModuleInsDashboardBean[] = [];
    moduledbAssUpdateList: ModuleInsDashboardBean[] = [];
    moduledbAssDeleteList: ModuleInsDashboardBean[] = [];
    moduledbAssCommitModel: ModuleInsDashboardCommitBean = new ModuleInsDashboardCommitBean();
    moduledbAssColumnDef: any[];
    moduledbAssTableIndex: number;
    moduledbAssDelete: boolean;

    result: any;
    private header: HttpHeaders;
    private head: HttpHeaders;
    // dashboards: { code: string; description: string; }[];
    dashboards: any[] = [];
    oumsysetModel: OumsysetBean = new OumsysetBean();
    systemSetData = [];
    InsightRoolUrl: any;
    environment: string;
    siteIdentifier: string;
    embedSecret: string;
    userEmail: string;
    
    constructor(
        private ouminsdbService: OuminsdbService,
        public translateService: TranslateService,
		public sessionManager: UserSessionManager,
        private http: HttpClient,
        public oumsysetService: OumsysetService,
        private dashboardBiService: DashboardBiService) { 
		this.moduledbAssColumnDef = [];
    }
    dashboardTile = {
        description: this.translateService.translate('common.description')
    };

    ngOnInit() {
        this.moduledbAssColumnDef = [
			{
				fieldName: this.translateService.translate('ouminsdb.module'), field: 'module', datatype: 'text',
				editable: true, cellEditable: this.canModuleEdit, width: 150, required: true, maxlength: 12
			},
			{
				fieldName: this.translateService.translate('ouminsdb.dashboard'), field: 'dashboard', datatype: 'lov',
				link: 'ouminsdb/getInsDashboardList', editable: true, width: 150, required: true, titles: this.dashboardTile
			},
			{
				fieldName: this.translateService.translate('ouminsdb.active'), field: 'active', datatype: 'checkbox',
				maxlength: 1, editable: true, width: 150
            },
            {
				fieldName: this.translateService.translate('ouminsdb.offenderSpecific'), field: 'offenderSpecific', datatype: 'checkbox',
				maxlength: 1, editable: true, width: 150
			}
        ];
        this.getCredentials();
    }
    getToken() {
        if (this.environment == "enterprise") {
            this.dashboardBiService.baseUrl = this.InsightRoolUrl + "/" + this.siteIdentifier;
            this.dashboardBiService.dashboardServerApiUrl = this.InsightRoolUrl + "/api/" + this.siteIdentifier;
        } else {
            this.dashboardBiService.baseUrl = this.InsightRoolUrl;
            this.dashboardBiService.dashboardServerApiUrl = this.InsightRoolUrl + "/api";
        }
        const dashboardId = this.dashboardBiService.getAdminToken(this.userEmail);
        dashboardId.subscribe(data => {
            this.result = data;
            this.dashboardBiService.token = this.result.access_token;
            this.getDashboard(this.dashboardBiService.token);
        });
    }
    getDetails() {
        this.oumsysetModel.settingType = 'INSIGHTS';
        this.oumsysetModel.settingProviderCode = 'INSIGHTS';
        this.oumsysetService.loadJsonData(this.oumsysetModel).subscribe((result) => {
            const rowData = JSON.parse(result.settingValue);
            this.systemSetData = rowData;
            this.environment = this.getKeyCodeValue("INS_ENV");
            this.siteIdentifier = this.getKeyCodeValue("INS_SITE_IDF");
            this.embedSecret = this.getKeyCodeValue("INS_EMB_SEC");
            this.InsightRoolUrl = this.getKeyCodeValue("INSI_SER_URL");
            this.getToken();
        }); 
    }

    getCredentials(){
        this.oumsysetModel.settingType = 'INSIGHTS';
        this.oumsysetModel.settingProviderCode = 'AUTH';
        this.oumsysetService.loadJsonData(this.oumsysetModel).subscribe((result) => {
          const rowData = JSON.parse(result.settingValue);
          rowData.forEach(element => {
              if(element.KEY_CODE === 'USERNAME') {
                this.userEmail = element.VALUE;
              }
              this.getDetails();
          });
        }); 
    }
    getKeyCodeValue(keycode){
        for (let i=0; i<this.systemSetData.length; i++) {
            if(this.systemSetData[i].KEY_CODE == keycode){
                return this.systemSetData[i].VALUE;
            }
        }
        return null
    }
    getDashboard(adminToken) {
        const getDashboards = this.dashboardBiService.getDashboards(adminToken);
        getDashboards.subscribe(data => {
            this.dashboardBiService.dashboards = data;
            this.dashboardBiService.dashboards.forEach((element) => {
                // this.dashboards.push(element.Name);
                this.dashboards.push({ 'id': element.Id, 'text':element.Name });
            })
            this.moduledbAssExecuteQuery();
        });
        
    }

    show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
    }

    canModuleEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    onRowClickModuledbAss(event) {
        if (event !== undefined) {
            this.moduledbAssModel = event;
        } 
        if (event.createDatetime || event.createDatetime !== undefined) {
            this.moduledbAssDelete = true;
		} else {
            this.moduledbAssDelete = false;
		}
    }

    moduledbAssExecuteQuery() {
        const serviceObj = this.ouminsdbService.moduledbAssExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.moduledbAssData = [];
				this.moduledbAssTableIndex = -1;
			} else {
				this.moduledbAssTableIndex = 0;
                data.forEach((element) => {
					let index = this.dashboards.findIndex(x => x.id === element.dashboard);
                    if(index > -1){
                        element.dashboard = this.dashboards[index].id;
                    }
				});
				this.moduledbAssData = data;
				this.moduledbAssData.forEach((element) => {
					if (element.activeFlag === 'Y') {
						element.active = true;
                    }
                    if (element.offenderSpecificFlag === 'Y') {
						element.offenderSpecific = true;
					}
				});
				this.moduledbAssModel = data[0];
			}
		});
    }

    commitModuledbAss(event) {
        this.moduledbAssInsertList = event.added
		this.moduledbAssUpdateList = event.updated
		this.moduledbAssDeleteList = event.removed
		this.moduledbAssCommitModel.insertList = [];
		this.moduledbAssCommitModel.updateList = [];
		this.moduledbAssCommitModel.deleteList = [];
		if (this.moduledbAssInsertList.length > 0) {
            if (!this.moduledbAssValidate(this.moduledbAssInsertList)) {
                return;
            }
            this.moduledbAssInsertList.forEach((element) => {
                element.createUserId=this.sessionManager.getId();
				element.createDatetime=DateFormat.getDate();
            });
            this.moduledbAssInsertList = this.flagConvertion(this.moduledbAssInsertList);
			this.moduledbAssCommitModel.insertList = this.moduledbAssInsertList;
		}
		if (this.moduledbAssUpdateList.length > 0) {
            if (!this.moduledbAssValidate(this.moduledbAssUpdateList)) {
                return;
            }
            this.moduledbAssUpdateList.forEach((element) => {
				element.modifyUserId=this.sessionManager.getId();
				element.modifyDatetime=DateFormat.getDate();
            });
            this.moduledbAssUpdateList = this.flagConvertion(this.moduledbAssUpdateList);
			this.moduledbAssCommitModel.updateList = this.moduledbAssUpdateList;
		}
		if (this.moduledbAssDeleteList.length > 0) {
			this.moduledbAssCommitModel.deleteList = this.moduledbAssDeleteList;
		}
		const scheduleSaveData = this.ouminsdbService.commitModuledbAss(this.moduledbAssCommitModel);
		scheduleSaveData.subscribe(data => {
			if (data === 1) {
				this.moduledbAssExecuteQuery();
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
            } else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		});
    }

    flagConvertion(moduledbAssList: any) {
		moduledbAssList.forEach((element) => {
            element.activeFlag = element.active? 'Y' : 'N';
            element.offenderSpecificFlag = element.offenderSpecific ? 'Y' : 'N';
		});
		return moduledbAssList;
    }

    moduledbAssValidate(moduledbAssList: any) {
        try {
            moduledbAssList.forEach((element) => {
                if (!element.module) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ouminsdb.entermodule');
                    this.show();
                    throw new Error();
                }
                if (!element.dashboard) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ouminsdb.enterdashboard');
                    this.show();
                    throw new Error();
                }
            })
            for (let i = 0; i < this.moduledbAssData.length; i++) {
                for (let j = i + 1; j < this.moduledbAssData.length; j++) {
                    if (this.moduledbAssData[i].module === this.moduledbAssData[j].module) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ouminsdb.moduleexists');
                        this.show();
                        throw new Error();
                    }
                }
            }
        }catch (e) {
            return false;
        }
            return true;
    }

    onModuledbAssGridInsert= () => {
		return {};
    }

    validateRowDataModule = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'module' ) {
            var pattern = new RegExp('^[A-Za-z]+$'); 
            if(!pattern.test(event.data.module)) {
                this.moduledbAssGrid.setColumnData('module', rowIndex, undefined);
                this.type = 'warn';
                this.message = this.translateService.translate('ouminsdb.numbersnotallowed');
                this.show();
            } 
        }
        rowdata.validated = true;
        return rowdata;
    }
      
}