import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OivctmngService } from '../service/oivctmng.service';
import { Router } from '@angular/router';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { VictimRecords } from '@inst/victimmanagement/beans/VictimRecords';
import { VictimLinkedOffenders } from '@inst/victimmanagement/beans/VictimLinkedOffenders';
import { VictimContactLogs } from '@inst/victimmanagement/beans/VictimContactLogs';
import { VictimContactPreferences } from '@inst/victimmanagement/beans/VictimContactPreferences';
import { VictimRecordsCommitBean } from '@inst/victimmanagement/beans/VictimRecordsCommitBean';
import { VictimLinkedOffendersCommitBean } from '@inst/victimmanagement/beans/VictimLinkedOffendersCommitBean';
import { VictimContactLogsCommitBean } from '@inst/victimmanagement/beans/VictimContactLogsCommitBean';
import { VictimContactPreferencesCommitBean } from '@inst/victimmanagement/beans/VictimContactPreferencesCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OcdleglsService } from '@inst/legal/service/ocdlegls.service';
import { OcdalertService } from '@inst/demographics-biometrics/service/ocdalert.service';




@Component({
    selector: 'app-oivctmng',
    templateUrl: './oivctmng.component.html'
})

export class OivctmngComponent implements OnInit {
    @ViewChild('grid') grid: any;
    @ViewChild('linkedOffGrid', { static: true }) linkedOffGrid: any;
    @ViewChild('vctmContLogGrid', { static: true }) vctmContLogGrid: any;
    @ViewChild('vctmContPrefGrid', { static: true }) vctmContPrefGrid: any;
    msgs: any[] = [];

    victimRecordColumnDef: any[];
    victimRecordData: VictimRecords[] = [];
    victRcrdIndex: number;
    enableInsert: boolean;
    victimRecordInsertList: VictimRecords[] = [];
    victimRecordUpdateList: VictimRecords[] = [];
    victRcrdModel: VictimRecords = new VictimRecords();
    victRcrdCommitModel: VictimRecordsCommitBean = new VictimRecordsCommitBean();
    victimRecordModel: VictimRecords = new VictimRecords();


    gotovictimdetailsDisabled: boolean
    gotovictimdetails: [] = [];


    linkedOffColumnDef: any[];
    linkedOffData: VictimLinkedOffenders[] = [];
    linkedOffTableIndex: number;
    linkedOffInsert: boolean
    linkedOffDataDisabled: boolean
    victLinkedOffInsertList: VictimLinkedOffenders[] = [];
    victLinkedOffUpdateList: VictimLinkedOffenders[] = [];
    linkedOffModel: VictimLinkedOffenders = new VictimLinkedOffenders();
    victLinkedOffCommitModel: VictimLinkedOffendersCommitBean = new VictimLinkedOffendersCommitBean();

    victContColumnDef: any[];
    victContData: VictimContactLogs[] = [];
    victContTableIndex: number;
    victContInsert: boolean
    victContDataDisabled: boolean
    victContLogInsertList: VictimContactLogs[] = [];
    victContLogUpdateList: VictimContactLogs[] = [];
    victContModel: VictimContactLogs = new VictimContactLogs();
    victCintLogsCommitModel: VictimContactLogsCommitBean = new VictimContactLogsCommitBean();

    victContPrefColumnDef: any[];
    victContPrefData: VictimContactPreferences[] = [];
    victContPrefTableIndex: number;
    victContPrefInsert: boolean
    victContPrefDataDisabled: boolean
    victContPrefInsertList: VictimContactPreferences[] = [];
    victContPrefUpdateList: VictimContactPreferences[] = [];
    victContPreModel: VictimContactPreferences = new VictimContactPreferences();
    victContPrefCommitModel: VictimContactPreferencesCommitBean = new VictimContactPreferencesCommitBean();

    linkedoffReadOnly: boolean = false;
    victContReadOnly: boolean = false;
    victContPrefReadOnly: boolean = false;

    deactivateFlag: boolean;
    msglist: any[];
    message: any;
    type: any;
    exitFlag: boolean;
    name: string;
    personId: number;
    victimId: number;
    description: any;
    linkedOffSelected :VictimLinkedOffenders =new VictimLinkedOffenders();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    duplicateFlag:boolean;
    vctmId: any;
    tempFlag: boolean;
    tempFlag2 : boolean;
    indexVal: number;
    linkedOffIndexPos: number;
    noteTextTemp: any;

