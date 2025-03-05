
import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { MaintainTierDefaultEvents } from '../beans/MaintainTierDefaultEvents';
import { MaintainTierLevelsCommitBean } from '../beans/MaintainTierLevelsCommitBean';
import { OcmtidetService } from '../service/ocmtidet.service';
@Component({
    selector: 'app-ocmtidet',
    templateUrl: './ocmtidet.component.html',
    styleUrls: ['./ocmtidet.component.scss']
})
export class OcmtidetComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('grid', { static: true }) grid: any;
    @ViewChild('myForm') form: any;
    msgs: any[] = [];
    defaultIntakeTier: string;
    defEventsColumnDef: any[];
    defEventsRowData: MaintainTierDefaultEvents[] = [];
    defEventsRowDataTemp: MaintainTierDefaultEvents[] = [];
    insertDefEventsList: MaintainTierDefaultEvents[] = [];
    updateDefEventsList: MaintainTierDefaultEvents[] = [];
    deleteDefEventsList: MaintainTierDefaultEvents[] = [];
    displayParameters = [
        { code: 'daily', description: 'Daily' },
        { code: 'weekly', description: 'Weekly' },
        { code: 'monthly', description: 'Monthly', disable: true }
    ];
    intervalLabelName = 'Weekly';
    FREQ = "weekly";
    until = true;
    totalcount: boolean = false;
    endOptions: { code: string; description: string; }[];
    BYDAY = [];
    interval = 1;
    daily = true;
    weekly = true;
    monthly = false;
    endTitles = { description: 'Range of Recurrence' };
    selectedEnd = "until";
    selectedEndDate = new Date();
    selectedTotalCount: number = 1;
    selectedMonthDay = 0;
    monthNumbers = [];
    tierLevelCode: string;
    tierDefaultEvents: MaintainTierDefaultEvents = new MaintainTierDefaultEvents();
    maintainTierLevelsTemp: MaintainTierDefaultEvents = new MaintainTierDefaultEvents();
    maintainTierLevelsTempOne: MaintainTierDefaultEvents = new MaintainTierDefaultEvents();
    recurrenceTitles = { description: 'Recurrence' };
    tempUiRules: string;
    weekCollection = [
        { id: 'weekday-mon', name: 'M', checked: false, value: 'MONDAY' },
        { id: 'weekday-tue', name: 'T', checked: false, value: 'TUESDAY' },
        { id: 'weekday-wed', name: 'W', checked: false, value: 'WEDNESDAY' },
        { id: 'weekday-thu', name: 'T', checked: false, value: 'THURSDAY' },
        { id: 'weekday-fri', name: 'F', checked: false, value: 'FRIDAY' },
        { id: 'weekday-sat', name: 'S', checked: false, value: 'SATURDAY' },
        { id: 'weekday-sun', name: 'S', checked: false, value: 'SUNDAY' }
    ];
    tierLevelCommitModel: MaintainTierLevelsCommitBean = new MaintainTierLevelsCommitBean();
    message: string;
    type: string;
    msglist = [];
    flag = false;
    rowIndex = -1;
    selected = -1;
    validate: string;
    constructor(private ocmtidetFactory: OcmtidetService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
        this.defEventsColumnDef = [];
    }
    ngOnInit(): void {
        this.weekly = true;
        this.tierLevelCode = this.dialog['data'].code;
        this.tierdefaultEvents();
        this.endOptions = [
            { code: 'until', description: 'Date' },
            { code: 'totalcount', description: 'Number of Occurrences' }
        ];

        this.defaultIntakeTier = "ocmtirlv/rgIntakeTierRecordGroup";
        this.defEventsColumnDef = [
            { fieldName: this.translateService.translate('ocmtidet.scheduletype'), field: 'scheduleType', datatype: 'lov', editable: true, domain: 'EVENTS', cellEditable: this.codeCellEdit, required: true },
            { fieldName: this.translateService.translate('ocmtidet.schedulesubtype'), field: 'scheduleSubType', datatype: 'lov', editable: true, domain: 'EVENTS', parentField: 'scheduleType', cellEditable: this.codeCellEdit, required: true },
            { fieldName: '', field: 'tierId', datatype: 'number', editable: true, hide: true },
            { fieldName: '', field: 'uiRules', datatype: 'text', editable: true, hide: true },

        ];

    }

    codeCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    onGridInsert = () => {
        if (!this.tierLevelCode.trim()) {
            this.type = 'warn';
            this.message = this.translateService.translate('Select Tier Level');
            this.show();
            return;
        }
        let RecurrenceRule = {};
        RecurrenceRule['FREQ'] = this.FREQ.toUpperCase();
        RecurrenceRule['BYDAY'] = this.BYDAY;
        if (this.selectedEnd) {
            if (this.selectedEnd.toUpperCase() == "UNTIL") {
                RecurrenceRule['UNTIL'] = DateFormat.getDate();
            }
            if (this.selectedEnd.toUpperCase() == "TOTALCOUNT") {
                RecurrenceRule['COUNT'] = 1;
            }
        }
        RecurrenceRule['INTERVAL'] = 1;
        var objData = JSON.stringify(RecurrenceRule);
        return {
            tierId: this.defEventsRowData.length, uiRules: objData

        };
    }
    onLocationBlur() {
        if (!this.tierLevelCode) {
            this.tierLevelCode = this.tierLevelCode === '' ? undefined : '';
        }
    }

    modelChange(event) {
        if (event) {
            this.tierDefaultEvents.tierLevelcode = event.code;
        } else {
            this.tierDefaultEvents.tierLevelcode = undefined;
        }
        this.tierdefaultEvents();
    }

    handleChange(evt) {
        this.FREQ = evt.toLowerCase();
        let tData = {};
        if (evt.toLowerCase() == "daily") {
            this.daily = true;
            this.monthly = false;
            this.weekly = false;
            this.intervalLabelName = 'Daily';
            tData['BYDAY'] = [];
        }
        else if (evt.toLowerCase() == "weekly") {
            this.daily = false;
            this.monthly = false;
            this.weekly = true;
            this.intervalLabelName = 'Weekly';
        }
        else if (evt.toLowerCase() == "monthly") {
            this.daily = false;
            this.monthly = true;
            this.weekly = false;
            this.intervalLabelName = 'Monthly';
        }


        if (this.maintainTierLevelsTempOne.uiRules) {
            tData = JSON.parse(this.maintainTierLevelsTempOne.uiRules);
        }
        if (evt.toLowerCase() == "daily") {
            tData['BYDAY'] = [];
        }
        tData['FREQ'] = [];
        if (evt) {
            tData['FREQ'] = evt.toUpperCase();
        }
        tData = JSON.stringify(tData);
        this.grid.setColumnData('uiRules', this.maintainTierLevelsTempOne.tierId, tData);
    }

    displayParameterLabel(event) {
        if (event === 'weekly') {
            return 'Weekly';
        } else if (event == 'daily') {
            return 'Daily';
        } else if (event == 'monthly') {
            return 'Monthly';
        } else {
            return '';
        }

    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

    onSelectEnd(ev) {
        let RecurrenceRule = {};
        if (ev) {
            if (this.maintainTierLevelsTempOne.uiRules) {
                var data = JSON.parse(this.maintainTierLevelsTempOne.uiRules);
                RecurrenceRule = data;
            }
            if (ev.code == "never") {
                this.until = false;
                this.totalcount = false;
            }
            else if (ev.code == "until") {
                this.selectedTotalCount = 0;
                this.selectedEndDate = new Date();
                this.until = true;
                this.totalcount = false;
                if (RecurrenceRule['COUNT']) {
                    RecurrenceRule['COUNT'] = undefined;
                }
                if (RecurrenceRule['UNTIL']) {
                    this.selectedEndDate = RecurrenceRule['UNTIL'];
                } else {
                    RecurrenceRule['UNTIL'] = this.selectedEndDate;
                }
                var objData = JSON.stringify(RecurrenceRule);
                this.grid.setColumnData('uiRules', this.maintainTierLevelsTempOne.tierId, objData);
            } else if (ev.code == "totalcount") {
                if (RecurrenceRule['COUNT']) {
                    this.selectedTotalCount = RecurrenceRule['COUNT'];
                } else {
                    this.selectedTotalCount = 1;
                }
                this.totalcount = true;
                this.until = false;
                this.selectedEndDate = undefined;
                RecurrenceRule['COUNT'] = this.selectedTotalCount;
                if (RecurrenceRule['UNTIL']) {
                    RecurrenceRule['UNTIL'] = undefined;
                }
                var objData = JSON.stringify(RecurrenceRule);
                this.grid.setColumnData('uiRules', this.maintainTierLevelsTempOne.tierId, objData);
            }

        } else {
            this.until = false;
            this.totalcount = false;
        }
    }
    cancel() {
        this.dialog.close(null);
    }



    addMainDefEventsData() {
        this.insertDefEventsList = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.insertDefEventsList.push(v);
            }
        );
    }

    updateMainDefEventsData() {
        this.updateDefEventsList = [];
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.updateDefEventsList.push(v);
            }
        );
    }

    removedMainDefEventsData() {
        this.deleteDefEventsList = [];
        this.grid.removedMap.forEach(
            (v: any, k: number) => {
                this.deleteDefEventsList.push(v);
            }
        );
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }


    tierdefaultEvents() {
        const obj = this.ocmtidetFactory.tierdefaultEventsExecuteQuery(this.tierDefaultEvents);
        obj.subscribe(data => {
            if (data.length > 0) {
                this.defEventsRowData = data;
                data.forEach((e, index) => {
                    e.tierId = index;
                });
                this.defEventsRowDataTemp = data;
                JSON.parse(JSON.stringify(this.defEventsRowDataTemp));
                this.selected = 0;
                this.validate =  this.defEventsRowDataTemp[0].sealFlag;
            } else {
                this.defEventsRowData = [];
                this.interval = 1;
                this.selectedEndDate = DateFormat.getDate();
                this.weekCollection.forEach(e => {
                    if (e.value) {
                        e.checked = false;
                    }
                });
                this.selected = -1;
                this.validate = undefined;
                //this.handleChange('weekly');
            }
        })
    }


    clearBtn() {
        this.tierdefaultEvents();
        this.selectedEndDate = DateFormat.getDate();
        this.interval = undefined;
        this.selectedTotalCount = undefined;
    }


    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'scheduleType') {
            if (!event.data.scheduleType) {
                this.grid.setColumnData('scheduleSubType', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.data.scheduleType && event.data.scheduleSubType) {
            this.flag = true;
        } else {
            this.flag = false;
        }
        rowdata.validated = true;
        return rowdata;
    }

    onGridClear = () => {
        this.tierdefaultEvents();
        if (this.defEventsRowData.length > 0) {
            this.selected = 0;
            this.rowIndex = 0;
        } else {
            this.selected = -1;
            this.rowIndex = -1;
        }
        return {

        };
    }
    checkValue(event) {

        //Parsing Data
        if (this.maintainTierLevelsTempOne.uiRules != undefined) {
            var data = JSON.parse(this.maintainTierLevelsTempOne.uiRules);

            if (data && data.BYDAY && data.BYDAY.length > 0) {
                data.BYDAY.forEach(e => {
                    for (let i = 0; i < this.weekCollection.length; i++) {
                        /*  if (this.weekCollection[i].value === e) {
                             this.weekCollection[i].checked = true;
                         }
 
                         if (this.weekCollection[i].value === e && this.weekCollection[i].value === event.value && !event.checked) {
                             this.weekCollection[i].checked = event.checked;
                         }
 
                         if (this.weekCollection[i].value === event.value) {
                             this.weekCollection[i].checked = event.checked;
                         } */
                    }
                });
            }
        } else {
            //Every time Un-Checking
            for (let i = 0; i < this.weekCollection.length; i++) {
                if (this.weekCollection[i].value === event.value) {
                    this.weekCollection[i].checked = event.checked
                } else {
                    this.weekCollection[i].checked = false;
                }
            }
        }

        for (let i = 0; i < this.weekCollection.length; i++) {
            if (this.weekCollection[i].value === event.value) {
                this.weekCollection[i].checked = event.checked;
            }
        }
        //Setting data
        let value = [];
        let RecurrenceRule = {};
        if (this.maintainTierLevelsTempOne.uiRules) {
            var data = JSON.parse(this.maintainTierLevelsTempOne.uiRules);
            RecurrenceRule = data;
        }
        for (let i = 0; i < this.weekCollection.length; i++) {
            if (!!this.weekCollection[i].checked) {
                value.push(this.weekCollection[i].value);
            }
        }
        RecurrenceRule['BYDAY'] = value;
        var objData = JSON.stringify(RecurrenceRule);
        this.grid.setColumnData('uiRules', this.maintainTierLevelsTempOne.tierId, objData);
    }



    onSave() {
        for (let i = 0; i < this.defEventsRowData.length; i++) {
            const duplicate = this.defEventsRowData.filter(e => e.scheduleType && e.scheduleType == this.defEventsRowData[i].scheduleType && e.scheduleSubType && e.scheduleSubType == this.defEventsRowData[i].scheduleSubType);
            if (duplicate.length > 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmtidet.rowalreadyexists');
                this.show();
                return;
            }
        }

      /*   if (this.validate && Number( this.validate)>0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmtidet.recordcannotbecreatedormodified');
            this.show();
            return;
        } */

        this.addMainDefEventsData();
        this.updateMainDefEventsData();
        this.removedMainDefEventsData();

        this.tierLevelCommitModel.insertTierDefEvents = [];
        this.tierLevelCommitModel.updateTierDefEvents = [];
        this.tierLevelCommitModel.deleteTierDefEvents = [];

        if (this.insertDefEventsList.length > 0 || this.updateDefEventsList.length > 0 || this.deleteDefEventsList.length > 0) {
            for (let i = 0; i < this.insertDefEventsList.length; i++) {
                //validation
                if (!this.validateDefaultEvents(this.insertDefEventsList)) {
                    return;
                }
                this.insertDefEventsList[i].tierLevelcode = this.tierLevelCode;
                this.insertDefEventsList[i].caseLoadId = this.sessionManager.currentCaseLoad;
                this.tierLevelCommitModel.insertTierDefEvents = this.insertDefEventsList;
            }

            for (let i = 0; i < this.updateDefEventsList.length; i++) {
                //validation
                if (!this.validateDefaultEvents(this.updateDefEventsList)) {
                    return;
                }
                this.updateDefEventsList[i].tierLevelcode = this.tierLevelCode;
               /*  if (!this.updateDefEventsList[i].scheduleType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmtidet.scheduletypemustbeentered');
                    this.show();
                    return;
                }
                if (!this.updateDefEventsList[i].scheduleSubType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmtidet.schedulesubtypemustbeentered');
                    this.show();
                    return;
                } */
                this.tierLevelCommitModel.updateTierDefEvents = this.updateDefEventsList;
            }

            for (let i = 0; i < this.deleteDefEventsList.length; i++) {
                this.deleteDefEventsList[i].tierLevelcode = this.tierLevelCode;
                this.tierLevelCommitModel.deleteTierDefEvents = this.deleteDefEventsList;
            }
        }

        const assAnsSaveData = this.ocmtidetFactory.tierdefaultEventsCommit(this.tierLevelCommitModel);
        assAnsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.grid.onClear();
                this.tierdefaultEvents();
                return;
            }else if(data === 3){
                this.type = 'warn';
                this.message = this.translateService.translate('ocmtidet.thisscheduleisalreadyassignedtooffenderyoucannotdeletethisrecord');
                this.show();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }

    onRowClickDefEvents(event) {
        if (event) {
            this.maintainTierLevelsTempOne = event;
        } else {
            this.maintainTierLevelsTempOne = new MaintainTierDefaultEvents();
        }

        if (event.uiRules) {
            this.tempUiRules = JSON.parse(event.uiRules);
            var data = JSON.parse(event.uiRules);
            var freq = data.FREQ;
            if (freq) {
                this.handleChange(freq.toLowerCase());
            }
            if (data.UNTIL) {
                this.selectedEnd = 'until';
                this.selectedEndDate = data.UNTIL;
            }
            if (data.COUNT) {
                this.selectedEnd = 'totalcount';
                this.selectedTotalCount = data.COUNT;
            }

            this.interval = data.INTERVAL;
            this.weekCollection.forEach(e => {
                var element = data.BYDAY;
                e.checked = false;
                if (element) {
                    element.forEach(d => {
                        if (d && e && d === e.value) {
                            e.checked = true;
                        }
                    });
                }
            });
        } else {
            this.maintainTierLevelsTemp = new MaintainTierDefaultEvents();
            this.interval = 1;
            this.selectedEndDate = DateFormat.getDate();
            this.weekCollection.forEach(e => {
                if (e.value) {
                    e.checked = false;
                }
            })
        }
    }

    get saveBtnDisable() {
        if ((this.grid.updatedMap.size > 0) || (this.grid.addedMap.size > 0) || (this.grid.removedMap.size > 0)) {
            return false;
        } else {
            return true;
        }
    }

    repeateveryValueChange(event) {
        let tData = {};
        if (this.maintainTierLevelsTempOne.uiRules) {
            tData = JSON.parse(this.maintainTierLevelsTempOne.uiRules);
        }
        tData['INTERVAL'] = '';
        if (event) {
            tData['INTERVAL'] = event;
        }
        tData = JSON.stringify(tData);
        this.grid.setColumnData('uiRules', this.maintainTierLevelsTempOne.tierId, tData);
    }

    endDateValidateModel(event) {
        let tDate = {};
        if (this.maintainTierLevelsTempOne.uiRules) {
            tDate = JSON.parse(this.maintainTierLevelsTempOne.uiRules);
        }
        tDate['UNTIL'] = '';
        if (event) {
            tDate['UNTIL'] = event;
        }
        tDate = JSON.stringify(tDate);
        this.grid.setColumnData('uiRules', this.maintainTierLevelsTempOne.tierId, tDate);
    }

    numberOfOccurrencesValueChange(event) {
        let tData = {};
        if (this.maintainTierLevelsTempOne.uiRules) {
            tData = JSON.parse(this.maintainTierLevelsTempOne.uiRules);
        }
        tData['COUNT'] = '';
        if (event) {
            tData['COUNT'] = event;
        }
        tData = JSON.stringify(tData);
        this.grid.setColumnData('uiRules', this.maintainTierLevelsTempOne.tierId, tData);
    }

    validateDefaultEvents(data: any) {
        const is = { valid: true }
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].scheduleType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmtidet.scheduletypemustbeentered');
                    this.show();
                    return;
                }
                if (!data[i].scheduleSubType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmtidet.schedulesubtypemustbeentered');
                    this.show();
                    return;
                }
                var uiData = JSON.parse(data[i].uiRules);
                if (uiData) {
                    if (uiData['FREQ'] === 'WEEKLY') {
                        if (!uiData['BYDAY'] || uiData['BYDAY'].length < 1) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmtidet.pleaseselectatleastoneweekday');
                            this.show();
                            is.valid = false;
                            return is.valid;
                        }
                    }
                    if (uiData['UNTIL'] && uiData['UNTIL'] === '' || uiData['UNTIL'] === "") {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmtidet.enddatemustbeentered');
                        this.show();
                        is.valid = false;
                        return;
                    }
                    if(uiData['UNTIL']){
                        if(DateFormat.compareDate(DateFormat.getDate(uiData['UNTIL']),DateFormat.getDate()) === -1 ){
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmtidet.enddateshouldbefuturedate');
                            this.show();
                            is.valid = false;
                            return;
                        }
                    }

                    if (uiData['COUNT'] && uiData['COUNT'] === '' || uiData['COUNT'] === "") {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmtidet.numberofoccurrencesmustbeentered');
                        this.show();
                        is.valid = false;
                        return;
                    }

                    if (!uiData['INTERVAL']) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmtidet.repeateverymustbeentered');
                        this.show();
                        is.valid = false;
                        return;
                    }
                }
            }
        }
        return is.valid;
    }
}