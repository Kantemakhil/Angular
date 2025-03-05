import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/dynamic-alpine-grid/dynamic-alpine-grid.component';
import { OcdchgsuService } from '../service/ocdchgsu.service';
import { OcdlegloService } from '../service/ocdleglo.service';
import { OcucalcrService } from '../service/ocucalcr.service';

@Component({
    selector: 'app-ocuchgou',
    templateUrl: './ocuchgou.component.html',
    styleUrls: ['./ocuchgou.component.css']
})
export class OcuchgouComponent implements OnInit {

    @ViewChild('ocuchgougrid', { static: true }) ocuchgougrid: any;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    message = ' Invalid.';
    msglist = [];
    type = 'error';
    msgs: any[];
    screenName = 'ocuchgou';
    offenderBookId: any;
    ocuchgouColDef: any;
    selectedRow = 0;
    ocuchgouRowData= [];
    dataId = 0;
    chargeHistInitData = {};
    staffName = '';
    outcomeData = [];
    sentTypeList = [];
    dataUpdated = false;
    offenderAllOrders =[];
    constructor(private OcdchgsuFactory: OcdchgsuService, public translateService: TranslateService, 
        public loginService: LoginService, private OcucalcrFactory : OcucalcrService, private OcdlegloFactory: OcdlegloService) {
            this.loadSentenceTypes();
    }