    constructor(private oivctmngFactory: OivctmngService, public translateService: TranslateService, private ocdalertFactory: OcdalertService,
        public osiosearFactory: OsiosearService,private offenderSearchService: OffenderSearchService,private ocdleglsFactory: OcdleglsService,
        private router: Router, private sessionManager: UserSessionManager, public dialogService: DialogService,) {
        this.victimRecordColumnDef = [];
        this.linkedOffColumnDef = [];
        this.victContColumnDef = [];
        this.victContPrefColumnDef = [];

    }

    ngOnInit() {
        if ( this.ocdleglsFactory.vctRcrdIndexVal) {
            this.tempFlag = true;
            this.tempFlag2 = true;
            this.indexVal = this.ocdleglsFactory.vctRcrdIndexVal ;
            this.linkedOffIndexPos = this.ocdleglsFactory.linkedOffIndexVal;
        }else if(this.ocdalertFactory.vctRcrdIndexVal){
            this.tempFlag = true;
            this.tempFlag2 = true;
            this.indexVal = this.ocdalertFactory.vctRcrdIndexVal ;
            this.linkedOffIndexPos = this.ocdalertFactory.linkedOffIndexVal ;
        }
        this.enableInsert = true;
        
        this.victimRecordColumnDef = [

            {
                fieldName: this.translateService.translate('oivctmng.name'), datatype: 'text', field: 'name', editable: false,
                width: 150, required: true
            },
            {
                fieldName: '', field: 'button', editable: false, width: 100, datatype: 'hyperlink',
                data: 'row', updateField: 'row', modal: true, displayas: 'image', dialogWidth: '80%', height: 90,
                link: '/osipserdialog', onLaunchClick: this.osipserdialogClick, isDisable: this.isLaunchDisable
            },
            {
                fieldName: this.translateService.translate('oivctmng.victimid'), datatype: 'text', field: 'victimId', editable: false,
                width: 150, uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('oivctmng.age'), datatype: 'number', field: 'age', editable: false,
                width: 150, whole: true
            },
            {
                fieldName: this.translateService.translate('common.sex'), datatype: 'text', field: 'sex', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.preferredcontactmethod'), field: 'preferredContactMethod', datatype: 'lov',
                domain: 'CONT_METH', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.active'), datatype: 'checkbox', field: 'activeFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.registered'), datatype: 'date', field: 'registeredDatetime', editable: false
            },
            {
                fieldName: this.translateService.translate('oivctmng.deactivated'), datatype: 'date', field: 'deactivatedDatetime', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.note'), datatype: 'text', field: 'note', editable: false,
                uppercase: 'false', maxlength: 150, wrapText: true
            },
            {
                fieldName: '', datatype: 'number', field: 'personId', hide : 'true'
            },
            { fieldName: '', field: 'commentText', hide: 'true' }
        ];


        this.linkedOffColumnDef = [

            {
                fieldName: this.translateService.translate('oivctmng.id'), datatype: 'number', field: 'offenderId', hide: 'true'
            },
            {
                fieldName: this.translateService.translate('oivctmng.id'), datatype: 'text', field: 'offenderIdDisplay', editable: false,
                width: 150, required: true
            },
            {
                fieldName: '', field: 'button', editable: false, width: 120, datatype: 'hyperlink', data: 'row', updateField: 'row', modal: true,
                displayas: 'image', dialogWidth: 100, height: 90, link: '/osinamesdialog', isDisable: this.isLaunchDisable, onLaunchClick: this.osinamesClick
            },
            {
                fieldName: this.translateService.translate('oivctmng.name'), datatype: 'text', field: 'offenderName', editable: false,
                width: 150, uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('oivctmng.supervisionLocation'), datatype: 'text', field: 'agyLoc', editable: false,
                width: 150, uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('oivctmng.associatedlegalcase'), datatype: 'text',
                field: 'associatedLegalCase', editable: false,
                width: 150, uppercase: 'true'
            },
            {
                fieldName: '', field: 'aButton', datatype: 'hyperlink', displayas: 'href',
                width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: 75,
                onLaunchClick: this.aLaunchClick, styleClass: 'edit', type: '',
            },
            {
                fieldName: this.translateService.translate('oivctmng.legalsummery'), field: 'lBtn', datatype: 'hyperlink', displayas: 'href', styleClass: 'launch', width: 150, modal: true, data: 'row', onLaunchClick: this.onLegalSummeryLaunchClick
            },
            {
                fieldName: this.translateService.translate('oivctmng.alerts'), field: 'aBtn', datatype: 'hyperlink', displayas: 'href', styleClass: 'launch', width: 150, modal: true, data: 'row', onLaunchClick: this.onAlertsLaunchClick
            },
            {
                fieldName: this.translateService.translate('oivctmng.note'), datatype: 'text', field: 'note', editable: true,
                width: 150, uppercase: 'false', maxlength: 240
            },
            {
                fieldName: this.translateService.translate('oivctmng.active'), datatype: 'checkbox', field: 'activeFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.deactivated'), datatype: 'date', field: 'deactivatedDatetime', editable: false,
                width: 150
            },
            {
                fieldName: '', datatype: 'number', field: 'offenderBookId', hide: 'true',
            },
            {
                fieldName: '', datatype: 'number', field: 'orderNo', hide: 'true',
            },
            {
                fieldName: '', datatype: 'text', field: 'displayNo', hide: 'true',
            },
            {
                fieldName: '', datatype: 'text', field: 'orderType', hide: 'true',
            }
        ];


