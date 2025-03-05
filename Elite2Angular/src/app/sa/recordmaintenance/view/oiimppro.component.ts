import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@common/translate/translate.service';
import { ConfirmationDialogComponent } from '@core/ui-components/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { BpmnProcess } from '../beans/BpmnProcess';
import { BpmnProcessCommitBean } from '../beans/BpmnProcessCommitBean';
import { ProsmainService } from '../service/prosmain.service';

@Component({
  selector: 'app-oiimppro',
  templateUrl: './oiimppro.component.html',
  styleUrls: ['./oiimppro.component.css']
})
export class OiimpproComponent implements OnInit {


  fileName = '';
  files:any = '';
  @ViewChild('fileInput') fileInput : ElementRef;
  dialogRef: MatDialogRef<ConfirmationDialogComponent> | null;
  msgs: any[] = [];
  msglist: any[];
  message: any;
  type: any;
  oiimpproData:any[] = [];
  importedData:any;
  oiimpproColumnDef: any[];
  cmnProcessColumnDef: any[];
  cmnProcessData:any[] = [];
  @ViewChild('oiimpproGrid', {static: false}) oiimpproGrid;

  dropdownOptions = [
    { description: 'Process', code: 'PROCESS'},
    { description: 'Common Process', code: 'CMNPROCESS'},
  ];
  selectedOption = 'PROCESS';

  isProcess: boolean = true;
  isCommonProcess: boolean = false;

  constructor(public translateService: TranslateService,
    private oiimpproFactory: ProsmainService,
    public dialog: MatDialog, private dialogService: DialogService) {}

  ngOnInit() {
    this.oiimpproColumnDef = [
      {
        fieldName: this.translateService.translate('common.select'), field: 'select',
        width: 150, datatype: 'checkbox', editable: true
      },
      {
        fieldName: this.translateService.translate('oiimppro.prcessdescription'), field: 'processDesc',
        editable: false, width: 150, datatype: 'text', uppercase: 'false', required: true
      },
      {
        fieldName: this.translateService.translate('oiimppro.conflict'), field: 'conflict', editable: false, width: 150,
        datatype: 'checkbox', uppercase: 'false'
      },
    ];

    this.cmnProcessColumnDef = [
      {
        fieldName: this.translateService.translate('common.select'), field: 'select',
        width: 150, datatype: 'checkbox', editable: true
      },
      {
        fieldName: this.translateService.translate('prosmain.prcessdescription'), field: 'processDesc', editable: false, width: 150,
        datatype: 'text', uppercase: 'false', required: true
      },
      {
        fieldName: this.translateService.translate('oiimppro.conflict'), field: 'conflict', editable: false, width: 150,
        datatype: 'checkbox', uppercase: 'false'
      },
    ];

  }


  dropdownChange(){
    this.fileName = '';
    this.files = '';
    this.fileInput.nativeElement.value = "";
    this.oiimpproData = [];
    this.cmnProcessData = [];

    if(this.selectedOption == undefined){
      this.isProcess = false;
      this.isCommonProcess = false;
    }
    else if(this.selectedOption == "PROCESS"){
      this.isProcess = true;
      this.isCommonProcess = false;
    }
    else if(this.selectedOption == "CMNPROCESS"){
      this.isCommonProcess = true;
      this.isProcess = false;
    }

  }
  

  show() {
   this.msglist = [];
   this.msglist.push({ message: this.message, type: this.type });
   this.msgs = [...this.msglist];
 }

//  oiimpproExecuteQuery() {
//   const serviceObj = this.oiimpproFactory.processExecuteQuery();
// 		serviceObj.subscribe(data => {
// 			if (data.length === 0) {
// 				this.oiimpproData = [];
// 			} else {
// 				this.oiimpproData = [];
//         for(let i=0;i<data.length;i++){
//           let rowData = data[i];
//           rowData["select"] = false;
//           this.oiimpproData.push(rowData)
//         }
// 			}
// 		});
//   }


saveProcessAndCommonProcess(){
    let selectedArr = [];
    if(this.isProcess){
      for(let i=0;i<this.oiimpproData.length;i++){
        if(this.oiimpproData[i].select && this.oiimpproData[i].select == true){
          selectedArr.push(this.oiimpproData[i])
        }
      }
    }
    else if(this.isCommonProcess){
      for(let i=0;i<this.cmnProcessData.length;i++){
        if(this.cmnProcessData[i].select && this.cmnProcessData[i].select == true){
          selectedArr.push(this.cmnProcessData[i])
        }
      }
    }
    
    if(selectedArr.length == 0){
      this.type = 'warn';
      this.message = this.translateService.translate('oiimppro.selectatleaseonerecord');
      this.show();
      return false;
    }
    this.openModal(true);
}


