import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OummerofService } from '@sa/admin/mergeoffenders/service/oummerof.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderBookings } from '@inst/demographics-biometrics/beans/OffenderBookings';
import { Offenders } from '@commonbeans/Offenders';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { MergeTransactionBean } from '@sa/recordmaintenance/beans/MergeTransactionBean';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { Images } from '@common/beans/Images';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
// import required bean declarations

@Component({
    selector: 'app-oummerof',
    templateUrl: './oummerof.component.html'
})

export class OummerofComponent implements OnInit {
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offbooksData: OffenderBookings[] = [];
    offbooksDataTemp: OffenderBookings[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offbooksModel: OffenderBookings = new OffenderBookings();
    offbooksIndex: Number = 0;
    offbooksInsertList: OffenderBookings[] = [];
    offbooksUpdatetList: OffenderBookings[] = [];
    offbooksDeleteList: OffenderBookings[] = [];
    offbooks2Data: OffenderBookings[] = [];
    offbooks2DataTemp: OffenderBookings[] = [];
    offbooks2Model: OffenderBookings = new OffenderBookings();
    offbooks2Index: Number = 0;
    offbooks2InsertList: OffenderBookings[] = [];
    offbooks2UpdatetList: OffenderBookings[] = [];
    offbooks2DeleteList: OffenderBookings[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    offBooks2ColumnDef: any[];
    offBooksColumnDef: any[];
    offBooksReadOnly: Boolean = false;
    offBooks2ReadOnly: Boolean = false;
    msglist: any[];
    message: any;
    type: any;
    withoutdata: boolean;
    offenderObj: Offenders = new Offenders();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    clearFlag: boolean;
    prevFlag: boolean;
    nextFlag: boolean;
    voffbkgIndex = 0;
    voffbkgModel: VHeaderBlock = new VHeaderBlock();
    voffbkgData: VHeaderBlock[] = [];
    offenderSelectFlag: boolean;
    retrieveFlag: boolean;
    lstOfVHeader: any;
    launchFlag: boolean;
    noneditfields: boolean;
    namesFlag: boolean;
    index = 0;
    tableIndex: number;
    mrgTrnBean: MergeTransactionBean = new MergeTransactionBean();
    mrgprocModel: MergeTransactionBean = new MergeTransactionBean();
    tableIndexTwo: number;
    imageModel: Images = new Images();
    vldmsg: string;
    newOffenderId: number;
    resultValue: string;
    constructor(private oummerofFactory: OummerofService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService, private injectOffenderService: InjectOffenderService, 
        private osiosearchService: OsiosearService, private offenderSearchService: OffenderSearchService) {
        this.offBooks2ColumnDef = [];
        this.offBooksColumnDef = [];
    }
    ngOnInit() {
        this.oummerofFactory.checkFlag = true;
        this.display = true;
        this.withoutdata = true;
        this.clearFlag = true;
        this.launchFlag = true;
        this.disabled = true;
        this.retrieveFlag = true;
        this.prevFlag = true;
        this.nextFlag = true;
        this.offenderSelectFlag = true;
        this.noneditfields = true;
        
        this.offBooks2ColumnDef = [
            { fieldName: this.translateService.translate('oummerof.infonumber'), field: 'bookingNo', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oummerof.begindate'), field: 'bookingBeginDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oummerof.enddate'), field: 'bookingEndDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oummerof.bookingstatus'), field: 'cgnbtBookingStatus', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oummerof.activefacility'), field: 'activeFlag', editable: false, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oummerof.activeagency'), field: 'communityActiveFlag', editable: false,
                width: 150, datatype: 'checkbox'
            },
        ];

        this.offBooksColumnDef = [
            { fieldName: this.translateService.translate('oummerof.infonumber'), field: 'bookingNo', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oummerof.begindate'), field: 'bookingBeginDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oummerof.enddate'), field: 'bookingEndDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oummerof.bookingstatus'), field: 'cgnbtBookingStatus', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oummerof.activefacility'), field: 'activeFlag', editable: false, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oummerof.activeagency'), field: 'communityActiveFlag', editable: false,
                width: 150, datatype: 'checkbox'
            },
        ];
    }
    /**
     * This function displays the messages
     */
    show(vldmsg, type) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickoffbooks(event) {
        if (event) {
            this.offbooksModel = event;
        }
    }
    onRowClickoffbooks2(event) {
        if (event) {
            this.offbooks2Model = event;
        }
    }

