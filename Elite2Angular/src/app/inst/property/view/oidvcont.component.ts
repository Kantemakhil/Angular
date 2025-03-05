import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OidvcontService } from '@inst/property/service/oidvcont.service';
import { OffenderPptyContainers } from '@instproperty/OffenderPptyContainers';
import { OffenderPptyConTxns } from '@instproperty/OffenderPptyConTxns';
import { OffenderPptyConTxnsCommitBean } from '@instproperty/OffenderPptyConTxnsCommitBean';
import { OffenderPptyItemTxns } from '@instproperty/OffenderPptyItemTxns';
import { OffenderPptyItemTxnsCommitBean } from '@instproperty/OffenderPptyItemTxnsCommitBean';
import { VPropertyHeaderBlock } from '@commonbeans/VPropertyHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OidmpconService } from '../service/oidmpcon.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oidvcont',
    templateUrl: './oidvcont.component.html',
    styleUrls: []
})

export class OidvcontComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offconData: OffenderPptyContainers[] = [];
    offconDataTemp: OffenderPptyContainers[] = [];
    offconModel: OffenderPptyContainers = new OffenderPptyContainers();
    selectedOffender: OffenderPptyContainers = new OffenderPptyContainers();
    offconIndex = -1;
    offconInsertList: OffenderPptyContainers[] = [];
    offconUpdatetList: OffenderPptyContainers[] = [];
    offconDeleteList: OffenderPptyContainers[] = [];
    contxData: OffenderPptyConTxns[] = [];
    contxDataTemp: OffenderPptyConTxns[] = [];
    contxModel: OffenderPptyConTxns = new OffenderPptyConTxns();
    selectionOffender: OffenderPptyConTxns = new OffenderPptyConTxns();
    contxIndex = -1;
    contxInsertList: OffenderPptyConTxns[] = [];
    contxUpdateList: OffenderPptyConTxns[] = [];
    contxDeleteList: OffenderPptyConTxns[] = [];
    contxCommitModel: OffenderPptyConTxnsCommitBean;
    itmtxData: OffenderPptyItemTxns[] = [];
    itmtxDataTemp: OffenderPptyItemTxns[] = [];
    itmtxModel: OffenderPptyItemTxns = new OffenderPptyItemTxns();
    itmtxIndex: number;
    itmtxInsertList: OffenderPptyItemTxns[] = [];
    itmtxUpdatetList: OffenderPptyItemTxns[] = [];
    itmtxDeleteList: OffenderPptyItemTxns[] = [];
    itmtxCommitModel: OffenderPptyItemTxnsCommitBean;
    vHeaderBlockModel: VPropertyHeaderBlock;
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    conTxColumnDef: any[];
    itemColumnDef: any[];
    itemEditColumnDef:any[];
    itemNotEditColumnDef:any[];
    offConColumnDef: any[];
    itmTxColumnDef: any[];
    offConReadOnly: boolean;
    conTxReadOnly: boolean;
    itmTxReadOnly: boolean;
    cgfkContxactioncodeRg: any[] = [];
    caseLoadId: any;
    showEdit:boolean=true;
    message = ' Invalid.';
    type = 'error';
    flag: any;
    propertyContainerTxnId: any;
    msglist = [];
    offConTxnsIndex = null;
    conitmIndex: any;
    veryfyInsert: boolean;
    rgAgyLocId: any[] = [];
    rgDescriptionCode: any[] = [];
    caseloadId: any;
    sealMarkTemp: any;
    sealMark: any;
    brokenSeal: boolean;
    enableConData: boolean;
    actionCodeOptions: any[] = [];
    propertyContainerId: any;
    offConIndexTemp: any;
    validateFlag: boolean;
    constructor(private oidvcontFactory: OidvcontService,
        private oidmpconFactory: OidmpconService,
        private offenderSearchService: OffenderSearchService,
        private sessionManager: UserSessionManager,
        public translateService: TranslateService,
        public dialogService: DialogService) {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.conTxColumnDef = [];
        this.offConColumnDef = [];
        this.itmTxColumnDef = [];
        this.contxCommitModel = new OffenderPptyConTxnsCommitBean();
        this.itmtxCommitModel = new OffenderPptyItemTxnsCommitBean();
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.itmtxIndex = 0;
        this.enableConData = true;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.offConColumnDef = [
            {
                fieldName: this.translateService.translate('oidvcont.type'), field: 'dspDescription', datatype: 'text',
                editable: false, width: 250
            },
            {
                fieldName: this.translateService.translate('oidvcont.location'), field: 'description', datatype: 'text',
                editable: false, width: 750
            },
        ];
        this.conTxColumnDef = [
            {
                fieldName: this.translateService.translate('oidvcont.datetime'), field: 'createDate', datatype: 'text',
                editable: false, width: 250
            },
            { fieldName: this.translateService.translate('oidvcont.sealmark'), field: 'sealMark', editable: false, width: 250 },
            {
                fieldName: this.translateService.translate('common.transaction'), field: 'actionCode',
                cellEditable: this.canOffConTxnsEdit,domain:'PPTY_VER',
                editable: true, width: 250, descTitle: 'Transaction',
                link: 'oidvcont/cgfkConTxActionCodeRecordGroup?propertyContainerId=' + this.propertyContainerId, datatype: 'lov'
            },
            {
                fieldName: this.translateService.translate('oidvcont.comment'), datatype:'text',field: 'commentText', cellEditable: this.canOffConTxnsEdit,
                editable: true, width: 250, maxlength: 240 ,uppercase: 'false'
            },
            { fieldName: this.translateService.translate('oidvcont.userid'), field: 'createUserId', editable: false, width: 250 },
        ];
        this.itemColumnDef=  [
             {
                 fieldName: this.translateService.translate('oidvcont.confirm'), field: 'verifyFlag' , datatype: 'checkbox',editable:true,
                 width: 250, maxlength: 240
             },
             { fieldName: this.translateService.translate('oidvcont.type'), field: 'propertyType', editable: false, width: 250, maxlength: 240 },
             {
                 fieldName: this.translateService.translate('oidvcont.description'), field: 'propertyDescription', editable: false, width: 250, maxlength: 240
             },
             { fieldName: this.translateService.translate('oidvcont.color'), field: 'color',  editable: false, width: 250, datatype: 'text', maxlength: 240 },
             { fieldName: this.translateService.translate('oidvcont.condition'), field: 'conditionCode', editable: false, width: 250, datatype: 'text', maxlength: 240 },
             { fieldName: this.translateService.translate('oidvcont.make'), field: 'make', editable: false, width: 250, datatype: 'text', maxlength: 240 },
             { fieldName: this.translateService.translate('oidvcont.serialnumber'), field: 'serialNo', editable: false, width: 250, datatype: 'text', maxlength: 240 },
             { fieldName: this.translateService.translate('oidvcont.quantity'), field: 'quantity', editable: false, width: 250, datatype: 'text', maxlength: 240 },
                             ];
        this.itemNotEditColumnDef= [
                    {
                        fieldName: this.translateService.translate('oidvcont.confirm'), field: 'verifyFlag' , datatype: 'checkbox',editable:false,
                        width: 250, maxlength: 240
                    },
                    { fieldName: this.translateService.translate('oidvcont.type'), field: 'propertyType', editable: false, width: 250, maxlength: 240 },
                    {
                        fieldName: this.translateService.translate('oidvcont.description'), field: 'propertyDescription', editable: false, width: 250, maxlength: 240
                    },
                    { fieldName: this.translateService.translate('oidvcont.color'), field: 'color',editable: false, width: 250, datatype: 'text', maxlength: 240 },
                    { fieldName: this.translateService.translate('oidvcont.condition'), field: 'conditionCode', editable: false, width: 250, datatype: 'text', maxlength: 240 },
                    { fieldName: this.translateService.translate('oidvcont.make'), field: 'make', editable: false, width: 250, datatype: 'text', maxlength: 240 },
                    { fieldName: this.translateService.translate('oidvcont.serialnumber'), field: 'serialNo', editable: false, width: 250, datatype: 'text', maxlength: 240 },
                    { fieldName: this.translateService.translate('oidvcont.quantity'), field: 'quantity', editable: false, width: 250, datatype: 'text', maxlength: 240 },
                                ];
           
        

        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    onOffenderChange(offender) {
        this.offconData = [];
        this.contxData = [];
        this.itmtxData = [];
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offconModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offconModel.agyLocId = this.sessionManager.currentCaseLoad;
            this.oidvcontexecuteQuery();
        } else {
            this.offconData = [];
            this.contxData = [];
            this.itmtxData = [];
            this.veryfyInsert = false;
        }
    }
    oidvcontexecuteQuery() {
        if (this.vHeaderBlockModel.offenderBookId) {
            const serviceObj = this.oidvcontFactory.offConExecuteQuery(this.offconModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                } else {
                    this.offconData = [];
                    if (this.offConIndexTemp) {
                        this.offconIndex = this.offConIndexTemp;
                    } else {
                        this.offconIndex = 0;
                    }
                    this.offconData = data;
                }
            });
        }
    }
    onRowClickoffcon(event) {
        if (event) {
            this.veryfyInsert = true;
            if (event.sealMark) {
                this.sealMark = event.sealMark;
            } else {
                this.sealMark = null;
            }
            this.selectedOffender = event;

            this.offConIndexTemp = this.offconData.indexOf(this.selectedOffender);
            if (this.selectedOffender.propertyContainerId) {
                this.propertyContainerId = this.selectedOffender.propertyContainerId;
                this.conTxColumnDef[2].link = 'oidvcont/cgfkConTxActionCodeRecordGroup?propertyContainerId=' + this.propertyContainerId;
                this.grid.prepareAgColumnDef();
            }
            this.contxModel = new OffenderPptyConTxns();
            this.contxModel.propertyContainerId = this.selectedOffender.propertyContainerId;
            this.contxModel.createUserId = this.sessionManager.getId();
            this.contxModel.agyLocId = this.selectedOffender.agyLocId;
            this.oidvcontPopulateDetails();
        } else {
            this.veryfyInsert = false;
        }
    }

    /**
     * This function loads the data into the Master Record and its child records
     */
    oidvcontPopulateDetails() {
        if (this.contxModel.propertyContainerId) {
            const serviceObj = this.oidvcontFactory.conTxExecuteQuery(this.contxModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    if (this.vHeaderBlockModel.prisonLocation !== 'Outside') {
                        if (this.vHeaderBlockModel.agyLocId !== this.selectedOffender.agyLocId) {
                            this.veryfyInsert = false;
                        } else {
                            this.veryfyInsert = true;
                        }
                    } else {
                        this.veryfyInsert = true;
                    }
                    this.enableConData = true;
                    this.contxData = [];
                    this.itmtxData = [];
                } else {
                    for (let i = 0; i < data.length; i++) {
                        const datePipe = new DatePipe('en-US');
                        data[i].createDate = DateFormat.getDate(data[i].createDate);
                        data[i].createDate = datePipe.transform(data[i].createDate, 'dd/MM/yyyy HH:mm:ss');
                        if (!data[i].actionCode) {
                            data[i].createUserId = undefined;
                        }
                    }
                    this.contxIndex = 0;
                    this.contxData = data;
                    this.offConTxnsIndex = this.contxData.length;
                    this.itmtxData = [];
                    if (this.vHeaderBlockModel.prisonLocation !== 'Outside') {
                        if (this.vHeaderBlockModel.agyLocId !== this.selectedOffender.agyLocId) {
                            this.veryfyInsert = false;
                        } else {
                            this.veryfyInsert = true;
                        }
                    } else {
                        this.veryfyInsert = true;
                    }
                    this.enableConData = true;
                }
            });
        }
    }
    onRowClickcontx(event) {
        if (event) {
            if(event.propertyContainerTxnId){
                this.showEdit=false;
            } else{
                this.showEdit=true;
            }
            this.selectionOffender = event;
            this.itmtxModel = new OffenderPptyItemTxns();
            this.itmtxModel.propertyContainerTxnId = this.selectionOffender.propertyContainerTxnId;
            this.oidvcontitmtxPopulateDetails();
        }
    }
    oidvcontitmtxPopulateDetails() {
        if (this.itmtxModel.propertyContainerTxnId > 0) {
            const serviceObj = this.oidvcontFactory.itmTxExecuteQuery(this.itmtxModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.itmtxData = [];
                } else {
                    for (let i = 0; i < data.length; i++) {
                        data[i].verifyFlag = data[i].verifyFlag === 'Y' ? true : false;
                    }
                    this.itmtxData = data;
                    this.conitmIndex = data.length;
                    this.itmtxModel = this.itmtxData[0];
                    this.itmTxReadOnly = true;
                }
            });
        }
    }
    oidvcontitmtxDetails() {
        const serviceObj = this.oidvcontFactory.offPItemExecuteQuery(this.itmtxModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidvcont.nocontaineritems');
                this.show();
                this.validateFlag = true;
                return;
            } else {
                this.itmtxData = data;
                this.enableConData = true;
                this.validateFlag = false;
            }
        });
    }
    onRowClickitmtx(event) {
    }
    oidvcontSavecontxForm(event) {
        this.contxInsertList = event.added;
        if (this.validateFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidvcont.nocontaineritems');
            this.show();
            return;
        }
        if (this.itmtxData.length > 0) {
            const cont = { valid: true };
            this.itmtxData.forEach(data => {
                if (data.verifyFlag) {
                    cont.valid = false;
                    return;
                }
            });
            if (cont.valid) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidvcont.pleaseconfirmtheitemsbeingverified');
                this.show();
                this.grid.btnSavebtnDisable = this.grid.isSaveDisabled();
                return;
            }
        }
        for (let i = 0; i < this.contxInsertList.length; i++) {
            if (this.contxInsertList[i].sealMark && this.contxInsertList[i].actionCode === 'VC') {
                const data = {
                    heading : this.translateService.translate('common.warning'),
                    label: this.translateService.translate('oidvcont.selectverifycontents'),
                    yesBtn: true,
                    noBtn: false ,
                    cancelBtn:true
                };
                
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                    if (result) {
                        this.savecontxForm();
                    }
                    else if(result == null){
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidvcont.recordnotsavedpleaseselectdifferenttransaction');
                        this.show();
                        this.grid.btnSavebtnDisable = false;
                        return;
                    }
                });
            } 
            else {
                this.savecontxForm();
            }
        }
    }
    savecontxForm() {
        this.contxCommitModel.insertList = [];
        if (this.contxInsertList.length > 0) {
            for (let i = 0; i < this.contxInsertList.length; i++) {
                if (!this.contxInsertList[i].actionCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidvcont.transactionfieldmustbeentered');
                    this.show();
                    return;
                }
                this.contxInsertList[i].internalLocationId = this.selectedOffender.internalLocationId;
                this.contxInsertList[i].agyLocId = this.selectedOffender.agyLocId;
                this.contxInsertList[i].createUserId = this.sessionManager.getId();
                this.contxInsertList[i].createDateTime = DateFormat.getDate();
                this.contxInsertList[i].propertyContainerId = this.selectedOffender.propertyContainerId;
            }
        }
        if (this.contxInsertList.length > 0) {
            for (let i = 0; i < this.contxInsertList.length; i++) {
                this.contxInsertList[i].createDate = DateFormat.getDate();
            }
        }
        for (let i = 0; i < this.contxInsertList.length; i++) {
            if (this.contxInsertList[i].sealMark && this.contxInsertList[i].actionCode === 'VC') {
                this.oidvcontSaveoffpptycontForm();
            }
        }
        this.contxCommitModel.insertList = this.contxInsertList;
        const contxSaveData = this.oidvcontFactory.conTxCommit(this.contxCommitModel);
        contxSaveData.subscribe(data => {
            if (data > 0) {
                this.sealMark = undefined;
                this.propertyContainerTxnId = data;
                this.oidvcontSaveitmtxForm(this.itmtxData);
                this.oidvcontitmtxPopulateDetails();
                this.oidvcontPopulateDetails();
                this.oidvcontexecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.brokenSeal = true;
                return;
            } else {
                this.oidvcontSaveitmtxForm(this.itmtxData);
                this.oidvcontitmtxPopulateDetails();
                this.oidvcontPopulateDetails();
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }
    oidvcontSaveitmtxForm(requestData) {
        if (requestData.length > 0) {
            for (let i = 0; i < requestData.length; i++) {
                requestData[i].propertyContainerTxnId = this.propertyContainerTxnId;
                requestData[i].verificationFlag = 'N';
                requestData[i].agyLocId = this.selectedOffender.agyLocId;
                requestData[i].createDate = DateFormat.getDate();
                requestData[i].toStatusCode = requestData[i].statusCode;
                if (!requestData[i].verifyFlag) {
                    requestData[i].verifyFlag = null;
                } else {
                    requestData[i].verifyFlag = 'Y';
                }
            }
            this.itmtxCommitModel.insertList = requestData;
            const itmtxSaveData = this.oidvcontFactory.itmTxCommit(this.itmtxCommitModel);
            itmtxSaveData.subscribe(data => {
                if (data === 1) {
                } else {
                    this.type = 'error';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                }
            });
        }
    }
    oidvcontSaveoffpptycontForm() {
        if (this.contxModel.propertyContainerId) {
            const offConSaveData = this.oidvcontFactory.updateOffenderPptyContainers(this.contxModel);
            offConSaveData.subscribe(offCondata => {
                if (offCondata === 1) {
                }
            });
        }
    }
    onGridInsert = () => {
        this.showEdit=true;
        if (!this.vHeaderBlockModel) {
            this.offconData = [];
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
        }
        if (this.contxData.length > 0) {
            for (let i = 0; i < this.contxData.length; i++) {
                if (!this.contxData[i].propertyContainerTxnId) {
                    return;
                }
            }
        }
        this.itmtxData = [];
        this.itmTxReadOnly = false;
        this.contxData.forEach(element => {
        });
        return { createDate: DateFormat.updateServerDate(), sealMark: this.sealMark };
    }
    onGridClear = () => {
        this.itmtxData = [];
        return true;
    }
    itemGenerator = (event) => {
        const rowIndex = event.rowIndex;
        this.conitmIndex = 0;
        const rowdata = new ValidateRowReturn();
        if (event.oldValue !== event.newValue) {
            if (event.field === 'actionCode') {
                if (event.data.actionCode) {
                    if (event.data.actionCode === 'VC') {
                        this.itmtxModel.propertyContainerId = this.contxModel.propertyContainerId;
                        this.oidvcontitmtxDetails();
                    } else {
                        this.itmtxData = [];
                        this.validateFlag = false;
                        this.enableConData = true;
                    }
                }
            }
            rowdata.validated = true;
        }
        return rowdata;
    }
    
    isEditCheck=(data: any, index: number, field: string):boolean=>{
        
        if(data.data.propertyContainerTxnId){
        return false;
        } else{
        return true;
        }
    }
    canOffConTxnsEdit = (data: any, index: number, field: string): boolean => {
        if (data.createUserId && this.sessionManager.currentCaseLoad !== this.vHeaderBlockModel.agyLocId) {
            return false;
        }
        if (data.actionCode && data.propertyContainerId) {
            return false;
        }
        if (this.vHeaderBlockModel.prisonLocation !== 'Outside') {
            if (this.vHeaderBlockModel.agyLocId !== this.selectedOffender.agyLocId) {
                return false;
            }

        }
        return true;
    }
    canitmTxEdit = (data: any, index: number, field: string): boolean => {
        if (this.conitmIndex <= index) {
            return true;
        }
        return false;
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
}
