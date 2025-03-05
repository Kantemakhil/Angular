import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VCourtEvents } from '@inst/legal-screens/beans/VCourtEvents';
import { OiicmociService } from '@inst/movement-external/service/oiicmoci.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router } from '@angular/router';
import { OiinamesService } from '@inst/movement-external/service/oiinames.service';
import { VNameSearch } from '@common/beans/VNameSearch';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OcinamesService } from '@cm/searchassaign/service/ocinames.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';


// import required bean declarations

@Component({
    selector: 'app-oiicmoci',
    templateUrl: './oiicmoci.component.html'
})

export class OiicmociComponent implements OnInit {
    // Variable declaration
    actionName: string;
    offenderIdDisplay: '';
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    crteventsModel: VCourtEvents = new VCourtEvents();
    offschData: VCourtEvents [] = [];
    offschDataTemp: VCourtEvents[] = [];
    // TODO angular.copy(this.offschData, thisoffschDataTemp);
    offschModel: VCourtEvents = new VCourtEvents();
    offschIndex: number = 0;
    offschInsertList: VCourtEvents[] = [];
    offschUpdatetList: VCourtEvents[] = [];
    offschDeleteList: VCourtEvents[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean = true;
    offSchColumnDef: any[];
    crtEventsReadOnly: boolean = false;
    offSchReadOnly: boolean = false;
    rgagylocidRg: any[] = [];
    rglu1Rg: any[] = [];
    rglu2Rg: any[] = [];
    rglu3Rg: any[] = [];
    facilityUrl: string;
    livingUnitOneUrl: string;
    livingUnitTwoUrl: string;
    livingUnitThreeUrl: string;
    namesrchModel: VNameSearch = new VNameSearch();
    routUrl = '';
    offenderName = '';
    invalidId: boolean;
    rtrvBtn: boolean;
    dateReadonly: boolean;
    timeReadonly: boolean;
    offenderIdDisplayReadonly: boolean;
    disableLaunchBut: boolean;
    offenderNameReadonly: boolean;
    facilityRead: boolean;
    livingUnitOneRead: boolean;
    livingUnitTwoRead: boolean;
    livingUnitThreeRead: boolean;
    constructor(private oiicmociFactory: OiicmociService,
        private sessionManager: UserSessionManager,
        private router: Router,
        private oiinamesFactory: OiinamesService,
        public translateService: TranslateService,
        public ocinamesFactory: OcinamesService,
        public dialogService: DialogService) {
        // TODO initilize data members here..!
    this.offSchColumnDef = [];

}
    ngOnInit() {
    
        this.rtrvBtn = false;
        this.dateReadonly = false;
        this.timeReadonly = false;
        this.offenderIdDisplayReadonly = false;
        this.disableLaunchBut = false;
        this.offenderNameReadonly = false;
        this.facilityRead = false;
        this.livingUnitOneRead = false;
        this.livingUnitTwoRead = false;
        this.livingUnitThreeRead = false;
    if (this.oiicmociFactory.crteventsModel && this.oiicmociFactory.crteventsModel.eventDate) {
        this.crteventsModel = this.oiicmociFactory.crteventsModel;
        this.oiicmociFactory.crteventsModel = new VCourtEvents;
    } else {
        this.crteventsModel.eventDate = DateFormat.getDate();
    }

    if (this.oiicmociFactory.offschData.length > 0) {
        this.offschData = this.oiicmociFactory.offschData;
        this.oiicmociFactory.offschData = [];
    }
    this.crteventsModel['offenderIdDisplay'] = '';
    if (this.oiicmociFactory.nameLovData) {
        if (this.oiicmociFactory.nameLovData.offenderIdDisplay) {
            this.crteventsModel.offenderIdDisplay = this.oiicmociFactory.nameLovData.offenderIdDisplay;
        }
        if (this.oiicmociFactory.nameLovData.lastName || this.oiicmociFactory.nameLovData.firstName) {
            this.offenderName = this.oiicmociFactory.nameLovData.lastName + ' , '
            + this.oiicmociFactory.nameLovData.firstName;
        }
        if (this.crteventsModel.offenderIdDisplay && String(this.crteventsModel.offenderIdDisplay).trim() !== '' &&
            this.oiicmociFactory.nameLovData.activeFlag !== 'A') {
            this.inactiveOffender();
        } else {
            this.invalidId = false;
        }
        this.oiicmociFactory.nameLovData = new VNameSearch();
    }

    this.routUrl = this.router.url;
    this.facilityUrl = 'oiicmoci/rgAgyLocIdRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
    this.offSchColumnDef = [
        { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false,
            width: 150},
        { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150},
        { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150},
        { fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'offenderAgyLocDesc', editable: false,
            width: 150},
        { fieldName: this.translateService.translate('common.reason'), field: 'movementReasonDesc', editable: false,
            width: 150},
        { fieldName: this.translateService.translate('common.court'), field: 'agyLocIdName', editable: false, width: 150},
        { fieldName: this.translateService.translate('common.time'), field: 'startTime', datatype: 'time', editable: false, width: 150},
        // { fieldName: this.translateService.translate('oiicmoci.judge'), field: 'judgeName', editable: false, width: 150},
        {
            fieldName: this.translateService.translate('oidcrtev.apperancetype'), editable: false, domain: 'CRT_APP_TYPE',
            field: 'appearanceType', datatype: 'lov', width: 130, 
        },
        {
            fieldName: this.translateService.translate('oidcrtev.apperancelocation'), required: false, editable: false, source: 'OIMULOCA',
            link: 'oidcrtev/apperancelocationRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad,
            field: 'appearanceLocation', datatype: 'lov', width: 130, 
          },
        { fieldName: this.translateService.translate('common.comments'), field: 'commentText', editable: false, width: 150},
        { fieldName: this.translateService.translate('oiicmoci.cancel'), field: 'cancelFlag',datatype: 'checkbox', editable: false, width: 150},
        { fieldName: this.translateService.translate('oiicmoci.cancelReason'), field: 'outcomeReasonCode', datatype: 'lov',domain: 'CRT_CAN_RSN', editable: false, width: 150},
       
        ];
        // TODO all initializations here

  /*  const rgagylocidServiceObj = this.oiicmociFactory.
    rgAgyLocIdRecordGroup(null);
    rgagylocidServiceObj.subscribe(rgagylocidList => {
            if (rgagylocidList.length === 0) {
                 this.rgagylocidRg = [];
             } else {
            for (let i = 0; i < rgagylocidList.length; i++) {
            this.rgagylocidRg.push({ 'text': rgagylocidList[i].code + ' - ' +
            rgagylocidList[i].description, 'id': rgagylocidList[i].code });
        }
        }
    });
    const rglu1ServiceObj = this.oiicmociFactory.
    rgLu1RecordGroup(null);
    rglu1ServiceObj.subscribe(rglu1List => {
            if (rglu1List.length === 0) {
                 this.rglu1Rg = [];
             } else {
            for (let i  = 0; i < rglu1List.length; i++) {
            this.rglu1Rg.push({ 'text': rglu1List[i].code + ' - ' +
            rglu1List[i].description, 'id': rglu1List[i].code });
        }
        }
    });
    const rglu2ServiceObj = this.oiicmociFactory.
    rgLu2RecordGroup(null);
    rglu2ServiceObj.subscribe(rglu2List => {
            if (rglu2List.length === 0) {
                 this.rglu2Rg = [];
             } else {
            for (let i = 0; i < rglu2List.length; i++) {
            this.rglu2Rg.push({ 'text': rglu2List[i].code + ' - ' +
            rglu2List[i].description, 'id': rglu2List[i].code });
        }
        }
    });
    const rglu3ServiceObj = this.oiicmociFactory.
    rgLu3RecordGroup(null);
    rglu3ServiceObj.subscribe(rglu3List => {
            if (rglu3List.length === 0) {
                 this.rglu3Rg = [];
             } else {
            for (let i = 0; i < rglu3List.length; i++) {
            this.rglu3Rg.push({ 'text': rglu3List[i].code + ' - ' +
            rglu3List[i].description, 'id': rglu3List[i].code });
        }
        }
    }); */
    }
    allowNumbers( event ) {
    }
    onRowClickoffsch(event) {
    }
     ok() {
        this.rtrvBtn = true;
        this.dateReadonly = true;
        this.timeReadonly = true;
        this.offenderIdDisplayReadonly = true;
        this.disableLaunchBut = true;
        this.offenderNameReadonly = true;
        this.facilityRead = true;
        this.livingUnitOneRead = true;
        this.livingUnitTwoRead = true;
        this.livingUnitThreeRead = true;
        this.offschExecuteQuery();
        this.rtrvBtn = true;
    }
     no() {
        this.crteventsModel = new VCourtEvents();
        this.offschData = [];
        this.offenderName = null;
        this.rtrvBtn = false;
        this.dateReadonly = false;
        this.timeReadonly = false;
        this.offenderIdDisplayReadonly = false;
        this.disableLaunchBut = false;
        this.offenderNameReadonly = false;
        this.rtrvBtn = false;
        this.facilityRead = false;
        this.livingUnitOneRead = false;
        this.livingUnitTwoRead = false;
        this.livingUnitThreeRead = false;
    }
     cancel() {
    }
    inactiveOffender() {
        this.invalidId = true;
        this.show(
            this.crteventsModel.offenderIdDisplay + ' '
            + this.translateService.translate('oiicmoci.inactive') +
            ' ' + this.sessionManager.currentCaseLoad, 'warn');

    }
    onOffenderChange(offender) {
    }
    offschExecuteQuery() {
        if (!this.crteventsModel.eventDate) {
                this.show(this.translateService.translate('common.date') + ' ' + this.translateService.translate('common.mustbeenter'),
                 'warn');
                return;
        }
        if (!this.crteventsModel.agyLocIdName) {
            this.show(this.translateService.translate('system-profile.inst-agency') + ' '
            + this.translateService.translate('common.mustbeenter'), 'warn');
            return;
    }
     if (this.crteventsModel.offenderIdDisplay && this.invalidId) {
         this.inactiveOffender();
         return;
     }

                 const offschResult = this.oiicmociFactory.
                 offSchExecuteQuery(this.crteventsModel);
                     offschResult.subscribe(offschResultList => {
                    if (offschResultList.length === 0) {
                        this.offschData = [];
                        this.show(this.translateService.translate('common.querycaused'), 'warn');
                    } else {
                        this.offschData = offschResultList;
                        this.offschData.forEach(ele=>{
                            ele.cancelFlag = ele.eventStatus === 'CANC' ? true : false;
                        });
                        this.offschModel = offschResultList[0];
                    }
                });
    }
    facilityChange() {
        this.crteventsModel.level1Code = null;
        if (this.crteventsModel.agyLocIdName) {
            this.livingUnitOneUrl = 'oiicmoci/rgLu1RecordGroup?agyLocId=' + this.crteventsModel.agyLocIdName;
        }
    }
    livingUnitOneChange() {
        this.crteventsModel.level2Code = null;
        if (this.crteventsModel.level1Code) {
            this.livingUnitTwoUrl = 'oiicmoci/rgLu2RecordGroup?agyLocId='
            + this.crteventsModel.agyLocIdName + '&livingUnit=' + this.crteventsModel.level1Code;
        }
    }
    livingUnitTwoChange() {
        this.crteventsModel.level3Code = null;
        if (this.crteventsModel.level2Code) {
            this.livingUnitThreeUrl = 'oiicmoci/rgLu3RecordGroup?agyLocId='
            + this.crteventsModel.agyLocIdName + '&livingUnit=' + this.crteventsModel.level2Code;
        }
    }
    checkVal(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                this.show('List of Values contains no entries.');
            }
        }
    }
    isReadOnly(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
       }

      get clearFlag(){
            if(this.offenderName || this.crteventsModel.offenderIdDisplay || this.crteventsModel.level3Code || this.crteventsModel.level2Code
                || this.crteventsModel.level1Code || this.crteventsModel.agyLocIdName || this.crteventsModel.startTime || this.crteventsModel.eventDate){
                return false;
            } else
                return true;
       }

