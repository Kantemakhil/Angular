import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { LegalCustodyStatusCommitBean } from '@inst/legal-screens/maintenance/beans/LegalCustodyStatusCommitBean';
import { LegalCustodyStatus } from '../beans/LegalCustodyStatus';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OimcustsService } from '../service/oimcusts.service';



@Component({
  selector: 'app-oimcusts',
  templateUrl: './oimcusts.component.html'
})

export class OimcustsComponent implements OnInit {
  @ViewChild('grid', { static: true }) custodyGrid: any;
  msgs: any[] = [];
  custodyColumnDef: any[];
  custodyData: LegalCustodyStatus[] = [];
  custodyInsertList: LegalCustodyStatus[] = [];
  custodyUpdateList: LegalCustodyStatus[] = [];
  custodyDeleteList: LegalCustodyStatus[] = [];
  custodyCommitBean: LegalCustodyStatusCommitBean = new LegalCustodyStatusCommitBean();
  message = ' Invalid.';
  type = 'error';
  msglist = [];

  constructor(public translateService: TranslateService, public oimcustsService: OimcustsService) {
    this.custodyColumnDef = [];
    this.custodyData = [];

  }

  ngOnInit() {
    this.custodyExecuteQuery();
    this.custodyColumnDef = [

      {
        fieldName: this.translateService.translate('oimcusts.code'), datatype: 'text', field: 'statusCode', cellEditable: this.canCellEdit,
        width: 150, required: true, maxlength: 12
      },
      {
        fieldName: this.translateService.translate('oimcusts.description'), datatype: 'text', field: 'statusDescription', editable: true,
        width: 150, required: true, maxlength: 40, uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oimcusts.rank'), datatype: 'number', field: 'statusRank', editable: true,
        width: 150, whole: true,required: true
      },
      {
        fieldName: this.translateService.translate('oimcusts.intake'), datatype: 'checkbox', field: 'intakeFlag', editable: true,
        width: 150
      },
      {
        fieldName: this.translateService.translate('oimcusts.release'), datatype: 'checkbox', field: 'releaseFlag', editable: true,
        width: 150
      },
      {
        fieldName: this.translateService.translate('oimcusts.alwaysDisplayFlag'), datatype: 'checkbox', field: 'alwaysDisplayFlag', editable: true,
        width: 150
      },
      {
        fieldName: this.translateService.translate('oimcusts.activeFlag'), datatype: 'checkbox', field: 'activeFlag', editable: true,
        width: 150
      },
      {
        fieldName: this.translateService.translate('oimcusts.expiryDate'), datatype: 'date', field: 'expiryDate', editable: false,
        width: 150
      }
    ];

  }

  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }
  validateRowData = (event) => {
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;

  if (event && event.field === 'activeFlag') {
    (event.data.activeFlag) ? this.custodyGrid.setColumnData('expiryDate', event.rowIndex, undefined) : this.custodyGrid.setColumnData('expiryDate', event.rowIndex, DateFormat.getDate());
  }

    let intakeCount = 0;
    let releaseCount = 0;
    if (event && (event.field === 'intakeFlag' || event.field === 'releaseFlag')) {
      for (let i = 0; i < this.custodyData.length; i++) {
        if (this.custodyData[i]['intakeFlag']) {
          intakeCount = intakeCount + 1;
        }
        if (this.custodyData[i]['releaseFlag']) {
          releaseCount = releaseCount + 1;
        }
      }
      if (intakeCount > 1) {
        this.custodyGrid.setColumnData('intakeFlag', event.rowIndex, false);
        this.type = 'warn';
        this.message = this.translateService.translate('oimcusts.onlyoneintakeshouldbechecked');
        this.show();
        rowdata.validated = true;
        return rowdata;
      }

      if (releaseCount > 1) {
        this.custodyGrid.setColumnData('releaseFlag', event.rowIndex, false);
        this.type = 'warn';
        this.message = this.translateService.translate('oimcusts.onlyonereleaseshouldbechecked');
        this.show();
        rowdata.validated = true;
        return rowdata;
      }
    }

    if(event.field==='statusCode' || event.field==='statusDescription' || event.field==='statusRank' ){
      if(Number(event.data.statusRank)===0){
        this.type = 'warn';
        this.message = this.translateService.translate('Rank should starts with 1');
        this.show();
        rowdata.validated = true;
        return rowdata;
      }
      for (let i = 0; i < this.custodyData.length; i++) {
        for (let j = 0; j < this.custodyData.length; j++) {
            if (i !== j && this.custodyData[i]['statusCode'] === this.custodyData[j]['statusCode']) {
              this.custodyGrid.setColumnData('statusCode', event.rowIndex, undefined);
              this.type = 'warn';
              this.message = this.translateService.translate('oimcusts.codeshouldnotbeduplicate');
              this.show();
              rowdata.validated = true;
              return rowdata;
            }
  
            if (this.custodyData[i].statusDescription === this.custodyData[j].statusDescription && i !== j) {
              this.custodyGrid.setColumnData('statusDescription', event.rowIndex, undefined);
              this.type = 'warn';
              this.message = this.translateService.translate('oimcusts.descriptionshouldnotbeduplicate');
              this.show();
              rowdata.validated = true;
              return rowdata;
            }
    
            if (Number(this.custodyData[i]['statusRank']) === Number(this.custodyData[j]['statusRank'])  && i !== j) {
              this.type = 'warn';
              this.message = this.translateService.translate('oimcusts.rankalreadyinuse');
              this.show();
              rowdata.validated = true;
              return rowdata;
            }
        }
    }
    }
   
   
      return rowdata;
    }


    onGridReady = () => {
      return {
        activeFlag: true
      }
    }

    canCellEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
        return true;
      } else {
        return false;
      }
    }
    custodySave(event) {
        this.custodyInsertList = [];
        this.custodyUpdateList = [];
        this.custodyDeleteList = [];
        this.custodyInsertList = event.added;
        this.custodyUpdateList = event.updated;

        this.custodyCommitBean.insertList = [];
        this.custodyCommitBean.updateList = [];
        this.custodyCommitBean.deleteList = [];
        for (let i = 0; i < this.custodyData.length; i++) {
          for (let j = 0; j < this.custodyData.length; j++) {
              if (i !== j && this.custodyData[i]['statusCode'] === this.custodyData[j]['statusCode']) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcusts.codeshouldnotbeduplicate');
                this.show();
                return ;
              }
    
              if (this.custodyData[i].statusDescription === this.custodyData[j].statusDescription && i !== j) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcusts.descriptionshouldnotbeduplicate');
                this.show();
                return ;
              }
      
              if (Number(this.custodyData[i]['statusRank']) === Number(this.custodyData[j]['statusRank'])  && i !== j) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcusts.rankalreadyinuse');
                this.show();
                return ;
              }
          }
      }

          if (this.custodyInsertList.length > 0) {
            for (let i = 0; i < this.custodyInsertList.length; i++) {
              if (!this.custodyInsertList[i]['statusCode']) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcusts.statusCoderequuired');
                this.show();
                return;
              }
              if (!this.custodyInsertList[i]['statusDescription']) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcusts.statusDescriptionrequired');
                this.show();
                return;
              }

              if (Number(this.custodyInsertList[i]['statusRank'])===0) {
                this.type = 'warn';
                this.message = this.translateService.translate('Rank should starts with 1');
                this.show();
                return;
              }
              if (!this.custodyInsertList[i]['statusRank']) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcusts.statusRankrequired');
                this.show();
                return;
              }
              this.custodyInsertList[i]['intakeFlag'] = this.custodyInsertList[i]['intakeFlag'] ? 'Y' : 'N';
              this.custodyInsertList[i]['activeFlag'] = this.custodyInsertList[i]['activeFlag'] ? 'Y' : 'N';
              this.custodyInsertList[i]['releaseFlag'] = this.custodyInsertList[i]['releaseFlag'] ? 'Y' : 'N';
              this.custodyInsertList[i]['alwaysDisplayFlag'] = this.custodyInsertList[i]['alwaysDisplayFlag'] ? 'Y' : 'N';
              this.custodyInsertList[i]['expiryDate'] =  this.custodyInsertList[i]['activeFlag'] === 'N' ? DateFormat.getDate() : null;
            }
            this.custodyCommitBean.insertList = this.custodyInsertList;
          }
          if (this.custodyUpdateList.length > 0) {
            for (let i = 0; i < this.custodyUpdateList.length; i++) {
              if (!this.custodyUpdateList[i]['statusCode']) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcusts.statusCoderequuired');
                this.show();
                return;
              }
              if (!this.custodyUpdateList[i]['statusDescription']) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcusts.statusDescriptionrequired');
                this.show();
                return;
              }
              if (Number(this.custodyUpdateList[i]['statusRank'])===0) {
                this.type = 'warn';
                this.message = this.translateService.translate('Rank should starts with 1');
                this.show();
                return;
              }
              if (!this.custodyUpdateList[i]['statusRank']) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimcusts.statusRankrequired');
                this.show();
                return;
              }
              this.custodyUpdateList[i]['intakeFlag'] = this.custodyUpdateList[i]['intakeFlag'] ? 'Y' : 'N';
              this.custodyUpdateList[i]['activeFlag'] = this.custodyUpdateList[i]['activeFlag'] ? 'Y' : 'N';
              this.custodyUpdateList[i]['releaseFlag'] = this.custodyUpdateList[i]['releaseFlag'] ? 'Y' : 'N';
              this.custodyUpdateList[i]['alwaysDisplayFlag'] = this.custodyUpdateList[i]['alwaysDisplayFlag'] ? 'Y' : 'N';
              this.custodyUpdateList[i].expiryDate =  this.custodyUpdateList[i].activeFlag === 'N' ? DateFormat.getDate() : null;
            }
            this.custodyCommitBean.updateList = this.custodyUpdateList;
          }
          const obj = this.oimcustsService.custodyCommit(this.custodyCommitBean);
          obj.subscribe(data => {
            if (data === 1) {
              this.type = 'success';
              this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
              this.show();
              this.custodyExecuteQuery();
              return;
            } 
            else {
              this.type = 'error';
              this.message = this.translateService.translate('common.addupdateremoverecordfailed');
              this.show();
              this.custodyExecuteQuery();
              return;
            }
          });
       
      }

      onGridClear = () => {
        this.custodyExecuteQuery();
        return true;
      }

      custodyExecuteQuery() {
        const obj = this.oimcustsService.getCustodyData();
        obj.subscribe(data => {
          if (data.length == 0) {
            this.custodyData = [];
          }
          else {
            data.forEach(ele => {
              ele.activeFlag = ele['activeFlag'] === 'Y' ? true : false;
              ele.intakeFlag = ele['intakeFlag'] === 'Y' ? true : false;
              ele.releaseFlag = ele['releaseFlag'] === 'Y'? true : false;
              ele.alwaysDisplayFlag = ele['alwaysDisplayFlag'] === 'Y' ? true : false;
            })
            this.custodyData = data;
          }
        });
      }




    }


