import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderSearchService } from '@core/ui-components/search-block/offender-search.service';
import { OcdchgsuService } from '../service/ocdchgsu.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import * as moment from 'moment';
import { OcdlegloService } from '../service/ocdleglo.service';
import { ConfirmationDialogComponent } from '@core/ui-components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ocdchgsu-dlg',
  templateUrl: './ocdchgsu_dlg.component.html',
  styleUrls: ['./ocdchgsu_dlg.component.scss']
})
export class OcdchgsuDlgComponent implements OnInit {

  @ViewChild('ocdchgsugrid', {static: true}) ocdchgsugrid: any;
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  message = ' Invalid.';
  msglist = [];
  type = 'error';
  myJsonRowData: any = [];
  inActiveCharges: any = [];
  myColDefs: any[];
  msgs: any[];
  dataId: any;
  screenName = 'ocdchgsu';
  savedData = [];
  btnDisable: boolean = false;
  offenderBookId: any;
  linkedChargesList = new Set();
  dialogRef: MatDialogRef<ConfirmationDialogComponent> | null;
  applyTransaction:boolean = false;
  linkedOrdCharges = [];
  allOffences: any [];
  deletedCharges: any = [];
  bulkOutcomeUpdList = [];
  okMsg: string;


  constructor(private OcdchgsuFactory: OcdchgsuService, public translateService:TranslateService,
    public loginService : LoginService, public dialogService: DialogService,
    private offenderSearchService: OffenderSearchService, 
    private OcdlegloFactory: OcdlegloService,
    public dialogMat: MatDialog) { 
    }
    
ngOnInit(): void {
    // this.getAllOffences();
    this.allOffences = this.dialog.data.allOffences;
    this.loadColDefData();
    // this.dialog.data.offenderBookId = this.dialog.data.offenderBookId;
    this.loadCustodialOrderData();
    this.linkedChargesList = new Set();
  }


