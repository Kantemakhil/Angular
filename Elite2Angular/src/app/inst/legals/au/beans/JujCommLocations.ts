import { BaseModel } from "@common/beans/BaseModel";

export class JujCommLocations extends BaseModel{
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _jujCommLocId: number;
    private _createUserId: string;
    private _commAgyLocId: string;
    private _modifyDatetime: Date;
    private _postcode: string;
    private _modifyUserId: string;
    private _locationType: string;
    private _description: string;
    private _agyLocId: string;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get jujCommLocId(): number { return this._jujCommLocId; }
    set jujCommLocId(pjujCommLocId: number) { this._jujCommLocId = pjujCommLocId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get commAgyLocId(): string { return this._commAgyLocId; }
    set commAgyLocId(pcommAgyLocId: string) { this._commAgyLocId = pcommAgyLocId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get postcode(): string { return this._postcode; }
    set postcode(ppostcode: string) { this._postcode = ppostcode; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get locationType(): string { return this._locationType; }
    set locationType(plocationType: string) { this._locationType = plocationType; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'jujCommLocId': this._jujCommLocId,
            'createUserId': this._createUserId,
            'commAgyLocId': this._commAgyLocId,
            'modifyDatetime': this._modifyDatetime,
            'postcode': this._postcode,
            'modifyUserId': this._modifyUserId,
            'locationType': this._locationType,
            'description': this._description,
            'agyLocId': this._agyLocId,
        };
    }
}
