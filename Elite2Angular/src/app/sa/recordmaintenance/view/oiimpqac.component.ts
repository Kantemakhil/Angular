import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ApimainService } from '../service/apimain.service';

@Component({
  selector: 'app-oiimpqac',
  templateUrl: './oiimpqac.component.html',
  styleUrls: ['./oiimpqac.component.css']
})
export class OiimpqacComponent implements OnInit {

  fileName = '';
  files:any = '';
  @ViewChild('fileInput') fileInput : ElementRef;
  msgs: any[] = [];
  msglist: any[];
  message: any;
  type: any;
  importedData:any;
  oiimpqacData:any[] = [];
  oiimpqacColumnDef: any[];
  @ViewChild('oiimpqacGrid', {static: false}) oiimpqacGrid;

  constructor(public translateService: TranslateService,
    private oiimpqacFactory: ApimainService) {}

  ngOnInit() {
    this.oiimpqacColumnDef = [
      {
        fieldName: this.translateService.translate('common.select'), field: 'select',
        width: 150, datatype: 'checkbox', editable: true
      },
      {
        fieldName: this.translateService.translate('oiimpqac.querykey'), field: 'queryKey', datatype: 'text',
        editable: false, width: 150, required: true
      },
      {
        fieldName: this.translateService.translate('oiimpqac.apiid'), field: 'apiId', editable: false, width: 150,
        datatype: 'text', required: true
      },
      {
        fieldName: this.translateService.translate('oiimpqac.apidescription'), field: 'apiDescription', editable: false, width: 150,
        datatype: 'text', uppercase: 'false', required: true
      },
      {
        fieldName: this.translateService.translate('oiimpqac.url'), field: 'url', editable: false, width: 150,
        datatype: 'lov', uppercase: 'false', required: true, link: 'apimain/rgUrlKeyRecordGroup'
      },
      {
        fieldName: this.translateService.translate('oiimpqac.conflict'), field: 'conflict', editable: false, width: 150,
        datatype: 'text', uppercase: 'false'
      },
    ];

  }

  show() {
   this.msglist = [];
   this.msglist.push({ message: this.message, type: this.type });
   this.msgs = [...this.msglist];
 }

//  oiimpqacExecuteQuery() {
//   const serviceObj = this.oiimpqacFactory.apimainExecuteQuery();
// 		serviceObj.subscribe(data => {
// 			if (data.length === 0) {
// 				this.oiimpqacData = [];
// 			} else {
// 				this.oiimpqacData = [];
//         for(let i=0;i<data.length;i++){
//           let rowData = data[i];
//           rowData["select"] = false;
//           this.oiimpqacData.push(rowData)
//         }
// 			}
// 		});
//   }


  save(){
    let selectedArr = [];
    for(let i=0;i<this.oiimpqacData.length;i++){
      if(this.oiimpqacData[i].select && this.oiimpqacData[i].select == true){
        selectedArr.push(this.oiimpqacData[i])
      }
    }
    if(selectedArr.length == 0){
      this.type = 'warn';
      this.message = this.translateService.translate('oiimpqac.selectatleastonerecord');
      this.show();
      return false;
    }
    this.callImportandDeployApi();
  }


  callImportandDeployApi(){
    let selectedRecord = [];
    for(let i=0;i<this.oiimpqacData.length;i++){
      if(this.oiimpqacData[i].select && this.oiimpqacData[i].select == true){
        selectedRecord.push(this.oiimpqacData[i])
      }
    }
    let selectedQueryKeys = [];
    for(let i=0;i<selectedRecord.length;i++){
       let queryKey = selectedRecord[i].queryKey;
       if(queryKey && !selectedQueryKeys.includes(queryKey)){
         selectedQueryKeys.push(queryKey)
       }
    }

    let parametersArr = [];
    for(let j=0;j<this.importedData.parameters.length;j++){
      let queryKey = this.importedData.parameters[j].queryKey;
      if(queryKey && selectedQueryKeys.includes(queryKey)){
        parametersArr.push(this.importedData.parameters[j])
      }  
   }

   let quickActionsArr = [];
    for(let k=0;k<this.importedData.quickActions.length;k++){
      let queryKey = this.importedData.quickActions[k].queryKey;
      if(queryKey && selectedQueryKeys.includes(queryKey)){
        quickActionsArr.push(this.importedData.quickActions[k])
      } 
   }

   let obj = {
    apiConf : selectedRecord,
    parameters : parametersArr,
    quickActions : quickActionsArr
   }

    const serviceObj = this.oiimpqacFactory.deployQuickActions(obj);
		serviceObj.subscribe(data => {
      if (data === 1) {
        this.type = 'success';
        this.message = this.translateService.translate('common.savemessage');
        this.show();
        this.filterRecord();
      }
    });

  }

  filterRecord(){
    let uncheckedRecord = [];
    for(let i=0;i<this.oiimpqacData.length;i++){
      if(!this.oiimpqacData[i].select){
        uncheckedRecord.push(this.oiimpqacData[i])
      }
    }
    this.oiimpqacData = uncheckedRecord;
  }

  import() {
    if (this.fileName == '' || this.files == '') {
      this.type = 'warn';
      this.message = this.translateService.translate('oiimpqac.pleaseselectfile');
      this.show();
      return false;
    }
    let fileList: FileList = this.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('importFile', file);
      const serviceObj = this.oiimpqacFactory.importQuickActions(formData);
      serviceObj.subscribe(data => {
        if(Object.keys(data).length > 0){
          this.type = 'success';
          this.message = this.translateService.translate('oiimpqac.successfullyimported');
          this.show();
          this.fileName = '';
          this.files = '';
          this.fileInput.nativeElement.value = "";
          this.importedData = data;
          let importGridData = Object.values(this.importedData.apiConf);
          this.oiimpqacData = [];
          for (let i = 0; i < importGridData.length; i++) {
            let rowData = importGridData[i];
            rowData["select"] = false;
            this.oiimpqacData.push(rowData)
          }
        }else{
          this.type = 'error';
          this.message = this.translateService.translate('oiimpqac.unsupportedfile');
          this.show();
        }
      })
    }
  }

  onSelectFile( event ) {
   this.files = event.target.files;
   this.fileName = this.files[0].name;
   var extension = this.files[0].type;
   // 
  }

  cancel(){
    this.fileName = '';
    this.files = '';
    this.fileInput.nativeElement.value = "";
    this.importedData = '';
  }

}
