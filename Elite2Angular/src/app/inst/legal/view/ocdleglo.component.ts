import { OcmcondiService } from './../../legal-screens/maintenance/service/ocmcondi.service';
import { OcucondiService } from './../service/ocucondi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OcdlegloService } from '../service/ocdleglo.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/dynamic-alpine-grid/dynamic-alpine-grid.component';
import { OcucalcrService } from '../service/ocucalcr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AppConstants } from '@core/classes/appConstants';
import { OidcustadService } from '@inst/legal-screens/maintenance/service/oidcustad.service';
import { OffenderSentenceAdjustmentCommitBean } from '@inst/legal-screens/maintenance/beans/OffenderSentenceAdjustmentCommitBean';
import { OffenderSentenceAdjustment } from '../beans/OffenderSentenceAdjustment';
import { OcdintpaService } from '../service/Ocdintpa.service';
import { InterestedPartiesCommitBean } from '../beans/InterestedPartiesCommitBean';
import { Location } from '@angular/common';
import { OcdenforService } from '@iwp/service/ocdenfor.service';
import { OidparoeService } from '../service/oidparoe.service';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { InjectOffenderService } from '@core/service/inject-offender.service';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@core/ui-components/confirmation-dialog/confirmation-dialog.component';
import { DynamicMenuService } from '@core/service/dynamic-menu.service';


