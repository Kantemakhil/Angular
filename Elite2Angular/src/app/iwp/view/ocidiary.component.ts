import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';

import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';

import { DialogService } from '@ui-components/dialog/dialog.service';
import { OcidiaryService } from '../service/ocidiary.service';

// import required bean declarations

@Component({
    selector: 'app-ocidiary',
    templateUrl: './ocidiary.component.html'
    //  styleUrls: ['./ocidiary.component.css']
})

export class OcidiaryComponent implements OnInit {
    label: string;
    activeFlag: boolean;
    eventOutcome: string;
    firstName: string;
    lastName: string;
    faclov: string;
    FromDate: Date;
    startTime: Date;
    toDate: Date;
    facLovLink: any;
    msgs: any[] = [];
    offschData: VOffenderAllSchedules[] = [];
    offschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    disabled: boolean;
    editable: boolean = true;
    offSchColumnDef: any[];
    stafflrmodelReadonly: boolean;
    searchDisabled: boolean;
    querySchReadOnly: boolean;
    lanchBtDisabled: boolean;
    constructor(private ocidiaryFactory: OcidiaryService, private dialogService: DialogService,
        public translateService: TranslateService, public sessionManager: UserSessionManager) {
        this.offSchColumnDef = [];
    }
    ngOnInit() {
        this.querySchReadOnly = false;
        this.searchDisabled = false;
        this.facLovLink = '/ocidiary/rgLocationRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.offSchColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'offenderLastName', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'offenderFirstName', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('common.type'), field: 'eventType', editable: false, width: 150, datatype: 'lov',
                domain: 'EVENTS'
            },
            {
                fieldName: this.translateService.translate('common.subtype'), field: 'eventSubTypeDesc', editable: false, width: 150

            },
            {
                fieldName: this.translateService.translate('ocidiary.date'), field: 'eventDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocidiary.from'), field: 'startTime', editable: false, width: 150,
                datatype: 'time',
            },
            { fieldName: this.translateService.translate('ocidiary.to'), field: 'endTime', editable: false, width: 150, datatype: 'time', },
            { fieldName: this.translateService.translate('common.staffname'), field: 'inChargeStaffName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.comments'), field: 'commentText', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocidiary.outcome'), field: 'eventOutcome', editable: false, width: 150, datatype: 'lov', domain: 'OUTCOMES' },
	        {
                fieldName: this.translateService.translate('ocidiary.counter'), field: 'unexcusedAbsenceFlag', editable: false, width: 150,
                datatype: 'checkbox'
            },
        ];
        this.onButTaskHistclick();
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
    /**
         * This function displays the messages
         */
    agyLocCodeChange(event) {
        if (event) {
            this.offschModel.agyLocId = event.code;
        }
    }
    onButTaskHistclick() {
        if (this.sessionManager.currentCaseLoadType === 'INST') {
            this.label = this.translateService.translate('system-profile.inst-agency');
        } else {
            this.label = this.translateService.translate('system-profile.comm-agency');
        }
    }

    /**
     * This function displays the messages
     */
    offschExecuteQuery(date?, dateOne?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (dateOne) {
            if (dateOne.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(dateOne.lastValue).indexOf('_') >= 0 && dateOne.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (!this.FromDate) {
            this.show('Please enter the From Date before initiating a query.');
            return;
        }
        if (this.FromDate === null && this.startTime != null) {
            this.show('Query on time should be in conjunction with date');
        }
        if (this.faclov === '') {
            this.offschModel.agyLocId = undefined;
        } else {
            this.offschModel.agyLocId = this.faclov;
        }
        if (this.FromDate) {
            this.offschModel.fromDate = this.FromDate;
        }
        if (this.eventOutcome) {
            this.offschModel.eventOutcome = this.eventOutcome;
        }
        if (this.startTime) {
            this.offschModel.startTime = this.startTime;
        }
        if (this.toDate) {
            this.offschModel.toDate = this.toDate;
        }
        if (this.lastName) {
            this.offschModel.offenderLastName = this.lastName;
        }
        if (this.firstName) {
            if (this.lastName) {
                this.offschModel.offenderFirstName = this.firstName;
            }
        }
        if (this.eventOutcome) {
            this.offschModel.eventOutcome = this.eventOutcome;
        }
        if (this.activeFlag) {
            this.offschModel.unexcusedAbsenceFlag = 'Y';
        } else {
            this.offschModel.unexcusedAbsenceFlag = 'N';
        }
        const offschResult = this.ocidiaryFactory.
            offSchExecuteQuery(this.offschModel);
        offschResult.subscribe(data => {
            if (data.length === 0) {
                this.offschData = [];
                this.show('common.querycaused');
                return;
            } else {
                this.offschData = data;
                data.forEach(element => {
                    element.unexcusedAbsenceFlag = element.unexcusedAbsenceFlag === 'Y' ? true : false;
                });
                this.offschModel = data[0];
                this.querySchReadOnly = true;
                this.searchDisabled = true;
                this.lanchBtDisabled = true;
                // this.clearDisabled = false;
            }
        });
    }
    /**
     * This function displays the messages
     */
    clear() {
        this.offschData = [];
        this.offschModel = new VOffenderAllSchedules();
        this.querySchReadOnly = false;
        this.searchDisabled = false;
        this.lanchBtDisabled = false;
      
        // this.clearDisabled = true;
        this.faclov = undefined;
        this.FromDate = undefined;
        this.startTime = undefined;
        this.toDate = undefined;
        this.lastName = undefined;
        this.firstName = undefined;
        this.eventOutcome = undefined;
        this.activeFlag = false;

    }
    /**
      * This function displays the messages
     */
    onGenerateOverRideClick = () => {
        if (!this.faclov) {
            this.show('Please select Agency location before selecting staff member');
            return;
        }
        const data = { agyLocId: this.faclov };
        this.dialogService.openLinkDialog('/OCUAOFFI', data, 80).subscribe(result => {
            if (result) {
                this.lastName = result.lastName;
                this.firstName = result.firstName;
            }
        });
    }
    /**
     * This function displays the messages
    */
    onLocationBlur() {
        if (!this.faclov) {
            this.faclov = this.faclov === '' ? undefined : '';
        }
    }
    /**
      * This function displays the messages
     */
    outComeBlur() {
        if (!this.eventOutcome) {
            this.eventOutcome = this.eventOutcome === '' ? undefined : '';
        }

    }
    /**
     * This function displays the messages
    */
    get clearDisabled() {

        if (this.faclov || this.eventOutcome || this.FromDate || this.toDate ||
            this.startTime || this.activeFlag || this.lastName || this.firstName) {
            return false;
        } else {
            return true;
        }
    }

    fromDateChangeEvent(event) {
        if (!event) {
            this.FromDate = undefined;
        }
    }
}
