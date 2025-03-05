import { BaseModel } from '@commonbeans/BaseModel';
export class programsPayCompensationBean extends BaseModel {
    private _programCategory: string;
    private _unit: string;
    private _rate: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _sealFlag: string;
    private _codeVal: string;
    private _programId: number;
    private _crsActyId: number;

    get programId(): number { return this._programId; }
    set programId(pprogramId: number) { this._programId = pprogramId; }
    get crsActyId(): number { return this._crsActyId; }
    set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId; }
    get programCatgeory(): string { return this._programCategory; }
    set programCategory(pprogramCategory: string) { this._programCategory = pprogramCategory; }
    get unit(): string { return this._unit; }
    set unit(punit: string) { this._unit = punit; }
    get rate(): number { return this._rate; }
    set rate(prate: number) { this._rate = prate; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get codeVal(): string { return this._codeVal; }
    set codeVal(pcodeVal: string) { this._codeVal = pcodeVal; }

    toJSON(): any {
        return {
            'programCategory': this._programCategory,
            'unit': this._unit,
            'rate': this._rate,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'createDatetime': this._createDatetime,
            'codeVal': this._codeVal,
            'crsActyId': this._crsActyId,
            'programId': this._programId
        };
    }
}