@Component({
  selector: 'app-ocdleglo',
  templateUrl: './ocdleglo.component.html',
  styleUrls: ['./ocdleglo.component.scss']
})
export class OcdlegloComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('ocdleglogrid', {static: true}) ocdleglogrid: any;
    @ViewChild('chargesGrid', {static: true}) chargesGrid: any;
    message = ' Invalid.';
    msglist = [];
    type = 'error';
    myJsonRowData = [];
    enableInsertInCustodial:boolean = false;
    enableInsertInCharges:boolean = false;
    initialOcdlegloGridData = [];
    initialChargesGridData = [];
    previousCalculationReason = [];
    currentOcdlegloGridData:any;
    myColDefs: any[];
    msgs: any[];
    vHeaderBlockModel: any;
    dataId: any;
    screenName = 'ocdleglo';
    singleSaveBtnText = "";
    pageData: any;
    sentTermLovData = [];
    selectedTab: string = "Process1";
    chargesColdef = [];
    chargesRowData = [];
    tabMapping = new Map( [
        ["defaultOpen", "Process1"]
    ]
    );
    // chargesRowDataTemp: any[] = [];
    selectedRow: any;
    selectedRowofConditionGrid: number;
    completeChargesData: any[];
    chargesDataId: any;
    refreshDisabled = true;
    condiLegalText = '';
    conditionColdef = [];
    conditionRowData = [];
    offenderSentConditionId: number = 0;
    programIdMap: Map<string, number> = new Map<string, number>();
    condData: any;
    condCategory: any;
    isConditionGridVisible: boolean = false;
    sentTypeList = [];
    chargeHistData = {};
    staffName = '';
    chargesHistDataId = 0;
    chargeHistInitData = {};
    outcomeData: any;
    backButton: boolean;
    orderStatusData = [];
    nonCustOrderList = [];
    parOrderList = [];
    keyDates =[];
    allConditionsData = [];
    deleteOrderFlag: boolean = false;
    adjustmentRecords =[];
    deleteAdjustmentRecords: OffenderSentenceAdjustment[] = [];
    initialChargeHtyData = {};
    deleteOrderList =[];
    backButtonEnable: boolean = false;
    paroleEventData =[];
    deleteParoleEventsList = [];
     screenId = 'OCDCORDS';
    bulkOutcome:any;
    bulkOutcomeEnable: boolean = false;
    allOffences: any =[];
    ordersWithoutCharges = [];
    ordersWithoutMatter = [];
    ordersMapping = [];
    chargesMapping = [];
    dialogRef: MatDialogRef<ConfirmationDialogComponent> | null;

  constructor(private OcdlegloFactory: OcdlegloService,private ocmcondiService: OcmcondiService, private service: OcucondiService, public translateService:TranslateService,
    public loginService : LoginService, private dialogService: DialogService, private OcucalcrFactory : OcucalcrService ,private router: Router,
    public sessionManager: UserSessionManager, private oidcustadFactory: OidcustadService, private ocdintpaFactory: OcdintpaService,
    private location: Location, private ocdenforFactory: OcdenforService,  private oidparoeFactory: OidparoeService,private eoffenderService: EoffenderService,
    private activatedRoute: ActivatedRoute, private injectOffenderService: InjectOffenderService, private oidcnoteFactory:OidcnoteService,
    public delConfirmDialog: MatDialog, public dms: DynamicMenuService) { 
    this.loadColDefData();
    this.loadChargesColDefData();
    this.getSentTermLovData();
    this.getOutcomes();
    this.getConditionColDef();
    this.getAllOffences();
    this.ocmcondiService.comCondExecuteQuery({}).subscribe(data=>{
        if(data)
        {
            this.condData = data;
        }
    })
    this.getProgramId();
    this.getCondCategory();
  }

  ngOnInit() {
    this.singleSaveBtnText = this.translateService.translate('common.saveandcalculate');
    this.injectOffenderService.injectOffenderInService(this.activatedRoute);
    const SentTypeData = this.OcdlegloFactory.populateSentType('CUST');
    SentTypeData.subscribe(data => {
        if (data && data.length > 0) {
            this.sentTypeList = data;
        } 
    });
    this.OcucalcrFactory.getCurrentUserId().subscribe(staffName => {
        this.staffName = staffName;
    });
      this.getOrderStatus();
      this.getStaffRoleDetails();
      if (this.ocdenforFactory.backButton) {
        this.backButtonEnable = true;
        this.ocdenforFactory.backButton = false;
    }
    if (this.oidcnoteFactory.backButton) {
        this.backButtonEnable = true;
        this.oidcnoteFactory.backButton = false;
    }
  }

  
  loadColDefData(){
    const data = this.loginService.mainColDefData;
    let datatypeData = [];
    data.forEach(gridDef => {
            if(gridDef.grid_name == 'custOrd'&& gridDef.module_name == 'OCDCORDS'){
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
    // const datatypeData = data && data.custOrd && JSON.parse(data.custOrd);
    this.myColDefs = [];
    this.prepareColDef(datatypeData).forEach(key => this.myColDefs.push(key));
  }
  loadChargesColDefData(){
    const data = this.loginService.mainColDefData;
    let datatypeData = [];
    data.forEach(gridDef => {
            if(gridDef.grid_name == 'chargesChild'&& gridDef.module_name == 'OCDCORDS'){
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
    // const datatypeData = data && data.custOrd && JSON.parse(data.chargesChild);
    this.chargesColdef = [];
    this.prepareColDef(datatypeData).forEach(key => this.chargesColdef.push(key));
  }



  prepareColDef(coldefJson) {
    let colDefs = [];
    coldefJson.forEach(type => {
        if(type.dataType === 'lov' && type.source === 'link') {
            let lovRendered = 'description';
            if (type.field == 'court') {
                lovRendered = 'code'
            }
            if (['commenceType','sentenceCalcType','status'].includes(type.field)) {
                type.url = type.url + 'CUST';
            }
            if(type.field == 'commenceType'){
                colDefs.push({datatype:type.dataType, cellEditable: this.commenceTypeLovEdit, sourceDomain:type.sourceDomain,suppressMenu: true, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, link:type.url, source: type.sourceType})
            } else {
                colDefs.push({datatype:type.dataType,lovRender: lovRendered, cellEditable: this.typeLovEdit, source:type.sourceType,suppressMenu: true, link:type.url, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, parentFields: type.parentFields})
            }
        } else if(type.dataType === 'lov' && type.source === 'domain') {
            colDefs.push({ datatype: type.dataType, domain: type.url, suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
        } 
        else if(type.dataType === 'lov' && type.source === 'domain') {
            colDefs.push({datatype:type.dataType, domain:type.url,suppressMenu: true, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required})
        }
        else if(type.dataType === 'text') {
            if(type.field == 'matter') {
                colDefs.push({datatype:type.dataType, cellEditable: this.matterEdit, wrapText:true, width:80,suppressMenu: true, hide: type.hide, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, maxWidth: 500, restrictCharacters : ['"','\\']})
            } else {
            	colDefs.push({datatype:type.dataType, wrapText:true, width:80,suppressMenu: true, hide: type.hide, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, maxWidth: 500})
            }
        }
        else if(type.dataType === 'number') {
            colDefs.push({datatype:type.dataType,width:40,suppressMenu: true, hide: type.hide, field: type.field,fieldName:this.translateService.translate(type.fieldName), editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required })
        }
        else if(type.dataType === 'launchbutton') {
            colDefs.push({datatype:type.dataType, width:100, parentField: type.parentField,suppressMenu: true, onLaunchClick: this.onLaunchClick, field:type.field,fieldName:'', required: type.required, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%'})
        }
	    else if(type.dataType === 'hyperlink') {
                
            colDefs.push({datatype:'hyperlink',width:50,displayas: 'image',suppressMenu: true, parentField: type.parentField, onLaunchClick: this.onLaunchClick, required: type.required,fieldName:type.fieldName?this.translateService.translate(type.fieldName):'', field:type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%'})
        }
        else if(type.dataType === 'date' && type.field === 'orderedDate') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName),  width:100, suppressMenu: true, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required })
        }
        else if(type.dataType === 'date' && type.field === 'holdExpiryDate') {
            colDefs.push({datatype:'custom',suppressMenu: true, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, cellEditable: this.holdExpiryDateEdit, editorSelector: (rowIndex, field, data) => {return 'date'}, rendererSelector: this.custom })
        }
        else if(type.dataType === 'date'&& type.field === 'commenceDate') {
            colDefs.push({datatype:'custom',suppressMenu: true, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, cellEditable: this.commenceDateEdit,hide: type.hide, editorSelector: (rowIndex, field, data) => {return 'date'}, rendererSelector: this.custom })
        } 
        else if(type.dataType === 'date') {
            colDefs.push({datatype:type.dataType,suppressMenu: true, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, cellEditable: this.commenceDateEdit,hide: type.hide })
        } 
        else if(type.dataType === 'checkbox') {
            colDefs.push({datatype:type.dataType, width:40, field: type.field,fieldName:this.translateService.translate(type.fieldName),suppressMenu: true, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required})
        }
    });
    return colDefs;
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
  holdExpiryDateEdit = (data: any, index: number, field: string) => {
    if(field == 'holdExpiryDate') {
        const existingValues =  this.sentTypeList.filter(obj=> 'CHLD' == obj.sentType).filter(obj=> data.sentenceCalcType == obj.code);
        if(existingValues.length > 0) {
            if(existingValues[0].termList.length > 0 && existingValues[0].termList.filter(term=> ['LIFE'].includes(term.termCode)).length > 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } 
  }

  commenceDateEdit = (data: any, index: number, field: string) => {
    if(['incidentDate', 'Range'].includes(field)) return false;
    if (data.commenceType == 'CC' || data.commenceType == 'CU') {
        return false;
    }
    return true;
  }

  resetRowForType(rowData, rowIndex) {
      const index = this.currentOcdlegloGridData.findIndex(ord => ord.orderNo == rowData.orderNo);
    rowData.termTypeAndLength = '';
    rowData.terms = [];
    rowData["holdExpiryDate"] = '';
    if(rowData.charges.length == 0) {
        rowData.matter = '';
    }
    rowData['sentenceType'] = this.sentTypeList.filter(obj=> rowData.sentenceCalcType == obj.code)[0]?.sentType;
    const existingValues =  this.sentTypeList.filter(obj=> 'CHLD' == obj.sentType).filter(obj=> rowData.sentenceCalcType == obj.code);
    if(existingValues.length > 0) {
        this.ocdleglogrid.requiredOff('termTypeAndLength');
        this.ocdleglogrid.requiredOff('relatedTo');
        this.ocdleglogrid.requiredOn('commenceDate');
        rowData.lengthBtn = '';
        rowData.commenceType = 'DTC';
        if(existingValues[0].termList.length > 0 && existingValues[0].termList.filter(term=> term.termCode.includes('LIFE')).length > 0) {
            this.ocdleglogrid.requiredOff('holdExpiryDate');
            rowData["termTypeAndLength"] = 'Indefinite';
            rowData["holdExpiryDate"] = 'Indefinite';
            rowData['terms'] = [];
        } else {
            this.ocdleglogrid.requiredOn('holdExpiryDate');
        }
    } else {
        this.ocdleglogrid.requiredOn('termTypeAndLength');
        this.ocdleglogrid.requiredOff('holdExpiryDate');
        rowData.lengthBtn = "assets/images/legal-launch-btn-icon.png";
        if(this.sentTypeList.filter(obj=> 'CNCO' == obj.sentType).filter(obj=> rowData.sentenceCalcType == obj.code).length > 0) {
            rowData.commenceType = 'DTC';
            this.ocdleglogrid.requiredOff('relatedTo');
            this.ocdleglogrid.requiredOn('commenceDate');
            rowData.relatedToLaunch = '';
            rowData["holdExpiryDate"] = '';
            rowData.relatedTo = '';
        }
    }
      this.currentOcdlegloGridData[index] = JSON.parse(JSON.stringify(rowData))
    var rowNode = this.ocdleglogrid.gridOptions.api.getRowNode(rowIndex);
    rowNode.setData(rowData);
  }

    typeLovEdit = (data: any, index: number, field: string) => {
        if (field == 'sentenceCalcType' && this.isCustodialSavedData(data.orderNo)) {
            return false;
        }
        if (field == 'status' && !this.isCustodialSavedData(data.orderNo)) {
            return false;
        }
        return true;
    }

    isCustodialSavedData(orderNo): boolean {
        for (let value of this.ocdleglogrid.addedMap.values()) {
            if (value.orderNo == orderNo) {
                return false;
            }
        }
        for (let i = 0; i < this.initialOcdlegloGridData.length; i++) {
            if (orderNo == this.initialOcdlegloGridData[i].orderNo) {
                return true;
            }
        }
        return false;
    }

    commenceTypeLovEdit = (data: any, index: number, field: string) => {
        if (field == 'commenceType') {
            const existingValues =  this.sentTypeList.filter(obj=> 'CHLD' == obj.sentType).filter(obj=> data.sentenceCalcType == obj.code);
            if(existingValues.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    }

    matterEdit = (data: any, index: number, field: string) => {
        if (field == 'matter') {
            const existingValues = this.sentTypeList.filter(obj => data.sentenceCalcType == obj.code);
            if(existingValues.length > 0 && existingValues[0].chargesFlag === 'N') {
                if(data.charges.length > 0) {
                    return false;
                } else {
                    data.charges =[];
                    return true;
                }
            } else {
                return false;
            }
        }
    }

   onLaunchClick = (event) => {
    if(event.___link == "/termToLine" && (event.sentenceCalcType == undefined || event.sentenceCalcType == "")){
        this.type = 'warn';
        this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey('type'));
        this.show();
        return false 
    }
    if(event.___link == "/OCDINTPA"){
        let inputData = {};
        inputData['recordId'] = event.orderNo;
        inputData['recordType'] = 'CUST';
        inputData['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        this.dialogService.openLinkDialog('/OCDINTPA', inputData, 50).subscribe(result => { });
        return;
    }
    if(event.___link == "/EOFFENDER"){
        this.eoffenderService.selectedRowData=event;
        this.eoffenderService.selectedRowData['offenderBookId']= this.vHeaderBlockModel.offenderBookId;
        this.eoffenderService.selectedRowData['recordId']=  event.orderNo+'';
        let objectId = event.orderNo;
        let screenParam = this.screenId+"~"+'true'+"~"+objectId;
    this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : screenParam } } );
    return;
    }
    if(event.___link == "/OCDCHGDT"){
        event["isDisabled"] = true;
    }
    event["lovData"] = this.sentTermLovData;
    event['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    event['___sentTypeList'] = this.sentTypeList;
    this.dialogService.openLinkDialog(event.___link, event, 70).subscribe(result => {
        if (result && !result.___ismultiRows) {
            event.___parentField.forEach(obj=>{
                const node = this.ocdleglogrid.gridOptions.api.getSelectedNodes().length && this.ocdleglogrid.gridOptions.api.getSelectedNodes()[0];
                if (node) {
                    let processedObj = this.processResult(result);
                    node.setDataValue(obj, processedObj[obj]);
                   if(result.commenceDate){
                       node.setDataValue('commenceDate', DateFormat.getDate(result.commenceDate) + '' != 'Invalid Date'? DateFormat.getDate(result.commenceDate):result.commenceDate);
                   }
                }
            })
        } else if(result && result.___ismultiRows) {
            result.selectedRows.forEach(obj=>{
                Object.keys(obj).forEach(key=>{
                    if(key.startsWith('___')){
                        delete obj[key];
                    }
                })
            })
            result.selectedRows.forEach(obj => {
                obj.details = 'assets/images/legal-launch-btn-icon.png';
            })
            this.chargesRowData = JSON.parse(JSON.stringify(result.selectedRows));
            const node = this.ocdleglogrid.gridOptions.api.getSelectedNodes().length && this.ocdleglogrid.gridOptions.api.getSelectedNodes()[0];
                if (node) {
                    let processedObj = this.processResult(this.chargesRowData);
                    node.setDataValue('charges', JSON.parse(JSON.stringify(processedObj)));
                    let matterId = '';
                    let matters = new Set();
                    this.chargesRowData.forEach((obj, idx)=> {
                        matters.add(obj.matter);
                    })
                    matterId = Array.from(matters).join(', ')
                    node.setDataValue('matter', matterId);
                }
        }
        this.myJsonRowData.forEach(obj=>{
            this.processResult(obj);
            delete obj['lovData'];
        })
    });
}
processResult(obj){
    Object.keys(obj).forEach(key => {
        if (key.includes('___') || ["details", "select", "descriptionLaunch", "isDisabled", "outcomeBtn"].includes(key)){
            delete obj[key];
        }
    })
    return obj;
}

  loadJsonData() {
      this.getOffenderOrders();
      this.getParoleEvents();
      this.getAdjustmentRecords();
      this.bulkOutcome = undefined;
      this.bulkOutcomeEnable = false;
      this.previousCalculationReason = [];
      this.ordersMapping = [];
      this.chargesMapping = [];
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    const charges = {
        formName: 'OCDCHGSU',
        id: this.chargesDataId ? this.chargesDataId : 0,
        searchString: JSON.stringify(form_identifiers)
    }
    this.OcdlegloFactory.loadData(charges).subscribe((data: any) => {
        if (data && data.formInfoJson) {
            this.completeChargesData = JSON.parse(data.formInfoJson);
        }
        this.chargesDataId = data.id;

    });
    form_identifiers['orderType'] = 'CUST';
    const retData = {
        formName : this.screenName,
        id : this.dataId?this.dataId : 0,
        searchString : JSON.stringify(form_identifiers)
    }
    this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
        if (data && data.formInfoJson) {
            this.refreshDisabled = false;
            this.selectedRow = 0;
            let cRowData = this.modifyDataForTermTypeAndLength(JSON.parse(data.formInfoJson).myJsonRowData);
            cRowData.sort((nc1:any,nc2:any)=>this.OcdlegloFactory.dateComparator(nc1,nc2));
            this.myJsonRowData = JSON.parse(JSON.stringify(cRowData))
            this.myJsonRowData.forEach((element) => {
                const resultStatus = this.orderStatusData.filter(i => i.updateReasonCode === element.status);
                if (resultStatus.length > 0) {
                    element['activeType'] = resultStatus[0].activeType;
                }
                const existingValues =  this.sentTypeList.filter(obj=> element.sentenceCalcType.includes(obj.code));
                if(existingValues.length > 0 && existingValues[0].sentType === 'CHLD') {
                    element.lengthBtn = '';
                }
                element['sentenceType'] = existingValues[0]?existingValues[0].sentType:undefined;
            });
            if(this.myJsonRowData && this.myJsonRowData[this.selectedRow] && this.myJsonRowData[this.selectedRow].charges){
                this.chargesRowData = this.myJsonRowData[this.selectedRow].charges;
            } else {
                this.chargesRowData = [];
            }
            if(this.myJsonRowData && this.myJsonRowData.length > 0){
                this.isConditionGridVisible = true;
                this.getConditions();
            }
            this.currentOcdlegloGridData = JSON.parse(JSON.stringify(this.myJsonRowData));
            this.initialOcdlegloGridData = JSON.parse(JSON.stringify(this.myJsonRowData));
            this.dataId = data.id;
            delete form_identifiers['orderType']
            const charges = {
                    formName : 'OCDLEGLS',
                    id : this.dataId?this.dataId : 0,
                    searchString : JSON.stringify(form_identifiers)
                }
                this.OcdlegloFactory.loadData(charges).subscribe((data: any) => {
                    if (data && data.formInfoJson ) {
                        this.keyDates = JSON.parse(data.formInfoJson).sentenceDates?JSON.parse(data.formInfoJson).sentenceDates:[];
                    }
                });
        } else {
            this.myJsonRowData = [];
            this.chargesRowData = [];
            this.currentOcdlegloGridData = [];
            this.initialOcdlegloGridData = [];
            this.refreshDisabled = true;
            this.dataId = 0;
        }
        this.deleteOrderList =[];
    })
  }


  loadChildJsonData(screenName) {
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    const retData = {
        formName : screenName,
        id : this.dataId?this.dataId : 0,
        searchString : JSON.stringify(form_identifiers)
    }
    this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
        if (data && data.formInfoJson) {
            this.selectedRow = 0;
            this.chargesRowData = JSON.parse(data.formInfoJson);
            this.initialChargesGridData = JSON.parse(JSON.stringify(this.chargesRowData));
            this.dataId = data.id;
        } else {
            this.chargesRowData = [];
        }
        // this.filterChgOnMatter();
    })
    
  }
    // filterChgOnMatter() {
    //     this.chargesRowDataTemp.filter(obj=> );
    // }

onOffenderChange( offender ) {
    this.isConditionGridVisible = false;
    this.conditionRowData = [];
    this.vHeaderBlockModel = offender;
    this.dataId = 0;
    this.chargesDataId = 0;
    this.chargesHistDataId = 0;
    this.chargeHistInitData = {};
    this.dms.isSingleSaveBtnDisable = true;
    if ( offender ) {
        this.enableInsertInCustodial = true;
        this.enableInsertInCharges = true;
        this.loadJsonData();
        this.loadChargeHist();
        // this.loadChildJsonData('ocdchgsu');
        // this.startTab();
    } else {
        this.enableInsertInCustodial = false;
        this.enableInsertInCharges = false;
        this.myJsonRowData = [];
        this.chargesRowData = [];
        this.chargeHistInitData = {};
        this.allConditionsData = [];
        // if(this.myJsonRowData && this.myJsonRowData.length){
        //     this.myJsonRowData.splice(0, this.myJsonRowData.length);
        // }
    }
}


    getSentTermLovData() {
        this.OcdlegloFactory.loadSentTerm(this.sessionManager.getId(),'OCDLEGLO').subscribe(data => {
            this.sentTermLovData = data;
        });
    }
    getOutcomes() {
        this.OcdlegloFactory.getOutcomes().subscribe(data => {
            this.outcomeData = data;
        });
    }

    // this fn is for set Image For RelatedToLaunch AND lengthBtn
    setLaunchImage(data) {
        if(data.commenceType && data.commenceType == 'DTC'){
            data["relatedToLaunch"] = "";
            // this.ocdleglogrid.requiredOn('commenceDate');
        }
        else{
            // this.ocdleglogrid.requiredOff('commenceDate');
            data["relatedToLaunch"] = "assets/images/legal-launch-btn-icon.png";
        }
        data.intParties = "assets/images/legal-launch-btn-icon.png";
        data['iwpButton'] = "assets/icons/file_copy.svg";
        data.lengthBtn = "assets/images/legal-launch-btn-icon.png";
        return data;
    }

    modifyDataForTermTypeAndLength(apiData) {
        let returnApiData = [];
        for (let k = 0; k < apiData.length; k++) {
            let unchangedEveryData = { ...apiData[k] };
            unchangedEveryData = this.setLaunchImage(unchangedEveryData);
            let myTermTypeAndLength = unchangedEveryData.termTypeAndLength;
            if(myTermTypeAndLength == undefined || myTermTypeAndLength == ''){
                unchangedEveryData["termTypeAndLength"] = '';
                returnApiData.push(unchangedEveryData)
             }
             else if(myTermTypeAndLength.indexOf(', ') > -1 ){
                let lb = myTermTypeAndLength.split(', ').join('\n');
                unchangedEveryData.termTypeAndLength = lb;
                returnApiData.push(unchangedEveryData);
             }
            else{
                returnApiData.push(unchangedEveryData)
            }
        }
        return returnApiData;
    }


show() {
    this.msglist = [];
    this.msglist.push( { message: this.message, type: this.type } );
    this.msgs = [...this.msglist];
}


    onSave() {
        let isOcdlegoChanged = this.OcdlegloFactory.isGridDataModified(this.initialOcdlegloGridData, this.myJsonRowData);
        let isChargesChanged = this.OcdlegloFactory.isGridDataModified(this.initialChargesGridData, this.chargesRowData);
        this.ordersWithoutCharges = [];
        this.ordersWithoutMatter = [];
        if (!isOcdlegoChanged && !isChargesChanged) {
            this.message = this.translateService.translate('ocdleglo.nodatamodified');
            this.type = 'warn';
            this.show();
            return false;
        }
        else if (!this.isCustodialOrderDataValid()) {
            return false;
        }
        else if (this.ordersWithoutCharges.length > 0 ) {
            this.proceedToWarning();
        }
        else {
            this.calculateReason();
        }
    }


onSaveApiCall(calculationResult?){
    var form_identifiers = {};
    if(this.OcdlegloFactory.isObject(calculationResult)){
        this.previousCalculationReason.push(calculationResult)
    }
    // this.setSentTypeToSaveData();
    let finalObj = {
        'myJsonRowData': this.preSaveCleanUp(this.myJsonRowData),
        'calcReason': this.previousCalculationReason
    };
    var submitData = finalObj;
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    form_identifiers['orderType'] = 'CUST';
    const submissionData = {
        formName : this.screenName,
        id : this.dataId?this.dataId : 0,
        formInfoJson : JSON.stringify(submitData),
        formIdentifier : JSON.stringify(form_identifiers),
        moduleName : 'OCDCORDS',
        orderOperations:  JSON.stringify(this.ordersMapping),
        chargesOperations : this.chargeActions(this.chargesMapping)
    }    
    this.OcdlegloFactory.saveData(submissionData).subscribe(data => {
        //submit success
        if(data){
            if(data == 1) {
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.type = 'success';
                this.show();
            } else if(data != 0){
                let dlgData = {};
                if (data == 2) {
                    dlgData = {
                        heading: 'Warning',
                        label: this.translateService.translate('ocucalcr.userhaspendingcalcevents'),
                        yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('ocucalcr.warnok')
                    };
                } else if (data == 3) {
                    dlgData = {
                        heading: 'Warning',
                        label: this.translateService.translate('ocucalcr.applicationstatusdown'),
                        yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('ocucalcr.warnok')
                    };
                }
                if (Object.keys(dlgData).length>0) {
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50).subscribe(result => {
                    });
                }
                this.message = this.translateService.translate('ocdleglo.savedaspendingevent');
                this.type = 'warn';
                this.show();
            } 
            if(this.deleteOrderList.length>0){
                if(this.deleteAdjustmentRecords.length>0){
                    this.commitAdjustments();
                } else if(this.deleteParoleEventsList.length>0){
                    this.deleteParoleEvents();
                }
                this.deleteInterestedParties();
            }
            this.ocdleglogrid.btnClearbtnDisable = true;
            this.dms.isSingleSaveBtnDisable = true;  
            this.initialOcdlegloGridData = JSON.parse(JSON.stringify(this.myJsonRowData));
            this.myJsonRowData = JSON.parse(JSON.stringify(this.myJsonRowData));
            this.selectedRow = 0;
            if(this.myJsonRowData && this.myJsonRowData[this.selectedRow] && this.myJsonRowData[this.selectedRow].charges){
                this.chargesRowData = this.myJsonRowData[this.selectedRow].charges;
            } else {
                this.chargesRowData = [];
            }
            const submitDataTemp = JSON.parse(JSON.stringify(data));
            setTimeout(() => {
                this.loadJsonData();
            }, 3000);
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
    
    if(this.completeChargesData){
        var chargeData = JSON.parse(JSON.stringify(this.completeChargesData));
        chargeData.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if (key.includes('___') || !["chargeId","incidentDate","Range","plea","particulars","offenceId","matter","outcome","type"].includes(key)){
                    delete obj[key];
                }
            });
        })
        delete form_identifiers['orderType'];
        const chargesData = {
            formName : 'ocdchgsu',
            id : this.chargesDataId?this.chargesDataId : 0,
            formInfoJson : JSON.stringify(chargeData),
            formIdentifier : JSON.stringify(form_identifiers)
        }    
        this.OcdlegloFactory.saveData(chargesData).subscribe(data => {
            // Updated charges outcome

            // Save charge history
        }); 
    }
    this.saveChargeHist();
}
    setSentTypeToSaveData() {
        this.myJsonRowData.forEach(ord => {
            ord['sentenceType'] = this.sentTypeList.filter(obj=> ord.sentenceCalcType == obj.code)[0]?.sentType;
        });

    }
    preSaveCleanUp(myJsonRowData: any[]) {
        myJsonRowData.forEach(row => {
            Object.keys(row).forEach(key => {
                if (key.includes('___') || ["lengthBtn", "relatedToLaunch", "intParties", "activeType", "offenderBookId","sentenceType","iwpButton","recordId"].includes(key)){
                    delete row[key];
                }
            });
            if (row["charges"] && row["charges"].length) {
                row["charges"].forEach(chg => {
                    Object.keys(chg).forEach(chgKey => {
                        if (chgKey.includes('___') || !(["chargeId","outcome"].includes(chgKey))){
                            delete chg[chgKey];
                        } 
                    });
                });
            }
        });
        return myJsonRowData;
    }
    validateChargesRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event && event.field === 'outcome') {
            const histArr = this.chargeHistData[event.data.chargeId]?this.chargeHistData[event.data.chargeId]:[];
            const histRow = {orderNo:''}
            histRow['outcome'] = event.data.outcome;
            histRow['orderNo'] = this.selectedRow.orderNo;
            histRow['orderType'] = this.selectedRow.orderType;
            histRow['updatedDate'] = DateFormat.getDate();
            histRow['userId'] = this.staffName;
            histRow['updateReason'] = 'LTO';
            
            const histExist = histArr.filter(histObj => (histObj.orderNo == histRow["orderNo"] && histObj.orderType == histRow["orderType"]) );
            if(histExist.length) {
                histArr.splice(histArr.indexOf(histExist), 1, histRow);
            } else {
                histArr.push(histRow)
            }
            this.chargeHistData[event.data.chargeId] = histArr;
            const data = this.chargesMapping?.filter(  e=> e.chargeId == event.data.chargeId && e.displayNo == this.selectedRow.displayNo );
            if( data.length == 0 ){
                this.chargesMapping.push({
                    'displayNo': this.selectedRow.displayNo,
                    'chargeId': event.data.chargeId
                })
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    saveChargeHist() {
        Object.keys(this.chargeHistData).forEach(chgId => {
            if(!this.chargeHistInitData[chgId]) this.chargeHistInitData[chgId] = [];
            this.chargeHistInitData[chgId] = JSON.parse(JSON.stringify(this.chargeHistInitData[chgId].concat(this.chargeHistData[chgId])));
        });
        this.deleteChgHist();
        let chargeData = this.OcdlegloFactory.transformObjToArr(this.chargeHistInitData);
        let form_identifiers = {};
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        const chargesData = {
            formName : 'ocuchgou',
            id : this.chargesHistDataId?this.chargesHistDataId : 0,
            formInfoJson : JSON.stringify(chargeData),
            formIdentifier : JSON.stringify(form_identifiers)
        }
        this.OcdlegloFactory.saveData(chargesData).subscribe(data => {
            this.setLatestOutcome(form_identifiers);
            this.chargeHistInitData = [];
            this.chargeHistData = [];
            this.loadChargeHist();
        }); 
    }
    setLatestOutcome(form_identifiers) {
        this.OcdlegloFactory.setLatestOutcome(form_identifiers).subscribe(data=>{;});
    }
    deleteChgHist() {
        let chgOrdMap = {}; 
        // Refer: S4-17958
        // calculate the relation between order and charge
        // format: {chargeId:[<orderNo, orderType>]}
        Object.keys(this.chargeHistInitData).forEach(chgId => {
            chgOrdMap[chgId] = [];
            this.myJsonRowData.forEach(ord => {
                if (ord.charges.map(chg=>chg.chargeId).includes(+chgId)) {
                    // extract all the orders related to this charge, 
                    // I know it's reverse here.
                    chgOrdMap[chgId].push(ord.orderNo + ' - ' + ord.orderType);
                }
            });
        });
        // Filter out all the historical records related to an unlinked charge
        Object.keys(this.chargeHistInitData).forEach(chgId => {
            this.chargeHistInitData[chgId] = this.chargeHistInitData[chgId].filter(chg => 
                // Check whether the charge is linked to an order or 
                // not linked to any order.
                // !chg["orderNo"] ==> check for manually entered charge updates
                !chg["orderNo"] || chgOrdMap[chgId].includes(chg["orderNo"] + ' - ' +chg["orderType"]) || ["NCUS","BAIL"].includes(chg["orderType"])
                );
        });
    }
    loadChargeHist() {
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        const retData = {
            formName : 'ocuchgou',
            id : this.chargesHistDataId?this.chargesHistDataId : 0,
            searchString : JSON.stringify(form_identifiers)
        }
        this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
            if (data && data.formInfoJson && (form_identifiers['offenderBookId'] == this.vHeaderBlockModel.offenderBookId + '')) {
                this.chargeHistInitData = this.OcdlegloFactory.transformArrToObj(JSON.parse(data.formInfoJson));
                this.initialChargeHtyData = JSON.parse(JSON.stringify(this.chargeHistInitData));
                this.chargesHistDataId = data.id;
            } else {
                this.chargesHistDataId = 0;
                this.chargeHistInitData = {};
                this.initialChargeHtyData ={};
            }
        });
    }


calculateReason() {
    this.dialogService.openLinkDialog('/OCUCALCR', this.vHeaderBlockModel, 80).subscribe(result => {
      if (result) {
          this.onSaveApiCall(result);
      }
    });
}


setExternalSaveButton() {
    if (this.OcdlegloFactory.isGridDataModified(this.initialOcdlegloGridData, this.myJsonRowData) ||
        this.OcdlegloFactory.isGridDataModified(this.initialChargesGridData, this.chargesRowData)) {
        this.dms.isSingleSaveBtnDisable = false;
    }
    else {
        this.dms.isSingleSaveBtnDisable = true;
    }
}

    onUpdatedMapsData(event,gridName?: string) {
        this.setExternalSaveButton();
        if (gridName == "custodialGrid") {
            const index = this.currentOcdlegloGridData.findIndex(ord => ord.orderNo == event.updated.orderNo);
            if (event.updated.commenceType == 'RFC') {
                event.updated.commenceType = '';
                var rowNode = this.ocdleglogrid.gridOptions.api.getRowNode(index);
                rowNode.setData(event.updated);
                this.currentOcdlegloGridData[index] = JSON.parse(JSON.stringify(event.updated));
                this.message = this.translateService.translate('ocdleglo.cannotselectrfc');
                this.type = 'warn';
                this.show();
            } else {
                if(this.currentOcdlegloGridData[index] && this.currentOcdlegloGridData[index].commenceType !== event.updated.commenceType) {
                    // Only commenceType Updation in custodial order grid
                    this.currentOcdlegloGridData[index] = JSON.parse(JSON.stringify(event.updated));
                    this.resetRowForCommenceType(event.updated, index)
                } else if(this.currentOcdlegloGridData[index].sentenceCalcType !== event.updated.sentenceCalcType) {
                    // Only Type Updation in custodial order grid
                    // this.currentOcdlegloGridData[index] = JSON.parse(JSON.stringify(event.updated));
                    this.resetRowForType(event.updated, index)
                }
            }
        }
        if(gridName == "chargesGrid"){
            this.myJsonRowData.forEach(obj=> {
                if(obj && obj.charges) { 
                    obj.charges.forEach(ch=>{
                        if(ch.chargeId == event.updated.chargeId && this.selectedRow.orderNo == obj.orderNo){
                            ch['outcome'] = event.updated['outcome'];
                        }
                    })
                }
            })
            this.completeChargesData.forEach(charge=> {
                if(charge.chargeId == event.updated.chargeId){
                    charge['outcome'] = event.updated['outcome'];
                }
            })
            this.chargesRowData.forEach(charge=> {
                if(charge.chargeId == event.updated.chargeId){
                    charge['outcome'] = event.updated['outcome'];
                }
            })
            if(this.isAnyChargeSelected()){
                this.bulkOutcomeEnable = true;
            }
            else{
                this.bulkOutcomeEnable = false;
            }
        }
    }

resetRowForCommenceType(rowData, rowIndex) {
    rowData["relatedTo"] = '';
    rowData["commenceDate"] = '';
    if (rowData.commenceType == 'CC') {
        this.ocdleglogrid.requiredOff('commenceDate');
        rowData.relatedToLaunch = rowData.lengthBtn
        var rowNode = this.ocdleglogrid.gridOptions.api.getRowNode(rowIndex);
        rowNode.setData(rowData);
        this.ocdleglogrid.requiredOn('relatedTo');
    }
    else if (rowData.commenceType == 'CU') {
        this.ocdleglogrid.requiredOff('commenceDate');
        rowData.relatedToLaunch = rowData.lengthBtn
        var rowNode = this.ocdleglogrid.gridOptions.api.getRowNode(rowIndex);
        rowNode.setData(rowData);
        this.ocdleglogrid.requiredOn('relatedTo');
    }
    else if (rowData.commenceType == 'DTC') {
        this.ocdleglogrid.requiredOn('commenceDate');
        rowData.relatedToLaunch = '';
        var rowNode = this.ocdleglogrid.gridOptions.api.getRowNode(rowIndex);
        rowNode.setData(rowData);
        this.ocdleglogrid.requiredOff('relatedTo');
    }
}



onclearedData(event, gridName?: string) {
    this.setExternalSaveButton();
    if(gridName == "custodialGrid") {
        this.chargesRowData = [];
        this.currentOcdlegloGridData = [];
        this.initialOcdlegloGridData = [];
        this.ordersMapping = [];
        this.chargesMapping = [];
        if(this.myJsonRowData.length > 0){
            this.selectedRow = 0;
            this.enableInsertInCharges = true;
            this.ocdleglogrid.gridOptions.api.getRowNode('0').setSelected(true);
            this.currentOcdlegloGridData = JSON.parse(JSON.stringify(this.myJsonRowData));
            this.initialOcdlegloGridData = JSON.parse(JSON.stringify(this.myJsonRowData));
            this.chargeHistInitData = JSON.parse(JSON.stringify(this.initialChargeHtyData));
            this.deleteOrderList =[];
        }
    }
    if(gridName == "chargesGrid") {
        this.bulkOutcomeEnable = false;
        for(let i=0;i<this.myJsonRowData.length;i++){
            if(this.myJsonRowData[i].charges && this.myJsonRowData[i].charges.length == 0){
                let charge = JSON.parse(JSON.stringify(this.initialOcdlegloGridData[i].charges))
                charge.forEach(obj => {
                    obj.details = 'assets/images/legal-launch-btn-icon.png';
                })
                this.myJsonRowData[i].charges = charge;
            }
        }
    }
}

onMapsData(event,gridName?: string) {
    this.setExternalSaveButton();
    if(gridName == "chargesGrid") {
        const node = this.ocdleglogrid.gridOptions.api.getSelectedNodes().length && this.ocdleglogrid.gridOptions.api.getSelectedNodes()[0];
            if (node) {
                node.setDataValue('charges', JSON.parse(JSON.stringify(this.chargesRowData)));
            }
    }
    else if(gridName == "custodialGrid") {
        this.currentOcdlegloGridData.push(JSON.parse(JSON.stringify(event.added)))
    }
}
openProcess( evt, processName ) {
    this.selectedTab = processName;
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName( "tabcontent" );
    for ( i = 0; i < tabcontent.length; i++ ) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName( "tablinks" );
    for ( i = 0; i < tablinks.length; i++ ) {
        tablinks[i].className = tablinks[i].className.replace( "active", "" );
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById( processName ).style.display = "block";
    evt.currentTarget.className += " active";
    return false;
}
startTab() {
    this.tabMapping.forEach(( k, v ) => {
        if ( k == this.selectedTab ) {
            document.getElementById( v ).click();
            document.getElementById( k ).style.display = "block";
        } else {
            document.getElementById( k ).style.display = "none";
        }

    } );
}
onRowClicked(event) {
    this.selectedRow = event;
    this.eoffenderService.selectedRowData=null;
    if(event && event.charges) {
        const charges = [];
        for (let i = 0; i < event.charges.length; i++) {
            let cha = this.completeChargesData.filter(j => j.chargeId == event.charges[i].chargeId);
            if (cha[0]) {
                let selectOffence  = this.allOffences.filter(i=>i.offenceId == cha[0].offenceId)[0];
                cha[0]['description'] = selectOffence?selectOffence.description:undefined;
                cha[0]['outcome'] = event.charges[i].outcome;
                cha[0]['displayNo'] = event.displayNo;
                cha[0]['orderType'] = event.orderType;
                cha[0]['recordId'] = event.orderNo+'';
                charges.push(cha[0]);
            }
        }
        charges.forEach(obj => {
            obj.details = 'assets/images/legal-launch-btn-icon.png';
        })
        this.chargesRowData = charges;
    } else {
        this.chargesRowData = [];
    }
    if(event && event.commenceType == 'DTC'){
        this.ocdleglogrid.requiredOn('commenceDate');
        this.ocdleglogrid.requiredOff('relatedTo');
    }
    else{
        this.ocdleglogrid.requiredOff('commenceDate');
        this.ocdleglogrid.requiredOn('relatedTo');
    }
    if (event){
        this.condiLegalText = '';
        this.getCondOfOrder(this.allConditionsData,this.selectedRow.orderNo);
    }
    if(event && this.isCustodialSavedData(event.orderNo)){
        this.eoffenderService.selectedRowData=event;
        this.eoffenderService.selectedRowData['offenderBookId']= this.vHeaderBlockModel.offenderBookId;
        this.eoffenderService.selectedRowData['recordId']=  event.orderNo+'';
        this.isConditionGridVisible = true;
    } else {
        this.eoffenderService.selectedRowData=null;
        this.isConditionGridVisible = false;
    }
    const existingValues =  this.sentTypeList.filter(obj=> event?.sentenceCalcType.includes(obj.code));
    if(existingValues.length > 0 && existingValues[0].sentType === 'CHLD') {
        this.ocdleglogrid.requiredOff('termTypeAndLength');
        this.selectedRow.lengthBtn = '';
        if(existingValues[0].termList.length > 0 && existingValues[0].termList.filter(term=> term.termCode.includes('LIFE')).length > 0) {
            this.ocdleglogrid.requiredOff('holdExpiryDate');
        } else {
            this.ocdleglogrid.requiredOn('holdExpiryDate');
        }
    } else {
        this.ocdleglogrid.requiredOn('termTypeAndLength');
        this.ocdleglogrid.requiredOff('holdExpiryDate');
        if (this.selectedRow) {
            this.selectedRow["lengthBtn"] = "assets/images/legal-launch-btn-icon.png";
        }
    }
}

onRowClickedCondition(event){
    if(event && event.longCommentText){
        this.condiLegalText = event.longCommentText;
      }
      else{
          this.condiLegalText = '';
      }
}

onOcdlegloGridInsert = () => {
    let highestIndex = 1;
    if(!this.isCustodialOrderDataValid(true)){
        return ;
    }
    if(this.myJsonRowData.length > 0){
        highestIndex = this.getHighestIndex() + 1;
    }
    let addData = {
        displayNo: 'C_' + highestIndex,
        orderNo: highestIndex,
        lengthBtn: "assets/images/legal-launch-btn-icon.png",
        orderType: 'CUST',
        status: AppConstants.ACTIVE
    };
    this.OcdlegloFactory.readOrderAction(addData,'I',this.ordersMapping);
    return addData;
}

getHighestIndex(){
    let maxIndex = 1;
    for (let i = 0; i < this.myJsonRowData.length; i++) {
        if(this.myJsonRowData[i].orderNo > maxIndex){
            maxIndex = parseInt(this.myJsonRowData[i].orderNo);
        }
    }
    return maxIndex;
}

isCustodialOrderDataValid(onInsert?:boolean){
    for (let i = 0; i < this.myJsonRowData.length; i++) {
        let rowIndex = i + 1;
        let eachRowData = this.myJsonRowData[i];
        if(Object.keys(eachRowData).length === 0){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdleglo.pleaseselectdata');
            this.show();
            return false
        }
        for (let f = 0; f < this.myColDefs.length; f++) {
            let key = this.myColDefs[f].field;
            let value = eachRowData[key] ? eachRowData[key] : '';
            let config = this.getColumnConfig(key);
            if (config.required && config.required == true && (value == undefined || value == '') ) {
                    // required field validation here
                    if (key == "termTypeAndLength" && value == '') { 
                        const existingValues =  this.sentTypeList.filter(obj=> 'CHLD' == obj.sentType).filter(obj=> eachRowData.sentenceCalcType == obj.code);
                        if(existingValues.length > 0) {
                            continue;
                        }
                     }
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%',this.OcdlegloFactory.getFieldName(key, this.myColDefs));
                    this.show();
                    return false
            }
            else if (key == "relatedTo" && (eachRowData["commenceType"] == 'CC' || eachRowData["commenceType"] == 'CU' ) && (value == undefined || value == '')) {
                // conditionally required field validation
                this.type = 'warn';
                this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%',this.OcdlegloFactory.getFieldName(key, this.myColDefs));
                this.show();
                return false
            }
            else if (key == "commenceDate" && eachRowData["commenceType"] == 'DTC' && (value == undefined || value == '')) {
                // conditionally required field validation
                this.type = 'warn';
                this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%',this.OcdlegloFactory.getFieldName(key, this.myColDefs));
                this.show();
                return false;
            }
            else if (key == 'holdExpiryDate' && (value == '' || value == undefined)) {
                const existingValues =  this.sentTypeList.filter(obj=> 'CHLD' == obj.sentType).filter(obj=> eachRowData.sentenceCalcType == obj.code);
                if(existingValues.length > 0) {
                    if(existingValues[0].termList.length == 0 || (existingValues[0].termList.length > 0 && existingValues[0].termList.filter(term=> term.termCode.includes('LIFE')).length == 0)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%',this.OcdlegloFactory.getFieldName(key, this.myColDefs));
                        this.show();
                        return false;
                    }   
                }
            }
        }
        for (let j = 0; j < this.myColDefs.length; j++) {
            let key = this.myColDefs[j].field;
            let value = eachRowData[key] ? eachRowData[key] : '';
            let config = this.getColumnConfig(key);
            // valid value validation here
            if(!this.validValueValidation(key,value, config, rowIndex, onInsert)){
                return false;
            } 
        }
        const initialOrder = this.initialOcdlegloGridData.filter(ele => ele.displayNo == this.myJsonRowData[i].displayNo);
        const updStatus = this.orderStatusData.filter(ele => ele.updateReasonCode == this.myJsonRowData[i].status);
        if (initialOrder && initialOrder.length > 0 && updStatus && updStatus.length > 0) {
            if ((initialOrder[0].activeType === 'A' || !initialOrder[0].activeType) && (updStatus[0].activeType == 'I' || updStatus[0].activeType == 'E')) {
                let activeConditions = this.allConditionsData.length > 0 ? this.allConditionsData.filter(ele => ele.activeType == 'A' && initialOrder[0].orderNo == ele.sentenceSeq) : [];
                if (activeConditions.length > 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdleglo.pleasedeactivateconditionfirst');
                    this.show();
                    return false;
                }
            }

            if (initialOrder.length > 0 && initialOrder[0].code !== updStatus[0].code) {
                if ((initialOrder[0].activeType == 'I' || initialOrder[0].activeType == 'A') && updStatus[0].activeType == 'E') {
                    const nonCustRel = this.nonCustOrderList.filter(ele => ele.relatedTo == this.myJsonRowData[i].displayNo && ele.activeType != 'E');
                    const custRel = this.myJsonRowData.filter(ele => ele.relatedTo == this.myJsonRowData[i].displayNo && ele.activeType != 'E');
                    let parRel = [];
                    for (let j = 0; j < this.parOrderList.length; j++) {
                        const parStatus = this.orderStatusData.filter(ele => ele.updateReasonCode == this.parOrderList[j].status)
                        let obj = this.parOrderList[j].affectedOrders.filter(ele => (ele == this.myJsonRowData[i].displayNo && parStatus[0] && parStatus[0].activeType !== 'E'));
                        if (obj.length > 0) parRel.push(obj);
                    }
                    if (parRel.length > 0 || nonCustRel.length > 0 || custRel.length > 0) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdncode.orderisdependent');
                        this.show();
                        return false;
                    }
                }
            }
        }
    }
    return true;
}


getColumnConfig(columName) {
    for (let i = 0; i < this.myColDefs.length; i++) {
      if (columName == this.myColDefs[i].field) {
        return this.myColDefs[i];
      }
    }
}

validValueValidation(key,value, config, rowIndex, onInsert){
   let newDateValue; 
   let rowData = this.myJsonRowData[rowIndex-1];
    if(config.datatype == 'date' || key == 'commenceDate' || key == 'holdExpiryDate'){    
        if (value && value !== '' && typeof value == "string") {
            newDateValue = value.split('T')[0];
        }
        else if (value != null && typeof value == 'object') {
            newDateValue = this.getFormatedDate(value)
        }
    }
    if (key == "commenceDate" && newDateValue == undefined && rowData.commenceType == 'DTC') {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdleglo.pleaseselectdateformat').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key)).replace('%dateFormat%',DateFormat.dateFormat);
        this.show();
        return false
    }
    else if ((key == "orderedDate") && newDateValue > this.getFormatedDate(new Date())) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdleglo.grtthancurrdata').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
        this.show();
        return false
    } 
    /* else if ((key == "commenceDate") && newDateValue > this.getFormatedDate(new Date()) && !['CU','CC'].includes(rowData.commenceType)) {
        const existingValues =  this.sentTypeList.filter(obj=> 'CHLD' == obj.sentType).filter(obj=> rowData.type == obj.code);
        if(existingValues.length == 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdleglo.grtthancurrdata').replace('%fieldname%', this.OcdlegloFactory.getDisplayedKey(key));
            this.show();
            return false
        }
    } 
    else if ((key == "commenceDate") && newDateValue > this.getFormatedDate(new Date()) && !['CU','CC'].includes(rowData.commenceType)) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdleglo.grtthancurrdata').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
        this.show();
        return false
    } */ 
    else if (key == "termTypeAndLength" && value == '') {
        const existingValues =  this.sentTypeList.filter(obj=> 'CHLD' == obj.sentType).filter(obj=> rowData.sentenceCalcType == obj.code);
        if(existingValues.length == 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdleglo.selectTerm').replace('%fieldname%', this.OcdlegloFactory.getDisplayedKey(key));
            this.show();
            return false
        }
    }
    else if (key == "commenceType" && (value == 'CC' || value == 'CU' ) && (rowData.relatedTo == undefined || rowData.relatedTo == '')) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdleglo.selectrelated').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
        this.show();
        return false
    }
    else if (key == "commenceType" && value == 'DTC'
        && rowData.relatedTo !== undefined && rowData.relatedTo !== ''
        && rowData.relatedTo !== null) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdleglo.cannotrelatedtc').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
        this.show();
        return false
    }
    else if (key == 'holdExpiryDate' && newDateValue !== '' && newDateValue !== undefined && newDateValue !== 'Indefinite') {
        let commenceDateValue; 
        if (rowData.commenceDate && rowData.commenceDate !== '' && typeof rowData.commenceDate == "string") {
            commenceDateValue = rowData.commenceDate.split('T')[0];
        }
        else if (rowData.commenceDate != null && typeof rowData.commenceDate == 'object') {
            commenceDateValue = this.getFormatedDate(rowData.commenceDate)
        }
        if(newDateValue < commenceDateValue) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdleglo.laterthancommencedate').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
            this.show();
            return false
        }
    }
    else if (key == "matter") {
        if (value == '' || value == undefined) {
            const existingValues = this.sentTypeList.filter(obj => rowData.sentenceCalcType == obj.code);
            if (existingValues.length > 0 && existingValues[0].chargesFlag === 'N') {
                this.ordersWithoutMatter.push(rowData['displayNo']);
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdleglo.addcharges').replace('%orderno%', rowData.orderNo);
                this.show();
                return false
            }
        }
        if (rowData['charges'] == "") {
            this.ordersWithoutCharges.push(rowData['displayNo']);
        }
    }
    else if(key == "charges" ){
        if (value && value.length && value.filter(ele => !ele.outcome).length) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdleglo.addoutcome').replace('%orderno%', rowData.orderNo);
            this.show();
            return false
        }
    }
        return true; 
}


