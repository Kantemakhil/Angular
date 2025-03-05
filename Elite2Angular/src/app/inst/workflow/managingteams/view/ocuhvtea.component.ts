import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';

import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderTeamAssignHty } from '@inst/workflow/managingteams/beans/VOffenderTeamAssignHty';
import { OcuhvteaService } from '@inst/workflow/managingteams/service/ocuhvtea.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
// import required bean declarations

@Component({
    selector: 'app-ocuhvtea',
    templateUrl: './ocuhvtea.component.html'

})

export class OcuhvteaComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offvteamhtyData: VOffenderTeamAssignHty[] = [];
    offvteamhtyDataTemp: VOffenderTeamAssignHty[] = [];
    offvteamhtyModel: VOffenderTeamAssignHty = new VOffenderTeamAssignHty();
    offvteamhtySearchModel: VOffenderTeamAssignHty = new VOffenderTeamAssignHty();
    offvteamhtyIndex: Number = 0;
    offvteamhtyInsertList: VOffenderTeamAssignHty[] = [];
    offvteamhtyUpdatetList: VOffenderTeamAssignHty[] = [];
    offvteamhtyDeleteList: VOffenderTeamAssignHty[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    offVteamHtyColumnDef: any[];
    offVteamHtyReadOnly: Boolean = false;
    buttonCtrlReadOnly: Boolean = false;
    rgfunctionRg: any[] = [];
    historyIndex: number;
    retriveDisabled: boolean;
    clearDisabled: boolean;
    namesReadOnly: boolean;
    showSearch;
    childRecordObject: VHeaderBlock = new VHeaderBlock();
    functionTitles: { code: string; description: string; };
    constructor(private ocuhvteaFactory: OcuhvteaService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService) {
        this.offVteamHtyColumnDef = [];
    }
    ngOnInit() {
        this.childRecordObject = new VHeaderBlock();
        this.childRecordObject = this.offenderSearchService.selectedOffender;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.functionTitles = {description: this.translateService.translate('common.description'),
         code: this.translateService.translate('common.code'),
         };
        this.offVteamHtyColumnDef = [
            {
                fieldName: this.translateService.translate('ocuhvtea.function'), field: 'functionType', editable: true, width: 150,
                datatype: 'lov', domain:'FUNCTION'//link: 'ocuhvtea/rgFunctionRecordGroup'
            },
            { fieldName: this.translateService.translate('ocuhvtea.teamresponsible'), field: 'teamCode', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocuhvtea.teamdescription'), field: 'teamDescription', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('ocuhvtea.assigndate'), field: 'assignDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocuhvtea.removeddate'), field: 'expiryDate', editable: false, width: 150,
                datatype: 'date'
            },
        ];
        this.offvteamhtyExecuteQuery();
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
         * event is fired when click on Exit button.
         */
    onButExitclick() {
        this.dialog.close(null);
    }
    onOffenderChange(offender) {

        this.childRecordObject = offender;
        if (offender) {
            this.offvteamhtyExecuteQuery();
        } else {
            this.offvteamhtyData = [];
        }
    }
    onRowClickHIst = (event) => {
        if (event) {
            this.offvteamhtyModel = event;
        }
    }
    offvteamhtyExecuteQuery(date?, dateOne?) {
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
        this.offvteamhtySearchModel.offenderBookId = this.dialog.data.offenderBookId;
        const offvteamhtyResult = this.ocuhvteaFactory.offVteamHtyExecuteQuery(this.offvteamhtySearchModel);
        offvteamhtyResult.subscribe(offvteamhtyResultList => {
            if (offvteamhtyResultList.length === 0) {
                this.offvteamhtyData = [];
                this.retriveDisabled = false;
                this.clearDisabled = true;
                this.namesReadOnly = false;
                this.show('common.querycaused');
                this.clear();
            } else {
                this.offvteamhtyData = offvteamhtyResultList;
                this.offvteamhtyModel = offvteamhtyResultList[0];
                this.historyIndex = 0;
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
            }
        });
    }
    isInsertable(date?, dateOne?) {
        if (this.offvteamhtySearchModel.functionType || this.offvteamhtySearchModel.teamCode ||
            this.offvteamhtySearchModel.assignDate || this.offvteamhtySearchModel.expiryDate) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
        if (date || dateOne) {
            this.clearDisabled = false;
        }
    }
    clear() {
        this.offvteamhtyData = [];
        this.offvteamhtySearchModel = new VOffenderTeamAssignHty();
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;

    }
    onFunctionTypeBlur() {
        if (!this.offvteamhtySearchModel.functionType) {
            this.offvteamhtySearchModel.functionType = this.offvteamhtySearchModel.functionType === '' ? undefined : '';
        }
    }
}

