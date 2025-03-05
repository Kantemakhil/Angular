export class CommunityConditions {
    private _createUserId: string;
    private _creationUser: string;
    private _code: string;
    private _modifyDatetime: Date;
    private _substanceFlag: string;
    private _maximumAmount: number;
    private _csoFlag: string;
    private _modifyUserId: string;
    private _casePlanFlag: string;
    private _description: string;
    private _commConditionCode: string;
    private _dueDateRequiredFlag: string;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _conditionUnitType: string;
    private _descriptionType: string;
    private _functionType: string;
    private _sealFlag: string;
    private _updateAllowedFlag: string;
    private _amountRequiredFlag: string;
    private _activeFlag: string;
    private _programUnits: number;
    private _allocationFlag: string;
    private _programMethod: string;
    private _programFlag: string;
    private _conditionText: string;
    private _conditionTextTemp: string;
    
    private _provisoFlag: string;
    private _creationDate: Date;
    private _createDatetime: Date;
    private _commConditionType: string;
    private _categoryType: string;
    private _financialFlag: string;
    private _listSeq: number;
    private _returnValue: number;
    private _serverCode:number;
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get creationUser(): string{ return this._creationUser; }
    set creationUser(pcreationUser: string){ this._creationUser = pcreationUser ;}
    get code(): string{ return this._code; }
    set code(pcode: string){ this._code = pcode ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get substanceFlag(): string{ return this._substanceFlag; }
    set substanceFlag(psubstanceFlag: string){ this._substanceFlag = psubstanceFlag ;}
    get maximumAmount(): number{ return this._maximumAmount; }
    set maximumAmount(pmaximumAmount: number){ this._maximumAmount = pmaximumAmount ;}
    get csoFlag(): string{ return this._csoFlag; }
    set csoFlag(pcsoFlag: string){ this._csoFlag = pcsoFlag ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get casePlanFlag(): string{ return this._casePlanFlag; }
    set casePlanFlag(pcasePlanFlag: string){ this._casePlanFlag = pcasePlanFlag ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get commConditionCode(): string{ return this._commConditionCode; }
    set commConditionCode(pcommConditionCode: string){ this._commConditionCode = pcommConditionCode ;}
    get dueDateRequiredFlag(): string{ return this._dueDateRequiredFlag; }
    set dueDateRequiredFlag(pdueDateRequiredFlag: string){ this._dueDateRequiredFlag = pdueDateRequiredFlag ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get conditionUnitType(): string{ return this._conditionUnitType; }
    set conditionUnitType(pconditionUnitType: string){ this._conditionUnitType = pconditionUnitType ;}
    get descriptionType(): string{ return this._descriptionType; }
    set descriptionType(pdescriptionType: string){ this._descriptionType = pdescriptionType ;}
    get functionType(): string{ return this._functionType; }
    set functionType(pfunctionType: string){ this._functionType = pfunctionType ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get updateAllowedFlag(): string{ return this._updateAllowedFlag; }
    set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag ;}
    get amountRequiredFlag(): string{ return this._amountRequiredFlag; }
    set amountRequiredFlag(pamountRequiredFlag: string){ this._amountRequiredFlag = pamountRequiredFlag ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get programUnits(): number{ return this._programUnits; }
    set programUnits(pprogramUnits: number){ this._programUnits = pprogramUnits ;}
    get allocationFlag(): string{ return this._allocationFlag; }
    set allocationFlag(pallocationFlag: string){ this._allocationFlag = pallocationFlag ;}
    get programMethod(): string{ return this._programMethod; }
    set programMethod(pprogramMethod: string){ this._programMethod = pprogramMethod ;}
    get programFlag(): string{ return this._programFlag; }
    set programFlag(pprogramFlag: string){ this._programFlag = pprogramFlag ;}
    
    get conditionTextTemp(): string{ return this._conditionTextTemp; }
    set conditionTextTemp(pconditionTextTemp: string){ this._conditionTextTemp = pconditionTextTemp ;}

    get conditionText(): string{ return this._conditionText; }
    set conditionText(pconditionText: string){ this._conditionText = pconditionText ;}
    get provisoFlag(): string{ return this._provisoFlag; }
    set provisoFlag(pprovisoFlag: string){ this._provisoFlag = pprovisoFlag ;}
    get creationDate(): Date{ return this._creationDate; }
    set creationDate(pcreationDate: Date){ this._creationDate = pcreationDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get commConditionType(): string{ return this._commConditionType; }
    set commConditionType(pcommConditionType: string){ this._commConditionType = pcommConditionType ;}
    get categoryType(): string{ return this._categoryType; }
    set categoryType(pcategoryType: string){ this._categoryType = pcategoryType ;}
    get financialFlag(): string{ return this._financialFlag; }
    set financialFlag(pfinancialFlag: string){ this._financialFlag = pfinancialFlag ;}
    get listSeq(): number{ return this._listSeq; }
    set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
    get returnValue(): number{ return this._returnValue; }
    set returnValue(preturnValue: number){ this._returnValue = preturnValue;}
    get serverCode(): number{ return this._serverCode; }
    set serverCode(pserverCode: number){ this._serverCode = pserverCode;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'creationUser': this._creationUser,
       'code': this._code,
       'modifyDatetime': this._modifyDatetime,
       'substanceFlag': this._substanceFlag,
       'maximumAmount': this._maximumAmount,
       'csoFlag': this._csoFlag,
       'modifyUserId': this._modifyUserId,
       'casePlanFlag': this._casePlanFlag,
       'description': this._description,
       'commConditionCode': this._commConditionCode,
       'dueDateRequiredFlag': this._dueDateRequiredFlag,
       'expiryDate': this._expiryDate,
       'serialVersionUID': this._serialVersionUID,
       'conditionUnitType': this._conditionUnitType,
       'descriptionType': this._descriptionType,
       'functionType': this._functionType,
       'sealFlag': this._sealFlag,
       'updateAllowedFlag': this._updateAllowedFlag,
       'amountRequiredFlag': this._amountRequiredFlag,
       'activeFlag': this._activeFlag,
       'programUnits': this._programUnits,
       'allocationFlag': this._allocationFlag,
       'programMethod': this._programMethod,
       'programFlag': this._programFlag,
       'conditionText': this._conditionText,
       'provisoFlag': this._provisoFlag,
       'creationDate': this._creationDate,
       'createDatetime': this._createDatetime,
       'commConditionType': this._commConditionType,
       'categoryType': this._categoryType,
       'financialFlag': this._financialFlag,
       'listSeq': this._listSeq,
       'returnValue': this._returnValue,
       'serverCode': this._serverCode,
       'conditionTextTemp':this._conditionTextTemp,
        };
    }
}
