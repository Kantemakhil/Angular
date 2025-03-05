import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OcdchgsuService } from '../service/ocdchgsu.service';
import * as moment from 'moment';
import { OcdlegloService } from '../service/ocdleglo.service';
import { ValidateRowReturn } from '@core/ui-components/dynamic-alpine-grid/dynamic-alpine-grid.component';
import { ConfirmationDialogComponent } from '@core/ui-components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OcucalcrService } from '../service/ocucalcr.service';

@Component({
  selector: 'app-ocdchgsu',
  templateUrl: './ocdchgsu.component.html',
  styleUrls: ['./ocdchgsu.component.css']
})
export class OcdchgsuComponent implements OnInit {

  @ViewChild('ocdchgsugrid', {static: true}) ocdchgsugrid: any;
  message = ' Invalid.';
  msglist = [];
  type = 'error';
  myJsonRowData = [];
  myColDefs: any[];
  msgs: any[];
  vHeaderBlockModel: any;
  dataId: any;
  screenName = 'ocdchgsu';
  btnDisable: boolean = false;
  selectedRow = 0;
  linkedChargesList = new Set();
  dialogRef: MatDialogRef<ConfirmationDialogComponent> | null;
  applyTransaction:boolean = false;
  bulkIncidentDate: Date;
  bulkRange: Date;
  bulkPlea:any;
  bulkMatter:any;
  bulkOutcome:any;
  bulkUpdateReason:any;
  showBulkUpdateReason = false;
  staffName:any = '';
  chageHtyData = {};
  bulkOutcomeUpdList = [];
  bulkOutcomeEnable: boolean = false;
  chargeGridSaveEnable: boolean = false;
  initialChargeRowData = [];
  chargeHtyId: any;
  allOffences: any [];
  deletedCharges: any = [];
  okMsg: string;
  notAllowCharacters = ['"','\\'];

  constructor(private OcdchgsuFactory: OcdchgsuService, public translateService:TranslateService,
    public loginService : LoginService, public dialogService: DialogService,
    private OcdlegloFactory: OcdlegloService, public dialog: MatDialog,
    private OcucalcrFactory : OcucalcrService) { 
        this.loadColDefData();
    }

  ngOnInit(): void {
    this.getAllOffences();
    this.getStaffName();
   }


   getStaffName(){
    this.OcucalcrFactory.getCurrentUserId().subscribe(staffName => {
        this.staffName = staffName;
    });
   }

    editChargeSummaryGrid = (data: any, index: number, field: string) => {
        if(['ACT','CODE', 'DESCRIPTION', 'DETAILS', 'CURRENTSTATUS', 'OUTCOME'].includes(field.toUpperCase())) return false;
         if (
            data.chargeId &&
            this.linkedChargesList.has(data.chargeId) &&
            (field.toUpperCase() == 'MATTER' || field.toUpperCase() == 'ACT' || field.toUpperCase() == 'CODE' || field.toUpperCase() == 'DESCRIPTION')
        ) {
            return false;
        }
        return true;
    }

