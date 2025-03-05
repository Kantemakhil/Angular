export class MovementReasons {
    private _escRecapFlag: string;
    private _createUserId: string;
    private _code: string;
    private _openContactFlag: string;
    private _modifyUserId: string;
    private _description: string;
    private _billingServiceFlag: string;
    private _notificationType: string;
    private _expiryDate: Date;
    private _trnPrioritySeq: number;
    private _subSequentMvRsnCode: string;
    private _serialVersionUID: number;
    private _subSequentMvType: string;
    private _inserted: number;
    private _trnSchdTripFlag: string;
    private _trnpListFlag: string;
    private _movementType: string;
    private _trnAssignPriorityFlag: string;
    private _suspendReactiveSent: string;
    private _transportationFlag: string;
    private _sealFlag: string;
    private _updateAllowedFlag: string;
    private _reasonFlag: string;
    private _activeFlag: string;
    private _driveToOidumappFlag: string;
    private _canDisplay: number;
    private _movementReasonCode: string;
    private _inMovementType: string;
    private _headerStatusFlag: string;
    private _errorMessage: string;
    private _inActivateSent: string;
    private _trnReqApvlFlag: string;
    private _createDateTime: Date;
    private _notificationFlag: string;
    private _modifyDateTime: Date;
    private _listSeq: number;
    private _inMovementReasonCode: string;
    private _closeContactFlag: string;
    private _returnValue:number;
private _offenderDeleteCount:number;
private _externalMovmentCount:number;

    get escRecapFlag(): string{ return this._escRecapFlag; }
    set escRecapFlag(pescRecapFlag: string){ this._escRecapFlag = pescRecapFlag ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get code(): string{ return this._code; }
    set code(pcode: string){ this._code = pcode ;}
    get openContactFlag(): string{ return this._openContactFlag; }
    set openContactFlag(popenContactFlag: string){ this._openContactFlag = popenContactFlag ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get billingServiceFlag(): string{ return this._billingServiceFlag; }
    set billingServiceFlag(pbillingServiceFlag: string){ this._billingServiceFlag = pbillingServiceFlag ;}
    get notificationType(): string{ return this._notificationType; }
    set notificationType(pnotificationType: string){ this._notificationType = pnotificationType ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get trnPrioritySeq(): number{ return this._trnPrioritySeq; }
    set trnPrioritySeq(ptrnPrioritySeq: number){ this._trnPrioritySeq = ptrnPrioritySeq ;}
    get subSequentMvRsnCode(): string{ return this._subSequentMvRsnCode; }
    set subSequentMvRsnCode(psubSequentMvRsnCode: string){ this._subSequentMvRsnCode = psubSequentMvRsnCode ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get subSequentMvType(): string{ return this._subSequentMvType; }
    set subSequentMvType(psubSequentMvType: string){ this._subSequentMvType = psubSequentMvType ;}
    get inserted(): number{ return this._inserted; }
    set inserted(pinserted: number){ this._inserted = pinserted ;}
    get trnSchdTripFlag(): string{ return this._trnSchdTripFlag; }
    set trnSchdTripFlag(ptrnSchdTripFlag: string){ this._trnSchdTripFlag = ptrnSchdTripFlag ;}
    get trnpListFlag(): string{ return this._trnpListFlag; }
    set trnpListFlag(ptrnpListFlag: string){ this._trnpListFlag = ptrnpListFlag ;}
    get movementType(): string{ return this._movementType; }
    set movementType(pmovementType: string){ this._movementType = pmovementType ;}
    get trnAssignPriorityFlag(): string{ return this._trnAssignPriorityFlag; }
    set trnAssignPriorityFlag(ptrnAssignPriorityFlag: string){ this._trnAssignPriorityFlag = ptrnAssignPriorityFlag ;}
    get suspendReactiveSent(): string{ return this._suspendReactiveSent; }
    set suspendReactiveSent(psuspendReactiveSent: string){ this._suspendReactiveSent = psuspendReactiveSent ;}
    get transportationFlag(): string{ return this._transportationFlag; }
    set transportationFlag(ptransportationFlag: string){ this._transportationFlag = ptransportationFlag ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get updateAllowedFlag(): string{ return this._updateAllowedFlag; }
    set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag ;}
    get reasonFlag(): string{ return this._reasonFlag; }
    set reasonFlag(preasonFlag: string){ this._reasonFlag = preasonFlag ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get driveToOidumappFlag(): string{ return this._driveToOidumappFlag; }
    set driveToOidumappFlag(pdriveToOidumappFlag: string){ this._driveToOidumappFlag = pdriveToOidumappFlag ;}
    get canDisplay(): number{ return this._canDisplay; }
    set canDisplay(pcanDisplay: number){ this._canDisplay = pcanDisplay ;}
    get movementReasonCode(): string{ return this._movementReasonCode; }
    set movementReasonCode(pmovementReasonCode: string){ this._movementReasonCode = pmovementReasonCode ;}
    get inMovementType(): string{ return this._inMovementType; }
    set inMovementType(pinMovementType: string){ this._inMovementType = pinMovementType ;}
    get headerStatusFlag(): string{ return this._headerStatusFlag; }
    set headerStatusFlag(pheaderStatusFlag: string){ this._headerStatusFlag = pheaderStatusFlag ;}
    get errorMessage(): string{ return this._errorMessage; }
    set errorMessage(perrorMessage: string){ this._errorMessage = perrorMessage ;}
    get inActivateSent(): string{ return this._inActivateSent; }
    set inActivateSent(pinActivateSent: string){ this._inActivateSent = pinActivateSent ;}
    get trnReqApvlFlag(): string{ return this._trnReqApvlFlag; }
    set trnReqApvlFlag(ptrnReqApvlFlag: string){ this._trnReqApvlFlag = ptrnReqApvlFlag ;}
    get createDateTime(): Date{ return this._createDateTime; }
    set createDateTime(pcreateDateTime: Date){ this._createDateTime = pcreateDateTime ;}
    get notificationFlag(): string{ return this._notificationFlag; }
    set notificationFlag(pnotificationFlag: string){ this._notificationFlag = pnotificationFlag ;}
    get modifyDateTime(): Date{ return this._modifyDateTime; }
    set modifyDateTime(pmodifyDateTime: Date){ this._modifyDateTime = pmodifyDateTime ;}
    get listSeq(): number{ return this._listSeq; }
    set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
    get inMovementReasonCode(): string{ return this._inMovementReasonCode; }
    set inMovementReasonCode(pinMovementReasonCode: string){ this._inMovementReasonCode = pinMovementReasonCode ;}
    get closeContactFlag(): string{ return this._closeContactFlag; }
    set closeContactFlag(pcloseContactFlag: string){ this._closeContactFlag = pcloseContactFlag ;}
    get returnValue(): number{ return  this._returnValue; }

    set returnValue(preturnValue: number){ this._returnValue = preturnValue; }

    get offenderDeleteCount(): number{ return  this._offenderDeleteCount; }

    set offenderDeleteCount(poffenderDeleteCount: number){ this._offenderDeleteCount = poffenderDeleteCount; }


    get externalMovmentCount(): number{ return  this._externalMovmentCount; }

    set externalMovmentCount(pexternalMovmentCount: number){ this._externalMovmentCount = pexternalMovmentCount; }
toJSON(): any {
    return { 
       'escRecapFlag': this._escRecapFlag,
       'createUserId': this._createUserId,
       'code': this._code,
       'openContactFlag': this._openContactFlag,
       'modifyUserId': this._modifyUserId,
       'description': this._description,
       'billingServiceFlag': this._billingServiceFlag,
       'notificationType': this._notificationType,
       'expiryDate': this._expiryDate,
       'trnPrioritySeq': this._trnPrioritySeq,
       'subSequentMvRsnCode': this._subSequentMvRsnCode,
       'serialVersionUID': this._serialVersionUID,
       'subSequentMvType': this._subSequentMvType,
       'inserted': this._inserted,
       'trnSchdTripFlag': this._trnSchdTripFlag,
       'trnpListFlag': this._trnpListFlag,
       'movementType': this._movementType,
       'trnAssignPriorityFlag': this._trnAssignPriorityFlag,
       'suspendReactiveSent': this._suspendReactiveSent,
       'transportationFlag': this._transportationFlag,
       'sealFlag': this._sealFlag,
       'updateAllowedFlag': this._updateAllowedFlag,
       'reasonFlag': this._reasonFlag,
       'activeFlag': this._activeFlag,
       'driveToOidumappFlag': this._driveToOidumappFlag,
       'canDisplay': this._canDisplay,
       'movementReasonCode': this._movementReasonCode,
       'inMovementType': this._inMovementType,
       'headerStatusFlag': this._headerStatusFlag,
       'errorMessage': this._errorMessage,
       'inActivateSent': this._inActivateSent,
       'trnReqApvlFlag': this._trnReqApvlFlag,
       'createDateTime': this._createDateTime,
       'notificationFlag': this._notificationFlag,
       'modifyDateTime': this._modifyDateTime,
       'listSeq': this._listSeq,
       'inMovementReasonCode': this._inMovementReasonCode,
       'closeContactFlag': this._closeContactFlag,
       'returnValue': this._returnValue,
       'offenderDeleteCount': this._offenderDeleteCount,
       'externalMovmentCount': this._externalMovmentCount,
        };
    }  
}
