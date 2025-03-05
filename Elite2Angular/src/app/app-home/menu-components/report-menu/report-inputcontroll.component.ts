import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportService } from "@core/service/report.service";
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'report-input',
    templateUrl: './report-inputcontroll.component.html',
    styleUrls: []
})
export class ReportInputControllComponent implements OnInit, OnDestroy {
   
    reportInputControlls: any=[];
    report:any;
    caseLoad : any ;
    generatedHTML = undefined;
    navigationSubscription : any;
    facilityUrl:string;
    constructor(private reportService: ReportService, public translateService: TranslateService, private sessionManager: UserSessionManager, private router: Router) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.initialiseReports();
              }
        });
        this.facilityUrl = 'oidcholo/cgfkCrtMvTmpAgyLocIdRecordGroup?caseload=' + this.sessionManager.currentCaseLoad;
    }
    
    private initialiseReports() {
        this.caseLoad = this.sessionManager.currentCaseLoad;
        this.reportInputControlls = this.reportService.getSelctedReportInputControlls();
        for (var i=0; i< this.reportInputControlls.length; i++) {
            let inputcontroll = this.reportInputControlls[i];
            inputcontroll.editable = true;
            if(inputcontroll.type=='singleSelect' || inputcontroll.type=='multiSelect') {
                //this.reportInputControlls[i].options = inputcontroll.state.options
                let options :any[] = [];
                for(var j = 0; j<inputcontroll.state.options.length; j++) {
                    let option = inputcontroll.state.options[j];
                    if(option.label==='---') {
                        //options.push({"code":option.value,"description":option.value,"canDisplay":true});
                    } else {
                        options.push({"code":option.value,"description":option.label,"canDisplay":true});
                    }
                    
                }
                this.reportInputControlls[i].options = options;
            }
            if(inputcontroll.type=='singleValueText' && inputcontroll.id.toUpperCase() == 'caseLoad'.toUpperCase()) {
                inputcontroll.value = this.caseLoad;
                inputcontroll.editable = false;
            }
        }
        this.report = this.reportService.getCurrentReport();
    }
    
    ngOnInit() {
        this.initialiseReports();
    }
    
    openReport() {
        let inputParams = "";
        this.generatedHTML = undefined;
        for (var i=0; i< this.reportInputControlls.length; i++) {
            let inputcontroll = this.reportInputControlls[i];
            if(inputcontroll.type=='singleValueDate') {
                let format = inputcontroll.validationRules[0].format;
                DateFormat.dateFormat = format;
                inputcontroll.value = DateFormat.format(inputcontroll.value)
            }
            inputParams = inputParams + inputcontroll.id +":"+inputcontroll.value+",";
        }
        this.reportService.openReport(this.report, inputParams).subscribe((res:any)=>{
            let file = res;            
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        });
        
    } 
    
    openReportHTML() {
        let inputParams = "";
        for (var i=0; i< this.reportInputControlls.length; i++) {
            let inputcontroll = this.reportInputControlls[i];
            if(inputcontroll.type=='singleValueDate') {
                let format = inputcontroll.validationRules[0].format;
                DateFormat.dateFormat = format;
                inputcontroll.value = DateFormat.format(inputcontroll.value)
            }
            inputParams = inputParams + inputcontroll.id +":"+inputcontroll.value+",";
        }
        this.reportService.openReportHTML(this.report, inputParams).subscribe((res)=>{
            this.generatedHTML =res;
        });
        
    } 
            
    public ngOnDestroy() {
        //Cleanup the subscription on destroy to avoid memory leak.
        if (this.navigationSubscription) {  
            this.navigationSubscription.unsubscribe();
         }
    }
}