  loadColDefData(){
        const data = this.loginService.mainColDefData;
        let datatypeData = [];
          data.forEach(gridDef => {
            if(gridDef.grid_name == 'chargesDlg'&& gridDef.module_name == 'OCDCHGSU'){
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
        // const datatypeData = data && data.charges && JSON.parse(data.chargesDlg);
        const colDefs = [];
        datatypeData.forEach(type => {
            if(type.dataType === 'lov' && type.source === 'link') {
                colDefs.push({fieldName:this.translateService.translate(type.fieldName),datatype:type.dataType, source:type.sourceType, link:type.url, field:type.field, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, parentFields: type.parentFields, cellEditable: this.editChargeSummaryGrid})
            } 
            else if(type.dataType === 'lov' && type.source === 'domain') {
                colDefs.push({fieldName:this.translateService.translate(type.fieldName),datatype:type.dataType, domain:type.url, field:type.field, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, cellEditable: this.editChargeSummaryGrid})
            }
            else if(type.dataType === 'text') {
                if(type.field == 'matter'){
                    type.restrictCharacters = ['"','\\'];
                }
                colDefs.push({fieldName:this.translateService.translate(type.fieldName),datatype:type.dataType,wrapText: true, hide: type.hide, field:type.field, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, cellEditable: this.editChargeSummaryGrid, maxWidth: 500,  restrictCharacters: type.restrictCharacters })
            }
            else if(type.dataType === 'launchbutton') {
                colDefs.push({fieldName:'',datatype:type.dataType, displayFields: type.displayFields,lovUrl: type.lovUrl, parentField: type.parentField, onLaunchClick: this.onLaunchClick, required: type.required, field:type.field, link: type.link, updateField: 'row', modal: true, data: 'row', width: 200, dialogWidth: '80%', cellEditable: this.editChargeSummaryGrid})
            }
            else if(type.dataType === 'hyperlink') {
                colDefs.push({datatype:'hyperlink',width:50,displayas: 'image',suppressMenu: true, displayFields: type.displayFields,lovUrl: type.lovUrl, parentField: type.parentField, onLaunchClick: this.onLaunchClick, required: type.required,fieldName:type.fieldName?this.translateService.translate(type.fieldName):'', field:type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%', cellEditable: this.editChargeSummaryGrid})
            }
            else if(type.dataType === 'date' && type.field === 'orderedDate') {
                colDefs.push({fieldName:this.translateService.translate(type.fieldName),datatype:type.dataType, field:type.field, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, width: 150, cellEditable: this.editChargeSummaryGrid })
            }
            else if(type.dataType === 'date') {
                colDefs.push({fieldName:this.translateService.translate(type.fieldName),datatype:type.dataType, field:type.field, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, width: 150, cellEditable: this.editChargeSummaryGrid, hide: type.hide })
            } 
            else if(type.dataType === 'checkbox') {
                colDefs.push({fieldName:this.translateService.translate(type.fieldName),datatype:type.dataType, field:type.field, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required})
            }
        })
        this.myColDefs = [];
        colDefs.forEach(key => this.myColDefs.push(key));
        this.loadJsonData();
        this.OcdchgsuFactory.getInactiveCharges().subscribe(data=>{
            this.inActiveCharges = data;
        })
  }
  setLaunchImage(data) {
    data.forEach(ele => {
        ele['descriptionLaunch'] = "assets/images/legal-launch-btn-icon.png";
        ele['details'] = "assets/images/legal-launch-btn-icon.png";
    });
    return data;
}
  loadJsonData() {
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId;
    const retData = {
        formName : this.screenName,
        id : this.dataId?this.dataId : 0,
        searchString : JSON.stringify(form_identifiers)
    }
    this.OcdchgsuFactory.loadData(retData).subscribe((data: any) => {
        if (data && data.formInfoJson) {
            data.formInfoJson = this.clone(JSON.parse(data.formInfoJson));

            data.formInfoJson.forEach(ele=>{
                ele.select = false;
                let selectOffence  = this.allOffences?this.allOffences.filter(i=>i.offenceId == ele.offenceId)[0]:undefined;
                ele['act'] = selectOffence?selectOffence.statuteCode:undefined;
                ele['code'] = selectOffence?selectOffence.code:undefined;
                ele['description'] = selectOffence?selectOffence.description:undefined;
            
            });
            if(this.dialog.data.chargesRowData){
            for(var i= 0; i<this.dialog.data.chargesRowData.length;i++){
                data.formInfoJson.forEach(ele=>{
                    if(this.dialog.data.chargesRowData[i] && this.dialog.data.chargesRowData[i].chargeId == ele.chargeId) {
                        ele.select = true;
                        this.linkedOrdCharges.push(ele.chargeId);
                    }
                }); 
            }
            }
            this.myJsonRowData = JSON.parse(JSON.stringify(data.formInfoJson));
            if(this.myJsonRowData && this.myJsonRowData.length) {
                this.setLaunchImage(this.myJsonRowData);
            }

            this.savedData = JSON.parse(JSON.stringify(data.formInfoJson));
            
            this.dataId = data.id;
        } else {
            this.myJsonRowData = [];
            this.savedData = [];
        }
        this.deletedCharges = [];
    })
    // this.OcdlegloFactory.loadJsonData().subscribe((data: any) => {
    //     this.myJsonRowData = data;
    // })
  }

show() {
    this.msglist = [];
    this.msglist.push( { message: this.message, type: this.type } );
    this.msgs = [...this.msglist];
}

    validateRowDataChargeSummary = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field == "select" && event.data.outcome && this.inActiveCharges.includes(event.data.outcome)) {
            // if user try to link charges
            if (event.oldValue && this.linkedOrdCharges.includes(event.data.chargeId)) {
                this.message = this.translateService.translate('ocdchgsu.cantunlink');
                this.type = "warn";
                this.show()
                rowdata.validated = false;
                return rowdata;
            } else if (!event.oldValue && !this.linkedOrdCharges.includes(event.data.chargeId)) {
                this.message = this.translateService.translate("ocdchgsudlg.selectionerror");
                this.type = "error";
                this.show()
                this.ocdchgsugrid.setColumnData('select', rowIndex, false);
            }
        }
        if(event.newValue != event.oldValue) {
            // if ( event.field === 'act' ) {
            //     rowdata.validated = true;
            //     rowdata.data = { code: '',description: '', type: ''};
            //     if(event.newValue) {
            //         rowdata.data['descriptionLaunch'] = "assets/images/legal-launch-btn-icon.png";
            //     } else {
            //         rowdata.data['descriptionLaunch'] = "";
            //     }
            //     return rowdata;
        
            // }
            if( event.field === 'code' ) {
                rowdata.validated = true;
                rowdata.data = { type: ''};
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

onSave( event ) {
    if(!this.isDataValid()){
        return ;
    }
    if(this.deletedCharges && this.deletedCharges.length > 0){
        this.deleteChargeHty();
    }
    var form_identifiers = {};
    var submitData = JSON.parse(JSON.stringify(this.myJsonRowData));
    submitData.forEach(obj => {
        obj = this.processResult(obj);
    })
    form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId;
    const submissionData = {
        formName : this.screenName,
        id : this.dataId?this.dataId : 0,
        formInfoJson : JSON.stringify(submitData),
        formIdentifier : JSON.stringify(form_identifiers)
    }    
    this.OcdchgsuFactory.saveData(submissionData).subscribe(data => {
        //submit success
        if(data) {
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.type = 'success';
            this.show();
            this.setLaunchImage(this.myJsonRowData);
            if(!this.savedData || this.savedData.length == 0){
                this.loadJsonData();
            }
            this.myJsonRowData = JSON.parse(JSON.stringify(this.myJsonRowData));
            this.savedData = JSON.parse(JSON.stringify(this.myJsonRowData));
            this.deletedCharges = [];
        } else {
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.type = 'error';
            this.show();
        }
        // this.successEmitter.emit(' ');
        // this.currentForm.emit('submitDone');
        // this.refreshForm.emit({
        //     form: this.rendData,
        //     submission: submitDataTemp
        // });
        
    }); 
    
}
onLaunchClick = (event) => {
    if (event && event.chargeId && this.linkedChargesList.has(event.chargeId) == true && event.___link != "/OCDCHGDT") {
        this.message = this.translateService.translate("ocdchgsu.cannotupdatecodeoflinkedcharge");
        this.type = 'warn';
        this.show();
        return false;
    }
   //S4-23190
    if(event.___link == "/OCDCHGDT"){
        event["isDisabled"] = false;
        event["offenderBookId"] =  this.dialog.data.offenderBookId + '';
        event['dataId'] = this.dataId;
        event['charges'] =JSON.parse(JSON.stringify(this.myJsonRowData));
    } else {
        event.___link = "/multiCount"
    }
    this.dialogService.openLinkDialog(event.___link, event, 90).subscribe(charges => {
        if(charges &&  event.___link == '/OCDCHGDT') {
            this.loadJsonData();
        } else if (charges && charges.isDetails) {
            delete charges["isDetails"];
            const node = this.ocdchgsugrid.gridOptions.api.getSelectedNodes().length && this.ocdchgsugrid.gridOptions.api.getSelectedNodes()[0];
            for (let j = 0; j < Object.keys(charges).length; j++) {
                let key = Object.keys(charges)[j] + '';
                if (node.data[key] != charges[key]) {
                    this.ocdchgsugrid.setColumnData(key, node.rowIndex, charges[key]);
                }
            }
        } else {
        if (charges) {
            const node = this.ocdchgsugrid.gridOptions.api.getSelectedNodes().length && this.ocdchgsugrid.gridOptions.api.getSelectedNodes()[0];
            let fields = event.___parentField;
            let alreadyFilledFields = [];
            let finalo = ['incidentDate', 'plea', 'Range', 'particulars',"offenceId"];
            for (var k in event) {
                if (event.hasOwnProperty(k) && finalo.includes(k) && event[k] && event[k] !== '') {
                    alreadyFilledFields.push(k)
                }
            }
            if (alreadyFilledFields.length == 0) {
                this.commonExecutionCode(charges, node.rowIndex, fields, event, alreadyFilledFields)
            }
            else {
                this.openModal(charges, node.rowIndex, fields, event,alreadyFilledFields);  
            }
            this.applyTransaction = false;
            }
        }
    });
}


commonExecutionCode(charges, index, fields, event, alreadyFilledFields) {
    let doClick = false;
    for (let i = 0; i < charges.length; i++) {
        let rowData = charges[i];
        for (let j = 0; j < rowData.count; j++) {
            if (j == 0) {
                if (!doClick) {
                    this.appendChargesinGrid(index, fields, rowData);
                }
                else {
                    this.clickAppendChargesinGrid(event, fields, rowData, alreadyFilledFields);
                }
            }
            else {
                this.clickAppendChargesinGrid(event, fields, rowData, alreadyFilledFields)
            }
        }
        doClick = true;
    }
}

clickAppendChargesinGrid(event, fields, rowData, alreadyFilledFields) {
    let addEle = document.querySelector('#charges-dlg-grid').querySelector('.add-btn') as any;
    addEle.click();
    let newRecordIndex = this.myJsonRowData.length - 1;
    let node = this.ocdchgsugrid.gridOptions.api.getDisplayedRowAtIndex(newRecordIndex);
    if(node && event.matter){
        node.setDataValue('matter', event.matter);
    }
    if(this.applyTransaction){
        for (let j = 0; j < alreadyFilledFields.length; j++) {
            let key = alreadyFilledFields[j];
            node.setDataValue(key, event[key]);
        }
    }
    this.appendChargesinGrid(newRecordIndex, fields, rowData);
}

appendChargesinGrid(index, parentField, resultObj) {
    let node = this.ocdchgsugrid.gridOptions.api.getDisplayedRowAtIndex(index);
    parentField.forEach(key => {
        if (node) {
            node.setDataValue(key, resultObj[key]);
            this.ocdchgsugrid.onGridSizeChanged();
        }
    })
}

openModal(charges, index, fields, event, alreadyFilledFields) {
    let message = 'Do you want to use same ' + alreadyFilledFields.join(', ') + ' for selected charges';
    const dialogConfig = {
      data: { 
              title: 'Confirmation',
              message: message
            },
      disableClose: true,
      hasBackdrop: true,
      height: '170px',
      width: '100%',
    };
    this.dialogRef = this.dialogMat.open(ConfirmationDialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
        this.dialogRef = null;
        this.applyTransaction = false;
        if (result && result == true) {
            this.applyTransaction = true; 
        }
        this.commonExecutionCode(charges, index, fields, event, alreadyFilledFields)
    });
}


onButSaveClick() {
    const selectedRows = this.myJsonRowData.filter(obj=>obj.select);
    // const allMatters = this.myJsonRowData.map(obj=>obj.matter);
    
    try{
        /* if(this.savedData.length != this.myJsonRowData.length) throw new Error();
        this.savedData.forEach(ele=>{
            if(!allMatters.includes(ele.matter)){
                throw new Error();
            }
        }); */
        if (!selectedRows || (selectedRows && selectedRows.length == 0)) {
            this.message = this.translateService.translate('ocdchgsu.selectonechg');
            this.type = 'warn';
            this.show()
            return;
        }
        const savedData  = JSON.parse(JSON.stringify(this.savedData));
        savedData.forEach(obj=>{
            obj = this.processResult(obj);
            delete obj.descriptionLaunch;
            delete obj.select;
        });

        const myJsonRowData = JSON.parse(JSON.stringify(this.myJsonRowData));
        myJsonRowData.forEach(obj=>{
            obj = this.processResult(obj);
            delete obj.descriptionLaunch;
            delete obj.select;
        });

        if(JSON.stringify(savedData) != JSON.stringify(myJsonRowData)){
            throw new Error();
        }
    } catch (error) {
        this.message = "Please save the data before selecting the charge(s)";
        this.type = "warn";
        this.show()
        return;
    }
    this.dialog.close({"selectedRows" : selectedRows, "___ismultiRows" : true, "completeChargesData":this.myJsonRowData, "dataId":this.dataId});
}
onButExitClick() {
    this.dialog.close({'updatedChargesData': this.savedData});
}

onGridInsert = () => {
    let maxChgId = 1;
    let chargeIds = this.myJsonRowData.map(chg=>chg.chargeId);
    if (chargeIds.length) {
        maxChgId = chargeIds.sort(function(a, b){return a - b})[chargeIds.length-1] + 1;
    }
    let addData = {descriptionLaunch : "assets/images/legal-launch-btn-icon.png", chargeId: maxChgId};

    return addData;
}
isDataValid = ()=>{

    try{
        this.validateRequiredFields();
        this.validateFieldData();
    } catch(error) {
        this.message = error;
        this.type = 'warn';
        this.show()
        return false;
    }
    
    return true;
}
validateRequiredFields(){
    this.myJsonRowData.forEach((dataObj,idx)=>{
        this.myColDefs.forEach(colDef => {
            if(colDef.required){
                if(!dataObj[colDef.field] || new RegExp(/^\s*$/).test(dataObj[colDef.field])) {
                    const msg = this.translateService.translate('ocdchgsu.fieldmustenter').replace('%fieldname%',this.translateService.translate(colDef.fieldName));
                    throw msg;
                }
            }
        })
    });
}
validateFieldData(){
    this.myJsonRowData.forEach((dataObj,idx)=>{
        this.myColDefs.forEach(colDef => {
            if(colDef.datatype === 'date'){
                if(dataObj[colDef.field] ) {
                    if(!moment(dataObj[colDef.field], "YYYY-MM-DDThh:mm:ss").toDate()){
                        const msg = this.translateService.translate('ocdchgsu.enterdateformat').replace('%fieldname%', this.translateService.translate(colDef.fieldName)).replace('%dateFormat%',DateFormat.dateFormat);
                        throw msg;
                    }
                    try{
                        var date = moment(dataObj[colDef.field], "YYYY-MM-DDThh:mm:ss").toDate();
                        dataObj[colDef.field] = date;
                    } catch (error) {
                        const msg = this.translateService.translate('ocdchgsu.enterdateformat').replace('%fieldname%', this.translateService.translate(colDef.fieldName)).replace('%dateFormat%',DateFormat.dateFormat);
                        throw msg;
                    }
                    
                    if (DateFormat.compareDate( dataObj[colDef.field], DateFormat.getDate() ) === 1 ) {
                        const msg = this.translateService.translate( 'ocdchgsu.greaterthansysdate' ).replace('%fieldname%', this.translateService.translate(colDef.fieldName));
                        throw msg;
                    }
                }
                /* if(!dataObj['incidentDate'] && dataObj['Range']) {
                    const msg = this.translateService.translate( 'ocdchgsu.selectincident' );
                    throw msg;
                }
                if(dataObj['incidentDate'] && dataObj['Range'] && DateFormat.compareDate( moment(dataObj['incidentDate'], "YYYY-MM-DDThh:mm:ss").toDate(), moment(dataObj['Range'], "YYYY-MM-DDThh:mm:ss").toDate() ) === 1 ){
                    const msg = this.translateService.translate( 'ocdchgsu.rangegrtincidentdate' );
                    throw msg;
                } */
            }
        })
    });
}
/* rangeDateEdit = (data: any, index: number, field: string) => {
    if (field.toUpperCase() == 'RANGE' && (data.incidentDate == undefined || data.incidentDate == '')) {
        return false;
    }
    return true;
} */
loadCustodialOrderData() {
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId + '';
    form_identifiers['orderType'] = 'CUST';
    const retData = {
        formName: 'ocdleglo',
        id: this.dataId ? this.dataId : 0,
        searchString: JSON.stringify(form_identifiers)
    }
    this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId + '';
        form_identifiers['orderType'] = 'NONCUST';
        const retData = {
            formName: 'ocdleglo',
            id: 0,
            searchString: JSON.stringify(form_identifiers)
        }
        this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
            if (data && data.formInfoJson) {
                this.setLinkedChargeList(JSON.parse(data.formInfoJson).myJsonRowData)
            }
            const form_identifiers = {};
            form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId + '';
            form_identifiers['orderType'] = 'BAIL';
            const retData = {
                formName: 'ocdleglo',
                id: 0,
                searchString: JSON.stringify(form_identifiers)
            }
            this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
                if (data && data.formInfoJson) {
                    this.setLinkedChargeList(JSON.parse(data.formInfoJson).myJsonRowData)
                }
            });
        });
        if (data && data.formInfoJson) {
            this.setLinkedChargeList(JSON.parse(data.formInfoJson).myJsonRowData)
        } else {
            this.linkedChargesList = new Set();
        }
    })
}

