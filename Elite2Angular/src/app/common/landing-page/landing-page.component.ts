import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportService } from '@core/service/report.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Subject, timer } from 'rxjs';
import { takeUntil} from 'rxjs/operators';


@Component({
    selector: 's4-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: []
})
export class LandingPageComponent implements OnInit, OnDestroy {
   
    //
    // Eventually move to a managed location (per user/per role?)
    //
    // TEST values...
    //private LANDING_PAGE_REPORT = "OIRINCEN";
    private LANDING_PAGE_REPORT = 'OIRLAND';

    private unsubscribe: Subject<void> = new Subject<void>();
   
    landingReport:any;
    generatedHTML = undefined;
    
    constructor(private reportService: ReportService, public translateService: TranslateService, private sessionManager: UserSessionManager) {
    }
    
    ngOnInit() {
        this.reportService.getReportList().subscribe(data=> {
            if ( data.length > 0 ) {
                // Locate the landing page report
                data.forEach((report)=>{
                    if(report.label == this.LANDING_PAGE_REPORT) {
                        this.landingReport = report;
                    }
                });
                
                if(this.landingReport) {
                    // Update the report if the caseload changes
                    this.sessionManager.caseLoadIdObservable
                        .pipe(takeUntil(this.unsubscribe))
                        .subscribe(data => {
                            this.openReportHTML();
                        });
                    
                    // let other events in the queue fire before opening the report.
                    // This is prevents a report 'flicker' when changing caseloads 
                    // while on another screen.
                    var openReport = timer(200);
                    openReport.subscribe(x => this.openReportHTML());                    
                }
            }
         });
    }
    
    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
    
    openReportHTML() {
        var caseload = this.sessionManager.currentCaseLoad;
        var reportParameters = 'caseload:' + caseload;
        
        this.generatedHTML = undefined;
        this.reportService.openReportHTML(this.landingReport, reportParameters).subscribe((res)=>{
            // ensure the caseload has not changed while the report was being generated
            if( caseload == this.sessionManager.currentCaseLoad) {
                this.generatedHTML=res;                
            }
        });                         
    }
}