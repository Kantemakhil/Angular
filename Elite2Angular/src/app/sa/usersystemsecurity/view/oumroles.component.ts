import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumrolesService } from '@sa/usersystemsecurity/service/oumroles.service';
import { OmsRoles } from '@sausersystemsecuritybeans/OmsRoles';
import { OmsRolesCommitBean } from '@sausersystemsecuritybeans/OmsRolesCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
// import required bean declarations

@Component( {
    selector: 'app-oumroles',
    templateUrl: './oumroles.component.html'
} )

export class OumrolesComponent implements OnInit {
    // Variable declaration
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
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    omsRoleColumnDef: any[];
    modPrivColumnDef: any[];
    omsRoleReadOnly = false;
    modPrivReadOnly = false;
    msgs = [];
    msglist = [];
    message = 'Invalid.';
    type = 'error';
    omsroleCommitModel: OmsRolesCommitBean = new OmsRolesCommitBean();
    omsRoleColumnValues: any[] = [];
    roleIdValue: any;
    retrivebtnDisable: boolean;
    omsRoleGridIndex = 0;
    constructor( private oumrolesFactory: OumrolesService, public translateService: TranslateService ) {
        this.omsRoleColumnDef = [];
        this.modPrivColumnDef = [];
    }
    ngOnInit() {
        this.omsroleData = [];
        this.omsroleExecuteQuery();
        this.retrivebtnDisable = true;
        this.omsRoleColumnDef = [
            { fieldName: this.translateService.translate('oumroles.id'), field: 'roleId', editable: true, width: 330,
                cellEditable: this.canRolesEdit },
            { fieldName: this.translateService.translate('oumroles.rolecodefield'), field: 'roleCode', editable: true, width: 330,
            uppercase: 'true', datatype: 'text', maxlength: '30' },
            { fieldName: this.translateService.translate('oumroles.rolenamefield'), field: 'roleName', editable: true, width: 330 },
            { fieldName: this.translateService.translate('oumroles.sequence'), field: 'roleSeq', editable: true, width: 330,
                datatype : 'number'},
        ];
    }
    /*
     * This function executed to disable Module short name column in  Module Privileges column
     */
    canRolesEdit = ( data: any, index: number, field: string ): boolean => {
        if (!(this.omsroleData[0].roleId && this.omsroleData[0].createDateTime)) {
            return true;
        }
        return false;
    }
    onRowClickomsrole( event ) {
        this.oumrolesFactory.roleIdTempValue = event.roleId;
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange( offender ) {
    }
    /**
    * To display the messages
    */
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];

    }
    /*
     * This function executed to clear role data
     */
    oumrolesClearQuery() {
        this.retrivebtnDisable = false;
        this.omsroleData = [];
        this.omsroleData.push(new OmsRoles());
    }
    /*
     * This function executed to get role data
     */
    omsroleExecuteQuery() {
        if (this.omsroleData.length > 0 ) {
            this.retrivebtnDisable = true;
            this.omsroleModel = this.omsroleData[0];
        } else {
            this.omsroleModel = new OmsRoles();
        }
        this.omsroleModel.createDateTime = DateFormat.getDate();
        this.omsroleModel.modifyDateTime = DateFormat.getDate();
        const omsroleResult = this.oumrolesFactory.omsRoleExecuteQuery( this.omsroleModel );
        omsroleResult.subscribe( omsroleResultList => {
            if ( omsroleResultList.length === 0 ) {
                this.omsroleData = [];
            } else {
                    this.omsroleData = omsroleResultList;
                for (let i = 0; i < omsroleResultList.length; i++) {
                  this.omsRoleColumnValues.push({ 'roleCode': omsroleResultList[i].roleCode, 'roleName': omsroleResultList[i].roleName ,
                      'id': omsroleResultList[i].roleId});
              }
                this.omsroleModel = omsroleResultList[0];
            }
        } );
    }
    /**
	 *  This function will be executed when commit event is
	* fired
	*/
    oumrolesSaveomsroleForm( event ) {
        this.omsroleInsertList = event.added;
        event.updated.forEach(element => {
            if (element.roleId && (!element.createDateTime) ) {
                this.type = 'warn';
                this.message =  this.translateService.translate('oumroles.cannotinsertrecordwithid');
                this.show();
                return;
            } else if (element.roleId && element.createDateTime) {
                this.omsroleUpdatetList = event.updated;
            } else {
                this.omsroleInsertList = event.updated;
            }
            });

        this.omsroleDeleteList = event.removed;
        this.omsroleCommitModel.insertList = [];
        this.omsroleCommitModel.updateList = [];
        this.omsroleCommitModel.deleteList = [];
        if ( this.omsroleInsertList.length > 0 || this.omsroleUpdatetList.length > 0 ) {
            for ( let i = 0; i < this.omsroleInsertList.length; i++ ) {
                if ( !this.omsroleInsertList[i].roleCode ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumroles.rolecode');
                    this.show();
                    return;
                }
                if ( !this.omsroleInsertList[i].roleName ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumroles.rolename');
                    this.show();
                    return;
                }
                if ( !this.omsroleInsertList[i].roleSeq ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumroles.roleseq');
                    this.show();
                    return;
                }
                for (let j = 0; j < this.omsRoleColumnValues.length; j++) {
                    if (this.omsroleInsertList[i].roleCode === this.omsRoleColumnValues[j].roleCode) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumroles.alreadyinserted');
                        this.show();
                        return;
                    }
                    if (this.omsroleInsertList[i].roleName === this.omsRoleColumnValues[j].roleName) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumroles.alreadyinserted');
                        this.show();
                        return;
                    }

                }
            }
            for ( let i = 0; i < this.omsroleUpdatetList.length; i++ ) {
                this.roleIdValue = this.omsroleUpdatetList[i].roleId;
                if ( !this.omsroleUpdatetList[i].roleCode ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumroles.rolecode');
                    this.show();
                    return;
                }
                if ( !this.omsroleUpdatetList[i].roleName ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumroles.rolename');
                    this.show();
                    return;
                }
                if ( !this.omsroleUpdatetList[i].roleSeq ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumroles.roleseq');
                    this.show();
                    return;
                }
                for (let j = 0; j < this.omsRoleColumnValues.length; j++) {
                if ( this.omsRoleColumnValues[j].id !== this.omsroleUpdatetList[i].roleId) {
                   if ((this.omsroleUpdatetList[i].roleCode === this.omsRoleColumnValues[j].roleCode) ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumroles.alreadyinserted');
                        this.show();
                        return;
                    }
                    if (this.omsroleUpdatetList[i].roleName === this.omsRoleColumnValues[j].roleName ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumroles.alreadyinserted');
                        this.show();
                        return;
                    }
                }
            }
            }
        }
            this.omsroleCommitModel.insertList = this.omsroleInsertList;
            this.omsroleCommitModel.updateList = this.omsroleUpdatetList;

        if ( this.omsroleDeleteList.length > 0 ) {
            this.omsroleCommitModel.deleteList = this.omsroleDeleteList;
        }
        if (this.omsroleDeleteList.length === 0 && this.omsroleCommitModel.insertList.length === 0 &&
            this.omsroleCommitModel.updateList.length === 0 ) {
                return;
            }
        const omsroleSaveData = this.oumrolesFactory.omsRoleCommit( this.omsroleCommitModel );
        omsroleSaveData.subscribe( data => {
            if ( data === 1 ) {
               this.omsroleData = data;
                 this.omsroleExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.omsroleData = [];
                this.omsroleExecuteQuery();
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        } );
    }
    /**
     * This function auto generates empty record to insert a new record
     */
   onGridInsert = () => {
       if (this.omsroleData.length > 0) {
       if ( !this.omsroleData[this.omsroleData.length - 1].roleCode ) {
           this.type = 'warn';
           this.message = this.translateService.translate( 'oumroles.rolecode' );
           this.show();
           return;
       }
       if ( !this.omsroleData[this.omsroleData.length - 1].roleName ) {
           this.type = 'warn';
           this.message = this.translateService.translate('oumroles.rolename');
           this.show();
           return;
       }
       if ( !this.omsroleData[this.omsroleData.length - 1].roleSeq ) {
           this.type = 'warn';
           this.message = this.translateService.translate('oumroles.roleseq');
           this.show();
           return;
       }
       }
       return {createDateTime: DateFormat.getDate()};
   }
   /**
    * This function validate the  Sequence and id values
    */
   roleSeqValidator = ( event ) => {
       const rowdata = new ValidateRowReturn();
       if (event.field === 'roleSeq') {
           if ( event.newValue < 0 || event.newValue > 999 ) {
               event.data.roleSeq = undefined;
               this.type = 'warn';
               this.message = this.translateService.translate('common.numbervalidation');
               this.show();
               return false;
           }
           rowdata.validated = true;
           rowdata.data = {roleCode: event.data.roleCode, roleName: event.data.roleName,
                   roleSeq: event.data.roleSeq};
           return rowdata;
       } else if ( event.field === 'roleId' ) {
           if (isNaN(event.data.roleId)) {
               event.data.roleId = undefined;
               this.type = 'warn';
               this.message = this.translateService.translate('oumroles.invalidnumber');
               this.show();
               return false;
           }
           rowdata.validated = true;
           rowdata.data = {roleCode: event.data.roleCode, roleName: event.data.roleName,
                   roleSeq: event.data.roleSeq};

           return rowdata;
       } else {
           rowdata.validated = true;
           return rowdata;
       }
   }
}
