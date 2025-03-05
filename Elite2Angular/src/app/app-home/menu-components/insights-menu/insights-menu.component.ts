import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OumsysetBean } from '@sa/admin/beans/OumsysetBean';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { DashboardBiService } from 'app/dashboard-bi/dashboard-bi.service';

@Component({
  selector: 'insights-menu',
  templateUrl: './insights-menu.component.html',
  styleUrls: ['./insights-menu.component.css']
})
export class InsightsMenuComponent implements OnInit {

  @Input() nodes: any;
  msglist: any[];
  msgs: any[];
  insightSubMenus: any = [];
  reportMenusAc: any = [];
  activeMenu: boolean = false;
  oumsysetModel: OumsysetBean = new OumsysetBean();
  systemSetData = [];
  constructor(private sessionManager: UserSessionManager,
    private logService: LoginService, private router: Router, public translateService: TranslateService,
    private dashboardBiService: DashboardBiService, private oumsysetService: OumsysetService,) { }

  ngOnInit() {
    this.buildInsightSubMenus();
  }
  buildInsightSubMenus() {
    this.insightSubMenus = [];
    this.getBiDetails();
  }
  onInsightsClick(insight: any) {
    this.insightSubMenus = this.insightSubMenus.map(object => {
      if (insight.id === object.id) {
        return { ...object, active: true };
      } else {
        return { ...object, active: false };
      }
    });
    this.router.navigate([insight['url']]);
  }
  getBiDetails() {
    const userSession = this.sessionManager.userSessionDetails();
    const userId = userSession.id;
    this.dashboardBiService.getInsightUserMail(userId).subscribe(
      (result: string) => {
        this.dashboardBiService.userEmail = result;
        if (!this.dashboardBiService.userEmail) {
          this.show(
            this.translateService.translate("insights.UserEmailNotAssociatedWithInsights"),
            "warn"
        );
        } else {
          this.getDetails();
        }
      });
  }
  getDetails() {
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
      this.getAdminDetails();
    });
  }
  getAdminDetails() {
    this.oumsysetModel.settingType = 'INSIGHTS';
    this.oumsysetModel.settingProviderCode = 'AUTH';
    this.oumsysetService.loadJsonData(this.oumsysetModel).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      this.systemSetData = rowData;
      this.dashboardBiService.userAuthEmail = this.getKeyCodeValue("USERNAME", this.systemSetData);
      this.getAdminToken(this.dashboardBiService.userAuthEmail);
      this.getUserToken();
    });
  }
  getUserToken() {
    this.dashboardBiService.getUserToken().subscribe(data => {
      const result: any = data;
      this.dashboardBiService.token = result.access_token;
      this.getBiUser(this.dashboardBiService.userEmail, this.dashboardBiService.adminToken);
    });
  }
  getAdminToken(email) {
    this.dashboardBiService.getAdminToken(email).subscribe(data => {
      const result: any = data;
      this.dashboardBiService.adminToken = result.access_token;
      // this.getBiUser(email, this.dashboardBiService.adminToken);
    });
  }
  getBiUser(email, token) {
    this.dashboardBiService.getBiUser(email, token).subscribe((data) => {
      const getAccess = data;
      this.dashboardBiService.boldBIUserId = getAccess['UserId'];
      this.getPermission(this.dashboardBiService.boldBIUserId, token);
    });
  }
  getPermission(id, token) {
    this.dashboardBiService.getUserPermissions(id, token).subscribe(
      (res) => {
        let dashboardObj = {
          id: 1,
          name: this.translateService.translate('insights.dashboardTitle'),
          url: 'INSIGHTS'
        }
        let datasourceObj = {
          id: 2,
          name: this.translateService.translate('insights.datasourceTitle'),
          url: 'BIDATASOURCE'
        }
        const fetchedPerms = res;
        if (fetchedPerms) {
          const dashboardAccess = this.getCreatePermArr("AllDashboards", fetchedPerms);
          const datasourceAccess = this.getCreatePermArr("AllDataSources", fetchedPerms);
          if (dashboardAccess || datasourceAccess) {
            if (dashboardAccess && !datasourceAccess || !datasourceAccess.length){
              this.insightSubMenus.push(dashboardObj);
            } else if(!dashboardAccess || !dashboardAccess.length && datasourceAccess){
              this.insightSubMenus.push(datasourceObj);
            } else if(dashboardAccess && datasourceAccess){
              this.insightSubMenus.push(dashboardObj);
              this.insightSubMenus.push(datasourceObj);
            }
          } else{
            this.show(
              this.translateService.translate('insights.dashboardAccessDenied'), 
              'warn'
            );
          }
        } else {
          this.show(
            this.translateService.translate('insights.dashboardAccessDenied'), 
            'warn'
          );
        }
      },
    );
  }
  
  getKeyCodeValue(keycode, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].KEY_CODE == keycode) {
        return arr[i].VALUE;
      }
    }
    return null
  }
  getCreatePermArr(code, arr) {
    const filteredData = arr.filter((x) => x.PermissionEntity === code);
    return filteredData
  }
  show(type, message) {
    this.msglist = [];
    this.msglist.push({ message: message, type: type });
    this.msgs = [...this.msglist];
  }
}
