import { HttpService } from './../../../core/service/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcdlegloService } from '../service/ocdleglo.service';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';

@Component({
    selector: 'app-duration-to-line',
    templateUrl: './duration-to-line.component.html',
    styleUrls: ['./term-to-line.component.css']
})

export class DurationToLineComponent implements OnInit {
    durationToLineCoumndef: any[];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    durationToLineData: any[] = [];
    lovData = [];
    parentRecordType = '';
    @ViewChild('paroledurationgrid', { static: true }) paroledurationgrid: any;

    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    constructor(
        public translateService: TranslateService,
        private OcdlegloFactory: OcdlegloService,
        private loginService: LoginService,
        private http: HttpService
    ) {

    }
    ngOnInit() {
        this.loadColumnDefs();
        this.durationToLineData = this.dialog.data.terms ? JSON.parse(JSON.stringify(this.dialog.data.terms)) : [];
        this.lovData = this.dialog.data.lovData ? this.dialog.data.lovData : [];
        this.parentRecordType = this.dialog.data.sentenceCalcType ? this.dialog.data.sentenceCalcType : '';
    }

    durationDelete = () => {
        return true;
    }

    onDurationInsert = () => {
        if(this.durationToLineData.length === 0) {
            let addData = {
                termType: this.dialog.data.terms[0].termType,
            };
            return addData;
        } else {
            return false;
        }
    }

