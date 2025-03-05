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
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ocdchgdt',
    templateUrl: './ocdchgdt.component.html',
    styleUrls: ['./ocdchgdt.component.css']
})
export class OcdchgdtComponent implements OnInit {

    @ViewChild('ocdchgdtgrid', { static: true }) ocdchgdtgrid: any;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    message = ' Invalid.';
    msglist = [];
    type = 'error';
    myJsonRowData: any = [];
    inActiveCharges: any = [];
    myColDefs: any[];
    msgs: any[];
    dataId: any;
    screenName = 'ocdchgdt';
    savedData = [];
    btnDisable: boolean = false;
    offenderBookId: any;
    linkedChargesList = new Set();
    dialogRef: MatDialogRef<ConfirmationDialogComponent> | null;
    applyTransaction: boolean = false;
    linkedOrdCharges = [];
    chargeData: any = {};
    chargeRowData: any = {};
    indicatorsSelectedRow = 0;
    indicatorsColDef: any;
    indicatorsRowData = [];
    isDisabled = false;
    offenderCharges = [];
    dataUpdated: boolean = false;
    initialChargeData =[];
    notAllowCharacters = ['"','\\'];
    constructor(private OcdchgsuFactory: OcdchgsuService, public translateService: TranslateService,
        public loginService: LoginService, public dialogService: DialogService,
        private offenderSearchService: OffenderSearchService,
        private OcdlegloFactory: OcdlegloService,
        public dialogMat: MatDialog,
        private eoffenderService: EoffenderService,private router: Router) {
    }

    ngOnInit(): void {
        this.isDisabled = this.dialog.data.isDisabled;
        this.chargeRowData=null;
        if(this.dialog.data.fromScreen === 'OCDPSREP') {
            this.isDisabled = true;
        }
        if(this.isDisabled) {
            const form_identifiers = {};
            form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId;
            const retData = {
                formName : 'OCDCHGSU',
                id : this.dataId?this.dataId : 0,
                searchString : JSON.stringify(form_identifiers)
            }
            this.OcdchgsuFactory.loadData(retData).subscribe((data: any) => {
                if (data && data.formInfoJson) {
                    data.formInfoJson = this.clone(JSON.parse(data.formInfoJson));
                    const chgList = data.formInfoJson.filter(ele=> this.dialog.data.chargeId == ele.chargeId);
                    if (chgList.length) {
                        this.OcdchgsuFactory.getAllOffences().subscribe(offenceList => {
                            this.chargeData = this.clone(chgList[0]);
                            let selectOffence = offenceList.filter(i => i.offenceId == this.chargeData.offenceId)[0];
                            this.chargeData['code'] = selectOffence.code ? selectOffence.code : undefined;
                            this.chargeRowData = JSON.parse(JSON.stringify(this.chargeData));
                            this.chargeRowData['offenderBookId'] = this.dialog.data.offenderBookId + '';
                            this.chargeRowData['displayNo'] = this.dialog.data.displayNo;
                            this.chargeRowData['orderType'] = this.dialog.data.orderType;
                            this.chargeRowData['recordId'] = this.dialog.data.recordId;
                            this.eoffenderService.selectedRowData = this.chargeRowData;
                            this.initialChargeData = JSON.parse(JSON.stringify(this.chargeData));
                            this.offindExecuteQuery();
                        });
                    }
                }
            })
        } else {
            this.chargeData = this.clone(this.dialog.data);
            this.chargeRowData= JSON.parse(JSON.stringify(this.chargeData));
            this.chargeRowData['offenderBookId']= this.dialog.data.offenderBookId + '';
            this.chargeRowData['displayNo']= this.dialog.data.displayNo;
            this.eoffenderService.selectedRowData=this.chargeRowData;
            this.initialChargeData = JSON.parse(JSON.stringify(this.chargeData));
            this.offenderCharges = this.clone(this.dialog.data['charges']);
            this.dataId = this.dialog.data.dataId;
            this.offindExecuteQuery();
        }
        this.indicatorsColDef = [
            {
                fieldName: this.translateService.translate('ocdchgdt.indicatorcode'), field: 'indicatorCode', editable: true, width: 100,
                datatype: 'lov', domain: 'OFFENCE_IND'
            },
        ];
        
    }
    offindExecuteQuery() {
        this.OcdchgsuFactory.getAllOffences().subscribe(Offences => {
            let statuteCode = '';
            let offenceCode = '';
            let offenceId = '';
            Offences.forEach(offence => {
                if (offence.code == this.chargeData.code) {
                    statuteCode = offence.statuteCode;
                    offenceCode = offence.code;
                    offenceId = offence.offenceId;
                    this.chargeData.category = offence.hoCode;
                    this.chargeData.severity = offence.severityRanking;
                    this.initialChargeData = JSON.parse(JSON.stringify(this.chargeData));
                }
            })
            var input = { "offenceCode": offenceCode, "statuteCode": statuteCode,"offenceId": offenceId};
            this.OcdchgsuFactory.offIndExecuteQuery(input).subscribe(returnList => {
                if (returnList.length) {
                    this.indicatorsRowData = returnList;
                    this.indicatorsSelectedRow = 0;
                } else {
                    this.indicatorsRowData = [];
                }
            });
        });
    }
    onButSaveClick() {
        if (!this.validateDetails()) {
            return;
        }
        this.offenderCharges.forEach(ele => {
            if (ele.chargeId  && this.chargeData.chargeId && ele.chargeId == this.chargeData.chargeId) {
                ele.Range = DateFormat.getDate(this.chargeData.Range) + '' != 'Invalid Date'? this.chargeData.Range:'';
                ele.plea = this.chargeData.plea;
                ele.incidentDate = DateFormat.getDate(this.chargeData.incidentDate) + '' != 'Invalid Date'?this.chargeData.incidentDate:'';
                ele.particulars = this.chargeData.particulars;
            }
        })
        var form_identifiers = {};
        var submitData = JSON.parse(JSON.stringify(this.offenderCharges));
        submitData.forEach(obj => {
            obj = this.processResult(obj);
        })
        form_identifiers['offenderBookId'] = this.dialog.data.offenderBookId + '';
        const submissionData = {
            formName: 'ocdchgsu',
            id: this.dataId ? this.dataId : 0,
            formInfoJson: JSON.stringify(submitData),
            formIdentifier: JSON.stringify(form_identifiers)
        }
        this.OcdchgsuFactory.saveData(submissionData).subscribe(data => {
            if (data) {
                this.dataUpdated = true;
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.type = 'success';
                this.show();
                this.dialog.close(this.dataUpdated);
            } else {
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.type = 'error';
                this.show();
            }
        });
    }

