import { HttpService } from './../../../core/service/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcdlegloService } from '../service/ocdleglo.service';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';


@Component({
  selector: 'app-noncustduration',
  templateUrl: './noncustduration.component.html',
  styleUrls: ['./noncustduration.component.scss']
})

export class NoncustdurationComponent implements OnInit {

  termToLineCoumndef:any[];
  msglist=[];
  message = ' Invalid.';
  type = 'error';
  msgs: any[] = [];
  termToLineData: any[]=[];
  selectedTerms = [];
  lovData = [];
  @ViewChild('noncustodialdurationgrid', {static: true}) noncustodialdurationgrid: any;
@ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
  constructor(
      public translateService: TranslateService,
      private OcdlegloFactory : OcdlegloService,
      private loginService : LoginService,
      private http: HttpService
          ) {
  
}
  ngOnInit(){
      this.loadColumnDefs();
      this.termToLineData = this.dialog.data.terms? JSON.parse(JSON.stringify(this.dialog.data.terms)): [];
      this.lovData = this.dialog.data.lovData? this.dialog.data.lovData: [];
  }

  termToTypeDelete = () => {
    return true;
}
 

  loadColumnDefs(){
      const data = this.loginService.mainColDefData;
      let datatypeData = [];
        data.forEach(gridDef => {
          if(gridDef.grid_name == 'nonCustTerm' && gridDef.module_name == 'OCDNCODE'){
              datatypeData = JSON.parse(gridDef.configData);
          }
      })
      // const datatypeData = data && data.terms && JSON.parse(data.terms);
      const colDefs = [];
      datatypeData.forEach(type => {
        if(type.dataType === 'lov' && type.source === 'link') {
          if(type.field === 'termType' && this.lovData){
            colDefs.push({
              datatype:type.dataType, 
              source:type.sourceType,
              suppressMenu: true, 
              link:type.url.replace(':orderType', 'NCUS').replace(':sentType', this.dialog.data.sentenceCalcType),
              field:type.field,
              fieldName:this.translateService.translate(type.fieldName),
              editable: ![undefined,null,0].includes(type.editable)?type.editable:true, 
              required: type.required,
              cellEditable: this.termTypeEdit
            })
          }else {
            colDefs.push({datatype:type.dataType, source:type.sourceType,suppressMenu: true, link:type.url, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required})
          }
        } else if(type.dataType === 'lov' && type.source === 'domain') {
          colDefs.push({datatype:type.dataType, domain:type.url,fieldName:this.translateService.translate(type.fieldName), field:type.field, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required : true})
        } 
        else if (type.dataType === 'number') {
          colDefs.push({
            datatype: type.dataType,
            fieldName: this.translateService.translate(type.fieldName),
            field: type.field,
            format: type.format,
            maxValue: type.maxValue,
            strictFP: true,
            whole: true,
            cellEditable: this.timeEdit,
            editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true
          })
        } 
        else if(type.dataType === 'checkbox') {
            colDefs.push({
              datatype:type.dataType,
              fieldName:this.translateService.translate(type.fieldName), 
              field:type.field, modal: false, 
              data: 'row', width: 200, height : 'auto', 
              cellEditable: this.checkboxEdit,
              editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true
            })
        }
      })
      this.termToLineCoumndef = [];
      colDefs.forEach(key => this.termToLineCoumndef.push(key));
  }


dataValidatation() {
  for (let i = 0; i < this.termToLineData.length; i++) {
    let rowIndex = i + 1;
    //
    let eachRowData = this.termToLineData[i];
    //
    if(Object.keys(eachRowData).length === 0 || eachRowData.termType == undefined || eachRowData.termType == ""){
      this.type = 'warn';
      this.message = this.translateService.translate('termToLine.pleaseselecttermtype');
      this.show();
      return false
    }
    if((eachRowData.fixedExpiry && eachRowData.fixedExpiry == true ) || (eachRowData.indefinite && eachRowData.indefinite == true)){
       continue;
    }
    for (var key in eachRowData) {
         let value: any = eachRowData[key];
         let config = this.getColumnConfig(key);
         //
         if (!this.forEveryKeyValueInObj(config, value, rowIndex, key)) {
          return false;
         }
    }
    if ((eachRowData.years == undefined || Number(eachRowData.years) == 0) &&
      (eachRowData.months == undefined || Number(eachRowData.months) == 0) &&
      (eachRowData.weeks == undefined || Number(eachRowData.weeks) == 0) &&
      (eachRowData.days == undefined || Number(eachRowData.days) == 0)
    ) {
      this.type = 'warn';
      this.message = this.translateService.translate('termToLine.totallengthcannotbezero');
      this.show();
      return false
    }
  }
  return true;
}

isDecimal(n) {
  var result = n - Math.floor(n) !== 0;
  if (result) return true;
  else return false;
}

forEveryKeyValueInObj(config, value, rowIndex, key) {
  if (config.required && config.required == true) {
    if (value == undefined || value == '') {
      this.type = 'warn';
      this.message = this.translateService.translate('termToLine.pleaseselect')+ ' ' + this.OcdlegloFactory.getDisplayedKey(key);
      this.show();
      return false
    }
    return true;
  }
  else if (!this.numberValidationPass(value, key, rowIndex)) {
    return false
  }
  return true;
}


