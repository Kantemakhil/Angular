import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumsmugaService } from '../service/oumsmuga.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffMemberRolesCommitBean } from '../../usersystemsecurity/beans/StaffMemberRolesCommitBean';
import { StaffMemberRoles } from '../../usersystemsecurity/beans/StaffMemberRoles';
import { OmsRoles } from '../../usersystemsecurity/beans/OmsRoles';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';

@Component({
    selector: 'app-oumsmuga',
    templateUrl: './oumsmuga.component.html'
})

export class OumsmugaComponent implements OnInit {
    @ViewChild('staffMemGrid', {static: true}) staffMemGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    omsroleDataTemp: OmsRoles[] = [];
    omsroleModel: OmsRoles = new OmsRoles();
    omsroleIndex: number;
    omsroleInsertList: OmsRoles[] = [];
    omsroleUpdatetList: OmsRoles[] = [];
    omsroleDeleteList: OmsRoles[] = [];
    userGroupColumnDef: any[];
    omsroleData: OmsRoles[] = [];
    staffroleData: StaffMemberRoles[] = [];
    staffroleDupData: any[] = [];
    staffroleModel: StaffMemberRoles = new StaffMemberRoles();
    staffroleIndex: number;
    staffRoleColumnDef: any[];
    staffroleInsertList: StaffMemberRoles[] = [];
    staffroleUpdateList: StaffMemberRoles[] = [];
    staffroleDeleteList: StaffMemberRoles[] = [];
    staffroleCommitModel: StaffMemberRolesCommitBean = new StaffMemberRolesCommitBean();
    editable: boolean;
    staffRoleReadOnly: boolean;
    staffRoleEnableDelete: boolean;
    msglist: any[];
    message: any;
    type: any;
    index: any;
    tableIndex: number;
    staffRoleIdData: any[];
    constructor(private oumsmugaFactory: OumsmugaService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.staffRoleColumnDef = [];
        this.userGroupColumnDef = [];
    }
    setupTitle = {
        code: this.translateService.translate('Oracle User Id'),
        lastName: this.translateService.translate('Last Name'),
        firstName: this.translateService.translate('First Name'),
        middleName: this.translateService.translate('Middle Name')
    };

