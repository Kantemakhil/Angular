import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@core/ui-components/confirmation-dialog/confirmation-dialog.component';
import { ManageReportService } from './service/managereport.service';


@Component({
  selector: 'app-oiimpjrp',
  templateUrl: './oiimpjrp.component.html',
  styleUrls: ['./oiimpjrp.component.css']
})
export class OiimpjrpComponent implements OnInit {
	 fileName = '';
  files:any = '';
  @ViewChild('fileInput') fileInput : ElementRef;
  dialogRef: MatDialogRef<ConfirmationDialogComponent> | null;
  msgs: any[] = [];
  msglist: any[];
  message: any;
  type: any;
  oiimpjrpData:any[] = [];
  importedData:any;
  oiimpjrpColumnDef: any[];
  @ViewChild('oiimpjrpGrid', {static: false}) oiimpjrpGrid;
	 dropdownOptions = [
    { description: 'Jrxml', code: 'JRXML'},
    { description: 'Zip', code: 'ZIP'},
  ];
  
   selectedOption = 'JRXML';
   isJrxml = true;
   isZip = false;

 constructor(public translateService: TranslateService,
    private oiimpjrpFactory: ManageReportService,
    public dialog: MatDialog) {}
    
    
    ngOnInit() {
	 this.oiimpjrpColumnDef = [
      {
        fieldName: this.translateService.translate('oiimpjrp.moduleName'), field: 'moduleName',
        editable: false, width: 150, datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oiimpjrp.fileName'), field: 'fileName',
        editable: false, width: 150, datatype: 'text', uppercase: 'false'
      },
    ];
	
	}
	
	dropdownChange(){
    this.fileName = '';
    this.files = '';
    this.fileInput.nativeElement.value = "";
    this.oiimpjrpData = [];
    if(this.selectedOption == undefined){
      this.isJrxml = false;
      this.isZip = false;
    }
  }
  
   show() {
   this.msglist = [];
   this.msglist.push({ message: this.message, type: this.type });
   this.msgs = [...this.msglist];
 }
  
  import() {	
	if (this.selectedOption == '' || this.selectedOption == undefined) {
      this.type = 'warn';
      this.message = this.translateService.translate('oiimppro.pleaseselectaprocess');
      this.show();
      return false;
    }
    else if (this.fileName == '' || this.files == '') {
      this.type = 'warn';
      this.message = this.translateService.translate('oiimppro.pleaseselectfile');
      this.show();
      return false;
    }
	let fileList: FileList = this.files;
	let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('importFile', file);
      const serviceObj = this.oiimpjrpFactory.importReports(formData);
      serviceObj.subscribe(data => {
        if(Object.keys(data).length > 0){
          if(data.hasOwnProperty('isAllowed')){
            this.type = 'error';
            this.message = this.translateService.translate('oiimpjrp.unsupportedfile');
            this.show();
          }else{
          this.type = 'success';
          this.message = this.translateService.translate('oiimpjrp.successfullyimported');
          this.show();
          this.fileName = '';
          this.files = '';
          this.fileInput.nativeElement.value = "";
          this.importedData = Object.values(data);
          this.oiimpjrpData = [];
			  const map = new Map(Object.entries(data));
			  if (map.size > 0) {
				  map.forEach((value, key) => {
				  if (value) 
				  {
					let rowData = {
						'moduleName': key,
						'fileName': key + ".jrxml"
					}
					rowData["select"] = false;
					this.oiimpjrpData.push(rowData);
				}						  
				});
        }	
      }		 
		  }else{
        this.type = 'error';
        this.message = this.translateService.translate('oiimpjrp.unsupportedfile');
        this.show();
      }
	  })
	}


  onSelectFile( event ) {
   this.files = event.target.files;
   this.fileName = this.files[0].name;
  }

  cancel(){
    this.fileName = '';
    this.files = '';
    this.fileInput.nativeElement.value = "";
    this.selectedOption = '';
  }
     
	
}
