import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcucstafService } from '../service/ocucstaf.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffDetails } from '@common/workspace/beans/StaffDetails';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

// import required bean declarations

@Component({
    selector: 'app-ocucstaf',
    templateUrl: './ocucstaf.component.html'
})

export class OcucstafComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    staffdetailsData: StaffDetails[] = [];
    staffdetailsDataTemp: StaffDetails[] = [];
    // TODO angular.copy(this.staffdetailsData, thisstaffdetailsDataTemp);
    staffdetailsModel: StaffDetails = new StaffDetails();
    staffdetailsSearchModel: StaffDetails = new StaffDetails();
    staffdetailsIndex: Number = 0;
    staffdetailsInsertList: StaffDetails[] = [];
    staffdetailsUpdatetList: StaffDetails[] = [];
    staffdetailsDeleteList: StaffDetails[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    staffDetailsColumnDef: any[];
    cg$ctrlReadOnly: Boolean = false;
    staffDetailsReadOnly: Boolean = false;
    buttonCtrlReadOnly: Boolean = false;
    rgagencytypeRg: any[] = [];
    rgareaRg: any[] = [];
    rgstaffstatusRg: any[] = [];
    rglocationRg: any[] = [];
    rgroleRg: any[] = [];
    rgpositionRg: any[] = [];
    agyLocId: any;
    cellvalues: string;
    areaCode: any;
    locationLov: string;
    staffStatus: string;
    clearDisabled: boolean;
    retriveDisabled: boolean;
    namesReadOnly: boolean;
    tableIndex: number;
    message: string;
    type: string;
    namesReadOnlyDefault: boolean;
    selectDisable: boolean;
    constructor(private ocucstafFactory: OcucstafService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.staffDetailsColumnDef = [];
    }
    ngOnInit() {
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.namesReadOnlyDefault = true;
        this.selectDisable = true;
        this.staffdetailsSearchModel.agyLocId = this.dialog.data.agyLocType;
        this.staffdetailsSearchModel.staffStatus = 'ACTIVE';
        this.cellvalues = 'ocucstaf/rgAreaRecordGroup?areaType=' + this.dialog.data.agyLocType;
        this.locationLov = 'ocucstaf/rgLocationRecordGroup?areaCode=' + this.dialog.data.areaCode
            + '&areaType=' + this.dialog.data.agyLocType;
        this.getSubTypeList();

        this.staffDetailsColumnDef = [
            { fieldName: this.translateService.translate('ocucstaf.lastName'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocucstaf.firstName'), field: 'firstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocucstaf.position'), field: 'position',
                editable: false, width: 150, datatype: 'lov', domain: 'STAFF_POS'
            },
            {
                fieldName: this.translateService.translate('ocucstaf.role'), field: 'role', editable: false,
                width: 150, datatype: 'lov', domain: 'STAFF_ROLE'
            },
            {
                fieldName: this.translateService.translate('common.fromdate'), field: 'fromDate', editable: false,
                width: 150, datatype: 'date'
            },
            { fieldName: this.translateService.translate('common.todate'), field: 'toDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: '', field: 'staffId', editable: false, width: 10, hide: true }
        ];
        // TODO all initializations here
        this.staffdetailsExecuteQuery();

    }
    getSubTypeList() {
        const getObjectData = this.ocucstafFactory.rgAreaRecordGroup(this.dialog.data.agyLocType);
        getObjectData.subscribe(data => {
            this.staffdetailsSearchModel.areaCode = this.dialog.data.areaCode;
        });
    }
    onButExitclick() {
        this.dialog.close(null);
    }
    validateRow = (event) => {
        const rowdata = new ValidateRowReturn();
        return rowdata;
    }  /** 
  * This function displays the messages
  */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickstaffdetails(event) {
        if (event) {
            this.staffdetailsModel = event;
            this.staffdetailsModel.agencyLocationType = this.staffdetailsSearchModel.agencyLocationType;
            this.selectDisable = false;
        }
    }
    clear() {
        this.staffdetailsData = [];
        this.staffdetailsSearchModel.agencyLocationType = undefined;
        this.staffdetailsSearchModel.lastName = undefined;
        this.staffdetailsSearchModel.firstName = undefined;
        this.staffdetailsSearchModel.position = undefined;
        this.staffdetailsSearchModel.role = undefined;
        this.staffdetailsSearchModel.fromDate = undefined;
        this.staffdetailsSearchModel.toDate = undefined;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.selectDisable = true;
    }
    isInsertable(date?, dateOne?) {
        if (this.staffdetailsSearchModel.agencyLocationType || this.staffdetailsSearchModel.lastName
            || this.staffdetailsSearchModel.firstName || this.staffdetailsSearchModel.position || this.staffdetailsSearchModel.role
            || this.staffdetailsSearchModel.fromDate || this.staffdetailsSearchModel.toDate) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }
    retriveBeforevlidations() {
        const is = { valid: true };
        if (!this.staffdetailsSearchModel.agencyLocationType || this.staffdetailsSearchModel.agencyLocationType === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocucstaf.locationmandatory');
            this.show(this.message);
            is.valid = false;
        }
        return is.valid;
    }
    staffdetailsExecuteQuery(date?, dateOne?) {
       /*  if (!this.retriveBeforevlidations()) {
            return;
        } */
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
        const staffdetailsResult = this.ocucstafFactory.staffDetailsExecuteQuery(this.staffdetailsSearchModel);
        staffdetailsResult.subscribe(staffdetailsResultList => {
            if (staffdetailsResultList.length === 0) {
                this.staffdetailsData = [];
                this.retriveDisabled = false;
                this.namesReadOnly = false;
                this.show('common.querycaused');
            } else {
                this.staffdetailsData = staffdetailsResultList;
                this.staffdetailsModel = staffdetailsResultList[0];
                this.tableIndex = 0;
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
            }
        });
    }
    onButSelectclick() {
        this.dialog.close({
            lastName: this.staffdetailsModel.lastName,
            firstName: this.staffdetailsModel.firstName,
            position: this.staffdetailsModel.position,
            role: this.staffdetailsModel.role,
            staffId: this.staffdetailsModel.staffId,
            scheduleType: this.staffdetailsModel.scheduleType,
            hoursPerWeek: this.staffdetailsModel.hoursPerWeek,
            agyLocId: this.staffdetailsModel.agencyLocationType,
            fromDate: this.staffdetailsModel.fromDate,
            toDate: this.staffdetailsModel.toDate,

        });
    }

    /**
     * This function is used to blur event in role field
     */
    onRoleBlur() {
        if (!this.staffdetailsSearchModel.role) {
            this.staffdetailsSearchModel.role = this.staffdetailsSearchModel.role === '' ? undefined : '';
        }
    }
    /**
      * This function is used to blur event in subtype field
      */
    onPositionBlur() {
        if (!this.staffdetailsSearchModel.position) {
            this.staffdetailsSearchModel.position = this.staffdetailsSearchModel.position === '' ? undefined : '';
        }
    }

    onLocationBlur() {
        if (!this.staffdetailsSearchModel.agencyLocationType) {
            this.staffdetailsSearchModel.agencyLocationType = this.staffdetailsSearchModel.agencyLocationType === '' ? undefined : '';
        }
    }
}
