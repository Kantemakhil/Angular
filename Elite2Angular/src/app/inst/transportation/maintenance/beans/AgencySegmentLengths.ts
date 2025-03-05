import { BaseModel } from '@commonbeans/BaseModel';
export class AgencySegmentLengths extends BaseModel {
    private _createDatetime: Date;
    private _createUserId: string;
    private _fromAgyLocId: string;
    private _modifyDatetime: number;
    private _modifyUserId: string;
    private _segmentLength: number;
    private _sealFlag: string;
    private _toAgyLocId: string;
    private _fromDescription: string;
    private _toDescription: string;
    private _nbtSegmentLength: Date;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get fromAgyLocId(): string { return this._fromAgyLocId; }
    set fromAgyLocId(pfromAgyLocId: string) { this._fromAgyLocId = pfromAgyLocId; }
    get modifyDatetime(): number { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: number) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get segmentLength(): number { return this._segmentLength; }
    set segmentLength(psegmentLength: number) { this._segmentLength = psegmentLength; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get toAgyLocId(): string { return this._toAgyLocId; }
    set toAgyLocId(ptoAgyLocId: string) { this._toAgyLocId = ptoAgyLocId; }
    get fromDescription(): string { return this._fromDescription; }
    set fromDescription(pfromDescription: string) { this._fromDescription = pfromDescription; }
    get toDescription(): string { return this._toDescription; }
    set toDescription(ptoDescription: string) { this._toDescription = ptoDescription; }
    get nbtSegmentLength(): Date{ return this._nbtSegmentLength; }
    set nbtSegmentLength(pnbtSegmentLength: Date){ this._nbtSegmentLength = pnbtSegmentLength ;}

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'fromAgyLocId': this._fromAgyLocId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'segmentLength': this._segmentLength,
            'sealFlag': this._sealFlag,
            'toAgyLocId': this._toAgyLocId,
            'fromDescription': this._fromDescription,
            'toDescription': this._toDescription,
            'nbtSegmentLength': this._nbtSegmentLength,
        };
    }
}
