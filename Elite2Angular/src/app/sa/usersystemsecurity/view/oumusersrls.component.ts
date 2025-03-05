import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumusersService } from '../service/oumusers.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { StaffMemberRoles } from '@sausersystemsecuritybeans/StaffMemberRoles';
@Component({
    selector: 'app-oumusersrls',
    templateUrl: './oumusersrls.component.html'
})

export class OumusersrlsComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    rolesColumnDef: any[];
    rolesData: StaffMemberRoles[] = [];
    rolesDataPush: StaffMemberRoles[] = [];
    staffMemberRolesModel: StaffMemberRoles = new StaffMemberRoles();
    constructor(private oumusersFactory: OumusersService, public translateService: TranslateService) {
        this.rolesColumnDef = [];
    }
    ngOnInit() {
        this.rolesColumnDef = [
            {
                fieldName: this.translateService.translate('oumusers.rolecode'), field: 'roleCode', datatype: 'text',
                editable: false, width: 200
            },
            {
                fieldName: this.translateService.translate('common.description'), field: 'roleName', datatype: 'text',
                editable: false, width: 250
            },
            {
                fieldName: this.translateService.translate('oumusers.rlsroleid'), field: 'roleId',
                editable: true, width: 150
            },
        ];

        const rgStaffMemberRolesRoleServiceObj = this.oumusersFactory.rgStaffMemberRolesRoleRecordGroup();
        rgStaffMemberRolesRoleServiceObj.subscribe(rgStaffMemberRoleList => {
            rgStaffMemberRoleList.forEach(element => {
                if (element.roleName) {
                    element.description = element.roleName;
                }
            });
            this.rolesData = rgStaffMemberRoleList;


        });

    }

    onRowClickLov(event) {
        this.staffMemberRolesModel = new StaffMemberRoles();
        this.staffMemberRolesModel.roleCode = event.roleCode;
        this.staffMemberRolesModel.description = event.roleName;
        this.staffMemberRolesModel.roleId = event.roleId;
    }

    processResult() {
        this.rolesDataPush = [];
        if (this.staffMemberRolesModel.roleCode) {
            this.rolesData.forEach(ele => {
                if (ele.roleId === this.staffMemberRolesModel.roleId) {
                    this.rolesDataPush.push(ele);
                }
            });
            this.dialog.close({ rolesData: this.rolesDataPush });
        } else {
            this.dialog.close(null);
            
        }
    }
    clearData() {
        this.dialog.close(null);
    }

}
