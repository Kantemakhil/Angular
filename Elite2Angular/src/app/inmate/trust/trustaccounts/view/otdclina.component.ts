import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdclinaService } from '../service/otdclina.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderTrustAccountsTemp } from '@inmate/beans/OffenderTrustAccountsTemp';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderTrustAccountsTempCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTrustAccountsTempCommitBean';
import { Router } from '@angular/router';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-otdclina',
    templateUrl: './otdclina.component.html'
})

export class OtdclinaComponent implements OnInit {
    cgnbtTotalCount: number;
    cgnbtListSeq: number;
    commentDescription: any;
    @ViewChild('grid', {static: true}) grid: any;
    sessionId: number;
    actionName: string;
    lovModel: any[];
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = -1;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    offtracData: OffenderTrustAccountsTemp[] = [];
    offtracDataTemp: OffenderTrustAccountsTemp[] = [];
    offtracModel: OffenderTrustAccountsTemp = new OffenderTrustAccountsTemp();
    offtracCommitModel: OffenderTrustAccountsTempCommitBean = new OffenderTrustAccountsTempCommitBean();
    offtracIndex = -1;
    offtracInsertList: OffenderTrustAccountsTemp[] = [];
    offtracUpdateList: OffenderTrustAccountsTemp[] = [];
    offtracDeleteList: OffenderTrustAccountsTemp[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    cmAcCodeColumnDef: any[];
    reconTxnColumnDef: any[];
    benTxnColumnDef: any[];
    reconsBlockColumnDef: any[];
    csldAlColumnDef: any[];
    bcrTmpColumnDef: any[];
    offOblHtyColumnDef: any[];
    securityThreatGroupsColumnDef: any[];
    bankRcColumnDef: any[];
    offTracColumnDef: any[];
    livUnitColumnDef: any[];
    glTxn1ColumnDef: any[];
    perColumnDef: any[];
    offBncColumnDef: any[];
    vCorpColumnDef: any[];
    vBcBenColumnDef: any[];
    vOffBkgColumnDef: any[];
    selectmethodrgRg: any[] = [];
    offtracDataPinnedData: any[] = [];
    totalCurrentBal: any;
    clearDisable: boolean;
    totalBal: any;
    check: boolean;
    balTotal: number;
    checkBal: boolean;
    buttonDisable: boolean;
    closedFlag: boolean;
    notifyDateFlag: boolean;
    records: number;
    recordsData: string;
    saveDiable: boolean;
    inactivedetails: boolean;
    inactivefromdate: boolean;
    selectionmethod: boolean;
    inactivetodate: boolean;
    inactivedetailscomment: boolean;
    retbutnDisable: boolean;
    previousRetriveLength: number = 0;
    // retrivebuttonDisable: boolean;
    constructor(private otdclinaFactory: OtdclinaService,
        private sessionManager: UserSessionManager,
        public translateService: TranslateService,
        public dialogService: DialogService,
        private router: Router) {
        this.cmAcCodeColumnDef = [];
        this.reconTxnColumnDef = [];
        this.benTxnColumnDef = [];
        this.reconsBlockColumnDef = [];
        this.csldAlColumnDef = [];
        this.bcrTmpColumnDef = [];
        this.offOblHtyColumnDef = [];
        this.securityThreatGroupsColumnDef = [];
        this.bankRcColumnDef = [];
        this.offTracColumnDef = [];
        this.livUnitColumnDef = [];
        this.glTxn1ColumnDef = [];
        this.perColumnDef = [];
        this.offBncColumnDef = [];
        this.vCorpColumnDef = [];
        this.vBcBenColumnDef = [];
        this.vOffBkgColumnDef = [];
    }
    ngOnInit() {
        this.balTotal = 0;
        this.records = 1;
        this.check = false;
        this.clearDisable = true;
        this.syspflModel.sealFlag = 'true';
        this.buttonDisable = true;
        this.sessionId = this.sessionManager.randomid;
        this.saveDiable = true;
        this.retbutnDisable = false;
        this.offTracColumnDef = [
            {
                fieldName: this.translateService.translate('common.confirm'), field: 'cgnbtAccountClosedFlag',
                datatype: 'checkbox', cellEditable: this.canTxnsEdit, editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.lastname'), field: 'lastName',
                editable: false, width: 150, datatype: 'text', maxlength: 35
            },
            {
                fieldName: this.translateService.translate('common.firstname'), field: 'firstName',
                editable: false, width: 150, datatype: 'text', maxlength: 35
            },
            {
                fieldName: this.translateService.translate('common.location'), field: 'agyLocId',
                editable: false, width: 150, datatype: 'text', maxlength: 6
            },
            { fieldName: this.translateService.translate('otdclina.currentbalance'), field: 'currentBalance', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otdclina.holdbalance'), field: 'holdBalance', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('otdclina.inactivedate'), field: 'movementDate', datatype: 'date',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('otdclina.notifydate'), field: 'notifyDate', datatype: 'date',
                editable: true, width: 150
            },
            { fieldName: this.translateService.translate('common.comment'), field: 'cgnbtModifyUserId', editable: true, width: 150 },
            {
                fieldName: '', field: 'butListSeq', datatype: 'launchbutton', link: '/OTUSUBAC', editable: true, dialogWidth: 80,
                data: 'row', updateField: 'row', modal: true
            },
        ];
        // this.checkLock();
    }
    canTxnsEdit = (data: any, index: number, field: string): boolean => {
        if (Number(data.holdBalance) > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdclina.youcannotconfirm');
            this.show();
            return false;
        } else {
            return true;
        }
    }
    checkLock() {
        const checkLockCaseloadId = this.otdclinaFactory.checkLock();
        checkLockCaseloadId.subscribe(chkLockResultList => {
            if (chkLockResultList.length > 0) {
                const data = {
                    label: this.translateService.translate('otdclina.otdclinaisbeingused'),
                    yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok')
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                    if (result) {
                        this.router.navigate(['/home']);
                        return;
                    } else {
                    }
                });
            } else {
            }
        });
    }
    forValidation(event) {
        if (this.syspflModel.modifyDateTime && this.syspflModel.createDateTime) {
            if ((DateFormat.compareDate(this.syspflModel.createDateTime, this.syspflModel.modifyDateTime)) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdclina.inactivedateshould');
                this.show();
                return;
            }
        }
    }
    allowNumbers(event) {
    }
    onButProfileCodeclick() {
        this.retbutnDisable = true;
        this.cgnbtListSeq =0;
        this.records =0;
        this.offtracExecuteQuery(true);
       
    }
    onRowClickofftrac(event) {
        if (event) {
            this.offtracModel = event;
        }
    }
    getErrorMessages(errList: any[], saveList: any) {
        if (errList && errList.length > 0) {
            this.message = this.translateService.translate('otdclina.sumofsubaccountsbalance');
            this.message = String(this.message).replace('%offIdDisp%', errList[0].offenderIdDisplay);
            const data = {
                label: this.message, yesBtn: true, yesLabel: this.translateService.translate('common.ok')
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                errList.splice(0, 1);
                this.getErrorMessages(errList, saveList);
            });
        } else {
            this.saveRecords(saveList);
        }
    }
    saveRecords(saveList: any[]) {
        this.offtracCommitModel.updateList = saveList.filter(ele => {
            if (ele.cgnbtAccountClosedFlag) {
                this.closedFlag = true;
                return true;
            }
        });
        if (this.closedFlag) {
            this.closedFlag = false;
            this.offtracCommitModel.updateList.forEach(ele => {
                ele.sessionIdTemp = this.sessionManager.randomid;
                ele.createDateTimeTemp = this.syspflModel.createDateTime;
                ele.modifyDateTimeTemp = this.syspflModel.modifyDateTime;
                ele.lastNameTemp = this.sessionManager.getId();
                ele.cgnbtModifyUserId = this.commentDescription;
                ele.caseloadType = this.sessionManager.currentCaseLoadType;
                ele.cbntAccountClosedFlag = ele.cgnbtAccountClosedFlag;
                ele.sealFlag = this.syspflModel.description;
                ele.sealFlagTemp = this.syspflModel.sealFlag;
                ele.totalAmount = this.offtracDataPinnedData[0].currentBalance;
            });
            this.records = this.offtracCommitModel.updateList.length;
            if (this.offtracInsertList.length > 0 || this.offtracUpdateList.length > 0) {
                for (let i = 0; i < this.offtracInsertList.length; i++) {
                    this.offtracCommitModel.insertList = this.offtracInsertList;
                }
            }
            if (this.offtracDeleteList.length > 0) {
                for (let i = 0; i < this.offtracDeleteList.length; i++) {
                }
                this.offtracCommitModel.deleteList = this.offtracDeleteList;
            }
            const whenButtonPressed = this.otdclinaFactory.whenButtonPressed(this.offtracCommitModel);
            whenButtonPressed.subscribe(buttonResultList => {
                if (buttonResultList === 23) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.setupismissingforotdclina');
                    this.show();
                    return;
                } else if (buttonResultList === 21) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.sumofsubaccountsbalance');
                    this.message = String(this.message).replace('%offIdDisp%', this.offtracModel.offenderIdDisplay);
                    this.show();
                    return;
                } else if (buttonResultList === 2) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrust');
                    this.show();
                    return;
                } else if (buttonResultList === 3) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errorprocess');
                    this.show();
                    return;
                } else if (buttonResultList === 4) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errorzero');
                    this.show();
                    return;
                } else if (buttonResultList === 5) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errorclose');
                    this.show();
                    return;
                } else if (buttonResultList === 6) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.offenderhasnegative');
                    this.message = String(this.message).replace('%offIdDisp%', this.offtracModel.offenderIdDisplay);
                    this.show();
                    return;
                } else if (buttonResultList === 7) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.offendertransactions');
                    this.show();
                    return;
                } else if (buttonResultList === 8) {
                    this.type = 'success';
                    this.message = this.translateService.translate('otdclina.transactioncomplete');
                    this.recordsData = String(this.records);
                    this.message = String(this.message).replace('%records%', this.recordsData);
                    this.show();
                    this.offtracExecuteQuery();
                    return;
                } else if (buttonResultList === 9) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrusta');
                    this.show();
                    this.offtracExecuteQuery();
                    return;
                } else if (buttonResultList === 10) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrustb');
                    this.show();
                    this.offtracExecuteQuery();
                    return;
                } else if (buttonResultList === 11) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrustc');
                    this.show();
                    this.offtracExecuteQuery();
                    return;
                } else if (buttonResultList === 12) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrustd');
                    this.show();
                    return;
                } else if (buttonResultList === 13) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortruste');
                    this.show();
                    return;
                } else if (buttonResultList === 14) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrustf');
                    this.show();
                    return;
                } else if (buttonResultList === 15) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrustgpro');
                    this.show();
                    return;
                } else if (buttonResultList === 16) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrusthwel');
                    this.show();
                    return;
                } else if (buttonResultList === 17) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrustisfund');
                    this.show();
                    return;
                } else if (buttonResultList === 18) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrustjwelfare');
                    this.show();
                    return;
                } else if (buttonResultList === 19) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.offenderhasnegativesa');
                    this.message = String(this.message).replace('%offIdDisp%', this.offtracModel.offenderIdDisplay);
                    this.show();
                    return;
                } else if (buttonResultList === 20) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.errortrustkreg');
                    this.show();
                    return;
                } else if (buttonResultList === 22) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.offtracExecuteQuery();
                    return;
                }else if (buttonResultList === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.offtracExecuteQuery();
                    return;
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                }
            });
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('otdclina.youmustselect');
            this.show();
        }
    }
    onButListSeqclick() {
        this.offtracCommitModel.updateList = [];
        this.offtracCommitModel.deleteList = [];
        const errArry = [];
        const validArray = [];
        this.offtracData.forEach(ele => {
            if (ele.cgnbtAccountClosedFlag) {
                if (ele['isValid']) {
                    errArry.push(ele);
                } else {
                    validArray.push(ele);
                }
            }
        });
        this.getErrorMessages(errArry, validArray);
    }
    ok() {
    }
    no() {
    }
    cancel() {
        
        this.syspflModel = new SystemProfiles();
        this.commentDescription = null;
        this.offtracData = [];
        this.offtracDataPinnedData = [];
        this.cgnbtListSeq = null;
        this.cgnbtTotalCount = null;
        this.clearDisable = true;
        this.buttonDisable = true;
        this.saveDiable = true;
        this.syspflModel.sealFlag = 'Y';
        this.retbutnDisable = false;
        this.previousRetriveLength = 0;
    }
    onOffenderChange(offender) {
    }
    syspflExecuteQuery() {
        const syspflResult = this.otdclinaFactory.sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }
    offtracExecuteQuery(btnClck?) {
        if (!this.syspflModel.createDateTime) {
           
            this.type = 'warn';
            this.message = this.translateService.translate('otdclina.inactivefromdatemustbeentered');
            this.show();
            this.retbutnDisable = false;
            return;
        }
        if (!this.syspflModel.description) {
           
            this.type = 'warn';
            this.message = this.translateService.translate('otdclina.selectionmethodmustbeentered');
            this.show();
            this.retbutnDisable = false;
            return;
        }
        if (!this.syspflModel.modifyDateTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdclina.inactivetodatemustbenetered');
            this.show();
            this.retbutnDisable = false;
            return;
        }
        if ((DateFormat.compareDate(this.syspflModel.createDateTime, this.syspflModel.modifyDateTime)) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdclina.inactivetodateshouldbegreater');
            this.show();
            this.retbutnDisable = false;
            return;
        }
        if (this.syspflModel.modifyDateTime &&
            ((DateFormat.compareDate(this.syspflModel.createDateTime, this.syspflModel.modifyDateTime)) === 1)) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdclina.inactivefromdatecannotbelater');
            this.show();
            this.retbutnDisable = false;
            return;
        }
        this.offtracModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.offtracModel.sessionId = this.sessionManager.randomid;
        this.offtracModel.lastName = this.sessionManager.getId();
        this.offtracModel.createDateTime = this.syspflModel.createDateTime;
        this.offtracModel.modifyDateTime = this.syspflModel.modifyDateTime;
        this.offtracModel.agyLocId = this.syspflModel.description;
        this.offtracModel.sealFlag = String(this.syspflModel.sealFlag) === 'true' ? 'Y' : 'N';
        const offtracResult = this.otdclinaFactory.offTracExecuteQuery(this.offtracModel);
        offtracResult.subscribe(offtracResultList => {
            if (offtracResultList.length === 0) {
                if(this.previousRetriveLength != 0){
                    this.cgnbtListSeq = this.previousRetriveLength;
                } else {
                 this.previousRetriveLength = 0; 
                }
                this.cgnbtTotalCount = 0;
                this.offtracData = [];
                this.offtracIndex = -1;
                this.offtracDataPinnedData = [];
                this.buttonDisable = true;
                this.retbutnDisable = false;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                if (btnClck) {
                this.show();
                
                }
                return;
            } else {
                if(this.previousRetriveLength != 0){
                    this.cgnbtListSeq = this.previousRetriveLength - offtracResultList.length;
                } else {
                 this.previousRetriveLength = 0; 
                }
                this.previousRetriveLength = offtracResultList.length; 
                this.retbutnDisable = true;
                this.offtracData = [];
                this.totalCurrentBal = 0;
                offtracResultList.forEach(element => {
                    element.butListSeq = 'Sub';
                    element['row'] = {
                        'type': 'SUB', Id: element.offenderIdDisplay, lastName: element.lastName, middleName: element.middleName,
                        firstName: element.firstName, offenderId: element.offenderId, caseloadId: element.caseloadId
                    };
                    element.cgnbtModifyUserId = this.commentDescription;
                    this.totalCurrentBal = element.totalAmount;
                    if (element.holdBalance === 0) {
                        element.cgnbtAccountClosedFlag = String(this.syspflModel.sealFlag) === 'true' ? true : false;
                    } else {
                        element.cgnbtAccountClosedFlag = false;
                    }
                    if (element.holdBalance || element.holdBalance === 0) {
                        element.holdBalance = (element.holdBalance).toFixed(2);
                    }
                    if (element.currentBalance || element.currentBalance === 0) {
                        element.currentBalance = (element.currentBalance).toFixed(2);
                    }
                });
                this.offtracData = offtracResultList;
                this.offtracModel = offtracResultList[0];
                const alltot = {
                    agyLocId: 'Total', currentBalance: Number(this.totalCurrentBal).toFixed(2)
                };
                //this.cgnbtListSeq = 0;
              //  this.cgnbtListSeq =  this.cgnbtListSeq + this.records;
                this.cgnbtTotalCount = Number(this.offtracData.length);
                const totbal = [];
                totbal.push(alltot);
                this.offtracDataPinnedData = totbal;
                this.offtracIndex = 0;
                this.clearDisable = false;
                this.buttonDisable = false;
                
                
                
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdclinaSaveofftracForm(event) {
        this.offtracInsertList = event.added;
        this.offtracUpdateList = event.updated;
        this.offtracDeleteList = event.removed;
        this.offtracCommitModel.insertList = [];
        this.offtracCommitModel.updateList = [];
        this.offtracCommitModel.deleteList = [];
        if (this.offtracInsertList.length > 0 || this.offtracUpdateList.length > 0) {
            for (let i = 0; i < this.offtracInsertList.length; i++) {
            }
            for (let i = 0; i < this.offtracUpdateList.length; i++) {
                this.offtracUpdateList[i].cgnbtModifyUserId = '';
                this.offtracCommitModel.updateList = this.offtracUpdateList;
            }
            this.offtracCommitModel.insertList = this.offtracInsertList;
        }
        if (this.offtracDeleteList.length > 0) {
            for (let i = 0; i < this.offtracDeleteList.length; i++) {
            }
            this.offtracCommitModel.deleteList = this.offtracDeleteList;
        }
        const offtracSaveData = this.otdclinaFactory.offTracCommit(this.offtracCommitModel);
        offtracSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offtracExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.offtracExecuteQuery();
                return;
            }
        });
    }
    /*
       * this event is fired when check/uncheck the cgnbtAccountClosedFlag.
       */
    offTracvalidateData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'cgnbtAccountClosedFlag') {
            this.saveDiable = true;
            if (Number(event.data.holdBalance) <= 0) {
                const total = { tot: 0 };
                this.offtracData.forEach(ele => {
                    if (ele.cgnbtAccountClosedFlag) {
                        total.tot += Number(ele.currentBalance);
                    }
                });
                const alltot = {
                    agyLocId: 'Total', currentBalance: Number(total.tot).toFixed(2)
                };
                const totbal = [];
                totbal.push(alltot);
                this.offtracDataPinnedData = totbal;
                this.grid.setColumnData('currentBalance', this.offtracDataPinnedData);
            } else {
                if (event.newValue) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclina.youcannotconfirm');
                    this.show();
                }
                this.grid.setColumnData('cgnbtAccountClosedFlag', index, null);
                rowdata.validated = true;
                return rowdata;
            }
        } else {
            this.saveDiable = false;
        }
        if (event.field === 'notifyDate' && event.newValue !== event.oldValue) {
            this.notifyDateFlag = true;
        } else {
            this.notifyDateFlag = false;
        }
        rowdata.validated = true;
        return rowdata;
    }
    /*
    * this event is fired when check the confirm all.
    */
    confirmAllEvent(event) {
        const rowData = this.offtracData;
        rowData.forEach(ele => {
            if (Number(ele.holdBalance) <= 0) {
                const index = rowData.indexOf(ele);
                this.grid.setColumnData('cgnbtAccountClosedFlag', index, event.checked);
            }
        });
        this.offtracData = rowData;
    }

    /**
    * This function displays the messages
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    get clearFlag(): boolean {
        if ((this.offtracData && this.offtracData.length > 0) || this.syspflModel.createDateTime || this.syspflModel.description ||
         !(this.syspflModel.sealFlag) || this.syspflModel.modifyDateTime || this.commentDescription) {
            return false;
        }
        return true;
    }
get readonlyFlag(): boolean{
    if(this.offtracData.length >0){
        return true;
    }
    return false;
}
    
}
