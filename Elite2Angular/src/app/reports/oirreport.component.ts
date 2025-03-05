import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ManageReportService } from './service/managereport.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
  selector: 'app-oirreport',
  templateUrl: './oirreport.component.html',
  styleUrls: ['./oirreport.component.css']
})
export class OirreportComponent implements OnInit {

  actionName: string;
  msgs: any[] = [];
  msglist: any[];
  message: any;
  type: any;
  oirreportData = [];
  oirreportColumnDef: any[];
  cmnProcessColumnDef: any[];
  cmnProcessData:any[] = [];
  parameters:any[] =[];
  isRowClicked:boolean=false;
  moduleName:string;
  inputParams:any;
  selectedOption = 'PDF';
  isParamsPresent:boolean=false;
  dropdownOptions = [{ description: 'PDF', code: 'PDF'},
	  				 { description: 'EXCEL', code: 'EXCEL'},
             { description: 'CSV', code: 'CSV'}]
  
  @ViewChild('oirreportGrid', {static: false}) oirreportGrid;

  constructor(public translateService: TranslateService, private oirreportFactory: ManageReportService ,private dialogService: DialogService) {
	this.oirreportFactory.messageSubject.subscribe(res =>{
			  this.type = 'warn';
			  this.message=res;
			  this.show()
		  });
   }

  ngOnInit() {
	
    this.oirreportColumnDef = [
      /*{
        fieldName: this.translateService.translate('oirreport.reportmodule'), field: 'moduleName',
        editable: false, width: 150, datatype: 'hyperlink', uppercase: 'false', required: true , onLaunchClick:this.popup
      },*/
      {
        fieldName: this.translateService.translate('oirreport.reportmodule'), field: 'moduleName',
        datatype: 'hyperlink', displayas: 'href',  data: 'row', modal: true, hyperLinkText: true,
        onLaunchClick: this.openReport, editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('oirreport.reportDescription'), field: 'description',
        editable: false, width: 150, datatype: 'text', uppercase: 'false', required: true
      },
      {
        fieldName: this.translateService.translate('oirreport.lastsaved'), field: 'modifyDatetime', editable: false, width: 150,
        datatype: 'dateTime'
      }
    ];
    this.fetchReports();
    
  }

  openReport = (data) => {
	  data.reportType = this.selectedOption;
    this.dialogService.openLinkDialog('/REPINPPAR', data , 80).subscribe(resData => {
      if (resData) {
          console.log(resData);
      }
  });
  return false;  
}

	dropdownChange(){
		this.selectedOption
	}

  show() {
   this.msglist = [];
   this.msglist.push({ message: this.message, type: this.type });
   this.msgs = [...this.msglist];
 }

	fetchReports() {
		const serviceObj = this.oirreportFactory.viewAllJRReports();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.oirreportData = [];
			} else {
				
				data.forEach(element => {
					element['editParam']= "";
				})
				this.oirreportData = data;
			}
		});
	}
}
