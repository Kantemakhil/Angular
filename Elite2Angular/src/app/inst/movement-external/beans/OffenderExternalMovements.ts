import {BaseModel} from '@commonbeans/BaseModel'; 
//import {AddressUsages} from './AddressUsages'; 
    export class OffenderExternalMovements extends BaseModel {
         private _createUserId: string;
         private _escortCode: string;
         private _modifyDatetime: Date;
         private _offenderBookId: number;
         private _movementTime: Date;
         private _modifyUserId: string;
         private _ojLocationCode: string;
         private _commentText: string;
         private _movementSeq: number;
         private _serialVersionUID: number;
         private _applicationTime: Date;
         private _movementType: string;
         private _arrestAgencyLocId: string;
         private _reportingTime: Date;
         private _escortText: string;
         private _parentEventId: number;
         private _sealFlag: string;
         private _internalScheduleType: string;
         private _toAgyLocId: string;
         private _activeFlag: string;
         private _eventId: number;
         private _movementReasonCode: string;
         private _internalScheduleReasonCode: string;
         private _toCity: string;
         private _movementDate: Date;
         private _toCountryCode: string;
         private _directionCode: string;
         private _toProvStatCode: string;
         private _createDatetime: Date;
         private _fromAddressId: number;
         private _fromAgyLocId: string;
         private _reportingDate: Date;
         private _fromCity: string;
         private _applicationDate: Date;
         private _toAddressId: number;
         private _reasonCodeValid: string;
         private _verifiedFlag: string;
         private _releaseConfNotification: string;

         get createUserId(): string{ return this._createUserId; }
         set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
         get escortCode(): string{ return this._escortCode; }
         set escortCode(pescortCode: string){ this._escortCode = pescortCode ;}
         get modifyDatetime(): Date{ return this._modifyDatetime; }
         set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
         get offenderBookId(): number{ return this._offenderBookId; }
         set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
         get movementTime(): Date{ return this._movementTime; }
         set movementTime(pmovementTime: Date){ this._movementTime = pmovementTime ;}
         get modifyUserId(): string{ return this._modifyUserId; }
         set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
         get ojLocationCode(): string{ return this._ojLocationCode; }
         set ojLocationCode(pojLocationCode: string){ this._ojLocationCode = pojLocationCode ;}
         get commentText(): string{ return this._commentText; }
         set commentText(pcommentText: string){ this._commentText = pcommentText ;}
         get movementSeq(): number{ return this._movementSeq; }
         set movementSeq(pmovementSeq: number){ this._movementSeq = pmovementSeq ;}
         get serialVersionUID(): number{ return this._serialVersionUID; }
         set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
         get applicationTime(): Date{ return this._applicationTime; }
         set applicationTime(papplicationTime: Date){ this._applicationTime = papplicationTime ;}
         get movementType(): string{ return this._movementType; }
         set movementType(pmovementType: string){ this._movementType = pmovementType ;}
         get arrestAgencyLocId(): string{ return this._arrestAgencyLocId; }
         set arrestAgencyLocId(parrestAgencyLocId: string){ this._arrestAgencyLocId = parrestAgencyLocId ;}
         get reportingTime(): Date{ return this._reportingTime; }
         set reportingTime(preportingTime: Date){ this._reportingTime = preportingTime ;}
         get escortText(): string{ return this._escortText; }
         set escortText(pescortText: string){ this._escortText = pescortText ;}
         get parentEventId(): number{ return this._parentEventId; }
         set parentEventId(pparentEventId: number){ this._parentEventId = pparentEventId ;}
         get sealFlag(): string{ return this._sealFlag; }
         set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
         get internalScheduleType(): string{ return this._internalScheduleType; }
         set internalScheduleType(pinternalScheduleType: string){ this._internalScheduleType = pinternalScheduleType ;}
         get toAgyLocId(): string{ return this._toAgyLocId; }
         set toAgyLocId(ptoAgyLocId: string){ this._toAgyLocId = ptoAgyLocId ;}
         get activeFlag(): string{ return this._activeFlag; }
         set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
         get eventId(): number{ return this._eventId; }
         set eventId(peventId: number){ this._eventId = peventId ;}
         get movementReasonCode(): string{ return this._movementReasonCode; }
         set movementReasonCode(pmovementReasonCode: string){ this._movementReasonCode = pmovementReasonCode ;}
         get internalScheduleReasonCode(): string{ return this._internalScheduleReasonCode; }
         set internalScheduleReasonCode(pinternalScheduleReasonCode: string){ this._internalScheduleReasonCode = pinternalScheduleReasonCode ;}
         get toCity(): string{ return this._toCity; }
         set toCity(ptoCity: string){ this._toCity = ptoCity ;}
         get movementDate(): Date{ return this._movementDate; }
         set movementDate(pmovementDate: Date){ this._movementDate = pmovementDate ;}
         get toCountryCode(): string{ return this._toCountryCode; }
         set toCountryCode(ptoCountryCode: string){ this._toCountryCode = ptoCountryCode ;}
         get directionCode(): string{ return this._directionCode; }
         set directionCode(pdirectionCode: string){ this._directionCode = pdirectionCode ;}
         get toProvStatCode(): string{ return this._toProvStatCode; }
         set toProvStatCode(ptoProvStatCode: string){ this._toProvStatCode = ptoProvStatCode ;}
         get createDatetime(): Date{ return this._createDatetime; }
         set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
         get fromAddressId(): number{ return this._fromAddressId; }
         set fromAddressId(pfromAddressId: number){ this._fromAddressId = pfromAddressId ;}
         get fromAgyLocId(): string{ return this._fromAgyLocId; }
         set fromAgyLocId(pfromAgyLocId: string){ this._fromAgyLocId = pfromAgyLocId ;}
         get reportingDate(): Date{ return this._reportingDate; }
         set reportingDate(preportingDate: Date){ this._reportingDate = preportingDate ;}
         get fromCity(): string{ return this._fromCity; }
         set fromCity(pfromCity: string){ this._fromCity = pfromCity ;}
         get applicationDate(): Date{ return this._applicationDate; }
         set applicationDate(papplicationDate: Date){ this._applicationDate = papplicationDate ;}
         get toAddressId(): number{ return this._toAddressId; }
         set toAddressId(ptoAddressId: number){ this._toAddressId = ptoAddressId ;}
         get reasonCodeValid(): string{ return this._reasonCodeValid; }
         set reasonCodeValid(preasonCodeValid: string){ this._reasonCodeValid = preasonCodeValid ;}
         get verifiedFlag(): string{ return this._verifiedFlag; }
         set verifiedFlag(verifiedFlag: string){ this._verifiedFlag = verifiedFlag ;}
         get releaseConfNotification(): string{ return this._releaseConfNotification; }
         set releaseConfNotification(preleaseConfNotification: string){ this._releaseConfNotification = preleaseConfNotification ;}

         

    toJSON(): any {
        return { 
            'createUserId': this._createUserId,
            'escortCode': this._escortCode,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'movementTime': this._movementTime,
            'modifyUserId': this._modifyUserId,
            'ojLocationCode': this._ojLocationCode,
            'commentText': this._commentText,
            'movementSeq': this._movementSeq,
            'serialVersionUID': this._serialVersionUID,
            'applicationTime': this._applicationTime,
            'movementType': this._movementType,
            'arrestAgencyLocId': this._arrestAgencyLocId,
            'reportingTime': this._reportingTime,
            'escortText': this._escortText,
            'parentEventId': this._parentEventId,
            'sealFlag': this._sealFlag,
            'internalScheduleType': this._internalScheduleType,
            'toAgyLocId': this._toAgyLocId,
            'activeFlag': this._activeFlag,
            'eventId': this._eventId,
            'movementReasonCode': this._movementReasonCode,
            'internalScheduleReasonCode': this._internalScheduleReasonCode,
            'toCity': this._toCity,
            'movementDate': this._movementDate,
            'toCountryCode': this._toCountryCode,
            'directionCode': this._directionCode,
            'toProvStatCode': this._toProvStatCode,
            'createDatetime': this._createDatetime,
            'fromAddressId': this._fromAddressId,
            'fromAgyLocId': this._fromAgyLocId,
            'reportingDate': this._reportingDate,
            'fromCity': this._fromCity,
            'applicationDate': this._applicationDate,
            'toAddressId': this._toAddressId,
            'reasonCodeValid': this._reasonCodeValid,
            'verifiedFlag': this._verifiedFlag,
            'releaseConfNotification':this._releaseConfNotification
            };
        }  
 }