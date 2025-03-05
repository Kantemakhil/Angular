import { OumsysetService } from './../../sa/admin/service/oumsyset.service';
import { OumsysetBean } from './../../sa/admin/beans/OumsysetBean';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardBiService } from './../dashboard-bi.service';
import { Component, OnInit } from '@angular/core';
import { DatasourceItem } from '../BiModelApp';
import { InsightBeans } from '../beans/insightBeans';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
declare var BoldBI: any;
@Component({
  selector: 'app-datasource-listing',
  templateUrl: './datasource-listing.component.html',
  styleUrls: ['./datasource-listing.component.css']
})
export class DatasourceListingComponent implements OnInit {

  public datasourcesList: DatasourceItem[];
  result: any;
  datasource: any;
  msgs: any;
  datasrcGridDef: any[];
  datasrcGridList: InsightBeans[] = [];
  selectedRow: any;
  msglist: any[];
  private header: HttpHeaders;
  private head: HttpHeaders;
  oumsysetModel: OumsysetBean = new OumsysetBean();
  systemSetData = [];
  InsightRoolUrl: any;
  environment: string;
  siteIdentifier: string;
  embedSecret: string;
  userEmail: string;
  userAuthEmail: string;
  isCreateAccess: boolean = false;
  boldBIUserId: number;
  isEditHide: boolean = true;
  insightUserId: string;
  constructor(
    public translateService: TranslateService,
    private http: HttpClient,
    private router: Router,
    private sessionManager: UserSessionManager,
    public oumsysetService: OumsysetService,
    private dashboardBiService: DashboardBiService,
    ) {
  }
  ngOnInit() {
    this.datasrcGridDef = [
      {
        fieldName: this.translateService.translate('Name'), field: 'Name',
        datatype: 'hyperlink', displayas: 'href', link: '/DTSREDIT', data: 'row', modal: false,
        onLaunchClick: this.onEditLaunchClick, editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('Description'),
        uppercase: 'false', field: 'Description', datatype: 'text', editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('Created By'),
        field: 'CreatedByDisplayName', datatype: 'text', editable: false, width: 150,
      },
      {
        fieldName: this.translateService.translate('Edit'),
        field: 'checkoutButton', datatype: 'hyperlink', displayas: 'image',
        editable: false, link: '/DTSREDIT', width: 100,
        data: 'row', modal: false, onLaunchClick: this.onEditLaunchClick
      },
    ]
    this.getUserToken();
    // this.getUserEmail();
  }
  getUserEmail(){
    const userSession = this.sessionManager.userSessionDetails();
    const userId = userSession.id;
    this.dashboardBiService.getInsightUserMail(userId).subscribe((result: any) => {
        this.userEmail = result;
        if(!this.userEmail){
          this.show(
              this.translateService.translate("insights.UserEmailNotAssociatedWithInsights"),
              "warn"
          );
      } else {
        this.getBiUser(this.userEmail, this.dashboardBiService.adminToken);
      }
    });
  }
  getDetails(){
    this.oumsysetModel.settingType = 'INSIGHTS';
    this.oumsysetModel.settingProviderCode = 'INSIGHTS';
    this.oumsysetService.loadJsonData(this.oumsysetModel).subscribe((result) => {
        const rowData = JSON.parse(result.settingValue);
        this.systemSetData = rowData;
        this.environment = this.getKeyCodeValue("INS_ENV");
        this.siteIdentifier = this.getKeyCodeValue("INS_SITE_IDF");
        this.embedSecret = this.getKeyCodeValue("INS_EMB_SEC");
        this.InsightRoolUrl = this.getKeyCodeValue("INSI_SER_URL");
        this.insightUserId = this.getKeyCodeValue("INS_USER_ID");
        this.getAdminDetails();
    }); 
  }
  getAdminDetails() {
    this.oumsysetModel.settingType = 'INSIGHTS';
    this.oumsysetModel.settingProviderCode = 'AUTH';
    this.oumsysetService.loadJsonData(this.oumsysetModel).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      this.systemSetData = rowData;
      this.userAuthEmail = this.getKeyCodeValue("USERNAME");
      this.getAdminToken(this.userAuthEmail);
      
    }); 
  }
  getUserToken(){
    this.dashboardBiService.getUserToken().subscribe(data => {
      const result: any = data;
      this.dashboardBiService.token = result.access_token;
      // this.getBiUser(this.userEmail, this.dashboardBiService.adminToken);
      this.getDataSource(this.dashboardBiService.token);
    });
    // if (this.dashboardBiService.environment == "enterprise") {
    //   this.dashboardBiService.baseUrl = this.InsightRoolUrl + "/" + this.siteIdentifier;
    //   this.dashboardBiService.dashboardServerApiUrl = this.InsightRoolUrl + "/api/" + this.siteIdentifier;
    // } else {
    //   this.dashboardBiService.baseUrl = this.InsightRoolUrl;
    //   this.dashboardBiService.dashboardServerApiUrl = this.InsightRoolUrl + "/api/";
    // }
    // this.head = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    // let body = new HttpParams();
    // body = body.set('username', this.userEmail);
    // body = body.set('embed_secret', this.embedSecret);
    // body = body.set('grant_type', 'embed_secret');
    // var accessurl = this.dashboardBiService.dashboardServerApiUrl + '/token'
    // this.http.post(accessurl, body, {
    //   headers: this.head
    // }).subscribe(data => {
    //   const result: any = data;
    //   this.dashboardBiService.token = result.access_token;
    //   this.getBiUser(this.userEmail, this.dashboardBiService.adminToken);
    //   this.getDataSource();
    // });
  }
  getAdminToken(email) {
    let currentEmail = email;
    if (this.dashboardBiService.environment == "enterprise") {
        this.dashboardBiService.baseUrl = this.InsightRoolUrl + "/" + this.siteIdentifier;
        this.dashboardBiService.dashboardServerApiUrl = this.InsightRoolUrl + "/api/" + this.siteIdentifier;
    } else {
        this.dashboardBiService.baseUrl = this.InsightRoolUrl;
        this.dashboardBiService.dashboardServerApiUrl = this.InsightRoolUrl + "/api";
    }
    const dashboardId = this.dashboardBiService.getAdminToken(currentEmail);
    dashboardId.subscribe(data => {
      const result: any = data;
      this.dashboardBiService.adminToken = result.access_token;
      this.getUserToken();
      // this.getDashboard();
    });
  }
  getBiUser(email, token){
    this.dashboardBiService.getBiUser(email, token).subscribe(data => {
        const getAccess = data;
        this.boldBIUserId = getAccess['UserId'];
        this.getPermission(this.boldBIUserId, token);
    });
  }
  getPermission(id, token){
    let getInsightsRights = JSON.parse(sessionStorage.getItem('insightsRights'));
    console.log(getInsightsRights);
    
    // this.dashboardBiService.getUserPermissions(id, token).subscribe(
    //     (res) => {
    //       const fetchedPerms = res;
    //       if (fetchedPerms) {
    //         const filtered = this.getCreatePermArr("Create", fetchedPerms);
    //         if(filtered){
    //           const createPerm = filtered.find(x => x.PermissionId === 23);
    //           if (createPerm) {
    //             if(createPerm.PermissionId === 23 && createPerm.PermissionAccess === "Create") {
    //               this.isCreateAccess = true;
    //             }
    //           } else {
    //             this.isCreateAccess = false;
    //           }
    //         } else {
    //           this.show(
    //             this.translateService.translate('insights.itSeemsYouDontHaveAccessOfCreation'), 
    //             'info'
    //           );
    //         }
    //       } else {
    //         this.show(
    //           this.translateService.translate('insights.datasourceAccessDenied'), 
    //           'warn'
    //         );
    //       }
    //     },
    // );
  }
  getPermissionGroups(grpId: any, token: string){
    this.dashboardBiService.getUserGroups(grpId, token).subscribe(
      (res) => {
        const fetchedGroups = res;
      }
    );
  }
  getDataSource(adminToken) {
    let getInsightsRights = JSON.parse(sessionStorage.getItem('insightsRights'));
    if(getInsightsRights.canCreateDatasource == 'Y' || getInsightsRights.canReadDatasource == 'Y'){
      if (getInsightsRights.canCreateDatasource == 'Y'){
        this.isCreateAccess = true;
      } else {
        this.isCreateAccess = false;
      }
    } else {
      this.isCreateAccess = false;
    }
    const getDataSources = this.dashboardBiService.getDataSources(adminToken);
    getDataSources.subscribe(data => {
      if(data){
      this.dashboardBiService.datasources = data;
      this.datasrcGridList = this.dashboardBiService.datasources;
      for (let i=0; i<this.datasrcGridList.length; i++){
        if(this.datasrcGridList[i].CanRead && !this.datasrcGridList[i].CanWrite && !this.datasrcGridList[i].CanDelete){
          this.datasrcGridList[i]['checkoutButton'] = '';
        } else if (this.datasrcGridList[i].CanRead && this.datasrcGridList[i].CanWrite && !this.datasrcGridList[i].CanDelete) {
            this.datasrcGridList[i]['checkoutButton'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
        } else if (this.datasrcGridList[i].CanRead && this.datasrcGridList[i].CanWrite && this.datasrcGridList[i].CanDelete ) {
            this.datasrcGridList[i]['checkoutButton'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
        }
      }
    } else {
      this.show(
          this.translateService.translate('insights.RecordsNotFound'), 
          'warn'
      );
  }
      // this.datasourcesList = this.dashboardBiService.datasources;
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
  getCreatePermArr(code, arr){
    const filteredData = arr.filter((x) => x.PermissionAccess === code);
    return filteredData
  }
  onEditLaunchClick = (data) => {
    if (data) {
      this.selectedRow = data;
      this.dashboardBiService.formData = data;
    }
    return true;
  }
  newDatasource() {
    this.router.navigate(['/DTSRCREATE']);
  }
  show(vldmsg, type?) {
    type = type ? type : "warn";
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
}
