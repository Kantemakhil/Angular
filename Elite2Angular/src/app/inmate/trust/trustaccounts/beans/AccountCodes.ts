export class AccountCodes {
    private _recAccountCode: number;
    private _accountCode: number;
    private _createUserId: string;
    private _modifyDate: Date;
    private _accountName: string;
    private _modifyDatetime: number;
    private _accountType: string;
    private _modifyUserId: string;
    private _subAccountType: string;
    private _caseloadType: string;
    private _postingStatusFlag: string;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _allCaseloadFlag: string;
    private _listSeq: number;
    private _sealFlag: string;
    private _txnPostingType: string;
    private _caseloadId: string;
    private _lvlastClosedPeriod: number;
    private _lvallowedreopenPeriod: number;
    private _lvEnteraccountPeriodId: number;
    private _txnEntryDate: Date;
    private _parentAccountCode: number;
    private _code: any;
    private _description: any;


    get txnEntryDate(): Date { return  this._txnEntryDate; }

    set txnEntryDate(ptxnEntryDate: Date) { this._txnEntryDate = ptxnEntryDate; }

    get caseloadId(): string { return  this._caseloadId; }

    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get lvlastClosedPeriod(): number { return  this._lvlastClosedPeriod; }

    set lvlastClosedPeriod(plvlastClosedPeriod: number) { this._lvlastClosedPeriod = plvlastClosedPeriod; }

    get lvallowedreopenPeriod(): number { return  this._lvallowedreopenPeriod; }

    set lvallowedreopenPeriod(plvallowedreopenPeriod: number) { this._lvallowedreopenPeriod = plvallowedreopenPeriod; }

    get lvEnteraccountPeriodId(): number { return  this._lvEnteraccountPeriodId; }

    set lvEnteraccountPeriodId(plvEnteraccountPeriodId: number) { this._lvEnteraccountPeriodId = plvEnteraccountPeriodId; }

    get recAccountCode(): number { return  this._recAccountCode; }

    set recAccountCode(precAccountCode: number) { this._recAccountCode = precAccountCode; }

    get accountCode(): number { return  this._accountCode; }

    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }

    get createUserId(): string { return  this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDate(): Date { return  this._modifyDate; }

    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }

    get accountName(): string { return  this._accountName; }

    set accountName(paccountName: string) { this._accountName = paccountName; }

    get modifyDatetime(): number { return  this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: number) { this._modifyDatetime = pmodifyDatetime; }

    get accountType(): string { return  this._accountType; }

    set accountType(paccountType: string) { this._accountType = paccountType; }

    get modifyUserId(): string { return  this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get subAccountType(): string { return  this._subAccountType; }

    set subAccountType(psubAccountType: string) { this._subAccountType = psubAccountType; }

    get caseloadType(): string { return  this._caseloadType; }

    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

    get postingStatusFlag(): string { return  this._postingStatusFlag; }

    set postingStatusFlag(ppostingStatusFlag: string) { this._postingStatusFlag = ppostingStatusFlag; }

    get createDatetime(): Date { return  this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return  this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get allCaseloadFlag(): string { return  this._allCaseloadFlag; }

    set allCaseloadFlag(pallCaseloadFlag: string) { this._allCaseloadFlag = pallCaseloadFlag; }

    get listSeq(): number { return  this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get sealFlag(): string { return  this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get txnPostingType(): string { return  this._txnPostingType; }

    set txnPostingType(ptxnPostingType: string) { this._txnPostingType = ptxnPostingType; }

    get parentAccountCode(): number { return  this._parentAccountCode; }

    set parentAccountCode(pparentAccountCode: number) { this._parentAccountCode = pparentAccountCode; }

    get code(): any { return this._code; }

    set code(pcode: any) { this._code=pcode; }

    get description(): any { return this._description; }

    set description(pdescription: any){ this._description=pdescription; }

toJSON(): any {
    return {
       'recAccountCode': this._recAccountCode,
       'accountCode': this._accountCode,
       'createUserId': this._createUserId,
       'modifyDate': this._modifyDate,
       'accountName': this._accountName,
       'modifyDatetime': this._modifyDatetime,
       'accountType': this._accountType,
       'modifyUserId': this._modifyUserId,
       'subAccountType': this._subAccountType,
       'caseloadType': this._caseloadType,
       'postingStatusFlag': this._postingStatusFlag,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'allCaseloadFlag': this._allCaseloadFlag,
       'listSeq': this._listSeq,
       'sealFlag': this._sealFlag,
       'txnPostingType': this._txnPostingType,
       'caseloadId': this._caseloadId,
       'lvEnteraccountPeriodId': this._lvEnteraccountPeriodId,
       'lvallowedreopenPeriod': this._lvallowedreopenPeriod,
       'lvlastClosedPeriod': this._lvlastClosedPeriod,
       'txnEntryDate': this._txnEntryDate,
       'parentAccountCode': this._parentAccountCode,
       'code':this._code,
       'description':this._description
        };
    }
}
