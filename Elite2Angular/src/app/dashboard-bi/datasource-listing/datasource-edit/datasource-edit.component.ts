import { OumsysetBean } from './../../../sa/admin/beans/OumsysetBean';
import { OumsysetService } from './../../../sa/admin/service/oumsyset.service';
import { Router } from '@angular/router';
import { DashboardBiService } from './../../dashboard-bi.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DatasourceItem } from '../../BiModelApp';
import { Guid } from 'guid-typescript';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserSessionManager } from '@core/classes/userSessionManager';
declare var BoldBI: any;
@Component({
  selector: 'app-datasource-edit',
  templateUrl: './datasource-edit.component.html',
  styleUrls: ['./datasource-edit.component.css']
})
export class DatasourceEditComponent implements OnInit, OnDestroy {
  public dataSourceList: DatasourceItem[];
  isPreview = false;
  datasource: any;
  datasourceId: any;
  selectedData: any;
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
  instance: any;
  instance1: any;
  constructor(
    private http: HttpClient,
    public translateService: TranslateService,
    private router: Router,
    private sessionManager: UserSessionManager,
    public oumsysetService: OumsysetService,
    private dashboardBiService: DashboardBiService,
    ) {
    if (this.dashboardBiService.formData.Id == undefined || this.dashboardBiService.formData.Id == '') {
      window.history.back();
    }
  }
  ngOnInit() {
    this.datasourceId = this.dashboardBiService.formData;
    this.getCredentials();
  }
  getToken(){
    this.dashboardBiService.getUserToken().subscribe(data => {
      const result: any = data;
      this.dashboardBiService.token = result.access_token;
      // this.getBiUser(this.dashboardBiService.userEmail, this.dashboardBiService.adminToken);
      this.getDataSource();
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
      this.dashboardBiService.userEmail = result;
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
            let biInstance = BoldBI.getInstance('datasourceEdit');
            if (biInstance){
              biInstance.resizeDashboard();
              // biInstance.refreshDashboard();
            }
            this.onResizeInsights();
          }, 2000);
        }
      });
  }
  getDataSource() {
    this.header = new HttpHeaders();
    this.header = this.header.append('Access-Control-Allow-Origin', '*');
    this.header = this.header.append('Authorization', 'bearer ' + this.dashboardBiService.token);
    this.http.get(this.dashboardBiService.dashboardServerApiUrl + "/v4.0/items?ItemType=Datasource", {
      headers: this.header
    }).subscribe(data => {
      this.dashboardBiService.datasources = data;
      this.dataSourceList = this.dashboardBiService.datasources;
      this.datasourceDetails(this.datasourceId);
    });
  }
  datasourceDetails(datasource: DatasourceItem) {
    let embedQuerString = "embed_nonce=" + Guid.create() +
      "&embed_dashboard_id=" + datasource.Id +
      "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
      "&embed_expirationtime=100000";
    embedQuerString += "&embed_user_email=" + this.dashboardBiService.userEmail;
    var embedDetailsUrl = "/embed/authorize?" + embedQuerString + "&embed_signature=" + this.GetSignatureUrl(embedQuerString);
    var serverurl = this.dashboardBiService.dashboardServerApiUrl + embedDetailsUrl;
    let embeddata = this.http.get(serverurl).subscribe(res => {
      this.onEditDatasource(res);
    });
  }
  GetSignatureUrl(message: string) {
    var hash = CryptoJS.HmacSHA256(message, this.embedSecret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  }
  onEditDatasource(dataObj) {
    this.datasource = BoldBI.create({
      serverUrl: this.dashboardBiService.baseUrl,
      datasourceId: this.datasourceId.Id,
      embedContainerId: "datasourceEdit",
      embedType: BoldBI.EmbedType.Component,
      environment: this.environment == "enterprise" ? BoldBI.Environment.Enterprise : BoldBI.Environment.Cloud,
      mode: BoldBI.Mode.DataSource,
      width: "100%",
      height: "100%",
      authorizationServer: {
        url: '',
        data: dataObj
      },
      expirationTime: 100000,
      autoRefreshSettings: {
        enabled: true,
        hourlySchedule: {
          hours: 0,
          minutes: 1,
          seconds: 0
        }
      },
    });
    this.datasource.loadDatasource();
    // this.instance = this.datasource.getInstance("datasource-edit");
    // 
  }
  onResizeInsights() {
    this.datasource.resizeDashboard();
  }
  preview() {
    this.isPreview = true;
  }
  backRoute() {
    let biInstance = BoldBI.getInstance('datasourceEdit');
    if (biInstance){
      biInstance.destroy();
      biInstance.destroyStyles();
      const element = document.querySelectorAll('[id^="datasourceEdit_embeddedbi"]');
      if (element) {
        element.forEach((element) => { element.remove() });
      }
      this.datasource = biInstance;
    }
    this.router.navigate(["/BIDATASOURCE"]);
  }
  ngOnDestroy(){
    let biInstance = BoldBI.getInstance('datasourceEdit');
    if (biInstance){
      biInstance.destroy();
      biInstance.destroyStyles();
      const element = document.querySelectorAll('[id^="datasourceEdit_embeddedbi"]');
      if (element) {
        element.forEach((element) => { element.remove() });
      }
      this.datasource = biInstance;
    }
  }
}
