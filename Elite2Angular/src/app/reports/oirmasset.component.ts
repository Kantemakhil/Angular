import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Images } from "@commonbeans/Images";
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ManageReportService } from './service/managereport.service';
import { OmsReportAsset } from './beans/OmsReportAsset';
import { DateFormat } from "@core/ui-components/datepicker/dateFormat";



@Component({
  selector: 'app-oirmasset',
  templateUrl: './oirmasset.component.html',
 
})
export class OirmassetComponent implements OnInit {
	@ViewChild('assetsGrid', {static: true}) assetsGrid: any;
  	file:any = '';
  	type = "error";
  	msgs: any[] = [];
  	msglist: any[];
  	message: any;
  	target: any;
  	headerimage: string;
	importButtondisabled: boolean;
	headSavedisabled: boolean;
	cancelbutton: boolean;
	imagesModel: Images = new Images();
    imagesHModel: Images = new Images();
    headerId: number;
    reportAssetColumnDef: any[];
    assetsData: OmsReportAsset[];
    files:any = '';
   
	constructor(public translateService: TranslateService, private manageReportService: ManageReportService, private dialogService: DialogService) {
		this.manageReportService.messageSubject.subscribe(res =>{
			  this.type = 'success';
			  this.message = res;
			  this.show()
		  });
	}
	
    ngOnInit() {
	 this.reportAssetColumnDef= [
      {
        fieldName: this.translateService.translate('oirmasset.assetsCode'), field: 'assetCode',uppercase: 'false', required:true,
        width: 150, datatype: 'text', editable: true, cellEditable: this.canCellEdit
      },
      {
	 	fieldName: this.translateService.translate('oirmasset.assetsFilename'), field: 'assetsFilename', datatype: 'hyperlink', displayas: 'href',  data: 'row', modal: true, hyperLinkText: true,
        onLaunchClick: this.getAssets, editable: false, width: 150
	  },
	  {
       fieldName: this.translateService.translate('oirmasset.editAssets'), field: 'editAssets', editable: false, width: 150, datatype:'hyperlink',displayas: 'href', styleClass: 'edit',
       data: 'row', updateField: 'row', modal: true, dialogWidth: '80%', height: 'auto',onLaunchClick: this.openEditAssetsDialog
      },
      ]  
      this.fetchAssets();     
    }
    
    fetchAssets(){
	const assetsObj = this.manageReportService.getAllAssets();
		assetsObj.subscribe(data => {
			if (data.length === 0) {
				this.assetsData = [];
			} else {
				data.forEach(element => {
					element['editAssets']= "";
				})
				this.assetsData = data;
			}
		});
	}
	
	
	getAssets = (rowData) => {
		const assetsObj = this.manageReportService.getAssets(rowData.assetCode);
		assetsObj.subscribe(data => {
			if(data != null && data != undefined){
				this.openAsset(data.assetBody)
			}
		});
	}
	
	openAsset(base64str) {
        var binary = atob(base64str.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        var blob = new Blob([view], { type: "image/jpeg" });
        var url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
	
    
    openEditAssetsDialog = (data) => {
		this.dialogService.openLinkDialog('/OIREDITASSET', data , 80).subscribe(resData => {
	       if(resData){
                const node = this.assetsGrid.gridOptions.api.getSelectedNodes().length && this.assetsGrid.gridOptions.api.getSelectedNodes()[0];
				if(node){
					//node.setDataValue('assetsFilename', resData[0].name);
					//this.file = resData;
					this.fetchAssets();
				}
            }
        });
	}
	
	 canCellEdit = (data: any, index: number, field: string): boolean => {
        if ((data.assetCode || data.assetCode !== undefined) && field === 'assetCode') {
            return false;
        }
        return true;
    }
	
	
	submit(event){
		if(event &&  event.added[0] && event.added[0].assetCode !== undefined && event.added[0].assetCode !== '') {
			let file = new File([""], "")
			let formData: FormData = new FormData();
			formData.append('asset_file',file);
			formData.append('assetCode', event.added[0].assetCode);
			const assets = this.manageReportService.addUpdateAsset(formData);
			assets.subscribe(data => {
				if(data['message']) {
					this.fetchAssets(); 
					this.type = 'success';
	          		this.message = this.translateService.translate('oirmasset.successfullyUpdated');
	          		this.show();
				} else {
					this.type = 'error';
	          		this.message = 'Error occured, Please contact administrator. ';
	          		this.show();
				}
			  
			});
		} else {
			this.type = 'warn';
	        this.message = 'Please fill assetCode.';
	        this.show();
		}
	}
	
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}

	
	}
	