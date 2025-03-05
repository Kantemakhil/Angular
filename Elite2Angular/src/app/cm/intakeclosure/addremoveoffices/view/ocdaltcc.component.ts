import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdaltccService } from '../service/ocdaltcc.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderBookingAgyLocs } from '@cmintakeclosureaddremoveoffices/OffenderBookingAgyLocs';
import { OffenderBookingAgyLocsCommitBean } from '@cmintakeclosureaddremoveoffices/OffenderBookingAgyLocsCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { LovService } from '@ui-components/lov/lov.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { InjectOffenderService } from '@core/service/inject-offender.service';

// import required bean declarations

@Component({
    selector: 'app-ocdaltcc',
    templateUrl: './ocdaltcc.component.html'
})

export class OcdaltccComponent implements OnInit {
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offagyData: OffenderBookingAgyLocs[] = [];
    offagyDataTemp: OffenderBookingAgyLocs[] = [];
    offagyModel: OffenderBookingAgyLocs = new OffenderBookingAgyLocs();
    offagyRetriveModel: OffenderBookingAgyLocs = new OffenderBookingAgyLocs();
    offagyInsertList: OffenderBookingAgyLocs[] = [];
    offagyUpdatetList: OffenderBookingAgyLocs[] = [];
    offagyDeleteList: OffenderBookingAgyLocs[] = [];
    offagyOneData: OffenderBookingAgyLocs[] = [];
    offagy1DataTemp: OffenderBookingAgyLocs[] = [];
    offagyOneModel: OffenderBookingAgyLocs = new OffenderBookingAgyLocs();
    offagyCommitModel: OffenderBookingAgyLocsCommitBean = new OffenderBookingAgyLocsCommitBean();
    offagy1InsertList: OffenderBookingAgyLocs[] = [];
    offagy1UpdatetList: OffenderBookingAgyLocs[] = [];
    offagy1DeleteList: OffenderBookingAgyLocs[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    agylink: string;
    reasonLink: string;
    eventDate: Date;
    offagyColumnDefs: any[] = [];
    tableIndex = 1;
    saveBtn: boolean;
    clearBtn: boolean;
    addBtn: boolean;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    isRetrieveDis: boolean;
    isClear: boolean;
    @ViewChild('grid', {static: true}) grid: any;
    @ViewChild('grid1', {static: true}) grid1: any;
    selectedIndex = -1;
    agyLocData = [];
    parentCodeTitle = {
        'description': this.translateService.translate('common.name'),
        'code': this.translateService.translate('common.agency')
    };
    nextBtnFlagOne: boolean;
    previousBtnFlgone: boolean;
    nextBtnFlgOne: boolean;
    prevreadonly: boolean;
    Index: any;
    nextBtnFlg: boolean;
    previousBtnFlg: boolean;
    offagyBookLocColumnDefs: any[];
    tableIndex2 = -1;
    agylinkLov: string;
    insertGrid: boolean;
    vHeaderBlock: VHeaderBlock = new VHeaderBlock();
    constructor(private ocdaltccFactory: OcdaltccService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService,
        public lovService: LovService,private osiosearService: OsiosearService,
        private injectOffenderService: InjectOffenderService) {
        this.offagyColumnDefs = [];
    }
    ngOnInit() {
        this.nextBtnFlg = true;
        this.insertGrid = false;
        this.previousBtnFlg = true;
        this.agylinkLov = 'ocdaltcc/cgfkOffagy1DspDescription22RecordGroup?offenderBookId=';
        this.lovService.clear(this.LGANG);
        this.isRetrieveDis = true;
        this.isClear = true;
        this.saveBtn = true;
        this.clearBtn = true;
        this.addBtn = true;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
            this.show('common.pleasesearchforvalidoffender');
        }
        this.eventDate = undefined;
        this.offagyColumnDefs = [
            {
                fieldName: this.translateService.translate('common.adddate'), field: 'additionDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.location'), field: 'agyLocDescription', editable: false,
                width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.removedate'), field: 'removedDate', editable: false,
                width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('system-profile.statusatlocn'), field: 'offenderStatus', editable: true,
                datatype: 'lov', width: 150, link: 'ocdaltcc/offenderStatusRecordGroup',source:'OCMOHSTA',
                cellEditable: this.canOffStatusEdit
            },
        ];
        this.offagyBookLocColumnDefs = [];
        this.offagyBookLocColumnDefs = [{
            fieldName: this.translateService.translate('common.agencylocation') + '*',
            field: 'agyLocId', editable: true,source:'OUMAGLOC',
            datatype: 'lov', width: 150, link: this.agylinkLov, titles: {
                description: this.translateService.translate('common.name'),
                code: this.translateService.translate('common.agency')
            }, cellEditable: this.canCellEdit
        },
        {
            fieldName: this.translateService.translate('common.date') + '*', field: 'additionDate', editable: true,
            width: 150, datatype: 'date', maxlength: 240, cellEditable: this.canCellEdit
        },
        {
            fieldName: this.translateService.translate('common.time') + '*', field: 'additionTime', editable: true,
            width: 150, datatype: 'time', maxlength: 240, cellEditable: this.canCellEdit
        },
        {
            fieldName: this.translateService.translate('common.reason') + '*', field: 'reasonCode', editable: true,
            datatype: 'lov', width: 150, domain:'OPEN_CT_RSN' 
            // link: 'ocdaltcc/cgfkOffagy1DspDescriptionRecordGroup'
            , cellEditable: this.canCellEdit
        },
        {
            fieldName: this.translateService.translate('common.comment'), field: 'additionComment', editable: true,
            width: 150, datatype: 'text', maxlength: 240, cellEditable: this.canCellEdit
        },
        ]
        this.ocdaltccPopulateDetails();
    }
    canCellEdit = (data: any, index: number, field: string) => {
        if (data.createDatetime) {
            return false;
        }
        return true;
    }
    canOffStatusEdit = (data: any, index: number, field: string): boolean => {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.communityActiveFlag === 'N') {
            return false;
        }
        if (this.offagyOneModel.removedDate) {
            return false;
        } else {
            return true;
        }

    }
    /**
     * This function displays the messages
     */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    btnsEditable() {
        if (this.offagyRetriveModel.removedDate || this.offagyRetriveModel.offenderStatus) {
            this.isRetrieveDis = false;
        } else {
            this.isRetrieveDis = true;
        }
    }
    get readonlyFlag() {
        if (!this.vHeaderBlockModel) {
            return true;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.communityActiveFlag === 'N') {
            return true;
        } if (this.offagyOneModel.offenderBookId && this.offagyOneModel.caseloadId && this.offagyOneModel.agyLocId) {
            return true;
        }
        return false;
    }
    get addBtnFlag() {
        if (!this.vHeaderBlockModel) {
            return true;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.communityActiveFlag === 'N') {
            return true;
        } if (!(this.offagyOneModel.offenderBookId && this.offagyOneModel.caseloadId)) {
            return true;
        }
        return false;
    }
    get saveBtnFlag() {
        if (!this.vHeaderBlockModel) {
            return true;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.communityActiveFlag === 'N') {
            return true;
        } else if (!(this.offagyOneModel.offenderBookId && this.offagyOneModel.caseloadId)) {
            return false;
        }
        return true;
    }
    get clearBtnFlag() {
        if (!this.vHeaderBlockModel) {
            return true;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.communityActiveFlag === 'N') {
            return true;
        } else if (!(this.offagyOneModel.offenderBookId && this.offagyOneModel.caseloadId)) {
            return false;
        }
        return true;
    }
    get rettBtnFlg() {
        if (!this.vHeaderBlockModel) {
            return true;
        } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.communityActiveFlag === 'N') {
            return true;
        } else if (!(this.offagyOneModel.offenderBookId && this.offagyOneModel.caseloadId)) {
            return false;
        }
        return true;
    }
    onRowClickoffagy(event) {
        if (event) {
            this.offagyModel = event;
            this.lovService.clear(this.agylink);
            this.agylink = this.LGANG;
            this.ocdaltccPopulateDetails();
            this.agylinkLov = 'ocdaltcc/cgfkOffagy1DspDescription22RecordGroup?offenderBookId=' + this.vHeaderBlockModel.offenderBookId;
            this.offagyBookLocColumnDefs[0].link = this.agylinkLov;
            this.grid1.prepareAgColumnDef();
            this.nextBtnFlg = false;
        } else {
            this.offagyModel = new OffenderBookingAgyLocs();
        }
    }
    onOffenderChange(offender) {
        if (offender) {
            this.insertGrid = true;
            this.addBtn = false;
            this.vHeaderBlockModel = offender;
            this.agylink = this.LGANG;
            this.agylinkLov = 'ocdaltcc/cgfkOffagy1DspDescription22RecordGroup?offenderBookId=' + this.vHeaderBlockModel.offenderBookId;
            this.offagyBookLocColumnDefs[0].link = this.agylinkLov;
            this.grid1.prepareAgColumnDef();
            this.reasonLink = 'ocdaltcc/cgfkOffagy1DspDescriptionRecordGroup';
            this.ocdaltccexecuteQuery();
            this.dateValid();
            this.nextBtnFlg = false;
            this.previousBtnFlg = true;
        } else {
            this.insertGrid = false;
            this.offagyData = [];
            this.addBtn = true;
            this.saveBtn = true;
            this.clearBtn = true;
            this.offagyOneModel = new OffenderBookingAgyLocs();
            this.eventDate = undefined;
        }
    }
    // execute query
    ocdaltccexecuteQuery() {
        this.offagyModel = new OffenderBookingAgyLocs();
        this.offagyModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.offagyModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdaltccFactory.offagyExecuteQuery(this.offagyModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                this.agylink = this.LGANG;
                this.offagyData = data;
                this.tableIndex = 0;
                this.selectedIndex = 0;
                this.nextBtnFlg = false;
            }
        });
    }
    onRowClickoffagybooAgyLoc(event) {
        if (event) {
            this.offagyOneModel = event;
        }
    }
    onGridInsert = () => {
        if (this.offagyOneData.length > 0) {
            if (!this.offagyOneData[this.offagyOneData.length - 1].agyLocId) {
                this.show(this.translateService.translate('common.agencylocationmustbe'));
                return;
            }
            if (!this.offagyOneData[this.offagyOneData.length - 1].additionDate) {
                this.show(this.translateService.translate('common.datemustbeentereddate'));
                return;
            }
            if (!this.offagyOneData[this.offagyOneData.length - 1].additionTime) {
                this.show(this.translateService.translate('common.timemustbeentered'));
                return;
            }
            if (!this.offagyOneData[this.offagyOneData.length - 1].reasonCode) {
                this.show(this.translateService.translate('common.reasonmustbeentered'));
                return;
            }
        }
        return { additionDate: DateFormat.getDate(), additionTime: DateFormat.getDate() };
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    ocdaltccPopulateDetails() {
        this.offagyOneModel = new OffenderBookingAgyLocs();
        this.offagyOneModel.offenderBookId = this.offagyModel.offenderBookId;
        this.offagyOneModel.caseloadId = this.offagyModel.caseloadId;
        this.offagyOneModel.agyLocId = this.offagyModel.agyLocId;
        // this.offagyOneModel.reasonCode = this.offagyModel.reasonCode;
        const serviceObj = this.ocdaltccFactory.
            offagy1ExecuteQuery(this.offagyOneModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.tableIndex2 = -1;
            } else {
                this.tableIndex2 = 0;
                this.offagyOneData = data;
                data.forEach(element => {
                    element.additionTime = DateFormat.getDate(element.additionTime);
                });
                this.offagyOneModel = this.offagyOneData[0];
                this.agylink = this.LGANG;
            }
        });
    }
    /**
         *  This function will be executed when we click on next button in Conformation Assessment Detail block
         */
    onButNextclick() {
        if (this.offagyOneData[this.selectedIndex + 1]) {
            this.selectedIndex++;
            this.offagyOneModel = this.offagyOneData[this.selectedIndex];
            this.offagyOneModel.agyLocDescription = this.offagyData[this.selectedIndex].agyLocDescription;
            this.previousBtnFlg = false;
        } else {
            this.selectedIndex = this.offagyOneData.length - 1;
            this.show('common.lastrecordofquery');
            this.nextBtnFlg = true;
            return;
        }
    }
    /**
      *  This function will be executed when we click on previous button in Conformation Assessment Detail block
      */
    onButPreviousclick() {
        if (this.offagyOneData[this.selectedIndex - 1]) {
            this.selectedIndex--;
            this.offagyOneModel = this.offagyOneData[this.selectedIndex];
            this.offagyOneModel.agyLocDescription = this.offagyData[this.selectedIndex].agyLocDescription;
            this.nextBtnFlg = false;
        } else {
            this.selectedIndex = 0;
            this.show('common.atfirstrecord');
            this.previousBtnFlg = true;
            return;
        }
    }
    /**
    *  This function is used to enable/disable next button
    *
    */
    // get nextBtnFlg() {
    //     if (this.selectedIndex === -1 || this.vHeaderBlockModel === undefined) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    /**
      *  This function is used to enable/disable previous button
      */
    // get previousBtnFlg() {
    //     if (this.selectedIndex === 0 || this.vHeaderBlockModel === undefined) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    get LGANG(): string {
        return `ocdaltcc/cgfkOffagy1DspDescription22RecordGroup?offenderBookId=${this.vHeaderBlockModel.offenderBookId}`;
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdaltccSaveoffagyForm(event) {
        this.offagyInsertList = event.added;
        this.offagyUpdatetList = event.updated;
        this.offagyDeleteList = event.removed;
        this.offagyCommitModel.insertList = [];
        this.offagyCommitModel.updateList = [];
        this.offagyCommitModel.deleteList = [];
        if (this.offagyUpdatetList.length > 0) {
            this.offagyCommitModel.updateList = this.offagyUpdatetList;
        }
        const offagySaveData = this.ocdaltccFactory.offagyCommit(this.offagyCommitModel);
        offagySaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.ocdaltccexecuteQuery();
            } else {
                this.show('common.addupdateremoverecordfailed');
            }
        });
    }


    dateValid() {
        this.offagyOneModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const date = this.ocdaltccFactory.evntDate(this.offagyOneModel);
        date.subscribe(data => {
            if (data.eventDate) {
                this.eventDate = data.eventDate;
                this.eventDate = DateFormat.getDate(this.eventDate);
                //     if (this.offagyOneModel.additionDate) {
                //         if (DateFormat.compareDate(this.offagyOneModel.additionDate, this.eventDate) === -1) {
                //             this.show(this.translateService.translate('Date/Time must be later than intake date/time'));
                //             return;
                //         } else if (DateFormat.compareDate(DateFormat.getDate(this.offagyOneModel.additionDate),
                // DateFormat.getDate()) === 1) {
                //             this.show(this.translateService.translate('Date cannot be later than current date'));
                //             return;
                //         }
                //     }
                //     if (this.offagyOneModel.additionDate && this.offagyOneModel.additionTime) {
                //     if (DateFormat.compareDate(DateFormat.getDate(this.offagyOneModel.additionDate), this.eventDate) === 0
                //         && (DateFormat.compareTime(this.offagyOneModel.additionTime, DateFormat.getDate(this.eventDate.getTime())) < 0)) {
                //         this.show(this.translateService.translate('Date/Time must be later than intake date/time'));
                //         return;
                //     }
                // }
                //     if (DateFormat.compareDate(DateFormat.getDate(this.offagyOneModel.additionDate), DateFormat.getDate()) === 0
                //         && (DateFormat.compareTime(this.offagyOneModel.additionTime, DateFormat.getDate()) < 0)) {
                //         this.show(this.translateService.translate('Time cannot be later than current time'));
                //         this.offagyOneModel.additionTime = null;
                //         return;
                //     }
            } else {
                this.eventDate = undefined;
            }

        });

    }
    // isInsertable(date?) {
    //     if (this.offagyOneModel.agyLocId || this.offagyOneModel.additionDate || this.offagyOneModel.additionTime
    //         || this.offagyOneModel.reasonCode) {
    //         this.clearBtn = false;
    //     } else {
    //         this.clearBtn = true;
    //     }
    //     if (date) {
    //         this.clearBtn = false;
    //     }
    // }
    Add() {
        if (!(this.offagyOneModel.offenderBookId && this.offagyOneModel.caseloadId)) {
            return;
        }
        this.offagyOneModel = new OffenderBookingAgyLocs();
        this.offagyOneModel.additionDate = DateFormat.getDate();
        this.offagyOneModel.additionTime = DateFormat.getDate();
        this.saveBtn = false;
        this.clearBtn = false;
        this.addBtn = true;
    }
    Clear() {
        this.offagyOneModel = new OffenderBookingAgyLocs();
        this.offagyOneModel = this.offagyData[this.tableIndex];
        this.saveBtn = true;
        this.clearBtn = true;
        this.addBtn = false;
        this.nextBtnFlg = false;
        this.previousBtnFlg = true;
        this.selectedIndex = 0;
    }
    isValidRecord(list: any[]) {
        const is = { valid: true };
        if (list && Array.isArray(list)) {
            list.forEach(ele => {
                if (!ele.agyLocId) {
                    this.show(this.translateService.translate('common.agencylocationmustbe'));
                    is.valid = false;
                    return;
                }
                if (!ele.additionDate) {
                    this.show(this.translateService.translate('common.datemustbeentereddate'));
                    is.valid = false;
                    return;
                }
                if (!ele.additionTime) {
                    this.show(this.translateService.translate('common.timemustbeentered'));
                    is.valid = false;
                    return;
                }
                if (!ele.reasonCode) {
                    this.show(this.translateService.translate('common.reasonmustbeentered'));
                    is.valid = false;
                    return;
                }
                if (this.eventDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(ele.additionDate), this.eventDate) === 0
                        && (DateFormat.compareTime(ele.additionTime, DateFormat.getDate(this.eventDate.getTime())) < 0)) {
                        this.show(this.translateService.translate('ocdaltcc.datetimemustbelater'));
                        is.valid = false;
                        return;
                    }
                }
                if (this.eventDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(ele.additionDate), this.eventDate) === -1) {
                        this.show(this.translateService.translate('ocdaltcc.datetimemustbelater'));
                        is.valid = false;
                        return;
                    } else if (DateFormat.compareDate(DateFormat.getDate(ele.additionDate), DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('common.datecannotbelater'));
                        is.valid = false;
                        return;
                    }
                }
            });
        }
        return is.valid;
    }
    Save(event) {
        if (!this.isValidRecord(this.offagyOneData)) {
            return null;
        }
        // if (date) {
        /* if (date.lastValue === '0_/__/____') {
            this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
            return;
        }
        if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
            this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
            return;
        } */

        this.offagyUpdatetList = [];
        this.offagyInsertList = [];
        this.offagyInsertList = event.added;
        this.offagyCommitModel.insertList = [];
        this.offagyCommitModel.updateList = [];
        if (this.offagyInsertList.length > 0) {
            this.offagyInsertList.forEach(element => {
                element.caseloadId = this.sessionManager.currentCaseLoad;
                element.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                element.createDatetime = DateFormat.getDate();
                element.createUserId = this.sessionManager.getId();
            });
        }
        if (this.grid.updatedMap.size > 0) {
            this.offagyUpdatetList = [];
            this.offagyUpdatetList = this.grid.updatedMap;
            this.offagyCommitModel.updateList = this.offagyUpdatetList;
        }
        this.offagyCommitModel.insertList = this.offagyInsertList;
        const saveData = this.ocdaltccFactory.offagyCommit(this.offagyCommitModel);
        saveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
               // this.ocdaltccexecuteQuery();
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
            }

        });

    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.field === 'additionDate' || event.field === 'additionTime') {
            this.offagyOneModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const date = this.ocdaltccFactory.evntDate(this.offagyOneModel);
            date.subscribe(data => {
                if (data.eventDate) {
                    this.eventDate = data.eventDate;
                    this.eventDate = DateFormat.getDate(this.eventDate);
                } else {
                    this.eventDate = undefined;
                }
                rowdata.validated = true;
                return rowdata;
            });
        }
        return rowdata;
    }
}

