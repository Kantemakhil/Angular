import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcdlegloService } from '../service/ocdleglo.service';

@Component({
  selector: 'app-noncustrelated',
  templateUrl: './noncustrelated.component.html',
  styleUrls: ['./noncustrelated.component.css']
})
export class NonCustRelatedComponent implements OnInit {

    msglist=[];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    relatedToLineNonCustData: any[];
    relatedToLineCustData: any[];
    removedRow:any = {};
    removedColumns = ["court","commenceType","relatedTo","relatedToLaunch","lengthBtn","pel"];
    
  @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
  relatedToLineNonCustDataTemp: any;
  relatedToLineCustDataTemp: any;
  relatedToLineNCusCoumndef: any;
  relatedToLineCusCoumndef: any;
  ncustTermData: any;
  orderStatusData: any;
  sentTypeList =[];

  constructor(
    public translateService: TranslateService,
    private OcdlegloFactory : OcdlegloService,
    private loginService: LoginService
        ) {

}

  ngOnInit(){
    this.orderStatusList();
    this.relatedToLineNCusCoumndef = this.loadColumnDefs('NCUS');
    this.relatedToLineCusCoumndef = this.loadColumnDefs('CUST');
    if(this.dialog.data.relatedOrder == null){
      this.removedRow = this.dialog.data;
      this.OcdlegloFactory.loadSentTermNcust().subscribe(data => {
        if(data && data.length){
          this.ncustTermData = data;
        }
        this.OcdlegloFactory.populateSentType("CUST").subscribe(custType => {
          if(custType && custType.length){
            this.sentTypeList = custType;
          }
          this.loadJsonData();
        });
      });
    } 
  }


  filterNcustData(){
    let rmIdx = -1;
    this.relatedToLineNonCustDataTemp.forEach((obj, idx) => {
      if(obj.displayNo == this.removedRow.displayNo) rmIdx = idx;
    })
    this.relatedToLineNonCustDataTemp.splice(rmIdx, 1);
    let relatedData = JSON.parse(JSON.stringify(this.relatedToLineNonCustDataTemp));
    relatedData.forEach(obj=>{
      if(obj.relatedTo == this.removedRow.displayNo){
        let rmIdx = this.relatedToLineNonCustDataTemp.findIndex(ele=>ele.displayNo == obj.displayNo);
        if(rmIdx !< 0){
          this.relatedToLineNonCustDataTemp.splice(rmIdx, 1);
        }
      }
      if (this.ncustTermData && this.ncustTermData.length) {
        this.ncustTermData.forEach(sent => {
          if (sent.sentType == 'UNCS' && sent.code == obj.sentenceCalcType) {
            let rmIdx = this.relatedToLineNonCustDataTemp.findIndex(ele => ele.displayNo == obj.displayNo);
            if (!(rmIdx < 0)) {
              this.relatedToLineNonCustDataTemp.splice(rmIdx, 1);
            }
          }
        });
      }
      let activeType = this.orderStatusData.filter(i => i.updateReasonCode == obj.status);
      if(activeType && activeType[0] && activeType[0].activeType == 'E'){
        let rmIdx = this.relatedToLineNonCustDataTemp.findIndex(ele => ele.displayNo == obj.displayNo);
        if (!(rmIdx < 0)) {
          this.relatedToLineNonCustDataTemp.splice(rmIdx, 1);
        }
      }
    });
    this.relatedToLineNonCustDataTemp.forEach((row) => {
      if (row.displayNo == this.removedRow.relatedTo) {
        row["select"] = true;
      } else {
        row["select"] = false;
      }
    })
    if(this.relatedToLineNonCustDataTemp.length){
      this.relatedToLineNonCustDataTemp.forEach(ord => {
        if (ord.commenceDate && DateFormat.getDate(ord.commenceDate) + '' != 'Invalid Date') {
          ord.commenceDate = DateFormat.format(DateFormat.getDate(ord?.commenceDate));
        }
      })
      this.relatedToLineNonCustData = JSON.parse(JSON.stringify(this.relatedToLineNonCustDataTemp));
    } else {
      this.relatedToLineNonCustData = [];
    }
  }

  filterCustData(){
    const newArr = this.relatedToLineCustDataTemp.filter((row) => {
      let activeType = this.orderStatusData.filter(i => i.updateReasonCode == row.status);
      if (row.displayNo == this.removedRow.relatedTo) {
        row["select"] = true;
      } else {
        row["select"] = false;
      }
      //S4-22015
      if(!row.sentenceType && this.sentTypeList){
        row['sentenceType'] = this.sentTypeList.filter(obj=> row.sentenceCalcType == obj.code)[0]?.sentType;
      }
      if (['IMPS', 'CNCO'].includes(row.sentenceType) && activeType[0] && activeType[0].activeType != 'E') {
        return row;
      }
    })
    newArr.forEach(ord => {
      if (ord.commenceDate && DateFormat.getDate(ord.commenceDate) + '' != 'Invalid Date') {
        ord.commenceDate = DateFormat.format(DateFormat.getDate(ord?.commenceDate));
      }
    })
    if(newArr.length){
      this.relatedToLineCustData = newArr;
    } else {
      this.relatedToLineCustData = [];
    }
  }

