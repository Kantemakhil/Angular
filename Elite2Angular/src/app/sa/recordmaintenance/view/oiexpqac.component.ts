import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ApimainService } from '../service/apimain.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-oiexpqac',
  templateUrl: './oiexpqac.component.html',
  styleUrls: ['./oiexpqac.component.css']
})
export class OiexpqacComponent implements OnInit {

  actionName: string;
  msgs: any[] = [];
  msglist: any[];
  message: any;
  type: any;
  oiexpqacData = [];
  oiexpqacColumnDef: any[];

   @ViewChild('oiexpqacGrid', {static: false}) oiexpqacGrid;

   constructor(private oiexpqacFactory: ApimainService, public translateService: TranslateService,
	  public sessionManager: UserSessionManager) {
         this.oiexpqacColumnDef = [];
   }
   ngOnInit() {
     this.oiexpqacColumnDef = [
       {
         fieldName: this.translateService.translate('common.select'), field: 'select',
         width: 150, datatype: 'checkbox', editable: true
       },
       {
         fieldName: this.translateService.translate('oiexpqac.querykey'), field: 'queryKey', datatype: 'lov',
         editable: false, width: 150, required: true, link: 'apimain/rgQueryKeyRecordGroup'
       },
       {
         fieldName: this.translateService.translate('oiexpqac.apiid'), field: 'apiId', editable: false, width: 150,
         datatype: 'text', required: true
       },
       {
				fieldName: this.translateService.translate('common.category'), field: 'category',required: true, editable: true, width: 150,
				datatype: 'lov', domain: 'PROCESS_CATE'
			},
       {
         fieldName: this.translateService.translate('oiexpqac.apidescription'), field: 'apiDescription', editable: false, width: 150,
         datatype: 'text', uppercase: 'false', required: true
       },
       {
         fieldName: this.translateService.translate('oiexpqac.url'), field: 'url', editable: false, width: 150,
         datatype: 'lov', uppercase: 'false', required: true, link: 'apimain/rgUrlKeyRecordGroup'
       },
     ];

      this.oiexpqacExecuteQuery();
   }

   show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}

   oiexpqacExecuteQuery() {
		const serviceObj = this.oiexpqacFactory.apimainExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.oiexpqacData = [];
			} else {
				this.oiexpqacData = [];
        for(let i=0;i<data.length;i++){
          let rowData = data[i];
          rowData["select"] = false;
          this.oiexpqacData.push(rowData)
        }
			}
		});
   }
   
   onBtnExport() {
    let selectedArr = [];
    for(let i=0;i<this.oiexpqacData.length;i++){
      if(this.oiexpqacData[i].select && this.oiexpqacData[i].select == true){
        selectedArr.push(this.oiexpqacData[i])
      }
    }
    if(selectedArr.length == 0){
      this.type = 'warn';
      this.message = this.translateService.translate('oiexpqac.selectatleaseonerecord');
      this.show();
      return false;
    }

  const serviceObj = this.oiexpqacFactory.exportApiAndAction(selectedArr);
		serviceObj.subscribe(data => {
      if(data.size == 0){
        this.type = 'warn';
        this.message = this.translateService.translate('No response');
        this.show();
      }
      else{
        saveAs(data, 'actions.zip');
      }
      
    })


  }

}
