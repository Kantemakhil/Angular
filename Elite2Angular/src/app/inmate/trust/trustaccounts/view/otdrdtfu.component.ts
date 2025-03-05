import {
    Component, OnInit, AfterViewInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdrdtfuService } from '../service/otdrdtfu.service';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OffenderTransactions } from '@inmatetrustaccountsbeans/OffenderTransactions';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OtmremitService } from '../service/otmremit.service';
import { OsipsearService } from '@inst/visits-management/service/osipsear.service';
import { OtucpayeService } from '../service/otucpaye.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';

@Component({
    selector: 'app-otdrdtfu',
    templateUrl: './otdrdtfu.component.html'
})

export class OtdrdtfuComponent implements OnInit, AfterViewInit {
    isLoading: boolean=true;
    isAccStatusLdng: boolean;
    totTxnFee: number;
    txnEtryAmt: number;
    isValidAmount: boolean;
    deductionData: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offBncColumnDef: any[];
    offBncReadOnly = false;
    sysPflReadOnly = false;
    offTxnReadOnly = false;
    cgfkOfftxnpayeepersonidRg: any[] = [];
    cgfkOfftxntxntypeRg: any[] = [];
    cgfkOfftxnpayeecorporateiRg: any[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    trnTitles = { 'code': 'Trans Type:', 'description': 'Description' };
    personFlag: boolean;
    corporateFlag: boolean;
    payeeFlag: boolean;
    remitterFlag: boolean;
    deductionFlag: boolean;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    caseloadIndex: number;
    verifyFlag: boolean;
    isOffenderAvaliable: boolean;
    isClosedAccount = true;
    accountClosedflag: string;
    txnTypeLov: any;
    txnTypeLovInput: any;
    personError: any;
    corporateError: any;
    remetterError: any;
    

    constructor(private otdrdtfuFactory: OtdrdtfuService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService,
        private otmremitFactory: OtmremitService,
        private osipseraservice: OsipsearService,
        private otucpayeService: OtucpayeService,
        private dialogService: DialogService,
        private amountFormat: AmountFormatUtil) {
        this.offBncColumnDef = [];
    }
    ngOnInit() {
        this.verifyFlag = true;
        this.caseloadIndex = undefined;
        this.personFlag = true;
        this.corporateFlag = true;
        this.payeeFlag = true;
        this.remitterFlag = true;
        this.deductionFlag = true;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.show('common.pleasesearchforvalidoffender');
            this.isOffenderAvaliable = true;
        } else {
            this.verifyFlag = false;
            this.personFlag = false;
            this.corporateFlag = false;
            this.payeeFlag = false;
            this.remitterFlag = false;
            this.deductionFlag = false;
        }
        this.offBncColumnDef = [
            { fieldName: 'Amount &#10;Owing', field: 'drvAmount', editable: false, width: 150 },
            { fieldName: 'Last Name', field: 'dspLastName', editable: false, width: 150 },
            { fieldName: 'First Name', field: 'dspFirstName', editable: false, width: 150 },
            { fieldName: 'Corp.', field: 'corporateId', editable: false, width: 150 },
            { fieldName: 'Docket #', field: 'dspInformationNumber', editable: false, width: 150 },
            { fieldName: 'Person', field: 'personId', editable: false, width: 150 },
            { fieldName: 'Amount Paid&#10;This Receipt', field: 'overrideAmount', editable: false, width: 150 },
            { fieldName: 'Name', field: 'dspCorporateName', editable: false, width: 150 },
            { fieldName: '/Type', field: 'dspDeductionType', editable: false, width: 150 },
            { fieldName: 'Obligation ID', field: 'offenderDeductionId', editable: false, width: 150 },
        ];
    }
    ngAfterViewInit() {
        this.txnTypeLov = document.getElementById('seltxn_type');
        if (this.txnTypeLov) {
            const childs = this.txnTypeLov.getElementsByTagName('INPUT');
            if (childs && childs.length > 0) {
                this.txnTypeLovInput = childs[0];
                this.txnTypeLovInput.onfocus =  this.chkAccountStatusMessage;
            }
        }

    }
    allowNumbers(event) {
    }
    onButTxnTypeclick() {
    }
    onButDeductionFlagclick() {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    /**
     * To display the messages
     */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg) {
        return this.translateService.translate(msg);
    }
    txnTypeChangeEvent(event) {
        this.offtxnModel.offenderId = this.vHeaderBlockModel ? this.vHeaderBlockModel.rootOffenderId : null;

        if (event && event.code) {
            const freezeDisbursementData = {
                pCsldId: this.sessionManager.currentCaseLoad,
                pOffId: this.vHeaderBlockModel.rootOffenderId,
                pTxnType: event.code,
                pAcntCode: null,
                pCsldType: this.sessionManager.currentCaseLoadType,
                pModuleName: 'OTDRDTFU',
                pDate: null,
            };
            this.otdrdtfuFactory.chkDisbursementFreeze(freezeDisbursementData).subscribe(resData => {
                if (resData) {
                    if (resData.frzFlag === 'Y') {
                        this.show('otdrdtfu.transactioncannotproceed');
                        this.offtxnModel.txnType = this.offtxnModel.txnType === '' ? undefined : '';
                        this.offtxnModel.txnEntryDesc = null;
                        this.offtxnModel = new OffenderTransactions();
                    }
                }
            });
            if (this.caseloadIndex === 0) {
                const msg = String(this.trMsg('otdrdtfu.offenderisnotcaseload')).replace('%caseload%', this.sessionManager.currentCaseLoad);
                this.show(msg);
            }
            this.offtxnModel = new OffenderTransactions();
            this.offtxnModel.txnType = event.code;
            this.offtxnModel.txnUsage = event.txnUsage;
            this.offtxnModel.txnEntryDesc = event.description;
            this.offtxnModel.caseloadId = this.sessionManager.currentCaseLoad;
            const txntypeServiceObj = this.otdrdtfuFactory.
                txnTypeValidation(event.code, this.sessionManager.currentCaseLoad);
            txntypeServiceObj.subscribe(txntypelist => {
                if (txntypelist.length === 0) {      
                } else {
                    this.offtxnModel.chequePayeeType = txntypelist.chequeProductionFlag;
                    this.offtxnModel.receiptProductionFlag = txntypelist.txntypelist;
                    this.offtxnModel.receiptPrintedFlag = txntypelist.receiptProductionFlag;
                    this.offtxnModel.chequeProductionFlag = txntypelist.chequeProductionFlag;
                    if (txntypelist.txnUsage === 'D') {
                        this.remitterFlag = true;
                        this.deductionFlag = true; 
                        if (txntypelist.chequeProductionFlag === 'Y') {
                            this.offtxnModel.txnPostingType = 'CHECK';
                            if (txntypelist.chequePayeeType === 'T') {
                                this.personFlag = false;
                                this.corporateFlag = false;
                                this.payeeFlag = true;
                                this.isLoading = true;
                            } else if (txntypelist.chequePayeeType === 'F') {
                                this.personFlag = true;
                                this.corporateFlag = true;
                                this.payeeFlag = false;
                                this.isLoading = true;
                            } else {
                                this.personFlag = false;
                                this.corporateFlag = false;
                                this.payeeFlag = false;
                            }
                        } else if(this.offtxnModel.txnPostingType = 'CASH'){   
                            this.payeeFlag = true;
                            this.personFlag = true;
                            this.corporateFlag = true;
                            this.isLoading = true;
                        }
                    } 
                    if (txntypelist.txnUsage === 'R') {
                        if (txntypelist.receiptProductionFlag === 'Y') {
                            this.remitterFlag = false;
                        } else {
                            this.remitterFlag = true;
                            this.isLoading = true;
                        }
                        this.personFlag = true;
                        this.corporateFlag = true;
                        this.deductionFlag = false;
                        this.payeeFlag = true;
                        this.isLoading = true;
                    }
                }
            });
        } else {
            this.offtxnModel.txnPostingType = null;
            this.offtxnModel.txnEntryAmount = null;
            this.offtxnModel.txnReferenceNumber = null;
            this.offtxnModel.txnEntryAmount = null;
            this.offtxnModel.nbtTxnType = null;
            this.offtxnModel.remitterId = null;
            this.offtxnModel.payeePersonId = null;
            this.offtxnModel.payeeCorporateId = null;
            this.offtxnModel.payeeNameText = null;
        }
    }
    onTxnBlur() {
        if (!this.offtxnModel.txnType) {
            this.offtxnModel.txnType = this.offtxnModel.txnType === '' ? undefined : '';
        }
    }
    onOffenderChange(offender) {
        this.accountClosedflag = 'N';
        this.isClosedAccount = true;
        if (offender && offender.offenderBookId) {
            this.caseloadIndex = undefined;
            this.vHeaderBlockModel = offender;
            const caseloadResult = this.otdrdtfuFactory.
                checkCaseloadValidation(this.sessionManager.currentCaseLoad, this.vHeaderBlockModel.agyLocId);
            caseloadResult.subscribe(resultObj => {
                if (resultObj === 0) {
                    this.caseloadIndex = resultObj;
                } else {
                    this.caseloadIndex = resultObj;
                }
            });
            this.offtxnModel = new OffenderTransactions();
            this.personFlag = false;
            this.corporateFlag = false;
            this.payeeFlag = false;
            this.remitterFlag = false;
            this.deductionFlag = false;
            this.verifyFlag = false;
            this.isOffenderAvaliable = false;
            this.isAccStatusLdng = true;
            this.otdrdtfuFactory.chkAccountStatus(this.sessionManager.currentCaseLoad, offender.rootOffenderId).subscribe(status => {
                this.isAccStatusLdng = false;
                if (typeof status !== 'string') {
                    this.show('otdrdtfu.othererrorinchkaccountstatus');
                } else {
                    if (status) {
                        if (status === 'Y') {
                            this.accountClosedflag = 'Y';
                            this.isClosedAccount = true;
                        } else {
                            this.isClosedAccount = false;
                        }
                    }
                }
            });
        } else {
            if (!offender) {
                this.vHeaderBlockModel = new VHeaderBlock();
            }
            this.verifyFlag = true;
            this.personFlag = true;
            this.corporateFlag = true;
            this.payeeFlag = true;
            this.remitterFlag = true;
            this.deductionFlag = true;
            this.offtxnModel = new OffenderTransactions();
            this.isOffenderAvaliable = true;
        }
    }
    get otusubacDialogData(): any {
        if (this.vHeaderBlockModel) {
        const data = {
            offenderId: this.vHeaderBlockModel.rootOffenderId,
            caseloadId: this.sessionManager.currentCaseLoad,
            offenderIdDisplay: this.vHeaderBlockModel.offenderIdDisplay,
            lastName: this.vHeaderBlockModel.lastName,
            firstName: this.vHeaderBlockModel.firstName,
            middleName: this.vHeaderBlockModel.middleName,
        };
        return data;
    } else {
        return {};
    }
    }
    onChange() {
        if (this.caseloadIndex === 0) {
            this.show('Offender is not in the ' + this.sessionManager.currentCaseLoad + ' caseload.');
        }
    }
    chkAccountStatusMessage = () => {
        if (this.isAccStatusLdng) {
            return;
        }
        this.offtxnModel.txnId = null;
        this.offtxnModel.receiptNumber = null;
        
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderId && this.isClosedAccount) {
            if (this.txnTypeLovInput) {
            this.txnTypeLovInput.blur();
            }
        const data = {
            label: this.trMsg('otdrdtfu.closedoffendertrustaccount'),
             yesBtn: true, noBtn: true
          };
          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 40).subscribe(result => {
            if (result) {
                const offenderId = this.vHeaderBlockModel ? this.vHeaderBlockModel.rootOffenderId : null;
                this.otdrdtfuFactory.reopenOffenerTrustAccount(this.sessionManager.currentCaseLoad,
                    offenderId).subscribe(resData => {
                        if (resData === 0) {
                            this.show('otdrdtfu.erroropeningtrustaccount');
                        } else {
                            this.show('common.addupdateremoverecordsuccess', 'success');
                            this.isClosedAccount = false;
                        }
                    });
            } else {
                this.isClosedAccount = true;
            }
          });
        }
    }
    syspflExecuteQuery() {
        const syspflResult = this.otdrdtfuFactory.
            sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }

    onButDeducClick = () => {
    const deductionData = {
            offenderId: this.vHeaderBlockModel.rootOffenderId,
            caseloadId: this.sessionManager.currentCaseLoad,
            txnType: this.offtxnModel.txnType,
            receiptAmount: this.offtxnModel.txnEntryAmount,
            moduleName: 'OTDRDTFU',
            //Jire issue wise below code is commented (17006)
            // onCloseClick: () => {
            //     return {}; }
        };
        if (!this.offtxnModel.txnType) {
            this.dialogService.openLinkDialog('/OCUOVROB', deductionData, 90).subscribe(event => {});
        } else {
            this.otdrdtfuFactory.deductionsChkOffenderDeductions(this.sessionManager.currentCaseLoad,
                deductionData.offenderId, deductionData.txnType, 0).subscribe(ele => {
                    if (ele && typeof ele === 'string') {
                        if (ele === 'Y') {
                            this.dialogService.openLinkDialog('/OCUOVROB', deductionData, 90).subscribe(event => {});
                        }
                    }
                });

        }
            return false;
    }
    afterPerDlgClosed(event) {
        if (event) {
            this.corporateFlag = true;
            this.offtxnModel.payeePersonId = event.personId;
            this.offtxnModel.payeeNameText = event.firstName + ' ' + event.lastName;
        }

    }
    afterCorpDlgClosed(event) {
        if (event) {
            this.personFlag = true;
            this.offtxnModel.payeeCorporateId = event.corporateId;
            this.offtxnModel.payeeNameText = event.corpName ? event.corpName : event.corporateName;
        }
    }

    /* the getter method is used to provied link to trans type lov*/
    get transactLovLink(): string {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderId) {
        return 'otdrdtfu/cgfkOffTxnTxnTypeRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        } else {
            return null;
        }
    }

    /* the method is used to provide amount number validation format */
    amountKeyDown(event) {
        if (!this.amountFormat.avoidKeys(event, this.offtxnModel.txnEntryAmount)) {
            event.stopPropagation();
            return false;
           }
    }

    // this method is call when amount field lost its focus
    onAmountBlur(amount) {
        this.amountFormat.precisionFlot(amount);
    }

    // this method is call when remitter field lost its focus
    onRemitterBlur(otmremitbtn) {
        if (!this.offtxnModel.remitterId) {
            this.offtxnModel.remitterName = null;
        } else {
            const reqData = {remitterId : this.offtxnModel.remitterId};
            this.otmremitFactory.remExecuteQuery(reqData).subscribe(resData => {
                if (resData && resData.length > 0) {
                    const remitterData = {remitterId : resData[0].remitterId,
                         name: resData[0].firstName + ' ' + resData[0].lastName };
                   this.afterRemitterDialogClosed(remitterData);
                } else {
                    this.offtxnModel.remitterName =  null;
                    this.offtxnModel.remitterId = null;
                    if (otmremitbtn) {
                        otmremitbtn.reDirect();
                    }
                }
            });
        }
    }

    // this method is call when payee person field lost its focus
    onPersonIdBlur(personbtn) {
        if (!this.offtxnModel.payeePersonId) {
            this.offtxnModel.payeeNameText = null;
        } else {
            const person = {
                'pSearchType': 'I',
                'pPersonId': this.offtxnModel.payeePersonId,
            };
            this.osipseraservice.personsExecuteQuery(person).subscribe(resPerson => {
                if (resPerson && resPerson.length > 0) {
                    this.afterPerDlgClosed(resPerson[0]);
                } else {
                    this.show('otdrdtfu.payeepersoncannotfound');
                    this.offtxnModel.payeeNameText = null;
                }
            });
        }


    }

    get perseonDialogData() {
        const person = {pSearchType: 'N', pPersonId: this.offtxnModel.payeePersonId };
        const returnObj = {forwardToDialog: true, person: null };
        if (this.offtxnModel.payeePersonId) {
            person.pSearchType =  'I';
        }
        returnObj.person = person;
        return returnObj;
    }

    get isPersonInserted(): boolean {
        if (this.offtxnModel.payeePersonId) {
            return true;
        } else {
            return false;
        }
    }

    get isCorporater(): boolean {
        if (this.offtxnModel.payeeCorporateId) {
            return true;
        } else {
            return false;
        }
    }

    // this method is call when Corpate field lost its focus
    onCorpateBlur() {
        if (!this.offtxnModel.payeeCorporateId) {
            this.offtxnModel.payeeNameText = null;
            return;
        }
        const reqData = {
            'corporateId': this.offtxnModel.payeeCorporateId
          };
        this.otucpayeService.corpExecuteQuery(reqData).subscribe(resData => {
            if ( resData && resData.length) {
                this.afterCorpDlgClosed(resData[0]);
            } else {
                this.show('otdrdtfu.payeecorporatecannotfound');
                this.offtxnModel.payeeNameText = null;
            }
        });
    }

    afterRemitterDialogClosed(event) {
        if (event && event.remitterId) {
          this.offtxnModel.remitterId =  event.remitterId;
          this.offtxnModel.remitterName =  event.name;
        }
    }

    otdrdtfugenerateotrdrecereport (param) {
        const reqParam = {
            caseloadId: this.sessionManager.currentCaseLoad,
            caseloadType: this.sessionManager.currentCaseLoadType,
            recNum: param.receiptNumber,
            txnId: this.offtxnModel.txnId
        };
        if (param.txnUsage === 'D') {
        this.otdrdtfuFactory.otdrdtfugenerateotrdrecereport(reqParam).subscribe(data => {

            if (data && data.report) {
                const base64pdf = 'data:application/pdf;base64,';
                const pdf = base64pdf + data.report;
                const win = window.open(pdf);
                win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
            }
        });
    } else {
        this.otdrdtfuFactory.otdrdtfugenerateOtrreceireport(reqParam).subscribe(data => {
                        if (data && data.report) {
                            const base64pdf = 'data:application/pdf;base64,';
                            const pdf = base64pdf + data.report;
                            const win = window.open(pdf);
                            win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
                        }
                    });
    }
    }

    mainProcess() {
        if (this.vHeaderBlockModel) {
            const headerData = JSON.parse(JSON.stringify(this.vHeaderBlockModel));
            this.offtxnModel.offenderBookId = headerData.offenderBookId;
            this.offtxnModel.checkInd = headerData.indigentFlag ? 'Y' : 'N';
            this.offtxnModel.offenderId = headerData.offenderId;
        }
        if (!this.offtxnModel.txnType) {
            this.show('otdrdtfu.transactiontypesmustbeentered');
            this.isLoading = true;
            return;
        }
        if (!this.offtxnModel.txnEntryDesc) {
            const msg = `${this.trMsg('common.description')} ${this.trMsg('common.mustbeenter')}`;
            this.show(msg);
            this.isLoading = true;
            return;
        }
        if (!this.offtxnModel.txnEntryAmount) {
            this.show('otdrdtfu.amountmustbenented');
            this.isLoading = true;
            return;
        }
        this.saveValid(this.offtxnModel.txnEntryAmount)
       

    }

    checkPrintableReport (param) {
        this.otdrdtfuFactory.mainProcessAutoSubmitting().subscribe(data => {
        if (data && typeof data === 'string') {
            if (data === 'Y') {
            this.otdrdtfugenerateotrdrecereport (param);
            }
        } else {
            this.show('otdrdtfu.pleasesetupautomaticrecipt');
        }
        });
    }

    clear () {
        this.offtxnModel = new OffenderTransactions();
    }
    onmOver() {
        const sfield = document.getElementById('texttxn_entry_amount');
        const innerFields = sfield.getElementsByTagName('input');
        if (innerFields && innerFields.length > 0) {
            const innerField = innerFields[0];
            if (innerField && typeof innerField.blur === 'function') {
                innerField.blur();
            }
        }
    }
    onValueChange(event) {
        this.txnEtryAmt = this.offtxnModel.txnEntryAmount;
    }

    saveValid(amount) {
        const is = { valid: true };
        this.isValidAmount = false;
        this.offtxnModel.totTxnFee = 0;
        this.totTxnFee = 0;
        this.offtxnModel.nbtTxnType = null;
        if (amount) {
            this.amountFormat.precisionFlot(amount);
            this.offtxnModel.offenderId = this.vHeaderBlockModel ? this.vHeaderBlockModel.rootOffenderId : null;
            //this.isOffenderAvaliable = true;
            this.otdrdtfuFactory.onAmountBlurValidation(this.offtxnModel).subscribe(data => {
                this.isOffenderAvaliable = false;
                if (data && String(data).includes('errorMessage')) {
                    this.offtxnModel.txnEntryAmount = null;
                    if (amount && typeof amount.focus === 'function') {
                        amount.focus();
                    }
                    if (String(data).includes('#nagativeTransactionAmount')) {
                        this.show('otdrdtfu.nagativeTransactionAmount');
                        is.valid = false;
                        return;
                    } else if (String(data).includes('#zeroTransactionAmount')) {
                        this.show('otdrdtfu.zeroTransactionAmount');
                        is.valid = false;
                        return;
                    } else if (String(data).includes('#lowHeighError')) {
                        this.show('otdrdtfu.lowHeighError');
                        is.valid = false;
                        return;
                    } else if (String(data).includes('#gettransactionfee')) {
                        this.show('otdrdtfu.gettransactionfee');
                        is.valid = false;
                        return;
                    } else if (String(data).includes('#insufficient')) {
                        this.show('otdrdtfu.insufficient');
                        is.valid = false;
                        amount.focus();
                    }
                } else {
                    if (data) {
                        try {
                        if (String(data).includes('[') && String(data).includes(']')) {
                            const sPoint = String(data).indexOf('[') + 1;
                            const ePoint = String(data).indexOf(']');
                            const num = String(data).substring(sPoint, ePoint);
                            if (!isNaN(Number(num))) {
                                this.offtxnModel.totTxnFee = Number(num);
                                this.totTxnFee = Number(num);
                            }
                        }
                    } catch (e) {
                        this.offtxnModel.totTxnFee = 0;
                        this.totTxnFee = 0;
                    }
                        this.isValidAmount = true;
                        if (String(data).includes('nbtTxnType') && String(data).trim().endsWith('Y')) {
                            this.offtxnModel.nbtTxnType = 'Y';
                        } else {
                            this.offtxnModel.nbtTxnType = null;
                        }
                    }
                }
                this.offtxnModel.caseloadType = this.sessionManager.currentCaseLoadType;
        this.offtxnModel.totTxnFee = this.totTxnFee;
        this.offtxnModel.accountClosedFlag = this.accountClosedflag;
        this.otdrdtfuFactory.mainProcess(this.offtxnModel).subscribe(data => {
            this.isLoading = true;
            if (data && data.length > 0) {
                if (data[0].errorMessage) {
                    if (data[0].errorMessage === '#payeecorporateisinactive') {
                        this.show('otdrdtfu.payeecorporateisinactive');
                    } else if (data[0].errorMessage === '#payeeenteredcannotbefound') {
                        this.show('otdrdtfu.payeecorporatecannotfound');
                    } else if (data[0].errorMessage === '#payeeperonenteredcannotbefound') {
                        this.show('otdrdtfu.payeepersoncannotfound');
                    } else if (data[0].errorMessage === '#remittermustbeentered') {
                        this.show('otdrdtfu.remittermustbeentered');
                    }  else if (data[0].errorMessage === '#payeemustbeentered') {
                        this.show('otdrdtfu.payeemustbeentered');
                    } else if  (data[0].errorMessage === '#errorinprocessgltransnew') {
                        this.show('otdrdtfu.errorinprocessgltransnew');
                    } else if (data[0].errorMessage === '#errorwhileinsertingrecordinoffendertransaction') {
                        this.show('otdrdtfu.errorwhileinsertingrecordinoffendertransaction');
                    } else if (data[0].errorMessage === '#othererrorininsertintochequedata')  {
                        this.show('otdrdtfu.insitcheqdata');
                    } else {
                        if (this.trMsg(data[0].errorMessage) !== data[0].errorMessage) {
                        this.show(data[0].errorMessage);
                        } else {
                            this.show('common.addupdateremoverecordfailed', 'error');
                        }
                    }
                } else if (!data[0].errorMessage) {
                    this.trMsg('otdrdtfu.transactioncompandsaved');
                    const masage = String (this.trMsg('otdrdtfu.transactioncompandsaved')).replace('%txnId%', `#${data[0].txnId}`);
                    this.accountClosedflag = 'N';
                    this.show(masage, 'success');
                    if (this.offtxnModel.receiptPrintedFlag === 'Y') {
                       this.checkPrintableReport(data[0]);
                    }
                    this.clear();
                    this.offtxnModel.txnId = data[0].txnId;
                    this.offtxnModel.receiptNumber = data[0].receiptNumber;
            }
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        }, err => {
            this.isLoading = false;
        });
            });


        }
        return is.valid;
    }
}
