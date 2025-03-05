import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidbutabService } from '../service/oidbutab.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderExternalMovements } from '@instmovementexternalbeans/OffenderExternalMovements';
import { VHeaderBlockCommitBean } from '@inst/movement-external/beans/VHeaderBlockCommitBean';
import { Router } from '@angular/router';
import { OiinamesService } from '@inst/movement-external/service/oiinames.service';
import { VNameSearch } from '@common/beans/VNameSearch';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderExternalMovement } from '@inst/movement-external/beans/OffenderExternalMovement';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { VHeaderBlock2 } from '@common/beans/VHeaderBlock2';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

@Component({
    selector: 'app-oidbutab',
    templateUrl: './oidbutab.component.html'
})

export class OidbutabComponent implements OnInit {
    cityFlag: boolean;
    toLocFlag: boolean;
    fromHouDisFlag: boolean;
    facilityUrl: string;
    dspLevelThreeLink: string;
    dspLevelTwo: string;
    dspLevelOne: string;
    confirmDisable: boolean;
    repeationFlag = 0;
    confirmAllFlag: boolean;
    offIdIndex: number;
    tolocLink: string;
    rglulevel1RgFlag: boolean;
    rglulevel2RgFlag: boolean;
    rglulevel3RgFlag: boolean;
    currentDateTime: Date;
    confirmAll: boolean;
    namesrchData: VNameSearch[] = [];
    namesrchModel: VNameSearch = new VNameSearch();
    offExMovementsModel: OffenderExternalMovement = new OffenderExternalMovement();
    confirmall: boolean;
    enableAdd: boolean;
    reqReason: boolean;
    tolocation: any;
    actionName: string;
    msgs: any[] = [];
    vhbData: VHeaderBlock[] = [];
    vhbModel: VHeaderBlock = new VHeaderBlock();
    vhbCommitModel: VHeaderBlockCommitBean = new VHeaderBlockCommitBean();
    vhbDataTemp: VHeaderBlock[] = [];
    vhbIndex = 0;
    vhbInsertList: VHeaderBlock[] = [];
    vhbUpdateList: VHeaderBlock[] = [];
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    vhbColumnDefs: any[];
    qryBlkReadOnly = false;
    vhbReadOnly = false;
    commonBlkReadOnly = false;
    dummyBlkReadOnly = false;
    rginstitutionRg: any[] = [];
    rgactiveagencyRg: any[] = [];
    rgdirectionRg: any[] = [];
    rglulevel1Rg: any[] = [];
    rglulevel2Rg: any[] = [];
    rglulevel3Rg: any[] = [];
    rgcityRg: any[] = [];
    rgreasonRg: any[] = [];
    dspLev1: any;
    offenderId = 0;
    dspLev2: any;
    dspLev3: any;
    caseLoadId: any;
    dspLevOne: any;
    type = 'error';
    msglist = [];
    confirmMove: any;
    message = ' Invalid.';
    disabledLoc: boolean;
    vNameSearch: VNameSearch = new VNameSearch();
    routUrl: string;
    rowLength: number;
    dataRetrival: boolean;
    lastMoveDate: Date;
    lastMoveTime: Date;
    titles = { code: 'code', description: 'description', title: 'title' };
    selected = -1;
    @ViewChild('grid') grid: any;
    option = [{ id: 'IN', text: 'IN' }, { id: 'OUT', text: 'OUT' }];
    qryBlkModel: OffenderExternalMovements = new OffenderExternalMovements();
    commentText: any;
    directionLink: any;
    directionTitles = { description: 'Direction' };
    levelOneTitles = { description: 'Living Unit Code' };
    levelTwoTitles = { description: 'Living Unit Code' };
    levelThreeTitles = { description: 'Living Unit Code' };
    num: number;
    falseNum: number;
    disabledFlag : boolean;
    vHeaderBlockModelBean: VHeaderBlock2 = new VHeaderBlock2();
    vheaderBlockModel: VHeaderBlock2 = new VHeaderBlock2();
    constructor(private oidbutabFactory: OidbutabService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private router: Router,
        public dialogService: DialogService,
        private oiinamesFactory: OiinamesService,
        private osiosearFactory: OsiosearService,
        private offenderSearchService: OffenderSearchService) {
    }
    ngOnInit() {
        this.disabledFlag = false;
        this.toLocFlag = true;
        this.fromHouDisFlag = true;
        this.vheaderBlockModel = this.offenderSearchService.selectedOffender;
        this.cityFlag = true;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.facilityUrl = 'oidbutab/rgInstitutionRecordGroup?caseloadId=' + this.caseLoadId;
        this.directionLink = 'oidbutab/rgDirectionRecordGroup';
        this.vhbColumnDefs = [
            {
                fieldName: this.translateService.translate('oidbutab.fieldc'), field: 'insertedFlag', editable: true,
                cellEditable: this.canEdit,
                datatype: 'checkbox', width: 90
            },
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
                editable: true, width: 300, cellEditable: this.canIdEdit
            },
            {
                fieldName: '', field: 'image', datatype: 'launchbutton', link: '/oiinamesdialog', data: 'row',
                width: 100, updateField: 'row', isDisable: this.disableCell, dialogWidth: 70, modal: true, editable: false, onLaunchClick: this.asnLaunchClick
            },
            { fieldName: this.translateService.translate('common.name'), field: 'lastName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oidadmis.housinglocation'), field: 'livingUnitDescription',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'intakeAgyLocId', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oidbutab.lastmove'), field: 'officer', editable: false,
                width: 150
            },