  numberValidationPass(value, key, rowIndex) {
    if (value !== '' && Number(value) < 0) {
      this.type = 'warn';
      this.message = this.translateService.translate('termToLine.negativevalueisnotallowedfor') + ' ' + this.OcdlegloFactory.getDisplayedKey(key);
      this.show();
      return false;
    }
    else if (key.trim() != 'termType' && (value !== '' && this.isDecimal(Number(value)))) {
      if (key.trim() == 'days' || key.trim() == 'weeks') {
        this.type = 'warn';
        this.message = this.translateService.translate('termToLine.pleaseenterwholenumbers') + ' ' + this.OcdlegloFactory.getDisplayedKey(key);
        this.show();
        return false;
      }
      let haveHalf = Number(value) % 1 == 0.5;
      if (!((key.trim() == 'months' || key.trim() == 'years') && haveHalf)) {
        this.type = 'warn';
        this.message = this.translateService.translate('termToLine.pleaseselectdecimalonlyzeropointfivevaluesfor') + ' ' + this.OcdlegloFactory.getDisplayedKey(key);
        this.show();
        return false;
      }
      return true;
    }
    return true;
  }


getColumnConfig(columName) {
  for (let i = 0; i < this.termToLineCoumndef.length; i++) {
    if (columName == this.termToLineCoumndef[i].field) {
      return this.termToLineCoumndef[i];
    }
  }
}
  
save() {
  if(!this.dataValidatation()){
    return false;
  }
  if(!this.paroleTermValidation()){
    return false;
  }
  // 
  let opStr = '';
  this.termToLineData.forEach((term) => {
    Object.keys(term).forEach(key=>{
      if (term[key] == null) {
        term[key] = "";
      } else if (term[key] && !isNaN(term[key]) && typeof term[key] == 'number') {
        term[key] = term[key].toString();
      }
    });
  });
  this.termToLineData.forEach((term, idx) => {
    opStr = opStr.concat(this.lovData.filter(obj => obj.code == term.termType)[0].description + ' ')
    if(term && term.fixedExpiry && term.fixedExpiry == true){
      opStr = 'Fixed Expiry';
    }
    else if(term && term.indefinite && term.indefinite == true){
      opStr = 'Indefinite';
    }
    if (term.years) {
      let year = parseFloat(term.years).toString();
      opStr = opStr.concat(year).concat('y ')
    }
    if (term.months) {
      let month = parseFloat(term.months).toString();
      opStr = opStr.concat(month).concat('m ')
    }
    if (term.weeks) {
      let week = parseFloat(term.weeks).toString();
      opStr = opStr.concat(week).concat('w ')
    }
    if (term.days) {
      let day = parseFloat(term.days).toString();
      opStr = opStr.concat(day).concat("d ");
    }
    if (idx != this.termToLineData.length - 1) {
      opStr = opStr.concat("\n");
    }
  })
  this.dialog.close({ "terms": this.termToLineData, "termTypeAndLength": opStr });
}


onclearedData(event, gridName?: string) {
  if(gridName == "noncustodialdurationGrid") {
      this.termToLineData = [];
      this.noncustodialdurationgrid.gridOptions.api.forEachNode(node =>{
        this.termToLineData.push(node.data)
      });
  }
  return true;
}

