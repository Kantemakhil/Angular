export class VAssTreatProts {
    private _programDesc: string;
    private _caseworkTypeDesc: string;
    private _createUserId: string;
    private _minScore: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _maxScore: number;
    private _treatmentId: number;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _prgCategoryDesc: string;
    private _serialVersionUID: number;
    private _programCategory: string;
    private _offAssNeedId: number;
    private _caseworkType: string;
    private _referralFlag: string;
    private _sealFlag: string;
    private _programId: number;
    private _activeFlag: string;

    get programDesc(): string{ return this._programDesc; }
    set programDesc(pprogramDesc: string){ this._programDesc = pprogramDesc ;}
    get caseworkTypeDesc(): string{ return this._caseworkTypeDesc; }
    set caseworkTypeDesc(pcaseworkTypeDesc: string){ this._caseworkTypeDesc = pcaseworkTypeDesc ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get minScore(): number{ return this._minScore; }
    set minScore(pminScore: number){ this._minScore = pminScore ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get maxScore(): number{ return this._maxScore; }
    set maxScore(pmaxScore: number){ this._maxScore = pmaxScore ;}
    get treatmentId(): number{ return this._treatmentId; }
    set treatmentId(ptreatmentId: number){ this._treatmentId = ptreatmentId ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get prgCategoryDesc(): string{ return this._prgCategoryDesc; }
    set prgCategoryDesc(pprgCategoryDesc: string){ this._prgCategoryDesc = pprgCategoryDesc ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get programCategory(): string{ return this._programCategory; }
    set programCategory(pprogramCategory: string){ this._programCategory = pprogramCategory ;}
    get offAssNeedId(): number{ return this._offAssNeedId; }
    set offAssNeedId(poffAssNeedId: number){ this._offAssNeedId = poffAssNeedId ;}
    get caseworkType(): string{ return this._caseworkType; }
    set caseworkType(pcaseworkType: string){ this._caseworkType = pcaseworkType ;}
    get referralFlag(): string{ return this._referralFlag; }
    set referralFlag(preferralFlag: string){ this._referralFlag = preferralFlag ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get programId(): number{ return this._programId; }
    set programId(pprogramId: number){ this._programId = pprogramId ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}

toJSON(): any {
    return { 
       'programDesc': this._programDesc,
       'caseworkTypeDesc': this._caseworkTypeDesc,
       'createUserId': this._createUserId,
       'minScore': this._minScore,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'maxScore': this._maxScore,
       'treatmentId': this._treatmentId,
       'expiryDate': this._expiryDate,
       'createDatetime': this._createDatetime,
       'prgCategoryDesc': this._prgCategoryDesc,
       'serialVersionUID': this._serialVersionUID,
       'programCategory': this._programCategory,
       'offAssNeedId': this._offAssNeedId,
       'caseworkType': this._caseworkType,
       'referralFlag': this._referralFlag,
       'sealFlag': this._sealFlag,
       'programId': this._programId,
       'activeFlag': this._activeFlag,
        };
    } 
}
