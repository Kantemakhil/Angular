export class OffenderVisitVisitors {
    private _offenderVisitVisitorId: number;
    private _eventId: number;
    private _lastName: string;
    private _createUserId: string;
    private _relationshipType: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _assistedVisitFlag: string;
    private _offenderIdDisplay: string;
    private _modifyUserId: string;
    private _contactType: string;
    private _commentText: string;
    private _outcomeReasonCode: string;
    private _createDatetime: Date;
    private _firstName: string;
    private _serialVersionUID: number;
    private _eventOutcome: string;
    private _eventStatus: string;
    private _restriction: string;
    private _agyLocId: string;
    private _visitDate: Date;
    private _sealFlag: string;
    private _offenderVisitId: number;
    private _groupLeaderFlag: string;
    private _visitorOffenderId: number;
    private _ocuvwarnFlag: boolean;

    get offenderVisitVisitorId(): number{ return  this._offenderVisitVisitorId }

    set offenderVisitVisitorId(poffenderVisitVisitorId: number){ this._offenderVisitVisitorId = poffenderVisitVisitorId }

    get eventId(): number{ return  this._eventId }

    set eventId(peventId: number){ this._eventId = peventId }

    get lastName(): string{ return  this._lastName }

    set lastName(plastName: string){ this._lastName = plastName }

    get createUserId(): string{ return  this._createUserId }

    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

    get relationshipType(): string{ return  this._relationshipType }

    set relationshipType(prelationshipType: string){ this._relationshipType = prelationshipType }

    get modifyDatetime(): Date{ return  this._modifyDatetime }

    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime }

    get offenderBookId(): number{ return  this._offenderBookId }

    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

    get assistedVisitFlag(): string{ return  this._assistedVisitFlag }

    set assistedVisitFlag(passistedVisitFlag: string){ this._assistedVisitFlag = passistedVisitFlag }

    get offenderIdDisplay(): string{ return  this._offenderIdDisplay }

    set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay }

    get modifyUserId(): string{ return  this._modifyUserId }

    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

    get contactType(): string{ return  this._contactType }

    set contactType(pcontactType: string){ this._contactType = pcontactType }

    get commentText(): string{ return  this._commentText }

    set commentText(pcommentText: string){ this._commentText = pcommentText }

    get outcomeReasonCode(): string{ return  this._outcomeReasonCode }

    set outcomeReasonCode(poutcomeReasonCode: string){ this._outcomeReasonCode = poutcomeReasonCode }

    get createDatetime(): Date{ return  this._createDatetime }

    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime }

    get firstName(): string{ return  this._firstName }

    set firstName(pfirstName: string){ this._firstName = pfirstName }

    get serialVersionUID(): number{ return  this._serialVersionUID }

    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

    get eventOutcome(): string{ return  this._eventOutcome }

    set eventOutcome(peventOutcome: string){ this._eventOutcome = peventOutcome }

    get eventStatus(): string{ return  this._eventStatus }

    set eventStatus(peventStatus: string){ this._eventStatus = peventStatus }

    get restriction(): string{ return  this._restriction }

    set restriction(prestriction: string){ this._restriction = prestriction }

    get agyLocId(): string{ return  this._agyLocId }

    set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId }

    get visitDate(): Date{ return  this._visitDate }

    set visitDate(pvisitDate: Date){ this._visitDate = pvisitDate }

    get sealFlag(): string{ return  this._sealFlag }

    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }

    get offenderVisitId(): number{ return  this._offenderVisitId }

    set offenderVisitId(poffenderVisitId: number){ this._offenderVisitId = poffenderVisitId }

    get groupLeaderFlag(): string{ return  this._groupLeaderFlag }

    set groupLeaderFlag(pgroupLeaderFlag: string){ this._groupLeaderFlag = pgroupLeaderFlag }
    
    get visitorOffenderId(): number{ return  this._visitorOffenderId }

    set visitorOffenderId(pvisitorOffenderId: number){ this._visitorOffenderId = pvisitorOffenderId }

    get ocuvwarnFlag(): boolean{ return  this._ocuvwarnFlag }
    
    set ocuvwarnFlag(pocuvwarnFlag: boolean){ this._ocuvwarnFlag = pocuvwarnFlag }

toJSON(): any {
    return { 
       'offenderVisitVisitorId': this._offenderVisitVisitorId,
       'eventId': this._eventId,
       'lastName': this._lastName,
       'createUserId': this._createUserId,
       'relationshipType': this._relationshipType,
       'modifyDatetime': this._modifyDatetime,
       'offenderBookId': this._offenderBookId,
       'assistedVisitFlag': this._assistedVisitFlag,
       'offenderIdDisplay': this._offenderIdDisplay,
       'modifyUserId': this._modifyUserId,
       'contactType': this._contactType,
       'commentText': this._commentText,
       'outcomeReasonCode': this._outcomeReasonCode,
       'createDatetime': this._createDatetime,
       'firstName': this._firstName,
       'serialVersionUID': this._serialVersionUID,
       'eventOutcome': this._eventOutcome,
       'eventStatus': this._eventStatus,
       'restriction': this._restriction,
       'agyLocId': this._agyLocId,
       'visitDate': this._visitDate,
       'sealFlag': this._sealFlag,
       'offenderVisitId': this._offenderVisitId,
       'groupLeaderFlag': this._groupLeaderFlag,
       'visitorOffenderId': this._visitorOffenderId,
       'ocuvwarnFlag':this._ocuvwarnFlag,
        };
    }  
}