  loadColDefData(){
        const data = this.loginService.mainColDefData;
        let datatypeData = [];
          data.forEach(gridDef => {
            if(gridDef.grid_name == 'charges'&& gridDef.module_name == 'OCDCHGSU'){
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
        // const datatypeData = data && data.charges && JSON.parse(data.charges);
        const colDefs = [];
        datatypeData.forEach(type => {
            if(type.dataType === 'lov' && type.source === 'link') {
                colDefs.push({fieldName:this.translateService.translate(type.fieldName),datatype:type.dataType, source:type.sourceType, link:type.url, field:type.field, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, cellEditable: this.editChargeSummaryGrid, parentFields: type.parentFields})
            } 
            else if(type.dataType === 'lov' && type.source === 'domain') {
               colDefs.push({fieldName:this.translateService.translate(type.fieldName),datatype:type.dataType, domain:type.url, field:type.field, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, cellEditable: this.editChargeSummaryGrid})
            }
            else if(type.dataType === 'text') {
                if(type.field == 'matter'){
                    type.restrictCharacters = ['"','\\'];
                }
                colDefs.push({ fieldName: this.translateService.translate(type.fieldName), datatype: type.dataType, wrapText: true, hide: type.hide, field: type.field, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, cellEditable: this.editChargeSummaryGrid, restrictCharacters: type.restrictCharacters })
            }
            else if(type.dataType === 'launchbutton') {
                colDefs.push({fieldName:'',datatype:type.dataType, displayFields: type.displayFields,lovUrl: type.lovUrl, parentField: type.parentField, onLaunchClick: this.onLaunchClick, required: type.required, field:type.field, link: type.link, updateField: 'row', modal: true, data: 'row', width: 200, dialogWidth: '80%', cellEditable: this.editChargeSummaryGrid})
            }
            else if(type.dataType === 'hyperlink') {
                colDefs.push({datatype:'hyperlink',width:50,displayas: 'image',suppressMenu: true, displayFields: type.displayFields,lovUrl: type.lovUrl, parentField: type.parentField, onLaunchClick: this.onLaunchClick, required: type.required,fieldName:type.fieldName?this.translateService.translate(type.fieldName):'', field:type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%', cellEditable: this.editChargeSummaryGrid})
            }
            else if(type.dataType === 'date' && type.field === 'orderedDate') {
                colDefs.push({fieldName:this.translateService.translate(type.fieldName),datatype:type.dataType, field:type.field, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, width: 150, })
            }
            else if (type.dataType === 'date') {
                colDefs.push({
                    datatype: type.dataType,
                    fieldName:this.translateService.translate(type.fieldName),
                    field: type.field, required: type.required,
                    editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true,
                    width: 150,
                    hide: type.hide,
                    cellEditable: this.editChargeSummaryGrid,
                })
            } 
            else if(type.dataType === 'checkbox') {
                colDefs.push({fieldName:this.translateService.translate(type.fieldName),datatype:type.dataType, field:type.field, editable: true, required: type.required})
            }
        })
        this.myColDefs = [];
        colDefs.forEach(key => this.myColDefs.push(key));
  }
  setLaunchImage(data) {
    data.forEach(ele => {
        ele['descriptionLaunch'] = "assets/images/legal-launch-btn-icon.png";
        ele['details'] = "assets/images/legal-launch-btn-icon.png";
        ele['outcomeBtn'] = "assets/images/legal-launch-btn-icon.png";
    });
    return data;
}
    loadJsonData() {
        this.chargeGridSaveEnable = false;
        const form_identifiers_hty = {};
        form_identifiers_hty['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        const htyObj = {
            formName: 'OCUCHGOU',
            id: this.dataId ? this.dataId : 0,
            searchString: JSON.stringify(form_identifiers_hty)
        }
        this.OcdchgsuFactory.loadData(htyObj).subscribe((data: any) => {
            if (data && data.formInfoJson) {
                this.chargeHtyId = data.id;
                this.chageHtyData = this.OcdlegloFactory.transformArrToObj(JSON.parse(data.formInfoJson));
            } else {
                this.chageHtyData = [];
            }
            const form_identifiers = {};
            form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
            const retData = {
                formName: this.screenName,
                id: this.dataId ? this.dataId : 0,
                searchString: JSON.stringify(form_identifiers)
            }
            this.OcdchgsuFactory.loadData(retData).subscribe((data: any) => {
                if (data && data.formInfoJson) {
                    if(this.allOffences){
                        this.setRowData(data);
                    } else {
                        this.getAllOffences(data);
                    }
                } else {
                    this.myJsonRowData = [];
                    this.initialChargeRowData = [];
                }
            })
        });
    }

setRowData(data) {
        const rowData = JSON.parse(data.formInfoJson);
        rowData.forEach(row => {
            row.select = false;
            let selectOffence  = this.allOffences?.filter(i=>i.offenceId == row.offenceId)[0];
            row['act'] = selectOffence?selectOffence.statuteCode:undefined;
            row['code'] = selectOffence?selectOffence.code:undefined;
            row['description'] = selectOffence?selectOffence.description:undefined;
        });
        rowData.sort(function(a, b){return b.chargeId - a.chargeId});
        this.initialChargeRowData =  JSON.parse(JSON.stringify(rowData));
        this.myJsonRowData = JSON.parse(JSON.stringify(rowData));
        if (this.myJsonRowData && this.myJsonRowData.length) {
            this.setLaunchImage(this.myJsonRowData);
        }
        this.dataId = data.id;
        this.selectedRow = 0;
}

onOffenderChange( offender ) {
    this.vHeaderBlockModel = offender;
    this.dataId = 0;
    this.chargeHtyId = 0;
    if ( offender ) {
        this.loadJsonData();
        this.loadCustodialOrderData();        
    } else {
        this.myJsonRowData = [];
        this.linkedChargesList = new Set();
    }
}
show() {
    this.msglist = [];
    this.msglist.push( { message: this.message, type: this.type } );
    this.msgs = [...this.msglist];
}

onSave( event? ) {
    if(!this.isDataValid()){
        return ;
    }
    if(this.deletedCharges && this.deletedCharges.length > 0){
        this.deleteChargeHty();
    } else if(this.bulkOutcomeEnable) {
        this.bulkUpdateOutComeHty();
    } else {
        var form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    if(!this.chargeGridSaveEnable){
        this.setLatestOutcome(form_identifiers);
        return false;
    }
    var submitData = JSON.parse(JSON.stringify(this.myJsonRowData));
    submitData.forEach(obj => {
        obj = this.processResult(obj);
    })
    const submissionData = {
        formName : this.screenName,
        id : this.dataId?this.dataId : 0,
        formInfoJson : JSON.stringify(submitData),
        formIdentifier : JSON.stringify(form_identifiers)
    }    
    this.OcdchgsuFactory.saveData(submissionData).subscribe(data => {
        this.setLatestOutcome(form_identifiers);
        //submit success
        if(data) {
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.type = 'success';
            this.show();
            this.onOffenderChange(this.vHeaderBlockModel);
        } else {
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.type = 'error';
            this.show();
        }
        
    }); 
    }    
}


isOffenderSelected(){
    if(this.vHeaderBlockModel) return true;
    return false;
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

loadCustodialOrderData() {
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    form_identifiers['orderType'] = 'CUST';
    const retData = {
        formName: 'ocdleglo',
        id: this.dataId ? this.dataId : 0,
        searchString: JSON.stringify(form_identifiers)
    }
    this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        form_identifiers['orderType'] = 'NONCUST';
        const retData = {
            formName: 'ocdleglo',
            id: 0,
            searchString: JSON.stringify(form_identifiers)
        }
        this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
            const form_identifiers = {};
            form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
            form_identifiers['orderType'] = 'BAIL';
            const retData = {
                formName: 'ocdleglo',
                id: this.dataId ? this.dataId : 0,
                searchString: JSON.stringify(form_identifiers)
            }
            this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
                if (data && data.formInfoJson) {
                    this.setLinkedChargeList(JSON.parse(data.formInfoJson).myJsonRowData)
                }
            });
            if (data && data.formInfoJson) {
                this.setLinkedChargeList(JSON.parse(data.formInfoJson).myJsonRowData)
            }
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
                this.chargeGridSaveEnable = true;
                this.onSave(event);
                
                // return true;
            } else {
                return false
            }
        });
}


validateRow = ( event ) => {
    const rowdata = new ValidateRowReturn();
    const rowIndex = event.rowIndex;
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
        if(event.field == "matter" || event.field == 'code' || event.field == 'incidentDate' || event.field == 'Range' || event.field == 'plea' || event.field == 'type'){
            this.chargeGridSaveEnable = true;
        }
        if( event.field === 'code' ) {
            rowdata.validated = true;
            rowdata.data = { type: ''};
            return rowdata;
        }
    }
    rowdata.validated = true;
    return rowdata;
}
processResult(obj){
    Object.keys(obj).forEach(key => {
        if (key.includes('___') || !["chargeId","incidentDate","Range","plea","particulars","offenceId","matter","outcome","type"].includes(key)){
            delete obj[key];
        }
    })
    return obj;
}

onLaunchClick = (event) => {
    if (event && event.chargeId && this.linkedChargesList.has(event.chargeId) == true && !["/OCDCHGDT","/OCUCHGOU"].includes(event.___link)) {
        this.message = this.translateService.translate("ocdchgsu.cannotupdatecodeoflinkedcharge");
        this.type = 'warn';
        this.show();
        return false;
    }
    if(["/OCDCHGDT","/OCUCHGOU"].includes(event.___link)){
        event["isDisabled"] = false;
        event["offenderBookId"] = this.vHeaderBlockModel.offenderBookId + '';
    } else {
        event.___link = "/multiCount"
    }
    event['charges'] = this.initialChargeRowData;
    event['dataId'] = this.dataId;
    this.dialogService.openLinkDialog(event.___link, event, 90).subscribe(charges => {
        delete event['charges'];
        delete event['dataId'];
        if(charges && (event.___link == "/OCUCHGOU" || event.___link == '/OCDCHGDT')) {
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
                let finalo = ['incidentDate', 'plea', 'Range', 'particulars']
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
    let addEle = document.querySelector('#charge-summary-grid').querySelector('.add-btn') as any;
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
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
        this.dialogRef = null;
        this.applyTransaction = false;
        if (result && result == true) {
            this.applyTransaction = true; 
        }
        this.commonExecutionCode(charges, index, fields, event, alreadyFilledFields)
    });
}

multiUpdate(){
    
    let isSelected = false;
    let selectedIndexArr = [];
    let selectedChargeId = [];
    for (let j = 0; j < this.myJsonRowData.length; j++) {
        if(this.myJsonRowData[j].select == true){
            isSelected = true;
            selectedIndexArr.push(j);
            selectedChargeId.push(this.myJsonRowData[j].chargeId);
        }
    }
    if(!isSelected){
        this.message = this.translateService.translate( 'ocdchgsu.selectatleastonerecordtoupdate' );
        this.type = 'warn';
        this.show();
        return false;
    }
    else if(!this.bulkIncidentDate && this.bulkRange) {
        this.message = this.translateService.translate( 'ocdchgsu.selectincident' );
        this.type = 'warn';
        this.show();
        return false;
    }
    else if(this.bulkIncidentDate &&  DateFormat.compareDate( moment(this.bulkIncidentDate, "YYYY-MM-DDThh:mm:ss").toDate(),DateFormat.getDate()) === 1 ){
        this.message = this.translateService.translate('ocdchgsu.greaterthansysdate').replace('%fieldname%', this.translateService.translate('ocdchgsu.incidentDate'));
            this.type = 'warn';
            this.show();
            return;
    }
    else if (this.bulkRange && DateFormat.compareDate(moment(this.bulkRange, "YYYY-MM-DDThh:mm:ss").toDate(), DateFormat.getDate()) === 1) {
        this.message = this.translateService.translate('ocdchgsu.greaterthansysdate').replace('%fieldname%', this.translateService.translate('ocdchgdt.range'));
        this.type = 'warn';
        this.show();
        return;
    }
    else if(this.bulkIncidentDate && this.bulkRange && DateFormat.compareDate( moment(this.bulkIncidentDate, "YYYY-MM-DDThh:mm:ss").toDate(), moment(this.bulkRange, "YYYY-MM-DDThh:mm:ss").toDate() ) === 1 ){
        this.message = this.translateService.translate( 'ocdchgsu.rangegrtincidentdate' );
        this.type = 'warn';
        this.show();
        return false;
    }
    else if(this.bulkOutcome && !this.bulkUpdateReason ){
        this.message = this.translateService.translate( 'ocdchgsu.pleaseselectupdatereason');
        this.type = 'warn';
        this.show();
        return false;
    }
    else if (this.bulkMatter) {
        for (let i = 0; i < selectedChargeId.length; i++) {
            if(this.linkedChargesList.has(selectedChargeId[i])){
                this.message = this.translateService.translate("ocdchgsu.cannotupdatecodeoflinkedcharge");
                this.type = 'warn';
                this.show();
                return false;
            }
         }
    }
    
    for (let i = 0; i < selectedIndexArr.length; i++) {
        let index = selectedIndexArr[i];
        let node = this.ocdchgsugrid.gridOptions.api.getDisplayedRowAtIndex(index);
        if(this.bulkMatter && this.bulkMatter !== '' && this.bulkMatter !== null){
            node.setDataValue('matter', this.bulkMatter);
        }
        if(this.bulkIncidentDate && this.bulkIncidentDate !== null){
            node.setDataValue('incidentDate', this.bulkIncidentDate);
        }
        if(this.bulkRange && this.bulkRange !== null){
            node.setDataValue('Range', this.bulkRange);
        }
        if(this.bulkPlea && this.bulkPlea !== '' && this.bulkPlea !== null){
            node.setDataValue('plea', this.bulkPlea);
        }
        if(this.bulkOutcome && this.bulkUpdateReason){
            node.setDataValue('outcome', this.bulkOutcome);
            let chargeHtyObj = {
                'chargeId':node.data.chargeId,
                'outcome': this.bulkOutcome,
                'updateReason': this.bulkUpdateReason,
                'updatedDate':DateFormat.getDate(),
                'userId': this.staffName
            }
            let chargesUpdated =  this.bulkOutcomeUpdList.filter(i => i.chargeId == node.data.chargeId);
            if(chargesUpdated.length == 0){
                this.bulkOutcomeUpdList.push(chargeHtyObj);
            } else {
                let index = this.bulkOutcomeUpdList.findIndex(chargesUpdated[0]);
                this.bulkOutcomeUpdList.splice(index,1);
            }
            this.bulkOutcomeEnable = true;
        }
    }
}

bulkClear(){
    this.bulkMatter = this.bulkIncidentDate = this.bulkRange = this.bulkPlea = this.bulkOutcome = this.bulkUpdateReason = undefined;
    this.showBulkUpdateReason = false;
}

    selectAllRecord() {
        this.ocdchgsugrid.gridOptions.api.clearFocusedCell();
        for (let j = 0; j < this.myJsonRowData.length; j++) {
            let node = this.ocdchgsugrid.gridOptions.api.getDisplayedRowAtIndex(j);
            node.setDataValue('select', true);
        }
    }

    unselectAllRecord() {
        this.ocdchgsugrid.gridOptions.api.clearFocusedCell();
        for (let j = 0; j < this.myJsonRowData.length; j++) {
            let node = this.ocdchgsugrid.gridOptions.api.getDisplayedRowAtIndex(j);
            node.setDataValue('select', false);
        }
    }


    changeBulkOutcome(ev){
        this.showBulkUpdateReason = ev ? true : false;
    }

    saveChargeHty() {
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        let chargeData = this.OcdlegloFactory.transformObjToArr(this.chageHtyData);
        const chargesData = {
            formName : 'ocuchgou',
            id : this.chargeHtyId?this.chargeHtyId : 0,
            formInfoJson : JSON.stringify(chargeData),
            formIdentifier : JSON.stringify(form_identifiers)
        }
        this.OcdchgsuFactory.saveData(chargesData).subscribe(data => {
            if(!this.chargeGridSaveEnable){
                if(data) {
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.type = 'success';
                    this.show();
                    this.onOffenderChange(this.vHeaderBlockModel);
                } else {
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.type = 'error';
                    this.show();
                }
            }
            this.bulkOutcomeEnable = false;
            this.bulkOutcomeUpdList = [];
            this.deletedCharges = [];
            this.onSave();
        }); 
    }

    setLatestOutcome(form_identifiers) {
        this.OcdlegloFactory.setLatestOutcome(form_identifiers).subscribe(data=>{;});
    }

    getAllOffences(offenderCharges?) {
        this.OcdchgsuFactory.getAllOffences().subscribe(data => {
            this.allOffences = data;
            if(offenderCharges){
                this.setRowData(offenderCharges);
            }
        });
    }

    bulkUpdateOutComeHty()  {
        if(this.bulkOutcomeUpdList.length>0){
            for(let i =0 ; i< this.bulkOutcomeUpdList.length; i++){
                let chargeId =  this.bulkOutcomeUpdList[i].chargeId
                delete this.bulkOutcomeUpdList[i]['chargeId'];
                let chargeHty = this.chageHtyData[+chargeId];
                if(chargeHty){
                    chargeHty.push(this.bulkOutcomeUpdList[i]);
                    this.chageHtyData[+chargeId] = chargeHty;
                } else {
                    chargeHty =[];
                    chargeHty.push(this.bulkOutcomeUpdList[i]);
                    this.chageHtyData[+chargeId]= chargeHty;
                }
            }
        }
        Object.keys(this.chageHtyData).forEach(chrgHty => {
            this.chageHtyData[chrgHty].forEach(chgId => {
                Object.keys(chgId).forEach(obj => {
                    if (["disposition", "sentenceType", "status", "staffName","linkedTo","type","orderedDate"].includes(obj)) {
                        delete chgId[obj];
                    }
                })
            });
        });
        this.saveChargeHty();
    }

    deleteChargeHty() {
        Object.keys(this.chageHtyData).forEach(chgId => {
            this.deletedCharges.forEach(ele => {
                if(chgId == ele.chargeId){
                    delete this.chageHtyData[chgId];
                }
            })
        });
        if(this.bulkOutcomeEnable) {
            this.bulkUpdateOutComeHty();
        } else {
            this.saveChargeHty();
        }
    }
}