            {
                fieldName: this.translateService.translate('oidbutab.tolocation'), field: 'locationCode',
                editable: true, width: 150, datatype: 'lov', optionWidth: 300, cellEditable: this.canLovEdit,
                link: 'oidbutab/rgActiveAgencyRecordGroup?agylocId=' + this.qryBlkModel.arrestAgencyLocId
            },

            {
                fieldName: this.translateService.translate('oiduncta.tota'), field: 'ethnicity',
                editable: true, datatype: 'lov', domain: 'CITY',
                width: 150, optionWidth: 300, cellEditable: this.canEthnicityEdit
            },
            {
                fieldName: this.translateService.translate('common.reason'), field: 'movementReason',
                editable: true, width: 150, optionWidth: 300, datatype: 'lov',
                link: 'oidbutab/rgReasonRecordGroup', cellEditable: this.canReasonEdit
            }

        ];
        this.qryBlkModel.movementDate = DateFormat.getDate();
        this.qryBlkModel.movementTime = DateFormat.getDate();

    }
    disableCell = (data: any, index: number, field: string): boolean => {
        if (!data.offenderIdDisplay ) {
            return false;
        } else {
            return true;
        }
    }

    canEdit() {
        return true;
    }

    whenValidateItem() {
        this.namesrchModel.agyLocId = this.qryBlkModel.arrestAgencyLocId;
        const vhbSaveData = this.oidbutabFactory.whenValidateItem(this.namesrchModel);
        vhbSaveData.subscribe(data => {
            if (data > 0) {
                this.type = 'info';
                this.message = this.translateService.translate('oidbutab.thisOffenderalreadyintherecordset');
                this.show();
            } else {
                this.type = 'info';
                this.message = this.translateService.translate('oidbutab.thisoffenderdoesnotexists');
                this.show();
            }
        });
    }

    canIdEdit = (data: any, index: number, field: string, originalIndex: number): boolean => {
        if (this.rowLength <= originalIndex) {
            return true;
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
            this.show();
            return false;
        }
    }

    canEthnicityEdit = (data: any, index: number, field: string): boolean => {
        if (this.qryBlkModel.toAgyLocId) {
            if (field === 'ethnicity') {
                return false;
            }
            if (data.insertedFlag !== true) {
                return false;
            }
        }
        if (this.qryBlkModel.directionCode === 'IN') {
            if (field === 'ethnicity') {
                return false;
            }
        }
        return true;
    }

    canReasonEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'movementReason') {
            if (data.insertedFlag !== true) {
                return false;
            }
        }
        return true;
    }

    canLovEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'locationCode' && !this.qryBlkModel.toAgyLocId) {
            return false;
        } else if (field === 'locationCode' && this.qryBlkModel.toAgyLocId) {
            return true;
        } else if (field === 'ethnicity' && !this.qryBlkModel.toCity) {
            return false;
        } else if (data.insertedFlag !== true) {
            return false;
        }
    }

    asnLaunchClick = (event) => {
        const index = this.vhbData.indexOf(event);
        this.dialogService.openLinkDialog('oiinamesdialog').subscribe(resData => {
            if (resData) {
               
               this.grid.setColumnData('offenderIdDisplay',index,resData.offenderIdDisplay);
               this.grid.setColumnData('lastName',index,resData.lastName + ',' + resData.firstName);
               this.grid.setColumnData('livingUnitDescription',index,resData.livingUnitDescription);
            //    this.grid.setColumnData('',index,resData.lastName + ',' + resData.firstName);
            //    this.grid.setColumnData('livingUnitDescription',index,resData.livingUnitDescription);
              
            }
        });
    }

    onRowClickvhb(event) {
        this.vhbModel = event;
    }

    onTimeClick(event) {
        this.vhbData = [];
        this.enableAdd = false;
        if (DateFormat.compareDate(this.qryBlkModel.movementDate, DateFormat.getDate()) !== -1) {
            if (DateFormat.compareTime(this.qryBlkModel.movementTime, DateFormat.getDate()) === 1) {
                this.type = 'info';
                this.message = this.translateService.translate('oiduncta.movementtimecannotbelaterthancurrenttime');
                this.show();
                return;
            }
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
    onDateClick(event) {
        if (DateFormat.compareDate(this.qryBlkModel.movementDate, DateFormat.getDate()) === 1) {
            this.type = 'info';
            this.message = this.translateService.translate('oidbutab.datecannotbelater');
            this.show();
            return;
        }
    }

    onDirectionClick(event) {
        this.confirmAll = false;
        this.dataRetrival = false;
        this.qryBlkModel.arrestAgencyLocId = null;
        this.qryBlkModel.fromAgyLocId = null;
        this.qryBlkModel.fromCity = null;
        this.qryBlkModel.ojLocationCode = null;
        this.qryBlkModel.toAgyLocId = null;
        this.qryBlkModel.toCity = null;
        this.qryBlkModel.movementReasonCode = null;
        this.vhbData = [];
        if (this.qryBlkModel.directionCode === 'OUT') {
            this.disabledLoc = false;
            this.reqReason = true;
            this.cityFlag = false;
            this.toLocFlag = true;
        } else {
            this.enableAdd = false;
            this.reqReason = false;
            this.toLocFlag = true;
            this.cityFlag = true;
            this.disabledLoc = true;
            this.tolocLink = null;
        }
    }

    onInstitutionChange(event) {
        const agylocIdValue = this.qryBlkModel.arrestAgencyLocId === undefined ? '' : undefined;
        this.qryBlkModel.arrestAgencyLocId = agylocIdValue;
        this.confirmAll = false;
        const fromagyId = this.qryBlkModel.fromAgyLocId === undefined ? '' : undefined;
        this.qryBlkModel.fromAgyLocId = fromagyId;
    }
    /*
    * this event is fired when facility is selected
    */
    onInstitutionClick(event) {
            this.vhbData = [];
            if (event) {
               this.dspLevelOne =  'oidbutab/rgLuLevel1RecordGroup?agylocId=' + event.code;
            if (this.qryBlkModel.arrestAgencyLocId && this.qryBlkModel.directionCode === 'OUT') {
                this.tolocLink = 'oidbutab/rgActiveAgencyRecordGroup?agylocId=' + this.qryBlkModel.arrestAgencyLocId;
                this.toLocFlag = false;
            } else {
                this.rglulevel1RgFlag = false;
                this.rglulevel2RgFlag = false;
                this.rglulevel3RgFlag = false;
                this.qryBlkModel.fromAgyLocId = null;
                this.qryBlkModel.fromCity = null;
                this.qryBlkModel.ojLocationCode = null;
                this.toLocFlag = true;
            }
        }
    }

    /*
    * this event is fired when housing location is selected for level_1
    */
    onDspLevOneClick(event) {
        if (event) {
            this.qryBlkModel.fromAgyLocId = event.code;
           this.dspLevelTwo =  'oidbutab/rgLuLevel2RecordGroup?agylocId=' + this.qryBlkModel.arrestAgencyLocId
            + '&livingUnitId=' + event.code;
            this.dspLevelThreeLink = undefined;
            this.qryBlkModel.fromCity = undefined;
            this.qryBlkModel.ojLocationCode = undefined;
        }
    }

    changeTheValueOfDirection(event) {
        if (event) {
            this.qryBlkModel.directionCode = event.code;
            if (event.code === 'IN') {
                this.fromHouDisFlag = true;
                this.toLocFlag = true;
                this.cityFlag = true;
                this.reqReason = false;
                this.qryBlkModel.fromAgyLocId = undefined;
                this.qryBlkModel.fromCity = undefined;
                this.qryBlkModel.ojLocationCode = undefined;
                this.qryBlkModel.toAgyLocId = undefined;
                this.qryBlkModel.toCity = undefined;
                this.qryBlkModel.movementReasonCode = undefined;
            } else {
                this.fromHouDisFlag = false;
                this.toLocFlag = false;
                this.cityFlag = false;
                this.reqReason = true;
            }
        }
    }

    /*
    * this event is fired when Reason is selected for level_2
    */
    onReasonClick(event) {
        const reasonValue = this.qryBlkModel.movementReasonCode === undefined ? '' : undefined;
        this.qryBlkModel.movementReasonCode = reasonValue;
    }

    /**
     * event is fired when change the value in LOV.
     * @param event
     */
    changeTheVAlueOfojLocationCode(event) {
        if (event) {
            this.qryBlkModel.ojLocationCode = event.code;
        }

    }
    /*
    * this event is fired when housing location is selected for level_2
    */
    onDspLevTwoClick(event) {
        this.rglulevel3Rg = [];
        if (event) {
            this.qryBlkModel.fromCity = event.code;
            this.dspLevelThreeLink = 'oidbutab/rgLuLevel3RecordGroup?agylocId=' + this.qryBlkModel.arrestAgencyLocId
            + '&livingUnitId=' + event.code;
            this.qryBlkModel.ojLocationCode = undefined;
        }
    }
    /*
    * this event is fired when To location is changed.
    */
    toLocChange(event) {
        const tolocValue = this.qryBlkModel.toAgyLocId === undefined ? '' : undefined;
        this.qryBlkModel.toAgyLocId = tolocValue;
    }
    /*
    * this event is fired when To location is selected.
    */
    onToLocClick(event) {
        if (event) {
            this.qryBlkModel.toAgyLocId = event.code;
            this.cityFlag = true;
            this.toLocFlag = false;
        } else {
            this.cityFlag = false;
            this.toLocFlag = true;
        }
        if ( !this.qryBlkModel.toAgyLocId && !this.qryBlkModel.toCity ) {
            this.cityFlag = false;
            this.toLocFlag = false;
        }
    }
    /*
        * this event is fired when To TA is changed.
        */
    onToTaChange(event) {
        const cityValue = this.qryBlkModel.toCity === undefined ? '' : undefined;
        this.qryBlkModel.toCity = cityValue;
    }
    /*
    * this event is fired when To TA is selected.
    */
    onToTaClick(event) {
            this.vhbData = [];
            if (event) {
                this.qryBlkModel.toCity = event.code;
                this.cityFlag = false;
                this.toLocFlag = true;
            } else {
                this.toLocFlag = false;
            }
            if ( !this.qryBlkModel.toAgyLocId && !this.qryBlkModel.toCity ) {
                this.cityFlag = false;
                this.toLocFlag = false;
            }
    }

    onOffenderChange(offender) {
    }
    onButClearClick() {
        if (this.qryBlkModel) {
            this.disabledFlag = false;
            this.confirmAll = false;
            this.qryBlkModel.directionCode = null;
            const arrestLocValue = this.qryBlkModel.arrestAgencyLocId === undefined ? '' : undefined;
            this.qryBlkModel.arrestAgencyLocId = arrestLocValue;
            this.qryBlkModel.fromAgyLocId = null;
            this.qryBlkModel.fromCity = null;
            this.qryBlkModel.ojLocationCode = null;
            const toagylocIdValue = this.qryBlkModel.toAgyLocId === undefined ? '' : undefined;
            this.qryBlkModel.toAgyLocId = toagylocIdValue;
            const toCityValue = this.qryBlkModel.toCity === undefined ? '' : undefined;
            this.qryBlkModel.toCity = toCityValue;
            const resonValue = this.qryBlkModel.movementReasonCode === undefined ? '' : undefined;
            this.qryBlkModel.movementReasonCode = resonValue;
            this.reqReason = false;
            this.commentText = null;
            this.vhbData = [];
            this.qryBlkModel.movementDate = DateFormat.getDate(); /*.setHours(0, 0, 0, 0);*/
            this.qryBlkModel.movementTime = DateFormat.getDate();
            this.rglulevel1Rg = [];
            this.rglulevel2Rg = [];
            this.rglulevel3Rg = [];
            this.enableAdd = false;
            this.dspLevelOne = null;
            this.toLocFlag = true;
            this.cityFlag = true;
            this.tolocLink = null;
            this.fromHouDisFlag = true;
        }
    }

    /*
    * this function is called when clicking the Retrieve button to validate the cntrl block
    */
    onButRetrieveClick() {
        this.confirmAll = false;
        if (!this.qryBlkModel.movementDate) {
            this.type = 'info';
            this.message = this.translateService.translate('oidbutab.datemustbeentered');
            this.show();
            return;
        }
        if (!this.qryBlkModel.movementTime) {
            this.type = 'info';
            this.message = this.translateService.translate('oidbutab.timemustbeentered');
            this.show();
            return;
        }
        if (DateFormat.compareDate(this.qryBlkModel.movementDate, DateFormat.getDate()) === 1) {
            this.type = 'info';
            this.message = this.translateService.translate('oidbutab.datecannotbelater');
            this.show();
            return;
        }
        if (DateFormat.compareDate(this.qryBlkModel.movementDate, DateFormat.getDate()) !== -1) {
            if (DateFormat.compareTime(this.qryBlkModel.movementTime, DateFormat.getDate()) === 1) {
                this.type = 'info';
                this.message = this.translateService.translate('oiduncta.movementtimecannotbelaterthancurrenttime');
                this.show();
                return;
            }
        }
        if (!this.qryBlkModel.directionCode) {
            this.type = 'info';
            this.message = this.translateService.translate('oidbutab.directionmustbeentered');
            this.show();
            return;
        }
        if (!this.qryBlkModel.arrestAgencyLocId) {
            this.type = 'info';
            this.message = this.translateService.translate('oidbutab.facilitymustbeentered');
            this.show();
            return;
        }
        if (this.qryBlkModel.directionCode === 'OUT') {
            if (!this.qryBlkModel.fromAgyLocId && !this.qryBlkModel.fromCity && !this.qryBlkModel.ojLocationCode) {
                this.type = 'info';
                this.message = this.translateService.translate('oidbutab.fromhousinglocationmustbeentered');
                this.show();
                return;
            }
            if (!this.qryBlkModel.toAgyLocId && !this.qryBlkModel.toCity) {
                this.type = 'info';
                this.message = this.translateService.translate('oidbutab.eithertolocationortaisrequired');
                this.show();
                return;
            }
            if (!this.qryBlkModel.movementReasonCode) {
                this.type = 'info';
                this.message = this.translateService.translate('oidbutab.reasonmustbeentered');
                this.show();
                return;
            }
            this.enableAdd = true;
        } else {
            this.enableAdd = false;
        }
        this.vhbExecuteQuery();
    }

    /*
    * this function is called when clicking the Retrieve button to load the data into offenders block.
    */
    vhbExecuteQuery() {
        this.confirmall = false;
        this.dataRetrival = false;
        this.rowLength = 0;
        this.vhbModel = new VHeaderBlock();
        if (!this.qryBlkModel.movementDate) {
            this.type = 'info';
            this.message = this.translateService.translate('oidbutab.datemustbeentered');
            this.show();
            return;
        }
        if (!this.qryBlkModel.movementTime) {
            this.type = 'info';
            this.message = this.translateService.translate('oidbutab.timemustbeentered');
            this.show();
            return;
        }
        if (this.qryBlkModel.directionCode === 'IN') {
            this.vhbModel.inOutStatus = 'OUT';
        }
        if (this.qryBlkModel.directionCode === 'OUT') {
            this.vhbModel.inOutStatus = 'IN';
            if (this.qryBlkModel.ojLocationCode) {
                this.dspLev3 = this.qryBlkModel.ojLocationCode;
                this.vhbModel.livingUnitId = this.dspLev3;
            } else if (this.qryBlkModel.fromCity) {
                this.dspLev2 = this.qryBlkModel.fromCity;
                this.vhbModel.livingUnitId = this.dspLev2;
            } else if (this.qryBlkModel.fromAgyLocId) {
                this.dspLev1 = this.qryBlkModel.fromAgyLocId;
                this.vhbModel.livingUnitId = this.dspLev1;
            }
        }

        this.vhbModel.agyLocId = this.qryBlkModel.arrestAgencyLocId;
        const vhbResult = this.oidbutabFactory.vhbExecuteQuery(this.vhbModel);
        vhbResult.subscribe(vhbResultList => {
            this.confirmDisable = false;
            if (this.qryBlkModel.directionCode === 'OUT') {
                this.enableAdd = true;
            } else {
                this.enableAdd = false;
            }
            if (vhbResultList.length === 0) {
                this.type = 'info';
                this.message = this.translateService.translate('oidscexm.querycausednorecords');
                this.show();
                this.vhbData = [];
                this.disabledFlag = false;
            } else {
                for (let i = 0; i < vhbResultList.length; i++) {
                    vhbResultList[i].lastName = vhbResultList[i].lastName + ',' + vhbResultList[i].firstName;
                    vhbResultList[i].movementReason = this.qryBlkModel.movementReasonCode;
                    vhbResultList[i].image = this.translateService.translate('common.select');
                    if (this.qryBlkModel.directionCode === 'OUT') {
                        if (this.qryBlkModel.toAgyLocId) {
                            vhbResultList[i].locationCode = this.qryBlkModel.toAgyLocId;
                        } else if (this.qryBlkModel.toCity) {
                            vhbResultList[i].ethnicity = this.qryBlkModel.toCity;
                        }
                    }
                }
                this.vhbData = vhbResultList;
                this.selected = 0;
                this.rowLength = this.vhbData.length;
                this.offIdIndex = this.vhbData.length;
                this.disabledFlag = true;
            }
        });
    }

    /**
    * This function onVhbInsert the messages
    */
    onVhbInsert = () => {
        if (this.vhbData) {
            for (let i = 0; i < this.vhbData.length; i++) {
                if (!this.vhbData[i].offenderIdDisplay) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oidbutab.recordmustbeenteredordeletedfirst');
                    this.show();
                    return;
                }
            }
        }
        const data = { image: '..', insertFlagStatus: true };
        return {
            image: this.translateService.translate('common.select'), offenderIdDisplay: undefined, lastName: undefined, livingUnitDescription: undefined,
            inOutStatus: undefined, agyLocId: undefined, offenderId: undefined, offenderBookId: undefined,
            activeFlag: undefined, locationCode: undefined, ethnicity: undefined, movementReason: undefined
        };
    }

    /**
    * This function displays the messages
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    onVhbClear() {
        if (this.confirmAll) {
            this.clearConfirmAll();
        }
        return true;
    }

    clearConfirmAll() {
        this.confirmAll = undefined;
    }

    /**
    *  This function will be executed when commit event is
    * fired
    */
    oidbutabSavevhbForm(event) {
        this.vhbInsertList = event.added;
        if (this.selected > 0) {
            this.vhbInsertList.push(this.vhbData[this.selected]);
            this.selected = -1;
        }
        this.vhbUpdateList = event.updated;
        this.vhbCommitModel.insertList = [];
        this.vhbCommitModel.updateList = [];
        if (this.vhbUpdateList.length > 0) {
            for (let i = 0; i < this.vhbUpdateList.length; i++) {
                this.vhbUpdateList[i].activeDatetime = DateFormat.getDate(this.qryBlkModel.movementDate.setHours(0, 0, 0));
                const hh = this.qryBlkModel.movementTime.getHours();
                const mm = this.qryBlkModel.movementTime.getMinutes();
                const ss = this.qryBlkModel.movementTime.getSeconds();
                this.vhbUpdateList[i].activeDatetime = DateFormat.getDate(this.qryBlkModel.movementDate.setHours(hh, mm, ss));

                this.vhbUpdateList[i].inOutStatus = this.qryBlkModel.directionCode;
                if (this.qryBlkModel.directionCode === 'OUT') {
                    if (this.qryBlkModel.ojLocationCode) {
                        this.dspLev3 = this.qryBlkModel.ojLocationCode;
                        this.vhbUpdateList[i].livingUnitId = this.dspLev3;
                    } else if (this.qryBlkModel.fromCity) {
                        this.dspLev2 = this.qryBlkModel.fromCity;
                        this.vhbUpdateList[i].livingUnitId = this.dspLev2;
                    } else if (this.qryBlkModel.fromAgyLocId) {
                        this.dspLev1 = this.qryBlkModel.fromAgyLocId;
                        this.vhbUpdateList[i].livingUnitId = this.dspLev1;
                    }
                }
                this.vhbUpdateList[i].locationCode = this.qryBlkModel.toAgyLocId; /* to agylocid */
                this.vhbUpdateList[i].statusReason = this.commentText;
                this.vhbUpdateList[i].createuserId = this.sessionManager.getId();
                if (this.vhbUpdateList[i].offenderId === this.offenderId) {
                    if (this.vhbInsertList) {
                        for (let j = 0; j < this.vhbInsertList.length; j++) {
                            if (this.vhbInsertList[j].offenderId === this.vhbUpdateList[i].offenderId) {
                                this.vhbUpdateList.splice(i, 1);
                            }
                        }
                    }
                    this.vhbInsertList.push(this.vhbUpdateList[i]);
                    this.vhbUpdateList.splice(i, 1);
                }
                if (!this.vhbUpdateList[i].insertedFlag) {
                    this.vhbUpdateList.splice(i, 1);
                    i = i - 1;
                }
            }
        }

        for (let i = 0; i < this.vhbUpdateList.length; i++) {
            this.confirmMove = this.vhbUpdateList[i].insertedFlag;
            if (this.confirmMove === true) {
                this.vhbUpdateList[i].activeFlag = 'Y';
            }
            if (this.qryBlkModel.directionCode === 'IN') {
                this.vhbUpdateList[i].inOutStatus = 'IN';
            } else {
                this.vhbUpdateList[i].inOutStatus = 'OUT';
            }
            if (!this.qryBlkModel.toAgyLocId) {
                this.vhbUpdateList[i].locationCode = null;
            }
            if (!this.qryBlkModel.toCity) {
                this.vhbUpdateList[i].ethnicity = null;
            }
        }
        for (let i = 0; i < this.vhbInsertList.length; i++) {
            this.confirmMove = this.vhbInsertList[i].insertedFlag;
            if (this.confirmMove === true) {
                this.vhbInsertList[i].activeFlag = 'Y';
            }
            this.vhbInsertList[i].activeDatetime = DateFormat.getDate(this.qryBlkModel.movementDate.setHours(0, 0, 0));
            const hh = this.qryBlkModel.movementTime.getHours();
            const mm = this.qryBlkModel.movementTime.getMinutes();
            const ss = this.qryBlkModel.movementTime.getSeconds();
            this.vhbInsertList[i].activeDatetime = DateFormat.getDate(this.qryBlkModel.movementDate.setHours(hh, mm, ss));
            if (this.vhbInsertList[i].insertedFlag && this.vhbInsertList[i].agyLocId !== this.qryBlkModel.arrestAgencyLocId) {
                this.type = 'info';
                this.message = this.translateService.translate('oidbutab.thisoffendernotbelongstodesignedinstitution');
                this.show();
                return;
            }
            /* from agylocId is binded to  agyLocId property */
            this.vhbInsertList[i].agyLocId = this.qryBlkModel.arrestAgencyLocId;
            if (this.vhbInsertList[i].insertedFlag && this.vhbInsertList[i].inOutStatus !== 'IN') {
                this.type = 'info';
                this.message = this.translateService.translate('oidbutab.thisoffendercannotbemovedinoutdirection');
                this.show();
                return;
            }
            this.vhbInsertList[i].inOutStatus = this.qryBlkModel.directionCode;
            if (this.qryBlkModel.ojLocationCode) {
                this.dspLev3 = this.qryBlkModel.ojLocationCode;
                this.vhbInsertList[i].livingUnitId = this.dspLev3;
            } else if (this.qryBlkModel.fromCity) {
                this.dspLev2 = this.qryBlkModel.fromCity;
                this.vhbInsertList[i].livingUnitId = this.dspLev2;
            } else if (this.qryBlkModel.fromAgyLocId) {
                this.dspLev1 = this.qryBlkModel.fromAgyLocId;
                this.vhbInsertList[i].livingUnitId = this.dspLev1;
            }
            /* to agylocid is binded to locationCode property in vheaderblock bean*/
            this.vhbInsertList[i].locationCode = this.qryBlkModel.toAgyLocId;
            this.vhbInsertList[i].statusReason = this.commentText;
            this.vhbInsertList[i].createuserId = this.sessionManager.getId();
            if (!this.vhbInsertList[i].insertedFlag) {
                this.vhbInsertList.splice(i, 1);
            }
        }

        if (this.vhbUpdateList.length === 0 && this.vhbInsertList.length === 0) {
            this.type = 'info';
            this.message = this.translateService.translate('common.nochangestosave');
            this.show();
            return;
        }
        this.vhbCommitModel.updateList = this.vhbUpdateList;
        this.vhbCommitModel.insertList = this.vhbInsertList;
        const vhbSaveData = this.oidbutabFactory.vhbCommit(this.vhbCommitModel);
        vhbSaveData.subscribe(data => {
            this.offenderId = 0;
            this.selected = -1;
            if (data === 101) {
                this.dataRetrival = false;
                this.type = 'info';
                this.message = this.translateService.translate('oidbutab.thisOffenderalreadyintherecordset');
                this.show();
                this.vhbExecuteQuery();
            } else if (data > 0) {
                this.dataRetrival = false;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.vHeaderBlockModelBean = new VHeaderBlock2();
                this.vHeaderBlockModelBean.offenderIdDisplay = this.vheaderBlockModel.offenderIdDisplay;
                this.vHeaderBlockModelBean.agyLocId = this.sessionManager.currentCaseLoad;
                this.vHeaderBlockModelBean.agyLocType = this.sessionManager.currentCaseLoadType;
                const searchResult = this.osiosearFactory.
                    offbkgGlobalQuery(this.vHeaderBlockModelBean);
                searchResult.subscribe(vhbList => {
                    if (vhbList.length > 0) {
                        this.vheaderBlockModel = vhbList[0];
                        this.offenderSearchService.selectedOffender = this.vheaderBlockModel;
                    }
                });
                this.vhbExecuteQuery();
                this.confirmAll = false;
                this.commentText = '';
            } else {
                this.dataRetrival = false;
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.vhbExecuteQuery();
                this.confirmAll = false;
                this.commentText = '';
            }
        });
    }

/*
    * this method is called when offenderIdis changed.
    */
    validateVhbData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'offenderIdDisplay' && event.newValue !== event.oldValue && event.newValue !== undefined) {
            this.namesrchModel = new VNameSearch();
            this.namesrchModel.offenderIdDisplay = event.data.offenderIdDisplay.trim();
            if (this.namesrchModel.offenderIdDisplay.length > 0) {
                for (let i = Number(String(this.namesrchModel.offenderIdDisplay).length); i < 10; i++) {
                    this.namesrchModel.offenderIdDisplay = '0' + this.namesrchModel.offenderIdDisplay;
                }
                const namesrchResult = this.oiinamesFactory.namesrchExecuteQuery(this.namesrchModel);
                namesrchResult.subscribe(data => {
                    if (data.length === 0) {
                        this.namesrchData = [];
                        this.type = 'info';
                        this.message = this.translateService.translate('oidbutab.thisoffenderdoesnotexists');
                        this.show();
                        this.grid.setColumnData('offenderIdDisplay',index,undefined);
                        this.grid.setColumnData('lastName',index,undefined);
                        this.grid.setColumnData('livingUnitDescription',index,undefined);
                        rowdata.validated = true;
                        rowdata.data = {
                            image: '..', lastName: undefined,
                            livingUnitDescription: undefined, insertedFlag: undefined
                        };
                        return rowdata;
                    } else {
                        if (data[0].activeFlag === 'N' || event.data.activeFlag === 'I') {
                            this.type = 'info';
                            this.message = this.translateService.translate('oidbutab.thisoffenderdoesnotexists');
                            this.show();
                            this.grid.setColumnData('offenderIdDisplay',index,undefined);
                            this.grid.setColumnData('lastName',index,undefined);
                            this.grid.setColumnData('livingUnitDescription',index,undefined);
                            rowdata.validated = true;
                            rowdata.data = {
                                image: '..', lastName: undefined,
                                livingUnitDescription: undefined, insertedFlag: undefined
                            };
                            return rowdata;
                        }
                        if (data[0].agyLocId && data[0].agyLocId !== this.qryBlkModel.arrestAgencyLocId) {
                            this.type = 'info';
                            this.message = this.translateService.translate('oidbutab.thisoffendernotbelongstodesignedinstitution');
                            this.show();
                            rowdata.validated = true;
                            rowdata.data = {
                                image: '..', lastName: undefined,
                                livingUnitDescription: undefined, insertedFlag: undefined
                            };
                            this.grid.setColumnData('offenderIdDisplay', index, undefined);
                            this.grid.setColumnData('lastName', index, undefined);
                            this.grid.setColumnData('livingUnitDescription', index, undefined);
                            this.grid.setColumnData('insertedFlag', index, undefined);
                            return rowdata;
                        } else if (data[0].inOutStatus && this.qryBlkModel.directionCode && data[0].inOutStatus !== 'IN') {
                            this.type = 'info';
                            this.message = this.translateService.translate('oidbutab.thisoffendercannotbemovedinoutdirection');
                            this.show();
                            rowdata.validated = true;
                            rowdata.data = {
                                image: '..', lastName: undefined, offenderIdDisplay: undefined,
                                livingUnitDescription: undefined, insertedFlag: undefined
                            };
                            this.grid.setColumnData('offenderIdDisplay', index, undefined);
                            this.grid.setColumnData('lastName', index, undefined);
                            this.grid.setColumnData('livingUnitDescription', index, undefined);
                            this.grid.setColumnData('insertedFlag', index, undefined);
                        } else {
                            this.grid.setColumnData('insertedFlag', index, 'true');
                            this.grid.setColumnData('locationCode', index, this.qryBlkModel.toAgyLocId);
                            this.grid.setColumnData('ethnicity', index, this.qryBlkModel.toCity);
                            this.grid.setColumnData('movementReason', index, this.qryBlkModel.movementReasonCode);
                        }
                    }
                });
            } else {
                this.grid.setColumnData('offenderIdDisplay', index, undefined);
            }
        }
        if (event.field === 'insertedFlag' && event.newValue !== event.oldValue) {
            this.num = 0;
        this.falseNum = 0;
        this.vhbData.forEach(ele => {
            if (ele.insertedFlag) {
                this.num = this.num + 1;
            } else {
                this.falseNum = this.falseNum + 1;
            }
        });
        if (this.num > 0) {
        } else {
            this.confirmAll = undefined;
        }
        if (this.falseNum > 0) {
            this.confirmAll = undefined;
        } else {
            this.confirmAll = true;
        }
            if (event.data.insertedFlag) {
                this.offExMovementsModel.offenderBookId = event.data.offenderBookId;
                const hasLaterMovementData = this.oidbutabFactory.hasLaterMovement(this.offExMovementsModel);
                hasLaterMovementData.subscribe(data => {
                    if (data) {
                        this.repeationFlag--;
                        const validate = { valid: false };
                        this.lastMoveDate = DateFormat.getDate(data.movementDate);
                        this.lastMoveTime = DateFormat.getDate(data.movementTime);
                        if (DateFormat.compareDate(this.lastMoveDate, this.qryBlkModel.movementDate) === 1) {
                            validate.valid = true;
                            rowdata.validated = true;
                        }
                        if (DateFormat.compareDate(this.lastMoveDate, this.qryBlkModel.movementDate) === 0) {
                            if (DateFormat.compareTime(this.lastMoveTime, this.qryBlkModel.movementTime) === 1) {
                                validate.valid = true;
                            }
                        }
                        if (validate.valid) {
                            if (this.repeationFlag < 0) {
                                this.message = this.translateService.translate('oidbutab.thisoffendercannotbeconfirmed');
                                this.type = 'info';
                                this.show();
                            }
                            if (this.confirmAllFlag && this.repeationFlag > 0) {
                                this.message = this.translateService.translate('oidbutab.oneormoreoffendercannotbeconfirmed');
                                this.type = 'info';
                                this.show();
                                this.confirmAllFlag = false;
                            }
                            rowdata.validated = true;
                            this.grid.setColumnData('insertedFlag', index, undefined);
                        }
                    }
                });
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    /*
    * this event is fired when check the confirm all.
    */
    confirmAllEvent(event) {
        this.repeationFlag = 0;
        const rowData = this.vhbData;
        if (event) {
            for (let i = 0; i < rowData.length; i++) {
                this.grid.setColumnData('insertedFlag', i, event.checked);
                if (event.checked) {
                    this.repeationFlag++;
                }
            }
        }
        this.vhbData = rowData;
        if (event.checked) {
            this.confirmAllFlag = true;
        }
    }

    checkVal(event) {
        /* if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                this.type = 'info';
                this.message = 'List of Values contains no entries.';
                this.show();
            }
        } */
    }

}
