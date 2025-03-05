import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ManageReportService } from './service/managereport.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OirreportModuleParameters } from '@report/beans/OirreportModuleParameters';
import { OmsModuleParameters } from '@inmate/trust/financialreports/beans/OmsModuleParameters';
import { OirreportParameterCommitBean } from '@report/beans/OirreportParameterCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';


@Component({
  selector: 'app-oirreportEdit',
  templateUrl: './oirreportParameterDialog.component.html'
})
export class OirreportParameterDialogComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  @ViewChild('parameterGrid', {static: true}) parameterGrid: any;
  actionName: string;
  msgs: any[] = [];
  msglist: any[];
  message: any;
  description: any;
  parameterData:OmsModuleParameters[] = []; 
  oirreportColumnDef: any[];
  isReportParamsValid: boolean = false;
  tableIndex=0;
  trueFlag: boolean = false;
  disabled:boolean =true;
  type = 'error';
  parameterUpdateList:OmsModuleParameters[] = [];
  parameterInsertList:OmsModuleParameters[] = [];
  parameterDeleteList:OmsModuleParameters[] = []; 
  parameterCommitModel: OirreportParameterCommitBean;
  oirreprtModel: OirreportModuleParameters = new OirreportModuleParameters(); 

  constructor(public translateService: TranslateService, private oirreportFactory: ManageReportService,
    			private sessionManager: UserSessionManager, public dialogService: DialogService) {
	this.parameterCommitModel = new OirreportParameterCommitBean();
   }

  ngOnInit() {
	this.trueFlag = true;
 	this.oirreportColumnDef = [
      {
        fieldName: this.translateService.translate('oirreport.parameterSeq'), field: 'parameterSeq',
        editable: false, datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oirreport.parameterName'), field: 'parameterName',
        editable: true, width: 120, datatype: 'text', uppercase: 'false',required: true
      },
      {
        fieldName: this.translateService.translate('oirreport.description'), field: 'commentText',
        editable: true, width: 150, datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oirreport.parameterType'), field: 'parameterType',
        editable: true, width: 80, datatype: 'text', uppercase: 'true',required: true
      },
      {
        fieldName: this.translateService.translate('oirreport.optionalFlag'), field: 'optionalFlag',
        editable: true, width: 40, datatype: 'text', uppercase: 'true'
      },
      {
        fieldName: this.translateService.translate('oirreport.parameterCode'), field: 'parameterCode',
        editable: true, width: 120, datatype: 'text', uppercase: 'false'
      },
  	  {
        fieldName: this.translateService.translate('oirreport.parameterDomain'), field: 'parameterDomain',
        editable: true, width: 120, datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oirreport.parameterLovGroup'), field: 'parameterLovGroup',
        editable: true, width: 120, datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oirreport.parameterLovSelect'), field: 'parameterLovSelect',
        editable: false, width: 120, datatype: 'text', uppercase: 'false', wrapText: true, maxWidth: 500
      },
      {
		fieldName: this.translateService.translate('oirreport.edit'), field: 'edit', displayas: 'image',
		editable: true, width: 150, datatype: 'hyperlink', modal: true, data: 'row', updateField: 'row',
        onLaunchClick: this.queryLaunchClick
      },
      {
        fieldName: this.translateService.translate('oirreport.parameterLovTitle'), field: 'parameterLovTitle',
        editable: true, width: 120, datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oirreport.parentLov'), field: 'parentLov',
        editable: true, width: 120, datatype: 'text', uppercase: 'false'
      },
    ];
    
 	this.populateParams();
  }
  
	closeDialog() {
		this.dialog.close(null);
	}
		
	populateParams(){		
		this.parameterData = [];
		this.oirreprtModel.moduleName = this.dialog.data.moduleName;		
		const serviceObj = this.oirreportFactory.getReportParameters(this.dialog.data.moduleName);
		serviceObj.subscribe(data => {
			if(data.length > 0){	
				this.parameterData = data;
				
					this.parameterData.forEach((element) => {
					if(element.parameterType == 'LOV'){
						element['edit'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
					}
                    
				});				 					
			}
		});
	}
	
	 queryLaunchClick = (data) => {
        this.dialogService.openLinkDialog('/PSLQUERY', data, 80).subscribe(result => {
            if(result){
                const node = this.parameterGrid.gridOptions.api.getSelectedNodes().length && this.parameterGrid.gridOptions.api.getSelectedNodes()[0];
				if(node){
					node.setDataValue('parameterLovSelect', result);
				}
            }
        });
    }
	
	submit(event) {
		this.parameterUpdateList = event.updated;
		this.parameterInsertList = event.added;
		this.parameterDeleteList = event.removed;
		this.parameterCommitModel.updateList = [];
		this.parameterCommitModel.insertList = [];
		this.parameterCommitModel.deleteList = [];
		this.parameterCommitModel.updateList = this.parameterUpdateList;
		this.parameterCommitModel.insertList = this.parameterInsertList;
		this.parameterCommitModel.deleteList = this.parameterDeleteList;
		if (this.parameterInsertList.length > 0) {
			for (let i = 0; i < this.parameterInsertList.length; i++) {
				this.parameterInsertList[i].moduleName = this.oirreprtModel.moduleName;
			}
		}

		const parameterSaveData = this.oirreportFactory.updateParameters(this.parameterCommitModel);
		parameterSaveData.subscribe(saveResult => {
			const mapObject = new Map(Object.entries(saveResult));
			for (let [key, value] of mapObject) {
				if (value === "SUCCESS") {
					this.type = 'success';
					this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
					this.show();
					this.populateParams();
					return;
				} else {
					this.type = 'error';
					this.message = this.translateService.translate('common.addupdateremoverecordfailed');
					this.show();
					this.populateParams();
					return;
				}
			}
		});
	}
	
	onDelete = () => {
		return true;
	}

	onGridInsert = () => {
	return { };
	}
	
	 show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
}
