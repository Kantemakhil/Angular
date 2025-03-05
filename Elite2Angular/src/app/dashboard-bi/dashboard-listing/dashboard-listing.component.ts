import { Router } from '@angular/router';
import { DashboardBiService } from './../dashboard-bi.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../BiModelApp';
import { TranslateService } from '@common/translate/translate.service';
import { InsightBeans } from '../beans/insightBeans';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OumsysetBean } from './../../sa/admin/beans/OumsysetBean';
import { OumsysetService } from './../../sa/admin/service/oumsyset.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
declare var BoldBI: any;

@Component({
    selector: 'app-dashboard-listing',
    templateUrl: './dashboard-listing.component.html',
    styleUrls: ['./dashboard-listing.component.css'],
})
export class DashboardListingComponent implements OnInit {
    public dashboardsList: Item[];
    dashboard: any[] = [];
    msgs: any;
    insightGridDef: any[];
    insightGridList: InsightBeans[] = [];
    msglist: any[];
    selectedRow: any;
    result: any;
    private header: HttpHeaders;
    private head: HttpHeaders;
    oumsysetModel: OumsysetBean = new OumsysetBean();
    systemSetData = [];
    InsightRoolUrl: any;
    environment: string;
    siteIdentifier: string;
    insightUserId: string;
    embedSecret: string;
    userEmail: string;
    userAuthEmail: string;
    isCreateAccess: boolean = false;
    boldBIUserId: number;
    isEditHide: boolean = true;
    constructor(
        private http: HttpClient,
        public translateService: TranslateService,
        private router: Router,
        private sessionManager: UserSessionManager,
        public oumsysetService: OumsysetService,
        private dashboardBiService: DashboardBiService,
        ) {
    }
    ngOnInit() {
        this.insightGridDef = [
            {
                fieldName: this.translateService.translate('Name'), field: 'Name',
                datatype: 'hyperlink', displayas: 'href', link: '/DSHBVIEW', data: 'row', modal: false,
                onLaunchClick: this.onEditLaunchClick, editable:false, width: 150
            },
            {
                fieldName: this.translateService.translate('Categories'),
                uppercase: 'false', field: 'CategoryName', datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('Created By'),
                field: 'CreatedByDisplayName', datatype: 'text', editable: false, width: 150,
            },
            {
                fieldName: this.translateService.translate('Edit'),
                field: 'checkoutButton', datatype: 'hyperlink', displayas: 'image',
                editable: false, link: '/DSHBEDIT', width: 100,
                data: 'row', modal: false, onLaunchClick: this.onEditLaunchClick
            },
        ]
        this.getUserToken();
    }
    getUserToken() {
        this.dashboardBiService.getUserToken().subscribe(data => {
            const result: any = data;
            this.dashboardBiService.token = result.access_token;
            this.getDashboards(this.dashboardBiService.token);
            
          });
    }
    getDashboards(adminToken) {
        let getInsightsRights = JSON.parse(sessionStorage.getItem('insightsRights'));
        if (getInsightsRights.canCreateDashboard == 'Y' || getInsightsRights.canReadDashboard == 'Y') {
            if (getInsightsRights.canCreateDashboard == 'Y') {
                this.isCreateAccess = true;
            } else {
                this.isCreateAccess = false;
            }
        } else {
            this.isCreateAccess = false;
        }
        const getDashboards = this.dashboardBiService.getDashboards(adminToken);
        getDashboards.subscribe(data => {
            if(data){
                this.dashboardBiService.dashboards = data;
                this.insightGridList = this.dashboardBiService.dashboards;
                for (let i=0; i<this.insightGridList.length; i++){
                    if(this.insightGridList[i].CanRead && !this.insightGridList[i].CanWrite && !this.insightGridList[i].CanDelete){
                        this.insightGridList[i]['checkoutButton'] = '';
                    } else if (this.insightGridList[i].CanRead && this.insightGridList[i].CanWrite && !this.insightGridList[i].CanDelete) {
                        this.insightGridList[i]['checkoutButton'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
                    } else if (this.insightGridList[i].CanRead && this.insightGridList[i].CanWrite && this.insightGridList[i].CanDelete ) {
                        this.insightGridList[i]['checkoutButton'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
                    } 
                }
            } else {
                this.show(
                    this.translateService.translate('insights.RecordsNotFound'), 
                    'warn'
                );
            }
            // this.dashboardsList = this.dashboardBiService.dashboards;
        });
    }
    getCreatePermArr(code, arr){
        const filteredData = arr.filter((x) => x.PermissionAccess === code);
        return filteredData
    }
    getKeyCodeValue(keycode){
        for (let i=0; i<this.systemSetData.length; i++) {
            if(this.systemSetData[i].KEY_CODE == keycode){
                return this.systemSetData[i].VALUE;
            }
        }
        return null
    }
    onEditLaunchClick = (data) => {
        if (data) {
            this.selectedRow = data;
            this.dashboardBiService.formData = data;
        }
        return true;
    }
    newDashboard() {
        this.router.navigate(['/DSHBCREATE']);
    }
    show(vldmsg, type?) {
        type = type ? type : "warn";
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    
}
