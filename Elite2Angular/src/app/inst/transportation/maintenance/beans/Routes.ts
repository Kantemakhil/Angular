export class Routes {
    private _travelTime: string;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _stopAgyLocId: string;
    private _description: string;
    private _startAgyLocId: string;
    private _routeName: string;
    private _noStops: number;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _sealFlag: string;
    private _remarks: string;
    private _activeFlag: string;

    get travelTime(): string{ return this._travelTime; }
    set travelTime(ptravelTime: string){ this._travelTime = ptravelTime ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get stopAgyLocId(): string{ return this._stopAgyLocId; }
    set stopAgyLocId(pstopAgyLocId: string){ this._stopAgyLocId = pstopAgyLocId ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get startAgyLocId(): string{ return this._startAgyLocId; }
    set startAgyLocId(pstartAgyLocId: string){ this._startAgyLocId = pstartAgyLocId ;}
    get routeName(): string{ return this._routeName; }
    set routeName(prouteName: string){ this._routeName = prouteName ;}
    get noStops(): number{ return this._noStops; }
    set noStops(pnoStops: number){ this._noStops = pnoStops ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get remarks(): string{ return this._remarks; }
    set remarks(premarks: string){ this._remarks = premarks ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    
toJSON(): any {
    return { 
       'travelTime': this._travelTime,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'stopAgyLocId': this._stopAgyLocId,
       'description': this._description,
       'startAgyLocId': this._startAgyLocId,
       'routeName': this._routeName,
       'noStops': this._noStops,
       'createDatetime': this._createDatetime,
       'expiryDate': this._expiryDate,
       'sealFlag': this._sealFlag,
       'remarks': this._remarks,
       'activeFlag': this._activeFlag,
        };
    } 
}
