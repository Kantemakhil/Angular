import { OumsysetBean } from './../../../sa/admin/beans/OumsysetBean';
import { OumsysetService } from './../../../sa/admin/service/oumsyset.service';
import { Router } from '@angular/router';
import { DashboardBiService } from './../../dashboard-bi.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { Item } from './../../BiModelApp';
import { Guid } from 'guid-typescript';
import * as CryptoJS from 'crypto-js';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { UserSessionManager } from '@core/classes/userSessionManager';
declare var BoldBI: any;
@Component({
  selector: 'app-dashboard-create',
  templateUrl: './dashboard-create.component.html',
  styleUrls: ['./dashboard-create.component.css']
})
export class DashboardCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  public dashboardsList: Item[];
  dashboard: any;
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
  constructor(
    private http: HttpClient,
    public translateService: TranslateService,
    private router: Router,
    private sessionManager: UserSessionManager,
    private dashboardBiService: DashboardBiService,
    public oumsysetService: OumsysetService,
    ) {
  }
  ngOnInit() {
    this.getCredentials();
  }
  getCredentials(){
    const userSession = this.sessionManager.userSessionDetails();
    const userId = userSession.id;
    this.dashboardBiService.getInsightUserMail(userId).subscribe((result: any) => {
        this.userEmail = result;
        this.getDetails();
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
  getToken(){
    this.dashboardBiService.getUserToken().subscribe(data => {
      const result: any = data;
      this.dashboardBiService.token = result.access_token;
      this.getDashboard(this.dashboardBiService.token);
    });
  }
  getDashboard(token: string) {
    this.header = new HttpHeaders();
    this.header = this.header.append('Access-Control-Allow-Origin', '*');
    this.header = this.header.append('Authorization', 'bearer ' + this.dashboardBiService.token);
    this.http.get(this.dashboardBiService.dashboardServerApiUrl + "/v2.0/items?ItemType=Dashboard", {
      headers: this.header
    }).subscribe(data => {
      this.dashboardBiService.dashboards = data;
      this.dashboardsList = this.dashboardBiService.dashboards;
      this.createdashboard();
    });
  }
  createdashboard() {
    let embedQuerString = "embed_nonce=" + Guid.create() +
      "&embed_mode=design" +
      "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
      "&embed_expirationtime=100000";
    embedQuerString += "&embed_user_email=" + this.userEmail;
    var embedDetailsUrl = "/embed/authorize?" + embedQuerString + "&embed_signature=" + this.GetSignatureUrl(embedQuerString);
    var serverurl = this.dashboardBiService.dashboardServerApiUrl + embedDetailsUrl;
    let embeddata = this.http.get(serverurl).subscribe(res => {
      this.newDashboard(res);
    });
  }
  newDashboard(dataObj) {
    this.dashboard = BoldBI.create({
      serverUrl: this.dashboardBiService.baseUrl,
      embedContainerId: "dashboardCreate",
      embedType: BoldBI.EmbedType.Component,
      environment: this.environment == "enterprise" ? BoldBI.Environment.Enterprise : BoldBI.Environment.Cloud,
      width: "100%",
      height: "100%",
      mode: BoldBI.Mode.Design,
      expirationTime: 100000,
      authorizationServer: {
        url: '',
        data: dataObj
      },
      autoRefreshSettings: {
        enabled: true,
        hourlySchedule: {
          hours: 0,
          minutes: 10,
          seconds: 0
        }
      },
      actionBegin: "emdbedDashboardActionBegin",
      actionComplete: "emdbedDashboardActionComplete"
    });
    this.dashboard.loadDesigner();
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
            let biInstance = BoldBI.getInstance('dashboardCreate');
            if (biInstance){
              biInstance.resizeDashboard();
              // biInstance.refreshDashboard();
            }
            this.onResizeInsights();
          }, 2000);
        }
      });
  }
  GetSignatureUrl(message: string) {
    var hash = CryptoJS.HmacSHA256(message, this.embedSecret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  }
  onResizeInsights(){
    this.dashboard.resizeDashboard();
  }
  backRoute() {
    let biInstance = BoldBI.getInstance('dashboardCreate');
    if (biInstance){
      biInstance.destroy();
      biInstance.destroyStyles();
      const element = document.querySelectorAll('[id^="dashboardCreate_embeddedbi"]');
      if (element) {
        element.forEach((element) => { element.remove() });
      }
      this.dashboard = biInstance;
    }
    this.router.navigate(["/INSIGHTS"]);
  }
  ngOnDestroy(){
    let biInstance = BoldBI.getInstance('dashboardCreate');
    if (biInstance){
      biInstance.destroy();
      biInstance.destroyStyles();
      const element = document.querySelectorAll('[id^="dashboardCreate_embeddedbi"]');
      if (element) {
        element.forEach((element) => { element.remove() });
      }
      this.dashboard = biInstance;
    }
  }
}
