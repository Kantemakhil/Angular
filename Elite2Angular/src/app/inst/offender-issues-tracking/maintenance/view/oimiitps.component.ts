import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OmsRoles } from '@sa/usersystemsecurity/beans/OmsRoles';
import { GrievanceTypes } from '../beans/GrievanceTypes';
import { GrievanceTypesCommitBean } from '../beans/GrievanceTypesCommitBean';
import { OimiitpsService } from '../service/oimiitps.service';
// import required bean declarations

@Component({
    selector: 'app-oimiitps',
    templateUrl: './oimiitps.component.html'
})

export class OimiitpsComponent implements OnInit {
    @ViewChild('grid') grid: any;
    selectDisBtn = true;
    lovModel: any[];
    msgs: any[] = [];
    minDate: any;
    display: boolean;
    sentenceColumnDef: any[];
    sentenceData: any[] = [];
    tableIndex = 0;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    userRolesColumnDef: any[];
    issueTypePermissionColumnDef: any[];
    omsroleModel: OmsRoles = new OmsRoles();
    omsroleData: OmsRoles[] = [];
    grievtypesData: GrievanceTypes[] = [];
    omsRoleColumnValues: any;
    userRoleModel: OmsRoles = new OmsRoles();
    grievanceTypesModel: GrievanceTypes = new GrievanceTypes();
    grievtypesIndex: number;
    type = 'error';
    message = ' Invalid.';
    msglist = [];
    searchBean: GrievanceTypes;
    grievancetypesUpdatetList: GrievanceTypes[] = [];
    insertDisable: boolean;
    grievancetypesCommitModel: GrievanceTypesCommitBean = new GrievanceTypesCommitBean();
    onViewFlagbutton: boolean = true;
    createFlagToggled: boolean = false;
    constructor(public translateService: TranslateService,
        public sessionManager: UserSessionManager, private oimiitpsService: OimiitpsService) {
        // TODO initilize data members here..!
        this.sentenceColumnDef = [];
    }
    ngOnInit() {
        this.userRolesColumnDef = [
            {
                fieldName: this.translateService.translate('oimiitps.roleid'), field: 'roleId', editable: false, width: 330,
            },
            {
                fieldName: this.translateService.translate('oimiitps.code'), field: 'roleCode', editable: false, width: 330,
                uppercase: 'true', datatype: 'text', maxlength: '30'
            },
            { fieldName: this.translateService.translate('oimiitps.rolename'), field: 'roleName', editable: false, width: 330 },

        ];
        this.issueTypePermissionColumnDef = [
            {
                fieldName: this.translateService.translate('oimiitps.issuetype'), field: 'grievType', editable: false, width: 150,
                datatype: 'lov', link: 'oimiitps/grievenceTypeRecordGroup'
            },
            {
                fieldName: this.translateService.translate('oimiitps.issuereason'), field: 'grievReasonCode',
                editable: false, width: 150, datatype: 'lov', link: 'oimiitps/grievenceReasonRecordGroup?grievType=', parentField: 'grievType'
            },
            {
                fieldName: this.translateService.translate('oimiitps.create/amend'), field: 'createFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oimiitps.view'), field: 'viewFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
        ];
        this.userRolesExecuteQuery();

    }
    userRolesExecuteQuery() {
        this.omsroleModel.createDateTime = DateFormat.getDate();
        this.omsroleModel.modifyDateTime = DateFormat.getDate();
        const omsroleResult = this.oimiitpsService.omsRoleExecuteQuery(this.omsroleModel);
        omsroleResult.subscribe(omsroleResultList => {
            if (omsroleResultList.length === 0) {
                this.omsroleData = [];
            } else {
                this.omsroleData = omsroleResultList;
                for (let i = 0; i < omsroleResultList.length; i++) {
                    this.omsRoleColumnValues.push({
                        'roleCode': omsroleResultList[i].roleCode, 'roleName': omsroleResultList[i].roleName,
                        'id': omsroleResultList[i].roleId
                    });
                }
                this.omsroleModel = omsroleResultList[0];
            }
        });
    }

    onUserRoleRowClick(event) {
        this.userRoleModel = event;
        this.grievencePermissionExecuteQuery();
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    grievencePermissionExecuteQuery() {
        this.grievanceTypesModel = new GrievanceTypes();
        this.grievanceTypesModel.roleId = this.userRoleModel.roleId
        const serviceObj = this.oimiitpsService.grievencePermissionExecuteQuery(this.grievanceTypesModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.grievtypesIndex = -1;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                this.searchBean = new GrievanceTypes();
            } else {
                data.forEach(ele => {
                    ele.viewFlag = ele.viewFlag === 'Y' ? true : false;
                    ele.createFlag = ele.createFlag === 'Y' ? true : false;
                });
                this.grievtypesData = data;
                this.grievtypesIndex = 0;
            }
        });
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'createFlag') {
            if (event.data.createFlag) {
                this.grid.setColumnData('viewFlag', rowIndex, 'Y');
                this.createFlagToggled = event.data.createFlag;       
                this.onViewFlagbutton = !this.createFlagToggled;
                rowdata.validated = true;
                return rowdata;
            }

        }
        if(event.field === 'viewFlag'){
        if (event.data.createFlag === true) {
            if (event.data.viewFlag === false) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimiitps.revokeviewoption');
                this.show();
                this.grid.setColumnData('viewFlag', rowIndex, 'Y');
                this.onViewFlagbutton = true;
                rowdata.validated = true;
                return rowdata;
            }
            else {

                this.onViewFlagbutton = false;
            }
        }
    }

        rowdata.validated = true;
        return rowdata;
    }

    issueTypePermissionSave(event) {
        this.grievancetypesUpdatetList = [];
        this.grievancetypesUpdatetList = event.updated;
        this.grievancetypesCommitModel.updateList = [];
        if (this.grievancetypesUpdatetList.length > 0) {
            this.grievancetypesUpdatetList.forEach(data => {
                data.createFlag = (data.createFlag) ? 'Y' : 'N';
                data.viewFlag = (data.viewFlag) ? 'Y' : 'N'
                data.roleId = this.userRoleModel.roleId;

            });

            this.grievancetypesCommitModel.updateList = this.grievancetypesUpdatetList;
            const refcodeSaveData = this.oimiitpsService.grievencePermissionCommit(this.grievancetypesCommitModel);
            refcodeSaveData.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.grievencePermissionExecuteQuery();
                } else {

                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();

                }
            });
        }
    }


}