    ngOnInit() {
        this.oumsmugaexecuteQuery();

        this.userGroupColumnDef = [
            {
                fieldName: this.translateService.translate('oumsmuga.roleId'), field: 'roleId', datatype: 'text',
                editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('oumsmuga.roleName'), field: 'roleName', datatype: 'text',
                editable: true, width: 150
            },
        ];

        this.staffRoleColumnDef = [
            {
                fieldName: this.translateService.translate('oumsmuga.oracleUserId'), field: 'userId', datatype: 'lov',
                link: 'oumsmuga/cgfkStaffRoleDspUserIdRecordGroup', titles: this.setupTitle, editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('common.lastname'), field: 'lastName', datatype: 'text',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.firstname'), field: 'firstName', datatype: 'text',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.middlename'), field: 'middleName', datatype: 'text',
                editable: false, width: 150
            },
            { fieldName: '', field: 'test', hide: true },
            { fieldName: '', field: 'staffId', hide: true },
        ];
        const serviceObj = this.oumsmugaFactory.cgfkStaffRoleDspUserIdRecordGroup();
        serviceObj.subscribe(data => {
            this.staffRoleIdData = data;
        });
    }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    validateRowData = (event) => {
        const rowIndex = this.staffroleData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        let count = 0;
        if (event.data.userId && event.newValue !== event.oldValue) {
            for (let i = 0; i < this.staffroleDupData.length; i++) {
                if (this.staffroleDupData[i].userId === event.data.userId) {
                    count = count + 1;
                    this.staffMemGrid.setColumnData('userId', rowIndex, '');
                    this.staffMemGrid.setColumnData('lastName', rowIndex, '');
                    this.staffMemGrid.setColumnData('firstName', rowIndex, '');
                    this.staffMemGrid.setColumnData('middleName', rowIndex, '');
                    if (count === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumsmuga.duplictes');
                        this.show();
                        this.staffroleExecuteQuery();
                    }
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            this.staffRoleIdData.forEach(element => {
                if (element.code === event.data.userId) {
                    this.staffroleData[rowIndex].lastName = element.lastName;
                    this.staffroleData[rowIndex].firstName = element.firstName;
                    this.staffroleData[rowIndex].middleName = element.middleName;
                    this.staffroleData[rowIndex].staffId = element.staffId;
                    this.staffMemGrid.setColumnData('lastName', rowIndex, element.lastName);
                    this.staffMemGrid.setColumnData('firstName', rowIndex, element.firstName);
                    this.staffMemGrid.setColumnData('middleName', rowIndex, element.middleName);
                    this.staffMemGrid.setColumnData('staffId', rowIndex, element.staffId);
                }
            });
        } else if (!event.data.userId || event.data.userId === undefined) {
            this.staffMemGrid.setColumnData('lastName', rowIndex, '');
            this.staffMemGrid.setColumnData('firstName', rowIndex, '');
            this.staffMemGrid.setColumnData('middleName', rowIndex, '');
        }
        rowdata.validated = true;
        return rowdata;
    }

    onRowClickUserGroup(event) {
        this.omsroleModel = event;
        this.staffroleExecuteQuery();
    }

    onRowClickstaffrole(event) {
        if (event.createDatetime || event.createDatetime !== undefined) {
            this.staffRoleEnableDelete = true;
        } else {
            this.staffRoleEnableDelete = false;
        }
    }

    oumsmugaexecuteQuery() {
        const serviceObj = this.oumsmugaFactory.omsRoleExecuteQuery(this.omsroleModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                this.omsroleData = data;
                this.omsroleModel = data[0];
                this.staffroleExecuteQuery();
            }
        });
    }

    staffroleExecuteQuery() {
        this.staffroleModel.roleId = this.omsroleModel.roleId;
        const staffroleResult = this.oumsmugaFactory.staffRoleExecuteQuery(this.staffroleModel);
        staffroleResult.subscribe(data => {
            if (data.length === 0) {
                this.staffroleData = [];
                this.tableIndex = -1;
            } else {
                this.tableIndex = 0;
                this.staffroleData = data;
                this.staffroleExecuteQueryDUp();
                this.staffroleModel = data[0];
            }
        });
    }
    staffroleExecuteQueryDUp() {
        this.staffroleModel.roleId = this.omsroleModel.roleId;
        const staffroleResult = this.oumsmugaFactory.staffRoleExecuteQuery(this.staffroleModel);
        staffroleResult.subscribe(data => {
            if (data.length === 0) {
                this.staffroleDupData = [];
            } else {
                this.staffroleDupData = data;
            }
        });
    }
    savealertForm(event) {
        if (!this.saveValidate()) {
            return;
        }
        this.staffroleInsertList = event.added;
        this.staffroleUpdateList = event.updated;
        this.staffroleDeleteList = event.removed;
        this.staffroleCommitModel.insertList = [];
        this.staffroleCommitModel.updateList = [];
        this.staffroleCommitModel.deleteList = [];

        if (this.staffroleInsertList.length > 0) {
            for (let i = 0; i < this.staffroleInsertList.length; i++) {
                this.staffroleInsertList[i].roleId = this.omsroleModel.roleId;
                this.staffroleInsertList[i].roleCode = this.omsroleModel.roleCode;
            }
            this.staffroleCommitModel.insertList = this.staffroleInsertList;
        }

        if (this.staffroleUpdateList.length > 0) {
            for (let i = 0; i < this.staffroleUpdateList.length; i++) {
            }
            this.staffroleCommitModel.updateList = this.staffroleUpdateList;
        }

        if (this.staffroleDeleteList.length > 0) {
            for (let i = 0; i < this.staffroleDeleteList.length; i++) {
            }
            this.staffroleCommitModel.deleteList = this.staffroleDeleteList;
        }
        const staffroleSaveData = this.oumsmugaFactory.staffRoleCommit(this.staffroleCommitModel);
        staffroleSaveData.subscribe(data => {
            if (data.liReturn === 1) {
                this.oumsmugaexecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

    saveValidate() {
        try {
            for (let i = 0; i < this.staffroleData.length; i++) {
                if (!this.staffroleData[i].userId || this.staffroleData[i].userId === undefined) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.nochangestosave');
                    this.show();
                    throw new Error();
                }
                for (let j = i + 1; j < this.staffroleData.length; j++) {
                    if (i != j && this.staffroleData[i].userId === this.staffroleData[j].userId) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumsmuga.duplictes');
                        this.show();
                        throw new Error();
                    }
                }
            }
        } catch (e) {
            return false;
        }
        return true;
    }

    onGridInsert = () => {
        if (this.staffMemValidate(this.staffroleData)) {
            return {};
        }
    }

    staffMemValidate(staffData: any) {
        try {
            staffData.forEach((element) => {
                if (!element.staffId || element.staffId === undefined) {
                    throw new Error();
                }
            });
        } catch (e) {
            return false;
        }
        return true;
    }

    onGridClear = () => {
        this.staffroleExecuteQuery();
        return true;
    }

}