//     eventDateKeyListvalTrigger() {
//          //TODO  this.displayCalendar();
//     }

//     agyLocIdNameWhenValidateItemTrigger() {
//         if (crtEventsModel.agyLocIdName = null ){
//         if (systemModel.recordStatus==='new' ){
//           //TODO return;
//         }
//           //TODO copy (null, 'crt_events.agy_loc_id');
//           //TODO copy (null, 'crt_events.level_1_code');
//           //TODO copy (null, 'crt_events.level_2_code');
//           //TODO copy (null, 'crt_events.level_3_code');
//         } else {
//           //TODO copy (null, 'crt_events.level_1_code');
//           //TODO copy (null, 'crt_events.level_2_code');
//           //TODO copy (null, 'crt_events.level_3_code');
//         }
//     }

//     agyLocIdNameKeyListvalTrigger() {
//          //TODO  this.listValues();
//           //TODO 
//         if (crtEventsModel.agyLocIdName !== null ){
//           //TODO go_item ('crt_events.level_1_code');
//          //TODO  this.clearItem();
//           //TODO go_item ('crt_events.level_2_code');
//          //TODO  this.clearItem();
//           //TODO go_item ('crt_events.level_3_code');
//          //TODO  this.clearItem();
//           //TODO go_item ('crt_events.level_1_code');
//         }
//     }

