import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ManageReportService } from './service/managereport.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OirreportModuleParameters } from '@report/beans/OirreportModuleParameters';
import { ReportParamKeyValue } from './beans/ReportParamKeyValue';
import { OmsReportAsset } from './beans/OmsReportAsset';

@Component({
  selector: 'app-oireditasset',
  templateUrl: './oirEditAssetDialog.component.html',
  styleUrls: ['./oirEditAssetDialog.component.css']
})
export class OirreportEditAssetComponent implements OnInit{
	@ViewChild('dialog', {static: true}) dialog: DialogComponent;
	msgs: any[] = [];
	msglist: any[];
	message: any;
	type: any;
	fileName = '';
  	files:any = '';
	isAssets:boolean;
	rowData:any;
	assetsDataModel: OmsReportAsset;
	constructor(public translateService: TranslateService, 
				private manageReportService: ManageReportService,
				private sessionManager: UserSessionManager,) {}
	
	ngOnInit() {
	this.rowData = this.dialog.data
	}
	
	onSelectFile(event) {
		let files = event.target.files;
		let extension = files[0].name.split('.').pop();
		if(extension === 'png'|| extension === 'jpg'|| extension === 'jpeg'|| extension === 'jrtx'){
			this.files = event.target.files;
			this.fileName = this.files[0].name;
		}else{
			this.type = 'error';
          	this.message = 'Selected File type not allowed to upload.';
          	this.show();
		}	
	}
	
	save() {
		if(this.files && this.files[0]) {
			let formData: FormData = new FormData();
		   	formData.append('asset_file', this.files[0]);
		   	formData.append('assetCode', this.rowData.assetCode);
			const assets = this.manageReportService.addUpdateAsset(formData);
			assets.subscribe(data => {
				if(data['message'] && data['message'] === '422') {
					this.type = 'error';
                        this.message = this.translateService.translate('oirmasset.unsupportedFile');
                        this.show();
				}
				else if(data['message']) {
					this.type = 'success';
		      		//this.message = this.translateService.translate('oirmasset.successfullyUpdated');
		      		this.manageReportService.messageSubject.next(data['message']);
		      		this.dialog.close(this.files);
				} else {
					this.type = 'error';
		      		this.message = 'Error occured, Please contact administrator. ';
		      		this.show();
				}
			});
		} else {
			this.type = 'error';
		    this.message = 'Please select file. ';
		    this.show();
    	} 
	}
	
	closeDialog() {
		this.dialog.close(null);
	}
	
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	
}