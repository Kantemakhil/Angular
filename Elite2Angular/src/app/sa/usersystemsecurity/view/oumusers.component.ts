import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef, ViewChild
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Global } from '@core/classes/Global';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OumusersService } from '@sa/usersystemsecurity/service/oumusers.service';
import { StaffAccessibleCaseloads } from '@sausersystemsecuritybeans/StaffAccessibleCaseloads';
import { StaffMemberRoles } from '@sausersystemsecuritybeans/StaffMemberRoles';
import { CaseLoadAgencyLocations } from '@saadminbeans/CaseLoadAgencyLocations';
import { StaffMembersCommitBean } from '@sausersystemsecuritybeans/StaffMembersCommitBean';
import { StaffMembers } from '@instincidentsbeans/StaffMembers';
import { StaffAccessibleCaseloadsCommitBean } from '@sausersystemsecuritybeans/StaffAccessibleCaseloadsCommitBean';
import { StaffMemberRolesCommitBean } from '@sausersystemsecuritybeans/StaffMemberRolesCommitBean';
import { CaseLoadAgencyLocationsCommitBean } from '@saadminbeans/CaseLoadAgencyLocationsCommitBean';
import { element } from 'protractor';
import { ColumnApi, GridApi, GridOptions } from '@ag-grid-enterprise/all-modules';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { ValidateRowEvent } from '@ui-components/grid/grid.component';
import { Validators } from '@angular/forms';
import { Images } from '@commonbeans/Images';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { UserCreation } from '../beans/UserCreation';
import { IWPPaneService } from '@core/ui-components/pane/iwppane.service';
// import required bean declarations

@Component({
    selector: 'app-oumusers',
    templateUrl: './oumusers.component.html'
})

