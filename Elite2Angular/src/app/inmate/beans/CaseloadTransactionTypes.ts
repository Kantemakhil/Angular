export class CaseloadTransactionTypes {
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDate: Date;
    private _modifyDateTime: Date;
    private _caseloadId: string;
    private _modifyUserId: string;
    private _listSeq: number;
    private _txnType: string;
    private _sealFlag: string;
	private _createDateTime: Date;
	private _txnEntryDesc: string;

	get txnEntryDesc(): string { return this._txnEntryDesc; }

    set txnEntryDesc(ptxnEntryDesc: string) { this._txnEntryDesc = ptxnEntryDesc; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDate(): Date { return this._modifyDate; }

    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq ; }

    get txnType(): string { return this._txnType; }

    set txnType(ptxnType: string) { this._txnType = ptxnType; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }


    toJSON(): any {
        return {
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDate': this._modifyDate,
            'modifyDateTime': this._modifyDateTime,
            'caseloadId': this._caseloadId,
            'modifyUserId': this._modifyUserId,
            'listSeq': this._listSeq,
            'txnType': this._txnType,
            'sealFlag': this._sealFlag,
			'createDateTime': this._createDateTime,
			'txnEntryDesc': this._txnEntryDesc,
        };
    }
}