import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OumassmuService } from '@sa/usersystemsecurity/service/oumassmu.service';
import { ModulePrivileges } from '@sausersystemsecuritybeans/ModulePrivileges';
import { OmsModules } from '@sausersystemsecuritybeans/OmsModules';
// import required bean declarations

@Component( {
    selector: 'app-omsmodule',
    templateUrl: './omsmodule.component.html'

} )
export class OmsmoduleComponent implements OnInit {
    @ViewChild( 'dialog', {static: true} ) dialog: DialogComponent;
    omsModulesColumnDefs: any[];
    omsModuleData: OmsModules[]= [];
    modprivModel: ModulePrivileges = new ModulePrivileges();

    constructor( private oumassmuFactory: OumassmuService, public translateService: TranslateService ) {
        this.omsModulesColumnDefs = [];
    }

    ngOnInit() {
        this.omsModulesColumnDefs = [
            { fieldName: this.translateService.translate( 'oumassmu.modelushortname' ), field: 'moduleName', editable: false, width: 200 },
            { fieldName: this.translateService.translate( 'oumassmu.moduledescription' ),
             field: 'description', editable: false, width: 280 },
            { fieldName: this.translateService.translate( 'oumassmu.moduletype' ), field: 'moduleType', editable: false, width: 180 },
        ];

        const cgfkModprivaccessprivilegeServiceObj = this.oumassmuFactory.cgfkModprivmodulenameRecordGroup();
        cgfkModprivaccessprivilegeServiceObj.subscribe( cgfkModprivaccessprivilegelist => {
            this.omsModuleData = cgfkModprivaccessprivilegelist;
        } );
    }

    onRowClickEvent( event ) {
        this.modprivModel = new ModulePrivileges();
        this.modprivModel.moduleName = event.moduleName;
        this.modprivModel.moduleDescription = event.description;
        this.modprivModel.moduleType = event.moduleType;
    }
    /*
     * This function executed twhen we click on Ok button
     */
    processResult() {
        if ( this.modprivModel.moduleName ) {
            this.dialog.close( {
                moduleName: this.modprivModel.moduleName,
                moduleDescription: this.modprivModel.moduleDescription,
                moduleType: this.modprivModel.moduleType,
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
