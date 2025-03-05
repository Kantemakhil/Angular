import { BaseModel } from "./BaseModel";

export class MovementReasons extends BaseModel {
    private _escRecapFlag: string;
    private _createUserId: string;
    private _modifyDateTime: Date;
    private _openContactFlag: string;
    private _modifyUserId: string;
    private _billingServiceFlag: string;
    private _description: string;
    private _notificationType: string;
    private _suspendReactivateSent: string;
    private _expiryDate: Date;
    private _trnPrioritySeq: number;
    private _serialVersionUID: number;
    private _subsequentMvType: string;
    private _trnSchdTripFlag: string;
    private _movementType: string;
    private _trnAssignPriorityFlag: string;
    private _reasonFlag: string;
    private _sealFlag: string;
    private _transportationFlag: string;
    private _updateAllowedFlag: string;
    private _inactivateSent: string;
    private _activeFlag: string;
    private _driveToOidumappFlag: string;
    private _inMovementType: string;
    private _movementReasonCode: string;
    private _headerStatusFlag: string;
    private _trnReqApvlFlag: string;
    private _createDateTime: number;
    private _notificationFlag: string;
    private _subsequentMvRsnCode: string;
    private _listSeq: number;
    private _inMovementReasonCode: string;
    private _trnPListFlag: string;
    private _closeContactFlag: string;
private _returnValue:number;
private _offenderDeleteCount:number;
private _externalMovmentCount:number;




    get escRecapFlag(): string{ return  this._escRecapFlag; }

    set escRecapFlag(pescRecapFlag: string){ this._escRecapFlag = pescRecapFlag; }

    get createUserId(): string{ return  this._createUserId; }

    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

    get modifyDateTime(): Date{ return  this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date){ this._modifyDateTime = pmodifyDateTime; }

    get openContactFlag(): string{ return  this._openContactFlag; }

    set openContactFlag(popenContactFlag: string){ this._openContactFlag = popenContactFlag; }

    get modifyUserId(): string{ return  this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

    get billingServiceFlag(): string{ return  this._billingServiceFlag; }

    set billingServiceFlag(pbillingServiceFlag: string){ this._billingServiceFlag = pbillingServiceFlag; }

    get description(): string{ return  this._description; }

    set description(pdescription: string){ this._description = pdescription; }

    get notificationType(): string{ return  this._notificationType; }

    set notificationType(pnotificationType: string){ this._notificationType = pnotificationType; }

    get suspendReactivateSent(): string{ return  this._suspendReactivateSent; }

    set suspendReactivateSent(psuspendReactivateSent: string){ this._suspendReactivateSent = psuspendReactivateSent; }

    get expiryDate(): Date{ return  this._expiryDate; }

    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate; }

    get trnPrioritySeq(): number{ return  this._trnPrioritySeq; }

    set trnPrioritySeq(ptrnPrioritySeq: number){ this._trnPrioritySeq = ptrnPrioritySeq; }

    get serialVersionUID(): number{ return  this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID; }

    get subsequentMvType(): string{ return  this._subsequentMvType; }

    set subsequentMvType(psubsequentMvType: string){ this._subsequentMvType = psubsequentMvType; }

    get trnSchdTripFlag(): string{ return  this._trnSchdTripFlag; }

    set trnSchdTripFlag(ptrnSchdTripFlag: string){ this._trnSchdTripFlag = ptrnSchdTripFlag; }

    get movementType(): string{ return  this._movementType; }

    set movementType(pmovementType: string){ this._movementType = pmovementType; }

    get trnAssignPriorityFlag(): string{ return  this._trnAssignPriorityFlag; }

    set trnAssignPriorityFlag(ptrnAssignPriorityFlag: string){ this._trnAssignPriorityFlag = ptrnAssignPriorityFlag; }

    get reasonFlag(): string{ return  this._reasonFlag; }

    set reasonFlag(preasonFlag: string){ this._reasonFlag = preasonFlag; }

    get sealFlag(): string{ return  this._sealFlag; }

    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

    get transportationFlag(): string{ return  this._transportationFlag; }

    set transportationFlag(ptransportationFlag: string){ this._transportationFlag = ptransportationFlag; }

    get updateAllowedFlag(): string{ return  this._updateAllowedFlag; }

