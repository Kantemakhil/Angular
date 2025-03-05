import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/dynamic-alpine-grid/dynamic-alpine-grid.component';
import { OffenderSentenceAdjustment } from '@inst/legal/beans/OffenderSentenceAdjustment';


@Component({
    selector: 'app-remission',
    templateUrl: './remission-duration.component.html'
})

export class RemissionDurationComponent implements OnInit {
    remissionDurationCoumndef: any[];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    remissiondurationData: OffenderSentenceAdjustment[] = [];
    lovData = [];
    parentRecordType = '';
    @ViewChild('bookingsdurationgrid', { static: true }) durationgrid: any;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    constructor(
        public translateService: TranslateService
    ) {

    }
    ngOnInit() {
        this.remissiondurationData = [];
        this.remissionDurationCoumndef = [
            {
                fieldName: this.translateService.translate('oidcustad.years'), field: 'rdYears',
                editable: true, width: 190, datatype: 'number', maxValue: 9999, format: '1.1-1', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('oidcustad.months'), field: 'rdMonths',
                editable: true, width: 190, datatype: 'number', maxValue: 9999, format: '1.1-1', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('oidcustad.weeks'), field: 'rdWeeks',
                editable: true, width: 150,  maxValue: 9999, format: '1.1-1',minValue: 0, strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('oidcustad.days'), field: 'rdDays',
                editable: true, width: 190, datatype: 'number', maxValue: 9999, format: '1.1-1', minValue: 0, strictFP: true, whole: true
            }

        ];
        if (this.dialog.data) {
            this.remissionExecuteQuery(this.dialog.data);
        }
    }

    durationDelete = () => {
        return true;
    }

    onDurationInsert = () => {
        return {};
    }


    dataValidatation() {
        for (let i = 0; i < this.remissiondurationData.length; i++) {
            let rowIndex = i + 1;
            let eachRowData = this.remissiondurationData[i];
            for (var key in eachRowData) {
                if(key==='rdDays' || key==='rdMonths' || key==='rdWeeks' || key==='rdYears' ){
                    let value: any = eachRowData[key];
                    let config = this.getColumnConfig(key);
                    if (!this.forEveryKeyValueInObj(config, key,value)) {
                        return false;
                    }
                }
               
            }
            if ((eachRowData.rdYears == undefined || Number(eachRowData.rdYears) == 0) &&
                (eachRowData.rdMonths == undefined || Number(eachRowData.rdMonths) == 0) &&
                (eachRowData.rdWeeks == undefined || Number(eachRowData.rdWeeks) == 0) &&
                (eachRowData.rdDays == undefined || Number(eachRowData.rdDays) == 0)
            ) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcustad.totallengthcannotbezero');
                this.show();
                return false
            }
        }
        return true;
    }

    isDecimal(n) {
        var result = n - Math.floor(n) !== 0;
        if (result) return true;
        else return false;
    }

    forEveryKeyValueInObj(config,key, value) {
        if (config && config.required && config.required == true) {
            if (value == undefined || value == '') {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcustad.pleaseselect');
                this.show();
                return false;
            }
            return true;
        }
        else if (!this.numberValidationPass(key, value)) {
            return false;
        }
        return true;
    }


    numberValidationPass(key,value) {
        if (key !== '' && Number(key) < 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidcustad.negativenotallow');
            this.show();
            return false;
        }
        else if ((value !== '' && this.isDecimal(Number(value)))) {
            if ((key && key.trim()==='rdDays' || key.trim()==='rdWeeks')) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcustad.providewholenumbers');
                this.show();
                return false;
            }
            let haveHalf = Number(value) % 1 == 0.5;
            if (!((key==='rdMonths'  || key==='rdYears')  && haveHalf)) {
                this.type = 'warn';
                this.message = key==='rdMonths'?this.translateService.translate('oidcustad.providedecimals').replace("%days%","months"):this.translateService.translate('oidcustad.providedecimals').replace("%days%","years");
                this.show();
                return false;
            }
            return true;
        }
        return true;
    }

    getColumnConfig(columName) {
        for (let i = 0; i < this.remissionDurationCoumndef.length; i++) {
            if (columName == this.remissionDurationCoumndef[i].field) {
                return this.remissionDurationCoumndef[i];
            }
        }
    }

    save() {
        let opStr = 0;
        let year: number = 0;
        let month;
        let week;
        let day;
        let totaldays = 0;
        if (!this.affDisableFlag()) {
            if (!this.dataValidatation()) {
                return false;
            }
            this.remissiondurationData.forEach(term => {
                totaldays = this.calcDays(term);
                opStr = opStr + totaldays;
            })
            this.dialog.close({ "terms": this.remissiondurationData, "duration": opStr, "year": year, "month": month, "week": week, "day": day });
        } else {
            this.dialog.close(null);
        }
    }
    calcDays(impRec: any) {
        let yDays=0;
        if(impRec.rdYears && impRec.rdYears){
            let years=impRec.rdYears.toString().split(".");
            if(years && years.length>1){
                yDays=(isNaN(years[0]) ? 0 : +years[0] * 365)+(Number(years[1])===0?0:(6 * 30));
            }else{
                yDays = isNaN(+impRec.rdYears) ? 0 : +impRec.rdYears * 365;
            }
        }
        let mDays = isNaN(+impRec.rdMonths) ? 0 : +impRec.rdMonths * 30;
        let wDays = isNaN(+impRec.rdWeeks) ? 0 : +impRec.rdWeeks * 7;
        let dDays = isNaN(+impRec.rdDays) ? 0 : +impRec.rdDays;
        return yDays + mDays + wDays + dDays;
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    cancel(): void {
        this.dialog.close(null);
    }


    affDisableFlag() {
        if (this.durationgrid.addedMap.size > 0 || this.durationgrid.updatedMap.size > 0 ||
            this.durationgrid.updatedMap.size > 0) {
            return false;
        }
        return true;
    }


    onClearGrid = () => {
        const updatedData = this.remissiondurationData.filter(ele => ele['updated'] === 'Y', []);
        if (updatedData && updatedData.length > 0) {
            this.durationgrid.clearRecords(this.durationgrid.gridOptions);
        }
        return true;
    }
    remissionExecuteQuery(data) {
        if (data) {
            if(data['overallDuration']){
                data.rdDays = data['overallDuration'];
            }
            this.remissiondurationData.push(data);
        }
    }


    


}
