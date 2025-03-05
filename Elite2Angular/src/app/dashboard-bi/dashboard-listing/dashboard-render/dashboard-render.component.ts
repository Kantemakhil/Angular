import { OumsysetService } from './../../../sa/admin/service/oumsyset.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { Item } from '../../BiModelApp';
import { DashboardBiService } from '../../dashboard-bi.service';
import { Guid } from 'guid-typescript';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OumsysetBean } from './../../../sa/admin/beans/OumsysetBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Dialog } from '@syncfusion/ej2-popups';
declare var BoldBI: any;
@Component({
  selector: 'app-dashboard-render',
  templateUrl: './dashboard-render.component.html',
  styleUrls: ['./dashboard-render.component.css']
})
export class DashboardRenderComponent implements OnInit, OnDestroy {
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
  constructor(
    private http: HttpClient,
    public translateService: TranslateService,
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
  getToken(){
    this.dashboardBiService.getUserToken().subscribe(data => {
      const result: any = data;
      this.dashboardBiService.token = result.access_token;
      this.dashboardDetails(this.dashboardId);
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
            let biInstance = BoldBI.getInstance('dashboardRender');
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
      this.renderDashboard(res);
    });
  }
  GetSignatureUrl(message: string) {
    var hash = CryptoJS.HmacSHA256(message, this.embedSecret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  }
  renderDashboard(dataObj) {
    this.dashboard = BoldBI.create({
      serverUrl: this.dashboardBiService.baseUrl,
      dashboardId: this.dashboardId.Id,
      embedContainerId: "dashboardRender",
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
      beforeNavigateUrlLinking: (args: any) => {
        args.cancel = true;
        this.linkedDashboardDetails(args);
      }
    });
    this.dashboard.loadDashboard();
  }
  linkedDashboardDetails(args: any) {
    let linkedDashboardId = this.dashboardBiService.dashboards.filter((dashboard) => {
      let dashboardName = args.linkInfo.url.split("&")[0].split('dashboardName=')[1];
      if(dashboardName.includes('%20')){
        dashboardName = dashboardName.replace('%20', ' ');
      }
      return dashboardName === dashboard.Name
    }).map((dashboard) => {
        console.log(dashboard.Id)
        return dashboard.Id
    })
    let embedQuerString = "embed_nonce=" + Guid.create() +
      "&embed_dashboard_id=" + linkedDashboardId[0] +
      "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
      "&embed_expirationtime=100000";
    embedQuerString += "&embed_user_email=" + this.userEmail;
    var embedDetailsUrl = "/embed/authorize?" + embedQuerString + "&embed_signature=" + this.GetSignatureUrl(embedQuerString);
    var serverurl = this.dashboardBiService.dashboardServerApiUrl + embedDetailsUrl;
    this.http.get(serverurl).subscribe((res: any) => {
      const linkedDataObj = res;
      this.clientBeforeNavigateUrlLinking(args, linkedDataObj, linkedDashboardId);
    });
  }
  clientBeforeNavigateUrlLinking(arg, linkedDataObj, linkedDashboardId){
      const ulrLinkTarget = document.getElementById("ulrLink_target");
      if (ulrLinkTarget) ulrLinkTarget.remove();
      const targetContainer = document.createElement("div");
      targetContainer.id = "ulrLink_target";
      const dlgDiv = document.createElement("div");
      dlgDiv.id = "sample_dialog";
      targetContainer.appendChild(dlgDiv);
      document.body.appendChild(targetContainer);
      const dialogHeaderName = arg.model.dashboardName;
      const targetElement = document.getElementById("ulrLink_target");
      if (targetElement) {
          const dialog = new Dialog({
              header: dialogHeaderName,
              width: window.innerWidth - 70 + "px",
              showCloseIcon: true,
              isModal: true,
              target: targetElement,
              height: "650px",
              content: '<div id="urlLinkDbrd"></div>',
          });
          dialog.appendTo("#sample_dialog");
      }
      // const itemId = arg.model.itemId;
      const dlgContent = document.querySelector('#ulrLink_target .e-dlg-content');
      const filterParams = arg.linkInfo.parameterDetails[0].parameter + '=' + arg.linkInfo.parameterDetails[0].value;
      console.log(JSON.stringify(filterParams));
      const dlgOverlays = document.querySelectorAll('.e-dlg-overlay');
      const layoutFixedHeight = document.querySelector('.layout-fixed')?.clientHeight;
      dlgOverlays.forEach((overlay: any) => {
          overlay.style.height = layoutFixedHeight + 'px';
      });
     //Render dashboard in pop-up
      const urlLinkDbrd = BoldBI.create({
          serverUrl: this.dashboardBiService.baseUrl,
          dashboardId: linkedDashboardId[0], //Use your dashboard ID to render in the pop-up
          embedContainerId: "urlLinkDbrd",
          embedType: BoldBI.EmbedType.Component,
          environment: this.environment == "enterprise" ? BoldBI.Environment.Enterprise : BoldBI.Environment.Cloud, //Provide the environment value as "onpremise" or "cloud"
          width: "100%",
          height: "100%",
          expirationTime: 100000,
          authorizationServer: {
            url: '',
            data: linkedDataObj
          },
          dashboardSettings: {
            showHeader: false,
            showRefresh: false,
            showPreviewAs: false,
            showDashboardParameter: false,
            enableFullScreen: false,
            showMoreOption: false,
          },
          filterParameters: filterParams,
      });
      urlLinkDbrd.loadDashboard();
  }
  onResizeInsights() {
    this.dashboard.resizeDashboard();
  }
  backRoute() {
    let biInstance = BoldBI.getInstance('dashboardRender');
    if (biInstance){
      biInstance.destroy();
      biInstance.destroyStyles();
      const element = document.querySelectorAll('[id^="dashboardRender_embeddedbi"]');
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
    let biInstance = BoldBI.getInstance('dashboardRender');
    if (biInstance){
      biInstance.destroy();
      biInstance.destroyStyles();
      const element = document.querySelectorAll('[id^="dashboardRender_embeddedbi"]');
      if (element) {
        element.forEach((element) => { element.remove() });
      }
      this.dashboard = biInstance;
    }
  }
}
