import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdpayobService } from '../service/ocdpayob.service';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { OffenderBeneficiaries } from '@inmate/trust/trustaccounts/beans/OffenderBeneficiaries';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OffenderTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTransactionsCommitBean';
import { OffenderBeneficiariesCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderBeneficiariesCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { OffFeeBillTransactions } from '@cf/deductions/beans/OffFeeBillTransactions';
import { OffFeeBillTransactionsCommitBean } from '@cf/deductions/beans/OffFeeBillTransactionsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { offBillingStatements } from '@cf/offendertransactions/beans/offBillingStatements';

@Component({
    selector: 'app-ocdpayob',
    templateUrl: './ocdpayob.component.html'
})

export class OcdpayobComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    @ViewChild('offFeesGrid', { static: false }) offFeesGrid: any;
    actionName: string;
    msgs: any[] = [];
    offtxnData: OffenderTransactions[] = [];
    offtxnDataTemp: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxnIndex = 0;
    offtxnInsertList: OffenderTransactions[] = [];
    offtxnUpdateList: OffenderTransactions[] = [];
    offtxnDeleteList: OffenderTransactions[] = [];
    offbncData: OffenderBeneficiaries[] = [];
    offbncDataTemp: OffenderBeneficiaries[] = [];
    offbncModel: OffenderBeneficiaries = new OffenderBeneficiaries();
    offbncIndex = 0;
    offbncInsertList: OffenderBeneficiaries[] = [];
    offbncUpdateList: OffenderBeneficiaries[] = [];
    offbncDeleteList: OffenderBeneficiaries[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: any;
    editable = true;
    offBncColumnDef: any[];
    cgfkOfftxnsubaccounttypeRg: any[] = [];
    offtxnCommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    offbncCommitModel: OffenderBeneficiariesCommitBean = new OffenderBeneficiariesCommitBean();
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    drvAmountTemp: any;
    totalAmount: number;
    readOnlyFlag: boolean;
    validateRowIndex: number;
    currentBalance: string;
    txnType: string;
    subAcntTypeLink: string;
    validateItem: boolean;
    fieldItem: boolean;
    autoPoplate: boolean;
    subAccountType: string;
    selected: number;
    offtxnBean: OffenderTransactions = new OffenderTransactions();
    offFeesColumnDef: any[];
    offFeeData: OffFeeBillTransactions[] = [];
    offFeeDataTemp: OffFeeBillTransactions[] = [];
    offFeeDataModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    offDataModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    offFeesUpdateList: OffFeeBillTransactions[] = [];
    offFeesCommitModel: OffFeeBillTransactionsCommitBean = new OffFeeBillTransactionsCommitBean();
    amountTotal: number;
    btnFlag: string;
    offenderFeesEbtDsbl: boolean;
    btnEnble: boolean;
    saveBtn: boolean;
    billEndDay: any;
    billingCycleEndDate: Date;
    billingCycleStartDate: Date;
    caseplanId: number;
    offBillStmtModel: offBillingStatements = new offBillingStatements();
    offBillStmtInsertlist: offBillingStatements[] = [];
    saveFlagForTxn : boolean;
    offFeeBillBean : OffFeeBillTransactions = new OffFeeBillTransactions();
    constructor(private ocdpayobFactory: OcdpayobService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService,
        private amountFormat: AmountFormatUtil) {
        this.offBncColumnDef = [];
        this.offFeesColumnDef = [];
    }
    ngOnInit() {
        this.autoPoplate = true;
        this.readOnlyFlag = true;
        this.saveBtn = true;
        this.saveFlagForTxn = false;
        this.subAccountType = null;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        } else {
            this.readOnlyFlag = true;
        }
        this.selected = -1;
        this.offenderFeesBtnEnable();
        this.getbillEndDayPfVal();
        this.offBncColumnDef = [
            { fieldName: this.translateService.translate('common.person'), field: 'personId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.firstname'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdpayob.corp'), field: 'corporateId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.name'), field: 'corporateName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdpayob.obligationid'), field: 'offenderDeductionId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.type'), field: 'deductionType', editable: false, width: 150 },
            // { fieldName: this.translateService.translate('common.description'), field: 'deductionDesc', editable: false, width: 150 },
            // { fieldName: this.translateService.translate('common.infonumber'), field: 'informationNumber', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdpayob.docket'), field: 'informationNumber', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdpayob.amountowing'), field: 'drvAmountTemp', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.amount'), field: 'overrideAmount', editable: true, width: 150,
                 datatype: 'number', format: '1.2-2', minValue: 0.00, maxValue: 999999999.99,
                strictFP: true, whole: true
            },//cellEditable: this.canCellEdit,
        ];
        this.offFeesColumnDef = [
            {
              fieldName: this.translateService.translate('ocdpayob.supervisionperiod'), field: 'bookingNo',
              editable: false, width: 150, datatype: 'text'
            },
            {
              fieldName: this.translateService.translate('ocdpayob.caseload'), field: 'caseloadId', 
              editable: false, width: 150, datatype: 'text'
            },
            {
              fieldName: this.translateService.translate('ocdpayob.feeid'), field: 'offenderFeeId', editable: false,
              datatype: 'number', width: 150
            },
            {
              fieldName: this.translateService.translate('ocdpayob.feecode'), field: 'feeCode', editable: false,
              datatype: 'text', width: 150
            },
            {
              fieldName: this.translateService.translate('ocdpayob.billnumber'), field: 'billId', editable: false,
              datatype: 'string', width: 150
            },
            {
              fieldName: this.translateService.translate('ocdpayob.billdate'), field: 'billTxnDatetime', editable: false,
              datatype: 'date', width: 150
            },
            {
              fieldName: this.translateService.translate('ocdpayob.billstatus'), field: 'billStatus', editable: false, width: 150,
               maxlength: 240, datatype: 'text'      },
            // {
            //   fieldName: this.translateService.translate('ocdadjus.billTxnAmount'), field: 'billTxnAmount', editable: false,
            //   width: 150, datatype: 'text'
            // },
            {
                fieldName: this.translateService.translate('ocdpayob.balance'), field: 'balance', editable: false,
                width: 150, format: '1.2-2', whole: true, strictFP: true
              },
              {
                fieldName: this.translateService.translate('ocdpayob.amount'), field: 'amount', editable: true,
                width: 150, datatype: 'number',format: '1.2-2',minValue: 0.00, maxValue: 999999999.99,
                strictFP: true, whole: true, cellEditable: this.canCellEditrRestrictCaseload
              },//cellEditable: this.canCellEditAmount ,
            {
              fieldName: this.translateService.translate('ocdpayob.transaction'), field: 'trustTxnId', 
              width: 150,  datatype: 'number',editable: false
            },
          ];
    }

    canCellEditrRestrictCaseload = (data: any, index: number, field: string): boolean => {
        if (field === 'amount' && data.caseloadId && this.sessionManager.currentCaseLoad !== data.caseloadId) {
            return false;
        }
        return true;
    }
    offenderFeesBtnEnable() {
        const saveObj = this.ocdpayobFactory.getOffenderFeesEnableBtn();
        saveObj.subscribe(data => {
            this.btnFlag = data;
            if (this.btnFlag === 'Y') {
               this.btnEnble=true;
            }
            else {
                this.btnEnble=false;            }
        });
    }
    /**
    *  This function will be executed when we change the Offender in search block
   */
    onOffenderChange(offender) {
        this.offbncData = [];
        this.subAccountType = null;
        if (offender) {
            this.subAcntTypeLink = 'ocdpayob/cgfkOffTxnSubAccountTypeRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
            this.offtxnModel = new OffenderTransactions();
            this.vHeaderBlockModel = offender;
            this.offbncExecuteQuery();
            this.offFeeExecuteQuery();
            this.getCasePlanId();
            this.readOnlyFlag = false;
        } else {
            this.readOnlyFlag = true;
            this.vHeaderBlockModel = new VHeaderBlock();
            this.offtxnModel = new OffenderTransactions();
            this.offbncModel = new OffenderBeneficiaries();
            this.offbncData = [];
            this.offFeeData = [];
            this.saveBtn = true;
        }
    }
    /**
   *  This function will be executed when we edit the Amount column value in the grid
  */
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (this.offbncData.length < 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdpayob.offenderiddisplay');
            this.message = this.message.replace('%offIdDisplay%', this.vHeaderBlockModel.offenderIdDisplay);
            this.show();
            return false;
        }
        if (field === 'overrideAmount') {
            if (!this.offtxnModel.subAccountType) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.subaccounttypemustbeentered');
                this.show();
                return false;
            }
            if (!this.offtxnModel.txnEntryAmount && this.offtxnModel.txnEntryAmount !== 0) {
                this.type = 'warn';
                // this.message = this.translateService.translate('ocdpayob.transactionamountmustbeentered');
                this.message = this.translateService.translate('ocdpayob.amountmustbeentered');
                this.show();
                return false;
            }
            if (data.drvAmountTemp !== 'Unlimited' && data.overrideAmount > data.drvAmountTemp) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.theamountowingis') + data.drvAmountTemp;
                this.show();
                this.grid.setColumnData('overrideAmount', this.offbncData.indexOf(data), undefined);
                return true;
            }
        }
        return true;
    }

    onSubTypeBlur() {
        if (!this.subAccountType) {
        this.subAccountType = this.subAccountType === '' ? undefined : '';
        }
    }
    /**
     * event is fired when click on a row in the grid in the block of offender obligations.
     * @param event
     */
    onRowClickoffbnc(event) {
        if (event) {
            this.offbncModel = event;
            if (event && event.overrideAmount && event.overrideAmount === 0) {
                this.offbncModel.overrideAmount = event.overrideAmount.toFixed(2);
            }
        }

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
    *  This function will be executed when we change the Sub Account Type field
   */
    subAccTypeChangeEvent(event) {
        if (event) {
            if (event.code) {
                if (this.autoPoplate) {
                    this.autoPoplate = false;
                    setTimeout(ele => {
                          this.offtxnModel.subAccountType = null;
                          this.subAccountType = null;
                    }, 5);
                    return;
                } else if (this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId) {
                    this.offtxnModel.subAccountType = this.subAccountType;
                    this.offtxnBean = new OffenderTransactions();
                    this.offtxnBean.subAccountType = event.code;
                    this.offtxnBean.caseloadId = this.sessionManager.currentCaseLoad;
                    this.offtxnBean.caseloadType = this.sessionManager.currentCaseLoadType;
                    this.offtxnBean.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
                    const offtxnResult = this.ocdpayobFactory.
                        getCurrentBalance(this.offtxnBean);
                    offtxnResult.subscribe(result => {
                        this.offtxnModel.currentBalance = result.toFixed(2);
                    });
                    const offtxnResultData = this.ocdpayobFactory.
                        txnTyepOffTxns(event.code, this.sessionManager.currentCaseLoadType, this.sessionManager.currentCaseLoad);
                    offtxnResultData.subscribe(txnType => {
                        if (txnType) {
                            this.txnType = txnType;
                        } else {
                            this.txnType = null;
                            this.type = 'info';
                            this.message = this.translateService.translate('ocdpayob.nosetupfoundintransactionoperations');
                            this.show();
                        }
                    });
                }
            }
        } else {
            this.offtxnModel.currentBalance = undefined;
        }
    }
    /**
    *  This function will be executed when we change the Amount field
   */
    onAmountChangeEvent(event) {
        this.amountFormat.precisionFlot(event);
        if (event || event === 0) {
            if (Number(this.offtxnModel.txnEntryAmount) > Number(this.offtxnModel.currentBalance)) {
                this.offtxnModel.txnEntryAmount = undefined;
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.insufficientfunds');
                this.currentBalance = String(this.offtxnModel.currentBalance);
                this.message = String(this.message).replace('%currentBal%', this.currentBalance);
                this.show();
            }
        }
    }
    offtxnExecuteQuery() {
        const offtxnResult = this.ocdpayobFactory.
            offTxnExecuteQuery(this.offtxnModel);
        offtxnResult.subscribe(offtxnResultList => {
            if (offtxnResultList.length === 0) {
                this.offtxnData = [];
            } else {
                this.offtxnData = offtxnResultList;
                this.offtxnModel = offtxnResultList[0];
            }
        });
    }
    /**
	 *  This function will be executed when commit event is
	* fired
	*/
    ocdpayobSaveofftxnForm(event) {
        this.totalAmount = 0;
        this.offtxnInsertList = event.added;
        this.offtxnUpdateList = event.updated;
        this.offtxnDeleteList = event.removed;
        this.offtxnCommitModel.insertList = [];
        this.offtxnCommitModel.updateList = [];
        this.offtxnCommitModel.deleteList = [];
        if (this.offtxnUpdateList.length > 0) {
            this.offtxnCommitModel.insertList = this.offtxnInsertList;
            this.offtxnCommitModel.updateList = this.offtxnUpdateList;
        }
        if (this.offtxnDeleteList.length > 0) {
            for (let i = 0; i < this.offtxnDeleteList.length; i++) {
            }
            this.offtxnCommitModel.deleteList = this.offtxnDeleteList;
        }
        const offtxnSaveData = this.ocdpayobFactory.offTxnCommit(this.offtxnCommitModel);
        offtxnSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    /**
    *  This function will be executed to retrive grid data in Offender Obligation block
   */
    offbncExecuteQuery() {
        this.offbncModel = new OffenderBeneficiaries();
        this.offbncModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.offbncModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
        this.offbncModel.caseLoadType = this.sessionManager.currentCaseLoadType;
        const offbncResult = this.ocdpayobFactory.
            offBncExecuteQuery(this.offbncModel);
        offbncResult.subscribe(offbncResultList => {
            if (offbncResultList.length === 0) {
                this.offbncData = [];
            } else {
                for (let i = 0; i < offbncResultList.length; i++) {
                    if (offbncResultList[i].corporateId === 0) {
                        offbncResultList[i].corporateId = undefined;
                    }
                    if (offbncResultList[i].personId === 0) {
                        offbncResultList[i].personId = undefined;
                    }
                    if (offbncResultList[i].overrideAmount) {
                        offbncResultList[i].overrideAmount = offbncResultList[i].overrideAmount.toFixed(2);
                    }
                    if (offbncResultList[i].drvAmount === 123456) {
                        offbncResultList[i].drvAmountTemp = 'Unlimited';
                    } else {
                        offbncResultList[i].drvAmountTemp = offbncResultList[i].drvAmount.toFixed(2);
                    }
                }
                this.offbncData = offbncResultList;
                this.offbncModel = offbncResultList[0];
                this.selected = 0;
                // this.offbncDataTemp = JSON.parse(JSON.stringify(this.offbncData));
                // this.offbncDataTemp.forEach(bo => {
                //     bo.overrideAmount = undefined;
                // });
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdpayobSaveoffbncForm() {

        if (this.validateItem) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdpayob.mustbeinrange');
            this.show();
            return;
        }
        if (this.fieldItem) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.fieldmustbeofform');
            this.show();
            return;
        }
        if (!this.offtxnModel.subAccountType) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdpayob.subaccounttypemustbeentered');
            this.show();
            return;
        }
        if (!this.offtxnModel.txnEntryAmount) {
            this.type = 'warn';
            // this.message = this.translateService.translate('ocdpayob.transactionamountmustbeentered');
            this.message = this.translateService.translate('ocdpayob.amountmustbeentered');
            this.show();
            return;
        }
        if(this.offtxnModel.txnEntryAmount==0){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdpayob.amountenteredmustbegreaterthanzero');
            this.show();
            return; 
        }
        this.offenderObligationDataUpdate();
       // this.offenderFeeDataUpdate();
        this.totalAmount = 0;
        this.amountTotal = 0;
        //this.offbncInsertList = event.added;
        this.offbncUpdateList = this.offbncUpdateList;
        if (this.offFeesUpdateList.length == 0 && this.offbncUpdateList.length == 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdpayob.amountmustbeentered');
            this.show();
            return;
        }
        //this.offbncDeleteList = event.removed;
        this.offbncCommitModel.insertList = [];
        this.offbncCommitModel.updateList = [];
        this.offbncCommitModel.deleteList = [];
        if (this.offbncUpdateList.length > 0) {
            for (let i = 0; i < this.offbncUpdateList.length; i++) {
                if (this.offbncUpdateList[i].overrideAmount) {
                    this.totalAmount = this.totalAmount + Number(this.offbncUpdateList[i].overrideAmount);
                } else {
                    const overrideAmount = this.offbncUpdateList[i].overrideAmount ? this.offbncUpdateList[i].overrideAmount : 0;
                    this.totalAmount = this.totalAmount + overrideAmount;
                }
                this.offbncUpdateList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offbncUpdateList[i].caseloadId = this.sessionManager.currentCaseLoad;
                this.offbncUpdateList[i].subAccountType = this.offtxnModel.subAccountType;
                this.offbncUpdateList[i].txnEntryAmount = this.offtxnModel.txnEntryAmount;
                this.offbncUpdateList[i].txnType = this.txnType;
            }
            const txnNumber = Number(this.offtxnModel.txnEntryAmount);
            if (this.totalAmount !== 0 &&  txnNumber !== this.totalAmount) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.thepaymentamountdoesnotadd');
                this.show();
                return;
            } else if (this.totalAmount === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.thepaymentamountdoesnotadd');
                this.show();
                return;
            }
        }
        if(this.offFeesUpdateList.length > 0){
            this.amountTotal = 0;
            this.offFeesUpdateList.forEach(e => this.amountTotal = this.amountTotal + Number(e.amount));

            if (Number(this.offtxnModel.txnEntryAmount) != this.amountTotal) {
                var amt = Number(this.offtxnModel.txnEntryAmount) - Number(this.amountTotal);
                if (Number(amt) < 0) {
                    amt = (Number(amt) * -1);
                }
                this.type = 'warn';
                this.message = this.translateService.translate('Transaction is not in balance, difference of' + ` ${amt.toFixed(2)}`);
                this.show();
                return;
            }

            for(let i = 0; i < this.offFeesUpdateList.length ;i++){
                if (Number(this.offFeesUpdateList[i].balance) < Number(this.offFeesUpdateList[i].amount)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdpayob.amountenteredcannotbegreaterthanbalanceowing');
                    this.show();
                    return;
                }
                
                this.offFeesUpdateList[i].rootOffenderId= this.vHeaderBlockModel.rootOffenderId;
                this.offFeesUpdateList[i].offenderId= this.vHeaderBlockModel.offenderId; 
                this.offFeesUpdateList[i].billTxnUser = this.sessionManager.getId();
                this.offFeesUpdateList[i].billTxnType = this.txnType;
                this.offFeesUpdateList[i].offAdjCancRsn = undefined;
                this.offFeesUpdateList[i].offAdjSubRsn = undefined;
                this.offFeesUpdateList[i].offAdjTxnId = undefined;
                this.offFeesUpdateList[i].offAdjRevRsn = undefined;
                this.offFeesUpdateList[i].billTxnComment = undefined;
                this.offFeesUpdateList[i].originalBillId = undefined;
                this.offFeesUpdateList[i].originalBillTxnNo = undefined;
                this.offFeesUpdateList[i].originalOffAdjTxnId = undefined;
                this.offFeesUpdateList[i].billTxnDatetime = new Date(this.offFeesUpdateList[i].billTxnDatetime);
                this.offFeesUpdateList[i].billAgingEndDate = new Date( this.offFeesUpdateList[i].billAgingEndDate);
                this.offFeesUpdateList[i].billAgingStartDate = new Date(this.offFeesUpdateList[i].billAgingStartDate);
                this.offFeesUpdateList[i].billGenerateDatetime = new Date(this.offFeesUpdateList[i].billGenerateDatetime);

            }
        }
        // const txnNumber = Number(this.offtxnModel.txnEntryAmount);
        // if (this.totalAmount !== 0 &&  txnNumber !== this.totalAmount) {
        //     this.type = 'warn';
        //     this.message = this.translateService.translate('ocdpayob.thepaymentamountdoesnotadd');
        //     this.show();
        //     return;
        // } else if (this.totalAmount === 0) {
        //     this.type = 'warn';
        //     this.message = this.translateService.translate('ocdpayob.thepaymentamountdoesnotadd');
        //     this.show();
        //     return;
        // }
        this.offbncCommitModel.updateList = this.offbncUpdateList;
        this.offbncCommitModel.offFeeBillupdateList = this.offFeesUpdateList;
        //Statement Insert List
        this.offbncCommitModel.stmtInsertList = this.offBillStmtInsertlist;
        if (this.offbncDeleteList.length > 0) {
            for (let i = 0; i < this.offbncDeleteList.length; i++) {
            }
            this.offbncCommitModel.deleteList = this.offbncDeleteList;
        }
        const offbncSaveData = this.ocdpayobFactory.offBncCommit(this.offbncCommitModel);
        offbncSaveData.subscribe(data => {
            if (data.sealFlag === 'A') {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                // this.offtxnModel = new OffenderTransactions();
                // this.subAccountType = null;
                this.saveBtn=true;
                this.saveFlagForTxn = true;
                this.offFeeExecuteQuery();
                return;
            } else if (data.sealFlag === 'B') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.transactionamountmustbeentered');
                this.show();
                return;
            } else if (data.sealFlag === 'C') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.subaccounttypemustbeentered');
                this.show();
                return;
            } else if (data.sealFlag === 'D') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.othererror');
                this.show();
                return;
            } else if (data.sealFlag === 'E') {
                this.type = 'success';
                this.message = this.translateService.translate('ocdpayob.transactionposted');
                this.message = String(this.message).replace('%txnId%', data.offenderDeductionId);
                this.show();
                this.offbncExecuteQuery();
                return;
            } else if (data.sealFlag === 'F') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.othererrorfincanial');
                this.show();
                return;
            } else if (data.sealFlag === 'G') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.transactionnotprocessed');
                this.show();
                return;
            } else if (data.sealFlag === 'H') {
                this.type = 'warn';
                this.message = this.translateService.translate('Error(trust.insert_gl_trans_new)');
                this.show();
                return;
            }else if (data.sealFlag === 'I') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdbreci.amountcannotbegreaterthanbalanceowing');
                this.show();
                return;
            }else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }
    syspflExecuteQuery() {
        const syspflResult = this.ocdpayobFactory.
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
    /**
    *  This function will be executed when validaterow event is
   * fired
   */
    amountChangeEvent = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'overrideAmount') {
            if (event.data.drvAmountTemp !== 'Unlimited' && Number(event.data.overrideAmount) > Number(event.data.drvAmountTemp)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.theamountowingis') + event.data.drvAmountTemp;
                this.show();
                this.grid.setColumnData('overrideAmount', rowIndex, undefined);
                event.data.overrideAmount = undefined;
                rowdata.validated = true;
                return rowdata;
            } else if (event.newValue && String(event.newValue).startsWith('-')) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdpayob.mustbeinrange');
                this.show();
                this.validateItem = true;
            } else if (event.data.overrideAmount && isNaN(Number(event.data.overrideAmount))) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.fieldmustbeofform');
                this.show();
                this.fieldItem = true;
            } else {
                if (event.data.overrideAmount || event.data.overrideAmount === 0) {
                    if (Number(event.data.overrideAmount) >= 1000000000) {
                        this.validateRowIndex = rowIndex;
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.fieldmustbeofform');
                        this.grid.setColumnData('overrideAmount', rowIndex, undefined);
                        this.show();
                    } else {
                        this.grid.setColumnData('overrideAmount', rowIndex,
                            Number(event.data.overrideAmount).toFixed(2));
                    }
                    this.validateItem = false;
                    this.fieldItem = false;
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    amountKeyDown(event, comp) {
        if (!this.amountFormat.avoidKeys(event, this.offtxnModel.txnEntryAmount)) {
              event.stopPropagation();
              return false;
        }
  }

    offFeeExecuteQuery() {
        this.offDataModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdpayobFactory.offFeeExecuteQuery(this.offDataModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offFeeData = [];
                this.saveBtn = true;
            } else {
                if (this.saveFlagForTxn) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].balance = data[i].balance.toFixed(2);
                        data[i].trustTxnIdTemp = data[i].trustTxnId;
                        data[i].trustTxnId = undefined;
                    }
                    if (this.offFeesUpdateList.length > 0) {
                        for (let j = 0; j < this.offFeesUpdateList.length; j++) {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].billId == this.offFeesUpdateList[j].billId) {
                                    data[i].amount = this.offFeesUpdateList[j].amount;
                                    if( data[i].amount>0){
                                    data[i].trustTxnId = data[i].trustTxnIdTemp;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    for (let i = 0; i < data.length; i++) {
                        data[i].balance = data[i].balance.toFixed(2);
                        data[i].trustTxnId = undefined;
                    }
                }
                this.offFeeData = data;
                this.offFeeDataTemp = JSON.parse(JSON.stringify(this.offFeeData));
                this.offFeeDataTemp.forEach(bo => {
                    bo.trustTxnId = undefined;
                    bo.amount = undefined;
                });
            }
        });
    }

