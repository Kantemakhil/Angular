import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdcrefuService } from '../service/ocdcrefu.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
// import required bean declarations

@Component({
	selector: 'app-ocdcrefu',
	templateUrl: './ocdcrefu.component.html'
})

export class OcdcrefuComponent implements OnInit {
	// Variable declaration
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	offtxnData: OffenderTransactions[] = [];
	offtxnDataTemp: OffenderTransactions[] = [];
	vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
	// TODO angular.copy(this.offtxnData, thisofftxnDataTemp);
	offtxnModel: OffenderTransactions = new OffenderTransactions();
	offtxnIndex = 0;
	offtxnInsertList: OffenderTransactions[] = [];
	offtxnUpdatetList: OffenderTransactions[] = [];
	offtxnDeleteList: OffenderTransactions[] = [];
	minDate: Date;
	type: string;
	message: string;
	msglist: any[];
	saveDisabled = false;
	clearDisabled = false;
	disableSaveButton = false;
	saveFlagDisabled: boolean;
	saveFlag: boolean;
	saveButClick: boolean;
	offenderRefundsReadonly: boolean;
	constructor(private ocdcrefuFactory: OcdcrefuService, public translateService: TranslateService,
		public sessionManager: UserSessionManager, private amountFormat: AmountFormatUtil) {
	}
	ngOnInit(): void {
		this.offenderRefundsReadonly = true;
			this.clearDisabled=true;
			this.disableSaveButton=true;
	}

	cancel() {
		this.offtxnModel.txnEntryAmount = undefined;
		this.offtxnModel.txnEntryDesc = ' ';

	}

	/** 
 * This function displays the messages
 */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	onAmountBlur(amount) {
		this.amountFormat.precisionFlot(amount);
	}


	onOffenderChange(offender) {
		if (offender) {
			this.vHeaderBlockModel = offender;
			this.offenderRefundsReadonly = false;
			this.clearDisabled=false;
			this.disableSaveButton=false;
			this.offtxnExecuteQuery();

		} else {
			this.vHeaderBlockModel = new VHeaderBlock();
			this.offtxnModel = new OffenderTransactions();
			this.offtxnModel.txnEntryAmount = undefined;
			this.offenderRefundsReadonly=true;
			this.clearDisabled=true;
			this.disableSaveButton=true;
			


		}
	}


	offtxnExecuteQuery() {
		this.offtxnModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
		this.offtxnModel.caseloadId = this.sessionManager.currentCaseLoad;
		const offtxnResult = this.ocdcrefuFactory.
			offTxnExecuteQuery(this.offtxnModel);
		offtxnResult.subscribe(data => {
			if (data.length === 0) {

			} else {
				
				this.offtxnModel.txnEntryDesc = data[0].txnEntryDesc;

				if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !data[0].nbtOverpaymentAmount) {
					data[0].nbtOverpaymentAmount = 0;
				}
				this.offtxnModel.nbtOverpaymentAmount = (data[0].nbtOverpaymentAmount).toFixed(2);
				
			}
		});
	}


	onValidateTxnEntryAmount(event, param) {
		this.saveFlag = false;
		if (this.vHeaderBlockModel) {
			this.offtxnModel.caseloadId = this.sessionManager.currentCaseLoad;
			this.offtxnModel.nbtOverpaymentAmount = this.offtxnModel.nbtOverpaymentAmount;

			const offtxnResult = this.ocdcrefuFactory.
				onValidateTxnEntryAmount(this.offtxnModel);
			offtxnResult.subscribe(data => {
				if (data.length === 0) {
					this.saveFlag = false;
				} else {
					const offtxnResultData = data[0];
					if (offtxnResultData.sealFlag === '1') {
						this.saveFlag = false;
						this.type = 'warn';
						this.message = this.translateService.translate('ocdcrefu.transactionOperations');
						this.show();
					} else if (offtxnResultData.sealFlag === '2') {
						this.saveFlag = false;
						this.type = 'warn';
						this.message = this.translateService.translate('ocdcrefu.transactionCannotBeProcessed') + '' + offtxnResultData.amount;
						this.show();
					} else if (offtxnResultData.sealFlag === '3') {
						this.saveFlag = false;
						this.type = 'warn';
						this.message = this.translateService.translate('ocdcrefu.refundAmountCannotExceedOverpaymentAmount');
						this.show();
					} else if (offtxnResultData.sealFlag === '4') {
						this.saveFlag = false;
						this.type = 'warn';
						this.message = this.translateService.translate('ocdcrefu.refundAmountCannotLessThanOverpaymentAmount');
						this.show();
					} else if(!offtxnResultData.sealFlag){
						this.saveFlag=true;
					}
				

					if (param === '1' && this.saveFlag ) {
						this.saveOffenderRefunds();
					}
				}
			});
		}

	}


	saveOffenderRefunds() {
		this.disableSaveButton = true;
		this.offtxnModel.firstName = this.vHeaderBlockModel.firstName;
		this.offtxnModel.lastName = this.vHeaderBlockModel.lastName;


		this.offtxnModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
		this.offtxnModel.caseloadId = this.sessionManager.currentCaseLoad;
		this.offtxnModel.txnEntrySeq = 1;
		this.offtxnModel.txnPostingType = 'DR';
		this.offtxnModel.txnType = 'REF';
		this.offtxnModel.slipPrintedFlag = 'N';
		this.offtxnModel.subAccountType = 'REG';


		const offtxnSaveData = this.ocdcrefuFactory.offTxnCommit(this.offtxnModel);
		offtxnSaveData.subscribe(data => {
			this.disableSaveButton = false;
			if (data.sealFlag === '1') {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
			} else if (data.sealFlag === '2') {
				this.type = 'warn';
				this.message = this.translateService.translate('ocdcrefu.ChequeProductionFlag');
				this.show();
			} else {
			// 	this.clearDisabled = true;
				this.offtxnModel = new OffenderTransactions();
				this.offtxnModel.txnEntryAmount = undefined;
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.offtxnExecuteQuery();
			}
		});
	}





	ocdcrefuSaveofftxnForm() {
		this.saveButClick = true;


		if (this.offtxnModel.txnEntryAmount === undefined || !this.offtxnModel.txnEntryAmount) {
			this.saveFlag = false;
			this.type = 'warn';
			this.message = this.translateService.translate('ocdcrefu.refundAmountVal');
			this.show();
			return;
		} if (this.offtxnModel.txnEntryDesc ===' ' || this.offtxnModel.txnEntryDesc === undefined || !this.offtxnModel.txnEntryDesc) {
			this.saveFlag = false;
			this.type = 'warn';
			this.message = this.translateService.translate('common.reasonmustbeentered');
			this.show();
			return;
		}
		else {
			this.onValidateTxnEntryAmount(this.offtxnModel.txnEntryAmount, '1');
		}

	}
}