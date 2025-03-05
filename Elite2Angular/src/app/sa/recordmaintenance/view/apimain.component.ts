import { DateFormat } from './../../../core/ui-components/datepicker/dateFormat';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ActionApi } from '../beans/ActionApi';
import { ActionApiCommitBean } from '../beans/ActionApiCommitBean';
import { ApimainService } from '../service/apimain.service';

@Component({
   selector: 'app-apimain',
   templateUrl: './apimain.component.html'
})

export class ApimainComponent implements OnInit {
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   msglist: any[];
	message: any;
	type: any;
   apimainData: ActionApi[] = [];
   apimainModel: ActionApi = new ActionApi();
   apimainInsertList: ActionApi[] = [];
   apimainUpdateList: ActionApi[] = [];
   apimainDeleteList: ActionApi[] = [];
   apimainCommitModel: ActionApiCommitBean = new ActionApiCommitBean();
   apimainColumnDef: any[];
   tableIndex: number;

   @ViewChild('apimainGrid', {static: false}) apimainGrid;

   constructor(private apimainFactory: ApimainService, public translateService: TranslateService,
	  public sessionManager: UserSessionManager) {
         this.apimainColumnDef = [];
   }
   ngOnInit() {
      this.apimainColumnDef = [
         {
            fieldName: this.translateService.translate('apimain.querykey'), field: 'queryKey', datatype: 'lov',
            editable: true, width: 150, required: true, link: 'apimain/rgQueryKeyRecordGroup'
         },

         {
            fieldName: this.translateService.translate('apimain.apiid'), field: 'queryKey', editable: false, width: 150,
            datatype: 'text', required: true
         },

		 {
            fieldName: this.translateService.translate('apimain.apidescription'), field: 'apiDescription', editable: true, width: 150,
            datatype: 'text', uppercase: 'false', required: true
		 },
		 
		//  {
        //     fieldName: this.translateService.translate('apimain.requesttype'), field: 'requestType', editable: true, width: 150,
        //     datatype: 'lov', domain: 'REQUEST_TYPE', required: true
        //  },
         
		 {
            fieldName: this.translateService.translate('apimain.url'), field: 'url', editable: true, width: 150,
            datatype: 'lov',uppercase: 'false', required: true, link: 'apimain/rgUrlKeyRecordGroup'
         },
      ];

      this.apimainExecuteQuery();
   }

   show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}

   onRowClick(event) {
      if(event !== undefined){
			this.apimainModel = event;
		}
   }

   apimainExecuteQuery() {
		const serviceObj = this.apimainFactory.apimainExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.apimainData = [];
				this.tableIndex = -1;
			} else {
				this.tableIndex = 0;
				this.apimainData = data;
				this.apimainModel = data[0];
			}
		});
   }
   
   apimainCommit(event) {
		this.apimainInsertList = event.added
		this.apimainUpdateList = event.updated
		this.apimainDeleteList = event.removed
		this.apimainCommitModel.insertList = [];
		this.apimainCommitModel.updateList = [];
		this.apimainCommitModel.deleteList = [];
		if (this.apimainInsertList.length > 0) {
			if (!this.apimainValidate(this.apimainInsertList)) {
                return;
            }
			this.apimainInsertList.forEach(obj=>{
				obj.createUserId=this.sessionManager.getId();
                obj.createDatetime=DateFormat.getDate();
                obj.modifyDatetime=DateFormat.getDate();
                obj.apiId=obj.queryKey;
			})
			this.apimainCommitModel.insertList = this.apimainInsertList;
		}
		if (this.apimainUpdateList.length > 0) {
			if (!this.apimainValidate(this.apimainUpdateList)) {
                return;
            }
			this.apimainUpdateList.forEach(obj=>{
				obj.modifyUserId=this.sessionManager.getId();
				obj.modifyDatetime=DateFormat.getDate();
			})
			this.apimainCommitModel.updateList = this.apimainUpdateList;
		}
		if (this.apimainDeleteList.length > 0) {
			this.apimainCommitModel.deleteList = this.apimainDeleteList;
		}
		const processSaveData = this.apimainFactory.apimainCommit(this.apimainCommitModel);
	   processSaveData.subscribe(data => {
			if (data === 1) {
				this.apimainExecuteQuery();
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			}
		});
	}

   onGridInsert = () => {
		return {};
	}

	apimainValidate(apimainList: any) {
		try {
            apimainList.forEach(element => {
                if (!element.queryKey){
                    this.type = 'warn';
                    this.message = this.translateService.translate('apimain.enterquerykey');
                    this.show();
                    throw new Error();
                } /* else if (!element.apiId){
                    this.type = 'warn';
                    this.message = this.translateService.translate('apimain.enterapiid');
                    this.show();
                    throw new Error();
                }  */
                else if (!element.apiDescription){
                    this.type = 'warn';
                    this.message = this.translateService.translate('apimain.enterapidescription');
                    this.show();
                    throw new Error();
                } else if (!element.url){
                    this.type = 'warn';
                    this.message = this.translateService.translate('apimain.enterurl');
                    this.show();
                    throw new Error();
                }
                // else if (!element.requestType){
                //     this.type = 'warn';
                //     this.message = this.translateService.translate('apimain.enterrequesttype');
                //     this.show();
                //     throw new Error();
                // } 
                
            });
            for (let i = 0; i < this.apimainData.length; i++) {
                for (let j = i + 1; j < this.apimainData.length; j++) {
                    if (this.apimainData[i].queryKey === this.apimainData[j].queryKey) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('apimain.apiidexists');
                        this.show();
                        throw new Error();
                    }
                }
            }
    	} catch (e) {
        	return false;
    	}
        return true;
    }

}

