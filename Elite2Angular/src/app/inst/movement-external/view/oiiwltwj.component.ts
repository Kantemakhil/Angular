import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VTransferWaitingLists2 } from '@inst/movement-external/beans/VTransferWaitingLists2';
import { VTransferWaitingLists2CommitBean } from '@inst/movement-external/beans/VTransferWaitingLists2CommitBean';
import { OiiwltwjService } from '@inst/movement-external/service/oiiwltwj.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-oiiwltwj',
    templateUrl: './oiiwltwj.component.html'
})

export class OiiwltwjComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    vtwlData: VTransferWaitingLists2[] = [];
    vtwlDataTemp: VTransferWaitingLists2[] = [];
    vtwlModel: VTransferWaitingLists2 = new VTransferWaitingLists2();
    vtwlIndex = 0;
    vtwlInsertList: VTransferWaitingLists2[] = [];
    vtwlUpdatetList: VTransferWaitingLists2[] = [];
    vtwlDeleteList: VTransferWaitingLists2[] = [];
    vtwlCommitModel: VTransferWaitingLists2CommitBean = new VTransferWaitingLists2CommitBean();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    vTwlColumnDef: any[] = [];
    vTwlReadOnly = false;
    cgfkVtwldspdescriptionRg: any[] = [];
    cgfkVtwlagencylocationtoRg: any[] = [];
    cgfkVtwldspdescription3Rg: any[] = [];
    rgcancelreasonRg: any[] = [];
    selected = -1;
    dspagylocId: string;
    agyMap: Map<string, string> = new Map<string, string>();
    revAgyMap: Map<string, string> = new Map<string, string>();
    @ViewChild('grid') grid: any;
    constructor(public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private oiiwltwjFactory: OiiwltwjService) {
        this.vTwlColumnDef = [];
    }
    ngOnInit() {
        this.vTwlColumnDef = [
            { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
             editable: false, width: 180 },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 180 },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 180 },
            {
                fieldName: this.translateService.translate('common.to'), field: 'agencyLocationTo', datatype: 'lov',
                link: 'oiiwltwj/cgfkVTwlAgencyLocationToRecordGroup', optionWidth: 350, editable: true, width: 250, source:'OUMAGLOC'
                
            },
            {
                fieldName: this.translateService.translate('oiiwltwj.priority') + '*', field: 'transferPriority', datatype: 'lov',
                domain: 'TRN_PRIORITY', optionWidth: 350, editable: true, width: 180
            },
            {
                fieldName: this.translateService.translate('common.status') + '*', field: 'waitListStatus', datatype: 'lov',
                domain: 'TRN_SCH_STS', optionWidth: 350, editable: true, width: 180
            },
            {
                fieldName: this.translateService.translate('oiiwltwj.cancelreason'), field: 'outcomeReasonCode', datatype: 'lov',
                domain: 'TRN_CNCL_RSN', optionWidth: 350, cellEditable: this.canCellEdit, editable: false, width: 190
            },
            {
                fieldName: this.translateService.translate('oiiwltwj.requestdate'), field: 'requestedDate', datatype: 'date',
                domain: 'TRN_CNCL_RSN', optionWidth: 350, cellEditable: this.canCellEdit, editable: false, width: 190
            },
            { fieldName: this.translateService.translate('common.from'), field: 'agyLocId', datatype: 'text', editable: false, width: 190 },
        ];
        const cgfkVtwlagencylocationtoServiceObj = this.oiiwltwjFactory.
            cgfkVtwlagencylocationtoRecordGroup();
        cgfkVtwlagencylocationtoServiceObj.subscribe(cgfkVtwlagencylocationtoList => {
            if (cgfkVtwlagencylocationtoList.length === 0) {
                this.cgfkVtwlagencylocationtoRg = [];
            } else {
                cgfkVtwlagencylocationtoList.forEach(element => {
                    this.agyMap.set(element.description, element.code);
                    this.revAgyMap.set(element.code, element.description);
                });


            }
        });
        this.vtwlExecuteQuery();
    }
    onRowClickvtwl(event) {
        if(event.waitListStatus && (event.waitListStatus === 'CAN'  || event.waitListStatus === 'CANC')){
            this.grid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                if (['outcomeReasonCode'].includes(obj.colId)) {
                    this.vTwlColumnDef[7].required = true;
                    obj.colDef.headerClass = 'header-col';
                    this.grid.gridApi.refreshHeader();
                }
            });
        } else {
            this.grid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                if (['outcomeReasonCode'].includes(obj.colId)) {
                    this.vTwlColumnDef[7].required = true;
                    obj.colDef.headerClass = '';
                    this.grid.gridApi.refreshHeader();
                }
            }); 
        }
    }
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    vtwlExecuteQuery() {
        this.selected = -1;
        const vtwlResult = this.oiiwltwjFactory.
            vTwlExecuteQuery(this.sessionManager.currentCaseLoad);
        vtwlResult.subscribe(vtwlResultList => {
            if (vtwlResultList.length === 0) {
                this.vtwlData = [];
            } else if (vtwlResultList.length === 1 && vtwlResultList[0].errorMessage === 'To') {
                this.vtwlData = [];
            } else {
                this.vtwlData = vtwlResultList;
                this.selected = 0;
            }
        });
    }
    /**
    *  This function will be executed when commit event is
    * fired
    */
    oiiwltwjSavevtwlForm(event) {
        this.vtwlInsertList = event.added;
        this.vtwlUpdatetList = event.updated;
        this.vtwlDeleteList = event.removed;
        this.vtwlCommitModel.insertList = [];
        this.vtwlCommitModel.updateList = [];
        this.vtwlCommitModel.deleteList = [];
        const updateStatus = { invalid: false };
        this.vtwlUpdatetList.forEach(element => {
            if (!element.transferPriority) {
                this.show(this.translateService.translate('oiiwltwj.prioritymustbeentered'), 'warn');
                updateStatus.invalid = true;
                return;
            }
            if (!element.waitListStatus) {
                this.show(this.translateService.translate('oiiwltwj.statusmustbeentered'), 'warn');
                updateStatus.invalid = true;
                return;
            }
            if ((element.waitListStatus === 'CAN' || element.waitListStatus === 'CANC') && !element.outcomeReasonCode) {
                this.show(this.translateService.translate('oiiwltwj.cancelreasonmustbeentered'), 'warn');
                updateStatus.invalid = true;
                return;
            }
        });
        if (updateStatus.invalid) {
            return;
        }

        if (this.vtwlInsertList && this.vtwlInsertList.length > 0) {
            this.vtwlCommitModel.insertList = this.vtwlInsertList;
        }

        if (this.vtwlUpdatetList && this.vtwlUpdatetList.length > 0) {
            this.vtwlCommitModel.updateList = this.vtwlUpdatetList;
        }

        if (this.vtwlDeleteList && this.vtwlDeleteList.length > 0) {
            this.vtwlCommitModel.deleteList = this.vtwlDeleteList;
        }

        const vtwlSaveData = this.oiiwltwjFactory.vTwlCommit(this.vtwlCommitModel);
        vtwlSaveData.subscribe(data => {
            if (data) {
                if (String(data).indexOf('ORA-20001') > 0) {
                    this.show(this.translateService.translate('oiiwltwj.thisrecordhasbeenupdatedbyanotheruser'), 'warn');
                    return;
                }
                if (String(data).indexOf('ORA-20002') > 0) {
                    this.show(this.translateService.translate('oiiwltwj.thisrecordiscurrentlylockedbyanotheruser'), 'warn');
                    return;
                }
                if (String(data).indexOf('ORA-20003') > 0) {
                    this.show(this.translateService.translate('oiiwltwj.noupdateforthishistoricrecord'), 'warn');
                    return;
                }
                if (String(data) === '1') {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.vtwlExecuteQuery();
                } else {
                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                }
            }


        });
    }

    offenderBookIdPostChangeTrigger() {
    }

    agencyLocationToWhenValidateItemTrigger() {
    }

    agencyLocationTo2WhenButtonPressedTrigger() {
    }

    dspDescription3WhenValidateItemTrigger() {
    }

    butTransferPriorityWhenButtonPressedTrigger() {
    }

    dspDescriptionWhenValidateItemTrigger() {
    }

    butWaitListStatusWhenButtonPressedTrigger() {
    }

    butReasonWhenButtonPressedTrigger() {
    }

    requestedDateKeyListvalTrigger() {
    }

    vTwlOnErrorTrigger() {
    }

    vTwlPostQueryTrigger() {
    }

    vTwlPreQueryTrigger() {
    }

    vTwlOnLockTrigger() {
    }

    vTwlOnUpdateTrigger() {
    }

    vTwlPostUpdateTrigger() {
    }

    vTwlWhenValidateRecordTrigger() {
    }

    butOffendersWhenButtonPressedTrigger() {
    }

    butOffendersKeyNextItemTrigger() {
    }

    butOffendersKeyPrevItemTrigger() {
    }

    butWorksWhenButtonPressedTrigger() {
    }

    butWorksKeyNextItemTrigger() {
    }

    butWorksKeyPrevItemTrigger() {
    }

    butCalendarWhenButtonPressedTrigger() {
    }

    butCalendarKeyNextItemTrigger() {
    }

    butCalendarKeyPrevItemTrigger() {
    }

    butOffUpdatesWhenButtonPressedTrigger() {
    }

    butOffUpdatesKeyNextItemTrigger() {
    }

    butOffUpdatesKeyPrevItemTrigger() {
    }

    butDetailWhenButtonPressedTrigger() {
    }

    butDetailKeyNextItemTrigger() {
    }

    butDetailKeyPrevItemTrigger() {
    }

    mymenuOnErrorTrigger() {
    }

    oiiwltwjIKillCreateTrigger() {
    }

    oiiwltwjKeyClrblkTrigger() {
    }

    oiiwltwjKeyClrfrmTrigger() {
    }

    oiiwltwjKeyClrrecTrigger() {
    }

    oiiwltwjKeyCrerecTrigger() {
    }

    oiiwltwjKeyDuprecTrigger() {
    }

    oiiwltwjKeyDupItemTrigger() {
    }

    oiiwltwjI___itemTrigger() {
    }

    oiiwltwjKeyEditTrigger() {
    }

    oiiwltwjKeyListvalTrigger() {
    }

    oiiwltwjPostChangeTrigger() {
    }

    oiiwltwjWhenButtonPressedTrigger() {
    }

    oiiwltwjWhenCheckboxChangedTrigger() {
    }

    oiiwltwjWhenCustomItemEventTrigger() {
    }

    oiiwltwjWhenImageActivatedTrigger() {
    }

    oiiwltwjWhenImagePressedTrigger() {
    }

    oiiwltwjWhenListActivatedTrigger() {
    }

    oiiwltwjWhenListChangedTrigger() {
    }

    oiiwltwjWhenRadioChangedTrigger() {
    }

    oiiwltwjI__mouseTrigger() {
    }

    oiiwltwjWhenMouseClickTrigger() {
    }

    oiiwltwjWhenMouseDoubleclickTrigger() {
    }

    oiiwltwjWhenMouseEnterTrigger() {
    }

    oiiwltwjWhenMouseLeaveTrigger() {
    }

    oiiwltwjI_navigateTrigger() {
    }

    oiiwltwjKeyDownTrigger() {
    }

    oiiwltwjKeyExitTrigger() {
    }

    oiiwltwjKeyNxtblkTrigger() {
    }

    oiiwltwjKeyNxtkeyTrigger() {
    }

    oiiwltwjKeyNxtsetTrigger() {
    }

    oiiwltwjKeyNxtrecTrigger() {
    }

    oiiwltwjKeyNextItemTrigger() {
    }

    oiiwltwjKeyPrvblkTrigger() {
    }

    oiiwltwjKeyPrvrecTrigger() {
    }

    oiiwltwjKeyPrevItemTrigger() {
    }

    oiiwltwjKeyScrdownTrigger() {
    }

    oiiwltwjKeyScrupTrigger() {
    }

    oiiwltwjKeyUpTrigger() {
    }

    oiiwltwjPostBlockTrigger() {
    }

    oiiwltwjPostFormTrigger() {
    }

    oiiwltwjPostRecordTrigger() {
    }

    oiiwltwjPreBlockTrigger() {
    }

    oiiwltwjPreFormTrigger() {
    }

    oiiwltwjPreRecordTrigger() {
    }

    oiiwltwjWhenNewRecordInstanceTrigger() {
    }

    oiiwltwjWhenNewFormInstanceTrigger() {
    }

    oiiwltwjWhenNewBlockInstanceTrigger() {
    }

    oiiwltwjWhenNewItemInstanceTrigger() {
    }

    oiiwltwjI____queryTrigger() {
    }

    oiiwltwjKeyCqueryTrigger() {
    }

    oiiwltwjKeyEntqryTrigger() {
    }

    oiiwltwjKeyExeqryTrigger() {
    }

    oiiwltwjOnCountTrigger() {
    }

    oiiwltwjPostQueryTrigger() {
    }

    oiiwltwjPreQueryTrigger() {
    }

    oiiwltwjI__relationTrigger() {
    }

    oiiwltwjOnCheckDeleteMasterTrigger() {
    }

    oiiwltwjOnClearDetailsTrigger() {
    }

    oiiwltwjOnPopulateDetailsTrigger() {
    }

    oiiwltwjITransactionalTrigger() {
    }

    oiiwltwjKeyCommitTrigger() {
    }

    oiiwltwjKeyUpdrecTrigger() {
    }

    oiiwltwjOnCommitTrigger() {
    }

    oiiwltwjOnInsertTrigger() {
    }

    oiiwltwjOnUpdateTrigger() {
    }

    oiiwltwjPostDeleteTrigger() {
    }

    oiiwltwjPostInsertTrigger() {
    }

    oiiwltwjPostUpdateTrigger() {
    }

    oiiwltwjPreCommitTrigger() {
    }

    oiiwltwjPreDeleteTrigger() {
    }

    oiiwltwjPreInsertTrigger() {
    }

    oiiwltwjPreUpdateTrigger() {
    }

    oiiwltwjPostFormsCommitTrigger() {
    }

    oiiwltwjPostDatabaseCommitTrigger() {
    }

    oiiwltwjIValidationTrigger() {
    }

    oiiwltwjOnErrorTrigger() {
    }

    oiiwltwjWhenValidateItemTrigger() {
    }

    oiiwltwjWhenValidateRecordTrigger() {
    }

    oiiwltwjI__variousTrigger() {
    }

    oiiwltwjKeyHelpTrigger() {
    }

    oiiwltwjOnMessageTrigger() {
    }

    oiiwltwjKeyPrintTrigger() {
    }

    oiiwltwjWhenTimerExpiredTrigger() {
    }

    oiiwltwjI__windowTrigger() {
    }

    oiiwltwjWhenWindowActivatedTrigger() {
    }

    oiiwltwjWhenWindowClosedTrigger() {
    }

    oiiwltwjWhenWindowResizedTrigger() {
    }

    oiiwltwjWhenWindowDeactivatedTrigger() {
    }

    oiiwltwjPreTextItemTrigger() {
    }

    oiiwltwjPostTextItemTrigger() {
    }

    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    validateWaitingList = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        const bookingId = (event.data.offenderBookId) ? event.data.offenderBookId : null;
        const PrimaryKeyCheck = this.oiiwltwjFactory.CgfkchkVTwlVTwlVOffBkg(bookingId);
        PrimaryKeyCheck.subscribe(data => {
            if (!data) {
                this.show('No primary key row found for value in OFFENDER_BOOK_ID', 'warn');
            }
        });
        if(event.data.waitListStatus && (event.data.waitListStatus === 'CAN'  || event.data.waitListStatus === 'CANC')){
            this.grid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                if (['outcomeReasonCode'].includes(obj.colId)) {
                    this.vTwlColumnDef[7].required = true;
                    obj.colDef.headerClass = 'header-col';
                    this.grid.gridApi.refreshHeader();
                }
            });
        } else {
            this.grid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                if (['outcomeReasonCode'].includes(obj.colId)) {
                    this.vTwlColumnDef[7].required = true;
                    obj.colDef.headerClass = '';
                    this.grid.gridApi.refreshHeader();
                }
            }); 
        }

        rowdata.validated = true;
        return rowdata;
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'outcomeReasonCode' && (data.waitListStatus === 'CANC' || data.waitListStatus === 'CAN')) {
            return true;
        } else {
            return false;
        }
    }

}