//     butAgyIdWhenButtonPressedTrigger() {
//           //TODO go_item ('crt_events.agy_loc_id_name');
//           //TODO do_key ('list_values');
//     }

//     level1CodeWhenValidateItemTrigger() {
//         if (crtEventsModel.level1Code = null ){
//         if (systemModel.recordStatus==='new' ){
//           //TODO return;
//         }
//           //TODO copy(null ,'crt_events.level_2_code');
//           //TODO copy(null ,'crt_events.level_3_code');
//         } else {
//           //TODO copy(null ,'crt_events.level_2_code');
//           //TODO copy(null ,'crt_events.level_3_code');
//           //TODO 
//         }
//           //TODO 
//     }

//     level1CodeKeyListvalTrigger() {
//          //TODO  this.listValues();
//           //TODO 
//         if (crtEventsModel.level1Code !== null ){
//           //TODO go_item ('crt_events.level_2_code');
//          //TODO  this.clearItem();
//           //TODO go_item ('crt_events.level_3_code');
//          //TODO  this.clearItem();
//           //TODO go_item ('crt_events.level_2_code');
//         }
//     }

//     butLu1WhenButtonPressedTrigger() {
//           //TODO go_item ('crt_events.level_1_code');
//           //TODO do_key ('list_values');
//     }

