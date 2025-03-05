export class VAssOffNeeds {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _targetDate: Date;
    private _modifyUserId: string;
    private _objective: string;
    private _assOffCodeDesc: string;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _assessedNeedCode: string;
    private _offAssNeedId: number;
    private _sealFlag: string;
    private _assessmentId: number;
    private _activeFlag: string;

    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get targetDate(): Date{ return this._targetDate; }
    set targetDate(ptargetDate: Date){ this._targetDate = ptargetDate ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get objective(): string{ return this._objective; }
    set objective(pobjective: string){ this._objective = pobjective ;}
    get assOffCodeDesc(): string{ return this._assOffCodeDesc; }
    set assOffCodeDesc(passOffCodeDesc: string){ this._assOffCodeDesc = passOffCodeDesc ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get assessedNeedCode(): string{ return this._assessedNeedCode; }
    set assessedNeedCode(passessedNeedCode: string){ this._assessedNeedCode = passessedNeedCode ;}
    get offAssNeedId(): number{ return this._offAssNeedId; }
    set offAssNeedId(poffAssNeedId: number){ this._offAssNeedId = poffAssNeedId ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get assessmentId(): number{ return this._assessmentId; }
    set assessmentId(passessmentId: number){ this._assessmentId = passessmentId ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'targetDate': this._targetDate,
       'modifyUserId': this._modifyUserId,
       'objective': this._objective,
       'assOffCodeDesc': this._assOffCodeDesc,
       'expiryDate': this._expiryDate,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'assessedNeedCode': this._assessedNeedCode,
       'offAssNeedId': this._offAssNeedId,
       'sealFlag': this._sealFlag,
       'assessmentId': this._assessmentId,
       'activeFlag': this._activeFlag,
        };
    } 
}