getFormatedDate(day) {
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0'); 
    var yyyy = day.getFullYear();
    return yyyy+ '-'+ mm + '-'+ dd;
}

onChargeGridInsert = ()=>{
    var inputObj = {"offenderBookId" : this.vHeaderBlockModel.offenderBookId + '', "chargesRowData":this.chargesRowData, "allOffences":this.allOffences};
    this.dialogService.openLinkDialog('/OcdchgsuDlg', inputObj, 70).subscribe(result => {
        if(result) {
            if(result.selectedRows){
                this.bulkOutcomeEnable = false;
                result.selectedRows.forEach(obj => {
                    obj.details = 'assets/images/legal-launch-btn-icon.png';
                })
                this.chargesRowData = JSON.parse(JSON.stringify(result.selectedRows)).reverse();
                this.completeChargesData = JSON.parse(JSON.stringify(result.completeChargesData));
                this.chargesDataId = result.dataId;
                if(!result.dataId) {
                    const form_identifiers = {};
                    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
                    const charges = {
                        formName : 'OCDCHGSU',
                        id : this.chargesDataId?this.chargesDataId : 0,
                        searchString : JSON.stringify(form_identifiers)
                    }
                    this.OcdlegloFactory.loadData(charges).subscribe((data: any) => {
                        this.chargesDataId = data.id;
                    });
                }
                const node = this.ocdleglogrid.gridOptions.api.getSelectedNodes().length && this.ocdleglogrid.gridOptions.api.getSelectedNodes()[0];
                if (node) {
                    let processedObj = [];
                    this.chargesRowData.forEach( obj => {
                        processedObj.push(this.processResult(obj));
                    });
                    const prevChgData = node.data['charges'];
                    processedObj.forEach(newChg => {
                        newChg.outcome = '';
                        newChg['select'] = false;
                    });
                    prevChgData && prevChgData.forEach(prevChg => {
                        if (prevChg.outcome) {
                            processedObj.forEach(newChg => {
                                if (newChg.chargeId == prevChg.chargeId) {
                                    newChg.outcome = prevChg.outcome;
                                }
                            })
                        }
                    });
                    node.setDataValue('charges', JSON.parse(JSON.stringify(processedObj)));
                    let matterId = '';
                    let matters = new Set();
                    this.chargesRowData.forEach((obj, idx) => {
                        matters.add(obj.matter);
                    })
                    matterId = Array.from(matters).join(', ')
                    node.setDataValue('matter', matterId);
                }  
            } else if(result.updatedChargesData) {
                    this.completeChargesData = JSON.parse(JSON.stringify(result.updatedChargesData));
                    this.onRowClicked(this.selectedRow);
            }
        }
    });
}
getConditionColDef(){
    this.conditionColdef = [
        {
            fieldName: this.translateService.translate( 'ocdleglo.conditionCategory' ), required : false,
            field: 'categoryType', editable: false, width: 150, datatype: 'lov', domain: 'COM_CON_CAT'
        },
        {
            fieldName: this.translateService.translate( 'ocdleglo.description' ), required : false,
            field: 'requirement', editable: false, width: 150, datatype: 'text'
        },
        {
            fieldName: this.translateService.translate( 'ocdleglo.length' ), required : false,
            field: 'unitLength', editable: false, width: 150, datatype: 'text'
        },
        {
            fieldName: this.translateService.translate('ocdleglo.unit'), hide: true,
            field: 'lengthUnit', editable: false, width: 150, datatype: 'lov', domain: 'COND_UNIT'
            , titles: { code: this.translateService.translate('ocmcondi.lovUnitType'),
            description: this.translateService.translate('ocmcondi.lovDescription')}
         },
        {
            fieldName: this.translateService.translate( 'ocdleglo.startDate' ), required : false,
            field: 'startDate', editable: false, width: 150, datatype: 'date'
        },
        {
            fieldName: this.translateService.translate( 'ocdleglo.endDate' ), required : false,
            field: 'expiryDate', editable: false, width: 150, datatype: 'date'
        },
        {
            fieldName: this.translateService.translate('ocdleglo.programreferral'),
            field: 'program', editable: false, width: 150, datatype: 'text'
         },
        {
            fieldName: '',
            field: 'programMethod', editable: false, width: 150, datatype: 'text', hide:true
         },
        {
            fieldName: this.translateService.translate( 'ocdleglo.status' ), required : false, source: 'OCMSTATS',
            field: 'conditionStatus', editable: false, width: 150, datatype: 'lov', link: 'ocmpconf/rgOrderStatus?orderType=COND'
        },
        {
            fieldName: this.translateService.translate('ocdleglo.legalTextofCondition'),
            field: 'longCommentText', editable: false, width: 150, datatype: 'text',
            hide: true, externalColumn:true
         },
        {
            field: 'activeType', hide: true
        }
    ];
}
getProgramId() {
    const serviceObj = this.service.getProgram();
    serviceObj.subscribe(data => {
        if (data.length === 0) {
        } else {
            data.forEach(ele => {
                this.programIdMap.set(ele.id, ele.description);
            });
        }
    });
}
getConditions() {
    let obj = {
        offenderBookId: this.vHeaderBlockModel.offenderBookId,
        commConditionType: 'CUST',
        sealFlag: 'Y'
    }
    this.service.getConditionTypeGrid(obj).subscribe(data => {
        data.forEach(ele => {
            let activeType = this.orderStatusData.filter(i => i.updateReasonCode == ele.conditionStatus);
            ele['activeType'] = activeType[0] ? activeType[0].activeType : '';
        });
        this.allConditionsData = data;
        this.getCondOfOrder(this.allConditionsData,this.selectedRow.orderNo)      
    });
}
addCondition = () => {
    const initialRowData = this.initialOcdlegloGridData.filter(i => i.displayNo === this.selectedRow.displayNo);
    var orderEndDate = undefined;
    if(this.keyDates){
        this.keyDates.forEach(ele => {
            if(ele.displayNo === initialRowData[0]['displayNo']){
                ele['sentenceOrderDates'].forEach(el => {
                    if(ele['sentenceType'] === 'CHLD'){
                        if(el['dateType']=='hed' && el['dateValue']){
                            orderEndDate = DateFormat.getDate(el['dateValue']);
                        }
                    } else {
                        if(el['dateType']=='lrd' && el['effectiveValue']){
                            orderEndDate = DateFormat.getDate(el['effectiveValue']);
                        }
                    }
                });
            }
        })
    }
    let obj = {
        selectedOffender: this.vHeaderBlockModel,
        data: this.conditionRowData,
        selectedOrder: initialRowData[0],
        orderType: 'CUST',
        orderStatus: this.orderStatusData,
        orderEndDate: orderEndDate
    };
    
    this.dialogService.openLinkDialog('/OCUCONDIDLG', obj, 80).subscribe(result => {
        this.getConditions();
    });
}
updateCondition = () => {
    const initialRowData = this.initialOcdlegloGridData.filter(i => i.displayNo === this.selectedRow.displayNo);
    var orderEndDate = undefined;
    if(this.keyDates){
        this.keyDates.forEach(ele => {
            if(ele.displayNo === initialRowData[0]['displayNo']){
                ele['sentenceOrderDates'].forEach(el => {
                    if(ele['sentenceType'] === 'CHLD'){
                        if(el['dateType']=='hed' && el['dateValue']){
                            orderEndDate = DateFormat.getDate(el['dateValue']);
                        }
                    } else {
                        if(el['dateType']=='lrd' && el['effectiveValue']){
                            orderEndDate = DateFormat.getDate(el['effectiveValue']);
                        }
                    }
                });
            }
        })
    }
    let obj = {
        selectedOffender: this.vHeaderBlockModel,
        data: this.conditionRowData,
        orderNo: initialRowData[0],
        orderType: 'CUST',
        orderStatus: this.orderStatusData,
        orderEndDate: orderEndDate
    };
    this.dialogService.openLinkDialog('OCUUCOND', obj, 80).subscribe(result => {
        this.getConditions();
    });
}
deleteCondition = () => {
    const initialRowData = this.initialOcdlegloGridData.filter(i => i.displayNo === this.selectedRow.displayNo);
    let obj = {
        selectedOffender: this.vHeaderBlockModel,
        data: this.conditionRowData,
        orderType: 'CUST',
        selectedOrder: initialRowData[0]
    };
    this.dialogService.openLinkDialog('OCUDCOND', obj, 80).subscribe(result => {
        this.getConditions();
    });
}
getCondCategory() {
    this.service.getCondCategory(this.sessionManager.getId(),'OCDCORDS').subscribe(data=>{
        if(data) {
            this.condCategory = data
            this.conditionRowData.forEach(obj=>{
                if(obj["programMethod"] != 'ACP'){
                    const fiteredCat = this.condCategory.filter(obj=>obj.code == obj["programMethod"]);
                    if(fiteredCat && fiteredCat.length > 0){
                        obj['program'] = fiteredCat[0].description;
                    }
                }
            });
        }
    });
}
onBack() {
    this.OcdlegloFactory.backBtnFlag = false;
    this.OcdlegloFactory.ocdclistBackBtnFlag = true;
    this.router.navigate(['/OCDCLIST']);
}
    validateOrdersData = (event) => {
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.field != 'status') {
            const intialOrder = this.initialOcdlegloGridData.findIndex(i => i.displayNo == event.data.displayNo);
            if(event.field == 'commenceType' && event.data.commenceType == 'CU') {
                if (intialOrder == -1) {
                    this.ocdleglogrid.setColumnData('status', event.rowIndex, 'ACT');
                }
            }
            if (event.field == 'commenceDate') {
                if (intialOrder == -1) {
                    if (event.data.sentenceType === 'CHLD') {
                        if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) == 1) {
                            this.ocdleglogrid.setColumnData('status', event.rowIndex, 'PEND');
                        } else if (event.data.holdExpiryDate && event.data.holdExpiryDate != 'Indefinite'  && DateFormat.compareDate(event.newValue, DateFormat.getDate()) != 1 && DateFormat.compareDate(DateFormat.getDate(event.data.holdExpiryDate), DateFormat.getDate()) == -1) {
                            this.ocdleglogrid.setColumnData('status', event.rowIndex, 'EXPE');
                        } else if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) != 1) {
                            this.ocdleglogrid.setColumnData('status', event.rowIndex, 'ACT');
                        }
                    } else {
                        if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) > 0) {
                            this.ocdleglogrid.setColumnData('status', event.rowIndex, 'PEND');
                        } else {
                            this.ocdleglogrid.setColumnData('status', event.rowIndex, 'ACT');
                        }
                    }
                }
            }
            if (event.field == 'holdExpiryDate') {
                if (intialOrder == -1) {
                    if (event.data.sentenceType === 'CHLD') {
                        if (event.data.commenceDate && DateFormat.compareDate(DateFormat.getDate(event.data.commenceDate), DateFormat.getDate()) == 1) {
                            this.ocdleglogrid.setColumnData('status', event.rowIndex, 'PEND');
                        } else if (event.newValue && DateFormat.compareDate(event.newValue, DateFormat.getDate()) == -1) {
                            this.ocdleglogrid.setColumnData('status', event.rowIndex, 'EXPE');
                        } else if (event.data.commenceDate && DateFormat.compareDate(DateFormat.getDate(event.data.commenceDate), DateFormat.getDate()) != 1) {
                            this.ocdleglogrid.setColumnData('status', event.rowIndex, 'ACT');
                        }
                    }
                }
            }
        } else {
            const selectedOrder = this.initialOcdlegloGridData.filter(i => i.displayNo == event.data.displayNo);
            const initialStatus = selectedOrder[0] ? selectedOrder[0].activeType : 'A';
            const updStatus = this.orderStatusData.filter(i => i.updateReasonCode == event.data.status);
            if (updStatus[0].activeType == 'E' && this.nonCustOrderList.length > 0) {
                let uponRelOrd = this.nonCustOrderList.filter(i => i.commenceType == 'RFC');
                if (uponRelOrd.length > 0) {
                    const previousActiveType = this.orderStatusData.filter(i => i.updateReasonCode == event.oldValue);
                    if (previousActiveType[0]?.activeType != 'E' && !(this.myJsonRowData.filter(i => i.activeType != 'E').length > 1)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdcords.rfcordercannotchangestatustoexpire')
                        this.show();
                        this.ocdleglogrid.setColumnData('status', event.rowIndex, undefined);
                        return rowdata;
                    };
                }
            }
            if (initialStatus == 'E' && updStatus[0]) {
                this.ocdleglogrid.setColumnData('activeType', event.rowIndex, updStatus[0].activeType);
            } else if (initialStatus == 'A' || initialStatus == 'I') {
                if (updStatus[0] && updStatus[0].activeType == 'E') {
                    const nonCustRel = this.nonCustOrderList.filter(i => i.relatedTo == event.data.displayNo && i.activeType != 'E');
                    const custRel = this.myJsonRowData.filter(i => i.relatedTo == event.data.displayNo && i.activeType != 'E');
                    if ((nonCustRel && nonCustRel.length > 0) || (custRel && custRel.length)) {
                        this.ocdleglogrid.setColumnData('status', event.rowIndex, undefined);
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdleglo.orderisdependent')
                        this.show();
                        return rowdata;
                    }
                    let parDependent = false;
                    for (let i = 0; i < this.parOrderList.length; i++) {
                        const parStatus = this.orderStatusData.filter(ele => ele.updateReasonCode == this.parOrderList[i].status)
                        const parCustRel = this.parOrderList[i].affectedOrders.filter(ele => (ele == event.data.displayNo && parStatus[0] && parStatus[0].activeType !== 'E'));
                        if (parCustRel && parCustRel.length > 0) parDependent = true;
                    }
                    if (parDependent) {
                        this.ocdleglogrid.setColumnData('status', event.rowIndex, undefined);
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdleglo.orderisdependent')
                        this.show();
                        return rowdata;
                    }
                }
            }
            this.ocdleglogrid.setColumnData('activeType', event.rowIndex, updStatus[0].activeType);
        }
        if(['status','commenceType','commenceDate','termTypeAndLength','relatedTo'].includes(event.field)){
            this.OcdlegloFactory.readOrderAction(event,'U',this.ordersMapping);
        }
        rowdata.validated = true;
        return rowdata;
    }

    getOrderStatus() {
        this.OcdlegloFactory.rgOrderStatus().subscribe(data => {
            if (data) {
                this.orderStatusData = data;
            }
        });
    }
    getOffenderOrders() {
        this.nonCustOrderList = [];
        this.parOrderList = [];
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        form_identifiers['orderType'] = 'NONCUST';
        const nonCustInput = {
            formName: this.screenName,
            id: this.dataId ? this.dataId : 0,
            searchString: JSON.stringify(form_identifiers)
        }
        this.OcdlegloFactory.loadData(nonCustInput).subscribe((data: any) => {
            if (data && data.formInfoJson) {
                const nonCustgridData = JSON.parse(data.formInfoJson).myJsonRowData;
                nonCustgridData.forEach(ele => {
                    const resultStatus = this.orderStatusData.filter(i => i.updateReasonCode === ele.status);
                    if (resultStatus.length > 0) {
                        ele['activeType'] = resultStatus[0].activeType;
                    }
                });
                this.nonCustOrderList = nonCustgridData;
            }
            const form_identifiers = {};
            form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
            form_identifiers['orderType'] = 'PAR';
            const paroleInput = {
                formName: this.screenName,
                id: this.dataId ? this.dataId : 0,
                searchString: JSON.stringify(form_identifiers)
            }
            this.OcdlegloFactory.loadData(paroleInput).subscribe((data: any) => {
                if (data && data.formInfoJson) {
                    const parGridData = JSON.parse(data.formInfoJson).myJsonRowData;
                    this.parOrderList = parGridData;
                }
            });
        });
    }
    getCondOfOrder(conditionList, orderNo) {
        this.conditionRowData = conditionList.filter(i => i.sentenceSeq === orderNo);
        this.selectedRowofConditionGrid = 0;
        for (let i = 0; i < this.conditionRowData.length; i++) {
            if (this.conditionRowData[i].programId) {
                this.conditionRowData[i].program = this.programIdMap.get(this.conditionRowData[i].programId);
            } else {
                this.condData.forEach(obj => {
                    if (obj.commConditionCode == this.conditionRowData[i].commConditionCode &&
                        this.conditionRowData[i].commConditionType == obj.commConditionType)
                        // this.conditionRowData[i].programMethod = obj.code;
                        var fiteredCat = this.condCategory.filter(obj => obj.code == this.conditionRowData[i]["programMethod"]);
                    if (fiteredCat && fiteredCat.length > 0) {
                        this.conditionRowData[i].program = fiteredCat[0].description;
                    }
                })
            }
            if (this.conditionRowData[i]["programMethod"] !== 'ACP' && this.conditionRowData[i]["programMethod"] !== 'UW') {
                this.conditionRowData[i].program = '';
            }
            if (this.conditionRowData[i].length || this.conditionRowData[i].lengthUnit) {
                if (this.conditionRowData[i].length == null) {
                    this.conditionRowData[i].length = '';
                } else if (this.conditionRowData[i].lengthUnit == null) {
                    this.conditionRowData[i].lengthUnit = '';
                }
                this.conditionRowData[i]['unitLength'] = this.conditionRowData[i].length +
                    " " +
                    this.conditionRowData[i].lengthUnit;
            }
        }
        this.getCondCategory();
    }
    openDelConfModal(row) {
        const dialogConfig = {
          data: { 
                  title: this.translateService.translate('ocdcords.orderdeleteconfirmationtitle'),
                  message: this.translateService.translate('ocdcords.orderdeleteconfirmationmessage')
                },
          disableClose: true,
          hasBackdrop: true,
          height: '170px',
          width: '100%',
        };
        this.dialogRef = this.delConfirmDialog.open(ConfirmationDialogComponent, dialogConfig);
        this.dialogRef.afterClosed().subscribe((result) => {
          this.dialogRef = null;
          if (result && result == true) {
            if (this.adjustmentRecords.length > 0 || this.paroleEventData.length>0) {
                 let custodyAdjRecords = this.adjustmentRecords.length>0?this.adjustmentRecords.filter(i => i.objectType == 'CUST' && row[0].orderNo == i.objectId):[];
                 if (custodyAdjRecords.length > 0) {
                     const data = {
                         label: this.translateService.translate('ocdleglo.adjustmentrecordpresent'), yesBtn: true, noBtn: true
                     };
                     this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                         if (result) {
                             if (this.myJsonRowData.length == 1) {
                                 let parEveRecords = this.adjustmentRecords.filter(i => i.objectType == 'PAR');
                                 if (this.paroleEventData.length > 0) {
                                     const data = {
                                         label: this.translateService.translate('ocdleglo.paroleeventspresent'), yesBtn: true, noBtn: true
                                     };
                                     this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                                         if (result) {
                                             custodyAdjRecords.forEach(ele => {
                                                 this.deleteAdjustmentRecords.push(ele);
                                             });
                                             parEveRecords.forEach(ele => {
                                                 this.deleteAdjustmentRecords.push(ele);
                                             });
                                             this.deleteParoleEventsList = this.paroleEventData;
                                             this.removeRecord(row);
                                         }
                                     });
                                 } else {
                                     custodyAdjRecords.forEach(ele => {
                                         this.deleteAdjustmentRecords.push(ele);
                                     });
                                     this.removeRecord(row);
                                 }
                             } else {
                                 custodyAdjRecords.forEach(ele => {
                                     this.deleteAdjustmentRecords.push(ele);
                                 });
                                 this.removeRecord(row);
                             }
                         }
                     });
                 } else if (this.myJsonRowData.length == 1) {
                     let parEveRecords = this.adjustmentRecords.filter(i => i.objectType == 'PAR');
                     if (this.paroleEventData.length > 0) {
                         const data = {
                             label: this.translateService.translate('ocdleglo.paroleeventspresent'), yesBtn: true, noBtn: true
                         };
                         this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                             if (result) {
                                 parEveRecords.forEach(ele => {
                                     this.deleteAdjustmentRecords.push(ele);
                                 });
                                 this.deleteParoleEventsList = this.paroleEventData;
                                 this.removeRecord(row);
                             }
                         });
                     }
                 } else {
                     this.removeRecord(row)
                 }
             } else {
                 this.removeRecord(row)
             }
          }
        });
      }
    onOrderDelete = (row) =>{
        if (row) {
            let linkedOrder = this.myJsonRowData.filter(i => i.relatedTo == row[0].displayNo);
            if (linkedOrder.length > 0) {
                if (linkedOrder[0].commenceType == 'CU') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdleglo.cannotdeletecumulativeorder')
                    this.show();
                    return false;
                } else if (linkedOrder[0].commenceType == 'CC') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdleglo.cannotdeleteconcurrentorder')
                    this.show();
                    return false;
                }
            }
            if(!this.isCustodialSavedData(row[0].orderNo)){
                this.OcdlegloFactory.readOrderAction(row[0],'D',this.ordersMapping);
                return true;
            }
            let ncusLinkedOrders = this.nonCustOrderList.filter(i => i.relatedTo == row[0].displayNo);
            if (ncusLinkedOrders.length > 0) {
                if (ncusLinkedOrders[0].commenceType == 'CU') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdleglo.cannotdeletecumulativeorder')
                    this.show();
                    return false;
                } else if (ncusLinkedOrders[0].commenceType == 'CC') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdleglo.cannotdeleteconcurrentorder')
                    this.show();
                    return false;
                }
            }
            if (this.conditionRowData.length > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdleglo.cannotdeleteorderhasconditions')
                this.show();
                return false;
            }
            if (this.parOrderList && this.parOrderList.length > 0) {
                for (let i = 0; i < this.parOrderList.length; i++) {
                    let affectedOrders = this.parOrderList[i].affectedOrders.filter(ele => row[0].displayNo === ele);
                    if (affectedOrders && affectedOrders.length > 0) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdleglo.cannotdeletelinkedtoparole')
                        this.show();
                        return false;
                    }
                }
            }
            if (this.nonCustOrderList.length > 0) {
                let uponRelOrd = this.nonCustOrderList.filter(i => i.commenceType == 'RFC');
                if (uponRelOrd.length > 0  && row[0].activeType != 'E') {
                    if (!(this.myJsonRowData.filter(i => i.activeType != 'E').length > 1)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdleglo.cannotdeleteorderlinktononcustorder')
                        this.show();
                        return false;
                    };
                }
            }
            let dependencyObj = {'formName' : this.screenId, 'offenderBookId': this.vHeaderBlockModel.offenderBookId,'displayNo':row[0].orderNo}
            this.OcdlegloFactory.checkOrderDependency(dependencyObj).subscribe( dep => {
                if(dep){
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdcords.cannotdeleteorderhasattacheddoc')
                    this.show();
                    return false;
                } else {
                    this.openDelConfModal(row); //Opens the Delete Confirm warnings
                }
            });
        }
        return false;
    }
    removeRecord(row){
        this.ocdleglogrid.gridOptions.api.applyTransaction({ remove: row });
        this.preDeleteOrder(row);
        const index = this.myJsonRowData.indexOf(row[0]);
        this.myJsonRowData.splice(index, 1);
        this.ocdleglogrid.btnClearbtnDisable = false;
        this.OcdlegloFactory.readOrderAction(row[0],'D',this.ordersMapping);
    }
    preDeleteOrder(row) {
        this.deleteOrderList.push(row[0]);
        if (row[0] && row[0].charges && this.chargeHistInitData) {
            Object.keys(this.chargeHistInitData).forEach(chgId => {
                for (let i = 0; i < this.chargeHistInitData[chgId].length; i++) {
                    if (this.chargeHistInitData[chgId][i]['orderNo'] == row[0].orderNo && this.chargeHistInitData[chgId][i]['orderType'] == 'CUST') {
                        this.chargeHistInitData[chgId].splice(i, 1);
                    }
                }
            });
        }
        this.setExternalSaveButton();
    }
    getStaffRoleDetails() {
        this.OcdlegloFactory.getDeleteFlag('DEL_CUST').subscribe(data => {
            if (data && data == 'Y' && this.sessionManager.userRoles.roles['OCDCORDS'] === 'full') {
                this.deleteOrderFlag = true;
            }
        });
    }
    getAdjustmentRecords() {
        this.deleteAdjustmentRecords = [];
        this.oidcustadFactory.getbookingsdata(this.vHeaderBlockModel.offenderBookId).subscribe(data => {
            if (data && data.length > 0) {
                let adjustRecords = data.filter(i => i.objectType !== 'BOOKING')
                this.adjustmentRecords = adjustRecords;
            }else {
                this.adjustmentRecords = [];
            }
        });
    }
    onBackBtnClick = () => {
        this.location.back();
    }

    commitAdjustments() {
        let adjustmentCommit = new OffenderSentenceAdjustmentCommitBean();
        adjustmentCommit.deleteList = this.deleteAdjustmentRecords;
        this.oidcustadFactory.bookingsCommit(adjustmentCommit).subscribe(data => {
            if(this.deleteParoleEventsList.length>0){
                this.deleteParoleEvents();
            }
        });
    }

    deleteParoleEvents() {
        this.OcdlegloFactory.deleteParoleEvents(this.deleteParoleEventsList).subscribe(obj => {
        });
    }

    deleteInterestedParties() {
        let inputData = {};
        inputData['recordType'] = 'CUST';
        inputData['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        this.ocdintpaFactory.executeQuery(inputData).subscribe(data => {
            if (data && data.length > 0) {
                let delInterestedParties = [];
                this.deleteOrderList.forEach(ele => {
                    let delRecords = data.filter(i => i.recordId == ele.orderNo);
                    delInterestedParties = [...delInterestedParties, ...delRecords];
                })
                let ocdintpaCommitBean = new InterestedPartiesCommitBean();
                ocdintpaCommitBean.deleteList = delInterestedParties;
                this.ocdintpaFactory.commitData(ocdintpaCommitBean).subscribe(ele => {

                });
            }
        })
    }
    getParoleEvents() {
        this.deleteAdjustmentRecords = [];
        this.oidparoeFactory.getEventData(this.vHeaderBlockModel.offenderBookId).subscribe(data => {
            if (data && data.length > 0) {
                this.paroleEventData = data;
            } else {
                this.paroleEventData = [];
            }
        });
    }
    ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }


    changeBulkOutcome(ev){
        if(ev && ev.code){
            this.chargesGrid.gridOptions.api.forEachNode((rowNode, index) => {
                if(rowNode.data.select){
                    rowNode.setDataValue('outcome', ev.code);
                }
            });
        }
    }

    isAnyChargeSelected(){
        let selected = false;
        this.chargesGrid.gridOptions.api.forEachNode((rowNode, index) => {
            if(rowNode.data.select){
                selected = true;
            }
        });
        return selected;
    }

    getAllOffences() {
        this.OcdlegloFactory.getAllOffences().subscribe(data => {
            this.allOffences = data;
        });
    }

    selectAllRecord() {
        this.chargesGrid.gridOptions.api.clearFocusedCell();
        for (let j = 0; j < this.chargesRowData.length; j++) {
            let node = this.chargesGrid.gridOptions.api.getDisplayedRowAtIndex(j);
            node.setDataValue('select', true);
        }
    }

    unselectAllRecord() {
        this.chargesGrid.gridOptions.api.clearFocusedCell();
        for (let j = 0; j < this.chargesRowData.length; j++) {
            let node = this.chargesGrid.gridOptions.api.getDisplayedRowAtIndex(j);
            node.setDataValue('select', false);
        }
    }

    proceedToWarning(){
        const data = {
            label: this.translateService.translate('ocdcords.orderwithoutchargesconfirmation').replace('%orderno%', this.ordersWithoutCharges.toString())
            , yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (result) {
                if (this.ordersWithoutMatter.length > 0) {
                    this.proceedToMatterWarning();
                } else {
                    this.calculateReason();
                }
            }
        });
    }

    proceedToMatterWarning() {
        const data = {
            label: this.translateService.translate('ocdleglo.recordmatternumber').replace('%orderno%', this.ordersWithoutMatter.toString())
            , yesBtn: true, yesLabel: 'Ok'
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
        });
    }

    chargeActions(chargesMapping) {
        chargesMapping.forEach(ele => {
            let initialOrder = this.initialOcdlegloGridData?.filter(i => i.displayNo == ele.displayNo);
            let charg = initialOrder[0]?.charges?.filter(i => i.chargeId == ele.chargeId);
            if(charg && charg[0]){
                ele['oldOutcome'] = charg[0].outcome
            } 
        });
        return JSON.stringify(chargesMapping);
    }
    
}