import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumassmuService } from '@sa/usersystemsecurity/service/oumassmu.service';
import { OmsRoles } from '@sausersystemsecuritybeans/OmsRoles';
import { ModulePrivileges } from '@sausersystemsecuritybeans/ModulePrivileges';
import { ModulePrivilegesCommitBean } from '@sausersystemsecuritybeans/ModulePrivilegesCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OmsModules } from '@sausersystemsecuritybeans/OmsModules';
import { OumrolesService } from '@sa/usersystemsecurity/service/oumroles.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component( {
    selector: 'app-oumassmu',
    templateUrl: './oumassmu.component.html',
    styleUrls: []
} )

export class OumassmuComponent implements OnInit {
    // Variable declaration
    @ViewChild('priviGrid', {static: true}) priviGrid: any;
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    omsroleData: OmsRoles[] = [];
    omsroleDataTemp: OmsRoles[] = [];
    omsroleModel: OmsRoles = new OmsRoles();
    omsroleIndex = 0;
    omsroleInsertList: OmsRoles[] = [];
    omsroleUpdatetList: OmsRoles[] = [];
    omsroleDeleteList: OmsRoles[] = [];
    modprivData: ModulePrivileges[] = [];
    modprivDataTemp: ModulePrivileges[] = [];
    omsModuleData: OmsModules[] = [];
    modprivModel: ModulePrivileges = new ModulePrivileges();
    modprivIndex = 0;
    modprivInsertList: ModulePrivileges[] = [];
    modprivUpdatetList: ModulePrivileges[] = [];
    modprivDeleteList: ModulePrivileges[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    modPrivColumnDef: any[];
    omsRoleReadOnly = false;
    modPrivReadOnly = false;
    rgstaffmemberrolesroleRg: any[] = [];
    cgfkModprivaccessprivilegeRg: any[] = [];
    cgfkModprivmodulenameRg: any[] = [];
    msgs = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    index = 0;
    modprivCommitModel: ModulePrivilegesCommitBean = new ModulePrivilegesCommitBean();
    modulePrilegeValues: any[] = [];
    checkFlag: boolean;
    modPrivGridIndex = 0;
    disabledFlag = true;
    disabledNext = true;
    disabledPrevious = true;
    omsRoleGridIndex: number;
    omsRoleColumnDef: any[];
    omsroleDataGrid: OmsRoles[] = [];
    constructor( private oumassmuFactory: OumassmuService, private oumrolesFactory: OumrolesService,
        public translateService: TranslateService, public dialogService: DialogService ) {
        this.modPrivColumnDef = [];
        this.omsRoleColumnDef = [];
    }
    ngOnInit() {
        this.omsroleModel = new OmsRoles();
        this.omsroleExecuteQuery();
        this.modPrivColumnDef = [
            { fieldName: this.translateService.translate( 'oumassmu.modelushortname' ) + '*', field: 'moduleName',
             editable: false, width: 220, cellEditable: this.canModuleShortNameEdit },
            {
                fieldName: '', field: 'button', datatype: 'launchbutton', link: '/omsmodule', data: 'row',
                updateField: 'row', modal: true, editable: false, width: 150, cellEditable: this.canModuleShortNameEdit,
                dialogWidth: '50', height: '80%', onLaunchClick: this.onLaunchClick
            },
            { fieldName: this.translateService.translate( 'oumassmu.moduledescription' ), field: 'moduleDescription',
             editable: false, width: 200 },
            { fieldName: this.translateService.translate( 'oumassmu.moduletype' ), field: 'moduleType', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate( 'oumassmu.accessprivileges' ), field: 'accessPrivilege',
                 editable: true, width: 200, datatype: 'lov',
                domain: 'ACCESS_PRIVI', codeTitle: 'Access Privileges', optionWidth: 350
            },
            { fieldName: this.translateService.translate( 'oumassmu.verifivationallowed' ), field: 'verificationFlag',
             editable: true, width: 200, datatype: 'checkbox' },


        ];

        this.omsRoleColumnDef = [
            { fieldName: this.translateService.translate('oumassmu.roleid'), field: 'roleId', editable: true,
            width: 330 },
            { fieldName: this.translateService.translate('common.code'), field: 'roleCode', editable: true, width: 330 },
            { fieldName: this.translateService.translate('oumassmu.rolename'), field: 'roleName', editable: true, width: 330 },
        ];
        const rgstaffmemberrolesroleServiceObj = this.oumassmuFactory.rgStaffMemberRolesRoleRecordGroup();
        rgstaffmemberrolesroleServiceObj.subscribe( rgstaffmemberrolesroleList => {
            if ( rgstaffmemberrolesroleList.length === 0 ) {
                this.rgstaffmemberrolesroleRg = [];
            } else {
                for ( let i = 0; i < rgstaffmemberrolesroleList.length; i++ ) {
                    this.rgstaffmemberrolesroleRg.push( {
                        'text': rgstaffmemberrolesroleList[i].code + ' - ' +
                        rgstaffmemberrolesroleList[i].description, 'id': rgstaffmemberrolesroleList[i].code
                    } );
                }
            }
        } );
        const cgfkModprivaccessprivilegeServiceObj = this.oumassmuFactory.cgfkModprivmodulenameRecordGroup();
        cgfkModprivaccessprivilegeServiceObj.subscribe( cgfkModprivaccessprivilegelist => {
            this.modprivDataTemp = cgfkModprivaccessprivilegelist;
            this.omsModuleData = cgfkModprivaccessprivilegelist;
        } );
        const cgfkModprivmodulenameServiceObj = this.oumassmuFactory.
            cgfkModprivmodulenameRecordGroup();
        cgfkModprivmodulenameServiceObj.subscribe( cgfkModprivmodulenamelist => {
            if ( cgfkModprivmodulenamelist.length === 0 ) {
                this.cgfkModprivmodulenameRg = [];
            } else {
                for ( let i = 0; i < cgfkModprivmodulenamelist.length; i++ ) {
                    this.cgfkModprivmodulenameRg.push( {
                        'text': cgfkModprivmodulenamelist[i].code + ' - ' +
                        cgfkModprivmodulenamelist[i].description, 'id': cgfkModprivmodulenamelist[i].code
                    } );
                }
            }
        } );
    }
    /*
     * This function executed to disable Module short name column in  Module Privileges column
     */
    canModuleShortNameEdit = ( data: any, index: number, field: string ): boolean => {
        if ( this.modprivIndex <= index ) {
            return true;
        }
        return false;
    }
    onLaunchClick = (data) => {
        const rowIndex = this.modprivData.indexOf( data );
        this.dialogService.openLinkDialog( '/omsmodule', data, 50).subscribe( result => {

            this.priviGrid.setColumnData('moduleName', rowIndex, result.moduleName);
            this.priviGrid.setColumnData('moduleDescription', rowIndex, result.moduleDescription);
            this.priviGrid.setColumnData('moduleType', rowIndex, result.moduleType);
        } );
    }
    onRoleId2click() {
    }
    allowNumbers( event ) {
    }
    onRowClickmodpriv( event ) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange( offender ) {
    }

    omsroleExecuteQuery() {
        this.omsroleModel.createDateTime = DateFormat.getDate();
        this.omsroleModel.modifyDateTime = DateFormat.getDate();
        const omsroleResult = this.oumassmuFactory.omsRoleExecuteQry( this.omsroleModel );
        omsroleResult.subscribe( omsroleResultList => {
            if ( omsroleResultList.length === 0 ) {
                this.omsroleDataGrid = [];
            } else {
                this.omsroleDataGrid = omsroleResultList;
                this.omsRoleGridIndex = 0;
            }
        } );
    }

    onRowClickomsrole(event) {
        if (event) {
            this.omsroleModel = event;
            this.oumassmuexecuteQuery();
        }
    }

    /**
     * To display the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];

    }
    clearEvent() {
        this.omsroleModel = new OmsRoles();
        this.modprivData = [];
        this.disabledFlag = true;
        this.disabledPrevious = true;
        this.disabledNext = true;
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    oumassmuPopulateDetails() {
        const serviceObj = this.oumassmuFactory.modPrivExecuteQuery( this.omsroleModel);
        serviceObj.subscribe( data => {
            for ( let i = 0; i < data.length; i++ ) {
                data[i].verificationFlag = data[i].verificationFlag === 'Y' ? true : false;
                this.modulePrilegeValues.push( { 'roleId': data[i].roleId, 'moduleName': data[i].moduleName } );
            }
            this.modprivData = data;
            this.modprivIndex = this.modprivData.length;
        } );
    }

    /**
    * This function executed to retrive role data
    */
    oumassmuexecuteQuery() {
        const serviceObj = this.oumassmuFactory.omsRoleExecuteQuery(this.omsroleModel);
        serviceObj.subscribe( data => {
            this.oumassmuFactory.roleIdTempValue = undefined;
            this.omsroleData = data;
            this.disabledFlag = false;
            this.disabledNext = false;
            this.disabledPrevious = true;
            if (data.length > 0) {
                this.omsroleModel = this.omsroleData[0];
            }
            this.oumassmuPopulateDetails();
        } );
    }
    /*
    * This function executed to add a new record into the grid
    */
    onGridInsert = () => {
        /* for ( let i = 0; i < this.modprivData.length; i++ ) {
            if ( !this.modprivData[i].moduleName ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oumassmu.modulenamemustbeentered');
                this.show();
                return;
            }
            if ( !this.modprivData[i].accessPrivilege ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oumassmu.accessprivilegesmustbeentered');
                this.show();
                return;
            }
        } */
        if ( !this.omsroleModel.roleCode ) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumassmu.insertofmoduleprivileges');
            this.show();
            return;
        }
        return {
            button: '..', verificationFlag: 'true'
        };
    }
    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    oumassmudateFormat( dateValue ) {
        if ( dateValue !== undefined && dateValue.length > 0 ) {
            const newdate = dateValue.split( '/' );
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }
    modprivExecuteQuery() {
        const modprivResult = this.oumassmuFactory.
            modPrivExecuteQuery( this.modprivModel );
        modprivResult.subscribe( modprivResultList => {
            if ( modprivResultList.length === 0 ) {
                this.modprivData = [];
            } else {
                this.modprivData = modprivResultList;
                this.modprivModel = modprivResultList[0];
            }
        } );
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oumassmuSavemodprivForm( event ) {
        // TODO declare commit bean and add insert list to that object.
        this.modprivInsertList = event.added;
        this.modprivUpdatetList = event.updated;
        this.modprivDeleteList = event.removed;
        this.modprivCommitModel.insertList = [];
        this.modprivCommitModel.updateList = [];
        this.modprivCommitModel.deleteList = [];
        if ( this.modprivInsertList.length > 0 ) {
            for ( let i = 0; i < this.modprivInsertList.length; i++ ) {
                this.modprivInsertList[i].roleId = this.omsroleModel.roleId;
                if ( this.modprivInsertList[i].verificationFlag ) {
                    this.modprivInsertList[i].verificationFlag = 'Y';
                } else {
                    this.modprivInsertList[i].verificationFlag = 'N';
                }
                if ( !this.modprivInsertList[i].moduleName ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'oumassmu.modulenamemustbeentered');
                    this.show();
                    return;
                }

                if ( !this.modprivInsertList[i].accessPrivilege ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'oumassmu.accessprivilegesmustbeentered');
                    this.show();
                    return;
                }
                const index=this.modprivData.indexOf(this.modprivInsertList[i]);
                for(let j=0;j<this.modprivData.length;j++){
                    if(index != j && this.modprivData[j].moduleName === this.modprivInsertList[i].moduleName && this.modprivData[j].roleId === this.modprivInsertList[i].roleId){
                       this.type = 'warn';
                        this.message = this.translateService.translate('oumassmu.alreadyexists');
                        this.show();
                        return;
                    }
                }
            }

        }
        for ( let i = 0; i < this.modprivUpdatetList.length; i++ ) {
            if ( this.modprivUpdatetList[i].verificationFlag ) {
                this.modprivUpdatetList[i].verificationFlag = 'Y';
            } else {
                this.modprivUpdatetList[i].verificationFlag = 'N';
            }

            if ( !this.modprivUpdatetList[i].moduleName ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oumassmu.modulenamemustbeentered');
                this.show();
                return;
            }

            if ( !this.modprivUpdatetList[i].accessPrivilege ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oumassmu.accessprivilegesmustbeentered');
                this.show();
                return;
            }
        }
        this.modprivCommitModel.insertList = this.modprivInsertList;
        this.modprivCommitModel.updateList = this.modprivUpdatetList;
        if ( this.modprivDeleteList.length > 0 ) {

            this.modprivCommitModel.deleteList = this.modprivDeleteList;
        }
        const modprivSaveData = this.oumassmuFactory.modPrivCommit( this.modprivCommitModel );
        modprivSaveData.subscribe( data => {
            if ( data === 1 ) {
                this.oumassmuPopulateDetails();
                this.modprivData = data;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else if(data === 2) {
                this.oumassmuPopulateDetails();
                this.type = 'warn';
                this.message = this.translateService.translate('oumassmu.enteredmodulenamedoesnotexistinomsmodules');
                this.show();
            } else {
                this.oumassmuPopulateDetails();
                this.modprivData = data;
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        } );
    }
    roleId2WhenButtonPressedTrigger() {
        /* CGLY$WHEN_BUTTON_PRESSED */
        /* Replicate default menu functionality */
        // TODO go_item('oms_role.role_code');
        // TODO do_key('list_values');
    }

    omsRolePreQueryTrigger() {
        /* CGPR$CPY_CTX_GLOBALS */
        /* Copy into primary key item(s) value of last current row, if auto- */
        /*   querying                                                        */
        //                            if ((globalModel.cg$doAutoQuery==='y') ){
        //                              //TODO oms_role.role_id = global.cg$oms_role_role_id;
        //                            }
    }

    omsRoleOnErrorTrigger() {
        /* CGTE$BLK_LEVEL_ERROR_TRAP */
        /* Trap errors returning from the server and report in a user */
        /*   friendly manner                                          */
        //          const errCode = errorCode;
        //          const errType = errorType;
        //                              const serverErr = abs(dbmsErrorCode);
        //                             const serverMsg = dbmsErrorText;
        //                              const constraintName;
        //                             if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510) ) ){
        // TODO
        /* Remove recursive errors from the top of the stack */
        //                            while (server_err = 604) {
        //                              // TODO cgte$pop_error_stack(server_err, server_msg);
        //         }
        // TODO
        /* Check and report the generic constraint violations */
        //         if (( cgte$checkConstraintVio(serverErr, serverMsg) ) ){
        //            throw new Error('form_trigger_failure');
        //         }
        // TODO
        /* Check and report the constraint violations specific to this
                 block */
        // TODO constraint_name = cgte$strip_constraint(server_msg);
        // TODO
        //          }
        // TODO
        /* If error not found, issue default message */
        // TODO message(err_type||'-'||to_char(err_code)||' '||error_text);
        //            throw new Error('form_trigger_failure');
        // TODO
    }

    moduleNameWhenValidateItemTrigger() {
        /* CGUV$CHK_KEYS_ON_VAL_FLD */
        /* Check item value against unique or primary key */
        // TODO this.cguvChkModulePrivsPk(mod_priv.role_id        /* in  item value
        //                      */,mod_priv.module_name    /* in  item value
        //                      */,true                 );  /* in  is the trigger item level?      */
        // TODO message('error row exists already with same module short name,role
        // TODO id');
        //  throw new Error('form_trigger_failure');
    }

    verificationFlagWhenValidateItemTrigger() {
        /* CGCC$CHK_CONS_ON_VF */
        /* Validate item against appropriate check constraints */
        //         if ((fValidateYnFlag(modPrivModel.verificationFlag)) ){
        //         } else {
        //           //TODO message('error invalid entry.  y/n only.');
        //            throw new Error('form_trigger_failure');
        //         }
    }

    modPrivOnErrorTrigger() {
        /* CGTE$BLK_LEVEL_ERROR_TRAP */
        /* Trap errors returning from the server and report in a user */
        /*   friendly manner                                          */
        //          const errCode = errorCode;
        //          const errType = errorType;
        //          const serverErr = abs(dbmsErrorCode);
        //          const serverMsg = dbmsErrorText;
        //          const constraintName;
        //          if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510) ) ){
        // TODO
        /* Remove recursive errors from the top of the stack */
        //         while (server_err = 604) {
        //           //TODO cgte$pop_error_stack(server_err, server_msg);
        //         }
        // TODO
        /* Check and report the generic constraint violations */
        //         if (( cgte$checkConstraintVio(serverErr, serverMsg) ) ){
        //            throw new Error('form_trigger_failure');
        //         }
        // TODO
        /* Check and report the constraint violations specific to this
                 block */
        // TODO constraint_name = cgte$strip_constraint(server_msg);
        // TODO
        /* FK - Parent key not found */
        //         if ((serverErr===2291) ){
        //          if ((constraintName==='modPrivOmsModF1') ){
        //           //TODO message('error this module short name does not exist');
        //         } else {
        //           //TODO message(server_msg);
        //         }
        //            throw new Error('form_trigger_failure');
        //         }
        // TODO
        /* FK - Child record found */
        //         if ((serverErr===2292) ){
        //         if ((errCode===40510) ){
        //           //TODO message(server_msg);
        //          } else if ( (errCode===40509) ){
        //            //TODO message(server_msg);
        //            throw new Error('form_trigger_failure');
        //         }
        //         }
        //           //TODO
        //         if ((errType==='frm' &&  errCode in (41105, 41106) ) ){
        //         if ((errCode===41105) ){
        //           //TODO message('error query of module privileges must be in context of
        //           //TODO oms roles');
        //            throw new Error('form_trigger_failure');
        //         } else if ( (errCode===41106) ){
        //           //TODO message('error insert of module privileges must be in context of
        //           //TODO oms roles');
        //            throw new Error('form_trigger_failure');
        //                            }
        // TODO
        /* If error not found, issue default message */
        // TODO message(err_type||'-'||to_char(err_code)||' '||error_text);
        //            throw new Error('form_trigger_failure');
        // TODO
    }

    modPrivPostQueryTrigger() {
        /* CGFK$QRY_LOOKUP_DATA */
        /* Query lookup data for the foreign key(s) */
        // TODO this.cgfkChkModPrivModPrivAcc(true);  /* in  is the trigger item level?                       */
        // TODO this.cgfkChkModPrivModPrivOms(true);  /* in  is the trigger item level?                       */
    }

    butOffendersWhenButtonPressedTrigger() {
        // TODO
    }

    butOffendersKeyNextItemTrigger() {
        // TODO
    }

    butOffendersKeyPrevItemTrigger() {
        // TODO
    }

    butWorksWhenButtonPressedTrigger() {
        // TODO
    }

    butWorksKeyNextItemTrigger() {
        // TODO
    }

    butWorksKeyPrevItemTrigger() {
        // TODO
    }

    butCalendarWhenButtonPressedTrigger() {
        // TODO
    }

    butCalendarKeyNextItemTrigger() {
        // TODO
    }

    butCalendarKeyPrevItemTrigger() {
        // TODO
    }

    butOffUpdatesWhenButtonPressedTrigger() {
        // TODO
    }

    butOffUpdatesKeyNextItemTrigger() {
        // TODO
    }

    butOffUpdatesKeyPrevItemTrigger() {
        // TODO
    }

    butDetailWhenButtonPressedTrigger() {
        // TODO
    }

    butDetailKeyNextItemTrigger() {
        // TODO
    }

    butDetailKeyPrevItemTrigger() {
        // TODO
    }

    mymenuOnErrorTrigger() {
        // TODO
    }

    oumassmuOnMessageTrigger() {
        //         if (modlibVariousHModel.onMessage1 ){
        //           //TODO applib_various_h.on_message;             // application hook
        //         }
        //         if (! modlibVariousHModel.onMessage2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
    }

    oumassmuKeyMenuTrigger() {
        /* CGBS$TOGGLE_QUERY_MODE */
        /* This changes the mode of block synchronization so that if it is */
        /* currently ON, then it is changed to OFF, and vice-versa.        */
        /* It also queries the dependent blocks as appropriate for the     */
        /* new mode.                                                       */
        // TODO cgbs$toggle( global.cg$query_mode );
    }

    oumassmuIKillCreateTrigger() {
    }

    oumassmuKeyClrblkTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibKillCreateHModel.keyClrblk1 ){
        //           //TODO applib_kill_create_h.key_clrblk;             // application hook
        //         }
        //         if (! modlibKillCreateHModel.keyClrblk2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGBS$KEY_CLRBLK_FRM */
        /* Perform checks prior to clearing block */
        //         if (( cgbs2$Model.isRecordDirty(systemModel.triggerBlock) ) ){
        //            throw new Error('form_trigger_failure');
        //         }
        //         if ((systemModel.blockStatus==='changed' ||  cgbs2$Model.isCommitNeeded( systemModel.triggerBlock ) ) ){
        //          //TODO  this.cgbs2$.doCommitDialogue();
        //         }
        // TODO clear_block( no_validate );
    }

    oumassmuKeyClrfrmTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibKillCreateHModel.keyClrfrm1 ){
        //           //TODO applib_kill_create_h.key_clrfrm;             // application hook
        //         }
        //         if (! modlibKillCreateHModel.keyClrfrm2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGGN$KEY_CLRFRM */
        /* Perform the key's standard functionality */
        // TODO  this.clearForm();
        //                            if (systemModel.formStatus==='changed' ){
        //            throw new Error('form_trigger_failure');
        //         }
        // TODO
        /* CGCF$PERFORM_STARTUP */
        /* Execute the WHEN-NEW-FORM-INSTANCE code that was created by Forms */
        /*   Generator                                                       */
        // TODO  this.cg$whenNewFormInstance();
    }

    oumassmuKeyClrrecTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibKillCreateHModel.keyClrrec1 ){
        //           //TODO applib_kill_create_h.key_clrrec;             // application hook
        //         }
        //         if (! modlibKillCreateHModel.keyClrrec2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // - - ---------------------------------------------
    }

    oumassmuKeyCrerecTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        //  TODO
        //         if (modlibKillCreateHModel.keyCrerec1 ){
        //           //TODO applib_kill_create_h.key_crerec;             // application hook
        //         }
        //         if (! modlibKillCreateHModel.keyCrerec2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyDuprecTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibKillCreateHModel.keyDuprec1 ){
        //           //TODO applib_kill_create_h.key_duprec;             // application hook
        //         }
        //         if (! modlibKillCreateHModel.keyDuprec2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyDupItemTrigger() {
        // -- ---------------------------------------------
        // - -         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibKillCreateHModel.keyDupItem1 ){
        //           //TODO applib_kill_create_h.key_dup_item;             // application hook
        //         }
        //         if (! modlibKillCreateHModel.keyDupItem2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenClearBlockTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibKillCreateHModel.whenClearBlock1 ){
        //           //TODO applib_kill_create_h.when_clear_block;             // application hook
        //         }
        //         if (! modlibKillCreateHModel.whenClearBlock2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenCreateRecordTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibKillCreateHModel.whenCreateRecord1 ){
        //           //TODO applib_kill_create_h.when_create_record;             // application hook
        //         }
        //         if (! modlibKillCreateHModel.whenCreateRecord2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenRemoveRecordTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibKillCreateHModel.whenRemoveRecord1 ){
        //           //TODO applib_kill_create_h.when_remove_record;             // application hook
        //         }
        //         if (! modlibKillCreateHModel.whenRemoveRecord2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuI___itemTrigger() {
    }

    oumassmuKeyEditTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //                            if (modlibItemHModel.keyEdit1 ){
        //           //TODO applib_item_h.key_edit;             // application hook
        //         }
        //         if (! modlibItemHModel.keyEdit2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyListvalTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibItemHModel.keyListval1 ){
        //           //TODO applib_item_h.key_listval;             // application hook
        //         }
        //         if (! modlibItemHModel.keyListval2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPostChangeTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibItemHModel.postChange1 ){
        //           //TODO applib_item_h.post_change;             // application hook
        //         }
        //         if (! modlibItemHModel.postChange2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenButtonPressedTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // --TOOLBAR_ACTIONS;
        //         if (modlibItemHModel.whenButtonPressed1 ){
        //           //TODO applib_item_h.when_button_pressed;             // application hook
        //         }
        //         if (! modlibItemHModel.whenButtonPressed2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenCheckboxChangedTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibItemHModel.whenCheckboxChanged1 ){
        //           //TODO applib_item_h.when_checkbox_changed;             // application hook
        //         }
        //         if (! modlibItemHModel.whenCheckboxChanged2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenCustomItemEventTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibItemHModel.wCustomItemEvent1 ){
        //           //TODO applib_item_h.w_custom_item_event;             // application hook
        //         }
        //         if (! modlibItemHModel.wCustomItemEvent2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenImageActivatedTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibItemHModel.whenImageActivated1 ){
        //           //TODO applib_item_h.when_image_activated;             // application hook
        //         }
        //         if (! modlibItemHModel.whenImageActivated2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenImagePressedTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibItemHModel.whenImagePressed1 ){
        //           //TODO applib_item_h.when_image_pressed;             // application hook
        //         }
        //         if (! modlibItemHModel.whenImagePressed2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenListActivatedTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibItemHModel.whenListActivated1 ){
        //           //TODO applib_item_h.when_list_activated;             // application hook
        //         }
        //         if (! modlibItemHModel.whenListActivated2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenListChangedTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibItemHModel.whenListChanged1 ){
        //           //TODO applib_item_h.when_list_changed;             // application hook
        //         }
        //         if (! modlibItemHModel.whenListChanged2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenRadioChangedTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibItemHModel.whenRadioChanged1 ){
        //           //TODO applib_item_h.when_radio_changed;             // application hook
        //         }
        //         if (! modlibItemHModel.whenRadioChanged2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuI__mouseTrigger() {
    }

    oumassmuWhenMouseClickTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        //           //TODO
        //         if (modlibMouseHModel.whenMouseClick1 ){
        //           //TODO applib_mouse_h.when_mouse_click;             // application hook
        //         }
        //         if (! modlibMouseHModel.whenMouseClick2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenMouseDoubleclickTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibMouseHModel.whenMouseDoubClick1 ){
        //           //TODO applib_mouse_h.when_mouse_doub_click;             // application hook
        //         }
        //         if (! modlibMouseHModel.whenMouseDoubClick2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenMouseEnterTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibMouseHModel.whenMouseEnter1 ){
        //           //TODO applib_mouse_h.when_mouse_enter;             // application hook
        //         }
        //         if (! modlibMouseHModel.whenMouseEnter2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenMouseLeaveTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibMouseHModel.whenMouseLeave1 ){
        //           //TODO applib_mouse_h.when_mouse_leave;             // application hook
        //         }
        //         if (! modlibMouseHModel.whenMouseLeave2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuI_navigateTrigger() {
    }

    oumassmuKeyDownTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyDown1 ){
        //           //TODO applib_navigate_h.key_down;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyDown2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyExitTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyExit1 ){
        //           //TODO applib_navigate_h.key_exit;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyExit2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        // -- new code from triggeradd --
        // --
        // -- @@@ Vipul on 28-SEP-2001 : Tracking# 8862 : Added call to procedure
        // --     in application library to handle coordination of menu and forms
        // --
        // TODO  this.undoPostFormInit();
        // TODO
        // -- end new code --
    }

    oumassmuKeyNxtblkTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyNxtblk1 ){
        //           //TODO applib_navigate_h.key_nxtblk;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyNxtblk2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyNxtkeyTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyNxtkey1 ){
        //           //TODO applib_navigate_h.key_nxtkey;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyNxtkey2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGBS$DISABLE_NXTKEY */
        /* Disable KEY-NXTKEY for the whole form */
        // TODO message('error key not valid in this context');
        throw new Error( 'form_trigger_failure' );
    }

    oumassmuKeyNxtrecTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyNxtrec1 ){
        //           //TODO applib_navigate_h.key_nxtrec;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyNxtrec2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyNxtsetTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyNxtset1 ){
        //           //TODO applib_navigate_h.key_nxtset;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyNxtset2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyNextItemTrigger() {
        if ( this.omsroleData.length === 0 ) {
            return;
        }
        if ( ( this.omsroleIndex ) < this.omsroleData.length - 1 ) {
            this.omsroleIndex = this.index + 1;
            this.omsroleModel = this.omsroleData[this.omsroleIndex];
            this.oumassmuPopulateDetails();
            if (this.omsroleIndex) {
            this.index = this.omsroleIndex;
            this.disabledPrevious = false;
            }
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.lastrecordof');
            this.show();
            this.disabledNext = true;
        }
       }

    oumassmuKeyPrvblkTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyPrvblk1 ){
        //           //TODO applib_navigate_h.key_prvblk;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyPrvblk2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyPrvrecTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyPrvrec1 ){
        //           //TODO applib_navigate_h.key_prvrec;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyPrvrec2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyPrevItemTrigger() {
        if ( this.omsroleData.length === 0 ) {
            return;
        }
        if ( this.omsroleIndex >= 1 ) {
            this.omsroleIndex = this.index - 1;
            this.omsroleModel = this.omsroleData[this.omsroleIndex];
            this.oumassmuPopulateDetails();
            if (this.omsroleIndex) {
            this.index = this.omsroleIndex;
            this.disabledNext = false;
            }
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.nosetofrecordsexist');
            this.show();
            this.disabledPrevious = true;
        }
    }

    oumassmuKeyScrdownTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyScrdown1 ){
        //           //TODO applib_navigate_h.key_scrdown;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyScrdown2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyScrupTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyScrdown1 ){
        //           //TODO applib_navigate_h.key_scrup;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyScrup2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyUpTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.keyUp1 ){
        //           //TODO applib_navigate_h.key_scrup;             // application hook
        //         }
        //         if (! modlibNavigateHModel.keyUp2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPostBlockTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.postBlock1 ){
        //           //TODO applib_navigate_h.post_block;             // application hook
        //         }
        //         if (! modlibNavigateHModel.postBlock2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPostFormTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.postForm1 ){
        //           //TODO applib_navigate_h.post_form;             // application hook
        //         }
        //         if (! modlibNavigateHModel.postForm2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGPR$SAVE_CTX_ON_EXIT */
        /* This saves primary keys of current rows into globals upon leaving */
        /*   form                                                            */
        // TODO global.cg$oms_role_role_id = oms_role.role_id;
        // TODO global.cg$mod_priv_module_name = mod_priv.module_name;
        // TODO global.cg$mod_priv_role_id = mod_priv.role_id;
    }

    oumassmuPostRecordTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.postRecord1 ){
        //           //TODO applib_navigate_h.post_record;             // application hook
        //         }
        //         if (! modlibNavigateHModel.postRecord2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPostTextItemTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.postTextItem1 ){
        //           //TODO applib_navigate_h.post_text_item;             // application hook
        //         }
        //         if (! modlibNavigateHModel.postTextItem2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPreBlockTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.preBlock1 ){
        //           //TODO applib_navigate_h.pre_block;             // application hook
        //         }
        //         if (! modlibNavigateHModel.preBlock2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPreFormTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // -- set_window_property(FORMS_MDI_WINDOW,TITLE,
        // --      get_item_property('CG$CTRL.CG$AT',HINT_TEXT));
        //         if (modlibNavigateHModel.preForm1 ){
        //           //TODO applib_navigate_h.pre_form;             // application hook
        //         }
        //         if (! modlibNavigateHModel.preForm2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPreRecordTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.preRecord1 ){
        //           //TODO applib_navigate_h.pre_record;             // application hook
        //         }
        //         if (! modlibNavigateHModel.preRecord2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPreTextItemTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.preTextItem1 ){
        //           //TODO applib_navigate_h.pre_text_item;             // application hook
        //         }
        //         if (! modlibNavigateHModel.preTextItem2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenNewRecordInstanceTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.whenNewRecInstance1 ){
        //           //TODO applib_navigate_h.when_new_rec_instance;             // application hook
        //         }
        //         if (! modlibNavigateHModel.whenNewRecInstance2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenNewFormInstanceTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO  this.createFormGlobals();
        // TODO  this.createLibraryGlobals();
        //         if (modlibNavigateHModel.wNewFormInstance1 ){
        //           //TODO applib_navigate_h.w_new_form_instance;             // application hook
        //         }
        //         if (! modlibNavigateHModel.wNewFormInstance2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGGN$CALL_GENERATOR_CODE */
        /* Execute the WHEN-NEW-FORM-INSTANCE code that was created by Forms */
        /*   Generator                                                       */
        // TODO cgbs2$.set_coord_style( 'p' );
        // TODO cgbs2$.set_qry_on_entry( 'y' );
        // TODO  this.cg$whenNewFormInstance();
        // TODO
    }

    oumassmuWhenNewBlockInstanceTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.wNewBlockInstance1 ){
        //           //TODO applib_navigate_h.w_new_block_instance;             // application hook
        //         }
        //         if (! modlibNavigateHModel.wNewBlockInstance2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGLY$MANAGE_CANVASES */
        /* Call procedure to ensure correct canvases are visible */
        // --CGLY$CANVAS_MANAGEMENT;
        // TODO
        /* CGBS$WHEN_NEW_BLOCK_INSTANCE */
        /* ensure the current canvas is correctly coordinated */
        // TODO cgbs$.new_block( system.cursor_block, global.cg$query_mode);
    }

    oumassmuWhenNewItemInstanceTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibNavigateHModel.wNewItemInstance1 ){
        //           //TODO applib_navigate_h.w_new_item_instance;             // application hook
        //         }
        //         if (! modlibNavigateHModel.wNewItemInstance2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuI____queryTrigger() {
    }

    oumassmuKeyCqueryTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibQueryHModel.keyCquery1 ){
        //           //TODO applib_query_h.key_cquery;             // application hook
        //         }
        //         if (! modlibQueryHModel.keyCquery2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGBS$KEY_CQUERY_FRM */
        /* Check if query is allowed to avoid unnecessary coordination */
        //         if ((getBlockProperty( systemModel.triggerBlock, queryAllowed)==='false') ){
        //           //TODO message('error query not allowed in this block');
        //            throw new Error('form_trigger_failure');
        //         }
        //           //TODO cgbs$.do_keyqry( system.trigger_block, 'count_query', system.mode);
    }

    oumassmuKeyEntqryTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibQueryHModel.keyEntqry1 ){
        //           //TODO applib_query_h.key_entqry;             // application hook
        //         }
        //         if (! modlibQueryHModel.keyEntqry2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGBS$KEY_ENTQRY_FRM */
        /// * Check if query is allowed to avoid unnecessary coordination */
        //         if ((getBlockProperty( systemModel.triggerBlock, queryAllowed)==='false') ){
        //           //TODO message('error query not allowed in this block');
        //            throw new Error('form_trigger_failure');
        //         }
        // TODO cgbs$.do_keyqry( system.trigger_block, 'enter_query', system.mode);
    }

    oumassmuKeyExeqryTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibQueryHModel.keyExeqry1 ){
        //           //TODO applib_query_h.key_exeqry;             // application hook
        //         }
        //         if (! modlibQueryHModel.keyExeqry2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGBS$KEY_EXEQRY_FRM */
        /* Check if query is allowed to avoid unnecessary coordination */
        //         if ((getBlockProperty( systemModel.triggerBlock, queryAllowed)==='false') ){
        //           //TODO message('error query not allowed in this block');
        //            throw new Error('form_trigger_failure');
        //         }
        //           //TODO cgbs$.do_keyqry( system.trigger_block, 'execute_query', system.mode);
    }

    oumassmuOnCountTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibQueryHModel.onCount1 ){
        //           //TODO applib_query_h.on_count;             // application hook
        //         }
        //         if (! modlibQueryHModel.onCount2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPostQueryTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibQueryHModel.postQuery1 ){
        //           //TODO applib_query_h.post_query;             // application hook
        //         }
        //         if (! modlibQueryHModel.postQuery2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPreQueryTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibQueryHModel.preQuery1 ){
        //           //TODO applib_query_h.pre_query;             // application hook
        //         }
        //         if (! modlibQueryHModel.preQuery2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuI__relationTrigger() {
    }

    oumassmuOnCheckDeleteMasterTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        //           //TODO
        //         if (modlibRelationHModel.onCheckDelMaster1 ){
        //           //TODO applib_relation_h.on_check_del_master;             // application hook
        //         }
        //         if (! modlibRelationHModel.onCheckDelMaster2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuOnClearDetailsTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibRelationHModel.onClearDetails1 ){
        //           //TODO applib_relation_h.on_clear_details;             // application hook
        //         }
        //         if (! modlibRelationHModel.onClearDetails2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGBS$ON_CLEAR_DETAILS */
        /* clear all detail blocks for the given master block */
        //         if ((formFailure &&  systemModel.coordinationOperation in ('mouse', 'duplicateRecord')) ){
        //            throw new Error('form_trigger_failure');
        //         }
        //         if ((systemModel.masterBlock===systemModel.triggerBlock) ){
        //           //TODO cgbs$.clear_master_detail( system.master_block,
        //           //TODO system.coordination_operation );
        //         }
    }

    oumassmuOnPopulateDetailsTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibRelationHModel.onPopulateDetails1 ){
        //           //TODO applib_relation_h.on_populate_details;             // application hook
        //         }
        //         if (! modlibRelationHModel.onPopulateDetails2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
        // TODO
        /* CGBS$ON_POPULATE_DETAILS */
        /* query all detail blocks for the given master block */
        // TODO cgbs$.query_details( system.cursor_block, global.cg$query_mode );
    }

    oumassmuITransactionalTrigger() {
    }

    oumassmuKeyCommitTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.keyCommit1 ){
        //           //TODO applib_transactional_h.key_commit;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.keyCommit2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyUpdrecTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.keyUpdrec1 ){
        //           //TODO applib_transactional_h.key_updrec;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.keyUpdrec2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyDelrecTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.keyDelrec1 ){
        //           //TODO applib_transactional_h.key_delrec;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.keyDelrec2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuOnCommitTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.onCommit1 ){
        //           //TODO applib_transactional_h.on_commit;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.onCommit2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuOnInsertTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.onInsert1 ){
        //           //TODO applib_transactional_h.on_insert;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.onInsert2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuOnUpdateTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.onUpdate1 ){
        //           //TODO applib_transactional_h.on_update;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.onUpdate2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPostDeleteTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.postDelete1 ){
        //           //TODO applib_transactional_h.post_delete;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.postDelete2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPostInsertTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.postInsert1 ){
        //           //TODO applib_transactional_h.post_insert;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.postInsert2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPostUpdateTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.postUpdate1 ){
        //           //TODO applib_transactional_h.post_update;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.postUpdate2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPreCommitTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.preCommit1 ){
        //           //TODO applib_transactional_h.pre_commit;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.preCommit2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPreDeleteTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.preDelete1 ){
        //           //TODO applib_transactional_h.pre_delete;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.preDelete2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPreInsertTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.preInsert1 ){
        //           //TODO applib_transactional_h.pre_insert;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.preInsert2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPreUpdateTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.preUpdate1 ){
        //           //TODO applib_transactional_h.pre_update;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.preUpdate2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPostFormsCommitTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.postFormsCommit1 ){
        //           //TODO applib_transactional_h.post_forms_commit;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.postFormsCommit2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuPostDatabaseCommitTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibTransactionalHModel.postDatabaseCommit1 ){
        //           //TODO applib_transactional_h.post_database_commit;             // application hook
        //         }
        //         if (! modlibTransactionalHModel.postDatabaseCommit2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuIValidationTrigger() {
    }

    oumassmuWhenValidateItemTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibValidationHModel.whenValidateItem1 ){
        //           //TODO applib_validation_h.when_validate_item;             // application hook
        //         }
        //         if (! modlibValidationHModel.whenValidateItem2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenValidateRecordTrigger() {
        // -- ---------------------------------------------
        // --         Application Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibValidationHModel.whenValidateRecord1 ){
        //           //TODO applib_validation_h.when_validate_record;             // application hook
        //         }
        //         if (! modlibValidationHModel.whenValidateRecord2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuI__variousTrigger() {
    }

    oumassmuKeyHelpTrigger() {
        // -- ---------------------------------------------
        // --         Event Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibVariousHModel.keyHelp1 ){
        //           //TODO applib_various_h.key_help;             // application hook
        //         }
        //         if (! modlibVariousHModel.keyHelp2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuKeyPrintTrigger() {
        // -- ---------------------------------------------
        // --         Event Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibVariousHModel.keyPrint1 ){
        //           //TODO applib_various_h.key_print;             // application hook
        //         }
        //         if (! modlibVariousHModel.keyPrint2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenTimerExpiredTrigger() {
        // -- ---------------------------------------------
        // --         Event Hooks
        // -- ---------------------------------------------
        //         if (modlibVariousHModel.whenTimerExpired1 ){
        //           //TODO applib_various_h.when_timer_expired;             // application hook
        //         }
        //         if (! modlibVariousHModel.whenTimerExpired2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuI__windowTrigger() {
    }

    oumassmuWhenWindowActivatedTrigger() {
        // -- ---------------------------------------------
        // --         Event Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibWindowHModel.whenWindowActivated1 ){
        //           //TODO applib_window_h.when_window_activated;             // application hook
        //         }
        //         if (! modlibWindowHModel.whenWindowActivated2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenWindowClosedTrigger() {
        // -- ---------------------------------------------
        // --         Event Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibWindowHModel.whenWindowClosed1 ){
        //           //TODO applib_window_h.when_window_closed;             // application hook
        //         }
        //         if (! modlibWindowHModel.whenWindowClosed2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenWindowResizedTrigger() {
        // -- ---------------------------------------------
        // --         Event Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibWindowHModel.whenWindowResized1 ){
        //           //TODO applib_window_h.when_window_resized;             // application hook
        //         }
        //         if (! modlibWindowHModel.whenWindowResized2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }

    oumassmuWhenWindowDeactivatedTrigger() {
        // -- ---------------------------------------------
        // --         Event Hooks
        // -- ---------------------------------------------
        // TODO
        //         if (modlibWindowHModel.wWindowDeactivated1 ){
        //           //TODO applib_window_h.w_window_deactivated;             // application hook
        //         }
        //         if (! modlibWindowHModel.wWindowDeactivated2 ){
        //           //TODO return;                // option to bypass designer/2000 code
        //         }
        // -- ---------------------------------------------
    }
    setDialogValues( event ) {
        if (event){
            this.omsroleModel.roleId = event.roleId;
            this.omsroleModel.roleName = event.roleName;
            this.omsroleModel.roleCode = event.roleCode;
        }

    }
    privilegesEvent = ( event ) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = this.modprivData.indexOf( event.data );
        this.checkFlag = false;
        if ( event.field === 'moduleName' ) {
            let count = 0;
            for ( let i = 0; i < this.omsModuleData.length; i++ ) {
                if ( event.newValue === this.omsModuleData[i].moduleName ) {
                    count = count + 1;
                    rowdata.validated = true;
                    this.checkFlag = true;
                    this.priviGrid.setColumnData('moduleName', rowIndex,  this.omsModuleData[i].moduleName);
                    this.priviGrid.setColumnData('moduleDescription', rowIndex,  this.omsModuleData[i].description);
                    this.priviGrid.setColumnData('moduleType', rowIndex,  this.omsModuleData[i].moduleType);
                    return rowdata;
                }
            }
            if (count === 0) {
                this.priviGrid.setColumnData('moduleName', rowIndex, null);
            }
            // if ( !this.checkFlag ) {
            //     this.index = 0;
            //     const rowIndex = this.modprivData.indexOf( event.data );
            //     this.dialogService.openLinkDialog( '/omsmodule', event.data, 50).subscribe( result => {
            //         // this.modprivData[this.index].moduleName = result.moduleName;
            //         // this.modprivData[this.index].moduleDescription = result.moduleDescription;
            //         // this.modprivData[this.index].moduleType = result.moduleType;

            //         this.priviGrid.setColumnData('moduleName', rowIndex, result.moduleName);
            //         this.priviGrid.setColumnData('moduleDescription', rowIndex, result.moduleDescription);
            //         this.priviGrid.setColumnData('moduleType', rowIndex, result.moduleType);
            //     } );
            //     rowdata.validated = true;
            // }

        }
        rowdata.validated = true;
        return rowdata;
    }
}