  onGridInsert = () => {
    if(this.termToLineData.length == 0){
      return {};
    }
    for (let i = 0; i < this.termToLineData.length; i++) {
      if (this.termToLineData[i].fixedExpiry && this.termToLineData[i].fixedExpiry == true) {
        this.type = 'warn';
        this.message = 'Can not add because fixed expired is already there';
        this.show();
        return false; 
      }
      if (this.termToLineData[i].indefinite && this.termToLineData[i].indefinite == true) {
        this.type = 'warn';
        this.message = 'Can not add because indefinate expired is already there';
        this.show();
        return false; 
      }
    }
    return {};
  }


paroleTermValidation() {
  const termTypes = [];
  this.termToLineData.forEach(term => {
    termTypes.push(term.termType)
  });
  if (termTypes.includes('NPP')) {
    if (!termTypes.includes('IMP')) {
      this.type = 'warn';
      this.message = this.translateService.translate('termToLine.pleaseaddoneimp');
      this.show();
      return false;
    }
  }
  if(termTypes.length > new Set(termTypes).size) {
    // Cannot add more than 1 termtype
    this.type = 'warn';
    this.message = this.translateService.translate('termToLine.duplicateterms');
    this.show();
    return false;
  }
  /* // Maybe useful in future, commenting now for S4-16835
  if(termTypes.filter(obj=>obj == 'NPP').length>1) {
    // Cannot add more than 1 NPP
    this.type = 'warn';
    this.message = this.translateService.translate('termToLine.morethanonenpp');
    this.show();
    return false;
  }
  if(termTypes.filter(obj=>obj == 'IMP').length>1) {
    // Cannot add more than 1 IMP
    this.type = 'warn';
    this.message = this.translateService.translate('termToLine.morethanoneimp');
    this.show();
    return false;
  } */
  if (termTypes.includes('NPP')) {
    let impRec = this.termToLineData.filter(obj=>obj.termType == 'IMP')[0];
    let impDays = this.calcDays(impRec);
    let nppRec = this.termToLineData.filter(obj=>obj.termType == 'NPP')[0];
    let nppDays = this.calcDays(nppRec);
    if(nppDays > impDays) {
      // NPP cannot be greater than IMP
      this.type = 'warn';
      this.message = this.translateService.translate('termToLine.nppgrtimp');;
      this.show();
      return false;
    }
  }
  
  return true;
}


calcDays(impRec: any) {
  let yDays = isNaN(+impRec.years)?0:+impRec.years*364;
  let mDays = isNaN(+impRec.months)?0:+impRec.months*30;
  let wDays = isNaN(+impRec.weeks)?0:+impRec.weeks*7;
  let dDays = isNaN(+impRec.days)?0:+impRec.days;
  return yDays + mDays + wDays + dDays;
}
  
  show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
      }
  
  cancel(): void {
      this.dialog.close(null);
    }


    timeEdit = (data: any, index: number, field: string) => {
      if (data && data.fixedExpiry && data.fixedExpiry == true) {
          return false;
      }
      else if(data && data.indefinite && data.indefinite == true){
         return false;
      }
      return true;
    }

    termTypeEdit = (data: any, index: number, field: string) => {
      let oD = JSON.parse(JSON.stringify(this.dialog.data.terms));
      for (let i = 0; i < oD.length; i++) {
        if(oD[i].termType == data.termType){
          return false;
        }
      }
      return true;
    }
  
  
    checkboxEdit = (data: any, index: number, field: string): boolean => {
      return true;
    }

  validateRowTerms = (event)=>{
    const rowdata = new ValidateRowReturn();
    const rowIndex = event.rowIndex;
    if(event.field == "fixedExpiry" && event.data.fixedExpiry && event.data.fixedExpiry == true){
      this.noncustodialdurationgrid.setColumnData('years', rowIndex, '');
      this.noncustodialdurationgrid.setColumnData('months', rowIndex, '');
      this.noncustodialdurationgrid.setColumnData('weeks', rowIndex, ''); 
      this.noncustodialdurationgrid.setColumnData('days', rowIndex, '');
      this.noncustodialdurationgrid.setColumnData('indefinite', rowIndex, false);
    }

    if (event.field == "indefinite" && event.data.indefinite && event.data.indefinite == true){
      this.noncustodialdurationgrid.setColumnData('years', rowIndex, '');
      this.noncustodialdurationgrid.setColumnData('months', rowIndex, '');
      this.noncustodialdurationgrid.setColumnData('weeks', rowIndex, ''); 
      this.noncustodialdurationgrid.setColumnData('days', rowIndex, '');
      this.noncustodialdurationgrid.setColumnData('fixedExpiry', rowIndex, false);
    }

    if(this.termToLineData.filter(obj => obj.termType == event.data['termType']).length > 1) {
      // Termtype already Persent, reset to empty
      this.type = 'warn';
      this.message = this.translateService.translate('termToLine.duplicateterms');
      this.show();
      rowdata.validated = false;
      return rowdata;
    }
    /* // Maybe useful in future, commenting now for S4-16835
    if (event.data['termType'] == "NPP") {
      if(this.termToLineData.filter(obj=>obj.termType == 'NPP').length>1) {
        // NPP already Persent, reset to empty
        this.type = 'warn';
        this.message = this.translateService.translate('termToLine.morethanonenpp');
        this.show();
        rowdata.validated = false;
        return rowdata;
      }
    } else if (event.data['termType'] == "IMP") {
      if(this.termToLineData.filter(obj=>obj.termType == 'IMP').length>1) {
        // IMP already Persent, reset to empty
        this.type = 'warn';
        this.message = this.translateService.translate('termToLine.morethanoneimp');
        this.show();
        rowdata.validated = false;
        return rowdata;
      }
    } */
    rowdata.validated = true;
    return rowdata;
  }

}
