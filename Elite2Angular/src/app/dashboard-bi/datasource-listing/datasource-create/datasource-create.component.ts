import { OumsysetService } from './../../../sa/admin/service/oumsyset.service';
import { OumsysetBean } from './../../../sa/admin/beans/OumsysetBean';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { Item } from './../../BiModelApp';
import { DashboardBiService } from './../../dashboard-bi.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import * as CryptoJS from 'crypto-js';
import { UserSessionManager } from '@core/classes/userSessionManager';
declare var BoldBI: any;
@Component({
  selector: 'app-datasource-create',
  templateUrl: './datasource-create.component.html',
  styleUrls: ['./datasource-create.component.css']
})
export class DatasourceCreateComponent implements OnInit, OnDestroy {
  public datasourceList: Item[];
  result: any;
  datasource: any;
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
    public oumsysetService: OumsysetService,
    private dashboardBiService: DashboardBiService,
    ) {
  }
  ngOnInit() {
    this.getCredentials();
  }
  getToken(){
    this.dashboardBiService.getUserToken().subscribe(data => {
      const result: any = data;
      this.dashboardBiService.token = result.access_token;
      this.getDatasources();
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
            let biInstance = BoldBI.getInstance('datasource-create');
            if (biInstance){
              biInstance.resizeDashboard();
              // biInstance.refreshDashboard();
            }
            this.onResizeInsights();
          }, 2000);
        }
      });
  }
  getDatasources() {
    this.header = new HttpHeaders();
    this.header = this.header.append('Access-Control-Allow-Origin', '*');
    this.header = this.header.append('Authorization', 'bearer ' + this.dashboardBiService.token);
    this.http.get(this.dashboardBiService.dashboardServerApiUrl + "/v2.0/items?ItemType=Datasource", {
      headers: this.header
    }).subscribe(data => {
      this.dashboardBiService.datasources = data;
      this.datasourceList = this.dashboardBiService.datasources;
      this.createdatasource();
    });
  }
  createdatasource() {
    let embedQuerString = "embed_nonce=" + Guid.create() +
      "&embed_mode=connection" +
      "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
      "&embed_expirationtime=100000";
    embedQuerString += "&embed_user_email=" + this.userEmail;
    var embedDetailsUrl = "/embed/authorize?" + embedQuerString + "&embed_signature=" + this.GetSignatureUrl(embedQuerString);
    var serverurl = this.dashboardBiService.dashboardServerApiUrl + embedDetailsUrl;
    let embeddata = this.http.get(serverurl).subscribe(res => {
      this.newDatasource(res);
    });
  }
  GetSignatureUrl(message: string) {
    var hash = CryptoJS.HmacSHA256(message, this.embedSecret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  }
  newDatasource(dataObj) {
    this.datasource = BoldBI.create({
      serverUrl: this.dashboardBiService.baseUrl,
      embedContainerId: "datasource-create",
      embedType: BoldBI.EmbedType.Component,
      environment: this.environment == "enterprise" ? BoldBI.Environment.Enterprise : BoldBI.Environment.Cloud,
      width: "100%",
      height: "100%",
      mode: BoldBI.Mode.Connection,
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
    this.datasource.loadDatasource();
  }
  onResizeInsights() {
    this.datasource.resizeDashboard();
  }
  backRoute() {
    let biInstance = BoldBI.getInstance('datasource-create');
    if (biInstance){
      this.datasource.destroy();
      biInstance.destroyStyles();
    }
    this.router.navigate(["/BIDATASOURCE"]);
  }
  ngOnDestroy(){
    let biInstance = BoldBI.getInstance('datasource-create');
    if (biInstance){
      biInstance.destroy();
      biInstance.destroyStyles();
      const element = document.querySelectorAll('[id^="datasource-create_embeddedbi"]');
      if (element) {
        element.forEach((element) => { element.remove() });
      }
      this.datasource = biInstance;
    }
  }
}

