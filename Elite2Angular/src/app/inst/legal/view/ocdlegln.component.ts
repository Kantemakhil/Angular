import { OcmcondiService } from './../../legal-screens/maintenance/service/ocmcondi.service';
import { OcucondiService } from './../service/ocucondi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OcdlegloService } from '../service/ocdleglo.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/dynamic-alpine-grid/dynamic-alpine-grid.component';
import { OcucalcrService } from '../service/ocucalcr.service';
import { Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AppConstants } from '@core/classes/appConstants';
import { OcdintpaService } from '../service/Ocdintpa.service';
import { InterestedPartiesCommitBean } from '../beans/InterestedPartiesCommitBean';
import { OcdenforService } from '@iwp/service/ocdenfor.service';
import { CourtEvents } from '@inst/schedules/beans/CourtEvents';
import { Location } from '@angular/common';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';

@Component({
  selector: 'app-ocdlegln',
  templateUrl: './ocdlegln.component.html',
  styleUrls: ['./ocdlegln.component.scss']
})
export class OcdleglnComponent implements OnInit {

    @ViewChild('ocdleglngrid', {static: true}) ocdleglngrid: any;
    @ViewChild('chargesGrid', {static: true}) chargesGrid: any;
    message = ' Invalid.';
    msglist = [];
    type = 'error';
    myJsonRowData = [];
    custodialOrders = [];
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
    screenName = 'ocdncode';
    isSingleSaveBtnDisable: boolean = true;
    singleSaveBtnText = "Save & Calculate";
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
    chargeHistData = {};
    staffName = '';
    chargesHistDataId = 0;
    chargeHistInitData = {};
    outcomeData: any;
    sentTypeList = [];
    backButton: boolean;
    orderStatusData = [];
    allConditionsData: any =[];
    deleteOrderFlag: boolean = false;
    initialChargeHtyData = {};
    deleteOrderList = [];
    courtActionsList = [];
    courtEventsList = [];
    INDEFINITE = 'Indefinite';
    backButtonEnable: boolean = false;
    bulkOutcome:any;
    bulkOutcomeEnable: boolean = false;
    screenId ='OCDNCODE';
    allOffences: any =[];
    vHeaderBlockModelBean: VHeaderBlock = new VHeaderBlock();
    ordersWithoutCharges = [];
    ordersWithoutMatter = [];
    ordersMapping = [];
    
  constructor(private OcdlegloFactory: OcdlegloService,private ocmcondiService: OcmcondiService, private service: OcucondiService, public translateService:TranslateService,
    public loginService : LoginService, private dialogService: DialogService, private OcucalcrFactory : OcucalcrService, private router: Router,public sessionManager: UserSessionManager, private ocdintpaFactory: OcdintpaService,
    private ocdenforFactory: OcdenforService, private location: Location,private eoffenderService: EoffenderService,
    public osiosearFactory: OsiosearService, private offenderSearchService: OffenderSearchService) { 
    this.loadColDefData();
    this.loadChargesColDefData();
    this.getSentTermLovData();
    this.getConditionColDef();
    this.getOutcomes();
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
    const SentTypeData = this.OcdlegloFactory.populateSentType('NCUS');
    SentTypeData.subscribe(data => {
        if (data && data.length > 0) {
            this.sentTypeList = data;
        } 
    });
    this.OcucalcrFactory.getCurrentUserId().subscribe(staffName => {
            this.staffName = staffName;
    });
    if (this.ocdenforFactory.backButton) {
        this.backButtonEnable = true;
        this.ocdenforFactory.backButton = false;
    }
    this.getOrderStatus();
    this.getStaffRoleDetails();
  }

  
  loadColDefData(){
    const data = this.loginService.mainColDefData;
    let datatypeData = [];
    data.forEach(gridDef => {
            if(gridDef.grid_name == 'nonCustOrd' && gridDef.module_name == 'OCDNCODE'){
                datatypeData = JSON.parse(gridDef.configData);
            }
    })
    this.myColDefs = [];
    this.prepareColDef(datatypeData).forEach(key => this.myColDefs.push(key));
  }

