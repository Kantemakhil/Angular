
import { BaseModel } from '@commonbeans/BaseModel';
export class StgLocations extends BaseModel {
    private _createDatetime: Date;
    private _country: string;
    private _locationSeq: number;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _provState: string;
    private _cityCode: string;
    private _modifyUserId: string;
    private _stgId: number;
    private _sealFlag: string;
    private _commentText: string;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get country(): string { return this._country; }
    set country(pcountry: string) { this._country = pcountry; }
    get locationSeq(): number { return this._locationSeq; }
    set locationSeq(plocationSeq: number) { this._locationSeq = plocationSeq; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get provState(): string { return this._provState; }
    set provState(pprovState: string) { this._provState = pprovState; }
    get cityCode(): string { return this._cityCode; }
    set cityCode(pcityCode: string) { this._cityCode = pcityCode; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get stgId(): number { return this._stgId; }
    set stgId(pstgId: number) { this._stgId = pstgId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'country': this._country,
            'locationSeq': this._locationSeq,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'provState': this._provState,
            'cityCode': this._cityCode,
            'modifyUserId': this._modifyUserId,
            'stgId': this._stgId,
            'sealFlag': this._sealFlag,
            'commentText': this._commentText,
        };
    }
}
