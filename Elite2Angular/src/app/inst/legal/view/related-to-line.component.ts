import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcdlegloService } from '../service/ocdleglo.service';

@Component({
  selector: 'app-related-to-line',
  templateUrl: './related-to-line.component.html',
  styleUrls: ['./related-to-line.component.css']
})
export class RelatedToLineComponent implements OnInit {

    relatedToLineCoumndef:any[];
    msglist=[];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    relatedToLineData: any[]=[];
    removedRow:any = {};
    removedColumns = ["court","commenceType","relatedTo","relatedToLaunch","lengthBtn","pel"];
    sentTypeList =[];
    
  @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
  @ViewChild('rtlgrid', {static: true}) rtlgrid: any;
  relatedToLineDataTemp: any;

  constructor(
    public translateService: TranslateService,
    private OcdlegloFactory : OcdlegloService,
    private loginService: LoginService
        ) {

}

  ngOnInit(){
    this.loadColumnDefs();
    if (this.dialog.data.relatedOrder == null) {
      this.removedRow = this.dialog.data;
      this.sentTypeList = this.dialog.data['___sentTypeList'];
      this.loadJsonData();
    } 
  }


  filterData(){
    let rmOrders = this.getCircularOrders(this.removedRow.displayNo);
    this.removeCircularOrders(rmOrders);
    this.relatedToLineData = this.relatedToLineDataTemp.filter((row) => {
      if (row.displayNo == this.removedRow.relatedTo) {
        row["select"] = true;
      } else {
        row["select"] = false;
      }
      //S4-22015
      if(!row.sentenceType && this.sentTypeList){
        row['sentenceType'] = this.sentTypeList.filter(obj=> row.sentenceCalcType == obj.code)[0]?.sentType;
      }
      if (['IMPS', 'CNCO'].includes(row.sentenceType) && row.activeType !='E') {
        return row;
      }
    });
  }
  
  getCircularOrders(input) {
    let rmList = [];
    for (let i=0; i<this.relatedToLineDataTemp.length; i++) {
      let currObj = this.relatedToLineDataTemp[i];
      if (rmList.includes(currObj.displayNo)) {
        continue;
      }
      if (currObj.displayNo == input || currObj?.relatedTo == input || rmList.includes(currObj?.relatedTo)) {
        rmList.push(currObj.displayNo);
      }
    }
    return rmList;
  }

  removeCircularOrders(rmOrders) {
    rmOrders.forEach(ordNo => {
        let rmIdx = this.relatedToLineDataTemp.findIndex(ele => ele.displayNo == ordNo);
        if (rmIdx >= 0) {
          this.relatedToLineDataTemp.splice(rmIdx, 1);
        }
    });
  }
  
  loadJsonData() {
    this.relatedToLineDataTemp = JSON.parse(JSON.stringify(this.dialog.data.___gridData));
    this.filterData();
  }

loadColumnDefs(){
  // this.OcdlegloFactory.loadDatatypes().subscribe((data: any) => {
    const data = this.loginService.mainColDefData;
    let datatypeData = [];
          data.forEach(gridDef => {
            if(gridDef.grid_name == 'related'&& gridDef.module_name == 'OCDCORDS'){
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
    // const datatypeData = data && data.related && JSON.parse(data.related);
    const colDefs = [];
    datatypeData.forEach(type => {
        if(type.dataType === 'lov' && type.source === 'link') {
            let lovRendered = 'description';
            colDefs.push({datatype:type.dataType,fieldName:this.translateService.translate(type.fieldName),lovRender: lovRendered, link:type.url, field:type.field, editable: false, required: true, source: type.sourceType})
        } 
        else if(type.dataType === 'lov' && type.source === 'domain') {
            colDefs.push({datatype:type.dataType,fieldName:this.translateService.translate(type.fieldName), domain:type.url, field:type.field, editable: false})
        }
        else if(type.dataType === 'text') {
            colDefs.push({datatype:type.dataType,fieldName:this.translateService.translate(type.fieldName), field: type.field, editable: false,hide: type.hide,wrapText: true})
        }
        else if(type.dataType === 'number') {
          colDefs.push({ datatype:type.dataType,field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: false })
        }
        else if(type.dataType === 'launchbutton') {
            colDefs.push({datatype:type.dataType, field:type.field, link: type.link, updateField: 'row', modal: true, data: 'row', width: 200, dialogWidth: '80%',})
        }
        else if(type.dataType === 'date' && type.field === 'orderedDate') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate('ocuchgse.ordereddate'), editable: false, required: true, width: 150, })
        }
        else if(type.dataType === 'date'&& type.field === 'commenceDate') {
          colDefs.push({datatype:'custom', field:type.field,fieldName:this.translateService.translate('ocuchgse.commencedate'),  editable: false, editorSelector: (rowIndex, field, data) => {return 'date'}, rendererSelector: this.custom })
        } 
        else if(type.dataType === 'date') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: false, width: 150, })
        } 
        else if(type.dataType === 'checkbox') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName), modal: true, data: 'row', width: 200, height : 'auto', editable: false})
        }
    })
    this.relatedToLineCoumndef = [{ datatype:'checkbox', field:'select',fieldName:this.translateService.translate('ocuchgse.select'), editable: true, modal: true, data: 'row', width: 200, height : 'auto'}];
    
    colDefs.forEach(key => {
      if(!this.removedColumns.includes(key.field)){
        this.relatedToLineCoumndef.push(key)
      }
    });
// });
}

custom = (rowIndex, field, data) => {
  if (field == 'commenceDate' || 'holdExpiryDate' == field) {
    if (!data[field] || DateFormat.getDate(data[field]) + '' != 'Invalid Date') {
      return 'date';
    } else {
      return;
    }
  }
}
  validateRelatedToLine = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'select' && event.newValue == true) {
      for (let i = 0; i < this.relatedToLineData.length; i++) {
        if (event.data.displayNo == this.relatedToLineData[i].displayNo) {
         this.rtlgrid.setColumnData('select',i,true);
        }
        else {
         this.rtlgrid.setColumnData('select',i,false);
        }
      }
    }
    rowdata.validated = true;
    return rowdata;
  }

  save() {
    let relateTo = '';
    let commenceDate = '';
    for (let i = 0; i < this.relatedToLineData.length; i++) {
      if (this.relatedToLineData[i].select == true) {
        relateTo = this.relatedToLineData[i].displayNo;
        commenceDate = this.relatedToLineData[i].commenceDate;
      }
    }
    if(this.removedRow.commenceType == 'CC') {
      this.removedRow.commenceDate = commenceDate;
    } else {
      this.removedRow.commenceDate = '';
    }
    this.removedRow.relatedTo = relateTo;
    this.dialog.close(this.removedRow);
  }

show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
    }

cancel(): void {
    this.dialog.close(null);
  }

}