  loadChargesColDefData(){
    const data = this.loginService.mainColDefData;
    let datatypeData = [];
    data.forEach(gridDef => {
            if(gridDef.grid_name == 'chargesChild' && gridDef.module_name == 'OCDCORDS'){
                datatypeData = JSON.parse(gridDef.configData);
            }
    })
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
                type.url = type.url + 'NCUS';
            }
            colDefs.push({datatype:type.dataType,lovRender: lovRendered, cellEditable: this.typeLovEdit, source:type.sourceType,suppressMenu: true, link:type.url, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, parentFields: type.parentFields, sourceDomain:type.sourceDomain})
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
        else if(type.dataType === 'date'&& type.field === 'commenceDate') {
            colDefs.push({datatype:'custom',suppressMenu: true, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, cellEditable: this.commenceDateEdit,hide: type.hide, editorSelector: (rowIndex, field, data) => {return 'date'}, rendererSelector: this.custom })
        } 
        else if(type.dataType === 'date' && type.field === 'orderedDate') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName),  width:100, suppressMenu: true, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required })
        }
        else if(type.dataType === 'date' && type.field === 'expiryDate') {
            colDefs.push({datatype:'custom',suppressMenu: true, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, cellEditable: this.expiryDateEdit,hide: type.hide, editorSelector: (rowIndex, field, data) => {return 'date'}, rendererSelector: this.custom  })
        }
        else if(type.dataType === 'date') {
            colDefs.push({datatype:type.dataType,suppressMenu: true, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, cellEditable: this.commenceDateEdit, hide: type.hide })
        } 
        else if(type.dataType === 'checkbox') {
            colDefs.push({datatype:type.dataType, width:40, field: type.field,fieldName:this.translateService.translate(type.fieldName),suppressMenu: true, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required})
        }
    });
    return colDefs;
  }
  custom = (rowIndex, field, data) => {
    if (field == 'commenceDate' || field == "expiryDate") {
      if (!data[field] || DateFormat.getDate(data[field]) + '' != 'Invalid Date') {
        return 'date';
      } else {
        return;
      }
    }
  }
  commenceDateEdit = (data: any, index: number, field: string) => {
    if(['incidentDate', 'Range'].includes(field)) return false;
    if (data.commenceType == 'CC' || data.commenceType == 'CU' || data.commenceType == 'RFC') {
        return false;
    }
    return true;
  }

    expiryDateEdit = (data: any, index: number, field: string) => {
        if (data.commenceType == 'RFC') {
            return false;
        }
        if (data.terms && data.terms[0] && data.terms[0].indefinite && data.terms[0].indefinite == true) {
            return false;
        }
        if (
            ((data.terms && data.terms[0]) && 
            ((data.terms[0].years && data.terms[0].years !== '') ||
            (data.terms[0].months && data.terms[0].months !== '') ||
            (data.terms[0].weeks && data.terms[0].weeks !== '') ||
                    (data.terms[0].days && data.terms[0].days !== '')) || !data.termTypeAndLength)
            ) {
            return false;
        }
        if (data.termTypeAndLength == 'Fixed Expiry') {
            return true;
        }
        if (this.isCustodialSavedData(data.orderNo)) {
            return false;
        }

        return true;
    }

  resetRowForType(rowData, rowIndex) {
    rowData.termTypeAndLength = '';
    rowData.terms = [];
    var rowNode = this.ocdleglngrid.gridOptions.api.getRowNode(rowIndex);
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
        for (let value of this.ocdleglngrid.addedMap.values()) {
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
    
   onLaunchClick = (event) => { 
    if(event.___link == "/nonCustDuration" && (event.sentenceCalcType == undefined || event.sentenceCalcType == "")){
        this.type = 'warn';
        this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey('type'));
        this.show();
        return false 
    }
    if(event.___link == "/OCDINTPA"){
        let inputData = {};
        inputData['recordId'] = event.orderNo;
        inputData['recordType'] = 'NCUS';
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
    this.dialogService.openLinkDialog(event.___link, event, 70).subscribe(result => {
        if (result && !result.___ismultiRows) {
            const node = this.ocdleglngrid.gridOptions.api.getSelectedNodes().length && this.ocdleglngrid.gridOptions.api.getSelectedNodes()[0];
            event.___parentField.forEach(obj=>{
                if (node) {
                    let processedObj = this.processResult(result);
                    node.setDataValue(obj, processedObj[obj]);
                }
                if(result.commenceDate){
                    this.ocdleglngrid.setColumnData('commenceDate', node.rowIndex, DateFormat.parse(result.commenceDate) + '' != 'Invalid Date'? DateFormat.parse(result.commenceDate):result.commenceDate);
                }
            })
            if(node && result.terms && result.terms[0] && result.terms[0].fixedExpiry && result.terms[0].fixedExpiry == true){
                if(node.data.expiryDate == this.INDEFINITE){
                    node.setDataValue('expiryDate', '');
                }
                node.setDataValue('commenceType', 'DTC');
            }
            else if(node && result.terms && result.terms[0] && result.terms[0].indefinite && result.terms[0].indefinite == true){
                this.ocdleglngrid.requiredOff('expiryDate');
                node.setDataValue('expiryDate', '');
            }
            else{
                this.ocdleglngrid.requiredOff('expiryDate');
                node.setDataValue('expiryDate', '');
            }
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
            const node = this.ocdleglngrid.gridOptions.api.getSelectedNodes().length && this.ocdleglngrid.gridOptions.api.getSelectedNodes()[0];
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



getCustodialData(){
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    form_identifiers['orderType'] = 'CUST';
    const retData = {
        formName : 'ocdleglo',
        id : this.dataId?this.dataId : 0,
        searchString : JSON.stringify(form_identifiers)
    }
    this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
        if (data && data.formInfoJson) {
            this.custodialOrders = JSON.parse(data.formInfoJson).myJsonRowData;
        } else {
            this.custodialOrders = [];
        }
    })
}



  loadJsonData() {
    this.bulkOutcome = undefined;
    this.bulkOutcomeEnable = false;
    this.previousCalculationReason = [];
    this.ordersMapping = [];
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
    form_identifiers['orderType'] = 'NONCUST';

    const retData = {
        formName : 'ocdleglo',
        id : this.dataId?this.dataId : 0,
        searchString : JSON.stringify(form_identifiers)
    }
    this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
        if (data && data.formInfoJson) {
            this.refreshDisabled = false;
            this.selectedRow = 0;
            let ncRowData = this.modifyDataForTermTypeAndLength(JSON.parse(data.formInfoJson).myJsonRowData);
            ncRowData.sort((nc1:any,nc2:any)=>this.OcdlegloFactory.dateComparator(nc1,nc2));
            this.myJsonRowData = JSON.parse(JSON.stringify(ncRowData))
            if(this.myJsonRowData && this.myJsonRowData[this.selectedRow] && this.myJsonRowData[this.selectedRow].charges){
                this.chargesRowData = this.myJsonRowData[this.selectedRow].charges;
            } else {
                this.chargesRowData = [];
            }
            if(this.myJsonRowData && this.myJsonRowData.length > 0){
                this.isConditionGridVisible = true;
                this.getConditions();
            }
            this.myJsonRowData.forEach(ele => {
                const resultStatus = this.orderStatusData.filter(i => i.updateReasonCode === ele.status);
                if (resultStatus.length > 0) {
                    ele['activeType'] = resultStatus[0].activeType;
                }
            })
            this.currentOcdlegloGridData = JSON.parse(JSON.stringify(this.myJsonRowData));
            this.initialOcdlegloGridData = JSON.parse(JSON.stringify(this.myJsonRowData));
            this.dataId = data.id;
            delete form_identifiers['orderType'];
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
    if ( offender ) {
        this.enableInsertInCustodial = true;
        this.enableInsertInCharges = true;
        this.loadJsonData();
        this.getCustodialData();
        this.loadChargeHist();
        this.getDependentData();
        // this.loadChildJsonData('ocdchgsu');
        // this.startTab();
    } else {
        this.enableInsertInCustodial = false;
        this.enableInsertInCharges = false;
        this.myJsonRowData = [];
        this.chargesRowData = [];
        this.chargeHistInitData = {};
        this.allConditionsData = [];
        this.courtActionsList =[];
        this.courtEventsList = [];
        // if(this.myJsonRowData && this.myJsonRowData.length){
        //     this.myJsonRowData.splice(0, this.myJsonRowData.length);
        // }
    }
}


    getSentTermLovData() {
        this.OcdlegloFactory.loadSentTerm(this.sessionManager.getId(),'OCDLEGLN').subscribe(data => {
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
        if(data.commenceType && (data.commenceType == 'DTC' || data.commenceType == 'RFC')){
            data["relatedToLaunch"] = "";
            // this.ocdleglngrid.requiredOn('commenceDate');
        }
        else{
            // this.ocdleglngrid.requiredOff('commenceDate');
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
            unchangedEveryData.intParties = "assets/images/legal-launch-btn-icon.png";
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


    onSave(event) {
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
    let finalObj = {
        'myJsonRowData': this.preSaveCleanUp(this.myJsonRowData),
        'calcReason': this.previousCalculationReason
    };
    var submitData = finalObj;
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    form_identifiers['orderType'] = 'NONCUST';

    const submissionData = {
        formName : 'ocdleglo',
        id : this.dataId?this.dataId : 0,
        formInfoJson : JSON.stringify(submitData),
        formIdentifier : JSON.stringify(form_identifiers),
        moduleName : 'OCDNCODE',
        orderOperations:  JSON.stringify(this.ordersMapping)
    }    
    this.OcdlegloFactory.saveData(submissionData).subscribe(data => {
        //submit success
        if(data){
            if(this.deleteOrderList.length>0){
                this.deleteInterestedParties();
            }
            this.ocdleglngrid.btnClearbtnDisable = true;
            this.isSingleSaveBtnDisable = true;
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
            this.getCustodialData();
            this.vHeaderBlockModelBean = new VHeaderBlock();
            this.vHeaderBlockModelBean.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
             this.vHeaderBlockModelBean.agyLocId = this.sessionManager.currentCaseLoad;
            this.vHeaderBlockModelBean.agyLocType = this.sessionManager.currentCaseLoadType;
            const searchResult = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelBean);
            searchResult.subscribe(vhbList => {
                if (vhbList.length > 0) {
                    this.vHeaderBlockModel = vhbList[0];
                    this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                }
            });
            }, 3000);
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
                this.message = this.translateService.translate('ocdncode.savedaspendingevent');
                this.type = 'warn';
                this.show();
            } 
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
            /* this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.type = 'success';
            this.show(); */
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
                !chg["orderNo"] || chgOrdMap[chgId].includes(chg["orderNo"] + ' - ' +chg["orderType"]) || ["CUST","BAIL"].includes(chg["orderType"])
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
        this.isSingleSaveBtnDisable = false;
    }
    else {
        this.isSingleSaveBtnDisable = true;
    }
}

    onUpdatedMapsData(event,gridName?: string) {
        this.setExternalSaveButton();
        // Only commenceType Updation in custodial order grid
        let index = -1;
        if(gridName == "noncustodialGrid") {
            index = this.currentOcdlegloGridData.findIndex(ord => ord.orderNo == event.updated.orderNo);
        }
        if (gridName == "noncustodialGrid" && (this.currentOcdlegloGridData[index] && this.currentOcdlegloGridData[index].commenceType !== event.updated.commenceType)
        ) {
            this.currentOcdlegloGridData[index] = JSON.parse(JSON.stringify(event.updated));
            this.resetRowForCommenceType(event.updated, index)
        }
        // Only sentenceCalcType Updation in custodial order grid
        else if (gridName == "noncustodialGrid" && (this.currentOcdlegloGridData[index].sentenceCalcType !== event.updated.sentenceCalcType)
        ) {
            this.currentOcdlegloGridData[index] = JSON.parse(JSON.stringify(event.updated));
            this.resetRowForType(event.updated, index)
        }else if (gridName == "noncustodialGrid" && (this.currentOcdlegloGridData[index].termTypeAndLength !== event.updated.termTypeAndLength)
        ) {
            this.currentOcdlegloGridData[index] = JSON.parse(JSON.stringify(event.updated));
            this.onDurationUpdate(event.updated, index)
        }
        if(gridName == "chargesGrid"){
            this.myJsonRowData.forEach(obj=> {
                obj.charges.forEach(ch=>{
                    if(ch.chargeId == event.updated.chargeId && this.selectedRow.orderNo == obj.orderNo){
                        ch['outcome'] = event.updated['outcome'];
                    }
                })
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
    if (rowData["commenceType"] !== 'DTC' && rowData["termTypeAndLength"] == 'Fixed Expiry') {
        rowData["termTypeAndLength"] = '';
        rowData["terms"] = [];
    }
    this.ocdleglngrid.requiredOff('expiryDate');
    this.ocdleglngrid.requiredOff('commenceDate');
    if (rowData.commenceType == 'CC') {
        this.ocdleglngrid.requiredOff('commenceDate');
        rowData.relatedToLaunch = rowData.lengthBtn
        var rowNode = this.ocdleglngrid.gridOptions.api.getRowNode(rowIndex);
        rowNode.setData(rowData);
        this.ocdleglngrid.requiredOn('relatedTo');
    }
    else if (rowData.commenceType == 'CU') {
        this.ocdleglngrid.requiredOff('commenceDate');
        rowData.relatedToLaunch = rowData.lengthBtn
        var rowNode = this.ocdleglngrid.gridOptions.api.getRowNode(rowIndex);
        rowNode.setData(rowData);
        this.ocdleglngrid.requiredOn('relatedTo');
    }
    else if (rowData.commenceType == 'DTC') {
        this.ocdleglngrid.requiredOn('commenceDate');
        rowData.relatedToLaunch = ''
        var rowNode = this.ocdleglngrid.gridOptions.api.getRowNode(rowIndex);
        this.ocdleglngrid.requiredOff('relatedTo');
        if(rowData.terms && rowData.terms[0] && rowData.terms[0].fixedExpiry && rowData.terms[0].fixedExpiry == true){
          this.ocdleglngrid.requiredOn('expiryDate');
          if(rowData.expiryDate == 'Indefinite' ){
            rowData["expiryDate"] = '';
          }
        }
        rowNode.setData(rowData);
    }
    else if (rowData.commenceType == 'RFC') {
       // this.ocdleglngrid.requiredOn('commenceDate');
       if(this.custodialOrders.length === 0){
        rowData["commenceType"] = '';
        this.currentOcdlegloGridData[rowIndex].commenceType = '';
        var rowNode = this.ocdleglngrid.gridOptions.api.getRowNode(rowIndex);
        rowNode.setData(rowData);
        this.type = 'warn';
        this.message = this.translateService.translate('ocdlegln.nocustodialorders');
        this.show();
        return;
       }
        rowData.relatedToLaunch = ''
        rowData["expiryDate"] = '';
        var rowNode = this.ocdleglngrid.gridOptions.api.getRowNode(rowIndex);
        rowNode.setData(rowData);
        this.ocdleglngrid.requiredOff('relatedTo');
        this.ocdleglngrid.requiredOff('commenceDate');
        this.ocdleglngrid.requiredOff('expiryDate');
    }
}

    onDurationUpdate(rowData, rowIndex){
        this.ocdleglngrid.requiredOff('expiryDate');
        if(rowData.commenceType == 'DTC' && rowData.terms && rowData.terms[0] && rowData.terms[0].fixedExpiry && rowData.terms[0].fixedExpiry == true){
            this.ocdleglngrid.requiredOn('expiryDate');
        }
    }


    onclearedData(event, gridName?: string) {
        this.setExternalSaveButton();
        if(gridName == "noncustodialGrid") {
            this.chargesRowData = [];
            this.ordersMapping = [];
            if(this.myJsonRowData.length > 0){
                this.currentOcdlegloGridData = JSON.parse(JSON.stringify(this.myJsonRowData));
                this.selectedRow = 0;
                this.enableInsertInCharges = true;
                this.ocdleglngrid.gridOptions.api.getRowNode('0').setSelected(true);
                this.chargeHistInitData = JSON.parse(JSON.stringify(this.initialChargeHtyData));
                this.deleteOrderList =[];
            } else {
                this.currentOcdlegloGridData = [];
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
        const node = this.ocdleglngrid.gridOptions.api.getSelectedNodes().length && this.ocdleglngrid.gridOptions.api.getSelectedNodes()[0];
            if (node) {
                node.setDataValue('charges', JSON.parse(JSON.stringify(this.chargesRowData)));
            }
    }
    else if(gridName == "noncustodialGrid") {
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
        this.ocdleglngrid.requiredOn('commenceDate');
        this.ocdleglngrid.requiredOff('relatedTo');
        if(event.terms && event.terms[0] && event.terms[0].fixedExpiry && event.terms[0].fixedExpiry){
            this.ocdleglngrid.requiredOn('expiryDate');
        } else {
            this.ocdleglngrid.requiredOff('expiryDate');
        }
    }
    else if(event && event.commenceType == 'RFC'){ 
        this.ocdleglngrid.requiredOff('relatedTo');
        this.ocdleglngrid.requiredOff('commenceDate');
        this.ocdleglngrid.requiredOff('expiryDate');
    }
    else{
        this.ocdleglngrid.requiredOff('commenceDate');
        this.ocdleglngrid.requiredOn('relatedTo');
    }
    if (event){
        this.condiLegalText = '';
        this.getCondOfOrder(this.allConditionsData,this.selectedRow.orderNo);
    }
    if(event && this.isCustodialSavedData(event.orderNo)){
        this.isConditionGridVisible = true;
        this.eoffenderService.selectedRowData=event;
        this.eoffenderService.selectedRowData['offenderBookId']= this.vHeaderBlockModel.offenderBookId;
        this.eoffenderService.selectedRowData['recordId']=  event.orderNo+'';
    } else {
        this.isConditionGridVisible = false;
        this.eoffenderService.selectedRowData=null;
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

onOcdleglnGridInsert = () => {
    let highestIndex = 1;
    if(!this.isCustodialOrderDataValid()){
        return ;
    }
    if(this.myJsonRowData.length > 0){
        highestIndex = this.getHighestIndex() + 1;
    }
    let addData = {
        orderNo: highestIndex,
        displayNo: 'NC_' + highestIndex,
        lengthBtn: "assets/images/legal-launch-btn-icon.png",
        orderType: 'NCUS',
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

isCustodialOrderDataValid(){
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
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
                    this.show();
                    return false
            }
            else if (key == "relatedTo" && (eachRowData["commenceType"] == 'CC' || eachRowData["commenceType"] == 'CU' ) && (value == undefined || value == '')) {
                // conditionally required field validation
                this.type = 'warn';
                this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%','Link To');
                this.show();
                return false
            }
            else if (key == "commenceDate" && (eachRowData["commenceType"] == 'DTC') && (value == undefined || value == '')) {
                // conditionally required field validation
                this.type = 'warn';
                this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
                this.show();
                return false
            }
            /* else if (key == "expiryDate" && eachRowData["commenceType"] == 'RFC' && (value == undefined || value == '')) {
                // conditionally required field validation
                this.type = 'warn';
                this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
                this.show();
                return false
            } */
            else if (key == "expiryDate" && eachRowData["commenceType"] == 'DTC' && (value == undefined || value == '')) {
                // conditionally required field validation
                if(eachRowData.terms && eachRowData.terms[0] && eachRowData.terms[0].fixedExpiry && eachRowData.terms[0].fixedExpiry == true){
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
                    this.show();
                    return false
                } 
            }
        }
        for (let j = 0; j < this.myColDefs.length; j++) {
            let key = this.myColDefs[j].field;
            let value = eachRowData[key] ? eachRowData[key] : '';
            let config = this.getColumnConfig(key);
            // valid value validation here
            if(!this.validValueValidation(key,value, config, rowIndex)){
                return false;
            } 
        }
        const initialOrder = this.initialOcdlegloGridData.filter(ele => ele.displayNo == this.myJsonRowData[i].displayNo);
        const updStatus = this.orderStatusData.filter(ele => ele.updateReasonCode == this.myJsonRowData[i].status);
        if (initialOrder && initialOrder.length > 0 && updStatus && updStatus.length > 0) {
            if ((initialOrder[0].activeType === 'A' || !initialOrder[0].activeType) && (updStatus[0].activeType == 'I' || updStatus[0].activeType == 'E')) {
                let activeConditions = this.allConditionsData.length > 0 ? this.allConditionsData.filter(ele => ele.activeType == 'A'  && initialOrder[0].orderNo == ele.sentenceSeq) : [];
                if (activeConditions.length > 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdncode.pleasedeactivateconditionfirst');
                    this.show();
                    return false;
                }
            }
        }
        if (initialOrder.length > 0 && initialOrder[0].code !== updStatus[0].code) {
            if ((initialOrder[0].activeType == 'I' || initialOrder[0].activeType == 'A') && updStatus[0].activeType == 'E') {
                const nonCustRel = this.myJsonRowData.filter(ele => ele.relatedTo == this.myJsonRowData[i].displayNo && ele.activeType != 'E');
                if ( nonCustRel.length > 0 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdncode.orderisdependent');
                    this.show();
                    return false;
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

validValueValidation(key,value, config, rowIndex){
   let newDateValue; 
   let rowData = this.myJsonRowData[rowIndex-1];
    if(config.datatype == 'date' || key == "expiryDate" || key == 'commenceDate'){    
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
    } else if ((key == "commenceDate") && newDateValue > this.getFormatedDate(new Date()) && !['CU','CC','DTC','RFC'].includes(rowData.commenceType)) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdleglo.grtthancurrdata').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
        this.show();
        return false
    }
    else if (key == "expiryDate" && rowData.commenceType === "DTC" && newDateValue < this.getFormatedDate(new Date(rowData.commenceDate))) {
        this.type = 'warn';
        this.message = 'Expiry Date must be later than or equal to the Commence Date';
        this.show();
        return false
    }
    else if (key == "termTypeAndLength" && value == '') {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdleglo.selectTerm').replace('%fieldname%',this.OcdlegloFactory.getDisplayedKey(key));
        this.show();
        return false
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
    else if (key == "matter") {
        if (value == '' || value == undefined) {
            const existingValues = this.sentTypeList.filter(obj => rowData.sentenceCalcType == obj.code);
            if (existingValues.length > 0 && existingValues[0].chargesFlag === 'N') {
                this.ordersWithoutMatter.push(rowData['displayNo']);
            } 
            else {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdleglo.addcharges').replace('%orderno%', rowData.orderNo);
                this.show();
                return false
            } 
        }
        if (rowData['charges'] == "") {
            this.ordersWithoutCharges.push(rowData['displayNo']);
        }
    } else if(key == "charges" ){
        if(value && value.length && value.filter(ele=>!ele.outcome).length){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdleglo.addoutcome').replace('%orderno%',rowData.orderNo);
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
        if (result) {
            if (result.selectedRows) {
                this.bulkOutcomeEnable = false;
                result.selectedRows.forEach(obj => {
                    obj.details = 'assets/images/legal-launch-btn-icon.png';
                })
                this.chargesRowData = JSON.parse(JSON.stringify(result.selectedRows));
                this.completeChargesData = JSON.parse(JSON.stringify(result.completeChargesData));
                this.chargesDataId = result.dataId;
                if (!result.dataId) {
                    const form_identifiers = {};
                    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
                    const charges = {
                        formName: 'OCDCHGSU',
                        id: this.chargesDataId ? this.chargesDataId : 0,
                        searchString: JSON.stringify(form_identifiers)
                    }
                    this.OcdlegloFactory.loadData(charges).subscribe((data: any) => {
                        this.chargesDataId = data.id;
                    });
                }
                const node = this.ocdleglngrid.gridOptions.api.getSelectedNodes().length && this.ocdleglngrid.gridOptions.api.getSelectedNodes()[0];
                if (node) {
                    let processedObj = [];
                    this.chargesRowData.forEach(obj => {
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
            } else if (result.updatedChargesData) {
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
            fieldName: this.translateService.translate( 'ocdncode.staff' ), required : false, 
            field: 'assignedOfficer', editable: false, width: 150, datatype: 'text', 
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
        commConditionType: 'NCUS',
        sealFlag: 'Y'
     }
    this.service.getConditionTypeGrid(obj).subscribe(data => {
        if(data && data.length>0){
            data.forEach(ele => {
                let activeType = this.orderStatusData.filter(i => i.updateReasonCode == ele.conditionStatus);
                ele['activeType'] = activeType[0] ? activeType[0].activeType : '';
            });
            this.allConditionsData = data;  
            this.getCondOfOrder(this.allConditionsData,this.selectedRow.orderNo)
        } else {
            this.allConditionsData = [];
            this.conditionRowData =[];
        }
    });
}

addCondition = () => {
    const initialRowData = this.initialOcdlegloGridData.filter(i => i.displayNo === this.selectedRow.displayNo);
    const orderEndDate = initialRowData[0]['expiryDate'];
    let obj = {
        selectedOffender: this.vHeaderBlockModel,
        data: this.conditionRowData,
        selectedOrder: initialRowData[0],
        orderType: 'NCUS',
        orderStatus: this.orderStatusData,
        orderEndDate: orderEndDate
    };
    this.dialogService.openLinkDialog('/OCUCONDIDLG', obj, 80).subscribe(result => {
        this.getConditions();
    });
}

updateCondition = () => {
    const initialRowData = this.initialOcdlegloGridData.filter(i => i.displayNo === this.selectedRow.displayNo);
    const orderEndDate = initialRowData[0]['expiryDate'];
    let obj = {
        selectedOffender: this.vHeaderBlockModel,
        data: this.conditionRowData,
        orderNo: initialRowData[0],
        orderType: 'NCUS',
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
        orderType: 'NCUS',
        selectedOrder: initialRowData[0]
    };
    this.dialogService.openLinkDialog('OCUDCOND', obj, 80).subscribe(result => {
        this.getConditions();
    });
}
getCondCategory() {
    this.service.getCondCategory(this.sessionManager.getId(),'OCDLEGLN').subscribe(data=>{
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
                    this.ocdleglngrid.setColumnData('status', event.rowIndex, 'ACT');
                }
            }
            if (event.field == 'commenceDate') {
                if (intialOrder == -1) {
                    if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) == 1) {
                        this.ocdleglngrid.setColumnData('status', event.rowIndex, 'PEND');
                    } else if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) != 1) {
                        this.ocdleglngrid.setColumnData('status', event.rowIndex, 'ACT');
                    } else if (event.data.expiryDate && DateFormat.compareDate(event.newValue, DateFormat.getDate()) != 1 && DateFormat.compareDate(DateFormat.getDate(event.data.expiryDate), DateFormat.getDate()) != 1) {
                        this.ocdleglngrid.setColumnData('status', event.rowIndex, 'EXP');
                    }
                }
            }
            if (event.field == 'expiryDate') {
                if (intialOrder == -1) {
                    if (event.data.commenceDate && DateFormat.compareDate(event.data.commenceDate, DateFormat.getDate()) == 1) {
                        this.ocdleglngrid.setColumnData('status', event.rowIndex, 'PEND');
                    } else if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) != -1) {
                        this.ocdleglngrid.setColumnData('status', event.rowIndex, 'ACT');
                    } else if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) == -1) {
                        this.ocdleglngrid.setColumnData('status', event.rowIndex, 'EXP');
                    }
                }
            }
            if (event.field == 'termTypeAndLength' && !event.data.expiryDate && event.data.commenceDate) {
                if (intialOrder == -1) {
                    if (DateFormat.compareDate(DateFormat.getDate(event.data.commenceDate), DateFormat.getDate()) == 1) {
                        this.ocdleglngrid.setColumnData('status', event.rowIndex, 'PEND');
                    } else {
                        this.ocdleglngrid.setColumnData('status', event.rowIndex, 'ACT');
                    }
                }
            }
        } else {
            const selectedOrder = this.initialOcdlegloGridData.filter(i => i.displayNo == event.data.displayNo);
            const initialStatus = selectedOrder[0]?selectedOrder[0].activeType:'A';
            const updStatus = this.orderStatusData.filter(i => i.updateReasonCode == event.data.status);
            if (initialStatus == 'E' && updStatus[0]) {
                this.ocdleglngrid.setColumnData('activeType', event.rowIndex, updStatus[0].activeType);
            } else if (initialStatus == 'A' || initialStatus == 'I') {
                if (updStatus[0] && updStatus[0].activeType == 'E') {
                    const nonCustRel = this.myJsonRowData.filter(i => i.relatedTo == event.data.displayNo && i.activeType != 'E');
                    if ((nonCustRel && nonCustRel.length > 0)) {
                        this.ocdleglngrid.setColumnData('status', event.rowIndex, undefined);
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdncode.orderisdependent')
                        this.show();
                        return rowdata;
                    }
                    this.ocdleglngrid.setColumnData('activeType', event.rowIndex, updStatus[0].activeType);
                }
            }
        }
        if(['status','commenceType','commenceDate','termTypeAndLength','relatedTo','expiryDate'].includes(event.field)){
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
    getCondOfOrder(conditionList, orderNo) {
        this.conditionRowData = conditionList.filter(i => i.sentenceSeq === orderNo);
        this.selectedRowofConditionGrid = 0;
        for(let i=0; i<this.conditionRowData.length; i++) {
            let activeType = this.orderStatusData.filter(ele => ele.updateReasonCode == this.conditionRowData[i].conditionStatus);
            this.conditionRowData[i]['activeType'] = activeType[0] ? activeType[0].activeType : '';
            if (this.conditionRowData[i].programId) {
                    this.conditionRowData[i].program = this.programIdMap.get(this.conditionRowData[i].programId);
            } else {
                this.condData.forEach(obj=>{
                    if(obj.commConditionCode == this.conditionRowData[i].commConditionCode && 
                        this.conditionRowData[i].commConditionType == obj.commConditionType)
                    // this.conditionRowData[i].programMethod = obj.code;
                    var fiteredCat = this.condCategory.filter(obj=>obj.code == this.conditionRowData[i]["programMethod"]);
                    if(fiteredCat && fiteredCat.length > 0) {
                        this.conditionRowData[i].program = fiteredCat[0].description;
                    }
                })
            }
            if(this.conditionRowData[i]["programMethod"] !== 'ACP' && this.conditionRowData[i]["programMethod"] !== 'UW'){
                this.conditionRowData[i].program = '';
            }
            if(this.conditionRowData[i].length || this.conditionRowData[i].lengthUnit){
                if(this.conditionRowData[i].length == null){
                    this.conditionRowData[i].length = '';
                } else if (this.conditionRowData[i].lengthUnit == null){
                    this.conditionRowData[i].lengthUnit = '';
                }
                this.conditionRowData[i]['unitLength'] = this.conditionRowData[i].length +
                  " " +
                  this.conditionRowData[i].lengthUnit;
            }
            
        }
        this.getCondCategory();
    }
    onBackBtnClick = () => {
        this.location.back();
    }
    getStaffRoleDetails() {
        this.OcdlegloFactory.getDeleteFlag('DEL_NCUS').subscribe(data => {
            if (data && data == 'Y') {
                this.deleteOrderFlag = true;
            }
        });
    }
    onOrderDelete = (row) => {
        if (row) {
            let linkedOrder = this.myJsonRowData.filter(i => i.relatedTo == row[0].displayNo);
            if (linkedOrder.length > 0) {
                if (linkedOrder[0].commenceType == 'CU') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdncode.cannotdeletecumulativeorder')
                    this.show();
                    return false;
                } else if (linkedOrder[0].commenceType == 'CC') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdncode.cannotdeleteconcurrentorder')
                    this.show();
                    return false;
                }
            }
            if (this.conditionRowData.length > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdncode.cannotdeleteorderhasconditions')
                this.show();
                return false;
            }
            if(this.courtActionsList && this.courtActionsList.length>0){
                let dependentActions = this.courtActionsList.filter(i=> i.sentenceSeq == row[0].orderNo);
                if(dependentActions.length){
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdncode.cannotdeletecourtactions')
                    this.show();
                    return false;
                }
            }
            if(this.courtEventsList && this.courtEventsList.length>0){
                let dependentEvents = this.courtEventsList.filter(i=> i.sentenseSeq == row[0].orderNo);
                if(dependentEvents.length){
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdncode.cannotdeletecourtevents')
                    this.show();
                    return false;
                }
            }
        }
        if(!this.isCustodialSavedData(row[0].orderNo)){
            this.OcdlegloFactory.readOrderAction(row[0],'D',this.ordersMapping);
            return true;
        }
        let dependencyObj = {'formName' : this.screenId, 'offenderBookId': this.vHeaderBlockModel.offenderBookId,'displayNo':row[0].orderNo}
        this.OcdlegloFactory.checkOrderDependency(dependencyObj).subscribe( dep => {
            if(dep){
                this.type = 'warn';
                this.message = this.translateService.translate('ocdncode.cannotdeleteorderhasattacheddoc')
                this.show();
                return false;
            } else {
                this.ocdleglngrid.gridOptions.api.applyTransaction({ remove: row });
                this.preDeleteOrder(row);
                const index = this.myJsonRowData.indexOf(row[0]);
                this.myJsonRowData.splice(index, 1);
                this.ocdleglngrid.btnClearbtnDisable = false;
                this.OcdlegloFactory.readOrderAction(row[0],'D',this.ordersMapping);
            }
        });
        return false;
    }

    preDeleteOrder(row) {
        this.deleteOrderList.push(row[0]);
        if (row[0] && row[0].charges && this.chargeHistInitData) {
            Object.keys(this.chargeHistInitData).forEach(chgId => {
                for (let i = 0; i < this.chargeHistInitData[chgId].length; i++) {
                    if (this.chargeHistInitData[chgId][i]['orderNo'] == row[0].orderNo && this.chargeHistInitData[chgId][i]['orderType'] == 'NCUS') {
                        this.chargeHistInitData[chgId].splice(i, 1);
                    }
                }
            });
        }
        this.setExternalSaveButton();
    }
    deleteInterestedParties() {
        let inputData = {};
        inputData['recordType'] = 'NCUS';
        inputData['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        this.ocdintpaFactory.executeQuery(inputData).subscribe( data => {
            if(data && data.length>0){
                let delInterestedParties = [];
                this.deleteOrderList.forEach( ele => {
                    let delRecords = data.filter(i=> i.recordId == ele.orderNo);
                    delInterestedParties = [...delInterestedParties,...delRecords];
                })
                let ocdintpaCommitBean = new InterestedPartiesCommitBean();
                ocdintpaCommitBean.deleteList = delInterestedParties;
                this.ocdintpaFactory.commitData(ocdintpaCommitBean).subscribe(ele => {

                });
            }
        })
    }
    getDependentData() {
        this.getCourtActions(); 
        this.getCourtEvents();
    }
    getCourtActions() {
        let courtOrdersModel = {};
        courtOrdersModel['offenderBookId'] = this.vHeaderBlockModel.offenderBookId;
        courtOrdersModel['orderType'] = 'NCUS';
        const serviceObj = this.ocdenforFactory.actionsExecuteQuery(courtOrdersModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.courtActionsList = [];
            } else {
                this.courtActionsList = data;
            }
        });
    }
    getCourtEvents() {
        let courtEventSearchModel = new CourtEvents();
        courtEventSearchModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.OcdlegloFactory.getCourtEvents(courtEventSearchModel).subscribe(data => {
            if (data.length === 0) {
                this.courtEventsList = [];
            } else {
                this.courtEventsList = data;
            }
        });
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
    ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
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

}
