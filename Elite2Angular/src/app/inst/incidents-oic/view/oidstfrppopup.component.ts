import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidoicusService } from '../service/oidoicus.service';
import { TranslateService } from '@common/translate/translate.service';
import { IncidentStaffReport } from '../beans/IncidentStaffReport';
import { UserSessionManager } from '@core/classes/userSessionManager';
@Component({
  selector: 'app-oidstfrppopup',
  templateUrl: './oidstfrppopup.component.html',
  styleUrls: ['./oidstfrppopup.component.css']
})
export class OidstfrppopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    staffSearch:any;
    staffReportsColumnDefs: any[] = [];
    StaffReportsdata: IncidentStaffReport[] = [] ;
    reportLink:any;
  constructor( public translateService: TranslateService,private oidoicusFactory: OidoicusService,private sessionManager: UserSessionManager) { }

  ngOnInit() {
      this.staffSearch=this.dialog.data;
      //this.reportLink = 'oidincde/rgReportedStaffIdsRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
      this.reportLink =  'oidincde/rgRoleStaffIdsRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
      this.staffReportsColumnDefs = [
                                   
                         {
                             fieldName: this.translateService.translate('Report Type'), field: 'reportType',
                             editable: true, width: 150, filter: 'text', pinned: true, datatype: 'lov',domain:'STAFF_REPORT'
                        },
                        { fieldName: this.translateService.translate('Staff Name'), field: 'staffId', editable: true,
                            datatype: 'lov', link:this.reportLink, width: 150 },
                            
                         { fieldName: this.translateService.translate('Report Id'), field: 'incidentReportId', editable: true, width: 150,
                         datatype: 'number'
                         },
                         { fieldName: this.translateService.translate('Report Date'), field: 'reportDate', editable: true,
                          width: 150, datatype: 'date'
                          },
                        { fieldName: this.translateService.translate('Report Time'), field: 'reportTime', editable: true,
                              datatype: 'time', width: 150 },
                         {
                             fieldName: this.translateService.translate('Incident Detail'), field: 'incidentDetails', datatype: 'text',
                             editable: false, data: 'row', updateField: 'row', modal: true, dialogWidth: '80',  width: 310, tooltip: true              
                        }
                       
                            
                     ];
      this.staffReportsHistory();
  }

  
 clear()
  {
      this.dialog.close("true");
  }
  
  staffReportsHistory(){
      const serviceObj = this.oidoicusFactory.staffReportsData(this.staffSearch);
      serviceObj.subscribe(data => {
          if (data.length === 0) {
              this.StaffReportsdata = [];
          } else {
                this.StaffReportsdata = data;
          }
      });
  }
  
}
