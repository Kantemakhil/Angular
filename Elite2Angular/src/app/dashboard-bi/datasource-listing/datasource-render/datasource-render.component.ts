import { Router } from '@angular/router';
import { DashboardBiService } from './../../dashboard-bi.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { Item } from '../../BiModelApp';
declare var BoldBI: any;

@Component({
  selector: 'app-datasource-render',
  templateUrl: './datasource-render.component.html',
  styleUrls: ['./datasource-render.component.css']
})
export class DatasourceRenderComponent implements OnInit {
  public dashboardsList: Item[];
  result: any;
  isPreview = false;
  datasource: any;
  datasourceId: any;
  constructor(
    private _app: DashboardBiService, public translateService: TranslateService, private router: Router) {
    if (this._app.formData.Id == undefined || this._app.formData.Id == '') {
      window.history.back();
    }
  }
  ngOnInit() {
    this.datasourceId = this._app.formData;
    // this.onEditDatasource(this.datasourceId);
    // this._app.events$.forEach(event => 
  }
  ngAfterViewInit(){
    this._app.toggle.subscribe(
      (e)=>{
        if(e){
          setTimeout(() => {
            let biInstance = BoldBI.getInstance('datasource-render');
            if (biInstance){
              biInstance.resizeDashboard();
              // biInstance.refreshDashboard();
            }
            this.onResizeInsights();
          }, 2000);
        }
      });
  }
  // onEditDatasource(datasource: Item) {
  //   this.datasource = BoldBI.create({
  //     serverUrl: this._app.baseUrl,
  //     datasourceId: datasource.Id,
  //     embedContainerId: "datasource-render",
  //     embedType: BoldBI.EmbedType.Component,
  //     environment: this.environment == "enterprise" ? BoldBI.Environment.Enterprise : BoldBI.Environment.Cloud,
  //     mode: BoldBI.Mode.DataSource,
  //     width: "100%",
  //     height: "100%",
  //     authorizationServer: {
  //       url: this._app.apiHost + this._app.authorizationUrl
  //     },
  //     expirationTime: 100000,
  //     autoRefreshSettings: {
  //       enabled: true,
  //       hourlySchedule: {
  //         hours: 0,
  //         minutes: 1,
  //         seconds: 0
  //       }
  //     },
  //   });
  //   this.datasource.loadDatasource();
  // }
  onResizeInsights(){
    this.datasource.resizeDashboard();
  }
  preview() {
    this.isPreview = true;
  }
  backRoute() {
    this.router.navigate(["/BIDATASOURCE"]);
  }
}