//     level2CodeWhenValidateItemTrigger() {
//         if (crtEventsModel.level2Code = null ){
//         if (systemModel.recordStatus==='new' ){
//           //TODO return;
//         }
//           //TODO 
//           //TODO copy (null, 'crt_events.level_3_code');
//         } else {
//           //TODO copy (null, 'crt_events.level_3_code');
//         }
//     }

//     level2CodeKeyListvalTrigger() {
//          //TODO  this.listValues();
//           //TODO 
//         if (crtEventsModel.level2Code !== null ){
//           //TODO go_item ('crt_events.level_3_code');
//          //TODO  this.clearItem();
//         }
//     }

//     butLu2WhenButtonPressedTrigger() {
//           //TODO go_item ('crt_events.level_2_code');
//           //TODO do_key ('list_values');
//     }

//     butLu3WhenButtonPressedTrigger() {
//           //TODO go_item ('crt_events.level_3_code');
//           //TODO do_key ('list_values');
//     }

//     offenderIdDisplayKeyListvalTrigger() {
//           //TODO 
//           //TODO copy ('oiicmoci', 'global.from_form');
//           //TODO copy (name_in ('crt_events.agy_loc_id'), 'global.agy_loc_id');
//          //--CALL_FORM ('OSINAMES', NO_HIDE, DO_REPLACE, NO_QUERY_ONLY);  -- Steve 04-Sep-08, Tr#5932
//           //TODO call_form ('oiinames', no_hide, do_replace, no_query_only);
//           //TODO 
//         if (globalModel.offenderBookId !== null ){
//           //TODO copy ( global.offender_book_id, 'crt_events.offender_book_id' );
//           //TODO copy ( global.offender_id_display, 'crt_events.offender_id_display' );
//           //TODO 
//          //--@@@    Claus, 20-Jun-2006. D# 2076. Populate Offender name.
//           //TODO copy ( global.last_name ||', '||global.first_name  ,'crt_events.nbt_offender' );
//         }
//           //TODO 
//          //TODO  this.nextItem();
//           //TODO 
//     }

//     offenderIdDisplayWhenValidateItemTrigger() {
//         if (crtEventsModel.offenderIdDisplay = null ){
//           //TODO crt_events.nbt_offender = null;
//         } else {
//          //-- @@@ Rose 22-APR-2008 #5619
//         if (getProfileValue('display', 'idDisplay')==='y' ){
//           //TODO crt_events.offender_id_display = upper( lpad( ltrim ( crt_events.offender_id_display, '0' ), 10, '0'));
//         }
//           //TODO 
//          //TODO  this.getDetails();
//         }
//     }

//     butOffDispIdWhenButtonPressedTrigger() {
//           //TODO go_item ('crt_events.offender_id_display');
//           //TODO do_key ('list_values');
//     }

//     crtEventsKeyCrerecTrigger() {
//          const lvAlert;
//           //TODO lv_alert =
//           //TODO this.displayTheAlert('cfg_error','you cannot create records here.',null,null,null,null);
//     }

