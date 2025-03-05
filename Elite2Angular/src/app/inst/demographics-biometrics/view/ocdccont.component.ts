import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdccontService } from '../service/ocdccont.service';
import { Phones } from '@instdemographicsbeans/Phones';
import { PhonesCommitBean } from '@instdemographicsbeans/PhonesCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';

@Component( {
    selector: 'app-ocdccont',
    templateUrl: './ocdccont.component.html'
} )

export class OcdccontComponent implements OnInit {
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('addressPhoneGrid') addressPhoneGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    nameOfLovPage: string;
    listToCompare: any[] = [];
    phonesData: Phones[] = [];
    phonesDataTemp: Phones[] = [];
    phonesModel: Phones = new Phones();
    phonesIndex: 0;
    phonesInsertList: Phones[] = [];
    phonesUpdateList: Phones[] = [];
    phonesDeleteList: Phones[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: true;
    phonesColumnDef: any[];
    phonesReadOnly: false;
    ctrlReadOnly: false;
    rgphonetypeRg: any[] = [];
    translateLabel: any;
    rgphonetypelist: any[] = [];
    phoneId: any;
    phonesCommitModel: PhonesCommitBean = new PhonesCommitBean();
    selectedFormat: any;
    constructor( private ocdccontFactory: OcdccontService, public translateService: TranslateService,
        private sessionManager: UserSessionManager ) {
    }
    ngOnInit() {
        this.phonesColumnDef = [
            {
                fieldName: this.translateService.translate('ocdccont.phoneFormat'), field: 'format', editable: true, width: 200,
                datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true, source:'OUMSYSET'
            },
            {
                fieldName: this.translateService.translate( 'common.type' ) + '*', field: 'phoneType', datatype: 'lov',
                domain: 'PHONE_USAGE', editable: true, width: 300,  optionWidth: 300
            },
            {
                fieldName: this.translateService.translate( 'common.phonenumber' ) + '*', field: 'phoneNo',
                datatype : 'phone', maxlength: 14, editable: true, width: 300, formatType: this.selectedFormat
            },
            {
                fieldName: this.translateService.translate( 'common.extension' ), field: 'extNo', editable: true,
                datatype: 'text', maxlength: 7, width: 300, uppercase: 'false'
            },

        ];

        this.phonesModel.ownerClass = 'ADDR';
        if ( this.dialog.data.addressId ) {
            this.phonesModel.ownerId = this.dialog.data.addressId;
        } else {
        if ( this.dialog.data.address ) {
            this.phonesModel.ownerId = this.dialog.data.address.addressId;
        }
        if ( this.dialog.data.person ) {
            this.phonesModel.ownerId = this.dialog.data.address.addressId;
            // this.phonesModel.ownerClass = 'PER';
        }
        if ( this.dialog.data.address.length === 0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccont.selectaddress' );
            this.show();
            return;
        }
        }
        this.phonesExecuteQuery();
    }

    phonesExecuteQuery() {
        const phonesResult = this.ocdccontFactory.phonesExecuteQuery( this.phonesModel );
        phonesResult.subscribe( data => {
            if ( data.length === 0 ) {
                this.phonesData = [];
            } else {
                this.phonesData = data;
                this.phonesModel = data[0];
            }
        } );
    }

    onRowClickphones( event ) {
    }

    onButExitclick() {
        this.dialog.close( null );
    }

/**
     *  This function will be executed when commit event is
    * fired
    */
    ocdccontSavephonesForm( event ) {
        this.phonesInsertList = event.added;
        this.phonesUpdateList = event.updated;
        this.phonesDeleteList = event.removed;
        this.phonesCommitModel.insertList = [];
        this.phonesCommitModel.updateList = [];
        this.phonesCommitModel.deleteList = [];
        for ( let i = 0; i < this.phonesData.length; i++ ) {
            const formattedNumber=PhoneNumberUtils.getFormattedNumber(this.phonesData[i].format, this.phonesData[i].phoneNo).replace(/[- )(]/g,'');
            const selectedFormat = PhoneNumberUtils.contactType.find(x => this.phonesData[i].format === x.maskingCode);
            if ( !this.phonesData[i].format || this.phonesData[i].format === '') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.formatmustbeentered');
                this.show();
                return;
            }
            if ( !this.phonesData[i].phoneType || this.phonesData[i].phoneType === '') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.typemustbeentered');
                this.show();
                return;
            }
            if ( !this.phonesData[i].phoneNo || this.phonesData[i].phoneNo === '') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.numbermustbeentered');
                this.show();
                return;
            }
            if (!(this.phonesData[i].phoneNo.length === formattedNumber.length)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdccont.fieldmustbeform')
                .replace('%format%', selectedFormat.maskFormat);
                this.show();
                return;
            }
            if (!(this.phonesData[i].phoneNo.length === formattedNumber.length) && this.phonesData[i].format != 'UNF') {
                if(String(this.phonesData[i].phoneNo).length >= 1 && formattedNumber.length) {
                    this.type = 'warn';
                    this.message = this.translateService.translate
                    ('common.fieldmustbeform').replace('%format%', selectedFormat.maskFormat);
                    this.show();
                    return;
                } else if(String(this.phonesData[i].phoneNo).length < 1 && !(formattedNumber)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.fieldmustbeform');
                    this.show();
                    return;
                } 
            }
        }
        if ( this.phonesInsertList.length > 0 || this.phonesUpdateList.length > 0 ) {
            for ( let i = 0; i < this.phonesInsertList.length; i++ ) {
                this.phonesInsertList[i].ownerClass = this.phonesModel.ownerClass;
                this.phonesInsertList[i].ownerId = this.phonesModel.ownerId;
                this.phonesInsertList[i].createUserId = this.sessionManager.getId();
                this.phonesInsertList[i].createDatetime = DateFormat.getDate();
            }
            for ( let i = 0; i < this.phonesUpdateList.length; i++ ) {
                this.phonesUpdateList[i].ownerClass = this.phonesModel.ownerClass;
                this.phonesUpdateList[i].ownerId = this.phonesModel.ownerId;
                this.phonesUpdateList[i].modifyUserId = this.sessionManager.getId();
                this.phonesUpdateList[i].modifyDatetime = DateFormat.getDate();
            }
            this.phonesCommitModel.insertList = this.phonesInsertList;
            this.phonesCommitModel.updateList = this.phonesUpdateList;
        }
        if ( this.phonesDeleteList.length > 0 ) {
            for ( let i = 0; i < this.phonesDeleteList.length; i++ ) {
            }
            this.phonesCommitModel.deleteList = this.phonesDeleteList;
        }

        const phonesSaveData = this.ocdccontFactory.phonesCommit( this.phonesCommitModel );
        phonesSaveData.subscribe( data => {
            if ( data === 1 ) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.phonesData = data;
                this.phonesExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.phonesData = data;
                this.phonesExecuteQuery();
            }
        } );
    }
    onPhonesInsert = () => {
        // const formattedNumber = PhoneNumberUtils.phoneFormat.replace(/[- )(]/g,'');
        for ( let i = 0; i < this.phonesData.length; i++ ) {
        const formattedNumber=PhoneNumberUtils.getFormattedNumber(this.phonesData[i].format, this.phonesData[i].phoneNo).replace(/[- )(]/g,'');
        const selectedFormat = PhoneNumberUtils.contactType.find(x => this.phonesData[i].format === x.maskingCode);
            if ( !this.phonesData[i].format || this.phonesData[i].format === '') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.formatmustbeentered');
                this.show();
                return;
            }
            if ( !this.phonesData[i].phoneType || this.phonesData[i].phoneType === '') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.typemustbeentered');
                this.show();
                return;
            }
            if ( !this.phonesData[i].phoneNo || this.phonesData[i].phoneNo === '') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.numbermustbeentered');
                this.show();
                return;
            }
            if (!(this.phonesData[i].phoneNo.length === formattedNumber.length)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdccont.fieldmustbeform')
                .replace('%format%', selectedFormat.maskFormat);
                this.show();
                return;
            }
            if (!(this.phonesData[i].phoneNo.length === formattedNumber.length) && this.phonesData[i].format != 'UNF') {
                if(String(this.phonesData[i].phoneNo).length >= 1 && formattedNumber.length) {
                    this.type = 'warn';
                    this.message = this.translateService.translate
                    ('common.fieldmustbeform').replace('%format%', selectedFormat.maskFormat);
                    this.show();
                    return;
                } else if(String(this.phonesData[i].phoneNo).length < 1 && !(formattedNumber)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.fieldmustbeform');
                    this.show();
                    return;
                } 
            }
    }
        return {};
    }
    validateRowPhonesData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'format') {
            this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
            PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
            this.addressPhoneGrid.setColumnData('phoneNo', rowIndex, null);
        }
        rowdata.validated = true;
        return rowdata;
      }
     /**
     * This function displays the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }
/*nbtPhoneTypeWhenValidateItemTrigger() {
        if (phonesModel.nbtPhoneType = null ){
          //TODO phones.phone_type = null;
        }
    }

    butPhoneTypeWhenButtonPressedTrigger() {
          //TODO go_item('phones.nbt_phone_type');
          //TODO do_key('list_values');
    }

    phonesOnErrorTrigger() {
 Trap errors returning from the server and report in a user
   friendly manner
         const errCode = errorCode;
         const errType = errorType;
         const serverErr = abs (dbmsErrorCode);
         const serverMsg = dbmsErrorText;
         const constraintName;
         const vAlertNo;
          //TODO
        if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
 Remove recursive errors from the top of the stack
        while (server_err = 604) {
          //TODO cgte$pop_error_stack (server_err, server_msg);
        }
          //TODO
 Check and report the generic constraint violations
        if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
           throw new Error('form_trigger_failure');
        }
          //TODO
 Check and report the constraint violations specific to this
            block
          //TODO constraint_name = cgte$strip_constraint (server_msg);
        }
          //TODO
        if ((errType==='frm' &&  errCode===40202) ){
          //TODO v_alert_no =
          //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things//
              if the prompt is multi line prompt then it will get displayed as single line prompt
               upon error.//     '*' character won't appear along with the prompt when mandatory value
               is not entered.replace(substr(get_item_property(system.trigger_item, prompt_text), 1,
                instr(get_item_property(system.trigger_item, prompt_text), '*') - 1 )||substr(error_text, 6),
                 chr(10), ' '),null,null,null,null);
           throw new Error('form_trigger_failure');
        }
          //TODO
         //TODO  this.checkBlockErrors();
          //TODO
        if (instr(errorText, 'ora')===0 ){
 If error not found, issue default message
          //TODO v_alert_no =
          //TODO this.displayTheAlertCfgErrorerr_type|| '-'|| to_char (err_code)|| ' '|| error_text,null,null,null,null);
        } else {
          //TODO
         //TODO  this.showErrorForm();
          //TODO
        }
           throw new Error('form_trigger_failure');
    }

    phonesPreQueryTrigger() {
         const subWhere;
         const defWhere = 'ownerClass=''ADDR'' AND ownerId=:PARAMETER.pOwnerId';
          //TODO
          //TODO
          //TODO sub_where = null;
        if ((phonesModel.nbtPhoneType !== null) ){
          //TODO sub_where = '(domain=''phone_usage'' and upper(description) like upper('''||
          //TODO phones.nbt_phone_type || '''))';
        }
        if ((subWhere !== null) ){
          //TODO def_where = def_where || ' and ((phone_type) in '||'(select
          //TODO code '||'from reference_codes where  '|| sub_where || '))';
        }
          //TODO
          //TODO set_block_property('phones', default_where, def_where);
          //TODO
    }

    phonesPostQueryTrigger() {
          //TODO phones.nbt_phone_type =
          //TODO oms_miscellaneous.getdesccode ('phone_usage',
          //TODO phones.phone_type);
          //TODO
          //TODO
          //TODO
          //TODO set_record_property(to_char(system.trigger_record), 'phones', status, query_status);
    }

    butSaveWhenButtonPressedTrigger() {
          //TODO do_key('commit_form');
    }

    butExitWhenButtonPressedTrigger() {
          //TODO do_key('exit_form');
    }

    ocdccontI___itemTrigger() {
        ;
    }

    ocdccontKeyListvalTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO pplib_item_h.key_listval;  // application hook
          //TODO
         //TODO  this.listValues();
          //TODO
          //TODO next_item ;
    }

    ocdccontWhenButtonPressedTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_item_h.when_button_pressed; // application hook
    }

    ocdccontI_navigateTrigger() {
        ;
    }

    ocdccontKeyExitTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_navigate_h.key_exit;    // application hook
          //TODO
         //TODO  tis.exitForm();
          //TODO
         //-- new code from triggeradd --
         //--
         //-- @@@ Vipul on 28-SEP-2001 : Tracking# 8862 : Added call to procedure
         //--     in application library to handle coordination of menu and forms
         //--
         //TODO  this.undoPostFormInit();
          //TODO
         //-- end new code --
    }

    ocdccontKeyNxtblkTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_navigate_h.key_nxtblk;  // application hook
          //TODO
         //TODO  this.nextBlock();
    }

    ocdccontKeyPrvblkTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_navigate_h.key_prvblk;  // application hook
          //TODO
         //TODO  this.previousBlock();
    }

    ocdccontPostFormTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_navigate_h.post_form;   // application hook
    }

    ocdccontPreBlockTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_navigate_h.pre_block;   // application hook
    }

    ocdccontPreFormTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_navigate_h.pre_form;    // application hook
    }

    ocdccontWhenNewRecordInstanceTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_navigate_h.when_new_rec_instance;   // application hook
          //TODO
          //TODO populate_images ;
    }

    ocdccontWhenNewFormInstanceTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
         //TODO  this.createLibraryGlobals();
          //TODO
         //TODO  this.createApplibGlobals();
          //TODO
         //--
         //-- NIKO @ 09-MAR-2007
         //-- Setting format mask for PHONE
         //--
          //TODO set_item_property('phones.phone_no', format_mask, oms_miscellaneous.get_format_mask ('format', 'phone'));
          //TODO
         //TODO  this.checkParameters();
          //TODO
          //TODO aplib_navigate_h.w_new_form_instance;  // application hook
          //TODO
         //TODO  this.initialQuery();
    }

    ocdccontWhenNewBlockInstanceTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_navigate_h.w_new_block_instance;    // application hook
    }

    ocdccontWhenNewItemInstanceTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_navigate_h.w_new_item_instance; // application hook
    }

    ocdccontI____queryTrigger() {
        ;
    }

    ocdccontKeyEntqryTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_query_h.key_entqry; // application hook
          //TODO
          //TODO handle_images ;
          //TODO
         //TODO  this.enterQuery();
    }

    ocdccontKeyExeqryTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_query_h.key_exeqry; // application hook
          //TODO
         //TODO  this.executeQuery();
    }

    ocdccontPostQueryTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_query_h.post_query; // application hook
    }

    ocdccontPreQueryTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO applib_query_h.pre_query;  // application hook
    }

    ocdccontITransactionalTrigger() {
        ;
    }

    ocdccontKeyCommitTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_transactional_h.key_commit; // application hook
          //TODO
         //TODO  this.commit();
    }

    ocdccontOnInsertTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_transactional_h.on_insert;  // application hook
          //TODO
         //TODO  this.insertRecord();
          //TODO
         //-- @@@ Venu 07/Apr/2005, In CGTE$CHECK_CONSTRAINT_VIO program unit we check for Primary Key/Unique Key or Check constraint
         //--                       violations, if any such violation occurs when user tries to commit a record then it should
         //--                       RAISE FORM_TRIGGER_FAILURE before continuing further but it displays "Transaction complete...."
         //--                       message and as well as "Row already exists with....", fixed it by following call.
         //TODO  this.chkPackageFailure();
    }

    ocdccontOnUpdateTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_transactional_h.on_update;  // application hook
          //TODO
         //TODO  this.updateRecord();
          //TODO
         //-- @@@ Venu 07/Apr/2005, In CGTE$CHECK_CONSTRAINT_VIO program unit we check for Primary Key/Unique Key or Check constraint
         //--                       violations, if any such violation occurs when user tries to commit a record then it should
         //--                       RAISE FORM_TRIGGER_FAILURE before continuing further but it displays "Transaction complete...."
         //--                       message and as well as "Row already exists with....", fixed it by following call.
         //TODO  this.chkPackageFailure();
    }

    ocdccontPreInsertTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_transactional_h.pre_insert; // application hook
    }

    ocdccontPreUpdateTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_transactional_h.pre_update; // application hook
    }

    ocdccontIValidationTrigger() {
        ;
    }

    ocdccontOnErrorTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_validation_h.on_error;  // application hook
    }

    ocdccontWhenValidateItemTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_validation_h.when_validate_item;    // application hook
    }

    ocdccontWhenValidateRecordTrigger() {
         //-- ---------------------------------------------
         //--       Application Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_validation_h.when_validate_record;  // application hook
    }

    ocdccontI__variousTrigger() {
        ;
    }

    ocdccontKeyHelpTrigger() {
         //-- ---------------------------------------------
         //--       Event Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_various_h.key_help; // application hook
    }

    ocdccontOnMessageTrigger() {
         //-- ---------------------------------------------
         //--       Event Hooks
         //-- ---------------------------------------------
         //-- @@@ Venu 26-April-2005, Not required.
         //-- APPLIB_Various_H.On_Message;  -- application hook
          //TODO
         const vAlertNo;
        if (messageCode===40400 ){
          //TODO set_alert_property ('cfg_information', alert_message_text,
          //TODO message_text);
          //TODO v_alert_no = show_alert ('cfg_information');
        } else {
          //TODO v_alert_no =
          //TODO this.displayTheAlertCfgErrormessage_type|| '-'|| to_char (message_code)|| ' '|| message_text,null,null,null,null);
        }
    }

    ocdccontI__windowTrigger() {
        ;
    }

    ocdccontWhenWindowActivatedTrigger() {
         //-- ---------------------------------------------
         //--       Event Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_window_h.when_window_activated; // application hook
    }

    ocdccontWhenWindowClosedTrigger() {
         //-- ---------------------------------------------
         //--       Event Hooks
         //-- ---------------------------------------------
          //TODO
          //TODO applib_window_h.when_window_closed;    // application hook
    }

    ocdccontPreTextItemTrigger() {
          //TODO applib_navigate_h.pre_text_item;   // application hook
    }

    ocdccontPostTextItemTrigger() {
          //TODO applib_navigate_h.post_text_item;  // application hook
    }*/
}
