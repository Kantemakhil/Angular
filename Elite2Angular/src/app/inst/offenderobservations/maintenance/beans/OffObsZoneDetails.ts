import { BaseModel } from "@common/beans/BaseModel";
export class OffObsZoneDetails extends BaseModel{
    private _returnedOutput: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sensorId: string;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _agyLocId: string;
    private _listSeq: number;
    private _locationCode: string;
    private _sealFlag: string;
    private _internalLocationId: number;
    private _zoneCode: string;
    private _activeFlag: string;
    private _locationDescription: string;
    private _otherLocExist: string;
    get returnedOutput(): number{ return this._returnedOutput; }
    set returnedOutput(preturnedOutput: number){ this._returnedOutput = preturnedOutput ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get sensorId(): string{ return this._sensorId; }
    set sensorId(psensorId: string){ this._sensorId = psensorId ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get agyLocId(): string{ return this._agyLocId; }
    set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
    get listSeq(): number{ return this._listSeq; }
    set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
    get locationCode(): string{ return this._locationCode; }
    set locationCode(plocationCode: string){ this._locationCode = plocationCode ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get internalLocationId(): number{ return this._internalLocationId; }
    set internalLocationId(pinternalLocationId: number){ this._internalLocationId = pinternalLocationId ;}
    get zoneCode(): string{ return this._zoneCode; }
    set zoneCode(pzoneCode: string){ this._zoneCode = pzoneCode ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}

    get locationDescription(): string{ return this._locationDescription; }
    set locationDescription(plocationDescription: string){ this._locationDescription = plocationDescription ;}


    get otherLocExist(): string{ return this._otherLocExist; }
    set otherLocExist(potherLocExist: string){ this._otherLocExist = potherLocExist ;}

toJSON(): any {
    return { 
       'returnedOutput': this._returnedOutput,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'sensorId': this._sensorId,
       'expiryDate': this._expiryDate,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'agyLocId': this._agyLocId,
       'listSeq': this._listSeq,
       'locationCode': this._locationCode,
       'sealFlag': this._sealFlag,
       'internalLocationId': this._internalLocationId,
       'zoneCode': this._zoneCode,
       'activeFlag': this._activeFlag,
       'locationDescription': this._locationDescription,
       'otherLocExist': this._otherLocExist
        };
    } 
}
