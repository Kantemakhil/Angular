import { Component, OnInit } from '@angular/core';
import { ReportService } from "@core/service/report.service";
import { UserSessionManager } from '@core/classes/userSessionManager';
import { LoginService } from '@common/login/service/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'report-menu',
    templateUrl: './report-menu.component.html',
    styleUrls: []
})
export class ReportMenuComponent implements OnInit {
   
    constructor(private reportService: ReportService, private sessionManager: UserSessionManager, 
            private logService: LoginService, private router: Router) {
    }        
    reportMenus: any = [];
    reportMenusAc: any = [];
    activeMenu: boolean = false;
         
    ngOnInit() {
        this.buildStaticMenu();
    }
    
    buildStaticMenu() {
	
	this.reportMenus = [
            {
                id: 1,
                name: "Reports",
                url: "OIRREPORT"
            },
            {
                id: 2,
                name: "Import Reports",
                url: "OIIMPJRP"
            },
            {
                id: 3,
                name: "Export Reports",
                url: "OIEXPJRP"
            },
            {
                id: 4,
                name: "Manage Reports",
                url: "OIRMREPOR"
            },
            {
                id: 5,
                name: "Manage Assets",
                url: "OIRMASSET"
            },
        ]
	
    }
  
    onReportclick(report: any) {
        /* this.reportService.getInputControllsForReport(report['uri']).subscribe(result => {
            this.reportService.setInputControlls(result); 
            this.reportService.setCurrentReport(report);
            if(result.length != 0) {
                this.router.navigate(["OISREPORT"]);
            } else {
                this.reportService.openReport(report, "").subscribe((res:any)=>{
                    let file = res;            
                    var fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                });
            }
        }); */
        this.reportMenus = this.reportMenus.map(object => {
            if (report.id === object.id){
                return {...object, active: true};
            } else {
                return {...object, active: false};
            }
          });
        this.router.navigate([report['url']]);
    } 
    
    removeUnauthorizedReport (reportMenus):any {
        let availablereportMenus : any = [];
        let roles = this.sessionManager.userRoles.roles;
        if(reportMenus) {
            reportMenus.forEach((report)=>{
                if(roles[report.label]) {
                    availablereportMenus.push(report);  
                }
            });
        }
        return availablereportMenus;
    }
    
    getReportsList() {
	
        let displayLoader = false;
        this.reportService.getReportList(displayLoader).subscribe(data=> {
            if ( data.length > 0 ) {
                if (!this.sessionManager.userRoles) {
                    this.logService.getUserMenus(displayLoader).subscribe(data => {
                        this.sessionManager.userRoles = data;
                        this.reportMenus = this.removeUnauthorizedReport(data);
                    });
                } else {
                    this.reportMenus = this.removeUnauthorizedReport(data);
                }
            }
         });
    }
    
}