    set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag; }

    get inactivateSent(): string{ return  this._inactivateSent; }

    set inactivateSent(pinactivateSent: string){ this._inactivateSent = pinactivateSent; }

    get activeFlag(): string{ return  this._activeFlag; }

    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag; }

    get driveToOidumappFlag(): string{ return  this._driveToOidumappFlag; }

    set driveToOidumappFlag(pdriveToOidumappFlag: string){ this._driveToOidumappFlag = pdriveToOidumappFlag; }

    get inMovementType(): string{ return  this._inMovementType; }

    set inMovementType(pinMovementType: string){ this._inMovementType = pinMovementType; }

    get movementReasonCode(): string{ return  this._movementReasonCode; }

    set movementReasonCode(pmovementReasonCode: string){ this._movementReasonCode = pmovementReasonCode; }

    get headerStatusFlag(): string{ return  this._headerStatusFlag; }

    set headerStatusFlag(pheaderStatusFlag: string){ this._headerStatusFlag = pheaderStatusFlag; }

    get trnReqApvlFlag(): string{ return  this._trnReqApvlFlag; }

    set trnReqApvlFlag(ptrnReqApvlFlag: string){ this._trnReqApvlFlag = ptrnReqApvlFlag; }

    get createDateTime(): number{ return  this._createDateTime; }

    set createDateTime(pcreateDateTime: number){ this._createDateTime = pcreateDateTime; }

    get notificationFlag(): string{ return  this._notificationFlag; }

    set notificationFlag(pnotificationFlag: string){ this._notificationFlag = pnotificationFlag; }

    get subsequentMvRsnCode(): string{ return  this._subsequentMvRsnCode; }

    set subsequentMvRsnCode(psubsequentMvRsnCode: string){ this._subsequentMvRsnCode = psubsequentMvRsnCode; }

    get listSeq(): number{ return  this._listSeq; }

    set listSeq(plistSeq: number){ this._listSeq = plistSeq; }

    get inMovementReasonCode(): string{ return  this._inMovementReasonCode; }

    set inMovementReasonCode(pinMovementReasonCode: string){ this._inMovementReasonCode = pinMovementReasonCode; }

    get trnPListFlag(): string{ return  this._trnPListFlag; }

    set trnPListFlag(ptrnPListFlag: string){ this._trnPListFlag = ptrnPListFlag; }

    get closeContactFlag(): string{ return  this._closeContactFlag; }

    set closeContactFlag(pcloseContactFlag: string){ this._closeContactFlag = pcloseContactFlag; }

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
       'modifyDateTime': this._modifyDateTime,
       'openContactFlag': this._openContactFlag,
       'modifyUserId': this._modifyUserId,
       'billingServiceFlag': this._billingServiceFlag,
       'description': this._description,
       'notificationType': this._notificationType,
       'suspendReactivateSent': this._suspendReactivateSent,
       'expiryDate': this._expiryDate,
       'trnPrioritySeq': this._trnPrioritySeq,
       'serialVersionUID': this._serialVersionUID,
       'subsequentMvType': this._subsequentMvType,
       'trnSchdTripFlag': this._trnSchdTripFlag,
       'movementType': this._movementType,
       'trnAssignPriorityFlag': this._trnAssignPriorityFlag,
       'reasonFlag': this._reasonFlag,
       'sealFlag': this._sealFlag,
       'transportationFlag': this._transportationFlag,
       'updateAllowedFlag': this._updateAllowedFlag,
       'inactivateSent': this._inactivateSent,
       'activeFlag': this._activeFlag,
       'driveToOidumappFlag': this._driveToOidumappFlag,
       'inMovementType': this._inMovementType,
       'movementReasonCode': this._movementReasonCode,
       'headerStatusFlag': this._headerStatusFlag,
       'trnReqApvlFlag': this._trnReqApvlFlag,
       'createDateTime': this._createDateTime,
       'notificationFlag': this._notificationFlag,
       'subsequentMvRsnCode': this._subsequentMvRsnCode,
       'listSeq': this._listSeq,
       'inMovementReasonCode': this._inMovementReasonCode,
       'trnPListFlag': this._trnPListFlag,
       'closeContactFlag': this._closeContactFlag,
       'returnValue': this._returnValue,
       'offenderDeleteCount': this._offenderDeleteCount,
       'externalMovmentCount': this._externalMovmentCount,
        };
    }  

}