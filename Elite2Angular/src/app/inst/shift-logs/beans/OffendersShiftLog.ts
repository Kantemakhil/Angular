
export class OffendersShiftLog {
    private _createDatetime: Date;
    private _reason: string;
    private _createUserId: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _shiftLogSeq: number;
    private _modifyUserId: string;
    private _internalLocationId: number;
    private _offenderFullName: string;
    public get offenderFullName(): string {
        return this._offenderFullName;
    }
    public set offenderFullName(value: string) {
        this._offenderFullName = value;
    }
    private _offenderIdDisplay: string;
   
    
    private _livingUnitDescription: string;
    public get livingUnitDescription(): string {
        return this._livingUnitDescription;
    }
    public set livingUnitDescription(value: string) {
        this._livingUnitDescription = value;
    }
    

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get reason(): string { return this._reason; }
    set reason(preason: string) { this._reason = preason; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get shiftLogSeq(): number { return this._shiftLogSeq; }
    set shiftLogSeq(pshiftLogSeq: number) { this._shiftLogSeq = pshiftLogSeq; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    public get internalLocationId(): number {
        return this._internalLocationId;
    }
    public set internalLocationId(value: number) {
        this._internalLocationId = value;
    }
    public get offenderIdDisplay(): string {
        return this._offenderIdDisplay;
    }
    public set offenderIdDisplay(value: string) {
        this._offenderIdDisplay = value;
    }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'reason': this._reason,
            'createUserId': this._createUserId,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'shiftLogSeq': this._shiftLogSeq,
            'modifyUserId': this._modifyUserId,
            'internalLocationId' : this._internalLocationId,
            'offenderFullName': this._offenderFullName,
            'offenderIdDisplay' : this._offenderIdDisplay,
            'livingUnitDescription' : this._livingUnitDescription

        };
    }
}