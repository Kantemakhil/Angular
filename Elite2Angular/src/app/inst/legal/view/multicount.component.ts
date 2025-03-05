import {
  Component,
  OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcdchgsuService } from '../../../inst/legal/service/ocdchgsu.service';

@Component({
  selector: 'app-multicount',
  templateUrl: './multicount.component.html',
  styleUrls: ['./multicount.component.scss']
})



export class MulticountComponent implements OnInit {

  consecutiveLov: any;
  consToLineCoumndef:any[];
  disabled:boolean;
  msglist=[];
  message = ' Invalid.';
  type = 'error';
  msgs: any[] = [];
  public selected=-1;
  consToLineData = [];
  statutes = [];
  isDeletable:boolean=false;
  selectedCharges = [];
@ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
  constructor(public translateService: TranslateService, private OcdchgsuFactory: OcdchgsuService) {
  
}
  ngOnInit(){
     //Added for S4-21726 
    this.consToLineCoumndef = [
        { fieldName: this.translateService.translate('ocuchgse.select'), datatype: 'checkbox', field: 'select', editable: true, required: true },
        { datatype: 'text', wrapText: true, hide: true, field: 'uniqueKey', editable: false },
        { datatype: 'number', field: 'count', fieldName: this.translateService.translate('ocuchgse.count'), editable: true, required: true },
        { datatype: 'text', field: 'code', fieldName: this.translateService.translate('ocuchgse.code'), editable: false },
        { datatype: 'text', field: 'description', fieldName: this.translateService.translate('ocuchgse.description'),  editable: false},
        { datatype: 'text', field: 'act', fieldName: this.translateService.translate('ocuchgse.act'), editable: false },
        { datatype: 'text', field: 'legislativeBody', fieldName: this.translateService.translate('ocuchgse.legislativeBody'),  editable: false },
    ]
      this.populateStatutes();
      if ( this.dialog.data ) {
          if(this.dialog.data.consecutiveToLine==undefined && this.dialog.data.consecutiveToLine==null) {
              this.isDeletable = false;
          } else {
              this.isDeletable = true;
          }
      }
      this.disabled = false;
      this.populateConsToLine();
  }


  populateStatutes(){
      this.OcdchgsuFactory.getAllStatutes().subscribe(
          (res) => {
              this.statutes = res;
      });
  }
  
  populateConsToLine(){
      let data = [];
      this.OcdchgsuFactory.getAllOffences().subscribe(
          (res) => {
              for(let i=0;i<res.length;i++){
                if( res[i] &&  res[i].activeFlag == 'Y'){
                    let item = res[i];
                    item['select'] = false;
                    item['count'] = 1;
                    item['uniqueKey'] = 'unique'+ i;
                    data.push(item);
                }    
              }
              this.consToLineData = data;
      })
  }

  onUpdatedMapsData(e){
    if(e && e.updated && e.field == 'select'){
      let record = e.updated;
      if(record.select){
        this.selectedCharges.push(record);
      }
      else{
          for(let i=0;i<this.selectedCharges.length;i++){
              if(this.selectedCharges[i].uniqueKey == record.uniqueKey){
                  this.selectedCharges.splice(i, 1);
              }
          }
      }
    }
  }

  onclearedData(e){
    this.selectedCharges = [];
  }

  getSelectedRecords(){
      let selectedRow = [];
      for(let i=0;i<this.consToLineData.length;i++){
          if(this.consToLineData[i].select){
              selectedRow.push(this.consToLineData[i]);
          }
       }
      return selectedRow;
  }

  checkCountValidation(records){
      for(let i=0;i<records.length;i++){
         if(records[i].count < 1){
          return false;
         }
      }
      return true;
  }
  
  processSelectedData() {
      let selectedRecords = this.getSelectedRecords();
      if(selectedRecords.length == 0) {
          this.type = 'warn';
          this.message = this.translateService.translate( 'Please select atleast one record');
          this.show();
          return;
      } 
      else if(!this.checkCountValidation(selectedRecords)){
          this.type = 'warn';
          this.message = this.translateService.translate( 'Count should be natural number');
          this.show();
          return;
      }
      else {
          let selectedArr = [];
          for(let i=0;i<selectedRecords.length;i++){
              let opObj = {...selectedRecords[i]};
              let actCode = this.getCodeFromAct(opObj.act)
              opObj["act"] =  actCode;
              selectedArr.push(opObj)
          }
          this.dialog.close(selectedArr);
      }
  }
  
  show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
      }
  
  cancel(): void {
      this.dialog.close(null);
    }


    getCodeFromAct(act){
      for(let i=0;i<this.statutes.length;i++){
         if(this.statutes[i].description == act){
             return this.statutes[i].code;
         }
      }
      return null;
    }

}