  saveAndDeployProcess(){
    let selectedArr = [];
    if(this.isProcess){
      for(let i=0;i<this.oiimpproData.length;i++){
        if(this.oiimpproData[i].select && this.oiimpproData[i].select == true){
          selectedArr.push(this.oiimpproData[i])
        }
      }
    }
    else if(this.isCommonProcess){
      for(let i=0;i<this.cmnProcessData.length;i++){
        if(this.cmnProcessData[i].select && this.cmnProcessData[i].select == true){
          selectedArr.push(this.cmnProcessData[i])
        }
      }
    }
    if(selectedArr.length == 0){
      this.type = 'warn';
      this.message = this.translateService.translate('oiimppro.selectatleaseonerecord');
      this.show();
      return false;
    }
    this.openModal(false);
  }

  openModal(isSaveOnly: boolean) {
    if (this.isProcess && !isSaveOnly) {
      let selectedRecord = [];
      for (let i = 0; i < this.oiimpproData.length; i++) {
        if (this.oiimpproData[i].select && this.oiimpproData[i].select == true) {
          selectedRecord.push(this.oiimpproData[i])
        }
      }
      this.validateBulkDeploy(selectedRecord);
    } else {
      this.openActionsModal(isSaveOnly);
    }
  }


  callCommonProcessSaveApi(isSaveOnly: boolean){
    
    let selectedRecord = [];
    for(let i=0;i<this.cmnProcessData.length;i++){
      if(this.cmnProcessData[i].select && this.cmnProcessData[i].select == true){
        selectedRecord.push(this.cmnProcessData[i])
      }
    }
    
    const commitObj = new BpmnProcessCommitBean();
    commitObj.insertList = selectedRecord.filter(sr => !sr.processId);
    commitObj.updateList = selectedRecord.filter(sr => sr.processId);
    const serviceObj = this.oiimpproFactory.processBulkCommit(commitObj);
		serviceObj.subscribe(data => {
      this.oiimpproFactory.processExecuteQuery().subscribe(existData => {
        if (existData && existData.length) {
          existData.forEach(existObj => {
            selectedRecord.forEach((obj: BpmnProcess) => {
              if (obj.processKey == existObj.processKey) {
                obj.processId = existObj.processId;
                obj.defVersion = existObj.defVersion;
                obj.bpmn = existObj.bpmn;
              }
            })
          });
          if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.savemessage');
            this.show();
            if(!isSaveOnly) {
              this.oiimpproFactory.deployProcesses(selectedRecord).subscribe(data => {
                if (data && (data.successList || data.failureList)) {
                  this.type = 'success';
                  this.message = this.translateService.translate('common.savemessage');
                  this.show();
                }
                this.filterRecordCmn();
              });
            } else {
              this.filterRecordCmn();
            }
          }
        }
      });
      // if (data === 1) {
      //   this.type = 'success';
      //   this.message = this.translateService.translate('common.savemessage');
      //   this.show();
      //   this.filterRecordCmn();
      // }
    });
  }

  callImportandDeployProcessApi(isSaveOnly: boolean) {
    let selectedRecord = [];
    for(let i=0;i<this.oiimpproData.length;i++){
      if(this.oiimpproData[i].select && this.oiimpproData[i].select == true){
        selectedRecord.push(this.oiimpproData[i])
      }
    }

    
    // call api from here
    const commitObj = new BpmnProcessCommitBean();
    commitObj.insertList = selectedRecord.filter(sr => !sr.processId);
    commitObj.updateList = selectedRecord.filter(sr => sr.processId);
    const serviceObj = this.oiimpproFactory.processBulkCommit(commitObj);
		serviceObj.subscribe(data => {
      this.oiimpproFactory.processExecuteQuery().subscribe(existData => {
        if (existData && existData.length) {
          existData.forEach(existObj => {
            selectedRecord.forEach((obj: BpmnProcess) => {
              if (obj.processKey == existObj.processKey) {
                obj.processId = existObj.processId;
                obj.defVersion = existObj.defVersion;
                obj.bpmn = existObj.bpmn;
              }
            })
          });
          if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.savemessage');
            this.show();
            if(!isSaveOnly) {
              this.oiimpproFactory.deployProcesses(selectedRecord).subscribe(data => {
                if (data && (data.successList || data.failureList)) {
                  this.type = 'success';
                  this.message = this.translateService.translate('common.savemessage');
                  this.show();
                }
                this.filterRecord();
              });
            } else {
              this.filterRecord();
            }
          }
        }
      });
    });

  }


  filterRecord(){
    let uncheckedRecord = [];
    for(let i=0;i<this.oiimpproData.length;i++){
      if(!this.oiimpproData[i].select){
        uncheckedRecord.push(this.oiimpproData[i])
      }
    }
    this.oiimpproData = uncheckedRecord;
  }

  filterRecordCmn(){
    let uncheckedRecord = [];
    for(let i=0;i<this.cmnProcessData.length;i++){
      if(!this.cmnProcessData[i].select){
        uncheckedRecord.push(this.cmnProcessData[i])
      }
    }
    this.cmnProcessData = uncheckedRecord;
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
    if (fileList.length > 0 && this.isProcess) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('importFile', file);
      const serviceObj = this.oiimpproFactory.importProcesses(formData);
      serviceObj.subscribe(data => {
        if(Object.keys(data).length > 0){
          this.type = 'success';
          this.message = this.translateService.translate('oiimppro.successfullyimported');
          this.show();
          this.fileName = '';
          this.files = '';
          this.fileInput.nativeElement.value = "";
          this.importedData = Object.values(data);
          this.oiimpproData = [];
          for (let i = 0; i < this.importedData.length; i++) {
            let rowData = this.importedData[i];
            rowData["select"] = false;
            this.oiimpproData.push(rowData)
          }
        }else{
          this.type = 'error';
          this.message = this.translateService.translate('oiimppro.unsupportedfile');
          this.show();
        }
      })
    }

    if (fileList.length > 0 && this.isCommonProcess) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('importFile', file);
      const serviceObj = this.oiimpproFactory.importProcesses(formData);
      serviceObj.subscribe(data => {
        if(Object.keys(data).length > 0){
          this.type = 'success';
          this.message = this.translateService.translate('oiimppro.successfullyimported');
          this.show();
          this.fileName = '';
          this.files = '';
          this.fileInput.nativeElement.value = "";
          this.importedData = Object.values(data);
          this.cmnProcessData = [];
          for (let i = 0; i < this.importedData.length; i++) {
            let rowData = this.importedData[i];
            rowData["select"] = false;
            this.cmnProcessData.push(rowData)
          }
        }else{
          this.type = 'error';
          this.message = this.translateService.translate('oiimppro.unsupportedfile');
          this.show();
        }
      })
    }

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
  
  validateBulkDeploy = (dataOne) => {
    this.oiimpproFactory.validateBulkDeploy(dataOne).subscribe(returnData => {
      if (returnData.length > 0) {
        this.showPopUp(returnData);
      } else {
        if (this.isProcess) {
          this.openActionsModal(false);
        }
      }
    }, err => {
      this.type = 'warn';
      this.message = this.translateService.translate('common.addupdateremoverecordfailed');
      this.show();
    });
  }

  showPopUp(data) {
    if( data?.length > 0){
      let triggerMessage = '';
      data.forEach(ele => {
        if(ele.processList){
          triggerMessage = triggerMessage + this.translateService.translate('The trigger %trigger% in %latestprocess% process is already assosciated with the process %processDesc% \n').replace('%processDesc%', ele.processList[0].processDesc).
          replace('%latestprocess%',ele.latestProcess).replace('%trigger%',ele.description)
        }
      });
      const popupData = {
        label: triggerMessage + 'Do you want to override it?',
        yesBtn: true, noBtn: true
      };
      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', popupData, 50).subscribe(result => {
        if (result) {
          let bpmnList = [];
          data.forEach(ele => {
            bpmnList.push(...ele.processList);
          });
          this.oiimpproFactory.deleteBulkTrigger(bpmnList).subscribe(returnData => {
            if (returnData > 0) {
              this.openActionsModal(false);
            }
          });
        }
      });
    }
   
  }

  openActionsModal(isSaveOnly){
    const dialogConfig = {
      label:this.translateService.translate('oiimppro.confirmationmessage'),
      heading: this.translateService.translate('oiimppro.confirmation'),
      yesBtn: true, noBtn: true
    };
    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dialogConfig, 50).subscribe(result => { 
      if (this.isProcess && result && result == true) {
        this.callImportandDeployProcessApi(isSaveOnly);
      }
      else if(this.isCommonProcess && result && result == true){
        this.callCommonProcessSaveApi(isSaveOnly);
      }
    });
  }


}