offenderFeeDataUpdate() {
    this.offFeesUpdateList = [];
    this.offFeesGrid.updatedMap.forEach(
        (v: any, k: number) => {
            if (v.amount && v.amount >= 0) {
                this.offFeesUpdateList.push(v);
            }
        }
    );
}
offenderObligationDataUpdate() {
    this.offbncUpdateList = [];
    this.grid.updatedMap.forEach(
        (v: any, k: number) => {
            if (v.amount && v.amount > 0) {
                this.offbncUpdateList.push(v);
            }
        }
    );
}


    canCellEditAmount = (data: any, index: number, field: string): boolean => {
        if(!this.offtxnModel.subAccountType){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdpayob.subaccounttypemustbeentered');
            this.show();
            return false;
        }
        if (!this.offtxnModel.txnEntryAmount && this.offtxnModel.txnEntryAmount !== 0) {
            this.type = 'warn';
            // this.message = this.translateService.translate('ocdpayob.transactionamountmustbeentered');
            this.message = this.translateService.translate('ocdpayob.amountmustbeentered');
            this.show();
            return false;
        }
        this.saveBtn=false;
        return true;
    }
    //on grid clear 
    onGridClear = () => {
        this.offFeeExecuteQuery();
        return true;
    }

    getbillEndDayPfVal() {
        const serviceObj = this.ocdpayobFactory.getbillEndDayPfVal();
        serviceObj.subscribe(data => {
            if (data === undefined || data === null) {
                this.billEndDay = undefined;
            } else {
                this.billEndDay = data;
                this.billingCycleEndDate = DateFormat.getDate();
                this.billingCycleEndDate = DateFormat.getDate(this.billingCycleEndDate.setDate(this.billEndDay));
                this.billingCycleStartDate = DateFormat.getDate();
                this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setDate(this.billEndDay + 1));
                this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setMonth(DateFormat.getDate().getMonth() - 1));
                if (DateFormat.getDate().getMonth() === 1) {
                    this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setFullYear(DateFormat.getDate().getFullYear() - 1))
                }
            }
        });
    }

    getCasePlanId() {
        const serviceObj = this.ocdpayobFactory.getCasePlanId(this.vHeaderBlockModel);
        serviceObj.subscribe(data => {
            if (data === undefined || data === 0) {
                this.caseplanId = undefined;
            } else {
                this.caseplanId = data;
            }
        });
    }

    no() {
        this.subAccountType = null;
        this.offtxnModel.currentBalance = null;
        this.offtxnModel.txnEntryAmount = null;
        this.offFeeData = [];
        this.offFeeData = this.offFeeDataTemp;
        if(this.offbncData && this.offbncData.length > 0){
        this.offbncDataTemp = JSON.parse(JSON.stringify(this.offbncData));
        this.offbncDataTemp.forEach(bo => {
            bo.overrideAmount = undefined;
        });
        this.offbncData = this.offbncDataTemp;
       }
        this.saveBtn = true;
    }

    get clearBtn() {
        if (this.offtxnModel.txnEntryAmount || this.subAccountType) {
            return false;
        } else {
            return true;
        }
    }
    
    get saveBtnFun(){
        if (this.offtxnModel.txnEntryAmount || this.subAccountType) {
            return false;
        } else {
            return true;
        }
    }

    onRowClickOffFeeBill(event) {
        if (event) {
            this.offFeeDataModel = event;
            if (event && event.amount && event.amount === 0) {
                this.offFeeDataModel.amount = event.amount.toFixed(2);
            }
        }

    }
}