import { OumsysetService } from './../../../sa/admin/service/oumsyset.service';
import { OumsysetBean } from './../../../sa/admin/beans/OumsysetBean';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import * as CryptoJS from 'crypto-js';
import { TranslateService } from '@common/translate/translate.service';
import { Item } from '../../BiModelApp';
import { DashboardBiService } from '../../dashboard-bi.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
declare var BoldBI: any;

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.css'],
})
export class DashboardEditComponent implements OnInit, OnDestroy {

  public dashboardsList: Item[];
  isPreview = false;
  dashboard: any;
  dashboardId: any;
  result: any;
  private header: HttpHeaders;
  private head: HttpHeaders;
  oumsysetModel: OumsysetBean = new OumsysetBean();
  systemSetData = [];
  InsightRoolUrl: any;
  environment: string;
  siteIdentifier: string;
  embedSecret: string;
  userEmail: string;
  @ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;
  constructor(
    public translateService: TranslateService,
    private http: HttpClient,
    private router: Router,
    private sessionManager: UserSessionManager,
    private dashboardBiService: DashboardBiService,
    public oumsysetService: OumsysetService,
    ) {
    if (this.dashboardBiService.formData.Id == undefined || this.dashboardBiService.formData.Id == '') {
      window.history.back();
    }
  }
  ngOnInit() {
    this.dashboardId = this.dashboardBiService.formData;
    this.getCredentials();
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
  getToken(){
    this.dashboardBiService.getUserToken().subscribe(data => {
      const result: any = data;
      this.dashboardBiService.token = result.access_token;
      this.dashboardDetails(this.dashboardId);
    });
  }
  getCredentials(){
    const userSession = this.sessionManager.userSessionDetails();
    const userId = userSession.id;
    this.dashboardBiService.getInsightUserMail(userId).subscribe((result: any) => {
        this.userEmail = result;
        this.getDetails();
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
  ngAfterViewInit(){
    this.dashboardBiService.toggle.subscribe(
      (e)=>{
        if(e){
          setTimeout(() => {
            let biInstance = BoldBI.getInstance('dashboardEdit');
            if (biInstance){
              biInstance.resizeDashboard();
              // biInstance.refreshDashboard();
            }
            this.onResizeInsights();
          }, 2000);
        }
      });
  }
  // getDashboard() {
  //   this.header = new HttpHeaders();
  //   this.header = this.header.append('Access-Control-Allow-Origin', '*');
  //   this.header = this.header.append('Authorization', 'bearer ' + this.dashboardBiService.token);
  //   this.http.get(this.dashboardBiService.dashboardServerApiUrl + "/v2.0/users/aman.agnihotri@espire.com", {
  //     headers: this.header
  //   }).subscribe(data => {
  //     const getAccess = data;
      
  //   });
  //   this.http.get(this.dashboardBiService.dashboardServerApiUrl + "/v2.0/items?ItemType=Dashboard", {
  //     headers: this.header
  //   }).subscribe(data => {
  //     this.dashboardBiService.dashboards = data;
  //     this.dashboardsList = this.dashboardBiService.dashboards;
  //     this.dashboardDetails(this.dashboardId);
  //   });
  // }
  dashboardDetails(dashboard: Item) {
    let embedQuerString = "embed_nonce=" + Guid.create() +
      "&embed_dashboard_id=" + dashboard.Id +
      "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
      "&embed_expirationtime=100000";
    embedQuerString += "&embed_user_email=" + this.userEmail;
    var embedDetailsUrl = "/embed/authorize?" + embedQuerString + "&embed_signature=" + this.GetSignatureUrl(embedQuerString);
    var serverurl = this.dashboardBiService.dashboardServerApiUrl + embedDetailsUrl;
    let embeddata = this.http.get(serverurl).subscribe(res => {
      this.onEditDashboard(res);
    });
  }
  GetSignatureUrl(message: string) {
    var hash = CryptoJS.HmacSHA256(message, this.embedSecret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  }
  onEditDashboard(dataObj) {
    this.dashboard = BoldBI.create({
      serverUrl: this.dashboardBiService.baseUrl,
      dashboardId: this.dashboardId.Id,
      embedContainerId: "dashboardEdit",
      mode: BoldBI.Mode.Design,
      embedType: BoldBI.EmbedType.Component,
      environment: this.environment == "enterprise" ? BoldBI.Environment.Enterprise : BoldBI.Environment.Cloud,
      width: "100%",
      height: "100%",
      expirationTime: 100000,
      authorizationServer: {
        url: '',
        data: dataObj
      },
      autoRefreshSettings: {
        enabled: false,
      },
      dashboardSettings: {
        showRefresh: true,
        showPreviewAs: true,
        showDashboardParameter: true,
        enableFullScreen: true,
        showMoreOption: true,
        showHeader: true,
      },
      actionBegin: "emdbedDashboardActionBegin",
      actionComplete: "emdbedDashboardActionComplete"
    });
    this.dashboard.loadDesigner();
  }
  onResizeInsights() {
    this.dashboard.resizeDashboard();
  }
  backRoute() {
    let biInstance = BoldBI.getInstance('dashboardEdit');
    if (biInstance){
      biInstance.destroy();
      biInstance.destroyStyles();
      const element = document.querySelectorAll('[id^="dashboardEdit_embeddedbi"]');
      if (element) {
        element.forEach((element) => { element.remove() });
      }
      this.dashboard = biInstance;
    }
    this.router.navigate(["/INSIGHTS"]);
  }
  preview() {
    this.isPreview = true;
  }
  ngOnDestroy(){
    let biInstance = BoldBI.getInstance('dashboardEdit');
    if (biInstance){
      biInstance.destroy();
      biInstance.destroyStyles();
      const element = document.querySelectorAll('[id^="dashboardEdit_embeddedbi"]');
      if (element) {
        element.forEach((element) => { element.remove() });
      }
      this.dashboard = biInstance;
    }
  }
}
