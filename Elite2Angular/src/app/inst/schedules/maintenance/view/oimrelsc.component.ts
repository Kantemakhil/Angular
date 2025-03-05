import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcdlegloService } from '@inst/legal/service/ocdleglo.service';
import { OimrelscService } from '@inst/schedules/maintenance/service/oimrelsc.service';
import { KeyDates } from '../beans/KeyDates';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';

@Component({
    selector: 'app-oimrelsc',
    templateUrl: './oimrelsc.component.html'
})

export class OimrelscComponent implements OnInit {
    @ViewChild('keyDateGrid', { static: true }) keyDateGrid: any;
    @ViewChild('alertsTypesGrid', { static: true }) alertsTypesGrid: any;
    @ViewChild('chargesIndGrid', { static: true }) chargesIndGrid: any;
    keyDatesGridColumnDef: any[];
    msgs: any[] = [];
    keyDatesGridData = [];
    keyDatesGridSortedData = [];
    sortingMap =[];
    tableIndex = -1;
    keyDatesGriModel: KeyDates = new KeyDates();
    alertTypeGridColumnDef: any[];
    chargeIndicatorGridColumnDef: any[];
    initialkeyDatesGridData: any[];
    currentkeyDatesGridData: any[];
    singleSaveBtnText = "Save";
    isSingleSaveBtnDisable: boolean = true;
    alertsGridData = [];
    alertsGridSortedData = [];
    alertsGridSortedDataTemp =[];
    initialAlertsGridData: any[];
    currentAlertsGridData: any[];
    tableIndexOne: number;
    chargeIndicatorGridData = [];
    chargeIndicatorGridSortData = [];
    chargeIndicatorGridSortDataOne = [];
    initialchargeIndicatorGridData: any[];
    currentchargeIndicatorGridData: any[];
    tableIndexTwo: number;
    type: string;
    vldmsg: string;



    constructor(private oimrelscFactory: OimrelscService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager, public loginService: LoginService, private ocdlegloFactory: OcdlegloService) {
        this.keyDatesGridColumnDef = [];
        this.alertTypeGridColumnDef = [];
        this.chargeIndicatorGridColumnDef = [];
    }
    ngOnInit() {
        this.loadkeyDatesGridData();
        //this.loadAlertsGridData();
        //this.loadChargeIndicaGridData();


    }


    loadkeyDatesGridData() {
        const data = this.loginService.mainColDefData;
        // const datatypeData = data && data.sanctions && JSON.parse(data.sanctions);
        let keyDatedatatypeData = [];
        let alertsdatatypeData = [];
        let chargeIndtypeData = [];
        data && data.forEach(gridDef => {
            if (gridDef.grid_name == 'keyDatesGrid' && gridDef.module_name == 'OIMRELSC') {
                keyDatedatatypeData = JSON.parse(gridDef.configData);
            }

            if (gridDef.grid_name == 'alerts' && gridDef.module_name == 'OIMRELSC') {
                alertsdatatypeData = JSON.parse(gridDef.configData);
            }


            if (gridDef.grid_name == 'chargeIndicatorGrid' && gridDef.module_name == 'OIMRELSC') {
                chargeIndtypeData = JSON.parse(gridDef.configData);
            }

        })
        this.keyDatesGridColumnDef = [];
        this.prepareColDef(keyDatedatatypeData).forEach(key => this.keyDatesGridColumnDef.push(key));
        this.alertTypeGridColumnDef = [];
        this.prepareColDef(alertsdatatypeData).forEach(key => this.alertTypeGridColumnDef.push(key));

        this.chargeIndicatorGridColumnDef = [];
        this.prepareColDef(chargeIndtypeData).forEach(key => this.chargeIndicatorGridColumnDef.push(key));
        setTimeout(() => {
            this.retrieveKeyDateGridData();
        }, 100);

    }

