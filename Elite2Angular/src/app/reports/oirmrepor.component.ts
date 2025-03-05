import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ManageReportService } from './service/managereport.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OmsModulesCommitBean } from '@sa/admin/beans/OmsModulesCommitBean';
import { OmsModules } from '@sa/usersystemsecurity/beans/OmsModules';

@Component({
  selector: 'app-oirreport',
  templateUrl: './oirmrepor.component.html',
  styleUrls: ['./oirmrepor.component.css']
})
export class OirmreporComponent implements OnInit {

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
  isParamsPresent:boolean=false;
  
  @ViewChild('oirreportGrid', {static: false}) oirreportGrid;

  constructor(public translateService: TranslateService, private oirreportFactory: ManageReportService, private dialogService: DialogService) {

   }

  ngOnInit() {
	
    this.oirreportColumnDef = [
      /*{
        fieldName: this.translateService.translate('oirreport.reportmodule'), field: 'moduleName',
        editable: false, width: 150, datatype: 'hyperlink', uppercase: 'false', required: true , onLaunchClick:this.popup
      },*/
      {
        fieldName: this.translateService.translate('oirreport.reportmodule'), field: 'moduleName',
        datatype: 'text',editable: false
      },
      {
        fieldName: this.translateService.translate('oirreport.reportDescription'), field: 'description',
        editable: true, width: 150, datatype: 'text', uppercase: 'false', required: true
      },
      {
        fieldName: this.translateService.translate('oirreport.lastsaved'), field: 'modifyDatetime', editable: false, width: 150,
        datatype: 'dateTime'
      },
      {
       fieldName: this.translateService.translate('oirreport.editParamet'), field: 'editParam', editable: false, width: 150, datatype:'hyperlink',displayas: 'href', styleClass: 'edit',
       data: 'row', updateField: 'row', modal: true, dialogWidth: '80%', height: 'auto',onLaunchClick: this.openReportParametrs
      },
    ];
    this.fetchReports();
    
  }
 
	openReportParametrs = (data) => {
		this.dialogService.openLinkDialog('/OIRRPORTPARAMS', data , 80).subscribe(resData => {
	      if (resData) {
	          console.log(resData);
	      }
  		});
  		return false;
	}
	
	submit(event) {
		let updateList = event.updated;
		let deleteList = event.removed;
		let commitBean =  new OmsModulesCommitBean();
		commitBean.updateList = updateList;
		//Validate update list is not having blank filed
		commitBean.deleteList = deleteList;
		
		const parameterSaveData = this.oirreportFactory.updateReports(commitBean);
		parameterSaveData.subscribe(saveResult => {
				if (saveResult !== 0) {
					this.type = 'success';
					this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
					this.show();
					return;
				} else {
					this.type = 'error';
					this.message = this.translateService.translate('common.addupdateremoverecordfailed');
					this.show();
					return;
				}
		});
		
		
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