//     crtEventsKeyClrrecTrigger() {
//          //TODO  this.clearRecord();
//           //TODO go_block('off_sch');
//          //TODO  this.clearBlock();
//           //TODO go_block('crt_events');
//     }

//     crtEventsKeyExeqryTrigger() {
//           //TODO go_block ('off_sch');
//          //TODO  this.chkPackageFailure();
//          //TODO  this.executeQuery();
//     }

//     crtEventsOnErrorTrigger() {
// /* Trap errors returning from the server and report in a user
//    friendly manner*/
//          const errCode = errorCode;
//          const errType = errorType;
//          const serverErr = abs (dbmsErrorCode);
//          const serverMsg = dbmsErrorText;
//          const constraintName;
//          const vAlertNo;
//         if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
// /* Remove recursive errors from the top of the stack */
//         while (server_err = 604) {
//           //TODO cgte$pop_error_stack (server_err, server_msg);
//         }
//           //TODO 
// /* Check and report the generic constraint violations */
//         if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
//            throw new Error('form_trigger_failure');
//         }
//           //TODO 
// /* Check and report the constraint violations specific to this
//             block */
//           //TODO constraint_name = cgte$strip_constraint (server_msg);
//         }
//           //TODO 
//          //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
//         switch() {
//             case ( err_type = 'frm' and err_code = 40202)
//           //TODO v_alert_no =
//           //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things//     patrick 20/09/2005.  use replace instead of substr and instr.//     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.//     '*' character won't appear along with the prompt when mandatory value is not entered.replace(replace(get_item_property(system.trigger_item, prompt_text), '*', '')||substr(error_text, 6), chr(10), ' '),null,null,null,null);
//            throw new Error('form_trigger_failure');
//             case ( error_code = 40401 or -- no changes to save                error_code = 40405 or -- no changes to apply                error_code = 40352 or -- last record of the query retrieved                error_code = 40100 )  -- at first record
//         ;
//             case ( error_code = 41361 or -- cannot navigate out of the current form in enter-query mode.                error_code = 41351 or -- cannot navigate out of the current form.                error_code = 41047 or -- cannot navigate out of the current block in enter-query mode.                error_code = 40109 )  -- cannot navigate out of the current block in enter-query mode.
//           //TODO v_alert_no =
//           //TODO this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
//            throw new Error('form_trigger_failure');
//         } else {
//         if (! (serverErr >= 20000 &&  serverErr <= 20999) ){
// /* If error not found, issue default message */
//           //TODO v_alert_no =
//           //TODO this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
//         } else {
//          //-- @@@ GJC 23/05/2006, Added generic lock resource error
//         if (serverErr===20951 ){
//           //TODO v_alert_no =
//           //TODO this.displayTheAlertCfgError'error this resource is currently locked by another user.',null,null,null,null);
//         } else {
//          //TODO  this.showErrorForm();
//         }
//           //TODO 
//            throw new Error('form_trigger_failure');
//         }
//           //TODO 
//          //TODO  this.checkBlockErrors();
//           //TODO 
//     }
// }

//     offSchOnErrorTrigger() {
// /* Trap errors returning from the server and report in a user
//    friendly manner*/
//          const errCode = errorCode;
//          const errType = errorType;
//          const serverErr = abs (dbmsErrorCode);
//          const serverMsg = dbmsErrorText;
//          const constraintName;
//          const vAlertNo;
//         if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
// /* Remove recursive errors from the top of the stack */
//         while (server_err = 604) {
//           //TODO cgte$pop_error_stack (server_err, server_msg);
//         }
//           //TODO 
// /* Check and report the generic constraint violations */
//         if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
//            throw new Error('form_trigger_failure');
//         }
//           //TODO 
// /* Check and report the constraint violations specific to this
//             block */
//           //TODO constraint_name = cgte$strip_constraint (server_msg);
//         }
//           //TODO 
//          //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
//         switch() {
//             case ( err_type = 'frm' and err_code = 40202)
//           //TODO v_alert_no =
//           //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things//     patrick 20/09/2005.  use replace instead of substr and instr.//     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.//     '*' character won't appear along with the prompt when mandatory value is not entered.replace(replace(get_item_property(system.trigger_item, prompt_text), '*', '')||substr(error_text, 6), chr(10), ' '),null,null,null,null);
//            throw new Error('form_trigger_failure');
//             case ( error_code = 40401 or -- no changes to save                error_code = 40405 or -- no changes to apply                error_code = 40352 or -- last record of the query retrieved                error_code = 40100 )  -- at first record
//         ;
//             case ( error_code = 41361 or -- cannot navigate out of the current form in enter-query mode.                error_code = 41351 or -- cannot navigate out of the current form.                error_code = 41047 or -- cannot navigate out of the current block in enter-query mode.                error_code = 40109 )  -- cannot navigate out of the current block in enter-query mode.
//           //TODO v_alert_no =
//           //TODO this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
//            throw new Error('form_trigger_failure');
//         } else {
//         if (! (serverErr >= 20000 &&  serverErr <= 20999) ){
// /* If error not found, issue default message */
//           //TODO v_alert_no =
//           //TODO this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
//         } else {
//          //-- @@@ GJC 23/05/2006, Added generic lock resource error
//         if (serverErr===20951 ){
//           //TODO v_alert_no =
//           //TODO this.displayTheAlertCfgError'error this resource is currently locked by another user.',null,null,null,null);
//         } else {
//          //TODO  this.showErrorForm();
//         }
//           //TODO 
//            throw new Error('form_trigger_failure');
//         }
//           //TODO 
//          //TODO  this.checkBlockErrors();
//           //TODO 
//     }

