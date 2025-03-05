export class RouteStopDetails {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _legId: number;
    private _modifyUserId: string;
    private _routeName: string;
    private _countFlag: string;
    private _intakeLocFlag: string;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _overnightFlag: string;
    private _agyLocId: string;
    private _legSeq: number;
    private _sealFlag: string;
    private _activeFlag: string;
    private _tempLegid: number;
    private _tempLegseq: number;
    private _tempAgylocid: string;


    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get legId(): number{ return this._legId; }
    set legId(plegId: number){ this._legId = plegId ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get routeName(): string{ return this._routeName; }
    set routeName(prouteName: string){ this._routeName = prouteName ;}
    get countFlag(): string{ return this._countFlag; }
    set countFlag(pcountFlag: string){ this._countFlag = pcountFlag ;}
    get intakeLocFlag(): string{ return this._intakeLocFlag; }
    set intakeLocFlag(pintakeLocFlag: string){ this._intakeLocFlag = pintakeLocFlag ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get overnightFlag(): string{ return this._overnightFlag; }
    set overnightFlag(povernightFlag: string){ this._overnightFlag = povernightFlag ;}
    get agyLocId(): string{ return this._agyLocId; }
    set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
    get legSeq(): number{ return this._legSeq; }
    set legSeq(plegSeq: number){ this._legSeq = plegSeq ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get tempLegid(): number{ return this._tempLegid; }
    set tempLegid(ptempLegid: number){ this._tempLegid = ptempLegid ;}
    get tempLegseq(): number{ return this._tempLegseq; }
    set tempLegseq(ptempLegseq: number){ this._tempLegseq = ptempLegseq ;}
    get tempAgylocid(): string{ return this._tempAgylocid; }
    set tempAgylocid(ptempAgylocid: string){ this._tempAgylocid = ptempAgylocid ;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'legId': this._legId,
       'modifyUserId': this._modifyUserId,
       'routeName': this._routeName,
       'countFlag': this._countFlag,
       'intakeLocFlag': this._intakeLocFlag,
       'expiryDate': this._expiryDate,
       'createDatetime': this._createDatetime,
       'overnightFlag': this._overnightFlag,
       'agyLocId': this._agyLocId,
       'legSeq': this._legSeq,
       'sealFlag': this._sealFlag,
       'activeFlag': this._activeFlag,
       'tempLegid':this._tempLegid,
       'tempLegseq':this._tempLegseq,
       'tempAgylocid':this._tempAgylocid
        };
    } 
}