  loadJsonData() {
    this.relatedToLineNonCustDataTemp = JSON.parse(JSON.stringify(this.dialog.data.___gridData));
    this.filterNcustData();
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId + '';
    form_identifiers['orderType'] = 'CUST';
    const retData = {
        formName : 'ocdleglo',
        id : 0,
        searchString : JSON.stringify(form_identifiers)
    }
    this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
        if (data && data.formInfoJson) {
            this.relatedToLineCustDataTemp = JSON.parse(data.formInfoJson).myJsonRowData;
            this.filterCustData();
        } else {
          this.relatedToLineCustDataTemp = [];
          this.relatedToLineCustData = [];
        }
    })
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
loadColumnDefs(ordType){
  // this.OcdlegloFactory.loadDatatypes().subscribe((data: any) => {
    const data = this.loginService.mainColDefData;
    let datatypeData = [];
          data.forEach(gridDef => {
            if(ordType == 'NCUS' && gridDef.grid_name == 'nonCustRelated'&& gridDef.module_name == 'OCDNCODE'){
              datatypeData = JSON.parse(gridDef.configData);
            }
            if(ordType == 'CUST' && gridDef.grid_name == 'related'&& gridDef.module_name == 'OCDCORDS'){
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
    // const datatypeData = data && data.related && JSON.parse(data.related);
    const colDefs = [];
    datatypeData.forEach(type => {
        if(type.dataType === 'lov' && type.source === 'link') {
            let lovRendered = 'description';
            if (type.field == 'type') {
              type.url = type.url + ordType;
            }
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
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: false, required: true, width: 150, })
        }
        else if(type.dataType === 'date'&& type.field === 'commenceDate') {
          colDefs.push({datatype:'custom', field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: false, editorSelector: (rowIndex, field, data) => {return 'date'}, rendererSelector: this.custom })
        }
        else if(type.dataType === 'date') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: false, width: 150, })
        } 
        else if(type.dataType === 'checkbox') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName), modal: true, data: 'row', width: 200, height : 'auto', editable: false})
        }
    })
    const relatedToLineCoumndef = [{ datatype:'checkbox', field:'select', editable: true, modal: true, data: 'row', width: 200, height : 'auto'}];
    
    colDefs.forEach(key => {
      if(!this.removedColumns.includes(key.field)){
        relatedToLineCoumndef.push(key)
      }
    });
    return JSON.parse(JSON.stringify(relatedToLineCoumndef));
// });
}

  validateNCustRelatedToLine = (event) => {
    const rowdata = new ValidateRowReturn();
    let newArr = [];
    if(this.relatedToLineCustData && this.relatedToLineCustData.length){
      const tempOrders = JSON.parse(JSON.stringify(this.relatedToLineCustData));
      tempOrders.forEach(order => {
        order["select"] = false;
      })
      if(tempOrders.length){
        this.relatedToLineCustData = JSON.parse(JSON.stringify(tempOrders));
      } else {
        this.relatedToLineCustData = [];
      }
    }
    if (event.field === 'select') {
      if (event.newValue == true) {
        for (let i = 0; i < this.relatedToLineNonCustData.length; i++) {
          let item = this.relatedToLineNonCustData[i];
          if (event.data.displayNo == this.relatedToLineNonCustData[i].displayNo) {
            item["select"] = true;
          }
          else {
            item["select"] = false;
          }
          newArr.push(item)
        }
        if(newArr.length){
          this.relatedToLineNonCustData = newArr;
        } else {
          this.relatedToLineNonCustData = [];
        }
      }
    }
    rowdata.validated = true;
    return rowdata;
  }

  validateCustRelatedToLine = (event) => {
    const rowdata = new ValidateRowReturn();
    let newArr = [];
    if (this.relatedToLineNonCustData && this.relatedToLineNonCustData.length) {
      const tempOrders = JSON.parse(JSON.stringify(this.relatedToLineNonCustData));
      tempOrders.forEach(order => {
        order["select"] = false;
      })
      this.relatedToLineNonCustData = JSON.parse(JSON.stringify(tempOrders));
    }
    if (event.field === 'select') {
      if (event.newValue == true) {
        for (let i = 0; i < this.relatedToLineCustData.length; i++) {
          let item = this.relatedToLineCustData[i];
          if (event.data.displayNo == this.relatedToLineCustData[i].displayNo) {
            item["select"] = true;
          }
          else {
            item["select"] = false;
          }
          newArr.push(item)
        }
        if(newArr.length){
          this.relatedToLineCustData = newArr;
        } else {
          this.relatedToLineCustData = [];
        }
      }
    }
    rowdata.validated = true;
    return rowdata;
  }

  save() {
    let relateTo = '';
    let commenceDate = '';
    if (this.relatedToLineNonCustData && this.relatedToLineNonCustData.length) {
      for (let i = 0; i < this.relatedToLineNonCustData.length; i++) {
        if (this.relatedToLineNonCustData[i].select == true) {
          relateTo = this.relatedToLineNonCustData[i].displayNo;
          commenceDate = this.relatedToLineNonCustData[i].commenceDate;
        }
      }
    }
    if (this.relatedToLineCustData && this.relatedToLineCustData.length) {
      for (let i = 0; i < this.relatedToLineCustData.length; i++) {
        if (this.relatedToLineCustData[i].select == true) {
          relateTo = this.relatedToLineCustData[i].displayNo;
          commenceDate = this.relatedToLineCustData[i].commenceDate;
        }
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

  orderStatusList() {
    this.OcdlegloFactory.rgOrderStatus().subscribe(data => {
      if (data) {
        this.orderStatusData = data;
      }
    });
  }
}
