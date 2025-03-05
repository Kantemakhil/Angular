import {
    Component, OnInit, ViewChild
} from '@angular/core';
// 
// import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OiiiscouService } from '../service/oiiiscou.service';
import { VPrisonTotal } from '@inst/casemanagement/beans/VPrisonTotal';
import { UserSessionManager } from '@core/classes/userSessionManager';
// import { VPrisonStatusCount } from '@commonbeans/VPrisonStatusCount';
// import { VPrisonTotal } from '@commonbeans/VPrisonTotal';
// import required bean declarations

@Component({
    selector: 'app-oiiiscou',
    templateUrl: './oiiiscou.component.html',
    styleUrls: []
})

export class OiiiscouComponent implements OnInit {
    // Variable declaration
    // actionName : string;
    // lovModel : any[];
    msgs: any[] = [];
    @ViewChild('grid') grid: any;
    // nameOfLovPage : string;
    // listToCompare : any[] = [];
    vprisnctData: any[] = []; // VPrisonStatusCount [] = [];
    // vprisnctDataTemp : VPrisonStatusCount[] = [];
    // // TODOangular.copy(this.vprisnctData, thisvprisnctDataTemp);
    // vprisnctModel : VPrisonStatusCount = new VPrisonStatusCount();
    // vprisnctIndex : number = 0;
    // vprisnctInsertList : VPrisonStatusCount[] = [];
    // vprisnctUpdatetList : VPrisonStatusCount[] = [];
    // vprisnctDeleteList : VPrisonStatusCount[] = [];
    vprisntotData: VPrisonTotal[] = [];
    // vprisntotDataTemp : VPrisonTotal[] = [];
    // // TODOangular.copy(this.vprisntotData, thisvprisntotDataTemp);
    vprisntotModel: VPrisonTotal = new VPrisonTotal();
    // vprisntotIndex : number = 0;
    // vprisntotInsertList : VPrisonTotal[] = [];
    // vprisntotUpdatetList : VPrisonTotal[] = [];
    // vprisntotDeleteList : VPrisonTotal[] = [];
    // minDate : date;
    // display : boolean;
    // errorMessage : string;
    // headerMessage : string;
    // disabled : boolean;
    // editable : boolean = true;
    vPrisnCtColumnDef: any[];
    // agyLocReadOnly : boolean = false;
    // vPrisnCtReadOnly : boolean = false;
    // vPrisnTotReadOnly : boolean = false;
    // titleBlockReadOnly : boolean = false;
    // cgfkAgylocagylocidRg : any[] = [];
    facilityUrl = 'None';
    facility: string;
    other: any;
    pinnedBottomRowData: any[] = [];
    message: string;
    type: string;
    constructor(private oiiiscouFactory: OiiiscouService,
        private translateService: TranslateService,
        private sessionManager: UserSessionManager, ) {
        // TODOinitilize data members here..!
        this.vPrisnCtColumnDef = [];
        // onGridReady(event){
        // }
    }
    ngOnInit() {
        this.facilityUrl = 'oiiiscou/cgfkAgyLocAgyLocIdRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.vPrisnCtColumnDef = [
            { fieldName: this.trMsg('oiiiscou.imprisonment'), field: 'imprisonmentStatus', datatype: 'lov',
            link: 'oiiiscou/CgfdgetVPrisnCtDrvImpris', editable: false, width: 150 },
            { fieldName: this.trMsg('oiiiscou.males'), field: 'maleCount', editable: false, width: 150, datatype: 'number' },
            { fieldName: this.trMsg('oiiiscou.females'), field: 'femaleCount', editable: false, width: 150, datatype: 'number' },
            { fieldName: this.trMsg('oiiiscou.other'), field: 'other', editable: false, width: 150, datatype: 'number' },
            { fieldName: this.trMsg('oiiiscou.total'), field: 'totalCount', editable: false, width: 150, datatype: 'number' },
            { fieldName: this.trMsg('oiiiscou.percent'), field: 'percent', editable: false, width: 150, datatype: 'number' },
        ];
        // TODOall initializations here
        //     var serviceObj;
        // const cgfkAgylocagylocidServiceObj = this.oiiiscouFactory.
        //                     oiiiscoucgfkAgylocagylocidRecordGroup();
        // cgfkAgylocagylocidServiceObj.subscribe(cgfkAgylocagylocidList=> {
        //         if (cgfkAgylocagylocidlist.length === 0) {
        //              this.cgfkAgylocagylocidRg = [];
        //          } else {
        //         for (let i = 0; i < cgfkAgylocagylocidlist.length; i++) {
        //         this.cgfkAgylocagylocidRg.push({ 'text':cgfkAgylocagylocidlist[i].code + " - "+ 
        //                         cgfkAgylocagylocidlist[i].description, 'id': cgfkAgylocagylocidlist[i].code });
        //     }
        //     }
        // });
    }
    allowNumbers(event) {
    }
    onRowClickvprisnct(event) {
    }
    ok() {
        if (!this.facility) {
            this.show('oiiiscou.pleaseselect');
            return;
        } else {
            this.onFacilityChange();
        }
    }
    no() {
        this.facility = this.facility === undefined ? '' : undefined;
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }

    onFacilityChange() {
        if (this.facility) {
            this.vprisnctExecuteQuery(this.facility);
            this.vprisntotExecuteQuery(this.facility);
        } else {
            this.vprisnctData = [];

            this.vprisntotData = [];
            this.vprisntotModel = new VPrisonTotal();
            this.other = undefined;
            this.pinnedBottomRowData = [];
        }
    }

    vprisnctExecuteQuery(agyLocId: string) {
        const vprisnctResult = this.oiiiscouFactory.
            vPrisnCtExecuteQuery(agyLocId);
        vprisnctResult.subscribe(vprisnctResultList => {
            if (vprisnctResultList.length === 0) {
                this.message = this.translateService.translate('common.querycaused');
                    this.type = 'warn';
                    this.show(this.message, this.type);
                this.vprisnctData = [];
            } else {
                this.vprisnctData = vprisnctResultList;
            }
        });
    }
    vprisntotExecuteQuery(agyLocId: string) {
        const vprisntotResult = this.oiiiscouFactory.
            vPrisnTotExecuteQuery(agyLocId);
        vprisntotResult.subscribe(vprisntotResultList => {
            if (vprisntotResultList.length === 0) {
                this.message = this.translateService.translate('common.querycaused');
                this.type = 'warn';
                this.show(this.message, this.type);
                this.vprisntotData = [];
                this.pinnedBottomRowData = [];
                this.vprisntotModel = new VPrisonTotal();
                this.other = undefined;
            } else {
                this.vprisntotData = vprisntotResultList;
                this.vprisntotModel = vprisntotResultList[0];
                this.other = this.vprisntotModel.totalCount - this.vprisntotModel.maleCount - this.vprisntotModel.femaleCount;
                // this.grid.setColumnHeader('imprisonmentStatus', this.trMsg('oiiiscou.imprisonment')
                // + '<br/> Total ' ) ;
                // this.grid.setColumnHeader('maleCount', this.trMsg('oiiiscou.males')
                // + '<br/>' + this.vprisntotModel.maleCount ) ;
                // this.grid.setColumnHeader('femaleCount', this.trMsg('oiiiscou.females') + ' <br/>' + this.vprisntotModel.femaleCount
                //  ) ;
                // this.grid.setColumnHeader('other', this.trMsg('oiiiscou.other') + ' <br/> ' + this.other ) ;
                // this.grid.setColumnHeader('totalCount', this.trMsg('oiiiscou.totals') + ' <br/> ' + this.vprisntotModel.totalCount
                //  ) ;

                 const pinnedData = [];
                 const tot = 'TOT';
                 const total = {'imprisonmentStatus': tot, 'maleCount': this.vprisntotModel.maleCount,
                                'femaleCount': this.vprisntotModel.femaleCount, 'other': this.other,
                                 'totalCount': this.vprisntotModel.totalCount};
                 pinnedData.push(total);
                 this.pinnedBottomRowData = pinnedData;
            }
        });
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
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

    butDespWhenButtonPressedTrigger() {
        // TODOgo_item('agy_loc.dsp_description');
        // TODOdo_key('list_values');
        // if (agyLocModel.agyLocId !== null  ){
        // TODOdo_key('execute_query'); // @@@ rose, 07-jan-2008, #4536 @@@ //
        // }
    }

    agyLocOnErrorTrigger() {
        // TODO
    }

    vPrisnCtOnErrorTrigger() {
        // TODO
    }

    vPrisnCtPostQueryTrigger() {
        /* CGFD$DERIVE_NBT_ON_QUERY */
        /* This calls user trigger(s) to derive the values of any non-table */
        /* items in the block whose values depend on the base table items   */
        /* just queried.                                                    */
        // TODO
        // TODO
        // TODOthis.cgfdGetVPrisnCtDrvImpris(v_prisn_ct.drv_imprisonment_status,v_prisn_ct.imprisonment_status    );
        // TODO
        // TODOthis.cgfdGetVPrisnCtDrvFemale(v_prisn_ct.drv_female_count    /* mod item being derived       */,v_prisn_ct.total_count         /* in  item value               */,v_prisn_ct.male_count          /* in  item value               */,v_prisn_ct.female_count    );  /* in  item value               */
    }

    vPrisnTotOnErrorTrigger() {
        // TODO
    }

    vPrisnTotPostQueryTrigger() {
        /* CGFD$DERIVE_NBT_ON_QUERY */
        /* This calls user trigger(s) to derive the values of any non-table */
        /* items in the block whose values depend on the base table items   */
        /* just queried.                                                    */
        // TODOthis.cgfdGetVPrisnTotDrvFemal(v_prisn_tot.drv_female_count    /* mod item being derived      */,v_prisn_tot.total_count         /* in  item value              */,v_prisn_tot.male_count          /* in  item value              */,v_prisn_tot.female_count    );  /* in  item value              */
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

    oiiiscouIKillCreateTrigger() {
        ;
    }

    oiiiscouKeyClrblkTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibKillCreateHModel.keyClrblk1 ){
        // TODOapplib_kill_create_h.key_clrblk;    // application hook
        // }
        // if (! modlibKillCreateHModel.keyClrblk2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
        // TODO
        /* CGBS$KEY_CLRBLK_FRM */
        /* Perform checks prior to clearing block */
        // if (( cgbs2$Model.isRecordDirty(systemModel.triggerBlock) ) ){
        //  throw new Error('form_trigger_failure');
        // }
        // if ((systemModel.blockStatus==='changed' ||  cgbs2$Model.isCommitNeeded( systemModel.triggerBlock ) ) ){
        // TODO this.cgbs2$.doCommitDialogue();
        // }
        // TODOclear_block( no_validate );
    }

    oiiiscouKeyClrfrmTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibKillCreateHModel.keyClrfrm1 ){
        // TODOapplib_kill_create_h.key_clrfrm;    // application hook
        // }
        // if (! modlibKillCreateHModel.keyClrfrm2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
        // TODO
        /* CGGN$KEY_CLRFRM */
        /* Perform the key's standard functionality */
        // TODO this.clearForm();
        // if (systemModel.formStatus==='changed' ){
        //  throw new Error('form_trigger_failure');
        // }
    }

    oiiiscouKeyClrrecTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibKillCreateHModel.keyClrrec1 ){
        // TODOapplib_kill_create_h.key_clrrec;    // application hook
        // }
        // if (! modlibKillCreateHModel.keyClrrec2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyCrerecTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibKillCreateHModel.keyCrerec1 ){
        // TODOapplib_kill_create_h.key_crerec;    // application hook
        // }
        // if (! modlibKillCreateHModel.keyCrerec2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyDuprecTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibKillCreateHModel.keyDuprec1 ){
        // TODOapplib_kill_create_h.key_duprec;    // application hook
        // }
        // if (! modlibKillCreateHModel.keyDuprec2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyDupItemTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibKillCreateHModel.keyDupItem1 ){
        // TODOapplib_kill_create_h.key_dup_item;    // application hook
        // }
        // if (! modlibKillCreateHModel.keyDupItem2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenClearBlockTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibKillCreateHModel.whenClearBlock1 ){
        // TODOapplib_kill_create_h.when_clear_block;    // application hook
        // }
        // if (! modlibKillCreateHModel.whenClearBlock2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenCreateRecordTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibKillCreateHModel.whenCreateRecord1 ){
        // TODOapplib_kill_create_h.when_create_record;    // application hook
        // }
        // if (! modlibKillCreateHModel.whenCreateRecord2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenRemoveRecordTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibKillCreateHModel.whenRemoveRecord1 ){
        // TODOapplib_kill_create_h.when_remove_record;    // application hook
        // }
        // if (! modlibKillCreateHModel.whenRemoveRecord2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouI___itemTrigger() {
        // ;
    }

    oiiiscouKeyEditTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.keyEdit1 ){
        // TODOapplib_item_h.key_edit;    // application hook
        // }
        // if (! modlibItemHModel.keyEdit2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyListvalTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.keyListval1 ){
        // TODOapplib_item_h.key_listval;    // application hook
        // }
        // if (! modlibItemHModel.keyListval2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostChangeTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.postChange1 ){
        // TODOapplib_item_h.post_change;    // application hook
        // }
        // if (! modlibItemHModel.postChange2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenButtonPressedTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.whenButtonPressed1 ){
        // TODOapplib_item_h.when_button_pressed;    // application hook
        // }
        // if (! modlibItemHModel.whenButtonPressed2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenCheckboxChangedTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.whenCheckboxChanged1 ){
        // TODOapplib_item_h.when_checkbox_changed;    // application hook
        // }
        // if (! modlibItemHModel.whenCheckboxChanged2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenCustomItemEventTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.wCustomItemEvent1 ){
        // TODOapplib_item_h.w_custom_item_event;    // application hook
        // }
        // if (! modlibItemHModel.wCustomItemEvent2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenImageActivatedTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.whenImageActivated1 ){
        // TODOapplib_item_h.when_image_activated;    // application hook
        // }
        // if (! modlibItemHModel.whenImageActivated2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenImagePressedTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.whenImagePressed1 ){
        // TODOapplib_item_h.when_image_pressed;    // application hook
        // }
        // if (! modlibItemHModel.whenImagePressed2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenListActivatedTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.whenListActivated1 ){
        // TODOapplib_item_h.when_list_activated;    // application hook
        // }
        // if (! modlibItemHModel.whenListActivated2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenListChangedTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.whenListChanged1 ){
        // TODOapplib_item_h.when_list_changed;    // application hook
        // }
        // if (! modlibItemHModel.whenListChanged2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenRadioChangedTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibItemHModel.whenRadioChanged1 ){
        // TODOapplib_item_h.when_radio_changed;    // application hook
        // }
        // if (! modlibItemHModel.whenRadioChanged2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouI__mouseTrigger() {
        // ;
    }

    oiiiscouWhenMouseClickTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibMouseHModel.whenMouseClick1 ){
        // TODOapplib_mouse_h.when_mouse_click;    // application hook
        // }
        // if (! modlibMouseHModel.whenMouseClick2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenMouseDoubleclickTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        //     if (modlibMouseHModel.whenMouseDoubClick1 ){
        // TODOapplib_mouse_h.when_mouse_doub_click;    // application hook
        // }
        // if (! modlibMouseHModel.whenMouseDoubClick2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenMouseEnterTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibMouseHModel.whenMouseEnter1 ){
        // TODOapplib_mouse_h.when_mouse_enter;    // application hook
        // }
        // if (! modlibMouseHModel.whenMouseEnter2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenMouseLeaveTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibMouseHModel.whenMouseLeave1 ){
        // TODOapplib_mouse_h.when_mouse_leave;    // application hook
        // }
        // if (! modlibMouseHModel.whenMouseLeave2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouI_navigateTrigger() {
        // ;
    }

    oiiiscouKeyDownTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyDown1 ){
        // TODOapplib_navigate_h.key_down;    // application hook
        // }
        // if (! modlibNavigateHModel.keyDown2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyExitTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyExit1 ){
        // TODOapplib_navigate_h.key_exit;    // application hook
        // }
        // if (! modlibNavigateHModel.keyExit2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
        // TODO
        // -- new code from triggeradd --
        // --
        // -- @@@ Vipul on 28-SEP-2001 : Tracking# 8862 : Added call to procedure
        // --     in application library to handle coordination of menu and forms
        // --
        // TODO this.undoPostFormInit();
        // TODO
        // -- end new code --
    }

    oiiiscouKeyNxtblkTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyNxtblk1 ){
        // TODOapplib_navigate_h.key_nxtblk;    // application hook
        // }
        // if (! modlibNavigateHModel.keyNxtblk2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyNxtkeyTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyNxtkey1 ){
        // TODOapplib_navigate_h.key_nxtkey;    // application hook
        // }
        // if (! modlibNavigateHModel.keyNxtkey2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
        // TODO
        /* CGBS$DISABLE_NXTKEY */
        /* Disable KEY-NXTKEY for the whole form */
        // TODOmessage('error key not valid in this context');
        //  throw new Error('form_trigger_failure');
    }

    oiiiscouKeyNxtrecTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyNxtrec1 ){
        // TODOapplib_navigate_h.key_nxtrec;    // application hook
        // }
        // if (! modlibNavigateHModel.keyNxtrec2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyNxtsetTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyNxtset1 ){
        // TODOapplib_navigate_h.key_nxtset;    // application hook
        // }
        // if (! modlibNavigateHModel.keyNxtset2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyNextItemTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyNextItem1 ){
        // TODOapplib_navigate_h.key_next_item;    // application hook
        // }
        // if (! modlibNavigateHModel.keyNextItem2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyPrvblkTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyPrvblk1 ){
        // TODOapplib_navigate_h.key_prvblk;    // application hook
        // }
        // if (! modlibNavigateHModel.keyPrvblk2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyPrvrecTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyPrvrec1 ){
        // TODOapplib_navigate_h.key_prvrec;    // application hook
        // }
        // if (! modlibNavigateHModel.keyPrvrec2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyPrevItemTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyPrevItem1 ){
        // TODOapplib_navigate_h.key_prev_item;    // application hook
        // }
        // if (! modlibNavigateHModel.keyPrevItem2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyScrdownTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyScrdown1 ){
        // TODOapplib_navigate_h.key_scrdown;    // application hook
        // }
        // if (! modlibNavigateHModel.keyScrdown2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyScrupTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyScrdown1 ){
        // TODOapplib_navigate_h.key_scrup;    // application hook
        // }
        // if (! modlibNavigateHModel.keyScrup2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyUpTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.keyUp1 ){
        // TODOapplib_navigate_h.key_scrup;    // application hook
        // }
        // if (! modlibNavigateHModel.keyUp2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostBlockTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.postBlock1 ){
        // TODOapplib_navigate_h.post_block;    // application hook
        // }
        // if (! modlibNavigateHModel.postBlock2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostFormTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.postForm1 ){
        // TODOapplib_navigate_h.post_form;    // application hook
        // }
        // if (! modlibNavigateHModel.postForm2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostRecordTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.postRecord1 ){
        // TODOapplib_navigate_h.post_record;    // application hook
        // }
        // if (! modlibNavigateHModel.postRecord2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostTextItemTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.postTextItem1 ){
        // TODOapplib_navigate_h.post_text_item;    // application hook
        // }
        // if (! modlibNavigateHModel.postTextItem2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPreBlockTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.preBlock1 ){
        // TODOapplib_navigate_h.pre_block;    // application hook
        // }
        // if (! modlibNavigateHModel.preBlock2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPreFormTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODOlv_label  system_profiles.profile_value%type;
        //  const lvLength;
        // TODO
        // TODO
        // if (modlibNavigateHModel.preForm1 ){
        // TODOapplib_navigate_h.pre_form;    // application hook
        // }
        // if (! modlibNavigateHModel.preForm2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
        // TODOset_item_property('agy_loc.dsp_description',prompt_text,get_profile_value('label','inst_agency')||'*');
        // --SET_LOV_PROPERTY('CGFK$AGY_LOC_AGY_LOC_ID',TITLE,GET_PROFILE_VALUE('LABEL','INST_AGENCY')||' '||'( (Type: INST))'); -- Commented by Manjul, Issue# 471
        // TODOset_lov_property('cgfk$agy_loc_agy_loc_id',title,get_profile_value('label','inst_agency')||' '||'(maint=''oumagloc'')'); // added by manjul, issue# 471
        // TODOset_lov_column_property('cgfk$agy_loc_agy_loc_id',1,title,get_profile_value('label','inst_agency'));   // added by manjul, issue# 471
        // TODO
        // -- @@@ Steve, HPQC#19289, Added here so user does not see the label change when entering the form
        // TODOlv_label = get_profile_value('label','yth_status');
        // TODO
        // if (lvLabel = null ){
        // TODOtitle_block.off_title = 'imprisonment status';
        // TODOset_item_property('title_block.off_title', width, 1.79);
        // } else {
        // TODOtitle_block.off_title = lv_label;
        // TODOlv_length = nvl(get_profile_value_2('label','yth_status'),2);
        // TODOset_item_property('title_block.off_title', width, lv_length);
        // }
        // TODO
        // TODOset_item_property('v_prisn_ct.drv_imprisonment_status',prompt_text, get_profile_value('label','yth_impris'));
        // TODO
        // -- @@@ Steve, HPQC#19289, end of changes
        // TODO
    }

    oiiiscouPreRecordTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.preRecord1 ){
        // TODOapplib_navigate_h.pre_record;    // application hook
        // }
        // if (! modlibNavigateHModel.preRecord2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPreTextItemTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.preTextItem1 ){
        // TODOapplib_navigate_h.pre_text_item;    // application hook
        // }
        // if (! modlibNavigateHModel.preTextItem2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenNewRecordInstanceTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.whenNewRecInstance1 ){
        // TODOapplib_navigate_h.when_new_rec_instance;    // application hook
        // }
        // if (! modlibNavigateHModel.whenNewRecInstance2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenNewFormInstanceTrigger() {
        // TODO this.createFormGlobals();
        // TODO this.createLibraryGlobals();
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.wNewFormInstance1 ){
        // TODOapplib_navigate_h.w_new_form_instance;    // application hook
        // }
        // if (! modlibNavigateHModel.wNewFormInstance2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenNewBlockInstanceTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.wNewBlockInstance1 ){
        // TODOapplib_navigate_h.w_new_block_instance;    // application hook
        // }
        // if (! modlibNavigateHModel.wNewBlockInstance2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenNewItemInstanceTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibNavigateHModel.wNewItemInstance1 ){
        // TODOapplib_navigate_h.w_new_item_instance;    // application hook
        // }
        // if (! modlibNavigateHModel.wNewItemInstance2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouI____queryTrigger() {
        // ;
    }

    oiiiscouKeyCqueryTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibQueryHModel.keyCquery1 ){
        // TODOapplib_query_h.key_cquery;    // application hook
        // }
        // if (! modlibQueryHModel.keyCquery2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
        // TODO
        /* CGBS$KEY_CQUERY_FRM */
        /* Check if query is allowed to avoid unnecessary coordination */
        // if ((getBlockProperty( systemModel.triggerBlock, queryAllowed)==='false') ){
        // TODOmessage('error query not allowed in this block');
        //  throw new Error('form_trigger_failure');
        // }
        // TODOcgbs$.do_keyqry( system.trigger_block, 'count_query', system.mode);
    }

    oiiiscouKeyEntqryTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibQueryHModel.keyEntqry1 ){
        // TODOapplib_query_h.key_entqry;    // application hook
        // }
        // if (! modlibQueryHModel.keyEntqry2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
        // TODO
        /* CGBS$KEY_ENTQRY_FRM */
        /* Check if query is allowed to avoid unnecessary coordination */
        // if ((getBlockProperty( systemModel.triggerBlock, queryAllowed)==='false') ){
        // TODOmessage('error query not allowed in this block');
        //  throw new Error('form_trigger_failure');
        // }
        // TODOcgbs$.do_keyqry( system.trigger_block, 'enter_query', system.mode);
    }

    oiiiscouKeyExeqryTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibQueryHModel.keyExeqry1 ){
        // TODOapplib_query_h.key_exeqry;    // application hook
        // }
        // if (! modlibQueryHModel.keyExeqry2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
        // TODO
        /* CGBS$KEY_EXEQRY_FRM */
        /* Check if query is allowed to avoid unnecessary coordination */
        /*BEGIN
            IF (get_block_property( :SYSTEM.TRIGGER_BLOCK, QUERY_ALLOWED) =
                    'FALSE') THEN
                message('Error: Query not allowed in this block');
                RAISE FORM_TRIGGER_FAILURE;
            END IF;
            CGBS$.DO_KEYQRY( :SYSTEM.TRIGGER_BLOCK, 'EXECUTE_QUERY', :SYSTEM.MODE);
        END;
        */
    }

    oiiiscouOnCountTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibQueryHModel.onCount1 ){
        // TODOapplib_query_h.on_count;    // application hook
        // }
        // if (! modlibQueryHModel.onCount2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostQueryTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibQueryHModel.postQuery1 ){
        // TODOapplib_query_h.post_query;    // application hook
        // }
        // if (! modlibQueryHModel.postQuery2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPreQueryTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibQueryHModel.preQuery1 ){
        // TODOapplib_query_h.pre_query;    // application hook
        // }
        // if (! modlibQueryHModel.preQuery2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouI__relationTrigger() {
        // ;
    }

    oiiiscouOnCheckDeleteMasterTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibRelationHModel.onCheckDelMaster1 ){
        // TODOapplib_relation_h.on_check_del_master;    // application hook
        // }
        // if (! modlibRelationHModel.onCheckDelMaster2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouOnPopulateDetailsTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibRelationHModel.onPopulateDetails1 ){
        // TODOapplib_relation_h.on_populate_details;    // application hook
        // }
        // if (! modlibRelationHModel.onPopulateDetails2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouITransactionalTrigger() {
        // ;
    }

    oiiiscouKeyCommitTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.keyCommit1 ){
        // TODOapplib_transactional_h.key_commit;    // application hook
        // }
        // if (! modlibTransactionalHModel.keyCommit2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyUpdrecTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.keyUpdrec1 ){
        // TODOapplib_transactional_h.key_updrec;    // application hook
        // }
        // if (! modlibTransactionalHModel.keyUpdrec2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyDelrecTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.keyDelrec1 ){
        // TODOapplib_transactional_h.key_delrec;    // application hook
        // }
        // if (! modlibTransactionalHModel.keyDelrec2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouOnCommitTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.onCommit1 ){
        // TODOapplib_transactional_h.on_commit;    // application hook
        // }
        // if (! modlibTransactionalHModel.onCommit2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouOnInsertTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.onInsert1 ){
        // TODOapplib_transactional_h.on_insert;    // application hook
        // }
        // if (! modlibTransactionalHModel.onInsert2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouOnUpdateTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.onUpdate1 ){
        // TODOapplib_transactional_h.on_update;    // application hook
        // }
        // if (! modlibTransactionalHModel.onUpdate2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostDeleteTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.postDelete1 ){
        // TODOapplib_transactional_h.post_delete;    // application hook
        // }
        // if (! modlibTransactionalHModel.postDelete2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostInsertTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.postInsert1 ){
        // TODOapplib_transactional_h.post_insert;    // application hook
        // }
        // if (! modlibTransactionalHModel.postInsert2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostUpdateTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.postUpdate1 ){
        // TODOapplib_transactional_h.post_update;    // application hook
        // }
        // if (! modlibTransactionalHModel.postUpdate2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPreCommitTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.preCommit1 ){
        // TODOapplib_transactional_h.pre_commit;    // application hook
        // }
        // if (! modlibTransactionalHModel.preCommit2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPreDeleteTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.preDelete1 ){
        // TODOapplib_transactional_h.pre_delete;    // application hook
        // }
        // if (! modlibTransactionalHModel.preDelete2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPreInsertTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.preInsert1 ){
        // TODOapplib_transactional_h.pre_insert;    // application hook
        // }
        // if (! modlibTransactionalHModel.preInsert2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPreUpdateTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.preUpdate1 ){
        // TODOapplib_transactional_h.pre_update;    // application hook
        // }
        // if (! modlibTransactionalHModel.preUpdate2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostFormsCommitTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.postFormsCommit1 ){
        // TODOapplib_transactional_h.post_forms_commit;    // application hook
        // }
        // if (! modlibTransactionalHModel.postFormsCommit2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouPostDatabaseCommitTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibTransactionalHModel.postDatabaseCommit1 ){
        // TODOapplib_transactional_h.post_database_commit;    // application hook
        // }
        // if (! modlibTransactionalHModel.postDatabaseCommit2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouIValidationTrigger() {
        // ;
    }

    oiiiscouOnErrorTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibValidationHModel.onError1 ){
        // TODOapplib_validation_h.on_error;    // application hook
        // }
        // if (! modlibValidationHModel.onError2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenValidateItemTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibValidationHModel.whenValidateItem1 ){
        // TODOapplib_validation_h.when_validate_item;    // application hook
        // }
        // if (! modlibValidationHModel.whenValidateItem2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenValidateRecordTrigger() {
        // -----------------------------------------------
        // --         Application Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibValidationHModel.whenValidateRecord1 ){
        // TODOapplib_validation_h.when_validate_record;    // application hook
        // }
        // if (! modlibValidationHModel.whenValidateRecord2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouI__variousTrigger() {
        // ;
    }

    oiiiscouKeyHelpTrigger() {
        // -----------------------------------------------
        // --         Event Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibVariousHModel.keyHelp1 ){
        // TODOapplib_various_h.key_help;    // application hook
        // }
        // if (! modlibVariousHModel.keyHelp2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouOnMessageTrigger() {
        // -----------------------------------------------
        // --         Event Hooks
        // -----------------------------------------------
        // if (modlibVariousHModel.onMessage1 ){
        // TODOapplib_various_h.on_message;    // application hook
        // }
        // if (! modlibVariousHModel.onMessage2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouKeyPrintTrigger() {
        // -----------------------------------------------
        // --         Event Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibVariousHModel.keyPrint1 ){
        // TODOapplib_various_h.key_print;    // application hook
        // }
        // if (! modlibVariousHModel.keyPrint2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenTimerExpiredTrigger() {
        // -----------------------------------------------
        // --         Event Hooks
        // -----------------------------------------------
        // TODO
        // TODO
        // -- This trigger is part of the iconic button tool tips implementation
        // -- Note that the text displayed for a button is the label assigned to
        // -- that button.
        /*
        declare
            x        number;
            y        number;
            x_offset number;
        begin
            if :system.mouse_item = :global.bubble_item then   
                :TOOLBAR.BUTTON_HELP := get_item_property(:system.mouse_item,label);
                x:= get_item_property(:system.mouse_item,x_pos);
                x_offset := get_item_property(:system.mouse_item,width);
                y:= get_item_property(:system.mouse_item,y_pos);
                set_item_property('TOOLBAR.BUTTON_HELP',x_pos,x+0.05+x_offset);
                set_item_property('TOOLBAR.BUTTON_HELP',y_pos,y);
                set_item_property('TOOLBAR.BUTTON_HELP',displayed,property_on);
            end if;
        end;
        */
        // TODO
        // TODO
        // if (modlibVariousHModel.whenTimerExpired1 ){
        // TODOapplib_various_h.when_timer_expired;    // application hook
        // }
        // if (! modlibVariousHModel.whenTimerExpired2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouI__windowTrigger() {
        // ;
    }

    oiiiscouWhenWindowActivatedTrigger() {
        // -----------------------------------------------
        // --         Event Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibWindowHModel.whenWindowActivated1 ){
        // TODOapplib_window_h.when_window_activated;    // application hook
        // }
        // if (! modlibWindowHModel.whenWindowActivated2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenWindowClosedTrigger() {
        // -----------------------------------------------
        // --         Event Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibWindowHModel.whenWindowClosed1 ){
        // TODOapplib_window_h.when_window_closed;    // application hook
        // }
        // if (! modlibWindowHModel.whenWindowClosed2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouWhenWindowResizedTrigger() {
        // -----------------------------------------------
        // --         Event Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibWindowHModel.whenWindowResized1 ){
        // TODOapplib_window_h.when_window_resized;    // application hook
        // }
        // if (! modlibWindowHModel.whenWindowResized2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // -----------------------------------------------
    }

    oiiiscouWhenWindowDeactivatedTrigger() {
        // -----------------------------------------------
        // --         Event Hooks
        // -----------------------------------------------
        // TODO
        // if (modlibWindowHModel.wWindowDeactivated1 ){
        // TODOapplib_window_h.w_window_deactivated;    // application hook
        // }
        // if (! modlibWindowHModel.wWindowDeactivated2 ){
        // TODOreturn;       // option to bypass designer/2000 code
        // }
        // -----------------------------------------------
    }

    oiiiscouTrigger42Trigger() {
        // TODOapplib_navigate_h.pre_text_item;    // application hook
    }

    oiiiscouTrigger43Trigger() {
        // TODOapplib_navigate_h.post_text_item;    // application hook
    }
    /*
     * This function executed when msgAlert
    * fired
    */
    msgAlert() {
        // TODOerrm in varchar2,           /* message */
        // TODOerrt in varchar2,           /* message type */
        // TODOrftf in boolean         /* raise form_trigger_failure ? */
        // TODO) is      /* message parameters */
        /*
        * ----------------------------------------------------------------
        * CHANGE HISTORY:
        * DATE   PERSON      CHANGE
        * ------ ----------- ---------------------------------------------
        *
        */
        // TODO
        // TODOalert_is alert;
        //  const alertButton;
        // TODO
        // TODO
        // if ((errt==='f') ){
        // } else if ( (errt==='e'){
        // } else if ( (errt==='w'){
        // } else if ( (errt==='i'){
        // } else {
        // TODO
        // if ((errt in ('f','e','w','i')) ){
        // TODOalert_button = show_alert(alert_is);
        // TODO
        // if ((rftf) ){
        //  throw new Error('form_trigger_failure');
        // }
        // TODO
        // TODO
    }

    /*
     * This function executed when cgfd$getVPrisnCtDrvFemale
    * fired
    */
    cgfd$getVPrisnCtDrvFemale() {
        /* CGFD$GET_V_PRISN_CT_DRV_FEMALE */
        //  const pDrvFemaleCount;
        //  const ,pTotalCount;
        //  const ,pMaleCount;
        //  const ,pFemaleCount;
        /* This derives the value of a base table item based on the */
        /* values in other base table items.                        */
        // TODOp_drv_female_count =
        // TODOp_total_count - p_male_count - p_female_count;
    }

    /*
     * This function executed when cgfd$getVPrisnTotDrvFemal
    * fired
    */
    cgfd$getVPrisnTotDrvFemal() {
        /* CGFD$GET_V_PRISN_TOT_DRV_FEMAL */
        //  const pDrvFemaleCount;
        //  const ,pTotalCount;
        //  const ,pMaleCount;
        //  const ,pFemaleCount;
        /* This derives the value of a base table item based on the */
        /* values in other base table items.                        */
        // TODOp_drv_female_count =
        // TODOp_total_count - p_female_count - p_male_count;
    }

    /*
     * This function executed when cgte$checkConstraintVio
    * fired
    */
    cgte$checkConstraintVio() {
        /* CGTE$CHECK_CONSTRAINT_VIO */
        // TODOfunction cgte$check_constraint_vio(
        //  const pServerErr;
        //  const ,pServerMsg;
        /* Check and report Primary/Unique Key, Check Constraint and User */
        /* Defined Constraint violations                                  */
        //  const constraintName;
        /* Check if the error code is one we are interested in */
        // if (( ! (pServerErr in  (1, 2290) ||  (pServerErr >= 20000 &&  pServerErr <= 20999) ) ) ){
        // TODOreturn( false );
        // }
        // TODO
        /* Deal with user defined errors */
        // if ((pServerErr >= 20000 &&  pServerErr <= 20999) ){
        // TODOmessage('error '||cgte$strip_first_error(p_server_msg));
        // TODOreturn( true );
        // }
        // TODO
        /* Deal with Primary/Unique Key and Check Constraint violations */
        // TODOconstraint_name = cgte$strip_constraint(p_server_msg);
        // if ((pServerErr===1) ){
        // if ((constraintName==='agencyLocationsPk') ){
        // TODOmessage('error row exists already with same location');
        // } else {
        // TODOmessage(p_server_msg);
        // }
        // } else if ( (pServerErr===2290) ){
        // TODOmessage(p_server_msg);
        // TODOreturn( true );
    }

    /*
     * This function executed when createFormGlobals
    * fired
    */
    createFormGlobals() {
        // TODOglobal.form_name = 'imprisonment status count inquiry (oiiiscou)';
        // TODOglobal.form_version = '4.2.0';
    }

    /*
     * This function executed when createLibraryGlobals
    * fired
    */
    createLibraryGlobals() {
        // TODOglobal.library_version = '11.2.1.0';
        /*
                                VERSION HISTORY       
        -------------------------------------------------------------------------------------------------------------------
        DATE            AUTHOR            VERSION                 DESCRIPTION 
        -------------------------------------------------------------------------------------------------------------------
        10-Jul-2013  Niko Chu      11.2.1.0         Initial version 
        */
    }

    /*
     * This function executed when createLibraryGlobalsBak
    * fired
    */
    createLibraryGlobalsBak() {
        // -- V_FORM_NAME OMS_MODULES.MODULE_NAME%TYPE := GET_APPLICATION_PROPERTY(CURRENT_FORM_NAME);
        // TODOglobal.library_version = '10.2.6.1.10';
        /*
        
        VERSION HISTORY
        DATE               AUTHOR        VERSION           DESCRIPTION
        -----------------------------------------------------------
        13-Mar-2013     Steve       10.2.6.1.10    HPQC#19289.  Dynamically derive frame title for V_PRISN_CT block.
        27-APR-2010     Manjul      10.2.6.1.9     HPQC NO#471 Fixed GUI Issues, LOV title and column heading changed as per Peer Reviewer request (Related to Facility LOV)
        31-MAR-2010     Manjul      10.2.6.1.8     HPQC NO#471 Fixed GUI Issues, LOV title and column heading changed as per QA request (Related to Facility LOV)
        09-MAR-2010     Manjul      10.2.6.1.7     HPQC NO#471 Fixed GUI Issues (Related to Facility LOV)
        21-JAN-2010     Neeraj      10.2.6.1.6     HPQC NO#471 Commented active_flag for displaying all references code
                                                                                                                     Modified progam unit CGFD$GET_V_PRISN_CT_DRV_IMPRIS discarding the message 'Invalid Value For code'.
        30-SEP-2009     Neeraj      10.2.6.1.5     HPQC NO#471 modified default where clause for fetching only active references codes.
        21-NOV-2008     Niko        10.2.6.1.4     Cleaned up some of unused the procedure, block and global variables
                                                                                             Track issue#5879 :Fixed,repositioned LOV 'CGFK$AGY_LOC_AGY_LOC_ID' and changed case restriction property
                                                                                             of item DSP_DESCRIPTION to 'Mixed' from 'Upper'.
        30-OCT-2008     Virender    10.2.6.1.3     Track issue#5879 :Fixed,repositioned LOV 'CGFK$AGY_LOC_AGY_LOC_ID' and changed case restriction property
                                                                                                                                of item DSP_DESCRIPTION to 'Mixed' from 'Upper'.
        27-FEB-2008     Rose        10.2.6.1.2     #5581: Modified form and pll to correct label 'Totals' behavior.
        07-JAN-2008     Rose        10.2.6.1.1     #4536 : Modified form and pll to be consistent with other forms in application, form should display,
                                                                                                             1. Facility if it is only one in the list
                                                                                                             2. Nothing, If it's more than one facility in the list, user can select from LOV then form should aotoquery.
        20-Jun-2007        Rana        10.2.6.1.0     Run API and changes done according to new design documents.
        06-SEP-2001     ALEX        6.0.0.1        RECOMPILED TO 6I
        
        */
    }

}
