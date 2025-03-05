import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ProsmainService } from '../service/prosmain.service';
import { saveAs } from 'file-saver';
import { CmnprossService } from '../service/cmnpross.service';

@Component({
  selector: 'app-oiexppro',
  templateUrl: './oiexppro.component.html',
  styleUrls: ['./oiexppro.component.css']
})
export class OiexpproComponent implements OnInit {

  actionName: string;
  msgs: any[] = [];
  msglist: any[];
  message: any;
  type: any;
  oiexpproData = [];
  oiexpproColumnDef: any[];
  cmnProcessColumnDef: any[];
  cmnProcessData:any[] = [];

   @ViewChild('oiexpproGrid', {static: false}) oiexpproGrid;

  
  dropdownOptions = [
    { description: 'Process', code: 'PROCESS'},
    { description: 'Common Process', code: 'CMNPROCESS'},
  ];
  selectedOption = 'PROCESS';
  isProcess: boolean = true;
  isCommonProcess: boolean = false;

  constructor(public translateService: TranslateService, private oiexpproFactory: ProsmainService,
    private cmnprossFactory: CmnprossService) {

   }

  ngOnInit() {
    this.oiexpproColumnDef = [
      {
        fieldName: this.translateService.translate('common.select'), field: 'select',
        width: 150, datatype: 'checkbox', editable: true
      },
      {
        fieldName: this.translateService.translate('oiexppro.prcessdescription'), field: 'processDesc',
        editable: false, width: 150, datatype: 'text', uppercase: 'false', required: true
      },
      {
				fieldName: this.translateService.translate('common.category'), field: 'category',required: true, editable: true, width: 150,
				datatype: 'lov', domain: 'PROCESS_CATE'
			},
      {
        fieldName: this.translateService.translate('oiexppro.lastsaved'), field: 'modifyDatetime', editable: false, width: 150,
        datatype: 'dateTime'
      },
      {
        fieldName: this.translateService.translate('oiexppro.createduser'), field: 'createUserId', editable: false, width: 150,
        datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oiexppro.modifieduser'), field: 'modifyUserId', editable: false, width: 150,
        datatype: 'text', uppercase: 'false'
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
				fieldName: this.translateService.translate('common.category'), field: 'category',required: true, editable: true, width: 150,
				datatype: 'lov', domain: 'PROCESS_CATE'
			},
      {
        fieldName: this.translateService.translate('prosmain.lastsaved'), field: 'modifyDatetime', editable: false, width: 150,
        datatype: 'dateTime'
      },
      {
        fieldName: this.translateService.translate('prosmain.createduser'), field: 'createUserId', editable: false, width: 150,
        datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('prosmain.modifieduser'), field: 'modifyUserId', editable: false, width: 150,
        datatype: 'text', uppercase: 'false'
      },
    ];

    this.oiexpproExecuteQuery();
    
  }

  dropdownChange(){
    if(this.selectedOption == undefined){
      this.isCommonProcess = false;
      this.isProcess = false;
      this.type = 'error';
      this.message = this.translateService.translate('oiexppro.pleaseselectaprocess');
      this.show();
      this.oiexpproExecuteQuery();
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

 oiexpproExecuteQuery() {
  const serviceObj = this.oiexpproFactory.processExecuteQuery();
		serviceObj.subscribe(data => {
			if (data.length === 0) {
				this.oiexpproData = [];
        this.cmnProcessData = [];
			} else {
				this.oiexpproData = [];
        this.cmnProcessData = [];
        for(let i=0;i<data.length;i++){
          let rowData = data[i];
          rowData["select"] = false;
          if(rowData.commonProcess == 'Y'){
            this.cmnProcessData.push(rowData)
          }
          else{
            this.oiexpproData.push(rowData)
          } 
        }
			}
		});
 }


  onProcessExport() {
    let selectedArr = [];
    for (let i = 0; i < this.oiexpproData.length; i++) {
      if (this.oiexpproData[i].select && this.oiexpproData[i].select == true) {
        let procObj = {
          "processKey":this.oiexpproData[i].processKey,
          "processDesc":this.oiexpproData[i].processDesc,
          "bpmn":this.oiexpproData[i].bpmn,
          "triggerId":this.oiexpproData[i].triggerId,
          "category":this.oiexpproData[i].category,
          "timerProcess":this.oiexpproData[i].timerProcess
      };
        selectedArr.push(procObj)
      }
    }
    if (selectedArr.length == 0) {
      this.type = 'warn';
      this.message = this.translateService.translate('oiexppro.selectatleaseonerecord');
      this.show();
      return false;
    }

    const serviceObj = this.oiexpproFactory.exportProcesses(selectedArr);
    serviceObj.subscribe(data => {
      if (data.error) {
        
        this.type = 'warn';
        this.message = this.translateService.translate('No response');
        this.show();
      } else {
        saveAs(data, 'processes.zip');
      }
    })

  }

  onCmnProcessExport(){
    
    let selectedArr = [];
    for (let i = 0; i < this.cmnProcessData.length; i++) {
      if (this.cmnProcessData[i].select && this.cmnProcessData[i].select == true) {
        let procObj = {
          "processKey":this.cmnProcessData[i].processKey,
          "processDesc":this.cmnProcessData[i].processDesc,
          "bpmn":this.cmnProcessData[i].bpmn,
          "triggerId":this.cmnProcessData[i].triggerId,
          "commonProcess" : this.cmnProcessData[i].commonProcess,
          "category":this.cmnProcessData[i].category
      };
        selectedArr.push(procObj)
      }
    }
    if (selectedArr.length == 0) {
      this.type = 'warn';
      this.message = this.translateService.translate('oiexppro.selectatleaseonerecord');
      this.show();
      return false;
    }

    const serviceObj = this.oiexpproFactory.exportProcesses(selectedArr);
    serviceObj.subscribe(data => {
      if (data.error) {
        
        this.type = 'warn';
        this.message = this.translateService.translate('No response');
        this.show();
      } else {
        saveAs(data, 'cmnprocesses.zip');
      }
    })
  }

}
