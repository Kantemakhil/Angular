import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumsmalaService } from '../service/oumsmala.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffLocationRoles } from '../beans/StaffLocationRoles';
import { StaffLocationRolesCommitBean } from '../beans/StaffLocationRolesCommitBean';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';
import { AgencyLocations } from '../../admin/beans/AgencyLocations';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
// import { StaffMembers } from 'src/app/inst/incidents-oic/beans/StaffMembers';

@Component({
    selector: 'app-oumsmala',
    templateUrl: './oumsmala.component.html'
})

export class OumsmalaComponent implements OnInit {
    actionName: string;
    @ViewChild('grid', {static: true}) grid: any;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    smData: StaffMembers[] = [];
    smDataTemp: StaffMembers[] = [];
    smModel: StaffMembers = new StaffMembers();
    calModel: AgencyLocations = new AgencyLocations();
    calIndex: number = 0;
    slrData: StaffLocationRoles[] = [];
    slrDataTemp: StaffLocationRoles[] = [];
    slrModel: StaffLocationRoles = new StaffLocationRoles();
    slrIndex: number = 0;
    slrInsertList: StaffLocationRoles[] = [];
    slrUpdatetList: StaffLocationRoles[] = [];
    slrDeleteList: StaffLocationRoles[] = [];
    display: boolean;
    errorMessage: string;
    disabled: boolean;
    editable: boolean = true;
    slrColumnDef: any[];
    tasksColumnDef: any[];
    block2ReadOnly: boolean = false;
    ctrlReadOnly: boolean = false;
    docsReadOnly: boolean = false;
    ctrlBlReadOnly: boolean = false;
    tasksReadOnly: boolean = false;
    per1ReadOnly: boolean = false;
    perReadOnly: boolean = false;
    smReadOnly: boolean = false;
    calReadOnly: boolean = false;
    slrReadOnly: boolean = false;
    navigationdummyRg: any[] = [];
    cgfkSlrpositionRg: any[] = [];
    cgfkSlrroleRg: any[] = [];
    cgfkSlrstaffunitRg: any[] = [];
    cgfkSlrscheduletypeRg: any[] = [];
    cgfkCalagylocidRg: any[] = [];
    cgfkSaccaseloadidRg: any[] = [];
    slrCommitModel: StaffLocationRolesCommitBean = new StaffLocationRolesCommitBean();
    calColumnDef: any[];
    index: number;
    calData: AgencyLocations[] = [];
    tableIndex: number;
    roleTitles = {
        'code': this.translateService.translate('oumsmala.rolecode'),
        'description': this.translateService.translate('common.description')
    };
    scheduletypeTitles = {
        'code': this.translateService.translate('oumsmala.scheduletype'),
        'description': this.translateService.translate('common.description')
    };
    staffunitTitles = {
        'code': this.translateService.translate('oumsmala.staffunittype'),
        'description': this.translateService.translate('common.description')
    };
    positionTitles = {
        'code': this.translateService.translate('oumsmala.position'),
        'description': this.translateService.translate('common.description')
    };
    retriveDisabled: boolean;
    clearDisabled: boolean;
    nextReadOnly: boolean;
    prevReadOnly: boolean;
    slrtabInsert: boolean;
    disableSearchFields: boolean;
    setGrid: any;
    staffIndex: any;
    lstOfStaffMem: StaffMembers[];
    checkboxDisabled: boolean;
    slrModelTemp: any;
    message: any;
    stskModel: StaffLocationRoles = new StaffLocationRoles();
    editableFlg: boolean;
    birthdateReadonly: boolean;
    hoursRow: string;
    specialKeys: any;
    staffMembersColumnDef: any[];
    constructor(private oumsmalaFactory: OumsmalaService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.calColumnDef = [];
        this.slrColumnDef = [];
        this.lstOfStaffMem = [];
        this.staffMembersColumnDef = [];
    }
    ngOnInit() {
        this.retriveDisabled = false;
        this.disableSearchFields = false;
        this.checkboxDisabled = true;
        this.clearDisabled = true;
        this.nextReadOnly = true;
        this.prevReadOnly = true;
        this.slrtabInsert = false;
        this.birthdateReadonly = true;
        this.calColumnDef = [
            { fieldName: this.translateService.translate('common.code'), field: 'agyLocId', editable: false, width: 150, },
            { fieldName: this.translateService.translate('common.description'), field: 'description', editable: false, width: 150, },
            { fieldName: this.translateService.translate('oumsmala.agencytype'), field: 'agencyLocationType', editable: false, width: 150 },
        ];

        this.slrColumnDef = [
            {
                fieldName: this.translateService.translate('oumsmala.Positionmand'), field: 'position', editable: true,
                width: 150, datatype: 'lov', domain: 'STAFF_POS', titles: this.positionTitles
            },
            {
                fieldName: this.translateService.translate('oumsmala.rolecode') +
                    this.translateService.translate('common.mandatory'),
                field: 'role', editable: true, width: 150, datatype: 'lov', domain: 'STAFF_ROLE', titles: this.roleTitles
            },
            {
                fieldName: this.translateService.translate('oumsmala.staffunittype'), field: 'staffUnit',
                editable: true, width: 150, datatype: 'lov', domain: 'STAFF_UNIT', titles: this.staffunitTitles
            },
            {
                fieldName: this.translateService.translate('oumsmala.scheduletypemand'), field: 'scheduleType',
                editable: true, width: 150, datatype: 'lov', domain: 'SCHEDULE_TYP', titles: this.scheduletypeTitles
            },
            {
                fieldName: this.translateService.translate('oumsmala.hoursweeksmand'), field: 'hoursPerWeek',
                editable: true, width: 150,
            },
            {
                fieldName: this.translateService.translate('oumsmala.fte'), field: 'fteStatus', editable: true,
                datatype: 'number', format: '1.2-2', minValue: '00.00', maxValue: 99.99, strictFP: true, whole: true,
            },
            {
                fieldName: this.translateService.translate('oumsmala.workloadcapacity'), field: 'sBtn', datatype: 'hyperlink', displayas: 'href',
                styleClass: 'launch', dialogWidth: '80%', link: '/OCDONOST', modal: true, data: 'row'
            },
            {
                fieldName: this.translateService.translate('oumsmala.fromdatemand'), field: 'fromDate',
                editable: true, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oumsmala.todate'), field: 'toDate', editable: true,
                width: 150, datatype: 'date'
            },
        ];
        this.staffMembersColumnDef = [
            {
                fieldName: this.translateService.translate('oumsmala.lastname'), field: 'lastName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oumsmala.firstname'),
                field: 'firstName', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oumsmala.middleName'),
                field: 'middleName', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oumsmala.birthdate'),
                field: 'birthdate', datatype: 'date', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oumsmala.staffid'),
                field: 'staffId', editable: false, width: 150, minValue: '0',
                maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('oumsmala.userid'), field: 'userId',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oumsmala.mailid'), field: 'mailId',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oumsmala.suspendedstaffmemberrecord'), field: 'suspendedFlag',
                editable: false, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oumsmala.useraccountterminationdate'),
                field: 'terminationDate', datatype: 'date', editable: false, width: 150
            },
            
        ];
        this.smExecuteQuery();
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
    previousRecord() {
        this.index--;
        if (this.index >= 0) {
            this.calModel = new AgencyLocations();
            this.calModel.staffId = this.smData[this.index].staffId;
            this.smModel = this.smData[this.index];
            this.calExecuteQuery();
            this.nextReadOnly = false;
            if (!this.calModel.staffId) {
                this.calData = [];
                this.calModel = new AgencyLocations();
            }
        } else {
            this.index = 0;
            this.prevReadOnly = true;
            this.show('common.atfirstrecord');
            return;
        }
    }

    nextRecord() {
        this.index++;
        if (this.index < this.smData.length) {
            this.calModel = new AgencyLocations();
            this.calModel.staffId = this.smData[this.index].staffId;
            this.smModel = this.smData[this.index];
            this.calExecuteQuery();
            this.prevReadOnly = false;
        } else {
            this.index = this.smData.length - 1;
            this.nextReadOnly = true;
            this.show('common.lastrecordofquery');
            return;
        }
    }

    onGridInsert = () => {
        if (!this.slrGridValidations()) {
            return false;
        }
        return {
            hoursPerWeek: 35, fromDate: DateFormat.getDate()
        };
    }

    onRowClickcal(event) {
        if (event) {
            this.calModel = event;
            if (this.calModel && this.calModel.agyLocId && this.calModel.agyLocId !== undefined) {
                this.slrModel.calAgyLocId = this.calModel.agyLocId;
                this.slrExecuteQuery();
            } else {
                this.slrData = [];
                this.slrModel = new StaffLocationRoles();

            }
        }
    }
    ok() {
    }
    no() {
    }
    onOffenderChange(offender) {
    }
    cancel() {
        this.index = undefined;
        this.smData = [];
        this.smModel = new StaffMembers();
        this.calData = [];
        this.calModel = new AgencyLocations();
        this.slrData = [];
        this.slrModel = new StaffLocationRoles();
        this.smModel.lastName = undefined;
        this.smModel.firstName = undefined;
        this.smModel.birthdate = undefined;
        this.smModel.staffId = undefined;
        this.smModel.userId = undefined;
        this.smModel.suspendedFlag = undefined;
        this.smModel.terminationDate = undefined;
        this.nextReadOnly = true;
        this.prevReadOnly = true;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.disableSearchFields = false;
        this.slrtabInsert = false;
        this.checkboxDisabled = true;
    }
    smExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                this.clearDisabled = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.clearDisabled = false;
                return;
            }
        }
        const smResult = this.oumsmalaFactory.smExecuteQuery(this.smModel);
        smResult.subscribe(data => {
            if (data.length === 0) {
                this.smData = [];
                this.clearDisabled = false;
                this.show('common.querycaused');
                return;
            } else {
                data.forEach(element => {
                    element.suspendedFlag = element.suspendedFlag === 'Y' ? true : false;
                });
                this.smData = data;
                this.smModel = data[0];
                this.index = 0;
                //this.calExecuteQuery();
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.nextReadOnly = false;
                this.disableSearchFields = true;
                this.checkboxDisabled = true;
            }
        });
    }
    onRowClicksenterms(event) {
        if (event) {
            this.smModel = event;
            this.calExecuteQuery();
        }
    }
    calExecuteQuery() {
        this.calModel.staffId = this.smModel.staffId;
        const calResult = this.oumsmalaFactory.calExecuteQuery(this.calModel);
        calResult.subscribe(calResultList => {
            if (calResultList.length === 0) {
                this.calData = [];
            } else {
                this.calData = calResultList;
                this.calModel = calResultList[0];
                this.tableIndex = 0;
                this.slrtabInsert = true;
            }
        });
    }
    slrExecuteQuery() {
        this.slrModel.sacStaffId = this.smModel.staffId;
        this.slrModel.calAgyLocId = this.calModel.agyLocId;
        const slrResult = this.oumsmalaFactory.slrExecuteQuery(this.slrModel);
        slrResult.subscribe(slrResultList => {
            if (slrResultList.length === 0) {
                this.slrData = [];
            } else {
                slrResultList.forEach(ele=>{
                    if (ele.fteStatus != null) {
                        ele.fteStatus = Number(ele.fteStatus).toFixed(2);
                    } else {
                        ele.fteStatus = null
                    }
                    ele['sBtn'] = '';
                })
                this.slrData = slrResultList;
                this.slrModel = slrResultList[0];
                this.tableIndex = 0;
            }
        });
    }
    slrGridValidations() {
        const is = { valid: true };
        this.slrData.forEach(data => {
            if (is.valid) {
                if (!data.position) {
                    this.show('oumsmala.positionmustbeentered');
                    is.valid = false;
                    return;
                }
                if (!data.role) {
                    this.show('oumsmala.rolemustbeentered');
                    is.valid = false;
                    return;
                }
                if (!data.scheduleType) {
                    this.show('oumsmala.scheduletypemustbeentered');
                    is.valid = false;
                    return;
                }
                if (!data.hoursPerWeek) {
                    this.show('oumsmala.hoursweeksmustbeentered');
                    is.valid = false;
                    return;
                }
                if (!data.fromDate) {
                    this.show('oumsmala.fromdatemustbeentered');
                    is.valid = false;
                    return;
                }
                // for (let i = 0; i < this.slrData.length; i++) {
                //     for (let j = 0; j < this.slrData.length; j++) {
                //         if (i !== j && this.slrData[i].position === this.slrData[j].position &&
                //             this.slrData[i].role === this.slrData[j].role && this.slrData[i].fromDate === this.slrData[j].fromDate ) {
                //             this.show('Warning: Agency Location/Position/Role/From Date Combination must be unique', 'warn');
                //             is.valid = false;
                //             return is.valid;
                //         }
                //     }
                // }
                //     for (let i = 0; i < this.slrData.length; i++) {
                //         const date = DateFormat.getDate(this.slrData[i].fromDate);
                //         for (let j = 0; j < this.slrData.length; j++) {
                //            if (i !== j && this.slrData[i].position === this.slrData[j].position &&
                //              this.slrData[i].role === this.slrData[j].role &&
                //              DateFormat.compareDate(date, this.slrData[j].fromDate) === 0) {
                //               this.show('oumsmala.combinationmustbeuniquevalidation', 'warn');
                //         is.valid = false;
                //                 return is.valid;
                //     }
                // }
                for (let i = 0; i < this.slrData.length; i++) {
                    const date = DateFormat.getDate(this.slrData[i].fromDate);
                    for (let j = 0; j < this.slrData.length; j++) {
                        const dateOne = DateFormat.getDate(this.slrData[j].fromDate);
                        if (i !== j && this.slrData[i].position === this.slrData[j].position &&
                            this.slrData[i].role === this.slrData[j].role &&
                            DateFormat.compareDate(date, dateOne) === 0) {
                            this.show('oumsmala.combinationmustbeuniquevalidation', 'warn');
                            is.valid = false;
                            return is.valid;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    validateRowDataOne = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = this.slrData.indexOf(event.data);
        this.slrDataTemp = event.data;
        if (event.field === 'role' && event.data.role) {
            for (let i = 0; i < this.slrData.length; i++) {
                for (let j = 0; j < this.slrData.length; j++) {
                    if (i !== j && this.slrData[i].position === this.slrData[j].position &&
                        this.slrData[i].role === this.slrData[j].role &&
                        DateFormat.getDate(this.slrData[i].fromDate) === DateFormat.getDate(this.slrData[j].fromDate)) {
                        this.show('oumsmala.combinationmustbeuniquevalidation', 'warn');
                        this.grid.setColumnData('role', rowIndex, undefined);
                        rowdata.validated = true;
                        return rowdata;
                    }
                }
                //  const getDecimal = event.data.hoursPerWeek;
                // if (event.field === 'hoursPerWeek') {
                // 	if (getDecimal) {
                //         const numbers = /^[0-9/-]+$/;
                //         this.grid.setColumnData('hoursPerWeek', rowIndex, getDecimal + '.99');
                //         this.show();
                // 		rowdata.validated = true;
                //         return rowdata;
                //     }
                // onKeyDown(event: KeyboardEvent) {

                // 


                // if (event.field === 'hoursPerWeek') {


            }

            // if (event.field === 'fromDate') {
            //     if (event.data.fromDate &&
            //         DateFormat.compareDate(DateFormat.getDate(event.oldValue), DateFormat.getDate(event.newValue)) !== 0) {
            //         this.grid.setColumnData('hideField', rowIndex, true);
            //         const date = DateFormat.getDate(event.data.fromDate);
            //         if (DateFormat.compareDate(DateFormat.getDate(), date) === 1) {
            //             this.show(this.translateService.translate('Error: From Date can not be post dated'), 'warn');
            //             rowdata.validated = true;
            //             return rowdata;
            //         }
            //     } else {
            //         this.grid.setColumnData('hideField', rowIndex, false);
            //     }
            // }
            //     if (event.field === 'toDate') {
            //         if (event.data.toDate &&
            //              DateFormat.compareDate(DateFormat.getDate(event.oldValue) , DateFormat.getDate(event.newValue)) !== 0) {
            //             this.grid.setColumnData('hideField', rowIndex, true);
            //             const date = DateFormat.getDate(event.data.toDate);
            //             if (DateFormat.compareDate(DateFormat.getDate(), date) === 1) {
            //                 this.show(this.translateService.translate('Error: To Date can not be post dated'), 'warn');
            //                 rowdata.validated = true;
            //                 return rowdata;
            //             }
            //         } else {
            //         this.grid.setColumnData('hideField', rowIndex, false);
        }
        if (event.field === 'hoursPerWeek' && event.data.hoursPerWeek) {
            // for (let i = 0; i < this.slrData.length; i++) {
            //     for (let j = 0; j < this.slrData.length; j++) {
        const regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
        const next = event.newValue;
        if (next && !String(next).match(regex) || parseFloat(next) >= 100 || parseFloat(next) < 1) {
            this.show('oidpaatt.legalcharvalidation', 'warn');
            this.grid.setColumnData('hoursPerWeek', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }
    }  
        rowdata.validated = true;
        return rowdata;
    }

	/**
	 *  This function will be executed when commit event is
	* fired
	*/
    oumsmalaSaveslrForm(event) {
        if (!this.slrGridValidations()) {
            return;
        }
        this.slrInsertList = event.added;
        this.slrUpdatetList = event.updated;
        this.slrDeleteList = event.removed;
        this.slrCommitModel.insertList = [];
        this.slrCommitModel.updateList = [];
        this.slrCommitModel.deleteList = [];
        if (this.slrInsertList.length > 0 || this.slrUpdatetList.length > 0) {
            for (let i = 0; i < this.slrInsertList.length; i++) {
                if (DateFormat.compareDate(DateFormat.getDate(this.slrInsertList[i].fromDate),
                    DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oumsmala.fromdatecannotbepostdated'), 'warn');
                    return;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.slrInsertList[i].toDate),
                    DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oumsmala.todatecannotbepostdated'), 'warn');
                    return;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.slrInsertList[i].fromDate),
                    DateFormat.getDate(this.slrInsertList[i].toDate)) > 0) {
                    this.show('oumsmala.fromdatemustbelessthantodate');
                    return;
                }
                this.slrInsertList[i].calAgyLocId = this.calModel.agyLocId;
                this.slrInsertList[i].sacStaffId = this.smModel.staffId;
                this.slrCommitModel.insertList = this.slrInsertList;
            }
            for (let i = 0; i < this.slrUpdatetList.length; i++) {
                if (DateFormat.compareDate(DateFormat.getDate(this.slrUpdatetList[i].fromDate),
                    DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oumsmala.fromdatecannotbepostdated'), 'warn');
                    return;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.slrUpdatetList[i].toDate),
                    DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oumsmala.todatecannotbepostdated'), 'warn');
                    return;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.slrUpdatetList[i].fromDate),
                    DateFormat.getDate(this.slrUpdatetList[i].toDate)) > 0) {
                    this.show('oumsmala.fromdatemustbelessthantodate');
                    return;
                }
                this.slrUpdatetList[i].sacStaffId = this.smModel.staffId;
            }
            this.slrCommitModel.updateList = this.slrUpdatetList;
        }
        if (this.slrDeleteList.length > 0) {
            for (let i = 0; i < this.slrDeleteList.length; i++) {
            }
            this.slrCommitModel.deleteList = this.slrDeleteList;
        }
        const slrSaveData = this.oumsmalaFactory.slrCommit(this.slrCommitModel);
        slrSaveData.subscribe(data => {
            if (data && data.sealFlag === '1') {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.slrExecuteQuery();
                return;
            } else if (data && data.sealFlag === '0') {
                this.show('common.addupdateremoverecordfailed');
                this.slrExecuteQuery();
                return;
            } else if (data && data.sealFlag && data.listSeq === 2292) {
                this.message = this.translateService.translate
                    ('common.recordcannotbedeletedparent');
                this.message = String(this.message).replace('%tablename%', data.sealFlag);
                this.show(this.message, 'warn');
                this.slrExecuteQuery();
                return;
            } else if (data && data.sealFlag && data.listSeq === 2291) {
                this.message = this.translateService.translate('oumsmala.rowexistsalreadytable');
                this.message = String(this.message).replace('%tablename%', data.sealFlag);
                this.show(this.message, 'warn');
                this.slrExecuteQuery();
                return;
            }
        });
    }

    OnGridClear = () => {
        this.slrExecuteQuery();
        return true;
    }
}