    offbooksExecuteQuery() {
        this.offbooksModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offbooksModel.offenderId = this.vHeaderBlockModel.offenderId;
        this.offbooksModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
        const offbooksResult = this.oummerofFactory.
            offBooksExecuteQuery(this.offbooksModel);
        offbooksResult.subscribe(offbooksResultList => {
            if (offbooksResultList.length === 0) {
                this.offbooksData = [];
            } else {
                offbooksResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.communityActiveFlag = element.communityActiveFlag === 'Y' ? true : false;
                    element.trustAccountFlagTemp = element.trustAccountFlag === 'Y' ? true : false;
                    element.trustAccountFlag = element.trustAccountFlag === 'Y' ? true : false;
                });
                this.offbooksData = offbooksResultList;
                this.offbooksModel = offbooksResultList[0];
                this.tableIndex = 0;
            }
        });
    }
    offbooks2ExecuteQuery() {
        this.offbooks2Model.offenderBookId = this.voffbkgModel.offenderBookId;
        this.offbooks2Model.offenderId = this.voffbkgModel.offenderId;
        this.offbooks2Model.rootOffenderId = this.voffbkgModel.rootOffenderId;
        const offbooks2Result = this.oummerofFactory.
            offBooksExecuteQuery(this.offbooks2Model);
        offbooks2Result.subscribe(offbooks2ResultList => {
            if (offbooks2ResultList.length === 0) {
                this.offbooks2Data = [];
            } else {
                offbooks2ResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.communityActiveFlag = element.communityActiveFlag === 'Y' ? true : false;
                    element.trustAccountFlagTemp = element.trustAccountFlag === 'Y' ? true : false;
                    element.trustAccountFlag = element.trustAccountFlag === 'Y' ? true : false;
                });
                this.offbooks2Data = offbooks2ResultList;
                this.offbooks2Model = offbooks2ResultList[0];
                this.tableIndexTwo = 0;
            }
        });
    }

    enableLaunch() {
        if (!this.withoutdata && !this.offenderSelectFlag) {
            this.launchFlag = false;
        } else {
            this.launchFlag = true;
        }
    }

    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
            this.vHeaderBlockOffender = this.vHeaderBlockModel;
            this.clearFlag = false;
            this.voffbkgModel = new VHeaderBlock();
            this.lstOfVHeader = [];
            this.voffbkgData = [];
            this.voffbkgIndex = 0;
            this.launchFlag = false;
            this.display = true;
            this.retrieveFlag = false;
            this.prevFlag = true;
            this.nextFlag = true;
            this.namesFlag = false;
            this.withoutdata = false;
            this.offenderSelectFlag = false;
            this.clearFlag = true;
            this.offbooksExecuteQuery();
            this.offbooks2Data = [];
        } else {
            this.withoutdata = true;
            this.display = true;
            this.clearFlag = true;
            this.launchFlag = true;
            this.namesFlag = false;
            this.retrieveFlag = true;
            this.prevFlag = true;
            this.nextFlag = true;
            this.voffbkgModel = new VHeaderBlock();
            this.lstOfVHeader = [];
            this.voffbkgData = [];
            this.voffbkgIndex = 0;
            this.index = 0;
            this.noneditfields = true;
            this.offenderSelectFlag = false;
            this.offbooksData = [];
        }
    }

    cancel() {
        this.display = true;
        this.launchFlag = false;
        this.clearFlag = true;
        this.voffbkgModel = new VHeaderBlock();
        this.disabled = true;
        this.namesFlag = false;
        this.retrieveFlag = false;
        this.prevFlag = true;
        this.nextFlag = true;
        this.lstOfVHeader = [];
        this.voffbkgData = [];
        this.voffbkgIndex = 0;
        this.index = 0;
        this.offenderSelectFlag = false;
        this.noneditfields = true;
        this.offbooks2Data = [];
    }
    isInsertable() {
        this.clearFlag = false;
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }
        if (this.offenderSelectFlag) {
            this.show(this.translateService.translate('common.fieldisprotectedagainstupdate'), 'warn');
            return false;
        }
    }
    reasonChangeEvent() {
        this.clearFlag = false;
    }
    voffbkgExecuteQuery() {
        this.voffbkgIndex = 0;
        if (this.voffbkgModel.offenderIdDisplay === this.vHeaderBlockModel.offenderIdDisplay) {
            this.prevFlag = true;
            this.nextFlag = true;
            this.offenderSelectFlag = false;
            this.show(this.translateService.translate('oummerof.querycaused'), 'error');
            return;
        }
        this.voffbkgModel.agyLocId = this.vHeaderBlockModel.agyLocId;
        this.voffbkgModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.voffbkgModel.offenderIdDisplay = this.voffbkgModel.offenderIdDisplay;
        this.voffbkgModel.insertedFlag = false;
        const voffbkgResult = this.oummerofFactory.vOffBkgExecuteQuery(this.voffbkgModel);
        voffbkgResult.subscribe(voffbkgList => {
            if (voffbkgList.length === 0) {
                this.voffbkgData = [];
                this.prevFlag = true;
                this.nextFlag = true;
                this.offenderSelectFlag = false;
                this.retrieveFlag = false;
                this.show(this.translateService.translate('oummerof.querycaused'), 'error');
            } else {
                this.voffbkgData = voffbkgList;
                this.lstOfVHeader = voffbkgList;
                this.voffbkgModel = voffbkgList[0];
                this.launchFlag = true;
                this.prevFlag = false;
                this.display = false;
                this.noneditfields = false;
                this.offenderSelectFlag = true;
                this.clearFlag = false;
                this.retrieveFlag = true;
                if (voffbkgList.length > 1) {
                    this.nextFlag = false;
                }
                this.offbooks2ExecuteQuery();
            }
        });
    }
    afterNamesDialogClose() {
        this.prevFlag = true;
        this.nextFlag = true;
        if (this.oummerofFactory.nameLovData && this.oummerofFactory.nameLovData.offenderIdDisplay) {
            this.retrieveFlag = true;
            if (this.oummerofFactory.nameLovData.offenderIdDisplay) {
                this.offenderSelectFlag = false;
                this.voffbkgModel.offenderIdDisplay = this.oummerofFactory.nameLovData.offenderIdDisplay;
                if (this.vHeaderBlockModel.offenderIdDisplay !== this.oummerofFactory.nameLovData.offenderIdDisplay) {
                    if (this.oummerofFactory.nameLovData.activeFlag === 'A') {
                        this.voffbkgModel.agyLocId = this.vHeaderBlockModel.agyLocId;
                        this.voffbkgModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                        this.voffbkgModel.offenderIdDisplay = this.voffbkgModel.offenderIdDisplay;
                        this.voffbkgModel.insertedFlag = false;
                        const voffbkgResult = this.oummerofFactory.
                            vOffBkgExecuteQuery(this.voffbkgModel);
                        voffbkgResult.subscribe(voffbkgList => {
                            if (voffbkgList.length === 0) {
                                this.voffbkgData = [];
                                this.prevFlag = true;
                                this.nextFlag = true;
                                this.offenderSelectFlag = false;
                                this.retrieveFlag = false;
                                this.launchFlag = false;
                                this.oummerofFactory.nameLovData = undefined;
                                this.show(this.translateService.translate('oummerof.querycaused'), 'error');
                            } else {
                                this.voffbkgData = voffbkgList;
                                this.lstOfVHeader = voffbkgList;
                                this.voffbkgModel = voffbkgList[0];
                                this.offbooks2ExecuteQuery();
                                this.launchFlag = true;
                                this.prevFlag = true;
                                this.display = false;
                                this.noneditfields = false;
                                this.offenderSelectFlag = true;
                                this.retrieveFlag = false;
                                this.clearFlag = false;
                                if (voffbkgList.length > 1) {
                                    this.nextFlag = false;
                                }
                                this.oummerofFactory.nameLovData = undefined;
                            }
                        });
                    } else {
                        this.retrieveFlag = false;
                        this.launchFlag = false;
                        this.oummerofFactory.nameLovData = undefined;
                    }
                } else {
                    this.retrieveFlag = false;
                    this.launchFlag = false;
                    this.show(this.translateService.translate('oummerof.querycaused'), 'error');
                    this.oummerofFactory.nameLovData = undefined;
                }
            }
        } else {
            this.retrieveFlag = false;
            this.launchFlag = false;
            this.oummerofFactory.nameLovData = undefined;
        }
    }
    onLovMouseDown() {
        if (!this.vHeaderBlockModel && !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }
    }
    onReasonChange() {
        this.clearFlag = false;
        this.voffbkgModel.nbtAssignReason = this.voffbkgModel.nbtAssignReason === undefined ? '' : undefined;
    }
    /**
        * This function is used to navigate between records
        */
    butOffendersKeyPrevItemTrigger() {
        if (this.lstOfVHeader.length === 0) {
            return;
        }
        this.clearFlag = false;
        this.offenderSelectFlag = true;
        if (this.voffbkgIndex >= 1) {
            this.voffbkgIndex = this.voffbkgIndex - 1;
            this.index = this.voffbkgIndex;
            this.voffbkgModel = this.lstOfVHeader[this.voffbkgIndex];
            this.nextFlag = false;
            this.offbooks2ExecuteQuery();
        } else {
            this.prevFlag = true;
            this.nextFlag = false;
            this.show(this.translateService.translate('common.atfirstrecord'), 'warn');
        }
    }
    /**
    * This function is used to navigate between records
    */
    butOffendersKeyNextItemTrigger() {
        if (this.lstOfVHeader.length === 0) {
            return;
        }
        this.clearFlag = false;
        this.offenderSelectFlag = true;
        if ((this.voffbkgIndex) < this.lstOfVHeader.length - 1) {
            this.voffbkgIndex = this.index + 1;
            this.voffbkgModel = this.lstOfVHeader[this.voffbkgIndex];
            this.index = this.index + 1;
            this.prevFlag = false;
            this.offbooks2ExecuteQuery();
        } else {
            this.show(this.translateService.translate('common.lastrecordof'), 'warn');
            this.nextFlag = true;
            this.prevFlag = false;
        }
    }

    get disableCaseNoteButton() {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderIdDisplay && this.voffbkgModel && this.voffbkgModel.offenderIdDisplay) {
            return false;
        } else {
            return true;
        }
    }
    onContactLogsClick = () => {
        if (this.vHeaderBlockModel.offenderId === this.voffbkgModel.offenderId) {
            this.type = 'warn';
            this.vldmsg = this.translateService.translate('oummerof.sameoffenderscannotbemerged');
            this.show(this.vldmsg, this.type);
            return false;
          }
          if (this.vHeaderBlockModel.bookingStatus === 'O' &&  this.voffbkgModel.bookingStatus === 'O') {    //S4-24263
            this.type = 'warn';
            this.vldmsg = this.translateService.translate('oummerof.cantmergetwooffendersactive');
            this.show(this.vldmsg, this.type);
            return false;
          }
          /* if (this.vHeaderBlockModel.statusDisplay === 'Inactive') {    //S4-24263
            this.type = 'warn';
            this.vldmsg = this.translateService.translate('oummerof.fromoffendershouldbeactive');
            this.show(this.vldmsg, this.type);
            return false;
          } */
          /* if (this.voffbkgModel.bookingStatus === 'O') {
            this.type = 'warn';
            this.vldmsg = this.translateService.translate('oummerof.tooffenderbookingstatusshouldbeclose');
            this.show(this.vldmsg, this.type);
            return false;
          } */
        const data = {
            label: this.translateService.translate('The merge process cannot be reversed.' + ' Do you want to merge' + ' ' + 'Offender:'
                + ' ' + this.vHeaderBlockModel.offenderIdDisplay + ' ' + this.vHeaderBlockModel.lastName + ',' + this.vHeaderBlockModel.firstName + ' ' +
                'into' + ' ' + 'Offender:' + ' ' + this.voffbkgModel.offenderIdDisplay + ' ' + this.voffbkgModel.lastName + ','
                + this.voffbkgModel.firstName),
            yesBtn: true, yesLabel: 'Yes', noBtn: true,
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
            if (result) {
                this.manualCreateRequest();
            }
        });
    }
    /**
     * This Function is used for History screen button validation
     */
    onHistoryClick = () => {
        if (!this.vHeaderBlockModel.offenderIdDisplay || !this.voffbkgModel.offenderIdDisplay) {
            this.show('oummerof.pleaseselectthetwooffenderstomerge', 'warn');
            return;
        }
        this.mrgprocModel = new MergeTransactionBean();
        this.mrgprocModel.pFromOffBookId = this.offbooksModel.offenderBookId;//S4-24590
        this.mrgprocModel.pFromRootOffId = this.offbooksModel.rootOffenderId;
        this.mrgprocModel.pFromOffenderId = this.offbooksModel.offenderId;
        this.mrgprocModel.pFromOffIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
        this.mrgprocModel.pFromLastname = this.vHeaderBlockModel.lastName;
        this.mrgprocModel.pFromFirstName = this.vHeaderBlockModel.firstName;
        this.mrgprocModel.pFromBookingNo = this.vHeaderBlockModel.bookingNo;

        this.mrgprocModel.pToOffBookId = this.voffbkgModel.offenderBookId;
        this.mrgprocModel.pToRootOffId = this.voffbkgModel.rootOffenderId;
        this.mrgprocModel.pToOffenderId = this.voffbkgModel.offenderId;
        this.mrgprocModel.pToOffIdDisplay = this.voffbkgModel.offenderIdDisplay;
        this.mrgprocModel.pToLastName = this.voffbkgModel.lastName;
        this.mrgprocModel.pToFirstName = this.voffbkgModel.firstName;
        this.mrgprocModel.pMergeTransactionId = null;

        const checkTrnData = this.oummerofFactory.chkOffendersForTransfer(this.mrgprocModel);
        checkTrnData.subscribe(result => {
            if (this.vHeaderBlockModel.statusDisplay === 'Inactive') {
                this.type = 'warn';
                this.vldmsg = this.translateService.translate('oummerof.fromoffendershouldbeactive');
                this.show(this.vldmsg, this.type);
                return false;
              }
            if (result === 1) {
                this.type = 'warn';
                this.vldmsg = this.translateService.translate('oummerof.exsameoffdrsmergerequest');
                this.show(this.vldmsg, this.type);
                return false;
            }else if (result === 2) {
                this.type = 'warn';
                this.vldmsg = this.translateService.translate('oummerof.exnotenoughbooking');
                this.show(this.vldmsg, this.type);
                return false;
            }else if (result === 3) {
                this.type = 'warn';
                this.vldmsg = this.translateService.translate('oummerof.exbothoffendersactive');
                this.show(this.vldmsg, this.type);
                return false;
            }else if (result === 4) {
                this.type = 'warn';
                this.vldmsg = this.translateService.translate('oummerof.exinactiveafteractivebook');
                this.show(this.vldmsg, this.type);
                return false;
            }else if (result === 5) {
                this.type = 'warn';
                this.vldmsg = this.translateService.translate('oummerof.trustvalidation');
                this.show(this.vldmsg, this.type);
                return false;
            }else  if (result === 0) {
                this.resultValue = 'success'
            }

            if (this.resultValue && this.resultValue === 'success') {
                this.oummerofFactory.mrgprocModel = this.mrgprocModel;
                const transfData = this.dialogService.openLinkDialog('/OUMTRNBK', this.mrgprocModel, 80);
                transfData.subscribe(result => {
                    if (result === 'success') {
                        this.getNewOffId();
                        this.offbooks2Data = [];
                        setTimeout(() => {
                            this.injectOffenderService.updateOffenderInContext(this.newOffenderId);
                        }, 700);
                    }
                });
              }
        });
    }
    manualCreateRequest() {
        this.mrgTrnBean.pToOffBookId = this.voffbkgModel.offenderBookId;
        this.mrgTrnBean.pToRootOffId = this.voffbkgModel.rootOffenderId;
        this.mrgTrnBean.pToOffenderId = this.voffbkgModel.offenderId;
        this.mrgTrnBean.pToOffIdDisplay = this.voffbkgModel.offenderIdDisplay;
        this.mrgTrnBean.pToLastName = this.voffbkgModel.lastName;
        this.mrgTrnBean.pToFirstName = this.voffbkgModel.firstName;

        this.mrgTrnBean.pFromOffBookId = this.vHeaderBlockModel.offenderBookId;
        this.mrgTrnBean.pFromRootOffId = this.vHeaderBlockModel.rootOffenderId;
        this.mrgTrnBean.pFromOffenderId = this.vHeaderBlockModel.offenderId;
        this.mrgTrnBean.pFromOffIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
        this.mrgTrnBean.pFromLastname = this.vHeaderBlockModel.lastName;
        this.mrgTrnBean.pFromFirstName = this.vHeaderBlockModel.firstName;
        this.mrgTrnBean.pFromBookingNo = this.vHeaderBlockModel.bookingNo;

        const processdata = this.oummerofFactory.manualCreateRequest(this.mrgTrnBean);
        processdata.subscribe(data => {
            if (data && data === 'success') {
                this.show(this.translateService.translate('oummerof.successfullymergedoffender') +
                    this.mrgTrnBean.pFromOffIdDisplay + 'into offender' + this.mrgTrnBean.pToOffIdDisplay, 'success');
                    this.offbooks2Data = [];
                let offenderId = this.vHeaderBlockModel.offenderId;
                if (this.vHeaderBlockModel.statusDisplay == 'Inactive') {//S4-24263
                    offenderId = this.voffbkgModel.offenderId
                }
                this.injectOffenderService.updateOffenderInContext(offenderId);
                this.voffbkgModel = undefined;
            } else if (data && data.includes('-20870')) {
                this.show(this.translateService.translate('oummerof.exduplicatemergerequest'), 'warn');
            } else {
                this.show(this.translateService.translate('oummerof.erroroccured'), 'warn');
            }
        });
    }  

    onButModDetailOiinamesDialog = () => {
        this.dialogService.openLinkDialog('/osinamesdialog', event, 50).subscribe(result => {
            if (result) {
                this.voffbkgModel.lastName = result.lastName;
                this.voffbkgModel.firstName = result.firstName;
                this.voffbkgModel.middleName = result.middleName;
                this.voffbkgExecuteQuery();
            }
        });
    }

    getNewOffId() {
        const offId = this.oummerofFactory.getNewOffId(this.vHeaderBlockModel.offenderBookId);//S4-24590
        offId.subscribe(result => {
            this.newOffenderId = result;
        });
    }


    onlyAlphabetallowed(event:any){
        let charcode = event.keyCode;
        if (charcode == 39  || charcode == 32 || charcode == 45 || (charcode >= 65 && charcode <= 90) || (charcode >= 97 && charcode <= 122)){
            return true; //validation for " ' , a-z , A-Z "
        }  
        return false;
    }

    onPaste(event){
        let str = event.clipboardData.getData('text');
        for (let i = 0; i < str.length; i++) {
            let kC = str.charAt(i).charCodeAt(0);
            let ev = { keyCode : kC}
            if(!this.onlyAlphabetallowed(ev)){
               return false;
            }
        }
        return true;
    }
}
