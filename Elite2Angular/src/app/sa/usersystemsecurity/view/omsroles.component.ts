import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OumassmuService } from '@sa/usersystemsecurity/service/oumassmu.service';
import { OmsRoles } from '@sausersystemsecuritybeans/OmsRoles';
// import required bean declarations

@Component( {
    selector: 'app-omsroles',
    templateUrl: './omsroles.component.html'

} )
export class OmsrolesComponent implements OnInit {
    @ViewChild( 'dialog', {static: true} ) dialog: DialogComponent;
    omsRolesColumnDefs: any[];
    omsRolesData: OmsRoles[]= [];
    omsRolesModel: OmsRoles = new OmsRoles();

    constructor( private oumassmuFactory: OumassmuService, public translateService: TranslateService ) {
        this.omsRolesColumnDefs = [];
    }

    ngOnInit() {
        this.omsRolesColumnDefs = [
            { fieldName: this.translateService.translate('common.code'), field: 'roleCode', editable: false, width: 220 },
            { fieldName: this.translateService.translate('common.description'), field: 'roleName', editable: false, width: 200 },
            { fieldName: 'Role ID', field: this.translateService.translate('oumassmu.roleid'), editable: false, width: 150 },
        ];

        const rgstaffmemberrolesroleServiceObj = this.oumassmuFactory.rgStaffMemberRolesRoleRecordGroup();
        rgstaffmemberrolesroleServiceObj.subscribe(rgstaffmemberrolesroleList => {
            this.omsRolesData = rgstaffmemberrolesroleList;
        });
    }

    onRowClickEvent( event ) {
        this.omsRolesModel = new OmsRoles();
        this.omsRolesModel.roleCode = event.roleCode;
        this.omsRolesModel.roleName = event.roleName;
        this.omsRolesModel.roleId = event.roleId;
    }
    /*
     * This function executed twhen we click on Ok button
     */
    processResult() {
        if ( this.omsRolesModel.roleId ) {
            this.dialog.close( {
                roleCode: this.omsRolesModel.roleCode,
                roleName: this.omsRolesModel.roleName,
                roleId: this.omsRolesModel.roleId,
            } );
        } else {
            this.dialog.close( null );
        }

    }
    /*
     * This function executed twhen we click on Cancel button
     */
    clearData() {
        this.dialog.close( null );
    }
}
