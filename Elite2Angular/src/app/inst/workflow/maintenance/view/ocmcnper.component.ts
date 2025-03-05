import {
    Component, OnInit, ViewChild
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OmsRoles } from '@sa/usersystemsecurity/beans/OmsRoles';
import { Work } from '../beans/Work';
import { WorkCommitBean } from '../beans/WorkCommitBean';
import { OcmcnperService } from '../service/ocmcnper.service';




// import required bean declarations

@Component({
    selector: 'app-ocmcnper',
    templateUrl: './ocmcnper.component.html',
})
export class OcmcnperComponent implements OnInit {
    @ViewChild('grid') grid: any;
    msgs: any[] = [];
    userRolesColumnDef: any[];
    caseNotePermissionColumnDef: any[];
    omsroleModel: OmsRoles = new OmsRoles();
    omsroleData: OmsRoles[] = [];
    omsRoleColumnValues: any;
    wfworktypesModel: Work = new Work();
    wfworktypesData: Work[] = [];
    wfworktypesIndex: number;
    searchBean: Work;
    userRoleModel: OmsRoles = new OmsRoles();
    wfworktypesUpdateList: Work[] = [];
    wfworktypesCommitModel: WorkCommitBean = new WorkCommitBean();
    type = 'error';
    message = ' Invalid.';
    msglist = [];
    constructor(private ocmcnperFactory: OcmcnperService, public translateService: TranslateService) {

    }
    ngOnInit() {

        this.userRolesColumnDef = [
            {
                fieldName: this.translateService.translate('ocmcnper.roleid'), field: 'roleId', editable: false, width: 330,
            },
            {
                fieldName: this.translateService.translate('common.code'), field: 'roleCode', editable: false, width: 330,
                uppercase: 'true', datatype: 'text', maxlength: '30'
            },
            { fieldName: this.translateService.translate('oumroles.rolenamefield'), field: 'roleName', editable: false, width: 330 },

        ];
        this.caseNotePermissionColumnDef = [
            {
                fieldName: this.translateService.translate('ocmcnper.casenotetype'), field: 'workType', editable: false, width: 150,
                datatype: 'lov', domain: 'TASK_TYPE',
            },
            {
                fieldName: this.translateService.translate('ocmcnper.casenotesubtype'), field: 'workSubType',
                editable: false, width: 150, datatype: 'lov', domain: 'TASK_SUBTYPE'
            },
            {
                fieldName: this.translateService.translate('common.agencytype'), field: 'caseloadType', editable: false, width: 150,
                datatype: 'lov', domain: 'CLOAD_TYPE'
            },
            {
                fieldName: this.translateService.translate('ocmcnper.createamend'), field: 'createFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.view'), field: 'viewFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
        ];

        this.userRolesExecuteQuery();

    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    onUserRoleRowClick(event) {
        this.userRoleModel = event;
        this.caseNotePermissionQuery();
    }

    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'createFlag') {
            if (event.data.createFlag) {
                this.grid.setColumnData('viewFlag', rowIndex, 'Y');
                rowdata.validated = true;
                return rowdata;
            }

        }

        if (event.data.createFlag === true) {
            if (event.data.viewFlag === false) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmcnper.revokeviewoption');
                this.show();
                this.grid.setColumnData('viewFlag', rowIndex, 'Y');
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    userRolesExecuteQuery() {
        this.omsroleModel.createDateTime = DateFormat.getDate();
        this.omsroleModel.modifyDateTime = DateFormat.getDate();
        const omsroleResult = this.ocmcnperFactory.omsRoleExecuteQuery(this.omsroleModel);
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

    caseNotePermissionQuery() {
        this.wfworktypesModel = new Work();
        this.wfworktypesModel.roleId = this.userRoleModel.roleId
        const serviceObj = this.ocmcnperFactory.caseNotePermissionExecuteQuery(this.wfworktypesModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.wfworktypesIndex = -1;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                this.searchBean = new Work();
            } else {
                data.forEach(ele => {
                    ele.viewFlag = ele.viewFlag === 'Y' ? true : false;
                    ele.createFlag = ele.createFlag === 'Y' ? true : false;
                });
                this.wfworktypesData = data;
                this.wfworktypesIndex = 0;
            }
        });
    }


    caseNotePermissionSave(event) {
        this.wfworktypesUpdateList = [];
        this.wfworktypesUpdateList = event.updated;
        this.wfworktypesCommitModel.updateList = [];
        if (this.wfworktypesUpdateList.length > 0) {
            this.wfworktypesUpdateList.forEach(data => {
                data.createFlag = (data.createFlag) ? 'Y' : 'N';
                data.viewFlag = (data.viewFlag) ? 'Y' : 'N'
                data.roleId = this.userRoleModel.roleId;

            });

            this.wfworktypesCommitModel.updateList = this.wfworktypesUpdateList;
            const refcodeSaveData = this.ocmcnperFactory.caseNotePermissionCommit(this.wfworktypesCommitModel);
            refcodeSaveData.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.caseNotePermissionQuery();
                } else {

                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    this.caseNotePermissionQuery();
                }
            });
        }
    }


}