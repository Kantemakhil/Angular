import {BaseModel} from '@commonbeans/BaseModel';
export class InternalLocationUsages extends BaseModel {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _internalLocationUsageId: number;
    private _eventSubType: string;
    private _internalLocationUsage: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _agyLocId: string;
    private _description: string;
    private _sealFlag: string;
    private _chkPermMov: string;

    get chkPermMov(): string { return  this._chkPermMov; }

    set chkPermMov(pchkPermMov: string) { this._chkPermMov = pchkPermMov; }

    get createDatetime(): Date { return  this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return  this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return  this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get internalLocationUsageId(): number { return  this._internalLocationUsageId; }

    set internalLocationUsageId(pinternalLocationUsageId: number) { this._internalLocationUsageId = pinternalLocationUsageId; }

    get eventSubType(): string { return  this._eventSubType; }

    set eventSubType(peventSubType: string) { this._eventSubType = peventSubType; }

    get internalLocationUsage(): string { return  this._internalLocationUsage; }

    set internalLocationUsage(pinternalLocationUsage: string) { this._internalLocationUsage = pinternalLocationUsage; }

    get modifyDatetime(): Date { return  this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return  this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get agyLocId(): string { return  this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get description(): string { return  this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get sealFlag(): string { return  this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }


    toJSON(): any {
        return {
        'createDatetime': this._createDatetime,
        'serialVersionUID': this._serialVersionUID,
        'createUserId': this._createUserId,
        'internalLocationUsageId': this._internalLocationUsageId,
        'eventSubType': this._eventSubType,
        'internalLocationUsage': this._internalLocationUsage,
        'modifyDatetime': this._modifyDatetime,
        'modifyUserId': this._modifyUserId,
        'agyLocId': this._agyLocId,
        'description': this._description,
        'sealFlag': this._sealFlag,
        'chkPermMov': this._chkPermMov
            };
        }
 }