    loadColumnDefs() {
        const data = this.loginService.mainColDefData;
        let datatypeData = [];
        data.forEach(gridDef => {
            if (gridDef.grid_name == 'duration' && gridDef.module_name == 'OCDPAROR') {
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
        // const datatypeData = data && data.terms && JSON.parse(data.terms);
        const colDefs = [];
        datatypeData.forEach(type => {
            if (type.dataType === 'lov' && type.source === 'link') {
                if (type.field === 'termType' && this.lovData) {
                    colDefs.push({
                        datatype: type.dataType,
                        source: type.sourceType,
                        suppressMenu: true,
                        link: type.url.replace(':orderType', 'PAR').replace(':sentType', this.dialog.data.sentenceCalcType),
                        field: type.field,
                        fieldName: this.translateService.translate(type.fieldName),
                        editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true,
                        required: type.required
                    })
                }
                else {
                    colDefs.push({ datatype: type.dataType, source: type.sourceType, suppressMenu: true, link: type.url, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
                }
            } else if (type.dataType === 'lov' && type.source === 'domain') {
                colDefs.push({ datatype: type.dataType, domain: type.url, fieldName: this.translateService.translate(type.fieldName), field: type.field, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: true })
            } 
            else if (type.dataType === 'number') {
                colDefs.push({
                    datatype: type.dataType,
                    fieldName: this.translateService.translate(type.fieldName),
                    field: type.field,
                    format: type.format,
                    maxValue: type.maxValue,
                    strictFP: true,
                    whole: true,
                    editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true,
                    cellEditable: this.durationNumberEdit
                })
            } 
            else if (type.dataType === 'checkbox') {
                colDefs.push({
                    datatype: type.dataType,
                    fieldName: this.translateService.translate(type.fieldName),
                    editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true,
                    field: type.field,
                    modal: false,
                    data: 'row',
                    width: 200,
                    height: 'auto'
                })
            }
        })
        this.durationToLineCoumndef = [];
        colDefs.forEach(key => this.durationToLineCoumndef.push(key));
    }

    dataValidatation() {
        for (let i = 0; i < this.durationToLineData.length; i++) {
            let rowIndex = i + 1;
            let eachRowData = this.durationToLineData[i];
            if (Object.keys(eachRowData).length === 0 || eachRowData.termType == undefined || eachRowData.termType == "") {
                this.type = 'warn';
                this.message = this.translateService.translate('termToLine.pleaseselecttermtype');
                this.show();
                return false
            }
            if (eachRowData.indefinite && eachRowData.indefinite == true) {
                continue;
            }
            if (eachRowData.fixedExpiry && eachRowData.fixedExpiry == true) {
                continue;
            }
            for (var key in eachRowData) {
                let value: any = eachRowData[key];
                let config = this.getColumnConfig(key);
                if (!this.forEveryKeyValueInObj(config, value, rowIndex, key)) {
                    return false;
                }
            }
            if ((eachRowData.years == undefined || Number(eachRowData.years) == 0) &&
                (eachRowData.months == undefined || Number(eachRowData.months) == 0) &&
                (eachRowData.weeks == undefined || Number(eachRowData.weeks) == 0) &&
                (eachRowData.days == undefined || Number(eachRowData.days) == 0)
            ) {
                this.type = 'warn';
                this.message = this.translateService.translate('termToLine.totallengthcannotbezero');
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

    forEveryKeyValueInObj(config, value, rowIndex, key) {
        if (config.required && config.required == true) {
            if (value == undefined || value == '') {
                this.type = 'warn';
                this.message = this.translateService.translate('termToLine.pleaseselect') + ' ' + this.OcdlegloFactory.getDisplayedKey(key);
                this.show();
                return false
            }
            return true;
        }
        else if (!this.numberValidationPass(value, key, rowIndex)) {
            return false
        }
        return true;
    }


    numberValidationPass(value, key, rowIndex) {
        if (value !== '' && Number(value) < 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('termToLine.negativevalueisnotallowedfor') + ' ' + this.OcdlegloFactory.getDisplayedKey(key);
            this.show();
            return false;
        }
        else if (key.trim() != 'termType' && (value !== '' && this.isDecimal(Number(value)))) {
            if (key.trim() == 'days' || key.trim() == 'weeks') {
                this.type = 'warn';
                this.message = this.translateService.translate('termToLine.pleaseenterwholenumbers') + ' ' + this.OcdlegloFactory.getDisplayedKey(key);
                this.show();
                return false;
            }
            let haveHalf = Number(value) % 1 == 0.5;
            if (!((key.trim() == 'months' || key.trim() == 'years') && haveHalf)) {
                this.type = 'warn';
                this.message = this.translateService.translate('termToLine.pleaseselectdecimalonlyzeropointfivevaluesfor') + ' ' + this.OcdlegloFactory.getDisplayedKey(key);
                this.show();
                return false;
            }
            return true;
        }
        return true;
    }

    getColumnConfig(columName) {
        for (let i = 0; i < this.durationToLineCoumndef.length; i++) {
            if (columName == this.durationToLineCoumndef[i].field) {
                return this.durationToLineCoumndef[i];
            }
        }
    }

    save() {
        if (!this.dataValidatation()) {
            return false;
        }
        let opStr = '';
        this.durationToLineData.forEach((term) => {
            Object.keys(term).forEach(key => {
                if (term[key] == null) {
                    term[key] = "";
                } else if(term[key] && !isNaN(term[key]) && typeof term[key] == 'number') {
                    term[key] = term[key].toString();
                }
            });
        });

        this.durationToLineData.forEach((term, idx) => {
            if (term.indefinite && term.indefinite == true) {
                opStr = opStr + 'Indefinite';
            }
            if (term.fixedExpiry && term.fixedExpiry == true) {
                opStr = opStr + 'Fixed Expiry';
            }
            if (term.years) {
                let year = parseFloat(term.years).toString();
                opStr = opStr.concat(year).concat('y ')
            }
            if (term.months) {
                let month = parseFloat(term.months).toString();
                opStr = opStr.concat(month).concat('m ')
            }
            if (term.weeks) {
                let week = parseFloat(term.weeks).toString();
                opStr = opStr.concat(week).concat('w ')
            }
            if (term.days) {
                let day = parseFloat(term.days).toString();
                opStr = opStr.concat(day).concat("d ");
            }
            if (idx != this.durationToLineData.length - 1) {
                opStr = opStr.concat("\n");
            }
        })

        this.dialog.close({ "terms": this.durationToLineData, "duration": opStr });
    }
    calcDays(impRec: any) {
        let yDays = isNaN(+impRec.years) ? 0 : +impRec.years * 364;
        let mDays = isNaN(+impRec.months) ? 0 : +impRec.months * 30;
        let wDays = isNaN(+impRec.weeks) ? 0 : +impRec.weeks * 7;
        let dDays = isNaN(+impRec.days) ? 0 : +impRec.days;
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

    validateRowTerms = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;

        if (event.data && event.field == "indefinite" && event.data.indefinite && event.data.indefinite == true) {
            this.paroledurationgrid.setColumnData('years', rowIndex, '');
            this.paroledurationgrid.setColumnData('months', rowIndex, '');
            this.paroledurationgrid.setColumnData('weeks', rowIndex, '');
            this.paroledurationgrid.setColumnData('days', rowIndex, '');
            this.paroledurationgrid.setColumnData('fixedExpiry', rowIndex, false);
        }

        if (event.data && event.field == "fixedExpiry" && event.data.fixedExpiry && event.data.fixedExpiry == true) {
            this.paroledurationgrid.setColumnData('years', rowIndex, '');
            this.paroledurationgrid.setColumnData('months', rowIndex, '');
            this.paroledurationgrid.setColumnData('weeks', rowIndex, '');
            this.paroledurationgrid.setColumnData('days', rowIndex, '');
            this.paroledurationgrid.setColumnData('indefinite', rowIndex, false);
        }

        if (event.data && event.field == "years" && event.data.years && event.data.years != '' && event.data.years != undefined && event.data.years != 0) {
            this.paroledurationgrid.setColumnData('fixedExpiry', rowIndex, false);
            this.paroledurationgrid.setColumnData('indefinite', rowIndex, false);
        }

        if (event.data && event.field == "months" && event.data.months && event.data.months != '' && event.data.months != undefined && event.data.months != 0) {
            this.paroledurationgrid.setColumnData('fixedExpiry', rowIndex, false);
            this.paroledurationgrid.setColumnData('indefinite', rowIndex, false);
        }

        if (event.data && event.field == "weeks" && event.data.weeks && event.data.weeks != '' && event.data.weeks != undefined && event.data.weeks != 0) {
            this.paroledurationgrid.setColumnData('fixedExpiry', rowIndex, false);
            this.paroledurationgrid.setColumnData('indefinite', rowIndex, false);
        }

        if (event.data && event.field == "days" && event.data.days && event.data.days != '' && event.data.days != undefined && event.data.days != 0) {
            this.paroledurationgrid.setColumnData('fixedExpiry', rowIndex, false);
            this.paroledurationgrid.setColumnData('indefinite', rowIndex, false);
        }

        if (this.durationToLineData.filter(obj => obj.termType == event.data['termType']).length > 1) {
            // Termtype already Persent, reset to empty
            this.type = 'warn';
            this.message = this.translateService.translate('termToLine.duplicateterms');
            this.show();
            rowdata.validated = false;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }
    durationNumberEdit = (data: any, index: number, field: string) => {
        if(data.indefinite && field == 'years'){
            return false
        }
        if(data.indefinite && field == 'months'){
            return false
        }
        if(data.indefinite && field == 'weeks'){
            return false
        }
        if(data.indefinite && field == 'days'){
            return false
        }
        return true
    }

}