    validateDetails() {
        if (!moment(this.chargeData.incidentDate, "YYYY-MM-DDThh:mm:ss").toDate()) {
            this.message = this.translateService.translate('ocdchgsu.enterdateformat').replace('%fieldname%', this.translateService.translate('ocdchgdt.incidentDate')).replace('%dateFormat%', DateFormat.dateFormat);
            this.type = 'warn';
            this.show();
            return;
        }
        if (!moment(this.chargeData.Range, "YYYY-MM-DDThh:mm:ss").toDate()) {
            this.message = this.translateService.translate('ocdchgsu.enterdateformat').replace('%fieldname%', this.translateService.translate('ocdchgdt.range')).replace('%dateFormat%', DateFormat.dateFormat);
            this.type = 'warn';
            this.show();
            return;
        }
        try {
            var date = moment(this.chargeData.incidentDate, "YYYY-MM-DDThh:mm:ss").toDate();
            this.chargeData.incidentDate = date;
        } catch (error) {
            this.message = this.translateService.translate('ocdchgsu.enterdateformat').replace('%fieldname%', this.translateService.translate('ocdchgdt.incidentDate')).replace('%dateFormat%', DateFormat.dateFormat);
            this.type = 'warn';
            this.show();
            return;
        }
        try {
            var date = moment(this.chargeData.Range, "YYYY-MM-DDThh:mm:ss").toDate();
            this.chargeData.Range = date;
        } catch (error) {
            this.message = this.translateService.translate('ocdchgsu.enterdateformat').replace('%fieldname%', this.translateService.translate('ocdchgdt.range')).replace('%dateFormat%', DateFormat.dateFormat);
            this.type = 'warn';
            this.show();
            return;
        }

        if (DateFormat.compareDate(this.chargeData.incidentDate, DateFormat.getDate()) === 1) {
            this.message = this.translateService.translate('ocdchgsu.greaterthansysdate').replace('%fieldname%', this.translateService.translate('ocdchgdt.incidentDate'));
            this.type = 'warn';
            this.show();
            return;
        }
        if (DateFormat.compareDate(this.chargeData.Range, DateFormat.getDate()) === 1) {
            this.message = this.translateService.translate('ocdchgsu.greaterthansysdate').replace('%fieldname%', this.translateService.translate('ocdchgdt.range'));
            this.type = 'warn';
            this.show();
            return;
        }
        if (!this.chargeData.incidentDate && this.chargeData.Range) {
            this.message = this.translateService.translate('ocdchgsu.selectincident');
            this.type = 'warn';
            this.show();
            return;
        }
        if (this.chargeData.incidentDate && this.chargeData.Range && DateFormat.compareDate(moment(this.chargeData.incidentDate, "YYYY-MM-DDThh:mm:ss").toDate(), moment(this.chargeData.Range, "YYYY-MM-DDThh:mm:ss").toDate()) === 1) {
            this.message = this.translateService.translate('ocdchgsu.rangegrtincidentdate');
            this.type = 'warn';
            this.show();
            return;
        }
        return true;
    }
    onButExitClick() {
        this.dialog.close(null);

    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    clone(obj) { return JSON.parse(JSON.stringify(obj)) }

    processResult(obj) {
        Object.keys(obj).forEach(key => {
            if (key.includes('___') ||!["chargeId","incidentDate","Range","plea","particulars","offenceId","matter","outcome","type"].includes(key)) {
                delete obj[key];
            }
        })
        return obj;
    }
    get isSaveDisabled() {
        if(JSON.stringify(this.initialChargeData) == JSON.stringify(this.chargeData)){
            return true;
        }
        return false;
    }
    ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }
}
