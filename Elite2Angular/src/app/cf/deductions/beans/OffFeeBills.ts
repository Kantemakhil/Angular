export class OffFeeBills {
    private _billGenerateUser: string;
    private _billGenerateStatus: string;
    private _billStatementDate: Date;
    private _billLdppStartDate: Date;
    private _billDate: Date;
    private _billGenerateDatetime: Date;
    private _billArDueDate: Date;
    private _statementGeneratedFlag: string;
    private _billGenerateAmount: number;
    private _billingStatementId: number;
    private _billLdppEndDate: Date;
    private _billId: string;
    private _billGenerateStaffId: number;
    private _offenderFeeId: number;
    private _createUserId: string;
    private _modifyUserId: string;
    private _modifyDatetime: Date;
    private _createDatetime: Date;
    private _billGenerateAmountTot: number;
    private _billOverrideIncreaseAmount:number;
    private _billOverrideIncreaseAmountTot: number;
    private _billOverrideDecreaseAmount:number;
    private _billOverrideDecreaseAmountTot: number;
    private _billTotalAmount: number;
    private _billTotalAmountTot: number;
    private _commentText: string;
    private _userId: string;
    private _offenderBookId: number;
    private _rootOffenderId: number;

    get billGenerateUser(): string{ return this._billGenerateUser; }
    set billGenerateUser(pbillGenerateUser: string){ this._billGenerateUser = pbillGenerateUser ;}
    get billGenerateStatus(): string{ return this._billGenerateStatus; }
    set billGenerateStatus(pbillGenerateStatus: string){ this._billGenerateStatus = pbillGenerateStatus ;}
    get billStatementDate(): Date{ return this._billStatementDate; }
    set billStatementDate(pbillStatementDate: Date){ this._billStatementDate = pbillStatementDate ;}
    get billLdppStartDate(): Date{ return this._billLdppStartDate; }
    set billLdppStartDate(pbillLdppStartDate: Date){ this._billLdppStartDate = pbillLdppStartDate ;}
    get billDate(): Date{ return this._billDate; }
    set billDate(pbillDate: Date){ this._billDate = pbillDate ;}
    get billGenerateDatetime(): Date{ return this._billGenerateDatetime; }
    set billGenerateDatetime(pbillGenerateDatetime: Date){ this._billGenerateDatetime = pbillGenerateDatetime ;}
    get billArDueDate(): Date{ return this._billArDueDate; }
    set billArDueDate(pbillArDueDate: Date){ this._billArDueDate = pbillArDueDate ;}
    get statementGeneratedFlag(): string{ return this._statementGeneratedFlag; }
    set statementGeneratedFlag(pstatementGeneratedFlag: string){ this._statementGeneratedFlag = pstatementGeneratedFlag ;}
    get billGenerateAmount(): number{ return this._billGenerateAmount; }
    set billGenerateAmount(pbillGenerateAmount: number){ this._billGenerateAmount = pbillGenerateAmount ;}
    get billingStatementId(): number{ return this._billingStatementId; }
    set billingStatementId(pbillingStatementId: number){ this._billingStatementId = pbillingStatementId ;}
    get billLdppEndDate(): Date{ return this._billLdppEndDate; }
    set billLdppEndDate(pbillLdppEndDate: Date){ this._billLdppEndDate = pbillLdppEndDate ;}
    get billId(): string{ return this._billId; }
    set billId(pbillId: string){ this._billId = pbillId ;}
    get billGenerateStaffId(): number{ return this._billGenerateStaffId; }
    set billGenerateStaffId(pbillGenerateStaffId: number){ this._billGenerateStaffId = pbillGenerateStaffId ;}
    get offenderFeeId(): number{ return this._offenderFeeId; }
    set offenderFeeId(poffenderFeeId: number){ this._offenderFeeId = poffenderFeeId ;}


    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get billGenerateAmountTot(): number{ return this._billGenerateAmountTot; }
    set billGenerateAmountTot(pbillGenerateAmountTot: number){ this._billGenerateAmountTot = pbillGenerateAmountTot ;}
    get billOverrideIncreaseAmount(): number{ return this._billOverrideIncreaseAmount; }
    set billOverrideIncreaseAmount(pbillOverrideIncreaseAmount: number){ this._billOverrideIncreaseAmount = pbillOverrideIncreaseAmount ;}
    get billOverrideIncreaseAmountTot(): number{ return this._billOverrideIncreaseAmountTot; }
    set billOverrideIncreaseAmountTot(pbillOverrideIncreaseAmountTot: number){ this._billOverrideIncreaseAmountTot = pbillOverrideIncreaseAmountTot ;}
    get billOverrideDecreaseAmount(): number{ return this._billOverrideDecreaseAmount; }
    set billOverrideDecreaseAmount(pbillOverrideDecreaseAmount: number){ this._billOverrideDecreaseAmount = pbillOverrideDecreaseAmount ;}
    get billOverrideDecreaseAmountTot(): number{ return this._billOverrideDecreaseAmountTot; }
    set billOverrideDecreaseAmountTot(pbillOverrideDecreaseAmountTot: number){ this._billOverrideDecreaseAmountTot = pbillOverrideDecreaseAmountTot ;}
    get billTotalAmount(): number{ return this._billTotalAmount; }
    set billTotalAmount(pbillTotalAmount: number){ this._billTotalAmount = pbillTotalAmount ;}
    get billTotalAmountTot(): number{ return this._billTotalAmountTot; }
    set billTotalAmountTot(pbillTotalAmountTot: number){ this._billTotalAmountTot = pbillTotalAmountTot ;}
    
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}

    get userId(): string{ return this._userId; }
    set userId(puserId: string){ this._userId = puserId ;}

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    get rootOffenderId(): number { return this._rootOffenderId; }

    set rootOffenderId( prootOffenderId: number ) { this._rootOffenderId = prootOffenderId; }

toJSON(): any {
    return { 
       'billGenerateUser': this._billGenerateUser,
       'billGenerateStatus': this._billGenerateStatus,
       'billStatementDate': this._billStatementDate,
       'billLdppStartDate': this._billLdppStartDate,
       'billDate': this._billDate,
       'billGenerateDatetime': this._billGenerateDatetime,
       'billArDueDate': this._billArDueDate,
       'statementGeneratedFlag': this._statementGeneratedFlag,
       'billGenerateAmount': this._billGenerateAmount,
       'billingStatementId': this._billingStatementId,
       'billLdppEndDate': this._billLdppEndDate,
       'billId': this._billId,
       'billGenerateStaffId': this._billGenerateStaffId,
       'offenderFeeId': this._offenderFeeId,
       'createUserId': this._createUserId,
       'modifyUserId': this._modifyUserId,
       'modifyDatetime': this._modifyDatetime,
       'createDatetime': this._createDatetime,
       'billGenerateAmountTot': this._billGenerateAmountTot,
       'billOverrideIncreaseAmount': this.billOverrideIncreaseAmount,
       'billOverrideIncreaseAmountTot': this._billOverrideIncreaseAmountTot,
       'billOverrideDecreaseAmount': this._billOverrideDecreaseAmount,
       'billOverrideDecreaseAmountTot': this._billOverrideDecreaseAmountTot,
       'billTotalAmount': this._billTotalAmount,
       'billTotalAmountTot': this._billTotalAmountTot,
       'commentText': this._commentText,
       'userId': this._userId,
       'offenderBookId': this._offenderBookId,
       'rootOffenderId': this._rootOffenderId,
        };
    } 
}