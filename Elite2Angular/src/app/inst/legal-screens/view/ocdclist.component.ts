import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdclistService } from '@instlegalscreens/service/ocdclist.service';
import { OcdclistCourtListQuery } from '@instlegalscreensbeans/OcdclistCourtListQuery';
import { OcdclistCourtListQueryCommitBean } from '@instlegalscreensbeans/OcdclistCourtListQueryCommitBean';
import { VCourtEvents } from '@instlegalscreensbeans/VCourtEvents';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Router } from '@angular/router';
import { OcdlegloService } from '@inst/legal/service/ocdleglo.service';
import { OcdenforService } from '@iwp/service/ocdenfor.service';
@Component({
    selector: 'app-ocdclist',
    templateUrl: './ocdclist.component.html'
})

export class OcdclistComponent implements OnInit {
    //  Variable declaration
    @ViewChild('courtDiaryGrid', { static: true }) courtDiaryGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    ctllstData: OcdclistCourtListQuery[] = [];
    ctllstDataTemp: OcdclistCourtListQuery[] = [];
    ctllstModel: OcdclistCourtListQuery = new OcdclistCourtListQuery();
    ctllstModelTemp: OcdclistCourtListQuery = new OcdclistCourtListQuery();
    ctllstIndex = 0;
    ctllstInsertList: OcdclistCourtListQuery[] = [];
    ctllstUpdatetList: OcdclistCourtListQuery[] = [];
    ctllstDeleteList: OcdclistCourtListQuery[] = [];
    ctllstCommitModel: OcdclistCourtListQueryCommitBean = new OcdclistCourtListQueryCommitBean();
    ctlunData: VCourtEvents[] = [];
    ctlunDataTemp: VCourtEvents[] = [];
    ctlUnModel: VCourtEvents = new VCourtEvents();
    ctlunIndex = 0;
    ctlunInsertList: VCourtEvents[] = [];
    ctlunUpdatetList: VCourtEvents[] = [];
    ctlunDeleteList: VCourtEvents[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    ctlLstColumnDef: any[];
    ctlUnColumnDef: any[];
    courtEventColumndef: any[];
    ctlBlkReadOnly = false;
    ctlLstReadOnly = false;
    ctlUnReadOnly = false;
    titleBlockReadOnly = false;
    rgagylocRg: any[] = [];
    rghearingRg: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    lanBtndisabled = true;
    searchBtndisabled = true;
    selectedRow: any;
    rowIndex: number;
    selectedRowIndex: number;
    checkFlag = false;
    exitBtnDisabled = true;
    clearFlag = false;
    retrieveDis: boolean;
    disLovValues: boolean;
    disDateValues:boolean;
    dairyMatterText = '';
    constructor(private ocdclistFactory: OcdclistService, public translateService: TranslateService,
        private sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService,
        public osiosearFactory: OsiosearService, private router: Router, private OcdlegloFactory: OcdlegloService, 
        public ocdenforFactory: OcdenforService) {
        //  TODO initilize data members here..!
        this.ctlLstColumnDef = [];
        this.ctlUnColumnDef = [];
    }
    ngOnInit() {
        this.clearFlag = false;
        this.exitBtnDisabled = true;
        this.checkFlag = false;
        this.selectedRowIndex = 0;
        this.searchBtndisabled = true;
        this.ocdclistFactory.selectedRow = false;
        this.retrieveDis = false;
        this.disLovValues = false;
        this.disDateValues = false;
        this.ctllstModel.pCourtDate = DateFormat.getDate();
     if (!this.ocdclistFactory.checkFlag){
         this.setOffendersData();
        } else{
            this.ctllstModel.pAgyLocId = undefined;
            this.ctllstModel.pCourtDate = DateFormat.getDate();
        }
     this.ocdclistFactory.checkFlag = false;
      this.router.url;
        this.ctlLstColumnDef = [
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'pLastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'pFirstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'pMiddleName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.birth-date'), field: 'pBirthDate',
                editable: false, width: 150, datatype: 'date'
            },
            { fieldName: this.translateService.translate('common.Orca2'), field: 'pOffDisplay', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.time') + '*', field: 'pStartTime', editable: true,
                width: 150, datatype: 'time'
            },
            { fieldName: this.translateService.translate('ocdclist.matter'), field: 'matter', editable: false, width: 150, hide: true, externalColumn: true  },
            { fieldName: '', field: 'pCaseInfoNumber', editable: false, width: 150},
            {
                fieldName: this.translateService.translate('oidcrtev.hearingreason') + '*', field: 'pCourtEventType',
                editable: false, width: 250, datatype: 'lov', link: 'ocdclist/rgHearingRecordGroup', optionWidth: 320
            },
            {
                fieldName: this.translateService.translate('ocdclist.appearancetype'), editable: false, domain: 'CRT_APP_TYPE',
                field: 'appearanceType', datatype: 'lov', width: 130 
            },
            {
                fieldName: this.translateService.translate('ocdclist.appearancelocation'),editable: false, source: 'OIMULOCA',
                link: 'oidcrtev/apperancelocationRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad,
                field: 'appearanceLocation', datatype: 'lov', width: 130
            },
            { fieldName: this.translateService.translate('ocdclist.cancel'), field: 'cancelFlag',datatype: 'checkbox', editable: false, width: 150},
            { fieldName: this.translateService.translate('ocdclist.cancelReason'), field: 'outcomeReasonCode', datatype: 'lov',domain: 'CRT_CAN_RSN', editable: false, width: 150},
           


        ];
        this.ctlUnColumnDef = [
            {
                fieldName: this.translateService.translate('common.date'), field: 'eventDate', editable: true,
                width: 150, datatype: 'date', cellEditable: this.canCtlUnEdit
            },
            {
                fieldName: this.translateService.translate('common.time'), field: 'startTime', editable: true,
                width: 150, datatype: 'time', cellEditable: this.canCtlUnEdit
            },
            {
                fieldName: this.translateService.translate('ocdclist.court'), field: 'agyLocIdName', editable: true, width: 250,
                cellEditable: this.canCtlUnEdit
            },
            {
                fieldName: this.translateService.translate('ocdclist.no'), field: 'caseInfoPrefix', editable: true, width: 100,
                cellEditable: this.canCtlUnEdit
            },
            {
                fieldName: '', field: 'caseInfoNumber', editable: true, width: 150,
                cellEditable: this.canCtlUnEdit
            },
            {
                fieldName: this.translateService.translate('common.hearingtype'), field: 'courtEventTypeDesc', editable: true,
                width: 250, cellEditable: this.canCtlUnEdit
            },
            { fieldName: 'Comment', field: 'commentText', editable: true, width: 310, cellEditable: this.canCtlUnEdit },

        ];

