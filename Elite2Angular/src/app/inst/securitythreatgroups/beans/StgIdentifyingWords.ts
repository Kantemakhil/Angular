import { BaseModel } from '@commonbeans/BaseModel';


export class StgIdentifyingWords extends BaseModel {

    private _code: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _description: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _stgId: number;
    private _wordSeq: number;

    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(_createUserId: string) { this._createUserId = _createUserId; }

    get description(): string {
        return this._description;
    }

    set description(pdescription: string) {
        this._description = pdescription;
    }

    get modifyDatetime(): Date {
        return this._modifyDatetime;
    }

    set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime;
    }

    get modifyUserId(): string {
        return this._modifyUserId;
    }

    set modifyUserId(pmodifyUserId: string) {
        this._modifyUserId = pmodifyUserId;
    }

    get sealFlag(): string {
        return this._sealFlag;
    }

    set sealFlag(psealFlag: string) {
        this._sealFlag = psealFlag;
    }

    get stgId(): number {
        return this._stgId;
    }

    set stgId(pstgId: number) {
        this._stgId = pstgId;
    }

    get wordSeq(): number {
        return this._wordSeq;
    }

    set wordSeq(pwordSeq: number) {
        this._wordSeq = pwordSeq;
    }
    toJSON(): any {
        return {
            'code': this._code,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'description': this._description,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'stgId': this._stgId,
            'wordSeq': this._wordSeq
        };
    }
}
