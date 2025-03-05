import { OcmcondiService } from './../../legal-screens/maintenance/service/ocmcondi.service';
import { OcucondiService } from './../service/ocucondi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OcdlegloService } from '../service/ocdleglo.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/dynamic-alpine-grid/dynamic-alpine-grid.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AppConstants } from '@core/classes/appConstants';
import { OcdintpaService } from '../service/Ocdintpa.service';
import { InterestedPartiesCommitBean } from '../beans/InterestedPartiesCommitBean';
import { OcdenforService } from '@iwp/service/ocdenfor.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';


@Component({
    selector: 'app-ocdparor',
    templateUrl: './ocdparor.component.html',
    styleUrls: ['./ocdleglo.component.scss']
})
export class OcdparorComponent implements OnInit {
    @ViewChild('ocdparorgrid', { static: true }) ocdparorgrid: any;
    @ViewChild('affectedOrdGrid', { static: true }) affectedOrdGrid: any;
    message = ' Invalid.';
    msglist = [];
    type = 'error';
    INDEFINITE = 'Indefinite';
    myJsonRowData = [];
    enableInsertParoleOrders: boolean = false;
    enableInsertInCharges: boolean = false;
    initialocdparorgridData = [];
    initialaffectedOrdGridData = [];
    previousCalculationReason = [];
    currentocdparorgridData: any;
    myColDefs: any[];
    msgs: any[];
    vHeaderBlockModel: any;
    dataId: any;
    screenName = 'ocdleglo';
    isSingleSaveBtnDisable: boolean = true;
    singleSaveBtnText = "";
    pageData: any;
    sentTermLovData = [];
    selectedTab: string = "Process1";
    affectedOrdColdef = [];
    affectedOrdRowData = [];
    tabMapping = new Map([
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
    activeCustOrders = [];
    sentTypeList = [];
    paroleTermTypeList = [];
    orderStatusData = [];
    revokeFlag: boolean = false;
    allConditionsData: any =[];
    deleteOrderFlag: boolean = false;
    deleteOrderList =[];
    backButtonEnable: boolean = false;
    screenId ='OCDPAROR';
    vHeaderBlockModelBean: VHeaderBlock = new VHeaderBlock();
    ordersMapping = [];
    orderStatusRecord = [];
    hideErd: boolean;
    resetGrid: boolean = true;
    constructor(private OcdparorFactory: OcdlegloService, private ocmcondiService: OcmcondiService, private service: OcucondiService, public translateService: TranslateService, private location: Location,
        public loginService: LoginService, private dialogService: DialogService,public sessionManager: UserSessionManager, private ocdintpaFactory: OcdintpaService,private ocdenforFactory: OcdenforService,
        private router: Router,private eoffenderService: EoffenderService, public osiosearFactory: OsiosearService, private offenderSearchService: OffenderSearchService) {
          this.getERDHideShowValue ();        
        this.loadColDefData();
        this.loadaffectedOrdColDefData()//this.loadChargesColDefData();
        this.getSentTermLovData();
        this.getConditionColDef();
        this.ocmcondiService.comCondExecuteQuery({}).subscribe(data => {
            if (data) {
                this.condData = data;
            }
        })
        this.getProgramId();
        this.getCondCategory();
    }

    ngOnInit() {
        this.singleSaveBtnText = this.translateService.translate('common.saveandcalculate');
        const SentTypeData = this.OcdparorFactory.populateSentType('CUST');
        SentTypeData.subscribe(data => {
            if (data && data.length > 0) {
                this.sentTypeList = data;
            }
        });
        this.getOrderStatus();
        this.getStaffRoleDetails();
        if (this.ocdenforFactory.backButton) {
            this.backButtonEnable = true;
            this.ocdenforFactory.backButton = false;
          }
    }


    loadColDefData() {
        const data = this.loginService.mainColDefData;
        let datatypeData = [];
        data.forEach(gridDef => {
            if (gridDef.grid_name == 'paroleOrders' && gridDef.module_name == 'OCDPAROR') {
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
        // const datatypeData = data && data.custOrd && JSON.parse(data.custOrd);
        this.myColDefs = [];
        this.prepareColDef(datatypeData).forEach(key => this.myColDefs.push(key));
    }
    loadaffectedOrdColDefData() { // loadChargesColDefData
        const data = this.loginService.mainColDefData;
        let datatypeData = [];
        data.forEach(gridDef => {
            if (gridDef.grid_name == 'affectedOrders' && gridDef.module_name == 'OCDPAROR') {
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
        // const datatypeData = data && data.custOrd && JSON.parse(data.chargesChild);
        this.affectedOrdColdef = [];
        this.prepareColDef(datatypeData).forEach(key => this.affectedOrdColdef.push(key));
    }


    prepareColDef(coldefJson) {
        let colDefs = [];
        coldefJson.forEach(type => {
            if (type.dataType === 'lov' && type.source === 'link') {
                let lovRendered = 'description';
                if (type.field == 'authority') {
                    lovRendered = 'code'
                }
                // if (type.field == 'status') {
                //     type.url = type.url + 'PAR';
                // }
                colDefs.push({ datatype: type.dataType, lovRender: lovRendered, cellEditable: this.typeLovEdit, source: type.sourceType, suppressMenu: true, link: type.url, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, parentFields: type.parentFields })
            }
            else if (type.dataType === 'lov' && type.source === 'domain') {
                colDefs.push({ datatype: type.dataType, domain: type.url, suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'text') {
                colDefs.push({ datatype: type.dataType, wrapText: true, width: 80, suppressMenu: true, hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, maxWidth: 500 })
            }
            else if (type.dataType === 'number') {
                colDefs.push({ datatype: type.dataType, width: 40, suppressMenu: true, hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'launchbutton') {
                colDefs.push({ datatype: type.dataType, width: 100, parentField: type.parentField, suppressMenu: true, onLaunchClick: this.onLaunchClick, field: type.field, fieldName: '', required: type.required, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' })
            }
            else if (type.dataType === 'hyperlink') {

                colDefs.push({ datatype: 'hyperlink', width: 50, displayas: 'image', suppressMenu: true, parentField: type.parentField, onLaunchClick: this.onLaunchClick, required: type.required, fieldName: this.translateService.translate(type.fieldName), field: type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' })
            }
            else if (type.dataType === 'date' && type.field === 'expiryDate') {
                colDefs.push({ datatype: 'custom', suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: true, required: type.required, cellEditable: this.expiryDateEdit, hide: type.hide, editorSelector: (rowIndex, field, data) => { return 'date' }, rendererSelector: this.custom })
            }
            else if (type.dataType === 'date') { 
                colDefs.push({ datatype: type.dataType, field: type.field, fieldName: this.translateService.translate(type.fieldName), width: 100, suppressMenu: true, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, hide: type.hide })
            }
            else if (type.dataType === 'checkbox') {
                colDefs.push({ datatype: type.dataType, width: 40, field: type.field, fieldName: this.translateService.translate(type.fieldName), suppressMenu: true, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
        });
        return colDefs;
    }
    custom = (rowIndex, field, data) => {
        if (field == "expiryDate") {
            if (!data[field] || DateFormat.getDate(data[field]) + '' != 'Invalid Date') {
                return 'date';
            } else {
                return;
            }
        }
    }
    expiryDateEdit = (data: any, index: number, field: string) => {
        if (data && data.duration && data.duration == 'Fixed Expiry') {
            return true;
        }
        return false;
    }

    resetRowForDuration(rowData, rowIndex) {
        rowData.expiryDate = '';
        if (rowData.duration === 'Fixed Expiry') {
            this.ocdparorgrid.requiredOn('expiryDate');
        } else {
            this.ocdparorgrid.requiredOff('expiryDate');
        }
        var rowNode = this.ocdparorgrid.gridOptions.api.getRowNode(rowIndex);
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
        for (let value of this.ocdparorgrid.addedMap.values()) {
            if (value.orderNo == orderNo) {
                return false;
            }
        }
        for (let i = 0; i < this.initialocdparorgridData.length; i++) {
            if (orderNo == this.initialocdparorgridData[i].orderNo) {
                return true;
            }
        }
        return false;
    }

    onLaunchClick = (event) => {
        if (event.___link == "/durationToLine" && (event.sentenceCalcType == undefined || event.sentenceCalcType == "")) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%', this.OcdparorFactory.getDisplayedKey('type'));
            this.show();
            return false
        }
        if(event.___link == "/OCDINTPA"){
            let inputData = {};
            inputData['recordId'] = event.orderNo;
            inputData['recordType'] = 'PAR';
            inputData['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
            this.dialogService.openLinkDialog('/OCDINTPA', inputData, 50).subscribe(result => { });
            return;
        }
        if(event.___link == "/EOFFENDER"){
            this.eoffenderService.selectedRowData=event;
            this.eoffenderService.selectedRowData['offenderBookId'] = this.vHeaderBlockModel.offenderBookId;
            this.eoffenderService.selectedRowData['recordId'] = event.orderNo + '';
            let objectId = event.orderNo;
            let screenParam = this.screenId+"~"+'true'+"~"+objectId;
        this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : screenParam } } );
        return;
        }
        if (event.___link == "/OCDCHGDT") {
            event["isDisabled"] = true;
        }
        event["lovData"] = this.sentTermLovData;
        event['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        const data = JSON.parse(JSON.stringify(event));
        this.dialogService.openLinkDialog(data.___link, data, 70).subscribe(result => {
            if (result && !result.___ismultiRows) {
                const node = this.ocdparorgrid.gridOptions.api.getSelectedNodes().length && this.ocdparorgrid.gridOptions.api.getSelectedNodes()[0];
                event.___parentField.forEach(obj=>{
                    if (node) {
                        let processedObj = this.processResult(result);
                        node.setDataValue(obj, processedObj[obj]);
                    }
                })
                if (node && result.terms && result.terms[0] && result.terms[0].fixedExpiry && result.terms[0].fixedExpiry == true) {
                    this.ocdparorgrid.requiredOn('expiryDate');
                }
                else if (node && result.terms && result.terms[0] && result.terms[0].indefinite && result.terms[0].indefinite == true) {
                    this.ocdparorgrid.requiredOff('expiryDate');
                    node.setDataValue('expiryDate', '');
                }
                else{
                    this.ocdparorgrid.requiredOff('expiryDate');
                    node.setDataValue('expiryDate', '');
                }
            } 
            this.myJsonRowData.forEach(obj=>{
                this.processResult(obj);
                delete obj['lovData'];
            })
        });
    }

    processResult(obj) {
        Object.keys(obj).forEach(key => {
            if (key.includes('___') || ["details", "select", "descriptionLaunch", "isDisabled", "outcomeBtn"].includes(key)) {
                delete obj[key];
            }
        })
        return obj;
    }
     
    loadJsonData() {
        this.previousCalculationReason = [];
        this.revokeFlag = false;
        this.activeCustOrders = [];
        this.ordersMapping = [];
        this.orderStatusRecord = [];
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        form_identifiers['orderType'] = 'PAR';
        const retData = {
            formName: this.screenName,
            id: this.dataId ? this.dataId : 0,
            searchString: JSON.stringify(form_identifiers)
        }
        this.OcdparorFactory.loadData(retData).subscribe((data: any) => {
            if (data && data.formInfoJson) {
                this.refreshDisabled = false;
                this.myJsonRowData = JSON.parse(data.formInfoJson).myJsonRowData;
                this.myJsonRowData.forEach(ord => {
                    const resultStatus = this.orderStatusData.filter(i => i.updateReasonCode === ord.status);
                    if (resultStatus.length > 0) {
                        ord['activeType'] = resultStatus[0].activeType;
                    }
                    ord['lengthBtn'] = "assets/images/legal-launch-btn-icon.png";
                    ord.intParties = "assets/images/legal-launch-btn-icon.png";
                    ord['iwpButton'] = "assets/icons/file_copy.svg";
                });
                this.selectedRow = 0;
                if (this.myJsonRowData && this.myJsonRowData.length > 0) {
                    this.isConditionGridVisible = true;
                    this.getConditions();
                }
                this.currentocdparorgridData = JSON.parse(JSON.stringify(this.myJsonRowData));
                this.initialocdparorgridData = JSON.parse(JSON.stringify(this.myJsonRowData));
                this.dataId = data.id;
                delete form_identifiers['orderType']
                const aff_form_identifiers = {};
                aff_form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
                aff_form_identifiers['orderType'] = 'CUST';
                const retData = {
                    formName: 'OCDLEGLO',
                    id: this.dataId ? this.dataId : 0,
                    searchString: JSON.stringify(aff_form_identifiers)
                }
                this.OcdparorFactory.loadData(retData).subscribe((data: any) => {
                    if (data && data.formInfoJson) {
                        const custGridData = JSON.parse(data.formInfoJson).myJsonRowData;
                        this.activeCustOrders = [];
                        custGridData.forEach(element => {
                            // Rules for Affected Orders in S4-24406
                            const existingValues = this.sentTypeList.filter(obj =>  element.sentenceCalcType == obj.code && ('IMPS' != obj.sentType && 'CNCO' != obj.sentType));
                            if (existingValues.length == 0) {
                                const custOrderStatus = this.orderStatusData.filter(obj => obj.updateReasonCode == element.status);
                                element['activeType'] = custOrderStatus[0].activeType
                                this.activeCustOrders.push(element);
                            } 
                        });
                        let sentenceDates = [];
                        let aff_form_identifiers = '"offenderBookId":"' + this.vHeaderBlockModel.offenderBookId + '"';
                        const retData = {
                            formName: 'OCDLEGLS',
                            id: this.dataId ? this.dataId : 0,
                            searchString: aff_form_identifiers
                        }
                        this.OcdparorFactory.loadData(retData).subscribe((data: any) => {
                            custGridData.sort((o1: any, o2: any) => this.dateComparator(o1.commenceDate, o2.commenceDate));
                            custGridData.forEach(ord => {
                                if (ord.commenceDate && DateFormat.getDate(ord.commenceDate) + '' != 'Invalid Date') {
                                    ord.commenceDate = DateFormat.format(DateFormat.getDate(ord?.commenceDate));
                                }
                                if (data && data.formInfoJson) {
                                    if (JSON.parse(data.formInfoJson).hasOwnProperty('sentenceDates')) {
                                        sentenceDates = JSON.parse(data.formInfoJson).sentenceDates;
                                    }
                                    const keyDate = sentenceDates.filter(obj => obj.displayNo == ord.displayNo);
                                    if (keyDate && keyDate.length) {
                                        if (keyDate[0]['sentenceOrderDates'] && keyDate[0]['sentenceOrderDates'].length) {
                                            keyDate[0]['sentenceOrderDates'].forEach(sentKey => {
                                                if (sentKey['dateType'] && !sentKey.indefinite) {
                                                    if (sentKey['effectiveValue']) {
                                                        ord[sentKey['dateType']] = DateFormat.format(DateFormat.getDate(sentKey['effectiveValue']));
                                                    }
                                                } else {
                                                    ord[sentKey['dateType']] = this.INDEFINITE;
                                                }
                                            });
                                        }
                                    }
                                } 
                            });
                            var activeCustOrdersTemp = [];
                            activeCustOrdersTemp = JSON.parse(JSON.stringify(this.activeCustOrders));
                            activeCustOrdersTemp.forEach((ord, index) => {
                                this.myJsonRowData.forEach(parOrd => {
                                    if (parOrd.affectedOrders && parOrd.affectedOrders !== '' && parOrd.displayNo !== 'P_1' && parOrd.activeType === 'A') {
                                        parOrd.affectedOrders.forEach(affOrd => {
                                            if (ord.displayNo === affOrd) {
                                                delete activeCustOrdersTemp[index];
                                            }
                                        });
                                    } else {
                                        if (parOrd.affectedOrders && parOrd.affectedOrders !== ''  && parOrd.displayNo === 'P_1') {
                                            parOrd.affectedOrders.forEach(affOrd => {
                                                if (ord.displayNo === affOrd) {
                                                    ord.select = true;
                                                }
                                            });
                                        }
                                    }
                                });
                            });
                            this.affectedOrdRowData = activeCustOrdersTemp.filter(actObj => actObj['activeType'] == 'A' || actObj.select == true);
                        });  
                    } else {
                        this.affectedOrdRowData = [];
                    }
                });
            } else {
                this.dataId = 0;
                this.myJsonRowData = [];
                this.affectedOrdRowData = [];
                this.currentocdparorgridData = [];
                this.initialocdparorgridData = [];
                this.refreshDisabled = true;
            }
            this.deleteOrderList =[];
        })
    }

    onOffenderChange(offender) {
        this.isConditionGridVisible = false;
        this.conditionRowData = [];
        this.vHeaderBlockModel = offender;
        this.dataId = 0;
        this.chargesDataId = 0;
        if (offender) {
            this.enableInsertParoleOrders = true;
            this.loadJsonData();
        } else {
            this.enableInsertParoleOrders = false;
            this.myJsonRowData = [];
            this.affectedOrdRowData = [];
            this.allConditionsData = [];
        }
    }

    getSentTermLovData() {
        this.OcdparorFactory.loadSentTerm(this.sessionManager.getId(),'OCDPAROR').subscribe(data => {
            this.sentTermLovData = data;
        });
    }

    // this fn is for set Image For RelatedToLaunch AND lengthBtn
    setLaunchImage(data) {
        data.intParties = "assets/images/legal-launch-btn-icon.png";
        // data.lengthBtn = "assets/images/legal-launch-btn-icon.png";
        return data;
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    onSave(event) {
        let isOcdlegoChanged = this.OcdparorFactory.isGridDataModified(this.initialocdparorgridData, this.myJsonRowData);
        if (!isOcdlegoChanged) { 
            this.message = this.translateService.translate('ocdleglo.nodatamodified');
            this.type = 'warn';
            this.show();
            return false;
        }
        else if (!this.isCustodialOrderDataValid()) {
            return false;
        }
        else {
            this.calculateReason();
        }
    }

    onSaveApiCall(calculationResult?) {
        var form_identifiers = {};
        if(this.revokeFlag){
            let updateStatusList = [];
            let unSelectedList = [];
            let selectedOrders = [];
            let unSelectedOrders =[];
                this.myJsonRowData.forEach(updEle => {
                    this.initialocdparorgridData.forEach(ele => {
                        let pushedFlag  = false;
                        if (ele.displayNo == updEle.displayNo) {
                            if( ele.status !== updEle.status && (updEle.status == 'REV' || updEle.status == 'ACT')){
                                updateStatusList.push(updEle);
                                pushedFlag = true;
                            }
                            if (JSON.stringify(ele.affectedOrders) != JSON.stringify(updEle.affectedOrders) && updEle.status == 'ACT') {
                                let unsel = ele && ele.affectedOrders ? ele.affectedOrders.filter(i => !updEle.affectedOrders.includes(i)) : undefined;
                                let sel = updEle && updEle.affectedOrders ? updEle.affectedOrders.filter(i => !ele.affectedOrders.includes(i)) : undefined;
                                unSelectedList.push(...unsel);
                                if (!pushedFlag && sel.length>0) {
                                    selectedOrders.push(...sel);
                                }
                            }
                        }
                    });
                    let insertedOrder = this.initialocdparorgridData.filter(inital => updEle.displayNo == inital.displayNo);
                    if (insertedOrder.length == 0 && updEle.status == 'ACT') {
                        updateStatusList.push(updEle);
                    }
                });
            unSelectedList = unSelectedList.filter(i => !selectedOrders.includes(i));
            unSelectedOrders = this.activeCustOrders.filter( i => unSelectedList.includes(i.displayNo))
            unSelectedOrders?.forEach(e => {
                e.lrd = DateFormat.getDate(DateFormat.parse(e.lrd));
                e.commenceDate = DateFormat.getDate(DateFormat.parse(e.commenceDate)); 
            });
            var custFormIdentifier = {};
            custFormIdentifier['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
            custFormIdentifier['orderType'] = 'CUST';
            const revokeOrderData = {
                updatedOrders:JSON.stringify(updateStatusList), //Order status update
                unselectedOrders: JSON.stringify(unSelectedOrders), //Affected Orders unselected
                selectedOrders: JSON.stringify(selectedOrders), //Affected Orders Selected
                formIdentifier:JSON.stringify(custFormIdentifier)
            }
            this.OcdparorFactory.revokeParOrder(revokeOrderData).subscribe(revokeOrder => {
               
            });
        }
        if (this.OcdparorFactory.isObject(calculationResult)) {
            this.previousCalculationReason.push(calculationResult)
        }
        let finalObj = {
            'myJsonRowData': this.preSaveCleanUp(this.myJsonRowData),
            'calcReason': this.previousCalculationReason
        };
        var submitData = finalObj;
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        form_identifiers['orderType'] = 'PAR';
        const submissionData = {
            formName: this.screenName,
            id: this.dataId ? this.dataId : 0,
            formInfoJson: JSON.stringify(submitData),
            formIdentifier: JSON.stringify(form_identifiers),
            moduleName : 'OCDPAROR',
            orderOperations:  JSON.stringify(this.ordersMapping),
            orderUpdateRecords : this.readStatus()
        }
        this.OcdparorFactory.saveData(submissionData).subscribe(data => {
            //submit success
            if (data) {
                if(this.deleteOrderList.length>0){
                    this.deleteInterestedParties();
                }
                /* this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.type = 'success';
                this.show(); */
                this.ocdparorgrid.btnClearbtnDisable = true;
                this.isSingleSaveBtnDisable = true;
                this.myJsonRowData = JSON.parse(JSON.stringify(this.myJsonRowData));
                this.selectedRow = 0;
                if (this.myJsonRowData && this.myJsonRowData[this.selectedRow] && this.myJsonRowData[this.selectedRow].charges) {
                    this.affectedOrdRowData = this.myJsonRowData[this.selectedRow].charges;
                } else {
                    this.affectedOrdRowData = [];
                }
               
                this.initialocdparorgridData = JSON.parse(JSON.stringify(this.myJsonRowData));
                setTimeout(() => {
                    this.loadJsonData();
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
                    this.message = this.translateService.translate('ocdparor.savedaspendingevent');
                    this.type = 'warn';
                    this.show();
                } 
            } else {
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.type = 'error';
                this.show();
            }
        });

    }
    
    preSaveCleanUp(myJsonRowData: any[]) {
        myJsonRowData.forEach(row => {
            Object.keys(row).forEach(key => {
                if (key.includes('___') || ["lengthBtn", "relatedToLaunch", "intParties", "activeType", "offenderBookId","iwpButton","recordId"].includes(key)){
                    delete row[key];
                }
            });
        });
        return myJsonRowData;
    }
    calculateReason() {
        this.dialogService.openLinkDialog('/OCUCALCR', this.vHeaderBlockModel, 80).subscribe(result => {
            if (result) {
                this.onSaveApiCall(result);
            }
        });
    }

    setExternalSaveButton() {
        if (this.OcdparorFactory.isGridDataModified(this.initialocdparorgridData, this.myJsonRowData) ||
            this.OcdparorFactory.isGridDataModified(this.initialaffectedOrdGridData, this.affectedOrdRowData)) {
            this.isSingleSaveBtnDisable = false;
        }
        else {
            this.isSingleSaveBtnDisable = true;
        }
    }

    onUpdatedMapsData(event, gridName?: string) {
        this.setExternalSaveButton();
        let index = -1;
        if(gridName == "paroleordersGrid") {
            index = this.currentocdparorgridData.findIndex(ord => ord.orderNo == event.updated.orderNo);
        }
        if (gridName == 'paroleordersGrid' && (this.currentocdparorgridData[index] && this.currentocdparorgridData[index].duration !== event.updated.duration)) {
            this.currentocdparorgridData[index] = JSON.parse(JSON.stringify(event.updated));
            this.resetRowForDuration(event.updated, index)
        }
        if(gridName == 'affectedordersGrid') {
            const affOrd = []
            this.revokeFlag = true;
            if (gridName == "affectedordersGrid") {
                this.affectedOrdRowData.forEach(ord => {
                    if(ord.select == true) {
                        affOrd.push(ord.displayNo)
                    }
                });
                const node = this.ocdparorgrid.gridOptions.api.getSelectedNodes().length && this.ocdparorgrid.gridOptions.api.getSelectedNodes()[0];
                if (node) {
                    node.setDataValue('affectedOrders', JSON.parse(JSON.stringify(affOrd)));
                }
            }
        }
    }

    onclearedData(event, gridName?: string) {
        this.setExternalSaveButton();
        if (gridName == "paroleordersGrid") {
            this.affectedOrdRowData = [];
            this.ordersMapping = [];
            if (this.myJsonRowData.length > 0) {
                this.selectedRow = 0;
                // this.enableInsertInCharges = true;
                this.currentocdparorgridData = JSON.parse(JSON.stringify(this.myJsonRowData));
                this.ocdparorgrid.gridOptions.api.getRowNode('0').setSelected(true);
                this.deleteOrderList =[];
            } else {
                this.currentocdparorgridData = [];
            }
        }
    }

    onMapsData(event, gridName?: string) {
        this.setExternalSaveButton();
        const affOrd = []
        if (gridName == "affectedordersGrid") {
        }
        else if (gridName == "paroleordersGrid") {
            this.currentocdparorgridData.push(JSON.parse(JSON.stringify(event.added)));
            this.ocdparorgrid.requiredOn('expiryDate');
        }
    }

    openProcess(evt, processName) {
        this.selectedTab = processName;
        // Declare all variables
        var i, tabcontent, tablinks;
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("active", "");
        }

        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById(processName).style.display = "block";
        evt.currentTarget.className += " active";
        return false;
    }

    startTab() {
        this.tabMapping.forEach((k, v) => {
            if (k == this.selectedTab) {
                document.getElementById(v).click();
                document.getElementById(k).style.display = "block";
            } else {
                document.getElementById(k).style.display = "none";
            }

        });
    }

    onRowClicked(event) {
        if (event && event.duration === 'Fixed Expiry') {
            this.ocdparorgrid.requiredOn('expiryDate');
        } else {
            this.ocdparorgrid.requiredOff('expiryDate');
        }
        this.selectedRow = event;
        this.eoffenderService.selectedRowData=null;
        var activeCustOrdersTemp = [];
        activeCustOrdersTemp = JSON.parse(JSON.stringify(this.activeCustOrders));
        activeCustOrdersTemp.forEach((ord, index) => {
            if(this.selectedRow?.affectedOrders && this.selectedRow.affectedOrders.includes(ord.displayNo)){
                ord.select = true;
            }
            this.myJsonRowData.forEach(parOrd => {
                if(parOrd.affectedOrders && parOrd.affectedOrders !== '' && parOrd.displayNo !== event?.displayNo && parOrd.activeType === 'A') {
                    parOrd.affectedOrders.forEach(affOrd => {
                        if(ord.displayNo === affOrd && !ord.select) {
                            delete activeCustOrdersTemp[index];
                        }
                    });
                } 
            });
        });
        this.affectedOrdRowData = activeCustOrdersTemp.filter(actObj => actObj['activeType'] == 'A' || actObj.select == true);
        if (event) {
            this.condiLegalText = '';
            this.getCondOfOrder(this.allConditionsData,this.selectedRow.orderNo);
        } else {
            this.affectedOrdRowData = [];
        }
        if (event && this.isCustodialSavedData(event.orderNo)) {
            this.isConditionGridVisible = true;
            this.eoffenderService.selectedRowData=event;
            this.eoffenderService.selectedRowData['offenderBookId'] = this.vHeaderBlockModel.offenderBookId;
            this.eoffenderService.selectedRowData['recordId'] = event.orderNo + '';
        } else {
            this.isConditionGridVisible = false;
            this.eoffenderService.selectedRowData=null;
        }
    }

    onRowClickedCondition(event) {
        if (event && event.longCommentText) {
            this.condiLegalText = event.longCommentText;
        }
        else {
            this.condiLegalText = '';
        }
    }

    onOcdparorGridInsert = () => {
        this.loadaffectedOrdData();
        let highestIndex = 1;
        if (!this.isCustodialOrderDataValid()) {
            return;
        }
        if (this.myJsonRowData.length > 0) {
            highestIndex = this.getHighestIndex() + 1;
        }
        let addData = {
            displayNo: 'P_' + highestIndex,
            orderNo: highestIndex,
            lengthBtn: "assets/images/legal-launch-btn-icon.png",
            orderType: 'PAR',
            commenceType: 'DTC',
            duration: 'Fixed Expiry',
            status: AppConstants.ACTIVE,
            activeType: 'A',
            terms: [{
                days: "",
                fixedExpiry : true,
                indefinite : false,
                months: "",
                weeks : "",
                years :  ""}]
        };
        this.revokeFlag = true;
        this.OcdparorFactory.readOrderAction(addData,'I',this.ordersMapping);
        return addData;
    }

    getHighestIndex() {
        let maxIndex = 1;
        for (let i = 0; i < this.myJsonRowData.length; i++) {
            if (this.myJsonRowData[i].orderNo > maxIndex) {
                maxIndex = parseInt(this.myJsonRowData[i].orderNo);
            }
        }
        return maxIndex;
    }

    isCustodialOrderDataValid() {
        for (let i = 0; i < this.myJsonRowData.length; i++) {
            let rowIndex = i + 1;
            let eachRowData = this.myJsonRowData[i];
            if (Object.keys(eachRowData).length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdleglo.pleaseselectdata');
                this.show();
                return false
            }
            for (let f = 0; f < this.myColDefs.length; f++) {
                let key = this.myColDefs[f].field;
                let value = eachRowData[key] ? eachRowData[key] : '';
                let config = this.getColumnConfig(key);
                if (config.required && config.required == true && (value == undefined || value == '')) {
                    // required field validation here
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%', this.OcdparorFactory.getDisplayedKey(key));
                    this.show();
                    return false
                }
                if (key === "expiryDate" && eachRowData.duration === 'Fixed Expiry' && (value === '' || value === undefined)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdleglo.pleaseselectthefield').replace('%fieldname%', this.OcdparorFactory.getDisplayedKey(key));
                    this.show();
                    return false
                }
                if (key === "terms") {
                    if (!eachRowData.terms[0] || !eachRowData.terms[0].termType) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdparor.pleaseselecttermtype');
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
                if (!this.validValueValidation(key, value, config, rowIndex)) {
                    return false;
                }
            }
            const initialOrder = this.initialocdparorgridData.filter(ele => ele.displayNo == this.myJsonRowData[i].displayNo);
            const updStatus = this.orderStatusData.filter(ele => ele.updateReasonCode == this.myJsonRowData[i].status);
            if (initialOrder && initialOrder.length > 0 && updStatus && updStatus.length > 0) {
                if ((initialOrder[0].activeType === 'A' || !initialOrder[0].activeType) && (updStatus[0].activeType == 'I' || updStatus[0].activeType == 'E')) {
                    let activeConditions = this.allConditionsData.length > 0 ? this.allConditionsData.filter(ele => ele.activeType == 'A'  && initialOrder[0].orderNo == ele.sentenceSeq) : [];
                    if (activeConditions.length > 0) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdparor.pleasedeactivateconditionfirst');
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

    validValueValidation(key, value, config, rowIndex) {
        let newDateValue;
        let rowData = this.myJsonRowData[rowIndex - 1];
        if (config.datatype == 'date' || key == "expiryDate") {
            if (value && value !== '' && typeof value == "string") {
                newDateValue = value.split('T')[0];
            }
            else if (value != null && typeof value == 'object') {
                newDateValue = this.getFormatedDate(value)
            }
        }
        console.log(DateFormat.getDate(newDateValue));
        console.log(DateFormat.getDate());
        if (key == 'hearingDate' && newDateValue != undefined && newDateValue != '' && DateFormat.compareDate(DateFormat.getDate(newDateValue), DateFormat.getDate())  === 1 ) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdleglo.grtthancurrdata').replace('%fieldname%', this.OcdparorFactory.getDisplayedKey(key));
            this.show();
            return false
        }
        else if (key == 'expiryDate' && newDateValue !== '' && newDateValue !== undefined) {
            let commenceDateValue;
            if (rowData.commenceDate && rowData.commenceDate !== '' && typeof rowData.commenceDate == "string") {
                commenceDateValue = rowData.commenceDate.split('T')[0];
            }
            else if (rowData.commenceDate != null && typeof rowData.commenceDate == 'object') {
                commenceDateValue = this.getFormatedDate(rowData.commenceDate)
            }
            if (newDateValue < commenceDateValue) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdleglo.laterthancommencedate').replace('%fieldname%', this.OcdparorFactory.getDisplayedKey(key));
                this.show();
                return false
            }
        } else if (key === 'affectedOrders' && value.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdparor.selectaffectedorders');
            this.show();
            return false
        }
        return true;
    }

    getFormatedDate(day) {
        var dd = String(day.getDate()).padStart(2, '0');
        var mm = String(day.getMonth() + 1).padStart(2, '0');
        var yyyy = day.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    getConditionColDef() {
        this.conditionColdef = [
            {
                fieldName: this.translateService.translate('ocdleglo.conditionCategory'), required: false,
                field: 'categoryType', editable: false, width: 150, datatype: 'lov', domain: 'COM_CON_CAT'
            },
            {
                fieldName: this.translateService.translate('ocdleglo.description'), required: false,
                field: 'requirement', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocdleglo.length'), required: false,
                field: 'unitLength', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocdleglo.unit'), hide: true,
                field: 'lengthUnit', editable: false, width: 150, datatype: 'lov', domain: 'COND_UNIT'
                , titles: {
                    code: this.translateService.translate('ocmcondi.lovUnitType'),
                    description: this.translateService.translate('ocmcondi.lovDescription')
                }
            },
            {
                fieldName: this.translateService.translate('ocdleglo.startDate'), required: false,
                field: 'startDate', editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocdleglo.endDate'), required: false,
                field: 'expiryDate', editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocdleglo.programreferral'),
                field: 'program', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: '',
                field: 'programMethod', editable: false, width: 150, datatype: 'text', hide: true
            },
            {
                fieldName: this.translateService.translate('ocdleglo.status'), required: false, source: 'OCMSTATS',
                field: 'conditionStatus', editable: false, width: 150, datatype: 'lov', link: 'ocmpconf/rgOrderStatus?orderType=COND'
            },
            {
                fieldName: this.translateService.translate('ocdparor.staff'), required: false,
                field: 'assignedOfficer', editable: false, width: 150,
            },
                    {
                fieldName: this.translateService.translate('ocdleglo.legalTextofCondition'),
                field: 'longCommentText', editable: false, width: 150, datatype: 'text',
                hide: true, externalColumn: true
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
            commConditionType: 'PAR',
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
        const initialRowData = this.initialocdparorgridData.filter(i => i.displayNo === this.selectedRow.displayNo);
        const orderEndDate = initialRowData[0]['expiryDate'];
        let obj = {
            selectedOffender: this.vHeaderBlockModel,
            data: this.conditionRowData,
            selectedOrder: initialRowData[0],
            orderType: 'PAR',
            orderStatus: this.orderStatusData,
            orderEndDate: orderEndDate
        };

        this.dialogService.openLinkDialog('/OCUCONDIDLG', obj, 80).subscribe(result => {
            this.getConditions();
        });
    }
    updateCondition = () => {
        const initialRowData = this.initialocdparorgridData.filter(i => i.displayNo === this.selectedRow.displayNo);
        const orderEndDate = initialRowData[0]['expiryDate'];
        let obj = {
            selectedOffender: this.vHeaderBlockModel,
            data: this.conditionRowData,
            orderNo: initialRowData[0],
            orderType: 'PAR',
            orderStatus: this.orderStatusData,
            orderEndDate: orderEndDate
        };
        this.dialogService.openLinkDialog('OCUUCOND', obj, 80).subscribe(result => {
            this.getConditions();
        });
    }
    deleteCondition = () => {
        const initialRowData = this.initialocdparorgridData.filter(i => i.displayNo === this.selectedRow.displayNo);
        let obj = {
            selectedOffender: this.vHeaderBlockModel,
            data: this.conditionRowData,
            orderType: 'PAR',
            selectedOrder: initialRowData[0]
        };
        this.dialogService.openLinkDialog('OCUDCOND', obj, 80).subscribe(result => {
            this.getConditions();
        });
    }
    getCondCategory() {
        this.service.getCondCategory(this.sessionManager.getId(),'OCDPAROR').subscribe(data => {
            if (data) {
                this.condCategory = data
                this.conditionRowData.forEach(obj => {
                    if (obj["programMethod"] != 'ACP') {
                        const fiteredCat = this.condCategory.filter(obj => obj.code == obj["programMethod"]);
                        if (fiteredCat && fiteredCat.length > 0) {
                            obj['program'] = fiteredCat[0].description;
                        }
                    }
                });
            }
        });
    }

    loadaffectedOrdData() {
        this.activeCustOrders = [];
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        form_identifiers['orderType'] = 'CUST';
        const retData = {
            formName: 'OCDLEGLO',
            id: this.dataId ? this.dataId : 0,
            searchString: JSON.stringify(form_identifiers)
        }
        this.OcdparorFactory.loadData(retData).subscribe((data: any) => {
            if (data && data.formInfoJson) {
                const custGridData = JSON.parse(data.formInfoJson).myJsonRowData;
                custGridData.forEach(element => {
                    // Rules for Affected Orders in S4-24406
                    const existingValues = this.sentTypeList.filter(obj =>  element.sentenceCalcType == obj.code && ('IMPS' != obj.sentType && 'CNCO' != obj.sentType));
                    if (existingValues.length == 0) {
                        const custOrderStatus = this.orderStatusData.filter(obj => obj.updateReasonCode == element.status);
                        element['activeType'] = custOrderStatus[0].activeType
                        this.activeCustOrders.push(element);
                    } 
                });
                let sentenceDates = [];
                let form_identifiers = '"offenderBookId":"' + this.vHeaderBlockModel.offenderBookId + '"';
                const retData = {
                    formName: 'OCDLEGLS',
                    id: this.dataId ? this.dataId : 0,
                    searchString: form_identifiers
                }
                this.OcdparorFactory.loadData(retData).subscribe((data: any) => {
                    custGridData.sort((o1: any, o2: any) => this.dateComparator(o1.commenceDate, o2.commenceDate));
                    custGridData.forEach(ord => {
                        if (ord.commenceDate && DateFormat.getDate(ord.commenceDate) + '' != 'Invalid Date') {
                            ord.commenceDate = DateFormat.format(DateFormat.getDate(ord?.commenceDate));
                        }
                        if (data && data.formInfoJson) {
                            if (JSON.parse(data.formInfoJson).hasOwnProperty('sentenceDates')) {
                                sentenceDates = JSON.parse(data.formInfoJson).sentenceDates;
                            }
                            const keyDate = sentenceDates.filter(obj => obj.displayNo == ord.displayNo);
                            if (keyDate && keyDate.length) {
                                if (keyDate[0]['sentenceOrderDates'] && keyDate[0]['sentenceOrderDates'].length) {
                                    keyDate[0]['sentenceOrderDates'].forEach(sentKey => {
                                        if (sentKey['dateType'] && !sentKey.indefinite) {
                                            if (sentKey['effectiveValue']) {
                                            ord[sentKey['dateType']] = DateFormat.format(DateFormat.getDate(sentKey['effectiveValue']));
                                            }
                                        } else {
                                            ord[sentKey['dateType']] = this.INDEFINITE;
                                        }
                                    });
                                }
                            }
                        }
                    });
                    var activeCustOrdersTemp = [];
                    activeCustOrdersTemp = JSON.parse(JSON.stringify(this.activeCustOrders));
                    activeCustOrdersTemp.forEach((ord, index) => {
                        this.myJsonRowData.forEach(parOrd => {
                            if (parOrd.affectedOrders && parOrd.affectedOrders !== '' && parOrd.activeType === 'A') {
                                parOrd.affectedOrders.forEach(affOrd => {
                                    if (ord.displayNo === affOrd) {
                                        delete activeCustOrdersTemp[index];
                                    }
                                });
                            }
                        });
                    });
                    this.affectedOrdRowData = activeCustOrdersTemp.filter(actObj => actObj['activeType'] == 'A' || actObj.select == true);
                });
            } else {
                this.affectedOrdRowData = []; 
            }
        })
    }

    dateComparator = (date1, date2) => {
        if (!date1 && !date2) {
            return 0;
        }
        if (!date1) {
            return -1;
        }
        if (!date2) {
            return 1;
        }
        if (DateFormat.getDate(date1) + '' == 'Invalid Date') {
            return 1;
        }
        if (DateFormat.getDate(date2) + '' == 'Invalid Date') {
            return -1;
        }
        if (!(date1 instanceof Date)) {
            date1 = DateFormat.getDate(date1);
        }
        if (!(date2 instanceof Date)) {
            date2 = DateFormat.getDate(date2);
        }
        return DateFormat.compareDate(date1, date2);
    }

    validateParoleData = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event.field != 'status') {
            if (event.field === 'sentenceCalcType' && event.newValue !== event.oldValue) {
                if (event.newValue) {
                    let searchBean = {
                        'sentenceCalcType': event.newValue,
                        'sentenceCategory': 'PAR'
                    }
                    this.OcdparorFactory.populateTermType(searchBean).subscribe(data => {
                        if (data && data.length) {
                            this.paroleTermTypeList = data;
                            let activeTerms = this.paroleTermTypeList.filter(i => i.activeFlag == 'Y');
                            if (activeTerms && activeTerms.length == 1) {
                                event.data.terms.forEach(ele => {
                                    ele['termType'] = activeTerms[0].activeFlag && activeTerms[0].activeFlag == 'Y' ? activeTerms[0].termCode : null;
                                });
                            } else {
                                event.data.terms.forEach(ele => {
                                    ele['termType'] = null;
                                });
                            }
                        }
                    });
                    
                } else {
                    this.paroleTermTypeList = [];
                }
            }
            if (event.field == 'commenceDate') {
                const intialOrder = this.initialocdparorgridData.findIndex(i => i.displayNo == event.data.displayNo);
                if (intialOrder == -1) {
                    if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) == 1) {
                        this.ocdparorgrid.setColumnData('status', event.rowIndex, 'PEND');
                    } else if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) != 1) {
                        this.ocdparorgrid.setColumnData('status', event.rowIndex, 'ACT');
                    } else if (event.data.expiryDate && DateFormat.compareDate(event.newValue, DateFormat.getDate()) != 1 && DateFormat.compareDate(DateFormat.getDate(event.data.expiryDate), DateFormat.getDate()) != 1) {
                        this.ocdparorgrid.setColumnData('status', event.rowIndex, 'EXP');
                    }
                }
            }
            if (event.field == 'expiryDate') {
                const intialOrder = this.initialocdparorgridData.findIndex(i => i.displayNo == event.data.displayNo);
                if (intialOrder == -1) {
                    if (event.data.commenceDate && DateFormat.compareDate(DateFormat.getDate(event.data.commenceDate), DateFormat.getDate()) == 1) {
                        this.ocdparorgrid.setColumnData('status', event.rowIndex, 'PEND');
                    } else if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) != -1) {
                        this.ocdparorgrid.setColumnData('status', event.rowIndex, 'ACT');
                    } else if (DateFormat.compareDate(event.newValue, DateFormat.getDate()) == -1) {
                        this.ocdparorgrid.setColumnData('status', event.rowIndex, 'EXP');
                    }
                }
            }
            if (event.field == 'duration' && !event.data.expiryDate) {
                const intialOrder = this.initialocdparorgridData.findIndex(i => i.displayNo == event.data.displayNo);
                if (intialOrder == -1) {
                    if (event.data.commenceDate && DateFormat.compareDate(DateFormat.getDate(event.data.commenceDate), DateFormat.getDate()) == 1) {
                        this.ocdparorgrid.setColumnData('status', event.rowIndex, 'PEND');
                    } else {
                        this.ocdparorgrid.setColumnData('status', event.rowIndex, 'ACT');
                    }
                }
            }
        } else {
            const selectedOrder = this.initialocdparorgridData.filter(i => i.displayNo == event.data.displayNo);
            const initialStatus = selectedOrder[0]?selectedOrder[0].activeType:'A';
            const updStatus = this.orderStatusData.filter(i => i.updateReasonCode == event.data.status);
            if (updStatus[0].activeType == 'A') {
                for(let i = 0; i < this.myJsonRowData.length; i++){
                    let commonOrders = event.data.affectedOrders.filter(element => this.myJsonRowData[i].affectedOrders.includes(element));
                    if(updStatus[0].activeType == 'A' && this.myJsonRowData[i].displayNo != event.data.displayNo && commonOrders?.length != 0 && this.myJsonRowData[i].activeType == 'A'){
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdparor.thisorderhasactiveaffectedorders');
                        this.show();
                        this.ocdparorgrid.setColumnData('status', event.rowIndex, undefined);
                        rowdata.validated = true;
                        return rowdata;   
                    }
                }
            }
            if (initialStatus == 'A' || initialStatus == 'I') {
                this.ocdparorgrid.setColumnData('activeType', event.rowIndex, updStatus[0].activeType);
                if(initialStatus == 'A'){
                    this.orderStatusRecord.push(event.data);
                }
            }
            if(event.data.status == 'REV' || event.data.status == 'ACT'){
                this.revokeFlag = true;
            }
        }
        if(['status','commenceType','commenceDate','duration','expiryDate'].includes(event.field)){
            this.OcdparorFactory.readOrderAction(event,'U',this.ordersMapping);
        }
        rowdata.validated = true;
        return rowdata;
    }
    getOrderStatus() {
        this.OcdparorFactory.rgOrderStatus().subscribe(data => {
            if (data) {
                this.orderStatusData = data;
            }
        });
    }
    getCondOfOrder(conditionList, orderNo) {
        this.conditionRowData = conditionList.filter(i => i.sentenceSeq === orderNo);
            this.selectedRowofConditionGrid = 0;
            for (let i = 0; i < this.conditionRowData.length; i++) {
                let activeType = this.orderStatusData.filter(ele => ele.updateReasonCode == this.conditionRowData[i].conditionStatus);
                this.conditionRowData[i]['activeType'] = activeType[0] ? activeType[0].activeType : '';
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
    getStaffRoleDetails() {
        this.OcdparorFactory.getDeleteFlag('DEL_PAR').subscribe(data => {
            if (data && data == 'Y') {
                this.deleteOrderFlag = true;
            }
        });
    }
    onOrderDelete = (row) => {
        if (row) {
            if (this.conditionRowData.length > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdparor.cannotdeleteorderhasconditions')
                this.show();
                return false;
            }
        }
        if(!this.isCustodialSavedData(row[0].orderNo)){
            this.OcdparorFactory.readOrderAction(row[0],'D',this.ordersMapping);
            return true;
        }
        let dependencyObj = {'formName' : this.screenId, 'offenderBookId': this.vHeaderBlockModel.offenderBookId,'displayNo':row[0].orderNo}
        this.OcdparorFactory.checkOrderDependency(dependencyObj).subscribe( dep => {
            if(dep){
                this.type = 'warn';
                this.message = this.translateService.translate('ocdparor.cannotdeleteorderhasattacheddoc')
                this.show();
                return false;
            } else {
                this.ocdparorgrid.gridOptions.api.applyTransaction({ remove: row });
                const index = this.myJsonRowData.indexOf(row[0]);
                this.myJsonRowData.splice(index, 1);
                this.ocdparorgrid.btnClearbtnDisable = false;
                if (this.myJsonRowData.length == 0) {
                    this.affectedOrdRowData = [];
                }
                this.deleteOrderList.push(row[0]);
                this.isSingleSaveBtnDisable = false;
                this.OcdparorFactory.readOrderAction(row[0],'D',this.ordersMapping);
            }
        });
        return false;
    }
    deleteInterestedParties() {
        let inputData = {};
        inputData['recordType'] = 'PAR';
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

    readStatus = () => {
        let updatedResult = [];
        this.orderStatusRecord.forEach( ele => {
            this.initialocdparorgridData.forEach(ini => {
                if(ini.orderNo == ele.orderNo &&  ini.activeType =='A' && ele.activeType !='A' && this.deleteOrderList?.filter(i => i == ele.orderNo).length==0){
                    let event = {
                        orderType : 'PAR',
                        orderNo : ele.displayNo,
                        affectedOrders : ele.affectedOrders
                    }
                    if(updatedResult.filter(i => i.orderNo == event.orderNo).length == 0){
                        updatedResult.push(event);
                    }
                }
            });
        });
        return JSON.stringify(updatedResult);
    }
    onBackBtnClick = () => {
        this.location.back();
      }
      ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
    }

   getERDHideShowValue() {
    this.OcdparorFactory.getERDHideShowValue("DERD").subscribe(data => {
        if (data === 'YES') {
            this.hideErd = false;
        } else {
            this.hideErd = true;
        }
        const erdColumnIndex = this.affectedOrdColdef.findIndex(column => column.field === 'erd');
        if (erdColumnIndex !== -1) {
            this.affectedOrdColdef[erdColumnIndex]['hide'] = this.hideErd;
        }
        this.resetGrid = false;
        setTimeout(() => {
            this.resetGrid = true;
        }, 0);
    });
}  
    
   
}
