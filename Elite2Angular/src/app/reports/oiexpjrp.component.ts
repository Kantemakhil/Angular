import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { saveAs } from 'file-saver';
import { ManageReportService } from './service/managereport.service';

@Component({
  selector: 'app-oiexpjrp',
  templateUrl: './oiexpjrp.component.html',
  styleUrls: ['./oiexpjrp.component.css']
})
export class OiexpjrpComponent implements OnInit {

  actionName: string;
  msgs: any[] = [];
  msglist: any[];
  message: any;
  type: any;
  oiexpjrpData = [];
  oiexpjrpColumnDef: any[];
  cmnProcessColumnDef: any[];
  cmnProcessData:any[] = [];

   @ViewChild('oiexpjrpGrid', {static: false}) oiexpjrpGrid;

  isProcess: boolean = true;
  isCommonProcess: boolean = false;

  constructor(public translateService: TranslateService, private oiexpjrpFactory: ManageReportService) {

   }

  ngOnInit() {
    this.oiexpjrpColumnDef = [
      {
        fieldName: this.translateService.translate('common.select'), field: 'select',
        width: 150, datatype: 'checkbox', editable: true
      },
      {
        fieldName: this.translateService.translate('oiexpjrp.reportmodule'), field: 'moduleName',
        editable: false, width: 150, datatype: 'text', uppercase: 'false', required: true
      },

      {
        fieldName: this.translateService.translate('oiexpjrp.lastsaved'), field: 'modifyDatetime', editable: false, width: 150,
        datatype: 'dateTime'
      },
      {
        fieldName: this.translateService.translate('oiexpjrp.createduser'), field: 'createUserId', editable: false, width: 150,
        datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oiexpjrp.modifieduser'), field: 'modifyUserId', editable: false, width: 150,
        datatype: 'text', uppercase: 'false'
      },
    ];
    
    this.fetchReports();   
  }

  show() {
   this.msglist = [];
   this.msglist.push({ message: this.message, type: this.type });
   this.msgs = [...this.msglist];
 }

	fetchReports() {
		const serviceObj = this.oiexpjrpFactory.viewAllJRReports();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.oiexpjrpData = [];
				this.cmnProcessData = [];
			} else {
				this.oiexpjrpData = [];
				this.cmnProcessData = [];
				for (let i = 0; i < data.length; i++) {
					let rowData = data[i];
					rowData["select"] = false;
					if (rowData.commonProcess == 'Y') {
						this.cmnProcessData.push(rowData)
					}
					else {
						this.oiexpjrpData.push(rowData)
					}
				}
			}
		});
	}


  onReportExport() {
    let selectedArr = [];
    for (let i = 0; i < this.oiexpjrpData.length; i++) {
      if (this.oiexpjrpData[i].select && this.oiexpjrpData[i].select == true) {
        let procObj = {
          "moduleName":this.oiexpjrpData[i].moduleName,
          "createDatetime":this.oiexpjrpData[i].createDatetime,
          "createUserId":this.oiexpjrpData[i].createUserId,
          "modifyDatetime":this.oiexpjrpData[i].modifyDatetime,
          "modifyUserId":this.oiexpjrpData[i].modifyUserId,
      };
        selectedArr.push(procObj)
      }
    }
    if (selectedArr.length == 0) {
      this.type = 'warn';
      this.message = this.translateService.translate('oiexpjrp.selectatleaseonerecord');
      this.show();
      return false;
    }

    const serviceObj = this.oiexpjrpFactory.exportReports(selectedArr);
    serviceObj.subscribe(data => {
      if (data.error) {
        this.type = 'warn';
        this.message = this.translateService.translate('No response');
        this.show();
      } else {
        saveAs(data, 'reports.zip');
      }
    })

  }
}
