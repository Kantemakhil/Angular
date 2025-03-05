import { BaseModel } from "@common/beans/BaseModel";
export class OffenderObservationZones extends BaseModel{
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _returnedOutput: number;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _agyLocId: string;
    private _listSeq: number;
    private _sealFlag: string;
    private _zoneCode: string;
    private _activeFlag: string;
    private _activeFlagTemp: string;

    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get returnedOutput(): number{ return this._returnedOutput; }
    set returnedOutput(preturnedOutput: number){ this._returnedOutput = preturnedOutput ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get agyLocId(): string{ return this._agyLocId; }
    set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
    get listSeq(): number{ return this._listSeq; }
    set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get zoneCode(): string{ return this._zoneCode; }
    set zoneCode(pzoneCode: string){ this._zoneCode = pzoneCode ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}

    get activeFlagTemp(): string{ return this._activeFlagTemp; }
    set activeFlagTemp(pactiveFlagTemp: string){ this._activeFlagTemp = pactiveFlagTemp ;}

toJSON(): any {
    return { 
       'expiryDate': this._expiryDate,
       'createDatetime': this._createDatetime,
       'returnedOutput': this._returnedOutput,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'agyLocId': this._agyLocId,
       'listSeq': this._listSeq,
       'sealFlag': this._sealFlag,
       'zoneCode': this._zoneCode,
       'activeFlag': this._activeFlag,
       'activeFlagTemp': this._activeFlagTemp
        };
    } 
}