setLinkedChargeList(custodialList) {
    custodialList.forEach(ord=>{
        if(ord.charges){
            ord.charges.map(chg=>chg.chargeId)?.forEach(this.linkedChargesList.add, this.linkedChargesList);
        }
    });
}

onGridRowDelete = (row) => {
	this.okMsg = this.translateService.translate('ocdchgsu.confirmGridRowDelete');
		const okData = {
			label: this.okMsg,
			yesBtn: true, noBtn: true
		};
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', okData, 50).subscribe(result => {
			if (result) {
                if(this.bulkOutcomeUpdList  && this.bulkOutcomeUpdList.length>0){
                    this.bulkOutcomeUpdList.forEach( (ele,index) => {
                        if(ele.chargeId == row[0].chargeId){
                            this.bulkOutcomeUpdList.splice(index,1);
                        }
                    });
                }
                for (let i = 0; i < this.myJsonRowData.length; i++) {
                    if (this.myJsonRowData[i].select == true) {
                        if (this.linkedChargesList.has(this.myJsonRowData[i].chargeId) == true) {
                            this.message = this.translateService.translate("ocdchgsu.cannotdeletelinkedcharge");
                            this.type = 'warn';
                            this.show();
                            return false;
                        }
                        this.deletedCharges.push(this.myJsonRowData[i]);
                    }
                }
                this.myJsonRowData = this.myJsonRowData.filter(item => !(item.select == true));
                this.onSave(event);
            } else {
                return false
            }
        });
}
editChargeSummaryGrid = (data: any, index: number, field: string) => {
    if(['ACT','CODE', 'DESCRIPTION', 'DETAILS', 'CURRENTSTATUS','OUTCOME'].includes(field.toUpperCase())) return false;
    if (
        data.chargeId &&
        this.linkedChargesList.has(data.chargeId) &&
        (field.toUpperCase() == 'MATTER' || field.toUpperCase() == 'ACT' || field.toUpperCase() == 'CODE' || field.toUpperCase() == 'DESCRIPTION')
    ) {
        return false;
    }
    return true;
}

