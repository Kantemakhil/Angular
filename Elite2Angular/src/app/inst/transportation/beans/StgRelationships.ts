

export class StgRelationships{
    private _reason: string;
    private _createUserId:string;
    private _relationshipType: string;
    private _stgId: number;
    private _commentText: string;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _expiredBy: string;
    private _nbtRelatedStgId: any;
    private _relatedStgId: number;
    private _relationshipSeq: number;
    private _butViewMembers: any;
    private _effectiveDate: Date;
    private _activeFlag: string;
    private _scheduledTripId: number;
    private _moduleName: any;
    private _offenderBookId: number;

    get reason(): string{ return this._reason; }
    set reason(preason:string){ this._reason = preason ;}
    get createUserId():string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get relationshipType(): string{ return this._relationshipType; }
    set relationshipType(prelationshipType: string){ this._relationshipType = prelationshipType ;}
    get stgId(): number{ return this._stgId; }
    set stgId(pstgId: number){ this._stgId = pstgId ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate:  Date){ this._expiryDate = pexpiryDate ;}
    get expiredBy():string{ return this._expiredBy; }
    set expiredBy(pexpiredBy: string){ this._expiredBy = pexpiredBy ;}
    get nbtRelatedStgId(): any{ return this._nbtRelatedStgId; }
    set nbtRelatedStgId(pnbtRelatedStgId:any){ this._nbtRelatedStgId = pnbtRelatedStgId ;}
    get relatedStgId(): number{ return this._relatedStgId; }
    set relatedStgId(prelatedStgId: number){ this._relatedStgId = prelatedStgId ;}
    get relationshipSeq(): number{ return this._relationshipSeq; }
    set relationshipSeq(prelationshipSeq: number){ this._relationshipSeq = prelationshipSeq ;}
    get butViewMembers(): any{ return this._butViewMembers; }
    set butViewMembers(pbutViewMembers: any){ this._butViewMembers = pbutViewMembers ;}
    get effectiveDate(): Date{ return this._effectiveDate; }
    set effectiveDate(peffectiveDate: Date){ this._effectiveDate = peffectiveDate ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get scheduledTripId(): number{ return this._scheduledTripId; }
    set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
    get moduleName(): any{ return this._moduleName; }
    set moduleName(pmoduleName: any){ this._moduleName = pmoduleName;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}

toJSON(): any {
    return { 
       'reason': this._reason,
       'createUserId': this._createUserId,
       'relationshipType': this._relationshipType,
       'stgId': this._stgId,
       'commentText': this._commentText,
       'createDatetime': this._createDatetime,
       'expiryDate': this._expiryDate,
       'expiredBy': this._expiredBy,
       'nbtRelatedStgId': this._nbtRelatedStgId,
       'relatedStgId': this._relatedStgId,
       'relationshipSeq': this._relationshipSeq,
       'butViewMembers': this._butViewMembers,
       'effectiveDate': this._effectiveDate,
       'activeFlag': this._activeFlag,
       'scheduledTripId':this._scheduledTripId,
       'moduleName':this._moduleName,
       'offenderBookId':this._offenderBookId,
       
        };
    } 
    



}