//     butOffendersWhenButtonPressedTrigger() {
//           //TODO 
//     }

//     butOffendersKeyNextItemTrigger() {
//           //TODO 
//     }

//     butOffendersKeyPrevItemTrigger() {
//           //TODO 
//     }

//     butWorksWhenButtonPressedTrigger() {
//           //TODO 
//     }

//     butWorksKeyNextItemTrigger() {
//           //TODO 
//     }

//     butWorksKeyPrevItemTrigger() {
//           //TODO 
//     }

//     butCalendarWhenButtonPressedTrigger() {
//           //TODO 
//     }

//     butCalendarKeyNextItemTrigger() {
//           //TODO 
//     }

//     butCalendarKeyPrevItemTrigger() {
//           //TODO 
//     }

//     butOffUpdatesWhenButtonPressedTrigger() {
//           //TODO 
//     }

//     butOffUpdatesKeyNextItemTrigger() {
//           //TODO
//     }

//     butOffUpdatesKeyPrevItemTrigger() {
//           //TODO
//     }

//     butDetailWhenButtonPressedTrigger() {
//           //TODO
//     }

//     butDetailKeyNextItemTrigger() {
//           //TODO
//     }

//     butDetailKeyPrevItemTrigger() {
//           //TODO
//     }

//     mymenuOnErrorTrigger() {
//           //TODO
//     }

//     oiicmociI___itemTrigger() {
//         ;
//     }

//     oiicmociKeyListvalTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_item_h.key_listval;    // application hook
//           //TODO
//          //TODO  this.listValues();
//           //TODO
//           //TODO next_item ;
//     }

//     oiicmociWhenButtonPressedTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_item_h.when_button_pressed;    // application hook
//     }

//     oiicmociI_navigateTrigger() {
//         ;
//     }

//     oiicmociKeyExitTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_navigate_h.key_exit;    // application hook
//           //TODO
//          //TODO  this.exitForm();
//           //TODO
//          //-- new code from triggeradd --
//          //--
//          //-- @@@ Vipul on 28-SEP-2001 : Tracking# 8862 : Added call to procedure
//          //--     in application library to handle coordination of menu and forms
//          //--
//          //TODO  this.undoPostFormInit();
//           //TODO
//          //-- end new code --
//     }

//     oiicmociKeyNxtblkTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_navigate_h.key_nxtblk;    // application hook
//           //TODO
//          //TODO  this.nextBlock();
//     }

//     oiicmociKeyPrvblkTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_navigate_h.key_prvblk;    // application hook
//           //TODO
//          //TODO  this.previousBlock();
//     }

//     oiicmociPostFormTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_navigate_h.post_form;    // application hook
//     }

//     oiicmociPreBlockTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_navigate_h.pre_block;    // application hook
//     }

//     oiicmociPreFormTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_navigate_h.pre_form;    // application hook
//           //TODO
//           //TODO set_item_property('crt_events.offender_id_display',hint_text,get_item_property('crt_events.offender_id_display', hint_text)
//           //TODO || get_profile_value('label','off_id_code'));
//           //TODO set_item_property('crt_events.offender_id_display', prompt_text, get_profile_value('label', 'off_id_code'));
//           //TODO
//           //TODO set_item_property('off_sch.offender_id_display',hint_text,get_item_property('off_sch.offender_id_display', hint_text)
//           //TODO || get_profile_value('label','off_id_code'));
//           //TODO set_item_property('off_sch.offender_id_display', prompt_text, get_profile_value('label', 'off_id_code'));
//     }

//     oiicmociWhenNewRecordInstanceTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_navigate_h.when_new_rec_instance;    // application hook
//     }

//     oiicmociWhenNewFormInstanceTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//          //TODO  this.createLibraryGlobals();
//           //TODO
//          //TODO  this.createApplibGlobals();
//           //TODO applib_navigate_h.w_new_form_instance;    // application hook
//           //TODO
//           //TODO set_item_property('crt_events.agy_loc_id_name', prompt_text, get_profile_value('label','inst_agency')||'*');
//           //TODO set_lov_property('lov_agy_loc_id',title,get_profile_value('label','inst_agency')||' '||'( maint= ''oumagloc'')');
//           //TODO set_lov_column_property('lov_agy_loc_id',1, title, get_profile_value('label','inst_agency'));
//           //TODO
//          //--SET_ITEM_PROPERTY('OFF_SCH.AGY_LOC_ID_NAME', PROMPT_TEXT, GET_PROFILE_VALUE('LABEL','INST_AGENCY') || '*');
//           //TODO set_item_property('off_sch.last_name', prompt_text, get_profile_value('label','name_last'));
//           //TODO set_item_property('off_sch.first_name', prompt_text, get_profile_value('label','name_given_1'));
//           //TODO set_item_property('off_sch.offender_agy_loc_desc', prompt_text, get_profile_value('label','inst_agency'));
//           //TODO
//           //TODO lv_default_agy_loc_id        agency_locations.agy_loc_id%type;
//           //TODO lv_default_agy_loc_id_desc   agency_locations.description%type;
//           //TODO copy (to_char (sysdate, 'dd-mon-yyyy'), 'crt_events.event_date');
//           //TODO tag_establishment.default_agency (global.caseload_id,
//           //TODO lv_default_agy_loc_id,
//          //TODO  this.lvDefaultAgyLocIdDesc();
//           //TODO );
//           //TODO crt_events.agy_loc_id = lv_default_agy_loc_id;
//           //TODO crt_events.agy_loc_id_name = lv_default_agy_loc_id_desc;
//     }

//     oiicmociWhenNewBlockInstanceTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_navigate_h.w_new_block_instance;    // application hook
//     }

//     oiicmociWhenNewItemInstanceTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_navigate_h.w_new_item_instance;    // application hook
//     }

//     oiicmociI____queryTrigger() {
//         ;
//     }

//     oiicmociKeyEntqryTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_query_h.key_entqry;    // application hook
//         if (systemModel.triggerBlock==='crtEvents' ){
//         ;
//         } else {
//          //TODO  this.enterQuery();
//         }
//     }

//     oiicmociKeyExeqryTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_query_h.key_exeqry;    // application hook
//           //TODO
//          //TODO  this.executeQuery();
//     }

//     oiicmociPostQueryTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_query_h.post_query;    // application hook
//     }

//     oiicmociPreQueryTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_query_h.pre_query;    // application hook
//     }

//     oiicmociITransactionalTrigger() {
//         ;
//     }

//     oiicmociKeyCommitTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_transactional_h.key_commit;    // application hook
//           //TODO
//          //TODO  this.commit();
//     }

//     oiicmociOnInsertTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_transactional_h.on_insert;    // application hook
//           //TODO
//          //TODO  this.insertRecord();
//           //TODO
//          //-- @@@ Venu 07/Apr/2005, In CGTE$CHECK_CONSTRAINT_VIO program unit we check for Primary Key/Unique Key or Check constraint
//          //--                       violations, if any such violation occurs when user tries to commit a record then it should
//          //--                       RAISE FORM_TRIGGER_FAILURE before continuing further but it displays 'Transaction complete....'
//          //--                       message and as well as 'Row already exists with....', fixed it by following call.
//          //TODO  this.chkPackageFailure();
//     }

//     oiicmociOnUpdateTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_transactional_h.on_update;    // application hook
//           //TODO
//          //TODO  this.updateRecord();
//           //TODO
//          //-- @@@ Venu 07/Apr/2005, In CGTE$CHECK_CONSTRAINT_VIO program unit we check for Primary Key/Unique Key or Check constraint
//          //--                       violations, if any such violation occurs when user tries to commit a record then it should
//          //--                       RAISE FORM_TRIGGER_FAILURE before continuing further but it displays 'Transaction complete....'
//          //--                       message and as well as 'Row already exists with....', fixed it by following call.
//          //TODO  this.chkPackageFailure();
//     }

