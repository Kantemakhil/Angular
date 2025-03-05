export class AgyLocFeedDetails {
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _createUserId: string;
    private _feedAgyLocId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _agyLocId: string;
    private _sealFlag: string;
    private _activeFlag: string;
    private _description:string;
    
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get feedAgyLocId(): string{ return this._feedAgyLocId; }
    set feedAgyLocId(pfeedAgyLocId: string){ this._feedAgyLocId = pfeedAgyLocId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get agyLocId(): string{ return this._agyLocId; }
    set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}

toJSON(): any {
    return { 
       'expiryDate': this._expiryDate,
       'createDatetime': this._createDatetime,
       'createUserId': this._createUserId,
       'feedAgyLocId': this._feedAgyLocId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'agyLocId': this._agyLocId,
       'sealFlag': this._sealFlag,
       'activeFlag': this._activeFlag,
       'description':this._description,
        };
    } 
}