    loadAlertsGridData() {
        const data = this.loginService.mainColDefData;
        // const datatypeData = data && data.sanctions && JSON.parse(data.sanctions);
        let datatypeData = [];
        data && data.forEach(gridDef => {
            if (gridDef.grid_name == 'alerts' && gridDef.module_name == 'OIMRELSC') {
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
        this.alertTypeGridColumnDef = [];
        this.prepareColDef(datatypeData).forEach(key => this.alertTypeGridColumnDef.push(key));
    }


    loadChargeIndicaGridData() {
        const data = this.loginService.mainColDefData;
        // const datatypeData = data && data.sanctions && JSON.parse(data.sanctions);
        let datatypeData = [];
        data && data.forEach(gridDef => {
            if (gridDef.grid_name == 'chargeIndicatorGrid' && gridDef.module_name == 'OIMRELSC') {
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
        this.chargeIndicatorGridColumnDef = [];
        this.prepareColDef(datatypeData).forEach(key => this.chargeIndicatorGridColumnDef.push(key));

    }

    prepareColDef(coldefJson) {
        let colDefs = [];
        coldefJson.forEach(type => {
            if (type.dataType === 'lov' && type.source === 'link') {
                let lovRendered = 'description';
                if (type.field == 'court') {
                    lovRendered = 'code'
                }
                colDefs.push({ datatype: type.dataType, lovRender: lovRendered, source: type.sourceType,  link: type.url, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, parentFields: type.parentFields })
            }
            else if (type.dataType === 'lov' && type.source === 'domain') {
                colDefs.push({ datatype: type.dataType, domain: type.url, parentField: type.parentField,  field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'text') {
                colDefs.push({ datatype: type.dataType, wrapText: true, width: 80,  hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'number') {
                colDefs.push({ datatype: type.dataType, whole: type.whole ? type.whole : false, maxValue: type.maxValue ? type.maxValue : undefined, width: 40,  hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'launchbutton') {
                colDefs.push({ datatype: type.dataType, width: 100, parentField: type.parentField,  field: type.field, fieldName: '', required: type.required, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' })
            }
            else if (type.dataType === 'hyperlink') {

                colDefs.push({ datatype: 'hyperlink', width: 50, displayas: 'image',  parentField: type.parentField, required: type.required, fieldName: '', field: type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' })
            }
            else if (type.dataType === 'date' && type.field === 'orderedDate') {
                colDefs.push({ datatype: type.dataType, field: type.field, fieldName: this.translateService.translate(type.fieldName), width: 100,  editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'date') {
                colDefs.push({ datatype: type.dataType,  field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'checkbox') {
                colDefs.push({ datatype: type.dataType, width: 40, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
        });
        return colDefs;
    }


    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * This function displays the messages
     */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }


    onRowClickoimrelscKeyDate(event) {
        if (event) {
        }
    }


    retrieveKeyDateGridData() {
        const form_identifiers = {};
        const retData = {
            relSchSettingType: 'KEY_DATE',
        }
        this.oimrelscFactory.retrieveGridData(retData).subscribe((data: any) => {
            this.keyDatesGridData = [];
            this.initialkeyDatesGridData = [];
            this.currentkeyDatesGridData = [];
            this.alertsGridData = [];
            this.initialAlertsGridData = [];
            this.currentAlertsGridData = [];
            this.chargeIndicatorGridData = [];
            this.initialchargeIndicatorGridData = [];
            this.currentchargeIndicatorGridData = [];
            data.forEach(element => {
                if (element.relSchSettingType === 'KEY_DATE') {
                    if (element && element.relSchSettingValue) {
                        this.tableIndex = 0;
                        this.keyDatesGridSortedData = (JSON.parse(element.relSchSettingValue));
                        this.keyDatesGridData = this.keyDatesGridSortedData.sort((a,b) => this.compare(a,b));
                        this.currentkeyDatesGridData = JSON.parse(JSON.stringify(this.keyDatesGridData));
                        this.initialkeyDatesGridData = JSON.parse(JSON.stringify(this.keyDatesGridData));
                    } else {
                        this.keyDatesGridData = [];
                        this.initialkeyDatesGridData = [];
                        this.currentkeyDatesGridData = [];
                    }
                }
                if (element.relSchSettingType === 'ALERTS') {
                    if (element && element.relSchSettingValue) {
                        this.tableIndexOne = 0;               
                        this.alertsGridSortedData = (JSON.parse(element.relSchSettingValue));
                        this.alertsGridData = this.alertsGridSortedData.sort((a,b) => this.compare(a,b));
                        this.initialAlertsGridData = JSON.parse(JSON.stringify(this.alertsGridData));
                        this.currentAlertsGridData = JSON.parse(JSON.stringify(this.alertsGridData));
                    } else {
                        this.alertsGridData = [];
                        this.initialAlertsGridData = [];
                        this.currentAlertsGridData = [];
                    }
                }

                if (element.relSchSettingType === 'CHARGE_IND') {
                    if (element && element.relSchSettingValue) {
                        this.tableIndexOne = 0;
                        this.chargeIndicatorGridSortData = (JSON.parse(element.relSchSettingValue));
                        this.chargeIndicatorGridData = this.chargeIndicatorGridSortData.sort((a,b) => this.compare(a,b));
                        this.initialchargeIndicatorGridData = JSON.parse(JSON.stringify(this.chargeIndicatorGridData));
                        this.currentchargeIndicatorGridData = JSON.parse(JSON.stringify(this.chargeIndicatorGridData));
                    } else {
                        this.chargeIndicatorGridData = [];
                        this.initialchargeIndicatorGridData = [];
                        this.currentchargeIndicatorGridData = [];
                    }
                }

            });

        })

    }

    retrieveAlertGridData() {
        const form_identifiers = {};
        const retData = {
            relSchSettingType: 'ALERTS',
        }
        this.oimrelscFactory.retrieveAlertGridData(retData).subscribe((data: any) => {
            if (data && data.relSchSettingValue) {
                this.tableIndexOne = 0;
                this.alertsGridData = (JSON.parse(data.relSchSettingValue));
                this.initialAlertsGridData = JSON.parse(JSON.stringify(this.alertsGridData));
                this.currentAlertsGridData = JSON.parse(JSON.stringify(this.alertsGridData));
            } else {
                this.alertsGridData = [];
                this.initialAlertsGridData = [];
                this.currentAlertsGridData = [];
            }
        })

    }

    modifyDataForTermTypeAndLength(apiData) {
        let returnApiData = [];
        for (let k = 0; k < apiData.length; k++) {
            let unchangedEveryData = { ...apiData[k] };
            this.keyDatesGridData.forEach(element => {
                if ((unchangedEveryData["relSchSettingType"] === element.sentenceCalcType) && element.sanctionsFlag) {
                    returnApiData.push(unchangedEveryData)
                }
            })

        }
        return returnApiData;
    }


    /**
     *  This function will be executed when commit event is fired
    */
    oimrelscKeyDateSaveForm(event) {
        //this.isSingleSaveBtnDisable = true;
    }

    onRowClickoimrelscAlerts(event) {
        //this.isSingleSaveBtnDisable = true;
    }
    onRowClickChargesData(event) {
        //this.isSingleSaveBtnDisable = true;
    }

    onSaveApiCall() {
        let finalkeyDateObj = {
            relSchSettingType: 'KEY_DATE',
            relSchSettingValue: JSON.stringify(this.keyDatesGridData),
        };

        let finalAlertsObj = {
            relSchSettingType: 'ALERTS',
            relSchSettingValue: JSON.stringify(this.alertsGridData),
        };

        let finalChatgeIndObj = {
            relSchSettingType: 'CHARGE_IND',
            relSchSettingValue: JSON.stringify(this.chargeIndicatorGridData),
        };

        const submissionData = {
            keyDatesData: finalkeyDateObj,
            alertsGridData: finalAlertsObj,
            finalChargeIndData: finalChatgeIndObj

        }

        if (this.keyDatesGridData.length > 0) {
            if (!this.keyDatesGridMandValidationData()) {
                return;
            }
            for (let i = 0; i < this.keyDatesGridData.length - 1; i++) {
                const dublist = this.keyDatesGridData.filter(e => e['dateType'] === this.keyDatesGridData[i]['dateType']);
                if (dublist.length > 1) {
                    this.type = 'warn';
                    this.vldmsg = this.translateService.translate('oimrelsc.datetypeshouldnotbeduplicate');
                    this.show(this.vldmsg, this.type);
                    return false;
                }
            }
        }


        if (this.alertsGridData.length > 0) {
            if (!this.AlertsGridMandValidationData()) {
                return;
            }
            for (let i = 0; i < this.alertsGridData.length - 1; i++) {
                const dublist = this.alertsGridData.filter(e => e['alertType'] === this.alertsGridData[i]['alertType'] && e['alertCode'] === this.alertsGridData[i]['alertCode']);
                if (dublist.length > 1) {
                    this.type = 'warn';
                    //oimrelsc.alerttypeshouldnotbeduplicate
                    this.vldmsg = this.translateService.translate('oimrelsc.alerttypeandalertcodeshouldnotbeduplicate');
                    this.show(this.vldmsg, this.type);
                    return false;
                }
            }
        }

        if (this.chargeIndicatorGridData.length > 0) {
            if (!this.chargeIndicatorGridMandValidationData()) {
                return;
            }

            for (let i = 0; i < this.chargeIndicatorGridData.length - 1; i++) {
                const dublist = this.chargeIndicatorGridData.filter(e => e['chargeIndicator'] === this.chargeIndicatorGridData[i]['chargeIndicator']);
                if (dublist.length > 1) {
                    this.type = 'warn';
                    this.vldmsg = this.translateService.translate('oimrelsc.indicatorshouldnotbeduplicate');
                    this.show(this.vldmsg, this.type);
                    return false;
                }
            }
        }


        this.oimrelscFactory.saveData(submissionData).subscribe(data => {
            //submit success
            if (data) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.isSingleSaveBtnDisable = true;
                const submitDataTemp = JSON.parse(JSON.stringify(data));
                this.retrieveKeyDateGridData();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }

    keyDatesGridMandValidationData = () => {
        const is = { valid: true };
        if (this.keyDatesGridData && this.keyDatesGridData) {
            this.keyDatesGridData.forEach(element => {
                if (!element['dateType']) {
                    this.show(this.translateService.translate('oimrelsc.datetypemustbeentered'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            });
        }
        return is.valid;
    }

    AlertsGridMandValidationData = () => {
        const is = { valid: true };
        if (this.alertsGridData && this.alertsGridData) {
            this.alertsGridData.forEach(element => {
                if (!element['alertType']) {
                    this.show(this.translateService.translate('oimrelsc.alerttypemustbeentered'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (!element['alertCode']) {
                    this.show(this.translateService.translate('oimrelsc.alertmustbeentered'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            });
        }
        return is.valid;
    }



    chargeIndicatorGridMandValidationData = () => {
        const is = { valid: true };
        if (this.chargeIndicatorGridData && this.chargeIndicatorGridData) {
            this.chargeIndicatorGridData.forEach(element => {
                if (!element['chargeIndicator']) {
                    this.show(this.translateService.translate('oimrelsc.chargeindicatormustbeentered'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            });
        }
        return is.valid;
    }

    onSave(event) {
        let keyDatesChanged = this.ocdlegloFactory.isGridDataModified(this.initialkeyDatesGridData, this.keyDatesGridData);
        let isAlertsChanged = this.ocdlegloFactory.isGridDataModified(this.initialAlertsGridData, this.alertsGridData);
        let isChargesGridChanged = this.ocdlegloFactory.isGridDataModified(this.initialchargeIndicatorGridData, this.chargeIndicatorGridData);

        if (!keyDatesChanged && !isAlertsChanged && !isChargesGridChanged) {
            this.show(this.translateService.translate('ocdleglo.nodatamodified'), 'warn');
            return false;
        }
        else {
            this.onSaveApiCall();
        }
    }

    clear() {

    }

    setExternalSaveButton() {
        if (this.ocdlegloFactory.isGridDataModified(this.initialkeyDatesGridData, this.keyDatesGridData) ||
            this.ocdlegloFactory.isGridDataModified(this.initialAlertsGridData, this.alertsGridData) ||
            this.ocdlegloFactory.isGridDataModified(this.initialchargeIndicatorGridData, this.chargeIndicatorGridData)) {
            // this.OcdlegloFactory.isGridDataModified(this.initialChargesGridData, this.chargesRowData)) {
            this.isSingleSaveBtnDisable = false;
        }
        else {
            this.isSingleSaveBtnDisable = true;
        }
    }



    onUpdatedMapsData(event, gridName?: string) {
        this.setExternalSaveButton();
        if (gridName == "keyDatesGrid") {
            if (gridName == "keyDatesGrid" && (this.currentkeyDatesGridData[event.index] && this.currentkeyDatesGridData[event.index].relSchSettingType !== event.updated.relSchSettingType)

            ) {
                this.currentkeyDatesGridData[event.index] = JSON.parse(JSON.stringify(event.updated));
            }
        }
        if (gridName == "alertsTypesGrid") {
            if (gridName == "alertsTypesGrid" && (this.currentAlertsGridData[event.index] && this.currentAlertsGridData[event.index].relSchSettingType !== event.updated.relSchSettingType)

            ) {
                this.currentAlertsGridData[event.index] = JSON.parse(JSON.stringify(event.updated));
            }
        }

        if (gridName == "chargesIndGrid") {
            if (gridName == "chargesIndGrid" && (this.currentchargeIndicatorGridData[event.index] && this.currentchargeIndicatorGridData[event.index].relSchSettingType !== event.updated.relSchSettingType)

            ) {
                this.currentchargeIndicatorGridData[event.index] = JSON.parse(JSON.stringify(event.updated));
            }
        }
    }

    onMapsData(event, gridName?: string) {
        this.setExternalSaveButton();
        if (gridName == "keyDateGrid") {
            this.keyDateGrid.push(JSON.parse(JSON.stringify(event.added)))
        }
        if (gridName == "alertsTypesGrid") {
            this.alertsTypesGrid.push(JSON.parse(JSON.stringify(event.added)))
        }
        if (gridName == "chargesIndGrid") {
            this.chargesIndGrid.push(JSON.parse(JSON.stringify(event.added)))
        }
    }

    onclearedData(event, gridName?: string) {
        this.loadkeyDatesGridData();
        this.isSingleSaveBtnDisable = true;
    }


    keyDateDelete = () => {
        this.setExternalSaveButton();
    }
    onGridDelete = () => {
        this.isSingleSaveBtnDisable = false;
        return true;
    }


    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'alertType') {
            this.alertsTypesGrid.setColumnData('alertCode', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }

    compare( a, b ) {
        if ( Number(a.listSeq) < Number(b.listSeq)){
          return -1;
        }
        if ( Number(a.listSeq) > Number(b.listSeq)){
          return 1;
        }
        return 0;
      }

}