export class OumusersComponent implements OnInit {
    @ViewChild('grid', { static: true }) grid: any;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('memberGrid', { static: true }) memberGrid: any;
    actionName: string;
    gridOptions: GridOptions;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompareStaffRoles: any[] = [];
    staffData: StaffMembers[] = [];
    rolesData: StaffMemberRoles[] = [];
    staffDataTemp: StaffMembers[] = [];
    staffModel: StaffMembers = new StaffMembers();
    vStaffModelTemp: StaffMembers = new StaffMembers();
    staffIndex = 0;
    staffInsertList: StaffMembers[] = [];
    staffUpdateList: StaffMembers[] = [];
    staffDeleteList: StaffMembers[] = [];
    staffAcData: StaffAccessibleCaseloads[] = [];
    staffAcDataTemp: StaffAccessibleCaseloads[] = [];
    staffAcModel: StaffAccessibleCaseloads = new StaffAccessibleCaseloads();
    staffAcModelTemp: StaffAccessibleCaseloads = new StaffAccessibleCaseloads();
    staffAcIndex = 0;
    staffAcInsertList: StaffAccessibleCaseloads[] = [];
    staffAcUpdateList: StaffAccessibleCaseloads[] = [];
    staffAcDeleteList: StaffAccessibleCaseloads[] = [];
    staffMemberRolesData: StaffMemberRoles[] = [];
    staffMemberRolesDataTemp: StaffMemberRoles[] = [];
    staffMemberRolesModel: StaffMemberRoles = new StaffMemberRoles();
    staffMemberRolesIndex = 0;
    staffMemberRolesInsertList: StaffMemberRoles[] = [];
    staffMemberRolesUpdateList: StaffMemberRoles[] = [];
    staffMemberRolesDeleteList: StaffMemberRoles[] = [];
    calData: CaseLoadAgencyLocations[] = [];
    calDataTemp: CaseLoadAgencyLocations[] = [];
    calModel: CaseLoadAgencyLocations = new CaseLoadAgencyLocations();
    calIndex = 0;
    calInsertList: CaseLoadAgencyLocations[] = [];
    calUpdateList: CaseLoadAgencyLocations[] = [];
    calDeleteList: CaseLoadAgencyLocations[] = [];
    insightsUserData: StaffMembers[] = [];
    insightsUserModel: StaffMembers = new StaffMembers();
    userCreation: UserCreation = new UserCreation();
    minDate: any;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    staffMemberRolesColumnDef: any[];
    emailAddrColumnDef: any[];
    staffAcColumnDef: any[];
    stfPhonesColumnDef: any[];
    addrPhonesColumnDef: any[];
    vStfAddrColumnDef: any[];
    calColumnDef: any[];
    staffReadOnly = false;
    imageReadOnly = false;
    vStfAddrReadOnly = false;
    addrPhonesReadOnly = false;
    stfPhonesReadOnly = false;
    emailAddrReadOnly = false;
    ctrlReadOnly = false;
    staffAcReadOnly = false;
    staffMemberRolesReadOnly = false;
    calReadOnly = false;
    rgStaffAssignedCaseloadRg: any[] = [];
    rgStaffAssignedCaseloadRgDup: any[] = [];
    rgStaffMemberRolesRoleRg: any[] = [];
    rgStaffMemberRolesRoleRgDup: any[] = [];
    rgStaffAcCaseloadIdRg: any[] = [];
    rgStaffAcCaseloadIdListDup: any[] = [];
    index = 0;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    translateLabel: any;
    staffCommitModel: StaffMembersCommitBean = new StaffMembersCommitBean();
    staffAcCommitModel: StaffAccessibleCaseloadsCommitBean = new StaffAccessibleCaseloadsCommitBean();
    staffMemberRolesCommitModel: StaffMemberRolesCommitBean = new StaffMemberRolesCommitBean();
    calCommitModel: CaseLoadAgencyLocationsCommitBean = new CaseLoadAgencyLocationsCommitBean();
    lstOfStaffMem: StaffMembers[];
    caseloadIndex = 0;
    roleCode: any;
    caseloadId: any;
    locked: boolean;
    listToCompareStAcc: any[] = [];
    channelArray: string[];
    agylocPopupData: any;
    saveFlag: boolean;
    retrieveFlag: boolean;
    image: any;
    nextFlag: boolean;
    prevFlag: boolean;
    assignedFlag: boolean;
    userIdEnable: boolean;
    staffMembersColumnDef: any[];
    tableIndex: number;
    valid: boolean;
    insightHide:boolean = true;
    okMsg: string;
    okMsgMail: string;
    passStaffModelTemp : StaffMembers = new StaffMembers();
    resetButtonDisabled : boolean ;
    defaultUser : string;
    activeFlag: boolean ;
    insightsGropIdTemp : any[];
    saveBtnDisable:boolean = true;
    insightDataHide: boolean = true;
    showDocIcon:boolean = false;
    constructor(private oumusersFactory: OumusersService, private router: Router, public translateService: TranslateService,
        public dialogService: DialogService,private iwpPaneService :IWPPaneService) {
        this.staffMembersColumnDef = [];
        this.staffMemberRolesColumnDef = [];
        this.emailAddrColumnDef = [];
        this.staffAcColumnDef = [];
        this.stfPhonesColumnDef = [];
        this.addrPhonesColumnDef = [];
        this.vStfAddrColumnDef = [];
        this.calColumnDef = [];
        this.lstOfStaffMem = [];
    }
    ngOnInit() {
        this.userIdEnable = true;
        this.disabled = false;
        this.saveFlag = true;
        this.calReadOnly = true;
        this.retrieveFlag = false;
        this.nextFlag = true;
        this.prevFlag = true;
        this.assignedFlag = false;
        
        this.staffMemberRolesColumnDef = [
            {
                fieldName: this.translateService.translate('oumusers.code'), field: 'roleCode', editable: false, width: 250,
                datatype: 'text'
            },
            {
                fieldName: '', field: 'rolebutton', datatype: 'launchbutton', link: '/oumusersrls', data: 'row',
                updateField: 'row', modal: true, editable: true, width: 100, dialogWidth: '80', onLaunchClick: this.onCopyClick
            },

            {
                fieldName: this.translateService.translate('common.description'), field: 'description',
                editable: false, width: 300
            },
            {
                fieldName: this.translateService.translate('oumusers.roleid'), field: 'roleId',
                editable: false, width: 150
            },

        ];
        this.staffMembersColumnDef = [
            {
                fieldName: this.translateService.translate('common.lastname'), field: 'lastName',
                editable: false, width: 150
            },
            {    fieldName: this.translateService.translate('common.firstname'),
                 field: 'firstName', editable: false, width: 150
            },
            {     fieldName: this.translateService.translate('common.middlename'),
                field: 'middleName', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oumusers.birthdate'),
                field: 'birthdate', datatype: 'date', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.staffid'),
                field: 'staffId', editable: false, width: 150, minValue: '0',
                maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('oumusers.userid'), field: 'userId',
                editable: false, width: 150, cellEditable: this.canCellEdit, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oumusers.susstaffmemrecord'), field: 'suspendedFlag',
                editable: false, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oumusers.useraccterminationdate'),
                field: 'terminationDate', datatype: 'date', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('oumusers.assigned'), field: 'assignedCaseloadId',
                editable: true, width: 300, datatype: 'lov', link: 'oumusers/rgStaffAssignedCaseloadRecordGroup', 
                required: true
            },
            {
                fieldName: this.translateService.translate('oumusers.mailid'), field: 'mailId',
                editable: false, width: 150, datatype: 'text'
            },
        ];
        this.staffAcColumnDef = [
            {
                fieldName: this.translateService.translate('oumusers.caseloadidmandatory'), field: 'caseloadId',
                editable: false, width: 150, datatype: 'text'
            },

            {
                fieldName: '', field: 'button', datatype: 'launchbutton', link: '/oumuserscl', data: 'row', updateField: 'row', modal: true,
                editable: true, width: 100, cellEditable: this.staffIdEdit, dialogWidth: '70'
            },
            {
                fieldName: this.translateService.translate('common.description'), field: 'description', editable: false,
                width: 300
            },
            {
                fieldName: this.translateService.translate('oumusers.updatedallowed'), field: 'updateAllowedFlag',
                editable: true, datatype: 'checkbox', width: 200
            },


        ];

        const rgStaffAssignedCaseloadServiceObj = this.oumusersFactory.rgStaffAssignedCaseloadRecordGroup();
        rgStaffAssignedCaseloadServiceObj.subscribe(rgStaffAssignedCaseloadList => {
            if (rgStaffAssignedCaseloadList.length === 0) {
                this.rgStaffAssignedCaseloadRg = [];
                this.rgStaffAssignedCaseloadRgDup = [];
            } else {
                for (let i = 0; i < rgStaffAssignedCaseloadList.length; i++) {
                    this.rgStaffAssignedCaseloadRg.push({
                        'text': rgStaffAssignedCaseloadList[i].code + ' - ' +
                            rgStaffAssignedCaseloadList[i].description, 'id': rgStaffAssignedCaseloadList[i].code
                    });
                    this.rgStaffAssignedCaseloadRgDup.push({
                        'id': rgStaffAssignedCaseloadList[i].code,
                        'text': rgStaffAssignedCaseloadList[i].description
                    });
                }
            }
        });
        const rgStaffMemberRolesRoleServiceObj = this.oumusersFactory.rgStaffMemberRolesRoleRecordGroup();
        rgStaffMemberRolesRoleServiceObj.subscribe(rgStaffMemberRolesRoleList => {
            if (rgStaffMemberRolesRoleList.length === 0) {
                this.rgStaffMemberRolesRoleRg = [];
                this.rgStaffMemberRolesRoleRgDup = [];
            } else {
                for (let i = 0; i < rgStaffMemberRolesRoleList.length; i++) {
                    this.rgStaffMemberRolesRoleRg.push({
                        'text': rgStaffMemberRolesRoleList[i].roleCode + ' - ' +
                            rgStaffMemberRolesRoleList[i].roleName, 'id': rgStaffMemberRolesRoleList[i].roleId
                    });

                    this.rgStaffMemberRolesRoleRgDup.push({
                        'text': rgStaffMemberRolesRoleList[i].roleName, 'id': rgStaffMemberRolesRoleList[i].roleCode
                    });
                }
            }
        });
        const rgStaffAcCaseloadIdServiceObj = this.oumusersFactory.rgStaffAcCaseloadIdRecordGroup();
        rgStaffAcCaseloadIdServiceObj.subscribe(rgStaffAcCaseloadIdList => {
            if (rgStaffAcCaseloadIdList.length === 0) {
                this.rgStaffAcCaseloadIdRg = [];
                this.rgStaffAcCaseloadIdListDup = [];
            } else {
                for (let i = 0; i < rgStaffAcCaseloadIdList.length; i++) {
                    this.rgStaffAcCaseloadIdRg.push({
                        'text': rgStaffAcCaseloadIdList[i].caseloadId + ' - ' +
                            rgStaffAcCaseloadIdList[i].description, 'id': rgStaffAcCaseloadIdList[i].caseloadId
                    });

                    this.rgStaffAcCaseloadIdListDup.push({
                        'text':
                            rgStaffAcCaseloadIdList[i].description, 'id': rgStaffAcCaseloadIdList[i].caseloadId
                    });

                }
            }
        });
        this.staffExecuteQuery();
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'userId' && data.userIdVal) {
            return false;
        }
        return true;
    }
    onCopyClick = (event) => {
        this.rolesData = [];
        this.valid = false;
        this.dialogService.openLinkDialog('/oumusersrls', event, 80).subscribe(data => {
            if (data && data.rolesData.length > 0) {
                this.rolesData = data.rolesData;
                for (let i = 0; i < this.rolesData.length; i++) {
                    this.valid = false;
                    if (i !== 0) {
                        this.memberGrid.addRecord();
                    }
                    this.memberGrid.setColumnData('roleCode', this.staffMemberRolesData.length - 1, this.rolesData[i].roleCode);
                    this.memberGrid.setColumnData('description', this.staffMemberRolesData.length - 1, this.rolesData[i].description);
                    this.memberGrid.setColumnData('roleId', this.staffMemberRolesData.length - 1, this.rolesData[i].roleId);
                    this.valid = true;
                }
            }
        });
        this.rolesData = [];
    }

    onGridTermClear = () => {
        // this.staffExecuteQuery();
        return true;
    }
    onRowClicksenterms(event) {
        if (event) {
            this.staffModel = event;
            if(this.staffModel.staffId){
                this.showDocIcon=true;
                this.iwpPaneService.objectId=this.staffModel.staffId.toString();
            }
            this.staffAccessibleExecuteQuery();
            this.staffRolesPopulateDetails();
            this.imageExecuteQuery(this.staffModel);
            if (event.suspendedFlag === true || event.adUser === 'Y') {
                this.resetButtonDisabled = true;
            }
            else {
                this.resetButtonDisabled = false;
            }
            if(event.mailId != null && event.mailId != undefined) {
                this.insightsExecuteQuery();
                this.insightDataHide = false;
            } else {
                this.insightsUserData = [];
                this.insightDataHide = true;
            }
        }else{
            this.showDocIcon=false;
        }
    }
    /**
     * This function is called to disable row columns in grid
     */
    staffIdEdit = (data: any, index: number, field: string): boolean => {

        if (this.caseloadIndex <= index) {
            return true;
        }
        return false;
    }
    /**
      * This function is called to disable som columns in grid
      */
    staffRolesEdit = (data: any, index: number, field: string): boolean => {

        if (this.staffMemberRolesIndex <= index) {
            return true;
        }
        return false;
    }

    onButExitclick(event) {
        this.dialog.close(null);
    }
    onGridReady = () => {

        if (!this.staffModel.userId) {
            this.type = 'info';
            this.message = this.translateService.translate('oumusers.enteruserid');
            this.show();
            return;
        }

        if (!this.staffModel.assignedCaseloadId) {
            this.type = 'info';
            this.message = this.translateService.translate('oumusers.enterassignedcaseloadid');
            this.show();
            return;
        }

        if (!this.staffModel.staffId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumusers.youcannotcreatearecordwithoutaparentrecord');
            this.show();
            return;
        }

        for (let i = 0; i < this.staffMemberRolesData.length; i++) {
            if (this.valid) {
                if (this.staffMemberRolesData[i].roleCode === null || this.staffMemberRolesData[i].roleCode === undefined) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumusers.selectcode');
                    this.show();
                    return false;
                }
            }
        }
        return { rolebutton: '..', staffId: this.staffModel.staffId };
    }

    onGridStaffCaseLoadReady = () => {

        if (!this.staffModel.userId) {
            this.type = 'info';
            this.message = this.translateService.translate('oumusers.enteruserid');
            this.show();
            return;
        }

        if (!this.staffModel.assignedCaseloadId) {
            this.type = 'info';
            this.message = this.translateService.translate('oumusers.enterassignedcaseloadid');
            this.show();
            return;
        }

        if (!this.staffModel.staffId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumusers.youcannotcreatearecordwithoutaparentrecord');
            this.show();
            return;
        }



        for (let i = 0; i < this.staffAcData.length; i++) {
            if (this.staffAcData[i].caseloadId === null || this.staffAcData[i].caseloadId === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumusers.selectcode');
                this.show();
                return false;
            }
        }
        return {
            button: '..', caseloadId: this.caseloadId, description: '', updateAllowedFlag: true, staffId: this.staffModel.staffId
        };
    }

    onRowClickcal(event) {
        this.agylocPopupData = event;
    }
    /**
    * This function is fried when delete button is fired in the caseload access grid
    */
    onGridCaseLoadDelete = () => {
        for (let i = 0; i < this.staffAcData.length; i++) {
            if (!this.staffAcData[i].caseloadId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumusers.selectcaseloadId');
                this.show();
                return false;
            }
        }


        return true;
    }

    /**
     * This function is fried when delete button is fired in the user group access grid
     */
    onGridRoleCodeDelete = () => {
        for (let i = 0; i < this.staffMemberRolesData.length; i++) {
            if (!this.staffMemberRolesData[i].roleCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumusers.selectrolecode');
                this.show();
                return false;
            }
        }
        return true;
    }

    assignedCaseloadDescription() {
        if (this.staffModel.assignedCaseloadId === undefined || this.staffModel.assignedCaseloadId === null) {
            this.staffModel.assignedCaseloadIdDes = this.staffModel.assignedCaseloadId;
            return;
        } else {
            const assignedCaseLoads = this.rgStaffAcCaseloadIdListDup.
                find(caseLoads => caseLoads.id === this.staffModel.assignedCaseloadId);
            this.staffModel.assignedCaseloadIdDes = assignedCaseLoads.text;
        }

        if (!this.vStaffModelTemp.staffId) {
            this.saveFlag = false;
        }
        /*if (!this.assignedFlag) {
            this.assignedFlag = true;
            return;
        }*/
        this.saveFlag = false;

    }

    activeFlagWhenCheckboxChangedTrigger(event) {
        if (!this.vStaffModelTemp.staffId) {
            this.saveFlag = false;
        }

        this.saveFlag = false;

    }

    isValidDate(event) {

        if (!this.vStaffModelTemp.staffId) {
            this.saveFlag = false;
        }

        this.saveFlag = false;
    }

    updateDescriptionValidator = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event.field === 'caseloadId') {
            const assignedCaseLoads = this.rgStaffAcCaseloadIdListDup.
                find(caseLoads => caseLoads.id === event.newValue);
            rowdata.validated = true;
            rowdata.data = {
                caseloadId: event.newValue,
                description: assignedCaseLoads.text
            };

            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }

    cancel() {
        this.lstOfStaffMem = [];
        const assignedCaseloadId = this.staffModel.assignedCaseloadId === undefined ? '' : undefined;
        this.staffModel = new StaffMembers();
        this.staffModel.assignedCaseloadId = assignedCaseloadId;
        this.staffMemberRolesModel = new StaffMemberRoles();
        this.staffMemberRolesData = [];
        this.staffData = [];
        this.staffAcModel = new StaffAccessibleCaseloads();
        this.staffAcData = [];
        this.listToCompareStAcc = [];
        this.listToCompareStaffRoles = [];
        // this.calReadOnly = true;
        this.disabled = false;
        this.saveFlag = true;
        this.retrieveFlag = false;
        this.image = null;
        this.staffIndex = 0;
        this.index = 0;
        this.nextFlag = true;
        this.prevFlag = true;
        this.assignedFlag = false;
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    staffRolesPopulateDetails() {
        this.listToCompareStaffRoles = [];
        this.staffMemberRolesModel = new StaffMemberRoles();
        this.staffMemberRolesModel.staffId = this.staffModel.staffId;
        const serviceObj = this.oumusersFactory.staffMemberRolesExecuteQuery(this.staffMemberRolesModel);
        serviceObj.subscribe(lstStaffRoles => {
            if (lstStaffRoles.length === 0) {
                this.staffMemberRolesData = [];
                this.staffMemberRolesModel = new StaffMemberRoles();
            } else {
                for (let i = 0; i < lstStaffRoles.length; i++) {
                    const roleMember = this.rgStaffMemberRolesRoleRgDup.
                        find(staffMemberRoles => staffMemberRoles.id === lstStaffRoles[i].roleCode);
                    if (roleMember !== null && roleMember !== undefined) {
                        lstStaffRoles[i].description = roleMember.text;
                    }
                    this.listToCompareStaffRoles.push(lstStaffRoles[i].roleCode);

                }
                this.staffMemberRolesData = lstStaffRoles;
                this.staffMemberRolesIndex = this.staffMemberRolesData.length;
                this.staffMemberRolesModel = this.staffMemberRolesData[0];

            }
        });
    }


    /**
    * This function retrieves Staff Accessible Caseloads
    */
    staffAccessibleExecuteQuery() {
        this.listToCompareStAcc = [];
        this.staffAcModel = new StaffAccessibleCaseloads();
        this.staffAcModel.staffId = this.staffModel.staffId;
        const serviceObj = this.oumusersFactory.staffAcExecuteQuery(this.staffAcModel);
        serviceObj.subscribe(lstStaffAcc => {
            if (lstStaffAcc.length === 0) {
                this.staffAcData = [];
                this.calReadOnly = true;
                this.listToCompareStAcc = [];
                this.staffAcDataTemp = [];
                this.staffAcModel = new StaffAccessibleCaseloads();
            } else {
                for (let i = 0; i < lstStaffAcc.length; i++) {
                    lstStaffAcc[i].updateAllowedFlag = (lstStaffAcc[i].updateAllowedFlag === 'N') ? false : true;
                    this.listToCompareStAcc.push(lstStaffAcc[i].caseloadId);
                }
                this.calReadOnly = false;
                this.staffAcData = lstStaffAcc;
                this.staffAcDataTemp = JSON.parse(JSON.stringify(lstStaffAcc));
                this.caseloadIndex = this.staffAcData.length;
                this.staffAcModel = this.staffAcData[0];
            }
        });

    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    saveStaffMemberForm(event) {
        this.staffUpdateList = event.updated;
        this.staffCommitModel.updateList = [];
        if (this.staffUpdateList.length > 0) {
            for (let i = 0; i < this.staffUpdateList.length; i++) {
                if(!this.staffUpdateList[i].assignedCaseloadId) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumusers.assignedmustbeentered');
                    this.show();
                    return;
                }else{
                    if(this.staffAcDataTemp && this.staffAcDataTemp.length > 0){
                         const caseLoadAcces =  this.staffAcDataTemp.filter(e => e.caseloadId === this.staffUpdateList[i].assignedCaseloadId);
                         if(caseLoadAcces && caseLoadAcces.length === 0){
                          this.type = 'warn';
                          this.message = this.translateService.translate('oumusers.assignedcaseloadnotinaccesscaselaod');
                          this.show();
                          return;
                         }
                   }
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.staffUpdateList[i].terminationDate), DateFormat.getDate()) === -1) {
                    const rowIndex = this.staffData.indexOf(this.staffUpdateList[i]);
                    this.grid.setColumnData('terminationDate', rowIndex, undefined);
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumusers.datevalidation');
                    this.show();
                    return;
                }
                if (this.staffUpdateList[i].lastName === undefined || this.staffUpdateList[i].lastName === null) {
                    return;
                }
                if (this.staffUpdateList[i].userId === undefined || this.staffUpdateList[i].userId === null) {
                     this.type = 'warn';
                    this.message = this.translateService.translate('oumusers.useridmustbeentered');
                    this.show();
                    return;
                }
                this.staffUpdateList[i].suspendedFlag = this.staffUpdateList[i].suspendedFlag ? 'Y' : 'N';
            }
            this.staffCommitModel.updateList = this.staffUpdateList;
        }


        const staffSaveData = this.oumusersFactory.staffCommit(this.staffCommitModel);
        staffSaveData.subscribe(data => {
            if (data !== undefined && data === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.pleaseprovideadifferentuseridasthisidalreadyexists');
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else if (data !== undefined && data === 3) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.pleaseprovideadifferentuseridasthisisnotanapplicationuserid');
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else if (data !== undefined && data === 4) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.fieldmustbeginwithanalphabeticcharacter');
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else if (data !== undefined && data.length > 1) {
                data = data.replace('5', '');
                this.type = 'warn';
                this.message = this.translateService.translate('common.fieldcontainstheillegalcharacters') + data;
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else if (data !== undefined && data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.staffModel = new StaffMembers();
                this.staffExecuteQuery();
                this.show();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.cancel();
                this.show();
            }
        });
    }
    /**
     * This function retrieves the Staff Member details
     */
    staffExecuteQuery() {
        this.image = null;
        if (this.staffModel !== undefined && this.staffModel !== null) {
            if (this.staffModel.suspendedFlag !== undefined && this.staffModel.suspendedFlag !== null) {
                if (this.staffModel.suspendedFlag) {
                    this.staffModel.suspendedFlag = 'Y';
                } else {
                    this.staffModel.suspendedFlag = 'N';
                }
            }
        }
        const serviceObj = this.oumusersFactory.staffExecuteQuery(this.staffModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.userIdEnable = true;
                this.staffModel = new StaffMembers();
                this.lstOfStaffMem = [];
                this.retrieveFlag = false;
                this.type = 'info';
                this.nextFlag = true;
                this.prevFlag = true;
                this.assignedFlag = false;
                this.message = this.translateService.translate('common.querycaused');
                this.show();
            } else {
                this.staffIndex = 0;
                this.index = 0;
                for (let i = 0; i < data.length; i++) {
                    data[i].suspendedFlag = data[i].suspendedFlag === 'Y' ? true : false;
                    if (data[i].birthdate !== null) {
                        data[i].birthdate = DateFormat.getDate(data[i].birthdate);
                    }
                    if (data[i].terminationDate !== null) {
                        data[i].terminationDate = DateFormat.getDate(data[i].terminationDate);
                    }
                    for (let j = 0; j < this.rgStaffAssignedCaseloadRgDup.length; j++) {
                        if ((this.rgStaffAssignedCaseloadRgDup[j].id).includes(data[i].assignedCaseloadId)) {
                            {
                                data[i].assignedCaseloadIdDes = this.rgStaffAssignedCaseloadRgDup[j].text;
                            }
                        }
                    }
                }
                this.staffData = data;
                this.lstOfStaffMem = data;
                this.staffModel = this.staffData[0];
                this.vStaffModelTemp = this.staffData[0];
                this.tableIndex = 0;
                this.staffAccessibleExecuteQuery();
                this.staffRolesPopulateDetails();
                this.listToCompareStAcc = [];
                this.listToCompareStaffRoles = [];
                // this.calReadOnly = false;
                this.disabled = true;
                this.saveFlag = true;
                this.nextFlag = false;
                this.retrieveFlag = true;
                this.assignedFlag = false;
                if (this.staffModel.userId) {
                    this.userIdEnable = true;
                } else {
                    this.userIdEnable = false;
                }
            }
        });
    }

    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    dateFormat(dateValue) {
        if (dateValue !== undefined && dateValue.length > 0) {
            const newdate = dateValue.split('/');
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    calPopulateDetails() {
        this.staffAcModel = this.staffAcData[this.index];
        const serviceObj = this.oumusersFactory.
            calExecuteQuery(this.staffAcModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.type = 'info';
                this.message = this.translateService.translate('common.querycaused');
                this.calData = [];
                this.show();
            } else {
                this.calData = data;
            }
        });
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    saveStaffAcForm(event) {
        this.staffAcInsertList = event.added;
        this.staffAcUpdateList = event.updated;
        this.staffAcDeleteList = event.removed;
        this.staffAcCommitModel.insertList = [];
        this.staffAcCommitModel.updateList = [];
        this.staffAcCommitModel.deleteList = [];
        this.channelArray = [];

        if (this.staffAcInsertList.length > 0) {

            if (this.listToCompareStAcc.length > 0) {
                for (let i = 0; i < this.listToCompareStAcc.length; i++) {
                    this.channelArray.push(this.listToCompareStAcc[i]);
                }
            }
            for (let i = 0; i < this.staffAcInsertList.length; i++) {

                if (this.staffAcInsertList[i].caseloadId === undefined ||
                    this.staffAcInsertList[i].caseloadId === null) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oumusers.selectcaseloadId');
                    this.show();
                    return;
                }
                if (this.channelArray.includes(this.staffAcInsertList[i].caseloadId)) {
                    this.type = 'error';
                    this.staffAccessibleExecuteQuery();
                    this.message = this.translateService.translate('oumusers.caseloadalreadyexists');
                    this.show();
                    return;
                } else {
                    this.channelArray.push(this.staffAcInsertList[i].caseloadId);
                    if (this.staffAcInsertList[i].updateAllowedFlag) {
                        this.staffAcInsertList[i].updateAllowedFlag = 'Y';
                    } else {
                        this.staffAcInsertList[i].updateAllowedFlag = 'N';
                    }
                }
            }

            this.staffAcCommitModel.insertList = this.staffAcInsertList;
        }
        if (this.staffAcUpdateList.length > 0) {
            for (let i = 0; i < this.staffAcUpdateList.length; i++) {
                if (this.staffAcUpdateList[i].updateAllowedFlag) {
                    this.staffAcUpdateList[i].updateAllowedFlag = 'Y';
                } else {
                    this.staffAcUpdateList[i].updateAllowedFlag = 'N';
                }
            }

            this.staffAcCommitModel.updateList = this.staffAcUpdateList;
        }

        if (this.staffAcDeleteList.length > 0) {
            for (let i = 0; i < this.staffAcDeleteList.length; i++) {
            }
            this.staffAcCommitModel.deleteList = this.staffAcDeleteList;
        }
        if (this.staffAcCommitModel.insertList.length === 0 && this.staffAcCommitModel.updateList.length === 0
            && this.staffAcCommitModel.deleteList.length === 0) {
            return;
        }
        const staffacSaveData = this.oumusersFactory.staffAcCommit(this.staffAcCommitModel);
        staffacSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.staffAccessibleExecuteQuery();
                this.show();
            } else if (data === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumusers.thiscaseloadcannotbedeletedbecausestaffalredyhasbeenassigned');
                this.staffAccessibleExecuteQuery();
                this.show();
            } else if (data === 3) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumusers.thiscaseloadcannotbedeletedbecausestaffalredyhasbeenworking');
                this.staffAccessibleExecuteQuery();
                this.show();
            }
            else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.cancel();
                this.show();
            }
        });
    }

    /**
     * This function is to retrieve staff member roles
     */
    staffMemberRolesExecuteQuery() {
        const staffMemberRolesResult = this.oumusersFactory.staffMemberRolesExecuteQuery(this.staffMemberRolesModel);
        staffMemberRolesResult.subscribe(staffMemberRolesResultList => {
            if (staffMemberRolesResultList.length === 0) {
                this.staffMemberRolesData = [];
            } else {
                this.staffMemberRolesData = staffMemberRolesResultList;
                this.staffMemberRolesModel = staffMemberRolesResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    saveStaffMemberRolesForm(event) {
        this.staffMemberRolesInsertList = event.added;
        this.staffMemberRolesUpdateList = event.updated;
        this.staffMemberRolesDeleteList = event.removed;
        this.staffMemberRolesCommitModel.insertList = [];
        this.staffMemberRolesCommitModel.updateList = [];
        this.staffMemberRolesCommitModel.deleteList = [];
        if (this.staffMemberRolesInsertList.length > 0) {

            this.channelArray = [];
            if (this.listToCompareStaffRoles.length > 0) {
                for (let i = 0; i < this.listToCompareStaffRoles.length; i++) {
                    this.channelArray.push(this.listToCompareStaffRoles[i]);
                }
            }
            for (let i = 0; i < this.staffMemberRolesInsertList.length; i++) {
                if (this.staffMemberRolesInsertList[i].roleCode === undefined ||
                    this.staffMemberRolesInsertList[i].roleCode === null) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oumusers.selectrolecode');
                    this.show();
                    return;
                }

                if (this.channelArray.includes(this.staffMemberRolesInsertList[i].roleCode)) {
                    this.type = 'error';
                    this.staffRolesPopulateDetails();
                    this.message = this.translateService.translate('oumusers.rolecodealreadyexists');
                    this.show();
                    return;
                } else {
                    this.channelArray.push(this.staffMemberRolesInsertList[i].roleCode);

                }
            }
            this.staffMemberRolesCommitModel.insertList = this.staffMemberRolesInsertList;

        }
        if (this.staffMemberRolesUpdateList.length > 0) {
            this.staffMemberRolesCommitModel.updateList = this.staffMemberRolesUpdateList;
        }

        if (this.staffMemberRolesDeleteList.length > 0) {
            this.staffMemberRolesCommitModel.deleteList = this.staffMemberRolesDeleteList;
        }

        if (this.staffMemberRolesCommitModel.insertList.length === 0 && this.staffMemberRolesCommitModel.updateList.length === 0
            && this.staffMemberRolesCommitModel.deleteList.length === 0) {
            return;
        }
        const staffMemberRolesSaveData = this.oumusersFactory.staffMemberRolesCommit(this.staffMemberRolesCommitModel);
        staffMemberRolesSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.staffRolesPopulateDetails();
                this.show();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.cancel();
                this.show();
            }
        });
    }
    /**
     * This function is used to retrieve agencyloc
     */
    calExecuteQuery() {
        const calResult = this.oumusersFactory.calExecuteQuery(this.calModel);
        calResult.subscribe(calResultList => {
            if (calResultList.length === 0) {
                this.calData = [];
            } else {
                this.calData = calResultList;
                this.calModel = calResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oumusersSavecalForm(event) {
        this.calInsertList = event.added;
        this.calUpdateList = event.updated;
        this.calDeleteList = event.removed;
        this.calCommitModel.insertList = [];
        this.calCommitModel.updateList = [];
        this.calCommitModel.deleteList = [];
        if (this.calInsertList.length > 0 || this.calUpdateList.length > 0) {
            for (let i = 0; i < this.calInsertList.length; i++) {
            }
            for (let i = 0; i < this.calUpdateList.length; i++) {
            }
            this.calCommitModel.insertList = this.calInsertList;
            this.calCommitModel.updateList = this.calUpdateList;
        }
        if (this.calDeleteList.length > 0) {
            for (let i = 0; i < this.calDeleteList.length; i++) {
            }
            this.calCommitModel.deleteList = this.calDeleteList;
        }
        const calSaveData = this.oumusersFactory.calCommit(this.calCommitModel);
        calSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });

    }


    /**
     * This function retrieves next staff members from the retrieved list
     */
    butOffendersKeyNextItemTrigger() {
        if (this.lstOfStaffMem.length === 0) {
            return;
        }
        if ((this.staffIndex) < this.lstOfStaffMem.length - 1) {
            this.staffIndex = this.index + 1;
            this.staffModel = this.lstOfStaffMem[this.staffIndex];
            this.staffAccessibleExecuteQuery();
            this.staffRolesPopulateDetails();
            // this.calReadOnly = false;
            this.assignedFlag = false;
            this.prevFlag = false;
            this.disabled = true;
            this.saveFlag = true;
            this.retrieveFlag = true;
            this.index = this.index + 1;
        } else {
            this.type = 'warning';
            this.message = this.translateService.translate('common.nosetofrecordsexist');
            this.show();
            this.nextFlag = true;
            this.prevFlag = false;
        }
    }

    /**
   * This function retrieves next staff members from the retrieved list
   */
    butOffendersKeyPrevItemTrigger() {
        if (this.lstOfStaffMem.length === 0) {
            return;
        }
        if (this.staffIndex >= 1) {
            this.staffIndex = this.staffIndex - 1;
            this.index = this.staffIndex;
            this.staffModel = this.lstOfStaffMem[this.staffIndex];
            this.staffAccessibleExecuteQuery();
            this.staffRolesPopulateDetails();
            // this.calReadOnly = false;
            this.disabled = true;
            this.assignedFlag = false;
            this.saveFlag = true;
            this.nextFlag = false;
            this.retrieveFlag = true;
        } else {
            this.nextFlag = false;
            this.prevFlag = true;
        }
    }

    
    imageExecuteQuery(event) {
        const imageResult = this.oumusersFactory.
        imageExecuteQuery(this.staffModel);
        imageResult.subscribe(imageResultList => {
           if (imageResultList.length === 0) {
              this.image = null;
           } else {
              if (imageResultList.length > 0 && imageResultList[0].imageThumbnail) {
                 this.image = 'data:image/JPEG;base64,' + imageResultList[0].imageThumbnail;
              }
           }
        });
     }

     insightsExecuteQuery() {
        const insightsResult = this.oumusersFactory.insightsExecuteQuery(this.staffModel);
        insightsResult.subscribe(insightsResultList => {
            if (insightsResultList.length === 0) {
                this.insightHide = false;
                this.userCreation.insightsGropId = [];
                this.insightsGropIdTemp = [];
                this.activeFlag = false;
                this.saveBtnDisable = false;
            } else {
                this.insightHide = true;
                this.saveBtnDisable = true;
                this.userCreation.insightsGropId = insightsResultList[0].insightsGropId;
                this.insightsGropIdTemp = JSON.parse(JSON.stringify(insightsResultList[0].insightsGropId));
                if(insightsResultList[0].status == 'Active') {
                    this.activeFlag = true;
                } else {
                    this.activeFlag = false;
                }
            }
        });
     }

     createInsightUser() {
        this.userCreation.firstName = this.staffModel.firstName;
        this.userCreation.lastName = this.staffModel.lastName;
        this.userCreation.mailId = this.staffModel.mailId;
        if(this.userCreation.insightsGropId === undefined || this.userCreation.insightsGropId === null){
            this.type = 'warn';
            this.message = this.translateService.translate('oumucreat.pleaseselectinsightsgroupid');
            this.show();
            return;
        }
        const userSaveData = this.oumusersFactory.createInsightUser(this.userCreation);
        userSaveData.subscribe(data => {
            if (data === 200) {
                this.insightsExecuteQuery()
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('oumusers.faildtoassigninsightaccess');
                this.show();
            }
        });
     }

     removeInsightUser() {
        this.userCreation.mailId = this.staffModel.mailId;
        const userSaveData = this.oumusersFactory.removeInsightUser(this.userCreation);
        userSaveData.subscribe(data => {
            if (data === 204) {
                this.insightsExecuteQuery()
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('oumusers.faildtoassigninsightaccess');
                this.show();
            }
        });
     }

     whenTabChangedTrigger(event){
     }

     resetPassword() {
        const passStaffModel = this.oumusersFactory.resetPassword(this.staffModel).subscribe(data => {
            if (data.passwordReturnVal === 1) {
                this.okMsgMail = this.translateService.translate('oumusers.passwordresetwithmailconfigured').
                    replace('%password%', data.password);
                this.okMsg = this.translateService.translate('oumusers.passwordresetwithoutmailconfigured').
                    replace('%password%', data.password);
                const okData = {
                    label: this.okMsg,
                    yesBtn: true, noBtn: false, yesLabel: "OK"
                };
                const okDataMail = {
                    label: this.okMsgMail,
                    yesBtn: true, noBtn: false, yesLabel: "OK"
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', this.staffModel.mailId ? okDataMail : okData, 50).subscribe(result => {
                    if (result) {
                        this.type = 'success';
                        this.message = this.translateService.translate('oumusers.passwordsuccess');
                        this.show();
                        this.dialog.close(null);
                    } else {
                        this.type = 'error';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                    }
                });
            }
            else if (data.passwordReturnVal === 10) {
                this.defaultUser = this.translateService.loginTranslate('login.cantresetpass');
                const okDataMail = {
                    label: this.defaultUser,
                    yesBtn: true, noBtn: false, yesLabel: "OK"
                }
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', okDataMail, 50).subscribe(result => {

                });
            }
            else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
            
    }

    onInsGroupsChange(event){
        if(JSON.stringify(this.userCreation.insightsGropId) != JSON.stringify(this.insightsGropIdTemp)) {
            this.saveBtnDisable = false;
        } else {
            this.saveBtnDisable = true;
        }
    }

    saveBtnClick() {
        this.userCreation.mailId = this.staffModel.mailId;
        if(this.userCreation.insightsGropId === undefined || this.userCreation.insightsGropId === null || this.userCreation.insightsGropId.length === 0){
            this.type = 'warn';
            this.message = this.translateService.translate('oumucreat.pleaseselectinsightsgroupid');
            this.show();
            return;
        }
        const userSaveData = this.oumusersFactory.updateUsersInsGroups(this.userCreation);
        userSaveData.subscribe(data => {
            if (data === 1) {
                this.saveBtnDisable = true;
                this.insightsExecuteQuery()
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.saveBtnDisable = false;
                this.type = 'error';
                this.message = this.translateService.translate('oumusers.faildtoassigninsightaccess');
                this.show();
            }
        });
    }
    
}
