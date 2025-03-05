import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumpurgeService } from '../service/oumpurge.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderBookings } from '@instdemographicsbeans/OffenderBookings';
import { OffenderBookingsCommitBean } from '@instdemographicsbeans/OffenderBookingsCommitBean';
import { VHeaderBlockCommitBean } from '@inst/movement-external/beans/VHeaderBlockCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
    selector: 'app-oumpurge',
    templateUrl: './oumpurge.component.html'
})

export class OumpurgeComponent implements OnInit {
    checkoneshows: boolean;
    lvCount: any;
    // @ViewChild('grid') grid: any;    
    disableTwo: boolean;
    // Variable declaration
    msgs: any[] = [];
    offData: VHeaderBlock[] = [];
    offModel: VHeaderBlock = new VHeaderBlock();
    offSearchModel: VHeaderBlock = new VHeaderBlock();
    offCommitModel: VHeaderBlockCommitBean = new VHeaderBlockCommitBean();
    offIndex = -1;
    offInsertList: VHeaderBlock[] = [];
    offUpdatetList: VHeaderBlock[] = [];
    offDeleteList: VHeaderBlock[] = [];
    offbkgData: OffenderBookings[] = [];
    offbkgModel: OffenderBookings = new OffenderBookings();
    offbkgCommitModel: OffenderBookingsCommitBean = new OffenderBookingsCommitBean();
    offbkgIndex = -1;
    offbkgInsertList: OffenderBookings[] = [];
    offbkgUpdatetList: OffenderBookings[] = [];
    offbkgDeleteList: OffenderBookings[] = [];
    offBkgColumnDef: any[];
    offColumnDef: any[];
    msglist: any[];
    message: any;
    type: any;
    retrievedisabled: boolean;
    clearDisabled: boolean;
    disableSearchFields: boolean;
    offalertUpdateList: any;
    porgressStatus: string;
    saveFlag: string;
    offenderDisabled: boolean;
    sealOffenderDisabled: boolean;
    bookingDisabled: boolean;
    sealBookingDisabled: boolean;
    purgeData: string;
    sealData: string;
    sealAccesValue: boolean;
    constructor(private oumpurgeFactory: OumpurgeService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService) {
        // TODO initilize data members here..!
        this.offBkgColumnDef = [];
        this.offColumnDef = [];
    }
    ngOnInit() {
        this.purgeData = this.translateService.translate('oumpurge.sealoffender');
        this.sealData = this.translateService.translate('oumpurge.sealbooking');
        this.retrievedisabled = false;
        this.clearDisabled = true;
        this.disableSearchFields = false;
        this.offenderDisabled = true;
        this.sealOffenderDisabled = true;
        this.bookingDisabled = true;
        this.sealBookingDisabled = true;
        this.offColumnDef = [
            { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oumpurge.trustaccount'), field: 'locationCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oumpurge.sealed') + '?', field: 'sealFlag', editable: false, width: 150 },
        ];
        this.offBkgColumnDef = [
            { fieldName: this.translateService.translate('common.createdate'), field: 'bookingBeginDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('system-profile.book-id'), field: 'bookingNo', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.status'), field: 'inOutStatus', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'agyLocId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.active') + '?', field: 'activeFlag', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.comm-agency'), field: 'intakeAgyLocId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.active') + '?', field: 'communityActiveFlag', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oumpurge.sealed') + '?', field: 'sealFlag', editable: false, width: 150 },
        ];
        this.getSealButtonAccessPermission();
        this.offExecuteQuery();


    }

    isInsertable() {
        if (this.offSearchModel.offenderIdDisplay || this.offSearchModel.lastName
            || this.offSearchModel.firstName) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }

    /**
     * This function displays the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onRowClickoff(event) {
        this.offModel = new VHeaderBlock();
        this.offbkgModel = new OffenderBookings();
        if (event) {
            this.offModel = event;
            if (event.offenderId) {
                this.offbkgModel.offenderId = event.offenderId;
                this.offbkgExecuteQuery();
            }
            this.retrievedisabled = true;
            this.getLvCountSealBookings();
            if (!this.offModel.sealFlag || this.offModel.sealFlag === 'N') {
                this.purgeData = this.translateService.translate('oumpurge.sealoffender');
                // this.offbkgModel.sealed = event.sealFlag;
            } else {
                this.purgeData = this.translateService.translate('oumpurge.unsealoffender');
            }
        }
    }
    onRowClickoffbkg(event) {
        this.disableTwo = true;
        if (event) {
            this.offbkgModel = event;
            if (this.offModel.sealFlag === 'Y') {
                this.sealBookingDisabled = true;
            } else {
                this.sealBookingDisabled = false;
            }
            if(this.offModel.sealFlag === 'N') {
                if (!this.offbkgModel.sealFlag || this.offbkgModel.sealFlag === 'N') {
                    this.sealData = this.translateService.translate('oumpurge.sealbooking');
                } else {
                    this.sealData = this.translateService.translate('oumpurge.unsealbooking');
                }
            } else {
                this.sealData = this.translateService.translate('oumpurge.sealbooking');
            }
           
        }
    }
    cancel() {
        this.retrievedisabled = false;
        this.clearDisabled = true;
        this.disableSearchFields = false;
        this.offenderDisabled = true;
        this.sealOffenderDisabled = true;
        this.bookingDisabled = true;
        this.sealBookingDisabled = true;
        this.offData = [];
        this.offbkgData = [];
        this.offSearchModel = new VHeaderBlock();
        this.offModel = new VHeaderBlock();
        this.offbkgModel = new OffenderBookings();
    }

    offExecuteQuery() {
        const queryParams = {
            caseLoadId: this.sessionManager.currentCaseLoad,
            createuserId: this.sessionManager.currentCaseLoadType
        };
        const serviceObj = this.oumpurgeFactory.offExecuteQuery(queryParams);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycausedReEnter');
                this.show();
                this.offenderDisabled = true;
                this.sealOffenderDisabled = true;
                this.bookingDisabled = true;
                this.sealBookingDisabled = true;
            } else {
                data.forEach(element => {
                    if (!element.sealFlag) {
                        element.sealFlag = 'N';
                    }
                });
                this.retrievedisabled = true;
                this.clearDisabled = false;
                this.disableSearchFields = true;
                this.offData = data;
                this.offIndex = 0;
                this.offModel = this.offData[0];
                this.offenderDisabled = false;
                this.sealOffenderDisabled = false;
                this.offbkgModel.offenderId = this.offModel.offenderId;
                // this.offbkgExecuteQuery();
            }
        });

    }

    /**
    * This function loads the data into the Master Record and its child records
    */
    offbkgExecuteQuery() {
        this.offbkgModel.rootOffenderId = this.offModel.rootOffenderId;
        const serviceObj = this.oumpurgeFactory.
            offBkgExecuteQuery(this.offbkgModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offbkgData = [];
                this.bookingDisabled = true;
                this.sealBookingDisabled = true;
            } else {
                data.forEach(element => {
                    if (!element.sealFlag) {
                        element.sealFlag = 'N';
                    }
                });
                this.offbkgData = data;
                this.offbkgIndex = 0;
                this.bookingDisabled = false;
                this.sealBookingDisabled = false;
            }
        });
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    offCommit(event) {
        // TODO declare commit bean and add insert list to that object.
        // this.offInsertList = event.added;
        // this.offUpdatetList = event.updated;
        // this.offDeleteList = event.removed;
        this.offCommitModel.insertList = [];
        this.offCommitModel.updateList = [];
        this.offCommitModel.deleteList = [];
        // this.offalertUpdateList.push(this.offModel);
        this.offCommitModel.updateList = this.offalertUpdateList;


        // if (this.offInsertList.length > 0 || this.offalertUpdateList.length > 0) {
        //     for (let i = 0; i < this.offalertUpdateList.length; i++) {
        //         this.offCommitModel.updateList = this.offalertUpdateList;
        //     }
        // }
        const offSaveData = this.oumpurgeFactory.offCommit(this.offCommitModel);
        offSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.offExecuteQuery();
                this.show();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }


    /**
     *  This function will be executed when commit event is
    * fired
    */
    offbkgCommit(event) {
        // TODO declare commit bean and add insert list to that object.
        // this.offbkgInsertList = event.added;
        // this.offbkgUpdatetList = event.updated;
        // this.offbkgDeleteList = event.removed;
        this.offbkgCommitModel.insertList = [];
        this.offbkgCommitModel.updateList = [];
        this.offbkgCommitModel.deleteList = [];
        if (this.offbkgInsertList.length > 0 || this.offbkgUpdatetList.length > 0) {
            for (let i = 0; i < this.offbkgUpdatetList.length; i++) {
                this.offbkgCommitModel.updateList = this.offbkgUpdatetList;
            }
        }
        const offbkgSaveData = this.oumpurgeFactory.offBkgCommit(this.offbkgCommitModel);
        offbkgSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }

    onOffenderGridClear = () => {
        this.offExecuteQuery();
        return true;
    }

    onBookingGridClear = () => {
        this.offbkgExecuteQuery();
        return true;
    }


    getLvCountSealBookings() {
        this.offbkgModel.rootOffenderId = this.offModel.rootOffenderId;
        const serviceObj = this.oumpurgeFactory.
            getLvCountSealBookings(this.offbkgModel.rootOffenderId);
        serviceObj.subscribe(bkgCount => {
            if (bkgCount === 0) {
                this.lvCount = 0;
            } else {
                this.lvCount = bkgCount;
            }
        });
    }
    onClickPurgeOffenderUp(event) {
        this.offModel.statusReason = event;
        this.porgressStatus = undefined;
        const serviceObj = this.oumpurgeFactory.
            purgeOffenderCommit(this.offModel);
        serviceObj.subscribe(result => {
            this.porgressStatus = undefined;
            if (result && result.offenderId === 20) {
                const Dialogdata = {
                    label: this.translateService.translate('oumpurge.areyousureyouwanttopurgeoffender')+' ' + this.offModel.offenderIdDisplay + '?',
                    yesBtn: true, noBtn: true, allowLineGap: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(resultOne => {
                    if (resultOne) {
                        this.onClickSealBookingUP();
                        this.porgressStatus = this.translateService.translate('oumpurge.purgeinprogress');
                    }
                });
            }
            if (result && result.offenderId === 11) {
                const Dialogdata = {
                    label: this.translateService.translate('oumpurge.areyousureyouwanttopurgeoffenderbookingrecord')+' ' + this.offbkgModel.bookingNo + '?',
                    yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(resultTwo => {
                    if (resultTwo) {
                        this.onClickSealBookingUP();
                        this.porgressStatus = this.translateService.translate('oumpurge.purgeinprogress');
                    }
                });
            }
            if (result && result.offenderId === 2) {
                this.message = this.translateService.translate('oumpurge.offenderhastrustaccountincaseload')+ ' ' + result.sealFlag;
                // this.message = String(this.message).replace('&ID&', result.sealFlag);
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 3) {
                this.message = this.translateService.translate('oumpurge.offendermustnothaveanyactivebookingpleasecloseanactivebooking');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 4) {
                this.message = this.translateService.translate('oumpurge.pleaseselectoffendertopurge');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 18) {
                this.message = this.translateService.translate('oumpurge.nobookingrecordtopurge');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 19) {
                this.message = this.translateService.translate('oumpurge.purgingthelastbookingrecordisnotallowed');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 5) {
                this.message = this.translateService.translate('oumpurge.offenderrecorexistsinsorcontroltablesPurgeprocesswillbeaborted');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 6) {
                this.message = this.translateService.translate('oumpurge.closetrustaccountbeforepurgingoffender');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 7) {
                this.message = this.translateService.translate('oumpurge.thisoffenderhasunclearedpayableaccountsoffenderrecordcannotbepurged');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 9) {
                this.message = this.translateService.translate('oumpurge.closetrustaccountbeforepurgingoffender');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 10) {
                this.message = this.translateService.translate('oumpurge.offenderhasunclearedpayableaccountscannotbepurged');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 12) {
                this.message = this.translateService.translate('oumpurge.closetrustaccountbeforesealingoffender');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 13) {
                this.message = this.translateService.translate('oumpurge.thisoffenderhasunclearedpayableaccountsoffenderrecordcannotbesealed');
                this.type = 'warn';
                this.show();
                return;
            }
        });
    }

    onClickPurgeBookingDown(event) {
        if(event==='SEALOFFENDER'){
           this.offbkgModel.sealFlag= this.offModel.sealFlag;
           this.offbkgModel.rootOffenderId= this.offModel.rootOffenderId;
           this.offbkgModel.statusReason = event;
        } else {
            this.offbkgModel.statusReason = event;
        }
        this.porgressStatus = undefined;
        const serviceObj = this.oumpurgeFactory.
            purgeOffenderCommit(this.offbkgModel);
        serviceObj.subscribe(result => {
            this.porgressStatus = undefined;
            if (result && result.offenderId === 14) {
                if(this.lvCount > 0){
                    this.message = this.translateService.translate('oumpurge.sealalltheexistingbookingrecordsfirst');
                    this.type = 'warn';
                    this.show();
                    return;
                }
                const Dialogdata = {
                    label: this.translateService.translate('oumpurge.areyousureyouwanttosealoffender')+' ' + this.offModel.offenderIdDisplay + ' ' + this.offModel.lastName + ',' +this.offModel.firstName + '?',
                    yesBtn: true, noBtn: true, allowLineGap: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(resultThree => {
                    if (resultThree) {
                        this.onClickSealBookingDown();
                        this.porgressStatus = this.translateService.translate('oumpurge.sealinginprogress');
                    }
                });
            }
            if (result && result.offenderId === 11) {
                const Dialogdata = {
                    label: this.translateService.translate('oumpurge.areyousureyouwanttopurgeoffenderbookingrecord')+' ' + this.offbkgModel.bookingNo + '?',
                    yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(resultTwo => {
                    if (resultTwo) {
                        this.onClickSealBookingDown();
                        this.porgressStatus = this.translateService.translate('oumpurge.purgeinprogress');
                    }
                });
            }
            if (result && result.offenderId === 15) {
                const Dialogdata = {
                    label: this.translateService.translate('oumpurge.areyousureyouwanttounsealoffender') + ' ' + this.offModel.offenderIdDisplay + ' ' + this.offModel.lastName + ',' +this.offModel.firstName + '?',
                    yesBtn: true, noBtn: true, allowLineGap: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(resultFour => {
                    if (resultFour) {
                        this.onClickSealBookingDown();
                        this.porgressStatus = this.translateService.translate('oumpurge.unsealinginprogress');
                    }
                });
            }
            if (result && result.offenderId === 16) {
                if(this.offbkgModel.bookingStatus === 'O'){
                    this.message = this.translateService.translate('oumpurge.sealinganactivebookingisnotallowed');
                    this.type = 'warn';
                    this.show();
                    return;
                }
                const Dialogdata = {
                    label: this.translateService.translate('oumpurge.areyousureyouwanttosealoffenderbooking')+ ' ' + this.offbkgModel.bookingNo + ' ' + this.offModel.lastName + ',' +this.offModel.firstName + '?',
                    yesBtn: true, noBtn: true, allowLineGap: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(resultFour => {
                    if (resultFour) {
                        this.onClickSealBookingDown();
                        this.porgressStatus = this.translateService.translate('oumpurge.sealinginprogress');
                    }
                });
            }
            if (result && result.offenderId === 17) {
                const Dialogdata = {
                    label: this.translateService.translate('oumpurge.areyousureyouwanttoUnsealoffenderbooking')+ ' ' + this.offbkgModel.bookingNo + ' ' + this.offModel.lastName + ',' +this.offModel.firstName + '?',
                    yesBtn: true, noBtn: true, allowLineGap: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(resultFour => {
                    if (resultFour) {
                        this.onClickSealBookingDown();
                        this.porgressStatus = this.translateService.translate('oumpurge.unsealinginprogress');
                    }
                });
            }
            if (result && result.offenderId === 2) {
                this.message = this.translateService.translate('oumpurge.offenderhastrustaccountincaseload')+ ' ' + result.sealFlag;
                // this.message = String(this.message).replace('&ID&', result.sealFlag);
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 3) {
                this.message = this.translateService.translate('oumpurge.offendermustnothaveanyactivebookingpleasecloseanactivebooking');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 4) {
                this.message = this.translateService.translate('oumpurge.pleaseselectoffendertopurge');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 18) {
                this.message = this.translateService.translate('oumpurge.nobookingrecordtopurge');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 19) {
                this.message = this.translateService.translate('oumpurge.purgingthelastbookingrecordisnotallowed');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 5) {
                this.message = this.translateService.translate('oumpurge.offenderrecorexistsinsorcontroltablesPurgeprocesswillbeaborted');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 6) {
                this.message = this.translateService.translate('oumpurge.closetrustaccountbeforepurgingoffender');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 7) {
                this.message = this.translateService.translate('oumpurge.thisoffenderhasunclearedpayableaccountsoffenderrecordcannotbepurged');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 9) {
                this.message = this.translateService.translate('oumpurge.closetrustaccountbeforepurgingoffender');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 10) {
                this.message = this.translateService.translate('oumpurge.offenderhasunclearedpayableaccountscannotbepurged');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 12) {
                this.message = this.translateService.translate('oumpurge.closetrustaccountbeforesealingoffender');
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 13) {
                this.message = this.translateService.translate('oumpurge.thisoffenderhasunclearedpayableaccountsoffenderrecordcannotbesealed');
                this.type = 'warn';
                this.show();
                return;
            }
        });
    }

    onClickSealBookingUP() {
        const serviceObj = this.oumpurgeFactory.whenTimerExpired(this.offModel);
        serviceObj.subscribe(result => {
            this.porgressStatus = undefined;
            if (result && result.offenderId === 1) {
                this.message = result.sealFlag;
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 2) {
                this.offExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('oumpurge.purgeprocesshasbeencompletedsuccessfully');
                this.show();
                return;
            }
            if (result && result.offenderId === 3) {
                this.message = result.sealFlag;
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 4) {
                this.offExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('oumpurge.sealingprocesshasbeencompletedsuccessfully');
                this.show();
                return;
            }
            if (result && result.offenderId === 5) {
                this.offExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('oumpurge.unsealingprocesshasbeencompletedsuccessfully');
                this.show();
                return;
            }
        });
    }

    onClickSealBookingDown() {
        const serviceObj = this.oumpurgeFactory.whenTimerExpired(this.offbkgModel);
        serviceObj.subscribe(result => {
            this.porgressStatus = undefined;
            if (result && result.offenderId === 1) {
                this.message = result.sealFlag;
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 2) {
                this.offExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('oumpurge.purgeprocesshasbeencompletedsuccessfully');
                this.show();
                return;
            }
            if (result && result.offenderId === 3) {
                this.message = result.sealFlag;
                this.type = 'warn';
                this.show();
                return;
            }
            if (result && result.offenderId === 4) {
                this.offExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('oumpurge.sealingprocesshasbeencompletedsuccessfully');
                this.show();
                return;
            }
            if (result && result.offenderId === 5) {
                this.offExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('oumpurge.unsealingprocesshasbeencompletedsuccessfully');
                this.show();
                return;
            }
        });
    }
    getSealButtonAccessPermission() {
        const id = this.oumpurgeFactory.getSealButtonAccessPermission();
        id.subscribe(data => {
            if (data > 0) {
                this.sealAccesValue=true;
            } else {
                this.sealAccesValue =false;
            }
        });

    }

    get sealBookingLevelDisible (){
        if(this.sealAccesValue && this.offModel.sealFlag === 'N'){
            return false;
        } else {
            return true;
        }
    }

    get sealOffenderLevelDisable(){
        if(this.sealAccesValue && this.offData.length > 0){
            return false;
        } else {
            return true;
        }
    }
    // validateRowData = (event) => {
    // 	const rowdata = new ValidateRowReturn();
    // 	const rowIndex = this.offData.indexOf(event.data);
    // 	if (event.field === 'sealFlag') {
    // 		if (event.data.sealFlag ) {
    // 			this.grid.setColumnData('expiryDate', rowIndex, undefined);
    // 			rowdata.validated = true;
    // 			return rowdata;
    // 		} else if (!event.data.activeFlag) {
    // 			this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
    // 			rowdata.validated = true;
    // 			return rowdata;
    // 		}
    // 	}
    // 	rowdata.validated = true;
    // 	return rowdata;

    // checkActiveBooking(){
    //     const serviceObj = this.oumpurgeFactory.
    //     checkActiveBooking(this.offbkgModel);
    //     serviceObj.subscribe(result => {
    //         if (result && result === 0) {
    //             this.type = 'warn';
    //             this.message = 'Offender must not have any active booking. Please close an active booking. : ';
    //             this.show();
    //             return;
    //         }
    //     });

    // }
}