//     oiicmociPreInsertTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_transactional_h.pre_insert;    // application hook
//     }

//     oiicmociPreUpdateTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_transactional_h.pre_update;    // application hook
//     }

//     oiicmociIValidationTrigger() {
//         ;
//     }

//     oiicmociOnErrorTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_validation_h.on_error;    // application hook
//     }

//     oiicmociWhenValidateItemTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_validation_h.when_validate_item;    // application hook
//     }

//     oiicmociWhenValidateRecordTrigger() {
//          //-- ---------------------------------------------
//          //--         Application Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_validation_h.when_validate_record;    // application hook
//     }

//     oiicmociI__variousTrigger() {
//         ;
//     }

//     oiicmociKeyHelpTrigger() {
//          //-- ---------------------------------------------
//          //--         Event Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_various_h.key_help;    // application hook
//     }

//     oiicmociOnMessageTrigger() {
//          //-- ---------------------------------------------
//          //--         Event Hooks
//          //-- ---------------------------------------------
//          //-- @@@ Venu 26-April-2005, Not required.
//          //-- APPLIB_Various_H.On_Message;    -- application hook
//           //TODO
//          const vAlertNo;
//         if (messageCode===40400 ){
//           //TODO set_alert_property ('cfg_information', alert_message_text,
//           //TODO message_text);
//           //TODO v_alert_no = show_alert ('cfg_information');
//         } else {
//           //TODO v_alert_no =
//           //TODO this.displayTheAlertCfgErrormessage_type|| '-'|| to_char (message_code)|| ' '|| message_text,null,null,null,null);
//         }
//     }

//     oiicmociI__windowTrigger() {
//         ;
//     }

//     oiicmociWhenWindowActivatedTrigger() {
//          //-- ---------------------------------------------
//          //--         Event Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_window_h.when_window_activated;    // application hook
//     }

//     oiicmociWhenWindowClosedTrigger() {
//          //-- ---------------------------------------------
//          //--         Event Hooks
//          //-- ---------------------------------------------
//           //TODO
//           //TODO applib_window_h.when_window_closed;    // application hook
//     }

//     oiicmociPreTextItemTrigger() {
//           //TODO applib_navigate_h.pre_text_item;    // application hook
//     }

//     oiicmociPostTextItemTrigger() {
//           //TODO applib_navigate_h.post_text_item;    // application hook
//     }
show(vldmsg, type?) {
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
}
namesrchExecuteQuery() {
    if (this.crteventsModel.offenderIdDisplay && String(this.crteventsModel.offenderIdDisplay).trim() !== '') {
    // for (let i = String(this.crteventsModel.offenderIdDisplay).length; i < 10; i++) {
    //     this.crteventsModel.offenderIdDisplay = '0' + this.crteventsModel.offenderIdDisplay;
    // }
    this.namesrchModel.offenderIdDisplay = this.crteventsModel.offenderIdDisplay;
    const nameSearch = this.oiinamesFactory.
    namesrchExecuteQuery(this.namesrchModel);
    nameSearch.subscribe(data => {
        if (data.length > 0 && data[0].activeFlag === 'Y') {
            this.crteventsModel.offenderIdDisplay = data[0].offenderIdDisplay;
            this.offenderName = data[0].lastName + ' , ' + data[0].firstName;
            this.invalidId = false;
        } else {
          this.inactiveOffender();
          this.offenderName = '';
        }
    });
} else {
    this.offenderName = '';
}
}

// ngOnDestroy() {
//     if (this.router.url === '/OIINAMES') {
//         this.oiinamesFactory.routUrl = this.routUrl;
//         this.oiicmociFactory.crteventsModel = this.crteventsModel;
//         this.oiicmociFactory.offschData = this.offschData;
//     }
// }

openGo() {
    this.ocinamesFactory.oiiflag = true;
    this.dialogService.openLinkDialog('/oiinamesdialog', event, 80).subscribe(result => {
       if (result && result.offenderFirstName && result.offenderLastName) {
       this.offenderName= result.offenderLastName + ',' + result.offenderFirstName;
       }
       this.crteventsModel.offenderIdDisplay = result.offenderIdDisplay;
    });
 }

}
