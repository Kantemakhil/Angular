import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, KeyValueDiffer, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { FormsBuilderBean } from '@core/ui-components/dynamic-forms/forms-builder-bean';
import { Item } from 'app/dashboard-bi/BiModelApp';
import { DashboardBiService } from 'app/dashboard-bi/dashboard-bi.service';
import { Guid } from 'guid-typescript';
import * as CryptoJS from 'crypto-js';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { OumsysetBean } from '@sa/admin/beans/OumsysetBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { InjectOffenderService } from '@core/service/inject-offender.service';
import { RedirectUtil } from '@core/classes/redirectUtil';
declare var BoldBI: any;

@Component({
  selector: 'app-dsbmod-renderer',
  templateUrl: './dsbmod-renderer.component.html',
  styleUrls: ['./dsbmod-renderer.component.css']
})
export class DsbmodRendererComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
  @Input() userFormData: FormsBuilderBean;
  rendData: any;
  dataId: any;
  msglist: any[];
  msgs: any[];
  currentForm: any;
  public dashboardsList: Item[];
  isPreview = false;
  dashboard: any;
  dashboardId: any;
  result: any;
  oumsysetModel: OumsysetBean = new OumsysetBean();
  systemSetData = [];
  InsightRoolUrl: any;
  environment: string;
  siteIdentifier: string;
  embedSecret: string;
  userEmail: string;
  authUserEmail: string;
  titleName: string;
  isOffenderSpecific: boolean = false;
  differ: KeyValueDiffer<string, any>;
  insightUserId: string;
  moduleName: string;
  constructor(
    private sessionManager: UserSessionManager,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private redirectUtil: RedirectUtil,
    public translateService: TranslateService,
    private router: Router,
    private dashboardBiService: DashboardBiService,
    public oumsysetService: OumsysetService,
    private offenderSearchService: OffenderSearchService,
    private injectOffenderService: InjectOffenderService
  ) {
  }
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  submitData = {
    data: {
    }
  }
  refreshForm = new EventEmitter();
  successEmitter = new EventEmitter();
  identifiers = [];
  formOptions = {
    submitMessage: "",
    disableAlerts: true,
    noAlerts: true
  };
  ngOnInit() {
    if(this.dashboardBiService.adminToken == undefined){
      this.show(
        'warn',
        this.translateService.translate('insights.dashboardNotAbleToConnect')
      );
    }
  }
  ngAfterContentInit(){
    this.routeToDashboard();
  }
  ngAfterViewInit(){
    setTimeout(() => {
      // this.routeToDashboard();
    }, 2000);
    this.dashboardBiService.toggle.subscribe(
      (e)=>{
        if(e){
          setTimeout(() => {
            let biInstance = BoldBI.getInstance('dsbModRender');
            if (biInstance){
              biInstance.resizeDashboard();
            }
          }, 2000);
        }
      });
  }
  routeToDashboard(){
    this.injectOffenderService.injectOffender(this.activatedRoute);
    this.activatedRoute.queryParams.subscribe(params => {
    this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    if(!params || !(Object.keys(params).length)){
      this.getLanPgConfigData(this.vHeaderBlockModel);
    } else {
      if(params.offenderIdDisplay){
        this.getLanPgConfigData(params);
      } else if(params.form){
          if(!(this.vHeaderBlockModel)){
            this.getLanPgConfigData(params.form);
          } else {
            this.getLanPgConfigData(params);
          }
      }
    }
    });
  }
  getLanPgConfigData(ev) {  
    let obj = {
        settingType: 'PAGE_CONFIG',
        settingProviderCode: 'PAGE_CONFIG',
    };
    this.oumsysetService.loadJsonData(obj).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      if(rowData && rowData.length > 0) {
        if (ev.offenderIdDisplay){
          this.routeToOffdsb(rowData);
        } else {
          this.routeToModDsb();
        }
      }
    });
  }
  routeToOffdsb(rowData){
    const dshblpList = ['OWHEADER', 'OSIHRSUM', 'OIIBOOKS', 'OIIOSCED', 'OIDCNOTE', 'OCDIPLAN'];
    let getcaseLoadINST = rowData.find( x => x.KEY_CODE === 'OFDSHB');
    const configuredNonDSHB = dshblpList.find((element) => element == getcaseLoadINST.VALUE);
    if(!configuredNonDSHB && getcaseLoadINST.VALUE && (getcaseLoadINST.VALUE == 'APP_DEFAULT')){
      this.redirectUtil.redirectToBookSumm();
    } else if (!configuredNonDSHB && getcaseLoadINST.VALUE && (getcaseLoadINST.VALUE !== 'APP_DEFAULT')) {
      // this.router.navigate(['/INSDSBVW'], {queryParams: {form: getcaseLoadINST.VALUE}});
      // let getUrlKey = this.getNameKey(getcaseLoadINST.VALUE);
      // if(getUrlKey){
      //   this.titleName = getUrlKey.name;
      // }
      const dashboardId = this.dashboardBiService.getInsDashboardId(getcaseLoadINST.VALUE);
      dashboardId.subscribe(data => {
        if(data != "") {
          this.dashboardId = data;
          if(this.dashboardId.offenderSpecificFlag == 'Y'){
            this.isOffenderSpecific = true;
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
            if (!this.vHeaderBlockModel || this.offenderSearchService.selectedOffender === undefined) {
              this.show('warn', this.translateService.translate('common.pleasesearchforvalidoffender'));
              return;
            }
          } else {
            this.isOffenderSpecific = false;
          }
          this.getDashboard(this.dashboardBiService.adminToken);
        }
      });
    } else if (configuredNonDSHB && (configuredNonDSHB == getcaseLoadINST.VALUE)) {
      this.router.navigate(['/' + configuredNonDSHB]);
    } else {
      this.redirectUtil.redirectToBookSumm();
    }
  }
  routeToModDsb() {
    this.dashboardId = this.dashboardBiService.formData;
    let url = this.router.url;
    let moduleName = url.split('=')[1];
    // let getUrlKey = this.getNameKey(moduleName);
    // if(getUrlKey){
    //   this.titleName = getUrlKey.name;
    // }
    const dashboardId = this.dashboardBiService.getInsDashboardId(moduleName);
    dashboardId.subscribe(data => {
      if(data != "") {
        this.dashboardId = data;
        if(this.dashboardId.offenderSpecificFlag == 'Y'){
          this.isOffenderSpecific = true;
        } else {
          this.isOffenderSpecific = false;
        }
        this.getDashboard(this.dashboardBiService.adminToken);
      }
    });
  }
  getAdminDetails() {
    this.oumsysetModel.settingType = 'INSIGHTS';
    this.oumsysetModel.settingProviderCode = 'AUTH';
    this.oumsysetService.loadJsonData(this.oumsysetModel).subscribe((result) => {
        const rowData = JSON.parse(result.settingValue);
        this.systemSetData = rowData;
        this.dashboardBiService.userAuthEmail = this.getKeyCodeValue("USERNAME", rowData);
        this.getDetails(this.dashboardBiService.userAuthEmail);
    }); 
  }
  getDetails(authUserEmail) {
    this.oumsysetModel.settingType = 'INSIGHTS';
    this.oumsysetModel.settingProviderCode = 'INSIGHTS';
    this.oumsysetService.loadJsonData(this.oumsysetModel).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      this.systemSetData = rowData;
      this.dashboardBiService.environment = this.getKeyCodeValue("INS_ENV", this.systemSetData);
      this.dashboardBiService.siteIdentifier = this.getKeyCodeValue("INS_SITE_IDF", this.systemSetData);
      this.dashboardBiService.embedSecret = this.getKeyCodeValue("INS_EMB_SEC", this.systemSetData);
      this.dashboardBiService.InsightRoolUrl = this.getKeyCodeValue("INSI_SER_URL", this.systemSetData);
      this.dashboardBiService.insightUserId = this.getKeyCodeValue("INS_USER_ID", this.systemSetData);
      this.getAdminToken(authUserEmail);
    });
  }
  getAdminToken(email) {
    let currentEmail = email;
    const dashboardId = this.dashboardBiService.getAdminToken(currentEmail);
    dashboardId.subscribe(data => {
      const result: any = data;
      this.dashboardBiService.adminToken = result.access_token;
      this.getDashboard(this.dashboardBiService.adminToken);
    });
  }
  getKeyCodeValue(keycode, arr){
    for (let i=0; i<arr.length; i++) {
        if(arr[i].KEY_CODE == keycode){
            return arr[i].VALUE;
        }
    }
    return null
  }
  initializeForm() {
    this.identifiers = [];
    let identifiersValueMap = {key : 'value'};
    if(this.userFormData.formIdentifier) {
        /* this.dynamicFormsService.getIdentifierData(this.userFormData.formIdentifier)
        .subscribe(data => {
            // return a map?
        }); */
        this.identifiers = this.userFormData.formIdentifier.split(';');
        for(let identity of this.identifiers) {
            /* this.rendData.components.push (
                { key: identity, type: 'hidden', id: 'pk_' + identity + '_' + identifiersValueMap[ identity ] }); */
                if(identity && identity.toLowerCase().includes('offenderid')) {
                    this.submitData.data[identity] = this.vHeaderBlockModel.offenderId+'';
                    break;
                } else {
                    this.submitData.data[identity] = identifiersValueMap[ identity ];                    
                }
            }
        }
        this.rendData = JSON.parse(this.userFormData.formJson);
        this.retrieve(this.vHeaderBlockModel.offenderId);
  }
  getDashboard(adminToken) {
    const getDashboards = this.dashboardBiService.getDashboards(adminToken);
    getDashboards.subscribe((data) => {
      this.dashboardBiService.dashboards = data;
      this.dashboardsList = this.dashboardBiService.dashboards;
      if(!(this.vHeaderBlockModel) && this.dashboardId.offenderSpecificFlag == 'Y'){
        let biInstance = BoldBI.getInstance('dsbModRender');
        this.show(
          'warn',
          this.translateService.translate('insights.SelectOffenderFirst')
        );
        if(biInstance){
          biInstance.destroy();
        }
        return false
      } else {
        this.dashboardDetails(this.dashboardId);
      }
    },
    (err) => {
      this.getApiErrHandler(err);
    });
  }
  getApiErrHandler(err){
    if (err.status === 401){
      this.show(
        'warn',
        this.translateService.translate(
          `${err.status}, ` + `${err.statusText.replace(err.statusText, this.translateService.translate('insights.insightUserNotAuthorized'))}`)
      );
    } else {
      this.show(
        'warn',
        this.translateService.translate(
          `${err.status}, ` + ` ${err.statusText.replace(err.statusText, this.translateService.translate('insights.insightCommonAccessError'))} `)
      );
    }
  }
  dashboardDetails(dashboard: Item) {
    if(dashboard.dashboard == null || dashboard.dashboard == undefined || dashboard.dashboard == ''){
      this.show(
        'warn',
        this.translateService.translate('insights.DashboardIdPathRequired')
      );
      setTimeout(() => {
        this.redirectUtil.redirectToHome();
      }, 2000);
      return false;
    }
    let embedQuerString = "embed_nonce=" + Guid.create() +
      "&embed_dashboard_id=" + dashboard.dashboard +
      "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
      "&embed_expirationtime=100000";
      if(!(this.vHeaderBlockModel)){
        embedQuerString += "&embed_user_email=" + this.dashboardBiService.userAuthEmail;
      } else {
        embedQuerString += "&embed_user_email=" + this.dashboardBiService.userAuthEmail + "&embed_datasource_filter=" + "[{offender_book_id=" + this.vHeaderBlockModel.offenderBookId + "}]";
      }
    var embedDetailsUrl = "/embed/authorize?" + embedQuerString + "&embed_signature=" + this.GetSignatureUrl(embedQuerString);
    var serverurl = this.dashboardBiService.dashboardServerApiUrl + embedDetailsUrl;
    let embeddata = this.http.get(serverurl).subscribe((res: any) => {
      const dsbDetails = JSON.parse(res.Data.ItemDetail);
      this.titleName = dsbDetails.Name;
      this.renderDashboard(res);
    });
  }
  GetSignatureUrl(message: string) {
    var hash = CryptoJS.HmacSHA256(message, this.dashboardBiService.embedSecret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  }
  renderDashboard(dataObj) {
    this.dashboard = BoldBI.create({
      serverUrl: this.dashboardBiService.baseUrl,
      dashboardId: this.dashboardId.dashboard,
      embedContainerId: "dsbModRender",
      embedType: BoldBI.EmbedType.Component,
      environment: this.dashboardBiService.environment == "enterprise" ? BoldBI.Environment.Enterprise : BoldBI.Environment.Cloud,
      width: "100%",
      height: "100vh",
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
        showHeader: false,
      },
      actionBegin: function (args) {
        
      },
      beforeNavigateUrlLinking: function (args) {
        
      },
      actionComplete: "emdbedDashboardActionComplete",
      
    });
    this.dashboard.loadDashboard();
  }
  getNameKey(url){
    let menu = this.sessionManager.userRoles.menus;
    for(let i = 0; i<menu.length; i++){ 
      let levelOne = menu[i].children;
      if(menu[i].queryParams && menu[i].queryParams.form == url){
       return menu[i];
      }
      if(levelOne && levelOne.length > 0){
        for (let j = 0; j<levelOne.length; j++){
          let levelTwo = levelOne[j].children;
          if(levelOne[j].queryParams && levelOne[j].queryParams.form == url){
            return levelOne[j];
           }
          if(levelTwo && levelTwo.length > 0){
            for (let k = 0; k<levelTwo.length; k++){
              let levelThree = levelTwo[k].children;
              if(levelTwo[k].queryParams && levelTwo[k].queryParams.form == url){
                return levelTwo[k];
               }
            }
          }
        }
      }
    }
    return null;
  }
  // onResizeInsights() {
  //   this.dashboard.resizeDashboard();
  // }

  searchMap = new Map();
  searchKeys(event, identity) {
    if(typeof(event) == 'string') {
        this.searchMap.set(identity, event);
    }
  }
  clear() {
    this.searchMap = new Map();
  }
  retrieve(offId) {
    let searchString = '';
    this.submitData = {
        data: {
        }
    };
    if( this.userFormData && 
        this.userFormData.formIdentifier && 
        this.userFormData.formIdentifier.toLowerCase().includes('offenderid') ) {
        searchString = searchString + '"'+'offenderid'+ '"' + ":" + '"'+this.vHeaderBlockModel.offenderId+ '"'+";"
    } else {
        for ( const key of this.searchMap.keys() ) {
            if ( this.searchMap.get(key) ) {
                searchString = searchString + '"'+key+ '"' + ":" + '"'+this.searchMap.get(key)+ '"'+";";
            }
        }
    }
  }
  onOffenderChange(offender) {
    this.vHeaderBlockModel = offender;
    if (offender) {
        // this.ocdalertExecuteQuery();
        this.getAdminDetails();
        this.retrieve(offender);
        // this.submitData.data["offenderId"] = this.vHeaderBlockModel.offenderId+'';
    } else {
        // this.alertData = [];
        // this.alertbean = new OffenderAlerts();
    }
  }
  show(type, message) {
      this.msglist = [];
      this.msglist.push({ message: message, type: type });
      this.msgs = [...this.msglist];
  }
  ngOnDestroy(){
    let biInstance = BoldBI.getInstance('dsbModRender');
    if (biInstance){
      biInstance.destroy();
      biInstance.destroyStyles();
      const element = document.querySelectorAll('[id^="dsbModRender_embeddedbi"]');
      if (element) {
        element.forEach((element) => { element.remove() });
      }
      this.dashboard = biInstance;
    }
  }
}