clone(obj) {return JSON.parse(JSON.stringify(obj))}

processResult(obj){
    Object.keys(obj).forEach(key => {
        if (key.includes('___') || !["chargeId","incidentDate","Range","plea","particulars","offenceId","matter","outcome","type"].includes(key)){
            delete obj[key];
        }
    })
    return obj;
}

selectAllRecord() {
    for (let j = 0; j < this.myJsonRowData.length; j++) {
        let node = this.ocdchgsugrid.gridOptions.api.getDisplayedRowAtIndex(j);
        node.setDataValue('select', true);
    }
}

unselectAllRecord() {
    for (let j = 0; j < this.myJsonRowData.length; j++) {
        let node = this.ocdchgsugrid.gridOptions.api.getDisplayedRowAtIndex(j);
        node.setDataValue('select', false);
    }
}

getAllOffences() {
    this.OcdchgsuFactory.getAllOffences().subscribe(data => {
        this.allOffences = data;
    });
}

deleteChargeHty() {
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId;
    let searchBean = {
        formName : 'OCUCHGOU',
        id : this.dataId?this.dataId : 0,
        searchString : JSON.stringify(form_identifiers)
    }
    this.OcdchgsuFactory.loadData(searchBean).subscribe( chargeHty => {
        let currentFormInfoJson = this.OcdlegloFactory.transformArrToObj(JSON.parse(chargeHty.formInfoJson));
        let intialFormInfoJson = JSON.stringify(currentFormInfoJson);
        Object.keys(currentFormInfoJson).forEach(chgId => {
            this.deletedCharges.forEach(ele => {
                if(+chgId == ele.chargeId){
                    delete currentFormInfoJson[chgId];
                }
            })
        });
        if(intialFormInfoJson != JSON.stringify(currentFormInfoJson)){
            let updFormInfoJson = this.OcdlegloFactory.transformObjToArr(currentFormInfoJson);
            chargeHty['formInfoJson'] = JSON.stringify(updFormInfoJson);
            chargeHty['formName'] =  'OCUCHGOU',
            this.OcdchgsuFactory.saveData(chargeHty).subscribe(data => {
                 //Deleting if charge history is present for that charge   
            }); 
        }
        this.deletedCharges = [];
    });
}

}