        this.courtEventColumndef = [
            {
                fieldName: this.translateService.translate( 'ocdccases.date' ),
                field: 'eventDate', editable: true, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.time' ),
                field: 'startTime', editable: true, width: 100, datatype: 'time'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.court' ),
                field: 'agyLocId', editable: true, width: 150, datatype: 'lov', link: 'ocdccase/populateCourtData',source:'OUMAGLOC'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.hearingtype' ),
                field: 'hearingType', editable: true, width: 170, datatype: 'lov',domain:'MOVE_RSN'// link: 'ocdccase/populateHearingTypeData'
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.outcome' ),
                field: 'outcomeReasonCode', editable: false, width: 210, datatype: 'lov', link: 'ocdccase/populateOutcomeData'
            },
            {
                fieldName: '',
                field: 'outcomeLaunchButton', editable: true, width: 220, datatype: 'launchbutton', link: '/OUMORCOD', modal: true, updateField: 'row',
                data: 'row', dialogWidth: '80'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.nextevent' ),
                field: 'nextEventDate', editable: true, width: 130, datatype: 'date'
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.startTime' ),
                field: 'nextEventStartTime', editable: true, width: 100, datatype: 'time'
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.hold' ),
                field: 'holdFlag', editable: true, width: 140, datatype: 'checkbox-link', link: '/OCUHOLDS', modal: true,
                data: 'row', dialogWidth: '80%', height: 'auto', styleClass: 'hold-popup-block', displayas: 'href'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.report' ),
                field: 'orderRequestedFlag', editable: true, width: 140, datatype: 'checkbox-link', link: '/OCUPSRDE', modal: true,
                data: 'row', dialogWidth: '80%', height: 'auto', styleClass: 'report-popup-block', displayas: 'href'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.comment' ),
                field: 'commentText', editable: true, width: 130
            },


        ];

    }
    /*
     *  This event is used to do the validations in the Grid in Offenders Block.
     */
    canCtlUnEdit = (data: any, index: number, field: string): boolean => {
        this.type = 'warn';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
        this.show();
        return false;
    }
    /*
     *  This event is used to set the previous data after redirect from the address/global name search screen.
     */
    setOffendersData() {
        if (this.ocdclistFactory.courtListModel.pAgyLocId) {
            this.ctllstModel = new OcdclistCourtListQuery();
            this.ctllstModel.pAgyLocId = this.ocdclistFactory.courtListModel.pAgyLocId;
            this.ctllstModel.pCourtDate = DateFormat.getDate(this.ocdclistFactory.courtListModel.pCourtDate);
            this.ocdclistFactory.courtListModel = new OcdclistCourtListQuery();
            this.checkFlag = true;
            this.ocdclistexecuteQuery();
            this.searchBtndisabled = false;
        } else {
            this.checkFlag = false;
            this.selectedRow = 0;
        }
    }
    /*
     * This event is fired when click on row in Offenders block
     */
    onRowClickctllst(event) {
        if (event) {
            this.rowIndex = this.ctllstData.indexOf(event);
            this.ctllstModelTemp = new OcdclistCourtListQuery();
            this.ctllstModelTemp.pOffBkgId = event.pOffBkgId;
            this.ocdclistFactory.selectedRow = false;
            this.ctlunExecuteQuery();
            this.vHeaderBlockModel = new VHeaderBlock();
            this.vHeaderBlockModel.offenderIdDisplay = event.pOffDisplay;
            this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
            const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
            offbkGlobal.subscribe(list => {
                if (list.length > 0) {
                    this.vHeaderBlockModel = list[0];
                    this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                }
            });
        }
        const node = this.courtDiaryGrid.gridOptions.api.getSelectedNodes().length && this.courtDiaryGrid.gridOptions.api.getSelectedNodes()[0];
        if(node && node.data){
            if(node.data.matter){
              this.dairyMatterText = node.data.matter;
            } else {
              this.dairyMatterText = '';
            }
          }
    }
    onButAdrclick() {
    }
    onButCourtclick() {
    }
    onButOffclick() {
    }
    onRowClickctlun(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    /**
     * To display the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];

    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    ocdclistPopulateDetails() {
        const serviceObj = this.ocdclistFactory.
            ctlUnExecuteQuery(this.ctllstModel);
        serviceObj.subscribe(data => {
            if (data !== undefined && data.errorMessage.length > 0) {
            } else {
                this.ctlunData = data;
            }
        });
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdclistSavectllstForm(event) {
        this.ctllstUpdatetList = event.updated;
        this.ctllstCommitModel.insertList = [];
        this.ctllstCommitModel.updateList = [];
        this.ctllstCommitModel.deleteList = [];
        if (this.ctllstInsertList.length > 0 || this.ctllstUpdatetList.length > 0) {
            for (let i = 0; i < this.ctllstUpdatetList.length; i++) {
                this.ctllstUpdatetList[i].pBirthDate = DateFormat.getDate(this.ctllstUpdatetList[i].pBirthDate);
                if (!this.ctllstUpdatetList[i].pStartTime) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.timemustbeentered');
                    this.show();
                    return;
                }
                if (!this.ctllstUpdatetList[i].pCourtEventType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.pleaseenterhearingtype');
                    this.show();
                    return;
                }
                this.ctllstUpdatetList[i].pStartTime = DateFormat.getDate(this.ctllstUpdatetList[i].pStartTime);
                const d = DateFormat.getDate();
                d.setDate(d.getDate() - 1);
                if ((DateFormat.compareDateTime(DateFormat.getDate(d), this.ctllstUpdatetList[i].pStartTime)) === 1) {
                    this.ctllstUpdatetList[i].pEventStatus = 'EXP';

                } else {
                    this.ctllstUpdatetList[i].pEventStatus = 'SCH';
                }
            }
            this.ctllstCommitModel.updateList = this.ctllstUpdatetList;
        }
        const ctllstSaveData = this.ocdclistFactory.ctlLstCommit(this.ctllstCommitModel);
        ctllstSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.ocdclistexecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    /**
     *  This function will be executed when Search event is
    * fired
    */
    ocdclistexecuteQuery() {
        if (!this.ctllstModel.pAgyLocId) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.courtmustbeentered');
            this.show();
            return;
        }
        if (!this.ctllstModel.pCourtDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbeentered');
            this.show();
            return;
        }
        this.exitBtnDisabled = false;
        const serviceObj = this.ocdclistFactory.
            ctlLstExecuteQuery(this.ctllstModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.searchBtndisabled = false;
                this.ctllstData = data;
                this.ctlunData = [];
                this.type = 'info';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
            } else {
                if (this.checkFlag) {
                    this.selectedRow = this.ocdclistFactory.selectedRowIndex;
                } else {
                    this.selectedRow = 0;
                }
                this.ocdclistFactory.selectedRowIndex = 0;
                this.checkFlag = false;
                this.searchBtndisabled = false;
                this.ctllstData = data;
                this.ctllstData.forEach(ele => {
                    ele.cancelFlag = ele.pEventStatus === 'CANC' ? true : false;
                });
                this.ctllstModelTemp = this.ctllstData[0];
                this.lanBtndisabled = false;
                this.retrieveDis = true;
                this.disDateValues = true;
                this.disLovValues = true;
                this.onRowClickctllst(this.ctllstModelTemp);
            }
        });
    }

    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    ocdclistdateFormat(dateValue) {
        if (dateValue !== undefined && dateValue.length > 0) {
            const newdate = dateValue.split('/');
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }
    /**
     *  This function will be executed when Search event is
    * fired
    */
    ctlunExecuteQuery() {
        this.ctlUnModel = new VCourtEvents();
        this.ctlUnModel.offenderBookId = this.ctllstModelTemp.pOffBkgId;
        const ctlunResult = this.ocdclistFactory.
            ctlUnExecuteQuery(this.ctlUnModel);
        ctlunResult.subscribe(ctlunResultList => {
            if (ctlunResultList.length === 0) {
                this.ctlunData = [];
            } else {
                this.ctlunData = ctlunResultList;
                this.ctlUnModel = ctlunResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when Clear event is
    * fired
    */
    ocdclistClearQuery() {
        if (this.ctllstModel.pAgyLocId === undefined) {
            this.clearFlag = false;
        } else {
            this.clearFlag = true;
        }
        const agylocIdValue = this.ctllstModel.pAgyLocId === undefined ? '' : undefined;
        this.ctllstModel = new OcdclistCourtListQuery();
        this.ctllstModel.pAgyLocId = agylocIdValue;
        this.ocdclistFactory.selectedRow = false;
        this.ocdclistFactory.courtListModel = new OcdclistCourtListQuery();
        this.ctllstData = [];
        this.ctlunData = [];
        this.searchBtndisabled = true;
        this.lanBtndisabled = true;
        this.selectedRow = 0;
        this.exitBtnDisabled = true;
        this.retrieveDis = false;
        this.disLovValues = false;
        this.disDateValues = false;
        this.dairyMatterText = '';
    }
    /**
     *  This function will be executed when we change the court in Court dairy block
    *
    */
    onButCourtEvent() {
        if (!this.ocdclistFactory.courtListModel.pAgyLocId) {
            this.selectedRow = 0;
        }
        this.searchBtndisabled = true;
        if (this.clearFlag) {
            this.exitBtnDisabled = true;
        } else {
            this.clearFlag = false;
            this.exitBtnDisabled = false;
        }
        this.clearFlag = false;
    }
    
    courtBlur(){
        if (!this.ctllstModel.pAgyLocId) {
            this.ctllstModel.pAgyLocId = this.ctllstModel.pAgyLocId === undefined ? '' : undefined;
        }
    }
    
    /**
     *  This function will be executed when we change the Date in Court dairy block
    *
    */
    courtDateChangeEvent() {
        if (!this.ocdclistFactory.courtListModel.pAgyLocId) {
            this.selectedRow = 0;
        }
        this.searchBtndisabled = true;
        if (this.clearFlag) {
            this.exitBtnDisabled = true;
        } else {
            this.clearFlag = false;
            this.exitBtnDisabled = false;
        }
        this.clearFlag = false;
    }

    onButLaunchClick = () => {
        this.ocdclistFactory.courtListModel = this.ctllstModel;
        this.ocdclistFactory.selectedRow = true;
        this.ocdclistFactory.selectedRowIndex = this.rowIndex;
        this.ocdenforFactory.backButton = true;
        return true;
    }
    butCourtWhenButtonPressedTrigger() {
        this.type = 'info';
        this.message = this.translateService.translate('ocdclist.courtcases');
        this.show();
        return;
    }
    isInsertable(event) {
        const index = this.ctllstData.indexOf(this.selectedRow);
        this.courtDiaryGrid.setColumnData('matter', index, event);
    }
}