    ngOnInit(): void {
        this.getOffenderOrders();
        this.loadColDefData();
        this.OcucalcrFactory.getCurrentUserId().subscribe(staffName => {
            this.staffName = staffName;
        });
    }
    loadSentenceTypes() {
        const SentTypeData = this.OcdlegloFactory.populateCatSentType('CUST_NCUS_BAIL');
        SentTypeData.subscribe(data => {
            if (data && data.length > 0) {
                this.sentTypeList = data;
                if(this.ocuchgouRowData && this.ocuchgouRowData.length) {
                    this.formatDisplayData(this.ocuchgouRowData);
                }
            } 
        });
    }
    loadColDefData() {
        const data = this.loginService.mainColDefData;
        let datatypeData = [];
        data.forEach(gridDef => {
            if (gridDef.grid_name == 'chargeOutcome' && gridDef.module_name == 'OCUCHGOU') {
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
        const colDefs = [];
        datatypeData.forEach(type => {
            if (type.dataType === 'lov' && type.source === 'link') {
                colDefs.push({ fieldName: this.translateService.translate(type.fieldName), datatype: type.dataType, source: type.sourceType, link: type.url, field: type.field, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, cellEditable: this.editGrid, parentFields: type.parentFields })
            }
            else if (type.dataType === 'lov' && type.source === 'domain') {
                colDefs.push({ fieldName: this.translateService.translate(type.fieldName), datatype: type.dataType, domain: type.url, field: type.field, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, cellEditable: this.editGrid })
            }
            else if (type.dataType === 'text') {
                colDefs.push({ fieldName: this.translateService.translate(type.fieldName), datatype: type.dataType, wrapText: true, hide: type.hide, field: type.field, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, cellEditable: this.editGrid })
            }
            else if (type.dataType === 'date') {
                colDefs.push({
                    datatype: type.dataType,
                    fieldName: this.translateService.translate(type.fieldName),
                    field: type.field, required: type.required,
                    editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true,
                    width: 150,
                    hide: type.hide,
                    cellEditable: this.editGrid,
                })
            }
            else if (type.dataType === 'checkbox') {
                colDefs.push({ fieldName: this.translateService.translate(type.fieldName), datatype: type.dataType, field: type.field, editable: true, required: type.required })
            }
        })
        this.ocuchgouColDef = [];
        colDefs.forEach(key => this.ocuchgouColDef.push(key));
    }
    editGrid = (data: any, index: number, field: string) => {
        if (data.savedToDb) return false;
        if (['DISPOSITION', 'STATUS', 'ORDEREDDATE', 'LINKEDTO', 'STAFFNAME','UPDATEDDATEDISPLAY'].includes(field.toUpperCase())) return false;
        return true;
    }
    loadJsonData() {
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId;
        const retData = {
            formName: this.screenName,
            id: this.dataId ? this.dataId : 0,
            searchString: JSON.stringify(form_identifiers)
        }
        this.OcdchgsuFactory.loadData(retData).subscribe((data: any) => {
            if (data && data.formInfoJson) {
                this.chargeHistInitData = this.OcdlegloFactory.transformArrToObj(JSON.parse(data.formInfoJson));
                const rowData = this.chargeHistInitData[+this.dialog.data.chargeId] || [];
                rowData.sort((c1:any,c2:any)=>this.dateComparator(c1.updatedDate,c2.updatedDate));
                rowData.forEach(chg => {
                    chg.savedToDb = true;
                    chg.updatedDateDisplay = DateFormat.formatDateTimefromUTC(chg.updatedDate);
                    let outcomeObj = this.outcomeData.filter(off=>off.code === chg.outcome)[0];
                    let linkedOrder = this.offenderAllOrders.filter(ord=> ord.orderType == chg.orderType && chg.orderNo == ord.orderNo)[0];
                    chg.type = linkedOrder?linkedOrder.type:undefined;
                    chg.orderedDate = linkedOrder?linkedOrder.orderedDate:undefined;
                    chg.disposition = outcomeObj?outcomeObj.disposition:undefined;
                    chg.status = outcomeObj?outcomeObj.chargeStatus:undefined;
                });
                const SentTypeData = this.OcdlegloFactory.populateCatSentType('CUST_NCUS_BAIL');
                SentTypeData.subscribe(data => {
                    if (data && data.length > 0) {
                        this.sentTypeList = data;
                    }
                    this.formatDisplayData(rowData);
                    this.ocuchgouRowData = this.clone(rowData);
                });
                this.dataId = data.id;
                this.selectedRow = 0;
            } else {
                this.ocuchgouRowData = [];
            }
        });
    }
    formatDisplayData(rowData: any) {
        rowData.forEach(row => {
            row['linkedTo'] = this.getOrderDisplayData(row["orderType"], row["orderNo"], row["sentenceCalcType"]);
            row['staffName'] = row["userId"]; //ocucalcr/getStaffMembers
            
        });
    }
    getOrderDisplayData(orderType, OrderNo, type){
        if(!OrderNo) { return ""; }
        let displayNo = "";
        if(orderType == "CUST") {
            displayNo = "C_" + OrderNo;
        } else if(orderType == "NCUS") { 
            displayNo = "NC_" + OrderNo;
        } else if(orderType == "BAIL") { 
            displayNo = "B_" + OrderNo;
        }
        if(this.offenderAllOrders){
            this.offenderAllOrders.forEach(ele => {
                if(ele.displayNo == displayNo){
                    type =  ele.sentenceCalcType;
                }
            });
        }
        displayNo = displayNo + ' - ' + this.sentTypeList.filter(obj=> obj.code == type)[0]?.description;
        return displayNo;

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
        return -DateFormat.compareDateTime(date1, date2);
      }
    saveChargeHist(evt) {
        this.deleteSysProps();
        this.chargeHistInitData[+this.dialog.data.chargeId] = this.clone(this.ocuchgouRowData);
        Object.keys(this.chargeHistInitData).forEach(chrgHty => {
            this.chargeHistInitData[chrgHty].forEach(chgId => {
                Object.keys(chgId).forEach(obj => {
                    if (obj.includes('___') || ["disposition", "sentenceType", "status", "staffName","linkedTo","type","orderedDate"].includes(obj)) {
                        delete chgId[obj];
                    }
                })
            });
        });
        let chargeData = this.OcdlegloFactory.transformObjToArr(this.chargeHistInitData);
        let form_identifiers = {};
        form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId + '';
        const chargesData = {
            formName : 'ocuchgou',
            id : this.dataId?this.dataId : 0,
            formInfoJson : JSON.stringify(chargeData),
            formIdentifier : JSON.stringify(form_identifiers)
        }
        this.OcdchgsuFactory.saveData(chargesData).subscribe(data => {
            this.setLatestOutcome(form_identifiers);
            this.dataUpdated = true;
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.type = 'success';
            this.show();
            this.loadJsonData();
        }); 
    }
    setLatestOutcome(form_identifiers) {
        this.OcdlegloFactory.setLatestOutcome(form_identifiers).subscribe(data=>{;});
    }
    deleteSysProps() {
        this.ocuchgouRowData.forEach(chg => {
            delete chg['savedToDb'];
            delete chg['updatedDateDisplay'];
        })
    }
    onButExitClick() {
        this.dialog.close(this.dataUpdated);

    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    
    clone(obj) { return JSON.parse(JSON.stringify(obj)) }

    onChargeGridInsert = () => {
    let addData = {
        updatedDate: DateFormat.getDate(),
        updatedDateDisplay: DateFormat.formatDateTimefromUTC(DateFormat.getDate()),
        userId: this.staffName,
        disposition:' ',
        status:' ',
        updateReason:' '
    };

    return addData;
    }
    validateChargesRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event && event.field === 'outcome') {
            const outcomeData = this.outcomeData.filter(off=>off.code === event.data.outcome)[0];
            // event.data['disposition'] = outcomeData.disposition;
            // event.data['status'] = outcomeData.chargeStatus;
            const node = this.ocuchgougrid.gridOptions.api.getSelectedNodes().length && this.ocuchgougrid.gridOptions.api.getSelectedNodes()[0];
            if (node) {
                node.setDataValue('disposition', outcomeData.disposition);
                node.setDataValue('status', outcomeData.chargeStatus);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    getOutcomes() {
        this.OcdchgsuFactory.getOutcomes().subscribe(data => {
            this.loadJsonData();
            this.outcomeData = data;
        });
    }

    getOffenderOrders() {
        const form_identifiers_hty = {};
        form_identifiers_hty['offenderBookId'] = this.dialog.data.offenderBookId + '';
        const searchBean = {
            formName: 'OCDLEGLO',
            id: this.dataId ? this.dataId : 0,
            searchString: JSON.stringify(form_identifiers_hty)
        }
        this.OcdchgsuFactory.getOffenderOrders(searchBean).subscribe(data => {
            if(data){
                data.forEach(ele => {
                    if(ele.formIdentifier && !ele.formIdentifier.toUpperCase().includes("PAR")){
                        let myJsonRowData = JSON.parse(ele.formInfoJson)?JSON.parse(ele.formInfoJson).myJsonRowData:[];
                        this.offenderAllOrders.push(...myJsonRowData);
                    }
                })
            }
            this.getOutcomes();
        })
    }
}
