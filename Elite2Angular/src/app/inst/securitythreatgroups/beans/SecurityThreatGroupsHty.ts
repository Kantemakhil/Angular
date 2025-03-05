export class SecurityThreatGroupsHty {
    private _htySeq: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _fromPStgId: number;
    private _toPStgId: number;
    private _stgId: number;
    private _createDatetime: Date;
    private _toStgLevel: string;
    private _serialVersionUID: number;
    private _action: string;
    private _fromStgLevel: string;
    private _listSeq: number;
    private _sealFlag: string;
    private _effectiveDate: Date;

    get htySeq(): number { return this._htySeq; }

    set htySeq(phtySeq: number) { this._htySeq = phtySeq; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get fromPStgId(): number { return this._fromPStgId; }

    set fromPStgId(pfromPStgId: number) { this._fromPStgId = pfromPStgId; }

    get toPStgId(): number { return this._toPStgId; }

    set toPStgId(ptoPStgId: number) { this._toPStgId = ptoPStgId; }

    get stgId(): number { return this._stgId; }

    set stgId(pstgId: number) { this._stgId = pstgId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get toStgLevel(): string { return this._toStgLevel; }

    set toStgLevel(ptoStgLevel: string) { this._toStgLevel = ptoStgLevel; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get action(): string { return this._action; }

    set action(paction: string) { this._action = paction; }

    get fromStgLevel(): string { return this._fromStgLevel; }

    set fromStgLevel(pfromStgLevel: string) { this._fromStgLevel = pfromStgLevel; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get effectiveDate(): Date { return this._effectiveDate; }

    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }


    toJSON(): any {
        return {
            'htySeq': this._htySeq,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'fromPStgId': this._fromPStgId,
            'toPStgId': this._toPStgId,
            'stgId': this._stgId,
            'createDatetime': this._createDatetime,
            'toStgLevel': this._toStgLevel,
            'serialVersionUID': this._serialVersionUID,
            'action': this._action,
            'fromStgLevel': this._fromStgLevel,
            'listSeq': this._listSeq,
            'sealFlag': this._sealFlag,
            'effectiveDate': this._effectiveDate,
        };
    }
}
