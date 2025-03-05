import {
    Component, OnInit, ViewChild
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { OcuoicchService } from '../service/ocuoicch.service';
import { AgencyIncidentCharges } from '@instincidentsbeans/AgencyIncidentCharges';
import { OicHearingResults } from '@instincidentsbeans/OicHearingResults';
import { AgencyIncidentChargesCommitBean } from '@instincidentsbeans/AgencyIncidentChargesCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { VOicIncidents } from '@instoicbeans/VOicIncidents';
import { OicOffences } from '@instincidentsbeans/OicOffences';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { AppConstants } from '@core/classes/appConstants';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { Router } from '@angular/router';

// import required bean declarations

@Component({
    selector: 'app-ocuoicch',
    templateUrl: './ocuoicch.component.html'
})

export class OcuoicchComponent implements OnInit {
    // Variable declaration
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('grid', { static: true }) grid: any;
    actionName: string;
    lovModel: any[];
    msgs = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    agyincichgData: AgencyIncidentCharges[] = [];
    agyincichgDataTemp: AgencyIncidentCharges = new AgencyIncidentCharges();
    agyincichgModel: AgencyIncidentCharges = new AgencyIncidentCharges();
    agyincichgIndex = 0;
    agyincichgInsertList: AgencyIncidentCharges[] = [];
    agyincichgUpdatetList: AgencyIncidentCharges[] = [];
    agyincichgDeleteList: AgencyIncidentCharges[] = [];
    agyincichgCommitModel: AgencyIncidentChargesCommitBean = new AgencyIncidentChargesCommitBean;
    displayFlag: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    rgoffencecodeRg: any[] = [];
    chargesColumnDefs: any[];
    msglist = [];
    message = ' Invalid.';
    incidentDateValue: Date;
    type = 'error';
    index: number;
    oicHearingResultsModel: OicHearingResults = new OicHearingResults();
    vOicIncidentsModel: VOicIncidents = new VOicIncidents();
    oicOffencesData: OicOffences[] = [];
    recordsRetrieved: any[];
    checkFlag: boolean;
    verifyFlag: boolean;
    chargesGridIndex = 0;
    chargesGridDelete = false;
    constructor(private ocuoicchFactory: OcuoicchService, public translateService: TranslateService,
        public dialogService: DialogService,private eoffenderService: EoffenderService,private router: Router) {
        this.chargesColumnDefs = [];
    }
    ngOnInit() {
        // TODO all initializations here
        this.chargesColumnDefs = [
            {
                fieldName: this.translateService.translate('common.charges') + '*',
                field: 'chargedOicOffenceCode', editable: true, width: 200, maxlength: 7, datatype: 'text', uppercase: 'false'
            },
            {
                fieldName: '', field: 'button', datatype: 'hyperlink', displayas: 'href', styleClass: 'search', link: '/oimoicmpdialog', data: 'row', updateField: 'row', modal: true,
                editable: true, dialogWidth: 70
            },
            { fieldName: this.translateService.translate('common.type'), field: 'offenceType', editable: false, width: 200 },
            { fieldName: this.translateService.translate('common.offence-description'), field: 'offenceDesc', width: 250, editable: false },
            { fieldName: this.translateService.translate('common.category'), field: 'dspCategory', datatype: 'lov', domain: 'OIC_OFN_CAT', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.evidence'), field: 'guiltyEvidenceText', editable: true, width: 250,
                datatype: 'text', uppercase: 'false', wrapText: true
            },
            { fieldName: this.translateService.translate('ocuoicch.disposition'), datatype: 'lov', domain: 'CHAR_DISP', field: 'evidenceDisposeText', editable: true, width: 200 },
            { fieldName: '', field: 'chargedOicOffenceId', hide: true, datatype: 'number' },
            { fieldName: this.translateService.translate('ocuoicch.externalInvstDetails'), field: 'sealFlag', datatype: 'hyperlink', displayas: 'href', styleClass: 'launch', width: 150, link: '/OMUCLASS', modal: true, data: 'row', onLaunchClick: this.onExtScreenLaunchClick },
        ];
        this.vOicIncidentsModel = new VOicIncidents;
        this.eoffenderService.selectedRowData=null;
        this.vOicIncidentsModel.incidentDate = DateFormat.getDate(this.dialog.data.incidentDate);
        const serviceObj1 = this.ocuoicchFactory.rgOffenceCodeRecordGroup(this.vOicIncidentsModel);
        serviceObj1.subscribe(list1 => {
            this.oicOffencesData = list1;
        });
        this.agyincichgExecuteQuery();
        this.incidentDateValue = this.dialog.data.incidentDate;
    }
    onRowClickagyincichg(event) {
        this.displayFlag = false;
        if (event) {
            if (event.createDateTime) {
                this.chargesGridDelete = true;
                this.eoffenderService.selectedRowData=event;
                this.eoffenderService.selectedRowData['oicIncidentId']=this.dialog.data.oicIncidentId;
            } else {
                this.chargesGridDelete = false;
                this.eoffenderService.selectedRowData=null;
            }
            this.agyincichgDataTemp = event;
            this.oicHearingResultsModel = new OicHearingResults();
            this.oicHearingResultsModel.agencyIncidentId = this.agyincichgDataTemp.agencyIncidentId;
            this.oicHearingResultsModel.chargeSeq = this.agyincichgDataTemp.chargeSeq;
            const oicHearingResult = this.ocuoicchFactory.oichearResultsExecuteQuery(this.oicHearingResultsModel);
            oicHearingResult.subscribe(agyincichgResultList => {
                if (agyincichgResultList.length > 0) {
                    this.displayFlag = true;
                } else {
                    this.displayFlag = false;
                }
            });
        }
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }

    /**
      * This function auto generates incidentdate,.. values
      */
    onGridInsert = () => {
        for (let i = 0; i < this.agyincichgData.length; i++) {
            if (!(this.agyincichgData[i].chargedOicOffenceCode)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicch.chargesmustbeentered');
                this.show();
                return;
            }
        }
        return {
            button: '', incidentDate: this.incidentDateValue, offenceType: '', offenceDesc: '', dspCategory: '',
            chargedOicOffenceId: this.agyincichgModel.chargedOicOffenceId, chargedOicOffenceCode: '', sealFlag: ''
        };
    }
    chargesEvent = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.checkFlag = false;
        if (event.field === 'chargedOicOffenceCode') {
            for (let i = 0; i < this.oicOffencesData.length; i++) {
                if (event.newValue === this.oicOffencesData[i].oicOffenceCode) {
                    rowdata.validated = true;
                    this.checkFlag = true;
                    rowdata.data = {
                        offenceType: this.oicOffencesData[i].oicOffenceType, offenceDesc: this.oicOffencesData[i].description,
                        dspCategory: this.oicOffencesData[i].oicOffenceCategory,
                        chargedOicOffenceId: this.oicOffencesData[i].oicOffenceId
                    };
                    return rowdata;
                }
            }
            if (!this.checkFlag) {
                this.index = 0;
                this.index = rowIndex;
                this.dialogService.openLinkDialog('/oimoicmpdialog', event.data).subscribe(result => {
                    this.grid.setColumnData('chargedOicOffenceCode', this.index, result.chargedOicOffenceCode);
                    this.grid.setColumnData('offenceType', this.index, result.offenceType);
                    this.grid.setColumnData('offenceDesc', this.index, result.offenceDesc);
                    this.grid.setColumnData('dspCategory', this.index, result.dspCategory);
                    this.grid.setColumnData('chargedOicOffenceId', this.index, result.chargedOicOffenceId);
                    // this.agyincichgData[this.index].chargedOicOffenceCode = result.chargedOicOffenceCode;
                    // this.agyincichgData[this.index].offenceType =  result.offenceType;
                    // this.agyincichgData[this.index].offenceDesc = result.offenceDesc;
                    // this.agyincichgData[this.index].dspCategory = result.dspCategory;
                    // this.agyincichgData[this.index].chargedOicOffenceId = result.chargedOicOffenceId;
                });
                rowdata.validated = true;
                return rowdata;
            }

        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridDelete = () => {
        if (this.displayFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoicch.unabletodeleterecord');
            this.show();
            return false;
        } else {
            return true;
        }

    }
    /**
     *  This function will be executed when we click on Charges button of Offenses In custody
     *  based on agencyIncidentId of Offenses in custody block Charges block data will be retrieved
     */
    agyincichgExecuteQuery() {
        this.agyincichgModel = new AgencyIncidentCharges();
        this.agyincichgModel.agencyIncidentId = this.dialog.data.agencyIncidentId;
        this.agyincichgModel.partySeq = this.dialog.data.partySeq;
        const agyincichgResult = this.ocuoicchFactory.agyInciChgExecuteQuery(this.agyincichgModel);
        agyincichgResult.subscribe(agyincichgResultList => {
            this.agyincichgData = agyincichgResultList;
            for (let i = 0; i < this.agyincichgData.length; i++) {
                this.agyincichgData[i].button = '';
                this.agyincichgData[i].sealFlag = '';
                this.agyincichgData[i].incidentDate = this.dialog.data.incidentDate;
            }
        });
    }
    /**
     *  This function will be executed when we click on save button of Charges Block
     *  in this function save/update/delete functionalities are implemented
     */
    ocuoicchSaveagyincichgForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.agyincichgInsertList = [];
        this.agyincichgUpdatetList = [];
        this.agyincichgDeleteList = [];
        this.verifyFlag = true;
        this.agyincichgCommitModel.insertList = [];
        this.agyincichgCommitModel.deleteList = [];
        this.agyincichgCommitModel.updateList = [];
        this.agyincichgInsertList = event.added;
        this.agyincichgUpdatetList = event.updated;
        this.agyincichgDeleteList = event.removed;
        for (let i = 0; i < this.agyincichgInsertList.length; i++) {

            if (!this.agyincichgInsertList[i].chargedOicOffenceCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicch.chargesmustbeentered');
                this.show();
                return;
            }
            this.verifyFlag = false;
            for (let j = 0; j < this.oicOffencesData.length; j++) {
                if (this.agyincichgInsertList[i].chargedOicOffenceCode === this.oicOffencesData[j].oicOffenceCode) {
                    this.verifyFlag = true;
                }
            }
            this.agyincichgInsertList[i].agencyIncidentId = this.dialog.data.agencyIncidentId;
            this.agyincichgInsertList[i].partySeq = this.dialog.data.partySeq;
        }
        if (!this.verifyFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoicch.invalidchargevalue');
            this.show();
            return;
        }
        for (let i = 0; i < this.agyincichgUpdatetList.length; i++) {
            if (!this.agyincichgUpdatetList[i].chargedOicOffenceCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicch.chargesmustbeentered');
                this.show();
                return;
            }
            this.verifyFlag = false;
            for (let j = 0; j < this.oicOffencesData.length; j++) {
                if (this.agyincichgUpdatetList[i].chargedOicOffenceCode === this.oicOffencesData[j].oicOffenceCode) {
                    this.verifyFlag = true;
                }
            }
        }
        if (!this.verifyFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoicch.invalidchargevalue');
            this.show();
            return;
        }
        if (this.agyincichgInsertList.length === 0 && this.agyincichgUpdatetList.length === 0 && this.agyincichgDeleteList.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.nosetofrecordsexist');
            this.show();
            return;
        }
        this.agyincichgCommitModel.updateList = this.agyincichgUpdatetList;
        this.agyincichgCommitModel.deleteList = this.agyincichgDeleteList;
        this.agyincichgCommitModel.insertList = this.agyincichgInsertList;
        const agyincichgSaveData = this.ocuoicchFactory.
            agyInciChgCommit(this.agyincichgCommitModel);
        agyincichgSaveData.subscribe(agyincichgSaveResult => {
            if (agyincichgSaveResult === 1) {
                this.agyincichgExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.agyincichgData = agyincichgSaveResult;
                this.show();
            } 
            else if(agyincichgSaveResult==2){
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicch.childRecords');
                this.agyincichgData = agyincichgSaveResult;
                this.show();
                this.agyincichgExecuteQuery();
            }
            else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.agyincichgData = agyincichgSaveResult;
                this.show();
                this.agyincichgExecuteQuery();
            }
        });
    }

    /**
     * To display the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];

    }

    /**
     *  This function will be deleted when commit the event is
    * fired
    */
    ocuoicchDeleteagyincichgRecord() {
        this.agyincichgCommitModel.insertList = [];
        this.agyincichgCommitModel.deleteList = [];
        this.agyincichgDeleteList.push(this.agyincichgModel);
        this.agyincichgCommitModel.deleteList = this.agyincichgDeleteList;
        const agyincichgDeleteData = this.ocuoicchFactory.
            agyInciChgCommit(this.agyincichgCommitModel);
        agyincichgDeleteData.subscribe(agyincichgDeleteResult => {
            if (agyincichgDeleteResult === 0) {
            } else {
            }
        });
    }
    /**
     *  This function will be executed when Exit button event is
     * fired
     */
    ocuoicchClose(event) {
        this.dialog.close(null);
    }

    onExtScreenLaunchClick = (event) => {
        if (event.evidenceDisposeText === AppConstants.EINV) {
            this.dialogService.openLinkDialog('/OCUCIEID', event, 80).subscribe(result => {
            });
        }
    }
    ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }
}
