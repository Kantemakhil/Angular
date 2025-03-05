import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { Router } from '@angular/router';
import { AgyIntLocAmendQuery } from '@inst/movements/maintenance/beans/AgyIntLocAmendQuery';
import { OumhlhisService } from '@inst/movements/maintenance/service/oumhlhis.service';
import { OimmholoService } from '@inst/movements/maintenance/service/oimmholo.service';
import { Location } from '@angular/common';
import { OimcountService } from '@inst/automated-counts/maintenance/service/oimcount.service';
@Component({
    selector: 'app-oumhlhis',
    templateUrl: './oumhlhis.component.html'
})

export class OumhlhisComponent implements OnInit {
    codes: any[] = [];
    @Input() namesearch: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    vagyintlocamendData: AgyIntLocAmendQuery[] = [];
    vagyintlocamendDataTemp: AgyIntLocAmendQuery[] = [];
    vagyintlocamendModel: AgyIntLocAmendQuery = new AgyIntLocAmendQuery();
    vagyintlocamendInsertList: AgyIntLocAmendQuery[] = [];
    vagyintlocamendUpdatetList: AgyIntLocAmendQuery[] = [];
    vagyintlocamendDeleteList: AgyIntLocAmendQuery[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    intLocL4ColumnDef: any[];
    intLocL3ColumnDef: any[];
    intLocL2ColumnDef: any[];
    intLocL1ColumnDef: any[];
    usagesColumnDef: any[];
    vAgyIntLocAmendColumnDef: any[];
    agyLocReadOnly: boolean;
    livingunit1rgRg: any[] = [];
    livingunit2rgRg: any[] = [];
    livingunit3rgRg: any[] = [];
    livingunit4rgRg: any[] = [];
    cellblocklink: any;
    searchDisablrd: boolean;
    cellblocklinkTitles = { 'description': this.trMsg('common.code') };
    cellvaluesTitles = { 'description': this.trMsg('common.code') };
    BedlinkvalueTitles = { 'description': this.trMsg('common.code') };
    BedlinkTitles = { 'description': this.trMsg('common.code') };
    Bedlink: string;
    linkvalues: string;
    facility: string;
    cellvalues: string;
    level1Code: any;
    livingUnitId: any;
    livingUnitCode: any;
    livingUnitDescription: any;
    historyFromDate: Date;
    historyToDate: Date;
    Bedlinkvalues: string;
    clearDisabled: boolean;
    BedLov: any;
    searchDisabled: boolean;
    namesReadOnly: boolean;
    dateReadOnly: boolean;
    facilityLov: any;
    cellLov: any;
    BedlinkLov: any;
    BedlinkLovData: any;
    cell2ReadonlyData: boolean;
    cell3ReadonlyData: boolean;
    cell4ReadonlyData: boolean;
    exitHistory: boolean;
    exitFlag: boolean;
    intLocIdMap: Map<string, string> = new Map<string, string>();
    facilityTemp: any;
    constructor(private oumhlhisFactory: OumhlhisService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private router: Router, public oimcountFactory: OimcountService,
        private oimmholoFactory: OimmholoService,
        private location: Location) {
        this.intLocL4ColumnDef = [];
        this.intLocL3ColumnDef = [];
        this.intLocL2ColumnDef = [];
        this.intLocL1ColumnDef = [];
        this.usagesColumnDef = [];
        this.vAgyIntLocAmendColumnDef = [];
    }
    ngOnInit() {
        this.clearDisabled = true;
        this.searchDisabled = false;
        this.namesReadOnly = false;
        this.historyToDate = DateFormat.getDate();
        const date = DateFormat.getDate().setMonth(DateFormat.getDate().getMonth() - 1);
        this.historyFromDate = DateFormat.getDate(date);
        this.agyLocReadOnly = true;
        this.vagyintlocamendModel.pAmendDateFrom = this.historyFromDate;
        this.vagyintlocamendModel.pAmendDateTo = this.historyToDate;
        this.exitHistory = false;
        this.exitFlag = true;

        if (this.namesearch) {
            this.facilityTemp = this.namesearch.agyLocId;
            this.facility = this.namesearch.agyLocId;
            this.cellblocklink = 'oumhlhis/livingUnit1RgRecordGroup?agyLocId=' + this.facility;
            this.getcodes();
            this.exitFlag = false;
        } else if (this.oimmholoFactory.livunitsModel.agyLocId) {
            this.facility = this.oimmholoFactory.livunitsModel.agyLocId;
            this.facilityTemp = this.oimmholoFactory.livunitsModel.agyLocId;
            this.cellblocklink = 'oumhlhis/livingUnit1RgRecordGroup?agyLocId=' + this.facility;
            this.facilityLov = String(this.oimmholoFactory.livunitsModel.livingUnitId);
        } else {
            this.vagyintlocamendModel.pAgyLocId = this.sessionManager.currentCaseLoad;
            this.facility = this.sessionManager.currentCaseLoad;
            this.facilityData();
        }
        if (this.oimmholoFactory.exitHistory) {
            this.exitHistory = true;
            this.exitFlag = false;

        }
        this.vAgyIntLocAmendColumnDef = [
            { fieldName: this.trMsg('common.location'), field: 'description', editable: false, width: 200 },
            { fieldName: this.trMsg('oumhlhis.item'), field: 'columnName', editable: false, width: 150 },
            { fieldName: this.trMsg('oumhlhis.changedfrom'), field: 'oldValue', editable: false, width: 200 },
            { fieldName: this.trMsg('oumhlhis.changedto'), field: 'newValue', editable: false, width: 200 },
            { fieldName: this.trMsg('oumhlhis.deactivereason'), field: 'deactivateReasonCode', editable: false, width: 150 },
            { fieldName: this.trMsg('oumhlhis.actionCode'), field: 'actionCode', editable: false, width: 150 },
            { fieldName: this.trMsg('common.date'), field: 'amendDate', editable: true, width: 200, datatype: 'date' },
            { fieldName: this.trMsg('common.userid'), field: 'amendUserId', editable: false, width: 200 },
        ];


    }
    facilityData() {
        const facilityConst = this.oumhlhisFactory.getAgyLocIdDescReturn();
        facilityConst.subscribe(facilityData => {
            if (facilityData !== null) {
                this.facilityTemp = facilityData;
                this.cellblocklink = 'oumhlhis/livingUnit1RgRecordGroup?agyLocId=' + this.facility;
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
    onButExitclick = () => {
        this.router.navigate(['/home']);
    }
    oumhlhisValidations() {
        const is = { valid: true };
        const historyFromDate = DateFormat.getDate(this.historyFromDate);
        const historyToDate = DateFormat.getDate(this.historyToDate);
        if (!this.historyFromDate) {
            this.show('oumhlhis.historyfrommustbeentered');
            is.valid = false;
            return;
        }
        if (DateFormat.compareDate(historyFromDate, DateFormat.getDate()) === 1) {
            this.show('oumhlhis.historyfrommustnotbegreaterthantoday');
            is.valid = false;
            return;
        }
        if (!this.historyToDate) {
            this.show('oumhlhis.historytomustbeentered');
            is.valid = false;
            return;
        }
        if (DateFormat.compareDate(historyToDate, DateFormat.getDate()) === 1) {
            this.show('oumhlhis.historytomustnotbegreaterthantoday');
            is.valid = false;
            return;
        }
        if (DateFormat.compareDate(historyFromDate, historyToDate) === 1) {
            this.show('oumhlhis.historyfromdateisgreaterthantodate');
            is.valid = false;
            return;
        }
        return is.valid;
    }
    getcodes() {
        const vagyintlocamendResult = this.oumhlhisFactory.getLivingunitId(this.facility);
    vagyintlocamendResult.subscribe(dataObj => {
        if (dataObj.length === 0) {
        } else {
            dataObj.forEach(ele => {
                if (this.namesearch.livingUnitCode === ele.level4Code) {
                    this.BedlinkLov = String(ele.level4Id);
                    this.BedLov = String(ele.level3Id);
                    this.cellLov = String(ele.level2Id);
                    this.facilityLov = String(ele.level1Id);
                } else if (this.namesearch.livingUnitCode === ele.level3Code) {
                    this.BedLov = String(ele.level3Id);
                    this.cellLov = String(ele.level2Id);
                    this.facilityLov = String(ele.level1Id);
                } else if (this.namesearch.livingUnitCode === ele.level2Code) {
                    this.cellLov = String(ele.level2Id);
                    this.facilityLov = String(ele.level1Id);
                }
            });
        }
    });
    }
    clearbtn() {
        this.vagyintlocamendData = [];
        this.vagyintlocamendModel = new AgyIntLocAmendQuery();
        this.vagyintlocamendModel.pAmendDateFrom = undefined;
        this.vagyintlocamendModel.pAmendDateTo = undefined;
        this.vagyintlocamendModel.pAgyLocId = undefined;
        this.livingUnitCode = undefined;
        this.BedlinkLovData = undefined;
        this.cellblocklink = undefined;
        this.livingUnitDescription = undefined;
        this.level1Code = undefined;
        this.cellvalues = undefined;
        this.BedLov = undefined;
        this.Bedlinkvalues = undefined;
        this.dateReadOnly = false;
        this.facilityLov = undefined;
        this.cellLov = undefined;
        this.BedlinkLov = undefined;
        this.BedLov = undefined;
        this.BedlinkLovData = undefined;
        this.clearDisabled = true;
        this.searchDisabled = false;
        this.namesReadOnly = false;
        this.historyToDate = DateFormat.getDate();
        const date = DateFormat.getDate().setMonth(DateFormat.getDate().getMonth() - 1);
        this.historyFromDate = DateFormat.getDate(date);
    }
    get cell2Readonly() {
        if (this.facilityLov && this.cell2ReadonlyData) {
            return false;
        } else {
            return true;
        }
    }
    get cell3Readonly() {
        if (this.facilityLov && this.cellLov && this.cell3ReadonlyData) {
            return false;
        } else {
            return true;
        }
    }
    get cell4Readonly() {
        if (this.facilityLov && this.cell4ReadonlyData) {
            return false;
        } else {
            return true;
        }
    }

    changeCellBlock(event) {
        if (event) {
            this.namesReadOnly = false;
            this.cellvalues = undefined;
            if (!this.namesearch) {
                this.BedLov = undefined;
            }
            this.Bedlinkvalues = undefined;
            this.searchDisabled = false;
            this.clearDisabled = false;
            this.level1Code = event.description;
            this.livingUnitId = event.code;
            this.cellvalues = 'oumhlhis/livingUnit2RgRecordGroup?livingUnitId=' + this.livingUnitId + '&level1Code=' +
                this.facility;
            this.changeCellBlockOption();
        } else {
            this.level1Code = null;
            this.cellLov = undefined;
            this.BedLov = undefined;
            this.BedlinkLov = undefined;
        }
    }
    changeCellBlockOption() {
        const vagyintlocamendResult = this.oumhlhisFactory.livingUnit2RgRecordGroup(this.livingUnitId, this.facility);
        vagyintlocamendResult.subscribe(data => {
            if (data.length === 0) {
                this.cell2ReadonlyData = false;
            } else {
                this.cell2ReadonlyData = true;
            }
        });
    }
    livingUnit2Change(event) {
        if (event) {
            if (!this.namesearch) {
                this.BedLov = undefined;
            }
            this.Bedlinkvalues = undefined;
            this.searchDisabled = false;
            this.livingUnitId = event.code;
            this.livingUnitCode = event.description;
            this.Bedlink = 'oumhlhis/livingUnit3RgRecordGroup?livingUnitId=' + this.livingUnitId + '&level2Code=' +
                this.facility;
            this.livingUnit2ChangeOption();
        } else {
            this.livingUnitCode = null;
            this.BedLov = undefined;
            this.BedlinkLov = undefined;
        }
    }
    livingUnit2ChangeOption() {
        const vagyintlocamendResult = this.oumhlhisFactory.livingUnit3RgRecordGroup(this.livingUnitId, this.facility);
        vagyintlocamendResult.subscribe(data => {
            if (data.length === 0) {
                this.cell3ReadonlyData = false;
            } else {
                this.cell3ReadonlyData = true;
            }
        });
    }
    BedlinkTitlesChange(event) {
        if (event) {
            this.Bedlinkvalues = undefined;
            this.searchDisabled = false;
            this.livingUnitId = event.code;
            this.livingUnitDescription = event.description;
            this.Bedlinkvalues = 'oumhlhis/livingUnit4RgRecordGroup?livingUnitId=' + this.livingUnitId + '&level3Code=' +
                this.facility;
            this.BedlinkTitlesChangeOption();
        } else {
            this.livingUnitDescription = null;
            this.BedlinkLov = undefined;
        }
    }
    BedlinkTitlesChangeOption() {
        const vagyintlocamendResult = this.oumhlhisFactory.livingUnit4RgRecordGroup(this.livingUnitId, this.facility);
        vagyintlocamendResult.subscribe(data => {
            if (data.length === 0) {
                this.cell4ReadonlyData = false;
            } else {
                this.cell4ReadonlyData = true;
            }
        });
    }
    BedlinkvalueTitlesChange(event) {
        if (event) {
            this.BedlinkLovData = event.description;
        } else {
            this.BedlinkLovData = null;
        }
    }
    isInsertable(date?, dateOne?) {
        if (this.cellblocklink || this.cellvalues || this.Bedlink || this.Bedlinkvalues) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
        if (date || dateOne) {
            this.clearDisabled = false;
        }
    }
    vagyintlocamendExecuteQuery(date?, dateOne?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                this.clearDisabled = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.clearDisabled = false;
                return;
            }
        }
        if (dateOne) {
            if (dateOne.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                this.clearDisabled = false;
                return;
            }
            if (String(dateOne.lastValue).indexOf('_') >= 0 && dateOne.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.clearDisabled = false;
                return;
            }
        }
        if (!this.oumhlhisValidations()) {
            return;
        }

        if (this.facilityLov) {
            this.vagyintlocamendModel.pLevel1Code = this.level1Code;
        }
        if (this.cellLov) {
            this.vagyintlocamendModel.pLevel2Code = this.livingUnitCode;
        }
        if (this.BedLov) {
            this.vagyintlocamendModel.pLevel3Code = this.livingUnitDescription;
        }
        if (this.BedlinkLov) {
            this.vagyintlocamendModel.pLevel4Code = this.BedlinkLovData;
        }
        if (this.historyFromDate) {
            this.vagyintlocamendModel.pAmendDateFrom = this.historyFromDate;
        }
        if (this.historyToDate) {
            this.vagyintlocamendModel.pAmendDateTo = this.historyToDate;
        }
        this.vagyintlocamendModel.pAgyLocId = this.facility;
        const vagyintlocamendResult = this.oumhlhisFactory.vAgyIntLocAmendExecuteQuery(this.vagyintlocamendModel);
        vagyintlocamendResult.subscribe(vagyintlocamendResultList => {
            if (vagyintlocamendResultList.length === 0) {
                this.vagyintlocamendData = [];
                this.show('common.querycaused');
                return;
            } else {
                this.vagyintlocamendData = vagyintlocamendResultList;
                this.vagyintlocamendModel = vagyintlocamendResultList[0];
                this.searchDisabled = true;
                this.clearDisabled = false;
                this.dateReadOnly = true;
                this.namesReadOnly = true;
            }
        });
    }
    onExitBtnClick = () => {
        // this.oimmholoFactory.livunitsModel = undefined;
        this.oimmholoFactory.exitHistory = false;
        this.location.back();
    }
}