        this.victContColumnDef = [

            {
                fieldName: this.translateService.translate('oivctmng.date'), datatype: 'date', field: 'logDatetime', editable: true,
                width: 150, required: true
            },
            {
                fieldName: this.translateService.translate('oivctmng.time'), datatype: 'time', field: 'logTime', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.category'), datatype: 'lov', field: 'category', editable: true,
                domain: 'VIC_CONT_CAT', width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.type'), datatype: 'lov', field: 'type', editable: true,
                domain: 'VIC_CON_TYPE', parentField: 'category', width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.createdby'), datatype: 'text', field: 'staffName', editable: false,
                width: 150, uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('oivctmng.contactmethod'), datatype: 'lov', field: 'contactMethod', editable: true,
                domain: 'CONT_METH', width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.note'), datatype: 'text', field: 'note', editable: true,
                width: 150,  maxlength: 240, uppercase: 'false'
            }
        ];

        this.victContPrefColumnDef = [

            {
                fieldName: this.translateService.translate('oivctmng.contacttype'), datatype: 'lov', field: 'contactType', editable: true,
                domain: 'VIC_CON_TYPE', width: 150, required: true
            },
            {
                fieldName: this.translateService.translate('oivctmng.active'), datatype: 'checkbox', field: 'activeFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.deactivated'), datatype: 'date', field: 'deactivatedDatetime', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oivctmng.comment'), datatype: 'text', field: 'comment', editable: true,
                width: 150, maxlength: 240, uppercase: 'false'
            }
        ];

        this.oivctmngFactory.exitFlag = false;
        this.victimRcrdExecuteQuery();

    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if(event.field === 'activeFlag'){
        if (event.data.activeFlag) {
            this.deactivateFlag = false;
            this.grid.setColumnData('registeredDatetime', rowIndex, DateFormat.getDate());
            this.grid.setColumnData('deactivatedDatetime', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }
        if (!event.data.activeFlag && event.data.registeredDatetime.length != 0) {
            this.deactivateFlag = true;
            this.grid.setColumnData('deactivatedDatetime', rowIndex, DateFormat.getDate());
            rowdata.validated = true;
            return rowdata;
        }
        if (event.data.registeredDatetime) {
            this.grid.setColumnData('registeredDatetime', rowIndex, DateFormat.getDate());
            rowdata.validated = true;
            return rowdata;
        }
    }else{
        return rowdata;
    }
    }


    linkedOffVldtRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;

        if (!event.data.activeFlag) {
            this.linkedOffGrid.setColumnData('deactivatedDatetime', rowIndex, DateFormat.getDate());
            rowdata.validated = true;
            return rowdata;
        }
        if (event.data.activeFlag) {
            this.linkedOffGrid.setColumnData('deactivatedDatetime', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }
    }

    victimcontactlogValidateRow = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.field === 'category') {
            this.vctmContLogGrid.setColumnData('type', rowIndex, (!event.data.category) ? undefined : event.data.type);
        }
        return rowdata;
    }

    victContLogRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;

    }

    vctCntPrfVldRowData = (event) => {

        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;

        if (!event.data.activeFlag) {
            this.vctmContPrefGrid.setColumnData('deactivatedDatetime', rowIndex, DateFormat.getDate());
            rowdata.validated = true;
            return rowdata;
        }
        if (event.data.activeFlag) {
            this.vctmContPrefGrid.setColumnData('deactivatedDatetime', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }

    }


    onGridReady = () => {
        return {
            activeFlag: true
        }
    }

    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    onGridClear = () => {

    }

    gridOnRowClickOne(event) {
            this.indexVal = this.victimRecordData.indexOf(event);
        if (event && event.victimId) {
            this.victRcrdModel = event;
            this.linkedOffInsert = true;
            this.victContInsert = true;
            this.victContPrefInsert = true
            this.victimId = event.victimId;
            this.victRcrdModel.noteTextTemp=event.note;
        } else {
            this.victRcrdModel = new VictimRecords();
            this.linkedOffInsert = false;
            this.victContInsert = false;
            this.victContPrefInsert = false;
            this.victimId = 0;
        }
        this.linkedOffExecuteQuery();
        this.victContLogExecuteQuery();
        this.victContPrefExecuteQuery();

    }

    onGridInsertOne = () => {

        return { button: 'assets/icons/eoff_icons/person_search_black_24dp.png' };
    }



    osipserdialogClick = (event) => {
        // if (event.personId) {
        //   return;
        // }
        this.oivctmngFactory.getVictimId().subscribe(data=>{
            this.vctmId = data;
        })
        const index = this.victimRecordData.indexOf(event);
        this.dialogService.openLinkDialog('/osipserdialog', event, 90).subscribe(result => {
            this.name = result.lastName + ", " + result.firstName
            this.grid.setColumnData('name', index, this.name);
            this.grid.setColumnData('age', index, result.age);
            this.grid.setColumnData('sex', index, result.sex);
            this.grid.setColumnData('personId', index, result.personId);
            this.grid.setColumnData('victimId', index, this.vctmId);
        });
    }

    isLaunchDisable = (event) => {
        if (event.personId) {
            return true;
        } else {
            return false;
        }
    }


    osinamesClick = (event) => {

        const index = this.linkedOffData.indexOf(event);
        this.dialogService.openLinkDialog('/osinamesdialog', event, 90).subscribe(result => {
            if (result.offenderId) {
                this.name = result.lastName + ", " + result.firstName
                this.linkedOffGrid.setColumnData('offenderId', index, result.offenderId);
                this.linkedOffGrid.setColumnData('offenderName', index, this.name);
                this.linkedOffGrid.setColumnData('agyLoc', index, result.description);
                this.linkedOffGrid.setColumnData('offenderBookId', index, result.offenderBookId);
                this.linkedOffGrid.setColumnData('offenderIdDisplay', index, result.offenderIdDisplay);

            } else {

            }
        });


    }

    onLegalSummeryLaunchClick = (event) => {
        this.linkedOffIndexPos = this.linkedOffData.indexOf(event);
        if (event && event.createDatetime){
            this.oivctmngFactory.exitFlag = true;
            this.oivctmngFactory.indexPos = this.indexVal;
            this.oivctmngFactory.linkedOffIndexPos = this.linkedOffIndexPos;
            this.router.navigate(['/OCDLEGLS']);
        }

    }

    onAlertsLaunchClick = (event) => {
        this.linkedOffIndexPos = this.linkedOffData.indexOf(event);
        if (event && event.createDatetime){
            this.oivctmngFactory.exitFlag = true;
            this.oivctmngFactory.indexPos = this.indexVal;
            this.oivctmngFactory.linkedOffIndexPos = this.linkedOffIndexPos;
            this.router.navigate(['/OCDALERT']);
        }
    }

    victimdetails = () => {
        this.oivctmngFactory.exitFlag = true;
        this.victRcrdModel.sealFlag='OIVCTMNG';
        this.dialogService.openLinkDialog('/osipserdialog', this.victRcrdModel,  80).subscribe(data => {
        this.tempFlag = true;
        this.victimRcrdExecuteQuery();
        });
        
    }

    setDescription(event) {

    }


    linkedOffGridInsert = () => {
        return {
            button: 'assets/icons/eoff_icons/person_search_black_24dp.png', lBtn: '', aBtn: '', activeFlag: 'true', aButton: '',
            associatedLegalCase: null, orderType: null, orderNo: null, displayNo: null
        };
    }


    victContGridInsert = () => {
        return {
            logDatetime: DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)),
            logTime: DateFormat.getDate()
        }
    }

    onVictContPrefGridInsert = () => {
        return { activeFlag: 'true' }
    }

    onRowClickLinkedOff(event) {
        this.linkedOffIndexPos = this.linkedOffData.indexOf(event);
        this.linkedOffSelected = event;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel.offenderIdDisplay = event.offenderIdDisplay;
        this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
        const offbkGlobal = this.oivctmngFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
        offbkGlobal.subscribe(list => {
            if (list.length > 0) {
                this.vHeaderBlockModel = list[0];
                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
            }
        });
    }

    onRowClickVictCont(event) {

    }

    onRowClickVictContPref(event) {

    }

    saveVctRcrdData(event) {
        this.victimRecordInsertList = event.added
        this.victimRecordUpdateList = event.updated

        this.victRcrdCommitModel.insertList = [];
        this.victRcrdCommitModel.updateList = [];

        if (this.victimRecordInsertList.length > 0) {
            for (let i = 0; i < this.victimRecordInsertList.length; i++) {
                if (!this.victimRecordInsertList[i].name) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oivctmng.namemustbeentered');
                    this.show();
                    return;
                }
                this.victimRecordInsertList[i].createDatetime = DateFormat.getDate();
                this.victimRecordInsertList[i].createUserId = this.sessionManager['userSession'].id
                this.victimRecordInsertList[i].activeFlag = this.victimRecordInsertList[i].activeFlag ? 'Y' : 'N';
                this.victimRecordInsertList[i].note = this.victimRecordInsertList[i].noteTextTemp;
                //this.victimRecordInsertList[i].personId = this.personId;
            }
            this.victRcrdCommitModel.insertList = this.victimRecordInsertList;
        }
        if (this.victimRecordUpdateList.length > 0) {

            for (let i = 0; i < this.victimRecordUpdateList.length; i++) {
                if (!this.victimRecordUpdateList[i].name) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oivctmng.namemustbeentered');
                    this.show();
                    return;
                }
                this.victimRecordUpdateList[i].modifyDatetime = DateFormat.getDate();
                this.victimRecordUpdateList[i].modifyUserId = this.sessionManager['userSession'].id
                this.victimRecordUpdateList[i].activeFlag = this.victimRecordUpdateList[i].activeFlag ? 'Y' : 'N';
                this.victimRecordUpdateList[i].note = this.victimRecordUpdateList[i].noteTextTemp;
            }
            this.victRcrdCommitModel.updateList = this.victimRecordUpdateList;
        }

        const vctmRcrdSaveData = this.oivctmngFactory.victmRcrdCommit(this.victRcrdCommitModel);
        vctmRcrdSaveData.subscribe(data => {
            if (data === 1) {
                this.victimRcrdExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

    victimRcrdExecuteQuery() {
        const serviceObj = this.oivctmngFactory.victimRcrdExecuteQuery();
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.victimRecordData = [];
                this.victRcrdIndex = -1;
            }else if(this.tempFlag){
                this.victRcrdIndex = this.indexVal ;
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.victimRecordData = data;
                this.victRcrdModel = data[0];
                this.linkedOffInsert = true;
                this.victContInsert = true;
                this.victContPrefInsert = true;
                
            }else {
                this.victRcrdIndex = 0;
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    this.victRcrdModel.noteTextTemp = element.note;
                });
                this.victimRecordData = data;
                this.victRcrdModel = data[0];
                this.linkedOffInsert = true;
                this.victContInsert = true;
                this.victContPrefInsert = true;
            }
            this.tempFlag = false;
            this.indexVal = 0;
            this.ocdleglsFactory.vctRcrdIndexVal = 0;
            this.ocdalertFactory.vctRcrdIndexVal = 0;
        });
    }


    saveLinkedOffData(event) {
        this.duplicateFlag = true;
        this.linkedOffData.forEach((element, index) => {
            this.linkedOffData.forEach((element2, index2) => {
                if (element.offenderId === element2.offenderId && index !== index2) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oivctmng.cannottakeduplicateoffender');
                    this.show();
                    this.duplicateFlag = false;
                    return;
                }

            });
        });
        if (this.duplicateFlag) {
            this.victLinkedOffInsertList = event.added
            this.victLinkedOffUpdateList = event.updated

            this.victLinkedOffCommitModel.insertList = [];
            this.victLinkedOffCommitModel.updateList = [];

            if (this.victLinkedOffInsertList.length > 0) {
                for (let i = 0; i < this.victLinkedOffInsertList.length; i++) {

                    if (!this.victLinkedOffInsertList[i].offenderId) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oivctmng.idmustbeentered');
                        this.show();
                        return;
                    }
                    this.victLinkedOffInsertList[i].createDatetime = DateFormat.getDate();
                    this.victLinkedOffInsertList[i].createUserId = this.sessionManager['userSession'].id
                    this.victLinkedOffInsertList[i].activeFlag = this.victLinkedOffInsertList[i].activeFlag ? 'Y' : 'N';
                    this.victLinkedOffInsertList[i].victimId = this.victimId;
                }
            }
            if (this.victLinkedOffUpdateList.length > 0) {

                for (let i = 0; i < this.victLinkedOffUpdateList.length; i++) {
                    if (!this.victLinkedOffUpdateList[i].offenderId) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oivctmng.idmustbeentered');
                        this.show();
                        return;
                    }
                    this.victLinkedOffUpdateList[i].modifyDatetime = DateFormat.getDate();
                    this.victLinkedOffUpdateList[i].modifyUserId = this.sessionManager['userSession'].id
                    this.victLinkedOffUpdateList[i].activeFlag = this.victLinkedOffUpdateList[i].activeFlag ? 'Y' : 'N';
                }
            }

            if (this.victLinkedOffInsertList.length > 0) {
                for (let i = 0; i < this.victLinkedOffInsertList.length; i++) {
                    const form_identifiers = {};
                    if (this.victLinkedOffInsertList[i].offenderBookId != null)
                        form_identifiers['offenderBookId'] = this.victLinkedOffInsertList[i].offenderBookId + '';
                    if (this.victLinkedOffInsertList[i].orderType === "undefined" && this.victLinkedOffInsertList[i].orderType !== null)
                        form_identifiers['orderType'] = this.victLinkedOffInsertList[i].orderType + '';
                    if (this.victLinkedOffInsertList[i].orderNo === undefined && this.victLinkedOffInsertList[i].orderNo != null)
                        form_identifiers['orderNo'] = this.victLinkedOffInsertList[i].orderNo + '';
                    if (this.victLinkedOffInsertList[i].displayNo != undefined && this.victLinkedOffInsertList[i].displayNo != null)
                        form_identifiers['displayNo'] = this.victLinkedOffInsertList[i].displayNo;
                    this.victLinkedOffInsertList[i].associatedLegalCase = JSON.stringify(form_identifiers);
                }
            }
            if (this.victLinkedOffUpdateList.length > 0) {
                for (let i = 0; i < this.victLinkedOffUpdateList.length; i++) {
                    const form_identifiers = {};
                    if (this.victLinkedOffUpdateList[i].offenderBookId != null)
                        form_identifiers['offenderBookId'] = this.victLinkedOffUpdateList[i].offenderBookId + '';
                    if (this.victLinkedOffUpdateList[i].orderType != null)
                        form_identifiers['orderType'] = this.victLinkedOffUpdateList[i].orderType + '';
                    if (this.victLinkedOffUpdateList[i].orderNo != null)
                        form_identifiers['orderNo'] = this.victLinkedOffUpdateList[i].orderNo + '';
                    if (this.victLinkedOffUpdateList[i].displayNo != null)
                        form_identifiers['displayNo'] = this.victLinkedOffUpdateList[i].displayNo;
                    this.victLinkedOffUpdateList[i].associatedLegalCase = JSON.stringify(form_identifiers);
                }
            }
            this.victLinkedOffCommitModel.insertList = this.victLinkedOffInsertList;
            this.victLinkedOffCommitModel.updateList = this.victLinkedOffUpdateList;


            const linkedOffSaveData = this.oivctmngFactory.LinkedOffCommit(this.victLinkedOffCommitModel);
            linkedOffSaveData.subscribe(data => {
                if (data === 1) {
                    this.linkedOffExecuteQuery();
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                } else {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                }
            });
        }
    }

    linkedOffExecuteQuery() {
        const linkedOffObj = this.oivctmngFactory.linkedOffExecuteQuery(this.victimId);
        linkedOffObj.subscribe(data => {
            if (data.length === 0) {
                this.linkedOffData = [];
                this.linkedOffTableIndex = -1;
            } else if (this.tempFlag2) {
                this.linkedOffTableIndex = this.linkedOffIndexPos;
                data.forEach(element => {
                    element['lBtn'] = '';
                    element['aBtn'] = '';
                    element['aButton'] = '';
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    if (element.jsonDataString != null) {
                        const str = JSON.parse(element.jsonDataString);
                        element.orderType = str.orderType ? str.orderType : null;
                        element.associatedLegalCase = str.displayNo ? str.displayNo : null;
                        element.orderNo = str.orderNo ? str.orderNo : null;
                        element.offenderBookId = str.offenderBookId;
                    }

                });
                this.linkedOffData = data;
                this.linkedOffModel = data[0];
            } else {
                this.linkedOffTableIndex = 0;
                data.forEach(element => {
                    element['lBtn'] = '';
                    element['aBtn'] = '';
                    element['aButton'] = '';
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    if (element.jsonDataString != null) {
                        const str = JSON.parse(element.jsonDataString);
                        element.orderType = str.orderType;
                        element.associatedLegalCase = str.displayNo;
                        element.orderNo = str.orderNo;
                        element.offenderBookId = str.offenderBookId;
                    }

                });
                this.linkedOffData = data;
                this.linkedOffModel = data[0];
            }
            this.tempFlag2 = false;
            this.ocdleglsFactory.linkedOffIndexVal = 0;
            this.ocdalertFactory.linkedOffIndexVal = 0;
        });
    }


    saveVictContLogData(event) {
        this.victContLogInsertList = event.added
        this.victContLogUpdateList = event.updated

        this.victCintLogsCommitModel.insertList = [];
        this.victCintLogsCommitModel.updateList = [];

        if (this.victContLogInsertList.length > 0) {
            for (let i = 0; i < this.victContLogInsertList.length; i++) {
                if (!this.victContLogInsertList[i].logDatetime) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oivctmng.datetimemustbeentered');
                    this.show();
                    return;
                }
                if (this.victContLogInsertList[i].logTime) {
                    let startHours = DateFormat.getDate(this.victContLogInsertList[i].logTime).getHours();
                    let startMinutes = DateFormat.getDate(this.victContLogInsertList[i].logTime).getMinutes();
                    this.victContLogInsertList[i].logDatetime = DateFormat.getDate(DateFormat.getDate(this.victContLogInsertList[i].logDatetime).setHours(startHours, startMinutes, 0, 0));
                }
                else {
                    this.victContLogInsertList[i].logDatetime = DateFormat.getDate(DateFormat.getDate(this.victContLogInsertList[i].logDatetime).setHours(0, 0, 0, 0));
                }
                this.victContLogInsertList[i].createDatetime = DateFormat.getDate();
                this.victContLogInsertList[i].createUserId = this.sessionManager['userSession'].id;
                this.victContLogInsertList[i].victimId = this.victimId;
                this.victContLogInsertList[i].staffId = this.sessionManager['userSession'].id;
            }
            this.victCintLogsCommitModel.insertList = this.victContLogInsertList;
        }
        if (this.victContLogUpdateList.length > 0) {
            for (let i = 0; i < this.victContLogUpdateList.length; i++) {
                if (!this.victContLogUpdateList[i].logDatetime) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oivctmng.datetimemustbeentered');
                    this.show();
                    return;
                }
                if (this.victContLogUpdateList[i].logTime) {
                    let startHours = DateFormat.getDate(this.victContLogUpdateList[i].logTime).getHours();
                    let startMinutes = DateFormat.getDate(this.victContLogUpdateList[i].logTime).getMinutes();
                    this.victContLogUpdateList[i].logDatetime = DateFormat.getDate(DateFormat.getDate(this.victContLogUpdateList[i].logDatetime).setHours(startHours, startMinutes, 0, 0));
                }
                else {
                    this.victContLogUpdateList[i].logDatetime = DateFormat.getDate(DateFormat.getDate(this.victContLogUpdateList[i].logDatetime).setHours(0, 0, 0, 0));
                }
                this.victContLogUpdateList[i].modifyDatetime = DateFormat.getDate();
                this.victContLogUpdateList[i].modifyUserId = this.sessionManager['userSession'].id;
                this.victContLogUpdateList[i].staffId = this.sessionManager['userSession'].id;
            }
            this.victCintLogsCommitModel.updateList = this.victContLogUpdateList;
        }

        const victContLogSaveData = this.oivctmngFactory.victContLogCommit(this.victCintLogsCommitModel);
        victContLogSaveData.subscribe(data => {
            if (data === 1) {
                this.victContLogExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

    victContLogExecuteQuery() {
        const victContLogObj = this.oivctmngFactory.victContLogExecuteQuery(this.victimId);
        victContLogObj.subscribe(data => {
            if (data.length === 0) {
                this.victContData = [];
                this.victContTableIndex = -1;
            } else {
                this.victContTableIndex = 0;
                this.victContData = data;
                this.victContModel = data[0];

                this.victContData.forEach(ele => {
                    let startHours = DateFormat.getDate(ele.logDatetime).getHours();
                    let startMinutes = DateFormat.getDate(ele.logDatetime).getMinutes();

                    ele.logTime = (startHours === 0 && startMinutes === 0) ? null : ele.logDatetime;
                });
            }
        });
    }


    saveVictContPrefData(event) {
        this.duplicateFlag = true;
        this.victContPrefData.forEach((element, index) => {
          this.victContPrefData.forEach((element2, index2) => {
            if (element.contactType === element2.contactType && index !== index2) {
              this.type = 'warn';
              this.message = this.translateService.translate('oivctmng.contacttypeshouldnotbeduplicate');
              this.show();
              this.duplicateFlag = false;
              return;
            }
          });
        });
        if (this.duplicateFlag) {
        this.victContPrefInsertList = event.added
        this.victContPrefUpdateList = event.updated

        this.victContPrefCommitModel.insertList = [];
        this.victContPrefCommitModel.updateList = [];

        if (this.victContPrefInsertList.length > 0) {
            for (let i = 0; i < this.victContPrefInsertList.length; i++) {
                if (!this.victContPrefInsertList[i].contactType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oivctmng.contacttypemustbeentered');
                    this.show();
                    return;
                }
                this.victContPrefInsertList[i].createDatetime = DateFormat.getDate();
                this.victContPrefInsertList[i].createUserId = this.sessionManager['userSession'].id
                this.victContPrefInsertList[i].activeFlag = this.victContPrefInsertList[i].activeFlag ? 'Y' : 'N';
                this.victContPrefInsertList[i].victimId = this.victimId;
            }
            this.victContPrefCommitModel.insertList = this.victContPrefInsertList;
        }
        if (this.victContPrefUpdateList.length > 0) {

            for (let i = 0; i < this.victContPrefUpdateList.length; i++) {
                if (!this.victContPrefUpdateList[i].contactType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oivctmng.contacttypemustbeentered');
                    this.show();
                    return;
                }
                this.victContPrefUpdateList[i].modifyDatetime = DateFormat.getDate();
                this.victContPrefUpdateList[i].modifyUserId = this.sessionManager['userSession'].id
                this.victContPrefUpdateList[i].activeFlag = this.victContPrefUpdateList[i].activeFlag ? 'Y' : 'N';
            }
            this.victContPrefCommitModel.updateList = this.victContPrefUpdateList;
        }

        const linkedOffSaveData = this.oivctmngFactory.victContPrefCommit(this.victContPrefCommitModel);
        linkedOffSaveData.subscribe(data => {
            if (data === 1) {
                this.victContPrefExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
        }
    }

    victContPrefExecuteQuery() {
        const victContPrefObj = this.oivctmngFactory.victContPrefExecuteQuery(this.victimId);
        victContPrefObj.subscribe(data => {
            if (data.length === 0) {
                this.victContPrefData = [];
                this.victContPrefTableIndex = -1;
            } else {
                this.victContPrefTableIndex = 0;
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.victContPrefData = data;
                this.victContPreModel = data[0];
            }
        });
    }
    aLaunchClick = (event) => {
        if (event && event.offenderId) {
            const index = this.linkedOffData.indexOf(event);
            event['moduleName'] = 'OIVCTMNG';
            this.dialogService.openLinkDialog('/OCDPROGRDIALOG', event, 50).subscribe(result => {
                if (result) {
                    this.linkedOffGrid.setColumnData('associatedLegalCase', index, result.sentenceCategory);
                    this.linkedOffGrid.setColumnData('orderType', index, result.orderType);
                    this.linkedOffGrid.setColumnData('orderNo', index, result.sentenceSeq);
                    this.linkedOffGrid.setColumnData('displayNo', index, result.sentenceCategory);
                }
                else{
                    this.linkedOffGrid.setColumnData('associatedLegalCase', index,null);
                    this.linkedOffGrid.setColumnData('orderType', index, null);
                    this.linkedOffGrid.setColumnData('orderNo', index,null);
                    this.linkedOffGrid.setColumnData('displayNo', index,null); 
                }
            });
            return true;
        }
    }

    isInsertable(event) {
        const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
        const rowIndex = node.rowIndex;
        this.grid.setColumnData('commentText', rowIndex, event);
    }
}


